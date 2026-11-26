STATUS: ISSUES (minor) - 0 must-fix, 1 should-fix, 3 questions, en share
SLOTS: M3.S5.T9.C30.2D1
FILES: none edited (report only)
CHECKS: 35 en frames read at full size + pixel measures; one DOM probe, no images made
FAILURES: none
DECISIONS: main session to decide the chip nudge and the 3 questions
RISKS: live month-card look not in pack
ESCALATE: none
C30 Date Counter, r66 silent, ROUND 2 re-look, ENGLISH share (visual-reviewer-1.31)
Verdict: ISSUES (minor): 0 must-fix, 1 should-fix, 3 questions. No new layout defect; all 9 checklist items hold in en (item 8 is hi/gu, not my share).
Frames looked at (full 1600x900, every en frame is "changed"): start; p1 step1, stepwrong, ask-shut, ask-open, wrong, win, hintkey, end, party; p2 step1, stepwrong, ask-shut, ask-open, wrong, win, end; p3 step1, stepwrong, ask-shut, ask-open, wrong, win, end; p4 step1, stepwrong, ask-shut, ask-open, wrong, win, end, summary, free, party. p1-again-en = sameAs p1-step1, skipped. Numbers below were measured on the PNG pixels. No image files made.
CHECKLIST
1 pill: PARTLY. Text fits inside every pill, centred, nothing clipped. But the spare is not 28 in en: letter-heavy pills carry 54-73 px a side (p4-end "+14 days: 10 November" 62/60, p4-win 57/54, p3-win 60/58, p3-end 73/70, p1-end "Both: 9, 10" 69/69); digit-heavy pills 34-40 (p1-win, p2-win). See Q1.
2 p4-summary: OK. 40-wide icon, text starts 10 px right of it, no text over the icon. "10" over "November" and "Both:" over "9, 10" on two lines, 4-8 px clear of the box. Icons read by kind: two green days (Both), a count run (15 days), one green day (2 July, 10 November).
3 friend cards (p1-end): OK. Title ink starts 16 px below the outline, swatch level with title (211-236 vs 210-236; Friend 2 bar 396-409 vs 388-413), title-to-body 27 px, cards 168 tall, Friend 2 bar 14 px, Friend 1 blue line 8 px on 9 and 10, violet-only on 11.
4 INFO cards: OK in en. Title ink 15 px under the top outline, value ink (p descender of "September" too) 11 px above the bottom outline, in every phase.
5 month names: OK. Before the act they are plain blue titles with dark text in p2/p3/p4 ask frames, same as the guide steps. DOM probe (no image): in p3 no month-N control before Mark, month-1/month-2 (428x77) appear after the act. The look of the live cards is not in the pack (see Q2).
6 count numbers: OK. Violet on the light cells (white on the dark start/end cell), date ink ends y 288, count ink starts y 296 = 8 px, 4-5 px above the cell's bottom outline.
7 p4-free: OK. Gaps 16/16/15/16/15/16, cards 206 outer (204), value digits 21 px tall (28 type), chip 102 outer with "12" over "days". "day" when start = end is in the code (label switches on fs===fe), not in a pack frame.
9 start page: OK. The violet arc lies wholly inside the right mini calendar.
FINDINGS
[should-fix] phase 4, free, en: the middle chip's "days" label is tight at the bottom. The y tail ends 2 px above the chip's inner bottom edge (outline 618-620, ink to 615) while "12" has 8 px at the top. Nudge the label up about 4 px or make the chip 4 px taller; check hi/gu "दिन/દિવસ" in the same chip.
[question] Q1 all phases, win/end, en: pill padding is 34-73 px a side, not the 28 asked. Looks balanced, only loose; if the width is a character-count estimate it over-measures Latin words. Fine to leave if hi/gu come out right.
[question] Q2 phase 3/4 date questions after the act, en: the live month cards (Key, blink ring) are never in the pack, so I did not judge their look. A pack state "ask, act done" would show it.
[question] start, en: the violet jump arc starts about 90 px right of the dark start cell and floats; reads as a decoration, not a jump from the start day. Optional.
UNCHANGED / KNOWN (not rated): summary "You learned" size/spacing, orphan last words ("day." p4-step1, "two." p2-end), two invites before the first touch, p4-party cone vs 4th pill. Party frames (p1, p4) fine: cheering Kiko whole, sparkles clear of bubble and pills, cones at x 255-312 and 1445-1505 clear of the bubble (x 343+).
