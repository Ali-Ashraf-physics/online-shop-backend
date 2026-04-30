import { Injectable } from '@nestjs/common';
import { AppStatusResponseDto } from './common/dto/app-status-response.dto';

@Injectable()
export class AppService {
  getHello(): AppStatusResponseDto {
    return { message: 'Hello World!' };
  }
}
