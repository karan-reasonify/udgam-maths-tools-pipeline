STATUS: ok (play test done; verdict ISSUES: 0 must-fix, 5 should-fix, 3 questions)
SLOTS: M1.S2.T4.C15.2D1 (class 5 ch 10, r66 silent)
FILES: none edited; scratch folder and my 2 screenshots deleted (17 play-*.png from the earlier dead tester, 17:23-17:35, remain in the slot folder; clean removes them)
CHECKS: ~40 real-input runs (mouse, finger, keys; en/hi/gu; user, AI, classroom; motion on), 0 console errors
PASSED: answer gate P1-P4 en/hi/gu: Answer key and keypad dim until Group+Lift (P4 Bundle+Carry); after Group/Bundle ONLY still dim; digits/Enter/Backspace ignored, also mid-sweep.
PASSED: plain Enter, a digit, Backspace, click or finger tap on the dim Answer key say the nudge; 2nd nudge after Group; the question again after Lift (hi/gu present).
PASSED: a real Enter on a guide step is a touch (guide steps by Enter only, no Group tap -> Q1 gated); real mouse/finger taps on Group/Lift/Bundle/Carry too.
PASSED: gate re-arms after phase dots (1->3, 3->2, jump mid-correction), restart (mid-sweep, mid-correction), Next question; AI mode answer/check ungated and works; classroom tap/ArrowRight at a gated Q change nothing, skip at a win works.
PASSED: double tap Group/Lift (mouse+finger, 45 ms), 2-3 Enters 50 ms apart, held Enter = ONE act. Act key dimmed during a correction; digits, Enter, Backspace, Space, Hint, click do nothing; unlocks at its end.
PASSED: unit boxes days|h, h|min, min|s: Enter between boxes, rub out on an empty box goes back to box 1, tap on a box (mouse+finger) moves the caret, 7-digit cap, pad Enter ok.
PASSED: corrections: second part 0 -> blocks counted 1..n in ink; another value -> heap swept again + child's chip (also first box 0); P4 always bundle/carry; hi/gu chips translated. P4 Q3 2 h 200 min: 3 violet + 2 blue tiles, piles=3, carry=3, answer [5,20]. Hint ladder ok.
PASSED: HEAP before Group, all 16 states DOM-measured (4 warm-ups + 12 items): no short last row = remainder, no row = pile size or remainder (77h 10x7+7; 150h 20x7+10; 55h 10x5+5; 290h 20x14+10; 90m 40+40+10; 395m 50x7+45; 130m 50+50+30; 470m 40x11+30; 150s 50x3; 725s 50x14+25; 190s 40x4+30; 2000s 50x40; P4 75 40+35, 70 40+30, 200 40x5).
[should-fix] all phases, keyboard only: after Group/Bundle the next Tab lands on a PHASE DOT and Enter there jumps the phase. Focus drops to BODY after any key press and the act key (Group->Lift, Bundle->Carry, same place) is the 4th Tab stop, so Tab goes to dot 1; Lift needs 9 Tabs or Shift+Tab. Repro: Tab x4, Enter on Group, Tab, Enter -> phase 4 from phase 1. Should: focus stays on the relabelled act key.
[should-fix] gated question, P1-P4: once the nudge is up the question wording is gone (keyOnly, nowhere else on screen) and the Hint key is dead while locked, so it cannot bring it back (PLAYBOOK item 10 says Hint re-shows it). Repro: Q1, Enter, click "again": bubble stays "Tap Group to make piles, then tap Lift." (en, gu). Returns only after Lift.
[should-fix] P1 Q1 first-miss line vs typed answer: 5|30, 7|6, 0|6 (both parts given) get "The days alone are not the whole answer, because some hours are left." (written for the near-miss 6|0 only); P3 Q1 4|0 gets "The blocks left are whole seconds, not a part of a minute." Should: line per correction branch, or a neutral first miss.
[should-fix] free play: Add 10/Add 1 accept one tap per 400 ms: 5 taps 160 ms apart on Add 10 = +20 h not +50, no feedback. Shelf caps at 24 tiles silently: three full rounds (to 288 h, Group, Lift, Add) draw 12, 24, 36 tiles, then the next Add folds to 24 (12 tiles vanish). Should: disable/say when the shelf is full; taps 160 ms apart count.
[should-fix] hi, P4 Q1 and Q2 working panel: "1 घंटे 10 मिनट" (tx("h")=घंटे with quotient 1); the win line says "1 घंटा 10 मिनट". gu fine. Native check.
[question] "a real tap on the on-screen Enter is a touch" cannot be played: at a guide step there is no on-screen Enter (Answer key dim, no pad; a digit only shows the step hint).
[question] Enter with a blank box (6| or |6) does nothing and says nothing (tries 0, bubble unchanged), so the "blank second part" correction is unreachable; only 0 reaches it. Runtime two-box behaviour, not the tool.
[question] heap coincidences, not systematic: P2 Q2 (130 min: 50+50+30) two full rows = quotient 2; P4 Q2/warm (75: 40+35) one full row = quotient 1. Rows are never the pile size.
DECISIONS: none; tool not edited
RISKS: the two keyboard/Hint findings are runtime-level (r66 focus blur, locked Hint), not fixable in tool.tsx alone
ESCALATE: no
