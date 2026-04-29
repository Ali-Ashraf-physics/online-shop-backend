---
applyTo: "src/database/seeders/**/*.ts,scripts/**/*seed*"
---
# Seeders Instructions

Seeders must be deterministic, idempotent, and environment-safe. Never seed production secrets or real customer data.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
