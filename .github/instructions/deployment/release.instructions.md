---
applyTo: ".github/workflows/**/*.yml,CHANGELOG.md,package.json"
---
# Release Instructions

Releases must include API contract notes, migration/backfill notes, and deployment risk. Do not release with undocumented breaking API changes.

## Deployment checklist

- No secrets committed.
- Build command succeeds.
- Required env vars documented.
- Health/readiness behavior known.
- Rollback/migration impact documented.
