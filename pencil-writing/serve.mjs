/* Serves pencil-writing/out/ on http://localhost:5601 (127.0.0.1 only), for looking at the glyph sheet and the act frames in a browser. Read-only.
   node pencil-writing/serve.mjs [port] */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { HERE } from "./lib.mjs";

const OUT = path.join(HERE, "out"), port = Number(process.argv[2] || 5601);
const TYPES = { ".html": "text/html; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json", ".js": "text/javascript" };
http.createServer((req, res) => {
  const name = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, "") || "glyphs.html";
  const file = path.join(OUT, name);
  if (!file.startsWith(OUT + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end("not found"); }
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream", "cache-control": "no-store" });
  fs.createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`pencil-writing/out on http://localhost:${port}`));
