/* The fixed rules every generated picture obeys (docs/IMAGES.md), the budgets, and the price table.
 *
 * A SKIN is the look of an everyday object a tool shares, cuts, counts or measures (a chocolate bar,
 * a round cake). The tool draws the maths itself (the exact equal cuts, the shading, every label) over
 * or from the picture, so THE PICTURE NEVER CARRIES THE MATHS: image models cannot draw ten exactly
 * equal parts or reliable digits, and no check reads pixels.
 *
 * The image agent writes only the short object prompt in <slot>/images.json; the CLI builds the final
 * prompt as  STYLE + kind framing + the agent's prompt + NEGATIVES,  so no picture can skip a rule.
 * Positive wording leads (a model primed with "no grooves" draws grooves): the negatives come last.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { checkThemePlan } from "./theme.mjs";
import { ROOT } from "../core/env.mjs";

/* Gemini's supported aspect ratios for image output (generationConfig.imageConfig.aspectRatio) */
export const ASPECTS = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"];

/* what each kind is cut to, and its size limits (the owner wants SMALL).
 *   tile   ONE piece of the object (a single square of chocolate), cut out with alpha, cropped to its own box; the
 *          tool draws it N times, each stretched to its piece rectangle, so equal widths come from code. Preferred
 *          whenever the object is a row of equal pieces: it keeps the edges, bevel and gloss that make it read.
 *   disc   the WHOLE round object (crust, rim, top-light), cut out with alpha, square; the tool clips it by circle
 *          and sector paths, so the rim shows on every sector's outer arc.
 *   strip  the largest rectangle INSIDE a long object (opaque, no edge): a texture band. Kept, but an interior crop
 *          of a bar loses everything that says "chocolate" (edge, bevel, gloss) and reads as a flat gradient.
 * `cut` names how process.mjs cuts it; `oneSurface` adds the no-cuts negatives (a tile's own panel and bevel are wanted). */
export const KINDS = {
  strip: { aspect: "21:9", px: [720, 72], maxW: 720, maxH: 240, inset: 0.06, cut: "interior", oneSurface: true,
    frame: "The object is one long, straight, flat rectangular bar lying horizontally across the picture, about six times as long as it is wide, with straight parallel long sides and one smooth, unbroken, even top surface from end to end: one solid, smooth slab." },
  disc: { aspect: "1:1", px: [320, 320], maxW: 360, maxH: 360, inset: 0, cut: "cutout", oneSurface: true,
    frame: "The object is perfectly round and seen exactly from straight above, so it appears as a circle, whole and complete, with a clear margin of white all round it." },
  tile: { aspect: "1:1", px: [160, 160], maxW: 200, maxH: 200, inset: 0, cut: "cutout", oneSurface: false,
    frame: "The object is one single small piece, whole and complete, seen exactly from straight above, centred, with a clear margin of white all round it." },
  /* a PERSON the lesson is about (children sharing a roti, a shopkeeper): one standing character, front view, cut out with alpha, portrait.
     Not an object: its own style, frame and negatives (FIGURE_*), outside the 3 object skins, at most MAX_FIGURES_PER_SLOT. */
  figure: { aspect: "3:4", px: [120, 240], maxW: 180, maxH: 300, inset: 0, cut: "cutout", oneSurface: false, figure: true,
    frame: "The picture shows one single person, whole and complete from the top of the head to the shoes, standing upright and facing straight towards the viewer (a front view), arms relaxed at the sides, feet on the ground and legs slightly apart with clear white background visible between them, simple everyday clothes in plain colours (no white and no grey clothes), with a clear margin of white all round. The background is pure white right down to the feet: no floor, no ground, no cast shadow, no reflection." },
};
/* the cutting recipe's version is part of every skin's key: a library skin cut the old way is never served as a hit */
export const CUT_VERSION = 2;
/* a photographic figure's cut (process.mjs: light-neutral haze and enclosed pockets become background); part of a figure's skin key only, so no object skin is re-keyed */
export const FIGURE_CUT = 3;
/* the same for the action kit's TOOL cut (process.mjs OPT.tool: grey is object, finger loops are holes); a skin's key never has it */
export const TOOL_CUT = 3;

