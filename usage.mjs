#!/usr/bin/env node
/* usage: what the pipeline costs in tokens, from numbers the provider reported, never from guesses.
 *
 *   node usage.mjs session [FILE.jsonl | --latest | --all] [--dir <transcripts dir>] [--json]
 *       provider-reported usage of Claude Code transcripts, grouped main / each subagent: calls, fresh input, cache read,
 *       cache write, output, the context re-read per call (the number that decides the cost of a long session), the
 *       tool calls, and a list-price estimate (usage.pricing.json; a price it does not hold prints "n/a", never a guess).
 *   node usage.mjs static [--class N] [--slot ID --ch N]
 *       what each role LOADS before it does any work (bytes, and bytes / 4 as a rough token estimate: NOT a tokenizer
 *       count). Run it before and after a docs or agent edit: it is the honest before / after for static context.
 *
 * Transcripts are per project (one folder under ~/.claude/projects), not per class, so this is a root tool.
 * One model response is written as several lines that share message.id: usage is taken once per id (the line with the
 * largest output_tokens), tool_use blocks are counted on every line. Subagent usage is read from `isSidechain` lines in
 * the session file and from <session>/subagents/*.jsonl when that folder exists; if a session has neither, the report says so.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const cmd = argv.shift();
const flag = (n) => argv.includes(n);
const opt = (n, d) => { const i = argv.indexOf(n); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : d; };
const fmt = (n) => Math.round(n).toLocaleString("en-US");
const kb = (n) => (n / 1024).toFixed(1) + " KB";

/* ---------- session ---------- */
function projectDir() {
  const given = opt("--dir");
  if (given) return given;
  const base = path.join(os.homedir(), ".claude", "projects");
  const slug = ROOT.replace(/[^A-Za-z0-9]/g, "-");
  for (const s of [slug, slug.replace(/^./, (c) => c.toLowerCase()), slug.replace(/^./, (c) => c.toUpperCase())])
    if (fs.existsSync(path.join(base, s))) return path.join(base, s);
  throw new Error(`no transcript folder for ${ROOT} under ${base}; pass --dir`);
}
function pricing() {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, "usage.pricing.json"), "utf8")); } catch { return { models: {} }; }
}
async function readFileUsage(file, into, forceAgent) {
  const seen = new Map(); // message.id -> best usage line
  const rl = readline.createInterface({ input: fs.createReadStream(file, "utf8"), crlfDelay: Infinity });
  for await (const line of rl) {
    let o; try { o = JSON.parse(line); } catch { continue; }
    const m = o.message;
    if (!m || m.role !== "assistant") continue;
    const agent = forceAgent || (o.isSidechain ? "subagent " + (o.agentId || o.sessionId || "?").slice(0, 8) : "main");
    if (Array.isArray(m.content)) for (const c of m.content) if (c.type === "tool_use") {
      const g = (into.tools[agent] ||= {}); g[c.name] = (g[c.name] || 0) + 1;
    }
    if (!m.usage || !m.id) continue;
    const prev = seen.get(m.id);
    if (!prev || (m.usage.output_tokens ?? 0) >= (prev.u.output_tokens ?? 0)) seen.set(m.id, { u: m.usage, model: m.model, agent });
  }
  for (const { u, model, agent } of seen.values()) {
    if (!model || model === "<synthetic>") continue;
    const k = agent + " | " + model;
    const a = (into.rows[k] ||= { agent, model, calls: 0, input: 0, cacheRead: 0, cacheWrite: 0, output: 0, maxCtx: 0 });
    const ctx = (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
    a.calls++; a.input += u.input_tokens || 0; a.cacheRead += u.cache_read_input_tokens || 0;
    a.cacheWrite += u.cache_creation_input_tokens || 0; a.output += u.output_tokens || 0; a.maxCtx = Math.max(a.maxCtx, ctx);
  }
}
function cost(r, P) {
  const p = P.models?.[r.model];
  if (!p) return null;
  const part = (n, price) => (price == null ? null : (n / 1e6) * price);
  const parts = [part(r.input, p.input), part(r.output, p.output), part(r.cacheRead, p.cacheRead), part(r.cacheWrite, p.cacheWrite5m)];
  return parts.some((x) => x == null) ? null : parts.reduce((a, b) => a + b, 0);
}
async function session() {
  const dir = projectDir();
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".jsonl")).map((f) => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs })).sort((a, b) => b.t - a.t);
  const named = argv.find((a) => a.endsWith(".jsonl"));
  const pick = named ? [path.isAbsolute(named) ? named : path.join(dir, named)] : flag("--all") ? files.map((x) => path.join(dir, x.f)) : [path.join(dir, files[0].f)];
  const P = pricing();
  const out = [];
  for (const file of pick) {
    const into = { rows: {}, tools: {} };
    await readFileUsage(file, into);
    const subDir = file.replace(/\.jsonl$/, "") + path.sep + "subagents";
    let subFiles = 0;
    if (fs.existsSync(subDir)) for (const f of fs.readdirSync(subDir).filter((x) => x.endsWith(".jsonl"))) { subFiles++; await readFileUsage(path.join(subDir, f), into, "subagent " + f.replace(/\.jsonl$/, "").slice(-8)); }
    const rows = Object.values(into.rows);
    const hasSub = rows.some((r) => r.agent.startsWith("subagent"));
    out.push({ file: path.basename(file), subFiles, hasSub, rows: rows.map((r) => ({ ...r, avgCtx: r.calls ? (r.input + r.cacheRead + r.cacheWrite) / r.calls : 0, usd: cost(r, P) })), tools: into.tools });
  }
  if (flag("--json")) return console.log(JSON.stringify(out, null, 1));
  for (const s of out) {
    console.log(`\n${s.file}   (subagent usage: ${s.hasSub ? "found" : "NONE in this transcript or a subagents/ folder: a subagent's own tokens are not counted here"})`);
    console.log("agent / model".padEnd(46) + "calls".padStart(6) + "fresh in".padStart(10) + "cache read".padStart(14) + "cache write".padStart(13) + "output".padStart(10) + "avg ctx".padStart(10) + "max ctx".padStart(10) + "  est. USD");
    let tot = 0, totKnown = true;
    for (const r of s.rows.sort((a, b) => b.cacheRead - a.cacheRead)) {
      if (r.usd == null) totKnown = false; else tot += r.usd;
      console.log((r.agent + " " + r.model).padEnd(46) + fmt(r.calls).padStart(6) + fmt(r.input).padStart(10) + fmt(r.cacheRead).padStart(14) + fmt(r.cacheWrite).padStart(13) + fmt(r.output).padStart(10) + fmt(r.avgCtx).padStart(10) + fmt(r.maxCtx).padStart(10) + "  " + (r.usd == null ? "n/a" : "$" + r.usd.toFixed(2)));
    }
    console.log(`list-price estimate: ${totKnown ? "$" + tot.toFixed(2) : "incomplete (a price is missing in usage.pricing.json)"}; a subscription is billed differently, so read this as relative weight`);
    for (const [a, t] of Object.entries(s.tools)) console.log(`tools ${a}: ` + Object.entries(t).sort((x, y) => y[1] - x[1]).map(([n, c]) => `${n} ${c}`).join(", "));
  }
}

