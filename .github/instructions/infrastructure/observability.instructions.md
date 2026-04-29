---
applyTo: "src/**/*observability*.ts,src/infrastructure/logger/**/*.ts,src/common/interceptors/**/*.ts"
---
# Observability Instructions

Phase 1 observability includes request id, structured logs, error counts through logs, and health checks. Design naming for later metrics/traces.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
