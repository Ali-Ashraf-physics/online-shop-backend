import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { AdminLoginDto } from '../dto/admin-login.dto';
import { AdminLoginResponseDto } from '../dto/admin-login-response.dto';

@ApiTags('Admin Auth')
@Controller('admin/auth')
export class AdminAuthController {
    constructor(private readonly adminService: AdminService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login as admin', operationId: 'adminLogin' })
    @ApiResponse({ status: HttpStatus.OK, type: AdminLoginResponseDto })
    async login(@Body() dto: AdminLoginDto): Promise<AdminLoginResponseDto> {
        return this.adminService.loginAdmin(dto);
    }
}
