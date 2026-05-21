# Current work

Last updated: 2026-05-22 (repository bootstrap)

## Active

- Bootstrap local repo at `../nene2-js` (sibling of `../NENE2`).
- Create GitHub remote `hideyukiMORI/nene2-js` and push `main` when ready.

## Suggested first Issues (create on GitHub)

| Title                                          | Type         | Notes                                |
| ---------------------------------------------- | ------------ | ------------------------------------ |
| Initial governance and scope docs              | `docs`       | Verify links to NENE2 / nene-mcp     |
| Add ESLint + Prettier + Vitest devDependencies | `build`      | Wire `npm run check`                 |
| OpenAPI pin strategy for types                 | `docs` / ADR | Submodule vs copy vs URL fetch       |
| Problem Details type guards                    | `feat`       | `validation-failed`, generic problem |
| Health + ping typed client smoke               | `feat`       | Fixtures + optional live NENE2       |

## Handoff

- Contract source: `../NENE2/docs/openapi/openapi.yaml`
- Do not duplicate MCP server work from `../nene-mcp`
