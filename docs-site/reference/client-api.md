# createNene2Client API

Factory: `createNene2Client(config)` → `Nene2Client`.

## System / smoke

| Method             | Path                   | Notes                        |
| ------------------ | ---------------------- | ---------------------------- |
| `frameworkSmoke()` | `GET /`                | Framework metadata           |
| `health(options?)` | `GET /health`          | `allowDegraded` → accept 503 |
| `machineHealth()`  | `GET /machine/health`  | Requires API key             |
| `ping()`           | `GET /examples/ping`   |                              |
| `smoke()`          | parallel health + ping |                              |

## Examples — notes

| Method                 | HTTP                          |
| ---------------------- | ----------------------------- |
| `listNotes(params?)`   | `GET /examples/notes`         |
| `getNote(id)`          | `GET /examples/notes/{id}`    |
| `createNote(body)`     | `POST /examples/notes`        |
| `updateNote(id, body)` | `PUT /examples/notes/{id}`    |
| `deleteNote(id)`       | `DELETE /examples/notes/{id}` |

## Examples — tags

Same pattern under `/examples/tags`.

## Protected

| Method           | HTTP                      |
| ---------------- | ------------------------- | ---------- |
| `getProtected()` | `GET /examples/protected` | Bearer JWT |

All methods validate JSON bodies with exported type guards and throw `Nene2ClientError` on failure.
