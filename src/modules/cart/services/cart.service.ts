import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CartsRepository } from '../repositories/carts.repository';
import { AddCartItemDto } from '../dto/add-cart-item.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { CartResponseDto } from '../dto/cart-response.dto';
import { CartItemResponseDto } from '../dto/cart-item-response.dto';
import { CartPricingService } from './cart-pricing.service';

export type RequestContext = { user?: { sub: string }; sessionId?: string };

@Injectable()
export class CartService {
    constructor(
        private readonly cartsRepository: CartsRepository,
        private readonly cartPricingService: CartPricingService,
    ) { }

    private mapItem(item: import('../schemas/cart-item.schema').CartItemDocument): CartItemResponseDto {
        return {
            id: item._id.toString(),
            productId: item.productId.toString(),
            variantId: item.variantId?.toString(),
            quantity: item.quantity,
        };
    }

    private async mapCart(cart: import('../schemas/cart.schema').CartDocument): Promise<CartResponseDto> {
        const items = await this.cartsRepository.findItemsByCartId(cart._id.toString());
        const preview = await this.cartPricingService.calculateCartPreview(cart._id.toString());
        return {
            id: cart._id.toString(),
            items: items.map((item) => this.mapItem(item)),
            totalItems: preview.totalItems,
            isConverted: cart.isConverted,
        };
    }

    private resolveContext(context: RequestContext): { customerId?: string; sessionId?: string } {
        const customerId = context.user?.sub;
        const sessionId = context.sessionId;
        if (!customerId && !sessionId) {
            throw new BadRequestException('SessionId or authenticated user required');
        }
        return { customerId, sessionId };
    }

    async getActiveCart(context: RequestContext): Promise<CartResponseDto> {
        const identifiers = this.resolveContext(context);
        let cart = await this.cartsRepository.findActiveCartByCustomerOrSession(identifiers);
        if (!cart) {
            cart = await this.cartsRepository.createCart(identifiers);
        }
        return this.mapCart(cart);
    }

    async addItem(context: RequestContext, dto: AddCartItemDto): Promise<CartResponseDto> {
        const identifiers = this.resolveContext(context);
        let cart = await this.cartsRepository.findActiveCartByCustomerOrSession(identifiers);
        if (!cart) {
            cart = await this.cartsRepository.createCart(identifiers);
        }

        await this.cartsRepository.upsertCartItem(cart._id.toString(), {
            productId: dto.productId,
            variantId: dto.variantId,
            quantity: dto.quantity,
        });

        return this.mapCart(cart);
    }

    async updateItem(context: RequestContext, itemId: string, dto: UpdateCartItemDto): Promise<CartResponseDto> {
        const identifiers = this.resolveContext(context);
        const cart = await this.cartsRepository.findActiveCartByCustomerOrSession(identifiers);
        if (!cart) throw new NotFoundException('Cart not found');

        const item = await this.cartsRepository.findItem(cart._id.toString(), itemId);
        if (!item) throw new NotFoundException('Cart item not found');

        await this.cartsRepository.updateItemQuantity(itemId, dto.quantity);
        return this.mapCart(cart);
    }

    async removeItem(context: RequestContext, itemId: string): Promise<CartResponseDto> {
        const identifiers = this.resolveContext(context);
        const cart = await this.cartsRepository.findActiveCartByCustomerOrSession(identifiers);
        if (!cart) throw new NotFoundException('Cart not found');

        const item = await this.cartsRepository.findItem(cart._id.toString(), itemId);
        if (!item) throw new NotFoundException('Cart item not found');

        await this.cartsRepository.removeItem(itemId);
        return this.mapCart(cart);
    }

    async clearCart(context: RequestContext): Promise<CartResponseDto> {
        const identifiers = this.resolveContext(context);
        const cart = await this.cartsRepository.findActiveCartByCustomerOrSession(identifiers);
        if (!cart) throw new NotFoundException('Cart not found');

        await this.cartsRepository.clearItems(cart._id.toString());
        return this.mapCart(cart);
    }

    async mergeAnonymousCart(context: RequestContext, sessionId: string): Promise<CartResponseDto> {
        const customerId = context.user?.sub;
        if (!customerId) throw new BadRequestException('Authenticated customer required');

        const anonymousCart = await this.cartsRepository.findActiveCartByCustomerOrSession({ sessionId });
        if (!anonymousCart) {
            return this.getActiveCart({ user: { sub: customerId } });
        }

        const existingCart = await this.cartsRepository.findActiveCartByCustomerOrSession({ customerId });
        if (!existingCart) {
            const attached = await this.cartsRepository.attachCustomer(anonymousCart._id.toString(), customerId);
            if (!attached) throw new NotFoundException('Cart not found');
            return this.mapCart(attached);
        }

        const items = await this.cartsRepository.findItemsByCartId(anonymousCart._id.toString());
        for (const item of items) {
            await this.cartsRepository.upsertCartItem(existingCart._id.toString(), {
                productId: item.productId.toString(),
                variantId: item.variantId?.toString(),
                quantity: item.quantity,
            });
        }

        await this.cartsRepository.clearItems(anonymousCart._id.toString());
        return this.mapCart(existingCart);
    }

    async calculateCartPreview(cartId: string): Promise<{ totalItems: number }> {
        return this.cartPricingService.calculateCartPreview(cartId);
    }
}
