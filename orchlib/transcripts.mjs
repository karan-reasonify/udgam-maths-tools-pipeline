/* orchlib/transcripts: reading Claude Code transcripts (~/.claude/projects/<project slug>/*.jsonl), shared by usage.mjs
 * (reports, compare, window) and orch gate (the session-limit guard). Provider-reported numbers only.
 *
 * One model response is written as several lines that share message.id: usage is taken once per id (the line with the
 * largest output_tokens); tool_use blocks are counted on every line. A subagent is either `isSidechain` lines in the
 * session file or <session>/subagents/*.jsonl. The Task/Agent tool_use that launched it names its subagent_type and
 * prompt; that is how a subagent is attributed to a role, a chapter and its slots. */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import readline from "node:readline";

export function projectDir(root, given = null) {
  if (given) return given;
  const base = path.join(os.homedir(), ".claude", "projects");
  const slug = root.replace(/[^A-Za-z0-9]/g, "-");
  for (const s of [slug, slug.replace(/^./, (c) => c.toLowerCase()), slug.replace(/^./, (c) => c.toUpperCase())])
    if (fs.existsSync(path.join(base, s))) return path.join(base, s);
  return null;
}

export const SLOT_RE = /\bM\d+\.S\d+\.T\d+\.C\d+\.2D\d+\b/g;
export const CHAPTER_RE = /\b(?:[a-z]+_){2}([a-z]+)(\d+)_ch(\d+)\b|--class\s+(\d+)\s+--ch\s+(\d+)|class(\d+)\/work\/[^\s/"]*_ch(\d+)/;

/* role from an agent name: "<prefix>-<role>[-escalated]" -> role (prefix-free) */
export function roleOfAgent(name) {
  const n = String(name || "");
  const m = /^udgam\d*-(.+)$/.exec(n);
  return m ? m[1] : n || "general";
}
export function chapterOfText(t) {
  const m = CHAPTER_RE.exec(String(t || ""));
  if (!m) return null;
  if (m[3]) return `class${m[2]} ch${m[3]}`;
  if (m[5]) return `class${m[4]} ch${m[5]}`;
  if (m[7]) return `class${m[6]} ch${m[7]}`;
  return null;
}

const CTX = (u) => (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);

/* one transcript file -> { calls: [{ id, model, at, agent, usage, ctx }], launches: [{ toolUseId, agentType, prompt, at }],
   toolUses: [{ name, input, agent, at }], sidechains } */
export async function readTranscript(file, forceAgent = null) {
  const seen = new Map(), launches = [], toolUses = [];
  let sidechains = 0;
  const rl = readline.createInterface({ input: fs.createReadStream(file, "utf8"), crlfDelay: Infinity });
  for await (const line of rl) {
    let o; try { o = JSON.parse(line); } catch { continue; }
    const m = o.message;
    if (!m || m.role !== "assistant") continue;
    if (o.isSidechain) sidechains++;
    const agent = forceAgent || (o.isSidechain ? "sub:" + String(o.agentId || o.sessionId || "?").slice(0, 8) : "main");
    if (Array.isArray(m.content)) for (const c of m.content) if (c.type === "tool_use") {
      toolUses.push({ name: c.name, input: c.input || {}, agent, at: o.timestamp || null, id: c.id });
      if ((c.name === "Task" || c.name === "Agent") && c.input) launches.push({ toolUseId: c.id, agentType: c.input.subagent_type || "general", prompt: String(c.input.prompt || c.input.description || ""), at: o.timestamp || null, by: agent });
    }
    if (!m.usage || !m.id) continue;
    const prev = seen.get(m.id);
    if (!prev || (m.usage.output_tokens ?? 0) >= (prev.usage.output_tokens ?? 0)) seen.set(m.id, { id: m.id, usage: m.usage, model: m.model, agent, at: o.timestamp || null });
  }
  const calls = [...seen.values()].filter((c) => c.model && c.model !== "<synthetic>").map((c) => ({ ...c, ctx: CTX(c.usage) }));
  return { file, calls, launches, toolUses, sidechains };
}

/* a session file and its subagents/ folder */
export async function readSession(file) {
  const main = await readTranscript(file);
  const subDir = file.replace(/\.jsonl$/, "") + path.sep + "subagents";
  const subs = [];
  if (fs.existsSync(subDir)) for (const f of fs.readdirSync(subDir).filter((x) => x.endsWith(".jsonl")).sort()) subs.push(await readTranscript(path.join(subDir, f), "sub:" + f.replace(/\.jsonl$/, "").slice(-8)));
  return { main, subs };
}

export function sessionFiles(dir, { sinceMs = 0 } = {}) {
  if (!dir || !fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".jsonl")).map((f) => ({ file: path.join(dir, f), t: fs.statSync(path.join(dir, f)).mtimeMs }))
    .filter((x) => x.t >= sinceMs).sort((a, b) => b.t - a.t).map((x) => x.file);
}

/* list-price USD of one call (null when a needed price is missing) */
export function callUsd(c, pricing) {
  const P = (pricing && pricing.models) || {};
  const p = P[c.model] || P[Object.keys(P).find((k) => String(c.model).includes(k) || k.includes(String(c.model)))];
  if (!p) return null;
  const u = c.usage, parts = [[u.input_tokens, p.input], [u.output_tokens, p.output], [u.cache_read_input_tokens, p.cacheRead], [u.cache_creation_input_tokens, p.cacheWrite5m]];
  if (parts.some(([n, pr]) => (n || 0) > 0 && pr == null)) return null;
  return parts.reduce((a, [n, pr]) => a + ((n || 0) / 1e6) * (pr || 0), 0);
}

/* the rolling window: every call in the last `hours` across the project's transcripts */
export async function windowUsage({ root, dir = null, hours = 5, pricing = null, now = Date.now() }) {
  const pd = projectDir(root, dir);
  const since = now - hours * 3600e3;
  const out = { dir: pd, hours, calls: 0, usd: 0, usdKnown: true, ctx: 0, output: 0, opusCalls: 0, agents: 0, files: 0 };
  if (!pd) return { ...out, note: "no transcript folder for this project" };
  for (const f of sessionFiles(pd, { sinceMs: since })) {
    out.files++;
    const { main, subs } = await readSession(f);
    out.agents += subs.length + new Set(main.calls.filter((c) => c.agent !== "main").map((c) => c.agent)).size;
    for (const t of [main, ...subs]) for (const c of t.calls) {
      if (c.at && Date.parse(c.at) < since) continue;
      out.calls++; out.ctx += c.ctx; out.output += c.usage.output_tokens || 0;
      if (/opus/.test(c.model)) out.opusCalls++;
      const u = callUsd(c, pricing); if (u == null) out.usdKnown = false; else out.usd += u;
    }
  }
  return out;
}
