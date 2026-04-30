import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    area: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    district: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    isDefault?: boolean;
}
