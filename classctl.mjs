#!/usr/bin/env node
/* classctl: carry the CODE of one class folder to another, and make a new class folder.
 *
 *   node classctl.mjs status [--root dir]
 *   node classctl.mjs sync --from 5 --to 4 [--apply] [--only code,docs,agents,runbook] [--backup-dir d]
 *                          [--on-conflict theirs|ours|markers] [--keep-target glob[,glob]] [--no-subst] [--diff glob[,glob]]
 *   node classctl.mjs new  --class 3 [--from 5] [--dry-run] [--port p] [--no-link] [--wire]
 *   node classctl.mjs restore --class 4 --backup <dir> [--apply]
 *   node classctl.mjs rootdocs --from <stage dir> [--apply]
 *
 * `sync` is a DRY RUN until --apply. A dry run writes nothing at all (no lock, no log, no temp file inside the
 * pipeline folder). What is copied, merged, preserved or never touched is classctl.manifest.json; the model
 * is in CLASSCTL.md. Never touched, whatever the flags: work/, output-preview/, runtime/frozen/, .fence.json,
 * node_modules/, .images-cache/, assets/, .env, config.json.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";

const HERE = path.dirname(fileURLToPath(import.meta.url));

/* ── args ───────────────────────────────────────────────────────────────────────── */
const BOOL = new Set(["apply", "dry-run", "link-node-modules", "no-link", "wire", "no-subst", "help", "json"]);
const MULTI = new Set(["keep-target"]);
export function parseArgs(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) { o._.push(a); continue; }
    let key = a.slice(2), val;
    const eq = key.indexOf("=");
    if (eq >= 0) { val = key.slice(eq + 1); key = key.slice(0, eq); }
    else if (BOOL.has(key)) val = true;
    else val = argv[++i];
    if (MULTI.has(key)) o[key] = [...(o[key] || []), ...String(val).split(",").map((s) => s.trim()).filter(Boolean)];
    else o[key] = val;
  }
  return o;
}

/* ── small helpers ──────────────────────────────────────────────────────────────── */
const md5 = (b) => crypto.createHash("md5").update(b).digest("hex");
const sha12 = (b) => crypto.createHash("sha256").update(b).digest("hex").slice(0, 12);
const lf = (s) => s.replace(/\r\n/g, "\n");
const eolOf = (s) => { const c = (s.match(/\r\n/g) || []).length, l = (s.match(/(?<!\r)\n/g) || []).length; return c > l ? "crlf" : "lf"; };
const toEol = (s, eol) => (eol === "crlf" ? s.replace(/\n/g, "\r\n") : s);
const countLines = (s) => (s === "" ? 0 : s.split("\n").length - (s.endsWith("\n") ? 1 : 0));
const P = (dir, rel) => path.join(dir, ...String(rel).split("/"));
const slash = (p) => p.split(path.sep).join("/");
const pad = (s, n) => String(s).padEnd(n);
const stripBom = (s) => s.replace(/^\uFEFF/, "");
const clone = (x) => JSON.parse(JSON.stringify(x));
const isObj = (x) => x && typeof x === "object" && !Array.isArray(x);
const RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i; // Windows device names: never open them
const stamp = (d = new Date()) => {
  const z = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}-${z(d.getHours())}${z(d.getMinutes())}`;
};

const exists = (p) => { try { fs.lstatSync(p); return true; } catch { return false; } };
const isLink = (p) => { try { return fs.lstatSync(p).isSymbolicLink(); } catch { return false; } };

function globToRe(g) {
  let re = "";
  for (let i = 0; i < g.length; i++) {
    const c = g[i];
    if (c === "*") {
      if (g[i + 1] === "*") {
        if (g[i + 2] === "/") { re += "(?:.*/)?"; i += 2; } else { re += ".*"; i += 1; }
      } else re += "[^/]*";
    } else if (c === "?") re += "[^/]";
    else re += c.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp("^" + re + "$", "i");
}
const reCache = new Map();
function globMatch(g, rel) {
  let re = reCache.get(g);
  if (!re) { re = globToRe(g); reCache.set(g, re); }
  return re.test(g.includes("/") ? rel : rel.split("/").pop());
}
const matchAny = (globs, rel) => (globs || []).some((g) => globMatch(g, rel));

/* the only temp files classctl makes (for git merge-file / diff) live in os.tmpdir(), never in the pipeline */
let TMP = null;
function tmpFile(name, data) {
  if (!TMP) TMP = fs.mkdtempSync(path.join(os.tmpdir(), "classctl-"));
  const f = path.join(TMP, name);
  fs.writeFileSync(f, data);
  return f;
}
process.on("exit", () => { try { if (TMP) fs.rmSync(TMP, { recursive: true, force: true }); } catch { /* ignore */ } });

let GIT;
function gitBin() {
  if (GIT !== undefined) return GIT;
  GIT = false;
  for (const c of ["git", "C:/Program Files/Git/cmd/git.exe", "C:/Program Files/Git/bin/git.exe"]) {
    const r = spawnSync(c, ["--version"], { encoding: "utf8" });
    if (!r.error && r.status === 0) { GIT = c; break; }
  }
  return GIT;
}

/* lines added / removed going from a to b (LF text) */
function numstat(a, b) {
  if (a === b) return { add: 0, del: 0 };
  const g = gitBin();
  if (g) {
    const fa = tmpFile("a.txt", a), fb = tmpFile("b.txt", b);
    const r = spawnSync(g, ["-c", "core.autocrlf=false", "diff", "--no-index", "--numstat", "--no-renames", fa, fb], { encoding: "utf8", maxBuffer: 1 << 28 });
    const m = /^(\d+)\s+(\d+)\s/m.exec(r.stdout || "");
    if (m) return { add: +m[1], del: +m[2] };
  }
  const count = (x) => { const mm = new Map(); for (const l of x.split("\n")) mm.set(l, (mm.get(l) || 0) + 1); return mm; };
  const ca = count(a), cb = count(b);
  let add = 0, del = 0;
  for (const [l, n] of cb) add += Math.max(0, n - (ca.get(l) || 0));
  for (const [l, n] of ca) del += Math.max(0, n - (cb.get(l) || 0));
  return { add, del };
}

/* three-way merge of LF text: { text, conflicts } or { error } */
function merge3(ours, base, theirs) {
  const g = gitBin();
  if (!g) return { error: "git was not found, so no three-way merge is possible" };
  const o = tmpFile("ours.txt", ours), b = tmpFile("base.txt", base), t = tmpFile("theirs.txt", theirs);
  const r = spawnSync(g, ["merge-file", "-p", "-L", "target", "-L", "last-sync", "-L", "source", o, b, t], { encoding: "utf8", maxBuffer: 1 << 28 });
  if (r.error || r.status === null || r.status < 0 || r.status > 127) return { error: `git merge-file failed (${r.status})` };
  return { text: r.stdout, conflicts: r.status };
}

/* ── the writer: every change to disk goes through here, and only when applying ─────── */
class Writer {
  constructor(apply) { this.apply = !!apply; this.log = []; }
  guard(what) { if (!this.apply) throw new Error(`classctl bug: tried to ${what} in a dry run`); }
  mkdir(d) { this.guard("mkdir " + d); fs.mkdirSync(d, { recursive: true }); }
  write(f, data) {
    this.guard("write " + f);
    fs.mkdirSync(path.dirname(f), { recursive: true });
    const tmp = `${f}.classctl-tmp`;
    fs.writeFileSync(tmp, data);
    /* Windows: a file another program has open (the viewer reading bundle.js) refuses a rename for a moment */
    for (let i = 0; ; i++) {
      try { fs.renameSync(tmp, f); break; }
      catch (e) {
        if (i < 5 && /^(EPERM|EBUSY|EACCES)$/.test(e.code)) { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 150); continue; }
        try { fs.unlinkSync(tmp); } catch { /* ignore */ }
        throw e;
      }
    }
    this.log.push(f);
  }
  rmTree(p) { this.guard("remove " + p); fs.rmSync(p, { recursive: true, force: true }); }
  copy(from, to) { this.guard("copy to " + to); fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); }
  unlink(f) { this.guard("unlink " + f); fs.unlinkSync(f); }
  junction(target, link) { this.guard("link " + link); fs.symlinkSync(target, link, "junction"); }
}

/* ── manifest, classes, config ──────────────────────────────────────────────────── */
function loadManifest(root, explicit) {
  const cands = [explicit, path.join(root, "classctl.manifest.json"), path.join(HERE, "classctl.manifest.json")].filter(Boolean);
  for (const c of cands) if (exists(c)) return { manifest: JSON.parse(stripBom(fs.readFileSync(c, "utf8"))), file: c };
  throw new Error("classctl.manifest.json not found (looked in the root and next to classctl.mjs)");
}

function discoverClasses(root, M) {
  const re = new RegExp(M.classDirPattern || "^class(\\d+)$");
  const out = [];
  for (const d of fs.readdirSync(root, { withFileTypes: true })) {
    const m = re.exec(d.name);
    if (!d.isDirectory() || !m || RESERVED.test(d.name)) continue;
    const dir = path.join(root, d.name);
    if (!exists(path.join(dir, "pipeline.config.json"))) continue;
    out.push({ n: Number(m[1]), name: d.name, dir });
  }
  return out.sort((a, b) => a.n - b.n);
}
const readCfg = (dir) => JSON.parse(stripBom(fs.readFileSync(path.join(dir, "pipeline.config.json"), "utf8")));

const fill = (s, vars) => String(s).replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? String(vars[k]) : `{{${k}}}`));

function agentPrefixOf(M, n, cfg) {
  if (cfg && cfg.agentPrefix) return String(cfg.agentPrefix);
  const legacy = M.legacyAgentPrefix || {};
  if (legacy[String(n)]) return legacy[String(n)];
  return fill(M.defaultAgentPrefix || "udgam{{N}}", { N: n });
}
function viewerPortOf(M, n, cfg) {
  const vp = M.viewerPort || { base: 5175, perClass: 2 };
  return Number(cfg && cfg.viewerPort != null ? cfg.viewerPort : vp.base + vp.perClass * Number((cfg && cfg.defaults && cfg.defaults.class) ?? n));
}
const ageVars = (M, n) => {
  const a = M.ageBand || { from: 4, to: 6 };
  const lo = n + a.from, hi = n + a.to;
  return { AGE: `${lo} to ${hi}`, AGE_DASH: `${lo}-${hi}`, AGE_LOW: lo, AGE_HIGH: hi };
};
// GATE = the PREFLIGHT number of the answer-gate row (class 4 carries one extra row, the a/b fraction rule)
const agentVars = (M, n, pfx) => ({ N: n, PFX: pfx, DIR: `class${n}`, GATE: (M.preflightAnswerGate || {})[String(n)] ?? (M.preflightAnswerGate || {}).default ?? 27, ...ageVars(M, n) });

/* ── walking a class folder (allowlist by manifest; skips never-touch, device names, links) ── */
const isNever = (M, rel) => matchAny(M.neverTouch, rel);
function walkClass(dir, M) {
  const out = [];
  (function rec(d, rel) {
    let ents;
    try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (RESERVED.test(e.name) || e.name.endsWith(".classctl-tmp")) continue;
      const r = rel ? `${rel}/${e.name}` : e.name;
      const abs = path.join(d, e.name);
      let st; try { st = fs.lstatSync(abs); } catch { continue; }
      if (st.isSymbolicLink()) continue;
      if (st.isDirectory()) { if (!isNever(M, r + "/")) rec(abs, r); }
      else if (st.isFile()) { if (!isNever(M, r)) out.push(r); }
    }
  })(dir, "");
  return out;
}
const matchEntry = (M, rel) => M.code.find((e) => globMatch(e.glob, rel)) || null;

/* ── text projection: substitutions, tails ───────────────────────────────────────── */
const looksText = (rel, M, buf) => {
  const ext = path.extname(rel).toLowerCase();
  return (M.substitutions.textExt || []).includes(ext) && !buf.includes(0);
};
function substitute(c, entry, rel, s) {
  const S = c.manifest.substitutions;
  if (!c.subst || !S || !S.enabled || entry.subst === false || matchAny(S.skipGlobs, rel)) return s;
  const vars = { SRC: c.from.n, DST: c.to.n };
  for (const r of S.rules) s = s.replace(new RegExp(fill(r.find, vars), "g"), fill(r.replace, vars));
  return s;
}
function splitTail(text, spec) {
  const lines = text.split("\n");
  for (const m of spec.markers || []) {
    const re = new RegExp(m);
    const i = lines.findIndex((l) => re.test(l));
    if (i >= 0) { const head = lines.slice(0, i).join("\n") + (i ? "\n" : ""); return { head, tail: text.slice(head.length), found: true }; }
  }
  if (spec.afterLastFence) {
    let last = -1;
    lines.forEach((l, i) => { if (/^```\s*$/.test(l)) last = i; });
    if (last >= 0) { const head = lines.slice(0, last + 1).join("\n") + "\n"; return { head, tail: text.slice(head.length), found: true }; }
  }
  return { head: text, tail: "", found: false };
}

