---
applyTo: "src/**/*.controller.ts,src/common/filters/**/*.ts"
---
# Error Response Instructions

Error responses must be stable and safe: statusCode, code, message, details when safe, requestId. Do not leak stack traces or raw Mongo/provider errors.

## Agent checklist

- Add or update request DTOs.
- Add or update response DTOs.
- Add Swagger decorators and stable operation IDs.
- Document auth, permissions, and errors.
- Consider Orval output shape before merging.
