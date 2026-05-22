---
layout: home

hero:
  name: 'nene2-js'
  text: 'TypeScript-Client für NENE2'
  tagline: OpenAPI-konforme Typen, typisiertes fetch, RFC 9457 Problem Details — Node 22+ und Browser, keine Runtime-Abhängigkeiten.
  actions:
    - theme: brand
      text: Loslegen →
      link: /de/tutorial/getting-started
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/@hideyukimori/nene2-client
    - theme: alt
      text: NENE2 (PHP)
      link: https://hideyukimori.github.io/NENE2/

features:
  - icon: 📦
    title: Auf npm veröffentlicht
    details: '@hideyukimori/nene2-client — strict TypeScript, ESM, npm provenance.'

  - icon: 📄
    title: OpenAPI zuerst
    details: NENE2-Vertrag gepinnt, CI-Prüfung; Codegen synchronisiert Schemas und Guards.

  - icon: 🛡️
    title: Problem Details
    details: RFC 9457 parsen, validation-failed, Feldfehler.

  - icon: ⚡
    title: Native fetch
    details: Kein axios — fetch injizieren, AbortSignal, optional degraded health.

  - icon: 🔗
    title: Ökosystem
    details: Kein Node-Port von NENE2 — PHP-Laufzeit und MCP in separaten Repos.

  - icon: 🔬
    title: Field Trials
    details: Automatisierte Szenarien und ADR-Reibungszyklus für DX.
---
