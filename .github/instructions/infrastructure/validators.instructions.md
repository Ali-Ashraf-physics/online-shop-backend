---
applyTo: "src/**/validators/**/*.ts,src/**/dto/**/*.ts"
---
# Validators Instructions

Custom validators must be deterministic and side-effect free unless explicitly using async validation with injected constraints.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
