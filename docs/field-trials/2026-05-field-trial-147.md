# FT147: problem HTTP 429 on createNote

**Date**: 2026-05-22  
**Issues / PRs**: [#42](https://github.com/hideyukiMORI/nene2-js/issues/42) (marathon 500)

---

## Theme

problem HTTP 429 on createNote (`bulk_err_429_create`, fixture).

## What was exercised

`npm run test:ft-marathon` — category `errors-bulk`.

## DX Review

### Persona A — TypeScript app developer

POST failure 429 **Risk:** low

### Persona B — New to NENE2

Persona B: marathon bulk regression. **Risk:** low

## Friction points

No actionable friction — automated scenario passed.

## Follow-up Issues

| Repo                  | Issue | Status |
| --------------------- | ----- | ------ |
| hideyukiMORI/nene2-js | #42   | merged |

**FT completion:** done
