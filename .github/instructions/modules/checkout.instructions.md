---
applyTo: "src/modules/checkout/**/*"
---
# Checkout Module Instructions

## 1. Purpose

Orchestrate cart validation, address validation, stock reservation, order creation, and initial payment setup.

## 2. What this module owns

checkout flow rules and idempotent place-order command. It owns no persistent collection in Phase 1.

## 3. What this module does not own

cart storage, inventory data, order lifecycle after creation, provider-specific payment logic.

## 4. Owned database collections/schemas/models

- `none in Phase 1; optional checkout_sessions only if explicitly implemented`

## 5. Required source files

- `dto/checkout-quote.dto.ts`
- `dto/place-order.dto.ts`
- `services/checkout.service.ts`
- `services/checkout-validation.service.ts`
- `controllers/checkout.controller.ts`
- `checkout.module.ts`

## 6. Required API endpoints

- `POST /checkout/quote`
- `POST /checkout/place-order`

## 7. Required service methods

- `quote(context,dto)`
- `placeOrder(context,dto,idempotencyKey)`
- `validateCartForCheckout(context,cartId)`
- `buildOrderDraft(context,cart,address)`
- `reserveStockForOrder(orderDraft)`
- `createPaymentForOrder(order,paymentMethod)`

## 8. Required repository methods

- `none unless checkout_sessions are introduced`

## 9. Required DTOs/request types/response types

- `checkout-quote.dto.ts`
- `place-order.dto.ts`
- `checkout-quote-response.dto.ts`
- `place-order-response.dto.ts`

## 10. Required permissions

- Customer or anonymous checkout depending product policy
- Admin must not use checkout endpoints

## 11. Audit-log requirements

Audit is created by downstream order/payment/inventory modules. Checkout may add a high-level order placement audit event if admin-assisted checkout is added.

## 12. Validation rules

- idempotency key required for place-order
- cart not empty
- shipping address complete
- payment method supported
- items still active and purchasable

## 13. Error cases

- empty cart
- invalid address
- insufficient stock
- price changed if policy requires reconfirmation
- duplicate idempotency key returns original result

## 14. Testing requirements

- place-order is idempotent
- stock reservation failure prevents order
- successful checkout creates order/payment and converts cart
- quote does not mutate stock

## 15. Forbidden responsibilities

- direct Mongoose writes to inventory/order/payment collections
- provider-specific payment API calls
- notification sending inline

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
