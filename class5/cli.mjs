#!/usr/bin/env node
/* Udgam maths tools: one CLI for every step (the order of work is in README.md). The same code serves every class:
 * the class of this folder is pipeline.config.json `defaults.class` (README.md lists every config key), and a
 * chapter's pinned runtime decides, by what its source contains, which checks, drives and outputs apply (lib/core/caps.mjs).
 *
 *   node cli.mjs doctor
 *   node cli.mjs list     [--class 4] [--pub udgam]
 *   node cli.mjs fetch    --ch 1[,2|1-3] [--class 4] [--pub udgam] [--version active|latest|N] [--plan-file f.json]
 *   node cli.mjs scaffold <MEDIA_ID> [--ch N] [--force]
 *   node cli.mjs preview  <MEDIA_ID> [--ch N]
 *   node cli.mjs shots    <MEDIA_ID> [--ch N] [--state ask|mount|wrong|solve|idle|party] [--full --phase n] [--lang hi|gu] [--panel open]
 *                         (party, r40: phase 1 and the last phase 0.9 s after the right answer of their last question, motion on)
 *   node cli.mjs shots    <MEDIA_ID> [--ch N] --pack [--changed] [--langs en,hi,gu]
 *                         THE REVIEW PACK (docs/REVIEW_PACK.md): every frame a reviewer needs at the full 1600x900 in <slot>/pack/
 *                         (p<phase>-<state>-<lang>.png + pack.json), made in one go; --changed lists the frames that are new or
 *                         whose pixels differ from the pack before (pack.prev.json), still rebuilding the whole pack
 *   node cli.mjs check    <MEDIA_ID> [--ch N] [--no-render] [--rows all] [--force]
 *                         every check, one report (docs/CHECKS.md). The printout shows the summary line and every row that is
 *                         not a pass; --rows all prints every row. status.json and .build/check.json always keep every row.
 *                         A pass ports, except over a HAND-EDITED pair (its port is skipped; --force overwrites it, losing the edits)
 *   node cli.mjs port     <MEDIA_ID> [--ch N] [--force]         standalone <ID>.tsx + <ID>.json in output-preview/; refuses a
 *                         hand-edited pair (--force overwrites it and moves status.handEdit to handEditReplaced)
 *   node cli.mjs approve  <MEDIA_ID> [--ch N] [--note "what changed"]
 *                         a SMALL CHANGE made in the pair itself (runbook "Small changes to one tool"): proves the pair as it
 *                         stands (hostsim; every phase in en, hi, gu driven: wrong answer, digit key, every question right;
 *                         the key's corner clear) and records it in status.handEdit, so publish accepts those exact bytes.
 *                         New bytes need --note. Env: CHROME_PATH (Linux: chrome-headless-shell), C4_FONTCONFIG (Poppins)
 *   node cli.mjs publish  <MEDIA_ID> [--ch N] [--upload] [--apply] [--version latest|N]
 *                         dry run by default; --upload writes to the bucket, --apply fixes lp2_media urls,
 *                         --offline lets --upload go ahead when lpv2 is unreachable (plan copy from fetch)
 *   node cli.mjs publish  --ch N [--upload] [--apply] [--offline] [--version latest|N]
 *                         no MEDIA_ID: publishes every slot of the chapter, one after another, same flags;
 *                         reports ok/failed per slot and a summary line, exits non-zero if any slot failed
 *   node cli.mjs clean    <MEDIA_ID> [--ch N] [--html] [--dry] [--force]
 *   node cli.mjs clean    --ch N [--html] [--dry] [--force]
 *                         the end-of-chapter tidy (runbook step 8): drops the review artefacts (PNG sheets and other images,
 *                         .build/, logs, editor leftovers, the review pack's frames; the preview page too with --html) of every
 *                         slot whose last check passed and is still fresh; a failing or stale slot is left alone (--force cleans
 *                         it too); never the source, voice, images.tsx/json, brief, slot.json, status.json, output-preview/ or the
 *                         pack's pack.json + pack.prev.json (a review round after the tidy re-reviews only what changed); --dry only lists
 *   node cli.mjs voice    <MEDIA_ID> [--ch N] [--langs hi,gu]   a VOICED runtime (no SILENT_VOICE): bake Hindi/Gujarati speech into
 *                         <slot>/voice.tsx (Google Cloud TTS, cached in .voice-cache/; English keeps the device voice).
 *                         A SILENT runtime (r30+): says there is nothing to bake and exits; `check` (tr-coverage) proves
 *                         the printed Hindi and Gujarati. --force still bakes it, for reference only
 *   node cli.mjs mascot   [--src svg|png] [--height 420]        regenerate runtime/mascot.tsx (config `mascot`: ../kiko.svg, Kiko)
 *   node cli.mjs fontkit  the FONT KIT (docs/LAYOUT.md §9): runtime/fontkit.json -> runtime/fontkit.tsx, Poppins 500/600/700 subset
 *                         (Latin + Devanagari, fontTools woff2) as @font-face data URIs carried inside every tool (generated; never read it)
 *   node cli.mjs actionkit [--dry] [--force] [--only key] [--model m]   the ACTION KIT (docs/IMAGES.md §11): the five tool
 *                         pictures api.act draws (knife, scissors, ruler, pencil, eraser) from runtime/actionkit.json through the
 *                         skin library and ledger, made once for every tool -> runtime/actionkit.tsx (generated; never read it)
 *   node cli.mjs images   make <MEDIA_ID> [--ch N] [--force] [--only key] [--dry] [--model name]
 *                         skins (docs/IMAGES.md): reads <slot>/images.json (written by the image agent), makes only
 *                         what the library and the raw cache lack (this class's, then the config's skinLibraries,
 *                         read-only; Gemini, ledgered), writes <slot>/images.tsx (+ the keypad TOOL_THEME when the
 *                         pinned runtime has a THEME)
 *   node cli.mjs images   make --ch N [--batch] | batch submit|status|apply|cancel --ch N
 *                         every slot of a chapter, each unique picture once; --batch = one Gemini batch job, half price
 *   node cli.mjs images   sheet <MEDIA_ID> [--ch N] | status [--ch N] | list
 *   node cli.mjs status   [--ch N]
 *   node cli.mjs runtime  freeze [rN] [--note "why"] | pin --ch N [--version rN] | status | seal --ch N
 *                         a chapter builds on ITS OWN frozen runtime (runtime/frozen/<rN>/), named in
 *                         work/<chapter_id>/runtime.json, so a runtime edit for one chapter can never
 *                         restale another chapter's finished tools
 *                         freeze / pin (not a restore `freeze rN`) also need --ch N --gate prereview|postplay|step6|blocker
 *                         (blocker: --proof "<real-input probe>"), or --ungated "why" (logged): the batched-runtime rule
 *                         as code (../orchestration.json runtimeGates, ../orchlib/hooks.mjs)
 *   node cli.mjs fence    [--off | --on | --clear]   the read fence: a session that has opened one
 *                         chapter's work/ cannot read another chapter's
 *   node cli.mjs view     [--port N] [--watch]                   a local React app: every output-preview/
 *                         tool rendered the way the host runs it, with a sidebar of sidecar JSON checks,
 *                         the pipeline's own status (with re-run buttons) and live diagnostics
 *
 * Defaults (pipeline.config.json): lpv2, this folder's class (defaults.class), pub indiannica (alias udgam), medium eng,
 * subject maths, version active-else-latest for fetch, latest for publish (TOOL_PASS rule).
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { CONFIG, ROOT, PIPELINE_ROOT, CLASS_NUM, CLASS_DIR, AGE_BAND, agentName, skinLibraries, fenceFilePath, env, mask, lpDest, fromRoot } from "./lib/core/env.mjs";
import { parseArgs, chapterList } from "./lib/core/args.mjs";
import { chromePath, sweepChromeTempThorough, chromeTempReport } from "./lib/core/chrome.mjs";
import { withDb, listChapters, chapterRow, plansFor, choosePlan, blobFor, planFromFile, mounts, chapterIdFor } from "./lib/plan/lp.mjs";
import { buildBrief } from "./lib/plan/brief.mjs";
import { scaffold } from "./lib/build/scaffold.mjs";
import { resolveTarget, readStatus, writeStatus, workRoot, idOf } from "./lib/core/work.mjs";
import { bakeVoice } from "./lib/build/voice.mjs";
import { buildPreview } from "./lib/build/preview.mjs";
import { contactSheet, fullShot, partyShots, STATES } from "./lib/build/shots.mjs";
import { buildPack } from "./lib/build/pack.mjs";
import { hashOf, setReportRows } from "./lib/check/check.mjs";
import { checkAndPort } from "./lib/check/runAndShip.mjs";
import { makeMascot } from "./lib/build/mascot.mjs";
import { makeFontKit } from "./lib/build/fontkit.mjs";
import { cleanSlot } from "./lib/finish/clean.mjs";
import { portAndVerify, pairState } from "./lib/ship/port.mjs";
import { approve } from "./lib/check/approve.mjs";
import { publish } from "./lib/ship/publish.mjs";
import { publishedOf, stamp } from "./lib/ship/published.mjs";
import { loadServiceAccount, accessToken, probeBucket } from "./lib/ship/gcs.mjs";
import { freeze, headVersion, readVersions, readPin, writePin, pinState, sha, headHashes } from "./lib/core/pin.mjs";
import { readFence, fenceSet } from "./lib/core/fence.mjs";
import { imagesCommand, makeActionKit } from "./lib/images/make.mjs";

const BOOLEANS = ["force", "full", "json", "help", "no-render", "upload", "apply", "offline", "watch", "off", "on", "clear", "html", "dry", "pack", "changed"];
const a = parseArgs(process.argv.slice(3), BOOLEANS);
const cmd = process.argv[2];
const kb = (n) => (n / 1024).toFixed(1).padStart(6) + " KB";
const rel = (p) => path.relative(process.cwd(), p) || ".";
const pad = (s, n) => String(s ?? "").padEnd(n);
const D = CONFIG.defaults;
const klass = () => Number(a.class || D.class);

/* the root orchestration (../orchlib/hooks.mjs, policy ../orchestration.json): the check cache key, the runtime freeze gates and
   the voice key, the same for every class. Fails open: no root orchlib, or an error inside it, never stops a command; only a
   gate's refusal does (the caller throws it). */
