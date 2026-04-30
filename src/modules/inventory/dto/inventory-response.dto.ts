import { ApiProperty } from '@nestjs/swagger';

export class InventoryResponseDto {
    @ApiProperty()
    sku: string;

    @ApiProperty()
    availableQty: number;

    @ApiProperty()
    reservedQty: number;

    @ApiProperty()
    soldQty: number;
}
