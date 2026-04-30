import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryItem, InventoryItemSchema } from './schemas/inventory-item.schema';
import { InventoryReservation, InventoryReservationSchema } from './schemas/inventory-reservation.schema';
import { StockMovement, StockMovementSchema } from './schemas/stock-movement.schema';
import { InventoryRepository } from './repositories/inventory.repository';
import { StockMovementsRepository } from './repositories/stock-movements.repository';
import { InventoryService } from './services/inventory.service';
import { StockReservationService } from './services/stock-reservation.service';
import { AdminInventoryController } from './controllers/admin-inventory.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: InventoryItem.name, schema: InventoryItemSchema },
            { name: InventoryReservation.name, schema: InventoryReservationSchema },
            { name: StockMovement.name, schema: StockMovementSchema },
        ]),
    ],
    providers: [InventoryRepository, StockMovementsRepository, InventoryService, StockReservationService],
    controllers: [AdminInventoryController],
    exports: [InventoryService, StockReservationService],
})
export class InventoryModule { }
