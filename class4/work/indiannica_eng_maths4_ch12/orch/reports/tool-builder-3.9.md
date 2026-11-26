tool-builder-3.9 · class 4 ch 12 · M1.S1.T2.C8.2D1 Minute Clock · play-tester-3.1 S4 (dead pause) FIXED. No hand added back.
CHANGE (tool.tsx, Edit only, 5 hunks; no printed line, TR key or PHASES change):
- viaAct: the first point of every move now fires at the press (delay 0) and a trailing empty step of one gap is added, so every move ends, and drops api.lock(false), at exactly the same time as before (1 point: 450 ms; n points: 1200 ms). playing.current still swallows taps/Enter until end().
- The single-point acts now make their visible change in onPoint (at the press) and call api.did(...) in the end callback (at 450 ms, as before): P1 Words, P2 Step (+ tick), P3 Fives, P4 hour finder, free-play Fives/Words/Readout toggles. Multi-point moves (minute/hour sweeps, Count) simply start one gap earlier; their final put in done is unchanged.
- Step tween: NOT done. The minute hand is drawn from integer s.m (dm*6); a tween means fractional minutes, which also move the hour hand (m*0.5), the arc and the magnifier. Not cheap or safe for a one-mark tick, so left as the play tester allowed.
RESPONSE (real motion, play({motion:true}), own headless Chrome, C4_CHROME_POOL=1; MutationObserver on the work zone, the pressed key's own subtree excluded, ms from click start):
- BEFORE (old source rebuilt and probed the same way): Words 515, Step 510, Fives 512, hour finder 521 ms.
- AFTER: Words 59, Step 62, Fives 55, hour finder 66 ms. Guide step still advances at 513-528 ms (unchanged end).
LOCK PROOF (last guide step by real Enter, Q1's right answer by real keys + Enter at ~0.4/0.8/1.05 s of the 1.2 s move):
- P2 Count, answer 15: at 400/801/1051 ms -> stage demo, typed "", tries 0 (refused); Q1 opens ~3.64 s, then 15 on the pad -> win, tries 0.
- P3 Count, answer 34: at 400/801/1052 -> refused (same); then accepted, win, tries 0.
- P4 minute sweep, answer 3 | 58 (two boxes): at 400/801/1051 -> refused (same); then accepted, win, tries 0.
- P1's last step (Words, 0.45 s) ends before 0.8 s and Q1 is a set clock (no typed answer), so it was not probed; its lock still holds to 450 ms.
- 0 console errors in all 13 runs; [data-role^=act] nodes 0 during and after every move (no hand).
KEPT: touched flag, real Enter arming the gate, r31 miss-clears-slot, en/hi/gu (no English line changed), no hand picture.
CHECKS: quick check 32 pass / 0 warn / 0 fail. FULL check (1 run of 6): 96 pass · 0 warn · 0 fail · 4 info; ported to output-preview/indiannica_eng_maths4_ch12/M1.S1.T2.C8.2D1/ (phases 1-4 play and finish in the host emulator). Not published.
S3 (stale step hint on a dead-key tap mid-move) untouched: runtime gap, already on the NOTES list.
Scratch probes deleted.
