STATUS: ok
SLOTS: M1.S2.T5.C20.2D1 "Fact Both Ways"
FILES: work/indiannica_eng_maths4_ch6/M1.S2.T5.C20.2D1/tool.tsx (only)
CHECKS: full check #2 of 4: 94 pass / 0 warn / 0 fail / 3 info (tr-coverage passing; ported). Check #1 had 1 FAIL, fixed (below).
FAILURES: none open. Check #1: no-overlap wrong4 "17" x "34": the multiples track slid 80 px to make room for the new first card, so 34 passed under 17 mid-slide. Track cards now jump to place and the new card fades in.
DECISIONS: no English line and no TR key changed (one hi value only, item 10).
 9  p4 Q3 list wrong: after a miss the pen opens a second row with dashed ghost cards for the WHOLE right list (1, 5, 13, 65; the hand taps them in); the child's picks stay in row 1; the candidate cards slide down 44 px to clear it; the old rings on the candidates are gone; the ghost row clears on the child's next tap. Seen in a frame.
 10 hi p3 closing hi value: "गुणनखंड अपनी संख्या से कभी बड़ा नहीं होता, पर उसके बराबर हो सकता है।" -> "गुणनखंड अपनी संख्या से बड़ा नहीं होता, बराबर हो सकता है।" Seen in a frame: 2 lines, no orphan.
 11 Free play card text is centred between the card edge and the turn icon: about 35 px clear of it (was 7). Seen in a frame (78 / 6).
 12 p1 win/wrong air: hop arcs 12 px lower and hop numbers 10 px lower, sentence tiles 6 px lower (hop numbers about 15 px under row B, tiles 19-22 px under the rail labels); at the win the unused tiles fade to 30%. Seen in frames.
 PLAY LESSONS: a 400 ms repeat guard per target (run.tap) on sentence tiles, take-out chips, pair tiles, pair chips and list cards; HOOK.set in FbPairs keeps the value AS GIVEN (a pair whose product is not the number returns false), FbLists likewise (a value outside the cards, or empty, returns false); busy flags reset in a finally through run.hold (own epoch only); the answerReady effect also depends on S.acted and S.stale; no free guess: every Enter path re-read, nothing needed changing.
RISKS: the two pen rows' left walls touch and read as one tall bar; the candidate row is the one thing that moves on a list miss (alternative: smaller ghost row, candidates fixed).
ESCALATE: no
