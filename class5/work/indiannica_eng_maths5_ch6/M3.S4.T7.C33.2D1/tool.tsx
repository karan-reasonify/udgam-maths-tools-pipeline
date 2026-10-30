/* ═══ M3.S4.T7.C33.2D1 · part_of_whole · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   This template is the FULL NEW STYLE and is used for a chapter whose pinned runtime is silent (a voiced runtime, r21
   and before, is scaffolded from lib/build/skeleton.voiced.tsx instead). Blocks that a given runtime has no support for
   are left out when `scaffold` writes this file (board, start page, theme).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence. Opt out (delete `keyOnly: true` / `navDots: true` below)
   only with a reason stated in the report.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "part_of_whole";
const MEDIA_ID = "M3.S4.T7.C33.2D1";
const TOOL_NAME = "Part over Whole";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A whole, and a part to lay against it."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every part found its per cent against its own whole.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Lay any part against any whole.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "What per cent of the whole is the part?";
/* the tool's object: a whole bar (100%) and a part bar laid under it at the same scale; no answer is printed */
function StartArt({ box, C, tx = (v: any) => v }: any) {
  const N = 20, x0 = 230, L = box.w - 460, cw = L / N, k = 7;
  /* a ribbon bar: the plain rect, the ribbon skin clipped to it, a deep-blue tint over the part, the units marked, the outline */
  const bar = (id: string, y: number, n: number, fill: string, tint: boolean) => (
    <g>
      <clipPath id={id}><rect x={x0} y={y} width={n * cw} height={88} rx={12} /></clipPath>
      <rect x={x0} y={y} width={n * cw} height={88} rx={12} fill={fill} />
      <Skin name="ribbon" x={x0} y={y} w={n * cw} h={88} clip={"url(#" + id + ")"} />
      {tint && <rect x={x0} y={y} width={n * cw} height={88} rx={12} fill={PW.given} fillOpacity={0.72} />}
      <path d={Array.from({ length: n - 1 }, (_, i) => `M ${x0 + (i + 1) * cw} ${y + 5} V ${y + 83}`).join(" ")} stroke={PW.line} strokeWidth={2.4} />
      <rect x={x0} y={y} width={n * cw} height={88} rx={12} fill="none" stroke={PW.line} strokeWidth={3} />
    </g>
  );
  return (
    <g>
      <text x={x0 - 24} y={124} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("Whole")}</text>
      {bar("pw-saw", 70, N, "#F6E7C8", false)}
      <text x={x0 + L + 24} y={128} fontSize={T.prompt} fontWeight={700} fill={C.ink}>100%</text>
      <text x={x0 - 24} y={250} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("Part")}</text>
      {bar("pw-sap", 196, k, PW.given, true)}
      <text x={x0 + k * cw + 24} y={254} fontSize={T.xl} fontWeight={700} fill={shade(PW.given, 0.25)}>?%</text>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
/* terms, one per idea: per cent प्रतिशत / ટકા, fraction भिन्न / અપૂર્ણાંક, over बटा / બટ્ટા, whole पूरा / પૂર્ણ, part भाग / ભાગ,
   the top and the bottom ऊपर / नीचे (ઉપર / નીચે), unit इकाई / એકમ, key बटन / બટન, brackets कोष्ठक / કૌંસ; units in full words on
   the bubble, short (no dots) on the picture's labels */
