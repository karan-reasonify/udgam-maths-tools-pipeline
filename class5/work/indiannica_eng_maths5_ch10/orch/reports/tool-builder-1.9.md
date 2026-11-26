STATUS: ok
SLOTS: M3.S6.T10.C32.2D1 Clock Card Matcher (clock_cards)
FILES: class5/work/indiannica_eng_maths5_ch10/M3.S6.T10.C32.2D1/tool.tsx (+ preview.html); ported pair output-preview/indiannica_eng_maths5_ch10/M3.S6.T10.C32.2D1/
CHECKS: full check 98 pass / 0 warn / 0 fail (3 of 6 full checks used), ported, host emulator plays every phase; quick check 32/0/0; real-input probes: gate on all 4 phases, 24-hour typing ("115" miss, 5th digit capped, "1315" win)
FAILURES: none open (fixed on the way: miss-clears-slot from an empty-slot placeholder, one-line-bubble from P2/P4 closings that were too long, an Invite left on the days rung)
DECISIONS:
- P1: steps turn the minute and hour word cards. Q1/Q3 slide the Earth bar under the 24-box day bar (hand push), then the last hour is drawn large (60 vs 56 min). Q2 counts the boxes (one-box parts "h").
- P2: tapping a rung makes the pencil WRITE the set-up only ("2 × 24 + 3", "× 60"). Tapping min first gets the nudge "Change the days to hours first."
- P3: 16 face-down cards, each with the `card` skin. Tapping the ringed clock card turns it and shows it large (numerals, hour hand moved on). The time card is typed (min or s); it turns green at the win, then all 16 flip and tick round.
- P4: one Jump key (hours, then minutes). The 24-hour answer is a 4-digit plain string item with its own judge; the slot shows "13__ hours" via format.
- Gated: P1 Q1/Q3 slide; P2 rungs (Q1 two, Q2/Q3 one); P3 Q1-3 card turn; P4 Q1/Q3 two jumps. Ungated: P1 Q2, P4 Q2.
- bigPad false: 8 x 110 cards need x 16-994 open. The open reading clock overlays only the face-down extras in cols 7-8.
- The slot is empty until the first digit. "____ hours" always shows on the working-area card (check miss-clears-slot forbade a placeholder in an empty slot).
- P3 questions no longer state the clock time: the child reads it off the turned card.
- No can-do row and no runs count (keyOnly).
- FREE_LINE is now "Free play. Turn any two cards and find the pairs." (memory game); "set any time" was dropped.
- Plan meta-text ladders were rewritten as hints.
- Warm-ups are not answers: 1 day 2 h; 3:20 to 200 min; 7:25 a.m. + 6 h 50 min.
RISKS:
- TR is empty (language pass later). The 12 item `win` lines go through api.say(item.win), which tr-coverage cannot list: add them and "Change the days to hours first." to TR by hand.
- The a.m./p.m. bubble split is worked round in the wording; no new runtime gap.
ESCALATE: owner question: is P1's honest "last hour" enlargement (4 min gap) clear for Class 5, or should the full bars exaggerate the gap?
