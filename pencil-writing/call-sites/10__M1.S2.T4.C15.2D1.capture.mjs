#!/usr/bin/env node
/* A capture for class 4 CHAPTER 10 M1.S2.T4.C15.2D1 (the number towers). Its page, frames and json are all prefixed "ch10-" because chapter 7's tool has the
 * same slot id and the stock capture.mjs names its outputs by slot id alone. It finds each WRITE act by its ink (data-role="pen-ink" exists from the first
 * stroke to the act's end), takes frames at offsets from that first ink, and reports each act's length from the page's own "acting" flag (8 ms log).
 *   --flow guide    the phase's guide steps by toolApi.check() (as `approve` does): phases 1-2 write a box (Add / Multiply), 3-4 write a result in the working
 *   --flow misses   guide steps, then ask-stage question Q (1-based; earlier ones answered right): REAL clicks on the box, three wrong entries on the keys
 *                   (the third makes the pencil write the box: pencilBox)
 *   --flow free     the last phase to its summary, Free play, then REAL clicks: change a bottom number (rebuild), then Switch sign (rebuild of every box)
 *   node pencil-writing/call-sites/10__M1.S2.T4.C15.2D1.capture.mjs --flow guide --phase 1 [--offsets 150,350,550] [--pre 60,180] [--lang en] [--tag x] */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "../lib.mjs";

const args = process.argv.slice(2);
const val = (f, d = null) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const flow = val("--flow", "guide"), phase = Number(val("--phase", 1)), Q = Number(val("--q", 1)), lang = val("--lang", "en"), tag = val("--tag", "");
const offsets = String(val("--offsets", "150,350,550")).split(",").map(Number);
const pre = val("--pre") ? String(val("--pre")).split(",").map(Number) : [];
const base = val("--base", "7"); /* free play: the digit typed into the first bottom box */
const ch = "10", id = "M1.S2.T4.C15.2D1";

const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);
const OUT = path.join(HERE, "out"), FR = path.join(OUT, "frames"), PG = path.join(OUT, "pages");
fs.mkdirSync(FR, { recursive: true }); fs.mkdirSync(PG, { recursive: true });
const page = path.join(PG, `ch10-${id}.html`);
writePage(page, read(pairPath(ch, id)), JSON.parse(read(sidecarPath(ch, id))));

const INK = `document.querySelectorAll('[data-role="pen-ink"]').length`;
/* what each tower box and each working-column line shows right now: pencil-text polylines (the pencil's digits) and printed <text> */
const PROBE = `(function () {
  var boxes = Array.prototype.map.call(document.querySelectorAll('[data-role="tower-box"]'), function (g) {
    var t = Array.prototype.map.call(g.querySelectorAll('text'), function (x) { return x.textContent; }).filter(function (x) { return x; });
    return { pen: g.querySelectorAll('[data-role="pencil-text"] polyline').length, printed: t.join('|') };
  });
  return { boxes: boxes, penAll: document.querySelectorAll('[data-role="pencil-text"]').length, ink: document.querySelectorAll('[data-role="pen-ink"]').length };
})()`;
const LOGGER = `(function () {
  window.__log = []; window.__a0 = 0; var prev = 0;
  setInterval(function () {
    var a = window.toolApi && window.toolApi.getState();
    var on = a && a.acting ? 1 : 0; if (on && !prev) window.__a0 = performance.now(); prev = on;
    window.__log.push([performance.now(), on, document.querySelectorAll('[data-role="pen-ink"]').length]);
  }, 8);
})()`;
const TAG = `${flow}-p${phase}${flow === "misses" ? "-q" + Q : ""}${tag ? "-" + tag : ""}`;
/* the right answers of the items by phase */
const ANSWERS = { 1: [56, 25, 127], 2: [48, 50, 4], 3: ["one breaks", "all follow", "multiplying"], 4: ["two signs", "two signs", 90] };
const acts = [];

