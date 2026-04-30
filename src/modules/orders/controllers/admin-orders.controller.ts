import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';
import { OrderQueryDto } from '../dto/order-query.dto';
import { OrderListResponseDto, OrderResponseDto } from '../dto/order-response.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { CancelOrderDto } from '../dto/cancel-order.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../common/guards/permissions.guard';
import { RequirePermissions } from '../../../common/decorators/permissions.decorator';
import { Permission } from '../../../common/enums/permission.enum';

@ApiTags('Admin Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/orders')
export class AdminOrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @RequirePermissions(Permission.MANAGE_ORDERS)
    @ApiOperation({ summary: 'List orders', operationId: 'listAdminOrders' })
    @ApiResponse({ status: 200, type: OrderListResponseDto })
    async list(
        @Req() req: { user: { sub: string } },
        @Query() query: OrderQueryDto,
    ): Promise<OrderListResponseDto> {
        return this.ordersService.findAdminOrders(query);
    }

    @Get(':orderId')
    @RequirePermissions(Permission.MANAGE_ORDERS)
    @ApiOperation({ summary: 'Get order by id', operationId: 'getAdminOrderById' })
    @ApiResponse({ status: 200, type: OrderResponseDto })
    async getById(
        @Req() req: { user: { sub: string } },
        @Param('orderId') orderId: string,
    ): Promise<OrderResponseDto> {
        return this.ordersService.findAdminOrderById(orderId);
    }

    @Patch(':orderId/status')
    @RequirePermissions(Permission.MANAGE_ORDERS)
    @ApiOperation({ summary: 'Update order status', operationId: 'updateOrderStatus' })
    @ApiResponse({ status: 200, type: OrderResponseDto })
    async updateStatus(
        @Req() req: { user: { sub: string } },
        @Param('orderId') orderId: string,
        @Body() dto: UpdateOrderStatusDto,
    ): Promise<OrderResponseDto> {
        return this.ordersService.updateStatus({ user: { sub: req.user.sub } }, orderId, dto);
    }

    @Post(':orderId/cancel')
    @RequirePermissions(Permission.MANAGE_ORDERS)
    @ApiOperation({ summary: 'Cancel order', operationId: 'cancelOrder' })
    @ApiResponse({ status: 200, type: OrderResponseDto })
    async cancel(
        @Req() req: { user: { sub: string } },
        @Param('orderId') orderId: string,
        @Body() dto: CancelOrderDto,
    ): Promise<OrderResponseDto> {
        return this.ordersService.cancelOrder({ user: { sub: req.user.sub } }, orderId, dto);
    }
}
