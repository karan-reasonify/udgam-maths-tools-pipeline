STATUS: ok
SLOTS: M2.S2.T4.C16.2D1 M3.S4.T9.C41.2D1
FILES: work/indiannica_eng_maths5_ch8/{M2.S2.T4.C16.2D1,M3.S4.T9.C41.2D1}/tool.tsx (+ the pairs check ported)
CHECKS: quick 33/0/0 both; full C16 98 pass 1 warn 0 fail, full C41 98/1/0; only warn = miss-shows-answer (expected); both ported
DECISIONS: 5 lines reworded per ALL-soften-leaning-hints; old en keys deleted from hi+gu, each new key 3x (hi, gu, item); no other hint touched; no digits in any new line
C16 4.1 miss: "A longer patch can still cover less; count them." -> "Look at A and B: count their squares first." | hi "A और B देखो: पहले उनके वर्ग गिनो।" | gu "A અને B જુઓ: પહેલાં તેમના ચોરસ ગણો."
C16 4.3 miss: "Look at the size of the squares, not just the counts." -> "Think about what each number counts." | hi "सोचो, हर संख्या क्या गिनती है।" | gu "વિચારો, દરેક સંખ્યા શું ગણે છે."
C16 1.2 ladder[1]: "Would a fence tell you how much grass there is to cut?" -> "Perimeter runs round the edge; area covers the inside." (both words defined) | hi "परिमाप किनारे के चारों ओर है; क्षेत्रफल अंदर ढकता है।" | gu "પરિમિતિ ધારની ફરતે છે; ક્ષેત્રફળ અંદર ઢાંકે છે."
C41 P4 Q1 miss: "Multiply the 35 tenths by 16, then change the tenths back." -> "Look at the lens: what unit is that edge in?" | hi "लेंस देखो: वह किनारा किस इकाई में है?" | gu "લેન્સ જુઓ: તે ધાર કયા એકમમાં છે?"
C41 P4 Q2 miss: "Work out 25 × 24 tenths, then write them as cubic centimetres." -> "Check the unit the lens shows before you multiply." | hi "गुणा करने से पहले लेंस की इकाई देखो।" | gu "ગુણતાં પહેલાં લેન્સનો એકમ જુઓ." (then phase ladder[0] = product in tenths, ladder[1] = divide by 10)
BUBBLES (playkit real taps: acts, then 1 wrong choice/digits; 1.2 = 3 Hint taps at try 0; ink via lib measureHintFrame; lines / clear between / top / bottom / side px; err 0, tries 1, pad open, slot empty):
 C16 4.1 en 2L 20/63/50/30 · hi 2L 27/31/50/29 · gu 2L 23/40/43/30
 C16 4.3 en 2L 22/61/63/30 · hi 2L 22/34/45/29 · gu 2L 25/40/50/30
 C16 1.2 rung3 en 2L 18/68/57/30 · hi 2L 30/34/44/29 · gu 2L 30/40/41/30
 C41 Q1 en 2L 20/63/49/30 · hi 2L 24/34/45/28 · gu 2L 24/40/50/30
 C41 Q2 en 2L 20/61/50/30 · hi 2L 15/33/46/28 · gu 2L 24/40/35/30
 All five: 2 lines, >=15 px between lines, >=28 px to the outline. First drafts gave 5-7 px in en: the runtime's line pitch does that when line 1 has a descender (g q p y), so the words were chosen to keep line 1 clear. Untouched lines in these phases sit at 4-9 px (old 1.2 rung2 is 3 lines in en, 4/8 px).
AUDIT (not edited, spec allows only the listed lines; lead's call): C41 P3 Q3 ladder[0] "Compare all three edges; a cube has every edge equal." (6, 6, 4 on screen) and C41 P4 Q3 ladder[0] "Tenths times whole numbers works when only one edge has tenths." state the condition of the right choice on yes/no items (miss 2); C16 2.2 ladder[1] "Its sides are in m, so what kind of square unit is it?" leans to 1 sq. m (3 choices). All other miss/ladder lines are method nudges.
RISKS: hi/gu need a native read (literal; इकाई/એકમ, लेंस/લેન્સ as the tool already uses)
ESCALATE: no
Not uploaded; shots --pack not run; scratch deleted.
