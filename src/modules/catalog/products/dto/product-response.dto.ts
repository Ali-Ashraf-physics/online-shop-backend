import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductMediaType } from '../../media/enums/product-media-type.enum';

export class ProductVariantResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    sku: string;

    @ApiProperty()
    priceMinor: number;

    @ApiProperty({ type: Object })
    attributes: Record<string, string>;
}

export class ProductMediaResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    url: string;

    @ApiProperty({ enum: ProductMediaType })
    type: ProductMediaType;

    @ApiProperty({ required: false })
    alt?: string;

    @ApiProperty()
    sortOrder: number;
}

export class ProductResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    slug: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    categoryId: string;

    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

    @ApiProperty()
    priceMinor: number;

    @ApiProperty({ type: [ProductVariantResponseDto] })
    variants: ProductVariantResponseDto[];

    @ApiProperty({ type: [ProductMediaResponseDto] })
    media: ProductMediaResponseDto[];
}
