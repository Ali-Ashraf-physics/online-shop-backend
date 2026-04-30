import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createHash } from 'crypto';
import { PaymentsRepository } from '../repositories/payments.repository';
import { PaymentWebhookEventsRepository } from '../repositories/payment-webhook-events.repository';
import { PaymentProviderRegistryService } from './payment-provider-registry.service';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { InitiatePaymentDto } from '../dto/initiate-payment.dto';
import { ManualPaymentDto } from '../dto/manual-payment.dto';
import { PaymentResponseDto, PaymentListResponseDto } from '../dto/payment-response.dto';
import { AdminPaymentQueryDto } from '../dto/admin-payment-query.dto';
import { PaymentWebhookResponseDto } from '../dto/payment-webhook-response.dto';
import { PaymentSnapshot } from '../interfaces/payment-provider.interface';
import { OrdersService } from '../../orders/services/orders.service';
import { PaymentStatus as OrderPaymentStatus } from '../../orders/enums/payment-status.enum';
import { AuditService } from '../../audit/services/audit.service';
import { AuditAction } from '../../audit/enums/audit-action.enum';

export type RequestContext = { user: { sub: string } };

export type OrderPaymentDraft = {
    id: string;
    customerId: string;
    totalAmountMinor: number;
    currency: string;
};

@Injectable()
export class PaymentsService {
    constructor(
        private readonly paymentsRepository: PaymentsRepository,
        private readonly webhookEventsRepository: PaymentWebhookEventsRepository,
        private readonly providerRegistry: PaymentProviderRegistryService,
        private readonly ordersService: OrdersService,
        private readonly auditService: AuditService,
    ) { }

    private mapPayment(payment: import('../schemas/payment.schema').PaymentDocument, redirectUrl?: string): PaymentResponseDto {
        return {
            id: payment._id.toString(),
            orderId: payment.orderId,
            provider: payment.provider,
            method: payment.method,
            status: payment.status,
            amountMinor: payment.amountMinor,
            currency: payment.currency,
            redirectUrl,
            failureReason: payment.failureReason,
            createdAt: payment.createdAt?.toISOString() ?? new Date().toISOString(),
        };
    }

    private resolveProvider(method: PaymentMethod): PaymentProvider {
        switch (method) {
            case PaymentMethod.COD:
                return PaymentProvider.COD;
            case PaymentMethod.MANUAL:
                return PaymentProvider.MANUAL;
            default:
                return PaymentProvider.MANUAL;
        }
    }

    private mapOrderPaymentStatus(status: PaymentStatus): OrderPaymentStatus {
        switch (status) {
            case PaymentStatus.PAID:
                return OrderPaymentStatus.PAID;
            case PaymentStatus.FAILED:
                return OrderPaymentStatus.FAILED;
            default:
                return OrderPaymentStatus.UNPAID;
        }
    }

    assertPaymentTransitionAllowed(from: PaymentStatus, to: PaymentStatus): void {
        const allowed: Record<PaymentStatus, PaymentStatus[]> = {
            [PaymentStatus.PENDING]: [PaymentStatus.PAID, PaymentStatus.FAILED],
            [PaymentStatus.PAID]: [],
            [PaymentStatus.FAILED]: [],
        };
        if (!allowed[from]?.includes(to)) {
            throw new BadRequestException(`Payment transition from ${from} to ${to} is not allowed`);
        }
    }

    async createPaymentForOrder(order: OrderPaymentDraft, method: PaymentMethod, idempotencyKey: string): Promise<PaymentResponseDto> {
        if (!idempotencyKey) {
            throw new BadRequestException('Idempotency key is required');
        }

        const existingByKey = await this.paymentsRepository.findByIdempotencyKey(idempotencyKey);
        if (existingByKey) return this.mapPayment(existingByKey);

        const existing = await this.paymentsRepository.findByOrderId(order.id);
        if (existing) return this.mapPayment(existing);

        const provider = this.resolveProvider(method);
        const payment = await this.paymentsRepository.create({
            orderId: order.id,
            idempotencyKey,
            provider,
            method,
            status: PaymentStatus.PENDING,
            amountMinor: order.totalAmountMinor,
            currency: order.currency,
        });

        return this.mapPayment(payment);
    }

