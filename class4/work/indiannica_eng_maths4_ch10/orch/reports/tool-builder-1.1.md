STATUS: ok
SLOTS: M1.S2.T4.C15.2D1 (Tower Builder, class 4 ch 10)
FILES: class4/work/indiannica_eng_maths4_ch10/M1.S2.T4.C15.2D1/tool.tsx only (ported pair re-ported by the passing check)
CHECKS: quick 30/0/0; ONE full check 95 pass / 0 warn / 0 fail (ported). Real-input probe (playkit, reduced and real motion) proved fix 2.
FAILURES: none
DECISIONS: every changed English line changed its TR key (hi + gu) in the same edit, byte for byte; old keys removed.
 1. ML1 miss (~:306) = "Each box stands on exactly two boxes below it." P1 miss (~:310) = "Add two boxes at a time, not all three." (was "Look at the two boxes right under it."; aims at its near miss 20 = 8+5+7, a different idea from ML1's miss and the ladder).
 2. Third miss at one middle box: per-box counter (boxMiss ref). Misses 1-3 stay real runtime misses (api.submit({inner: v}) unchanged). On the third, api.capture(null) then ONE pencil act (api.act push 1.3 s, new pencilBox) writes "= N" on that box's line of the working (pair stays lit) then the digits into the box, the box is filled and the child carries on to the next. Box tap and invite off during the act; new state field `fix`. Probe (P2, first middle box, three wrong 7s): hints miss, ladder[0], ladder[1]; after the 3rd the working reads "14 + 16 = 30" and the box shows 30; the next box takes the right 36 with tries still 3; no console errors.
 3. Last rungs generic, no numbers: P2 "Say the sum of the two boxes under the one you fill." (was "Start with 14 and 16..."); P8 "Say the product of the two boxes under the one you fill." (was "Start with 2 times 3...").
 4. ML3 say = "Does one operation make every box?"; phase 3 ladder[0] = "Does the same sign make this box too?" (was "Does that box match the sign of the rest?"). DEPARTURE: not the identical sentence for both, because bubble-no-repeat fails an exact or near copy inside one phase run (the say and the ladder share the run); ladder[0] keeps the same fix ("make", not "match") in other words.
RISKS: new hi/gu lines (6) are mine: a native-speaker look is advised. Terms as already in the tool (चमकते/ચમકતા, संक्रिया/ક્રિયા, जोड़/સરવાળો, गुणनफल/ગુણાકાર). No runtime gap.
ESCALATE: no
