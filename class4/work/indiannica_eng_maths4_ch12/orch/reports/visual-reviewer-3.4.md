STATUS: ISSUES
SLOTS: M2.S3.T6.C28.2D1
FILES: none changed (report only)
CHECKS: 30 frames opened full size
FAILURES: 1 must-fix (p4 59/60 overlap), 3 should-fix
DECISIONS: 5 questions listed
RISKS: carry/borrow picture missing in p2/p3/p4 end frames
ESCALATE: no
visual-reviewer-3.4 | class 4 ch 12 | M2.S3.T6.C28.2D1 Time Columns | chunk 1/1, 30 frames (p1 wrong, p2/p3/p4 wrong+win+end, en/hi/gu), each opened at full size; plus 1 extra (p2-stepwrong-en) and 3 zoom crops (deleted).
Verdict: ISSUES (1 must-fix, 3 should-fix, 5 questions)
(1) 60-minute explanation: CLEAR in wrong and win. p2 reads "48 + 37 = 85 minutes = 1 hour 25 minutes" over "6 + 2 + 1 = 9 hours" (berry +1); the carried 1 sits in the Hours circle; win adds the blue 60-cell block "60 min = 1 h". Bubble hint is generic ("60 minutes make 1 hour, so minutes past 60 go over to the hours"), no numbers, so no giveaway. The rows use the question's own pair, which is right for a correction after a miss. p3/p4 rows ("1 hour = 60 minutes / 8 hours 25 minutes = 7 hours 85 minutes"; "6 hours = 5 hours 59 minutes 60 seconds") are correct and follow the picture.
[must-fix] p4-wrong-en/hi/gu, p4-win-en/hi/gu - Minutes column, the struck "60" and the "59" above it overlap (the 59's feet sit on the 60's head, ~8 px), and the 59 is ~6 px under the Minutes heading chip. It is the borrow chain the child must read. Fix: raise the 59 (one digit height + gap above the 60) or lower the strike row, and give the heading chip 12+ px.
[should-fix] p2-end-en/hi/gu, p3-end-en/hi/gu, p4-end-en/hi/gu - at the last question's closing state the carry picture is gone: p2-end has an EMPTY carry circle and an empty "60 cells" grid beside minutes sum "0 1" while the row says "= 1 minute 23 seconds" (the 1 minute appears from nowhere); p3-end/p4-end show no strike, no 11/65 or 59/60, an empty grid, yet the rows narrate "11 minutes 65 seconds" / "2 hours 59 minutes 60 seconds". Q1's win frames draw all of it. The explanation cannot be followed visually in the state the class sees last. Fix: keep the carried 1 / borrow marks (and a filled grid) in the end state, or, if the last question is meant to be typed with no act, say so and draw them from the rows.
[should-fix] p2-win-hi/gu, p3-win-hi/gu, p4-win-hi/gu, p2-end-hi, p3-end-hi, p4-end-hi, p2-end-gu, p3-end-gu, p4-end-gu - the grid caption ("60 मि. = 1 घं.", "60 डिब्बे", "1 ક. = 60 મિ.", "60 ચોરસ") sits 3-5 px above the first row of cells and its hooks/matras touch the cells (English has ~20 px). Fix: lift the caption ~10 px or push the grid down ~10 px in hi/gu.
[should-fix, small] all frames with the rows box (p2-p4 en/hi/gu) - box bottom edge at y 198, column heading chips start at 204: 6 px. Give 10+ px (rows box up 4 px, or chips down).
[question] p3-win, p4-win, p3-end, p4-end (en/hi/gu) - a brown Check key stays under the grid beside the live Next / Next phase / Summary key. Is Check meant to stay after the win? Two keys read as two things to press.
[question] No frame of the changed set shows a HINT with a different pair. The educator's wish (hint with another pair, not the answer) is met only by the step frame p2-stepwrong-en (1 h 40 + 2 h 35, Carry key), which was not in this set, and by the generic bubble hint in p2-wrong. If the owner expects a worked 48 + 37 style hint on the Hint key, p2 has no hintkey frame (only p1-hintkey exists) - please confirm which state carries it.
[question] Gujarati p2: title "સાઠ કે વધુ પર વદી" and p2-end bubble "...1 વદી જાય" - "વદી" for carry is not a term I know from school books ("હાથ પર / હાથનો"?). Native check. Hindi "हासिल" and gu "ઉછીના" (borrow) read right.
[question] hi/gu caption abbreviations ("मि.", "घं.", "से."; "ક.", "મિ.", "સે.") are the only abbreviated words on screen, while the rows write full words; a 9-year-old may stumble on single-letter "ક.". Fine in English (h, min, s). Spell out if the caption has room.
[nit] p3-wrong-hi bubble breaks "1 घंटा / = 60 मिनट लो।" (an "=" opens line 2); same shape in p4-wrong-hi/gu. Readable; keep if a rewrite is costly.
(2) No text under 12 px (rows ~35 px digits, captions ~30 px); no collision except the 59/60 above; no wrapped/clipped label; no English left in any hi/gu frame (keys, headings, captions, rows, Check/Next all translated); Devanagari and Gujarati matras clear in the rows box (zoomed on p2-wrong/win-hi).
(3) Rows stay inside: box x 80-960, y 108-198; open keypad starts at 980 (20 clear), key corner starts at 1254 (clear), the grid and Check never reach it.
(4) No leftover hand, shadow or gap in any of the 30 frames.
(5) Back row: row text ~35 px bold, berry/ink contrast good, readable; the 60-block caption is the weakest (hi/gu crowding above).
Seen clean: p1-wrong-en/hi/gu, p2-wrong-en/hi/gu, p2-win-en, p3-wrong-en/hi/gu, p3-win-en (all subject to the box-to-chip nit).
Not looked at (not changed): ask, step, hintkey, party, summary, free frames - unchanged since the previous round.
