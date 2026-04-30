import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateAdminStatusDto {
    @ApiProperty()
    @IsBoolean()
    isActive: boolean;
}
