---
applyTo: "src/modules/orders/**/*"
---
# Orders Module Instructions

## 1. Purpose

Own order records, order item snapshots, order number generation, status history, and lifecycle transitions.

## 2. What this module owns

orders, order_items, order_status_history, order state machine, customer/admin order reads.

## 3. What this module does not own

payment provider verification, stock quantities, shipment provider API, product catalog source data.

## 4. Owned database collections/schemas/models

- `orders`
- `order_items`
- `order_status_history`

## 5. Required source files

- `dto/create-order.dto.ts`
- `dto/order-query.dto.ts`
- `dto/update-order-status.dto.ts`
- `dto/cancel-order.dto.ts`
- `schemas/order.schema.ts`
- `schemas/order-item.schema.ts`
- `schemas/order-status-history.schema.ts`
- `repositories/orders.repository.ts`
- `repositories/order-items.repository.ts`
- `services/orders.service.ts`
- `services/order-number.service.ts`
- `services/order-state-machine.service.ts`
- `controllers/orders.controller.ts`
- `controllers/admin-orders.controller.ts`
- `enums/order-status.enum.ts`
- `enums/payment-status.enum.ts`
- `enums/shipment-status.enum.ts`
- `orders.module.ts`

## 6. Required API endpoints

- `GET /me/orders`
- `GET /me/orders/:orderId`
- `GET /admin/orders`
- `GET /admin/orders/:orderId`
- `PATCH /admin/orders/:orderId/status`
- `POST /admin/orders/:orderId/cancel`

## 7. Required service methods

- `createOrderFromCheckout(context,draft,idempotencyKey)`
- `findCustomerOrders(context,query)`
- `findCustomerOrderById(context,id)`
- `findAdminOrders(context,query)`
- `updateStatus(context,id,dto)`
- `cancelOrder(context,id,dto)`
- `appendStatusHistory(orderId,transition)`
- `assertTransitionAllowed(from,to)`

## 8. Required repository methods

- `createOrder(input)`
- `findById(id)`
- `findByOrderNumber(orderNumber)`
- `findMany(query)`
- `updateStatus(id,status)`
- `createOrderItems(items)`
- `appendStatusHistory(input)`
- `findByIdempotencyKey(key)`

## 9. Required DTOs/request types/response types

- `create-order.dto.ts`
- `order-query.dto.ts`
- `update-order-status.dto.ts`
- `cancel-order.dto.ts`
- `order-response.dto.ts`
- `order-item-response.dto.ts`

## 10. Required permissions

- Customer can read own orders
- Admin orders:read/status:update/cancel

## 11. Audit-log requirements

Audit admin status changes, cancellations, and any manual total adjustments. Include before/after status and reason.

## 12. Validation rules

- state transition allowed
- order item snapshots immutable after creation
- money totals equal item totals plus shipping minus discount
- customer can only access own order

## 13. Error cases

- order not found
- invalid transition
- order not owned by customer
- duplicate idempotency key conflict

## 14. Testing requirements

- order item snapshots preserve product data
- invalid transitions rejected
- customer isolation
- admin status update creates audit and history

## 15. Forbidden responsibilities

- calling bKash/SSL/shipment APIs
- changing inventory directly
- recomputing old totals from live products

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