/* ── the new-class pieces that cannot be copied ───────────────────────────────────── */
function newTail(c, name, srcTail) {
  const d = stamp().replace(/^(\d{4})(\d\d)(\d\d)-.*/, "$1-$2-$3");
  const N = c.to.n, S = c.from.n;
  if (name === "readme") {
    return `\n<!-- classctl:notes -->\nThis folder was made on ${d} by \`node classctl.mjs new --class ${N} --from ${S}\` from the code of \`class${S}/\` (docs, lib, runtime head, viewer).\n` +
      `It has no finished tool and no frozen runtime: the first \`node cli.mjs runtime freeze\` makes r1 from the head. Chapter ids read \`${fill(c.manifest.chapterIdTemplate, { N })}\`;\n` +
      `the viewer runs on port ${c.defaults.port}; the agents are \`.claude/agents/${c.defaults.prefix}-*.md\`. Later code changes of another class come with\n` +
      `\`node classctl.mjs sync --from <class> --to ${N}\` (see \`../CLASSCTL.md\`).\n`;
  }
  if (name === "buildcard") {
    const m = /^## 8\.[\s\S]*$/m.exec(srcTail);
    return `## 7. Decisions log\n\n| date | decision | why |\n|---|---|---|\n| ${d} | **\`class${N}/\` is a copy of \`class${S}/\`'s code** (made by \`classctl new\`): docs, lib, runtime head, viewer; no work, no output, no frozen runtime. Sections 1-6 above are the rules and their reasons as they stood in class ${S}; this table is class ${N}'s own from here on, and \`classctl sync\` never overwrites it. Chapter ids \`${fill(c.manifest.chapterIdTemplate, { N })}\`, viewer port ${c.defaults.port}, textbook folder \`${c.defaults.textbooks}\` | the owner asked for class ${N} |\n\n` + (m ? m[0] : "## 8. Open questions\n");
  }
  return srcTail;
}

/* ── config / package.json / lock ─────────────────────────────────────────────────── */
function deepAddMissing(tgt, src, pre, skip, added) {
  for (const k of Object.keys(src)) {
    const p = [...pre, k].join(".");
    if (skip.has(p)) continue;
    if (!(k in tgt)) { tgt[k] = clone(src[k]); added.push(p); }
    else if (isObj(tgt[k]) && isObj(src[k])) deepAddMissing(tgt[k], src[k], [...pre, k], skip, added);
  }
}
function deriveSkinLibs(srcLibs, dstN, classes) {
  if (!Array.isArray(srcLibs) || !srcLibs.every((x) => typeof x === "string")) return clone(srcLibs);
  const isSib = (s) => /(^|[\\/])class\d+[\\/]/.test(s);
  const own = srcLibs.filter((s) => !isSib(s));
  const tpl = srcLibs.find(isSib) || "../class0/assets/skins";
  const sibs = classes.filter((k) => k.n !== dstN).map((k) => tpl.replace(/class\d+/, k.name));
  return [...(own.length ? own : ["assets/skins"]), ...sibs];
}
function deriveClassKey(c, key, tgtCfg) {
  const N = c.to.n, M = c.manifest;
  switch (key) {
    case "defaults.class": return N;
    case "textbooks": return c.defaults ? c.defaults.textbooks : fill(M.textbooksTemplate, { N });
    case "viewerPort": return c.defaults ? c.defaults.port : viewerPortOf(M, N, tgtCfg);
    case "agentPrefix": return c.defaults ? c.defaults.prefix : agentPrefixOf(M, N, tgtCfg);
    case "skinLibraries": return deriveSkinLibs(c.from.cfg.skinLibraries, N, c.classes);
    default: return undefined;
  }
}
const getPath = (o, p) => p.split(".").reduce((x, k) => (x == null ? undefined : x[k]), o);
function setPath(o, p, v) { const ks = p.split("."); let x = o; for (const k of ks.slice(0, -1)) x = x[k] = x[k] ?? {}; x[ks.at(-1)] = v; }

function newConfig(c) {
  const cfg = clone(c.from.cfg);
  for (const k of c.manifest.classKeys) {
    if (k === "skinLibraries" && cfg.skinLibraries === undefined) continue;
    setPath(cfg, k, deriveClassKey(c, k, null));
  }
  return cfg;
}
function mergeConfig(c, tgtCfg) {
  const skip = new Set(c.manifest.classKeys);
  const merged = clone(tgtCfg), added = [];
  deepAddMissing(merged, c.from.cfg, [], skip, added);
  for (const k of c.manifest.classKeys) {
    if (getPath(merged, k) === undefined && getPath(c.from.cfg, k) !== undefined) {
      setPath(merged, k, deriveClassKey(c, k, tgtCfg));
      added.push(k + " (derived for class " + c.to.n + ")");
    }
  }
  return { merged, added };
}

