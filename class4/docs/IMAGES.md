# IMAGES: real objects instead of plain blocks (skins)

A tool draws its maths as plain SVG. The **image agent** (`.claude/agents/<agentPrefix>-image-agent.md`; the prefix is the class's config key `agentPrefix`)
asks for a small picture of the real object a drawn thing stands for (a chocolate bar, a round cake), and the tool wears it as a **skin**: the tool's own geometry (the exact
equal cuts, the shading, the labels, the counts) is drawn in code over the picture, or clipped from it.

**The default, for every class, chapter and slot (owner's rule, 2026-10-13): real objects, not plain blocks.** Wherever a tool draws a
THING the child shares, cuts, counts, pours, weighs, measures, lifts, drags or builds with (a strip, bar, block, tile, piece, cell,
counter, bead, sheet, jug, pan, bag, ribbon), that thing is a **real everyday object that matches what is inside the tool and what
the child does with it**: cut or share, a chocolate bar, a roti, a cake; count or group, buttons, beads, sweets; pour, a jug of milk;
weigh, a bag of rice on a kitchen scale; measure a length, a ribbon or a pencil. The image pass (runbook step 5c) therefore runs for
**every tool**, whether or not a prompt says so, and its question is **"which real object?"**, not "does this deserve a skin?". A plain
coloured block is the exception: §2 lists the only reasons, and the agent names the reason for every plain element in its report.
Nobody has to ask for this in a prompt; a builder never ships a plain block where the pass made an object for it.

**The picture never carries the maths.** Image models cannot draw ten exactly equal parts or reliable digits, and
no check reads pixels. A skin is the object's look and nothing else.

**A runtime with `Skin` first.** `Skin` is in the head runtime (r29+; the head of a code base that has it). A chapter has it only once it is
pinned to a snapshot frozen from such a head: a chapter pinned before needs a deliberate `runtime freeze` + `runtime pin --ch N` on the
user's word; one fetched new gets it with its first pin. On an older pin a tool must not draw `<Skin>` (it would not exist), and
`images.tsx` is only made ahead. The keypad THEME below is written only for a slot whose pinned runtime reads one (`caps.theme`).

## 1. What a skin is, and is not

| a skin is | a skin is not |
|---|---|
| ONE piece of the object (a square of chocolate) or the WHOLE round object (a cake), cut out with alpha | a scene, a background, a character, the mascot |
| one picture reused for every piece and every state (the tool draws it N times, or clips it) | one picture per piece, per phase or per answer, or a picture of N pieces |
| warm (browns, creams, caramels, golden oranges) so the tool's blue and green tints read on it | red, blue or green (they fight the content colours) |
| small: a data URI of 1 to 25 KB (a piece at most 12 KB) | a photo, a PNG, anything over 25 KB |

## 2. Which elements get an object, and which stay plain

Go through **every visual element the tool draws** (the strip, each piece, the pan, the jug, the counters, the sheet) and give each
one of two answers. **The default is a real object** (a skin) whenever all of these hold:
- the element stands for a real thing or a quantity of real things (a whole to share, pieces, a count of objects, a container, a
  length, a weight), whatever plain shape it has now (a strip, a bar, a grid cell, a counter, a block);
- the child acts on it, or it carries the lesson's picture (shares, cuts, counts, pours, weighs, measures, lifts, drags);
- the maths stays in code on top (equal pieces, sectors, shading, a level, a count, every mark and digit).

The object is chosen to **match what is inside the tool and what the operation is** (§3), even when the brief names none: a
"strip the child cuts" is a chocolate bar, a share bar a ribbon or a tray, "ten counters" ten buttons or sweets, a weighing tool a
kitchen scale with a bag on the pan.

**A round object is drawn round** (a chapati, a roti, a pizza, a cake): its skin goes over a DISC and is clipped per wedge when it is cut, never stretched
over a strip (PATTERNS §17, the owner 2026-10-17). A ribbon, a bar or paper stays a strip.

**Plain is right only for these** (name the reason for each plain element in the report):
- **the marks and digits themselves**: digit cards, place-value columns and their headings, number-line ticks, the numerals and hands
  of a clock, the display and dial of a scale, a ruler's marks, coin and note values, graph axes. The object that HOLDS the marks may
  still be a skin with its face left BLANK and the marks drawn over it in code (a kitchen scale with an empty display, a jug with no
  scale lines): prompt it "blank face, no marks, no numbers"; if the picture shows any mark or digit, one re-make, then plain;
- **the subject of a geometry lesson** (an angle, a polygon, a net, a circle's centre and radius): the shape is what is studied;
- **people, hands, characters, the mascot**, a background, decoration;
- a piece **too thin to show a picture** (a hundredth, a thousandth sliver) or beyond the **40 skins a screen** the `skins` check
  allows: skin the pieces the child acts on and draw the rest plain (a hundred-cell grid: skin the whole it comes from and the pieces
  lifted out of it; a "sheet" kind or a higher cap is an open question, BUILD_CARD §8);
- a skin that would **teach a wrong model** (say what: a chocolate tile behind a place-value digit makes every digit look like one
  equal piece of a whole).

Any other plain block is a fault of the pass, not a decision. `"images": []` is right only when every element is one of the above,
and the report says which, element by element.

## 3. Choosing the object: the brief's words decide

Read these fields of `brief.md`, in this order: **Description**, **For the child**, **Look**, **Student controls**,
**Stage** (what the child's finger acts on). Do **not** choose from **Teaching notes** (the teacher's desk activity:
"cut a paper strip" there is not the screen), **Textbook** (the book's examples) or **Context**.

| the words say | skin | kind |
|---|---|---|
| chocolate, a bar to share, break into pieces | one square piece of milk chocolate | tile |
| "a strip" the child cuts into equal parts, no material named | one square piece of milk chocolate (say why) | tile |
| "paper strip", fraction strip, bar model, tape diagram | one square piece of milk chocolate (a share bar), or a satin ribbon for a length (say why) | tile or strip |
| number strip of digit cards, a place-value chart | none: drawn (digits are the maths) | - |
| a tray of sweets cut into equal pieces (barfi, chikki) | one piece of barfi or chikki | tile |
| tiles, a floor, a hundred-chart or a grid of equal cells | one tile or square of the object (terracotta, a biscuit, a barfi) per cell, up to 40 on a screen | tile |
| counters, dots, beads, tokens, "n of them", an array | one button, bead or sweet | tile |
| weigh, a scale, "kg", "g", a weight on a pan | a kitchen scale body with a BLANK display (drawn once) and one bag of rice or sugar on the pan; the display and every number in code | tile |
| a jug, glass, bottle, "pour", litres | a jug or glass with NO scale lines (drawn once); the level and the marks in code | tile |
| a length, "measure", ribbon, rope, string, a pencil | a satin ribbon or a jute rope (strip), or a pencil (tile); a ruler's marks are code | strip or tile |
| cake, slices, a circle cut into equal sectors | round golden sponge cake with a crust ring | disc |
| pizza | round golden sponge cake (pizza is red, with toppings and slice lines) | disc |
| roti, chapati, paratha (shared, torn) | roti | disc |
| ribbon, rope, string, a length cut into parts | a satin ribbon or a jute rope, warm colour | strip |
| coins, notes, price tags, clock, ruler, calendar, money | none: drawn (their value or marks are the digits) | - |

Start from this table and extend it in the same spirit; a new row is a one-line addition here. **Where the words name no object,
still choose one**: the everyday object a child of this age would cut, count, pour, weigh or measure for exactly this content and
operation, and say why in the image's `why`. "No object named" is never a reason for plain blocks.

**Prefer the smallest set.** One skin reused for every piece and state; **at most 3 skins a slot** (the CLI
refuses a fourth; a second or third only when the tool names different wholes, e.g. ch 8 C4's chocolate bar, ribbon and chapati). Two slots asking for the same object, kind and style share one generated picture (a library
hit costs nothing), so keep the `object` and `style` words the same across a chapter.

## 4. The kinds (how the CLI cuts the picture)

- **tile** (preferred whenever the object is a row of equal pieces): ONE piece, whole, cut out with alpha
  (background flood-filled away, crumbs dropped, the edge eroded two to four source pixels and softened, so no
  white fringe survives), cropped to its own box with a one-pixel margin, fitted inside `px` (at most 200).
  The tool draws it N times, each stretched to its piece rectangle, so **equal widths come from code**.
- **disc**: the WHOLE round object (crust, rim, top-light), cut out with alpha, square, at most 360. The tool clips
  it by its circle and sector paths, so the crust shows on every sector's outer arc.
- **strip** (kept, rarely right): the largest rectangle INSIDE a long object, inset 6 %, opaque. **Why it loses**:
  what makes a bar read as chocolate is its edge, bevel and gloss; an interior crop throws all three away and
  leaves a flat brown gradient (a decimals tool's first `bar`, 2026-10-07). Use it only for a texture that is the
  same everywhere (a ribbon, a rope).

## 5. The plan file: `<slot>/images.json` (written by the agent, read by the CLI)

```json
{ "slot": "M1.S1.T2.C4.2D1", "style": "soft 3D cartoon, top-down, warm and friendly",
  "theme": { "preset": "chocolate" }, "themeWhy": "chocolate pieces: chocolate keys, a raspberry Enter ...",
  "images": [ { "key": "piece", "object": "milk chocolate piece", "kind": "tile", "aspect": "1:1", "px": [160, 160],
                "maxKB": 12, "why": "Description 'Cut a strip into ten equal parts' ...", "prompt": "One single square of milk chocolate ..." } ] }
```

- `key`: what the tool calls it (`<Skin name="piece">`), lower case, short.
- `aspect`: one Gemini makes (1:1, 3:2, 4:3, 16:9, 21:9 ...): 1:1 for a tile or a disc, 21:9 for a strip.
- `px`: the largest the skin may be. A tile keeps its own aspect inside it; a disc is square; a strip is exactly
  `px` (match the box the tool draws: `<Skin>` slices, so a 6:1 strip in a 15:1 box wastes 60 % of its rows).
- `maxKB` (optional): a smaller budget than 25 KB for this skin.
- `prompt`: one or two plain sentences about the object: what it is, its warm colour, its surface, its edge.
  **The CLI adds every rule** (style, top-down view, plain white background, the negatives in
  `lib/images/rules.mjs`; for strip and disc also "no cut lines, segments, slices", for a tile "only one piece");
  do not repeat them. Lead with what the object IS; a model told "no grooves" draws grooves. No digits, no number
  words, no "slices, cut, ten, parts, segments, lines" (the CLI warns; "piece" and "square" are fine in a tile),
  no mascot, robot or character names (the model would draw one).
- `style`: shared by the chapter; it is part of the library key, so keep it identical across slots.
- After a run the CLI adds `made` to each image: the final `w`, `h`, WebP `bytes`, data-URI `uriBytes`, `q`.

## 6. Sizes, money, the library

- **Budgets** (counted on the data URI, which is what lands in `images.tsx`): 25 KB a skin (or its `maxKB`), 60 KB a
  slot. WebP from q 0.78 down, then 10 % smaller at a time; Chrome's ICC profile (456 bytes) is stripped.
- **Automatic rejects** (never emitted): no object found; a cut-out mostly empty, or more than 15 % near-white
  inside it (a white object or background left); an interior crop with more than 2 % near-white or reaching the
  background; almost no variance (flat). Warnings: a white fringe on the edge, the object touching the picture's
  edge, cool colours over 10 %, a non-white background, an upscale, a disc not round from above.
- **Models**: `gemini-2.5-flash-image` first (about $0.039 a picture), `gemini-3.1-flash-image` only when it errors
  (about $0.067). `gemini-3.1-flash-lite-image` (about $0.034) exists: `--model` names it for one run.
- **Batch** (proved 2026-10-07: two jobs, each done in about 3 minutes): `images make --ch N --batch` sends every
  missing picture of the chapter as ONE Gemini batch job at half price; `images batch status --ch N`, then
  `images batch apply --ch N`. Whatever a batch did not return is made inline by `images make --ch N`.
- **Never billed twice**: raw pictures are cached in `.images-cache/raw/<hash>.png` (keyed by object + kind + style
  + aspect, not by size), so re-cutting is free; skins live in `assets/skins/<hash>.webp` + `index.json` (who uses
  each). `--force` re-makes a picture and keeps the old one as `<hash>.prev.png`.
- **At most 2 billed attempts** a picture a run (a rejected picture is kept as `<hash>.rejectedN.png`).
- **The ledger** `.images-cache/ledger.json`: one row per billed call (model, lane, key, bytes, estimated USD,
  tokens, time). `images status` prints the total. A chapter of eleven slots, most skins shared, is about 4 to 10
  new pictures: $0.08 to $0.20 by batch.

- **Shared with the sibling classes the config lists, read-only** (`pipeline.config.json` `skinLibraries`, e.g. `["assets/skins", "../class<M>/assets/skins"]`; default none; `lib/images/library.mjs`): a skin or raw picture missing in this class is
  looked up by the same hash in `<sibling>/assets/skins` and `<sibling>/.images-cache/raw` before anything is billed,
  so the same chocolate piece or cake is never paid for twice across classes (`images list` shows every library).
  Nothing is written there: a new skin, a re-cut and every ledger row go to this class. Same object, kind, style and
  aspect as the sibling = a free raw (re-cut at any size); the same `px`, `inset` and `maxKB` too = a free library hit.

## 7. The contract with tools

- `<slot>/images.tsx` is **generated** (`node cli.mjs images make`), never edited, one entry per line:
  `const TOOL_IMAGES: Record<string, string> = { "piece": "data:image/webp;base64,...", };` and, when a theme
  resolved, one line `const TOOL_THEME: any = {...};` (§8). Re-running `images make` rebuilds it from the library
  for $0.
- The runtime supplies `<Skin name x y w h clip opacity />` (an `<image data-role="skin">`, clipped by the tool's
  own clipPath). **Never write `<image>` in tool.tsx.**
- **Fallback first**: the tool draws its plain vector shape, then `<Skin>` over it. A missing key (not made yet,
  rejected, a host that blocks `data:`) draws nothing and the plain shape shows; the tool works either way.
- A **tile** is drawn once per piece, stretched to that piece's rectangle (equal rectangles in code = equal pieces).
  A **disc** is drawn once into the circle's box and clipped by the circle and each sector path.
- The tool draws **on top**, in code: the outline, the equal cuts (near-black), the shading, every label and count.
  A shaded piece is a deep-blue or green tint over the skin (about 0.72), following the piece's own shape, never a
  different picture; an unshaded piece is the skin itself. The tint changes the hue far more than the luminance
  (the sheet prints the contrast), so the written label (Given, Answer) carries the reading, never colour alone.
  **On a DARK skin (milk chocolate, a maroon ribbon) the tint alone is not enough** (class 5 ch 6, the owner 2026-10-17): blue
  on chocolate measured 1.0-1.4:1 in brightness and vanishes on a washed-out board. There an uncounted piece wears a pale cream
  wash over the skin (the object still shows) and a counted piece a deep blue, at least 3:1 apart in luminance, with the dark
  outline readable on both. Measure it on the built sheet, not on the image sheet.
- No digit, letter or label is ever in a picture.

- `check` proves it (CHECKS.md): `skin-keys` (every `<Skin name>` has a picture in `images.tsx`), `skins` (all on the
  working area, at most 40 on a screen) and `skins-fallback` (with `?noskins=1` the same plain shapes draw). A tool
  with no `<Skin>` gets none of these rows.
- `images.tsx` builds between `voice.tsx` and the tool (`sources()`), so it travels inside the ported tool;
  `clean` keeps `images.tsx` and `images.json` and drops `images-preview.png`.

## 8. Keypad theme (the controls follow the picture)

The runtime (r31) colours the digit keys, the Enter / Answer / Start keys, the rub out / Close / point keys, the
answer panel and the answer box's edge from a THEME, so the object the child is sharing reaches the keys they
press (the owner's complaint was a pale keypad). It reads `tool.THEME` first (a tool's own override), else the
`TOOL_THEME` that `images make` emits into images.tsx (one JSON line after `TOOL_IMAGES`), else nothing (the
chrome's own keys). **A tool never hard-codes the theme**; it comes with the skins, from the image pass.

`{ key, enter, soft: [top, bottom, edge, ink], panel: [top, bottom], slot: edge }`: key = digit keys, enter =
Enter, Answer, Start; soft = rub out, Close, point; panel = the answer panel's gradient; slot = the answer box edge.

**The agent chooses it from the object** and writes it in images.json with a one-line `themeWhy`:
- `"theme": { "preset": "chocolate" }`: a preset from `lib/images/theme.mjs`: `chocolate` (milk-chocolate keys,
  a berry-bubblegum Enter `#E0408F`/`#BE1F78`, butter-caramel rub out, cream-caramel panel; the owner's pick for
  ch 5), `cake` (cake, roti, pizza base, biscuit: toasted-crust keys, strawberry-pink Enter), `ribbon` (golden
  satin keys, rose-pink Enter), `juice` (orange keys with dark ink, watermelon-pink Enter), `paper` (kraft keys,
  magenta-marker Enter). No Enter is red (the no-red rule) or violet (violet is an added zero in decimals);
- `"theme": { "derive": "piece" }`: derived from that skin's mean colour (keys in the object's own hue, darker, and
  moved just clear of the red band for a red object; Enter the first of berry 328, grape 275, teal 178, sky 205 at
  least 25 degrees from the object and from the content colours blue, green, amber, vermilion and violet; a butter
  soft key; a very light panel of the object's hue);
- an explicit full palette, when nothing fits.
The logic of every theme: keys in the **object's own colour family**; Enter a **joyful contrasting accent that is a
treat of the same world** (chocolate and raspberry); soft keys a light butter or cream; the panel a very light tint.
No `theme` but skins: the CLI derives one from the first skin and says so (a theme always follows an image).

**No skin: no `theme` is written, and the runtime's standard `DEFAULT_THEME` applies** (class 4 r23, class 5 r55 and later): the chocolate
keys and the berry Enter, so every start page and every Enter / Answer / Start key is in the same berry family and never the chrome's
grey accent (the owner, 2026-10-13: a start page with a grey Start key beside tools with a berry one). A pinned runtime without
`DEFAULT_THEME` (`grep -c DEFAULT_THEME runtime/frozen/<rN>/runtime.tsx`) keeps the chrome's own keys for a tool with no skin.
`check`'s `start-page` row fails a Start key that is grey, pale or red on a runtime that has it.

**The validator** (`validateTheme`; `images make` refuses to write a theme that fails, with the reasons): each tone's
ink at least 4.5:1 against the mean of its two face colours; the key face at least 1.6:1 off the panel; key and
enter faces saturation at least 0.35 (never pale); Enter's hue at least 20 degrees from the keys'; the panel's
luminance at least 0.6 (the white answer box reads on it); the answer box edge at least 3:1 on white; and **the
no-red rule**: no face, edge, panel or box-edge colour may read as red (check.mjs `isRed`: hue 345 to 15,
saturation over 0.5, lightness 0.25 to 0.75, with a 3-degree margin on the hue), because the keypad is on screen
after a miss (`wrong-is-unmarked`) and a red key reads as "error" to a child. (The first chocolate Enter, a
raspberry `#E5486B` at hue 348, failed this in all four phases.)
`images sheet` draws a mini answer panel, keypad, Answer and Close keys in the theme beside the skins, with these
numbers. A chapter has the theme when its pinned runtime reads one (`grep -c TOOL_THEME runtime/frozen/<rN>/runtime.tsx`: class 4 from r22 on; r21 and older do not, and an older pin gets no `TOOL_THEME`).

## 9. Review (the agent does this every run)

1. View each raw picture in `.images-cache/raw/` (the Read tool shows images) and say what you see: one object,
   plain white background, no text, digits, letters, logo, wrapper, hands; for a strip or a disc no cut lines,
   grooves or segments; for a tile exactly one piece.
2. `node cli.mjs images sheet <slot> --ch N` -> `<slot>/images-preview.png`: the raw with the crop drawn on it, the
   skin as shipped on a checkerboard (alpha) and on white, a tile ten times in a row plain and tinted, a disc in
   ten sectors, the contrast numbers. Look at it: no white fringe, nothing cut off, the pieces read as the object.
3. Report `must-fix` (text or segments in a picture, a rejected skin, over budget, a halo) or `question` (a doubt
   about the object). One re-make a skin at most per run (`--force --only key`), with a changed prompt.

## 10. Commands (in the class folder)

```
node cli.mjs images make <MEDIA_ID> --ch N --dry          what would be made, the prompts, the cost; calls nothing
node cli.mjs images make <MEDIA_ID> --ch N [--only key] [--force] [--model m]
node cli.mjs images make --ch N [--dry]                   every slot with an images.json, each unique picture once
node cli.mjs images make --ch N --batch [--only key] [--force]   one batch job (half price)
node cli.mjs images batch status|apply|cancel --ch N
node cli.mjs images sheet <MEDIA_ID> --ch N               the contact sheet
node cli.mjs images status [--ch N]                       library, per-slot bytes against the budgets, money spent
node cli.mjs images list                                  the library
```

## 11. The ACTION KIT: the tools that perform an act (the owner, 2026-10-16)

Five real pictures, made ONCE and shared by every tool, like the mascot: a small kitchen knife, open child-safe scissors, a wooden
ruler with a BLANK face (the marks are code), a pencil and a pink eraser. `api.act` (PATTERNS.md §15) draws them doing the act; the
cartoon hand stays drawn in code (§2: hands are never generated) and stands in for any picture that is missing.

- **Not a slot's skin:** never in a slot's `images.json`, outside the 3-a-slot cap, no keypad theme. The plan is
  `runtime/actionkit.json` (key, object, kind, aspect, px, maxKB, prompt, why, and how the runtime holds it: `len`, the acting point
  `ax`/`ay`, `rot`); `node cli.mjs actionkit [--dry] [--force --only key]` makes it and writes the GENERATED `runtime/actionkit.tsx`
  (`ACTION_KIT`: the data URIs, `ACTION_KIT_FIT`: size and pose). Never edit or read it; regenerate.
- **Same machinery as a skin:** the raw cache, the library (a hit, a sibling class's included, is free), the ledger, two billed
  attempts, the cut. Two differences, both for tools: the prompt keeps STYLE and the chapter's look but drops the skin negatives (it
  may be a knife, and steel is grey: `kitPrompt` in `lib/images/rules.mjs`), and the cut is a TOOL cut (`process.mjs` `OPT.tool`:
  only a faint grey is a floor shadow, and a near-white region enclosed by the object, a finger loop, is a hole).
- **Carried like the mascot:** `sources()` puts it after `mascot.tsx` for a runtime that has one, `runtime freeze` copies it into
  the snapshot (its hash is in the pin), `port` carries it inside the tool. A runtime without it builds exactly as before.
- **Made 2026-10-16:** knife 200x37, scissors 111x140, ruler 200x42, pencil 190x40, eraser 110x90; about 14.6 KB of data URIs in
  every tool built on it. Look at a new picture before keeping it (one re-make, as §9).
- **The FONT KIT is carried the same way** (`node cli.mjs fontkit` -> generated `runtime/fontkit.tsx`, Poppins inside the tool; LAYOUT.md §9).

## 12. The design pass and the pictures (the owner, 2026-10-22)

The Gemini visual pass (`node cli.mjs design <slot_id> --ch N`, runbook step 4b) is where the real objects the brief names meet the layout. The order is fixed:
the image agent (5c) runs BESIDE the builder, the builder draws `<Skin>` over its plain shapes, the maths review is clean, and only then does the design pass run, so
it designs around the final maths AND the real pictures, never before them.

- **What Gemini is given:** the slot's `images.json` (each made picture's `key`, `object`, `kind`, `aspect` and `why`), the layout rules (LAYOUT §1, 3, 9, 10) and this
  section's contract (§7: plain shape first, `<Skin>` over it, a tile once per piece, a disc clipped per wedge, no digit in a picture). **Never `images.tsx`**: base64 does
  not travel through a design model. So `why` must say where the picture is used and a `key` must be a plain noun (`counter`, `roti`). Nor do `TR`, `PHASES`, `MODEL`, the
  maths, the printed constants or the runtime wiring: `lib/design/scope.mjs` swaps each for a one-line placeholder and puts it back byte for byte after every call
  (a reply that drops, repeats or moves one is refused), so they are neither paid for twice nor exposed to the text damage a whole-file rewrite brought.
- **What it does with them:** it draws `<Skin name="key" x y w h />` over every plain shape that stands for one of those objects, in that shape's own box, the plain
  shape kept under it as the fallback; it uses each key at least once; it lays the working area out around the objects (about a third of it or more, at most about 70 %,
  at most 40 skins on a screen). It never draws a picture any other way: no `<image>`, no data: URI, no URL, no emoji, no placeholder box.
- **Which runtimes:** only a chapter whose pinned runtime has `Skin` (`caps.skin`). On an older pin the pass adds no `<Skin>` and removes none, and says so.
- **What the CLI proves (`lib/design/skins.mjs`, run with `lib/design/design.test.mjs`):** no skin dropped; no `<Skin name>` for a key that has no picture (it would draw
  nothing, silently); no `<image>`, data: URI, URL, `href` or `new Image()` added; `TOOL_IMAGES` untouched. Any of these reverts the pass to `tool.tsx.pre-design`. A picture that
  was made and that no `<Skin>` draws first gets ONE narrow follow-up call (add only those skins, accepted only through the same guards) and, if it is still undrawn, is printed ("made but drawn by no <Skin>") for the builder to draw or to justify as plain.
- **It also proves the tool mounts (`lib/design/mount.mjs`):** the rebuilt preview is mounted once per phase in headless Chrome. Gemini twice moved a declaration so that `Work` threw "Cannot access 'a' before initialization" (a blank tool that parses and passes every static check); a tool that does not mount, throws or draws a NaN gets ONE repair call, else the pass reverts.
- **Measured on a real tool (class 4 ch 10 C25, its skins stripped, 2026-10-22):** the first run drew the picture but put it ABOVE the colour tint (a blue rod and an amber rod both became plain wood) and
  skinned every counter of a loop (73 skins; the cap is 40, and the `skins` row failed it). The prompt now states the layer order (plain shape, `<Skin>`, then the tint, outline, labels) and to count
  a loop's skins. Neither is provable by a script, so the builder's look at `shots` and the full `check` stay the gate.
- **What it cannot prove:** that a picture reads as its object, that a skin does not sit over a digit, that the layout is good, or that a drawing is not broken. The full
  `check` (it fails a NaN, a skin outside the working area, `skins-fallback`) and the builder's look at `shots`, `shots --state wrong` and `shots --state start` are the gate.
  Words it ADDED are named by the CLI ("NOTE: words added": a new literal holding a word that is not CSS); the builder removes them, the pass is kept.
  So is a meaning COLOUR it took away ("NOTE: colour lost: the start page: blue ..."): the start page and each question are shot before and after the pass, and a hue that
  faded in place (under half kept in a 100 px tile) and over the frame is named. On C25 it was a `<Skin>` put in the shared counter helper, over a piece whose colour is its
  own fill, turning the start page's blue rod grey: draw that colour over the skin as a tint (about 0.7 opacity), as the builder's own skins do (they keep 74 % of the blue).
- **Cost, measured (C25, 8 runs an arm, 2026-10-23):** holding those blocks back and putting the prompt's fixed text first cut the Gemini tokens of a pass from ~88k to
  ~44k a run and the usable rate rose from 3 in 8 to 7 in 8 (most old failures were the pipeline's own: a `TOOL_IMAGES` line the prompt asked for, and code between two quotes
  read as a sentence). Rejected: replies as search/replace edits (thinking rose as output fell; 3 in 8 fell back to a whole file) and a thinking budget of 2048 (near no-op designs).
