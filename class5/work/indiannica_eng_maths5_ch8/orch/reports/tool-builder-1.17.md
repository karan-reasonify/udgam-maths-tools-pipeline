STATUS: done. C36 maths-review fixes applied; full check 97/0/0 (1 of 6), ported.
SLOTS: M3.S4.T8.C36.2D1 · FILES: work/indiannica_eng_maths5_ch8/M3.S4.T8.C36.2D1/tool.tsx
S1 nudges: an answer refused before the act names the live control. Literal api.say lines: "Tap Fill to put cubes in both boxes." / "Tap a unit cube to put it on the card." / "Count every row first." / "Lift every layer first." They are said on a trusted Enter or digit, or a tap on the locked corner key. In phases 1-2 a bare Enter before the act also says them (through onEnter). The question (item.say) is said again once the act is done. Q1.3 and Q4.3 say nothing about the act.
S2 P1 ladder: ["The box that holds more cubes takes up more space.", "Read the number beside each box, then tap the box with the greater number."].
S3 Q1.2 say "Now fill the pencil and the school bag; which one takes up more space?"; miss "Count the cubes in each, not how far it reaches."; Q1.3 puts the wide box first. Right answers are now L, R, L across 1.1-1.3.
S4 Q1.1 win "Yes, the shoebox. The space a solid takes up is its volume."
S5 Q2.1/Q2.3 misses: "Compare the cube's edge with the size of the room." / "... of the grain." ladder[0] (very small, small or very large) now goes further than the miss.
S6 Q4.3 say "This stack is 2 layers high; how many unit cubes fill it?"; Q4.1 miss "Look under the top layer, then count again."; Q4.3 miss "Count every layer, not only one."
S7 ask "Volume in cu. cm?" (all three).
S8 Q1.2 win now carries the tall-and-thin point.
Main-session decision: a "Not to scale" label (tx, 28) under the unit shelf.
Extra rules:
- A correction that has run counts as the act (tbDone), so a wrong typed answer before the act never leaves the pad locked. The keys stay live while the correction stands.
- The lock follows only my controls' presses.
- A REAL (trusted) Enter on a guide step counts as a touch. toolApi, HOOK.check and the dev driver send no key event, so they stay ungated.
- Right choice not first: C36:2 has 1 cu. m last.
- Rungs: each ladder rung is a new move, not a miss or the closing reworded.
Real-input proof (playkit):
- P1: an untouched Enter before Fill gives the nudge. After a real box tap the key is locked and Enter gives the nudge. After the two Fills the question returns and the pad is unlocked. Pick, Enter: win.
- P2: a bare Enter gives the nudge with no try lost. Placing the cube brings the question back, then win.
- P3: a keyboard-only warm-up (Enter on both steps) leaves Q1 LOCKED. Enter gives the nudge and a digit types nothing. After counting, the question returns and the key is live, then win.
- P3 fresh: a wrong typed answer before the act runs the traceback, the pad comes back unlocked, a Count row tap works, and 18 wins.
- P4: the keyboard warm-up leaves Q1 locked. A tap on the locked key gives "Lift every layer first." After 3 lifts the question returns.
- AI mode: toolApi.check walks the steps, Q1 is unlocked, answer(24) and check give the win.
Not done: no TR keys added for the 4 nudges or "Not to scale". The first TR key would make tr-coverage ask for all ~77 printed lines. All are literal lines that tr-coverage will list in the language pass.
