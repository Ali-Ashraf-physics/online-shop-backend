---
applyTo: "src/**/*.ts"
---
# Performance Instructions

Avoid N+1 queries, unbounded pagination, large document responses, and synchronous provider calls in checkout. Add indexes for frequent filters.

## Checklist

- Validate the smallest useful scope first.
- Add regression tests for bug fixes.
- Keep public contracts stable unless intentionally changed.
- Document skipped validation with a reason.
