import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockMovement, StockMovementDocument } from '../schemas/stock-movement.schema';

@Injectable()
export class StockMovementsRepository {
    constructor(@InjectModel(StockMovement.name) private readonly model: Model<StockMovementDocument>) { }

    async createStockMovement(data: Partial<StockMovement>): Promise<StockMovementDocument> {
        const created = new this.model(data);
        return created.save();
    }

    async findBySku(sku: string): Promise<StockMovementDocument[]> {
        return this.model.find({ sku }).sort({ createdAt: -1 }).exec();
    }
}
