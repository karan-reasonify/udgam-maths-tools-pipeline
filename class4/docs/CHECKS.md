# What `check` proves

`node cli.mjs check <MEDIA_ID> --ch N` runs every check below on the tool as it stands and prints one
table (PASS / WARN / FAIL / INFO). The result goes to `status.json` together with a hash of the exact
source it checked, so `port` and `publish` refuse a tool that changed after its check or failed it.
It first rebuilds the preview from the source it hashes, so it can never pass on a stale page. About
three minutes: for a four-phase tool 27 scripted runs (four a phase, keys, free play, play again, a whole
lesson, sound, the Hint key, the hint run, two classroom runs, a classroom hint run and a classroom paging run;
one more when the tool draws skins and one per guide-steps phase) and 5 screenshots (9 on a board tool) in
headless Chrome, 4 at a time (`C4_CHROME_POOL` sets it), then real mouse, finger and key input. `--no-render`
runs only the first two groups (a few seconds): a quick check that never certifies or ports the tool.

**The lesson is silent (runtime r30, every tool on a silent runtime).** The rows that judged a voice are retired with
it: `mute`, `voice-pick`, `voice-sync` and `sound-on-start` (and the scripted speech engine, `?fakevoice`,
the `mute` and `blocked` runs and the mascot-while-speaking parts). `silent`, `sound-button`,
`guide-steps`, `no-arrow-outside-classroom` and `tr-coverage` replace them; `voice-no-repeat` is now
`bubble-no-repeat`.

**The lesson is action-driven (r34) and every line is one page (r35).** `hint-pinned` replaces `hint-on-miss` (a
runtime before r34 is still judged by `hint-on-miss`); `hint-fit`, `one-page` and `hint-key` are new; `classroom`
judges the r34 classroom (no holds: long-line paging and the teacher's skip only; a runtime before r34 gets a WARN
asking for a re-pin); `guide-steps` adds the step hints, a wrong act, one check per step and a real click on each steps phase's first
control.

**The phase party (r39).** A free play between phases with a Next phase key was built as r38 and dropped on the
owner's word; r39 keeps only the party, and r40 starts it at the right answer of a phase's last question. `phase-party` proves it in one DevTools session with motion ON (every other
run forces reduced motion, which skips the party); `no-free-between-phases` guards that free play opens only from the
summary page, in every run (the probe records the stages each run goes through).

