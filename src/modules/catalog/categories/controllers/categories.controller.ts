import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import { CategoryResponseDto } from '../dto/category-response.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    @ApiOperation({ summary: 'List public categories', operationId: 'listCategories' })
    @ApiResponse({ status: 200, type: [CategoryResponseDto] })
    async list(): Promise<CategoryResponseDto[]> {
        return this.categoriesService.findPublicCategories();
    }
}
