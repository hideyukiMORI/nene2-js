---
layout: home

hero:
  name: 'nene2-js'
  text: 'NENE2 TypeScript 客户端'
  tagline: OpenAPI 对齐类型、类型化 fetch、RFC 9457 Problem Details — Node 22+ 与浏览器，零运行时依赖。
  actions:
    - theme: brand
      text: 开始 →
      link: /zh/tutorial/getting-started
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/@hideyukimori/nene2-client
    - theme: alt
      text: NENE2 (PHP)
      link: https://hideyukimori.github.io/NENE2/

features:
  - icon: 📦
    title: npm 发布
    details: '@hideyukimori/nene2-client — 严格 TypeScript、ESM、npm provenance。'

  - icon: 📄
    title: OpenAPI 优先
    details: 固定 NENE2 契约，CI 校验，codegen 同步 schema。

  - icon: 🛡️
    title: Problem Details
    details: 解析 RFC 9457，validation-failed，字段级错误。

  - icon: ⚡
    title: 原生 fetch
    details: 无 axios，可注入 fetch、AbortSignal、可选 degraded health。

  - icon: 🔗
    title: 生态
    details: 非 NENE2 的 Node 移植 — PHP 运行时与 MCP 独立仓库。

  - icon: 🔬
    title: 现场试验
    details: 自动化场景与 ADR 摩擦循环改进 DX。
---
