import { ApiProperty } from '@nestjs/swagger';

export class HealthIndicatorResultDto {
    @ApiProperty({ example: 'up', description: 'Indicator status' })
    status: string;

    @ApiProperty({
        required: false,
        type: Object,
        description: 'Additional indicator details',
        example: { responseTime: 12 },
    })
    details?: Record<string, unknown>;
}

export class HealthIndicatorMapDto {
    @ApiProperty({ required: false, type: HealthIndicatorResultDto })
    database?: HealthIndicatorResultDto;
}

export class HealthReadinessResponseDto {
    @ApiProperty({ example: 'ok', description: 'Overall readiness status' })
    status: string;

    @ApiProperty({
        required: false,
        type: HealthIndicatorMapDto,
        description: 'Successful health check details by indicator',
        example: { database: { status: 'up' } },
    })
    info?: HealthIndicatorMapDto;

    @ApiProperty({
        required: false,
        type: HealthIndicatorMapDto,
        description: 'Failed health check details by indicator',
        example: { database: { status: 'down' } },
    })
    error?: HealthIndicatorMapDto;

    @ApiProperty({
        required: false,
        type: HealthIndicatorMapDto,
        description: 'Aggregated health check details by indicator',
        example: { database: { status: 'up' } },
    })
    details?: HealthIndicatorMapDto;
}
