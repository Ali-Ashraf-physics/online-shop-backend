import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
    @ApiProperty()
    status: string;

    @ApiProperty()
    uptime: number;

    @ApiProperty()
    timestamp: string;
}