/* the mascot's look in words only: naming a mascot, robot or character in a prompt invites the model to draw one */
export const STYLE = "A soft 3D cartoon illustration in the style of a children's animated film: rounded, appealing, clean shapes with smooth soft shading, rich warm colour and a gentle satin sheen (no hard white glare). Exactly one object, seen from directly above (a flat-lay, top-down view), centred, filling most of the frame with a margin of background all round. The background is perfectly plain pure white (#FFFFFF): no floor, no table, no gradient, no texture.";

/* a figure's look (images.json `look`, default "photo", the owner 2026-10-23): a realistic studio photograph of a synthetic child, or the soft 3D cartoon of the object skins seen from the front.
   Neither carries the skin rules' warm-only and no-people lines (those are for objects). `look` is part of the library key (rawHash). */
export const LOOKS = ["photo", "cartoon"];
export const FIGURE_STYLES = {
  photo: "A natural, well-lit, realistic studio photograph of one ordinary school-age child (a synthetic child, not a real or recognisable person), full body from the top of the head to the shoes, standing upright, front-facing, a relaxed friendly smile, fully and modestly clothed in simple everyday clothes (a school uniform or casual clothes), centred and filling most of the frame with a margin all round. Plain pure white seamless studio background (#FFFFFF), soft even lighting, sharp focus, realistic skin and hair: no floor, no gradient, no texture.",
  cartoon: "A soft 3D cartoon illustration in the style of a children's animated film: rounded, appealing, clean shapes with smooth soft shading, cheerful natural colours and a gentle satin sheen (no hard white glare), a friendly neutral expression. Exactly one person, a full-length standing character seen from the front at eye level, centred, filling most of the frame from head to feet with a margin of background all round. The background is perfectly plain pure white (#FFFFFF): no floor, no table, no gradient, no texture.",
};
/* an OBJECT skin's look (the owner 2026-10-24, from a real photograph of a roti): `look` per image, or the plan's `look` for all its objects.
   "photo" is the default for a NEW plan only (no image `made` yet; validatePlan writes plan.look "photo" so it stays photo after its first make);
   a plan made before keeps "cartoon" (STYLE + the chapter's style), so nothing already made is re-keyed or re-made. A photo never gets the chapter's
   `style` (a cartoon look would contradict it) and keeps every object negative. Its key carries `look:photo` (and the reference's sha1); a cartoon key is unchanged. */
export const OBJECT_PHOTO_STYLE = "A real, unretouched studio photograph, not an illustration and not a render: one everyday object photographed from directly above (a flat-lay) in natural soft daylight from one side, sharp focus across the whole object, true-to-life colour and texture with fine real surface detail (char spots, blisters, flakes, seeds, grain, a soft satin sheen where the object has one) and slightly imperfect real-world edges. Exactly one object, centred, filling most of the frame with a margin of background all round. The background is perfectly plain pure white (#FFFFFF), as for a cut-out: no floor, no table, no gradient, no texture, no cast shadow.";
export const REFERENCE_NOTE = "The attached picture is a reference photograph: match its realism, lighting and texture; do not copy its composition or any text.";
export const FIGURE_NEGATIVES ="Strict rules: exactly one person and nothing else, fully and modestly clothed, not a celebrity or any recognisable real person. No text, no digits, no numbers, no letters, no logos, no labels, no brand marks, no writing on the clothes. Empty hands relaxed at the sides: no food, no plate, no objects, no tools, no bag, no props of any kind. No second person, no animals, no mascot, no speech bubble, no sign. No white clothes (they would vanish into the background). No shadow on the ground, no floor, no scenery.";

