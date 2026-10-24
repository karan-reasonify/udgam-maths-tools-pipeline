/* Unit tests of picture-scale on synthetic geometry (no browser): node class3/lib/check/picturescale.test.mjs */
import assert from "node:assert/strict";
import { judgePictureScale, measurePicture, isLeftSmall, PICTURE_SCALE_LIMITS, PICTURE_SCALE_DETAIL } from "./picturescale.mjs";

/* the working area with the wide keypad's panel open: stage x 64..964, y 202..730 */
const WX = 64, WY = 202, WW = 900, WH = 528;
const box = (x, y, w, h) => ({ x, y, w, h });
const shape = (x, y, w, h, zone = "work") => ({ tag: "rect", zone, box: box(x, y, w, h) });
const text = (s, size, x, y, w, h, extra = {}) => ({ zone: "work", text: s, size, box: box(x, y, w, h), ink: box(x, y + h * 0.1, w, h * 0.8), ...extra });
const frame = (shapes, texts) => ({ shapes, texts, controls: [], images: [], outside: [] });
/* what the stage always holds outside the working area: the question, the answer slot, the pad. They must never count. */
const chrome = () => ({
  shapes: [shape(980, 316, 556, 422, "pad")],
  texts: [text("Say the number", 60, 80, 110, 600, 70, { zone: "ask" }), text("0", 90, 1000, 220, 60, 90, { zone: "slot" })],
});
const withChrome = (g) => { const c = chrome(); return { ...g, shapes: [...g.shapes, ...c.shapes], texts: [...g.texts, ...c.texts] }; };

/* say_it_bar as built: a 480 x 120 bar of five digit cards 84 wide, two chips below, a caption */
function sayItBar(k = 1, gap = 14, left = (WW - 480 * k) / 2 + WX, top = 300) {
  const cw = 84 * k, bw = 480 * k, bh = 120 * k, shapes = [shape(left, top, bw, bh)], texts = [];
  for (let i = 0; i < 5; i++) shapes.push(shape(left + 6 * k + i * (cw + 6 * k), top + 10 * k, cw, 100 * k));
  const digits = k === 1 ? 56 : 72, chip = k === 1 ? 30 : 40;
  /* the five digits are one text with five coloured spans: the spans are `part`s of it */
  texts.push(text("12345", digits, left + 6 * k, top + 10 * k, bw - 12 * k, 100 * k));
  for (let i = 0; i < 5; i++) texts.push(text("12345"[i], digits, left + 6 * k + i * (cw + 6 * k), top + 10 * k, cw, 100 * k, { part: true }));
  /* one row under the bar: two chips (a shape and a label each) and the caption */
  const cy = top + bh + gap, ch = k === 1 ? 50 : 60, cx = 150 * k, step = cx + 15;
  [0, 1].forEach((i) => {
    shapes.push(shape(left + i * step, cy, cx, ch));
    texts.push(text(i ? "ones" : "lakhs", chip, left + i * step + 10, cy + 5, cx - 20, ch - 10));
  });
  texts.push(text("Say it", chip, left + 2 * step, cy + 5, cx - 20, ch - 10));
  return withChrome(frame(shapes, texts));
}

let failed = 0;
const test = (name, fn) => {
  try { fn(); console.log(`ok - ${name}`); } catch (e) { failed++; console.log(`FAIL - ${name}\n  ${e.message.split("\n").join("\n  ")}`); }
};
const judge = (g, tag = "phase 1 ask") => judgePictureScale([{ tag, g }]);

test("1. say_it_bar as built (5 cards 84 wide in a 480 x 120 bar, 2 chips, digits 56, chips 30, n = 4) is flagged", () => {
  const g = sayItBar(1);
  const p = measurePicture(g);
  assert.equal(p.n, 4);
  assert.equal(p.m, 56, "the 90-size slot text and the 60-size question are outside the working area and must not count");
  assert.ok(p.r < 0.22 && p.r > 0.05, `r should be small, got ${p.r}`);
  const bad = judge(g);
  assert.equal(bad.length, 1);
  assert.match(bad[0], /^phase 1 ask: the picture fills \d+% of the 900 x 528 working area and its largest text is 56: scale the cards, digits and labels up \(digits 64\+, cards 110\+, labels 40\+; LAYOUT section 3 "Not too small either"\)$/);
  assert.ok(bad[0].includes(`fills ${Math.round(p.r * 100)}%`));
});

