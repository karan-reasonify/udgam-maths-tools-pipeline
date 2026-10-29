Verdict: CLEAN for the re-play of my findings (phase 3, mouse AND touch, en/hi/gu, classroom, keyboard, AI mode); 4 small notes, none blocking. Check fresh, 97 pass.
STATUS: ok
SLOTS: M1.S1.T3.C11.2D1
FILES: none (PNGs play-r2-*.png in the slot folder)
CHECKS: playkit real mouse, finger and keys; q2 drops/re-drags/race/replay/keys, q3.3 label matrix, AI answers, hi, gu, classroom, 6 negative-rect runs; console errors only the runtime rect below
FAILURES: none
DECISIONS: all round-1 findings fixed as built: placed card visible and movable, drag overwrite gone, keyboard nudge, AI answers judged, no stale label
RISKS: negative <rect> width still reproduces, 3 of 6 runs (runtime, see below); notes below
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/play-tester-1.2.md
[fixed] q2 card: drop by mouse and finger on a.m./p.m.; card drawn on top (elementFromPoint at its centre = the card), grabbed again by mouse and finger (a.m.<->p.m.), above-band or past-strip drop returns it, x=514 (noon line) = p.m., x=509 = a.m. Shots play-r2-q2-placed-eve.png, play-r2-q2-placed-morn.png.
[fixed] drag race: tap half-morn then drag to p.m. 150 ms later (mouse and touch): no flip at the end, ends on the tapped half. [note] that drag is simply ignored, the card control still looks live meanwhile.
[fixed] q2 miss: sun runs to 12:00 and stops, invite ring on the card, data-reveals 0; drag, half tap, ArrowLeft and Enter during the replay are ignored (mouse and touch); finish right then wins. Shots play-r2-q2-replay-mouse.png, play-r2-q2-after-replay-mouse.png.
[fixed] keyboard q2: Enter or a tap on the berry key with nothing placed says "Drop the card on a half first, then press Enter." (hi/gu too) and the question returns after the act; Tab reaches card; ArrowRight = p.m., ArrowLeft = a.m., focus stays on the card, Enter passes once = win; retry by keys after a miss works; no trap. Shot play-r2-kb-q2-nudge.png. [note] focus still falls to BODY after Space on a half key.
[fixed] AI mode: q1 wrong misses, right wins; q2 answer("eve")+check = miss, "morn" = win, check() alone = miss; q3 "1|30|morn", "1|30|noon", "1|30" and "2|30|eve" = miss, "1|30|eve" = win. [note] array form answer([1,30,"eve"]) is a miss (label dropped); the string form works.
[ok] q3.3: label first or after typing (typed digits kept), real Enter and berry key, a.m./noon/midnight + 1:30 miss, label tapped 100/600/2000 ms into a replay then retype wins first try, no label = miss (unchanged question). Labels identical shut and open (laid out once), 138 px clear of the pad. Shot play-r2-q3-typed.png.
[ok] hi and gu whole phase by real input: same verdicts, nudge and returning question text drawn, label keys 57/53 px clear of the pad (play-r2-hi-q3-typed.png, play-r2-gu-q3-typed.png). Classroom: guide step waits for the act, hints by themselves, skip at win and closing works, summary tap changes nothing; win lines still hold about 2.4 s (runtime pacing, as before).
[runtime, unchanged] negative rect: same element (x=0 y=0 transparent, first child of g[data-zone=work], widths -13/-600/-430), 10 real double clicks on the Answer key, motion on; the tool does not trigger it differently.
[question, small] while the nudge shows, the bulb re-reads the nudge, not the question.
