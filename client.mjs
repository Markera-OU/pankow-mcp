import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

const KEY = process.env.PANKOW_MCP_KEY;
const transport = new StreamableHTTPClientTransport("http://localhost:8080/mcp", {
  requestInit: { headers: { Authorization: `Bearer ${KEY}` } },
});
const client = new Client({ name: "optimi-setup-worker", version: "1.0.0" });
await client.connect(transport);

const args = process.argv.slice(2);
const method = args[0];
const params = args[1] ? JSON.parse(args[1]) : {};

try {
  const result = await client.request(
    { method, params },
    { timeout: 120000 }
  );
  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.error("MCP_ERROR:", e.message);
  if (e.data !== undefined) console.error("DATA:", JSON.stringify(e.data, null, 2));
  process.exit(1);
}
await client.close();
