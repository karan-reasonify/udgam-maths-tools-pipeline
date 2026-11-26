STATUS: fixes-needed
SLOTS: M2.S2.T4.C16.2D1
FILES: none (report-only); my play-vr190-*.png and scratch deleted
CHECKS: 24 pack frames opened in full (p1 step1/stepwrong/ask/wrong/win/choice-wrong/hintkey/end, p2 end, p3 wrong/end, p4 win/end; en/hi/gu mixed) + ~45 real-input playkit runs (keys, click, motion on/off) with pixel sampling; 0 console errors
FAILURES: 0 must-fix, 2 should-fix
REPORT:
FINAL VERIFY C16 Square Cover, visual-reviewer-1.90. Verdict: ISSUES (0 must, 2 should). Checklist items (builder 1.54), real flows en/hi/gu:
(2) FIXED. Untouched question, right answer typed/chosen by real input: P1.3 rope + all 12 tiles, coil gone (en/hi/gu, en also motion ON); P3.2 both rows (8, 16); P3.3 all 3 rows of 13; P4.2 counts 27 and 24 drawn (green A, violet B); P4.3 big squares converted to 48 (dashed sub-squares, "No: sizes differ"). Same in all 3 languages.
(3) FIXED. Correction cell (133,105,200) stdev (0.7,1.3,2.2) = a really laid tile (133,105,200) stdev (0.7,1.2,2.2); both rows, en/hi/gu (was flat, stdev 0).
(4) FIXED. P3.1 answer 22 (real flow, motion on): lit inside block, then the rows, sample (216,150,30) hue 39 (tan-hue pixels 0-13 of ~45k); dark outline kept; running 9/18/27/36 then Area 36; identical in hi and gu.
(5a) FIXED. Hi/gu/en Area label vs rope hard lower edge (p1 win Q1, Q3 end, real Q1 win): hi 14 px (was 2-5), en 14, gu 12 (at the floor, was 11).
(5b) FIXED. en "Boundary" ink x62, panel border x40 = 21 px (was 5-6); 20 px to the fence posts; hi x146, gu x162 fine (p1-choice-wrong, p1-hintkey).
(7a) FIXED. After real taps (cm in the warm-up, m at Q1, cm at Q3) all three shelf squares sample (138,108,203) hue 259 at the Q1 win and the p2 end in en/hi/gu; mid-act probe shows amber (240,197,102), so the probe does see it.
(7b) FIXED. p2 end stamp: ghost row = violet 72 + one dashed cell = 140 px = the stamp's width, en/hi/gu (pack p2-end).
(7c) FIXED. P1 warm-up hand at the top-left corner: fingertips 14 px under the panel top border, glove whole (en run; the pack skips the act).
(7d) NOT FIXED / PARTLY, card clearance:
[should-fix] p1 warm-up after String and Q1 after String (real flow, en/hi/gu; 3x2 and 5x3 cards) - the cream card has 24-31 px, but the rope sits 20 px outside it: its hard lower edge is y521 and the Cover key's pink invite ring starts y523 = 1-2 px gap (key body 10 px). Cause: card top margin 84 -> 112 moved the card down 28 px (gap was ~39). Fix: lift card + labels ~14 px (start the hand ~10 px lower so fingertips stay >= 12 under the border), or shave ~12 px off the 5x3/3x2 card height, so rope-to-ring >= 12. Q3 6x2 card (rope bottom y473) is fine; 16 cm label above the rope 13-14 clear; coil 32 clear.
NEW from the round:
[should-fix] p4 win/end (pack p4-win/p4-end hi + gu, real 4.3 after "No") - the converted 48-square Patch B grid is taller, its top y178, while the Patch B label stays at y153: hi nukta of "tukda" and gu descender end at about y172 = ~5 px above the grid (en 14); rule 1 asks 12. Fix: raise the Patch B label ~8 px in 4.3 win/end (or start the grid lower).
Spot check, nothing else new: p1 step1/stepwrong/ask/wrong/win/choice-wrong/hintkey/end, p2 end, p3 wrong/win/end, p4 win/end in en, hi, gu: no clipped text, no matra on a line, no English left in hi/gu, nothing red or crossed after a miss (P1 traceback violet + orange ring, P2 miss amber 1 m, P3 ring amber), keys berry/yellow and fitting, Kiko thinking at asks, nothing under the Answer key.
Not judged: item 6 (no visual claim; note 4.3 bubble at +1.6 s read "Two areas compare by counting only when the squares are the same size." - the maths reviewer owns the "Right, the squares differ..." line); item 8 runtime gap (Enter cannot repeat an act key) not touched. Pack frames not opened one by one (p1 other-language siblings, p4 win en/gu): judged through the same states on real-flow frames.
