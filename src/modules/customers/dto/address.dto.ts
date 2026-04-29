import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty() @IsNotEmpty() @IsString() title: string;
    @ApiProperty() @IsNotEmpty() @IsString() street: string;
    @ApiProperty() @IsNotEmpty() @IsString() area: string;
    @ApiProperty() @IsNotEmpty() @IsString() district: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() phone?: string;
    @ApiProperty({ required: false, default: false }) @IsOptional() @IsBoolean() isDefault?: boolean;
}

export class UpdateAddressDto {
    @ApiProperty({ required: false }) @IsOptional() @IsString() title?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() street?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() area?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() district?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() phone?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsBoolean() isDefault?: boolean;
}

export class AddressResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() title: string;
    @ApiProperty() street: string;
    @ApiProperty() area: string;
    @ApiProperty() district: string;
    @ApiProperty({ required: false }) phone?: string;
    @ApiProperty() isDefault: boolean;
}
