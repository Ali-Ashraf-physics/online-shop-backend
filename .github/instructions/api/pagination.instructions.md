---
applyTo: "src/**/dto/**/*query*.ts,src/**/*.controller.ts"
---
# Pagination Instructions

List endpoints use `page`, `limit`, and optional `sortBy`/`sortOrder`. Return `items` and `meta` with total, page, limit, totalPages. Enforce max limit.

## Agent checklist

- Add or update request DTOs.
- Add or update response DTOs.
- Add Swagger decorators and stable operation IDs.
- Document auth, permissions, and errors.
- Consider Orval output shape before merging.
