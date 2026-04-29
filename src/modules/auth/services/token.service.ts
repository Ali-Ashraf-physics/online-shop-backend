import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from '../repositories/auth.repository';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepository: AuthRepository,
        private readonly configService: ConfigService,
    ) { }

    async issueTokenPair(user: import("../schemas/user.schema").UserDocument): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = { sub: user._id.toString(), role: user.role, permissions: user.permissions };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET', 'dev_secret'),
            expiresIn: '15m',
        });

        const refreshTokenPlain = crypto.randomBytes(40).toString('hex');
        const refreshTokenHash = crypto.createHash('sha256').update(refreshTokenPlain).digest('hex');

        // Set expiry 7 days from now
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await this.authRepository.saveRefreshToken(user._id.toString(), refreshTokenHash, expiresAt);

        return {
            accessToken,
            refreshToken: refreshTokenPlain,
        };
    }

    async validateRefreshToken(plainToken: string): Promise<import("../schemas/refresh-token.schema").RefreshTokenDocument> {
        const tokenHash = crypto.createHash('sha256').update(plainToken).digest('hex');
        const record = await this.authRepository.findRefreshToken(tokenHash);

        if (!record) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        if (record.expiresAt < new Date()) {
            await this.authRepository.revokeRefreshToken(record._id);
            throw new UnauthorizedException('Refresh token expired');
        }

        return record;
    }
}
