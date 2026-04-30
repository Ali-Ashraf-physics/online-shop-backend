import { Injectable } from '@nestjs/common';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { HealthResponseDto } from './dto/health-response.dto';
import { HealthReadinessResponseDto } from './dto/health-readiness-response.dto';

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
        return this.health.check([
            () => this.checkDatabase(),
        ]);
    }

    private checkDatabase() {
        return this.db.pingCheck('database', { timeout: 3000 });
    }
}
