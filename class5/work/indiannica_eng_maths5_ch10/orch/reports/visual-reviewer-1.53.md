STATUS: ISSUES (0 must-fix, 2 should-fix, 0 questions)
visual-reviewer-1.53 · class 5 ch 10 · M1.S1.T2.C8.2D1 Three Hands Clock · Hindi only · RE-LOOK round 4 · pack r66 built 13:43
Looked at (full 1600x900, all hi, flagged changed): start; p1 step1, stepwrong, ask-shut, ask-open, wrong, win, hintkey, end; p2 step1, stepwrong,
ask-shut, ask-open, wrong, win, choice, choice-line, choice-wrong, end; p3 step1, stepwrong, ask-shut, ask-open, wrong, win, end; p4 step1, stepwrong,
ask-shut, ask-open, wrong, win, end; free; the party frames p1 and p4. Unchanged since round 3: p4-summary-hi (changed:false); p1-again-hi = p1-step1-hi (sameAs).
Pixel measures on the PNGs (1 px = 1 stage unit), crops kept in the scratchpad only.
Round-3 fixes:
1 PARTLY (p3 and p4: step1, stepwrong, ask-shut, ask-open, wrong): the ring (r about 31.5, centre 620,270 on the 1600 stage) is on the grab knob, not the numeral, and
  clears the knob (gap about 8 px). But when the knob rests at 12 the ring's top arc (y 238-244) crosses the FOOT of the "12" (glyph bottom y 248): the base of
  the 1 and 2 is struck by the pink ring, so the 12 is readable but not whole. The 12's ivory disc also clips the knob's dark rim flat across its top.
2 OK: green answer text gap to the panel's inner border: p3-wrong 21/19, p3-win 21/19, p3-end 22/19, p4-end 23/21 (was 13/8, 15/10, 14/10), all above 14. p1 63/60 (wrong/win), 48/44 (end);
  p4-wrong/win 25/25 two lines, fine.
3 OK: p1-end and p1-party read "तो 60 सेकंड का 1 मिनट, 60 मिनट / का 1 घंटा, और 24 घंटे का 1 दिन।": 2 lines, no "=", no orphan, inside the bubble.
4 PARTLY (p2-wrong): nothing overlaps and the card (blue, 2 lines) reads fine, but measured: dashed ring bottom y 481 to card top y 490 = 8 px clear (asked 11); card bottom y 577 to the
  strip's bottom outline y 581 = about 4 px clear (asked 10). The card sits nearly on the strip floor.
5 OK: every numeral has a soft ivory disc over the hands (hand tips end under it at 2, 9, 4, 10, 7); no speck, no hard-edged look (see 1 for the one spot where it meets the knob).
6 OK (start-hi): hour tip stops about 3 px short of the 10's disc (about 6 px from the 0); the minute tip ends under the 2's disc.
Findings:
[should-fix] p3 and p4, step1 / stepwrong / ask-shut / ask-open / wrong, hi — invite ring strikes through the foot of the 12 and the 12's disc nips the knob rim, only when the knob sits at 12 (top of the dial)
  — put the numerals (text) above the ring so the ring passes behind the 12, or cut the ring to r 22 or less; draw the knob and ring above the 12's disc so the rim is not clipped.
[should-fix] p2-wrong, hi — correction card is 8 px under the dashed ring and 4 px above the strip's bottom outline (asked 11 / 10) — lift the card 3 px and give the strip about 6 px more
  height (or move the ring up), so both gaps reach 10 or more.
Other Hindi checks, all clean: no English left on screen (units are घं / मि / से; a.m./p.m. read पूर्वाह्न / अपराह्न), no red and no cross after a miss (amber, violet, peach only), nothing under the
open pad (left content ends x 955, pad starts 980), matras clear of lines in the bubbles, keys, tags and panels, every label one line or an authored two-line break (time cards, choice keys).
Not rated (known, runtime-drawn): orphan last words in bubbles, hint-only bubble after a miss, party cones, summary size.
