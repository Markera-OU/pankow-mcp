# Anthropic Connector Directory — Submission Guide (PREPARED, NOT SUBMITTED)

The Connector Directory form lives at https://claude.com/docs/connectors/building/submission.
It needs a **human** (test account credentials + 1Password + form interaction), so the
actual submission is NOT done by automation. Everything the form asks for is prepared below.

## Prepared materials

1. **Tool annotations** ✅ — all 11 tool definitions carry `title` + exactly one of
   `readOnlyHint`/`destructiveHint`, with draft-07 input schemas (audited 2026-08-22,
   covered by API tests). Names ≤64 chars.
2. **Transport** ✅ — Streamable HTTP, MCP revision 2026-07-28. No SSE.
3. **Auth** ⚠️ — the endpoint requires an API-key header (`Authorization: Bearer
   pankow_mcp_…`), NOT OAuth. Per the submission guide, API-key-header auth is acceptable
   for the registry; the Connector Directory requires **OAuth 2.0 authorization-code
   flow** (callback allowlisted for `https://claude.ai/api/mcp/auth_callback` /
   `https://claude.com/api/mcp/auth_callback`). OAuth support on the Pankow API is NOT
   implemented — that is the open item for a directory submission. If the form rejects
   header-only auth, implement OAuth (DCR supported) or defer the directory submission.
4. **Example prompts** (≥3, in README) ✅
5. **Setup instructions** ✅ — README Quick Start (Claude Code + Claude Desktop).
6. **Privacy policy URL** — use the Pankow platform page once published; interim:
   https://pankow-production.up.railway.app (no dedicated /privacy page yet — TODO).
7. **Support contact** ✅ — support@pankow.ai.
8. **Test account** — create one dedicated Pankow account + MCP key via 1Password
   before filling the form; keep it active through review.
9. **Branding** — logo/favicon assets to be attached by the human (not in this repo yet — TODO).

## Step-by-step (for the human)

1. Open https://claude.com/docs/connectors/building/submission while signed into the
   Claude test account.
2. Server basics: name "Pankow", endpoint `https://pankow-production.up.railway.app/mcp`,
   transport Streamable HTTP.
3. Connection details: auth method — if header-only is rejected, pause and implement
   OAuth 2.0 in the pankow-api repo before continuing (callback allowlist above).
4. Tools & resources: paste the tool table from README.md#tools; note annotations done.
5. Documentation: link README + the 3 example prompts.
6. Privacy & compliance: privacy URL (see TODO), support contact.
7. Test account & branding: 1Password entry + logo.
8. Submit; track review status.
