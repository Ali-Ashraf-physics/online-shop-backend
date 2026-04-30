import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrderNumberService {
    constructor(private readonly ordersRepository: OrdersRepository) { }

    async generateOrderNumber(): Promise<string> {
        const today = new Date();
        const datePart = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

        for (let attempt = 0; attempt < 5; attempt += 1) {
            const sequence = String(randomInt(0, 999999)).padStart(6, '0');
            const orderNumber = `ORD-${datePart}-${sequence}`;
            const existing = await this.ordersRepository.findByOrderNumber(orderNumber);
            if (!existing) return orderNumber;
        }

        throw new ServiceUnavailableException('Unable to generate order number');
    }
}
