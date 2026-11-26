STATUS: fixes-needed
SLOTS: M2.S3.T7.C31.2D1 (changed chunk 4: phase 4, summary, free play; 24 frames)
FILES: none edited (report-only)
VISUAL RE-LOOK, C31 Part Squares, vs visual-reviewer-1.22 and tool-builder-1.39. Verdict: ISSUES (0 must-fix, 3 should-fix, 2 questions, 3 nits).
Looked at: all 24 changed frames at 1600x900 (en/hi/gu x open, ask-shut, ask-open, wrong, win, end, summary, free), plus 2-3x crops of the hand board, stone board, tally card, badges and summary thumbs (scratch, deleted). Party frames not in this chunk (not changed).
fixed: summary thumbnails (each phase's own traced shape + squares, no words, same in hi/gu); free-play "Half pairs"/H clash (free play now has an H "Half" row, no pairs row; arch icon only where pairs are counted); gu Left-out badge ઓ (chip 46 wide, glyph clear of the border by ~3 px); hand photo mirrored (tan thumb now inside the traced thumb bump, left side); hi "वर्ग सेमी" has its space; P4 sum + estimate raised to 32; counted squares violet (hue 255-256) with rose M, paler rose H, warm-white L.
partly fixed: L/M/H letters vs the outline (white halo added to L, but contact remains, see S1); free-play spacing (grid-to-tally gap 13 -> 22 px; right 440 px beside the tally still empty, by design for the pad); hi "लगभग" still ~5 px from its input box (nit).
should-fix
S1 p4-open/ask-shut/ask-open/wrong/win (hand board), en+hi+gu: letters still touch or sit on the black outline (rule 1, want >= 12 px). Worst: the thumb-tip L (x 228, y 363) sits ON the thumb loop; the M at the thumb row (x 295, y 372) has the outline ending inside its halo; bottom-right L (x 517, y 593) touches the outline's end; the four bottom-row H halos overlap the bottom outline (y ~575-585); gu right-column ઓ and top-left ઓ touch the outline. Fix: nudge those letters 12+ px off the line (thumb L outward/left, bottom-row H up, bottom-right L down-right), or drop the outline under the label layer.
S2 p4-end/win (stone board), en+hi+gu: same fault, new on this board (earlier "clean"): H at (173,332) cut by the outline, H at (627,408) swallows the outline's end, H at (478,550) and (322,540) on the bottom outline, H at (478,182) under the top-right outline; the same positions in आ and અ. Fix as S1 (move H to the part's centre away from the line).
S3 p4-wrong-hi (and win/end hi): "अनुमान" sits ~3-4 px under the "21 + 9 + 3 = 33" row (shirorekha almost touches the digits) after the 32 px raise; en/gu clear (~8-10 px). Fix: add 8-10 px line gap in hi or drop that row to 30.
question
Q1 p4 all frames: sampled violet tile = (172,152,229), hue 255, saturation 0.33-0.34, below rule 3's >= 0.4. It reads lavender-violet by eye and is the unit colour on both boards. Should the overlay go to ~0.95 (about sat 0.42), or is 0.34 accepted?
Q2 p4-free en/hi/gu: Answer key is dimmed and dead beside "Free play" (not re-raised: first-touch gate/runtime on the KEEP list).
nit: hi win/summary and gu win/summary/open bubbles still leave one word on line 2 (है।, સીખા, છે.), cosmetic and told not fixed; hi "लगभग" 5 px from its box.
clean: ask/wrong/win/end bubbles in en/hi/gu (two lines, no matra touching, no English left); Kiko thinking, no puff; Pair/Answer gate looks (flat, then berry); correction ends on the whole answer 33; nothing red or crossed; summary rows, stars, Free play berry and Play again butter; tally rows one line and >= 32; grid, tally and Pair keep one size and place shut/open.
unchanged since round k: party frames (not in this chunk).
Not judged: translation quality (hi/gu).
