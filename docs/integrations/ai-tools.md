# AI Tooling Policy

nene2-js should be easy for AI agents to inspect, change, and verify without guessing.

## Source of truth

- Scope: `docs/scope.md`
- Direction: `README.md`, `docs/roadmap.md`
- Workflow: `docs/workflow.md`
- Coding rules: `docs/development/coding-standards.md`
- Current state: `docs/todo/current.md`
- Agent entry: `AGENTS.md`

## Agent workflow

1. Confirm or create a GitHub Issue.
2. Check roadmap and `docs/todo/current.md`.
3. Branch from `main`: `type/issue-number-summary`.
4. Make focused changes only.
5. Update docs when behavior or policy changes.
6. Run `npm run check` or the narrowest subset.
7. Commit, push, PR, merge unless the user narrowed scope.

## Safety boundaries

- Do not commit secrets or `.env`.
- Do not add direct database access or MCP tools that bypass HTTP APIs.
- Do not reimplement NENE2 server routing/middleware in Node.
- Destructive git operations require explicit user approval.
- For MCP usage, point users to **nene-mcp** or NENE2 local MCP docs — this repo is the TypeScript **client** side.

## NENE2 cross-reference

When an Issue requires a new HTTP contract, default action is **open or link an NENE2 Issue first**, then sync nene2-js.
