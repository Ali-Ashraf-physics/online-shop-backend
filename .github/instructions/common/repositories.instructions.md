---
applyTo: "src/modules/**/repositories/**/*.ts,src/modules/**/*.repository.ts"
---
# Repositories Instructions

Repositories are the only module-local layer that directly uses Mongoose models for non-trivial queries. Return lean domain-safe objects where possible and hide query complexity from services.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
