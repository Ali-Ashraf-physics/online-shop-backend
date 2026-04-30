import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentWebhookEvent, PaymentWebhookEventDocument } from '../schemas/payment-webhook-event.schema';
import { PaymentProvider } from '../enums/payment-provider.enum';

@Injectable()
export class PaymentWebhookEventsRepository {
    constructor(@InjectModel(PaymentWebhookEvent.name) private readonly webhookModel: Model<PaymentWebhookEventDocument>) { }

    async storeWebhookEvent(input: { provider: PaymentProvider; eventId: string; payload: Record<string, unknown> }): Promise<PaymentWebhookEventDocument> {
        const created = new this.webhookModel(input);
        return created.save();
    }

    async findWebhookEvent(provider: PaymentProvider, eventId: string): Promise<PaymentWebhookEventDocument | null> {
        return this.webhookModel.findOne({ provider, eventId }).exec();
    }
}
