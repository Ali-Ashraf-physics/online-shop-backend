import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class AddCartItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    variantId?: string;

    @ApiProperty({ default: 1 })
    @IsInt()
    @Min(1)
    quantity: number;
}
