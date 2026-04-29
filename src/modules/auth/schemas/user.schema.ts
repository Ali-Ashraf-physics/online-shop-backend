import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    emailOrPhone: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ required: true, default: 'CUSTOMER' })
    role: string;

    @Prop({ type: [String], default: [] })
    permissions: string[];

    @Prop({ default: true })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
