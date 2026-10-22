#!/usr/bin/env node
/* A capture for class 4 chapter 11 M2.S4.T8.C35.2D1 (capacity_columns, phase 2) that reaches what pencil-writing/capture.mjs cannot: the child's Break key on
 * question :4 (14 L 380 mL on top: the pencil strikes the row with a dab and writes the amber 13 and 1,380), and a NO-JUMP test for every write. It finds each
 * WRITE act by its layer (data-role="pen-writing"), times it from an 8 ms log inside the page, takes frames at offsets from the layer's appearance, and
 * compares the strokes of the layer's last frame with the finished PencilText strokes IN SCREEN SPACE (getScreenCTM: no transform to assume; every ink stroke
 * must equal a finished stroke point for point within 0.6 px). Frames are named ch11-<id>-<flow>-... in pencil-writing/out/frames/.
 *   --flow guide   the phase's five guide steps by toolApi.check() (as `approve` does)
 *   --flow break   guide steps, :ML2 and :3 answered right (toolApi), then on :4 REAL clicks: the 2nd cow's row (on top), then the Break key; then the answer
 *                  (--then win: right, the win page; --then wrong: a wrong answer, the trace) and a frame: the pencil figures must not swap to Poppins
 *   node pencil-writing/call-sites/11__M2.S4.T8.C35.2D1.capture.mjs --flow break [--then win|wrong] [--lang en] [--offsets 200,400,600 | ""] */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "../lib.mjs";

const args = process.argv.slice(2);
const val = (f, d = null) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const flow = val("--flow", "guide"), lang = val("--lang", "en"), then = val("--then", "win");
const offRaw = String(val("--offsets", "200,400,600"));
const offsets = offRaw.trim() ? offRaw.split(",").map(Number) : [];
const ch = "11", id = "M2.S4.T8.C35.2D1", phase = 2;

const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);
const OUT = path.join(HERE, "out"), FR = path.join(OUT, "frames"), PG = path.join(OUT, "pages");
fs.mkdirSync(FR, { recursive: true }); fs.mkdirSync(PG, { recursive: true });
const page = path.join(PG, `ch${ch}-${id}-cap2.html`);
writePage(page, read(pairPath(ch, id)), JSON.parse(read(sidecarPath(ch, id))));
const TAG = `${flow}${flow === "break" ? "-" + then : ""}-${lang}`;
const ANSWERS = [[85, 265], [50, 215], [1, 630]];

/* the page logs [t, acting, ink strokes, writing layer present, finished pencil-text strokes] every 8 ms, and keeps the SCREEN points of the layer's last ink */
const LOGGER = `(function () {
  window.__scr = function (e) { var m = e.getScreenCTM(), out = [], p = e.points; for (var i = 0; i < p.numberOfItems; i++) { var q = new DOMPoint(p.getItem(i).x, p.getItem(i).y).matrixTransform(m); out.push([q.x, q.y]); } return out; };
  window.__log = []; window.__lastInk = [];
  setInterval(function () {
    var a = window.toolApi && window.toolApi.getState();
    var ink = document.querySelectorAll('[data-role="pen-ink"]');
    var w = document.querySelector('[data-role="pen-writing"]') ? 1 : 0;
    window.__log.push([performance.now(), a && a.acting ? 1 : 0, ink.length, w, document.querySelectorAll('[data-role="pencil-text"] polyline').length]);
    if (ink.length) window.__lastInk = Array.prototype.map.call(ink, window.__scr);
  }, 8);
})()`;
const TEXT_PTS = `Array.prototype.map.call(document.querySelectorAll('[data-role="pencil-text"] polyline'), window.__scr)`;
const acts = [];

