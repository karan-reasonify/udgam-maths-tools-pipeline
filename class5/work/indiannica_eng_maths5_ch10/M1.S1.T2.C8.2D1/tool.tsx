/* ═══ M1.S1.T2.C8.2D1 · clock_hands · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "clock_hands";
const MEDIA_ID = "M1.S1.T2.C8.2D1";
const TOOL_NAME = "Three Hands Clock";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A round clock with three hands, waiting to be turned."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "You turned the three hands together and read a clock to the second.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Tap Turn, or drag the long hand and the thin hand round the clock.";

/* ── the clock, shared by StartArt, Work and Thumb ─────────────────────────────────────────────
   Time on the clock is t, in seconds after 12:00:00. A hand's angle comes from t, clockwise from the top. */
const TH = { blue: "#0072B2", green: "#009E73", verm: "#D55E00", amber: "#E69F00", violet: "#7E57C2", rose: "#F6CDD4", warm: "#FFFAF0",
  ink: "#2B2B2B", ivory: "#FBF4E2", wood: "#8A5A35" };
const thPol = (cx: number, cy: number, r: number, deg: number) => ({ x: cx + r * Math.sin((deg * Math.PI) / 180), y: cy - r * Math.cos((deg * Math.PI) / 180) });
const thMod = (a: number, b: number) => ((a % b) + b) % b;
const thAng = (t: number) => ({ h: thMod(t, 43200) / 120, m: thMod(t, 3600) / 10, s: thMod(t, 60) * 6 });
const thUnit = (hand: string) => (hand === "s" ? 5 : hand === "m" ? 300 : 3600);   /* seconds a hand moves from one number to the next */
const thStart = (c: any) => (!c ? 0 : c.kind === "half" ? c.h * 3600 + c.m * 60 : c.kind === "noon" ? 12 * 3600 : c.kind === "setm" ? c.h * 3600
  : c.kind === "sets" ? c.h * 3600 + c.m * 60 : c.kind === "free" ? 10 * 3600 + 600 : 0);
const thFinal = (c: any) => (c.kind === "turn" ? 12 * c.turns * thUnit(c.hand) : c.kind === "setm" ? c.h * 3600 + c.to * 300
  : c.kind === "sets" ? c.h * 3600 + c.m * 60 + c.to * 5 : thStart(c));
const thFresh = (c: any, ek: string) => ({ ek, t: thStart(c), num: 0, half: null, done: !!c && (c.kind === "recall" || c.kind === "noon") });
/* the a.m. / p.m. half the child put the card on, this question (judge reads it; Work sets it as it renders) */
let TH_HALF: any = null;
/* the child has touched the board for real (a trusted pointer or key): the answer gate may lock from then on */
let TH_TOUCHED = false;
/* the act nudge, said when the child taps the dimmed Answer key of a question whose act still waits (PATTERNS §19) */
const TH_NUDGE: any = { turn: "Tap the Turn key first.", half: "Drop the card on its half of the bar first.",
  setm: "Drag the minute hand to its number first.", sets: "Drag the thin hand to its number first." };
