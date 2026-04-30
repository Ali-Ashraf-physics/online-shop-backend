import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InventoryRepository } from '../repositories/inventory.repository';
import { StockMovementsRepository } from '../repositories/stock-movements.repository';
import { ReservationStatus } from '../enums/reservation-status.enum';
import { StockMovementType } from '../enums/stock-movement-type.enum';
import { InventoryService, StockItemRequest } from './inventory.service';

export type ReservationContext = { orderId: string };

@Injectable()
export class StockReservationService {
    constructor(
        private readonly inventoryRepository: InventoryRepository,
        private readonly stockMovementsRepository: StockMovementsRepository,
        private readonly inventoryService: InventoryService,
    ) { }

    async reserveStock(context: ReservationContext, items: StockItemRequest[], idempotencyKey: string) {
        if (!idempotencyKey) {
            throw new BadRequestException('Idempotency key is required');
        }

        const existingByKey = await this.inventoryRepository.findReservationByIdempotencyKey(idempotencyKey);
        if (existingByKey) return existingByKey;

        const existing = await this.inventoryRepository.findReservationByOrderId(context.orderId);
        if (existing) return existing;

        await this.inventoryService.assertAvailable(items);

        for (const item of items) {
            const updated = await this.inventoryRepository.updateQuantitiesAtomically(item.sku, {
                available: -item.quantity,
                reserved: item.quantity,
            });
            if (!updated || updated.availableQty < 0) {
                throw new ConflictException(`Insufficient stock for SKU: ${item.sku}`);
            }

            await this.stockMovementsRepository.createStockMovement({
                sku: item.sku,
                delta: -item.quantity,
                type: StockMovementType.RESERVATION,
                reason: 'Reservation',
                orderId: context.orderId,
            });
        }

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 30);

        return this.inventoryRepository.createReservation({
            orderId: context.orderId,
            idempotencyKey,
            items,
            status: ReservationStatus.RESERVED,
            expiresAt,
        });
    }

    async releaseReservation(orderId: string): Promise<void> {
        const reservation = await this.inventoryRepository.findReservationByOrderId(orderId);
        if (!reservation) throw new NotFoundException('Reservation not found');
        if (reservation.status !== ReservationStatus.RESERVED) {
            throw new ConflictException('Reservation already finalized');
        }

        for (const item of reservation.items) {
            await this.inventoryRepository.updateQuantitiesAtomically(item.sku, {
                available: item.quantity,
                reserved: -item.quantity,
            });
            await this.stockMovementsRepository.createStockMovement({
                sku: item.sku,
                delta: item.quantity,
                type: StockMovementType.RELEASE,
                reason: 'Reservation release',
                orderId,
            });
        }

        await this.inventoryRepository.updateReservationStatus(orderId, ReservationStatus.RELEASED);
    }

    async consumeReservation(orderId: string): Promise<void> {
        const reservation = await this.inventoryRepository.findReservationByOrderId(orderId);
        if (!reservation) throw new NotFoundException('Reservation not found');
        if (reservation.status !== ReservationStatus.RESERVED) {
            throw new ConflictException('Reservation already finalized');
        }

        for (const item of reservation.items) {
            await this.inventoryRepository.updateQuantitiesAtomically(item.sku, {
                reserved: -item.quantity,
                sold: item.quantity,
            });
            await this.stockMovementsRepository.createStockMovement({
                sku: item.sku,
                delta: item.quantity,
                type: StockMovementType.CONSUMPTION,
                reason: 'Reservation consumed',
                orderId,
            });
        }

        await this.inventoryRepository.updateReservationStatus(orderId, ReservationStatus.CONSUMED);
    }
}
