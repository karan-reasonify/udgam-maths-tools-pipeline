STATUS: ok (built, full check clean, ported; English only, visual pass not run)
SLOTS: M2.S3.T7.C31.2D1
FILES: class5/work/indiannica_eng_maths5_ch8/M2.S3.T7.C31.2D1/tool.tsx
CHECKS: quick 32/0/0; full 97/0/0 (2 of 6 runs), ported
FAILURES: none
DECISIONS: letters M/H/L in squares; bigPad false; P1 Q3 authored; :2 and :5 as numbers; :7 unused
RISKS: sidecar guide.answerGate note missing; muddy tile-over-photo look until the visual pass
ESCALATE: none
tool-builder-1.6 · class 5 ch 8 · M2.S3.T7.C31.2D1 Part Squares · runtime r66 (silent, pencilActs strict)
Preview: class5/work/indiannica_eng_maths5_ch8/M2.S3.T7.C31.2D1/M2.S3.T7.C31.2D1.preview.html (ported pair in output-preview/...)
Check: quick 32/0/0; FULL (2nd of 6) 97 pass · 0 warn · 0 fail · 5 info, ported, hostsim ok. English only (TR empty, language pass later). Visual pass NOT run.
Geometry: every outline is real; each square's kind (W whole / M more than half / H half / L less than half) comes from its exact area inside the outline (stored in PS_SHEETS). The oracle works every kind out again by its own curve and clipping, then counts each answer by the textbook rules. Halves are exact on the straight-line shapes and within 0.40-0.60 on the curved hand, leaf and stone. Curved M squares are 0.65+ and L squares 0.35 or less.
Phases (guide steps on 1-3, each on its own small warm-up outline; phase 4 prints its teach line):
 1 Trace and count: tap each whole square and the pencil WRITES its number. A cut square is refused (inside shaded, outside amber) and is not numbered. A second tap lights the square's number. Leaves of 18 / 14 / 12 whole squares.
 2 More or less than half: tap an edge square to mark it M, tap again for L. Leaf with 7 M (Q1), the same leaf with one M square ringed (Q2, answer 1), traced cup with 9 M (Q3).
 3 Two halves make one: tap a half to mark it H. Pair (the pencil draws a bracket, marks:true) joins the next two halves and marks them H. Shapes with 10 halves (5), 14 halves (7) and 6 corner-to-corner halves (3).
 4 Estimate: a fully pre-marked hand (21/9/6), leaf (13/5/4) and stone (16/7/6). Pair the halves, then type the total. The tally ends "about N sq. cm" in green, with "estimate" under it.
Answer gate (api.lock only in user mode after a real touch, released when the act is done): P1 every question = number every whole square. P2 Q1 and Q3 = mark every edge square. P3 and P4, all questions = pair every half. UNGATED: P2 Q2 (recall about the ringed square). I played the gate with playkit: P1 and P2 locked after the first touch; P4 locked until the 3rd Pair, then 33 was accepted and won.
Departures from the writeup:
 - P1 Q3 is authored (qid null). The plan has only 2 phase-1 questions, so I added a smaller leaf with 12 whole squares.
 - P2: the leaf has 7 M and 5 L, and the cup has 9 M and 7 L. The plan says 3 and 5 L. A smooth curve round whole squares always touches the corner squares. The L counts are never printed or asked.
 - P2 Q2 (:2 "how is it counted?"): the answer is the number 1, using a ringed M square.
 - P3 Q3 (:5 "how is a corner-to-corner square counted?") is rewritten with a number answer: 6 such halves make 3. :7 (is it exact? no) is unused because it has no whole-number answer.
 - The stone has 7 L (the plan says 4; this count is never asked).
 - The marks are LETTERS M/H/L inside the squares, with the words on the tally card. "More than half" does not fit a 72-unit square at 28, and the letters go through tx so hi/gu can have their own.
 - The tally shows a value only when it is given, or at the win or the traceback. It never shows a live count that would print the answer.
 - Win lines say "squares", not "sq. cm". The bubble cut "sq." as a sentence end, and that failed classroom pacing.
 - bigPad:false. The sheet plus the 370-wide tally card needs the full 1086, and the cells must stay 72 or more.
 - Free play: Leaf / Cup / Stone / Grid (a grid-line rectangle of 12 squares with no estimate) and a live tally. The hand is left out because its cells are 55, under the 72 finger box.
Skins: leaf (phases 1-2, stretched to the outline's box, stalk clipped), hand (phase 4), cell tile at 0.42 on every counted square (40 or fewer a screen, otherwise all plain). Cup, stone and the phase-3 shapes stay plain.
Main session: the sidecar .json still needs the guide.answerGate note (acts above). I edit only tool.tsx, and port writes no gate note.
Runtime gaps: the bubble splits a line at "sq." (an abbreviation read as a sentence end), so "sq. cm" cannot appear in a bubble line. I worked round it.
Machine note: another agent deleted the shared scratchpad mid-run. My files are in scratchpad/tb16.
Least sure: are the letters M/H/L (words only on the tally) acceptable, or should the squares be bigger and carry the words?
