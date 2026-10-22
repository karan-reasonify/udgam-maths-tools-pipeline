#!/usr/bin/env node
/* A capture for class 4 chapter 11 M1.S2.T4.C15.2D1 (length_columns) that reaches what pencil-writing/capture.mjs cannot: it times each WRITE by its own layer
 * (data-role="pen-writing" exists from the write's first frame to its end), so the write that follows a hand carry (Carry) or the knife (Split) is timed alone;
 * it takes frames at offsets from that layer's first frame; and it proves "no jump": every ink stroke of the write's last frames (3+ points) equals a finished
 * PencilText stroke, both mapped to SCREEN coordinates through getScreenCTM (expected shift 0, 0). It plays
 *   --flow guide   the phase's guide steps by toolApi.check() (as `approve` does)
 *   --flow box     phase 1 question 1 (ML1): a REAL click on box --box K (3 = the ones box, right; 1 = wrong), then (--then win) the right sum: the win page
 *   --flow free    the phase's questions right, the summary, Free play, then REAL clicks: Add, Carry, Add, the sign key, Break, Split, Take away
 *   node pencil-writing/call-sites/11__M1.S2.T4.C15.2D1.capture.mjs --flow guide --phase 3 [--lang en] [--offsets 200,400,600] [--tag x] */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "../lib.mjs";

const args = process.argv.slice(2);
const val = (f, d = null) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const flow = val("--flow", "guide"), phase = Number(val("--phase", flow === "box" ? 1 : flow === "free" ? 4 : 1)), lang = val("--lang", "en"), tag = val("--tag", "");
const offsets = String(val("--offsets", "200,400,600")).split(",").filter((x) => x !== "").map(Number);
const boxK = Number(val("--box", 3)), then = val("--then", "");
const ch = "11", id = "M1.S2.T4.C15.2D1";

const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);
const OUT = path.join(HERE, "out"), FR = path.join(OUT, "frames"), PG = path.join(OUT, "pages");
fs.mkdirSync(FR, { recursive: true }); fs.mkdirSync(PG, { recursive: true });
const page = path.join(PG, `ch11-${id}-cs.html`);
writePage(page, read(pairPath(ch, id)), JSON.parse(read(sidecarPath(ch, id))));

