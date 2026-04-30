import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class CreateOrderItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    variantId?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sku: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    priceMinor: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    customerId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currency: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    totalAmountMinor: number;

    @ApiProperty({ default: 0 })
    @IsInt()
    @Min(0)
    shippingAmountMinor: number;

    @ApiProperty({ default: 0 })
    @IsInt()
    @Min(0)
    discountAmountMinor: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    idempotencyKey: string;

    @ApiProperty({ type: [CreateOrderItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}
