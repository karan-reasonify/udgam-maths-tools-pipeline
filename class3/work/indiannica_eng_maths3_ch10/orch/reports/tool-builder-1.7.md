STATUS: ok
SLOTS: M1.S2.T4.C20.2D1
FILES: class3/work/indiannica_eng_maths3_ch10/M1.S2.T4.C20.2D1/tool.tsx (the ported pair was rewritten by check --force)
CHECKS: check --no-render 32 pass 0 warn 0 fail; full check --force 97 pass 0 warn 0 fail 5 info, ported (1 full run of the 6 allowed)
FAILURES: none
DECISIONS: removed the Days card and the suitcase; the wheel and rows are bigger; the working line moved into the freed space; item 2 needed no change
RISKS: after a miss the bubble shows the runtime's hint, not the question, until Answer or a digit is tapped (by design; see the question)
ESCALATE: no
REPORT: work/indiannica_eng_maths3_ch10/orch/reports/tool-builder-1.7.md

Preview: the slot's preview page (the HTML preview tab in the viewer; rebuilt by the full check)
ITEM 1 (owner: remove both):
- drawDays: deleted the "Calendar Card" group (the Days heading and the empty day boxes, plus the D/cw/tot/cx0/cells code that only fed it) and the "Suitcase Skin Card" group (a tan rect and <Skin name="suitcase">).
- drawDays is the only place the day wheel is drawn: the question, hint, traceback, win, phase-2 guide steps and free play. Thumb never drew either object.
- The boxes were always empty (no digits in any mode) and nothing else read them.
- Re-layout:
  - TC_WHL: r 110 -> 121 (cx 172, cy 165). The midnight and noon labels sit closer to the rim.
  - TC_G2: tiles 28 -> 30 (pitch 33, py 37, x0 56, badge bx 28). The "24" row labels end at about x 894 of 900; board-fit passes.
  - The working line (free-play total, warm-up "2 × 24 = 48", trace "3 × 24", win "3 × 24 = 72" with data-reveals kept) moved from 640,238 at T.speech to the freed space right of the wheel: 600,185 at T.xl.
- Free play, Days, 4-5 days (rows packed 22 apart above the mode keys): the r15 numbered badges overlapped each other, before this fix too. There they are now small plain dots with no digit, because T has no size under 28. Question rows keep their numbered badges.
- images.json and images.tsx untouched. The suitcase picture is now drawn nowhere; no check row flags it.
- TR: no key changed or removed. "Days" is still used by TC_MODE (the free-play mode key).
ITEM 2 (question-stays), playkit, real input, nextKey, guide steps by Enter, q1 of each phase (the drawn bubble text):
- P1 "A train journey takes 4 hours, so how many minutes is that?" Untouched, act done (Answer blinking), pad open: the question.
- P2 "A holiday lasts 3 days, so how many hours is that?" Same three states: the question. While the gate is locked mid-act: "Turn the wheel some more." (a locked-key nudge, allowed); the question is back at the 3rd turn.
- P3 q1 "A train leaves at 9:30 a.m., reaches at 1:45 p.m.: how long?" Same three states: the question.
- P3 q2 (end time, berry Enter): untouched and after sliding the bar with the Enter key shown: "A bus runs 2 hours 45 minutes from 10:30 a.m.: when does it end?"
- After a miss in all 3 phases:
  - Once the traceback ends (pad still open) and after Close, the bubble shows the miss hint alone ("Each day is one full turn of the wheel.").
  - Tapping Answer again, or any digit, brings the question back.
  - This is the runtime's keyOnly hint, not a tool line. Check rows one-line-bubble ("hint ONLY" after a miss) and hint-pinned ("4 s later the SAME hint") require it.
- No where-to-tap cue appears anywhere. Nothing changed for item 2.
FRAMES LOOKED AT: shots sheet-ask, sheet-solve, sheet-wrong, sheet-ask-hi (आधी रात and दोपहर fit); playkit play-p2-step2 (1 × 24 = 24), play-p2q3-actdone, play-p2q3-win (5 rows, 5 × 24 = 120), play-p3q2-slid, play-free-days5.
RUNTIME GAPS: none logged.
QUESTION: the brief asks that the bubble never show the miss line after a miss with the pad open, but the runtime shows it there by design and two check rows require it. Should the question come back once the traceback ends (a runtime and check change, the main session's call), or does the hint stay until the next tap?
