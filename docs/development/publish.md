# Publishing `@hideyukimori/nene2-client`

Manual release flow for Phase 2. CI builds and runs [pack smoke](../../tools/smoke-pack.mjs); registry publish is a maintainer step.

## Prerequisites

- npm account with publish access to scope `@hideyukimori`
- `npm login` or `NPM_TOKEN` with publish scope
- `npm run check` green on `main`

## Pre-release checks

```bash
npm run build
npm run pack:smoke
npm publish --dry-run
```

`--dry-run` lists files that would ship (`dist/`, `README.md`, `LICENSE` per `package.json` `files`).

## Version bump

1. Update `version` in `package.json` (semver; first public line was `0.1.0`).
2. Commit: `chore(release): 0.1.0 を npm 公開準備 #33` (or patch/minor as needed).

## Publish to npm

```bash
npm run build
npm publish --access public
```

Scoped packages require `--access public` on first publish.

Verify:

```bash
npm view @hideyukimori/nene2-client version
```

## GitHub Actions (optional)

[`.github/workflows/publish.yml`](../../.github/workflows/publish.yml) supports **workflow_dispatch** with repository secret `NPM_TOKEN`. Use when you prefer CI publish over local `npm publish`.

## Consumer install

```bash
npm install @hideyukimori/nene2-client
```

See [howto/consume-client.md](../howto/consume-client.md) and [README.md](../../README.md).
