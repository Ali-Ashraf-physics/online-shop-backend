import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminUser, AdminUserDocument } from '../schemas/admin-user.schema';
import { AdminRole } from '../enums/admin-role.enum';
import { Permission } from '../../../common/enums/permission.enum';

export type AdminQuery = { skip: number; limit: number };

@Injectable()
export class AdminRepository {
    constructor(@InjectModel(AdminUser.name) private adminModel: Model<AdminUserDocument>) { }

    async createAdmin(input: Partial<AdminUser>): Promise<AdminUserDocument> {
        const created = new this.adminModel(input);
        return created.save();
    }

    async findByEmail(email: string): Promise<AdminUserDocument | null> {
        return this.adminModel.findOne({ email }).exec();
    }

    async findById(id: string | Types.ObjectId): Promise<AdminUserDocument | null> {
        return this.adminModel.findById(id).exec();
    }

    async findMany(query: AdminQuery): Promise<{ items: AdminUserDocument[]; total: number }> {
        const [items, total] = await Promise.all([
            this.adminModel.find().sort({ createdAt: -1 }).skip(query.skip).limit(query.limit).exec(),
            this.adminModel.countDocuments().exec(),
        ]);
        return { items, total };
    }

    async countAdmins(): Promise<{ total: number; active: number }> {
        const [total, active] = await Promise.all([
            this.adminModel.countDocuments().exec(),
            this.adminModel.countDocuments({ isActive: true }).exec(),
        ]);
        return { total, active };
    }

    async countActiveSuperAdmins(): Promise<number> {
        return this.adminModel.countDocuments({ role: AdminRole.SUPER_ADMIN, isActive: true }).exec();
    }

    async updateRole(id: string, role: AdminRole, permissions: Permission[]): Promise<AdminUserDocument | null> {
        return this.adminModel
            .findByIdAndUpdate(id, { $set: { role, permissions } }, { new: true })
            .exec();
    }

    async updateStatus(id: string, isActive: boolean): Promise<AdminUserDocument | null> {
        return this.adminModel.findByIdAndUpdate(id, { $set: { isActive } }, { new: true }).exec();
    }

    async updateLastLogin(id: string, date: Date): Promise<void> {
        await this.adminModel.findByIdAndUpdate(id, { $set: { lastLoginAt: date } }).exec();
    }
}
