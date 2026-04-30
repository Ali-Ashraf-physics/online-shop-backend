import { Injectable } from '@nestjs/common';
import { CartsRepository } from '../repositories/carts.repository';

@Injectable()
export class CartPricingService {
    constructor(private readonly cartsRepository: CartsRepository) { }

    async calculateCartPreview(cartId: string): Promise<{ totalItems: number }> {
        const items = await this.cartsRepository.findItemsByCartId(cartId);
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        return { totalItems };
    }
}
