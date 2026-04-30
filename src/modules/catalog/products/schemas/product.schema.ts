import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductStatus } from '../enums/product-status.enum';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, unique: true })
    slug: string;

    @Prop()
    description?: string;

    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    categoryId: string;

    @Prop({ type: String, enum: ProductStatus, default: ProductStatus.DRAFT })
    status: ProductStatus;

    @Prop({ required: true, min: 0 })
    priceMinor: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
