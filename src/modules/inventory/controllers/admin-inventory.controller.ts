import { Controller, Get, Param, Patch, Body, UseGuards, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InventoryService } from '../services/inventory.service';
import type { RequestContext } from '../services/inventory.service';
import { AdjustStockDto } from '../dto/adjust-stock.dto';
import { InventoryResponseDto } from '../dto/inventory-response.dto';
import { StockMovementResponseDto } from '../dto/stock-movement-response.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../common/guards/permissions.guard';
import { RequirePermissions } from '../../../common/decorators/permissions.decorator';
import { Permission } from '../../../common/enums/permission.enum';

@ApiTags('Admin Inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/inventory')
export class AdminInventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Get()
    @RequirePermissions(Permission.MANAGE_INVENTORY)
    @ApiOperation({ summary: 'Get inventory by SKU', operationId: 'getInventoryBySku' })
    @ApiResponse({ status: 200, type: InventoryResponseDto })
    async getBySku(@Query('sku') sku: string): Promise<InventoryResponseDto> {
        return this.inventoryService.getAvailability(sku);
    }

    @Patch(':sku/adjust')
    @RequirePermissions(Permission.MANAGE_INVENTORY)
    @ApiOperation({ summary: 'Adjust stock for a SKU', operationId: 'adjustStock' })
    @ApiResponse({ status: 200, type: InventoryResponseDto })
    async adjust(
        @Req() req: RequestContext,
        @Param('sku') sku: string,
        @Body() dto: AdjustStockDto,
    ): Promise<InventoryResponseDto> {
        return this.inventoryService.adjustStock(req, sku, dto);
    }

    @Get(':sku/movements')
    @RequirePermissions(Permission.MANAGE_INVENTORY)
    @ApiOperation({ summary: 'Get stock movements for a SKU', operationId: 'getStockMovements' })
    @ApiResponse({ status: 200, type: [StockMovementResponseDto] })
    async getMovements(@Param('sku') sku: string): Promise<StockMovementResponseDto[]> {
        return this.inventoryService.listStockMovements(sku);
    }
}
