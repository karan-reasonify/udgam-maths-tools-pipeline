#!/usr/bin/env node
/* Tests for classctl.mjs. Self-contained and independent of the sync state of the real folders:
 *
 *  - It builds its OWN scratch root (default under os.tmpdir()) and runs classctl against it with --root.
 *  - The real class5/ code and a few root files (agents, templates, settings, manifest, root docs) are COPIED ONCE at the
 *    start (class5 is a source other agents edit while this runs; the copy is retried until it parses). Nothing real is
 *    read again, except the before/after manifests in section i.
 *  - The fake class4 is "class5's code, behind": a copy deliberately and deterministically perturbed (a line added, a file
 *    deleted so it is NEW, a class4-only file, CRLF in one file, its own README notes and BUILD_CARD section 7 ...), so a
 *    first sync always has NEW, CHANGED, MERGED and CONFLICT cases whatever state the real class4 is in.
 *  - The scratch root docs are OLD versions made from the staged proposals, so `rootdocs` always has 6 CHANGED.
 *  - Section i compares md5 manifests of the real class4, class5 and root before and after the run.
 *
 *   node classctl.test.mjs [--keep] [--root <scratch dir>]
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CLASSCTL = path.join(HERE, "classctl.mjs");
const argv = process.argv.slice(2);
const KEEP = argv.includes("--keep");
const S = path.resolve(argv.includes("--root") ? argv[argv.indexOf("--root") + 1] : path.join(os.tmpdir(), `classctl-test-${process.pid}-${Date.now().toString(36)}`));
const RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;
const REAL4 = path.join(HERE, "class4"), REAL5 = path.join(HERE, "class5");
const C4 = path.join(S, "class4"), C5 = path.join(S, "class5");

/* ── tiny harness ── */
const results = [];
function t(name, cond, detail = "") {
  results.push({ name, ok: !!cond });
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond || !detail ? "" : "\n        -> " + String(detail).split("\n").slice(0, process.env.CLASSCTL_TEST_VERBOSE ? 80 : 6).join("\n           ")}`);
}
const section = (s) => console.log(`\n== ${s}`);
const md5 = (b) => crypto.createHash("md5").update(b).digest("hex");
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const ext = (p) => (process.platform === "win32" && RESERVED.test(path.basename(p)) ? "\\\\?\\" + path.resolve(p) : p);

function copyTree(src, dst, skip = () => false, rel = "") {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (RESERVED.test(e.name) || e.isSymbolicLink()) continue;
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (skip(r, e)) continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyTree(s, d, skip, r); else fs.copyFileSync(s, d);
  }
}
function hashTree(dir, skipTop = []) {
  const m = new Map();
  (function rec(d, rel) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (RESERVED.test(e.name)) continue;
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (!rel && skipTop.includes(e.name)) continue;
      const p = path.join(d, e.name);
      const st = fs.lstatSync(p);
      if (st.isSymbolicLink()) m.set(r, "link");
      else if (st.isDirectory()) { m.set(r + "/", "dir"); rec(p, r); }
      else m.set(r, md5(fs.readFileSync(p)));
    }
  })(dir, "");
  return m;
}
const sameMap = (a, b) => a.size === b.size && [...a].every(([k, v]) => b.get(k) === v);
function diffMap(a, b) {
  const out = [];
  for (const [k, v] of a) if (!b.has(k)) out.push("removed " + k); else if (b.get(k) !== v) out.push("changed " + k);
  for (const k of b.keys()) if (!a.has(k)) out.push("added " + k);
  return out;
}
/* removes a tree without ever following a junction or symlink */
function safeRm(p) {
  let st;
  try { st = fs.lstatSync(ext(p)); } catch { return; }
  if (st.isSymbolicLink()) { try { fs.unlinkSync(p); } catch { fs.rmdirSync(p); } return; }
  if (st.isDirectory()) { for (const e of fs.readdirSync(ext(p))) safeRm(path.join(p, e)); fs.rmdirSync(ext(p)); return; }
  fs.unlinkSync(ext(p));
}
const rd = (f) => fs.readFileSync(f, "utf8");
const wr = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const rdj = (f) => JSON.parse(rd(f));
const lfOnly = (s) => s.replace(/\r\n/g, "\n");
const crlfStats = (f) => { const s = fs.readFileSync(f, "latin1"); return { crlf: (s.match(/\r\n/g) || []).length, lone: (s.match(/(?<!\r)\n/g) || []).length }; };
const exists = (p) => { try { fs.lstatSync(ext(p)); return true; } catch { return false; } };

function run(args, opts = {}) {
  const r = spawnSync(process.execPath, [CLASSCTL, ...args, ...(opts.noRoot ? [] : ["--root", S])], { encoding: "utf8", maxBuffer: 1 << 28 });
  return { code: r.status, out: r.stdout || "", err: r.stderr || "" };
}
const counts = (out) => {
  const m = /--- summary\s*\n\s*(.*)/.exec(out);
  const o = {};
  if (m) for (const x of m[1].matchAll(/([A-Z-]+) (\d+)/g)) o[x[1]] = +x[2];
  return o;
};

/* ── the one-time copy of the real class5 code (and what a root needs) ── */
const NEVER = /^(work|node_modules|output-preview|\.build|\.images-cache|\.voice-cache|assets|\.classctl|_backups)(\/|$)/;
const CODE_SKIP = (rel) => NEVER.test(rel) || rel === "runtime/frozen" || rel.startsWith("runtime/frozen/") || /\.tmp\.mjs$/.test(rel) || rel === "NUL" || rel === ".fence.json" || /\.classctl-tmp$/.test(rel);
const MJS_CHECKED = (rel) => rel === "cli.mjs" || /^(lib|viewer)\/.*\.mjs$/.test(rel) || rel === "viewer/meta.mjs";

/* class5 is edited by other agents while this runs: the copy must parse, else it is taken again a few seconds later */
function snapshotParses() {
  const files = [];
  (function rec(d, rel) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const r = rel ? `${rel}/${e.name}` : e.name; if (CODE_SKIP(r)) continue; if (e.isDirectory()) rec(path.join(d, e.name), r); else if (r.endsWith(".mjs") && MJS_CHECKED(r)) files.push(r); } })(C5, "");
  for (const r of files) {
    const p = spawnSync(process.execPath, ["--check", path.join(C5, ...r.split("/"))], { encoding: "utf8" });
    if (p.status !== 0) return `${r} does not parse`;
  }
  let es = null;
  try {
    es = createRequire(path.join(C5, "package.json"))("esbuild");
    es.transformSync(rd(path.join(C5, "runtime", "runtime.tsx")), { loader: "tsx", jsx: "transform", logLevel: "silent" });
  } catch (e) { return "runtime.tsx does not transpile: " + String(e.message).split("\n")[0]; }
  finally { try { if (es && es.stop) es.stop(); } catch { /* ignore */ } } /* esbuild's sync worker keeps esbuild.exe open: the scratch could not be deleted */
  return null;
}

function build() {
  safeRm(S);
  fs.mkdirSync(S, { recursive: true });
  /* 1. class5: node_modules once (a real copy, never a junction to the real one), then the code until it parses */
  copyTree(path.join(REAL5, "node_modules"), path.join(C5, "node_modules"));
  let why = "";
  for (let i = 0; i < 4; i++) {
    if (i) sleep(3000);
    copyTree(REAL5, C5, (rel) => CODE_SKIP(rel));
    why = snapshotParses();
    if (!why) break;
    console.log(`  (class5 is being edited: ${why}; copying again)`);
  }
  if (why) throw new Error("class5's code does not parse right now: " + why + ". Run the test again in a minute.");
  for (const d of ["work", "output-preview"]) fs.mkdirSync(path.join(C5, d), { recursive: true });

  /* 2. the root: manifest (the tool under test), templates, settings, class-5 agents, and the staged root docs, once */
  fs.copyFileSync(path.join(HERE, "classctl.manifest.json"), path.join(S, "classctl.manifest.json"));
  copyTree(path.join(HERE, "_templates", "agents"), path.join(S, "_templates", "agents"));
  fs.mkdirSync(path.join(S, ".claude", "agents"), { recursive: true });
  for (const f of fs.readdirSync(path.join(HERE, ".claude", "agents"))) if (/^udgam5-.*\.md$/.test(f)) fs.copyFileSync(path.join(HERE, ".claude", "agents", f), path.join(S, ".claude", "agents", f));
  fs.copyFileSync(path.join(HERE, ".claude", "settings.json"), path.join(S, ".claude", "settings.json"));
  const DOCS = ["CLAUDE.md", "udgam_maths_claude.md", "README.md", ".claude/commands/gen-tools.md", ".claude/skills/gen-tools/SKILL.md", ".claude/skills/build-tool/SKILL.md"];
  for (const rel of DOCS) {
    const prop = path.join(HERE, "_templates", "rootdocs-proposed", ...rel.split("/")) + ".proposed";
    let staged = lfOnly(rd(exists(prop) ? prop : path.join(HERE, ...rel.split("/"))));
    if (rel === "udgam_maths_claude.md" && !staged.includes("classctl:runbook-v1")) staged += "\n<!-- classctl:runbook-v1 -->\n";
    wr(path.join(S, "_templates", "rootdocs-proposed", ...rel.split("/")) + ".proposed", staged);
    /* the OLD root doc: not parametric (marker removed), plus a line the staged one lacks */
    wr(path.join(S, ...rel.split("/")), staged.replace(/<!-- classctl:runbook-v1 -->\n?/g, "") + "\nOLD ROOT DOC (class 4 only)\n");
  }
  /* the old voiced-flow agents of class 4 (what the first sync replaces) */
  for (const r of ["tool-builder", "maths-reviewer", "visual-reviewer", "play-tester", "upload-auditor", "image-agent"])
    wr(path.join(S, ".claude", "agents", `udgam-${r}.md`), `---\nname: udgam-${r}\ndescription: old voiced-flow ${r} of class 4\nmodel: sonnet\n---\n\nOld voiced-flow body of ${r}.\n`);

  /* 3. the SOURCE gets the keys a unified class5 has (class-identity keys must NOT travel), and probes: injected AFTER
        class4 is copied from class5 (below), so the target lacks them */
  const injectSource = () => {
  const cfg5 = path.join(C5, "pipeline.config.json");
  const j = rdj(cfg5);
  j.newKey = { x: 1 };
  j.lpTables = { ...(j.lpTables || {}), extra: "lp2_extra" };
  j.viewerPort = 5185;
  j.agentPrefix = "udgam5";
  j.skinLibraries = ["assets/skins", "../class4/assets/skins"];
  wr(cfg5, JSON.stringify(j, null, 2) + "\n");
  wr(path.join(C5, "capabilities.json"), "{}\n"); // named by no manifest glob: UNLISTED, never copied
  wr(path.join(C5, "lib", "zz_probe_subst.mjs"), '// Class 5 prose stays as it is\nexport const where = "class5/runtime/frozen/r1";\n');
  wr(path.join(C5, "lib", "zz_probe_diff.mjs"), 'export const side = "source";\n');
  wr(path.join(C5, "docs", "PORTING_TO_CLASS9.md"), "# a note for one class only\n");
  if (!exists(path.join(C5, "pipeline.config.example.json"))) wr(path.join(C5, "pipeline.config.example.json"), "{}\n");
  };

  /* 4. the fake class4 = class5's code, behind and perturbed on purpose */
  copyTree(C5, C4, (rel) => CODE_SKIP(rel));
  for (const d of ["work", "output-preview"]) fs.mkdirSync(path.join(C4, d), { recursive: true });
  const NEWFILE = ["lib/core/caps.mjs", "lib/check/silent.mjs", "lib/images/theme.mjs", "lib/check/padshape.mjs"].find((r) => exists(path.join(C4, ...r.split("/"))));
  const four = (rel, fn) => { const f = path.join(C4, ...rel.split("/")); wr(f, fn(rd(f))); };
  const cfg4 = rdj(path.join(C4, "pipeline.config.json"));
  cfg4.defaults.class = 4; cfg4.textbooks = "../textbooks/class-4-udgam";
  for (const k of ["viewerPort", "agentPrefix", "skinLibraries", "newKey"]) delete cfg4[k];
  if (cfg4.lpTables) delete cfg4.lpTables.extra;
  wr(path.join(C4, "pipeline.config.json"), JSON.stringify(cfg4, null, 2) + "\n");
  const pk = rdj(path.join(C4, "package.json")); pk.name = "class4-tools"; if (pk.description) pk.description = pk.description.replace(/Class \d+/g, "Class 4");
  wr(path.join(C4, "package.json"), JSON.stringify(pk, null, 2) + "\n");
  four("cli.mjs", (s) => s + "\n// class4 local drift\n");
  four("lib/core/env.mjs", (s) => s + "\n// class4 local drift\n");
  four("runtime/runtime.tsx", (s) => s + "\n// class4 local drift\n");
  four("docs/CHECKS.md", (s) => s + "\nA class 4 doc line.\n");
  wr(path.join(C4, "lib", "zz_probe_diff.mjs"), 'export const side = "target";\n');
  wr(path.join(C4, "lib", "zz_class4_only.mjs"), "export const only = 4;\n");
  fs.unlinkSync(path.join(C4, ...NEWFILE.split("/"))); // the source has it, the target does not: NEW
  /* check.mjs is CRLF here (class 4's was), with one extra line */
  four("lib/check/check.mjs", (s) => lfOnly(s).replace(/\n/g, "\r\n") + "// class4 local drift\r\n");
  /* README: the source's head, one drifted line, and class 4's own notes after the last ``` block */
  four("README.md", (s) => {
    const L = lfOnly(s).split("\n");
    let last = -1; L.forEach((l, i) => { if (/^```\s*$/.test(l)) last = i; });
    const head = L.slice(0, last >= 0 ? last + 1 : L.length).join("\n") + "\n";
    return head.replace("\n", "\nOLD README HEAD LINE\n") + "\nThe reference tool is `work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx`.\n";
  });
  /* BUILD_CARD: the source's sections 1-6 with a drifted line, and class 4's own section 7 and 8 */
  four("docs/BUILD_CARD.md", (s) => {
    const x = lfOnly(s), i = x.search(/^## 7\./m);
    const rows = Array.from({ length: 12 }, (_, k) => `| 2026-09-${String(10 + k).padStart(2, "0")} | **class 4 decision ${k}**: a row that belongs to class 4 alone and that no sync may ever overwrite or reorder | canary ${k} |`).join("\n");
    return x.slice(0, i) + "OLD BUILD_CARD SECTION LINE\n\n## 7. Decisions log\n\n| date | decision | why |\n|---|---|---|\n" + rows + "\n\n## 8. Open questions\n\n- a class 4 open question\n";
  });
  /* class 4's frozen runtime (voiced) and the other never-touch canaries */
  wr(path.join(C4, "runtime", "frozen", "r21", "runtime.tsx"), "// a voiced runtime, r21\nexport const VOICED = true;\n");
  wr(path.join(C4, "runtime", "frozen", "r21", "mascot.tsx"), "// mascot r21\n");
  wr(path.join(C4, "runtime", "frozen", "versions.json"), JSON.stringify({ versions: { r21: { runtime: "x", mascot: "y", note: "fake" } } }, null, 2) + "\n");
  const canaries = {
    "work/test_eng_maths4_ch0/CANARY.txt": "work canary\n",
    "work/test_eng_maths4_ch0/runtime.json": '{"version":"r21"}\n',
    "work/test_eng_maths4_ch0/S1/tool.tsx": "// a tool\n",
    "output-preview/test/CANARY.txt": "output canary\n",
    ".fence.json": '{"off":false,"sessions":{"canary":{"chapter":"x","at":"2026-01-01T00:00:00Z"}}}\n',
    ".images-cache/raw/x.bin": "cache canary\n",
    ".voice-cache/v.bin": "voice cache canary\n",
    "assets/skins/index.json": '{"version":1,"skins":{}}\n',
    "repro-enter-stale.tmp.mjs": "// scratch script\n",
  };
  for (const [rel, body] of Object.entries(canaries)) wr(path.join(C4, ...rel.split("/")), body);
  /* a Windows device name as a real file, as the real class4 root once had (NUL): walkers must never open it */
  let nulMade = false;
  if (process.platform === "win32") { try { fs.writeFileSync("\\\\?\\" + path.join(C4, "NUL"), "device-name canary\n"); nulMade = true; } catch { /* not possible here */ } }
  injectSource();
  return { NEWFILE, nulMade };
}

const code4Files = (dir) => {
  const m = new Map();
  for (const [k, v] of hashTree(dir, ["node_modules", "work", "output-preview", ".images-cache", ".voice-cache", "assets"])) if (v !== "dir" && !k.startsWith("runtime/frozen") && !k.startsWith(".classctl")) m.set(k, v);
  return m;
};
const neverMap = (dir) => {
  const m = new Map();
  for (const [k, v] of hashTree(dir, ["node_modules"])) if (/^(work|output-preview|runtime\/frozen|\.images-cache|\.voice-cache|assets)(\/|$)/.test(k) || k === ".fence.json" || /\.tmp\.mjs$/.test(k)) m.set(k, v);
  return m;
};

/* md5 manifests of the REAL folders (never .env / config.json, never work, caches or node_modules) */
function realManifests() {
  const heavy = ["node_modules", "work", "output-preview", ".images-cache", ".voice-cache", "assets", ".build"];
  const root = new Map();
  for (const e of fs.readdirSync(HERE, { withFileTypes: true })) {
    if (RESERVED.test(e.name) || e.name === ".env" || e.name === "config.json" || e.isSymbolicLink()) continue;
    if (e.isFile()) root.set(e.name, md5(fs.readFileSync(path.join(HERE, e.name))));
    else if (e.name === "_backups") { root.set("_backups/", "dir"); for (const b of fs.readdirSync(path.join(HERE, e.name))) root.set("_backups/" + b, "entry"); }
    else if (e.name === ".claude" || e.name === "_templates") for (const [k, v] of hashTree(path.join(HERE, e.name))) { if (/(^|\/)(scheduled_tasks\.lock|settings\.local\.json|unify-notes\/)/.test(k) || /\.lock$/.test(k)) continue; root.set(e.name + "/" + k, v); } /* volatile files other sessions rewrite are not ours to compare */
  }
  return { class4: hashTree(REAL4, heavy), class5: hashTree(REAL5, heavy), root };
}

/* ═════════════════════════════════ the tests ═════════════════════════════════ */
console.log(`scratch root: ${S}`);
const realEsbuild = path.join(REAL5, "node_modules", "esbuild", "package.json");
const realBefore = realManifests();
let fx;
try {
  fx = build();

  section("a. dry run lists everything and writes nothing");
  const before = hashTree(S, ["node_modules"]);
  const a1 = run(["sync", "--from", "5", "--to", "4"]);
  const after = hashTree(S, ["node_modules"]);
  t("a1 dry run exits 0", a1.code === 0, a1.err || a1.out.slice(-400));
  t("a2 whole scratch tree byte-identical before and after (no lock, no log, no backup)", sameMap(before, after), diffMap(before, after).join("; "));
  t("a3 no .classctl, _backups or lock created", !fs.existsSync(path.join(C4, ".classctl")) && !fs.existsSync(path.join(S, "_backups")));
  const c1 = counts(a1.out);
  t("a4 dry run lists NEW and CHANGED files (and says so)", c1.NEW >= 2 && c1.CHANGED >= 12 && /DRY RUN/.test(a1.out), JSON.stringify(c1));
  t("a5 per-file lines carry line counts (+a -d, N lines)", /CHANGED\s+cli\.mjs\s+\+\d+ -\d+/.test(a1.out) && new RegExp(`NEW\\s+${fx.NEWFILE.replace(/[.\/]/g, "\\$&")}\\s+\\d+ lines`).test(a1.out), a1.out.slice(0, 900));
  t("a6 per-class files are SKIPPED, never copied (docs/PORTING_TO_*.md, package-lock.json, pipeline.config.example.json)", /SKIPPED\s+docs\/PORTING_TO_CLASS9\.md/.test(a1.out) && /SKIPPED\s+package-lock\.json/.test(a1.out) && /SKIPPED\s+pipeline\.config\.example\.json/.test(a1.out), a1.out.slice(0, 1500));
  t("a7 the device-name file NUL and *.tmp.mjs are not listed", !/\bNUL\b/.test(a1.out.replace(/NEW|nulls/g, "")) && !/tmp\.mjs/.test(a1.out));
  t("a8 the JSON merge adds keys and names the class-identity keys it derives", /CHANGED\s+pipeline\.config\.json.*newKey/.test(a1.out) && /agentPrefix \(derived for class 4\)/.test(a1.out), a1.out.slice(0, 1500));
  t("a9 the agents are planned from the templates (class 4 prefix udgam)", /\.claude\/agents\/udgam-tool-builder\.md/.test(a1.out) && !/\.claude\/agents\/udgam5-/.test(a1.out));
  t("a10 review block warns about source-class literals (and what the target would lose)", /review before --apply/.test(a1.out) && /source-class literals/.test(a1.out) && /zz_probe_subst\.mjs\s+.*Class 5 x1/.test(a1.out), a1.out.slice(-1500));
  t("a11 a target-only file is listed TARGET-ONLY and left alone", /TARGET-ONLY\s+lib\/zz_class4_only\.mjs/.test(a1.out));
  const st0 = run(["status"]);
  t("a12 status runs, lists both classes, warns they were never synced, and writes nothing", st0.code === 0 && /class4/.test(st0.out) && /class5/.test(st0.out) && /never synced/.test(st0.out) && sameMap(before, hashTree(S, ["node_modules"])), st0.err + st0.out.slice(0, 600));
  t("a12b a source file no manifest glob names is reported as UNLISTED (an allowlist must not omit silently)", /UNLISTED\s+capabilities\.json/.test(a1.out), a1.out.slice(-800));
  const a13 = run(["sync", "--from", "5", "--to", "4", "--diff", "lib/zz_probe_diff.mjs"]);
  t("a13 --diff prints the unified diff of the matching changed file, and still writes nothing", a13.code === 0 && /--- diff lib\/zz_probe_diff\.mjs/.test(a13.out) && /^@@ /m.test(a13.out) && /^\+export const side = "source";/m.test(a13.out) && /^-export const side = "target";/m.test(a13.out) && sameMap(before, hashTree(S, ["node_modules"])), a13.out.slice(-600));

  section("b. --apply: backup, never-touch files byte-identical, config merged, BUILD_CARD section 7 kept");
  const pre4 = code4Files(C4), preNever = neverMap(C4), pre5 = hashTree(C5, ["node_modules"]);
  const preAgents = hashTree(path.join(S, ".claude", "agents"));
  const preCfg = rdj(path.join(C4, "pipeline.config.json"));
  const preBuild = lfOnly(rd(path.join(C4, "docs", "BUILD_CARD.md")));
  const preTail = preBuild.slice(preBuild.indexOf("\n## 7.") + 1);
  const preReadme = lfOnly(rd(path.join(C4, "README.md")));
  const preSettings = md5(fs.readFileSync(path.join(S, ".claude", "settings.json")));
  const b1 = run(["sync", "--from", "5", "--to", "4", "--apply"]);
  t("b1 apply exits 0 and the self-check has no FAIL", b1.code === 0 && !/\[FAIL\]/.test(b1.out), b1.err + b1.out.slice(-1800));
  const bks = fs.existsSync(path.join(S, "_backups")) ? fs.readdirSync(path.join(S, "_backups")).filter((x) => /^class4-code-\d{8}-\d{4}/.test(x)) : [];
  t("b2 a timestamped backup folder exists under _backups", bks.length === 1, bks.join(","));
  const bk = bks.length ? path.join(S, "_backups", bks[0]) : null;
  let bkOk = !!bk;
  const BKRE = /^(cli\.mjs|lib\/|docs\/|viewer\/|runtime\/runtime\.tsx|README\.md|package\.json|pipeline\.config\.json)/;
  if (bk) for (const [k, v] of pre4) if (BKRE.test(k)) { const f = path.join(bk, "class4", ...k.split("/")); if (!fs.existsSync(f) || md5(fs.readFileSync(f)) !== v) { bkOk = false; console.log("        backup mismatch: " + k); break; } }
  t("b3 the backup holds the target's pre-sync code files byte for byte", bkOk);
  t("b4 the backup holds the old voiced-flow agents (udgam-*.md), meta.json, and no work/frozen/output", !!bk && fs.existsSync(path.join(bk, ".claude", "agents", "udgam-tool-builder.md")) && fs.existsSync(path.join(bk, "meta.json")) && !fs.existsSync(path.join(bk, "class4", "work")) && !fs.existsSync(path.join(bk, "class4", "runtime", "frozen")) && !fs.existsSync(path.join(bk, "class4", "output-preview")));
  const postNever = neverMap(C4);
  t("b5 canaries (work, output-preview, .fence.json, caches, assets, *.tmp.mjs) byte-identical", sameMap(preNever, postNever), diffMap(preNever, postNever).join("; "));
  t("b6 runtime/frozen (r21 + versions.json) byte-identical", [...preNever].filter(([k]) => k.startsWith("runtime/frozen/")).every(([k, v]) => postNever.get(k) === v) && preNever.has("runtime/frozen/r21/runtime.tsx"));
  t("b7 the NUL device-name file is untouched", !fx.nulMade || fs.readFileSync("\\\\?\\" + path.join(C4, "NUL"), "utf8") === "device-name canary\n");
  t("b8 the source class5 is byte-identical", sameMap(pre5, hashTree(C5, ["node_modules"])), diffMap(pre5, hashTree(C5, ["node_modules"])).join("; "));
  const cfg4 = rdj(path.join(C4, "pipeline.config.json"));
  t("b9 config: the target's values kept (defaults.class 4, textbooks, envFiles, runtime)", cfg4.defaults.class === 4 && cfg4.textbooks === preCfg.textbooks && JSON.stringify(cfg4.envFiles) === JSON.stringify(preCfg.envFiles) && cfg4.runtime === preCfg.runtime);
  t("b10 config: new keys added (newKey, lpTables.extra)", cfg4.newKey && cfg4.newKey.x === 1 && cfg4.lpTables.extra === "lp2_extra", JSON.stringify(cfg4));
  t("b11 config: class-identity keys are derived, not copied (viewerPort 5183 not 5185, agentPrefix udgam not udgam5, skinLibraries -> class5)", cfg4.viewerPort === 5183 && cfg4.agentPrefix === "udgam" && JSON.stringify(cfg4.skinLibraries) === JSON.stringify(["assets/skins", "../class5/assets/skins"]), JSON.stringify([cfg4.viewerPort, cfg4.agentPrefix, cfg4.skinLibraries]));
  const postBuild = lfOnly(rd(path.join(C4, "docs", "BUILD_CARD.md")));
  const postTail = postBuild.slice(postBuild.indexOf("\n## 7.") + 1);
  const srcBuild = lfOnly(rd(path.join(C5, "docs", "BUILD_CARD.md")));
  t("b12 BUILD_CARD: the target's section 7 (and 8) kept verbatim", postTail === preTail && postTail.length > 1000, `${postTail.length} vs ${preTail.length}`);
  t("b13 BUILD_CARD: sections 1-6 now follow the source (drifted line gone)", postBuild.slice(0, postBuild.indexOf("\n## 7.")) === srcBuild.slice(0, srcBuild.indexOf("\n## 7.")).replace(/\bclass5\b/g, "class4") && !postBuild.includes("OLD BUILD_CARD SECTION LINE"));
  const postReadme = lfOnly(rd(path.join(C4, "README.md")));
  const srcReadme = lfOnly(rd(path.join(C5, "README.md")));
  const srcLines = srcReadme.split("\n");
  let lastFence = -1; srcLines.forEach((l, i) => { if (/^```\s*$/.test(l)) lastFence = i; });
  const srcHead = (lastFence >= 0 ? srcLines.slice(0, lastFence + 1).join("\n") + "\n" : srcReadme).replace(/\bclass5\b/g, "class4");
  t("b14 README: head from the source, class 4's own notes after the last fence kept", preReadme.includes("OLD README HEAD LINE") && postReadme.startsWith(srcHead) && postReadme.endsWith("\nThe reference tool is `work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx`.\n") && !postReadme.includes("OLD README HEAD LINE"), postReadme.slice(-400));
  t("b15 substitutions: class5 -> class4 in carried code; prose such as 'Class 5' is left", /class4\/runtime\/frozen\/r1/.test(rd(path.join(C4, "lib", "zz_probe_subst.mjs"))) && !/class5\//.test(rd(path.join(C4, "lib", "zz_probe_subst.mjs"))) && /Class 5 prose stays/.test(rd(path.join(C4, "lib", "zz_probe_subst.mjs"))));
  const pk = rdj(path.join(C4, "package.json"));
  t("b16 package.json keeps the target's name, package-lock.json untouched", pk.name === "class4-tools" && pre4.get("package-lock.json") === md5(fs.readFileSync(path.join(C4, "package-lock.json"))));
  t("b16b the UNLISTED file was not copied, nor the PORTING note", !fs.existsSync(path.join(C4, "capabilities.json")) && !fs.existsSync(path.join(C4, "docs", "PORTING_TO_CLASS9.md")));
  t("b17 the deleted file and the probe arrived; the target-only file and the drifted lines are handled", fs.existsSync(path.join(C4, ...fx.NEWFILE.split("/"))) && fs.existsSync(path.join(C4, "lib", "zz_probe_subst.mjs")) && fs.existsSync(path.join(C4, "lib", "zz_class4_only.mjs")) && !rd(path.join(C4, "cli.mjs")).includes("class4 local drift") && rd(path.join(C4, "lib", "zz_probe_diff.mjs")).includes('"source"'));
  const ag = rd(path.join(S, ".claude", "agents", "udgam-tool-builder.md"));
  t("b18 class 4's agents regenerated from the templates (name = file, legacy note, class 4 age band)", /^name: udgam-tool-builder$/m.test(ag) && ag.includes("Voiced or silent runtime (legacy note)") && ag.includes("`class4/`") && ag.includes("8 to 10 years old") && !/udgam5|class5/.test(ag), ag.slice(0, 500));
  const postAgents = hashTree(path.join(S, ".claude", "agents"));
  t("b19 the class-5 agents (udgam5-*) are untouched", [...preAgents].filter(([k]) => k.startsWith("udgam5-")).every(([k, v]) => postAgents.get(k) === v) && [...preAgents].some(([k]) => k.startsWith("udgam5-")));
  t("b20 .classctl/sync.json (from 5, per-file md5) and base copies exist; the lock is gone", (() => { const s = fs.existsSync(path.join(C4, ".classctl", "sync.json")) && rdj(path.join(C4, ".classctl", "sync.json")); return s && s.last.from === 5 && Object.keys(s.files).length > 40 && fs.existsSync(path.join(C4, ".classctl", "base", "lib", "core", "args.mjs")) && !fs.existsSync(path.join(C4, ".classctl", "lock")); })());
  t("b21 the root settings.json is not touched by sync", preSettings === md5(fs.readFileSync(path.join(S, ".claude", "settings.json"))));
  t("b22 the runbook category only reports (root files unchanged)", /class-specific/.test(b1.out) || /class-parametric/.test(b1.out));

  section("c. idempotent: a second run is all IDENTICAL");
  const mid = hashTree(S, ["node_modules"]);
  const c2 = run(["sync", "--from", "5", "--to", "4"]);
  const cc = counts(c2.out);
  t("c1 dry run: no NEW, CHANGED, MERGED or CONFLICT", c2.code === 0 && !cc.NEW && !cc.CHANGED && !cc.MERGED && !cc.CONFLICT && cc.IDENTICAL > 40, JSON.stringify(cc) + c2.out.slice(0, 300));
  const c3 = run(["sync", "--from", "5", "--to", "4", "--apply"]);
  t("c2 --apply again writes nothing and takes no backup (whole tree identical)", c3.code === 0 && /not needed/.test(c3.out) && sameMap(mid, hashTree(S, ["node_modules"])), diffMap(mid, hashTree(S, ["node_modules"])).join("; ") + c3.out.slice(-300));

  section("d. a target edited locally: 3-way merge, conflicts, --on-conflict");
  const srcArgs = path.join(C5, "lib", "core", "args.mjs"), tgtArgs = path.join(C4, "lib", "core", "args.mjs");
  const sa = rd(srcArgs), ta = rd(tgtArgs);
  wr(srcArgs, "// SOURCE EDIT (top)\n" + sa);
  wr(tgtArgs, ta + "// TARGET LOCAL EDIT (bottom)\n");
  const d1 = run(["sync", "--from", "5", "--to", "4"]);
  t("d1 dry run reports MERGED for the file edited on both sides", /MERGED\s+lib\/core\/args\.mjs/.test(d1.out), d1.out.slice(0, 600));
  const preD = rd(tgtArgs);
  const d2 = run(["sync", "--from", "5", "--to", "4", "--apply"]);
  const merged = rd(tgtArgs);
  t("d2 apply: both edits are in the file", d2.code === 0 && merged.startsWith("// SOURCE EDIT (top)") && merged.trimEnd().endsWith("// TARGET LOCAL EDIT (bottom)") && preD !== merged, d2.out.slice(-500));
  const d3 = run(["sync", "--from", "5", "--to", "4"]);
  t("d3 next run: your edit is KEPT-LOCAL (listed, not a conflict, not overwritten)", /KEPT-LOCAL\s+lib\/core\/args\.mjs/.test(d3.out) && !/CONFLICT/.test(d3.out.replace(/CONFLICT 0/, "")), d3.out.slice(0, 500));
  const tPng = path.join(C4, "lib", "core", "png.mjs");
  wr(tPng, rd(tPng) + "// only here\n");
  const d3b = run(["sync", "--from", "5", "--to", "4", "--apply"]);
  t("d3b a target-only edit survives an apply", d3b.code === 0 && rd(tPng).endsWith("// only here\n"), d3b.out.slice(-300));

  const wF = "lib/core/work.mjs";
  const sW = path.join(C5, ...wF.split("/")), tW = path.join(C4, ...wF.split("/"));
  const origT = rd(tW);
  wr(sW, "// SOURCE LINE ONE\n" + rd(sW));
  wr(tW, "// TARGET LINE ONE\n" + origT);
  const d4 = run(["sync", "--from", "5", "--to", "4"]);
  t("d4 same spot edited both ways: CONFLICT in the dry run, exit 2", /CONFLICT\s+lib\/core\/work\.mjs/.test(d4.out) && d4.code === 2, d4.out.slice(0, 500));
  const preW = md5(fs.readFileSync(tW));
  const d5 = run(["sync", "--from", "5", "--to", "4", "--apply"]);
  t("d5 apply without --on-conflict writes nothing for that file (exit 2)", d5.code === 2 && md5(fs.readFileSync(tW)) === preW, d5.out.slice(-400));
  const d6 = run(["sync", "--from", "5", "--to", "4", "--apply", "--on-conflict", "markers"]);
  const mk = rd(tW);
  t("d6 --on-conflict markers writes conflict markers (exit 2: to resolve by hand)", d6.code === 2 && /^<<<<<<< target/m.test(mk) && /^>>>>>>> source/m.test(mk), d6.out.slice(-300));
  wr(tW, "// TARGET LINE ONE\n" + origT);
  const d7 = run(["sync", "--from", "5", "--to", "4", "--apply", "--on-conflict", "theirs"]);
  t("d7 --on-conflict theirs takes the source version, and the old file is in a backup", d7.code === 0 && rd(tW) === rd(sW) && (() => { const bs = fs.readdirSync(path.join(S, "_backups")).filter((x) => x.startsWith("class4-code-")); return bs.some((b) => fs.existsSync(path.join(S, "_backups", b, "class4", "lib", "core", "work.mjs")) && rd(path.join(S, "_backups", b, "class4", "lib", "core", "work.mjs")).startsWith("// TARGET LINE ONE")); })(), d7.out.slice(-400));
  const wF2 = "lib/core/args.mjs";
  const sA = path.join(C5, ...wF2.split("/")), tA = path.join(C4, ...wF2.split("/"));
  wr(sA, rd(sA).replace("// SOURCE EDIT (top)\n", "// SOURCE EDIT TWO\n"));
  wr(tA, rd(tA).replace("// SOURCE EDIT (top)\n", "// TARGET EDIT TWO\n"));
  const keepT = rd(tA);
  const d8 = run(["sync", "--from", "5", "--to", "4", "--apply", "--on-conflict", "ours"]);
  const d9 = run(["sync", "--from", "5", "--to", "4"]);
  t("d8 --on-conflict ours keeps the target's file, and the next run says KEPT-LOCAL", d8.code === 0 && rd(tA) === keepT && /KEPT-LOCAL\s+lib\/core\/args\.mjs/.test(d9.out), d8.out.slice(-300) + d9.out.slice(0, 300));
  wr(path.join(C5, "lib", "core", "chrome.mjs"), rd(path.join(C5, "lib", "core", "chrome.mjs")) + "// source change for keep-target test\n");
  const preChrome = md5(fs.readFileSync(path.join(C4, "lib", "core", "chrome.mjs")));
  const d10 = run(["sync", "--from", "5", "--to", "4", "--apply", "--keep-target", "lib/core/chrome.mjs"]);
  t("d9 --keep-target <glob> leaves the file alone (SKIPPED --keep-target)", d10.code === 0 && /SKIPPED\s+lib\/core\/chrome\.mjs\s+.*--keep-target/.test(d10.out) && md5(fs.readFileSync(path.join(C4, "lib", "core", "chrome.mjs"))) === preChrome, d10.out.slice(0, 400));
  const d11 = run(["sync", "--from", "5", "--to", "4", "--apply"]);
  t("d10 without --keep-target the held file arrives on the next sync", d11.code === 0 && rd(path.join(C4, "lib", "core", "chrome.mjs")).endsWith("// source change for keep-target test\n"));

  section("e. line endings: the target's style is kept, new files take the source's");
  const ck = path.join(C4, "lib", "check", "check.mjs");
  t("e1 class4 check.mjs (CRLF) is still all CRLF after taking the source's file", crlfStats(ck).lone === 0 && crlfStats(ck).crlf > 100 && !rd(ck).includes("class4 local drift"), JSON.stringify(crlfStats(ck)));
  wr(tPng, rd(tPng).replace(/\r?\n/g, "\r\n"));
  const sPng = path.join(C5, "lib", "core", "png.mjs");
  wr(sPng, "// png source edit\n" + rd(sPng));
  const e2 = run(["sync", "--from", "5", "--to", "4", "--apply"]);
  t("e2 an LF source edit merged into a CRLF target stays CRLF throughout", e2.code === 0 && crlfStats(tPng).lone === 0 && crlfStats(tPng).crlf > 5 && rd(tPng).includes("// png source edit") && rd(tPng).includes("// only here"), e2.out.slice(-300) + JSON.stringify(crlfStats(tPng)));
  wr(path.join(C5, "lib", "zz_crlf_new.mjs"), "// new crlf\r\nexport const a = 1;\r\n");
  wr(path.join(C5, "lib", "zz_lf_new.mjs"), "// new lf\nexport const b = 2;\n");
  const e3 = run(["sync", "--from", "5", "--to", "4", "--apply"]);
  const nc = crlfStats(path.join(C4, "lib", "zz_crlf_new.mjs")), nl = crlfStats(path.join(C4, "lib", "zz_lf_new.mjs"));
  t("e3 new files keep the source's endings (CRLF stays CRLF, LF stays LF)", e3.code === 0 && nc.crlf === 2 && nc.lone === 0 && nl.crlf === 0 && nl.lone === 2, JSON.stringify([nc, nl]));
  const hold = hashTree(C4, ["node_modules"]);
  const e4 = run(["sync", "--from", "5", "--to", "4"]);
  t("e4 the dry run after all this still writes nothing", sameMap(hold, hashTree(C4, ["node_modules"])) && (e4.code === 0 || e4.code === 2));

  section("f. new --class 91");
  const preAll = hashTree(S, ["node_modules", "class91"]);
  const f0 = run(["new", "--class", "91", "--dry-run"]);
  t("f0 new --dry-run writes nothing and prints the DEFAULTS USED", f0.code === 0 && !fs.existsSync(path.join(S, "class91")) && sameMap(preAll, hashTree(S, ["node_modules", "class91"])) && /DEFAULTS USED/.test(f0.out) && /95 to 97 years old/.test(f0.out) && /indiannica_eng_maths91_ch<n>/.test(f0.out) && /class-91-udgam/.test(f0.out) && /DOES NOT EXIST/.test(f0.out) && /viewer port\s+5187/.test(f0.out) && /udgam91/.test(f0.out), f0.err + f0.out.slice(-1800));
  const f1 = run(["new", "--class", "91"]);
  const C91 = path.join(S, "class91");
  t("f1 new --class 91 exits 0 and its self-check has no FAIL", f1.code === 0 && !/\[FAIL\]/.test(f1.out) && fs.existsSync(C91), f1.err + f1.out.slice(-1500));
  const cfg91 = fs.existsSync(path.join(C91, "pipeline.config.json")) ? rdj(path.join(C91, "pipeline.config.json")) : {};
  t("f2 config: defaults.class 91, textbooks .../class-91-udgam, viewerPort 5187 (max + 2), agentPrefix udgam91", cfg91.defaults && cfg91.defaults.class === 91 && /class-91-udgam$/.test(cfg91.textbooks) && cfg91.viewerPort === 5187 && cfg91.agentPrefix === "udgam91", JSON.stringify(cfg91));
  t("f3 config: skinLibraries = own + read-only siblings; the rest copied through", JSON.stringify(cfg91.skinLibraries) === JSON.stringify(["assets/skins", "../class4/assets/skins", "../class5/assets/skins"]) && cfg91.newKey && cfg91.pubAliases && cfg91.pubAliases.udgam === "indiannica", JSON.stringify(cfg91.skinLibraries));
  const ags = fs.readdirSync(path.join(S, ".claude", "agents")).filter((x) => x.startsWith("udgam91-"));
  const roles = ["tool-builder", "maths-reviewer", "visual-reviewer", "play-tester", "upload-auditor", "image-agent"];
  let fmOk = ags.length === 6;
  for (const r of roles) {
    const f = path.join(S, ".claude", "agents", `udgam91-${r}.md`);
    const txt = fs.existsSync(f) ? rd(f) : "";
    const fm = /^---\n([\s\S]*?)\n---\n/.exec(txt);
    const name = fm && /^name: (.+)$/m.exec(fm[1]);
    if (!fm || !name || name[1] !== `udgam91-${r}` || !/^description: .{20,}/m.test(fm[1]) || !/^model: (opus|sonnet|haiku)$/m.test(fm[1]) || /\{\{|udgam5|class5|class4/.test(txt) || !txt.includes("class91/")) { fmOk = false; console.log("        bad agent: " + r); }
  }
  t("f4 six agents udgam91-*.md: frontmatter valid, name = file name, no placeholder or class5/4 left", fmOk, ags.join(","));
  t("f5 ages follow the band (class 91: 95 to 97 years old)", /95 to 97 years old/.test(rd(path.join(S, ".claude", "agents", "udgam91-tool-builder.md"))));
  const nmStat = fs.existsSync(path.join(C91, "node_modules")) ? fs.lstatSync(path.join(C91, "node_modules")) : null;
  t("f6 node_modules is a junction/link into the source's, and esbuild resolves through it", nmStat && nmStat.isSymbolicLink() && fs.existsSync(path.join(C91, "node_modules", "esbuild", "package.json")));
  const fz = path.join(C91, "runtime", "frozen");
  t("f7 no frozen snapshots; empty work/ and output-preview/", fs.existsSync(fz) && fs.readdirSync(fz).length === 0 && fs.readdirSync(path.join(C91, "work")).length === 0 && fs.readdirSync(path.join(C91, "output-preview")).length === 0);
  const bc = lfOnly(rd(path.join(C91, "docs", "BUILD_CARD.md")));
  const rm = lfOnly(rd(path.join(C91, "README.md")));
  const rmHead = rm.split("<!-- classctl:notes -->")[0];
  t("f8 BUILD_CARD has a fresh section 7 (one row, class 91) and the neutral 1-6; README has its class note and no class5 left above it", /## 7\. Decisions log[\s\S]*classctl new/.test(bc) && !/class 4 decision/.test(bc) && /^## 8\. Open questions/m.test(bc) && /<!-- classctl:notes -->/.test(rm) && !/\bclass5\b/.test(rmHead) && /--class 91/.test(rm), `${bc.slice(bc.indexOf("## 7.") - 100, bc.indexOf("## 7.") + 900)}\n----\n${rm.slice(-500)}`);
  t("f9 the PORTING note and the UNLISTED file were not copied; the viewer and runtime head were", !exists(path.join(C91, "docs", "PORTING_TO_CLASS9.md")) && !exists(path.join(C91, "capabilities.json")) && exists(path.join(C91, "viewer", "src", "App.tsx")) && exists(path.join(C91, "runtime", "runtime.tsx")));
  t("f10 package.json named class91-tools; the lock carries the new name", rdj(path.join(C91, "package.json")).name === "class91-tools" && rdj(path.join(C91, "package-lock.json")).name === "class91-tools");
  const settings = rdj(path.join(S, ".claude", "settings.json"));
  t("f11 by default `new` does NOT touch .claude/settings.json (md5 unchanged), but prints the deny rules it proposes", md5(fs.readFileSync(path.join(S, ".claude", "settings.json"))) === preSettings && !settings.permissions.deny.some((d) => d.includes("./class91/")) && /PROPOSED: \+\d+ permissions\.deny rules for \.\/class91\//.test(f1.out) && /Read\(\.\/class91\/node_modules\/\*\*\)/.test(f1.out), f1.out.slice(-900));
  const wantRules = settings.permissions.deny.filter((d) => d.includes("./class5/")).length;
  const f11b = run(["new", "--class", "93", "--from", "5", "--wire"]);
  const settings2 = rdj(path.join(S, ".claude", "settings.json"));
  t("f11b `new --wire` adds the class's deny rules (cloned from class5's) and backs up the original settings.json", f11b.code === 0 && wantRules > 0 && settings2.permissions.deny.filter((d) => d.includes("./class93/")).length === wantRules && fs.readdirSync(path.join(S, "_backups")).some((b) => b.startsWith("class93-new-") && md5(fs.readFileSync(path.join(S, "_backups", b, ".claude", "settings.json"))) === preSettings), f11b.err + f11b.out.slice(-700));
  t("f12 the new class has a sync record (from 5) and base copies; no lock left", (() => { const s = rdj(path.join(C91, ".classctl", "sync.json")); return s.last.from === 5 && s.last.counts.NEW > 40 && fs.existsSync(path.join(C91, ".classctl", "base", "lib", "core", "args.mjs")) && !fs.existsSync(path.join(C91, ".classctl", "lock")); })());
  const f13 = run(["new", "--class", "91"]);
  t("f13 new --class 91 again refuses (exit 1) and changes nothing", f13.code === 1 && /already exists/.test(f13.err + f13.out));
  const cli = spawnSync(process.execPath, [path.join(C91, "cli.mjs"), "runtime", "freeze", "--note", "classctl test"], { cwd: C91, encoding: "utf8" });
  t("f14 the new class's own CLI runs: `runtime freeze` makes r1 from the head", cli.status === 0 && fs.existsSync(path.join(C91, "runtime", "frozen", "r1", "runtime.tsx")), (cli.stderr || "") + (cli.stdout || "").slice(-500));
  const f15 = run(["new", "--class", "92", "--port", "5185"]);
  t("f15 a port already in use is refused", f15.code === 1 && /already used/.test(f15.err));
  const f16 = run(["new", "--class", "92", "--from", "4", "--no-link"]);
  t("f16 --from 4 --no-link: class 92 from class 4, no junction, no deny rules for it in settings", f16.code === 0 && fs.existsSync(path.join(S, "class92")) && !fs.existsSync(path.join(S, "class92", "node_modules")) && !rdj(path.join(S, ".claude", "settings.json")).permissions.deny.some((d) => d.includes("./class92/")), f16.err + f16.out.slice(-700));
  const st1 = run(["status"]);
  t("f17 status now lists class91 and class92 with their prefixes", /class91\s+defaults\.class 91.*prefix udgam91/.test(st1.out) && /class92\s+defaults\.class 92.*prefix udgam92/.test(st1.out), st1.out.slice(0, 1500));

  /* the hub (viewhub.mjs, `node viewhub.mjs`: every class on one page) must find a class made by `new` on the port its config
     names, and the new class must carry the embedding viewer the hub drives, so nothing is done by hand for a new class */
  const hubList = spawnSync(process.execPath, [path.join(HERE, "viewhub.mjs"), "--list", "--root", S], { encoding: "utf8" });
  let hubClasses = []; try { hubClasses = JSON.parse(hubList.stdout); } catch { /* reported below */ }
  const h91 = hubClasses.find((x) => x.class === 91), h92 = hubClasses.find((x) => x.class === 92);
  t("f18 the hub finds the new classes by itself, on the port their config names (91: 5187, installed; 92 was made --no-link: not installed)", hubList.status === 0 && h91 && h91.port === cfg91.viewerPort && h91.installed && h91.hasViewer && h92 && !h92.installed && /node viewhub\.mjs/.test(f1.out), (hubList.stderr || "") + (hubList.stdout || "").slice(0, 600));
  const app91 = rd(path.join(C91, "viewer", "src", "App.tsx")), css91 = rd(path.join(C91, "viewer", "src", "styles.css"));
  t("f19 the new class inherits the hub's embedding viewer (?embed, ?ch and ?tool, the ready/select/selected messages, the embed tint)", /QUERY\.get\("embed"\)/.test(app91) && /udgam-viewer:ready/.test(app91) && /udgam-viewer:select"/.test(app91) && /udgam-viewer:selected/.test(app91) && /\.app\.embed/.test(css91), app91.slice(0, 300));

  section("g. refusals, locks, restore");
  const g1 = run(["sync", "--from", "5", "--to", "5"]);
  t("g1 --from == --to is refused (exit 1)", g1.code === 1 && /nothing to sync/.test(g1.err));
  const g2 = run(["sync", "--from", "5", "--to", "77"]);
  const g3 = run(["sync", "--from", "77", "--to", "4"]);
  t("g2 a missing target / source class is refused (exit 1)", g2.code === 1 && /class 77 not found/.test(g2.err) && g3.code === 1 && /class 77 not found/.test(g3.err));
  fs.mkdirSync(path.join(C4, ".classctl"), { recursive: true });
  wr(path.join(C4, ".classctl", "lock"), '{"pid":1}\n');
  const snap = hashTree(C4, ["node_modules"]);
  const g4 = run(["sync", "--from", "5", "--to", "4", "--apply"]);
  const g5 = run(["sync", "--from", "5", "--to", "4"]);
  t("g3 a locked target is refused for apply and for a dry run (exit 1), lock left in place, nothing written", g4.code === 1 && g5.code === 1 && /locked/.test(g4.err) && fs.existsSync(path.join(C4, ".classctl", "lock")) && sameMap(snap, hashTree(C4, ["node_modules"])));
  const g6 = run(["status"]);
  t("g4 status warns about the lock", /LOCKED/.test(g6.out));
  fs.unlinkSync(path.join(C4, ".classctl", "lock"));
  const g7 = run(["sync", "--from", "5", "--to", "4", "--only", "nonsense"]);
  t("g5 an unknown --only category is refused", g7.code === 1 && /unknown category/.test(g7.err));
  const g8 = run(["sync", "--from", "5", "--to", "4", "--only", "docs"]);
  t("g6 --only docs plans docs files only", g8.code === 0 && !/--- code/.test(g8.out) && !/--- agents/.test(g8.out) && /--- docs/.test(g8.out));
  /* restore: put class4 back to the state before the first apply */
  const firstBk = fs.readdirSync(path.join(S, "_backups")).filter((x) => x.startsWith("class4-code-")).sort()[0];
  const rs = run(["restore", "--class", "4", "--backup", path.join(S, "_backups", firstBk), "--apply"]);
  const now4 = code4Files(C4);
  let restored = true; const why = [];
  for (const [k, v] of pre4) if (BKRE.test(k) && now4.get(k) !== v) { restored = false; why.push(k); }
  t("g7 restore puts the first backup's files back, byte for byte, and removes what that sync created", rs.code === 0 && restored && !exists(path.join(C4, ...fx.NEWFILE.split("/"))) && !exists(path.join(C4, "lib", "zz_probe_subst.mjs")) && sameMap(preNever, neverMap(C4)), (rs.err + rs.out).slice(-300) + why.slice(0, 5).join(","));
  const agNow = hashTree(path.join(S, ".claude", "agents"));
  t("g7b restore also puts the old voiced-flow agents back (udgam-*.md as before the first sync)", [...preAgents].filter(([k]) => k.startsWith("udgam-")).every(([k, v]) => agNow.get(k) === v) && [...preAgents].some(([k]) => k.startsWith("udgam-")));
  t("g7c restore rewinds classctl's own record (no sync.json, no base copies: the next sync is a first sync again)", !fs.existsSync(path.join(C4, ".classctl", "sync.json")) && !fs.existsSync(path.join(C4, ".classctl", "base")) && !fs.existsSync(path.join(C4, ".classctl", "lock")));
  const g8x = run(["sync", "--from", "5", "--to", "4"]);
  t("g8 after a restore the dry run is a first sync again (CHANGED, no recorded base)", /no recorded base/.test(g8x.out) && /none recorded/.test(g8x.out));

  section("h. agent templates round-trip against the class-5 agents (copied at the start)");
  const tplDir = path.join(S, "_templates", "agents");
  const fill = (s, v) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => v[k]);
  const vars = { N: 5, PFX: "udgam5", DIR: "class5", AGE: "9 to 11", AGE_DASH: "9-11", AGE_LOW: 9, AGE_HIGH: 11 };
  const strip = (s) => s.replace(/\*\*Class 5 folder\.\*\*[^\n]*\n(?:[^\n]*\n[^\n]*\n)?/, "").replace(/\*\*Voiced or silent runtime \(legacy note\)\.\*\*[^\n]*\n\n/, "");
  let worst = 0;
  const rows = [];
  for (const r of roles) {
    const real = lfOnly(rd(path.join(S, ".claude", "agents", `udgam5-${r}.md`)));
    const rendered = fill(lfOnly(rd(path.join(tplDir, `${r}.md.tpl`))), vars);
    const a = tmp("real-" + r, strip(real)), b = tmp("rend-" + r, strip(rendered));
    const g = spawnSync("git", ["diff", "--no-index", "--numstat", a, b], { encoding: "utf8" });
    const m = /^(\d+)\s+(\d+)/m.exec(g.stdout || "");
    const lines = m ? +m[1] + +m[2] : 0;
    rows.push(`${r}: ${lines} diff lines`);
    worst = Math.max(worst, lines);
  }
  t("h1 templates rendered for class 5 reproduce udgam5-*.md except the deliberate edits (folder paragraph, legacy note, runtime-aware lines): at most 20 changed lines each", worst <= 20, rows.join(", "));
  t("h2 every template renders for N=5 and N=4 without a placeholder left", roles.every((r) => !/\{\{/.test(fill(rd(path.join(tplDir, `${r}.md.tpl`)), vars)) && !/\{\{/.test(fill(rd(path.join(tplDir, `${r}.md.tpl`)), { N: 4, PFX: "udgam", DIR: "class4", AGE: "8 to 10", AGE_DASH: "8-10", AGE_LOW: 8, AGE_HIGH: 10 }))));

  section("j. rootdocs: the reviewed proposals go in only on --apply, with the originals saved");
  const j0 = hashTree(S, ["node_modules"]);
  const j1 = run(["rootdocs"]);
  t("j1 rootdocs dry run (default stage _templates/rootdocs-proposed) lists 6 CHANGED and writes nothing", j1.code === 0 && (j1.out.match(/CHANGED/g) || []).length === 6 && sameMap(j0, hashTree(S, ["node_modules"])), j1.err + j1.out.slice(0, 700));
  const origRunbook = md5(fs.readFileSync(path.join(S, "udgam_maths_claude.md")));
  const stagedRunbook = md5(fs.readFileSync(path.join(S, "_templates", "rootdocs-proposed", "udgam_maths_claude.md.proposed")));
  const stagedClaude = md5(fs.readFileSync(path.join(S, "_templates", "rootdocs-proposed", "CLAUDE.md.proposed")));
  const j2 = run(["rootdocs", "--apply"]);
  const rbk = fs.existsSync(path.join(S, "_backups")) ? fs.readdirSync(path.join(S, "_backups")).filter((x) => x.startsWith("rootdocs-")) : [];
  t("j2 --apply installs them and saves the originals under _backups/rootdocs-*", j2.code === 0 && rbk.length === 1 && md5(fs.readFileSync(path.join(S, "_backups", rbk[0], "udgam_maths_claude.md"))) === origRunbook && md5(fs.readFileSync(path.join(S, "udgam_maths_claude.md"))) === stagedRunbook && md5(fs.readFileSync(path.join(S, "CLAUDE.md"))) === stagedClaude && rd(path.join(S, "udgam_maths_claude.md")).includes("classctl:runbook-v1"), j2.err + j2.out.slice(-500));
  const j3 = run(["status"]);
  t("j3 status now reports the root runbook as class-parametric", /root udgam_maths_claude\.md: class-parametric/.test(j3.out), j3.out.slice(-400));
  const j4 = run(["rootdocs"]);
  t("j4 a second rootdocs run lists nothing to change", (j4.out.match(/IDENTICAL/g) || []).length === 6 && !/CHANGED/.test(j4.out));

  section("i. the real folders were only read (md5 manifests of real class4, class5 and the root, before and after)");
  let realAfter = realManifests();
  let d4x = diffMap(realBefore.class4, realAfter.class4), d5x = diffMap(realBefore.class5, realAfter.class5), drx = diffMap(realBefore.root, realAfter.root);
  if (d4x.length || d5x.length || drx.length) { sleep(3000); realAfter = realManifests(); d4x = diffMap(realBefore.class4, realAfter.class4); d5x = diffMap(realBefore.class5, realAfter.class5); drx = diffMap(realBefore.root, realAfter.root); }
  const artefact = (d) => /\.classctl-tmp|\.classctl\/lock|classctl-test/.test(d);
  t("i1 real class4/ code files and records identical before and after the run", d4x.length === 0, d4x.slice(0, 8).join("; "));
  t("i2 real class5/ identical before and after (a change by another session while this runs is reported, not blamed; classctl artefacts never are)", !d5x.some(artefact) && (d5x.length === 0 || (console.log("        note: class5 changed during the run (another session is editing it): " + d5x.slice(0, 6).join("; ")), true)));
  t("i3 real root files, .claude/, _templates/ and the _backups listing identical before and after the run", drx.length === 0, drx.slice(0, 8).join("; "));
} catch (e) {
  t("test run completed without a crash", false, e.stack || e.message);
} finally {
  /* junctions first, so nothing recursive can follow one; then assert the real node_modules is intact */
  try { for (const k of ["class91", "class92", "class93"]) { const j = path.join(S, k, "node_modules"); if (fs.existsSync(j) && fs.lstatSync(j).isSymbolicLink()) fs.unlinkSync(j); } } catch { /* ignore */ }
  if (KEEP) console.log(`\nscratch kept: ${S}`); else { try { safeRm(S); } catch (e) { console.log("cleanup problem: " + e.message); } }
  t("z the real class5/node_modules/esbuild is intact after cleanup", fs.existsSync(realEsbuild));
}

function tmp(name, data) { const f = path.join(os.tmpdir(), `classctl-test-${process.pid}-${name}.txt`); fs.writeFileSync(f, data); process.on("exit", () => { try { fs.unlinkSync(f); } catch { /* ignore */ } }); return f; }

const pass = results.filter((r) => r.ok).length;
console.log(`\n${pass} / ${results.length} passed${pass === results.length ? "" : "   FAILED: " + results.filter((r) => !r.ok).map((r) => r.name.split(" ")[0]).join(", ")}`);
process.exit(pass === results.length ? 0 : 1);