/* ── planning one file ────────────────────────────────────────────────────────────── */
const baseFile = (toDir, rel) => P(path.join(toDir, ".classctl", "base"), rel);
const readBase = (toDir, rel) => { try { return fs.readFileSync(baseFile(toDir, rel), "utf8"); } catch { return null; } };

function decide(c, { srcText, tgtText, baseText, generated }) {
  if (tgtText === srcText) return { action: "IDENTICAL", out: tgtText };
  if (baseText == null) return { action: "CHANGED", out: srcText, note: "no recorded base (first sync): replaced" };
  if (tgtText === baseText) return { action: "CHANGED", out: srcText };
  if (srcText === baseText) return { action: "KEPT-LOCAL", out: tgtText, note: "edited here, source unchanged since the last sync" };
  if (generated) return { action: "CHANGED", out: srcText, note: "generated file: source wins" };
  const m = merge3(tgtText, baseText, srcText);
  if (m.error) return conflict(c, srcText, tgtText, null, m.error);
  if (m.conflicts === 0) return { action: "MERGED", out: m.text, note: "3-way: your edits and the source's both kept" };
  return conflict(c, srcText, tgtText, m.text, `${m.conflicts} conflict(s)`);
}
function conflict(c, srcText, tgtText, markers, why) {
  const how = c.onConflict;
  if (how === "theirs") return { action: "CONFLICT", out: srcText, resolved: "theirs", note: `${why}: source version taken (--on-conflict theirs)` };
  if (how === "ours") return { action: "CONFLICT", out: tgtText, resolved: "ours", note: `${why}: target version kept (--on-conflict ours)` };
  if (how === "markers" && markers != null) return { action: "CONFLICT", out: markers, resolved: "markers", note: `${why}: conflict markers written (--on-conflict markers); resolve by hand` };
  return { action: "CONFLICT", out: tgtText, resolved: null, note: `${why}: nothing written; use --on-conflict theirs|ours|markers or merge by hand` };
}

function planFile(c, entry, rel) {
  const M = c.manifest;
  const it = { kind: "file", rel, category: entry.category, mode: entry.mode || "copy", srcAbs: P(c.from.dir, rel), dstAbs: P(c.to.dir, rel), write: false, recordBase: false };
  if (entry.mode === "skip") { it.action = "SKIPPED"; it.note = `per-class: ${entry.why}`; return it; }
  if (matchAny(c.keep, rel)) { it.action = "SKIPPED"; it.note = "--keep-target"; return it; }
  const dstExists = exists(it.dstAbs);
  const raw = fs.readFileSync(it.srcAbs);

  if (entry.mode === "lock") {
    if (dstExists) { it.action = "SKIPPED"; it.note = `preserved (${entry.why})`; return it; }
    const j = JSON.parse(raw.toString("utf8"));
    j.name = `class${c.to.n}-tools`; if (j.packages && j.packages[""]) j.packages[""].name = j.name;
    it.action = "NEW"; it.outBuf = Buffer.from(JSON.stringify(j, null, 2) + "\n"); it.write = true; it.lines = countLines(it.outBuf.toString());
    return it;
  }

  if (entry.mode === "config-merge" || entry.mode === "json-merge") {
    const srcJson = JSON.parse(stripBom(raw.toString("utf8")));
    const isCfg = entry.mode === "config-merge";
    if (!dstExists) {
      let obj;
      if (isCfg) obj = newConfig(c);
      else {
        obj = clone(srcJson); obj.name = `class${c.to.n}-tools`;
        if (obj.description) obj.description = String(obj.description).replace(/Class \d+/g, `Class ${c.to.n}`);
      }
      const txt = JSON.stringify(obj, null, 2) + "\n";
      Object.assign(it, { action: "NEW", outBuf: Buffer.from(toEol(txt, eolOf(raw.toString("utf8")))), write: true, lines: countLines(txt) });
      if (isCfg) it.config = obj;
      return it;
    }
    const tgtStr = stripBom(fs.readFileSync(it.dstAbs, "utf8"));
    const tgtJson = JSON.parse(tgtStr);
    let merged, added;
    if (isCfg) ({ merged, added } = mergeConfig(c, tgtJson));
    else {
      merged = clone(tgtJson); added = [];
      deepAddMissing(merged, srcJson, [], new Set(entry.keepTarget || []), added);
      for (const sec of ["dependencies", "devDependencies"]) for (const [k, v] of Object.entries(srcJson[sec] || {}))
        if (tgtJson[sec] && tgtJson[sec][k] !== undefined && tgtJson[sec][k] !== v) (it.drift = it.drift || []).push(`${sec}.${k}: target ${tgtJson[sec][k]}, source ${v} (kept)`);
      if (added.some((a) => /^(dependencies|devDependencies)\./.test(a))) it.needsInstall = true;
    }
    it.config = merged;
    if (!added.length) { it.action = "IDENTICAL"; return it; }
    const txt = JSON.stringify(merged, null, 2) + "\n";
    Object.assign(it, { action: "CHANGED", note: `keys added: ${added.join(", ")}`, add: added.length, del: 0, write: true,
      outBuf: Buffer.from(toEol(txt, eolOf(tgtStr))), lines: countLines(txt) });
    return it;
  }

  /* binary files: bytes only */
  if (!looksText(rel, M, raw)) {
    if (!dstExists) { Object.assign(it, { action: "NEW", outBuf: raw, write: true, bytes: raw.length }); return it; }
    const t = fs.readFileSync(it.dstAbs);
    if (md5(t) === md5(raw)) it.action = "IDENTICAL";
    else Object.assign(it, { action: "CHANGED", outBuf: raw, write: true, bytes: raw.length, note: "binary" });
    return it;
  }

  /* text files */
  const srcRaw = raw.toString("utf8");
  const srcEol = eolOf(srcRaw);
  const s = substitute(c, entry, rel, lf(srcRaw));
  let srcHead = s, srcTail = "";
  const tailSpec = entry.mode === "tail" ? M.tails[entry.tail] : null;
  if (tailSpec) {
    const sp = splitTail(s, tailSpec);
    if (!sp.found && entry.tail === "buildcard") { it.action = "SKIPPED"; it.note = "the source has no '## 7.' heading: left alone"; return it; }
    srcHead = sp.head; srcTail = sp.tail;
  }
  it.generated = !!entry.generated;
  it.srcText = srcHead;
  it.recordBase = !entry.generated;
  if (!dstExists) {
    const out = srcHead + (tailSpec ? (c.isNew ? newTail(c, entry.tail, srcTail) : srcTail) : "");
    Object.assign(it, { action: "NEW", outBuf: Buffer.from(toEol(out, srcEol)), write: true, lines: countLines(out) });
    return it;
  }
  const tgtRaw = fs.readFileSync(it.dstAbs, "utf8");
  const tgtEol = eolOf(tgtRaw);
  const tgtFull = lf(tgtRaw);
  let tgtHead = tgtFull, tgtTail = "";
  if (tailSpec) {
    const sp = splitTail(tgtFull, tailSpec);
    if (!sp.found && entry.tail === "buildcard") { it.action = "SKIPPED"; it.note = "the target has no '## 7.' heading: left alone"; return it; }
    tgtHead = sp.head; tgtTail = sp.tail;
  }
  const baseText = it.recordBase ? readBase(c.to.dir, rel) : null;
  const d = decide(c, { srcText: srcHead, tgtText: tgtHead, baseText, generated: entry.generated });
  it.action = d.action; it.note = d.note; it.resolved = d.resolved;
  it.lines = countLines(d.out + tgtTail);
  if (d.action === "IDENTICAL") { if (srcEol !== tgtEol) it.eolNote = `line endings differ (${srcEol} source, ${tgtEol} target): the target's are kept`; return it; }
  const st = numstat(tgtHead, d.out);
  it.add = st.add; it.del = st.del; it.tgtHead = tgtHead; it.outHead = d.out;
  if (d.action === "KEPT-LOCAL") return it;
  if (d.action === "CONFLICT" && !d.resolved) { it.recordBase = false; return it; }
  if (d.resolved === "ours") return it;
  if (d.resolved === "markers") it.recordBase = false;
  it.outBuf = Buffer.from(toEol(d.out + tgtTail, tgtEol));
  it.write = true;
  return it;
}

