STATUS: fixes-needed (re-play of my findings: 8 of 9 CLEAN, 1 new should-fix, 1 question; no edits made)
SLOTS: M1.S2.T4.C17.2D1 Time Converter, phase 3 (mouse and touch, en/hi/gu, keyboard, classroom)
FILES: none edited; screenshots work/indiannica_eng_maths3_ch10/M1.S2.T4.C17.2D1/play-rp-*.png
CHECKS: about 25 playkit runs after the fix; console errors none (no negative-width rect seen; nothing new triggers it)
FAILURES:
[should-fix] Q3 (2:15 to 4:45 p.m., poles 180 px apart) in hi and gu - the start label and the end label share one row and OVERPRINT (hi "2:15 अपरा4:45 अपराह्न", boxes overlap 43 px; gu 33 px), from the question's opening to the win; en only butts (gap ~5 px). New with the one-row flag labels. Should: shorter labels or two rows when the poles are close. Repro: play phase 3, realFlowTo Q3 (lang hi), look at the row y=156. play-rp-q3-win-hi.png, play-rp-q3-win-gu.png
[question] warm-up step 0 and step 1 - drag the bar short of the flag (12:30), past it (4 p.m.), or drag it while Add is awaited - still NO hint (sampled 100 ms for 1.8 s, mouse and touch, motion on and off); the builder's note says overshoot is covered, but "Slide the handle to the flag." shows only after a wrong tap (tap the dimmed Answer key). The instruction says "to the flag", so low risk. Acceptable? play-rp-step1-bar-drag-mouse.png
CLEAN (1) Q2 win: ONE decomposition (hour blocks 1, 2 + minutes block; lines "10:30+2 h=12:30", "12:30+45 min=1:15"), no overprint (box test empty) in en (mouse, touch), hi (touch), gu (mouse). play-rp-q2-win-en-mouse.png
CLEAN (2) Q2 Enter, Space, click, finger tap, 3 px wobble on the handle with nothing moved: end stays 10:30, tries 0 (mouse and touch); arrow keys step 15 min both ways.
CLEAN (3) Q2 after a miss at 10:45: two Enters 50 ms apart, the Enter key click during the correction, then Enter and a click after it with the bar not moved: tries stay 1; moving to 11:15 then Enter judges (tries 2); 1:15 p.m. wins (mouse and touch). play-rp-q2-miss-settled-mouse.png
CLEAN (4) nudge: touch the handle short (11:00) or past the flag (2:00 p.m.) - Answer dims and the bubble says "Not at the flag yet: slide the handle to it." (hi and gu translated), the Hint key keeps it, the question comes back when laid; a repeat of the act does not re-lock. First drag after an untouched miss at Q3 (pad open) lands (end 1005), mouse, touch, en, hi, gu. play-rp-q1-nudge-short-en-mouse.png
CLEAN (5) win lines hold 8.5 s (Q1, 5 lines), 6.0 s (Q2, 2 lines), 7.0 s (Q3 closing, 4 lines; the first 2.2 s under the party) before the next question or summary - readable. Q3's own sentence still does not show (the closing replaces it at once; the working lines "2 h+30 min / =2 h 30 min" do show) - runtime, as the builder said.
CLEAN (6) hint ladder runs weakest to strongest at Q1 (before and after noon, hours and minutes, carry), Q2 and Q3; always drawn; a miss never shows a weaker line.
CLEAN (7) hi and gu working lines at Q1, Q2, Q3 fit (no overlap), no English left; answers judged the same.
(8) no `<rect>` error in any run. (9) nothing new broken: keyboard-only walk of the whole phase to the summary (Tab, arrows, Enter, Space, Add, digits), restart mid-traceback then a full replay, classroom (steps wait for the act, a tap on an open question does nothing, teacher skip at a win), free play bar ends by mouse and touch, double Enter and held Enter.
DECISIONS: none
RISKS: the picture is left-aligned with the keypad shut (builder's note); the right half of the board is empty
ESCALATE: no