export const NEGATIVES = "Strict rules: exactly one object and nothing else. No text, no digits, no numbers, no letters, no logos, no labels, no brand marks. No wrapper, no foil, no packaging, no plate, no board, no knife, no hands, no people, no faces, no characters. No shadow outside the object. Warm colours only (browns, creams, caramels, golden oranges); no blue, no green, very little red.";
/* for a whole the tool cuts itself (strip, disc): equal widths are the lesson, so the picture has no divisions */
export const ONE_SURFACE = "No cut lines, no grooves, no segments, no squares, no score marks, no dividing lines, no embossed pattern, no slices and no separate pieces: the surface is one piece.";
/* for a single piece (tile): its own bevel and panel are wanted, a second piece or a grid is not */
export const ONE_PIECE = "Only one piece: no second piece, no row or grid of pieces, no crumbs, no lines across it.";

/* the ACTION KIT (runtime/actionkit.json, `node cli.mjs actionkit`, docs/IMAGES.md §11): the TOOLS that perform a tool's act
   (a knife, scissors, a ruler, a pencil, an eraser), made once and shared by every tool. The skin rules above are for the object
   a child shares (they forbid a knife and cool colours); a kit picture keeps STYLE and the chapter's look, and these instead. */
export const KIT_FRAME = "The object is one whole tool, complete, lying flat, seen exactly from straight above, centred, with a clear margin of white all round it.";
export const KIT_NEGATIVES = "Strict rules: exactly one object and nothing else. No text, no digits, no numbers, no letters, no marks, no scale, no logos, no labels, no brand marks. No packaging, no plate, no board, no food, no hands, no people, no faces, no characters. No shadow outside the object.";
export const kitPrompt = (style, img) => [STYLE, style ? `Look: ${String(style).trim().replace(/\.?$/, ".")}` : "", KIT_FRAME,
  `The object: ${String(img.prompt).trim().replace(/\.?$/, ".")}`, KIT_NEGATIVES].filter(Boolean).join(" ");

/* budgets count the data-URI length, which is what lands in images.tsx; the WebP file is about 3/4 of it.
   An image may ask for less (`maxKB` in images.json), never more. */
export const BUDGET = { skin: 25 * 1024, photo: 30 * 1024, slot: 60 * 1024, photoShare: 10 * 1024, figure: 20 * 1024, figureShare: 20 * 1024 };
const isPhotoObject = (i) => i.kind !== "figure" && i.look === "photo";
/* a slot's budget: 60 KB for its object skins, plus 10 KB for each photo object skin (3 photos: 90 KB) and 20 KB for each figure (a photograph compresses worse than a cartoon) */
export const slotBudget = (images = []) => BUDGET.slot + BUDGET.photoShare * images.filter(isPhotoObject).length + BUDGET.figureShare * images.filter((i) => i.kind === "figure").length;
/* one picture's cap: 25 KB for a cartoon object skin, 30 KB for a photo one, 20 KB for a figure; an image may ask for less (`maxKB`), never more */
const capOf = (kind, look) => (kind === "figure" ? BUDGET.figure : look === "photo" ? BUDGET.photo : BUDGET.skin);
export const skinBudget = (kind, maxKB, look) => Math.min(capOf(kind, look), maxKB ? Math.round(Number(maxKB) * 1024) : Infinity);
export const MAX_SKINS_PER_SLOT = 3;   /* OBJECT skins only; figures are counted apart */
export const MAX_FIGURES_PER_SLOT = 4;  /* one per distinct person the brief shows (children, a shopkeeper), each looking clearly different */   /* a third only for a tool that names different wholes (ch 8 C4: chocolate bar, ribbon, chapati) */
export const MAX_ATTEMPTS = 2;          /* billed generations per picture per run, a rejected picture included */
export const CONCURRENCY = 3;
export const Q_START = 0.78;

