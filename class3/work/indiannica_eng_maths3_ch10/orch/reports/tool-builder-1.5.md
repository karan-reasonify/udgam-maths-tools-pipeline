STATUS: ok (the 5 items of the changes-only maths re-look are applied; full check 94 pass / 0 warn / 0 fail, ported; the pack was not rebuilt)
SLOTS: M1.S2.T5.C22.2D1 Write the Date (class 3 ch 10)
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S2.T5.C22.2D1/tool.tsx · pair in class3/output-preview/indiannica_eng_maths3_ch10/M1.S2.T5.C22.2D1/
CHECKS: quick 30/0/0 (tr-coverage and bubble-no-repeat pass); full 94/0/0, ported (1 full run).
DECISIONS:
- Each wording change replaced the English line and its TR key together, with new Hindi and Gujarati.
- 1: P3 Q1 rung 3 is now "Tap that name on the ladder, then type the day and the year from the card." / hi "सूची में वह नाम छुओ, फिर कार्ड से दिन और वर्ष लिखो।" / gu "યાદીમાં તે નામ સ્પર્શો, પછી કાર્ડમાંથી દિવસ અને વર્ષ લખો."
- 2: P2 rung 3 is now "Read your date aloud: the day, then the month, then the year." / hi "अपनी तारीख ज़ोर से पढ़ो: पहले दिन, फिर महीना, फिर वर्ष।" / gu "તમારી તારીખ મોટેથી વાંચો: પહેલાં દિવસ, પછી મહિનો, પછી વર્ષ."
- 3: P3 Q3 miss is now "Count the digits in the day box and the month box." / hi "दिन वाले खाने और महीने वाले खाने के अंक गिनो।" / gu "દિવસના ખાના અને મહિનાના ખાનાના અંક ગણો."
- 4: P2 Q2 miss is now "The day goes first and the four-digit year goes last." / hi "दिन पहले आता है और चार अंकों वाला वर्ष आखिर में।" / gu "દિવસ પહેલાં આવે અને ચાર અંકનું વર્ષ છેલ્લે."
- 5: after a miss, the Enter of a stale answer returns early in the runtime, so the hint never cleared. The nudge now first calls `api.openAnswer()` (the runtime's own card tap, which clears a hint; the pad is not locked after a miss), then says "First tap this card's month on the ladder."
  - Real-input probe (P2 Q1, wrong month, then a miss): Enter showed the nudge on the bubble in place of the hint; tapping August brought the question back; 9 Enter 2013 Enter won.
  - Side effect: that Enter also opens the keypad. Digits stay ignored until the month is tapped.
FAILURES: none
RISKS: free-play nit left as decided (a day typed 05 stays 05 in the box). The check gap from before (no row certifies the P3 Q2/Q3 corrections) is still open.
ESCALATE: no
