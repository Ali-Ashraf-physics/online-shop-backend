import { ApiProperty } from '@nestjs/swagger';

export class HealthReadinessResponseDto {
    @ApiProperty()
    status: string;

    @ApiProperty({ required: false, type: Object })
    info?: Record<string, Record<string, unknown> | undefined>;

    @ApiProperty({ required: false, type: Object })
    error?: Record<string, Record<string, unknown> | undefined>;

    @ApiProperty({ required: false, type: Object })
    details?: Record<string, Record<string, unknown> | undefined>;
}
