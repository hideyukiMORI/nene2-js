# OpenAPI 同步与 codegen

贡献者固定 NENE2 OpenAPI，并重新生成 TypeScript **类型**与 **runtime guard**。

## 目录布局

```text
../NENE2/docs/openapi/openapi.yaml   # 契约源
../nene2-js/contracts/openapi.yaml   # CI 用固定副本
```

## 命令

```bash
npm run contracts:sync      # 更新 pin + contracts/openapi.yaml
npm run codegen             # src/generated/openapi.ts（类型）
npm run codegen:check       # 类型 drift 检查（含于 npm run check）
npm run codegen:guards      # src/generated/guards.ts（校验器）
npm run codegen:guards:check
```

## NENE2 更新工作流

1. NENE2 合并 OpenAPI 变更并打 release tag
2. 在 **nene2-js** 开 Issue
3. `contracts:sync` → `codegen` → `codegen:guards` → `npm run check`
4. 若公开 client 表面变化，PR 更新 types / guards

codegen 分 **类型**（`codegen`，ADR 0006）与 **guard**（`codegen:guards`，ADR 0007）。`createNene2Client` 与 `src/problem/guards.ts` 仍为手写维护。

## Pin 文件

`contracts/nene2-openapi-pin.json` 记录 git ref、OpenAPI info version 与 YAML 的 SHA-256。`syncedFrom` 仅使用相对 sibling 路径。
