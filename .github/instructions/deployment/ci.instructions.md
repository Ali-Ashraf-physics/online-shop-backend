---
applyTo: ".github/workflows/**/*.yml"
---
# Ci Instructions

CI must install with pnpm, lint, typecheck, test, build, and check API contract where configured. Use frozen lockfile.

## Deployment checklist

- No secrets committed.
- Build command succeeds.
- Required env vars documented.
- Health/readiness behavior known.
- Rollback/migration impact documented.
