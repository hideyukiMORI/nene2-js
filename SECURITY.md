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
