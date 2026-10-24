/* The picture rules: node lib/images/rules.test.mjs (no browser, no Gemini). Objects are unchanged; a figure is a front-facing person with its own caps. */
import assert from "node:assert/strict";
import { buildPrompt, validatePlan, lintPrompt, slotBudget, skinBudget, rawHash, sha1, STYLE, NEGATIVES, BUDGET } from "./rules.mjs";

const obj = (key, object = key) => ({ key, object, kind: "tile", prompt: `One ${object}.`, why: "w" });
const fig = (key, object) => ({ key, object, kind: "figure", prompt: `A girl about eight years old with a plait and a yellow kurta, ${key}.`, why: "w" });
const plan = (images) => ({ style: "soft 3D cartoon", images });

// 1) a figure prompt: front-facing frame, people allowed, no object rules
const f = buildPrompt(plan([]), fig("child_a", "girl a"));
assert.match(f, /facing straight towards the viewer/);
assert.ok(!/no people|no faces|no characters|Warm colours only|directly above|flat-lay/i.test(f), "figure prompt carries an object rule");
assert.match(f, /No text, no digits/);
assert.match(f, /realistic studio photograph of one ordinary school-age child/);
assert.ok(!/soft 3D cartoon/.test(f), "the chapter's cartoon style leaked into a photo figure");   // the default look is a photograph
const c = buildPrompt(plan([]), { ...fig("child_a", "girl a"), look: "cartoon" });
assert.match(c, /soft 3D cartoon illustration/); assert.match(c, /full-length standing character seen from the front/); assert.match(c, /facing straight towards the viewer/);
assert.ok(validatePlan(plan([{ ...fig("a", "girl"), look: "sketch" }])).errors.some((e) => /look must be/.test(e)));
// the look is part of the library key; an object's key is unchanged (no look)
const base = { object: "girl", kind: "figure", style: "s", aspect: "3:4" };
assert.notEqual(rawHash({ ...base, look: "photo" }), rawHash({ ...base, look: "cartoon" }));
assert.equal(rawHash({ object: "Milk  chocolate", kind: "tile", style: "s", aspect: "1:1" }), sha1("raw|milk chocolate|tile|s|1:1"));

// 2) an object prompt is exactly what it was: STYLE + frame + object + NEGATIVES + one-piece
const o = buildPrompt(plan([]), obj("piece", "milk chocolate piece"));
assert.ok(o.startsWith(STYLE) && o.includes(NEGATIVES) && /no hands, no people, no faces, no characters/.test(o) && /Warm colours only/.test(o));
assert.ok(o.includes("Look: soft 3D cartoon.") && o.endsWith("Only one piece: no second piece, no row or grid of pieces, no crumbs, no lines across it."));

// 3) caps: 3 objects + 4 figures pass; a 4th object and a 5th figure fail; figures need distinct objects
const objs = (n) => Array.from({ length: n }, (_, i) => obj(`o${i}`, `thing ${i}`));
const figs = (n) => Array.from({ length: n }, (_, i) => fig(`child_${"abcde"[i]}`, `child ${"abcde"[i]} look`));
const ok = validatePlan(plan([...objs(3), ...figs(4)]));
assert.deepEqual(ok.errors, []);
assert.equal(ok.images.find((i) => i.key === "child_a").aspect, "3:4");
assert.ok(validatePlan(plan(objs(4))).errors.some((e) => /4 object skins/.test(e)));
assert.ok(validatePlan(plan(figs(5))).errors.some((e) => /5 figures/.test(e)));
assert.ok(validatePlan(plan([fig("a", "same girl"), fig("b", "Same  girl")])).errors.some((e) => /share the object/.test(e)));

// 4) budgets: 60 KB for objects plus 20 KB a figure; a figure's own cap is 20 KB, an object's 25 KB
assert.equal(slotBudget([obj("a")]), BUDGET.slot);
assert.equal(slotBudget([...objs(3), ...figs(4)]), BUDGET.slot + 4 * 20 * 1024);
assert.equal(skinBudget("figure"), 20 * 1024);
assert.equal(skinBudget("tile"), 25 * 1024);
assert.equal(skinBudget("figure", 8), 8 * 1024);
assert.ok(validatePlan(plan([{ ...fig("a", "girl"), maxKB: 24 }])).errors.some((e) => /maxKB/.test(e)));

// 5) lint: people words are fine in a figure, a digit and a prop are warned
assert.deepEqual(lintPrompt("A boy with short black hair and a green shirt.", "figure"), []);
assert.equal(lintPrompt("A boy aged 8 holding a roti.", "figure").length, 2);
console.log("rules.test.mjs ok");
