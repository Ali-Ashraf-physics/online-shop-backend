import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    phone?: string;
}

export class UpdateCustomerDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    fullName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    avatarUrl?: string;
}

export class CustomerResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() userId: string;
    @ApiProperty() fullName: string;
    @ApiProperty({ required: false }) phone?: string;
    @ApiProperty({ required: false }) avatarUrl?: string;
}
