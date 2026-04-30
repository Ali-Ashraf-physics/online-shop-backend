import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AdminRepository } from '../repositories/admin.repository';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminRoleDto } from '../dto/update-admin-role.dto';
import { UpdateAdminStatusDto } from '../dto/update-admin-status.dto';
import { AdminLoginDto } from '../dto/admin-login.dto';
import { AdminResponseDto } from '../dto/admin-response.dto';
import { AdminListResponseDto } from '../dto/admin-list-response.dto';
import { AdminQueryDto } from '../dto/admin-query.dto';
import { AdminRole } from '../enums/admin-role.enum';
import { Permission } from '../../../common/enums/permission.enum';
import { AuditService } from '../../audit/services/audit.service';
import { AuditAction } from '../../audit/enums/audit-action.enum';

export type RequestContext = { user: { sub: string } };

@Injectable()
export class AdminService {
    constructor(
        private readonly adminRepository: AdminRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly auditService: AuditService,
    ) { }

    private mapAdmin(admin: import('../schemas/admin-user.schema').AdminUserDocument): AdminResponseDto {
        return {
            id: admin._id.toString(),
            email: admin.email,
            fullName: admin.fullName,
            role: admin.role,
            permissions: admin.permissions ?? [],
            isActive: admin.isActive,
        };
    }

    private allPermissions(): Permission[] {
        return Object.values(Permission);
    }

    private async assertNotLastSuperAdmin(targetAdminId: string): Promise<void> {
        const activeSuperAdmins = await this.adminRepository.countActiveSuperAdmins();
        if (activeSuperAdmins <= 1) {
            const admin = await this.adminRepository.findById(targetAdminId);
            if (admin?.role === AdminRole.SUPER_ADMIN && admin.isActive) {
                throw new BadRequestException('Cannot modify the last active super admin');
            }
        }
    }

    async loginAdmin(dto: AdminLoginDto): Promise<{ accessToken: string; admin: AdminResponseDto }> {
        const admin = await this.adminRepository.findByEmail(dto.email.toLowerCase());
        if (!admin || !admin.isActive) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(dto.password, admin.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: admin._id.toString(), role: admin.role, permissions: admin.permissions };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET', 'dev_secret'),
            expiresIn: '15m',
        });

        await this.adminRepository.updateLastLogin(admin._id.toString(), new Date());
        await this.auditService.record({
            action: AuditAction.ADMIN_LOGIN,
            actorId: admin._id.toString(),
            actorType: 'ADMIN',
            resourceId: admin._id.toString(),
            resourceType: 'AdminUser',
        });

        return { accessToken, admin: this.mapAdmin(admin) };
    }

    async createAdmin(context: RequestContext, dto: CreateAdminDto): Promise<AdminResponseDto> {
        const existing = await this.adminRepository.findByEmail(dto.email.toLowerCase());
        if (existing) {
            throw new ConflictException('Admin email already exists');
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);
        const role = dto.role ?? AdminRole.ADMIN;
        const permissions = role === AdminRole.SUPER_ADMIN
            ? this.allPermissions()
            : (dto.permissions ?? []);

        const created = await this.adminRepository.createAdmin({
            email: dto.email.toLowerCase(),
            fullName: dto.fullName,
            passwordHash,
            role,
            permissions,
            isActive: true,
        });

        await this.auditService.record({
            action: AuditAction.ADMIN_CREATED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: created._id.toString(),
            resourceType: 'AdminUser',
            afterState: { email: created.email, role: created.role },
        });

        return this.mapAdmin(created);
    }

    async findAdmins(context: RequestContext, query: AdminQueryDto): Promise<AdminListResponseDto> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;

        const { items, total } = await this.adminRepository.findMany({ skip, limit });
        const totalPages = Math.max(1, Math.ceil(total / limit));

        return {
            items: items.map((admin) => this.mapAdmin(admin)),
            meta: { total, page, limit, totalPages },
        };
    }

    async updateAdminRole(context: RequestContext, id: string, dto: UpdateAdminRoleDto): Promise<AdminResponseDto> {
        await this.assertNotLastSuperAdmin(id);

        const admin = await this.adminRepository.findById(id);
        if (!admin) throw new NotFoundException('Admin not found');

        const permissions = dto.role === AdminRole.SUPER_ADMIN
            ? this.allPermissions()
            : (dto.permissions ?? admin.permissions ?? []);

        const updated = await this.adminRepository.updateRole(id, dto.role, permissions);
        if (!updated) throw new NotFoundException('Admin not found');

        await this.auditService.record({
            action: AuditAction.ADMIN_ROLE_CHANGED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: id,
            resourceType: 'AdminUser',
            beforeState: { role: admin.role, permissions: admin.permissions },
            afterState: { role: updated.role, permissions: updated.permissions },
        });

        return this.mapAdmin(updated);
    }

    async updateAdminStatus(context: RequestContext, id: string, dto: UpdateAdminStatusDto): Promise<AdminResponseDto> {
        await this.assertNotLastSuperAdmin(id);

        const admin = await this.adminRepository.findById(id);
        if (!admin) throw new NotFoundException('Admin not found');

        if (!dto.isActive && admin._id.toString() === context.user.sub) {
            throw new BadRequestException('Cannot deactivate own account');
        }

        const updated = await this.adminRepository.updateStatus(id, dto.isActive);
        if (!updated) throw new NotFoundException('Admin not found');

        await this.auditService.record({
            action: AuditAction.ADMIN_STATUS_CHANGED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: id,
            resourceType: 'AdminUser',
            beforeState: { isActive: admin.isActive },
            afterState: { isActive: updated.isActive },
        });

        return this.mapAdmin(updated);
    }
}
