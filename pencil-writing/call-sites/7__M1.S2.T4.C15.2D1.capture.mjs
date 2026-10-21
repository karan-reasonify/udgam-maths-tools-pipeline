#!/usr/bin/env node
/* A capture for class 4 chapter 7 M1.S2.T4.C15.2D1 that reaches what pencil-writing/capture.mjs cannot (it only walks the guide steps, and takes its frames
 * from the start of a whole chain of acts): it finds each WRITE act by its ink (data-role="pen-ink" exists from the first stroke to the act's end), takes
 * frames at offsets from that first ink, and reports each act's duration (ink time + the 150 ms the pencil takes to come in). It plays
 *   --flow guide   the phase's guide steps, by toolApi.check() (as `approve` does)
 *   --flow tap     guide steps, then question Q (1-based): earlier ones answered right, then REAL clicks on the tile(s) of the tray (divideTap)
 *   --flow wrong   guide steps, then question Q is answered WRONG (--wrong 2,4): the trace plays (the ÷ marks and label, the scratch fraction, the u-route)
 *   --flow tapwrong  one real tile tap first, then the wrong answer (a fromStart question with more than one rung draws the u-route)
 *   --flow free    the last phase to its summary, Free play, then the "New fraction" key (doNew), 2 presses
 *   node pencil-writing/call-sites/7__M1.S2.T4.C15.2D1.capture.mjs --flow tap --phase 2 --q 3 [--offsets 150,450,750,1050,1350] [--lang en] [--tag x] */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "../lib.mjs";

const args = process.argv.slice(2);
const val = (f, d = null) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const flow = val("--flow", "guide"), phase = Number(val("--phase", 1)), Q = Number(val("--q", 1)), lang = val("--lang", "en"), tag = val("--tag", "");
const offsets = String(val("--offsets", "150,450,750,1050,1350")).split(",").map(Number);
/* --pre 170,340: frames from the START of the act (before the first ink: a dab touches a point and leaves none) */
const pre = val("--pre") ? String(val("--pre")).split(",").map(Number) : [];
const wrong = val("--wrong") ? val("--wrong").split(",").map((x) => (/^\d+$/.test(x) ? Number(x) : x)) : null;
const ch = "7", id = "M1.S2.T4.C15.2D1";

const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);
const OUT = path.join(HERE, "out"), FR = path.join(OUT, "frames"), PG = path.join(OUT, "pages");
fs.mkdirSync(FR, { recursive: true }); fs.mkdirSync(PG, { recursive: true });
const page = path.join(PG, `${id}.html`);
writePage(page, read(pairPath(ch, id)), JSON.parse(read(sidecarPath(ch, id))));

const INK = `document.querySelectorAll('[data-role="pen-ink"]').length`;
const LOGGER = `(function () {
  window.__log = []; window.__a0 = 0; var prev = 0;
  setInterval(function () {
    var a = window.toolApi && window.toolApi.getState();
    var on = a && a.acting ? 1 : 0; if (on && !prev) window.__a0 = performance.now(); prev = on;
    window.__log.push([performance.now(), a && a.acting ? 1 : 0, document.querySelectorAll('[data-role="pen-ink"]').length]);
  }, 8);
})()`;
const TAG = `${flow}-p${phase}${flow === "tap" || flow === "wrong" || flow === "tapwrong" ? "-q" + Q : ""}${tag ? "-" + tag : ""}`;
/* the right answers of the tool's items by phase (from its data), for the questions the flows pass on the way */
const ANSWERS = { 1: [[2, 3], [2, 5], [2, 5]], 2: ["not yet", "no", [3, 4]], 3: ["yes", [3, 5], [5, 7]], 4: ["same", "same", [7, 9]] };
const acts = [];
let shotN = 0;

