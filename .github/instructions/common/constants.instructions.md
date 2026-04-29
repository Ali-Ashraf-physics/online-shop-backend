---
applyTo: "src/**/constants/**/*.ts"
---
# Constants Instructions

Constants must be domain-specific and named. Do not use constants files as junk drawers. Route segments, default limits, provider names, and immutable config keys are acceptable.

## Required quality

- Keep file responsibilities narrow.
- Prefer clear names over comments.
- Add tests for behavior, not implementation details.
- Do not duplicate cross-cutting rules from other instruction files; link behavior through the correct layer.
