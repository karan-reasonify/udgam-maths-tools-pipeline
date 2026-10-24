/* The keypad THEME that follows a slot's picture (runtime r31 reads `tool.THEME`, else the `TOOL_THEME` emitted into
 * images.tsx, else nothing: the chrome's own pale keys).
 *
 *   { key: [top, bottom, edge, ink], enter: [...], soft: [...], panel: [top, bottom], slot: edge }
 *   key = the digit keys · enter = Enter, Answer, Start · soft = rub out, Close, point
 *   panel = the answer panel's gradient · slot = the answer box's active edge and the panel's rim
 *
 * How a theme is chosen (the image agent picks, the CLI validates):
 *   - the keys take the OBJECT's own colour family (milk-chocolate keys for chocolate pieces);
 *   - Enter/Answer is a joyful contrasting accent that is a treat of the same world (chocolate and raspberry);
 *   - the soft keys are a light butter or cream; the panel a very light tint of the object's family.
 * A theme that fails validateTheme is never written: `images make` stops with the reasons.
 */

/* ── colour maths ── */
export const hexToRgb = (h) => { const s = String(h).replace("#", ""); return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16)); };
export const rgbToHex = (c) => "#" + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();
const lin = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
export const luminance = (c) => { const [r, g, b] = typeof c === "string" ? hexToRgb(c) : c; return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
export const contrast = (a, b) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
export const mixHex = (a, b) => rgbToHex(hexToRgb(a).map((v, i) => (v + hexToRgb(b)[i]) / 2));
export function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h *= 60; if (h < 0) h += 360;
  return [h, s, l];
}
export function hslToHex(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return rgbToHex([(r + m) * 255, (g + m) * 255, (b + m) * 255]);
}
export const hueGap = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const hueOf = (hex) => rgbToHsl(hexToRgb(hex))[0];
const satOf = (hex) => rgbToHsl(hexToRgb(hex))[1];

/* the content colours a theme should keep clear of (the chapter's blue, green, amber, vermilion, and violet: an
   added zero in decimals) */
export const CONTENT_HUES = { blue: 202, green: 164, amber: 41, vermilion: 22, violet: 275 };
/* Enter accents, first clear one wins. No raspberry or coral: they sit in the red band (the no-red rule below). */
export const ACCENTS = [["berry", 328], ["grape", 275], ["teal", 178], ["sky", 205]];

/* THE NO-RED RULE (the owner's: nothing is red after a miss, and a red key reads as "error" to a child). check.mjs
   isRed: hue >= 345 or <= 15, saturation > 0.5, lightness 0.25 to 0.75. A theme keeps 3 degrees clear of that band,
   so a derived one never sits on the boundary. */
export const RED_BAND = { hiHue: 345 - 3, loHue: 15 + 3, sat: 0.5, lMin: 0.25, lMax: 0.75 };
export function readsRed(hex) {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  return (h >= RED_BAND.hiHue || h <= RED_BAND.loHue) && s > RED_BAND.sat && l > RED_BAND.lMin && l < RED_BAND.lMax;
}

