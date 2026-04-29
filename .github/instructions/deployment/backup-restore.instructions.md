---
applyTo: "docs/**/*backup*,src/database/**/*.ts"
---
# Backup Restore Instructions

Mongo backup/restore procedures must be documented before production. Include restore testing notes and data privacy handling.

## Deployment checklist

- No secrets committed.
- Build command succeeds.
- Required env vars documented.
- Health/readiness behavior known.
- Rollback/migration impact documented.