const TR: any = {
  hi: {
    "Part over Whole": "भाग बटा पूरा",
    "Free play. Lay any part against any whole.": "खुला खेल। कोई भी भाग किसी भी पूरे से मिलाओ।",
    "What per cent of the whole is the part?": "भाग, पूरे का कितना प्रतिशत है?",
    "per cent": "प्रतिशत", "%": "%",
    "The part over the whole": "पूरे के ऊपर भाग",
    "Tap Part over whole to put the 14 red beads over all 25 beads.": "भाग बटा पूरा दबाओ, ताकि 14 लाल मनके सभी 25 मनकों के ऊपर आएँ।",
    "The key at the bottom writes the fraction.": "नीचे वाला बटन भिन्न लिखता है।",
    "Tap × 4 so the bottom becomes 100.": "× 4 दबाओ, ताकि नीचे की संख्या 100 हो जाए।",
    "Tap the same key once more.": "वही बटन एक बार और दबाओ।",
    "Now put the 8 blue beads over all 25 with Part over whole.": "अब भाग बटा पूरा से 8 नीले मनके सभी 25 के ऊपर रखो।",
    "Each colour goes over all 25 beads.": "हर रंग सभी 25 मनकों के ऊपर जाता है।",
    "Tap × 4 again to turn every colour into a per cent.": "हर रंग को प्रतिशत में बदलने के लिए फिर से × 4 दबाओ।",
    "Make the bottom 100 for the blue beads too.": "नीले मनकों के लिए भी नीचे की संख्या 100 बनाओ।",
    "The part over the whole, made into hundredths, is the per cent.": "भाग बटा पूरा को सौवें भाग में बदलो, तो वही प्रतिशत है।",
    "You learned: the part over the whole, in hundredths, is the per cent.": "तुमने सीखा: भाग बटा पूरा, सौवें भाग में, ही प्रतिशत है।",
    "Marigolds": "गेंदा", "Roses": "गुलाब", "Lilies": "लिली",
    "Marigolds: what per cent?": "गेंदा: कितना प्रतिशत?",
    "Of 50 plants, 23 are marigolds, 19 roses, 8 lilies: what per cent are marigolds?": "50 पौधों में 23 गेंदा, 19 गुलाब, 8 लिली हैं: कितने प्रतिशत गेंदा हैं?",
    "The whole is all 50 plants, not just the roses and lilies.": "पूरा सभी 50 पौधे हैं, सिर्फ़ गुलाब और लिली नहीं।",
    "Red beads": "लाल मनके", "Blue beads": "नीले मनके", "Yellow beads": "पीले मनके",
    "Red beads: what per cent?": "लाल मनके: कितना प्रतिशत?",
    "A box has 10 beads, 7 red and 3 blue: what per cent of the beads are red?": "एक डिब्बे में 10 मनके हैं, 7 लाल और 3 नीले: कितने प्रतिशत मनके लाल हैं?",
    "Put the 7 red beads over all 10 beads.": "7 लाल मनकों को सभी 10 मनकों के ऊपर रखो।",
    "White cups": "सफ़ेद कप", "Green cups": "हरे कप",
    "White cups: what per cent?": "सफ़ेद कप: कितना प्रतिशत?",
    "A tray has 60 cups, 27 white and 33 green: what per cent of the cups are white?": "एक ट्रे में 60 कप हैं, 27 सफ़ेद और 33 हरे: कितने प्रतिशत कप सफ़ेद हैं?",
    "The white cups go over all 60 cups.": "सफ़ेद कप सभी 60 कपों के ऊपर जाते हैं।",
    "The rule with brackets": "कोष्ठक वाला नियम",
    "Tap Rule to write the brackets for 18 out of 30.": "30 में से 18 के लिए कोष्ठक लिखने को नियम दबाओ।",
    "Rule is the key at the bottom.": "नियम नीचे वाला बटन है।",
    "Tap 18 to put the first number on top.": "पहली संख्या ऊपर रखने के लिए 18 दबाओ।",
    "The first number goes on top.": "पहली संख्या ऊपर जाती है।",
    "Now tap 30 to put it under the line.": "अब 30 दबाओ, ताकि वह रेखा के नीचे जाए।",
    "The second number goes under the line.": "दूसरी संख्या रेखा के नीचे जाती है।",
    "Tap the % tile to place it after the brackets.": "% वाली टाइल दबाओ, ताकि वह कोष्ठक के बाद आए।",
    "The % sign comes after the closing bracket.": "% चिह्न बंद कोष्ठक के बाद आता है।",
    "First number over the second, times 100 in brackets, and the % sign comes last.": "पहली संख्या बटा दूसरी, कोष्ठक में ×100, और % चिह्न सबसे बाद में।",
    "You learned: first number over second, times 100, then the % sign.": "तुमने सीखा: पहली बटा दूसरी, × 100, फिर % चिह्न।",
    "What per cent is 26 of 40?": "40 का कितना प्रतिशत 26 है?",
    "26 of 40 as a per cent?": "40 में 26 कितना प्रतिशत?",
    "Write 26 over 40 inside the brackets.": "कोष्ठक में 26 को ऊपर और 40 को नीचे लिखो।",
    "What per cent is 9 of 25?": "25 का कितना प्रतिशत 9 है?",
    "9 of 25 as a per cent?": "25 में 9 कितना प्रतिशत?",
    "Put 9 over 25, since 9 is the first number.": "9 पहली संख्या है, इसलिए उसे 25 के ऊपर रखो।",
    "Use the rule with brackets to find what per cent 27 is of 30.": "कोष्ठक वाले नियम से बताओ कि 30 का कितना प्रतिशत 27 है?",
    "27 of 30 as a per cent?": "30 में 27 कितना प्रतिशत?",
    "Put 27 on top and 30 below, then times 100.": "27 को ऊपर और 30 को नीचे रखो, फिर ×100 करो।",
    "Same unit first": "पहले एक ही इकाई",
    "Tap the Unit fact card to change 2 kg into grams.": "2 किलोग्राम को ग्राम में बदलने के लिए इकाई संबंध कार्ड दबाओ।",
    "The violet card holds the unit fact.": "बैंगनी कार्ड पर इकाई संबंध लिखा है।",
    "Tap Part over whole to put 600 g over 2,000 g.": "भाग बटा पूरा दबाओ, ताकि 600 ग्राम 2,000 ग्राम के ऊपर आए।",
    "Both amounts are in grams now, so use the key.": "अब दोनों मात्राएँ ग्राम में हैं, इसलिए बटन दबाओ।",
    "Tap the key once more to make the bottom 100.": "नीचे की संख्या 100 बनाने के लिए बटन एक बार और दबाओ।",
    "Read the key: it shows what to do to both numbers.": "बटन पढ़ो: उस पर लिखा है कि दोनों संख्याओं का क्या करना है।",
    "Write both amounts in one unit first, and say the unit fact you used.": "पहले दोनों मात्राएँ एक इकाई में लिखो, और अपना इकाई संबंध बोलो।",
    "You learned: write both amounts in the same unit first.": "तुमने सीखा: पहले दोनों मात्राएँ एक ही इकाई में लिखो।",
    "What per cent of 5 litres is 1,200 mL?": "5 लीटर का कितना प्रतिशत 1,200 मिलीलीटर है?",
    "1,200 mL of 5 litres?": "5 लीटर में 1,200 मिलीलीटर?",
    "Change 5 litres into millilitres before you divide.": "भाग देने से पहले 5 लीटर को मिलीलीटर में बदलो।",
    "What per cent of 2 m is 40 cm?": "2 मीटर का कितना प्रतिशत 40 सेंटीमीटर है?",
    "40 cm of 2 m?": "2 मीटर में 40 सेंटीमीटर?",
    "Change 2 m into centimetres first.": "पहले 2 मीटर को सेंटीमीटर में बदलो।",
    "What per cent of 3 kg is 360 g?": "3 किलोग्राम का कितना प्रतिशत 360 ग्राम है?",
    "360 g of 3 kg?": "3 किलोग्राम में 360 ग्राम?",
    "Turn 3 kg into grams, then put 360 g over it.": "3 किलोग्राम को ग्राम में बदलो, फिर 360 ग्राम उसके ऊपर रखो।",
    "Matches not won": "न जीते मैच",
    "Tap Sort to move the 9 matches not won into their own row.": "छाँटो दबाओ, ताकि न जीते 9 मैच अपनी अलग पंक्ति में जाएँ।",
    "Sort is the key at the bottom.": "छाँटो नीचे वाला बटन है।",
    "Tap the tiles with an equals sign to turn them over.": "बराबर के चिह्न वाली टाइलें पलटने के लिए उन्हें दबाओ।",
    "They sit at the end of the Not won row.": "वे न जीते वाली पंक्ति के अंत में हैं।",
    "Tap Part over whole to put the 9 not won over all 30.": "भाग बटा पूरा दबाओ, ताकि न जीते 9 सभी 30 के ऊपर आएँ।",
    "Use the key at the bottom again.": "नीचे वाला बटन फिर से दबाओ।",
    "Tap ÷ 3, × 10 to make the bottom 100.": "नीचे की संख्या 100 बनाने के लिए ÷ 3, × 10 दबाओ।",
    "Not won counts as lost only when no match was a draw.": "न जीते मैच तभी हारे गिने जाते हैं जब कोई मैच ड्रॉ न हुआ हो।",
    "You learned: not won is all the matches take away the matches won.": "तुमने सीखा: न जीते मैच = सारे मैच घटा जीते हुए मैच।",
    "A team played 25 matches and won 17: what per cent did it not win?": "एक टीम ने 25 मैच खेले और 17 जीते: कितने प्रतिशत मैच वह नहीं जीती?",
    "Not won: what per cent?": "न जीते: कितना प्रतिशत?",
    "Not won is all 25 take away the 17 won.": "न जीते यानी सारे 25 में से जीते हुए 17 घटाओ।",
    "Another team won 15 of its 20 matches: what per cent did it not win?": "दूसरी टीम ने अपने 20 में से 15 मैच जीते: कितने प्रतिशत नहीं जीती?",
    "Not won as a per cent?": "न जीते, प्रतिशत में?",
    "First count the matches this team did not win.": "पहले गिनो कि यह टीम कितने मैच नहीं जीती।",
    "Every match was won or lost: a team won 31 of 50, so what per cent did it lose?": "हर मैच जीता या हारा गया: टीम ने 50 में से 31 जीते, तो कितने प्रतिशत हारी?",
    "Lost: what per cent?": "हारे: कितना प्रतिशत?",
    "Count the matches not won, then put them over 50.": "न जीते मैच गिनो, फिर उन्हें 50 के ऊपर रखो।",
    "Put the part over the whole, then make the bottom 100.": "भाग को ऊपर और पूरे को नीचे रखो, फिर नीचे की संख्या 100 बनाओ।",
    "When the bottom is 100, the top number is the per cent.": "जब नीचे 100 हो, तो ऊपर की संख्या ही प्रतिशत है।",
    "No whole number times 60 makes 100, so divide the top and the bottom by 3 first.": "60 से सीधे 100 नहीं बनता, तो पहले ऊपर और नीचे दोनों को 3 से भाग दो।",
    "After dividing by 3, times the top and the bottom by 5.": "3 से भाग देने के बाद, ऊपर और नीचे दोनों को 5 से गुणा करो।",
    "Write the first number over the second, times 100, inside the brackets.": "कोष्ठक में पहली संख्या को दूसरी के ऊपर लिखो और ×100 करो।",
    "Times the top number by 100, then divide by the bottom number.": "ऊपर की संख्या को 100 से गुणा करो, फिर नीचे की संख्या से भाग दो।",
    "Change the whole into the part's unit, then put the part over it.": "पूरे को भाग की इकाई में बदलो, फिर भाग को उसके ऊपर रखो।",
    "Do the same to the top and the bottom until the bottom is 100.": "ऊपर और नीचे दोनों के साथ एक-सा करो, जब तक नीचे 100 न हो।",
    "Put the matches not won over all the matches played.": "न जीते मैचों को खेले गए सारे मैचों के ऊपर रखो।",
    "Make the bottom 100 by doing the same to the top and the bottom.": "ऊपर और नीचे के साथ एक-सा करके नीचे की संख्या 100 बनाओ।",
    "Yes, 23 over 50 is 46 over 100, or 46%.": "हाँ, 23 बटा 50 बराबर 46 बटा 100, यानी 46%।",
    "Yes, 7 over 10 is 70 over 100, or 70%.": "हाँ, 7 बटा 10 बराबर 70 बटा 100, यानी 70%।",
    "Yes, 27 over 60 is 45 over 100, or 45%.": "हाँ, 27 बटा 60 बराबर 45 बटा 100, यानी 45%।",
    "Yes, (26/40 × 100)% is 65%.": "हाँ, (26/40 × 100)% = 65%।",
    "Yes, (9/25 × 100)% is 36%.": "हाँ, (9/25 × 100)% = 36%।",
    "Yes, (27/30 × 100)% is 90%.": "हाँ, (27/30 × 100)% = 90%।",
    "Yes, 1,200 mL is 24% of 5,000 mL.": "हाँ, 5,000 मिलीलीटर का 24% है 1,200 मिलीलीटर।",
    "Yes, 40 cm is 20% of 200 cm.": "हाँ, 200 सेंटीमीटर का 20% है 40 सेंटीमीटर।",
    "Yes, 360 g is 12% of 3,000 g.": "हाँ, 3,000 ग्राम का 12% है 360 ग्राम।",
    "Yes, 8 of 25 not won is 32%.": "हाँ, 25 में से 8 न जीते, यानी 32%।",
    "Yes, 5 of 20 not won is 25%.": "हाँ, 20 में से 5 न जीते, यानी 25%।",
    "Yes, 19 of 50 lost is 38%.": "हाँ, 50 में से 19 हारे, यानी 38%।",
    "Whole": "पूरा", "Part": "भाग", "Unit fact": "इकाई संबंध", "Won": "जीते", "Matches": "मैच", "Not won": "न जीते", "Draw": "ड्रॉ",
    "Smaller whole": "छोटा पूरा", "Bigger whole": "बड़ा पूरा", "Smaller part": "छोटा भाग", "Bigger part": "बड़ा भाग",
    "Part over whole": "भाग बटा पूरा", "Rule": "नियम", "Sort": "छाँटो",
    "litre": "लीटर", "litres": "लीटर", "mL": "मिली", "m": "मीटर", "cm": "सेमी", "kg": "किग्रा", "g": "ग्राम",
  },
  gu: {
    "Part over Whole": "ભાગ બટ્ટા પૂર્ણ",
    "Free play. Lay any part against any whole.": "મુક્ત રમત. કોઈ પણ ભાગને કોઈ પણ પૂર્ણ સાથે સરખાવો.",
    "What per cent of the whole is the part?": "ભાગ, પૂર્ણના કેટલા ટકા છે?",
    "per cent": "ટકા", "%": "%",
    "The part over the whole": "પૂર્ણ ઉપર ભાગ",
    "Tap Part over whole to put the 14 red beads over all 25 beads.": "ભાગ બટ્ટા પૂર્ણ દબાવો, જેથી 14 લાલ મણકા બધા 25 મણકા ઉપર આવે.",
    "The key at the bottom writes the fraction.": "નીચેનું બટન અપૂર્ણાંક લખે છે.",
    "Tap × 4 so the bottom becomes 100.": "× 4 દબાવો, જેથી નીચેની સંખ્યા 100 થાય.",
    "Tap the same key once more.": "એ જ બટન ફરી એક વાર દબાવો.",
    "Now put the 8 blue beads over all 25 with Part over whole.": "હવે ભાગ બટ્ટા પૂર્ણથી 8 વાદળી મણકા બધા 25 ઉપર મૂકો.",
    "Each colour goes over all 25 beads.": "દરેક રંગ બધા 25 મણકા ઉપર જાય છે.",
    "Tap × 4 again to turn every colour into a per cent.": "દરેક રંગને ટકામાં ફેરવવા ફરી × 4 દબાવો.",
    "Make the bottom 100 for the blue beads too.": "વાદળી મણકા માટે પણ નીચેની સંખ્યા 100 બનાવો.",
    "The part over the whole, made into hundredths, is the per cent.": "ભાગ બટ્ટા પૂર્ણને સોમા ભાગમાં ફેરવો, તો એ જ ટકા છે.",
    "You learned: the part over the whole, in hundredths, is the per cent.": "તમે શીખ્યા: ભાગ બટ્ટા પૂર્ણ, સોમા ભાગમાં, એ જ ટકા છે.",
    "Marigolds": "ગલગોટા", "Roses": "ગુલાબ", "Lilies": "લીલી",
    "Marigolds: what per cent?": "ગલગોટા: કેટલા ટકા?",
    "Of 50 plants, 23 are marigolds, 19 roses, 8 lilies: what per cent are marigolds?": "50 છોડમાં 23 ગલગોટા, 19 ગુલાબ, 8 લીલી છે: કેટલા ટકા ગલગોટા છે?",
    "The whole is all 50 plants, not just the roses and lilies.": "પૂર્ણ એટલે બધા 50 છોડ, ફક્ત ગુલાબ અને લીલી નહીં.",
    "Red beads": "લાલ મણકા", "Blue beads": "વાદળી મણકા", "Yellow beads": "પીળા મણકા",
    "Red beads: what per cent?": "લાલ મણકા: કેટલા ટકા?",
    "A box has 10 beads, 7 red and 3 blue: what per cent of the beads are red?": "એક ડબ્બામાં 10 મણકા છે, 7 લાલ અને 3 વાદળી: કેટલા ટકા મણકા લાલ છે?",
    "Put the 7 red beads over all 10 beads.": "7 લાલ મણકાને બધા 10 મણકા ઉપર મૂકો.",
    "White cups": "સફેદ કપ", "Green cups": "લીલા કપ",
    "White cups: what per cent?": "સફેદ કપ: કેટલા ટકા?",
    "A tray has 60 cups, 27 white and 33 green: what per cent of the cups are white?": "એક ટ્રેમાં 60 કપ છે, 27 સફેદ અને 33 લીલા: કેટલા ટકા કપ સફેદ છે?",
    "The white cups go over all 60 cups.": "સફેદ કપ બધા 60 કપ ઉપર જાય છે.",
    "The rule with brackets": "કૌંસવાળો નિયમ",
    "Tap Rule to write the brackets for 18 out of 30.": "30 માંથી 18 માટે કૌંસ લખવા નિયમ દબાવો.",
    "Rule is the key at the bottom.": "નિયમ નીચેનું બટન છે.",
    "Tap 18 to put the first number on top.": "પહેલી સંખ્યા ઉપર મૂકવા 18 દબાવો.",
    "The first number goes on top.": "પહેલી સંખ્યા ઉપર જાય છે.",
    "Now tap 30 to put it under the line.": "હવે 30 દબાવો, જેથી તે રેખા નીચે જાય.",
    "The second number goes under the line.": "બીજી સંખ્યા રેખા નીચે જાય છે.",
    "Tap the % tile to place it after the brackets.": "% વાળી ટાઇલ દબાવો, જેથી તે કૌંસ પછી આવે.",
    "The % sign comes after the closing bracket.": "% ચિહ્ન બંધ કૌંસ પછી આવે છે.",
    "First number over the second, times 100 in brackets, and the % sign comes last.": "પહેલી સંખ્યા બટ્ટા બીજી, કૌંસમાં × 100, અને % ચિહ્ન છેલ્લે.",
    "You learned: first number over second, times 100, then the % sign.": "તમે શીખ્યા: પહેલી બટ્ટા બીજી, × 100, પછી % ચિહ્ન.",
    "What per cent is 26 of 40?": "26, 40 ના કેટલા ટકા છે?",
    "26 of 40 as a per cent?": "40 માં 26 કેટલા ટકા?",
    "Write 26 over 40 inside the brackets.": "કૌંસમાં 26 ઉપર અને 40 નીચે લખો.",
    "What per cent is 9 of 25?": "9, 25 ના કેટલા ટકા છે?",
    "9 of 25 as a per cent?": "25 માં 9 કેટલા ટકા?",
    "Put 9 over 25, since 9 is the first number.": "9 પહેલી સંખ્યા છે, તેથી તેને 25 ઉપર મૂકો.",
    "Use the rule with brackets to find what per cent 27 is of 30.": "કૌંસવાળા નિયમથી શોધો કે 27, 30 ના કેટલા ટકા છે.",
    "27 of 30 as a per cent?": "30 માં 27 કેટલા ટકા?",
    "Put 27 on top and 30 below, then times 100.": "27 ઉપર અને 30 નીચે મૂકો, પછી × 100 કરો.",
    "Same unit first": "પહેલાં એક જ એકમ",
    "Tap the Unit fact card to change 2 kg into grams.": "2 કિલોગ્રામને ગ્રામમાં ફેરવવા એકમ સંબંધ કાર્ડ દબાવો.",
    "The violet card holds the unit fact.": "જાંબલી કાર્ડ પર એકમ સંબંધ લખેલો છે.",
    "Tap Part over whole to put 600 g over 2,000 g.": "ભાગ બટ્ટા પૂર્ણ દબાવો, જેથી 600 ગ્રામ 2,000 ગ્રામ ઉપર આવે.",
    "Both amounts are in grams now, so use the key.": "હવે બંને માપ ગ્રામમાં છે, તેથી બટન દબાવો.",
    "Tap the key once more to make the bottom 100.": "નીચેની સંખ્યા 100 બનાવવા બટન ફરી એક વાર દબાવો.",
    "Read the key: it shows what to do to both numbers.": "બટન વાંચો: તેના પર લખ્યું છે કે બંને સંખ્યાનું શું કરવું.",
    "Write both amounts in one unit first, and say the unit fact you used.": "પહેલાં બંને માપ એક એકમમાં લખો, અને વાપરેલો એકમ સંબંધ બોલો.",
    "You learned: write both amounts in the same unit first.": "તમે શીખ્યા: પહેલાં બંને માપ એક જ એકમમાં લખો.",
    "What per cent of 5 litres is 1,200 mL?": "1,200 મિલીલિટર, 5 લિટરના કેટલા ટકા છે?",
    "1,200 mL of 5 litres?": "5 લિટરમાં 1,200 મિલીલિટર?",
    "Change 5 litres into millilitres before you divide.": "ભાગાકાર પહેલાં 5 લિટરને મિલીલિટરમાં ફેરવો.",
    "What per cent of 2 m is 40 cm?": "40 સેન્ટિમીટર, 2 મીટરના કેટલા ટકા છે?",
    "40 cm of 2 m?": "2 મીટરમાં 40 સેન્ટિમીટર?",
    "Change 2 m into centimetres first.": "પહેલાં 2 મીટરને સેન્ટિમીટરમાં ફેરવો.",
    "What per cent of 3 kg is 360 g?": "360 ગ્રામ, 3 કિલોગ્રામના કેટલા ટકા છે?",
    "360 g of 3 kg?": "3 કિલોગ્રામમાં 360 ગ્રામ?",
    "Turn 3 kg into grams, then put 360 g over it.": "3 કિલોગ્રામને ગ્રામમાં ફેરવો, પછી 360 ગ્રામ તેની ઉપર મૂકો.",
    "Matches not won": "ન જીતેલી મૅચ",
    "Tap Sort to move the 9 matches not won into their own row.": "છાંટો દબાવો, જેથી ન જીતેલી 9 મૅચ પોતાની હરોળમાં જાય.",
    "Sort is the key at the bottom.": "છાંટો નીચેનું બટન છે.",
    "Tap the tiles with an equals sign to turn them over.": "બરાબરના ચિહ્નવાળી ટાઇલ ઉલટાવવા તેને દબાવો.",
    "They sit at the end of the Not won row.": "તે ન જીતી હરોળના છેડે છે.",
    "Tap Part over whole to put the 9 not won over all 30.": "ભાગ બટ્ટા પૂર્ણ દબાવો, જેથી ન જીતેલી 9 બધી 30 ઉપર આવે.",
    "Use the key at the bottom again.": "નીચેનું બટન ફરીથી દબાવો.",
    "Tap ÷ 3, × 10 to make the bottom 100.": "નીચેની સંખ્યા 100 બનાવવા ÷ 3, × 10 દબાવો.",
    "Not won counts as lost only when no match was a draw.": "કોઈ મૅચ ડ્રૉ ન થઈ હોય ત્યારે જ ન જીતેલી મૅચ હારેલી ગણાય.",
    "You learned: not won is all the matches take away the matches won.": "તમે શીખ્યા: ન જીતેલી મૅચ = બધી મૅચ બાદ જીતેલી મૅચ.",
    "A team played 25 matches and won 17: what per cent did it not win?": "એક ટીમ 25 મૅચ રમી અને 17 જીતી: કેટલા ટકા મૅચ તે ન જીતી?",
    "Not won: what per cent?": "ન જીતી: કેટલા ટકા?",
    "Not won is all 25 take away the 17 won.": "ન જીતેલી એટલે બધી 25 માંથી જીતેલી 17 બાદ કરો.",
    "Another team won 15 of its 20 matches: what per cent did it not win?": "બીજી ટીમે પોતાની 20 માંથી 15 મૅચ જીતી: કેટલા ટકા ન જીતી?",
    "Not won as a per cent?": "ન જીતી, ટકામાં?",
    "First count the matches this team did not win.": "પહેલાં ગણો કે આ ટીમ કેટલી મૅચ ન જીતી.",
    "Every match was won or lost: a team won 31 of 50, so what per cent did it lose?": "દરેક મૅચ જીતી કે હારી: ટીમ 50 માંથી 31 જીતી, તો કેટલા ટકા હારી?",
    "Lost: what per cent?": "હારી: કેટલા ટકા?",
    "Count the matches not won, then put them over 50.": "ન જીતેલી મૅચ ગણો, પછી તેને 50 ઉપર મૂકો.",
    "Put the part over the whole, then make the bottom 100.": "ભાગ ઉપર અને પૂર્ણ નીચે મૂકો, પછી નીચેની સંખ્યા 100 બનાવો.",
    "When the bottom is 100, the top number is the per cent.": "જ્યારે નીચે 100 હોય, ત્યારે ઉપરની સંખ્યા જ ટકા છે.",
    "No whole number times 60 makes 100, so divide the top and the bottom by 3 first.": "60 માંથી સીધા 100 નથી બનતા, તેથી પહેલાં ઉપર અને નીચે બંનેને 3 વડે ભાગો.",
    "After dividing by 3, times the top and the bottom by 5.": "3 વડે ભાગ્યા પછી, ઉપર અને નીચે બંનેને 5 વડે ગુણો.",
    "Write the first number over the second, times 100, inside the brackets.": "કૌંસમાં પહેલી સંખ્યા બીજીની ઉપર લખો અને × 100 કરો.",
    "Times the top number by 100, then divide by the bottom number.": "ઉપરની સંખ્યાને 100 વડે ગુણો, પછી નીચેની સંખ્યા વડે ભાગો.",
    "Change the whole into the part's unit, then put the part over it.": "પૂર્ણને ભાગના એકમમાં ફેરવો, પછી ભાગને તેની ઉપર મૂકો.",
    "Do the same to the top and the bottom until the bottom is 100.": "નીચે 100 થાય ત્યાં સુધી ઉપર અને નીચે બંનેમાં એકસરખું કરો.",
    "Put the matches not won over all the matches played.": "ન જીતેલી મૅચને રમાયેલી બધી મૅચ ઉપર મૂકો.",
    "Make the bottom 100 by doing the same to the top and the bottom.": "ઉપર અને નીચે બંનેમાં એકસરખું કરીને નીચેની સંખ્યા 100 બનાવો.",
    "Yes, 23 over 50 is 46 over 100, or 46%.": "હા, 23 બટ્ટા 50 એટલે 46 બટ્ટા 100, એટલે કે 46%.",
    "Yes, 7 over 10 is 70 over 100, or 70%.": "હા, 7 બટ્ટા 10 એટલે 70 બટ્ટા 100, એટલે કે 70%.",
    "Yes, 27 over 60 is 45 over 100, or 45%.": "હા, 27 બટ્ટા 60 એટલે 45 બટ્ટા 100, એટલે કે 45%.",
    "Yes, (26/40 × 100)% is 65%.": "હા, (26/40 × 100)% = 65%.",
    "Yes, (9/25 × 100)% is 36%.": "હા, (9/25 × 100)% = 36%.",
    "Yes, (27/30 × 100)% is 90%.": "હા, (27/30 × 100)% = 90%.",
    "Yes, 1,200 mL is 24% of 5,000 mL.": "હા, 1,200 મિલીલિટર એ 5,000 મિલીલિટરના 24% છે.",
    "Yes, 40 cm is 20% of 200 cm.": "હા, 40 સેન્ટિમીટર એ 200 સેન્ટિમીટરના 20% છે.",
    "Yes, 360 g is 12% of 3,000 g.": "હા, 360 ગ્રામ એ 3,000 ગ્રામના 12% છે.",
    "Yes, 8 of 25 not won is 32%.": "હા, 25 માંથી 8 ન જીતી, એટલે કે 32%.",
    "Yes, 5 of 20 not won is 25%.": "હા, 20 માંથી 5 ન જીતી, એટલે કે 25%.",
    "Yes, 19 of 50 lost is 38%.": "હા, 50 માંથી 19 હારી, એટલે કે 38%.",
    "Whole": "પૂર્ણ", "Part": "ભાગ", "Unit fact": "એકમ સંબંધ", "Won": "જીતી", "Matches": "મૅચ", "Not won": "ન જીતી", "Draw": "ડ્રૉ",
    "Smaller whole": "નાનું પૂર્ણ", "Bigger whole": "મોટું પૂર્ણ", "Smaller part": "નાનો ભાગ", "Bigger part": "મોટો ભાગ",
    "Part over whole": "ભાગ બટ્ટા પૂર્ણ", "Rule": "નિયમ", "Sort": "છાંટો",
    "litre": "લિટર", "litres": "લિટર", "mL": "મિલિ", "m": "મીટર", "cm": "સેમી", "kg": "કિગ્રા", "g": "ગ્રામ",
  },
};

