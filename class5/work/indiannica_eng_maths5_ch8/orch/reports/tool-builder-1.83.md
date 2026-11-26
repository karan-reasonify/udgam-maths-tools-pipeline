STATUS: ok
SLOTS: M2.S2.T4.C16.2D1 M2.S2.T5.C21.2D1 M2.S3.T6.C26.2D1
FILES: work/indiannica_eng_maths5_ch8/{M2.S2.T4.C16.2D1,M2.S2.T5.C21.2D1,M2.S3.T6.C26.2D1}/tool.tsx (+ the pairs check ported)
CHECKS: each: check --no-render 33/0/0; full check C16 98 pass 1 warn, C21 97/1, C26 97/1, 0 fail; the only warn is miss-shows-answer (expected); all three ported
FAILURES: none
DECISIONS: clue lines (spec item 4) checked on every question of all three tools: none states the answer or total, so no English and no TR changed
RISKS: two-choice questions (C16 1.2 fence, 4.1/4.2 Patch A/B, 4.3 yes/no) give the answer away by elimination after miss 1, whatever is drawn: the owner should know (not fixable tool-side)
ESCALATE: no
REPORT: work/indiannica_eng_maths5_ch8/orch/reports/tool-builder-1.83.md
C16 Square Cover: new `const shown = !!wrong && wrong.tries >= 3`. Traceback guard `if (!wrong || wrong.tries < 3 || stage !== "ask") return;` now comes before api.lock(true).
 C16: `showTb` and `countsShown` read `shown` instead of `!!wrong`. P4 counts and api.share patch_a/patch_b stay hidden/null on misses 1-2 and show on a right answer or from miss 3.
 C16: P1 sides/perimeter/area (conn) are still won/warm only: missing on misses 1-2, kept after a right answer and in the guide. Perimeter label untouched.
 C16 kept on purpose: 2.2 miss "Area is counted in square units, not in m." names the kind of unit, not "1 sq. m".
 C16 numbers (Q1 of P1-P4, en + hi, reduced motion; P1 also real motion), measured the same way for C21/C26:
   miss 1 = `miss` hint; miss 2 = ladder[0]; both: pad unlocked, slot empty, no new answer text in DOM/aria, getState unchanged.
   miss 3 = correction, ends on the answer, unlocks (P1 "Area 15 sq. cm", P2 "sq. m", P3 "Area 36 sq. cm", P4 "Patch B covers more" + patch_a=20/patch_b=21); miss 4 replays it.
   Right answer wins on try 1/2/3 and after the reveal. The next question opens at tries 0 with no hint and nothing left over. No console errors.
C21 Rows Times Squares: one line. The guard `wrong.tries < 3` now comes before api.lock(true) and rxFull. One-tap "Stack rows" fill unchanged. No other reads of `wrong`.
 C21 numbers (en + gu, P1 also real motion): misses 1-2 hint only, unlocked, empty, nothing new. Miss 3/4: "9 × 5 = 45", "16 × 7 = 112", "15 × 15 = 225", "27 × 9 = 243"; wins on try 1/2/3/5.
 C21 note: locked=true at the next question's start happens in the no-miss run too. It is the existing first-touch act gate, not this change.
C26 Work Back and Split: one line. The guard `wrong.tries < 3` now comes before put(traced) and api.lock(true). The act counter `S.tries` and the act logic are untouched.
 C26: getState().tries is the tool's own shared act counter, which shadows the runtime's miss count, so the probe printed 0/1 throughout.
   Proof the miss count works anyway: the bubble stepped miss -> ladder[0] -> ladder[1], and the correction came exactly on the 3rd wrong answer.
 C26 kept on purpose: 1.2 miss "Start small and try a side of 2, then 3." (the answer is 4: it names the method, not the answer).
 C26 numbers (en + hi, P1 also real motion): misses 1-2 hint only, unlocked, empty, nothing new. Miss 3/4: "16 × 16 = 256" + "16 cm", "= 441", "19 × 8 = 152" + "8 cm", "84 + 24 = 108 sq. m"; wins on try 1/2/3/5.
ALL: typing the answer after the reveal was proved after miss 4 (the same reveal state as miss 3).
ALL: a miss before the act cannot happen by real input: the pad is gated, so a probe with no act sent nothing (C16 P3, C21 P3).
ALL: the miss-3 lock shows only with real motion; under reduced motion the timeline completes at once.
Nothing needed runtime/ or lib/. Not uploaded; shots --pack not run.
