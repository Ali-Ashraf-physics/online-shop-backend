import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderItem, OrderItemSchema } from './schemas/order-item.schema';
import { OrderStatusHistory, OrderStatusHistorySchema } from './schemas/order-status-history.schema';
import { OrdersRepository } from './repositories/orders.repository';
import { OrderItemsRepository } from './repositories/order-items.repository';
import { OrderNumberService } from './services/order-number.service';
import { OrderStateMachineService } from './services/order-state-machine.service';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { AdminOrdersController } from './controllers/admin-orders.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Order.name, schema: OrderSchema },
            { name: OrderItem.name, schema: OrderItemSchema },
            { name: OrderStatusHistory.name, schema: OrderStatusHistorySchema },
        ]),
        AuditModule,
    ],
    providers: [
        OrdersRepository,
        OrderItemsRepository,
        OrderNumberService,
        OrderStateMachineService,
        OrdersService,
    ],
    controllers: [OrdersController, AdminOrdersController],
    exports: [OrdersService],
})
export class OrdersModule { }
