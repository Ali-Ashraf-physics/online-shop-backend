---
applyTo: "src/**/*.ts"
---
# Sensitive Data Instructions

Treat password hashes, tokens, payment provider payloads, webhook signatures, customer phone/email/address, and admin credentials as sensitive. Never log them unsanitized.

## Security checklist

- Validate input before use.
- Enforce auth and permissions at the controller boundary.
- Avoid sensitive data in logs, errors, DTOs, and tests.
- Add audit logs for privileged or financial changes.
- Prefer deny-by-default for ambiguous access.
