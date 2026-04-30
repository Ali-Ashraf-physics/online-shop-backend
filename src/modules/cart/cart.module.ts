import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import { CartItem, CartItemSchema } from './schemas/cart-item.schema';
import { CartsRepository } from './repositories/carts.repository';
import { CartService } from './services/cart.service';
import { CartPricingService } from './services/cart-pricing.service';
import { CartController } from './controllers/cart.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Cart.name, schema: CartSchema },
            { name: CartItem.name, schema: CartItemSchema },
        ]),
    ],
    providers: [CartsRepository, CartService, CartPricingService],
    controllers: [CartController],
    exports: [CartService],
})
export class CartModule { }
