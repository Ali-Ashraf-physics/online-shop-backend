---
applyTo: "src/modules/sellers/**/*.ts,src/modules/**/repositories/**/*.ts"
---
# Tenant Isolation Instructions

Phase 1 is seller-ready. Any seller-owned data must include `sellerId` in queries when seller scope exists. Never trust client-provided seller ids without context validation.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
