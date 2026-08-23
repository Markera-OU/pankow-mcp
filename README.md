# Pankow MCP

**Pankow MCP** is a streamable-HTTP MCP server that connects Claude and other MCP clients to the [Pankow](https://pankow-production.up.railway.app) AI testing platform. Manage organizations, projects, test cases, and CI runs — configure targets and run LLM evaluations directly from your agent.

- 🔗 Endpoint: `https://pankow-production.up.railway.app/mcp` (switches to `https://pankow.ai/mcp` when the pankow.ai domain lands)
- 🚀 Transport: Streamable HTTP, JSON-RPC 2.0 (MCP revision 2026-07-28)
- 🧰 14 tool definitions (the platform's 10 MCP tools, plus `get_config` / `list_runs` / `get_run` observability)
- 🔐 Auth: `Authorization: Bearer pankow_mcp_<key>` — user-level MCP access keys from Pankow Account Settings

> **Namespace note:** the registry name is `io.github.markera-ou/pankow-mcp`. GitHub-based registry auth grants org namespaces (`io.github.<orgname>/*`) when the publisher is an **Owner** of the organization — verified: the publishing account holds the `admin` role in `Markera-OU`.

## Quick Start

### Claude Code

```bash
claude mcp add pankow --transport http https://pankow-production.up.railway.app/mcp --header "Authorization: Bearer pankow_mcp_YOUR_KEY"
```

### Claude Desktop

```json
{
  "mcpServers": {
    "pankow": {
      "type": "http",
      "url": "https://pankow-production.up.railway.app/mcp",
      "headers": {
        "Authorization": "Bearer pankow_mcp_YOUR_KEY"
      }
    }
  }
}
```

### Authentication

1. Sign up at [Pankow](https://pankow-production.up.railway.app).
2. Go to **Account Settings → MCP Access Keys** and generate a key (shown once).
3. Send it as `Authorization: Bearer pankow_mcp_<key>` — the key authenticates as you across all your organizations.

## Tools

| Tool | Category | Description |
|------|----------|-------------|
| `list_orgs` | Read | List your organizations |
| `list_projects` | Read | List projects in an org |
| `list_tests` | Read | List saved test cases in a project |
| `test_history` | Read | Last runs for a test, with scores |
| `create_test` | Write | Create a test case |
| `create_project` | Write | Create a project (plan-limit aware) |
| `configure_project` | Write | Configure the target AI (auth incl. session login, static headers, chat endpoint, preflight, seeds) — field reference generated from the Super Config Schema |
| `update_test` | Write | Edit a test case |
| `delete_test` | Write | Delete a test case |
| `get_config` | Read | Read back a project's saved config (masked echo) |
| `list_runs` | Read | List a project's runs with per-test results + failure diagnostics |
| `get_run` | Read | One run's full detail (status, config, results) |
| `run_tests` | Write | Queue a server-side test run |
| `run_tests_cli` | Read | Get CLI instructions to run tests locally (no server action) |

## Example Prompts

1. "List my organizations and projects in Pankow, and show me the recent test history for each test."
2. "Create a Pankow test case that verifies the AI gives accurate refund policy answers, then run it and summarize the pass/fail results."
3. "Connect Pankow to my local AI at http://localhost:3456/chat (session auth, chat reply path choices.0.message.content), then run the full suite."

## Security

- Keys are user-level, revocable instantly from the Pankow dashboard.
- The server validates the key on every request; revoked keys get 401.
- Mutating tools enforce your organization's plan limits.

## Links

- Docs: <https://pankow-production.up.railway.app/docs>
- Blog: <https://pankow-production.up.railway.app/blog>
- Registry: <https://registry.modelcontextprotocol.io> (search: pankow)
- Support: <support@pankow.ai>

## License

MIT — see [LICENSE](LICENSE). This repo is a storefront only: manifests, docs, and metadata. No application code.
