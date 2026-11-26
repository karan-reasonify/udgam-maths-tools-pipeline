/* ═══ M2.S4.T7.C25.2D1 · time_line_jumps · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30): every line is printed on the bubble.
   THE NEW LOOK (keyOnly, navDots; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16).
   NO imports in this file; only the five host hooks. Edit, never rewrite. */

const TOOL_ID = "time_line_jumps";
const MEDIA_ID = "M2.S4.T7.C25.2D1";
const TOOL_NAME = "Time Line Jumper";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A time line with a peg for every hour."];
const FINISH_LINE = "You found how long, an end and a start, and you crossed midnight.";
const FREE_LINE = "Free play: from 8:00 a.m., jump forward or back and read the time.";

const START_HOOK = "How long is a trip that starts tonight and ends tomorrow?";

/* ── the chapter's content colours (BRIEF "Stage"): Given deep blue, Answer green, Jump violet, now amber;
   a.m. warm white and p.m. rose on the day band; ink for the line, marks and hands ── */
const TJ_GIVEN = "#0B5CA8", TJ_ANS = "#00795A", TJ_JUMP = "#6B3FA0", TJ_NOW = "#E69F00", TJ_NOW_INK = "#7A4A00";
const TJ_AM = "#FFF4E2", TJ_PM = "#F5CCD7", TJ_INK = "#2B2B2B";
const TJ_DUR = [{ label: "hours" }, { label: "minutes" }];
const TJ_TIME = [{ label: "hour" }, { label: "minutes" }];
/* the working area's rows (keyOnly: 1472 x 520 shut, 900 x 520 open) */
const TJ_KY = 440, TJ_CH = 126;   /* the key row; ONE card height in every language (label 40 over the time at 56) */
/* the band's rows: a slow-clock board keeps room for its two clocks above the line */
const tjRows = (slow: boolean) => { const BT = slow ? 280 : 197; return { BT, BB: BT + 76, BY: BT + 38, CY: BT + 93 }; };

const tjPad = (m: number) => (m < 10 ? "0" : "") + m;
const tjMod = (m: number) => ((m % 1440) + 1440) % 1440;
const tjW = (s: string, size: number) => {
  let n = 0;
  for (const ch of String(s)) n += /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/.test(ch) ? 0 : /[ .,:]/.test(ch) ? 0.3 : /[\u0900-\u0AFF]/.test(ch) ? 0.68 : 0.6;
  return n * size;
};
/* a value as the child or the agent gave it: "1|05|pm", [1, 5, "pm"], "1:05 p.m. the next day" */
function tjParse(v: any) {
  const word = (x: any) => String(x ?? "").toLowerCase();
  let n: string[] = [], rest = "";
  if (Array.isArray(v)) { n = v.slice(0, 2).map((x: any) => String(x ?? "").replace(/[^0-9]/g, "")); rest = v.slice(2).map(word).join(" "); }
  else {
    const s = String(v ?? "");
    if (s.includes("|")) { const a = s.split("|"); n = a.slice(0, 2).map((x) => x.replace(/[^0-9]/g, "")); rest = a.slice(2).map(word).join(" "); }
    else { n = (s.match(/\d+/g) || []).slice(0, 2); rest = word(s); }
  }
  const half = /p\.?\s?m/.test(rest) ? "pm" : /a\.?\s?m/.test(rest) ? "am" : null;
  const day = /next/.test(rest) ? "next" : /same/.test(rest) ? "same" : null;
  return { n: [n[0] ?? "", n[1] ?? ""], half, day };
}

/* the acts each kind of board asks for, in order */
function tjSeq(it: any) {
  if (!it) return [];
  const H = Math.floor((it.d || 0) / 60), M = (it.d || 0) % 60;
  if (it.kind === "long") return ["mark-s", "mark-e"];
  if (it.kind === "end") return [...(H ? ["jump-h"] : []), ...(M ? ["jump-m"] : [])];
  if (it.kind === "start") return [...(H ? ["back-h"] : []), ...(M ? ["back-m"] : []), ...(it.fwd ? ["fwd"] : [])];
  if (it.kind === "slow") return ["gap", "back-m"];
  if (it.kind === "night" || it.kind === "nightEnd") return ["to-mid", "jump-on"];
  return [];
}
const tjLost = (it: any) => (it.rate || 0) * Math.round((it.e - it.s) / 60);
/* the mark the jumps reach (null for a board whose two marks are both given) */
function tjTarget(it: any) {
  if (it.kind === "end" || it.kind === "nightEnd") return it.s + it.d;
  if (it.kind === "start") return it.e - it.d;
  if (it.kind === "slow") return it.e - tjLost(it);
  return null;
}
/* the jumps drawn for the first k acts of a board */
function tjArcs(it: any, acts: string[]) {
  const out: any[] = [];
  const H = Math.floor((it.d || 0) / 60), M = (it.d || 0) % 60;
  let pos = it.kind === "start" ? it.e : it.s;
  for (const on of acts) {
    if (on === "jump-h") { out.push({ a: pos, b: pos + 60 * H, len: 60 * H }); pos += 60 * H; }
    else if (on === "jump-m") { out.push({ a: pos, b: pos + M, len: M }); pos += M; }
    else if (on === "back-h" && it.kind === "start") { out.push({ a: pos, b: pos - 60 * H, len: 60 * H }); pos -= 60 * H; }
    else if (on === "back-m" && it.kind === "start") { out.push({ a: pos, b: pos - M, len: M }); pos -= M; }
    else if (on === "back-m" && it.kind === "slow") out.push({ a: it.e, b: it.e - tjLost(it), len: tjLost(it) });
    else if (on === "fwd") out.push({ a: it.e - it.d, b: it.e, len: it.d, fwd: true });
    else if (on === "to-mid") out.push({ a: it.s, b: 1440, len: 1440 - it.s });
    else if (on === "jump-on") { const end = it.kind === "night" ? it.e : it.s + it.d; out.push({ a: 1440, b: end, len: end - 1440 }); }
  }
  return out;
}

/* one plain clock: an ivory face in a wooden case (the `clock` skin), numerals, ticks and hands in near-black */
function TjClock({ cx, cy, r, hh, mm, show }: any) {
  const pt = (deg: number, rr: number) => [cx + rr * Math.sin((deg * Math.PI) / 180), cy - rr * Math.cos((deg * Math.PI) / 180)];
  const ha = ((hh % 12) + mm / 60) * 30, ma = mm * 6;
  const [hx, hy] = pt(ha, r * 0.24), [mx, my] = pt(ma, r * 0.32);   /* both hands stop short of the numerals */
  return (
    <g>
      <circle cx={cx} cy={cy} r={r - 4} fill="#8B4513" filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.15))" />
      <circle cx={cx} cy={cy} r={r - 10} fill="#FFFBF2" stroke="#63310C" strokeWidth={4} />
      <Skin name="clock" x={cx - r} y={cy - r} w={2 * r} h={2 * r} />
      {Array.from({ length: 12 }, (_, k) => {
        const [x1, y1] = pt(k * 30, r * 0.69), [x2, y2] = pt(k * 30, r * 0.77);
        return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={TJ_INK} strokeWidth={k % 3 ? 2.5 : 4.5} strokeLinecap="round" />;
      })}
      {[[12, 0], [3, 90], [6, 180], [9, 270]].map(([v, deg]) => {
        const [x, y] = pt(deg, r * 0.5);
        return <text key={v} x={x} y={y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TJ_INK}>{v}</text>;
      })}
      {show ? (
        <g>
          <line x1={cx + 1} y1={cy + 2} x2={hx + 1} y2={hy + 2} stroke="rgba(0,0,0,0.2)" strokeWidth={8} strokeLinecap="round" />
          <line x1={cx + 1} y1={cy + 2} x2={mx + 1} y2={my + 2} stroke="rgba(0,0,0,0.2)" strokeWidth={5} strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={hx} y2={hy} stroke={TJ_INK} strokeWidth={8} strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={mx} y2={my} stroke={TJ_INK} strokeWidth={5} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={8} fill={TJ_INK} stroke="#FFFFFF" strokeWidth={2} />
        </g>
      ) : <text x={cx} y={cy + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={TJ_NOW_INK}>?</text>}
    </g>
  );
}

/* a picture control of this tool (a time card, the a.m. / p.m. card, the day card): a labelled 72+ finger box */
function TjPick({ id, x, y, w, h, on, fill, stroke, label, onPick, disabled, children }: any) {
  const p = usePress(onPick || (() => {}), !disabled);
  return (
    <g className={"c4-ctl" + (disabled ? " is-off" : "") + (p.down ? " is-down" : "")} data-control={id} role="button" aria-label={label}
      aria-pressed={on ? "true" : "false"} aria-disabled={disabled ? "true" : undefined} tabIndex={disabled ? -1 : 0}
      {...(disabled ? {} : p.bind())} onKeyDown={p.keys} style={{ cursor: disabled ? "default" : "pointer" } as any}>
      <rect x={x} y={y + 3} width={w} height={h} rx={18} fill="none" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.08))" />
      <rect x={x} y={y} width={w} height={h} rx={18} fill={fill} stroke={stroke || (on ? TJ_INK : "#B9A98F")} strokeWidth={on ? 6 : 3} />
      <rect x={x + 4} y={y + 4} width={w - 8} height={Math.max(12, h / 3)} rx={14} fill="url(#tj-top-light)" pointerEvents="none" />
      {children}
    </g>
  );
}

function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const x0 = 300, x1 = box.w - 30, h0 = 8, h1 = 16, by = 210;
  const X = (m: number) => x0 + ((m - h0 * 60) / ((h1 - h0) * 60)) * (x1 - x0);
  const lab = (h: number) => (h === 12 ? tx("noon") : String(h % 12));
  const arc = (a: number, b: number, k: number) => `M ${X(a)} ${by - 34} Q ${(X(a) + X(b)) / 2} ${by - 34 - 2 * k} ${X(b)} ${by - 34}`;
  return (
    <g>
      <TjClock cx={130} cy={170} r={125} hh={10} mm={10} show />
      {Array.from({ length: h1 - h0 }, (_, k) => (
        <rect key={k} x={X((h0 + k) * 60)} y={by - 34} width={X(60) - X(0)} height={68} fill={h0 + k < 12 ? TJ_AM : TJ_PM} />
      ))}
      <rect x={x0} y={by - 34} width={x1 - x0} height={68} rx={14} fill="none" stroke={TJ_INK} strokeWidth={3} />
      {Array.from({ length: h1 - h0 + 1 }, (_, k) => (k === 0 || k === h1 - h0 ? null :
        <text key={k} x={X((h0 + k) * 60)} y={by + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TJ_INK}>{lab(h0 + k)}</text>
      ))}
      <path d={arc(9 * 60 + 15, 11 * 60 + 15, 60)} fill="none" stroke={TJ_JUMP} strokeWidth={6} strokeLinecap="round" />
      <path d={arc(11 * 60 + 15, 14 * 60, 70)} fill="none" stroke={TJ_JUMP} strokeWidth={6} strokeLinecap="round" />
      <text x={(X(9 * 60 + 15) + X(11 * 60 + 15)) / 2} y={by - 104} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TJ_JUMP}>{tx("Jump")}</text>
      <text x={(X(11 * 60 + 15) + X(14 * 60)) / 2} y={by - 124} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TJ_JUMP}>{tx("Jump")}</text>
      <text x={x0} y={by + 92} fontSize={T.label} fontWeight={600} fill={TJ_INK}>{tx("a.m.")}</text>
      <text x={X(12 * 60) + 70} y={by + 92} fontSize={T.label} fontWeight={600} fill={TJ_INK}>{tx("p.m.")}</text>
    </g>
  );
}

