import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ReserveStockItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sku: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    quantity: number;
}

export class ReserveStockDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    orderId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    idempotencyKey: string;

    @ApiProperty({ type: [ReserveStockItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReserveStockItemDto)
    items: ReserveStockItemDto[];
}
