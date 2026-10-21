# Pencil writing (the owner, 2026-10-21; PENCIL_WRITING_BRIEF.md)

A class 4 tool whose pencil writes a number now writes it **stroke by stroke**: the tip follows the digit's own path, the graphite grows behind
it, the pencil tilts a little, a scratch sounds at each stroke, and the written digit **stays** as a neat pencil digit. About **0.8 s a number**
(150 ms in + 500 ms of strokes + 150 ms out, no 400 ms hold).

## Why a block inside the pair, and not only edits in the tool
The pencil's pace and hold are in the runtime code that every pair INLINES (a 1.05 s minimum per act, 360 ms in, 330 ms out, a 400 ms hold after
a pencil act: an act given `ms: 700` measures 1450 ms). A tool's own call sites cannot go below that, and "follow the digit's path" is a move the
old helper does not have. So the helper block inside each `.tsx` gets a new `write` move ONCE (this folder), and then each tool's pencil call sites
are edited by hand to use it. The `.json` is never edited: `approve` rewrites its md5 and size fields itself.

## The pieces
| file | what |
|---|---|
| `pen-core.js` | the glyph table (0-9 , . = - + × ÷ / and capital letters A-Z), the layout, the stroke maths. Plain JS, embedded verbatim |
| `pen-render.tsx` | `penPlan` (the timeline), `penWriteLayer` (what the act draws), `PencilText`, `PencilLine` |
| `standard/` | making it STANDARD for a class: `standardise.mjs --class N` (dry run / `--apply`), `verify.mjs --class N`, `pencil.mjs` (the `pencil-acts` check module, canonical copy) `test-pencil.mjs` (the parser, 25 tests), `test-hook.mjs <class> <chapter_id> <slot_id>` (the hook really runs in `check.mjs`, on a scratch copy) and `test-judge.mjs` (`action-anim` relaxes only for a written act) (see "In the standard pipeline") |
| `call-sites/` | one edit script per tool (`<ch>__<slot>.mjs`: exact replacements on its pair, idempotent, `--dry`), its capture script, and `NOTES.md` (the wiring recipe and what each tool taught) |
| `build-helper.mjs` | the r29 helper block + 5 exact-string edits + the two files above = `helper.new.tsx` (the commented block, for the head runtime later) |
| `apply.mjs` | puts the new block into a READY pair (dry run unless `--apply`; idempotent; refreshes a pair that carries an older version; `--runtime` for a runtime source) |
| `lib.mjs`, `roundtrip.mjs` | shared helpers; proof that all seven pairs carry exactly the printed r29 helper and the swap round-trips byte for byte |
| `test-plan.mjs` | node test: timing, order, last frame == finished text (18 assertions) |
| `glyphsheet.mjs`, `serve.mjs` | a sheet of every glyph (`out/glyphs.html`), a tiny server to look at it (`node pencil-writing/serve.mjs`, port 5601) |
| `capture.mjs` | plays a pair in headless Chrome with motion on, times every act from inside the page, and screenshots it at 200, 400, 600 ms |

The pairs are the port's PRINTED files (comments and the `ACTION_KIT_HELPER` markers are gone), so a pair's helper is found as the span from
`const ACT_SFX =` to the end of `useActionKit` and must equal the r29 block printed the way `lib/ship/port.mjs` prints it (r28 and r29 and the head
carry byte-identical helper blocks). A pair that matches neither the old nor the new block is refused.

