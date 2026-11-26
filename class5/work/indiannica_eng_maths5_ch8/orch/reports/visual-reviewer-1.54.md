STATUS: fixes-needed (1 should-fix, minor)
SLOTS: M1.S1.T2.C6.2D1
FILES: none (report-only)
CHECKS: re-look chunk 4 (27 changed frames + 3 party frames, en/hi/gu, full size) + 2 real-input playkit probes of phase 4 Q3
FAILURES: 0 must-fix, 1 should-fix, 2 questions
DECISIONS: none
RISKS: none
ESCALATE: no
VISUAL RE-LOOK, C6 Edge Walker, CHUNK 4 (phase 4, summary, free play), en+hi+gu. Verdict: ISSUES (0 must-fix, 1 should-fix, 2 questions). Earlier report: visual-reviewer-1.16; builder fix report: tool-builder-1.37.
Frames: all 27 changed (p4 step1, stepwrong, ask-shut, ask-open, wrong, win, end, summary, free x en/hi/gu) + p4-party x3 (never compared), at full 1600x900; pixel scans of chip-to-boundary gaps; probes below. No sameAs/carried frames.
FIXED (1.16 -> now): hi chip matras: FIXED (p4-*-hi: pills taller, matras and nukta inside, 5-8 px under the border, gu clear). Summary thumbnails: FIXED (number 15+ px clear of the shape in en/hi/gu, nothing on the outline). Bottom Length chip on the Sum strip: FIXED (chip bottom 12 above paper edge, strip 12 below it; top chip 12 below the paper top). 502 question: FIXED, proven by real input (below). Boundary label: FIXED (lit loop carries Boundary / सीमा / સીમા in wrong, win, end, party; clear of the chips). Free play: ant at the corner, 3-4-5 labels clear, no leftover English.
PROBE (en, real keys): straight walk Q1 46, Q2 70, Q3: tap Write in cm -> "1 m = 100 cm" chip, Breadth turns 100 cm -> tap Two lots -> Answer live -> 700 wins and the strip reads "2 x (250 + 100) = 700 cm" with "250 + 100 + 250 + 100 = 700 cm" (play frame, pencil settled). Jump route (gotoStep(11), Answer live, no act): 700 accepted, Breadth already 100 cm, same 700 strip (not 502). Typing 700 on the straight walk before the two acts is refused ("Tap Write in cm first." / "Tap Two lots first."), tries 0. t.errors() empty in both.
Pack: p4-end-*/p4-party-* now draw 2 x (250 + 100) = 700 cm in all three languages (they drew 502 in round 1).
SHOULD-FIX
[should-fix] phase 4, wrong/win/end/party, en/hi/gu (p4-win-en, p4-wrong-hi, p4-end-gu ...) - once the boundary is lit, the two Breadth chips sit only 6-8 px from its thick vermilion edge (scan: chip edge 580 vs boundary 587 en, 595 vs 602 hi/gu in the cm frames; 600 vs 608 in the m win) while the unlit ask frames keep 12; rule 1 wants 12 clear - widen the side margin by about 6 px or draw the lit stroke inward, so the chips clear it by 12 px in the longest language (hi/gu, cm).
QUESTIONS
[question] phase 4, step1/ask/wrong, en/hi/gu - after the margin fit the figure is small: the 8x6 square is about 270x200 inside an 820x350 paper (paper still a third of the working area, picture-scale passes, builder disclosed 10-15% smaller). Rule 5 asked for larger; is this smaller figure accepted, or may the chips tuck closer to give the figure back its size?
[question] phase 4, ask-shut/ask-open, all langs - the paper still jumps 286 px left when the pad opens (kept by rule 6 as designed); no change, listed only so it is not read as new.
Unchanged since round 1 (not re-raised, KEEP list/runtime): hi summary row pitch (title matras touch the learned line in rows 2-4, p4-summary-hi), dim Answer key in free play, emptied slot after a miss, first-touch pack over-statement, orphan word on line 2 of the hi/gu stepwrong bubble (cosmetic).
CLEAN: p4-step1 and stepwrong (one invite ring on Two lots, Kiko standing, hint fits in all three), ask-shut/ask-open (Kiko thinking, no puff, keyOnly, empty strip = no giveaway, neutral slot with label and unit), wrong (nothing red, correction ends 2 x (15 + 8) = 2 x 23 = 46 m, hint clear of Kiko and bubble edge in hi/gu), win/end keys berry (Next, Summary), summary (Well done, 4 real thumbnails 35/320/48/700, stars 8/12, Free play berry, Play again butter), party (Kiko cheers, sparkles clear of bubble and pills, cones beside the bubble and above the pills, confetti inside the stage), header's three owner pictures intact, no English left in hi/gu.
Temp files: my play-vr154-*.png in the slot folder and my scratchpad probes were deleted.