/* ── agents (generated from templates) and the runbook marker ──────────────────────── */
const renderTpl = (t, vars) => fill(t, vars);
function frontmatterOk(text, file) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!m) return "no frontmatter";
  const fm = Object.fromEntries(m[1].split(/\r?\n/).map((l) => { const i = l.indexOf(":"); return i > 0 ? [l.slice(0, i).trim(), l.slice(i + 1).trim()] : [l, ""]; }));
  const want = path.basename(file).replace(/\.md$/, "");
  if (fm.name !== want) return `name "${fm.name}" is not the file name "${want}"`;
  if (!fm.description) return "no description";
  if (!["opus", "sonnet", "haiku", "inherit"].includes(fm.model)) return `model "${fm.model}"`;
  return null;
}
function planAgents(c) {
  const A = c.manifest.agents, items = [];
  const tplDir = P(c.root, A.templates);
  if (!exists(tplDir)) return [{ kind: "agent", rel: A.templates, category: "agents", action: "SKIPPED", note: "no templates folder" }];
  const pfx = c.to.prefix;
  const vars = agentVars(c.manifest, c.to.n, pfx);
  for (const f of fs.readdirSync(tplDir).filter((x) => x.endsWith(A.suffix)).sort()) {
    const role = f.slice(0, -A.suffix.length);
    const rel = `${A.dir}/${pfx}-${role}.md`;
    const dst = P(c.root, rel);
    const out = renderTpl(lf(fs.readFileSync(path.join(tplDir, f), "utf8")), vars);
    const it = { kind: "agent", rel, category: "agents", dstAbs: dst, write: false };
    const bad = frontmatterOk(out, rel);
    if (bad) { it.action = "CONFLICT"; it.note = `template ${f}: ${bad}`; items.push(it); continue; }
    if (!exists(dst)) { Object.assign(it, { action: "NEW", outBuf: Buffer.from(out), write: true, lines: countLines(out) }); items.push(it); continue; }
    const tgtRaw = fs.readFileSync(dst, "utf8"), eol = eolOf(tgtRaw), tgt = lf(tgtRaw);
    it.lines = countLines(out);
    if (tgt === out) it.action = "IDENTICAL";
    else { const st = numstat(tgt, out); Object.assign(it, { action: "CHANGED", add: st.add, del: st.del, outBuf: Buffer.from(toEol(out, eol)), write: true, note: "regenerated from the template (old file is backed up)" }); }
    items.push(it);
  }
  return items;
}
function planRunbook(c) {
  const R = c.manifest.runbook, items = [];
  for (const rel of R.files) {
    const f = P(c.root, rel);
    if (!exists(f)) { items.push({ kind: "runbook", rel, category: "runbook", action: "INFO", note: "missing" }); continue; }
    const t = fs.readFileSync(f, "utf8");
    items.push({ kind: "runbook", rel, category: "runbook", action: "INFO", note: t.includes(R.marker) ? "class-parametric (marker found); shared by every class, never written by sync" : `still class-specific (no ${R.marker}); stage proposals are installed with 'rootdocs'` });
  }
  return items;
}

/* ── the plan ─────────────────────────────────────────────────────────────────────── */
function buildPlan(c) {
  const M = c.manifest, items = [];
  const srcFiles = walkClass(c.from.dir, M).sort();
  const dstSet = new Set(c.toExists ? walkClass(c.to.dir, M) : []);
  for (const rel of srcFiles) {
    const entry = matchEntry(M, rel);
    if (!entry) { items.push({ kind: "file", rel, category: "unlisted", action: "UNLISTED", note: "no manifest glob names it, so it is never copied: add one if it is code" }); continue; }
    if (!c.only.has(entry.category)) continue;
    items.push(planFile(c, entry, rel));
    dstSet.delete(rel);
  }
  for (const rel of [...dstSet].sort()) {
    const entry = matchEntry(M, rel);
    if (entry && c.only.has(entry.category) && entry.mode !== "skip") items.push({ kind: "file", rel, category: entry.category, action: "TARGET-ONLY", note: "not in the source: left alone" });
  }
  if (c.only.has("agents")) items.push(...planAgents(c));
  if (c.only.has("runbook")) items.push(...planRunbook(c));
  return items;
}

/* ── the report ────────────────────────────────────────────────────────────────────── */
function lintCounts(c, text) {
  const out = {};
  for (const l of c.manifest.substitutions.lint || []) {
    const n = (text.match(new RegExp(fill(l, { SRC: c.from.n }), "g")) || []).length;
    if (n) out[fill(l, { SRC: c.from.n }).replace(/\\b/g, "")] = n;
  }
  return out;
}
const ORDER = ["NEW", "CHANGED", "MERGED", "CONFLICT", "KEPT-LOCAL", "SKIPPED", "IDENTICAL", "TARGET-ONLY", "UNLISTED", "INFO"];
function printPlan(c, items, { verbose = true } = {}) {
  const log = console.log;
  const cats = ["code", "docs", "agents", "runbook", "unlisted"].filter((k) => items.some((i) => i.category === k));
  for (const cat of cats) {
    log(`--- ${cat}`);
    for (const it of items.filter((i) => i.category === cat)) {
      let stat = "";
      if (it.action === "NEW") stat = it.lines != null ? `${it.lines} lines` : it.bytes ? `${it.bytes} bytes` : "";
      else if (["CHANGED", "MERGED", "KEPT-LOCAL", "CONFLICT"].includes(it.action)) stat = it.add != null ? `+${it.add} -${it.del}${it.lines != null ? `  (${it.lines} lines after)` : ""}` : "";
      else if (it.action === "IDENTICAL" && it.lines != null && verbose) stat = `${it.lines} lines`;
      const notes = [it.note, it.eolNote].filter(Boolean).join("; ");
      log(`  ${pad(it.action, 11)} ${pad(it.rel, 46)} ${pad(stat, 22)}${notes ? " " + notes : ""}`);
      if (it.drift) for (const d of it.drift) log(`  ${pad("", 11)} ${pad("", 46)} note: ${d}`);
      if (it.needsInstall) log(`  ${pad("", 11)} ${pad("", 46)} note: new dependencies: run npm install in class${c.to.n}/ (or relink node_modules)`);
    }
  }
}
function summarize(items) {
  const n = {};
  for (const i of items) n[i.action] = (n[i.action] || 0) + 1;
  return n;
}
const fmtCounts = (n) => ORDER.filter((k) => n[k]).map((k) => `${k} ${n[k]}`).join("   ") || "nothing";

function printLint(c, items) {
  const rows = [];
  for (const it of items) {
    if (!it.outBuf || !it.write || it.kind !== "file" || it.generated || it.mode === "lock") continue;
    const t = it.outBuf.toString("utf8");
    const l = lintCounts(c, t);
    if (Object.keys(l).length) rows.push([it.rel, l]);
  }
  const big = items.filter((i) => i.del >= 20 && i.kind === "file" && !i.generated && i.action !== "KEPT-LOCAL" && i.mode !== "json-merge").sort((a, b) => b.del - a.del);
  if (!rows.length && !big.length) return;
  console.log("--- review before --apply");
  if (big.length) console.log(`  files that LOSE 20+ target lines (code the target has and the source does not; a regression risk, read the diff, or --keep-target): ` + big.map((i) => `${i.rel} -${i.del}`).join(", "));
  if (rows.length) {
    console.log(`  source-class literals still in files that would be written (prose such as "Class ${c.from.n}" is not rewritten):`);
    for (const [rel, l] of rows) console.log(`    ${pad(rel, 44)} ${Object.entries(l).map(([k, v]) => `${k} x${v}`).join(", ")}`);
  }
}

/* --diff <glob>: the unified diff (target -> result of the sync) of the changed files that match, to review before --apply */
function printDiffs(items, globs) {
  const g = gitBin();
  for (const it of items) {
    if (it.tgtHead == null || !matchAny(globs, it.rel)) continue;
    console.log(`--- diff ${it.rel}  (${it.action}; - lines leave the target, + lines come from the source)`);
    if (!g) { console.log("  git not found: no diff available"); continue; }
    const r = spawnSync(g, ["-c", "core.autocrlf=false", "diff", "--no-index", "--no-color", "-U2", tmpFile("d-a.txt", it.tgtHead), tmpFile("d-b.txt", it.outHead)], { encoding: "utf8", maxBuffer: 1 << 28 });
    const out = (r.stdout || "").split("\n");
    const i = out.findIndex((l) => l.startsWith("@@"));
    console.log(out.slice(Math.max(i, 0)).join("\n").replace(/\n+$/, ""));
  }
}

