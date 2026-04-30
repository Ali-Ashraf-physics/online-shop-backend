import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PaymentMethod } from '../enums/payment-method.enum';

export class InitiatePaymentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    orderId: string;

    @ApiProperty({ enum: PaymentMethod })
    @IsEnum(PaymentMethod)
    method: PaymentMethod;

    @ApiProperty({ description: 'Idempotency key for payment initiation' })
    @IsNotEmpty()
    @IsString()
    idempotencyKey: string;
}
