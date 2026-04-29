---
applyTo: "src/**/enums/**/*.ts"
---
# Enums Instructions

Enums model stable domain states and public contract values. Do not invent ad-hoc status strings. Update Swagger enum decorators and tests when enum values change.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