/* ── this tool's own constants (pw*: no name of the runtime's), declared before PHASES uses them ───────────────
   the chapter's content colours: given (the part) deep blue, the answer green, both terms / times 100 vermilion,
   a unit fact violet, not won rose, the step being worked amber */
const PW = { given: "#0072B2", answer: "#009E73", both: "#D55E00", unit: "#7B52B9", rose: "#CC79A7", amber: "#E69F00", cell: "#FFFDF7", line: "#2B2B2B" };
/* a per cent answer: ONE box, the % sign printed after it (chapter decision 2026-10-17: the child types the number only) */
const PW_PCT = [{ label: "per cent", unit: "%" }];
/* a unit fact: the whole's unit -> the part's unit */
const PW_UNITS: any = { L: { base: "mL", f: 1000, one: "litre", many: "litres" }, m: { base: "cm", f: 100, one: "m", many: "m" }, kg: { base: "g", f: 1000, one: "kg", many: "kg" } };
/* free play's wholes: each goes into 100 */
const PW_WHOLES = [2, 4, 5, 10, 20, 25, 50, 100];
/* the win line of each question, a literal each (tr-coverage reads them) */
const PW_WIN: any = {
  "M3.S4.T7.C30:PW1": (api: any) => api.say("Yes, 23 over 50 is 46 over 100, or 46%."),
  "M3.S4.T7.C30:1": (api: any) => api.say("Yes, 7 over 10 is 70 over 100, or 70%."),
  "M3.S4.T7.C30:5": (api: any) => api.say("Yes, 27 over 60 is 45 over 100, or 45%."),
  "M3.S4.T7.C31:PW2": (api: any) => api.say("Yes, (26/40 × 100)% is 65%."),
  "M3.S4.T7.C31:2": (api: any) => api.say("Yes, (9/25 × 100)% is 36%."),
  "M3.S4.T7.C31:6": (api: any) => api.say("Yes, (27/30 × 100)% is 90%."),
  "M3.S4.T7.C32:PW3": (api: any) => api.say("Yes, 1,200 mL is 24% of 5,000 mL."),
  "M3.S4.T7.C32:3": (api: any) => api.say("Yes, 40 cm is 20% of 200 cm."),
  "M3.S4.T7.C32:7": (api: any) => api.say("Yes, 360 g is 12% of 3,000 g."),
  "M3.S4.T7.C33:PW4": (api: any) => api.say("Yes, 8 of 25 not won is 32%."),
  "M3.S4.T7.C33:4": (api: any) => api.say("Yes, 5 of 20 not won is 25%."),
  "M3.S4.T7.C33:8": (api: any) => api.say("Yes, 19 of 50 lost is 38%."),
};

