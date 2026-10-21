#!/usr/bin/env node
/* A capture for class 4 chapter 7 M2.S3.T5.C20.2D1 (phase 4, SabCross) that reaches what pencil-writing/capture.mjs cannot (it takes its frames from the start of
 * a whole chain, and the cross product is written AFTER a crossing line the tool draws). It finds each WRITE act by its layer (data-role="pen-writing" exists from
 * the act's first frame to its end; data-role="pen-ink" is a stroke on it), times it from an 8 ms log inside the page, takes frames at offsets from the layer's
 * appearance, and checks: no ink in the first 100 ms (no flash), the act's length, that the last frame's strokes are exactly the finished PencilText's strokes (no
 * jump: same points), and the pencil-text stroke count grows to the full number. It plays
 *   --flow guide   the phase's guide steps by toolApi.check() (as `approve` does): two chains (line then product)
 *   --flow tap     guide steps, then question Q (earlier ones answered right): REAL clicks on the two upper numbers, then the verdict key and Enter (the win page)
 *   --flow agent   guide steps, then question Q: answer + check(): the agent draws both lines FAST and the products, then submits (--wrong yes|no to give another answer)
 *   node pencil-writing/call-sites/7__M2.S3.T5.C20.2D1.capture.mjs --flow tap --q 1 [--lang en] [--tag x] [--offsets 60,260,460] */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "../lib.mjs";

const args = process.argv.slice(2);
const val = (f, d = null) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const flow = val("--flow", "guide"), phase = Number(val("--phase", 4)), Q = Number(val("--q", 1)), lang = val("--lang", "en"), tag = val("--tag", "");
const offsets = String(val("--offsets", "60,260,460")).split(",").map(Number);
const give = val("--wrong");
/* the stage shift of the layer against the tool's own drawing: x = the scene's off (270 at 1600 wide), y = DY4 (36); every ink stroke must equal a finished stroke shifted by exactly this */
const EXP = [Number(val("--off", 270)), 36];
const ch = "7", id = "M2.S3.T5.C20.2D1";

const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);
const OUT = path.join(HERE, "out"), FR = path.join(OUT, "frames"), PG = path.join(OUT, "pages");
fs.mkdirSync(FR, { recursive: true }); fs.mkdirSync(PG, { recursive: true });
const page = path.join(PG, `${id}.html`);
writePage(page, read(pairPath(ch, id)), JSON.parse(read(sidecarPath(ch, id))));

const TAG = `${flow}-p${phase}${flow !== "guide" ? "-q" + Q : ""}${tag ? "-" + tag : ""}`;
const ANSWERS = { 4: ["yes", "yes", "no"] };
/* the page logs [t, acting, ink strokes, writing layer present, finished pencil-text strokes] every 8 ms, and remembers the strokes of the layer at its last frames */
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
const acts = [];

