/* The layout judges, read off a geometry() snapshot (geometry.mjs): shared by `check` (every frame it samples, English at the
 * 1600 x 900 stage and Hindi, Gujarati and English again at the PHONE frame) and by `approve` (every state its drive reaches).
 * One source, so a rule can never be stricter in one command than in the other. All boxes are STAGE units; the runtime draws the
 * stage in a 16:9 frame scaled to the window (`.c4-frame`), so a phone is the same stage at a smaller scale, never a new layout:
 * what can differ there is how a line of text MEASURES at a small pixel size (hinting), which is why the phone frame is run. */

export const inter = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
export const inside = (b, z, tol = 3) => b.x >= z.x - tol && b.y >= z.y - tol && b.x + b.w <= z.x + z.w + tol && b.y + b.h <= z.y + z.h + tol;
export const fmt = (b) => `(${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.w)}x${Math.round(b.h)})`;

/* the phone frame: Mobile in the viewer's device bar (viewer/src/lib/devices.ts). The stage is height-bound there: 390 / 900 */
export const PHONE = { w: 844, h: 390 };
/* the smallest text a phone may draw, in rendered CSS px: the same 28 stage units the stage floor sets (28 x 0.4333 = 12.1) with the
   rounding the browser adds at that size */
export const PHONE_TEXT_PX = 11.5;

/* one snapshot -> the six lists the render rows are made of. `ZS` is the zone map of the tool (check knows it: board, bigPad, keyOnly);
   without it (approve) the zone-spill list is skipped and every other rule still binds. Same code the English loop of check.mjs used to
   carry inline, byte for byte: its output for an English frame is unchanged. */
export function layoutProblems(g, { ZS = null, tag }) {
  const out = { overlaps: [], spills: [], offStage: [], small: [], fingers: [], crowd: [] };
  const whole = g.texts.filter((t) => !t.part);
  for (let a = 0; a < whole.length; a++) for (let b = a + 1; b < whole.length; b++) {
    const A = whole[a].ink || whole[a].box, B = whole[b].ink || whole[b].box;
    /* the digits of one number drawn as one text each ("4" then "5" of 45.28) sit on one baseline at one size and their advance boxes touch
       or overlap by the glyphs' side-bearing (4 of 38 units), which is white space, not ink: a pair like that, overlapping by at most
       15 % of the narrower, is one line, not a collision (found 2026-10-16 on Scale Bench; the picture shows no contact) */
    if (Math.abs(A.y - B.y) < 1 && whole[a].size === whole[b].size && Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x) <= 0.15 * Math.min(A.w, B.w)) continue;
    if (inter(A, B) > 6 && Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x) > 2 && Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y) > 2)
      out.overlaps.push(`${tag}: "${whole[a].text.slice(0, 18)}" x "${whole[b].text.slice(0, 18)}"`);
  }
  if (ZS) {
    for (const s of g.shapes) { const z = ZS[s.zone]; if (z && !inside(s.box, z)) out.spills.push(`${tag}: ${s.tag} in ${s.zone} ${fmt(s.box)}`); }
    for (const t of g.texts) { const z = ZS[t.zone], b = t.ink || t.box; if (z && !inside(b, z, 2)) out.spills.push(`${tag}: "${t.text.slice(0, 16)}" in ${t.zone} ${fmt(b)}`); }
  }
  for (const t of g.texts) { const b = t.ink || t.box; if (b.x < -1 || b.y < -1 || b.x + b.w > 1601 || b.y + b.h > 901) out.offStage.push(`${tag}: "${t.text.slice(0, 16)}" ${fmt(b)}`); }
  for (const o of g.outside) out.offStage.push(`${tag}: ${o.tag} ${fmt(o.box)}`);
  for (const t of g.texts) if (t.size < 27.5) out.small.push(`${tag}: "${t.text.slice(0, 20)}" at ${t.size}`);
  const live = g.controls.filter((c) => !c.disabled);
  for (const c of live) {
    if (c.box.w < 71 || c.box.h < 71) out.fingers.push(`${tag}: ${c.id} ${Math.round(c.box.w)}x${Math.round(c.box.h)}`);
    if (c.role !== "button" || c.tab !== "0" || !c.label) out.fingers.push(`${tag}: ${c.id} is not a labelled, focusable button`);
  }
  for (let a = 0; a < live.length; a++) for (let b = a + 1; b < live.length; b++)
    if (inter(live[a].box, live[b].box) > 16) out.crowd.push(`${tag}: ${live[a].id} x ${live[b].id}`);
  return out;
}

/* What only a real phone window can say, from the snapshots read at PHONE size: `frames` is [{ tag, g }].
 *   frame   the window really was 844 x 390 (a Chrome that ignores the size would prove nothing, so that FAILS), the page does not
 *           scroll, the stage's 16:9 frame lies wholly in the window, and the runtime drew it at the scale a 390 px height gives
 *   type    the smallest text, in rendered px (stage size x the measured scale), against PHONE_TEXT_PX
 *   tap     the smallest live control, in rendered px (a fact, not a rule: the 72-unit finger floor is 31 px on a phone)
 * Returns { frame: [problems], type: [problems], minText: { px, text, tag } | null, minTap: { px, id, tag } | null, scale } */
export function phoneProblems(frames) {
  const out = { frame: [], type: [], minText: null, minTap: null, scale: null };
  const want = PHONE.h / 900;
  for (const { tag, g } of frames) {
    const v = g && g.view;
    if (!v) { out.frame.push(`${tag}: no screen reading`); continue; }
    if (v.iw !== PHONE.w || v.ih !== PHONE.h) out.frame.push(`${tag}: the window was ${v.iw}x${v.ih}, not ${PHONE.w}x${PHONE.h}`);
    if (v.sw > v.iw + 1 || v.sh > v.ih + 1) out.frame.push(`${tag}: the page scrolls (${v.sw}x${v.sh} in a ${v.iw}x${v.ih} window)`);
    const f = v.frame;
    if (f.x < -1 || f.y < -1 || f.x + f.w > v.iw + 1 || f.y + f.h > v.ih + 1) out.frame.push(`${tag}: the stage frame ${fmt(f)} is not wholly in the ${v.iw}x${v.ih} window`);
    if (Math.abs(v.scale - want) > 0.01) out.frame.push(`${tag}: the stage is drawn at ${v.scale}, a ${PHONE.h} px height gives ${want.toFixed(4)}`);
    out.scale = v.scale;
    for (const t of g.texts) {
      const px = t.size * v.scale;
      if (px < PHONE_TEXT_PX) out.type.push(`${tag}: "${t.text.slice(0, 20)}" ${px.toFixed(1)} px`);
      if (!out.minText || px < out.minText.px) out.minText = { px, text: t.text.slice(0, 20), tag };
    }
    for (const c of g.controls.filter((x) => !x.disabled)) {
      const px = Math.min(c.box.w, c.box.h) * v.scale;
      if (!out.minTap || px < out.minTap.px) out.minTap = { px, id: c.id, tag };
    }
  }
  return out;
}
