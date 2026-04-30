import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductMedia, ProductMediaDocument } from '../schemas/product-media.schema';

@Injectable()
export class ProductMediaRepository {
    constructor(@InjectModel(ProductMedia.name) private readonly model: Model<ProductMediaDocument>) { }

    async createMedia(data: Partial<ProductMedia>): Promise<ProductMediaDocument> {
        const created = new this.model(data);
        return created.save();
    }

    async findByProductId(productId: string): Promise<ProductMediaDocument[]> {
        return this.model.find({ productId }).sort({ sortOrder: 1 }).exec();
    }
}