async function orchHook(name, args) {
  const f = path.join(PIPELINE_ROOT, "orchlib", "hooks.mjs");
  if (!fs.existsSync(f)) return null;
  try {
    const m = await import(pathToFileURL(f).href);
    return typeof m[name] === "function" ? await m[name]({ classDir: ROOT, ...args }) : null;
  } catch (e) { console.log(`  (orch ${name} skipped: ${e.message})`); return null; }
}

async function doctor() {
  const E = env();
  const req = createRequire(import.meta.url);
  const ver = (m) => { try { return req(`${m}/package.json`).version; } catch { return "MISSING"; } };
  console.log(`${CLASS_DIR} doctor`);
  console.log(`  class       ${CLASS_NUM} (${CONFIG.defaults.pub}, ${CONFIG.defaults.medium}, ${CONFIG.defaults.subject}) · ages ${AGE_BAND} · agents ${agentName("tool-builder")} ...${skinLibraries().length ? ` · reads skins of ${skinLibraries().join(", ")}` : ""}`);
  console.log(`  node        ${process.version}`);
  console.log(`  deps        esbuild ${ver("esbuild")} · pg ${ver("pg")} · react ${ver("react")} · react-dom ${ver("react-dom")}`);
  console.log(`  lp dest     ${lpDest()} (${Object.values(CONFIG.lpTables).join(", ")})`);
  console.log(`  env files   ${E.files.map((f) => `${path.basename(path.dirname(f.file))}/${path.basename(f.file)} ${f.exists ? "ok" : "MISSING"}`).join(" · ")}`);
  for (const k of ["DATABASE_URL", "ORCH_GCS_BUCKET", "ORCH_CDN_HOST", "ORCH_ORIGIN_HOST", "ORCH_GCS_CACHE_CONTROL"])
    console.log(`  ${pad(k, 24)}${pad(mask(E.get(k)), 18)}${E.source(k) ? "from " + E.source(k) : ""}`);
  let ok = true;
  const keyFile = fromRoot(CONFIG.gcpKeyFile);
  try {
    const sa = loadServiceAccount(keyFile);
    console.log(`  gcp key     ${rel(keyFile)} · project ${sa.project_id} · private key present`);
    const tok = await accessToken(sa);
    console.log("  gcs token   ok (read-only scope)");
    const bucket = E.get("ORCH_GCS_BUCKET");
    if (bucket) {
      const st = await probeBucket(tok, bucket);
      console.log(`  bucket      ${bucket} -> HTTP ${st}${st === 200 ? "" : st === 403 ? " (no bucket-level read; object writes are checked at publish)" : ""}`);
    }
  } catch (e) { ok = false; console.log(`  gcp         FAIL ${e.message}`); }
  try {
    await withDb(E, async (db) => {
      await db.query("SELECT 1");
      const prefix = chapterIdFor({ klass: klass(), pub: a.pub, ch: "" });
      const n = (await db.query(`SELECT count(*)::int AS n FROM ${CONFIG.lpTables.chapters} WHERE chapter_id LIKE $1`, [prefix + "%"])).rows[0].n;
      console.log(`  db          ok · ${n} chapter(s) in lpv2 matching ${prefix}*`);
    });
  } catch (e) { ok = false; console.log(`  db          FAIL ${e.message}`); }
  const ch = chromePath();
  console.log(`  chrome      ${ch || "MISSING (set CHROME_PATH)"}`);
  if (!ch) ok = false;
  const { removed } = sweepChromeTempThorough();
  if (removed) console.log(`  chrome temp swept ${removed} stale profile dir(s), idle 2h+`);
  const rep = chromeTempReport();
  if (rep && rep.scoped > 200)
    console.log(`  chrome temp WARN  ${rep.scoped} scoped_dir* folders in ${rep.tmp} — Chrome's own scratch, left behind by a killed Chrome (ours or another app's); not swept automatically, clear by hand if disk is tight`);
  console.log(ok ? "\nall green" : "\nsome checks failed (see above)");
  if (!ok) process.exitCode = 1;
}

