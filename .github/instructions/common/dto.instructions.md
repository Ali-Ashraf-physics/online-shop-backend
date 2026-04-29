---
applyTo: "src/modules/**/dto/**/*.ts,src/common/dto/**/*.ts"
---
# Dto Instructions

DTOs use class-validator and class-transformer. Separate create, update, query, and response DTOs. Query DTOs must normalize pagination/sorting/filtering. Response DTOs must avoid internal fields.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
