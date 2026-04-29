---
applyTo: "src/modules/**/schemas/**/*.ts"
---
# Schemas Instructions

Schemas define persistence and indexes. Do not put request validation here. Use explicit defaults, enum constraints, timestamps, and indexes for fields used in lookup, uniqueness, or filtering.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
