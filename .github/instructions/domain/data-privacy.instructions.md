---
applyTo: "src/modules/customers/**/*.ts,src/modules/orders/**/*.ts,src/modules/payments/**/*.ts,src/modules/admin/**/*.ts"
---
# Data Privacy Instructions

Customer PII, addresses, contact details, payment metadata, and admin credentials must be minimized in responses and redacted in logs.

## Agent checklist

- Confirm the owning module before editing data.
- Preserve lifecycle correctness.
- Keep customer and provider data private.
- Add audit logs for admin and financial state changes.
