---
applyTo: "src/**/*.ts"
---
# Type Safety Instructions

Avoid `any`. Use DTOs, interfaces, enums, and typed config. Narrow unknown errors safely.

## Checklist

- Validate the smallest useful scope first.
- Add regression tests for bug fixes.
- Keep public contracts stable unless intentionally changed.
- Document skipped validation with a reason.