const res = await cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=${lang}`, async (s) => {
  const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
  /* everything the action does until nothing acts for 900 ms: per write act, frames at offsets from its first frame; the strokes of its last frames vs the finished text */
  async function watch(label, maxMs = 20000) {
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
          const f = path.join(FR, `${id}-${TAG}-${label}-w${w}-${off}ms.png`), ta = await s.ev("performance.now()");
          await s.shot(f);
          shots.push({ file: path.basename(f), askedMs: off, tookMs: Math.round(ta - tw), ink: await s.ev(`document.querySelectorAll('[data-role="pen-ink"]').length`), done: await s.ev(`document.querySelectorAll('[data-role="pencil-text"] polyline').length`) });
        }
        await s.until(`!document.querySelector('[data-role="pen-writing"]')`, 6000);
        const tAfter = await s.ev("performance.now()");
        await s.wait(60);
        const f = path.join(FR, `${id}-${TAG}-${label}-w${w}-after.png`);
        await s.shot(f);
        const lastInk = await s.ev("window.__lastInk"), textPts = await s.ev(TEXT_POINTS);
        /* the layer is in stage coordinates and the tool draws in its own (translate(off, DY4)): each ink stroke must equal a finished stroke shifted by one constant (dx, dy) */
        const nums = (p) => p.trim().split(/\s+/).map((q) => q.split(",").map(Number));
        let shift = null, same = lastInk.length > 0;
        for (const p of lastInk) {
          const A = nums(p);
          const hit = textPts.map(nums).find((B) => B.length === A.length && Math.abs((A[0][0] - B[0][0]) - EXP[0]) < 0.25 && Math.abs((A[0][1] - B[0][1]) - EXP[1]) < 0.25 && B.every((q, i) => Math.abs((A[i][0] - q[0]) - (A[0][0] - B[0][0])) < 0.25 && Math.abs((A[i][1] - q[1]) - (A[0][1] - B[0][1])) < 0.25));
          if (!hit) { same = false; continue; }
          const d = [Math.round((A[0][0] - hit[0][0]) * 10) / 10, Math.round((A[0][1] - hit[0][1]) * 10) / 10];
          if (shift && (Math.abs(shift[0] - d[0]) > 0.25 || Math.abs(shift[1] - d[1]) > 0.25)) same = false;
          shift = shift || d;
        }
        acts.push({ label, write: w, shots, after: path.basename(f), lastInkStrokes: lastInk.length, textStrokes: textPts.length, sameStrokes: same, shift, inkPts: lastInk, textPts });
      } else if (!r[1]) { quiet++; if (quiet > 18) break; } else quiet = 0;
      if (r[2] > tEnd) break;
      await s.wait(15);
    }
    const f = path.join(FR, `${id}-${TAG}-${label}-end.png`);
    await s.shot(f);
    const log = (await s.ev("window.__log")).filter((e) => e[0] >= t00 - 20);
    /* write periods from the log: the layer present (w=1); first ink; the finished strokes at the end */
    const periods = [];
    let a = null, firstInk = null, doneAtEnd = 0;
    for (const e of log) {
      if (e[3] && a == null) { a = e[0]; firstInk = null; }
      if (e[3] && firstInk == null && e[2] > 0) firstInk = e[0];
      if (e[3]) doneAtEnd = e[4];
      if (!e[3] && a != null) { periods.push({ ms: Math.round(e[0] - a), inkStartsAt: firstInk == null ? null : Math.round(firstInk - a), inkInFirst100: log.filter((x) => x[0] >= a && x[0] < a + 100 && x[2] > 0).length }); a = null; }
    }
    acts.push({ label, periods, end: path.basename(f) });
  }

  if (!(await s.until("!!window.toolApi && !!document.querySelector('svg')", 30000))) return { problems: ["the pair did not mount"], errors: await s.ev("window.__hostErrors") };
  await s.wait(800);
  await s.ev(LOGGER);
  if (await s.ev(`!!document.querySelector('[data-control="start"]')`)) { await s.click('[data-control="start"]'); await s.wait(900); }
  /* the guide steps */
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
  /* earlier questions right: the agent path (answer, check) */
  for (let q = 1; q < Q; q++) {
    const before = (await st()).score, it = (await st()).item;
    await s.ev(`window.toolApi.answer(${JSON.stringify(ANSWERS[phase][q - 1])})`); await s.wait(80); await s.ev("window.toolApi.check()");
    await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 20000);
    await s.wait(1200);
    if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 9000)) await s.click('[data-control="next-key"]');
    await s.until(`window.toolApi.getState().stage === 'ask' && window.toolApi.getState().item !== ${JSON.stringify(it)}`, 9000);
    await s.wait(900);
  }
  if (flow === "tap") {
    for (const h of ["num-a", "num-c"]) {
      if (!(await s.until(`!!document.querySelector('[data-control="${h}"]')`, 5000))) { acts.push({ note: "no " + h }); break; }
      await s.click(`[data-control="${h}"]`);
      await watch("tap-" + h);
      await s.wait(400);
    }
    /* the verdict, then Enter: the win page turns the boxes strong: nothing may jump */
    const want = ANSWERS[phase][Q - 1];
    if (await s.until(`!!document.querySelector('[data-control="verdict-${want}"]')`, 5000)) {
      await s.click(`[data-control="verdict-${want}"]`);
      await s.wait(700);
      const f0 = path.join(FR, `${id}-${TAG}-beforewin.png`);
      await s.shot(f0);
      await s.ev(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }))`);
      await s.until(`window.toolApi.getState().stage === 'win'`, 6000);
      await s.wait(1800);
      const f1 = path.join(FR, `${id}-${TAG}-win.png`);
      await s.shot(f1);
      acts.push({ note: "win page frames: " + path.basename(f0) + " then " + path.basename(f1), stage: (await st()).stage });
    } else acts.push({ note: "no verdict key" });
  } else if (flow === "agent") {
    const v = give || ANSWERS[phase][Q - 1];
    await s.ev(`window.toolApi.answer(${JSON.stringify(v)})`);
    await s.wait(80);
    await s.ev("window.toolApi.check()");
    await watch("agent", 30000);
    await s.wait(3000);
    const f = path.join(FR, `${id}-${TAG}-trace-or-win.png`);
    await s.shot(f);
    acts.push({ note: "later frame: " + path.basename(f), stage: (await st()).stage });
  }
  return { errors: [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))], stage: ((await st()) || {}).stage };
}, { label: `capture ${id} ${TAG}`, timeout: 240000, reducedMotion: false });

console.log(`capture ${flow} phase ${phase} q${Q} ${lang}: page errors: ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""} (stage ${res.stage})`);
for (const a of acts) {
  if (a.write) console.log(`  [${a.label}] write ${a.write}: frames ${a.shots.map((x) => (x.note ? x.note : `${x.askedMs}ms(took ${x.tookMs}):${x.ink}ink/${x.done}done`)).join(" ")}; last frames' ${a.lastInkStrokes} stroke(s) vs ${a.textStrokes} finished stroke(s): same points (up to the stage shift ${JSON.stringify(a.shift)}) ${a.sameStrokes}; ${a.after}`);
  else if (a.periods) console.log(`  [${a.label}] writes ${a.periods.length}: ${a.periods.map((p) => `${p.ms} ms (first ink ${p.inkStartsAt} ms in, ink in the first 100 ms: ${p.inkInFirst100} samples)`).join("; ")}; ${a.end}`);
  else if (a.note) console.log(`  ${a.label ? "[" + a.label + "] " : ""}${a.note}${a.stage ? " (stage " + a.stage + ")" : ""}`);
}
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
fs.writeFileSync(path.join(OUT, `${id}-${TAG}.capture2.json`), JSON.stringify({ flow, phase, Q, lang, acts, errors: res.errors }, null, 1));
process.exit((res.errors || []).length || res.problems ? 1 : 0);
