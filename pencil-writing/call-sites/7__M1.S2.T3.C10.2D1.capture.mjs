#!/usr/bin/env node
/* A capture for class 4 chapter 7 M1.S2.T3.C10.2D1 (Share Out Bench) that reaches the pencil's WRITE acts the stock pencil-writing/capture.mjs cannot (the ask stage's
 * keys, free play, the win and the wrong-answer timelines). It finds each write act by its layer (data-role="pen-writing" exists from the act's first frame to its end;
 * data-role="pen-ink" is a stroke on it), times it from an 8 ms log inside the page, takes frames at offsets from the layer's appearance, and checks: no ink in the first
 * 100 ms (no flash), the act's length, that the last frame's strokes are exactly the finished PencilText's strokes (no jump: same points, the layer and the tool's own
 * drawing share one stage frame here, so the shift must be 0,0), and that the finished stroke count grows to the full lines. It plays
 *   --flow guide   the phase's guide steps by toolApi.check() (as `approve` does): phase 2 both-ways, phases 3 and 4 count-tray, count-bench, leftover
 *   --flow ask     phase 2 (--q N, earlier questions answered right): the REAL keys Open bowls, Deal out, Lift to tray, Both ways (the answers are HIDDEN: dashed boxes = dabs),
 *                  then a right answer (--then win, the lines clear and are printed by the tool's own timeline) or a wrong one (--then wrong)
 *   --flow free    phase 4 to its summary, Free play, then the keys Open bowls, Deal out, Lift to tray, Both ways, Leftover check (line 3 is a second act: lines 1 and 2 stay)
 *   node pencil-writing/call-sites/7__M1.S2.T3.C10.2D1.capture.mjs --flow ask --phase 2 --q 1 [--lang en|hi|gu] [--tag x] [--offsets 250,700,1300] */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "../lib.mjs";

const args = process.argv.slice(2);
const val = (f, d = null) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const flow = val("--flow", "guide"), phase = Number(val("--phase", 2)), Q = Number(val("--q", 1)), lang = val("--lang", "en"), tag = val("--tag", "");
const offsets = String(val("--offsets", "250,700,1300,2000,2800,3600")).split(",").filter((x) => x !== "").map(Number); /* --offsets "" : no screenshots during the act (a screenshot stalls the page's animation) */
const then = val("--then", "");
const file = val("--file") ? path.resolve(val("--file")) : pairPath("7", "M1.S2.T3.C10.2D1");
const ch = "7", id = "M1.S2.T3.C10.2D1";
/* the stage shift of the act layer against the tool's own drawing: both sit at translate(W.x, W.y) here, so every ink stroke must equal a finished stroke exactly */
const EXP = [Number(val("--dx", 0)), Number(val("--dy", 0))];

const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);
const OUT = path.join(HERE, "out"), FR = path.join(OUT, "frames"), PG = path.join(OUT, "pages");
fs.mkdirSync(FR, { recursive: true }); fs.mkdirSync(PG, { recursive: true });
const page = path.join(PG, `ch${ch}-${id}.html`);
writePage(page, read(file), JSON.parse(read(sidecarPath(ch, id))));

const P = `ch${ch}-${id}`;
const TAG = `${flow}-p${phase}${flow === "ask" ? "-q" + Q : ""}${tag ? "-" + tag : ""}${lang !== "en" ? "-" + lang : ""}`;
const ANSWERS = { 2: [[24, 192], 12, [36, 252]], 3: [[40, 32], [36, 60], 16], 4: [27, 49, [84, 48]] };
const WRONG = { 2: [[1, 2], 5, [1, 2]], 3: [[1, 2], [1, 2], 5], 4: [5, 5, [1, 2]] };
/* the page logs [t, acting, ink strokes, writing layer present, finished pencil-text strokes] every 8 ms, and remembers the strokes of the layer at its last frames */
const LOGGER = `(function () {
  window.__log = []; window.__lastInk = []; window.__lastInkAt = 0;
  setInterval(function () {
    var a = window.toolApi && window.toolApi.getState();
    var ink = document.querySelectorAll('[data-role="pen-ink"]');
    var w = document.querySelector('[data-role="pen-writing"]') ? 1 : 0;
    var im = document.querySelector('[data-role="act-layer"] image[data-role="act"]'), tp = null, en = null;
    if (im && im.parentNode) { var tr = im.parentNode.getAttribute('transform') || '', m = tr.indexOf('translate(') === 0 ? tr.slice(10, tr.indexOf(')')).split(/[ ,]+/) : null; if (m) tp = [+m[0], +m[1]]; }
    if (ink.length) { var pp = ink[ink.length - 1].getAttribute('points').trim().split(' ').pop().split(',').map(Number); en = pp; }
    window.__log.push([performance.now(), a && a.acting ? 1 : 0, ink.length, w, document.querySelectorAll('[data-role="pencil-text"] polyline').length, tp, en]);
    if (ink.length) { window.__lastInk = Array.prototype.map.call(ink, function (e) { return e.getAttribute('points'); }); window.__lastInkAt = performance.now(); }
  }, 8);
})()`;
const TEXT_POINTS = `Array.prototype.map.call(document.querySelectorAll('[data-role="pencil-text"] polyline'), function (e) { return e.getAttribute('points'); })`;
const acts = [];

