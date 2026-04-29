---
applyTo: "src/modules/customers/**/*"
---
# Customers Module Instructions

## 1. Purpose

Own customer profiles and address book for checkout and order history.

## 2. What this module owns

customer document, saved addresses, default address behavior, customer-safe profile responses.

## 3. What this module does not own

authentication credentials, order lifecycle, payment data, seller profiles.

## 4. Owned database collections/schemas/models

- `customers`
- `addresses`

## 5. Required source files

- `dto/create-customer.dto.ts`
- `dto/update-customer.dto.ts`
- `dto/create-address.dto.ts`
- `dto/update-address.dto.ts`
- `schemas/customer.schema.ts`
- `schemas/address.schema.ts`
- `repositories/customers.repository.ts`
- `repositories/addresses.repository.ts`
- `services/customers.service.ts`
- `services/addresses.service.ts`
- `controllers/customers.controller.ts`
- `controllers/addresses.controller.ts`
- `customers.module.ts`

## 6. Required API endpoints

- `GET /me`
- `PATCH /me`
- `GET /me/addresses`
- `POST /me/addresses`
- `PATCH /me/addresses/:addressId`
- `DELETE /me/addresses/:addressId`

## 7. Required service methods

- `createCustomer(input)`
- `findByUserId(userId)`
- `updateProfile(context,dto)`
- `addAddress(context,dto)`
- `updateAddress(context,addressId,dto)`
- `removeAddress(context,addressId)`
- `setDefaultAddress(context,addressId)`
- `assertAddressBelongsToCustomer(customerId,addressId)`

## 8. Required repository methods

- `create(input)`
- `findByUserId(userId)`
- `findAddressById(addressId)`
- `findAddressesByCustomerId(customerId)`
- `updateAddress(addressId,dto)`
- `unsetDefaultAddresses(customerId)`

## 9. Required DTOs/request types/response types

- `create-customer.dto.ts`
- `update-customer.dto.ts`
- `create-address.dto.ts`
- `update-address.dto.ts`
- `customer-response.dto.ts`
- `address-response.dto.ts`

## 10. Required permissions

- Authenticated customer for /me routes
- Admin read/update only if admin endpoints are added

## 11. Audit-log requirements

Audit admin edits to customer profile/address. Customer self-service address changes may be logged as security events if needed.

## 12. Validation rules

- phone format
- district/division/area required for shipping address
- street address max length
- only one default address per customer

## 13. Error cases

- customer not found
- address not found
- address not owned by customer
- duplicate phone/email if unique

## 14. Testing requirements

- default address replacement
- address ownership enforcement
- safe response excludes internal fields

## 15. Forbidden responsibilities

- password/token handling
- order placement
- payment or shipment mutations

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
