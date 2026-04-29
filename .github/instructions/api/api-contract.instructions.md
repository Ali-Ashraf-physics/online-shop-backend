---
applyTo: "src/modules/**/controllers/**/*.ts,src/modules/**/dto/**/*.ts"
---
# Api Contract Instructions

The API is a stable product contract. Any route change must be intentional, documented, and compatible with Orval. Do not expose raw persistence models.

## Agent checklist

- Add or update request DTOs.
- Add or update response DTOs.
- Add Swagger decorators and stable operation IDs.
- Document auth, permissions, and errors.
- Consider Orval output shape before merging.
