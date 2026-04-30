import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventoryItemDocument = InventoryItem & Document;

@Schema({ timestamps: true })
export class InventoryItem {
    @Prop({ required: true, unique: true })
    sku: string;

    @Prop({ required: true, default: 0, min: 0 })
    availableQty: number;

    @Prop({ required: true, default: 0, min: 0 })
    reservedQty: number;

    @Prop({ required: true, default: 0, min: 0 })
    soldQty: number;
}

export const InventoryItemSchema = SchemaFactory.createForClass(InventoryItem);