/* cheapest image model first; the next one is tried only when the first errors (quota, outage, refusal of the request) */
export const MODELS = ["gemini-2.5-flash-image", "gemini-3.1-flash-image"];
/* a photo object's own order: the better model FIRST (trial 2026-10-24, roti / pizza / chocolate bar: 3.1 drew real char, crust and texture where 2.5
   drew a clean but even, polka-dot roti; with the owner's reference roti it matched the photograph). 2.5 only when 3.1 errors. `--model` overrides both. */
export const PHOTO_MODELS = ["gemini-3.1-flash-image", "gemini-2.5-flash-image"];
export const modelsFor = (img) => (isPhotoObject(img) ? PHOTO_MODELS : MODELS);

/* USD per generated image, interactive lane (estimates: 2.5 flash image is 1290 output tokens at $30 per million;
   the others from the Tool_Pipeline notes). The batch lane is half price. Unknown models are costed high on purpose. */
export const PRICE = {
  "gemini-2.5-flash-image": 0.039,
  "gemini-3.1-flash-lite-image": 0.034,
  "gemini-3.1-flash-image": 0.067,
  "gemini-3.1-flash-image-preview": 0.067,
  "gemini-3-pro-image": 0.134,
  "gemini-3-pro-image-preview": 0.134,
};
export const BATCH_DISCOUNT = 0.5;
export const price = (model, lane = "inline") => (PRICE[model] ?? 0.08) * (lane === "batch" ? BATCH_DISCOUNT : 1);

export const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
export const sha1 = (s) => crypto.createHash("sha1").update(String(s)).digest("hex");

/* the raw picture is keyed WITHOUT its pixel size, so re-cutting it at another size never bills again;
   the prompt is not in the key either: two slots asking for the same object, kind and style share it */
/* `look` is in a figure's key always, in an object's key only when it is not "cartoon" (so every cartoon object keeps the key it was made under);
   `ref` is the reference photograph's sha1 (a photo object with a `reference`) */
export const rawHash = ({ object, kind, style, aspect, look, ref }) => sha1(["raw", norm(object), kind, norm(style), aspect,
  ...(look && (kind === "figure" || look !== "cartoon") ? [`look:${look}`] : []), ...(ref ? [`ref:${ref}`] : [])].join("|"));
/* the one way every caller keys a validated image (validatePlan fills look and refSha) */
export const rawKey = (plan, img) => rawHash({ object: img.object, kind: img.kind, style: plan.style, aspect: img.aspect, look: img.look, ref: img.refSha });
export const skinHash = (raw, { kind, px, inset, maxKB, tool }) => sha1(["skin", `cut${CUT_VERSION}`, (KINDS[kind] || {}).cut, raw,
  `${px[0]}x${px[1]}`, Number(inset).toFixed(3), maxKB || "", ...(tool ? [`tool${TOOL_CUT}`] : []), ...(kind === "figure" ? [`fig${FIGURE_CUT}`] : [])].join("|"));

export function buildPrompt(plan, img) {
  const k = KINDS[img.kind];
  /* the chapter's `style` is the object skins' cartoon look: it is left out of a photographic figure or object (it would contradict the photograph) */
  if (k.figure) return [FIGURE_STYLES[img.look] || FIGURE_STYLES.photo, plan.style && img.look === "cartoon" ? `Look: ${String(plan.style).trim().replace(/\.?$/, ".")}` : "", k.frame,
    `The person: ${String(img.prompt).trim().replace(/\.?$/, ".")}`, FIGURE_NEGATIVES].filter(Boolean).join(" ");
  if (img.look === "photo") return [OBJECT_PHOTO_STYLE, k.frame, `The object: ${String(img.prompt).trim().replace(/\.?$/, ".")}`,
    img.refSha ? REFERENCE_NOTE : "", NEGATIVES, k.oneSurface ? ONE_SURFACE : ONE_PIECE].filter(Boolean).join(" ");
  return [STYLE, plan.style ? `Look: ${String(plan.style).trim().replace(/\.?$/, ".")}` : "", k.frame,
    `The object: ${String(img.prompt).trim().replace(/\.?$/, ".")}`, NEGATIVES, k.oneSurface ? ONE_SURFACE : ONE_PIECE].filter(Boolean).join(" ");
}

