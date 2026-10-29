STATUS: ok (every must-fix and should-fix that concerns tool.tsx done, except 2 marked not done below; full check 94 pass / 0 warn / 0 fail, ported; pack not rebuilt)
SLOTS: M1.S2.T5.C22.2D1 Write the Date (class 3 ch 10): review round 1 fixes
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S2.T5.C22.2D1/tool.tsx · pair in class3/output-preview/indiannica_eng_maths3_ch10/M1.S2.T5.C22.2D1/
CHECKS: quick 30/0/0; full checks: #1 94/0/0; #2 action-anim timing flake after a gu TR-only edit ("acting was not true while the act played"); #3 the same source re-run, 94/0/0, ported. Sheets looked at: gu wrong; shots of the p3 win, the p2 miss and the summary.
DECISIONS:
- 1 must-fix (done): the phase 3 win line "14 October 2019 = 14-10-2019" is measured and centred under the box row, inside the area (seen in a shot).
- 2 (done): the pad's own Enter and digit keys now show the month nudge after a phase 2 miss, by finger and by mouse. A hint on show is cleared first with the runtime's card tap.
- 3 (done): after a miss, the same placing at Enter says "Change a tile first." Tile and box taps take one act per 300 ms, so a 45 ms double tap places the tile once.
- 4 (done):
  - Rung 1 is box-neutral: Q2 "Check the day, the month and the year against the card."; Q3 "Count the digits you wrote in each of the three boxes."; Q3 rung 2 "Read the card again, then check the month's number on the ladder."
  - A full Day (or Month) box moves the caret on; a digit a full box cannot take says "This box is full."
  - A month tile's own Enter no longer nudges.
  - In a question, the toggle says "The toggle works after you answer."; an empty Enter before any miss says "Type the date first."
  - The last question's win line being replaced by the closing is the runtime's (not touched).
- 5 (done): phase 2 rung 2 is now "Read the card again: which month does it say?".
- 6 (done): an emptied right box keeps the tick and shows "OK" (सही / સાચું), never its value; no tick while the caret is in the box.
- 7 English visual (done):
  - Layout: P1 is centred in the full width; boxes 88 tall with the labels at 40 and clear of them; the ring sits off the labels; the toggle is moved clear of its caption.
  - Boxes: month word padding; bold 26-unit dashes in 44-unit gaps; darker ghosts at 30-32.
  - Notes: each pill sits under the box it is about and is as wide as its words.
  - Warm-up tags are as wide as their own tile.
  - Summary: phases 1-2 show the date in words, phase 3 DD | MM | YYYY.
  - Retitles: "Library Notice" ("New books came on / the 17th of June, 2012") and "Result Day", each with its bubble line and TR.
- 8 hi/gu (done):
  - No hi line ends in digit + danda; colons and orphans fixed (gu P2 rung 1 is now "નામ જુઓ: પહેલું ખાનું કયું?"); start question shortened; "मुक्त खेल" used throughout; "October is the tenth month" now says "of the year".
  - "ऐसी तारीख नहीं होती"; the month ghost reads महीने का नाम / મહિનાનું નામ (no duplicate label).
  - Ladder names at 32 (30 for the longest).
  - No date splits across bubble lines (read line by line at every ask and win, hi and gu). "!" removed mid-line: the runtime paged "હા!" alone.
  - The phase 3 step uses અંકોમાં.
- My decisions applied: the free-play year is kept to 1901-2099; the toggle now says why it waits.
- The correction is about 0.65 s quicker (the hint and notes still appear in turn).
- Not done, with reason:
  - P1's Enter is not dimmed before the first tile: it says "Drag a tile into a box first." instead (lesson 5: a nudge, never just a dimmed key).
  - Keyboard focus after acts is the runtime's.
  - The terminology questions are left for the native speaker.
- Real input (mouse and finger): every item above was probed and works. Phase 1: same-wrong nudge, then the question back after a tile moves; double tap; drags. Phase 2: key-enter tap and key-3 click nudge, then the question back after the month tap. Phase 3: Enter on empty; toggle; 1410 auto-advance; 20199 shows "This box is full."; win; tile Enter shows no nudge. Free play: 1900 becomes 1901.
FAILURES: none
RISKS: the nudges after a miss also open the keypad (the runtime's card tap is the only call that clears a hint); digits stay ignored until the month is tapped.
ESCALATE: no
