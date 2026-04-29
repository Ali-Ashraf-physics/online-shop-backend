---
applyTo: "src/modules/health/**/*.ts,src/infrastructure/logger/**/*.ts,.github/workflows/**/*.yml"
---
# Monitoring Instructions

Phase 1 monitoring starts with health endpoints and structured logs. Track errors, latency, deployment status, and database connectivity.

## Deployment checklist

- No secrets committed.
- Build command succeeds.
- Required env vars documented.
- Health/readiness behavior known.
- Rollback/migration impact documented.
