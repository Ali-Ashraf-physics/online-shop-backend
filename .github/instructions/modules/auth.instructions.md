---
applyTo: "src/modules/auth/**/*"
---
# Auth Module Instructions

## 1. Purpose

Authenticate customers/admins, issue and refresh JWTs, validate credentials, expose current user context.

## 2. What this module owns

login/register/refresh flows, token service, JWT strategy wiring, auth DTOs, auth controller.

## 3. What this module does not own

customer profile fields beyond account creation, admin dashboard, business permissions beyond guard integration.

## 4. Owned database collections/schemas/models

- `users or auth identities if implemented separately; otherwise customer/admin references only`
- `refresh_tokens if persistent refresh tokens are implemented`

## 5. Required source files

- `dto/login.dto.ts`
- `dto/register.dto.ts`
- `dto/refresh-token.dto.ts`
- `strategies/jwt.strategy.ts`
- `services/auth.service.ts`
- `services/token.service.ts`
- `controllers/auth.controller.ts`
- `auth.module.ts`

## 6. Required API endpoints

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /auth/me`

## 7. Required service methods

- `registerCustomer(dto)`
- `login(dto)`
- `refresh(dto)`
- `getMe(context)`
- `validateCredentials(identifier,password)`
- `issueTokenPair(subject)`
- `revokeRefreshToken(tokenId) if persistence exists`

## 8. Required repository methods

- `findUserByEmailOrPhone(identifier)`
- `createCustomerIdentity(input)`
- `saveRefreshToken(input)`
- `findRefreshToken(tokenHash)`
- `revokeRefreshToken(tokenId)`

## 9. Required DTOs/request types/response types

- `login.dto.ts`
- `register.dto.ts`
- `refresh-token.dto.ts`
- `auth-user-response.dto.ts`
- `token-pair-response.dto.ts`

## 10. Required permissions

- Public: register/login/refresh
- Authenticated: /auth/me
- Admin auth must be separated or clearly scoped

## 11. Audit-log requirements

Audit admin login failure/success if admin auth is implemented. Do not audit raw passwords or tokens.

## 12. Validation rules

- email or Bangladeshi phone identifier format
- password minimum policy
- refresh token required and non-empty

## 13. Error cases

- invalid credentials
- inactive account
- expired/invalid refresh token
- duplicate email/phone

## 14. Testing requirements

- register validates duplicate identifier
- login rejects wrong password
- refresh rejects revoked token
- /auth/me returns safe user fields

## 15. Forbidden responsibilities

- store raw passwords
- log tokens/passwords
- put customer profile update rules here

## 16. Agent checklist

- Load repository-wide and common NestJS instructions before editing.
- Keep DTOs, schemas, services, repositories, and controllers separate.
- Add Swagger decorators and stable operation IDs for endpoints.
- Add or update tests for service rules and API contracts.
- Add audit logs where this module requires them.
- Run or report `pnpm lint`, typecheck, tests, and build.
