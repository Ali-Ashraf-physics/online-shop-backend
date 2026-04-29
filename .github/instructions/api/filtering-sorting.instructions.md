---
applyTo: "src/**/dto/**/*query*.ts,src/modules/**/repositories/**/*.ts"
---
# Filtering Sorting Instructions

Filters must be explicit allowlists. Never pass arbitrary query params directly to Mongo. Sorting fields must be allowlisted and indexed when used frequently.

## Agent checklist

- Add or update request DTOs.
- Add or update response DTOs.
- Add Swagger decorators and stable operation IDs.
- Document auth, permissions, and errors.
- Consider Orval output shape before merging.