async function list() {
  const prefix = chapterIdFor({ klass: klass(), pub: a.pub, medium: a.medium, subject: a.subject, ch: "" });
  const rows = await withDb(env(), (db) => listChapters(db, prefix));
  console.log(`lpv2 chapters matching ${prefix}*`);
  if (!rows.length) { console.log("  none. (Is the plan uploaded? Offline: fetch --plan-file <json>)"); return; }
  console.log(`  ${pad("ch", 4)}${pad("chapter_id", 30)}${pad("name", 28)}${pad("active", 8)}${pad("latest", 8)}versions`);
  for (const r of rows) {
    const act = r.plans.find((p) => p.is_active);
    console.log(`  ${pad(r.chapter_number, 4)}${pad(r.chapter_id, 30)}${pad(String(r.chapter_name || "").slice(0, 26), 28)}${pad(act ? "v" + act.version : "-", 8)}${pad(r.plans[0] ? "v" + r.plans[0].version : "-", 8)}${r.plans.length}`);
  }
}

async function fetchChapters() {
  let jobs = [];
  if (a["plan-file"]) {
    jobs.push(planFromFile(path.resolve(String(a["plan-file"]))));
  } else {
    const chs = a["chapter-id"] ? [null] : chapterList(a.ch);
    if (!chs.length) throw new Error("which chapters? --ch 1 or --ch 1,2 or --ch 1-3 (with --class and --pub, default 4 / udgam)");
    jobs = await withDb(env(), async (db) => {
      const got = [];
      for (const ch of chs) {
        const chapterId = a["chapter-id"] || chapterIdFor({ klass: klass(), pub: a.pub, medium: a.medium, subject: a.subject, ch });
        const row = await chapterRow(db, chapterId);
        if (!row) { console.log(`  ${chapterId}: not in lpv2 (skipped)`); continue; }
        const pick = choosePlan(await plansFor(db, chapterId), a.version || D.version);
        if (pick.error) { console.log(`  ${chapterId}: ${pick.error} (skipped)`); continue; }
        const blob = await blobFor(db, pick.chosen.plan_id);
        if (!blob) { console.log(`  ${chapterId}: no blob for ${pick.chosen.plan_id} (skipped)`); continue; }
        got.push({ raw: blob.raw_json, chapterId, planId: pick.chosen.plan_id, version: blob.version ?? pick.chosen.version,
          how: pick.how, warning: pick.warning, chapterName: row.chapter_name });
      }
      return got;
    });
  }
  for (const j of jobs) writeChapter(j);
}

