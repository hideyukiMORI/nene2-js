# ADR Policy

Architecture Decision Records preserve intent without rereading old chats.

## When to write an ADR

- Public npm package API shape
- OpenAPI pin / codegen strategy
- Error handling model (`throw` vs `Result`)
- Splitting packages (`nene2-client` vs subpackages)
- Multi-backend live verification (NENE2 / nene2-python / nene2-node)
- Node-only tooling exceptions

## Format

- Location: `docs/adr/`
- Filename: `NNNN-kebab-case-title.md`
- Template: `docs/adr/0000-template.md`
- Status: Proposed | Accepted | Deprecated | Superseded

Do not renumber ADRs after creation.
