---
applyTo: "src/**/*.{ts}"
---
# Error Handling Instructions

Throw Nest HTTP exceptions or domain exceptions from services. Do not leak provider payloads, stack traces, or database errors to clients. Translate duplicate key, invalid ObjectId, and invalid state transitions into stable error responses.

## Agent checklist

- Identify the affected module before editing.
- Load the module-specific instruction file when one exists.
- Keep changes narrow and reversible.
- Run or report relevant validation commands.
- Add TODO/FIXME/NOTE comments only when they carry actionable context.
