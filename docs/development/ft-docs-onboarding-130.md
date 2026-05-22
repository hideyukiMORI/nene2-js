# FT130–229 — Docs-driven onboarding (Issue #45)

Blank-slate personas read [ja docs](https://hideyukimori.github.io/nene2-js/ja/), alternate NENE2 / nene2-python install paths, then use `@hideyukimori/nene2-client`.

## Run

```bash
npm run test:ft-marathon   # 202 tests (FT30–229)
npm run ft:reports         # regenerate docs/field-trials (NENE2 / nene2-python granularity)
npm run format:fix -- "docs/field-trials/**/*.md"  # required after ft:reports
npm run ft:marathon        # tests + reports
```

Reports: `tools/ft-marathon/build-report-markdown.mjs` → ~177 lines each (6 DX personas, friction, observations). App sandbox: local `../nene2-js-FT/` only (no GitHub repo).

## Friction found → Issues

| F-n    | Severity | Owner    | Issue                                                     | Resolution                                                                                                        |
| ------ | -------- | -------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| F-45-1 | medium   | nene2-js | [#46](https://github.com/hideyukiMORI/nene2-js/issues/46) | `health({ strictService: true })` rejects `service !== "NENE2"`; default remains permissive for shape-only checks |
| F-45-2 | medium   | docs     | #45 PR                                                    | ja lacked server install before npm client → `install-nene2`, `install-nene2-python`, `blank-slate-journey`       |
| F-45-3 | low      | docs     | #45 PR                                                    | `live-smoke` ja missing `NENE2_JS_PYTHON_BASE_URL` → added                                                        |

## Personas (6)

`ts_app`, `py_dev`, `php_dev`, `devops`, `ai_agent`, `founder`

## Stack orders (4)

`nene2_first`, `python_first`, `alt_ports`, `client_only`
