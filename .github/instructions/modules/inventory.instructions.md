---
applyTo: "src/modules/inventory/**/*"
---
# Inventory Module Instructions

## 1. Purpose

Own SKU stock, reservations, stock movements, and stock availability checks.

## 2. What this module owns

available/reserved/sold quantities, stock adjustments, reservation lifecycle, stock movement history.

## 3. What this module does not own

product title/description, order lifecycle, cart data, payment decisions.

## 4. Owned database collections/schemas/models

- `inventory_items`
- `inventory_reservations`
- `inventory_stock_movements`

## 5. Required source files

- `dto/adjust-stock.dto.ts`
- `dto/reserve-stock.dto.ts`
- `schemas/inventory-item.schema.ts`
- `schemas/inventory-reservation.schema.ts`
- `schemas/stock-movement.schema.ts`
- `repositories/inventory.repository.ts`
- `repositories/stock-movements.repository.ts`
- `services/inventory.service.ts`
- `services/stock-reservation.service.ts`
- `controllers/admin-inventory.controller.ts`
- `enums/stock-movement-type.enum.ts`
- `enums/reservation-status.enum.ts`
- `inventory.module.ts`

## 6. Required API endpoints

- `GET /admin/inventory`
- `PATCH /admin/inventory/:sku/adjust`
- `GET /admin/inventory/:sku/movements`

## 7. Required service methods

- `getAvailability(sku)`
- `adjustStock(context,sku,dto)`
- `reserveStock(context,items,idempotencyKey)`
- `releaseReservation(orderId)`
- `consumeReservation(orderId)`
- `assertAvailable(items)`

## 8. Required repository methods

- `findBySku(sku)`
- `upsertInventoryItem(input)`
- `createReservation(input)`
- `findReservationByOrderId(orderId)`
- `updateQuantitiesAtomically(sku,delta)`
- `createStockMovement(input)`

## 9. Required DTOs/request types/response types

- `adjust-stock.dto.ts`
- `reserve-stock.dto.ts`
- `inventory-response.dto.ts`
- `stock-movement-response.dto.ts`

## 10. Required permissions

- Admin inventory:read/write
- Internal reservation methods for checkout/orders only

## 11. Audit-log requirements

Audit all admin stock adjustments with before/after quantities and reason.

## 12. Validation rules

- quantity integer
- adjustment reason required
- reserved quantity cannot exceed available
- SKU required and normalized

## 13. Error cases

- SKU not found
- insufficient stock
- reservation not found
- reservation already consumed/released

## 14. Testing requirements

- reserve decreases available and increases reserved
- release reverses reservation
- consume moves reserved to sold
- adjustment creates movement

## 15. Forbidden responsibilities

- editing product metadata
- creating orders
- marking payments paid

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
