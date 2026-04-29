---
applyTo: "src/**/*.controller.ts,src/**/dto/**/*.ts"
---
# Openapi Instructions

Use Swagger decorators on controllers, endpoints, DTO fields, auth, errors, and pagination. Include summaries that explain domain behavior, not just method names.

## Agent checklist

- Add or update request DTOs.
- Add or update response DTOs.
- Add Swagger decorators and stable operation IDs.
- Document auth, permissions, and errors.
- Consider Orval output shape before merging.
