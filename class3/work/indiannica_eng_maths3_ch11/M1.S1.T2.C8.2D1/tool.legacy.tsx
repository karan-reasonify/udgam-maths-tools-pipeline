/* ═══ M1.S1.T2.C8.2D1 · count_the_money · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build; the lesson is SILENT (the bubble is the guide) and
   action-driven. keyOnly + navDots + board + nextKey (the new look). NO imports in this file; only the five host hooks.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "count_the_money";
const MEDIA_ID = "M1.S1.T2.C8.2D1";
const TOOL_NAME = "Count the Money";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A purse, a tray and a row of notes and coins, all waiting to be counted."];
const FINISH_LINE = "You counted every group by its values.";
const FREE_LINE = "Free play. Put any money in the tray and count it as you like.";

const START_HOOK = "A purse, a tray and a row of notes and coins, all waiting to be counted.";

/* ── money: the pieces, their values and how they are drawn ─────────────────────────────── */
const ML_KINDS = ["n500", "n200", "n100", "n50", "n20", "n10", "c20", "c10", "c5", "c2", "c1"];
const ML_V: any = { n500: 500, n200: 200, n100: 100, n50: 50, n20: 20, n10: 10, c20: 20, c10: 10, c5: 5, c2: 2, c1: 1 };
const ML_TINT: any = { 500: "#BDB5DD", 200: "#F0C27F", 100: "#A8CBEA", 50: "#9CD4C3", 20: "#C8DD98", 10: "#E6B792" };
const ML_NW = 136, ML_NH = 72, ML_CD = 76;
const ML_AMB = "#E69F00", ML_SKY = "#56B4E9", ML_GRN = "#009E73";
const mlNote = (id: string) => id.charAt(0) === "n";
const mlSum = (m: any) => Object.keys(m).reduce((s: number, k: string) => s + (ML_V[k] || 0) * (m[k] || 0), 0);
const mlCnt = (m: any, pre: string) => Object.keys(m).reduce((s: number, k: string) => (k.charAt(0) === pre ? s + (m[k] || 0) : s), 0);
const mlSig = (m: any) => ML_KINDS.filter((k: string) => (m[k] || 0) > 0).map((k: string) => k + (m[k] > 1 ? "x" + m[k] : "")).join(",");
const mlParse = (s: any) => {
  const m: any = {};
  String(s).split(",").forEach((t: string) => { const p = t.split("x"); if (ML_V[p[0]]) m[p[0]] = (m[p[0]] || 0) + (p[1] ? +p[1] : 1); });
  return m;
};
/* "100+20+10": the values of a way, one number per piece */
const mlPlus = (m: any) => ML_KINDS.filter((k: string) => (m[k] || 0) > 0).map((k: string) => Array.from({ length: m[k] }, () => String(ML_V[k])).join("+")).join("+");
const mlFresh = (qk: string) => ({ qk, read: {}, placed: [], tray: qk === "w4" ? { n50: 1, c10: 1 } : {}, counted: 0, ways: [], touched: false, done: false, note: "", plain: false, lastSent: "", cand: "" });
let ML_SK = 0; /* skins drawn this render (the screen cap is 40) */

/* one note or coin; (x, y) is its top-left, s its scale on a 136 x 72 note / 76 coin */
function mlPiece(id: string, x: number, y: number, s: number, o: any = {}) {
  const note = mlNote(id), w = (note ? ML_NW : ML_CD) * s, h = (note ? ML_NH : ML_CD) * s;
  const fs = Math.max(28, Math.round(34 * s));
  const sk = o.skin !== false && ML_SK < 34;
  if (sk) ML_SK += 1;
  const ink = o.lit ? "#6B3A00" : "#2B2B2B";
  const label = o.label !== false;
  if (note) {
    const t = ML_TINT[ML_V[id]];
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={9 * s} fill={t} />
        {sk && <Skin name="note" x={x} y={y} w={w} h={h} fit="stretch" />}
        {sk && <rect x={x} y={y} width={w} height={h} rx={9 * s} fill={t} fillOpacity={0.7} />}
        {sk && <rect x={x} y={y} width={w} height={h} rx={9 * s} fill="#FFF6DC" fillOpacity={0.22} />}
        <rect x={x + 7 * s} y={y + 7 * s} width={w - 14 * s} height={h - 14 * s} rx={5 * s} fill="none" stroke="#2B2B2B" strokeOpacity={0.35} strokeWidth={2} />
        <rect x={x} y={y} width={w} height={h} rx={9 * s} fill="none" stroke={o.lit ? ML_AMB : "#6F685C"} strokeWidth={o.lit ? 6 : 2.5} />
        {label && <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{ML_V[id]}</text>}
      </g>
    );
  }
  return (
    <g>
      <circle cx={x + w / 2} cy={y + h / 2} r={w / 2} fill="#D9AE45" />
      {sk && <Skin name="coin" x={x} y={y} w={w} h={h} />}
      <circle cx={x + w / 2} cy={y + h / 2} r={w / 2 - 6 * s} fill="none" stroke="#6B4E0A" strokeOpacity={0.4} strokeWidth={2} />
      {label && <circle cx={x + w / 2} cy={y + h / 2} r={Math.min(w / 2 - 5 * s, Math.max(w * 0.33, fs * 0.64))} fill="#FFF1C2" fillOpacity={0.88} />}
      <circle cx={x + w / 2} cy={y + h / 2} r={w / 2} fill="none" stroke={o.lit ? ML_AMB : "#8A6A12"} strokeWidth={o.lit ? 6 : 3} />
      {label && <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{ML_V[id]}</text>}
    </g>
  );
}
/* a pile of n pieces of one kind laid in a row inside (x, y, w, h); every centre comes back for the hand */
function mlFan(id: string, n: number, x: number, y: number, w: number, h: number, smax = 1) {
  const bw = mlNote(id) ? ML_NW : ML_CD, bh = mlNote(id) ? ML_NH : ML_CD;
  let s = Math.min(smax, h / bh);
  for (let k = 0; k < 12 && n > 1 && s > 0.55; k++) { if ((w - bw * s) / (n - 1) >= bw * s * 0.2) break; s *= 0.93; }
  const step = n > 1 ? Math.max(0, Math.min(bw * s * 0.55, (w - bw * s) / (n - 1))) : 0;
  const pw = bw * s, ph = bh * s, oy = y + (h - ph) / 2;
  const cs = Array.from({ length: n }, (_: any, i: number) => ({ x: x + i * step, y: oy, cx: x + i * step + pw / 2, cy: oy + ph / 2 }));
  return { s, step, pw, ph, cs, x, y, w, h };
}
const mlDraw = (id: string, fan: any, n: number, lit = 0) => fan.cs.map((c: any, i: number) => (
  <g key={"p" + i}>{mlPiece(id, c.x, c.y, fan.s, { label: i === n - 1, lit: i < lit, skin: i >= n - 8 })}</g>));
const mlTag = (x: number, y: number, w: number, h: number, col: string, text: any, fs: number, solid = true) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={14} fill={solid ? tint(col, 0.72) : "none"} stroke={col} strokeWidth={solid ? 3 : 2.5} strokeDasharray={solid ? undefined : "8 8"} />
    {text !== null && text !== undefined && <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#2B2B2B">{text}</text>}
  </g>
);
function mlRowGeom(x: number, w: number) {
  const g = 10, big = w >= 800, tagW = big ? 130 : 108, cW = big ? 120 : 92, tW = big ? 170 : 134;
  const fw = w - tagW - cW - tW - 3 * g;
  return { g, tagW, cW, tW, fw, tagX: x, fanX: x + tagW + g, cX: x + tagW + g + fw + g, tX: x + tagW + g + fw + g + cW + g };
}
/* one tray row: amber value tag · the pieces · sky count tag · green running total (tot null = hidden, reveal tags it as the answer) */
function mlRow(id: string, cnt: number, x: number, y: number, w: number, h: number, o: any) {
  const g = mlRowGeom(x, w), th = Math.min(64, h - 8), ty = y + (h - th) / 2, fs = th >= 60 ? 40 : th >= 52 ? 36 : 32;
  const fan = mlFan(id, cnt, g.fanX, y + 3, g.fw, h - 6, o.smax || 1);
  const cs = o.cshow !== undefined ? o.cshow : cnt, empty = cnt <= 0;
  const totTag = o.tot === null || o.tot === undefined || empty ? mlTag(g.tX, ty, g.tW, th, ML_GRN, empty ? null : "?", fs, false)
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
  2: { k: "pile", kind: "c5", n: 3 },
  3: { k: "purse", has: { n50: 1, c10: 2 } },
  4: { k: "pay", price: 60, mode: "warm" },
};
const ML_FREE: any = { k: "free" };

function StartArt({ box, C, lang, tx }: any) {
  ML_SK = 0;
  return (
    <g>
      <rect x={20} y={286} width={box.w - 40} height={24} rx={12} fill={C.rule} fillOpacity={0.5} />
      <rect x={70} y={96} width={230} height={196} rx={40} fill="#B97A3E" stroke="#6B4423" strokeWidth={4} />
      <Skin name="purse" x={64} y={86} w={232} h={212} />
      {mlPiece("n500", 400, 60, 1.5, { skin: true })}
      {mlPiece("n50", 480, 150, 1.5, { skin: true })}
      {mlPiece("c5", 740, 190, 1.7, {})}
      {mlPiece("c2", 880, 120, 1.5, {})}
      {mlPiece("c1", 1000, 200, 1.3, {})}
    </g>
  );
}

