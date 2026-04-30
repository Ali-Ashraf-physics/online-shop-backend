import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StockMovementType } from '../enums/stock-movement-type.enum';

export type StockMovementDocument = StockMovement & Document;

@Schema({ timestamps: true })
export class StockMovement {
    @Prop({ required: true })
    sku: string;

    @Prop({ required: true })
    delta: number;

    @Prop({ required: true, enum: StockMovementType })
    type: StockMovementType;

    @Prop({ required: true })
    reason: string;

    @Prop()
    actorId?: string;

    @Prop()
    orderId?: string;
}

export const StockMovementSchema = SchemaFactory.createForClass(StockMovement);