function capabilityOf(dir) {
  const head = P(dir, "runtime/runtime.tsx");
  const silentHead = exists(head) ? fs.readFileSync(head, "utf8").includes("SILENT_VOICE") : null;
  const fr = P(dir, "runtime/frozen");
  let frozen = 0, voiced = 0;
  if (exists(fr)) for (const d of fs.readdirSync(fr, { withFileTypes: true })) {
    if (!d.isDirectory() || !/^r\d+$/.test(d.name)) continue;
    const f = path.join(fr, d.name, "runtime.tsx");
    if (!exists(f)) continue;
    frozen++;
    if (!fs.readFileSync(f, "utf8").includes("SILENT_VOICE")) voiced++;
  }
  return { silentHead, frozen, voiced };
}

/* ── never-touch signatures, self-check ─────────────────────────────────────────────── */
function neverSignature(dir, M) {
  const sig = new Map();
  const hashed = (rel) => rel.startsWith("runtime/frozen/") || rel === ".fence.json";
  (function rec(d, rel) {
    let ents; try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (RESERVED.test(e.name)) continue;
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (r === "node_modules" || r === ".classctl") continue;
      const abs = path.join(d, e.name);
      let st; try { st = fs.lstatSync(abs); } catch { continue; }
      if (st.isSymbolicLink()) { sig.set(r, "link"); continue; }
      if (st.isDirectory()) rec(abs, r);
      else if (isNever(M, r)) sig.set(r, hashed(r) ? "md5:" + md5(fs.readFileSync(abs)) : `${st.size}:${Math.round(st.mtimeMs)}`);
    }
  })(dir, "");
  return sig;
}
function diffSig(a, b) {
  const out = [];
  for (const [k, v] of a) if (!b.has(k)) out.push(`removed ${k}`); else if (b.get(k) !== v) out.push(`changed ${k}`);
  for (const k of b.keys()) if (!a.has(k)) out.push(`added ${k}`);
  return out;
}

function findEsbuild(dirs) {
  for (const d of dirs) {
    if (!exists(path.join(d, "node_modules", "esbuild"))) continue;
    try { return createRequire(path.join(d, "package.json"))("esbuild"); } catch { /* try next */ }
  }
  return null;
}
function selfCheck(c, dir, n, cfg) {
  const M = c.manifest, res = [];
  const ok = (name, good, msg) => res.push({ name, ok: good, msg });
  try { const cf = readCfg(dir); ok("config", true, `pipeline.config.json parses (class ${cf.defaults && cf.defaults.class})`); if (cf.defaults && Number(cf.defaults.class) !== n) ok("config-class", false, `defaults.class is ${cf.defaults.class}, folder is class${n}`); }
  catch (e) { ok("config", false, e.message); }
  /* every .mjs parses, and its relative imports resolve */
  const mjs = walkClass(dir, M).filter((r) => r.endsWith(".mjs") && (r === "cli.mjs" || r.startsWith("lib/") || r.startsWith("viewer/")));
  const bad = [], missing = [];
  for (const r of mjs) {
    const f = P(dir, r);
    const p = spawnSync(process.execPath, ["--check", f], { encoding: "utf8" });
    if (p.status !== 0) bad.push(`${r}: ${(p.stderr || "").split("\n").find((l) => /Error/.test(l)) || "syntax error"}`);
    const text = fs.readFileSync(f, "utf8");
    /* real import statements only (a string inside a code generator is not one), of local .mjs/.js/.cjs/.json files */
    const specs = [...text.matchAll(/(?:^|\n)[ \t]*(?:import|export)\b[^;\n]*?\bfrom\s*["']([^"']+)["']/g), ...text.matchAll(/(?:^|\n)[ \t]*import\s*["']([^"']+)["']/g), ...text.matchAll(/\bimport\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]);
    for (const s of specs) {
      if (!/^\.{1,2}\//.test(s) || !/\.(mjs|js|cjs|json)$/.test(s)) continue;
      if (!exists(path.resolve(path.dirname(f), s))) missing.push(`${r} -> ${s}`);
    }
  }
  ok("mjs-parse", !bad.length, bad.length ? bad.join("; ") : `${mjs.length} .mjs files parse`);
  ok("imports", !missing.length, missing.length ? missing.join("; ") : "every relative import resolves");
  /* runtime transpiles */
  const es = findEsbuild([dir, c.from && c.from.dir, ...(c.classes || []).map((k) => k.dir)].filter(Boolean));
  if (!es) ok("transpile", true, "SKIPPED: esbuild not found (npm install, or link node_modules)");
  else for (const f of ["runtime/runtime.tsx"]) { /* skeleton.tsx is a template with placeholders: it is only checked for existence */
    if (!exists(P(dir, f))) { ok("transpile " + f, false, "missing"); continue; }
    try { es.transformSync(fs.readFileSync(P(dir, f), "utf8"), { loader: "tsx", jsx: "transform", logLevel: "silent" }); ok("transpile " + f, true, "transpiles with esbuild"); }
    catch (e) { ok("transpile " + f, false, String(e.message).split("\n")[0]); }
  }
  const must = ["viewer/server.mjs", "viewer/meta.mjs", "viewer/src/main.tsx", "viewer/src/App.tsx", "viewer/public/index.html", "runtime/mascot.tsx", "runtime/skeleton.tsx", "docs/BUILD_CARD.md", "docs/LAYOUT.md", "docs/CHECKS.md", "docs/PATTERNS.md"];
  const lack = must.filter((r) => !exists(P(dir, r)));
  ok("files", !lack.length, lack.length ? `missing: ${lack.join(", ")}` : "viewer sources, mascot and the docs exist");
  const dirsLack = ["work", "output-preview"].filter((r) => !exists(P(dir, r)));
  ok("folders", !dirsLack.length, dirsLack.length ? `missing: ${dirsLack.join(", ")}` : "work/ and output-preview/ exist");
  return res;
}
function printSelfCheck(res) {
  for (const r of res) console.log(`  [${r.ok ? "ok" : "FAIL"}] ${r.name}: ${r.msg}`);
  return res.every((r) => r.ok);
}

/* ── context ───────────────────────────────────────────────────────────────────────── */
function makeCtx(args) {
  const root = path.resolve(args.root || HERE);
  const { manifest, file } = loadManifest(root, args.manifest);
  const classes = discoverClasses(root, manifest);
  return { root, manifest, manifestFile: file, classes, args };
}
const need = (cond, msg) => { if (!cond) { console.error("classctl: " + msg); process.exit(1); } };
function classOf(ctx, n, label) {
  const k = ctx.classes.find((x) => x.n === Number(n));
  need(k, `${label} class ${n} not found (class folders with a pipeline.config.json: ${ctx.classes.map((x) => x.n).join(", ") || "none"})`);
  return { ...k, cfg: readCfg(k.dir) };
}
const lockFile = (dir) => path.join(dir, ".classctl", "lock");
const syncFile = (dir) => path.join(dir, ".classctl", "sync.json");
const readSync = (dir) => { try { return JSON.parse(fs.readFileSync(syncFile(dir), "utf8")); } catch { return null; } };
const parseOnly = (s) => new Set(String(s || "code,docs,agents,runbook").split(",").map((x) => x.trim()).filter(Boolean));

/* ── apply machinery shared by sync and new ─────────────────────────────────────────── */
function backupSet(c, items) {
  /* every code/docs file of the target that matches the manifest (not just the ones that change), plus the agents and the sync record */
  const files = [];
  if (c.toExists) {
    for (const rel of walkClass(c.to.dir, c.manifest)) {
      const e = matchEntry(c.manifest, rel);
      if (e && c.only.has(e.category)) files.push({ src: P(c.to.dir, rel), dst: `${c.to.name}/${rel}` });
    }
    const sj = syncFile(c.to.dir);
    if (exists(sj)) files.push({ src: sj, dst: `${c.to.name}/.classctl/sync.json` });
    const bd = path.join(c.to.dir, ".classctl", "base");
    if (exists(bd)) (function rec(d, rel) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const r = rel + "/" + e.name; if (e.isDirectory()) rec(path.join(d, e.name), r); else files.push({ src: path.join(d, e.name), dst: `${c.to.name}/.classctl/base${r}` }); } })(bd, "");
  }
  for (const it of items) if (it.kind === "agent" && exists(it.dstAbs)) files.push({ src: it.dstAbs, dst: it.rel });
  return files;
}
function doBackup(c, W, items, dirOpt, tag) {
  let dir = dirOpt ? path.resolve(dirOpt) : path.join(c.root, "_backups", `class${c.to.n}-${tag}-${stamp()}`);
  if (exists(dir) && !dirOpt) dir += `-${String(new Date().getSeconds()).padStart(2, "0")}`;
  const files = backupSet(c, items);
  for (const f of files) W.copy(f.src, path.join(dir, ...f.dst.split("/")));
  const created = items.filter((i) => i.write && i.action === "NEW").map((i) => (i.kind === "agent" ? i.rel : `${c.to.name}/${i.rel}`));
  W.write(path.join(dir, "meta.json"), JSON.stringify({ class: c.to.n, from: c.from.n, at: new Date().toISOString(), files: files.map((f) => f.dst), createdByThisSync: created }, null, 2) + "\n");
  return { dir, count: files.length };
}
function applyItems(c, W, items) {
  const wrote = [];
  for (const it of items) {
    if (it.kind === "agent") { if (it.write) { W.write(it.dstAbs, it.outBuf); wrote.push(it); } continue; }
    if (it.kind !== "file") continue;
    if (it.write) { W.write(it.dstAbs, it.outBuf); wrote.push(it); }
  }
  return wrote;
}
function recordSync(c, W, items, extra = {}) {
  const prev = readSync(c.to.dir) || { version: 1, files: {}, history: [] };
  const counts = summarize(items.filter((i) => i.kind === "file" || i.kind === "agent"));
  for (const it of items) {
    if (it.kind !== "file" || !it.recordBase || it.srcText == null) continue;
    if (!["NEW", "IDENTICAL", "CHANGED", "MERGED", "KEPT-LOCAL", "CONFLICT"].includes(it.action)) continue;
    const bf = baseFile(c.to.dir, it.rel);
    let cur = null; try { cur = fs.readFileSync(bf, "utf8"); } catch { /* none */ }
    if (cur !== it.srcText) W.write(bf, it.srcText);
    let finalMd5 = null;
    try { finalMd5 = md5(fs.readFileSync(it.dstAbs)); } catch { /* none */ }
    prev.files[it.rel] = { md5: finalMd5, base: md5(it.srcText) };
  }
  const wroteAny = items.some((i) => i.write);
  const next = { ...prev, last: { from: c.from.n, at: new Date().toISOString(), counts, ...extra }, history: prev.history || [] };
  if (wroteAny) next.history = [...next.history, { from: c.from.n, at: next.last.at, counts, ...extra }].slice(-30);
  if (wroteAny || !prev.last) W.write(syncFile(c.to.dir), JSON.stringify(next, null, 2) + "\n");
}

