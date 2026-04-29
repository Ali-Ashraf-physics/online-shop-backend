---
applyTo: "src/**/*.ts,.github/workflows/**/*.yml"
---
# Security Review Instructions

Review auth, authorization, input validation, sensitive data, webhook verification, file upload safety, and audit coverage.

## Checklist

- Validate the smallest useful scope first.
- Add regression tests for bug fixes.
- Keep public contracts stable unless intentionally changed.
- Document skipped validation with a reason.
