---
applyTo: "src/modules/auth/**/*.ts,src/common/guards/**/*.ts"
---
# Auth Security Instructions

Authenticate with validated credentials and token strategies. Do not leak whether email/phone exists unless product policy explicitly allows it. Keep auth flows test-covered.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
