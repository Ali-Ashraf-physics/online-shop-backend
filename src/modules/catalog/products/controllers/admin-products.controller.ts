import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import type { RequestContext } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductResponseDto } from '../dto/product-response.dto';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../common/guards/permissions.guard';
import { RequirePermissions } from '../../../../common/decorators/permissions.decorator';
import { Permission } from '../../../../common/enums/permission.enum';

@ApiTags('Admin Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/products')
export class AdminProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @RequirePermissions(Permission.MANAGE_PRODUCTS)
    @ApiOperation({ summary: 'Create product', operationId: 'adminCreateProduct' })
    @ApiResponse({ status: 201, type: ProductResponseDto })
    async create(
        @Req() req: RequestContext,
        @Body() dto: CreateProductDto,
    ): Promise<ProductResponseDto> {
        return this.productsService.createProduct(req, dto);
    }

    @Patch(':productId')
    @RequirePermissions(Permission.MANAGE_PRODUCTS)
    @ApiOperation({ summary: 'Update product', operationId: 'adminUpdateProduct' })
    @ApiResponse({ status: 200, type: ProductResponseDto })
    async update(
        @Req() req: RequestContext,
        @Param('productId') productId: string,
        @Body() dto: UpdateProductDto,
    ): Promise<ProductResponseDto> {
        return this.productsService.updateProduct(req, productId, dto);
    }

    @Delete(':productId')
    @RequirePermissions(Permission.MANAGE_PRODUCTS)
    @ApiOperation({ summary: 'Archive product', operationId: 'adminArchiveProduct' })
    @ApiResponse({ status: 200, type: ProductResponseDto })
    async archive(
        @Req() req: RequestContext,
        @Param('productId') productId: string,
    ): Promise<ProductResponseDto> {
        return this.productsService.archiveProduct(req, productId);
    }
}
