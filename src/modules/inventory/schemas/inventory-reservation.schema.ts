import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ReservationStatus } from '../enums/reservation-status.enum';

export type InventoryReservationDocument = InventoryReservation & Document;

@Schema({ timestamps: true })
export class InventoryReservation {
    @Prop({ required: true, unique: true })
    orderId: string;

    @Prop({ required: true, unique: true })
    idempotencyKey: string;

    @Prop({ required: true, type: [{ sku: String, quantity: Number }] })
    items: Array<{ sku: string; quantity: number }>;

    @Prop({ required: true, enum: ReservationStatus, default: ReservationStatus.RESERVED })
    status: ReservationStatus;

    @Prop({ type: Date, required: true })
    expiresAt: Date;

    @Prop({ type: MongooseSchema.Types.Mixed })
    metadata?: Record<string, unknown>;
}

export const InventoryReservationSchema = SchemaFactory.createForClass(InventoryReservation);
