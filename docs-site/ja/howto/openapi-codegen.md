# OpenAPI 同期と codegen

コントリビューターは NENE2 OpenAPI をピン留めし TypeScript 型を再生成します。

```bash
npm run contracts:sync
npm run codegen
npm run codegen:check   # npm run check に含まれる
```

## NENE2 更新時

1. NENE2 で OpenAPI 変更とタグ付け
2. nene2-js で Issue 作成
3. sync → codegen → check
4. クライアント表面が変われば PR

codegen は **型のみ**（ADR 0006）。`createNene2Client` は手維持です。
