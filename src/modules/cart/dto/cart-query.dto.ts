import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CartQueryDto {
    @ApiProperty({ required: false, description: 'Anonymous session identifier' })
    @IsOptional()
    @IsString()
    sessionId?: string;
}
