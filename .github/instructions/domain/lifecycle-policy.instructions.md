---
applyTo: "src/modules/orders/**/*.ts,src/modules/payments/**/*.ts,src/modules/shipments/**/*.ts,src/modules/inventory/**/*.ts"
---
# Lifecycle Policy Instructions

Lifecycle transitions must be validated by state-machine services or explicit transition maps. Tests must cover allowed and forbidden transitions.

## Agent checklist

- Confirm the owning module before editing data.
- Preserve lifecycle correctness.
- Keep customer and provider data private.
- Add audit logs for admin and financial state changes.
