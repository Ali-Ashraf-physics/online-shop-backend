---
applyTo: "src/**/*event*.ts,src/modules/**/events/**/*.ts"
---
# Events Instructions

Use simple domain event classes or outbox-ready records. Events describe facts that already happened. Do not use events for synchronous command validation.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
