STATUS: fixes-needed
SLOTS: M1.S1.T3.C11.2D1
FILES: none (read-only review)
CHECKS: check --no-render 30 pass 0 warn 0 fail 3 info; node recomputation of every time, angle, strip fraction, snap and string length
FAILURES: 0 must-fix, 3 should-fix, 1 question
DECISIONS: all three earlier must-fixes are fixed; owner decisions A to D hold (the miss shows no tick; the time's own place is drawn at the win only)
RISKS: a label tapped during the miss replay is lost (should-fix 3)
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/maths-reviewer-1.4.md
Verdict: ISSUES (small). Re-look findings, exact strings:
[should-fix] phase 3, item 1 (miss "Is the evening before noon, or after noon?" and PHASES[2].ladder[0] "Is the time before or after the noon mark?") - the Hint key runs miss, ladder[0], ladder[1], so rungs 1 and 2 ask the same question in other words - BUILD_CARD: no rung repeats a miss; no near-copy - reword ladder[0] to a new step, e.g. "Say what the sky looks like at that time of day."
[should-fix] phase 3 traceback string (PHASES[2].traceback "...and the time's own place is marked on the strip.") - stale after owner decision A (the place is drawn only at the win) - the sidecar misdescribes the miss - "The sun is carried along the strip from midnight to the noon mark and stops there; the time's own place is drawn only at the win."
[should-fix] phase 3, item 3 (traceback end: "MN_LABEL.v = null;" after tl.run, about line 477) - a label tapped during the 2.7 s replay sets S.label = "eve" (card shows p.m.), then this line nulls MN_LABEL.v and no effect re-runs, so the right answer typed next is marked wrong - the useEffect on S.label already clears it when the replay clears the label - delete that line.
[question] phase 2 closing "12 in the day is noon and 12 at night is midnight: neither takes a.m./p.m." re-says Q2.1's win ("12 in the day ... noon"), Q2.2's win ("midnight ... no a.m./p.m.") and the learned line; the rule is said live twice: accept as the recap, or give the closing a new sentence?
1 CLEAN: Q3.3 first tap (MN_LABEL never reset in fresh(); onClick sets it at once; the effect on [S.label, qk] follows; fresh() has no side effect); Q2.3 chip only while S.rp null and not the win, "noon" inside data-reveals at the win, replay shows 12:00 to 11:00 with no chip; rule said live in Q2.2's win (62 chars, "a.m./p.m." has no ". ") and in the closing (74 chars; learned 61).
2 CLEAN: 1:30 p.m. = 810 min, hour hand 45 deg, minute hand 180 deg, strip 0.5625 L (1.5 cells right of noon), label p.m., judge reads "1|30|eve", nearMiss "1|30|morn" is false; three times 5:40 p.m. (1060), 7:15 a.m. (435), 1:30 p.m. (810) with lamp, bag, lunch box; before the answer the digital time is hidden for the write item, the card is blank, no outline, no marker, no number in any line.
3 CLEAN: the miss carries the sun midnight to noon (12 steps) and the marker vanishes at the end; no tick, ring, outline or dashed line before the win; those are in data-reveals at the win only (the replay never stops at the time itself, so no pointing); useful hint.
4 CLEAN: nearMiss 12, 1, "1|12", "day12", "<time>|<other label>" are all judged false and each matches its traceback; halfOfT "" at 0, 720, 1440; free play and phase 3 magnet 9 min (11:40 to 12:20 settable, except 11:55 and 12:05 which snap to 12:00: fine); P2 steps show the noon/midnight chip and strip words, hidden when Q2.1 opens; wins and rungs carry no early answer.
5 CLEAN: a.m. #5BB8E8 sky blue on the left half, chips, halves labels, thumb and start art; p.m. #F2A531 amber on the right half everywhere; hour hand #E5531A, minute #1F4E9C, reached #2E9E5B; the bubble says "orange" for amber (fine for Class 3).