const res = await cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=${lang}`, async (s) => {
  const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  async function watch(label) {
    const t00 = await s.ev("performance.now()");
    let w = 0, quiet = 0, started = false;
    for (let n = 0; n < 175 && !started; n++) { started = await s.ev(`window.__a0 > ${t00 - 400}`); if (!started) await wait(20); }
    if (!started) { acts.push({ label, note: "no act started" }); return; }
    const actT0 = await s.ev("window.__a0");
    for (const off of pre) {
      const now = await s.ev("performance.now()");
      if (now - actT0 < off) await wait(off - (now - actT0));
      if ((await s.ev(INK)) > 0) break;
      const f = path.join(FR, `ch10-${id}-${TAG}-${label}-pre${off}ms.png`), ta = await s.ev("performance.now()");
      await s.shot(f);
      acts.push({ label, preShot: path.basename(f), askedMs: off, tookMs: Math.round(ta - actT0) });
    }
    for (let guard = 0; guard < 700; guard++) {
      const r = await s.ev(`[${INK}, window.toolApi.getState().acting ? 1 : 0, performance.now()]`);
      if (r[0] > 0) {
        quiet = 0;
        const t0 = r[2], shots = [];
        w++;
        for (const off of offsets) {
          const now = await s.ev("performance.now()");
          if (now - t0 < off) await wait(off - (now - t0));
          const f = path.join(FR, `ch10-${id}-${TAG}-${label}-w${w}-${off}ms.png`), ta = await s.ev("performance.now()");
          if ((await s.ev(INK)) === 0) { shots.push({ askedMs: off, note: "act already over" }); break; }
          await s.shot(f);
          shots.push({ file: path.basename(f), askedMs: off, tookMs: Math.round(ta - t0), ink: await s.ev(INK), probe: await s.ev(PROBE) });
        }
        await s.until(`${INK} === 0`, 9000);
        acts.push({ label, write: w, shots });
      } else if (!r[1]) {
        quiet++;
        if (quiet > 14) break;
      } else quiet = 0;
      await wait(50);
    }
    const f = path.join(FR, `ch10-${id}-${TAG}-${label}-after.png`);
    await wait(250);
    const probe = await s.ev(PROBE);
    await s.shot(f);
    const log = await s.ev("window.__log");
    /* from the act's own start (window.__a0), not from when watch() was called: after a click the act is already running */
    const mine = log.filter((e) => e[0] >= actT0 - 20);
    const on = mine.filter((e) => e[1] === 1);
    /* ink periods: first ink to its end (the stroke layer exists from the first stroke to the act's end) */
    const periods = [];
    let a0 = null;
    for (const e of mine) {
      if (e[2] > 0 && a0 == null) a0 = e[0];
      if (e[2] === 0 && a0 != null) { periods.push([a0, e[0]]); a0 = null; }
    }
    acts.push({ label, actMs: on.length ? Math.round(on[on.length - 1][0] - on[0][0]) : null, inkPeriods: periods.map(([a, b]) => [Math.round(a - (on.length ? on[0][0] : t00)), Math.round(b - (on.length ? on[0][0] : t00))]), maxInk: Math.max(0, ...mine.map((e) => e[2])), after: path.basename(f), probe });
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
  async function rightAnswer(a) {
    const before = a.score, it = a.item;
    await s.ev(`window.toolApi.answer(${JSON.stringify(ANSWERS[phase][Number(it) - 1])})`); await s.wait(80); await s.ev("window.toolApi.check()");
    await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 6000);
    await s.wait(1200);
    if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 9000)) await s.click('[data-control="next-key"]');
    await s.until(`window.toolApi.getState().stage !== 'ask' || window.toolApi.getState().item !== ${JSON.stringify(it)}`, 9000);
    await s.wait(900);
  }
  if (flow === "misses") {
    for (let q = 1; q < Q; q++) await rightAnswer(await st());
    if (!(await s.until(`!!document.querySelector('[data-control="box"]')`, 8000))) return { problems: ["no box to open"], errors: [] };
    await s.click('[data-control="box"]'); await s.wait(600);
    for (let n = 0; n < 3; n++) {
      await s.click('[data-control="key-1"]'); await s.wait(200);
      await s.click('[data-control="key-enter"]');
      if (n < 2) await s.wait(2200);
    }
    await watch("pencilbox");
  } else if (flow === "free") {
    for (let g = 0; g < 8 && ((await st()) || {}).stage !== "summary"; g++) {
      const a = await st();
      if (a.stage === "ask") await rightAnswer(a); else await s.wait(500);
    }
    if (!(await s.until(`!!document.querySelector('[data-control="free-play"]')`, 30000))) return { problems: ["no free-play key"], errors: [], stage: (await st()).stage };
    await s.click('[data-control="free-play"]');
    await s.wait(1500);
    await s.click('[data-control="base-0"]'); await s.wait(600);
    await s.click(`[data-control="key-${base}"]`); await s.wait(250);
    await s.click('[data-control="key-enter"]');
    await watch("base");
    await s.wait(500);
    await s.click('[data-control="sign"]');
    await watch("sign");
  }
  return { errors: [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))], stage: ((await st()) || {}).stage };
}, { label: `capture ch10 ${id} ${TAG}`, timeout: 240000, reducedMotion: false });

console.log(`capture ch10 ${flow} phase ${phase} q${Q} ${lang}: page errors: ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""} (stage ${res.stage})`);
for (const a of acts) {
  if (a.write) console.log(`  [${a.label}] write ${a.write}: frames ${a.shots.map((x) => (x.note ? x.note : `${x.askedMs}ms(took ${x.tookMs}):${x.ink}ink pen=${x.probe.penAll}`)).join(" ")}`);
  else if (a.preShot) console.log(`  [${a.label}] pre-ink frame ${a.preShot} (asked ${a.askedMs} ms, taken at ${a.tookMs} ms)`);
  else if (a.note) console.log(`  [${a.label}] ${a.note}`);
  else console.log(`  [${a.label}] act ${a.actMs} ms; ink periods ${JSON.stringify(a.inkPeriods)}; max ink strokes ${a.maxInk}; after ${a.after}; boxes ${JSON.stringify(a.probe.boxes)}`);
}
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
fs.writeFileSync(path.join(OUT, `ch10-${id}-${TAG}.capture.json`), JSON.stringify({ flow, phase, Q, lang, acts, errors: res.errors }, null, 1));
process.exit((res.errors || []).length || res.problems ? 1 : 0);
