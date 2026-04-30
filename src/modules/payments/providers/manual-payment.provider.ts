import { Injectable } from '@nestjs/common';
import { PaymentProviderInterface, PaymentInitiationResult, PaymentSnapshot } from '../interfaces/payment-provider.interface';
import { PaymentProvider } from '../enums/payment-provider.enum';

@Injectable()
export class ManualPaymentProvider implements PaymentProviderInterface {
    readonly provider = PaymentProvider.MANUAL;
    readonly supportsWebhook = false;

    async initiate(_payment: PaymentSnapshot, _idempotencyKey: string): Promise<PaymentInitiationResult> {
        return {};
    }
}
