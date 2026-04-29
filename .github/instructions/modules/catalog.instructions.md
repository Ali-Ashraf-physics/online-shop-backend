---
applyTo: "src/modules/catalog/**/*"
---
# Catalog Module Instructions

## 1. Purpose

Own products, variants, categories, brands, slugs, product media metadata, and public product visibility.

## 2. What this module owns

catalog data and product presentation fields, variant/SKU metadata, product/category CRUD, product media metadata.

## 3. What this module does not own

stock quantities, cart pricing decisions, order item snapshots after order creation, file binary storage implementation.

## 4. Owned database collections/schemas/models

- `products`
- `product_variants`
- `categories`
- `product_media`
- `brands optional`

## 5. Required source files

- `products/dto/create-product.dto.ts`
- `products/dto/update-product.dto.ts`
- `products/dto/product-query.dto.ts`
- `products/schemas/product.schema.ts`
- `products/schemas/product-variant.schema.ts`
- `products/repositories/products.repository.ts`
- `products/services/products.service.ts`
- `products/controllers/products.controller.ts`
- `products/controllers/admin-products.controller.ts`
- `categories/**`
- `media/**`
- `catalog.module.ts`

## 6. Required API endpoints

- `GET /products`
- `GET /products/:slug`
- `GET /categories`
- `POST /admin/products`
- `PATCH /admin/products/:productId`
- `DELETE /admin/products/:productId`
- `POST /admin/categories`
- `PATCH /admin/categories/:categoryId`
- `POST /admin/products/:productId/media`

## 7. Required service methods

- `createProduct(context,dto)`
- `findPublicProducts(query)`
- `findPublicProductBySlug(slug)`
- `updateProduct(context,id,dto)`
- `archiveProduct(context,id)`
- `createCategory(context,dto)`
- `updateCategory(context,id,dto)`
- `attachProductMedia(context,productId,dto)`
- `ensureSlugUnique(slug)`

## 8. Required repository methods

- `createProduct(input)`
- `findProductById(id)`
- `findProductBySlug(slug)`
- `findProducts(query)`
- `updateProduct(id,dto)`
- `archiveProduct(id)`
- `createCategory(input)`
- `findCategoryById(id)`
- `findCategoryTree()`

## 9. Required DTOs/request types/response types

- `create-product.dto.ts`
- `update-product.dto.ts`
- `product-query.dto.ts`
- `product-response.dto.ts`
- `create-category.dto.ts`
- `update-category.dto.ts`
- `category-response.dto.ts`
- `upload-product-media.dto.ts`

## 10. Required permissions

- Public read active products/categories
- Admin catalog:create/update/archive/media:write

## 11. Audit-log requirements

Audit product price/status/category/media changes and category changes by admins.

## 12. Validation rules

- slug unique
- SKU unique within variant collection
- price integer >= 0
- active product requires category, title, at least one variant
- category parent cannot create cycle

## 13. Error cases

- product not found
- category not found
- duplicate slug
- duplicate SKU
- invalid product status transition

## 14. Testing requirements

- public listings hide draft/archived products
- admin can create product with variants
- slug uniqueness
- response DTO excludes internal fields

## 15. Forbidden responsibilities

- owning stock quantities
- changing orders
- calling payment/shipment providers

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
