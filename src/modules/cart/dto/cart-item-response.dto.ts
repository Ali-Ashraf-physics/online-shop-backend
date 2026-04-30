import { ApiProperty } from '@nestjs/swagger';

export class CartItemResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    productId: string;

    @ApiProperty({ required: false })
    variantId?: string;

    @ApiProperty()
    quantity: number;
}
