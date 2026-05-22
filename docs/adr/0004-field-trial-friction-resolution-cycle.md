# ADR 0004 — Field Trial Friction Resolution Cycle

**Status:** Accepted  
**Date:** 2026-05-22  
**Issue:** [#13](https://github.com/hideyukiMORI/nene2-js/issues/13)

---

## Context

Field trials exist to surface **observed** friction, not to stack unlimited FT reports. Without a fixed cycle, reports accumulate F-1…F-n while the next FT starts anyway, and drift between client, OpenAPI, and parity servers stays unresolved.

nene2-python documents a similar loop (fix in FT PR when possible). nene2-js spans **multiple repositories** (client + NENE2 + parity ports), so routing must be explicit.

## Decision

### Mandatory cycle (per field trial)

```text
Run FT → Record friction in report (F-1, F-2, …)
    → Open GitHub Issue(s) in the correct repo for each actionable F-n
    → Implement fix via PR (same repo as Issue)
    → Re-run probes / npm run check; update FT report with Issue + PR links
    → Close Issues when merged
    → Only then mark FT "done" in INDEX and start the next FT number
```

**Do not start FT(N+1)** while any **open** friction Issue from FT(N) remains, unless the FT report records an explicit **defer** with reason and follow-up Issue (contract change waiting on NENE2 release, etc.).

### Where to file Issues and PRs

| Friction owner          | Examples                                         | Issue / PR repository                                                                           |
| ----------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **OpenAPI contract**    | New public shape, wrong status code in spec      | [NENE2](https://github.com/hideyukiMORI/NENE2) first → then `nene2-js` `npm run contracts:sync` |
| **nene2-js client**     | Parser gap, `createNene2Client` DX, wrong guard  | [nene2-js](https://github.com/hideyukiMORI/nene2-js)                                            |
| **NENE2 PHP runtime**   | Handler/middleware bug vs documented OpenAPI     | [NENE2](https://github.com/hideyukiMORI/NENE2)                                                  |
| **nene2-python parity** | `/health` missing `service`, no `/examples/ping` | [nene2-python](https://github.com/hideyukiMORI/nene2-python)                                    |
| **nene2-node parity**   | Node port drift vs OpenAPI                       | [nene2-node](https://github.com/hideyukiMORI/nene2-node)                                        |
| **Documentation only**  | README/FT typo in this repo                      | nene2-js (no code)                                                                              |

When unsure: **OpenAPI wins** — if the server matches `contracts/openapi.yaml`, fix the client; if the server diverges from OpenAPI, fix the server (or NENE2 contract first).

### FT report requirements

Each friction `F-n` must include:

- **Owner** (table above)
- **GitHub Issue** link(s) in the owning repo
- **PR** link(s) when opened/merged
- **Status:** open / merged / deferred

The report **Follow-up Issues** table and [INDEX](../field-trials/INDEX.md) status stay in sync.

### What not to do

- Weaken client type guards to hide parity server drift
- Close an FT friction Issue without merge or documented defer
- Mix unrelated refactors into a friction-fix PR
- Open duplicate Issues in nene2-js for bugs that belong in nene2-python

## Consequences

### Positive

- Clear handoff between FT numbers
- Server parity improves without polluting client scope
- AI agents and humans follow the same loop

### Negative / trade-offs

- A single FT may span multiple repos and PRs (slower but honest)
- Blocked next FT until fixes land — intentional

## References

- Process detail: `docs/development/field-trials.md` § Friction resolution cycle
- Template: `docs/templates/field-trial-report.md`
- Multi-backend probes: ADR 0003