/* words in the agent's own prompt that invite the model to draw the maths, or text ("piece" and "square" describe
   a tile's one piece, so they are allowed there) */
const INVITES = /\b(ten|tenths?|halves|half|quarters?|pieces?|slices?|segments?|squares?|cut|cuts|divided|dividing|sections?|parts?|grid|lines?|label(?:led)?|numbers?|written|text)\b/gi;
const PROPS = /\b(holding|holds|carrying|carries|plate|food|roti|chapati|bag|basket|book|ball)\b/gi;
export function lintPrompt(text, kind) {
  const w = [];
  if (kind === "figure") {   /* people words are the point; a prop is not (the maths and its objects are drawn by the tool) */
    if (/\d/.test(text)) w.push("has a digit (the picture must carry no number)");
    const props = [...new Set((String(text).match(PROPS) || []).map((x) => x.toLowerCase()))];
    if (props.length) w.push(`has ${props.map((h) => `"${h}"`).join(", ")}: a figure holds nothing (the objects are separate skins)`);
    if (String(text).length > 400) w.push("is long; a figure prompt is one or two plain sentences about the person");
    return w;
  }
  if (/\d/.test(text)) w.push("has a digit (the picture must carry no number; say the size in words or not at all)");
  const ok = kind === "tile" ? /^(pieces?|squares?)$/ : /^$/;
  const hits = [...new Set((String(text).match(INVITES) || []).map((x) => x.toLowerCase()))].filter((h) => !ok.test(h));
  if (hits.length) w.push(`has ${hits.map((h) => `"${h}"`).join(", ")}: these invite the model to draw cuts or text, and the tool cuts the object itself`);
  if (String(text).length > 400) w.push("is long; a skin prompt is one or two plain sentences about the object");
  return w;
}

