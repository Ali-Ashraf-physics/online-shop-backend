---
applyTo: "src/**/*rate*.ts,src/main.ts,src/modules/auth/**/*.ts"
---
# Rate Limit Instructions

Rate-limit auth, checkout, payment initiation, webhooks, and file upload endpoints. Use safe defaults and document missing implementation as TODO for Phase 2 if not built.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
