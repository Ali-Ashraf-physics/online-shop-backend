import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { CartItem, CartItemDocument } from '../schemas/cart-item.schema';

export type CartContextQuery = { customerId?: string; sessionId?: string };
export type CartItemInput = { productId: string; variantId?: string; quantity: number };

@Injectable()
export class CartsRepository {
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
        @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>,
    ) { }

    async findActiveCartByCustomerOrSession(context: CartContextQuery): Promise<CartDocument | null> {
        const filter: Record<string, unknown> = { isConverted: false };
        if (context.customerId) filter.customerId = context.customerId;
        if (context.sessionId) filter.sessionId = context.sessionId;
        return this.cartModel.findOne(filter).exec();
    }

    async createCart(input: CartContextQuery): Promise<CartDocument> {
        const created = new this.cartModel({
            customerId: input.customerId,
            sessionId: input.sessionId,
            isConverted: false,
        });
        return created.save();
    }

    async findItem(cartId: string, itemId: string): Promise<CartItemDocument | null> {
        return this.cartItemModel.findOne({ _id: itemId, cartId }).exec();
    }

    async findItemsByCartId(cartId: string): Promise<CartItemDocument[]> {
        return this.cartItemModel.find({ cartId }).exec();
    }

    async upsertCartItem(cartId: string, item: CartItemInput): Promise<CartItemDocument> {
        const existing = await this.cartItemModel
            .findOne({ cartId, productId: item.productId, variantId: item.variantId })
            .exec();

        if (existing) {
            existing.quantity += item.quantity;
            return existing.save();
        }

        const created = new this.cartItemModel({ ...item, cartId });
        return created.save();
    }

    async updateItemQuantity(itemId: string, quantity: number): Promise<CartItemDocument | null> {
        return this.cartItemModel.findByIdAndUpdate(itemId, { $set: { quantity } }, { new: true }).exec();
    }

    async removeItem(itemId: string): Promise<void> {
        await this.cartItemModel.findByIdAndDelete(itemId).exec();
    }

    async clearItems(cartId: string): Promise<void> {
        await this.cartItemModel.deleteMany({ cartId }).exec();
    }

    async markCartConverted(cartId: string): Promise<CartDocument | null> {
        return this.cartModel.findByIdAndUpdate(cartId, { $set: { isConverted: true } }, { new: true }).exec();
    }

    async attachCustomer(cartId: string, customerId: string): Promise<CartDocument | null> {
        return this.cartModel.findByIdAndUpdate(cartId, { $set: { customerId, sessionId: null } }, { new: true }).exec();
    }
}
