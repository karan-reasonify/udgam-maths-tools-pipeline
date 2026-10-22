#!/usr/bin/env node
/* capture for class 4 chapter 11 M1.S1.T2.C5.2D1 (ruler_bench): proves the phase 4 Guess act (the pencil writes "15" on the guess card) is the same drawing before
 * and after the act. The stock `capture.mjs` already reaches the act (guide step 2 of phase 4) and takes the frames; this adds the one thing it cannot: a point-for-point
 * comparison of the act layer's last ink with the finished <PencilText> strokes (screen rectangles, so the layer's stage frame and the card's translate(ox, 0) both count),
 * and where the printed unit ("cm", "सेमी", "સેમી") ends against the card's right edge.
 *   node pencil-writing/call-sites/11__M1.S1.T2.C5.2D1.capture.mjs [--lang en|hi|gu] */
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "../lib.mjs";

const args = process.argv.slice(2);
const lang = args.includes("--lang") ? args[args.indexOf("--lang") + 1] : "en";
const ID = "M1.S1.T2.C5.2D1", file = pairPath("11", ID);
const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);
const PG = path.join(HERE, "out", "pages");
const page = path.join(PG, `ch11-${ID}-guess-${lang}.html`);
writePage(page, read(file), JSON.parse(read(sidecarPath("11", ID))));

const SAMPLER = `(function () {
  window.__s = [];
  setInterval(function () {
    var a = window.toolApi && window.toolApi.getState();
    var ink = [].slice.call(document.querySelectorAll('[data-role="pen-ink"]')).map(function (e) { var r = e.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; });
    window.__s.push({ t: performance.now(), acting: a && a.acting ? 1 : 0, ink: ink });
  }, 6);
})()`;
const FINISHED = `[].slice.call(document.querySelectorAll('[data-role="pencil-text"] polyline')).map(function (e) { var r = e.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; })`;
const UNIT = `(function () {
  var card = [].slice.call(document.querySelectorAll('rect')).filter(function (r) { return r.getAttribute('width') === '280' && r.getAttribute('rx') === '18'; })[0];
  var pt = document.querySelector('[data-role="pencil-text"]');
  var txt = [].slice.call(card ? card.parentNode.querySelectorAll('text') : []).map(function (t) { var r = t.getBoundingClientRect(); return { s: t.textContent, l: r.left, r: r.right, t: r.top, b: r.bottom }; });
  var c = card && card.getBoundingClientRect(), p = pt && pt.getBoundingClientRect();
  return { card: c && [c.left, c.top, c.right, c.bottom], pencil: p && [p.left, p.top, p.right, p.bottom], texts: txt };
})()`;

let out = null;
const res = await cdpSession(`${pathToFileURL(page).href}?phase=4&lang=${lang}`, async (s) => {
  const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
  if (!(await s.until("!!window.toolApi && !!document.querySelector('svg')", 30000))) return { problems: ["the pair did not mount"] };
  await s.wait(800);
  await s.ev(SAMPLER);
  if (await s.ev(`!!document.querySelector('[data-control="start"]')`)) { await s.click('[data-control="start"]'); await s.wait(900); }
  let wrote = false;
  for (let k = 0; k < 6 && !wrote && ((await st()) || {}).stage === "demo"; k++) {
    const g0 = (await st()).guideStep;
    await s.ev("window.toolApi.check()");
    if (!(await s.until("!!window.toolApi.getState().acting", 1500))) { await s.until(`(() => { const q = window.toolApi.getState(); return q.stage !== 'demo' || q.guideStep !== ${JSON.stringify(g0 ?? null)}; })()`, 6000); await s.wait(300); continue; }
    const t0 = await s.ev("performance.now()");
    if (!(await s.until("!window.toolApi.getState().acting", 6000))) return { problems: ["the act did not end"] };
    await s.wait(120);
    const sm = await s.ev("window.__s");
    const mine = sm.filter((e) => e.t >= t0 - 30), acting = mine.filter((e) => e.acting);
    /* the layer's last sample that still has all its ink (ink stays for the act's closing 150 ms) */
    const full = [...acting].reverse().find((e) => e.ink.length > 0);
    const fin = await s.ev(FINISHED);
    if (!full || !fin.length) continue; // an act with no written ink (a ruler slide): look at the next guide step
    wrote = true;
    const n = Math.min(full.ink.length, fin.length);
    let worst = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < 4; j++) worst = Math.max(worst, Math.abs(full.ink[i][j] - fin[i][j]));
    out = { actMs: Math.round(acting[acting.length - 1].t - acting[0].t), inkStrokes: full.ink.length, finishedStrokes: fin.length, worstRectDiffPx: Math.round(worst * 100) / 100, ...(await s.ev(UNIT)) };
  }
  return { errors: [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))] };
}, { label: `capture ${ID} guess ${lang}`, timeout: 120000, reducedMotion: false });

console.log(`guess capture ${lang}: page errors ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""}`);
if (out) {
  console.log(`  act ${out.actMs} ms; layer ink strokes ${out.inkStrokes}, finished strokes ${out.finishedStrokes}; worst rectangle difference ink-vs-finished ${out.worstRectDiffPx} px`);
  const r = (a) => a && a.map((v) => Math.round(v)).join(",");
  console.log(`  card ${r(out.card)}; pencil digits ${r(out.pencil)}; printed texts in the card: ${out.texts.map((t) => `"${t.s}" x ${Math.round(t.l)}..${Math.round(t.r)}`).join(" | ")}`);
  const unit = out.texts.find((t) => t.s && t.l > out.pencil[2] - 2 && t.r - t.l > 20);
  console.log(`  unit ${unit ? `${unit.s}: gap after the digits ${Math.round(unit.l - out.pencil[2])} px, right edge ${Math.round(unit.r)} vs card right ${Math.round(out.card[2])}: ${unit.r <= out.card[2] - 4 ? "inside" : "OUTSIDE"}` : "not found"}`);
} else console.log("  no written act found");
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
process.exit((res.errors || []).length || res.problems || !out ? 1 : 0);
