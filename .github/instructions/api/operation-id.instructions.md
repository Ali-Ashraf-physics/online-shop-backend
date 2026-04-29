---
applyTo: "src/**/*.controller.ts"
---
# Operation Id Instructions

Every endpoint must have a stable operationId. Format: lowerCamelCase verb + resource + optional scope, for example `createProduct`, `findAdminOrders`, `initiatePayment`. Never let generated operation IDs drift randomly.

## Agent checklist

- Add or update request DTOs.
- Add or update response DTOs.
- Add Swagger decorators and stable operation IDs.
- Document auth, permissions, and errors.
- Consider Orval output shape before merging.
