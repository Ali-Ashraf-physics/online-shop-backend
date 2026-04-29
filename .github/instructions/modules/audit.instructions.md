---
applyTo: "src/modules/audit/**/*"
---
# Audit Module Instructions

## 1. Purpose

Own immutable audit logs for security, admin, financial, inventory, and lifecycle-sensitive actions.

## 2. What this module owns

audit log schema, audit writing service, admin audit query endpoint.

## 3. What this module does not own

application logs, notification logs, provider raw logs, business state changes themselves.

## 4. Owned database collections/schemas/models

- `audit_logs`

## 5. Required source files

- `dto/audit-log-query.dto.ts`
- `schemas/audit-log.schema.ts`
- `repositories/audit-log.repository.ts`
- `services/audit.service.ts`
- `controllers/admin-audit.controller.ts`
- `enums/audit-action.enum.ts`
- `audit.module.ts`

## 6. Required API endpoints

- `GET /admin/audit-logs`

## 7. Required service methods

- `record(input)`
- `recordAdminAction(context,action,resource,before,after)`
- `findAuditLogs(context,query)`
- `sanitizeAuditPayload(payload)`

## 8. Required repository methods

- `create(input)`
- `findMany(query)`
- `findByResource(resourceType,resourceId)`

## 9. Required DTOs/request types/response types

- `audit-log-query.dto.ts`
- `audit-log-response.dto.ts`
- `record-audit-log.dto.ts internal only`

## 10. Required permissions

- Admin audit:read
- Internal write allowed from modules

## 11. Audit-log requirements

Audit module does not audit itself recursively. Audit read access may be logged as security event if policy requires.

## 12. Validation rules

- action enum required
- resource type/id required for resource actions
- actor id/type required when available
- payload sanitized

## 13. Error cases

- invalid audit action
- audit log not found for direct reads if implemented

## 14. Testing requirements

- record sanitizes sensitive fields
- admin query paginates
- audit writes do not break core business flow unexpectedly

## 15. Forbidden responsibilities

- storing passwords/tokens/full provider secrets
- mutating audited resources
- deleting audit logs in normal app flow

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
