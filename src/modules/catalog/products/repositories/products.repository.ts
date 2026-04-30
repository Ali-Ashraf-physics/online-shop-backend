import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { ProductVariant, ProductVariantDocument } from '../schemas/product-variant.schema';
import { ProductStatus } from '../enums/product-status.enum';

export type ProductQueryFilter = {
    search?: string;
    categoryId?: string;
    status?: ProductStatus;
    skip?: number;
    limit?: number;
};

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        @InjectModel(ProductVariant.name) private readonly variantModel: Model<ProductVariantDocument>,
    ) { }

    async createProduct(data: Partial<Product>): Promise<ProductDocument> {
        const created = new this.productModel(data);
        return created.save();
    }

    async createVariants(productId: string, variants: Array<Partial<ProductVariant>>): Promise<ProductVariantDocument[]> {
        if (variants.length === 0) return [];
        const docs = variants.map((variant) => ({ ...variant, productId }));
        return this.variantModel.insertMany(docs, { ordered: true });
    }

    async findProductById(id: string): Promise<ProductDocument | null> {
        return this.productModel.findById(id).exec();
    }

    async findProductBySlug(slug: string): Promise<ProductDocument | null> {
        return this.productModel.findOne({ slug }).exec();
    }

    async findProducts(query: ProductQueryFilter): Promise<ProductDocument[]> {
        const filter: {
            categoryId?: string;
            status?: ProductStatus;
            $or?: Array<{
                title?: { $regex: string; $options: 'i' };
                slug?: { $regex: string; $options: 'i' };
            }>;
        } = {};
        if (query.categoryId) filter.categoryId = query.categoryId;
        if (query.status) filter.status = query.status;
        if (query.search) {
            filter.$or = [
                { title: { $regex: query.search, $options: 'i' } },
                { slug: { $regex: query.search, $options: 'i' } },
            ];
        }

        return this.productModel
            .find(filter)
            .skip(query.skip ?? 0)
            .limit(query.limit ?? 20)
            .sort({ createdAt: -1 })
            .exec();
    }

    async updateProduct(id: string, data: Partial<Product>): Promise<ProductDocument | null> {
        return this.productModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
    }

    async archiveProduct(id: string): Promise<ProductDocument | null> {
        return this.productModel.findByIdAndUpdate(id, { $set: { status: ProductStatus.ARCHIVED } }, { new: true }).exec();
    }

    async findVariantsByProductId(productId: string): Promise<ProductVariantDocument[]> {
        return this.variantModel.find({ productId }).exec();
    }
}
