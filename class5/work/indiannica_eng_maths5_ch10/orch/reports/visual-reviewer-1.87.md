STATUS: ok
Class 5 ch 10, slot M3.S5.T9.C30.2D1 (Date Counter), GUJARATI frames only, round 4 re-look. Verdict: CLEAN, no regression, no new defect.

What changed in gu: pack.json (built 14:21 UTC, tool 376b6907, pin r66) vs pack.prev.json (13:48 UTC, tool 06282a02): 0 of 33 gu frames flagged changed. By hash, 31 gu frames are byte-identical to the pack before; only the two party frames differ (volatile, never compared). The 41-44 changed frames are all en (13) and hi (31). So "no gu frame changed" is the finding, and the round-3 gu state stands.

Looked at at full 1600x900 (16 gu frames, not required by --changed, looked at because the brief named the pill, cards and summary):
 start page not seen; p1-ask-shut, p1-ask-open, p1-wrong, p1-win, p1-hintkey, p2-ask-shut, p2-win, p3-step1, p3-stepwrong, p3-ask-shut, p3-ask-open, p3-win, p4-ask-shut, p4-wrong, p4-win, p4-free, p4-summary, p1-party, p4-party.
Measured from the pixels:
 - Answer pill: "+25 દિવસ: 7 મે" 72 px tall outer, ink air 18 above / 14 below; longest pill "+14 દિવસ: 10 નવેમ્બર" (p4-party) spare 32 left / 31 right (round 3: 26-31, 70 tall): unchanged, one line.
 - Info cards (શરૂ / અંત / અવધિ / કૂદકો / તારીખ): 95 tall (outline 531 to 627); title ink 22 px under the top outline (p3-step1); "5 જૂન" ૂ tip 6 px above the bottom outline (value ink ends y 620, outline y 626): same as round 3.
 - "કૂદકો" (p4-ask-shut, card right): the ૂ tip ends y 581, the tinted title band ends y 579-580 (band vs card body is only 3-9 levels per channel): about 2 px crossing, same as last round. At 1600x900 and at 4x zoom it is not visible as a defect (4-6 px dark-blue tip over a near-invisible step); the tip is about 10 px clear of the "25" below. Not a finding.
 - Summary (p4-summary): "બંને: 9, 10" one line in its row chip, no clipping; four rows, stars, "પ્રથમ પ્રયાસમાં સાચા: 8 / 12", Free play (pink) and Play again (gold) clear, nothing under the keys.
 - After a miss (p1-wrong, p4-wrong): nothing red, no cross, slot empty, gold ring on the day only; no English left on screen apart from digits; nothing under the open pad.
 - Party (p1, p4): Kiko cheering inside his box, sparkles clear of bubble and pills, cones beside the bubble and above the 4th pill (known, not rated). Confetti lies over the pill text for a moment (known, runtime-drawn, not rated).

Unchanged since round 3 (hash-identical, not looked at this round): start-gu, p1-step1, p1-stepwrong, p1-end, p2-step1, p2-stepwrong, p2-ask-open, p2-wrong, p2-end, p3-wrong, p3-end, p4-step1, p4-stepwrong, p4-ask-open, p4-end; p1-again is sameAs p1-step1.

Findings: 0 must-fix, 0 should-fix, 0 questions. Scratch crops deleted; pack PNGs left in place.
