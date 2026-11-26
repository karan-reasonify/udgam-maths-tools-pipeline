STATUS: prereview (full 99/0/0, ported; polish + Gemini pass + language pass done)
SLOTS: M2.S2.T4.C16.2D1
FILES: work/indiannica_eng_maths5_ch8/M2.S2.T4.C16.2D1/tool.tsx (+ tool.tsx.pre-design); output-preview pair written
CHECKS: quick 33/0/0; full #1 98/1 FAIL (zones: the hi side label "4 सेमी" ran past the left edge of the working area on the phone frame) -> grid left margin 100 -> 130 -> full #2 99 pass 0 warn 0 fail, ported (2 of 6 full checks)
1 POLISH (C16-polish.md):
- Right answer now 3rd: 2.2 is 4 m / 1 sq. cm / 1 sq. m; 2.3 is sq. m / sq. km / sq. cm. 2.1, 4.1, 4.3 unchanged.
- The nudge also fires on a trusted hardware digit, "." or Enter while locked. Enter on our own act key is the act itself, so no nudge there. Playkit, en and hi: a hardware 7 gives the nudge and types nothing; after 4 rows the question comes back.
- Nudge now reads "Keep tapping Lay a row until the whole rectangle is covered."
- 2.2 rung 1 is now "Lay one 1 m square on the floor: how much floor does it cover?"
- 3.1 miss is now "Count the inside squares too, not just the edge ones." 3.3 miss is now "Every one of the 3 rows is full; count the middle row too." (an identical line would fail bubble-no-repeat).
- 1.3 miss is now "This card's string is long; look at its squares instead."
- Added MODEL.answerGate. The ported .json carries it.
2 VISUAL PASS (gemini-3.5-flash, ok; nothing reverted): soft shadows, rounded cells, a rope edge line, a shelf panel behind each unit square, tile skins on the start page's squares and the 1 m square.
- I removed the tile skins it put on the unit shelf (the shelf stays plain).
- "NOTE words added: stroke fill" is a false alarm: it is the paintOrder attribute, no printed words.
- The rope is still one skin per side at its own aspect. Phase 4 Q1/Q2 (over 40 cells) are still all plain.
- The maths, gate, TR, PHASES and MODEL are untouched.
- Shots ask, wrong and start look right.
3 LANGUAGE PASS: TR has 129 lines each in hi and gu: every PHASES line, the choice labels, the win lines (item data), the 5 nudges, the keys (SC_LABEL), every drawn word through tx (the unit side labels now go through tx too), plus TOOL_NAME, OPENING, FREE_LINE and START_HOOK. tr-coverage passes. The hi/gu learned line of phase 2 was shortened to fit 72 characters. Summary thumbnails draw pictures and digits only.
- Fit sheets: ask and wrong in hi and gu, all fit; the phase 3 gu question takes 3 bubble lines.
UNSURE TERMS (for a native speaker):
- hi: परिमाप (perimeter, or परिधि?), वर्ग सेमी/मी/किमी, इकाई वर्ग, सतह, सीमा, डोरी, टुकड़ा A/B (patch), पंक्ति बिछाओ (Lay a row), ढको, एक जैसा माप (Same size), "9 सेमी गुणा 4 सेमी" (for "9 cm by 4 cm"), the tool name वर्ग से ढको.
- gu: પરિમિતિ, ચો. સેમી/મી/કિમી (the period would split a bubble page, so it is only on keys and labels; bubble lines say ચોરસ સેન્ટિમીટર), એકમ ચોરસ, સપાટી, ટુકડો A/B, પંક્તિ મૂકો, સરખું માપ, "બાય" for "by", ટપાલ ટિકિટ, ચોરસથી ઢાંકો.
- The letters A and B stay Latin in hi/gu as labels (the same as on the picture and the keys).
Not done: nothing open. The sidecar now has answerGate (via MODEL).
