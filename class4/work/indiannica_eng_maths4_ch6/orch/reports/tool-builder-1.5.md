STATUS: ok
SLOTS: M2.S3.T6.C25.2D1
FILES: class4/work/indiannica_eng_maths4_ch6/M2.S3.T6.C25.2D1/tool.tsx (only file edited; ported to output-preview by check)
CHECKS: full check 95 pass 0 warn 0 fail (1 of 4 used), tr-coverage passes; quick 30/0/0; temp files deleted
FAILURES: none
DECISIONS: a done (gu "એ" between chips everywhere, અવયવી -> ગુણિત); b done (ghost flags, opacity .28, where lit flags slid into the band); c done (Divide/Count/Write-it keys with the pad open; Divide ring dropped in the ask stage per PATTERNS 19); d done (Go back removed; tracks correction now ends on view 0 so every meeting is reachable again)
RISKS: not eyeballed: p1-end/p4-end/p4-win hi/gu wraps, hi/gu statement spacing, p2-wrong ghost flags (use --pack --changed). Choice labels shortened to "74 isn't a multiple" / "9 isn't a factor" (the key hid the 9 at 2 lines, the long label overflowed the slot; hi/gu rekeyed): question for the owner, keep them or let the runtime key take 3 lines so "of 9" returns?
ESCALATE: no
VISUAL ITEMS: 1 done (slot echoes label, CHOICE_SHOWN) · 2 done (T1 frame at 32, rows 78 apart) · 3 done (tray boxes 130, captions 32, shelf 84 readout 32, board pitch 36, count digits 32) · 4 done (statements 11 under the shelf, pitch 44 en / 48 hi-gu) · 5 done (hi closings p1/p4 shortened; en p4-win now "74 is no multiple of 9, and 9 is no factor of 74.") · 6 done (miss "Test a card from the rings: does it go into 20 and into 34 exactly?", ML1 same shape) · 7 done (Thumb: P1 rings + one card per number, P2 wall + cards 1 2 + wall)
PLAY LESSONS (found and fixed): 400 ms tapOk per card/flag; HOOK.set keeps the agent's list as given and returns false when it cannot be drawn; viaAct frees its flag on reject; lock released on entry change; answerReady re-arms only after a new act; same list re-sent after a miss costs no try; early Enter on "always" nudges only the lone card "1", any other list is a normal miss.
