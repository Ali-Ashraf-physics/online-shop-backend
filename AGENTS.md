# AGENTS.md — Online Shop Backend

## Project overview

Online Shop is a Phase 1 backend for a scalable marketplace/e-commerce system. The repository uses NestJS, Mongoose, OpenAPI/Swagger, pnpm, and an API contract that must remain compatible with Orval-generated frontend clients.

Phase 1 is a modular monolith. Do not introduce microservices yet. Every module should still behave like a future service boundary: it owns its schemas, repositories, services, DTOs, permissions, audit events, and public API surface.

## Architecture

Primary layers:

1. `src/common/` — cross-cutting utilities, decorators, guards, filters, interceptors, pipes, enums, constants.
2. `src/config/` — typed configuration only. Never read `process.env` directly from feature modules.
3. `src/database/` — Mongoose connection, plugins, database-level helpers.
4. `src/infrastructure/` — technical adapters such as storage, mail, SMS, logger, hashing.
5. `src/modules/` — business modules: `auth`, `customers`, `catalog`, `inventory`, `cart`, `checkout`, `orders`, `payments`, `shipments`, `notifications`, `admin`, `audit`, `health`.

Dependency direction:

```txt
controller -> service -> repository -> schema/model
```

Orchestration is allowed only in workflow modules such as `checkout`. Example: `CheckoutService` may call `CartService`, `InventoryService`, `OrdersService`, and `PaymentsService`. Random cross-module writes are forbidden.

## Default commands

Use these commands unless the repository package scripts say otherwise:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If the repo defines a `typecheck` script, prefer `pnpm typecheck` over `pnpm typecheck`.

## Coding conventions

- Use kebab-case file names: `create-product.dto.ts`, `orders.service.ts`.
- Keep controllers thin. Business rules live in services.
- Keep DTOs separate from Mongoose schemas.
- Use repositories for database access where a module has non-trivial persistence logic.
- Use DTO validation for every request body/query/param that crosses an API boundary.
- Use response DTOs. Never return raw Mongoose documents from controllers.
- Store money as integer minor units, not floating-point values.
- Add stable Swagger operation IDs for all endpoints.
- Use typed config and dependency injection instead of importing concrete adapters directly.

## Directory ownership

- `auth` owns login, register, token issue/refresh, password verification, and auth guards integration.
- `customers` owns customer profiles and addresses.
- `catalog` owns categories, products, variants, brands, media metadata, slugs, and product visibility.
- `inventory` owns SKU stock, reservations, stock movements, and stock availability rules.
- `cart` owns active cart state, cart items, and cart pricing preview.
- `checkout` owns checkout orchestration only; it does not own data collections.
- `orders` owns order lifecycle, order item snapshots, status history, and order numbers.
- `payments` owns payment records, provider abstractions, webhook events, payment verification, and manual/COD payment state.
- `shipments` owns shipment records, tracking events, and courier provider abstraction.
- `notifications` owns notification logs and notification sending abstraction.
- `admin` owns admin users, admin dashboard aggregation, and admin authentication.
- `audit` owns immutable audit logs.
- `health` owns health/readiness endpoints.

## Generated files

- OpenAPI/Swagger output is generated from backend decorators and DTOs.
- Orval-generated frontend clients must not be edited manually.
- If API shape changes, update DTOs/decorators and regenerate the OpenAPI artifact/client through the configured scripts.
- Generated files should be clearly marked and excluded from manual refactors unless the generator configuration is being changed.

## Migrations and schema changes

This project uses Mongoose. Phase 1 may not have a formal migration framework yet, but agents must still treat schema changes carefully:

1. Add or update schema definitions.
2. Add indexes explicitly.
3. Provide a backfill/migration note if existing documents are impacted.
4. Update DTOs and response DTOs.
5. Update module instruction contracts if the ownership or lifecycle changes.
6. Add tests for new required fields, defaults, indexes, and validation errors.

## API contracts

Every endpoint must have:

- stable path and HTTP method
- stable `operationId`
- request DTO where applicable
- response DTO
- error response documentation
- auth/permission documentation
- pagination contract for list endpoints

Do not expose raw database field names when the API should use stable domain names. Do not leak internal provider payloads unless the endpoint is explicitly admin-only and sanitized.

## Validation requirements

Before finishing any change, run the smallest useful validation set:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For API changes, also validate Swagger/OpenAPI generation and Orval compatibility using the repository scripts. If scripts are missing, report that explicitly and add a TODO in the PR body.

## What agents must never do

- Never place business logic in controllers.
- Never bypass DTO validation.
- Never return raw Mongoose documents from public endpoints.
- Never mutate another module's collection directly from a random service.
- Never introduce microservices, queues, Redis, or external search in Phase 1 unless a task explicitly asks for Phase 2 work.
- Never store passwords, tokens, webhook secrets, provider payloads, or PII in logs.
- Never edit generated clients manually.
- Never make payment, order, shipment, or inventory operations non-idempotent.
- Never skip audit logs for admin actions that modify price, stock, order, payment, shipment, customer, or admin permissions.

## How to report uncertainty

When context is missing, do not guess silently. State the assumption in the PR or response, choose the safest default, and mark follow-up work with `TODO(owner/context): reason`. Prefer small, reversible changes over broad rewrites.
