import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    area: string;

    @ApiProperty()
    district: string;

    @ApiProperty({ required: false })
    phone?: string;

    @ApiProperty()
    isDefault: boolean;
}
