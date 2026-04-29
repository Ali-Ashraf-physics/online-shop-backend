---
applyTo: ".github/pull_request_template.md,**/*"
---
# Pr Checklist Instructions

PRs must declare module scope, API impact, migration impact, security impact, validation commands, and follow-up TODOs.

## Checklist

- Validate the smallest useful scope first.
- Add regression tests for bug fixes.
- Keep public contracts stable unless intentionally changed.
- Document skipped validation with a reason.
