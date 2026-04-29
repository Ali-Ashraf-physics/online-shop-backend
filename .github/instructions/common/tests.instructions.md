---
applyTo: "src/**/*.spec.ts,test/**/*.ts"
---
# Tests Instructions

Tests should cover service business rules, controller contract behavior, repository query assumptions when complex, and e2e flows for checkout/order/payment boundaries. Mock external providers via interfaces.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