const TR: any = {
  hi: {
    "Count the Money": "पैसे गिनो",
    "A purse, a tray and a row of notes and coins, all waiting to be counted.": "एक बटुआ, एक ट्रे और नोट-सिक्कों की कतार, सब गिने जाने का इंतज़ार कर रहे हैं।",
    "Free play. Put any money in the tray and count it as you like.": "खुला खेल। ट्रे में कोई भी पैसे रखो और अपनी तरह से गिनो।",
    "Every note and coin has a value": "हर नोट और सिक्के का एक मूल्य होता है",
    "Tap the note with 50 on it to read its value.": "50 वाले नोट को छुओ और उसका मूल्य पढ़ो।",
    "Find the note with the big 50.": "बड़े 50 वाला नोट ढूँढो।",
    "Now tap the coin with 5 on it.": "अब 5 वाले सिक्के को छुओ।",
    "Find the small round coin with a 5.": "5 वाला छोटा गोल सिक्का ढूँढो।",
    "Put the two pieces side by side and compare their numbers.": "दोनों को साथ रखो और उनके अंकों की तुलना करो।",
    "Ignore the colour and the shine, and read only the big number.": "रंग और चमक छोड़ो, बस बड़ा अंक पढ़ो।",
    "The number on a note or a coin is its value.": "नोट या सिक्के पर लिखा अंक ही उसका मूल्य है।",
    "You learned: the number on a note or a coin is its value": "तुमने सीखा: नोट या सिक्के पर लिखा अंक उसका मूल्य है",
    "Looking at the number on each piece, what is each one worth in rupees?": "हर टुकड़े पर लिखा अंक देखो, हर एक कितने रुपये का है?",
    "Each is worth?": "हर एक का मूल्य?",
    "Tap each piece and read the number on it.": "हर एक को छुओ और उस पर लिखा अंक पढ़ो।",
    "Yes, each piece is worth the number written on it.": "हाँ, हर एक उतने रुपये का है जितना उस पर लिखा है।",
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
    "Yes, a note and a coin with one number are worth the same.": "हाँ, एक ही अंक वाले नोट और सिक्के का मूल्य बराबर होता है।",
    "Counting notes or coins of one kind": "एक ही तरह के नोट या सिक्के गिनना",
    "Tap the pile to put one coin in the tray.": "ढेर को छुओ, एक सिक्का ट्रे में चला जाएगा।",
    "Tap the pile of coins.": "सिक्कों के ढेर को छुओ।",
    "Tap again and watch the total grow by the value of a coin.": "फिर छुओ और देखो कुल एक सिक्के के मूल्य जितना बढ़ता है।",
    "Tap the pile for the next coin.": "अगले सिक्के के लिए ढेर को छुओ।",
    "Now tap Count and watch the hand count the tray.": "अब गिनो दबाओ और देखो हाथ ट्रे गिनता है।",
    "Tap the Count key.": "गिनो बटन को छुओ।",
    "Say the value of one piece, then count on by that much.": "एक का मूल्य बोलो, फिर उतना-उतना जोड़ते जाओ।",
    "Count the pieces as they go in, one jump for each.": "ट्रे में जाते हर टुकड़े के साथ एक छलाँग गिनो।",
    "Notes or coins of one kind are counted in jumps of their value.": "एक ही तरह के नोट या सिक्के उनके मूल्य की छलाँग में गिने जाते हैं।",
    "You learned: count notes or coins of one kind in jumps of value": "तुमने सीखा: एक तरह के नोट या सिक्के मूल्य की छलाँग में गिनो",
    "Tap the notes into the tray, then type how much money is in it.": "नोट ट्रे में रखो, फिर लिखो उसमें कितने पैसे हैं।",
    "Money in the tray?": "ट्रे में कितने पैसे?",
    "Read the number on a note, then count on from it.": "नोट का अंक पढ़ो, फिर वहाँ से आगे गिनो।",
    "Yes, each note added the same amount to the total.": "हाँ, हर नोट ने कुल में उतना ही जोड़ा।",
    "Tap the coins into the tray, then type how much money the tray holds.": "सिक्के ट्रे में रखो, फिर लिखो ट्रे में कितने पैसे हैं।",
    "Total in the tray?": "ट्रे में कुल?",
    "Count the coins by their value, not by how many there are.": "सिक्कों को उनके मूल्य से गिनो, उनकी संख्या से नहीं।",
    "Yes, seven coins of the same value make that much.": "हाँ, एक ही मूल्य के सात सिक्के इतने बनाते हैं।",
    "Tap Count, then type how many rupees more the bigger tray holds.": "गिनो दबाओ, फिर लिखो बड़ी ट्रे में कितने रुपये ज़्यादा हैं।",
    "How much more?": "कितना ज़्यादा?",
    "Compare the two totals, tray against tray.": "दोनों कुल की तुलना करो, ट्रे से ट्रे।",
    "Yes, the bigger tray holds that much more.": "हाँ, बड़ी ट्रे में इतना ज़्यादा है।",
    "Counting a mixed handful": "मिले-जुले नोट-सिक्के गिनना",
    "Tap the biggest kind first to slide it into the tray.": "सबसे बड़े मूल्य वाली किस्म को पहले छुओ, वह ट्रे में खिसकेगी।",
    "Start with the note.": "नोट से शुरू करो।",
    "Now tap the next kind to add it.": "अब अगली किस्म को छुओ और जोड़ो।",
    "Tap the coins next.": "अब सिक्कों को छुओ।",
    "Point to the kind with the biggest value and slide it first.": "सबसे बड़े मूल्य वाली किस्म दिखाओ और उसे पहले खिसकाओ।",
    "Say the total after that kind and after the next one.": "उस किस्म के बाद और अगली के बाद कुल बोलो।",
    "A mixed handful is counted one kind at a time, starting with the biggest value.": "मिले-जुले पैसे एक-एक किस्म करके गिनते हैं, सबसे बड़े मूल्य से शुरू करके।",
    "You learned: count a mixed handful one kind at a time, biggest first": "तुमने सीखा: मिले पैसे एक-एक किस्म करके, सबसे बड़े से गिनो",
    "Slide every kind into the tray, then type how much money is in the purse.": "हर किस्म ट्रे में खिसकाओ, फिर लिखो बटुए में कितने पैसे हैं।",
    "Money in the purse?": "बटुए में कितने पैसे?",
    "Look at the numbers and start with the largest one.": "अंक देखो और सबसे बड़े से शुरू करो।",
    "Yes, every kind is in the total.": "हाँ, हर किस्म कुल में आ गई।",
    "Add the notes and coins to the tray, then type the total in the purse.": "नोट और सिक्के ट्रे में जोड़ो, फिर बटुए का कुल लिखो।",
    "Purse total?": "बटुए का कुल?",
    "Keep the total so far in your head as each kind slides in.": "हर किस्म आने पर अब तक का कुल याद रखो।",
    "Yes, the notes and coins all count.": "हाँ, सारे नोट और सिक्के गिने गए।",
    "Slide in each kind of money, then type what the purse holds.": "हर किस्म खिसकाओ, फिर लिखो बटुए में कितना है।",
    "How much inside?": "अंदर कितना?",
    "Count how many pieces of each kind there are, too.": "हर किस्म के कितने टुकड़े हैं, यह भी गिनो।",
    "Yes, nothing was left out of the total.": "हाँ, कुल में कुछ भी छूटा नहीं।",
    "One amount, many ways to pay": "एक रकम, चुकाने के कई तरीके",
    "The tray already pays the price, so tap Pay again to clear it.": "ट्रे में कीमत पूरी है, फिर चुकाओ दबाकर उसे खाली करो।",
    "Tap the Pay again key.": "फिर चुकाओ बटन को छुओ।",
    "Now tap a note with 50 on it to put it in the tray.": "अब 50 वाला नोट छुओ और ट्रे में रखो।",
    "Find the note with the 50.": "50 वाला नोट ढूँढो।",
    "Tap a coin with 10 on it to reach the price again.": "10 वाला सिक्का छुओ, फिर कीमत पूरी हो जाएगी।",
    "Find the coin with the 10.": "10 वाला सिक्का ढूँढो।",
    "Say the price and how much money is in the tray now.": "कीमत बोलो और बताओ अभी ट्रे में कितने पैसे हैं।",
    "Say whether the tray needs more or less money.": "बोलो, ट्रे को और पैसे चाहिए या कम।",
    "One price can be paid with different notes and coins.": "एक कीमत अलग-अलग नोट और सिक्कों से चुकाई जा सकती है।",
    "You learned: one price can be paid in many ways": "तुमने सीखा: एक कीमत कई तरीकों से चुकाई जा सकती है",
    "A stall asks for ₹130, so pay it, press Pay again, then pay it another way.": "दुकान 130 रुपये माँगती है, चुकाओ, फिर चुकाओ दबाओ, फिर दूसरे तरीके से चुकाओ।",
    "Pay it two ways": "दो तरीकों से चुकाओ",
    "Keep adding until the Total matches the price.": "कुल कीमत के बराबर होने तक जोड़ो।",
    "Yes, both ways pay the same price.": "हाँ, दोनों तरीके एक ही कीमत चुकाते हैं।",
    "A kite costs ₹85, so pay for it with notes and coins.": "पतंग 85 रुपये की है, नोट और सिक्कों से चुकाओ।",
    "Pay for the kite": "पतंग के पैसे चुकाओ",
    "Compare the Total tag with the price tag.": "कुल की पट्टी को कीमत की पट्टी से मिलाओ।",
    "Yes, that money pays for the kite.": "हाँ, इन पैसों से पतंग आ जाती है।",
    "A toy costs ₹175, so pay with exactly 3 notes and 1 coin.": "खिलौना 175 रुपये का है, ठीक 3 नोट और 1 सिक्के से चुकाओ।",
    "3 notes, 1 coin": "3 नोट, 1 सिक्का",
    "Count the notes and the coin you have used so far.": "अब तक लगाए नोट और सिक्के गिनो।",
    "Yes, three notes and one coin pay for the toy.": "हाँ, तीन नोट और एक सिक्का खिलौने के पैसे चुका देते हैं।",
    "Value": "मूल्य",
    "Least": "सबसे कम",
    "Greatest": "सबसे ज़्यादा",
    "Total": "कुल",
    "Price": "कीमत",
    "Tray": "ट्रे",
    "Way": "तरीका",
    "Count": "गिनो",
    "Pay again": "फिर चुकाओ",
    "Plain list": "सादी सूची",
    "Picture": "चित्र",
    "needs more": "और चाहिए",
    "too much": "ज़्यादा है",
    "Pay the price exactly, then press Pay again and find a second way.": "कीमत ठीक चुकाओ, फिर चुकाओ दबाओ और दूसरा तरीका ढूँढो।",
    "Make the Total match the price, then keep that way for later.": "कुल को कीमत के बराबर करो, उस तरीके को बाद के लिए रखो।",
    "Press Pay again, then pay the price with different notes and coins.": "फिर चुकाओ दबाओ, फिर अलग नोट और सिक्कों से कीमत चुकाओ।",
    "Use exactly 3 notes and 1 coin.": "ठीक 3 नोट और 1 सिक्का लगाओ।",
    "Count your notes and your coins separately.": "नोट और सिक्के अलग-अलग गिनो।",
    "That is the same way, so try a different set of notes and coins.": "यह वही तरीका है, नोट और सिक्कों का दूसरा सेट आज़माओ।",
    "Put all four notes in the row first.": "पहले चारों नोट कतार में रखो।",
    "Put some notes or coins in the tray first.": "पहले ट्रे में कुछ नोट या सिक्के रखो।",
    "The tray is full, so use Pay again to start fresh.": "ट्रे भर गई है, फिर चुकाओ दबाकर नए सिरे से शुरू करो।",
    "That is one way. Press Pay again and find a second way.": "यह एक तरीका है। फिर चुकाओ दबाओ और दूसरा तरीका ढूँढो।",
    "One way is kept, so pay the price a different way.": "एक तरीका रखा है, कीमत दूसरे तरीके से चुकाओ।",
    "Each way must make the Total equal to the price.": "हर तरीके में कुल कीमत के बराबर होना चाहिए।",
    "A second way uses different notes and coins, so press Pay again first.": "दूसरे तरीके में अलग नोट-सिक्के लगते हैं, पहले फिर चुकाओ दबाओ।",
    "Say the price and what the tray holds, then compare them.": "कीमत और ट्रे में रखे पैसे बोलो, फिर उनकी तुलना करो।",
    "The Total must equal the price, with any notes and coins.": "कोई भी नोट-सिक्के लगाओ, कुल कीमत के बराबर होना चाहिए।",
    "Check the pieces: the rule is 3 notes and 1 coin.": "टुकड़े जाँचो: नियम 3 नोट और 1 सिक्के का है।",
    "Use exactly 3 notes and 1 coin, then press Enter.": "ठीक 3 नोट और 1 सिक्का लगाओ, फिर दर्ज करें दबाओ।"
  },
  gu: {
    "Count the Money": "પૈસા ગણો",
    "A purse, a tray and a row of notes and coins, all waiting to be counted.": "એક પાકીટ, એક ટ્રે અને નોટ-સિક્કાની હરોળ, બધું ગણાવાની રાહ જુએ છે.",
    "Free play. Put any money in the tray and count it as you like.": "મુક્ત રમત. ટ્રેમાં કોઈ પણ પૈસા મૂકો અને તમારી રીતે ગણો.",
    "Every note and coin has a value": "દરેક નોટ અને સિક્કાની એક કિંમત હોય છે",
    "Tap the note with 50 on it to read its value.": "50 વાળી નોટને અડો અને તેની કિંમત વાંચો.",
    "Find the note with the big 50.": "મોટા 50 વાળી નોટ શોધો.",
    "Now tap the coin with 5 on it.": "હવે 5 વાળા સિક્કાને અડો.",
    "Find the small round coin with a 5.": "5 વાળો નાનો ગોળ સિક્કો શોધો.",
    "Put the two pieces side by side and compare their numbers.": "બંનેને સાથે મૂકો અને તેમના અંકોની સરખામણી કરો.",
    "Ignore the colour and the shine, and read only the big number.": "રંગ અને ચમક છોડો, ફક્ત મોટો અંક વાંચો.",
    "The number on a note or a coin is its value.": "નોટ કે સિક્કા પર લખેલો અંક જ તેની કિંમત છે.",
    "You learned: the number on a note or a coin is its value": "તમે શીખ્યા: નોટ કે સિક્કા પરનો અંક તેની કિંમત છે",
    "Looking at the number on each piece, what is each one worth in rupees?": "દરેક પર લખેલો અંક જુઓ, દરેક કેટલા રૂપિયાનું છે?",
    "Each is worth?": "દરેકની કિંમત?",
    "Tap each piece and read the number on it.": "દરેકને અડો અને તેના પરનો અંક વાંચો.",
    "Yes, each piece is worth the number written on it.": "હા, દરેક તેના પર લખ્યા જેટલા રૂપિયાનું છે.",
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
    "Yes, a note and a coin with one number are worth the same.": "હા, એક જ અંકવાળી નોટ અને સિક્કાની કિંમત સરખી હોય છે.",
    "Counting notes or coins of one kind": "એક જ પ્રકારની નોટ કે સિક્કા ગણવા",
    "Tap the pile to put one coin in the tray.": "ઢગલાને અડો, એક સિક્કો ટ્રેમાં જશે.",
    "Tap the pile of coins.": "સિક્કાના ઢગલાને અડો.",
    "Tap again and watch the total grow by the value of a coin.": "ફરી અડો અને જુઓ કુલ એક સિક્કાની કિંમત જેટલું વધે છે.",
    "Tap the pile for the next coin.": "આગલા સિક્કા માટે ઢગલાને અડો.",
    "Now tap Count and watch the hand count the tray.": "હવે ગણો દબાવો અને જુઓ હાથ ટ્રે ગણે છે.",
    "Tap the Count key.": "ગણો બટનને અડો.",
    "Say the value of one piece, then count on by that much.": "એકની કિંમત બોલો, પછી એટલું-એટલું ઉમેરતા જાઓ.",
    "Count the pieces as they go in, one jump for each.": "ટ્રેમાં જતા દરેક સાથે એક કૂદકો ગણો.",
    "Notes or coins of one kind are counted in jumps of their value.": "એક જ પ્રકારની નોટ કે સિક્કા તેમની કિંમતના કૂદકામાં ગણાય છે.",
    "You learned: count notes or coins of one kind in jumps of value": "તમે શીખ્યા: એક પ્રકારની નોટ કે સિક્કા કિંમતના કૂદકામાં ગણો",
    "Tap the notes into the tray, then type how much money is in it.": "નોટ ટ્રેમાં મૂકો, પછી લખો તેમાં કેટલા પૈસા છે.",
    "Money in the tray?": "ટ્રેમાં કેટલા પૈસા?",
    "Read the number on a note, then count on from it.": "નોટનો અંક વાંચો, પછી ત્યાંથી આગળ ગણો.",
    "Yes, each note added the same amount to the total.": "હા, દરેક નોટે કુલમાં એટલું જ ઉમેર્યું.",
    "Tap the coins into the tray, then type how much money the tray holds.": "સિક્કા ટ્રેમાં મૂકો, પછી લખો ટ્રેમાં કેટલા પૈસા છે.",
    "Total in the tray?": "ટ્રેમાં કુલ?",
    "Count the coins by their value, not by how many there are.": "સિક્કાને તેમની કિંમતથી ગણો, સંખ્યાથી નહીં.",
    "Yes, seven coins of the same value make that much.": "હા, એક જ કિંમતના સાત સિક્કા આટલા થાય છે.",
    "Tap Count, then type how many rupees more the bigger tray holds.": "ગણો દબાવો, પછી લખો મોટી ટ્રેમાં કેટલા રૂપિયા વધુ છે.",
    "How much more?": "કેટલું વધુ?",
    "Compare the two totals, tray against tray.": "બંને કુલની સરખામણી કરો, ટ્રે સાથે ટ્રે.",
    "Yes, the bigger tray holds that much more.": "હા, મોટી ટ્રેમાં આટલું વધુ છે.",
    "Counting a mixed handful": "મિશ્ર નોટ-સિક્કા ગણવા",
    "Tap the biggest kind first to slide it into the tray.": "સૌથી મોટી કિંમતવાળા પ્રકારને પહેલા અડો, તે ટ્રેમાં સરકશે.",
    "Start with the note.": "નોટથી શરૂ કરો.",
    "Now tap the next kind to add it.": "હવે આગલા પ્રકારને અડો અને ઉમેરો.",
    "Tap the coins next.": "હવે સિક્કાને અડો.",
    "Point to the kind with the biggest value and slide it first.": "સૌથી મોટી કિંમતવાળો પ્રકાર બતાવો અને તેને પહેલા સરકાવો.",
    "Say the total after that kind and after the next one.": "તે પ્રકાર પછી અને આગલા પછી કુલ બોલો.",
    "A mixed handful is counted one kind at a time, starting with the biggest value.": "મિશ્ર પૈસા એક-એક પ્રકાર કરીને ગણાય છે, સૌથી મોટી કિંમતથી શરૂ કરીને.",
    "You learned: count a mixed handful one kind at a time, biggest first": "તમે શીખ્યા: મિશ્ર પૈસા એક-એક પ્રકારે, સૌથી મોટાથી ગણો",
    "Slide every kind into the tray, then type how much money is in the purse.": "દરેક પ્રકાર ટ્રેમાં સરકાવો, પછી લખો પાકીટમાં કેટલા પૈસા છે.",
    "Money in the purse?": "પાકીટમાં કેટલા પૈસા?",
    "Look at the numbers and start with the largest one.": "અંક જુઓ અને સૌથી મોટાથી શરૂ કરો.",
    "Yes, every kind is in the total.": "હા, દરેક પ્રકાર કુલમાં આવી ગયો.",
    "Add the notes and coins to the tray, then type the total in the purse.": "નોટ અને સિક્કા ટ્રેમાં ઉમેરો, પછી પાકીટનો કુલ લખો.",
    "Purse total?": "પાકીટનો કુલ?",
    "Keep the total so far in your head as each kind slides in.": "દરેક પ્રકાર આવે ત્યારે અત્યાર સુધીનો કુલ યાદ રાખો.",
    "Yes, the notes and coins all count.": "હા, બધી નોટ અને સિક્કા ગણાયા.",
    "Slide in each kind of money, then type what the purse holds.": "દરેક પ્રકાર સરકાવો, પછી લખો પાકીટમાં કેટલું છે.",
    "How much inside?": "અંદર કેટલું?",
    "Count how many pieces of each kind there are, too.": "દરેક પ્રકારના કેટલા છે તે પણ ગણો.",
    "Yes, nothing was left out of the total.": "હા, કુલમાં કંઈ છૂટ્યું નથી.",
    "One amount, many ways to pay": "એક રકમ, ચૂકવવાની ઘણી રીતો",
    "The tray already pays the price, so tap Pay again to clear it.": "ટ્રેમાં કિંમત પૂરી છે, ફરી ચૂકવો દબાવીને તેને ખાલી કરો.",
    "Tap the Pay again key.": "ફરી ચૂકવો બટનને અડો.",
    "Now tap a note with 50 on it to put it in the tray.": "હવે 50 વાળી નોટ અડો અને ટ્રેમાં મૂકો.",
    "Find the note with the 50.": "50 વાળી નોટ શોધો.",
    "Tap a coin with 10 on it to reach the price again.": "10 વાળો સિક્કો અડો, ફરી કિંમત પૂરી થશે.",
    "Find the coin with the 10.": "10 વાળો સિક્કો શોધો.",
    "Say the price and how much money is in the tray now.": "કિંમત બોલો અને કહો હમણાં ટ્રેમાં કેટલા પૈસા છે.",
    "Say whether the tray needs more or less money.": "બોલો, ટ્રેને વધુ પૈસા જોઈએ કે ઓછા.",
    "One price can be paid with different notes and coins.": "એક કિંમત અલગ-અલગ નોટ અને સિક્કાથી ચૂકવી શકાય છે.",
    "You learned: one price can be paid in many ways": "તમે શીખ્યા: એક કિંમત ઘણી રીતે ચૂકવી શકાય છે",
    "A stall asks for ₹130, so pay it, press Pay again, then pay it another way.": "સ્ટોલ 130 રૂપિયા માંગે છે, ચૂકવો, ફરી ચૂકવો દબાવો, પછી બીજી રીતે ચૂકવો.",
    "Pay it two ways": "બે રીતે ચૂકવો",
    "Keep adding until the Total matches the price.": "કુલ કિંમત જેટલું થાય ત્યાં સુધી ઉમેરો.",
    "Yes, both ways pay the same price.": "હા, બંને રીતે એ જ કિંમત ચૂકવાય છે.",
    "A kite costs ₹85, so pay for it with notes and coins.": "પતંગ 85 રૂપિયાની છે, નોટ અને સિક્કાથી ચૂકવો.",
    "Pay for the kite": "પતંગના પૈસા ચૂકવો",
    "Compare the Total tag with the price tag.": "કુલની પટ્ટીને કિંમતની પટ્ટી સાથે સરખાવો.",
    "Yes, that money pays for the kite.": "હા, આ પૈસાથી પતંગ આવી જાય છે.",
    "A toy costs ₹175, so pay with exactly 3 notes and 1 coin.": "રમકડું 175 રૂપિયાનું છે, બરાબર 3 નોટ અને 1 સિક્કાથી ચૂકવો.",
    "3 notes, 1 coin": "3 નોટ, 1 સિક્કો",
    "Count the notes and the coin you have used so far.": "અત્યાર સુધી મૂકેલી નોટ અને સિક્કા ગણો.",
    "Yes, three notes and one coin pay for the toy.": "હા, ત્રણ નોટ અને એક સિક્કો રમકડાના પૈસા ચૂકવે છે.",
    "Value": "કિંમત",
    "Least": "સૌથી ઓછી",
    "Greatest": "સૌથી વધુ",
    "Total": "કુલ",
    "Price": "કિંમત",
    "Tray": "ટ્રે",
    "Way": "રીત",
    "Count": "ગણો",
    "Pay again": "ફરી ચૂકવો",
    "Plain list": "સાદી યાદી",
    "Picture": "ચિત્ર",
    "needs more": "વધુ જોઈએ",
    "too much": "વધારે છે",
    "Pay the price exactly, then press Pay again and find a second way.": "કિંમત બરાબર ચૂકવો, પછી ફરી ચૂકવો દબાવો અને બીજી રીત શોધો.",
    "Make the Total match the price, then keep that way for later.": "કુલને કિંમત જેટલું કરો, તે રીતને પછી માટે રાખો.",
    "Press Pay again, then pay the price with different notes and coins.": "ફરી ચૂકવો દબાવો, પછી અલગ નોટ અને સિક્કાથી કિંમત ચૂકવો.",
    "Use exactly 3 notes and 1 coin.": "બરાબર 3 નોટ અને 1 સિક્કો વાપરો.",
    "Count your notes and your coins separately.": "નોટ અને સિક્કા અલગ-અલગ ગણો.",
    "That is the same way, so try a different set of notes and coins.": "આ એ જ રીત છે, નોટ અને સિક્કાનો બીજો સેટ અજમાવો.",
    "Put all four notes in the row first.": "પહેલા ચારેય નોટ હરોળમાં મૂકો.",
    "Put some notes or coins in the tray first.": "પહેલા ટ્રેમાં થોડી નોટ કે સિક્કા મૂકો.",
    "The tray is full, so use Pay again to start fresh.": "ટ્રે ભરાઈ ગઈ છે, ફરી ચૂકવો દબાવીને નવેસરથી શરૂ કરો.",
    "That is one way. Press Pay again and find a second way.": "આ એક રીત છે. ફરી ચૂકવો દબાવો અને બીજી રીત શોધો.",
    "One way is kept, so pay the price a different way.": "એક રીત રાખી છે, કિંમત બીજી રીતે ચૂકવો.",
    "Each way must make the Total equal to the price.": "દરેક રીતમાં કુલ કિંમત જેટલું થવું જોઈએ.",
    "A second way uses different notes and coins, so press Pay again first.": "બીજી રીતમાં અલગ નોટ-સિક્કા વપરાય છે, પહેલા ફરી ચૂકવો દબાવો.",
    "Say the price and what the tray holds, then compare them.": "કિંમત અને ટ્રેમાં રાખેલા પૈસા બોલો, પછી સરખામણી કરો.",
    "The Total must equal the price, with any notes and coins.": "કોઈ પણ નોટ-સિક્કા વાપરો, કુલ કિંમત જેટલું થવું જોઈએ.",
    "Check the pieces: the rule is 3 notes and 1 coin.": "ટુકડા તપાસો: નિયમ 3 નોટ અને 1 સિક્કાનો છે.",
    "Use exactly 3 notes and 1 coin, then press Enter.": "બરાબર 3 નોટ અને 1 સિક્કો વાપરો, પછી દાખલ કરો દબાવો."
  },
};

