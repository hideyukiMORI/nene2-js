---
layout: home

hero:
  name: 'nene2-js'
  text: 'NENE2 向け TypeScript クライアント'
  tagline: OpenAPI 整合の型、型付き fetch、RFC 9457 Problem Details — Node 22+ とブラウザ、ランタイム依存ゼロ。
  actions:
    - theme: brand
      text: はじめる →
      link: /ja/tutorial/getting-started
    - theme: alt
      text: npm パッケージ
      link: https://www.npmjs.com/package/@hideyukimori/nene2-client
    - theme: alt
      text: NENE2 (PHP)
      link: https://hideyukimori.github.io/NENE2/

features:
  - icon: 📦
    title: npm 公開済み
    details: '@hideyukimori/nene2-client — strict TypeScript、ESM、sideEffects false、リリース時 npm provenance。'

  - icon: 📄
    title: OpenAPI ファースト
    details: NENE2 契約をピン留めし CI で検証。codegen で schemas とガードを同期。

  - icon: 🛡️
    title: Problem Details 内蔵
    details: application/problem+json のパース、validation-failed の絞り込み — PHP フレームワークと同じ RFC 9457。

  - icon: ⚡
    title: ネイティブ fetch
    details: axios 不要。テスト用 fetch 注入、AbortSignal、503 degraded のオプトイン。

  - icon: 🔗
    title: エコシステム対応
    details: NENE2 の Node 移植ではない。PHP は NENE2、MCP は nene-mcp、parity は nene2-python 等。

  - icon: 🔬
    title: フィールドトライアル駆動
    details: 大量の自動シナリオと ADR 摩擦サイクル — DX 改善は Issue/PR で明示的に。
---
