import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { CartQueryDto } from '../dto/cart-query.dto';
import { AddCartItemDto } from '../dto/add-cart-item.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { CartResponseDto } from '../dto/cart-response.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    @ApiOperation({ summary: 'Get active cart', operationId: 'getActiveCart' })
    @ApiResponse({ status: 200, type: CartResponseDto })
    async getCart(
        @Req() req: { user?: { sub: string } },
        @Query() query: CartQueryDto,
    ): Promise<CartResponseDto> {
        return this.cartService.getActiveCart({ user: req.user, sessionId: query.sessionId });
    }

    @Post('items')
    @ApiOperation({ summary: 'Add item to cart', operationId: 'addCartItem' })
    @ApiResponse({ status: 201, type: CartResponseDto })
    async addItem(
        @Req() req: { user?: { sub: string } },
        @Query() query: CartQueryDto,
        @Body() dto: AddCartItemDto,
    ): Promise<CartResponseDto> {
        return this.cartService.addItem({ user: req.user, sessionId: query.sessionId }, dto);
    }

    @Patch('items/:itemId')
    @ApiOperation({ summary: 'Update cart item quantity', operationId: 'updateCartItem' })
    @ApiResponse({ status: 200, type: CartResponseDto })
    async updateItem(
        @Req() req: { user?: { sub: string } },
        @Query() query: CartQueryDto,
        @Param('itemId') itemId: string,
        @Body() dto: UpdateCartItemDto,
    ): Promise<CartResponseDto> {
        return this.cartService.updateItem({ user: req.user, sessionId: query.sessionId }, itemId, dto);
    }

    @Delete('items/:itemId')
    @ApiOperation({ summary: 'Remove cart item', operationId: 'removeCartItem' })
    @ApiResponse({ status: 200, type: CartResponseDto })
    async removeItem(
        @Req() req: { user?: { sub: string } },
        @Query() query: CartQueryDto,
        @Param('itemId') itemId: string,
    ): Promise<CartResponseDto> {
        return this.cartService.removeItem({ user: req.user, sessionId: query.sessionId }, itemId);
    }

    @Delete()
    @ApiOperation({ summary: 'Clear cart', operationId: 'clearCart' })
    @ApiResponse({ status: 200, type: CartResponseDto })
    async clearCart(
        @Req() req: { user?: { sub: string } },
        @Query() query: CartQueryDto,
    ): Promise<CartResponseDto> {
        return this.cartService.clearCart({ user: req.user, sessionId: query.sessionId });
    }
}
