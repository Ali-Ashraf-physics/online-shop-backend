---
applyTo: "src/modules/**/**/*.ts"
---
# Modules Instructions

A module folder owns its DTOs, schemas, repositories, services, controllers, enums, constants, and tests. Export only services needed by other modules. Avoid barrel exports that hide ownership.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
