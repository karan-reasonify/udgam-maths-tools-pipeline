/* approve <MEDIA_ID>: prove a HAND-EDITED pair as it stands, on its own bytes (runbook "Small changes to one tool").
 * A small change to a finished tool is made in its ported pair (output-preview/<chapter>/<id>/<id>.tsx + .json), never in
 * work/.../tool.tsx, and `check` is not run for it: check proves a source and ports it, which would overwrite the edit.
 * This proves the pair instead and records it, so publish accepts it (status.handEdit, lib/ship/publish.mjs pairProblems):
 *   a hostsim     every phase mounts and plays to the end in the host emulator, no errors, the toolApi verbs match the sidecar
 *   b drive       per phase x en, hi, gu: the pair mounted the way the host mounts it (lib/ship/hostTemplate.mjs) with
 *                 { phase, navigableDots: true, muted: true, lang, width: 1600, height: 900 }; Start when shown, the guide
 *                 steps (toolApi.check() while the stage is "demo"), the question, a WRONG answer, a digit key, then every
 *                 question right (the sidecar's authoredFallback keys, the Next key between). FAILS on a page error, a blank
 *                 render, or a state it could not reach (a drive that never happened proves nothing). REPORTS, never fails,
 *                 the bubble's text in each state, and a wrong answer the tool did not count as a miss. PNGs (en: ask, wrong, last win of each phase): <slot>/approve-*.png
 *   c key corner  in every driven state, no drawn element of the working area (its nearest data-zone is "work"; text by its
 *                 ink, the filters of board-fit's geometry) meets the key's corner (the sidecar's stage.zones.ask, the
 *                 runtime's KEY_CORNER on a keyOnly tool) by more than 4 square units: board-fit's rule, on the pair
 *   c2 layout     in every driven state, in en, hi and gu, at the desktop stage (1600 x 900) AND in a phone window (844 x 390, the
 *                 viewer's Mobile): the layout judges of `check` (layoutfit.mjs, one source): no two texts overlap, nothing leaves the
 *                 stage, no text under 28 stage units, every live control a 72 x 72 button, no two controls on one another; on the phone
 *                 also the window really is that size, the page does not scroll, the 16:9 frame is wholly in it and the smallest text
 *                 is at least 11.5 px. (Zone spills are `check`'s: they need the tool's zone map.) FAILS on any of them
 *   d font        Poppins, the platform's font: a fontconfig file that adds it (env C4_FONTCONFIG, else pipeline.config.json
 *                 `fontconfig`) is set as FONTCONFIG_FILE for the Chrome this spawns; the report says whether Poppins resolved
 *   e record      on a pass, status.handEdit = { tsxMd5, jsonMd5, tsxBytes, at, hostsim, drive, notes } (checks and ported are
 *                 left as they are); refused when the pair changed during the run, or when new bytes come without --note
 * Chrome: hostsim reads its pages with --dump-dom. On Linux /opt/google/chrome/chrome drives fine over DevTools but never
 * returns from --dump-dom, so set CHROME_PATH to Playwright's chrome-headless-shell, which does both.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { CONFIG, fromRoot } from "../core/env.mjs";
import { cdpSession, pool, chromePath } from "../core/chrome.mjs";
import { HOST, vendorLibs } from "../ship/hostTemplate.mjs";
import { hostsim } from "../ship/hostsim.mjs";
import { outDir, md5, handEditOf } from "../ship/port.mjs";
import { idOf, chapterOf, readStatus, writeStatus } from "../core/work.mjs";
import { GEOMETRY_SRC } from "./geometry.mjs";
import { layoutProblems, phoneProblems, PHONE } from "./layoutfit.mjs";

export const LANGS = ["en", "hi", "gu"];

/* a wrong answer of the key's own shape: another choice; one numeral moved by one (9 goes down, so it stays one digit) */
export function wrongOf(it) {
  const k = it.answer, num = (v) => /^\d+$/.test(String(v));
  const bump = (v) => { const n = Number(v), w = n % 10 === 9 ? n - 1 : n + 1; return typeof v === "number" ? w : String(w); };
  if (Array.isArray(it.choices) && it.choices.length > 1) return it.choices.find((c) => String(c) !== String(k));
  if (Array.isArray(k)) { const i = k.map((v, j) => (num(v) ? j : -1)).filter((j) => j >= 0).pop(); return i === undefined ? [...k, "9"] : k.map((v, j) => (j === i ? bump(v) : v)); }
  return num(k) ? bump(k) : "zzz";
}

