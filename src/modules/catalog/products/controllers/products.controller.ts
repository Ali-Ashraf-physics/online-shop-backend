import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { ProductQueryDto } from '../dto/product-query.dto';
import { ProductResponseDto } from '../dto/product-response.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'List public products', operationId: 'listPublicProducts' })
    @ApiResponse({ status: 200, type: [ProductResponseDto] })
    async list(@Query() query: ProductQueryDto): Promise<ProductResponseDto[]> {
        return this.productsService.findPublicProducts(query);
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Get a product by slug', operationId: 'getPublicProductBySlug' })
    @ApiResponse({ status: 200, type: ProductResponseDto })
    async getBySlug(@Param('slug') slug: string): Promise<ProductResponseDto> {
        return this.productsService.findPublicProductBySlug(slug);
    }
}
