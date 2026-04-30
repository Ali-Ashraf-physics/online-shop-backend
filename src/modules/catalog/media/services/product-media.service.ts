import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductMediaRepository } from '../repositories/product-media.repository';
import { ProductsRepository } from '../../products/repositories/products.repository';
import { UploadProductMediaDto } from '../dto/upload-product-media.dto';
import { ProductMediaDocument } from '../schemas/product-media.schema';
import { ProductMediaResponseDto } from '../../products/dto/product-response.dto';
import { AuditService } from '../../../audit/services/audit.service';
import { AuditAction } from '../../../audit/enums/audit-action.enum';

export type RequestContext = { user: { sub: string } };

@Injectable()
export class ProductMediaService {
    constructor(
        private readonly mediaRepository: ProductMediaRepository,
        private readonly productsRepository: ProductsRepository,
        private readonly auditService: AuditService,
    ) { }

    private mapMedia(media: ProductMediaDocument): ProductMediaResponseDto {
        return {
            id: media._id.toString(),
            url: media.url,
            type: media.type,
            alt: media.alt,
            sortOrder: media.sortOrder,
        };
    }

    async attachProductMedia(context: RequestContext, productId: string, dto: UploadProductMediaDto): Promise<ProductMediaResponseDto> {
        const product = await this.productsRepository.findProductById(productId);
        if (!product) throw new NotFoundException('Product not found');

        const media = await this.mediaRepository.createMedia({
            productId,
            url: dto.url,
            type: dto.type,
            alt: dto.alt,
            sortOrder: dto.sortOrder ?? 0,
        });

        await this.auditService.record({
            action: AuditAction.PRODUCT_UPDATED,
            actorId: context.user.sub,
            actorType: 'ADMIN',
            resourceId: productId,
            resourceType: 'Product',
            metadata: { mediaId: media._id.toString(), type: media.type },
        });

        return this.mapMedia(media);
    }
}
