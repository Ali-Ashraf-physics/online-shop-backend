import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './products/schemas/product.schema';
import { ProductVariant, ProductVariantSchema } from './products/schemas/product-variant.schema';
import { Category, CategorySchema } from './categories/schemas/category.schema';
import { ProductMedia, ProductMediaSchema } from './media/schemas/product-media.schema';
import { ProductsRepository } from './products/repositories/products.repository';
import { CategoriesRepository } from './categories/repositories/categories.repository';
import { ProductMediaRepository } from './media/repositories/product-media.repository';
import { ProductsService } from './products/services/products.service';
import { CategoriesService } from './categories/services/categories.service';
import { ProductMediaService } from './media/services/product-media.service';
import { ProductsController } from './products/controllers/products.controller';
import { AdminProductsController } from './products/controllers/admin-products.controller';
import { CategoriesController } from './categories/controllers/categories.controller';
import { AdminCategoriesController } from './categories/controllers/admin-categories.controller';
import { AdminProductMediaController } from './media/controllers/admin-product-media.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: ProductVariant.name, schema: ProductVariantSchema },
            { name: Category.name, schema: CategorySchema },
            { name: ProductMedia.name, schema: ProductMediaSchema },
        ]),
    ],
    providers: [
        ProductsRepository,
        CategoriesRepository,
        ProductMediaRepository,
        ProductsService,
        CategoriesService,
        ProductMediaService,
    ],
    controllers: [
        ProductsController,
        AdminProductsController,
        CategoriesController,
        AdminCategoriesController,
        AdminProductMediaController,
    ],
    exports: [ProductsService, CategoriesService, ProductMediaService],
})
export class CatalogModule { }
