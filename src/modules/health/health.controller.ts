import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Check API availability', operationId: 'getHealth' })
    @ApiResponse({ status: HttpStatus.OK, description: 'API is running' })
    getHealth(): { status: string; uptime: number; timestamp: string } {
        return this.healthService.getHealth();
    }

    @Get('ready')
    @HealthCheck()
    @ApiOperation({ summary: 'Check infrastructure readiness', operationId: 'getReadiness' })
    @ApiResponse({ status: HttpStatus.OK, description: 'API and Database are ready' })
    @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'Database or dependencies unavailable' })
    async getReadiness() {
        return this.healthService.getReadiness();
    }
}
