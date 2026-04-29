---
applyTo: "src/modules/audit/**/*.ts,src/modules/**/services/**/*.ts"
---
# Audit Security Instructions

Audit admin mutations and security-sensitive events. Logs must be immutable enough for Phase 1 and must not contain secrets or full sensitive provider payloads.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
