/* Writes out/glyphs.html: every glyph large, then sample runs at tool sizes beside the printed Poppins digit they replace. For looking, not for shipping.
   node pencil-writing/glyphsheet.mjs */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { HERE } from "./lib.mjs";

const core = fs.readFileSync(path.join(HERE, "pen-core.js"), "utf8");
const ctx = vm.createContext({ Math });
vm.runInContext(core + "\nthis.__api = { PEN_GLYPHS, penLayout, penCut, PEN_W, PEN_INK, PEN_H };", ctx);
const { PEN_GLYPHS, penLayout, penCut, PEN_W, PEN_INK } = ctx.__api;

const draw = (text, x, y, size, anchor, col = PEN_INK) => {
  const L = penLayout(text, x, y, size, anchor), sw = (size * PEN_W).toFixed(2);
  return L.chars.map((c) => c.strokes.map((st) => `<polyline points="${penCut(st, 1)}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`).join("")).join("");
};
const printed = (text, x, y, size, anchor) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Poppins, sans-serif" font-size="${size}" font-weight="700" fill="#2b2b2b">${text}</text>`;

let svg = "";
const keys = Object.keys(PEN_GLYPHS).filter((k) => !["x", "−", " "].includes(k));
keys.forEach((k, i) => {
  const x = 40 + (i % 8) * 140, y = 150 + Math.floor(i / 8) * 190;
  svg += `<line x1="${x - 10}" y1="${y}" x2="${x + 120}" y2="${y}" stroke="#d6d6d6"/><line x1="${x - 10}" y1="${y - 0.72 * 200}" x2="${x + 120}" y2="${y - 0.72 * 200}" stroke="#eee"/>`;
  svg += draw(k, x, y, 200, "start");
});
const y0 = 150 + Math.ceil(keys.length / 8) * 190 + 20;
const runs = [["1,234,567", 64], ["0123456789", 64], ["12 + 34 = 46", 56], ["÷3  ×4  6/8", 56], ["3 5 7 9", 90]];
runs.forEach(([t, s], i) => {
  const y = y0 + i * 110;
  svg += draw(t, 40, y, s, "start") + printed(t, 640, y, s, "start");
});
// centred, as the tools place a digit (text-anchor middle, baseline at centre + 0.36 size)
const cy = y0 + runs.length * 110 + 20;
svg += `<line x1="0" y1="${cy}" x2="1200" y2="${cy}" stroke="#c33" stroke-dasharray="4"/>`;
[["12", 80], ["7", 80], ["345", 80]].forEach(([t, s], i) => {
  const cx = 160 + i * 260;
  svg += `<line x1="${cx}" y1="${cy - 60}" x2="${cx}" y2="${cy + 60}" stroke="#c33" stroke-dasharray="4"/>`;
  svg += draw(t, cx, cy + s * 0.36, s, "middle") + printed(t, cx + 600 - 160 + 160, cy + s * 0.36, s, "middle").replace(`x="${cx + 600}"`, `x="${cx + 600}"`);
});
fs.mkdirSync(path.join(HERE, "out"), { recursive: true });
fs.writeFileSync(path.join(HERE, "out", "glyphs.html"), `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#fffdf7"><svg xmlns="http://www.w3.org/2000/svg" width="1240" height="${cy + 100}" viewBox="0 0 1240 ${cy + 100}">${svg}</svg>`);
console.log("wrote pencil-writing/out/glyphs.html", keys.join(" "));