/* a text's width in px at size fs, Poppins-like: Devanagari and Gujarati marks that take no advance count nothing (PATTERNS §18) */
const thTextW = (str: string, fs: number) => {
  let w = 0;
  for (const ch of String(str)) {
    const c = ch.codePointAt(0) || 0;
    if ((c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || c === 0x962 || c === 0x963
      || (c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || c === 0xae2 || c === 0xae3) continue;
    w += ch === " " ? 0.3 : /[0-9]/.test(ch) ? 0.62 : c >= 0xa80 && c <= 0xaff ? 0.5 : c >= 0x900 ? 0.7 : 0.6;
  }
  return w * fs;
};
/* the size at which a line fits maxW (never above fs, never under the 28 floor) */
const thFitFs = (str: string, fs: number, maxW: number) => Math.max(28, Math.min(fs, Math.floor((fs * maxW) / Math.max(1, thTextW(str, fs)))));

/* one clock: the plain wooden case and ivory face (the fallback), the `clock` skin over it, then the 60 marks, the 12 numbers and the hands
   in ink, drawn in code. o = { cx, cy, Ro, t, hA?, mA?, sA?, sec, litNum?, litHour?, mCtl?, sCtl? }. Called, never mounted. */
const thClock = (o: any) => {
  const { cx, cy, Ro } = o;
  const R = Ro * 0.78;                               /* the ivory face inside the wooden ring */
  const a = thAng(o.t);
  const ha = o.hA != null ? o.hA : a.h, ma = o.mA != null ? o.mA : a.m, sa = o.sA != null ? o.sA : a.s;
  const fs = o.fs || (Ro > 200 ? 44 : Ro > 140 ? 32 : 28);
  const nr = R * 0.84 - fs * 0.62;
  const only4 = Ro <= 140;
  const hl = only4 ? R * 0.52 : Math.min(R * 0.52, nr - fs * 1.05);   /* the hour hand stops short of the number ring */               /* the small clock names 12, 3, 6 and 9 only, so no two numbers touch */
  const hand = (deg: number, len: number, tail: number, w: number, col: string) => {
    const p = thPol(cx, cy, len, deg), q = thPol(cx, cy, -tail, deg);
    return <line x1={q.x} y1={q.y} x2={p.x} y2={p.y} stroke={col} strokeWidth={w} strokeLinecap="round" />;
  };
  const grip = (deg: number, r0: number, r1: number) => {
    const hw = 42, p0 = thPol(cx, cy, r0, deg), p1 = thPol(cx, cy, r1, deg);
    const nx = Math.cos((deg * Math.PI) / 180) * hw, ny = Math.sin((deg * Math.PI) / 180) * hw;
    return `${p0.x - nx},${p0.y - ny} ${p1.x - nx},${p1.y - ny} ${p1.x + nx},${p1.y + ny} ${p0.x + nx},${p0.y + ny}`;
  };
  return (
    <g>
      {/* Outer soft shadow & layered wood frame */}
      <circle cx={cx} cy={cy + 4} r={Ro} fill="rgba(0,0,0,0.08)" />
      <circle cx={cx} cy={cy} r={Ro} fill={TH.wood} stroke="#5D3A20" strokeWidth={Ro > 160 ? 3 : 1.5} />
      <circle cx={cx} cy={cy} r={R} fill={TH.ivory} stroke="#C9A24B" strokeWidth={Ro > 160 ? 6 : 3} />
      <Skin name="clock" x={cx - Ro} y={cy - Ro} w={2 * Ro} h={2 * Ro} />
      {Array.from({ length: 60 }, (_, i) => {
        const big = i % 5 === 0, p = thPol(cx, cy, R * 0.97, i * 6), q = thPol(cx, cy, R * (big ? 0.85 : 0.91), i * 6);
        return <line key={"tk" + i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={TH.ink} strokeWidth={big ? (Ro > 160 ? 5 : 3) : (Ro > 160 ? 2 : 1.5)} strokeLinecap="round" opacity={big ? 0.95 : 0.65} />;
      })}
      {o.litHour && hand(ha, hl - 12, R * 0.08, 30, tint(TH.amber, 0.2))}
      {hand(ha, hl, R * 0.08, Ro > 160 ? 16 : 9, TH.ink)}
      {/* a hand the child drags carries a quiet round handle; when BOTH hands drag (free play) the minute hand's grip is drawn after the
          second hand's, so it can be taken even when the two lie on one line; otherwise the thin second hand lies on top, as on a real clock */}
      {o.mCtl && o.sCtl && o.close ? <g>
      {hand(sa, R * 0.72, R * 0.2, 4, TH.verm)}
      <g {...o.mCtl}><polygon points={grip(ma, R * 0.3, R * 0.86)} fill="transparent" />{hand(ma, R * 0.68, R * 0.1, Ro > 160 ? 10 : 6, TH.ink)}
        {(() => { const q = thPol(cx, cy, R * 0.4, ma); return o.knobs && <circle cx={q.x} cy={q.y} r={13} fill="#FFFFFF" stroke={TH.ink} strokeWidth={4} />; })()}</g>
      <g {...o.sCtl}><polygon points={grip(sa, R * 0.86, R * 0.98)} fill="transparent" />
        {(() => { const q = thPol(cx, cy, R * 0.4, sa); return <g><circle cx={q.x} cy={q.y} r={24} fill="transparent" />{o.knobs && <circle cx={q.x} cy={q.y} r={11} fill="#FFFFFF" stroke={TH.verm} strokeWidth={4} />}</g>; })()}</g>
      </g> : o.mCtl && o.sCtl ? <g>
      {o.sec && (o.sCtl ? <g {...o.sCtl}><polygon points={grip(sa, R * 0.3, R * 0.98)} fill="transparent" />{hand(sa, R * 0.72, R * 0.2, 4, TH.verm)}
        {(() => { const q = thPol(cx, cy, R * 0.4, sa); return o.knobs && <circle cx={q.x} cy={q.y} r={11} fill="#FFFFFF" stroke={TH.verm} strokeWidth={4} />; })()}</g>
        : hand(sa, R * 0.72, R * 0.2, 4, TH.verm))}
      {o.mCtl ? <g {...o.mCtl}><polygon points={grip(ma, R * 0.3, R * 0.86)} fill="transparent" />{hand(ma, R * 0.68, R * 0.1, Ro > 160 ? 10 : 6, TH.ink)}
        {(() => { const q = thPol(cx, cy, R * 0.4, ma); return o.knobs && <circle cx={q.x} cy={q.y} r={13} fill="#FFFFFF" stroke={TH.ink} strokeWidth={4} />; })()}</g>
        : hand(ma, R * 0.68, R * 0.1, Ro > 160 ? 10 : 6, TH.ink)}
      </g> : <g>
      {o.mCtl ? <g {...o.mCtl}><polygon points={grip(ma, R * 0.3, R * 0.86)} fill="transparent" />{hand(ma, R * 0.68, R * 0.1, Ro > 160 ? 10 : 6, TH.ink)}
        {(() => { const q = thPol(cx, cy, R * 0.4, ma); return o.knobs && <circle cx={q.x} cy={q.y} r={13} fill="#FFFFFF" stroke={TH.ink} strokeWidth={4} />; })()}</g>
        : hand(ma, R * 0.68, R * 0.1, Ro > 160 ? 10 : 6, TH.ink)}
      {o.sec && (o.sCtl ? <g {...o.sCtl}><polygon points={grip(sa, R * 0.3, R * 0.98)} fill="transparent" />{hand(sa, R * 0.72, R * 0.2, 4, TH.verm)}
        {(() => { const q = thPol(cx, cy, R * 0.4, sa); return o.knobs && <circle cx={q.x} cy={q.y} r={11} fill="#FFFFFF" stroke={TH.verm} strokeWidth={4} />; })()}</g>
        : hand(sa, R * 0.72, R * 0.2, 4, TH.verm))}
      </g>}
      <circle cx={cx} cy={cy} r={Ro > 160 ? 12 : 7} fill={TH.ink} />
      {o.sec && <circle cx={cx} cy={cy} r={Ro > 160 ? 6 : 3.5} fill={TH.verm} />}
      {/* the numbers stand ABOVE the hands, each on a paper halo, so a hand never cuts one */}
      <g pointerEvents="none">
        {Array.from({ length: 12 }, (_, i) => {
          const k = i + 1, p = thPol(cx, cy, nr, k * 30), lit = o.litNum === k % 12;
          if (only4 && k % 3) return null;
          return (
            <g key={"nm" + k}>
              <circle cx={p.x} cy={p.y} r={fs * 0.62} fill={TH.ivory} />
              {lit && <circle cx={p.x} cy={p.y} r={fs * 0.72} fill={tint(TH.amber, 0.45)} stroke={TH.amber} strokeWidth={4} />}
              <text x={p.x} y={p.y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={TH.ink}
                stroke={lit ? tint(TH.amber, 0.45) : TH.ivory} strokeWidth={fs * 0.22} strokeLinejoin="round" paintOrder="stroke">{k}</text>
            </g>
          );
        })}
      </g>
    </g>
  );
};
/* the hands' names, written beside the clock (never across the face) */
const thLegend = (x: number, y0: number, sec: boolean, tx: any, lang = "en") => [
  { name: "Hour hand", w: 16, col: TH.ink, ink: TH.ink },
  { name: "Minute hand", w: 9, col: TH.ink, ink: TH.ink },
  ...(sec ? [{ name: "Second hand", w: 4, col: TH.verm, ink: shade(TH.verm, 0.25) }] : []),
].map((r, i) => (
  <g key={"lg" + i}>
    <line x1={x} y1={y0 + i * 54} x2={x + (r.w > 10 ? 44 : 64)} y2={y0 + i * 54} stroke={r.col} strokeWidth={r.w} strokeLinecap="round" />
    <text x={x + 84} y={y0 + i * 54 + 12} fontSize={lang === "en" ? T.label : 37} fontWeight={700} fill={r.ink}>{tx(r.name)}</text>
  </g>
));

/* THE START PAGE (docs/LAYOUT.md §1c): the clock the lesson is about, its hands named beside it */
const START_HOOK = "What does each hand of a clock count?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const cx = box.w / 2 - 170, cy = box.h / 2;
  return (
    <g>
      {thClock({ cx, cy, Ro: 168, fs: 28, t: 10 * 3600 + 10 * 60 + 35, sec: true })}
      {thLegend(cx + 220, cy - 54, true, tx, lang)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled at the language pass, keyed by the English byte for byte. */
const TR: any = {
  hi: {
    "Tap the Turn key first.": "पहले घुमाओ बटन दबाओ।",
    "Drop the card on its half of the bar first.": "पहले कार्ड को पट्टी के उसके आधे पर रखो।",
    "Drag the minute hand to its number first.": "पहले मिनट की सुई को उसके अंक तक खींचो।",
    "Drag the thin hand to its number first.": "पहले पतली सुई को उसके अंक तक खींचो।",
    "Put the minute hand on 7.": "मिनट की सुई को 7 पर रखो।",
    "Put the minute hand on 4.": "मिनट की सुई को 4 पर रखो।",
    "Put the minute hand on 6.": "मिनट की सुई को 6 पर रखो।",
    "Put the thin hand on 9.": "पतली सुई को 9 पर रखो।",
    "Put the thin hand on 6.": "पतली सुई को 6 पर रखो।",
    "Put the thin hand on 4.": "पतली सुई को 4 पर रखो।",
    "Time card": "समय कार्ड",
    "a.m. half": "पूर्वाह्न वाला आधा",
    "p.m. half": "अपराह्न वाला आधा",
    "Three Hands Clock": "तीन सुइयों वाली घड़ी",
    "Free play. Tap Turn, or drag the long hand and the thin hand round the clock.": "मुक्त खेल। घुमाओ दबाओ, या लंबी और पतली सुई को घड़ी पर घुमाओ।",
    "What does each hand of a clock count?": "घड़ी की हर सुई क्या गिनती है?",
    "Seconds, minutes, hours and days": "सेकंड, मिनट, घंटे और दिन",
    "Tap Turn to send the thin hand once round the clock.": "पतली सुई को एक चक्कर घुमाने के लिए घुमाओ दबाओ।",
    "Tap the Turn key beside the clock.": "घड़ी के पास वाला घुमाओ बटन दबाओ।",
    "Watch which hand moved, and how far it went.": "देखो कौन सी सुई चली, और कितनी दूर गई।",
    "A full turn of one hand moves the next hand on.": "एक सुई का पूरा चक्कर अगली सुई को आगे बढ़ाता है।",
    "So 60 s make 1 min, 60 min make 1 h, and 1 day is 24 h.": "तो 60 सेकंड का 1 मिनट, 60 मिनट का 1 घंटा, और 24 घंटे का 1 दिन।",
    "You learned: 60 s = 1 min, 60 min = 1 h, and 1 day = 24 h.": "तुमने सीखा: 60 सेकंड = 1 मिनट, 60 मिनट = 1 घंटा, 1 दिन = 24 घंटे।",
    "Tap Turn to send the hour hand twice round; how many hours and days is that?": "घुमाओ दबाओ, घंटे की सुई दो चक्कर लगाएगी; यह कितने घंटे और दिन हुए?",
    "Hours? Days?": "घंटे? दिन?",
    "One turn of the hour hand passes all 12 numbers.": "घंटे की सुई का एक चक्कर सभी 12 अंकों से गुज़रता है।",
    "The hour hand moves 1 h from one number to the next.": "घंटे की सुई एक अंक से अगले तक 1 घंटा चलती है।",
    "Add the hours of both turns, then say how many days that is.": "दोनों चक्करों के घंटे जोड़ो, फिर बताओ कितने दिन हुए।",
    "hours": "घंटे",
    "h": "घं",
    "days": "दिन",
    "Tap Turn: the minute hand goes once round, so how many minutes and hours?": "घुमाओ दबाओ: मिनट की सुई एक चक्कर लगाती है, तो कितने मिनट और घंटे?",
    "Minutes? Hours?": "मिनट? घंटे?",
    "Count 5 min for every number the long hand passes.": "लंबी सुई जिस भी अंक से गुज़रे, उसके 5 मिनट गिनो।",
    "There are 12 numbers on the clock, and each one is 5 min.": "घड़ी पर 12 अंक हैं, और हर अंक 5 मिनट का है।",
    "Look where the hour hand moved to after that one turn.": "देखो उस एक चक्कर के बाद घंटे की सुई कहाँ पहुँची।",
    "minutes": "मिनट",
    "min": "मि",
    "How many times does the hour hand go round the clock in 1 day?": "1 दिन में घंटे की सुई घड़ी के कितने चक्कर लगाती है?",
    "Turns in a day?": "एक दिन में चक्कर?",
    "The hour hand needs 12 h for each trip round.": "घंटे की सुई को हर चक्कर में 12 घंटे लगते हैं।",
    "How many hours make 1 day?": "कितने घंटे मिलकर 1 दिन बनता है?",
    "Find how many 12 h turns fit into one whole day.": "पता करो कि पूरे एक दिन में 12 घंटे वाले कितने चक्कर आते हैं।",
    "a.m. and p.m.": "पूर्वाह्न और अपराह्न",
    "Drag the card 8 o'clock in the morning onto its half of the day bar.": "सुबह 8 बजे वाला कार्ड दिन की पट्टी के उसके आधे हिस्से पर खींचो।",
    "Morning times go in the half before noon.": "सुबह के समय दोपहर से पहले वाले आधे में जाते हैं।",
    "Think of where the sun is at that time of day.": "सोचो, दिन के उस समय सूरज कहाँ होता है।",
    "Morning and afternoon sit on different halves.": "सुबह और दोपहर बाद अलग-अलग आधे हिस्सों में हैं।",
    "So 12 noon and 12 midnight are never written with a.m./p.m.": "दोपहर 12 और आधी रात 12 पर पूर्वाह्न या अपराह्न नहीं लिखते।",
    "You learned: a.m. is before noon, and p.m. is after noon.": "तुमने सीखा: पूर्वाह्न दोपहर से पहले, अपराह्न दोपहर के बाद।",
    "Drop the card 20 min past 2 in the afternoon on its half, then write the time.": "दोपहर बाद 2 बजकर 20 मिनट वाला कार्ड उसके आधे पर रखो, फिर समय लिखो।",
    "The time?": "समय?",
    "Which half of the day is the afternoon in?": "दोपहर बाद का समय दिन के किस आधे में है?",
    "Afternoon times come after 12 noon.": "दोपहर बाद के समय दोपहर 12 बजे के बाद आते हैं।",
    "Type the hour in the first box and the minutes in the next.": "पहले खाने में घंटा और अगले में मिनट लिखो।",
    "hour": "घंटा",
    "Now place the card 20 min past 5 in the morning and write that time.": "अब सुबह 5 बजकर 20 मिनट वाला कार्ड रखो और वह समय लिखो।",
    "That time?": "वह समय?",
    "Is the morning before or after 12 noon?": "सुबह दोपहर 12 बजे से पहले है या बाद में?",
    "The first half of the day starts at 12 midnight.": "दिन का पहला आधा आधी रात 12 बजे शुरू होता है।",
    "Hour first, then the minutes, in the two boxes.": "दोनों खानों में पहले घंटा, फिर मिनट।",
    "Which time ends the first half of the day bar and starts the second half?": "कौन सा समय दिन की पट्टी का पहला आधा खत्म करके दूसरा आधा शुरू करता है?",
    "Where a.m. ends?": "पूर्वाह्न कहाँ खत्म?",
    "Look at the point where the two halves of the bar meet.": "उस जगह को देखो जहाँ पट्टी के दोनों आधे मिलते हैं।",
    "Its name is a word, not one of the two half labels.": "उसका नाम एक शब्द है, दोनों आधों के नामों में से कोई नहीं।",
    "Read the words at the two ends of the bar.": "पट्टी के दोनों सिरों पर लिखे शब्द पढ़ो।",
    "12 noon": "दोपहर 12 बजे",
    "12 p.m.": "12 अपराह्न",
    "12 midnight": "आधी रात 12 बजे",
    "Hour hand and minute hand": "घंटे की सुई और मिनट की सुई",
    "Drag the long hand round to the 3 and watch the short hand move.": "लंबी सुई को 3 तक घुमाओ और छोटी सुई को चलते देखो।",
    "Stop the long hand on 3.": "लंबी सुई को 3 पर रोको।",
    "Look at both hands before you write.": "लिखने से पहले दोनों सुइयाँ देखो।",
    "The short hand creeps on as the long hand goes round.": "लंबी सुई घूमती है तो छोटी सुई धीरे-धीरे आगे खिसकती है।",
    "So the minute hand moves 5 min a number, and the hour hand creeps on too.": "मिनट की सुई हर अंक पर 5 मिनट चलती है, घंटे की सुई भी खिसकती।",
    "You learned: each number is 5 min, and the hour hand moves on too.": "तुमने सीखा: हर अंक 5 मिनट है, और घंटे की सुई भी आगे बढ़ती है।",
    "Drag the minute hand to 7; what time is it?": "मिनट की सुई को 7 तक खींचो; क्या समय हुआ?",
    "What time?": "क्या समय?",
    "Count 5 min for each number the minute hand has passed.": "मिनट की सुई जितने अंक पार कर चुकी, हर एक के 5 मिनट गिनो।",
    "Find the number the short hand has already passed.": "वह अंक ढूँढो जिसे छोटी सुई पार कर चुकी है।",
    "Write the minutes first, then the hour they are past.": "पहले मिनट लिखो, फिर वह घंटा जिसके बाद वे हैं।",
    "past": "के बाद",
    "Drag the minute hand to 4; how many minutes past the hour is that?": "मिनट की सुई को 4 तक खींचो; घंटे के बाद कितने मिनट हुए?",
    "Minutes past?": "कितने मिनट बाद?",
    "Each number is 5 min for the minute hand, not 1 min.": "मिनट की सुई के लिए हर अंक 5 मिनट है, 1 मिनट नहीं।",
    "Count in fives from the top, one five for every number.": "ऊपर से पाँच-पाँच गिनो, हर अंक का एक पाँच।",
    "Multiply the number it points to by 5.": "जिस अंक पर सुई है, उसे 5 से गुणा करो।",
    "Now set the minute hand on 6 and read the time.": "अब मिनट की सुई को 6 पर रखो और समय पढ़ो।",
    "What time now?": "अब क्या समय?",
    "Read the minutes from the long hand and the hour from the short hand.": "मिनट लंबी सुई से पढ़ो और घंटा छोटी सुई से।",
    "Halfway round the clock, the minute hand has passed 6 numbers.": "घड़ी के आधे चक्कर पर मिनट की सुई 6 अंक पार कर चुकी है।",
    "Fives up to the 6 give the minutes; the hour goes in the second box.": "6 तक के पाँच-पाँच मिनट देते हैं; घंटा दूसरे खाने में जाता है।",
    "The second hand": "सेकंड की सुई",
    "Drag the thin second hand round to the 3.": "पतली सेकंड की सुई को 3 तक घुमाओ।",
    "Stop the thin hand on 3.": "पतली सुई को 3 पर रोको।",
    "Find the thin hand first: it counts seconds.": "पहले पतली सुई ढूँढो: वह सेकंड गिनती है।",
    "Count every hand in fives, each in its own unit.": "हर सुई को पाँच-पाँच में गिनो, हर एक अपनी इकाई में।",
    "So the thin hand counts 5 s a number, and a clock is read to the second.": "तो पतली सुई हर अंक पर 5 सेकंड गिनती है, और घड़ी सेकंड तक पढ़ी जाती है।",
    "You learned: the thin hand counts 5 s a number, to read the seconds.": "तुमने सीखा: पतली सुई हर अंक पर 5 सेकंड गिनती है।",
    "Drag the thin hand to 9; with the minute hand on 2, what does the clock show?": "पतली सुई को 9 तक खींचो; मिनट की सुई 2 पर है, घड़ी क्या दिखाती है?",
    "The thin hand counts seconds, 5 s for each number.": "पतली सुई सेकंड गिनती है, हर अंक के 5 सेकंड।",
    "Read the minutes from the long hand, then read the seconds from the thin hand.": "लंबी सुई से मिनट पढ़ो, फिर पतली सुई से सेकंड।",
    "Write minutes, then seconds, then the hour they are past.": "मिनट लिखो, फिर सेकंड, फिर वह घंटा जिसके बाद हैं।",
    "seconds": "सेकंड",
    "s": "से",
    "Drag the thin hand to 6; how many seconds is that?": "पतली सुई को 6 तक खींचो; यह कितने सेकंड हुए?",
    "Seconds?": "सेकंड?",
    "This thin hand is the second hand, so count seconds, not minutes.": "यह पतली सुई सेकंड की सुई है, तो सेकंड गिनो, मिनट नहीं।",
    "Count in fives from the top, a five for every number it passes.": "ऊपर से पाँच-पाँच गिनो, हर पार किए अंक का एक पाँच।",
    "Six numbers of 5 s: work it out.": "6 अंक, हर एक 5 सेकंड: हिसाब लगाओ।",
    "Drag the thin hand to 4, with the minute hand on 9; what does the clock show?": "पतली सुई को 4 तक खींचो, मिनट की सुई 9 पर है; घड़ी क्या दिखाती है?",
    "Read it all?": "पूरा पढ़ो?",
    "Each of the two long hands counts in fives, in its own unit.": "दोनों लंबी सुइयाँ पाँच-पाँच में गिनती हैं, अपनी-अपनी इकाई में।",
    "The hand on 9 shows minutes; the thin one on 4 shows seconds.": "9 वाली सुई मिनट दिखाती है; 4 वाली पतली सुई सेकंड।",
    "Three boxes: the long hand, the thin hand, then the hour.": "तीन खाने: लंबी सुई, पतली सुई, फिर घंटा।",
    "Turn": "घुमाओ",
    "turn": "चक्कर",
    "turns": "चक्कर",
    "Hour hand": "घंटे की सुई",
    "Minute hand": "मिनट की सुई",
    "Second hand": "सेकंड की सुई",
    "a.m.": "पूर्वाह्न",
    "p.m.": "अपराह्न",
    "midnight until before noon": "आधी रात से दोपहर से पहले तक",
    "noon until before midnight": "दोपहर से आधी रात से पहले तक",
    "20 min past 2": "2 बजकर 20 मिनट",
    "20 min past 5": "5 बजकर 20 मिनट",
    "8 o'clock": "8 बजे",
    "afternoon": "दोपहर बाद",
    "morning": "सुबह",
    "24 h, 1 day": "24 घंटे, 1 दिन",
    "60 min, 1 h": "60 मिनट, 1 घंटा",
    "2 turns, 1 day": "2 चक्कर, 1 दिन",
    "2:20 p.m.": "2:20 अपराह्न",
    "5:20 a.m.": "5:20 पूर्वाह्न",
    "35 min past 4": "4 बजकर 35 मिनट",
    "20 min": "20 मिनट",
    "30 min past 3": "3 बजकर 30 मिनट",
    "10 min 45 s": "10 मिनट 45 सेकंड",
    "past 8": "8 बजे के बाद",
    "30 s": "30 सेकंड",
    "45 min 20 s": "45 मिनट 20 सेकंड",
    "past 11": "11 बजे के बाद",
    "Yes, two turns of 12 h make 24 h, which is 1 day.": "हाँ, 12 घंटे के दो चक्कर 24 घंटे हैं, यानी 1 दिन।",
    "Yes, one turn of the minute hand is 60 min, which is 1 h.": "हाँ, मिनट की सुई का एक चक्कर 60 मिनट है, यानी 1 घंटा।",
    "Yes, the hour hand goes twice round in 1 day.": "हाँ, घंटे की सुई 1 दिन में दो चक्कर लगाती है।",
    "Yes, the afternoon is p.m., so it is 2:20 p.m.": "हाँ, दोपहर बाद अपराह्न है, तो 2:20 अपराह्न हुए।",
    "Yes, the morning is a.m., so it is 5:20 a.m.": "हाँ, सुबह पूर्वाह्न है, तो 5:20 पूर्वाह्न हुए।",
    "Yes, it is 12 noon, never written 12 p.m.": "हाँ, यह दोपहर 12 बजे है, इसे 12 अपराह्न नहीं लिखते।",
    "Yes, it is 35 min past 4.": "हाँ, 4 बजकर 35 मिनट हुए।",
    "Yes, 4 numbers of 5 min make 20 min.": "हाँ, 5 मिनट के 4 अंक 20 मिनट बनाते हैं।",
    "Yes, it is 30 min past 3.": "हाँ, 3 बजकर 30 मिनट हुए।",
    "Yes, it is 10 min 45 s past 8.": "हाँ, 8 बजकर 10 मिनट 45 सेकंड।",
    "Yes, 6 numbers of 5 s make 30 s.": "हाँ, 5 सेकंड के 6 अंक 30 सेकंड बनाते हैं।",
    "Yes, it is 45 min 20 s past 11.": "हाँ, 11 बजकर 45 मिनट 20 सेकंड।",
  },
  gu: {
    "Tap the Turn key first.": "પહેલાં ફેરવો બટન દબાવો.",
    "Drop the card on its half of the bar first.": "પહેલાં કાર્ડને પટ્ટીના તેના અડધા ભાગ પર મૂકો.",
    "Drag the minute hand to its number first.": "પહેલાં મિનિટ કાંટાને તેના આંકડા સુધી ખેંચો.",
    "Drag the thin hand to its number first.": "પહેલાં પાતળા કાંટાને તેના આંકડા સુધી ખેંચો.",
    "Put the minute hand on 7.": "મિનિટ કાંટાને 7 પર મૂકો.",
    "Put the minute hand on 4.": "મિનિટ કાંટાને 4 પર મૂકો.",
    "Put the minute hand on 6.": "મિનિટ કાંટાને 6 પર મૂકો.",
    "Put the thin hand on 9.": "પાતળા કાંટાને 9 પર મૂકો.",
    "Put the thin hand on 6.": "પાતળા કાંટાને 6 પર મૂકો.",
    "Put the thin hand on 4.": "પાતળા કાંટાને 4 પર મૂકો.",
    "Time card": "સમય કાર્ડ",
    "a.m. half": "પૂર્વાહ્ન ભાગ",
    "p.m. half": "અપરાહ્ન ભાગ",
    "Three Hands Clock": "ત્રણ કાંટાવાળી ઘડિયાળ",
    "Free play. Tap Turn, or drag the long hand and the thin hand round the clock.": "મુક્ત રમત. ફેરવો દબાવો, અથવા લાંબો અને પાતળો કાંટો ઘડિયાળ પર ફેરવો.",
    "What does each hand of a clock count?": "ઘડિયાળનો દરેક કાંટો શું ગણે છે?",
    "Seconds, minutes, hours and days": "સેકન્ડ, મિનિટ, કલાક અને દિવસ",
    "Tap Turn to send the thin hand once round the clock.": "પાતળા કાંટાને એક ચક્કર ફેરવવા ફેરવો દબાવો.",
    "Tap the Turn key beside the clock.": "ઘડિયાળ પાસેનું ફેરવો બટન દબાવો.",
    "Watch which hand moved, and how far it went.": "જુઓ કયો કાંટો ચાલ્યો, અને કેટલો આગળ ગયો.",
    "A full turn of one hand moves the next hand on.": "એક કાંટાનું પૂરું ચક્કર બીજા કાંટાને આગળ ખસેડે છે.",
    "So 60 s make 1 min, 60 min make 1 h, and 1 day is 24 h.": "તો 60 સેકન્ડની 1 મિનિટ, 60 મિનિટનો 1 કલાક, અને 24 કલાકનો 1 દિવસ.",
    "You learned: 60 s = 1 min, 60 min = 1 h, and 1 day = 24 h.": "તમે શીખ્યા: 60 સેકન્ડ = 1 મિનિટ, 60 મિનિટ = 1 કલાક, 1 દિવસ = 24 કલાક.",
    "Tap Turn to send the hour hand twice round; how many hours and days is that?": "ફેરવો દબાવો, કલાક કાંટો બે ચક્કર ફરશે; એ કેટલા કલાક અને દિવસ થયા?",
    "Hours? Days?": "કલાક? દિવસ?",
    "One turn of the hour hand passes all 12 numbers.": "કલાક કાંટાનું એક ચક્કર બધા 12 આંકડા પસાર કરે છે.",
    "The hour hand moves 1 h from one number to the next.": "કલાક કાંટો એક આંકડાથી બીજા સુધી 1 કલાક ચાલે છે.",
    "Add the hours of both turns, then say how many days that is.": "બંને ચક્કરના કલાક ઉમેરો, પછી કહો કેટલા દિવસ થયા.",
    "hours": "કલાક",
    "h": "ક.",
    "days": "દિવસ",
    "Tap Turn: the minute hand goes once round, so how many minutes and hours?": "ફેરવો દબાવો: મિનિટ કાંટો એક ચક્કર ફરે છે, તો કેટલી મિનિટ અને કલાક?",
    "Minutes? Hours?": "મિનિટ? કલાક?",
    "Count 5 min for every number the long hand passes.": "લાંબો કાંટો જે આંકડો પસાર કરે, તેની 5 મિનિટ ગણો.",
    "There are 12 numbers on the clock, and each one is 5 min.": "ઘડિયાળ પર 12 આંકડા છે, અને દરેક આંકડો 5 મિનિટનો છે.",
    "Look where the hour hand moved to after that one turn.": "જુઓ એ એક ચક્કર પછી કલાક કાંટો ક્યાં પહોંચ્યો.",
    "minutes": "મિનિટ",
    "min": "મિ.",
    "How many times does the hour hand go round the clock in 1 day?": "1 દિવસમાં કલાક કાંટો ઘડિયાળના કેટલા ચક્કર ફરે છે?",
    "Turns in a day?": "એક દિવસમાં ચક્કર?",
    "The hour hand needs 12 h for each trip round.": "કલાક કાંટાને દરેક ચક્કરમાં 12 કલાક લાગે છે.",
    "How many hours make 1 day?": "કેટલા કલાકનો 1 દિવસ થાય?",
    "Find how many 12 h turns fit into one whole day.": "શોધો કે આખા એક દિવસમાં 12 કલાકના કેટલા ચક્કર આવે.",
    "a.m. and p.m.": "પૂર્વાહ્ન અને અપરાહ્ન",
    "Drag the card 8 o'clock in the morning onto its half of the day bar.": "સવારે 8 વાગ્યાનું કાર્ડ દિવસની પટ્ટીના તેના અડધા ભાગ પર ખેંચો.",
    "Morning times go in the half before noon.": "સવારના સમય બપોર પહેલાંના અડધા ભાગમાં જાય છે.",
    "Think of where the sun is at that time of day.": "વિચારો, દિવસના એ સમયે સૂરજ ક્યાં હોય છે.",
    "Morning and afternoon sit on different halves.": "સવાર અને બપોર પછીનો સમય જુદા અડધા ભાગમાં છે.",
    "So 12 noon and 12 midnight are never written with a.m./p.m.": "તો બપોરે 12 અને મધરાતે 12 સાથે પૂર્વાહ્ન કે અપરાહ્ન લખાતું નથી.",
    "You learned: a.m. is before noon, and p.m. is after noon.": "તમે શીખ્યા: પૂર્વાહ્ન બપોર પહેલાં, અપરાહ્ન બપોર પછી.",
    "Drop the card 20 min past 2 in the afternoon on its half, then write the time.": "બપોરે 2 વાગીને 20 મિનિટનું કાર્ડ તેના અડધા ભાગ પર મૂકો, પછી સમય લખો.",
    "The time?": "સમય?",
    "Which half of the day is the afternoon in?": "બપોર પછીનો સમય દિવસના કયા અડધા ભાગમાં છે?",
    "Afternoon times come after 12 noon.": "બપોર પછીના સમય બપોરે 12 પછી આવે છે.",
    "Type the hour in the first box and the minutes in the next.": "પહેલા ખાનામાં કલાક અને પછીનામાં મિનિટ લખો.",
    "hour": "કલાક",
    "Now place the card 20 min past 5 in the morning and write that time.": "હવે સવારે 5 વાગીને 20 મિનિટનું કાર્ડ મૂકો અને એ સમય લખો.",
    "That time?": "એ સમય?",
    "Is the morning before or after 12 noon?": "સવાર બપોરે 12 પહેલાં છે કે પછી?",
    "The first half of the day starts at 12 midnight.": "દિવસનો પહેલો અડધો ભાગ મધરાતે 12 વાગ્યે શરૂ થાય છે.",
    "Hour first, then the minutes, in the two boxes.": "બે ખાનામાં પહેલાં કલાક, પછી મિનિટ.",
    "Which time ends the first half of the day bar and starts the second half?": "કયો સમય દિવસની પટ્ટીનો પહેલો અડધો ભાગ પૂરો કરી બીજો શરૂ કરે છે?",
    "Where a.m. ends?": "પૂર્વાહ્ન ક્યાં પૂરું?",
    "Look at the point where the two halves of the bar meet.": "જ્યાં પટ્ટીના બંને અડધા ભાગ મળે છે તે જગ્યા જુઓ.",
    "Its name is a word, not one of the two half labels.": "તેનું નામ એક શબ્દ છે, બંને ભાગનાં નામમાંથી કોઈ નહીં.",
    "Read the words at the two ends of the bar.": "પટ્ટીના બંને છેડે લખેલા શબ્દો વાંચો.",
    "12 noon": "બપોરે 12",
    "12 p.m.": "12 અપરાહ્ન",
    "12 midnight": "મધરાતે 12",
    "Hour hand and minute hand": "કલાક કાંટો અને મિનિટ કાંટો",
    "Drag the long hand round to the 3 and watch the short hand move.": "લાંબા કાંટાને 3 સુધી ફેરવો અને નાના કાંટાને ચાલતો જુઓ.",
    "Stop the long hand on 3.": "લાંબા કાંટાને 3 પર રોકો.",
    "Look at both hands before you write.": "લખતાં પહેલાં બંને કાંટા જુઓ.",
    "The short hand creeps on as the long hand goes round.": "લાંબો કાંટો ફરે ત્યારે નાનો કાંટો ધીમે ધીમે આગળ ખસે છે.",
    "So the minute hand moves 5 min a number, and the hour hand creeps on too.": "તો મિનિટ કાંટો દરેક આંકડે 5 મિનિટ ચાલે છે, અને કલાક કાંટો પણ ખસે છે.",
    "You learned: each number is 5 min, and the hour hand moves on too.": "તમે શીખ્યા: દરેક આંકડો 5 મિનિટ છે, અને કલાક કાંટો પણ આગળ વધે છે.",
    "Drag the minute hand to 7; what time is it?": "મિનિટ કાંટાને 7 સુધી ખેંચો; કેટલા વાગ્યા?",
    "What time?": "કેટલા વાગ્યા?",
    "Count 5 min for each number the minute hand has passed.": "મિનિટ કાંટો જેટલા આંકડા પસાર કરી ચૂક્યો, દરેકની 5 મિનિટ ગણો.",
    "Find the number the short hand has already passed.": "તે આંકડો શોધો જે નાનો કાંટો પસાર કરી ચૂક્યો છે.",
    "Write the minutes first, then the hour they are past.": "પહેલાં મિનિટ લખો, પછી તે કલાક જેના પછીની છે.",
    "past": "પછી",
    "Drag the minute hand to 4; how many minutes past the hour is that?": "મિનિટ કાંટાને 4 સુધી ખેંચો; કલાક પછી કેટલી મિનિટ થઈ?",
    "Minutes past?": "કેટલી મિનિટ પછી?",
    "Each number is 5 min for the minute hand, not 1 min.": "મિનિટ કાંટા માટે દરેક આંકડો 5 મિનિટ છે, 1 મિનિટ નહીં.",
    "Count in fives from the top, one five for every number.": "ઉપરથી પાંચ-પાંચ ગણો, દરેક આંકડાના પાંચ.",
    "Multiply the number it points to by 5.": "કાંટો જે આંકડા પર છે, તેને 5 વડે ગુણો.",
    "Now set the minute hand on 6 and read the time.": "હવે મિનિટ કાંટાને 6 પર મૂકો અને સમય વાંચો.",
    "What time now?": "હવે કેટલા વાગ્યા?",
    "Read the minutes from the long hand and the hour from the short hand.": "મિનિટ લાંબા કાંટાથી વાંચો અને કલાક નાના કાંટાથી.",
    "Halfway round the clock, the minute hand has passed 6 numbers.": "ઘડિયાળના અડધા ચક્કરે મિનિટ કાંટો 6 આંકડા પસાર કરી ચૂક્યો છે.",
    "Fives up to the 6 give the minutes; the hour goes in the second box.": "6 સુધીના પાંચ-પાંચ મિનિટ આપે છે; કલાક બીજા ખાનામાં જાય છે.",
    "The second hand": "સેકન્ડ કાંટો",
    "Drag the thin second hand round to the 3.": "પાતળા સેકન્ડ કાંટાને 3 સુધી ફેરવો.",
    "Stop the thin hand on 3.": "પાતળા કાંટાને 3 પર રોકો.",
    "Find the thin hand first: it counts seconds.": "પહેલાં પાતળો કાંટો શોધો: તે સેકન્ડ ગણે છે.",
    "Count every hand in fives, each in its own unit.": "દરેક કાંટાને પાંચ-પાંચમાં ગણો, દરેક પોતાના એકમમાં.",
    "So the thin hand counts 5 s a number, and a clock is read to the second.": "તો પાતળો કાંટો દરેક આંકડે 5 સેકન્ડ ગણે છે, અને ઘડિયાળ સેકન્ડ સુધી વંચાય છે.",
    "You learned: the thin hand counts 5 s a number, to read the seconds.": "તમે શીખ્યા: પાતળો કાંટો દરેક આંકડે 5 સેકન્ડ ગણે છે.",
    "Drag the thin hand to 9; with the minute hand on 2, what does the clock show?": "પાતળા કાંટાને 9 સુધી ખેંચો; મિનિટ કાંટો 2 પર છે, ઘડિયાળ શું બતાવે છે?",
    "The thin hand counts seconds, 5 s for each number.": "પાતળો કાંટો સેકન્ડ ગણે છે, દરેક આંકડાની 5 સેકન્ડ.",
    "Read the minutes from the long hand, then read the seconds from the thin hand.": "લાંબા કાંટાથી મિનિટ વાંચો, પછી પાતળા કાંટાથી સેકન્ડ.",
    "Write minutes, then seconds, then the hour they are past.": "મિનિટ લખો, પછી સેકન્ડ, પછી તે કલાક જેના પછી છે.",
    "seconds": "સેકન્ડ",
    "s": "સે.",
    "Drag the thin hand to 6; how many seconds is that?": "પાતળા કાંટાને 6 સુધી ખેંચો; એ કેટલી સેકન્ડ થઈ?",
    "Seconds?": "સેકન્ડ?",
    "This thin hand is the second hand, so count seconds, not minutes.": "આ પાતળો કાંટો સેકન્ડ કાંટો છે, તો સેકન્ડ ગણો, મિનિટ નહીં.",
    "Count in fives from the top, a five for every number it passes.": "ઉપરથી પાંચ-પાંચ ગણો, પસાર કરેલા દરેક આંકડાના પાંચ.",
    "Six numbers of 5 s: work it out.": "6 આંકડા, દરેક 5 સેકન્ડ: ગણતરી કરો.",
    "Drag the thin hand to 4, with the minute hand on 9; what does the clock show?": "પાતળા કાંટાને 4 સુધી ખેંચો, મિનિટ કાંટો 9 પર છે; ઘડિયાળ શું બતાવે છે?",
    "Read it all?": "આખું વાંચો?",
    "Each of the two long hands counts in fives, in its own unit.": "બંને લાંબા કાંટા પાંચ-પાંચમાં ગણે છે, પોતપોતાના એકમમાં.",
    "The hand on 9 shows minutes; the thin one on 4 shows seconds.": "9 પરનો કાંટો મિનિટ બતાવે છે; 4 પરનો પાતળો કાંટો સેકન્ડ.",
    "Three boxes: the long hand, the thin hand, then the hour.": "ત્રણ ખાના: લાંબો કાંટો, પાતળો કાંટો, પછી કલાક.",
    "Turn": "ફેરવો",
    "turn": "ચક્કર",
    "turns": "ચક્કર",
    "Hour hand": "કલાક કાંટો",
    "Minute hand": "મિનિટ કાંટો",
    "Second hand": "સેકન્ડ કાંટો",
    "a.m.": "પૂર્વાહ્ન",
    "p.m.": "અપરાહ્ન",
    "midnight until before noon": "મધરાતથી બપોર પહેલાં સુધી",
    "noon until before midnight": "બપોરથી મધરાત પહેલાં સુધી",
    "20 min past 2": "2 વાગીને 20 મિનિટ",
    "20 min past 5": "5 વાગીને 20 મિનિટ",
    "8 o'clock": "8 વાગ્યે",
    "afternoon": "બપોર પછી",
    "morning": "સવાર",
    "24 h, 1 day": "24 કલાક, 1 દિવસ",
    "60 min, 1 h": "60 મિનિટ, 1 કલાક",
    "2 turns, 1 day": "2 ચક્કર, 1 દિવસ",
    "2:20 p.m.": "2:20 અપરાહ્ન",
    "5:20 a.m.": "5:20 પૂર્વાહ્ન",
    "35 min past 4": "4 વાગીને 35 મિનિટ",
    "20 min": "20 મિનિટ",
    "30 min past 3": "3 વાગીને 30 મિનિટ",
    "10 min 45 s": "10 મિનિટ 45 સેકન્ડ",
    "past 8": "8 વાગ્યા પછી",
    "30 s": "30 સેકન્ડ",
    "45 min 20 s": "45 મિનિટ 20 સેકન્ડ",
    "past 11": "11 વાગ્યા પછી",
    "Yes, two turns of 12 h make 24 h, which is 1 day.": "હા, 12 કલાકના બે ચક્કર 24 કલાક છે, એટલે 1 દિવસ.",
    "Yes, one turn of the minute hand is 60 min, which is 1 h.": "હા, મિનિટ કાંટાનું એક ચક્કર 60 મિનિટ છે, એટલે 1 કલાક.",
    "Yes, the hour hand goes twice round in 1 day.": "હા, કલાક કાંટો 1 દિવસમાં બે ચક્કર ફરે છે.",
    "Yes, the afternoon is p.m., so it is 2:20 p.m.": "હા, બપોર પછી અપરાહ્ન છે, તો 2:20 અપરાહ્ન થયા.",
    "Yes, the morning is a.m., so it is 5:20 a.m.": "હા, સવાર પૂર્વાહ્ન છે, તો 5:20 પૂર્વાહ્ન થયા.",
    "Yes, it is 12 noon, never written 12 p.m.": "હા, આ બપોરે 12 છે, તેને 12 અપરાહ્ન લખાતું નથી.",
    "Yes, it is 35 min past 4.": "હા, 4 વાગીને 35 મિનિટ થઈ.",
    "Yes, 4 numbers of 5 min make 20 min.": "હા, 5 મિનિટના 4 આંકડા 20 મિનિટ બનાવે છે.",
    "Yes, it is 30 min past 3.": "હા, 3 વાગીને 30 મિનિટ થઈ.",
    "Yes, it is 10 min 45 s past 8.": "હા, 8 વાગીને 10 મિનિટ 45 સેકન્ડ થઈ.",
    "Yes, 6 numbers of 5 s make 30 s.": "હા, 5 સેકન્ડના 6 આંકડા 30 સેકન્ડ બનાવે છે.",
    "Yes, it is 45 min 20 s past 11.": "હા, 11 વાગીને 45 મિનિટ 20 સેકન્ડ થઈ.",
  },
};

/* One entry per phase = one mount. Items carry their clock: kind (turn | recall | half | noon | setm | sets), the hand turned and how many
   turns, the start time (h, m), the number a hand is dragged to (to), the half of the day (half); show = the reading drawn at the win and at the
   end of a correction (labels of at most 4 words), thumb = the summary drawing's lines, win = the win line, near = the misconception. */
const PHASES = [
  {
    n: 1,
    concept: "Seconds, minutes, hours and days",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: [],
    steps: [{ say: "Tap Turn to send the thin hand once round the clock.", on: "turn", hint: "Tap the Turn key beside the clock." }],
    ladder: ["Watch which hand moved, and how far it went.", "A full turn of one hand moves the next hand on."],
    closing: "So 60 s make 1 min, 60 min make 1 h, and 1 day is 24 h.",
    learned: "You learned: 60 s = 1 min, 60 min = 1 h, and 1 day = 24 h.",
    traceback: "The hand is turned round again, its hours or minutes counted in a tag, and the reading ends on the whole answer.",
    items: [
      /* learn HC1: answer in the plan = 24 h, which is 1 day. */
      { qid: "M1.S1.T2.C5:HC1", kind: "turn", hand: "h", turns: 2, parts: [{ label: "hours", unit: "h" }, { label: "days" }], answer: [24, 1], near: [24, 2],
        say: "Tap Turn to send the hour hand twice round; how many hours and days is that?",
        ask: "Hours? Days?", miss: "One turn of the hour hand passes all 12 numbers.",
        ladder: ["The hour hand moves 1 h from one number to the next.", "Add the hours of both turns, then say how many days that is."],
        win: "Yes, two turns of 12 h make 24 h, which is 1 day.", show: ["24 h, 1 day"], thumb: ["12+12=24"] },
      /* practice 1: answer in the plan = 60 min, which is 1 h */
      { qid: "M1.S1.T2.C5:1", kind: "turn", hand: "m", turns: 1, parts: [{ label: "minutes", unit: "min" }, { label: "hours", unit: "h" }], answer: [60, 1], near: [100, 1],
        say: "Tap Turn: the minute hand goes once round, so how many minutes and hours?",
        ask: "Minutes? Hours?", miss: "Count 5 min for every number the long hand passes.",
        ladder: ["There are 12 numbers on the clock, and each one is 5 min.", "Look where the hour hand moved to after that one turn."],
        win: "Yes, one turn of the minute hand is 60 min, which is 1 h.", show: ["60 min, 1 h"], thumb: ["12×5=60"] },
      /* practice 5: answer in the plan = Twice, because 1 day is 24 h and one turn of the hour hand is 12 h */
      { qid: "M1.S1.T2.C5:5", kind: "recall", answer: 2, near: 1,
        say: "How many times does the hour hand go round the clock in 1 day?", ask: "Turns in a day?",
        miss: "The hour hand needs 12 h for each trip round.",
        ladder: ["How many hours make 1 day?", "Find how many 12 h turns fit into one whole day."],
        win: "Yes, the hour hand goes twice round in 1 day.", show: ["2 turns, 1 day"], thumb: ["2×12=24"] },
    ],
  },
  {
    n: 2,
    concept: "a.m. and p.m.",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: [],
    steps: [{ say: "Drag the card 8 o'clock in the morning onto its half of the day bar.", on: "am", hint: "Morning times go in the half before noon." }],
    ladder: ["Think of where the sun is at that time of day.", "Morning and afternoon sit on different halves."],
    closing: "So 12 noon and 12 midnight are never written with a.m./p.m.",
    learned: "You learned: a.m. is before noon, and p.m. is after noon.",
    traceback: "The right half of the day bar lights amber with its span written under it, and the time is written with a.m. or p.m.",
    items: [
      /* learn HC2: answer in the plan = p.m., so 2:20 p.m. (owner: parts h | min plus the a.m. / p.m. card, judged once both are given) */
      { qid: "M1.S1.T2.C6:HC2", kind: "half", h: 2, m: 20, half: "pm", card: ["20 min past 2", "afternoon"],
        parts: [{ label: "hour" }, { label: "minutes", unit: "min" }], answer: [2, 20], near: "2|20|am", forms: ["2:20 p.m."],
        say: "Drop the card 20 min past 2 in the afternoon on its half, then write the time.",
        ask: "The time?", miss: "Which half of the day is the afternoon in?",
        ladder: ["Afternoon times come after 12 noon.", "Type the hour in the first box and the minutes in the next."],
        win: "Yes, the afternoon is p.m., so it is 2:20 p.m.", show: ["2:20 p.m."], thumb: ["2:20"] },
      /* practice 2: answer in the plan = a.m., so 5:20 a.m. */
      { qid: "M1.S1.T2.C6:2", kind: "half", h: 5, m: 20, half: "am", card: ["20 min past 5", "morning"],
        parts: [{ label: "hour" }, { label: "minutes", unit: "min" }], answer: [5, 20], near: "5|20|pm", forms: ["5:20 a.m."],
        say: "Now place the card 20 min past 5 in the morning and write that time.",
        ask: "That time?", miss: "Is the morning before or after 12 noon?",
        ladder: ["The first half of the day starts at 12 midnight.", "Hour first, then the minutes, in the two boxes."],
        win: "Yes, the morning is a.m., so it is 5:20 a.m.", show: ["5:20 a.m."], thumb: ["5:20"] },
      /* practice 6: answer in the plan = 12 noon. a.m. runs from midnight until just before noon, and p.m. from noon until just before midnight */
      { qid: "M1.S1.T2.C6:6", kind: "noon", choices: [{ id: "noon", label: "12 noon" }, { id: "pm", label: "12 p.m." }, { id: "midnight", label: "12 midnight" }],
        answer: "noon", near: "pm", forms: ["12 noon"],
        say: "Which time ends the first half of the day bar and starts the second half?", ask: "Where a.m. ends?",
        miss: "Look at the point where the two halves of the bar meet.",
        ladder: ["Its name is a word, not one of the two half labels.", "Read the words at the two ends of the bar."],
        win: "Yes, it is 12 noon, never written 12 p.m.", show: ["12 noon"], thumb: ["12:00"] },
    ],
  },
  {
    n: 3,
    concept: "Hour hand and minute hand",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: [],
    steps: [{ say: "Drag the long hand round to the 3 and watch the short hand move.", on: "minute-hand", hint: "Stop the long hand on 3." }],
    ladder: ["Look at both hands before you write.", "The short hand creeps on as the long hand goes round."],
    closing: "So the minute hand moves 5 min a number, and the hour hand creeps on too.",
    learned: "You learned: each number is 5 min, and the hour hand moves on too.",
    traceback: "A violet minute hand walks round from the top in fives with a tag counting 5 min a number, the hour the hand has passed lights amber, and the reading ends on the whole answer.",
    items: [
      /* learn HC3: answer in the plan = 35 min past 4. */
      { qid: "M1.S1.T2.C7:HC3", kind: "setm", h: 4, to: 7, put: "Put the minute hand on 7.", parts: [{ label: "minutes", unit: "min" }, { label: "past" }], answer: [35, 4], near: [35, 5],
        say: "Drag the minute hand to 7; what time is it?",
        ask: "What time?", miss: "Count 5 min for each number the minute hand has passed.",
        ladder: ["Find the number the short hand has already passed.", "Write the minutes first, then the hour they are past."],
        win: "Yes, it is 35 min past 4.", show: ["35 min past 4"], thumb: ["7×5=35"] },
      /* practice 3: answer in the plan = 20 min, because 4 x 5 = 20 */
      { qid: "M1.S1.T2.C7:3", kind: "setm", h: 7, to: 4, put: "Put the minute hand on 4.", answer: 20, near: 4,
        say: "Drag the minute hand to 4; how many minutes past the hour is that?", ask: "Minutes past?",
        miss: "Each number is 5 min for the minute hand, not 1 min.",
        ladder: ["Count in fives from the top, one five for every number.", "Multiply the number it points to by 5."],
        win: "Yes, 4 numbers of 5 min make 20 min.", show: ["20 min"], thumb: ["4×5=20"] },
      /* practice 7: answer in the plan = 30 min past 3, because 6 x 5 = 30 */
      { qid: "M1.S1.T2.C7:7", kind: "setm", h: 3, to: 6, put: "Put the minute hand on 6.", parts: [{ label: "minutes", unit: "min" }, { label: "past" }], answer: [30, 3], near: [30, 4],
        say: "Now set the minute hand on 6 and read the time.",
        ask: "What time now?", miss: "Read the minutes from the long hand and the hour from the short hand.",
        ladder: ["Halfway round the clock, the minute hand has passed 6 numbers.", "Fives up to the 6 give the minutes; the hour goes in the second box."],
        win: "Yes, it is 30 min past 3.", show: ["30 min past 3"], thumb: ["6×5=30"] },
    ],
  },
  {
    n: 4,
    concept: "The second hand",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: [],
    steps: [{ say: "Drag the thin second hand round to the 3.", on: "second-hand", hint: "Stop the thin hand on 3." }],
    ladder: ["Find the thin hand first: it counts seconds.", "Count every hand in fives, each in its own unit."],
    closing: "So the thin hand counts 5 s a number, and a clock is read to the second.",
    learned: "You learned: the thin hand counts 5 s a number, to read the seconds.",
    traceback: "A vermilion second hand walks round in fives with a tag counting 5 s a number, then the minutes are counted in violet, and the reading ends on the whole answer.",
    items: [
      /* learn HC4: answer in the plan = 10 min 45 s past 8. */
      { qid: "M1.S1.T2.C8:HC4", kind: "sets", h: 8, m: 10, to: 9, put: "Put the thin hand on 9.", parts: [{ label: "minutes", unit: "min" }, { label: "seconds", unit: "s" }, { label: "past" }],
        answer: [10, 45, 8], near: [10, 0, 8],
        say: "Drag the thin hand to 9; with the minute hand on 2, what does the clock show?",
        ask: "What time?", miss: "The thin hand counts seconds, 5 s for each number.",
        ladder: ["Read the minutes from the long hand, then read the seconds from the thin hand.", "Write minutes, then seconds, then the hour they are past."],
        win: "Yes, it is 10 min 45 s past 8.", show: ["10 min 45 s", "past 8"], thumb: ["9×5=45"] },
      /* practice 4: answer in the plan = 30 s, because 6 x 5 = 30 */
      { qid: "M1.S1.T2.C8:4", kind: "sets", h: 2, m: 0, to: 6, put: "Put the thin hand on 6.", answer: 30, near: 6,
        say: "Drag the thin hand to 6; how many seconds is that?", ask: "Seconds?",
        miss: "This thin hand is the second hand, so count seconds, not minutes.",
        ladder: ["Count in fives from the top, a five for every number it passes.", "Six numbers of 5 s: work it out."],
        win: "Yes, 6 numbers of 5 s make 30 s.", show: ["30 s"], thumb: ["6×5=30"] },
      /* practice 8: answer in the plan = 45 min 20 s past 11, because 9 x 5 = 45 and 4 x 5 = 20 */
      { qid: "M1.S1.T2.C8:8", kind: "sets", h: 11, m: 45, to: 4, put: "Put the thin hand on 4.", parts: [{ label: "minutes", unit: "min" }, { label: "seconds", unit: "s" }, { label: "past" }],
        answer: [45, 20, 11], near: [45, 0, 11],
        say: "Drag the thin hand to 4, with the minute hand on 9; what does the clock show?",
        ask: "Read it all?", miss: "Each of the two long hands counts in fives, in its own unit.",
        ladder: ["The hand on 9 shows minutes; the thin one on 4 shows seconds.", "Three boxes: the long hand, the thin hand, then the hour."],
        win: "Yes, it is 45 min 20 s past 11.", show: ["45 min 20 s", "past 11"], thumb: ["4×5=20"] },
    ],
  },
];

/* The warm-up each phase's guide step works (never question 1's own clock), and the clock's size. */
const MODEL: any = {
  warm: {
    1: { kind: "turn", hand: "s", turns: 1 },
    2: { kind: "half", h: 8, m: 0, half: "am", card: ["8 o'clock", "morning"] },
    3: { kind: "setm", h: 6, to: 3 },
    4: { kind: "sets", h: 7, m: 0, to: 3 },
  },
  clock: { bigCase: 250, smallCase: 112, face: 0.78 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a 12-hour time (kind half) is right only when the hour, the minutes AND the half of the day are right. The half is the card the
   child placed (TH_HALF), or a third token in the value ("2|20|pm", the agent's own form); an array is a machine's answer key. */
const judge = (item: any, v: any) => {
  if (item.kind === "half") {
    const ps = (Array.isArray(v) ? v : String(v ?? "").split("|")).map((x: any) => String(x ?? "").trim());
    const half = ps[2] ? (/p/i.test(ps[2]) ? "pm" : "am") : Array.isArray(v) ? item.half : TH_HALF;
    return judgeSlotParts(item, ps.slice(0, 2).join("|")) && half === item.half;
  }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the item's own clock (the hand, its turns, the numbers it points to), sharing no code with judge */
const oracleOf = (it: any) => {
  if (it.kind === "turn") return it.hand === "h" ? [12 * it.turns, (12 * it.turns) / 24] : [60 * it.turns, it.turns];
  if (it.kind === "recall") return 24 / 12;
  if (it.kind === "half") return (it.card[1] === "morning" ? "am" : "pm") === it.half && it.h < 12 ? [it.h, it.m] : null;
  if (it.kind === "noon") return "noon";
  if (it.kind === "setm") return it.parts ? [it.to * 5, it.h] : it.to * 5;
  if (it.kind === "sets") return it.parts ? [it.m, it.to * 5, it.h] : it.to * 5;
  return null;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => JSON.stringify(oracleOf(it)) === JSON.stringify(it.answer)));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => { if (item.kind === "half" && HOOK.setHalf) HOOK.setHalf(item.half === "pm" ? "am" : "pm"); return item.near; };
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.forms ? item.forms
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : (HOOK.actNow && HOOK.actNow(), T.submit(item.answer)));
/* the agent's answer(): it performs the question's act at once (turn, drag, place the card), then the runtime types the value;
   a 12-hour time takes its half from the value ("2|20|pm") or the item */
const answer = (item: any, v: any) => {
  if (HOOK.actNow) HOOK.actNow(v);
  return undefined;
};
/* the agent's check() before Enter: the act is performed if it still waits, then Enter */
const check = () => { if (HOOK.actNow) HOOK.actNow(); return undefined; };

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 shut, 900 x 520 open (bigPad). The picture is laid out for 900 and centred on the shut board (ox), so it
   keeps its size whether the keypad is open or shut, and stays clear of the key's corner (box.key). */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && !!(phase.steps && phase.steps.length) && (stage === "demo" || stage === "teach");
  const cfg: any = free ? { kind: "free" } : warm ? MODEL.warm[n] : item;
  const k = cfg.kind;

  /* the board belongs to the ENTRY (a question entered again opens fresh), derived in render */
  const qk = n + ":" + (free ? "f" : warm ? "w" : index);
  const entry = useRef({ qk: "", e: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, e: entry.current.e + 1, at: Date.now() } as any;
  const ek = qk + "#" + entry.current.e;
  const [raw, setRaw] = useState<any>({ ek: "" });
  const S = raw.ek === ek ? raw : thFresh(cfg, ek);
  const put = (patch: any) => setRaw((p: any) => ({ ...(p.ek === ek ? p : thFresh(cfg, ek)), ...patch }));
  const [dm0, setDm] = useState<any>(null);              /* the correction's drawing (a layer of its own) */
  const dm = dm0 && dm0.ek === ek ? dm0 : null;
  const busy = useRef(false);
  /* a tap or Enter that lands within 900 ms of a question opening is the second half of a double tap on the last guide step: ignored; and
     one press is one act (400 ms), as on every runtime key */
  const lastPress = useRef(0);
  const justOpened = () => stage === "ask" && Date.now() - ((entry.current as any).at || 0) < 900;
  const pressOk = () => { const t = Date.now(); if (justOpened() || t - lastPress.current < 400) return false; lastPress.current = t; return true; };
  TH_HALF = k === "half" ? S.half : null;
  useEffect(() => () => { tl.stop(); busy.current = false; }, [ek]);

  /* layout */
  const ox = Math.max(0, Math.min(286, (box.w - 900) / 2));
  const small = k === "half" || k === "noon";
  const G = small ? { cx: ox + 132, cy: 116, Ro: 112 } : { cx: ox + 270, cy: 260, Ro: 250 };
  const R = G.Ro * 0.78;
  const X0 = ox + 540;
  const at = (p: any) => thMod((Math.atan2(p.x - G.cx, -(p.y - G.cy)) * 180) / Math.PI, 360);
  const bar = { x: ox + 20, y: 285, w: 860, h: 190 };
  const halfBox = (h: string) => ({ x: h === "am" ? bar.x : bar.x + bar.w / 2, y: bar.y, w: bar.w / 2, h: bar.h });
  const cardAt = (h: any) => (h ? { x: halfBox(h).x + 65, y: bar.y + 90, w: 300, h: 86 } : { x: ox + 290, y: 20, w: 300, h: 86 });
  const ansBox = small ? { x: ox + 290, y: 140, w: 300, h: 84 } : { x: X0, y: 282, w: 350, h: 116 };

  /* the acts ------------------------------------------------------------------------------------------- */
  const handOn = (hand: string) => (hand === "m" ? "minute-hand" : "second-hand");
  const doTurn = () => {
    if (busy.current) return;
    const hand = free ? "s" : cfg.hand, turns = free ? 1 : cfg.turns;
    if (!free && S.done) { if (stage === "demo") api.did("turn"); return; }
    const u = thUnit(hand), t0 = S.t, a0 = (thAng(t0) as any)[hand];
    const rr = R * (hand === "s" ? 0.86 : hand === "m" ? 0.74 : 0.48);
    const pts = Array.from({ length: 12 * turns }, (_, i) => thPol(G.cx, G.cy, rr, a0 + (i + 1) * 30));
    busy.current = true; setDm(null);
    api.act({ tool: "hand", moves: "push", ms: 900, at: pts, onPoint: (i: number) => put({ t: t0 + (i + 1) * u }) }).then((ok: boolean) => {
      busy.current = false;
      if (!ok) return;
      put({ t: t0 + 12 * turns * u, done: true });
      api.sfx.settle();
      if (stage === "demo") api.did("turn");
    });
  };
  const setNum = (hand: string, num: number, viaDrag = false) => {
    setDm(null);
    if (free) {
      const t = S.t, nt = hand === "m" ? Math.floor(t / 3600) * 3600 + num * 300 + thMod(t, 60) : Math.floor(t / 60) * 60 + num * 5;
      put({ t: nt }); api.sfx.tick(); return;
    }
    if (!((k === "setm" && hand === "m") || (k === "sets" && hand === "s"))) return;
    const hit = num === cfg.to;
    put({ num, t: thStart(cfg) + num * (k === "setm" ? 300 : 5), done: S.done || hit });
    api.sfx.tick();
    /* in a question a hand set on another number says the question's first rung; set on its number, the question comes back */
    if (stage === "ask" && item) { if (!hit && viaDrag) nudge(item.put || item.miss); else if (hit && S.num !== num) { backToQ(); api.say(item.say); } }
    if (stage === "demo") api.did(hit ? handOn(hand) : handOn(hand) + "-off");
  };
  /* the guide step's act (a tap or Enter on the hand, the agent's check): the drawn hand pushes it round to its number */
  const warmAct = (hand: string) => {
    if (busy.current || !(k === "setm" || k === "sets")) return;
    const cur = S.num, to = cfg.to, u = k === "setm" ? 300 : 5, base = thStart(cfg);
    const steps = thMod(to - cur, 12);
    if (!steps) { put({ done: true }); api.did(handOn(hand)); return; }
    const rr = R * (hand === "m" ? 0.74 : 0.86);
    const pts = Array.from({ length: steps }, (_, i) => thPol(G.cx, G.cy, rr, (cur + i + 1) * 30));
    busy.current = true; setDm(null);
    api.act({ tool: "hand", moves: "push", ms: 900, at: pts, onPoint: (i: number) => put({ num: (cur + i + 1) % 12, t: base + ((cur + i + 1) % 12) * u }) }).then((ok: boolean) => {
      busy.current = false;
      if (!ok) return;
      put({ num: to, t: base + to * u, done: true });
      api.sfx.settle();
      if (stage === "demo") api.did(handOn(hand));
    });
  };
  const placeHalf = (h: string) => {
    if (k !== "half" || busy.current || (dm && dm.on) || !(stage === "demo" || stage === "ask")) return;
    setDm(null); TH_HALF = h; put({ half: h, done: true }); api.sfx.tick();
    if (stage === "demo") api.did(h);
  };
  const act = (on: any) => {
    if (on === "turn") doTurn();
    else if (on === "am" || on === "pm") placeHalf(on);
    else if (on === "minute-hand") warmAct("m");
    else if (on === "second-hand") warmAct("s");
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (busy.current || (dm && dm.on) || !(stage === "demo" || stage === "ask" || free)) return;
    if (pay === "card") {
      if (justOpened()) return;
      if (!moved || isNaN(p.x)) { if (stage === "demo") api.did("card"); return; }
      if (p.y > bar.y - 40 && p.y < bar.y + bar.h + 30 && p.x > bar.x - 30 && p.x < bar.x + bar.w + 30) placeHalf(p.x < bar.x + bar.w / 2 ? "am" : "pm");
      else if (stage === "demo") api.did("card");
      return;
    }
    if (justOpened()) return;
    if (!moved || isNaN(p.x)) {                 /* a tap or Enter on a hand: the step's act in a guide step, else one number on */
      if (!pressOk()) return;
      if (stage === "demo") { warmAct(pay); return; }
      const a = thAng(S.t);
      setNum(pay, (Math.round((pay === "m" ? a.m : a.s) / 30) + 1) % 12);
      return;
    }
    if (Math.hypot(p.x - G.cx, p.y - G.cy) < 30) return;   /* released on the centre pin: no direction, keep the number */
    setNum(pay, Math.round(at(p) / 30) % 12, true);
  });

  /* the agent and the dev driver: the act at once (AI mode and toolApi runs are never gated) */
  const actNow = (v?: any) => {
    if (k === "half") {
      if (TH_HALF && v === undefined) return;
      const s = String(Array.isArray(v) ? (v[2] ?? "") : v ?? "");
      const h = /p\.?m/i.test(s) ? "pm" : /a\.?m/i.test(s) ? "am" : cfg.half;
      TH_HALF = h; put({ half: h, done: true }); return;
    }
    if (k === "turn") { put({ t: thFinal(cfg), done: true }); return; }
    if (k === "setm" || k === "sets") put({ num: cfg.to, t: thFinal(cfg), done: true });
  };
  HOOK.demo = stage === "demo" && stepOn ? () => act(stepOn) : null;
  HOOK.actNow = stage === "ask" && !free ? actNow : null;
  HOOK.setHalf = k === "half" && stage === "ask" ? (h: string) => { TH_HALF = h; put({ half: h, done: true }); } : null;

  /* the answer gate: the Answer key and the keypad wait for the question's act (user mode, after a real touch) */
  const [, bump] = useState(0);
  const stageRef = useRef(stage);
  const lockedRef = useRef(false);
  stageRef.current = stage;
  useEffect(() => {
    /* a real touch ON THE WORKING AREA counts, and at a guide step ANY real key or tap counts (the runtime's Enter does the step with focus on
       the page); the keypad, the Answer key and the header at an open question do not. toolApi.check() / solve() carry no event: never */
    const f = (e: any) => {
      if (!e.isTrusted || TH_TOUCHED || (e.type === "keydown" && e.repeat)) return;   /* a held Enter or Space is one press */
      const z = e.target && e.target.closest ? e.target.closest('[data-zone="work"]') : null;
      if (!z && stageRef.current !== "demo") return;
      TH_TOUCHED = true; bump((x: number) => x + 1);
    };
    window.addEventListener("pointerdown", f, true); window.addEventListener("keydown", f, true);
    return () => { window.removeEventListener("pointerdown", f, true); window.removeEventListener("keydown", f, true); };
  }, []);
  const needsAct = stage === "ask" && (k === "turn" || k === "half" || k === "setm" || k === "sets");
  const wantGate = needsAct && !S.done && TH_TOUCHED;
  const tracing = !!(dm && dm.on);
  useEffect(() => {
    if (stage !== "ask") return;
    let user = false;
    try { user = (window as any).toolApi.getState().mode === "user"; } catch (e) { user = false; }
    lockedRef.current = !tracing && wantGate && user;
    api.lock(tracing || (wantGate && user));
  }, [tracing, wantGate, stage, ek]);

  /* a nudge (the wrong number, the act still to do) stands on the bubble for its reading time, then the question comes back */
  const ekRef = useRef(ek); ekRef.current = ek;
  const itemRef = useRef(item); itemRef.current = item;
  const nudgeT = useRef<any>(null);
  const nudgeUp = useRef(false);
  const backToQ = () => { if (nudgeT.current) clearTimeout(nudgeT.current); nudgeT.current = null; nudgeUp.current = false; };
  const nudge = (line: string) => {
    backToQ(); api.say(line); nudgeUp.current = true;
    const ms = Math.max(2600, 68 * String(tx(line)).length), it = item, ek0 = ek;
    nudgeT.current = setTimeout(() => { nudgeT.current = null; nudgeUp.current = false; if (stageRef.current === "ask" && ekRef.current === ek0 && it) api.say(it.say); }, ms);
  };
  const openHold = () => Date.now() - ((entry.current as any).at || 0) < 900;   /* the question just opened: a double tap's second half */
  const nudgeRef = useRef<any>(null); nudgeRef.current = () => { if (TH_NUDGE[k]) nudge(TH_NUDGE[k]); };
  useEffect(() => () => backToQ(), [ek]);
  useEffect(() => {
    /* a real tap on the dimmed Answer key says which act is still to do; the Hint key over a nudge brings the question back first */
    const f = (e: any) => {
      if (!e.isTrusted || !e.target || !e.target.closest || stageRef.current !== "ask") return;
      if (e.target.closest('[data-control="answer-open"]')) { if (lockedRef.current && !openHold()) nudgeRef.current(); return; }
      if (e.target.closest('[data-control="again"]') && nudgeUp.current) { const it = itemRef.current; backToQ(); setTimeout(() => { if (it) api.say(it.say); }, 60); }
    };
    window.addEventListener("pointerdown", f, true);
    return () => window.removeEventListener("pointerdown", f, true);
  }, []);

  /* at the win the dragged hand stands on its number, so the clock and the green reading agree (a hand moved on after the act) */
  useEffect(() => { if (stage === "win" && (k === "setm" || k === "sets") && S.num !== cfg.to) put({ num: cfg.to, t: thFinal(cfg), done: true }); }, [stage, ek]);

  /* the win line */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage, ek]);

  /* the traceback: redraw the maths in steps, ending on the whole right answer (a layer of its own, no pointer events) */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const c = cfg, st: any[] = [];
    const base = { ek, on: true };
    let cur: any = { ...base };
    const set = (o: any) => { cur = { ...base, ...o }; setDm(cur); };
    if (c.kind === "turn" || c.kind === "recall") {
      const hand = c.kind === "recall" ? "h" : c.hand, turns = c.kind === "recall" ? 2 : c.turns, u = thUnit(hand);
      st.push([350, () => set({ t: 0 })]);
      for (let i = 1; i <= 12 * turns; i++) {
        st.push([hand === "h" ? 90 : 200, () => set({ t: i * u, chip: hand === "h" ? (i >= 12 ? { v: i >= 24 ? 24 : 12, u: "h" } : null) : { v: i * 5, u: "min" } })]);
      }
    } else if (c.kind === "half") {
      /* the owner: the correction names the wrong half. The half the card sits on is ringed and its span written under it, then the right
         half lights amber with its own span */
      const other = S.half && S.half !== c.half ? S.half : null;
      if (other) st.push([700, () => set({ other })]);
      st.push([450, () => set({ other, lit: c.half })]);
      st.push([700, () => set({ other, lit: c.half, words: true })]);
    } else if (c.kind === "noon") {
      st.push([600, () => set({ litNoon: true })]);
    } else if (c.kind === "setm") {
      st.push([300, () => set({ gm: 0 })]);
      for (let i = 1; i <= c.to; i++) st.push([360, () => set({ gm: i, chip: { v: i * 5, u: "min" } })]);
      st.push([600, () => set({ gm: c.to, chip: { v: c.to * 5, u: "min" }, litHour: true })]);
    } else if (c.kind === "sets") {
      st.push([300, () => set({ gs: 0 })]);
      for (let i = 1; i <= c.to; i++) st.push([300, () => set({ gs: i, chipS: { v: i * 5, u: "s" } })]);
      if (c.parts) {
        for (let j = 1; j <= c.m / 5; j++) st.push([240, () => set({ gs: c.to, chipS: { v: c.to * 5, u: "s" }, gm: j, chip: { v: j * 5, u: "min" } })]);
        st.push([500, () => set({ ...cur, litHour: true })]);
      }
    }
    tl.run(st, () => setDm({ ...cur, on: false, ans: true }));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): the hands as dial numbers, never the reading before it is given */
  const showAns = !free && (stage === "win" || stage === "idle");
  const aNow = thAng(dm && dm.t != null && (k === "turn" || k === "recall") ? dm.t : S.t);
  const turnsDone = k === "turn" ? Math.floor((S.t - thStart(cfg)) / (12 * thUnit(cfg.hand)) + 1e-9) : 0;
  const hHeld = k === "setm" && stage === "ask" ? (dm && dm.gm != null ? cfg.h * 30 + dm.gm * 2.5 : cfg.h * 30 + cfg.to * 2.5) : aNow.h;
  api.share({ hands: { hour: +(hHeld / 30).toFixed(2), minute: +(aNow.m / 30).toFixed(2), second: +(aNow.s / 30).toFixed(2) },
    tally: turnsDone, cards: k === "half" ? S.half : null, reading: showAns && item && item.show ? item.show.join(" ") : null, complete: stage === "idle" });

  /* the drawing ------------------------------------------------------------------------------------------ */
  const dd = drag.drag && drag.drag.moved ? drag.drag : null;
  const sec = k === "turn" || k === "recall" || k === "sets" || k === "free";
  const mLive = dd && dd.payload === "m" ? at(dd) : null;
  const sLive = dd && dd.payload === "s" ? at(dd) : null;
  const tShow = dm && dm.t != null && (k === "turn" || k === "recall") ? dm.t : S.t;
  const hLive = mLive != null ? Math.floor(thMod(tShow, 43200) / 3600) * 30 + mLive / 12 : null;
  const handsLive = stage === "demo" || stage === "ask" || free;   /* after the win the hands are no longer controls (no tab stop) */
  const mCtl = handsLive && (k === "setm" || k === "free") ? { ...control("minute-hand", tx("Minute hand")), ...drag.bind("m"), ...drag.keys("m") } : null;
  const sCtl = handsLive && (k === "sets" || k === "free") ? { ...control("second-hand", tx("Second hand")), ...drag.bind("s"), ...drag.keys("s") } : null;
  /* free play: when the two knobs are close, the second hand's own knob must still pick up the second hand */
  const angGap = Math.abs(((((mLive != null ? mLive : aNow.m) - (sLive != null ? sLive : aNow.s)) % 360) + 540) % 360 - 180);
  const closeHands = !!(mCtl && sCtl) && angGap < 50;
  const live = stage === "demo" || stage === "ask";
  const inviteOn = live && !S.done && !(dm && dm.on) && !busy.current;
  const chip = (x: number, y: number, w: number, col: string, c: any) => c && (
    <g>
      <rect x={x} y={y + 4} width={w} height={70} rx={18} fill="rgba(0,0,0,0.08)" />
      <rect x={x} y={y} width={w} height={70} rx={18} fill={tint(col, 0.86)} stroke={col} strokeWidth={4} />
      <text x={x + w / 2} y={y + 49} textAnchor="middle" fontSize={thFitFs(c.v + " " + tx(c.u), T.prompt, w - 28)} fontWeight={700} fill={shade(col, 0.25)}>{c.v + " " + tx(c.u)}</text>
    </g>
  );
  const ansPanel = (lines: string[]) => (
    <g>
      <rect x={ansBox.x} y={ansBox.y + 4} width={ansBox.w} height={ansBox.h} rx={20} fill="rgba(0,0,0,0.12)" />
      <rect x={ansBox.x} y={ansBox.y} width={ansBox.w} height={ansBox.h} rx={20} fill={tint(TH.green, 0.85)} stroke={TH.green} strokeWidth={4} />
      {lines.map((l: string, i: number) => (
        <text key={"an" + i} x={ansBox.x + ansBox.w / 2} y={ansBox.y + ansBox.h / 2 + 14 + (i - (lines.length - 1) / 2) * 46}
          textAnchor="middle" fontSize={thFitFs(tx(l), small ? T.speech : T.prompt, ansBox.w - 48)} fontWeight={700} fill={shade(TH.green, 0.25)}>{tx(l)}</text>
      ))}
    </g>
  );
  const card = (c: any, b: any, ctl: boolean) => {
    const body = (
      <g>
        <rect x={b.x} y={b.y + 6} width={b.w} height={b.h} rx={18} fill="rgba(0,0,0,0.15)" />
        <rect x={b.x} y={b.y + 4} width={b.w} height={b.h} rx={16} fill={shade(TH.blue, 0.3)} />
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={16} fill={TH.blue} stroke={shade(TH.blue, 0.25)} strokeWidth={3} />
        <rect x={b.x + 2} y={b.y + 2} width={b.w - 4} height={b.h / 2} rx={14} fill="#FFFFFF" fillOpacity={0.12} pointerEvents="none" />
        <text x={b.x + b.w / 2} y={b.y + (lang === "en" ? 37 : 33)} textAnchor="middle" fontSize={lang === "en" ? T.label : 30} fontWeight={700} fill="#FFFFFF">{tx(c.card[0])}</text>
        <text x={b.x + b.w / 2} y={b.y + (lang === "en" ? 71 : 73)} textAnchor="middle" fontSize={lang === "en" ? T.label : 30} fontWeight={600} fill="#FFFFFF">{tx(c.card[1])}</text>
      </g>
    );
    return ctl ? <g {...control("card", tx("Time card"))} {...drag.bind("card")} {...drag.keys("card")}>{body}</g> : body;
  };

  if (small) {
    const hcw = lang === "en" ? 150 : 220;
    const showNoon = k !== "noon" || showAns || (dm && (dm.litNoon || dm.ans));
    const noonGreen = k === "noon" && (showAns || (dm && dm.ans));
    const cb = dd && dd.payload === "card" ? { x: dd.x - 150, y: dd.y - 43, w: 300, h: 86 } : cardAt(showAns && k === "half" ? cfg.half : S.half);
    const dv = showAns ? null : dm;   /* at the win the correction's marks are gone */
    return (
      <g>
        {thClock({ cx: G.cx, cy: G.cy, Ro: G.Ro, t: S.t, sec: false })}
        {(["am", "pm"] as const).map((h) => {
          const b = halfBox(h), lit = dv && dv.lit === h;
          /* the label card is wider in Hindi and Gujarati (their words for a.m. and p.m. are longer) */
          return (
            <g key={h}>
              <rect x={b.x} y={b.y + 4} width={b.w} height={b.h} rx={22} fill="rgba(0,0,0,0.06)" />
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={22} fill={h === "am" ? TH.warm : TH.rose} stroke={TH.ink} strokeWidth={3} />
              {lit && <rect x={b.x + 4} y={b.y + 4} width={b.w - 8} height={b.h - 8} rx={18} fill={TH.amber} fillOpacity={0.3} stroke={TH.amber} strokeWidth={8} pointerEvents="none" />}
              <rect x={b.x + 16} y={b.y + 12} width={hcw} height={60} rx={16} fill="#FFFFFF" stroke={TH.ink} strokeWidth={3} />
              <text x={b.x + 16 + hcw / 2} y={b.y + (lang === "gu" ? 55 : lang === "hi" ? 54.5 : 59)} textAnchor="middle" fontSize={lang === "en" ? T.xl - 8 : lang === "gu" ? 40 : lang === "hi" ? 34 : T.speech - 2} fontWeight={700} fill={TH.ink}>{tx(h === "am" ? "a.m." : "p.m.")}</text>
              {dv && dv.other === h && <rect x={b.x + 10} y={b.y + 7} width={hcw + 12} height={70} rx={20} fill="none" stroke={TH.ink} strokeWidth={3} strokeDasharray="12 8" pointerEvents="none" />}
              {(warm || (lit && dv.words) || (dv && dv.other === h)) && <text x={b.x + b.w / 2} y={bar.y + bar.h + (lang === "en" ? 33 : 36)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={TH.ink}>
                {tx(h === "am" ? "midnight until before noon" : "noon until before midnight")}</text>}
            </g>
          );
        })}
        <line x1={bar.x + bar.w / 2} y1={bar.y - 14} x2={bar.x + bar.w / 2} y2={bar.y + bar.h} stroke={dm && dm.litNoon ? TH.amber : TH.ink} strokeWidth={dm && dm.litNoon ? 10 : 5} />
        <text x={bar.x} y={bar.y - 24} fontSize={T.label} fontWeight={700} fill={TH.ink}>{tx("12 midnight")}</text>
        <text x={bar.x + bar.w} y={bar.y - 24} textAnchor="end" fontSize={T.label} fontWeight={700} fill={TH.ink}>{tx("12 midnight")}</text>
        {showNoon && <text x={bar.x + bar.w / 2} y={bar.y - 24} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={noonGreen ? shade(TH.green, 0.25) : TH.ink}>{tx("12 noon")}</text>}
        {k === "half" && card(cfg, cb, live || free)}
        {k === "half" && live && <Hit id="am" x={halfBox("am").x + 16} y={bar.y + 6} w={hcw} h={72} label={tx("a.m. half")} onPress={() => { if (pressOk()) placeHalf("am"); }} />}
        {k === "half" && live && <Hit id="pm" x={halfBox("pm").x + 16} y={bar.y + 6} w={hcw} h={72} label={tx("p.m. half")} onPress={() => { if (pressOk()) placeHalf("pm"); }} />}
        {k === "half" && inviteOn && !dd && <Invite x={cb.x + cb.w / 2} y={cb.y + cb.h / 2} w={cb.w} h={cb.h} rx={16} C={C} />}
        {(showAns || (dm && dm.ans)) && item && item.show && <g pointerEvents="none">{ansPanel(item.show)}</g>}
      </g>
    );
  }

  /* the big clock: phases 1, 3, 4 and free play */
  const turnKey = (k === "turn" && live) || free;
  const turnOff = !free && S.done;
  return (
    <g>
      {thClock({ cx: G.cx, cy: G.cy, Ro: G.Ro, t: tShow, mA: mLive, sA: sLive, close: closeHands, knobs: stage === "demo" || stage === "ask" || free, hA: k === "setm" && stage === "ask" ? (dm && dm.gm != null ? cfg.h * 30 + dm.gm * 2.5 : cfg.h * 30 + cfg.to * 2.5) : hLive, sec, mCtl, sCtl,
        litNum: dm && dm.litHour ? Math.floor(thAng(S.t).h / 30) % 12 : null, litHour: !!(dm && dm.litHour) })}
      {thLegend(X0, 40, sec, tx, lang)}
      {k === "turn" && !dm && turnsDone > 0 && chip(X0, 196, 210, TH.violet, { v: turnsDone, u: turnsDone === 1 ? "turn" : "turns" })}
      {k === "turn" && warm && S.done && chip(X0, 286, 190, TH.violet, { v: 1, u: "min" })}
      {dm && chip(X0, 196, 170, k === "turn" && cfg.hand === "h" || k === "recall" ? TH.amber : TH.violet, dm.chip)}
      {dm && chip(X0 + 180, 196, 170, TH.verm, dm.chipS)}
      {(k === "setm" || k === "sets") && warm && S.done && chip(X0, 196, 190, k === "setm" ? TH.violet : TH.verm, { v: cfg.to * 5, u: k === "setm" ? "min" : "s" })}
      {turnKey && (
        <Key id="turn" label={tx("Turn")} x={X0} y={430} w={250} h={80} C={C} tone="key" disabled={turnOff} onClick={() => { if (pressOk()) act("turn"); }}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={turnOff ? C.dim : toneInk("key", C.ink)}>{tx("Turn")}</text>
        </Key>
      )}
      {turnKey && !free && inviteOn && <Invite x={X0 + 125} y={470} w={250} h={80} C={C} />}
      {(k === "setm" || k === "sets") && inviteOn && !dd && (() => { const p = thPol(G.cx, G.cy, R * 0.4, k === "setm" ? aNow.m : aNow.s); return <Invite x={p.x} y={p.y} r={20} C={C} />; })()}
      {dm && (
        <g pointerEvents="none">
          {dm.gm != null && (k === "setm" || k === "sets") && (() => { const p = thPol(G.cx, G.cy, R * 0.5, dm.gm * 30);
            return <line x1={G.cx} y1={G.cy} x2={p.x} y2={p.y} stroke={TH.violet} strokeWidth={8} strokeDasharray="16 10" strokeLinecap="round" />; })()}
          {dm.gs != null && (() => { const p = thPol(G.cx, G.cy, R * 0.5, dm.gs * 30);
            return <line x1={G.cx} y1={G.cy} x2={p.x} y2={p.y} stroke={TH.verm} strokeWidth={6} strokeDasharray="14 8" strokeLinecap="round" />; })()}
          {dm.ans && item && item.show && ansPanel(item.show)}
        </g>
      )}
      {!dm && showAns && item && item.show && <g pointerEvents="none">{ansPanel(item.show)}</g>}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the item's clock and its reading */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[result.last.item]) || null;
  if (!item || !item.thumb) return null;
  const r = Math.max(20, Math.min(h / 2 - 4, 40)), cx = r + 4, cy = h / 2;
  const a = thAng(thFinal(item));
  const ln = (deg: number, len: number, wd: number) => { const p = thPol(cx, cy, len, deg); return <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={TH.ink} strokeWidth={wd} strokeLinecap="round" />; };
  const lines = item.thumb;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={TH.ivory} stroke={TH.wood} strokeWidth={5} />
      {ln(a.h, r * 0.5, 4)}{ln(a.m, r * 0.8, 3)}
      {item.kind === "sets" && (() => { const q = thPol(cx, cy, r * 0.88, a.s); return <line x1={cx} y1={cy} x2={q.x} y2={q.y} stroke={TH.verm} strokeWidth={2} strokeLinecap="round" />; })()}
      {lines.map((l: string, i: number) => (
        <text key={i} x={(w + 2 * r + 8) / 2} y={cy + (item.kind === "half" || item.kind === "noon" ? -2 : 10)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TH.ink}>{tx(l)}</text>
      ))}
      {/* the half of the day as the day bar's own colours: warm white a.m., rose p.m., the noon mark between */}
      {(item.kind === "half" || item.kind === "noon") && (() => {
        const bx = 2 * r + 24, bw = w - bx - 10, by = cy + 10;
        return (
          <g>
            <rect x={bx} y={by} width={bw / 2} height={18} rx={5} fill={TH.warm} stroke={TH.ink} strokeWidth={item.half === "am" ? 3.5 : 1.5} />
            <rect x={bx + bw / 2} y={by} width={bw / 2} height={18} rx={5} fill={TH.rose} stroke={TH.ink} strokeWidth={item.half === "pm" ? 3.5 : 1.5} />
            {item.kind === "noon" && <line x1={bx + bw / 2} y1={by - 6} x2={bx + bw / 2} y2={by + 24} stroke={TH.green} strokeWidth={5} />}
            {item.half && <circle cx={bx + (item.half === "am" ? bw / 4 : (3 * bw) / 4)} cy={by + 9} r={6} fill={TH.blue} />}
          </g>
        );
      })()}
    </g>
  );
}

function ClockHands(props: any) {
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

export default ClockHands;