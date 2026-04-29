---
applyTo: "src/modules/payments/**/*.ts"
---
# Payment Instructions

Payment providers must implement a common interface. Payment initiation, verification, webhook processing, and manual/COD transitions must be idempotent. Provider payloads must be stored only when needed and sanitized in responses/logs.

## Agent checklist

- Use provider interfaces.
- Add config via `src/config`.
- Redact sensitive request/response data.
- Test success, failure, timeout, duplicate, and invalid payload cases when applicable.
