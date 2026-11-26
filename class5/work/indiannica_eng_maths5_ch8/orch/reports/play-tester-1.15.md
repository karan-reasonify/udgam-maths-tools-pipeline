STATUS: fixes-needed
SLOTS: M1.S1.T3.C11.2D1
FILES: none edited; kept PNG work/indiannica_eng_maths5_ch8/M1.S1.T3.C11.2D1/play-p115-q1-13.6.png (scratch scripts deleted)
CHECKS: ~55 real-input play runs (mouse, finger, real keys; en/hi/gu; classroom; motion on) on the 18:50 preview; 0 console errors in all of them
FAILURES: none
DECISIONS: none
RISKS: 0 must-fix, 1 should-fix, 1 question, info below
ESCALATE: no
REPORT: work/indiannica_eng_maths5_ch8/orch/reports/play-tester-1.15.md
play-tester-1.15 | C11 Square and Triangle (class 5 ch 8, r66 silent) RE-PROBE of 1.7 vs builder 1.38 | Verdict: ISSUES (0 must-fix, 1 should-fix); every claimed fix held, the PLAY 2 wording is over-broad. Console errors: none.
PROVED (real input):
- Gate via API: a question reached by gotoStep/next/prev on a fresh page (untouched = open, by design) locks on the FIRST act press, during and after it, until ALL acts are done, then opens: P1 Q2/Q3 (Copy+Times), P2 Q2 (3 Walks), P3 Q2/Q3 (Halve+Take), P4 Q3 (Lens+Lap), P4 Q2 (ONE Lap). After a real warm-up, Q1 locked, then toolApi.next() -> Q2, gotoStep -> Q3, prev() -> Q2 all open LOCKED (P1, P3, P4); 36+Enter refused (typed stays "", tries 0). Q1 "ask" is NOT reachable by gotoStep/next/prev: gotoStep(0/3/6/9) lands on the warm-up demo, so P1/P3/P4 Q1 are only reached through the warm-up, which arms the gate (en keys-only, hi finger, gu mouse: all locked).
- Keyboard-only warm-up (real Enter only, P1-P4 en): Q1 locked, key dim, pad shut, digit/Enter give the nudge; Tab order skips the dim Answer key; Enter and Space on the focused act key run ONE act. Double tap on Walk (mouse 45/300 ms, finger 45 ms) = one act.
- P4 Q3 pad and keys: 31.2, 31.20, 31.200, 031.2 all WIN (en; 031.2 keys hi; 31.20 pad gu); 31. and 3.12 miss.
- Tenths slip: Q1 680 -> rung 1 "Ten tenths make one metre, so divide by ten." (en; gu line too), then "Find one lap in tenths before the laps." then "Multiply a side's tenths by 4, then by the laps."; Q3 312 -> rung 1 "Your count is in tenths; ten tenths make a metre." (en/hi), then "Read each side as 26 tenths first." then "Times 4 gives one lap...". Rungs never repeat or go weaker, hint stays under the pinned instruction.
- Lap key gone for the whole ~4.5 s correction (sampled every 0.5 s; absent from +40 ms after Enter; a Lap tap at +0 ms started no act, acting false); the pad returns after it.
- Hint (bulb) key on a locked Q re-shows the QUESTION and clears the nudge (click, Enter on the focused key; en P1, hi P4, gu P3, classroom P1).
- Answer key: Lens alone stays locked; Lens + ONE lap wakes it (P4 Q1, Q3; 68 wins with 4 laps left undone); more laps optional.
- No nudge while an act runs: digit, Enter and Answer-key tap (mouse and finger) during Copy/Lens/Halve change nothing; the question returns on the act's end.
- Seven nudges, en/hi/gu, each after a real digit on the locked Q: copy, times, walk, halve, take, lens, lap (all 7 in each of the 3 languages, none equals the question, typed stays ""; only "Times 4" holds a digit, the key's own name; hi/gu in their own script).
- Wrong answer before the act (fresh page, P1 Q2 mouse / P3 Q2 finger / P4 Q2): correction runs, act keys gone, pad back, retype wins; a digit then brings the act key and unsolved board back, a tap locks the pad until the acts are done, typed digit kept, right answer wins (36 / 135); never locked with no key. Restart mid-act then a new warm-up: Q1 locks and opens right. Classroom: bubble tap and ArrowRight on a locked Q change nothing.
FINDING
1 [should-fix] P4 Q1/Q3 - rung 1 (the item's own miss line) is the tenths->metres hint for EVERY first miss, so it gives wrong advice for a real non-slip error. Repro: play{phase:4,motion:true}, warm-up Lens+Lap, Q1 Lens + ONE Lap, answer-open, type 13.6 (one lap, forgot x5), Enter -> hint "Ten tenths make one metre, so divide by ten."; 17 and 6.8 the same; Q3 (gotoStep 11, Lens+Lap) 3.12 and 31. get "Your count is in tenths; ten tenths make a metre." (3.12 has no tenths count in it). Shot play-p115-q1-13.6.png. Should: the slip line only when typed = 10 x answer (680 / 312), otherwise a generic rung 1 (e.g. the item's ladder[0]); 312/680 itself is right.
QUESTION
2 [question] After a miss before the act, a digit makes the act key and the unsolved board reappear (typed digit kept). It works and never locks with no key, but the picture steps back from the finished correction; by design (correction stays until the child types)?
INFO: a nudge already on screen stays up while the act it names runs (~1 s), then the question returns. After Enter on a focused act key, focus falls to BODY (the next act key is a new element): Tab again. Not played: held-Enter autorepeat, Escape in the party (runtime, known), live setLang.
