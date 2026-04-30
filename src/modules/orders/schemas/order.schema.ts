import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { ShipmentStatus } from '../enums/shipment-status.enum';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true, unique: true })
    orderNumber: string;

    @Prop({ required: true })
    customerId: string;

    @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;

    @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.UNPAID })
    paymentStatus: PaymentStatus;

    @Prop({ required: true, enum: ShipmentStatus, default: ShipmentStatus.NOT_READY })
    shipmentStatus: ShipmentStatus;

    @Prop({ required: true })
    totalAmountMinor: number;

    @Prop({ required: true, default: 0 })
    shippingAmountMinor: number;

    @Prop({ required: true, default: 0 })
    discountAmountMinor: number;

    @Prop({ required: true })
    currency: string;

    @Prop({ required: true })
    idempotencyKey: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
