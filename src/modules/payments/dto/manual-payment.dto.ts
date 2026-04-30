import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ManualPaymentDto {
    @ApiProperty({ required: false, description: 'Reference or note for manual payment change' })
    @IsOptional()
    @IsString()
    note?: string;

    @ApiProperty({ required: false, description: 'Reason for marking payment failed' })
    @IsOptional()
    @IsString()
    reason?: string;
}
