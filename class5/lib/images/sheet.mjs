/* <slot>/images-preview.png: one look at a slot's skins the way a tool will use them.
 *
 * Per skin, one band: the raw picture with the crop drawn on it; the skin as shipped (on a checkerboard, so its
 * alpha shows, and on white); then the skin under the tool's own geometry:
 *   tile   the one piece drawn ten times in a row with gaps, each stretched to 96x84, once plain and once with
 *          three pieces tinted deep blue and two green at 0.72 (the tint follows the piece's own alpha);
 *   disc   clipped to a circle 260 across and cut into ten equal sectors, three tinted blue and two green;
 *   strip  drawn 900x60 with slice, ten equal parts, three blue and two green;
 * and three swatches (the skin's mean colour, under the blue tint, under the green tint) with the luminance
 * contrast between them, since a shaded part must stand apart from a plain one. The geometry is the sheet's own.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { fromRoot } from "../core/env.mjs";
import { screenshot } from "../core/chrome.mjs";

export const TINT = { blue: "#0072B2", green: "#009E73", alpha: 0.72, ink: "#2B2B2B" };
const PIECE = { w: 96, h: 84, gap: 10 };

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lin = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const mix = (a, b, t) => a.map((v, i) => Math.round(v * (1 - t) + b[i] * t));
const rgb = (c) => `rgb(${c.join(",")})`;
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

export function tintNumbers(mean) {
  const blue = mix(mean, hex(TINT.blue), TINT.alpha), green = mix(mean, hex(TINT.green), TINT.alpha);
  return { blue, green, cBlue: +contrast(mean, blue).toFixed(2), cGreen: +contrast(mean, green).toFixed(2) };
}

const BAND = { tile: 540, disc: 350, strip: 330, figure: 330 };
const tintFor = (k) => (k < 3 ? "tb" : k < 5 ? "tg" : null);

/* the keypad theme band: a mini answer panel (answer box, 3x4 keys: 1-9, rub out, 0, Enter), an Answer key, the
   slot's skins beside it, and the validator's numbers, so the theme is judged with the picture it follows */
