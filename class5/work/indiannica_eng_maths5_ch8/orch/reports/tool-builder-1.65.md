STATUS: ok (full check 98 pass 0 warn 0 fail, ported; 1 full run, C4_CHROME_POOL=1)
SLOTS: M1.S1.T2.C6.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T2.C6.2D1/tool.tsx
ESCALATE: no
C6 last fix (C6-last-small.md items 1-2 only). keepFocus() now refocuses only the next ACT key (walk/cm/lots/shape), never a side tag target. When no act key is left (after the last act, or after a wrong tag), it blurs anything focused in the board, so the next Enter answers.
1 MUST FIXED, P3 Q2 (goto 7), real input: Tab to the long side + Enter, then Enter = tag stays "s1", ONE act, win with tries 0; focus BODY after the tag. Same for a mouse or finger tag after a stale Tab focus on side-1.
2 FIXED, P3 Q3 (goto 8; same code as Q1): Tab + Enter on the long side leaves focus on Walk, and the next Enter walks all 4 sides. A mouse or finger tag leaves focus on the page (BODY).
Proven 18/18: keyboard, mouse and finger x en/hi/gu x reduced motion and motion on; 0 console errors. P1/P2/P4 behaviour unchanged (the same act keys).
Note: goto(6) lands on P3's guide steps, not Q1, so Q3 stood in for the shared Q1/Q3 code.
Quick 33/0/0; full 98/0/0 (its sessions cover reduced and real motion). Deleted play-p127-q2-a-men.png and play-p127-q2-b-men.png by name; my scratch is gone.
