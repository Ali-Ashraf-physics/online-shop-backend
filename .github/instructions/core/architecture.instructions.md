---
applyTo: "src/**/*.{ts,tsx}"
---
# Architecture Instructions

Architecture rules: controllers receive requests, services execute business logic, repositories access Mongoose, schemas define persistence. `checkout` may orchestrate modules, but normal modules must not mutate other modules collections directly. Use interfaces for infrastructure providers. Treat every module as a future service boundary.

## Agent checklist

- Identify the affected module before editing.
- Load the module-specific instruction file when one exists.
- Keep changes narrow and reversible.
- Run or report relevant validation commands.
- Add TODO/FIXME/NOTE comments only when they carry actionable context.
