---
applyTo: "src/database/migrations/**/*.ts,scripts/**/*migration*"
---
# Migrations Instructions

If adding migrations/backfills, make them idempotent, logged, reversible when possible, and safe for partial execution. Document expected runtime and affected collections.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
