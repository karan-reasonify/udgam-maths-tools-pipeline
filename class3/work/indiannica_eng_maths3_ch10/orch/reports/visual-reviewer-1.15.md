STATUS: fixes-needed
SLOTS: M1.S2.T5.C22.2D1 (Write the Date), Gujarati CONFIRM-ONLY look (supersedes my round-1 report)
FILES: none
CHECKS: viewed 24 of the changed gu pack frames at full size (p1 step1/stepwrong/ask-shut/wrong/win/hintkey/end, p2 step1/stepwrong/ask-shut/ask-open/wrong/win/end, p3 step1/stepwrong/ask-shut/ask-open/wrong/win/end/summary/free); start, p1-party, p3-party are unchanged (same hashes), p1-again is sameAs p1-step1. pack errors: none (p3-free-gu now exists)
FAILURES: 0 MUST-FIX. Round-1 fixes confirmed: labels clear of the boxes and the ring; "મહિનાનું નામ" placeholder; emptied right box shows "સાચું" under the tick; no date split across bubble lines; no orphan line (free play is two lines, 44 size); "અંકોમાં" in the p3 step; ladder names larger; 2 regressions below, both small
REGRESSION 1 (should-fix): p3-summary-gu, third thumbnail: the DD-MM-YYYY boxes (05 | 03 | 2016) are wider than their rounded thumbnail card and poke out about 7 px on the left and right (frame x 1290-1525, boxes x 1283-1533), hiding the card's top and bottom edges -> shrink the three boxes and dashes to fit inside the card (thumbs 1 and 2, "8 ડિસેમ્બર / 2022" and "25 નવેમ્બર / 2018", fit but sit within ~4 px of the card edges)
REGRESSION 2 (minor): p2-wrong-gu and p3-wrong-gu: the note pill ("પહેલાં દિવસ, છેલ્લે વર્ષ" / "પહેલાં દિવસ, પછી મહિનો") is now shorter (about 43 px) and the tops of the text (the ે and િ marks) touch its upper border, not seen in round 1 -> add 4-6 px of pill height or lower the text 3 px
DECISIONS: none
RISKS: none beyond the two above; free-play pad still has the blank band where Close would be (round-1 item, not a regression)
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/visual-reviewer-1.15.md
