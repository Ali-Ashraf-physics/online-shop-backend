---
applyTo: "src/modules/shipments/**/*"
---
# Shipments Module Instructions

## 1. Purpose

Own shipment records, manual courier assignment, tracking events, and provider abstraction for future courier APIs.

## 2. What this module owns

shipments, shipment tracking events, courier provider registry, shipment status transitions.

## 3. What this module does not own

order payment status, inventory stock, courier settlement accounting unless later module added.

## 4. Owned database collections/schemas/models

- `shipments`
- `shipment_tracking_events`

## 5. Required source files

- `dto/create-shipment.dto.ts`
- `dto/update-shipment-status.dto.ts`
- `dto/shipment-query.dto.ts`
- `schemas/shipment.schema.ts`
- `schemas/shipment-tracking-event.schema.ts`
- `repositories/shipments.repository.ts`
- `services/shipments.service.ts`
- `services/shipment-provider-registry.service.ts`
- `providers/manual-shipment.provider.ts`
- `controllers/shipments.controller.ts`
- `controllers/admin-shipments.controller.ts`
- `enums/shipment-status.enum.ts`
- `enums/courier-provider.enum.ts`
- `interfaces/shipment-provider.interface.ts`
- `shipments.module.ts`

## 6. Required API endpoints

- `GET /shipments/:trackingNumber`
- `GET /admin/shipments`
- `POST /admin/shipments`
- `PATCH /admin/shipments/:shipmentId/status`

## 7. Required service methods

- `createShipment(context,dto,idempotencyKey)`
- `findByTrackingNumber(trackingNumber)`
- `findAdminShipments(query)`
- `updateShipmentStatus(context,id,dto)`
- `appendTrackingEvent(shipmentId,event)`
- `assertShipmentTransitionAllowed(from,to)`

## 8. Required repository methods

- `create(input)`
- `findById(id)`
- `findByTrackingNumber(trackingNumber)`
- `findMany(query)`
- `updateStatus(id,status)`
- `appendTrackingEvent(input)`
- `findByOrderId(orderId)`

## 9. Required DTOs/request types/response types

- `create-shipment.dto.ts`
- `update-shipment-status.dto.ts`
- `shipment-query.dto.ts`
- `shipment-response.dto.ts`
- `tracking-event-response.dto.ts`

## 10. Required permissions

- Public tracking by tracking number only if policy allows
- Admin shipments:read/create/update

## 11. Audit-log requirements

Audit admin courier assignment and shipment status changes with before/after and reason.

## 12. Validation rules

- order exists and is shippable
- tracking number unique when provided
- valid status transition
- courier provider supported

## 13. Error cases

- shipment not found
- duplicate tracking number
- order not shippable
- invalid shipment transition

## 14. Testing requirements

- create manual shipment
- tracking lookup safe response
- invalid transition rejected
- admin update creates audit

## 15. Forbidden responsibilities

- marking payments paid
- changing stock directly
- calculating delivery charge unless pricing policy explicitly moves here

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
