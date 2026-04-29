---
applyTo: "src/modules/cart/**/*"
---
# Cart Module Instructions

## 1. Purpose

Own active carts and cart items for anonymous or authenticated shoppers.

## 2. What this module owns

cart lifecycle, cart item quantity, cart merge-ready model, cart preview totals.

## 3. What this module does not own

final order totals, payment, stock mutation, product metadata ownership.

## 4. Owned database collections/schemas/models

- `carts`
- `cart_items`

## 5. Required source files

- `dto/add-cart-item.dto.ts`
- `dto/update-cart-item.dto.ts`
- `dto/cart-query.dto.ts`
- `schemas/cart.schema.ts`
- `schemas/cart-item.schema.ts`
- `repositories/carts.repository.ts`
- `services/cart.service.ts`
- `services/cart-pricing.service.ts`
- `controllers/cart.controller.ts`
- `cart.module.ts`

## 6. Required API endpoints

- `GET /cart`
- `POST /cart/items`
- `PATCH /cart/items/:itemId`
- `DELETE /cart/items/:itemId`
- `DELETE /cart`

## 7. Required service methods

- `getActiveCart(context)`
- `addItem(context,dto)`
- `updateItem(context,itemId,dto)`
- `removeItem(context,itemId)`
- `clearCart(context)`
- `mergeAnonymousCart(context,sessionId)`
- `calculateCartPreview(cartId)`

## 8. Required repository methods

- `findActiveCartByCustomerOrSession(context)`
- `createCart(input)`
- `findItem(cartId,itemId)`
- `upsertCartItem(cartId,item)`
- `updateItemQuantity(itemId,quantity)`
- `removeItem(itemId)`
- `markCartConverted(cartId)`

## 9. Required DTOs/request types/response types

- `add-cart-item.dto.ts`
- `update-cart-item.dto.ts`
- `cart-response.dto.ts`
- `cart-item-response.dto.ts`

## 10. Required permissions

- Anonymous session or authenticated customer
- Admin does not mutate customer carts in Phase 1

## 11. Audit-log requirements

No audit for normal cart changes. Log suspicious automated abuse only if security tooling exists.

## 12. Validation rules

- quantity positive integer
- variantId required when product has variants
- cart item must belong to active cart

## 13. Error cases

- cart not found
- cart item not found
- product/variant unavailable
- quantity exceeds allowed max

## 14. Testing requirements

- add item creates active cart
- update quantity validates ownership
- remove item updates totals
- converted cart cannot mutate

## 15. Forbidden responsibilities

- reserving stock
- creating orders
- initiating payments

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
