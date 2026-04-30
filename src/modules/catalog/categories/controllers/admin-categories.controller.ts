import { Body, Controller, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import type { RequestContext } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../common/guards/permissions.guard';
import { RequirePermissions } from '../../../../common/decorators/permissions.decorator';
import { Permission } from '../../../../common/enums/permission.enum';

@ApiTags('Admin Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/categories')
export class AdminCategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @RequirePermissions(Permission.MANAGE_PRODUCTS)
    @ApiOperation({ summary: 'Create category', operationId: 'adminCreateCategory' })
    @ApiResponse({ status: 201, type: CategoryResponseDto })
    async create(
        @Req() req: RequestContext,
        @Body() dto: CreateCategoryDto,
    ): Promise<CategoryResponseDto> {
        return this.categoriesService.createCategory(req, dto);
    }

    @Patch(':categoryId')
    @RequirePermissions(Permission.MANAGE_PRODUCTS)
    @ApiOperation({ summary: 'Update category', operationId: 'adminUpdateCategory' })
    @ApiResponse({ status: 200, type: CategoryResponseDto })
    async update(
        @Req() req: RequestContext,
        @Param('categoryId') categoryId: string,
        @Body() dto: UpdateCategoryDto,
    ): Promise<CategoryResponseDto> {
        return this.categoriesService.updateCategory(req, categoryId, dto);
    }
}
