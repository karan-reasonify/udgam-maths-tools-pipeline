STATUS: fixes-needed
SLOTS: M1.S2.T5.C22.2D1 (class 3 ch 10, Write the Date, Hindi confirm-only look)
FILES: none (screenshots only: 4x crop in the scratchpad)
CHECKS: read all 25 changed hi pack frames at full size (start; p1 step1, stepwrong, ask-shut, wrong, win, hintkey, end; p2 step1, ask-shut, ask-open, wrong, win, end; p3 step1, stepwrong, ask-shut, ask-open, wrong, win, end, summary, free); p1-party and p3-party unchanged (same), p1-again sameAs p1-step1; 4x crop of the summary thumbnail
FAILURES: 0 must-fix, 1 regression: p3-summary-hi row 3 thumbnail (05-03-2016): the three green boxes (x 1283-1533) are wider than their rounded panel (x 1290-1526) and stick out about 7 px on both sides (4x crop); fix: narrow the three cells or widen the panel so the boxes sit inside it with a margin (rows 1-2, the words thumbnails, fit)
DECISIONS: none
RISKS: none else: labels now clear of the boxes (repha off the outline) in p2/p3, p1 centred, no Hindi line ends in digits plus danda, "सही" in the ticked box, "महीने का नाम" placeholder fits (tight, about 5 px each side), "मुक्त खेल" in the free-play bubble, no clipping, overlap or leftover English in any changed frame
ESCALATE: no
