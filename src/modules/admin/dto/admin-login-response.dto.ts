import { ApiProperty } from '@nestjs/swagger';
import { AdminResponseDto } from './admin-response.dto';

export class AdminLoginResponseDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty({ type: AdminResponseDto })
    admin: AdminResponseDto;
}
