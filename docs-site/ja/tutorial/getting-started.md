# はじめに

公開 npm パッケージを入れて、動作中の NENE2 JSON API を呼び出します。

::: tip サーバがまだ無い場合
先に [NENE2 (PHP) の起動](../howto/install-nene2) または [nene2-python の起動](../howto/install-nene2-python)、または [知識ゼロの全体像](blank-slate-journey) を読んでください。
:::

## インストール

```bash
npm install @hideyukimori/nene2-client
```

**Node 22+**（ネイティブ `fetch`）またはモダンブラウザが必要です。

## 最小例

```ts
import { createNene2Client, Nene2ClientError } from '@hideyukimori/nene2-client';

const client = createNene2Client({
  baseUrl: 'http://localhost:8080',
});

const { health, ping } = await client.smoke();
console.log(health.status, ping.message);
```

## 認証（任意）

```ts
const client = createNene2Client({
  baseUrl: process.env.NENE2_JS_API_BASE_URL!,
  apiKey: process.env.NENE2_MACHINE_API_KEY,
  bearer: process.env.NENE2_BEARER_TOKEN,
});
```

API キーや JWT シークレットはコミットしないでください。[設定](/ja/reference/configuration) を参照。

## API 起点の確認

```bash
curl -sS http://localhost:8080/health | jq .
# 期待: { "status": "ok", "service": "NENE2" }
```

`service` が `NENE2` でない場合、別サービスが 8080 を掴んでいます。クライアントは現状これを自動では拒否しません（[#46](https://github.com/hideyukiMORI/nene2-js/issues/46)）。

## degraded health

```ts
const health = await client.health({ allowDegraded: true });
```

## 次のステップ

- [live smoke](/ja/howto/live-smoke)
- [OpenAPI 同期と codegen](/ja/howto/openapi-codegen)
- [API リファレンス](/ja/reference/client-api)
