/* ═══ M1.S1.T2.C8.2D1 · count_the_money · THE COUNTER (rework, 2026-11-10) ═══════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build. THE LESSON IS SILENT (r30): the bubble is the guide.
   A clean shop counter: an OPEN PURSE at the bottom left, the money lying on the counter to its right, the money TRAY in the centre, and
   (P4 and Free play) ONE price tag with the amount to pay. No people, hands or faces. Nothing is completed for the child.
     P1 read the value of a note or coin (it enlarges, its amber tag shows; a Rs 10 note and a Rs 10 coin read the same)
     P2 count one kind: the pieces lie on the counter, tap each and the green running total steps up beneath it
     P3 a mixed handful: put each piece in the tray, one row per denomination, tap the rows from the top to count them
     P4 pay the amount on the tag exactly, then clear the tray and pay a different way.   Free play = the open counter.
   Colours: amber = the value of one note or coin (and a price) · sky blue = how many · green = running total / paid.
   No imports. Edit, never rewrite. */

const TOOL_ID = "count_the_money";
const MEDIA_ID = "M1.S1.T2.C8.2D1";
const TOOL_NAME = "Count the Money";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A shop counter, an open purse and a tray for the money."];
const FINISH_LINE = "You counted every group by its values.";
const FREE_LINE = "Free play. Tap the price tag to change the amount, then pay it.";
const START_HOOK = "You run the shop. Can you count the money?";

/* ── money: the pieces, their values and how they are drawn ─────────────────────────────── */
const ML_KINDS = ["n500", "n200", "n100", "n50", "n20", "n10", "c20", "c10", "c5", "c2", "c1"];
const ML_V: any = { n500: 500, n200: 200, n100: 100, n50: 50, n20: 20, n10: 10, c20: 20, c10: 10, c5: 5, c2: 2, c1: 1 };
/* the real notes: height / width of each made picture (note10 220 x 105 ...) */
const NOTE_A: any = { 10: 105 / 220, 20: 98 / 220, 50: 104 / 220, 100: 94 / 220, 200: 97 / 220, 500: 101 / 220 };
const ML_NW = 136, ML_NH = 72, ML_CD = 88;   /* ML_CD: the Rs 10 coin's box; the others scale by their photographed diameters */
const COIN_R: any = { c1: 0.73, c2: 0.86, c5: 0.93, c10: 1, c20: 1.03 };
const ML_AMB = "#E69F00", ML_SKY = "#56B4E9", ML_GRN = "#009E73";
const mlNote = (id: string) => id.charAt(0) === "n";
/* highest value first; at the same value the note before the coin */
const KS = [...ML_KINDS].sort((a: string, b: string) => ML_V[b] - ML_V[a] || (mlNote(a) ? -1 : mlNote(b) ? 1 : 0));
const mlSum = (m: any) => Object.keys(m).reduce((s: number, k: string) => s + (ML_V[k] || 0) * (m[k] || 0), 0);
const mlCnt = (m: any, pre: string) => Object.keys(m).reduce((s: number, k: string) => (k.charAt(0) === pre ? s + (m[k] || 0) : s), 0);
const mlSig = (m: any) => ML_KINDS.filter((k: string) => (m[k] || 0) > 0).map((k: string) => k + (m[k] > 1 ? "x" + m[k] : "")).join(",");
const mlParse = (s: any) => {
  const m: any = {};
  String(s).split(",").forEach((t: string) => { const p = t.split("x"); if (ML_V[p[0]]) m[p[0]] = (m[p[0]] || 0) + (p[1] ? +p[1] : 1); });
  return m;
};
const mlFresh = (qk: string) => ({ qk, carry: "", read: {}, hit: [], placed: [], tray: qk === "w4" ? { n20: 1, c10: 1 } : {}, counted: 0, ways: [], touched: false, done: false, note: "", lastSent: "", cand: "", slotN: "", slotC: "", ring: false, fly: null, fp: 0, freeMsg: false, keptHint: false });
let ML_SK = 0; /* skins drawn this render (the screen cap is 40: money 24, counter 4, purse, tag and the purse decoration) */

/* the amounts the Free-play price tag cycles through when it is tapped (none equals an answer of a phase) */
const FREE_PRICES = [30, 85, 130, 175];

/* reusable SVG Filters & Gradients for visual elevation */
function RenderDefs() {
  return (
    <defs>
      <filter id="udgam-shadow-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1F150A" floodOpacity="0.25" />
      </filter>
      <filter id="udgam-shadow-piece" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.32" />
      </filter>
      <filter id="udgam-shadow-deep" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0A0502" floodOpacity="0.38" />
      </filter>

      {/* Rich metallic coin gradients */}
      <linearGradient id="udgam-grad-coin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B8" />
        <stop offset="40%" stopColor="#E6BA39" />
        <stop offset="85%" stopColor="#B88A1D" />
        <stop offset="100%" stopColor="#87600E" />
      </linearGradient>
      <linearGradient id="udgam-grad-coin-inner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF2" />
        <stop offset="100%" stopColor="#FCE496" />
      </linearGradient>
      <radialGradient id="udgam-coin-shine" cx="30%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>

      {/* Note texture fallback gradient */}
      <linearGradient id="udgam-grad-note" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF7" />
        <stop offset="50%" stopColor="#F7EEDC" />
        <stop offset="100%" stopColor="#E6D7BD" />
      </linearGradient>

      {/* Wood & Counter Gradients */}
      <linearGradient id="udgam-grad-wood" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E2A669" />
        <stop offset="40%" stopColor="#C9884B" />
        <stop offset="100%" stopColor="#A4652E" />
      </linearGradient>

      {/* Ambient Lighting Vignette */}
      <radialGradient id="udgam-light" cx="30%" cy="10%" r="80%">
        <stop offset="0%" stopColor="#FFF8ED" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#FFF8ED" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="udgam-edge" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#241304" stopOpacity="0" />
        <stop offset="100%" stopColor="#241304" stopOpacity="0.45" />
      </linearGradient>
    </defs>
  );
}

