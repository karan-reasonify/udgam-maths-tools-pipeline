STATUS: fixes-needed (visual verdict ISSUES: 0 must-fix, 1 should-fix nit, 2 questions carried)
SLOTS: M2.S2.T5.C21.2D1 "Rows Times Squares", changed chunk 1 (phase 1), en/hi/gu
FILES: none edited (report only)
CHECKS: all 24 changed frames at full size (p1 step1, stepwrong, ask-shut, ask-open, wrong, win, hintkey, end x en/hi/gu) + p1-party en/hi/gu (phase end changed) + a real-input probe to the 6x4 (item 2) with 3 and 4 rows laid, en. Pixel samples and an equation-gap measure. Own probe shots and scratch deleted.
FAILURES: none
DECISIONS: none
RISKS: Row chip sits across cell dividers on 9x5 / 6x4 (see should-fix)
ESCALATE: no
REPORT:
fixed (vs visual-reviewer-1.10 and tool-builder-1.40):
- hi chips repha: FIXED. step1-hi "7 वर्ग" repha now ~7 px clear of the chip's top outline; rotated "3/5/4/8 वर्ग" pill ~8 px clear of its left outline (ask-shut-hi, hintkey-hi, end-hi); gu chips clean; "पंक्ति"/"હરોળ" chips fit.
- tile skin colour: FIXED. Sampled: 7x3 step1 #b1a0dc (hue 257, HSL sat 0.46), 6x4 hintkey #b1a0dc, plain 9x5 #b39ddb (hue 261, 0.46). Probe with ALL 4 rows laid on 6x4: #b09ed9 hue 258-260, HSL sat 0.42-0.44, every row the same violet, no rose.
- small picture: FIXED. 7x3 grid now 703x303 (cell 100), 6x4 535x357 (cell 89); about 38 % and 34 % of the 1086x520 room beside the open pad (was ~20 %). Grid centre x=514 and the same size in every frame of a given item; pad shut vs open still same size and place (9x5 ask-shut vs ask-open).
- equation line gap: FIXED. Ink gaps measured on end/wrong/win en/hi/gu: 15, 16, 14, 16 px between all tokens (the 37 px gap before "=" is gone); left edge on the grid's left edge.
- question (Answer key live before first touch): unchanged, KEEP rule 6; not re-raised. question (rotated side label): still rotated, ~38-40 px, fits en/hi/gu; owner's call, still open. question (hi title underline): start page not in the changed list, unchanged since round 1 (builder lists it as runtime, not fixed).
NEW / still open:
[should-fix, nit] phase 1 step1/stepwrong/ask-shut/ask-open/hintkey, en/hi/gu — the "Row"/"पंक्ति"/"હરોળ" chip on the laid bottom row sits across cell dividers (9x5: lines at x=479 and 550 run behind it; 6x4: the centre line at x=514; hi/gu chips are wider, ~140 and ~103 px) and the dividers ghost faintly through the chip behind the glyphs, so two or three squares of the very row the child counts lose part of their outline — make the chip fully opaque white (or keep it off the dividers); 7x3 is fine (chip inside one cell).
clean: all hi/gu bubbles fit (a lone "हैं।"/"છે." on line 3/2 is cosmetic, rule 2, not raised); every grid dark outline on every box; counted rows violet, answer grid green, 9 x 5 = 45 green line with nothing red or crossed after a miss; slot empty after the miss; Rows key ring clear of the "7 squares" chip and of the open keypad (48 px); side pill 14 px clear of the grid edge; row numbers 1-8 readable at the 12x8 end; berry Answer/Next/Next phase keys, dimmed Answer in guide steps; Kiko thinking in ask frames, no puff over the bubble; party en/hi/gu: confetti over the working area only, Kiko cheering (arms up, sparkles clear of the bubble tail), one cone beside the bubble, Answer dimmed; no English word on screen in hi/gu; digits Latin.
unchanged since round 1: start-en/hi/gu, p1-again-* (same pixels as step1).