const res = await cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=${lang}`, async (s) => {
  const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
  async function watch(label, maxMs = 15000) {
    const t00 = await s.ev("performance.now()"), tEnd = t00 + maxMs;
    let w = 0, quiet = 0;
    for (let guard = 0; guard < 2000; guard++) {
      const r = await s.ev(`[document.querySelector('[data-role="pen-writing"]') ? 1 : 0, window.toolApi.getState().acting ? 1 : 0, performance.now()]`);
      if (r[0]) {
        quiet = 0; w++;
        const tw = r[2], shots = [];
        for (const off of offsets) {
          const now = await s.ev("performance.now()");
          if (now - tw < off) await s.wait(off - (now - tw));
          if (!(await s.ev(`!!document.querySelector('[data-role="pen-writing"]')`))) { shots.push({ askedMs: off, note: "act already over" }); break; }
          const f = path.join(FR, `ch${ch}-${id}-${TAG}-${label}-w${w}-${off}ms.png`), ta = await s.ev("performance.now()");
          await s.shot(f);
          shots.push({ file: path.basename(f), askedMs: off, tookMs: Math.round(ta - tw), ink: await s.ev(`document.querySelectorAll('[data-role="pen-ink"]').length`) });
        }
        await s.until(`!document.querySelector('[data-role="pen-writing"]')`, 8000);
        await s.wait(80);
        const f = path.join(FR, `ch${ch}-${id}-${TAG}-${label}-w${w}-after.png`);
        if (offsets.length) await s.shot(f);
        const lastInk = await s.ev("window.__lastInk"), textPts = await s.ev(TEXT_PTS);
        const same = (A, B) => A.length === B.length && A.every((q, i) => Math.abs(q[0] - B[i][0]) < 0.6 && Math.abs(q[1] - B[i][1]) < 0.6);
        const matched = lastInk.filter((A) => textPts.some((B) => same(A, B))).length;
        acts.push({ label, write: w, shots, after: offsets.length ? path.basename(f) : null, lastInkStrokes: lastInk.length, matched, textStrokes: textPts.length });
      } else if (!r[1]) { quiet++; if (quiet > 18) break; } else quiet = 0;
      if (r[2] > tEnd) break;
      await s.wait(15);
    }
    const log = (await s.ev("window.__log")).filter((e) => e[0] >= t00 - 200);
    const periods = [];
    let a = null, firstInk = null;
    for (const e of log) {
      if (e[3] && a == null) { a = e[0]; firstInk = null; }
      if (e[3] && firstInk == null && e[2] > 0) firstInk = e[0];
      if (!e[3] && a != null) { periods.push({ ms: Math.round(e[0] - a), inkStartsAt: firstInk == null ? null : Math.round(firstInk - a), inkInFirst100: log.filter((x) => x[0] >= a && x[0] < a + 100 && x[2] > 0).length }); a = null; }
    }
    acts.push({ label, periods });
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
  for (let q = 0; q < 2; q++) {
    const before = (await st()).score, it = (await st()).item;
    await s.ev(`window.toolApi.answer(${JSON.stringify(ANSWERS[q])})`); await s.wait(80); await s.ev("window.toolApi.check()");
    await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 20000);
    await s.wait(1200);
    if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 9000)) await s.click('[data-control="next-key"]');
    await s.until(`window.toolApi.getState().stage === 'ask' && window.toolApi.getState().item !== ${JSON.stringify(it)}`, 9000);
    await s.wait(900);
  }
  /* question :4: the 2nd cow's row on top (a hand carries it), then the Break key */
  if (!(await s.until(`!!document.querySelector('[data-control="cow-2"]')`, 6000))) return { problems: ["no cow-2 row on :4"], errors: [] };
  await s.click('[data-control="cow-2"]');
  await s.until("!window.toolApi.getState().acting", 6000);
  await s.wait(500);
  if (!(await s.until(`!!document.querySelector('[data-control="break"]') && !document.querySelector('[data-control="break"]').hasAttribute('disabled') && document.querySelector('[data-control="break"]').getAttribute('aria-disabled') !== 'true'`, 6000))) acts.push({ note: "the Break key did not look enabled" });
  const f0 = path.join(FR, `ch${ch}-${id}-${TAG}-swapped.png`);
  await s.shot(f0);
  await s.click('[data-control="break"]');
  await watch("break");
  await s.wait(400);
  const doneBefore = await s.ev(`document.querySelectorAll('[data-role="pencil-text"] polyline').length`), printedAmber = await s.ev(`Array.prototype.filter.call(document.querySelectorAll('text'), function (e) { return /^(13|1,380)$/.test(e.textContent.trim()); }).length`);
  acts.push({ note: `after Break: ${doneBefore} finished pencil strokes, ${printedAmber} printed <text> "13"/"1,380" (should be 0)` });
  const v = then === "wrong" ? [2, 370] : ANSWERS[2];
  await s.ev(`window.toolApi.answer(${JSON.stringify(v)})`); await s.wait(80); await s.ev("window.toolApi.check()");
  await s.wait(then === "wrong" ? 5000 : 2500);
  const f1 = path.join(FR, `ch${ch}-${id}-${TAG}-${then}.png`);
  await s.shot(f1);
  const doneAfter = await s.ev(`document.querySelectorAll('[data-role="pencil-text"] polyline').length`), printedAfter = await s.ev(`Array.prototype.filter.call(document.querySelectorAll('text'), function (e) { return /^(13|1,380)$/.test(e.textContent.trim()); }).length`);
  acts.push({ note: `${then}: ${doneAfter} finished pencil strokes (was ${doneBefore}), ${printedAfter} printed "13"/"1,380"; frames ${path.basename(f0)}, ${path.basename(f1)}`, stage: (await st()).stage });
  return { errors: [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))], stage: ((await st()) || {}).stage };
}, { label: `capture ${id} ${TAG}`, timeout: 240000, reducedMotion: false });

console.log(`capture ${flow} phase ${phase} ${lang}: page errors: ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""} (stage ${res.stage})`);
for (const a of acts) {
  if (a.write) console.log(`  [${a.label}] write ${a.write}: frames ${a.shots.map((x) => (x.note ? x.note : `${x.askedMs}ms(took ${x.tookMs}):${x.ink}ink`)).join(" ") || "-"}; last frame's ${a.lastInkStrokes} ink stroke(s): ${a.matched} equal a finished stroke on screen (of ${a.textStrokes} finished)${a.after ? "; " + a.after : ""}`);
  else if (a.periods) console.log(`  [${a.label}] writes ${a.periods.length}: ${a.periods.map((p) => `${p.ms} ms (first ink ${p.inkStartsAt} ms in, ink in the first 100 ms: ${p.inkInFirst100} samples)`).join("; ")}`);
  else if (a.note) console.log(`  ${a.note}${a.stage ? " (stage " + a.stage + ")" : ""}`);
}
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
process.exit((res.errors || []).length || res.problems ? 1 : 0);
