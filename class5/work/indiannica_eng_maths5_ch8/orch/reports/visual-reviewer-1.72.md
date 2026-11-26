STATUS: fixes-needed
SLOTS: M2.S2.T4.C16.2D1
FILES: none edited (report-only); my play-vr172-*.png deleted
CHECKS: 33 changed pack frames opened in full (en/hi/gu) + real-flow playkit probes (P2 gate/correction/stamp, P3 covered/win, Q2/Q3 miss lines, edge-ring correction) with pixel sampling
FAILURES: 0 must-fix, 1 should-fix, 3 low questions
DECISIONS: none
RISKS: none
ESCALATE: no
VISUAL RE-LOOK, C16 Square Cover (M2.S2.T4.C16.2D1), changed chunk 2 (phases 2 and 3), visual-reviewer-1.72. Verdict: ISSUES (0 must-fix, 1 should-fix, 3 low questions).
Looked at: all 33 changed pack frames at full size (p2 open/ask-shut/ask-open/wrong/win/end and p3 step1/stepwrong/wrong/win/end, en/hi/gu). Plus real-flow playkit frames (en, hi/gu on the Q2/Q3 miss lines), pixels sampled. Pack caveat unchanged: p3 win/end show an empty rectangle and p3 wrong a flat grid because the pack route skips the acts; I judged those states on real-flow frames.
fixed (1.19 + play-tester-1.4):
- p3 tiles not violet: FIXED. Real covered/win grid hue 258, sat 0.47 (4,876 samples), the plain pack grid and the p2 shelf squares sample hue 259, sat 0.47 (#8A6CCB).
- p2 1 km square overhanging its tile: FIXED. Shelf squares 50/78/102 sit inside the 118 tiles (km x345-449 in tile x337-455), 14 px clear of the ring.
- p2 two invites: PARTLY. The ring stands down with the pad open, after the first unit tap and during the correction (verified). At first paint with the pad shut, ring + berry Answer are both on: that is the first-touch gate (KEEP rule 6), not re-raised.
- p3 step1/stepwrong 5x2 small: FIXED. 680x272 (cell 136), the same width and place as the 9x4 and 13x3 questions.
- p2 stamp amber: FIXED. Neutral paper card, ink dashed stamp, grey-blue picture, in all three languages.
- hi Area label 5 px under the outline: FIXED. Now about 15 px clear in p3 wrong/win/end (en and gu also clear).
- p2 units live during the correction: FIXED. 0 unit controls mid-correction; they stay off while the correction shows.
- p3.2 miss line: FIXED. "Count the squares in both rows." / hi "दोनों पंक्तियों के वर्ग गिनो।" / gu "બંને પંક્તિના ચોરસ ગણો." all show (real flow), no stale English.
[should-fix] phase 3, edge-ring correction (answer 22 on 9x4; real flow, en): the lit inside block and then the lit rows are amber laid over the violet tiles and read muddy tan-brown, sampled (184,130,86) hue 27, against the shelf's clean amber (240,197,102). This is the same defect 1.20 found in P4 (fixed there at 0.85), not carried to the P3 correction. Fix: draw the lit amber at about 0.85 or on paper-coloured cells, keep the dark outline and the running 9/18/27/36. (Reduced-motion/settled frames never show it, by design, so the pack cannot.)
[question, low] p2 end, en/hi/gu: the stamp card shows a 6-cell ghost row across its top and a violet 72 px unit square top-left, while the dashed stamp is only about 2 squares wide, so the row reads as covering the card, not the stamp. Intended?
[question, low] p2 win/end after the child tapped a unit in the real flow: the tapped 1 cm shelf square stays amber through the win and the phase end ("being worked on" colour with nothing being worked on); the pack's no-tap frames are all violet. Also after a miss on a tapped cm, the shelf shows two amber squares (1 cm tapped, 1 m correction).
[question, low] unchanged cosmetic orphans: p3 stepwrong hi "है।" and gu "છે." alone on line 2 (no clip).
New defects from the moved layout: none. Checked: shelf labels inside tiles in hi/gu, p3 row counts clear of the open pad, 13x3 strip (52 px cells, dark outlines, counts 13/26/39) clear of the pad, hi/gu Area labels clear, nothing under the Answer key's corner.
clean: p2 open/ask-open/wrong/win en/hi/gu (shelf, ring off with pad open, amber 1 m on a miss, Next/Next phase keys fit); p3 step1/stepwrong (Lay a row ring one invite, hints readable); p3 wrong (36 cells outlined, counts 40 px dark); no English left on screen in hi/gu.
unchanged since round 1: none (all 33 listed as changed). Frames not looked at: chunks 1 and 3 (phase 1, phase 4, start, summary, free, party). My play-vr172-*.png files are deleted; pack PNGs left in place.
