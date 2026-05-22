# Configuração

| Campo       | Descrição                                      |
| ----------- | ---------------------------------------------- |
| `baseUrl`   | Origem da API (sem barra final)                |
| `apiKey`    | `X-NENE2-API-Key`                              |
| `bearer`    | Bearer JWT                                     |
| `fetch`     | Injeção para testes                            |
| `signal`    | Encaminhado a cada requisição                  |
| `timeoutMs` | Timeout por requisição (`AbortSignal.timeout`) |

Segredos via variáveis de ambiente na aplicação — nunca no repositório.
