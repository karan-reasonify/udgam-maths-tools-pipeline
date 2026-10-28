STATUS: ok
SLOTS: M1.S2.T4.C17.2D1 (Time Converter)
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S2.T4.C17.2D1/tool.tsx (only), class3/work/indiannica_eng_maths3_ch10/NOTES.md (2 runtime-gap lines); pair ported by the check to output-preview
CHECKS: check --no-render clean; 3 full checks (C4_CHROME_POOL=1), final 95 pass 0 warn 0 fail, ported, host emulator plays all 3 phases; real mouse/touch/key probes of drag, tap, gate, wrong, win, free play with playkit
FAILURES: none (check 1 failed summary-thumbs, one-line-bubble, classroom, text-contrast; all fixed)
DECISIONS: 3 phases, concept ids C17/C18/C19 kept, phase 3 objectiveIds = union of plan 3+4 = ["O6"]; all 9 items authored (qid null): plan TC1 9 h 10 min and 8/10 days need 9+ tile rows and the owner wants new examples
DECISIONS: no running total before the first answer (PREFLIGHT 9): per-row badges and 5..60 tile labels only; live calculation only in warm-up and free play, full working at the win; the correction shows the expression (3 x 60, 2 x 60 + 30) or lit pieces with NO total
DECISIONS: slip-specific hints (joined 330, forgot to convert) cannot be spoken per slip (hint-pinned): each miss/ladder is aimed at the slip and the traceback lights hour rows then minutes on the tiles
DECISIONS: end time (P3 Q2) is set by sliding the bar's end and judged on berry Enter (minutes after midnight, answerReady), not typed: r3 has no colon / a.m. / p.m. keys
DECISIONS: skins: stopwatch (phase 1 + start page) and suitcase (phase 2) over plain fallbacks; train NOT drawn (no ticket card, owner: no decoration); the brief's column board and six-clock race row not built (owner text asks neither)
DECISIONS: summary Thumb is digits only (the hi/gu thumbnail check forbids Latin letters); TR left empty, language pass still to do; sidecar guide.answerGate NOT written (port makes the pair): main session to add it from the gates below
PHASES (what the child does): P1 hours to minutes: drags (or taps) the blue minute hand round a wall clock (hour hand creeps A/12, vermilion; stopwatch), 12 five-minute tiles fill per round; Qs 3 h, 2 h 30 min, 1 h 45 min, types minutes
PHASES: P2 days to hours: drags (or taps) the day wheel's handle (a.m. half sky blue, p.m. amber, noon notch; calendar page, suitcase), 24 hour tiles fill per turn; Qs 3, 4, 5 days, types hours
PHASES: P3 (plan phases 3+4 folded): 6 a.m.-6 p.m. strip, noon centred, snaps to 15 min, mini 24-tile day above; bar splits at noon, two lengths written with a +. Q1 duration across noon (9:30 a.m. to 1:15 p.m., hours/minutes boxes), Q2 end time across noon (start 10:15 a.m. + 3 h 30 min, slide the end, live end-time label), Q3 duration straight (2:15 to 4:45 p.m.). Warm-up: lay bar, then Add
PHASES: free play: Hours / Days / Bar keys; tap the count box to lend the pad (digit 1-4), drag or tap the dial; free bar has both ends draggable with live start, end, pieces and length
GATES (verified with real clicks: locks after first touch, opens when the act is done): P1 Q1-3 turn hand until all tiles filled; P2 Q1-3 turn wheel until all rows filled; P3 Q1 and Q3 lay bar from start to end flag. UNGATED: P3 Q2 (end time: Enter key blinks once the bar has moved off the start). Agent check() does the act at once; warm-up steps and free play ungated
RISKS: P3 bar snaps to 15 min so every phase 3 time is on a quarter hour; Hindi/Gujarati not yet checked (labels h, min, noon, midnight, Hours/Days/Bar, hours/days need TR); phone frame for the wheel (r 86) is small
RUNTIME GAPS (logged in NOTES.md): (a) pieces() cuts a sentence at every "a.m. " / "p.m. " so a question with a time fails one-page; worked round with a comma or colon after each a.m./p.m. (every time tool will meet it); (b) an end time cannot be typed on r3
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/tool-builder-1.3.md
DOUBT FOR THE OWNER: the end-time question shows a live end-time label above the bar's end while the child drags (the owner's "ending time updates"); it only echoes the child's own handle, never the answer, but a child can nudge it until it reads right. Keep it, or hide the label until Enter?
