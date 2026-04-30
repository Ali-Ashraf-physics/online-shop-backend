import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartItemDocument = CartItem & Document;

@Schema({ timestamps: true })
export class CartItem {
    @Prop({ type: Types.ObjectId, ref: 'Cart', required: true })
    cartId: string;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    productId: string;

    @Prop({ type: Types.ObjectId, ref: 'ProductVariant' })
    variantId?: string;

    @Prop({ required: true, min: 1 })
    quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
