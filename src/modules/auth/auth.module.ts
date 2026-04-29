import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User, UserSchema } from './schemas/user.schema';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';
import { AuthRepository } from './repositories/auth.repository';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: RefreshToken.name, schema: RefreshTokenSchema },
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET', 'dev_secret'),
                signOptions: { expiresIn: '15m' },
            }),
        }),
    ],
    providers: [AuthRepository, TokenService, AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy], // Export for other modules if needed to re-use token verifying
})
export class AuthModule { }

