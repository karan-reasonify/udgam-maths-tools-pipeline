STATUS: done
SLOTS: M2.S4.T7.C33.2D1
FILES: tool.tsx (P4 typed-60 rung DT_B60 + hi/gu TR)
CHECKS: full check 96/0/0; playkit motion:true en/hi/gu, 0 console errors
FAILURES: none
DECISIONS: P4 default rung 3 stays the half rung; P4 typed-60 branch = take-1-hour line
RISKS: double tap on Change = Change+Hop (per-key guard); acting false during hops
ESCALATE: no
tool-builder-3.19 | class 4 ch 12 | C33 M2.S4.T7.C33.2D1 Duration Track | educator round items 1-4 (resumed after 3.12)
All proofs: playkit, own headless Chrome, C4_CHROME_POOL=1, play({motion:true}), real mouse/touch/keys; 0 console errors in every run.
1 ALREADY DONE (3.12). A capture listener swallows any press that begins while the frog is in the air (restart/sound/phase-dot/next pass).
  Proof: guide step P3 (Hop, dimmed Answer +0.18 s, Hint +0.3 s): hint stays null, step advances once. P3 Q2 Hop, Hint key +0.2 s: hint null.
  P3 Q1 Hop, dimmed Answer +0.15 s: hint null.
2 ALREADY DONE (3.12), plus one CHANGE in P4. Rung 3 per question (Hint x3, after the hops):
  P2 Q1 "Add the hours 2 + 3, then add the minutes 10 + 25." Q2 "Put 3 hours with 6 hours, and 15 minutes with 30 minutes."
     Q3 "Before noon is 40 minutes, after it is 2 hours 5 minutes, so add them." (rung 2 for all three: "The two green boxes hold the two parts, so add them.")
  P3 Q1-Q3: "60 minutes make 1 hour, so 55 + 18 = 73 minutes = 1 hour 13 minutes." (all three pass 60)
  Miss 1|85 on P2 Q2 (no minutes past 60): the 60 rung shows at once. After Hint x2 then 1|85 (P2 Q3): also the 60 rung.
  Limit: after Hint x3 (top rung) a 1|85 miss shows the top rung, not the 60 rung (the runtime never drops back). Also the next Hint press after a
  60 miss shows the same line again (ladder[0] = miss, kept by 3.12 so a 2nd 60 miss still gets it).
  P4 CHANGED: a fresh P4 Q2 6|75 miss showed the ADDITION line (55 + 18) on a counting-back question. Now the typed-60 branch in phase 4 shows
  DT_B60 "Take 1 hour as 60 minutes: 12 + 60 = 72, and 72 − 30 = 42 minutes." (hi "1 घंटे को 60 मिनट मानो: 12 + 60 = 72, और 72 − 30 = 42 मिनट।"
  gu "1 કલાકને 60 મિનિટ ગણો: 12 + 60 = 72, અને 72 − 30 = 42 મિનિટ."; nbsp in every sum; no P4 pair 05/50, 20/45, 00/50, 10/25; no answer minute).
  P4's DEFAULT rung 3 not changed (skipped): it is the half rung ("Read the clock above, then check which half the start flag is in.", ML4's
  misconception), and the hop method never borrows on screen, so a borrow rung there does not fit cleanly. All three P4 questions borrow in column terms.
3 ALREADY DONE (3.12): nbsp in every sum and the "= 1 hour 13 minutes" step; pair 55 + 18 kept. Bubble fit (931 x 236), rung 3 at P3 Q1:
  en 3 lines (bottom 210), hi 2 lines (188), gu 3 lines (225); DT_B60: en 3 (210), hi 2 (188), gu 3 (225). No sum split.
  The "question line": on r31 keyOnly the bubble draws ONLY the hint while one shows (role dump: no instruction role next to any hint, even the 2-line
  rung 1 or a plain miss), so no rung can keep the question line; the tail was kept. Runtime behaviour, not a tool choice.
4 ALREADY DONE (3.12): per-key 400 ms guard (lastKey[on]).
  Change then Hop 183 ms later (measured press-to-press; t.click cannot go lower) on P4 Q3: both happen (card 2 h 50 min, hops 2/3).
  True double tap on Hop (mouse 82 ms, touch 86 ms): one hop group (hops 2 -> 3/3).
  Side effect (not changed, not blocking): a true double tap on CHANGE (87 ms mouse, 133 ms touch) is Change + Hop, because the Hop key appears under the
  same finger; the frog hops one tap early, no wrong answer, lock intact. A time cut would break either the touch double tap or the 0.15 s case.
LOCK: P3 Q1 Hop, right answer by keys at +0.8/+1.7/+2.5 s refused (typed "", tries 0). P2 Q1 right answer at +0.15 s into each of 4 hops incl. the last
  refused; after landing accepted first try (win). P4 Q2 after a miss the pad reopens ~1.5 s (correction), then right wins.
Kept: touched flag, Enter arming, r31 miss-clears-slot, en/hi/gu TR, no hand, lock to the end of the hop.
FULL CHECK (1 of 6): 96 pass · 0 warn · 0 fail · 4 info; ported; host emulator phases 1-4 finish.
RISK: getState().acting still false during hops (runtime gap already logged). Scratch deleted (only my own play-c33p PNGs; 3.12's PNGs left).
