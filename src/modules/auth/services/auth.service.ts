import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../repositories/auth.repository';
import { TokenService } from './token.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { TokenPairResponseDto } from '../dto/token-pair-response.dto';
import { AuthUserResponseDto } from '../dto/auth-user-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly tokenService: TokenService,
    ) { }

    private mapUserToDto(user: import("../schemas/user.schema").UserDocument): AuthUserResponseDto {
        return {
            id: user._id.toString(),
            emailOrPhone: user.emailOrPhone,
            role: user.role,
            permissions: user.permissions || [],
        };
    }

    async registerCustomer(dto: RegisterDto): Promise<TokenPairResponseDto> {
        const existing = await this.authRepository.findUserByEmailOrPhone(dto.identifier);
        if (existing) {
            throw new ConflictException('Identifier already exists');
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.authRepository.createCustomerIdentity({
            emailOrPhone: dto.identifier,
            passwordHash,
        });

        const tokens = await this.tokenService.issueTokenPair(user);

        return {
            ...tokens,
            user: this.mapUserToDto(user),
        };
    }

    async login(dto: LoginDto): Promise<TokenPairResponseDto> {
        const user = await this.validateCredentials(dto.identifier, dto.password);
        const tokens = await this.tokenService.issueTokenPair(user);

        return {
            ...tokens,
            user: this.mapUserToDto(user),
        };
    }

    async refresh(dto: RefreshTokenDto): Promise<TokenPairResponseDto> {
        const record = await this.tokenService.validateRefreshToken(dto.refreshToken);
        const user = await this.authRepository.findUserById(record.userId);

        if (!user || (!user.isActive)) {
            throw new UnauthorizedException('Inactive or missing account');
        }

        // Optionally revoke the old refresh token (refresh token rotation)
        await this.authRepository.revokeRefreshToken(record._id);

        const tokens = await this.tokenService.issueTokenPair(user);
        return {
            ...tokens,
            user: this.mapUserToDto(user),
        };
    }

    async getMe(userId: string): Promise<AuthUserResponseDto> {
        const user = await this.authRepository.findUserById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return this.mapUserToDto(user);
    }

    async validateCredentials(identifier: string, passwordPlain: string): Promise<import("../schemas/user.schema").UserDocument> {
        const user = await this.authRepository.findUserByEmailOrPhone(identifier);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new UnauthorizedException('Account inactive');
        }

        const isMatch = await bcrypt.compare(passwordPlain, user.passwordHash);
        if (!isMatch) {
            // NOTE: Audit failed login limit here if desired later
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}
