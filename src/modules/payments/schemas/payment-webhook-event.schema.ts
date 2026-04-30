import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentProvider } from '../enums/payment-provider.enum';

export type PaymentWebhookEventDocument = PaymentWebhookEvent & Document;

@Schema({ timestamps: true })
export class PaymentWebhookEvent {
    @Prop({ required: true, enum: PaymentProvider })
    provider: PaymentProvider;

    @Prop({ required: true })
    eventId: string;

    @Prop({ type: Object })
    payload: Record<string, unknown>;
}

export const PaymentWebhookEventSchema = SchemaFactory.createForClass(PaymentWebhookEvent);
PaymentWebhookEventSchema.index({ provider: 1, eventId: 1 }, { unique: true });
