import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { AdminRole } from '../enums/admin-role.enum';
import { Permission } from '../../../common/enums/permission.enum';

export class UpdateAdminRoleDto {
    @ApiProperty({ enum: AdminRole })
    @IsEnum(AdminRole)
    role: AdminRole;

    @ApiProperty({ enum: Permission, isArray: true, required: false })
    @IsOptional()
    @IsArray()
    @IsEnum(Permission, { each: true })
    permissions?: Permission[];
}
