# How an Udgam tool is made (the build card)

**Status: pipeline v1, set from the reference tool `M1.S1.T2.C4.2D1` Place Value Builder (2026-09-21).**
Chapters are made one after another; publishing comes after every chapter is made.
To build a tool, read `PREFLIGHT.md` and the slot's `readlist.md` (what tools are failed on; the pointers into this
card's sections 1-6, `LAYOUT.md` and `PATTERNS.md`), then the slot's `brief.md` and `tool.tsx`, and nothing else. Where these are silent, `maths_lp/maths_agent/TOOL_BUILD_SPEC.md` is the authority.

## 1. How a tool is served

- **Plan:** lpv2 (`lp2_*` tables), chapter `<pub>_<medium>_<subject><class>_chN` (e.g. `indiannica_eng_maths<N>_ch<n>`: Udgam = publication indiannica, class = this folder's `defaults.class`).
  Fetch uses the active plan, else the latest. Every `2d_tool` mount is one tool (`M1.S1.T2.C4.2D1`).
- **Phase by phase, as NCERT.** The host passes `phase` (1-based); the tool starts at that phase. When a
  phase's last question is done, the tool says the phase's closing line and **moves on to the next phase by
  itself** 1.4 s later, in user and AI mode alike (a whole lesson, no `phase`, starts at phase 1). Phases
  before the last send no `finished`. The last phase ends on the summary page, which sends `finished`
  **once, 5 s after it opens** (`LAYOUT.md` §5b). In user mode the child may jump phases with the dots; see
  `LAYOUT.md` §6 for user and AI mode.
- **Wrong answer:** a hint (a SILENT runtime: at once under the pinned instruction, kept until the child acts again, r34; a VOICED runtime: a spoken rung) and a traceback that redraws the maths and **ends on the whole right
  answer** (the full correct row, the value, the sign, the order), so the child sees it done right and
  then gives it; first-try credit is already gone. The control stays live. Nothing is
  marked; the only thing reset is the answer slot, emptied at the miss (MISS CLEARS THE SLOT, `LAYOUT.md` §3; a runtime
  before 2026-10-28 kept the answer in it). The ladder: rung 1 is the item's `miss`, rungs 2-3 are the phase's `ladder`;
  none of them gives the answer.
- **The voice (a silent runtime, r30+: the bubble) never repeats itself** (the rule was made for the voice; the lesson is printed since r30). A teach never restates what its first question then says, and a
  closing never says what the next teach says. Every question has its own `miss` (the error of that
  question, not a line shared by the phase), no ladder rung repeats a miss, and a miss never repeats
  its question. The three questions of a phase never share an instruction: the first says it in full
  ("Round each addend to the nearest thousand."), the next ones in their own words ("the same way").
  A near copy counts ("Where did the rest go?" after "Where did the rest of it go?"). Win lines and
  answer sentences too: a question that reuses a story gets its own. `voice-no-repeat` (voiced runtime) or `bubble-no-repeat` (silent runtime) checks the
  plan fields (guide steps included); win lines are the tool's own, so read them.
- **Three questions a phase, exactly** (never two, never four): when a plan question moves to another phase,
  one leaves so the count stays three, and the one left out is listed as unused in the sidecar.
- **Scoring:** +5 per correct answer, added where the correct sound plays; a miss costs nothing. Stars at
  1 / 60 % / 90 % right first time. The score leaves in `finished` and is never drawn.
- **Host:** the host strips imports and injects React plus five hooks (useState, useEffect, useRef,
  useMemo, useCallback). No storage, no network, no assets. `function X(props){…}` then
  `export default X;` as the last line; never `export default function`, never `export interface`.
- **`finished` detail:** toolId, mediaId, doneId (`MEDIA_ID.DONE`), phase, conceptId, objectiveIds,
  score, maxScoreThisPhase, correctFirstTry, itemsAnswered, stars; when the mount played more than one
  phase, also `phases` (the phases played) and `maxScore`. The runtime sends it.

## 2. The order of work for a chapter

```
/gen-tools 4 udgam <chapter> [SLOT_ID]           (runs ../udgam_maths_claude.md: builders, reviewers, audit; or these steps by hand)
1  node cli.mjs fetch --ch N            lpv2 -> work/<chapter_id>/<id>/brief.md, slot.json, status.json
2  node cli.mjs scaffold <id> --ch N    tool.tsx from runtime/skeleton.tsx: concepts verbatim, teach lines,
                                        ladders, closings, 3 items a phase (TODO where the plan's answer
                                        could not be parsed); also readlist.md (pointers into these docs)
3  build tool.tsx                       MODEL, Work, short asks, the traceback, judge / oracle / nearMiss /
                                        answerForms / agentKey / answer / check (LAYOUT.md §11)
                                        (read PREFLIGHT.md first; inner loop: check <id> --ch N --no-render)
3b node cli.mjs design <id> --ch N   the Gemini visual pass, ONCE, after the maths review and once the pictures exist (runbook 4b):
                                        looks and layout only; api.* kept, TR/PHASES/MODEL/maths never sent; it draws <Skin> over the made
                                        pictures (IMAGES.md §12); syntax, printed text and pictures checked, else reverted to
                                        tool.tsx.pre-design; NOTEs name words added, colours lost. Then shots, --state start; the full check is its gate
4  node cli.mjs preview <id> --ch N     <id>.preview.html: open it in a browser (user mode; ?mode=ai)
5  node cli.mjs check <id> --ch N       every check (CHECKS.md): ONE full check once the quick one is clean. Every
                                        FAIL is fixed before review. A pass ports straight away (output-preview/
                                        <slot_id>.tsx + .json, proved in the host emulator), so the tool is in the viewer too
6  node cli.mjs shots <id> --ch N       one contact sheet (sheet-ask.png; --state wrong for the traceback); the reviewers'
                                        frames are the review pack: shots <id> --ch N --pack [--changed]
7  review (STAGED, runbook step 5: the maths reviewer first on the final English, then images and languages, then the
   visual reviewer and the play tester once on the near-final tool) -> small edits -> 4-6 again
8  node cli.mjs clean --ch N            the end-of-chapter tidy (`<id> --ch N` for one slot; --dry lists, --html drops the preview page too): the
                                       review artefacts (PNG sheets and other images, .build/, logs) of every slot whose check passed and is fresh go;
                                       a failing or stale slot keeps its sheets; the source, voice, images, brief, slot.json, status.json and the preview page stay
   then the next slot of the chapter, then the next chapter
9  later, once every chapter is made:   node cli.mjs publish <id>  (dry run; --upload only on the user's word)
```

**The answer is gated by the act** (the owner, 2026-10-24, every tool): in step 3, a question with an act on the working area (share, cut, check, take, lift, put together, tap cards into a bin, deal, count) has its corner Answer key and keypad/choice keys DISABLED until the child has performed that act, then enabled, berry and blinking. `api.lock(true)` only when the question still needs its act AND it is user mode AND the child has touched the board for real; `api.lock(false)` the moment the act is done; the agent's `check()` performs the act at once, so AI mode and `toolApi` runs are never gated. A question with no real act stays ungated (never invent one) and your report says so. Recipe and side effects: PATTERNS "Answer gated by the act"; PREFLIGHT 27. `check` and `approve` never play it.

A slot's folder holds `brief.md` (read), `tool.tsx` (edit), `<id>.preview.html` (open; never read),
`sheet-*.png` (look, then `clean`), `slot.json` and `status.json` (scripts only; `status` shows the stage
and the last check).

## 3. Token rules

1. Read `PREFLIGHT.md` and the slot's `readlist.md` first, then what they point to (this card's sections 1-6, `LAYOUT.md`
   whole, the `PATTERNS.md` sections the tool needs), the slot's `brief.md` and `tool.tsx`. This card's §7 and §8 are
   history: search them with grep, never read them through; take a `CHECKS.md` row by grep. Never read `slot.json`, `plan.json`,
   previews, `.build/`, `out/`, `runtime/mascot.tsx`, PDFs, `node_modules`, `.env`, `config.json` or
   `_archive/`. Open the reference tool only to copy a pattern, and only the block you need.