A **FAIL** is fixed before the user reviews the tool. A **WARN** is for a person to judge. **INFO** is a
fact worth knowing (for example, which answers are the tool's own and which come from the plan).

**What the printout shows (compact by default).** `node cli.mjs check` prints the header, one line for the passes (`86 PASS`
and, when short, their ids), every row that is not a pass in full (WARN, FAIL and INFO, each with its builder hint, under its
group heading) and, last, the summary line exactly as before (`N pass · M warn · K fail · I info`, which agents and docs read).
`--rows all` (or `C4_CHECK_ROWS=all`) prints every row as it used to. Nothing is lost: `status.json` and `.build/check.json`
always hold every row; only the default stdout is shorter. A pass row you want to read is in `.build/check.json` (or run again
with `--rows all`). `check` makes no review frames: the full-size frames a visual review judges are the review pack
(`node cli.mjs shots <slot_id> --ch N --pack`, `docs/REVIEW_PACK.md`).

## Which rows run: by the pinned runtime's source, never by a number

`check` reads the chapter's pinned runtime (`work/<chapter_id>/runtime.json` -> `runtime/frozen/<rN>/`) and runs the rows that runtime can prove (`lib/core/caps.mjs`): a feature row (board, start page, guide steps, hint, Hint key, classroom, party, skins ...) exists only for a runtime whose source has the feature, and the voice and the silence are two different sets:

- **VOICED runtime** (no `const SILENT_VOICE = true`: Class 4's frozen r1-r21; 64 rows on a pass): the rows of the table below, the `mute` and `blocked` runs with a scripted speech engine (`?fakevoice`), and none of the silent rows.
- **SILENT runtime** (`const SILENT_VOICE = true`, r30+): `silent`, `sound-button`, `tr-coverage`, `one-page`, `bubble-no-repeat` (in place of `voice-no-repeat`), the hint and guide-step rows, and none of the voice rows.

### Voiced-runtime rows (labelled; they do not run on a silent runtime)

| check | what it proves |
|---|---|
| voice-in-words | every spoken line becomes words before it is spoken: no digit, symbol or unit abbreviation left |
| voice-lines | spoken lines have no en or em dash, and every spoken piece is at most 20 words and 110 characters |
| voice-no-repeat | the voice never repeats itself: a phase is one run (the opening on phase 1, the teach lines, every question's say, every miss, the ladder) and so is a closing with the next teach and first question; no sentence comes twice in a run, nor a near copy (a 5+ word sentence inside another, or in order inside one at most 3 words longer). Win lines and answer sentences are the tool's own fields: not read here |
| mute | muted means silent: no speech and no audio at all |
| voice-pick | the Indian English voice is chosen over US, UK and Hindi voices |
| sound-on-start | sound starts on; a browser that refuses speech until a tap gets the Tap to start cover, the lesson waits on line one, and the tap speaks it from its start |
| voice-sync | mute 45 % into a line: the bubble keeps that line for its time, the mascot stops, nothing is spoken; unmute: the rest of the same line is spoken from a word start; then the lesson carries on without a skip |

## Source (reads the files)

| check | proves |
|---|---|
| host-scope | only `react` is imported (plus the one library port bundles), only the five host hooks are called bare, `export default <Identifier>;` is last, no `export default function`, no `export interface`, no stray export, no storage / network / raster in `tool.tsx`, no raw `fontSize` numbers |
| events | `finished` leaves three ways: window `CustomEvent`, `parent.postMessage`, `props.onComplete` |
| phase-prop | the tool reads `props.phase` |
| modes | user mode (`navigableDots`) and AI mode (`window.toolApi`, the eleven verbs) are wired |
| focus-ring | a keyboard focus ring exists and shows only on `:focus-visible` |
| mascot-inline | the mascot travels inside the tool, so nothing is fetched |
| host-names | the runtime and tool never use a browser global the host hides behind a mock lucide icon (`Image`, `File`, `Lock`, `Infinity`); reach it through `window` |
| no-raster-in-tool | the tool draws everything it shows |
| runtime-pin | the chapter names a frozen runtime (`work/<chapter_id>/runtime.json` -> `runtime/frozen/<rN>/`) and that snapshot is untouched, so no other chapter's runtime edit can reach this tool. A FAIL is the main session's to fix (`node cli.mjs runtime pin --ch N`), never the tool's |

## Maths (runs the tool's own data in Node: the same PHASES, judge and oracle the child meets)

| check | proves |
|---|---|
| number-words | `words()` is right on 24 numbers from zero to one crore (Indian system, hyphens, no "and") |
| indian-commas | `indian()` groups 3-2-2 on 12 numbers |
| speakable | numbers, comma forms, fractions (3/4 "three quarters", 3 2/5 "three and two fifths", 14/21 "fourteen twenty-firsts", 8/1 "eight over one", read exactly), decimals, rupees and paise, clock times, units, ordinals, degrees and + − × ÷ = all become words (the bubble prints `speakable(line)`) |
| oracle | every answer re-derived by a second route that shares no code with the judge or the picture |
| answers | every item has an answer; `judge()` accepts it; `judge()` rejects the item's near miss (the misconception) |
| answer-not-echoed | no question, hint, ladder line or teach line prints its own answer, in digits, comma form or words (a build target is exempt: the number IS the question) |
| choices | a word-choice item offers its answer exactly once, with no duplicate choices |
| voice-in-words | every bubble line (guide steps included) is printed as words: no digit, symbol or unit abbreviation left after `speakable` |
| voice-lines | bubble lines (guide steps included) have no en or em dash, and every piece is at most 20 words and 110 characters |
| hint-ladder | every item has a miss line and every phase two ladder rungs: three tries, none of them the answer |
| bubble-no-repeat | (was `voice-no-repeat`) the bubble never repeats itself: a phase is one run (the opening on phase 1, the teach lines, or instead its guide steps and their hints; every question's say, every miss, the ladder) and so is a closing with the next phase's opening and first question; no sentence comes twice in a run, nor a near copy (a 5+ word sentence inside another, or in order inside one at most 3 words longer). Win lines and answer sentences are the tool's own fields: not read here |
| tr-coverage | once a tool's `TR` has a Hindi or Gujarati entry, every English line it prints has an entry in BOTH: `TOOL_NAME`, each phase's `concept`, `says` (not on a guide-steps phase, which never shows them), `steps[].say` and `steps[].hint`, `ladder`, `closing`, `learned`, each item's `say` / `ask` / `miss`, choice labels, two-box `parts` labels and units (the stacked and side-by-side boxes print none), `OPENING` (unless phase 1 has steps), `FINISH_LINE` (only before r44), `FREE_LINE`, `START_HOOK`, and every literal `api.say("...")` / `api.demoDone(...)`. A `{ en, hi, gu }` value carries its own. "N lines have no hi entry: ..." (the list the `voice` command used to print). A tool with no entries yet is not asked (INFO). From r44 (the simple summary page) `FINISH_LINE` and the last phase's `closing` are never shown, so not asked; a tool that keeps them breaks nothing |
| guide-steps (quick check only) | with `--no-render`, the shape half of the render row below |
| one-page (r35) | every instruction (a step's `say`, a question's `say`, else its `ask`) and every hint (a step's `hint`, a question's `miss`, the phase's ladder rungs), as the bubble prints it (the runtime's own `speakable` and `pieces`, loaded through the model), is exactly ONE bubble page, so nothing pages by a timer: English FAILS, the Hindi and Gujarati of the same line (TR) WARN. Win lines, closing lines, `learned` and `FINISH_LINE` are exempt |
| hint-fit (r34; source here in a quick check, source and render in a full one) | every hint a question can show (its miss, then ladder[0], then ladder[1]) and every step's hint, under every piece of its instruction, fits the bubble in a banded layout, worked out exactly as the runtime's Footer does (instruction 32 + hint 32, 1 + 2, 2 + 1 or 1 + 1 lines, then the same at 28, about 35 and 40 characters a line): FAIL when none fits (the runtime would draw the hint alone) or a hint is over 80 characters; WARN when only the tight layout (28, 2 + 2, no band) fits; Hindi and Gujarati warn only, laid out by their own rule on a runtime that has it (r43, `DEV_RULE`: 1.45 em, gap 4, pad 4, 12 over the first line, no tight layout, so only a 1 + 1 pair fits): a hi/gu pair drawn as the hint alone is a WARN that names it. The render half fails a hint that was in `getState()` but not drawn |
| concept-ids | every phase carries a concept id and objective ids |
| learned-lines | every phase has a "You learned: ..." line for the summary page, at most 72 characters |
| question-ids | every item that carries a plan question id names a real question of its own phase, once; the rest are listed as unused |
| score-honesty | **exactly three questions a phase** (a FAIL otherwise) at +5 each, so the maximum the host is told is the maximum that can be reached |
| plan-concepts | the phases' concept ids equal the plan's `phase_map` |
| plan-answers (info) | which answers carry a plan answer and which the tool authored |

## Render (every phase in headless Chrome, in user and AI mode)

Runs per phase: at the first question (`ask`), after a wrong answer and its traceback (`wrong`), after
the whole phase (`idle`), and played by the agent through `window.toolApi` only (`agent`, AI mode). Plus a
keyboard run, a `sound` run that starts with the sound effects on, the two classroom runs and a `steps` run for
each guide-steps phase; from r41 the `pieces` runs (classroom), a `ladder` run and the `choiceline` runs, and
three DevTools sessions with real input (a wrong act at every guide step, the bubble's ink in every language, a phase
dot during the party). Every run carries the probe (`?probe=1`): console, network, storage, `speechSynthesis.speak`
calls and AudioContexts counted, and a MutationObserver that notes every moment a Tap to start cover, a talking
mascot, the classroom arrow or the bubble control was on the page, so "never" means the whole run, not its last frame.

| check | proves |
|---|---|
| runs | every scripted run finished and reported |
| no-overlap | no two texts overlap (measured by their ink band from the baseline, not their line box) |
| zones | every shape and text stays inside its zone: header, runs, work, slot, pad, voice, bubble, bar (a `board: true` tool: ask, work 1472 wide, drawer, slot and pad in the panel; each question is sampled with the panel shut and open) |
| on-stage | nothing leaves the 1600 x 900 stage |
| type-floor | no rendered text below 28 stage units, scaling included |
| finger-boxes | every live control is a labelled, focusable button at least 72 x 72 |
| no-crowding | no two live finger boxes overlap |
| pad-shape | the pad's shape matches the question (LAYOUT.md "Pad"), read off the live controls at the first question of every phase and again after its miss: a working-area question (`pad: "enter"`) draws **only Enter**, no digit and no rub-out key, quiet or otherwise; a typed question draws all twelve, quiet while locked but never missing. Word-choice questions and a pad lent to the working area (`padTo: "work"`) are skipped, the point key is not judged, and the detail says how many of each kind were sampled. A tool with typed or working-area first questions that samples none FAILS (a check that saw nothing is not a pass). A chapter pinned to a runtime from before the fix (r8 or earlier) fails it on every working-area question: re-pin |
| one-invite | at most one pulsing invite at a time |
| no-raster / no-emoji | no picture but the mascot (and, on a `board: true` tool, the object skins below); no emoji |
| skins (only when a skin is drawn) | a `<Skin>` picture (docs/IMAGES.md) lies wholly inside the working area, and at most 40 are on one screen (one picture reused and clipped is what keeps a tool small) |
| skin-keys (source; only when the tool draws a literal `<Skin name>` and `images.tsx` exists) | every `<Skin name="...">` the tool draws has a picture of that name in the slot's `images.tsx` (a name with none draws nothing, silently) |
| skins-fallback (only when the tool draws skins and `images.tsx` exists) | the first question is drawn once more with `props.skins` false (`?noskins=1`) and must draw the same number of plain, non-image shapes in the working area: the plain drawing under the pictures is the whole drawing, so a missing or undecodable picture changes nothing but the look |
| board-fit (`board: true` only) | with the answer panel open nothing of the working area, shape or text, runs under it (the picture must rearrange into the room that is left) |
| start-page (a tool with `StartArt` / `START_HOOK` only) | by a real mouse and Enter, with the sound effects on: the tool opens on its start page with no line on the bubble and the stage "teach" (nothing begun), still so after a 3 s wait; nothing of the tool's header, bubble or working area shows behind it; its text keeps the type floor, stays inside the card and never overlaps, in English, Hindi and Gujarati; the Start key is a labelled 72 x 72 button; a tap (or Enter) takes the page away and the tool's first line (its first guide step, else its first teach piece) is on the bubble within 2 s; `speechSynthesis` is never called. On a runtime with `backToStart` (r32), the click run then plays one question and presses the header's reset key: it is labelled "Back to the start", the start page comes back with a clean slate (phase 1 of the mount, nothing played, not complete, no header, bubble or working area, stage "teach", still so after 2.5 s), and Start works again (the page goes, the first line is on the bubble); an older runtime is not asked. Every other run and screenshot skips the page |
| board-panel (`board: true` only) | real mouse, finger and keys, with motion on: a question opens with the panel shut and the working area 1472 wide; a tap on Answer opens it (area 1086, key reads Close); Close shuts it; a finger does the same; a digit typed opens it and lands in the box; a miss shuts it for the traceback (when the tool locks the pad) and it returns with the answer kept. The key, box and point runs press the keypad with `?answer=open` |
| stillness | nothing animates forever under reduced motion |
| focus-visible | the page carries the keyboard focus rule |
| labels-short (warn) | the working area holds labels (at most 4 words), not instructions |
| colour-budget (warn) | how many content hues are on the working area at once |
| picture-is-number | the chart's digits and the running count always equal the tool's own value |
| modes | user mode: the phase dots are buttons "Step k of N" with one current; AI mode: pictures only |
| phase-bar | the current phase's pill is filled a part per question (a third at question 1 of 3, full at the end), as drawn, not only as set; earlier phases finished, later ones empty |
| miss-shows-answer (warn) | after a miss, the correction ends with the right answer on the working area (as a number, a comma form or a row of digit cards; a decimal "0.09" in its written form or as a row of digit and point cards); answers that are not numbers are judged at review |
| wrong-is-unmarked | after a miss: no red, no cross, no "wrong"; the child's answer and the question stay; the pad re-opens (the header's concept name, the plan's own words, is exempt from the word scan, and `×` beside a number is multiplication) |
| hint-pinned (r34; `hint-on-miss` before r34) | (the `wrong` run of every phase, and the `hint` run on phase 1 without and with `?classroom=1`) after a miss, sampled every 30 ms: within 700 ms `getState().hint` is the rung as the runtime prints it (the item's `miss`, else `ladder[0]`; digits as words), `getState().instruction` is still the question's own line (pinned), and the bubble draws both, `data-role="instruction"` and `data-role="hint"`, with the same text; the child's answer stays in the slot; 4 s later the SAME hint; a second miss brings the next rung with the instruction unchanged; a right answer clears it (`hint` null, no hint drawn); the hint is never the question's own line |
| hint-key (r35) | (the `hintkey` run, on the first guide-steps phase, else phase 1) the header's key `data-control="again"` reads "Hint" with a 72 x 72 finger box; at a guide step a press shows that step's hint and moves nothing (instruction, stage and step unchanged); at an open question nothing shows until it is pressed, the first press shows the first rung (the miss, else `ladder[0]`), the second the stronger one (`ladder[0]`, else the miss), `getState().hint` follows, a right answer clears it; with nothing to hint (a celebration) a press changes no state |
| hint-ladder-monotonic (r41: the runtime has `kRung`) | (the `ladder` run, phase 1's first question) the Hint key pressed twice (the first rung, then the stronger one), then a wrong answer: the hint after the miss is the rung on show or a stronger one, never a weaker one (never the item's `miss` again after `ladder[0]`), and the bubble draws what `getState().hint` says. Builder line: write the miss and the two ladder rungs all different, each saying more; with distinct rungs a FAIL is the runtime's |
| hint-lines-clear (the runtime's Footer has `pit` and keeps the hi/gu block `b.y + topOf` under the bubble's top, r43) | by INK, not by text boxes (a font box is taller than the pitch, so boxes overlap even where the ink is clear): in English and in each language the `TR` table has begun, a screenshot of every phase after a wrong answer at its second question, and after a wrong act (`__tool.did`) at its first guide step; the pixel rows between each pair of consecutive lines (instruction and hint) are read over both lines' width (ink: a pixel far from the bubble's white, the band and its bar): at least 2 clear stage units between any two lines, at least 2 between the text and the bubble's outline at the top and at the bottom, and 6 units of the bubble to spare in all. Frames are `.build/hintframe-<lang>-<phase>-step|miss.png`. Builder line: shorten that line's Hindi or Gujarati so the pair takes two lines; if it already does, the layout is the runtime's |
| choice-answer-line (r41: `UI.pickIt`; a `board: true` tool) | (the `choiceline` run in en and each TR language: the first choice question found by `gotoStep`) the Answer key brings `UI.pickIt` ("Choose your answer." in the language), never `UI.typeIt`, drawn in the bubble as `getState().hint` says, in the neutral band: its band and bar colours differ from those of the hint a wrong choice then shows (the accent). INFO "not asked" when the tool has no choice question. Builder line: nothing to write, the runtime's |
| finished-once | a phase before the last sends no `finished` and walks on to the next phase by itself, with `question_done` once per question; the last phase sends `finished` exactly once from the summary page, with phase, concept, score, max, first-try count, stars and doneId right |
| agent-drives | in AI mode the teacher agent plays every phase through `window.toolApi` alone: a phase before the last walks on to the next, the last finishes; `next()` after the last right answer does not reopen it, and `getState()` never shows an answer before it is given |
| tool-api | `window.toolApi` has the eleven NCERT verbs, `window[TOOL_ID]` is its alias, `getState()` has every field |
| console-network-storage | no error, no warning, no network call, no storage |
| silent | in EVERY probe run `speechSynthesis.speak` is never called (the row says in how many runs it was really watched), no Tap to start cover (`data-control="tap-to-start"`) ever appears, `getState().voice` is `"silent"`, and the mascot never has the talking class `c4-talk`. A chapter pinned to a runtime before r30 fails it: re-pin |
| sound-button | a short run with the sound effects on from the start: a miss and a right answer play their effects; `setParam("muted", true)` then `false`: `getState().muted` follows and the header's sound button relabels, nothing throws, no console error (headless Chrome may keep the Web Audio context suspended: only the state and the errors are judged); and every run that starts muted (`?muted=1`) makes no AudioContext at all |
| no-arrow-outside-classroom | outside classroom mode there is no cue (`.c4-cue`) and no bubble control (`[data-control="bubble"]`) at any moment of any run; in the classroom runs the bubble is a control (the teacher's skip); the cue itself shows only while a piece of a long line is parked, so it is proved by the `classroom` row's scripted long line, not required here |
| guide-steps (only when a phase has `steps`) | each such phase is opened (`steps` run): the bubble shows step 1's line with the stage "demo"; after 4 s nothing has moved (no timer advances a step); a WRONG act (`__tool.did` with a name the step does not wait for, r34) returns false, moves nothing and shows step 1's `hint` under the pinned instruction, drawn, the same 3 s later; each `toolApi.check()` (the agent's act: the tool's `onEnter` performs ONE click) raises `guideStep` by exactly one, clears the hint and shows the next step's line, so N steps take N checks; on each steps phase the first step's control (`[data-control="<on>"]`) is clicked once with a REAL mouse and the step must move on at once (a step whose act is a piece of the picture, with no control of that name, is skipped with a note in the row); after the last act (and the step's hold, none under reduced motion) the stage is "ask" and the bubble shows the first question's line. Each step has a `say`, an `on` and a `hint` (strings); an `on` may repeat (one click a step, steps in order); hints are unique in the phase; a hint differs from its say and is at most 80 characters; each piece of `say` is at most 20 words and 110 characters with no dash |
| guide-steps-real-wrong (r41: the runtime has `demoMiss` and `workTap`; only when a phase has `steps`; the empty board when it has `data-role="work-floor"`, r42) | one DevTools session per steps phase and kind of act, REAL input at EVERY step: a mouse click on an inert point of Work's drawing (an element under `[data-zone="work"]` with no `[data-control]` ancestor, or only an `aria-disabled` one, not the floor and not inside a nested zone); a mouse click on the EMPTY BOARD (a grid point whose element is the `work-floor` rect); a digit key; 300 ms later `getState().hint` is that step's `hint` (as printed) and the bubble draws it, the instruction is still the step's (pinned) and `guideStep` has not moved; then a real click on `[data-control="<on>"]` (else `toolApi.check()`) still moves it on (step k+1, the question after the last). A step whose drawing has no inert point (every shape a live control) is noted, not failed; an empty-board click that shows no hint FAILS, and so does a working area with no floor rect; a box drawn over entirely (no empty board) is noted. Builder line: give every clickable element `data-control` and report its act with `api.did`; leave the rest of the working area plain |
| mascot-decoded | the mascot's inline picture decodes (the drawn fallback was not needed) |
| keyboard | digits + Enter answer the first question typed on the digit keys (a two-part answer box by box: digits, Enter, digits, Enter; a decimal with the keyboard's "." when the pad has the point key) (in any phase; a tool whose answers are all made on the working area needs no typed mode), Enter drops the waiting token, Enter on a phase dot jumps phase |
| summary-page | the last phase ends on the summary page: one "You learned" row per phase, Play again (and Free play), and `finished` sent from it 5 s after it opens |
| free-play | Free play opens the tool's own no-target mode with live controls, and `finished` is not sent when it is tapped first |
| play-again | Play again restarts the mount's phase, and `finished` is not sent when it is tapped first |
| whole-lesson | with no `phase` prop every phase runs in a row, then one summary page and one `finished` with the whole score |
| summary-simple (r44: the runtime has `summaryLine:`) | one DevTools session per language (en, hi, gu) and one English classroom session: the last phase mounted, its last question answered, then from the moment the page opens the state is sampled every 100 ms for 8 s: the bubble shows exactly `UI.summaryLine` of the language and never changes by itself; `getState().summaryRow` stays -1; no `.c4-ring` inside `[data-zone=summary]`; `finished` is sent once, 4.5 to 6.5 s after the page opens; a screenshot 1 s in, read by ink: one or two bubble lines, at least 2 clear units between them and to the outline; in the classroom a real click on the bubble 2 s in leaves the stage, the row and the line as they were. Free play and Play again are proved by their own rows. Builder line: nothing to write, the runtime's |
| phase-party (r39; the moment from r40) | one DevTools session with motion ON, one user-mode mount from phase 1 through EVERY phase (each phase's third question answered right, the clock starting at that answer): every phase's party, the last phase's included, appears (`data-zone="party"`, `getState().party` true) within about 1 s of the right answer of the phase's last question, before the win animation ends, whatever the tool's `winMs` (the check never waits for the phase end or the summary first); the union of its boxes over its life stays inside the 1600 x 900 stage, it has `pointer-events="none"`, and it is gone 1.2 to 3 s after it appears (about 2.3 s); a phase before the last walks on to the next phase's teach no earlier than 2.2 s after its party appeared (the walk waits for the party) and never through a `"free"` stage; in every other run (all forced to reduced motion) it never appears (the probe watches for `data-zone="party"`). From r41 (`enterPhase` ends the party): a second motion-on session answers phase 1's last question right and, while the party is on, clicks the phase-2 dot with a real mouse: 300 ms later no `data-zone="party"` and `getState().party` false; and the popper cones of phase 1 and of the last phase (their boxes at first sight) stand clear of the bubble (x 254 to 910, y 748 to 892) and the phase pills (x 930 to 1560, y 782 to 800), noted when they cannot be measured. Builder line: nothing to write, the party is the runtime's and starts at the right answer of the phase's last question |
| card-answer (r52, a tool with `cardAnswer: true`) | one DevTools session with motion ON: the steps are walked until a question of each kind is met. A question answered on a card: it opens with the keypad shut, its card is a 72 x 72 tap target `answer-open` and BLINKS (a ring, animated, its stroke opacity swinging by 0.5 or more over 1 s), nothing stands in the question bar, and a built-in line (hint kind "type") under the instruction says where to tap; a real click opens the keypad (no second answer box, a Close key at the top of the panel, the card's boxes `part-1` / `part-2` there, the blink stops, the line changes), a miss then runs the correction (the keypad comes back) and the first digit retyped shows IN the card's box; the typed digits show IN the card's boxes and Enter answers. A choice question: its keys are in the question bar (each ringed and blinking, 72 high, inside the stage), no Answer key, the keypad stays shut, a choose line shows, a wrong key first opens no keypad panel and adds no second pair of keys; one click on the right key answers. A question that keeps the Answer key: it blinks in the bar and a line says to tap it. Builder line: set `cardAnswer: true`, draw the card per PATTERNS 9e; a FAIL names what is missing |
| next-key (r48, a tool with `nextKey: true`) | two DevTools sessions with motion ON and `?nextkey=1` (every other run keeps the timers by `props.autoNext`): phase 1 from its first question, and the last phase's last question. Each question is answered right, then: nothing moves by itself (item, phase and the key watched for 4.5 s after the key shows); the key (`data-control="next-key"`) shows only after the celebration (the question's `winMs`; 2.2 s or more for a phase's last question), inside the stage, 72 high, never disabled, saying "Next" ("Next phase" after a phase's last question; the last phase's "Summary" opens the summary page) with `getState().nextKey` the same; it BLINKS (a ring `c4-nextblink`, animated, its stroke opacity swinging by 0.5 or more over 1 s); a real mouse click (question 1), `toolApi.next()` (question 2) and the Enter key (the phase's last) each bring the next question, the next phase or the summary within a second and the key is gone; `finished` is not sent before the last key is pressed. Builder line: set `nextKey: true` and nothing else; a FAIL is a runtime matter |
| no-free-between-phases (r38+) | free play opens only from the summary page (the owner's word): in every probe run the stage goes `"free"` only right after `"summary"`, a Next phase key (`data-control="next-phase"`) is never drawn and `getState().freeBetween` is never true; the `phase-party` session passes from each phase to the next with no `"free"` stage. Builder line: nothing to write; a FAIL is a runtime regression |
| pointer-drag | every kind of drag piece on each phase, dragged by a **real** mouse and then a real finger (DevTools protocol, not the dev driver), ends its drag on release: the drop lands on the first try, with no console warning (a missing `touch-action`, for example) |
| click-then-enter | a pad key pressed with a real mouse, then one tapped with a real finger, each followed by the physical Enter: the answer is sent, the key is not pressed again; no console warning on a press (on a one-number question) |
| parts-input | on the first two-part question (quotient and remainder boxes), by a real mouse, finger and keys: digits fill the caret's box, Enter moves on, Enter on the last box answers, a mouse press and a finger tap on a box move the caret, after a miss a digit starts only its own box afresh, rub out clears then steps back, Enter on a focused box picks it and Enter again answers (no keyboard trap); a stacked fraction (`SLOT_FRACTION`) runs the same; on the first mixed number (`SLOT_MIXED`) too: Enter moves whole to numerator to denominator, a fraction missing its denominator never answers, a whole number alone answers with Enter on the empty numerator, taps, fresh digit after a miss, rub out and no trap; passes with nothing to do when no item has `parts` |
| point-input | a tool with the point key (`pointKey`), on the first single-box question, by a real mouse, finger and keys: 0 and the point key type "0.", a second point (key or keyboard ".") is refused, a finger's 5 types "0.5", rub out takes off the 5 then the point, the keyboard's "." and 7 type "0.7", Escape clears, Enter answers; on a parts question (a fraction, two boxes) the key is off and "." types nothing; fails when the key is there but no single-box question uses it; passes with nothing to do on a 12-key pad |
| classroom | (r34; a runtime before r34 gets a WARN asking for a re-pin) with `classroom: true`, on phase 1 and on the last phase, and a `page` run: the bubble is a control; the sound effects are on from the start; a phase on guide steps waits 7 s on its first step for the child's act; a long teach run pages, each tap showing one more piece; the question opens with the your-turn ring; NOTHING waits for a tap at a miss (the hint and the pinned instruction drawn within 700 ms), at a right answer (the next question comes within its celebration, `winMs` of the item, else of the tool, else 1600, + 2 s), at a phase's closing line (the next phase starts by itself; a one-piece closing never waits) or at the summary (its rows go on, `finished` exactly once, no score, no your-turn ring left; r44, with `?simple=1`: the page says one line, no row is stepped, and a tap on the bubble 1.5 s in changes nothing); a tap during a celebration brings the next question within 700 ms, in ONE tap, and a tap during a closing line the next phase within 700 ms (the teacher's skip); the cue shows only while a piece is parked (sampled every 100 ms against `getState().held`); every tap on a parked piece changes something; Enter on the bubble keeps the focus; the big arrow never touches a bubble line; paging (a scripted three-sentence line through `toolApi.say`): the first piece shows with the cue, each tap the next, the last piece has no cue and its end never waits; no console error |
| classroom-pieces (r41: the runtime reads a `nopark` line; a classroom runtime) | (the `pieces` runs: phase 1, and the last phase through its summary rows (r44: 4 s into the simple summary page, which reads no row), with `classroom: true`, answers only, a tap only on a parked piece) the bubble's instruction is sampled every 40 ms; every piece of a line that never parks (a win line: the tool's literal `api.say` lines; a closing line and `FINISH_LINE`; a summary row: `learned`), and any line of the win stage or the summary the tool builds at run time, stays on the bubble at least min(1.5 s, 0.6 x readMs(piece)) (readMs = max(2400, 68 a character)), the first piece of a closing line and of a summary row included, and a piece once shown is followed by its line's next piece. From r42 the runtime holds the next question until the win line is read (at most 6 s past `winMs`), so a long win line passes here; the row stays to prove that every piece is read. Builder line: keep a win line to one bubble page, or give the question a longer `winMs` (the next question cuts the line); a closing line or a summary row cut short is the runtime's |

## Contrast (screenshots of every phase)

| check | proves |
|---|---|
| text-contrast | every text measured against the pixels actually behind it: at least 4.5:1, or 3:1 for large text (disabled keys and outlined tile labels are exempt) |

## Also checked, at port and publish

`port` refuses unless the last check passed on this exact source, then proves the standalone `.tsx` in
the **host emulator**: the app's own loader copied step for step (the five import-stripping regexes,
Babel with the same presets, the same clean-up, the same function body with the host's 169 mock lucide icons declared, React 18 production), where the
agent plays each phase mount to the end: phases before the last walk on with no `finished`, the last sends one `finished` from its summary page. `publish` adds: the file is under 700 KB (target) / 1 MB (hard), the sidecar
names the right media id, the mount is matched exactly in the latest plan, the bucket folder comes from
the mount's own URL, and each upload is verified by md5.

## Suggested next (not automated yet; judged at review)

- **The textbook's method.** The tool teaches the method the chapter uses (e.g. Indian periods before
  international ones). Judged per tool by the maths reviewer agent (`<agentPrefix>-maths-reviewer`) (runbook step 5), with the
  chapter excerpt in the brief; not automated.
- **Real devices.** An iPad (Safari), an Android tablet (Chrome) and a smartboard: the sound effects,
  touch feel, and reading the bubble from the back bench. Headless Chrome has no speakers and no fingers.
- **Motion quality.** Shots run with reduced motion, so the carry, the column opening and the drag feel
  are judged by eye in the preview.
- **Self-test of the checks.** Inject one breakage per check (tiny text, an overlap, red after a miss, an
  echoed answer, a second `finished`) and prove each check fails on it.
- **Cross-tool consistency.** When a chapter has several tools, compare their headers, footers and sounds
  byte for byte against the runtime (they share it, so this is cheap).
- **Performance.** Frame time during the longest cascade on a low-end tablet.
