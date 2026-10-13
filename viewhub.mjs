#!/usr/bin/env node
/* viewhub: ONE page to look at the tools of every class.
 *
 *   node viewhub.mjs                 http://localhost:5170   (Class + Chapter + Tool dropdowns)
 *   node viewhub.mjs --port 5555     a different port
 *   node viewhub.mjs --open          also open the page in the default browser
 *   node viewhub.mjs --list          print the classes it finds (JSON) and exit, no server; --root <dir> looks in another pipeline root
 *
 * It does not replace the per-class viewers (class<N>/viewer, started by `node cli.mjs view`); it finds them.
 * Every class keeps its own code (lib, pinned runtime, host template, check), so each class is shown by ITS OWN
 * viewer, embedded in the hub's page. The hub only
 *   - discovers the classes: every `class<N>/` folder that has a pipeline.config.json (a clone, or a class made
 *     by `classctl new`, shows up with nothing to edit here),
 *   - starts a class's viewer when you pick that class (`node cli.mjs view --port <its port>` in that folder;
 *     one that is already running, e.g. started by hand, is simply used) and stops the ones it started on exit,
 *   - passes the class's /api/meta and /api/tools through (a page on one port cannot read another port),
 *   - serves viewer-hub/index.html,
 *   - and the Editor (viewer-hub/editor.js + editor-api.mjs, /api/feedback/*): educator feedback -> fix -> publish.
 * The viewer side writes nothing. The Editor writes only on a click: the fix prompt and baseline in a slot's
 * work/<ch>/<id>/_feedback/, a feedback row's status, and `node cli.mjs publish` from its confirm dialog. The hub
 * never reads .env or config.json itself: the database and the GCS key are read by a child (viewer-hub/feedback.mjs)
 * through the class's own lib.
 * No dependencies: node:http, node:child_process, node:fs (Node 18+).
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn, exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import { makeEditorApi } from "./viewer-hub/editor-api.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PAGE = path.join(HERE, "viewer-hub", "index.html");
const EDITOR_JS = path.join(HERE, "viewer-hub", "editor.js");

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(`--${name}`); return i < 0 ? undefined : (args[i + 1]?.startsWith("--") || i + 1 >= args.length ? true : args[i + 1]); };
const ROOT = path.resolve(typeof opt("root") === "string" ? opt("root") : HERE); // where the class<N>/ folders are
const HUB_PORT = Number(opt("port") ?? 5170);

/* ---- the classes on disk ---------------------------------------------------------------------- */

function readConfig(dir) {
  try { return JSON.parse(fs.readFileSync(path.join(dir, "pipeline.config.json"), "utf8").replace(/^﻿/, "")); } catch { return null; }
}

/* same rule as class<N>/viewer/meta.mjs viewerPort: "viewerPort" in the config, else 5175 + 2 x class */
function discoverClasses() {
  const out = [];
  for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) {
    const m = e.isDirectory() && /^class(\d+)$/.exec(e.name);
    if (!m) continue;
    const dir = path.join(ROOT, e.name);
    const cfg = readConfig(dir);
    if (!cfg) continue;
    const n = Number(cfg.defaults?.class ?? m[1]);
    out.push({
      class: n, folder: e.name, dir,
      port: Number(cfg.viewerPort ?? 5175 + 2 * n),
      installed: fs.existsSync(path.join(dir, "node_modules")),
      hasViewer: fs.existsSync(path.join(dir, "viewer", "server.mjs")),
    });
  }
  return out.sort((a, b) => a.class - b.class);
}
const classByNumber = (n) => discoverClasses().find((c) => c.class === n);

if (opt("list")) { // what the page would offer, without a server (the classctl tests use this to prove a new class is found)
  console.log(JSON.stringify(discoverClasses().map(({ dir, ...c }) => c), null, 1));
  process.exit(0);
}

/* ---- starting and finding a class's viewer ----------------------------------------------------- */

const children = new Map(); // class number -> { child, log: [], exited }
const starting = new Map(); // class number -> Promise<void>

/* a cheap, static route of the viewer: /api/meta and /api/tools read every slot's status and take seconds on a big class */
async function probe(port, timeoutMs = 3000) {
  try {
    const r = await fetch(`http://localhost:${port}/api/host-template`, { signal: AbortSignal.timeout(timeoutMs) });
    return r.ok;
  } catch { return false; }
}

function tail(n) { return (children.get(n)?.log ?? []).slice(-12).join("\n"); }

