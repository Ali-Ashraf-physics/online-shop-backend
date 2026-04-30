import { ApiProperty } from '@nestjs/swagger';

export class AppStatusResponseDto {
    @ApiProperty({ example: 'Hello World!', description: 'API status message' })
    message: string;
}