/* ── sync ──────────────────────────────────────────────────────────────────────────── */
function cmdSync(args) {
  const ctx = makeCtx(args);
  need(args.from != null && args.to != null, "sync needs --from <N> --to <M>");
  need(Number(args.from) !== Number(args.to), `--from and --to are both class ${args.from}: nothing to sync`);
  const from = classOf(ctx, args.from, "source"), to = classOf(ctx, args.to, "target");
  const only = parseOnly(args.only);
  for (const k of only) need(["code", "docs", "agents", "runbook"].includes(k), `--only: unknown category "${k}" (code, docs, agents, runbook)`);
  need(!exists(lockFile(to.dir)), `class${to.n} is locked (${lockFile(to.dir)}): another sync is running, or a crashed one left it. Remove the file when sure.`);
  const apply = !!args.apply;
  const c = { ...ctx, from, to, toExists: true, only, keep: args["keep-target"] || [], onConflict: args["on-conflict"], subst: !args["no-subst"], isNew: false };
  c.to.prefix = agentPrefixOf(ctx.manifest, to.n, to.cfg);
  need(!c.onConflict || ["theirs", "ours", "markers"].includes(c.onConflict), "--on-conflict takes theirs, ours or markers");
  const W = new Writer(apply);
  const prevSync = readSync(to.dir);

  console.log(`classctl sync: class${from.n} -> class${to.n}   ${apply ? "APPLY" : "DRY RUN (nothing is written)"}`);
  console.log(`root: ${ctx.root}`);
  console.log(`categories: ${[...only].join(",")}   substitutions: ${c.subst ? "class" + from.n + " -> class" + to.n : "off"}   agent prefix: ${c.to.prefix}   last sync into class${to.n}: ${prevSync && prevSync.last ? `from class${prevSync.last.from} at ${prevSync.last.at}` : "none recorded (first sync: differing files are replaced, listed below)"}`);
  const items = buildPlan(c);
  printPlan(c, items);
  const counts = summarize(items);
  printLint(c, items);
  if (args.diff) printDiffs(items, String(args.diff).split(",").map((s) => s.trim()).filter(Boolean));
  const capS = capabilityOf(from.dir), capT = capabilityOf(to.dir);
  if (capS.silentHead && (capT.voiced > 0 || capT.silentHead === false))
    console.log(`--- capability note\n  class${from.n}'s head runtime is SILENT (SILENT_VOICE) but class${to.n} has ${capT.voiced} of ${capT.frozen} frozen runtimes that speak and a ${capT.silentHead ? "silent" : "voiced"} head. Its pinned chapters keep their frozen runtimes, but lib/ checks, voice.mjs and docs copied from a silent class may not fit them. Review the CHANGED lib files, or --keep-target them.`);
  console.log(`--- summary\n  ${fmtCounts(counts)}`);
  const unresolved = items.filter((i) => i.action === "CONFLICT" && (!i.resolved || i.resolved === "markers"));
  if (!apply) {
    console.log(`  DRY RUN: nothing was written. Re-run with --apply to ${counts.NEW || counts.CHANGED || counts.MERGED ? "apply this plan (a backup of class" + to.n + "'s code is taken first)" : "record the sync"}.`);
    process.exit(unresolved.length ? 2 : 0);
  }
  /* ── apply ── */
  const before = neverSignature(to.dir, ctx.manifest), beforeSrc = neverSignature(from.dir, ctx.manifest);
  W.mkdir(path.dirname(lockFile(to.dir)));
  fs.writeFileSync(lockFile(to.dir), JSON.stringify({ pid: process.pid, at: new Date().toISOString(), from: from.n }), { flag: "wx" });
  let failed = false, bkDir = null;
  try {
    if (items.some((i) => i.write)) {
      const bk = doBackup(c, W, items, args["backup-dir"], "code");
      bkDir = bk.dir;
      console.log(`backup: ${bk.count} files -> ${bk.dir}`);
    } else console.log("backup: not needed, nothing is written");
    const wrote = applyItems(c, W, items);
    recordSync(c, W, items);
    console.log(`written: ${wrote.length} files${unresolved.length ? `   (${unresolved.length} left unresolved: ${unresolved.map((i) => i.rel).join(", ")})` : ""}`);
    const after = neverSignature(to.dir, ctx.manifest), afterSrc = neverSignature(from.dir, ctx.manifest);
    const moved = [...diffSig(before, after), ...diffSig(beforeSrc, afterSrc).map((x) => "source: " + x)];
    console.log("self-check of class" + to.n + ":");
    const res = selfCheck(c, to.dir, to.n, to.cfg);
    res.push({ name: "never-touch", ok: moved.length === 0, msg: moved.length ? moved.join("; ") : `${before.size} never-touch files unchanged (work/, output-preview/, runtime/frozen/, .fence.json, assets/, caches)` });
    failed = !printSelfCheck(res);
  } catch (e) {
    if (bkDir) console.error(`classctl: the apply stopped half way (${e.message}). Put class${to.n} back with: node classctl.mjs restore --class ${to.n} --backup "${bkDir}" --apply`);
    throw e;
  } finally {
    try { fs.unlinkSync(lockFile(to.dir)); } catch { /* ignore */ }
  }
  console.log(`done. ${fmtCounts(counts)}`);
  process.exit(failed || unresolved.length ? 2 : 0);
}

