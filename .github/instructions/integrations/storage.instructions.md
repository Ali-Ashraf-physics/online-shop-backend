---
applyTo: "src/infrastructure/storage/**/*.ts"
---
# Storage Instructions

Storage must expose upload/delete/read-url methods through an interface. Do not couple catalog media directly to a specific provider.

## Agent checklist

- Use provider interfaces.
- Add config via `src/config`.
- Redact sensitive request/response data.
- Test success, failure, timeout, duplicate, and invalid payload cases when applicable.
