STATUS: fixes-needed
SLOTS: M2.S3.T7.C31.2D1
FILES: work/indiannica_eng_maths5_ch8/M2.S3.T7.C31.2D1/play-pt116-p2q1-12M-win-en.png, play-pt116-corr-p2-gu.png, play-pt116-p4q1-hand-gu.png, play-pt116-untouched-typed-win-p2.png (kept; clean removes them)
CHECKS: playkit only (real mouse, finger, keys; reduced motion + real speed; en/hi/gu; AI mode); 0 console errors in every run; no tool edited
FAILURES: 1 must-fix (RUNTIME: builder rule-7 Enter-nudge claim NOT FIXED), 3 should-fix, 3 minor
DECISIONS: finding 1: tool workaround (clear the hint at the lock) or the runtime gap list
RISKS: finding 1 is runtime-wide (press() drops Enter while locked)
ESCALATE: none
REPORT:
play-tester-1.16 RE-PROBE of tool-builder-1.39, C31 Part Squares (class 5 ch 8, r66 silent). Verdict: ISSUES. 8 of 9 builder claims proved by real input; the rule-7 Enter nudge is NOT FIXED (1).
PROVED: warm-up ?phase=2 (mouse+finger): step 1 sliver sq-0-1/sq-2-1 -> hint, nothing marked, no advance, only sq-1-1 counts; step 2 sq-0-1 and big sq-1-1 again -> hint, no flip, only sq-2-1; step 3 other sliver sq-0-1 / sq-1-1 -> hint, sq-2-1 -> L.
P2 Q1/Q3 all squares M (12/16), typed 7/9: win board 7 M + 5 L (9 M + 7 L), 5 (7) amber rings on the wrong squares, tally 7/5, state more_than_half 7 left_out 5, en/hi/gu (play-pt116-p2q1-12M-win-en.png). Typed right answer with NO act (keys+Enter, P1 18 / P2 7 / P3 5 / P4 33): win ends complete (numbered 18; 12 true marks; 5 pairs; 3 pairs), but see 4.
P3 tapped half tints only its inside half, letter inside and clear of the cut, corner-cut squares too (en/gu/hi viewed). Double tap (mouse+finger, 45/250 ms; 2 Enters 50 ms, 2 Spaces 40 ms): 1 number (P1), 1 mark (P2 Q3), 1 pair (P3 Q2, also clicks 150 ms apart); a 2nd click 500 ms later counts. Warm-up step 3 Pair double tap (45-300 ms, mouse+finger, reduced + real motion): Q1 opens on its question, 0 pairs, no nudge.
After a miss (P1 19, P2 12, P3 10, P4 44) squares/Pair work once the correction ends (numbers, M->L, pairs 1..4, mouse+finger). P4 teach: Pair aria-disabled, click ignored, Q1 opens (~12 s) on its question, 0 pairs; Enter does not skip teach (design).
Typed digit before the lock (hardware key or pad key) is cleared at the first tap; 18 then wins as 18, not 118. Squares gone after the win (P1 en; P2 en/hi/gu; P3 en), Pair disabled after the win (P3, P4).
AI mode, all 12 questions: answer(v) then check() = win, score 5/10/15, tries 0; check() alone does the act. Keyboard-only warm-up (3 Enters) -> Q1 in P1-P3: Kiko thinks, Answer live, Tab+Enter on a square locks the pad with the nudge (shown at 0.9 s, after the act).
ISSUES
1. [must-fix, RUNTIME; the tool cannot reach it] Hardware Enter while shut never reaches the tool: runtime press() returns on L.locked before api.onEnter, so the tool's shut-state Enter handler is dead code. Proof, no hint open: P1 Q1, tap sq-4-1 (locks), toolApi.say("PROBE LINE"), press Enter -> bubble stays PROBE LINE (P1-P3). A child sees it when a Hint was opened first: ?phase=2, warm-up by clicks, Hint key (id again), tap sq-1-0 -> pad locks but the bubble still draws only the old hint, drawnInstruction "" (nudge only in state); Enter changes nothing.
2. [should-fix, visual] P2 Q1 after a miss (tap 12 M, type 12, wait 7 s), right sliver square (6,1): the child's wrong M/अ/વ is cut by the correct L/क/ઓ chip and the dashed half line, en, hi, gu (play-pt116-corr-p2-gu.png).
3. [should-fix, visual] P4 hand: L/क/ઓ beside the thumb and top-left touch the traced outline (the 55-unit cells the builder named), worst hi/gu (play-pt116-p4q1-hand-gu.png).
4. [should-fix] P2 Q1 typed 7 with NO tap: all 12 edge squares get amber rings (the 7 correct M too), reading as 12 wrong; ring only squares the child marked wrong (play-pt116-untouched-typed-win-p2.png).
5. [minor] First ~1 s after a miss the board is live (trPlaying false while tr=0): ?phase=4 Q1, type 44, click Pair at ~1 s -> a pair is drawn and the correction runs over it. A warm-up Pair double tap with the 2nd tap ~410-440 ms later (doubleTap gap 380/450, mouse) is outside the 400 ms guard: it pairs one half in Q1, which opens on "Pair the halves first." (the original PT3 symptom, slower tap).
6. [minor] After a hardware-typed digit, a tap and the Hint key, getState().hint = "Type your answer, then press Enter." while the pad is shut; drawnHint "" so the agent reads a typing hint for a locked pad. Real speed: 8 taps 300 ms apart -> 4 numbered; the wash is 22% for 0.85 s (faint, owner's call). Not played: classroom, Free play.
