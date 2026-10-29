STATUS: ok (review round of 5 reports applied in one pass; full check 98 pass 0 warn 0 fail 4 info, ported)
SLOTS: M1.S2.T6.C28.2D1 Calendar Explorer (class 3 ch 10)
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S2.T6.C28.2D1/tool.tsx; pair class3/output-preview/indiannica_eng_maths3_ch10/M1.S2.T6.C28.2D1/
CHECKS: full 98/0/0 on run 2 of this message. Run 1 failed hint-key: my new window listeners took the in-page check's scripted keys and presses as real ones, so they now count trusted events only. Quick 32/0/0; tr-coverage passes; pack not rebuilt.
CHECKS (real input, playkit), all pass:
- Keyboard only in P1-P4: Enter x3 through the steps, then the answer typed, stays locked and shows the nudge.
- Q1.2: arrows Jan to Dec open the gate; 11 cards tapped 1.1 s apart all count; a tap on the dim Answer key shows the nudge.
- Steps: Grid view and Last month give no hint; step 3 moves on only onto Feb 2026. Two Enters 50 ms apart = one step.
- Wins after a miss are complete: Q4.1 4 rows + "28 days"; Q3.2 lit to 2048, no dashed years.
- Q4.3 keeps the 1st's ring and hops and adds the 24th's. P4 warm-up has no stray ring.
- All 12 ask frames clean; only Jan/Mar 31 from the steps and April 30 (your S1) show.
FAILURES: none open.
DECISIONS:
- 1 done: a real Enter or Space that performs a guide step arms that phase's first question. toolApi sends no keydown, so AI mode is never gated.
- 2 done:
  - Ghost years sit below the ruler and are cleared at the win; the date invite is the cell plus 3.
  - Win chips are sized to their words ("Wednesday", "4 અઠવાડિયાં").
  - Thumbnail text starts after a per-phase icon and is fitted.
  - Heading rows are 44 (mini page 40), with the hi/gu baseline raised.
  - "ઑક્ટો" drops to 28 only where it touches; P2 win rings no longer touch.
- 3 done: January counts at Q1.2's start; 12 nudge lines in hi/gu; Grid view and arrows are never a wrong act; taps during an act are queued (FIFO, no double act); a doubled real Enter does one step.
- 4 done: the win view finishes every route and clears the trace. 5 done: second ring (id date-end). 6 done: stray ring removed. 7 done: Q4.3 winMs 5200.
- 8 done:
  - Hop arcs run in the cell margin. Rivets clear the titles. Strip cards are taller and the tag is clear of the card.
  - Per-phase thumbnails and "Year 2045". A free-play invite on the 1st. Bigger P2 marks.
  - A one-colour correction page. Dim inert Q1.1 cards. Counting numbers at 32. One label per marker year.
  - Rounded wrist clip plus a tapered fallback.
  - Hindi lines shortened; मुक्त खेल; the doubled पर fixed in hi and gu.
- 8 not done:
  - The correction page still covers the unused fist while the keypad is open (the maths must-fix keeps it visible; it goes on the next act).
  - The mini page keeps Su..Sa (52-wide cells).
  - The strip beside the counter with the keypad shut and the Grid view look are unchanged.
  - The photo's own jagged thumb edge is unchanged.
- 9 done (hi/gu): closing "A week has 7 days, and a year has 365 days, a little more than 52 weeks."; learned "You learned: 7 days make a week, and a year has 365 days."
RISKS: none new; runtime items untouched, as you decided.
ESCALATE: none.
