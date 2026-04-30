import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderItemDocument = OrderItem & Document;

@Schema({ timestamps: true })
export class OrderItem {
    @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
    orderId: string;

    @Prop({ required: true })
    productId: string;

    @Prop()
    variantId?: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    sku: string;

    @Prop({ required: true })
    priceMinor: number;

    @Prop({ required: true })
    quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
