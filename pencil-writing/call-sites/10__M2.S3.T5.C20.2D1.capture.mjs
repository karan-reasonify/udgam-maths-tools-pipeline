#!/usr/bin/env node
/* A capture for class 4 CHAPTER 10 M2.S3.T5.C20.2D1 (the letter-code wheel, phase 4: the Try key writes a row of letters). Page, frames and json are prefixed "ch10-"
 * (ch 7 has the same slot id). It finds each WRITE act by its layer (data-role="pen-writing" exists from the act's first frame to its end; data-role="pen-ink" is a
 * stroke on it), times it from an 8 ms log inside the page, takes frames at offsets from the layer's appearance and checks: no ink in the first 100 ms (no flash), the
 * act's length, that the last frames' strokes are exactly the finished PencilText's strokes (no jump: the shift between the layer and the drawing must be (0, 0)), that
 * no printed character sits among the written ones, and that every written card is one capital letter A-Z.
 *   --flow guide   the phase's guide steps by toolApi.check() (as `approve` does): step 2 is the Try key
 *   --flow ask     guide steps, then question Q (earlier ones answered right): REAL clicks: Q1 (A is 1 / A is 26: Try, Flip band, Try), Q2 (a ring: Back x3, Try, Back x6,
 *                  Try, Back, Try: three rows, "Three tries are enough"); then the answer (the win page: nothing may swap)
 *   node pencil-writing/call-sites/10__M2.S3.T5.C20.2D1.capture.mjs --flow ask --q 2 [--lang en] [--tag x] [--offsets 60,260,460] */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "../lib.mjs";

const args = process.argv.slice(2);
const val = (f, d = null) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const flow = val("--flow", "guide"), phase = Number(val("--phase", 4)), Q = Number(val("--q", 1)), lang = val("--lang", "en"), tag = val("--tag", "");
const offsets = String(val("--offsets", "60,260,460")).split(",").map(Number);
const ch = "10", id = "M2.S3.T5.C20.2D1";

const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);
const OUT = path.join(HERE, "out"), FR = path.join(OUT, "frames"), PG = path.join(OUT, "pages");
fs.mkdirSync(FR, { recursive: true }); fs.mkdirSync(PG, { recursive: true });
const page = path.join(PG, `ch10-${id}.html`);
writePage(page, read(pairPath(ch, id)), JSON.parse(read(sidecarPath(ch, id))));

const TAG = `${flow}-p${phase}${flow !== "guide" ? "-q" + Q : ""}${tag ? "-" + tag : ""}`;
const ANSWERS = { 4: ["unsure", "unsure", "GTZ"] };
const LOGGER = `(function () {
  window.__log = []; window.__lastInk = []; window.__lastInkAt = 0;
  setInterval(function () {
    var a = window.toolApi && window.toolApi.getState();
    var ink = document.querySelectorAll('[data-role="pen-ink"]');
    var w = document.querySelector('[data-role="pen-writing"]') ? 1 : 0;
    window.__log.push([performance.now(), a && a.acting ? 1 : 0, ink.length, w, document.querySelectorAll('[data-role="pencil-text"] polyline').length]);
    if (ink.length) { window.__lastInk = Array.prototype.map.call(ink, function (e) { return e.getAttribute('points'); }); window.__lastInkAt = performance.now(); }
  }, 8);
})()`;
const TEXT_POINTS = `Array.prototype.map.call(document.querySelectorAll('[data-role="pencil-text"] polyline'), function (e) { return e.getAttribute('points'); })`;
/* the printed <text> inside pencil-text groups (a character the table lacks is printed there) and the printed single capital letters among the trial rows */
const STRAY = `Array.prototype.map.call(document.querySelectorAll('[data-role="pencil-text"] text'), function (e) { return e.textContent; })`;
const acts = [];

