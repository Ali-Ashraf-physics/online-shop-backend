---
applyTo: "src/infrastructure/**/*.ts,src/modules/**/providers/**/*.ts"
---
# External Api Instructions

External APIs must be wrapped behind interfaces and provider classes. Define timeouts, retries where safe, request logging with redaction, and provider-specific error mapping.

## Agent checklist

- Use provider interfaces.
- Add config via `src/config`.
- Redact sensitive request/response data.
- Test success, failure, timeout, duplicate, and invalid payload cases when applicable.
