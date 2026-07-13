# 製品へのフリートトランスポート導入

> **v1.1.0** で追加（[#102](https://github.com/hideyukiMORI/nene2-js/issues/102)）。当面は英語・日本語のみ。他ロケールは後続で対応します。

目的: 手書きの `frontend/src/**/client.ts` を、**呼び出し側に触れずに** `createNene2Transport` へ置き換える。製品の既存 `apiClient` 表面は **thin adapter** として維持し、adopt PR を最小差分に保ちます。

## thin adapter パターン

```ts
// frontend/src/shared/api/client.ts — 移行後
import { createNene2Transport, createSessionTokenStore } from '@hideyukimori/nene2-client';

export const tokenStore = createSessionTokenStore({ key: 'nene_myproduct_token' });

const transport = createNene2Transport({
  baseUrl: '', // または製品の apiBasePath / env.apiBaseUrl
  tokenStore,
  onUnauthorized: () => {
    /* アプリ側副作用: その場ログイン・失効通知など */
  },
  onForbidden: () => {
    /* アプリ側副作用: /forbidden へのリダイレクトなど */
  },
});

// 既存の製品表面をそのまま維持:
export const apiClient = {
  get: <T>(path: string) => transport.get<T>(path),
  post: <T>(path: string, body?: unknown) => transport.post<T>(path, body),
  put: <T>(path: string, body?: unknown) => transport.put<T>(path, body),
  patch: <T>(path: string, body?: unknown) => transport.patch<T>(path, body),
  delete: <T = void>(path: string) => transport.delete<T>(path),
  getBlob: (path: string) => transport.getBlob(path),
  upload: <T>(path: string, form: FormData) => transport.upload<T>(path, form),
} as const;
```

これらすべての経路について、パッケージが保証するもの（`tests/transport/` の UT が正本）:

- 全 verb・全経路（JSON / blob / multipart / CSV / bytes）で `Authorization` **と** `X-Authorization` ミラー — 呼び出し側は落とせない。
- token は `sessionStorage` のみ（非ブラウザは in-memory フォールバック）。認証済みリクエストの 401 とログアウト（`clearToken`）で消去。
- token が URL に載ることはない。
- エラーは RFC 9457 Problem Details → `Nene2ClientError`。HTML のまま表面化しない。

## 写像表（参照 4 製品の実物から）

### nene-vault（`frontend/src/shared/api/client.ts`）

| 既存表面                                             | トランスポート呼び出し                             | 備考                                                   |
| ---------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| `apiClient.get(p, signal)`                           | `transport.get(p, { signal })`                     |                                                        |
| `apiClient.post/patch`                               | `transport.post/patch(p, body)`                    |                                                        |
| `apiClient.delete`                                   | `transport.delete(p)`                              |                                                        |
| `apiClient.upload`                                   | `transport.upload(p, formData)`                    | boundary の扱いも同一（`Content-Type` 手動設定なし）   |
| `apiClient.postBlob`                                 | `transport.postBlob(p, body)`                      | `BlobDownload { blob, filename }` の形も一致           |
| `apiClient.getBlob`                                  | `(await transport.getBlob(p, { signal })).blob`    |                                                        |
| `credentials: 'include'`                             | `createNene2Transport({ credentials: 'include' })` |                                                        |
| 401 → `authStore.clearSession()`・403 → `/forbidden` | `authStore` を `TokenStore` に適合＋`onForbidden`  | Vault はセッションオブジェクトを保持したまま適合できる |

Vault はセッション**オブジェクト**を保存しているため、`{ getToken: () => authStore.getToken(), clearToken: () => authStore.clearSession() }` で適合させます。

### nene-clear（`frontend/src/api/client.ts`）

| 既存表面                                                        | トランスポート呼び出し                                 | 備考                                                   |
| --------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `api.get/post/put/delete`                                       | `transport.get/post/put/delete`                        |                                                        |
| `apiFetch(path, init)`（multipart/バイナリ用の逃げ道）          | `transport.upload` / `transport.getBlob`               | 逃げ道自体が不要に — ミラーは構造で保証                |
| `storeToken/clearToken`（`sessionStorage`・`nene_clear_token`） | `createSessionTokenStore({ key: 'nene_clear_token' })` | 同じ key・同じ保存先 — デプロイで再ログイン不要        |
| `subscribeAuthChange`                                           | `tokenStore.subscribe`                                 |                                                        |
| 401（ログイン以外）→ `clearToken()`                             | 内蔵（token 付きリクエストのみ）                       | ログイン 401 は資格情報エラーとして素通し — これも内蔵 |
| JWT デコード補助（`isAuthenticated`・`getUserRole`）            | アプリ側に残す                                         | トランスポートのスコープ外                             |

### nene-deal（`frontend/src/shared/auth/auth-headers.ts` ＋ api client）

| 既存表面                                     | トランスポート呼び出し                                                                          | 備考 |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---- |
| `buildAuthHeaders()`（#83 チョークポイント） | トランスポートに内蔵（同じ設計をパッケージ化）                                                  |      |
| `X-Organization-Slug` / `X-NENE2-API-Key`    | `createNene2Transport({ headers: { 'X-Organization-Slug': env.orgSlug }, apiKey: env.apiKey })` |      |
| JSON クライアント＋CSV ダウンロード          | `transport.get/post/…` ＋ `transport.getBlob`                                                   |      |

### nene-invoice（`frontend/src/shared/api/client.ts`）

| 既存表面                                             | トランスポート呼び出し                                    | 備考                                 |
| ---------------------------------------------------- | --------------------------------------------------------- | ------------------------------------ |
| `apiClient.get/post/put/patch/delete`                | `transport.get/post/put/patch/delete`                     |                                      |
| `apiClient.postCsv`                                  | `transport.postCsv(p, csv, { alsoOkStatuses: [422] })`    | 200/422 とも取込レポートで解決       |
| `apiClient.postBytes`                                | `transport.postBytes(p, blob, { alsoOkStatuses: [422] })` | 生バイト非加工（Shift_JIS 銀行 CSV） |
| `apiClient.getBlob`                                  | `(await transport.getBlob(p)).blob`                       |                                      |
| `apiUrl()` インストールベース（ADR 0015）            | `createNene2Transport({ baseUrl: apiBasePath })`          |                                      |
| in-memory token ＋サイレントリフレッシュ（ADR 0014） | **アプリ側に残る**                                        | 下記の正直な制約を参照               |

**正直な制約 — invoice のサイレントリフレッシュ再試行:** トランスポートは invoice の「401 → `/auth/refresh` → リプレイ」ループ（ADR 0014・cookie＋CSRF）を実装していません。invoice の adapter はこのループをトランスポート呼び出しの外側に残すか、先にフリート標準の sessionStorage store へ移行するかのどちらかです。これは製品側の判断であり、パッケージが勝手に決めるべきものではありません。

## 独自 token store の適合

```ts
import type { TokenStore } from '@hideyukimori/nene2-client';

const vaultTokenStore: TokenStore = {
  getToken: () => authStore.getToken(),
  clearToken: () => authStore.clearSession(),
};
```

## アプリ側に残るもの

- リダイレクト・その場ログイン描画・「セッション失効」通知 → `onUnauthorized` / `onForbidden` コールバック。
- ドメインエラーへの写像（`Nene2ClientError` → 製品 `AppError` など）→ thin adapter 内。
- UI ゲーティング用の JWT クレームデコード・リフレッシュトークンフロー・CSRF cookie ペアリング。
- 生 `fetch()` 禁止の ESLint（vault #118/#173・clear #265/#312 型）— 共有 config の配布は別 issue。
