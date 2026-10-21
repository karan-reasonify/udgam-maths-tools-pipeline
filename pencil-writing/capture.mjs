#!/usr/bin/env node
/* Looks at the pencil acts of a READY pair in a real headless Chrome, with motion ON: mounts it in the host's own loader (approve's writePage), starts
 * the phase and performs every guide step with toolApi.check() (as `approve` does), and for every act:
 *   - times it from inside the page (a 8 ms logger of getState().acting and the number of written strokes on screen),
 *   - takes screenshots at 200, 400 and 600 ms after it starts (about 25, 50, 75 % of one written number) and 300 ms after it ends,
 *   - counts the written strokes (data-role="pen-ink") and the finished ones (data-role="pencil-text"), so a tool that still pops its digit is seen.
 * Writes frames to pencil-writing/out/frames/ and prints one line per act; --json writes the report too. Read-only for the pair and the work folder.
 *
 *   node pencil-writing/capture.mjs 7/M1.S2.T4.C15.2D1 [--phase 1] [--file <pair.tsx>] [--offsets 200,400,600] [--lang en] [--json] */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, pairPath, sidecarPath, read } from "./lib.mjs";

const args = process.argv.slice(2);
const val = (f, d = null) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const tool = args.find((a) => /^\d+\/[\w.]+$/.test(a));
if (!tool) { console.error("usage: node pencil-writing/capture.mjs <ch>/<slot_id> [--phase N] [--file pair.tsx] [--offsets 200,400,600] [--lang en] [--json]"); process.exit(2); }
const [ch, id] = tool.split("/"), phase = Number(val("--phase", 1)), lang = val("--lang", "en");
const offsets = String(val("--offsets", "200,400,600")).split(",").map(Number);
const file = val("--file") ? path.resolve(val("--file")) : pairPath(ch, id);

const { cdpSession } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "core", "chrome.mjs")).href);
const { writePage } = await import(pathToFileURL(path.join(HERE, "..", "class4", "lib", "check", "approve.mjs")).href);

const OUT = path.join(HERE, "out"), FR = path.join(OUT, "frames"), PG = path.join(OUT, "pages");
fs.mkdirSync(FR, { recursive: true }); fs.mkdirSync(PG, { recursive: true });
const side = JSON.parse(read(sidecarPath(ch, id)));
const page = path.join(PG, `ch${ch}-${id}.html`);
writePage(page, read(file), side);

const LOGGER = `(function () {
  window.__log = [];
  setInterval(function () {
    var a = window.toolApi && window.toolApi.getState();
    window.__log.push([performance.now(), a && a.acting ? 1 : 0, document.querySelectorAll('[data-role="pen-ink"]').length]);
  }, 8);
})()`;
const COUNTS = `({ ink: document.querySelectorAll('[data-role="pen-ink"]').length, text: document.querySelectorAll('[data-role="pencil-text"] polyline').length, acting: !!(window.toolApi && window.toolApi.getState().acting) })`;

const acts = [];
const res = await cdpSession(`${pathToFileURL(page).href}?phase=${phase}&lang=${lang}`, async (s) => {
  const st = () => s.ev("window.toolApi ? window.toolApi.getState() : null");
  if (!(await s.until("!!window.toolApi && !!document.querySelector('svg')", 30000))) return { problems: ["the pair did not mount"], errors: await s.ev("window.__hostErrors") };
  await s.wait(800);
  await s.ev(LOGGER);
  if (await s.ev(`!!document.querySelector('[data-control="start"]')`)) { await s.click('[data-control="start"]'); await s.wait(900); }
  let n = 0;
  for (let k = 0; k < 25 && ((await st()) || {}).stage === "demo"; k++) {
    const g0 = (await st()).guideStep;
    await s.ev("window.toolApi.check()");
    /* every act of this guide step: an act may follow another one at once (a chain), so look again 400 ms after each ends */
    for (let again = true; again;) {
      again = false;
      if (!(await s.until("!!window.toolApi.getState().acting", 900))) break;
      const t0 = await s.ev("performance.now()"), shots = [];
      for (const off of offsets) {
        const now = await s.ev("performance.now()");
        if (now - t0 < off) await s.wait(off - (now - t0));
        const f = path.join(FR, `ch${ch}-${id}-p${phase}-act${n + 1}-${off}ms.png`), ta = await s.ev("performance.now()");
        const c = await s.ev(COUNTS);
        await s.shot(f);
        shots.push({ file: path.relative(HERE, f), askedMs: off, tookMs: Math.round(ta - t0), ...c });
      }
      const ended = await s.until("!window.toolApi.getState().acting", 10000);
      await s.wait(300);
      const after = path.join(FR, `ch${ch}-${id}-p${phase}-act${n + 1}-after.png`);
      await s.shot(after);
      const log = await s.ev("window.__log");
      const mine = log.filter((e) => e[0] >= t0 - 30);
      const on = mine.filter((e) => e[1] === 1), startAt = on.length ? on[0][0] : null, last = on.length ? on[on.length - 1][0] : null;
      acts.push({
        n: ++n, guideStep: k + 1, ms: startAt != null && ended ? Math.round(last - startAt) : null, ended,
        strokesDrawn: Math.max(0, ...mine.map((e) => e[2])), finished: (await s.ev(COUNTS)).text, shots, after: path.relative(HERE, after),
      });
      if (await s.until("!!window.toolApi.getState().acting", 400)) again = true;
    }
    await s.until(`(() => { const q = window.toolApi.getState(); return q.stage !== 'demo' || q.guideStep !== ${JSON.stringify(g0 ?? null)}; })()`, 6000);
    await s.wait(300);
  }
  return { errors: [...((await s.ev("window.__hostErrors")) || []), ...s.logs.filter((l) => /^exception:/.test(l))], stage: ((await st()) || {}).stage };
}, { label: `capture ${id} p${phase}`, timeout: 170000, reducedMotion: false });

console.log(`capture ${tool} phase ${phase} ${lang} (${path.basename(file)}): ${acts.length} act(s); page errors: ${(res.errors || []).length}${res.problems ? " PROBLEM: " + res.problems.join("; ") : ""}`);
for (const a of acts) console.log(`  act ${a.n} (guide step ${a.guideStep}): ${a.ms == null ? "?" : a.ms} ms, ${a.strokesDrawn} written stroke(s) in the layer, ${a.finished} finished stroke(s) after; frames ${a.shots.map((x) => `${x.askedMs}ms:${x.ink}ink/${x.text}done`).join(" ")}`);
for (const e of res.errors || []) console.log("  ERROR " + String(e).slice(0, 200));
if (args.includes("--json")) fs.writeFileSync(path.join(OUT, `ch${ch}-${id}-p${phase}.capture.json`), JSON.stringify({ tool, phase, lang, acts, errors: res.errors }, null, 1));
process.exit((res.errors || []).length || res.problems ? 1 : 0);
