# OpenAPI 同期と codegen

コントリビューターは NENE2 OpenAPI をピン留めし、TypeScript **型**と **runtime guard** を再生成します。

## ディレクトリ構成

```text
../NENE2/docs/openapi/openapi.yaml   # 契約のソース
../nene2-js/contracts/openapi.yaml   # CI 用ピン留めコピー
```

## コマンド

```bash
npm run contracts:sync      # ピン + contracts/openapi.yaml を更新
npm run codegen             # src/generated/openapi.ts（型）
npm run codegen:check       # 型 drift ゲート（npm run check に含む）
npm run codegen:guards      # src/generated/guards.ts（validators）
npm run codegen:guards:check
```

## NENE2 更新時のワークフロー

1. NENE2 で OpenAPI 変更をマージしリリースタグ
2. **nene2-js** で Issue を起票
3. `contracts:sync` → `codegen` → `codegen:guards` → `npm run check`
4. 公開クライアント表面が変われば PR で types / guards を更新

Codegen は **型**（`codegen`、ADR 0006）と **guard**（`codegen:guards`、ADR 0007）の 2 段階です。`createNene2Client` と `src/problem/guards.ts` は手維持です。

## ピンファイル

`contracts/nene2-openapi-pin.json` に git ref・OpenAPI info version・YAML の SHA-256 を記録します。`syncedFrom` は相対パスの sibling 参照のみ（絶対パス不可）。
