# Weight Converter (M1.S2.T5.C22.2D1) visual review, English (ae597f18f64f18bd7) and Gujarati (afbea6e894f12e349)
Saved at the "save and stop" checkpoint. The Hindi review (a8afd198c09115970) was still running and is NOT here. Nothing below has been sent to the builder (a5103533a494f6ca4) yet: send ONE fix message with EN + GU + HI findings together, also revert the "press" verbs to छुओ / સ્પર્શ કરો.

## MUST-FIX (both languages)
1. Plain fallback sack (tan trapezoid, brown outline) shows behind and beside every sack photo (start page, all P1 frames, P2 bags, P4 rice sack). `wcSackShape` (~line 714/755) is drawn, then `<Skin name="sack">`. Fix: draw the plain shape only until the photo decodes, or hide it once the photo is drawn. The summary thumbnails are this bare fallback too.
2. The role label on the green Answer tag (`wcAnsTag`, T.micro = 28; en "Answer", gu "જવાબ") is under the 32 floor in every win/end/party frame. Fix: label at 32, widen the tag; at p1-win keep 16+ px from the unit-fact ring.
3. (en) Chips wrap to two lines against "one line, 32+": P2 "1,000 / g" on every bag; P4 watermelon chips "2 kg / 650 g", "2 kg / 500 g", "2 kg / 600 g"; summary row 4 "2 kg / 450 g". Widen to fit; P2 with the pad open has no room (5 bags end at x 955, drawer at 980): second row or put the Left bowl above.
4. (en) p1-wrong: amber running-total chips "1 kg", "2 kg" cover rows 4-5 of each tray, so only about 7 of 10 bags show. Remove them (the uniform "1,000 g" chip is the label). (gu, same frame, should-fix: move the tag off the tray.)
5. (gu) p4-summary: right-hand thumbnail pills for rows 2-4 ("5 કિગ્રા / 7 ગ્રામ", "4 કિગ્રા / 0 ગ્રામ", "2 કિગ્રા / 450 ગ્રામ") are cut by their own outline (matra and digits cross the border at the top, second line touches the bottom). Size the pill from the measured text: one line smaller, or taller with 10+ px above and below.

## SHOULD-FIX
- Chips too close: the two "1,000 g/ગ્રામ" chips 8-10 px apart (p1-win, P1 Q2/Q3, guide step 2, P2 bag rows); fact chip and green Answer tag 13 px apart (p1-win); four bag tags 7 px apart (p2-wrong). Gaps 16-20+ px or stagger.
- (gu) P1 Q2 (4 kg 700 g) with the pad open: five-item chip row spans x 42-970; first chip 3 px from the card's left edge, "700 ગ્રામ" chip 10 px from the keypad panel. Chips must not shrink: wrap, scale the scene or shift it. (Pack shows Q1 only; frames play-gu-cls-wrong-b.png.)
- The ten 100 g bags are about 40x20 pale hairline blocks, not recognisable as bags, and "100 g" appears nowhere on screen. Dark ink edge and a small packet shape.
- P2 "Left" chip sits on the dashed ring and bowl rim; the magenta invite ring crosses it and doubles the amber ring; with 0 left the empty ring floats above the bowl. Move the chip clear; drop the invite ring (or amber ring) while it shows.
- Pictures small with big empty side bands: P1 scale and sacks about 420 of 1472 px wide, plate digits about 44 px (floor 64); P2 heap about 285 px (about 8% of the area), off-centre from the Gather key (heap x 410-695, key at 800). Scale up and centre (LAYOUT §3, `picture-scale`).
- Summary: all four thumbnails are the same blank tan pouch; draw each row's own picture.
- Phase titles and summary headings print "1000" without a comma in en ("multiply by 1000"), gu ("1000 વડે ગુણો", "1000 વડે ભાગો"); TR value can carry "1,000".
- Free play: the "1 kg = 1,000 g" ring floats off-centre (x 505-793, scale centred at 800) about 100 px above the picture.
- P3/P4 board: empty answer cells pale grey dashed hairlines, hard to see; "kg"/"g" headers about 8 px under the board's top edge. P3 board and P4 items+board shift sideways when the pad opens (P3 about 285 px); LAYOUT §3 wants a fixed place.
- (gu) Answer slot captions: kg box has long "કિલોગ્રામ" next to the unit "કિગ્રા"; the g box prints "ગ્રામ" twice. Short forms on the slot; if the runtime draws them, log a gap.

## QUESTIONS
- (gu) "વદી" (carry key; also p3-win-gu "1 કિગ્રા વદી સાથે", p3-end-gu, summary row 3): native speaker must confirm; reviewer suggests the usual carry term (the borrow word "ઉછીના" looks right). Other terms read plausibly (ખોલો, ભેગા કરો, બાકી, તડબૂચ, કેરી).
- (gu) p4-free: free play keeps the dimmed "જવાબ" corner key. Runtime standard?
- Plain beige tote (700 g in P1 Q2, 90 g in Q3, 5 kg 50 g in P4 Q3; left-over rice bag / shopping bag) is code-drawn beside photographed sacks/mango/watermelon: add a photo or keep plain? (images.json has sack, mango, watermelon only.)
- (en) a. P1 shows the "1 kg = 1,000 g" ring before the act on every question (the guide teaches it): keep, as the brief has it? b. P2 p2-wrong (4,000 g): the correction shows the finished gather (4 bags, empty Left ring); answer 4 kg 0 g readable by counting: stop earlier? c. P4 corrections draw the carry/borrow marks and stop before the answer row: fine if "no marks before the act" means P3 only.
- LOW (runtime): in p4-party an orange sparkle at about (315, 773) touches the bubble tail and the right cone is about 7 px from the 4th phase dot.

## Pack artefacts, NOT tool defects (both reviewers walked the real flow)
- The pack's ask-shut frames show a live berry Answer key before the act; after real guide taps it is dimmed (`answer-open` disabled) at P1-P4 Q1.
- p1-end, p2-end, p3-end and p4-end/party show closed sacks, an ungathered heap, no carry, an answer row over empty columns; in real play P1 Q3 keeps the opened trays at the win and P3 Q3 shows the carry "1".

## CLEAN (both)
No red or cross anywhere; slot empty after every miss; corrections do not show the answer; Kiko thinks at asks and cheers at parties; bubbles at most 3 lines, no one-word last line (gu); Carry and Borrow keys together in P3; commas and units legible; photos untinted; classroom arrow clear.
