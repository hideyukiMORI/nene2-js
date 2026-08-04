# Releases — `@hideyukimori/nene2-client`

## Version policy

- **Semver** on npm; **git tag `vX.Y.Z` + GitHub Release** on every publish (aligned with `package.json` and [CHANGELOG.md](../../CHANGELOG.md)).
- Patch: type/codegen alignment, docs, non-breaking client fixes.
- Minor: new OpenAPI-backed endpoints on the client without breaking existing exports.
- Major: breaking public client API (coordinate with roadmap / ADR).

## Single source of truth

| Artifact                    | Role                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `package.json`              | npm version bump before publish                                                                        |
| version constants in `src/` | `src/testing/version.ts` — what a consumer's run reports; guarded by `tests/testing/packaging.test.ts` |
| `CHANGELOG.md`              | Release notes (`## [X.Y.Z]` section required)                                                          |
| git tag `vX.Y.Z`            | Points to the published commit (usually on `main`)                                                     |
| GitHub Release              | Same tag; body from CHANGELOG via publish workflow                                                     |
| npm registry                | `@hideyukimori/nene2-client@X.Y.Z`                                                                     |

Trusted Publishing does **not** require tags for npm OIDC, but tags/releases are **required project policy** for traceability.

## Publish flow (maintainers)

1. Bump `version` in `package.json` and add `## [X.Y.Z]` to `CHANGELOG.md` on `main` (PR).
2. **Bump every version constant that lives inside the package**, in the same PR — today that is
   `src/testing/version.ts` (`NENE2_CLIENT_VERSION`). `tests/testing/packaging.test.ts` fails the
   build when it drifts from `package.json`, so this step announces itself rather than being
   remembered. Do not "fix it after publish": the constant is what a consumer's job log prints, and
   a contract test is green whether it is current or three versions stale.
3. **Retire wording that this publish makes false** — see _Version naming flips at publish_ below.
4. `npm run check` locally or wait for CI on the bump PR.
5. Merge to `main` — **do not merge unrelated commits before publish**.
6. **Dry run first**: GitHub Actions → **Publish npm** → **`dry_run: true`**. Read the tarball
   listing in the log and confirm it contains what this version is supposed to contain — see
   _What ships is decided by the commit, not the version number_.
7. GitHub Actions → **Publish npm** → branch `main` → **`dry_run: false`**.
8. Workflow runs: `npm publish` → `gh release create vX.Y.Z` (skips if tag exists).
9. Verify **against the registry**, not against intent:
   - `npm view @hideyukimori/nene2-client version`
   - `npm view @hideyukimori/nene2-client@X.Y.Z --json` → check `exports` and `dist.fileCount`
   - `gh release view vX.Y.Z`
   - https://github.com/hideyukiMORI/nene2-js/releases

## Version naming flips at publish

The rule about naming a version in public docs **reverses** the moment the publish succeeds, so it
has to be checked twice — once before, once after.

|                    | Rule                                                         | Why                                                                                                                                        |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Before publish** | Do **not** name the version. Write "the next minor release". | A version number that has not shipped is a promise the docs cannot keep — and the number can still change (hub ruling, 2026-07-18).        |
| **After publish**  | **Do** name it. Write "since X.Y.Z".                         | "Available in the next minor release" became false the minute 1.3.0 went out. A reader on 1.3.0 cannot tell whether the feature is theirs. |

So the release PR carries a grep. Before publish, for the _previous_ release's wording:

```bash
grep -rn "next minor release\|next major release\|not yet released" --include='*.md' . | grep -v node_modules
```

Every hit is a sentence that this publish is about to make wrong. Fix them in the release PR or the
follow-up, not "later" — nobody re-reads a paragraph that already looks finished.

(2026-08-05: 1.3.0 shipped the `X-Authorization` opt-out while README and SECURITY still called it
"available in the next minor release". Caught in the post-publish follow-up, #128.)

## What ships is decided by the commit, not the version number

A version bump chooses a **name**. The commit you publish from chooses the **contents**. When those
two are assumed to agree, a release can do the opposite of what was decided while looking correct.

**2026-08-05, 1.3.0.** The owner ruled: ship the `X-Authorization` opt-out **alone**, and let
`./testing` follow separately. But `./testing` was already merged to `main`, so publishing `main` as
1.3.0 would have shipped it too — the ruling would have been carried out and produced the outcome it
was meant to avoid. The fix was not a different version number but a different **cut point**:

- `release/1.3.0` branched from `3dac48c`, the last commit before `./testing` landed.
- Verified on the **dry-run tarball**: `exports` = `['.', './package.json']`, `dist/testing` 0 files,
  positive control `dist/transport` 48 files. Confirmed again on the published package.
- **Not merged into `main`** — merging would have appeared as a diff deleting `./testing`. The branch
  is kept and tagged `archive/1.3.0-release-branch`.
- `main`'s CHANGELOG says so in the `[1.3.0]` section, because otherwise the next reader sees the tag
  in `main`'s history and concludes `main == v1.3.0`.

When a release is meant to contain **less** than `main`:

1. Find the last commit that has what you want and lacks what you don't.
2. Branch `release/X.Y.Z` from it; bump version + CHANGELOG there.
3. Dry-run and **read the tarball listing** — check both a file that must be absent and one that must
   be present (a positive control; an empty grep also matches a broken search).
4. Publish with **Use workflow from: `release/X.Y.Z`**. Selecting `main` here silently publishes
   everything `main` has.
5. After publish: archive-tag the branch, and record on `main` how the release differs from it.

Requires [Trusted Publisher](publish.md) (`hideyukiMORI/nene2-js` / `publish.yml`). No `NPM_TOKEN`.

## CLI trigger

```bash
gh workflow run publish.yml --ref main -f dry_run=true    # always this one first
gh workflow run publish.yml --ref main -f dry_run=false
```

Use `--ref release/X.Y.Z` when publishing a subset of `main` (see above).

## Extract release notes locally

```bash
node scripts/extract-changelog-release.mjs 1.0.0
```

## Retroactive tags

Historical npm versions published before tag policy (0.1.0–0.1.4) have no git tags.

**v1.0.0** — tagged at commit `c850548` (PR #92); [GitHub Release](https://github.com/hideyukiMORI/nene2-js/releases/tag/v1.0.0). Tag + Release automation landed in PR #97.
