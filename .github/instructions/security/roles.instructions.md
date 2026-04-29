---
applyTo: "src/common/enums/**/*role*.ts,src/modules/admin/**/*.ts"
---
# Roles Instructions

Roles group permissions but must not replace permission checks for sensitive admin actions. Keep role names stable and documented.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