2. Edit, never rewrite: change the smallest block that does the job (the one exception is the design pass, 3b: Gemini rewrites the file for looks, and you never read the result back whole).
3. The runtime owns the chrome (`LAYOUT.md` §11). Never re-implement it in a tool.
4. Let `check` find problems (the quick check, `--no-render`, while building; one full check at the end); look at one
   contact sheet per round.
5. Items, teach lines and ladders live in `tool.tsx`. Don't copy the brief into comments.
6. Check every scaffolded answer against its `/* … answer in the plan = … */` comment.

## 4. Runtime API (runtime v1, frozen from the reference tool)

**Which runtime a tool is built on:** its chapter's. `work/<chapter_id>/runtime.json` names a frozen
snapshot in `runtime/frozen/<rN>/` (runtime.tsx + mascot.tsx), and `sources()` builds every tool of the
chapter on it. `runtime/runtime.tsx` is the head, where a new feature is written; it reaches a chapter
only when that chapter is pinned to a new snapshot (`runtime freeze` then `runtime pin --ch N`, then
re-check that chapter). A snapshot is immutable and the `runtime-pin` check proves it. Freezes and pins are
BATCHED (runbook non-negotiable 3; §7 2026-10-18): a runtime gap is logged and frozen once before the packs and once
at step 6, and another chapter pins the newest head once, at its own step 6. The API below is
the head's, and r1 holds all of it. How each part is USED is `PATTERNS.md`.

- **Tokens:** `T`, `CONTENT`, `DEFAULT_CHROME`, `Z`, `W` (working area), `RAD`, `EDGE`, `POINTS`, `HIT` (72),
  `MASCOT_BOX`, `TOOL_API`.
- **Paint:** `url(#gHundred|gTen|gOne|gBead|gPointer|gAccent|gKey|gPanel|gCard)`,
  `url(#fShadow|fShadowSoft|fLift|fBtnDown)`.