function themeBand(y0, theme, from, numbers, rows) {
  const p = [], T = theme;
  const grad = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  p.push(`<defs>${grad("gTkey", T.key[0], T.key[1])}${grad("gTenter", T.enter[0], T.enter[1])}${grad("gTsoft", T.soft[0], T.soft[1])}${grad("gTpanel", T.panel[0], T.panel[1])}</defs>`);
  p.push(`<line x1="0" y1="${y0}" x2="1600" y2="${y0}" stroke="#ddd"/>`);
  p.push(`<text x="20" y="${y0 + 26}" class="h">keypad theme · ${esc(from || "")}</text>`);
  const key = (x, y, w, h, tone, inner) => {
    const t = T[tone];
    p.push(`<rect x="${x}" y="${y + 6}" width="${w}" height="${h}" rx="12" fill="${t[2]}"/>`);
    p.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="url(#gT${tone})" stroke="${t[2]}" stroke-width="2"/>`);
    p.push(`<path d="M ${x + 12} ${y + 3} H ${x + w - 12}" stroke="#FFFFFF" stroke-opacity="0.42" stroke-width="3" stroke-linecap="round"/>`);
    p.push(inner(x + w / 2, y + h / 2, t[3]));
  };
  const txt = (s, size = 32) => (cx, cy, ink) => `<text x="${cx}" y="${cy + size * 0.35}" text-anchor="middle" font-size="${size}" font-weight="700" style="fill:${ink}">${esc(s)}</text>`;  /* style, not fill=: the sheet's CSS text rule beats an attribute */
  const rubOut = (cx, cy, ink) => `<path d="M ${cx - 22} ${cy} L ${cx - 10} ${cy - 13} H ${cx + 20} V ${cy + 13} H ${cx - 10} Z" fill="none" stroke="${ink}" stroke-width="3.5" stroke-linejoin="round"/><path d="M ${cx - 2} ${cy - 6} l 12 12 M ${cx + 10} ${cy - 6} l -12 12" stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/>`;
  const enterIcon = (cx, cy, ink) => `<path d="M ${cx + 16} ${cy - 14} V ${cy + 4} H ${cx - 16} M ${cx - 6} ${cy - 6} L ${cx - 16} ${cy + 4} L ${cx - 6} ${cy + 14}" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  /* the answer panel */
  const px = 20, py = y0 + 40;
  p.push(`<rect x="${px}" y="${py}" width="420" height="376" rx="18" fill="url(#gTpanel)" stroke="${T.slot}" stroke-width="2"/>`);
  p.push(`<rect x="${px + 20}" y="${py + 16}" width="380" height="64" rx="12" fill="#FFFFFF" stroke="${T.slot}" stroke-width="4"/>`);
  p.push(`<text x="${px + 210}" y="${py + 62}" text-anchor="middle" font-size="40" font-weight="700" fill="#2B2B2B">0.1</text>`);
  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "rub", "0", "enter"];
  labels.forEach((l, i) => {
    const x = px + 20 + (i % 3) * 128, y = py + 100 + Math.floor(i / 3) * 66;
    if (l === "rub") key(x, y, 116, 54, "soft", rubOut);
    else if (l === "enter") key(x, y, 116, 54, "enter", enterIcon);
    else key(x, y, 116, 54, "key", txt(l));
  });
  /* the Answer key and a Close key, as the answer panel uses them */
  key(480, py + 16, 230, 72, "enter", txt("Answer", 34));
  key(730, py + 16, 160, 72, "soft", txt("Close", 30));
  p.push(`<text x="480" y="${py + 116}" class="s">enter tone: Enter, Answer, Start · soft tone: rub out, Close, point</text>`);
  /* the skins beside it */
  const tile = rows.find((r) => r.kind === "tile"), disc = rows.find((r) => r.kind === "disc");
  if (tile) for (let k = 0; k < 5; k++) p.push(`<image href="${tile.uri}" x="${480 + k * 106}" y="${py + 150}" width="96" height="84" preserveAspectRatio="none"/>`);
  if (disc) p.push(`<image href="${disc.uri}" x="${1040}" y="${py + 130}" width="200" height="200"/>`);
  p.push(`<text x="480" y="${py + 262}" class="s">the theme with the picture it follows</text>`);
  /* the validator's numbers */
  const n = numbers || {}, sx = 1290;
  [`key ink ${n.keyInk}:1`, `enter ink ${n.enterInk}:1`, `soft ink ${n.softInk}:1`, `keys vs panel ${n.keyVsPanel}:1`, `saturation key ${n.keySat} · enter ${n.enterSat}`,
    `enter vs key hue ${n.enterGap} deg`, `panel luminance ${n.panelLum}`, `box edge on white ${n.slotVsWhite}:1`,
    `no-red rule: ${n.red ? n.red + " colour(s) read as red" : "clear"}`]
    .forEach((s, j) => p.push(`<text x="${sx}" y="${py + 24 + j * 26}" class="s">${esc(s)}</text>`));
  return p.join("\n");
}