/* page side: is anything drawn, the bubble's text, Kiko's thought puff or bulb, and the key-corner hits (stage units) */
const PROBE = (C) => `(() => {
  const svg = document.querySelector("svg.c4") || document.querySelector("svg");
  const out = { blank: !svg || !!document.getElementById("boundary") || !svg.textContent.trim(), bubble: null, puff: false, hits: [] };
  if (!svg) return out;
  const z = document.querySelector('[data-zone="bubble"]');
  out.bubble = z ? Array.from(z.querySelectorAll("text")).map((t) => t.textContent.trim()).filter(Boolean).join(" ") : null;
  out.puff = !!document.querySelector('[data-role="think-puff"]') || !!document.querySelector('[data-role="hint-bulb"]');
  const C = ${JSON.stringify(C)};
  if (!C) return out;
  const inv = svg.getScreenCTM().inverse();
  const pt = (x, y) => { const p = svg.createSVGPoint(); p.x = x; p.y = y; return p.matrixTransform(inv); };
  const box = (el) => { const r = el.getBoundingClientRect(), a = pt(r.left, r.top), b = pt(r.right, r.bottom); return { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y }; };
  const shown = (el) => { for (let e = el; e && e !== svg; e = e.parentNode) { const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) < 0.05) return false; } return true; };
  const inWork = (el) => { const w = el.closest("[data-zone]"); return !!w && w.getAttribute("data-zone") === "work"; };
  const scaleOf = (el) => { const m = inv.multiply(el.getScreenCTM()); return Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)); };
  const ink = (t, b, size) => { try { const p = t.getStartPositionOfChar(0), q = svg.createSVGPoint(); q.x = p.x; q.y = p.y;
    const s = q.matrixTransform(inv.multiply(t.getScreenCTM())), desc = /[gjpqy,;()]/.test(t.textContent);
    return { x: b.x, w: b.w, y: s.y - 0.74 * size, h: (desc ? 0.97 : 0.76) * size }; } catch (e) { return b; } };
  const inter = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const fmt = (b) => Math.round(b.x) + "," + Math.round(b.y) + " " + Math.round(b.w) + "x" + Math.round(b.h);
  svg.querySelectorAll('[data-zone="work"] :is(rect,circle,ellipse,path,line,polygon,image)').forEach((el) => {
    if (!inWork(el) || !shown(el) || el.getAttribute("fill") === "transparent" || el.closest("defs")) return;
    const b = box(el);
    if (b.w > 0 && b.h > 0 && inter(b, C) > 4) out.hits.push(el.tagName + " " + fmt(b));
  });
  svg.querySelectorAll('[data-zone="work"] text').forEach((t) => {
    if (!inWork(t) || !t.textContent.trim() || !shown(t)) return;
    const b = ink(t, box(t), parseFloat(getComputedStyle(t).fontSize) * scaleOf(t));
    if (inter(b, C) > 4) out.hits.push('"' + t.textContent.trim().slice(0, 20) + '" ' + fmt(b));
  });
  return out;
})()`;

/* Poppins resolved when a line measures differently in "Poppins, serif" than in serif alone */
const POPPINS = `(() => { const c = document.createElement("canvas").getContext("2d"), s = "Hamburgefonstiv 0123"; c.font = "40px serif";
  const a = c.measureText(s).width; c.font = "40px Poppins, serif"; return c.measureText(s).width !== a; })()`;

