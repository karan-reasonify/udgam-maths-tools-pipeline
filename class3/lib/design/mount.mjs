/* Does the designed tool still MOUNT? The syntax check cannot see a runtime error: Gemini once moved a declaration so that `Work` threw
   "Cannot access 'a' before initialization" (a blank tool that parses and that every static check passes). So the pass mounts the rebuilt
   preview once per phase in headless Chrome and reads the page's own exceptions; a tool that does not mount, throws or draws a NaN is reverted. */
import path from "node:path";
import { pathToFileURL } from "node:url";
import { cdpSession } from "../core/chrome.mjs";
import fs from "node:fs";
import { phaseCount, fullShot } from "../build/shots.mjs";
import { decodePng } from "../core/png.mjs";

const BAD = /^exception:|NaN|Expected length|before initialization|is not defined|Cannot read properties/;

/* [] = every phase mounted clean; else one short line per failing phase */
export async function mountProblems(slotDir) {
  const id = path.basename(slotDir), file = path.join(slotDir, `${id}.preview.html`), out = [];
  for (let n = 1; n <= phaseCount(slotDir); n++) {
    try {
      const r = await cdpSession(pathToFileURL(file).href + `?phase=${n}&muted=1&shot=1`, async (s) => {
        const ok = await s.until("!!(window.toolApi && window.__tool)", 20000);
        await s.wait(700);
        return { ok, bad: s.logs.filter((l) => BAD.test(l)).slice(0, 2) };
      }, { label: `design mount ${n}`, timeout: 60000 });
      if (!r.ok) out.push(`phase ${n} did not mount${r.bad[0] ? ": " + r.bad[0].slice(0, 120) : ""}`);
      else if (r.bad.length) out.push(`phase ${n}: ${r.bad[0].slice(0, 120)}`);
    } catch (e) { out.push(`phase ${n}: ${String(e.message).slice(0, 100)}`); }
  }
  return out;
}

/* COLOUR LOST: a meaning colour that the pass took off the screen. Gemini draws a <Skin> over a piece whose colour is its own fill (a blue
   counter drawn by a shared helper), so on the start page a blue rod turns into plain grey buttons; it did in nearly every run on C25 and no
   check sees it (the layout and the text are fine). The frames the class sees first (the start page, each phase's question) are shot before
   and after the pass; a hue band that held a real area and lost most of it is named for the builder (a NOTE: one tint over the skin fixes it). */
const HUES = ["red", "orange", "yellow", "lime", "green", "teal", "cyan", "blue", "indigo", "violet", "magenta", "pink"];

/* strongly coloured pixels per 30-degree hue band, over the frame and per 100 px tile (every 2nd pixel each way); grey, cream, white and
   near-black are not counted */
const TILE = 100;
export function hueBands(img) {
  const total = new Array(HUES.length).fill(0), tiles = {};
  for (let y = 0; y < img.h; y += 2) for (let x = 0; x < img.w; x += 2) {
    const [r, g, b] = img.at(x, y), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    if (mx < 64 || d / mx < 0.35) continue;
    const k = Math.floor(((((mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4) * 60) + 15) % 360) / 30);
    const t = `${Math.floor(x / TILE)},${Math.floor(y / TILE)}`;
    total[k]++;
    (tiles[t] ||= new Array(HUES.length).fill(0))[k]++;
  }
  return { total, tiles };
}

/* -> ["blue: 1840 px gone near (900, 120)"]: a colour that faded where it was (tiles that kept under `keep` of it) AND dropped over the
   whole frame. Calibrated on C25: the builder's own tint over a skin keeps 74 % of the blue in its tiles, every Gemini skin with no tint 17-39 %. Both, because a relayout MOVES colour (one tile loses what another gains) and a lighter shade of a kept colour is not lost */
export function lostColours(before, after, { tileMin = 120, keep = 0.5, frameKeep = 0.7, min = 300 } = {}) {
  return HUES.flatMap((name, k) => {
    if (!before.total[k] || after.total[k] >= before.total[k] * frameKeep) return [];
    const gone = Object.entries(before.tiles).filter(([t, v]) => v[k] >= tileMin && ((after.tiles[t] || [])[k] || 0) < v[k] * keep);
    const px = gone.reduce((a, [, v]) => a + v[k], 0);
    if (px < min) return [];
    const [tx, ty] = gone.sort((a, b) => b[1][k] - a[1][k])[0][0].split(",").map(Number);
    return [`${name}: ${px} px gone near (${tx * TILE + TILE / 2}, ${ty * TILE + TILE / 2})`];
  });
}

/* the start page and each phase's question, shot from the slot's current preview: [{ frame, bands }] */
export function colourFrames(slotDir) {
  const frames = [{ phase: 1, state: "start" }, ...Array.from({ length: phaseCount(slotDir) }, (_, k) => ({ phase: k + 1, state: "ask" }))];
  return frames.map(({ phase, state }) => {
    const { png } = fullShot(slotDir, { phase, state });
    try { return { frame: state === "start" ? "the start page" : `phase ${phase}`, bands: hueBands(decodePng(fs.readFileSync(png))) }; }
    finally { fs.rmSync(png, { force: true }); }
  });
}