/* rows: [{ key, object, kind, uri (skin), w, h, q, uriBytes, model, rawFile, rawMime, crop, src, stats }] */
export function contactSheet(dir, rows, { title = "", theme = null, themeFrom = "", themeNumbers = null } = {}) {
  const W = 1600;
  let y0 = 70, body = "";
  rows.forEach((r, i) => {
    const parts = [];
    if (i) parts.push(`<line x1="0" y1="${y0}" x2="${W}" y2="${y0}" stroke="#ddd"/>`);
    parts.push(`<text x="20" y="${y0 + 26}" class="h">${esc(r.key)} · ${esc(r.object)} · ${esc(r.kind)}${r.look ? ` · ${esc(r.look)}` : ""} · ${r.w}x${r.h} · ${(r.uriBytes / 1024).toFixed(1)} KB (q ${r.q}) · ${esc(r.model || "")}</text>`);
    /* the raw picture, scaled into 360x220, with the crop drawn on it */
    if (r.rawFile && fs.existsSync(r.rawFile) && r.src) {
      const s = Math.min(360 / r.src.w, 220 / r.src.h), rw = r.src.w * s, rh = r.src.h * s;
      const raw = `data:${r.rawMime || "image/png"};base64,${fs.readFileSync(r.rawFile).toString("base64")}`;
      parts.push(`<image href="${raw}" x="20" y="${y0 + 40}" width="${rw}" height="${rh}"/>`);
      parts.push(`<rect x="20" y="${y0 + 40}" width="${rw}" height="${rh}" fill="none" stroke="#999"/>`);
      if (r.crop) parts.push(`<rect x="${20 + r.crop.x * s}" y="${y0 + 40 + r.crop.y * s}" width="${r.crop.w * s}" height="${r.crop.h * s}" fill="none" stroke="#D55E00" stroke-width="2" stroke-dasharray="6 4"/>`);
      parts.push(`<text x="20" y="${y0 + 280}" class="s">raw ${r.src.w}x${r.src.h} · dashed = the crop</text>`);
    }
    /* the skin as shipped: on a checkerboard (alpha shows) and on white */
    const ss = Math.min(1, 520 / r.w, 200 / r.h), sw = r.w * ss, sh = r.h * ss;
    const two = r.kind !== "strip";
    parts.push(`<rect x="400" y="${y0 + 40}" width="${sw}" height="${sh}" fill="url(#chk)"/><image href="${r.uri}" x="400" y="${y0 + 40}" width="${sw}" height="${sh}"/>`);
    if (two) parts.push(`<image href="${r.uri}" x="${420 + sw}" y="${y0 + 40}" width="${sw}" height="${sh}"/>`);
    parts.push(`<text x="400" y="${y0 + 40 + sh + 22}" class="s">as shipped${two ? ", on a checkerboard and on white" : ""}${ss < 1 ? ` (at ${Math.round(ss * 100)}%)` : ""}</text>`);
    const id = `c${i}`;
    if (r.kind === "tile") {
      /* the one piece, ten times, each stretched to its piece rectangle: once plain, once tinted */
      [["plain", y0 + 300], ["tint", y0 + 420]].forEach(([mode, y]) => {
        for (let k = 0; k < 10; k++) {
          const x = 20 + k * (PIECE.w + PIECE.gap), f = mode === "tint" ? tintFor(k) : null;
          parts.push(`<image href="${r.uri}" x="${x}" y="${y}" width="${PIECE.w}" height="${PIECE.h}" preserveAspectRatio="none"${f ? ` filter="url(#${f})"` : ""}/>`);
        }
        parts.push(`<text x="20" y="${y + PIECE.h + 22}" class="s">${mode === "plain" ? `the one piece drawn ten times, each stretched to ${PIECE.w}x${PIECE.h}, gap ${PIECE.gap}` : `3 blue, 2 green at ${TINT.alpha}, the tint following the piece's alpha`}</text>`);
      });
    } else if (r.kind === "figure") {
      /* the person at its own aspect on white, cream and pale blue: a white fringe or a cut limb shows on the tinted ones */
      [["#FFFFFF", 0], ["#FFF1D6", 1], ["#DCEBFA", 2]].forEach(([bg, k]) => {
        const x = 760 + k * (r.w + 40);
        parts.push(`<rect x="${x - 10}" y="${y0 + 40}" width="${r.w + 20}" height="${r.h + 20}" fill="${bg}" stroke="#ccc"/><image href="${r.uri}" x="${x}" y="${y0 + 50}" width="${r.w}" height="${r.h}"/>`);
      });
      parts.push(`<text x="760" y="${y0 + r.h + 90}" class="s">the figure at shipped size on white, cream and pale blue (no fringe, nothing cut off)</text>`);
    } else if (r.kind === "disc") {
      const cx = 1060, cy = y0 + 175, R = 130, n = 10;
      const pt = (k) => [cx + R * Math.sin((2 * Math.PI * k) / n), cy - R * Math.cos((2 * Math.PI * k) / n)];
      parts.push(`<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>`);
      parts.push(`<image href="${r.uri}" x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>`);
      for (let k = 0; k < n; k++) {
        const [x1, y1] = pt(k), [x2, y2] = pt(k + 1), f = k < 3 ? TINT.blue : k < 5 ? TINT.green : null;
        if (f) parts.push(`<path d="M${cx},${cy} L${x1},${y1} A${R},${R} 0 0 1 ${x2},${y2} Z" fill="${f}" opacity="${TINT.alpha}"/>`);
        parts.push(`<line x1="${cx}" y1="${cy}" x2="${x1}" y2="${y1}" stroke="${TINT.ink}" stroke-width="3"/>`);
      }
      parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${TINT.ink}" stroke-width="3"/>`);
      parts.push(`<text x="${cx - R - 40}" y="${cy + R + 28}" class="s">clipped to a circle 260 across, ten equal sectors</text>`);
    } else {
      const x = 400, y = y0 + 200, w = 900, h = 60, n = 10;
      parts.push(`<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/></clipPath>`);
      parts.push(`<image href="${r.uri}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>`);
      for (let k = 0; k < n; k++) {
        const f = k < 3 ? TINT.blue : k < 5 ? TINT.green : null;
        if (f) parts.push(`<rect x="${x + (k * w) / n}" y="${y}" width="${w / n}" height="${h}" fill="${f}" opacity="${TINT.alpha}" clip-path="url(#${id})"/>`);
        if (k) parts.push(`<line x1="${x + (k * w) / n}" y1="${y}" x2="${x + (k * w) / n}" y2="${y + h}" stroke="${TINT.ink}" stroke-width="3"/>`);
      }
      parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="${TINT.ink}" stroke-width="4"/>`);
      parts.push(`<text x="${x}" y="${y + h + 26}" class="s">drawn 900x60 with slice, ten equal parts: 3 blue, 2 green at ${TINT.alpha}</text>`);
    }
    /* swatches and contrast */
    if (r.stats && r.stats.mean) {
      const t = tintNumbers(r.stats.mean), sx = 1330, sy = y0 + 40;
      [[r.stats.mean, "skin (mean)"], [t.blue, `blue ${t.cBlue}:1`], [t.green, `green ${t.cGreen}:1`]].forEach(([c, label], j) => {
        parts.push(`<rect x="${sx}" y="${sy + j * 62}" width="60" height="50" rx="6" fill="${rgb(c)}" stroke="#888"/>`);
        parts.push(`<text x="${sx + 70}" y="${sy + j * 62 + 32}" class="s">${esc(label)}</text>`);
      });
      const st = r.stats;
      parts.push(`<text x="${sx}" y="${sy + 210}" class="s">sd ${st.lumStd} · white ${(st.nearWhite * 100).toFixed(1)}%</text>`);
      parts.push(`<text x="${sx}" y="${sy + 234}" class="s">cool ${(st.cool * 100).toFixed(1)}%${st.opaque !== undefined ? ` · opaque ${Math.round(st.opaque * 100)}%` : ""}</text>`);
      if (st.halo !== undefined) parts.push(`<text x="${sx}" y="${sy + 258}" class="s">white fringe ${(st.halo * 100).toFixed(0)}%</text>`);
    }
    body += parts.join("\n");
    y0 += BAND[r.kind] || 340;
  });
  if (theme) { body += themeBand(y0, theme, themeFrom, themeNumbers, rows); y0 += 440; }
  const H = y0 + 10;
  const filt = (idf, col) => `<filter id="${idf}" color-interpolation-filters="sRGB"><feFlood flood-color="${col}" flood-opacity="${TINT.alpha}"/><feComposite in2="SourceAlpha" operator="in" result="t"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="t"/></feMerge></filter>`;
  const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff}text{font-family:Segoe UI,Arial,sans-serif;fill:#2B2B2B}.h{font-size:20px;font-weight:600}.s{font-size:15px}.t{font-size:24px;font-weight:700}</style>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><pattern id="chk" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff"/><rect width="8" height="8" fill="#d8d8d8"/><rect x="8" y="8" width="8" height="8" fill="#d8d8d8"/></pattern>
${filt("tb", TINT.blue)}${filt("tg", TINT.green)}</defs>
<rect width="${W}" height="${H}" fill="#FFFFFF"/>
<text x="20" y="44" class="t">${esc(title)} · skins (the picture never carries the maths: cuts, tint and labels are the tool's)</text>
${body}
</svg>`;
  const tmp = fromRoot(".build");
  fs.mkdirSync(tmp, { recursive: true });
  const page = path.join(tmp, `skin-sheet-${process.pid}.html`);
  fs.writeFileSync(page, html);
  const png = path.join(dir, "images-preview.png");
  try { screenshot(pathToFileURL(page).href, png, { width: W, height: H, budget: 3000, label: "images sheet" }); }
  finally { fs.rmSync(page, { force: true }); }
  return { png, bytes: fs.statSync(png).size, width: W, height: H };
}
