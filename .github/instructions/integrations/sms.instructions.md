---
applyTo: "src/infrastructure/sms/**/*.ts,src/modules/notifications/**/*.ts"
---
# Sms Instructions

SMS sending must be abstracted. Phone numbers must be validated and normalized. SMS failure must be logged and retry-ready, not fatal to checkout.

## Agent checklist

- Use provider interfaces.
- Add config via `src/config`.
- Redact sensitive request/response data.
- Test success, failure, timeout, duplicate, and invalid payload cases when applicable.
