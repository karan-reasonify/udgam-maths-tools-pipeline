/* One contact sheet per review: every phase of the preview in one PNG (reduced motion,
 * muted, drive state applied through window.__tool). One image to look at instead of
 * eight, and it is the same file every time, so reviews stay cheap.
 *   sheet-<state>.png     all phases, 800x450 cells, two across
 *   phase-<n>-<state>.png one full 1600x900 frame (--full --phase n)
 *   phase-<n>-party.png   --state party (runtime r40): the party, 0.9 s after the right answer of the phase's last question, motion ON
 * These are overviews at half scale (and the party). The FULL-SIZE frames a review judges come from `shots --pack`
 * (lib/build/pack.mjs, docs/REVIEW_PACK.md), which reuses partyShots below for its party frames.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { screenshot, cdpSession } from "../core/chrome.mjs";
import { idOf } from "../core/work.mjs";

export const STATES = ["mount", "ask", "wrong", "solve", "idle", "free", "again", "start", "party"];   /* start: a tool's start page (runtime r28+) */   /* free and again: the last phase's summary page, then Free play or Play again */
/* party (runtime r39): not a sheet; partyShots draws phase 1 and the last phase, each about 0.9 s into its party */

/* lang (hi | gu): the host's language prop, and a "-hi" / "-gu" suffix on the PNG */
/* panel "open": a board tool's answer panel is open on every question (?answer=open); the default shows it shut, the
   way a question first appears */
const query = (n, state, lang = "", panel = "") => `?phase=${n}&muted=1&shot=1${state === "mount" ? "" : state === "start" ? "&startpage=1" : "&drive=" + state}${lang ? "&lang=" + lang : ""}${panel === "open" ? "&answer=open" : ""}`;
const suffix = (lang, panel = "") => (lang ? "-" + lang : "") + (panel === "open" ? "-open" : "");

export function phaseCount(dir) {
  const src = fs.readFileSync(path.join(dir, "tool.tsx"), "utf8");
  return Math.max(1, [...src.matchAll(/^\s*concept:\s*"/gm)].length);
}

export function contactSheet(dir, { state = "ask", phases, lang = "", panel = "" } = {}) {
  const id = idOf(dir);
  const preview = `${id}.preview.html`;
  if (!fs.existsSync(path.join(dir, preview))) throw new Error("no preview yet; run preview first");
  const N = phases || phaseCount(dir);
  const cols = N === 1 ? 1 : 2, rows = Math.ceil(N / cols);
  const cellW = 800, cellH = 450, labelH = 34, gap = 10;
  const width = cols * cellW + (cols + 1) * gap, height = rows * (cellH + labelH) + (rows + 1) * gap;
  const cells = Array.from({ length: N }, (_, k) => {
    const n = k + 1, x = gap + (k % cols) * (cellW + gap), y = gap + Math.floor(k / cols) * (cellH + labelH + gap);
    return `<div class="cell" style="left:${x}px;top:${y}px"><div class="lab">phase ${n} · ${state}${lang ? " · " + lang : ""}${panel === "open" ? " · panel open" : ""}</div>` +
      `<div class="win"><iframe src="../${preview}${query(n, state, lang, panel)}" width="1600" height="900" scrolling="no"></iframe></div></div>`;
  }).join("");
  /* the sheet page lives in .build/, so each iframe reaches the preview one level up */
  const sheetHtml = path.join(dir, ".build", `sheet-${state}${suffix(lang, panel)}.html`);
  fs.mkdirSync(path.dirname(sheetHtml), { recursive: true });
  fs.writeFileSync(sheetHtml, `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;background:#cfc8ba;width:${width}px;height:${height}px;overflow:hidden;font:600 18px/1 system-ui,sans-serif}
.cell{position:absolute;width:${cellW}px}.lab{height:${labelH}px;line-height:${labelH}px;color:#333;padding-left:4px}
.win{width:${cellW}px;height:${cellH}px;overflow:hidden;border-radius:6px;background:#fff}
iframe{border:0;transform:scale(.5);transform-origin:0 0;display:block}
</style></head><body>${cells}</body></html>`);
  const png = path.join(dir, `sheet-${state}${suffix(lang, panel)}.png`);
  const bytes = screenshot(pathToFileURL(sheetHtml).href, png, { width, height, budget: (state === "mount" || state === "start") ? 2500 : ["idle", "free", "again"].includes(state) ? 200000 : 40000, label: `sheet ${state}` });
  return { png, bytes, width, height, phases: N };
}

export function fullShot(dir, { phase = 1, state = "ask", lang = "", panel = "" } = {}) {
  const id = idOf(dir);
  const file = path.join(dir, `${id}.preview.html`);
  if (!fs.existsSync(file)) throw new Error("no preview yet; run preview first");
  const png = path.join(dir, `phase-${phase}-${state}${suffix(lang, panel)}.png`);
  const bytes = screenshot(pathToFileURL(file).href + query(phase, state, lang, panel), png, { width: 1600, height: 900, budget: (state === "mount" || state === "start") ? 2500 : ["idle", "free", "again"].includes(state) ? 200000 : 40000, label: `phase ${phase} ${state}` });
  return { png, bytes };
}

/* THE PHASE PARTY (runtime r40: it starts at the right answer of a phase's last question), for the visual reviewer: the
   party is skipped under reduced motion, which every other shot forces, so these frames come from a DevTools session
   with motion ON. For phase 1 and for the last phase (its bigger burst, over the win picture): straight to the phase's
   third question, answered right, then a frame about 0.9 s after that answer, while the confetti is in the air.
   phase-<n>-party[-hi|-gu].png
   outFile (n) -> path: where a frame goes instead (the review pack, lib/build/pack.mjs: pack/p<n>-party-<lang>.png) */
export async function partyShots(dir, { phases, lang = "", outFile } = {}) {
  const id = idOf(dir);
  const file = path.join(dir, `${id}.preview.html`);
  if (!fs.existsSync(file)) throw new Error("no preview yet; run preview first");
  const N = phases || phaseCount(dir);
  const out = [];
  for (const n of [...new Set([1, N])]) {
    const png = outFile ? outFile(n) : path.join(dir, `phase-${n}-party${suffix(lang)}.png`);
    const r = await cdpSession(pathToFileURL(file).href + `?phase=${n}&muted=1&shot=1${lang ? "&lang=" + lang : ""}`, async (s) => {
      if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
      await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 25000);
      const g = await s.ev("(() => { const a = window.toolApi.getState(); return { step: a.step, item: a.item, items: a.items }; })()");
      await s.ev(`window.toolApi.gotoStep(${g.step - (g.item - 1) + (g.items - 1)})`);
      await s.until("window.toolApi.getState().stage === 'ask'", 8000);
      await s.wait(300);
      await s.ev("window.__tool.solve()");
      await s.wait(900);
      await s.shot(png);
      const seen = await s.ev(`!!document.querySelector('[data-zone="party"]')`);
      return { seen };
    }, { label: `party ${n}`, timeout: 60000, reducedMotion: false });
    out.push({ n, png, seen: !!(r && r.seen), error: r && r.error });
  }
  return out;
}
