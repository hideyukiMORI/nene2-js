# nene2-python を先に立ち上げる

Python 版 NENE2 parity を **先に** 動かし、同じ OpenAPI 契約で TypeScript クライアントを試す手順です。

## 1. リポジトリ

```bash
git clone https://github.com/hideyukiMORI/nene2-python.git
cd nene2-python
```

## 2. 起動（例）

```bash
# リポジトリ README に従う（uv / pip など）
# 既定の開発 URL は http://localhost:8000
```

公式: [nene2-python ドキュメント](https://hideyukimori.github.io/nene2-python/ja/)

## 3. ヘルス確認

```bash
curl -sS http://localhost:8000/health | jq .
# service は NENE2（parity）

curl -sS http://localhost:8000/examples/notes?limit=1 | jq .
# OpenAPI 契約と同じ /examples/* パス（nene2-python #578 以降）
```

## 4. TypeScript クライアント

```bash
npm install @hideyukimori/nene2-client@^1.0.0
```

```ts
const client = createNene2Client({ baseUrl: 'http://localhost:8000' });
await client.health({ strictService: true });
await client.listNotes({ limit: 5 });
```

マルチバックエンド検証: [live smoke](live-smoke) の `NENE2_JS_PYTHON_BASE_URL`。

## 5. PHP NENE2 との交互

1. nene2-python で動作確認 → 2. [NENE2 (PHP) を起動](install-nene2) → 3. 同じクライアントで `baseUrl` を `8080` に切替。

全体像: [知識ゼロの全体像](../tutorial/blank-slate-journey)。
