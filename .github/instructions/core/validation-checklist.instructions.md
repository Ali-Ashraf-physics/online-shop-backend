---
applyTo: "src/**/*"
---
# Validation Checklist Instructions

Before completing a change, check: DTO validation exists, Swagger metadata exists, operationId is stable, auth/permission requirements are explicit, service tests cover business rules, audit logs exist for admin mutations, and generated clients are not manually changed.

## Agent checklist

- Identify the affected module before editing.
- Load the module-specific instruction file when one exists.
- Keep changes narrow and reversible.
- Run or report relevant validation commands.
- Add TODO/FIXME/NOTE comments only when they carry actionable context.
