# FT[N]: [Theme]

**Date**: YYYY-MM-DD  
**NENE2 pin**: `contracts/nene2-openapi-pin.json` → `nene2GitRef`  
**Package**: `@hideyukimori/nene2-client` @ `0.x.x` (or commit SHA)  
**Issues / PRs**: #NNN

---

## Theme

One paragraph: what consumer workflow was exercised.

## What was exercised

| Item               | Notes                                                  |
| ------------------ | ------------------------------------------------------ |
| Commands           | `npm run check`, `contracts:sync`, live fetch, etc.    |
| APIs / modules     | e.g. `parseProblemDetails`, `createNene2Client.health` |
| OpenAPI operations | e.g. `getHealth`, `getFrameworkSmoke`                  |
| Sandbox            | `tests/fixtures/`, `examples/…`, or live NENE2         |

```text
(paste exact commands; no secrets)
```

## Backend compatibility (when live smoke was run)

| Backend      | URL (safe to publish) | health      | ping        | Notes     |
| ------------ | --------------------- | ----------- | ----------- | --------- |
| NENE2 (PHP)  |                       | ok/fail     | ok/fail     | canonical |
| nene2-python |                       | ok/fail     | ok/fail     | parity    |
| nene2-node   |                       | ok/fail/n/a | ok/fail/n/a | parity    |

## Outcomes

**Worked well:**

- **Still manual / missing:**

-

## Friction points

<!-- Zero friction: state explicitly and skip F-N sections. -->

### F-1: [Title] (severity: high / medium / low)

**What happened:**  
**Why:**  
**Follow-up:** Issue #NNN / doc / ADR / wontfix

---

## DX Review

### Persona A — TypeScript app developer (primary)

React/Vue/Next experience; consumes NENE2 from the browser or a small Node script. Cares about typed responses, Problem Details → form errors, and bundle size.

**Documentation:**  
**Error handling:**  
**Friction felt:**  
**Risk:** high / medium / low

### Persona B — New to NENE2 (secondary, short)

First time pinning OpenAPI or using RFC 9457 from a PHP-backed API.

**Onboarding:**  
**One surprise:**  
**Risk:** high / medium / low

---

## Follow-up Issues

| Issue | Summary |
| ----- | ------- |
| #NNN  | …       |

---

## Reminder

No secrets, API keys, or private client data in this report.
