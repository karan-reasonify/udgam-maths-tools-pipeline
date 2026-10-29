# Class 3 chapter 10 "Time" (indiannica_eng_maths3_ch10, plan v2): notes

Runtime: pinned r3 (silent: the bubble is the guide, a `TR` table carries Hindi and Gujarati). Mode: FULL (all reviews), not sprint.
Each slot folder has `owner.md`: the owner's own description of that tool (2026-10-28). Read YOUR slot's `owner.md` together with
`brief.md`. The plan brief is the host contract (4 phases, 3 questions a phase, the state fields); `owner.md` says what the owner
wants the child to do and see. Where they differ in wording, build both: keep the brief's phase structure and add what `owner.md` asks.

## Owner decisions (2026-10-28)

1. **No pilot.** Read the Clock, Morning or Night and Time Converter are built first (3 builders); Write the Date and Calendar
   Explorer follow as slots free. The three clock tools should still look like one family (same clock face, same hand colours:
   hour hand vermilion, minute hand deep blue; a.m. sky blue, p.m. amber; reached/answer green).
2. **Phase count (the owner, 2026-10-28): the owner's description decides, the LP's 4th phase is NOT taken.** A tool has 4 phases only
   when BOTH the owner's description and the LP json have 4; otherwise it has as many as the owner's description says.
   - **3 phases:** Read the Clock, Morning or Night, Time Converter, Write the Date. Phases 1 and 2 are the plan's phases 1 and 2; phase 3
     is the owner's Stage 3 = the plan's phases 3 AND 4 folded into one (its three questions must cover both ideas; carry the plan-4
     misconception traces and delight that fit). Concept ids: the tool's 3 phases carry the plan's FIRST THREE concept ids (phase 3 =
     the plan's phase 3 concept id). Plan questions of the dropped phase are simply authored fresh (a question id only for a question
     of its own phase). Exactly three questions a phase, so 9 questions in all. Build the tool with 3 PHASES: delete the scaffold's 4th.
   - **4 phases:** Calendar Explorer (4 stages in the description and 4 in the LP).
   - The folded phase 3 carries the UNION of the plan's phase 3 and phase 4 `objectiveIds` (the dropped phase's objectives stay tracked
     on the LP); its concept id is the plan's phase-3 concept id.
   - **For the upload auditor (and anyone reading the dry run):** the live LP v2 still lists 4 phases for the four 3-phase slots. That is an
     OWNER-SET departure (2026-10-28), not a defect: the shipped sidecar lists the tool's own 3 phases. Report it as one info line.
   - `work/<chapter>/phases.json` records this and makes the `plan-concepts` check accept the owner-set count (check.mjs, 2026-10-28).
     If a different row fails or warns because of the 3-phase count, do not edit lib/ or the runtime: write it under "Runtime gaps".
3. **A hand (or bar) dragged to set an answer is judged on the berry Enter key, never on release.** The digital clock / end time
   follows the drag; the Enter key blinks once a time is set (`api.answerReady(true)`, `pad: "enter"`, PATTERNS §9f). Passing through
   a wrong time while dragging is never a miss.
4. **Runtime gaps: one batched freeze is allowed for this chapter** (BUILD_CARD §7 logged, chapter 10 only, before the review packs).
   Do NOT edit the head runtime and do NOT freeze yourself. If the runtime cannot take an answer you need (three typed boxes
   DD-MM-YYYY with the leading zero kept; a typed time plus a tapped a.m./p.m. label; a typed day and year plus a tapped month),
   work round it as best you can, then write the gap under "Runtime gaps" below (what, which slot, what you did instead).
5. **Pictures are real objects** (docs/IMAGES.md; the image agent runs beside each builder). Wall clock, calendar page, day strip,
   tiles and hands stay drawn in code (they are the maths); everyday things get skins.
6. **New practice times and dates.** Never only the printed examples or the concept videos' times. Every time or date a child is
   asked about is new (use a spread: o'clock, half past, quarter past/to, five-minute steps; dates from birthdays, school notices,
   invitations). A calendar is ALWAYS computed for its real year (leap years by the every-fourth-year rule, weekday positions correct).
7. **Reset and free exploration.** Reset is the header's refresh control; free exploration is the runtime's free play after the
   summary: make the free-play state of each tool let the child set their own times/dates/months with the same live readout.
8. **Noon and midnight take neither a.m. nor p.m.** in this chapter's tools (the textbook's rule).
9. **Gemini visual pass kept** (step 4b, after the maths review and the pictures) if `GEMINI_API_KEY` is present; otherwise skipped and said so.