const TR: any = {
  hi: {
    "Time Line Jumper": "समय रेखा पर छलाँग",
    "Free play: from 8:00 a.m., jump forward or back and read the time.": "मुक्त खेल: 8:00 पूर्वाह्न से आगे या पीछे छलाँग लगाओ और समय पढ़ो।",
    "How long is a trip that starts tonight and ends tomorrow?": "आज रात शुरू होकर कल खत्म होने वाली यात्रा कितनी लंबी है?",
    "You found how long, an end and a start, and you crossed midnight.": "तुमने कितनी देर, अंत और शुरुआत खोजी, और मध्यरात्रि पार की।",
    "A time line with a peg for every hour.": "हर घंटे के निशान वाली एक समय रेखा।",
    "hours": "घंटे",
    "h": "घंटे",
    "minutes": "मिनट",
    "min": "मिनट",
    "hour": "घंटा",
    "How long, through the 24-hour clock": "कितनी देर, 24 घंटे की घड़ी से",
    "Tap the Start card to see its time after midnight.": "शुरू कार्ड पर टैप करो, मध्यरात्रि के बाद का समय देखो।",
    "The Start card is the blue card on the left.": "शुरू कार्ड बाईं ओर का नीला कार्ड है।",
    "Now tap the End card to see its time after midnight.": "अब अंत कार्ड पर टैप करो, उसका मध्यरात्रि के बाद का समय देखो।",
    "Tap the blue End card on the right.": "दाईं ओर के नीले अंत कार्ड पर टैप करो।",
    "A clock time is a length after midnight, so you can take one from the other.": "घड़ी का समय मध्यरात्रि के बाद की लंबाई है, इसलिए एक को दूसरे से घटा सकते हो।",
    "You learned: take the earlier time after midnight from the later one.": "तुमने सीखा: मध्यरात्रि के बाद के बड़े समय से छोटा समय घटाओ।",
    "From 8:20 a.m., how long is it to 1:35 p.m.?": "कितनी देर है, 8:20 पूर्वाह्न से 1:35 अपराह्न तक?",
    "8:20 a.m. to 1:35 p.m.?": "8:20 पूर्वाह्न से 1:35 अपराह्न?",
    "After noon, add 12 to the hours to get the time after midnight.": "दोपहर के बाद, मध्यरात्रि के बाद का समय पाने के लिए घंटों में 12 जोड़ो।",
    "Yes, 5 h 15 min passes from 8:20 a.m., to 1:35 p.m.": "हाँ, 8:20 पूर्वाह्न से 1:35 अपराह्न तक 5 घंटे 15 मिनट होते हैं।",
    "Starting at 9:10 a.m., how long is it until 11:40 a.m.?": "कितनी देर है, 9:10 पूर्वाह्न से 11:40 पूर्वाह्न तक?",
    "9:10 a.m. to 11:40 a.m.?": "9:10 पूर्वाह्न से 11:40 पूर्वाह्न?",
    "Both are morning times, so take 9 h 10 min away from 11 h 40 min.": "दोनों पूर्वाह्न के समय हैं, तो बड़े समय में से छोटा समय घटाओ।",
    "Yes, that is 2 h 30 min.": "हाँ, यह 2 घंटे 30 मिनट है।",
    "A trip starts at 10:25 a.m., and ends at 3:05 p.m., so how long is it?": "यात्रा 10:25 पूर्वाह्न पर शुरू, 3:05 अपराह्न पर खत्म, तो कितनी देर की है?",
    "10:25 a.m. to 3:05 p.m.?": "10:25 पूर्वाह्न से 3:05 अपराह्न?",
    "15 h 5 min after midnight is the time 3:05 p.m.": "मध्यरात्रि के 15 घंटे 5 मिनट बाद का समय 3:05 अपराह्न है।",
    "Jumps to an end time": "अंत समय तक छलाँगें",
    "Tap Jump to jump the whole hours first.": "पहले पूरे घंटों की छलाँग के लिए छलाँग पर टैप करो।",
    "The Jump key is under the line.": "छलाँग वाली कुंजी रेखा के नीचे है।",
    "Tap Jump again to jump the minutes.": "मिनटों की छलाँग के लिए फिर से छलाँग पर टैप करो।",
    "Now the minutes, with the same key.": "अब मिनट, उसी कुंजी से।",
    "An end time is found by jumping the hours first, then the minutes.": "अंत समय पहले घंटों की, फिर मिनटों की छलाँग से मिलता है।",
    "You learned: jump the hours first, then the minutes, to find an end.": "तुमने सीखा: अंत के लिए पहले घंटे, फिर मिनट की छलाँग लगाओ।",
    "At 11:10 a.m., a puppet show starts and lasts 1 h 55 min, so when does it end?": "11:10 पूर्वाह्न पर कठपुतली शो शुरू होकर 1 घंटा 55 मिनट चलता है, कब खत्म होगा?",
    "Show ends at?": "शो कब खत्म?",
    "Read the time at the mark where the minute jump lands.": "जहाँ मिनट की छलाँग रुकती है, उस निशान का समय पढ़ो।",
    "Yes, the show is over at 1:05 p.m.": "हाँ, शो 1:05 अपराह्न पर खत्म होता है।",
    "What time is it 2 h after 1:20 p.m.?": "1:20 अपराह्न के 2 घंटे बाद क्या समय होगा?",
    "2 h after 1:20 p.m.?": "1:20 अपराह्न के 2 घंटे बाद?",
    "A jump of whole hours moves only the hour.": "पूरे घंटों की छलाँग केवल घंटा बदलती है।",
    "Yes, it is 3:20 p.m., 2 h after 1:20 p.m.": "हाँ, 1:20 अपराह्न के 2 घंटे बाद 3:20 अपराह्न है।",
    "A show starts at 4:50 p.m., and runs 2 h 35 min, so what time is it over?": "शो 4:50 अपराह्न पर शुरू हुआ और 2 घंटे 35 मिनट चला, तो कितने बजे खत्म हुआ?",
    "Show over at?": "शो कब पूरा?",
    "50 min and 35 min pass the next hour mark.": "50 मिनट और 35 मिनट अगले घंटे के निशान को पार कर जाते हैं।",
    "Working back to a start": "पीछे जाकर शुरुआत तक",
    "Tap Back to jump the whole hours back from the end.": "अंत से पूरे घंटे पीछे जाने के लिए पीछे पर टैप करो।",
    "The Back key is under the line.": "पीछे वाली कुंजी रेखा के नीचे है।",
    "Tap Back again to jump the minutes back.": "मिनट पीछे जाने के लिए फिर से पीछे पर टैप करो।",
    "The minutes go back with the same key.": "मिनट भी उसी कुंजी से पीछे जाते हैं।",
    "Tap Check to jump forward and land on the end.": "आगे छलाँग लगाकर अंत पर पहुँचने के लिए जाँचो पर टैप करो।",
    "Tap Check to test the start you found.": "तुम्हारी खोजी शुरुआत परखने के लिए जाँचो पर टैप करो।",
    "A start is found by jumping back, and a slow clock shows an earlier time.": "शुरुआत पीछे छलाँग से मिलती है, और धीमी घड़ी पहले का समय दिखाती है।",
    "You learned: jump back to find a start; a slow clock is behind.": "तुमने सीखा: शुरुआत के लिए पीछे जाओ; धीमी घड़ी पीछे रहती है।",
    "A show lasts 2 h 25 min and ends at 9:50 p.m., so when did it start?": "एक शो 9:50 अपराह्न पर खत्म हुआ, वह 2 घंटे 25 मिनट चला, कब शुरू हुआ?",
    "Show began at?": "शो कब शुरू?",
    "A start comes before its end, so jump back, not forward.": "शुरुआत अंत से पहले आती है, तो पीछे छलाँग लगाओ, आगे नहीं।",
    "Yes, at 7:25 p.m., it started, and 2 h 25 min later it is 9:50 p.m.": "हाँ, 7:25 अपराह्न पर शुरू हुआ, और 2 घंटे 25 मिनट बाद 9:50 अपराह्न है।",
    "A film ends at 8:25 p.m., after 1 h 30 min, so what time did it begin?": "फ़िल्म 8:25 अपराह्न पर खत्म हुई, वह 1 घंटा 30 मिनट चली, कब शुरू हुई?",
    "Film began at?": "फ़िल्म कब शुरू?",
    "Going back 30 min from 25 past the hour crosses the hour mark.": "घंटे के 25 मिनट बाद से 30 मिनट पीछे जाने पर घंटे का निशान पार होता है।",
    "Yes, the film began at 6:55 p.m.": "हाँ, फ़िल्म 6:55 अपराह्न पर शुरू हुई।",
    "A clock loses 3 min an hour from 7:00 a.m., so what does it show at 11:00 a.m.?": "हर घंटे 3 मिनट पिछड़ने वाली घड़ी 7:00 से 11:00 पूर्वाह्न तक चलकर क्या दिखाएगी?",
    "Slow clock shows?": "धीमी घड़ी क्या दिखाए?",
    "A slow clock is behind the true time, never ahead.": "धीमी घड़ी सही समय से पीछे रहती है, कभी आगे नहीं।",
    "Past midnight": "मध्यरात्रि के पार",
    "Tap To midnight to jump to 12 midnight first.": "पहले रात 12 बजे तक छलाँग के लिए मध्यरात्रि तक पर टैप करो।",
    "The key under the line jumps to midnight.": "रेखा के नीचे की कुंजी मध्यरात्रि तक छलाँग लगाती है।",
    "Now tap Jump on to go into the next day.": "अब अगले दिन में जाने के लिए आगे छलाँग पर टैप करो।",
    "Tap Jump on to cross 12 midnight.": "रात 12 बजे को पार करने के लिए आगे छलाँग पर टैप करो।",
    "A trip past 12 midnight jumps to midnight first and ends on the next day.": "रात 12 के पार की यात्रा पहले मध्यरात्रि तक जाती है और अगले दिन खत्म होती है।",
    "You learned: jump to midnight first, then on into the next day.": "तुमने सीखा: पहले मध्यरात्रि तक, फिर अगले दिन में छलाँग लगाओ।",
    "At 10:20 p.m., a ferry leaves, and at 4:35 a.m., it lands, so how long is it?": "रात की नाव 10:20 अपराह्न पर चली, और 4:35 पूर्वाह्न पर पहुँची, कितनी देर लगी?",
    "Ferry journey?": "नाव की यात्रा?",
    "Do not take one time from the other; go through 12 midnight.": "एक समय को दूसरे से मत घटाओ; रात 12 बजे से होकर जाओ।",
    "Yes, 6 h 15 min in all.": "हाँ, कुल 6 घंटे 15 मिनट।",
    "What time is it 30 min after 11:50 p.m., and on which day?": "11:50 अपराह्न के 30 मिनट बाद क्या समय होगा, और किस दिन?",
    "30 min after 11:50 p.m.?": "11:50 अपराह्न के 30 मिनट बाद?",
    "First find how long it is to 12 midnight from 11:50 p.m.": "पहले पता करो कि 11:50 अपराह्न से रात 12 बजे तक कितनी देर है।",
    "Yes, it is the next day at 12:20 a.m.": "हाँ, 12:20 पूर्वाह्न है, अगले दिन।",
    "A 3 h 55 min flight leaves at 11:20 p.m., so when and on which day does it land?": "उड़ान 11:20 अपराह्न पर चली, और 3 घंटे 55 मिनट उड़ी, कब और किस दिन उतरेगी?",
    "Flight lands at?": "उड़ान कब उतरे?",
    "Part of the flight is before 12 midnight and the rest is after it.": "उड़ान का कुछ हिस्सा रात 12 से पहले है और बाकी उसके बाद।",
    "How long after midnight is each time? Now take one from the other.": "हर समय मध्यरात्रि के कितनी देर बाद है? अब एक को दूसरे से घटाओ।",
    "Read both times as hours after midnight, as the cards show.": "दोनों समय मध्यरात्रि के बाद के घंटों में पढ़ो, जैसे कार्ड दिखाते हैं।",
    "Take minutes from minutes first, then hours from hours.": "पहले मिनट में से मिनट, फिर घंटों में से घंटे घटाओ।",
    "5 min is too few to take 25 min from, so change 1 h into 60 min.": "5 मिनट में से 25 मिनट नहीं घटते, तो 1 घंटे को 60 मिनट बनाओ।",
    "15 h 5 min is the same as 14 h 65 min.": "15 घंटे 5 मिनट वही है जो 14 घंटे 65 मिनट।",
    "Jump the whole hours first. Then how many minutes are left to jump?": "पहले पूरे घंटों की छलाँग लगाओ। फिर कितने मिनट बचे?",
    "Jump the whole hours, then add the minutes to the minutes.": "पूरे घंटों की छलाँग लगाओ, फिर मिनटों में मिनट जोड़ो।",
    "When the minutes pass 60, move on 1 hour and keep the rest.": "मिनट 60 से ऊपर जाएँ तो 1 घंटा आगे बढ़ो और बाकी रखो।",
    "Which way do you jump to find a start? Check by jumping forward.": "शुरुआत खोजने के लिए किस ओर छलाँग लगाओगे? आगे छलाँग से जाँचो।",
    "Jump back the hours first, then the minutes.": "पहले घंटे पीछे जाओ, फिर मिनट।",
    "Check it by jumping forward from your start to land on the end.": "अपनी शुरुआत से आगे छलाँग लगाकर अंत पर पहुँचो और जाँचो।",
    "It loses 3 min in each hour from 7:00 a.m., to 11:00 a.m.": "7:00 से 11:00 पूर्वाह्न तक यह हर घंटे 3 मिनट खोती है।",
    "Find how many minutes it is behind, then jump back from 11:00 a.m.": "पता करो यह कितने मिनट पीछे है, फिर 11:00 पूर्वाह्न से पीछे छलाँग लगाओ।",
    "Stop at midnight first. What day is it after that?": "पहले मध्यरात्रि पर रुको। उसके बाद कौन-सा दिन है?",
    "Read the length written on each jump.": "हर छलाँग पर लिखी लंबाई पढ़ो।",
    "Add the two jumps: hours to hours, minutes to minutes.": "दोनों छलाँगें जोड़ो: घंटे से घंटे, मिनट से मिनट।",
    "What does a clock read just after 12 midnight, and on which day?": "रात 12 के ठीक बाद घड़ी क्या दिखाती है, और किस दिन?",
    "Take the 10 min to midnight off the 30 min.": "30 मिनट में से मध्यरात्रि तक के 10 मिनट घटाओ।",
    "How much of the 3 h 55 min is left after the jump to midnight?": "मध्यरात्रि तक की छलाँग के बाद 3 घंटे 55 मिनट में से कितना बचा?",
    "Take 40 min off 3 h 55 min, then count that on from 12 midnight.": "3 घंटे 55 मिनट में से 40 मिनट घटाओ, फिर रात 12 से उतना आगे गिनो।",
    "noon": "दोपहर",
    "Jump": "छलाँग",
    "a.m.": "पूर्वाह्न",
    "p.m.": "अपराह्न",
    "midnight": "मध्यरात्रि",
    "Now tap the other card to see its time after midnight.": "अब दूसरा कार्ड भी टैप करो।",
    "Back": "पीछे",
    "Pick the half of the day on the card, then press Enter.": "कार्ड पर दिन का हिस्सा चुनो, फिर दर्ज करें दबाओ।",
    "Tap the same day or the next day, then press Enter.": "उसी दिन या अगले दिन पर टैप करो, फिर दर्ज करें दबाओ।",
    "Start": "शुरू",
    "Now": "अभी",
    "End": "अंत",
    "Set right": "ठीक मिलाई",
    "True time": "सही समय",
    "Slow clock": "धीमी घड़ी",
    "Your answer": "तुम्हारा उत्तर",
    "Check": "जाँचो",
    "Find the gap": "अंतर खोजो",
    "To midnight": "मध्यरात्रि तक",
    "Jump on": "आगे छलाँग",
    "after 12 noon": "दोपहर 12 के बाद",
    "after 12 midnight": "रात 12 के बाद",
    "before 12 noon": "दोपहर 12 से पहले",
    "the next day": "अगला दिन",
    "after midnight": "मध्यरात्रि के बाद",
    "How long": "कितनी देर",
    "same day": "उसी दिन",
    "next day": "अगला दिन",
    "First tap the Start card and the End card.": "पहले शुरू कार्ड और अंत कार्ड पर टैप करो।",
    "First make the jumps with the key under the line.": "पहले रेखा के नीचे वाली कुंजी से छलाँगें लगाओ।",
    "This line starts at 12 midnight, so jump forward.": "यह रेखा रात 12 बजे से शुरू होती है, तो आगे छलाँग लगाओ।",
    "This line ends here, so jump back.": "यह रेखा यहीं खत्म होती है, तो पीछे छलाँग लगाओ।",
    "First use the key beside the clocks.": "पहले घड़ियों के पास वाली कुंजी दबाओ।",
    "2 days later": "2 दिन बाद",
  },
  gu: {
    "Time Line Jumper": "સમય રેખા પર કૂદકો",
    "Free play: from 8:00 a.m., jump forward or back and read the time.": "મુક્ત રમત: 8:00 પૂર્વાહ્નથી આગળ કે પાછળ કૂદકો મારો અને સમય વાંચો.",
    "How long is a trip that starts tonight and ends tomorrow?": "આજે રાત્રે શરૂ થઈ કાલે પૂરી થતી યાત્રા કેટલી લાંબી છે?",
    "You found how long, an end and a start, and you crossed midnight.": "તમે કેટલો સમય, અંત અને શરૂઆત શોધી, અને મધ્યરાત્રિ પાર કરી.",
    "A time line with a peg for every hour.": "દરેક કલાકના નિશાનવાળી એક સમય રેખા.",
    "hours": "કલાક",
    "h": "કલાક",
    "minutes": "મિનિટ",
    "min": "મિનિટ",
    "hour": "કલાક",
    "How long, through the 24-hour clock": "કેટલો સમય, 24 કલાકની ઘડિયાળથી",
    "Tap the Start card to see its time after midnight.": "શરૂઆત કાર્ડ પર ટૅપ કરો, મધ્યરાત્રિ પછીનો સમય જુઓ.",
    "The Start card is the blue card on the left.": "શરૂઆત કાર્ડ ડાબી બાજુનું વાદળી કાર્ડ છે.",
    "Now tap the End card to see its time after midnight.": "હવે અંત કાર્ડ પર ટૅપ કરો, તેનો મધ્યરાત્રિ પછીનો સમય જુઓ.",
    "Tap the blue End card on the right.": "જમણી બાજુના વાદળી અંત કાર્ડ પર ટૅપ કરો.",
    "A clock time is a length after midnight, so you can take one from the other.": "ઘડિયાળનો સમય મધ્યરાત્રિ પછીની લંબાઈ છે, તેથી એકને બીજામાંથી બાદ કરી શકો.",
    "You learned: take the earlier time after midnight from the later one.": "તમે શીખ્યા: મધ્યરાત્રિ પછીના મોટા સમયમાંથી નાનો સમય બાદ કરો.",
    "From 8:20 a.m., how long is it to 1:35 p.m.?": "કેટલો સમય છે, 8:20 પૂર્વાહ્નથી શરૂ થઈ 1:35 અપરાહ્ન સુધી?",
    "8:20 a.m. to 1:35 p.m.?": "8:20 પૂર્વાહ્નથી 1:35 અપરાહ્ન?",
    "After noon, add 12 to the hours to get the time after midnight.": "બપોર પછી, મધ્યરાત્રિ પછીનો સમય મેળવવા કલાકમાં 12 ઉમેરો.",
    "Yes, 5 h 15 min passes from 8:20 a.m., to 1:35 p.m.": "હા, 8:20 પૂર્વાહ્નથી 1:35 અપરાહ્ન સુધી 5 કલાક 15 મિનિટ થાય છે.",
    "Starting at 9:10 a.m., how long is it until 11:40 a.m.?": "કેટલો સમય છે, 9:10 પૂર્વાહ્નથી 11:40 પૂર્વાહ્ન સુધી?",
    "9:10 a.m. to 11:40 a.m.?": "9:10 પૂર્વાહ્નથી 11:40 પૂર્વાહ્ન?",
    "Both are morning times, so take 9 h 10 min away from 11 h 40 min.": "બંને પૂર્વાહ્નના સમય છે, તો મોટા સમયમાંથી નાનો સમય બાદ કરો.",
    "Yes, that is 2 h 30 min.": "હા, તે 2 કલાક 30 મિનિટ છે.",
    "A trip starts at 10:25 a.m., and ends at 3:05 p.m., so how long is it?": "યાત્રા 10:25 પૂર્વાહ્ને શરૂ થઈ, 3:05 અપરાહ્ને પૂરી થઈ, તો કેટલા સમયની છે?",
    "10:25 a.m. to 3:05 p.m.?": "10:25 પૂર્વાહ્નથી 3:05 અપરાહ્ન?",
    "15 h 5 min after midnight is the time 3:05 p.m.": "3:05 અપરાહ્ન મધ્યરાત્રિ પછીના 15 કલાક 5 મિનિટનો સમય છે.",
    "Jumps to an end time": "અંત સમય સુધી કૂદકા",
    "Tap Jump to jump the whole hours first.": "પહેલાં પૂરા કલાકોના કૂદકા માટે કૂદકો પર ટૅપ કરો.",
    "The Jump key is under the line.": "કૂદકો બટન રેખાની નીચે છે.",
    "Tap Jump again to jump the minutes.": "મિનિટોના કૂદકા માટે ફરી કૂદકો પર ટૅપ કરો.",
    "Now the minutes, with the same key.": "હવે મિનિટ, એ જ બટનથી.",
    "An end time is found by jumping the hours first, then the minutes.": "અંત સમય પહેલાં કલાકોના, પછી મિનિટોના કૂદકાથી મળે છે.",
    "You learned: jump the hours first, then the minutes, to find an end.": "તમે શીખ્યા: અંત માટે પહેલાં કલાક, પછી મિનિટનો કૂદકો મારો.",
    "At 11:10 a.m., a puppet show starts and lasts 1 h 55 min, so when does it end?": "11:10 પૂર્વાહ્ને કઠપૂતળી શો શરૂ થઈ 1 કલાક 55 મિનિટ ચાલે છે, ક્યારે પૂરો થશે?",
    "Show ends at?": "શો ક્યારે પૂરો?",
    "Read the time at the mark where the minute jump lands.": "જ્યાં મિનિટનો કૂદકો અટકે છે, તે નિશાનનો સમય વાંચો.",
    "Yes, the show is over at 1:05 p.m.": "હા, શો 1:05 અપરાહ્ને પૂરો થાય છે.",
    "What time is it 2 h after 1:20 p.m.?": "1:20 અપરાહ્નના 2 કલાક પછી કેટલો સમય થશે?",
    "2 h after 1:20 p.m.?": "1:20 અપરાહ્નના 2 કલાક પછી?",
    "A jump of whole hours moves only the hour.": "પૂરા કલાકોનો કૂદકો ફક્ત કલાક બદલે છે.",
    "Yes, it is 3:20 p.m., 2 h after 1:20 p.m.": "હા, 1:20 અપરાહ્નના 2 કલાક પછી 3:20 અપરાહ્ન છે.",
    "A show starts at 4:50 p.m., and runs 2 h 35 min, so what time is it over?": "શો 4:50 અપરાહ્ને શરૂ થયો, અને 2 કલાક 35 મિનિટ ચાલ્યો, ક્યારે પૂરો થયો?",
    "Show over at?": "શો કેટલા વાગ્યે પૂરો?",
    "50 min and 35 min pass the next hour mark.": "50 મિનિટ અને 35 મિનિટ આગલા કલાકનું નિશાન પાર કરી જાય છે.",
    "Working back to a start": "પાછળ જઈને શરૂઆત સુધી",
    "Tap Back to jump the whole hours back from the end.": "અંતથી પૂરા કલાક પાછળ જવા માટે પાછળ પર ટૅપ કરો.",
    "The Back key is under the line.": "પાછળ બટન રેખાની નીચે છે.",
    "Tap Back again to jump the minutes back.": "મિનિટ પાછળ જવા માટે ફરી પાછળ પર ટૅપ કરો.",
    "The minutes go back with the same key.": "મિનિટ પણ એ જ બટનથી પાછળ જાય છે.",
    "Tap Check to jump forward and land on the end.": "આગળ કૂદકો મારી અંત પર પહોંચવા માટે ચકાસો પર ટૅપ કરો.",
    "Tap Check to test the start you found.": "તમે શોધેલી શરૂઆત ચકાસવા માટે ચકાસો પર ટૅપ કરો.",
    "A start is found by jumping back, and a slow clock shows an earlier time.": "શરૂઆત પાછળ કૂદકાથી મળે છે, અને ધીમી ઘડિયાળ વહેલો સમય બતાવે છે.",
    "You learned: jump back to find a start; a slow clock is behind.": "તમે શીખ્યા: શરૂઆત માટે પાછળ જાઓ; ધીમી ઘડિયાળ પાછળ રહે છે.",
    "A show lasts 2 h 25 min and ends at 9:50 p.m., so when did it start?": "એક શો 9:50 અપરાહ્ને પૂરો થયો, તે 2 કલાક 25 મિનિટ ચાલ્યો, ક્યારે શરૂ થયો?",
    "Show began at?": "શો ક્યારે શરૂ?",
    "A start comes before its end, so jump back, not forward.": "શરૂઆત અંત પહેલાં આવે છે, તો પાછળ કૂદકો મારો, આગળ નહીં.",
    "Yes, at 7:25 p.m., it started, and 2 h 25 min later it is 9:50 p.m.": "હા, 7:25 અપરાહ્ને શરૂ થયો, અને 2 કલાક 25 મિનિટ પછી 9:50 અપરાહ્ન છે.",
    "A film ends at 8:25 p.m., after 1 h 30 min, so what time did it begin?": "ફિલ્મ 8:25 અપરાહ્ને પૂરી થઈ, તે 1 કલાક 30 મિનિટ ચાલી, ક્યારે શરૂ થઈ?",
    "Film began at?": "ફિલ્મ ક્યારે શરૂ?",
    "Going back 30 min from 25 past the hour crosses the hour mark.": "કલાકની 25 મિનિટ પછીથી 30 મિનિટ પાછળ જતાં કલાકનું નિશાન પાર થાય છે.",
    "Yes, the film began at 6:55 p.m.": "હા, ફિલ્મ 6:55 અપરાહ્ને શરૂ થઈ.",
    "A clock loses 3 min an hour from 7:00 a.m., so what does it show at 11:00 a.m.?": "દર કલાકે 3 મિનિટ પાછળ પડતી ઘડિયાળ 7:00 પૂર્વાહ્નથી 11:00 પૂર્વાહ્ને શું બતાવે?",
    "Slow clock shows?": "ધીમી ઘડિયાળ શું બતાવે?",
    "A slow clock is behind the true time, never ahead.": "ધીમી ઘડિયાળ સાચા સમયથી પાછળ રહે છે, ક્યારેય આગળ નહીં.",
    "Past midnight": "મધ્યરાત્રિની પાર",
    "Tap To midnight to jump to 12 midnight first.": "પહેલાં રાત્રે 12 સુધી કૂદકા માટે મધ્યરાત્રિ સુધી પર ટૅપ કરો.",
    "The key under the line jumps to midnight.": "રેખા નીચેનું બટન મધ્યરાત્રિ સુધી કૂદકો મારે છે.",
    "Now tap Jump on to go into the next day.": "હવે બીજા દિવસમાં જવા માટે આગળ કૂદકો પર ટૅપ કરો.",
    "Tap Jump on to cross 12 midnight.": "રાત્રે 12 વાગ્યાને પાર કરવા આગળ કૂદકો પર ટૅપ કરો.",
    "A trip past 12 midnight jumps to midnight first and ends on the next day.": "રાત્રે 12 પાર કરતી યાત્રા પહેલાં મધ્યરાત્રિ સુધી જઈ બીજા દિવસે પૂરી થાય છે.",
    "You learned: jump to midnight first, then on into the next day.": "તમે શીખ્યા: પહેલાં મધ્યરાત્રિ સુધી, પછી બીજા દિવસમાં કૂદકો મારો.",
    "At 10:20 p.m., a ferry leaves, and at 4:35 a.m., it lands, so how long is it?": "રાતની હોડી 10:20 અપરાહ્ને ઊપડી, 4:35 પૂર્વાહ્ને પહોંચી, કેટલો સમય થયો?",
    "Ferry journey?": "હોડીની યાત્રા?",
    "Do not take one time from the other; go through 12 midnight.": "એક સમયને બીજામાંથી બાદ ન કરો; રાત્રે 12 વાગ્યામાંથી થઈને જાઓ.",
    "Yes, 6 h 15 min in all.": "હા, કુલ 6 કલાક 15 મિનિટ.",
    "What time is it 30 min after 11:50 p.m., and on which day?": "11:50 અપરાહ્નની 30 મિનિટ પછી કેટલો સમય થશે, અને કયા દિવસે?",
    "30 min after 11:50 p.m.?": "11:50 અપરાહ્નની 30 મિનિટ પછી?",
    "First find how long it is to 12 midnight from 11:50 p.m.": "પહેલાં શોધો કે 11:50 અપરાહ્નથી રાત્રે 12 સુધી કેટલો સમય છે.",
    "Yes, it is the next day at 12:20 a.m.": "હા, 12:20 પૂર્વાહ્ન, બીજા દિવસે.",
    "A 3 h 55 min flight leaves at 11:20 p.m., so when and on which day does it land?": "ઉડાન 11:20 અપરાહ્ને ઊપડી, અને 3 કલાક 55 મિનિટ ઊડી, ક્યારે અને કયા દિવસે ઊતરશે?",
    "Flight lands at?": "ઉડાન ક્યારે ઊતરે?",
    "Part of the flight is before 12 midnight and the rest is after it.": "ઉડાનનો થોડો ભાગ રાત્રે 12 પહેલાં છે અને બાકી પછી.",
    "How long after midnight is each time? Now take one from the other.": "દરેક સમય મધ્યરાત્રિ પછી કેટલો છે? હવે એકને બીજામાંથી બાદ કરો.",
    "Read both times as hours after midnight, as the cards show.": "બંને સમય મધ્યરાત્રિ પછીના કલાકોમાં વાંચો, જેમ કાર્ડ બતાવે છે.",
    "Take minutes from minutes first, then hours from hours.": "પહેલાં મિનિટમાંથી મિનિટ, પછી કલાકમાંથી કલાક બાદ કરો.",
    "5 min is too few to take 25 min from, so change 1 h into 60 min.": "5 મિનિટમાંથી 25 મિનિટ બાદ ન થાય, તો 1 કલાકને 60 મિનિટ બનાવો.",
    "15 h 5 min is the same as 14 h 65 min.": "15 કલાક 5 મિનિટ એટલે જ 14 કલાક 65 મિનિટ.",
    "Jump the whole hours first. Then how many minutes are left to jump?": "પહેલાં પૂરા કલાકોનો કૂદકો મારો. પછી કેટલી મિનિટ બાકી?",
    "Jump the whole hours, then add the minutes to the minutes.": "પૂરા કલાકોનો કૂદકો મારો, પછી મિનિટોમાં મિનિટ ઉમેરો.",
    "When the minutes pass 60, move on 1 hour and keep the rest.": "મિનિટ 60થી વધે તો 1 કલાક આગળ વધો અને બાકી રાખો.",
    "Which way do you jump to find a start? Check by jumping forward.": "શરૂઆત શોધવા કઈ બાજુ કૂદકો મારશો? આગળ કૂદકાથી ચકાસો.",
    "Jump back the hours first, then the minutes.": "પહેલાં કલાક પાછળ જાઓ, પછી મિનિટ.",
    "Check it by jumping forward from your start to land on the end.": "તમારી શરૂઆતથી આગળ કૂદકો મારી અંત પર પહોંચો અને ચકાસો.",
    "It loses 3 min in each hour from 7:00 a.m., to 11:00 a.m.": "7:00થી 11:00 પૂર્વાહ્ન સુધી તે દર કલાકે 3 મિનિટ ગુમાવે છે.",
    "Find how many minutes it is behind, then jump back from 11:00 a.m.": "તે કેટલી મિનિટ પાછળ છે તે શોધો, પછી 11:00 પૂર્વાહ્નથી પાછળ કૂદકો મારો.",
    "Stop at midnight first. What day is it after that?": "પહેલાં મધ્યરાત્રિએ અટકો. પછી કયો દિવસ છે?",
    "Read the length written on each jump.": "દરેક કૂદકા પર લખેલી લંબાઈ વાંચો.",
    "Add the two jumps: hours to hours, minutes to minutes.": "બંને કૂદકા ઉમેરો: કલાક સાથે કલાક, મિનિટ સાથે મિનિટ.",
    "What does a clock read just after 12 midnight, and on which day?": "રાત્રે 12 પછી તરત ઘડિયાળ શું બતાવે છે, અને કયા દિવસે?",
    "Take the 10 min to midnight off the 30 min.": "30 મિનિટમાંથી મધ્યરાત્રિ સુધીની 10 મિનિટ બાદ કરો.",
    "How much of the 3 h 55 min is left after the jump to midnight?": "3 કલાક 55 મિનિટમાંથી, મધ્યરાત્રિ સુધીના કૂદકા પછી કેટલું બાકી?",
    "Take 40 min off 3 h 55 min, then count that on from 12 midnight.": "3 કલાક 55 મિનિટમાંથી 40 મિનિટ બાદ કરો, પછી રાત્રે 12થી એટલું આગળ ગણો.",
    "noon": "બપોર",
    "Jump": "કૂદકો",
    "a.m.": "પૂર્વાહ્ન",
    "p.m.": "અપરાહ્ન",
    "midnight": "મધ્યરાત્રિ",
    "Now tap the other card to see its time after midnight.": "હવે બીજું કાર્ડ પણ ટૅપ કરો.",
    "Back": "પાછળ",
    "Pick the half of the day on the card, then press Enter.": "કાર્ડ પર દિવસનો ભાગ પસંદ કરો, પછી દાખલ કરો દબાવો.",
    "Tap the same day or the next day, then press Enter.": "એ જ દિવસ કે બીજા દિવસ પર ટૅપ કરો, પછી દાખલ કરો દબાવો.",
    "Start": "શરૂઆત",
    "Now": "હમણાં",
    "End": "અંત",
    "Set right": "સાચી મેળવી",
    "True time": "સાચો સમય",
    "Slow clock": "ધીમી ઘડિયાળ",
    "Your answer": "તમારો જવાબ",
    "Check": "ચકાસો",
    "Find the gap": "તફાવત શોધો",
    "To midnight": "મધ્યરાત્રિ સુધી",
    "Jump on": "આગળ કૂદકો",
    "after 12 noon": "બપોરે 12 પછી",
    "after 12 midnight": "રાત્રે 12 પછી",
    "before 12 noon": "બપોરે 12 પહેલાં",
    "the next day": "બીજો દિવસ",
    "after midnight": "મધ્યરાત્રિ પછી",
    "How long": "કેટલો સમય",
    "same day": "એ જ દિવસ",
    "next day": "બીજો દિવસ",
    "First tap the Start card and the End card.": "પહેલાં શરૂઆત કાર્ડ અને અંત કાર્ડ પર ટૅપ કરો.",
    "First make the jumps with the key under the line.": "પહેલાં રેખા નીચેના બટનથી કૂદકા મારો.",
    "This line starts at 12 midnight, so jump forward.": "આ રેખા રાત્રે 12 વાગ્યાથી શરૂ થાય છે, તો આગળ કૂદકો મારો.",
    "This line ends here, so jump back.": "આ રેખા અહીં પૂરી થાય છે, તો પાછળ કૂદકો મારો.",
    "First use the key beside the clocks.": "પહેલાં ઘડિયાળો પાસેનું બટન દબાવો.",
    "2 days later": "2 દિવસ પછી",
  },
};