function writeChapter(j) {
  const raw = typeof j.raw === "string" ? JSON.parse(j.raw) : j.raw;
  const cdir = path.join(workRoot(), j.chapterId);
  fs.mkdirSync(cdir, { recursive: true });
  /* a chapter is pinned to the runtime of the day it was fetched, and never re-pinned here:
     re-fetching a plan must not move a finished chapter onto a newer runtime. */
  if (!readPin(cdir)) {
    const v = freeze(null, { note: `head at ${j.chapterId} fetch` }).version;
    writePin(cdir, v, { why: `fetched ${new Date().toISOString().slice(0, 10)}` });
    console.log(`  runtime ${v} pinned for ${j.chapterId} (runtime/frozen/${v})`);
  }
  fs.writeFileSync(path.join(cdir, "plan.json"), JSON.stringify(raw));
  const ms = mounts(raw);
  console.log(`\n${j.chapterId} · "${j.chapterName}" · ${j.planId} v${j.version} (${j.how})`);
  if (j.warning) console.log(`  ! ${j.warning}`);
  console.log(`  ${ms.length} 2D mount(s)\n  ${pad("media id", 20)}${pad("tool", 30)}${pad("phases", 8)}${pad("slot", 11)}brief      status`);
  const table = ["| media id | tool | phases | brief | status |", "|---|---|---|---|---|"];
  for (const m of ms) {
    const s = m.slot;
    const dir = path.join(cdir, s.id);
    fs.mkdirSync(dir, { recursive: true });
    const slotJson = JSON.stringify(s);
    const brief = buildBrief(m, j);
    fs.writeFileSync(path.join(dir, "slot.json"), slotJson);
    fs.writeFileSync(path.join(dir, "brief.md"), brief);
    const prev = readStatus(dir);
    const st = writeStatus(dir, { stage: prev.stage && prev.stage !== "brief" ? prev.stage : "brief", chapterId: j.chapterId, planId: j.planId,
      version: j.version, fetchedAt: new Date().toISOString(), slotBytes: Buffer.byteLength(slotJson), briefBytes: Buffer.byteLength(brief) });
    const nph = ((s.writeup || {}).phases || []).length;
    console.log(`  ${pad(s.id, 20)}${pad(s.tool_id || s.title, 30)}${pad(nph, 8)}${kb(st.slotBytes)} ${kb(st.briefBytes)}  ${st.stage}`);
    table.push(`| ${s.id} | ${s.tool_id || s.title} | ${nph} | ${(st.briefBytes / 1024).toFixed(1)} KB | ${st.stage} |`);
  }
  fs.writeFileSync(path.join(cdir, "mounts.md"), `# ${j.chapterId} · ${j.chapterName}\n\n${j.planId} v${j.version} (${j.how})${j.warning ? "\n\n> " + j.warning : ""}\n\n${table.join("\n")}\n`);
  console.log(`  wrote ${rel(cdir)}/  (plan.json, mounts.md, <id>/brief.md + slot.json + status.json)`);
}

function doScaffold() {
  const dir = resolveTarget(a._[0], a);
  const r = scaffold(dir, { force: !!a.force });
  writeStatus(dir, { stage: "scaffold", toolBytes: r.bytes });
  console.log(`scaffolded ${rel(r.file)} · ${r.phases} phases · component ${r.component} · ${kb(r.bytes).trim()}`);
  console.log("next: write MODEL + Work (and the short asks), then  node cli.mjs preview " + idOf(dir));
}

async function doPreview() {
  const dir = resolveTarget(a._[0], a);
  const r = await buildPreview(dir);
  const prev = readStatus(dir);
  writeStatus(dir, { stage: ["brief", "scaffold"].includes(prev.stage) || !prev.stage ? "draft" : prev.stage, toolBytes: r.toolBytes, previewAt: new Date().toISOString() });
  console.log(`preview ${rel(r.out)}  (${kb(r.bytes).trim()} page · tool.tsx ${kb(r.toolBytes).trim()} · standalone source ${kb(r.combinedBytes).trim()})`);
  if (r.warnings.length) { console.log("host-scope warnings (check fails on these):"); for (const w of r.warnings) console.log("  - " + w); }
  console.log("open it in a browser: user mode (the phase dots switch phases); add ?mode=ai to see AI mode");
}

/* shots --pack: the review pack (lib/build/pack.mjs, docs/REVIEW_PACK.md). --preview-file / --out-dir are for testing the pack
   against a copy of the preview and a scratch folder; the slot's real pack is never touched by them. */
async function doPack(dir) {
  const langs = a.langs && a.langs !== true ? String(a.langs).split(",").map((x) => x.trim().toLowerCase()).filter(Boolean) : null;
  const r = await buildPack(dir, { langs, log: console.log,
    previewFile: a["preview-file"] && a["preview-file"] !== true ? path.resolve(String(a["preview-file"])) : undefined,
    outDir: a["out-dir"] && a["out-dir"] !== true ? path.resolve(String(a["out-dir"])) : undefined });
  const mine = r.frames.filter((f) => !f.carried), parties = mine.filter((f) => f.volatile), same = mine.filter((f) => f.sameAs);
  for (const n of r.notes) console.log(`  note: ${n}`);
  console.log(`pack ${idOf(dir)}: ${r.frames.length} frame(s) at 1600x900 in ${rel(r.out)} · ${r.pack.langs.join(", ")} · ${r.seconds} s · pack.json${r.first ? "" : " (the one before is pack.prev.json)"}`);
  if (a.changed) {
    if (r.first) console.log("  no pack before: every frame is new");
    console.log(`  changed: ${r.changed.length} · unchanged: ${mine.filter((f) => !f.changed && !f.volatile).length}${parties.length ? ` · party (not compared): ${parties.length}` : ""}${r.removed.length ? (r.failedRun ? ` · not made: ${r.removed.length}` : ` · removed: ${r.removed.length}`) : ""}`);
    for (const f of r.changed) console.log(`    ${f.file}  ${f.isNew ? "NEW" : "pixels differ"}${f.sameAs ? "  (same as " + f.sameAs + ")" : ""}`);
    if (!r.failedRun) for (const f of r.removed) console.log(`    ${f}  REMOVED (in the pack before, not in this one)`);
  } else {
    /* the frame names are the same in every language: say them once */
    const names = (l) => mine.filter((f) => f.lang === l).map((f) => f.file.replace(new RegExp("-" + l + "\\.png$"), ""));
    const lists = r.pack.langs.map((l) => ({ l, n: names(l) })), same = lists.every((x) => x.n.join() === lists[0].n.join());
    if (same) console.log(`  ${lists[0].n.length} frames ${r.pack.langs.length > 1 ? "in each of " : "in "}${r.pack.langs.join(", ")} (file = <name>-<lang>.png): ${lists[0].n.join("  ")}`);
    else for (const x of lists) console.log(`  ${x.l} (${x.n.length}): ${x.n.join("  ")}`);
  }
  if (parties.length) console.log(`  party (motion on, never compared by --changed): ${parties.map((f) => f.file).join(" ")}  -> look again if the phase end changed`);
  const unstable = mine.filter((f) => f.unstable);
  if (unstable.length) console.log(`  unstable (no two shots alike on a busy machine; counted as changed): ${unstable.map((f) => f.file).join(" ")}`);
  if (same.length && !a.changed) console.log(`  identical to another frame of the pack (sameAs in pack.json, nothing new to look at): ${same.map((f) => f.file).join(" ")}`);
  for (const e of r.errors) console.log(`  FAILED ${e.lang} ${e.where}: ${e.message}`);
  if (r.failedRun) console.log("  this run had failures: pack.json (the baseline) and the frames it could not make are left as they were; this run's listing is pack.failed.json");
  if (r.errors.length) process.exitCode = 1;
}

