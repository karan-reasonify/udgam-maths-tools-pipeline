/* picture-scale: a picture of one or two small things is not left small on the working area.

   The owner, 2026-10-14: "in some tools the left side has few text, so increase the font size so it looks clear from the last
   bench" (docs/LAYOUT.md section 3, "Not too small either"). A standalone judge, so a check can call it on the geometry it
   already reads (`window.__geometry()`: shapes, texts, in stage units; lib/build/preview.mjs). No browser, no file reads.

   judgePictureScale(geoms, opts) -> the `bad` list of a WARN row (empty when fine)
     geoms: [{ tag, g }], the ASK frames of the tool taken with the answer panel open
     opts : { workW = 900, workH = 528, workX = 64, workY = 202, limits }
            workW x workH is the room that is left of the working area with the panel open (900 with the wide keypad, 1086
            standard); workX, workY is its corner on the stage (ZONES.work and ZONES_BOARD.work: 64, 202), because the boxes
            of the geometry are stage units and are clipped to that room. `limits` overrides PICTURE_SCALE_LIMITS. */

export const PICTURE_SCALE_LIMITS = Object.freeze({
  sparseN: 8,        /* a sparse screen: this many whole texts on the working area or fewer */
  sparseMax: 44,     /* rule A: a sparse screen's largest text is at least this */
  smallR: 0.22,      /* a small picture fills less than this share of the working area */
  smallMax: 52,      /* rule B: a small picture's largest text is at least this */
  digitsMax: 64,     /* rule C: a picture both sparse and small has its main digits at 64 or more (LAYOUT section 3) */
  bigR: 0.40,        /* a picture that fills this much of the working area or more is never flagged */
  maxBad: 6,         /* the list is cut here */
});

export const PICTURE_SCALE_DETAIL = "the picture is not left small: with the answer panel open it fills at least a fifth of the working area, or has more than a few labels, and its largest text is at least 44 (a sparse screen) or 52 (a small picture), and 64 when it is both";

const num = (v) => typeof v === "number" && Number.isFinite(v);
const solid = (b) => !!b && num(b.x) && num(b.y) && num(b.w) && num(b.h) && b.w > 0 && b.h > 0;

/* What the working area of ONE frame holds: { r, m, n } or null when it holds nothing to judge.
     r  the union bounding box of every work shape and text (a text by its ink band when it has one), clipped to the room
        workX..workX+workW by workY..workY+workH, as a share of that room
     m  the largest size among the whole work texts (a `part` is a coloured span of a text already counted); 0 with none
     n  the number of whole work texts */
export function measurePicture(g, { workW = 900, workH = 528, workX = 64, workY = 202 } = {}) {
  if (!g) return null;
  const shapes = (g.shapes || []).filter((s) => s && s.zone === "work");
  const texts = (g.texts || []).filter((t) => t && t.zone === "work");
  if (!shapes.length && !texts.length) return null;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const take = (b) => {
    if (!solid(b)) return;
    const l = Math.max(b.x, workX), t = Math.max(b.y, workY), r = Math.min(b.x + b.w, workX + workW), d = Math.min(b.y + b.h, workY + workH);
    if (r <= l || d <= t) return;
    x0 = Math.min(x0, l); y0 = Math.min(y0, t); x1 = Math.max(x1, r); y1 = Math.max(y1, d);
  };
  shapes.forEach((s) => take(s.box));
  texts.forEach((t) => take(solid(t.ink) ? t.ink : t.box));
  if (!Number.isFinite(x0)) return null;   /* everything lies outside the room (board-fit says so): nothing to scale */
  const whole = texts.filter((t) => !t.part);
  const m = whole.reduce((a, t) => (num(t.size) && t.size > a ? t.size : a), 0);
  return { r: ((x1 - x0) * (y1 - y0)) / (workW * workH), m, n: whole.length };
}

/* true when the picture is left small. Never a big picture (r >= bigR), never a busy one (more than sparseN texts and r >= smallR:
   neither rule below can fire there). A picture with no text has no text size to judge: only its share of the room counts. */
export function isLeftSmall({ r, m, n }, L = PICTURE_SCALE_LIMITS) {
  if (r >= L.bigR) return false;
  const sparse = n <= L.sparseN, small = r < L.smallR;
  if (!n) return small;
  return (sparse && m < L.sparseMax)                    /* A: few words, and the largest is small */
    || (small && m < L.smallMax)                        /* B: a small picture, and the largest word is small */
    || (sparse && small && m < L.digitsMax);            /* C: few words on a small picture: digits at 64 or more */
}

export function judgePictureScale(geoms, { workW = 900, workH = 528, workX = 64, workY = 202, limits } = {}) {
  const L = { ...PICTURE_SCALE_LIMITS, ...(limits || {}) };
  const bad = [], seen = new Set();
  if (!Array.isArray(geoms)) return bad;
  geoms.forEach((f, i) => {
    if (bad.length >= L.maxBad || !f) return;
    const tag = f.tag || `frame ${i + 1}`;
    if (seen.has(tag)) return;
    const p = measurePicture(f.g, { workW, workH, workX, workY });
    if (!p || !isLeftSmall(p, L)) return;
    seen.add(tag);
    const biggest = p.n ? `its largest text is ${+p.m.toFixed(1)}` : "it has no text";
    bad.push(`${tag}: the picture fills ${Math.round(p.r * 100)}% of the ${workW} x ${workH} working area and ${biggest}: scale the cards, digits and labels up (digits 64+, cards 110+, labels 40+; LAYOUT section 3 "Not too small either")`);
  });
  return bad;
}
