# Releases — `@hideyukimori/nene2-client`

## Version policy

- **Semver** on npm; **git tag `vX.Y.Z` + GitHub Release** on every publish (aligned with `package.json` and [CHANGELOG.md](../../CHANGELOG.md)).
- Patch: type/codegen alignment, docs, non-breaking client fixes.
- Minor: new OpenAPI-backed endpoints on the client without breaking existing exports.
- Major: breaking public client API (coordinate with roadmap / ADR).

## Single source of truth

| Artifact         | Role                                               |
| ---------------- | -------------------------------------------------- |
| `package.json`   | npm version bump on `main` before publish          |
| `CHANGELOG.md`   | Release notes (`## [X.Y.Z]` section required)      |
| git tag `vX.Y.Z` | Points to the commit published from `main`         |
| GitHub Release   | Same tag; body from CHANGELOG via publish workflow |
| npm registry     | `@hideyukimori/nene2-client@X.Y.Z`                 |

Trusted Publishing does **not** require tags for npm OIDC, but tags/releases are **required project policy** for traceability.

## Publish flow (maintainers)

1. Bump `version` in `package.json` and add `## [X.Y.Z]` to `CHANGELOG.md` on `main` (PR).
2. `npm run check` locally or wait for CI on the bump PR.
3. Merge to `main` — **do not merge unrelated commits before publish**.
4. GitHub Actions → **Publish npm** → branch `main` → **`dry_run: false`**.
5. Workflow runs: `npm publish` → `gh release create vX.Y.Z` (skips if tag exists).
6. Verify:
   - `npm view @hideyukimori/nene2-client version`
   - `gh release view vX.Y.Z`
   - https://github.com/hideyukiMORI/nene2-js/releases

Requires [Trusted Publisher](publish.md) (`hideyukiMORI/nene2-js` / `publish.yml`). No `NPM_TOKEN`.

## CLI trigger

```bash
gh workflow run publish.yml --ref main -f dry_run=false
```

## Extract release notes locally

```bash
node scripts/extract-changelog-release.mjs 1.0.0
```

## Retroactive tags

Historical npm versions published before tag policy (0.1.0–0.1.4) have no git tags.

**v1.0.0** — tagged at commit `c850548` (PR #92); [GitHub Release](https://github.com/hideyukiMORI/nene2-js/releases/tag/v1.0.0). Tag + Release automation landed in PR #97.
