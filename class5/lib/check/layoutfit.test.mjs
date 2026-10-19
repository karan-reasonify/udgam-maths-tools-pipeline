/* node lib/check/layoutfit.test.mjs: one clean snapshot passes, and each defect the phone and Hindi/Gujarati rows exist for fails */
import assert from "node:assert/strict";
import { layoutProblems, phoneProblems, PHONE } from "./layoutfit.mjs";

const ZS = { work: { x: 64, y: 202, w: 1086, h: 528 }, bubble: { x: 240, y: 748, w: 1000, h: 144 } };
const text = (t, x, y, w, h, extra = {}) => ({ text: t, box: { x, y, w, h }, size: 32, zone: "work", ...extra });
const clean = () => ({
  texts: [text("One tenth", 100, 220, 300, 40), text("Cut it", 500, 300, 200, 40)],
  shapes: [{ tag: "rect", zone: "work", box: { x: 100, y: 300, w: 300, h: 100 } }],
  controls: [{ id: "k1", role: "button", tab: "0", label: "Key 1", box: { x: 1200, y: 400, w: 90, h: 90 } }], outside: [],
  view: { iw: 844, ih: 390, scale: 0.4333, sw: 844, sh: 390, frame: { x: 75, y: 0, w: 693.3, h: 390 } },
});
const total = (o) => Object.values(o).reduce((n, a) => n + a.length, 0);

assert.equal(total(layoutProblems(clean(), { ZS, tag: "t" })), 0, "a clean snapshot has no problem");

/* the digits of one number, one text each, on one baseline: 4 of 38 units of side-bearing is one line (Scale Bench's 45.28) */
let g = clean(); g.texts.push(text("4", 199.5, 386, 38, 79, { ink: { x: 199.5, w: 38, y: 403.8, h: 42.6 } }), text("5", 233.6, 386, 37, 79, { ink: { x: 233.6, w: 37, y: 403.8, h: 42.6 } }));
assert.equal(layoutProblems(g, { ZS, tag: "digits" }).overlaps.length, 0, "adjacent digits on one baseline are not an overlap");
g = clean(); g.texts.push(text("4", 199.5, 386, 38, 79, { ink: { x: 199.5, w: 38, y: 403.8, h: 42.6 } }), text("5", 215, 386, 37, 79, { ink: { x: 215, w: 37, y: 403.8, h: 42.6 } }));
assert.equal(layoutProblems(g, { ZS, tag: "digits" }).overlaps.length, 1, "digits 60 % on one another still collide");
g = clean(); g.texts.push(text("4", 199.5, 386, 38, 79, { ink: { x: 199.5, w: 38, y: 403.8, h: 42.6 } }), text("5", 233.6, 386, 37, 79, { size: 40, ink: { x: 233.6, w: 37, y: 403.8, h: 42.6 } }));
assert.equal(layoutProblems(g, { ZS, tag: "digits" }).overlaps.length, 1, "two sizes are not one line");
g = clean(); g.texts.push(text("आधा सवा", 110, 225, 280, 40));                       // Hindi line landing on another
assert.equal(layoutProblems(g, { ZS, tag: "hi" }).overlaps.length, 1, "overlap");
g = clean(); g.texts.push(text("एक लंबी पंक्ति", 1100, 300, 200, 40));                    // wider than the work zone's right edge
assert.equal(layoutProblems(g, { ZS, tag: "hi" }).spills.length, 1, "spill out of its zone");
assert.equal(layoutProblems(g, { tag: "hi" }).spills.length, 0, "no zone map (approve): spills are not judged");
g = clean(); g.texts.push(text("far", 1590, 100, 40, 40, { zone: null }));
assert.equal(layoutProblems(g, { ZS, tag: "t" }).offStage.length, 1, "off the stage");
g = clean(); g.texts.push(text("tiny", 100, 600, 60, 20, { size: 20 }));
assert.equal(layoutProblems(g, { ZS, tag: "t" }).small.length, 1, "under the 28-unit floor");
g = clean(); g.controls.push({ id: "k2", role: "button", tab: "0", label: "Key 2", box: { x: 1230, y: 400, w: 90, h: 90 } });
assert.equal(layoutProblems(g, { ZS, tag: "t" }).crowd.length, 1, "two controls overlap");

let p = phoneProblems([{ tag: "m", g: clean() }]);
assert.deepEqual([p.frame.length, p.type.length], [0, 0], "a clean phone frame");
assert.ok(Math.abs(p.minText.px - 32 * 0.4333) < 0.01 && p.minTap.id === "k1", "smallest text and tap target are reported");
g = clean(); g.view.ih = 500;                                                          // Chrome ignored the window size
assert.equal(phoneProblems([{ tag: "m", g }]).frame.length >= 1, true, "a window that is not 844x390 fails");
g = clean(); g.view.sh = 480;                                                          // the page scrolls
assert.equal(phoneProblems([{ tag: "m", g }]).frame.some((x) => /scrolls/.test(x)), true, "page scroll");
g = clean(); g.view.frame = { x: 75, y: 0, w: 693, h: 420 };                           // frame taller than the window
assert.equal(phoneProblems([{ tag: "m", g }]).frame.some((x) => /not wholly/.test(x)), true, "frame cut off");
g = clean(); g.texts[0].size = 24;                                                     // 24 x 0.4333 = 10.4 px
assert.equal(phoneProblems([{ tag: "m", g }]).type.length, 1, "type under 11.5 px on the phone");
assert.equal(PHONE.w, 844); assert.equal(PHONE.h, 390);
console.log("layoutfit: ok");
