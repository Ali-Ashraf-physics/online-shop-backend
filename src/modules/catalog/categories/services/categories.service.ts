import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { CategoryDocument } from '../schemas/category.schema';
import { AuditService } from '../../../audit/services/audit.service';
import { AuditAction } from '../../../audit/enums/audit-action.enum';

export type RequestContext = { user: { sub: string } };

@Injectable()
export class CategoriesService {
    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly auditService: AuditService,
    ) { }

    private mapCategory(category: CategoryDocument): CategoryResponseDto {
        return {
            id: category._id.toString(),
            name: category.name,
            slug: category.slug,
            parentId: category.parentId,
            isActive: category.isActive,
        };
    }

    private async assertNoCycle(categoryId: string, parentId?: string): Promise<void> {
        if (!parentId) return;
        if (parentId === categoryId) {
            throw new BadRequestException('Category parent cannot be itself');
        }

        let current = await this.categoriesRepository.findCategoryById(parentId);
        while (current && current.parentId) {
            if (current.parentId.toString() === categoryId) {
                throw new BadRequestException('Category parent cannot create a cycle');
            }
            current = await this.categoriesRepository.findCategoryById(current.parentId.toString());
        }
    }

    async createCategory(context: RequestContext, dto: CreateCategoryDto): Promise<CategoryResponseDto> {
        const existing = await this.categoriesRepository.findCategoryBySlug(dto.slug);
        if (existing) throw new ConflictException('Category slug already exists');

        if (dto.parentId) {
            const parent = await this.categoriesRepository.findCategoryById(dto.parentId);
            if (!parent) throw new NotFoundException('Parent category not found');
        }

        const created = await this.categoriesRepository.createCategory(dto);

        await this.auditService.record({
            action: AuditAction.CATEGORY_MODIFIED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: created._id.toString(),
            resourceType: 'Category',
            afterState: { slug: created.slug, parentId: created.parentId },
        });

        return this.mapCategory(created);
    }

    async updateCategory(context: RequestContext, id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
        const existing = await this.categoriesRepository.findCategoryById(id);
        if (!existing) throw new NotFoundException('Category not found');

        if (dto.slug) {
            const slugMatch = await this.categoriesRepository.findCategoryBySlug(dto.slug);
            if (slugMatch && slugMatch._id.toString() !== id) {
                throw new ConflictException('Category slug already exists');
            }
        }

        await this.assertNoCycle(id, dto.parentId);

        const updated = await this.categoriesRepository.updateCategory(id, dto);
        if (!updated) throw new NotFoundException('Category not found');

        await this.auditService.record({
            action: AuditAction.CATEGORY_MODIFIED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: updated._id.toString(),
            resourceType: 'Category',
            beforeState: { slug: existing.slug, parentId: existing.parentId },
            afterState: { slug: updated.slug, parentId: updated.parentId },
        });

        return this.mapCategory(updated);
    }

    async findPublicCategories(): Promise<CategoryResponseDto[]> {
        const categories = await this.categoriesRepository.findCategoryTree();
        return categories.map((category) => this.mapCategory(category));
    }
}
