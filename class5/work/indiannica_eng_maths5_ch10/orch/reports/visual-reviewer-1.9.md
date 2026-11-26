STATUS: ISSUES (gu only: 3 must-fix, 6 should-fix, 5 questions)
SLOTS: M3.S5.T8.C29.2D1
FILES: none changed (read-only; no extra files made)
CHECKS: 37 gu frames looked at in full size, pixel gap measurements
FAILURES: see MUST-FIX 1-3
ESCALATE: no
VISUAL REVIEW, GUJARATI ONLY - M3.S5.T8.C29.2D1 Month Calendar, ch10, r66 silent. Verdict: ISSUES (3 must-fix, 6 should-fix, 5 questions).
Looked at: all 37 *-gu.png of pack/pack.json at full size (start, p1 x10 incl. party, p2 x10, p3 x7, p4 x10 incl. summary/free/party); p1-again skipped (sameAs p1-step1). Pixel-measured heading/border/label gaps. Made no extra files. en/hi not judged.
MUST-FIX
1. p1-end-gu, p1-party-gu: green "7 મહિના" chip (x 243-765, y 437-518) lies across the first row of month cards and hides the names of cards 2-5 (ફેબ્રુ, માર્ચ, એપ્રિ, મે) and the amber ring on the Feb card. Same as English. Move the chip off the cards (into the 31-day bar or beside the board).
2. p4 every frame (step1, stepwrong, ask-shut, ask-open, wrong, win, end, party) and p4-free-gu: legend "બાકી દિવસ" wraps to 2 lines (x 848, y 185/221); p4-free also wraps "આવતો મહિનો". Legend column is ~110 wide while x 930-1250 is empty. Widen the column so each label is on ONE line.
3. p4-ask-shut, p4-ask-open, p4-wrong, p4-win, p4-party (heading જાન્યુઆરી 2027) and p4-end, p4-party (ફેબ્રુઆરી 2028): the ુ of "ન્યુ"/"બ્રુ" (x 137-152) comes down to y 142 and the day-name header's top line is at y 143: 0 px gap, the heading touches the table. (p3 headings ઑક્ટોબર/સપ્ટેમ્બર/ઑગસ્ટ end at y 135 = 7 px, fine; so only the conjunct+ુ months.) Lift the heading about 8 px or drop the header.
SHOULD-FIX
4. Legend text reads small: "આપેલું", "કૂદ", "બાકી દિવસ" are ~28-30 px (line pitch 36) beside 32 px day names; p3-* and p4-* frames. Meaning-carrying labels should be 32+ (40 on a sparse area).
5. p3-ask-open-gu, p3-wrong-gu: P3 Q1 five boxes (પહેલો, બીજો, ત્રીજો, ચોથો, પાંચમો) are 92 wide; labels are ~26-28 px, grey, 5 px under the box's top border (ink y 204, border y 198), and "પાંચમો" is 10 px from its right border (left 16). Make the boxes taller/labels bigger and centred, or hold the caret below the label.
6. p4-step1..p4-wrong, p4-free-gu: the બટન labels "સપ્તાહ", "31 દિવસ", "સોમ" are ~28-30 px in 160x90 keys (look small); in p4-ask-open/p4-wrong the pink ring round "સપ્તાહ" ends x 972, 8 px from the open panel (x 980); p4-free: the key stack ends y 630, 10 px above the card edge (640).
7. p2-wrong-gu, p2-win-gu: green "366 દિવસ" chip bottom y 453 is 7 px above year buttons 2044/2045 (top 460); the 29 cell (y 378-445) overlaps the Feb grid's bottom line and is 15 px from the strip. Crowded; give 16+ px.
8. p4-summary-gu: thumbnails unlabeled. Rows 3 and 4 are bare 7-column strips with one green cell and no day name or date; rows 1-2 show a lone "7" and "2050" with no unit. Same as English.
9. Wide empty area: p1-step1/ask/wrong/win-gu (3-row table 700x240, y 400-640 blank, right third blank) and p3/p4 (table 700 wide, x 800-1250 mostly blank). Picture is about 30 % of the area; scale up if the room allows (same as English).
BUBBLE LINE BREAKS (runtime wraps by character count; known gap, listed): orphan last word: p1-win ("છે."), p1-end (3rd line "હોય છે."; "પખવાડિયામાં / 14," splits the number from its noun), p2-wrong ("વાંચો."), p2-choice-wrong ("ગણો."), p3-stepwrong ("ખેંચો."), p4-ask-shut and p4-ask-open ("થશે?"), p4-summary ("શીખ્યા."). Stranded particle at line end: p2-choice/p2-choice-line ("શું"), p3-win ("અને / 29 સપ્ટેમ્બરે"), p1-hintkey ("એક / અઠવાડિયું"), p3-ask ("તો").
CLEAN IN GUJARATI (English finding not reproduced): day-name chips (સોમ..રવિ, green ગુરુ/બુધ/સોમ) have 28-40 px side margins; Jump pill "કૂદ" ~35 px text in 96 wide, not edge to edge; answer chips ગુરુવાર/બુધવાર/સોમવાર 42 px margins; 7 day-name keys (p4-ask-open) fit with room; month cards (જાન્યુ, જુલા, ઑગ, સપ્ટે, ઑક્ટો, નવે, ડિસે, જૂન) 14-22 px margins; year strip, century label, start page, header, party frames (Kiko cheer, popper, sparkles clear of bubble/pills). No English word left, no tofu/wrong glyph, digits Latin as designed.
QUESTIONS (not a native speaker)
a. Term "સપ્તાહ" on the p4 button and free play vs "અઠવાડિયું/અઠવાડિયાં" everywhere else for week: same word? Use one.
b. "કૂદ" as the noun for Jump (natural noun may be "કૂદકો", longer); bubble says "જાંબલી કૂદને".
c. p4-wrong bubble "બધા 31 દિવસ ન ગણો; પૂરાં અઠવાડિયાં કંઈ બદલતાં નથી." reads literal; "બટન" is an English loanword in Gujarati script.
d. Month abbreviations "જુલા" (July), "ઑગ" (Aug) and free-play legend "દિવસ 1": natural?
e. No thought puff beside Kiko in any Gujarati ask frame (hand-at-chin pose is there); p1-end/party show the 3 month groups empty and the 12 cards unsorted (pack walks by typing): is that intended?
