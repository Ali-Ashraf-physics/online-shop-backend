import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminUser, AdminUserSchema } from './schemas/admin-user.schema';
import { AdminRepository } from './repositories/admin.repository';
import { AdminService } from './services/admin.service';
import { AdminDashboardService } from './services/admin-dashboard.service';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { AdminUsersController } from './controllers/admin-users.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AdminUser.name, schema: AdminUserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET', 'dev_secret'),
                signOptions: { expiresIn: '15m' },
            }),
        }),
    ],
    providers: [AdminRepository, AdminService, AdminDashboardService],
    controllers: [AdminAuthController, AdminDashboardController, AdminUsersController],
    exports: [AdminService, AdminRepository],
})
export class AdminModule { }
