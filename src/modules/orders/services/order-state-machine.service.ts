import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderStatus } from '../enums/order-status.enum';

@Injectable()
export class OrderStateMachineService {
    private readonly transitions: Record<OrderStatus, OrderStatus[]> = {
        [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
        [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
        [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
        [OrderStatus.DELIVERED]: [],
        [OrderStatus.CANCELLED]: [],
    };

    assertTransitionAllowed(from: OrderStatus, to: OrderStatus): void {
        const allowed = this.transitions[from] ?? [];
        if (!allowed.includes(to)) {
            throw new BadRequestException(`Order transition from ${from} to ${to} is not allowed`);
        }
    }
}
