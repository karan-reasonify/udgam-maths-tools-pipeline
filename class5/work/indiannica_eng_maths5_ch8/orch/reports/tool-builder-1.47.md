STATUS: ok (final small round: full check 98 pass 0 warn 0 fail, ported; 1 full run, C4_CHROME_POOL=1)
SLOTS: M1.S1.T2.C6.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T2.C6.2D1/tool.tsx
ESCALATE: no
C6 Edge Walker, C6-final-fixes.md items 1-6 only. Quick check 33/0/0. Full check 98/0/0 and ported; the check runs both reduced-motion and motion-on sessions (action-anim, party).
1 FIXED (P3 Q1/Q3 short-side tag):
 - The bubble shows the hint "Tap a longer side first." at once (hi/gu TR existed).
 - The wrong "Length 6 cm" pill clears after 1.5 s: the tag goes back to the tray and the 6 cm side reads plain "6 cm".
 - The long pair stays amber, and the strip's "Length = 11 cm" is now in the deep-blue given ink, not answer-green.
 - Real clicks en/hi/gu: +0.3 s the bubble shows the hint line; +2 s no Length word on the 6 cm side. A long tag then Walk works.
2 FIXED (P3 Q2 portrait 5 x 12):
 - The rectangle went from ~10% to 28% of its paper in en/hi/gu (276 x 359; 34% of the usual paper size).
 - How: Q2's one working line moves into the key row, which gives the paper the strip's band (paper 427 tall; strip drawn only when it holds a line). The short sides' pills sit INSIDE the rectangle (two-line once tagged). Portrait aspect clamp 1.3.
 - Same item: the agent's check() now performs only the act the question needs, so an AI-mode Q2 win no longer draws a walk sum over "Length = 12 cm".
3 FIXED: every side pill sits 18 from the side's centre line, so it is 12 clear of the 10-wide lit stroke. The margins grow to match, keeping 12 to the paper edge.
 - Measured with real clicks on the lit frames: P3 Q1 and P4 Q1 pill-to-stroke = 13 px in en, hi and gu.
4 FIXED: the step-1 ring moved to the long side that carries no pill before the tag (the bottom side; the left side on the portrait). It no longer touches the "9 cm" pill.
 - The step's "length" control moved with it; a tap on either long side is still accepted.
5 FIXED: whether focus was in the working area is now tested BEFORE the act (press and side taps).
 - Real keys en/hi/gu, P2: Tab to Write in cm, Enter, and focus sits on Walk at +0.4 s and +3 s.
 - BODY only where no live control is left (after Walk; P4 after Two lots), as the play tester said is right.
6 FIXED: P3 Q1/Q3 pre-tag nudge is now "Tap the side that is the length first." (hi "पहले वह भुजा दबाओ जो लंबाई है।", gu "પહેલાં લંબાઈવાળી બાજુ દબાવો.").
 - "Put the Length tag on first." stays in TR because P3 Q2 still prints it (the maths reviewer said it is right there).
Nothing else changed. No play-*.png touched; my scratch files are deleted.
