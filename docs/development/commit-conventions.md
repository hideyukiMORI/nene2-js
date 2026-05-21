# Commit Message Conventions

nene2-js uses [Conventional Commits](https://www.conventionalcommits.org/), aligned with NENE2.

## Format

```text
<type>(<optional scope>): <description> (#<issue>)

[optional body]

[optional footer]
```

## Language

- Keep `type`, `scope`, `BREAKING CHANGE`, and other Conventional Commits keywords in **English**.
- Write the **description** and **body** in **Japanese**.
- Include the related GitHub Issue number in the subject when practical.

Example:

```text
docs(governance): nene2-js のスコープとワークフローを整備する (#1)
```

## Common types

| Type       | Use                                    |
| ---------- | -------------------------------------- |
| `feat`     | New feature                            |
| `fix`      | Bug fix                                |
| `docs`     | Documentation only                     |
| `refactor` | Code change without feature or bug fix |
| `test`     | Test additions or changes              |
| `build`    | Dependency or build setup              |
| `ci`       | CI configuration                       |
| `chore`    | Maintenance                            |

## Breaking changes

Use `!` or a `BREAKING CHANGE:` footer when public package API, CLI, or documented behavior changes incompatibly.
