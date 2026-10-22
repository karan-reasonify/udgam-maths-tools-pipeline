# unit_ladder (M1.S2.T3.C10.2D1) MATHS REVIEW round 1 (English only; reviewer: udgam-maths-reviewer, 2026-10-21)
Verdict: ISSUES (0 must-fix, 9 should-fix, 4 questions). Line numbers are tool.tsx at review time.
Maths right (recomputed): 300; 100 and 10; tiles 10|100|1,000; 7,245; 900; 127; 5 m 70 cm; 8 cm 3 mm; 4 km 608 m; 6,038; 9,007; 3 m 5 cm. Warm-ups 3,125 m / 2 m 50 cm / 5,026 m equal no answer or box.
Every near miss is rejected; two-box answers compare numbers ("05" = 5); 3 questions a phase, 12 of 12 plan answers; closings <= 78, "learned" <= 67; no "a/b"; Indian commas; no hint done
literally gives a wrong answer. The caller's full check passes guide-steps (one click on the named control moves on; a click elsewhere shows the hint).
Departures 1-7 all ACCEPTED: ML1 typed 300 (also ph4 Q2 "9,700 ... write it yourself", not listed by the builder); tiles judged on Enter; "? m"/"? cm" at questions (needed, else Step computes the
answer); Rebuild only in the ph3 warm-up; refs laid from a tray by guide steps; no second board in ph4 and no road-sign fifths in ph1 (the ringed hundreds box taking a grey zero is the why; no
ph1 question asks km/m); no runs box, closings <= 80.
Builder's doubt: NOT a giveaway. The ruler and stick are the plan's references and print only 0-3, "0", "1 m", "1 km", never 10 or 100; counting is the child's act. Do not number the stick's tens
(100 is Q2's answer). The fault is the Q1 miss (2): it restates the question and nothing says a mark is a centimetre. Cheapest fix: the wording below, no picture change (the stick already draws a
longer mark every 10, line 760).

## SHOULD-FIX (old -> new)
1. ph1 Q3 correction (672, 774): a tiles miss slides wrong tiles back and ghosts the numbers, a bare reveal; the plan lights the reference beside the step (refs lit only for claim/pair). -> light the
   ruler/stick/sign beside each step whose tile went back (`refs` has no lit flag for the sign yet), with the ghost numbers.
2. ph1 Q1 miss (142): "Look at the metre stick: how many centimetres long is it?" -> "The long marks on the metre stick are 10 cm apart: count the gaps." (66; not "count 100 gaps")
3. ph1 tray hints (130-132; line 778 drops a laid cell, so "middle" is wrong at step 2): "The ruler is the short yellow one in the tray." -> "The ruler is the first one, on the left of the tray."
   "The metre stick is the long thin one in the tray." -> "The metre stick is the left one of the two in the tray."  "The road sign is the green one in the tray." -> "The road sign is the only one left in the tray."
   (tray drawings are 160 vs 168 px and both wood-yellow; the skin pass changes the look.)
4. ph1 near-copies (153, 135, 134): Q3 win "Yes, every step has its own number." ~ closing "Each step has its own number: 10, 100 and 1,000." ~ rung 3 "...so each has a different number."
   -> Q3 win "Yes, the 10 sits only between millimetres and centimetres." (58, the brief's Win); rung 3 "Check each step against the ruler, the metre stick or the road sign." (68). Closing kept.
5. Step hints repeat the instruction shown with them (163, 193, 223): "Tap the key that says Step down." -> "The Step down key is at the bottom right." (ph3: "The Step up key is at the bottom right.");
   ph2 step 2 (164) "The 125 m are still waiting on the kilometre rung." -> "The Add on key stands where Step down was." ph3 step 2 (194) names its result: "Now tap Rebuild to
   check that 2 m and 50 cm make 250 cm again." -> "Now tap Rebuild to put the card back together."
6. ph4 Q3 (888): the place board is pre-filled with 305 in H T O, the zero already in the tens box, before the child answers; the brief opens on four EMPTY boxes and shows the zero after a miss
   (the zero holding the tens is what Q3 tests). -> four empty boxes until lv >= 2 or the win.
7. ph2 rung 1 (167): "What happens to the smaller part when the card steps down?" has no object for Q3 (9 m). -> "Which part of the card gets multiplied, and by which number?"
8. ph4 ladder (228) describes stepping down; Q3 (305 cm) steps up and shows no empty box. Rung 1 "Which boxes on the place board are still empty?" -> "Which place does each digit on the card sit in?"
   Rung 2 "Write the larger part, then fill every place, with a zero where it is empty." -> "Count the places the smaller unit must fill, then put a digit in each." (70)
9. ph4 closing (229) echoes the ML4 miss: "A zero holds each empty place: beside kilometres the metres take three places." -> "An empty place in the smaller part is held open by a zero." (58; distinct from the new rungs)

## Questions for the owner
- Single-unit answers show a bare number in the slot; the brief wants the unit beside the box (a one-box `parts: [{ label: "m" }]` would do it). Default: bare, the question names the unit.
- Place-board headings "Th H T O" vs the brief's words: check against ch 1's chart and the hi/gu TR at the language pass.
- Plan order: if Q1 is missed, its correction (three "100 cm" bars, ghost 100) shows Q2's first box and Q3's middle tile. Plan-faithful (qids fixed); noted.
- ph3 Q6 near miss "46|8" is the wrong-divisor slip (divide by 100), inherited from v2; the writeup names none for this item. Kept.
