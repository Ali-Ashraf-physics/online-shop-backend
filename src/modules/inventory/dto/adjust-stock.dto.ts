import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AdjustStockDto {
    @ApiProperty({ example: 10 })
    @IsInt()
    delta: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reason: string;
}
