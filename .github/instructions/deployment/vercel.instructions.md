---
applyTo: "vercel.json,.github/workflows/**/*.yml,src/main.ts,package.json"
---
# Vercel Instructions

Vercel backend deployment must confirm serverless compatibility, build output, environment variables, function timeouts, and Mongo connection reuse. If the NestJS app is not Vercel-ready, document required adapter work.

## Deployment checklist

- No secrets committed.
- Build command succeeds.
- Required env vars documented.
- Health/readiness behavior known.
- Rollback/migration impact documented.
