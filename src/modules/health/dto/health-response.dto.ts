import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
    @ApiProperty({ example: 'ok', description: 'Health status indicator' })
    status: string;

    @ApiProperty({ description: 'Application uptime in seconds', example: 123.456 })
    uptime: number;

    @ApiProperty({ description: 'Current timestamp in ISO 8601 format', example: '2024-01-01T00:00:00.000Z' })
    timestamp: string;
}