test("2. the same picture scaled 1.45x (cards 122 wide, digits 72, chips 40) is not flagged", () => {
  const g = sayItBar(1.45, 14, WX + 100, 290);
  const p = measurePicture(g);
  assert.equal(p.m, 72);
  assert.ok(p.r > 0.22 && p.r < 0.40, `r should sit between the small and the big guard, got ${p.r}`);
  assert.deepEqual(judge(g), []);
  assert.ok(Math.round(84 * 1.45) === 122);
});

test("2b. the picture under a fifth with digits at 56 is flagged by rule C; with every text at 64 it passes", () => {
  const small = sayItBar(1);
  assert.equal(judge(small).length, 1);
  const g64 = { ...small, texts: small.texts.map((t) => (t.zone === "work" ? { ...t, size: 64 } : t)) };
  assert.deepEqual(judge(g64), [], "digits and labels at 64 clear every rule");
});

test("3. a full frame (strip 700 x 130, cards, labels; r about 0.45) is not flagged, even with small labels", () => {
  const shapes = [shape(164, 260, 700, 130)], texts = [];
  for (let i = 0; i < 8; i++) shapes.push(shape(64 + i * 112, 420, 100, 80));
  for (let i = 0; i < 6; i++) texts.push(text(`label ${i}`, 30, 80 + i * 140, 280, 120, 40));
  const g = withChrome(frame(shapes, texts));
  const p = measurePicture(g);
  assert.ok(p.r >= 0.40 && p.r < 0.6, `r should be about 0.45, got ${p.r}`);
  assert.ok(p.n <= 8 && p.m < 44, "small, sparse texts: only the big picture saves it");
  assert.deepEqual(judge(g), []);
});

test("4. a frame with 20 texts and r 0.3 is not flagged; the same r with 6 texts is", () => {
  const shapes = [shape(64, 300, 900, 160)];
  const many = Array.from({ length: 20 }, (_, i) => text(`t${i}`, 28, 70 + (i % 10) * 85, 310 + Math.floor(i / 10) * 70, 70, 40));
  const g = withChrome(frame(shapes, many));
  const p = measurePicture(g);
  assert.equal(p.n, 20);
  assert.ok(p.r >= 0.22 && p.r < 0.40, `r should be about 0.3, got ${p.r}`);
  assert.deepEqual(judge(g), []);
  const few = withChrome(frame(shapes, many.slice(0, 6)));
  assert.equal(judge(few).length, 1, "with few texts the same room, texts at 28, is a sparse screen");
});

test("5. an empty work zone gives no message (and no frame, null, or bad data does not throw)", () => {
  assert.deepEqual(judge(withChrome(frame([], []))), []);
  assert.deepEqual(judge({ shapes: [], texts: [] }), []);
  assert.deepEqual(judgePictureScale([{ tag: "x", g: null }, null, { tag: "y" }, { tag: "z", g: { shapes: [{ zone: "work", box: { x: NaN, y: 0, w: 5, h: 5 } }], texts: [{ zone: "work", text: "a", size: 30 }] } }]), []);
  assert.deepEqual(judgePictureScale(undefined), []);
  assert.deepEqual(judgePictureScale([]), []);
});

test("6. one message per tag, and the list stops at 6", () => {
  const g = sayItBar(1);
  const dup = judgePictureScale([{ tag: "phase 1 ask", g }, { tag: "phase 1 ask", g }, { tag: "phase 2 ask", g }]);
  assert.equal(dup.length, 2);
  assert.ok(dup[0].startsWith("phase 1 ask:") && dup[1].startsWith("phase 2 ask:"));
  const ten = judgePictureScale(Array.from({ length: 10 }, (_, i) => ({ tag: `phase ${i + 1} ask`, g })));
  assert.equal(ten.length, 6);
  assert.deepEqual(ten.map((s) => s.split(":")[0]), [1, 2, 3, 4, 5, 6].map((k) => `phase ${k} ask`));
  /* a duplicate tag that is fine the first time and small the second time is still reported once */
  const mixed = judgePictureScale([{ tag: "a", g: withChrome(frame([], [])) }, { tag: "a", g }, { tag: "a", g }]);
  assert.equal(mixed.length, 1);
});

