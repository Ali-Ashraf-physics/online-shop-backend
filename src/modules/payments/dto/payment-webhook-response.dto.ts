import { ApiProperty } from '@nestjs/swagger';

export class PaymentWebhookResponseDto {
    @ApiProperty()
    received: boolean;

    @ApiProperty({ required: false })
    duplicate?: boolean;
}
