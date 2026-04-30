import { ApiProperty } from '@nestjs/swagger';
import { CartItemResponseDto } from './cart-item-response.dto';

export class CartResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ type: [CartItemResponseDto] })
    items: CartItemResponseDto[];

    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    isConverted: boolean;
}
