---
applyTo: "src/modules/auth/**/*.ts,src/config/jwt.config.ts"
---
# Token Security Instructions

Tokens must use typed config, expiration, rotation-ready refresh flow, and safe storage assumptions. Never hardcode secrets.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
