import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ProductMediaType } from '../enums/product-media-type.enum';

export class UploadProductMediaDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ enum: ProductMediaType })
    @IsEnum(ProductMediaType)
    type: ProductMediaType;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    alt?: string;

    @ApiProperty({ required: false, default: 0 })
    @IsOptional()
    @IsInt()
    @Min(0)
    sortOrder?: number;
}
