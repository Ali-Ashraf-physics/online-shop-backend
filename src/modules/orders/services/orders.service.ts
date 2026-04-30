import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { OrderItemsRepository, OrderItemInput } from '../repositories/order-items.repository';
import { OrderNumberService } from './order-number.service';
import { OrderStateMachineService } from './order-state-machine.service';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { ShipmentStatus } from '../enums/shipment-status.enum';
import { OrderQueryDto } from '../dto/order-query.dto';
import { OrderListResponseDto, OrderResponseDto } from '../dto/order-response.dto';
import { OrderItemResponseDto } from '../dto/order-item-response.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { CancelOrderDto } from '../dto/cancel-order.dto';
import { AuditService } from '../../audit/services/audit.service';
import { AuditAction } from '../../audit/enums/audit-action.enum';

export type RequestContext = { user: { sub: string } };

export type OrderDraftItem = {
    productId: string;
    variantId?: string;
    title: string;
    sku: string;
    priceMinor: number;
    quantity: number;
};

export type OrderDraft = {
    customerId: string;
    currency: string;
    totalAmountMinor: number;
    shippingAmountMinor: number;
    discountAmountMinor: number;
    items: OrderDraftItem[];
};

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly orderItemsRepository: OrderItemsRepository,
        private readonly orderNumberService: OrderNumberService,
        private readonly stateMachine: OrderStateMachineService,
        private readonly auditService: AuditService,
    ) { }

    private mapItem(item: import('../schemas/order-item.schema').OrderItemDocument): OrderItemResponseDto {
        return {
            id: item._id.toString(),
            productId: item.productId.toString(),
            variantId: item.variantId?.toString(),
            title: item.title,
            sku: item.sku,
            priceMinor: item.priceMinor,
            quantity: item.quantity,
            lineTotalMinor: item.priceMinor * item.quantity,
        };
    }

    private async mapOrder(order: import('../schemas/order.schema').OrderDocument): Promise<OrderResponseDto> {
        const items = await this.orderItemsRepository.findByOrderId(order._id.toString());
        return {
            id: order._id.toString(),
            orderNumber: order.orderNumber,
            customerId: order.customerId,
            status: order.status,
            paymentStatus: order.paymentStatus,
            shipmentStatus: order.shipmentStatus,
            totalAmountMinor: order.totalAmountMinor,
            shippingAmountMinor: order.shippingAmountMinor,
            discountAmountMinor: order.discountAmountMinor,
            currency: order.currency,
            items: items.map((item) => this.mapItem(item)),
            createdAt: order.createdAt?.toISOString() ?? new Date().toISOString(),
        };
    }

    private assertTotals(draft: OrderDraft): void {
        const itemsTotal = draft.items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);
        const expectedTotal = itemsTotal + draft.shippingAmountMinor - draft.discountAmountMinor;
        if (expectedTotal !== draft.totalAmountMinor) {
            throw new BadRequestException('Order totals do not match item totals');
        }
    }

    async createOrderFromCheckout(context: RequestContext, draft: OrderDraft, idempotencyKey: string): Promise<OrderResponseDto> {
        if (!idempotencyKey) {
            throw new BadRequestException('Idempotency key is required');
        }

        const existing = await this.ordersRepository.findByIdempotencyKey(idempotencyKey);
        if (existing) {
            return this.mapOrder(existing);
        }

        if (!draft.items.length) {
            throw new BadRequestException('Order must include at least one item');
        }

        this.assertTotals(draft);

        const orderNumber = await this.orderNumberService.generateOrderNumber();
        const order = await this.ordersRepository.createOrder({
            orderNumber,
            customerId: draft.customerId,
            status: OrderStatus.PENDING,
            paymentStatus: PaymentStatus.UNPAID,
            shipmentStatus: ShipmentStatus.NOT_READY,
            totalAmountMinor: draft.totalAmountMinor,
            shippingAmountMinor: draft.shippingAmountMinor,
            discountAmountMinor: draft.discountAmountMinor,
            currency: draft.currency,
            idempotencyKey,
        });

        const itemsInput: OrderItemInput[] = draft.items.map((item) => ({
            orderId: order._id.toString(),
            productId: item.productId,
            variantId: item.variantId,
            title: item.title,
            sku: item.sku,
            priceMinor: item.priceMinor,
            quantity: item.quantity,
        }));

        await this.orderItemsRepository.createOrderItems(itemsInput);

        await this.auditService.record({
            action: AuditAction.ORDER_CREATED,
            actorId: context.user.sub,
            actorType: 'CUSTOMER',
            resourceId: order._id.toString(),
            resourceType: 'Order',
            afterState: { orderNumber: order.orderNumber, totalAmountMinor: order.totalAmountMinor },
        });

        return this.mapOrder(order);
    }

    async findCustomerOrders(context: RequestContext, query: OrderQueryDto): Promise<OrderListResponseDto> {
        const [items, total] = await this.ordersRepository.findMany({ ...query, customerId: context.user.sub });
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const mapped = await Promise.all(items.map((item) => this.mapOrder(item)));
        return { items: mapped, meta: { total, page, limit, totalPages } };
    }

    async findCustomerOrderById(context: RequestContext, id: string): Promise<OrderResponseDto> {
        const order = await this.ordersRepository.findById(id);
        if (!order) throw new NotFoundException('Order not found');
        if (order.customerId !== context.user.sub) {
            throw new NotFoundException('Order not found');
        }
        return this.mapOrder(order);
    }

    async findAdminOrders(query: OrderQueryDto): Promise<OrderListResponseDto> {
        const [items, total] = await this.ordersRepository.findMany(query);
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const mapped = await Promise.all(items.map((item) => this.mapOrder(item)));
        return { items: mapped, meta: { total, page, limit, totalPages } };
    }

    async findAdminOrderById(id: string): Promise<OrderResponseDto> {
        const order = await this.ordersRepository.findById(id);
        if (!order) throw new NotFoundException('Order not found');
        return this.mapOrder(order);
    }

    async updateStatus(context: RequestContext, id: string, dto: UpdateOrderStatusDto): Promise<OrderResponseDto> {
        const order = await this.ordersRepository.findById(id);
        if (!order) throw new NotFoundException('Order not found');

        this.stateMachine.assertTransitionAllowed(order.status, dto.status);

        const updated = await this.ordersRepository.updateStatus(id, dto.status);
        if (!updated) throw new NotFoundException('Order not found');

        await this.appendStatusHistory(order._id.toString(), {
            fromStatus: order.status,
            toStatus: dto.status,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            reason: dto.reason,
        });

        await this.auditService.record({
            action: AuditAction.ORDER_STATUS_CHANGED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: order._id.toString(),
            resourceType: 'Order',
            beforeState: { status: order.status },
            afterState: { status: dto.status },
            metadata: { reason: dto.reason },
        });

        return this.mapOrder(updated);
    }

    async cancelOrder(context: RequestContext, id: string, dto: CancelOrderDto): Promise<OrderResponseDto> {
        const order = await this.ordersRepository.findById(id);
        if (!order) throw new NotFoundException('Order not found');

        this.stateMachine.assertTransitionAllowed(order.status, OrderStatus.CANCELLED);

        const updated = await this.ordersRepository.updateStatus(id, OrderStatus.CANCELLED);
        if (!updated) throw new NotFoundException('Order not found');

        await this.appendStatusHistory(order._id.toString(), {
            fromStatus: order.status,
            toStatus: OrderStatus.CANCELLED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            reason: dto.reason,
        });

        await this.auditService.record({
            action: AuditAction.ORDER_STATUS_CHANGED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: order._id.toString(),
            resourceType: 'Order',
            beforeState: { status: order.status },
            afterState: { status: OrderStatus.CANCELLED },
            metadata: { reason: dto.reason },
        });

        return this.mapOrder(updated);
    }

    async appendStatusHistory(orderId: string, transition: {
        fromStatus: OrderStatus;
        toStatus: OrderStatus;
        actorId?: string;
        actorType?: 'ADMIN' | 'CUSTOMER' | 'SYSTEM';
        reason?: string;
    }): Promise<void> {
        await this.ordersRepository.appendStatusHistory({
            orderId,
            fromStatus: transition.fromStatus,
            toStatus: transition.toStatus,
            actorId: transition.actorId,
            actorType: transition.actorType,
            reason: transition.reason,
        });
    }

    assertTransitionAllowed(from: OrderStatus, to: OrderStatus): void {
        this.stateMachine.assertTransitionAllowed(from, to);
    }

    async updatePaymentStatus(orderId: string, paymentStatus: PaymentStatus): Promise<void> {
        const order = await this.ordersRepository.findById(orderId);
        if (!order) throw new NotFoundException('Order not found');
        await this.ordersRepository.updatePaymentStatus(orderId, paymentStatus);
    }

    async updateShipmentStatus(orderId: string, shipmentStatus: ShipmentStatus): Promise<void> {
        const order = await this.ordersRepository.findById(orderId);
        if (!order) throw new NotFoundException('Order not found');
        await this.ordersRepository.updateShipmentStatus(orderId, shipmentStatus);
    }
}
