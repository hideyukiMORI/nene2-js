# Contributing

nene2-js is built through small, Issue-driven changes. This document is the shared entry point for humans and AI agents.

## Required reading

| Topic               | Document                                     |
| ------------------- | -------------------------------------------- |
| Scope (do / do not) | `docs/scope.md`                              |
| Workflow            | `docs/workflow.md`                           |
| Commit messages     | `docs/development/commit-conventions.md`     |
| Coding standards    | `docs/development/coding-standards.md`       |
| AI tools            | `docs/integrations/ai-tools.md`              |
| Field trials        | `docs/development/field-trials.md`           |
| NENE2 relationship  | `docs/integrations/relationship-to-nene2.md` |
| Roadmap             | `docs/roadmap.md`                            |
| Current work        | `docs/todo/current.md`                       |

## Collaboration policy

- Start work from a GitHub Issue.
- Use one branch and one PR per focused work unit.
- Keep `docs/roadmap.md`, `docs/milestones/`, and `docs/todo/current.md` updated when direction changes.
- Explain intent, impact, verification, and remaining risk in PRs.
- Prefer documentation that helps the next developer or AI agent decide what to do without rereading chat history.

## Secrets

Do not commit passwords, tokens, private URLs, production credentials, or local `.env` files. Commit only non-secret examples such as `.env.example`.

## Engineering theme

- strict TypeScript, explicit exports, small modules
- OpenAPI-aligned types over ad-hoc response shapes
- tests that lock parsing and client contracts
- structure readable to humans and AI agents
