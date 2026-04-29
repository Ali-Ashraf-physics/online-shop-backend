---
applyTo: "src/**/*.{controller,dto}.ts"
---
# Response Format Instructions

API responses must be stable DTOs. List endpoints return pagination metadata. Mutation endpoints return the created/updated resource response DTO or a clear command response. Never return raw Mongoose documents.

## Agent checklist

- Identify the affected module before editing.
- Load the module-specific instruction file when one exists.
- Keep changes narrow and reversible.
- Run or report relevant validation commands.
- Add TODO/FIXME/NOTE comments only when they carry actionable context.