/* ── presets: one per object family the agent is likely to choose ── */
export const PRESETS = {
  /* chocolate pieces on a board: milk-chocolate keys, a berry-bubblegum Enter (chocolate and strawberry; was
     raspberry until the no-red rule), butter-caramel rub out, cream-caramel panel (the owner's pick for ch 5) */
  chocolate: { key: ["#A45E3C", "#7A3F22", "#4E2410", "#FFF3DC"], enter: ["#E0408F", "#BE1F78", "#8C0F55", "#FFFFFF"],
    soft: ["#FFE29A", "#F7C25A", "#C48E1F", "#5B3410"], panel: ["#FFF1D6", "#F3D9A8"], slot: "#7A3F22" },
  /* a round golden cake, a roti, a pizza base, a biscuit: toasted-crust keys, a strawberry-pink Enter, butter rub
     out, a sponge-cream panel */
  cake: { key: ["#B0701E", "#8C5310", "#5C3306", "#FFF6E0"], enter: ["#DD408A", "#C3226D", "#861349", "#FFFFFF"],
    soft: ["#FFF0B8", "#F9D976", "#C9A43A", "#5B3E0A"], panel: ["#FFF6E2", "#F6E3BC"], slot: "#8C5310" },
  /* a golden satin ribbon or a jute string (a skin is warm, never red): golden-satin keys, a rose-pink Enter,
     peach-cream rub out, a pale gold panel */
  ribbon: { key: ["#A16E21", "#7F571A", "#4E340E", "#FFF6E0"], enter: ["#E04287", "#CA216A", "#871245", "#FFFFFF"],
    soft: ["#FFE9C7", "#F7CF94", "#C99A4E", "#5A2E12"], panel: ["#FDF5E3", "#F5E4BC"], slot: "#7F571A" },
  /* orange juice poured and measured: juice-orange keys with dark ink, a watermelon-pink Enter, lemon rub out, a
     pale orange panel */
  juice: { key: ["#F59A35", "#E07A14", "#9A4E08", "#2A1404"], enter: ["#DD4099", "#C3227D", "#861354", "#FFFFFF"],
    soft: ["#FFF3B0", "#FBE07A", "#C9A93A", "#4A3A08"], panel: ["#FFF4E6", "#FDE3C2"], slot: "#C2600E" },
  /* paper, card, a kraft strip or anything plain and warm: kraft keys, a magenta-marker Enter, cream rub out,
     a paper panel */
  paper: { key: ["#A66F3B", "#82511F", "#553311", "#FFF8EC"], enter: ["#DA3EA1", "#BC2485", "#84155B", "#FFFFFF"],
    soft: ["#FFEFC4", "#F6D88E", "#C6A24A", "#4F3410"], panel: ["#FFF8EC", "#F2E2C4"], slot: "#82511F" },
};

/* ── deriving a theme from the skin's mean colour, when no preset fits ── */
const CREAM = "#FFF6E6", NEAR_BLACK = "#1E140C";
function inkFor(top, bottom) {
  const face = mixHex(top, bottom);
  return contrast(CREAM, face) >= contrast(NEAR_BLACK, face) ? CREAM : NEAR_BLACK;
}
export function deriveTheme(meanRgb) {
  const [h0, s0] = rgbToHsl(meanRgb);
  let h = s0 < 0.12 ? 30 : h0;     /* a grey or near-white object has no hue of its own: a warm kraft hue */
  if (h >= RED_BAND.hiHue - 1 || h <= RED_BAND.loHue + 1) h = h <= 180 ? RED_BAND.loHue + 4 : RED_BAND.hiHue - 4;   /* a red object: keys just clear of the red band */
  const s = Math.min(0.78, Math.max(0.5, s0));
  /* key: the object's hue, mid-dark; darken until its ink reads */
  let kTop = 0.42, kBot = 0.33, key;
  for (let i = 0; i < 6; i++) {
    const top = hslToHex(h, s, kTop), bottom = hslToHex(h, s, kBot), ink = inkFor(top, bottom);
    key = [top, bottom, hslToHex(h, s, 0.2), ink];
    if (contrast(ink, mixHex(top, bottom)) >= 4.5) break;
    kTop -= 0.03; kBot -= 0.03;
  }
  /* enter: the first accent clear of the object's hue and of every content hue; else the one clearest of them */
  const clear = (a) => hueGap(a, h) >= 25 && Object.values(CONTENT_HUES).every((c) => hueGap(a, c) >= 25);
  let pick = ACCENTS.find(([, a]) => clear(a));
  if (!pick) pick = ACCENTS.filter(([, a]) => hueGap(a, h) >= 25)
    .sort((x, y) => Math.min(...Object.values(CONTENT_HUES).map((c) => hueGap(y[1], c))) - Math.min(...Object.values(CONTENT_HUES).map((c) => hueGap(x[1], c))))[0] || ACCENTS[0];
  const eh = pick[1];
  let eTop = 0.58, eBot = 0.47, enter;
  for (let i = 0; i < 6; i++) {
    const top = hslToHex(eh, 0.68, eTop), bottom = hslToHex(eh, 0.68, eBot), face = mixHex(top, bottom);
    const ink = contrast("#FFFFFF", face) >= contrast(NEAR_BLACK, face) ? "#FFFFFF" : NEAR_BLACK;   /* teal and sky want dark ink */
    enter = [top, bottom, hslToHex(eh, 0.68, 0.3), ink];
    if (contrast(ink, face) >= 4.5) break;
    eTop -= 0.04; eBot -= 0.04;
  }
  /* soft: a light butter or cream, leaning to the object's hue when it is warm */
  const sh = h >= 15 && h <= 60 ? Math.min(50, h + 10) : 45;
  const soft = [hslToHex(sh, 0.92, 0.82), hslToHex(sh, 0.88, 0.7), hslToHex(sh, 0.6, 0.45), hslToHex(h, 0.6, 0.18)];
  if (contrast(soft[3], mixHex(soft[0], soft[1])) < 4.5) soft[3] = NEAR_BLACK;
  const panel = [hslToHex(h, Math.min(0.6, s), 0.94), hslToHex(h, Math.min(0.6, s), 0.86)];
  return { theme: { key, enter, soft, panel, slot: key[1] }, accent: pick[0] };
}

