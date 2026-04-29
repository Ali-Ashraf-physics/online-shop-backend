---
applyTo: "src/common/guards/**/*.ts,src/modules/**/guards/**/*.ts"
---
# Guards Instructions

Guards enforce authentication and authorization only. They must not run business workflows or mutate state. Return clear forbidden/unauthorized errors.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
