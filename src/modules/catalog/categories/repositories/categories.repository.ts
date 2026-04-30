import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';

@Injectable()
export class CategoriesRepository {
    constructor(@InjectModel(Category.name) private readonly model: Model<CategoryDocument>) { }

    async createCategory(data: Partial<Category>): Promise<CategoryDocument> {
        const created = new this.model(data);
        return created.save();
    }

    async findCategoryById(id: string): Promise<CategoryDocument | null> {
        return this.model.findById(id).exec();
    }

    async findCategoryBySlug(slug: string): Promise<CategoryDocument | null> {
        return this.model.findOne({ slug }).exec();
    }

    async updateCategory(id: string, data: Partial<Category>): Promise<CategoryDocument | null> {
        return this.model.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
    }

    async findCategoryTree(): Promise<CategoryDocument[]> {
        return this.model.find({ isActive: true }).sort({ name: 1 }).exec();
    }
}
