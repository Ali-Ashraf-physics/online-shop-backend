---
applyTo: "src/modules/admin/**/*.ts,src/common/**/*permission*.ts,src/modules/**/**/*permission*.ts"
---
# Permissions Instructions

Permissions must be explicit, auditable, and least-privilege. Admin endpoints require permissions even when route names look internal.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