/* one page for every drive: the host's own transpile and mount (HOST), the props from the query string */
export function writePage(file, raw, side) {
  const base = { navigableDots: true, muted: true, width: 1600, height: 900 };
  const lib = Object.values(vendorLibs()).map((l) => `<script>${String(l).replace(/<\/script/gi, "<\\/script")}</script>`).join("");
  fs.writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><style>
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid}body{margin:0;padding:0;background:#f8fafc}
svg{display:block;vertical-align:middle}#root{display:flex;justify-content:center;align-items:flex-start;min-height:80vh;min-width:100%}
</style>${lib}</head><body><div id="root"></div>
<script>window.__hostErrors = [];
window.addEventListener('error', function (e) { window.__hostErrors.push('error: ' + e.message); });
var oe = console.error; console.error = function () { var m = Array.prototype.join.call(arguments, ' '); if (!/^\\[BABEL\\] Note:/.test(m)) window.__hostErrors.push('console: ' + m.slice(0, 200)); return oe.apply(console, arguments); };
var q = new URLSearchParams(location.search);
var PROPS = Object.assign(${JSON.stringify(base)}, { phase: Number(q.get('phase')), lang: q.get('lang') });
var RAW = ${JSON.stringify(raw).replace(/<\/script/gi, "<\\/script")};
${HOST}
try { var s = document.createElement('script'); s.textContent = hostBody(hostTranspile(RAW, ${JSON.stringify(side.mediaId)}), PROPS); document.body.appendChild(s); }
catch (e) { window.__hostErrors.push('transpile: ' + e.message); }
</script></body></html>`);
}

/* one phase in one language; returns { phase, lang, states: [{ state, stage, bubble, puff, hits }], problems, poppins } */
export function drivePhase(page, { phase, lang, items, corner, pngDir, frame = null, hasFontKit = false }) {
  const res = { phase, lang, frame: frame ? `${frame.w}x${frame.h}` : "1600x900", states: [], geos: [], problems: [], notes: [], poppins: null, fontKit: null };
  return cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=${lang}`, async (s) => {
    const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
    const grab = async (state, png) => {
      const a = await st(), g = await s.ev(PROBE(corner)), geo = await s.ev("(" + GEOMETRY_SRC + ")()");
      res.states.push({ state, stage: a && a.stage, item: a && a.item, ...g });
      if (geo) { delete geo.colors; delete geo.anims; delete geo.zones; res.geos.push({ state, g: geo }); }
      if (g.blank) res.problems.push(`${state}: blank render`);
      if (png && pngDir) await s.shot(path.join(pngDir, `approve-p${phase}-${png}.png`));
    };
    if (!(await s.until("!!window.toolApi && !!document.querySelector('svg')", 30000))) {
      res.problems.push("the pair did not mount (no toolApi or nothing drawn)");
      res.errors = await s.ev("window.__hostErrors");
      return res;
    }
    await s.wait(800);
    res.poppins = await s.ev(POPPINS);
    /* the embedded font (FONT_KIT, 2026-10-16): the private family must be usable once the page has loaded, with no system Poppins */
    if (hasFontKit) res.fontKit = await s.until(`document.fonts.check("600 20px 'C4 Poppins'")`, 8000);
    if (await s.ev(`!!document.querySelector('[data-control="start"]')`)) { await s.click('[data-control="start"]'); await s.wait(900); }
    for (let k = 0; k < 15 && ((await st()) || {}).stage === "demo"; k++) {
      const g0 = (await st()).guideStep;
      await s.ev("window.toolApi.check()");
      await s.until(`(() => { const q = window.toolApi.getState(); return q.stage !== 'demo' || q.guideStep !== ${JSON.stringify(g0 ?? null)}; })()`, 6000);
      await s.wait(300);
    }
    /* 45 s, not 10: a phase with no guide steps opens on its teach lines, which a silent runtime pages at reading speed (class 5's C16 phase 1: two lines, about 13 s) */
    if (!(await s.until("window.toolApi.getState().stage === 'ask'", 45000))) {
      res.problems.push(`never reached a question (stage ${((await st()) || {}).stage})`);
    } else {
      await s.wait(1200);
      await grab("ask", "ask");
      const w = wrongOf(items[0]);
      await s.ev(`window.toolApi.answer(${JSON.stringify(w)})`); await s.wait(80); await s.ev("window.toolApi.check()");
      await s.wait(5000);
      /* a note, not a FAIL: a key shape wrongOf does not fit (a working-area answer) is likelier than a broken tool */
      if (!(((await st()) || {}).tries > 0)) res.notes.push(`the wrong answer ${JSON.stringify(w)} was not taken as a miss: the "wrong" bubble below is not a miss's`);
      await grab("wrong", "wrong");
      await s.key("1", "Digit1", 49, "1"); await s.wait(700);
      await grab("digit");
      for (let q = 0; q < items.length; q++) {
        if (!(await s.until("window.toolApi.getState().stage === 'ask'", 15000))) { res.problems.push(`question ${q + 1} never opened`); break; }
        const before = (await st()).score;
        await s.ev(`window.toolApi.answer(${JSON.stringify(items[q].answer)})`); await s.wait(80); await s.ev("window.toolApi.check()");
        if (!(await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 6000))) { res.problems.push(`question ${q + 1}: the right answer ${JSON.stringify(items[q].answer)} was not taken`); break; }
        await s.wait(1200);
        if (q === items.length - 1) { await grab("last win", "win"); break; }
        if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 9000)) await s.click('[data-control="next-key"]');
        await s.until(`window.toolApi.getState().stage === 'ask' && window.toolApi.getState().item !== ${JSON.stringify((await st()).item)}`, 9000);
        await s.wait(600);
        await grab(`q${q + 2}`);
      }
    }
    res.errors = [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))];
    return res;
  }, { label: `approve p${phase} ${lang} ${frame ? frame.w + "x" + frame.h : ""}`, timeout: 150000, ...(frame ? { width: frame.w, height: frame.h } : {}) });
}

