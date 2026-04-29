---
applyTo: "src/**/*webhook*.ts,src/modules/payments/**/*.ts"
---
# Webhook Instructions

Webhook endpoints must verify provider signatures/secrets where available, store event ids, be idempotent, and return provider-compatible responses without leaking internals.

## Agent checklist

- Use provider interfaces.
- Add config via `src/config`.
- Redact sensitive request/response data.
- Test success, failure, timeout, duplicate, and invalid payload cases when applicable.
