STATUS: DONE (all 7 items in place and proved; no source change this session)
SLOTS: M2.S3.T6.C28.2D1
FILES: none changed by me (tool.tsx as left by 3.14, ported by the full check)
CHECKS: full check 1/6: 97 pass 0 warn 0 fail; playkit real input en/hi/gu
FAILURES: none
DECISIONS: kept the card queue (glide 1.2 s), no glide change
RISKS: published tool now differs locally (unpublished)
ESCALATE: no
tool-builder-3.18 | class 4 ch 12 | M2.S3.T6.C28.2D1 Time Columns | resume of 3.14's list
STATE AT START: quick check 32/0/0 (the source compiled, no half edit). 3.14 had written ALL seven items into tool.tsx; nothing was proven. I changed no source: I proved each item with real input (playkit, one Chrome of my own, C4_CHROME_POOL=1) and ran one full check.
1 p4 59/60 (done by 3.14, proved): a question with two breaks writes its rewrites at 40 (pen 7) and stacks them further apart. Measured en/hi/gu, p4 wrong + win + end: Minutes 59 ink y 281-310, struck 60 y 326-355 (strike 334-347) = 16 px gap; heading chip bottom 264 to the 59 = 17 px. Same numbers in all three languages.
2 End state (done by 3.14, proved): a won question (win AND idle) keeps its whole picture. p2-end: the carried 1 in the circle, 60-grid filled (#dba1c1), caption "60 s = 1 min", rows "45 + 38 = 83 seconds = 60 + 23 = 1 minute 23 seconds". p3-end: two strikes + rewrites 11/65, grid filled, "1 min = 60 s". p4-end: 2 over struck 3, 60 and 59 over 00, 60 over 00, grid filled. Same in hi/gu.
3 Hints (done by 3.14, proved in source + bubble frames): P2 Q1 miss / rung 2 / rung 3:
 en "60 minutes make 1 hour, so minutes past 60 go over to the hours." / "Like 40 + 35 = 75 minutes: 60 make 1 hour, 15 are left." / "Minutes stop at 59, so take out 60 as 1 more hour and keep the rest."
 hi "60 मिनट का 1 घंटा होता है, तो 60 से ऊपर के मिनट घंटों में जाते हैं।" / "जैसे 40 + 35 = 75 मिनट: 60 से 1 घंटा बना, 15 बचे।" / "मिनट 59 तक ही होते हैं, तो 60 को 1 घंटा बनाओ, बाकी रखो।"
 gu "60 મિનિટનો 1 કલાક થાય, તેથી 60 ઉપરની મિનિટ કલાકમાં જાય." / "જેમ કે 40 + 35 = 75 મિનિટ: 60નો 1 કલાક થયો, 15 બાકી." / "મિનિટ 59 સુધી જ હોય, તો 60નો 1 કલાક બનાવો, બાકી રાખો."
 Worked box (after a miss / at the win only): "48 + 37 = 85 minutes = 60 + 25 = 1 hour 25 minutes" / "6 + 2 + 1 = 9 hours" at 32; text x 108-932 en, 168-872 hi, 177-863 gu inside the box 80-960 (open keypad at 980). Tightest: p2 Q3 en "45 + 38 = 83 seconds = 60 + 23 = 1 minute 23 seconds" x 87-953 (7 px inside the box edge each side, no collision).
 No stale old keys left in TR (grep: "is 1 hour 15", "not 75 minutes" absent).
4 P2 Q2 rungs (done by 3.14): en "Like 40 + 20 = 60 minutes: that is 1 whole hour, no minutes left." / "Add the hours, then add 1 more hour for the 60 minutes." hi "जैसे 40 + 20 = 60 मिनट: यह पूरा 1 घंटा है, कोई मिनट नहीं बचा।" / "घंटे जोड़ो, फिर 60 मिनट का 1 घंटा और जोड़ो।" gu "જેમ કે 40 + 20 = 60 મિનિટ: તે આખો 1 કલાક છે, કોઈ મિનિટ બાકી નહીં." / "કલાક ઉમેરો, પછી 60 મિનિટનો 1 કલાક વધુ ઉમેરો." Hours only, no "write 00".
5 Captions (done by 3.14, proved): the 60-grid captions now spell the words out (TR "60 मिनट = 1 घंटा", "1 મિનિટ = 60 સેકન્ડ" etc.; only the "60 डिब्बे / 60 ચોરસ" start caption is short); caption ink bottom y 251, cell outline 269: 17 px clear in en, hi and gu (ink measured on the PNGs). Rows box bottom 198, heading chips top 210: 12 px.
6 Check after the win (done by 3.14, proved): disabled, flat, taps ignored (aria-disabled true) beside the live Next / Next phase / Summary key in p3-win, p3-end, p4-win, p4-end, all languages; on screen it is a pale flat key with a faint label.
7 P1 card taps during a glide (done by 3.14 as a QUEUE, glide kept 1.2 s, proved with motion on): six cards tapped in 1.1 s glide one after another; Answer key disabled at 1.46/2.07/2.86/4.36/5.87/7.16 s (cards placed 1,1,2,3,4,5), all six placed at 7.27 s, then the right answer won (tries 0). Glide time not touched, so no p4 lock re-proof was needed (the pencil acts are unchanged).
Kept: no hand, touched flag, Enter on a guide step, miss-clears-slot, 3 languages, nothing at x >= 980 with the pad open (box ends 960) or under the key corner.
Console: 0 errors in every probe run (p1, p2, p3, p4 in en/hi/gu).
FULL CHECK (1 of 6): 97 pass · 0 warn · 0 fail · 5 info (en,hi,gu; board-fit, label and lane rows inside the pass), PORTED to output-preview. It is a PUBLISHED tool (2026-11-14 14:54): the local pair has changed since; not published.
Open/notes: the queued glides take about 7 s for six cards (play tester question b); the hi worked box's two rows remain tight (about 6 px of ink), as before. Scratch probes and the play-*.png frames (3.14's and mine) deleted.