/* the acts (api.act, 2026-10-16), one phase, English, motion ON (the layout drive above runs under forced reduced motion, where an act jumps straight
   to its end): every guide step is performed with toolApi.check(); an act shows as getState().acting with the act layer drawn, and it must end */
export function driveActs(page, { phase }) {
  const res = { phase, seen: 0, noLayer: 0, problems: [] };
  return cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=en`, async (s) => {
    const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
    if (!(await s.until("!!window.toolApi && !!document.querySelector('svg')", 30000))) { res.problems.push("the pair did not mount for the act drive"); return res; }
    await s.wait(800);
    if (await s.ev(`!!document.querySelector('[data-control="start"]')`)) { await s.click('[data-control="start"]'); await s.wait(900); }
    for (let k = 0; k < 15 && ((await st()) || {}).stage === "demo"; k++) {
      const g0 = (await st()).guideStep;
      await s.ev("window.toolApi.check()");
      if (await s.until("!!window.toolApi.getState().acting", 900)) {
        res.seen++;
        if (!(await s.ev(`!!document.querySelector('[data-role="act-layer"]')`))) res.noLayer++;
        if (!(await s.until("!window.toolApi.getState().acting", 10000))) res.problems.push(`phase ${phase} guide step ${k + 1}: an act never ended (still acting after 10 s)`);
      }
      await s.until(`(() => { const q = window.toolApi.getState(); return q.stage !== 'demo' || q.guideStep !== ${JSON.stringify(g0 ?? null)}; })()`, 6000);
      await s.wait(300);
    }
    res.errors = [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))];
    return res;
  }, { label: `approve acts p${phase}`, timeout: 120000, reducedMotion: false });
}

export async function approve(dir, { note = "", log = console.log } = {}) {
  const id = idOf(dir), out = outDir(dir), st = readStatus(dir);
  const tsxFile = path.join(out, `${id}.tsx`), jsonFile = path.join(out, `${id}.json`);
  if (!fs.existsSync(tsxFile) || !fs.existsSync(jsonFile)) throw new Error(`no pair in ${path.relative(fromRoot("."), out)}: port the tool first`);
  if (!chromePath()) throw new Error("Chrome not found: set CHROME_PATH (on Linux Playwright's chrome-headless-shell: hostsim needs --dump-dom)");
  const tsx = fs.readFileSync(tsxFile);
  let json = fs.readFileSync(jsonFile);
  /* The sidecar describes the pair it ships with (2026-10-16). After a hand edit its `build` block still names the .tsx port wrote (md5 and byte
     count), and the viewer's JSON check, which compares them with the file on disk, then fails every hand-edited tool for ever. approve states the
     truth BEFORE it proves the bytes, so the proof, the approval record and the upload are all of the final .json. Only when the file is in
     port's own format (indent 2, a trailing newline), so nothing else in it moves. */
  {
    const s0 = JSON.parse(json.toString("utf8")), now = md5(tsx);
    if (s0.build && (s0.build.tsxMd5 !== now || s0.build.tsxBytes !== tsx.length)) {
      if (JSON.stringify(s0, null, 2) + "\n" !== json.toString("utf8")) log("  note       the sidecar is not in port's format: its build block (stale after the hand edit) was left as it is");
      else {
        s0.build.tsxMd5 = now; s0.build.tsxBytes = tsx.length; s0.build.handEdited = true;
        fs.writeFileSync(jsonFile, JSON.stringify(s0, null, 2) + "\n");
        json = fs.readFileSync(jsonFile);
        log(`  build      the sidecar's build block now names this .tsx (${now.slice(0, 8)}, ${tsx.length} bytes), as a hand-edited pair`);
      }
    }
  }
  const tsxMd5 = md5(tsx), jsonMd5 = md5(json), he = handEditOf(st, tsxMd5, jsonMd5);
  if (!note && !he.approved) throw new Error(`these bytes are not approved yet: say what the hand edit changed with --note "..." (a remake drops it; the note is its record)`);
  const side = JSON.parse(json.toString("utf8"));
  const phases = side.toolQuestions.authoredFallback;
  log(`approve ${id} · ${chapterOf(dir)} · .tsx ${(tsx.length / 1024).toFixed(1)} KB ${tsxMd5.slice(0, 8)} · .json ${jsonMd5.slice(0, 8)} · ${he.edited ? "hand-edited (its .tsx is not the one port wrote)" : st.ported ? "the .tsx is the one port wrote" : "never ported"}`);

  const fc = process.env.C4_FONTCONFIG || (CONFIG.fontconfig ? fromRoot(CONFIG.fontconfig) : "");
  if (fc && fs.existsSync(fc)) process.env.FONTCONFIG_FILE = fc;
  const fontNote = !fc ? "C4_FONTCONFIG not set: system fonts" : fs.existsSync(fc) ? `fontconfig ${fc}` : `MISSING fontconfig ${fc}: system fonts`;

  /* the bytes read above are the bytes proved: hostsim and the drive both run on this copy */
  const tmp = path.join(dir, ".build", "approve");
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp, { recursive: true });
  for (const f of fs.readdirSync(dir)) if (/^approve-.*\.png$/.test(f)) fs.rmSync(path.join(dir, f));
  const problems = [];
  try {
    const copy = path.join(tmp, `${id}.tsx`);
    fs.writeFileSync(copy, tsx);
    log("  hostsim    playing every phase in the host emulator...");
    const sim = await hostsim(copy, side, { work: path.join(tmp, "hostsim") });
    for (const r of sim.results) log(`  ${"".padEnd(11)}phase ${r.n} (${r.mode} mode): ${r.ok ? "plays and finishes" : "FAILS: " + r.problems.join("; ")}`);
    if (!sim.ok) problems.push("hostsim: the host emulator did not play every phase");

    const page = path.join(tmp, "page.html");
    writePage(page, tsx.toString("utf8"), side);
    const z = side.stage && side.stage.zones && side.stage.zones.ask;
    const corner = Array.isArray(z) ? { x: z[0], y: z[1], w: z[2], h: z[3] } : null;
    const FRAMES = [null, PHONE];   /* the desktop stage, then a phone window: the same drive in each */
    const tsxText = tsx.toString("utf8"), hasAct = /\bapi\.act\(/.test(tsxText), hasFontKit = /\bconst FONT_KIT\b/.test(tsxText);
    const jobs = phases.flatMap((p) => LANGS.flatMap((lang) => FRAMES.map((frame) => () => drivePhase(page, { phase: p.phase, lang, items: p.items, corner, pngDir: lang === "en" && !frame ? dir : null, frame, hasFontKit }))));
    log(`  drive      ${phases.length} phase(s) x ${LANGS.join(", ")} x 1600x900 and ${PHONE.w}x${PHONE.h}: start, guide steps, ask, a wrong answer, a digit key, every question right...`);
    const got = await pool(jobs, Math.max(1, Number(process.env.C4_CHROME_POOL) || 2));
    let hits = 0, states = 0, poppins = null, laid = 0, laidBad = 0, actsSeen = 0, actsNoLayer = 0;
    const phoneFrames = [];
    for (const g of got) {
      if (!g.ok) { problems.push(`drive: ${g.error && g.error.message}`); continue; }
      const r = g.value;
      if (poppins === null && r.poppins !== null) poppins = r.poppins;
      const desk = r.frame === "1600x900", where = `p${r.phase} ${r.lang}${desk ? "" : " [phone]"}`;   /* the notes and the bubble read-out are the desktop run's: the phone run is judged, not read */
      for (const x of r.problems) problems.push(`${where}: ${x}`);
      if (r.fontKit === false) problems.push(`${where}: the embedded font did not load ("C4 Poppins" is not available)`);
      if (desk) for (const x of r.notes) log(`  note       ${where}: ${x}`);
      for (const e of r.errors || []) problems.push(`${where}: page error ${e}`);
      for (const { state, g } of r.geos) {
        const tag = `${where} ${state}`, L = layoutProblems(g, { tag });
        laid++;
        for (const [list, what] of [["overlaps", "text overlaps text"], ["offStage", "leaves the stage"], ["small", "text under 28 stage units"], ["fingers", "control under 72 x 72 or not a button"], ["crowd", "controls on one another"]])
          for (const x of L[list]) { laidBad++; problems.push(`layout (${what}): ${x}`); }
        if (!desk) phoneFrames.push({ tag, g });
      }
      for (const s of desk ? r.states : []) {
        states++;
        log(`  ${`p${r.phase} ${r.lang}`.padEnd(7)}${s.state.padEnd(9)}"${s.bubble || ""}"${s.puff ? "  [thought puff or bulb]" : ""}`);
        for (const h of s.hits) { hits++; problems.push(`p${r.phase} ${r.lang} ${s.state}: ${h} meets the key's corner`); }
      }
    }
    const P = phoneProblems(phoneFrames);
    for (const x of [...P.frame, ...P.type]) problems.push(`phone: ${x}`);
    log(`  layout     ${laid} state(s) judged in en, hi, gu at 1600x900 and ${PHONE.w}x${PHONE.h}: ${laidBad ? laidBad + " problem(s)" : "no overlap, nothing off the stage, type and finger boxes at their floors"}`);
    log(`  phone      ${P.minText ? `smallest text ${P.minText.px.toFixed(1)} px, smallest control ${P.minTap ? Math.round(P.minTap.px) : "?"} px, scale ${P.scale}` : "no phone frame was read"}${P.frame.length || P.type.length ? " (FAILS above)" : ""}`);
    if (hasAct) {
      log(`  acts       driving the guide steps of each phase with motion on...`);
      const ag = await pool(phases.map((p) => () => driveActs(page, { phase: p.phase })), Math.max(1, Math.min(2, Number(process.env.C4_CHROME_POOL) || 2)));
      for (const g of ag) {
        if (!g.ok) { problems.push(`acts: ${g.error && g.error.message}`); continue; }
        actsSeen += g.value.seen; actsNoLayer += g.value.noLayer;
        for (const x of g.value.problems) problems.push(x);
        for (const e of g.value.errors || []) problems.push(`acts p${g.value.phase}: page error ${e}`);
      }
      log(`  ${"".padEnd(11)}${actsSeen} act(s) played in the guide steps (the tool picture or the hand drawn, each ended)`);
      if (!actsSeen) log(`  note       api.act is in the source but no act played in any guide step: acts in questions or free play are not driven here`);
      if (actsNoLayer) problems.push(`an act played with no act layer drawn (${actsNoLayer} time(s))`);
    }
    if (hasFontKit) log(`  fontkit    the embedded Poppins ("C4 Poppins") was usable in every drive, with no system font needed`);
    log(`  font       ${fontNote} · Poppins ${poppins ? "resolved" : hasFontKit ? "from the embedded kit" : "NOT resolved (fallback font)"}`);
    log(`  corner     ${corner ? `${corner.x},${corner.y} ${corner.w}x${corner.h}: ${hits ? hits + " hit(s)" : `clear in ${states} state(s)`}` : "the sidecar has no stage.zones.ask: not probed"}`);
    log(`  pictures   ${fs.readdirSync(dir).filter((f) => /^approve-.*\.png$/.test(f)).join(" ") || "none"}`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
    try { fs.rmdirSync(path.dirname(tmp)); } catch { /* .build/ holds other files: it stays */ }
  }

  if (md5(fs.readFileSync(tsxFile)) !== tsxMd5 || md5(fs.readFileSync(jsonFile)) !== jsonMd5) problems.push("the pair changed during the run: approve it again");
  for (const p of problems) log(`  FAIL       ${p}`);
  if (problems.length) { log(`approve ${id}: NOT approved (${problems.length} problem(s))`); return { ok: false, problems }; }
  const at = new Date().toISOString(), prev = (st.handEdit && st.handEdit.notes) || [];
  writeStatus(dir, { handEdit: { tsxMd5, jsonMd5, tsxBytes: tsx.length, at, hostsim: true, drive: { phases: phases.map((p) => p.phase), langs: LANGS, frames: ["1600x900", `${PHONE.w}x${PHONE.h}`] },
    notes: note ? [...prev, { at, note }] : prev } });
  log(`approve ${id}: approved; publish accepts these exact bytes (status.handEdit)${note ? "" : " (same bytes as the last approval: no new note)"}`);
  return { ok: true, problems: [] };
}
