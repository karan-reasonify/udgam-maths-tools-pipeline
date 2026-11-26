STATUS: done. Stage 2 (Gemini visual pass + Hindi/Gujarati) finished; full check 99 pass, 0 warn, 0 fail; pair ported (85.4 KB).
SLOTS: M3.S5.T10.C46.2D1 (Box Packer)
FILES: work/indiannica_eng_maths5_ch8/M3.S5.T10.C46.2D1/tool.tsx (tool.tsx.pre-design kept beside it)
CHECKS: quick 33/0/0. Full checks: 3 of 6. Run 1 failed zones: the Hindi height chip ran past the working area's left edge on the phone frame. Run 2 failed zones: the Hindi phase 3 question ran past the bubble. Run 3: 99/0/0, ported, the host plays every phase.
VISUAL PASS: design ok on gemini-3.5-flash; no "words added", "colour lost" or "made but drawn by no Skin" notes. Gemini only added soft shadows, round line caps and dominantBaseline="central" on the labels; maths, gate, TR, PHASES and MODEL untouched, amber packing strip kept, cube/carton skins kept.
Hand fixes after it: (a) StartArt ran past its 340-tall box after Gemini's ground shadows, so the solid and the box were moved and shrunk to fit and the shadows now follow the shapes. (b) The phase 2 correction line went back to the plain baseline, so the long "34×6,936=2,35,824" keeps its fitted size in the 290 px column. (c) The solid moved 30 right and is 20 shallower, so the Hindi "7 सेमी" chip sits inside the area.
LANGUAGE PASS: TR has 118 keys in each of hi and gu: every question, miss, ladder, closing, learned line, step and hint, the win lines, the three nudges, the Yes/No labels, OPENING, FREE_LINE, START_HOOK, the concepts, the tool name, and the drawn words.
Work draws every word through tx: Base, Height, Edge, Each, Box, Cube, Volume, cubes, fit, Left over, "Yes, no gap" and the key labels. Units go through tx too: cm, m, sq. cm, sq. m, cu. cm, cu. m become सेमी / मी / वर्ग सेमी / घन सेमी and સેમી / મી / ચોરસ સેમી / ઘન સેમી on the picture; bubble lines spell units out (सेंटीमीटर, घन मीटर / સેન્ટીમીટર, ઘન મીટર).
Card lines now shrink to fit their card (floor 28). Two Hindi phase 3 questions were shortened to fit the bubble. Thumb draws digits only. No line is built at run time.
TERMS FOR A NATIVE SPEAKER: आयतन / ઘનફળ (volume); घनाभ / લંબઘન (cuboid); आधार का क्षेत्रफल / પાયાનું ક્ષેત્રફળ (base area); परत / પડ (layer); किनारा / ધાર (edge); गुणनखंड / અવયવ (factor); पहाड़े / ઘડિયા (times tables); शेष / શેષ (remainder); बची जगह / બચેલી જગ્યા (left over).
Key labels: उठाओ / ઉઠાવો (Raise), जाँचो / તપાસો (Check), जोड़ो / જોડો (Join), किनारा भरो / ધાર ભરો (Pack edge), नया आधार / નવો પાયો (New base).
Tool name: डिब्बा भरो / ડબ્બો ભરો. Short unit forms on labels: सेमी / સેમી.
RISKS: disk at 98% (6.3 GB free); no ENOSPC this stage. The Hindi and Gujarati are a first draft.
ESCALATE: none.
