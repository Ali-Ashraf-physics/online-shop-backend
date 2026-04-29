---
applyTo: "src/modules/admin/**/*"
---
# Admin Module Instructions

## 1. Purpose

Own admin users, admin authentication surface if separate, admin dashboard aggregation, and admin role scaffolding.

## 2. What this module owns

admin user records, admin roles/permissions scaffolding, dashboard aggregation APIs.

## 3. What this module does not own

feature module business mutations that belong in catalog/orders/payments/etc.

## 4. Owned database collections/schemas/models

- `admin_users`
- `admin_roles optional`
- `admin_permissions optional`

## 5. Required source files

- `dto/admin-login.dto.ts`
- `dto/create-admin.dto.ts`
- `dto/update-admin-role.dto.ts`
- `schemas/admin-user.schema.ts`
- `services/admin.service.ts`
- `services/admin-dashboard.service.ts`
- `controllers/admin-auth.controller.ts`
- `controllers/admin-dashboard.controller.ts`
- `admin.module.ts`

## 6. Required API endpoints

- `POST /admin/auth/login`
- `GET /admin/dashboard`
- `POST /admin/users`
- `GET /admin/users`
- `PATCH /admin/users/:adminId/role`
- `PATCH /admin/users/:adminId/status`

## 7. Required service methods

- `loginAdmin(dto)`
- `createAdmin(context,dto)`
- `findAdmins(context,query)`
- `updateAdminRole(context,id,dto)`
- `updateAdminStatus(context,id,dto)`
- `getDashboardStats(context)`

## 8. Required repository methods

- `createAdmin(input)`
- `findByEmail(email)`
- `findById(id)`
- `findMany(query)`
- `updateRole(id,role)`
- `updateStatus(id,status)`

## 9. Required DTOs/request types/response types

- `admin-login.dto.ts`
- `create-admin.dto.ts`
- `update-admin-role.dto.ts`
- `admin-response.dto.ts`
- `admin-dashboard-response.dto.ts`

## 10. Required permissions

- Super admin for admin user management
- Admin dashboard:read for dashboard
- Never expose admin APIs without guard

## 11. Audit-log requirements

Audit admin creation, role changes, status changes, and admin login events where useful.

## 12. Validation rules

- admin email unique
- role valid
- cannot disable final super admin
- password policy for admin accounts

## 13. Error cases

- admin not found
- duplicate email
- cannot modify own critical role without policy
- invalid role

## 14. Testing requirements

- admin endpoints guarded
- role update audited
- dashboard aggregates without leaking sensitive data

## 15. Forbidden responsibilities

- becoming a dumping ground for product/order/payment logic
- bypassing module services for admin mutations

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