async function ensureRunning(c) {
  if (await probe(c.port)) return;
  if (!c.installed) throw new Error(`class ${c.class} has no node_modules: run  npm install  in ${c.folder}/ first`);
  if (!c.hasViewer) throw new Error(`${c.folder}/viewer/server.mjs is missing`);
  if (starting.has(c.class)) return starting.get(c.class);
  const p = (async () => {
    const child = spawn(process.execPath, ["cli.mjs", "view", "--port", String(c.port)], { cwd: c.dir, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
    const rec = { child, log: [], exited: null };
    children.set(c.class, rec);
    const keep = (buf) => { for (const l of String(buf).split(/\r?\n/)) if (l.trim()) { rec.log.push(l); if (rec.log.length > 200) rec.log.shift(); } };
    child.stdout.on("data", keep); child.stderr.on("data", keep);
    child.on("exit", (code) => { rec.exited = code ?? -1; });
    child.on("error", (e) => { rec.log.push(String(e.message)); rec.exited = -1; });
    const t0 = Date.now();
    while (Date.now() - t0 < 90_000) { // the first start builds the viewer's bundle with esbuild: a few seconds
      if (rec.exited !== null) throw new Error(`the class ${c.class} viewer stopped (exit ${rec.exited}):\n${tail(c.class)}`);
      if (await probe(c.port)) return;
      await new Promise((r) => setTimeout(r, 400));
    }
    throw new Error(`the class ${c.class} viewer did not answer on port ${c.port} within 90 s:\n${tail(c.class)}`);
  })().finally(() => starting.delete(c.class));
  starting.set(c.class, p);
  return p;
}

function stopChildren() { for (const { child, exited } of children.values()) if (exited === null) try { child.kill(); } catch { /* already gone */ } }
process.on("exit", stopChildren);
for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) process.on(sig, () => { stopChildren(); process.exit(0); });

/* ---- http ------------------------------------------------------------------------------------- */

function send(res, status, body, type = "application/json; charset=utf-8") {
  const buf = Buffer.from(typeof body === "string" ? body : JSON.stringify(body));
  res.writeHead(status, { "content-type": type, "content-length": buf.length, "cache-control": "no-store" });
  res.end(buf);
}

/* the page may only be asked by localhost (no DNS-rebinding), and a POST only from the hub's own page */
function hostOk(req) {
  const host = (req.headers.host ?? "").replace(/:\d+$/, "");
  if (!["localhost", "127.0.0.1", "[::1]"].includes(host)) return false;
  if (req.method === "POST") {
    const origin = req.headers.origin;
    if (origin && new URL(origin).host !== req.headers.host) return false;
  }
  return true;
}

const editorApi = makeEditorApi({ discoverClasses, ensureRunning, send });

const server = http.createServer(async (req, res) => {
  try {
    if (!hostOk(req)) return send(res, 403, { error: "forbidden" });
    const url = new URL(req.url, "http://localhost");
    const parts = url.pathname.split("/").filter(Boolean);

    if (req.method === "GET" && url.pathname === "/") return send(res, 200, fs.readFileSync(PAGE, "utf8"), "text/html; charset=utf-8");

    if (req.method === "GET" && url.pathname === "/editor.js") return send(res, 200, fs.readFileSync(EDITOR_JS, "utf8"), "text/javascript; charset=utf-8");
    if (url.pathname.startsWith("/api/feedback/")) return await editorApi(req, res, url);

    if (req.method === "GET" && url.pathname === "/api/classes") {
      const list = discoverClasses();
      const running = await Promise.all(list.map((c) => probe(c.port, 1500)));
      return send(res, 200, list.map((c, i) => ({
        class: c.class, folder: c.folder, port: c.port, installed: c.installed, hasViewer: c.hasViewer,
        running: running[i], startedByHub: children.has(c.class) && children.get(c.class).exited === null,
      })));
    }

    // /api/classes/:n/(start|meta|tools)
    if (parts[0] === "api" && parts[1] === "classes" && parts.length === 4 && /^\d+$/.test(parts[2])) {
      const c = classByNumber(Number(parts[2]));
      if (!c) return send(res, 404, { error: `no class ${parts[2]}` });
      const action = parts[3];
      if (req.method === "POST" && action === "start") {
        try { await ensureRunning(c); return send(res, 200, { class: c.class, port: c.port, running: true }); }
        catch (e) { return send(res, 500, { error: String(e.message || e) }); }
      }
      if (req.method === "GET" && (action === "meta" || action === "tools")) {
        try {
          const r = await fetch(`http://localhost:${c.port}/api/${action}`, { signal: AbortSignal.timeout(60_000) });
          return send(res, r.status, await r.text());
        } catch (e) { return send(res, 409, { error: `the class ${c.class} viewer is not running (${e.message})` }); }
      }
    }

    send(res, 404, { error: "not found" });
  } catch (e) {
    console.error(req.method, req.url, "->", e.stack || e.message);
    send(res, 500, { error: String(e.message || e) });
  }
});

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") console.error(`port ${HUB_PORT} is taken (is the hub already running?). Try  node viewhub.mjs --port <other>`);
  else console.error(e.message);
  process.exit(1);
});

server.listen(HUB_PORT, "127.0.0.1", () => {
  const url = `http://localhost:${HUB_PORT}`;
  const cs = discoverClasses();
  console.log(`viewhub  ${url}`);
  for (const c of cs) console.log(`  class ${c.class}  ${c.folder}/  viewer port ${c.port}${c.installed ? "" : "  (no node_modules: npm install first)"}`);
  if (!cs.length) console.log("  no class<N>/ folder with a pipeline.config.json found next to viewhub.mjs");
  console.log("  a class's viewer starts when you pick it; ctrl+C stops the hub and the viewers it started");
  if (opt("open")) exec(process.platform === "win32" ? `start "" "${url}"` : process.platform === "darwin" ? `open "${url}"` : `xdg-open "${url}"`);
});
