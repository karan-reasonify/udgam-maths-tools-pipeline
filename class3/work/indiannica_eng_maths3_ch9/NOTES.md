# indiannica_eng_maths3_ch9 notes

## Owner decisions (2026-10-28)
- Only ONE tool for now: M1.S1.T2.C5.2D1 measure_it ("Measure It"). The other five slots are not built yet.
- Measure It follows the OWNER'S DESCRIPTION, not the plan brief's phases. Slot id, 4 phases and 3 questions a phase are kept.
  1. Choose the unit (cm, m or km) for familiar objects (pencil, book, ribbon, classroom door, road).
  2. Drag a ruler / measuring tape onto an object, it must start at 0, read the length and type it (unit beside the answer).
  3. Metre rod divided into 100 cm; select half a metre (50 cm) and a quarter of a metre (25 cm).
  4. Measurement challenges with NEW objects and fewer visual hints.
  Dropped from the plan brief: handspan strips, the longer/shorter-than-a-metre bins, the Fold button.
- Feedback style: "Start measuring from zero", "Correct! A pencil can be measured in centimetres." Simple English, one object at a time,
  unit beside every measurement and answer, rulers always start at zero.
- Runtime: class 3 r1 (silent). No runtime change needed.

## Runtime-gap list
- (check / machine gap, not the runtime; M1.S1.T2.C5.2D1 builder, 2026-10-28) `phone-frame` and `phone-type` FAIL on this machine for any tool:
  headless Chrome here takes `--window-size` as the OUTER window, so 844 x 390 gives an 820 x 235 viewport (1600 x 900 gives 1576 x 745;
  proved with a blank page through lib/core/chrome.mjs dumpDom). Every phone frame is then drawn at 0.2611, not 0.4333, and all its text
  reads under the 11.5 px floor. Needs a fix in lib/core/chrome.mjs (or the Chrome flags), not in a tool. FIXED by the other session
  (13:23); full check #2 on r3 ran phone rows at the true size and passed.
