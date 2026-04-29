import { Injectable } from '@nestjs/common';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(
        private health: HealthCheckService,
        private db: MongooseHealthIndicator,
    ) { }

    getHealth(): { status: string; uptime: number; timestamp: string } {
        return {
            status: 'ok',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    }

    async getReadiness() {
        return this.health.check([
            () => this.checkDatabase(),
        ]);
    }

    private checkDatabase() {
        return this.db.pingCheck('database', { timeout: 3000 });
    }
}