/* images.json -> { plan, images (defaults filled), errors, warnings } */
export function validatePlan(plan, slotId) {
  const errors = [], warnings = [];
  if (!plan || typeof plan !== "object") return { errors: ["images.json is not an object"], warnings, images: [] };
  if (slotId && plan.slot && plan.slot !== slotId) errors.push(`images.json is for ${plan.slot}, not ${slotId}`);
  const list = Array.isArray(plan.images) ? plan.images : [];
  if (!Array.isArray(plan.images)) errors.push("images.json needs an \"images\" array (empty when the slot needs no skin)");
  /* the object look: the plan's own, else "photo" for a NEW plan (nothing made yet) and "cartoon" for one made before; a new plan
     gets look "photo" written into the returned plan, so the first make records it in images.json and it never flips back */
  const isNew = !list.some((i) => i && i.made);
  if (plan.look !== undefined && !LOOKS.includes(plan.look)) errors.push(`look must be one of ${LOOKS.join(", ")}`);
  const planLook = plan.look || (isNew ? "photo" : "cartoon");
  if (!plan.look && isNew) plan = { ...plan, look: "photo" };
  const nFig = list.filter((i) => i && i.kind === "figure").length, nObj = list.length - nFig;
  if (nObj > MAX_SKINS_PER_SLOT) errors.push(`${nObj} object skins; at most ${MAX_SKINS_PER_SLOT} a slot (one skin is reused for every piece and state; figures are counted apart)`);
  if (nFig > MAX_FIGURES_PER_SLOT) errors.push(`${nFig} figures; at most ${MAX_FIGURES_PER_SLOT} a slot (one per distinct person shown)`);
  const figSeen = new Set();
  const seen = new Set();
  const images = list.map((raw, i) => {
    const img = { ...raw };
    const at = `images[${i}]${img.key ? ` "${img.key}"` : ""}`;
    if (!/^[a-z][a-z0-9_]{0,23}$/.test(String(img.key || ""))) errors.push(`${at}: key must be a short lower-case name like "bar" (what the tool calls <Skin name=...>)`);
    if (seen.has(img.key)) errors.push(`${at}: key used twice`);
    seen.add(img.key);
    if (!KINDS[img.kind]) errors.push(`${at}: kind must be one of ${Object.keys(KINDS).join(", ")}`);
    const K = KINDS[img.kind] || KINDS.tile;
    img.aspect = img.aspect || K.aspect;
    img.look = img.look || (img.kind === "figure" ? "photo" : planLook);
    if (!LOOKS.includes(img.look)) errors.push(`${at}: look must be one of ${LOOKS.join(", ")}`);
    /* a reference photograph (the image's own `reference`, else the plan's): sent with the prompt and keyed by its bytes, for a photo object only */
    const ref = img.reference !== undefined ? img.reference : plan.reference;
    delete img.refFile; delete img.refSha;
    if (ref && isPhotoObject(img)) {
      const abs = path.resolve(ROOT, String(ref));
      if (!abs.startsWith(ROOT + path.sep) || !/\.(png|jpe?g|webp)$/i.test(abs) || !fs.existsSync(abs)) errors.push(`${at}: reference "${ref}" must be a png, jpg or webp file under the class folder (e.g. assets/refs/roti.png)`);
      else { img.refFile = abs; img.refSha = crypto.createHash("sha1").update(fs.readFileSync(abs)).digest("hex"); }
    } else if (img.reference) warnings.push(`${at}: reference is used by a photo object skin only; ignored`);
    if (!ASPECTS.includes(img.aspect)) errors.push(`${at}: aspect ${img.aspect} is not one Gemini makes (${ASPECTS.join(", ")})`);
    img.px = Array.isArray(img.px) && img.px.length === 2 ? img.px.map(Number) : [...K.px];
    if (!img.px.every((n) => Number.isInteger(n) && n >= 16)) errors.push(`${at}: px must be [width, height] in whole pixels`);
    if (img.px[0] > K.maxW || img.px[1] > K.maxH) errors.push(`${at}: px ${img.px.join("x")} is over the ${img.kind} limit ${K.maxW}x${K.maxH}`);
    if (img.kind === "disc" && img.px[0] !== img.px[1]) errors.push(`${at}: a disc skin is square (the tool clips it to a circle)`);
    const capKB = capOf(img.kind, img.look) / 1024;
    if (img.maxKB !== undefined && !(Number(img.maxKB) > 0 && Number(img.maxKB) <= capKB)) errors.push(`${at}: maxKB must be above 0 and at most ${capKB}`);
    /* the object text is the library key (rawHash): two figures of one slot with the same words would be one picture */
    if (img.kind === "figure") { const n = norm(img.object); if (figSeen.has(n)) errors.push(`${at}: two figures share the object "${img.object}"; each person needs its own words (hair, skin tone, clothes) so the library keeps them apart`); figSeen.add(n); }
    img.inset = Number.isFinite(Number(img.inset)) ? Number(img.inset) : K.inset;
    if (img.inset < 0 || img.inset > 0.25) errors.push(`${at}: inset ${img.inset} is outside 0 to 0.25`);
    if (!String(img.object || "").trim()) errors.push(`${at}: object is empty (name the everyday object, e.g. "milk chocolate bar"; for a figure, the person with the look that tells them apart)`);
    if (!String(img.prompt || "").trim()) errors.push(`${at}: prompt is empty (one or two plain sentences about the object; the CLI adds the rules)`);
    if (!String(img.why || "").trim()) warnings.push(`${at}: no "why" (quote the brief's words that ask for this object)`);
    for (const w of lintPrompt(img.prompt || "", img.kind)) warnings.push(`${at}: prompt ${w}`);
    return img;
  });
  const th = checkThemePlan(plan, images);
  errors.push(...th.errors); warnings.push(...th.warnings);
  return { plan, images, errors, warnings };
}