async function doShots() {
  const dir = resolveTarget(a._[0], a);
  if (a.pack) return doPack(dir);
  const state = String(a.state || "ask");
  if (!STATES.includes(state)) throw new Error(`--state must be one of ${STATES.join(", ")}`);
  const lang = a.lang && a.lang !== true ? String(a.lang) : "";
  const panel = a.panel === "open" ? "open" : "";   /* a board tool: the answer panel open on every question */
  if (state === "party") {
    /* r40: the party at the right answer of a phase's last question, motion on (every other shot is reduced motion, which skips it) */
    for (const r of await partyShots(dir, { lang })) console.log(`party phase ${r.n}: ${r.error ? "FAILED: " + r.error : r.seen ? rel(r.png) : rel(r.png) + " (no party appeared)"}`);
  } else if (a.full) {
    const r = fullShot(dir, { phase: Number(a.phase || 1), state, lang, panel });
    console.log(`shot ${rel(r.png)}  ${kb(r.bytes).trim()}`);
  } else {
    const r = contactSheet(dir, { state, lang, panel });
    console.log(`sheet ${rel(r.png)}  ${r.phases} phases · ${r.width}x${r.height} · ${kb(r.bytes).trim()}`);
  }
}

function status() {
  const root = workRoot();
  if (!fs.existsSync(root)) { console.log("nothing fetched yet"); return; }
  const chapters = fs.readdirSync(root).filter((c) => fs.statSync(path.join(root, c)).isDirectory())
    .filter((c) => !a.ch || c === chapterIdFor({ klass: klass(), pub: a.pub, ch: a.ch }));
  for (const c of chapters) {
    const pin = readPin(path.join(root, c));
    /* a hand-edited pair (runbook "Small changes to one tool") is reported as such, never as stale: its source is not what ships */
    const handOf = (dir) => { const h = pairState(dir); return h && (h.edited || h.approved) ? `hand-edited (${h.approved ? "approved " + String(h.at).slice(0, 10) : "NOT approved"})` : ""; };
    console.log(`${c}${pin ? `  ·  runtime ${pin.version}` : "  ·  NO PIN (node cli.mjs runtime pin --ch N)"}`);
    for (const id of fs.readdirSync(path.join(root, c)).filter((x) => fs.existsSync(path.join(root, c, x, "slot.json")))) {
      const dir = path.join(root, c, id), st = readStatus(dir);
      let chk = "not checked";
      const hand = handOf(dir);
      if (st.checks) {
        const toolFile = path.join(dir, "tool.tsx");
        const fresh = fs.existsSync(toolFile) && st.checkedTool === hashOf(dir);
        /* a sealed tool was published from a source that passed check on the runtime of its day;
           what is live is a frozen copy of it, so only a change to tool.tsx itself matters now */
        const sealed = st.sealed && fs.existsSync(toolFile) && st.sealed.tool === sha(fs.readFileSync(toolFile));
        const note = fresh || hand ? "" : sealed ? `, sealed on ${st.sealed.version}` : ", source changed since";
        chk = `check ${st.checks.fail ? st.checks.fail + " FAIL" : "passed"} (${st.checks.pass} pass)${note}`;
      }
      if (hand) chk += ` · ${hand}`;
      const pub = publishedOf(st);
      if (pub) chk += ` · published ${pub.at ? stamp(pub.at) : "(time not recorded)"}${pub.changed ? ", edited since" : ""}`;
      console.log(`  ${pad(id, 20)}${pad(st.stage || "?", 10)}${st.toolBytes ? pad("tool " + kb(st.toolBytes).trim(), 16) : pad("", 16)}${fs.existsSync(path.join(dir, "tool.tsx")) ? chk : ""}`);
    }
  }
}

async function doCheck() {
  const dir = resolveTarget(a._[0], a);
  if (a.rows !== undefined && a.rows !== "all" && a.rows !== "compact") throw new Error("--rows takes all (every row printed) or compact (the default: the summary line and every non-pass row)");
  if (a.rows === "all") setReportRows("all");
  console.log(`check ${idOf(dir)}`);
  /* the preview is rebuilt from the source being hashed, so a check can never pass on a stale page.
     every check passing ports straight away (output-preview/, proved in the host emulator) so the
     tool shows up in the viewer without a separate step; publish still waits on the user's word. */
  const { checked, ported, portError } = await checkAndPort(dir, { render: !a["no-render"], force: !!a.force });
  let toolHash = null;
  try { toolHash = hashOf(dir); } catch { /* no pin: the cache key says so */ }
  await orchHook("recordCheck", { dir, render: !a["no-render"], summary: checked.summary, toolHash });
  if (checked.summary.fail) { process.exitCode = 1; return; }
  if (portError) { console.log(`  port failed: ${portError}`); process.exitCode = 1; return; }
  if (ported && !ported.hostsim.ok) process.exitCode = 1;
}

