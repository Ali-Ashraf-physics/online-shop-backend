import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AuditAction } from '../enums/audit-action.enum';

export class AuditLogQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    actorId?: string;

    @ApiProperty({ enum: ['CUSTOMER', 'ADMIN', 'SYSTEM'], required: false })
    @IsOptional()
    @IsString()
    actorType?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    resourceId?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    resourceType?: string;

    @ApiProperty({ required: false, enum: AuditAction })
    @IsOptional()
    @IsEnum(AuditAction)
    action?: AuditAction;

    @ApiProperty({ required: false, default: 0 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    skip?: number;

    @ApiProperty({ required: false, default: 50 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;
}
