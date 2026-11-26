STATUS: checked (full 98/0/0, ported)
SLOTS: M2.S2.T4.C16.2D1
FILES: work/indiannica_eng_maths5_ch8/M2.S2.T4.C16.2D1/tool.tsx; output-preview pair written
CHECKS: quick 32/0/0; full 98 pass 0 warn 0 fail (1 full run this message); port ok, host emulator plays every phase
C16 fixes (C16-fixes.md + coordinator rules):
1 Choice order: fence is now Area / Perimeter; 2.2 is 4 m / 1 sq. m / 1 sq. cm; the stamp (2.3) is sq. m / sq. cm / sq. km (its right answer was first too). 4.2 left as the file says (Patch A is first there).
2 Rungs end on an act or a question: 1.2 "Run your finger along the fence: does it go round or across?" / "Would a fence tell you how much grass there is to cut?"; phase 2 rung 2 "Which square, laid again and again, would cover it best?"; 2.2 rung 2 "Its sides are in m, so what kind of square unit is it?"; 4.3 "How many small squares fit in one big square?" / "With both in small squares, which count is bigger?".
3 Same size no longer toggles: one press, then the key goes, the picture keeps 20 vs 48, no re-lock (proved with playkit).
4 Nudge on the locked Answer key or pad (window pointerdown, real taps only): card "Lay the string and cover the card before you answer.", rect "Keep tapping Lay a row until no paper shows.", compare "Count both patches before you answer.", sizes "Tap Same size before you answer.", unit "Try a unit square on the card before you answer.". No numbers in them. When the act is done the gate opens and the question comes back (api.say(item.say)). hi/gu TR is for the language pass.
5 Phase 1 ladder: "Count the squares you laid, one row at a time." / "Add the rows together: how many squares in all?".
Rule "a rung is a new move": phase 3 ladder "Now count how many rows you laid." / "Add one row's count for every row: what is the total?"; phase 4 ladder "Read the number under each patch." / "Which number is bigger, the one under A or under B?"; 3.3 miss "Count the inside squares too, not just the edge ones."
Small: learned 1 "You learned: area is the surface; perimeter is the length round."; 4.3 ask "Are counts enough?".
Plan misconception: rect nearMiss is the edge ring when b > 2 (9x4 = 22, 13x3 = 28; 8x2 stays one row short, 8). On a ring miss the traceback first lights the inside block amber (1.1 s; seen in a motion playkit shot), then lights the rows 9, 18, 27, 36 and ends on "Area 36 sq. cm".
Touch rule: touched is now tool-wide, not per question. A real tap on any key or piece, or a REAL Enter (isTrusted keydown) on a guide step, counts; toolApi/AI never do. Proved: phase 1 steps done by Enter only, then the Answer key is off at the question; tap -> nudge; String + Cover -> on, question back.
Playkit real clicks (all clean, no console errors): P1 (Enter steps), P3 (nudge, 4 rows unlock, ring traceback), P4.3 (nudge, Same size once, key gone, unlock).
Not done: TR (language pass owed: the nudges and win lines are api.say/data lines to add by hand). Sidecar still has no guide.answerGate (port has no field for it).
