import { ApiProperty } from '@nestjs/swagger';

export class AppStatusResponseDto {
    @ApiProperty()
    message: string;
}
