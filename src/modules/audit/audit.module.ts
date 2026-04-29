import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLog, AuditLogSchema } from './schemas/audit-log.schema';
import { AuditLogRepository } from './repositories/audit-log.repository';
import { AuditService } from './services/audit.service';
import { AdminAuditController } from './controllers/admin-audit.controller';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: AuditLog.name, schema: AuditLogSchema }]),
    ],
    providers: [AuditLogRepository, AuditService],
    controllers: [AdminAuditController],
    exports: [AuditService],
})
export class AuditModule { }

