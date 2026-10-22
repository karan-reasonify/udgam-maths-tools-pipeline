# litre_jug (M2.S4.T7.C30.2D1) MATHS REVIEW round 2 (changes only; English; reviewer: udgam-maths-reviewer, 2026-10-21)
Verdict: ISSUES (0 must-fix, 1 should-fix, 1 question). Line numbers are tool.tsx at review time. Quick check 29/0/0. All 13 round-1 items CLOSED.
Played with real input (playkit, preview newer than tool.tsx): phases 1-4, both guide steps: ONE click on the named control moves on, a click elsewhere shows that step's hint (texts exact, controls visible).
Played also: ph1 Q3 (spoon L + tank mL, real Enter): miss, rung 1, rung 2 in order on misses 1-3, correction ends with mL on the spoon and L on the tank (wrong tags lit), then the right pins win;
ML2 and the two-jugs misses (frames read). Every line <= 80 chars (longest 79), learned <= 68, bubble-no-repeat clean (also run over the wins).

## Round-1 items
1 CLOSED: ML2 correction: kettle full at the dashed line, each row fills from it then tips back while the kettle climbs to the line again; ends kettle full, "8 cups", "4 mugs", chip "mugs hold more".
2 CLOSED: Q3 say (59) names no reason; correction shows "each glass: 100 mL" / "200 mL" beside the rows, 700 / 1,400 mL under the jugs (7 x 100, 7 x 200 right).
3, 4, 5, 6 (warm 300 mL is no answer), 7, 8 (Q2 tags heavy, holds, tall) CLOSED. 10, 11, 12 CLOSED. 13 CLOSED (says [] and OPENING [] are never shown).
9 CLOSED and safe (played): a tag tap on an EMPTY jug plays the fill, then the carry. A real double tap on a tag: one fill, one carry, that tag pinned once, no error. A different tag tapped during the fill is
  ignored; Enter waits; the water level shows only after the child has chosen and is the same for every tag; the units containers start full. No new path, nothing given away.
Skins carry no marks or numbers; no tint or glow before the child acts (Invite pulses only in guide steps).

## SHOULD-FIX
1. ph1 shared ladder[1] (59) "Fill it from the tap and ask which tag tells about that water." is moot after item 9: a miss on ML1 or Q2 now always comes with a FULL container (the tag tap filled it), so tapping the
   tap does nothing when done literally. Fix: "Look at the full container: which tag tells about the water in it?" (66; run through alike() against phase 1's whole run: clean; do not use "how much water it
   holds", it echoes Q2's tag).

## QUESTION (optional, no change needed)
- ph3 Q6 ladder[1] (157) "75 mL fills only the tens and the ones, so the hundreds place keeps a zero." states the idea of Q6's miss (156, a question) as a fact: an escalation (question, act, fact), passes alike(), and is no more
  explicit than ph4's "The last three digits stay behind as the millilitres." Keep it. If the main session wants it less explicit, keep TWO rungs and reword: "The millilitres take three places, and 75 uses only two of them."

## Out of scope, not blocking
- ph3 ML3 and Q5 wins share the shape "Yes, X L is X,000 mL" (neither changed this round).
## For the visual pass (not maths)
- ph2 Q3 correction: chip "jug 2 holds more" sits 3-4 px above "each glass: 200 mL" and under the row-1 counts (tight, not overlapping at 1600 x 900).
- The dry (opaque) jug's base polygon shows as a thin dark line along the jug's right edge (ph2 warm-up, Q3, free play): it is not the skin's outline.
