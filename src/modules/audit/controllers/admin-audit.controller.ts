import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuditService } from '../services/audit.service';
import { AuditLogQueryDto } from '../dto/audit-log-query.dto';
import { AuditLogListResponseDto } from '../dto/audit-log-response.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../common/guards/permissions.guard';
import { RequirePermissions } from '../../../common/decorators/permissions.decorator';
import { Permission } from '../../../common/enums/permission.enum';

@ApiTags('Audit logs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/audit-logs')
export class AdminAuditController {
    constructor(private readonly auditService: AuditService) { }

    @Get()
    @RequirePermissions(Permission.MANAGE_SYSTEM)
    @ApiOperation({ summary: 'Find audit logs (Admin only)', operationId: 'findAuditLogs' })
    @ApiResponse({ status: 200, type: AuditLogListResponseDto })
    async findLogs(@Query() query: AuditLogQueryDto): Promise<AuditLogListResponseDto> {
        return this.auditService.findAuditLogs(query);
    }
}
