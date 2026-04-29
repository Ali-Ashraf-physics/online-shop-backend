---
applyTo: "src/**/*queue*.ts"
---
# Queues Instructions

Do not introduce queue infrastructure in Phase 1 unless explicitly requested. If stubbing future queues, keep interfaces small and no-op safe.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
