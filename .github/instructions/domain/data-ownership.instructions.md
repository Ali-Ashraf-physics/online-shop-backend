---
applyTo: "src/modules/**/*.ts"
---
# Data Ownership Instructions

Each module owns its collections. Other modules must use exported services, not direct model access. Order owns order snapshots; inventory owns stock; payment owns payment records; shipment owns tracking.

## Agent checklist

- Confirm the owning module before editing data.
- Preserve lifecycle correctness.
- Keep customer and provider data private.
- Add audit logs for admin and financial state changes.
