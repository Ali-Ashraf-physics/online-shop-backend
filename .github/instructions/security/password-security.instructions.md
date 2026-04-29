---
applyTo: "src/modules/auth/**/*.ts,src/infrastructure/hashing/**/*.ts"
---
# Password Security Instructions

Hash passwords through the hashing service. Never log or return hashes. Use constant-time comparison through vetted libraries.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
