---
applyTo: "src/infrastructure/logger/**/*.ts,src/**/*.ts"
---
# Logging Instructions

Use the app logger abstraction. Include requestId/correlationId. Redact tokens, passwords, signatures, provider payloads, and PII.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