/* ── the validator: a theme that fails is never written ── */
export const THEME_LIMITS = { ink: 4.5, keyVsPanel: 1.6, saturation: 0.35, enterGap: 20, panelLum: 0.6, slotVsWhite: 3.0 };
const HEX = /^#[0-9A-Fa-f]{6}$/;
export function validateTheme(t) {
  const problems = [], n = {};
  if (!t || typeof t !== "object") return { ok: false, problems: ["the theme is not an object"], numbers: n };
  for (const tone of ["key", "enter", "soft"])
    if (!Array.isArray(t[tone]) || t[tone].length !== 4 || !t[tone].every((x) => HEX.test(x))) problems.push(`${tone} must be [top, bottom, edge, ink] as #RRGGBB`);
  if (!Array.isArray(t.panel) || t.panel.length !== 2 || !t.panel.every((x) => HEX.test(x))) problems.push("panel must be [top, bottom] as #RRGGBB");
  if (!HEX.test(String(t.slot || ""))) problems.push("slot must be one #RRGGBB");
  if (problems.length) return { ok: false, problems, numbers: n };
  const face = (tone) => mixHex(t[tone][0], t[tone][1]);
  const panel = mixHex(t.panel[0], t.panel[1]);
  for (const tone of ["key", "enter", "soft"]) {
    n[`${tone}Ink`] = +contrast(t[tone][3], face(tone)).toFixed(2);
    if (n[`${tone}Ink`] < THEME_LIMITS.ink) problems.push(`${tone}: its ink reads ${n[`${tone}Ink`]}:1 on its face (needs ${THEME_LIMITS.ink}:1)`);
  }
  n.keyVsPanel = +contrast(face("key"), panel).toFixed(2);
  if (n.keyVsPanel < THEME_LIMITS.keyVsPanel) problems.push(`the keys stand only ${n.keyVsPanel}:1 off the panel (needs ${THEME_LIMITS.keyVsPanel}:1)`);
  for (const tone of ["key", "enter"]) {
    n[`${tone}Sat`] = +satOf(face(tone)).toFixed(2);
    if (n[`${tone}Sat`] < THEME_LIMITS.saturation) problems.push(`${tone}: the face is pale (saturation ${n[`${tone}Sat`]}, needs ${THEME_LIMITS.saturation})`);
  }
  n.enterGap = Math.round(hueGap(hueOf(face("enter")), hueOf(face("key"))));
  if (n.enterGap < THEME_LIMITS.enterGap) problems.push(`enter's hue is only ${n.enterGap} degrees from the keys' (needs ${THEME_LIMITS.enterGap})`);
  n.panelLum = +luminance(panel).toFixed(2);
  if (n.panelLum < THEME_LIMITS.panelLum) problems.push(`the panel is too dark for the white answer box (luminance ${n.panelLum}, needs ${THEME_LIMITS.panelLum})`);
  n.slotVsWhite = +contrast(t.slot, "#FFFFFF").toFixed(2);
  if (n.slotVsWhite < THEME_LIMITS.slotVsWhite) problems.push(`the answer box's edge reads only ${n.slotVsWhite}:1 on white (needs ${THEME_LIMITS.slotVsWhite}:1)`);
  /* the no-red rule: every colour the keypad paints (faces, edges, panel, the box edge) stays out of the red band */
  const painted = [["key", t.key.slice(0, 3)], ["enter", t.enter.slice(0, 3)], ["soft", t.soft.slice(0, 3)], ["panel", t.panel], ["slot", [t.slot]]];
  const reds = painted.flatMap(([name, cs]) => cs.filter(readsRed).map((c) => `${name} ${c}`));
  n.red = reds.length;
  if (reds.length) problems.push(`reads as red: the pipeline's no-red rule (${reds.join(", ")}; hue within ${RED_BAND.loHue} of 0, saturation over ${RED_BAND.sat}, lightness ${RED_BAND.lMin} to ${RED_BAND.lMax})`);
  return { ok: !problems.length, problems, numbers: n };
}

