# Online Shop `.github/` Agent System

This folder teaches AI coding agents how to work inside the Online Shop backend repository.

## How the instruction system is layered

1. `.github/copilot-instructions.md` contains repository-wide rules.
2. `.github/instructions/core/` contains global architecture and coding policies.
3. `.github/instructions/common/` contains NestJS file-type rules: controllers, services, DTOs, schemas, tests, etc.
4. `.github/instructions/api/` contains OpenAPI/Swagger and Orval compatibility rules.
5. `.github/instructions/security/` contains authentication, authorization, sensitive-data, and audit rules.
6. `.github/instructions/infrastructure/` contains config, database, logging, queues, events, and observability rules.
7. `.github/instructions/integrations/` contains rules for external providers: payments, webhooks, email, SMS, storage.
8. `.github/instructions/domain/` contains e-commerce lifecycle and data ownership rules.
9. `.github/instructions/modules/` contains concrete contracts for each Phase 1 module.
10. `.github/instructions/workflows/` contains task-specific procedures for creating modules, endpoints, DTOs, tests, and reviews.
11. `.github/instructions/quality/` contains validation and review expectations.
12. `.github/instructions/deployment/` contains CI, Vercel, release, monitoring, and production readiness rules.

Each `.instructions.md` file has YAML frontmatter with an `applyTo` glob. Agents should load the most specific instruction files for the files they are changing.

## How to use the prompt files

The files under `.github/prompts/` are reusable prompts for common engineering tasks. Use them when asking an AI coding agent to perform repeatable work, such as creating a module, adding a CRUD resource, reviewing security, or validating API contract compatibility.

## How to use the agent files

The files under `.github/agents/` define specialist agent personas. Use the narrowest specialist for the task:

- architecture changes: `project-architect.agent.md`
- API contract and Swagger changes: `api-contract.agent.md`
- security review: `security-reviewer.agent.md`
- database/schema changes: `database-architect.agent.md`
- tests: `test-engineer.agent.md`
- backend implementation: `backend-agent.agent.md`
- domain workflow/rules: `domain-specialist.agent.md`
- DevOps/CI/deployment: `devops-agent.agent.md`

## Files to customize first

1. `.github/copilot-instructions.md` — update commands if `package.json` scripts differ.
2. `.github/instructions/modules/*.instructions.md` — update module contracts as the implementation grows.
3. `.github/workflows/*.yml` — adjust environment variables, secrets, and deployment details.
4. `.github/instructions/deployment/vercel.instructions.md` — confirm the backend deployment model for Vercel.
5. `.github/instructions/integrations/payment.instructions.md` — add exact provider rules when bKash, SSLCOMMERZ, shurjoPay, or other providers are selected.

## Maintenance rule

When the architecture changes, update the relevant instruction file in the same PR as the code change. Do not let the agent instructions drift away from the repository.
