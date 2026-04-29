---
applyTo: "**/*"
---
# Code Review Instructions

Review for architecture boundaries, module ownership, tests, API contract, generated file safety, and clear naming.

## Checklist

- Validate the smallest useful scope first.
- Add regression tests for bug fixes.
- Keep public contracts stable unless intentionally changed.
- Document skipped validation with a reason.