/* one note or coin; (x, y) is its top-left, s its scale on a 136 x 72 note / 76 coin */
function mlPiece(id: string, x: number, y: number, s: number, o: any = {}) {
  const note = mlNote(id), cf = o.uni ? 1 : COIN_R[id] || 1, w = (note ? ML_NW : ML_CD) * s * (note ? 1 : cf), h = (note ? ML_NH : ML_CD) * s * (note ? 1 : cf);
  if (!note) { x += (ML_CD * s - w) / 2; y += (ML_CD * s - h) / 2; }
  const fs = Math.max(28, Math.round(34 * s));
  const sk = o.skin !== false && ML_SK < 30;
  if (sk) ML_SK += 1;
  const ink = o.lit ? "#542D00" : "#2B2B2B";
  const label = o.label !== false;
  if (note) {
    /* a REAL note (the owner's pictures): the same width for every value, each its own height from its made aspect; never stretched or cropped */
    const hn = w * NOTE_A[ML_V[id]], yy = y + (h - hn) / 2;
    return (
      <g filter="url(#udgam-shadow-piece)">
        <rect x={x} y={yy} width={w} height={hn} rx={8 * s} fill="url(#udgam-grad-note)" />
        {/* Decorative inner security frame for note fallback */}
        <rect x={x + 3 * s} y={yy + 3 * s} width={w - 6 * s} height={hn - 6 * s} rx={5 * s} fill="none" stroke="#C4B090" strokeWidth={1.5 * s} strokeDasharray="6 4" />
        <line x1={x + w * 0.3} y1={yy + 2 * s} x2={x + w * 0.3} y2={yy + hn - 2 * s} stroke="#8C7A5C" strokeWidth={2 * s} strokeOpacity={0.4} />
        {!sk && label && (
          <text x={x + w / 2} y={yy + hn / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#2B2B2B" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>
            ₹{ML_V[id]}
          </text>
        )}
        {sk && <Skin name={"note" + ML_V[id]} x={x} y={yy} w={w} h={hn} />}
        <rect x={x} y={yy} width={w} height={hn} rx={8 * s} fill="none" stroke={o.lit ? ML_AMB : "#594F43"} strokeWidth={o.lit ? 5.5 : 2.5} />
      </g>
    );
  }
  /* a REAL coin (the owner's pictures): a round cut-out whose face already prints its value, so nothing is drawn over it but a soft shadow */
  const ccx = x + w / 2, ccy = y + h / 2;
  return (
    <g filter="url(#udgam-shadow-piece)">
      <circle cx={ccx} cy={ccy} r={w / 2} fill="#C9A24A" />
      {sk && <Skin name={"coin" + ML_V[id]} x={x} y={y} w={w} h={h} />}
      {!sk && label && <text x={ccx} y={ccy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#2B2B2B" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{ML_V[id]}</text>}
      {o.lit && <circle cx={ccx} cy={ccy} r={w / 2 + 2} fill="none" stroke={ML_AMB} strokeWidth={5} />}
    </g>
  );
}
/* a pile of n pieces of one kind laid in a row inside (x, y, w, h); every centre comes back */
function mlFan(id: string, n: number, x: number, y: number, w: number, h: number, smax = 1) {
  const bw = mlNote(id) ? ML_NW : ML_CD, bh = mlNote(id) ? ML_NH : ML_CD;
  let s = Math.min(smax, h / bh);
  const ms = mlNote(id) ? (n > 5 ? 0.42 : 0.7) : 0.62;
  for (let k = 0; k < 16 && n > 1 && s > 0.38; k++) { if ((w - bw * s) / (n - 1) >= bw * s * ms) break; s *= 0.93; }
  const step = n > 1 ? Math.max(0, Math.min(bw * s * 1.1, (w - bw * s) / (n - 1))) : 0;
  const pw = bw * s, ph = bh * s, oy = y + (h - ph) / 2;
  const cs = Array.from({ length: n }, (_: any, i: number) => ({ x: x + i * step, y: oy, cx: x + i * step + pw / 2, cy: oy + ph / 2 }));
  return { s, step, pw, ph, cs, x, y, w, h };
}
const mlDraw = (id: string, fan: any, n: number, lit = 0) => fan.cs.map((c: any, i: number) => (
  <g key={"p" + i}>{mlPiece(id, c.x, c.y, fan.s, { label: !mlNote(id) || i === n - 1, lit: i < lit, skin: i >= n - 8 })}</g>));
const mlTag = (x: number, y: number, w: number, h: number, col: string, text: any, fs: number, solid = true, halo = false, dy = 0) => (
  <g filter={solid ? "url(#udgam-shadow-soft)" : undefined}>
    <rect x={x} y={y} width={w} height={h} rx={14} fill={solid ? tint(col, 0.78) : "none"} stroke={col} strokeWidth={solid ? 3 : 2.5} strokeDasharray={solid ? undefined : "8 8"} />
    {text !== null && text !== undefined && (
      <text x={x + w / 2} y={y + h / 2 + fs * 0.36 + dy} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#2B2B2B" stroke={halo ? "#FFF6DC" : undefined} strokeWidth={halo ? 4 : undefined} paintOrder={halo ? "stroke" : undefined} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>
        {text}
      </text>
    )}
  </g>
);
function mlRowGeom(x: number, w: number, tight = false) {
  const cmp = w < 560, g = cmp ? 8 : 10, big = w >= 800, tagW = cmp ? 92 : tight ? 116 : big ? 130 : 108, cW = cmp ? 76 : tight ? 100 : big ? 120 : 92, tW = cmp ? 118 : tight ? 140 : big ? 170 : 134;
  const fw = w - tagW - cW - tW - 3 * g;
  return { g, tagW, cW, tW, fw, tagX: x, fanX: x + tagW + g, cX: x + tagW + g + fw + g, tX: x + tagW + g + fw + g + cW + g };
}
/* one tray row: amber value tag · the pieces · sky count tag · green total (tot null = hidden "?", reveal tags it as the answer) */
function mlRow(id: string, cnt: number, x: number, y: number, w: number, h: number, o: any) {
  const g = mlRowGeom(x, w, !!o.tight), th = Math.min(64, h - 8), ty = y + (h - th) / 2, fs = th >= 60 ? T.prompt : th >= 52 ? 36 : T.label;
  const fan = mlFan(id, cnt, g.fanX, y + 3, g.fw, h - 6, o.smax || 1);
  const cs = o.cshow !== undefined ? o.cshow : cnt, empty = cnt <= 0;
  const totTag = o.tot === null || o.tot === undefined || empty ? mlTag(g.tX, ty, g.tW, th, ML_GRN, empty ? null : "₹?", fs, false)
    : <g data-reveals={o.reveal ? "answer" : undefined}>{mlTag(g.tX, ty, g.tW, th, ML_GRN, "₹" + o.tot, fs)}</g>;
  return {
    fan, g, th, ty,
    el: (
      <g key={"row" + id + (o.k || "")}>
        {mlTag(g.tagX, ty, g.tagW, th, ML_AMB, "₹" + ML_V[id], fs)}
        {mlDraw(id, fan, cnt, o.lit || 0)}
        {mlTag(g.cX, ty, g.cW, th, ML_SKY, cs > 0 ? "× " + cs : null, fs, cs > 0)}
        {totTag}
      </g>
    ),
  };
}
/* the pieces and prices of every question (the model the sidecar lists) */
const ML_WARM: any = {
  1: { k: "all11" },
  2: { k: "pile", kind: "n20", n: 4, warm: true },
  3: { k: "purse", has: { n50: 1, c10: 1 }, warm: true },
  4: { k: "pay", price: 30, mode: "warm", warm: true },
};
const ML_FREE: any = { k: "free" };

/* the open purse: the picture, with a few notes and coins peeking out of its mouth (decoration only, nothing to tap) */
function mlPurse(pX: number, pY: number, pW: number, cid: string) {
  const pH = Math.round(pW * 180 / 277), k = pW / 277;
  return (
    <g key="openpurse" pointerEvents="none">
      <ellipse cx={pX + pW / 2} cy={pY + pH - 8} rx={pW * 0.44} ry={7} fill="#241304" fillOpacity={0.35} />
      <rect x={pX + pW * 0.04} y={pY + pH * 0.12} width={pW * 0.92} height={pH * 0.8} rx={pW * 0.14} fill="#563215" stroke="#3A1F09" strokeWidth={3} />
      <Skin name="openpurse" x={pX} y={pY} w={pW} h={pH} />
      <clipPath id={cid}><rect x={pX} y={pY} width={pW} height={pH * 0.6} /></clipPath>
      <g clipPath={"url(#" + cid + ")"}>
        <g transform={`rotate(-7 ${pX + 95 * k} ${pY + 60 * k})`}>{mlPiece("n500", pX + 62 * k, pY + 14 * k, 0.78 * k * 1.2, { label: false })}</g>
        <g transform={`rotate(3 ${pX + 140 * k} ${pY + 60 * k})`}>{mlPiece("n200", pX + 100 * k, pY + 24 * k, 0.78 * k * 1.2, { label: false })}</g>
        {mlPiece("c10", pX + 168 * k, pY + 40 * k, 0.62 * k * 1.2, { label: false })}
        {mlPiece("c5", pX + 76 * k, pY + 50 * k, 0.55 * k * 1.2, { label: false })}
      </g>
    </g>
  );
}

function StartArt({ box, C, lang, tx }: any) {
  ML_SK = 0;
  return (
    <g>
      <RenderDefs />
      <rect x={10} y={120} width={box.w - 20} height={box.h - 140} rx={24} fill="url(#udgam-grad-wood)" stroke="#6E4018" strokeWidth={4} />
      <Skin name="counter" x={10} y={120} w={(box.w - 20) / 2} h={((box.w - 20) / 2) * 240 / 640} />
      <g transform={`translate(${box.w - 10} 120) scale(-1 1)`}><Skin name="counter" x={0} y={0} w={(box.w - 20) / 2} h={((box.w - 20) / 2) * 240 / 640} /></g>
      {mlPurse(60, 110, 330, "udg-mouth-s")}
      {mlPiece("n500", 440, 190, 1.45, { skin: true })}
      {mlPiece("n50", 650, 200, 1.45, { skin: true })}
      {mlPiece("c20", 860, 200, 1.1, {})}
      {mlPiece("c10", 960, 200, 1.1, {})}
      {mlPiece("c5", 1060, 200, 1.1, {})}
    </g>
  );
}

/* Hindi and Gujarati come with the language pass: this table is keyed by the English, byte for byte. */
const TR: any = {
  hi: {
    "So far": "अब तक",
    "Total": "कुल",
    "A shop counter, an open purse and a tray for the money.": "दुकान का काउंटर, एक खुला बटुआ और पैसों के लिए एक ट्रे।",
    "Free play. Tap the price tag to change the amount, then pay it.": "खुला खेल। कीमत का टैग छुओ और रकम बदलो, फिर उसे चुकाओ।",
    "The tray is empty for the new amount.": "नई रकम के लिए ट्रे खाली है।",
    "Pay the amount on the tag, press Pay again, then pay it another way.": "टैग की रकम चुकाओ, फिर चुकाओ दबाओ, फिर दूसरे तरीके से चुकाओ।",
    "Look at the price tag and pay that amount with notes and coins.": "कीमत का टैग देखो और उतनी रकम नोट और सिक्कों से चुकाओ।",
    "Pay the amount": "रकम चुकाओ",
    "Yes, that money pays the amount on the tag.": "हाँ, इन पैसों से टैग की रकम चुक गई।",
    "Pay the tag amount with exactly 3 notes and 1 coin.": "ठीक 3 नोट और 1 सिक्के से टैग की रकम चुकाओ।",
    "Yes, the tag is paid with just those pieces.": "हाँ, बस इन्हीं टुकड़ों से टैग की रकम चुक गई।",
    "Paid the exact price!": "कीमत ठीक चुकाई!",
    "That is more than the price.": "यह कीमत से ज़्यादा है।",
    "Count the Money": "पैसे गिनो",
    "You counted every group by its values.": "तुमने हर समूह को उसके मूल्य से गिना।",
    "You run the shop. Can you count the money?": "दुकान तुम चलाते हो। क्या तुम पैसे गिन सकते हो?",
    "Every note and coin has a value": "हर नोट और सिक्के का एक मूल्य होता है",
    "Look at the number on each note and coin.": "हर नोट और सिक्के पर लिखा अंक देखो।",
    "Tap the note with 50 on it to read its value.": "50 वाले नोट को छुओ और उसका मूल्य पढ़ो।",
    "Find the note with the big 50.": "बड़े 50 वाला नोट ढूँढो।",
    "Now tap the coin with 5 on it.": "अब 5 वाले सिक्के को छुओ।",
    "Find the small round coin with a 5.": "5 वाला छोटा गोल सिक्का ढूँढो।",
    "Put the two pieces side by side and compare their numbers.": "दोनों को साथ रखो और उनके अंकों की तुलना करो।",
    "Ignore the colour and the shine, and read only the big number.": "रंग और चमक छोड़ो, बस बड़ा अंक पढ़ो।",
    "Money is worth its printed number, never its colour or size.": "पैसे का मूल्य उस पर छपा अंक है, रंग या आकार नहीं।",
    "You learned: the number on a note or a coin is its value": "तुमने सीखा: नोट या सिक्के पर लिखा अंक उसका मूल्य है",
    "Looking at the number on each piece, what is each one worth in rupees?": "हर टुकड़े पर लिखा अंक देखो, हर एक कितने रुपये का है?",
    "Each is worth?": "हर एक का मूल्य?",
    "Tap each piece and read the number on it.": "हर एक को छुओ और उस पर लिखा अंक पढ़ो।",
    "Yes, each piece is worth what is printed on it.": "हाँ, हर एक उतने का है जितना उस पर छपा है।",
    "Tap the four notes in order, from the least to the greatest.": "चारों नोट कम से ज़्यादा के क्रम में छुओ।",
    "Least to greatest": "कम से ज़्यादा",
    "Find the note with the smallest number first.": "पहले सबसे छोटे अंक वाला नोट ढूँढो।",
    "Yes, the notes now go from the least to the greatest.": "हाँ, अब नोट कम से ज़्यादा के क्रम में हैं।",
    "The note": "नोट",
    "The coin": "सिक्का",
    "The same": "बराबर",
    "Which is worth more, this note or this coin?": "कौन ज़्यादा मूल्य का है, यह नोट या यह सिक्का?",
    "Which is worth more?": "किसका मूल्य ज़्यादा?",
    "Read the number on each piece, not how it looks.": "हर एक पर लिखा अंक पढ़ो, उसका रूप नहीं।",
    "Yes, the note and the coin are worth exactly the same.": "हाँ, नोट और सिक्का बिल्कुल बराबर मूल्य के हैं।",
    "Counting notes or coins of one kind": "एक ही तरह के नोट या सिक्के गिनना",
    "Tap each one and watch the total climb.": "हर एक को छुओ और देखो कुल कैसे बढ़ता है।",
    "Tap a note on the counter to count it.": "काउंटर पर रखा एक नोट छुओ और उसे गिनो।",
    "Tap any note in the row.": "कतार में कोई भी नोट छुओ।",
    "Tap another note and watch the total jump.": "दूसरा नोट छुओ और देखो कुल कैसे बढ़ता है।",
    "Tap a note that is not counted yet.": "जो नोट अभी नहीं गिना, उसे छुओ।",
    "Tap the third note and keep counting.": "तीसरा नोट छुओ और गिनते रहो।",
    "Two notes are still waiting.": "दो नोट अभी बाकी हैं।",
    "Tap the last note to finish the count.": "आख़िरी नोट छुओ और गिनती पूरी करो।",
    "One note is still waiting.": "एक नोट अभी बाकी है।",
    "Say the value of one piece, then count on by that much.": "एक का मूल्य बोलो, फिर उतना-उतना जोड़ते जाओ।",
    "Count the pieces one by one, with one jump for each.": "टुकड़ों को एक-एक करके गिनो, हर एक के साथ एक छलाँग।",
    "Notes or coins of one kind are counted in jumps of their value.": "एक ही तरह के नोट या सिक्के उनके मूल्य की छलाँग में गिने जाते हैं।",
    "You learned: count notes or coins of one kind in jumps of value": "तुमने सीखा: एक तरह के नोट या सिक्के मूल्य की छलाँग में गिनो",
    "Tap the notes on the counter, then type the money there.": "काउंटर के नोट छुओ, फिर लिखो वहाँ कितने पैसे हैं।",
    "Money on the counter?": "काउंटर पर कितने पैसे?",
    "Read the number on a note, then count on from it.": "नोट का अंक पढ़ो, फिर वहाँ से आगे गिनो।",
    "Yes, each note added the same amount to the total.": "हाँ, हर नोट ने कुल में उतना ही जोड़ा।",
    "Now tap the coins on the counter, then type how much they make.": "अब काउंटर के सिक्के छुओ, फिर लिखो वे कितने बनते हैं।",
    "Total of the coins?": "सिक्कों का कुल?",
    "Count the coins by their value, not by how many there are.": "सिक्कों को उनके मूल्य से गिनो, उनकी संख्या से नहीं।",
    "Yes, seven coins of the same value make that much.": "हाँ, एक ही मूल्य के सात सिक्के इतने बनाते हैं।",
    "Tap every note onto the counter, then type how much more the bigger pile has.": "हर नोट काउंटर पर रखो, फिर लिखो बड़े ढेर में कितना ज़्यादा है।",
    "How much more?": "कितना ज़्यादा?",
    "Compare the two totals, pile against pile.": "दोनों कुल की तुलना करो, ढेर से ढेर।",
    "Yes, the bigger pile holds that much more.": "हाँ, बड़े ढेर में इतना ज़्यादा है।",
    "Counting a mixed handful": "मिले-जुले नोट-सिक्के गिनना",
    "Begin with the biggest value. Add one kind at a time. What is the total now?": "सबसे बड़े मूल्य से शुरू करो। एक-एक किस्म जोड़ो। अब कुल कितना है?",
    "Drag the biggest note into the tray.": "सबसे बड़ा नोट खींचकर ट्रे में रखो।",
    "Start with the note.": "नोट से शुरू करो।",
    "Now drag the coin into the tray.": "अब सिक्के को खींचकर ट्रे में रखो।",
    "Drag the coin next.": "अब सिक्के को खींचो।",
    "Tap the top row to add it to the total.": "ऊपर की पंक्ति छुओ और उसे कुल में जोड़ो।",
    "The top row is the biggest.": "ऊपर की पंक्ति सबसे बड़ी है।",
    "Tap the next row to add it as well.": "अगली पंक्ति छुओ और उसे भी जोड़ो।",
    "Tap the row below.": "नीचे की पंक्ति छुओ।",
    "Point to the row with the biggest value and count it first.": "सबसे बड़े मूल्य वाली पंक्ति दिखाओ और उसे पहले गिनो।",
    "Say the total after that row and after the next one.": "उस पंक्ति के बाद और अगली के बाद कुल बोलो।",
    "A mixed handful is counted one kind at a time, starting with the biggest value.": "मिले-जुले पैसे एक-एक किस्म से गिनो, सबसे बड़े से शुरू।",
    "You learned: count a mixed handful one kind at a time, biggest first": "तुमने सीखा: मिले पैसे एक-एक किस्म करके, सबसे बड़े से गिनो",
    "Move every piece into the tray, count the rows, then type the total.": "हर टुकड़ा ट्रे में रखो, पंक्तियाँ गिनो, फिर कुल लिखो।",
    "Money in the purse?": "बटुए में कितने पैसे?",
    "Look at the numbers and start with the largest one.": "अंक देखो और सबसे बड़े से शुरू करो।",
    "Yes, every kind is in the total.": "हाँ, हर किस्म कुल में आ गई।",
    "Add each piece to the tray, then count the rows and type the purse total.": "हर टुकड़ा ट्रे में जोड़ो, पंक्तियाँ गिनो, फिर बटुए का कुल लिखो।",
    "Purse total?": "बटुए का कुल?",
    "Keep the total so far in your head as each row is counted.": "हर पंक्ति गिनते समय अब तक का कुल याद रखो।",
    "Yes, the notes and coins all count.": "हाँ, सारे नोट और सिक्के गिने गए।",
    "Fill the tray, tap the rows from the top, then type what the purse holds.": "ट्रे भरो, ऊपर से पंक्तियाँ छुओ, फिर लिखो बटुए में कितना है।",
    "How much inside?": "अंदर कितना?",
    "Count how many pieces of each kind there are, too.": "हर किस्म के कितने टुकड़े हैं, यह भी गिनो।",
    "Yes, nothing was left out of the total.": "हाँ, कुल में कुछ भी छूटा नहीं।",
    "Start with the biggest.": "सबसे बड़े से शुरू करो।",
    "Put all the money in the tray first.": "पहले सारे पैसे ट्रे में रखो।",
    "One amount, many ways to pay": "एक रकम, चुकाने के कई तरीके",
    "Pay the price on the tag. Can you pay it a different way?": "टैग पर लिखी कीमत चुकाओ। क्या दूसरे तरीके से भी चुका सकते हो?",
    "The tray already pays the price, so tap Pay again to clear it.": "ट्रे में कीमत पूरी है, फिर चुकाओ दबाकर उसे खाली करो।",
    "Tap the Pay again key.": "फिर चुकाओ बटन को छुओ।",
    "Now tap a coin with 20 on it to put it in the tray.": "अब 20 वाला सिक्का छुओ और ट्रे में रखो।",
    "Find the coin with the 20.": "20 वाला सिक्का ढूँढो।",
    "Tap a coin with 10 on it to reach the price again.": "10 वाला सिक्का छुओ, फिर कीमत पूरी हो जाएगी।",
    "Find the coin with the 10.": "10 वाला सिक्का ढूँढो।",
    "Say the price and what the tray holds, then compare them.": "कीमत और ट्रे में रखे पैसे बोलो, फिर उनकी तुलना करो।",
    "The Total must equal the price, with any notes and coins.": "कोई भी नोट-सिक्के लगाओ, कुल कीमत के बराबर होना चाहिए।",
    "One price can be paid with different notes and coins.": "एक कीमत अलग-अलग नोट और सिक्कों से चुकाई जा सकती है।",
    "You learned: one price can be paid in many ways": "तुमने सीखा: एक कीमत कई तरीकों से चुकाई जा सकती है",
    "Pay it two ways": "दो तरीकों से चुकाओ",
    "Press Pay again after one way, then find a second way.": "एक तरीके के बाद फिर चुकाओ दबाओ, फिर दूसरा तरीका ढूँढो।",
    "Yes, both ways pay the same price.": "हाँ, दोनों तरीके एक ही कीमत चुकाते हैं।",
    "Each way must make the Total equal to the price.": "हर तरीके में कुल कीमत के बराबर होना चाहिए।",
    "A second way uses different notes and coins, so press Pay again first.": "दूसरे तरीके में अलग नोट-सिक्के लगते हैं, पहले फिर चुकाओ दबाओ।",
    "Compare the Total tag with the price tag.": "कुल की पट्टी को कीमत की पट्टी से मिलाओ।",
    "3 notes, 1 coin": "3 नोट, 1 सिक्का",
    "Count the notes and the coin you have used so far.": "अब तक लगाए नोट और सिक्के गिनो।",
    "Start with the biggest note that fits under the price.": "कीमत से कम का सबसे बड़ा नोट पहले लगाओ।",
    "Add up the notes first, then pick one coin to finish.": "पहले नोट जोड़ो, फिर पूरा करने के लिए एक सिक्का चुनो।",
    "The tray is full, press Pay again.": "ट्रे भर गई है, फिर चुकाओ दबाओ।",
    "That is one way. Now press Pay again and pay it another way.": "यह एक तरीका है। अब फिर चुकाओ दबाओ और दूसरे तरीके से चुकाओ।",
    "One way is kept, so pay the price a different way.": "एक तरीका रखा है, कीमत दूसरे तरीके से चुकाओ।",
    "That is the same way, so try a different set of notes and coins.": "यह वही तरीका है, नोट और सिक्कों का दूसरा सेट आज़माओ।",
    "Put all four notes in the row first.": "पहले चारों नोट कतार में रखो।",
    "Put some notes or coins in the tray first.": "पहले ट्रे में कुछ नोट या सिक्के रखो।",
    "Note": "नोट",
    "Coin": "सिक्का",
    "Least": "सबसे कम",
    "Greatest": "सबसे ज़्यादा",
    "Tray": "ट्रे",
    "Pay again": "फिर चुकाओ",
    "Needs more": "और चाहिए",
    "Too much": "ज़्यादा है",
    "Way 1": "तरीका 1",
    "3 notes + 1 coin": "3 नोट + 1 सिक्का",
  },
  gu: {
    "So far": "અત્યાર સુધી",
    "Total": "કુલ",
    "A shop counter, an open purse and a tray for the money.": "દુકાનનું કાઉન્ટર, એક ખુલ્લું પાકીટ અને પૈસા માટે એક ટ્રે.",
    "Free play. Tap the price tag to change the amount, then pay it.": "મુક્ત રમત. કિંમતના ટેગને અડો અને રકમ બદલો, પછી તે ચૂકવો.",
    "The tray is empty for the new amount.": "નવી રકમ માટે ટ્રે ખાલી છે.",
    "Pay the amount on the tag, press Pay again, then pay it another way.": "ટેગની રકમ ચૂકવો, ફરી ચૂકવો દબાવો, પછી બીજી રીતે ચૂકવો.",
    "Look at the price tag and pay that amount with notes and coins.": "કિંમતનો ટેગ જુઓ અને તેટલી રકમ નોટ અને સિક્કાથી ચૂકવો.",
    "Pay the amount": "રકમ ચૂકવો",
    "Yes, that money pays the amount on the tag.": "હા, આ પૈસાથી ટેગની રકમ ચૂકવાઈ ગઈ.",
    "Pay the tag amount with exactly 3 notes and 1 coin.": "બરાબર 3 નોટ અને 1 સિક્કાથી ટેગની રકમ ચૂકવો.",
    "Yes, the tag is paid with just those pieces.": "હા, બસ આ ટુકડાથી ટેગની રકમ ચૂકવાઈ ગઈ.",
    "Paid the exact price!": "કિંમત બરાબર ચૂકવી!",
    "That is more than the price.": "આ કિંમત કરતાં વધારે છે.",
    "Count the Money": "પૈસા ગણો",
    "You counted every group by its values.": "તમે દરેક સમૂહ તેની કિંમતથી ગણ્યો.",
    "You run the shop. Can you count the money?": "દુકાન તમે ચલાવો છો. શું તમે પૈસા ગણી શકો?",
    "Every note and coin has a value": "દરેક નોટ અને સિક્કાની એક કિંમત હોય છે",
    "Look at the number on each note and coin.": "દરેક નોટ અને સિક્કા પરનો અંક જુઓ.",
    "Tap the note with 50 on it to read its value.": "50 વાળી નોટને અડો અને તેની કિંમત વાંચો.",
    "Find the note with the big 50.": "મોટા 50 વાળી નોટ શોધો.",
    "Now tap the coin with 5 on it.": "હવે 5 વાળા સિક્કાને અડો.",
    "Find the small round coin with a 5.": "5 વાળો નાનો ગોળ સિક્કો શોધો.",
    "Put the two pieces side by side and compare their numbers.": "બંનેને સાથે મૂકો અને તેમના અંકોની સરખામણી કરો.",
    "Ignore the colour and the shine, and read only the big number.": "રંગ અને ચમક છોડો, ફક્ત મોટો અંક વાંચો.",
    "Money is worth its printed number, never its colour or size.": "પૈસાની કિંમત તેના પર છપાયેલો અંક છે, રંગ કે કદ નહીં.",
    "You learned: the number on a note or a coin is its value": "તમે શીખ્યા: નોટ કે સિક્કા પરનો અંક તેની કિંમત છે",
    "Looking at the number on each piece, what is each one worth in rupees?": "દરેક પર લખેલો અંક જુઓ, દરેક કેટલા રૂપિયાનું છે?",
    "Each is worth?": "દરેકની કિંમત?",
    "Tap each piece and read the number on it.": "દરેકને અડો અને તેના પરનો અંક વાંચો.",
    "Yes, each piece is worth what is printed on it.": "હા, દરેક તેના પર છપાયેલા જેટલાનું છે.",
    "Tap the four notes in order, from the least to the greatest.": "ચારેય નોટને ઓછીથી વધુના ક્રમમાં અડો.",
    "Least to greatest": "ઓછીથી વધુ",
    "Find the note with the smallest number first.": "પહેલા સૌથી નાના અંકવાળી નોટ શોધો.",
    "Yes, the notes now go from the least to the greatest.": "હા, હવે નોટ ઓછીથી વધુના ક્રમમાં છે.",
    "The note": "નોટ",
    "The coin": "સિક્કો",
    "The same": "સરખી",
    "Which is worth more, this note or this coin?": "કયું વધુ કિંમતનું છે, આ નોટ કે આ સિક્કો?",
    "Which is worth more?": "કોની કિંમત વધુ?",
    "Read the number on each piece, not how it looks.": "દરેક પરનો અંક વાંચો, તેનો દેખાવ નહીં.",
    "Yes, the note and the coin are worth exactly the same.": "હા, નોટ અને સિક્કો બરાબર સરખી કિંમતના છે.",
    "Counting notes or coins of one kind": "એક જ પ્રકારની નોટ કે સિક્કા ગણવા",
    "Tap each one and watch the total climb.": "દરેકને અડો અને જુઓ કુલ કેવી રીતે વધે છે.",
    "Tap a note on the counter to count it.": "કાઉન્ટર પરની એક નોટને અડો અને તેને ગણો.",
    "Tap any note in the row.": "હરોળમાંની કોઈ પણ નોટને અડો.",
    "Tap another note and watch the total jump.": "બીજી નોટને અડો અને જુઓ કુલ કેવો વધે છે.",
    "Tap a note that is not counted yet.": "જે નોટ હજી ગણી નથી તેને અડો.",
    "Tap the third note and keep counting.": "ત્રીજી નોટને અડો અને ગણતા રહો.",
    "Two notes are still waiting.": "બે નોટ હજી બાકી છે.",
    "Tap the last note to finish the count.": "છેલ્લી નોટને અડો અને ગણતરી પૂરી કરો.",
    "One note is still waiting.": "એક નોટ હજી બાકી છે.",
    "Say the value of one piece, then count on by that much.": "એકની કિંમત બોલો, પછી એટલું-એટલું ઉમેરતા જાઓ.",
    "Count the pieces one by one, with one jump for each.": "ટુકડાને એક-એક કરીને ગણો, દરેક સાથે એક કૂદકો.",
    "Notes or coins of one kind are counted in jumps of their value.": "એક જ પ્રકારની નોટ કે સિક્કા તેમની કિંમતના કૂદકામાં ગણાય છે.",
    "You learned: count notes or coins of one kind in jumps of value": "તમે શીખ્યા: એક પ્રકારની નોટ કે સિક્કા કિંમતના કૂદકામાં ગણો",
    "Tap the notes on the counter, then type the money there.": "કાઉન્ટર પરની નોટને અડો, પછી લખો ત્યાં કેટલા પૈસા છે.",
    "Money on the counter?": "કાઉન્ટર પર કેટલા પૈસા?",
    "Read the number on a note, then count on from it.": "નોટનો અંક વાંચો, પછી ત્યાંથી આગળ ગણો.",
    "Yes, each note added the same amount to the total.": "હા, દરેક નોટે કુલમાં એટલું જ ઉમેર્યું.",
    "Now tap the coins on the counter, then type how much they make.": "હવે કાઉન્ટર પરના સિક્કા અડો, પછી લખો તે કેટલા થાય છે.",
    "Total of the coins?": "સિક્કાનો કુલ?",
    "Count the coins by their value, not by how many there are.": "સિક્કાને તેમની કિંમતથી ગણો, સંખ્યાથી નહીં.",
    "Yes, seven coins of the same value make that much.": "હા, એક જ કિંમતના સાત સિક્કા આટલા થાય છે.",
    "Tap every note onto the counter, then type how much more the bigger pile has.": "દરેક નોટ કાઉન્ટર પર મૂકો, પછી લખો મોટા ઢગલામાં કેટલું વધુ છે.",
    "How much more?": "કેટલું વધુ?",
    "Compare the two totals, pile against pile.": "બંને કુલની સરખામણી કરો, ઢગલા સાથે ઢગલો.",
    "Yes, the bigger pile holds that much more.": "હા, મોટા ઢગલામાં આટલું વધુ છે.",
    "Counting a mixed handful": "મિશ્ર નોટ-સિક્કા ગણવા",
    "Begin with the biggest value. Add one kind at a time. What is the total now?": "સૌથી મોટી કિંમતથી શરૂ કરો. એક-એક પ્રકાર ઉમેરો. હવે કુલ કેટલું છે?",
    "Drag the biggest note into the tray.": "સૌથી મોટી નોટ ખેંચીને ટ્રેમાં મૂકો.",
    "Start with the note.": "નોટથી શરૂ કરો.",
    "Now drag the coin into the tray.": "હવે સિક્કાને ખેંચીને ટ્રેમાં મૂકો.",
    "Drag the coin next.": "હવે સિક્કાને ખેંચો.",
    "Tap the top row to add it to the total.": "ઉપરની હરોળને અડો અને કુલમાં ઉમેરો.",
    "The top row is the biggest.": "ઉપરની હરોળ સૌથી મોટી છે.",
    "Tap the next row to add it as well.": "આગલી હરોળને અડો અને તેને પણ ઉમેરો.",
    "Tap the row below.": "નીચેની હરોળને અડો.",
    "Point to the row with the biggest value and count it first.": "સૌથી મોટી કિંમતવાળી હરોળ બતાવો અને તેને પહેલા ગણો.",
    "Say the total after that row and after the next one.": "તે હરોળ પછી અને આગલી પછી કુલ બોલો.",
    "A mixed handful is counted one kind at a time, starting with the biggest value.": "મિશ્ર પૈસા એક-એક પ્રકાર કરીને ગણાય છે, સૌથી મોટી કિંમતથી શરૂ કરીને.",
    "You learned: count a mixed handful one kind at a time, biggest first": "તમે શીખ્યા: મિશ્ર પૈસા એક-એક પ્રકારે, સૌથી મોટાથી ગણો",
    "Move every piece into the tray, count the rows, then type the total.": "દરેક ટુકડો ટ્રેમાં મૂકો, હરોળ ગણો, પછી કુલ લખો.",
    "Money in the purse?": "પાકીટમાં કેટલા પૈસા?",
    "Look at the numbers and start with the largest one.": "અંક જુઓ અને સૌથી મોટાથી શરૂ કરો.",
    "Yes, every kind is in the total.": "હા, દરેક પ્રકાર કુલમાં આવી ગયો.",
    "Add each piece to the tray, then count the rows and type the purse total.": "દરેક ટુકડો ટ્રેમાં ઉમેરો, હરોળ ગણો, પછી પાકીટનો કુલ લખો.",
    "Purse total?": "પાકીટનો કુલ?",
    "Keep the total so far in your head as each row is counted.": "દરેક હરોળ ગણતી વખતે અત્યાર સુધીનો કુલ યાદ રાખો.",
    "Yes, the notes and coins all count.": "હા, બધી નોટ અને સિક્કા ગણાયા.",
    "Fill the tray, tap the rows from the top, then type what the purse holds.": "ટ્રે ભરો, ઉપરથી હરોળ અડો, પછી લખો પાકીટમાં કેટલું છે.",
    "How much inside?": "અંદર કેટલું?",
    "Count how many pieces of each kind there are, too.": "દરેક પ્રકારના કેટલા છે તે પણ ગણો.",
    "Yes, nothing was left out of the total.": "હા, કુલમાં કંઈ છૂટ્યું નથી.",
    "Start with the biggest.": "સૌથી મોટાથી શરૂ કરો.",
    "Put all the money in the tray first.": "પહેલા બધા પૈસા ટ્રેમાં મૂકો.",
    "One amount, many ways to pay": "એક રકમ, ચૂકવવાની ઘણી રીતો",
    "Pay the price on the tag. Can you pay it a different way?": "ટેગ પરની કિંમત ચૂકવો. શું બીજી રીતે પણ ચૂકવી શકો?",
    "The tray already pays the price, so tap Pay again to clear it.": "ટ્રેમાં કિંમત પૂરી છે, ફરી ચૂકવો દબાવીને તેને ખાલી કરો.",
    "Tap the Pay again key.": "ફરી ચૂકવો બટનને અડો.",
    "Now tap a coin with 20 on it to put it in the tray.": "હવે 20 વાળો સિક્કો અડો અને ટ્રેમાં મૂકો.",
    "Find the coin with the 20.": "20 વાળો સિક્કો શોધો.",
    "Tap a coin with 10 on it to reach the price again.": "10 વાળો સિક્કો અડો, ફરી કિંમત પૂરી થશે.",
    "Find the coin with the 10.": "10 વાળો સિક્કો શોધો.",
    "Say the price and what the tray holds, then compare them.": "કિંમત અને ટ્રેમાં રાખેલા પૈસા બોલો, પછી સરખામણી કરો.",
    "The Total must equal the price, with any notes and coins.": "કોઈ પણ નોટ-સિક્કા વાપરો, કુલ કિંમત જેટલું થવું જોઈએ.",
    "One price can be paid with different notes and coins.": "એક કિંમત અલગ-અલગ નોટ અને સિક્કાથી ચૂકવી શકાય છે.",
    "You learned: one price can be paid in many ways": "તમે શીખ્યા: એક કિંમત ઘણી રીતે ચૂકવી શકાય છે",
    "Pay it two ways": "બે રીતે ચૂકવો",
    "Press Pay again after one way, then find a second way.": "એક રીત પછી ફરી ચૂકવો દબાવો, પછી બીજી રીત શોધો.",
    "Yes, both ways pay the same price.": "હા, બંને રીતે એ જ કિંમત ચૂકવાય છે.",
    "Each way must make the Total equal to the price.": "દરેક રીતમાં કુલ કિંમત જેટલું થવું જોઈએ.",
    "A second way uses different notes and coins, so press Pay again first.": "બીજી રીતમાં અલગ નોટ-સિક્કા વપરાય છે, પહેલા ફરી ચૂકવો દબાવો.",
    "Compare the Total tag with the price tag.": "કુલની પટ્ટીને કિંમતની પટ્ટી સાથે સરખાવો.",
    "3 notes, 1 coin": "3 નોટ, 1 સિક્કો",
    "Count the notes and the coin you have used so far.": "અત્યાર સુધી મૂકેલી નોટ અને સિક્કા ગણો.",
    "Start with the biggest note that fits under the price.": "કિંમતથી ઓછી હોય તેવી સૌથી મોટી નોટ પહેલા મૂકો.",
    "Add up the notes first, then pick one coin to finish.": "પહેલા નોટ ઉમેરો, પછી પૂરું કરવા એક સિક્કો પસંદ કરો.",
    "The tray is full, press Pay again.": "ટ્રે ભરાઈ ગઈ છે, ફરી ચૂકવો દબાવો.",
    "That is one way. Now press Pay again and pay it another way.": "આ એક રીત છે. હવે ફરી ચૂકવો દબાવો અને બીજી રીતે ચૂકવો.",
    "One way is kept, so pay the price a different way.": "એક રીત રાખી છે, કિંમત બીજી રીતે ચૂકવો.",
    "That is the same way, so try a different set of notes and coins.": "આ એ જ રીત છે, નોટ અને સિક્કાનો બીજો સેટ અજમાવો.",
    "Put all four notes in the row first.": "પહેલા ચારેય નોટ હરોળમાં મૂકો.",
    "Put some notes or coins in the tray first.": "પહેલા ટ્રેમાં થોડી નોટ કે સિક્કા મૂકો.",
    "Note": "નોટ",
    "Coin": "સિક્કો",
    "Least": "સૌથી ઓછી",
    "Greatest": "સૌથી વધુ",
    "Tray": "ટ્રે",
    "Pay again": "ફરી ચૂકવો",
    "Needs more": "વધુ જોઈએ",
    "Too much": "વધારે છે",
    "Way 1": "રીત 1",
    "3 notes + 1 coin": "3 નોટ + 1 સિક્કો",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Every note and coin has a value",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Look at the number on each note and coin."],
    steps: [
      { say: "Tap the note with 50 on it to read its value.", on: "read-n50", hint: "Find the note with the big 50." },
      { say: "Now tap the coin with 5 on it.", on: "read-c5", hint: "Find the small round coin with a 5." },
    ],
    ladder: ["Put the two pieces side by side and compare their numbers.", "Ignore the colour and the shine, and read only the big number."],
    closing: "Money is worth its printed number, never its colour or size.",
    learned: "You learned: the number on a note or a coin is its value",
    traceback: "The two pieces ring their numbers; the sorted row is made again from the numbers and stops one note short.",
    items: [
      /* learn CM1: Yes, each is worth ₹20 */
      { qid: "M1.S1.T2.C5:CM1", kind: "pair", sc: { a: "n20", b: "c20" }, say: "Looking at the number on each piece, what is each one worth in rupees?", ask: "Each is worth?", answer: 20,
        miss: "Tap each piece and read the number on it.", win: "Yes, each piece is worth what is printed on it." },
      /* practice 1: ₹10, ₹50, ₹200, ₹500 (made on the working area: the row of notes) */
      { qid: "M1.S1.T2.C5:1", kind: "order", pad: "enter", sc: { ids: ["n200", "n10", "n500", "n50"] }, say: "Tap the four notes in order, from the least to the greatest.", ask: "Least to greatest", answer: "least-to-greatest",
        miss: "Find the note with the smallest number first.", win: "Yes, the notes now go from the least to the greatest." },
      /* authored: no plan question tests the note-versus-coin misconception directly */
      { qid: null, kind: "pair", sc: { a: "n10", b: "c10" }, choices: [{ id: "note", label: "The note" }, { id: "coin", label: "The coin" }, { id: "same", label: "The same" }],
        say: "Which is worth more, this note or this coin?", ask: "Which is worth more?", answer: "same",
        miss: "Read the number on each piece, not how it looks.", win: "Yes, the note and the coin are worth exactly the same." },
    ],
  },
  {
    n: 2,
    concept: "Counting notes or coins of one kind",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Tap each one and watch the total climb."],
    steps: [
      { say: "Tap a note on the counter to count it.", on: "tap-1", hint: "Tap any note in the row." },
      { say: "Tap another note and watch the total jump.", on: "tap-2", hint: "Tap a note that is not counted yet." },
      { say: "Tap the third note and keep counting.", on: "tap-3", hint: "Two notes are still waiting." },
      { say: "Tap the last note to finish the count.", on: "tap-4", hint: "One note is still waiting." },
    ],
    ladder: ["Say the value of one piece, then count on by that much.", "Count the pieces one by one, with one jump for each."],
    closing: "Notes or coins of one kind are counted in jumps of their value.",
    learned: "You learned: count notes or coins of one kind in jumps of value",
    traceback: "The counter empties and the pieces land again, one jump each, stopping one jump before the total.",
    items: [
      /* learn CM2: ₹200 */
      { qid: "M1.S1.T2.C6:CM2", kind: "pile", sc: { kind: "n50", n: 4 }, say: "Tap the notes on the counter, then type the money there.", ask: "Money on the counter?", answer: 200,
        miss: "Read the number on a note, then count on from it.", win: "Yes, each note added the same amount to the total." },
      /* practice 2: ₹14 */
      { qid: "M1.S1.T2.C6:2", kind: "pile", sc: { kind: "c2", n: 7 }, say: "Now tap the coins on the counter, then type how much they make.", ask: "Total of the coins?", answer: 14,
        miss: "Count the coins by their value, not by how many there are.", win: "Yes, seven coins of the same value make that much." },
      /* practice 5: ₹100 more (7 notes of ₹100 = ₹700, 3 notes of ₹200 = ₹600) */
      { qid: "M1.S1.T2.C6:5", kind: "trays", sc: { a: { kind: "n200", n: 3 }, b: { kind: "n100", n: 7 } }, say: "Tap every note onto the counter, then type how much more the bigger pile has.", ask: "How much more?", answer: 100,
        miss: "Compare the two totals, pile against pile.", win: "Yes, the bigger pile holds that much more." },
    ],
  },
  {
    n: 3,
    concept: "Counting a mixed handful",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Begin with the biggest value. Add one kind at a time. What is the total now?"],
    steps: [
      { say: "Drag the biggest note into the tray.", on: "kind-n50", hint: "Start with the note." },
      { say: "Now drag the coin into the tray.", on: "kind-c10", hint: "Drag the coin next." },
      { say: "Tap the top row to add it to the total.", on: "count-n50", hint: "The top row is the biggest." },
      { say: "Tap the next row to add it as well.", on: "count-c10", hint: "Tap the row below." },
    ],
    ladder: ["Point to the row with the biggest value and count it first.", "Say the total after that row and after the next one."],
    closing: "A mixed handful is counted one kind at a time, starting with the biggest value.",
    learned: "You learned: count a mixed handful one kind at a time, biggest first",
    traceback: "The tray fills again and the rows are counted from the top, stopping one row before the total.",
    items: [
      /* learn CM3: ₹240 */
      { qid: "M1.S1.T2.C7:CM3", kind: "purse", sc: { has: { n100: 2, n20: 1, c10: 1, c5: 2 } }, say: "Move every piece into the tray, count the rows, then type the total.", ask: "Money in the purse?", answer: 240,
        miss: "Look at the numbers and start with the largest one.", win: "Yes, every kind is in the total." },
      /* practice 3: ₹66 */
      { qid: "M1.S1.T2.C7:3", kind: "purse", sc: { has: { n50: 1, n10: 1, c2: 3 } }, say: "Add each piece to the tray, then count the rows and type the purse total.", ask: "Purse total?", answer: 66,
        miss: "Keep the total so far in your head as each row is counted.", win: "Yes, the notes and coins all count." },
      /* practice 7: ₹700 */
      { qid: "M1.S1.T2.C7:7", kind: "purse", sc: { has: { n500: 1, n50: 3, c10: 4, c2: 5 } }, say: "Fill the tray, tap the rows from the top, then type what the purse holds.", ask: "How much inside?", answer: 700,
        miss: "Count how many pieces of each kind there are, too.", win: "Yes, nothing was left out of the total." },
    ],
  },
  {
    n: 4,
    concept: "One amount, many ways to pay",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Pay the price on the tag. Can you pay it a different way?"],
    steps: [
      { say: "The tray already pays the price, so tap Pay again to clear it.", on: "pay-again", hint: "Tap the Pay again key." },
      { say: "Now tap a coin with 20 on it to put it in the tray.", on: "put-c20", hint: "Find the coin with the 20." },
      { say: "Tap a coin with 10 on it to reach the price again.", on: "put-c10", hint: "Find the coin with the 10." },
    ],
    ladder: ["Say the price and what the tray holds, then compare them.", "The Total must equal the price, with any notes and coins."],
    closing: "One price can be paid with different notes and coins.",
    learned: "You learned: one price can be paid in many ways",
    traceback: "The Total stays amber against the price until the two are equal; a first way waits beside the tray.",
    items: [
      /* learn CM4: two ways to pay ₹130 (made on the working area: the tray) */
      { qid: "M1.S1.T2.C8:CM4", kind: "pay", pad: "enter", sc: { price: 130, mode: "two" }, say: "Pay the amount on the tag, press Pay again, then pay it another way.", ask: "Pay it two ways", answer: "pay-two-ways",
        miss: "Press Pay again after one way, then find a second way.", win: "Yes, both ways pay the same price.",
        ladder: ["Each way must make the Total equal to the price.", "A second way uses different notes and coins, so press Pay again first."] },
      /* practice 4: one way to pay ₹85 */
      { qid: "M1.S1.T2.C8:4", kind: "pay", pad: "enter", sc: { price: 85, mode: "one" }, say: "Look at the price tag and pay that amount with notes and coins.", ask: "Pay the amount", answer: "pay-exactly",
        miss: "Compare the Total tag with the price tag.", win: "Yes, that money pays the amount on the tag." },
      /* practice 8: ₹175 with exactly 3 notes and 1 coin (100 + 50 + 20 + 5) */
      { qid: "M1.S1.T2.C8:8", kind: "pay", pad: "enter", sc: { price: 175, mode: "three1" }, say: "Pay the tag amount with exactly 3 notes and 1 coin.", ask: "3 notes, 1 coin", answer: "pay-3-notes-1-coin",
        miss: "Count the notes and the coin you have used so far.", win: "Yes, the tag is paid with just those pieces.",
        ladder: ["Start with the biggest note that fits under the price.", "Add up the notes first, then pick one coin to finish."] },
      /* practice 6 (which two of A, B, C pay ₹36) is the unused plan question: the phase keeps three */
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  scene: "A shop counter: an open purse at the bottom left, the notes and coins lying on the counter to its right, the money tray in the centre with one row per denomination (value chip, pieces, sky-blue count, green subtotal) and a separate Total line, and, in the paying phase and Free play, one price tag showing the amount to pay. No hands, people or faces; nothing is completed for the child.",
  notes: [500, 200, 100, 50, 20, 10], coins: [20, 10, 5, 2, 1],
  freePrices: FREE_PRICES,
  trays: { "M1.S1.T2.C6:5": { a: 3 * 200, b: 7 * 100 } },
  prices: { "M1.S1.T2.C8:CM4": 130, "M1.S1.T2.C8:4": 85, "M1.S1.T2.C8:8": 175 },
  ways: { "M1.S1.T2.C8:CM4": ["n100,n20,c10", "n50x2,n20,c10"], "M1.S1.T2.C8:4": ["n50,n20,c10,c5"], "M1.S1.T2.C8:8": ["n100,n50,n20,c5"] },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const mlPayOk = (item: any, m: any) => mlSum(m) === item.sc.price && (item.sc.mode !== "three1" || (mlCnt(m, "n") === 3 && mlCnt(m, "c") === 1));
const judge = (item: any, v: any) => {
  if (item.kind === "order") return String(v) === "n10,n50,n200,n500";
  if (item.kind === "pay") {
    const ws = String(v).split("|").filter((x: string) => x).map(mlParse);
    if (!ws.length || !ws.every((m: any) => mlPayOk(item, m))) return false;
    return item.sc.mode === "two" ? new Set(ws.map(mlSig)).size >= 2 : true;
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* every answer again, by a second route: jump by jump, one piece at a time */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const sc = it.sc; if (!sc) return false;
  const jump = (kind: string, n: number) => { let t = 0; for (let i = 0; i < n; i++) t += ML_V[kind]; return t; };
  if (it.kind === "pile") return it.answer === jump(sc.kind, sc.n);
  if (it.kind === "trays") return it.answer === jump(sc.b.kind, sc.b.n) - jump(sc.a.kind, sc.a.n);
  if (it.kind === "purse") return it.answer === Object.keys(sc.has).reduce((t: number, k: string) => t + jump(k, sc.has[k]), 0);
  if (it.kind === "pay") return MODEL.ways[it.qid].every((w: string) => { const m = mlParse(w); let t = 0; Object.keys(m).forEach((k) => { t += jump(k, m[k]); }); return t === sc.price; });
  if (it.kind === "order") return [...sc.ids].sort((a: string, b: string) => ML_V[a] - ML_V[b]).join(",") === "n10,n50,n200,n500";
  return it.kind === "pair" && ML_V[sc.a] === ML_V[sc.b] && (it.choices ? it.answer === "same" : it.answer === ML_V[sc.a]);
}));
/* the plan's slip per kind: pieces added to the value (4 and 50); a purse's values added without the counts; two piles compared by pieces plus value */
const nearMiss = (item: any) => {
  const sc = item.sc, v = (k: string) => ML_V[k];
  if (item.kind === "pile") return sc.n + v(sc.kind);
  if (item.kind === "purse") return Object.keys(sc.has).reduce((t: number, k: string) => t + v(k), 0);
  if (item.kind === "trays") return Math.abs(sc.a.n + v(sc.a.kind) - (sc.b.n + v(sc.b.kind)));
  if (item.choices) return "note";
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it: a number, a choice, or the signature of the money it puts in the tray */
const agentKey = (item: any) => (item.kind === "pay" ? MODEL.ways[item.qid].join("|") : item.kind === "order" ? "n10,n50,n200,n500" : item.answer);

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(agentKey(item)));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Three bands, all laid out from box.w (1472 with no keypad, 900 with it open): the SHELF (y 0 to 172, left of the key's corner),
   the COUNTER (y 178 to 374, where the maths happens) and the WALLET (y 376 to 520, where the money comes from). */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  ML_SK = 0;
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach");
  const sc: any = free ? ML_FREE : warm ? ML_WARM[n] : item.sc;
  const K: string = free ? "free" : warm ? sc.k : item.kind;
  const qk = free ? "free" : warm ? "w" + n : n + "." + index;
  const reveal = stage === "win" || stage === "idle";
  const W = box && box.w ? box.w : 900;
  const kx = Math.min(box && box.key ? box.key.x - 12 : W, W);
  const wide = W >= 1200;
  const [raw, setRaw] = useState(() => mlFresh(qk));
  const SR: any = useRef(raw);
  const S: any = raw.qk === qk ? raw : mlFresh(qk);
  if (SR.current.qk !== qk) SR.current = S;
  /* the counter: the open purse bottom left (330 x 214, one size in every phase); the tray / mat right of it (centre), left of the key's corner;
     the money lies on the counter along the bottom, right of the purse */
  const PX0 = 350, matR = Math.min(kx, W - 8), ext = matR < W - 8;
  const moneyGone = (K === "purse" && Object.keys(sc.has).every((k: string) => ((S.tray || {})[k] || 0) >= sc.has[k])) || (K === "trays" && ((S.tray || {})[sc.a.kind] || 0) >= sc.a.n && ((S.tray || {})[sc.b.kind] || 0) >= sc.b.n);
  const purseN = K === "purse" ? Object.keys(sc.has).reduce((t: number, k: string) => t + sc.has[k], 0) : 0;   /* a big handful (13 pieces) needs two honest rows under a shorter tray */
  const Z0 = 8, ZH = K === "pile" || moneyGone ? 504 : wide ? (purseN > 8 ? 292 : 360) : 286, WY = wide ? 374 : 300, WH = 520 - WY;
  const tagW = wide ? 120 : 100, tagH = Math.round(tagW * 150 / 87);
  const sy = Math.max(8, (ZH - 170) / 2), spOff = wide ? 240 : 156, spCx = (PX0 + matR) / 2;

  const put = (p: any) => { const b = SR.current.qk === qk ? SR.current : mlFresh(qk); SR.current = { ...b, ...p }; setRaw(SR.current); };
  const busy = useRef(false);
  const acting = useRef(false);
  const lastKey = useRef(0);
  const lastPut = useRef({} as any);
  const nudged = useRef(0 as any);
  const nudgeAt = useRef(0);
  const flyN = useRef(0);
  const geo = useRef({} as any);
  const clearHint = () => { try { if (api.openAnswer && api.openAnswer()) setTimeout(() => { if (api.closeAnswer) api.closeAnswer(); }, 330); } catch (e) { /* the hint just stays */ } };
  const hintUp = () => { try { const g = (window as any).toolApi && (window as any).toolApi.getState ? (window as any).toolApi.getState() : null; return !!(g && g.hint && g.hintKind === "hint"); } catch (e) { return false; } };
  const nudge = (line: string, keep = false) => { if (stage !== "ask") return; if (hintUp()) clearHint(); nudged.current = keep ? 2 : 1; nudgeAt.current = Date.now(); api.say(line); };

  /* the money that can come out of the wallet right now */
  const tray = S.tray;
  const left = (id: string, total: number) => total - (tray[id] || 0);
  const walletList = (): any[] => {
    if (K === "all11" || K === "free" || K === "pay") return ML_KINDS.map((id: string) => ({ id, n: 1 }));
    if (K === "pair") return [{ id: sc.a, n: 1 }, { id: sc.b, n: 1 }];
    if (K === "order") return sc.ids.filter((id: string) => S.placed.indexOf(id) < 0).map((id: string) => ({ id, n: 1 }));
    if (K === "pile") return [];
    if (K === "trays") return [sc.a, sc.b].map((g: any) => ({ id: g.kind, n: left(g.kind, g.n) })).filter((x: any) => x.n > 0);
    if (K === "purse") return KS.filter((k: string) => sc.has[k]).reduce((a: any[], k: string) => a.concat(Array.from({ length: sc.has[k] - (tray[k] || 0) }, (_: any, j: number) => ({ id: k, n: 1, uid: k + "#" + j, j }))), []);
    return [];
  };
  const ctlId = (it: any) => (K === "pair" || K === "all11" ? "read-" + it.id : K === "order" ? "note-" + it.id : K === "pile" ? "take-" + ((tray[sc.kind] || 0) + 1)
    : K === "trays" ? "take-" + it.id : K === "purse" ? "kind-" + it.id + (it.j ? "-" + (it.j + 1) : "") : "put-" + it.id);

  /* ── geometry (counter coordinates are relative to Z0; fly / act points are absolute) ── */
  const pileGeom = () => {
    const nn = K === "pile" ? sc.n : 0, kd = sc.kind || "n20", note = mlNote(kd), bw = note ? ML_NW : ML_CD;
    const realH = (s0: number) => (note ? bw * s0 * NOTE_A[ML_V[kd]] : ML_CD * s0 * (COIN_R[kd] || 1));
    const xL = PX0 + 14, xR = W - 16, cols = wide ? Math.max(nn, 1) : nn <= 4 ? 2 : 4, rowsN = Math.max(1, Math.ceil(nn / cols)), stride = (xR - xL) / cols;
    let s = Math.min(1.9, (stride * 0.9) / bw);
    while (s > 0.6 && 100 + rowsN * (realH(s) + 76) > ZH) s -= 0.02;
    const pw = bw * s, ph = realH(s), pad = note ? (ML_NH * s - ph) / 2 : 0, rh2 = ph + 76, py = 100 + Math.max(0, (ZH - 100 - rowsN * rh2) / 2);
    return { s, pw, ph, py, pad, stride, xs: Array.from({ length: nn }, (_: any, i: number) => xL + stride * (i % cols) + (stride - pw) / 2), ys: Array.from({ length: nn }, (_: any, i: number) => py + Math.floor(i / cols) * rh2) };
  };
  const orderGeom = () => {
    const gap = 16, xL = PX0 + 24, xR = matR - 24, sw = (xR - xL - 3 * gap) / 4, s = Math.min(1.3, sw / ML_NW), pw = ML_NW * s, ph = ML_NH * s;
    return { s, pw, ph, py: Math.max(24, (ZH - ph - 56) / 2), xL, xR, xs: [0, 1, 2, 3].map((i: number) => xL + i * (sw + gap) + (sw - pw) / 2) };
  };
  const keptW = K === "pay" && S.ways.length ? 336 : 0;   /* the first way, kept small beside the tray */
  const hasTag = K === "pay" || K === "free";
  const hitsOf = (s: any) => { const c = K === "pile" ? (s.tray[sc.kind] || 0) : 0; return s.hit && s.hit.length === c ? s.hit : Array.from({ length: c }, (_: any, i: number) => i); };
  /* the rows area of the tray: ONE column, one denomination a row, highest first; a separate Total line sits under it (P3, P4, Free play) */
  const rowsR = matR - 8;
  const trayBox = () => ({ x: PX0 + 10, y: 10, w: rowsR - (PX0 + 10) - keptW, h: K === "trays" ? ZH - 20 : ZH - 10 - 76 });
  const rowsOf = (cnt: any) => KS.filter((k: string) => cnt[k] > 0);
  const rowH = (nr: number, tb: any) => (K === "trays" ? (moneyGone ? Math.min(190, Math.floor(tb.h / 2)) : Math.min(100, Math.floor(tb.h / 2))) : Math.min(moneyGone ? 120 : 88, Math.floor(tb.h / Math.max(nr, 4))));
  const rowGeom = (cnt: any, id: string) => {
    const tb = trayBox(), rs = K === "trays" ? [sc.a.kind, sc.b.kind] : rowsOf(cnt), i = Math.max(0, rs.indexOf(id)), rh = rowH(rs.length, tb);
    const x0 = tb.x, w0 = tb.w, g = mlRowGeom(x0, w0, K === "trays"), y = tb.y + (K === "trays" && moneyGone ? Math.floor((tb.h - 2 * rh) / 2) : 0) + i * rh;
    return { g, y, rh, tb, x0, w0, fan: mlFan(id, Math.max(cnt[id] || 0, 1), g.fanX, y + 3, g.fw, rh - 6, K === "trays" && moneyGone ? 1.7 : 1) };
  };

  /* the wallet: where each stack sits (absolute, Work coordinates) */
  const wRaw = walletList();
  const walletW = W - 24;   /* the money row runs to the right end of the wood */
  const PL = 358;   /* the open purse stands at the bottom left; the money lies on the counter to its right */
  const isN = (it: any) => mlNote(it.id);
  /* loose pieces: real notes about 185 and coins by their true diameters (the Rs 10 about 100), fanned like a wallet when the width runs out
     (a hit box is the visible strip); one row, or notes then coins when the width is short; a rupee chip under EVERY piece */
  const hasChip = K !== "pair" && K !== "order";
  const chipWOf = (it: any) => { const n = ("₹" + ML_V[it.id]).length; return n >= 4 ? 114 : n === 3 ? 92 : 72; };
  const bandTop = ZH + Z0 + 2, bandEnd = 494;   /* the money row lives between the tray's bottom edge and the wood's shaded foot; chips end at 494 */
  const layoutLoose = (list: any[]) => {
    const x0 = PL + 8, avail = walletW - x0 - 4, blk = bandEnd - bandTop;
    const bwOf = (it: any, ns: number, cs: number) => (isN(it) ? ML_NW * ns : ML_CD * cs);
    const stepOf = (it: any, ns: number, cs: number, f: any) => Math.max(bwOf(it, ns, cs) * (isN(it) ? f.fn : f.fc), hasChip ? chipWOf(it) + 6 : 0);
    const total = (rl: any[], f: any, ns: number, cs: number) => rl.reduce((a: number, it: any, i: number) => a + (i === rl.length - 1 ? Math.max(bwOf(it, ns, cs), hasChip ? chipWOf(it) : 0) : stepOf(it, ns, cs, f)), 0);
    const fit = (rl: any[], ns: number, cs: number, av: number) => { const fnMin = Math.max(0.7, 72 / (ML_NW * ns)), fcMin = Math.max(0.7, 72 / (ML_CD * cs)); let f = { fn: 1.06, fc: 1.06 }; while (total(rl, f, ns, cs) > av && (f.fn > fnMin || f.fc > fcMin)) f = f.fn > fnMin ? { fn: Math.max(fnMin, f.fn - 0.03), fc: f.fc } : { fn: f.fn, fc: Math.max(fcMin, f.fc - 0.03) }; return total(rl, f, ns, cs) <= av ? f : null; };
    const unit = hasChip ? 42 : 8;
    const capN = (bk: number) => (bk - unit) / ML_NH, capC = (bk: number) => (bk - unit) / (ML_CD * 1.04);
    let ns = 1, cs = 1, fs: any[] = [], rowsL: any[][] = [], packed = false;
    for (const lv of [[1.45, 1.14], [1.3, 1.08], [1.15, 1.0], [1.0, 0.9], [0.9, 0.8], [0.8, 0.72]]) { const n1 = Math.min(lv[0], capN(blk)), c1 = Math.min(lv[1], capC(blk)); const r0 = fit(list, n1, c1, avail); if (r0) { ns = n1; cs = c1; fs = [r0]; rowsL = [list]; break; } }
    if (!rowsL.length) {
      const n2 = Math.min(1, capN(blk / 2)), c2 = Math.min(0.9, capC(blk / 2)), sp = [list.filter(isN), list.filter((it: any) => !isN(it))].filter((rl: any[]) => rl.length), f2 = sp.map((rl: any[]) => fit(rl, n2, c2, avail));
      if (f2.every(Boolean)) { ns = n2; cs = c2; fs = f2; rowsL = sp; } else packed = true;
    }
    const out: any[] = [];
    let rowsOut: any[][] = [];   /* each row: pieces with their own box { it, x (piece left), bw, hx, hw, chipX, chipW } */
    if (!packed) {
      rowsOut = rowsL.map((rl: any[], r: number) => { let x = x0; return rl.map((it: any, i: number) => {
        const bw = bwOf(it, ns, cs), last = i === rl.length - 1, step = last ? Math.max(bw, hasChip ? chipWOf(it) : 0) : stepOf(it, ns, cs, fs[r]), hw = Math.max(72, step);
        const o = { it, x, bw, hx: x, hw, chipX: x + (last ? hw : step) / 2, chipW: hasChip ? chipWOf(it) : 0 }; x += step; return o; }); });
    } else {
      /* too many pieces for two honest rows: pack pieces ABOUT 72 wide each (a finger box), one chip per kind-group under its pieces, as many rows as it takes */
      const grpW = (rl: any[]) => { let w = 0, i = 0; while (i < rl.length) { let j = i; while (j < rl.length && rl[j].id === rl[i].id) j++; w += Math.max((j - i) * 72, hasChip ? chipWOf(rl[i]) : 0); i = j; } return w; };
      const rr: any[][] = [[]];
      list.forEach((it: any) => { const cur = rr[rr.length - 1]; if (cur.length && grpW(cur.concat([it])) > avail) rr.push([it]); else cur.push(it); });
      const R = rr.length;
      ns = Math.min(1, capN(blk / R), 96 / ML_NW); cs = Math.min(0.9, capC(blk / R), 72 / ML_CD);
      rowsOut = rr.map((rl: any[]) => { const o2: any[] = []; let x = x0, i = 0;
        while (i < rl.length) { let j = i; while (j < rl.length && rl[j].id === rl[i].id) j++; const n = j - i, gw = Math.max(n * 72, hasChip ? chipWOf(rl[i]) : 0), hwEach = n === 1 ? gw : 72;
          for (let k = i; k < j; k++) { const bw = bwOf(rl[k], ns, cs), hx = x + (k - i) * 72; o2.push({ it: rl[k], x: hx + (hwEach - bw) / 2, bw, hx, hw: hwEach, chipX: x + gw / 2, chipW: k === i && hasChip ? chipWOf(rl[i]) : 0, hideChip: k !== i }); }
          x += gw; i = j; }
        return o2; });
      rowsL = rr;
    }
    const R = rowsOut.length, rowBlk = blk / R;
    rowsOut.forEach((ro: any[], r: number) => {
      const bhMax = Math.max(...ro.map((q: any) => (isN(q.it) ? ML_NH * ns : ML_CD * cs * 1.04))), blockH = bhMax + (hasChip ? 42 : 0);
      const top = bandTop + r * rowBlk + Math.max(0, (rowBlk - blockH) / 2), cy = top + bhMax / 2, chipY = top + bhMax + 6;
      const hy = R > 1 ? bandTop + r * rowBlk : cy - Math.max(36, bhMax / 2);
      const hEnd = R > 1 ? (r === R - 1 ? chipY + 44 : bandTop + (r + 1) * rowBlk - 1) : hasChip ? chipY + 44 : cy + Math.max(36, bhMax / 2);
      ro.forEach((q: any) => {
        const sS = isN(q.it) ? ns : cs, bh = (isN(q.it) ? ML_NH : ML_CD) * sS;
        out.push({ ...q.it, two: R > 1, m: 1, st: 0, s: sS, bw: q.bw, bh, w: q.bw, x: q.x, y: cy - bh / 2, hx: q.hx, hy, hw: q.hw, hh: hEnd - hy, top: { x: q.x, y: cy - bh / 2 }, chipX: q.chipX, chipY, chipW: q.chipW, hideChip: !!q.hideChip, row: r });
      });
    });
    return out;
  };
  /* stacks (P2 Q3: two piles in the wallet) keep their fan */
  const layoutStacks = (list: any[]) => {
    const pad = 24, Wc = walletW, blk = bandEnd - bandTop;
    const gapOf = (s: number) => (s < 1 ? 12 : 16);
    const wOf = (it: any, s: number) => (mlNote(it.id) ? ML_NW : ML_CD) * s + (Math.min(it.n, 8) - 1) * (mlNote(it.id) ? 34 : 28) * s;
    const tot = (s: number) => list.reduce((a: number, it: any) => a + wOf(it, s), 0) + gapOf(s) * Math.max(list.length - 1, 0) + 2 * pad;
    const sw = tot(1) <= Wc ? 1 : Math.max(0.6, (Wc - 2 * pad) / Math.max(tot(1) - 2 * pad, 1)), s = Math.min(sw, (blk - 42) / ML_NH), gap = gapOf(s);
    const rw = list.reduce((a: number, it: any) => a + wOf(it, s), 0) + gap * Math.max(list.length - 1, 0);
    let x = Math.max(PL + 8, (Wc - rw) / 2);
    const bhMax = Math.max(...list.map((it: any) => (mlNote(it.id) ? ML_NH : ML_CD * 1.04) * s)), top = bandTop + Math.max(0, (blk - bhMax - 42) / 2), cy = top + bhMax / 2, chipY = top + bhMax + 6;
    return list.map((it: any) => {
      const bw = (mlNote(it.id) ? ML_NW : ML_CD) * s, bh = (mlNote(it.id) ? ML_NH : ML_CD) * s, st = (mlNote(it.id) ? 34 : 28) * s, m = Math.min(it.n, 8);
      const w = wOf(it, s), hw = Math.max(w, 72), hy = cy - Math.max(36, bhMax / 2), o = { ...it, two: false, m, st, s, bw, bh, w, x, y: cy - bh / 2, hx: x - (hw - w) / 2, hy, hw, hh: chipY + 36 + 8 - hy, top: { x: x + (m - 1) * st, y: cy - bh / 2 }, chipX: x + w / 2, chipY, chipW: Math.max(chipWOf(it), 92) };
      x += w + gap;
      return o;
    });
  };
  const layoutWallet = (list: any[]) => (list.length && list.every((it: any) => it.n === 1) ? layoutLoose(list) : layoutStacks(list));

  /* ── a piece flies from the wallet to where it lands (nothing flies under reduced motion) ── */
  const launch = (id: string, from: any, to: any, s0: number, s1: number, land: () => void) => {
    const cur = SR.current.fly;
    if (cur && cur.land) { cur.land(); }
    if (reducedMotion()) { land(); return; }
    const k = ++flyN.current, f: any = { k, id, from, to, s0, s1, go: false, land };
    put({ fly: f });
    setTimeout(() => { const c = SR.current.fly; if (SR.current.qk === qk && c && c.k === k) put({ fly: { ...c, go: true } }); }, 30);
    setTimeout(() => { const c = SR.current.fly; if (SR.current.qk === qk && c && c.k === k) { put({ fly: null }); land(); } }, 480);
  };

  const trayFull = (id: string) => { const t0 = SR.current.tray || {}, nk = Object.keys(t0).length; return (t0[id] || 0) >= 9 || (!t0[id] && nk >= 6); };
  const dispatchAct = (name: string) => { if (stage === "demo") api.did(name); };

  /* ── the child's acts ── */
  const tapRead = (id: string, from: any = null, s0 = 1) => {
    if (acting.current) return;
    const cur = SR.current, off = spOff, note = mlNote(id);
    const mark = () => { put({ read: { ...SR.current.read, [id]: true }, [note ? "slotN" : "slotC"]: id, touched: true, carry: "" }); api.sfx.tick(); dispatchAct("read-" + id); };
    if (K !== "all11" || !from || cur.read[id] || reducedMotion()) { mark(); return; }
    /* the piece travels by itself from the purse's row to its spot on the counter, where it enlarges (no hand) */
    const bw = (note ? ML_NW : ML_CD) * 1.5, bh = (note ? ML_NH : ML_CD) * 1.5, cx = spCx + (note ? -off : off);
    put({ carry: id });
    launch(id, from, { x: cx - bw / 2, y: Z0 + sy + (112 - bh) / 2 }, s0, 1.5, mark);
  };
  const tapNote = (id: string, from: any) => {
    if (acting.current) return;
    const p = SR.current.placed;
    if (p.indexOf(id) >= 0) { put({ placed: p.filter((x: string) => x !== id), touched: true }); api.sfx.tick(); return; }
    const og = orderGeom();
    launch(id, from, { x: og.xs[p.length], y: Z0 + og.py }, 1, og.s, () => { put({ placed: [...SR.current.placed.filter((x: string) => x !== id), id], touched: true }); api.sfx.tick(); });
  };
  const tapTake = (id: string, from: any, s0: number) => {
    if (acting.current) return;
    const cnt = SR.current.tray[id] || 0, total = K === "pile" ? sc.n : id === sc.a.kind ? sc.a.n : sc.b.n;
    if (cnt >= total) return;
    const now = Date.now();
    const name = "take-" + (K === "pile" ? cnt + 1 : id);
    let to: any, s1 = 1;
    if (K === "pile") { const pg = pileGeom(); to = { x: pg.xs[cnt], y: Z0 + pg.ys[cnt] }; s1 = pg.s; }
    else { const rg = rowGeom({ ...SR.current.tray, [id]: cnt + 1 }, id); const c = rg.fan.cs[cnt]; to = { x: c ? c.x : rg.fan.x, y: Z0 + rg.fan.y + (rg.fan.h - rg.fan.ph) / 2 }; s1 = rg.fan.s; }
    dispatchAct(name);
    launch(id, from, to, s0, s1, () => { const c0 = SR.current.tray; put({ tray: { ...c0, [id]: (c0[id] || 0) + 1 }, touched: true }); api.sfx.tick(); });
  };
  /* P3: one loose piece goes into the sorting tray (a drag or a tap), and the tray puts it in the row of its kind */
  const tapPiece3 = (id: string, from: any, s0: number) => {
    if (acting.current) return;
    const c = SR.current.tray[id] || 0, now = Date.now();
    if (c >= sc.has[id]) return;
    const nt = { ...SR.current.tray, [id]: c + 1 };
    const rg = rowGeom(nt, id), cc = rg.fan.cs[c];
    dispatchAct("kind-" + id);
    launch(id, from, { x: cc ? cc.x : rg.fan.x, y: Z0 + rg.fan.y + (rg.fan.h - rg.fan.ph) / 2 }, s0, rg.fan.s, () => {
      const t0 = SR.current.tray;
      put({ tray: { ...t0, [id]: (t0[id] || 0) + 1 }, touched: true });
      api.sfx.tick();
    });
  };
  /* P3: the child taps the rows from the top, one at a time; each tap adds that row to the running total */
  const tapRow = (k: string) => {
    const cur = SR.current, rs = rowsOf(cur.tray);
    if (cur.counted >= rs.length || rs[cur.counted] !== k) return;
    lastPut.current.row = Date.now();
    put({ counted: cur.counted + 1, touched: true });
    api.sfx.settle();
    dispatchAct("count-" + k);
  };
  /* P2: the child taps a piece lying on the counter and it is counted (any piece, in any order) */
  const tapPiece = (i: number) => {
    if (acting.current) return;
    const cur = SR.current, hs = hitsOf(cur);
    if (hs.indexOf(i) >= 0 || hs.length >= sc.n) return;
    const nh = [...hs, i];
    put({ hit: nh, tray: { [sc.kind]: nh.length }, touched: true, rewound: false });
    api.sfx.tick();
    dispatchAct("tap-" + nh.length);
  };
  const tapPut = (id: string, from: any, s0: number) => {
    if (acting.current) return;
    const c = SR.current.tray[id] || 0, now = Date.now();
    if (trayFull(id)) { if (stage === "demo") api.did("put-" + id); else if (stage === "ask") nudge("The tray is full, press Pay again."); else api.say("The tray is full, press Pay again."); return; }
    const nt = { ...SR.current.tray, [id]: c + 1 };
    const rg = rowGeom(nt, id), cc = rg.fan.cs[c];
    dispatchAct("put-" + id);
    launch(id, from, { x: cc ? cc.x : rg.fan.x, y: Z0 + rg.fan.y + (rg.fan.h - rg.fan.ph) / 2 }, s0, rg.fan.s, () => {
      const t0 = SR.current.tray, t1 = { ...t0, [id]: (t0[id] || 0) + 1 }, pr = priceNow;
      put({ tray: t1, touched: true, note: "", cand: pr > 0 && mlSum(t1) === pr ? mlSig(t1) : SR.current.cand });
      api.sfx.tick();
    });
  };
  /* the one place a wallet piece's tap or drop goes */
  const onDrop = (pid: string, p: any, moved: boolean) => {
    if (acting.current) return;
    if (reveal) return;   /* at the win the money stays where it is: the tray cannot change */
    /* a drop anywhere on the counter puts the piece in the tray (a short or wobbly drag, or one ending back on the wallet strip, is a tap); only a drop off the stage is refused */
    if (moved && p && isFinite(p.x) && (p.y < -10 || p.y > 530 || p.x < -10 || p.x > W + 10)) return;
    const it = wl.filter((w: any) => (w.uid || w.id) === pid)[0];
    if (!it) return;
    /* a guide step: a control the step is not waiting for shows only its hint and does nothing */
    if (stage === "demo" && stepOn && ctlId(it) !== stepOn) { api.did(ctlId(it)); return; }
    /* a double tap on ONE spot is one piece; a tap on the next piece, elsewhere, is never blocked */
    { const nowP = Date.now(), lp = lastPut.current.pos, px = p && isFinite(p.x) ? p.x : null, py = p && isFinite(p.y) ? p.y : null;
      if (lp && nowP - lp.t < 150 && (px === null || lp.x === null || (Math.abs(px - lp.x) < 12 && Math.abs(py - lp.y) < 12))) return;
      lastPut.current.pos = { t: nowP, x: px, y: py }; }
    /* a piece still flying from the wallet lands first, so every count below includes it (the tray never holds more than the purse or pile has) */
    { const pf = SR.current.fly; if (pf && pf.land) { put({ fly: null }); pf.land(); } }
    const id = it.id, from = it.top, s0 = it.s;
    if (K === "pair" || K === "all11") tapRead(id, from, s0);
    else if (K === "order") tapNote(id, from);
    else if (K === "trays") tapTake(id, from, s0);
    else if (K === "purse") tapPiece3(id, from, s0);
    else tapPut(id, from, s0);
  };
  const D = useDrag(onDrop);
  const wl = layoutWallet(wRaw);

  /* product on the tag: the question's own, or (free play) the one the child tapped */
  /* the amount on the price tag: the question's own, or (free play) the one the tag was tapped to */
  const priceNow = free ? FREE_PRICES[(S.fp || 0) % FREE_PRICES.length] : sc.price || 0;
  const price = priceNow;
  const ruleOk = (m: any) => sc.mode !== "three1" || (mlCnt(m, "n") === 3 && mlCnt(m, "c") === 1);
  const exactOf = (s: any) => price > 0 && Object.keys(s.tray).length > 0 && mlSum(s.tray) === price && ruleOk(s.tray);
  const exact = (K === "pay" || K === "free") && exactOf(S);
  const ruleMiss = K === "pay" && price > 0 && Object.keys(tray).length > 0 && mlSum(tray) === price && !ruleOk(tray);
  const payAgain = () => {
    if (reveal) return;
    if (stage === "demo" && stepOn !== "pay-again") { api.did("pay-again"); return; }
    /* the tray clears at once (a hand that locked the board for a second lost the next taps); the first exact way is kept */
    const cur = SR.current;
    const use = K === "pay" && sc.mode === "two" ? (exactOf(cur) ? mlSig(cur.tray) : cur.cand) : "";
    const keep = !!use && cur.ways.indexOf(use) < 0;
    put({ ways: keep ? [...cur.ways, use] : cur.ways, tray: {}, note: "", cand: "", touched: true, fly: null, lastSent: "", keptHint: false });
    api.sfx.settle();
    if (free) api.say(FREE_LINE);
    dispatchAct("pay-again");
  };
  const pressKey = (fn: any) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; fn(); };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT guide step */
  const act = (on: any) => {
    const it = wl.filter((w: any) => ("read-" + w.id === on) || ("kind-" + w.id === on) || ("put-" + w.id === on) || ("take-" + w.id === on) || ctlId(w) === on)[0];
    if (on === "pay-again") payAgain();
    else if (/^tap-\d+$/.test(on)) { const hs = hitsOf(SR.current); for (let j = 0; j < sc.n; j++) if (hs.indexOf(j) < 0) { tapPiece(j); break; } }
    else if (/^count-/.test(on)) tapRow(on.slice(6));
    else if (it) onDrop(it.uid || it.id, { x: NaN, y: NaN }, false);
  };
  /* the answer made on the working area (pad: "enter"): a signature of the row of notes or the money paid */
  const mkSig = (s: any) => {
    if (K === "order") return s.placed.length === 4 ? s.placed.join(",") : "";
    if (K === "pay") {
      const parts = s.ways.slice(), t = mlSig(s.tray);
      if (sc.mode === "two" && s.cand && !exactOf(s) && parts.indexOf(s.cand) < 0) parts.push(s.cand);
      if (t && exactOf(s) && parts.indexOf(t) < 0) parts.push(t);
      else if (!parts.length && t) parts.push(t);
      return parts.join("|");
    }
    return "";
  };
  const onEnterAsk = () => {
    const s = SR.current;
    if (K === "pay" && sc.mode === "two") {
      /* one exact way is not a miss: the tray stays filled and the line says what is next */
      if (exactOf(s) && s.ways.length === 0) { put({ keptHint: true }); nudge("That is one way. Now press Pay again and pay it another way."); return; }
      if (!Object.keys(s.tray).length && s.ways.length === 1) { nudge("One way is kept, so pay the price a different way."); return; }
    }
    const sig = mkSig(s);
    if (!sig) { nudge(K === "order" ? "Put all four notes in the row first." : "Put some notes or coins in the tray first."); return; }
    if (K === "pay" && sc.mode === "two" && exactOf(s) && s.ways.indexOf(mlSig(s.tray)) >= 0) { nudge("That is the same way, so try a different set of notes and coins."); return; }
    if (sig === s.lastSent) return;
    put({ lastSent: sig });
    api.submit(sig);
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : stage === "ask" && item.pad === "enter" ? onEnterAsk : null);

  /* has the act of this question been done (the Answer key waits for it) */
  const nKinds = K === "purse" ? Object.keys(sc.has).length : 0;
  const isDone = (s: any) => (K === "pair" ? !!(s.read[sc.a] && s.read[sc.b]) : K === "order" ? s.placed.length === 4
    : K === "pile" ? (s.tray[sc.kind] || 0) >= sc.n : K === "trays" ? (s.tray[sc.a.kind] || 0) >= sc.a.n && (s.tray[sc.b.kind] || 0) >= sc.b.n
    : K === "purse" ? s.counted >= nKinds && Object.keys(sc.has).every((k: string) => (s.tray[k] || 0) >= sc.has[k]) : false);
  const actDone = S.done || isDone(S);
  /* what the agent does at once: the act of the question (never gated) */
  const finishAct = () => {
    if (K === "pair") put({ read: { [sc.a]: true, [sc.b]: true }, slotN: mlNote(sc.a) ? sc.a : sc.b, slotC: mlNote(sc.a) ? sc.b : sc.a, touched: true });
    else if (K === "pile") put({ tray: { [sc.kind]: sc.n }, hit: Array.from({ length: sc.n }, (_: any, i: number) => i), touched: true });
    else if (K === "trays") put({ tray: { [sc.a.kind]: sc.a.n, [sc.b.kind]: sc.b.n }, touched: true });
    else if (K === "purse") put({ tray: { ...sc.has }, counted: nKinds, touched: true });
  };
  HOOK.check = stage === "ask" ? () => { if (!isDone(SR.current)) finishAct(); return undefined; } : undefined;
  HOOK.set = stage === "ask" && item.pad === "enter" ? (v: any) => {
    if (K === "order") { const ids = String(v).split(",").filter((x: string) => ML_V[x]); if (ids.length !== 4) return false; put({ placed: ids, touched: true }); return true; }
    if (K === "pay") { const ws = String(v).split("|").filter((x: string) => x); if (!ws.length) return false; put({ ways: ws.slice(0, -1), tray: mlParse(ws[ws.length - 1]), touched: true }); return true; }
    return false;
  } : undefined;

  /* ── the gate (PREFLIGHT 27): the Answer key waits for the act, only after the child has touched the board for real ── */
  useEffect(() => {
    if (busy.current || stage !== "ask" || item.pad === "enter") return;
    api.lock(!!(S.touched && !actDone));
    return () => { if (!busy.current) api.lock(false); };
  }, [stage, qk, S.touched, actDone]);
  useEffect(() => { if (isDone(S) && !S.done && stage === "ask") put({ done: true }); }, [actDone, stage]);
  /* the Enter key of a working-area question blinks only when its answer is complete */
  const trayWays = S.ways.concat(exact ? [mlSig(tray)] : S.cand && S.ways.indexOf(S.cand) < 0 ? [S.cand] : []);
  const ready = K === "order" ? S.placed.length === 4
    : K === "pay" ? (sc.mode === "two" ? new Set(trayWays).size >= 2 : sc.mode === "three1" ? exact && mlCnt(tray, "n") === 3 && mlCnt(tray, "c") === 1 : exact)
    : false;
  useEffect(() => { if (stage === "ask" && item.pad === "enter") api.answerReady(!!ready); }, [ready, qk, stage]);

  useEffect(() => {
    if (nudged.current && Date.now() - nudgeAt.current < 2000) return;   /* a landing already in flight must not wipe a nudge that just appeared */
    if (nudged.current === 2) { nudged.current = 1; return; }
    if (nudged.current === 1) { nudged.current = 0; if (stage === "ask") api.say(item.say); return; }
    /* the tray moved on after a miss: its hint no longer describes it, so the question comes back */
    if (stage === "ask" && item.pad === "enter" && !busy.current && !acting.current) {
      const g = (window as any).toolApi && (window as any).toolApi.getState ? (window as any).toolApi.getState() : null;
      if (g && g.hint && g.hintKind !== "type") clearHint();
    }
  }, [mlSig(tray), S.placed.join(","), S.ways.join("|"), S.counted, S.hit.length]);

  /* a repeated Enter on an unchanged tray is swallowed; any change of the tray, the row or the kept ways lets it through again */
  useEffect(() => { if (SR.current.lastSent || SR.current.keptHint) put({ lastSent: "", keptHint: false }); }, [mlSig(tray), S.placed.join(","), S.ways.join("|")]);

  /* free play: once money is in the tray again, the bubble goes back to the Free play line */
  useEffect(() => { if (K === "free" && stage === "free" && S.freeMsg && Object.keys(tray).length) { api.say(FREE_LINE); put({ freeMsg: false }); } }, [mlSig(tray)]);

  /* free play: a short line when the tray is exactly the price, and when it is more than the price */
  const overPrice = K === "free" && price > 0 && mlSum(tray) > price;
  useEffect(() => { if (K !== "free" || stage !== "free") return; if (exact) api.say("Paid the exact price!"); else if (overPrice) api.say("That is more than the price."); }, [exact, overPrice]);

  /* the win: the whole picture (the child's own way, or a neat one from the answer when the agent drove it), and the one line */
  useEffect(() => {
    if (!(stage === "win" || stage === "idle") || free || warm) return;
    if (K === "pile") put({ tray: { [sc.kind]: sc.n } });
    else if (K === "trays") put({ tray: { [sc.a.kind]: sc.a.n, [sc.b.kind]: sc.b.n } });
    else if (K === "purse") put({ tray: { ...sc.has }, counted: nKinds });
    else if (K === "pair") put({ read: { [sc.a]: true, [sc.b]: true }, slotN: mlNote(sc.a) ? sc.a : sc.b, slotC: mlNote(sc.a) ? sc.b : sc.a });
    else if (K === "pay") {
      const s = SR.current, tw = s.ways.concat(exactOf(s) ? [mlSig(s.tray)] : []);
      const good = sc.mode === "two" ? new Set(tw).size >= 2 : sc.mode === "three1" ? exactOf(s) && mlCnt(s.tray, "n") === 3 && mlCnt(s.tray, "c") === 1 : exactOf(s);
      if (good) put({ note: "" });
      else { const m = MODEL.ways[item.qid]; put({ ways: m.slice(0, -1), tray: mlParse(m[m.length - 1]), note: "", cand: "" }); }
    }
    if (stage === "win" && item.win) api.say(item.win);
  }, [stage]);

  /* the traceback: replay the working, unmarked, and stop ONE step before the answer; wrong.value is what the child sent */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    busy.current = true; api.lock(true);
    const fin = () => { busy.current = false; api.lock(false); };
    const L: any[] = [];
    put({ fly: null });
    if (K === "pair") {
      L.push([450, () => put({ ring: true })], [900, () => {}]);
    } else if (K === "order") {
      const asc = [...sc.ids].sort((a: string, b: string) => ML_V[a] - ML_V[b]);
      L.push([300, () => put({ placed: [] })]);
      for (let i = 1; i < asc.length; i++) L.push([550, () => put({ placed: asc.slice(0, i) })]);
      L.push([450, () => {}]);
    } else if (K === "pile") {
      L.push([300, () => put({ tray: {}, hit: [] })]);
      for (let i = 1; i < sc.n; i++) L.push([450, () => put({ tray: { [sc.kind]: i }, hit: Array.from({ length: i }, (_: any, j: number) => j) })]);
      L.push([400, () => put({ rewound: true })]);
    } else if (K === "trays") {
      L.push([300, () => put({ tray: {} })]);
      for (let i = 1; i <= sc.a.n; i++) L.push([i === sc.a.n ? 600 : 220, () => put({ tray: { [sc.a.kind]: i } })]);
      for (let i = 1; i <= sc.b.n; i++) L.push([i === sc.b.n ? 600 : 220, () => put({ tray: { [sc.a.kind]: sc.a.n, [sc.b.kind]: i } })]);
    } else if (K === "purse") {
      const ks = KS.filter((k: string) => sc.has[k]);
      L.push([300, () => put({ tray: {}, counted: 0 })], [700, () => put({ tray: { ...sc.has }, counted: 0 })]);
      for (let i = 1; i < ks.length; i++) L.push([800, () => put({ counted: i })]);
      L.push([500, () => {}]);
    } else if (K === "pay") {
      const cur = SR.current, sig = mlSig(cur.tray);
      if (sc.mode === "two" && exactOf(cur)) {
        L.push([700, () => put({ ways: cur.ways.indexOf(sig) < 0 ? [...cur.ways, sig] : cur.ways, tray: {}, note: "" })], [500, () => {}]);
      } else {
        const t = mlSum(cur.tray);
        L.push([1200, () => put({ note: t < price ? "needs more" : t > price ? "too much" : "" })]);
      }
    }
    tl.run(L, fin);
  }, [wrong]);
  useEffect(() => () => { tl.stop(); busy.current = false; acting.current = false; }, [qk]);

  /* ── drawing ── */
  const invFor = (id: string, x: number, y: number, w: number, h: number) => (stepOn === id && stage === "demo" ? <Invite key={"inv" + id} x={x + w / 2} y={y + h / 2} w={w} h={h} rx={14} C={C} /> : null);
  const lab = (id: string) => (mlNote(id) ? "₹" + ML_V[id] + " note" : "₹" + ML_V[id] + " coin");
  /* the open purse at the bottom left (one size in every phase); the money lies on the counter to its right (each piece is a drag piece: a tap puts it where it belongs) */
  const walletEls: any[] = [];
  const pW = 330, pH = Math.round(pW * 180 / 277), pX = 6, pY = 520 - pH - 4;
  const purseEl = mlPurse(pX, pY, pW, "udg-mouth");
  /* a pale plate behind the money on the counter, so a dark face (the Rs 10 note) never sinks into the wood; the faces stay untinted */
  if (wl.length) walletEls.push(<rect key="plate" x={PL - 2} y={bandTop - 4} width={walletW - PL + 6} height={bandEnd + 14 - bandTop} rx={24} fill="#FFF3DC" fillOpacity={0.5} pointerEvents="none" />);
  wl.forEach((it: any) => {
    const id = ctlId(it), pid = it.id, uid = it.uid || it.id;
    const dragging = D.drag && D.drag.payload === uid;
    const litR = (K === "pair" || K === "all11") && !!S.read[pid];
    walletEls.push(<g key={"wv" + uid} pointerEvents="none" style={{ opacity: dragging ? 0.35 : S.carry === pid ? 0.3 : 1 } as any}>
      {Array.from({ length: it.m }, (_: any, i: number) => <g key={i}>{mlPiece(pid, it.x + i * it.st, it.y, it.s, { label: i === it.m - 1, lit: litR, skin: true, uni: K === "pair" || K === "order" })}</g>)}
    </g>);
    walletEls.push(
      <g key={"w" + uid} {...control(id, lab(pid) + (it.n > 1 ? " x " + it.n : ""))} {...D.bind(uid)} {...D.keys(uid)} style={{ cursor: "grab" } as any}>
        <rect x={it.hx} y={it.hy} width={it.hw} height={it.hh} fill="transparent" />
      </g>);
    if (K !== "pair" && K !== "order" && !it.hideChip) walletEls.push(<g key={"v" + uid} pointerEvents="none">{mlTag(it.chipX - it.chipW / 2, it.chipY, it.chipW, 36, ML_AMB, "₹" + ML_V[pid], T.label, true, true)}</g>);
    if (it.n > 1) walletEls.push(<g key={"b" + uid} pointerEvents="none">{mlTag(it.x + it.w - 52, it.y - 18, 72, 38, ML_SKY, "×" + it.n, T.label)}</g>);
    if (stepOn === id && stage === "demo") walletEls.push(invFor(id, it.hx + 12, it.hy, it.hw - 24, it.hh - 8));
  });

  const zone: any[] = [];
  const band: any[] = [];

  /* the counter, by kind of question */
  /* the mat: the part left of the key's corner, and (when the key stands there) the part below it, as two shapes so nothing runs under the corner */
  zone.push(<rect key="mat" x={PX0} y={0} width={matR - PX0} height={ZH} rx={RAD.panel} fill="#F3E2BF" stroke={exact ? ML_GRN : "#B9965F"} strokeWidth={exact ? 7 : 3} filter="url(#udgam-shadow-soft)" />);
  if (ext) zone.push(<g key="mat2"><rect x={matR - RAD.panel - 4} y={88 - Z0} width={W - 8 - matR + RAD.panel + 4} height={ZH - 88 + Z0} fill="#F3E2BF" /><line x1={matR} y1={88 - Z0} x2={W - 8} y2={88 - Z0} stroke="#B9965F" strokeWidth={3} /><line x1={W - 8} y1={88 - Z0} x2={W - 8} y2={ZH} stroke="#B9965F" strokeWidth={3} /><line x1={matR - RAD.panel - 4} y1={ZH} x2={W - 8} y2={ZH} stroke="#B9965F" strokeWidth={3} /></g>);
  if (K === "all11" || K === "pair") {
    const sN = 1.5, sC = 1.5, cxN = spCx - spOff, cxC = spCx + spOff;
    const idN = K === "pair" ? (mlNote(sc.a) ? sc.a : sc.b) : S.slotN, idC = K === "pair" ? (mlNote(sc.a) ? sc.b : sc.a) : S.slotC;
    const both = idN && idC && S.read[idN] && S.read[idC];
    const slot = (id: string, cx: number, s: number, word: string, nm: string) => {
      const bw = (id && mlNote(id) || (!id && word === "Note") ? ML_NW : ML_CD) * s, bh = (id && mlNote(id) || (!id && word === "Note") ? ML_NH : ML_CD) * s;
      const x = cx - bw / 2, y = sy + (112 - bh) / 2;
      if (!id) return (<g key={"sl" + word}><rect x={x} y={y} width={bw} height={bh} rx={14} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />
        <text x={cx} y={y + bh / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.dim === "#9AA4AC" ? "#6F685C" : C.dim} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{tx(word)}</text></g>);
      const rd = !!S.read[id] || S.ring;
      return (
        <g key={"sl" + word}>
          <g style={{ transition: "transform 260ms ease-out" } as any}>{mlPiece(id, x, y, s, { lit: rd, uni: K === "pair" })}</g>
          <Hit id={nm} x={x} y={y} w={bw} h={bh} label={lab(id)} onPress={() => { if (stage === "demo" && stepOn !== "read-" + id) api.did(nm); else tapRead(id); }} />
          {S.read[id] ? mlTag(cx - 70, sy + 118, 140, 44, ML_AMB, "₹" + ML_V[id], T.prompt) : mlTag(cx - 70, sy + 118, 140, 44, ML_AMB, null, T.prompt, false)}
        </g>);
    };
    zone.push(slot(idN, cxN, sN, "Note", "spot-note"), slot(idC, cxC, sC, "Coin", "spot-coin"));
    if (reveal && K === "pair" && both && ML_V[idN] === ML_V[idC]) zone.push(<text key="eq" data-reveals="answer" x={spCx} y={sy + 76} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ML_AMB === "" ? "" : "#6B3A00"} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>=</text>);
    if (free || (warm && both && idN && idC && ML_V[idN] === ML_V[idC])) zone.push(<text key="eq2" x={spCx} y={sy + 76} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill="#6B3A00" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>=</text>);
  } else if (K === "order") {
    const og = orderGeom();
    [0, 1, 2, 3].forEach((i: number) => {
      const id = S.placed[i], x = og.xs[i];
      zone.push(<rect key={"sl" + i} x={x - 8} y={og.py - 8} width={og.pw + 16} height={og.ph + 16} rx={16} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />);
      if (id) zone.push(<g key={"pl" + id}>{mlPiece(id, x, og.py, og.s, {})}<Hit id={"placed-" + id} x={x} y={og.py} w={og.pw} h={Math.max(og.ph, 72)} label={lab(id)} onPress={() => { if (stage === "demo") api.did("placed-" + id); else tapNote(id, null); }} /></g>);
    });
    zone.push(<text key="lo" x={og.xL} y={og.py + og.ph + (lang === "en" ? 48 : 58)} fontSize={T.prompt} fontWeight={700} fill={C.ink} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{tx("Least")}</text>);
    zone.push(<text key="gr" x={og.xR} y={og.py + og.ph + (lang === "en" ? 48 : 58)} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{tx("Greatest")}</text>);
  } else if (K === "pile") {
    /* the pieces lie on the counter; the child taps each one and the green running total grows under it */
    const pg = pileGeom(), hs = hitsOf(S), placed = hs.length, v = ML_V[sc.kind];
    zone.push(<g key="vtag">{mlTag(PX0 + 16, 14, 150, 46, ML_AMB, "₹" + v, T.prompt)}</g>);
    zone.push(<g key="ctag">{placed > 0 ? mlTag(PX0 + 178, 14, 120, 46, ML_SKY, "× " + placed, T.prompt) : mlTag(PX0 + 178, 14, 120, 46, ML_SKY, null, T.prompt, false)}</g>);
    for (let i = 0; i < sc.n; i++) {
      const x = pg.xs[i], rank = hs.indexOf(i), yy = pg.ys[i], tY = yy + pg.ph + 10;
      if (rank < 0) {
        zone.push(<g key={"p" + i}>{mlPiece(sc.kind, x, yy - pg.pad, pg.s, {})}{S.rewound && stage === "ask" && placed === sc.n - 1 && <BlinkRing x={x - 8} y={yy - 8} w={pg.pw + 16} h={pg.ph + 16 + EDGE} rx={14} C={C} />}{invFor("tap-" + (i + 1), x, yy, pg.pw, pg.ph)}<Hit id={"tap-" + (i + 1)} x={x} y={yy + pg.ph / 2 - Math.max(pg.ph, 72) / 2} w={pg.pw} h={Math.max(pg.ph, 72)} label={lab(sc.kind)} onPress={() => { if (stage === "demo" && stepOn !== "tap-" + (hs.length + 1)) api.did("tap-" + (i + 1)); else tapPiece(i); }} /></g>);
        continue;
      }
      zone.push(<g key={"p" + i}>{mlPiece(sc.kind, x, yy - pg.pad - 10, pg.s, { lit: rank === placed - 1 })}</g>);
      const tw = Math.min(pg.stride - 12, 150), tot = v * (rank + 1), hide = rank + 1 === sc.n && !reveal && !sc.warm && stage !== "free";
      zone.push(hide ? <g key={"t" + i}>{mlTag(x + pg.pw / 2 - tw / 2, tY, tw, 56, ML_GRN, "₹?", T.prompt, false)}</g>
        : <g key={"t" + i} data-reveals={rank + 1 === sc.n && !sc.warm ? "answer" : undefined}>{mlTag(x + pg.pw / 2 - tw / 2, tY, tw, 56, ML_GRN, "₹" + tot, T.prompt)}</g>);
    }
  } else if (K === "trays" || K === "purse" || K === "pay" || K === "free") {
    const tb = trayBox(), rs = K === "trays" ? [sc.a.kind, sc.b.kind] : rowsOf(tray);
    if (!rs.length) zone.push(<g key="tray0"><rect x={PX0 + 16} y={14} width={rowsR - PX0 - 24} height={ZH - 28} rx={16} fill="none" stroke="#B9965F" strokeWidth={3} strokeDasharray="14 10" />
      <path d={`M ${(PX0 + rowsR) / 2 - 14} ${ZH / 2 - 84} h28 v22 h16 l-30 30 l-30 -30 h16 z`} fill="#B9965F" fillOpacity={0.55} />
      <text x={(PX0 + rowsR) / 2} y={ZH / 2 + 30} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill="#6F5632" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{tx("Tray")}</text></g>);
    let run = 0;
    rs.forEach((k: string, i: number) => {
      const cnt = tray[k] || 0, rg = rowGeom(tray, k), fullRow = K === "trays" ? cnt >= (k === sc.a.kind ? sc.a.n : sc.b.n) : true;
      let tot: any = null, lit = 0;
      if (K === "trays") { if (fullRow && cnt > 0) tot = ML_V[k] * cnt; lit = cnt; }
      else if (K === "purse") { const shown = S.counted > i; if (shown) { tot = ML_V[k] * cnt; run += tot; } lit = shown ? cnt : 0; }
      else tot = ML_V[k] * cnt;
      zone.push(<g key={"r" + k}>{mlRow(k, cnt, rg.x0, rg.y, rg.w0, rg.rh, { tot, cshow: cnt, lit, k: "r", tight: K === "trays", smax: K === "trays" && moneyGone ? 1.7 : 1 }).el}</g>);
    });
    /* ONE separate Total line under the rows: P3 the running total of the rows tapped so far (the last stays "?" until the win); P4 and Free play the live total */
    if (K !== "trays") {
      const allC = K === "purse" && S.counted >= nKinds && rs.length === nKinds, hid = allC && !reveal && !warm, dyT = lang === "en" ? 0 : -3;
      const txt = tx(K === "purse" && !allC ? "So far" : "Total") + "   " + (hid ? "₹?" : "₹" + (K === "purse" ? run : mlSum(tray)));
      const lx = tb.x, lw = rowsR - tb.x, ly = ZH - 68;
      zone.push(<g key="totline" data-reveals={allC && reveal && !warm ? "answer" : undefined}>{hid ? mlTag(lx, ly, lw, 58, ML_GRN, txt, T.prompt, false, false, dyT) : mlTag(lx, ly, lw, 58, K === "purse" || exact ? ML_GRN : "#8A7A6A", txt, T.prompt, true, false, dyT)}{exact && <rect x={lx - 3} y={ly - 3} width={lw + 6} height={64} rx={16} fill="none" stroke={ML_GRN} strokeWidth={6} />}</g>);
    }
    if (K === "purse") {
      const allIn = Object.keys(sc.has).every((k: string) => (tray[k] || 0) >= sc.has[k]);
      if (stage === "ask" && S.counted < nKinds) zone.push(<rect key="cnt-off" x={tb.x} y={tb.y} width={tb.w} height={tb.h} fill="transparent" onClick={() => { if (Date.now() - (lastPut.current.row || 0) < 700) return; nudge(allIn ? "Start with the biggest." : "Put all the money in the tray first."); }} />);
      if (allIn && S.counted < rs.length) {
        const k = rs[S.counted], rg = rowGeom(tray, k);
        zone.push(<g key="cnt-live"><rect x={rg.x0 - 3} y={rg.y - 1} width={rg.w0 + 6} height={rg.rh + 2} rx={14} fill="none" stroke={ML_SKY} strokeWidth={5} pointerEvents="none" />{invFor("count-" + k, rg.x0, rg.y, rg.w0, rg.rh)}<Hit id={"count-" + k} x={rg.x0} y={rg.y + rg.rh / 2 - 36} w={rg.w0} h={72} label={lab(k)} onPress={() => tapRow(k)} /></g>);
      }
    }
    if (K === "pay" || K === "free") {
      const dyL = lang === "en" ? 0 : 4;
      const noteTxt = ruleMiss ? "3 notes + 1 coin" : S.note && !exact ? (S.note === "needs more" ? "Needs more" : "Too much") : "";
      /* Pay again and what the tray still needs: in the strip right of the tray (round the key's corner); on a narrow canvas under the price tag */
      const useR = ext && wide, kx0 = useR ? Math.round((matR + W - 8) / 2 - 110) : 12, ky0 = useR ? Z0 + 96 : 12 + tagH + 12;
      const blink = K === "pay" && sc.mode === "two" && S.keptHint && exact && S.ways.length === 0 && stage === "ask";
      band.push(<g key="payagain">{invFor("pay-again", kx0, ky0, 220, 72)}{blink && <BlinkRing x={kx0} y={ky0} w={220} h={72 + EDGE} rx={RAD.key} C={C} />}<Key id="pay-again" x={kx0} y={ky0} w={220} h={72} C={C} tone="key" label={tx("Pay again")} onClick={() => pressKey(payAgain)}><text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Pay again")}</text></Key></g>);
      if (noteTxt) { const nt = String(tx(noteTxt)), nw = Math.min(310, Math.round(nt.length * 17 + 40)), nx = kx0 + 110 - nw / 2, ny = ky0 + 72 + 20; band.push(<g key="note"><rect x={nx} y={ny} width={nw} height={48} rx={14} fill="#FFF6DF" stroke="#A88A5A" strokeWidth={3} /><text x={nx + nw / 2} y={ny + 24 + 11 + dyL / 2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#4A2A00" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{nt}</text></g>); }
      if (keptW) {
        /* the first way, kept beside the tray in its own panel: its pieces, what each kind came to and its total */
        const wm = mlParse(S.ways[0]), rsw = KS.filter((k: string) => wm[k] > 0), wx = tb.x + tb.w + 10, ww = 316;
        const pH = tb.h - 8, rh2 = Math.min(60, Math.floor((pH - 80) / Math.max(rsw.length, 1))), tfs = rh2 >= 38 ? T.label : T.micro;
        zone.push(<g key="kept"><rect x={wx} y={tb.y} width={ww} height={pH} rx={RAD.panel} fill={tint(ML_GRN, 0.88)} stroke={ML_GRN} strokeWidth={3} />
          {rsw.map((k: string, i: number) => { const sK = mlNote(k) ? 0.78 : Math.min(0.95, (rh2 - 4) / ML_CD); const dia = (mlNote(k) ? ML_NH : ML_CD) * sK; return <g key={"kw" + k}>{mlPiece(k, wx + 14, tb.y + 8 + i * rh2 + (rh2 - dia) / 2, sK, { label: !mlNote(k) })}<text x={wx + 128} y={tb.y + 8 + i * rh2 + rh2 / 2 + tfs * 0.36} fontSize={tfs} fontWeight={700} fill="#2B2B2B" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{"₹" + ML_V[k] + " × " + wm[k]}</text></g>; })}
          {mlTag(wx + 22, tb.y + pH - 66, ww - 44, 46, ML_GRN, tx("Way 1") + "  ₹" + mlSum(wm), T.label, true, false, dyL)}</g>);
      }
    }
  }
  /* ONE continuous counter top: a back rail across the top (the key's corner sits on it), then the wood picture tiled MIRRORED so the grain matches at every join */
  const bgEls: any[] = [];
  {
    const topW = Math.min(kx, W);   /* nothing is drawn under the key's corner: the left column's tiles run from the top, the right half's from y 96 */
    bgEls.push(<rect key="woodtop" x={0} y={0} width={topW} height={96} fill="url(#udgam-grad-wood)" />);
    bgEls.push(<rect key="wood" x={0} y={96} width={W} height={424} fill="url(#udgam-grad-wood)" />);
    /* two wide columns share the key corner's left edge (so the top band above the cream panel is the SAME tile as the strip beside it), a narrow third column fills under the key; rows butt exactly and odd rows / columns are flipped so the grain mirrors across every join */
    const tilesOf = (c: number, x0: number, wC: number, y0: number, flipX: boolean) => { const av = 520 - y0, hT = wC * 240 / 640, rn = Math.max(2, Math.ceil(av / hT)), h2 = av / rn; return Array.from({ length: rn }, (_: any, r: number) => <g key={"cw" + c + "_" + r} transform={`translate(${flipX ? x0 + wC : x0} ${r % 2 ? y0 + (r + 1) * h2 : y0 + r * h2}) scale(${flipX ? -1 : 1} ${r % 2 ? -1 : 1})`}><Skin name="counter" x={0} y={0} w={wC} h={h2} /></g>); };
    if (topW < W) {
      /* columns 0 and 1 share one row grid from the top; column 2 (right of the key corner's left edge) starts below the corner at y 96 */
      bgEls.push(...tilesOf(0, 0, topW / 2, 0, false), ...tilesOf(1, topW / 2, topW / 2, 0, true));
      bgEls.push(...tilesOf(2, topW, W - topW, 96, false));   /* nothing is drawn under the key corner (y < 96): the strip below it is tiled from y 96 at its own width */
    } else bgEls.push(...tilesOf(0, 0, W / 2, 0, false), ...tilesOf(1, W / 2, W / 2, 0, true));
    /* ONE light for the whole counter (user-space, so the left strip and the right half share it and no tone jumps at y 96 or at the key's corner) */
    bgEls.push(<defs key="lightdef"><radialGradient id="udgam-light-u" gradientUnits="userSpaceOnUse" cx={0} cy={0} r={0.8 * W} gradientTransform={`translate(${0.3 * W} ${96 + 42}) scale(1 ${424 / W})`}><stop offset="0%" stopColor="#FFF8ED" stopOpacity="0.32" /><stop offset="100%" stopColor="#FFF8ED" stopOpacity="0" /></radialGradient></defs>);
    bgEls.push(<rect key="light" x={0} y={0} width={topW} height={520} fill="url(#udgam-light-u)" pointerEvents="none" />);
    if (W > topW) bgEls.push(<rect key="light2" x={topW} y={96} width={W - topW} height={424} fill="url(#udgam-light-u)" pointerEvents="none" />);
    bgEls.push(<rect key="edge" x={0} y={486} width={W} height={34} fill="url(#udgam-edge)" pointerEvents="none" />);
    bgEls.push(<rect key="edge2" x={0} y={512} width={W} height={8} fill="#6E4018" />);
  }
  /* the price tag (P4 and Free play), in the left column above the purse: the tag picture with the amount drawn in code; in Free play a tap changes the amount */
  const tagEl = hasTag ? (() => {
    const tx0 = wide ? 115 : 125, ty0 = wide ? 20 : 8, fsT = Math.max(32, Math.round(tagW * 0.3));
    return <g key="pricetag" filter="url(#udgam-shadow-soft)">
      <g pointerEvents="none">
        <rect x={tx0} y={ty0 + tagH * 0.16} width={tagW} height={tagH * 0.84} rx={14} fill="#EAD8AF" stroke="#805E2B" strokeWidth={3} />
        <circle cx={tx0 + tagW / 2} cy={ty0 + tagH * 0.12} r={6} fill="#7A5623" />
        <line x1={tx0 + tagW / 2} y1={ty0} x2={tx0 + tagW / 2} y2={ty0 + tagH * 0.12} stroke="#B59A72" strokeWidth={3} />
        <Skin name="pricetag" x={tx0} y={ty0} w={tagW} h={tagH} />
        <text x={tx0 + tagW / 2} y={ty0 + tagH * 0.62 + fsT * 0.36} textAnchor="middle" fontSize={fsT} fontWeight={700} fill="#2B2B2B" stroke="#F7EBCB" strokeWidth={4} paintOrder="stroke" style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{"₹" + price}</text>
      </g>
      {free && <Hit id="tag-price" x={tx0} y={ty0} w={tagW} h={tagH} label={"₹" + price} onPress={() => { const nowT = Date.now(); if (nowT - (lastPut.current.tag || 0) < 300) return; lastPut.current.tag = nowT; const had = Object.keys(SR.current.tray).length > 0; if (had) api.say("The tray is empty for the new amount."); put({ fp: (SR.current.fp + 1) % FREE_PRICES.length, touched: true, tray: {}, note: "", freeMsg: had }); api.sfx.tick(); }} />}
    </g>;
  })() : null;

  /* a piece in flight, and the stack being dragged */
  const flyEl = S.fly ? (() => {
    const f = S.fly, s = f.go ? f.s1 : f.s0, p = f.go ? f.to : f.from;
    if (!p) return null;
    return <g key="fly" pointerEvents="none" style={{ transform: `translate(${p.x}px, ${p.y}px)`, transition: "transform 420ms ease-in-out" } as any}>{mlPiece(f.id, 0, 0, s, {})}</g>;
  })() : null;
  const ghost = D.drag && D.drag.moved ? (() => {
    const g = D.drag, pid = String(g.payload).split("#")[0], bw = (mlNote(pid) ? ML_NW : ML_CD) * 1.15, bh = (mlNote(pid) ? ML_NH : ML_CD) * 1.15;
    return <g key="ghost" pointerEvents="none" style={{ filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.35))" } as any}>{mlPiece(pid, g.x - bw / 2, g.y - bh / 2, 1.15, {})}</g>;
  })() : null;

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ complete: stage === "idle", tray: mlSig(tray), total: reveal || K === "pay" || K === "free" || K === "trays" ? mlSum(tray) : undefined, price, ways: S.ways.length, counted: S.counted });

  return (
    <g>
      <RenderDefs />
      {bgEls}
      {purseEl}
      <g transform={`translate(0 ${Z0})`}>{zone}</g>
      {tagEl}
      {band}
      {walletEls}
      {flyEl}
      {ghost}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the real notes and coins of that phase, then digits and the rupee sign only */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  ML_SK = 0;
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const item = it || (result.last && result.last.item !== undefined ? PHASES[(result.phase || 1) - 1].items[result.last.item] : null) || {};
  const sc = item.sc || {};
  let text = String(v), ids: string[] = [];
  if (item.kind === "pay") { const m = mlParse(String(v).split("|")[0]); text = "₹" + mlSum(m); ids = KS.filter((k: string) => m[k] > 0); }
  else if (item.kind === "order") { text = "₹10 → ₹500"; ids = ["n10", "n500"]; }
  else if (item.choices) text = "";
  else if (item.kind === "pile") { ids = [sc.kind, sc.kind]; text = "₹" + v; }
  else if (item.kind === "trays") { ids = [sc.a.kind, sc.b.kind]; text = "₹" + v; }
  else if (item.kind === "purse") { ids = KS.filter((k: string) => sc.has[k]); text = "₹" + v; }
  else if (item.kind === "pair") { ids = [sc.a, sc.b]; text = "₹" + v; }
  else if (/^\d+$/.test(text)) text = "₹" + text;
  const sT = 0.46, step = 56, room = w - 14 - String(text).length * 20 - 24, nFit = Math.max(1, Math.floor((room - 62) / step) + 1);
  ids = ids.slice(0, Math.min(3, nFit));
  return (
    <g>
      <RenderDefs />
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {item.choices
        ? <g>
            {mlPiece(item.sc.a, 12, h / 2 - 20, 0.6, {})}
            <text x={w / 2 + 6} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>=</text>
            {mlPiece(item.sc.b, w - 12 - ML_CD * 0.6, h / 2 - (ML_CD * 0.6) / 2, 0.6, {})}
          </g>
        : <g>
            {ids.map((id: string, i: number) => <g key={i}>{mlPiece(id, 12 + i * step, h / 2 - (mlNote(id) ? ML_NH : ML_CD) * sT / 2, sT, { label: false })}</g>)}
            <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink} style={{ fontFamily: "'C4 Poppins', sans-serif" }}>{text}</text>
          </g>}
    </g>
  );
}

function CountTheMoney(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the slot never prints the signature a working-area answer is sent as ("n100,n20,c10|...") */
      format: (v: any) => (/^[nc]\d/.test(String(v)) ? "" : v),
      board: true, keyOnly: true, bigPad: true, nextKey: true, navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default CountTheMoney;