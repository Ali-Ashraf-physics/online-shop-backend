import { Body, Controller, Get, Patch, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminRoleDto } from '../dto/update-admin-role.dto';
import { UpdateAdminStatusDto } from '../dto/update-admin-status.dto';
import { AdminResponseDto } from '../dto/admin-response.dto';
import { AdminListResponseDto } from '../dto/admin-list-response.dto';
import { AdminQueryDto } from '../dto/admin-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../common/guards/permissions.guard';
import { RequirePermissions } from '../../../common/decorators/permissions.decorator';
import { Permission } from '../../../common/enums/permission.enum';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/users')
export class AdminUsersController {
    constructor(private readonly adminService: AdminService) { }

    @Post()
    @RequirePermissions(Permission.MANAGE_USERS)
    @ApiOperation({ summary: 'Create an admin user', operationId: 'createAdminUser' })
    @ApiResponse({ status: 201, type: AdminResponseDto })
    async create(
        @Req() req: { user: { sub: string } },
        @Body() dto: CreateAdminDto,
    ): Promise<AdminResponseDto> {
        return this.adminService.createAdmin({ user: { sub: req.user.sub } }, dto);
    }

    @Get()
    @RequirePermissions(Permission.MANAGE_USERS)
    @ApiOperation({ summary: 'List admin users', operationId: 'listAdminUsers' })
    @ApiResponse({ status: 200, type: AdminListResponseDto })
    async list(
        @Req() req: { user: { sub: string } },
        @Query() query: AdminQueryDto,
    ): Promise<AdminListResponseDto> {
        return this.adminService.findAdmins({ user: { sub: req.user.sub } }, query);
    }

    @Patch(':adminId/role')
    @RequirePermissions(Permission.MANAGE_USERS)
    @ApiOperation({ summary: 'Update admin role', operationId: 'updateAdminRole' })
    @ApiResponse({ status: 200, type: AdminResponseDto })
    async updateRole(
        @Req() req: { user: { sub: string } },
        @Param('adminId') adminId: string,
        @Body() dto: UpdateAdminRoleDto,
    ): Promise<AdminResponseDto> {
        return this.adminService.updateAdminRole({ user: { sub: req.user.sub } }, adminId, dto);
    }

    @Patch(':adminId/status')
    @RequirePermissions(Permission.MANAGE_USERS)
    @ApiOperation({ summary: 'Update admin status', operationId: 'updateAdminStatus' })
    @ApiResponse({ status: 200, type: AdminResponseDto })
    async updateStatus(
        @Req() req: { user: { sub: string } },
        @Param('adminId') adminId: string,
        @Body() dto: UpdateAdminStatusDto,
    ): Promise<AdminResponseDto> {
        return this.adminService.updateAdminStatus({ user: { sub: req.user.sub } }, adminId, dto);
    }
}