/* images.json `theme` -> errors in the plan itself (before anything is made) */
export function checkThemePlan(plan, images) {
  const errors = [], warnings = [];
  const th = plan.theme;
  if (th === undefined || th === null) return { errors, warnings };
  if (typeof th !== "object") { errors.push("theme must be an object: { preset }, { derive: key } or a full palette"); return { errors, warnings }; }
  if (th.preset !== undefined && !PRESETS[th.preset]) errors.push(`theme preset "${th.preset}" is not one of ${Object.keys(PRESETS).join(", ")}`);
  if (th.derive !== undefined && !images.some((img) => img.key === th.derive)) errors.push(`theme derive "${th.derive}" names no image key of this slot`);
  if (th.preset === undefined && th.derive === undefined && !th.key) errors.push("theme needs preset, derive or a full palette (key, enter, soft, panel, slot)");
  if (!String(plan.themeWhy || "").trim()) warnings.push("theme without themeWhy (one line: why this theme suits the object)");
  return { errors, warnings };
}

/* the plan + the slot's skins (key -> mean rgb) -> { theme, from } or null; throws on a theme that fails */
export function resolveTheme(plan, means, order) {
  const th = plan.theme;
  let theme = null, from = "";
  if (th && th.preset) { theme = PRESETS[th.preset]; from = `preset ${th.preset}`; }
  else if (th && th.derive) {
    if (!means[th.derive]) throw new Error(`theme: cannot derive from "${th.derive}" (no skin made for it)`);
    const d = deriveTheme(means[th.derive]); theme = d.theme; from = `derived from ${th.derive} (accent ${d.accent})`;
  } else if (th && th.key) { theme = th; from = "explicit palette"; }
  else {
    const first = (order || Object.keys(means)).find((k) => means[k]);
    if (!first) return null;
    const d = deriveTheme(means[first]); theme = d.theme; from = `derived from ${first} automatically (no theme in images.json; accent ${d.accent})`;
  }
  const v = validateTheme(theme);
  if (!v.ok) throw new Error(`theme (${from}) fails: ${v.problems.join("; ")}`);
  return { theme, from, numbers: v.numbers };
}
