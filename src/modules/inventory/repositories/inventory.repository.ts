import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryItem, InventoryItemDocument } from '../schemas/inventory-item.schema';
import { InventoryReservation, InventoryReservationDocument } from '../schemas/inventory-reservation.schema';

@Injectable()
export class InventoryRepository {
    constructor(
        @InjectModel(InventoryItem.name) private readonly itemModel: Model<InventoryItemDocument>,
        @InjectModel(InventoryReservation.name) private readonly reservationModel: Model<InventoryReservationDocument>,
    ) { }

    async findBySku(sku: string): Promise<InventoryItemDocument | null> {
        return this.itemModel.findOne({ sku }).exec();
    }

    async upsertInventoryItem(data: Partial<InventoryItem>): Promise<InventoryItemDocument> {
        return this.itemModel
            .findOneAndUpdate({ sku: data.sku }, { $setOnInsert: data }, { upsert: true, new: true })
            .exec();
    }

    async updateQuantitiesAtomically(sku: string, delta: { available?: number; reserved?: number; sold?: number }): Promise<InventoryItemDocument | null> {
        return this.itemModel
            .findOneAndUpdate({ sku }, { $inc: delta }, { new: true })
            .exec();
    }

    async createReservation(data: Partial<InventoryReservation>): Promise<InventoryReservationDocument> {
        const created = new this.reservationModel(data);
        return created.save();
    }

    async findReservationByOrderId(orderId: string): Promise<InventoryReservationDocument | null> {
        return this.reservationModel.findOne({ orderId }).exec();
    }

    async findReservationByIdempotencyKey(key: string): Promise<InventoryReservationDocument | null> {
        return this.reservationModel.findOne({ idempotencyKey: key }).exec();
    }

    async updateReservationStatus(orderId: string, status: string): Promise<InventoryReservationDocument | null> {
        return this.reservationModel.findOneAndUpdate({ orderId }, { $set: { status } }, { new: true }).exec();
    }
}
