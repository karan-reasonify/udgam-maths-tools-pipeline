# litre_jug (M2.S4.T7.C30.2D1) MATHS REVIEW round 1 (English only; reviewer: udgam-maths-reviewer, 2026-10-21)
Verdict: ISSUES (0 must-fix, 13 should-fix, 4 questions). Line numbers are tool.tsx at review time (they move as you edit).
Maths right (recomputed): 2 L / 25 cm / 400 g; "how much it holds"; spoon mL, tank L; 4 mugs = 8 cups = 2,000 mL (500 / 250 mL); jug 2 (7 x 100 vs 7 x 200); 6 x 150 = 900;
9 L 340 mL = 9,340; 14 L = 14,000; 2 L 75 mL = 2,075; 6,090 = 6 L 90 mL; 12,400 = 12 L 400 mL; 7,400 = 7 L 400 mL. Every near miss is rejected (400 g, L|mL, c-kettle, j-same, 6, 1,240,
1,400, 275, [6,900], [124,0], [74,0]); judgeSlotParts compares numbers ("090" = 90; "6,090" in one box fails). Three questions a phase, all 12 plan qids used with the plan answers; every line
<= 80 characters (closings 72/76/77/77), "learned" <= 68, one sentence each, no "a/b", commas from 1,000. Warm-ups (mug 9 cm 250 g 300 mL; 6 small + 3 big glasses; 3 L -> 3,000 mL; 2,300 mL -> 2 L 300 mL;
the 1 L bottle = 1,000 mL) equal no question answer. No miss, hint or rung prints an answer; no hint done literally gives the plan wrong answer. Played with real input (playkit): phase 1-4 steps move on at
ONE click on the named control; a click elsewhere (a glass row, a wrong tag) shows that step hint. The start page (tap, jug, cups, glasses, unlabelled measuring jug) does not answer its hook.
Every replacement line below was run through the bubble-no-repeat rule (check.mjs 249-263) together with its phase run (steps, hints, says, misses, ladders, closing, wins): no pair is alike.

## MUST-FIX
None.

## SHOULD-FIX (old -> new)
1. ph2 ML2 correction (seq 744-752, drawBay 873-884) does not redraw the misconception ("the kettle changed"): the kettle is drawn EMPTY with all 8 cups AND all 4 mugs full at once (one kettle, 12 vessels of
   water), which if anything supports "it held more". Only the dashed brim line and the miss text say "same line". It does end on the whole answer (verdict chip "mugs hold more"). Cheapest fix: add a demo
   level (D.jlv) so that after each row fills, the row tips back (D.fill r down to 0) while the kettle water climbs to the dashed brim line; end on the kettle full at that line, the counts "8" and "4"
   standing under it, and the chip. (The brief own traceback.)
2. ph2 Q3 (113, 912): the say names the reason. Old "Both jugs fill 7 glasses, but jug 2 has bigger glasses: do they hold the same?" -> "Jug 1 and jug 2 each fill 7 glasses: do they hold the same?" (59);
   the picture (7 small, 7 big glasses) carries it and the win (117) then says the reason once. Its correction prints "700 mL" and "1,400 mL" under the jugs with no glass size anywhere: add
   "each glass: 100 mL" / "each glass: 200 mL" beside each row as Q4 does with "each cup: 150 mL" (line 900), or drop the totals.
3. ph2 step 2 (94) names its result and pre-empts the ML2 miss ("filled to the same line both times"). Old "Tap the jug again: it fills to the same line and pours into the big glasses." ->
   "Tap the jug again to fill it from the tap and pour it into the big glasses." (75). Keep "same line" for the miss and the correction as the discovery.
4. ph3 step 2 (136) names its result and two acts. Old "It reads 1,000 mL, so now tap the 3 L card to send it through." -> "Now tap the 3 L card to send it through the converter." (54); step 1 stays: the child reads
   1,000 off the jug (pointer and bold mark). "converter" is first met here and was never explained: the step now names the machine.
5. ph1 Q3 ladder order (82-83): the miss (rung 1) already states the fact, rung 2 asks it as a question (weaker). Miss -> "Which holds more water, a teaspoon or a water tank?" (51);
   ladder[0] -> "A teaspoon holds a little and a tank a lot, so which unit is the small one?" (75); ladder[1] kept.
6. ph1 step 2 (57) primes Q2: it prints "the tag that says how much the mug holds" just before Q2, whose right tag reads "how much it holds" (a label match, not a thought), and its hint "Look for the tag written in
   mL." teaches a unit cue (Q2 tags carry no unit). Old "It is full now, so pin on the tag that says how much the mug holds." -> "It is full now, so pin the 300 mL tag on the mug." (47; 300 mL is no answer);
   hint -> "It is one of the three tags at the right." (41).
7. ph1 near-copies and wording: Q1 miss (69) "...so which tag tells that?" ~ rung 3 "...ask which tag tells about that water."; "to the top" occurs in step 1, rung 1 and Q1 win. Q1 miss ->
   "Is the jug height or weight about the water it holds?" (55); Q1 win -> "Yes, the 2 L tag is its capacity, not the 25 cm or the 400 g." (61); Q2 win (77) "the bottle capacity" ->
   "Yes, how much it holds is the capacity of the bottle." (53); step 1 (56) "Tap the tap to fill the mug right to the top." -> "Tap the water tap to fill the mug right to the top." (51).
