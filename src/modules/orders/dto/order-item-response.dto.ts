import { ApiProperty } from '@nestjs/swagger';

export class OrderItemResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    productId: string;

    @ApiProperty({ required: false })
    variantId?: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    sku: string;

    @ApiProperty()
    priceMinor: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    lineTotalMinor: number;
}