10. **LP phases:** the owner will update the LP to 3 phases for the four 3-phase mounts later; remind the owner before upload (step 10).
11. **Agent budget:** re-run `orch plan` once the builders have cut to 3 phases; if the gate still says STOP, pass `--over "owner 2026-10-28: all reviews kept"`
    rather than dropping a review. Builder models: Read the Clock Opus (shared clock); Morning or Night and Time Converter Sonnet; the second
    Opus slot is held for Calendar Explorer (highest risk).

12. **More agents allowed (the owner, 2026-10-28):** 2-3 more Opus and 2-3 more Sonnet agents than the standing caps, for this chapter's session
    (gate `--over "owner 2026-10-28: ..."`). Use them to run looks in parallel (one maths reviewer per tool, visual reviewers per language),
    never to drop a review.

13. **Calendar Explorer (C28): the two fists are a REAL PHOTO of a closed fist, not SVG (the owner, 2026-10-28).** This overrides IMAGES.md's "hands are
    drawn, never generated" for this slot only. One photo of a closed fist, back of the hand to the viewer, four knuckles in a row and the dips between
    them clearly visible, on plain white (mirror it for the second hand); the knuckle and dip MARKS (31 / 30) are drawn in code over the photo at the
    coordinates the image agent records in images.json. The plain code-drawn fists stay UNDER the `<Skin>` as the fallback.

14. **Calendar Explorer, phase 2 (the owner, 2026-10-28, from a screenshot):** the card of a month a question ASKS ABOUT shows its name only (no "31", no "28 or 29") in the tray, after a drop and after a miss; the day count appears only at the win. The guide-step cards (Jan, Feb, Mar) keep their numbers. The same rule for every phase and every tool: nothing a question asks is printed beforehand.

## General requirements for ALL five time tools (the owner, 2026-10-28; every builder, reviewer and agent reads these)

- Grade 3: simple English, clear instructions, familiar everyday situations; short lines (one sentence a bubble page), no lengthy text.
- One consistent, clean picture style across the five tools. Clocks, calendars, birthday cards, school scenes, the sun and the moon are
  recognisable at a glance. No unnecessary decoration, no crowded screen: if a thing does not serve the learning objective, leave it out.
- Every control works as described: when a hand is moved, a date changed, a calendar page flipped or a timeline bar moved, the relevant
  display AND the answer update correctly (digital clock, a.m./p.m. section, end time, weekday, month length, tile counts).
