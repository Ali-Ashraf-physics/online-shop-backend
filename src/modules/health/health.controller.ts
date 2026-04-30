import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { HealthResponseDto } from './dto/health-response.dto';
import { HealthReadinessResponseDto } from './dto/health-readiness-response.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Check API availability', operationId: 'getHealth' })
    @ApiResponse({ status: HttpStatus.OK, description: 'API is running', type: HealthResponseDto })
    getHealth(): HealthResponseDto {
        return this.healthService.getHealth();
    }

    @Get('ready')
    @HealthCheck()
    @ApiOperation({ summary: 'Check infrastructure readiness', operationId: 'getReadiness' })
    @ApiResponse({ status: HttpStatus.OK, description: 'API and Database are ready', type: HealthReadinessResponseDto })
    @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'Database or dependencies unavailable', type: HealthReadinessResponseDto })
    async getReadiness(): Promise<HealthReadinessResponseDto> {
        return this.healthService.getReadiness();
    }
}
