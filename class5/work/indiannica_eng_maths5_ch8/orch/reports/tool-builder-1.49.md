STATUS: ok (final re-look items 1-11 done; full check 98/0/0, ported)
SLOTS: M2.S3.T7.C31.2D1
FILES: class5/work/indiannica_eng_maths5_ch8/M2.S3.T7.C31.2D1/tool.tsx
CHECKS: quick 33/0/0; full 98 pass 0 warn 0 fail 4 info (1 run), tr-coverage PASS, ported. Playkit with reduced motion ON (en/hi/gu) and OFF (en).
FAILURES: none
DECISIONS: item 3 = a ring only where the child wrote the WRONG letter (an unmarked square is filled in with no ring); item 8 S1 = hint changed, targets kept (KEEP list)
RISKS: item 1 workaround uses the runtime's api.openAnswer/closeAnswer under the lock (no visible panel, proved); hand cells are 55 units, so the H letters on the bottom row cannot clear the cut line by 12px
ESCALATE: runtime gap: press() returns on L.locked before api.onEnter, so a hardware Enter while the pad is shut never reaches the tool; a keyOnly "hint" hint is not cleared by api.lock or api.say
1 FIXED (tool-side workaround, runtime untouched). When the first tap shuts the pad and a hint is on show, the tool calls api.openAnswer() (it clears a keyOnly hint), api.lock(true) at once (so no panel shows), and api.closeAnswer() 330 ms later (it empties the "type" line). Then the nudge is said. Playkit, P2: Hint key, then a tap on a square. Bubble = nudge; getState().hint = null; Answer key off. Proved in en/hi/gu with motion off, and in en with motion on.
2 FIXED. In the correction, the half line and the tints are drawn under the letters and the chips over them. L chips sit at the point of the outside part farthest from the line, M chips at that point of the inside part, so the child's letter and the chip are on opposite sides of the line. Chip width follows the language (en 30, hi 34, gu 38).
3 FIXED. Typed 7 with no tap: 0 rings (en/hi/gu, motion on and off). 12 M then 7: 5 rings (gu).
4 FIXED. Every letter now sits at the point of its part farthest from the traced line (sampled, kept off the cell edges), and the outline stays under the letter layer with an 8-unit paper halo. P4: "estimate" moved 8 units lower (hi अनुमान clear of the sum row). Row pitch 50 to 48, so the Pair key still clears the card. Limit: the hand's 55-unit cells cannot give 12px clearance in a half-cell.
5 FIXED. H letters are sized to their half: en round(0.32 s), hi/gu round(0.28 s), never under 28. The same farthest-point placement keeps the bracket ends (at the cell centre, mid-hypotenuse) clear of the letter.
6 FIXED by the item-2 placement: corner L chips and the right-tip ઓ sit in the outside part, away from the line (gu solve sheet checked).
7 FIXED. Counted tiles #8F7BF0 at 0.92 (HSV sat about 0.44 over the beige tile); the Whole swatch uses the same violet.
8 FIXED, with TR. S1: the P2 step 2 hint is "Tap the sliver square the ring is on." (the targets are kept). S2: the P3 Q1 miss is "Join the halves two at a time." S3: the P2 Q2 miss is "Look at the ringed square again."
9 FIXED. Squares and Pair stay dead for the whole correction (tracing ref). The double-tap guard is now 600 ms, and a Pair tap in the first 700 ms of a question is ignored.
10 DONE. Deleted by exact name: play-pt116-p2q1-12M-win-en.png, play-pt116-corr-p2-gu.png, play-pt116-p4q1-hand-gu.png, play-pt116-untouched-typed-win-p2.png.
11 N/A: the tool uses no keepFocus / Hit keep pattern.