/* One entry per phase = one mount.
   says    the teach run, printed on the bubble a piece at a time before anything is asked (numbers are printed as words)
           keyOnly: digits print as written; a bubble line may name its number unless that gives the answer away
   steps   GUIDE STEPS (runtime r30; `hint` r34), when the plan's teach lines describe acts:
             steps: [{ say: "Tap Cut to cut the bar into ten equal parts.", on: "cut", hint: "Tap the Cut key first." },
                     { say: "Now tap one part to shade it.", on: "shade", hint: "Tap one piece of the bar." }],
           The phase then opens on steps[0].say with the question and the Answer key waiting (stage "demo"; `says` and
           OPENING are not shown). Work does the act when the CHILD does it and reports it: api.did("cut"). Only then does
           the bubble move to the next step (never on a timer); the last act opens the first question with its say.
           ONE CLICK PER STEP (2026-10-08): a step completes on one click of one control (a button such as Cut, or one
           piece of the picture), never on a count; if the idea needs more clicks, write more steps, each with the next
           instruction (the same `on` may repeat). The keypad's Enter is not a step act. Name a step's button after its
           act (data-control "cut") so the check can click it.
           Report EVERY click Work gets with api.did(name) at the moment of the click, awaited or not: a wrong act shows
           that step's `hint` UNDER the pinned instruction, unchanged until the child acts again (the header's Hint key
           shows it on demand as well). Work must also register api.onEnter so that Enter, the agent's check() and the dev
           solve() perform the CURRENT step (see Work below); props.stepOn names the act waited for: put the one <Invite/>
           on that control. ONE PAGE (r35): each `say`, each `hint`, each question's `say`, each `miss` and ladder rung is
           ONE sentence that fits the bubble (no timer ever pages it); a hint at most about 40 characters when its
           instruction runs to two lines, never over 80, never the answer; each hint unique in the phase.
           The scaffold writes ONE stub step per phase from its teach line: make it real, or delete the `steps` array of a
           phase whose teach describes no act (then `says` is the teach run and the phase opens on its first question).
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, printed once when it goes idle
           keyOnly: ONE sentence; the bubble shows it in place of the last win line
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone); steps are the newer way
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the question's line on the bubble (one sentence: one page); ask = the short prompt above the slot
                 (<= 3 lines of ~15 chars)
                 keyOnly: there is no question bar, so the bubble is the only place the question shows: `say` is the WHOLE question in ONE
                 sentence (the plan's question cut to one: put its setup back in when the child needs it). `ask` stays, because the checks and
                 the sidecar read it, but it is never drawn. A hint (miss, ladder rung) shows in place of the question: ONE sentence each
           answer what the slot or the working area must produce; miss = rung 1, shown at once UNDER the pinned
                  instruction after a miss (one sentence, never the answer; a second miss shows ladder[0], a third
                  ladder[1]), and kept there until the child acts again
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
const PHASES = [
  {
    n: 1,
    concept: "The part over the whole",
    conceptId: "M3.S4.T7.C30", objectiveIds: ["O11"],
    says: ["Name the whole first. Then put each part over it."],
    /* the warm-up (MODEL.warm[0]): 25 beads, 14 red, 8 blue, 3 yellow; one key whose label follows the act */
    steps: [
      { say: "Tap Part over whole to put the 14 red beads over all 25 beads.", on: "over", hint: "The key at the bottom writes the fraction." },
      { say: "Tap × 4 so the bottom becomes 100.", on: "hund", hint: "Tap the same key once more." },
      { say: "Now put the 8 blue beads over all 25 with Part over whole.", on: "over", hint: "Each colour goes over all 25 beads." },
      { say: "Tap × 4 again to turn every colour into a per cent.", on: "hund", hint: "Make the bottom 100 for the blue beads too." },
    ],
    stepHold: 2400,
    /* tries, as the plan writes it: First rung: name the whole and count it. Second rung: put one part over it. Third rung: the same task with a whole that goes into one hundred, before the question's own returns. */
    ladder: ["Put the part over the whole, then make the bottom 100.", "When the bottom is 100, the top number is the per cent."],
    closing: "The part over the whole, made into hundredths, is the per cent.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the part over the whole, in hundredths, is the per cent.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The whole bar lights amber, the part goes over all of it, both terms grow until the bottom is 100, and the per cent is written.",
    items: [
      /* learn PW1: answer in the plan = 46% */
      /* plan question: A garden bed has 50 plants: 23 marigolds, 19 roses and 8 lilies. What per cent of the plants are marigolds? */
      { qid: "M3.S4.T7.C30:PW1", kind: "bands", bands: [{ name: "Marigolds", c: 23, col: "#F28C28" }, { name: "Roses", c: 19, col: "#E879A8" }, { name: "Lilies", c: 8, col: "#EFE6F6" }], pick: 0, ask: "Marigolds: what per cent?",
        say: "Of 50 plants, 23 are marigolds, 19 roses, 8 lilies: what per cent are marigolds?", parts: PW_PCT, answer: [46], near: 85,
        miss: "The whole is all 50 plants, not just the roses and lilies." },
      /* practice 1: answer in the plan = 70%, because 7 of the 10 beads is 70% */
      /* plan question: A box has 10 beads: 7 red and 3 blue. What per cent of the beads are red? */
      { qid: "M3.S4.T7.C30:1", kind: "bands", bands: [{ name: "Red beads", c: 7, col: "#C46560" }, { name: "Blue beads", c: 3, col: "#3A7BD5" }], pick: 0, ask: "Red beads: what per cent?",
        say: "A box has 10 beads, 7 red and 3 blue: what per cent of the beads are red?", parts: PW_PCT, answer: [70], near: 233,
        miss: "Put the 7 red beads over all 10 beads." },
      /* practice 5: answer in the plan = 45%, because 27/60 = 45/100 */
      /* plan question: A tray has 60 cups: 27 white and 33 green. What per cent of the cups are white? */
      { qid: "M3.S4.T7.C30:5", kind: "bands", bands: [{ name: "White cups", c: 27, col: "#F7F3EA" }, { name: "Green cups", c: 33, col: "#6DBE8C" }], pick: 0, ask: "White cups: what per cent?",
        say: "A tray has 60 cups, 27 white and 33 green: what per cent of the cups are white?", parts: PW_PCT, answer: [45], near: 82,
        miss: "The white cups go over all 60 cups.",
        ladder: ["No whole number times 60 makes 100, so divide the top and the bottom by 3 first.", "After dividing by 3, times the top and the bottom by 5."] },
    ],
  },
  {
    n: 2,
    concept: "The rule with brackets",
    conceptId: "M3.S4.T7.C31", objectiveIds: ["O11"],
    says: ["First number over the second, times a hundred. The sign goes after the brackets."],
    /* TODO: guide steps, ONE click and ONE sentence each, a hint each (skeleton note "steps"): make this stub real, or delete it
       when the teach line describes no act (then `says` above is the teach run) */
    /* the warm-up (MODEL.warm[1]): 18 out of 30; the number tiles lie in the tray second number first, so placing them is a choice */
    steps: [
      { say: "Tap Rule to write the brackets for 18 out of 30.", on: "rule", hint: "Rule is the key at the bottom." },
      { say: "Tap 18 to put the first number on top.", on: "first", hint: "The first number goes on top." },
      { say: "Now tap 30 to put it under the line.", on: "second", hint: "The second number goes under the line." },
      { say: "Tap the % tile to place it after the brackets.", on: "sign", hint: "The % sign comes after the closing bracket." },
    ],
    /* tries, as the plan writes it: First rung: place the first number on top. Second rung: place the second under it and add times one hundred. Third rung: the same task with a second number that goes into one hundred, before the question's own returns. */
    ladder: ["Write the first number over the second, times 100, inside the brackets.", "Times the top number by 100, then divide by the bottom number."],
    closing: "First number over the second, times 100 in brackets, and the % sign comes last.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: first number over second, times 100, then the % sign.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The part bar lights amber, the rule is written whole with the first number over the second, and the per cent is written after it.",
    items: [
      /* learn PW2: answer in the plan = 65% */
      { qid: "M3.S4.T7.C31:PW2", kind: "rule", a: 26, b: 40, say: "What per cent is 26 of 40?", ask: "26 of 40 as a per cent?", parts: PW_PCT, answer: [65], near: 154,
        miss: "Write 26 over 40 inside the brackets." },
      /* practice 2: answer in the plan = 36%, because (9/25 x 100)% = 36% */
      { qid: "M3.S4.T7.C31:2", kind: "rule", a: 9, b: 25, say: "What per cent is 9 of 25?", ask: "9 of 25 as a per cent?", parts: PW_PCT, answer: [36], near: 278,
        miss: "Put 9 over 25, since 9 is the first number." },
      /* practice 6: answer in the plan = (27/30 x 100)% = 90% */
      { qid: "M3.S4.T7.C31:6", kind: "rule", a: 27, b: 30, say: "Use the rule with brackets to find what per cent 27 is of 30.", ask: "27 of 30 as a per cent?", parts: PW_PCT, answer: [90], near: 111,
        miss: "Put 27 on top and 30 below, then times 100." },
    ],
  },
  {
    n: 3,
    concept: "Same unit first",
    conceptId: "M3.S4.T7.C32", objectiveIds: ["O12"],
    says: ["Grams and kilograms do not match yet. Which unit fact helps?"],
    /* TODO: guide steps, ONE click and ONE sentence each, a hint each (skeleton note "steps"): make this stub real, or delete it
       when the teach line describes no act (then `says` above is the teach run) */
    /* the warm-up (MODEL.warm[2]): 600 g of 2 kg */
    steps: [
      { say: "Tap the Unit fact card to change 2 kg into grams.", on: "unit", hint: "The violet card holds the unit fact." },
      { say: "Tap Part over whole to put 600 g over 2,000 g.", on: "over", hint: "Both amounts are in grams now, so use the key." },
      { say: "Tap the key once more to make the bottom 100.", on: "hund", hint: "Read the key: it shows what to do to both numbers." },
    ],
    /* tries, as the plan writes it: First rung: pick the unit fact card. Second rung: rewrite one amount and read both. Third rung: the same task with a whole of one unit, before the question's own returns. */
    ladder: ["Change the whole into the part's unit, then put the part over it.", "Do the same to the top and the bottom until the bottom is 100."],
    closing: "Write both amounts in one unit first, and say the unit fact you used.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: write both amounts in the same unit first.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The unit fact rewrites the whole in violet, the part bar settles at its true length, and the part over the whole is made into hundredths.",
    items: [
      /* learn PW3: answer in the plan = 24% */
      { qid: "M3.S4.T7.C32:PW3", kind: "units", part: [1200, "mL"], whole: [5, "L"], say: "What per cent of 5 litres is 1,200 mL?", ask: "1,200 mL of 5 litres?", parts: PW_PCT, answer: [24], near: 240,
        miss: "Change 5 litres into millilitres before you divide." },
      /* practice 3: answer in the plan = 40% (40 cm of 1 m). The owner, 2026-10-17 (BUILD_CARD §7): 40 cm of 2 m, so the question no longer
         prints its own answer; 1 m = 100 cm, 2 m = 200 cm, 40/200 = 20/100, which is 20% */
      { qid: "M3.S4.T7.C32:3", kind: "units", part: [40, "cm"], whole: [2, "m"], say: "What per cent of 2 m is 40 cm?", ask: "40 cm of 2 m?", parts: PW_PCT, answer: [20], near: 2000,
        miss: "Change 2 m into centimetres first." },
      /* practice 7: answer in the plan = 12%. 1 kg = 1000 g, so 3 kg = 3000 g, and 360/3000 = 12/100, which is 12% */
      { qid: "M3.S4.T7.C32:7", kind: "units", part: [360, "g"], whole: [3, "kg"], say: "What per cent of 3 kg is 360 g?", ask: "360 g of 3 kg?", parts: PW_PCT, answer: [12], near: 120,
        miss: "Turn 3 kg into grams, then put 360 g over it." },
    ],
  },
  {
    n: 4,
    concept: "Matches not won",
    conceptId: "M3.S4.T7.C33", objectiveIds: ["O12"],
    says: ["Which matches were not won? Is a draw a match the team did not win?"],
    /* TODO: guide steps, ONE click and ONE sentence each, a hint each (skeleton note "steps"): make this stub real, or delete it
       when the teach line describes no act (then `says` above is the teach run) */
    /* the warm-up (MODEL.warm[3]): 30 matches, 21 won, 6 lost, 3 draws */
    steps: [
      { say: "Tap Sort to move the 9 matches not won into their own row.", on: "sort", hint: "Sort is the key at the bottom." },
      { say: "Tap the tiles with an equals sign to turn them over.", on: "flip", hint: "They sit at the end of the Not won row." },
      { say: "Tap Part over whole to put the 9 not won over all 30.", on: "over", hint: "Use the key at the bottom again." },
      { say: "Tap ÷ 3, × 10 to make the bottom 100.", on: "hund", hint: "Read the key: it shows what to do to both numbers." },
    ],
    /* tries, as the plan writes it: First rung: count the tiles in the Won row. Second rung: count the tiles in the Not won row. Third rung: the same task with a row that has no draw, before the question's own returns. */
    ladder: ["Put the matches not won over all the matches played.", "Make the bottom 100 by doing the same to the top and the bottom."],
    closing: "Not won counts as lost only when no match was a draw.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: not won is all the matches take away the matches won.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The tiles sort into Won and Not won, the Not won row lights and is counted, and its count over all the matches is made into hundredths.",
    items: [
      /* learn PW4: answer in the plan = 32% */
      /* plan question: A team played 25 matches and won 17. What per cent of its matches did it not win? */
      { qid: "M3.S4.T7.C33:PW4", kind: "matches", played: 25, won: 17, draws: 0, say: "A team played 25 matches and won 17: what per cent did it not win?", ask: "Not won: what per cent?", parts: PW_PCT, answer: [32], near: 68,
        miss: "Not won is all 25 take away the 17 won." },
      /* practice 4: answer in the plan = 20% (won 16 of 20). The owner, 2026-10-17 (BUILD_CARD §7): won 15 of 20, so the question no longer
         prints its own answer; 5 of the 20 matches were not won, and 5/20 = 25/100, which is 25% */
      /* plan question: A team played 20 matches and won 16. What per cent of its matches did it not win? */
      { qid: "M3.S4.T7.C33:4", kind: "matches", played: 20, won: 15, draws: 0, say: "Another team won 15 of its 20 matches: what per cent did it not win?", ask: "Not won as a per cent?", parts: PW_PCT, answer: [25], near: 75,
        miss: "First count the matches this team did not win." },
      /* practice 8: answer in the plan = 38%. 50 - 31 = 19 matches were not won, and since every match was either won or lost, 19 were lost: 19/50 = 38/100, which is 38% */
      /* plan question: A team played 50 matches and won 31, and every match was either won or lost. What per cent of its matches did it lose? */
      { qid: "M3.S4.T7.C33:8", kind: "matches", played: 50, won: 31, draws: 0, say: "Every match was won or lost: a team won 31 of 50, so what per cent did it lose?", ask: "Lost: what per cent?", parts: PW_PCT, answer: [38], near: 62,
        miss: "Count the matches not won, then put them over 50." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
/* each phase's warm-up (its guide steps), then the drawing helpers; the questions carry their own numbers */
const MODEL = {
  warm: [
    /* the red is a soft brick red: a saturated red on screen after a miss reads as marking it wrong (wrong-is-unmarked) */
    { bands: [{ name: "Red beads", c: 14, col: "#C46560" }, { name: "Blue beads", c: 8, col: "#3A7BD5" }, { name: "Yellow beads", c: 3, col: "#F2C12E" }], pick: 0 },
    { a: 18, b: 30 },
    { part: [600, "g"], whole: [2, "kg"] },
    { played: 30, won: 21, draws: 3 },
  ],
};

const pwGcd = (a: number, b: number): number => (b ? pwGcd(b, a % b) : a);
/* what turns the bottom q into 100, done to both terms: [["×", 4]] · [["÷", 20]] · [["÷", 3], ["×", 10]] · [] */
const pwOps = (q: number): any[] => {
  if (q === 100) return [];
  if (100 % q === 0) return [["×", 100 / q]];
  if (q % 100 === 0) return [["÷", q / 100]];
  const g = pwGcd(q, 100);
  return [["÷", q / g], ["×", 100 / g]];
};
const pwOpLabel = (q: number) => pwOps(q).map((o: any) => o[0] + " " + o[1]).join(", ");
/* a text's width, roughly (Poppins, 0.58 em a character) */
const pwW = (s: any, fs: number) => String(s).length * fs * 0.58;
/* the chain on the card: p/q, then each both-terms step, ending on ?/100; where each piece sits (card units) */
const pwChainGeo = (p: number, q: number) => {
  const ops = pwOps(q), fr: any[] = [[p, q]];
  ops.forEach((o: any) => { const f = fr[fr.length - 1]; fr.push(o[0] === "×" ? [f[0] * o[1], f[1] * o[1]] : [f[0] / o[1], f[1] / o[1]]); });
  const xs: number[] = [], ws: number[] = [], gx: number[] = [];
  let x = 26;
  fr.forEach((f: any, i: number) => {
    if (i) { gx.push(x); x += 104; }
    const w = Math.max(String(f[0]).length, String(f[1]).length) * 27 + 26;
    xs.push(x); ws.push(w); x += w;
  });
  const pc = fr[fr.length - 1][0];
  return { ops, fr, xs, ws, gx, end: x, w: x + 24 + pwW("= " + pc + "%", T.xl) + 26 };
};
/* the matches in the order they were played: won, lost, or a draw (draws last among the not won) */
const pwMatches = (d: any) => {
  const N = d.played, m = d.played - d.won, k: string[] = Array(N).fill("won");
  for (let j = 0; j < m; j++) k[Math.min(N - 1, Math.floor(((j + 0.5) * N) / m))] = j >= m - (d.draws || 0) ? "draw" : "lost";
  return k;
};
/* the biggest tile pitch that fits the mixed grid, and the Won and Not won rows (plus `extra` under them: the word Draw), in w x h */
const pwPitch = (N: number, won: number, nw: number, w: number, h: number, extra = 0) => {
  for (let p = 78; p > 30; p -= 2) {
    const c = Math.floor(w / p);
    if (c >= 1 && Math.ceil(N / c) * p <= h && (Math.ceil(won / c) + Math.ceil(nw / c)) * p + 16 + extra <= h) return p;
  }
  return 30;
};
const pwStar = (cx: number, cy: number, r: number) => {
  let s = "";
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
    s += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * Math.sin(a)).toFixed(1) + " ";
  }
  return s + "Z";
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: one box, a number (the % sign is printed in the slot) */
const judge = (item: any, v: any) => (item.parts ? judgeSlotParts(item, v) : leadNumber(v) === item.answer);
/* oracle: a second route, sharing nothing with judge or Work: the part and the whole from the item's own numbers (one unit
   by its own table), then the count of hundredths k with k x whole = part x 100, found by search */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  let part = 0, whole = 0;
  if (p.n === 1) { part = it.bands[it.pick].c; for (const b of it.bands) whole += b.c; }
  else if (p.n === 2) { part = it.a; whole = it.b; }
  else if (p.n === 3) { const f: any = { L: 1000, m: 100, kg: 1000 }; part = it.part[0]; whole = it.whole[0] * f[it.whole[1]]; }
  else { part = it.played - it.won; whole = it.played; }
  let k = 0;
  while (k <= 100 && k * whole !== part * 100) k++;
  return k <= 100 && k === it.answer[0];
}));
/* the item's misconception, as the plan names it: the part over the other parts (P1), the second number over the first (P2),
   the units mixed (P3), the per cent won (P4) */
