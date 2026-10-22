# M1.S2.T4.C15.2D1 length_columns: maths review, round 1 (English, r29 silent, keyOnly)

Verdict: ISSUES. 0 must-fix, 6 should-fix, 1 optional, 5 questions. Quick check 28 pass / 0 warn / 0 fail (plan-answers INFO: authored 3.2 = :5 [0,32]).
Recomputed by script, not from the code comments: all 12 answers and 12 near misses (:4 near 9|135 = forgot the carried km), every win-line sum, the four warm-ups
(4 km 100 m; 3 m 75 cm with 5 m / 115 cm after the break; 4 cm 9 mm with 8 cm / 11 mm; 6 km 038 m). All maths right. Every printed line <= 79 characters, learned lines
<= 69, no "a/b", commas from 1,000, exactly three questions a phase, concepts/objectives match. No answer, carried digit or bar is printed before the child answers (carry box,
chip, break and difference bar appear only after the own act of the child, the correction or the win); corrections end on the whole right answer in the answer row (d = 4;
"place" ends on 058 / 07), unmarked. item.ladder IS read by r29 (rungOf: miss, then ladder[0], then ladder[1]), so ML1 own ladder is live.

[should-fix] phase 1, items :1 and :2 (tool.tsx:87) - ladder[1] "Start in the ones box on the right and put a zero in each empty box." cannot be done: digits type left to right
  (rowCells "place", 442-443), so a child who obeys types the 8 first and the boxes read 800 - lesson 1, a hint done literally - "Fill the boxes so the last digit sits in the ones box, with zeros in front."
[should-fix] phase 3, item :5 (tool.tsx:168) - "in m and cm" lives only in `ask`, which keyOnly never draws; [0, 32] needs a 0 in the m box. 32 typed in the m box + Enter only moves the caret
  to the empty cm box (no miss, no line); 32 typed in the cm box + Enter jumps to the empty m box, a second Enter does nothing, nothing says write a 0 - the child must see both boxes are asked for -
  say "How much longer is a 5 m 8 cm jump than a 4 m 76 cm jump?" -> "How much longer is a 5 m 8 cm jump than a 4 m 76 cm jump, in m and cm?" (70). Keep [0, 32]: the 0 is fair
  (plan: "with no metres left") and an empty m box cannot be sent without `free` parts.
[should-fix] phase 4, item :8 (tool.tsx:209) - the say states the misconception as a premise and asks a plain subtraction; nothing says the break is wrong (v2 "Find the right answer" sat in the
  undrawn ask), so a child who accepts 100 mm types 6|93 - plan fidelity - "One child broke 1 cm into 100 mm: what is 15 cm 2 mm take away 8 cm 9 mm?" -> "A child broke 1 cm into 100 mm: do 15 cm 2 mm take away 8 cm 9 mm correctly."
  (76, ONE sentence for one-page). Keep the miss "Does one centimetre really give a hundred millimetres?".
[should-fix] phases 1, 3, 4, guide-step hints (tool.tsx:83, 152, 153, 187) - each restates its instruction or gives a reason, not an act - lesson 3, a hint says what to do - P1 s2 instruction
  "...so tap the last metres box." + hint "The ones box is at the far right." -> "...so tap the ones box." + "It is the box at the far right."; P3 s2 "Split works on the metre you took." -> "Split is the key that said Break.";
  P3 s3 "Now the top has enough centimetres." -> "Take away is the key that said Split."; P4 s3 "Split works on the centimetre you took." -> "Split is the key that said Break."
  Leave P2 s2/s3 and P4 s2 (they add what the key does); rewording all would make a run of identical "key at the bottom" hints.
[should-fix] phase 2 step 2 and ladder[0], phase 4 ladder[0] (tool.tsx:118, 122, 191) - "joining number / joining sign" is never named on screen (the box beside the switch only reads "1 km = 1,000 m") - Class 4
  language, no unexplained terms - name the box once where it is first needed: P2 s2 "1,100 m is more than 1,000 m, so tap Carry to make one kilometre." -> "The joining sign says 1,000 m, and 1,100 m is more, so tap Carry.";
  P2 ladder[0] "How many full joining numbers fit in the smaller column's sum?" -> "How many times does the number on the joining sign fit in the sum?" (66). P4 ladder[0] then reads fine.
[should-fix, minor] phase 4 ladder[1] (tool.tsx:191) - near-copy of the closing "Carry or break by the number that joins the two units: 10, 100 or 1,000." - lesson 3, rung vs closing -
  "Break or carry by that number, then do the millimetres first." -> "Work the millimetres first; one centimetre breaks into that many millimetres." (77).
[minor] every phase opens two of its three wins with "Yes," (tool.tsx:107, 131/141, 165/175, 200/211) - lesson 3, wins vary - e.g. P1 :2 "Yes, 07 puts a zero in the tens box and 7 in the ones box." ->
  "07 it is: a zero fills the tens box and the 7 stays in the ones box." (67).
[optional] phases 3, 4, take-away corrections - they redraw the right procedure (the break that makes 115 / 127 / 108 / 12 is the missing step) but not the own error of the child; the add
  corrections draw a pale bar for the answer of the child (childV), the take-away ones do not - add a pale bar under the bars at d = 0 so the purple difference lands where it does not.

[question] departures 1, 7 - no running count, guide-step invites instead of the opening pulse, no Solve key: accept (keyOnly has no runs box; no teaching loss).
[question] departure 2 - add questions are typed only; carry is taught in the warm-up and drawn in the correction and at the win (full state: sum, chip, leftover): recommend accept (plan answers are typed numbers).
[question] departure 3 - Break is live at take-away questions but disabled while the pad is open, and a miss re-opens the pad, so the P3/P4 rungs "Break one larger unit" point at a disabled key until
  Close is tapped: recommend keeping Break enabled with the pad open (its key at x 628 is inside the 900-wide picture, clear of the pad), else the play tester must confirm a child finds Close.
[question] departure 4 - the tap in ML1 is not judged: accept (a wrong tap shows a 900 m bar beside the 9 m card; the win redraws the 9 in the ones box, so "Right, the 9 sits in the ones box" stays true).
[question] departures 5, 6, 8 - :8 [6, 3]: accept (the plan answer text works out to 6 cm 3 mm; "10 mm" is the break, shown by Split and the sign). :5 [0, 32]: accept with the fix above.
  Delight (flip the switch to re-split a waiting chip) not built, free play deals new lengths: recommend accept (the P4 warm-up already contrasts 100 and 10 by switching m|cm to cm|mm).
  Order ML1, :1, :2 follows the plan as the builder says (not verifiable here; v2 ran :1, ML1, :2).

Builder doubt (warm-up = same KIND as Q1): keep. A column-method tool teaches a procedure and the Observe lines of the plan ARE these walks. No warm-up result (4 km 100 m, 3 m 75 cm, 4 cm 9 mm, 6 | 038)
or intermediate (1,100 m, 115 cm, 11 mm) is an answer or answer part of its phase; the questions use other numbers; the worked example gives the keystrokes, not the sum, and in P2 to P4 the child
still decides to carry or break and does the arithmetic. Closest pair: P1 (038 then :1 058), the worked-example pattern the phase teaches; only the P1 s2 hint fix above is needed to make it less leading.