- **Helpers:** `words(n)` (Indian: "seven lakh thirty-eight thousand"), `wordsIntl`, `indian(n)` "7,38,000",
  `intl`, `roman`, `fractionWords`, `speakable(s)`, `pieces(line)`, `wrapText`, `tint` / `shade` / `mix`,
  `leadNumber`, `slotPartsOf(v, n)` (a two-part answer's numbers as digit strings, from "16|1", [16, 1] or
  "16 remainder 1"), `judgeSlotParts(item, v)`, `SLOT_FRACTION` / `SLOT_MIXED` (a fraction's part sets),
  `slotComplete(parts, ps)`. `speakable` reads 3/4 "three quarters", 3 2/5 "three and two fifths".
- **Pieces:** `Disc` (a toy counter; `flat`), `Block` (base-ten one/ten/hundred/thousand with its value;
  `label={false}` under a pile), `Invite` (the one pulse), `Key`, `RoundControl`.
- **Touch (via @use-gesture):** `useDrag(onDrop)` -> `{ drag, bind(payload), keys(payload) }` in
  working-area units, a move under 8 is a tap, Enter/Space is a tap; spread
  `{...control(id, label), ...drag.bind(p), ...drag.keys(p)}` on a piece. `usePress(fn, enabled)` for a
  custom control; `<Hit id x y w h onPress label/>` for an invisible tap target.
- **Motion:** `useTimeline()` -> `{ run([[ms, fn], …], done), stop, busy }`, cancellable, near-instant under
  reduced motion; `reducedMotion()`.
- **Tool object:** `{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, freePlay,
  Thumb, PHASES, MODEL, Work, Runs?, judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check,
  format?, winMs?, fitHost }`. `Thumb({ result, it, C, w, h, lang, tx })` draws the child's last right answer of a phase on
  the summary page (`result.last = { item, it, value, answer, kind, shared }`; **`item` is the question's INDEX in its phase (`L.i`), not the item object** (a `Thumb` that read `last.item.num` drew a blank cream box in five of ch 8's six tools); **from r24 `it` is the item object itself** (`PHASES[n - 1].items[item]`) and is also passed as the `it` prop; before r24 a `Thumb` finds it with `PHASES[n - 1].items[last.item]`. `value` is the answer as the child gave it: a typed two-box answer is the string `"a|b"`, a card answer an array, so read it with `slotPartsOf(last.value, n)`, never `String(last.value)`. From r24 the `summary-thumbs` check fails a blank thumbnail and an English-lettered one in hi / gu).
  `answer(item, v)` sets an answer made on the working area (return true/false, or undefined to type v);
  `check()` acts before Enter (e.g. drops a waiting token; undefined = press Enter); `fitHost(q)` adapts a
  host question or returns null to keep the authored items.
