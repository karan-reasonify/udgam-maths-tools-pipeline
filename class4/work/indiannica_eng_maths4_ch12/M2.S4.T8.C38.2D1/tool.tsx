/* ═══ M2.S4.T8.C38.2D1 · calendar_counter · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "calendar_counter";
const MEDIA_ID = "M2.S4.T8.C38.2D1";
const TOOL_NAME = "Calendar Counter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Twelve months hang on the wall. How many days are in this year?"];
/* the whole-tool line (no longer shown from r44; kept for the sidecar) */
const FINISH_LINE = "Months sorted, years run through the whole rule, counts begun with both ends decided, and dates written day first.";
/* printed when the child opens Free play: exactly what the free branch offers (the dial, the wall, the gate) */
const FREE_LINE = "Free play: turn the year dial and send any year through the gate.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): six month pages of 2026, skinned as wall calendar pages */
const START_HOOK = "How many days are in this year?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  return (
    <g pointerEvents="none">
      <text x={box.w / 2} y={50} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={CC_INK}>2026</text>
      {[1, 2, 3, 4, 5, 6].map((m, i) => ccCard("s" + m, 10 + i * 198, 76, 180, 240, 2026, m, tx(CC_ABB[m - 1]), 36))}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final and reviewed. */
const TR: any = {
  hi: {
    "Days in the months and the year": "महीनों और वर्ष के दिन",
    "Tap January's card to open its page and see its dates.": "जनवरी का कार्ड छूकर उसका पन्ना खोलो और तारीखें देखो।",
    "Tap the card that says Jan.": "जन लिखा कार्ड छुओ।",
    "Now tap February's card and compare how long it is.": "अब फ़रवरी का कार्ड छुओ और देखो वह कितना लंबा है।",
    "Tap the card that says Feb.": "फ़र लिखा कार्ड छुओ।",
    "So a year of 365 days fills whole weeks with one day left over.": "365 दिन के वर्ष में पूरे सप्ताह बनते हैं और एक दिन बचता है।",
    "You learned: 365 days make whole weeks and one day more.": "तुमने सीखा: 365 दिनों में पूरे सप्ताह और एक दिन होता है।",
    "June": "जून",
    "August": "अगस्त",
    "Sort the months onto the rack: how many days do June and August each have?": "महीनों को रैक पर छाँटो: जून और अगस्त में कितने-कितने दिन हैं?",
    "Days in June and August?": "जून और अगस्त के दिन?",
    "Find the June row and the August row, then count the days in each.": "जून की पंक्ति और अगस्त की पंक्ति ढूँढो, फिर हर एक के दिन गिनो।",
    "Yes, June has 30 days and August has 31.": "हाँ, जून में 30 दिन और अगस्त में 31 दिन हैं।",
    "weeks": "सप्ताह",
    "days left": "बचे दिन",
    "365 days in weeks: how many whole weeks, and how many days left over?": "365 दिन सप्ताहों में: कितने पूरे सप्ताह और कितने दिन बचे?",
    "365 days in weeks?": "365 दिन में सप्ताह?",
    "Count the blocks: each one holds 13 weeks of 7 days.": "खंड गिनो: हर खंड में 7 दिन के 13 सप्ताह हैं।",
    "Yes, 365 days are 52 weeks and 1 day.": "हाँ, 365 दिनों में 52 सप्ताह और 1 दिन होता है।",
    "1 March 2026 is a Sunday: on which date is the third Saturday of March 2026?": "1 मार्च 2026 को रविवार है: मार्च 2026 का तीसरा शनिवार किस तारीख को है?",
    "Third Saturday of March?": "मार्च का तीसरा शनिवार?",
    "Find the Saturday column on the right of the page.": "पन्ने के दाईं ओर शनिवार का स्तंभ ढूँढो।",
    "Yes, the third Saturday of March 2026 is the 21st.": "हाँ, मार्च 2026 का तीसरा शनिवार 21 तारीख को है।",
    "Leap years": "अधिवर्ष",
    "Tap Run to send 2024 through the leap year gate.": "2024 को अधिवर्ष द्वार से भेजने के लिए ‘चलाओ’ बटन छुओ।",
    "Tap the Run key under the gate.": "द्वार के नीचे चलाओ बटन छुओ।",
    "Tap Run again to send the century year 1900 through the gate.": "शताब्दी वर्ष 1900 को द्वार से भेजने के लिए फिर ‘चलाओ’ बटन छुओ।",
    "Tap Run once more.": "एक बार और ‘चलाओ’ बटन छुओ।",
    "Leap years divide by 4 and century years must also divide by 400.": "अधिवर्ष 4 से बँटता है, और शताब्दी वर्ष 400 से भी बँटना चाहिए।",
    "You learned: a century year is a leap year only if 400 divides it.": "तुमने सीखा: शताब्दी वर्ष तभी अधिवर्ष है जब वह 400 से बँटे।",
    "1996 and 1700": "1996 और 1700",
    "1996 only": "केवल 1996",
    "1996 and 1600": "1996 और 1600",
    "All three": "तीनों",
    "Run 1996, 1700 and 1600 through the gate: which of them were leap years?": "1996, 1700 और 1600 को द्वार से भेजो: इनमें से कौन-से अधिवर्ष थे?",
    "Which were leap years?": "कौन-से अधिवर्ष थे?",
    "Read each year's column down to its last box before you choose.": "चुनने से पहले हर वर्ष का स्तंभ उसके आखिरी खाने तक पढ़ो।",
    "Yes, 1996 and 1600 were leap years, but 1700 was not.": "हाँ, 1996 और 1600 अधिवर्ष थे, पर 1700 नहीं था।",
    "Run 2028 through the gate: how many days does February have in 2028?": "2028 को द्वार से भेजो: 2028 में फ़रवरी में कितने दिन हैं?",
    "February 2028 days?": "फ़रवरी 2028 के दिन?",
    "Read the verdict under 2028's column on the gate.": "द्वार पर 2028 के स्तंभ के नीचे का फ़ैसला पढ़ो।",
    "Yes, 2028 is a leap year, so February has 29 days.": "हाँ, 2028 अधिवर्ष है, इसलिए फ़रवरी में 29 दिन हैं।",
    "Yes": "हाँ",
    "No": "नहीं",
    "Run 1800 through the gate: was 1800 a leap year?": "1800 को द्वार से भेजो: क्या 1800 अधिवर्ष था?",
    "Was 1800 a leap year?": "क्या 1800 अधिवर्ष था?",
    "Follow 1800 down the gate to its last box.": "1800 को द्वार में उसके आखिरी खाने तक देखो।",
    "Right, 1800 was not a leap year, since 400 does not divide it.": "सही, 1800 अधिवर्ष नहीं था, क्योंकि वह 400 से नहीं बँटता।",
    "Counting days between dates": "दो तारीखों के बीच दिन गिनना",
    "Before you count, tap the first switch so 28 June counts.": "गिनने से पहले पहला स्विच छुओ ताकि 28 जून गिना जाए।",
    "Tap the switch under First day.": "पहला दिन के नीचे स्विच छुओ।",
    "Now tap the last switch so 2 July counts too.": "अब आखिरी स्विच छुओ ताकि 2 जुलाई भी गिना जाए।",
    "Tap the switch under Last day.": "आखिरी दिन के नीचे स्विच छुओ।",
    "Tap Count to light the counted days, month by month.": "गिने गए दिन महीने-दर-महीने चमकाने के लिए ‘गिनो’ बटन छुओ।",
    "Tap the Count key.": "गिनो बटन छुओ।",
    "Decide whether each end counts and then count month by month.": "पहले तय करो कि हर छोर गिना जाएगा या नहीं, फिर महीने-दर-महीने गिनो।",
    "You learned: decide both ends first, then count month by month.": "तुमने सीखा: पहले दोनों छोर तय करो, फिर महीने-दर-महीने गिनो।",
    "Count the days between 18 September and 7 October, leaving both dates out.": "18 सितंबर और 7 अक्टूबर के बीच के दिन गिनो, दोनों तारीखें छोड़कर।",
    "18 Sep to 7 Oct?": "18 सित से 7 अक्टू?",
    "The question leaves out both dates: tap each switch until it says Left out.": "प्रश्न दोनों तारीखें छोड़ता है: हर स्विच को ‘छोड़ा जाए’ होने तक छुओ।",
    "Read the two numbers the pencil wrote under the pages, then add them.": "पन्नों के नीचे पेंसिल से लिखी दोनों संख्याएँ पढ़ो, फिर जोड़ो।",
    "Add the November part and the December part written under the pages.": "पन्नों के नीचे लिखे नवंबर और दिसंबर के दिन जोड़ो।",
    "Find how many more days the April page needs to make 16 in all.": "पता करो कि कुल 16 के लिए अप्रैल में कितने दिन और चाहिए।",
    "Yes, 12 + 6 = 18 days.": "हाँ, 12 + 6 = 18 दिन।",
    "Now count from 12 November to 3 December, counting both dates.": "अब 12 नवंबर से 3 दिसंबर तक गिनो, दोनों तारीखें गिनकर।",
    "12 Nov to 3 Dec?": "12 नव से 3 दिस?",
    "The question counts 12 November too: set First day and Last day to Counts.": "प्रश्न 12 नवंबर भी गिनता है: ‘पहला दिन’ और ‘आखिरी दिन’ को ‘गिना जाए’ करो।",
    "Yes, 19 + 3 = 22 days.": "हाँ, 19 + 3 = 22 दिन।",
    "A 16-day tournament begins on 22 March as day one: which April date ends it?": "16 दिन की प्रतियोगिता 22 मार्च से शुरू हुई: अप्रैल की किस तारीख को खत्म होगी?",
    "Last day in April?": "अप्रैल में आखिरी दिन?",
    "22 March is day one, so tap First day until it says Counts.": "22 मार्च पहला दिन है, तो ‘पहला दिन’ स्विच ‘गिना जाए’ होने तक छुओ।",
    "Yes, 10 days in March and 6 in April end on 6 April.": "हाँ, मार्च के 10 और अप्रैल के 6 दिन 6 अप्रैल को पूरे होते हैं।",
    "Writing a date in short form": "तारीख को छोटे रूप में लिखना",
    "Tap Write to write 15 August 2026 day first.": "15 अगस्त 2026 को दिन पहले लिखने के लिए ‘लिखो’ बटन छुओ।",
    "Tap the Write key under the places.": "खानों के नीचे लिखो बटन छुओ।",
    "Tap the Dots key to change the dots to slashes.": "बिंदुओं को तिरछी रेखाओं में बदलने के लिए बिंदु बटन छुओ।",
    "Tap the key that says Dots.": "बिंदु लिखा बटन छुओ।",
    "In a short date the day comes first and the year comes last.": "छोटे रूप की तारीख में दिन पहले और वर्ष आखिर में आता है।",
    "You learned: write the day, then the month, then the year.": "तुमने सीखा: पहले दिन, फिर महीना, फिर वर्ष लिखो।",
    "Day": "दिन",
    "Month": "महीना",
    "Year": "वर्ष",
    "Write 3 January 2027 in short form, day first.": "3 जनवरी 2027 को छोटे रूप में लिखो, दिन पहले।",
    "3 January 2027?": "3 जनवरी 2027?",
    "Type the day in the first box, then the month, then the year.": "पहले खाने में दिन लिखो, फिर महीना, फिर वर्ष।",
    "Yes, 03.01.2027 is 3 January 2027.": "हाँ, 03.01.2027 का अर्थ 3 जनवरी 2027 है।",
    "Now write 30 April 2026 in short form.": "अब 30 अप्रैल 2026 को छोटे रूप में लिखो।",
    "30 April 2026?": "30 अप्रैल 2026?",
    "Count the months from January to find April's number.": "अप्रैल की संख्या जानने के लिए जनवरी से महीने गिनो।",
    "Yes, 30.04.2026, with a 0 before the 4.": "हाँ, 30.04.2026, 4 से पहले 0 लगाकर।",
    "Write 9 October 2025 the same way.": "9 अक्टूबर 2025 को भी ऐसे ही लिखो।",
    "9 October 2025?": "9 अक्टूबर 2025?",
    "Fill both places of the day, just as the month 10 fills both.": "दिन के दोनों खाने भरो, जैसे महीना 10 दोनों भरता है।",
    "Yes, 09.10.2025, with a 0 before the 9.": "हाँ, 09.10.2025, 9 से पहले 0 लगाकर।",
    "Count the cells on the rack, the ruler or the page.": "रैक, पैमाने या पन्ने के खाने गिनो।",
    "Count in tens or in weeks, then add what is left.": "दहाई में या सप्ताह में गिनो, फिर बचे हुए जोड़ो।",
    "Count each row in tens: every group of cells holds 10 days.": "हर पंक्ति को दहाई में गिनो: खानों के हर समूह में 10 दिन हैं।",
    "Add 10 for each full group, then add the days after the last group.": "हर पूरे समूह के लिए 10 जोड़ो, फिर आखिरी समूह के बाद के दिन जोड़ो।",
    "Multiply 4 blocks by 13 weeks to find all the whole weeks.": "सारे पूरे सप्ताह जानने के लिए 4 खंडों को 13 सप्ताह से गुणा करो।",
    "Count the yellow cells after the blocks: they are the days left over.": "खंडों के बाद के पीले खाने गिनो: वही बचे हुए दिन हैं।",
    "Read the date of the first Saturday in the top row.": "सबसे ऊपर की पंक्ति में पहले शनिवार की तारीख पढ़ो।",
    "Add 7 to the first Saturday, then add 7 again for the third.": "पहले शनिवार में 7 जोड़ो, फिर तीसरे के लिए फिर से 7 जोड़ो।",
    "Ask the gate's questions in order, top to bottom.": "द्वार के प्रश्न ऊपर से नीचे क्रम से पूछो।",
    "A century year needs 400 to divide it exactly.": "शताब्दी वर्ष को 400 से पूरा बँटना चाहिए।",
    "1700 and 1600 end in 00, so divide each of them by 400 too.": "1700 और 1600 के अंत में 00 है, इसलिए दोनों को 400 से भी भाग दो।",
    "Divide 1600 and 1700 by 400 and see whether anything is left over.": "1600 और 1700 को 400 से भाग दो और देखो कि कुछ शेष बचता है या नहीं।",
    "Check 2028: 4 divides it exactly, and it is not a century year.": "2028 जाँचो: वह 4 से पूरा बँटता है और शताब्दी वर्ष नहीं है।",
    "In a leap year, add 1 day to February's usual 28 days.": "अधिवर्ष में फ़रवरी के सामान्य 28 दिनों में 1 दिन जोड़ो।",
    "1800 ends in 00, so it needs 400 to divide it as well as 4.": "1800 के अंत में 00 है, इसलिए उसे 4 के साथ 400 से भी बँटना चाहिए।",
    "Divide 1800 by 400 and see whether anything is left over.": "1800 को 400 से भाग दो और देखो कि कुछ शेष बचता है या नहीं।",
    "Set both switches before you count.": "गिनने से पहले दोनों स्विच तय करो।",
    "Count the first month's days, then the next month's.": "पहले महीने के दिन गिनो, फिर अगले महीने के।",
    "September has 30 days, so count from 19 up to 30, then 1 to 6 in October.": "सितंबर में 30 दिन हैं, तो 19 से 30 तक गिनो, फिर अक्टूबर में 1 से 6।",
    "19 to 30 September makes 12 days, and 1 to 6 October makes 6: add them.": "19 से 30 सितंबर 12 दिन हैं, और 1 से 6 अक्टूबर 6 दिन: इन्हें जोड़ो।",
    "November has 30 days: count from 12 to 30, then from 1 to 3 in December.": "नवंबर में 30 दिन हैं: 12 से 30 तक गिनो, फिर दिसंबर में 1 से 3 तक।",
    "From 12 to 30 is 19 days; December adds 3 days: add them.": "12 से 30 तक 19 दिन हैं; दिसंबर के 3 दिन और: इन्हें जोड़ो।",
    "March has 31 days: count from 22 up to 31 to find the March days.": "मार्च में 31 दिन हैं: मार्च के दिन जानने के लिए 22 से 31 तक गिनो।",
    "22 to 31 March is 10 days, so take 10 from 16 to find the April date.": "22 से 31 मार्च 10 दिन हैं, तो अप्रैल की तारीख के लिए 16 में से 10 घटाओ।",
    "Day, month, year: each part has its own places.": "दिन, महीना, वर्ष: हर भाग के अपने खाने हैं।",
    "Fill every place, even when the number is small.": "संख्या छोटी हो तब भी हर खाना भरो।",
    "The day is 3 and January is month 1: write the day first.": "दिन 3 है और जनवरी महीना 1 है: पहले दिन लिखो।",
    "Write 2 digits for the day, 2 for the month and 4 for the year.": "दिन के 2 अंक, महीने के 2 और वर्ष के 4 अंक लिखो।",
    "January is 1, February 2 and March 3, so April comes next.": "जनवरी 1, फ़रवरी 2 और मार्च 3 है, फिर अप्रैल आता है।",
    "Write a one-digit month in two places, with a 0 first.": "एक अंक का महीना दो खानों में लिखो, पहले 0।",
    "The day 9 has one digit, but a day always takes two places.": "दिन 9 में एक अंक है, पर दिन हमेशा दो खाने लेता है।",
    "Put a 0 in the first place of a one-digit day.": "एक अंक वाले दिन के पहले खाने में 0 लगाओ।",
    "Your numbers are right: give the day and the month a 0 in front.": "तुम्हारी संख्याएँ सही हैं: दिन और महीने के आगे 0 लगाओ।",
    "Right numbers, but April's one digit needs a 0 before it.": "संख्याएँ सही हैं, पर अप्रैल के एक अंक से पहले 0 चाहिए।",
    "Type all four digits of the year in the Year box.": "वर्ष के खाने में वर्ष के चारों अंक लिखो।",
    "A day or month with one digit still takes two places.": "एक अंक वाला दिन या महीना भी दो खाने लेता है।",
    "Type a 0 before each one-digit day or month, then the year.": "हर एक अंक वाले दिन या महीने से पहले 0 लिखो, फिर वर्ष।",
    "The year has four digits, so the Year box takes all four.": "वर्ष में चार अंक होते हैं, इसलिए वर्ष का खाना चारों लेता है।",
    "Type the year in full, not only its last two digits.": "पूरा वर्ष लिखो, सिर्फ़ आखिरी दो अंक नहीं।",
    "Calendar Counter": "कैलेंडर गिनती",
    "Free play: turn the year dial and send any year through the gate.": "खुला खेल: वर्ष का डायल घुमाओ और कोई भी वर्ष द्वार से भेजो।",
    "How many days are in this year?": "इस वर्ष में कितने दिन हैं?",
    "Twelve months hang on the wall. How many days are in this year?": "दीवार पर बारह महीने टँगे हैं। इस वर्ष में कितने दिन हैं?",
    "Sort": "छाँटो",
    "days": "दिन",
    "day": "दिन",
    "Weeks": "सप्ताह",
    "Century year?": "शताब्दी वर्ष?",
    "Year before": "पिछला वर्ष",
    "Year after": "अगला वर्ष",
    "1 January": "1 जनवरी",
    "Run": "चलाओ",
    "First day": "पहला दिन",
    "Last day": "आखिरी दिन",
    "Count": "गिनो",
    "Write": "लिखो",
    "Counts": "गिना जाए",
    "Left out": "छोड़ा जाए",
    "Not set": "तय नहीं",
    "Now tap Sort to stand the months up as bars.": "अब महीनों को पट्टियों में खड़ा करने के लिए ‘छाँटो’ बटन छुओ।",
    "Now tap Weeks to lay out the days.": "अब दिन सजाने के लिए ‘सप्ताह’ बटन छुओ।",
    "Now tap Run to send the years through the gate.": "अब वर्षों को द्वार से भेजने के लिए ‘चलाओ’ बटन छुओ।",
    "Now tap Count to light the days.": "अब दिन चमकाने के लिए ‘गिनो’ बटन छुओ।",
    "Set the switches first, then tap Count.": "पहले स्विच तय करो, फिर ‘गिनो’ बटन छुओ।",
    "January": "जनवरी",
    "February": "फ़रवरी",
    "March": "मार्च",
    "April": "अप्रैल",
    "May": "मई",
    "July": "जुलाई",
    "September": "सितंबर",
    "October": "अक्टूबर",
    "November": "नवंबर",
    "December": "दिसंबर",
    "Jan": "जन",
    "Feb": "फ़र",
    "Mar": "मार्च",
    "Apr": "अप्रैल",
    "Jun": "जून",
    "Jul": "जुला",
    "Aug": "अगस्त",
    "Sep": "सितं",
    "Oct": "अक्टू",
    "Nov": "नवं",
    "Dec": "दिसं",
    "Sun": "र",
    "Mon": "सो",
    "Tue": "मं",
    "Wed": "बु",
    "Thu": "गु",
    "Fri": "शु",
    "Sat": "श",
    "Sunday": "रविवार",
    "Monday": "सोमवार",
    "Tuesday": "मंगलवार",
    "Wednesday": "बुधवार",
    "Thursday": "गुरुवार",
    "Friday": "शुक्रवार",
    "Saturday": "शनिवार",
    "Dots": "बिंदु",
    "Slashes": "तिरछी रेखा",
    "Dashes": "छोटी रेखा",
    "Leap year": "अधिवर्ष",
    "Not leap": "अधिवर्ष नहीं",
  },
  gu: {
    "Days in the months and the year": "મહિનાઓ અને વર્ષના દિવસો",
    "Tap January's card to open its page and see its dates.": "જાન્યુઆરીનું કાર્ડ દબાવી તેનું પાનું ખોલો અને તારીખો જુઓ.",
    "Tap the card that says Jan.": "જાન્યુ લખેલું કાર્ડ દબાવો.",
    "Now tap February's card and compare how long it is.": "હવે ફેબ્રુઆરીનું કાર્ડ દબાવો અને જુઓ તે કેટલો લાંબો છે.",
    "Tap the card that says Feb.": "ફેબ્રુ લખેલું કાર્ડ દબાવો.",
    "So a year of 365 days fills whole weeks with one day left over.": "365 દિવસના વર્ષમાં પૂરાં અઠવાડિયાં બને છે અને એક દિવસ બાકી રહે છે.",
    "You learned: 365 days make whole weeks and one day more.": "તમે શીખ્યા: 365 દિવસમાં પૂરાં અઠવાડિયાં અને એક દિવસ હોય છે.",
    "June": "જૂન",
    "August": "ઑગસ્ટ",
    "Sort the months onto the rack: how many days do June and August each have?": "મહિનાઓને રેક પર ગોઠવો: જૂન અને ઑગસ્ટમાં કેટલા કેટલા દિવસ છે?",
    "Days in June and August?": "જૂન અને ઑગસ્ટના દિવસ?",
    "Find the June row and the August row, then count the days in each.": "જૂનની હરોળ અને ઑગસ્ટની હરોળ શોધો, પછી દરેકના દિવસ ગણો.",
    "Yes, June has 30 days and August has 31.": "હા, જૂનમાં 30 દિવસ અને ઑગસ્ટમાં 31 દિવસ છે.",
    "weeks": "અઠવાડિયાં",
    "days left": "બાકી દિવસ",
    "365 days in weeks: how many whole weeks, and how many days left over?": "365 દિવસ અઠવાડિયાંમાં: કેટલાં પૂરાં અઠવાડિયાં અને કેટલા દિવસ બાકી?",
    "365 days in weeks?": "365 દિવસમાં અઠવાડિયાં?",
    "Count the blocks: each one holds 13 weeks of 7 days.": "ખંડ ગણો: દરેક ખંડમાં 7 દિવસનાં 13 અઠવાડિયાં છે.",
    "Yes, 365 days are 52 weeks and 1 day.": "હા, 365 દિવસમાં 52 અઠવાડિયાં અને 1 દિવસ હોય છે.",
    "1 March 2026 is a Sunday: on which date is the third Saturday of March 2026?": "1 માર્ચ 2026 રવિવાર છે: માર્ચ 2026નો ત્રીજો શનિવાર કઈ તારીખે છે?",
    "Third Saturday of March?": "માર્ચનો ત્રીજો શનિવાર?",
    "Find the Saturday column on the right of the page.": "પાનાની જમણી બાજુ શનિવારનો સ્તંભ શોધો.",
    "Yes, the third Saturday of March 2026 is the 21st.": "હા, માર્ચ 2026નો ત્રીજો શનિવાર 21 તારીખે છે.",
    "Leap years": "લીપ વર્ષ",
    "Tap Run to send 2024 through the leap year gate.": "2024ને લીપ વર્ષના દરવાજામાંથી મોકલવા ‘ચલાવો’ બટન દબાવો.",
    "Tap the Run key under the gate.": "દરવાજા નીચે ચલાવો બટન દબાવો.",
    "Tap Run again to send the century year 1900 through the gate.": "સદીનું વર્ષ 1900 દરવાજામાંથી મોકલવા ફરી ‘ચલાવો’ બટન દબાવો.",
    "Tap Run once more.": "એક વાર ફરી ‘ચલાવો’ બટન દબાવો.",
    "Leap years divide by 4 and century years must also divide by 400.": "લીપ વર્ષને 4 વડે ભાગ જાય, અને સદીના વર્ષને 400 વડે પણ ભાગ જવો જોઈએ.",
    "You learned: a century year is a leap year only if 400 divides it.": "તમે શીખ્યા: સદીનું વર્ષ 400 વડે ભાગ જાય તો જ લીપ વર્ષ છે.",
    "1996 and 1700": "1996 અને 1700",
    "1996 only": "ફક્ત 1996",
    "1996 and 1600": "1996 અને 1600",
    "All three": "ત્રણેય",
    "Run 1996, 1700 and 1600 through the gate: which of them were leap years?": "1996, 1700 અને 1600 દરવાજામાંથી મોકલો: તેમાંથી કયાં લીપ વર્ષ હતાં?",
    "Which were leap years?": "કયાં લીપ વર્ષ હતાં?",
    "Read each year's column down to its last box before you choose.": "પસંદ કરતાં પહેલાં દરેક વર્ષનો સ્તંભ છેલ્લા ખાના સુધી વાંચો.",
    "Yes, 1996 and 1600 were leap years, but 1700 was not.": "હા, 1996 અને 1600 લીપ વર્ષ હતાં, પણ 1700 નહોતું.",
    "Run 2028 through the gate: how many days does February have in 2028?": "2028ને દરવાજામાંથી મોકલો: 2028માં ફેબ્રુઆરીમાં કેટલા દિવસ છે?",
    "February 2028 days?": "ફેબ્રુઆરી 2028ના દિવસ?",
    "Read the verdict under 2028's column on the gate.": "દરવાજા પર 2028ના સ્તંભ નીચેનો નિર્ણય વાંચો.",
    "Yes, 2028 is a leap year, so February has 29 days.": "હા, 2028 લીપ વર્ષ છે, તેથી ફેબ્રુઆરીમાં 29 દિવસ છે.",
    "Yes": "હા",
    "No": "ના",
    "Run 1800 through the gate: was 1800 a leap year?": "1800ને દરવાજામાંથી મોકલો: શું 1800 લીપ વર્ષ હતું?",
    "Was 1800 a leap year?": "શું 1800 લીપ વર્ષ હતું?",
    "Follow 1800 down the gate to its last box.": "1800ને દરવાજામાં તેના છેલ્લા ખાના સુધી જુઓ.",
    "Right, 1800 was not a leap year, since 400 does not divide it.": "સાચું, 1800 લીપ વર્ષ નહોતું, કારણ કે તેને 400 વડે ભાગ જતો નથી.",
    "Counting days between dates": "બે તારીખો વચ્ચેના દિવસ ગણવા",
    "Before you count, tap the first switch so 28 June counts.": "ગણતાં પહેલાં પહેલી સ્વિચ દબાવો જેથી 28 જૂન ગણાય.",
    "Tap the switch under First day.": "પહેલો દિવસ નીચેની સ્વિચ દબાવો.",
    "Now tap the last switch so 2 July counts too.": "હવે છેલ્લી સ્વિચ દબાવો જેથી 2 જુલાઈ પણ ગણાય.",
    "Tap the switch under Last day.": "છેલ્લો દિવસ નીચેની સ્વિચ દબાવો.",
    "Tap Count to light the counted days, month by month.": "ગણેલા દિવસ મહિને મહિને ઝળકાવવા ‘ગણો’ બટન દબાવો.",
    "Tap the Count key.": "ગણો બટન દબાવો.",
    "Decide whether each end counts and then count month by month.": "પહેલાં નક્કી કરો કે દરેક છેડો ગણાશે કે નહીં, પછી મહિને મહિને ગણો.",
    "You learned: decide both ends first, then count month by month.": "તમે શીખ્યા: પહેલાં બંને છેડા નક્કી કરો, પછી મહિને મહિને ગણો.",
    "Count the days between 18 September and 7 October, leaving both dates out.": "18 સપ્ટેમ્બર અને 7 ઑક્ટોબર વચ્ચેના દિવસ ગણો, બંને તારીખો છોડીને.",
    "18 Sep to 7 Oct?": "18 સપ્ટે થી 7 ઑક્ટો?",
    "The question leaves out both dates: tap each switch until it says Left out.": "પ્રશ્ન બંને તારીખો છોડે છે: દરેક સ્વિચ ‘છોડાય’ થાય ત્યાં સુધી દબાવો.",
    "Read the two numbers the pencil wrote under the pages, then add them.": "પાનાંની નીચે પેન્સિલે લખેલી બંને સંખ્યા વાંચો, પછી ઉમેરો.",
    "Add the November part and the December part written under the pages.": "પાનાંની નીચે લખેલા નવેમ્બર અને ડિસેમ્બરના દિવસો ઉમેરો.",
    "Find how many more days the April page needs to make 16 in all.": "કુલ 16 કરવા એપ્રિલમાં બીજા કેટલા દિવસ જોઈએ તે શોધો.",
    "Yes, 12 + 6 = 18 days.": "હા, 12 + 6 = 18 દિવસ.",
    "Now count from 12 November to 3 December, counting both dates.": "હવે 12 નવેમ્બરથી 3 ડિસેમ્બર સુધી ગણો, બંને તારીખો ગણીને.",
    "12 Nov to 3 Dec?": "12 નવે થી 3 ડિસે?",
    "The question counts 12 November too: set First day and Last day to Counts.": "પ્રશ્ન 12 નવેમ્બર પણ ગણે છે: પહેલો અને છેલ્લો દિવસ ‘ગણાય’ કરો.",
    "Yes, 19 + 3 = 22 days.": "હા, 19 + 3 = 22 દિવસ.",
    "A 16-day tournament begins on 22 March as day one: which April date ends it?": "16 દિવસની સ્પર્ધા 22 માર્ચે શરૂ થઈ: એપ્રિલની કઈ તારીખે પૂરી થશે?",
    "Last day in April?": "એપ્રિલમાં છેલ્લો દિવસ?",
    "22 March is day one, so tap First day until it says Counts.": "22 માર્ચ પહેલો દિવસ છે, તો પહેલો દિવસ ‘ગણાય’ થાય ત્યાં સુધી દબાવો.",
    "Yes, 10 days in March and 6 in April end on 6 April.": "હા, માર્ચના 10 અને એપ્રિલના 6 દિવસ 6 એપ્રિલે પૂરા થાય છે.",
    "Writing a date in short form": "તારીખ ટૂંકા રૂપમાં લખવી",
    "Tap Write to write 15 August 2026 day first.": "15 ઑગસ્ટ 2026 દિવસ પહેલાં લખવા ‘લખો’ બટન દબાવો.",
    "Tap the Write key under the places.": "ખાનાં નીચે લખો બટન દબાવો.",
    "Tap the Dots key to change the dots to slashes.": "ટપકાંને ત્રાંસી રેખામાં બદલવા ટપકાં બટન દબાવો.",
    "Tap the key that says Dots.": "ટપકાં લખેલું બટન દબાવો.",
    "In a short date the day comes first and the year comes last.": "ટૂંકી તારીખમાં દિવસ પહેલો અને વર્ષ છેલ્લું આવે છે.",
    "You learned: write the day, then the month, then the year.": "તમે શીખ્યા: પહેલાં દિવસ, પછી મહિનો, પછી વર્ષ લખો.",
    "Day": "દિવસ",
    "Month": "મહિનો",
    "Year": "વર્ષ",
    "Write 3 January 2027 in short form, day first.": "3 જાન્યુઆરી 2027 ટૂંકા રૂપમાં લખો, દિવસ પહેલાં.",
    "3 January 2027?": "3 જાન્યુઆરી 2027?",
    "Type the day in the first box, then the month, then the year.": "પહેલા ખાનામાં દિવસ લખો, પછી મહિનો, પછી વર્ષ.",
    "Yes, 03.01.2027 is 3 January 2027.": "હા, 03.01.2027 એટલે 3 જાન્યુઆરી 2027.",
    "Now write 30 April 2026 in short form.": "હવે 30 એપ્રિલ 2026 ટૂંકા રૂપમાં લખો.",
    "30 April 2026?": "30 એપ્રિલ 2026?",
    "Count the months from January to find April's number.": "એપ્રિલનો નંબર શોધવા જાન્યુઆરીથી મહિના ગણો.",
    "Yes, 30.04.2026, with a 0 before the 4.": "હા, 30.04.2026, 4ની આગળ 0 મૂકીને.",
    "Write 9 October 2025 the same way.": "9 ઑક્ટોબર 2025 પણ એ જ રીતે લખો.",
    "9 October 2025?": "9 ઑક્ટોબર 2025?",
    "Fill both places of the day, just as the month 10 fills both.": "દિવસનાં બંને ખાનાં ભરો, જેમ મહિનો 10 બંને ભરે છે.",
    "Yes, 09.10.2025, with a 0 before the 9.": "હા, 09.10.2025, 9ની આગળ 0 મૂકીને.",
    "Count the cells on the rack, the ruler or the page.": "રેક, માપપટ્ટી કે પાનાનાં ખાનાં ગણો.",
    "Count in tens or in weeks, then add what is left.": "દસ દસમાં કે અઠવાડિયામાં ગણો, પછી બાકીના ઉમેરો.",
    "Count each row in tens: every group of cells holds 10 days.": "દરેક હરોળ દસ દસમાં ગણો: ખાનાંના દરેક જૂથમાં 10 દિવસ છે.",
    "Add 10 for each full group, then add the days after the last group.": "દરેક પૂરા જૂથ માટે 10 ઉમેરો, પછી છેલ્લા જૂથ પછીના દિવસ ઉમેરો.",
    "Multiply 4 blocks by 13 weeks to find all the whole weeks.": "બધાં પૂરાં અઠવાડિયાં શોધવા 4 ખંડને 13 અઠવાડિયાં વડે ગુણો.",
    "Count the yellow cells after the blocks: they are the days left over.": "ખંડ પછીનાં પીળાં ખાનાં ગણો: એ જ બાકી રહેલા દિવસ છે.",
    "Read the date of the first Saturday in the top row.": "સૌથી ઉપરની હરોળમાં પહેલા શનિવારની તારીખ વાંચો.",
    "Add 7 to the first Saturday, then add 7 again for the third.": "પહેલા શનિવારમાં 7 ઉમેરો, પછી ત્રીજા માટે ફરી 7 ઉમેરો.",
    "Ask the gate's questions in order, top to bottom.": "દરવાજાના પ્રશ્નો ઉપરથી નીચે ક્રમમાં પૂછો.",
    "A century year needs 400 to divide it exactly.": "સદીના વર્ષને 400 વડે પૂરો ભાગ જવો જોઈએ.",
    "1700 and 1600 end in 00, so divide each of them by 400 too.": "1700 અને 1600ને અંતે 00 છે, તેથી બંનેને 400 વડે પણ ભાગો.",
    "Divide 1600 and 1700 by 400 and see whether anything is left over.": "1600 અને 1700ને 400 વડે ભાગો અને જુઓ કે કંઈ શેષ વધે છે કે નહીં.",
    "Check 2028: 4 divides it exactly, and it is not a century year.": "2028 તપાસો: તેને 4 વડે પૂરો ભાગ જાય છે અને તે સદીનું વર્ષ નથી.",
    "In a leap year, add 1 day to February's usual 28 days.": "લીપ વર્ષમાં ફેબ્રુઆરીના સામાન્ય 28 દિવસમાં 1 દિવસ ઉમેરો.",
    "1800 ends in 00, so it needs 400 to divide it as well as 4.": "1800ને અંતે 00 છે, તેથી તેને 4ની સાથે 400 વડે પણ ભાગ જવો જોઈએ.",
    "Divide 1800 by 400 and see whether anything is left over.": "1800ને 400 વડે ભાગો અને જુઓ કે કંઈ શેષ વધે છે કે નહીં.",
    "Set both switches before you count.": "ગણતાં પહેલાં બંને સ્વિચ નક્કી કરો.",
    "Count the first month's days, then the next month's.": "પહેલા મહિનાના દિવસ ગણો, પછી આગલા મહિનાના.",
    "September has 30 days, so count from 19 up to 30, then 1 to 6 in October.": "સપ્ટેમ્બરમાં 30 દિવસ છે, તો 19 થી 30 ગણો, પછી ઑક્ટોબરમાં 1 થી 6.",
    "19 to 30 September makes 12 days, and 1 to 6 October makes 6: add them.": "19 થી 30 સપ્ટેમ્બર 12 દિવસ છે, અને 1 થી 6 ઑક્ટોબર 6 દિવસ: ઉમેરો.",
    "November has 30 days: count from 12 to 30, then from 1 to 3 in December.": "નવેમ્બરમાં 30 દિવસ છે: 12 થી 30 ગણો, પછી ડિસેમ્બરમાં 1 થી 3.",
    "From 12 to 30 is 19 days; December adds 3 days: add them.": "12 થી 30 સુધી 19 દિવસ છે; ડિસેમ્બરના 3 દિવસ વધુ: ઉમેરો.",
    "March has 31 days: count from 22 up to 31 to find the March days.": "માર્ચમાં 31 દિવસ છે: માર્ચના દિવસ શોધવા 22 થી 31 ગણો.",
    "22 to 31 March is 10 days, so take 10 from 16 to find the April date.": "22 થી 31 માર્ચ 10 દિવસ છે, તો એપ્રિલની તારીખ માટે 16માંથી 10 બાદ કરો.",
    "Day, month, year: each part has its own places.": "દિવસ, મહિનો, વર્ષ: દરેક ભાગનાં પોતાનાં ખાનાં છે.",
    "Fill every place, even when the number is small.": "સંખ્યા નાની હોય તો પણ દરેક ખાનું ભરો.",
    "The day is 3 and January is month 1: write the day first.": "દિવસ 3 છે અને જાન્યુઆરી મહિનો 1 છે: પહેલાં દિવસ લખો.",
    "Write 2 digits for the day, 2 for the month and 4 for the year.": "દિવસના 2 અંક, મહિનાના 2 અને વર્ષના 4 અંક લખો.",
    "January is 1, February 2 and March 3, so April comes next.": "જાન્યુઆરી 1, ફેબ્રુઆરી 2 અને માર્ચ 3, પછી એપ્રિલ આવે.",
    "Write a one-digit month in two places, with a 0 first.": "એક અંકનો મહિનો બે ખાનાંમાં લખો, પહેલાં 0.",
    "The day 9 has one digit, but a day always takes two places.": "દિવસ 9માં એક અંક છે, પણ દિવસ હંમેશાં બે ખાનાં લે.",
    "Put a 0 in the first place of a one-digit day.": "એક અંકવાળા દિવસના પહેલા ખાનામાં 0 મૂકો.",
    "Your numbers are right: give the day and the month a 0 in front.": "તમારી સંખ્યાઓ સાચી છે: દિવસ અને મહિનાની આગળ 0 મૂકો.",
    "Right numbers, but April's one digit needs a 0 before it.": "સંખ્યાઓ સાચી છે, પણ એપ્રિલના એક અંકની આગળ 0 જોઈએ.",
    "Type all four digits of the year in the Year box.": "વર્ષના ખાનામાં વર્ષના ચારેય અંક લખો.",
    "A day or month with one digit still takes two places.": "એક અંકનો દિવસ કે મહિનો પણ બે ખાનાં લે છે.",
    "Type a 0 before each one-digit day or month, then the year.": "દરેક એક અંકના દિવસ કે મહિના પહેલાં 0 લખો, પછી વર્ષ.",
    "The year has four digits, so the Year box takes all four.": "વર્ષમાં ચાર અંક હોય છે, તેથી વર્ષનું ખાનું ચારેય લે છે.",
    "Type the year in full, not only its last two digits.": "આખું વર્ષ લખો, ફક્ત છેલ્લા બે અંક નહીં.",
    "Calendar Counter": "કૅલેન્ડર ગણતરી",
    "Free play: turn the year dial and send any year through the gate.": "મુક્ત રમત: વર્ષનું ડાયલ ફેરવો અને કોઈ પણ વર્ષ દરવાજામાંથી મોકલો.",
    "How many days are in this year?": "આ વર્ષમાં કેટલા દિવસ છે?",
    "Twelve months hang on the wall. How many days are in this year?": "દીવાલ પર બાર મહિના લટકે છે. આ વર્ષમાં કેટલા દિવસ છે?",
    "Sort": "ગોઠવો",
    "days": "દિવસ",
    "day": "દિવસ",
    "Weeks": "અઠવાડિયાં",
    "Century year?": "સદીનું વર્ષ?",
    "Year before": "પાછલું વર્ષ",
    "Year after": "આવતું વર્ષ",
    "1 January": "1 જાન્યુઆરી",
    "Run": "ચલાવો",
    "First day": "પહેલો દિવસ",
    "Last day": "છેલ્લો દિવસ",
    "Count": "ગણો",
    "Write": "લખો",
    "Counts": "ગણાય",
    "Left out": "છોડાય",
    "Not set": "નક્કી નથી",
    "Now tap Sort to stand the months up as bars.": "હવે મહિનાઓને પટ્ટીઓમાં ઊભા કરવા ‘ગોઠવો’ બટન દબાવો.",
    "Now tap Weeks to lay out the days.": "હવે દિવસ ગોઠવવા ‘અઠવાડિયાં’ બટન દબાવો.",
    "Now tap Run to send the years through the gate.": "હવે વર્ષોને દરવાજામાંથી મોકલવા ‘ચલાવો’ બટન દબાવો.",
    "Now tap Count to light the days.": "હવે દિવસ ઝળકાવવા ‘ગણો’ બટન દબાવો.",
    "Set the switches first, then tap Count.": "પહેલાં સ્વિચ નક્કી કરો, પછી ‘ગણો’ બટન દબાવો.",
    "January": "જાન્યુઆરી",
    "February": "ફેબ્રુઆરી",
    "March": "માર્ચ",
    "April": "એપ્રિલ",
    "May": "મે",
    "July": "જુલાઈ",
    "September": "સપ્ટેમ્બર",
    "October": "ઑક્ટોબર",
    "November": "નવેમ્બર",
    "December": "ડિસેમ્બર",
    "Jan": "જાન્યુ",
    "Feb": "ફેબ્રુ",
    "Mar": "માર્ચ",
    "Apr": "એપ્રિલ",
    "Jun": "જૂન",
    "Jul": "જુલા",
    "Aug": "ઑગસ્ટ",
    "Sep": "સપ્ટે",
    "Oct": "ઑક્ટો",
    "Nov": "નવે",
    "Dec": "ડિસે",
    "Sun": "ર",
    "Mon": "સો",
    "Tue": "મં",
    "Wed": "બુ",
    "Thu": "ગુ",
    "Fri": "શુ",
    "Sat": "શ",
    "Sunday": "રવિવાર",
    "Monday": "સોમવાર",
    "Tuesday": "મંગળવાર",
    "Wednesday": "બુધવાર",
    "Thursday": "ગુરુવાર",
    "Friday": "શુક્રવાર",
    "Saturday": "શનિવાર",
    "Dots": "ટપકાં",
    "Slashes": "ત્રાંસી રેખા",
    "Dashes": "નાની રેખા",
    "Leap year": "લીપ વર્ષ",
    "Not leap": "લીપ વર્ષ નહીં",
  },
};

