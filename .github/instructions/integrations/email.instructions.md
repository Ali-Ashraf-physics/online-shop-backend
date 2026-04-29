---
applyTo: "src/infrastructure/mail/**/*.ts,src/modules/notifications/**/*.ts"
---
# Email Instructions

Email sending must be abstracted. Templates must be versionable and testable. Email failure must not break checkout after order creation.

## Agent checklist

- Use provider interfaces.
- Add config via `src/config`.
- Redact sensitive request/response data.
- Test success, failure, timeout, duplicate, and invalid payload cases when applicable.
