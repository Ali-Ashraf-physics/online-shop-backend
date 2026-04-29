---
applyTo: "test/**/*.e2e-spec.ts"
---
# Testing E2E Instructions

E2E tests should cover critical flows: auth, catalog read, cart, checkout, order, payment manual/COD, admin guarded routes.

## Checklist

- Validate the smallest useful scope first.
- Add regression tests for bug fixes.
- Keep public contracts stable unless intentionally changed.
- Document skipped validation with a reason.
