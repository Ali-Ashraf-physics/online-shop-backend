# Copilot Instructions — Online Shop Backend

You are working in the Online Shop backend repository.

## Repository identity

- Project type: backend.
- Main stack: NestJS, Mongoose, OpenAPI/Swagger.
- Package manager: pnpm.
- API generation compatibility: Swagger/OpenAPI for Orval-generated clients.
- Deployment target: Vercel, unless repository deployment files state otherwise.
- Phase: Phase 1 MVP with future-ready modular architecture.

## Architecture rule

Build a modular monolith. Do not introduce microservices in Phase 1. Keep module boundaries strict so modules can be extracted later.

Required Phase 1 modules:

- `auth`
- `customers`
- `catalog` with `products`, `categories`, `media`
- `inventory`
- `cart`
- `checkout`
- `orders`
- `payments`
- `shipments`
- `notifications`
- `admin`
- `audit`
- `health`

## Source structure

Expected high-level source tree:

```txt
src/
  main.ts
  app.module.ts
  config/
  common/
  database/
  infrastructure/
  modules/
```

Do not create unrelated root-level architecture folders without an explicit task.

## Non-negotiable rules

1. DTO-based validation is mandatory for every request body/query/param.
2. Controllers must stay thin; business rules belong in services.
3. Mongoose schemas must not be reused as request or response DTOs.
4. Public endpoints must return response DTOs, not raw Mongoose documents.
5. Every public API endpoint must have Swagger decorators and a stable operation ID.
6. Money must be stored and calculated as integer minor units.
7. Payment, checkout, webhook, shipment, and refund-like actions must be idempotent.
8. Admin mutations must create audit logs where applicable.
9. External provider integrations must live behind provider interfaces/adapters.
10. Generated OpenAPI/Orval client artifacts must not be edited manually.

## Naming

- File names: kebab-case.
- Classes: PascalCase.
- Variables/functions: camelCase.
- Constants: SCREAMING_SNAKE_CASE only for true constants.
- DTO files: `create-x.dto.ts`, `update-x.dto.ts`, `x-query.dto.ts`, `x-response.dto.ts`.
- Schema files: `x.schema.ts`.
- Repository files: `x.repository.ts`.
- Service files: `x.service.ts`.
- Controller files: `x.controller.ts`, `admin-x.controller.ts`.

## Validation commands

Run or recommend the relevant subset:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```


## How to handle uncertainty

If a command, provider, route, or domain rule is unclear, use the safest Phase 1 default and document the assumption. Do not invent provider credentials, production secrets, or unavailable scripts.