const nearMiss = (item: any) => String(item.near);
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => { const a = item.answer[0]; return [String(a), indian(a), words(a)]; };
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so the agent's check() reaches api.onEnter and performs the current step:
   set HOOK.check only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): the whole card (1472 x 528) with the answer panel shut and 1086 x 528 with it
   open, easing between (the board layout, docs/LAYOUT.md §1b, docs/PATTERNS.md §14): lay everything out from box.w
   with plain arithmetic in render, never from constants or api.W. Origin at the area's top-left.
   keyOnly (LAYOUT.md §1d): the question bar is gone, so the working area is 64,108, 1472 x 520 (NOT 64,202 x 528) with the panel shut, 1086 (900
   with bigPad) x 520 open. box.key = { x, y, w, h } is the key's corner in THIS area's coordinates (about x 1190, y 0, 282 x 88; wider on a
   Yes/No question): keep every element out of it, e.g. const kx = box.key ? box.key.x - 12 : box.w; (board-fit). There is no runs zone.
   Every act (cut, measure, count, tidy ...) is performed on screen: await api.act({ tool, moves, at, onPoint }) from the child's tap and
   react only when it resolves true (PATTERNS.md §15).
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the bubble already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked.
   Sound effects where the picture moves: api.sfx.cut() (a knife), settle() (pieces come to rest),
   trade() (pieces close into one), tick() (a snap); correct, wrong, win and cheer are the runtime's.
   step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase).
   nextKey: true (the ToolFrame below, runtime r48+): nothing moves on by itself. After a right answer the win picture
   stays on the board until the child presses the blinking Next key, so never reset it on a timer (PATTERNS.md 9d).
   A SKIN (docs/IMAGES.md, docs/PATTERNS.md §14): when the slot has an images.tsx, draw <Skin name x y w h clip /> over
   the plain shape the tool already draws for the object (the plain shape stays the fallback); never a raster tag of your own here (no-raster-in-tool).
   */
