import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty({ required: false })
    phone?: string;

    @ApiProperty({ required: false })
    avatarUrl?: string;
}
