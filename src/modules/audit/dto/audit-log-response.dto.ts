import { ApiProperty } from '@nestjs/swagger';
import { AuditAction } from '../enums/audit-action.enum';

export class AuditLogResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: AuditAction })
    action: AuditAction;

    @ApiProperty({ required: false })
    actorId?: string;

    @ApiProperty({ required: false, enum: ['CUSTOMER', 'ADMIN', 'SYSTEM'] })
    actorType?: string;

    @ApiProperty({ required: false })
    resourceId?: string;

    @ApiProperty({ required: false })
    resourceType?: string;

    @ApiProperty({ required: false })
    metadata?: Record<string, unknown>;

    @ApiProperty({ required: false })
    beforeState?: Record<string, unknown>;

    @ApiProperty({ required: false })
    afterState?: Record<string, unknown>;

    @ApiProperty()
    createdAt: string;
}

class AuditLogMetaDto {
    @ApiProperty()
    total: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    totalPages: number;
}

export class AuditLogListResponseDto {
    @ApiProperty({ type: [AuditLogResponseDto] })
    items: AuditLogResponseDto[];

    @ApiProperty({ type: AuditLogMetaDto })
    meta: AuditLogMetaDto;
}
