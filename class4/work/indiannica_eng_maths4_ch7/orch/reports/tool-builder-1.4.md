STATUS: ok
SLOTS: M2.S4.T7.C30.2D1
FILES: class4/work/indiannica_eng_maths4_ch7/M2.S4.T7.C30.2D1/tool.tsx (only; no English line changed, so no TR key moved; check ported the pair)
CHECKS: ONE full check 95 pass / 0 warn / 0 fail / 3 info (tr-coverage 75/75, board-fit, one-line-bubble, hint-lines-clear, action-anim, next-key pass)
FAILURES: none
DECISIONS (round-4 list, all 14 handled):
- MUST 1 bay refusal note: [ms,fn] runs fn THEN waits, so the old [460 note][760 head][320 clear] kept the note behind the parked cart. Now [320 hold at bay][560 roll to head][1500 print note][0 clear]; probed with real input: cart at bay, then head, note on the bare bay ~1.5 s.
- S2 p1 sign: x 70 -> 182 (RL.X0+32) in the strip gap, T.label -> T.xl 56 (40 px "<" read as a tiny chevron), baseline +17; RL.rowB 358 -> 368 so the gap and the 40 px fractions are not crowded.
- S3 summary order Thumb: RlFrac maxW = step-24; signs only when step >= 50 (4 cards = 55, kept, none dropped); crops checked en + hi.
- S4 line-up strips: sh 36 -> 52 (not 64: 64 overlaps the Next pair / Fill key at keyY 434); RlStrip thin: cuts 1.5, wholes 3, non-whole cuts skipped under 10 px a cell.
- S5 bay plaque reason T.micro -> T.speech 44, one line each, plaque 480-760 wide, shifted left if needed.
- S6 "one/whole" 28/600 grey -> 32/700 ink (hi/gu "one" baseline 14); reader "N wholes" 32/700 ink; direction label 32/700, box 202 -> 242 (board width ww-272, cards 280 -> 276).
- S7 strip-row fractions 32 -> 40 (T.prompt). S8 cart card lift -14 -> -8 and RL.cartY 54 -> 60 (set-cart cards 86 -> 80 tall); ring clears the gate plaque by ~3 px.
- S9 StartArt gate plaques +30 wide (gx 0.285w / 0.51w). S10 bay "not yet" baseline 38 for hi/gu only (gate plaques stay 34: the tail of ऊ would touch the bottom border).
- S11 reader cake wash 0.6 -> 0.35, stroke kept (olive, crust highlights show; 0.25 would go further). D12 untaken wash 0.86 -> 0.5, no check complaint. D13 kept cart ring. D14 widow = runtime, untouched.
RISKS: the 8/12 strip in the line-up stays a ~33 px box (shared unit with 8/1's 8 wholes; per-card unit would be a bigger change). Frames looked at: sign win, refusal, bay win (en, hi, gu), order wins incl. 8/1 reader (en, hi, gu), pick + lifted card, summary thumbs (en, hi), wrong sheets (en, hi), start (en, gu). Own PNGs/probes deleted.
ESCALATE: none
