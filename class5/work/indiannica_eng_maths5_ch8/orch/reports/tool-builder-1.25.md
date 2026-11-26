STATUS: ok (stage 2 done: polish, Gemini pass, hi/gu; final full check 98 pass 0 warn 0 fail, ported)
SLOTS: M1.S1.T2.C6.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T2.C6.2D1/tool.tsx
ESCALATE: no
C6 Edge Walker, stage 2 (resumed after the restart: polish + answerGate were in; the design pass had not landed, tool.tsx == pre-design).
1 POLISH (C6-polish.md):
 - P3 rung 2 is now "Write it as length + breadth + length + breadth, then add."
 - The bad-tag nudge is "Tap a longer side first."
 - P3 Q2 rung 2 is now "Opposite sides match, so you may tag either side of the pair."
 - P4 rung 2 is now "You can check it by adding all four sides."; P1 rung 1 is "Check the sum: is every side's length in it?"
 - MODEL.answerGate (phase1..4 + ungated) is in, and it reaches the ported .json.
2 VISUAL PASS: `design` ran (gemini-3.5-flash, 47.1 KB). Looks only: soft drop shadows (paper, chips, strip, ant, pills, start art), a paper gradient, grid lines at 0.7 opacity, round joins. No maths, gate, TR, PHASES or MODEL change.
 - CLI NOTE "made but drawn by no <Skin>: mat" is a false alarm: the figure draws <Skin name={f.skin}> with f.skin from the figure table (bed in P1 Q1, mat in P2 Q1), which a static scan cannot see; mat shows on the sheets.
 - I removed the shadow filter Gemini put on Thumb (its filter def lives in Work's defs).
 - shots / wrong / start read: no picture problems, no skin over a digit, no words added, no colour lost.
3 LANGUAGE PASS: TR with 101 entries each in hi and gu. It covers every printed line, the 5 nudges, the 12 win lines (added by hand), OPENING, and the drawn words (Length, Breadth, Walk, Write in cm, Two lots, Shape, Boundary, m, cm).
 - EW_UNIT is gone: units come from TR (ewU reads TR[lang]), so the fact chip and Thumb units come from TR.
 - tr-coverage passes. Fit sheets hi and gu are clean.
 - Full check 1 failed `zones` on the hi P3 Q1 bubble line, which ran too wide on the phone. I shortened that line and the nine other hi/gu lines over 58 characters (P2 step 1, P2 closing, P2 Q1/Q3, P3 step 1 gu, P3 Q1/Q3, P4 step, P4 Q3, free line).
 - Also: the tag chip's value now sits 14 units after the tag word (it was cramped in gu).
4 CHECKS: full 1 failed zones (hi line, fixed). Full 2 failed action-anim "acting was not true" on an unchanged act (machine load). The C4_CHROME_POOL=1 re-run was 98 pass, 0 warn, 0 fail and ported. 3 runs used. No runtime edits.
Terms for a native speaker:
 - perimeter = परिमाप / પરિમિતિ; boundary = सीमा / સીમા; side = भुजा / બાજુ; length = लंबाई / લંબાઈ; breadth = चौड़ाई / પહોળાઈ
 - rectangle = आयत / લંબચોરસ; unit = इकाई / એકમ (Hindi NCERT may prefer मात्रक for a unit of measure); formula = सूत्र / સૂત્ર; bracket = कोष्ठक / કૌંસ
 - m = मी / મી, cm = सेमी / સેમી; centimetre = सेंटीमीटर / સેન્ટિમીટર
 - key labels: Walk = चलो / ચાલો; Two lots = दो गुना / બમણું (not "दो बार", which reads as "press twice"); Write in cm = सेमी में लिखो / સેમીમાં લખો; Shape = आकार / આકાર; tag = टैग / ટેગ; key = कुंजी / બટન
 - objects: flower bed = क्यारी / ક્યારી; mat = चटाई / સાદડી; badge = बैज / બેજ; frame = फ्रेम / ફ્રેમ
 - title: Edge Walker = किनारे की सैर / કિનારીની સફર
 - "round" as "चक्कर" in win lines (बैज का चक्कर 35 सेमी है); Gujarati uses "ફરતે"
 - Some shortened hi/gu questions drop "this" or the object name, e.g. P2 step 1 hi "1 मी = 100 सेमी, तो सेमी में लिखो दबाओ।"
