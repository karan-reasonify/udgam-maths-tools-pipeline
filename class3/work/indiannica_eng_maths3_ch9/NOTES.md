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
- (runtime/skeleton, same) a traceback that locks the pad in a passive effect after the miss can lose the race to the next digit
  (`one-line-bubble` phase 4 saw the digit swallowed). Measure It no longer locks during its correction (the board ignores taps while it
  plays); the skeleton's own `[wrong]` lock has the same exposure.

## Runtime gap (owner, 2026-10-28): the answer empties after a wrong answer
- Today (docs/LAYOUT.md section 3 "a miss is the traceback", section 4 "two-part answer"): after a miss "nothing resets and the child's answer stays in the slot".
- Owner: after a wrong answer the keypad / answer slot must be EMPTY (every typed digit and every part box; a picked choice key is unpicked), and this goes into the pipeline for every tool, not one tool.
- Plan: head-runtime edit + a check row + docs (LAYOUT, PATTERNS, CHECKS, BUILD_CARD 7); frozen ONCE at the gate before the review packs and pinned to this chapter only (non-negotiable 3). No tool codes its own clearing.
- 2026-10-28 13:26 IST: runtime r3 frozen (gate prereview) and ch 9 pinned to it (pin --version r3). r3 = r2 + "MISS CLEARS THE SLOT" (the slot empties at the miss; supersedes r2's clear-after-correction timers). Owner chose "at the miss" over the 10-27 timing.
- 2026-10-28 (visual review, builder item K): the phase 4 Answer key is live (berry, ringed) at question 1 before any touch and goes dim after the first real touch. Arming the gate at the first frame makes the runtime refuse `toolApi.answer`, which breaks approve, the host emulator and the agent (PATTERNS 19, side effect 2). Runtime gap, for a later batch: arm the gate at the question open in user mode only. Not a blocker.