async function doVoice() {
  const dir = resolveTarget(a._[0], a);
  const langs = String(a.langs || "hi,gu").split(",").map((x) => x.trim()).filter(Boolean);
  await bakeVoice(dir, { langs, kbps: Number(a.kbps || 16), log: console.log, force: !!a.force });
  await orchHook("recordVoice", { dir, langs });
}

function doMascot() {
  const r = makeMascot({ ...(a.src ? { src: path.resolve(String(a.src)) } : {}), ...(a.height ? { height: Number(a.height) } : {}) });
  console.log(`mascot ${rel(r.out)}  ${r.size.w}x${r.size.h} WebP · ${kb(r.bytes).trim()} inline${r.cheerBytes ? ` + cheering pose ${kb(r.cheerBytes).trim()}` : ""} (from ${rel(r.source)}, art ${r.stand.w}x${r.stand.h}, cut to ${r.art.w}x${r.art.h})`);
}

/* why a slot is NOT cleaned ("" = go ahead): its sheets may be all that shows what is wrong with a tool that has not passed,
   or has changed since it passed */
function cleanBlocked(dir) {
  if (!fs.existsSync(path.join(dir, "tool.tsx"))) return "no tool.tsx yet";
  const st = readStatus(dir);
  if (!st.checks) return "never checked";
  if (st.checks.fail) return `its last check has ${st.checks.fail} FAIL`;
  let fresh = false;
  try { fresh = st.checkedTool === hashOf(dir); } catch { /* no pin or no runtime snapshot: not fresh */ }
  return fresh ? "" : "the source changed since its last check";
}

function doClean() {
  const opts = { html: !!a.html, dry: !!a.dry };
  if (!a._[0]) {
    if (!a.ch) throw new Error("name a slot: <MEDIA_ID> [--ch N], or pass --ch N alone to tidy every slot of that chapter");
    return doCleanAll(opts);
  }
  const dir = resolveTarget(a._[0], a);
  const why = a.force ? "" : cleanBlocked(dir);
  if (why) { console.log(`clean ${idOf(dir)}: left as it is (${why}; --force cleans it anyway)`); return; }
  const r = cleanSlot(dir, opts);
  console.log(`clean ${idOf(dir)}: ${opts.dry ? "would remove" : "removed"} ${r.removed.length} (${kb(r.bytes).trim()}) · kept ${r.kept.join(", ")}`);
  for (const x of r.removed) console.log("  - " + x);
}

/* `clean --ch N` with no MEDIA_ID: the end-of-chapter tidy, every slot of the chapter, one after another */
function doCleanAll(opts) {
  const chapterId = a["chapter-id"] || chapterIdFor({ klass: klass(), pub: a.pub, medium: a.medium, subject: a.subject, ch: a.ch });
  const cdir = path.join(workRoot(), chapterId);
  if (!fs.existsSync(cdir)) throw new Error(`no work folder for ${chapterId}; run fetch first`);
  const ids = fs.readdirSync(cdir).filter((x) => fs.existsSync(path.join(cdir, x, "slot.json"))).sort();
  if (!ids.length) throw new Error(`no slots in ${chapterId}; run fetch first`);
  console.log(`clean ${chapterId} · ${ids.length} slot(s)${opts.dry ? " · dry run: nothing is deleted" : ""}${opts.html ? " · preview pages too" : ""}`);
  let cleaned = 0, bytes = 0;
  for (const id of ids) {
    const dir = path.join(cdir, id);
    const why = a.force ? "" : cleanBlocked(dir);
    if (why) { console.log(`  ${pad(id, 20)}left as it is: ${why}`); continue; }
    const r = cleanSlot(dir, opts);
    cleaned++; bytes += r.bytes;
    console.log(`  ${pad(id, 20)}${opts.dry ? "would remove" : "removed"} ${r.removed.length} (${kb(r.bytes).trim()})`);
  }
  console.log(`clean ${chapterId}: ${cleaned}/${ids.length} slot(s) tidied, ${kb(bytes).trim()} ${opts.dry ? "to free" : "freed"}${cleaned < ids.length ? `; ${ids.length - cleaned} left as they are (not checked, failing or changed since the check)` : ""}`);
}

async function doPort() {
  // note: `check` now ports automatically the moment it passes; this is for a manual re-port.
  // A hand-edited pair (runbook "Small changes to one tool") is refused; --force overwrites it and loses those edits
  const dir = resolveTarget(a._[0], a);
  const r = await portAndVerify(dir, { force: !!a.force, log: console.log });
  console.log(`  ${rel(r.tsxFile)}  ${kb(r.tsxBytes).trim()} (library ${kb(r.libBytes).trim()})`);
  console.log(`  ${rel(r.jsonFile)}  ${kb(r.jsonBytes).trim()}`);
  if (!r.hostsim.ok) { console.log("  the standalone file does not run in the host emulator"); process.exitCode = 1; }
}

/* approve: prove a hand-edited pair on its own bytes and record it for publish (lib/check/approve.mjs) */
async function doApprove() {
  const dir = resolveTarget(a._[0], a);
  const r = await approve(dir, { note: a.note && a.note !== true ? String(a.note) : "", log: console.log });
  if (!r.ok) process.exitCode = 1;
}

async function doPublish() {
  const raw = a._[0];
  if (!raw) {
    if (!a.ch) throw new Error("name a slot: <MEDIA_ID> [--ch N], <chapter_id>/<MEDIA_ID>, or a work folder; or pass --ch N alone to publish every slot of that chapter");
    return doPublishAll();
  }
  const dir = resolveTarget(raw, a);
  const r = await publish(dir, { upload: !!a.upload, apply: !!a.apply, offline: !!a.offline, version: a.version || "latest" });
  if (!r.ok) process.exitCode = 1;
}