/* ── new ───────────────────────────────────────────────────────────────────────────── */
function cmdNew(args) {
  const ctx = makeCtx(args);
  need(args.class != null && /^\d+$/.test(String(args.class)), "new needs --class <N>");
  const N = Number(args.class);
  need(!exists(path.join(ctx.root, `class${N}`)), `class${N} already exists: refusing to touch it (use sync to carry code into it)`);
  need(ctx.classes.length, "no class folder to copy from");
  const src = args.from != null ? classOf(ctx, args.from, "source") : (() => { const k = ctx.classes[ctx.classes.length - 1]; return { ...k, cfg: readCfg(k.dir) }; })();
  need(src.n !== N, "the source class is the new class");
  const apply = !args["dry-run"];
  const M = ctx.manifest;
  const ports = ctx.classes.map((k) => viewerPortOf(M, k.n, readCfg(k.dir)));
  const port = args.port != null ? Number(args.port) : Math.max(...ports) + (M.viewerPort.step || 2);
  need(Number.isInteger(port) && port > 0, "--port must be a number");
  need(!ports.includes(port), `port ${port} is already used by another class (${ctx.classes.map((k, i) => `class${k.n}:${ports[i]}`).join(", ")})`);
  const prefix = fill(M.defaultAgentPrefix, { N });
  const textbooks = fill(M.textbooksTemplate, { N });
  const to = { n: N, name: `class${N}`, dir: path.join(ctx.root, `class${N}`), cfg: null, prefix };
  const defaults = { port, prefix, textbooks };
  const c = { ...ctx, from: src, to, toExists: false, only: new Set(["code", "docs", "agents"]), keep: [], onConflict: null, subst: !args["no-subst"], isNew: true, defaults };
  const W = new Writer(apply);
  console.log(`classctl new: class${N} from class${src.n}   ${apply ? "CREATE" : "DRY RUN (nothing is written)"}`);
  console.log(`root: ${ctx.root}`);
  const items = buildPlan(c);
  const cfgItem = items.find((i) => i.mode === "config-merge");
  to.cfg = cfgItem && cfgItem.config;
  const counts = summarize(items.filter((i) => i.kind === "file" || i.kind === "agent"));
  const link = !args["no-link"];
  const nm = P(src.dir, "node_modules");
  const wire = wirePlan(c, args);
  printPlan(c, items, { verbose: false });
  if (wire) console.log(`--- wiring\n  ${pad(wire.action, 11)} ${wire.rel}   ${wire.note}`);
  console.log(`--- summary\n  ${fmtCounts(counts)}   (+ empty work/, output-preview/, runtime/frozen/)`);
  printDefaults(c, { link, nmExists: exists(nm), wire });
  if (!apply) { console.log("DRY RUN: nothing was written."); process.exit(0); }

  W.mkdir(path.dirname(lockFile(to.dir)));
  fs.writeFileSync(lockFile(to.dir), JSON.stringify({ pid: process.pid, at: new Date().toISOString(), new: true }), { flag: "wx" });
  let failed = false;
  try {
    for (const d of ["work", "output-preview", "runtime/frozen"]) W.mkdir(P(to.dir, d));
    applyItems(c, W, items);
    if (link && exists(nm)) { W.junction(fs.realpathSync(nm), P(to.dir, "node_modules")); console.log(`node_modules: junction -> ${fs.realpathSync(nm)}`); }
    else if (link) console.log(`node_modules: class${src.n} has none to link: run npm install in class${N}/`);
    else console.log(`node_modules: not linked (--no-link): run npm install in class${N}/`);
    if (wire && wire.write) {
      const bk = path.join(ctx.root, "_backups", `class${N}-new-${stamp()}`);
      W.copy(P(ctx.root, wire.rel), path.join(bk, ...wire.rel.split("/")));
      W.write(P(ctx.root, wire.rel), wire.outBuf);
      console.log(`wiring: ${wire.rel} updated (${wire.note}); original in ${bk}`);
    }
    recordSync(c, W, items, { created: true });
    console.log(`written: ${items.filter((i) => i.write).length} files`);
    console.log("self-check of class" + N + ":");
    failed = !printSelfCheck(selfCheck(c, to.dir, N, to.cfg));
  } finally {
    try { fs.unlinkSync(lockFile(to.dir)); } catch { /* ignore */ }
  }
  process.exit(failed ? 2 : 0);
}

/* .claude/settings.json is Claude Code's permission file: `new` only PROPOSES the deny rules for the new class (cloned from the
   source class's) and writes them only when the owner passes --wire */
function wirePlan(c, args) {
  const rel = c.manifest.wiring.settings, f = P(c.root, rel);
  if (!exists(f)) return { rel, action: "SKIPPED", note: "no .claude/settings.json in this root", write: false, rules: [] };
  const raw = fs.readFileSync(f, "utf8");
  const j = JSON.parse(stripBom(raw));
  const deny = (j.permissions && j.permissions.deny) || [];
  const want = deny.filter((d) => d.includes(`./class${c.from.n}/`)).map((d) => d.split(`class${c.from.n}`).join(`class${c.to.n}`));
  const add = want.filter((d) => !deny.includes(d));
  if (!add.length) return { rel, action: "IDENTICAL", note: "deny rules for the class already there", write: false, rules: [] };
  j.permissions.deny = [...deny, ...add];
  return { rel, action: args.wire ? "CHANGED" : "PROPOSED", note: `+${add.length} permissions.deny rules for ./class${c.to.n}/ (cloned from class${c.from.n}'s)${args.wire ? "" : "; NOT applied: re-run with --wire, or add them yourself"}`,
    write: !!args.wire, rules: add, outBuf: Buffer.from(toEol(JSON.stringify(j, null, 2) + "\n", eolOf(raw))) };
}

function printDefaults(c, { link, nmExists, wire }) {
  const N = c.to.n, d = c.defaults, a = ageVars(c.manifest, N);
  const tbExists = exists(d.textbooks);
  let similar = [];
  if (!tbExists) { try { similar = fs.readdirSync(path.dirname(d.textbooks)).filter((x) => new RegExp(`^class[-_ ]?${N}([^0-9]|$)`, "i").test(x)); } catch { /* no parent folder */ } }
  const libs = c.to.cfg && c.to.cfg.skinLibraries;
  console.log("--- DEFAULTS USED (tell the owner)");
  console.log(`  class number      ${N}   (source: class${c.from.n}'s code)`);
  console.log(`  children          ${a.AGE} years old (class number + ${c.manifest.ageBand.from} to + ${c.manifest.ageBand.to})`);
  console.log(`  plan chapter ids  ${fill(c.manifest.chapterIdTemplate, { N })}   (publication indiannica = "udgam", English, maths)`);
  console.log(`  textbook folder   ${d.textbooks}   ${tbExists ? "(exists)" : "(DOES NOT EXIST yet: classctl did not create it; put the book there or edit \"textbooks\" in class" + N + "/pipeline.config.json" + (similar.length ? `; similar folders there: ${similar.join(", ")}` : "") + ")"}`);
  console.log(`  viewer port       ${d.port}   (next free: highest port in use + ${c.manifest.viewerPort.step}; --port to choose). \`node viewhub.mjs\` (every class on one page) lists this class by itself`);
  console.log(`  agent prefix      ${d.prefix}   (.claude/agents/${d.prefix}-tool-builder.md, -maths-reviewer, -visual-reviewer, -play-tester, -upload-auditor, -image-agent)`);
  console.log(`  skin libraries    ${libs ? JSON.stringify(libs) : "(the source config has no skinLibraries key: own assets/skins only)"}`);
  console.log(`  node_modules      ${link ? (nmExists ? "junction to class" + c.from.n + "'s" : "nothing to link") : "not linked (--no-link): run npm install"}`);
  console.log(`  runtime           empty runtime/frozen/: the first \`node cli.mjs runtime freeze\` makes r1 from the head`);
  console.log(`  read fence        shared with class4 (the .claude hook reads class4/lib/core/fence.mjs and class4/.fence.json); nothing to do`);
  console.log(`  permissions       ${wire.action}: ${wire.note}`);
  if (!wire.write) for (const r of wire.rules || []) console.log(`                      ${r}`);
  console.log(`  not done          .gitignore (it lists class4 only); the root runbook and CLAUDE.md are shared by every class`);
}

