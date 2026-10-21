/* viewer: a small local React app that renders a ported output-preview/<id>.tsx the way
 * the host runs it (lib/ship/hostTemplate.mjs), with a sidebar of sidecar JSON checks, the
 * pipeline's own status, and live diagnostics off the running tool.
 *
 * Started by `node cli.mjs view [--port N] [--watch]`; see viewer/README.md for the routes.
 * Nothing here writes to the pipeline except the two buttons that call the pipeline's own
 * check/hostsim functions (the same ones `node cli.mjs check` — which ports automatically on a
 * pass — and `node cli.mjs port` run). Never publishes or uploads.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import http from "node:http";
import { fileURLToPath } from "node:url";

import { CONFIG, fromRoot } from "../lib/core/env.mjs";
import { workRoot, readStatus } from "../lib/core/work.mjs";
import { hostsim } from "../lib/ship/hostsim.mjs";
import { md5 } from "../lib/ship/port.mjs";
import { publishedOf } from "../lib/ship/published.mjs";
import { vendorLibs, HOST } from "../lib/ship/hostTemplate.mjs";
import { checkAndPort } from "../lib/check/runAndShip.mjs";
import { viewerPort, viewerMeta, checkState, isOwnChapter } from "./meta.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(HERE, "public");
const OUT_ROOT = fromRoot(CONFIG.outDir); // output-preview/

const ID_RE = /^[A-Za-z0-9_.-]+$/;

// ---- client bundle (esbuild) -------------------------------------------------------------

async function buildClient({ watch = false } = {}) {
  const { context } = await import("esbuild");
  const ctx = await context({
    entryPoints: [path.join(HERE, "src/main.tsx")],
    bundle: true,
    outfile: path.join(PUBLIC, "bundle.js"),
    jsx: "automatic",
    target: "es2020",
    format: "iife",
    sourcemap: true,
    logLevel: "info",
    define: { "process.env.NODE_ENV": watch ? '"development"' : '"production"' },
  });
  if (watch) { await ctx.watch(); console.log("  viewer: esbuild watching for changes"); }
  else { await ctx.rebuild(); await ctx.dispose(); }
}

// ---- data: scan output-preview/, join with work/<chapter>/<id>/status.json ---------------

function listTools() {
  if (!fs.existsSync(OUT_ROOT)) return [];
  const out = [];
  for (const chapterId of fs.readdirSync(OUT_ROOT).filter((c) => fs.statSync(path.join(OUT_ROOT, c)).isDirectory() && isOwnChapter(c))) {
    for (const id of fs.readdirSync(path.join(OUT_ROOT, chapterId)).filter((x) => fs.statSync(path.join(OUT_ROOT, chapterId, x)).isDirectory())) {
      const dir = path.join(OUT_ROOT, chapterId, id);
      const tsxFile = path.join(dir, `${id}.tsx`), jsonFile = path.join(dir, `${id}.json`);
      const hasTsx = fs.existsSync(tsxFile), hasJson = fs.existsSync(jsonFile);
      let title = null, toolId = null;
      if (hasJson) { try { const j = JSON.parse(fs.readFileSync(jsonFile, "utf8")); title = j.title ?? null; toolId = j.toolId ?? null; } catch {} }
      const workDir = path.join(workRoot(), chapterId, id);
      const status = fs.existsSync(workDir) ? readStatus(workDir) : null;
      out.push({
        chapterId, id, title, toolId, hasTsx, hasJson,
        tsxBytes: hasTsx ? fs.statSync(tsxFile).size : null,
        jsonBytes: hasJson ? fs.statSync(jsonFile).size : null,
        status,
        checkState: fs.existsSync(workDir) ? checkState(workDir) : "unchecked", // the same fresh-or-stale reading as `status` and /api/meta
        published: publishedFor(status, dir, id),
      });
    }
  }
  out.sort((a, b) => a.chapterId.localeCompare(b.chapterId) || a.id.localeCompare(b.id));
  return out;
}

/* "Published <time>" for a tool: lib/ship/published.mjs. The pair on disk is read (and hashed) only for a tool whose upload recorded its
   md5s, to say "edited since"; an older record has no md5s to compare. */
function publishedFor(status, dir, id) {
  const rec = status?.published;
  let now = null;
  if (rec && rec.pair) {
    try { now = { tsx: md5(fs.readFileSync(path.join(dir, `${id}.tsx`))), json: md5(fs.readFileSync(path.join(dir, `${id}.json`))) }; } catch { /* no pair on disk: nothing claimed */ }
  }
  return publishedOf(status, now);
}

function toolDir(chapterId, id) {
  if (!ID_RE.test(chapterId) || !ID_RE.test(id)) return null;
  const dir = path.join(OUT_ROOT, chapterId, id);
  return fs.existsSync(dir) ? dir : null;
}

// ---- tiny http plumbing -------------------------------------------------------------------

