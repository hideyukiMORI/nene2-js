---
layout: home

hero:
  name: 'nene2-js'
  text: 'Client TypeScript pour NENE2'
  tagline: Types alignés OpenAPI, fetch typé, Problem Details RFC 9457 — Node 22+ et navigateurs, zéro dépendance runtime.
  actions:
    - theme: brand
      text: Commencer →
      link: /fr/tutorial/getting-started
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/@hideyukimori/nene2-client
    - theme: alt
      text: NENE2 (PHP)
      link: https://hideyukimori.github.io/NENE2/

features:
  - icon: 📦
    title: Publié sur npm
    details: '@hideyukimori/nene2-client — TypeScript strict, ESM, provenance npm.'

  - icon: 📄
    title: OpenAPI d'abord
    details: Contrat NENE2 épinglé, vérifié en CI ; codegen aligne schémas et guards.

  - icon: 🛡️
    title: Problem Details
    details: Parse RFC 9457, validation-failed, erreurs par champ.

  - icon: ⚡
    title: fetch natif
    details: Pas d'axios — injection fetch, AbortSignal, health degraded optionnel.

  - icon: 🔗
    title: Écosystème
    details: Pas un port Node de NENE2 — runtime PHP, MCP, parity Python/Node séparés.

  - icon: 🔬
    title: Field trials
    details: Scénarios automatisés et cycle de friction ADR pour la DX.
---
