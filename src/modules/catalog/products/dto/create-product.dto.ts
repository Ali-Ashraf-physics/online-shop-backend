import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString, Min, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '../enums/product-status.enum';

export class CreateProductVariantDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sku: string;

    @ApiProperty({ example: 1999 })
    @IsInt()
    @Min(0)
    priceMinor: number;

    @ApiProperty({ required: false, type: Object })
    @IsOptional()
    @IsObject()
    attributes?: Record<string, string>;
}

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    slug: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsMongoId()
    categoryId: string;

    @ApiProperty({ enum: ProductStatus, required: false })
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;

    @ApiProperty({ example: 1999 })
    @IsInt()
    @Min(0)
    priceMinor: number;

    @ApiProperty({ type: [CreateProductVariantDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductVariantDto)
    variants: CreateProductVariantDto[];
}
