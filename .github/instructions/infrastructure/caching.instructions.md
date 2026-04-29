---
applyTo: "src/**/*cache*.ts"
---
# Caching Instructions

Phase 1 should avoid complex caching. If cache is added, source of truth remains MongoDB and invalidation rules must be documented.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
