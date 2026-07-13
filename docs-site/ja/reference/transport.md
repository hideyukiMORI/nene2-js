# フリートトランスポート API

> **v1.1.0** で追加（[#102](https://github.com/hideyukiMORI/nene2-js/issues/102)）。当面は英語・日本語のみ。他ロケールは後続で対応します。

`createNene2Transport(config?)` → `Nene2Transport` — NENE2 系プロダクトのフロントエンドが使う、汎用の認証付き HTTP トランスポート。各製品が手書きしてきた配管（全リクエストへの `X-Authorization` ミラー・sessionStorage token store・RFC 9457 Problem Details エラー・401/403 フック）を、パッケージ側で 1 回だけ正しく実装したものです。

## `X-Authorization` ミラーの理由

一部の共有ホスティングのフロントプロキシ（Tier A・HETEML で実測）は、標準の `Authorization` ヘッダを PHP に届く前に落とします。NENE2 系バックエンドは標準ヘッダ欠落時に `X-Authorization` ミラーへフォールバックします。トランスポートは認証ヘッダの構築を単一の内部チョークポイントに集約し、**全経路**（JSON verb・blob ダウンロード・multipart アップロード・CSV/bytes）が必ずそこを通ります。認証ヘッダは最後に適用されるため、呼び出し側がミラーを落とすことは構造的にできません。

## token store

```ts
import { createSessionTokenStore } from '@hideyukimori/nene2-client';

const tokenStore = createSessionTokenStore({ key: 'nene_myproduct_token' });
tokenStore.setToken(jwt); // ログイン後
tokenStore.getToken(); // string | null
tokenStore.clearToken(); // ログアウト
const unsubscribe = tokenStore.subscribe(() => rerenderAuthGate());
```

- 既定の保存先は `sessionStorage`（フリート決定 2026-07-14 — ブラウザ再起動をまたいで残らないため XSS の被害半径が限定される）。`localStorage` は使いません。
- 非ブラウザ環境（テスト・SSR）は自動で in-memory にフォールバック。
- ストレージ失敗は fail-closed（読み取りは未ログイン扱い）。
- **token を URL に載せる API は存在しません。**

独自のセッションストアを持つ製品は、`TokenStore` インターフェース（`getToken()` / `clearToken()`）を実装したオブジェクトをそのまま渡せます。

## トランスポート

```ts
import { createNene2Transport } from '@hideyukimori/nene2-client';

const transport = createNene2Transport({
  baseUrl: '', // '' = 同一オリジン相対パス（既定）
  tokenStore,
  onUnauthorized: () => authGate.showLoginInPlace(), // 副作用はアプリ側
  onForbidden: () => router.navigate('/forbidden'),
});
```

### メソッド

| メソッド                           | HTTP                        | 備考                                                                     |
| ---------------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| `get<T>(path, opts?)`              | `GET` JSON                  |                                                                          |
| `post<T>(path, body?, opts?)`      | `POST` JSON                 | body 省略可                                                              |
| `put<T>(path, body?, opts?)`       | `PUT` JSON                  |                                                                          |
| `patch<T>(path, body?, opts?)`     | `PATCH` JSON                |                                                                          |
| `delete<T = void>(path, opts?)`    | `DELETE`                    | 204/空ボディは `undefined` で解決                                        |
| `getBlob(path, opts?)`             | `GET` バイナリ              | → `{ blob, filename }`（`Content-Disposition` からファイル名）           |
| `postBlob(path, body?, opts?)`     | `POST` JSON → バイナリ      | フィルタ付きエクスポート等                                               |
| `upload<T>(path, formData, opts?)` | `POST` multipart            | `Content-Type` は未設定（ブラウザが boundary を付与）                    |
| `postCsv<T>(path, csv, opts?)`     | `POST text/csv`（文字列）   | `opts.contentType` で上書き可                                            |
| `postBytes<T>(path, blob, opts?)`  | `POST text/csv`（生バイト） | 再デコードしない（Shift_JIS 銀行 CSV 安全）。`opts.contentType` 上書き可 |

リクエスト単位のオプション: `signal`・`headers`（認証は上書き不可）・`alsoOkStatuses`（例外を投げずにボディを返す追加ステータス。例: CSV 取込の 422 レポート → `[422]`）。

### 設定

| キー                   | 既定       | 備考                                                   |
| ---------------------- | ---------- | ------------------------------------------------------ |
| `baseUrl`              | `''`       | オリジンまたはインストールベース。末尾スラッシュは除去 |
| `tokenStore`           | —          | 未認証トランスポートでは省略                           |
| `apiKey`               | —          | `X-NENE2-API-Key` として送信                           |
| `headers`              | `{}`       | 固定ヘッダ（例: `X-Organization-Slug`）                |
| `credentials`          | —          | `fetch` へ転送（例: `'include'`）                      |
| `fetch` / `timeoutMs`  | global / — | `createNene2Client` と同じ意味                         |
| `onUnauthorized`       | —          | 認証済みリクエストの 401 時（token 消去後）に発火      |
| `onForbidden`          | —          | すべての 403 で発火                                    |
| `clearTokenOnStatuses` | `[401]`    | 403 でもサインアウトしたい場合は `403` を追加          |

### エラーと 401/403 の意味論

- 非 2xx（`alsoOkStatuses` を除く）は `Nene2ClientError` を throw — `status`・`url`・パース済み `problem`（RFC 9457）・`rateLimit` 付き。**API エラーを HTML のまま表面化させません** — HTML エラーページは `problem: undefined` になり、ページ本文はメッセージに混入しません。
- **token 付きの 401**（セッション失効）: token store を消去（`clearTokenOnStatuses`）してから `onUnauthorized(context)` を呼びます。副作用（その場ログイン・リダイレクト等）はアプリが決めます。
- **token なしの 401**（例: ログインの資格情報エラー）: 何も消去せず、フックも発火しません — エラーはフォームへ届きます。
- **403**: `onForbidden(context)` が発火。token は既定では保持します。
- `context` = `{ status, path, url, tokenAttached, problem }`。

## `createNene2Client` との関係

`createNene2Client` は NENE2 のシステム/サンプルエンドポイント用の型付きクライアントのまま。`createNene2Transport` は製品 API 向けの汎用トランスポートです。エラー型・Problem Details パース・timeout・ネットワークエラーのラップは共通で、v1.1.0 からは両者とも `X-Authorization` ミラーを送ります。

移行ガイド: [製品へのフリートトランスポート導入](../howto/migrate-product-client)。
