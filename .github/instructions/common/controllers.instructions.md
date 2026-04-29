---
applyTo: "src/modules/**/controllers/**/*.ts,src/modules/**/*.controller.ts"
---
# Controllers Instructions

Controllers must define routes, guards, Swagger metadata, operation IDs, and DTO binding. They must not contain business branching, database calls, provider calls, or status-machine logic.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
