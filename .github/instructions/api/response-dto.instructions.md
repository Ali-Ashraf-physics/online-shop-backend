---
applyTo: "src/**/dto/**/*response*.ts,src/**/*.controller.ts"
---
# Response Dto Instructions

Response DTOs define what clients can rely on. Hide internal ids when needed, provider payloads, password hashes, token secrets, audit internals, and deleted fields.

## Agent checklist

- Add or update request DTOs.
- Add or update response DTOs.
- Add Swagger decorators and stable operation IDs.
- Document auth, permissions, and errors.
- Consider Orval output shape before merging.
