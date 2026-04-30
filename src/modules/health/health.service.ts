import { Injectable } from '@nestjs/common';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { HealthResponseDto } from './dto/health-response.dto';
import {
    HealthIndicatorMapDto,
    HealthIndicatorResultDto,
    HealthReadinessResponseDto,
} from './dto/health-readiness-response.dto';

@Injectable()
export class HealthService {
    constructor(
        private health: HealthCheckService,
        private db: MongooseHealthIndicator,
    ) { }

    getHealth(): HealthResponseDto {
        return {
            status: 'ok',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    }

    async getReadiness(): Promise<HealthReadinessResponseDto> {
        const result = await this.health.check([
            () => this.checkDatabase(),
        ]);

        return {
            status: result.status,
            info: this.mapIndicatorMap(this.isRecord(result.info) ? result.info : undefined),
            error: this.mapIndicatorMap(this.isRecord(result.error) ? result.error : undefined),
            details: this.mapIndicatorMap(this.isRecord(result.details) ? result.details : undefined),
        };
    }

    private checkDatabase() {
        return this.db.pingCheck('database', { timeout: 3000 });
    }

    private mapIndicatorMap(section: Record<string, unknown> | undefined): HealthIndicatorMapDto | undefined {
        if (!section) return undefined;
        const databaseValue = section['database'];
        const database = this.isRecord(databaseValue) ? this.mapIndicatorResult(databaseValue) : undefined;
        if (!database) return undefined;
        return { database };
    }

    private mapIndicatorResult(value: Record<string, unknown>): HealthIndicatorResultDto {
        const { status: rawStatus, ...rest } = value;
        const status = typeof rawStatus === 'string' ? rawStatus : 'unknown';
        const details = Object.keys(rest).length > 0 ? rest : undefined;
        return { status, details };
    }

    private isRecord(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null;
    }
}
