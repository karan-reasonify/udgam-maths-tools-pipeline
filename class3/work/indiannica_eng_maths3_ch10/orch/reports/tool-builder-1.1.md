STATUS: ok (built, full check green, ported; design pass, language pass and reviewers not run, as briefed)
SLOTS: M1.S1.T2.C6.2D1 Read the Clock (class 3 ch 10, runtime r3 silent)
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S1.T2.C6.2D1/tool.tsx (only file edited) · preview M1.S1.T2.C6.2D1.preview.html · ported pair class3/output-preview/indiannica_eng_maths3_ch10/M1.S1.T2.C6.2D1/M1.S1.T2.C6.2D1.tsx + .json
CHECKS: full check 94 pass, 0 warn, 0 fail, 6 info (4 full runs: one wrong-is-unmarked fix, one next-key timeout under load (render 390 s) that passed on re-run, one keyboard fix). Quick check 30/0/0. Playkit probes: the gate, drag-set, pick, keyboard-only.
FAILURES: none open.
DECISIONS:
- FAMILY COLOUR (relay to Morning or Night + Time Converter NOW): pure vermilion #E34234 (hue 5) FAILS wrong-is-unmarked (red band <= hue 15; a hand stays on screen after a miss). Hour hand #E5531A (hue 17); minute #1F4E9C; past/a.m. #5BB8E8; to/p.m. #F2A531; reached #2E9E5B.
- 3 phases (4th deleted), concept ids C6/C7/C8; phase 3 objectiveIds = union ["O2"].
- P1 Two hands: steps drag (or tap) the short hand, then the long hand, and each lights its own digital box. Q1 reads the hour (2:00), Q2 sets 5:20 by turning the short hand, Q3 taps the hand that tells the hour.
- P2 Five minutes: steps tap Step 3 times (each gap lights with a 5). Q1 steps 5 to 8 (15), Q2 steps 12 to 7 (35), Q3 Round once round (60); the hour hand creeps one number.
- P3 = plan 3+4 folded: steps tap Past and to, then send the long hand to 3/6/9 (quarter past, half past, quarter to on the words card). Q1 reads 4:10 (hours|minutes boxes), Q2 minutes to with the hand on 8 (20), Q3 sets quarter to 8 by dragging both hands, judged on the berry Enter key (answerReady).
- Gate: P2 Q1-Q3 gated by Step/Round (api.lock after a real touch). P1Q2/P1Q3/P3Q3 are answered by the act itself; Enter does nothing until a hand moves. P1Q1/P3Q1/P3Q2 are ungated reads.
- Traceback (miss hides the answer): the mixed-up hand glows and lights its digital box; the side is coloured past/to; fives are counted from or back to the 12, stopping one five short. The child's hands never move.
- Readouts follow the hands (drag included) in steps, set/pick questions and free play. On read/count questions the digital clock shows "?" until the win (data-reveals), and the words card shows "?" on every question: the giveaway rule wins over "always in sync".
- Departures: plan times kept on qid'd questions. RC3 football and C8:3 railway became the bus stop (the slot's bus picture). C6:5 is answered by tapping the hand; C6:1 is a set question. Authored: P2Q3 (60), P3Q3 (quarter to 8). Unused: C7:8, C8:6, all C9 ids.
- Views Plain/Minutes/Past and to in P3 + free play; Minutes is disabled on read questions. Bus/pot props only while the keypad is shut (left of the clock); backpack in P1. Keyboard: Space turns a hand, Enter answers.
RISKS:
- Sidecar guide.answerGate is NOT written: port.mjs builds guide without the field; only a hand edit of the .json could add it (not done).
- Half past and quarter past appear in the P3 steps only, in no question.
- Language pass: rcWords (words card) is built at run time and needs hi/gu templates. The 9 item win lines (api.say(it.win)) are data-borne, so add them to TR by hand. Work words: hours, minutes, Past, To, Step, Round, Plain, Minutes, Past and to, 1 hour.
- The disabled Minutes key on read questions is drawn flat and nearly invisible (the runtime's disabled look).
- Owner question: are the "?" covers on the digital clock and words card during questions acceptable, or should a read question hide only the box it asks for? Runtime gaps: none.
ESCALATE: no