/* `publish --ch N` with no MEDIA_ID: every slot of that chapter, one after another, same flags as a
   single publish. Each slot's own report prints as usual; this only adds the per-slot heading and the
   final summary. A slot that fails does not stop the rest — the summary says which did. */
async function doPublishAll() {
  const chapterId = a["chapter-id"] || chapterIdFor({ klass: klass(), pub: a.pub, medium: a.medium, subject: a.subject, ch: a.ch });
  const cdir = path.join(workRoot(), chapterId);
  if (!fs.existsSync(cdir)) throw new Error(`no work folder for ${chapterId}; run fetch first`);
  const ids = fs.readdirSync(cdir).filter((x) => fs.existsSync(path.join(cdir, x, "slot.json"))).sort();
  if (!ids.length) throw new Error(`no slots in ${chapterId}; run fetch first`);
  console.log(`publish ${chapterId} · ${ids.length} slot(s)${a.upload ? " · UPLOAD" : " · dry run"}`);
  const failed = [];
  for (const id of ids) {
    console.log(`\n--- ${id} ---`);
    try {
      const r = await publish(path.join(cdir, id), { upload: !!a.upload, apply: !!a.apply, offline: !!a.offline, version: a.version || "latest" });
      if (!r.ok) failed.push(id);
    } catch (e) {
      console.log(`  ERROR  ${e.message}`);
      failed.push(id);
    }
  }
  console.log(`\npublish ${chapterId}: ${ids.length - failed.length}/${ids.length} ok${failed.length ? `, failed: ${failed.join(", ")}` : ""}`);
  if (failed.length) process.exitCode = 1;
}

async function doView() {
  const { startServer } = await import("./viewer/server.mjs");
  /* no --port: the viewer's own default, one per class (viewer/meta.mjs viewerPort) */
  const r = await startServer({ port: a.port ? Number(a.port) : undefined, watch: !!a.watch });
  console.log(`view  http://localhost:${r.port}  (${r.toolCount} tool(s) in output-preview/)`);
  if (!a.watch) console.log("  (pass --watch to rebuild the viewer's own UI as you edit viewer/src)");
  console.log("  ctrl+C to stop");
  await new Promise(() => {}); // keep the process alive; the server itself never resolves
}


/* ── the runtime a chapter is built on ──────────────────────────────────────────────
   The runtime, the mascot and a tool are hashed together, so one shared runtime meant an edit
   for a new chapter restaled every finished tool of every older chapter. A chapter now names its
   own frozen snapshot; bringing a chapter forward is a deliberate freeze + pin + re-check. */
const CHURN_MS = 24 * 3600 * 1000;
const chapterDirs = (spec) => (spec
  ? chapterList(spec).map((n) => path.join(workRoot(), chapterIdFor({ klass: klass(), pub: a.pub, ch: n })))
  : fs.readdirSync(workRoot()).map((c) => path.join(workRoot(), c)).filter((d) => fs.statSync(d).isDirectory()));
const slotDirs = (cdir) => (fs.existsSync(cdir) ? fs.readdirSync(cdir) : [])
  .map((x) => path.join(cdir, x)).filter((d) => fs.existsSync(path.join(d, "slot.json")));

