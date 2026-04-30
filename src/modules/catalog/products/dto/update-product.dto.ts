import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsMongoId, IsOptional, IsString, Min } from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';

export class UpdateProductDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    slug?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsMongoId()
    categoryId?: string;

    @ApiProperty({ enum: ProductStatus, required: false })
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;

    @ApiProperty({ required: false, example: 1999 })
    @IsOptional()
    @IsInt()
    @Min(0)
    priceMinor?: number;
}
