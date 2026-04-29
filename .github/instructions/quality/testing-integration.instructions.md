---
applyTo: "test/**/*.ts,src/**/*.spec.ts"
---
# Testing Integration Instructions

Integration tests should cover controller + service + repository interactions where behavior crosses layers.

## Checklist

- Validate the smallest useful scope first.
- Add regression tests for bug fixes.
- Keep public contracts stable unless intentionally changed.
- Document skipped validation with a reason.
