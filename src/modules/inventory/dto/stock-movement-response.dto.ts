import { ApiProperty } from '@nestjs/swagger';
import { StockMovementType } from '../enums/stock-movement-type.enum';

export class StockMovementResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    sku: string;

    @ApiProperty()
    delta: number;

    @ApiProperty({ enum: StockMovementType })
    type: StockMovementType;

    @ApiProperty()
    reason: string;

    @ApiProperty({ required: false })
    orderId?: string;

    @ApiProperty({ required: false })
    actorId?: string;
}