function Work({ n, item, index, stage, wrong, api, stepOn, box, tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free", demo = stage === "demo", warm = demo || stage === "teach";
  /* the numbers on screen: the phase's warm-up during its guide steps, else the question's (free play: the child's own) */
  const d: any = free ? null : warm ? MODEL.warm[n - 1] : item;
  /* the child's own state, kept per screen: a new question or phase starts it afresh, with no stale frame */
  const qk = free ? "free" : warm ? n + ":w" : n + ":" + index;
  const INIT: any = { over: 0, hund: 0, rule: false, top: null, bot: null, sign: false, unit: false, lit: 0, sorted: false, flip: false, fix: 0, touched: false, fw: 3, fp: 3 };
  const [st, setSt] = useState<any>({ k: qk, ...INIT });
  const s: any = st.k === qk ? st : { k: qk, ...INIT };
  const put = (o: any) => setSt((p0: any) => ({ ...(p0.k === qk ? p0 : { k: qk, ...INIT }), ...o }));
  const playing = useRef(false), lastKey = useRef(0);
  const ink = (c: string) => shade(c, 0.25);
  const mot = reducedMotion() ? undefined : "transform .5s ease";

  /* ONE size and place (LAYOUT §3): the picture is laid out once for the OPEN wide keypad (x 0 to 900 of Work) and stays there
     when the pad is shut, so nothing re-lays or jumps while the child types; the key's corner (x 1190 on) is never reached.
     Rows: a top band 0-80 (tiles, the unit card, the legend), the whole bar 96-150, the part bar 180-232, the card from 256,
     the key 440-517; 16 or more clear between them */
  const Wd = BOARD_OPEN_W_BIG;
  const LX = 16, BX = free ? 190 : n === 3 ? 290 : n === 4 ? 170 : 190, L = Wd - (n === 1 && !free ? 100 : 128) - BX;
  const YW = 96, HW = 54, YP = 180, HP = 52, CT = 256, CY = n === 2 && !free ? CT + 84 : CT + 66, KY = 440, KH = 72, KW = 300, KX = Math.round((Wd - KW) / 2);
  const live = demo || free || (stage === "ask" && !tl.busy);

  /* after a miss the correction is drawn from the right answer (f1 the setup, f2 the chain, f3 the per cent) and stands
     until the child acts again; it is never written into the child's own state */
  const reveal = stage === "win" || stage === "idle";
  const fixOn = stage === "ask" && s.fix > 0 && !s.touched;
  const f1 = reveal || (fixOn && s.fix >= 1), f2 = reveal || (fixOn && s.fix >= 2), f3 = reveal || (fixOn && s.fix >= 3);

  /* this screen's part and whole (one unit), how far the card's chain has gone, and the one key's act */
  let p = 0, q = 0, cOver = false, cHund = false, cRev = false, keyOn: any = null, partBand = -1;
  /* the hundredths key: the warm-up and question 1 only; questions 2 and 3 stop at the part over the whole (the correction
     still draws the whole chain) */
  const hundKey = warm || index === 0;
  let pctBands: number[] = [], unitOn = false, vRule = false, vTop: any = null, vBot: any = null, vSign = false, sorted = false;
  if (free) { q = PW_WHOLES[s.fw]; p = Math.min(s.fp, q); cOver = cHund = cRev = true; }
  else if (n === 1 && d) {
    q = d.bands.reduce((a: number, b: any) => a + b.c, 0);
    if (warm) {
      partBand = s.over ? [0, 1][s.over - 1] : -1;
      cOver = s.over > 0; cHund = cOver && s.hund >= s.over; cRev = cHund;
      pctBands = s.hund >= 2 ? [0, 1, 2] : s.hund >= 1 ? [0] : [];
      keyOn = s.over > s.hund ? "hund" : s.over < 2 ? "over" : null;
    } else {
      cOver = f1 || s.over > 0; cHund = f2 || s.hund > 0; cRev = f3; partBand = cOver ? d.pick : -1;
      /* at the win every band shows its per cent (together 100%); in the correction only the asked one */
      pctBands = reveal ? d.bands.map((_: any, k: number) => k) : f3 ? [d.pick] : [];
      keyOn = !s.over ? "over" : !s.hund && hundKey ? "hund" : null;
    }
    p = d.bands[partBand >= 0 ? partBand : d.pick].c;
  } else if (n === 2 && d) {
    p = d.a; q = d.b;
    vRule = f1 || s.rule; vTop = f1 ? "first" : s.top; vBot = f1 ? "second" : s.bot; vSign = f1 || s.sign;
    cRev = warm ? s.sign && s.top === "first" && s.bot === "second" : f3;
    keyOn = !s.rule ? "rule" : null;
  } else if (n === 3 && d) {
    p = d.part[0]; q = d.whole[0] * PW_UNITS[d.whole[1]].f;
    unitOn = f1 || s.unit; cOver = f2 || s.over > 0; cHund = f2 || s.hund > 0; cRev = warm ? s.hund > 0 : f3;
    keyOn = !s.unit ? null : !s.over ? "over" : !s.hund && hundKey && pwOps(q).length ? "hund" : null;
  } else if (n === 4 && d) {
    q = d.played; p = d.played - d.won;
    sorted = f1 || s.sorted; cOver = f2 || s.over > 0; cHund = f2 || s.hund > 0; cRev = warm ? s.hund > 0 : f3;
    keyOn = !s.sorted ? "sort" : !s.over ? "over" : !s.hund && hundKey && pwOps(q).length ? "hund" : null;
  }
  const pct = q ? Math.round((p * 100) / q) : 0;

  /* the card's chain (every phase but the rule's) */
  const g: any = q && (free || n !== 2) ? pwChainGeo(p, q) : null;
  const cardW = g ? Math.max(380, Math.round(g.w)) : 380, cardX = Math.round((Wd - cardW) / 2);
  const nShown = !g || !cOver ? 0 : cHund ? g.fr.length : 1;

  /* phase 2: the rule's card and its tiles (in the tray the second number lies first, so placing them is a choice) */
  /* the rule's card is 680 x 168; the number tiles are 50 tall (their finger boxes 72, touching at the fraction bar, never
     overlapping), 16 or more inside the card's edge */
  const c2 = Math.round((Wd - 680) / 2), TH = 50;
  const TW = (id: string) => (id === "sign" ? 80 : 112);
  const tray: any = { second: { x: LX, y: 15 }, first: { x: LX + 128, y: 15 }, sign: { x: LX + 256, y: 15 } };
  const slot: any = { top: { x: c2 + 60, y: CY - 61 }, bot: { x: c2 + 60, y: CY + 11 }, sign: { x: c2 + 384, y: CY - 25 } };
  const posOf = (id: string, top: any, bot: any, sign: boolean) => (id === "sign" ? (sign ? slot.sign : tray.sign) : top === id ? slot.top : bot === id ? slot.bot : tray[id]);
  const mid = (o: any, id: string) => ({ x: o.x + TW(id) / 2, y: o.y + TH / 2 });

  /* phase 4: the match tiles, mixed in playing order, then sorted into a Won row and a Not won row (draws set apart at its end,
     the word Draw under them once they are turned). Each row is balanced (19 breaks 10 + 9, never 18 + 1) */
  const kinds: string[] = n === 4 && d ? pwMatches(d) : [];
  const dr = n === 4 && d ? d.draws || 0 : 0, lostN = p - dr, nwSlots = p + (dr ? 1 : 0);
  const aw = Wd - 16 - BX;
  const P = n === 4 && d ? pwPitch(q, q - p, nwSlots, aw, 230, dr ? 64 : 0) : 60, cols = Math.max(1, Math.floor(aw / P)), ts = P - 4;
  const per = (cnt: number) => Math.max(1, Math.ceil(cnt / Math.max(1, Math.ceil(cnt / cols))));
  const pM = per(q), pW = per(q - p), pN = per(nwSlots);
  const yB1 = 6, yB2 = yB1 + Math.max(1, Math.ceil((q - p) / pW)) * P + 16, rowsN = Math.max(1, Math.ceil(nwSlots / pN));
  let wI = 0, lI = 0, dI = 0, nI = 0;
  const tiles: any[] = kinds.map((k: string, i: number) => {
    const mixed = { x: BX + (i % pM) * P, y: yB1 + Math.floor(i / pM) * P };
    if (k === "won") { const band = { x: BX + (wI % pW) * P, y: yB1 + Math.floor(wI / pW) * P }; wI++; return { k, i, mixed, band, nw: -1 }; }
    const sl = k === "lost" ? lI++ : lostN + 1 + dI++;
    return { k, i, mixed, band: { x: BX + (sl % pN) * P, y: yB2 + Math.floor(sl / pN) * P }, nw: nI++ };
  });
  const fd = tiles.find((t: any) => t.k === "draw");
  const dG = fd ? { x: fd.band.x - 4, y: fd.band.y + ts / 2 - Math.max(72, ts + 8) / 2, w: dr * P, h: Math.max(72, ts + 8) } : null;

  /* GUIDE STEPS and the one key: every act is performed on screen (api.act) and reported (api.did) when it ends; a tap the
     step is not waiting for is reported at once (its hint shows) and does nothing */
  const go = (o: any, done: () => void) => {
    if (playing.current) return;
    playing.current = true;
    Promise.resolve(api.act(o)).then((ok: any) => { playing.current = false; if (ok) done(); });
  };
  const act = (on: string) => {
    if (demo && on !== stepOn) { api.did(on); return; }
    if (!(demo || stage === "ask") || playing.current || (!demo && tl.busy)) return;
    const fin = () => { if (demo) api.did(on); };
    if (!demo) put({ touched: true });
    if (on === "over" && g) {
      const x = cardX + g.xs[0] + g.ws[0] / 2;
      go({ tool: "pencil", moves: "draw", from: { x: x - 46, y: CY }, at: [{ x, y: CY }], to: { x: x + 46, y: CY } }, () => { put({ over: s.over + 1 }); api.sfx.settle(); fin(); });
    } else if (on === "hund" && g && g.gx.length) {
      const xs = g.gx.map((x: number) => cardX + x);
      go({ tool: "pencil", moves: "draw", from: { x: xs[0] + 8, y: CY - 30 }, at: xs.map((x: number) => ({ x: x + 52, y: CY - 30 })), to: { x: xs[xs.length - 1] + 96, y: CY - 30 } },
        () => { put({ hund: s.hund + 1 }); api.sfx.settle(); fin(); });
    } else if (on === "rule") {
      go({ tool: "pencil", moves: "draw", from: { x: c2 + 30, y: CY - 70 }, at: [{ x: c2 + 190, y: CY }], to: { x: c2 + 340, y: CY + 70 } }, () => { put({ rule: true }); fin(); });
    } else if (on === "first" || on === "second") {
      if (!demo && !s.rule) return;
      let patch: any = null, dest: any = null;
      if (s.top === on) { patch = { top: null }; dest = tray[on]; }
      else if (s.bot === on) { patch = { bot: null }; dest = tray[on]; }
      else if (!s.top) { patch = { top: on }; dest = slot.top; }
      else if (!s.bot) { patch = { bot: on }; dest = slot.bot; }
      if (!patch) return;
      go({ tool: "hand", moves: "carry", from: mid(posOf(on, s.top, s.bot, s.sign), on), at: [mid(dest, on)] }, () => { put(patch); api.sfx.tick(); fin(); });
    } else if (on === "sign") {
      if (!demo && !s.rule) return;
      go({ tool: "hand", moves: "carry", from: mid(s.sign ? slot.sign : tray.sign, "sign"), at: [mid(s.sign ? tray.sign : slot.sign, "sign")] },
        () => { put({ sign: !s.sign }); api.sfx.tick(); fin(); });
    } else if (on === "unit") {
      if (s.unit) return;
      go({ tool: "eraser", moves: "rub", at: [{ x: LX + 90, y: YW + 52 }] }, () => {
        put({ unit: true }); fin();
        setTimeout(() => api.sfx.settle(), reducedMotion() ? 0 : 700);   /* the part bar settles against the whole */
      });
    } else if (on === "sort") {
      if (s.sorted) return;
      const pts = tiles.filter((t: any) => t.nw >= 0).map((t: any) => ({ x: t.mixed.x + ts / 2, y: t.mixed.y + ts / 2 }));
      go({ tool: "hand", moves: "sweep", at: pts, onPoint: (i: number) => put({ lit: i + 1 }) }, () => { put({ sorted: true }); api.sfx.settle(); fin(); });
    } else if (on === "flip" && dG) {
      if (s.flip || !s.sorted) return;
      go({ tool: "hand", moves: "tap", at: [{ x: dG.x + dG.w / 2, y: dG.y + dG.h / 2 }] }, () => { put({ flip: true }); api.sfx.tick(); fin(); });
    }
  };
  /* one tap never also presses the next label (400 ms) */
  const press = (on: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; act(on); };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  api.onEnter(demo && stepOn ? () => act(stepOn) : null);
  HOOK.demo = demo && stepOn ? () => act(stepOn) : null;

  /* the traceback: lock, light the whole, set the part over it, grow both terms, end on the per cent; then unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run([[700, () => put({ fix: 1, touched: false })], [700, () => put({ fix: 2 })], [1000, () => put({ fix: 3 })]], () => api.lock(false));
  }, [wrong]);
  /* the win line: a literal per question */
  useEffect(() => { if (stage === "win" && item && PW_WIN[item.qid]) PW_WIN[item.qid](api); }, [stage]);

  /* what the host and the agent read back (toolApi.getState): never the answer before it is given */
  api.share({
    part: p || null, whole: q || null,
    unit: n === 3 && d ? (unitOn ? PW_UNITS[d.whole[1]].base : d.whole[1]) : null,
    fraction: n === 2 ? (vTop && vBot ? (vTop === "first" ? p : q) + "/" + (vBot === "first" ? p : q) : null) : cOver ? p + "/" + q : null,
    rule: n === 2 ? vRule : null,
    tiles: n === 4 && d ? { played: q, won: q - p, sorted } : null,
    complete: stage === "idle",
  });

  /* ── drawing helpers (called, never mounted) ── */
  const side = (y: number, name: string, val: string, col: string) => (
    <g>
      <text x={LX} y={y + 18} fontSize={T.label} fontWeight={600} fill={C.ink}>{name}</text>
      {val ? <text x={LX} y={y + 62} fontSize={T.prompt} fontWeight={700} fill={col}>{val}</text> : null}
    </g>
  );
  /* a row of cells; beads are drawn as beads: a square box (the bead is a ball), the plain disc, the `bead` skin, the
     bead's own colour over it, a dark outline */
  /* R: cells a row (a long whole wraps into equal rows of R, each h tall) */
  const cellRow = (y0: number, h: number, from: number, count: number, cw: number, fill: string, kp: string, bead = false, R = 1e9) =>
    Array.from({ length: count }, (_, j) => {
      const x0 = BX + ((from + j) % R) * cw, y = y0 + Math.floor((from + j) / R) * h;
      if (!bead) return <rect key={kp + j} x={x0 + 1.5} y={y + 4} width={Math.max(1, cw - 3)} height={h - 8} rx={Math.min(6, cw / 4)} fill={fill} stroke={C.ink} strokeWidth={1.5} />;
      const sd = Math.max(6, Math.min(cw - 3, h - 10)), bx = x0 + (cw - sd) / 2, by = y + (h - sd) / 2, r = sd / 2;
      return (
        <g key={kp + j}>
          <circle cx={bx + r} cy={by + r} r={r} fill={fill} />
          <Skin name="bead" x={bx} y={by} w={sd} h={sd} fit="stretch" />
          <circle cx={bx + r} cy={by + r} r={r * 0.92} fill={fill} fillOpacity={0.6} />
          <circle cx={bx + r} cy={by + r} r={r - 0.75} fill="none" stroke={C.ink} strokeWidth={1.5} />
        </g>
      );
    });
  /* a bar is a ribbon: the plain rect, ONE ribbon skin clipped to it, a deep-blue tint over a part's, then the outline */
  const ribbon = (id: string, x: number, y: number, w: number, h: number, fill: string, tint: string | null) => (w <= 0 ? null : (
    <g>
      <clipPath id={id}><rect x={x} y={y} width={w} height={h} rx={12} /></clipPath>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={fill} />
      <Skin name="ribbon" x={x} y={y} w={w} h={h} clip={"url(#" + id + ")"} />
      {tint && <rect x={x} y={y} width={w} height={h} rx={12} fill={tint} fillOpacity={0.72} />}
    </g>
  ));
  const dividers = (y: number, h: number, n0: number, cw: number) =>
    n0 > 1 && cw >= 8 ? <path d={Array.from({ length: n0 - 1 }, (_, j) => `M ${BX + (j + 1) * cw} ${y + 4} V ${y + h - 4}`).join(" ")} stroke={C.ink} strokeWidth={2.4} /> : null;
  const chip = (cx: number, cy: number, t: string, col: string, room: number, kp: string) => {
    const fs = pwW(t, T.label) + 16 <= room ? T.label : T.micro, w = pwW(t, fs) + 16, h = fs * 1.3;
    return (
      <g key={kp}>
        <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
        <text x={cx} y={cy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={col}>{t}</text>
      </g>
    );
  };
  const hundred = (y: number) => <text x={BX + L + 16} y={y + 38} fontSize={T.label} fontWeight={700} fill={C.ink}>100%</text>;
  const pctAt = (x: number, y: number) => <text x={x + 16} y={y + 38} fontSize={T.label} fontWeight={700} fill={ink(PW.answer)}>{pct + "%"}</text>;

  /* the card: p/q, both terms grown until the bottom is 100, then the per cent; 132 tall, 20 or more inside its edge, the step
     ("× 2") written once between its two arrows */
  const drawChain = () => {
    if (!g) return null;
    const out: any[] = [<rect key="card" x={cardX} y={CY - 66} width={cardW} height={132} rx={RAD.panel} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />];
    if (!nShown) out.push(<line key="ph" x1={cardX + 30} y1={CY} x2={cardX + 120} y2={CY} stroke={C.rule} strokeWidth={4} strokeDasharray="10 10" />);
    for (let i = 0; i < nShown; i++) {
      const f = g.fr[i], x = cardX + g.xs[i], w = g.ws[i], cx = x + w / 2, hide = i > 0 && i === g.fr.length - 1 && !cRev;
      if (i > 0) {
        const gx = cardX + g.gx[i - 1], o = g.ops[i - 1], lab = o[0] + " " + o[1];
        const arrow = (y: number) => `M ${gx + 10} ${y} H ${gx + 92} M ${gx + 80} ${y - 10} L ${gx + 94} ${y} L ${gx + 80} ${y + 10}`;
        out.push(
          <g key={"op" + i}>
            <path d={arrow(CY - 30) + " " + arrow(CY + 32)} fill="none" stroke={PW.both} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <text x={gx + 46} y={CY + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink(PW.both)}>{lab}</text>
          </g>);
      }
      out.push(
        <g key={"f" + i}>
          <text x={cx} y={CY - 12} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={hide ? ink(PW.amber) : i === 0 ? ink(PW.given) : C.ink}>{hide ? "?" : String(f[0])}</text>
          <line x1={x + 6} y1={CY} x2={x + w - 6} y2={CY} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          <text x={cx} y={CY + 46} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{String(f[1])}</text>
        </g>);
    }
    if (cRev && nShown === g.fr.length) out.push(<text key="pc" x={cardX + g.end + 24} y={CY + 20} fontSize={T.xl} fontWeight={700} fill={ink(PW.answer)}>{"= " + pct + "%"}</text>);
    return <g>{out}</g>;
  };

  /* phase 1: a whole bar of coloured things, the part laid under it at the same scale */
  const drawP1 = () => {
    /* a whole of more than 30 wraps into two equal rows inside ONE outline, so every stripe stays 20 or wider (50 = 25 + 25) */
    const N = q, R = N > 30 ? Math.ceil(N / 2) : N, rows = Math.ceil(N / R), rh = rows > 1 ? 34 : HW, cw = L / R, els: any[] = [], chips: any[] = [];
    const ph = rows > 1 ? rh : HP;
    let x = LX, i0 = 0;
    const legend = d.bands.map((b: any, k: number) => {
      const name = tx(b.name), el = (
        <g key={"lg" + k}>
          <rect x={x} y={18} width={40} height={40} rx={8} fill={b.col} stroke={C.ink} strokeWidth={2} />
          <text x={x + 52} y={50} fontSize={T.label} fontWeight={600} fill={C.ink}>{name}</text>
        </g>);
      x += 52 + pwW(name, T.label) + 36;
      return el;
    });
    d.bands.forEach((b: any, k: number) => {
      els.push(...cellRow(YW, rh, i0, b.c, cw, b.col, "w" + k + "-", /bead/i.test(b.name), R));
      const on = pctBands.includes(k);
      /* the band's label sits on its longer piece when the band wraps to the second row */
      const r0 = Math.floor(i0 / R), cut = Math.min(i0 + b.c, (r0 + 1) * R), a = cut - i0, bb = b.c - a;
      const seg = a >= bb ? { s: i0 % R, n: a, r: r0 } : { s: 0, n: bb, r: r0 + 1 };
      chips.push(chip(BX + (seg.s + seg.n / 2) * cw, YW + seg.r * rh + rh / 2, on ? Math.round((b.c * 100) / N) + "%" : String(b.c), on ? ink(PW.answer) : C.ink, rows > 1 ? 0 : seg.n * cw, "ch" + k));
      i0 += b.c;
    });
    const pb = partBand >= 0 ? d.bands[partBand] : null, pw = pb ? pb.c * cw : 0;
    return (
      <g>
        {legend}
        {side(YW, tx("Whole"), String(N), C.ink)}
        {els}
        <rect x={BX} y={YW} width={L} height={rows * rh} rx={10} fill="none" stroke={fixOn ? PW.amber : C.ink} strokeWidth={fixOn ? 6 : 3} />
        {rows > 1 && <line x1={BX} y1={YW + rh} x2={BX + L} y2={YW + rh} stroke={C.ink} strokeWidth={2} />}
        {chips}
        <text x={BX + L + 16} y={YW + (rows * rh) / 2 + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>100%</text>
        {side(YP, tx("Part"), pb ? String(pb.c) : "", ink(PW.given))}
        {pb ? (
          <g>
            {cellRow(YP, ph, 0, pb.c, cw, PW.given, "p-", /bead/i.test(pb.name), R)}
            <rect x={BX} y={YP} width={pw} height={ph} rx={10} fill="none" stroke={C.ink} strokeWidth={3} />
            {pctBands.includes(partBand) && <text x={BX + pw + 16} y={YP + ph / 2 + 11} fontSize={T.label} fontWeight={700} fill={ink(PW.answer)}>{Math.round((pb.c * 100) / N) + "%"}</text>}
          </g>
        ) : <rect x={BX} y={YP} width={L} height={ph} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />}
      </g>
    );
  };

  /* phase 2: the two numbers as bars, the rule's card with its brackets, and the tiles that fill it */
  const drawP2 = () => {
    const lp = (p / q) * L, canTap = demo || (stage === "ask" && s.rule && !tl.busy);
    const tile = (id: string, txt: string) => {
      const at = posOf(id, vTop, vBot, vSign), w = TW(id);
      return (
        <g key={"t" + id} style={{ transform: `translate(${at.x}px,${at.y}px)`, transition: mot } as any}>
          <rect x={0} y={0} width={w} height={TH} rx={12} fill="#FFF7E8" stroke={C.ink} strokeWidth={2.5} />
          <text x={w / 2} y={TH / 2 + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{txt}</text>
          {canTap && <Hit id={id} x={0} y={(TH - 72) / 2} w={w} h={72} onPress={() => press(id)} label={txt} />}
          {demo && stepOn === id && <Invite x={w / 2} y={TH / 2} w={w} h={TH} rx={12} C={C} />}
        </g>
      );
    };
    const dash = (o: any, w: number) => <rect x={o.x} y={o.y} width={w} height={TH} rx={12} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="8 8" />;
    return (
      <g>
        {side(YW, tx("Whole"), String(q), C.ink)}
        {ribbon("pw-r2w", BX, YW, L, HW, "#F6E7C8", null)}
        <rect x={BX} y={YW} width={L} height={HW} rx={12} fill="none" stroke={C.ink} strokeWidth={3} />
        {hundred(YW)}
        {side(YP, tx("Part"), String(p), ink(PW.given))}
        {ribbon("pw-r2p", BX, YP, lp, HP, PW.given, PW.given)}
        <rect x={BX} y={YP} width={lp} height={HP} rx={12} fill="none" stroke={fixOn ? PW.amber : C.ink} strokeWidth={fixOn ? 6 : 3} />
        {cRev && pctAt(BX + lp, YP)}
        <rect x={c2} y={CY - 84} width={680} height={168} rx={RAD.panel} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} strokeDasharray={vRule ? undefined : "10 10"} />
        {vRule && (
          <g pointerEvents="none">
            <path d={`M ${c2 + 46} ${CY - 68} Q ${c2 + 22} ${CY} ${c2 + 46} ${CY + 68}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
            <path d={`M ${c2 + 344} ${CY - 68} Q ${c2 + 368} ${CY} ${c2 + 344} ${CY + 68}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
            <line x1={c2 + 56} y1={CY} x2={c2 + 176} y2={CY} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
            {!vTop && dash(slot.top, 112)}
            {!vBot && dash(slot.bot, 112)}
            {fixOn && <rect x={c2 + 54} y={CY - 66} width={124} height={132} rx={14} fill="none" stroke={PW.amber} strokeWidth={4} />}
            <text x={c2 + 190} y={CY + 16} fontSize={T.speech} fontWeight={700} fill={ink(PW.both)}>× 100</text>
            {!vSign && dash(slot.sign, 80)}
            {vTop && vBot && vSign && <text x={c2 + 484} y={CY + 20} fontSize={T.xl} fontWeight={700} fill={cRev ? ink(PW.answer) : C.ink}>{cRev ? "= " + pct + "%" : "= ?%"}</text>}
          </g>
        )}
        {tile("second", String(q))}
        {tile("first", String(p))}
        {tile("sign", "%")}
      </g>
    );
  };

  /* phase 3: the unit fact card; the part bar is far too long until the whole is written in the part's unit */
  const drawP3 = () => {
    /* the fact in three labels (each at most 4 words): "1 kg", "=", "1,000 g" */
    const u = PW_UNITS[d.whole[1]], cap = tx("Unit fact"), fa = "1 " + tx(u.one), fb = indian(u.f) + " " + tx(u.base);
    const capW = pwW(cap, T.micro), xa = LX + 18 + capW + 20, xe = xa + pwW(fa, T.prompt) * 0.9 + 4, xb = xe + 52;
    const ucW = Math.round(xb + pwW(fb, T.prompt) + 18 - LX);
    const full = Wd - 16 - BX, lp = unitOn ? (p / q) * L : full, canTap = !s.unit && (demo || (stage === "ask" && !tl.busy));
    return (
      <g>
        <rect x={LX} y={4} width={ucW} height={62} rx={16} fill={tint(PW.unit, 0.86)} stroke={ink(PW.unit)} strokeWidth={unitOn ? 4 : 2.5} />
        <text x={LX + 18} y={45} fontSize={T.micro} fontWeight={700} fill={ink(PW.unit)}>{cap}</text>
        <text x={xa} y={49} fontSize={T.prompt} fontWeight={700} fill={ink(PW.unit)}>{fa}</text>
        <text x={xe + 12} y={49} fontSize={T.prompt} fontWeight={700} fill={ink(PW.unit)}>=</text>
        <text x={xb} y={49} fontSize={T.prompt} fontWeight={700} fill={ink(PW.unit)}>{fb}</text>
        {canTap && <Hit id="unit" x={LX} y={0} w={ucW} h={72} onPress={() => press("unit")} label={cap} />}
        {demo && stepOn === "unit" && <Invite x={LX + ucW / 2} y={35} w={ucW} h={62} rx={16} C={C} />}
        {side(YW, tx("Whole"), unitOn ? indian(q) + " " + tx(u.base) : d.whole[0] + " " + tx(u.many), unitOn ? ink(PW.unit) : C.ink)}
        {ribbon("pw-r3w", BX, YW, L, HW, "#F6E7C8", null)}
        <rect x={BX} y={YW} width={L} height={HW} rx={12} fill="none" stroke={fixOn ? PW.amber : C.ink} strokeWidth={fixOn ? 6 : 3} />
        {hundred(YW)}
        {side(YP, tx("Part"), indian(p) + " " + tx(d.part[1]), ink(PW.given))}
        <g style={{ transform: `scaleX(${lp / full})`, transformOrigin: `${BX}px ${YP}px`, transition: mot ? "transform .7s ease" : undefined } as any}>
          {ribbon("pw-r3p", BX, YP, full, HP, PW.given, PW.given)}
          <rect x={BX} y={YP} width={full} height={HP} rx={12} fill="none" stroke={C.ink} strokeWidth={3} vectorEffect="non-scaling-stroke" />
        </g>
        {!unitOn && <path d={`M ${Wd - 62} ${YP + 16} L ${Wd - 38} ${YP + HP / 2} L ${Wd - 62} ${YP + HP - 16}`} fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />}
        {cRev && unitOn && pctAt(BX + lp, YP)}
      </g>
    );
  };

  /* phase 4: the match tiles (won: a star; a draw: an equals sign), sorted into Won and Not won */
  const drawP4 = () => {
    const canFlip = demo && sorted && !!dG && !s.flip;
    /* a wooden match tile on every tile, up to 40 on a screen (IMAGES §7); 50 tiles stay plain */
    const skinT = q <= 40;
    return (
      <g>
        {sorted && <rect x={BX - 8} y={yB2 - 6} width={pN * P + 12} height={rowsN * P + 8} rx={12} fill={tint(PW.rose, 0.8)} stroke={fixOn ? PW.amber : ink(PW.rose)} strokeWidth={fixOn ? 5 : 2} />}
        {side(yB1, sorted ? tx("Won") : tx("Matches"), String(sorted ? q - p : q), C.ink)}
        {sorted && side(yB2, tx("Not won"), String(p), ink(PW.rose))}
        {tiles.map((t: any) => {
          const at = sorted ? t.band : t.mixed, lit = !sorted && t.nw >= 0 && t.nw < s.lit, flipped = t.k === "draw" && s.flip;
          return (
            <g key={"m" + t.i} style={{ transform: `translate(${at.x}px,${at.y}px)`, transition: mot } as any}>
              {/* the not won tiles are the COUNTED part: a deeper rose fill and a dark outline (PREFLIGHT 24) */}
              <rect x={0} y={0} width={ts} height={ts} rx={8} fill={t.k === "won" ? PW.given : PW.rose} />
              {skinT && <Skin name="match" x={0} y={0} w={ts} h={ts} fit="stretch" />}
              <rect x={0} y={0} width={ts} height={ts} rx={8} fill={t.k === "won" ? PW.given : PW.rose} fillOpacity={0.72} />
              <rect x={0} y={0} width={ts} height={ts} rx={8} fill="none" stroke={lit || flipped ? PW.amber : t.k === "won" ? shade(PW.given, 0.3) : C.ink} strokeWidth={lit || flipped ? 4 : 2.5} />
              {t.k === "won" && <path d={pwStar(ts / 2, ts / 2 + 1, ts * 0.32)} fill="#FFFFFF" />}
              {t.k === "draw" && <path d={`M ${ts * 0.28} ${ts * 0.4} H ${ts * 0.72} M ${ts * 0.28} ${ts * 0.6} H ${ts * 0.72}`} stroke={C.ink} strokeWidth={Math.max(3, ts * 0.08)} strokeLinecap="round" />}
            </g>
          );
        })}
        {/* the word once, under the turned draw tiles (it never covers their equals signs) */}
        {dG && sorted && s.flip && fd && (
          <g>
            <rect x={dG.x + 4 + (dr * P - 4) / 2 - 60} y={fd.band.y + ts + 6} width={120} height={56} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            <text x={dG.x + 4 + (dr * P - 4) / 2} y={fd.band.y + ts + 44} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Draw")}</text>
          </g>
        )}
        {canFlip && dG && <Hit id="flip" x={dG.x} y={dG.y} w={dG.w} h={dG.h} onPress={() => press("flip")} label={tx("Draw")} />}
        {demo && stepOn === "flip" && dG && <Invite x={dG.x + dG.w / 2} y={dG.y + dG.h / 2} w={dG.w} h={dG.h} rx={10} C={C} />}
      </g>
    );
  };

  /* free play: the child picks a whole (each goes into 100) and a part, and reads the per cent */
  const drawFree = () => {
    const cw = L / q;
    const fk = (id: string, x: number, sym: string, lab: string, off: boolean, fn: () => void) => (
      <Key key={id} id={id} label={lab} x={x} y={0} w={84} h={72} C={C} tone="key" disabled={off} onClick={fn}>
        <text y={20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={toneInk("key", C.ink)}>{sym}</text>
      </Key>
    );
    const setW = (k: number) => { const fw = Math.max(0, Math.min(PW_WHOLES.length - 1, s.fw + k)); put({ fw, fp: Math.min(s.fp, PW_WHOLES[fw]) }); api.sfx.tick(); };
    const setP = (k: number) => { put({ fp: Math.max(0, Math.min(q, s.fp + k)) }); api.sfx.tick(); };
    return (
      <g>
        <text x={LX} y={48} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Whole")}</text>
        {fk("whole-less", 130, "−", tx("Smaller whole"), s.fw <= 0, () => setW(-1))}
        {fk("whole-more", 226, "+", tx("Bigger whole"), s.fw >= PW_WHOLES.length - 1, () => setW(1))}
        <text x={334} y={48} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Part")}</text>
        {fk("part-less", 416, "−", tx("Smaller part"), p <= 0, () => setP(-1))}
        {fk("part-more", 512, "+", tx("Bigger part"), p >= q, () => setP(1))}
        {side(YW, tx("Whole"), String(q), C.ink)}
        {ribbon("pw-rfw", BX, YW, L, HW, "#F6E7C8", null)}
        {q <= 50 && dividers(YW, HW, q, cw)}
        <rect x={BX} y={YW} width={L} height={HW} rx={12} fill="none" stroke={C.ink} strokeWidth={3} />
        {hundred(YW)}
        {side(YP, tx("Part"), String(p), ink(PW.given))}
        {ribbon("pw-rfp", BX, YP, p * cw, HP, PW.given, PW.given)}
        {q <= 50 && dividers(YP, HP, p, cw)}
        {p > 0 && <rect x={BX} y={YP} width={p * cw} height={HP} rx={12} fill="none" stroke={C.ink} strokeWidth={3} />}
        {pctAt(BX + p * cw, YP)}
      </g>
    );
  };

  const keyLabel = keyOn === "over" ? tx("Part over whole") : keyOn === "hund" ? pwOpLabel(q) : keyOn === "rule" ? tx("Rule") : keyOn === "sort" ? tx("Sort") : "";
  return (
    <g>
      {free ? drawFree() : !d ? null : n === 1 ? drawP1() : n === 2 ? drawP2() : n === 3 ? drawP3() : drawP4()}
      {drawChain()}
      {/* the correction stands with no key under it: the child's next act is the answer */}
      {keyOn && (demo || (stage === "ask" && !fixOn)) && (
        <g>
          <Key key="actkey" id={keyOn} label={keyLabel} x={KX} y={KY} w={KW} h={KH} C={C} tone="key" disabled={!live} onClick={() => press(keyOn)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{keyLabel}</text>
          </Key>
          {demo && stepOn === keyOn && <Invite x={KX + KW / 2} y={KY + (KH + EDGE) / 2} w={KW} h={KH + EDGE} rx={RAD.key} C={C} />}
        </g>
      )}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the part on a whole bar, and its per cent */
function Thumb({ result, C, w, h }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const v = Number(slotPartsOf(last.value, 1)[0]);
  if (!isFinite(v)) return null;
  const bw = w - 40, k = Math.max(0, Math.min(1, v / 100)), by = Math.round(h * 0.08), bh = Math.round(h * 0.26);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={20} y={by} width={bw} height={bh} rx={6} fill={PW.cell} stroke={PW.line} strokeWidth={2} />
      <rect x={20} y={by} width={Math.max(4, bw * k)} height={bh} rx={6} fill={PW.given} stroke={PW.line} strokeWidth={2} />
      <text x={w / 2} y={h - 8} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(PW.answer, 0.25)}>{v + "%"}</text>
    </g>
  );
}

function PartOfWhole(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16; needs board: true): no question bar, only its blinking key at the top right;
         the working area is 64,108, 1472 x 520 and the key's corner is props.box.key (keep every element out of it); the question lives
         only in the bubble. Opt out (a picture that needs the bar's room) by deleting this line, with the reason in the report. */
      keyOnly: true,
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g; the owner: "empty space left of the keypad, increase its size"): the answer
         panel is 556 wide and the picture has x 64 to 964 while it is open. Keep it when the picture fits there; set it to false (or
         delete it) when the picture needs the full 1086 width: `check`'s board-fit names what runs under the panel. */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on
         the blinking Next key (the question bar's right end; the classic layout: the answer slot's place). Delete to keep the timers. */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d; stands alone): the phase bar becomes one small clickable dot per phase, no text; a tap starts
         THAT phase, in user and AI mode. Delete this line to keep the bar. */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      /* the keypad colours: leave THEME unset and the image agent's TOOL_THEME (the slot's images.tsx) is picked up by the
         runtime by itself; set THEME here only to override it (docs/IMAGES.md) */
      }} />
  );
}

export default PartOfWhole;
