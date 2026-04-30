import { ApiProperty } from '@nestjs/swagger';

export class HealthReadinessResponseDto {
    @ApiProperty({ example: 'ok', description: 'Overall readiness status' })
    status: string;

    @ApiProperty({
        required: false,
        type: Object,
        description: 'Successful health check details by indicator',
        example: { database: { status: 'up' } },
    })
    info?: Record<string, Record<string, unknown> | undefined>;

    @ApiProperty({
        required: false,
        type: Object,
        description: 'Failed health check details by indicator',
        example: { database: { status: 'down' } },
    })
    error?: Record<string, Record<string, unknown> | undefined>;

    @ApiProperty({
        required: false,
        type: Object,
        description: 'Aggregated health check details by indicator',
        example: { database: { status: 'up' } },
    })
    details?: Record<string, Record<string, unknown> | undefined>;
}
