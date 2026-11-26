/* ═══ M2.S4.T7.C33.2D1 · duration_track · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30): every line is printed on the bubble, which is
   the guide; the lesson is action-driven. THE NEW LOOK (keyOnly, navDots): the question lives only in the bubble.
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.

   The picture: a time track of the hours round two flags (sky blue a.m., amber p.m., a tall 12 noon post under a
   sun), a hopper that hops on to the next hour post, then whole hours (stopping at 12 noon when the flags are either
   side of it), then the minutes, each hop a green arc with its length in a chip under the track; a wall clock above
   follows the hopper. Phases 3 and 4 hop a duration card forward or back and plant the missing flag, and the child
   picks its half (a.m. / p.m.) on the working area (runtime gap: an item cannot hold parts AND choices). */

const TOOL_ID = "duration_track";
const MEDIA_ID = "M2.S4.T7.C33.2D1";
const TOOL_NAME = "Duration Track";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A track of the whole day, a start flag and an end flag. Where is the next hour?"];
const FINISH_LINE = "Durations counted on to the next hour, noon crossed with a stop, and end and start times found.";
/* free play offers exactly this: two flags, Hop, Add, New */
const FREE_LINE = "Free play. Hop from flag to flag, add the hops, then tap New for two more flags.";

/* ── the colours and the layout (Work coordinates; the working area is 1472 x 520 shut, 900 x 520 open) ── */
const DT = {
  hr: "#D55E00", min: "#0072B2", hop: "#009E73", wine: "#882255", ink: "#2B2B2B",
  skyBand: "#CFE8F8", amberBand: "#FCE2AE", sky: "#56B4E9", amber: "#E69F00",
  wood: "#8A5A34", face: "#FFFBF0", paper: "#FFFDF7", sun: "#F7B733",
};
const DT_L = { cx: 118, cy: 114, R: 112, bx: 262, rowA: 6, rowB: 132, flagY: 232, flagH: 88, TY: 372, TH: 56, chipY: 466, chipH: 52 };
const DT_PARTS = [{ label: "Hours" }, { label: "Minutes" }];
const DT_KEY: any = { hop: "Hop", hophrs: "Hop hours", hopmin: "Hop minutes", add: "Add", change: "Change", am: "a.m.", pm: "p.m.", new: "New" };

/* ── time helpers (t = minutes since midnight) ── */
const dtParse = (s: string) => {
  if (/noon/.test(s)) return 720;
  const r: any = /^(\d+):(\d\d) ([ap])\.m\.$/.exec(s);
  return ((Number(r[1]) % 12) + (r[3] === "p" ? 12 : 0)) * 60 + Number(r[2]);
};
const dtMins = (s: string) => {
  const h = /(\d+) h/.exec(s), m = /(\d+) min/.exec(s);
  return (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
};
const dtDay = (t: number) => ((t % 1440) + 1440) % 1440;
const dtH12 = (t: number) => (Math.floor(dtDay(t) / 60) % 12) || 12;
const dtClock = (t: number) => dtH12(t) + ":" + String(dtDay(t) % 60).padStart(2, "0");
const dtHalf = (t: number) => (dtDay(t) < 720 ? "a.m." : "p.m.");
const dtEst = (s: string, fs: number) => s.length * fs * 0.6;

/* one count: the hops (segs), the landings in order, the window of hours the track shows */
function dtQ(it: any) {
  const dir = it.kind === "back" ? -1 : 1;
  const s = dtParse(it.kind === "back" ? it.to : it.from);
  const d = it.kind === "dur" ? dtParse(it.to) - s : dtMins(it.d);
  const e = s + dir * d;
  const segs: any[] = [];
  if (it.kind === "dur") {
    let t = s;
    if (t % 60) { const nx = Math.min(e, t - (t % 60) + 60); segs.push({ a: t, b: nx, kind: "min", g: segs.length }); t = nx; }
    const lastH = e - (e % 60);
    if (t < 720 && lastH > 720) { segs.push({ a: t, b: 720, kind: "hrs", g: segs.length }); t = 720; }
    if (lastH > t) { segs.push({ a: t, b: lastH, kind: "hrs", g: segs.length }); t = lastH; }
    if (e > t) segs.push({ a: t, b: e, kind: "min", g: segs.length });
  } else {
    let t = s, g = 0;
    const dh = Math.floor(d / 60), dm = d % 60;
    if (dh) { segs.push({ a: t, b: t + dir * dh * 60, kind: "hrs", g }); t += dir * dh * 60; g++; }
    if (dm) {
      const end = t + dir * dm;
      const post = dir > 0 ? t - (t % 60) + 60 : (t % 60 ? t - (t % 60) : t - 60);
      if (dir > 0 ? post < end : post > end) { segs.push({ a: t, b: post, kind: "min", g }); segs.push({ a: post, b: end, kind: "min", g }); }
      else segs.push({ a: t, b: end, kind: "min", g });
    }
  }
  const lands: any[] = [];
  segs.forEach((sg: any, j: number) => {
    if (sg.kind === "hrs") { const k = Math.abs(sg.b - sg.a) / 60; for (let i = 1; i <= k; i++) lands.push({ t: sg.a + Math.sign(sg.b - sg.a) * 60 * i, seg: j, g: sg.g }); }
    else lands.push({ t: sg.b, seg: j, g: sg.g });
  });
  const lo = Math.floor(Math.min(s, e) / 60 - 0.4);
  let hi = Math.ceil(Math.max(s, e) / 60 + 0.4);
  if (hi - lo < 3) hi = lo + 3;
  return { dir, s, e, d, segs, lands, lo, hi, noon: it.kind === "dur" && s < 720 && e > 720, time: it.kind !== "dur" };
}

/* ── drawing helpers (called, never mounted) ── */
function dtClockArt(cx: number, cy: number, R: number, t: number, id: string) {
  const F = R * 0.7, mA = (dtDay(t) % 60) * 6, hA = (Math.floor(dtDay(t) / 60) % 12) * 30 + (dtDay(t) % 60) * 0.5;
  const pol = (r: number, deg: number) => { const a = ((deg - 90) * Math.PI) / 180; return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }; };
  const hand = (len: number, deg: number, col: string, sw: number) => {
    const p = pol(len, deg), q = pol(len * 0.18, deg + 180);
    return (
      <g>
        <line x1={q.x} y1={q.y} x2={p.x} y2={p.y} stroke={shade(col, 0.4)} strokeWidth={sw + 4} strokeLinecap="round" />
        <line x1={q.x} y1={q.y} x2={p.x} y2={p.y} stroke={col} strokeWidth={sw} strokeLinecap="round" />
      </g>
    );
  };
  return (
    <g pointerEvents="none">
      <defs>
        <clipPath id={id}><circle cx={cx} cy={cy} r={R} /></clipPath>
        <radialGradient id={id + "-rim"} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#A87343" />
          <stop offset="100%" stopColor="#5C3A1D" />
        </radialGradient>
        <radialGradient id={id + "-face"} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5EFE0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy + 4} r={R} fill="#000000" fillOpacity={0.15} />
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}-rim)`} stroke={DT.ink} strokeWidth={3.5} />
      <Skin name="wall_clock" x={cx - R} y={cy - R} w={2 * R} h={2 * R} clip={"url(#" + id + ")"} />
      <circle cx={cx} cy={cy} r={F} fill={`url(#${id}-face)`} fillOpacity={0.96} stroke={DT.ink} strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={F - 2} fill="none" stroke="#D1C3B0" strokeWidth={1} />
      {Array.from({ length: 60 }).map((_, i) => {
        const big = i % 5 === 0, a = pol(F - 3, i * 6), b = pol(F - (big ? 14 : 7), i * 6);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={DT.ink} strokeWidth={big ? 3.6 : 1.8} strokeLinecap="round" />;
      })}
      {hand(F * 0.52, hA, DT.hr, 8)}
      {hand(F * 0.8, mA, DT.min, 5)}
      {[12, 3, 6, 9].map((q) => {
        const p = pol(F - 30, q * 30), fs = Math.max(T.label, Math.round(R * 0.3));
        return <text key={q} x={p.x} y={p.y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={DT.ink} stroke="#FFFBF0" strokeWidth={7} strokeLinejoin="round" paintOrder="stroke">{q}</text>;
      })}
      <circle cx={cx} cy={cy} r={7.5} fill={shade(DT.hr, 0.3)} />
      <circle cx={cx} cy={cy} r={5} fill={DT.ink} />
      <circle cx={cx - 1.5} cy={cy - 1.5} r={1.5} fill="#FFFFFF" fillOpacity={0.7} />
    </g>
  );
}

