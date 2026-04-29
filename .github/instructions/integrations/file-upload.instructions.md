---
applyTo: "src/**/*upload*.ts,src/modules/catalog/media/**/*.ts"
---
# File Upload Instructions

File upload endpoints must validate size, MIME type, extension, and ownership. Store metadata in Mongo, not binary payloads.

## Agent checklist

- Use provider interfaces.
- Add config via `src/config`.
- Redact sensitive request/response data.
- Test success, failure, timeout, duplicate, and invalid payload cases when applicable.
