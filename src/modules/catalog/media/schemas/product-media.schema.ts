import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductMediaType } from '../enums/product-media-type.enum';

export type ProductMediaDocument = ProductMedia & Document;

@Schema({ timestamps: true })
export class ProductMedia {
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    productId: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true, enum: ProductMediaType })
    type: ProductMediaType;

    @Prop()
    alt?: string;

    @Prop({ default: 0 })
    sortOrder: number;
}

export const ProductMediaSchema = SchemaFactory.createForClass(ProductMedia);
