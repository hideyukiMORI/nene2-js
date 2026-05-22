# OpenAPI contract (pinned)

Vendored copy of NENE2 `docs/openapi/openapi.yaml` for reproducible builds and CI.

| File                     | Purpose                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `openapi.yaml`           | Pinned contract consumed by tests and future codegen           |
| `nene2-openapi-pin.json` | NENE2 git ref, OpenAPI `info.version`, SHA-256, sync timestamp |

**Do not edit `openapi.yaml` by hand** except through `npm run contracts:sync` after an NENE2 contract change.

Policy: [ADR 0002](../docs/adr/0002-openapi-contract-pin-policy.md).

```bash
# Update from sibling NENE2 clone (default path) or GitHub raw URL in pin
npm run contracts:sync

# Verify committed files match pin (runs in npm run check)
npm run contracts:check
```
