STATUS: ok · M1.S1.T3.C11.2D1 · quick 33/0/0 · full 97/1/0 (C4_CHROME_POOL=1, motion on+reduced), ported, NOT uploaded; the 1 WARN is miss-shows-answer (owner: working hidden after a miss)
1 Given-only line (P3 "Perimeter 36 cm", P4-Q2 "1 lap = 45 m") is plain text; the card is drawn only when it holds working. Probe: "card none" in all 12 Qs before the answer.
2 Wrapping uses the REAL drawn width (an empty svg <text> measures each word at 40, scaled). Order: one row; else one row a little smaller (>= fs-4); else break at "="; else 34+; else break between whole terms, the row ending AFTER the operator, never inside a bracket. Number+unit joined by nbsp. Probe badwrap: none.
3 hi P2 Q3 now at 40 px ("= 1 मी + 80 सेमी +" / "65 सेमी", "= 100 + 80 + 65", "= 245 सेमी" at 60). Smallest working row 33 px: en P1 "Perimeter of a square" is one unbroken name.
4 P4 Laps chip moved up 16; its descender clears the card bottom by 16 px in all 12 P4 states.
5 Progressive Hint:
  - press 1 = formula + substitution as given; press 2 = the next line; press 3 = up to, never including, the total;
  - P4 gained the given line "= 4 × 3.4 m × 5" before "= 4 × 34 tenths × 5";
  - rows per press: P2-Q3 4/5/5, P3 4/5/6, P4 3/4/4;
  - no total in any press; working_shown true only once something is shown.
PROOF real input: 16 playkit sessions, P1-P4 x en/hi/gu reduced motion + en real motion, every Q1-Q3: acts, Hint x3, right answer. No errors. No new TR strings.
KEPT: hidden working while acting, after a miss, getState no leak, Enter-answers, gate, tenths-slip rung, free play, AI mode.
