C11 maths-review fixes (maths-reviewer-1.4, 2026-11-16) — send to tool-builder-1.2 when an Opus slot is free
SHOULD-FIX:
S1. Near-repeats inside one phase run — reword the LADDER rungs and closings (keep the plan's miss lines), one new idea per rung: P1 Q3 miss "Four lots of 23 cm go round the frame." vs ladder[1] "Times 4 means four lots of one side."; P2 Q1 miss "Did the ant walk the third side too?" vs ladder[0] "Add the third side on to the first two."; P3 Q3 miss "Take the breadth away from half of 50 m." vs ladder[0] "Take the breadth away from the half, not the whole."; P3 Q2 miss "The half holds one length and one breadth." vs the closing "Half the perimeter is one length and one breadth together."; P4 Q2 ladder "Each lap adds 45 m again." vs "Three laps are 45 m three times."; P4 closing vs ladder[0] "Multiply one lap by the number of laps." Any TR key follows.
S2. Enter on a guide step IS a touch (PATTERNS §19): set touched.current / setTouchN in the Enter handler (api.onEnter ... doAct(stepOn) and HOOK.demo), user mode only; the agent's HOOK.check stays ungated.
MAIN-SESSION DECISIONS on the reviewer's questions:
- P4 gate: Answer key wakes after the lens + ONE lap (not all N laps); Lap stays live for the rest (optional ticks of "Laps: k").
- P4 near-miss 680 / 312 (tenths typed as metres): put the rung "Ten tenths make one metre, so divide by ten." FIRST for Q1 and Q3 (this also stops "put the point back" hinting that Q3's answer has a point).
- Keep: act key names the method (plan's controls); Halve shows "= 18" as built; 31.20 refused as built; rope pieces left to the visual reviewer.
- sidecar guide.answerGate note: main session handles it for the whole chapter (acts: P1 copy+times, P2 three walks, P3 halve+take, P4 lens+laps; none ungated).
