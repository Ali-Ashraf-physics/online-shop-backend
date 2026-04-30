import { Injectable, Logger } from '@nestjs/common';
import { AuditLogRepository } from '../repositories/audit-log.repository';
import { AuditAction } from '../enums/audit-action.enum';
import { AuditLogQueryDto } from '../dto/audit-log-query.dto';
import { AuditLogListResponseDto, AuditLogResponseDto } from '../dto/audit-log-response.dto';

@Injectable()
export class AuditService {
    private readonly logger = new Logger(AuditService.name);

    constructor(private readonly repository: AuditLogRepository) { }

    sanitizeAuditPayload(payload: Record<string, unknown> | undefined): Record<string, unknown> | undefined {
        if (!payload) return undefined;
        const sanitized = { ...payload };
        const secretKeys = ['password', 'token', 'secret', 'passwordHash', 'accessToken', 'refreshToken'];

        for (const key of Object.keys(sanitized)) {
            if (secretKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
                sanitized[key] = '[REDACTED]';
            } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
                sanitized[key] = this.sanitizeAuditPayload(sanitized[key] as Record<string, unknown>);
            }
        }
        return sanitized;
    }

    async record(data: {
        action: AuditAction;
        actorId?: string;
        actorType?: 'CUSTOMER' | 'ADMIN' | 'SYSTEM';
        resourceId?: string;
        resourceType?: string;
        metadata?: Record<string, unknown>;
        beforeState?: Record<string, unknown>;
        afterState?: Record<string, unknown>;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<void> {
        try {
            await this.repository.create({
                action: data.action,
                actorId: data.actorId,
                actorType: data.actorType,
                resourceId: data.resourceId,
                resourceType: data.resourceType,
                metadata: this.sanitizeAuditPayload(data.metadata),
                beforeState: this.sanitizeAuditPayload(data.beforeState),
                afterState: this.sanitizeAuditPayload(data.afterState),
                ipAddress: data.ipAddress,
                userAgent: data.userAgent,
            });
        } catch (e) {
            this.logger.error(`Failed to record audit log: ${e instanceof Error ? e.message : 'Unknown Error'}`, e instanceof Error ? e.stack : undefined);
        }
    }

    private mapAuditLog(log: import('../schemas/audit-log.schema').AuditLogDocument): AuditLogResponseDto {
        return {
            id: log._id.toString(),
            action: log.action,
            actorId: log.actorId,
            actorType: log.actorType,
            resourceId: log.resourceId,
            resourceType: log.resourceType,
            metadata: log.metadata,
            beforeState: log.beforeState,
            afterState: log.afterState,
            createdAt: log.createdAt?.toISOString() ?? new Date().toISOString(),
        };
    }

    async findAuditLogs(query: AuditLogQueryDto): Promise<AuditLogListResponseDto> {
        const [items, total] = await this.repository.findMany(query);
        const page = query.page ?? 1;
        const limit = query.limit ?? 50;
        const totalPages = Math.max(1, Math.ceil(total / limit));

        return {
            items: items.map((item) => this.mapAuditLog(item)),
            meta: { total, page, limit, totalPages },
        };
    }
}