/* ---------- static ---------- */
const sz = (p) => (fs.existsSync(p) ? fs.statSync(p).size : 0);
function sliceBytes(p, a, b) { // bytes of lines a..b (1-based) of a text file
  const lines = fs.readFileSync(p, "utf8").split("\n");
  return Buffer.byteLength(lines.slice(a - 1, b).join("\n"), "utf8");
}
function staticReport() {
  const N = opt("--class", "5");
  const cdir = path.join(ROOT, "class" + N);
  const cfg = JSON.parse(fs.readFileSync(path.join(cdir, "pipeline.config.json"), "utf8"));
  const pfx = cfg.agentPrefix;
  const agent = (role) => path.join(ROOT, ".claude", "agents", `${pfx}-${role}.md`);
  const rows = [];
  const add = (role, what, bytes, note = "") => rows.push({ role, what, bytes, note });

  const claude = fs.readFileSync(path.join(ROOT, "CLAUDE.md"), "utf8");
  add("main (every session)", "CLAUDE.md", sz(path.join(ROOT, "CLAUDE.md")));
  const prose = claude.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, ""); // imports are not read inside code
  const imp = [...prose.matchAll(/(?:^|\s)@([\w./-]+\.md)\b/g)].map((m) => m[1]);
  for (const f of imp) add("main (every session)", "auto-imported by CLAUDE.md: " + f, sz(path.join(ROOT, f)), "pulled in whether or not the session builds tools");
  if (!imp.length) add("main (every session)", "no auto-imports in CLAUDE.md", 0);
  add("main (build session)", "udgam_maths_claude.md, read on demand", sz(path.join(ROOT, "udgam_maths_claude.md")), imp.length ? "already counted above" : "");

  const ch = opt("--ch");
  const chapters = fs.existsSync(path.join(cdir, "work")) ? fs.readdirSync(path.join(cdir, "work")) : [];
  const chDir = chapters.find((c) => ch ? c.endsWith("_ch" + ch) : true);
  let slot = opt("--slot");
  if (chDir && !slot) slot = fs.readdirSync(path.join(cdir, "work", chDir)).find((s) => /^M\d/.test(s));
  const docs = (n) => path.join(cdir, "docs", n);
  add("builder", "agent file", sz(agent("tool-builder")));
  add("builder", "PREFLIGHT.md (whole)", sz(docs("PREFLIGHT.md")));
  add("builder", "LAYOUT.md (whole)", sz(docs("LAYOUT.md")));
  const bc = fs.readFileSync(docs("BUILD_CARD.md"), "utf8").split("\n");
  const i7 = bc.findIndex((l) => /^## 7\./.test(l));
  add("builder", "BUILD_CARD.md sections 1-6", Buffer.byteLength(bc.slice(0, i7).join("\n"), "utf8"), "decisions log (7, 8) is never read through");
  if (chDir && slot) {
    const sd = path.join(cdir, "work", chDir, slot);
    add("builder", `brief.md (${slot})`, sz(path.join(sd, "brief.md")));
    add("builder", `tool.tsx (${slot})`, sz(path.join(sd, "tool.tsx")), "read in full once, then by range");
    const r = spawnSync(process.execPath, ["lib/build/readlist.mjs", slot, "--ch", String(chDir.match(/_ch(\d+)$/)?.[1]), "--print"], { cwd: cdir, encoding: "utf8" });
    let pat = 0;
    for (const m of (r.stdout || "").matchAll(/\|\s*\d+\s*\|\s*`class\d+\/docs\/PATTERNS\.md`\s*\|\s*(\d+)-(\d+)/g)) pat += sliceBytes(docs("PATTERNS.md"), +m[1], +m[2]);
    add("builder", "PATTERNS.md sections named by readlist", pat, "from readlist.mjs --print");
  }
  for (const role of ["maths-reviewer", "visual-reviewer", "play-tester", "upload-auditor", "image-agent"]) {
    const a = fs.readFileSync(agent(role), "utf8");
    add(role, "agent file", Buffer.byteLength(a));
    const named = [...new Set([...a.matchAll(/class\d+\/docs\/([A-Z_]+\.md)/g)].map((m) => m[1]))];
    for (const d of named) add(role, `names docs/${d}`, sz(docs(d)), "named; may be read in part");
  }
  if (flag("--json")) return console.log(JSON.stringify(rows, null, 1));
  console.log(`static context, class ${N} (prefix ${pfx}); tokens = bytes / 4, a rough estimate and NOT a tokenizer count\n`);
  let last = "", sub = 0;
  const flush = () => { if (last && last !== "") console.log(" ".repeat(50) + `subtotal ${kb(sub)} (~${fmt(sub / 4)} tok)\n`); };
  for (const r of rows) {
    if (r.role !== last) { flush(); sub = 0; last = r.role; console.log(r.role); }
    sub += r.role.startsWith("main (build") || r.note.startsWith("named") ? 0 : r.bytes;
    console.log("  " + r.what.padEnd(50) + kb(r.bytes).padStart(10) + (r.note ? "   " + r.note : ""));
  }
  flush();
}

if (cmd === "session") await session();
else if (cmd === "static") staticReport();
else console.log("usage: node usage.mjs session [FILE.jsonl | --latest | --all] [--dir D] [--json]\n       node usage.mjs static [--class N] [--ch N] [--slot ID] [--json]");
