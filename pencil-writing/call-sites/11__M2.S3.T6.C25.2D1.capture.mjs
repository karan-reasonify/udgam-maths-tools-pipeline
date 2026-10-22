#!/usr/bin/env node
/* A capture for class 4 chapter 11 M2.S3.T6.C25.2D1 (weight_columns) that reaches what pencil-writing/capture.mjs cannot: each WRITE timed on its own (a guide
 * step's chain also holds a hand carry or a knife), the child's Break key on phase 3's first question (60 kg − 18 kg 350 g: the pencil strikes with a dab, writes
 * the amber 59, strikes the grams, writes the amber 1,000), and free play's whole-sum write. It finds each WRITE by its layer (data-role="pen-writing"), times it
 * from an 8 ms log inside the page, takes frames at offsets from the layer's appearance, and compares the strokes of the layer's last frame with the finished
 * PencilText strokes IN SCREEN SPACE (every ink stroke must equal a finished stroke point for point within 0.6 px). Frames: ch11-<id>-<flow>-... in out/frames/.
 *   --flow guide --phase 2|3   the phase's guide steps by toolApi.check() (as `approve` does)
 *   --flow break [--then win|wrong]   phase 3: guide steps, then on question 1 a REAL click on Break, then the answer (toolApi) and a frame: no printed amber
 *   --flow free [--bags f1,f5] [--op add|take]   phase 4 to its summary (answers by toolApi), Free play, REAL clicks on two bags and Add / Take away
 *   [--lang en|hi|gu] [--offsets 200,400,600 | ""] */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "../lib.mjs";

const args = process.argv.slice(2);
const val = (f, d = null) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const flow = val("--flow", "guide"), lang = val("--lang", "en"), then = val("--then", "win");
const bagsArg = String(val("--bags", "f1,f5")).split(","), op = val("--op", "add");
const offRaw = String(val("--offsets", "200,400,600"));
const offsets = offRaw.trim() ? offRaw.split(",").map(Number) : [];
const ch = "11", id = "M2.S3.T6.C25.2D1";
const phase = flow === "guide" ? Number(val("--phase", 2)) : flow === "break" ? 3 : 4;

