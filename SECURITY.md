# Security Policy

## Supported versions

| Version | Supported                                         |
| ------- | ------------------------------------------------- |
| `1.x`   | Current stable (`@hideyukimori/nene2-client`)     |
| `<1.0`  | No longer supported (upgrade to `1.0.0` or later) |

## Reporting

Report security issues privately to the repository maintainer (GitHub Security Advisories or direct contact used for NENE2).

Do not open public Issues for undisclosed vulnerabilities.

## Scope notes

This repository provides **client libraries**. It must not embed secrets, ship `.env` files, or encourage bypassing NENE2 HTTP/MCP boundaries. Consumers are responsible for token storage in their own applications.

## Transport headers (X-Authorization mirror)

By default the client sends the bearer token on both `Authorization` and a non-standard `X-Authorization` mirror on **every** authenticated request, on every transport path. This is a workaround for shared-hosting / reverse proxies that strip the standard `Authorization` header before it reaches the backend; NENE2 backends fall back to the mirror.

Security implication: any logging, WAF, or proxy pipeline that masks credentials must include **`X-Authorization`** in its mask set. An environment that masks only `Authorization` will record the bearer token in clear text.

Opting out (available in the next minor release): deployments that control the edge and know `Authorization` survives can disable the mirror at construction time with `mirrorAuthorizationHeader: false`, sending `Authorization` only. The default remains `true` (mirror on); making the mirror off by default is _planned_ for a future major release. See the README → **Transport headers** section for the code example.
