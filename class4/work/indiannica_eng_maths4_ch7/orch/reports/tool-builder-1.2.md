STATUS: ok
SLOTS: M2.S3.T5.C20.2D1 (Same Amount Bench), round-4 audit + finish
FILES: class4/work/indiannica_eng_maths4_ch7/M2.S3.T5.C20.2D1/tool.tsx (P1_ROW/P1_H/label size, P4 Q3 miss + its hi/gu TR key)
CHECKS: quick 30/0/0; full #1 94/0/1 (board-fit from my first P1 resize), full #2 95/0/0 + 3 info, tr-coverage pass, ported, status fresh. 2 of 4 full checks used.
FAILURES: none open
DECISIONS: the killed builder had already applied 12 of 14 (its own 17:43 check was fresh on that source); item 7 was partial, item 12 half done.
1 already: verdict keys 150x72 at x706, "Yes"/"No" via tx (TR hi+gu), BlinkRing on both until a pick, Enter key blinks via answerReady(!!S.sel).
2 already: hi/gu key text baseline y 20 (en 14). 3 already: P2/P3 closings 62 / 64 chars, TR keys match. 4 already: boxAt 0.78 / 0.22.
5 already: light straight pairs are two stacked rows (pitch 62). 6 already: P1 part numbers 40, free-play labels 32, P4 strip fractions 44 (P3 stays 40 for room).
7 APPLIED (partial): P1_ROW [104,220,336] -> [100,218,336], P1_H 100 -> 104, P1 label size 60 -> 64, part numbers 40. Strips ~104 not ~110: row-0 ring must stay under the choice keys' bottom (y 195, board-fit) and the final tag under 520; first try [88,210,332]/106 failed board-fit.
8 already: gu verdict 48 (pitch 72), hi 44 (pitch 66 = 1.5 em). 9 already: "last strip" / "none" (TR); x and divide keys pitch 92 so the ring stands >= 11 px off the divide key; multiples-row strips cutsOn all-or-none.
10 already: busy.current guard in setTop, by-less, by-more.
11 already; probe P3 Q1: after naming x4 typed = "20|", caret in the lower box, "24" -> "20|24", one Enter wins; Enter with the lower box empty is a silent runtime no-op (unchanged).
12 APPLIED: P4 Q3 miss "Draw both lines, then compare the two products digit by digit." -> "Tap each upper number for its line, then compare the products digit by digit." (77 chars), TR key renamed hi + gu in the same edit; Q1 and Q2 already said tap.
13 already; probe: toolApi.answer("yes") + check() in one tick commits, no console errors. 14 already; probe: click verdict-yes + two Enters inside 300 ms did not commit, an Enter 600 ms later did.
RISKS: hi/gu Q3 hint not looked at by eye (hint-lines-clear and fit rows pass); P1 labels 64 sit ~10 units apart in the 3-strip question.
ESCALATE: none; no runtime gap found. Probe scripts and my one contact sheet deleted.