const res = await cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=${lang}`, async (s) => {
  const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
  const nums = (p) => p.trim().split(/\s+/).map((q) => q.split(",").map(Number));
  /* everything the action does until nothing acts for ~300 ms: per write act, frames at offsets from its first frame; the strokes of its last frames vs the finished text */
  async function watch(label, maxMs = 25000) {
    const t00 = await s.ev("performance.now()"), tEnd = t00 + maxMs;
    let w = 0, quiet = 0;
    for (let guard = 0; guard < 3000; guard++) {
      const r = await s.ev(`[document.querySelector('[data-role="pen-writing"]') ? 1 : 0, window.toolApi.getState().acting ? 1 : 0, performance.now()]`);
      if (r[0]) {
        quiet = 0; w++;
        const tw = r[2], shots = [];
        for (const off of offsets) {
          const now = await s.ev("performance.now()");
          if (now - tw < off) await s.wait(off - (now - tw));
          if (!(await s.ev(`!!document.querySelector('[data-role="pen-writing"]')`))) { shots.push({ askedMs: off, note: "act already over" }); break; }
          const f = path.join(FR, `${P}-${TAG}-${label}-w${w}-${off}ms.png`), ta = await s.ev("performance.now()");
          await s.shot(f);
          shots.push({ file: path.basename(f), askedMs: off, tookMs: Math.round(ta - tw), ink: await s.ev(`document.querySelectorAll('[data-role="pen-ink"]').length`), done: await s.ev(`document.querySelectorAll('[data-role="pencil-text"] polyline').length`) });
        }
        await s.until(`!document.querySelector('[data-role="pen-writing"]')`, 9000);
        await s.wait(60);
        const f = path.join(FR, `${P}-${TAG}-${label}-w${w}-after.png`);
        await s.shot(f);
        const lastInk = await s.ev("window.__lastInk"), textPts = await s.ev(TEXT_POINTS);
        /* each ink stroke of the layer's last frames must equal a finished stroke at EXACTLY the shift EXP (0,0: a 2-point stroke, as an "=" bar, would match any other bar at some shift) */
        let shift = null, same = lastInk.length > 0, used = 0;
        for (const p of lastInk) {
          const A = nums(p);
          const hit = textPts.map(nums).find((B) => B.length === A.length && B.every((q, i) => Math.abs(A[i][0] - q[0] - EXP[0]) < 0.25 && Math.abs(A[i][1] - q[1] - EXP[1]) < 0.25));
          if (!hit) { same = false; continue; }
          used++;
          const d = [Math.round((A[0][0] - hit[0][0]) * 10) / 10, Math.round((A[0][1] - hit[0][1]) * 10) / 10];
          if (shift && (Math.abs(shift[0] - d[0]) > 0.25 || Math.abs(shift[1] - d[1]) > 0.25)) same = false;
          shift = shift || d;
        }
        acts.push({ label, write: w, shots, after: path.basename(f), lastInkStrokes: lastInk.length, textStrokes: textPts.length, sameStrokes: same, shift, matched: used });
      } else if (!r[1]) { quiet++; if (quiet > 20) break; } else quiet = 0;
      if (r[2] > tEnd) break;
      await s.wait(15);
    }
    const f = path.join(FR, `${P}-${TAG}-${label}-end.png`);
    await s.shot(f);
    const log = (await s.ev("window.__log")).filter((e) => e[0] >= t00 - 20);
    const periods = [];
    let a = null, firstInk = null;
    for (const e of log) {
      if (e[3] && a == null) { a = e[0]; firstInk = null; }
      if (e[3] && firstInk == null && e[2] > 0) firstInk = e[0];
      if (!e[3] && a != null) {
        const span = log.filter((x) => x[3] && x[0] >= a + 250 && x[0] <= e[0] - 250 && x[5] && x[6]).map((x) => Math.hypot(x[5][0] - x[6][0], x[5][1] - x[6][1])).sort((p, q) => p - q);
        periods.push({ ms: Math.round(e[0] - a), inkStartsAt: firstInk == null ? null : Math.round(firstInk - a), inkInFirst100: log.filter((x) => x[0] >= a && x[0] < a + 100 && x[2] > 0).length, first: log.filter((x) => x[3] && x[0] >= a).slice(0, 7).map((x) => Math.round(x[0] - a) + 'ms:' + x[2] + 'ink'), tip: span.length ? { p50: Math.round(span[span.length >> 1]), p95: Math.round(span[Math.floor(span.length * 0.95)]), max: Math.round(span[span.length - 1]), n: span.length } : null });
        a = null;
      }
    }
    acts.push({ label, periods, end: path.basename(f) });
  }
  const idle = async (ms = 12000) => { await s.until("!window.toolApi.getState().acting", ms); await s.wait(500); };
  const errs = async () => [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))];

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
  if (flow === "guide") return { errors: await errs(), stage: ((await st()) || {}).stage };

  if (!(await s.until("window.toolApi.getState().stage === 'ask'", 45000))) return { problems: ["never reached a question"], errors: [] };
  await s.wait(1200);
  const answerRight = async (qi) => {
    const before = (await st()).score, it = (await st()).item;
    await s.ev(`window.toolApi.answer(${JSON.stringify(ANSWERS[phase][qi])})`); await s.wait(80); await s.ev("window.toolApi.check()");
    await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 20000);
    await s.wait(1500);
    if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 9000)) await s.click('[data-control="next-key"]');
    await s.until(`window.toolApi.getState().stage !== 'ask' || window.toolApi.getState().item !== ${JSON.stringify(it)}`, 9000);
    await s.wait(900);
  };
  if (flow === "ask") {
    for (let q = 1; q < Q; q++) await answerRight(q - 1);
    for (const key of ["open", "deal", "lift", "both-ways", "count-tray", "count-bench", "leftover"]) {
      if (!(await s.until(`!!document.querySelector('[data-control="${key}"]')`, 4000))) { if (key === "both-ways") acts.push({ note: "no both-ways key" }); continue; }
      await s.wait(500);
      await s.click(`[data-control="${key}"]`);
      if (key === "both-ways" || key === "leftover") await watch("key-" + key); else await idle();
      await s.wait(500);
    }
    const fa = path.join(FR, `${P}-${TAG}-lines-done.png`);
    await s.shot(fa);
    acts.push({ note: "the lines after the act (hidden answers are dashed boxes): " + path.basename(fa) });
    if (then === "win" || then === "wrong") {
      const v = then === "win" ? ANSWERS[phase][Q - 1] : WRONG[phase][Q - 1];
      await s.ev(`window.toolApi.answer(${JSON.stringify(v)})`); await s.wait(80);
      await s.ev("window.toolApi.check()");
      const t0 = await s.ev("performance.now()");
      /* the tool's own timeline: lines clear at 60 ms, then come back printed */
      for (const [off, nm] of [[150, "a"], [800, "b"], [1600, "c"], [3200, "d"]]) {
        const now = await s.ev("performance.now()");
        if (now - t0 < off) await s.wait(off - (now - t0));
        const f = path.join(FR, `${P}-${TAG}-${then}-${nm}.png`);
        await s.shot(f);
        acts.push({ note: `${then} +${off} ms: ${path.basename(f)}`, stage: (await st()).stage });
      }
    }
  } else if (flow === "free") {
    for (let qi = 0; qi < 3 && ((await st()) || {}).stage === "ask"; qi++) await answerRight(qi);
    if (!(await s.until(`!!document.querySelector('[data-control="free-play"]')`, 30000))) return { problems: ["no free-play key"], errors: await errs(), stage: ((await st()) || {}).stage };
    await s.click('[data-control="free-play"]');
    await s.wait(1400);
    for (const key of ["open", "deal", "lift", "both-ways", "leftover"]) {
      if (!(await s.until(`!!document.querySelector('[data-control="${key}"]')`, 5000))) { acts.push({ note: "no " + key + " key" }); break; }
      await s.wait(500);
      await s.click(`[data-control="${key}"]`);
      if (key === "both-ways" || key === "leftover") await watch("free-" + key); else await idle();
      await s.wait(500);
    }
  }
  return { errors: await errs(), stage: ((await st()) || {}).stage };
}, { label: `capture ${id} ${TAG}`, timeout: 360000, reducedMotion: false });

console.log(`capture ${flow} phase ${phase} q${Q} ${lang}: page errors: ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""} (stage ${res.stage})`);
for (const a of acts) {
  if (a.write) console.log(`  [${a.label}] write ${a.write}: frames ${a.shots.map((x) => (x.note ? x.note : `${x.askedMs}ms(took ${x.tookMs}):${x.ink}ink/${x.done}done`)).join(" ")}; last frames' ${a.lastInkStrokes} stroke(s): ${a.matched} equal a finished stroke, shift ${JSON.stringify(a.shift)}, all same ${a.sameStrokes}; finished strokes ${a.textStrokes}; ${a.after}`);
  else if (a.periods) console.log(`  [${a.label}] writes ${a.periods.length}: ${a.periods.map((p) => `${p.ms} ms (first ink ${p.inkStartsAt} ms in, ink in the first 100 ms: ${p.inkInFirst100} samples; tip to newest ink end px ${JSON.stringify(p.tip)}; first samples ${p.first.join(' ')})`).join("; ")}; ${a.end}`);
  else if (a.note) console.log(`  ${a.label ? "[" + a.label + "] " : ""}${a.note}${a.stage ? " (stage " + a.stage + ")" : ""}`);
}
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
fs.writeFileSync(path.join(OUT, `${P}-${TAG}.capture2.json`), JSON.stringify({ flow, phase, Q, lang, acts, errors: res.errors }, null, 1));
process.exit((res.errors || []).length || res.problems ? 1 : 0);
