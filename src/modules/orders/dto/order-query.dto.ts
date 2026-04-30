import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { ShipmentStatus } from '../enums/shipment-status.enum';

export class OrderQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    orderNumber?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    customerId?: string;

    @ApiProperty({ required: false, enum: OrderStatus })
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @ApiProperty({ required: false, enum: PaymentStatus })
    @IsOptional()
    @IsEnum(PaymentStatus)
    paymentStatus?: PaymentStatus;

    @ApiProperty({ required: false, enum: ShipmentStatus })
    @IsOptional()
    @IsEnum(ShipmentStatus)
    shipmentStatus?: ShipmentStatus;

    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @ApiProperty({ required: false, default: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;
}
