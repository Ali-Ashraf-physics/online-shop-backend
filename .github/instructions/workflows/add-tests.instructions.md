---
applyTo: "src/**/*.spec.ts,test/**/*.ts"
---
# Add Tests Workflow

Add targeted unit/e2e tests for behavior, validation, permissions, error cases, and idempotency.

## Steps

1. Identify the owning module and load its module instruction file.
2. Check API/security/domain instructions relevant to the files being changed.
3. Implement the smallest complete change.
4. Update DTOs, Swagger, tests, and audit behavior as required.
5. Run or report validation commands.
6. Update instructions if the architecture or contract changed.

## Done criteria

- Code compiles.
- Tests cover new behavior.
- API contract is explicit.
- Security and audit requirements are satisfied.
- No generated files were manually edited.
