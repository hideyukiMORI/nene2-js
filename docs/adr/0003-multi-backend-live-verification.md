# ADR 0003 — Multi-Backend Live Verification

**Status:** Accepted  
**Date:** 2026-05-22  
**Issue:** [#11](https://github.com/hideyukiMORI/nene2-js/issues/11)

---

## Context

nene2-js consumes the **NENE2 OpenAPI contract**, not a single PHP deployment. Sibling runtimes implement or aim for that contract:

| Runtime      | Repository   | Role                            |
| ------------ | ------------ | ------------------------------- |
| NENE2 (PHP)  | `NENE2`      | Contract author                 |
| nene2-python | nene2-python | Python port (parity target)     |
| nene2-node   | nene2-node   | Node port (parity, in progress) |

Field trials and optional live tests should verify the **same client** against each reachable base URL.

## Decision

1. **Separate env vars per backend** (no single ambiguous `BASE_URL`):
   - `NENE2_JS_API_BASE_URL` — canonical (PHP)
   - `NENE2_JS_PYTHON_BASE_URL` — parity (Python)
   - `NENE2_JS_NODE_BASE_URL` — parity (Node, when available)

2. **Live matrix tests** in `tests/client/live-smoke-matrix.test.ts`:
   - Skip a backend when its env var is unset (CI stays green with fixtures only).
   - **Canonical:** strict pass for `health()` + `ping()` against OpenAPI shapes.
   - **Parity:** when env is set, same strict checks apply — failures document drift for FT reports and port Issues in the parity repo.

3. **FT reports** include a compatibility table (see `docs/templates/field-trial-report.md`).

4. **Default probe order** for manual runs: NENE2 → nene2-python → nene2-node.

## Consequences

### Positive

- One client proves cross-runtime contract alignment
- Drift is visible early (e.g. missing `service` on `/health`, missing `/examples/ping`)
- nene2-node slots in without client redesign

### Negative / trade-offs

- Local FT requires multiple servers or ports
- Parity failures are expected until ports catch up — must not be misread as client bugs
- No automatic discovery of ports; env must be set explicitly

## Alternatives considered

| Alternative                      | Rejected because                                   |
| -------------------------------- | -------------------------------------------------- |
| Single `BASE_URL` only           | Hides parity verification goal                     |
| Parity probes always pass (soft) | Hides drift; FT would lose evidence                |
| Submodule per backend OpenAPI    | Client has one contract; ports should follow NENE2 |

## References

- `docs/development/field-trials.md`
- `tests/client/live-smoke-matrix.test.ts`
- nene2-python example `/health`: may omit `service` field until aligned