/* One entry per phase = one mount. `warm` is the guide steps' own warm-up board (never question 1's numbers). */
const PHASES = [
  {
    n: 1,
    concept: "How long, through the 24-hour clock",
    conceptId: "M2.S4.T7.C30", objectiveIds: ["O11"],
    says: ["How long after midnight is each time? Now take one from the other."],
    warm: { kind: "long", s: 435, e: 580 },
    steps: [
      { say: "Tap the Start card to see its time after midnight.", on: "mark-s", hint: "The Start card is the blue card on the left." },
      { say: "Now tap the End card to see its time after midnight.", on: "mark-e", hint: "Tap the blue End card on the right." },
    ],
    ladder: ["Read both times as hours after midnight, as the cards show.", "Take minutes from minutes first, then hours from hours."],
    closing: "A clock time is a length after midnight, so you can take one from the other.",
    learned: "You learned: take the earlier time after midnight from the later one.",
    traceback: "both times are shown as hours and minutes after midnight, the earlier is taken from the later (1 h changed into 60 min where the minutes are too few), and the length between the marks turns green",
    items: [
      /* learn TJ1: answer in the plan = 5 h 15 min. */
      { qid: "M2.S4.T7.C30:TJ1", near: "6|45", kind: "long", s: 500, e: 815, parts: TJ_DUR, answer: [5, 15],
        say: "From 8:20 a.m., how long is it to 1:35 p.m.?", ask: "8:20 a.m. to 1:35 p.m.?",
        miss: "After noon, add 12 to the hours to get the time after midnight.",
        win: "Yes, 5 h 15 min passes from 8:20 a.m., to 1:35 p.m." },
      /* practice 1: answer in the plan = 2 h 30 min */
      { qid: "M2.S4.T7.C30:1", kind: "long", s: 550, e: 700, parts: TJ_DUR, answer: [2, 30],
        say: "Starting at 9:10 a.m., how long is it until 11:40 a.m.?", ask: "9:10 a.m. to 11:40 a.m.?",
        miss: "Both are morning times, so take 9 h 10 min away from 11 h 40 min.",
        win: "Yes, that is 2 h 30 min." },
      /* practice 5: answer in the plan = 4 h 40 min */
      { qid: "M2.S4.T7.C30:5", near: "5|20", kind: "long", s: 625, e: 905, parts: TJ_DUR, answer: [4, 40],
        say: "A trip starts at 10:25 a.m., and ends at 3:05 p.m., so how long is it?", ask: "10:25 a.m. to 3:05 p.m.?",
        miss: "15 h 5 min after midnight is the time 3:05 p.m.",
        ladder: ["5 min is too few to take 25 min from, so change 1 h into 60 min.", "15 h 5 min is the same as 14 h 65 min."] },
    ],
  },
  {
    n: 2,
    concept: "Jumps to an end time",
    conceptId: "M2.S4.T7.C31", objectiveIds: ["O11"],
    says: ["Jump the whole hours first. Then how many minutes are left to jump?"],
    warm: { kind: "end", s: 570, d: 80 },
    steps: [
      { say: "Tap Jump to jump the whole hours first.", on: "jump-h", hint: "The Jump key is under the line." },
      { say: "Tap Jump again to jump the minutes.", on: "jump-m", hint: "Now the minutes, with the same key." },
    ],
    ladder: ["Jump the whole hours, then add the minutes to the minutes.", "When the minutes pass 60, move on 1 hour and keep the rest."],
    closing: "An end time is found by jumping the hours first, then the minutes.",
    learned: "You learned: jump the hours first, then the minutes, to find an end.",
    traceback: "the hour jump and the minute jump are drawn from the start, the mark they reach turns green with its time, and the right half (a.m. or p.m.) is ringed on the card",
    items: [
      /* learn TJ2: answer in the plan = 1:05 p.m. */
      { qid: "M2.S4.T7.C31:TJ2", near: "12|65|pm", kind: "end", s: 670, d: 115, parts: TJ_TIME, answer: [1, 5, "pm"],
        say: "At 11:10 a.m., a puppet show starts and lasts 1 h 55 min, so when does it end?", ask: "Show ends at?",
        miss: "Read the time at the mark where the minute jump lands.",
        win: "Yes, the show is over at 1:05 p.m." },
      /* practice 2: answer in the plan = 3:20 p.m. */
      { qid: "M2.S4.T7.C31:2", kind: "end", s: 800, d: 120, parts: TJ_TIME, answer: [3, 20, "pm"],
        say: "What time is it 2 h after 1:20 p.m.?", ask: "2 h after 1:20 p.m.?",
        miss: "A jump of whole hours moves only the hour.",
        win: "Yes, it is 3:20 p.m., 2 h after 1:20 p.m." },
      /* practice 6: answer in the plan = 7:25 p.m. */
      { qid: "M2.S4.T7.C31:6", near: "6|85|pm", kind: "end", s: 1010, d: 155, parts: TJ_TIME, answer: [7, 25, "pm"],
        say: "A show starts at 4:50 p.m., and runs 2 h 35 min, so what time is it over?", ask: "Show over at?",
        miss: "50 min and 35 min pass the next hour mark." },
    ],
  },
  {
    n: 3,
    concept: "Working back to a start",
    conceptId: "M2.S4.T7.C32", objectiveIds: ["O12"],
    says: ["Which way do you jump to find a start? Check by jumping forward."],
    warm: { kind: "start", e: 1000, d: 75, fwd: true },
    steps: [
      { say: "Tap Back to jump the whole hours back from the end.", on: "back-h", hint: "The Back key is under the line." },
      { say: "Tap Back again to jump the minutes back.", on: "back-m", hint: "The minutes go back with the same key." },
      { say: "Tap Check to jump forward and land on the end.", on: "fwd", hint: "Tap Check to test the start you found." },
    ],
    ladder: ["Jump back the hours first, then the minutes.", "Check it by jumping forward from your start to land on the end."],
    closing: "A start is found by jumping back, and a slow clock shows an earlier time.",
    learned: "You learned: jump back to find a start; a slow clock is behind.",
    traceback: "the jumps back are drawn from the end, the start turns green with its time and a forward jump lands on the end; for the slow clock the minutes it loses each hour are counted, it is jumped back from the true time and its hands are set",
    items: [
      /* learn TJ3: answer in the plan = 7:25 p.m. */
      { qid: "M2.S4.T7.C32:TJ3", near: "12|15|am", kind: "start", e: 1310, d: 145, parts: TJ_TIME, answer: [7, 25, "pm"],
        say: "A show lasts 2 h 25 min and ends at 9:50 p.m., so when did it start?", ask: "Show began at?",
        miss: "A start comes before its end, so jump back, not forward.",
        win: "Yes, at 7:25 p.m., it started, and 2 h 25 min later it is 9:50 p.m." },
      /* practice 3: answer in the plan = 6:55 p.m. */
      { qid: "M2.S4.T7.C32:3", near: "9|55|pm", kind: "start", e: 1225, d: 90, parts: TJ_TIME, answer: [6, 55, "pm"],
        say: "A film ends at 8:25 p.m., after 1 h 30 min, so what time did it begin?", ask: "Film began at?",
        miss: "Going back 30 min from 25 past the hour crosses the hour mark.",
        win: "Yes, the film began at 6:55 p.m." },
      /* practice 7: answer in the plan = 10:48 a.m., because in 4 h it runs slow by 4 x 3 = 12 min */
      { qid: "M2.S4.T7.C32:7", near: "11|00|am", kind: "slow", s: 420, e: 660, rate: 3, parts: TJ_TIME, answer: [10, 48, "am"],
        say: "A clock loses 3 min an hour from 7:00 a.m., so what does it show at 11:00 a.m.?", ask: "Slow clock shows?",
        miss: "A slow clock is behind the true time, never ahead.",
        ladder: ["It loses 3 min in each hour from 7:00 a.m., to 11:00 a.m.", "Find how many minutes it is behind, then jump back from 11:00 a.m."] },
    ],
  },
  {
    n: 4,
    concept: "Past midnight",
    conceptId: "M2.S4.T7.C33", objectiveIds: ["O12"],
    says: ["Stop at midnight first. What day is it after that?"],
    warm: { kind: "nightEnd", s: 1410, d: 60 },
    steps: [
      { say: "Tap To midnight to jump to 12 midnight first.", on: "to-mid", hint: "The key under the line jumps to midnight." },
      { say: "Now tap Jump on to go into the next day.", on: "jump-on", hint: "Tap Jump on to cross 12 midnight." },
    ],
    ladder: ["Read the length written on each jump.", "Add the two jumps: hours to hours, minutes to minutes."],
    closing: "A trip past 12 midnight jumps to midnight first and ends on the next day.",
    learned: "You learned: jump to midnight first, then on into the next day.",
    traceback: "the jump to 12 midnight and the jump on are drawn, the words the next day light up, and the length or the end time turns green with a.m. and the next day ringed on the cards",
    items: [
      /* learn TJ4: answer in the plan = 6 h 15 min. */
      { qid: "M2.S4.T7.C33:TJ4", near: "5|45", kind: "night", s: 1340, e: 1715, parts: TJ_DUR, answer: [6, 15],
        say: "At 10:20 p.m., a ferry leaves, and at 4:35 a.m., it lands, so how long is it?", ask: "Ferry journey?",
        miss: "Do not take one time from the other; go through 12 midnight.",
        win: "Yes, 6 h 15 min in all." },
      /* practice 4: answer in the plan = 12:20 a.m. the next day */
      { qid: "M2.S4.T7.C33:4", near: "12|20|am|same", kind: "nightEnd", s: 1430, d: 30, parts: TJ_TIME, answer: [12, 20, "am", "next"],
        say: "What time is it 30 min after 11:50 p.m., and on which day?", ask: "30 min after 11:50 p.m.?",
        miss: "First find how long it is to 12 midnight from 11:50 p.m.",
        ladder: ["What does a clock read just after 12 midnight, and on which day?", "Take the 10 min to midnight off the 30 min."],
        win: "Yes, it is the next day at 12:20 a.m." },
      /* practice 8: answer in the plan = 3:15 a.m. the next day */
      { qid: "M2.S4.T7.C33:8", near: "3|15|am|same", kind: "nightEnd", s: 1400, d: 235, parts: TJ_TIME, answer: [3, 15, "am", "next"],
        say: "A 3 h 55 min flight leaves at 11:20 p.m., so when and on which day does it land?", ask: "Flight lands at?",
        miss: "Part of the flight is before 12 midnight and the rest is after it.",
        ladder: ["How much of the 3 h 55 min is left after the jump to midnight?", "Take 40 min off 3 h 55 min, then count that on from 12 midnight."] },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). Times are minutes after midnight (past 1440 = the next day). */
const MODEL = {
  timeLine: "a day band with a mark for every hour (12 noon and 12 midnight taller), a.m. warm white and p.m. rose",
  free: { start: 480, jumps: [60, 10] },
  answers: "durations as hours | minutes; a 12-hour time as hour | minutes plus the a.m. / p.m. card (and the day card past midnight)",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: pure on the value sent (Work sends [hour, minutes, half, day?] for a clock time) */
const judge = (item: any, v: any) => {
  const a = item.answer, g = tjParse(v);
  if (g.n[0] === "" || g.n[1] === "") return false;
  if (Number(g.n[0]) !== a[0] || Number(g.n[1]) !== a[1]) return false;
  if (a.length < 3) return true;
  if (g.half !== a[2]) return false;
  return a.length < 4 || g.day === a[3];
};
/* oracle: every answer re-derived from the question's own words by the column method (no code shared with judge or Work) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const ts = [...it.say.matchAll(/(\d{1,2}):(\d{2}) ([ap])\.m\./g)].map((m: any) => [(+m[1] % 12) + (m[3] === "p" ? 12 : 0), +m[2]]);
  const dm = it.say.match(/(\d+) h(?: (\d+) min)?|(\d+) min after/);
  const dh = dm ? (dm[1] ? +dm[1] : 0) : 0, dmin = dm ? (dm[2] ? +dm[2] : dm[3] ? +dm[3] : 0) : 0;
  const sub = (x: number[], y: number[]) => { let h = x[0] - y[0], m = x[1] - y[1]; if (m < 0) { m += 60; h -= 1; } if (h < 0) h += 24; return [h, m]; };
  const clock = (h: number, m: number, wrap: boolean) => { const day = h >= 24 ? "next" : "same"; h = ((h % 24) + 24) % 24; const r: any[] = [h % 12 || 12, m, h >= 12 ? "pm" : "am"]; if (wrap) r.push(day); return r; };
  let want: any[] = [];
  if (it.kind === "long") { const o = ts.slice().sort((x: number[], y: number[]) => x[0] * 60 + x[1] - y[0] * 60 - y[1]); want = sub(o[1], o[0]); }
  else if (it.kind === "night") want = sub(ts[1], ts[0]);
  else if (it.kind === "end" || it.kind === "nightEnd") { let h = ts[0][0] + dh, m = ts[0][1] + dmin; if (m >= 60) { m -= 60; h += 1; } want = clock(h, m, it.kind === "nightEnd"); }
  else if (it.kind === "start") { const r = sub(ts[0], [dh, dmin]); want = clock(r[0], r[1], false); }
  else if (it.kind === "slow") { const lose = +(it.say.match(/loses (\d+) min/) || [0, 0])[1] * (ts[1][0] - ts[0][0]); const r = sub(ts[1], [0, lose]); want = clock(r[0], r[1], false); }
  return want.length === it.answer.length && want.every((x: any, k: number) => x === it.answer[k]);
}));
/* the misconception: a duration one hour out, a clock time on the wrong half of the day */
const nearMiss = (item: any) => {
  if (item.near) return item.near;
  const a = item.answer;
  if (a.length < 3) return (a[0] + 1) + "|" + a[1];
  return a[0] + "|" + tjPad(a[1]) + "|" + (a[2] === "pm" ? "am" : "pm") + (a[3] ? "|" + a[3] : "");
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const a = item.answer;
  if (a.length < 3) return [a[0] + " h " + a[1] + " min"];
  return [a[0] + ":" + tjPad(a[1]) + " " + (a[2] === "pm" ? "p.m." : "a.m."), a[0] + ":" + tjPad(a[1])];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => {
  const a = item.answer;
  return a.length < 3 ? [a[0], a[1]] : a[0] + "|" + tjPad(a[1]) + "|" + a[2] + (a[3] ? "|" + a[3] : "");
};

/* the dev driver and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a clock time also sets the a.m. / p.m. card (and the day card); the runtime then fills the two boxes */
const answer = (item: any, v: any) => { if (item.answer && item.answer.length > 2 && HOOK.setPick) HOOK.setPick(v); return undefined; };
const check = () => (HOOK.check ? HOOK.check() : undefined);

const TJ_FREE = { kind: "free" };
/* the answer gate arms once a child really acts (user mode only, trusted input only): a pointer on the board, Enter/Space on a guide
   step or on a board control. A tap on the Answer key, the pad or a plain Enter at a question never arms it; toolApi never does */
const TJ_ARM = { on: false };
const tjUser = () => { try { const b = document.querySelector('[data-zone="bar"]'); return !!b && b.getAttribute("data-mode") === "user"; } catch (e) { return false; } };

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const P = phase || {};
  const free = stage === "free";
  const demo = !free && (stage === "demo" || (stage === "teach" && P.steps && P.steps.length > 0));
  const it: any = free ? TJ_FREE : demo ? P.warm : item;
  const qk = free ? "free" : demo ? n + ":w" : n + ":" + index;
  const won = !free && !demo && (stage === "win" || stage === "idle");
  const slowB = !!(it && it.kind === "slow");
  const { BT: TJ_BT, BB: TJ_BB, BY: TJ_BY, CY: TJ_CY } = tjRows(slowB);

  /* the board belongs to an ENTRY of a question (PATTERNS §18): rebuilt whenever the question key changes */
  const ent = useRef({ qk: "", e: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, e: ent.current.e + 1 };
  const eN = ent.current.e;
  const fresh = () => ({ e: eN, ms: false, me: false, done: 0, gapN: 0, half: null as any, day: null as any, fx: 0, touched: false, user: false, cur: 480, arc: null as any });
  const [raw, setRaw] = useState(fresh);
  const S = raw.e === eN ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => { const b = p.e === eN ? p : fresh(); return { ...b, ...(typeof o === "function" ? o(b) : o) }; });
  const pick = useRef({ half: null as any, day: null as any });
  pick.current = { half: S.half, day: S.day };
  const busy = useRef(false), gate = useRef(false), fixing = useRef(false), nudged = useRef(false);

  const isTime = !!(it && it.answer && it.answer.length > 2);
  const needDay = !!(it && it.answer && it.answer.length > 3);
  const seq = it ? tjSeq(it) : [];
  const doneN = it && it.kind === "long" ? (S.ms ? 1 : 0) + (S.me ? 1 : 0) : S.done;
  const actsDone = !free && doneN >= seq.length;
  const fx = !demo && !free && stage === "ask" ? S.fx : 0;

  /* the room: lay out from box (PATTERNS §14); nothing under the key's corner */
  const W0 = box ? box.w : W.w, H0 = box ? box.h : W.h;
  const kx = box && box.key ? Math.min(W0, box.key.x - 12) : W0;
  void H0;

  /* the window of the line: every time on this board, 30 min either side (none on the slow clock), at least 3 hours */
  const target = it && !free ? tjTarget(it) : null;
  const times: number[] = free ? [480, S.cur, ...(S.arc ? [S.arc.a, S.arc.b] : [])] : [it.s, it.e, target, it.kind === "start" ? it.e : null, (it.kind === "night" || it.kind === "nightEnd") ? 1440 : null].filter((x: any) => typeof x === "number");
  const mg = it && it.kind === "slow" ? 0 : 30;
  let h0 = Math.floor((Math.min(...times) - mg) / 60), h1 = Math.ceil((Math.max(...times) + mg) / 60);
  while (h1 - h0 < 3) { h0 -= 1; if (h1 - h0 < 3) h1 += 1; }
  if (free) { h0 = Math.max(0, h0); h1 = Math.min(48, Math.max(h1, h0 + 3)); }
  const xl = slowB ? 60 : 110, xr = W0 - (slowB ? 230 : 110),   /* the slow board keeps room right of 11:00 for its jump's label */
    pph = (xr - xl) / (h1 - h0), bpad = Math.min(44, pph / 3);
  const X = (m: number) => xl + ((m - h0 * 60) / 60) * pph;
  const hourLab = (h: number) => { const hh = ((h % 24) + 24) % 24; return hh === 0 ? tx("midnight") : hh === 12 ? tx("noon") : String(hh % 12); };
  /* the hour labels: numbers on the band's lower row; noon and midnight as a word on its upper row, so no number is ever hidden */
  const lstep = [1, 2, 3, 4, 6, 12].find((st) => pph * st >= 56) || 12;
  const hourLabs = Array.from({ length: h1 - h0 + 1 }, (_, k) => { const h = h0 + k, lab = hourLab(h); return { h, lab, wide: lab.length > 2, w: tjW(lab, 28), skip: lab.length <= 2 && h % lstep !== 0 }; });
  hourLabs.forEach((L: any) => {
    const x = X(L.h * 60), lo = xl - bpad + 6, hi = xr + bpad - 6;
    if (!L.wide) { const nw = tjW(L.lab, 32); if (x - nw / 2 < lo || x + nw / 2 > hi) L.skip = true; return; }
    L.pw = L.w + 16; L.px = Math.max(xl - bpad + 16, Math.min(xr + bpad - 16 - L.pw, x - L.pw / 2));
    if (Math.abs(L.px + L.pw / 2 - x) > L.pw / 4) L.skip = true;
  });
  /* a tick under a word pill would stand against its corners: it is left out, the pill names the hour */
  const underPill = (x: number) => hourLabs.some((L: any) => L.wide && !L.skip && x > L.px - 6 && x < L.px + L.pw + 6) || (!!passChip && x > passChip.x - 6 && x < passChip.x + passChip.w + 6);
  /* an end time's correction: the minutes that pass the next hour mark (the plan's error), named by a chip in the band's top row */
  function passedOf() {
    if (!(fx >= 1 && it && it.kind === "end")) return null;
    const p0 = it.s + 60 * Math.floor(it.d / 60), hc = Math.ceil((p0 + 1) / 60) * 60, end = it.s + it.d;
    if (it.d % 60 === 0 || hc >= end) return null;
    const lab = fmtDur(end - hc), w = tjW(lab, 28) + 24, mid = (X(hc) + X(end)) / 2;
    return { a: hc, b: end, lab, w, x: Math.max(xl - bpad + 16, Math.min(xr + bpad - 16 - w, mid - w / 2)) };
  }
  const fmt12 = (m: number) => { const t = tjMod(m), h = Math.floor(t / 60); return (h % 12 || 12) + ":" + tjPad(t % 60) + " " + tx(h < 12 ? "a.m." : "p.m."); };
  const hU = (h: number) => (h === 1 && lang !== "en" ? tx("hour") : tx("h"));   /* "1 घंटा", not "1 घंटे" */
  const fmtDur = (m: number) => { const h = Math.floor(m / 60), r = m % 60; return h && r ? h + " " + hU(h) + " " + r + " " + tx("min") : h ? h + " " + hU(h) : r + " " + tx("min"); };
  const passChip = passedOf();
  const afterMid = (m: number) => { const t = tjMod(m); return Math.floor(t / 60) + " " + tx("h") + " " + (t % 60) + " " + tx("min"); };

  /* the jumps on show */
  const fullSeq = (won || fx >= 1) && it.kind === "start" && !it.fwd ? [...seq, "fwd"] : seq;
  const shownActs = free ? [] : won || fx >= 1 ? fullSeq : seq.slice(0, S.done);
  const arcs = free ? (S.arc ? [S.arc] : []) : tjArcs(it, shownActs);
  const moved = it && it.kind !== "long" && it.kind !== "night" && it.kind !== "free" && seq.filter((a) => a !== "fwd").every((a) => shownActs.includes(a)) && (won || fx >= 1 || S.done >= seq.filter((a) => a !== "fwd").length);
  const crossed = !free && (it.kind === "night" || it.kind === "nightEnd") && (shownActs.includes("jump-on"));
  const showAfter = (which: string) => won || fx >= 1 || (which === "s" ? S.ms : S.me);
  const gapShown = it && it.kind === "slow" ? (won || fx >= 1 ? 4 : S.gapN) : 0;

  /* the act geometry: where the hand acts, in WORK coordinates */
  const cardsRef = useRef<any>({});
  const actFor = (on: string) => {
    if (on === "mark-s" || on === "mark-e") {
      const c = cardsRef.current[on];
      return { tool: "hand", moves: "tap", at: [{ x: c ? c.cx : X(on === "mark-s" ? it.s : it.e), y: TJ_CY + 40 }] };
    }
    if (on === "gap") return { tool: "hand", moves: "tap", at: [0, 1, 2, 3].map((k) => ({ x: X(it.s + 30 + 60 * k), y: TJ_BY })), onPoint: (i: number) => put({ gapN: i + 1 }) };
    const k = seq.indexOf(on);
    const arc = tjArcs(it, seq.slice(0, k + 1)).pop();
    if (!arc) return null;
    return { tool: "hand", moves: "push", from: { x: X(arc.a), y: TJ_BY }, at: [{ x: X(arc.b), y: TJ_BY }] };
  };
  /* one act per press (a second tap or Enter within 400 ms is the same press), and a question just opened holds its acts and its act nudge for 1200 ms,
     so the second half of a double press on the last guide step or the Next key never lands on the new question */
  const pressAt = useRef(0), openAt = useRef(0), openKey = useRef("");
  if (openKey.current !== stage + ":" + qk) { openKey.current = stage + ":" + qk; if (stage === "ask") openAt.current = Date.now(); }
  const held = () => stage === "ask" && Date.now() - openAt.current < 1200;
  const doAct = (on: string) => {
    if (busy.current || free || !it) return;
    const t0 = Date.now();
    if (t0 - pressAt.current < 400 || held()) return;
    pressAt.current = t0;
    let ok = it.kind === "long" ? (on === "mark-s" && !S.ms) || (on === "mark-e" && !S.me) : seq[S.done] === on;
    if (demo && on !== stepOn) ok = false;
    if (!ok && stage === "ask" && it.kind === "long" && !actsDone) { sayNudge("Now tap the other card to see its time after midnight."); return; }
    if (!ok || stage === "win" || stage === "idle") { api.did(on); return; }
    const o = actFor(on);
    if (!o) return;
    busy.current = true;
    const kbd = (() => { try { const el: any = document.activeElement; return !!el && el.getAttribute && el.getAttribute("data-control") === on; } catch (e) { return false; } })();
    api.act(o).then((r: boolean) => {
      busy.current = false;
      if (!r) return;
      if (on === "mark-s") put({ ms: true });
      else if (on === "mark-e") put({ me: true });
      else put((b: any) => ({ done: b.done + 1, gapN: on === "gap" ? 4 : b.gapN }));
      api.sfx.settle();
      api.did(on);
      if (nudged.current && stage === "ask") { nudged.current = false; api.say(item.say); }
      if (kbd) setTimeout(() => { const nx = seq[seq.indexOf(on) + 1]; const el: any = nx && document.querySelector('[data-zone="work"] [data-control="' + nx + '"]'); if (el && el.focus) el.focus(); }, 60);
    });
  };
  /* free play: four jump keys from the time on show */
  const FREE_KEYS = [{ id: "back-h", d: -60, label: tx("Back") + " 1 " + hU(1) }, { id: "back-m", d: -10, label: tx("Back") + " 10 " + tx("min") },
    { id: "jump-m", d: 10, label: tx("Jump") + " 10 " + tx("min") }, { id: "jump-h", d: 60, label: tx("Jump") + " 1 " + hU(1) }];
  const freeNudge = useRef(false);
  const freeAct = (d: number) => {
    if (busy.current || Date.now() - pressAt.current < 400) return;
    pressAt.current = Date.now();
    const a = S.cur, b = Math.max(0, Math.min(2880, a + d));
    if (a === b) { freeNudge.current = true; api.say(d < 0 ? "This line starts at 12 midnight, so jump forward." : "This line ends here, so jump back."); return; }
    busy.current = true;
    api.act({ tool: "hand", moves: "push", from: { x: X(a), y: TJ_BY }, at: [{ x: X(b), y: TJ_BY }] }).then((r: boolean) => {
      busy.current = false;
      if (!r) return;
      put({ cur: b, arc: { a, b, len: Math.abs(b - a) } });
      if (freeNudge.current) { freeNudge.current = false; api.say(FREE_LINE); }
      api.sfx.settle();
    });
  };

  /* a clock time's a.m. / p.m. card (and the day card past midnight) */
  const setPick = (patch: any) => {
    pick.current = { ...pick.current, ...patch };
    put(patch);
    if (nudged.current && stage === "ask") { nudged.current = false; api.say(item.say); }
  };
  HOOK.setPick = (v: any) => { const g = tjParse(v); setPick({ ...(g.half ? { half: g.half } : {}), ...(g.day ? { day: g.day } : {}) }); };
  HOOK.check = stage === "ask" ? () => { if (!actsDone) put({ ms: true, me: true, done: seq.length, gapN: 4 }); return undefined; } : null;

  /* Enter: a guide step performs its act; a clock time is sent with its card once both are given */
  const enterAsk = (v: any) => {
    const ps = slotPartsOf(v === undefined ? typed : v, 2);
    const pk = pick.current;
    if (!pk.half) { if (held()) return; sayNudge("Pick the half of the day on the card, then press Enter."); return; }
    if (needDay && !pk.day) { if (held()) return; sayNudge("Tap the same day or the next day, then press Enter."); return; }
    api.submit([ps[0], ps[1], pk.half, ...(needDay ? [pk.day] : [])]);
  };
  api.onEnter(demo && stepOn ? () => doAct(stepOn) : stage === "ask" && isTime ? enterAsk : null);

  /* the traceback: lock, redraw the maths in three beats, unlock; the child's a.m. / p.m. pick is emptied with the slot */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    fixing.current = true;
    pick.current = { half: null, day: null };
    put({ half: null, day: null, fx: 0 });
    tl.run([[0, () => put({ fx: 1 })], [900, () => put({ fx: 2 })], [1800, () => put({ fx: 3 })], [2300, () => {}]], () => { fixing.current = false; api.lock(false); });
  }, [wrong]);

  /* the answer is gated by the act (PATTERNS §19): user mode, after a real touch on the board, until the acts are done */
  const [armTick, setArmTick] = useState(0);
  const arm = (e: any) => { if (!e || !e.isTrusted || TJ_ARM.on || !tjUser()) return; TJ_ARM.on = true; setArmTick((k: number) => k + 1); };
  /* a miss opens the gate for good on this question: the correction shows every jump, so nothing is left to do but answer */
  const want = stage === "ask" && !free && TJ_ARM.on && !actsDone && !(S.fx >= 1) && !wrong;
  useEffect(() => {
    if (want && !gate.current) { gate.current = true; api.lock(true); }
    else if (!want && gate.current) { gate.current = false; if (!fixing.current) api.lock(false); }
  }, [qk, want, armTick]);
  const touch = (e: any) => arm(e);
  /* the latest render, for the window listeners and the nudge timer */
  const now = useRef<any>({});
  now.current = { api, item, qk, stage, it, demo };
  const actNudge = () => (it && it.kind === "long" ? "First tap the Start card and the End card." : it && it.kind === "slow" ? "First use the key beside the clocks." : "First make the jumps with the key under the line.");
  const nudgeT = useRef<any>(null);
  /* a nudge is read, then the question comes back by itself, so the Hint key and the bubble show the question again */
  const sayNudge = (line: string) => {
    nudged.current = true; api.say(line);
    clearTimeout(nudgeT.current);
    const q = qk;
    nudgeT.current = setTimeout(() => { const c = now.current; if (nudged.current && c.qk === q && c.stage === "ask") { nudged.current = false; c.api.say(c.item.say); } }, Math.max(2600, 68 * line.length));
  };
  useEffect(() => () => clearTimeout(nudgeT.current), []);
  /* the window listeners read the LATEST render's helpers (a mount closure would nudge for the demo's question and never come back) */
  now.current.sayNudge = sayNudge; now.current.actNudge = actNudge; now.current.held = held;
  now.current.backToAsk = () => { const c = now.current; if (nudged.current && c.stage === "ask") setTimeout(() => { nudged.current = false; clearTimeout(nudgeT.current); c.api.say(c.item.say); }, 40); };
  useEffect(() => {
    const onKey = (e: any) => {
      if (!e.isTrusted || e.repeat || (e.key !== "Enter" && e.key !== " ")) return;
      const c = now.current, el: any = document.activeElement, onBoard = !!(el && el.closest && el.closest('[data-zone="work"]'));
      if (el && el.closest && el.closest('[data-control="again"]')) { c.backToAsk(); return; }   /* the Hint key after a nudge shows the question */
      if (c.demo || onBoard) arm(e);
      if (e.key === "Enter" && gate.current && c.stage === "ask" && !c.held()) c.sayNudge(c.actNudge());   /* Enter at a locked question: say what is missing */
    };
    const onDown = (e: any) => {
      const t: any = e.target, c = now.current;
      if (e.isTrusted && t && t.closest && t.closest('[data-control="again"]')) c.backToAsk();
      if (e.isTrusted && gate.current && c.stage === "ask" && !c.held() && t && t.closest && t.closest('[data-control="answer-open"]')) c.sayNudge(c.actNudge());
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onDown, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("pointerdown", onDown, true); };
  }, []);
  /* a question left behind stops its correction and gives the pad back */
  useEffect(() => () => { tl.stop(); busy.current = false; if (gate.current || fixing.current) { gate.current = false; fixing.current = false; api.lock(false); } }, [qk]);
  /* the win line, once a question is won */
  useEffect(() => { if (stage === "win" && item) api.say(item.win || P.closing); }, [stage, qk]);   /* the last question: the runtime shows the closing anyway */

  /* what the host and the agent read back (never the answer before it is given) */
  api.share({
    phase: n, markers: free ? [fmt12(480), fmt12(S.cur) + (S.cur >= 2880 ? ", 2 days later" : S.cur >= 1440 ? ", next day" : "")] : [it.s, it.e].filter((x: any) => typeof x === "number").map(fmt12),
    jumps: arcs.map((a: any) => ((it.kind === "nightEnd" || (it.kind === "slow" && !a.fwd)) && !won && !demo ? "Jump" : fmtDur(a.len))), direction: it && it.kind === "start" || (it && it.kind === "slow") ? "back" : "forward",
    next_day: free ? S.cur >= 1440 : crossed && (won || demo), slow_clock: it && it.kind === "slow" ? (won ? fmt12(target as number) : "?") : null, complete: stage === "idle",
  });

  /* ── the cards under the line: centred on their mark, pushed apart so none overlap, kept on the board ── */
  const after = it && it.kind === "long";
  const cards: any[] = [];
  let yours: any = null;   /* the child's own time in the correction: a row of its own under the cards */
  const tone = (k: string) => (k === "given" ? { st: TJ_GIVEN, fill: "#EAF2FB", ink: TJ_GIVEN } : k === "ans" ? { st: TJ_ANS, fill: "#E2F4EC", ink: TJ_ANS } : { st: TJ_NOW, fill: "#FFF3D6", ink: TJ_NOW_INK });
  if (free) {
    cards.push({ id: "c-start", t: 480, label: tx("Start"), text: fmt12(480), k: "given" });
    if (S.cur !== 480) cards.push({ id: "c-now", t: S.cur, label: tx("Now"), text: fmt12(S.cur) + (S.cur >= 2880 ? ", " + tx("2 days later") : S.cur >= 1440 ? ", " + tx("next day") : ""), k: "now" });
  } else if (it) {
    if (it.kind === "long" || it.kind === "night") {
      cards.push({ id: "mark-s", t: it.s, label: tx("Start"), text: fmt12(it.s), k: "given", ctl: it.kind === "long", am: after && showAfter("s") ? afterMid(it.s) : null });
      cards.push({ id: "mark-e", t: it.e, label: tx("End"), text: fmt12(it.e), k: "given", ctl: it.kind === "long", am: after && showAfter("e") ? afterMid(it.e) : null });
    } else if (it.kind === "end" || it.kind === "nightEnd") cards.push({ id: "c-start", t: it.s, label: tx("Start"), text: fmt12(it.s), k: "given" });
    else if (it.kind === "start") cards.push({ id: "c-end", t: it.e, label: tx("End"), text: fmt12(it.e), k: "given" });
    else if (it.kind === "slow") cards.push({ id: "c-true", t: it.e, label: tx("True time"), text: fmt12(it.e), k: "given" });   /* 7:00 is the line's own first mark */
    if (target !== null && moved) {
      const lab = it.kind === "start" ? tx("Start") : it.kind === "slow" ? tx("Slow clock") : tx("End");
      const shows = won || fx >= 2 || demo;
      cards.push({ id: "c-reach", t: target, label: lab, text: shows ? fmt12(target) : "?", k: shows ? "ans" : "now" });
    }
    /* the correction draws the child's own time where it sits (a start found by jumping forward lands after its end) */
    if (fx >= 1 && wrong && isTime) {
      const g = tjParse(wrong.value), hh = Number(g.n[0]), mm = Number(g.n[1]);
      if (g.n[0] !== "" && g.n[1] !== "" && hh >= 1 && hh <= 12 && mm < 60) {
        let t = (hh % 12) * 60 + mm + (g.half === "pm" ? 720 : 0) + (g.day === "next" ? 1440 : 0);
        if (it.kind === "start" && t + 1440 === it.e + it.d) t += 1440;   /* the plan's error: jumped forward, so the start lands after its end */
        if (t !== target) yours = { id: "c-yours", t, label: tx("Your answer"), text: fmt12(t) + (needDay && g.day ? ", " + tx(g.day === "next" ? "next day" : "same day") : "") };
        if (it.kind === "start" && t > it.e) cards.forEach((c) => { if (c.id === "c-end") c.k = "now"; });
      }
    }
  }
  cards.sort((a, b) => a.t - b.t);
  const CW = 250, chH = TJ_CH + 76;
  const tSplit = (s0: string) => { const i = s0.indexOf(" "); return i < 0 ? [s0, ""] : [s0.slice(0, i), s0.slice(i + 1)]; };
  cards.forEach((c) => { const [d0, w0] = tSplit(c.text); c.w = Math.max(CW, tjW(c.label, 40) + 40, tjW(d0, 56) + (w0 ? tjW(" " + w0, 32) : 0) + 40, c.am ? tjW(c.am, 32) + 40 : 0); c.on = c.t >= h0 * 60 && c.t <= h1 * 60; c.cx = Math.max(xl - bpad, Math.min(xr + bpad, X(c.t))); });
  for (let k = 0; k < cards.length; k++) { const left = k ? cards[k - 1].x + cards[k - 1].w + 20 : 8; cards[k].x = Math.max(left, cards[k].cx - cards[k].w / 2); }
  for (let k = cards.length - 1; k >= 0; k--) { const right = k < cards.length - 1 ? cards[k + 1].x - 20 : W0 - 8; if (cards[k].x + cards[k].w > right) cards[k].x = right - cards[k].w; }
  cards.forEach((c) => { cardsRef.current[c.id] = { cx: c.x + c.w / 2 }; });
  if (yours) { yours.w = Math.max(slowB ? 200 : CW, tjW(yours.text, lang === "en" ? 32 : T.micro) + 40, tjW(yours.label, 28) + 40);   /* hi/gu print the time at T.micro: the card fits it, so the slow board keeps room for the jump's pill on its right */ yours.x = slowB ? 472 : Math.max(8, Math.min(W0 - 8 - yours.w, X(yours.t) - yours.w / 2)); yours.on = yours.t >= h0 * 60 && yours.t <= h1 * 60; }

  /* the one key under the line: its label follows the act (PATTERNS §16c) */
  const keyLabel = (on: string) => {
    const H = Math.floor((it.d || 0) / 60), M = (it.d || 0) % 60;
    if (on === "jump-h") return tx("Jump") + " " + H + " " + hU(H);
    if (on === "jump-m") return tx("Jump") + " " + M + " " + tx("min");
    if (on === "back-h") return tx("Back") + " " + H + " " + hU(H);
    if (on === "back-m") return it.kind === "slow" ? tx("Back") : tx("Back") + " " + M + " " + tx("min");
    if (on === "fwd") return tx("Check");
    if (on === "gap") return tx("Find the gap");
    if (on === "to-mid") return tx("To midnight");
    if (on === "jump-on") return tx("Jump on");
    return on;
  };
  const nextAct = !free && it && it.kind !== "long" && !won && !(fx >= 1) && S.done < seq.length ? seq[S.done] : null;
  const keyW = nextAct ? Math.max(300, tjW(keyLabel(nextAct), 32) + 60) : 0;
  const keyBox = nextAct ? (slowB ? { x: 480, y: 96, w: keyW, h: 72 } : { x: W0 / 2 - keyW / 2, y: TJ_KY, w: keyW, h: 72 }) : null;
  const inviteOn = demo ? stepOn : stage === "ask" && !actsDone ? (it.kind === "long" ? (!S.ms ? "mark-s" : !S.me ? "mark-e" : null) : nextAct) : null;

  /* the a.m. / p.m. card (and the day card) at the top left; beside the two clocks on the slow-clock board */
  const pickX = it && it.kind === "slow" ? 470 : 16;
  /* the cards are as wide as their longest word needs (Hindi and Gujarati run longer) */
  const hw = Math.max(150, tjW(tx("a.m."), 40) + 32, tjW(tx("p.m."), 40) + 32), dw = Math.max(200, tjW(tx("same day"), 32) + 32, tjW(tx("next day"), 32) + 32);
  const kg = pickX + 2 * hw + 2 * dw + 48 + 28 + 14 <= W0 ? 24 : 16;   /* key gap: 24, or 16 (ring to key still 10) when the open box is short */
  const pgap = Math.max(16, Math.min(50, W0 - 14 - (pickX + 2 * hw + 2 * dw + 2 * kg)));
  const PX = { am: pickX, pm: pickX + hw + kg, same: pickX + 2 * hw + kg + pgap, next: pickX + 2 * hw + 2 * kg + pgap + dw } as any;
  const showPicks = !free && !demo && isTime && (stage === "ask" || won);
  const pickOff = stage !== "ask" || fixing.current;
  const legend = !free && !isTime && !(fx >= 2) && (() => { let am = false, pm = false; for (let h = h0; h < h1; h++) { if (((h % 24) + 24) % 24 < 12) am = true; else pm = true; } return am && pm; })();

  /* an end time's correction: the minutes that pass the next hour mark (the plan's error) */
  const passed = fx >= 1 && it && it.kind === "end" ? (() => {
    const p0 = it.s + 60 * Math.floor(it.d / 60), hc = Math.ceil((p0 + 1) / 60) * 60, end = it.s + it.d;
    return it.d % 60 === 0 || hc >= end ? null : { a: hc, b: end };
  })() : null;
  /* an arc's geometry: a quadratic from (xa, y0) over the control (cx, cy) to (xb, y1); the check arc starts above its foot so it never
     runs over the small back arc's arrowhead there, and a small arc sharing its foot stays well under it */
  const arcPath = (a: any, k: number) => {
    const fw = arcs.find((q: any) => q.fwd), span = Math.abs(a.b - a.a), fspan = fw ? Math.abs(fw.b - fw.a) : 0, b0 = TJ_BT - 4;
    const xa = X(a.a), xb = X(a.b), base = Math.abs(xb - xa) < 70 ? 14 : 28;
    const hgt = a.fwd ? Math.max(40, b0 - 8.5 - LA) : fw ? Math.max(5, Math.min(base, 0.4 * 90 * span / Math.max(1, fspan))) : base;
    const y0 = a.fwd ? b0 - 34 : b0, y1 = b0, cx = (xa + xb) / 2, cy = b0 - 2 * hgt;
    return { d: `M ${xa} ${y0} Q ${cx} ${cy} ${xb} ${y1}`, xa, xb, y0, y1, cx, cy, ax: cx, ay: 0.25 * y0 + 0.5 * cy + 0.25 * y1, back: xb < xa,
      short: Math.abs(xb - xa) < 60 };
  };
  /* the working of a duration, drawn in the correction (each term its own label) */
  const workRow = (y: number, terms: any[]) => {
    const room = Math.min(kx, W0) - 24, gap = 18;
    const raw = terms.reduce((s, t) => s + tjW(t.s, 40), 0) + gap * (terms.length - 1);
    const size = raw <= room ? 40 : Math.max(28, Math.floor((40 * (room - gap * (terms.length - 1))) / (raw - gap * (terms.length - 1))));   /* hi and gu run longer: the row shrinks to its room, never under 28 */
    const ws = terms.map((t) => tjW(t.s, size));
    const tot = ws.reduce((s, w) => s + w, 0) + gap * (terms.length - 1);
    let x = Math.max(10, Math.min(kx, W0) / 2 - tot / 2);
    return terms.map((t, k) => { const el = <text key={k} x={x + ws[k] / 2} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={t.c || TJ_INK}>{t.s}</text>; x += ws[k] + gap; return el; });
  };
  const durWork = () => {
    if (!it || (it.kind !== "long" && it.kind !== "night") || !(fx >= 2)) return null;
    const a = tjMod(it.s), b = it.e, len = b - it.s;
    const ah = Math.floor(a / 60), amin = a % 60, bh = Math.floor(b / 60), bmin = b % 60;
    if (it.kind === "night") {
      return <g>{workRow(64, [{ s: fmtDur(1440 - it.s) }, { s: "+" }, { s: fmtDur(b - 1440) }, { s: "=" }, { s: fmtDur(len), c: fx >= 3 ? TJ_ANS : TJ_INK }])}</g>;
    }
    const regroup = bmin < amin;
    return (
      <g>
        {regroup && workRow(48, [{ s: bh + " " + tx("h") + " " + bmin + " " + tx("min") }, { s: "=" }, { s: (bh - 1) + " " + tx("h") + " " + (bmin + 60) + " " + tx("min"), c: TJ_JUMP }])}
        {workRow(regroup ? 88 : 80, [{ s: regroup ? (bh - 1) + " " + tx("h") + " " + (bmin + 60) + " " + tx("min") : bh + " " + tx("h") + " " + bmin + " " + tx("min") }, { s: "−" },
          { s: ah + " " + tx("h") + " " + amin + " " + tx("min") }, ...(fx >= 3 ? [{ s: "=" }, { s: fmtDur(len), c: TJ_ANS }] : [])])}
      </g>
    );
  };
  const howLong = !free && it && (it.kind === "long" || it.kind === "night") && (won || fx >= 3);
  const halfRight = it && isTime ? it.answer[2] : null, dayRight = needDay ? it.answer[3] : null;
  const halfWhy = halfRight === "pm" ? tx("after 12 noon") : dayRight === "next" ? tx("after 12 midnight") : tx("before 12 noon");
  /* the reason for the half: beside the a.m. / p.m. keys when they stand alone, under them when the day keys fill the row */
  const hwW = tjW(halfWhy, 32) * 1.15 + 16, besideKeys = !needDay && PX.pm + hw + 28 + hwW <= W0 - 8;
  const hwAt = besideKeys ? { x: PX.pm + hw + 28, y: 54 } : { x: pickX, y: 122 };

  /* ── where each label above the line goes: every pill keeps 8 clear of every arc, pill and label (no label struck by an arc) ── */
  const ndShow = !free && it && (it.kind === "night" || it.kind === "nightEnd") && (won || fx >= 2 || (demo && crossed));
  const tight = W0 < 1000, PF = tight ? T.micro : T.label;   /* with the pad open the pills take one type size down */
  const ndLab = tx("the next day"), ndW = tjW(ndLab, PF) + 28, ndX = (X(1440) + X(h1 * 60)) / 2;
  const PH = (lang === "en" ? 40 : 44) - (tight ? 4 : 0), PT = (lang === "en" ? 11 : 13) - (tight ? 1 : 0);   /* a pill's height and its text's drop: every glyph 4 inside the outline */
  const LB = TJ_BT - 6 - PH / 2, LA = LB - PH - 16, LA2 = LA - PH - 16;   /* the lanes above the line: B just over it, A over B, A2 over A where the top is free */
  const obst: any[] = [];
  if (showPicks) obst.push({ x: pickX - 8, y: 0, w: (needDay ? PX.next + dw : PX.pm + hw) - pickX + 16, h: 84, m: 8 });
  if (isTime && fx >= 3) obst.push(besideKeys ? { x: hwAt.x, y: 20, w: hwW, h: 46 } : { x: pickX, y: 92, w: hwW, h: 44 });
  if (slowB) obst.push({ x: 0, y: 0, w: 466, h: 270 });
  if (fx >= 2 && it && (it.kind === "long" || it.kind === "night")) obst.push({ x: 0, y: 24, w: W0, h: it.kind === "long" ? 172 : 56 });
  if (box && box.key) obst.push({ x: kx, y: 0, w: W0 - kx, h: 92 });
  if (free) obst.push({ x: 0, y: 104, w: W0, h: 84 });
  if (yours && slowB) obst.push({ x: yours.x, y: 138, w: yours.w, h: 94 });
  const geos = arcs.map((a: any, k: number) => arcPath(a, k));
  /* every arrowhead and every tick above the band keeps a clear zone */
  geos.forEach((g: any) => { if (!g.short) obst.push({ x: g.xb - 20, y: g.y1 - 28, w: 40, h: 30, m: 6, head: true }); else obst.push({ x: g.xb - 8, y: TJ_BT - 34, w: 16, h: 16, m: 6, head: true, dot: true }); });
  for (let h = h0; h <= h1; h++) { const hh = ((h % 24) + 24) % 24; if (hh === 0 || hh === 12) obst.push({ x: X(h * 60) - 3, y: TJ_BT - 14, w: 6, h: 14, m: 6 }); }
  cards.forEach((c: any) => { if (c.on) obst.push({ x: X(c.t) - 3, y: TJ_BT - 14, w: 6, h: 8, m: 6 }); });
  /* outline to outline: a pill's stroke reaches 2 outside its box */
  const hit = (r: any, q: any, m = 12) => r.x - m - 2 < q.x + q.w && q.x < r.x + r.w + m + 2 && r.y - m - 2 < q.y + q.h && q.y < r.y + r.h + m + 2;
  const near = (px: number, py: number, q: any, m: number) => px > q.x - m && px < q.x + q.w + m && py > q.y - m && py < q.y + q.h + m;
  const curve = (g: any) => Array.from({ length: 65 }, (_, i) => { const t = i / 64;
    return { x: (1 - t) * (1 - t) * g.xa + 2 * t * (1 - t) * g.cx + t * t * g.xb, y: (1 - t) * (1 - t) * g.y0 + 2 * t * (1 - t) * g.cy + t * t * g.y1 }; });
  const curves = geos.map((g: any) => (g.short ? [] : curve(g)));
  const placed: any[] = [], leads: any[] = [];
  const segPts = (L: any) => Array.from({ length: 13 }, (_, k) => ({ x: L.x1 + (L.x2 - L.x1) * k / 12, y: L.y1 + (L.y2 - L.y1) * k / 12 }));
  /* a pill's spot: the lowest-cost candidate. Cost: off the board; on another pill, key, label, tick or arrowhead (outline to outline);
     on an arc; on a leader; too far from what it names; and its own leader behind a pill, on another leader or on an arrowhead */
  const place = (w: number, cands: any[], own: number, anchor: any, span: any) => {
    let best: any = null;
    cands.forEach((c: any, ci: number) => {
      const r = { x: c.x - w / 2, y: c.y - PH / 2, w, h: PH };
      let bad = ci * 0.001;
      if (r.x < 4 || r.x + r.w > W0 - 4 || r.y < 2 || r.y + r.h > TJ_BT - 6) bad += 10;
      obst.forEach((q: any) => { if (hit(r, q, q.m ?? 12)) bad += 3; });
      placed.forEach((q: any) => { if (hit(r, q, 13)) bad += 3; });
      curves.forEach((pts: any[], j: number) => { if (j !== own || !c.on) { const n = pts.filter((p: any) => near(p.x, p.y, r, 6)).length; if (n) bad += 3 + n; } });
      leads.forEach((L: any) => { if (segPts(L).some((p: any) => near(p.x, p.y, r, 6))) bad += 3; });
      if (span) { const dx = Math.max(0, span[0] - (r.x + r.w), r.x - span[1]); if (dx > 120) bad += 5; }
      let lead: any = null, chosen: any = null;
      if (!c.on && anchor) {
        let lb = 1e9;
        (Array.isArray(anchor) ? anchor : [anchor]).forEach((an: any) => {
          /* a leader leaves its pill at least 6 clear of a rounded corner: down or up inside the straight edge, or from a side's middle when it runs flat */
          const below = an.y > r.y + r.h, cyR = r.y + r.h / 2, outX = an.x < r.x + 18 || an.x > r.x + r.w - 18;
          const L = outX && Math.abs(an.y - cyR) < Math.abs(an.x - (r.x + r.w / 2)) - r.w / 2
            ? { x1: an.x > r.x + r.w / 2 ? r.x + r.w + 2 : r.x - 2, y1: cyR, x2: an.x, y2: an.y }
            : { x1: Math.max(r.x + 18, Math.min(r.x + r.w - 18, an.x)), y1: below ? r.y + r.h + 2 : r.y - 2, x2: an.x, y2: an.y };
          let c2 = Math.hypot(L.x2 - L.x1, L.y2 - L.y1) > 200 ? 5 : 0;
          const pts = segPts(L).slice(2);
          placed.forEach((q: any) => { if (pts.some((p: any) => near(p.x, p.y, q, 6))) c2 += 3; });
          obst.forEach((q: any) => { if (q.dot && near(L.x2, L.y2, q, 0)) return; if (pts.slice(0, -1).some((p: any) => near(p.x, p.y, q, q.head ? 6 : 2))) c2 += 3; });
          curves.forEach((cp: any[]) => { if (pts.slice(0, -2).some((p: any) => cp.some((o: any) => Math.hypot(o.x - p.x, o.y - p.y) < 6))) c2 += 3; });
          leads.forEach((M: any) => { const lp = segPts(M); if (pts.some((p: any) => lp.some((o: any) => Math.hypot(o.x - p.x, o.y - p.y) < 6))) c2 += 3; });
          if (c2 < lb) { lb = c2; lead = L; chosen = an; }
        });
        bad += lb;
      }
      if (!best || bad < best.bad) best = { ...r, cx: c.x, cy: c.y, bad, moved: !c.on, lead, anchor: chosen };
    });
    placed.push(best);
    if (best.lead) leads.push(best.lead);
    return best;
  };
  const around = (x: number, y: number, steps: number[]) => steps.map((dx) => ({ x: x + dx, y }));
  const SPREAD = [0, 40, -40, 80, -80, 120, -120, 180, -180, 240, -240];
  /* the next day: at or after the midnight tick, never over the hours before it */
  const ndMin = X(1440) + ndW / 2 - 4;
  const ndC = (y: number) => [0, 40, 80, 120, 180, 240, 300].map((dx) => ({ x: Math.max(ndMin, ndX) + dx, y })).concat([{ x: ndMin, y }]);
  /* the packed try: every spot along a lane, left to right, so pills sit side by side when the lane is short of room */
  const fine = (w: number, y: number, from = 4 + w / 2) => { const o: any[] = []; for (let x = from; x <= W0 - 4 - w / 2; x += 6) o.push({ x, y }); return o; };
  const ndPlace = (pack = false) => place(ndW, pack ? [...fine(ndW, LA, ndMin), ...fine(ndW, LB, ndMin)] : [...ndC(LA), ...ndC(LB), ...ndC(LA2)], -1, null, null);
  const pillOf = (a: any, k: number, pack = false) => {
    const g = geos[k], hid = (it.kind === "nightEnd" || (it.kind === "slow" && !a.fwd)) && !(won || fx >= 2) && !demo;
    const lab = hid ? tx("Jump") : fmtDur(a.len), w = tjW(lab, PF) + 28, lo = Math.min(g.xa, g.xb), hi2 = Math.max(g.xa, g.xb), room = hi2 - lo - w;
    const onY = g.ay < (LA + LB) / 2 ? LA : LB;   /* a pill on its own arc sits exactly in a lane */
    const on = !g.short && room >= 16 ? [0, room / 4, -room / 4, room / 2 - 4, -room / 2 + 4].map((dx) => ({ x: g.ax + dx, y: onY, on: true })) : [];
    const out = [0, 1, 2, 3].flatMap((j) => [{ x: hi2 + w / 2 + 16 + 40 * j, y: LB }, { x: lo - w / 2 - 16 - 40 * j, y: LB }]);
    /* a narrow arc's leader meets it on its first third, well away from its arrowhead */
    const t3 = 0.3, pt3 = { x: (1 - t3) * (1 - t3) * g.xa + 2 * t3 * (1 - t3) * g.cx + t3 * t3 * g.xb, y: (1 - t3) * (1 - t3) * g.y0 + 2 * t3 * (1 - t3) * g.cy + t3 * t3 * g.y1 };
    const anchors = g.short ? [{ x: g.xb, y: TJ_BT - 26 }] : hi2 - lo < 90 ? [pt3, { x: g.ax, y: g.ay }] : [{ x: g.ax, y: g.ay }, pt3];
    const at = place(w, pack ? [...on, ...fine(w, LA), ...fine(w, LB)] : [...on, ...around(g.ax, LA, SPREAD), ...out, ...around(g.ax, LA2, SPREAD)], k, anchors, [lo, hi2]);
    const anchor = at.anchor || anchors[0];
    const drop = false;   /* every drawn arc keeps its pill */
    return { g, lab, w, at, anchor, drop, col: a.fwd ? TJ_ANS : TJ_JUMP, fwd: !!a.fwd, narrow: hi2 - lo < 70 };
  };
  const wOf = (a: any, k: number) => tjW((it.kind === "nightEnd" || (it.kind === "slow" && !a.fwd)) && !(won || fx >= 2) && !demo ? tx("Jump") : fmtDur(a.len), PF);
  /* the pills are placed one after another; several orders are tried and the one with the fewest clashes kept */
  const wide1 = arcs.map((a: any, k: number) => k).sort((p1: number, p2: number) => wOf(arcs[p2], p2) - wOf(arcs[p1], p1));
  const nat = arcs.map((a: any, k: number) => k);
  const orders = ndShow ? [[-1, ...wide1], [...wide1, -1], [-1, ...wide1.slice().reverse()], [...wide1.slice().reverse(), -1], [-1, ...nat], [...nat, -1]]
    : [wide1, wide1.slice().reverse(), nat, nat.slice().reverse()];
  let bestRun: any = null;
  for (const [order, pack] of [...orders.map((o: number[]) => [o, false]), ...orders.map((o: number[]) => [o, true])] as any[]) {
    if (bestRun && bestRun.cost === 0) break;
    placed.length = 0; leads.length = 0;
    const by: any[] = [];
    let nd: any = null;
    order.forEach((k: number) => { if (k < 0) nd = ndPlace(pack); else by[k] = pillOf(arcs[k], k, pack); });
    const cost = by.reduce((sum: number, p: any) => sum + (p && !p.drop ? Math.floor(p.at.bad) : 0), 0) + (nd ? Math.floor(nd.bad) : 0);
    if (!bestRun || cost < bestRun.cost) bestRun = { cost, by, nd };
  }
  const pills = arcs.map((a: any, k: number) => (bestRun ? bestRun.by[k] : null));
  const ndAt = bestRun ? bestRun.nd : null;
  const ndRect = ndAt ? { x: ndAt.x, y: ndAt.y, w: ndW, h: PH } : { x: 0, y: 0, w: 0, h: 0 };

  return (
    <g onPointerDownCapture={touch}>
      <defs>
        <linearGradient id="tj-top-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="tj-am-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF9EE" />
          <stop offset="100%" stopColor="#FFEACC" />
        </linearGradient>
        <linearGradient id="tj-pm-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDECF0" />
          <stop offset="100%" stopColor="#F5CCD7" />
        </linearGradient>
      </defs>

      {/* the legend of the day band (only when the line shows both halves) */}
      {legend && (
        <g>
          <rect x={16} y={6} width={48} height={40} rx={8} fill={TJ_AM} stroke={TJ_INK} strokeWidth={2} />
          <text x={76} y={40} fontSize={T.prompt} fontWeight={700} fill={TJ_INK}>{tx("a.m.")}</text>
          <rect x={76 + tjW(tx("a.m."), 40) + 40} y={6} width={48} height={40} rx={8} fill={TJ_PM} stroke={TJ_INK} strokeWidth={2} />
          <text x={136 + tjW(tx("a.m."), 40) + 40} y={40} fontSize={T.prompt} fontWeight={700} fill={TJ_INK}>{tx("p.m.")}</text>
        </g>
      )}

      {/* the two clocks of the slow-clock question: the slow one shows nothing until it is found */}
      {it && it.kind === "slow" && (
        <g>
          <TjClock cx={112} cy={112} r={108} hh={10} mm={48} show={won || fx >= 2} />
          <TjClock cx={348} cy={112} r={108} hh={11} mm={0} show />
          <text x={112} y={258} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TJ_INK}>{tx("Slow clock")}</text>
          <text x={348} y={258} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TJ_GIVEN}>{tx("True time")}</text>
        </g>
      )}

      {/* the time line: one band, a.m. warm white and p.m. rose, a mark for every hour, 12 noon and 12 midnight taller */}
      {Array.from({ length: h1 - h0 }, (_, k) => {
        const h = h0 + k, am = ((h % 24) + 24) % 24 < 12;
        const l = k === 0 ? bpad : 0, r = k === h1 - h0 - 1 ? bpad : 0;
        return <rect key={"seg" + k} x={X(h * 60) - l} y={TJ_BT} width={pph + l + r} height={TJ_BB - TJ_BT} fill={am ? "url(#tj-am-band)" : "url(#tj-pm-band)"} />;
      })}
      <rect x={xl - bpad} y={TJ_BT} width={xr - xl + 2 * bpad} height={TJ_BB - TJ_BT} rx={10} fill="none" stroke={TJ_INK} strokeWidth={3} />
      {/* the correction on an end time: the minutes past the next hour mark, washed amber under the numbers */}
      {passed && <rect x={X(passed.a)} y={TJ_BT + 2} width={X(passed.b) - X(passed.a)} height={TJ_BB - TJ_BT - 4} fill={TJ_NOW} fillOpacity={0.3} pointerEvents="none" />}
      {Array.from({ length: h1 - h0 + 1 }, (_, k) => {
        const h = h0 + k, hh = ((h % 24) + 24) % 24, big = hh === 0 || hh === 12, x = X(h * 60);
        return (
          <g key={"tick" + k}>
            {big ? <line x1={x} y1={TJ_BT - 14} x2={x} y2={TJ_BT} stroke={TJ_INK} strokeWidth={5} /> : underPill(x) ? null : <line x1={x} y1={TJ_BT} x2={x} y2={TJ_BT + 12} stroke={TJ_INK} strokeWidth={3} />}
            {!cards.some((c: any) => x > c.x - 14 && x < c.x + c.w + 14) && <line x1={x} y1={TJ_BB} x2={x} y2={TJ_BB + (big ? 12 : 7)} stroke={TJ_INK} strokeWidth={big ? 5 : 3} />}
          </g>
        );
      })}
      {hourLabs.map((L: any, k: number) => {
        const h = L.h, lab = L.lab, wide = L.wide, pw = L.w + 16;
        if (L.skip) return null;
        if (!wide) return <text key={"hl" + k} x={X(h * 60)} y={TJ_BT + 70} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TJ_INK}>{lab}</text>;
        const px = L.px;   /* the word's pill stays 16 inside the band's ends */
        return (
          <g key={"hl" + k}>
            <rect x={px} y={TJ_BT + 3} width={pw} height={38} rx={10} fill="#FFFFFF" fillOpacity={0.9} />
            <text x={px + pw / 2} y={TJ_BT + (lang === "en" ? 31 : 36)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TJ_INK}>{lab}</text>
          </g>
        );
      })}


      {/* the minutes a slow clock loses, one hour at a time */}
      {Array.from({ length: gapShown }, (_, k) => { const gw = tjW(it.rate + " " + tx("min"), 28) + 14, gy = TJ_BT + 3; return (
        <g key={"gap" + k}>
          <rect x={X(it.s + 30 + 60 * k) - gw / 2} y={gy} width={gw} height={38} rx={10} fill="#FFE7B0" filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.08))" />
          <text x={X(it.s + 30 + 60 * k)} y={TJ_BT + (lang === "en" ? 31 : 36)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TJ_NOW_INK}>{it.rate + " " + tx("min")}</text>
        </g>
      ); })}

      {/* the words the next day, after 12 midnight */}
      {ndShow && (() => {
        const lit = won ? TJ_ANS : TJ_NOW, r = ndRect;
        return (
          <g>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={12} fill={lit === TJ_ANS ? "#E2F4EC" : "#FFF3D6"} stroke={lit} strokeWidth={3} filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.08))" />
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 + PT} textAnchor="middle" fontSize={PF} fontWeight={700} fill={lit === TJ_ANS ? TJ_ANS : TJ_NOW_INK}>{ndLab}</text>
          </g>
        );
      })()}

      {/* the jumps: violet arcs, each with its length on a pill placed clear of every other arc; the check jump forward in green */}
      {pills.map((P2: any, k: number) => {
        const g = P2.g, col = P2.col, ah = g.back ? 1 : -1, at = P2.at, an = P2.anchor;
        const L = at.lead;
        return (
          <g key={"arc" + k} pointerEvents="none">
            {/* a jump too short to draw (far out in free play) is named by its pill and a leader to its mark */}
            {!g.short && <path d={g.d} fill="none" stroke={col} strokeWidth={6} strokeLinecap="round" strokeDasharray={P2.fwd ? "14 10" : undefined} />}
            {!g.short && <path d={P2.narrow ? `M ${g.xb} ${g.y1} l ${ah * 4} -16` : `M ${g.xb} ${g.y1} l ${ah * 16} -16 M ${g.xb} ${g.y1} l ${ah * 4} -22`} stroke={col} strokeWidth={6} strokeLinecap="round" fill="none" />}
            {g.short && <circle cx={g.xb} cy={TJ_BT - 26} r={6} fill={col} />}
            {L && !P2.drop && <line x1={L.x1} y1={L.y1} x2={L.x2} y2={L.y2} stroke={col} strokeWidth={2.5} strokeDasharray="5 5" />}
            {!P2.drop && <rect x={at.x} y={at.y} width={at.w} height={PH} rx={12} fill="#FFFFFF" stroke={col} strokeWidth={3} filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.12))" />}
            {!P2.drop && <text x={at.cx} y={at.cy + PT} textAnchor="middle" fontSize={PF} fontWeight={700} fill={col}>{P2.lab}</text>}
          </g>
        );
      })}
      {passChip && (
        <g pointerEvents="none">
          <rect x={passChip.x} y={TJ_BT + 3} width={passChip.w} height={38} rx={10} fill="#FFE7B0" />
          <text x={passChip.x + passChip.w / 2} y={TJ_BT + (lang === "en" ? 31 : 36)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TJ_NOW_INK}>{passChip.lab}</text>
        </g>
      )}

      {/* the cards under the line: a mark on the band, a pin, the card (on phase 1 the cards are what the child taps) */}
      {yours && (() => {
        const yh = lang === "en" ? 84 : 94, yy = slowB ? 138 : 426, cx = yours.x + yours.w / 2, xt = X(yours.t), dv = lang === "en" ? 0 : 3;
        return (
          <g pointerEvents="none">
            {yours.on && <line x1={xt} y1={TJ_BT - 14} x2={xt} y2={TJ_BT - 6} stroke={TJ_NOW} strokeWidth={5} strokeLinecap="round" />}
            {yours.on && <line x1={xt} y1={TJ_BB + 2} x2={xt} y2={TJ_BB + 10} stroke={TJ_NOW} strokeWidth={5} strokeLinecap="round" />}
            <rect x={yours.x} y={yy} width={yours.w} height={yh} rx={18} fill="#FFF3D6" stroke={TJ_NOW} strokeWidth={3} strokeDasharray="12 8" />
            <text x={cx} y={yy + (lang === "en" ? 30 : 32)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={TJ_NOW_INK}>{yours.label}</text>
            <text x={cx} y={yy + (lang === "en" ? 66 : 76)} textAnchor="middle" fontSize={lang === "en" ? T.label : T.micro} fontWeight={700} fill={TJ_NOW_INK}>{yours.text}</text>
          </g>
        );
      })()}
      {cards.map((c) => {
        const t = tone(c.k), x = X(c.t), h = c.am ? chH : TJ_CH, ccx = c.x + c.w / 2, [d0, w0] = tSplit(c.text);
        const body = (
          <g>
            <text x={ccx} y={TJ_CY + 47} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={t.ink}>{c.label}</text>
            <text x={ccx} y={TJ_CY + 108} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={t.ink}><tspan fontSize={T.xl}>{d0}</tspan>{w0 ? <tspan fontSize={T.label}>{" " + w0}</tspan> : null}</text>
            {c.am && <text x={ccx} y={TJ_CY + 156} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TJ_INK}>{c.am}</text>}
            {c.am && <text x={ccx} y={TJ_CY + 192} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={TJ_INK}>{tx("after midnight")}</text>}
          </g>
        );
        return (
          <g key={c.id}>
            {c.on && !arcs.some((a: any) => Math.abs(X(a.b) - x) < 10) && <line x1={x} y1={TJ_BT - 14} x2={x} y2={TJ_BT - 6} stroke={t.st} strokeWidth={6} strokeLinecap="round" />}
            {c.on && x >= c.x + 20 && x <= c.x + c.w - 20 && <path d={`M ${x} ${TJ_BB + 6} V ${TJ_CY}`}
              stroke={t.st} strokeWidth={4} fill="none" strokeLinejoin="round" />}
            {c.ctl && stage !== "win" && stage !== "idle" ? (
              <TjPick id={c.id} x={c.x} y={TJ_CY} w={c.w} h={h} fill={t.fill} stroke={t.st} label={c.label + " " + c.text} onPick={() => doAct(c.id)}>{body}</TjPick>
            ) : (
              <g pointerEvents="none">
                <rect x={c.x} y={TJ_CY + 3} width={c.w} height={h} rx={18} fill="none" filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.08))" />
                <rect x={c.x} y={TJ_CY} width={c.w} height={h} rx={18} fill={t.fill} stroke={t.st} strokeWidth={3} strokeDasharray={c.dash ? "12 8" : undefined} />
                <rect x={c.x + 4} y={TJ_CY + 4} width={c.w - 8} height={Math.max(12, h / 3)} rx={14} fill="url(#tj-top-light)" />
                {body}
              </g>
            )}
            {inviteOn === c.id && <Invite x={ccx} y={TJ_CY + h / 2} w={c.w} h={h} rx={18} C={C} />}
          </g>
        );
      })}

      {/* the one jump key under the line */}
      {keyBox && (
        <g>
          <Key id={nextAct} label={keyLabel(nextAct as string)} x={keyBox.x} y={keyBox.y} w={keyBox.w} h={keyBox.h} C={C} tone="key" onClick={() => doAct(nextAct as string)}>
            <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{keyLabel(nextAct as string)}</text>
          </Key>
          {inviteOn === nextAct && <Invite x={keyBox.x + keyBox.w / 2} y={keyBox.y + keyBox.h / 2} w={keyBox.w} h={keyBox.h} rx={RAD.key} C={C} />}
        </g>
      )}
      {free && (() => {
        const need = Math.max(...FREE_KEYS.map((f) => tjW(f.label, 32))) + 40, one = 4 * need + 3 * 14 <= W0 - 16;
        const kw = one ? need : Math.min(need, (W0 - 30) / 2), per = one ? 4 : 2;
        return FREE_KEYS.map((f, j) => { const row = Math.floor(j / per), col = j % per, tot = per * kw + (per - 1) * 14, x0 = W0 / 2 - tot / 2; return (
          <Key key={"fk" + j} id={f.id} label={f.label} x={x0 + col * (kw + 14)} y={!one && row === 0 ? 110 : TJ_KY} w={kw} h={72} C={C} tone="key" onClick={() => freeAct(f.d)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{f.label}</text>
          </Key>
        ); });
      })()}

      {/* the a.m. / p.m. card and the day card: the half of the day the time sits in, judged with the two boxes */}
      {showPicks && (
        <g>
          {[["am", "a.m.", "#FFFFFF"], ["pm", "p.m.", "#FFFFFF"]].map(([v, lab, fill], j) => (
            <TjPick key={v} id={"half-" + v} x={PX[v]} y={6} w={hw} h={72} on={S.half === v} fill={fill} label={tx(lab)} disabled={pickOff}
              onPick={() => setPick({ half: v })}>
              <text x={PX[v] + hw / 2} y={56} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={TJ_INK}>{tx(lab)}</text>
            </TjPick>
          ))}
          {needDay && [["same", "same day"], ["next", "next day"]].map(([v, lab], j) => (
            <TjPick key={v} id={"day-" + v} x={PX[v]} y={6} w={dw} h={72} on={S.day === v} fill="#FFFFFF" label={tx(lab)} disabled={pickOff}
              onPick={() => setPick({ day: v })}>
              <text x={PX[v] + dw / 2} y={53} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TJ_INK}>{tx(lab)}</text>
            </TjPick>
          ))}
        </g>
      )}

      {/* the correction: drawn over the board, never taking a tap, ending on the whole right answer */}
      {fx >= 1 && (
        <g pointerEvents="none">
          {durWork()}
          {isTime && fx >= 3 && (
            <g>
              <rect x={PX[halfRight] - 6} y={1} width={hw + 12} height={82} rx={22} fill="none" stroke={TJ_ANS} strokeWidth={6} filter="drop-shadow(0px 3px 6px rgba(0,121,90,0.2))" />
              {needDay && <rect x={PX[dayRight] - 6} y={1} width={dw + 12} height={82} rx={22} fill="none" stroke={TJ_ANS} strokeWidth={6} filter="drop-shadow(0px 3px 6px rgba(0,121,90,0.2))" />}
              <text x={hwAt.x} y={hwAt.y} fontSize={T.label} fontWeight={700} fill={TJ_ANS}>{halfWhy}</text>
            </g>
          )}
        </g>
      )}

      {/* how long: the length found, in green, at the foot of the board */}
      {howLong && (() => {
        const lab = fmtDur(it.e - it.s), cap = tx("How long"), w = tjW(lab, 40) + 40, cw = tjW(cap, 30);
        const tot = cw + 16 + w, x0 = W0 / 2 - tot / 2, hy = it.kind === "long" ? 108 : TJ_KY + 4;
        return (
          <g pointerEvents="none">
            <rect x={Math.min(X(it.s), X(it.e))} y={TJ_BB} width={Math.abs(X(it.e) - X(it.s))} height={4} fill={TJ_ANS} />
            <text x={x0 + cw} y={hy + 44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={TJ_ANS}>{cap}</text>
            <g filter="drop-shadow(0px 4px 8px rgba(0,121,90,0.25))">
              <rect x={x0 + cw + 16} y={hy} width={w} height={64} rx={16} fill={TJ_ANS} stroke="#005841" strokeWidth={2} />
              <rect x={x0 + cw + 20} y={hy + 4} width={w - 8} height={20} rx={12} fill="url(#tj-top-light)" />
              <text x={x0 + cw + 16 + w / 2} y={hy + 46} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#FFFFFF">{lab}</text>
            </g>
          </g>
        );
      })()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it || {};
  const g = tjParse(last.value);
  const dur = !item.answer || item.answer.length < 3;
  /* a word is drawn only in English or once TR has it, so a Hindi or Gujarati thumbnail never shows a Latin letter */
  const wd = (k: string) => (lang === "en" || tx(k) !== k ? tx(k) : "");
  const hN = Number(g.n[0] || 0), mN = Number(g.n[1] || 0);
  const parts = dur ? [hN + (wd("h") ? " " + (hN === 1 && lang !== "en" ? wd("hour") : wd("h")) : " :"), mN + (wd("min") ? " " + wd("min") : "")]
    : [g.n[0] + ":" + tjPad(mN), wd(g.half === "pm" ? "p.m." : "a.m.")];
  const room = w - 16 - 18;
  const one = parts.filter(Boolean).join(" ");
  const next = !dur && g.day === "next" ? wd("next day") : "";
  const rows = next ? [lang === "en" ? one : parts[0], next] : tjW(one, 28) <= room ? [one] : parts.filter(Boolean);
  /* one row: as big as the room allows (28 to 32); two rows: 28 each, 28 apart */
  const size = rows.length > 1 ? 28 : Math.max(28, Math.min(32, Math.floor(room / Math.max(1, tjW(one, 1)))));
  const pitch = next ? (lang === "en" ? 25 : lang === "hi" ? 33 : 30) : 34,   /* every ink 6 inside the thumb's outline, the rows 5 apart */ y0 = next ? h / 2 - 6 : rows.length > 1 ? h / 2 - 7 : h / 2 + size * 0.36;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
      <rect x={7} y={8} width={7} height={h - 16} rx={3.5} fill={dur ? TJ_ANS : g.half === "am" ? TJ_AM : TJ_PM} stroke={TJ_INK} strokeWidth={1.5} />
      {rows.map((r: string, k: number) => (
        <text key={k} x={14 + (w - 14) / 2} y={y0 + k * pitch} textAnchor="middle" fontSize={size} fontWeight={700} fill={k === 1 && next ? TJ_INK : TJ_ANS}>{r}</text>
      ))}
    </g>
  );
}

function TimeLineJumps(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default TimeLineJumps;