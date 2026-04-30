import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { PaymentProviderInterface } from '../interfaces/payment-provider.interface';
import { CodPaymentProvider } from '../providers/cod-payment.provider';
import { ManualPaymentProvider } from '../providers/manual-payment.provider';

@Injectable()
export class PaymentProviderRegistryService {
    private readonly providers: Map<PaymentProvider, PaymentProviderInterface>;

    constructor(
        codProvider: CodPaymentProvider,
        manualProvider: ManualPaymentProvider,
    ) {
        this.providers = new Map([
            [codProvider.provider, codProvider],
            [manualProvider.provider, manualProvider],
        ]);
    }

    getProvider(provider: PaymentProvider): PaymentProviderInterface {
        const found = this.providers.get(provider);
        if (!found) {
            throw new BadRequestException('Unsupported payment provider');
        }
        return found;
    }
}
