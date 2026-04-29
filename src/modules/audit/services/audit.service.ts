import { Injectable, Logger } from '@nestjs/common';
import { AuditLogRepository } from '../repositories/audit-log.repository';
import { AuditAction } from '../enums/audit-action.enum';
import { AuditLogQueryDto } from '../dto/audit-log-query.dto';

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

    async findAuditLogs(query: AuditLogQueryDto) {
        const [items, total] = await this.repository.findMany(query);
        return {
            data: items,
            total,
            skip: query.skip || 0,
            limit: query.limit || 50,
        };
    }
}
