STATUS: ok (re-look items applied in one pass; full check 95 pass, 0 warn, 0 fail, 5 info, ported)
SLOTS: M1.S1.T2.C6.2D1 Read the Clock (class 3 ch 10, r3 silent)
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S1.T2.C6.2D1/tool.tsx; ported pair output-preview/indiannica_eng_maths3_ch10/M1.S1.T2.C6.2D1/
CHECKS: quick check 31/0/0; one full check 95 pass, 0 warn, 0 fail, 5 info, ported. Item 1 re-probed with playkit (real keys and clicks). Pack not rebuilt.
FAILURES: none open.
DECISIONS:
1 done (nudge drawn over a miss hint):
  - When a miss hint is up, nudge() first clears it through the runtime's own openAnswer (keyOnly brings the question back on an Answer tap; a pad:"enter" question draws no panel), then says the nudge.
  - Probe Q3.3: miss at 3:15, then Enter with no move: the bubble shows "Move a hand first."; the question comes back on the next move.
  - Probe Q3.2: miss with 40, then a tap on the off Minutes key: the bubble shows "For this question, count the fives yourself." (the keypad opens); the question comes back on the next key.
  - 1.2 and 1.3 share the same nudge().
2 done (English re-look):
  - digital captions 32 (36 touched the card's edge);
  - the closing is now one line with no comma paging: "Yes, 7:45 is quarter to 8, so 15 minutes are left until 8.";
  - both hands have straight sides and a ROUND end (no arrowhead, not a spear);
  - the "60" win badge is kept clear of the card's top.
  - Left open (questions): the green rings on 3, 6, 9 in the steps.
3 done (Hindi):
  - closing TR "हाँ, 7:45 पौने 8 है: 8 बजने में 15 मिनट बाकी हैं।" (two lines, no calque);
  - the bus is 170 x 62, same aspect, same baseline.
4 done (Gujarati):
  - "બીજી સંખ્યા સુધી જવા પગલું દબાવો."
  - "મિનિટ કાંટો 3 પર ખેંચો અથવા દબાવો."
  - free play "કાંટા ફેરવો અને ગમે તે સમય ગોઠવો."
  - closing "હા, 7:45 એટલે પોણા 8: 8 વાગવામાં 15 મિનિટ બાકી છે."
Your decisions are kept: pack artefacts, the 1.3 keyboard double message, runtime part labels and aria-labels, ચક્કર/આંટો.
RISKS:
- The hint clear uses the runtime's api.openAnswer; on a typed question it also opens the keypad.
- Fence and permissions: respected.
ESCALATE: no
