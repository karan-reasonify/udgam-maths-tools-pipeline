STATUS: ok
SLOTS: M2.S3.T6.C25.2D1
FILES: class4/work/indiannica_eng_maths4_ch6/M2.S3.T6.C25.2D1/tool.tsx (ported pair rewritten by check)
CHECKS: preview + shots P4 wrong en/hi/gu + real-click echo probe; ONE full check 95 pass 0 warn 0 fail 3 info, tr-coverage pass
FAILURES: none
DECISIONS: P4 Q1 labels en "74 isn't a multiple" -> "not a multiple of 9", "9 isn't a factor" -> "not a factor of 74"; hi "74 गुणज नहीं" -> "9 का गुणज नहीं", "9 गुणनखंड नहीं" -> "74 का गुणनखंड नहीं"; gu "74 ગુણિત નથી" -> "9 નો ગુણિત નથી", "9 અવયવ નથી" -> "74 નો અવયવ નથી"; ids multiple/factor/both unchanged
RISKS: none; keys wrap on two lines in all languages (as before in en); slot echo one line, widest 405 px in a 524 px slot
ESCALATE: no
REPORT: work/indiannica_eng_maths4_ch6/orch/reports/tool-builder-1.6.md
Detail: choices, CHOICE_SHOWN and both TR keys changed in one edit (old keys removed). Echo, miss and win lines need no change (the win "74 is no multiple of 9, and 9 is no factor of 74." and the miss name no label). Shots ran after `preview` (shots reuse the last preview). Fit: keys 258x155, labels inside on two lines; echo inside the slot (996-1520 px) in en/hi/gu for factor and multiple. Temp files removed. Runtime gaps: none. Question: none.
