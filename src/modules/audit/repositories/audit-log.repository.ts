import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from '../schemas/audit-log.schema';
import { AuditLogQueryDto } from '../dto/audit-log-query.dto';

@Injectable()
export class AuditLogRepository {
    constructor(@InjectModel(AuditLog.name) private readonly model: Model<AuditLogDocument>) { }

    async create(data: Partial<AuditLog>): Promise<AuditLogDocument> {
        const log = new this.model(data);
        return log.save();
    }

    async findMany(queryDto: AuditLogQueryDto): Promise<[AuditLogDocument[], number]> {
        const { skip = 0, limit = 50, actorId, actorType, resourceId, resourceType, action } = queryDto;

        const filter: Record<string, unknown> = {};
        if (actorId) filter.actorId = actorId;
        if (actorType) filter.actorType = actorType;
        if (resourceId) filter.resourceId = resourceId;
        if (resourceType) filter.resourceType = resourceType;
        if (action) filter.action = action;

        const [items, total] = await Promise.all([
            this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            this.model.countDocuments(filter).exec(),
        ]);

        return [items, total];
    }
}