const res = await cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=${lang}`, async (s) => {
  const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  /* look at everything an action does, until nothing acts for 700 ms: frames at offsets from each write act's first ink */
  async function watch(label) {
    const t00 = await s.ev("performance.now()");
    let w = 0, quiet = 0;
    let started = false;
    for (let n = 0; n < 175 && !started; n++) { started = (await s.ev(`window.__a0 > ${t00 - 400}`)); if (!started) await wait(20); }
    if (!started) { acts.push({ label, note: "no act started" }); return; }
    const actT0 = await s.ev("window.__a0");
    for (const off of pre) {
      const now = await s.ev("performance.now()");
      if (now - actT0 < off) await wait(off - (now - actT0));
      if ((await s.ev(INK)) > 0) break;
      const f = path.join(FR, `${id}-${TAG}-${label}-pre${off}ms.png`), ta = await s.ev("performance.now()");
      await s.shot(f);
      acts.push({ label, preShot: path.basename(f), askedMs: off, tookMs: Math.round(ta - actT0) });
    }
    for (let guard = 0; guard < 600; guard++) {
      const r = await s.ev(`[${INK}, window.toolApi.getState().acting ? 1 : 0, performance.now()]`);
      if (r[0] > 0) {
        quiet = 0;
        const t0 = r[2], shots = [];
        w++;
        for (const off of offsets) {
          const now = await s.ev("performance.now()");
          if (now - t0 < off) await wait(off - (now - t0));
          const f = path.join(FR, `${id}-${TAG}-${label}-w${w}-${off}ms.png`), ta = await s.ev("performance.now()");
          if ((await s.ev(INK)) === 0) { shots.push({ askedMs: off, note: "act already over" }); break; }
          await s.shot(f);
          shots.push({ file: path.basename(f), askedMs: off, tookMs: Math.round(ta - t0), ink: await s.ev(INK) });
        }
        await s.until(`${INK} === 0`, 6000);
        acts.push({ label, write: w, shots });
      } else if (!r[1]) {
        quiet++;
        if (quiet > 14) break; /* nothing acting for about 0.7 s */
      } else quiet = 0;
      await wait(50);
    }
    const f = path.join(FR, `${id}-${TAG}-${label}-after.png`);
    await wait(250);
    await s.shot(f);
    const log = await s.ev("window.__log");
    const mine = log.filter((e) => e[0] >= t00 - 20);
    /* ink periods: first ink to its end, from the 8 ms log */
    const periods = [];
    let a0 = null;
    for (const e of mine) {
      if (e[2] > 0 && a0 == null) a0 = e[0];
      if (e[2] === 0 && a0 != null) { periods.push([a0, e[0]]); a0 = null; }
    }
    const on = mine.filter((e) => e[1] === 1);
    acts.push({ label, chainMs: on.length ? Math.round(on[on.length - 1][0] - on[0][0]) : null, writeMs: periods.map(([a, b]) => Math.round(b - a + 150)), fromStart: periods.length ? Math.round(periods[periods.length - 1][1] - actT0) : null, inkAt: periods.map(([a, b]) => [Math.round(a - (on.length ? on[0][0] : t00)), Math.round(b - (on.length ? on[0][0] : t00))]), after: path.basename(f), ink: Math.max(0, ...mine.map((e) => e[2])) });
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
  if (flow === "guide") return { errors: [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))] };

  if (!(await s.until("window.toolApi.getState().stage === 'ask'", 45000))) return { problems: ["never reached a question"], errors: [] };
  await s.wait(1200);
  /* earlier questions right (the tool's own check() takes the right answer) */
  for (let q = 1; q < Q; q++) {
    const before = (await st()).score, it = (await st()).item;
    await s.ev(`window.toolApi.answer(${JSON.stringify(ANSWERS[phase][q - 1])})`); await s.wait(80); await s.ev("window.toolApi.check()");
    await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 6000);
    await s.wait(1200);
    if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 9000)) await s.click('[data-control="next-key"]');
    await s.until(`window.toolApi.getState().stage === 'ask' && window.toolApi.getState().item !== ${JSON.stringify(it)}`, 9000);
    await s.wait(900);
  }
  if (flow === "tap") {
    for (let n = 0; n < 4; n++) {
      const tile = await s.ev(`(() => { const e = document.querySelector('[data-control^="tile-"]:not([aria-disabled="true"])'); return e ? e.getAttribute('data-control') : null; })()`);
      if (!tile) break;
      await s.click(`[data-control="${tile}"]`);
      await watch(`tap${n + 1}-${tile}`);
      await s.wait(500);
    }
  } else if (flow === "wrong" || flow === "tapwrong") {
    if (flow === "tapwrong") {
      const tile = await s.ev(`(() => { const e = document.querySelector('[data-control^="tile-"]:not([aria-disabled="true"])'); return e ? e.getAttribute('data-control') : null; })()`);
      if (tile) { await s.click(`[data-control="${tile}"]`); await watch("tap1-" + tile); await s.wait(500); }
    }
    if (!wrong) return { problems: ["--wrong a,b is needed"], errors: [] };
    await s.ev(`window.toolApi.answer(${JSON.stringify(wrong)})`);
    await s.wait(80);
    await s.ev("window.toolApi.check()");
    await watch("trace");
  } else if (flow === "free") {
    /* answer everything right to the summary, then Free play */
    for (let g = 0; g < 8 && ((await st()) || {}).stage !== "summary"; g++) {
      const a = await st();
      if (a.stage === "ask") {
        const before = a.score, it = a.item;
        await s.ev(`window.toolApi.answer(${JSON.stringify(ANSWERS[phase][Number(it) - 1])})`); await s.wait(80); await s.ev("window.toolApi.check()");
        await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 6000);
        await s.wait(1200);
        if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 3000)) await s.click('[data-control="next-key"]');
        await s.until(`window.toolApi.getState().stage !== 'ask' || window.toolApi.getState().item !== ${JSON.stringify(it)}`, 9000);
      } else await s.wait(500);
    }
    if (!(await s.until(`!!document.querySelector('[data-control="free-play"]')`, 30000))) return { problems: ["no free-play key"], errors: [], stage: (await st()).stage };
    await s.click('[data-control="free-play"]');
    await s.wait(1200);
    for (let n = 0; n < 2; n++) {
      if (!(await s.until(`!!document.querySelector('[data-control="new"]')`, 6000))) { acts.push({ note: "no New fraction key" }); break; }
      await s.click('[data-control="new"]');
      await watch("new" + (n + 1));
      await s.wait(500);
    }
  }
  return { errors: [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))], stage: ((await st()) || {}).stage };
}, { label: `capture ${id} ${TAG}`, timeout: 240000, reducedMotion: false });

console.log(`capture ${flow} phase ${phase} q${Q} ${lang}: page errors: ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""} (stage ${res.stage})`);
for (const a of acts) {
  if (a.write) console.log(`  [${a.label}] write act ${a.write}: frames ${a.shots.map((x) => (x.note ? x.note : `${x.askedMs}ms(took ${x.tookMs}):${x.ink}ink`)).join(" ")}`);
  else if (a.preShot) console.log(`  [${a.label}] pre-ink frame ${a.preShot} (asked ${a.askedMs} ms, taken at ${a.tookMs} ms from the act start)`);
  else if (a.note) console.log(`  [${a.label}] ${a.note}`);
  else console.log(`  [${a.label}] chain ${a.chainMs} ms; last ink ends ${a.fromStart} ms after the act started (= the act's length); ink periods (+150 in) ${JSON.stringify(a.writeMs)} ms, ink at ${JSON.stringify(a.inkAt)}; max ink strokes ${a.ink}; after: ${a.after}`);
}
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
fs.writeFileSync(path.join(OUT, `${id}-${TAG}.capture2.json`), JSON.stringify({ flow, phase, Q, lang, acts, errors: res.errors }, null, 1));
process.exit((res.errors || []).length || res.problems ? 1 : 0);
