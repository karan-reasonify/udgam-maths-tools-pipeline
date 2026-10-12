/* Configuration for every script of a class folder. ONE code base serves every class: a class-specific fact comes from
 * this folder's pipeline.config.json or is derived from `defaults.class` (docs/README.md lists every key).
 *
 * Env precedence, highest first:
 *   1. the real process environment
 *   2. maths_pipeline/.env                 (injected; secrets)
 *   3. Python-backend/.env                  (shared managed config, for anything .env lacks)
 * The file list lives in pipeline.config.json -> envFiles. Values are never printed:
 * doctor reports only "set (N chars)" and which file a key came from.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", ".."); // the class folder (this file is lib/core/env.mjs)
export const PIPELINE_ROOT = path.resolve(ROOT, "..");                                  // maths_pipeline/
export const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, "pipeline.config.json"), "utf8"));
export const fromRoot = (p) => path.resolve(ROOT, p);

/* keys a class config may leave out: the same value in every class, filled in here so a new class needs only its own file */
const KEY_DEFAULTS = { runtime: "runtime/runtime.tsx", skeleton: "runtime/skeleton.tsx", legacySkeleton: "lib/build/skeleton.voiced.tsx", workDir: "work", outDir: "output-preview", bundled: ["@use-gesture/react"] };
for (const [k, v] of Object.entries(KEY_DEFAULTS)) if (CONFIG[k] === undefined) CONFIG[k] = v;

/* ── what is class-specific, and where it comes from (README.md "Config keys") ───────────────────────────────
   Nothing below is typed per class in the code: it is `defaults.class` or an optional key of pipeline.config.json. */
export const CLASS_NUM = Number(CONFIG.defaults.class);
export const CLASS_LABEL = `Class ${CLASS_NUM}`;
/* how messages, the sidecar's `build.runtime` and the docs name this class's folder: classDir, else class<N> */
export const CLASS_DIR = String(CONFIG.classDir || `class${CLASS_NUM}`);
/* the agents that serve this class (.claude/agents/<agentPrefix>-<role>.md): agentPrefix, else udgam<N> */
export const AGENT_PREFIX = String(CONFIG.agentPrefix || `udgam${CLASS_NUM}`);
export const agentName = (role) => `${AGENT_PREFIX}-${role}`;
/* the children's age band the prompts name: ageBand, else class + 4 to class + 6 (class 4: 8-10, class 5: 9-11) */
export const AGE_BAND = String(CONFIG.ageBand || `${CLASS_NUM + 4}-${CLASS_NUM + 6}`);
/* other classes' skin libraries this class may READ (never write), as CLASS FOLDERS relative to this one (images/library.mjs adds
   assets/skins and .images-cache/raw). The config lists them in the form classctl writes: skins directories, ["assets/skins",
   "../class<M>/assets/skins"]; a bare class folder ("../class<M>") works too. The class's own entry is dropped (its library is read first
   anyway), so the list is only the siblings. Default: none. */
export const skinLibraries = () => {
  const out = [];
  for (const raw of Array.isArray(CONFIG.skinLibraries) ? CONFIG.skinLibraries : []) {
    const rel = String(raw).replace(/\\/g, "/").replace(/\/+$/, "").replace(/(^|\/)assets\/skins$/, "");
    if (!rel || rel === "." || path.resolve(ROOT, rel) === ROOT || out.includes(rel)) continue;
    out.push(rel);
  }
  return out;
};
/* the read fence's state file. Default: .fence.json in this class folder. The hook in .claude/hooks reads ONE file, so a
   class that is fenced by it points here at that file (every later class: "../class<first>/.fence.json") */
export const fenceFilePath = () => fromRoot(CONFIG.fenceFile || ".fence.json");

/* KEY=VALUE lines; CRLF, comments, blank lines, optional quotes, `export ` prefix.
   An unquoted value loses a trailing " # comment"; a quoted one keeps everything. */
export function parseEnvText(text) {
  const out = {};
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2];
    const q = v[0];
    if (q === '"' || q === "'") {
      const end = v.lastIndexOf(q);
      v = v.slice(1, end > 0 ? end : undefined);
      if (q === '"') v = v.replace(/\\n/g, "\n").replace(/\\"/g, '"');
    } else {
      v = v.replace(/\s+#.*$/, "").trim();
    }
    out[m[1]] = v;
  }
  return out;
}

let cached = null;
export function env() {
  if (cached) return cached;
  const files = (CONFIG.envFiles || []).map(fromRoot);
  const vals = {};
  const from = {};
  /* walk from the lowest-precedence file up, so a higher file overwrites */
  for (const f of [...files].reverse()) {
    if (!fs.existsSync(f)) continue;
    for (const [k, v] of Object.entries(parseEnvText(fs.readFileSync(f, "utf8")))) {
      vals[k] = v;
      from[k] = f;
    }
  }
  const nonEmpty = (v) => v !== undefined && v !== null && v !== "";
  const get = (k, dflt) => (nonEmpty(process.env[k]) ? process.env[k] : nonEmpty(vals[k]) ? vals[k] : dflt);
  const label = (f) => (path.resolve(f) === path.resolve(PIPELINE_ROOT, ".env") ? ".env"
    : path.basename(path.dirname(f)) + "/" + path.basename(f));
  const source = (k) => (nonEmpty(process.env[k]) ? "process env" : from[k] ? label(from[k]) : null);
  cached = { get, source, has: (k) => nonEmpty(get(k)), files: files.map((f) => ({ file: f, exists: fs.existsSync(f) })) };
  return cached;
}

export const mask = (v) => (v === undefined || v === null || v === "" ? "missing" : `set (${String(v).length} chars)`);

/* "destination for lp is lpv2" — the default, overridable with LP_DEST. Only lpv2 exists today. */
export function lpDest() {
  const d = String(process.env.LP_DEST || CONFIG.lpDest || "lpv2").toLowerCase();
  if (d !== "lpv2") throw new Error(`LP_DEST=${d} is not supported; only lpv2 (the lp2_* tables) is wired`);
  return d;
}
