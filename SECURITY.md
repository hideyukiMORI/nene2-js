# Security Policy

## Supported versions

| Version | Supported               |
| ------- | ----------------------- |
| `0.x`   | Best effort until `1.0` |

## Reporting

Report security issues privately to the repository maintainer (GitHub Security Advisories or direct contact used for NENE2).

Do not open public Issues for undisclosed vulnerabilities.

## Scope notes

This repository provides **client libraries**. It must not embed secrets, ship `.env` files, or encourage bypassing NENE2 HTTP/MCP boundaries. Consumers are responsible for token storage in their own applications.
