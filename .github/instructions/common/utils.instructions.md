---
applyTo: "src/**/utils/**/*.ts"
---
# Utils Instructions

Utilities must be pure and framework-light. Do not hide database access, HTTP calls, or business workflows inside utils. Promote complex utilities to services.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
