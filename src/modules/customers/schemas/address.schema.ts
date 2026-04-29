import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true })
export class Address {
    @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
    customerId: string;

    @Prop({ required: true })
    title: string; // e.g., Home, Work

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    area: string;

    @Prop({ required: true })
    district: string;

    @Prop()
    phone?: string;

    @Prop({ default: false })
    isDefault: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
