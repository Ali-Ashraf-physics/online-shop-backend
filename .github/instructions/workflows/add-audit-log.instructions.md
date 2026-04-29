---
applyTo: "src/modules/**/services/**/*.ts,src/modules/audit/**/*.ts"
---
# Add Audit Log Workflow

Add audit writes for admin or financial mutations with actor, action, resource, before/after, request metadata, and sanitized payload.

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
