---
applyTo: "src/common/filters/**/*.ts"
---
# Filters Instructions

Filters translate exceptions to stable client-safe responses. Include requestId when available. Avoid swallowing errors silently.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
