---
applyTo: "Dockerfile,docker-compose*.yml,.dockerignore"
---
# Docker Instructions

Docker is optional for local/dev parity. Keep images small, do not bake secrets, and run as non-root when possible.

## Deployment checklist

- No secrets committed.
- Build command succeeds.
- Required env vars documented.
- Health/readiness behavior known.
- Rollback/migration impact documented.
