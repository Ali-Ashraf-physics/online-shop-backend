import { Injectable } from '@nestjs/common';
import { PaymentProviderInterface, PaymentInitiationResult, PaymentSnapshot } from '../interfaces/payment-provider.interface';
import { PaymentProvider } from '../enums/payment-provider.enum';

@Injectable()
export class CodPaymentProvider implements PaymentProviderInterface {
    readonly provider = PaymentProvider.COD;
    readonly supportsWebhook = false;

    async initiate(_payment: PaymentSnapshot, _idempotencyKey: string): Promise<PaymentInitiationResult> {
        return {};
    }
}