const CONTENT_TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".map": "application/json" };

function sendJson(res, status, body) {
  const buf = Buffer.from(JSON.stringify(body));
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "content-length": buf.length });
  res.end(buf);
}
function sendText(res, status, text, extraHeaders = {}) {
  const buf = Buffer.from(text, "utf8");
  res.writeHead(status, { "content-type": "text/plain; charset=utf-8", "content-length": buf.length, ...extraHeaders });
  res.end(buf);
}
function sendFile(res, file) {
  if (!fs.existsSync(file)) { sendText(res, 404, "not found"); return; }
  const ext = path.extname(file);
  res.writeHead(200, { "content-type": CONTENT_TYPES[ext] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}

export async function startServer({ port = viewerPort(), watch = false } = {}) {
  await buildClient({ watch });
  const libs = vendorLibs(); // read once: react/react-dom UMD + babel standalone, ~3.1 MB total

  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      const parts = url.pathname.split("/").filter(Boolean);

      if (req.method === "GET" && url.pathname === "/") return sendFile(res, path.join(PUBLIC, "index.html"));
      const STATIC = new Set(["/bundle.js", "/bundle.js.map", "/bundle.css", "/bundle.css.map"]);
      if (req.method === "GET" && STATIC.has(url.pathname)) return sendFile(res, path.join(PUBLIC, url.pathname.slice(1)));
      if (req.method === "GET" && url.pathname === "/vendor/react.js") return sendText(res, 200, libs.react, { "content-type": "text/javascript; charset=utf-8" });
      if (req.method === "GET" && url.pathname === "/vendor/react-dom.js") return sendText(res, 200, libs.reactDom, { "content-type": "text/javascript; charset=utf-8" });
      if (req.method === "GET" && url.pathname === "/vendor/babel.js") return sendText(res, 200, libs.babel, { "content-type": "text/javascript; charset=utf-8" });
      if (req.method === "GET" && url.pathname === "/api/host-template") return sendText(res, 200, HOST, { "content-type": "text/javascript; charset=utf-8" });

      if (req.method === "GET" && url.pathname === "/api/tools") return sendJson(res, 200, listTools());
      if (req.method === "GET" && url.pathname === "/api/meta") return sendJson(res, 200, viewerMeta());

      // /api/tools/:chapterId/:id/(tsx|json|status|hostsim|check)
      if (parts[0] === "api" && parts[1] === "tools" && parts.length === 5) {
        const [, , chapterId, id, action] = parts;
        const dir = toolDir(chapterId, id);
        if (!dir) return sendJson(res, 404, { error: `no output-preview pair for ${chapterId}/${id}` });

        if (req.method === "GET" && action === "tsx") {
          const file = path.join(dir, `${id}.tsx`);
          const buf = fs.readFileSync(file);
          return sendText(res, 200, buf.toString("utf8"), { "x-md5": crypto.createHash("md5").update(buf).digest("hex"), "x-bytes": String(buf.length) });
        }
        if (req.method === "GET" && action === "json") {
          const file = path.join(dir, `${id}.json`);
          return sendJson(res, 200, JSON.parse(fs.readFileSync(file, "utf8")));
        }
        if (req.method === "GET" && action === "status") {
          const workDir = path.join(workRoot(), chapterId, id);
          const st = fs.existsSync(workDir) ? readStatus(workDir) : {};
          return sendJson(res, 200, { ...st, published: publishedFor(st, dir, id) }); // the derived reading replaces the raw record (it has `changed`)
        }
        if (req.method === "POST" && action === "hostsim") {
          const tsxFile = path.join(dir, `${id}.tsx`);
          const sidecar = JSON.parse(fs.readFileSync(path.join(dir, `${id}.json`), "utf8"));
          const r = await hostsim(tsxFile, sidecar);
          return sendJson(res, 200, r);
        }
        if (req.method === "POST" && action === "check") {
          const workDir = path.join(workRoot(), chapterId, id);
          if (!fs.existsSync(path.join(workDir, "tool.tsx"))) return sendJson(res, 404, { error: `no work/${chapterId}/${id}/tool.tsx to check` });
          // the same auto-port-on-pass as `node cli.mjs check`: a pass lands in output-preview/ straight away
          const { checked, ported, portError } = await checkAndPort(workDir, { render: true });
          return sendJson(res, 200, { id, ...checked, ported: ported ? { tsxFile: ported.tsxFile, jsonFile: ported.jsonFile, hostsimOk: ported.hostsim.ok, hostsimResults: ported.hostsim.results } : null, portError });
        }
      }

      sendText(res, 404, "not found");
    } catch (e) {
      console.error(req.method, req.url, "->", e.stack || e.message);
      sendJson(res, 500, { error: String(e.message || e) });
    }
  });

  await new Promise((resolve) => server.listen(port, resolve));
  return { server, port, toolCount: listTools().length };
}