    async initiatePayment(context: RequestContext, dto: InitiatePaymentDto, idempotencyKey: string): Promise<PaymentResponseDto> {
        if (dto.idempotencyKey !== idempotencyKey) {
            throw new BadRequestException('Idempotency key mismatch');
        }

        const order = await this.ordersService.findCustomerOrderById({ user: { sub: context.user.sub } }, dto.orderId);
        const payment = await this.createPaymentForOrder({
            id: order.id,
            customerId: order.customerId,
            totalAmountMinor: order.totalAmountMinor,
            currency: order.currency,
        }, dto.method, idempotencyKey);

        const provider = this.providerRegistry.getProvider(payment.provider);
        const initiation = await provider.initiate({
            id: payment.id,
            orderId: payment.orderId,
            amountMinor: payment.amountMinor,
            currency: payment.currency,
            method: payment.method,
        }, idempotencyKey);

        return { ...payment, redirectUrl: initiation.redirectUrl };
    }

    async handleWebhook(providerKey: PaymentProvider, headers: Record<string, string>, payload: Record<string, unknown>): Promise<PaymentWebhookResponseDto> {
        const provider = this.providerRegistry.getProvider(providerKey);
        if (!provider.supportsWebhook) {
            throw new BadRequestException('Webhook not supported for provider');
        }

        if (provider.verifyWebhook) {
            const isValid = await provider.verifyWebhook(headers, payload);
            if (!isValid) {
                throw new BadRequestException('Invalid webhook signature');
            }
        }

        const parsed = provider.parseWebhook?.(payload);
        const eventId = parsed?.eventId ?? this.hashPayload(payload);

        const existing = await this.webhookEventsRepository.findWebhookEvent(providerKey, eventId);
        if (existing) {
            return { received: true, duplicate: true };
        }

        await this.webhookEventsRepository.storeWebhookEvent({ provider: providerKey, eventId, payload });

        if (parsed?.paymentId && parsed.status) {
            const payment = await this.paymentsRepository.findById(parsed.paymentId);
            if (payment && payment.status !== parsed.status) {
                this.assertPaymentTransitionAllowed(payment.status, parsed.status);
                await this.paymentsRepository.updateStatus(payment._id.toString(), parsed.status);
                await this.ordersService.updatePaymentStatus(payment.orderId, this.mapOrderPaymentStatus(parsed.status));
            }
        }

        return { received: true };
    }

    async markManualPaid(context: RequestContext, paymentId: string, dto: ManualPaymentDto): Promise<PaymentResponseDto> {
        const payment = await this.paymentsRepository.findById(paymentId);
        if (!payment) throw new NotFoundException('Payment not found');

        this.assertPaymentTransitionAllowed(payment.status, PaymentStatus.PAID);
        const updated = await this.paymentsRepository.updateStatus(paymentId, PaymentStatus.PAID);
        if (!updated) throw new NotFoundException('Payment not found');

        await this.ordersService.updatePaymentStatus(payment.orderId, OrderPaymentStatus.PAID);

        await this.auditService.record({
            action: AuditAction.SYSTEM_SETTINGS_UPDATED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: paymentId,
            resourceType: 'Payment',
            beforeState: { status: payment.status },
            afterState: { status: PaymentStatus.PAID },
            metadata: { note: dto.note },
        });

        return this.mapPayment(updated);
    }

    async markFailed(context: RequestContext, paymentId: string, dto: ManualPaymentDto): Promise<PaymentResponseDto> {
        const payment = await this.paymentsRepository.findById(paymentId);
        if (!payment) throw new NotFoundException('Payment not found');

        this.assertPaymentTransitionAllowed(payment.status, PaymentStatus.FAILED);
        const updated = await this.paymentsRepository.updateStatus(paymentId, PaymentStatus.FAILED, dto.reason);
        if (!updated) throw new NotFoundException('Payment not found');

        await this.ordersService.updatePaymentStatus(payment.orderId, OrderPaymentStatus.FAILED);

        await this.auditService.record({
            action: AuditAction.SYSTEM_SETTINGS_UPDATED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: paymentId,
            resourceType: 'Payment',
            beforeState: { status: payment.status },
            afterState: { status: PaymentStatus.FAILED },
            metadata: { reason: dto.reason },
        });

        return this.mapPayment(updated);
    }

    async listPayments(query: AdminPaymentQueryDto): Promise<PaymentListResponseDto> {
        const [items, total] = await this.paymentsRepository.findMany(query);
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const mapped = items.map((item) => this.mapPayment(item));
        return { items: mapped, meta: { total, page, limit, totalPages } };
    }

    private hashPayload(payload: Record<string, unknown>): string {
        const json = JSON.stringify(payload);
        return createHash('sha256').update(json).digest('hex');
    }
}
