---
applyTo: "src/config/**/*.ts"
---
# Config Instructions

Config files must be typed, validated, and centralized. Feature modules must not read `process.env` directly.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
