/* The picture rules: node lib/images/rules.test.mjs (no browser, no Gemini). Cartoon objects are unchanged byte for byte; a new plan is photo; a figure is a front-facing person with its own caps. */
import assert from "node:assert/strict";
import { buildPrompt, validatePlan, lintPrompt, slotBudget, skinBudget, rawHash, rawKey, sha1, modelsFor, MODELS, STYLE, NEGATIVES, OBJECT_PHOTO_STYLE, REFERENCE_NOTE, BUDGET } from "./rules.mjs";

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
// 6) the object look: a plan made before (an image has `made`) stays cartoon, byte for byte and key for key (sha1s taken before the change)
const CHAP = "soft 3D cartoon, top-down, warm and friendly";
const made = (img) => ({ ...img, why: "w", made: { w: 1 } });
const old = [[CHAP, { key: "piece", object: "milk chocolate piece", kind: "tile", prompt: "One square of milk chocolate." }, "40b6d002987164296ab1613c421f2860a01adb9c", "66925809277930d91b71f3427fe19476fd9838bc"],
  [CHAP, { key: "roti", object: "roti", kind: "disc", prompt: "A round golden roti." }, "eb9b68f53d98b2fa40256a3631e96dec4528c1b5", "036889a525547eeba930584165db00e31323bf07"],
  [CHAP, { key: "ribbon", object: "ribbon", kind: "strip", prompt: "A satin ribbon." }, "3e292d44859fb44cd780465a12696788369a64f8", "2cbebd45e015d69a9616e11b17d40943f154634e"],
  [undefined, { key: "piece", object: "milk chocolate piece", kind: "tile", prompt: "One square of milk chocolate." }, "35efb21aba6a21deb0f075fa57cc1077a895b863", "22f1b7aada42cd8e8037962682d11556607d5291"],
  [undefined, { key: "roti", object: "roti", kind: "disc", prompt: "A round golden roti." }, "2f595c87f25ce8e195a43358bb5468058bfc5d87", "bbfed2720d40eee36986c0e8015be84a1d1cdf81"]];
for (const [style, img, promptSha, key] of old) {
  const v = validatePlan({ style, images: [made(img)] });
  assert.equal(v.images[0].look, "cartoon"); assert.equal(v.plan.look, undefined, "an old plan gained a look field");
  assert.equal(sha1(buildPrompt(v.plan, v.images[0])), promptSha, `cartoon ${img.kind} prompt changed`);
  assert.equal(rawKey(v.plan, v.images[0]), key, `cartoon ${img.kind} key changed`);
}
assert.equal(rawHash({ object: "roti", kind: "disc", style: "s", aspect: "1:1", look: "cartoon" }), sha1("raw|roti|disc|s|1:1"));
// a NEW plan is photo, and says so in the plan it hands back (so the first make writes it and it never flips back)
const nv = validatePlan({ style: CHAP, images: [{ key: "roti", object: "roti", kind: "disc", prompt: "A freshly cooked phulka roti.", why: "w" }] });
assert.equal(nv.images[0].look, "photo"); assert.equal(nv.plan.look, "photo");
assert.equal(validatePlan({ style: CHAP, look: "photo", images: [made(old[1][1])] }).images[0].look, "photo");
assert.equal(validatePlan({ style: CHAP, images: [{ ...made(old[1][1]), look: "photo" }] }).images[0].look, "photo");
assert.equal(validatePlan({ look: "cartoon", images: [{ key: "k", object: "knife", kind: "tile", prompt: "A knife.", why: "w" }] }).images[0].look, "cartoon");   // the action kit
assert.ok(validatePlan({ look: "sketch", images: [] }).errors.some((e) => /look must be/.test(e)));
// a photo prompt: the photo style, no cartoon words (the chapter's style is not sent), every object negative kept
const ph = buildPrompt(nv.plan, nv.images[0]);
assert.ok(ph.startsWith(OBJECT_PHOTO_STYLE) && ph.includes(NEGATIVES) && /Warm colours only/.test(ph) && /no cast shadow/.test(ph));
assert.ok(!/cartoon|3D/i.test(ph), "a photo prompt says cartoon or 3D");
assert.ok(!ph.includes(REFERENCE_NOTE));
// the key: photo differs from cartoon, a reference differs again (keyed by the file's bytes), another reference differs again
const kPhoto = rawKey(nv.plan, nv.images[0]);
assert.equal(kPhoto, rawHash({ object: "roti", kind: "disc", style: CHAP, aspect: "1:1", look: "photo" }));
assert.notEqual(kPhoto, rawHash({ object: "roti", kind: "disc", style: CHAP, aspect: "1:1", look: "cartoon" }));
const rv = validatePlan({ style: CHAP, reference: "assets/refs/roti.png", images: [{ ...nv.plan.images[0] }] });
assert.deepEqual(rv.errors, []); assert.match(rv.images[0].refSha, /^[0-9a-f]{40}$/);
assert.ok(buildPrompt(rv.plan, rv.images[0]).includes(REFERENCE_NOTE));
const kRef = rawKey(rv.plan, rv.images[0]);
assert.notEqual(kRef, kPhoto);
assert.notEqual(kRef, rawHash({ object: "roti", kind: "disc", style: CHAP, aspect: "1:1", look: "photo", ref: sha1("another photograph") }));
// a reference: per image wins over the plan's; a missing or outside file is refused; a cartoon or figure ignores it (a warning)
assert.equal(validatePlan({ style: CHAP, reference: "assets/refs/roti.png", images: [{ ...nv.plan.images[0], reference: null }] }).images[0].refSha, undefined);
assert.ok(validatePlan({ images: [{ ...nv.plan.images[0], reference: "assets/refs/none.png" }] }).errors.some((e) => /reference/.test(e)));
assert.ok(validatePlan({ images: [{ ...nv.plan.images[0], reference: "../class4/pipeline.config.json" }] }).errors.some((e) => /reference/.test(e)));
const cr = validatePlan({ images: [{ ...made(old[1][1]), reference: "assets/refs/roti.png" }] });
assert.equal(cr.images[0].refSha, undefined); assert.ok(cr.warnings.some((w) => /reference is used by a photo/.test(w)));
assert.equal(validatePlan({ reference: "assets/refs/roti.png", images: [fig("child_a", "girl a")] }).images[0].refSha, undefined);
// budgets and models: a photo object 30 KB (a cartoon one 25), the slot 10 KB more a photo object; the better model first for a photo
assert.equal(skinBudget("disc", undefined, "photo"), 30 * 1024); assert.equal(skinBudget("disc", undefined, "cartoon"), 25 * 1024);
assert.deepEqual(validatePlan({ images: [{ ...nv.plan.images[0], maxKB: 30 }] }).errors, []);
assert.ok(validatePlan({ images: [{ ...made(old[1][1]), maxKB: 30 }] }).errors.some((e) => /maxKB/.test(e)));
const three = validatePlan({ images: objs(3) }).images;
assert.equal(slotBudget(three), 90 * 1024); assert.equal(slotBudget([...three, ...validatePlan({ images: figs(2) }).images]), 130 * 1024);
assert.equal(modelsFor(three[0])[0], "gemini-3.1-flash-image"); assert.deepEqual(modelsFor({ kind: "disc", look: "cartoon" }), MODELS); assert.deepEqual(modelsFor({ kind: "figure", look: "photo" }), MODELS);
console.log("rules.test.mjs ok");
