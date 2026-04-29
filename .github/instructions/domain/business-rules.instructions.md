---
applyTo: "src/modules/**/*.ts"
---
# Business Rules Instructions

Preserve product snapshots in order items, reserve stock before confirming order, use integer money, prevent invalid lifecycle transitions, and separate payment state from order state.

## Agent checklist

- Confirm the owning module before editing data.
- Preserve lifecycle correctness.
- Keep customer and provider data private.
- Add audit logs for admin and financial state changes.
