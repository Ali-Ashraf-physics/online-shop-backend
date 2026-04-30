import { ApiProperty } from '@nestjs/swagger';

export class AdminDashboardResponseDto {
    @ApiProperty()
    totalAdmins: number;

    @ApiProperty()
    activeAdmins: number;
}
