STATUS: ok (re-look 1.9 fixed: 1 must-fix, 4 should-fix, plus your Q4.2/Q4.3 heading decision; full check 98 pass 0 warn 0 fail 4 info, ported)
SLOTS: M1.S2.T6.C28.2D1 Calendar Explorer (class 3 ch 10)
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S2.T6.C28.2D1/tool.tsx; pair class3/output-preview/indiannica_eng_maths3_ch10/M1.S2.T6.C28.2D1/
CHECKS: full check 98 pass 0 warn 0 fail 4 info, ported (1 full check this message); quick check 32/0/0, tr-coverage passes. The review pack was not rebuilt.
CHECKS (real input, playkit, visible work text outside data-scale):
- Q2.2 opens with Jan 31, Feb "28 or 29", Mar 31, Apr 30, Jul 31. Dropping Aug on June's free dip adds no number. June dropped on May's knuckle, then typing 30, is a miss with hint "Count along from April: May, then June.".
- Q2.3: Dec on Sep's dip and Nov on Oct's knuckle add no number. A wrong answer shows "Say August, September, October along the second fist to find their own spots.".
- Q3.1-Q3.3: the arrows prev/next are off.
- Headings: Q4.1 shows all 7; Q4.2 shows only "Sun"; Q4.3 shows only "Mon".
FAILURES: none open.
DECISIONS:
- Must-fix: during a question a card shows its days only on its OWN spot; anywhere else it shows its name only, with no colour band. The asked months show days only at the win, as before.
- S1: Q2.2's board now has April on its own dip (reads 30). The Q2.2 miss line is "Count along from April: May, then June.".
- S2: the Q2.3 miss is "Say August, September, October along the second fist to find their own spots.". Your wording ("... find each card's own spot.") is 84 characters, over the 80-character hint limit, so I shortened it.
- S3: the Q1.3 win line is "Yes, 364 days and 1 more make 365 days, a whole year.". Note: as the phase's last question, keyOnly shows the closing in its place.
- S4: the month arrows are off in the phase 3 questions; they stay in the phase 3 warm-up, phase 1 and free play.
- Your decision: Q4.2 and Q4.3 show only the heading the question names (Sun, column 1; Mon, column 2). The other six appear at the win.
- TR: each changed English line got its new hi and gu key in the same edit, and the old keys were removed (194 entries).
  - Q2.2 miss: अप्रैल से आगे गिनो: मई, फिर जून। / એપ્રિલથી આગળ ગણો: મે, પછી જૂન.
  - Q2.3 miss: दूसरी मुट्ठी पर अगस्त, सितंबर, अक्टूबर बोलो और उनकी अपनी जगह ढूँढो। / બીજી મુઠ્ઠી પર ઑગસ્ટ, સપ્ટેમ્બર, ઑક્ટોબર બોલો અને તેમની પોતાની જગ્યા શોધો.
  - Q1.3 win: हाँ, 364 दिन और 1 दिन मिलकर 365 दिन, यानी पूरा एक वर्ष। / હા, 364 દિવસ અને 1 દિવસ મળીને 365 દિવસ, એટલે આખું એક વર્ષ.
RISKS: none new. No runtime gap logged.
ESCALATE: none.
