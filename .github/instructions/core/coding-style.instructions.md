---
applyTo: "src/**/*.ts"
---
# Coding Style Instructions

Use idiomatic NestJS with dependency injection, explicit return types on public methods, small functions, and readable guards against invalid states. Avoid magic strings: use enums/constants. Prefer early validation and domain-specific errors over defensive try/catch everywhere.

## Agent checklist

- Identify the affected module before editing.
- Load the module-specific instruction file when one exists.
- Keep changes narrow and reversible.
- Run or report relevant validation commands.
- Add TODO/FIXME/NOTE comments only when they carry actionable context.
