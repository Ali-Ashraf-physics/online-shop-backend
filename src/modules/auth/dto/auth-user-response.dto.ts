import { ApiProperty } from '@nestjs/swagger';

export class AuthUserResponseDto {
    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    id: string;

    @ApiProperty({ example: 'user@example.com' })
    emailOrPhone: string;

    @ApiProperty({ example: 'CUSTOMER' })
    role: string;

    @ApiProperty({ type: [String], example: ['view:products'] })
    permissions: string[];
}
