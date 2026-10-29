# Weight Converter (M1.S2.T5.C22.2D1) play test A (phases 1 and 2), runtime r3, silent, MISS HIDES THE ANSWER strict

Verdict: ISSUES (1 must-fix, 3 should-fix, 1 low, 2 runtime-level notes). 97/0/0 check rows were not repeated; I played the child's real flow
(start page skipped by probe), real mouse, finger and keys, en/hi/gu, classroom, Next key, AI mode, with motion ON for acts and parties.

BUILD NOTE (for the main session): tool.tsx and its preview were rebuilt WHILE I played (13:07, 13:09-13:10, 13:16:12; hint wording "Tap the Open
key at the bottom" became "Tap the Open key below", Q2 became "How many grams in all is 4 kg 700 g of rice?", win lines changed). The builder was
not idle. Every finding below was re-run on the 13:16:13 build; screenshots are play-A-*.png in the slot folder.

## must-fix
- [must-fix] P2 q3 (5,007 g) win, en/hi/gu: the green Answer tag "Answer 5 kg 7 g" runs UNDER the Answer key (the dimmed key at the phase's last
  question; the Next key at q1/q2 clears it). Measured `[data-reveals]` box vs `[data-control="answer-open"]`: tag right edge 1283 px (en) and
  1307 px (hi, gu) against key left 1262: 21 px (en) and 45 px (hi, gu) hidden; in hi the last word "ग्राम" of "5 किग्रा 7 ग्राम" is covered. P1 wins
  and P2 q1/q2 clear the key by 16 to 125 px. Repro: play({phase:2, nextKey:true, lang:"hi"}); warm-up by real taps (Gather, Left); goto q3; click
  gather; type "5|7" Enter; measure. Frames: play-A-p2q3-win.png, play-A-p2q3-win-hi.png. Likely cause: the tag width in draw2 is clamped by `Wd`
  (the work width), not by the key's left edge: `wcAnsTag("ans", G2.right.x, G2.right.y, "l", Math.min(460, Wd - G2.right.x - 16), ...)`; five bags push
  G2.right.x to 937 px. Clamp to the key corner (work x 1198) or put the tag on a second row under the bags.

## should-fix
- [should-fix] P1 step 1 and P2 step 1: a tap on the NEXT step's target while the current act plays is dropped with no feedback, though the step then
  advances (owner rule 4: queued, never dropped). P1: click Open, 400 ms later tap tray 0 (screen 650,348): tray never counts, step 1 waits for a
  second tap. P2: click Gather, tap the heap (585,368) mid-act: same. Cause: the window pointerup hit test uses `ctlRef` (controls registered at
  tap time); the tray/heap controls register only after the step moves. Keep the point and hit-test at run time. Repro p19 (overlay div + t.click).
- [should-fix] Keyboard at a gated question gives no nudge: P1 q1 / P2 q1 with nothing touched, real Enter, Space and Backspace leave the bubble
  unchanged (the nudge fires only for the dimmed Answer key, the Hint key and digits). A keyboard child who presses Enter gets silence; the same
  act nudge ("First tap Open ...") should show. Also the Hint key tapped 400 ms into the Open act, or during a miss replay, shows nothing then and
  nothing later (swallowed, not queued); after the act it works.
- [should-fix] The win line is up only 2.3 to 2.8 s before the next question opens (classroom and the default walk, no Next key): en "Yes, 2 kg is
  2,000 g: each kilogram is 1,000 g." 2.8 s; hi P2 q1 "हाँ, यह 4 किग्रा 0 ग्राम है, कुछ नहीं बचा।" 2.7 s; gu P2 q1 2.3 s. No item sets `winMs`, so the
  runtime's 68 ms a character applies. Too short for a 7 to 9 year old to read the line and see the green Answer tag; set `winMs` about 4000 to 4500 on
  the items. Repro p23 (classroom, P1/P2 q1), p26. (The closing line holds 9.7 s: fine.)
- [low] At every question entry the Answer key is enabled (aria-disabled null, keypadOpen true) for about 80 ms before the tool's gate re-asserts
  `api.lock(true)` (sampled every 40 ms across the win to next-question step: 2812 ms live, 2892 ms dim). A brief berry flash; the gate itself holds.

## runtime-level (not fixable in the tool; for the gap list)
- Escape and the Hint key do not end the party at once (party still true 300 ms after; ends by itself about 1.8 s); a phase dot and the restart key
  do end it at once and the mascot cheer pose clears (p27, P1 and P2 q3). The cheer clears by itself within 0.9 s of a right answer.
- Focus drops to BODY after a mouse act and after the last guide step (known pointerBlur gap); after Enter or Space on Open/Gather focus lands on the Answer key.

## CLEAN (played, nothing found)
- Gate by the act, en/hi/gu, real mouse and finger: before the act a tap on the dimmed Answer key, the Hint key (gated) and a keyboard digit each
  show a nudge naming the act (3 forms rotating, back to the question after 3 s, no try spent); typed digits ignored; Open/Gather opens the gate; the
  Answer key tapped mid-act opens the pad when the act ends; restart and the next question re-arm it; a typed digit with the pad shut opens the pad.
- MISS HIDES THE ANSWER on all six questions, four near-misses each: `[data-reveals]` 0, no answer form in work/bubble/slot/drawer HTML or in
  `getState()` JSON, aria-labels digits only; P2 replays stop one bag short (3, 2, 4 sack photos for K=4, 3, 5), no Left ring or chip, no count;
  P1 trays light one by one with no total; the slot and BOTH two-box fields are empty after every miss; the keypad is dead during the replay (pad
  clicks, keyboard digits, Enter, Backspace); a double Enter or double tap costs one try; the hint ladder never weakens when the Hint key and misses
  are interleaved and never prints an answer.
- No plain shape behind a decoded photo (tote, sack) in any frame; no thing drawn twice after a miss; the tote chip clears the tote and ring in the
  latest build (play-A-p1q2-miss-padopen-hi.png).
- Wrong clicks: an eight-point sweep at each guide step (P1 3 steps, P2 2) plus a grid over the board at P1/P2 step 1: every spot inside the work
  zone shows the step hint with the step unchanged; the awaited control then still works; only the 16 px card margin outside the zone is silent.
- Double tap (mouse and finger) on Open, tray, Total, Next key and a double Enter 50 ms apart do ONE thing; five back-to-back Enters (playkit cannot
  send auto-repeat) do one step. Restart, a phase dot and Escape mid-act leave no stale opened trays and no stuck act.
- Next key: nothing moves by itself, one step per tap/Enter, label fits ("Next", "आगे", "આગળ", "अगला चरण" at a phase end), the gate re-arms at the next question.
- Keyboard-only P1 and P2 from the start page flow (Enter drives the guide steps, Tab, Space/Enter on Open/Gather, digits, Enter between boxes); finger-only P1.
- Hindi and Gujarati: every warm-up line, wrong-act hint, question, nudge, hint rung and win/closing line read in both: no one-word last line, no split
  amount; "Fill both boxes." appears (en/hi/gu) for an Enter with a box empty, caret and Backspace behave. Classroom: a bubble tap during a guide step
  does nothing; AI mode: `answer` fills, `check` submits/does the act, `next` advances. No console errors in any run.

Not covered: a forced image-decode failure (the sack fallback; `skins-fallback` passed), a real auto-repeat Enter, phases 3 and 4 (tester B).
