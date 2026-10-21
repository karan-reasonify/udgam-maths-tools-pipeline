STATUS: ok
SLOTS: M1.S1.T3.C10.2D1 (Pair Pen, published, stays on r28)
FILES: work/indiannica_eng_maths4_ch6/M1.S1.T3.C10.2D1/tool.tsx (edited); output-preview pair re-ported by check (differs from the published bytes: republish owed)
CHECKS: full check 2 of 3: 95 pass / 0 warn / 0 fail / 3 info; tr-coverage, skin-keys (apple), skins (21), skins-fallback, start-page, hint-lines-clear, summary-simple, text-contrast all pass.
FAILURES: none now. Run 1 had one FAIL, summary-simple "Cannot read properties of null (reading 'find')" in gu + en-classroom only: a flake (en/hi passed, my edit does not touch it); the re-run with C4_CHROME_POOL=1 was clean.
DECISIONS: all 5 `<Skin name="button">` (start-page counters, rows, loose heap, shelf spares) -> `name="apple"`; new helper `appleBox(cx, cy, s)` gives a 0.96:1 near-square box for the 92x96 tile at all 4 call sites, same sizes as before. Kept N <= 40 apples / plain discs above (never mixed); spares = shelf position + vermilion ring, no tint. No English line or TR key changed; lines still say "counters". No hard-coded colour assumed the old golden-tan keys: keys, Enter, soft keys, hint band, panel come from the runtime THEME (olive keys, butter soft, berry Enter) and followed automatically; only literals left are the shared ch 6 CHROME and the Okabe-Ito content colours.
FRAMES: own eyes on sheet-ask, phase-2 panel open and play probes of rows and spares. Apples read as apples (stem and leaf visible), no amber disc bleeding round them, phase 1 (65) stays plain discs. Spares (27, Try 11: "7 over") = 7 green apples ringed vermilion on the dashed shelf, ring clear on white, no fix needed. Keypad: Answer/Enter berry, Try/Shade olive, panel butter-olive (pad:"enter", so no digit keys exist to see).
RISKS: the spare rings touch their neighbours (pitch = ring diameter; same as with the button), left as is.
ESCALATE: no
NOTE: temp probes, shots and .build sheets deleted; slot folder is back to its file set.
