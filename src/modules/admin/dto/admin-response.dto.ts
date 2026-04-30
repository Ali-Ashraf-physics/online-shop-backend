import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../enums/admin-role.enum';
import { Permission } from '../../../common/enums/permission.enum';

export class AdminResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty({ enum: AdminRole })
    role: AdminRole;

    @ApiProperty({ enum: Permission, isArray: true })
    permissions: Permission[];

    @ApiProperty()
    isActive: boolean;
}
