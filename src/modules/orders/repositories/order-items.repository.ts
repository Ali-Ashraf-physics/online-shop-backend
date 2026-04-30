import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItem, OrderItemDocument } from '../schemas/order-item.schema';

export type OrderItemInput = {
    orderId: string;
    productId: string;
    variantId?: string;
    title: string;
    sku: string;
    priceMinor: number;
    quantity: number;
};

@Injectable()
export class OrderItemsRepository {
    constructor(@InjectModel(OrderItem.name) private readonly orderItemModel: Model<OrderItemDocument>) { }

    async createOrderItems(items: OrderItemInput[]): Promise<OrderItemDocument[]> {
        if (items.length === 0) return [];
        return this.orderItemModel.insertMany(items, { ordered: true });
    }

    async findByOrderId(orderId: string): Promise<OrderItemDocument[]> {
        return this.orderItemModel.find({ orderId }).exec();
    }
}
