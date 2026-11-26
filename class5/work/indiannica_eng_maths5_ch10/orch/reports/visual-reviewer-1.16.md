STATUS: fixes-needed (6 must-fix, 7 should-fix, 3 questions) · HINDI frames only
SLOTS: M2.S4.T7.C25.2D1 Time Line Jumper (class 5 ch 10, r66 silent)
FILES: none edited; zoom crops made in scratchpad and deleted; pack not rebuilt
CHECKS: all 34 hi frames of pack.json viewed at 1600x900 (p1-again-hi skipped, sameAs); ink connected-component test on card labels; en frames used only to compare
FAILURES: see findings below
DECISIONS: none
RISKS: fixing the card label collision by making the card taller worsens the card/key-ring overlap; take the room from inside the card
ESCALATE: no
VISUAL REVIEW (HINDI ONLY) M2.S4.T7.C25.2D1 Time Line Jumper, r66 silent. Verdict: ISSUES (no English words left on screen; digits only).
[must-fix] p1-step1, hi (and every Start card: p1-stepwrong/ask-shut/ask-open/wrong/win/hintkey/end, p2-*, p3-win, p4-*, p4-free): the card label's tail (शुरू) is fused with the time row's ink (connected-component test: one blob). Same for ठीक मिलाई, धीमी घड़ी, सही समय in p3-end. अंत is clear. Fix: more air between label row and time row.
[must-fix] p3-end, hi: the four amber "3 मिनट" pills on the bar have text edge to edge, 0-1 px from the outline (the 3 and the ट touch it). Widen the pills to the word + 24.
[must-fix] p4-free, hi: the key "छलाँग 10 मिनट" runs past both edges of its key (छ at the left edge, ट cut at the right); "पीछे 10 मिनट" is only ~9 px clear. Widen/refit the four keys.
[must-fix] p4-wrong, hi: the legend row (पूर्वाह्न अपराह्न) sits on the working line "1 घंटे 40 मिनट + ..." and the matras touch (English has clearance). Move the line down or the legend up.
[must-fix] jump key ring overlaps the card above: the Hindi card is taller than English, so its bottom edge (y 545) crosses the ring's top (y 541). Frames: p2-ask-shut, p2-ask-open, p3-step1, p3-stepwrong, p3-ask-open, p4-step1, p4-stepwrong, p4-ask-open (3 px gap only in p4-free). English ends ~8 px above the ring. NOTE: fixing the label collision above by making the card taller makes this worse; the room must come from inside the card or by moving the key.
[must-fix] p1-ask-open, p1-wrong, p4-ask-open, p4-wrong, hi: the slot says घंटे twice (label top-left + unit) and मिनट twice (English reads hours/h, minutes/min). Use a short unit (e.g. घं / मि.) or drop the unit.
[should-fix] p4-summary vs p4-free, hi: summary key says "मुक्त खेल" (runtime chrome), the free-play bubble says "खुला खेल:". Make the TR free-play line use मुक्त खेल.
[should-fix] p4-summary, hi (also en): the four thumbs have the purple arc struck through the time text; "3:15 पूर्वाह्न" is printed over the "अगला दिन" bar. Summary rows are legible and not wrapped.
[should-fix] p3-wrong, hi (also en): the dashed green arc crosses the "25 मिनट" pill text; p3-win the arc grazes the pill's corner.
[should-fix] p3-wrong, hi: "तुम्हारा उत्तर" box is 3 px under the End card (English 15 px). Text inside it is clear.
[should-fix] p2-step1, p2-stepwrong, hi: the "दोपहर" pill at the bar's right end sticks ~16 px out past the bar (English "noon" fits inside).
[should-fix] p1-ask-open, p1-wrong, hi: the hour label "11" is dropped beside the wider "दोपहर" pill (English keeps 11). (p4-ask-open drops 11 and 1 in English too.)
[should-fix] bubble breaks a time or a length across lines (builder said they are kept together): "1:35 | अपराह्न" p1-ask-shut; "11 घंटे | 40 मिनट" p1-hintkey; "9:50 | अपराह्न" p3-ask-shut/open; "2 घंटे | 25 मिनट" p3-win; "4:35 | पूर्वाह्न" p4-ask-shut/open; "4 घंटे | 35 मिनट" p4-win. Needs a no-break join in TR or the runtime wrap (known gap).
[should-fix] orphan last words in the bubble (known gap, listed): "सकते हो।" p1-end, p1-party; "खत्म होगा?" p2-ask-shut/open; "है।" alone p3-stepwrong; "लंबी है?" p4-ask-shut/open; "खत्म होती है।" p4-end, p4-party; "सीखा।" p4-summary (runtime string).
[question] a.m./p.m. is पूर्वाह्न/अपराह्न on cards and chips but "सुबह के समय" in the p1-hintkey bubble: one term?
[question] "1 घंटा" in bubbles (p1-hintkey, p4-win) vs "1 घंटे" on pills and keys (p2-wrong, p2-step1, p4-wrong, p4-win): which is right for 1?
[question] कुंजी (key) in p2/p3/p4 stepwrong hints vs बटन; "ठीक मिलाई" (p3-end card for the set clock); "दोपहर 12 के बाद" label. Native check please.
Clean in hi: no clipped bubble or key (3-line bubbles fit, matras clear of outline); header, start page, step-1 bubbles, party frames (cheer pose, poppers beside bubble and clear of pills), keypad/Answer/Next/Summary keys, toggle chips, jump pills "1 घंटे"/"55 मिनट" (matra ~6 px from outline, borderline), Answer key flat in guide steps. Seconds unit "से": not in this tool. Working lines never wrap.
Not in the pack: the phase-3 slow-clock ask/wrong state (only p3-end shows the slow clock); consider an extra frame.
Looked at: all 34 hi frames of pack.json (start, p1 8, p2 7, p3 7, p4 10 incl. summary+free, p1+p4 party); p1-again-hi skipped (sameAs). en frames used only to compare (p1/p2/p3/p4 wrong, p4-summary, p4-ask-open). Pack not rebuilt; zoom crops were deleted.
