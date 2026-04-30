import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { CategoriesRepository } from '../../categories/repositories/categories.repository';
import { ProductMediaRepository } from '../../media/repositories/product-media.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductQueryDto } from '../dto/product-query.dto';
import { ProductResponseDto, ProductVariantResponseDto, ProductMediaResponseDto } from '../dto/product-response.dto';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductDocument } from '../schemas/product.schema';
import { ProductVariantDocument } from '../schemas/product-variant.schema';
import { ProductMediaDocument } from '../../media/schemas/product-media.schema';
import { AuditService } from '../../../audit/services/audit.service';
import { AuditAction } from '../../../audit/enums/audit-action.enum';

export type RequestContext = { user: { sub: string } };

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly categoriesRepository: CategoriesRepository,
        private readonly mediaRepository: ProductMediaRepository,
        private readonly auditService: AuditService,
    ) { }

    private mapVariant(variant: ProductVariantDocument): ProductVariantResponseDto {
        return {
            id: variant._id.toString(),
            sku: variant.sku,
            priceMinor: variant.priceMinor,
            attributes: variant.attributes ?? {},
        };
    }

    private mapMedia(media: ProductMediaDocument): ProductMediaResponseDto {
        return {
            id: media._id.toString(),
            url: media.url,
            type: media.type,
            alt: media.alt,
            sortOrder: media.sortOrder,
        };
    }

    private async mapProduct(product: ProductDocument): Promise<ProductResponseDto> {
        const [variants, media] = await Promise.all([
            this.productsRepository.findVariantsByProductId(product._id.toString()),
            this.mediaRepository.findByProductId(product._id.toString()),
        ]);

        return {
            id: product._id.toString(),
            title: product.title,
            slug: product.slug,
            description: product.description,
            categoryId: product.categoryId.toString(),
            status: product.status,
            priceMinor: product.priceMinor,
            variants: variants.map((variant) => this.mapVariant(variant)),
            media: media.map((item) => this.mapMedia(item)),
        };
    }

    async ensureSlugUnique(slug: string, productId?: string): Promise<void> {
        const existing = await this.productsRepository.findProductBySlug(slug);
        if (existing && existing._id.toString() !== productId) {
            throw new ConflictException('Product slug already exists');
        }
    }

    async createProduct(context: RequestContext, dto: CreateProductDto): Promise<ProductResponseDto> {
        await this.ensureSlugUnique(dto.slug);

        const category = await this.categoriesRepository.findCategoryById(dto.categoryId);
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        if (dto.status === ProductStatus.ACTIVE && dto.variants.length === 0) {
            throw new BadRequestException('Active product requires at least one variant');
        }

        const skuSet = new Set(dto.variants.map((variant) => variant.sku));
        if (skuSet.size !== dto.variants.length) {
            throw new ConflictException('Duplicate SKU detected');
        }

        const product = await this.productsRepository.createProduct({
            title: dto.title,
            slug: dto.slug,
            description: dto.description,
            categoryId: dto.categoryId,
            status: dto.status ?? ProductStatus.DRAFT,
            priceMinor: dto.priceMinor,
        });

        await this.productsRepository.createVariants(product._id.toString(), dto.variants);

        await this.auditService.record({
            action: AuditAction.PRODUCT_CREATED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: product._id.toString(),
            resourceType: 'Product',
            afterState: { slug: product.slug, status: product.status, priceMinor: product.priceMinor },
        });

        return this.mapProduct(product);
    }

    async findPublicProducts(query: ProductQueryDto): Promise<ProductResponseDto[]> {
        const products = await this.productsRepository.findProducts({
            search: query.search,
            categoryId: query.categoryId,
            status: ProductStatus.ACTIVE,
            skip: query.skip,
            limit: query.limit,
        });

        return Promise.all(products.map((product) => this.mapProduct(product)));
    }

    async findPublicProductBySlug(slug: string): Promise<ProductResponseDto> {
        const product = await this.productsRepository.findProductBySlug(slug);
        if (!product || product.status !== ProductStatus.ACTIVE) {
            throw new NotFoundException('Product not found');
        }
        return this.mapProduct(product);
    }

    async updateProduct(context: RequestContext, id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
        if (dto.slug) {
            await this.ensureSlugUnique(dto.slug, id);
        }

        if (dto.categoryId) {
            const category = await this.categoriesRepository.findCategoryById(dto.categoryId);
            if (!category) throw new NotFoundException('Category not found');
        }

        const existing = await this.productsRepository.findProductById(id);
        if (!existing) throw new NotFoundException('Product not found');

        if (dto.status === ProductStatus.ACTIVE) {
            const variants = await this.productsRepository.findVariantsByProductId(id);
            if (variants.length === 0) {
                throw new BadRequestException('Active product requires at least one variant');
            }
        }

        const updated = await this.productsRepository.updateProduct(id, dto);
        if (!updated) throw new NotFoundException('Product not found');

        await this.auditService.record({
            action: AuditAction.PRODUCT_UPDATED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: id,
            resourceType: 'Product',
            beforeState: { slug: existing.slug, status: existing.status, priceMinor: existing.priceMinor },
            afterState: { slug: updated.slug, status: updated.status, priceMinor: updated.priceMinor },
        });

        return this.mapProduct(updated);
    }

    async archiveProduct(context: RequestContext, id: string): Promise<ProductResponseDto> {
        const existing = await this.productsRepository.findProductById(id);
        if (!existing) throw new NotFoundException('Product not found');

        const archived = await this.productsRepository.archiveProduct(id);
        if (!archived) throw new NotFoundException('Product not found');

        await this.auditService.record({
            action: AuditAction.PRODUCT_ARCHIVED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: id,
            resourceType: 'Product',
            beforeState: { status: existing.status },
            afterState: { status: archived.status },
        });

        return this.mapProduct(archived);
    }
}
