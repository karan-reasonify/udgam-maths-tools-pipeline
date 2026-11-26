STATUS: ok
SLOTS: M1.S1.T3.C11.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T3.C11.2D1/tool.tsx
CHECKS: full 97 pass 0 warn 0 fail (1 full run for this fix message), ported; quick check clean
FAILURES: none
DECISIONS: Enter-touch taken from the physical (trusted) Enter key only; P4 gate = lens + one lap
RISKS: 6 nudge lines are new api.say literals and need hi/gu TR at the language pass
ESCALATE: none
C11 fix round (C11-fixes.md):
S1 ladders/closings now one new move per rung, no miss or closing reworded:
 P1 ladder[1] -> "Double the side, then double that again."
 P2 ladder -> "Add the two shorter sides first." / "Then add the longest side to that sum."
 P3 ladder -> "Write the half as a length plus a breadth." / "Check: 2 × (length + breadth) must give the perimeter."; closing -> "To find a missing length, halve the perimeter and take away the breadth."
 P4 ladder -> "Ten tenths make one metre, so divide by ten." (FIRST, for Q1 and Q3) / "Multiply a side's tenths by 4, then by the laps."
 P4 Q2 own ladder -> "Multiply 45 by the number of laps." / "Work 3 × 40 and 3 × 5, then add them."
 TR is still empty, so there were no TR keys to follow.
S2 Enter on a guide step arms the gate: a keydown listener during the steps counts only a real (trusted) Enter, in user mode. It is not set in onEnter/HOOK.demo, which toolApi.check() and __tool.solve() also call; that keeps the agent and dev runs ungated.
P4 gate (decision): the Answer key wakes after Lens + ONE lap (field question: one lap). Lap stays live up to N laps and the Laps: k counter keeps ticking.
Nudge (side effect 1): while locked, a tap on the Answer key, panel or pad, or a typed digit, point or Enter, prints a number-free line for the act that waits ("Tap Walk to go round the sides.", "Tap Lens to read the side in tenths." ... one per act). The act that follows says the question again.
The invite pulses on the act key only while the gate waits; with the gate open, the Answer key's blink is the cue.
Lock follows only a real press on the act key or a real Enter on a guide step. A tap on the empty paper never arms it.
No typed answer copies a displayed number: before the win the board shows 4 × 19, 13 + 15 + 17, 18 − 7, 34 tenths, the lap count. No choice questions, so the "right choice not first" rule does not apply.
Proved with REAL input (playkit), Q1 of every phase (P1 steps done by Enter):
 - the Answer key is aria-disabled at open;
 - a digit is refused and shows the nudge;
 - a tap on the locked Answer key shows the nudge;
 - after each act the question is back, and the key is live only after the last gating act;
 - answering wins;
 - P4: live after lens + 1 lap, the Lap key still there, and a 2nd lap ticks Laps: 2.
Not done: design pass (not asked); guide.answerGate sidecar note (the main session handles it per C11-fixes.md).