8. ph1 tag position: the capacity tag is the THIRD tag in the warm-up, Q1 and Q2. Reorder Q2 (73): tags [t-heavy, t-holds, t-tall].
9. BUILDER DOUBT (pin before fill, 537-549): a child can pin any tag on a still EMPTY jug or bottle and answer right without ever filling it (a dry jug wearing "2 L"); the win and the correction fill it.
   Not wrong maths, but the plan mechanic is "a tag pins onto a FULL container". Cheapest fix, three lines, no check or control changes: at the top of pinNow, before put({ carry }):
   if (kind === "tag" && (ref.current.lv[c] || 0) < 1) { await fillNow(); if ((ref.current.lv[c] || 0) < 1) return; }   (the tap fills first, as refill does inside pourNow; the warm-up already fills
   first; the units containers start full). Not "start full": that would idle the tap and rung 3 ("Fill it from the tap"). A tag tap now plays a fill and then a carry: re-run the FULL check (rows that
   click a tag then press Enter after a fixed wait may need longer).
10. Step hints that restate their step (hint says what to do, not the step again). ph3 step 2 (136) "Tap the card above the converter." -> "It is the white card at the top." (32); ph4 step 1 (167) "Pour the 1 L bottle into
    the measuring jug once more." (each phase is its own mount: no "once more") -> "Pour the 1 L bottle into the measuring jug." with hint "Tap the bottle, then watch the line." -> "The bottle stands to the left of the measuring jug." (51);
    ph4 step 2 (168) hint "The card waits above the converter." -> "Look at the top for the white card." (35).
11. ph3 ladder rung 1 (138) presupposes a pour the question never asked for (the jug is empty again). Old "Where did the litre bottle stop on the measuring jug?" ->
    "Where does the water from the litre bottle stop on the measuring jug?" (66). Optional: Q5 and Q6 own misses are already stronger than the shared rung 1, so the hint gets weaker; give Q6 its own ladder.
12. ph4 wins (186, 192) share one shape with ML4 "Yes, X mL is Y L Z mL." and Q8 reads cryptically (never says dividing by 100 is the slip). Keep ML4. Q7 -> "Right: 12 whole litres, and 400 mL left over." (45);
    Q8 -> "Yes: dividing by 100 gives 74 L, but dividing by 1,000 gives 7 L 400 mL." (72). (Not "the zero holds the hundreds" for ML4: it echoes ML4 miss.)
13. Nits: ph2 ladder[0] (96) "How much does one glass hold?" -> ML2 shows cups and mugs: "How much does one small cup hold?" (33). Q4 win (125) "the bottle capacity" ->
    "Yes, 6 cups of 150 mL make 900 mL, the capacity of the bottle." (62). ph3 closing (139) says "1,000" three times: "A litre is 1,000 mL, so multiply by 1,000 and only 1,000, then add the mL." (74).
    Dead lines (22, 54, 91, 132, 164): says and OPENING are never shown (steps win), but ph3 "How many millilitres fill the litre bottle? Now use that number." would hand over the lesson if ever shown:
    delete them or keep them unreachable.

## Departures judged
1 one sentence <= 80, plan rung 3 -> an act: ACCEPTED (see 5, 11 for the rung order). 2 warm-up 6 small + 3 big: ACCEPTED (keeps the 2:1 of ML2; the 6 equals Q4 six cups as a count, not its answer 900).
3 no running count, sky-blue glass counts under each glass: ACCEPTED (the plan colour for counts). 5 corrections: ph3 and ph4 ACCEPTED (worked lines, out box and place board with the grey zero end on the whole
answer; the grey zero in the hundreds box is the redraw of "090 read as 900"; no 86 bottles: the Q7 and Q8 misses carry the "far more than the card" point); ML2 and Q3 see 1 and 2; ph1 corrections fill and pin
(the brief own); Q8 "what went wrong" in the win line ACCEPTED (see 12 for the wording). 6 Q3 unit tags, one per container and unit: ACCEPTED (one tap per choice; the correction pins mL on the spoon and L on
the tank; both full vessels stay drawn).

## Questions for the owner (not for the builder)
- Free play is the pouring bay only (the plan also promised any container and the converter both ways). FREE_LINE is honest and the bay pour-and-pour-back works. Recommend ACCEPT: the converter has "no
  setting for any other number" and phases 3-4 already use it; widening means new controls.
- ML1 stem "holds 2 L" names the tag that answers it (the plan own wording: three facts, pick the capacity). Recommend keep; it is the definition being tested.
- Picture scale in ph1 Q3 (LJ_U 403-408): the teaspoon (s 2.0, about 300 px with its handle) is drawn about as big as the water tank (s 1.2, 194 px), which undercuts "a little" vs "a lot". For the visual pass:
  spoon about s 1.4 and tank about s 1.5.
- Place board: five empty boxes TTh Th H T O until the card goes through (so the answer digit count is not shown), then 4 or 5 boxes: a jump for 4-digit cards; ph4 card is on show anyway, so its
  board could open at the card own digits. Headings are letters where the brief says words (same question as the weighing_bench and unit_ladder).
(English lines are not in TR yet: no TR key to keep in step; the language pass comes after.)