- Immediate feedback after every answer. A wrong answer gets a USEFUL hint that shows what went wrong (on the clock, strip, tiles or
  calendar), never only a red cross; repeated attempts allowed (the runtime's three-try ladder).
- Everything is mathematically exact: clock positions (the hour hand at the right place for the minutes), times, dates, month lengths,
  leap years, weekdays, unit conversions (x 60, x 24), durations and calculations. The maths reviewer checks each by computation.
- New practice examples, not the exact examples of the concept videos.
- A free-exploration mode wherever it fits (set your own time / date / month, no question to answer) and a reset (the header's refresh);
  controls large and easy for young learners.
- Stay on each tool's own concepts in the Grade 3 Time chapter: no unrelated topics, no interface more complicated than the objective needs.

## Runtime gaps (logged, not frozen)

- M1.S1.T3.C11.2D1 Morning or Night, phase 3 question 3: a typed time (two boxes) plus a TAPPED a.m./p.m./noon/midnight label cannot be one slot answer (`judge` sees only the typed parts); worked round with the label keys on the working area and a module-level `MN_LABEL` that `judge` reads (and `agentKey` carries as a third token); a runtime answer of "typed boxes + a picked choice" would remove it.
- M1.S2.T4.C17.2D1 Time Converter (every time tool): the runtime's `pieces()` cuts a bubble sentence at every ". " (period then space), so "9:30 a.m. and ..." or "1:15 p.m. to ..." in a question reads as TWO bubble pages (`one-page` FAILs); worked round by putting a comma or colon right after each a.m./p.m. ("from 9:30 a.m., to 1:15 p.m.: how long?"); a runtime that keeps "a.m." and "p.m." whole in `pieces()` would let the lines read naturally.
- M1.S2.T4.C17.2D1 Time Converter, phase 3 question 2: an END TIME cannot be typed on r3's pad (no colon key, no a.m./p.m. keys); it is set by sliding the bar's end and judged on the berry Enter key as minutes after midnight (`pad: "enter"`, `answerReady`), as the owner's decision 2 asks.
- M1.S2.T5.C22.2D1 Write the Date (DD-MM-YYYY, all phases): the three boxes and the tapped month fit r3 (three card parts with `at`; a ladder tap writes the month's two digits into the middle part with `api.setTyped`, and the box draws its name), so no answer gap; the gap is the hint: a miss's bubble line is the item's fixed rung and cannot say what THIS answer got wrong ("April has 30 days", "there is no month 14": an `api.say` at the miss breaks `hint-pinned`), so the tool prints it as a 4-word note under the boxes; a runtime hint the tool could set per miss would let the bubble say it.
- M1.S1.T2.C6.2D1 Read the Clock (any board tool; play testers 1.3/1.4): an intermittent console error `<rect> attribute width: A negative value is not valid` (-7 to -3428) from the answer drawer's width ease (the work-floor rect; the ease overshoots 900/1472 and can diverge when the drawer toggles during a miss or under CPU load); it can fail a full check's console rows once in a while. Also the runtime's: Escape does not end a phase party (a dot, restart and a classroom tap do). Nothing in tool.tsx draws a width from box.w; worked round by re-running the check.
- M1.S1.T3.C11.2D1 Morning or Night (play testers 1.1/1.2): the negative `<rect>` width console error reproduces on a real run (about 1 in 3 with ten fast double clicks on the Answer key), from the runtime's own work-floor rect (`data-zone=work` first child), not from tool.tsx; it fails a console row once in a while; worked round by re-running the check (the Answer key's double tap is also unreliable: a touch double tap leaves the drawer closed).
- M1.S1.T3.C11.2D1 Morning or Night (play tester 1.1): at a phase's last win the party is not ended by Escape, the Hint key or a tap on the bubble (it ends alone within about 3 s; a phase dot, restart and a classroom tap end it at once); runtime behaviour, nothing to write in tool.tsx.
- M1.S1.T3.C11.2D1 Morning or Night (play tester 1.1): a double tap on the Next key opens phase 2 with the wrong-act hint of its first step instead of the instruction (the second tap lands on the board); one Next = one step is right, the runtime's guard window is shorter than the double tap.

## Slots

| slot | tool | phases | what the phases are | risk |
|---|---|---|---|---|
| M1.S1.T2.C6.2D1 | Read the Clock | 3 | hands; minutes in fives; past/to + half/quarter past/quarter to | drag hands, creeping hour hand, shared clock |
| M1.S1.T3.C11.2D1 | Morning or Night | 3 | 24 h two rounds; noon/midnight; a.m./p.m. cards + time card | sun slider, typed time + label |
| M1.S2.T4.C17.2D1 | Time Converter | 3 | hours to minutes; days to hours; duration and end time (across noon) | wheel, bar drag, column board |
| M1.S2.T5.C22.2D1 | Write the Date | 3 | parts of a date; month in words; DD-MM-YYYY (words to numbers and back) | 3 boxes, month ladder, toggle |
| M1.S2.T6.C28.2D1 | Calendar Explorer | 4 | days/weeks/months; knuckles; leap years; finding dates | computed calendars, fists, hop |

## After the build

(owner wishes that arrive after a builder has started go here)

## STATE AT STOP (2026-10-28 ~18:30 IST; the owner said "save and stop")

ALL agents were stopped (TaskStop); nothing is published or uploaded; all five tools have a ported pair (check passes). Resume: `node orch.mjs resume --class 3 --ch 10`, then this section, then `node cli.mjs status --ch 10`. Agents resume by SendMessage to their id (the work is in their saved transcripts) or start a fresh one; Opus 5 running at once, Sonnet unlimited; mark finished agents `node orch.mjs done`. Reports of every agent: `orch/reports/<agent id>.md`.

- **C6 Read the Clock** (builder a83d3a160c636336a): built, maths clean after 2 rounds, design + language done, 95/0/0. Visual round DONE (visual-reviewer-1.4 en, 1.5 hi, 1.6 gu: 0 must-fix; shared should-fix: minute-hand tip over a numeral, hour hand hidden at 12:00, disabled Step/Round key labels invisible, small labels, Gujarati wording). Play testers 1.3 and 1.4 were STOPPED before reporting: re-launch both (phases 1-2 + start/free; phase 3 + keyboard/classroom/hi/gu), real mouse drags first. THEN one consolidated fix message, `shots --pack --changed`, changed-frame re-look.
- **C11 Morning or Night** (builder a32c0230a0eb81a2c): built, maths clean, design + language done. Full round DONE (visual 1.1/1.2/1.3, play 1.1/1.2: REAL DRAGS DO NOT WORK (useDrag misuse), guide-step credit bug, invisible placed card, strip not 24 h at the win, 12:00 p.m. card). The consolidated fix message was sent and the builder was STOPPED mid-fix: run `node cli.mjs check M1.S1.T3.C11.2D1 --ch 10 --no-render` first, then resume it to finish the list (real-input probes of every drag), then `shots --pack --changed`, changed-frame re-look, play re-test of the drags.
- **C17 Time Converter** (builder af942408b72f6a374): built, maths clean (re-look done), design + language done, 96/0/0. Visual round DONE (visual-reviewer-1.7/1.8/1.9: shared must-fix: hour hand invisible at 12:00 and the clock back at 12:00 beside filled tiles at the p1 win; about 13/10/8 should-fix; native-speaker questions). Play testers 1.5 and 1.6 STOPPED: re-launch; THEN one consolidated fix message (include the family clock fixes: minute-hand tip, hour hand at 12:00).
- **C22 Write the Date** (builder a1bb6fa51f4efbb64): built 93/0/0. Maths review (maths-reviewer-1.8) was STOPPED before reporting: re-launch it; then fixes, the design pass and the language pass (TR is EMPTY), pack, visual, play. Unused plan questions C22:5 (31 November is not a real date) and C24:3: the owner may judge.
- **C28 Calendar Explorer** (builder a30f5a5fa2ce0b9dc): built 98/0/0 (`source changed since`). Maths review done (maths-reviewer-1.7: 1 must-fix, 6 should-fix); the fix message (+ design pass + language pass + owner decision 14) was sent and the builder STOPPED during its final full check: quick-check first, resume it to confirm every fix, decision 14 on every phase, then the design and language passes; THEN a changes-only maths re-look, pack, visual, play.
- After all five: chapter-wide `check` (step 6), upload audit (the 4-vs-3 phases are owner-set), `clean --ch 10`, the report, and the owner's open questions below. NEVER upload without the owner's word; the LP must be changed to 3 phases for four mounts first.
- A viewer process (`cli.mjs view --port 5187`) was left running.

## To raise with the owner in the final report (main session's list, 2026-10-28)

1. **Dashed tick on a wrong a.m./p.m. label (Morning or Night):** the owner's description asks to highlight the time's position on the strip; MISS HIDES THE ANSWER forbids pointing at the answer. Built to the rule (carry to the noon mark, the time's own place at the win). Ask whether to log an owner exception for the tick on the first miss.
2. **"?" covers (Read the Clock):** the digital clock shows "?" on read/count questions and the words card on every question (giveaway rule over "always in sync"); in the steps, set questions and free play they are live.
3. **Scene props are decoration (Read the Clock):** backpack (hall), bus (bus stop), pot (kitchen): kept; the owner may drop any (one `<Skin>` each).
4. **Train skin made but undrawn (Time Converter)**, since the tool has no ticket card; cartoon sun/moon/school beside photo cards (Morning or Night): style mix left to the visual review.
5. **Sidecar `guide.answerGate` note** (PATTERNS §19) has no writer in `port`; not hand-added (it would make the pair hand-edited). Decide at the end.
6. **Shared check edited:** `class3/lib/check/check.mjs` `plan-concepts` reads `work/<chapter>/phases.json`; BUILD_CARD §7 row; the LP must be updated to 3 phases for four mounts BEFORE upload.
7. **Runtime gaps, all worked round:** typed boxes + a tapped label as ONE answer; the runtime splits a sentence at "a.m. "/"p.m. " (one-page); no colon/a.m. keys, so an end time is set on a bar. Freeze decision at the gate before the packs (probably none).
8. **Family colours** align to Read the Clock's: hour #E5531A, minute #1F4E9C, reached #2E9E5B (a.m. #5BB8E8, p.m. #F2A531): done in Morning or Night's fix pass; still to do in Time Converter.
9. **Language pass notes (Read the Clock):** run-time words card (rcWords) needs hi/gu templates; the 9 item win lines (api.say(it.win)) are not listed by tr-coverage and must be added to TR by hand.
15. **THE NEGATIVE `<rect>` WIDTH IS NOT A ONE-OFF (play tester, Morning or Night, 2026-10-28):** it REPRODUCES with a real miss and the tester says the source is the RUNTIME (a `<rect>` with a negative width). Three tools saw it as a check FAIL under load. Decision pending for the owner (a runtime fix would need ONE batched freeze + re-pin + re-check of all five tools: not done during the review round); until then a builder re-runs once on this symptom.
11. **A one-off console error under load:** two builders (Read the Clock, Morning or Night) each saw ONE full check fail on a `<rect>` with a NEGATIVE width (-7/-530, -598) during `miss-hides-answer` / `miss-clears-slot` while the machine was heavily loaded (render 390-443 s); not reproduced by real-input probes of every question kind, clean on re-run. Two tools, same symptom: the play testers probe it (a miss with the keypad open, motion on) before it is written off as load.
12. **Calendar Explorer:** the owner asks to "show the correct number of days after a miss"; built to MISS HIDES THE ANSWER (the correction stops one step short; the count shows at the win). Weekday answers are seven Sun..Sat keys (the owner may prefer tapping the weekday heading on the page). bigPad is false (the page plus fists or strip needs the width). The fist orientation (left fist little finger = Jan ... index = Jul; right fist index = Aug ... ring = Dec) is the standard knuckle layout; confirm against the textbook.
10. Time Converter phase 3 snaps to 15 minutes (every time a quarter hour): the maths reviewer is judging the variety.
