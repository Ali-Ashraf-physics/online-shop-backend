---
applyTo: "src/modules/notifications/**/*"
---
# Notifications Module Instructions

## 1. Purpose

Own notification logs and sending abstraction for email/SMS/order events.

## 2. What this module owns

notification logs, template naming, delivery status, mail/SMS adapter usage.

## 3. What this module does not own

business decision to create order/payment/shipment, customer profile ownership.

## 4. Owned database collections/schemas/models

- `notification_logs`
- `notification_templates optional`

## 5. Required source files

- `dto/send-notification.dto.ts`
- `schemas/notification-log.schema.ts`
- `services/notifications.service.ts`
- `services/notification-template.service.ts`
- `controllers/admin-notifications.controller.ts`
- `enums/notification-channel.enum.ts`
- `enums/notification-status.enum.ts`
- `notifications.module.ts`

## 6. Required API endpoints

- `GET /admin/notifications`
- `POST /admin/notifications/test optional`

## 7. Required service methods

- `sendOrderConfirmation(orderId)`
- `sendPaymentConfirmation(paymentId)`
- `sendShipmentUpdate(shipmentId)`
- `sendManual(context,dto)`
- `logNotification(input)`
- `markDelivered(id)`
- `markFailed(id,error)`

## 8. Required repository methods

- `createLog(input)`
- `findMany(query)`
- `updateStatus(id,status)`
- `findById(id)`

## 9. Required DTOs/request types/response types

- `send-notification.dto.ts`
- `notification-log-response.dto.ts`
- `notification-query.dto.ts`

## 10. Required permissions

- Admin notifications:read/test
- Internal send methods for domain modules

## 11. Audit-log requirements

Audit manual/admin-triggered notifications. Automated transactional logs are notification logs, not audit logs.

## 12. Validation rules

- channel supported
- recipient normalized
- template key exists if templates are used
- message length fits SMS limits when channel is SMS

## 13. Error cases

- unsupported channel
- template not found
- recipient missing
- provider failure

## 14. Testing requirements

- send uses correct adapter
- failure logs status
- does not throw into checkout after order creation if async/no-op

## 15. Forbidden responsibilities

- owning order status
- blocking checkout on optional notification failure
- logging sensitive payloads

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
