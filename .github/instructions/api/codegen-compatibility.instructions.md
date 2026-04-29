---
applyTo: "src/**/*.controller.ts,src/**/dto/**/*.ts,openapi/**/*,orval*"
---
# Codegen Compatibility Instructions

Keep OpenAPI output compatible with Orval. Avoid ambiguous union responses, undocumented file uploads, circular schemas, and raw `any`. Generated clients are read-only.

## Agent checklist

- Add or update request DTOs.
- Add or update response DTOs.
- Add Swagger decorators and stable operation IDs.
- Document auth, permissions, and errors.
- Consider Orval output shape before merging.
