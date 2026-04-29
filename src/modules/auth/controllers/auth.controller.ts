import { Controller, Post, Body, Get, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { TokenPairResponseDto } from '../dto/token-pair-response.dto';
import { AuthUserResponseDto } from '../dto/auth-user-response.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new customer account', operationId: 'registerCustomer' })
    @ApiResponse({ status: HttpStatus.CREATED, type: TokenPairResponseDto })
    async register(@Body() dto: RegisterDto): Promise<TokenPairResponseDto> {
        return this.authService.registerCustomer(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login to an account', operationId: 'login' })
    @ApiResponse({ status: HttpStatus.OK, type: TokenPairResponseDto })
    async login(@Body() dto: LoginDto): Promise<TokenPairResponseDto> {
        return this.authService.login(dto);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh an access token using a refresh token', operationId: 'refreshToken' })
    @ApiResponse({ status: HttpStatus.OK, type: TokenPairResponseDto })
    async refresh(@Body() dto: RefreshTokenDto): Promise<TokenPairResponseDto> {
        return this.authService.refresh(dto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current authenticated user', operationId: 'getMe' })
    @ApiResponse({ status: HttpStatus.OK, type: AuthUserResponseDto })
    async getMe(@Req() req: { user: { sub: string } }): Promise<AuthUserResponseDto> {
        // req.user is injected by JwtAuthGuard via jwt.strategy.ts
        return this.authService.getMe(req.user.sub);
    }
}
