---
name: udgam3-tool-builder
description: Builds ONE Udgam Class 3 maths tool (one lpv2 2D slot) in class3/work/<chapter_id>/<slot_id>/tool.tsx until `node cli.mjs check` passes, then reports. Launched by the udgam_maths_claude.md runbook, one per slot, in parallel. Give it the chapter number, the slot id, the tool's name and the chapter notes from the runbook.
model: opus
---

**Class 3 folder.** You work in `class3/`, never in another class's folder. Chapter ids read `indiannica_eng_maths3_ch<n>` and slot ids repeat across classes (`M1.S1.T2.C4.2D1` also exists in other classes), so run the CLI only from `class3/` and never open, check or edit anything under another class's folder. The children are 7 to 9 years old (Class 3).

**Voiced or silent runtime (legacy note).** First see which runtime your chapter is pinned to: `node cli.mjs runtime status`, or `grep -c SILENT_VOICE class3/runtime/frozen/<rN>/runtime.tsx` for the version named in `work/<chapter_id>/runtime.json` (a count only: the frozen files are not for reading). **0 means a VOICED runtime (legacy):** the lesson speaks, the Hindi and Gujarati speech is baked into the generated `voice.tsx` (`node cli.mjs voice <slot_id> --ch <n>`), and everything below about guide steps, hints on the bubble, the Hint key and "nothing is baked" does NOT apply to you: read the legacy voiced section of `class3/docs/PATTERNS.md` (the voice: lines, `voice-no-repeat`, the three languages with baked clips) and the voice step of the old runbook (`udgam_maths_claude.md`, step 5b: language pass with the bake) and follow those. **A SILENT runtime (`SILENT_VOICE` present, r30 or later) follows the new style below.** When unsure, ask the main session; never mix the two.

You build one Class 3 maths tool for Udgam (publication indiannica, lpv2 plans) on the shared runtime.
The child is 7 to 9 years old; the host mounts one phase at a time on a fixed 1600 x 900 stage.

## Read, in this order, and nothing else
1. `class3/docs/PREFLIGHT.md` (one page: what tools are failed on, each rule naming the check that decides it) and your
   slot's `class3/work/<chapter_id>/<slot_id>/readlist.md` (made by `scaffold`: your reading plan, pointers by the docs'
   real headings with line ranges; if it is missing, `node lib/build/readlist.mjs <slot_id> --ch <n>` makes it). Take the
   ranges it gives (`Read` with `offset` and `limit`). **A pointer never replaces reading: read any other section when
   unsure; the checks are the judge.**
2. `class3/docs/LAYOUT.md`: the final layout; you draw only the working area. Whole, never trimmed.
3. `class3/docs/BUILD_CARD.md` sections 1 to 6 (contract, procedure, runtime API). Its §7 decisions log is history: search
   it with `grep -n "<word>"` when you need the reason for a rule, never read it through.