/* One entry per phase = one mount. Every bubble line is ONE sentence (keyOnly), digits as written. */
const PHASES = [
  {
    n: 1,
    concept: "Days in the months and the year",
    conceptId: "M2.S4.T8.C35", objectiveIds: ["O13"],
    says: ["Which months have thirty days? Now add all twelve. How many whole weeks is that, and what is left?"],
    /* the warm-up: open two month pages (no question's answer is on them) */
    steps: [
      { say: "Tap January's card to open its page and see its dates.", on: "month-1", hint: "Tap the card that says Jan." },
      { say: "Now tap February's card and compare how long it is.", on: "month-2", hint: "Tap the card that says Feb." },
    ],
    ladder: ["Count the cells on the rack, the ruler or the page.", "Count in tens or in weeks, then add what is left."],
    closing: "So a year of 365 days fills whole weeks with one day left over.",
    learned: "You learned: 365 days make whole weeks and one day more.",
    traceback: "Sort: every month lies on the rack as a bar of days, June and August ringed with their counts. Weeks: the ruler fills four blocks of 13 weeks and the yellow day after them. Saturday: March's Saturday column lights 7, 14 and 21.",
    items: [
      /* practice 1: answer in the plan = June has 30 days and August has 31 (asked first: the rack the sort builds is the picture) */
      { qid: "M2.S4.T8.C35:1", kind: "sort", year: 2026, parts: [{ label: "June" }, { label: "August" }], answer: [30, 31], near: "30|30", forms: ["30 days", "31 days"],
        say: "Sort the months onto the rack: how many days do June and August each have?", ask: "Days in June and August?",
        miss: "Find the June row and the August row, then count the days in each.",
        ladder: ["Count each row in tens: every group of cells holds 10 days.", "Add 10 for each full group, then add the days after the last group."],
        win: "Yes, June has 30 days and August has 31." },
      /* learn ML1: answer in the plan = Fifty-two weeks and one day */
      { qid: "M2.S4.T8.C35:ML1", kind: "weeks", year: 2026, parts: [{ label: "weeks" }, { label: "days left" }], answer: [52, 1], near: "52|0", forms: ["52", "fifty-two"],
        say: "365 days in weeks: how many whole weeks, and how many days left over?", ask: "365 days in weeks?",
        miss: "Count the blocks: each one holds 13 weeks of 7 days.",
        ladder: ["Multiply 4 blocks by 13 weeks to find all the whole weeks.", "Count the yellow cells after the blocks: they are the days left over."],
        win: "Yes, 365 days are 52 weeks and 1 day." },
      /* practice 4: answer in the plan = 21 March 2026. The first Saturday is 7 March, and two more weeks bring it to 14 March and then 21 March */
      { qid: "M2.S4.T8.C35:4", kind: "sat", year: 2026, month: 3, answer: 21, near: 14, forms: ["21 March", "21st"],
        say: "1 March 2026 is a Sunday: on which date is the third Saturday of March 2026?", ask: "Third Saturday of March?",
        miss: "Find the Saturday column on the right of the page.",
        ladder: ["Read the date of the first Saturday in the top row.", "Add 7 to the first Saturday, then add 7 again for the third."],
        win: "Yes, the third Saturday of March 2026 is the 21st." },
    ],
  },
  {
    n: 2,
    concept: "Leap years",
    conceptId: "M2.S4.T8.C36", objectiveIds: ["O13"],
    says: ["Is the year divisible by four? Is it a century year? If it is, ask about four hundred."],
    /* the warm-up: 2026 (stops at the first question) and the century year 1900 (all three); no question asks either */
    steps: [
      { say: "Tap Run to send 2024 through the leap year gate.", on: "run", hint: "Tap the Run key under the gate." },
      { say: "Tap Run again to send the century year 1900 through the gate.", on: "run", hint: "Tap Run once more." },
    ],
    ladder: ["Ask the gate's questions in order, top to bottom.", "A century year needs 400 to divide it exactly."],
    closing: "Leap years divide by 4 and century years must also divide by 400.",
    learned: "You learned: a century year is a leap year only if 400 divides it.",
    traceback: "The gate runs each year down its questions in order, writes Yes or No in each box it asks, then the verdict under it; February shows 28 days or grows its 29th.",
    items: [
      /* learn ML2: answer in the plan = 1996 and 1600 were leap years, and 1700 was not */
      { qid: "M2.S4.T8.C36:ML2", kind: "gate", years: [1996, 1700, 1600],
        choices: [{ id: "y96-17", label: "1996 and 1700" }, { id: "y96", label: "1996 only" }, { id: "y96-16", label: "1996 and 1600" }, { id: "yall", label: "All three" }],
        answer: "y96-16", near: "y96-17", forms: [],
        say: "Run 1996, 1700 and 1600 through the gate: which of them were leap years?", ask: "Which were leap years?",
        miss: "Read each year's column down to its last box before you choose.",
        ladder: ["1700 and 1600 end in 00, so divide each of them by 400 too.", "Divide 1600 and 1700 by 400 and see whether anything is left over."],
        win: "Yes, 1996 and 1600 were leap years, but 1700 was not." },
      /* practice 2: answer in the plan = 29 days, because 2028 is divisible by four and is not a century year, so it is a leap year */
      { qid: "M2.S4.T8.C36:2", kind: "gate", years: [2028], answer: 29, near: 28, forms: ["29"],
        say: "Run 2028 through the gate: how many days does February have in 2028?", ask: "February 2028 days?",
        miss: "Read the verdict under 2028's column on the gate.",
        ladder: ["Check 2028: 4 divides it exactly, and it is not a century year.", "In a leap year, add 1 day to February's usual 28 days."],
        win: "Yes, 2028 is a leap year, so February has 29 days." },
      /* practice 5: answer in the plan = No. 1800 is divisible by four, but it is a century year not divisible by four hundred */
      { qid: "M2.S4.T8.C36:5", kind: "gate", years: [1800], choices: [{ id: "ans-yes", label: "Yes" }, { id: "ans-no", label: "No" }], answer: "ans-no", near: "ans-yes", forms: [],
        say: "Run 1800 through the gate: was 1800 a leap year?", ask: "Was 1800 a leap year?",
        miss: "Follow 1800 down the gate to its last box.",
        ladder: ["1800 ends in 00, so it needs 400 to divide it as well as 4.", "Divide 1800 by 400 and see whether anything is left over."],
        win: "Right, 1800 was not a leap year, since 400 does not divide it." },
    ],
  },
  {
    n: 3,
    concept: "Counting days between dates",
    conceptId: "M2.S4.T8.C37", objectiveIds: ["O14"],
    says: ["Before you count, does the first day count? Does the last day count?"],
    /* the warm-up: 28 June to 2 July 2026, both ends counted (5 days; no question's answer) */
    steps: [
      { say: "Before you count, tap the first switch so 28 June counts.", on: "first", hint: "Tap the switch under First day." },
      { say: "Now tap the last switch so 2 July counts too.", on: "last", hint: "Tap the switch under Last day." },
      { say: "Tap Count to light the counted days, month by month.", on: "count", hint: "Tap the Count key." },
    ],
    ladder: ["Set both switches before you count.", "Count the first month's days, then the next month's."],
    closing: "Decide whether each end counts and then count month by month.",
    learned: "You learned: decide both ends first, then count month by month.",
    traceback: "The switches turn to what the question says, the counted days fill in green month by month, a day left out stays outlined, and the parts are written with their total.",
    items: [
      /* learn ML3: answer in the plan = 18 days */
      { qid: "M2.S4.T8.C37:ML3", kind: "count", from: [2026, 9, 18], to: [2026, 10, 7], ends: ["out", "out"], answer: 18, near: 19, forms: ["18 days", "eighteen days"],
        say: "Count the days between 18 September and 7 October, leaving both dates out.", ask: "18 Sep to 7 Oct?",
        /* rung 0 is read once Count has run (the switches are then right); the switch line is the locked Hint's and a refused Count's */
        miss: "Read the two numbers the pencil wrote under the pages, then add them.",
        swMiss: "The question leaves out both dates: tap each switch until it says Left out.",
        ladder: ["September has 30 days, so count from 19 up to 30, then 1 to 6 in October.", "19 to 30 September makes 12 days, and 1 to 6 October makes 6: add them."],
        win: "Yes, 12 + 6 = 18 days." },
      /* practice 6: answer in the plan = 22 days: 19 days from 12 to 30 November, and 3 days from 1 to 3 December */
      { qid: "M2.S4.T8.C37:6", kind: "count", from: [2026, 11, 12], to: [2026, 12, 3], ends: ["in", "in"], answer: 22, near: 21, forms: ["22 days", "twenty-two days"],
        say: "Now count from 12 November to 3 December, counting both dates.", ask: "12 Nov to 3 Dec?",
        miss: "Add the November part and the December part written under the pages.",
        swMiss: "The question counts 12 November too: set First day and Last day to Counts.",
        ladder: ["November has 30 days: count from 12 to 30, then from 1 to 3 in December.", "From 12 to 30 is 19 days; December adds 3 days: add them."],
        win: "Yes, 19 + 3 = 22 days." },
      /* practice 7 (UNUSED: exactly three a phase; it asks the same ends as ML3, both left out, and needs the holiday shelf) */
      /* practice 8: answer in the plan = Its last day is 6 April: 10 days from 22 to 31 March and 6 days in April (the play-time half is the clock's, not this tool's) */
      { qid: "M2.S4.T8.C37:8", kind: "last", from: [2026, 3, 22], days: 16, ends: ["in", null], answer: 6, near: 7, forms: ["6 April", "6th April"],
        say: "A 16-day tournament begins on 22 March as day one: which April date ends it?", ask: "Last day in April?",
        miss: "Find how many more days the April page needs to make 16 in all.",
        swMiss: "22 March is day one, so tap First day until it says Counts.",
        ladder: ["March has 31 days: count from 22 up to 31 to find the March days.", "22 to 31 March is 10 days, so take 10 from 16 to find the April date."],
        win: "Yes, 10 days in March and 6 in April end on 6 April." },
    ],
  },
  {
    n: 4,
    concept: "Writing a date in short form",
    conceptId: "M2.S4.T8.C38", objectiveIds: ["O14"],
    says: ["Day first, then the month, then the year. How many digits does each one take?"],
    /* the warm-up: 15 August 2026 (Independence Day), written and switched to slashes */
    steps: [
      { say: "Tap Write to write 15 August 2026 day first.", on: "write", hint: "Tap the Write key under the places." },
      { say: "Tap the Dots key to change the dots to slashes.", on: "sep", hint: "Tap the key that says Dots." },
    ],
    ladder: ["Day, month, year: each part has its own places.", "Fill every place, even when the number is small."],
    closing: "In a short date the day comes first and the year comes last.",
    learned: "You learned: write the day, then the month, then the year.",
    traceback: "The writer reads the child's digits back as the date they name, then sets the right digits day first, a 0 lit in each first place that was left empty.",
    items: [
      /* learn ML4: answer in the plan = 03.01.2027, which can also be written 03/01/2027 or 03-01-2027 */
      { qid: "M2.S4.T8.C38:ML4", kind: "date", d: 3, m: 1, y: 2027, parts: [{ label: "Day" }, { label: "Month" }, { label: "Year" }], answer: ["03", "01", "2027"], near: "01|03|2027",
        forms: ["03.01.2027", "03/01/2027", "03-01-2027"],
        say: "Write 3 January 2027 in short form, day first.", ask: "3 January 2027?",
        miss: "Type the day in the first box, then the month, then the year.", missNought: "Your numbers are right: give the day and the month a 0 in front.",
        ladder: ["The day is 3 and January is month 1: write the day first.", "Write 2 digits for the day, 2 for the month and 4 for the year."],
        win: "Yes, 03.01.2027 is 3 January 2027." },
      /* practice 3: answer in the plan = 30.04.2026, or 30/04/2026 or 30-04-2026 */
      { qid: "M2.S4.T8.C38:3", kind: "date", d: 30, m: 4, y: 2026, parts: [{ label: "Day" }, { label: "Month" }, { label: "Year" }], answer: ["30", "04", "2026"], near: "30|4|2026",
        forms: ["30.04.2026", "30/04/2026", "30-04-2026"],
        say: "Now write 30 April 2026 in short form.", ask: "30 April 2026?",
        miss: "Count the months from January to find April's number.", missNought: "Right numbers, but April's one digit needs a 0 before it.",
        ladder: ["January is 1, February 2 and March 3, so April comes next.", "Write a one-digit month in two places, with a 0 first."],
        win: "Yes, 30.04.2026, with a 0 before the 4." },
      /* AUTHORED: phase 4 had two plan questions; the textbook's own short form (09.10.2025) tests the nought in the DAY */
      { qid: null, kind: "date", d: 9, m: 10, y: 2025, parts: [{ label: "Day" }, { label: "Month" }, { label: "Year" }], answer: ["09", "10", "2025"], near: "9|10|2025",
        forms: ["09.10.2025", "09/10/2025", "09-10-2025"],
        say: "Write 9 October 2025 the same way.", ask: "9 October 2025?",
        miss: "Fill both places of the day, just as the month 10 fills both.",
        ladder: ["The day 9 has one digit, but a day always takes two places.", "Put a 0 in the first place of a one-digit day."],
        win: "Yes, 09.10.2025, with a 0 before the 9." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  wallYear: 2026,
  monthDays: "Jan 31, Feb 28 (29 in a leap year), Mar 31, Apr 30, May 31, Jun 30, Jul 31, Aug 31, Sep 30, Oct 31, Nov 30, Dec 31",
  ruler: "365 days in 4 blocks of 13 weeks of 7, and 1 day left",
  gate: ["divisible by 4?", "century year?", "divisible by 400?"],
  shortDate: "DD.MM.YYYY, or with slashes or dashes",
  /* the sidecar's guide.answerGate note (port writes no such field: the main session copies it) */
  answerGate: "After a real touch the Answer key and pad stay disabled until the act is done: P1 Q1 Sort, P1 Q2 Weeks, P2 all three Run, P3 all three Count (Count itself waits for the switches). A digit or a tap on the locked Answer key shows a one-sentence nudge naming the act; the question comes back when the act is done. UNGATED: P1 Q3 (the Saturday is read off the March page) and all of P4 (writing the date is the answer).",
};

/* ── the calendar (Work's route: a UTC Date for the weekday) ─────────────────────────────── */
const CC_MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CC_ABB = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CC_WDK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CC_DAYF = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const CC_INK = "#2B2B2B", CC_OLIVE = "#6E7F1A", CC_GREEN = "#009E73", CC_YEL = "#F0E442", CC_BAND = "#E69F00", CC_PAGE = "#FFF8E7";
const ccLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const ccDim = (y: number, m: number) => (m === 2 ? (ccLeap(y) ? 29 : 28) : [4, 6, 9, 11].indexOf(m) >= 0 ? 30 : 31);
const ccDow = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d)).getUTCDay();
/* the gate's answers for a year, in order, stopping where the rule stops */
const ccGateRows = (y: number) => { const r = [y % 4 === 0]; if (r[0]) { r.push(y % 100 === 0); if (r[1]) r.push(y % 400 === 0); } return r; };
const ccNext = (a: number[]) => (a[2] < ccDim(a[0], a[1]) ? [a[0], a[1], a[2] + 1] : a[1] < 12 ? [a[0], a[1] + 1, 1] : [a[0] + 1, 1, 1]);
const ccSame = (a: number[], b: number[]) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
/* the days a count lights, in order. "count": from `from` (or the day after) to `to` (or the day before).
   "last": from `from` (or the day after) to the end of its month (the rest of the 16 is the child's) */
function ccDays(it: any, ends: any[]): number[][] {
  const out: number[][] = [];
  let a = ends[0] === "in" ? it.from : ccNext(it.from);
  if (it.kind === "last") { while (a[1] === it.from[1] && out.length < 40) { out.push(a); a = ccNext(a); } return out; }
  const stop = ends[1] === "in" ? ccNext(it.to) : it.to;
  while (!ccSame(a, stop) && out.length < 400) { out.push(a); a = ccNext(a); }
  return out;
}
/* the per-month parts of a run of days: [{ m, n }] */
const ccParts = (days: number[][]) => days.reduce((acc: any[], d) => { const l = acc[acc.length - 1]; if (l && l.m === d[1]) l.n++; else acc.push({ m: d[1], n: 1 }); return acc; }, []);
const CC_MISS_YEAR = "Type all four digits of the year in the Year box.";
/* the stronger rungs while a slip stays (a nought dropped, the year cut short): the diagnosis on every rung, saying more each time */
const CC_LAD_NOUGHT = ["A day or month with one digit still takes two places.", "Type a 0 before each one-digit day or month, then the year."];
const CC_LAD_YEAR = ["The year has four digits, so the Year box takes all four.", "Type the year in full, not only its last two digits."];
const ccPad = (x: number, k: number) => { let s = String(x); while (s.length < k) s = "0" + s; return s; };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a short date compares digit strings exactly (03 is not 3: the noughts are the lesson; r30's judgeSlotParts
   compares Number()s and would pass 3|1|2027); other parts as numbers, choices by id */
const judge = (item: any, v: any) => {
  if (item.kind === "date") {
    const p = slotPartsOf(v, 3), ok = p.every((x: string, k: number) => x === item.answer[k]);
    /* the miss names the slip: right numbers in the right order with a nought dropped gets the nought line, else the item's own line */
    /* derived per attempt: a slip's line stays on every rung until the slip is fixed; Work restores the originals when the question opens */
    if (!item.missOrder) { item.missOrder = item.miss; item.ladderOrder = item.ladder; }
    const yearSlip = !ok && p[0] === item.answer[0] && p[1] === item.answer[1] && p[2] !== "" && p[2].length < 4 && item.answer[2].endsWith(p[2]);
    const noughtOnly = !ok && !!item.missNought && p.every((x: string, k: number) => x !== "" && Number(x) === Number(item.answer[k]));
    const diag = yearSlip ? CC_MISS_YEAR : noughtOnly ? item.missNought : "";
    item.miss = diag || item.missOrder;
    item.ladder = yearSlip ? CC_LAD_YEAR : noughtOnly ? CC_LAD_NOUGHT : item.ladderOrder;
    return ok;
  }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares no code with judge or Work: Zeller's congruence for weekdays, the knuckle rule
   for month lengths, a day number for counts; and the brief's own calendar facts */
const oracle = () => {
  const zel = (y: number, m: number, d: number) => {
    if (m < 3) { m += 12; y -= 1; }
    const K = y % 100, J = Math.floor(y / 100);
    const h = (d + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + 5 * J) % 7;
    return (h + 6) % 7;                                    /* 0 = Sunday */
  };
  const knuckle = (m: number) => (m === 2 ? 28 : m <= 7 ? (m % 2 === 1 ? 31 : 30) : (m % 2 === 0 ? 31 : 30));
  const leapO = (y: number) => (y % 400 === 0 ? true : y % 100 === 0 ? false : y % 4 === 0);
  const dayNo = (y: number, m: number, d: number) => { let t = d; for (let k = 1; k < m; k++) t += knuckle(k) + (k === 2 && leapO(y) ? 1 : 0); return t; };
  if (zel(2026, 1, 1) !== 4 || zel(2026, 3, 1) !== 0 || zel(2026, 7, 1) !== 3) return false;   /* Thu, Sun, Wed (the chapter's calendar) */
  return PHASES.every((p: any) => p.items.every((it: any) => {
    let want: any;
    if (it.kind === "sort") want = [knuckle(6), knuckle(8)];
    else if (it.kind === "weeks") want = [Math.floor(365 / 7), 365 - 7 * Math.floor(365 / 7)];
    else if (it.kind === "sat") { const first = 1 + ((6 - zel(it.year, it.month, 1) + 7) % 7); want = first + 14; }
    else if (it.kind === "gate" && !it.choices) want = 28 + (leapO(it.years[0]) ? 1 : 0);
    else if (it.kind === "gate") {
      const leaps = it.years.filter(leapO).map(String);
      want = it.years.length === 1 ? (leaps.length ? "ans-yes" : "ans-no")
        : (it.choices.find((c: any) => { const ys = String(c.label).match(/\d{4}/g) || it.years.map(String); return ys.join() === leaps.join(); }) || {}).id;
    } else if (it.kind === "count") {
      const span = dayNo(it.to[0], it.to[1], it.to[2]) - dayNo(it.from[0], it.from[1], it.from[2]);
      want = span - 1 + (it.ends[0] === "in" ? 1 : 0) + (it.ends[1] === "in" ? 1 : 0);
    } else if (it.kind === "last") { const end = dayNo(it.from[0], it.from[1], it.from[2]) + it.days - 1; want = end - dayNo(it.from[0], it.from[1] + 1, 0); }
    else if (it.kind === "date") want = [String(it.d).padStart(2, "0"), String(it.m).padStart(2, "0"), String(it.y)];
    return JSON.stringify(want) === JSON.stringify(it.answer);
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.forms ? item.forms : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (item.kind === "date" ? item.answer.join("|") : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (HOOK.check) HOOK.check();
  return T.submit(agentKey(item));
};
/* the agent's answer() for an item made on the working area: none here, so the value is typed */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: performs a question's act at once (sort, weeks, run, count); undefined in the demo stage */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */
/* a wall card: a calendar page (plain, then the calendar_page skin), its name on a paper chip in the band, and its
   days as small cells laid out under their weekdays (no numbers: the length of the month is seen, not printed) */
function ccCard(k: string, x: number, y: number, w: number, h: number, yr: number, m: number, name: string, fs = 28, o: any = {}) {
  const bh = Math.max(Math.round(h * 0.34), Math.round(fs * 1.95));
  const d1 = ccDow(yr, m, 1), nd = ccDim(yr, m);
  const gw = w - 18, cw = gw / 7, chh = Math.min(cw * 0.8, (h - bh - 16) / 6), gx = x + 9, gy = y + bh + 8;
  const nw = Math.min(w - 8, Math.max(fs * 2.3, name.length * fs * 0.62 + 30));
  const skinned = true;
  return (
    <g key={k} pointerEvents="none">
      {/* Soft drop shadow */}
      <rect x={x + 2} y={y + 3} width={w} height={h} rx={10} fill="rgba(0,0,0,0.12)" />
      {/* Calendar Card Body */}
      <rect x={x} y={y} width={w} height={h} rx={10} fill={CC_PAGE} stroke={CC_INK} strokeWidth={2.5} />
      <rect x={x + 1.5} y={y + 1.5} width={w - 3} height={bh} rx={9} fill={CC_BAND} />
      {/* Top light highlight on band */}
      <rect x={x + 3} y={y + 3} width={w - 6} height={Math.max(2, bh * 0.3)} rx={4} fill="#FFFFFF" fillOpacity={0.25} />
      {/* Calendar page skin strictly behind outlines and titles */}
      {skinned && <Skin name="calendar_page" x={x} y={y} w={w} h={h} fit="stretch" />}
      <rect x={x} y={y} width={w} height={h} rx={10} fill="none" stroke={CC_INK} strokeWidth={2.5} />
      
      {/* Hanging hole dots */}
      <circle cx={x + w * 0.28} cy={y + 5} r={1.8} fill={CC_INK} opacity={0.5} />
      <circle cx={x + w * 0.72} cy={y + 5} r={1.8} fill={CC_INK} opacity={0.5} />

      {/* Month Name Chip */}
      <rect x={x + (w - nw) / 2} y={y + bh / 2 - fs * 0.92} width={nw} height={fs * 1.84} rx={8} fill="#FFFFFF" stroke={CC_INK} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + bh / 2 + fs * 0.45} textAnchor="middle" fontSize={fs} fontWeight={700} fill={CC_INK}>{name}</text>
      
      {/* Day cells grid */}
      {Array.from({ length: nd }).map((_, i) => {
        const j = d1 + i;
        const leapDay = m === 2 && i === 28;
        return <rect key={i} x={gx + (j % 7) * cw + 1} y={gy + Math.floor(j / 7) * chh + 1} width={cw - 2} height={chh - 2} rx={1.5}
          fill={leapDay ? CC_YEL : tint(CC_OLIVE, 0.55)} stroke={CC_INK} strokeWidth={leapDay ? 1.6 : 0.9} />;
      })}
      {o.ring && <rect x={x - 5} y={y - 5} width={w + 10} height={h + 10} rx={14} fill="none" stroke={shade(CC_OLIVE, 0.25)} strokeWidth={5} />}
    </g>
  );
}
/* one month page: title band, the weekday letters, the dates under their weekdays.
   o: { title, days (29 to grow February), grow (that day yellow), lit(d), out(d), flag(d), rings: [d], col (a lit weekday column) } */
function ccPageGeom(x: number, y: number, cw: number, ch: number, fs: number, yr: number, m: number, days?: number) {
  const d1 = ccDow(yr, m, 1), nd = days || ccDim(yr, m), rows = Math.ceil((d1 + nd) / 7);
  const tb = Math.round(fs * 2.1), hh = Math.round(fs * 1.6), W = 7 * cw + 16, H = tb + hh + rows * ch + 10;
  const cell = (d: number) => { const j = d1 + d - 1; return { x: x + 8 + (j % 7) * cw, y: y + tb + hh + Math.floor(j / 7) * ch, w: cw, h: ch }; };
  return { d1, nd, rows, tb, hh, W, H, cell };
}
function ccPage(k: string, x: number, y: number, cw: number, ch: number, fs: number, yr: number, m: number, wd: (i: number) => string, o: any = {}) {
  const G = ccPageGeom(x, y, cw, ch, fs, yr, m, o.days);
  const tw = Math.min(G.W - 16, String(o.title).length * (fs + 2) * 0.6 + 24);
  const skinned = true;
  return (
    <g key={k} pointerEvents="none">
      {/* Soft Drop Shadow */}
      <rect x={x + 4} y={y + 6} width={G.W} height={G.H} rx={14} fill="rgba(0,0,0,0.14)" />
      {/* Main Base Card */}
      <rect x={x} y={y} width={G.W} height={G.H} rx={14} fill={CC_PAGE} stroke={CC_INK} strokeWidth={3} />
      <rect x={x + 1.5} y={y + 1.5} width={G.W - 3} height={G.tb} rx={12} fill={CC_BAND} />
      <rect x={x + 4} y={y + 4} width={G.W - 8} height={Math.max(3, G.tb * 0.3)} rx={6} fill="#FFFFFF" fillOpacity={0.25} />
      
      {/* Calendar wall hanging holes */}
      <circle cx={x + G.W * 0.22} cy={y + 9} r={3.5} fill={CC_INK} opacity={0.65} />
      <circle cx={x + G.W * 0.5} cy={y + 9} r={3.5} fill={CC_INK} opacity={0.65} />
      <circle cx={x + G.W * 0.78} cy={y + 9} r={3.5} fill={CC_INK} opacity={0.65} />

      {/* Calendar Skin */}
      {skinned && <Skin name="calendar_page" x={x} y={y} w={G.W} h={G.H} fit="stretch" />}
      <rect x={x} y={y} width={G.W} height={G.H} rx={14} fill="none" stroke={CC_INK} strokeWidth={3} />

      {/* Title Banner Chip */}
      <rect x={x + (G.W - tw) / 2} y={y + G.tb / 2 - fs * 0.95} width={tw} height={fs * 1.9} rx={9} fill="#FFFFFF" stroke={CC_INK} strokeWidth={1.5} />
      <text x={x + G.W / 2} y={y + G.tb / 2 + fs * 0.5} textAnchor="middle" fontSize={fs + 2} fontWeight={700} fill={CC_INK}>{o.title}</text>

      {o.col !== undefined && <rect x={x + 8 + o.col * cw + 2} y={y + G.tb + 4} width={cw - 4} height={G.H - G.tb - 10} rx={8} fill={tint(CC_OLIVE, 0.72)} stroke={CC_INK} strokeWidth={1.5} />}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <text key={"w" + i} x={x + 8 + i * cw + cw / 2} y={y + G.tb + G.hh * 0.66} textAnchor="middle" fontSize={fs} fontWeight={700} fill={CC_INK}>{wd(i)}</text>
      ))}
      <line x1={x + 8} y1={y + G.tb + G.hh} x2={x + G.W - 8} y2={y + G.tb + G.hh} stroke={CC_INK} strokeWidth={2} />
      {Array.from({ length: G.nd }).map((_, i) => {
        const d = i + 1, c = G.cell(d);
        const lit = o.lit && o.lit(d), out = o.out && o.out(d), flag = o.flag && o.flag(d), grow = o.grow === d;
        return (
          <g key={"d" + d}>
            {/* Dark Outline Unit Grid box background */}
            <rect x={c.x + 1.5} y={c.y + 1.5} width={c.w - 3} height={c.h - 3} rx={6} fill="none" stroke={CC_INK} strokeWidth={1.2} opacity={0.3} />
            {(lit || grow) && (
              <g>
                <rect x={c.x + 3} y={c.y + 3} width={c.w - 6} height={c.h - 6} rx={7} fill={grow ? CC_YEL : tint(CC_GREEN, 0.5)} stroke={grow ? CC_INK : shade(CC_GREEN, 0.2)} strokeWidth={grow ? 3 : 1.5} />
                <rect x={c.x + 5} y={c.y + 5} width={c.w - 10} height={Math.max(2, (c.h - 10) * 0.32)} rx={4} fill="#FFFFFF" fillOpacity={0.3} />
              </g>
            )}
            {(out || flag) && <rect x={c.x + 3} y={c.y + 3} width={c.w - 6} height={c.h - 6} rx={7} fill="none" stroke={CC_INK} strokeWidth={3.5} />}
            {o.rings && o.rings.indexOf(d) >= 0 && <circle cx={c.x + c.w / 2} cy={c.y + c.h / 2} r={Math.min(c.w, c.h) / 2 - 1} fill="none" stroke={shade(CC_OLIVE, 0.3)} strokeWidth={4} />}
            <text x={c.x + c.w / 2} y={c.y + c.h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={o.bold && o.bold(d) ? 700 : 600} fill={CC_INK}>{d}</text>
          </g>
        );
      })}
    </g>
  );
}

/* ── layout (one scene, laid out for the open width 900, the same open or shut) ───────────── */
/* the wall: twelve month cards, three across and four down, at the left */
const CC_CARD = (i: number) => ({ x: (i % 3) * 126, y: 52 + Math.floor(i / 3) * 112, w: 116, h: 102 });
const CC_GROUPS = [[1, 3, 5, 7, 8, 10, 12], [4, 6, 9, 11], [2]];
/* the rack (the owner, 2026-11-16, second pass: "count from the far bench"): the two ASKED months, June and August, lie as
   BIG blocks at the left, every day a 56 x 56 cell with a dark outline, one row per ten, the tens 16 apart, so a month
   reads 10 + 10 + 10 (+ 1); they stand at one size and place, open or shut (x 0 to 882, clear of the open keypad). The
   whole year lies as a small context rack at the right while the keypad is shut (it fades out as the keypad opens): the
   months of one length together, 31-day rows, then 30-day rows, then February, June and August picked out. */
const CC_ORDER = CC_GROUPS.reduce((a: number[], g) => a.concat(g), []);
const CC_BC = 56, CC_BP = 62, CC_BRP = 72, CC_BXL = 152;    /* big cell, its pitch in a ten, the pitch of the tens, first x */
const ccBigTop = (m: number) => (m === 6 ? 8 : 8 + 3 * CC_BC + 2 * 16 + 28);
const ccBigRows = (m: number) => Math.ceil(ccDim(2026, m) / 10);
const ccBigH = (m: number) => ccBigRows(m) * CC_BRP - 16;
const CC_CTX = CC_ORDER.filter((m) => m !== 6 && m !== 8);   /* the other ten months: 31s, 30s, February */
/* the context rack: two columns of five months, each month a small block in rows of ten (like the big ones) with its 32 label
   on the left; the rows are 84 apart, so no two labels touch in any language (hi/gu matras merged at a 44 pitch: visual review 3.5) */
const CC_XC = [1000, 1296], CC_XP = 13, CC_XCW = 10, CC_XCH = 12, CC_XT = 104, CC_XRP = 84;   /* the x of each column's cells */
const ccCtx = (m: number) => { const k = CC_CTX.indexOf(m), c = Math.floor(k / 5); return { lx: CC_XC[c] - 16, x: CC_XC[c], y: CC_XT + (k % 5) * CC_XRP }; };
/* the weeks ruler: four bands of 13 weeks, a week a standing bar 40 wide (its seven days inside), the bands 16 apart */
const CC_WBW = 40, CC_WBP = 47, CC_WBH = 80;
const ccBandY = (j: number) => 60 + j * (CC_WBH + 16);
const CC_RK = { x: 520, y: 210, w: 240, h: 90 };            /* Sort: beside the wall, gone once the months stand as bars */
const CC_PG = { x: 400, y: 30, cw: 68, ch: 54, fs: 32 };    /* an opened month page, right of the wall */
const CC_WK = { x: 0, y: 440, w: 220, h: 80 };              /* Weeks, under the bands */
const CC_SW = [{ x: 716, y: 60, w: 180, h: 80 }, { x: 716, y: 214, w: 180, h: 80 }];
const CC_CK = { x: 716, y: 398, w: 180, h: 90 };            /* Count */
const CC_MK = { x: 330, y: 306, w: 240, h: 80 };            /* Write, then the marks key */
const CC_SEPS = [".", "/", "-"];
const CC_SEPN = ["Dots", "Slashes", "Dashes"];
/* the date writer: x of each place (2 day, 2 month, 4 year) and of the two marks */
const CC_PL = [94, 172, 302, 380, 510, 588, 666, 744];
const CC_PW = 70, CC_PY = 190, CC_PH = 88, CC_SX = [272, 480];

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const P = PHASES[n - 1];
  const free = stage === "free";
  const demo = !free && !!P.steps && (stage === "demo" || stage === "teach");
  const it: any = free ? { kind: "free" } : demo ? CC_WARM[n - 1] : item || {};
  /* the board belongs to the ENTRY of a question (PATTERNS §18) */
  const base = free ? "free" : demo ? n + ":demo" : n + ":" + index;
  const ent = useRef({ k: "", c: 0 });
  if (ent.current.k !== base) ent.current = { k: base, c: ent.current.c + 1 };
  const qk = base + "#" + ent.current.c;
  const fresh = () => ({ qk, open: 0, moved: 0, blocks: 0, left: false, cols: [] as number[], ends: [null, null] as any[], lit: 0, pc: 0, written: false, sep: 0, year: 2026, acted: false, tracing: false, demo: null as any });
  const [raw, setRaw] = useState<any>(fresh);
  const S = raw.qk === qk ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => {
    if (ent.current.k + "#" + ent.current.c !== qk) return p;
    const cur = p.qk === qk ? p : fresh();
    return { ...cur, ...(typeof o === "function" ? o(cur) : o) };
  });
  const busy = useRef<any>(false);                /* "act" while the child's own act moves (the Hint key and a guide digit wait); true in a correction */
  useEffect(() => { busy.current = false; return () => tl.stop(); }, [qk]);
  /* a question opens with its own lines: undo what judge() set for a slip in an earlier run (a Restart keeps the item objects) */
  useEffect(() => { if (item && item.missOrder) { item.miss = item.missOrder; item.ladder = item.ladderOrder; } }, [qk]);
  const asking = !free && !demo && stage === "ask";
  const won = !free && !demo && (stage === "win" || stage === "idle");
  const D = S.demo;
  const kx = box && box.key ? box.key.x - 12 : 900;
  void kx;                                                      /* the scene ends at 900, left of the key's corner */
  const wd = (i: number) => { const t = lang === "en" ? "" : tx(CC_WDK[i]); return !t || t === CC_WDK[i] ? "SMTWTFS"[i] : t; };   /* hi/gu: a one- or two-letter TR for Sun..Sat */
  const mon = (m: number) => tx(CC_MON[m - 1]);

  /* ── the acts (each performed on screen through api.act) ── */
  const touched = useRef(false);
  const lastKey = useRef(0);
  const press = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    touched.current = true;
    act(id);
  };
  /* NO DRAWN HAND (the owner, 2026-11-16): the pieces move and light by themselves, one beat each, about 1.1 to 1.5 s;
     reduced motion: every beat at once. `acted` is set only when the whole act is over, so the answer lock (lockWanted)
     holds until then, as api.act used to hold it. A cancelled run never resolves; `busy` is reset by the qk effect. */
  const beats = (n: number, ms: number, each: (i: number) => void) => new Promise<boolean>((res) => {
    if (reducedMotion()) { for (let i = 0; i < n; i++) each(i); res(true); return; }
    tl.run(Array.from({ length: n }, (_, i) => [ms, () => each(i)]), () => res(true));
  });
  const doOpen = (m: number) => {
    if (busy.current) return;
    if (S.open === m) { api.did("month-" + m); return; }
    put({ open: m, demo: null }); api.sfx.settle(); api.did("month-" + m);
  };
  const doSort = async () => {
    if (busy.current) return;
    if (S.moved >= 12) { api.did("sort"); return; }
    busy.current = "act";
    put({ demo: null });
    const ok = await beats(12, 110, (i: number) => { put({ moved: i + 1 }); api.sfx.tick(); });
    busy.current = false;
    if (!ok) return;
    put({ moved: 12, acted: true }); api.sfx.settle(); api.did("sort");
    /* the Sort key unmounts: a keyboard child's focus goes to the Answer key (a tick later, once the lock is off), never to the page */
    setTimeout(() => { const a: any = document.activeElement; if (a && a !== document.body) return; const k: any = document.querySelector('[data-control="answer-open"]'); if (k && k.focus) k.focus(); }, 150);
  };
  const doWeeks = async () => {
    if (busy.current) return;
    if (S.blocks >= 4) { api.did("weeks"); return; }
    busy.current = "act";
    put({ demo: null });
    const ok = await beats(5, 300, (j: number) => { if (j < 4) { put({ blocks: j + 1 }); api.sfx.tick(); } else put({ left: true }); });
    busy.current = false;
    if (!ok) return;
    put({ blocks: 4, left: true, acted: true }); api.sfx.settle(); api.did("weeks");
  };
  /* the gate */
  const gateYears = (): number[] => (it.kind === "free" ? [S.year] : it.years || []);
  const gateGeom = () => {
    const nc = gateYears().length;
    if (it.kind === "free") return { lx: 400, lw: 250, rowY: (r: number) => 98 + r * 76, rh: 66, cw: 230, colX: (j: number) => 666 + j, vy: 332, hdr: false, fs: 30, span: 230, ky: 420 };
    const cw = nc > 1 ? 190 : 210, span = nc * cw + (nc - 1) * 14;
    return { lx: 0, lw: 260, rowY: (r: number) => 88 + r * 94, rh: 78, cw, colX: (j: number) => 276 + j * (cw + 14), vy: 364, hdr: true, fs: 32, span, ky: 440 };
  };
  const doRun = async () => {
    if (busy.current) return;
    const ys = gateYears();
    let js = ys.map((_, j) => j).filter((j) => (S.cols[j] || 0) < ccGateRows(ys[j]).length);
    if (demo) js = js.slice(0, 1);
    if (!js.length) { api.did("run"); return; }
    busy.current = "act";
    put({ demo: null });
    const g = gateGeom();
    for (const j of js) {
      const rows = ccGateRows(ys[j]);
      const text = rows.map((_, r) => ({ dab: [g.colX(j) + g.cw / 2, g.rowY(r) + g.rh / 2] }));
      const ok = await api.act({ tool: "pencil", moves: "write", text, at: text.map(() => null),
        onPoint: (r: number) => put((p: any) => { const c = p.cols.slice(); c[j] = Math.max(c[j] || 0, r + 1); return { cols: c }; }) });
      if (!ok) { busy.current = false; return; }
      put((p: any) => { const c = p.cols.slice(); c[j] = rows.length; return { cols: c }; });
    }
    busy.current = false;
    put({ acted: true }); api.sfx.settle(); api.did("run");
  };
  /* the day counter */
  const isCount = it.kind === "count" || it.kind === "last";
  const pgA = isCount ? { x: 2, y: 0, m: it.from[1], yr: it.from[0] } : null;
  const pgB = isCount ? (it.kind === "last" ? { x: 358, y: 0, m: it.from[1] + 1, yr: it.from[0] } : { x: 358, y: 0, m: it.to[1], yr: it.to[0] }) : null;
  const endsNow = (): any[] => (D && D.ends ? D.ends : S.ends);
  const ready = (e: any[]) => !!e[0] && (it.kind === "last" || !!e[1]);
  const CY = 462, CF = lang === "gu" ? 40 : 36;       /* the parts line: one size for labels and written numbers */                                      /* the parts line under the pages */
  const partX = [150, 410];
  const partToks = (days: number[][]) => ccParts(days).map((p: any) => String(p.n));
  const doCount = async () => {
    if (busy.current || won) return;                 /* the win picture (and the phase end) is final: Count and the switches are flat */
    const e = S.ends;
    if (!ready(e) || (S.lit > 0 && S.pc >= 999)) { api.did("count"); return; }
    const want = it.ends || [];
    /* a refused Count says the switch line and marks it as a nudge, so the question comes back once the Count is good */
    if (!demo && asking && (e[0] !== want[0] || (it.kind !== "last" && e[1] !== want[1]))) { if (item && item.swMiss) { nudged.current = qk; api.say(item.swMiss); } api.did("count"); return; }
    busy.current = "act";
    put({ demo: null, lit: 0, pc: 0 });
    const days = ccDays(it, e);
    const ok = await beats(days.length, Math.min(220, Math.max(60, Math.round(1200 / Math.max(1, days.length)))), (i: number) => put({ lit: i + 1 }));
    if (!ok) { busy.current = false; return; }
    put({ lit: days.length });
    const toks = partToks(days);
    const ok2 = await api.act({ tool: "pencil", moves: "write", text: toks, at: toks.map((_, j) => ({ x: partX[j], y: CY })), size: CF, align: "middle", color: CC_INK, onPoint: (i: number) => put({ pc: i + 1 }) });
    busy.current = false;
    if (!ok2) return;
    put({ pc: 999, acted: true }); api.did("count");
  };
  const doSwitch = (k: number) => {
    if (busy.current || won) return;
    put((p: any) => { const e = p.ends.slice(); e[k] = e[k] === "in" ? "out" : "in"; return { ends: e, lit: 0, pc: 0, demo: null, acted: p.tracing ? p.acted : false }; });
    api.sfx.tick(); api.did(k === 0 ? "first" : "last");
  };
  /* the date writer */
  const warmChars = (): string[] => { const s = ccPad(it.d || 15, 2) + "." + ccPad(it.m || 8, 2) + "." + String(it.y || 2026); return s.split(""); };
  const charX = (j: number) => (j < 2 ? CC_PL[j] + CC_PW / 2 : j === 2 ? CC_SX[0] : j < 5 ? CC_PL[j - 1] + CC_PW / 2 : j === 5 ? CC_SX[1] : CC_PL[j - 2] + CC_PW / 2);
  const DY = CC_PY + CC_PH / 2 + 20;
  const doWrite = async () => {
    if (busy.current) return;
    if (S.written) { api.did("write"); return; }
    busy.current = "act";
    const ch = warmChars();
    const ok = await api.act({ tool: "pencil", moves: "write", text: ch, at: ch.map((_, j) => ({ x: charX(j), y: DY })), size: T.xl, align: "middle", onPoint: (i: number) => put({ pc: i + 1 }) });
    busy.current = false;
    if (!ok) return;
    put({ written: true, pc: 999 }); api.did("write");
  };
  const doSep = () => {
    if (busy.current) return;
    put((p: any) => ({ sep: (p.sep + 1) % 3 })); api.sfx.tick(); api.did("sep");
  };
  const act = (on: any) => {
    const mm = /^month-(\d+)$/.exec(String(on));
    if (mm) { doOpen(Number(mm[1])); return; }
    if (on === "sort") doSort();
    else if (on === "weeks") doWeeks();
    else if (on === "run") doRun();
    else if (on === "first") doSwitch(0);
    else if (on === "last") doSwitch(1);
    else if (on === "count") doCount();
    else if (on === "write") doWrite();
    else if (on === "sep") doSep();
  };
  const turnYear = (dy: number) => { touched.current = true; put((p: any) => ({ year: Math.max(1600, Math.min(2400, p.year + dy)), cols: [] })); api.sfx.tick(); };

  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  api.onEnter(demo && stepOn ? () => act(stepOn) : null);
  const needAct = ["sort", "weeks", "gate", "count", "last"].indexOf(it.kind) >= 0;
  const fullAct = () => (it.kind === "sort" ? { moved: 12, acted: true }
    : it.kind === "weeks" ? { blocks: 4, left: true, acted: true }
    : it.kind === "gate" ? { cols: it.years.map((y: number) => ccGateRows(y).length), acted: true }
    : { ends: it.ends.slice(), lit: 999, pc: 999, acted: true });
  HOOK.demo = null;
  HOOK.check = asking && needAct && !S.acted ? () => { put(fullAct()); return undefined; } : null;

  /* ANSWER GATED BY THE ACT (PATTERNS §20): after a real touch, the keys wait for the act (Sort, Weeks, Run, Count) */
  /* the correction does not hold the pad: a lock set from its (passive) effect leaves a moment unlocked right after the miss, and
     a digit typed after it would land in a locked pad and keep the hint up; the board is held by `busy` while it plays */
  const lockWanted = asking && !S.tracing && touched.current && needAct && !S.acted;
  useEffect(() => { api.lock(lockWanted); }, [lockWanted, qk]);
  /* the nudge (PATTERNS §20): a digit or a tap on the locked Answer key names the act; the question comes back once it is done */
  const nudged = useRef("");
  const nudgeLine = () => (it.kind === "sort" ? "Now tap Sort to stand the months up as bars."
    : it.kind === "weeks" ? "Now tap Weeks to lay out the days."
    : it.kind === "gate" ? "Now tap Run to send the years through the gate."
    /* the Hint key while locked (the educator, FEED2): switches unset or set against the question -> the question's own switch line */
    : item && item.swMiss && (!ready(S.ends) || S.ends[0] !== it.ends[0] || (it.kind !== "last" && S.ends[1] !== it.ends[1])) ? item.swMiss
    : ready(S.ends) ? "Now tap Count to light the days." : "Set the switches first, then tap Count.");
  const stageRef = useRef(stage);
  stageRef.current = stage;
  const lockRef = useRef(false);
  lockRef.current = lockWanted && !busy.current;
  const nudgeRef = useRef(nudgeLine);
  nudgeRef.current = nudgeLine;
  useEffect(() => {
    const say = () => { if (!lockRef.current) return; const l = nudgeRef.current(); nudged.current = qk; api.say(l); };
    const onKey = (e: any) => { if (/^[0-9]$/.test(e.key) || e.key === "Enter") { if (e.isTrusted && e.key === "Enter" && stageRef.current === "demo") touched.current = true; say(); } };
    const onDown = (e: any) => {
      const c = e.target && e.target.closest ? e.target.closest('[data-control="answer-open"], [data-control="again"]') : null;
      if (!c) return;
      if (c.getAttribute("data-control") === "again") setTimeout(say, 90); else say();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown, true);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onDown, true); };
  }, [qk]);
  useEffect(() => { if (S.acted && asking && nudged.current === qk && item) { nudged.current = ""; api.say(item.say); } }, [S.acted]);
  /* while the child's own act moves (Sort, Weeks, Run, Count, Write; never a correction) the Hint key and a guide-step digit wait:
     no "Tap the Write key" hint for a tap that is already being done (r31's guard reads only api.act's own busy flag) */
  useEffect(() => {
    const hold = (e: any) => {
      if (busy.current !== "act") return;
      const hintKey = e.target && e.target.closest ? e.target.closest('[data-control="again"]') : null;
      const digit = e.type === "keydown" && /^[0-9]$/.test(e.key) && stageRef.current === "demo";
      if (hintKey || digit) { e.preventDefault(); e.stopPropagation(); }
    };
    const evs = ["pointerdown", "pointerup", "mousedown", "mouseup", "click", "keydown"];
    evs.forEach((t) => window.addEventListener(t, hold, true));
    return () => evs.forEach((t) => window.removeEventListener(t, hold, true));
  }, []);

  /* the date writer's places: Day and Month hold 2 digits, Year 4 (r30's parts boxes have no cap of their own) */
  useEffect(() => {
    if (it.kind !== "date" || !asking || S.tracing || !typed) return;
    const ps = String(typed).split("|"), cap = [2, 2, 4];
    const cut = ps.map((x, k) => (k < 3 ? x.slice(0, cap[k]) : x));
    if (cut.join("|") !== ps.join("|")) api.setTyped(cut.join("|"));
  }, [typed]);

  /* the win line (a phase's last one gives way to its closing) */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage, qk]);

  /* the traceback: redraws the maths and ends on the whole right answer, unmarked (run from wrong.value) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    busy.current = true;
    const end = () => { busy.current = false; put({ tracing: false, acted: true }); };
    const k = it.kind;
    if (k === "sort") {
      put({ tracing: true, moved: 0, demo: { ring: 0 } });
      const st: any[] = Array.from({ length: 12 }, (_, i) => [90, () => put({ moved: i + 1 })]);
      st.push([500, () => { put({ demo: { ring: 1 } }); api.sfx.settle(); }], [700, () => put({ demo: { ring: 2 } })]);
      tl.run(st, end);
    } else if (k === "weeks") {
      put({ tracing: true, blocks: 0, left: false, demo: { cap: false } });
      tl.run([[350, () => put({ blocks: 1 })], [350, () => put({ blocks: 2 })], [350, () => put({ blocks: 3 })], [350, () => put({ blocks: 4 })],
        [600, () => { put({ left: true }); api.sfx.settle(); }], [600, () => put({ demo: { cap: true } })]], end);
    } else if (k === "sat") {
      put({ tracing: true, demo: { sat: 0 } });
      tl.run([[500, () => put({ demo: { sat: 1 } })], [500, () => put({ demo: { sat: 2 } })], [500, () => put({ demo: { sat: 3 } })], [500, () => put({ demo: { sat: 3, cap: true } })]], end);
    } else if (k === "gate") {
      put({ tracing: true, cols: [], demo: { verdict: false } });
      const st: any[] = [];
      it.years.forEach((y: number, j: number) => ccGateRows(y).forEach((_: any, r: number) => st.push([380, () => put((p: any) => { const c = p.cols.slice(); c[j] = r + 1; return { cols: c }; })])));
      st.push([500, () => { put({ demo: { verdict: true } }); api.sfx.settle(); }]);
      tl.run(st, end);
    } else if (k === "count" || k === "last") {
      const days = ccDays(it, it.ends);
      put({ tracing: true, lit: 0, pc: 0, demo: { ends: it.ends, total: false } });
      const st: any[] = [[500, () => {}]];
      days.forEach((_: any, i: number) => st.push([70, () => put({ lit: i + 1 })]));
      st.push([500, () => put({ pc: 999 })], [600, () => { put({ demo: { ends: it.ends, total: true } }); api.sfx.settle(); }]);
      tl.run(st, end);
    } else if (k === "date") {
      const mine = slotPartsOf(wrong.value, 3);
      put({ tracing: true, demo: { mine, tv: typed, right: false } });
      tl.run([[1400, () => {}], [900, () => put({ demo: { mine, tv: typed, right: true } })]], end);
    } else end();
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  const yearNow = it.kind === "free" ? S.year : it.year || (it.years ? it.years[0] : it.from ? it.from[0] : it.y || 2026);
  api.share({
    phase: n, year: yearNow, monthsSorted: S.moved, yearTotal: it.kind === "weeks" ? 365 : null,
    weeksLeft: won && it.kind === "weeks" ? item.answer.slice() : null, leapSteps: S.cols.slice(),
    firstDate: it.from ? it.from.join("-") : null, lastDate: it.to ? it.to.join("-") : null,
    firstCounts: isCount ? S.ends[0] : null, lastCounts: isCount ? S.ends[1] : null,
    dayCount: won && isCount ? item.answer : null, shortDate: won && it.kind === "date" ? item.answer.join(".") : null,
    actDone: !!S.acted, complete: stage === "idle",
  });

  /* ── drawing ── */
  const keyEl = (id: string, label: string, b: any, o: any = {}) => (
    <g>
      <Key key={"k-" + b.x + "-" + b.y} id={id} label={label} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" disabled={o.off} onClick={() => press(id)}>
        <text y={11} textAnchor="middle" fontSize={(o.fs || T.label) + (lang === "gu" ? 4 : 0)} fontWeight={700} fill={o.off ? "#4A4A4A" : toneInk("key", C.ink)}>{label}</text>
      </Key>
      {((demo && stepOn === id) || o.invite) && <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} C={C} />}
    </g>
  );
  const wall = (yr: number, live: boolean, ringM = 0) => (
    <g>
      <rect x={104} y={0} width={160} height={44} rx={10} fill={tint(C.panel, 0.4)} stroke={CC_INK} strokeWidth={2} />
      <text x={184} y={36} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={CC_INK} pointerEvents="none">{yr}</text>
      {Array.from({ length: 12 }).map((_, i) => {
        const c = CC_CARD(i), m = i + 1;
        return (
          <g key={"c" + m}>
            {ccCard("card" + m, c.x, c.y, c.w, c.h, yr, m, tx(CC_ABB[i]), T.label + (lang === "gu" ? 2 : 0), { ring: ringM === m || S.open === m })}
            {live && <Hit id={"month-" + m} x={c.x} y={c.y} w={c.w} h={c.h} label={mon(m)} onPress={() => press("month-" + m)} />}
            {demo && stepOn === "month-" + m && <Invite x={c.x + c.w / 2} y={c.y + c.h / 2} w={c.w} h={c.h} C={C} />}
          </g>
        );
      })}
    </g>
  );
  const bigPage = (yr: number, m: number, o: any = {}) => ccPage("pg" + m, CC_PG.x, CC_PG.y, CC_PG.cw, CC_PG.ch, CC_PG.fs, yr, m, wd, { title: mon(m) + " " + yr, ...o });

  /* phase 1: the sort stands every month up as a bar of its days (cells in tens), equal bars together; no number until the win */
  const sceneRack = () => {
    /* only the two asked months are ringed: July (the brief's "July and August, both 31") sits in the small rack, away from the big August,
       so its ring tied nothing to the question on screen (visual review 3.5) */
    const showN = (m: number) => won || (D && D.ring >= 2 && (m === 6 || m === 8));
    const ringOn = (m: number) => !!(D && D.ring >= 1 && (m === 6 || m === 8));
    /* the context rack fades with the keypad: gone once the area has narrowed to the open width */
    const ctxA = box ? Math.max(0, Math.min(1, (box.w - 900) / 572)) : 1;
    const bigEnd = CC_BXL + 10 * CC_BP - (CC_BP - CC_BC);
    return (
      <g>
        {S.moved === 0 && !S.tracing && !won && wall(2026, false)}
        {(S.moved > 0 || S.tracing || won) && <g pointerEvents="none">
        {/* the two asked months, big: a row of 10 cells per ten, so June reads 10 + 10 + 10 and August 10 + 10 + 10 + 1 */}
        {[6, 8].filter((m) => S.moved >= m).map((m) => {
          const top = ccBigTop(m), h = ccBigH(m), nd = ccDim(2026, m), lf = lang === "en" ? 40 : 36;
          return (
            <g key={"big" + m}>
              {ringOn(m) && <rect x={0} y={top - 6} width={bigEnd + 12} height={h + 12} rx={12} fill={tint(CC_OLIVE, 0.75)} stroke={shade(CC_OLIVE, 0.25)} strokeWidth={4} />}
              <rect x={CC_BXL - 12} y={top - 2} width={6} height={h + 4} rx={3} fill="#B89B72" stroke={CC_INK} strokeWidth={2} />
              <text x={CC_BXL - 22} y={top + h / 2 + lf * 0.36} textAnchor="end" fontSize={lf} fontWeight={700} fill={CC_INK}>{tx(CC_ABB[m - 1])}</text>
              {Array.from({ length: nd }).map((_, j) => (
                <rect key={j} x={CC_BXL + (j % 10) * CC_BP} y={top + Math.floor(j / 10) * CC_BRP} width={CC_BC} height={CC_BC} rx={6}
                  fill={tint(CC_OLIVE, 0.45)} stroke={CC_INK} strokeWidth={3} />
              ))}
              {showN(m) && (
                <g>
                  <rect x={bigEnd + 20} y={top + h / 2 - 34} width={96} height={68} rx={12} fill="#FFFFFF" stroke={CC_INK} strokeWidth={2.5} />
                  <text x={bigEnd + 68} y={top + h / 2 + 17} textAnchor="middle" fontSize={T.xl - 8} fontWeight={700} fill={CC_INK}>{nd}</text>
                </g>
              )}
            </g>
          );
        })}
        {/* the whole year, small, as it lies sorted: context only (nothing here is counted), shown while the keypad is shut */}
        {ctxA > 0.02 && (
          <g opacity={ctxA}>
            {Array.from({ length: S.moved }).map((_, i) => {
              const m = i + 1;
              if (m === 6 || m === 8) return null;
              const g = ccCtx(m), nd = ccDim(2026, m), h = Math.ceil(nd / 10) * CC_XP - (CC_XP - CC_XCH), base = g.y + h / 2 + T.label * 0.36;
              return (
                <g key={"ctx" + m}>
                  <rect x={g.x - 7} y={g.y - 3} width={4} height={h + 6} rx={2} fill="#B89B72" stroke={CC_INK} strokeWidth={1.2} />
                  <text x={g.lx} y={base} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CC_INK}>{tx(CC_ABB[i])}</text>
                  {Array.from({ length: nd }).map((__, j) => (
                    <rect key={j} x={g.x + (j % 10) * CC_XP} y={g.y + Math.floor(j / 10) * CC_XP} width={CC_XCW} height={CC_XCH} rx={2} fill={tint(CC_OLIVE, 0.45)} stroke={CC_INK} strokeWidth={1.2} />
                  ))}
                  {showN(m) && <text x={g.x + 9 * CC_XP + CC_XCW + 6} y={base} fontSize={T.label} fontWeight={700} fill={CC_INK}>{nd}</text>}
                </g>
              );
            })}
          </g>
        )}
        </g>}
        {S.moved === 0 && !S.tracing && !won && keyEl("sort", tx("Sort"), CC_RK, { invite: lockWanted })}
      </g>
    );
  };
  /* the "13 weeks" chips sit left of the bands: wider in Gujarati, the bands start after them */
  const WCW = lang === "gu" ? 190 : 158, CC_WX = WCW + 16, WEND = CC_WX + 13 * CC_WBP - (CC_WBP - CC_WBW);
  const sceneWeeks = () => (
    <g>
      <g pointerEvents="none">
        {/* Shadow under top ruler */}
        {/* the bar is 52 tall (the bands stay at y 60) and the label 36: the English descender, the Hindi i-matra and the Gujarati ink clear both outlines by 4 or more */}
        <rect x={4} y={4} width={866} height={52} rx={12} fill="rgba(0,0,0,0.12)" />
        <rect x={0} y={0} width={866} height={52} rx={12} fill={tint(CC_OLIVE, 0.45)} stroke={CC_INK} strokeWidth={3} />
        <rect x={4} y={4} width={858} height={14} rx={6} fill="#FFFFFF" fillOpacity={0.25} />
        <text x={433} y={lang === "hi" ? 44 : lang === "gu" ? 43 : 35} textAnchor="middle" fontSize={T.speech - 8} fontWeight={700} fill={CC_INK}>{"365 " + tx("days")}</text>
        {/* four bands of 13 weeks; a week is a standing bar 40 wide holding its 7 days, the weeks 8 apart and the bands 16
            apart, so the 13 weeks of a band and the 4 bands can be counted from the back bench; the leftover day is a 56 cell */}
        {[0, 1, 2, 3].map((j) => {
          const y = ccBandY(j), bw = 13 * CC_WBP - (CC_WBP - CC_WBW);
          return j < S.blocks ? (
            <g key={"b" + j}>
              <rect x={0} y={y + CC_WBH / 2 - 24} width={WCW} height={48} rx={10} fill="#FFFFFF" stroke={CC_INK} strokeWidth={2} />
              <text x={WCW / 2} y={y + CC_WBH / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{"13 " + tx("weeks")}</text>
              <rect x={CC_WX + 3} y={y + 4} width={bw} height={CC_WBH} rx={6} fill="rgba(0,0,0,0.1)" />
              {Array.from({ length: 13 }).map((_, w) => {
                const x = CC_WX + w * CC_WBP;
                return (
                  <g key={w}>
                    <rect x={x} y={y} width={CC_WBW} height={CC_WBH} rx={4} fill={tint(CC_OLIVE, 0.5)} stroke={CC_INK} strokeWidth={3} />
                    {[1, 2, 3, 4, 5, 6].map((d) => <line key={d} x1={x + 2} y1={y + (d * CC_WBH) / 7} x2={x + CC_WBW - 2} y2={y + (d * CC_WBH) / 7} stroke={CC_INK} strokeWidth={1.2} />)}
                  </g>
                );
              })}
            </g>
          ) : (
            <rect key={"b" + j} x={CC_WX} y={y} width={bw} height={CC_WBH} rx={6} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="8 8" />
          );
        })}
        {S.left && (
          <g>
            <circle cx={WEND + 48} cy={ccBandY(3) + CC_WBH / 2} r={36} fill="none" stroke={CC_INK} strokeWidth={2.5} strokeDasharray="6 6" />
            <rect x={WEND + 20} y={ccBandY(3) + CC_WBH / 2 - 28} width={56} height={56} rx={4} fill={CC_YEL} stroke={CC_INK} strokeWidth={3.5} />
          </g>
        )}
        {(won || (D && D.cap)) && (
          <g>
            <rect x={260} y={452} width={600} height={60} rx={12} fill="#FFFFFF" stroke={CC_INK} strokeWidth={2.5} />
            <text x={560} y={496} textAnchor="middle" fontSize={T.speech - 4} fontWeight={700} fill={CC_INK}>{"52 " + tx("weeks") + " + 1 " + tx("day")}</text>
          </g>
        )}
      </g>
      {keyEl("weeks", tx("Weeks"), CC_WK, { off: S.blocks >= 4, invite: lockWanted && S.blocks === 0 })}
    </g>
  );
  const sceneSat = () => {
    const nSat = won ? 3 : D ? D.sat : 0;
    const sats = [7, 14, 21].slice(0, nSat);
    return (
      <g>
        {wall(2026, false, 3)}
        {bigPage(2026, 3, { col: nSat ? 6 : undefined, rings: sats, bold: (d: number) => sats.indexOf(d) >= 0 })}
        {(won || (D && D.cap)) && (
          <g pointerEvents="none">
            <rect x={506} y={438} width={280} height={60} rx={12} fill="#FFFFFF" stroke={CC_INK} strokeWidth={2.5} />
            <text x={646} y={480} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={CC_INK}>{"7 → 14 → 21"}</text>
          </g>
        )}
      </g>
    );
  };
  const sceneWarmWall = () => (
    <g>
      {wall(2026, true)}
      {S.open > 0 ? bigPage(2026, S.open) : <rect x={CC_PG.x} y={CC_PG.y} width={7 * CC_PG.cw} height={420} rx={14} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 12" pointerEvents="none" />}
    </g>
  );

  /* phase 2 and free play: the gate */
  const sceneGate = () => {
    const ys = gateYears(), g = gateGeom();
    const single = it.kind === "gate" && ys.length === 1;
    const labels = ["÷ 4?", tx("Century year?"), "÷ 400?"];
    const verdictOn = (j: number) => (S.cols[j] || 0) >= ccGateRows(ys[j]).length && (demo || free || won || (D && D.verdict));
    const febY = single ? ys[0] : 0;
    const grow = single && ccLeap(febY) && (won || (D && D.verdict));
    const kb = free ? { x: 400, y: 420, w: 200, h: 80 } : { x: 276 + (g.span - 200) / 2, y: g.ky, w: 200, h: 72 };
    return (
      <g>
        {free && wall(S.year, false)}
        {free && (
          <g>
            <Key id="year-down" label={tx("Year before")} x={400} y={0} w={86} h={80} C={C} tone="key" onClick={() => turnYear(-1)}>
              <text y={14} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={toneInk("key", C.ink)}>−</text>
            </Key>
            <rect x={498} y={0} width={164} height={80} rx={14} fill="#FFFFFF" stroke={CC_INK} strokeWidth={3} pointerEvents="none" />
            <text x={580} y={58} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK} pointerEvents="none">{S.year}</text>
            <Key id="year-up" label={tx("Year after")} x={674} y={0} w={86} h={80} C={C} tone="key" onClick={() => turnYear(1)}>
              <text y={14} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={toneInk("key", C.ink)}>+</text>
            </Key>
            {/* the delight made readable: the weekday of 1 January moves on one (two after a leap year) as the dial turns */}
            <g pointerEvents="none">
              <text x={620} y={432} fontSize={T.prompt} fontWeight={700} fill={CC_INK}>{tx("1 January") + ":"}</text>
              <rect x={620} y={456} width={276} height={58} rx={12} fill={tint(CC_OLIVE, 0.72)} stroke={CC_INK} strokeWidth={2.5} />
              <text x={758} y={499} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={CC_INK}>{tx(CC_DAYF[ccDow(S.year, 1, 1)])}</text>
            </g>
          </g>
        )}
        <g pointerEvents="none">
          {labels.map((l, r) => (
            <g key={"l" + r}>
              <rect x={g.lx + 2} y={g.rowY(r) + 3} width={g.lw} height={g.rh} rx={12} fill="rgba(0,0,0,0.12)" />
              <rect x={g.lx} y={g.rowY(r)} width={g.lw} height={g.rh} rx={12} fill={CC_INK} />
              <rect x={g.lx + 4} y={g.rowY(r) + 3} width={g.lw - 8} height={14} rx={4} fill="#FFFFFF" fillOpacity={0.15} />
              <text x={g.lx + g.lw / 2} y={g.rowY(r) + g.rh / 2 + g.fs * 0.36} textAnchor="middle" fontSize={g.fs} fontWeight={700} fill="#FFFFFF">{l}</text>
              {r < 2 && <path d={`M ${g.lx + g.lw / 2} ${g.rowY(r) + g.rh + 2} l -9 0 l 9 ${g.rowY(r + 1) - g.rowY(r) - g.rh - 4} l 9 ${-(g.rowY(r + 1) - g.rowY(r) - g.rh - 4)} Z`} fill={CC_INK} />}
            </g>
          ))}
          {ys.map((y, j) => {
            const rows = ccGateRows(y), done = S.cols[j] || 0, x = g.colX(j);
            return (
              <g key={"col" + j}>
                {g.hdr && (
                  <g>
                    <rect x={x + 4} y={22} width={g.cw - 8} height={52} rx={8} fill="#FFFFFF" stroke={CC_INK} strokeWidth={2} />
                    <text x={x + g.cw / 2} y={62} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={CC_INK}>{y}</text>
                  </g>
                )}
                {[0, 1, 2].map((r) => {
                  const asked = r < rows.length, show = asked && r < done, skip = !asked && done >= rows.length;
                  return (
                    <g key={"c" + r}>
                      <rect x={x + 2} y={g.rowY(r) + 3} width={g.cw} height={g.rh} rx={12} fill="rgba(0,0,0,0.08)" />
                      <rect x={x} y={g.rowY(r)} width={g.cw} height={g.rh} rx={12} fill={show ? (rows[r] ? tint(CC_GREEN, 0.75) : "#FFFFFF") : tint(C.panel, 0.4)} stroke={show ? CC_INK : C.rule} strokeWidth={show ? 3 : 2} />
                      {show && <text x={x + g.cw / 2} y={g.rowY(r) + g.rh / 2 + g.fs * 0.36} textAnchor="middle" fontSize={g.fs + 2} fontWeight={700} fill={CC_INK}>{tx(rows[r] ? "Yes" : "No")}</text>}
                      {skip && <line x1={x + g.cw / 2 - 18} y1={g.rowY(r) + g.rh / 2} x2={x + g.cw / 2 + 18} y2={g.rowY(r) + g.rh / 2} stroke={C.dim} strokeWidth={4} strokeLinecap="round" />}
                    </g>
                  );
                })}
                {verdictOn(j) && (
                  <g>
                    <rect x={x + 2} y={g.vy + 3} width={g.cw} height={64} rx={12} fill="rgba(0,0,0,0.1)" />
                    <rect x={x} y={g.vy} width={g.cw} height={64} rx={12} fill={ccLeap(y) ? CC_INK : "#FFFFFF"} stroke={CC_INK} strokeWidth={3} />
                    <text x={x + g.cw / 2} y={g.vy + 42} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ccLeap(y) ? "#FFFFFF" : CC_INK}>{tx(ccLeap(y) ? "Leap year" : "Not leap")}</text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
        {single && ccPage("feb", 500, 0, 54, 54, 30, febY, 2, wd, { title: won || (D && D.verdict) ? mon(2) + " " + febY : mon(2), days: grow ? 29 : 28, grow: grow ? 29 : 0 })}
        {keyEl("run", tx("Run"), kb, { off: !free && !demo && ys.every((y, j) => (S.cols[j] || 0) >= ccGateRows(y).length) })}
      </g>
    );
  };

  /* phase 3: the day counter */
  const sceneCount = () => {
    const e = endsNow();
    const all = ccDays(it, e);
    const nLit = D && D.ends ? S.lit : S.lit >= 999 ? all.length : S.lit;
    const litSet = all.slice(0, nLit).map((d) => d.join("-"));
    const winLast = it.kind === "last" && (won || (D && D.total));
    const run16 = winLast ? (() => { const out: number[][] = []; let a = it.from; for (let i = 0; i < it.days; i++) { out.push(a); a = ccNext(a); } return out; })() : [];
    const lit = (yr: number, m: number) => (d: number) => litSet.indexOf([yr, m, d].join("-")) >= 0 || run16.some((x) => x[1] === m && x[2] === d);
    const outD = (yr: number, m: number) => (d: number) => {
      /* "last" rings nothing: the day after the run (the item's own near miss, 7 April) once read as the answer; the green run ends on it */
      if (it.kind === "last") return false;
      return (nLit > 0 || winLast) && ((e[0] === "out" && it.from[1] === m && it.from[2] === d) || (e[1] === "out" && it.to[1] === m && it.to[2] === d));
    };
    const flag = (m: number) => (d: number) => (it.from[1] === m && it.from[2] === d) || (it.kind !== "last" && it.to[1] === m && it.to[2] === d);
    const parts = ccParts(all);
    const shownPc = D && D.ends ? S.pc : S.pc;
    const toks = parts.map((p: any) => String(p.n));
    let off = 0;
    const total = it.kind === "last" ? String(it.days) : ((demo && S.pc >= 999) || won || (D && D.total)) ? String(all.length) : "?";
    const second = it.kind === "last" ? (winLast ? String(it.answer) : "?") : null;
    const PF = CF, PW = CF * 0.16;                   /* the written subtotals as bold as the printed "Sep", "+ Oct", "= 18" (pencil default 0.1) */
    const swLabel = (v: any) => tx(v === "in" ? "Counts" : v === "out" ? "Left out" : "Not set");
    return (
      <g>
        {ccPage("pa", pgA.x, 0, 48, 52, 32, pgA.yr, pgA.m, wd, { title: mon(pgA.m) + " " + pgA.yr, lit: lit(pgA.yr, pgA.m), out: outD(pgA.yr, pgA.m), flag: flag(pgA.m) })}
        {ccPage("pb", pgB.x, 0, 48, 52, 32, pgB.yr, pgB.m, wd, { title: mon(pgB.m) + " " + pgB.yr, lit: lit(pgB.yr, pgB.m), out: outD(pgB.yr, pgB.m), flag: flag(pgB.m) })}
        <g pointerEvents="none">
          <rect x={2} y={CY - 52} width={708} height={74} rx={12} fill="#FFFFFF" stroke={CC_INK} strokeWidth={2.5} />
          <text x={20} y={CY} fontSize={PF} fontWeight={700} fill={CC_INK}>{tx(CC_ABB[pgA.m - 1])}</text>
          <text x={208} y={CY} fontSize={PF} fontWeight={700} fill={CC_INK}>{"+ " + tx(CC_ABB[pgB.m - 1])}</text>
          {toks.map((t: string, j: number) => {
            const ch = shownPc >= 999 ? t.length : Math.max(0, Math.min(t.length, shownPc - off));
            off += t.length;
            return nLit > 0 || shownPc > 0 ? <PencilText key={"pt" + j} text={t} x={partX[j]} y={CY} size={CF} align="middle" chars={ch} color={CC_INK} width={PW} /> : null;
          })}
          {second !== null && (second === "?" ? <text x={partX[1]} y={CY} textAnchor="middle" fontSize={PF} fontWeight={700} fill={CC_INK}>?</text>
            : <PencilText text={second} x={partX[1]} y={CY} size={CF} align="middle" chars={second.length} color={CC_INK} width={PW} />)}
          <text x={470} y={CY} fontSize={PF} fontWeight={700} fill={CC_INK}>{"= " + total}</text>
        </g>
        <rect x={716} y={0} width={180} height={54} rx={8} fill={tint(C.panel, 0.5)} pointerEvents="none" />
        <text x={724} y={40} fontSize={lang === "hi" ? T.label - 2 : T.label} fontWeight={700} fill={CC_INK} pointerEvents="none">{tx("First day")}</text>
        {keyEl("first", swLabel(e[0]), CC_SW[0], { off: won })}
        <rect x={716} y={154} width={180} height={54} rx={8} fill={tint(C.panel, 0.5)} pointerEvents="none" />
        <text x={724} y={194} fontSize={lang === "hi" ? T.label - 2 : T.label} fontWeight={700} fill={CC_INK} pointerEvents="none">{tx("Last day")}</text>
        {it.kind !== "last" ? keyEl("last", swLabel(e[1]), CC_SW[1], { off: won }) : (
          /* the tournament's last day is what the child finds: its switch stands as a fixed "?" */
          <g pointerEvents="none">
            <rect x={CC_SW[1].x} y={CC_SW[1].y} width={CC_SW[1].w} height={CC_SW[1].h} rx={14} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2.5} strokeDasharray="8 6" />
            <text x={CC_SW[1].x + CC_SW[1].w / 2} y={CC_SW[1].y + 54} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill="#4A4A4A">?</text>
          </g>
        )}
        {keyEl("count", tx("Count"), CC_CK, { off: won || !ready(S.ends) })}
      </g>
    );
  };

  /* phase 4: the date writer */
  const sceneDate = () => {
    const showDemo = D && D.mine && (!typed || typed === D.tv);
    const right = item && item.answer ? item.answer : ["", "", ""];
    let ps: string[] = ["", "", ""];
    if (demo) ps = S.written || S.pc > 0 ? [ccPad(it.d, 2), ccPad(it.m, 2), String(it.y)] : ["", "", ""];
    else if (showDemo) ps = D.right ? right : D.mine;
    else if (won) ps = right;
    else ps = slotPartsOf(typed, 3);
    const chars = [ps[0].slice(0, 2), ps[1].slice(0, 2), ps[2].slice(0, 4)];
    const placeOf = [[0, 1], [2, 3], [4, 5, 6, 7]];
    const lightEmpty = showDemo && !D.right;
    const glow = showDemo && D.right ? [0, 1, 2].map((g) => right[g].length > (D.mine[g] || "").length || (D.mine[g] || "")[0] !== right[g][0]) : [false, false, false];
    const sepNow = CC_SEPS[S.sep];
    const readBack = (p: string[]) => { const d = Number(p[0]), m = Number(p[1]); return d >= 1 && m >= 1 && m <= 12 && d <= 31 && p[2] ? d + " " + mon(m) + " " + p[2] : ""; };
    let wi = 0;
    const warmCh = warmChars();
    const wd2 = demo ? it : item || {};
    return (
      <g>
        <g pointerEvents="none">
          <rect x={154} y={6} width={600} height={104} rx={16} fill="rgba(0,0,0,0.12)" />
          <rect x={150} y={0} width={600} height={104} rx={16} fill={CC_PAGE} stroke={CC_INK} strokeWidth={3} />
          <rect x={154} y={4} width={592} height={10} rx={5} fill={CC_BAND} />
          <text x={450} y={80} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK}>{(wd2.d || "") + " " + (wd2.m ? mon(wd2.m) : "") + " " + (wd2.y || "")}</text>
          {[["Day", 0, 2], ["Month", 2, 4], ["Year", 4, 8]].map(([l, a, b]: any) => (
            <text key={l} x={(CC_PL[a] + CC_PL[b - 1] + CC_PW) / 2} y={176} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{tx(l)}</text>
          ))}
          {CC_PL.map((x, j) => {
            const g = j < 2 ? 0 : j < 4 ? 1 : 2, k = placeOf[g].indexOf(j), c = chars[g][k] || "";
            const emptyLit = lightEmpty && !c && g < 2;
            const glowOn = glow[g] && g < 2 && k === 0 && c === "0";
            return (
              <g key={"p" + j}>
                <rect x={x + 2} y={CC_PY + 3} width={CC_PW} height={CC_PH} rx={10} fill="rgba(0,0,0,0.1)" />
                <rect x={x} y={CC_PY} width={CC_PW} height={CC_PH} rx={10} fill={emptyLit || glowOn ? CC_YEL : "#FFFFFF"} stroke={CC_INK} strokeWidth={emptyLit || glowOn ? 4 : 2.5} />
                {!demo && c && <text x={x + CC_PW / 2} y={DY} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK}>{c}</text>}
              </g>
            );
          })}
          {!demo && CC_SX.map((x, j) => <text key={"s" + j} x={x} y={DY} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK}>{sepNow}</text>)}
          {demo && warmCh.map((ch, j) => {
            const isSep = j === 2 || j === 5;
            const t = isSep && S.written ? sepNow : ch;
            void wi;
            return S.written && isSep ? <text key={"w" + j} x={charX(j)} y={DY} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK}>{t}</text>
              : <PencilText key={"w" + j} text={ch} x={charX(j)} y={DY} size={T.xl} align="middle" chars={S.written ? 1 : S.pc > j ? 1 : 0} />;
          })}
          {showDemo && readBack(D.right ? right : D.mine) && (
            <g>
              <rect x={250} y={400} width={400} height={56} rx={12} fill="#FFFFFF" stroke={CC_INK} strokeWidth={2.5} />
              <text x={450} y={440} textAnchor="middle" fontSize={T.speech - 4} fontWeight={700} fill={CC_INK}>{"= " + readBack(D.right ? right : D.mine)}</text>
            </g>
          )}
          {won && CC_SEPS.map((s, j) => (
            <g key={"f" + j}>
              <rect x={CC_PL[0] + j * 246} y={448} width={232} height={56} rx={10} fill={tint(CC_OLIVE, 0.6)} stroke={CC_INK} strokeWidth={2} />
              <text x={CC_PL[0] + 116 + j * 246} y={488} textAnchor="middle" fontSize={T.label + 4} fontWeight={700} fill={CC_INK}>{right.join(s)}</text>
            </g>
          ))}
        </g>
        {demo && !S.written ? keyEl("write", tx("Write"), CC_MK) : keyEl("sep", tx(CC_SEPN[S.sep]), CC_MK)}
      </g>
    );
  };

  let scene: any = null;
  if (free) scene = sceneGate();
  else if (it.kind === "wall") scene = sceneWarmWall();
  else if (it.kind === "sort") scene = sceneRack();
  else if (it.kind === "weeks") scene = sceneWeeks();
  else if (it.kind === "sat") scene = sceneSat();
  else if (it.kind === "gate") scene = sceneGate();
  else if (isCount) scene = sceneCount();
  else if (it.kind === "date") scene = sceneDate();
  return <g>{scene}</g>;
}
/* the guide steps' warm-ups: never a question's own numbers */
const CC_WARM: any[] = [
  { kind: "wall" },
  { kind: "gate", years: [2024, 1900] },
  { kind: "count", from: [2026, 6, 28], to: [2026, 7, 2], ends: ["in", "in"] },
  { kind: "date", d: 15, m: 8, y: 2026 },
];

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || last.it || {};
  /* a word shows only in the thumbnail's own language: an English word is left out of a hi / gu thumbnail until TR has it */
  const wd = (x: string) => { const t = tx(x); return lang !== "en" && t === x ? "" : t; };
  const v = last.value;
  let lines: string[] = [];
  if (item.kind === "sort") { const p = slotPartsOf(v, 2); lines = [(wd("June") + " " + p[0]).trim(), (wd("August") + " " + p[1]).trim()]; }
  else if (item.kind === "weeks") { const p = slotPartsOf(v, 2); lines = [(p[0] + " " + wd("weeks")).trim(), ("+ " + p[1] + " " + wd("day")).trim()]; }
  else if (item.kind === "sat") lines = [(leadNumber(v) + " " + wd("March")).trim()];
  else if (item.choices) { const c = item.choices.find((c: any) => c.id === String(v)); lines = [c ? wd(c.label) || c.label.replace(/[^0-9 ]/g, "").trim() : ""]; }
  else if (item.kind === "gate") lines = [(wd("February") + " " + leadNumber(v)).trim()];
  else if (item.kind === "count") lines = [(leadNumber(v) + " " + wd("days")).trim()];
  else if (item.kind === "last") lines = [(leadNumber(v) + " " + wd("April")).trim()];
  else if (item.kind === "date") lines = [slotPartsOf(v, 3).join(".")];
  lines = lines.filter(Boolean);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={12} y={10} width={36} height={h - 20} rx={6} fill={CC_PAGE} stroke={CC_INK} strokeWidth={2} />
      <rect x={13} y={11} width={34} height={(h - 20) * 0.3} rx={5} fill={CC_BAND} />
      {lines.map((l, j) => <text key={j} x={60} y={h / 2 + 10 + (j - (lines.length - 1) / 2) * 30} fontSize={T.micro} fontWeight={700} fill={C.ink}>{l}</text>)}
    </g>
  );
}

function CalendarCounter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): the question lives only in the bubble */
      keyOnly: true,
      /* the wide keypad: the whole picture is laid out in x 0 to 900, so it fits beside the open panel */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default CalendarCounter;