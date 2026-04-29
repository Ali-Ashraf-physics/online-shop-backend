---
applyTo: "src/jobs/**/*.ts,src/**/*job*.ts"
---
# Jobs Instructions

Phase 1 jobs should be minimal and idempotent. Long-running work should be designed for Phase 2 queues but not overbuilt.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
