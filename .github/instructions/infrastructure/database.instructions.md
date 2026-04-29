---
applyTo: "src/database/**/*.ts,src/modules/**/schemas/**/*.ts"
---
# Database Instructions

Mongoose connection, plugins, indexes, and schema-level persistence concerns live here or inside module schemas. Use explicit indexes for unique and query-critical fields.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
