import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AppStatusResponseDto } from './common/dto/app-status-response.dto';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get API status', operationId: 'getApiStatus' })
  @ApiResponse({ status: HttpStatus.OK, type: AppStatusResponseDto })
  getHello(): AppStatusResponseDto {
    return this.appService.getHello();
  }
}
