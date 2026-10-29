STATUS: ok
SLOTS: M1.S1.T3.C11.2D1 (Morning or Night)
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S1.T3.C11.2D1/tool.tsx; output-preview pair re-ported by the passing check
CHECKS: quick check 31 pass 0 fail; ONE full check 97 pass 0 warn 0 fail 4 info, ported. Real-input probes (playkit): hi and gu nudge, P1 Q3 and P2 Q3 lines read off the bubble; free play (6:30, lunch box, hand double click); double-click window measured by page timestamps.
FAILURES: none
DECISIONS (all five done):
1 GUJARATI: p1 Q3 is now "સૂરજ કે ચાંદાને આખા દિવસ સુધી સરકાવો: કેટલા આંટા અને કેટલા કલાક?" (two lines, read off the bubble). A no-break space sits inside the key name in every hi and gu line that names it ("दर्ज करें", "દાખલ કરો": the two nudges, the P2 Q2 line, the P3 Q3 line); the bubble now breaks BEFORE the name ("... પછી / દાખલ કરો બટન દબાવો.", hi the same), so the name stays whole.
2 P2 Q3 matches the screen: English "what is this 12 called?" (ask "What is it called?"), hi "इस 12 को क्या कहते हैं?", gu "આ 12 ને શું કહેવાય?"; no card is spoken of any more.
3 LUNCH BOX: the picture itself is the problem (the skin is a closed orange box seen from above and reads as a suitcase at card size); I could not change a skin, so the word "lunch box" (tx; hi "टिफिन", gu "ટિફિન") now stands under the card in the P3 Q3 time-card area and under the lunch-box picture in free play (cards moved up, 84 px, so the word clears the sky). New term for the native speaker: टिफिन / ટિફિન for lunch box.
4 SCHOOL: moved to 12% of the strip (about 3:00) with the left lamp beside it, and given a dark outline and soft shadow so it stands out on the dusk sky; the marker no longer covers it at the start, the steps, 6:30, 7:45, the 8:00 free-play start or any picture time (probed at 6:30 and lunch). It is still crossed when the child drags the marker over 1:00 to 4:40, which is the only clash left.
5 DOUBLE CLICK: pointer taps on the hour hand or marker wait 300 ms; real page gaps of 217, 231, 266 and 275 ms gave one act, 312 ms gave two (a slow double click is two presses); Enter and the agent keep their 150 ms. FREE-PLAY SECOND TAP: not fixable in tool.tsx: while a picture's glide plays the runtime sets pointer events off on the whole working area, so the second tap never reaches the tool (my queue only serves presses that do arrive); the glide is the shortest allowed (0.7 s x the runtime's tempo). Logged as runtime behaviour, no new NOTES line (it is the same action lock as the other free-play note).
RISKS: none new; the open owner questions are unchanged (noon cue after a phase 3 miss; right time with no label is a miss; guide.answerGate has no hook in port).
ESCALATE: no
REPORT: class3/work/indiannica_eng_maths3_ch10/orch/reports/tool-builder-1.2.md
