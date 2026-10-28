STATUS: ok
C24 Pattern Lines (class 4 ch 10), builder 1.11: fix batch + r30 pencil move. Quick 32/0/0; 1 full check --force: 96 pass / 0 warn / 0 fail (ported); approve done after the sidecar note. shots (ask, wrong, hi, gu) looked at once; a real-input probe of item 1 and of every written act, no console errors.
FIX BATCH
1. Route row: when the child already did Share one and then answers 78, the correction now un-levels the rods first (done.level reset), draws the overhang route (24+2, 25+1, 26), then shares the counter again. Seen in a real-click probe.
2. Free play times: the nine-table pill "tens up, ones down" is now written only when the four lines shown really go tens +1 / ones -1; starts 8,9,10,18,19,20 show NO pill (no new copy). Tables 5 and 10 are true for every start (ones 5,0,5,0 / always 0). Chips already read the real digits.
3. Phase 1 repeats: ML1 rung 1 -> "Join the two rods first, then look at the greater one."; ML1 miss -> "That doubled the smaller rod, so lay the greater one twice."; Q3 rung 1 -> "Lay the two rods end to end, then lay 31 twice under them."
4. Q3 miss: "Doubling 30 falls short, so double the greater."
5. Phase 2 teach: "What does each one do?"
6. Phase 4 teach: "Does the guess hold up?"
7. Phase 3 Q5: say "Read the jumps, then write the next total."; rung 2 "Add 3 to the last jump, then add that to the last total." (6,9 -> 12 -> 18+12=30 checked). bubble-no-repeat then flagged ML3's near copy, so ML3 say is now "Along the top are the jumps, so write the next total." (your wording left Q5 as asked).
8. Slate: all four slate lines use U+2212 (no TR keys existed for them). The pencil table lacks U+2212, so the runtime prints that one glyph.
9. "consecutive" once: phase 1 concept "Adding consecutive numbers, one after another" (hi लगातार संख्याएँ जोड़ना, एक के बाद एक; gu ક્રમિક સંખ્યાઓ ઉમેરવી, એક પછી એક).
10. Q4 rung 2: "Look at the tens and the ones digit down the table of ten." (no number).
11. "=" gap: exprEnd width factor 0.85 -> 1.02, so "24 + 25 + 26   =" is clear (all expression columns move with it).
Every changed English line has its hi + gu TR key replaced in the same edit (old keys removed). No PHASES answer, near miss or choice touched.
R30 PENCIL: the pair is on r30, rules.pencilActs strict. ONE pencil act in code (literal in doAct: tool pencil, moves "write"; pencil-acts reads 1 write, 0 marks, 0 other). It is used by 5 acts, all WRITES: split (tens+ones digits of each card), jumps and growth (the +n chips), fill "Test it" (answer digits; on a card also its tens and ones; phase 3 also its jump and growth chip), work (slate lines, or the column sum digits, "+", the bar as a {line} token and the carry). Hand and eraser acts are not pencil. The old push/printed-text reveal is gone: one token list per act feeds both the act and <PencilText>/<PencilLine> (progress = characters finished). Written digits are in the tool's own inks. Known ceiling: the act call for hand/eraser stays `api.act(sp)` (1 unclassified INFO, pass).
ANSWER GATE: the port does not generate guide.answerGate, so it is a HAND EDIT of the ported .json: node script set guide.answerGate (acts per question, "Ungated: none") and then `approve --note ...` passed (status.handEdit). Acts: P1 Join/Double/Take one (ML1, Q3), Share one (Q2); P2 Split+Read x3; P3 Find jumps+Find growth x3; P4 Work it out + Put back (ML4, C28:8), Work it out alone (C28:7). A later `check --force` or remake regenerates the .json and drops the note.
Gate proof by real clicks was not replayed beyond the item-1 probe (lock logic untouched).
OPEN QUESTION: free-play nine-table windows that cross 90-99 / 180-189 now show no reason pill; want a new pill (needs TR) instead?
Cleaned: my play-*.png and scratch scripts. approve-*.png and sheets left for clean.
