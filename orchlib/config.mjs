/* orchlib/config: the orchestration policy (../orchestration.json) merged with a class's override
 * (class<N>/pipeline.config.json "orchestration"), and the facts about a class and a chapter that every
 * orch command needs. Class-neutral: a class made by `classctl new` is found by its folder name. */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const sha = (s) => crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
const stripBom = (s) => String(s).replace(/^\uFEFF/, "");
export function readJson(file, fallback = undefined) {
  try { return JSON.parse(stripBom(fs.readFileSync(file, "utf8"))); }
  catch (e) { if (fallback !== undefined) return fallback; throw new Error(`${file}: ${e.message}`); }
}
export function writeJsonAtomic(file, obj) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = file + "." + process.pid + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 1) + "\n");
  fs.renameSync(tmp, file);
}
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
export function deepMerge(a, b) {
  if (!isObj(a) || !isObj(b)) return b === undefined ? a : b;
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = isObj(v) && isObj(a[k]) ? deepMerge(a[k], v) : v;
  return out;
}

/* the class folder for N under root (class<N>/ with a pipeline.config.json) */
export function classDirOf(root, n) {
  const d = path.join(root, `class${n}`);
  if (!fs.existsSync(path.join(d, "pipeline.config.json"))) throw new Error(`no class${n}/pipeline.config.json under ${root}`);
  return d;
}
export function classNumOf(classDir) {
  const cfg = readJson(path.join(classDir, "pipeline.config.json"), {});
  const m = /class(\d+)$/.exec(path.basename(classDir));
  return Number((cfg.defaults && cfg.defaults.class) ?? (m ? m[1] : NaN));
}

export function loadPolicy({ root = ROOT, classDir = null } = {}) {
  const base = readJson(path.join(root, "orchestration.json"), null);
  if (!base) throw new Error(`no orchestration.json in ${root}`);
  const cfg = classDir ? readJson(path.join(classDir, "pipeline.config.json"), {}) : {};
  const pol = deepMerge(base, cfg.orchestration || {});
  pol._sources = ["orchestration.json"].concat(cfg.orchestration && Object.keys(cfg.orchestration).some((k) => !k.startsWith("$")) ? [`${path.basename(classDir)}/pipeline.config.json orchestration`] : []);
  return pol;
}

/* a limit: a number, or { base, perTool, min } -> base + perTool x tools, rounded up */
export function limitOf(v, tools = 0) {
  if (typeof v === "number") return v;
  if (!isObj(v)) return Infinity;
  return Math.max(v.min ?? 0, Math.ceil((v.base || 0) + (v.perTool || 0) * tools));
}

export const ESC = (pol) => (pol.escalation && pol.escalation.suffix) || "-escalated";
export const isTwin = (pol, role) => ((pol.escalation && pol.escalation.twins) || []).includes(role);
/* the model of a role at a tier ("base" | "escalated") */
export function modelOf(pol, role, tier = "base") {
  const M = pol.models || {};
  if (tier === "escalated" && isTwin(pol, role)) return M[role + ESC(pol)] || "opus";
  return M[role] || "inherit";
}

export function classInfo(root, n) {
  const dir = classDirOf(root, n);
  const cfg = readJson(path.join(dir, "pipeline.config.json"));
  const N = classNumOf(dir);
  const prefix = cfg.agentPrefix || (N === 4 ? "udgam" : `udgam${N}`);
  const D = cfg.defaults || {};
  const subject = D.subject || "maths";
  return { n: N, dir, cfg, prefix, name: path.basename(dir), subject, pub: D.pub || "indiannica", medium: D.medium || "eng" };
}

/* the chapter's work folder: the one under work/ that ends in _ch<n> and names this class's subject+number */
export function chapterOf(info, ch) {
  const work = path.join(info.dir, info.cfg.workDir || "work");
  const want = `${info.subject}${info.n}_ch${ch}`;
  const hit = fs.existsSync(work) ? fs.readdirSync(work).find((d) => d.endsWith(want) && fs.statSync(path.join(work, d)).isDirectory()) : null;
  const id = hit || `${info.pub}_${info.medium}_${want}`;
  return { ch: Number(ch), id, dir: path.join(work, id), exists: !!hit };
}

export function slotsOf(chapterDir) {
  if (!fs.existsSync(chapterDir)) return [];
  return fs.readdirSync(chapterDir).filter((x) => fs.existsSync(path.join(chapterDir, x, "slot.json")) || /^M\d+\.S\d+\.T\d+\.C\d+\.2D\d+$/.test(x) && fs.existsSync(path.join(chapterDir, x, "brief.md"))).sort();
}

/* a class's own lib module (each class carries its own copy, made by classctl) */
export const classLib = (classDir, rel) => import(pathToFileURL(path.join(classDir, ...rel.split("/"))).href);

/* argv -> { _: [], key: value | true } (the same rules as the class CLIs) */
export function parseArgs(argv, booleans = []) {
  const bool = new Set(booleans), out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) { out._.push(a); continue; }
    const eq = a.indexOf("=");
    if (eq > 2) { out[a.slice(2, eq)] = a.slice(eq + 1); continue; }
    const key = a.slice(2), next = argv[i + 1];
    if (!bool.has(key) && next !== undefined && !next.startsWith("--")) { out[key] = next; i++; } else out[key] = true;
  }
  return out;
}

/* simple glob for checkerFiles: "lib/check/*.mjs" (one * in the last segment) */
export function globFiles(base, pattern) {
  const parts = pattern.split("/"), last = parts.pop(), dir = path.join(base, ...parts);
  if (!fs.existsSync(dir)) return [];
  if (!last.includes("*")) return fs.existsSync(path.join(dir, last)) ? [path.join(dir, last)] : [];
  const re = new RegExp("^" + last.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$");
  return fs.readdirSync(dir).filter((f) => re.test(f) && !/\.test\.mjs$/.test(f)).sort().map((f) => path.join(dir, f));
}