/* One entry per phase = one mount. Items carry `sc`, the scene the working area draws for them, and `win`, the one line said at the right answer. */
const PHASES = [
  {
    n: 1,
    concept: "Every note and coin has a value",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Look at the number on each one. Which is worth the most?"],
    steps: [
      { say: "Tap the note with 50 on it to read its value.", on: "read-n50", hint: "Find the note with the big 50." },
      { say: "Now tap the coin with 5 on it.", on: "read-c5", hint: "Find the small round coin with a 5." },
    ],
    ladder: ["Put the two pieces side by side and compare their numbers.", "Ignore the colour and the shine, and read only the big number."],
    closing: "The number on a note or a coin is its value.",
    learned: "You learned: the number on a note or a coin is its value",
    traceback: "The pieces light their numbers one after another; the sorted row is made again from the numbers and stops one note short.",
    items: [
      /* learn CM1: Yes, each is worth ₹20 */
      { qid: "M1.S1.T2.C5:CM1", kind: "pair", sc: { a: "n20", b: "c20" }, say: "Looking at the number on each piece, what is each one worth in rupees?", ask: "Each is worth?", answer: 20,
        miss: "Tap each piece and read the number on it.", win: "Yes, each piece is worth the number written on it." },
      /* practice 1: ₹10, ₹50, ₹200, ₹500 (made on the working area: the row of notes) */
      { qid: "M1.S1.T2.C5:1", kind: "order", pad: "enter", sc: { ids: ["n200", "n10", "n500", "n50"] }, say: "Tap the four notes in order, from the least to the greatest.", ask: "Least to greatest", answer: "least-to-greatest",
        miss: "Find the note with the smallest number first.", win: "Yes, the notes now go from the least to the greatest." },
      /* authored: no plan question tests the note-versus-coin misconception directly */
      { qid: null, kind: "pair", sc: { a: "n10", b: "c10" }, choices: [{ id: "note", label: "The note" }, { id: "coin", label: "The coin" }, { id: "same", label: "The same" }],
        say: "Which is worth more, this note or this coin?", ask: "Which is worth more?", answer: "same",
        miss: "Read the number on each piece, not how it looks.", win: "Yes, a note and a coin with one number are worth the same." },
    ],
  },
  {
    n: 2,
    concept: "Counting notes or coins of one kind",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Tap them in one at a time. Count in jumps of the value."],
    steps: [
      { say: "Tap the pile to put one coin in the tray.", on: "pile", hint: "Tap the pile of coins." },
      { say: "Tap again and watch the total grow by the value of a coin.", on: "pile", hint: "Tap the pile for the next coin." },
      { say: "Now tap Count and watch the hand count the tray.", on: "count", hint: "Tap the Count key." },
    ],
    ladder: ["Say the value of one piece, then count on by that much.", "Count the pieces as they go in, one jump for each."],
    closing: "Notes or coins of one kind are counted in jumps of their value.",
    learned: "You learned: count notes or coins of one kind in jumps of value",
    traceback: "The tray empties and the pieces go in again, one jump each, stopping one jump before the total.",
    items: [
      /* learn CM2: ₹200 */
      { qid: "M1.S1.T2.C6:CM2", kind: "pile", sc: { kind: "n50", n: 4 }, say: "Tap the notes into the tray, then type how much money is in it.", ask: "Money in the tray?", answer: 200,
        miss: "Read the number on a note, then count on from it.", win: "Yes, each note added the same amount to the total." },
      /* practice 2: ₹14 */
      { qid: "M1.S1.T2.C6:2", kind: "pile", sc: { kind: "c2", n: 7 }, say: "Tap the coins into the tray, then type how much money the tray holds.", ask: "Total in the tray?", answer: 14,
        miss: "Count the coins by their value, not by how many there are.", win: "Yes, seven coins of the same value make that much." },
      /* practice 5: the plan's answer is ₹100 more (7 notes of ₹100 = ₹700, 3 notes of ₹200 = ₹600) */
      { qid: "M1.S1.T2.C6:5", kind: "trays", sc: { a: { kind: "n200", n: 3 }, b: { kind: "n100", n: 7 } }, say: "Tap Count, then type how many rupees more the bigger tray holds.", ask: "How much more?", answer: 100,
        miss: "Compare the two totals, tray against tray.", win: "Yes, the bigger tray holds that much more." },
    ],
  },
  {
    n: 3,
    concept: "Counting a mixed handful",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Begin with the biggest value. Add one kind at a time. What is the total now?"],
    steps: [
      { say: "Tap the biggest kind first to slide it into the tray.", on: "kind-n50", hint: "Start with the note." },
      { say: "Now tap the next kind to add it.", on: "kind-c10", hint: "Tap the coins next." },
    ],
    ladder: ["Point to the kind with the biggest value and slide it first.", "Say the total after that kind and after the next one."],
    closing: "A mixed handful is counted one kind at a time, starting with the biggest value.",
    learned: "You learned: count a mixed handful one kind at a time, biggest first",
    traceback: "The tray empties and the kinds slide in again from the biggest, stopping one kind before the total.",
    items: [
      /* learn CM3: ₹240 */
      { qid: "M1.S1.T2.C7:CM3", kind: "purse", sc: { has: { n100: 2, n20: 1, c10: 1, c5: 2 } }, say: "Slide every kind into the tray, then type how much money is in the purse.", ask: "Money in the purse?", answer: 240,
        miss: "Look at the numbers and start with the largest one.", win: "Yes, every kind is in the total." },
      /* practice 3: ₹66 */
      { qid: "M1.S1.T2.C7:3", kind: "purse", sc: { has: { n50: 1, n10: 1, c2: 3 } }, say: "Add the notes and coins to the tray, then type the total in the purse.", ask: "Purse total?", answer: 66,
        miss: "Keep the total so far in your head as each kind slides in.", win: "Yes, the notes and coins all count." },
      /* practice 7: ₹700 */
      { qid: "M1.S1.T2.C7:7", kind: "purse", sc: { has: { n500: 1, n50: 3, c10: 4, c2: 5 } }, say: "Slide in each kind of money, then type what the purse holds.", ask: "How much inside?", answer: 700,
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
      { say: "Now tap a note with 50 on it to put it in the tray.", on: "put-n50", hint: "Find the note with the 50." },
      { say: "Tap a coin with 10 on it to reach the price again.", on: "put-c10", hint: "Find the coin with the 10." },
    ],
    ladder: ["Say the price and what the tray holds, then compare them.", "The Total must equal the price, with any notes and coins."],
    closing: "One price can be paid with different notes and coins.",
    learned: "You learned: one price can be paid in many ways",
    traceback: "The Total stays amber against the price until the two are equal; a first way waits beside the tray.",
    items: [
      /* learn CM4: two ways to pay ₹130 (made on the working area: the tray) */
      { qid: "M1.S1.T2.C8:CM4", kind: "pay", pad: "enter", sc: { price: 130, mode: "two" }, say: "A stall asks for ₹130, so pay it, press Pay again, then pay it another way.", ask: "Pay it two ways", answer: "pay-two-ways",
        miss: "Pay the price exactly, then press Pay again and find a second way.", win: "Yes, both ways pay the same price.",
        ladder: ["Each way must make the Total equal to the price.", "A second way uses different notes and coins, so press Pay again first."] },
      /* practice 4: one way to pay ₹85 */
      { qid: "M1.S1.T2.C8:4", kind: "pay", pad: "enter", sc: { price: 85, mode: "one" }, say: "A kite costs ₹85, so pay for it with notes and coins.", ask: "Pay for the kite", answer: "pay-exactly",
        miss: "Compare the Total tag with the price tag.", win: "Yes, that money pays for the kite." },
      /* practice 8: ₹175 with exactly 3 notes and 1 coin (100 + 50 + 20 + 5) */
      { qid: "M1.S1.T2.C8:8", kind: "pay", pad: "enter", sc: { price: 175, mode: "three1" }, say: "A toy costs ₹175, so pay with exactly 3 notes and 1 coin.", ask: "3 notes, 1 coin", answer: "pay-3-notes-1-coin",
        miss: "Count the notes and the coin you have used so far.", win: "Yes, three notes and one coin pay for the toy.",
        ladder: ["Check the pieces: the rule is 3 notes and 1 coin.", "Use exactly 3 notes and 1 coin, then press Enter."] },
      /* practice 6 (which two of A, B, C pay ₹36) is the unused plan question: the phase keeps three */
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  notes: [500, 200, 100, 50, 20, 10], coins: [20, 10, 5, 2, 1],
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
/* the plan's slip per kind: pieces added to the value (4 and 50); a purse's values added without the counts; two trays compared by pieces plus value */
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

/* ── the working area (laid out for 900 wide, so it is the same with the keypad open or shut) ── */
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
  const showAll = reveal || warm || free;
  const W = box && box.w ? box.w : 900;
  const wide = W >= 1200 && (K === "pay" || K === "free" || K === "order");
  const f = Math.max(0, Math.min(1, (W - 900) / 572));
  /* with the keypad shut a small picture is scaled up and centred; with it open (f = 0) it is exactly the 900-wide layout */
  const fitScene = (bx: number, by: number, bw: number, bh: number) => {
    const mF = Math.max(1, Math.min(1.6, (W - 60) / bw, 420 / bh)), m = 1 + f * (mF - 1);
    const tx0 = bx + f * ((W - bw * m) / 2 - bx), ty0 = by + f * (Math.max(96, (520 - bh * m) / 2 + 14) - by);
    return "translate(" + (tx0 - bx * m).toFixed(1) + "," + (ty0 - by * m).toFixed(1) + ") scale(" + m.toFixed(3) + ")";
  };
  const TR_X = wide ? 580 : 0, TR_Y = wide ? 100 : 184, TR_W = wide ? 884 : 640, TR_H = wide ? 340 : 236;

  const [raw, setRaw] = useState(() => mlFresh(qk));
  const SR: any = useRef(raw);
  const S: any = raw.qk === qk ? raw : mlFresh(qk);
  if (SR.current.qk !== qk) SR.current = S;
  const put = (p: any) => { const b = SR.current.qk === qk ? SR.current : mlFresh(qk); SR.current = { ...b, ...p }; setRaw(SR.current); };
  const busy = useRef(false);
  const acting = useRef(false);
  const lastKey = useRef(0);
  const lastPut = useRef({} as any);
  const nudged = useRef(0 as any);
  /* a short line for a tap or Enter that cannot do anything; the question comes back on the child's next change */
  /* a miss hint sits on the bubble until the child's next tap on the keys; the Answer key's tap clears it, so a fresh nudge (or a tray that moved on) takes it away first */
  const clearHint = () => { try { if (api.openAnswer && api.openAnswer()) setTimeout(() => { if (api.closeAnswer) api.closeAnswer(); }, 330); } catch (e) { /* the hint just stays */ } };
  const nudge = (line: string, keep = false) => { if (stage !== "ask") return; clearHint(); nudged.current = keep ? 2 : 1; api.say(line); };

  const isDone = (s: any) => (K === "pair" ? !!(s.read[sc.a] && s.read[sc.b]) : K === "order" ? s.placed.length === 4
    : K === "pile" ? (s.tray[sc.kind] || 0) >= sc.n : K === "trays" ? s.counted >= sc.a.n + sc.b.n
    : K === "purse" ? Object.keys(sc.has).every((k: string) => (s.tray[k] || 0) >= sc.has[k]) : false);
  const actDone = S.done || isDone(S);
  const price = sc.price || 0;
  const exact = K === "pay" && price > 0 && mlSum(S.tray) === price && Object.keys(S.tray).length > 0;

  /* ── the child's acts ── */
  const tapRead = (id: string) => {
    if (acting.current) return;
    put({ read: { ...SR.current.read, [id]: true }, touched: true });
    api.sfx.tick();
    if (stage === "demo") api.did("read-" + id);
  };
  const tapNote = (id: string) => {
    const p = SR.current.placed;
    put({ placed: p.indexOf(id) >= 0 ? p.filter((x: string) => x !== id) : [...p, id], touched: true });
    api.sfx.tick();
  };
  const tapPile = () => {
    const t = SR.current.tray[sc.kind] || 0;
    if (acting.current || t >= sc.n) return;
    put({ tray: { [sc.kind]: t + 1 }, touched: true });
    api.sfx.tick();
    if (stage === "demo") api.did("pile");
  };
  const tapKind = (id: string) => {
    const t = SR.current.tray;
    if (acting.current || t[id]) return;
    put({ tray: { ...t, [id]: sc.has[id] }, touched: true });
    api.sfx.settle();
    if (stage === "demo") api.did("kind-" + id);
  };
  const tapPut = (id: string) => {
    const t = SR.current.tray, c = t[id] || 0;
    if (acting.current) return;
    const now = Date.now();
    if (now - (lastPut.current[id] || 0) < 300) return;
    lastPut.current[id] = now;
    if (c >= 9 || (!c && Object.keys(t).length >= 6)) { if (stage === "demo") api.did("put-" + id); else nudge("The tray is full, so use Pay again to start fresh."); return; }
    const nt = { ...t, [id]: c + 1 };
    put({ tray: nt, touched: true, note: "", cand: price > 0 && mlSum(nt) === price ? mlSig(nt) : SR.current.cand });
    api.sfx.tick();
    if (stage === "demo") api.did("put-" + id);
  };
  const doCount = async () => {
    if (acting.current) return;
    if (stage === "demo" && stepOn !== "count") { api.did("count"); return; }
    const total = K === "pile" ? SR.current.tray[sc.kind] || 0 : sc.a.n + sc.b.n;
    if (!total || (K === "trays" && SR.current.counted >= total)) return;
    acting.current = true;
    put({ touched: true, counted: 0 });
    const pts = (K === "pile" ? trayFans[0].cs : [...trayFans[0].cs, ...trayFans[1].cs]).map((c: any) => ({ x: c.cx, y: c.cy }));
    const ok = await api.act({ tool: "hand", moves: "tap", at: pts, onPoint: (i: number) => put({ counted: i + 1 }) });
    acting.current = false;
    if (!ok) return;
    put({ counted: total });
    api.sfx.settle();
    if (stage === "demo") api.did("count");
  };
  const payAgain = async () => {
    if (acting.current) return;
    if (stage === "demo" && stepOn !== "pay-again") { api.did("pay-again"); return; }
    acting.current = true;
    const ok = await api.act({ tool: "hand", moves: "sweep", from: { x: TR_X + 40, y: TR_Y + TR_H / 2 }, at: [{ x: TR_X + TR_W / 2, y: TR_Y + TR_H / 2 }], to: { x: TR_X + TR_W - 40, y: TR_Y + TR_H / 2 } });
    acting.current = false;
    if (!ok) return;
    const cur = SR.current;
    const use = K === "pay" && sc.mode === "two" ? (exactOf(cur) ? mlSig(cur.tray) : cur.cand) : "";
    const keep = !!use && cur.ways.indexOf(use) < 0;
    put({ ways: keep ? [...cur.ways, use] : cur.ways, tray: {}, note: "", cand: "", touched: true });
    api.sfx.settle();
    if (stage === "demo") api.did("pay-again");
  };
  const exactOf = (s: any) => price > 0 && Object.keys(s.tray).length > 0 && mlSum(s.tray) === price;
  const pressKey = (fn: any) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; fn(); };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT guide step */
  const act = (on: any) => {
    if (on.indexOf("read-") === 0) tapRead(on.slice(5));
    else if (on === "pile") tapPile();
    else if (on.indexOf("kind-") === 0) tapKind(on.slice(5));
    else if (on.indexOf("put-") === 0) tapPut(on.slice(4));
    else if (on === "pay-again") payAgain();
    else if (on === "count") doCount();
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
      /* one exact way is not a miss: keep it, clear the tray (the hand sweeps) and say what is next */
      if (exactOf(s) && s.ways.length === 0) { nudge("That is one way. Press Pay again and find a second way.", true); payAgain(); return; }
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
  /* what the agent does at once: the act of the question (never gated) */
  const finishAct = () => {
    if (K === "pair") put({ read: { [sc.a]: true, [sc.b]: true }, touched: true });
    else if (K === "pile") put({ tray: { [sc.kind]: sc.n }, touched: true });
    else if (K === "trays") put({ counted: sc.a.n + sc.b.n, touched: true });
    else if (K === "purse") put({ tray: { ...sc.has }, touched: true });
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
  const trayWays = S.ways.concat(exact ? [mlSig(S.tray)] : S.cand && S.ways.indexOf(S.cand) < 0 ? [S.cand] : []);
  const ready = K === "order" ? S.placed.length === 4
    : K === "pay" ? (sc.mode === "two" ? new Set(trayWays).size >= 2 : sc.mode === "three1" ? exact && mlCnt(S.tray, "n") === 3 && mlCnt(S.tray, "c") === 1 : exact)
    : false;
  useEffect(() => { if (stage === "ask" && item.pad === "enter") api.answerReady(!!ready); }, [ready, qk, stage]);

  useEffect(() => {
    if (nudged.current === 2) { nudged.current = 1; return; }
    if (nudged.current === 1) { nudged.current = 0; if (stage === "ask") api.say(item.say); return; }
    /* the tray moved on after a miss: its hint no longer describes it, so the question comes back */
    if (stage === "ask" && item.pad === "enter" && !busy.current && !acting.current) {
      const g = (window as any).toolApi && (window as any).toolApi.getState ? (window as any).toolApi.getState() : null;
      if (g && g.hint && g.hintKind !== "type") clearHint();
    }
  }, [mlSig(S.tray), S.placed.join(","), S.ways.join("|")]);

  /* the win: the whole picture (the child's own way, or a neat one from the answer when the agent drove it), and the one line */
  useEffect(() => {
    if (!(stage === "win" || stage === "idle") || free || warm) return;
    if (K === "pile") put({ tray: { [sc.kind]: sc.n } });
    else if (K === "trays") put({ counted: sc.a.n + sc.b.n });
    else if (K === "purse") put({ tray: { ...sc.has } });
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
    if (K === "pair") {
      L.push([450, () => put({ read: { [sc.a]: true } })], [900, () => put({ read: { [sc.a]: true, [sc.b]: true } })], [500, () => {}]);
    } else if (K === "order") {
    const ids: string[] = sc.ids, os = wide ? 1.95 : 1.4, W2 = ML_NW * os, H2 = ML_NH * os, sx = (i: number) => 8 + i * (wide ? 293 : 212);
    const yS = wide ? 104 : 24, yT = wide ? 290 : 210, yL = wide ? 488 : 350, xR = wide ? sx(3) + W2 : 892;
    ids.forEach((id: string, i: number) => {
      const slot = S.placed.indexOf(id);
      out.push(<rect key={"slot" + i} x={sx(i)} y={yT} width={W2} height={H2} rx={14} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />);
      if (slot < 0) out.push(<g key={"nt" + id}>{mlPiece(id, sx(i), yS, os, {})}<Hit id={"note-" + id} x={sx(i)} y={yS} w={W2} h={H2} label={lab(id)} onPress={() => tapNote(id)} /></g>);
      else out.push(<g key={"nt" + id}>{mlPiece(id, sx(slot), yT, os, {})}<Hit id={"note-" + id} x={sx(slot)} y={yT} w={W2} h={H2} label={lab(id)} onPress={() => tapNote(id)} /></g>);
    });
    out.push(<text key="lo" x={8} y={yL} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Least")}</text>);
    out.push(<text key="gr" x={xR} y={yL} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Greatest")}</text>);
  } else if (K === "pile") {
      L.push([300, () => put({ tray: {} })]);
      for (let i = 1; i < sc.n; i++) L.push([450, () => put({ tray: { [sc.kind]: i } })]);
      L.push([400, () => {}]);
    } else if (K === "trays") {
      L.push([300, () => put({ counted: 0 })]);
      const tot = sc.a.n + sc.b.n;
      for (let i = 1; i <= tot; i++) L.push([i === sc.a.n || i === tot ? 600 : 220, () => put({ counted: i })]);
    } else if (K === "purse") {
      const ks = ML_KINDS.filter((k: string) => sc.has[k]);
      L.push([300, () => put({ tray: {} })]);
      for (let i = 1; i < ks.length; i++) L.push([800, () => put({ tray: ks.slice(0, i).reduce((m: any, k: string) => ({ ...m, [k]: sc.has[k] }), {}) })]);
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
  useEffect(() => () => { tl.stop(); busy.current = false; }, [qk]);

  /* ── drawing ── */
  const out: any[] = [];
  const panel = (x: number, y: number, w: number, h: number, ring = false) => (
    <g key={"pn" + x + "-" + y}>
      <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={ring ? ML_GRN : C.rule} strokeWidth={ring ? 7 : 2.5} />
    </g>);
  const invFor = (id: string, x: number, y: number, w: number, h: number) => (stepOn === id && stage === "demo" ? <Invite key={"inv" + id} x={x + w / 2} y={y + h / 2} w={w} h={h} rx={14} C={C} /> : null);
  const lab = (id: string) => (mlNote(id) ? "₹" + ML_V[id] + " note" : "₹" + ML_V[id] + " coin");
  const tray = S.tray;
  const kindsIn = ML_KINDS.filter((k: string) => tray[k]);
  let trayFans: any[] = [{ cs: [] }, { cs: [] }];

  /* the shelf: 6 notes and 5 coins (P1 reads them, the pay scene and free play put them in the tray) */
  const shelf = (mode: string) => {
    const rd = mode === "read", nY = rd ? 12 : 8, cY = rd ? 148 : 96;
    ML_KINDS.forEach((id: string, i: number) => {
      const note = mlNote(id), px = note ? 12 + i * 148 : 60 + (i - 6) * 170, py = note ? nY : cY;
      const w = note ? ML_NW : ML_CD, h = note ? ML_NH : ML_CD, lit = rd && S.read[id];
      out.push(
        <g key={"sh" + id}>
          {mlPiece(id, px, py, 1, { lit })}
          {rd && lit && mlTag(px + w / 2 - 62, py + h + 6, 124, 44, ML_AMB, tx("Value"), T.micro)}
          {invFor((rd ? "read-" : "put-") + id, px, py, w, h)}
          <Hit id={(rd ? "read-" : "put-") + id} x={px} y={py} w={w} h={Math.max(h, 72)} label={lab(id)} onPress={() => (rd ? tapRead(id) : tapPut(id))} />
        </g>);
    });
  };

  if (K === "all11") {
    shelf("read");
    out.push(<g key="purse"><rect x={330} y={310} width={200} height={176} rx={36} fill="#B97A3E" stroke="#6B4423" strokeWidth={4} /><Skin name="purse" x={320} y={300} w={218} h={200} /></g>);
  } else if (K === "pair") {
    const a = sc.a, b = sc.b, aw = ML_NW * 2.5, bx = 520;
    out.push(
      <g key="pair">
        {mlPiece(a, 50, 100, 2.5, { lit: S.read[a] })}
        {mlPiece(b, bx, 100, 2.5, { lit: S.read[b] })}
        {S.read[a] && mlTag(50 + aw / 2 - 80, 310, 160, 52, ML_AMB, tx("Value"), 32)}
        {S.read[b] && mlTag(bx + ML_CD * 1.25 - 80, 310, 160, 52, ML_AMB, tx("Value"), 32)}
        <Hit id={"read-" + a} x={50} y={100} w={aw} h={ML_NH * 2.5} label={lab(a)} onPress={() => tapRead(a)} />
        <Hit id={"read-" + b} x={bx} y={100} w={ML_CD * 2.5} h={ML_CD * 2.5} label={lab(b)} onPress={() => tapRead(b)} />
      </g>);
  } else if (K === "order") {
    const ids: string[] = sc.ids, W2 = ML_NW * 1.4, H2 = ML_NH * 1.4, sx = (i: number) => 8 + i * 212;
    ids.forEach((id: string, i: number) => {
      const slot = S.placed.indexOf(id);
      out.push(<rect key={"slot" + i} x={sx(i)} y={210} width={W2} height={H2} rx={14} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />);
      if (slot < 0) out.push(<g key={"nt" + id}>{mlPiece(id, sx(i), 24, 1.4, {})}<Hit id={"note-" + id} x={sx(i)} y={24} w={W2} h={H2} label={lab(id)} onPress={() => tapNote(id)} /></g>);
      else out.push(<g key={"nt" + id}>{mlPiece(id, sx(slot), 210, 1.4, {})}<Hit id={"note-" + id} x={sx(slot)} y={210} w={W2} h={H2} label={lab(id)} onPress={() => tapNote(id)} /></g>);
    });
    out.push(<text key="lo" x={8} y={350} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Least")}</text>);
    out.push(<text key="gr" x={892} y={350} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Greatest")}</text>);
  } else if (K === "pile") {
    const k = sc.kind, t = tray[k] || 0, rem = sc.n - t;
    const fan = mlFan(k, rem, 8, 120, 300, 170, 1.3);
    out.push(panel(340, 90, 550, 240));
    if (rem > 0) {
      out.push(<g key="pile">{mlDraw(k, fan, rem)}{invFor("pile", 8, 100, 296, 210)}<Hit id="pile" x={8} y={100} w={296} h={210} label="pile" onPress={tapPile} /></g>);
    } else out.push(<rect key="pe" x={8} y={130} width={300} height={150} rx={14} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />);
    const full = t >= sc.n, row = mlRow(k, t, 350, 130, 530, 160, { tot: t === 0 ? null : full && !reveal && !warm ? null : t * ML_V[k], reveal: full && !warm, k: "p", smax: 1.1, lit: warm ? S.counted : 0 });
    trayFans[0] = row.fan;
    out.push(row.el);
  } else if (K === "trays") {
    const A = sc.a, B = sc.b, cA = Math.min(S.counted, A.n), cB = Math.max(0, S.counted - A.n);
    const pw = 888 + f * 572, ph = 190 - f * 30, y0 = 20 + f * 76, y1 = 230 + f * 36;
    const rows = [[A, cA, y0], [B, cB, y1]];
    rows.forEach((r: any, i: number) => {
      out.push(panel(6, r[2], pw, ph));
      const full = r[1] > 0;
      const row = mlRow(r[0].kind, r[0].n, 16, r[2] + 15 - f * 5, pw - 20, ph - 30, { tot: full ? r[1] * ML_V[r[0].kind] : null, k: "t" + i, lit: r[1], cshow: r[1], smax: 1.15 });
      trayFans[i] = row.fan;
      out.push(row.el);
    });
    if (reveal) out.push(<g key="diff" data-reveals="answer">{mlTag(pw / 2 + 6 - 150, 436, 300, 64, ML_GRN, "+₹" + (B.n * ML_V[B.kind] - A.n * ML_V[A.kind]), 40)}</g>);
  } else if (K === "purse") {
    const ks = ML_KINDS.filter((k: string) => sc.has[k]);
    const pX = 4 + f * 1186, pY = 2 + f * 228, pW = 160 + f * 90, pH = 147 + f * 83;
    out.push(<g key="ph"><rect x={pX + 6} y={pY + 8} width={pW - 20} height={pH - 19} rx={30} fill="#B97A3E" stroke="#6B4423" strokeWidth={3} /><Skin name="purse" x={pX} y={pY} w={pW} h={pH} /></g>);
    const cy0 = 152 - f * 142, cst = 86 + f * 34, chh = 82 + f * 30, cw = 312 + f * 40, cx0 = 4;
    ks.forEach((k: string, i: number) => {
      const y = cy0 + i * cst, left = tray[k] ? 0 : sc.has[k], fan = mlFan(k, Math.max(left, 0), 12, y + 5, cw - 98, chh - 10, 1 + f * 0.3);
      out.push(
        <g key={"cell" + k}>
          <rect x={cx0} y={y} width={cw} height={chh} rx={16} fill={left ? tint(C.panel, 0.45) : "none"} stroke={C.rule} strokeWidth={2.5} strokeDasharray={left ? undefined : "8 8"} />
          {left > 0 && mlDraw(k, fan, left)}
          {left > 0 && mlTag(cx0 + cw - 84, y + chh / 2 - 23, 76, 46, ML_SKY, "×" + left, 32)}
          {left > 0 && invFor("kind-" + k, 12, y, cw - 12, chh)}
          {left > 0 && <Hit id={"kind-" + k} x={12} y={y} w={cw - 12} h={chh} label={lab(k)} onPress={() => tapKind(k)} />}
        </g>);
    });
    const px0 = 340 + f * 40, ppw = 550 + f * 230;
    out.push(panel(px0, 10, ppw, 394 + f * 20));
    let run = 0;
    const allIn = ks.every((k: string) => tray[k]);
    kindsIn.forEach((k: string, r: number) => {
      const row = mlRow(k, tray[k], px0 + 10, 18 + r * (94 + f * 8), ppw - 20, 88 + f * 10, { tot: tray[k] * ML_V[k], k: "r", smax: 1 + f * 0.25 });
      out.push(row.el);
    });
    const tot = mlSum(tray), hide = allIn && !reveal && !warm;
    const tX = 340 + f * 840, tY = 414 - f * 304, tW = 300 - f * 14, tH = 64 + f * 16, tF = 36 + f * 4;
    out.push(<g key="tt" data-reveals={hide ? undefined : allIn ? "answer" : undefined}>{hide ? mlTag(tX, tY, tW, tH, ML_GRN, tx("Total") + " ?", tF, false) : mlTag(tX, tY, tW, tH, ML_GRN, kindsIn.length ? tx("Total") + " ₹" + tot : tx("Total"), tF)}</g>);
    void run;
  } else if (K === "pay" || K === "free") {
    const plain = free && S.plain, nr = Math.max(1, kindsIn.length), RH = wide ? Math.max(48, Math.min(84, Math.floor((TR_H - 16) / nr))) : Math.max(40, Math.min(66, Math.floor(224 / nr)));
    if (wide) {
      /* the full width: the shelf on the left (notes 170 x 90, coins 91), the tray on the right, the keys along the foot */
      ML_KINDS.forEach((id: string, i: number) => {
        const note = mlNote(id), lit = false;
        const px = note ? 8 + (i % 3) * 184 : 8 + (i - 6) * 113, py = note ? 8 + Math.floor(i / 3) * 102 : 214;
        const pw = note ? 170 : 91, ph = note ? 90 : 91;
        out.push(
          <g key={"sh" + id}>
            {mlPiece(id, px, py, note ? 1.25 : 1.2, { lit })}
            {invFor("put-" + id, px, py, pw, ph)}
            <Hit id={"put-" + id} x={px} y={py} w={pw} h={ph} label={lab(id)} onPress={() => tapPut(id)} />
          </g>);
      });
    } else shelf("put");
    out.push(panel(TR_X, TR_Y, TR_W, TR_H, exact));
    if (plain) {
      kindsIn.forEach((k: string, r: number) => out.push(<text key={"pl" + k} x={TR_X + 24} y={TR_Y + 50 + r * 44} fontSize={T.prompt} fontWeight={600} fill={C.ink}>{"₹" + ML_V[k] + " × " + tray[k] + " = ₹" + ML_V[k] * tray[k]}</text>));
    } else {
      kindsIn.forEach((k: string, r: number) => {
        const row = mlRow(k, tray[k], TR_X + 8, TR_Y + 8 + r * RH, TR_W - 16, RH, { tot: tray[k] * ML_V[k], k: "y", smax: wide ? 1.1 : 1 });
        out.push(<g key={"tr" + k}>{row.el}</g>);
      });
    }
    if (!kindsIn.length) out.push(<text key="et" x={TR_X + TR_W / 2} y={TR_Y + TR_H / 2 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{tx("Tray")}</text>);
    const tot = mlSum(tray);
    const bY = wide ? 450 : 446, bH = wide ? 64 : 64, pX = wide ? W - 308 : 600, kX = wide ? Math.round((W - 280) / 2) : 310;
    out.push(<g key="totg">{mlTag(8 * (wide ? 1 : 0), bY, 290, bH, ML_GRN, tx("Total") + " ₹" + tot, 36, exact || free)}</g>);
    if (K === "pay") {
      out.push(<g key="prg">{mlTag(pX, bY, 300, bH, ML_AMB, tx("Price") + " ₹" + price, 36)}</g>);
      /* the hint tag stands beside the Total, with room above and below for the Hindi and Gujarati marks */
      if (S.note && !reveal) out.push(<g key="nt">{wide ? mlTag(308, bY - 2, 270, bH + 4, ML_AMB, tx(S.note), 32) : mlTag(660, TR_Y, 230, 52, ML_AMB, tx(S.note), 32)}</g>);
      const wl = S.ways.concat(reveal && exact && S.ways.indexOf(mlSig(tray)) < 0 ? [mlSig(tray)] : []);
      wl.slice(-2).forEach((w: string, i: number) => {
        const m = mlParse(w); let plus = mlPlus(m);
        if (plus.length > 15) plus = ML_KINDS.filter((k: string) => m[k]).map((k: string) => (m[k] > 1 ? m[k] + "×" : "") + ML_V[k]).join("+");
        const num = wl.length - Math.min(2, wl.length) + i + 1;
        if (wide) {
          const txt = tx("Way") + " " + num + "  " + plus, cw = Math.max(250, Math.min(548, txt.length * 19 + 36)), cy = 318 + i * 62;
          out.push(<g key={"way" + i}>
            <rect x={8} y={cy} width={cw} height={56} rx={16} fill={tint(ML_GRN, 0.82)} stroke={ML_GRN} strokeWidth={3} />
            <text x={26} y={cy + 39} fontSize={T.label} fontWeight={700} fill={C.ink}>{txt}</text>
          </g>);
        } else {
          const cy = TR_Y + 64 + i * 98;
          out.push(<g key={"way" + i}>
            <rect x={660} y={cy} width={230} height={90} rx={16} fill={tint(ML_GRN, 0.82)} stroke={ML_GRN} strokeWidth={3} />
            <text x={676} y={cy + 30} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Way") + " " + num}</text>
            <text x={676} y={cy + 62} fontSize={T.micro} fontWeight={600} fill={C.ink}>{plus}</text>
          </g>);
        }
      });
    }
    out.push(
      <g key="payagain">
        {invFor("pay-again", kX, 444, 280, 72)}
        <Key id="pay-again" x={kX} y={444} w={280} h={72} C={C} tone="key" onClick={() => pressKey(payAgain)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Pay again")}</text>
        </Key>
        {free && <Key id="plain-list" x={wide ? kX + 300 : 600} y={444} w={wide ? 280 : 290} h={72} C={C} tone="key" onClick={() => pressKey(() => put({ plain: !SR.current.plain }))}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(S.plain ? "Picture" : "Plain list")}</text>
        </Key>}
      </g>);
  }

  /* the Count key (P2 Q3): one key, at the bottom centre, gone once the trays are counted */
  const countKey = (K === "trays" && S.counted < sc.a.n + sc.b.n && !warm) || (K === "pile" && warm) ? (
    <Key key="count" id="count" x={K === "trays" ? 888 / 2 + 6 - 130 + f * 139 : 320} y={436} w={260} h={72} C={C} tone="key" onClick={() => pressKey(doCount)}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Count")}</text>
    </Key>) : null;

  api.share({
    phase: n, tray: mlSig(tray), rows: kindsIn.length, price: price || null, ways: S.ways.length, plainList: !!S.plain,
    total: K === "pile" || K === "purse" ? (reveal ? mlSum(tray) : null) : K === "pay" || free ? mlSum(tray) : null,
    complete: stage === "idle",
  });

  const sceneT = K === "pair" ? fitScene(40, 96, 670, 266) : K === "pile" && !warm ? fitScene(0, 88, 892, 246) : null;
  return (
    <g>
      {sceneT ? <g transform={sceneT}>{out}</g> : out}
      {countKey}
      {countKey && invFor("count", K === "trays" ? 888 / 2 + 6 - 130 + f * 139 : 320, 436, 260, 72)}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  ML_SK = 0;
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const item = it || (result.last && result.last.item !== undefined ? PHASES[(result.phase || 1) - 1].items[result.last.item] : null) || {};
  let text = String(v);
  if (item.kind === "pay") text = "₹" + mlSum(mlParse(String(v).split("|")[0]));
  else if (item.kind === "order") text = "₹10 → ₹500";
  else if (item.choices) text = "";
  else if (/^\d+$/.test(text)) text = "₹" + text;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {item.choices
        ? <g>
            {mlPiece(item.sc.a, 12, h / 2 - 25, 0.7, {})}
            <text x={w / 2} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
            {mlPiece(item.sc.b, w - 12 - ML_CD * 0.7, h / 2 - (ML_CD * 0.7) / 2, 0.7, {})}
          </g>
        : <g>
            {mlPiece("c5", 14, h / 2 - 26, 0.68, { label: false })}
            <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{text}</text>
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
