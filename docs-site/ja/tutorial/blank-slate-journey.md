# 知識ゼロからの全体像（NENE2 ↔ nene2-python ↔ nene2-js）

このページは [日本語ドキュメント](https://hideyukimori.github.io/nene2-js/ja/) だけを渡された人向けです。

## 登場人物（ペルソナ）

| ペルソナ                | 最初に触るもの      | よくある勘違い                    |
| ----------------------- | ------------------- | --------------------------------- |
| TypeScript アプリ開発者 | npm クライアント    | サーバ無しで smoke できると思う   |
| Python 開発者           | nene2-python :8000  | PHP 版とポートが違う              |
| NENE2 PHP 開発者        | :8080               | クライアントは別 npm パッケージ   |
| DevOps                  | ヘルス URL          | 8080 に別サービスがいる           |
| AI エージェント         | このサイト URL のみ | 兄弟リポジトリの clone を知らない |

## 経路 A — NENE2 (PHP) ファースト（推奨）

1. [NENE2 を起動](../howto/install-nene2) → `http://localhost:8080`
2. `npm install @hideyukimori/nene2-client`
3. [はじめに](getting-started) の `createNene2Client` + `smoke()`
4. 必要なら [live smoke](../howto/live-smoke)

## 経路 B — nene2-python ファースト

1. [nene2-python を起動](../howto/install-nene2-python) → `http://localhost:8000`
2. 同じ npm クライアント、`baseUrl` だけ 8000（パスは `/examples/notes` など OpenAPI 準拠）
3. `await client.health({ strictService: true })` でポート取り違えを検出
4. 続けて PHP NENE2 を :8080 で起動し、マトリクス比較（`NENE2_JS_PYTHON_BASE_URL`）

## 経路 C — evac / フィールドトライアル

- NENE2 evac ポート例: `http://localhost:18080`
- 環境変数は [設定](../reference/configuration) と NENE2 本体ドキュメント

## 兄弟ディレクトリ

```text
../NENE2/
../nene2-js/
../nene2-python/
```

## 公式ドキュメント

| プロジェクト | URL                                             |
| ------------ | ----------------------------------------------- |
| NENE2        | https://hideyukimori.github.io/NENE2/ja/        |
| nene2-python | https://hideyukimori.github.io/nene2-python/ja/ |
| nene2-js     | https://hideyukimori.github.io/nene2-js/ja/     |
