---
applyTo: "**/*"
---
# Repository Instructions

Repository-wide Phase 1 policy. Keep the backend as a NestJS modular monolith with strict module boundaries. Use pnpm, DTO validation, Mongoose schemas, Swagger/OpenAPI, and Orval-compatible contracts. Do not introduce Phase 2 infrastructure unless explicitly requested. Keep generated files out of manual edits. When code and instructions disagree, update the instruction file in the same PR or report the drift.

## Agent checklist

- Identify the affected module before editing.
- Load the module-specific instruction file when one exists.
- Keep changes narrow and reversible.
- Run or report relevant validation commands.
- Add TODO/FIXME/NOTE comments only when they carry actionable context.
