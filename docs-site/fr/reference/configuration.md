# Configuration

| Champ       | Description                                 |
| ----------- | ------------------------------------------- |
| `baseUrl`   | Origine API (sans slash final)              |
| `apiKey`    | `X-NENE2-API-Key`                           |
| `bearer`    | Bearer JWT                                  |
| `fetch`     | Injection pour tests                        |
| `signal`    | Transmis à chaque requête                   |
| `timeoutMs` | Timeout par requête (`AbortSignal.timeout`) |

Secrets via variables d'environnement côté application — jamais dans le dépôt.
