---
applyTo: "src/common/decorators/**/*.ts"
---
# Decorators Instructions

Decorators should only read metadata or request context. Keep them small and predictable. Do not perform database calls inside decorators.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