const TAG = `${flow}-p${phase}${flow === "box" ? "-box" + boxK : ""}${lang !== "en" ? "-" + lang : ""}${tag ? "-" + tag : ""}`;
const ANSWERS = { 1: [[69, 649], "058", "07"], 2: [[74, 302], [94, 31], [10, 135]], 3: [[33, 63], [0, 32], [23, 355]], 4: [[17, 5], [55, 3], [6, 3]] };
/* the page logs [t, acting, ink strokes, writing layer, finished pencil-text strokes] every 8 ms and keeps the ink strokes of the last frame that had ink, in screen px */
const LOGGER = `(function () {
  window.__scr = function (e) { var m = e.getScreenCTM(); return e.getAttribute('points').trim().split(/\\s+/).map(function (p) { var q = p.split(',').map(Number); return [m.a * q[0] + m.c * q[1] + m.e, m.b * q[0] + m.d * q[1] + m.f]; }); };
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
/* what the rows show: printed digits (Poppins <text>) inside the frame vs pencil strokes */
const PROBE = `(function () {
  var printed = Array.prototype.map.call(document.querySelectorAll('svg text'), function (t) { return t.textContent; }).filter(function (s) { return /^[0-9,]+$/.test(s); });
  return { pencilTexts: document.querySelectorAll('[data-role="pencil-text"]').length, pencilStrokes: document.querySelectorAll('[data-role="pencil-text"] polyline').length, printedDigits: printed.join(' ') };
})()`;
const acts = [];

const res = await cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=${lang}`, async (s) => {
  const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
  /* every write until nothing acts for ~600 ms: frames at offsets from the layer's first frame, then the strokes of its last frames vs the finished text */
  async function watch(label, maxMs = 20000) {
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
          const f = path.join(FR, `ch11-${id}-${TAG}-${label}-w${w}-${off}ms.png`), ta = await s.ev("performance.now()");
          const c = await s.ev(`[document.querySelectorAll('[data-role="pen-ink"]').length, document.querySelectorAll('[data-role="pencil-text"] polyline').length]`);
          await s.shot(f);
          shots.push({ file: path.basename(f), askedMs: off, tookMs: Math.round(ta - tw), ink: c[0], done: c[1] });
        }
        await s.until(`!document.querySelector('[data-role="pen-writing"]')`, 8000);
        await s.wait(60);
        const f = path.join(FR, `ch11-${id}-${TAG}-${label}-w${w}-after.png`);
        await s.shot(f);
        const lastInk = await s.ev("window.__lastInk"), textPts = await s.ev(TEXT_PTS);
        const near = (A, B) => A.length === B.length && A.every((q, i) => Math.abs(q[0] - B[i][0]) < 0.6 && Math.abs(q[1] - B[i][1]) < 0.6);
        const long = lastInk.filter((A) => A.length >= 3);
        const matched = long.filter((A) => textPts.some((B) => near(A, B))).length;
        acts.push({ label, write: w, shots, after: path.basename(f), inkStrokes: lastInk.length, longStrokes: long.length, matched, textStrokes: textPts.length });
      } else if (!r[1]) { quiet++; if (quiet > 30) break; } else quiet = 0;
      if (r[2] > tEnd) break;
      await s.wait(15);
    }
    const log = (await s.ev("window.__log")).filter((e) => e[0] >= t00 - 20);
    const periods = [];
    let a = null, firstInk = null;
    for (const e of log) {
      if (e[3] && a == null) { a = e[0]; firstInk = null; }
      if (e[3] && firstInk == null && e[2] > 0) firstInk = e[0];
      if (!e[3] && a != null) { periods.push({ ms: Math.round(e[0] - a), inkStartsAt: firstInk == null ? null : Math.round(firstInk - a), inkInFirst100: log.filter((x) => x[0] >= a && x[0] < a + 100 && x[2] > 0).length }); a = null; }
    }
    const on = log.filter((e) => e[1] === 1);
    acts.push({ label, periods, chainMs: on.length ? Math.round(on[on.length - 1][0] - on[0][0]) : null, probe: await s.ev(PROBE) });
  }
  async function rightAnswer() {
    const a = await st(), before = a.score, it = a.item, v = ANSWERS[phase][Number(it) - 1];
    let ok = await s.ev(`window.toolApi.answer(${JSON.stringify(v)})`);
    if (!ok && Array.isArray(v)) ok = await s.ev(`window.toolApi.answer(${JSON.stringify(v.join("|"))})`);
    await s.wait(80); await s.ev("window.toolApi.check()");
    await s.until(`window.toolApi.getState().score > ${Number(before) || 0}`, 8000);
    await s.wait(1200);
    if (await s.until(`!!document.querySelector('[data-control="next-key"]')`, 9000)) await s.click('[data-control="next-key"]');
    await s.until(`window.toolApi.getState().stage !== 'ask' || window.toolApi.getState().item !== ${JSON.stringify(it)}`, 9000);
    await s.wait(900);
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
  const errs = async () => [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))];
  if (flow === "guide") return { errors: await errs(), stage: ((await st()) || {}).stage };
  if (!(await s.until("window.toolApi.getState().stage === 'ask'", 45000))) return { problems: ["never reached a question"], errors: await errs() };
  await s.wait(1200);
  if (flow === "box") {
    if (!(await s.until(`!!document.querySelector('[data-control="box-${boxK}"]')`, 8000))) return { problems: ["no box-" + boxK], errors: await errs() };
    await s.click(`[data-control="box-${boxK}"]`);
    await watch("box" + boxK);
    if (then === "win") {
      await s.wait(500);
      const v = ANSWERS[1][0];
      let ok = await s.ev(`window.toolApi.answer(${JSON.stringify(v)})`);
      if (!ok) ok = await s.ev(`window.toolApi.answer(${JSON.stringify(v.join("|"))})`);
      await s.wait(80); await s.ev("window.toolApi.check()");
      await s.until(`window.toolApi.getState().stage === 'win'`, 8000);
      await s.wait(1500);
      const f = path.join(FR, `ch11-${id}-${TAG}-win.png`);
      await s.shot(f);
      acts.push({ label: "win", note: `win page ${path.basename(f)} answered ${ok}`, stage: (await st()).stage, probe: await s.ev(PROBE) });
    }
  } else if (flow === "free") {
    for (let g = 0; g < 10 && ((await st()) || {}).stage !== "summary"; g++) {
      const a = await st();
      if (a.stage === "ask") await rightAnswer(); else await s.wait(600);
    }
    if (!(await s.until(`!!document.querySelector('[data-control="free-play"]')`, 30000))) return { problems: ["no free-play key"], errors: await errs(), stage: (await st()).stage };
    await s.click('[data-control="free-play"]');
    await s.wait(1500);
    for (const key of ["add-small", "carry", "add-big", "sign", "break", "split", "take"]) {
      if (!(await s.until(`!!document.querySelector('[data-control="${key}"]')`, 6000))) { acts.push({ label: key, note: "no key " + key }); break; }
      await s.click(`[data-control="${key}"]`);
      if (key === "sign") { await s.wait(900); continue; }
      await watch("free-" + key);
      await s.wait(500);
    }
  }
  return { errors: await errs(), stage: ((await st()) || {}).stage };
}, { label: `capture ch11 ${id} ${TAG}`, timeout: 300000, reducedMotion: false });

console.log(`capture ch11 ${flow} phase ${phase} ${lang}: page errors: ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""} (stage ${res.stage})`);
for (const a of acts) {
  if (a.write) console.log(`  [${a.label}] write ${a.write}: frames ${a.shots.map((x) => (x.note ? x.note : `${x.askedMs}ms(took ${x.tookMs}):${x.ink}ink/${x.done}done`)).join(" ")}; last ink ${a.inkStrokes} stroke(s), ${a.longStrokes} of 3+ points, ${a.matched} equal a finished stroke on screen (of ${a.textStrokes}); ${a.after}`);
  else if (a.periods) console.log(`  [${a.label}] writes ${a.periods.length}: ${a.periods.map((p) => `${p.ms} ms (first ink ${p.inkStartsAt} ms in, ink in the first 100 ms: ${p.inkInFirst100})`).join("; ")}; chain ${a.chainMs} ms; pencil texts ${a.probe.pencilTexts} (${a.probe.pencilStrokes} strokes), printed digits: ${a.probe.printedDigits}`);
  else if (a.note) console.log(`  [${a.label}] ${a.note}${a.stage ? " (stage " + a.stage + ")" : ""}${a.probe ? `; pencil texts ${a.probe.pencilTexts} (${a.probe.pencilStrokes} strokes), printed digits: ${a.probe.printedDigits}` : ""}`);
}
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
fs.writeFileSync(path.join(OUT, `ch11-${id}-${TAG}.capture2.json`), JSON.stringify({ flow, phase, lang, acts, errors: res.errors }, null, 1));
process.exit((res.errors || []).length || res.problems ? 1 : 0);