function dtHopperArt(dir: number) {
  return (
    <g pointerEvents="none">
      <ellipse cx={0} cy={16} rx={22} ry={6} fill="#000000" fillOpacity={0.2} />
      <ellipse cx={0} cy={4} rx={23} ry={18} fill="#5CBD62" stroke={DT.ink} strokeWidth={3} />
      <ellipse cx={-3 * dir} cy={-4} rx={14} ry={8} fill="#82E288" fillOpacity={0.6} />
      <ellipse cx={-4 * dir} cy={10} rx={12} ry={6} fill="#D4F5CC" />
      <circle cx={9 * dir} cy={-11} r={9} fill="#FFFFFF" stroke={DT.ink} strokeWidth={2.5} />
      <circle cx={11.5 * dir} cy={-11} r={4} fill={DT.ink} />
      <circle cx={10.5 * dir} cy={-13} r={1.2} fill="#FFFFFF" />
      <path d={`M ${-14 * dir} 18 Q ${-20 * dir} 22 ${-24 * dir} 23`} stroke={DT.ink} strokeWidth={4.5} strokeLinecap="round" />
      <path d={`M ${-14 * dir} 18 Q ${-20 * dir} 22 ${-24 * dir} 23`} stroke="#408845" strokeWidth={2.5} strokeLinecap="round" />
      <path d={`M ${10 * dir} 19 Q ${14 * dir} 23 ${16 * dir} 24`} stroke={DT.ink} strokeWidth={4.5} strokeLinecap="round" />
      <path d={`M ${10 * dir} 19 Q ${14 * dir} 23 ${16 * dir} 24`} stroke="#408845" strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

function dtSun(x: number, y: number, r: number, lit: boolean) {
  return (
    <g pointerEvents="none">
      {lit && (
        <g>
          <circle cx={x} cy={y} r={r + 9} fill="#FFE38A" fillOpacity={0.5} />
          <circle cx={x} cy={y} r={r + 5} fill="#FFD54F" fillOpacity={0.6} />
        </g>
      )}
      <circle cx={x} cy={y} r={r * 0.75} fill={DT.sun} stroke={shade(DT.sun, 0.35)} strokeWidth={2.5} />
      <Skin name="sun" x={x - r} y={y - r} w={2 * r} h={2 * r} />
    </g>
  );
}

/* a flag: a near-black pole from its pennant down to the track; the pennant writes the time on two lines (digits, then
   the half), so a long Hindi or Gujarati half never widens it; `t` null = not known yet ("?"), `half` the picked one */
function dtFlag(px: number, t: any, o: any) {
  const { flagY, flagH, TY } = DT_L;
  const fs = 32, gk = o.lang === "gu" ? 1.2 : 1, top = t === null ? "?" : t === 720 && o.noon ? "12" : dtClock(t);
  const bot = t === null ? (o.half ? o.tx(o.half) : "") : t === 720 && o.noon ? o.tx("noon") : o.tx(dtHalf(t));
  const pw = Math.max(118, dtEst(top, fs) + 30, o.halfW || 0);
  const ph = flagH;
  const x = Math.max(6, Math.min(o.W - 6 - pw, px - pw / 2));
  const y = flagY;
  const fill = t === null ? "#FFFFFF" : dtDay(t) < 720 ? DT.skyBand : DT.amberBand;
  const accentCol = t === null ? "#9AA4AC" : dtDay(t) < 720 ? DT.sky : DT.amber;
  return (
    <g pointerEvents="none" opacity={o.pale ? 0.5 : 1}>
      <line x1={px + 2} y1={y + ph} x2={px + 2} y2={TY} stroke="#000000" strokeOpacity={0.15} strokeWidth={5} />
      <line x1={px} y1={y + ph} x2={px} y2={TY} stroke={DT.ink} strokeWidth={4} strokeDasharray={o.pale ? "8 7" : undefined} />
      <circle cx={px} cy={y + ph + 2} r={5} fill={DT.ink} />
      <rect x={x} y={y + 3} width={pw} height={ph} rx={14} fill="#000000" fillOpacity={0.12} />
      <rect x={x} y={y} width={pw} height={ph} rx={14} fill={fill} stroke={DT.ink} strokeWidth={3} strokeDasharray={t === null || o.pale ? "9 7" : undefined} />
      <path d={`M ${x + 14} ${y} L ${x + pw - 14} ${y} A 14 14 0 0 1 ${x + pw} ${y + 14} L ${x + pw} ${y + 18} L ${x} ${y + 18} L ${x} ${y + 14} A 14 14 0 0 1 ${x + 14} ${y}`} fill={shade(accentCol, 0.15)} opacity={0.6} />
      <text x={x + pw / 2} y={y + (bot === "" ? 56 : 36)} textAnchor="middle" fontSize={fs} fontWeight={700} fill={DT.ink}>{top}</text>
      {o.sun && dtSun(x + pw - 6, y + 4, 16, true)}
      {bot !== "" && <text x={x + pw / 2} y={y + (o.lang === "en" ? 72 : 74)} textAnchor="middle" fontSize={Math.round(T.micro * gk)} fontWeight={700} fill={shade(DT.ink, 0.25)}>{bot}</text>}
    </g>
  );
}

/* THE START PAGE: the wall clock and a stretch of the day's track with two flags, the hopper and the noon sun */
const START_HOOK = "How long from the start flag to the end flag?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const TY = 236, x0 = 360, x1 = box.w - 40, lo = 9, hi = 15, sp = (x1 - x0) / (hi - lo);
  const xo = (t: number) => x0 + (t / 60 - lo) * sp;
  const lands = [600, 660, 720, 780, 800];
  return (
    <g>
      {dtClockArt(170, 170, 160, 580, "dt-start")}
      <rect x={xo(540)} y={TY} width={xo(720) - xo(540)} height={44} fill={DT.skyBand} stroke={DT.ink} strokeWidth={3} />
      <rect x={xo(720)} y={TY} width={xo(900) - xo(720)} height={44} fill={DT.amberBand} stroke={DT.ink} strokeWidth={3} />
      {Array.from({ length: hi - lo + 1 }).map((_, i) => (
        <g key={i}>
          <line x1={x0 + i * sp} y1={TY - 8} x2={x0 + i * sp} y2={TY + 52} stroke={DT.ink} strokeWidth={3} />
          <text x={x0 + i * sp} y={TY + 86} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={DT.ink}>{dtH12((lo + i) * 60)}</text>
        </g>
      ))}
      <line x1={xo(720)} y1={TY - 100} x2={xo(720)} y2={TY + 52} stroke={DT.ink} strokeWidth={6} />
      {dtSun(xo(720), TY - 132, 34, true)}
      {lands.map((t, i) => {
        const a = xo(i ? lands[i - 1] : 580), b = xo(t), P = Math.min(46, Math.abs(b - a) * 0.6 + 8);
        return <path key={i} d={`M ${a} ${TY} Q ${(a + b) / 2} ${TY - 2 * P} ${b} ${TY}`} fill="none" stroke={DT.hop} strokeWidth={5} />;
      })}
      {[580, 800].map((t) => (
        <g key={t}>
          <line x1={xo(t)} y1={TY - 120} x2={xo(t)} y2={TY} stroke={DT.ink} strokeWidth={4} />
          <path d={`M ${xo(t)} ${TY - 120} l 62 18 l -62 18 Z`} fill={t < 720 ? DT.sky : DT.amber} stroke={DT.ink} strokeWidth={3} />
        </g>
      ))}
      <g transform={`translate(${xo(580)},${TY - 22})`}>{dtHopperArt(1)}</g>
    </g>
  );
}

/* the 60-minute rung (owner, 2026-11-16): a pair no question uses (55 + 18); no-break spaces keep each sum on one line.
   It is rung 3 only where the question's minutes pass 60 (phase 3); a typed minutes box of 60 or more brings it at once. */
const DT_R60 = "60 minutes make 1 hour, so 55 + 18 = 73 minutes = 1 hour 13 minutes.";
/* phase 4 (counting back): the same rule the other way, a pair no phase 4 question or warm-up uses; it replaces DT_R60 only on
   the typed-60 branch (the default rung 3 stays the half rung, ML4's misconception) */
const DT_B60 = "Take 1 hour as 60 minutes: 12 + 60 = 72, and 72 − 30 = 42 minutes.";
/* phase 2: no question's minutes pass 60, so rung 3 is a plain step of that question */
const DT_P2_STEP = [
  "Add the hours 2 + 3, then add the minutes 10 + 25.",
  "Put 3 hours with 6 hours, and 15 minutes with 30 minutes.",
  "Before noon is 40 minutes, after it is 2 hours 5 minutes, so add them.",
];

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final */
const TR: any = {
  hi: {
    [DT_R60]: "1 घंटे में 60 मिनट होते हैं, तो 55 + 18 = 73 मिनट = 1 घंटा 13 मिनट।",
    [DT_B60]: "1 घंटे को 60 मिनट मानो: 12 + 60 = 72, और 72 − 30 = 42 मिनट।",
    [DT_P2_STEP[0]]: "घंटे 2 + 3 जोड़ो, फिर मिनट 10 + 25 जोड़ो।",
    [DT_P2_STEP[1]]: "3 घंटे को 6 घंटे से, और 15 मिनट को 30 मिनट से मिलाओ।",
    [DT_P2_STEP[2]]: "दोपहर से पहले 40 मिनट, बाद में 2 घंटे 5 मिनट हैं, इन्हें जोड़ो।",
    "Now type the time again.": "अब समय फिर से लिखो।",
    "Before 12 noon the time is a.m., and after 12 noon it is p.m.": "दोपहर 12 बजे से पहले पूर्वाह्न, और बाद में अपराह्न होता है।",
    "Sky blue is the morning half, and amber comes after 12 noon.": "आसमानी भाग सुबह का है, और नारंगी दोपहर 12 बजे के बाद आता है।",
    "The digits are right, so look at the colour under the new flag.": "अंक सही हैं, अब नए झंडे के नीचे का रंग देखो।",
    "Duration Track": "अवधि की पट्टी",
    "Free play. Hop from flag to flag, add the hops, then tap New for two more flags.": "खुला खेल। झंडे से झंडे तक कूदो, छलाँगें जोड़ो, फिर दो नए झंडों के लिए नया दबाओ।",
    "How long from the start flag to the end flag?": "शुरू के झंडे से अंत के झंडे तक कितना समय?",
    "Counting on to the next hour": "अगले घंटे तक आगे गिनना",
    "Tap Hop to hop on to the next hour post.": "अगले घंटे के खंभे तक जाने के लिए कूदो दबाओ।",
    "Tap the Hop key.": "कूदो बटन दबाओ।",
    "Tap Hop again to hop the whole hours.": "पूरे घंटे कूदने के लिए फिर कूदो दबाओ।",
    "Tap Hop once more.": "एक बार और कूदो दबाओ।",
    "Tap Hop to land on the end flag.": "अंत के झंडे पर पहुँचने के लिए कूदो दबाओ।",
    "The Hop key moves the hopper.": "कूदो बटन मेंढक को आगे ले जाता है।",
    "Tap Add to add the hops in the total bar.": "कुल पट्टी में छलाँगें जोड़ने के लिए जोड़ो दबाओ।",
    "Tap the Add key.": "जोड़ो बटन दबाओ।",
    "Add all the hours, then add all the minutes.": "पहले सारे घंटे जोड़ो, फिर सारे मिनट।",
    "An hour has 60 minutes, not 100, so check the minutes.": "एक घंटे में 60 मिनट होते हैं, 100 नहीं, तो मिनट जाँचो।",
    "Count on to the next hour, then the whole hours, then the minutes, and add.": "अगले घंटे तक, फिर पूरे घंटे, फिर मिनट गिनो और जोड़ो।",
    "You learned: small hops to an hour post make a duration easy to add.": "तुमने सीखा: घंटे के खंभे तक छोटी छलाँगों से अवधि जोड़ना आसान है।",
    "A train runs from 6:48 a.m., arriving at 9:05 a.m., so how long is the journey?": "रेलगाड़ी पूर्वाह्न 6:48 से 9:05 तक चलती है, यात्रा कितनी देर की है?",
    "6:48 to 9:05?": "6:48 से 9:05?",
    "How many minutes is it from 6:48 to 7 o'clock?": "6:48 से 7 बजे तक कितने मिनट हैं?",
    "Hours": "घंटे",
    "Minutes": "मिनट",
    "How long is it from 7:25 p.m., to 8:15 p.m.; type 0 hours if there are none.": "अपराह्न 7:25 से 8:15 तक कितना समय है; घंटे न हों तो 0 लिखो।",
    "7:25 to 8:15? Type 0 if none.": "7:25 से 8:15? घंटे न हों तो 0।",
    "From 7:25, how far is the 8 o'clock post?": "7:25 से 8 बजे का खंभा कितनी दूर है?",
    "A museum visit begins at 2:40 p.m., and ends at 4:05 p.m., so how long is it?": "संग्रहालय की सैर अपराह्न 2:40 से 4:05 तक है, वह कितनी देर की है?",
    "2:40 to 4:05?": "2:40 से 4:05?",
    "Add the minute hops and the hour hop together.": "मिनट की छलाँगें और घंटे की छलाँग साथ जोड़ो।",
    "Across twelve noon": "दोपहर 12 बजे के पार",
    "Tap Hop, and the hopper stops at 12 noon.": "कूदो दबाओ, मेंढक दोपहर 12 बजे रुक जाता है।",
    "Tap the Hop key to start.": "शुरू करने के लिए कूदो बटन दबाओ।",
    "Tap Hop again to go on to the end flag.": "अंत के झंडे तक जाने के लिए फिर कूदो दबाओ।",
    "Hop once more, past noon.": "दोपहर के पार एक बार और कूदो।",
    "Tap Add to put the two parts together.": "दोनों भाग जोड़ने के लिए जोड़ो दबाओ।",
    "Now tap the Add key.": "अब जोड़ो बटन दबाओ।",
    "The two green boxes hold the two parts, so add them.": "दो हरे डिब्बों में दो भाग हैं, उन्हें जोड़ो।",
    "Across noon, count on to 12 noon, then on, and add the two parts.": "दोपहर के पार, 12 बजे तक गिनो, फिर आगे, और दोनों भाग जोड़ो।",
    "You learned: 12 noon is a stop, and the two parts add to the time.": "तुमने सीखा: दोपहर 12 बजे पड़ाव है, दोनों भाग जुड़कर समय बनता है।",
    "A stall is open from 9:50 a.m., until 3:25 p.m., so how long is that?": "बाज़ार का ठेला पूर्वाह्न 9:50 से अपराह्न 3:25 तक खुला है, कितना समय?",
    "9:50 to 3:25?": "9:50 से 3:25?",
    "How long is it from 9:50 to 12 noon?": "9:50 से दोपहर 12 बजे तक कितना समय है?",
    "Find the time a shop stays open, from 8:45 a.m., till it shuts at 6:30 p.m.": "दुकान पूर्वाह्न 8:45 से अपराह्न 6:30 तक खुली रहती है, कुल कितनी देर?",
    "8:45 to 6:30?": "8:45 से 6:30?",
    "Add the part before noon to the part after it.": "दोपहर से पहले वाला भाग बाद वाले भाग में जोड़ो।",
    "How much time does a picnic take, from 11:20 a.m., up to 2:05 p.m.?": "पिकनिक पूर्वाह्न 11:20 से अपराह्न 2:05 तक कितनी देर चलती है?",
    "11:20 to 2:05?": "11:20 से 2:05?",
    "Did you count the part before 12 noon too?": "क्या तुमने दोपहर 12 बजे से पहले वाला भाग भी गिना?",
    "From a start and a duration": "शुरू के समय और अवधि से",
    "Tap Hop hours to hop the 2 hours first.": "पहले 2 घंटे कूदने के लिए घंटे कूदो दबाओ।",
    "Tap the Hop hours key.": "घंटे कूदो बटन दबाओ।",
    "Tap Hop minutes to hop the 50 minutes.": "50 मिनट कूदने के लिए मिनट कूदो दबाओ।",
    "Now tap Hop minutes.": "अब मिनट कूदो दबाओ।",
    "Tap p.m., because the end flag stands after 12 noon.": "अपराह्न दबाओ, क्योंकि अंत का झंडा दोपहर 12 बजे के बाद है।",
    "Is the track amber under the flag?": "क्या झंडे के नीचे पट्टी नारंगी है?",
    "The hour post on the hopper's left gives the hour.": "मेंढक के बाईं ओर का खंभा घंटा बताता है।",
    "Hop the hours, then the minutes, and the colour where you land gives the half.": "घंटे कूदो, फिर मिनट, जहाँ पहुँचो वहाँ का रंग भाग बताता है।",
    "You learned: a start time and a duration give the end time.": "तुमने सीखा: शुरू का समय और अवधि मिलकर अंत का समय देते हैं।",
    "A bus trip of 3 hours 35 minutes starts at 10:50 a.m., so when does it end?": "3 घंटे 35 मिनट की बस यात्रा पूर्वाह्न 10:50 पर शुरू हो, तो कब खत्म होगी?",
    "10:50 + 3 h 35?": "10:50 + 3 घंटे 35?",
    "The minute hop crossed an hour post, so read the hour after it.": "मिनट की छलाँग घंटे का खंभा पार कर गई, तो उसके बाद का घंटा पढ़ो।",
    "When does a game end if it starts at 3:35 p.m., and lasts 1 hour 40 minutes?": "खेल अपराह्न 3:35 पर शुरू होकर 1 घंटा 40 मिनट चले, तो कब खत्म होगा?",
    "3:35 + 1 h 40?": "3:35 + 1 घंटा 40?",
    "Where did the hours land, before the minutes hopped on?": "मिनट कूदने से पहले घंटे कहाँ पहुँचे?",
    "When is a school trip back if it leaves at 9:25 a.m., for 4 hours 50 minutes?": "स्कूल की सैर पूर्वाह्न 9:25 पर 4 घंटे 50 मिनट के लिए जाए, तो कब लौटेगी?",
    "9:25 + 4 h 50?": "9:25 + 4 घंटे 50?",
    "Is the end flag before 12 noon or after it?": "अंत का झंडा दोपहर 12 बजे से पहले है या बाद में?",
    "Counting back": "पीछे गिनना",
    "Tap Hop hours to hop back 1 hour.": "1 घंटा पीछे कूदने के लिए घंटे कूदो दबाओ।",
    "Tap Hop minutes to hop back 25 minutes.": "25 मिनट पीछे कूदने के लिए मिनट कूदो दबाओ।",
    "Tap p.m., because the start flag is still after 12 noon.": "अपराह्न दबाओ, क्योंकि शुरू का झंडा अब भी दोपहर 12 बजे के बाद है।",
    "Read the hour from the post on the hopper's left.": "घंटा मेंढक के बाईं ओर के खंभे से पढ़ो।",
    "Read the clock above, then check which half the start flag is in.": "ऊपर घड़ी पढ़ो, फिर देखो शुरू का झंडा किस भाग में है।",
    "Hop back the hours, then the minutes, and before noon the time is a.m.": "घंटे पीछे कूदो, फिर मिनट, दोपहर से पहले समय पूर्वाह्न होता है।",
    "You learned: counting back from an end time gives the start time.": "तुमने सीखा: अंत के समय से पीछे गिनकर शुरू का समय मिलता है।",
    "What time was it 2 hours 50 minutes before 1:05 p.m.?": "अपराह्न 1:05 से 2 घंटे 50 मिनट पहले क्या समय था?",
    "1:05 back 2 h 50?": "1:05 पीछे 2 घंटे 50?",
    "The hopper went back past 12 noon, so which half is it in now?": "मेंढक दोपहर 12 बजे के पार पीछे गया, तो अब वह किस भाग में है?",
    "Which time comes 45 minutes before 7:20 a.m.?": "पूर्वाह्न 7:20 से 45 मिनट पहले कौन-सा समय आता है?",
    "7:20 back 45 min?": "7:20 पीछे 45 मिनट?",
    "Hop back to the 7 o'clock post first, then on.": "पहले 7 बजे के खंभे तक पीछे कूदो, फिर और पीछे।",
    "What was the time 170 minutes before noon?": "दोपहर 12 बजे से 170 मिनट पहले क्या समय था?",
    "170 min before noon?": "दोपहर से 170 मिनट पहले?",
    "Count back from the 12 noon post, not forward.": "दोपहर 12 बजे के खंभे से पीछे गिनो, आगे नहीं।",
    "Now tap one of the two half keys for the new flag.": "अब नए झंडे के लिए पूर्वाह्न या अपराह्न में से एक दबाओ।",
    "Now type the hours and the minutes.": "अब घंटे और मिनट लिखो।",
    "Tap one of the two half keys too.": "पूर्वाह्न या अपराह्न भी दबाओ।",
    "Yes, the hops add up to 2 hours 17 minutes.": "हाँ, छलाँगें मिलकर 2 घंटे 17 मिनट बनती हैं।",
    "Yes, 35 and 15 minutes make 50 minutes.": "हाँ, 35 और 15 मिनट मिलकर 50 मिनट होते हैं।",
    "Yes, 1 hour 25 minutes in all.": "हाँ, कुल 1 घंटा 25 मिनट।",
    "Yes, both parts make 5 hours 35 minutes.": "हाँ, दोनों भाग मिलकर 5 घंटे 35 मिनट।",
    "Yes, the shop is open 9 hours 45 minutes.": "हाँ, दुकान 9 घंटे 45 मिनट खुली रहती है।",
    "Yes, the picnic takes 2 hours 45 minutes.": "हाँ, पिकनिक 2 घंटे 45 मिनट चलती है।",
    "Yes, the bus trip ends at 2:25 p.m.": "हाँ, बस यात्रा अपराह्न 2:25 पर खत्म होती है।",
    "Yes, the game ends at 5:15 p.m.": "हाँ, खेल अपराह्न 5:15 पर खत्म होता है।",
    "Yes, the school trip is back at 2:15 p.m.": "हाँ, स्कूल की सैर अपराह्न 2:15 पर लौटती है।",
    "Yes, back past 12 noon it is 10:15 a.m.": "हाँ, दोपहर 12 के पार पीछे जाकर पूर्वाह्न 10:15 होता है।",
    "Yes, 45 minutes back from 7:20 gives 6:35 a.m.": "हाँ, 7:20 से 45 मिनट पीछे पूर्वाह्न 6:35 है।",
    "Yes, 170 minutes before noon is 9:10 a.m.": "हाँ, दोपहर से 170 मिनट पहले पूर्वाह्न 9:10 था।",
    "h": "घंटे",
    "min": "मिनट",
    "noon": "दोपहर",
    "a.m.": "पूर्वाह्न",
    "p.m.": "अपराह्न",
    "before noon": "दोपहर से पहले",
    "after noon": "दोपहर के बाद",
    "Total": "कुल",
    "Hop": "कूदो",
    "Hop hours": "घंटे कूदो",
    "Hop minutes": "मिनट कूदो",
    "Add": "जोड़ो",
    "Change": "बदलो",
    "New": "नया",
  },
  gu: {
    [DT_R60]: "60 મિનિટ = 1 કલાક, તો 55 + 18 = 73 મિનિટ = 1 કલાક 13 મિનિટ.",
    [DT_B60]: "1 કલાકને 60 મિનિટ ગણો: 12 + 60 = 72, અને 72 − 30 = 42 મિનિટ.",
    [DT_P2_STEP[0]]: "કલાક 2 + 3 ઉમેરો, પછી મિનિટ 10 + 25 ઉમેરો.",
    [DT_P2_STEP[1]]: "3 કલાકને 6 કલાક સાથે, અને 15 મિનિટને 30 મિનિટ સાથે મેળવો.",
    [DT_P2_STEP[2]]: "બપોર પહેલાં 40 મિનિટ, પછી 2 કલાક 5 મિનિટ છે, તેમને ઉમેરો.",
    "Now type the time again.": "હવે સમય ફરીથી લખો.",
    "Before 12 noon the time is a.m., and after 12 noon it is p.m.": "બપોરના 12 પહેલાં પૂર્વાહ્ન, અને પછી અપરાહ્ન હોય છે.",
    "Sky blue is the morning half, and amber comes after 12 noon.": "આસમાની ભાગ સવારનો છે, અને નારંગી બપોરના 12 પછી આવે છે.",
    "The digits are right, so look at the colour under the new flag.": "અંક સાચા છે, હવે નવા ઝંડા નીચેનો રંગ જુઓ.",
    "Duration Track": "સમયગાળાની પટ્ટી",
    "Free play. Hop from flag to flag, add the hops, then tap New for two more flags.": "મુક્ત રમત. ઝંડાથી ઝંડા સુધી કૂદો, કૂદકા ઉમેરો, પછી બે નવા ઝંડા માટે નવું દબાવો.",
    "How long from the start flag to the end flag?": "શરૂઆતના ઝંડાથી અંતના ઝંડા સુધી કેટલો સમય?",
    "Counting on to the next hour": "પછીના કલાક સુધી આગળ ગણવું",
    "Tap Hop to hop on to the next hour post.": "પછીના કલાકના થાંભલા સુધી જવા કૂદો દબાવો.",
    "Tap the Hop key.": "કૂદો બટન દબાવો.",
    "Tap Hop again to hop the whole hours.": "આખા કલાક કૂદવા ફરી કૂદો દબાવો.",
    "Tap Hop once more.": "એક વાર વધુ કૂદો દબાવો.",
    "Tap Hop to land on the end flag.": "અંતના ઝંડા પર પહોંચવા કૂદો દબાવો.",
    "The Hop key moves the hopper.": "કૂદો બટન દેડકાને આગળ લઈ જાય છે.",
    "Tap Add to add the hops in the total bar.": "કુલ પટ્ટીમાં કૂદકા ઉમેરવા ઉમેરો દબાવો.",
    "Tap the Add key.": "ઉમેરો બટન દબાવો.",
    "Add all the hours, then add all the minutes.": "પહેલાં બધા કલાક ઉમેરો, પછી બધી મિનિટ.",
    "An hour has 60 minutes, not 100, so check the minutes.": "એક કલાકમાં 60 મિનિટ હોય, 100 નહીં, તો મિનિટ તપાસો.",
    "Count on to the next hour, then the whole hours, then the minutes, and add.": "પછીના કલાક સુધી, પછી આખા કલાક, પછી મિનિટ ગણો અને ઉમેરો.",
    "You learned: small hops to an hour post make a duration easy to add.": "તમે શીખ્યા: કલાકના થાંભલા સુધીના નાના કૂદકાથી સમયગાળો ઉમેરવો સહેલો છે.",
    "A train runs from 6:48 a.m., arriving at 9:05 a.m., so how long is the journey?": "ટ્રેન પૂર્વાહ્ન 6:48 થી 9:05 સુધી ચાલે છે, મુસાફરી કેટલા સમયની છે?",
    "6:48 to 9:05?": "6:48 થી 9:05?",
    "How many minutes is it from 6:48 to 7 o'clock?": "6:48 થી 7 વાગ્યા સુધી કેટલી મિનિટ છે?",
    "Hours": "કલાક",
    "Minutes": "મિનિટ",
    "How long is it from 7:25 p.m., to 8:15 p.m.; type 0 hours if there are none.": "અપરાહ્ન 7:25 થી 8:15 સુધી કેટલો સમય છે; કલાક ન હોય તો 0 લખો.",
    "7:25 to 8:15? Type 0 if none.": "7:25 થી 8:15? કલાક ન હોય તો 0.",
    "From 7:25, how far is the 8 o'clock post?": "7:25 થી 8 વાગ્યાનો થાંભલો કેટલો દૂર છે?",
    "A museum visit begins at 2:40 p.m., and ends at 4:05 p.m., so how long is it?": "સંગ્રહાલયની મુલાકાત અપરાહ્ન 2:40 થી 4:05 સુધી છે, તે કેટલા સમયની છે?",
    "2:40 to 4:05?": "2:40 થી 4:05?",
    "Add the minute hops and the hour hop together.": "મિનિટના કૂદકા અને કલાકનો કૂદકો સાથે ઉમેરો.",
    "Across twelve noon": "બપોરના 12 ની પાર",
    "Tap Hop, and the hopper stops at 12 noon.": "કૂદો દબાવો, દેડકો બપોરના 12 વાગ્યે અટકે છે.",
    "Tap the Hop key to start.": "શરૂ કરવા કૂદો બટન દબાવો.",
    "Tap Hop again to go on to the end flag.": "અંતના ઝંડા સુધી જવા ફરી કૂદો દબાવો.",
    "Hop once more, past noon.": "બપોર પછી એક વાર વધુ કૂદો.",
    "Tap Add to put the two parts together.": "બંને ભાગ ઉમેરવા ઉમેરો દબાવો.",
    "Now tap the Add key.": "હવે ઉમેરો બટન દબાવો.",
    "The two green boxes hold the two parts, so add them.": "બે લીલા ખાનામાં બે ભાગ છે, તેમને ઉમેરો.",
    "Across noon, count on to 12 noon, then on, and add the two parts.": "બપોરની પાર, 12 સુધી ગણો, પછી આગળ, અને બંને ભાગ ઉમેરો.",
    "You learned: 12 noon is a stop, and the two parts add to the time.": "તમે શીખ્યા: બપોરના 12 પડાવ છે, બંને ભાગ મળીને સમય બને છે.",
    "A stall is open from 9:50 a.m., until 3:25 p.m., so how long is that?": "બજારની લારી પૂર્વાહ્ન 9:50 થી અપરાહ્ન 3:25 સુધી ખુલ્લી છે, કેટલો સમય?",
    "9:50 to 3:25?": "9:50 થી 3:25?",
    "How long is it from 9:50 to 12 noon?": "9:50 થી બપોરના 12 સુધી કેટલો સમય છે?",
    "Find the time a shop stays open, from 8:45 a.m., till it shuts at 6:30 p.m.": "દુકાન પૂર્વાહ્ન 8:45 થી અપરાહ્ન 6:30 સુધી ખુલ્લી રહે છે, કુલ કેટલો સમય?",
    "8:45 to 6:30?": "8:45 થી 6:30?",
    "Add the part before noon to the part after it.": "બપોર પહેલાંનો ભાગ બપોર પછીના ભાગમાં ઉમેરો.",
    "How much time does a picnic take, from 11:20 a.m., up to 2:05 p.m.?": "પિકનિક પૂર્વાહ્ન 11:20 થી અપરાહ્ન 2:05 સુધી કેટલો સમય ચાલે છે?",
    "11:20 to 2:05?": "11:20 થી 2:05?",
    "Did you count the part before 12 noon too?": "શું તમે બપોરના 12 પહેલાંનો ભાગ પણ ગણ્યો?",
    "From a start and a duration": "શરૂઆતના સમય અને સમયગાળા પરથી",
    "Tap Hop hours to hop the 2 hours first.": "પહેલાં 2 કલાક કૂદવા કલાક કૂદો દબાવો.",
    "Tap the Hop hours key.": "કલાક કૂદો બટન દબાવો.",
    "Tap Hop minutes to hop the 50 minutes.": "50 મિનિટ કૂદવા મિનિટ કૂદો દબાવો.",
    "Now tap Hop minutes.": "હવે મિનિટ કૂદો દબાવો.",
    "Tap p.m., because the end flag stands after 12 noon.": "અપરાહ્ન દબાવો, કારણ કે અંતનો ઝંડો બપોરના 12 પછી છે.",
    "Is the track amber under the flag?": "શું ઝંડા નીચે પટ્ટી નારંગી છે?",
    "The hour post on the hopper's left gives the hour.": "દેડકાની ડાબી બાજુનો થાંભલો કલાક બતાવે છે.",
    "Hop the hours, then the minutes, and the colour where you land gives the half.": "કલાક કૂદો, પછી મિનિટ, જ્યાં પહોંચો ત્યાંનો રંગ ભાગ બતાવે છે.",
    "You learned: a start time and a duration give the end time.": "તમે શીખ્યા: શરૂઆતનો સમય અને સમયગાળો મળીને અંતનો સમય આપે છે.",
    "A bus trip of 3 hours 35 minutes starts at 10:50 a.m., so when does it end?": "3 કલાક 35 મિનિટની બસ યાત્રા પૂર્વાહ્ન 10:50 એ શરૂ થાય, તો ક્યારે પૂરી થશે?",
    "10:50 + 3 h 35?": "10:50 + 3 કલાક 35?",
    "The minute hop crossed an hour post, so read the hour after it.": "મિનિટનો કૂદકો કલાકનો થાંભલો ઓળંગી ગયો, તો પછીનો કલાક વાંચો.",
    "When does a game end if it starts at 3:35 p.m., and lasts 1 hour 40 minutes?": "રમત અપરાહ્ન 3:35 એ શરૂ થઈ 1 કલાક 40 મિનિટ ચાલે, તો ક્યારે પૂરી થશે?",
    "3:35 + 1 h 40?": "3:35 + 1 કલાક 40?",
    "Where did the hours land, before the minutes hopped on?": "મિનિટ કૂદતાં પહેલાં કલાક ક્યાં પહોંચ્યા?",
    "When is a school trip back if it leaves at 9:25 a.m., for 4 hours 50 minutes?": "શાળાનો પ્રવાસ પૂર્વાહ્ન 9:25 એ 4 કલાક 50 મિનિટ માટે જાય, તો ક્યારે પાછો આવશે?",
    "9:25 + 4 h 50?": "9:25 + 4 કલાક 50?",
    "Is the end flag before 12 noon or after it?": "અંતનો ઝંડો બપોરના 12 પહેલાં છે કે પછી?",
    "Counting back": "પાછળ ગણવું",
    "Tap Hop hours to hop back 1 hour.": "1 કલાક પાછળ કૂદવા કલાક કૂદો દબાવો.",
    "Tap Hop minutes to hop back 25 minutes.": "25 મિનિટ પાછળ કૂદવા મિનિટ કૂદો દબાવો.",
    "Tap p.m., because the start flag is still after 12 noon.": "અપરાહ્ન દબાવો, કારણ કે શરૂઆતનો ઝંડો હજી બપોરના 12 પછી છે.",
    "Read the hour from the post on the hopper's left.": "કલાક દેડકાની ડાબી બાજુના થાંભલા પરથી વાંચો.",
    "Read the clock above, then check which half the start flag is in.": "ઉપર ઘડિયાળ વાંચો, પછી જુઓ શરૂઆતનો ઝંડો કયા ભાગમાં છે.",
    "Hop back the hours, then the minutes, and before noon the time is a.m.": "કલાક પાછળ કૂદો, પછી મિનિટ, બપોર પહેલાં સમય પૂર્વાહ્ન હોય છે.",
    "You learned: counting back from an end time gives the start time.": "તમે શીખ્યા: અંતના સમયથી પાછળ ગણીને શરૂઆતનો સમય મળે છે.",
    "What time was it 2 hours 50 minutes before 1:05 p.m.?": "અપરાહ્ન 1:05 થી 2 કલાક 50 મિનિટ પહેલાં કેટલા વાગ્યા હતા?",
    "1:05 back 2 h 50?": "1:05 પાછળ 2 કલાક 50?",
    "The hopper went back past 12 noon, so which half is it in now?": "દેડકો બપોરના 12 ની પાર પાછળ ગયો, તો હવે તે કયા ભાગમાં છે?",
    "Which time comes 45 minutes before 7:20 a.m.?": "પૂર્વાહ્ન 7:20 થી 45 મિનિટ પહેલાં કયો સમય આવે છે?",
    "7:20 back 45 min?": "7:20 પાછળ 45 મિનિટ?",
    "Hop back to the 7 o'clock post first, then on.": "પહેલાં 7 વાગ્યાના થાંભલા સુધી પાછળ કૂદો, પછી વધુ પાછળ.",
    "What was the time 170 minutes before noon?": "બપોરના 12 થી 170 મિનિટ પહેલાં કેટલા વાગ્યા હતા?",
    "170 min before noon?": "બપોરથી 170 મિનિટ પહેલાં?",
    "Count back from the 12 noon post, not forward.": "બપોરના 12 ના થાંભલાથી પાછળ ગણો, આગળ નહીં.",
    "Now tap one of the two half keys for the new flag.": "હવે નવા ઝંડા માટે પૂર્વાહ્ન કે અપરાહ્નમાંથી એક દબાવો.",
    "Now type the hours and the minutes.": "હવે કલાક અને મિનિટ લખો.",
    "Tap one of the two half keys too.": "પૂર્વાહ્ન કે અપરાહ્ન પણ દબાવો.",
    "Yes, the hops add up to 2 hours 17 minutes.": "હા, કૂદકા મળીને 2 કલાક 17 મિનિટ થાય છે.",
    "Yes, 35 and 15 minutes make 50 minutes.": "હા, 35 અને 15 મિનિટ મળીને 50 મિનિટ થાય છે.",
    "Yes, 1 hour 25 minutes in all.": "હા, કુલ 1 કલાક 25 મિનિટ.",
    "Yes, both parts make 5 hours 35 minutes.": "હા, બંને ભાગ મળીને 5 કલાક 35 મિનિટ.",
    "Yes, the shop is open 9 hours 45 minutes.": "હા, દુકાન 9 કલાક 45 મિનિટ ખુલ્લી રહે છે.",
    "Yes, the picnic takes 2 hours 45 minutes.": "હા, પિકનિક 2 કલાક 45 મિનિટ ચાલે છે.",
    "Yes, the bus trip ends at 2:25 p.m.": "હા, બસ યાત્રા અપરાહ્ન 2:25 એ પૂરી થાય છે.",
    "Yes, the game ends at 5:15 p.m.": "હા, રમત અપરાહ્ન 5:15 એ પૂરી થાય છે.",
    "Yes, the school trip is back at 2:15 p.m.": "હા, શાળાનો પ્રવાસ અપરાહ્ન 2:15 એ પાછો આવે છે.",
    "Yes, back past 12 noon it is 10:15 a.m.": "હા, બપોરના 12 ની પાર પાછળ જતાં પૂર્વાહ્ન 10:15 થાય છે.",
    "Yes, 45 minutes back from 7:20 gives 6:35 a.m.": "હા, 7:20 થી 45 મિનિટ પાછળ પૂર્વાહ્ન 6:35 છે.",
    "Yes, 170 minutes before noon is 9:10 a.m.": "હા, બપોરથી 170 મિનિટ પહેલાં પૂર્વાહ્ન 9:10 હતા.",
    "h": "કલાક",
    "min": "મિનિટ",
    "noon": "બપોર",
    "a.m.": "પૂર્વાહ્ન",
    "p.m.": "અપરાહ્ન",
    "before noon": "બપોર પહેલાં",
    "after noon": "બપોર પછી",
    "Total": "કુલ",
    "Hop": "કૂદો",
    "Hop hours": "કલાક કૂદો",
    "Hop minutes": "મિનિટ કૂદો",
    "Add": "ઉમેરો",
    "Change": "બદલો",
    "New": "નવું",
  },
};

/* a.m. / p.m. picked on the working area in phases 3 and 4 (the runtime cannot hold a parts answer and choice keys in
   one item: NOTES.md runtime-gap list). Work writes it while a phase 3 or 4 question is open; judge reads it, so right
   digits with the wrong half are a miss. With no Work mounted (the static rows) live is false and judge reads the digits. */
const TB: any = { live: false, half: null, on: false, qk: "", s60: "" };
const DT_HALF_NONE = "Tap one of the two half keys too.";
const DT_HALF_WRONG = "The digits are right, so look at the colour under the new flag.";
const DT_HALF_LADDER = ["Sky blue is the morning half, and amber comes after 12 noon.", "Before 12 noon the time is a.m., and after 12 noon it is p.m."];

/* One entry per phase = one mount. A phase's steps work a WARM-UP count (`warm`), never question 1's own. */
const PHASES = [
  {
    n: 1,
    concept: "Counting on to the next hour",
    conceptId: "M2.S4.T7.C30", objectiveIds: ["O11"],
    says: ["Hop to the next hour first. How far is that? Now hop on to the end."],
    warm: { kind: "dur", from: "7:40 a.m.", to: "9:10 a.m." },
    steps: [
      { say: "Tap Hop to hop on to the next hour post.", on: "hop", hint: "Tap the Hop key." },
      { say: "Tap Hop again to hop the whole hours.", on: "hop", hint: "Tap Hop once more." },
      { say: "Tap Hop to land on the end flag.", on: "hop", hint: "The Hop key moves the hopper." },
      { say: "Tap Add to add the hops in the total bar.", on: "add", hint: "Tap the Add key." },
    ],
    ladder: ["Add all the hours, then add all the minutes.", "An hour has 60 minutes, not 100, so check the minutes."],
    closing: "Count on to the next hour, then the whole hours, then the minutes, and add.",
    learned: "You learned: small hops to an hour post make a duration easy to add.",
    traceback: "The hop chips light one by one, minutes to the next hour, whole hours, minutes to the end flag, and the total bar writes their sum.",
    items: [
      /* learn ML1: answer in the plan = 2 hours 17 minutes */
      { qid: "M2.S4.T7.C30:ML1", kind: "dur", from: "6:48 a.m.", to: "9:05 a.m.", parts: DT_PARTS, answer: [2, 17], near: "2|57",
        say: "A train runs from 6:48 a.m., arriving at 9:05 a.m., so how long is the journey?", ask: "6:48 to 9:05?",
        miss: "How many minutes is it from 6:48 to 7 o'clock?",
        win: "Yes, the hops add up to 2 hours 17 minutes." },
      /* practice 1: answer in the plan = 50 minutes: 35 minutes to 8:00 p.m. and 15 more */
      { qid: "M2.S4.T7.C30:1", kind: "dur", from: "7:25 p.m.", to: "8:15 p.m.", parts: DT_PARTS, answer: [0, 50], near: "0|90",
        say: "How long is it from 7:25 p.m., to 8:15 p.m.; type 0 hours if there are none.", ask: "7:25 to 8:15? Type 0 if none.",
        miss: "From 7:25, how far is the 8 o'clock post?",
        win: "Yes, 35 and 15 minutes make 50 minutes." },
      /* practice 2: answer in the plan = 1 hour 25 minutes: 20 minutes to 3:00 p.m., 1 hour to 4:00 p.m., and 5 minutes more */
      { qid: "M2.S4.T7.C30:2", kind: "dur", from: "2:40 p.m.", to: "4:05 p.m.", parts: DT_PARTS, answer: [1, 25], near: "1|65",
        say: "A museum visit begins at 2:40 p.m., and ends at 4:05 p.m., so how long is it?", ask: "2:40 to 4:05?",
        miss: "Add the minute hops and the hour hop together.",
        win: "Yes, 1 hour 25 minutes in all." },
    ],
  },
  {
    n: 2,
    concept: "Across twelve noon",
    conceptId: "M2.S4.T7.C31", objectiveIds: ["O11"],
    says: ["Stop at twelve noon first. How long is it before noon, and how long after it?"],
    warm: { kind: "dur", from: "11:40 a.m.", to: "12:50 p.m." },
    steps: [
      { say: "Tap Hop, and the hopper stops at 12 noon.", on: "hop", hint: "Tap the Hop key to start." },
      { say: "Tap Hop again to go on to the end flag.", on: "hop", hint: "Hop once more, past noon." },
      { say: "Tap Add to put the two parts together.", on: "add", hint: "Now tap the Add key." },
    ],
    /* no question here passes 60 minutes (35, 45, 45): rung 3 is each question's own plain step (DT_P2_STEP, set per question
       by DT_BASE; the static rung is question 1's), and the 60 rung comes only after a typed minutes box of 60 or more */
    ladder: ["The two green boxes hold the two parts, so add them.", DT_P2_STEP[0]],
    closing: "Across noon, count on to 12 noon, then on, and add the two parts.",
    learned: "You learned: 12 noon is a stop, and the two parts add to the time.",
    traceback: "The hopper stands on the noon post; the part before noon and the part after it light in their green boxes and the total bar adds them.",
    items: [
      /* learn ML2: answer in the plan = 5 hours 35 minutes */
      { qid: "M2.S4.T7.C31:ML2", kind: "dur", from: "9:50 a.m.", to: "3:25 p.m.", parts: DT_PARTS, answer: [5, 35], near: "6|25",
        say: "A stall is open from 9:50 a.m., until 3:25 p.m., so how long is that?", ask: "9:50 to 3:25?",
        miss: "How long is it from 9:50 to 12 noon?",
        win: "Yes, both parts make 5 hours 35 minutes." },
      /* practice 3: answer in the plan = 9 hours 45 minutes. Count on to 12 noon, 3 hours 15 minutes, then on to 6:30 p.m., 6 hours 30 minutes */
      { qid: "M2.S4.T7.C31:3", kind: "dur", from: "8:45 a.m.", to: "6:30 p.m.", parts: DT_PARTS, answer: [9, 45], near: "6|30",
        say: "Find the time a shop stays open, from 8:45 a.m., till it shuts at 6:30 p.m.", ask: "8:45 to 6:30?",
        miss: "Add the part before noon to the part after it.",
        win: "Yes, the shop is open 9 hours 45 minutes." },
      /* practice 4: answer in the plan = 2 hours 45 minutes: 40 minutes to 12 noon, then 2 hours 5 minutes */
      { qid: "M2.S4.T7.C31:4", kind: "dur", from: "11:20 a.m.", to: "2:05 p.m.", parts: DT_PARTS, answer: [2, 45], near: "2|5",
        say: "How much time does a picnic take, from 11:20 a.m., up to 2:05 p.m.?", ask: "11:20 to 2:05?",
        miss: "Did you count the part before 12 noon too?",
        win: "Yes, the picnic takes 2 hours 45 minutes." },
    ],
  },
  {
    n: 3,
    concept: "From a start and a duration",
    conceptId: "M2.S4.T7.C32", objectiveIds: ["O12"],
    says: ["Hop the hours first, then the minutes. Where do you land?"],
    warm: { kind: "fwd", from: "4:20 p.m.", d: "2 h 50 min", half: "p.m." },
    steps: [
      { say: "Tap Hop hours to hop the 2 hours first.", on: "hop", hint: "Tap the Hop hours key." },
      { say: "Tap Hop minutes to hop the 50 minutes.", on: "hop", hint: "Now tap Hop minutes." },
      { say: "Tap p.m., because the end flag stands after 12 noon.", on: "pm", hint: "Is the track amber under the flag?" },
    ],
    /* every phase 3 question's minutes pass 60 (50 + 35, 35 + 40, 25 + 50): the 60 rung is rung 3 */
    ladder: ["The hour post on the hopper's left gives the hour.", DT_R60],
    closing: "Hop the hours, then the minutes, and the colour where you land gives the half.",
    learned: "You learned: a start time and a duration give the end time.",
    traceback: "The hops light, hours then minutes (a minute hop that meets an hour post is cut there), and the end flag writes its time and half; a pale flag shows the child's time.",
    items: [
      /* learn ML3: answer in the plan = 2:25 p.m. */
      { qid: "M2.S4.T7.C32:ML3", kind: "fwd", from: "10:50 a.m.", d: "3 h 35 min", half: "p.m.", parts: DT_PARTS, answer: [2, 25], near: "1|25",   /* the hour after the post not read (1|85 now brings the 60 rung, a stronger hint than the miss) */
        say: "A bus trip of 3 hours 35 minutes starts at 10:50 a.m., so when does it end?", ask: "10:50 + 3 h 35?",
        miss: "The minute hop crossed an hour post, so read the hour after it.",
        win: "Yes, the bus trip ends at 2:25 p.m." },
      /* practice 5: answer in the plan = 5:15 p.m. */
      { qid: "M2.S4.T7.C32:5", kind: "fwd", from: "3:35 p.m.", d: "1 h 40 min", half: "p.m.", parts: DT_PARTS, answer: [5, 15], near: "4|75",
        say: "When does a game end if it starts at 3:35 p.m., and lasts 1 hour 40 minutes?", ask: "3:35 + 1 h 40?",
        miss: "Where did the hours land, before the minutes hopped on?",
        win: "Yes, the game ends at 5:15 p.m." },
      /* practice 7: answer in the plan = 2:15 p.m. Four hours after 9:25 a.m. is 1:25 p.m., and 50 minutes more cross two o'clock to 2:15 p.m. */
      { qid: "M2.S4.T7.C32:7", kind: "fwd", from: "9:25 a.m.", d: "4 h 50 min", half: "p.m.", parts: DT_PARTS, answer: [2, 15], near: "1|75",
        say: "When is a school trip back if it leaves at 9:25 a.m., for 4 hours 50 minutes?", ask: "9:25 + 4 h 50?",
        miss: "Is the end flag before 12 noon or after it?",
        win: "Yes, the school trip is back at 2:15 p.m." },
    ],
  },
  {
    n: 4,
    concept: "Counting back",
    conceptId: "M2.S4.T7.C33", objectiveIds: ["O12"],
    says: ["Hop back the hours first. Now the minutes. What time is it?"],
    warm: { kind: "back", to: "3:10 p.m.", d: "1 h 25 min", half: "p.m." },
    steps: [
      { say: "Tap Hop hours to hop back 1 hour.", on: "hop", hint: "Tap the Hop hours key." },
      { say: "Tap Hop minutes to hop back 25 minutes.", on: "hop", hint: "Now tap Hop minutes." },
      { say: "Tap p.m., because the start flag is still after 12 noon.", on: "pm", hint: "Is the track amber under the flag?" },
    ],
    ladder: ["Read the hour from the post on the hopper's left.", "Read the clock above, then check which half the start flag is in."],
    closing: "Hop back the hours, then the minutes, and before noon the time is a.m.",
    learned: "You learned: counting back from an end time gives the start time.",
    traceback: "The hops back light, hours then minutes, crossing the noon post where they must, and the start flag writes its time and half; a pale flag shows the child's time.",
    items: [
      /* learn ML4: answer in the plan = 10:15 a.m. */
      { qid: "M2.S4.T7.C33:ML4", kind: "back", to: "1:05 p.m.", d: "2 h 50 min", half: "a.m.", parts: DT_PARTS, answer: [10, 15], near: "10|55",
        say: "What time was it 2 hours 50 minutes before 1:05 p.m.?", ask: "1:05 back 2 h 50?",
        miss: "The hopper went back past 12 noon, so which half is it in now?",
        win: "Yes, back past 12 noon it is 10:15 a.m." },
      /* practice 6: answer in the plan = 6:35 a.m. */
      { qid: "M2.S4.T7.C33:6", kind: "back", to: "7:20 a.m.", d: "45 min", half: "a.m.", parts: DT_PARTS, answer: [6, 35], near: "6|75",
        say: "Which time comes 45 minutes before 7:20 a.m.?", ask: "7:20 back 45 min?",
        miss: "Hop back to the 7 o'clock post first, then on.",
        win: "Yes, 45 minutes back from 7:20 gives 6:35 a.m." },
      /* practice 8: answer in the plan = 9:10 a.m. 170 minutes is 2 hours 50 minutes, and counting back that far from 12 noon gives 9:10 a.m. */
      { qid: "M2.S4.T7.C33:8", kind: "back", to: "12 noon", d: "170 min", change: true, half: "a.m.", parts: DT_PARTS, answer: [9, 10], near: "2|50",
        say: "What was the time 170 minutes before noon?", ask: "170 min before noon?",
        miss: "Count back from the 12 noon post, not forward.",
        win: "Yes, 170 minutes before noon is 9:10 a.m." },
    ],
  },
];

/* free play: the counts of phases 1 and 2, warm-ups included, one after another (New) */
const DT_FREE = [PHASES[0].warm, ...PHASES[0].items, PHASES[1].warm, ...PHASES[1].items].map((x: any) => ({ kind: "dur", from: x.from, to: x.to }));

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  track: { x0: 64, y: DT_L.TY, h: DT_L.TH, window: "the whole hours round the two flags, 0.4 h beyond each, 3 h at least", am: "sky blue", pm: "amber" },
  clock: { cx: DT_L.cx, cy: DT_L.cy, R: DT_L.R, follows: "the hopper" },
  hops: "on to the next hour post, whole hours (stopping at 12 noon when the flags stand either side of it), then the minutes; going back the same, hours first; a minute hop that meets an hour post is cut there",
  answer: "Hours | Minutes boxes; phases 3 and 4 also a.m. / p.m. picked on the working area",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the two boxes as numbers; in phases 3 and 4 the half picked on the working area must match too */
/* each question's own rungs as written; the runtime reads it.miss and it.ladder for the hint right after judge, so judge sets
   them per miss and Work puts them back at every new entry: a miss on the half alone gets the half rungs, and a typed minutes
   box of 60 or more brings the 60 rung at once (it stays for that question until the next entry) */
const DT_BASE = new Map();
PHASES.forEach((p: any) => p.items.forEach((it: any, i: number) => DT_BASE.set(it, { n: p.n, miss: it.miss, pl: p.ladder,
  ladder: p.n === 2 ? [p.ladder[0], DT_P2_STEP[i]] : it.ladder })));
const dtRungs = (item: any, halfOnly: boolean) => {
  const b: any = DT_BASE.get(item);
  if (!b) return;
  if (halfOnly) { item.miss = TB.half ? DT_HALF_WRONG : DT_HALF_NONE; item.ladder = DT_HALF_LADDER; }
  else if (TB.s60 && TB.s60 === TB.qk) { const r = b.n === 4 ? DT_B60 : DT_R60; item.miss = r; item.ladder = [r, (b.ladder || b.pl)[1]]; }
  else { item.miss = b.miss; item.ladder = b.ladder; }
};
const judge = (item: any, v: any) => {
  const p = slotPartsOf(v, 2);
  const on = TB.on && DT_BASE.has(item);
  if (on && p[1] !== "" && Number(p[1]) >= 60) TB.s60 = TB.qk;
  if (p[0] === "" || p[1] === "") { if (on) dtRungs(item, false); return false; }
  const ok = Number(p[0]) === item.answer[0] && Number(p[1]) === item.answer[1];
  const res = !item.half ? ok : ok && !(TB.live && TB.half !== item.half);   /* no half picked = a miss: a time with no label does not settle */
  if (on) dtRungs(item, !!item.half && TB.live && ok && !res);
  return res;
};
/* oracle: every answer counted minute by minute from the words of the times, never from dtQ or the picture */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const abs = (s: string) => {
    if (s === "12 noon") return 12 * 60;
    const r: any = /^(\d+):(\d\d) ([ap])\.m\.$/.exec(s);
    let h = Number(r[1]);
    if (h === 12) h = 0;
    if (r[3] === "p") h += 12;
    return h * 60 + Number(r[2]);
  };
  if (it.kind === "dur") {
    let c = 0;
    for (let t = abs(it.from); t < abs(it.to); t++) c++;
    return it.answer[1] < 60 && it.answer[0] * 60 + it.answer[1] === c && it.say.includes(it.from) && it.say.includes(it.to);
  }
  const hm = /(\d+) h/.exec(it.d), mm = /(\d+) min/.exec(it.d);
  const len = (hm ? Number(hm[1]) * 60 : 0) + (mm ? Number(mm[1]) : 0);
  let t = abs(it.kind === "fwd" ? it.from : it.to);
  for (let i = 0; i < len; i++) t += it.kind === "fwd" ? 1 : -1;
  const h24 = Math.floor(t / 60), h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return it.answer[0] === h12 && it.answer[1] === t % 60 && it.half === (h24 < 12 ? "a.m." : "p.m.");
}));
/* the misconception of each item (written as the child would type it) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const [h, m] = item.answer, mm = String(m).padStart(2, "0");
  if (item.half) return [h + ":" + mm];
  return h ? [h + ":" + mm, h + " hours " + m + " minutes", h + " hour " + m + " minutes"] : [m + " minutes"];
};
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (HOOK.check) HOOK.check();
  return T.submit(item.answer);
};
/* the agent's answer(): the hops are done for it and, in phases 3 and 4, the half it names (else the right one) is picked; then v is typed */
const answer = (item: any, v: any) => {
  if (item.half && HOOK.pick) {
    const s = String(v);
    HOOK.pick(/p\.?m/i.test(s) ? "p.m." : /a\.?m/i.test(s) ? "a.m." : item.half);
  } else if (HOOK.check) HOOK.check();
  return undefined;
};
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const demo = !free && (stage === "demo" || stage === "teach") && !!phase.warm;
  const won = !free && !demo && !!item && (stage === "win" || stage === "idle");

  /* the board is keyed to the ENTRY, not only the question: an away-and-back opens a fresh board */
  const qk = free ? "free" : n + "|" + (demo ? "w" : "q" + index);
  const qkRef = useRef(""), entryRef = useRef(0);
  if (qkRef.current !== qk) {
    qkRef.current = qk; entryRef.current++;
    /* a new entry starts on the question's own rungs (judge may have changed them on an earlier entry) */
    const b: any = item && DT_BASE.get(item);
    if (b) { item.miss = b.miss; item.ladder = b.ladder; }
  }
  const key = qk + "#" + entryRef.current;
  TB.on = stage === "ask" && !free && !demo;
  TB.qk = key;
  const fresh = () => ({ key, fi: 0, land: 0, added: false, changed: false, half: null as any, touched: false, lit: 0, corr: false, halfMiss: false, tbOn: false, queued: "", ghost: null as any });
  const [raw, setRaw] = useState<any>(fresh);
  const S = raw.key === key ? raw : fresh();
  const keyRef = useRef(key);
  keyRef.current = key;
  const put = (patch: any) => {
    const at = key;
    setRaw((p: any) => {
      if (keyRef.current !== at) return p;
      const b = p.key === at ? p : fresh();
      return { ...b, ...(typeof patch === "function" ? patch(b) : patch) };
    });
  };

  const it: any = free ? DT_FREE[S.fi % DT_FREE.length] : demo ? phase.warm : item || PHASES[0].items[0];
  const Q = dtQ(it);
  const nL = Q.lands.length;

  /* ── layout from the room the working area has now ── */
  const bw = box && box.w ? box.w : 1472;
  const kx = box && box.key ? Math.min(bw, box.key.x - 12) : bw;
  const { cx, cy, R, bx, rowA, rowB, TY, TH, chipY, chipH } = DT_L;
  const TX0 = 64, TX1 = bw - 64;
  const sp = (TX1 - TX0) / (Q.hi - Q.lo);
  const xOf = (t: number) => TX0 + (t / 60 - Q.lo) * sp;

  /* ── what is shown ── */
  const land = won ? nL : S.land;
  const changed = won || S.changed || !it.change;
  const half = won ? it.half : S.half;
  const hopsDone = land >= nL && changed;
  const cur = land ? Q.lands[land - 1].t : Q.s;
  const foundKnown = Q.time && hopsDone && (won || S.corr || (demo && !!S.half));
  const showTotal = !Q.time && (won || S.corr || S.added);
  const lit = won ? Q.segs.length : S.lit;
  const segDone = (j: number) => { let last = -1; Q.lands.forEach((l: any, i: number) => { if (l.seg === j) last = i; }); return last >= 0 && last < land; };
  const segLen = (sg: any) => Math.abs(sg.b - sg.a);
  const minSum = Q.segs.filter((sg: any) => sg.kind === "min").reduce((a: number, sg: any) => a + segLen(sg), 0);
  const hrsSum = Q.segs.filter((sg: any) => sg.kind === "hrs").reduce((a: number, sg: any) => a + segLen(sg) / 60, 0);
  const noonLand = Q.noon ? Q.lands.findIndex((l: any) => l.t === 720) : -1;
  const before = Q.noon ? Q.segs.filter((sg: any) => Math.max(sg.a, sg.b) <= 720).reduce((a: number, sg: any) => a + segLen(sg), 0) : 0;
  const after = Q.noon ? Q.d - before : 0;
  const lenText = (m: number) => (Math.floor(m / 60) ? Math.floor(m / 60) + " " + tx("h") + " " : "") + (m % 60 || !Math.floor(m / 60) ? (m % 60) + " " + tx("min") : "");

  /* ── acts (no hand, owner 2026-11-16: the hopper JUMPS by itself from landing to landing; Add, Change and the half keys act at once) ── */
  const playing = useRef(false);
  const tbRun = useRef(false), mine = useRef(false);
  const [busy, setBusy] = useState(false);
  const [fly, setFly] = useState<any>(null);   /* the hopper in the air: { a, b, f } = from x, to x, 0..1 */
  const anim = useRef(0);
  const SR = useRef<any>(S);
  SR.current = S;
  const nextGroup = land < nL ? Q.lands[land].g : -1;
  const groupKind = nextGroup >= 0 ? Q.segs.find((sg: any) => sg.g === nextGroup).kind : "";
  const hopLabel = !Q.time ? DT_KEY.hop : groupKind === "hrs" ? DT_KEY.hophrs : DT_KEY.hopmin;
  const doAct = (on: string, done: () => void) => {
    if (playing.current) return;
    if (on === "hop" && land < nL && changed) {
      const g = Q.lands[land].g, from = land;
      const idx: number[] = [];
      Q.lands.forEach((l: any, i: number) => { if (l.g === g && i >= from) idx.push(i); });
      const xs = [xOf(cur), ...idx.map((i) => xOf(Q.lands[i].t))];
      const end = () => { put((p: any) => ({ land: Math.max(p.land, idx[idx.length - 1] + 1) })); api.sfx.settle(); done(); focusNext(); };
      /* the answer stays locked through the whole jump (the old hand act held it before); the gate effect lets go once busy drops */
      if (stage === "ask" && !free) { mine.current = true; api.lock(true); }
      if (reducedMotion()) { end(); return; }
      playing.current = true; setBusy(true);
      const per = Math.max(300, Math.min(520, 1300 / idx.length)), t0 = performance.now();
      let passed = 0;
      const tick = (t: number) => {
        const e = (t - t0) / per;
        while (passed < idx.length && e >= passed + 1) { const k = idx[passed]; put((p: any) => ({ land: Math.max(p.land, k + 1) })); passed++; }
        if (passed >= idx.length) { anim.current = 0; setFly(null); playing.current = false; setBusy(false); end(); return; }
        setFly({ a: xs[passed], b: xs[passed + 1], f: Math.max(0, e - passed) });
        anim.current = requestAnimationFrame(tick);
      };
      anim.current = requestAnimationFrame(tick);
    } else if (on === "add" && hopsDone && !Q.time) {
      put({ added: true }); api.sfx.trade(); done(); focusNext();
    } else if (on === "change" && it.change && !S.changed) {
      put({ changed: true }); api.sfx.trade(); done(); focusNext();
    } else if ((on === "am" || on === "pm") && Q.time && land >= nL) {
      const h = on === "am" ? "a.m." : "p.m.";
      put({ half: h }); TB.half = h; api.sfx.tick(); done(); focusNext();
    } else if (on === "new" && free) {
      put((p: any) => ({ fi: p.fi + 1, land: 0, added: false }));
      api.sfx.tick();
      done();
    }
  };
  const act = (on: string, real: boolean) => {
    if (real && !S.touched) put({ touched: true });
    if (playing.current) return;
    if (demo) {
      if (on !== stepOn) { api.did(on); return; }
      doAct(on, () => api.did(on));
      return;
    }
    if (free) { doAct(on, () => {}); return; }
    if (stage === "ask" && tbRun.current && (on === "am" || on === "pm")) { put({ queued: on }); return; }   /* done when the correction ends */
    if (stage !== "ask" || tbRun.current) return;
    doAct(on, () => {});
  };
  /* while the frog is in the air a tap on the dimmed Answer key, the Hint key, a pad key or the bare board is the child's own
     hop already being done: swallow it before the runtime takes it as a wrong act (the r31 guard only knows api.act) */
  useEffect(() => {
    const pass: any = { restart: 1, sound: 1, "phase-dot": 1, next: 1 };
    let blk = false;   /* a press that began mid-hop is swallowed whole (its up and click too), one that began before is left alone */
    const f = (e: any) => {
      const down = /down|start/.test(e.type);
      if (down) {
        const c = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
        blk = playing.current && !(c && pass[c.getAttribute("data-control")]);
      }
      if (!blk) return;
      if (e.type === "click") blk = false;
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    };
    const evs = ["pointerdown", "pointerup", "mousedown", "mouseup", "click", "touchstart", "touchend"];
    evs.forEach((n) => window.addEventListener(n, f, { capture: true, passive: false }));
    return () => evs.forEach((n) => window.removeEventListener(n, f, { capture: true } as any));
  }, []);
  /* the double-tap guard is per key: a second tap on the SAME key within 400 ms is one tap, another key goes through */
  const lastKey = useRef<any>({});
  const refocus = useRef(false);
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - (lastKey.current[on] || 0) < 400) return;
    lastKey.current[on] = t;
    const ae: any = document.activeElement;
    refocus.current = !!(ae && ae.getAttribute && ae.getAttribute("data-control") === on);
    if (!touchedAny) setTouchedAny(true);
    act(on, true);
  };
  /* after an act the focus goes to the next control (stays on Hop between hops) */
  function focusNext() {
    if (!refocus.current) return;
    refocus.current = false;
    setTimeout(() => {
      const q = (c: string) => document.querySelector('[data-control="' + c + '"]') as any;
      const el = q("hop") || q("change") || (Q.time && !SR.current.half ? q("am") : null) || q("answer-open");
      if (el && el.focus) el.focus();
    }, 30);
  }
  /* a real touch anywhere in the tool arms the gate for every later question: a tap on a key, or a PHYSICAL Enter / Space on a
     guide step (PATTERNS §20); the agent's check() also reaches onEnter, but no trusted key event comes with it */
  const [touchedAny, setTouchedAny] = useState(false);
  const keyAt = useRef(0);
  useEffect(() => {
    const f = (e: any) => { if (e.isTrusted && (e.key === "Enter" || e.key === " ")) keyAt.current = Date.now(); };
    window.addEventListener("keydown", f, true);
    return () => window.removeEventListener("keydown", f, true);
  }, []);
  api.onEnter(demo && stepOn ? () => { if (Date.now() - keyAt.current < 400 && !touchedAny) setTouchedAny(true); act(stepOn, false); } : null);

  /* the act gate (PATTERNS §20): Answer and the keypad stay locked while the hops (and the half) are undone, user mode,
     after a real touch; the agent's check() does the acts at once */
  const needAct = !free && !won && stage === "ask" && (land < nL || !changed || (Q.time && !S.half));
  const want = needAct && (S.touched || touchedAny);
  useEffect(() => {
    if (tbRun.current || busy) return;
    if (!want && !mine.current) return;
    mine.current = want;
    api.lock(want);
  }, [want, busy]);

  HOOK.demo = demo && stepOn ? () => act(stepOn, false) : null;
  HOOK.check = !free && !won && stage === "ask" ? () => {
    if (!needAct) return undefined;
    const h = S.half || item.half || null;
    put({ land: nL, changed: true, half: h });
    if (Q.time) TB.half = h;
    return true;
  } : null;
  HOOK.pick = !free && !won && stage === "ask" && Q.time ? (h: string) => { put({ land: nL, changed: true, half: h }); TB.half = h; } : null;
  TB.live = Q.time && stage === "ask" && !free && !demo;
  TB.half = TB.live ? S.half : null;

  /* a half key tapped while the correction played */
  useEffect(() => {
    if (S.tbOn || !S.queued || tbRun.current) return;
    const q = S.queued;
    put({ queued: "" });
    act(q, false);
  }, [S.tbOn, S.queued]);
  /* phases 3 and 4: once the hops are done the half is asked for while the key is locked; the question comes back after */
  const nudged = useRef("");
  useEffect(() => {
    if (!Q.time || stage !== "ask" || free || !(S.touched || touchedAny) || wrong) return;
    if (hopsDone && !S.half) { nudged.current = key; api.say("Now tap one of the two half keys for the new flag."); }
    else if (nudged.current === key && S.half) { nudged.current = ""; api.say("Now type the hours and the minutes."); }
  }, [S.land, S.half, S.touched, S.changed]);

  /* a half tap never judges: after a miss (the slot is emptied, MISS CLEARS THE SLOT) a half picked opens the keypad, which
     clears the half hint, and the bubble says to type the time again; the child's own Enter judges */
  const halfSeen = useRef<any>(null);
  useEffect(() => {
    const was = halfSeen.current;
    halfSeen.current = S.half;
    if (!Q.time || stage !== "ask" || free || !S.half || S.half === was || !wrong || tbRun.current) return;
    if (String(typed || "").replace(/[^0-9]/g, "") !== "") return;
    if (api.openAnswer) api.openAnswer();
    api.say("Now type the time again.");
  }, [S.half]);
  /* a win line for every question (the phase's closing replaces the last) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, key]);

  /* the traceback: the hops completed and lit one by one, ending on the whole right answer, nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    tbRun.current = true;
    api.lock(true);
    const g = slotPartsOf(wrong.value, 2);
    const digitsOk = Q.time && g[0] !== "" && g[1] !== "" && Number(g[0]) === item.answer[0] && Number(g[1]) === item.answer[1];
    const halfMiss = digitsOk && !S.half;
    put({ land: nL, changed: true, lit: 0, corr: false, halfMiss, tbOn: true, queued: "", ghost: Q.time ? { h: Number(g[0]), m: Number(g[1]), half: S.half } : null });
    const steps: any[] = [[400, () => {}]];
    Q.segs.forEach((_: any, j: number) => steps.push([480, () => put({ lit: j + 1 })]));
    steps.push([600, () => put({ corr: true })]);
    tl.run(steps, () => { tbRun.current = false; mine.current = false; api.lock(false); put({ tbOn: false }); });
  }, [wrong]);
  /* a correction or a gate never outlives its question */
  useEffect(() => () => {
    tl.stop();
    if (anim.current) { cancelAnimationFrame(anim.current); anim.current = 0; }
    if (playing.current) { playing.current = false; setBusy(false); setFly(null); }
    if (tbRun.current) { tbRun.current = false; api.lock(false); }
    if (mine.current) { mine.current = false; api.lock(false); }
  }, [key]);

  /* what the host and the agent read back: never the answer before it is given */
  const startT = Q.dir > 0 ? Q.s : Q.e, endT = Q.dir > 0 ? Q.e : Q.s;
  api.share({
    phase: n,
    startFlag: Q.dir > 0 || foundKnown ? dtClock(startT) + " " + dtHalf(startT) : null,
    endFlag: !Q.time || Q.dir < 0 || foundKnown ? dtClock(endT) + " " + dtHalf(endT) : null,
    hops: land, hopsNeeded: nL, noonStop: Q.noon,
    durationCard: Q.time ? (changed ? lenText(Q.d) : it.d) : null,
    direction: Q.dir > 0 ? "forward" : "back", half: half || null,
    total: showTotal ? Math.floor(Q.d / 60) + "|" + (Q.d % 60) : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const W = bw;
  const amA = Math.max(Q.lo * 60, 0), amB = Math.min(Q.hi * 60, 720), pmA = Math.max(Q.lo * 60, 720), pmB = Math.min(Q.hi * 60, 1440);
  const noonIn = Q.lo * 60 < 720 && Q.hi * 60 > 720;
  const arcs: any[] = [];
  for (let i = 0; i < land; i++) {
    const a = i ? Q.lands[i - 1].t : Q.s, b = Q.lands[i].t;
    arcs.push({ a, b, kind: Q.segs[Q.lands[i].seg].kind, seg: Q.lands[i].seg });
  }
  const noonLit = arcs.some((h: any) => Math.min(h.a, h.b) < 720 && Math.max(h.a, h.b) >= 720) || (land > 0 && cur === 720);
  const gk = lang === "gu" ? 1.2 : 1;
  const chipFs = Math.round((lang === "en" ? 32 : 30) * gk);
  const chips: any[] = Q.segs.map((sg: any, j: number) => {
    const text = sg.kind === "hrs" ? segLen(sg) / 60 + " " + tx("h") : segLen(sg) + " " + tx("min");
    return { j, kind: sg.kind, text, w: dtEst(text, chipFs) + 32, c: (xOf(sg.a) + xOf(sg.b)) / 2 };
  }).filter((c: any) => segDone(c.j)).sort((a: any, b: any) => a.c - b.c);
  /* each chip centred under its own arcs; neighbours that would touch are pushed apart both ways, 22 between */
  chips.forEach((c: any) => { c.x = c.c - c.w / 2; });
  for (let pass = 0; pass < 30; pass++) {
    let moved = false;
    for (let k = 1; k < chips.length; k++) {
      const a = chips[k - 1], b = chips[k], ov = a.x + a.w + 22 - b.x;
      if (ov > 0.5) { a.x -= ov / 2; b.x += ov / 2; moved = true; }
    }
    if (chips.length) {
      if (chips[0].x < 8) { const d = 8 - chips[0].x; chips.forEach((c: any) => { c.x += d; }); }
      const last = chips[chips.length - 1];
      if (last.x + last.w > W - 8) { const d = last.x + last.w - (W - 8); chips.forEach((c: any) => { c.x -= d; }); }
    }
    if (!moved) break;
  }

  /* the keys (one key for a sequence; its label follows the act) */
  const keyIds: string[] = (() => {
    if (free) return land < nL ? ["hop"] : S.added ? ["new"] : ["add", "new"];
    if (won || (!demo && stage !== "ask")) return [];
    if (!changed) return ["change"];
    if (land < nL) return ["hop"];
    if (Q.time) return demo && foundKnown ? [] : ["am", "pm"];
    if (demo && !S.added) return ["add"];
    return [];
  })();
  const kw = keyIds.length > 1 ? (keyIds.includes("new") ? 200 : 170) : keyIds[0] === "hop" && Q.time ? 300 : 230;
  const kGap = 24, kTot = keyIds.length * kw + (keyIds.length - 1) * kGap;
  const kx0 = Math.max(bx, (bx + kx) / 2 - kTot / 2);
  const keyBox = (j: number) => ({ x: kx0 + j * (kw + kGap), y: rowB + 2, w: kw, h: 76 });
  const keyLabel = (id: string) => (id === "hop" ? hopLabel : DT_KEY[id]);

  /* the half's widest label, so both flags keep one width in a language */
  const halfW = Math.max(dtEst(String(tx("a.m.")), T.micro * gk), dtEst(String(tx("p.m.")), T.micro * gk), dtEst(String(tx("noon")), T.micro * gk)) + 30;
  const flagO = (o: any) => ({ W, tx, halfW, lang, ...o });
  const ghostT = (() => {
    const gh = S.ghost;
    if (!S.corr || !gh || !gh.half || !(gh.m >= 0 && gh.m < 60) || !(gh.h >= 1 && gh.h <= 12)) return null;
    const t = ((gh.h % 12) + (gh.half === "p.m." ? 12 : 0)) * 60 + gh.m;
    return t !== Q.e && t > Q.lo * 60 && t < Q.hi * 60 ? t : null;
  })();
  const totalH = Math.floor(Q.d / 60), totalM = Q.d % 60;

  return (
    <g>
      <defs>
        <filter id="dt-card-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.1" />
        </filter>
        <linearGradient id="dt-sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#CFE8F8" />
        </linearGradient>
        <linearGradient id="dt-amber-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF3E0" />
          <stop offset="100%" stopColor="#FCE2AE" />
        </linearGradient>
        <linearGradient id="dt-card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFBF2" />
        </linearGradient>
      </defs>

      {/* the wall clock, following the hopper */}
      {dtClockArt(cx, cy, R, cur, "dt-work")}

      {/* row A: the duration card (phases 3, 4) or the part before noon and the part after it (a count across noon) */}
      {Q.time && (() => {
        const hs = Math.floor(Q.d / 60), ms = Q.d % 60;
        const big = it.change && changed;
        const left = it.change ? Q.d + " " + tx("min") : "";
        const r1 = hs ? hs + " " + tx("h") : "", r2 = ms ? ms + " " + tx("min") : "";
        /* the card keeps clear of the open answer panel: its type steps down (never under 28) when the words run long */
        const room = Math.min(kx, bw) - bx - 12;
        const need = (f: number) => (it.change && !changed ? dtEst(left, f) + 40 : (big ? dtEst(left, f) + 72 : 0) + dtEst(r1 + (r1 && r2 ? "  " : "") + r2, f) + 40);
        let cf = T.prompt;
        while (cf > 28 && need(cf) > room) cf -= 2;
        const wL = big ? dtEst(left, cf) + 28 : 0;
        const wR = dtEst(r1 + (r1 && r2 ? "  " : "") + r2, cf) + 40;
        const wC = it.change && !changed ? dtEst(left, cf) + 40 : big ? wL + 44 + wR : wR;
        return (
          <g pointerEvents="none" filter="url(#dt-card-shadow)">
            <rect x={bx} y={rowA} width={wC} height={90} rx={18} fill="url(#dt-card-grad)" stroke={DT.hop} strokeWidth={4} />
            <rect x={bx + 2} y={rowA + 2} width={wC - 4} height={14} rx={16} fill="#FFFFFF" fillOpacity={0.7} />
            {it.change && !changed ? (
              <text x={bx + wC / 2} y={rowA + 60} textAnchor="middle" fontSize={cf} fontWeight={700} fill={shade(DT.min, 0.25)}>{left}</text>
            ) : (
              <g>
                {big && <text x={bx + 18} y={rowA + 60} fontSize={cf} fontWeight={700} fill={shade(DT.min, 0.25)}>{left}</text>}
                {big && <text x={bx + wL + 14} y={rowA + 60} textAnchor="middle" fontSize={cf} fontWeight={700} fill={DT.ink}>=</text>}
                <text x={bx + (big ? wL + 44 : 0) + 20} y={rowA + 60} fontSize={cf} fontWeight={700}>
                  {r1 && <tspan fill={shade(DT.hr, 0.25)}>{r1}</tspan>}
                  {r1 && r2 && <tspan> </tspan>}
                  {r2 && <tspan fill={shade(DT.min, 0.25)}>{r2}</tspan>}
                </text>
              </g>
            )}
          </g>
        );
      })()}
      {Q.noon && [0, 1].map((k) => {
        const reached = k === 0 ? noonLand >= 0 && land > noonLand : land >= nL;
        const val = k === 0 ? before : after;
        const x = bx + k * 322, bw2 = 300;
        return (
          <g key={"part" + k} pointerEvents="none" filter="url(#dt-card-shadow)">
            <rect x={x} y={rowA} width={bw2} height={110} rx={16} fill={reached ? tint(DT.hop, 0.88) : "url(#dt-card-grad)"} stroke={DT.hop} strokeWidth={4} />
            <rect x={x + 2} y={rowA + 2} width={bw2 - 4} height={14} rx={14} fill="#FFFFFF" fillOpacity={0.6} />
            <text x={x + 16} y={rowA + 40} fontSize={Math.round(T.micro * gk)} fontWeight={700} fill={DT.ink}>{tx(k === 0 ? "before noon" : "after noon")}</text>
            {reached && <text x={x + 16} y={rowA + 92} fontSize={lang === "en" ? T.prompt : Math.round(34 * gk * 0.92)} fontWeight={700} fill={shade(DT.hop, 0.45)}>{lenText(val)}</text>}
          </g>
        );
      })}

      {/* row B: the keys, or once they are done, the total bar */}
      {showTotal && (() => {
        const carry = minSum >= 60;
        const wv = Math.min(kx - bx - 10, 700);
        return (
          <g pointerEvents="none" filter="url(#dt-card-shadow)">
            <rect x={bx} y={rowB} width={wv} height={86} rx={18} fill={tint(DT.hop, 0.9)} stroke={DT.hop} strokeWidth={4} />
            <rect x={bx + 2} y={rowB + 2} width={wv - 4} height={14} rx={16} fill="#FFFFFF" fillOpacity={0.6} />
            <text x={bx + 18} y={rowB + 56} fontSize={Math.round(T.micro * gk)} fontWeight={700} fill={DT.ink}>{tx("Total")}</text>
            {carry ? (
              <g>
                <text x={bx + 130} y={rowB + 58} fontSize={T.prompt} fontWeight={700} fill={shade(DT.min, 0.25)}>{(hrsSum ? hrsSum + " " + tx("h") + " " : "") + minSum + " " + tx("min")}</text>
                <text x={bx + 130 + dtEst((hrsSum ? hrsSum + " " + tx("h") + " " : "") + minSum + " " + tx("min"), 40) + 16} y={rowB + 58} fontSize={T.prompt} fontWeight={700} fill={DT.ink}>=</text>
                <text x={bx + 130 + dtEst((hrsSum ? hrsSum + " " + tx("h") + " " : "") + minSum + " " + tx("min"), 40) + 50} y={rowB + 58} fontSize={T.prompt} fontWeight={700}>
                  <tspan fill={shade(DT.wine, 0.05)}>{totalH + " " + tx("h")}</tspan><tspan> </tspan><tspan fill={shade(DT.min, 0.25)}>{totalM + " " + tx("min")}</tspan>
                </text>
              </g>
            ) : (
              <text x={bx + 130} y={rowB + 58} fontSize={T.prompt} fontWeight={700}>
                {totalH > 0 && <tspan fill={shade(DT.hr, 0.25)}>{totalH + " " + tx("h")}</tspan>}
                {totalH > 0 && <tspan> </tspan>}
                <tspan fill={shade(DT.min, 0.25)}>{totalM + " " + tx("min")}</tspan>
              </text>
            )}
          </g>
        );
      })()}

      {/* the track: a.m. sky blue, p.m. amber, an hour post every hour, five-minute ticks where there is room */}
      <g pointerEvents="none">
        <rect x={TX0 - 4} y={TY - 4} width={TX1 - TX0 + 8} height={TH + 8} rx={10} fill="#000000" fillOpacity={0.08} />
        {amB > amA && <rect x={xOf(amA)} y={TY} width={xOf(amB) - xOf(amA)} height={TH} fill="url(#dt-sky-grad)" />}
        {pmB > pmA && <rect x={xOf(pmA)} y={TY} width={xOf(pmB) - xOf(pmA)} height={TH} fill="url(#dt-amber-grad)" />}
        <rect x={TX0} y={TY} width={TX1 - TX0} height={TH} fill="none" stroke={DT.ink} strokeWidth={3.5} />
        {sp >= 96 && Array.from({ length: (Q.hi - Q.lo) * 12 }).map((_, i) => i % 12 ? (
          <line key={"t" + i} x1={TX0 + (i * sp) / 12} y1={TY + TH - 9} x2={TX0 + (i * sp) / 12} y2={TY + TH} stroke={DT.ink} strokeWidth={1.8} />
        ) : null)}
        {Array.from({ length: Q.hi - Q.lo + 1 }).map((_, i) => {
          const x = TX0 + i * sp, h = Q.lo + i;
          return (
            <g key={"h" + i}>
              {h * 60 !== 720 && <line x1={x} y1={TY - 10} x2={x} y2={TY + TH + 8} stroke={DT.ink} strokeWidth={3.6} strokeLinecap="round" />}
              <text x={x} y={TY + TH + 31} textAnchor="middle" fontSize={T.label - 2} fontWeight={700} fill={DT.ink}>{dtH12(h * 60)}</text>
            </g>
          );
        })}
        {noonIn && (
          <g>
            <line x1={xOf(720) + 1.5} y1={TY - 28} x2={xOf(720) + 1.5} y2={TY + TH + 8} stroke="#000000" strokeOpacity={0.15} strokeWidth={9} strokeLinecap="round" />
            <line x1={xOf(720)} y1={TY - 28} x2={xOf(720)} y2={TY + TH + 8} stroke={DT.ink} strokeWidth={7} strokeLinecap="round" />
          </g>
        )}
        {[[amA, amB, "a.m.", DT.skyBand], [pmA, pmB, "p.m.", DT.amberBand]].map(([a, b, word, band]: any) => {
          const label = String(tx(word)), fs = Math.round(T.micro * gk), pw = dtEst(label, fs) + 22, ph = TH - 12;
          if (b - a < 60) return null;
          /* candidates: the middle of each whole hour inside this half (no hour post under the pill when it fits the hour) */
          const cands: number[] = [];
          for (let h = Math.ceil(a / 60); h + 1 <= Math.floor(b / 60); h++) cands.push(xOf(h * 60 + 30));
          if (!cands.length) return null;
          const fits = pw <= sp - 10;
          const avoid = [xOf(Q.s), xOf(Q.e), xOf(cur) + Q.dir * 44, ...Q.lands.map((l: any) => xOf(l.t)), ...(noonIn ? [xOf(720)] : [])];
          let best = cands[0], bestD = -1;
          cands.forEach((c) => {
            if (c - pw / 2 < TX0 + 4 || c + pw / 2 > TX1 - 4) return;
            const d = Math.min(...avoid.map((v: number) => Math.abs(v - c)));
            if (d > bestD + 0.5) { bestD = d; best = c; }
          });
          if (bestD < 0 || (!fits && bestD < pw / 2)) return null;
          return (
            <g key={word}>
              <rect x={best - pw / 2} y={TY + 6} width={pw} height={ph} rx={ph / 2} fill={tint(band, 0.6)} stroke={shade(band, 0.35)} strokeWidth={1.5} />
              <text x={best} y={TY + 6 + ph / 2 + (lang === "en" ? fs * 0.35 : fs * 0.3)} textAnchor="middle" fontSize={fs} fontWeight={700} fill={shade(DT.ink, 0.2)}>{label}</text>
            </g>
          );
        })}
      </g>

      {/* the flags: the given ones with their times; the found one once the hopper lands there */}
      {dtFlag(xOf(Q.s), Q.s, flagO({ noon: true, sun: Q.s === 720 }))}
      {!Q.time && dtFlag(xOf(Q.e), Q.e, flagO({ noon: true, sun: Q.e === 720 }))}
      {Q.time && hopsDone && dtFlag(xOf(Q.e), foundKnown ? Q.e : null, flagO({ half: S.half }))}
      {ghostT !== null && dtFlag(xOf(ghostT), ghostT, flagO({ pale: true }))}

      {/* the hops: a green arc from landing to landing */}
      <g pointerEvents="none">
        {arcs.map((h: any, i: number) => {
          const a = xOf(h.a), b = xOf(h.b), P = Math.max(16, Math.min(h.kind === "hrs" ? 38 : 30, Math.abs(b - a) * 0.6 + 8));
          const on = S.lit > h.seg || won;
          return (
            <g key={"arc" + i}>
              <path d={`M ${a} ${TY} Q ${(a + b) / 2} ${TY - 2 * P} ${b} ${TY}`} fill="none" stroke="#000000" strokeOpacity={0.12} strokeWidth={on ? 10 : 7} strokeLinecap="round" transform="translate(0,2)" />
              <path d={`M ${a} ${TY} Q ${(a + b) / 2} ${TY - 2 * P} ${b} ${TY}`} fill="none" stroke={DT.hop} strokeWidth={on ? 8 : 5} strokeLinecap="round" />
              <circle cx={b} cy={TY} r={5} fill="#FFFFFF" stroke={DT.hop} strokeWidth={2.5} />
              <circle cx={b} cy={TY} r={2.4} fill={DT.hop} />
            </g>
          );
        })}
      </g>

      {noonIn && Q.s !== 720 && dtSun(xOf(720), TY - 46, 22, noonLit)}

      {/* the hopper, at its landing, or in the air along a hop arc while it jumps */}
      {(() => {
        let x = xOf(cur), y = TY - 22;
        if (fly) {
          const P = Math.max(16, Math.min(38, Math.abs(fly.b - fly.a) * 0.6 + 8));
          x = fly.a + (fly.b - fly.a) * fly.f;
          y -= 4 * P * fly.f * (1 - fly.f);
        }
        return <g pointerEvents="none" transform={`translate(${x + Q.dir * 44},${y}) scale(1.3)`}>{dtHopperArt(Q.dir)}</g>;
      })()}

      {/* the hop chips under the track: hours in vermilion, minutes in deep blue */}
      <g pointerEvents="none" filter="url(#dt-card-shadow)">
        {chips.map((c: any) => {
          const on = lit > c.j;
          return (
            <g key={"chip" + c.j}>
              <rect x={c.x} y={chipY} width={c.w} height={chipH} rx={14} fill={on ? tint(DT.hop, 0.82) : "#FFFFFF"} stroke={DT.hop} strokeWidth={on ? 4.5 : 3} />
              <rect x={c.x + 2} y={chipY + 2} width={c.w - 4} height={10} rx={12} fill="#FFFFFF" fillOpacity={0.6} />
              <text x={c.x + c.w / 2} y={chipY + 36} textAnchor="middle" fontSize={chipFs} fontWeight={700} fill={shade(c.kind === "hrs" ? DT.hr : DT.min, 0.25)}>{c.text}</text>
            </g>
          );
        })}
      </g>

      {/* the keys */}
      {keyIds.map((id, j) => {
        const b = keyBox(j);
        const picked = (id === "am" && half === "a.m.") || (id === "pm" && half === "p.m.");
        return (
          <g key={"k" + j}>
            {picked && <rect x={b.x - 8} y={b.y - 8} width={b.w + 16} height={b.h + 16} rx={22} fill="none" stroke={DT.hop} strokeWidth={6} pointerEvents="none" />}
            <Key id={id} label={tx(keyLabel(id))} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" onClick={() => pressKey(id)}>
              <text y={11 * gk} textAnchor="middle" fontSize={Math.round(T.label * gk)} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(keyLabel(id))}</text>
            </Key>
          </g>
        );
      })}
      {S.corr && S.halfMiss && !S.half && keyIds.includes("am") && (() => {
        const a = keyBox(keyIds.indexOf("am")), b = keyBox(keyIds.indexOf("pm"));
        return <rect x={a.x - 10} y={a.y - 10} width={b.x + b.w - a.x + 20} height={a.h + 20} rx={24} fill="none" stroke={DT.ink} strokeWidth={5} pointerEvents="none" />;
      })()}
      {demo && stepOn && keyIds.includes(stepOn) && (() => {
        const b = keyBox(keyIds.indexOf(stepOn));
        return <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} rx={18} C={C} />;
      })()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || last.it || {};
  const [a, b] = slotPartsOf(last.value, 2).map((x: any) => Number(x));
  const y0 = h - 8, ty = Math.min(h / 2 + 4, y0 - 10 - 14);   /* the words sit clear above the arc's top (descenders and Hindi tails included) */
  return (
    <g pointerEvents="none">
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <line x1={14} y1={y0} x2={w - 14} y2={y0} stroke={DT.ink} strokeWidth={3} />
      <path d={`M 18 ${y0} Q ${w / 2} ${y0 - 16} ${w - 18} ${y0}`} fill="none" stroke={DT.hop} strokeWidth={4} />
      {item.half ? (
        <text x={w / 2} y={ty} textAnchor="middle" fontSize={T.micro} fontWeight={700}>
          <tspan fill={shade(DT.hr, 0.25)}>{a}</tspan><tspan fill={DT.ink}>:</tspan><tspan fill={shade(DT.min, 0.25)}>{String(b).padStart(2, "0")}</tspan>
          <tspan fill={DT.ink}>{" " + tx(item.half)}</tspan>
        </text>
      ) : (
        <text x={w / 2} y={ty} textAnchor="middle" fontSize={T.micro} fontWeight={700}>
          {a > 0 && <tspan fill={shade(DT.hr, 0.25)}>{a + " " + tx("h") + " "}</tspan>}
          <tspan fill={shade(DT.min, 0.25)}>{b + " " + tx("min")}</tspan>
        </text>
      )}
    </g>
  );
}

function DurationTrack(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): the track is laid out from box.w, so it fits x 64 to 964 with the panel open */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default DurationTrack;