/* ── status ────────────────────────────────────────────────────────────────────────── */
function cmdStatus(args) {
  const ctx = makeCtx(args);
  const M = ctx.manifest;
  console.log(`classctl status   root: ${ctx.root}`);
  console.log(`manifest: ${ctx.manifestFile} (v${M.version})   classes: ${ctx.classes.map((k) => k.n).join(", ") || "none"}`);
  if (!ctx.classes.length) return;
  const newest = ctx.classes[ctx.classes.length - 1];
  console.log(`source class (newest): class${newest.n}   templates: ${exists(P(ctx.root, M.agents.templates)) ? M.agents.templates : "MISSING " + M.agents.templates}`);
  const ports = new Map();
  for (const k of ctx.classes) {
    const cfg = readCfg(k.dir);
    const warn = [];
    const dcls = Number(cfg.defaults && cfg.defaults.class);
    if (dcls !== k.n) warn.push(`defaults.class is ${cfg.defaults && cfg.defaults.class}, not ${k.n}`);
    const port = viewerPortOf(M, k.n, cfg);
    if (ports.has(port)) warn.push(`viewer port ${port} is also class${ports.get(port)}'s`);
    ports.set(port, k.n);
    const pfx = agentPrefixOf(M, k.n, cfg);
    if (!cfg.agentPrefix) warn.push(`config has no agentPrefix (using ${pfx})`);
    const agentsMissing = fs.existsSync(P(ctx.root, M.agents.dir)) ? fs.readdirSync(P(ctx.root, M.agents.dir)).filter((f) => f.startsWith(pfx + "-")).length : 0;
    if (agentsMissing === 0) warn.push(`no .claude/agents/${pfx}-*.md`);
    if (exists(lockFile(k.dir))) warn.push(`LOCKED (${lockFile(k.dir)})`);
    const nm = P(k.dir, "node_modules");
    if (!exists(nm)) warn.push("no node_modules (run npm install)");
    const tb = cfg.textbooks ? path.resolve(k.dir, cfg.textbooks) : null;
    if (tb && !exists(tb)) warn.push(`textbooks folder missing: ${cfg.textbooks}`);
    const sync = readSync(k.dir);
    if (!sync) warn.push("no .classctl/sync.json: never synced, so the next sync cannot tell your edits from the source's");
    let head = "none", ver = "";
    try {
      const rt = fs.readFileSync(P(k.dir, "runtime/runtime.tsx")), ms = fs.readFileSync(P(k.dir, "runtime/mascot.tsx"));
      head = sha12(rt);
      try {
        const vs = JSON.parse(fs.readFileSync(P(k.dir, "runtime/frozen/versions.json"), "utf8")).versions || {};
        const nms = Object.keys(vs).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
        const eq = nms.find((v) => vs[v].runtime === head && vs[v].mascot === sha12(ms));
        ver = `   frozen: ${nms.length}${nms.length ? " (" + nms[0] + ".." + nms.at(-1) + ")" : ""}   head ${eq ? "= " + eq : "is newer than the last freeze"}`;
      } catch { ver = "   frozen: none"; }
    } catch { warn.push("no runtime/runtime.tsx"); }
    const cap = capabilityOf(k.dir);
    let diff = "";
    if (k.n !== newest.n) {
      const c = { ...ctx, from: { ...newest, cfg: readCfg(newest.dir) }, to: { ...k, cfg, prefix: pfx }, toExists: true, only: new Set(["code", "docs"]), keep: [], onConflict: null, subst: true, isNew: false, classes: ctx.classes };
      const n = summarize(buildPlan(c).filter((i) => i.kind === "file"));
      const diffs = (n.NEW || 0) + (n.CHANGED || 0) + (n.MERGED || 0) + (n.CONFLICT || 0) + (n["KEPT-LOCAL"] || 0);
      diff = `   differs from class${newest.n}: ${diffs} of ${Object.values(n).reduce((a, b) => a + b, 0) - (n["TARGET-ONLY"] || 0) - (n.UNLISTED || 0)} code+docs files${n.UNLISTED ? `, ${n.UNLISTED} UNLISTED in the source` : ""} (${fmtCounts(n)})`;
    }
    console.log(`\nclass${k.n}   defaults.class ${dcls}   port ${port}   prefix ${pfx}   runtime head ${head}${ver}`);
    console.log(`  capability: head ${cap.silentHead === null ? "?" : cap.silentHead ? "silent" : "voiced"}; ${cap.voiced} of ${cap.frozen} frozen runtimes speak${diff ? "\n " + diff : "\n  (this is the source class)"}`);
    console.log(`  last sync: ${sync && sync.last ? `from class${sync.last.from} at ${sync.last.at} (${fmtCounts(sync.last.counts || {})})` : "none"}`);
    for (const w of warn) console.log(`  warning: ${w}`);
  }
  try {
    const hook = fs.readFileSync(P(ctx.root, ".claude/hooks/chapter-fence.mjs"), "utf8");
    const m = /\.\.\/\.\.\/(class\d+)\/lib\/core\/fence\.mjs/.exec(hook);
    if (m && !ctx.classes.some((k) => k.name === m[1])) console.log(`\nwarning: the read-fence hook imports ${m[1]}/lib/core/fence.mjs, which is not here`);
  } catch { /* no hook in this root */ }
  for (const r of M.runbook.files) {
    const f = P(ctx.root, r);
    if (exists(f)) console.log(`root ${r}: ${fs.readFileSync(f, "utf8").includes(M.runbook.marker) ? "class-parametric" : "class-specific (not yet the parametric version)"}`);
  }
}

/* ── restore ───────────────────────────────────────────────────────────────────────── */
function cmdRestore(args) {
  const ctx = makeCtx(args);
  need(args.class != null && args.backup, "restore needs --class <N> --backup <dir>");
  const dir = path.resolve(args.backup);
  need(exists(path.join(dir, "meta.json")), `${dir} has no meta.json: not a classctl backup`);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8"));
  need(Number(meta.class) === Number(args.class), `that backup is of class ${meta.class}`);
  const k = classOf(ctx, args.class, "target");
  need(!exists(lockFile(k.dir)), `class${k.n} is locked`);
  const apply = !!args.apply, W = new Writer(apply);
  console.log(`classctl restore: class${k.n} <- ${dir}   ${apply ? "APPLY" : "DRY RUN"}`);
  console.log(`  ${meta.files.length} files to put back, ${(meta.createdByThisSync || []).length} files the sync created to remove`);
  if (!apply) { console.log("DRY RUN: nothing was written."); return; }
  W.mkdir(path.dirname(lockFile(k.dir)));
  fs.writeFileSync(lockFile(k.dir), JSON.stringify({ pid: process.pid, restore: true }), { flag: "wx" });
  try {
    /* classctl's own record goes back to what the backup had (none, when that sync was the first) */
    const cdir = path.join(k.dir, ".classctl");
    if (exists(path.join(cdir, "base"))) W.rmTree(path.join(cdir, "base"));
    if (exists(syncFile(k.dir))) W.unlink(syncFile(k.dir));
    for (const rel of meta.files) W.copy(path.join(dir, ...rel.split("/")), path.join(ctx.root, ...rel.split("/")));
    for (const rel of meta.createdByThisSync || []) { const f = path.join(ctx.root, ...rel.split("/")); if (exists(f)) W.unlink(f); }
  } finally { try { fs.unlinkSync(lockFile(k.dir)); } catch { /* ignore */ } }
  console.log("restored.");
}

/* ── rootdocs: install staged root docs (CLAUDE.md, runbook, commands, skills) after the owner reviewed the diffs ── */
function cmdRootdocs(args) {
  const ctx = makeCtx(args);
  const stage = path.resolve(args.from || path.join(ctx.root, "_templates", "rootdocs-proposed")), apply = !!args.apply, W = new Writer(apply);
  need(exists(stage), `${stage} does not exist: pass --from <stage dir>`);
  console.log(`classctl rootdocs: ${stage} -> ${ctx.root}   ${apply ? "APPLY" : "DRY RUN"}   (a staged file is <path> or <path>.proposed)`);
  const todo = [];
  for (const rel of ctx.manifest.rootDocs) {
    let s = P(stage, rel);
    if (!exists(s) && exists(s + ".proposed")) s += ".proposed";
    const d = P(ctx.root, rel);
    if (!exists(s)) { console.log(`  ${pad("MISSING", 10)} ${rel} (not staged)`); continue; }
    const st = fs.readFileSync(s), dt = exists(d) ? fs.readFileSync(d) : null;
    const act = !dt ? "NEW" : md5(st) === md5(dt) ? "IDENTICAL" : "CHANGED";
    console.log(`  ${pad(act, 10)} ${rel}`);
    if (act !== "IDENTICAL") todo.push({ rel, s, d, had: !!dt });
  }
  if (!apply) { console.log("DRY RUN: nothing was written."); return; }
  const bk = path.join(ctx.root, "_backups", `rootdocs-${stamp()}`);
  for (const t of todo) { if (t.had) W.copy(t.d, path.join(bk, ...t.rel.split("/"))); W.copy(t.s, t.d); }
  console.log(`installed ${todo.length} files; originals in ${bk}`);
}

/* ── main ──────────────────────────────────────────────────────────────────────────── */
function help() {
  console.log(`classctl: carry class folders' code between classes, and make new ones (see CLASSCTL.md)
  node classctl.mjs status
  node classctl.mjs sync --from <N> --to <M> [--apply] [--only code,docs,agents,runbook] [--backup-dir d]
                         [--on-conflict theirs|ours|markers] [--keep-target glob[,glob]] [--no-subst]
                         [--diff glob[,glob]]   (print the diff of the matching changed files)
  node classctl.mjs new --class <N> [--from <M>] [--dry-run] [--port p] [--no-link]
                        [--wire]   (also add the new class's permissions.deny rules to .claude/settings.json; otherwise only proposed)
  node classctl.mjs restore --class <N> --backup <dir> [--apply]
  node classctl.mjs rootdocs [--from <stage dir>] [--apply]   (default stage: _templates/rootdocs-proposed)
  all commands: --root <dir> (default: the folder classctl.mjs is in)`);
}

export async function main(argv) {
  const args = parseArgs(argv.slice(1));
  const cmd = argv[0];
  try {
    if (!cmd || cmd === "help" || args.help) return help();
    if (cmd === "status") return cmdStatus(args);
    if (cmd === "sync") return cmdSync(args);
    if (cmd === "new") return cmdNew(args);
    if (cmd === "restore") return cmdRestore(args);
    if (cmd === "rootdocs") return cmdRootdocs(args);
    console.error(`classctl: unknown command "${cmd}"`); help(); process.exit(1);
  } catch (e) {
    console.error("classctl: " + (e && e.message || e));
    process.exit(1);
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
