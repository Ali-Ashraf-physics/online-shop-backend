import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductVariantDocument = ProductVariant & Document;

@Schema({ timestamps: true })
export class ProductVariant {
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    productId: string;

    @Prop({ required: true, unique: true })
    sku: string;

    @Prop({ required: true, min: 0 })
    priceMinor: number;

    @Prop({ type: Map, of: String, default: {} })
    attributes: Record<string, string>;
}

export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);