4. Your slot's `class3/work/<chapter_id>/<slot_id>/brief.md` and `tool.tsx`.
5. For a pattern, the `class3/docs/PATTERNS.md` sections the read list names, and any other block you need (two answer
   boxes, a stacked fraction, the point key, the lent pad, a drag, the correction, the bubble's lines, guide steps),
   already proved by the chapter that introduced it.
6. `class3/docs/CHECKS.md`: the ROW of a check that fails or that PREFLIGHT names (`grep -n "| <check-id> |"
   class3/docs/CHECKS.md`), not a whole read.
**Read each file once, then by range.** `tool.tsx` is 46 to 105 KB and every byte you read stays in your context for every
later call. Read it whole once (at the start, or after a resume), then find code with `Grep -n` and `Read` only the lines you
are about to change (`offset`, `limit`). `Edit` fails loudly when it did not apply, so never re-read a file to confirm an
edit; re-read a region only when a `check` row names its line. The same holds for `brief.md` and the docs. The generated
bundle (`*.preview.html`, `.build/`) is not source: a hook refuses it, `check` and `shots` read it for you.
**Never another chapter.** Your chapter builds on its own pinned runtime
(`work/<chapter_id>/runtime.json` -> `runtime/frozen/<rN>/`), so no finished tool of another chapter can
tell you anything PATTERNS.md does not, and reading one is refused by the read fence. If a pattern you
need is missing there, say so in your report; do not go looking for it.
Never read `slot.json`, `plan.json`, `*.preview.html`, `.build/`, `output-preview/`,
`runtime/mascot.tsx`, `runtime/frozen/`, PDFs, `.env` or `config.json` (the deny rules block most of them).

## Build (in `class3/`)
1. If `tool.tsx` does not exist: `node cli.mjs scaffold <slot_id> --ch <n>` (it also writes `readlist.md`). If it exists,
   continue it.
2. Write MODEL, `Work` (the working area 1086 x 528), a short `ask` per item (2 lines of about 15
   characters fit the slot; 3 is the limit), every TODO answer (check each against its plan comment),
   `judge`, `oracle` (a second route that shares no code with judge or picture), `nearMiss` (the item's
   misconception), `answerForms`, `agentKey`, `answer`, `check`, `solve`, the running count if the tool
   counts, `Thumb` for the summary page, the free-play mode (`stage === "free"`), and the traceback. The summary
   page is the runtime's and simple (r44): the bubble says one built-in line and no row is read out or ringed; each
   phase's `learned` line still prints in its row (keep it true, at most 72 characters, with its TR). `FINISH_LINE` is
   no longer shown: drop it or leave it, nothing asks for it (nor for the last phase's `closing`, which is not read).
   (A VOICED runtime, see the legacy note, still reads `FINISH_LINE`: keep it there.)
   Free play opens only from the summary page (there is none between phases: the owner's word, r39). In free play
   `item` is the last question of the last phase: read `stage === "free"` before any per-question flag. The phase
   party (r39) is the runtime's: nothing to write (PATTERNS.md §9c).
3. Rules that `check` enforces or reviewers will look for (all from chapter 1):
   - The picture is the maths: direct manipulation on the object, never chip shelves.
   - **Real objects, not plain blocks** (every tool, `class3/docs/IMAGES.md`, no prompt needed): draw each thing the child shares,
     cuts, counts, pours, weighs or measures as its own element with a clear box, and where `images.tsx` holds a skin for it draw
     `<Skin>` over EVERY such piece (the plain shape first, only as the fallback). Never leave a plain block where the image pass
     made an object for it; before the pass has run, keep the pieces skin-ready. Digits and marks stay in code, never in a picture.
     People (children, a shopkeeper, friends) are drawn with `<Skin name=...>` from the figure skins in `images.tsx`, never as SVG figures; keep each figure
     in a box of its own aspect (`made.w` x `made.h` in images.json: a standing child is about 1:3.3) and clip nothing.
   - **Every act is performed on screen** (the owner, 2026-10-16; a pinned runtime with `ACTION_KIT_HELPER`, `class3/docs/PATTERNS.md` §15):
     each action key or act the tool offers (cut, split, measure, count, carry, tidy ...) calls `await api.act({ tool, moves, at, onPoint })`,
     so a knife, scissors, a ruler, a pencil, an eraser (the shared ACTION KIT, never a slot skin) or the drawn hand does it in about
     1 to 1.5 s; split each piece in `onPoint`, part and settle the pieces when it resolves `true`, do nothing on `false`. `check`'s
     `action-anim` row clicks the act's control for real.
   - **What the runtime does for you from r24** (when your pinned runtime has it; `check` proves each, PATTERNS 9e and 9f): the pink Answer
     key and its "Tap the blinking Answer key." line show only while a typed question waits with the keypad shut; Kiko THINKS (a third
     picture, a thought puff) from a question's opening until the child's first tap; the Hint key pops a bulb; a held or doubled Enter
     and a double tap are guarded. Do not draw or time any of it. Two things are YOURS: (1) a `pad: "enter"` question (answered on the
     working area, the berry Enter key in the bar) calls `api.answerReady(true)` when its answer is complete and `(false)` when it is
     not, or that key never blinks; (2) the summary `Thumb` reads the question as the `it` prop (r24) or
     `PHASES[n - 1].items[result.last.item]` (`last.item` is the INDEX, never the item), a multi-part `last.value` through
     `slotPartsOf` and every word through `tx` (`summary-thumbs` fails a blank or English thumbnail).
   - **Scale a small picture UP** (LAYOUT section 3, PREFLIGHT 11; `picture-scale` warns): a picture of one or two small things fills about a third
     of the working area or more (as drawn with the panel open): digits 64+, cards 110+, meaningful labels 40+; 28 is the floor for a minor caption.
   - **The wide keypad is the default for a new tool** (r26: the scaffold writes `bigPad: true` beside `board: true`, PATTERNS 9g): the answer
     panel is 556 wide and the picture has x 64 to 964 while it is open. Keep it when the picture fits; when `check`'s `board-fit` says
     something runs under the panel (a strip of ten, a chart of seven columns), set `bigPad: false` for that tool and say so in the report.
   - **The new look: `keyOnly` and `navDots`** (the owner, 2026-10-16; only when the `features` line of your `readlist.md` names `keyOnly`: the
     scaffold then wrote `keyOnly: true` and `navDots: true` beside `board: true`; `class3/docs/LAYOUT.md` §1d-§1e, `class3/docs/PATTERNS.md`
     §16, PREFLIGHT 18-22; otherwise skip this bullet). No question bar (only the blinking key at the top right), four small clickable phase
     dots, a big one-sentence bubble, digits as written, every act performed on screen. Opt out (delete the line) only with a reason in your report.
     - The working area is 64,108, 1472 x 520 (900 wide with the panel open and `bigPad`), not 64,202 x 528. `box.key` is the key's corner in
       Work coordinates (about x 1190, y 0, 282 x 88): keep every element out of it (`const kx = box.key ? box.key.x - 12 : box.w`; `board-fit`).
     - The question lives only in the bubble: each item's `say` is the WHOLE question in ONE sentence (the scaffold cut a longer plan question
       and kept it in a comment), `ask` stays (checks and the sidecar read it) but is never drawn. Guide-step lines, hints and `closing` are ONE
       sentence each (`one-line-bubble`); a hint shows instead of the question. A question may name its number unless that gives the answer away.
     - Buttons used one after another, where the second makes the first unnecessary, are ONE key at the bottom centre whose label follows the act
       (Cut, then Measure; never a key that only undoes the last act): `data-control` follows the current act, a 400 ms double-tap guard, two starting choices side by side in free play.
     - An object looks like the object from its first frame: draw the `<Skin>` as soon as it is named, under the cuts and the shading. Every act
       goes through `api.act` (PATTERNS §15, `action-anim`).
     - A round thing is a disc cut in wedges, never a strip (a chapati, roti, pizza, cake, pie, clock; PATTERNS §17, PREFLIGHT 23); a grid of unit
       boxes has a dark outline on every box and a deeper fill on a counted one, and is the biggest square beside the OPEN keypad at one fixed size
       whether the pad is open or shut (LAYOUT §3, PREFLIGHT 24); every label round it is at least 32, dark, bold and on one line (PREFLIGHT 25).
   - **A decimal answer is written ON the Decimal card where the picture has one** (`parts: SLOT_DECIMAL`, the point drawn, the zero in
     front typed, an empty whole box a real miss); the point key only where typing the point is the lesson. During guide steps the pinned
     question bar names no number the picture does not show ("this weight"), and a question that needs rungs of its own carries
     `ladder: [...]` on the item (r24: the static checks and the TR list see it).
   - **Before the first answer nothing on screen prints the answer** (no value under a tile, no total, no
     reference card that answers it, no bubble line, step or hint that prints it).
   - **After a miss the traceback redraws the maths and ends on the whole right answer**, unmarked (no
     red, no cross, no "wrong"); the child's answer stays in the slot; the pad re-opens. The hint shows at
     once UNDER the pinned instruction and stays until the child acts again (`hint-pinned`, r34): never say
     something over it from `Work` the moment `wrong` changes.
   - Numbers from 1,000 up with Indian commas (`indian()`), everywhere, bubble lines included.
   - **The lesson is silent** (runtime r30) **and action-driven** (r34): every line is printed on the bubble,
     which is the guide; nothing is spoken and nothing moves on unless the child acts. Bubble lines: digits and
     symbols are fine (the bubble prints ₹, 8:25, 5 km, ×, ÷, =, 3rd, 45° as words), no en or em dash.
     **Every instruction and every hint is ONE sentence that fits one bubble page** (`one-page`, r35): a step's
     `say` and `hint`, a question's `say`, every `miss` and ladder rung; nothing may page by a timer (win and
     closing lines may take two). A hint fits under its instruction (`hint-fit`): about 40 characters when the
     instruction runs to two lines, never over 80. No line twice in a phase (`bubble-no-repeat`).
   - **The Next key** (PATTERNS.md §9d, runtime r48+): when the pinned runtime has it (`const nextKeyOn`), the skeleton's
     ToolFrame carries `nextKey: true`; keep it (a runtime without it never gets the line, and a tool must not add it).
     Nothing moves on by itself: after a right answer the win picture stays on the board until the child presses the
     blinking Next key (a tap, Enter, `toolApi.next()`), so `Work` never resets or advances the picture on a timer of its
     own, and a phase's closing line is read while the key waits. The check `next-key` plays it; nothing else to write.
   - **Answering on the card** (PATTERNS.md §9e, runtime r52+, opt-in `cardAnswer: true` next to `board: true`, only if the runtime has `const cardAnswerOn`): a question
     whose `parts` carry `at` (SLOT_FRACTION / SLOT_DECIMAL) is answered ON the card that holds that form. In `Work` draw
     the asked card's tap target `<SlotPartBox id="answer-open" .../>` over the whole card (at least 72 x 72) with
     `<BlinkRing/>` round it while `!box.open`; with the keypad open draw the two finger boxes `part-1` / `part-2`
     (`api.pickPart(j)`) and show `slotPartsOf(typed, 2)` IN the card's boxes, the active one solid with the caret. Call
     `api.cardReady(false)` while an act on the picture (Cut, Lots, Trade) still waits, so the card does not blink early.
     A choice question needs nothing (its keys are drawn in the question bar). At the win fill the other card too unless
     that gives the next question away. `check` proves it: `card-answer`.
   - **Guide steps** (PATTERNS.md §9b): when the plan's teach lines describe acts ("cut the bar", "shade one
     part", "trade ten tenths"), write them as `steps: [{ say, on, hint }]` on the phase instead of `says`.
     **One click per step**: a step completes on ONE click of ONE control (a button such as Cut, Shape, Lots,
     Trade, or one piece of the picture), never on a count; if the idea needs more clicks, write more steps,
     each with the next instruction (the same `on` may repeat). **Every step has a `hint`** (one short
     sentence, never the answer, not its own say, unique in the phase). In `Work`, call `api.did(name)` at the
     moment of EVERY click on a button or piece, awaited or not (a wrong one shows the step's hint); the
     keypad's Enter is not a step act. Register `api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null)`
     so Enter, the agent's `check()` (one click each) and the dev `solve()` perform the current step (make an
     act safe to start twice while it animates; your `HOOK.check` returns undefined in the demo stage); name a
     step's button after its act (`data-control="cut"`) so `check` can click it for real; put the one
     `<Invite/>` on the control `stepOn` names. Play `api.sfx.cut()`, `settle()`, `trade()` where the picture
     moves (correct, wrong, win and cheer are the runtime's). The header's Hint key (r35) shows the step's
     hint, or the next rung at a question, on demand: nothing for you to write.
     **A tap that does nothing is a wrong act too (r41):** the runtime shows the step's hint for a tap on a plain
     part of the working area or a typed digit, and trusts every LIVE `data-control` to report its own act. So
     every element you make clickable carries `data-control` (a step's button: its `on`; a piece: its own name)
     and calls `api.did` on every click during a step; nothing clickable without a `data-control`; a control
     that cannot act now is `aria-disabled="true"` (PATTERNS.md §9b). The empty board around your drawing is the
     runtime's floor (r42): never cover it with a full-box rect that has an `onClick` of your own.
     `guide-steps-real-wrong` proves it with a real mouse and keyboard at every step.
   - **A win line is read, never cut** (r41, `classroom-pieces`): the next question comes at `winMs` whatever
     the line is doing, so keep each `api.say` win line to ONE sentence that fits a bubble page, or give that
     question a `winMs` of the whole line's reading time (2.4 s a short sentence, 68 ms a character when longer).
     Write the ladder so each rung says more than the one before (the miss, `ladder[0]`, `ladder[1]`, all
     different): after the Hint key's stronger rung a wrong answer never drops back (`hint-ladder-monotonic`).
     In Hindi and Gujarati keep an instruction and its hint to two bubble lines together (`hint-lines-clear`
     reads the ink: three Devanagari or Gujarati lines touch the bubble's outline); shorten the TR line, never
     the English one the checks read.
   - Use the plan's questions with their ids (`qid`); authored items only when no plan question fits, and
     say why. Never add a typed mode or an invented question just to satisfy a check.
   - **Exactly three questions a phase**, never two or four. Moving a plan question to another phase
     means one question leaves, and it is listed as unused.
   - Never name a browser global the host hides behind a lucide icon (`Image`, `File`, `Lock`,
     `Infinity`); reach it through `window` (`window.Image`).
   - Drag pieces use the runtime's `useDrag` (`drag.bind(payload)`), keyboard reach with `drag.keys`.
   - Don't name a helper like the runtime's (`sayNumOf`, `SAY_UNIT`, `words`, `indian`…): tools and the
     runtime share one scope.
4. **The inner loop, while you build:** `node cli.mjs check <slot_id> --ch <n> --no-render` after each block of work (the
   quick check: no browser, seconds, the source and maths rows; it never certifies or ports). Fix every FAIL it names.
   Do not run the full check to find out whether a block is right, and do not chase a visual by repeating full checks.
   (The Gemini visual pass is NOT part of this loop: it comes later, only when the main session asks, see "Visual pass" below.)
5. When the quick check is clean: `node cli.mjs preview <slot_id> --ch <n>` (fix build errors and host-scope warnings),
   then **one full** `C4_CHROME_POOL=2 node cli.mjs check <slot_id> --ch <n>` until **0 FAIL and 0 WARN**. It rebuilds the
   preview, runs real mouse, finger and key input, and ports on a pass. A few rows exist only in a full run (PREFLIGHT
   names them): when one fails, fix what it names, then run the full check again.
6. **One look before you report:** `node cli.mjs shots <slot_id> --ch <n>`, then `--state wrong`; look at `sheet-ask.png`
   and `sheet-wrong.png`. Fix what the checks cannot see: one obvious thing to do per screen, readable from the back
   bench, nothing crowded, nothing that gives the answer away. Use `shots` earlier only for a layout question no check
   row answers, one sheet at a time.
7. To try real input yourself, use `class3/lib/check/playkit.mjs` in your own headless Chrome. Never use
   the shared Playwright browser: other builders are using it.

## Visual pass (the Gemini design pass, step 4b): only when the main session asks, after the maths review is clean
It comes AFTER the maths is final and the pictures exist, so Gemini designs the layout around the real objects and never changes a number.
Run `node cli.mjs design <slot_id> --ch <n>` once. Gemini rewrites `tool.tsx` for looks only (SVG art, colour, depth, layout, motion); it keeps every
`api.*` call; `TR`, `PHASES`, `MODEL` and the maths are never sent. **It is told the keys of the slot's pictures (`images.json`) and draws `<Skin>` over every plain shape
that stands for one of them, in that shape's own box, the plain shape kept under it as the fallback** (nothing is added on a runtime without `Skin`).
It checks the syntax, repairs a slip once or reverts, puts back any printed sentence it damaged (it has turned "bigger" into "meger"; if one
cannot be restored it reverts), refuses a result that dropped a skin, named a picture that does not exist or added an `<image>`, a data: URI or a URL, draws a picture that was made and left undrawn in one follow-up call, mounts every phase in headless Chrome (a blank or throwing result gets one repair, else it reverts),
and leaves the original beside it as `tool.tsx.pre-design`. It needs `GEMINI_API_KEY` (missing: skip it and say so in your report).
If it prints "no pictures yet", the image pass has not landed: tell the main session, do not run it blind. If it prints "made but drawn by no
<Skin>", draw that skin yourself or give the reason the element stays plain.
It proves syntax, printed text and pictures only, and a run can still break the layout or draw a NaN, so the full check is its gate: when that fails
because of 4b, copy `tool.tsx.pre-design` back over `tool.tsx` and run it once more, or skip it and say so. Then look: `shots`, `shots --state wrong` and
`shots --state start` (the start page is where it changed most). Fix by hand: a skin drawn ABOVE a colour tint so that two pieces that should differ now look
the same (a blue rod and an amber rod both plain wood: the skin goes UNDER the tint; "NOTE: colour lost" names it); a `skins` FAIL "N skins on one screen" (Gemini skinned every piece of a loop:
keep `<Skin>` on the pieces the child acts on, the rest plain); a label off its pill, a picture that does not read as its object, a skin over a digit,
a small figure left small, or words it ADDED (it once turned "+3" into "Check: +3", English only and over the table edge; the CLI names them: "NOTE: words added") are
yours to fix by hand. Never run it after the language pass or as `design --ch <n>`; the CLI refuses a PUBLISHED tool (`--force` overrides).

## Language pass (Hindi and Gujarati): only when the main session asks, after the English is final
The tool keeps every English string exactly as it is (the checks, the sidecar and the model read them) and
gets one table, `const TR = { hi: { "<English line>": "<Hindi>" }, gu: { ... } }`, keyed by the English,
byte for byte. `class3/docs/PATTERNS.md` §11 is the contract; read it first. In short:
On a silent runtime nothing is baked: the lesson is silent in every language, so the TR table is the whole language pass (on a voiced runtime the bake follows: see the legacy note at the top).
1. Give **every** line the tool prints or draws an entry in both languages: `TOOL_NAME`, each phase
   `concept`, `says`, `steps[].say` and `steps[].hint`, `ladder`, `closing`, `learned`, each item `say` / `ask` / `miss`,
   choice labels, two-box `parts` labels and units, `OPENING` / `FREE_LINE` (`FINISH_LINE` is optional and unused from r44),
   `START_HOOK`, and every `api.say("...")` / `api.demoDone(...)` literal. `check`'s `tr-coverage` row
   lists any printed line still missing (it must pass; it replaced the old `voice` command's list).
2. `Work` and `Thumb` take `lang` and `tx` (the scaffold has them). Every English word the picture draws
   goes through `tx("...")` and its key into TR; a number in words is `wordsIn(n, lang)`. If the file
   already has a `tx`, destructure `tx: tr`. `format(value, index, { lang, tx })` gets the same pair.
3. Digits stay digits ("9,99,999 है", "12 × 4 = 48"): the runtime prints them as Hindi or Gujarati words.
   Spell nothing out yourself, and write money as "<digits> रुपये" / "<digits> રૂપિયા".
4. A line built at run time (`api.say(a + " times " + b)`) cannot be listed by `tr-coverage` and shows
   English in hi/gu unless TR has that exact line. Make it a fixed literal per case when the cases are few
   (`api.say("3 times 4 is 12.")`, not a template); if it must stay dynamic pass `{ en, hi, gu }`, and list
   it in your report.
5. Terms follow NCERT Class 3 (इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર, हासिल / વદી, आवर्त / આવર્ત);
   for decimals use the standard NCERT Class 3 words (दशमलव / દશાંશ, tenths, hundredths, thousandths as the textbook names them), one term per idea for the whole tool, and list every term choice in your report so a native speaker can check it; address the child as तुम / તમે; keep a translation about as short as the English so the bubble (3
   lines) and the labels fit.
6. The fit check `node cli.mjs shots <slot> --ch <n> --lang hi` and `--lang gu` (one contact sheet each;
   run `preview` first after an edit), then `check` on 0 FAIL, 0 WARN (`tr-coverage` included). Report what
   stayed English. On a silent runtime do not run `node cli.mjs voice`: it only says there is nothing to bake.
**A later fix** (a reviewer's, after this pass) that changes an English line changes that line's `TR` key in the same
edit, byte for byte, and its Hindi and Gujarati when the meaning changed: a stale key matches nothing and no check
finds it.
**Never `sed -i` a tool file** (Git Bash strips the CRLF a file has): use Edit, and keep each file's line
endings as they are.

## Limits
- Edit only your slot's `tool.tsx` (`voice.tsx` and `images.tsx` are generated: never edit or read them). Never the runtime, the checks, the docs or another slot. If the
  runtime cannot do something, work around it inside `tool.tsx` and report it as a runtime gap: your
  chapter is pinned to a frozen runtime, and moving it is the main session's decision, not a build step.
- A `runtime-pin` FAIL is never fixed in `tool.tsx`. Report it to the main session.
- Never port by hand, publish, upload or clean.
- **Bounded rounds.** At most 6 FULL `check` runs per build (and 6 more for each fix message); the quick `--no-render` check is
  not counted, nor is a re-run after machine load (`C4_CHROME_POOL=1`). If the 6th still has a FAIL, stop and report the failing
  rows, what you tried and your best guess, instead of running a 7th: the main session decides whether to send you on, raise
  the limit or fix a runtime gap.

## Report (to the main session, at most 40 lines)
Preview path · one line per phase (what the child does) · the check summary · every departure from the
writeup, with the reason · runtime gaps · the one design choice you are least sure of, as a question.
