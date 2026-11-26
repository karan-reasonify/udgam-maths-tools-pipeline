STATUS: done. Stage 2 (polish, Gemini pass, hi/gu) complete; final full check 98/0/0 (1 of 6), ported; ready for the review packs.
SLOTS: M3.S4.T8.C36.2D1 · FILES: work/indiannica_eng_maths5_ch8/M3.S4.T8.C36.2D1/tool.tsx (tool.tsx.pre-design kept)
1 POLISH (C36-polish.md):
- The Q4 nudge is now "Lift the layers apart first.". Q1.2 says "Tap Fill to put cubes in both solids." (Q1.1 and Q1.3 keep "...both boxes.").
- The Q1.1 win is "Yes, the shoebox. That space is called its volume.", so it no longer repeats the closing.
- The Q4.2 say is "What is the volume of this stack in unit cubes?".
- A bare Enter after both Fills, with no box picked, now says the question again.
- The shelf note reads "Not drawn to size.".
- MODEL.answerGate lists the gate for each phase and question, and it reaches the ported .json.
- Quick check clean.
2 VISUAL PASS (gemini-3.5-flash; the CLI said ok):
- Kept from Gemini: soft shadows and glows, gradient chips, a wood-grain plank, a richer classroom (floor, framed board, window bars), and a legend card.
- Fixed by hand:
  - Removed the words Gemini wrote on the blackboard, "V = l × b × h" and "1 m³". The second named the classroom answer, and both used raw font sizes.
  - Widened the legend card, which cut its "Unit cube" label.
- Judged:
  - Violet: changed to a bluer #6A4FD0 at 0.5 over the beech, so it reads violet, not mauve.
  - 1 m cube on the classroom card: now 64 high, standing on the floor at the right. Board and desks stay readable.
  - Phase 4 stack width: kept at the 900 open width on purpose, so nothing moves when the keypad opens.
- Gemini's `skinned` flag drops skins past 40 cubes; no screen reaches 40.
3 LANGUAGE PASS:
- The TR table has 117 hi and 117 gu lines: every PHASES line, the 5 nudges (hand-added), the 12 win lines (hand-added), the choice labels, Fill / Count row / Lift layer / Stack again / See-through, box and card names, the units and "Not drawn to size.".
- tx is used for every drawn word. The bubble spells units in words (घन सेंटीमीटर / ઘન સેન્ટિમીટર); drawn labels use short forms (घन सेमी / ઘન સેમી).
- Thumbnails stay digits and cubes only.
- The hi and gu wrong-state sheets fit: no clipping, the keys hold their labels, the bubble shows its hint alone.
- tr-coverage passes; 0 warn.
4 FULL CHECK: 98 pass, 0 warn, 0 fail. Ported; the host emulator plays every phase in user and AI mode.
Unsure terms for a native speaker:
- Volume: आयतन / ઘનફળ.
- Unit cube: इकाई घन / એકમ ઘન.
- Row: पंक्ति / હાર.
- Layer: परत / થર.
- Stack: ढेर / ઢગલો.
- Edge: किनारा / ધાર.
- See-through: आर-पार / આરપાર.
- "Not drawn to size.": माप के अनुसार नहीं बना / માપ પ્રમાણે દોર્યું નથી.
- Shoebox: जूते का डिब्बा / બૂટનું ખોખું.
- Solid: ठोस / ઘન પદાર્થ (the Gujarati makes ઘન do double duty, cube and solid).
- Short units: घन सेमी/मिमी/मी and ઘન સેમી/મિમી/મી.
Not done: the runtime is untouched (no gap in this stage).
