# NENE2 への live smoke

実 API 向けの統合テストは任意です。CI は fixture のみです。

## 環境変数

```bash
export NENE2_JS_API_BASE_URL=http://localhost:8080
```

マルチバックエンド（ADR 0003）:

```bash
export NENE2_JS_API_BASE_URL=http://localhost:8080
export NENE2_JS_PYTHON_BASE_URL=http://localhost:8000
npm test -- tests/client/live-smoke-matrix.test.ts
```

## トラブルシュート

| 症状                  | 原因の例                   |
| --------------------- | -------------------------- |
| ボディ形状不一致      | `baseUrl` が NENE2 以外    |
| HTML ヒント付きエラー | 別フレームワークやリバプロ |
| getProtected が 401   | bearer / JWT 未設定        |
