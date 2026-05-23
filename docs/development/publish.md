# Publishing `@hideyukimori/nene2-client`

Release flow for `@hideyukimori/nene2-client` (stable **1.0.0** on npm; semver publishes also create git tag + GitHub Release — see [releases.md](releases.md)). CI uses [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC) — no long-lived `NPM_TOKEN`.

## First publish (done once)

Local publish with account 2FA (recovery code, OTP, or temporary write-2FA preference):

```bash
npm run build
npm publish --access public
```

Verify: `npm view @hideyukimori/nene2-client version`

## Trusted Publisher (required for GitHub Actions)

On [npm package settings](https://www.npmjs.com/package/@hideyukimori/nene2-client):

| Field             | Value                   |
| ----------------- | ----------------------- |
| Provider          | GitHub Actions          |
| Repository        | `hideyukiMORI/nene2-js` |
| Workflow filename | `publish.yml`           |

Enable publish permission for the trusted publisher. After this, remove repository secret `NPM_TOKEN` if present (not used anymore).

## Pre-release checks (every version)

1. Bump `version` in `package.json` on `main`.
2. Locally or via CI:

```bash
npm run check
npm publish --dry-run
```

## Publish from GitHub Actions

1. Actions → **Publish npm** → Run workflow on `main`.
2. Optional: `dry_run: true` first.
3. Release: `dry_run: false` (uses OIDC; requires Trusted Publisher configured).
4. On success the workflow creates git tag **`vX.Y.Z`** and a **GitHub Release** whose notes come from [CHANGELOG.md](../../CHANGELOG.md) (`scripts/extract-changelog-release.mjs`). Skips if the tag already exists.

**Before publish:** merge the version bump PR only — run publish on that commit so tag, Release, and npm tarball match.

Workflow: [`.github/workflows/publish.yml`](../../.github/workflows/publish.yml) — `permissions.id-token: write`, `contents: write`, `npm install -g npm@latest` before publish.

See also [releases.md](releases.md) — tag + Release policy.

## Publish locally (maintainer)

```bash
npm run build
npm publish --access public
# If write 2FA is required: --otp=<authenticator or recovery code>
```

## Consumer install

```bash
npm install @hideyukimori/nene2-client@^1.0.0
```

See [howto/consume-client.md](../howto/consume-client.md).
