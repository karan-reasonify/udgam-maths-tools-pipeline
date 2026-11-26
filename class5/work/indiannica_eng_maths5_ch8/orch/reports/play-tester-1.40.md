STATUS: ok
SLOTS: M2.S2.T4.C16.2D1 M2.S2.T5.C21.2D1 M2.S3.T6.C26.2D1
FILES: none edited (read-only play test)
CHECKS: 78 scripted playkit runs, 0 findings
FAILURES: none
DECISIONS: none
RISKS: two-choice elimination (accepted); C26 double-count not provable (act counter)
ESCALATE: no
play-tester-1.40, ch 8, C16 Square Cover + C21 Rows Times Squares + C26 Work Back and Split (r66 silent): VERDICT CLEAN. must-fix: none. should-fix: none.
Method: P1-P4 Q1 of each tool, en + hi (C16, C26) / gu (C21), 77 scripted runs through playkit (real mouse on the pad, hardware digits+Enter, finger taps; acts first, then wrong answers), reduced motion; plus ONE real-motion run per tool (P1), AI mode (P1), free play. Page = work/.../<slot>.preview.html (same source as the ported pair; `status` = ported, check passed, not stale).
question (all 3 tools, the accepted two-choice class): after miss 1 the other choice is the answer; three lines also lean toward it by wording: C16 4.1 miss "A longer patch can still cover less" (A is the longer one), 4.3 miss "Look at the size of the squares, not just the counts" (points to No), 1.2 ladder[1] "Would a fence tell you how much grass there is to cut?". None states the final answer or total; nothing extra is revealed.
question (C26): getState().tries is the act counter, so "a keypress during the correction cannot double count" is only provable for C16/C21 (tries 3->3, 4->4 with 9+Enter+Enter pressed mid-lock); in C26 the pad ignored the keys and miss 4 replayed the correction.
Lines read: every miss/ladder line of all 36 questions (en) vs its answer: none gives the answer or total; hi/gu lines are translated, distinct per rung and carry no answer digits (a native read of meaning is still owed).
clean C16: miss 1 = item `miss`, miss 2 = ladder rung (en exact, 4 phases), pad unlocked (0 of 23 lock samples, next wrong typed by real clicks), slot empty, work-zone pixel diff 0 px, 0 new DOM tokens, 0 new text/aria/title/alt, getState diff none (P4 patch_a/patch_b null until miss 3, then 20/21; P2 unit_picked is only the child's own act); miss 3 = correction ends on "Area 15 sq. cm" / "sq. m" / 36 / "Patch B covers more" 20 21, pad unlocks, typing the answer wins; miss 4 replays it.
clean C21: same numbers; miss 3 ends on 45 / 112 / 225 / "27 × 9 = 243"; baseline after the acts has no answer text in any layer.
clean C26: same numbers; miss 3 ends on 16 / 441 / "19 × 8 = 152" / 108; miss 1-2 pixel diff 0 and no new text in all 4 phases en + hi.
Real motion P1: miss 1-2 never lock (0/23 samples); miss 3 locks 2.94 s (C16), 2.85 s (C21), 0.97 s (C26), unlocks, ends on the answer; miss 4 locks and replays; no console error.
Also clean (all 3): right answer on try 1, 2, 3 and after the reveal each win (4 phases x 3 variants); Q2 after a 4-miss Q1 is identical to Q2 after a clean Q1 (work text, DOM size, getState; tries 0, no hint, no reveal); Enter (hardware + pad key) after miss 1 and 2 sends nothing (tries, bubble and drawing unchanged, all main runs); Hint key at try 0 and after a miss: miss -> ladder[0] -> ladder[1] -> stays, never weaker, tries unchanged, nothing drawn, and the reveal still came on the 3rd miss; restart resets the count (C21: miss 1 line shown again).
Also clean: AI mode (check() does the acts, answer()+check() steps miss -> ladder -> ladder, then wins), guide steps by real taps in every run, summary -> Free play on all 3 (controls respond, stage free), console errors 0 in all 78 runs.
Not covered: phase-dot jump with pending misses (a synthetic dot click did not navigate), real motion and AI mode on P1 only, a miss before the act (impossible by real input: the pad is gated), miss on Q2/Q3 (tries resets per question, only Q1 was missed).
