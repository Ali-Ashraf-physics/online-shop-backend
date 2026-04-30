import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';
import { OrderQueryDto } from '../dto/order-query.dto';
import { OrderListResponseDto, OrderResponseDto } from '../dto/order-response.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('me/orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @ApiOperation({ summary: 'List current customer orders', operationId: 'getMyOrders' })
    @ApiResponse({ status: 200, type: OrderListResponseDto })
    async list(
        @Req() req: { user: { sub: string } },
        @Query() query: OrderQueryDto,
    ): Promise<OrderListResponseDto> {
        return this.ordersService.findCustomerOrders({ user: { sub: req.user.sub } }, query);
    }

    @Get(':orderId')
    @ApiOperation({ summary: 'Get a customer order by id', operationId: 'getMyOrderById' })
    @ApiResponse({ status: 200, type: OrderResponseDto })
    async getById(
        @Req() req: { user: { sub: string } },
        @Param('orderId') orderId: string,
    ): Promise<OrderResponseDto> {
        return this.ordersService.findCustomerOrderById({ user: { sub: req.user.sub } }, orderId);
    }
}