test("7. clipping to the room, the working-area width and the origin option", () => {
  /* a picture that runs 1400 wide under the panel is clipped to the 900 room: it fills it */
  assert.equal(measurePicture(withChrome(frame([shape(64, 202, 1400, 528)], [])), { workW: 900 }).r, 1);
  /* the same bar judged in the standard 1086 room fills less of it */
  const g = sayItBar(1);
  assert.ok(measurePicture(g, { workW: 1086 }).r < measurePicture(g, { workW: 900 }).r);
  assert.match(judgePictureScale([{ tag: "t", g }], { workW: 1086 })[0], /of the 1086 x 528 working area/);
  /* content wholly outside the room gives nothing to judge */
  assert.equal(measurePicture(frame([shape(1100, 300, 200, 100)], [text("9", 30, 1100, 300, 20, 30)])), null);
  /* a custom origin: the same bar moved to stage 0,0 is judged against a room that starts there */
  const moved = { ...g, shapes: g.shapes.map((s) => (s.zone === "work" ? { ...s, box: { ...s.box, x: s.box.x - 64, y: s.box.y - 202 } } : s)), texts: g.texts.map((t) => (t.zone === "work" ? { ...t, box: { ...t.box, x: t.box.x - 64, y: t.box.y - 202 }, ink: { ...t.ink, x: t.ink.x - 64, y: t.ink.y - 202 } } : t)) };
  assert.ok(Math.abs(measurePicture(moved, { workX: 0, workY: 0 }).r - measurePicture(g).r) < 1e-9);
});

test("8. the rules on their own: A, B, C, the guards, a picture with no text", () => {
  const L = PICTURE_SCALE_LIMITS;
  assert.equal(isLeftSmall({ r: 0.30, n: 4, m: 40 }), true, "A: sparse, largest text under 44");
  assert.equal(isLeftSmall({ r: 0.30, n: 4, m: 44 }), false);
  assert.equal(isLeftSmall({ r: 0.15, n: 12, m: 50 }), true, "B: small picture, largest text under 52");
  assert.equal(isLeftSmall({ r: 0.15, n: 12, m: 52 }), false, "B does not reach 52, and C needs a sparse screen");
  assert.equal(isLeftSmall({ r: 0.15, n: 8, m: 63 }), true, "C: sparse and small, digits under 64");
  assert.equal(isLeftSmall({ r: 0.15, n: 8, m: 64 }), false);
  assert.equal(isLeftSmall({ r: 0.15, n: 9, m: 60 }), false, "C needs n <= 8");
  assert.equal(isLeftSmall({ r: 0.40, n: 2, m: 20 }), false, "a big picture is never flagged");
  assert.equal(isLeftSmall({ r: 0.22, n: 9, m: 20 }), false, "a busy screen at r >= 0.22 is never flagged");
  assert.equal(isLeftSmall({ r: 0.10, n: 0, m: 0 }), true, "no text: only a small picture is flagged");
  assert.equal(isLeftSmall({ r: 0.30, n: 0, m: 0 }), false);
  const bad = judge(frame([shape(400, 400, 100, 100)], []));
  assert.equal(bad.length, 1);
  assert.match(bad[0], /and it has no text:/);
  assert.equal(isLeftSmall({ r: 0.15, n: 8, m: 60 }, { ...L, digitsMax: 56 }), false, "the limits are overridable");
  assert.ok(Object.isFrozen(L));
});

test("9. the row detail is the string the caller asked for", () => {
  assert.equal(PICTURE_SCALE_DETAIL, "the picture is not left small: with the answer panel open it fills at least a fifth of the working area, or has more than a few labels, and its largest text is at least 44 (a sparse screen) or 52");
});

console.log(failed ? `\n${failed} test(s) FAILED` : "\nall picture-scale tests passed");
process.exit(failed ? 1 : 0);
