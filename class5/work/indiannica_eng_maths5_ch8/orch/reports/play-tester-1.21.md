STATUS: fixes-needed
SLOTS: M3.S5.T11.C51.2D1
FILES: play-pt121-p4m-q42-drop300.png (kept, cited); my other play-pt121-* PNGs and scratch folder deleted
CHECKS: playkit probes only (mouse, finger, keys; motion ON and reduced; en/hi/gu; 0 console errors); no tool edited
FAILURES: 0 must-fix, 2 should-fix, 2 nits
DECISIONS: none needed
RISKS: reduced-motion double tap on Mark level marks both jars; Hint key keeps the nudge line
ESCALATE: none
REPORT:
PLAY RE-PROBE C51 Three Measures (r66), play-tester-1.21. Verdict: ISSUES (0 must-fix, 2 should-fix, 2 nits). Builder claims tool-builder-1.44 proven except the two below.
[should-fix] P3 Q3.1/Q3.2, REDUCED MOTION only - a true double tap (45 ms, mouse AND finger) on Mark level marks BOTH jars (marks 1,1, Answer opens); with real motion it is 1,0 (ONE act). Acts finish instantly under reduced motion and doMark/doPush have no 400 ms guard like pressKey (Wide/High/Turn/Shelf have it). Repro: play({phase:3,motion:false}); click obj-key, obj-stone; t.doubleTap("mark",45,"mouse"|"touch"); jar_levels marks = 1,1. Should be 1,0. Fix: route Mark (and Push) through the same lastKey guard.
[should-fix] all phases, en/hi/gu - after a nudge is on the bubble the Hint key (bulb, data-control="again") keeps the NUDGE line, not the question (runtime repeat() re-says the last line). Repro: Q2.1 tap dim Answer -> "Set a cuboid on the shelf first."; tap again -> same line; same at Q1.2, 3.1, 4.1. On a fresh locked question the bulb does re-show the question; only a real act restores it. Should re-show the question (or the nudge hands the question back).
[nit] P4 Q4.2 motion ON: at +350 ms after a stick drop the hand and stick cover the "Push stick" label (play-pt121-p4m-q42-drop300.png); clears in about 1 s.
[nit] toolApi.shelf stays ["18x1x1"] at the Q2.1 win while the picture shows all 4 cuboids; the Mark key is live in Q4.2 (ballpush) and a tap marks the floating level, harmless.
PROVEN (motion on and off unless noted; hi/gu where marked)
- Q2.2 latch: fresh Answer dim; Turn x3 panel shut, then x3 panel OPEN: Answer + choice-yes/no stay live, panel stays open, no nudge (en on/off, hi on/off, gu). Warm-up Turn does not leak into Q2.2.
- First-touch gate: no real touch -> Answer live. toolApi.check(), answer(), gotoStep and two synthetic (untrusted) Enters never arm it. First real tap on a piece -> dim until the act is done; keyboard-only warm-up (trusted Enter on guide steps) arms it in P1-P4 (Q dim, Enter nudges). A retry after a miss is ungated (by design). P4 Q4.1 dim through float mark > push > 2nd mark; stick absent until the float mark.
- Nudges: dim Answer tap and hardware Enter nudge at all 10 questions; hardware DIGIT nudges at Q2.1/2.3/3.3 (typed stays empty); dim Shelf, dim Mark, Mark-with-no-object lines show; hi/gu all translated, hi "डुबा दो" fixed. No nudge while an act runs (3 taps/Enter/digit during Wide: bubble unchanged); the next act hands the question back.
- Double tap 45 ms mouse+finger = ONE act on Wide, Shelf, Turn (orientation 3-cycle), Push stick, and Mark level at real motion.
- P3 key/stone (finger drop ABOVE the jar), marble, lemon (held by stick) draw under water; P4 stick dropped ABOVE the jar pushes the ball (under:ball, level 184), no stuck drag.
- Start page en/hi/gu: Length/Surface/Space/Water on one baseline; "Space" 28 px below the cube; unchanged after a picture click and after Start + back-to-start.
- Wrong typed answer before the act (unarmed): miss, retry ungated, tap Wide, type 3 wins; armed: digits ignored. Q2.1 win fills the shelf with all 4 cuboids + chip (en/hi/gu). AI mode all 4 phases 12/12: answer()+check() wins, check() does the act. Free play works.
ENGLISH LINES: no new giveaway or wrong number (18 -> 4 cuboids, 8 -> 3, 3 cm x 20 sq. cm = 60, cork 16/46, ball 22; "The same"/"A new one", "Only part was under" fine).
Not run: tile-tap-with-no-card nudge, full hi/gu walk of P3/P4 units, summary page rows.
