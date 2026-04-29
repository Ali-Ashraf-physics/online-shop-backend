---
applyTo: ".env*,src/config/**/*.ts,.github/workflows/**/*.yml"
---
# Environment Instructions

Keep `.env.example` updated with required keys and safe placeholder values. Never commit real secrets. Workflows should reference GitHub secrets.

## Agent checklist

- Keep infrastructure reusable and injected.
- Keep secrets out of code and logs.
- Add tests or validation for config and critical adapters.
- Document Phase 2 TODOs without implementing premature complexity.
