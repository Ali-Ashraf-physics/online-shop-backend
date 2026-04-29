---
applyTo: "src/modules/health/**/*"
---
# Health Module Instructions

## 1. Purpose

Expose health and readiness status for deployment and monitoring.

## 2. What this module owns

health endpoint, database readiness check, version/uptime response.

## 3. What this module does not own

business diagnostics, admin dashboard metrics, secret/config dumping.

## 4. Owned database collections/schemas/models

- `none`

## 5. Required source files

- `health.controller.ts`
- `health.service.ts`
- `health.module.ts`

## 6. Required API endpoints

- `GET /health`
- `GET /health/ready optional`

## 7. Required service methods

- `getHealth()`
- `getReadiness()`
- `checkDatabase()`

## 8. Required repository methods

- `none`

## 9. Required DTOs/request types/response types

- `health-response.dto.ts optional`

## 10. Required permissions

- Public or platform-internal depending deployment policy; never return secrets

## 11. Audit-log requirements

No audit required for health checks.

## 12. Validation rules

- no input required

## 13. Error cases

- database unavailable returns appropriate readiness failure
- do not expose stack traces

## 14. Testing requirements

- health returns ok
- readiness fails safely when database check fails

## 15. Forbidden responsibilities

- returning env vars
- calling external payment/courier providers
- running expensive queries

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
