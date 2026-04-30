import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';

export type OrderStatusHistoryDocument = OrderStatusHistory & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class OrderStatusHistory {
    @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
    orderId: string;

    @Prop({ enum: OrderStatus, required: true })
    fromStatus: OrderStatus;

    @Prop({ enum: OrderStatus, required: true })
    toStatus: OrderStatus;

    @Prop()
    actorId?: string;

    @Prop({ enum: ['ADMIN', 'CUSTOMER', 'SYSTEM'] })
    actorType?: string;

    @Prop()
    reason?: string;
}

export const OrderStatusHistorySchema = SchemaFactory.createForClass(OrderStatusHistory);
