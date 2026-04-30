import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { ShipmentStatus } from '../enums/shipment-status.enum';
import { OrderItemResponseDto } from './order-item-response.dto';

export class OrderResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    orderNumber: string;

    @ApiProperty()
    customerId: string;

    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;

    @ApiProperty({ enum: PaymentStatus })
    paymentStatus: PaymentStatus;

    @ApiProperty({ enum: ShipmentStatus })
    shipmentStatus: ShipmentStatus;

    @ApiProperty()
    totalAmountMinor: number;

    @ApiProperty()
    shippingAmountMinor: number;

    @ApiProperty()
    discountAmountMinor: number;

    @ApiProperty()
    currency: string;

    @ApiProperty({ type: [OrderItemResponseDto] })
    items: OrderItemResponseDto[];

    @ApiProperty()
    createdAt: string;
}

class OrderListMetaDto {
    @ApiProperty()
    total: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    totalPages: number;
}

export class OrderListResponseDto {
    @ApiProperty({ type: [OrderResponseDto] })
    items: OrderResponseDto[];

    @ApiProperty({ type: OrderListMetaDto })
    meta: OrderListMetaDto;
}
