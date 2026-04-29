---
applyTo: "src/modules/payments/**/*"
---
# Payments Module Instructions

## 1. Purpose

Own payment records, COD/manual payment behavior, provider interfaces, webhook event storage, and payment state changes.

## 2. What this module owns

payments, webhook events, payment provider registry, payment status transitions, manual mark-paid behavior.

## 3. What this module does not own

order totals calculation, order item data, stock, shipment creation.

## 4. Owned database collections/schemas/models

- `payments`
- `payment_webhook_events`

## 5. Required source files

- `dto/initiate-payment.dto.ts`
- `dto/payment-webhook.dto.ts`
- `dto/manual-payment.dto.ts`
- `schemas/payment.schema.ts`
- `schemas/payment-webhook-event.schema.ts`
- `repositories/payments.repository.ts`
- `repositories/payment-webhook-events.repository.ts`
- `services/payments.service.ts`
- `services/payment-provider-registry.service.ts`
- `providers/cod-payment.provider.ts`
- `providers/manual-payment.provider.ts`
- `controllers/payments.controller.ts`
- `controllers/payment-webhooks.controller.ts`
- `controllers/admin-payments.controller.ts`
- `enums/payment-provider.enum.ts`
- `enums/payment-status.enum.ts`
- `enums/payment-method.enum.ts`
- `interfaces/payment-provider.interface.ts`
- `payments.module.ts`

## 6. Required API endpoints

- `POST /payments/initiate`
- `POST /payments/webhook/:provider`
- `GET /admin/payments`
- `PATCH /admin/payments/:paymentId/mark-paid`
- `PATCH /admin/payments/:paymentId/mark-failed`

## 7. Required service methods

- `createPaymentForOrder(order,method,idempotencyKey)`
- `initiatePayment(context,dto,idempotencyKey)`
- `handleWebhook(provider,headers,body)`
- `markManualPaid(context,paymentId,dto)`
- `markFailed(context,paymentId,dto)`
- `assertPaymentTransitionAllowed(from,to)`

## 8. Required repository methods

- `create(input)`
- `findById(id)`
- `findByOrderId(orderId)`
- `findByIdempotencyKey(key)`
- `updateStatus(id,status)`
- `storeWebhookEvent(input)`
- `findWebhookEvent(provider,eventId)`

## 9. Required DTOs/request types/response types

- `initiate-payment.dto.ts`
- `manual-payment.dto.ts`
- `payment-response.dto.ts`
- `payment-webhook.dto.ts`
- `admin-payment-query.dto.ts`

## 10. Required permissions

- Customer can initiate own order payment
- Provider webhook public but verified
- Admin payments:read/manual:update

## 11. Audit-log requirements

Audit manual mark-paid/failed, refund-like changes later, and suspicious webhook failures. Do not log full sensitive payloads.

## 12. Validation rules

- amount equals order payable amount
- provider supported
- webhook signature verified when provider supports it
- duplicate webhook returns safe success

## 13. Error cases

- payment not found
- unsupported provider
- invalid signature
- amount mismatch
- invalid payment transition

## 14. Testing requirements

- initiate idempotency
- COD payment creation
- manual mark-paid audit
- duplicate webhook ignored
- invalid signature rejected

## 15. Forbidden responsibilities

- calculating cart/order totals
- mutating inventory
- shipping order directly

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