- (runtime, M1.S1.T2.C5.2D1 builder, 2026-10-28) `action-anim` failed once on r3 with "getState().acting was not true while the act
  played", then passed on the re-run: useActionKit's end() clears cur.current (acting) one task before setPlay(null) commits, so a frame
  can see the act layer with acting false. Fix in the runtime (derive acting from play, or clear both in one commit); not a tool fix.
  Seen again on M1.S3.T6.C27.2D1 Pour It (2026-10-28, full check #5, no act code changed since two passing runs): the same flake.
- (runtime/skeleton, same) a traceback that locks the pad in a passive effect after the miss can lose the race to the next digit
  (`one-line-bubble` phase 4 saw the digit swallowed). Measure It no longer locks during its correction (the board ignores taps while it
  plays); the skeleton's own `[wrong]` lock has the same exposure.
- (runtime, M1.S1.T3.C11.2D1 Length Converter builder, 2026-10-28) the same `action-anim` race ("getState().acting was not true while the
  act played") failed full checks #1 and #3 and passed #2 with no act code changed: a second tool hit it, so it is the runtime's. Workaround
  in the tool: react to the act's `true` 40 ms later (setTimeout), so the runtime's render that removes the layer commits alone (#4 passed).
- (pipeline, same) `guide.answerGate` for the sidecar has no source: `port` regenerates the .json from tool.tsx and a builder may not edit
  output-preview, so the note lives in tool.tsx's header comment only. Needs a tool-object field the sidecar copies, or the main session writes it.
- (check/runtime, same) `summary-thumbs` fails a Thumb in hi/gu on a Latin unit ("cm") while TR is still empty (before the language pass);
  Length Converter's Thumb drops an untranslated unit in hi/gu as a stopgap, so the row passes before TR exists.
- (runtime, M1.S1.T2.C5.2D1 builder, 2026-10-28, play test B2) while `api.act` plays, a full-stage act layer (a plain `rect`, no
  data-control) takes every pointer on the working area, so a tap on the board during an act never reaches the tool and is lost
  silently. Measure It works round it (a window pointerup listener maps a release over the rod to a cut and queues it, up to 3). Fix in the
  runtime for a later batch: let a tool opt in to receive board taps during its act (or queue them for it). Not a blocker.
- (runtime, same, 2026-10-28) the runtime resets the answer gate when a question is entered by a jump (toolApi.gotoStep), so a tool
  that sends `api.lock` only on a change must send it again on each entry of a question (Measure It now does). Worth a line in PATTERNS 19.
- (M1.S2.T4.C16.2D1 Weigh It builder, 2026-10-28) hit the same three: (a) taps during `api.act` are lost (the work zone gets
  `pointerEvents="none"` while an act plays): worked round with a window pointerup hit test against the tool's own control boxes, one tap
  queued; (b) no sidecar writer for `guide.answerGate`: the note sits in `MODEL.answerGate` (the sidecar carries MODEL); (c) `summary-thumbs`
  before TR: the Thumb prints a word in hi/gu only once its TR line exists. Weigh It re-asserts `api.lock` on every render, so a gotoStep entry
  re-arms the gate.
- (M1.S2.T5.C22.2D1 Weight Converter builder, 2026-10-28) the same known gaps, worked round the same way, nothing new: `guide.answerGate`
  in `MODEL.answerGate`; taps during `api.act` queued by a window pointerup hit test against the tool's own control boxes; react to an
  act's `true` 40 ms late (`action-anim` race); the Thumb leaves its units out in hi/gu until TR exists; `api.lock` re-asserted on every render.

## Runtime gap (owner, 2026-10-28): the answer empties after a wrong answer
- Today (docs/LAYOUT.md section 3 "a miss is the traceback", section 4 "two-part answer"): after a miss "nothing resets and the child's answer stays in the slot".
- Owner: after a wrong answer the keypad / answer slot must be EMPTY (every typed digit and every part box; a picked choice key is unpicked), and this goes into the pipeline for every tool, not one tool.
- Plan: head-runtime edit + a check row + docs (LAYOUT, PATTERNS, CHECKS, BUILD_CARD 7); frozen ONCE at the gate before the review packs and pinned to this chapter only (non-negotiable 3). No tool codes its own clearing.
- 2026-10-28 13:26 IST: runtime r3 frozen (gate prereview) and ch 9 pinned to it (pin --version r3). r3 = r2 + "MISS CLEARS THE SLOT" (the slot empties at the miss; supersedes r2's clear-after-correction timers). Owner chose "at the miss" over the 10-27 timing.
- 2026-10-28 (visual review, builder item K): the phase 4 Answer key is live (berry, ringed) at question 1 before any touch and goes dim after the first real touch. Arming the gate at the first frame makes the runtime refuse `toolApi.answer`, which breaks approve, the host emulator and the agent (PATTERNS 19, side effect 2). Runtime gap, for a later batch: arm the gate at the question open in user mode only. Not a blocker.

## Owner decisions, round 2 (2026-10-28, after the first full review)
- RULE for the whole pipeline ("MISS HIDES THE ANSWER"): after a WRONG answer the picture and the bubble never show or point at the right answer. The picture replays the working but STOPS BEFORE the answer (no final number, no ring or highlight on the right choice, no lit final mark, no Answer tag). Unlimited tries; the hint ladder gets stronger but never prints the answer; the answer shows only when the child enters the right one. It supersedes "the correction ends on the whole right answer" (LAYOUT 3, PATTERNS 7, check miss-shows-answer, BUILD_CARD 1). Gated by `rules.missHidesAnswer: "strict"` in work/<chapter>/runtime.json (the pencilActs precedent), written by fetch for new chapters and set by hand for ch 9; earlier chapters and frozen runtimes get an INFO row, never a fail. To be carried to classes 4 and 5 with classctl after class 3 is proven.
- Measure It phase 3: Halves and Quarters no longer mark the cut. The child taps the rod at the cut point (halves: 1 tap at the middle; quarters: 3 taps at 25, 50, 75 in any order, each within 4 cm); the Hint key shows clearly where to tap (a big pulsing marker). Cut numbers stay hidden until a right answer.
- Measure It corrections in all four phases stop before the answer (see the rule above).
- Timing: in parallel; the ported pair in output-preview is the finished round-1 version and stays until a new full check passes.

## TOOLS 2 TO 6: owner brief and the lessons of Measure It (every builder, image agent and reviewer of ch 9 reads this)
Owner descriptions (2026-10-28) win over the plan brief's phase titles; keep each slot's id, its 4 phases and exactly 3 questions a phase. Slots: M1.S1.T3.C11.2D1 Length Converter, M1.S2.T4.C16.2D1 Weigh It, M1.S2.T5.C22.2D1 Weight Converter, M1.S3.T6.C27.2D1 Pour It, M1.S3.T7.C33.2D1 Capacity Converter. The finished reference for the look and the rules is Measure It (M1.S1.T2.C5.2D1): read its rules here, NEVER its tool.tsx (read fence). Runtime r3 (silent, keyOnly), strict rules on.
1. MISS CLEARS THE SLOT (r3): after a wrong answer the slot / part boxes are EMPTY at once; never write the slot during the correction; a double Enter or double tap costs one try; taps and keys are ignored while the correction plays.
2. MISS HIDES THE ANSWER (strict, check `miss-hides-answer`): after a wrong answer the picture and the bubble NEVER show or point at the right answer: no final number, no ring or highlight on the right choice, no lit final mark, no bracket with the number, no "Answer" tag. The correction REPLAYS THE WORKING and STOPS ONE STEP BEFORE THE ANSWER (the child finishes it). Tries are unlimited; hint rungs run weak to strong, the last rung the strongest, never the answer; a bubble line is never repeated inside a phase run, ACROSS QUESTIONS too (each question its own rungs 2 and 3). Tag every element that shows or points at the answer `data-reveals="answer"` (it may exist ONLY at the win); tag always-printed scales (ruler digits, a number line, headings) `data-scale`.
3. Colours: the reading the question gives sits in Given blue; the confirmed answer lands in a GREEN tag "Answer: N unit" ONLY at the win; start marks and scales are ink, never green.
4. The answer is gated by the act (PATTERNS 19): the Answer key stays dimmed until the real act is done; a real Enter on a guide step arms the gate; the tolerance is tight and the clamp is wider than the tolerance; EVERY drag or tap act has a keyboard path that can reach every position (arrow steps snap to the target, the clamp sits on the grid); a tap made during an act is QUEUED, never dropped silently; a nudge fades back to the question after 3 s and never contradicts an open Answer key; focus stays on a sensible control after an act.
5. Hints: Phase 4 has the fewest hints and its question text never names the trap; a locked question always tells the child the ACT (not the answer) on a tap of the dimmed Answer key or the Hint key; the strongest Hint can point (a ring and arrow on a SPOT or a key), never print the number.
6. Pictures: real photo skins ONLY for objects that carry the lesson (at most about 8 a slot; fewer is better); liquids, water levels, balance arms and pans, scales, ticks, digits, columns and every number are drawn in code; no decorative extras (no houses, no scenery). A photo's visible ink must meet the marks it measures within 2 px (trim transparent margins); the plain fallback is painted clear under a decoded photo; no cartoon action-kit prop beside a photo object. Reuse the library (assets/skins, free): pencil, book, ribbon, rod, eraser, key, comb, crayon, door, road, ruler, rope, bus, train, scarf, toothbrush, tape exist.
7. Layout: nothing under the Answer key's corner; chips and card titles are 32+ and never shrink (move or widen); Hindi and Gujarati marks must clear every outline (taller cards); no label may collide with another (a crowded set goes on a second row with leader lines); no empty beige picture card in a warm-up step; no hand drawing that covers a label; ONE invite only; guide steps keep the invite on the control they name.
8. Language: simple Grade 3 English; units beside every number; short unit forms in Hindi and Gujarati on labels (सेमी/મી style: ग्राम, किलो, लीटर, मिलीलीटर, and the Gujarati equivalents), one consistent term per word; every changed English line changes its TR key in the same edit; no one-word last line in hi/gu; bubble 3 lines at most, one sentence a page.
9. Inputs: a single number uses the 12-key pad; a mixed amount (m and cm, kg and g, L and mL) uses TWO answer boxes (`parts`, PATTERNS section 2); calculations use separate columns; regrouping (100 cm to 1 m, 1,000 g to 1 kg, 1,000 mL to 1 L) is an animated act through `api.act`. Numbers from 1,000 up print with Indian commas.
10. Process: quick check (`check --no-render`) is the loop; ONE full check per round; the reviewers are staged (maths first, then Gemini visual pass 4b, then language pass, then visual review and play test once). Never read another chapter's tools; never read generated files (*.preview.html, .build, images.tsx, voice.tsx).

## Owner decision (2026-10-28 ~16:50): run order for tools 2 to 6
3 builders at once; Opus cap 3 for THIS BATCH ONLY (token-policy.json itself is unchanged). Wave 1: Length Converter (M1.S1.T3.C11.2D1), Weigh It (M1.S2.T4.C16.2D1), Pour It (M1.S3.T6.C27.2D1; its builder starts when Measure It's builder ends). Wave 2: Weight Converter (M1.S2.T5.C22.2D1) and Capacity Converter (M1.S3.T7.C33.2D1), built on the Length Converter's settled column-and-regroup pattern (the builders of wave 2 may be told its rules, never read its tool.tsx). Images only for objects important inside the tool.

## Pictures made so far for tools 2 to 6 (free to reuse by copying the definition EXACTLY into the slot's images.json; never read images.tsx)
- Length Converter (C11): rod, road, ruler, ribbon (all free library hits from Measure It).
- Weigh It (C16): pencil (free), mango, backpack, sack, watermelon, brick (small, heavy), pillow (big, light).
- Pour It (C27): bottle (84x260), bucket (200x182), drum (154x200, class 4 library), packet (84x170), cup (124x150): `cup` = object "yellow plastic drinking cup", kind tile, aspect 1:1, px [140,150], maxKB 12, view "side", colours "natural" (Capacity Converter C33 reuses it FREE for its small cup). The see-through jug and glass, water levels, marks and every number are drawn in code.
- Measure It (C5): pencil, book, ribbon, rod, eraser, key, comb, crayon, door, road, ruler.

## Owner decision (2026-10-28 ~18:40), THIS SESSION ONLY (token-policy.json / orchestration.json NOT changed for it)
"for this session you can use 2-3 more Opus agents and 2-3 more Sonnet agents": up to 6 or 7 Opus agents and 4 or 5 reviewer-type Sonnet agents at once. Chrome-driving agents (builders running checks, play testers) stay at about 6 at once (more gave false timeouts on this machine); maths reviewers, visual reviewers on saved packs, language drafters and image agents do not drive Chrome and may go wider.

## Pour It (C27) pictures, final (2026-10-28 ~19:30): cup, bottle, bucket, drum, packet, jug (clear glass), glass (clear tumbler), pot
- `jug` (cut "glass"): 200x247 (0.81); interior transparent; interior profile (x left-right by y): 0.02: 0.205-0.605; 0.15: 0.175-0.605; 0.22: 0.195-0.595; 0.29: 0.195-0.61; 0.36: 0.17-0.63; 0.43: 0.14-0.655; 0.50: 0.115-0.68; 0.57: 0.10-0.685; 0.64: 0.10-0.695; 0.70: 0.11-0.69; 0.77: 0.19-0.67; floor inside y 0.842; scale y = 0.842 - 0.682 x mL/1000 (0 mL at floor, 1 L at y 0.16). Water behind the skin, marks outside on the left.
- `glass` (cut "glass"): 92x150 (0.61); interior transparent, tapered: profile (y: x range) 0.09: 0.10-0.89; 0.42: 0.15-0.84; 0.62: 0.20-0.80; 0.82: 0.26-0.73; largest clear rect x 0.24-0.76, y 0.02-0.80; floor inside y 0.83 (opaque base below). Clip the code water to the profile.
- `pot`: normal cut, opaque orange enamel pot with lid and two handles, 200x140 (1.43).
- Capacity Converter (C33) copies `jug` (and cup, bottle, bucket, drum) FREE; `glass` and `pot` too if its design needs them (copy the definition EXACTLY from C27's images.json, including the cut option).
