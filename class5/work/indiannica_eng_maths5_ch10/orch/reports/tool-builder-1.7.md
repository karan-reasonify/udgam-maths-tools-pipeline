STATUS: ok
SLOTS: M3.S5.T8.C29.2D1
FILES: class5/work/indiannica_eng_maths5_ch10/M3.S5.T8.C29.2D1/tool.tsx (ported)
CHECKS: quick clean; 1 full check (pool 1): 96 pass / 0 warn / 0 fail, ported. playkit P3 Q1 en+hi: short drag -> nudge, question back after 3.5 s; off-column drag -> nudge; 4 jumps -> the question shows (no stale nudge), Answer key line
FAILURES: none
DECISIONS: round 11 S1 applied; no wording change; frames: none
RISKS: none
ESCALATE: none
REPORT: one helper mcSayNudge (marks nudged, starts the max(2.6 s, 68 ms/char) return timer) now used by the window listener and the Jump drag handler; the act-done effect clears the timer and says the question; Hint key after any nudge shows the question. Grep: the drag handler was the only direct api.say of a nudge (other api.say calls: item.say returns, the win line).
