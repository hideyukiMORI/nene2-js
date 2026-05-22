# Field trials index

Client-library field trials for [nene2-js](https://github.com/hideyukiMORI/nene2-js).  
Methodology: `docs/development/field-trials.md` · Template: `docs/templates/field-trial-report.md` · Friction cycle: [ADR 0004](../adr/0004-field-trial-friction-resolution-cycle.md)

| FT  | Report                                               | Theme                                              | Status | Friction  |
| --- | ---------------------------------------------------- | -------------------------------------------------- | ------ | --------- |
| 1   | [2026-05-field-trial-1.md](2026-05-field-trial-1.md) | OpenAPI pin + Problem Details (Phase 1 baseline)   | done   | in report |
| 2   | [2026-05-field-trial-2.md](2026-05-field-trial-2.md) | `createNene2Client` health / ping                  | done   | in report |
| 3   | [2026-05-field-trial-3.md](2026-05-field-trial-3.md) | Example notes + degraded health opt-in             | done   | #16 #17   |
| 4   | [2026-05-field-trial-4.md](2026-05-field-trial-4.md) | `getProtected` + bearer forwarding                 | done   | #19       |
| 5   | [2026-05-field-trial-5.md](2026-05-field-trial-5.md) | `updateNote` / `deleteNote` + evac-port live smoke | done   | #21       |
| 6   | [2026-05-field-trial-6.md](2026-05-field-trial-6.md) | Example tags CRUD                                  | done   | #23       |
| 7   | [2026-05-field-trial-7.md](2026-05-field-trial-7.md) | Live JWT `getProtected` on evac port               | done   | #25       |
| 8   | [2026-05-field-trial-8.md](2026-05-field-trial-8.md) | Live notes CRUD on evac port                       | done   | #26       |
| 9   | [2026-05-field-trial-9.md](2026-05-field-trial-9.md) | Live tags CRUD on evac port                        | done   | #27       |

**`done`** = friction resolution cycle complete (Issues merged or explicitly deferred). See [field-trials.md § Friction resolution cycle](../development/field-trials.md#friction-resolution-cycle-mandatory).
