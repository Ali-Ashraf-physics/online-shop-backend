---
applyTo: "src/modules/checkout/**/*.ts,src/modules/orders/**/*.ts,src/modules/payments/**/*.ts,src/modules/shipments/**/*.ts"
---
# Workflow Policy Instructions

Checkout and fulfillment are workflows. Keep commands idempotent and split critical synchronous work from notification/search/reporting side effects.

## Agent checklist

- Confirm the owning module before editing data.
- Preserve lifecycle correctness.
- Keep customer and provider data private.
- Add audit logs for admin and financial state changes.
