import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
    @Prop({ required: false })
    customerId?: string;

    @Prop({ required: false })
    sessionId?: string;

    @Prop({ default: false })
    isConverted: boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
