STATUS: done
SLOTS: M2.S4.T8.C38.2D1
FILES: work/indiannica_eng_maths4_ch12/M2.S4.T8.C38.2D1/tool.tsx, work/indiannica_eng_maths4_ch12/NOTES.md
CHECKS: full 98/0/0 (1 of 6), ported; quick 32/0/0
FAILURES: none
DECISIONS: big Jun/Aug tens-blocks 56x56 left, context rack of 10 months fades with keypad; weeks as 40x80 bars
RISKS: count pages 48x52 (floor met, aim 56-64 not); right side empty in Weeks/Count with pad shut
ESCALATE: two questions (see below)
tool-builder-3.8 · class 4 ch 12 · M2.S4.T8.C38.2D1 Calendar Counter · C38 SECOND PASS (far-bench cells) · edits to tool.tsx scene functions + layout constants only (no change to doSort/doWeeks/lock/traceback/TR/PHASES)
LAYOUT CHOSEN (Sort, phase 1 Q1): June and August as BIG tens-blocks stacked at the left (rows of 10, June 3 rows, August 3 rows + 1), label Jun/Aug at 40 (36 hi/gu), win chips (48) right of each block; whole block x 0-882, same size and place open or shut. The other TEN months (31s, 30s, Feb, grouped) are a small context rack at x ~900-1460, y 110-506 (below the key corner), shown only while the keypad is shut: opacity follows box.w, unmounted at the open width (fade, no jump). Traceback ring on Jun/Aug blocks + July in the context rack, numbers only at the win / traceback ring 2, as before.
SIZES (stage units), before -> after:
- Sort June/August: 22x26 cells, one row of 31, tens gap 10, packed in x 116-896 -> 56x56 cells, dark outline 3, rows of 10, tens 16 apart (month gap 28).
- Sort other months: 22x26 -> 10x26 context only (not counted), labels 32.
- Weeks ruler: day cells 22x22 in rows of 7 (a week 22 tall), 4 blocks of 154 wide, leftover day 22x22 -> a week is a standing bar 40 wide x 80 tall (7 days inside as lines), 13 bars a band (8 apart), 4 bands 16 apart, "13 weeks" chips at the left (gu chip 190 wide, bands start 32 further right), leftover yellow day 56x56 after band 4; Weeks key moved to bottom-left (0,440 220x80), "52 weeks + 1 day" caption beside it. All inside x 0-894.
- Count pages (phase 3): 48x46 -> 48x52 (page 388 tall, clear of the parts box).
- Saturday page (P1 Q3): 68x54, unchanged. Phase 2 February page: 54x54, unchanged. Wall cards: not a counting place, unchanged.
FAR-BENCH TEST (frames made with my own playkit Chrome after REAL taps: steps, Sort, Answer key; Weeks; switches + Count; plus win/wrong/hi/gu), downscaled to 800x450 and read: June = 3 rows of 10 and August = 3 rows of 10 + 1 countable from the half-size picture alone (pad shut, pad open, after a miss); weeks: 13 bars per band, 4 bands and the yellow day countable; count pages: lit days and dates readable. PASS.
FULL CHECK (1 of 6 used): 98 pass · 0 warn · 0 fail · 4 info, ported (board-fit, label/lane rows green en/hi/gu). Quick check 32/0/0.
RULE DEPARTURE (written in NOTES.md under C38 SECOND PASS): PATTERNS/LAYOUT "one size open or shut" kept for everything counted; only the NOT-counted context rack fades out as the keypad opens. Weeks "40 tall": 52 rows of 40 cannot fit 520, so a week is a bar 40 wide x 80 tall (>= 40 both ways).
NOT DONE / OPEN (questions for the main session):
1. Weeks and Count pages still leave the right ~570 empty with the keypad SHUT: both must stay inside 900 at one size (Count's switches and Count key cannot hide under an open pad, ?answer=open would make it unplayable), so Count cells stay 48 wide (52 tall): meets the 48 floor, not the 56-64 aim. OK, or should the switches move?
2. Wording: miss "Find the June row and the August row, then count the days in each." now points at blocks of 3-4 rows; "block" would need new TR keys. Keep?
Scratch files removed (play-*.png, scratchpad probes). Not touched: other slots, runtime, docs, images.tsx. Not published.
