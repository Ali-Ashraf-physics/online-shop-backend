import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    userId: string; // Referencing Auth identifying identity

    @Prop({ required: true })
    fullName: string;

    @Prop()
    phone?: string;

    @Prop()
    avatarUrl?: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