## The API (inside a tool)
```tsx
await api.act({
  tool: "pencil", moves: "write",
  text: "125",                       // or ["12", { line: [x1, y1, x2, y2], size: 64 }, "18"]: a fraction in ONE act (a bar is one character)
  at: [{ x, y }],                    // one point per string (a { line } token has its own points); x, y = the baseline's left / middle / end
  size: 64,                          // the fontSize the tool already prints this digit with (a number, or one per string)
  align: "middle",                   // start | middle | end: what x is (a tool that prints textAnchor="middle" says "middle")
  color: "#3F3F3F",                  // optional graphite (default)
  onPoint: (i) => setShown(i + 1),   // runs when the tip FINISHES character i (counted across all strings, a bar counts one)
});
```
More in `text`: `{ line: [x1, y1, x2, y2], size }` (a bar the pencil writes, 180 ms) and `{ dab: [x, y], size }` (the tip touches a point for 110 ms and leaves no ink: the
tool's own arrow or tick appears then). Each counts as ONE character, so marks and numbers share ONE act (the pencil comes in and leaves once).
`align`, `size`, `color` and `step` are one value for the act or an array with one per token (indexed like `at`; a line or dab token's own slot in `at` is unused, give it `null`).
`step` (px) puts every character of a string in its own cell that wide (a row of cards: `text: ["ABC"], step: 64`), so a row is ONE token, about 0.8 s, not one token a card.
A character with no strokes (a space) reports its `onPoint` when the one before it finishes. A stroke is never thinner than 3.2 px (a small `÷3` label).
`ms` is ignored for a write. Reduced motion: no motion, every `onPoint` runs, it resolves `true` at once. A second act while one plays still resolves `false`.
Back-to-back acts are safe (the layer's clock is clamped to the new act's age: no ink flash); no `nap` between them is needed.

What the tool draws for the written digits (the act's layer is removed when the promise resolves, so the tool must keep them):
```tsx
<PencilText text="125" x={cx} y={cy + size * 0.36} size={size} align="middle" chars={shown} />   // first `shown` characters of the same drawing
<PencilLine x1={x1} y1={y1} x2={x2} y2={y2} size={size} />                                       // a bar the act wrote
```
A printed `<text x={cx} y={y + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{n}</text>` becomes the first line
(same `cx`, same baseline, same `size`: it is a drop-in; a pencil digit is 0.72 of `size` tall, as a Poppins digit is). `PencilText` has
`color`, `width`, `opacity`. A character the table lacks is printed (never dropped).

## Adapting a tool's call sites
1. Find every `api.act({ ... tool: "pencil" ...})` of the pair (`Grep -n -o` with `pencil`, or a node script; **never read a pair whole, never open `output-preview/` with
   `cat`/`ls`**: they are 500+ KB and the shell is denied there. Read by line range with the Read tool, or print short matches with node).
2. A pencil act that WRITES A NUMBER (digits, a sign, `÷3`, `×4`, `=`) becomes a `write`. An act that draws a line, a mark or a shade (`draw`,
   `push` over cells, `rub`) stays as it is. An act that mixes both: either one `write` with `{ line }` tokens for the bars, or split it
   (marks first with the old move, then a `write`), whichever keeps the tool's own state in step.
3. Keep the tool's state changes where they are: `onPoint(i)` now fires when the tip finishes character `i`, so the state that used to say
   "digit shown" is set there, and the tool draws that digit with `<PencilText ... chars={n} />`. A digit that was ALREADY on the screen before the act
   (printed by the tool, not written) stays a Poppins `<text>`; only what the pencil writes is `PencilText`.
4. Delete the `ms` of a pencil `write`, and any `api.sfx.tick()` the tool plays after it (the act scratches itself).
5. Several numbers one after another in one guide step: one `write` with an array of strings, not several acts (each act's pencil would
   leave and come back). The whole chain must end inside `approve`'s 10 s wait.
6. Never change a `TR` key or an English line. Never touch `work/`, never run `check`, never upload.

## Proving a tool
```
node pencil-writing/capture.mjs <ch>/<slot_id> --phase N           # times every act, saves frames to pencil-writing/out/frames/ (LOOK at them)
cd class4 && node cli.mjs approve <slot_id> --ch <N> --note "pencil writes digits stroke by stroke, ~0.8 s a number, 2026-10-21 owner"
```
Look for: the line visibly grows behind the tip at 200, 400 and 600 ms; the digit is partly drawn mid-act; the finished digit is the same drawing after the
act (no jump); about 800 ms for one number (a fraction n / d about 1.6 s); no page error. `capture` counts `data-role="pen-ink"` (the act's strokes) and
`data-role="pencil-text"` / `pencil-line` (the finished ones).

## Two ways to give a tool the new pencil
1. **A NEW chapter: nothing to do.** The block is in the HEAD runtime of class 4 and class 5 (see "In the standard pipeline" below), `fetch` freezes the head and pins the chapter to it, and the builder
   writes `moves: "write"` from PREFLIGHT and PATTERNS §15.
2. **A READY pair of a chapter fetched earlier (the retrofit; only on the owner's word):** `node pencil-writing/apply.mjs --file <pair.tsx>` (dry run; add `--apply`), then the tool's pencil call sites by an
   idempotent script like `call-sites/<ch>__<slot>.mjs`, then `approve`. Class 4 chapter 11's pairs are done this way after its pipeline ends (it is pinned to r29, whose helper block is the one this patches).

## Decisions made while building it (not in the brief)
- The brief says the helper's markers survive in the pairs: they do not (the port prints the file with esbuild), hence the printed-span swap above.
- The glyphs also include `÷`, `×` and `/` (the tools write `÷3` labels and fractions); a bar is a `{ line }` token, not a glyph.
- A run longer than 4 characters takes 80 ms more for each (so `1,234,567` is 1.2 s, not 0.8 s). A bar takes 180 ms.
- Every written character is turned a hair, scaled and lifted, fixed by its place in its text (`penRand`), so two `1`s are never identical and a render is the same every time.
- Capital letters A-Z were added because ch 10 C20 (a code wheel) writes letters; lowercase letters, Devanagari and Gujarati letters are NOT written (a translated sentence stays as the tool had it).
- The brief's seven-tool list came from a numbers-only scan; several of those tools use the pencil to shade, rub, colour or draw lines, not to write. Those acts are left as they were
  (ch 6 M1.S2.T4.C15.2D1 shades a bar with one `draw`; ch 7 M2.S4.T7.C30.2D1 `rub`s to fill cards): they have no digit to write.
- Pencil digits are lighter than the printed bold Poppins beside them (a pencil line is a tenth of the font size, 3.2 px at the least). One constant, `PEN_W` in pen-core.js, makes them bolder (then `node pencil-writing/build-helper.mjs`, `apply.mjs --only <ch>/<slot> --apply` for each patched pair, which refreshes it in place, and `approve` each; do not run apply.mjs without `--only`: it would also patch the two tools left as they were).

## What is done (2026-10-21), class 4
| chapter | slot | what the pencil writes now |
|---|---|---|
| 7 | M1.S2.T4.C15.2D1 | scratch fraction, new rung, ÷ labels (marks and numbers in one act) |
| 7 | M2.S3.T5.C20.2D1 | the product of the crossing line (phase 4) |
| 7 | M1.S2.T3.C10.2D1 | see `call-sites/NOTES.md` "ch 7 C10" |
| 10 | M1.S2.T4.C15.2D1 | the box number, the working column "= N", the rebuilt boxes |
| 10 | M2.S3.T5.C20.2D1 | the trial row of code letters (one act per row) |
Left as they were, no digit written: ch 6 M1.S2.T4.C15.2D1 (shading), ch 7 M2.S4.T7.C30.2D1 (rub to fill cards).
Each converted tool is "hand-edited (approved)" and shows "edited since" its upload: publish only on the owner's separate word.

## In the standard pipeline (2026-10-22: "merge this pencil-writing to standardised pipeline for new chapters to implement")
`node pencil-writing/standard/standardise.mjs --class N` (dry run; `--apply` backs up to `_backups/pencil-standard-class<N>-<stamp>/` and writes) made it standard in a class, and
`node pencil-writing/standard/verify.mjs --class N` proves it (18 checks, no chapter touched). It is idempotent and the same for every class, so nothing is copied by hand (class 4's
`check.mjs`, `input.mjs`, `caps.mjs`, runtime and docs are CONFLICT files for `classctl sync`). Done for class 5 and class 4. What it puts in:

| where | what |
|---|---|
| `runtime/runtime.tsx` (the head) | the `write` move in the ACTION_KIT_HELPER block (`apply.mjs --runtime`). NOTHING is frozen or pinned: `fetch` freezes the head for a new chapter, so a chapter fetched from now on has it; no existing chapter moves |
| `lib/core/caps.mjs` | `pencilWrite` (the runtime source has `function penPlan(`) |
| `lib/core/pin.mjs`, `cli.mjs` | `fetch` writes `rules.pencilActs: "strict"` into a NEW chapter's `runtime.json` when the runtime it pins has the move; `writePin` keeps the rules over a re-pin and never adds them |
| `lib/check/pencil.mjs` (NEW), `check.mjs` | the `pencil-acts` source row (quick check too): strict chapter = every pencil act is `moves: "write"` or `marks: true`; an older chapter on such a runtime = one INFO row; a tool that writes on a runtime without the move FAILS; otherwise no row. Canonical copy and 25 tests: `standard/pencil.mjs`, `standard/test-pencil.mjs` |
| `lib/check/input.mjs` | `action-anim`: a WRITTEN act (`data-role="pen-writing"`) may last 3.4 s; every other verdict unchanged |
| docs | PATTERNS §15 "PENCIL WRITING" (the old push-for-text rule stays, labelled for runtimes without the move), PREFLIGHT 26 (class 5) / 27 (class 4), CHECKS `pencil-acts`, BUILD_CARD §7, the runbook (step 5c), CLAUDE.md |

Gap list: the class 5 head is still not frozen (it also holds hunks that are not this job's), so its next `fetch` or `runtime freeze` includes the block; a chapter already pinned moves only by its own
`runtime pin --ch N` on the owner's word (then it gets the INFO row, not the rule).
