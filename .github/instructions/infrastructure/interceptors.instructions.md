---
applyTo: "src/common/interceptors/**/*.ts"
---
# Interceptors Instructions

Interceptors may add response wrapping, request IDs, timing, or serialization. Do not add business rules here.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