async function doRuntime() {
  const sub = String(a._[0] || "status");
  const gateArgs = { ch: a.ch, gate: a.gate, proof: a.proof, ungated: a.ungated };
  const gated = async (op, extra) => {
    const g = await orchHook("runtimeGate", { op, ...gateArgs, ...extra });
    if (g && g.refuse) throw new Error(g.refuse);
    if (g && g.note) console.log(`  (${g.note})`);
    return g;
  };

  if (sub === "freeze") {
    const g = await gated("freeze", { named: a._[1] ? String(a._[1]) : null });
    const r = freeze(a._[1] ? String(a._[1]) : null, { note: String(a.note && a.note !== true ? a.note : "") });
    await orchHook("runtimeRecord", { op: "freeze", ...gateArgs, version: r.version, token: g && g.token });
    console.log(r.made
      ? `froze runtime ${r.version}: runtime ${r.runtime} · mascot ${r.mascot} · ${kb(r.bytes).trim()}  (runtime/frozen/${r.version}/)`
      : `runtime ${r.version} already holds this exact head (runtime ${r.runtime}); nothing to freeze`);
    /* the batch rule (runbook non-negotiable 3): every freeze that a chapter then pins re-stales its tools, and r56-r64 were nine in a day */
    const recent = Object.entries(readVersions().versions).filter(([, row]) => Date.now() - Date.parse(row.frozenAt) < CHURN_MS).length;
    if (r.made && recent >= 3) console.log(`WARNING: ${recent} runtimes frozen in the last 24 h. Each one re-stales every checked tool of every chapter that pins it. Batch runtime fixes: log the gap, work round it in the tool, freeze ONCE per chapter (runbook non-negotiable 3).`);
    return;
  }

  if (sub === "pin") {
    const g = await gated("pin", { version: a.version && a.version !== true ? String(a.version) : null });
    const version = a.version && a.version !== true ? String(a.version)
      : freeze(null, { note: "the head at pin time" }).version;
    const dirs = chapterDirs(a.ch);
    if (!dirs.length) throw new Error("no chapter to pin; name one with --ch N");
    for (const cdir of dirs) {
      if (!fs.existsSync(cdir)) { console.log(`  ${path.basename(cdir)}: not fetched (skipped)`); continue; }
      const was = readPin(cdir);
      const pin = writePin(cdir, version, { why: String(a.why && a.why !== true ? a.why : "") });
      const slots = slotDirs(cdir);
      const stale = slots.filter((d) => { const st = readStatus(d); return st.checks && st.checkedTool !== hashOf(d); });
      console.log(`${path.basename(cdir)}  runtime ${pin.version}${was && was.version !== pin.version ? ` (was ${was.version})` : ""}  ${slots.length} slot(s)`);
      if (stale.length) console.log(`  re-check on this pin: ${stale.map(idOf).join(", ")}`);
      const moves = (pin.history || []).filter((h) => Date.now() - Date.parse(h.until) < CHURN_MS).length;
      if (was && was.version !== pin.version && moves >= 2) console.log(`  WARNING: ${path.basename(cdir)} has moved ${moves} times in the last 24 h (now ${pin.version}); every move re-checks every tool and rebuilds its packs. Move once, at step 6, unless a blocker (runbook non-negotiable 3).`);
    }
    console.log("a pinned chapter cannot be restaled by another chapter's runtime edit");
    await orchHook("runtimeRecord", { op: "pin", ...gateArgs, version, token: g && g.token });
    return;
  }

  if (sub === "seal") {
    /* a published tool's live file is a frozen copy, ported from a source that passed `check` on the
       runtime of its day. That runtime is gone (the pin is newer), so re-checking would prove nothing
       about what is live. Sealing records the fact: the tool source has not moved since it was published. */
    const dirs = chapterDirs(a.ch);
    for (const cdir of dirs) {
      const pin = readPin(cdir);
      if (!pin) { console.log(`  ${path.basename(cdir)}: no pin yet (run: node cli.mjs runtime pin --ch N)`); continue; }
      const done = [];
      for (const d of slotDirs(cdir)) {
        const st = readStatus(d);
        const tool = path.join(d, "tool.tsx");
        if (!fs.existsSync(tool)) continue;
        if (st.stage !== "published" && !a.force) continue;
        writeStatus(d, { sealed: { at: new Date().toISOString(), version: pin.version, stage: st.stage,
          tool: sha(fs.readFileSync(tool)), checks: st.checks || null } });
        done.push(idOf(d));
      }
      console.log(`${path.basename(cdir)}  sealed on ${pin.version}: ${done.length ? done.join(", ") : "nothing published"}`);
    }
    console.log("sealed = published from a source that passed check; status reports it instead of \"source changed since\"");
    return;
  }

  if (sub === "status") {
    const all = readVersions().versions, hv = headVersion(), h = headHashes();
    console.log(`head  runtime/runtime.tsx  runtime ${h.runtime} · mascot ${h.mascot}  ${hv ? `= frozen ${hv}` : "NOT frozen (freeze it before pinning a chapter to it)"}`);
    for (const [v, row] of Object.entries(all))
      console.log(`  ${pad(v, 6)}runtime ${row.runtime} · mascot ${row.mascot}  ${row.frozenAt.slice(0, 16).replace("T", " ")}  ${row.note || ""}`);
    console.log("");
    for (const cdir of chapterDirs(a.ch)) {
      const pin = readPin(cdir), slots = slotDirs(cdir);
      if (!slots.length) continue;
      const fresh = slots.filter((d) => { const st = readStatus(d); return st.checks && st.checkedTool === hashOf(d); }).length;
      const sealed = slots.filter((d) => readStatus(d).sealed).length;
      console.log(`${pad(path.basename(cdir), 30)}${pad(pin ? "runtime " + pin.version : "NO PIN", 14)}${slots.length} slots · ${fresh} check-fresh${sealed ? ` · ${sealed} sealed` : ""}`);
    }
    return;
  }
  throw new Error("runtime freeze [rN] | pin --ch N [--version rN] | seal --ch N | status");
}

function doFence() {
  if (a.off) { fenceSet({ off: true }); console.log("fence off: a session may read any chapter's work/ again"); return; }
  if (a.on) { fenceSet({ off: false }); console.log("fence on: a session reads only the chapter it opened first"); return; }
  if (a.clear) { fenceSet({ clear: true }); console.log("fence cleared: every session re-arms on the next chapter it opens"); return; }
  const f = readFence();
  console.log(`fence ${f.off ? "OFF" : "on"}  (${path.relative(PIPELINE_ROOT, fenceFilePath()).replace(/\\/g, "/")})`);
  for (const [sid, v] of Object.entries(f.sessions || {})) console.log(`  ${pad(sid.slice(0, 8), 10)}${v.chapter}  since ${String(v.at).slice(0, 16).replace("T", " ")}`);
  if (!Object.keys(f.sessions || {}).length) console.log("  no session has opened a chapter yet");
}

/* the ACTION KIT: the five shared tool pictures of api.act (docs/IMAGES.md §11) -> runtime/actionkit.tsx */
async function doActionKit() {
  await makeActionKit({ force: !!a.force, dry: !!a.dry, only: a.only && a.only !== true ? String(a.only).split(",").map((x) => x.trim()) : null,
    ...(a.model && a.model !== true ? { models: [String(a.model)] } : {}) });
}

/* skins for a slot or a chapter (lib/images/, docs/IMAGES.md); it parses its own flags (--dry, --batch) */
async function doImages() {
  await imagesCommand(process.argv.slice(3), { log: console.log });
}

const COMMANDS = { doctor, list, fetch: fetchChapters, scaffold: doScaffold, preview: doPreview, shots: doShots, check: doCheck,
  port: doPort, approve: doApprove, publish: doPublish, mascot: doMascot, clean: doClean, status, view: doView, runtime: doRuntime, fence: doFence, voice: doVoice,
  images: doImages, actionkit: doActionKit, fontkit: () => makeFontKit() };

if (!cmd || a.help || !COMMANDS[cmd]) {
  const head = fs.readFileSync(path.join(ROOT, "cli.mjs"), "utf8").split("*/")[0];
  console.log(head.replace(/^#!.*\n\/\*\s?/, "").replace(/^ \* ?/gm, ""));
  process.exit(cmd && !COMMANDS[cmd] ? 2 : 0);
}
try {
  await COMMANDS[cmd]();
} catch (e) {
  console.error(`\n${cmd}: ${e.message}`);
  process.exit(1);
}
