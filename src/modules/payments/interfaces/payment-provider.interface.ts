import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export type PaymentSnapshot = {
    id: string;
    orderId: string;
    amountMinor: number;
    currency: string;
    method: PaymentMethod;
};

export type PaymentInitiationResult = {
    redirectUrl?: string;
    status?: PaymentStatus;
};

export type PaymentWebhookResult = {
    eventId: string;
    paymentId?: string;
    status?: PaymentStatus;
    metadata?: Record<string, unknown>;
};

export interface PaymentProviderInterface {
    provider: PaymentProvider;
    supportsWebhook: boolean;
    initiate(payment: PaymentSnapshot, idempotencyKey: string): Promise<PaymentInitiationResult>;
    verifyWebhook?(headers: Record<string, string>, body: Record<string, unknown>): Promise<boolean>;
    parseWebhook?(body: Record<string, unknown>): PaymentWebhookResult;
}
