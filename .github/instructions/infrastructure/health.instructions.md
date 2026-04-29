---
applyTo: "src/modules/health/**/*.ts"
---
# Health Instructions

Health endpoints should report app/database readiness without leaking secrets or provider credentials.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
