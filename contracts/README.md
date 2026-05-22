# OpenAPI contract (pinned)

Vendored copy of NENE2 `docs/openapi/openapi.yaml` for reproducible builds and CI.

| File                     | Purpose                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `openapi.yaml`           | Pinned contract for tests and codegen (`src/generated/`)       |
| `nene2-openapi-pin.json` | NENE2 git ref, OpenAPI `info.version`, SHA-256, sync timestamp |

**Do not edit `openapi.yaml` by hand** except through `npm run contracts:sync` after an NENE2 contract change.

Policy: [ADR 0002](../docs/adr/0002-openapi-contract-pin-policy.md).

When bumping the pin, update **both** `nene2GitRef` (git tag) and note `openapiInfoVersion` from `info.version` in the yaml — they may differ (see [FT1](../docs/field-trials/2026-05-field-trial-1.md) F-3).

```bash
# Update from sibling NENE2 clone (default path) or GitHub raw URL in pin
npm run contracts:sync

# Verify committed files match pin (runs in npm run check)
npm run contracts:check

# Regenerate TypeScript from openapi.yaml (ADR 0006)
npm run codegen
npm run codegen:check
```
