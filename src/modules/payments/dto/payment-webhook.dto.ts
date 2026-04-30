import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';

export class PaymentWebhookDto {
    @ApiProperty({ type: Object })
    @IsNotEmpty()
    @IsObject()
    payload: Record<string, unknown>;
}
