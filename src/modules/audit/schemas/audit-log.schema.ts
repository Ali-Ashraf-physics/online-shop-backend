import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AuditAction } from '../enums/audit-action.enum';

export type AuditLogDocument = AuditLog & Document & { createdAt?: Date };

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class AuditLog {
    @Prop({ required: true, enum: AuditAction })
    action: AuditAction;

    @Prop({ type: String, required: false })
    actorId?: string;

    @Prop({ type: String, required: false, enum: ['CUSTOMER', 'ADMIN', 'SYSTEM'] })
    actorType?: string;

    @Prop({ type: String, required: false })
    resourceId?: string;

    @Prop({ type: String, required: false })
    resourceType?: string;

    @Prop({ type: MongooseSchema.Types.Mixed })
    metadata?: Record<string, unknown>;

    @Prop({ type: MongooseSchema.Types.Mixed })
    beforeState?: Record<string, unknown>;

    @Prop({ type: MongooseSchema.Types.Mixed })
    afterState?: Record<string, unknown>;

    @Prop()
    ipAddress?: string;

    @Prop()
    userAgent?: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
