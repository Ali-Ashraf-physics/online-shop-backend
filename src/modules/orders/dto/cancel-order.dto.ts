import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CancelOrderDto {
    @ApiProperty({ description: 'Reason for cancellation' })
    @IsNotEmpty()
    @IsString()
    reason: string;
}
