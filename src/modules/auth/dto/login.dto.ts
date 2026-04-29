import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsNotEmpty()
    @IsString()
    identifier: string;

    @ApiProperty({ example: 'Password123!', minLength: 8 })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
