STATUS: done, NOT uploaded. C21 key/chip fix. Quick 33/0/0; full 98 pass / 0 warn / 0 fail (motion-on and reduced rows); PORTED.
Changes:
- The "Stack rows" key is now 236 wide in en/gu and 262 in hi, right edge kept.
- hi/gu bottom chip moved 2 down, side chip 2 further out, row numbers 2 further left.
- The rest of the one-tap fill is untouched.
Measured with real input (playkit, motion on), the invite ring sampled every 15 ms for 2.4 s, DOM boxes in stage units:
- Ring-to-chip minimum gap: en 32.7/32.3/32.7/22.2 (guide/Q1/Q2/Q3); hi 35.4/35.0/35.4/24.9; gu 64.2/63.8/64.2/53.7. The ring's leftmost point is 654.7 (en/gu) or 625.9 (hi).
- Key label margins (text box, so the ink margins are at least these): en 27.5/27.5, hi 22.0/22.0, gu 39.3/38.7. No console errors.
- Not done: no pixel ink scan; these are DOM box gaps.
The play tester's play-G3/G4 frames are left in place.