const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);
const OUT = path.join(HERE, "out"), FR = path.join(OUT, "frames"), PG = path.join(OUT, "pages");
fs.mkdirSync(FR, { recursive: true }); fs.mkdirSync(PG, { recursive: true });
const page = path.join(PG, `ch${ch}-${id}-cap2.html`);
writePage(page, read(pairPath(ch, id)), JSON.parse(read(sidecarPath(ch, id))));
const TAG = `${flow}${flow === "guide" ? "-p" + phase : flow === "break" ? "-" + then : "-" + bagsArg.join("") + "-" + op}-${lang}`;
const ANSWERS = { 3: [[41, 650], [12, 575], [44, 435]], 4: ["second|3|765", "onions|1|890", "B||540"] };

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
/* printed <text> that the pencil now writes: amber figures, the chip 1, the answer digits (must be 0 where the pencil wrote them) */
const PRINTED = (re) => `Array.prototype.filter.call(document.querySelectorAll('text, tspan'), function (e) { return e.children.length === 0 && ${re}.test(e.textContent.trim()); }).length`;
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
      } else if (!r[1]) { quiet++; if (quiet > 30) break; } else quiet = 0;
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
  const errs = async () => [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))];

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
  if (flow === "guide") return { errors: await errs(), stage: ((await st()) || {}).stage };

  if (!(await s.until("window.toolApi.getState().stage === 'ask'", 45000))) return { problems: ["never reached a question"], errors: [] };
  await s.wait(1200);
  async function rightAnswer(v) {
    const a = await st(), before = a.score, it = a.item;
    await s.ev(`window.toolApi.answer(${JSON.stringify(v)})`); await s.wait(120); await s.ev("window.toolApi.check()");
    await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 20000);
    await s.wait(1200);
    if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 9000)) await s.click('[data-control="next-key"]');
    await s.until(`window.toolApi.getState().stage !== 'ask' || window.toolApi.getState().item !== ${JSON.stringify(it)}`, 9000);
    await s.wait(900);
  }

  if (flow === "break") {
    if (!(await s.until(`!!document.querySelector('[data-control="break"]') && document.querySelector('[data-control="break"]').getAttribute('aria-disabled') !== 'true'`, 8000))) acts.push({ note: "the Break key did not look enabled" });
    await s.click('[data-control="break"]');
    await watch("break");
    await s.until("!window.toolApi.getState().acting", 8000);
    await s.wait(500);
    const fB = path.join(FR, `ch${ch}-${id}-${TAG}-broken.png`);
    await s.shot(fB);
    const pencilB = await s.ev(`document.querySelectorAll('[data-role="pencil-text"] polyline').length`), printedB = await s.ev(PRINTED("/^(59|1,000)$/"));
    acts.push({ note: `after Break: ${pencilB} finished pencil strokes, ${printedB} printed "59"/"1,000" (should be 0); ${path.basename(fB)}` });
    const v = then === "wrong" ? [42, 350] : ANSWERS[3][0];
    await s.ev(`window.toolApi.answer(${JSON.stringify(v)})`); await s.wait(120); await s.ev("window.toolApi.check()");
    await s.wait(then === "wrong" ? 6500 : 2500);
    const f1 = path.join(FR, `ch${ch}-${id}-${TAG}-${then}.png`);
    await s.shot(f1);
    const pencilA = await s.ev(`document.querySelectorAll('[data-role="pencil-text"] polyline').length`), printedA = await s.ev(PRINTED("/^(59|1,000)$/"));
    acts.push({ note: `${then}: ${pencilA} finished pencil strokes (was ${pencilB}), ${printedA} printed "59"/"1,000"; ${path.basename(f1)}`, stage: (await st()).stage });
    return { errors: await errs(), stage: ((await st()) || {}).stage };
  }

  /* free: phase 4's three questions answered, its summary, Free play, two bags, then Add or Take away */
  /* getState().item is 1-based */
  for (let g = 0; g < 8; g++) {
    await s.until(`window.toolApi.getState().stage === 'ask' || !!document.querySelector('[data-control="free-play"]')`, 15000);
    if (await s.ev(`!!document.querySelector('[data-control="free-play"]')`)) break;
    await rightAnswer(ANSWERS[4][(Number((await st()).item) || 1) - 1]);
  }
  if (!(await s.until(`!!document.querySelector('[data-control="free-play"]')`, 30000))) return { problems: ["no free-play key"], errors: await errs(), stage: ((await st()) || {}).stage };
  await s.click('[data-control="free-play"]');
  await s.wait(1500);
  for (const b of bagsArg) {
    await s.until(`!!document.querySelector('[data-control="fbag-${b}"]')`, 6000);
    await s.click(`[data-control="fbag-${b}"]`);
    await s.until("!window.toolApi.getState().acting", 6000);
    await s.wait(500);
  }
  const key = op === "take" ? "ftake" : "fadd";
  if (!(await s.until(`!!document.querySelector('[data-control="${key}"]')`, 6000))) return { problems: [`no ${key} key`], errors: await errs() };
  await s.click(`[data-control="${key}"]`);
  await watch(op);
  await s.until("!window.toolApi.getState().acting", 8000);
  await s.wait(600);
  const fF = path.join(FR, `ch${ch}-${id}-${TAG}-done.png`);
  await s.shot(fF);
  const pencilF = await s.ev(`document.querySelectorAll('[data-role="pencil-text"] polyline').length`);
  acts.push({ note: `free ${op} done: ${pencilF} finished pencil strokes; ${path.basename(fF)}` });
  return { errors: await errs(), stage: ((await st()) || {}).stage };
}, { label: `capture ${id} ${TAG}`, timeout: 300000, reducedMotion: false });

console.log(`capture ${TAG} phase ${phase}: page errors: ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""} (stage ${res.stage})`);
for (const a of acts) {
  if (a.write) console.log(`  [${a.label}] write ${a.write}: frames ${a.shots.map((x) => (x.note ? x.note : `${x.askedMs}ms(took ${x.tookMs}):${x.ink}ink`)).join(" ") || "-"}; last frame's ${a.lastInkStrokes} ink stroke(s): ${a.matched} equal a finished stroke on screen (of ${a.textStrokes} finished)${a.after ? "; " + a.after : ""}`);
  else if (a.periods) console.log(`  [${a.label}] writes ${a.periods.length}: ${a.periods.map((p) => `${p.ms} ms (first ink ${p.inkStartsAt} ms in, ink in the first 100 ms: ${p.inkInFirst100} samples)`).join("; ")}`);
  else if (a.note) console.log(`  ${a.note}${a.stage ? " (stage " + a.stage + ")" : ""}`);
}
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
process.exit((res.errors || []).length || res.problems ? 1 : 0);
