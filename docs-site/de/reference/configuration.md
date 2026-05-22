# Konfiguration

| Feld        | Beschreibung                                |
| ----------- | ------------------------------------------- |
| `baseUrl`   | API-Origin (ohne trailing slash)            |
| `apiKey`    | `X-NENE2-API-Key`                           |
| `bearer`    | Bearer JWT                                  |
| `fetch`     | Test-Double                                 |
| `signal`    | An alle Requests weitergeleitet             |
| `timeoutMs` | Timeout pro Request (`AbortSignal.timeout`) |

Geheimnisse nur über Umgebungsvariablen in der App — nie im Repo.
