# createNene2Client API

`createNene2Client(config)` → `Nene2Client`。

## システム

`frameworkSmoke`, `health({ allowDegraded?, strictService? })`, `machineHealth`, `ping`, `smoke`

## 例: notes / tags

`listNotes`, `getNote`, `createNote`, `updateNote`, `deleteNote` — tags も同様。

## 保護ルート

`getProtected()` — Bearer JWT 必須。

失敗時は `Nene2ClientError`。成功時はエクスポートされた型ガードで JSON を検証します。
