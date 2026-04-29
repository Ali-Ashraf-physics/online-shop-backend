---
applyTo: "**/*"
---
# Production Readiness Instructions

Before production: health checks, env validation, logging redaction, auth guards, rate limits for sensitive endpoints, indexes, build success, and rollback notes.

## Deployment checklist

- No secrets committed.
- Build command succeeds.
- Required env vars documented.
- Health/readiness behavior known.
- Rollback/migration impact documented.
