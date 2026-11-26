STATUS: ok
SLOTS: M1.S1.T3.C11.2D1
FILES: work/indiannica_eng_maths5_ch8/M1.S1.T3.C11.2D1/tool.tsx (tool.tsx.pre-design kept beside it)
CHECKS: full 98 pass 0 warn 0 fail 4 info, ported (3 full runs this message); quick 33/0/0; tr-coverage pass
FAILURES: none
DECISIONS: Gemini pass kept; rope left as tiles (reads as one continuous rope); action durations shortened to fit the 2 s act rule
RISKS: hi/gu need a native read (terms below); the 'tenths' unit word in Hindi
ESCALATE: none
Stage 1, polish (C11-polish.md):
 - P3 ladder[0] -> "What number added to the breadth makes the half?"
 - P4 closing -> "So several laps are one lap added again and again."
 - the Enter-touch listener ignores e.repeat
 - MODEL.answerGate added (P1 Copy side + Times 4; P2 three Walks; P3 Halve + Take away; P4 Lens + ONE lap, field one lap; ungated: none); it is in the ported .json
 - 7 nudge lines, all in TR
Stage 2, Gemini design pass: ok (gemini-3.5-flash; no NOTE lines, no words added, every api.* call kept, quick check clean).
 Gemini added:
  - a cream paper card behind the figure and a working card behind the column;
  - soft shadows, a field gradient and lens/handle shading;
  - central baselines on the labels.
 Fixed by hand after the pass:
  - the column card ran to x 920, past the open panel's edge; it now ends at 900;
  - the top side label of the square/path left the working area (zones FAIL); it was lifted back;
  - the "11 cm" length label touched the rope; it was raised 14;
  - the copy, times and lap acts ran 2.0-2.1 s (action-anim FAIL, 2 s limit); they now pass ms 1050 and last about 1.6 s.
 Rope judged on a zoomed shot: it reads as one twisted rope per side, with no knot showing mid-side. Left as built.
 Skins ant, rope and path are still drawn; the plain shapes are still under them.
Stage 3, language pass: TR has 121 hi + 121 gu entries, covering:
 - every printed line: name, concepts, steps and hints, ladders and item ladders, closings, learned lines, say/ask/miss, opening, start hook, free line, finish line;
 - the 12 win lines and 7 nudge lines, added by hand;
 - every tx word drawn in Work: cm, m, Perimeter, tenths, lap, Laps, the 7 act key labels, Longer, Square, Triangle;
 - Thumb draws digits only.
 Units are सेमी/मी and સેમી/મી; digits stay Latin.
 Fit sheets (shots --lang hi / gu, wrong state): clean, nothing crowded or off its box.
Unsure terms, for a native speaker:
 - perimeter: परिमाप (hi) / પરિમિતિ (gu)
 - tenths: दसवें / दसवें भाग (hi), दशांश (gu); "34 दसवें" alone as a unit may read oddly
 - lap: चक्कर / ચક્કર
 - "round" as घेरा / ઘેરાવો
 - the key labels: भुजा कॉपी / બાજુ નકલ (Copy side), 4 गुना / 4 ગણું (Times 4), हटाओ / કાઢો (Take away), आधा करो / અડધું કરો (Halve)
… truncated: 3 more lines (reports are capped at 40)
