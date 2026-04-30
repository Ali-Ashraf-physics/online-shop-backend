import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from '../schemas/payment.schema';
import { PaymentStatus } from '../enums/payment-status.enum';
import { AdminPaymentQueryDto } from '../dto/admin-payment-query.dto';

@Injectable()
export class PaymentsRepository {
    constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>) { }

    async create(data: Partial<Payment>): Promise<PaymentDocument> {
        const created = new this.paymentModel(data);
        return created.save();
    }

    async findById(id: string): Promise<PaymentDocument | null> {
        return this.paymentModel.findById(id).exec();
    }

    async findByOrderId(orderId: string): Promise<PaymentDocument | null> {
        return this.paymentModel.findOne({ orderId }).exec();
    }

    async findByIdempotencyKey(key: string): Promise<PaymentDocument | null> {
        return this.paymentModel.findOne({ idempotencyKey: key }).exec();
    }

    async updateStatus(id: string, status: PaymentStatus, failureReason?: string): Promise<PaymentDocument | null> {
        return this.paymentModel.findByIdAndUpdate(id, { $set: { status, failureReason } }, { new: true }).exec();
    }

    async findMany(query: AdminPaymentQueryDto): Promise<[PaymentDocument[], number]> {
        const { page = 1, limit = 20, status, provider, orderId } = query;
        const filter: Record<string, unknown> = {};
        if (status) filter.status = status;
        if (provider) filter.provider = provider;
        if (orderId) filter.orderId = orderId;
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            this.paymentModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            this.paymentModel.countDocuments(filter).exec(),
        ]);

        return [items, total];
    }
}
