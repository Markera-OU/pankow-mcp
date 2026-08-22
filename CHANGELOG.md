# Changelog

All notable changes to the Pankow MCP server storefront.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] — 2026-08-22

### Added
- Initial storefront: README, server.json (registry manifest), AGENTS.md, llms.txt, MIT license.
- Registry manifest for the remote Streamable HTTP server at `https://pankow-production.up.railway.app/mcp`
  (MCP revision 2026-07-28; will move to `https://pankow.ai/mcp` when DNS lands).
- 11 tool definitions: list_orgs, list_projects, list_tests, test_history, create_test,
  create_project, configure_project, update_test, delete_test, run_tests, run_tests_cli —
  all annotated (title + readOnly/destructive hints) with draft-07 input schemas.
- CI workflow: `mcp-publisher validate --strict server.json`.
