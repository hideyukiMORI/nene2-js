# Current work

Last updated: 2026-08-04 (JST)

## Active

- [ ] [#122](https://github.com/hideyukiMORI/nene2-js/issues/122) — release. **1.3.0 published 2026-08-05** (A-3 opt-out alone, owner ruling (a)) from `release/1.3.0` — cut before `./testing` landed, so it does **not** contain `./testing`; branch kept as `archive/1.3.0-release-branch`. Remaining: **1.4.0 = `./testing`** from `main` (release PR open; publish is the owner's seam).
- [ ] [#106](https://github.com/hideyukiMORI/nene2-js/issues/106) — transport: relative `baseUrl` is concatenated, not resolved — breaks under Node/jsdom.
- [ ] [#105](https://github.com/hideyukiMORI/nene2-js/issues/105) — transport: `fetch` is bound at construction, so a global swap (msw) is not picked up. Shapes the `./testing` deps: the contract takes a product's _wiring_, not a built client, because a built client can no longer be observed.
- [ ] [#104](https://github.com/hideyukiMORI/nene2-js/issues/104) — shared ESLint config: distribute the no-raw-`fetch` rule (phase 2 stage 3, follows #102).

## Completed (recent)

- [x] [#123](https://github.com/hideyukiMORI/nene2-js/issues/123) / [PR #124](https://github.com/hideyukiMORI/nene2-js/pull/124) — testing: `./testing` ships the transport contract (fleet phase 2 **P2-2**; design of record [fleet #232](https://github.com/hideyukiMORI/nene2-fleet-tooling/issues/232)). L-a helpers + L-b `runTransportContract`, 12 required cases, empty-run guard with AU-2 exemptions, every case proven red against a broken wiring. **Publish is the remaining step — see #122.**
- [x] [#125](https://github.com/hideyukiMORI/nene2-js/issues/125) / [PR #126](https://github.com/hideyukiMORI/nene2-js/pull/126) — testing: `surface` declaration makes the adapter seam mandatory. Measured: without it, **C1-2 / C3-9 / C4-11 / C4-12** (+ optional C5-13) stayed green against a deliberately broken adapter. Landed before publish — afterwards it would have been a breaking change.
- [x] [#121](https://github.com/hideyukiMORI/nene2-js/issues/121) — chore: governance-doc sync after 1.2.0 + retirement of merged remote branches (7 retired behind `archive/*` tags; `test/42-ft-marathon-500` kept for reference).
- [x] [#109](https://github.com/hideyukiMORI/nene2-js/issues/109) — docs: `howto/migrate-product-client` (W2b). Shipped by [#110](https://github.com/hideyukiMORI/nene2-js/pull/110) → [#111](https://github.com/hideyukiMORI/nene2-js/pull/111) (invoice review folded in) → [#114](https://github.com/hideyukiMORI/nene2-js/pull/114) (per-mode promotion gate). Closed 2026-08-04 after checking each acceptance item against `main`.
- [x] [#119](https://github.com/hideyukiMORI/nene2-js/issues/119) / [#120](https://github.com/hideyukiMORI/nene2-js/pull/120) — `mirrorAuthorizationHeader` opt-out (audit A-3); [#117](https://github.com/hideyukiMORI/nene2-js/issues/117) / [#118](https://github.com/hideyukiMORI/nene2-js/pull/118) — README/SECURITY **Transport headers**. Merged 2026-07-18, **not yet published** — see #122.
- [x] [#115](https://github.com/hideyukiMORI/nene2-js/issues/115) / [#116](https://github.com/hideyukiMORI/nene2-js/pull/116) — fleet `docs/daily/` convention + 07-17 / 07-18 reports
- [x] [#112](https://github.com/hideyukiMORI/nene2-js/issues/112) / [#113](https://github.com/hideyukiMORI/nene2-js/pull/113) — npm **1.2.0** (`recoverAuth` seam; W2b unblock)
- [x] [#107](https://github.com/hideyukiMORI/nene2-js/issues/107) — transport: opt-in `recoverAuth` seam (silent-refresh + single replay on 401) — [ADR 0008](../adr/0008-recover-auth-seam.md) Accepted; merged [#108](https://github.com/hideyukiMORI/nene2-js/pull/108). Opt-in (default `undefined` = unchanged); promotion to the fleet default is gated on W2b completion **and** the `_work/issues.md #38` path-mode cookie-`Path` root fix.
- [x] [#102](https://github.com/hideyukiMORI/nene2-js/issues/102) — fleet-standard frontend transport (`createNene2Transport` + `createSessionTokenStore`, X-Authorization mirror, 401/403 hooks) — published as **1.1.0**
- [x] [#100](https://github.com/hideyukiMORI/nene2-js/issues/100) — 全ロケール doc 鮮度監査（de/fr/zh/pt-br getting-started、maintainer docs）
- [x] [#99](https://github.com/hideyukiMORI/nene2-js/pull/99) — README consumer vs contributor install; en/ja getting-started `@^1.0.0`
- [x] [#98](https://github.com/hideyukiMORI/nene2-js/pull/98) — SECURITY 1.x, README badge, roadmap/releases links
- [x] [#97](https://github.com/hideyukiMORI/nene2-js/pull/97) — git tag `vX.Y.Z` + GitHub Release on publish; retroactive [`v1.0.0`](https://github.com/hideyukiMORI/nene2-js/releases/tag/v1.0.0)
- [x] [#84](https://github.com/hideyukiMORI/nene2-js/issues/84) — npm **1.0.0** (roadmap criteria 1–5); nene2-js-FT FT35 matrix green
- [x] [#86](https://github.com/hideyukiMORI/nene2-js/issues/86) / [#88](https://github.com/hideyukiMORI/nene2-js/pull/88) · [#89](https://github.com/hideyukiMORI/nene2-js/pull/89) · [#90](https://github.com/hideyukiMORI/nene2-js/pull/90) — guard codegen epic + VitePress 全ロケール
- [x] [#82](https://github.com/hideyukiMORI/nene2-js/issues/82) / [#83](https://github.com/hideyukiMORI/nene2-js/pull/83) — docs FT31–34 / 0.1.4 sync

- [x] [#77](https://github.com/hideyukiMORI/nene2-js/issues/77) / [#78](https://github.com/hideyukiMORI/nene2-js/pull/78) — npm **0.1.3** (`OpenApiPaths`, pack smoke)
- [x] [#79](https://github.com/hideyukiMORI/nene2-js/issues/79) — network wrap + `timeoutMs` (in 0.1.3)
- [x] [#80](https://github.com/hideyukiMORI/nene2-js/issues/80) / [#81](https://github.com/hideyukiMORI/nene2-js/pull/81) — npm **0.1.4** (`error.rateLimit`, `parseRateLimitHeaders`)
- [x] nene2-js-FT FT31–34 @0.1.3–0.1.4 (`../nene2-js-FT/`) — zero friction

## Completed

- [x] Phase 1 — contract baseline, FT1–129
- [x] Phase 2 — npm `0.1.0`, Trusted Publisher
- [x] [#37](https://github.com/hideyukiMORI/nene2-js/issues/37) Phase 3 — codegen + types migration
- [x] [#45](https://github.com/hideyukiMORI/nene2-js/issues/45) / PR [#47](https://github.com/hideyukiMORI/nene2-js/pull/47) — FT130–229 docs onboarding
- [x] [#46](https://github.com/hideyukiMORI/nene2-js/issues/46) — `health({ strictService: true })` — npm **0.1.2**
- [x] [#42](https://github.com/hideyukiMORI/nene2-js/issues/42) / PR [#52](https://github.com/hideyukiMORI/nene2-js/pull/52) — FT marathon **500** (FT30–529)
- [x] [nene2-python#578](https://github.com/hideyukiMORI/nene2-python/issues/578) / [#579](https://github.com/hideyukiMORI/nene2-python/pull/579) — `/examples/*` API path parity
- [x] nene2-js-FT FT1–2 live (`../nene2-js-FT/`) — NENE2 + python evac
- [x] PR [#54](https://github.com/hideyukiMORI/nene2-js/pull/54) VitePress locales · [#55](https://github.com/hideyukiMORI/nene2-js/pull/55) verify:backends
- [x] [#59](https://github.com/hideyukiMORI/nene2-js/issues/59) / PR [#60](https://github.com/hideyukiMORI/nene2-js/pull/60) — locale `strictService` + `install-nene2-python`
- [x] nene2-js-FT FT3 dual-backend smoke (`../nene2-js-FT/docs/field-trials/2026-05-field-trial-3.md`)
- [x] [#62](https://github.com/hideyukiMORI/nene2-js/issues/62) / PR [#63](https://github.com/hideyukiMORI/nene2-js/pull/63) — matrix `listTags` + consumer sandbox doc
- [x] nene2-js-FT FT4–6 consumer apps (`../nene2-js-FT/`) — tags, health-board, protected-smoke
- [x] [nene2-python#582](https://github.com/hideyukiMORI/nene2-python/issues/582) / [#583](https://github.com/hideyukiMORI/nene2-python/pull/583) — `GET /`, `/machine/health`
- [x] [#65](https://github.com/hideyukiMORI/nene2-js/issues/65) / [#66](https://github.com/hideyukiMORI/nene2-js/pull/66) — `verify:backends` framework + machine health
- [x] [nene2-python#586](https://github.com/hideyukiMORI/nene2-python/issues/586) / [#587](https://github.com/hideyukiMORI/nene2-python/pull/587) — `/examples/protected` JWT
- [x] nene2-js-FT FT7 python protected parity
- [x] Phase 3 exit — `OpenApiPaths` export; [ft-friction-registry.md](development/ft-friction-registry.md)
- [x] [#72](https://github.com/hideyukiMORI/nene2-js/issues/72) / [#73](https://github.com/hideyukiMORI/nene2-js/issues/73) — Issue-first policy + live notes CRUD matrix
- [x] nene2-js-FT FT8–10 (notes/tags editor, degraded probe) — zero friction
- [x] nene2-js-FT FT11 pagination probe — zero friction
- [x] nene2-js-FT FT12 ops-dashboard (complex UI) — [#588](https://github.com/hideyukiMORI/nene2-python/issues/588) / [#589](https://github.com/hideyukiMORI/nene2-python/pull/589)
- [x] nene2-js-FT FT13 crud-workbench (master-detail UI) — zero friction
- [x] nene2-js-FT FT14 friction-probe — agent python :28000; wrong port / auth / 422 / pagination
- [x] nene2-js-FT FT15–17 race-dashboard, error-lab, auth-console — zero friction
- [x] nene2-js-FT FT18 dual-workbench (notes+tags split) — zero friction
- [x] nene2-js-FT FT19–22 health-toggles, tombstone, cancel-lab, system-console — zero friction
- [x] nene2-js-FT FT23 smoke matrix — [#592](https://github.com/hideyukiMORI/nene2-python/issues/592) 429 on burst
- [x] nene2-js-FT FT24–26 query-lab, types-smoke, #592 fixed ([#593](https://github.com/hideyukiMORI/nene2-python/pull/593))
- [x] nene2-js-FT FT27 tag-crud-lab — zero friction
- [x] nene2-js-FT FT28 full smoke matrix (22 apps × 2 backends)
- [x] nene2-js-FT FT29 config-lab — zero friction
- [x] nene2-js-FT FT30 npm 0.1.3 pack smoke — [PR #78](https://github.com/hideyukiMORI/nene2-js/pull/78)

## Handoff

```bash
npm install @hideyukimori/nene2-client@^1.0.0
npm run test:ft-marathon          # 502 tests
npm run verify:backends           # needs :18080 + :18000
export NENE2_JS_API_BASE_URL=http://localhost:18080
npm test -- tests/client/live-smoke-matrix.test.ts
```
