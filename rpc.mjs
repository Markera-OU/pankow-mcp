// Raw JSON-RPC client for MCP Streamable HTTP (http://localhost:8080/mcp)
import fs from "node:fs";

const KEY = process.env.PANKOW_MCP_KEY;
const BASE = "http://localhost:8080/mcp";
const SESSION_FILE = "/tmp/pankow-mcp/session.txt";

let sessionId = null;
if (fs.existsSync(SESSION_FILE)) {
  sessionId = fs.readFileSync(SESSION_FILE, "utf8").trim();
}

async function rpc(method, params = {}, id) {
  const headers = {
    Authorization: `Bearer ${KEY}`,
    Accept: "application/json, text/event-stream",
    "Content-Type": "application/json",
  };
  if (sessionId) headers["Mcp-Session-Id"] = sessionId;
  const body = JSON.stringify({ jsonrpc: "2.0", id: id ?? Date.now(), method, params });
  const res = await fetch(BASE, { method: "POST", headers, body });
  const newSession = res.headers.get("mcp-session-id");
  if (newSession) {
    sessionId = newSession;
    fs.writeFileSync(SESSION_FILE, sessionId);
  }
  const text = await res.text();
  return { status: res.status, text, sessionId: newSession };
}

function parseResponse(text) {
  const out = [];
  for (const raw of text.trim().split("\n\n")) {
    for (const line of raw.split("\n")) {
      if (line.startsWith("data:")) {
        out.push(JSON.parse(line.slice(5).trim()));
      }
    }
  }
  if (out.length === 0) {
    // maybe pure JSON
    try { out.push(JSON.parse(text)); } catch { /* not JSON */ }
  }
  return out;
}

const method = process.argv[2];
const params = process.argv[3] ? JSON.parse(process.argv[3]) : {};

if (method === "initialize") {
  const r = await rpc("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "optimi-setup-worker", version: "1.0.0" },
  });
  console.log("HTTP", r.status, "session:", r.sessionId);
  console.log(r.text.slice(0, 2000));
  if (r.status === 200) {
    // send notifications/initialized
    const r2 = await rpc("notifications/initialized", {}, "init-notif");
    console.log("initialized notif HTTP", r2.status, r2.text.slice(0, 300));
  }
  process.exit(0);
}

const r = await rpc(method, params);
console.error("HTTP", r.status);
for (const msg of parseResponse(r.text)) {
  if (msg.error) console.log("ERROR:", JSON.stringify(msg.error, null, 2));
  if (msg.result !== undefined) console.log(JSON.stringify(msg.result, null, 2));
}
