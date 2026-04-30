import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { OrderStatusHistory, OrderStatusHistoryDocument } from '../schemas/order-status-history.schema';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { ShipmentStatus } from '../enums/shipment-status.enum';
import { OrderQueryDto } from '../dto/order-query.dto';

export type OrderStatusHistoryInput = {
    orderId: string;
    fromStatus: OrderStatus;
    toStatus: OrderStatus;
    actorId?: string;
    actorType?: 'ADMIN' | 'CUSTOMER' | 'SYSTEM';
    reason?: string;
};

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(OrderStatusHistory.name) private readonly statusHistoryModel: Model<OrderStatusHistoryDocument>,
    ) { }

    async createOrder(data: Partial<Order>): Promise<OrderDocument> {
        const created = new this.orderModel(data);
        return created.save();
    }

    async findById(id: string): Promise<OrderDocument | null> {
        return this.orderModel.findById(id).exec();
    }

    async findByOrderNumber(orderNumber: string): Promise<OrderDocument | null> {
        return this.orderModel.findOne({ orderNumber }).exec();
    }

    async findByIdempotencyKey(key: string): Promise<OrderDocument | null> {
        return this.orderModel.findOne({ idempotencyKey: key }).exec();
    }

    async findMany(query: OrderQueryDto): Promise<[OrderDocument[], number]> {
        const { page = 1, limit = 20, status, paymentStatus, shipmentStatus, customerId, orderNumber } = query;
        const filter: Record<string, unknown> = {};
        if (status) filter.status = status;
        if (paymentStatus) filter.paymentStatus = paymentStatus;
        if (shipmentStatus) filter.shipmentStatus = shipmentStatus;
        if (customerId) filter.customerId = customerId;
        if (orderNumber) filter.orderNumber = orderNumber;
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            this.orderModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            this.orderModel.countDocuments(filter).exec(),
        ]);

        return [items, total];
    }

    async updateStatus(id: string, status: OrderStatus): Promise<OrderDocument | null> {
        return this.orderModel.findByIdAndUpdate(id, { $set: { status } }, { new: true }).exec();
    }

    async updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<OrderDocument | null> {
        return this.orderModel.findByIdAndUpdate(id, { $set: { paymentStatus } }, { new: true }).exec();
    }

    async updateShipmentStatus(id: string, shipmentStatus: ShipmentStatus): Promise<OrderDocument | null> {
        return this.orderModel.findByIdAndUpdate(id, { $set: { shipmentStatus } }, { new: true }).exec();
    }

    async appendStatusHistory(input: OrderStatusHistoryInput): Promise<OrderStatusHistoryDocument> {
        const created = new this.statusHistoryModel(input);
        return created.save();
    }
}
