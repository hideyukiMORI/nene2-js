# FT278: deleteNote id=2147483646

**Date**: 2026-05-22  
**Issues / PRs**: [#42](https://github.com/hideyukiMORI/nene2-js/issues/42) (marathon 500)

---

## Theme

deleteNote id=2147483646 (`bulk_notes_del_2147483646`, fixture).

## What was exercised

`npm run test:ft-marathon` — category `notes-bulk`.

## DX Review

### Persona A — TypeScript app developer

DELETE path id **Risk:** low

### Persona B — New to NENE2

Persona B: marathon bulk regression. **Risk:** low

## Friction points

No actionable friction — automated scenario passed.

## Follow-up Issues

| Repo                  | Issue | Status |
| --------------------- | ----- | ------ |
| hideyukiMORI/nene2-js | #42   | merged |

**FT completion:** done
