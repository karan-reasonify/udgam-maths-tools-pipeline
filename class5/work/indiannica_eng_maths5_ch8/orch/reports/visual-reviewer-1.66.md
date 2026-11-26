STATUS: fixes-needed
SLOTS: M2.S3.T6.C26.2D1 (re-look, chunk 4: phase 4 + summary + free play)
FILES: none (report only)
CHECKS: 27 changed p4-* pack frames + 3 party frames at full size; playkit extras (Q2 five copies, Q2/Q3 ask, Q3 miss in motion, free play cut down/across + Join, en/hi/gu)
FAILURES: 1 must-fix, 5 should-fix, 2 questions (below)
DECISIONS: none
RISKS: hi summary row pitch and the dimmed free-play Answer key are runtime-owned (not re-raised)
ESCALATE: no
REPORT: work/indiannica_eng_maths5_ch8/orch/reports/visual-reviewer-1.66.md
visual-reviewer-1.66 · M2.S3.T6.C26.2D1 "Work Back and Split" · RE-LOOK chunk 4 (phase 4, summary, free play) · en/hi/gu · Verdict: ISSUES (1 must-fix, 5 should-fix, 2 questions)
Frames: all 27 changed p4-* pack frames at full size + p4-party-en/hi/gu (end/win changed). Extras by playkit (own play-vr66-* deleted): Q2 five copies, Q2/Q3 ask, Q3 miss 112 in motion (Not floor), free play Cut down / Cut across + Join in en/hi/gu.
fixed: L box lines now ink 2.4 on every L/piece/free-play frame (1.30 must-fix); hi bottom labels clear of the outline by ~10 px (6 मी, 14 मी, 16 मी); notch labels staggered at 40 px in Q1 (en/hi/gu); en win bubble two clean lines (no lone "m."); en result line two lines "84 + 24 / = 108 sq. m"; the 24/84/80 pills fit their pieces; summary thumbs and Q2 tiles now violet (tile RGB ~ purple, not peach); free-play en/hi/gu bubble pages agree ("Free play." / "मुक्त खेल।" / "મુક્ત રમત."); dashed cut line gone 3.5 s after Join; "Not floor" fits the corner en/hi/gu; party en/hi/gu clean (Kiko cheering, poppers clear).
partly: picture size (1.30 should-fix) — cells 27 -> 28 px, Cut keys now in a column right of the figure as asked, but the L is still ~395 px of the 1520 room (about 12 % of the area): panel shut = right third and the bottom 190 px blank; panel open = fine in width. Q2 tiles 112 -> 160 px: 5 tiles fill ~520 x 335, rest of the area blank.
not fixed (runtime-owned, KEEP rule 6, not re-raised): hi summary rows still touch (p4-summary-hi: bold title descenders on the next "तुमने सीखा" line); Answer key dimmed in free play.
[must-fix] phase 4, free play after Cut down (real click), hi and gu — the 6x6 piece has NO area label: the "36 वर्ग मी" / "36 ચોરસ મી" pill is missing (DOM text holds only "72 वर्ग मी"), en shows "36 sq. m"; the pill apparently drops when it is wider than the piece minus 16; the same piece in Q1/Q2 cut-down corrections will lose it too — keep the pill (two lines, or beside/below the piece) so the part's area is always written.
[should-fix] phase 4, Q3 ask (real goto 11; not in the pack), en/hi/gu — the riser label "2 m" was moved up 32 px above the L's corner, level with the top "9 m" (y 236 vs 240, 87 px apart), so it reads "9 m  2 m" and no longer sits beside its edge — keep it at the riser's mid-height (y ~294) and move the "7 m" tread label right/up to clear it.
[should-fix] phase 4, end/party/Q3 miss correction, en/hi/gu — the "18 sq. m" pill placed beside the 2-row strip sits on the 80-piece's top outline (pill bottom y 320, line y 318) and in hi/gu overhangs the figure's right edge (x 627 vs 566): lift it 12 px or put it in the notch above the tread, clear of the line.
[should-fix] phase 4, wrong/win/end, en/hi/gu — the result line "84 + 24 ..." starts ~4 px under the Cut down key's shadow (key bottom y 308, text top y 312): crowded — drop the line about 16 px.
[should-fix] phase 4, win, gu — "108 ચોરસ / મી છે." breaks the unit across two lines (મી alone on line 2) now that the neutral win line is longer: put a no-break space between ચોરસ and મી (hi "108 वर्ग मी हैं।" is fine).
[question] phase 4, wrong/win/end/free, hi — the bold "वर्ग मी" in the pills and the result line shows only a ~4 px gap between वर्ग and मी at bold weight (reads "वर्गमी" at a glance); intended, or widen the space?
[question] phase 4, summary, all langs — rows 1 (a side, 15 m) and 2 (area, 144 sq. m) are the same violet square and only row 2 carries the amber outline; fine as the "boundary" cue, or drop it?
clean: step1/stepwrong bubbles (one sentence, hint replaces the question) en/hi/gu; ask-open keeps the L's size and place with the pad shut/open; Kiko thinking at ask; summary en/gu rows, stars, keys berry; header discs; wrong/win corrections end on the whole answer with no red.
