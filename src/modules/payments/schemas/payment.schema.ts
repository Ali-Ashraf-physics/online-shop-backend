import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
    @Prop({ required: true })
    orderId: string;

    @Prop({ required: true, unique: true })
    idempotencyKey: string;

    @Prop({ required: true, enum: PaymentProvider })
    provider: PaymentProvider;

    @Prop({ required: true, enum: PaymentMethod })
    method: PaymentMethod;

    @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
    status: PaymentStatus;

    @Prop({ required: true })
    amountMinor: number;

    @Prop({ required: true })
    currency: string;

    @Prop()
    providerReference?: string;

    @Prop({ type: Object })
    metadata?: Record<string, unknown>;

    @Prop()
    failureReason?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
