---
applyTo: "src/**/middleware/**/*.ts,src/main.ts"
---
# Middleware Instructions

Middleware handles request-level technical concerns only: correlation id, raw body for webhooks, security headers, body limits. Avoid business logic.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