const res = await cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=${lang}`, async (s) => {
  const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
  async function watch(label, maxMs = 20000) {
    const t00 = await s.ev("performance.now()"), tEnd = t00 + maxMs;
    let w = 0, quiet = 0, started = false;
    for (let guard = 0; guard < 2000; guard++) {
      const r = await s.ev(`[document.querySelector('[data-role="pen-writing"]') ? 1 : 0, window.toolApi.getState().acting ? 1 : 0, performance.now()]`);
      if (r[0]) {
        quiet = 0; w++; started = true;
        const tw = r[2], shots = [];
        for (const off of offsets) {
          const now = await s.ev("performance.now()");
          if (now - tw < off) await s.wait(off - (now - tw));
          if (!(await s.ev(`!!document.querySelector('[data-role="pen-writing"]')`))) { shots.push({ askedMs: off, note: "act already over" }); break; }
          const f = path.join(FR, `ch10-${id}-${TAG}-${label}-w${w}-${off}ms.png`), ta = await s.ev("performance.now()");
          await s.shot(f);
          shots.push({ file: path.basename(f), askedMs: off, tookMs: Math.round(ta - tw), ink: await s.ev(`document.querySelectorAll('[data-role="pen-ink"]').length`), done: await s.ev(`document.querySelectorAll('[data-role="pencil-text"] polyline').length`) });
        }
        await s.until(`!document.querySelector('[data-role="pen-writing"]')`, 6000);
        await s.wait(60);
        const f = path.join(FR, `ch10-${id}-${TAG}-${label}-w${w}-after.png`);
        await s.shot(f);
        const lastInk = await s.ev("window.__lastInk"), textPts = await s.ev(TEXT_POINTS), stray = await s.ev(STRAY);
        /* every ink stroke of the layer's last frames must equal a finished stroke, point for point (shift reported) */
        const nums = (p) => p.trim().split(/\s+/).map((q) => q.split(",").map(Number));
        const shifts = [];
        let same = lastInk.length > 0;
        for (const p of lastInk) {
          const A = nums(p);
          const hit = textPts.map(nums).find((B) => B.length === A.length && B.every((q, i) => Math.abs((A[i][0] - q[0]) - (A[0][0] - B[0][0])) < 0.25 && Math.abs((A[i][1] - q[1]) - (A[0][1] - B[0][1])) < 0.25) && Math.abs(A[0][0] - B[0][0]) < 0.6 && Math.abs(A[0][1] - B[0][1]) < 0.6);
          if (!hit) { same = false; continue; }
          shifts.push([Math.round((A[0][0] - hit[0][0]) * 100) / 100, Math.round((A[0][1] - hit[0][1]) * 100) / 100]);
        }
        acts.push({ label, write: w, shots, after: path.basename(f), lastInkStrokes: lastInk.length, textStrokes: textPts.length, sameStrokes: same, shifts: [...new Set(shifts.map(String))], stray });
      } else if (!r[1]) { quiet++; if (quiet > (started ? 18 : 40)) break; } else quiet = 0;
      if (r[2] > tEnd) break;
      await s.wait(15);
    }
    const f = path.join(FR, `ch10-${id}-${TAG}-${label}-end.png`);
    await s.shot(f);
    /* a click-triggered act is already running when watch() starts: keep the log from 1500 ms before, and report only the periods that END after watch() began */
    const log = (await s.ev("window.__log")).filter((e) => e[0] >= t00 - 1500);
    const periods = [];
    let a = null, firstInk = null;
    for (const e of log) {
      if (e[3] && a == null) { a = e[0]; firstInk = null; }
      if (e[3] && firstInk == null && e[2] > 0) firstInk = e[0];
      if (!e[3] && a != null && e[0] < t00) { a = null; continue; }
      if (!e[3] && a != null) { periods.push({ ms: Math.round(e[0] - a), inkStartsAt: firstInk == null ? null : Math.round(firstInk - a), inkInFirst100: log.filter((x) => x[0] >= a && x[0] < a + 100 && x[2] > 0).length }); a = null; }
    }
    acts.push({ label, periods, end: path.basename(f) });
  }

  if (!(await s.until("!!window.toolApi && !!document.querySelector('svg')", 30000))) return { problems: ["the pair did not mount"], errors: await s.ev("window.__hostErrors") };
  await s.wait(800);
  await s.ev(LOGGER);
  if (await s.ev(`!!document.querySelector('[data-control="start"]')`)) { await s.click('[data-control="start"]'); await s.wait(900); }
  for (let k = 0; k < 15 && ((await st()) || {}).stage === "demo"; k++) {
    const g0 = (await st()).guideStep;
    await s.ev("window.toolApi.check()");
    if (flow === "guide") await watch("g" + (k + 1));
    await s.until(`(() => { const q = window.toolApi.getState(); return q.stage !== 'demo' || q.guideStep !== ${JSON.stringify(g0 ?? null)}; })()`, 12000);
    await s.wait(300);
  }
  if (flow === "guide") return { errors: [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))], stage: ((await st()) || {}).stage };

  if (!(await s.until("window.toolApi.getState().stage === 'ask'", 45000))) return { problems: ["never reached a question"], errors: [] };
  await s.wait(1200);
  for (let q = 1; q < Q; q++) {
    const before = (await st()).score, it = (await st()).item;
    await s.ev(`window.toolApi.answer(${JSON.stringify(ANSWERS[phase][q - 1])})`); await s.wait(80); await s.ev("window.toolApi.check()");
    await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 20000);
    await s.wait(1200);
    if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 9000)) await s.click('[data-control="next-key"]');
    await s.until(`window.toolApi.getState().stage === 'ask' && window.toolApi.getState().item !== ${JSON.stringify(it)}`, 9000);
    await s.wait(900);
  }
  acts.push({ note: "controls: " + (await s.ev(`Array.prototype.map.call(document.querySelectorAll('[data-control]'), function (e) { return e.getAttribute('data-control'); }).join(' ')`)) });
  const tap = async (c, gap = 450) => { await s.click(`[data-control="${c}"]`); await s.wait(gap); };
  if (Q === 1) {
    await tap("try", 50); await watch("try-A1");
    await s.wait(300); await tap("flip");
    await tap("try", 50); await watch("try-A26");
  } else if (Q === 2) {
    for (let i = 0; i < 3; i++) await tap("back");
    await tap("try", 50); await watch("try-3back");
    await s.wait(300);
    for (let i = 0; i < 6; i++) await tap("back", 380);
    await tap("try", 50); await watch("try-9back");
    await s.wait(300);
    await tap("back");
    await tap("try", 50); await watch("try-10back");
    await s.wait(500);
    const f = path.join(FR, `ch10-${id}-${TAG}-threerows.png`);
    await s.shot(f);
    acts.push({ note: "three rows: " + path.basename(f) });
  }
  if (Q <= 2) {
    const f0 = path.join(FR, `ch10-${id}-${TAG}-beforewin.png`);
    await s.shot(f0);
    await s.ev(`window.toolApi.answer(${JSON.stringify(ANSWERS[phase][Q - 1])})`); await s.wait(80); await s.ev("window.toolApi.check()");
    await s.until(`window.toolApi.getState().stage === 'win' || window.toolApi.getState().stage === 'idle'`, 8000);
    await s.wait(1500);
    const f1 = path.join(FR, `ch10-${id}-${TAG}-win.png`);
    await s.shot(f1);
    acts.push({ note: "win page frames: " + path.basename(f0) + " then " + path.basename(f1), stage: (await st()).stage, strokesAfterWin: (await s.ev(TEXT_POINTS)).length });
  }
  return { errors: [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))], stage: ((await st()) || {}).stage };
}, { label: `capture ${id} ${TAG}`, timeout: 240000, reducedMotion: false });

console.log(`capture ${flow} phase ${phase} q${Q} ${lang}: page errors: ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""} (stage ${res.stage})`);
for (const a of acts) {
  if (a.write) console.log(`  [${a.label}] write ${a.write}: frames ${a.shots.map((x) => (x.note ? x.note : `${x.askedMs}ms(took ${x.tookMs}):${x.ink}ink/${x.done}done`)).join(" ")}; last frames' ${a.lastInkStrokes} stroke(s) vs ${a.textStrokes} finished strokes: same=${a.sameStrokes} shifts=${JSON.stringify(a.shifts)} printed-among-pencil=${JSON.stringify(a.stray)}; ${a.after}`);
  else if (a.periods) console.log(`  [${a.label}] writes ${a.periods.length}: ${a.periods.map((p) => `${p.ms} ms (first ink ${p.inkStartsAt} ms in, ink in the first 100 ms: ${p.inkInFirst100} samples)`).join("; ")}; ${a.end}`);
  else if (a.note) console.log(`  ${a.label ? "[" + a.label + "] " : ""}${a.note}${a.stage ? " (stage " + a.stage + ")" : ""}${a.strokesAfterWin != null ? " finished strokes " + a.strokesAfterWin : ""}`);
}
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
fs.writeFileSync(path.join(OUT, `ch10-${id}-${TAG}.capture2.json`), JSON.stringify({ flow, phase, Q, lang, acts, errors: res.errors }, null, 1));
process.exit((res.errors || []).length || res.problems ? 1 : 0);
