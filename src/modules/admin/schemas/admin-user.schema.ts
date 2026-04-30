import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AdminRole } from '../enums/admin-role.enum';
import { Permission } from '../../../common/enums/permission.enum';

export type AdminUserDocument = AdminUser & Document;

@Schema({ timestamps: true })
export class AdminUser {
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ required: true, enum: AdminRole, default: AdminRole.ADMIN })
    role: AdminRole;

    @Prop({ type: [String], enum: Permission, default: [] })
    permissions: Permission[];

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    lastLoginAt?: Date;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
