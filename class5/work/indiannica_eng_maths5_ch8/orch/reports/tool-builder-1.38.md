STATUS: ok
SLOTS: M1.S1.T3.C11.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T3.C11.2D1/tool.tsx
CHECKS: full 98 pass 0 warn 0 fail 4 info (1 full run), ported; quick 33/0/0, tr-coverage pass
FAILURES: none
DECISIONS: board centring kept (rule 6); pictures grown with the labels measured, not past the paper
RISKS: the label width is an estimate (errs wide), not a measurement
ESCALATE: none
Fixed:
- LABELS (1.7 #1/#2, 1.8, 1.9 must-fix, 1.17): every side label is laid out from its estimated width in the language on show and clamped 14+ inside the paper.
  - top/bottom labels are one line, 18 clear of the edge; left/right labels are stacked (number 44 over unit 32);
  - P2 '65 cm', the P3 breadth, P4 '3.4 m' and free '12 सेमी' stay inside in en/hi/gu; the top label clears the vermilion edge by 18.
- PICTURES (1.7 #5, 1.8, 1.9, 1.17):
  - the paper is now 468 x 512 (full height) and the working card 420 x 410, with the act key moved under the card;
  - square ~300 (was 250), triangle/rectangle/pond scaled to the room, field 400 x 300;
  - working lines at ONE size per question (40, or the size its longest line fits, 34 min), wrapping only if still too wide; hi Q3 strip no longer touches the edge.
- GRID: now a faint 1 px hairline (tint 0.78), not a counting grid.
- BOUNDARY: a written 'Boundary' (hi सीमा, gu સીમા) caption sits on every lit vermilion boundary (P1 square, P2 triangle, P3 rope, P4 path/field). The answer line carries its unit.
- THUMBS: the summary thumbnails carry the unit (cm/m, via TR).
- LENS: the handle is short and turned down-left, resting in the paper's lower right, clear of the card and the Lap key.
- P1 'card' hint -> "Every side of the square is 9 cm, so count them all." (hi/gu replaced).
- GU KEY LABEL: drawn at 36, so it uses the key's room.
- INVITE: the ring is now drawn under the key layer.
- PLAY 1: a decimal answer accepts any equal written number (31.20, 031.2, 31.2), like Q1's 68.0.
- PLAY 2: P4 Q1/Q3 rung 1 is now the tenths->metres slip ("Ten tenths make one metre, so divide by ten." / "Your count is in tenths; ten tenths make a metre."), then "Read each side ... in tenths". The phase ladder has two new non-repeating rungs; all in TR.
- PLAY 3/4 (gate desync): the gate starts unarmed on every new question, re-applies api.lock(want) on every run, and re-takes the pad after an act's end released it.
- PLAY 5: no act key while the correction draws.
- PLAY 6: on a locked question the Hint key brings the QUESTION back and clears the nudge. The nudge never shows while an act runs.
Proved with real input (playkit, motion on):
- P1 toolApi.next() -> Q2 still locked; a Copy press keeps it locked during and after the act (1 of 2); typed 36 is refused; gotoStep to Q3 (untouched) locks, opens after both acts.
- P4: a tap on the locked Answer key shows the nudge, and the Hint key then shows the question.
- P4 Q1: lens + ONE lap opens the key; after 680 the Lap key is gone through the correction.
- P4 Q3 (gotoStep 11): 31.20 wins. No console errors.
Not fixed (rule 6 / runtime, as instructed): two cues before the first touch, the 220 px centring slide shut->open, the hi summary row pitch, the star-row centring, Escape in the party, the emptied slot.