- **Shapes:** `Phase = { n, concept, conceptId, objectiveIds, says[], ladder[], closing, learned, traceback, items[], demo?, steps? }`
  (`demo`: the stage waits in "demo" for the child's one act until `api.demoDone(lines)`; `steps: [{ say, on, hint }]`
  (r30, `hint` r34): guide steps instead of `says`, each waiting in "demo" for the act Work reports with `api.did(on)`,
  the last opening the question; a wrong act (a `did` with another name) shows the step's `hint` under the pinned
  instruction; every `say` and `hint` one bubble page (r35); `docs/PATTERNS.md` §9b);
  `Item = { qid, kind, say, ask, answer, miss, ladder?, choices?, pad?: "enter", parts?, winMs? }` (`ladder`, r24: the question's own rungs 2 and 3 in place of its phase's) (`qid` = the plan's
  `<conceptId>:ML<n>` or `<conceptId>:<q_no>`, null for an authored item). `parts: [{ label, unit? }, …]`
  with `answer: [a, b]` is a two-part answer (quotient and remainder): the slot shows one box a part,
  `typed` reads `"16|1"`, `judge` calls `judgeSlotParts`, `agentKey` gives the array, and `toolApi.answer`
  takes `[16, 1]`, `"16|1"` or `"16 remainder 1"`; `getState()` adds `parts` (labels) and `part` (the caret's box).
  **A fraction:** `parts: SLOT_FRACTION` with `answer: [3, 4]` (drawn stacked, typed `"3|4"`). **A mixed number or
  a tidied answer:** `parts: SLOT_MIXED` with `answer: [1, 2, 3]`, `[5, null, null]` (a whole number) or
  `[null, 7, 10]` (a fraction); null = that box must stay empty; `getState().parts` is
  `["whole", "numerator", "denominator"]`; give the agent the array or `"5||"`. A tool that takes an equivalent
  fraction writes its own `judge` on `slotPartsOf(v, 2)`.
- **The three shipped languages (r10+, the tool's own text from r13):** the host sets
  `props.lang: 'en' | 'hi' | 'gu'`, exactly like `operatorMode`; unset or unrecognised is English. A
  tool keeps its lines in English and adds `TR = { hi: { "<English>": "<Hindi>" }, gu: {...} }` to the
  tool object; `lineFor(line, lang, TR)` reads it. `Work` receives `lang` and `tx`. `wordsIn(n, lang)` /
  `speakableIn(s, lang)` give numbers and operators in words; `UI_STRINGS[lang]` is the runtime's own
  chrome. **Baked voice (a VOICED runtime, r12-r29; r21+ ships it as files):** a tool may declare `const TOOL_VOICE = { "<piece>": "data:audio/…" }`;
  it then speaks only from its clips. Locally they are inline; PUBLISHED, they are files (r21+: a value
  may be a `<sha1>.ogg` name read from `TOOL_VOICE_BASE`; the class's own decisions log, §7, holds the ship-copy decision where it has one).
  **No voice (a SILENT runtime, r30+):** the lesson is silent in every language, nothing is baked and no `TOOL_VOICE` is
  played; `check` (`tr-coverage`) asks for a hi and a gu entry for every printed line once TR has begun
  (the baked-voice and ship-copy machinery is kept for a tool on a voiced runtime, and chosen by the pinned runtime's source, never by a number).
  `docs/PATTERNS.md` §11 is the
  use, `docs/LAYOUT.md` §13 the picture.
- **r24: the Answer key, Kiko's thinking pose, `api.answerReady`.** In every board tool the pink Answer key blinks (the Next key's ring) with the built-in "Tap the blinking Answer key." line only while it is what the child must press; `getState().hintKind` is exposed for every tool (not only `cardAnswer` ones). A `pad: "enter"` question may call `api.answerReady(true)` when its answer is complete, so the Enter key in the bar blinks (steady otherwise). Kiko THINKS (`MASCOT_THINK`, `data-pose="think"`, a thought puff) while a question waits untouched; the Hint key pops a bulb. `docs/PATTERNS.md` §9f, `docs/LAYOUT.md` §1b and §5.
- **Classroom mode (r22+):** the host sets `props.classroom: true`, exactly like `lang`; unset is today's behaviour.
  A tool does nothing for it. From r34 it holds nothing for a "next" tap: only a LONG line (several pieces) pages,
  each piece after the first waiting for a tap on the bubble with the blinking arrow on, and a tap when nothing is
  parked is the teacher's skip; it opens each question with a ring on the working area and hides the score; the
  sound effects stay on (r30). A tool's own `api.say` line of two sentences pages like any other (its `doneFn` runs
  when the last piece has been read). `docs/LAYOUT.md` §13b is the picture, `docs/PATTERNS.md` §13 the use.
- **A decimal:** `pointKey: true` in the tool object gives the pad a point key on every question of the tool
  (flat and off on a `parts` question), and the keyboard's "." types it. The answer is a **string in its
  written form** (`answer: "0.09"`, `"4.500"`): the skeleton's `judge` compares it exactly, so "0.30" is not
  "0.3" and ".3" is not "0.3" (the book writes the zero in front every time, and a zero on the end changes
  the written form); a tool that accepts another form says so in its own `judge`. `typed` reads "0.09"; a
  second point in one answer is refused. The scaffold writes a plan's decimal as a string. A captured pad
  passes `"point"` to `fn`.
- **`Work` props:** `{ phase, n, item, index, stage: "teach"|"demo"|"ask"|"win"|"idle"|"summary"|"free", wrong, typed, part, captured, api, MODEL, step, stepOn, box }` (`box` ({ w, h, open }, the room the working area has just now: the whole card with the answer panel shut, the classic width with it open, `docs/PATTERNS.md` §14); `part`: the box with the caret in a two-part answer; `captured`: the pad is lent to the working area right now, so draw the cell caret from it; `step` / `stepOn` (r30): the guide step and the act it waits for, null outside a steps phase).
- **`api`:** `submit(v)`, `setTyped(s)`, `say(lines, done?)` (printed on the bubble, never spoken),
  `sfx.correct|wrong|win|tick|cut|settle|trade|cheer()`, `share(fields)` (read back by `toolApi.getState()`),
  `onEnter(fn|null)` (in a steps phase it performs the current step), `lock(bool)`, `capture(fn|null)`,
  `demoDone(lines)`, `did(name)` (r30: the child did an act; the awaited one moves the step on, any other shows the
  step's hint, r34: report every act), `C`, `W`, and on a runtime with `ACTION_KIT_HELPER` `act({ tool, moves, at, from?, to?,
  ms?, onPoint?, hold? })` (2026-10-16: a real tool performs the act on screen, a Promise of true at its end, false when refused or
  ended; `docs/PATTERNS.md` §15). `getState()` adds `instruction` (the pinned line), `hint` (or null) and `acting`.
  `capture(fn)` lends the pad to the working area: digits, `"back"`, `"enter"` and `"clear"` (Escape) go to
  `fn(key)`, the slot's caret goes off, and the tool draws what is typed (a long-division "left over" cell).
  Take it only after the child taps the cell, never when a question opens; give it back with `capture(null)`.
  A tap on an answer box, the next question, a phase change, the summary and Free play's start give it
  back too; in Free play it lights the pad while held. `getState().padTo` is `"work"` or `"slot"`.
  **No keyboard trap:** the cell a child opens with Tab + Enter must let Enter pass to the window while it
  holds the pad (skip its own press handler when `captured`), as the runtime's answer boxes do; else the
  next Enter re-opens the cell and the typed number is never taken (found by the Chunk Ladder play test).
- **Dev driver** `window.__tool` (stripped at port): `state` (incl. `key`, the agent's answer), `solve`,
  `nearMiss`, `submit`, `isDone`, `oracleOk`, `controls`. **A tool's own shared field is never named `key`**
  (a data-handling brief's "key" is the pictograph's key: call it `symbolKey` or `pictKey`): it overwrites the
  driver's `key`, and `agent4` then fails ("toolApi alone finished 0 times").

## 5. Output contract (at publish time)

Two standalone files per tool, made by `port` from the checked source and **named by the slot id** (the
plan's mount id, e.g. `M1.S1.T2.C4.2D1`, which is also the JSON's `slotId` and the last part of the mount's
`2d_tool_url`, as in the NCERT tools; `port` refuses if they differ): **`<slot_id>.tsx`**, whose only
import is `react` (@use-gesture inlined as a closure, runtime + mascot + tool, no types, comments or dev
driver, `export default <Component>;` last), and **`<slot_id>.json`**, a complete sidecar (ids, the plan's
writeup and phase map verbatim, every question with its answer key, host contract, modes, toolApi,
events, scoring), **in the shape the NCERT Class 4 tools ship for phase mounts** (slotId, stage zones,
writeup, writeupDetail, model, onWrong, voice, palette, toolQuestions.authoredFallback with the plan's
question ids, unusedQuestionIds, scoring, hostContract, phaseMap, getState, windowMethods, events,
terminalEvent, voiceLines), plus `mediaId`, `component` and `build`. The `.tsx` is proved in the host
emulator (a copy of the app's loader) on every phase.
Publish follows TOOL_PASS: latest plan version, exact mount, md5-verified upload, `lp2_media` diff.

## 6. Lessons (still true)

- The winning move must be the maths, not the eye or the thumb. The child builds the answer.
- The object is playable before it is answerable; the verb of the tool is the verb of the maths.
- Before the first answer, a readout never shows the quantity the question asks for (no printed value,
  total or reference that answers it), and a bubble line or hint (a voiced runtime: a spoken hint) never names the number; after a miss, the
  traceback shows it.
- Numbers from 1,000 up are written with Indian commas (`indian()`: 4,000 · 45,000 · 4,50,000), in
  every tool, including expanded forms and place values. Not inside a fraction or a decimal's digits:
  2750/1000 and 12.563, as the book writes them (from ch 8).
- A correction ends in a state the child's next act confirms, never one it undoes. A traceback that
  fills the child's own pieces (a toggle, a tap-to-pick list, a pen) must draw its answer on a
  demo-only layer that clears on the child's next act, or hold the pieces still while it stands: the
  child's own picks stay theirs (from ch 6; three tools had the same bug).
- Escalate by kind, not size. No timers, lives or rankings on conceptual work.
- A check that has not been seen to fail is not a check.
- In headless Chrome, wait with `setTimeout`, never rAF. Measure text by its ink, not its line box.
- A translucent overlay uses `fill-opacity`, not `opacity`. Hover is CSS; pressed is state.

- Drawing helpers inside `Work` are **called, not mounted**: `{Sheet()}`, never `<Sheet/>`. A component
  declared inside `Work` is a new type on every render, so React throws the whole picture away and
  rebuilds it each frame of a drag; that also destroys the `data-cdp-pick` attribute the real-input
  checker sets on the piece being dragged, and `pointer-drag` then times out at 80 s with no other
  symptom (ch 9 Compass Bench, two phases).
  Its second symptom is keyboard focus: because React unmounts the piece on every render, focus falls off
  it after each pick, so a Tab-and-Enter child loses the control they just used and a second Tab can land
  back on it and undo the pick. Found independently on a second ch 9 tool (Angle and Grid Finder, whose
  `Ray`, `Point`, `Node` and `Knob` were all declared inside `Work`). Two tools, two unrelated symptoms,
  one cause, and no check sees either.
- A filter on a zero-height bbox renders nothing in Chrome: `filter="url(#fShadowSoft)"` on a horizontal
  `<line>` makes it vanish, because the filter region is empty. Shadows belong on rects, never on a flat
  line (ch 9 Compass Bench).
- **A correction must not take the child's taps.** A demo layer is drawn last, so it lies over the controls
  underneath it: a real mouse or finger press on a piece then hits the correction instead, and the child
  can watch a correction and be unable to touch the very piece it just told them to use. Draw the whole
  traceback inside `<g pointerEvents="none">`. None of the 63 checks sees this — the `wrong` run drives
  through the dev driver and never acts afterwards — and it applies to every tool whose correction is
  drawn over its working area, which is now most of them, since moving corrections onto a demo layer is
  the fix for the bare-Enter defect (§8). Found on ch 9's Compass Bench, where phase 1 could not be won
  after a correction because the demo's own string and arcs were swallowing the press on the metal point.
- A `click-then-enter: timed out` is often the box, not the tool. `enterRun` walks phase to phase with a
  wait at each step before it reaches the tool's first digit-typed question, so a tool whose typed
  questions all sit in the last phase starts that session a quarter of its budget behind; on a loaded
  machine (150-200 parallel Chromes) that is the difference between a pass and a timeout. Re-run with
  `C4_CHROME_POOL=1` before believing it, and suspect the tool only if an assertion actually failed
  (ch 9 Compass Bench, whose five edits touched no interaction code at all).
- **A demo-only correction layer must not take the child's pieces away.** Moving a traceback onto a demo
  layer (the fix for the bare-Enter defect, §8) has its own trap: if the piece itself is then drawn from
  the merged demo-or-own value, a correction that moved a piece leaves the child unable to do the very act
  it just asked for. On ch 9's Trace and Close the loose end vanished after its traceback and the correct
  figure disappeared from the sheet. The rule: the draggable handle and the child's own pieces key off the
  child's own state; only the illustrative extras draw the demo, and a piece the correction is holding
  elsewhere is drawn quiet in place rather than removed. `worked()` reads the child's own state only, and
  the first line of every act wipes the demo.
- **A killed Chrome leaves its temp scratch behind, and it gets killed a lot.** `runChrome`/`cdpSession`
  give every launch a throwaway `--user-data-dir` and remove it in a `finally`, but a hung renderer is
  SIGKILLed (§8's own contention retry), which skips both that cleanup and Chrome's own — and if the
  node process itself is ever killed (a harness timeout, Ctrl+C), even the `finally` never runs. Six
  parallel sessions checking for three days (2026-09-21 to 23) filled a 276 GB drive with leftover
  profile dirs before anyone noticed — a full disk mid-check reads as a wall of unrelated failures
  (`ENOSPC`, `Chrome did not open its debugging port`), not as "clean up your temp folder". `chrome.mjs`
  now sweeps its own stale dirs (idle 2h+) before every launch, capped small (a few dirs, ~1.5 s) so the
  fix never taxes a check's start the way an uncapped first attempt did (a real run of it passed two
  minutes against a few thousand stale dirs); `doctor` sweeps thoroughly and warns on Chrome's own
  `scoped_dir*` scratch, which is not ours to delete unattended since nothing here can tell it apart from
  another app's temp folder.

## 7. Decisions log

| date | decision | why |
|---|---|---|
| 2026-10-23 | **`class3/` is a copy of `class5/`'s code** (made by `classctl new`): docs, lib, runtime head, viewer; no work, no output, no frozen runtime. Sections 1-6 above are the rules and their reasons as they stood in class 5; this table is class 3's own from here on, and `classctl sync` never overwrites it. Chapter ids `indiannica_eng_maths3_ch<n>`, viewer port 5187, textbook folder `C:/Users/Karan Shah/Desktop/reasonify/maths_lp/textbooks/class-3-udgam` | the owner asked for class 3 |
| 2026-10-24 | **The answer is gated by the act** (every tool of every class): a question with a real act on the working area keeps the corner Answer key and the keypad/choice keys disabled (flat, dimmed, untappable, no blink) until the act is done, then enabled, berry and blinking; restart or a new question resets it, repeating the act does not re-lock; a question with no real act stays ungated and the builder says so; guide steps and free play unchanged. Built with `api.lock` (PATTERNS "Answer gated by the act"); the static `answer-gate` row only WARNs when a tool never calls `api.lock` | The owner: a child should not be able to tap an answer in before doing the maths on the board. No check plays it (`approve` and the host emulator are toolApi-driven, which is never gated), so the play tester and the visual reviewer judge it with real clicks |
| 2026-10-27 | **A wrong typed answer clears itself (owner, class 4 ch 11 feedback; classes 3, 4 and 5 HEAD runtimes; no freeze, no pin).** After a wrong answer the typed digits stay for the correction, then clear (400 ms after `lockNow(false)`, or 1.5 s after the miss when no correction locks the board), so the child retypes without Backspace; a digit typed meanwhile cancels it (`setTyped` resets `staleRef`). Code: `lockNow` and the wrong branch of `submit` in `runtime/runtime.tsx`. A chapter gets it by `runtime freeze` + `runtime pin --ch N` (owner's word); class 4 ch 11's seven pairs were hand-patched the same way and re-approved. |
| 2026-10-28 | **Class 3 image rules differ from class 5 in `lib/images/rules.mjs` (and `rules.test.mjs`); `classctl sync` will show them CHANGED/CONFLICT: keep class 3's.** (1) `MAX_SKINS_PER_SLOT` 12, not 3 (Measure It uses 11: only the pictures Tool 1 needs, the owner's word). (2) A `tile` may be up to 800x400 px, not 200x200 (a long object drawn across the bench is not a 4x upscale). (3) Two optional per-image fields on a photo object: `view: "side"` (photographed straight on from the side, for a door, bus or train) and `colours: "natural"` (drops the warm-colours-only and no-lines rules, for a grey road or a yellow bus); both are in a picture's key only when set, so no earlier picture is re-keyed. Reason: ch 9 C5 Measure It follows the owner's own description, and the owner: "I want real photos of whatever object the tool has". Cost: about $0.07 a photo skin (a re-make doubles it) | The owner (2026-10-28): "Raise to 8", then "real photos of whatever object the tool has; if it does not look good it is your job to make it look good" |
| 2026-10-28 | **A miss empties the slot at once: MISS CLEARS THE SLOT (every tool of the pipeline; HEAD runtime, not frozen or pinned here).** When the child answers wrong, the runtime clears the answer at the moment the miss is registered (the pad locks for the traceback): every typed digit, every box of a `parts` / `SLOT_FRACTION` / `SLOT_MIXED` / `SLOT_DECIMAL` answer with the caret back in the first box, and a picked choice or word-choice key; the slot is empty through the traceback and when the pad unlocks. Nothing else changes: no red, no cross, no score change, the traceback still ends on the whole right answer, the hint ladder and the tries advance, the answer gate (`api.lock`) is as it was, a right answer as before, Enter on the empty slot does nothing (r60's stale guard kept). A pad lent to the working area (`api.capture`) is sent its documented `"clear"` key (Escape's) once, just after the miss, if the same handler still holds it; a `cardAnswer` card reads the emptied `typed`. Tools write nothing: `wrong.value` keeps what the child sent. Code: `submit`'s wrong branch in `runtime/runtime.tsx` (marker comment `MISS CLEARS THE SLOT`, `caps.missClears` in `lib/core/caps.mjs`); it **supersedes the 2026-10-27 row**: the two delayed clears (400 ms after `lockNow(false)`, 1.5 s after the miss; frozen in r2) are removed from the head. Check `miss-clears-slot` (real keys and clicks on one question of each kind, plus the scripted miss of every phase; an INFO row on a runtime without the marker, so r1, r2 and every finished chapter stay green); `wrong-is-unmarked`, `hint-pinned`, `parts-input` and `board-panel` read the emptied slot on a marked runtime and are unchanged on an older one; the sidecar's `onWrong.marks` says so on a marked runtime only. A chapter gets it by `runtime freeze` + `runtime pin --ch N` on the owner's word; classes 4 and 5 by `classctl sync` (their own §7 rows are added there) | The owner (2026-10-28): after a wrong answer the child should find the answer box empty and type or pick a fresh answer, without rubbing out the old one; the clear comes at the miss, not after the correction |

## 8. Open questions

- **Skins on a hundred-cell grid.** The `skins` check allows 40 skins a screen, so a 10 x 10 grid cannot wear one tile per cell: a hundred-grid skins the whole it comes from and the pieces lifted out of it, the rest plain. Options: a new `sheet` kind (one picture of the whole tray or chart cut by the tool's grid), or a higher cap. A check and CLI change: the owner's word.
- **A question's own ladder.** The runtime reads ladder rungs 2 and 3 only from the PHASE's `ladder`; a question needing its own sets them from `Work`, and the static checks (`hint-fit`, `bubble-no-repeat`, `answer-not-echoed`, `tr-coverage`) never see them (the language pass adds their TR lines by hand). `rungOf` using `it.ladder || ladder` would make it native; it needs a freeze and a re-pin.

- The plan's chrome `ink #2B2B2B` equals content `line #2B2B2B`; TOOL_BUILD_SPEC's gate fails a
  chrome/content collision. Shift one of them (e.g. ink `#262626`)?
- The host question bank is prose Q/A; tools keep their authored items (`fitHost: () => null`). Revisit if
  the host starts sending structured items.
- **`findPieces` burns its whole budget on a phase that has no drag piece** (`lib/check/input.mjs`).
  Measured on ch 10's Tile Bench, phase 2: 23.8 s to return no pieces. That phase's three items are
  complete patches by design (the child judges them, it does not extend them), so `trayShown` is false
  and there is nothing to drag; `findPieces` still spends `until(…, 16000)` + two `gotoStep` +
  `until(…, 3000)` before concluding so. A tool with a piece on its first question finds it in about a
  second. The cost is not the tool's drawing: the same tool measured the smallest DOM of its chapter
  (209-312 nodes), zero long tasks over 50 ms and a clean console. The effect is that such a tool's
  Chrome is the longest-lived of a chapter, so it is the one most often still alive when a sweep or a
  load spike lands, and it collects timeout artefacts that look like tool defects. A cheap "this phase
  declares no pieces" probe would remove it. Not fixed here: `lib/` is shared and another session is
  editing it.
- **`Hit` always swallows Enter**, so the no-keyboard-trap rule of PATTERNS.md §5 cannot be expressed
  directly: `Hit`'s `usePress` is built with `enabled = true` and its key handler calls `preventDefault`
  and `stopPropagation` unconditionally, so a cell that holds the pad cannot let Enter reach the window
  while staying focusable. Found by the ch 10 Tower Builder builder, which worked around it by not
  rendering the `Hit` for a box while that box holds the pad (Enter then reaches the window). `usePress`
  already takes an `enabled` argument, so a `Hit` with an `enabled` prop would fix it. Affects every tool
  that uses `api.capture`. Not done here: ch 10 has a working workaround, and a runtime change would mean
  a freeze, a re-pin and a re-check of the whole chapter for something no tool currently needs.
- **(ch 9, found with real keys) A bare Enter after a miss auto-WINS a `pad: "enter"` item.** r2's fix
  ("an answer that just missed is never sent again unchanged") guards typed values only. On an item
  answered on the working area, Enter commits `undefined` and the tool's own `answer()` / `worked()`
  decides — so a traceback that redraws the right answer into the tool's state is then submitted by a
  bare Enter as if the child had done it, and the question is won with no act at all. Proved live on
  three items of ch 9's Trace and Close (2.3, 3.1, 4.1); all 63 checks pass with it present. Worse than
  the ch 6 "a correction the child's next tap undoes" defect, which only cost a try. Interim rule, applied
  to every ch 9 tool: **a traceback draws on a demo-only layer that clears on the child's next act and
  never writes into the state `worked()` reads** (PATTERNS §7 extended to act answers). Open: should the
  runtime refuse a bare Enter on a `pad: "enter"` item until the tool reports a fresh act — the analogue
  of the `fresh` gate in `pressPart`? Eight builders wrote the unsafe shape unprompted, so the rule alone
  may not be enough.
- **(ch 9, found with real keys) `useDrag`'s `keys()` fires the drop at `{x: NaN, y: NaN}`.** Tab to a drag
  piece and press Enter or Space and the tool receives NaN coordinates, though PATTERNS §6 promises
  "Enter or Space is a tap". In ch 9's Trace and Close this produced real React and SVG errors ("Received
  NaN for the cx attribute", "<rect> attribute x: Expected length, NaN"), made a piece vanish, and left
  two `pad: "enter"` items unanswerable by keyboard — on one, every coordinate test against NaN is false,
  so the figure silently never reaches its target with no console error to explain it. Tools can guard it
  (a `!moved` branch that snaps to a sensible default), and ch 9's do, but the payload should carry the
  piece's own position. This is an accessibility failure, not polish: a keyboard-only child cannot answer
  those items at all.
- **(ch 9, found with real keys) A bare Enter after a miss re-sends a stale CHOICE and costs a try.**
  r2's stale guard excludes choice items by hand — `if (staleRef.current && L.item.pad !== "enter" &&
  !L.item.choices) return;` (runtime.tsx:1526, verified in frozen r2) — so on a word-choice question a
  miss followed by a bare Enter resubmits the same wrong choice and takes the child's second try, the
  very defect r2 was made to end. It matters most in ch 9, whose answers are words and choices
  throughout, but it reaches every chapter with a choice item. Guarding choices looks safe and costs the
  child nothing: a choice key commits directly through `onChoice` and never through the Enter path, so
  Enter has no legitimate work to do on such an item. Found by the ch 9 Fold and Mirror builder's probe;
  no tool works around it.
- **The two entries above are one defect, and this is its precise shape.** r2's stale guard runs only for a
  plain typed answer: `if (staleRef.current && L.item.pad !== "enter" && !L.item.choices) return;`
  (runtime.tsx:1526) exempts BOTH act answers and choice items. So on either kind, a bare Enter after a
  miss re-sends the stale value. That always **costs the child a try** and replays the traceback, for a
  keystroke that should do nothing; and where the tool's own traceback also wrote the right answer into
  the state its answer reader uses, the same bare Enter **wins the question outright**. Six ch 9 tools were
  audited with real keys: the free win was found on one (Trace and Close, three items), the lost try on
  three more (Solid Workshop's sort, Compass Bench's ML2 and ML3), and the tools that were clean on both
  had each already guarded Enter themselves with `api.onEnter`, answering only work the child has made and
  not yet had judged. That is the interim builder rule for every act-answered item; a choice item cannot
  guard itself, since the choice key commits through `onChoice` and never through Enter.
- **A killed browser reads exactly like a broken tool, and a builder will "fix" working code.** Six to
  eight chapter sessions run `check`, `shots` and play runs on this box at once, all spawning `c4cdp-*`
  Chromes. On 2026-09-23 a ch 6 play tester swept ~57 "leftover" ones and took three chapters' live runs
  with it: ch 7 and ch 8 saw `pointer-drag`, `parts-input`, `point-input` and `click-then-enter` FAIL
  together, ch 10 saw `chrome hung and was killed` and `Chrome did not open its debugging port` on one
  tool over three runs. Every one passed on a clean re-run with nothing changed. The tell: the failures
  are **timeouts or a dead browser, never an assertion**, and a different check each run. So: re-run a
  real-input FAIL before believing it, and never send a builder a report of timeouts it cannot reproduce
  — ch 10 had already told its builder to profile a render path that was never slow. The agent rule
  ("never kill a Chrome you did not start") is in `.claude/agents/udgam-play-tester.md`. Open: the pool
  could tag each Chrome with the session or slot id, so a cleanup can scope itself to its own processes
  (`lib/check`, shared; not done while other sessions are editing there).
- **(ch 9) `toolApi.gotoStep(k)` in USER mode does not stay inside the mounted phase.** From a phase-2
  mount, `gotoStep(1)` landed on phase 1 question 2. The §7 decision says gotoStep, next and prev stay
  inside the phase being shown *in AI mode*; user mode was never stated either way. It cost a ch 9 builder
  a round of false "stuck" readings before it played forward instead. Decide whether a phase mount should
  hold in user mode too, or whether the probe rule is simply "play forward, never gotoStep across a
  mount".
- **(ch 9) A working-area control that holds keyboard focus swallows the submitting Enter.** `usePress`
  always calls `preventDefault` on Enter and Space, and the runtime's window handler skips any event with
  `defaultPrevented`, so a control the child last touched by keyboard eats the very Enter meant to answer
  the question: the control fires again instead of the pad submitting. `enabled: false` on r4's `Hit` only
  fixes it by disabling the pointer too (and any refusal sound the control's own miss line relies on); a
  `Key` has no equivalent short of `disabled`, which draws it flat. A capture handler in the tool cannot
  simply intercept it either, because React's synthetic `stopPropagation` stops the native event as well,
  so the window handler never runs at all — the tool must call `api.submit()` itself once it has decided
  the Enter belongs to it, only when an answer is actually waiting (else Space/Enter must still press the
  control). Worked around per-tool four times this chapter (Edge Walker found the mechanism; Compass Bench,
  Line Kit and Trace and Close each carried variants; Edge Walker's capture handler is the cleanest
  version, and Compass Bench applied it as-is). Open: a runtime rule such as "a control passes Enter to the
  window whenever the slot holds an answer" would spare every tool the workaround.
- **(ch 9) "Judged" must compare the work, not the answer string.** A guard that gates a stale resend by
  comparing the last-judged answer text can refuse a genuinely new attempt: on Compass Bench, every
  off-centre chord reads the same string, "off centre", so a child who moved a wrong chord to a *different*
  wrong position had their new attempt silently refused as unchanged. The guard now keys off the sheet
  itself (the circles drawn, the tags placed, the chord's position), not the string the sheet would report.
  A subtler variant of the stale-answer defect than the free-win or the lost-try: this one refuses a real,
  different act because it happens to grade the same.
