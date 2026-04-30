import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { AdminRole } from '../enums/admin-role.enum';
import { Permission } from '../../../common/enums/permission.enum';

export class CreateAdminDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({ enum: AdminRole, required: false, default: AdminRole.ADMIN })
    @IsOptional()
    @IsEnum(AdminRole)
    role?: AdminRole;

    @ApiProperty({ enum: Permission, isArray: true, required: false })
    @IsOptional()
    @IsArray()
    @IsEnum(Permission, { each: true })
    permissions?: Permission[];
}
