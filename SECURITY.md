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

The client sends the bearer token on both `Authorization` and a non-standard `X-Authorization` mirror on **every** authenticated request, on every transport path. This is a workaround for shared-hosting / reverse proxies that strip the standard `Authorization` header before it reaches the backend (observed on HETEML); NENE2 backends fall back to the mirror. **In the current version the mirror cannot be disabled.**

Security implication: any logging, WAF, or proxy pipeline that masks credentials must include **`X-Authorization`** in its mask set. An environment that masks only `Authorization` will record the bearer token in clear text.

An opt-out flag is _planned_ for a future minor release, and an off-by-default change is _planned_ for a future major release. See the README → **Transport headers** section for details.
