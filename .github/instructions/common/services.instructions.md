---
applyTo: "src/modules/**/services/**/*.ts,src/modules/**/*.service.ts"
---
# Services Instructions

Services own business logic, validation of domain invariants, state transitions, idempotency checks, and audit triggers. Keep provider-specific details behind adapters.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
