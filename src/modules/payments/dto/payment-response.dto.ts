import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export class PaymentResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    orderId: string;

    @ApiProperty({ enum: PaymentProvider })
    provider: PaymentProvider;

    @ApiProperty({ enum: PaymentMethod })
    method: PaymentMethod;

    @ApiProperty({ enum: PaymentStatus })
    status: PaymentStatus;

    @ApiProperty()
    amountMinor: number;

    @ApiProperty()
    currency: string;

    @ApiProperty({ required: false })
    redirectUrl?: string;

    @ApiProperty({ required: false })
    failureReason?: string;

    @ApiProperty()
    createdAt: string;
}

class PaymentListMetaDto {
    @ApiProperty()
    total: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    totalPages: number;
}

export class PaymentListResponseDto {
    @ApiProperty({ type: [PaymentResponseDto] })
    items: PaymentResponseDto[];

    @ApiProperty({ type: PaymentListMetaDto })
    meta: PaymentListMetaDto;
}
