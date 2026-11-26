STATUS: ok (fix round: full check 1 of 6, 97 pass 0 warn 0 fail, ported)
SLOTS: M1.S1.T2.C6.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T2.C6.2D1/tool.tsx
ESCALATE: no
C6 Edge Walker, maths-review fixes (C6-fixes.md). Quick check 32/0/0; ONE full check 97/0/0; the pair is ported (4 phases play in the host emulator).
M1: in P3 Q1/Q3 a tap on a shorter side keeps the child's Length tag on that side (the tag stays), but labels never follow the tap.
 The brief's correction shows: the longer pair lit amber and "Length = 11 cm" on the strip. Walk stays shut until a tap on a longer side; full Length/Breadth labels come only from the rectangle.
 In P3 Q2 only the tapped side shows "Length" until the win (labels do not reveal right or wrong before Enter).
M2: the traceback no longer strands the board. Act keys, side Hits and the tray come back once it has played (hidden only while S.tbOn).
 The child's next act (Walk, Write in cm, Two lots, a tag, HOOK.set) clears tb. The gate stands down after a miss (S.tb > 0).
S1: P1 ladder[0] "Check the strip: is every side's length in the sum?" · P1 Q3 miss "Count the badge's sides, then add 7 for each one.", win "Yes, the badge is 35 cm round."
 P2 ladder[0] "Look at each side: is it in cm yet?" · P3 ladder[0] "Count what you added: four sides, not two."
 P3 Q2 ladder[1] "Run a finger along each side: the one that takes longer is the length." · P4 Q1 miss "Find 15 + 8 first, then the formula doubles that."
S2: P4 ladder[1] "Check it: length + breadth + length + breadth gives the same."
S3: (a) the gate follows a real tap on my keys or pieces in this phase (any pointerdown on the paper no longer counts).
 (b) A press on the shut Answer key or a keypad key, or a typed digit, while gated says a nudge by the pending act: "Tap Write in cm first." / "Put the Length tag on first." / "Tap Two lots first." / "Tap Walk first, then give the perimeter."
  When that act is done, the question comes back (api.say(item.say)). These four new lines need hi/gu TR at the language pass.
 (c) NOT DONE: Enter on a guide step does not count as a touch. check's enterRun walks the guide steps by REAL Enter, then needs a live keypad on every question; a phase-level Enter touch locks them all. The agent's check() and a real Enter also reach the same onEnter.
S4: the "1 m = 100 cm" chip shows only after Write in cm (P2 questions, P4 Q3), in the correction, and from the start in the P2 warm-up.
S6: Thumb draws the item's own shape (f.pts through ewFit: pentagon, triangle, quadrilateral or rectangle) in vermilion, plus the answer and its unit.
S5 skipped (main session). TR is still empty, so no TR keys changed.
Re-proved with REAL clicks and keys (lib/core/chrome.mjs cdpSession, the session playkit wraps; I needed a raw click on the paper):
 P3 Q1: short-side tap shows no Walk key and the pad stays locked; Answer press shows the nudge; long-side tap brings the Walk key and the question back; Walk unlocks; 34 wins.
 P3 Q2: wrong tag, Enter (a miss, hint shown); the side Hits are still live; right tag (typed s1), Enter wins.
 P1 Q1: wrong answer before the act; pad unlocked with the Walk key back; a real paper tap leaves it unlocked; 51 wins.
 No console errors.
Added data-role="ew-paper" on the paper rect (an attribute for probes only; it draws nothing).
Not done: S3(c) (above). Design pass not run.
