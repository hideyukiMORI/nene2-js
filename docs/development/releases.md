# Releases — `@hideyukimori/nene2-client`

## Version policy

- **Semver** on npm; git tags optional (not required for Trusted Publishing workflow).
- Patch (`0.1.x`): type/codegen alignment, docs, non-breaking client fixes.
- Minor: new OpenAPI-backed endpoints on the client without breaking existing exports.

## Publish flow (maintainers)

1. Bump `version` in `package.json` on `main`.
2. `npm run check` locally or wait for CI on the bump PR.
3. Merge to `main`.
4. GitHub Actions → **Publish npm** → branch `main` → **`dry_run: false`**.
5. Verify: `npm view @hideyukimori/nene2-client version`

Requires [Trusted Publisher](publish.md) (`hideyukiMORI/nene2-js` / `publish.yml`). No `NPM_TOKEN`.

## CLI trigger

```bash
gh workflow run publish.yml --ref main -f dry_run=false
```
