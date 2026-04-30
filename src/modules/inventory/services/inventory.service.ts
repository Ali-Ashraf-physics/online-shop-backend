import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from '../repositories/inventory.repository';
import { StockMovementsRepository } from '../repositories/stock-movements.repository';
import { AdjustStockDto } from '../dto/adjust-stock.dto';
import { InventoryResponseDto } from '../dto/inventory-response.dto';
import { StockMovementType } from '../enums/stock-movement-type.enum';
import { StockMovementResponseDto } from '../dto/stock-movement-response.dto';
import { AuditService } from '../../audit/services/audit.service';
import { AuditAction } from '../../audit/enums/audit-action.enum';

export type RequestContext = { user: { sub: string } };
export type StockItemRequest = { sku: string; quantity: number };

@Injectable()
export class InventoryService {
    constructor(
        private readonly inventoryRepository: InventoryRepository,
        private readonly stockMovementsRepository: StockMovementsRepository,
        private readonly auditService: AuditService,
    ) { }

    private mapInventory(item: { sku: string; availableQty: number; reservedQty: number; soldQty: number }): InventoryResponseDto {
        return {
            sku: item.sku,
            availableQty: item.availableQty,
            reservedQty: item.reservedQty,
            soldQty: item.soldQty,
        };
    }

    private mapMovement(movement: { _id: { toString(): string }; sku: string; delta: number; type: StockMovementType; reason: string; orderId?: string; actorId?: string }): StockMovementResponseDto {
        return {
            id: movement._id.toString(),
            sku: movement.sku,
            delta: movement.delta,
            type: movement.type,
            reason: movement.reason,
            orderId: movement.orderId,
            actorId: movement.actorId,
        };
    }

    async getAvailability(sku: string): Promise<InventoryResponseDto> {
        const item = await this.inventoryRepository.findBySku(sku);
        if (!item) throw new NotFoundException('SKU not found');
        return this.mapInventory(item);
    }

    async adjustStock(context: RequestContext, sku: string, dto: AdjustStockDto): Promise<InventoryResponseDto> {
        if (dto.delta === 0) {
            throw new BadRequestException('Adjustment delta must be non-zero');
        }

        const item = await this.inventoryRepository.findBySku(sku);
        if (!item) {
            await this.inventoryRepository.upsertInventoryItem({ sku, availableQty: 0, reservedQty: 0, soldQty: 0 });
        }

        const updated = await this.inventoryRepository.updateQuantitiesAtomically(sku, { available: dto.delta });
        if (!updated) throw new NotFoundException('SKU not found');

        if (updated.availableQty < 0) {
            throw new BadRequestException('Insufficient stock for adjustment');
        }

        await this.stockMovementsRepository.createStockMovement({
            sku,
            delta: dto.delta,
            type: StockMovementType.ADJUSTMENT,
            reason: dto.reason,
            actorId: context.user.sub,
        });

        await this.auditService.record({
            action: AuditAction.INVENTORY_ADJUSTED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: sku,
            resourceType: 'InventoryItem',
            afterState: { availableQty: updated.availableQty, reservedQty: updated.reservedQty, soldQty: updated.soldQty },
            metadata: { reason: dto.reason },
        });

        return this.mapInventory(updated);
    }

    async listStockMovements(sku: string): Promise<StockMovementResponseDto[]> {
        const movements = await this.stockMovementsRepository.findBySku(sku);
        return movements.map((movement) => this.mapMovement(movement));
    }

    async assertAvailable(items: StockItemRequest[]): Promise<void> {
        for (const item of items) {
            const inventoryItem = await this.inventoryRepository.findBySku(item.sku);
            if (!inventoryItem) throw new NotFoundException(`SKU not found: ${item.sku}`);
            if (inventoryItem.availableQty < item.quantity) {
                throw new BadRequestException(`Insufficient stock for SKU: ${item.sku}`);
            }
        }
    }
}
