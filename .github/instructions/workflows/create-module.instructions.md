---
applyTo: "src/modules/**"
---
# Create Module Workflow

Create a NestJS feature module with dto, schemas, repositories, services, controllers, enums, and tests as needed. Start from module contract and keep exports minimal.

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
