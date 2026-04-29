# Create Crud Resource Prompt

## Purpose

Create a CRUD resource with DTOs, schemas, repository, service, controller, Swagger, permissions, and tests.

## Inputs required

- Target module or file path.
- Desired behavior or bug/feature description.
- API endpoints affected, if any.
- Data/schema changes, if any.
- Permission/security expectations.
- Validation commands available in the repo.

## Expected output

- A concise implementation plan.
- Files to create/update.
- Code changes following NestJS/Mongoose/OpenAPI conventions.
- Tests or test plan.
- API contract notes.
- Security and migration notes where relevant.

## Checklist

- Load `.github/copilot-instructions.md`.
- Load specific `.github/instructions/modules/<module>.instructions.md` when applicable.
- Keep controllers thin and services responsible for business rules.
- Use DTOs and response DTOs.
- Add Swagger decorators and stable operation IDs.
- Do not manually edit generated files.
- Add audit logs for admin/financial/lifecycle-sensitive mutations.

## Validation commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```


