import { Body, Controller, Headers, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from '../services/payments.service';
import { PaymentWebhookDto } from '../dto/payment-webhook.dto';
import { PaymentWebhookResponseDto } from '../dto/payment-webhook-response.dto';
import { PaymentProvider } from '../enums/payment-provider.enum';

@ApiTags('Payment Webhooks')
@Controller('payments/webhook')
export class PaymentWebhooksController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post(':provider')
    @ApiOperation({ summary: 'Handle payment webhook', operationId: 'handlePaymentWebhook' })
    @ApiResponse({ status: 200, type: PaymentWebhookResponseDto })
    async handleWebhook(
        @Param('provider') provider: string,
        @Headers() headers: Record<string, string | string[]>,
        @Body() dto: PaymentWebhookDto,
    ): Promise<PaymentWebhookResponseDto> {
        const providerKey = this.parseProvider(provider);
        const normalizedHeaders = this.normalizeHeaders(headers);
        return this.paymentsService.handleWebhook(providerKey, normalizedHeaders, dto.payload);
    }

    private parseProvider(provider: string): PaymentProvider {
        const normalized = provider.toUpperCase();
        if (normalized in PaymentProvider) {
            return PaymentProvider[normalized as keyof typeof PaymentProvider];
        }
        throw new Error('Unsupported payment provider');
    }

    private normalizeHeaders(headers: Record<string, string | string[]>): Record<string, string> {
        const normalized: Record<string, string> = {};
        for (const [key, value] of Object.entries(headers)) {
            normalized[key.toLowerCase()] = Array.isArray(value) ? value[0] ?? '' : value;
        }
        return normalized;
    }
}
