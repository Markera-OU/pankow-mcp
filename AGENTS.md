# AGENTS.md — Pankow MCP Server Storefront

## Project Overview

This repo is the PUBLIC STOREFRONT for the Pankow MCP server — a
streamable-HTTP MCP server (JSON-RPC 2.0, MCP revision 2026-07-28) with 11
tool definitions for managing LLM tests, projects, and CI runs on the
[Pankow platform](https://pankow-production.up.railway.app).

- Endpoint: `https://pankow-production.up.railway.app/mcp` (dev: `http://localhost:8080/mcp`)
- Registry name: `io.github.tobbykuyinu/pankow-mcp` (GitHub-username namespace — see README note)
- Language: Markdown + JSON manifests ONLY. No application code in this repo.
  The server implementation lives in the private pankow-api repo.

## Commands

| Intent | Command |
|--------|---------|
| Validate server.json | `npx mcp-publisher validate --strict server.json` |
| Check llms.txt links | `curl -sf https://raw.githubusercontent.com/Markera-OU/pankow-mcp/main/llms.txt` (all links must return 200) |
| Verify endpoint live | `curl -s -o /dev/null -w '%{http_code}' -X POST https://pankow-production.up.railway.app/mcp` → expect `401` unauthenticated |
| Verify tools (with key) | `curl -X POST <endpoint> -H 'Authorization: Bearer pankow_mcp_<KEY>' -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' -H 'MCP-Protocol-Version: 2026-07-28' -H 'Mcp-Method: tools/list' -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'` |

## Security

- 🚫 NEVER commit API keys, tokens, or credentials to this repo.
- 🚫 NEVER put real keys in server.json — the `headers` array declares the
  Authorization header with `isSecret: true` so clients prompt users at install time.
- ✅ Mention where keys come from (Pankow → Account Settings → MCP Access Keys)
  in README examples; always use placeholders.

## Publishing

- Bump `version` in server.json on every change. Registry versions are immutable once published.
- Registry PR goes to `modelcontextprotocol/registry` → `servers/` dir.
- Run `npx mcp-publisher validate --strict server.json` (also in CI) before any registry PR.
- When the pankow.ai DNS lands, swap `pankow-production.up.railway.app` → `pankow.ai`
  in server.json + README + llms.txt and bump the version.

## Boundaries

- ✅ Update: README.md, server.json, AGENTS.md, llms.txt, CHANGELOG.md, LICENSE, CI workflow
- ⚠️ Ask first: renaming tools, changing the endpoint URL, changing the registry namespace
- 🚫 Never: application code, secrets, registry PRs without passing validation
