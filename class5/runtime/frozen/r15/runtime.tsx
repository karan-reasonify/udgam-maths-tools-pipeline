import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
/* the one bundled library: every press and every drag. The host strips imports, so port
   inlines it into the standalone .tsx and the host emulator proves it runs (docs/BUILD_CARD.md §5). */
import { useDrag as useGestureDrag } from "@use-gesture/react";

/* ═══════════════════════════════════════════════════════════════════════════════════
   CLASS 4 RUNTIME v1 · FROZEN 2026-09-21 from the reference tool M1.S1.T2.C4.2D1.
   class4/docs/LAYOUT.md is its picture; change it only with a decision logged in docs/BUILD_CARD.md §7.

   Prepended to a tool's tool.tsx for the preview (runtime/mascot.tsx goes in between),
   and inlined into the standalone <MEDIA_ID>.tsx at port, so the shipped file needs
   nothing but React. Host scope: the only import left after port is react; the only bare
   hooks are useState, useEffect, useRef, useMemo, useCallback. Everything the child sees
   OUTSIDE the working area lives here, so a tool never re-types it: stage bands and zones,
   header, canvas, runs box, slot and pad, bubble and mascot, phase dots, type scale,
   colours, sounds, voice, scoring, the events, idle and restart, user and AI mode.
   Source of every number: maths_lp/maths_agent/TOOL_BUILD_SPEC.md.
   ═══════════════════════════════════════════════════════════════════════════════════ */

/* ── tokens ───────────────────────────────────────────────────────────────────────── */

/* type scale, in stage units. Every size comes from here; nothing is below 28. */
const T = { display: 72, xl: 56, speech: 44, prompt: 40, label: 32, micro: 28 };

/* content colours: Okabe-Ito, locked across the book. They fill countable things only;
   chrome never borrows them. A hundred is blue, a ten amber, a loose one green. */
const CONTENT = { hundred: "#0072B2", ten: "#E69F00", one: "#009E73", bead: "#CC79A7", pointer: "#D55E00", line: "#2B2B2B" };

/* chrome defaults: the Udgam Class 4 plan's own tool_config.style.chrome. */
const DEFAULT_CHROME = { paper: "#FFFDF7", panel: "#F2E4CE", ink: "#2B2B2B", rule: "#C9BCA6", dim: "#9AA4AC", accent: "#5B6770" };

/* the stage: 1600×900, three bands, fixed boxes */
const Z = {
  header: { x: 0, y: 0, w: 1600, h: 80 },
  canvas: { x: 40, y: 92, w: 1520, h: 654 },
  runs: { x: 64, y: 108, w: 330, h: 76 },
  work: { x: 64, y: 202, w: 1086, h: 528 },
  slot: { x: 1186, y: 250, w: 356, h: 92 },
  pad: { x: 1170, y: 368, w: 388, h: 363 },
  voice: { x: 28, y: 704, w: 204, h: 194 },
  bubble: { x: 254, y: 748, w: 656, h: 144 },
  bar: { x: 930, y: 782, w: 630, h: 58 },
};
const W = Z.work;
/* the mascot stands in the voice zone but below the working-area floor (730), so it never
   covers a card; its feet are on the ground line */
const MASCOT_BOX = { x: 28, y: 738, w: 204, h: 160 };
const HIT = 72; /* the smallest finger box, in stage units (about 46 px on a 1024-wide tablet) */
/* the agent's verbs on window.toolApi, the same eleven the NCERT Class 4 tools expose */
const TOOL_API = ["getState", "gotoStep", "say", "answer", "check", "reset", "next", "prev", "highlight", "setParam", "playDemo"];
const FONT = "Poppins, 'Segoe UI', system-ui, -apple-system, sans-serif";
const RAD = { card: 28, panel: 20, key: 18, piece: 10 };
const EDGE = 5; /* a control's face sinks this far onto its solid edge when pressed */
const POINTS = 5;

/* the three cues every Class 4 tool shares (identical in every plan slot), plus a soft tick
   for a piece snapping into place */
const AUDIO = {
  correct: { type: "triangle", notes: [659.25, 880, 1174.66], spacing: 0.075, sparkle: { at: 0.16, freq: 1567.98, type: "sine" } },
  win: { notes: [523.25, 659.25, 783.99, 1046.5], spacing: 0.13, tail: [1318.51, 1567.98] },
  wrong: { type: "sine", peak: 0.13, slides: [[392, 330], [294, 233]] },
};

/* ── numbers: written and spoken the way the book does it ─────────────────────────── */

const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven",
  "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const under100 = (n: number) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : ""));
const under1000 = (n: number) => [Math.floor(n / 100) ? ONES[Math.floor(n / 100)] + " hundred" : "", n % 100 ? under100(n % 100) : ""].filter(Boolean).join(" ");

/** Indian system, no "and": 738000 → "seven lakh thirty-eight thousand". */
function words(v: number): string {
  let n = Math.trunc(Number(v));
  if (!isFinite(n)) return "";
  if (n === 0) return "zero";
  if (n < 0) return "minus " + words(-n);
  const crore = Math.floor(n / 1e7), lakh = Math.floor(n / 1e5) % 100, thousand = Math.floor(n / 1e3) % 100, rest = n % 1000;
  return [crore ? words(crore) + " crore" : "", lakh ? under100(lakh) + " lakh" : "",
    thousand ? under100(thousand) + " thousand" : "", rest ? under1000(rest) : ""].filter(Boolean).join(" ");
}

/** International system: 5687709 → "five million six hundred eighty-seven thousand seven hundred nine". */
function wordsIntl(v: number): string {
  let n = Math.trunc(Number(v));
  if (!isFinite(n)) return "";
  if (n === 0) return "zero";
  if (n < 0) return "minus " + wordsIntl(-n);
  const parts: string[] = [];
  [["billion", 1e9], ["million", 1e6], ["thousand", 1e3]].forEach(([name, size]: any) => {
    const k = Math.floor(n / size) % 1000;
    if (k) parts.push(under1000(k) + " " + name);
  });
  if (n % 1000) parts.push(under1000(n % 1000));
  return parts.join(" ");
}

/** Indian grouping 3-2-2: 738000 → "7,38,000". */
function indian(v: number): string {
  const s = String(Math.trunc(Math.abs(Number(v))));
  const head = s.slice(0, -3), tail = s.slice(-3);
  return (Number(v) < 0 ? "-" : "") + (head ? head.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," : "") + tail;
}

/** International grouping: 5687709 → "5,687,709". */
function intl(v: number): string {
  return (Number(v) < 0 ? "-" : "") + String(Math.trunc(Math.abs(Number(v)))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function roman(v: number): string {
  let n = Math.trunc(Number(v));
  const table: [number, string][] = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [k, r] of table) while (n >= k) { out += r; n -= k; }
  return out;
}

/* the book's names: a half, a quarter (not "a fourth"); past twelve the ordinal (twenty-first, thirty-second) */
const ORDINAL: Record<number, string> = { 2: "half", 3: "third", 4: "quarter", 5: "fifth", 6: "sixth", 7: "seventh", 8: "eighth", 9: "ninth", 10: "tenth", 12: "twelfth" };
function fractionWords(a: number, b: number): string {
  if (b === 1) return words(a) + " over one";
  const unit = ORDINAL[b] || sayOrdinal(b);
  const plural = a === 1 ? unit : unit === "half" ? "halves" : unit + "s";
  return words(a) + " " + plural;
}

/* 3 -> third, 21 -> twenty-first, 40 -> fortieth */
function sayOrdinal(n: number): string {
  const IRR: Record<string, string> = { one: "first", two: "second", three: "third", five: "fifth", eight: "eighth", nine: "ninth", twelve: "twelfth" };
  return words(n).replace(/([a-z]+)$/, (last: string) => IRR[last] || (last.endsWith("y") ? last.slice(0, -1) + "ieth" : last + "th"));
}
const SAY_UNIT: Record<string, [string, string]> = {
  km: ["kilometre", "kilometres"], m: ["metre", "metres"], cm: ["centimetre", "centimetres"], mm: ["millimetre", "millimetres"],
  kg: ["kilogram", "kilograms"], g: ["gram", "grams"], mg: ["milligram", "milligrams"],
  L: ["litre", "litres"], l: ["litre", "litres"], mL: ["millilitre", "millilitres"], ml: ["millilitre", "millilitres"],
  hr: ["hour", "hours"], hrs: ["hour", "hours"], min: ["minute", "minutes"], sec: ["second", "seconds"],
};
const sayNumOf = (x: string) => Number(String(x).replace(/,/g, ""));
const SAY_NUM = "(\\d{1,3}(?:,\\d{2,3})+|\\d+)";

/** Every spoken line is words, never digits or symbols. The bubble keeps the printed form (₹12.50,
    8:25, 5 km, 12 × 4); the voice hears twelve rupees fifty paise, eight twenty-five, five kilometres,
    twelve times four. No lookbehind (older iPads cannot parse it). */
function speakable(s: any): string {
  if (s === null || s === undefined) return "";
  return String(s)
    /* money: ₹12.50 or Rs. 12.50 -> twelve rupees fifty paise; ₹1 -> one rupee; ₹0.75 -> seventy-five paise */
    .replace(new RegExp("(?:₹|\\bRs\\.?)\\s?" + SAY_NUM + "(?:\\.(\\d{1,2}))?", "g"), (_m: string, r: string, p: string) => {
      const rs = sayNumOf(r), ps = p ? Number(p.length === 1 ? p + "0" : p) : 0;
      return [rs || !ps ? words(rs) + (rs === 1 ? " rupee" : " rupees") : "", ps ? words(ps) + " paise" : ""].filter(Boolean).join(" ");
    })
    /* clock time: 8:25 -> eight twenty-five, 8:05 -> eight oh five, 8:00 -> eight o'clock */
    .replace(/\b(\d{1,2}):(\d{2})\b/g, (_m: string, h: string, mm: string) => {
      const mi = Number(mm);
      return words(Number(h)) + " " + (mi === 0 ? "o'clock" : mi < 10 ? "oh " + words(mi) : words(mi));
    })
    /* ordinals and degrees */
    .replace(/\b(\d+)(st|nd|rd|th)\b/g, (_m: string, n: string) => sayOrdinal(Number(n)))
    .replace(/(\d+)\s?°/g, (_m: string, n: string) => words(Number(n)) + (Number(n) === 1 ? " degree" : " degrees"))
    /* a unit after a number: 5 km -> 5 kilometres (the number is turned into words below) */
    .replace(new RegExp(SAY_NUM + "(\\.\\d+)?\\s?(km|cm|mm|mg|kg|mL|ml|hrs|hr|min|sec|m|g|L|l)\\b", "g"),
      (_m: string, n: string, d: string, u: string) => n + (d || "") + " " + SAY_UNIT[u][!d && sayNumOf(n) === 1 ? 0 : 1])
    /* operators */
    .replace(/\s*×\s*/g, " times ").replace(/\s*÷\s*/g, " divided by ").replace(/\s*−\s*/g, " minus ")
    .replace(/\s+=\s+/g, " equals ").replace(/(\d)=(?=\d)/g, "$1 equals ")
    .replace(/\s+\+\s+/g, " plus ").replace(/(\d)\+(?=\d)/g, "$1 plus ")
    .replace(/(\d)\s+-\s+(?=\d)/g, "$1 minus ")
    /* mixed numbers (3 2/5 -> three and two fifths), fractions, then whole numbers and decimals */
    .replace(/\b(\d+) (\d+)\s*\/\s*(\d+)/g, (_m: string, w: string, a: string, b: string) => words(Number(w)) + " and " + fractionWords(Number(a), Number(b)))
    .replace(/(\d+)\s*\/\s*(\d+)/g, (_m: string, a: string, b: string) => fractionWords(Number(a), Number(b)))
    .replace(/(\d{1,3}(?:,\d{2,3})+|\d+)(?:\.(\d+))?/g, (_m: string, int: string, dec: string) => {
      let w = words(Number(String(int).replace(/,/g, "")));
      if (dec) w += " point " + String(dec).split("").map((d) => ONES[Number(d)]).join(" ");
      return w;
    });
}

/* ── small helpers ────────────────────────────────────────────────────────────────── */

function mix(hex: string, toward: string, t: number): string {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = p(hex), b = p(toward);
  return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0")).join("");
}
const tint = (hex: string, t: number) => mix(hex, "#ffffff", t);
const shade = (hex: string, t: number) => mix(hex, "#000000", t);

/** Greedy word wrap by character budget (stage text has no layout engine). */
function wrapText(s: string, max: number): string[] {
  const out: string[] = [];
  let line = "";
  for (const w of String(s || "").split(/\s+/).filter(Boolean)) {
    if (!line) line = w;
    else if ((line + " " + w).length <= max) line += " " + w;
    else { out.push(line); line = w; }
  }
  if (line) out.push(line);
  return out;
}

/** One spoken line → bubble-sized pieces: a sentence at a time. A sentence is split (at commas, then
    words) only when it cannot fit three lines at T.prompt, so the bubble never ends on a fragment
    like "then press enter." (No regex lookbehind: it does not parse on Safari before 16.4.) */
function pieces(line: string, max = 80): string[] {
  const out: string[] = [];
  const cut = (s: string, re: RegExp) => s.replace(re, "$1\u0001").split("\u0001").map((x) => x.trim()).filter(Boolean);
  /* a clause with no comma is split at words into balanced chunks, so nothing is ever cut off */
  const balanced = (s: string) => {
    const target = Math.ceil(s.length / Math.ceil(s.length / max));
    const res: string[] = [];
    let cur = "";
    for (const w of s.split(/\s+/).filter(Boolean)) {
      if (cur && (cur + " " + w).length > target + 6) { res.push(cur); cur = w; } else cur = cur ? cur + " " + w : w;
    }
    if (cur) res.push(cur);
    return res;
  };
  for (const s of cut(String(line), /([.!?।])\s+/g)) {   /* । ends a Hindi sentence */
    if (s.length <= max) { out.push(s); continue; }
    let cur = "";
    for (const part of cut(s, /(,)\s+/g)) {
      if (!cur && part.length <= max) cur = part;
      else if (cur && (cur + " " + part).length <= max) cur += " " + part;
      else {
        if (cur) out.push(cur);
        cur = "";
        if (part.length <= max) cur = part;
        else out.push(...balanced(part));
      }
    }
    if (cur) out.push(cur);
  }
  return out;
}

/** First number in a free-text answer ("10,000, which is…" → 10000); null when there is none. */
function leadNumber(s: any): number | null {
  if (typeof s === "number") return s;
  const m = /-?\d{1,3}(?:,\d{2,3})+(?:\.\d+)?|-?\d+(?:\.\d+)?/.exec(String(s ?? ""));
  return m ? Number(m[0].replace(/,/g, "")) : null;
}

/** A two-part answer (quotient and remainder; later km and m, hours and minutes): its boxes' values in
    order, as digit strings. Reads the slot's "16|1", an array [16, 1], or free text ("16 remainder 1"). */
function slotPartsOf(v: any, n: number): string[] {
  const s = String(v ?? "");
  const a: any[] = Array.isArray(v) ? v : s.includes("|") ? s.split("|") : s.match(/\d[\d,]*/g) || [];
  return Array.from({ length: n }, (_, k) => String(a[k] ?? "").replace(/[^0-9]/g, ""));
}
/** Right only when every box holds its own number; a box left empty is never right, except a box whose
    answer is null in a mixed number (5 has no fraction part, 7/10 no whole part): that one must stay empty. */
function judgeSlotParts(item: any, v: any): boolean {
  const want = Array.isArray(item.answer) ? item.answer : [];
  const got = slotPartsOf(v, want.length);
  const none = (x: any) => x === null || x === undefined || x === "";
  return want.length > 0 && want.some((x: any) => !none(x))
    && want.every((x: any, k: number) => (none(x) ? got[k] === "" : got[k] !== "" && Number(got[k]) === Number(x)));
}

/* A fraction answer, drawn stacked in the slot: the numerator box over a bar over the denominator box
   (answer [3, 4]). A mixed number adds a whole box on the left; any of its boxes may stay empty (a whole
   number alone, a fraction alone, or both: answer [5, null, null], [null, 7, 10], [1, 2, 3]), so the slot
   never tells the child which kind of answer it wants. `at` places a box in the stack; `free` lets it
   stay empty. */
const SLOT_FRACTION = [{ label: "numerator", at: "top" }, { label: "denominator", at: "bottom" }];
const SLOT_MIXED = [{ label: "whole", at: "whole", free: true }, { label: "numerator", at: "top", free: true },
  { label: "denominator", at: "bottom", free: true }];
/** Enough typed to answer: every box that may not stay empty is filled, a fraction has both of its
    numbers or neither, and something is filled. */
function slotComplete(parts: any[], ps: string[]): boolean {
  if (ps.every((p) => p === "")) return false;
  const top = parts.findIndex((p: any) => p.at === "top"), bot = parts.findIndex((p: any) => p.at === "bottom");
  if (top >= 0 && bot >= 0 && (ps[top] === "") !== (ps[bot] === "")) return false;
  return parts.every((p: any, k: number) => p.free || ps[k] !== "");
}

/* ── sound: Web Audio oscillators, no files; muted is honoured at the source ─────────── */

function makeSfx(mutedRef: any) {
  let ctx: any = null;
  const ac = () => {
    if (mutedRef.current) return null;
    try {
      ctx = ctx || new ((window as any).AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    } catch (e) { return null; }
  };
  const tone = (c: any, f: number, t0: number, dur: number, type: string, peak: number, fTo?: number) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t0);
    if (fTo) o.frequency.exponentialRampToValueAtTime(fTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.03);
  };
  return {
    correct() {
      const c = ac(); if (!c) return;
      const t = c.currentTime + 0.01, A = AUDIO.correct;
      A.notes.forEach((f, i) => tone(c, f, t + i * A.spacing, 0.18, A.type, 0.11));
      tone(c, A.sparkle.freq, t + A.sparkle.at, 0.25, A.sparkle.type, 0.05);
    },
    wrong() {
      const c = ac(); if (!c) return;
      const t = c.currentTime + 0.01, A = AUDIO.wrong;
      A.slides.forEach(([a, b], i) => tone(c, a, t + i * 0.17, 0.15, A.type, A.peak, b));
    },
    win() {
      const c = ac(); if (!c) return;
      const t = c.currentTime + 0.01, A = AUDIO.win;
      A.notes.forEach((f, i) => tone(c, f, t + i * A.spacing, 0.24, "triangle", 0.1));
      A.tail.forEach((f, i) => tone(c, f, t + A.notes.length * A.spacing + i * 0.09, 0.3, "sine", 0.05));
    },
    tick() {
      const c = ac(); if (!c) return;
      tone(c, 1320, c.currentTime + 0.005, 0.05, "sine", 0.045);
    },
  };
}

/* ── voice: the device's own speech engine + the printed bubble, synced the NCERT way ────
   A run is a list of lines, said in order, each printed as it is said (NCERT voice rules V5-V21):
   - a line advances when the engine says it ended, never on a guess; a line whose end never
     comes is released after its reading time plus 6 s, and a stale callback (a line that is
     no longer the one in flight) does nothing, so cancelling never skips a line;
   - MUTE KEEPS THE PLACE (V21): muting stops the audio at once, but the line stays in the
     bubble for the time it had left and the run never jumps ahead; unmuting speaks the REST of
     that same line, from the start of the word it had reached (the engine's own word boundary
     where it gives one, the elapsed share of the reading time where it does not);
   - Indian English first, then UK English, then any English, never a voice of another language
     (V18); voices that load late are waited for; speech the browser blocks until the first tap
     is picked up again, mid-line, on that tap;
   - SOUND IS ALWAYS ON unless the child (or the host) mutes it. A browser that refuses speech until
     the first tap in the page (Chrome's autoplay rule, e.g. right after a reload) makes the lesson
     wait on its first line behind a one-tap "Tap to start" cover; that tap speaks the line from its
     start, so nothing is missed. Where speech is allowed, no cover ever appears;
   - with no voice at all (muted, headless, no English voice) the bubble paces itself at
     max(2.4 s, 68 ms a character), about as long as the line takes to say (V15);
   - `speaking` is true only while audio actually plays, so the mascot moves only then;
   - unmounting stops the voice and every timer (V16). */

const readMs = (s: string) => Math.max(2400, String(s).length * 68);
/* a callback reachable two ways (a speech `done`, and a fallback timer for when "Say it again" or a
   mute/unmute race silently drops that `done`): the first one to fire wins, the other is a no-op.
   phaseEnd's own closing-line walk was the first place this pattern was needed; teach and demo entries
   need it too (a stage that only a speech `done` can leave must never depend on speech finishing once). */
const fireOnce = (fn: () => void) => { let gone = false; return () => { if (gone) return; gone = true; fn(); }; };

/* Spoken: a plain string (English — so a tool written before Hindi/Gujarati arrived still runs), or
   the three shipped languages' own copy of one line, keyed 'en' | 'hi' | 'gu'. lineFor reads the one
   in use, falling back to English then to whichever is there. A Hindi or Gujarati Spoken value must
   already write its numbers as words (V13 in the sibling pipeline's own rule): speakable() below is
   English-only and is skipped for any other language, never converted for it. */
function lineFor(say: any, lang: string, table?: any): string {
  if (say === null || say === undefined) return "";
  /* a plain English string: the tool's TR table (`TR = { hi: { "<English line>": "<Hindi>" }, gu: {...} }`)
     gives its translation, so the English the checks read never changes shape; an untranslated line
     stays English */
  if (typeof say === "string") return (lang !== "en" && table && table[lang] && table[lang][say]) || say;
  return say[lang] ?? say.en ?? (Object.values(say).find((v: any) => typeof v === "string") as any) ?? "";
}

/* ── numbers in Hindi and Gujarati: every number 0-99 has its own word, so a table, not rules ── */
const HI_0_99 = ("शून्य एक दो तीन चार पाँच छह सात आठ नौ दस ग्यारह बारह तेरह चौदह पंद्रह सोलह सत्रह अठारह उन्नीस "
  + "बीस इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस "
  + "चालीस इकतालीस बयालीस तैंतालीस चवालीस पैंतालीस छियालीस सैंतालीस अड़तालीस उनचास पचास इक्यावन बावन तिरपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ "
  + "साठ इकसठ बासठ तिरसठ चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर सतहत्तर अठहत्तर उन्यासी "
  + "अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सत्तासी अट्ठासी नवासी नब्बे इक्यानवे बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे").split(" ");
const GU_0_99 = ("શૂન્ય એક બે ત્રણ ચાર પાંચ છ સાત આઠ નવ દસ અગિયાર બાર તેર ચૌદ પંદર સોળ સત્તર અઢાર ઓગણીસ "
  + "વીસ એકવીસ બાવીસ તેવીસ ચોવીસ પચ્ચીસ છવ્વીસ સત્તાવીસ અઠ્ઠાવીસ ઓગણત્રીસ ત્રીસ એકત્રીસ બત્રીસ તેત્રીસ ચોત્રીસ પાંત્રીસ છત્રીસ સાડત્રીસ આડત્રીસ ઓગણચાલીસ "
  + "ચાલીસ એકતાલીસ બેતાલીસ તેતાલીસ ચુંમાલીસ પિસ્તાલીસ છેતાલીસ સુડતાલીસ અડતાલીસ ઓગણપચાસ પચાસ એકાવન બાવન ત્રેપન ચોપન પંચાવન છપ્પન સત્તાવન અઠ્ઠાવન ઓગણસાઠ "
  + "સાઠ એકસઠ બાસઠ ત્રેસઠ ચોસઠ પાંસઠ છાસઠ સડસઠ અડસઠ ઓગણસિત્તેર સિત્તેર એકોતેર બોતેર તોતેર ચુમ્મોતેર પંચોતેર છોતેર સિત્યોતેર ઇઠ્યોતેર ઓગણએંસી "
  + "એંસી એક્યાસી બ્યાસી ત્યાસી ચોર્યાસી પંચાસી છ્યાસી સિત્યાસી ઇઠ્યાસી નેવ્યાસી નેવું એકાણું બાણું ત્રાણું ચોરાણું પંચાણું છન્નું સત્તાણું અઠ્ઠાણું નવ્વાણું").split(" ");
/* Gujarati joins the hundreds into one word (બસો, not બે સો) */
const GU_HUNDREDS = ["", "એકસો", "બસો", "ત્રણસો", "ચારસો", "પાંચસો", "છસો", "સાતસો", "આઠસો", "નવસો"];
const BIG_WORDS: Record<string, string[]> = { hi: ["सौ", "हज़ार", "लाख", "करोड़", "ऋण"], gu: ["સો", "હજાર", "લાખ", "કરોડ", "ઋણ"] };

/** A whole number in words, Indian system, in the language in use: 10512 -> "दस हज़ार पाँच सौ बारह". */
function wordsIn(v: number, lang: string): string {
  if (lang !== "hi" && lang !== "gu") return words(v);
  const T = lang === "hi" ? HI_0_99 : GU_0_99, [H, TH, L, CR, NEG] = BIG_WORDS[lang];
  let n = Math.trunc(Number(v));
  if (!isFinite(n)) return "";
  if (n < 0) return NEG + " " + wordsIn(-n, lang);
  if (n < 100) return T[n];
  const u1000 = (x: number) => {
    const h = Math.floor(x / 100), r = x % 100;
    return [h ? (lang === "gu" ? GU_HUNDREDS[h] : T[h] + " " + H) : "", r ? T[r] : ""].filter(Boolean).join(" ");
  };
  const crore = Math.floor(n / 1e7), lakh = Math.floor(n / 1e5) % 100, thou = Math.floor(n / 1e3) % 100, rest = n % 1000;
  return [crore ? wordsIn(crore, lang) + " " + CR : "", lakh ? T[lakh] + " " + L : "", thou ? T[thou] + " " + TH : "",
    rest ? u1000(rest) : ""].filter(Boolean).join(" ");
}

/* the voice and the bubble in the language in use: English goes through speakable() exactly as
   before; Hindi and Gujarati turn their numbers (Indian commas, decimals) and the operators into
   words, so a translation keeps its digits just as the English does */
const OP_WORDS: Record<string, string[]> = { hi: ["गुणा", "भाग", "घटा", "जमा", "बराबर", "दशमलव"], gu: ["ગુણ્યા", "ભાગ્યા", "ઓછા", "વત્તા", "બરાબર", "દશાંશ"] };
function speakableIn(s: any, lang: string): string {
  if (lang !== "hi" && lang !== "gu") return speakable(s);
  if (s === null || s === undefined) return "";
  const [TIMES, DIV, MINUS, PLUS, EQ, POINT] = OP_WORDS[lang], T = lang === "hi" ? HI_0_99 : GU_0_99;
  return String(s)
    .replace(/\s*×\s*/g, " " + TIMES + " ").replace(/\s*÷\s*/g, " " + DIV + " ").replace(/\s*−\s*/g, " " + MINUS + " ")
    .replace(/\s+=\s+/g, " " + EQ + " ").replace(/(\d)=(?=\d)/g, "$1 " + EQ + " ")
    .replace(/\s+\+\s+/g, " " + PLUS + " ").replace(/(\d)\+(?=\d)/g, "$1 " + PLUS + " ").replace(/(\d)\s+-\s+(?=\d)/g, "$1 " + MINUS + " ")
    .replace(/(\d{1,3}(?:,\d{2,3})+|\d+)(?:\.(\d+))?/g, (_m: string, int: string, dec: string) =>
      wordsIn(Number(String(int).replace(/,/g, "")), lang) + (dec ? " " + POINT + " " + dec.split("").map((d) => T[Number(d)]).join(" ") : ""));
}
/* the voice tag each shipped language asks the device for */
const LANG_TAG: Record<string, string> = { en: "en-IN", hi: "hi-IN", gu: "gu-IN" };

/* the language's own voice: exact tag, then any voice of that language. Indian English first for
   English, exactly as before Hindi/Gujarati existed (lang omitted or "en" runs the same code path,
   byte for byte). NEVER falls back to an English voice for a Hindi or Gujarati line: an English voice
   reading Devanagari or Gujarati script is worse than silence, and a silent line still captions, rings
   and paces itself on its own timer (readMs) — no device anywhere is guaranteed to ship those voices. */
function pickVoice(lang?: string): any {
  try {
    const all = (window as any).speechSynthesis.getVoices() || [];
    const tag = LANG_TAG[lang || "en"] || LANG_TAG.en, base = tag.split("-")[0];
    if (base !== "en") {
      return all.find((v: any) => v.lang === tag)
        ?? all.find((v: any) => String(v.lang || "").replace("_", "-").toLowerCase().startsWith(base + "-"))
        ?? all.find((v: any) => String(v.lang || "").toLowerCase() === base)
        ?? null;
    }
    const en = all.filter((v: any) => /^en([-_]|$)/i.test(v.lang || ""));
    if (!en.length) return null;
    const score = (v: any) => {
      const n = String(v.name || "").toLowerCase(), l = String(v.lang || "").toLowerCase().replace("_", "-");
      let s = l === "en-in" ? 100 : l === "en-gb" ? 40 : /^en-(au|ie|za|nz)$/.test(l) ? 30 : l === "en-us" ? 20 : 10;
      if (/natural|neural|online|premium|enhanced|wavenet/.test(n)) s += 25;
      if (/female|heera|neerja|veena|kalpana|zira|samantha|karen|moira|tessa|serena|google uk english female/.test(n)) s += 10;
      if (v.localService === false) s -= 5; /* a network voice can lag or drop offline */
      if (/espeak|robot|whisper|novelty|bad news|bells|jester|zarvox/.test(n)) s -= 60;
      return s;
    };
    return en.slice().sort((a: any, b: any) => score(b) - score(a))[0];
  } catch (e) { return null; }
}

/* ── baked voice: real recorded clips, when a tool carries them (r11) ─────────────────────
   A tool declares its own top-level `const TOOL_VOICE: Record<string, string>` (a bubble PIECE's
   exact text -> an inline `data:audio/...;base64,...` clip) in tool.tsx — never here, and never
   redeclared by the runtime, so a tool that declares neither (every tool up to now) is unaffected:
   `typeof TOOL_VOICE` is a safe check on a name that may not exist anywhere in the file.
   INLINE ONLY, ALWAYS: the host contract admits no network or storage API in a shipped tool
   (BUILD_CARD.md §1) — the sibling Tool_Pipeline's own externalise-to-a-fetched-file step (its
   `ship.py`) cannot exist here, so every clip a tool carries travels inside the one file, and the
   1 MB port limit is raised for a tool that bakes voice (`lib/ship/port.mjs`).
   BAKED OR SILENT (the sibling's own "V22" rule): once a tool carries any clip, a piece with none
   of its own paces itself silently — it is never handed to the device engine, since a real
   recording beside a robotic default voice on the very next line reads as broken, not as a
   graceful fallback.
   Baked per PIECE (the same units `pieces()` already splits a line into for the bubble), so the
   existing time-based pause/resume machinery (`reached`/`restMs`, already agnostic to where `r.span`
   comes from) works unchanged: a clip's own decoded duration simply becomes `r.span`. */
const voiceMap = (): Record<string, string> => (typeof TOOL_VOICE !== "undefined" ? (TOOL_VOICE as any) : {});
/* BAKED OR SILENT is decided PER LANGUAGE (r15): a tool that carries Hindi and Gujarati clips speaks those
   two only from its clips, and English, with no clip of its own, keeps the device voice exactly as
   before (so the English voice checks still judge the path a child hears) */
const hasBakedVoice = (lang?: string) => Object.keys(voiceMap()).some((t) => voicePieceLang(t) === (lang || "en"));

let voiceCtx: any = null;
const ensureVoiceCtx = () => {
  try {
    voiceCtx = voiceCtx || new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    if (voiceCtx.state === "suspended") voiceCtx.resume();
    return voiceCtx;
  } catch (e) { return null; }
};
const voiceBuf: Record<string, any> = {};                     /* decoded AudioBuffer, by piece text */
let voiceSrc: any = null;                                     /* the clip node currently playing, if any */
/* ⛔ WEB AUDIO ONLY, never an <audio> element or the `Audio` constructor: a host CSP without
   `media-src data:` blocks a data-URI media element outright (silent in production, working in
   preview); `decodeAudioData` is not subject to CSP, and needs no network API either. */
const stopClip = () => { if (voiceSrc) { try { voiceSrc.onended = null; voiceSrc.stop(); } catch (e) {} voiceSrc = null; } };
/* a clip not yet decoded, decoded once and cached by its exact piece text */
const voiceDecode = (text: string): Promise<any> => {
  if (voiceBuf[text]) return Promise.resolve(voiceBuf[text]);
  const uri = voiceMap()[text];
  if (!uri) return Promise.reject(new Error("no clip for this piece"));
  const ctx = ensureVoiceCtx();
  if (!ctx) return Promise.reject(new Error("no audio context"));
  const b = atob(uri.slice(uri.indexOf(",") + 1)), a = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
  return ctx.decodeAudioData(a.buffer).then((buf: any) => { voiceBuf[text] = buf; return buf; });
};
/* which shipped language a piece of text is written in, from its script alone */
const voicePieceLang = (text: string) => (/[઀-૿]/.test(text) ? "gu" : /[ऀ-ॿ]/.test(text) ? "hi" : "en");
/* decode the language's clips ahead of being needed, four at a time, so the first line of a phase
   is not the one that has to win the 2.5 s decode race in `utter` */
let voiceWarm = "";
const warmVoice = (lang: string) => {
  const vm = voiceMap();
  if (voiceWarm === lang || !Object.keys(vm).length) return;
  voiceWarm = lang;
  const todo = Object.keys(vm).filter((text) => voicePieceLang(text) === lang);
  let next = 0;
  const pump = () => { if (voiceWarm !== lang || next >= todo.length) return; voiceDecode(todo[next++]).then(pump, pump); };
  for (let k = 0; k < 4; k++) pump();
};

function useVoice(mutedRef: any, langRef: any, cfg: { rate: number; pitch: number }) {
  const [line, setLine] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const token = useRef(0);             /* the run: a new run makes every older callback stale */
  const last = useRef<string[]>([]);
  const cur = useRef<any>(null);       /* the line in flight: { text, base, t0, span, mark, done } */
  const timers = useRef<any[]>([]);
  const blocked = useRef(false);       /* the browser refused speech until the child's first tap */
  const [needsTap, setNeedsTap] = useState(false);
  const waited = useRef(false);        /* voices that load late are waited for once */
  const synth = () => (typeof window !== "undefined" && (window as any).speechSynthesis) || null;
  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(() => { timers.current = timers.current.filter((x) => x !== t); fn(); }, ms);
    timers.current.push(t);
  };
  const flush = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  /* stops BOTH the device engine and any baked clip: whichever this tool actually uses, the other
     call is a harmless no-op, so every existing call site stops the right thing without a branch */
  const stopEngine = () => { try { const s = synth(); if (s) s.cancel(); } catch (e) {} stopClip(); };
  /* how far into the line we are, in characters */
  const reached = (r: any) => {
    const share = (Date.now() - r.t0) / Math.max(1, r.span);
    const byTime = r.base + Math.round(share * (r.text.length - r.base));
    return Math.max(0, Math.min(r.text.length, Math.max(r.mark, byTime)));
  };
  const restMs = (text: string, from: number) => Math.max(400, Math.round(readMs(text) * (1 - from / Math.max(1, text.length))));
  /* back to the start of the word we are in, so a resume never begins mid-word */
  const wordStart = (text: string, at: number) => { let k = Math.min(at, text.length); while (k > 0 && /\S/.test(text[k - 1])) k--; return k; };

  /* speak (or silently time) line r from character `from` on: one path for a fresh line and a resume */
  const utter = (r: any, from: number) => {
    r.base = from; r.t0 = Date.now(); r.span = restMs(r.text, from); r.mark = from;
    const quiet = (ms: number) => later(() => { if (cur.current === r) r.done(); }, ms);
    if (hasBakedVoice(langRef.current)) {
      /* BAKED OR SILENT: this tool speaks only from its own recorded clips, never the device engine */
      if (blocked.current && !mutedRef.current) { setSpeaking(false); setNeedsTap(true); return; }
      if (mutedRef.current) { setSpeaking(false); quiet(r.span); return; }
      const uri = voiceMap()[r.text];
      if (!uri) { setSpeaking(false); quiet(r.span); return; }         /* an unbaked piece: silent, never device */
      const uid = (r.uid = (r.uid || 0) + 1);
      const live = () => cur.current === r && r.uid === uid;
      let settled = false;
      const giveUp = () => { if (settled || !live()) return; settled = true; setSpeaking(false); quiet(r.span); };
      /* a clip that has not arrived in 2.5 s runs its line silently on its own timer, exactly like one
         that will not decode: a slow network never holds the child, and never hands the line to the
         device engine mid-tool */
      later(giveUp, 2500);
      voiceDecode(r.text).then((buf: any) => {
        if (settled || !live()) return;
        const ctx = ensureVoiceCtx();
        if (!ctx) { giveUp(); return; }
        if (ctx.state !== "running") { settled = true; blocked.current = true; setSpeaking(false); setNeedsTap(true); return; }
        settled = true;
        const offset = Math.min(Math.max(from / Math.max(1, r.text.length), 0), 1) * buf.duration;
        r.t0 = Date.now(); r.span = Math.max(200, (buf.duration - offset) * 1000); r.mark = from;
        try {
          stopEngine();
          const src = ctx.createBufferSource();
          src.buffer = buf; src.connect(ctx.destination);
          src.onended = () => { if (live()) { setSpeaking(false); r.done(); } };
          voiceSrc = src;
          src.start(0, offset);
          setSpeaking(true);
        } catch (e) { setSpeaking(false); quiet(r.span); }
      }, giveUp);
      return;
    }
    const s = synth();
    if (blocked.current && !mutedRef.current) { setSpeaking(false); setNeedsTap(true); return; } /* hold this line for the tap */
    if (mutedRef.current || !s || typeof (window as any).SpeechSynthesisUtterance === "undefined") {
      setSpeaking(false); quiet(r.span); return;
    }
    const v = pickVoice(langRef.current);
    if (!v) {
      setSpeaking(false); quiet(r.span);
      /* the voice list is often empty until `voiceschanged`: wait once, then speak on from here */
      if (!waited.current) {
        waited.current = true;
        let fired = false;
        const go = () => {
          if (fired) return; fired = true;
          try { s.removeEventListener && s.removeEventListener("voiceschanged", go); } catch (e) {}
          if (cur.current === r && !mutedRef.current && pickVoice(langRef.current)) { flush(); utter(r, wordStart(r.text, reached(r))); }
        };
        try { s.addEventListener && s.addEventListener("voiceschanged", go); } catch (e) {}
        later(go, 1500);
      }
      return;
    }
    try {
      stopEngine();
      /* each utterance has its own id: a cancelled one that reports its end late (some browsers do,
         on a later tick) is stale even when its line is live again after a resume */
      const uid = (r.uid = (r.uid || 0) + 1);
      const live = () => cur.current === r && r.uid === uid;
      const u = new (window as any).SpeechSynthesisUtterance(r.text.slice(from));
      u.voice = v; u.lang = v.lang; u.rate = cfg.rate; u.pitch = cfg.pitch;
      u.onstart = () => { if (live()) setSpeaking(true); };
      u.onboundary = (e: any) => { if (live() && e && typeof e.charIndex === "number") r.mark = from + e.charIndex; };
      u.onend = () => { if (!live()) return; setSpeaking(false); r.done(); };
      u.onerror = (e: any) => {
        if (!live()) return;
        setSpeaking(false);
        /* the browser wants a tap first: hold this line (no timer) until it comes */
        if (e && e.error === "not-allowed") { blocked.current = true; setNeedsTap(true); flush(); return; }
        /* an engine that errors at once must not race the run: the line keeps its reading time */
        flush(); quiet(restMs(r.text, r.base) - Math.min(Date.now() - r.t0, restMs(r.text, r.base) - 400));
      };
      s.speak(u);
      later(() => { if (live()) { setSpeaking(false); r.done(); } }, r.span + 6000);
    } catch (e) { setSpeaking(false); quiet(r.span); }
  };

  const hush = useCallback(() => {
    token.current++;
    cur.current = null; flush(); stopEngine(); setSpeaking(false);
  }, []);

  const speak = useCallback((lines: any, done?: () => void) => {
    const run = ++token.current;
    cur.current = null; flush(); stopEngine(); setSpeaking(false);
    if (hasBakedVoice(langRef.current)) warmVoice(langRef.current);
    /* numbers and operators into words in the language in use (speakable() for English, as before) */
    const list = (Array.isArray(lines) ? lines : [lines])
      .map((l: any) => speakableIn(l, langRef.current))
      .filter(Boolean).flatMap((l: string) => pieces(l));
    last.current = list;
    const step = (i: number) => {
      if (run !== token.current) return;
      if (i >= list.length) { cur.current = null; setSpeaking(false); if (done) done(); return; }
      const text = list[i];
      setLine(text);
      if (/\d/.test(text)) console.warn("[voice] a spoken line still contains a digit:", text);
      let spent = false;
      const r: any = { text, base: 0, t0: Date.now(), span: readMs(text), mark: 0,
        done: () => { if (spent || run !== token.current) return; spent = true; if (cur.current === r) cur.current = null; step(i + 1); } };
      cur.current = r;
      utter(r, 0);
    };
    step(0);
  }, []);

  /* muted mid-line: silence now, keep the place; the line finishes silently in the time it had left */
  const pause = useCallback(() => {
    const r = cur.current;
    setSpeaking(false); setNeedsTap(false);
    if (!r) { stopEngine(); return; }
    const at = reached(r);
    r.uid = (r.uid || 0) + 1; /* the utterance being cancelled is stale from here, whenever it reports */
    cur.current = null; stopEngine(); flush(); cur.current = r;
    r.base = at; r.t0 = Date.now(); r.span = restMs(r.text, at); r.mark = at;
    later(() => { if (cur.current === r) r.done(); }, r.span);
  }, []);

  /* unmuted mid-line: speak the rest of that same line, from the start of the word it had reached */
  const resume = useCallback(() => {
    const r = cur.current;
    if (!r || mutedRef.current) return;
    blocked.current = false;
    const at = wordStart(r.text, reached(r));
    if (at >= r.text.length - 2) return; /* all but said: let it finish quietly */
    cur.current = null; stopEngine(); flush(); cur.current = r;
    utter(r, at);
  }, []);

  /* the browser refused speech until a tap: the tap (anywhere, or on the cover) speaks the held line
     from its start, inside the gesture, and the lesson carries on */
  const unlock = useCallback(() => {
    if (!blocked.current) return;
    blocked.current = false;
    setNeedsTap(false);
    const r = cur.current;
    if (r && !mutedRef.current) { r.uid = (r.uid || 0) + 1; flush(); utter(r, 0); }
  }, []);
  useEffect(() => {
    window.addEventListener("pointerdown", unlock, true);
    window.addEventListener("keydown", unlock, true);
    return () => { window.removeEventListener("pointerdown", unlock, true); window.removeEventListener("keydown", unlock, true); };
  }, [unlock]);

  /* "Say it again": replays the last lines. A caller mid-way to a stage change (teach -> ask, a phase's
     closing line -> the next phase) passes that same done back in, so the replay itself carries the
     advance rather than leaving it to a padded fallback timer alone. */
  const repeat = useCallback((done?: () => void) => { if (last.current.length) speak(last.current, done); }, [speak]);
  const again = useCallback(() => repeat(), [repeat]);
  useEffect(() => () => hush(), [hush]);
  const state = () => ({ voice: hasBakedVoice(langRef.current) ? "baked clips" : (() => { const v = pickVoice(langRef.current); return v ? `${v.name} (${v.lang})` : null; })(), blocked: blocked.current, inFlight: cur.current ? cur.current.text : null });
  return { line, speaking, needsTap, unlock, speak, hush, pause, resume, again, repeat, state };
}

/* ── questions: the host bank first, the authored fallback when it does not fit ───────── */

/* fit = the tool's adapter from a host question to one of its own items (null = does not fit).
   Without one, a host item is read as a spoken question with a numeric answer. */
function bankFor(P: any, phase: any, fit?: (q: any, phase: any) => any): any[] {
  const host = P.questions ?? (P.additionalProps && P.additionalProps.questions);
  if (Array.isArray(host) && host.length) {
    const mine = host.filter((q: any) => q && (q.phase === undefined || q.phase === null || Number(q.phase) === Number(phase.n)));
    const norm = fit
      ? mine.map((q: any) => fit(q, phase)).filter(Boolean)
      : mine.map((q: any) => ({
        say: q.question || q.prompt || q.text || "",
        ask: q.ask || "",
        answer: leadNumber(q.answer ?? q.final_answer ?? q.correct ?? q.value),
        miss: q.miss || q.hint || "",
        host: true,
      })).filter((q: any) => q.answer !== null);
    if (norm.length) return norm;
  }
  return phase.items && phase.items.length ? phase.items : [{ say: "", ask: "", answer: null }];
}

/* ── drawing primitives ───────────────────────────────────────────────────────────── */

function Defs({ C }: any) {
  const g = (id: string, top: string, bottom: string) => (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={top} />
      <stop offset="1" stopColor={bottom} />
    </linearGradient>
  );
  const shadow = (id: string, dy: number, sd: number, op: number) => (
    <filter id={id} x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy={dy} stdDeviation={sd} floodColor="#3A2E1C" floodOpacity={op} />
    </filter>
  );
  return (
    <defs>
      {g("gCard", "#FFFFFF", C.paper)}
      {g("gKey", "#FFFFFF", tint(C.panel, 0.3))}
      {g("gPanel", tint(C.panel, 0.45), C.panel)}
      {g("gAccent", tint(C.accent, 0.22), C.accent)}
      {g("gHundred", tint(CONTENT.hundred, 0.28), CONTENT.hundred)}
      {g("gTen", tint(CONTENT.ten, 0.3), CONTENT.ten)}
      {g("gOne", tint(CONTENT.one, 0.28), CONTENT.one)}
      {g("gBead", tint(CONTENT.bead, 0.28), CONTENT.bead)}
      {g("gPointer", tint(CONTENT.pointer, 0.28), CONTENT.pointer)}
      {shadow("fShadow", 6, 7, 0.16)}
      {shadow("fShadowSoft", 3, 3, 0.14)}
      {shadow("fLift", 14, 10, 0.24)}
      {shadow("fBtnDown", 1, 1.5, 0.18)}
    </defs>
  );
}

/* "One thing invites a finger": a single gentle ring. Put it on the one thing to touch. */
function Invite({ x, y, r = 56, C }: any) {
  return <circle className="c4-pulse" cx={x} cy={y} r={r} fill="none" stroke={(C && C.accent) || DEFAULT_CHROME.accent} strokeWidth={5} pointerEvents="none" />;
}

/* ── motion and touch primitives ─────────────────────────────────────────────────── */

/** prefers-reduced-motion: everything that staggers arrives at once. */
function reducedMotion(): boolean {
  try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
}

/** A cancellable run of timed steps [[ms, fn], …]: fn runs, then the step waits ms.
    Under reduced motion every wait is near zero. A new run cancels the old one. */
function useTimeline() {
  const token = useRef(0);
  const timers = useRef<any[]>([]);
  const [busy, setBusy] = useState(false);
  const stop = useCallback(() => { token.current++; timers.current.forEach(clearTimeout); timers.current = []; setBusy(false); }, []);
  const run = useCallback((steps: any[], done?: () => void) => {
    token.current++; timers.current.forEach(clearTimeout); timers.current = [];
    const t = token.current, fast = reducedMotion();
    setBusy(true);
    let i = 0;
    const next = () => {
      if (t !== token.current) return;
      if (i >= steps.length) { setBusy(false); if (done) done(); return; }
      const [ms, fn] = steps[i++];
      try { if (fn) fn(); } catch (e) { console.error(e); }
      timers.current.push(setTimeout(next, fast ? Math.min(ms, 25) : ms));
    };
    next();
  }, []);
  useEffect(() => stop, [stop]);
  return { run, stop, busy };
}

/* screen point -> stage point, through the svg the event happened in */
function stagePoint(ev: any, x: number, y: number): { x: number; y: number } | null {
  const el = ev && ev.target;
  const svg = el && (el.ownerSVGElement || (el.closest && el.closest("svg")));
  if (!svg || !svg.getScreenCTM) return null;
  const pt = svg.createSVGPoint(); pt.x = x; pt.y = y;
  const p = pt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: p.x, y: p.y };
}

/** Drag with a finger, a pen or a mouse, in working-area units (gestures: @use-gesture).
    Spread {...bind(payload)} and {...keys(payload)} on the piece. A move under 8 units is a tap,
    and Enter or Space on a focused piece is a tap too; onDrop(payload, point, moved) fires on
    release, and a tap means "put it where it belongs". */
/* drags still open (a drag whose release never arrived is the stuck-drag bug; the checks read this) */
const DRAGS = { live: 0 };
function useDrag(onDrop: (payload: any, p: { x: number; y: number }, moved: boolean) => void) {
  const [drag, setDrag] = useState<any>(null);
  const dropRef = useRef(onDrop);
  dropRef.current = onDrop;
  const live = useRef<any>(null);
  const bind = useGestureDrag(({ args, first, last, xy, event, canceled }: any) => {
    const payload = args && args[0];
    if (first) {
      const s = stagePoint(event, xy[0], xy[1]);
      if (!s) return;
      const p0 = { x: s.x - W.x, y: s.y - W.y };
      live.current = { payload, p0, p: p0, moved: false, svgEvent: event };
      DRAGS.live++;
      setDrag({ payload, x: p0.x, y: p0.y, moved: false });
    }
    const d = live.current;
    if (!d) return;
    if (!first) {
      const s = stagePoint(event, xy[0], xy[1]) || stagePoint(d.svgEvent, xy[0], xy[1]);
      if (s) d.p = { x: s.x - W.x, y: s.y - W.y };
      if (Math.hypot(d.p.x - d.p0.x, d.p.y - d.p0.y) > 8) d.moved = true;
      if (!last) setDrag({ payload: d.payload, x: d.p.x, y: d.p.y, moved: d.moved });
    }
    if (last) {
      live.current = null;
      DRAGS.live = Math.max(0, DRAGS.live - 1);
      setDrag(null);
      if (!canceled) dropRef.current(d.payload, d.p, d.moved);
      pointerBlur();
    }
  }, { pointer: { keys: false, capture: false } });
  const keys = (payload: any) => ({
    onKeyDown: (e: any) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault(); e.stopPropagation();
      dropRef.current(payload, { x: NaN, y: NaN }, false);
    },
  });
  return { drag, bind: (payload: any) => ({ ...bind(payload), "data-drag": "", onMouseDown: (e: any) => e.preventDefault() }), keys };
}

/** After any press — finger, mouse or the keyboard's Enter/Space — focus goes back to the page: the
    physical Enter then answers, working area free from every control (`digits, Enter, Backspace and
    Escape work anywhere`, LAYOUT §7), rather than being caught by whatever still holds stale focus and
    pressing that again. Tab still focuses for the next control; the ring shows while it does. */
function pointerBlur() {
  const a: any = typeof document !== "undefined" ? document.activeElement : null;
  if (a && a !== document.body && typeof a.blur === "function") a.blur();
}

/** Press like a real key on touch, pen, mouse and keyboard (gestures: @use-gesture): the face
    sinks while held, it fires once on release, and a finger that slides away cancels it. */
function usePress(onPress: () => void, enabled = true) {
  const [down, setDown] = useState(false);
  const act = useRef(onPress);
  act.current = onPress;
  const on = useRef(enabled);
  on.current = enabled;
  const gb = useGestureDrag(({ down: d, tap }: any) => {
    if (!on.current) { setDown(false); return; }
    setDown(d);
    if (tap) { act.current(); pointerBlur(); }
  }, { filterTaps: true, tapsThreshold: 12, pointer: { keys: false } });
  /* a mouse or finger press never takes the focus (a finger's focus arrives after the tap, too late to blur):
     the keyboard's Enter then answers; Tab still focuses for keyboard users */
  const bind = () => ({ ...gb(), onMouseDown: (e: any) => e.preventDefault() });
  /* a Tab-focused control's own Enter/Space "presses" it once, then blurs (pointerBlur, as a tap does):
     without this, typing a digit or letting a two-box caret move on leaves DOM focus stale on a control
     the child has moved past, and the physical Enter that should submit is swallowed by that control's
     own key handler instead of reaching the window (found on a real Tab-only playthrough of Tenth Strip:
     Tab to a pad key, type ".3" on the physical keys, Enter re-pressed the stale-focused key instead of
     submitting). Digits, Backspace and Escape never hit a control's own handler, so only Enter needed this. */
  const keys = (e: any) => {
    if (!on.current || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault(); e.stopPropagation();
    setDown(true);
    setTimeout(() => setDown(false), 120);
    act.current();
    pointerBlur();
  };
  return { down, bind, keys };
}

/** An invisible tap target on the working area (a column, a gap): finger, pen, mouse, Enter or Space. */
/* `enabled: false` keeps the box focusable but lets Enter and Space pass to the window, so a cell that
   holds the pad (api.capture) can answer with the next Enter instead of re-opening itself (PATTERNS §5). */
function Hit({ id, x, y, w, h, onPress, label, enabled = true }: any) {
  const p = usePress(onPress, enabled);
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label || id}
      x={x} y={y} width={w} height={h} fill="transparent" {...p.bind()} onKeyDown={p.keys} />
  );
}

/** Props that make a working-area piece a keyboard-reachable control (drag pieces add bind/keys). */
const control = (id: string, label?: string) => ({ "data-control": id, role: "button", tabIndex: 0, "aria-label": label || id });

/* ── toy pieces ───────────────────────────────────────────────────────────────────── */

/** A counter: a top-lit disc with a gloss and a shadow. paint = a gradient id (gOne, gHundred…).
    flat: no shadow of its own (wrap a whole group in one filter instead; cheaper on a tablet). */
function Disc({ x, y, r = 18, paint, lift, ring, flat }: any) {
  return (
    <g filter={flat ? undefined : lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <circle cx={x} cy={y} r={r} fill={`url(#${paint})`} stroke={ring || "#00000022"} strokeWidth={ring ? 4 : 1.5} />
      <ellipse cx={x - r * 0.28} cy={y - r * 0.4} rx={r * 0.42} ry={r * 0.2} fill="#FFFFFF" fillOpacity={0.5} />
    </g>
  );
}

/** Base-ten blocks with the value printed on the face, top-left at (x, y):
    one 36×36 · ten 36×72 ruled in tens · hundred 72×72 ruled ten by ten · thousand a cube (88×88).
    label={false} for a block under another in a pile, so no value peeks out from underneath. */
const BLOCK_SIZE: Record<string, { w: number; h: number }> = { one: { w: 36, h: 36 }, ten: { w: 36, h: 72 }, hundred: { w: 72, h: 72 }, thousand: { w: 88, h: 88 } };
function Block({ kind, x, y, paint, base, lift, label: labelled = true }: any) {
  const face = `url(#${paint})`, edge = shade(base, 0.25), rule = tint(base, 0.35);
  const label = { one: "1", ten: "10", hundred: "100", thousand: "1,000" }[kind as string];
  const txt = (cx: number, cy: number) => labelled && (
    <text x={cx} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF" stroke={edge} strokeWidth={3} paintOrder="stroke">{label}</text>
  );
  const lines = (x0: number, y0: number, w: number, h: number, nx: number, ny: number) => (
    <g stroke={rule} strokeWidth={1.2}>
      {Array.from({ length: nx - 1 }).map((_, i) => <line key={"v" + i} x1={x0 + (w * (i + 1)) / nx} y1={y0} x2={x0 + (w * (i + 1)) / nx} y2={y0 + h} />)}
      {Array.from({ length: ny - 1 }).map((_, i) => <line key={"h" + i} x1={x0} y1={y0 + (h * (i + 1)) / ny} x2={x0 + w} y2={y0 + (h * (i + 1)) / ny} />)}
    </g>
  );
  return (
    <g filter={lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      {kind === "thousand" ? (
        <g>
          <path d={`M ${x} ${y + 16} L ${x + 16} ${y} L ${x + 88} ${y} L ${x + 72} ${y + 16} Z`} fill={tint(base, 0.3)} stroke={edge} strokeWidth={2} />
          <path d={`M ${x + 72} ${y + 16} L ${x + 88} ${y} L ${x + 88} ${y + 72} L ${x + 72} ${y + 88} Z`} fill={shade(base, 0.12)} stroke={edge} strokeWidth={2} />
          <rect x={x} y={y + 16} width={72} height={72} fill={face} stroke={edge} strokeWidth={2} />
          {lines(x, y + 16, 72, 72, 10, 10)}
          {txt(x + 36, y + 52)}
        </g>
      ) : (
        <g>
          <rect x={x} y={y} width={BLOCK_SIZE[kind].w} height={BLOCK_SIZE[kind].h} rx={kind === "one" ? 7 : 5} fill={face} stroke={edge} strokeWidth={2} />
          {kind === "ten" && lines(x, y, 36, 72, 1, 10)}
          {kind === "hundred" && lines(x, y, 72, 72, 10, 10)}
          {txt(x + BLOCK_SIZE[kind].w / 2, y + BLOCK_SIZE[kind].h / 2)}
        </g>
      )}
    </g>
  );
}

/* a control on the curve system: solid edge behind, gradient face that sinks onto it while held.
   The pressed look is state, not CSS :active, so it shows on a tablet too. A disabled key is
   drawn flat and quiet (no edge, no gloss), never faded with opacity. */
function Key({ id, x, y, w, h, C, primary, onClick, children, rx = RAD.key, disabled, label }: any) {
  const p = usePress(onClick || (() => {}), !disabled);
  const base = primary ? shade(C.accent, 0.28) : shade(C.rule, 0.08);
  return (
    <g className={"c4-ctl" + (disabled ? " is-off" : "") + (p.down ? " is-down" : "")} data-control={id} role="button"
      aria-label={label || id} aria-disabled={disabled ? "true" : undefined} tabIndex={disabled ? -1 : 0}
      {...(disabled ? {} : p.bind())} onKeyDown={p.keys}>
      {!disabled && <rect x={x} y={y + EDGE} width={w} height={h} rx={rx} fill={base} />}
      <g className="c4-body" style={{ transform: `translateY(${!disabled && p.down ? EDGE : 0}px)` } as any}>
        <rect className="c4-face" x={x} y={y} width={w} height={h} rx={rx}
          fill={disabled ? tint(C.panel, 0.55) : primary ? "url(#gAccent)" : "url(#gKey)"}
          stroke={disabled ? tint(C.rule, 0.35) : primary ? shade(C.accent, 0.18) : C.rule} strokeWidth={2} />
        {!disabled && <path d={`M ${x + rx} ${y + 3} H ${x + w - rx}`} stroke="#FFFFFF" strokeOpacity={primary ? 0.4 : 0.95} strokeWidth={3} strokeLinecap="round" />}
        <g transform={`translate(${x + w / 2},${y + h / 2})`}>{children}</g>
      </g>
    </g>
  );
}

/* a round header control: 56 across, with a 72-unit finger box around it */
function RoundControl({ id, cx, cy, C, onClick, children, label }: any) {
  const p = usePress(onClick || (() => {}));
  return (
    <g className={"c4-ctl" + (p.down ? " is-down" : "")} data-control={id} role="button" aria-label={label || id} tabIndex={0}
      {...p.bind()} onKeyDown={p.keys}>
      <circle cx={cx} cy={cy} r={HIT / 2} fill="transparent" />
      <circle cx={cx} cy={cy + 4} r={28} fill={shade(C.rule, 0.08)} />
      <g className="c4-body" style={{ transform: `translateY(${p.down ? 4 : 0}px)` } as any}>
        <circle className="c4-face" cx={cx} cy={cy} r={28} fill="url(#gKey)" stroke={C.rule} strokeWidth={2} />
        <path d={`M ${cx - 13} ${cy - 24} A 28 28 0 0 1 ${cx + 13} ${cy - 24}`} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" />
        <g transform={`translate(${cx},${cy})`}>{children}</g>
      </g>
    </g>
  );
}

/* icons: 48-unit box centred on 0,0, bold round strokes */
const ICON = { fill: "none", strokeWidth: 4.5, strokeLinecap: "round", strokeLinejoin: "round" } as any;
function IconAgain({ c }: any) {
  return <g {...ICON} stroke={c}><path d="M -13 -9 h 26 a 5 5 0 0 1 5 5 v 11 a 5 5 0 0 1 -5 5 h -13 l -8 7 v -7 h -5 a 5 5 0 0 1 -5 -5 v -11 a 5 5 0 0 1 5 -5 z" /></g>;
}
function IconSound({ c, on }: any) {
  return (
    <g {...ICON} stroke={c}>
      <path d="M -14 -5 h 7 l 9 -8 v 26 l -9 -8 h -7 z" />
      {on ? <path d="M 7 -7 a 10 10 0 0 1 0 14 M 11 -12 a 17 17 0 0 1 0 24" /> : <path d="M 6 -11 L 19 11" />}
    </g>
  );
}
function IconRestart({ c }: any) {
  return <g {...ICON} stroke={c}><path d="M 12 -8 a 14 14 0 1 0 2 12" /><path d="M 13 -16 v 9 h -9" /></g>;
}
function IconBack({ c }: any) {
  return <g {...ICON} stroke={c}><path d="M -20 0 l 10 -12 h 26 a 4 4 0 0 1 4 4 v 16 a 4 4 0 0 1 -4 4 h -26 z" /><path d="M 2 -5 l -7 5 l 7 5" /></g>;
}
function IconEnter({ c }: any) {
  return <g {...ICON} stroke={c}><path d="M 16 -12 v 8 a 6 6 0 0 1 -6 6 h -24" /><path d="M -8 -5 l -7 7 l 7 7" /></g>;
}

/* ── the frame: header, canvas, runs, working area, slot + pad, footer ────────────── */

const CSS = `
.c4-frame{width:min(100vw,177.78vh);height:min(100vh,56.25vw)}
@supports (height:100dvh){.c4-frame{width:min(100vw,177.78dvh);height:min(100dvh,56.25vw)}}
.c4{display:block;font-family:${FONT};-webkit-tap-highlight-color:transparent}
.c4 text{font-family:${FONT}}
.c4-ctl,.c4-hit{cursor:pointer;outline:none}
.c4-ctl .c4-body{transition:transform 70ms ease-out}
.c4-fill{transition:width 480ms ease-out}
[data-drag],.c4-ctl,.c4-hit{touch-action:none;-webkit-user-select:none;user-select:none}
.c4-ctl.is-down .c4-face{filter:url(#fBtnDown)}
.c4-ctl.is-off,.c4-quiet .c4-ctl{cursor:default}
.c4-quiet .c4-ctl{pointer-events:none}
@media (hover:hover){.c4-ctl:not(.is-off):hover .c4-face{stroke:var(--c4-accent);stroke-width:3}}
.c4-ctl:focus,.c4-hit:focus{outline:none}
.c4-ctl:focus-visible .c4-face{stroke:var(--c4-focus);stroke-width:5}
.c4-hit:focus-visible,.c4-piece:focus-visible{outline:4px solid var(--c4-focus);outline-offset:2px}
.c4-piece{outline:none}
.c4-pulse{transform-box:fill-box;transform-origin:center;animation:c4pulse 1.8s ease-out infinite}
@keyframes c4pulse{0%{transform:scale(.92);opacity:.65}75%{transform:scale(1.22);opacity:0}100%{transform:scale(1.22);opacity:0}}
.c4-caret{animation:c4blink 1.1s steps(1) infinite}
@keyframes c4blink{50%{opacity:0}}
.c4-talk{transform-box:fill-box;transform-origin:50% 100%;animation:c4talk .9s ease-in-out infinite}
@keyframes c4talk{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-5px) rotate(-1.5deg)}}
.c4-ring{animation:c4ring 1.2s ease-in-out infinite}
@keyframes c4ring{50%{stroke-opacity:.35}}
@media (prefers-reduced-motion:reduce){.c4-pulse,.c4-caret,.c4-talk,.c4-ring{animation:none}.c4-ctl .c4-body{transition:none}.c4-fill{transition:none}}
`;

/* the runtime's OWN chrome text (never a tool's content) in the three shipped languages. A tool never
   sets these directly; only the host's `lang` prop does (like `operatorMode`). Hindi and Gujarati
   routinely run longer than the English they replace, so a layout must still fit the longest of the
   three (LAYOUT.md); this first pass is a working draft and wants a native-speaker review before a
   chapter ships in Hindi or Gujarati, the same way a maths reviewer reads English wording today. */
const UI_STRINGS: Record<string, any> = {
  en: {
    again: "Say it again", soundOff: "Sound off", soundOn: "Sound on", restart: "Start this phase again",
    rubOut: "Rub out", enter: "Enter", point: "Point", freePlay: "Free play", playAgain: "Play again",
    wellDone: "Well done!", tapToStart: "Tap to start", freePlayLine: "Free play.",
    rightFirstTime: (a: number, b: number) => `Right first time: ${a} / ${b}`,
    phaseOf: (n: number, N: number) => `Phase ${n} of ${N}`,
    questionOf: (i: number, total: number) => `Question ${i} of ${total}`,
    stepOf: (k: number, N: number) => `Step ${k} of ${N}`,
    word: { now: "now", done: "done", "not yet": "not yet" },
  },
  hi: {
    again: "दोबारा सुनें", soundOff: "ध्वनि बंद", soundOn: "ध्वनि चालू", restart: "यह चरण फिर से शुरू करें",
    rubOut: "मिटाएँ", enter: "दर्ज करें", point: "बिंदु", freePlay: "मुक्त खेल", playAgain: "फिर से खेलें",
    wellDone: "बहुत बढ़िया!", tapToStart: "शुरू करने के लिए स्पर्श करें", freePlayLine: "मुक्त खेल।",
    rightFirstTime: (a: number, b: number) => `पहली बार में सही: ${a} / ${b}`,
    phaseOf: (n: number, N: number) => `चरण ${n}, ${N} में से`,
    questionOf: (i: number, total: number) => `प्रश्न ${i}, ${total} में से`,
    stepOf: (k: number, N: number) => `चरण ${k}, ${N} में से`,
    word: { now: "अभी", done: "पूरा", "not yet": "अभी नहीं" },
  },
  gu: {
    again: "ફરી સાંભળો", soundOff: "અવાજ બંધ", soundOn: "અવાજ ચાલુ", restart: "આ તબક્કો ફરી શરૂ કરો",
    rubOut: "ભૂંસો", enter: "દાખલ કરો", point: "બિંદુ", freePlay: "મુક્ત રમત", playAgain: "ફરી રમો",
    wellDone: "ખૂબ સરસ!", tapToStart: "શરૂ કરવા સ્પર્શ કરો", freePlayLine: "મુક્ત રમત.",
    rightFirstTime: (a: number, b: number) => `પ્રથમ પ્રયાસમાં સાચા: ${a} / ${b}`,
    phaseOf: (n: number, N: number) => `તબક્કો ${n}, ${N} માંથી`,
    questionOf: (i: number, total: number) => `પ્રશ્ન ${i}, ${total} માંથી`,
    stepOf: (k: number, N: number) => `તબક્કો ${k}, ${N} માંથી`,
    word: { now: "હમણાં", done: "પૂર્ણ", "not yet": "હજી નહીં" },
  },
};

function Header({ C, name, title, soundOn, onAgain, onSound, onRestart, UI }: any) {
  const nameRef = useRef<any>(null);
  const [nameW, setNameW] = useState(String(name).length * T.label * 0.56);
  useEffect(() => {
    try { const w = nameRef.current && nameRef.current.getComputedTextLength(); if (w > 0) setNameW(w); } catch (e) {}
  }, [name]);
  const dotX = 40 + nameW + 22;
  const room = 1336 - (dotX + 22); /* the finger box of "again" starts at 1352 */
  const perChar = T.label * 0.55;
  const shown = String(title).length * perChar > room ? String(title).slice(0, Math.max(4, Math.floor(room / perChar) - 1)) + "…" : title;
  return (
    <g data-zone="header">
      <text ref={nameRef} x={40} y={53} fontSize={T.label} fontWeight={600} fill={C.ink}>{name}</text>
      <circle cx={dotX} cy={42} r={6} fill={C.accent} />
      <text x={dotX + 22} y={53} fontSize={T.label} fontWeight={500} fill={C.accent}>{shown}</text>
      {/* the three header controls, the same in every Class 4 tool and in both modes; 72 apart, so
          their finger boxes tile and never overlap */}
      <RoundControl id="again" label={UI.again} cx={1388} cy={40} C={C} onClick={onAgain}><IconAgain c={C.ink} /></RoundControl>
      <RoundControl id="sound" label={soundOn ? UI.soundOff : UI.soundOn} cx={1460} cy={40} C={C} onClick={onSound}><IconSound c={C.ink} on={soundOn} /></RoundControl>
      <RoundControl id="restart" label={UI.restart} cx={1532} cy={40} C={C} onClick={onRestart}><IconRestart c={C.ink} /></RoundControl>
    </g>
  );
}

/* one box of a two-part answer: a tap or Space puts the caret in it; Enter on the box that already has
   the caret goes on to the window, so it answers (or moves on) as Enter does anywhere else */
function SlotPartBox({ id, label, x, y, w, h, on, enabled, onPick }: any) {
  const p = usePress(onPick, enabled);
  const keys = (e: any) => { if (e.key === "Enter" && on) return; p.keys(e); };
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label}
      x={x} y={y} width={w} height={h} fill="transparent" {...p.bind()} onKeyDown={keys} />
  );
}

/* a fraction answer (SLOT_FRACTION, SLOT_MIXED): the numerator cell over a bar over the denominator cell,
   in the slot's one white box, with the whole cell on its left in a mixed number. Each cell's finger box is
   72 tall and they tile at the bar (the top one reaches up beside the question, the lower one down to the pad) */
function SlotStack({ C, parts, typed, active, live, format, part, onPart }: any) {
  const np = parts.length, vals = slotPartsOf(typed, np);
  const k = (at: string) => parts.findIndex((p: any) => p.at === at);
  const iw = k("whole"), it = k("top"), ib = k("bottom");
  const cw = 132, ch = 38, ww = 110, gap = 30;
  const left = iw >= 0 ? Z.slot.x + (Z.slot.w - (ww + gap + cw)) / 2 : 0;
  const fx = iw >= 0 ? left + ww + gap : Z.slot.x + (Z.slot.w - cw) / 2;
  const split = iw >= 0 ? left + ww + gap / 2 : Z.slot.x;
  const barY = Z.slot.y + 46;
  const shownOf = (j: number) => String(format ? format(vals[j], j) : vals[j]);
  const cell = (j: number, x: number, y: number, w: number, h: number, size: number, hit: any) => {
    if (j < 0) return null;
    const on = active && j === part, shown = shownOf(j), nw = shown.length * size * 0.58;
    return (
      <g key={j}>
        {/* an empty cell has to read as "write here" on its own, without waiting for the caret: the
            fraction cells are less than half the whole cell's height, so they carry its edge, not a thinner one */}
        <rect x={x} y={y} width={w} height={h} rx={8} fill={mix(C.panel, "#FFFFFF", 0.3)}
          stroke={on ? C.accent : C.rule} strokeWidth={on ? 3 : 2.5} />
        <text x={x + w / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={600} fill={C.ink}>{shown}</text>
        {on && <rect className="c4-caret" x={x + w / 2 + nw / 2 + 4} y={y + (h - size * 0.8) / 2} width={3} height={size * 0.8} rx={1.5} fill={C.accent} />}
        <SlotPartBox id={"part-" + (j + 1)} label={parts[j].label + " box"} x={hit.x} y={hit.y} w={hit.w} h={hit.h}
          on={on} enabled={live ?? active} onPick={() => onPart && onPart(j)} />
      </g>
    );
  };
  const fw = Z.slot.x + Z.slot.w - split;
  return (
    <g>
      <rect x={Z.slot.x} y={Z.slot.y} width={Z.slot.w} height={Z.slot.h} rx={RAD.panel} fill="#FFFFFF"
        stroke={active ? C.accent : C.rule} strokeWidth={active ? 4 : 2} filter="url(#fShadowSoft)" />
      <rect x={fx - 12} y={barY - 2} width={cw + 24} height={4} rx={2} fill={C.ink} />
      {cell(iw, left, Z.slot.y + 4, ww, Z.slot.h - 8, T.speech, { x: Z.slot.x, y: Z.slot.y, w: split - Z.slot.x, h: Z.slot.h })}
      {cell(it, fx, barY - 4 - ch, cw, ch, T.label, { x: split, y: barY - HIT, w: fw, h: HIT })}
      {cell(ib, fx, barY + 4, cw, ch, T.label, { x: split, y: barY, w: fw, h: HIT })}
    </g>
  );
}

function Slot({ C, ask, typed, active, live, format, parts, part, onPart }: any) {
  const lines = wrapText(ask || "", 15).slice(0, 3);
  const askLines = lines.map((ln, k) => (
    <text key={k} x={Z.slot.x} y={236 - (lines.length - 1 - k) * 46} fontSize={T.prompt} fontWeight={500} fill={C.ink}>{ln}</text>
  ));
  if (parts && parts.length && parts.some((p: any) => p.at)) return (
    <g data-zone="slot">
      {askLines}
      <SlotStack C={C} parts={parts} typed={typed} active={active} live={live} format={format} part={part} onPart={onPart} />
    </g>
  );
  if (parts && parts.length) {
    /* a two-part answer: one box a part, side by side, each named at its top (quotient, remainder) and
       carrying its unit after the number (mL); the caret sits in the box the digits go to */
    const np = parts.length, gap = 16, bw = (Z.slot.w - gap * (np - 1)) / np;
    const vals = slotPartsOf(typed, np);
    const quiet = mix(C.ink, "#FFFFFF", 0.3);
    return (
      <g data-zone="slot">
        {askLines}
        {parts.map((p: any, k: number) => {
          const x = Z.slot.x + k * (bw + gap), cx = x + bw / 2, on = active && k === part;
          const shown = String(format ? format(vals[k], k) : vals[k]);
          const unit = p.unit ? String(p.unit) : "";
          const ugap = shown ? 24 : 0; /* room for the caret between the number and its unit */
          const uw = unit ? unit.length * T.micro * 0.55 + ugap : 0;
          const size = shown.length * T.prompt * 0.58 + uw <= bw - 28 ? T.prompt : T.label;
          const nw = shown.length * size * 0.58, left = cx - (nw + uw) / 2;
          return (
            <g key={k}>
              <rect x={x} y={Z.slot.y} width={bw} height={Z.slot.h} rx={RAD.panel} fill="#FFFFFF"
                stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} filter="url(#fShadowSoft)" />
              <text x={x + 16} y={Z.slot.y + 31} fontSize={T.micro} fontWeight={500} fill={quiet}>{p.label}</text>
              <text x={left} y={Z.slot.y + 77} fontSize={size} fontWeight={600} fill={C.ink}>{shown}
                {unit && <tspan dx={ugap} fontSize={T.micro} fontWeight={500} fill={quiet}>{unit}</tspan>}</text>
              {on && <rect className="c4-caret" x={left + nw + 4} y={Z.slot.y + 44} width={4} height={40} rx={2} fill={C.accent} />}
              <SlotPartBox id={"part-" + (k + 1)} label={p.label + " box"} x={x} y={Z.slot.y} w={bw} h={Z.slot.h}
                on={on} enabled={live ?? active} onPick={() => onPart && onPart(k)} />
            </g>
          );
        })}
      </g>
    );
  }
  const shown = String(format ? format(typed) : typed);
  const cx = Z.slot.x + Z.slot.w / 2;
  /* a long answer (a word, a number with commas) drops a size rather than spilling out of the slot */
  const size = shown.length * T.xl * 0.58 <= Z.slot.w - 40 ? T.xl : shown.length * T.speech * 0.58 <= Z.slot.w - 40 ? T.speech : T.prompt;
  const caretX = cx + (shown.length * size * 0.3) + 6;
  return (
    <g data-zone="slot">
      {askLines}
      <rect x={Z.slot.x} y={Z.slot.y} width={Z.slot.w} height={Z.slot.h} rx={RAD.panel} fill="#FFFFFF"
        stroke={active ? C.accent : C.rule} strokeWidth={active ? 4 : 2} filter="url(#fShadowSoft)" />
      <text x={cx} y={Z.slot.y + 46 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={600} fill={C.ink}>{shown}</text>
      {active && <rect className="c4-caret" x={caretX} y={Z.slot.y + 22} width={4} height={50} rx={2} fill={C.accent} />}
    </g>
  );
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0", "enter"];
/* digitsOff: the answer is made on the working area and Enter only commits it. The number keys are not
   drawn at all (not flat, not quiet) — only Enter, in its usual spot, since the child never types a
   digit for this item.
   point: the tool types decimals (tool.pointKey), so the pad has 13 keys on every question, laid out
   as a number pad: 1 2 3 rub out / 4 5 6 / 7 8 9 beside a tall Enter / a wide 0 and the point.
   pointOff: this question's answer has no point (a fraction, two boxes): the point key is flat and off */
function Pad({ C, enabled, digitsOff, onKey, choices, onChoice, point, pointOff, UI, lang, TR }: any) {
  const gap = 12;
  const quiet = mix(C.ink, C.panel, 0.5);
  if (choices && choices.length) {
    const cols = 2, rows = Math.ceil(choices.length / cols);
    const cw = (Z.pad.w - gap) / cols, ch = Math.min(110, (Z.pad.h - EDGE - gap * (rows - 1)) / rows);
    return (
      <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
        {choices.map((c: any, j: number) => {
          const x = Z.pad.x + (j % cols) * (cw + gap), y = Z.pad.y + Math.floor(j / cols) * (ch + gap);
          const lines = wrapText(lineFor(c.label, lang, TR), 10).slice(0, 2);
          return (
            <Key key={c.id} id={"choice-" + c.id} label={lineFor(c.label, lang, TR)} x={x} y={y} w={cw} h={ch} C={C} disabled={!enabled} onClick={() => enabled && onChoice(c.id)}>
              {lines.map((ln: string, k: number) => (
                <text key={k} y={11 + (k - (lines.length - 1) / 2) * 32} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={enabled ? C.ink : quiet}>{ln}</text>
              ))}
            </Key>
          );
        })}
      </g>
    );
  }
  const kw = (Z.pad.w - 2 * gap) / 3, kh = (Z.pad.h - 3 * gap - EDGE) / 4;
  const NAMES: Record<string, string> = { back: UI.rubOut, enter: UI.enter, point: UI.point };
  if (point) {
    const pw = (Z.pad.w - 3 * gap) / 4;
    /* [key, column, row, columns wide, rows tall] */
    const at: any[] = [["1", 0, 0], ["2", 1, 0], ["3", 2, 0], ["back", 3, 0], ["4", 0, 1], ["5", 1, 1], ["6", 2, 1],
      ["enter", 3, 1, 1, 3], ["7", 0, 2], ["8", 1, 2], ["9", 2, 2], ["0", 0, 3, 2], ["point", 2, 3]];
    return (
      <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
        {at.map(([k, c, r, cs = 1, rs = 1]) => {
          /* the point key stays (flat and quiet, per pointOff/pointKey precedent) even with digitsOff:
             a decimal tool's own point-key-off state is a separate, already-settled rule (point-input) */
          if (digitsOff && k !== "enter" && k !== "point") return null;
          const x = Z.pad.x + c * (pw + gap), y = Z.pad.y + r * (kh + gap);
          const w = cs * pw + (cs - 1) * gap, h = rs * kh + (rs - 1) * gap;
          const off = !enabled || (digitsOff && k !== "enter") || (k === "point" && pointOff);
          const ink = off ? quiet : C.ink;
          return (
            <Key key={k} id={"key-" + k} label={NAMES[k] || k} x={x} y={y} w={w} h={h} C={C} primary={k === "enter" && !off} disabled={off}
              onClick={() => !off && onKey(k)}>
              {k === "back" ? <IconBack c={ink} /> : k === "enter" ? <IconEnter c={off ? quiet : "#FFFFFF"} />
                : k === "point" ? <circle cx={0} cy={4} r={8} fill={ink} />
                : <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={ink}>{k}</text>}
            </Key>
          );
        })}
      </g>
    );
  }
  return (
    <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
      {KEYS.map((k, j) => {
        if (digitsOff && k !== "enter") return null;
        const x = Z.pad.x + (j % 3) * (kw + gap), y = Z.pad.y + Math.floor(j / 3) * (kh + gap);
        const off = !enabled;
        const ink = off ? quiet : C.ink;
        return (
          <Key key={k} id={"key-" + k} label={NAMES[k] || k} x={x} y={y} w={kw} h={kh} C={C} primary={k === "enter" && !off} disabled={off}
            onClick={() => !off && onKey(k)}>
            {k === "back" ? <IconBack c={ink} /> : k === "enter" ? <IconEnter c={off ? quiet : "#FFFFFF"} />
              : <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={ink}>{k}</text>}
          </Key>
        );
      })}
    </g>
  );
}

/* the mascot says every line the tool speaks: it bobs only while a line is being spoken and is
   still otherwise. If its picture ever fails to decode, the drawn speaking dot stands in. */
function Mascot({ C, speaking, ok, onFail }: any) {
  const m = MASCOT_BOX;
  return (
    <g data-zone="voice">
      <line x1={m.x + 8} y1={m.y + m.h - 2} x2={m.x + m.w - 8} y2={m.y + m.h - 2} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      {ok ? (
        <image data-role="mascot" className={speaking ? "c4-talk" : undefined} href={MASCOT_IMAGE} x={m.x} y={m.y} width={m.w} height={m.h}
          preserveAspectRatio="xMidYMax meet" aria-hidden="true" pointerEvents="none" onError={onFail} />
      ) : (
        <g data-role="mascot-drawn">
          {speaking && <circle cx={m.x + m.w / 2} cy={820} r={40} fill="none" stroke={C.accent} strokeWidth={5} />}
          <circle cx={m.x + m.w / 2} cy={820} r={30} fill="url(#gAccent)" filter="url(#fShadowSoft)" />
        </g>
      )}
    </g>
  );
}

/* one phase dot. USER mode: a real control that jumps to its phase, its finger box as wide as
   its pitch and 72 tall, so boxes tile and never overlap. AI mode: a picture of progress only. */
/* one segment per phase. The current one fills a part per question as each question starts (question
   1 of 3 a third, the last question full); earlier phases are full colour, later ones empty. */
function PhaseDot({ C, k, N, x, w, now, done, fill = 1, navigable, onGo, UI }: any) {
  const p = usePress(() => onGo(k), navigable);
  const face = done && !now ? "url(#gAccent)" : C.panel;   /* finished = full colour: the bar reads as one fill, left to right */
  const stroke = now || done ? shade(C.accent, 0.15) : C.rule;
  const y = Z.bar.y, h = 20;
  const f = now ? Math.min(Math.max(fill, 0), 1) : done ? 1 : 0;
  const fw = Math.max(h, w * f);
  const word = now ? "now" : done ? "done" : "not yet";
  const seg = (
    <>
      <rect className={navigable ? "c4-face" : undefined} x={x} y={y} width={w} height={h} rx={10} fill={face} stroke={stroke} strokeWidth={2} />
      {now && <rect className="c4-fill" x={x} y={y} width={fw} height={h} rx={10} fill="url(#gAccent)" stroke={shade(C.accent, 0.15)} strokeWidth={2} style={{ width: fw } as any} pointerEvents="none" />}
    </>
  );
  /* data-state/data-fill are machine-read by the checks: always the English word, never translated */
  const data = { "data-state": word === "not yet" ? "later" : word, "data-fill": f.toFixed(3) };
  if (!navigable)
    return <g role="img" aria-label={`${UI.stepOf(k + 1, N)}, ${UI.word[word]}`} {...data}>{seg}</g>;
  return (
    <g className={"c4-ctl c4-dot" + (p.down ? " is-down" : "")} role="button" tabIndex={0} aria-label={UI.stepOf(k + 1, N)}
      aria-current={now ? "step" : undefined} data-control={"phase-" + (k + 1)} {...data} {...p.bind()} onKeyDown={p.keys}>
      <rect x={x - 6} y={y + h / 2 - HIT / 2} width={w + 12} height={HIT} fill="transparent" />
      <rect x={x} y={y + 4} width={w} height={h} rx={10} fill={shade(C.rule, 0.1)} />
      <g className="c4-body" style={{ transform: `translateY(${p.down ? 4 : 0}px)` } as any}>{seg}</g>
    </g>
  );
}

function Footer({ C, line, speaking, n, N, i, total, navigable, done, onGo, mascotOk, onMascotFail, UI }: any) {
  const b = Z.bubble;
  /* two lines at speech size; a longer line drops to label size over three, never spills */
  const big = wrapText(line, 24);
  const size = big.length > 2 ? T.label : T.speech;
  const lines = big.length > 2 ? wrapText(line, 32).slice(0, 3) : big;
  const lh = big.length > 2 ? size + 6 : size + 8;
  const top = b.y + b.h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  const pitch = Z.bar.w / Math.max(N, 1);
  return (
    <g>
      <Mascot C={C} speaking={speaking} ok={mascotOk} onFail={onMascotFail} />
      <g data-zone="bubble">
        <path d={`M ${b.x} ${b.y + 30} L ${b.x - 18} ${b.y + 44} L ${b.x} ${b.y + 58} Z`} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={24} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        <rect x={b.x + 1} y={b.y + 32} width={4} height={24} fill="#FFFFFF" />
        {lines.map((ln, k) => (
          <text key={k} x={b.x + 30} y={top + k * lh} fontSize={size} fontWeight={500} fill={C.ink}>{ln}</text>
        ))}
      </g>
      {/* the phase dots: which phase is on the stage, and (user mode) a way to go to another */}
      <g data-zone="bar" data-mode={navigable ? "user" : "ai"}>
        {Array.from({ length: N }).map((_, k) => (
          <PhaseDot key={k} C={C} k={k} N={N} x={Z.bar.x + k * pitch + 6} w={pitch - 12} now={k === n - 1}
            done={k < n - 1 || (done.includes(k + 1) && k !== n - 1)} fill={Math.min(i + 1, total) / Math.max(total, 1)}
            navigable={navigable} onGo={onGo} UI={UI} />
        ))}
        <text x={Z.bar.x} y={Z.bar.y + 60} fontSize={T.micro} fontWeight={600} fill={C.ink}>{UI.phaseOf(n, N)}</text>
        <text x={Z.bar.x + Z.bar.w} y={Z.bar.y + 60} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{UI.questionOf(Math.min(i + 1, total), total)}</text>
      </g>
    </g>
  );
}

/* ── the summary page (NCERT Class 4): where the last phase, or a whole lesson, ends ─────────────
   Inside the canvas: "Well done!", one row per phase (a dot, the concept, the phase's "You learned"
   line, and the tool's small drawing of the child's own last right answer where that phase was
   played here), the stars and "Right first time" (unless showScore is false), then Free play (if the
   tool has one) and Play again. The frame sends `finished` from it (showSummary). */
function starPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return "M" + pts.join("L") + "Z";
}

function Summary({ C, phases, results, row, showScore, freePlay, onFree, onAgain, Thumb, UI, lang, TR }: any) {
  const N = Math.max(phases.length, 1);
  const top = 188, rowH = Math.min(92, (560 - top) / N);
  const played = Object.keys(results).map(Number);
  const total = played.reduce((a, p) => a + (results[p].total || 0), 0);
  const first = played.reduce((a, p) => a + (results[p].firstTry || 0), 0);
  const ratio = total ? first / total : 0;
  const stars = !played.length ? 0 : ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
  const learnedInk = shade(C.accent, 0.25);
  return (
    <g data-zone="summary">
      <rect x={Z.canvas.x} y={Z.canvas.y} width={Z.canvas.w} height={Z.canvas.h} rx={RAD.card} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} />
      <text x={800} y={156} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{UI.wellDone}</text>
      {phases.map((p: any, k: number) => {
        const y = top + k * rowH, r = results[k + 1];
        return (
          <g key={k} data-row={k}>
            {row === k && <rect className="c4-ring" x={68} y={y - 4} width={1464} height={rowH - 4} rx={18} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
            <circle cx={100} cy={y + 29} r={10} fill={r ? C.accent : "#FFFFFF"} stroke={C.accent} strokeWidth={3} />
            <text x={128} y={y + 40} fontSize={T.label} fontWeight={700} fill={C.ink}>{lineFor(p.concept, lang, TR)}</text>
            <text x={128} y={y + 74} fontSize={T.micro} fontWeight={500} fill={learnedInk}>{lineFor(p.learned, lang, TR)}</text>
            {r && r.last && Thumb && (
              <g transform={`translate(1290,${y + 2})`}><Thumb n={k + 1} result={r} C={C} w={236} h={rowH - 10} /></g>
            )}
          </g>
        );
      })}
      {showScore && played.length > 0 && (
        <g role="img" aria-label={`Right first time: ${first} of ${total}`}>
          {[0, 1, 2].map((k) => (
            <path key={k} d={starPath(704 + k * 62, 596, 24)} fill={k < stars ? CONTENT.ten : "#FFFFFF"}
              stroke={k < stars ? shade(CONTENT.ten, 0.3) : C.rule} strokeWidth={3} strokeLinejoin="round" />
          ))}
          <text x={876} y={606} fontSize={T.micro} fontWeight={600} fill={C.ink}>{UI.rightFirstTime(first, total)}</text>
        </g>
      )}
      {freePlay && (
        <Key id="free-play" label={UI.freePlay} x={490} y={628} w={300} h={96} C={C} primary onClick={onFree}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill="#FFFFFF">{UI.freePlay}</text>
        </Key>
      )}
      <Key id="play-again" label={UI.playAgain} x={freePlay ? 810 : 650} y={628} w={300} h={96} C={C} onClick={onAgain}>
        <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{UI.playAgain}</text>
      </Key>
    </g>
  );
}

/* the agent's highlight: a ring round one zone for a moment (toolApi.highlight) */
const RING_OF: Record<string, any> = {
  header: Z.header, runs: Z.runs, work: Z.work, slot: { x: Z.slot.x, y: 150, w: Z.slot.w, h: 192 }, pad: Z.pad,
  voice: MASCOT_BOX, bubble: Z.bubble, bar: { x: Z.bar.x, y: Z.bar.y - 8, w: Z.bar.w, h: 76 },
};

/* ── ToolFrame: one phase at a time ──────────────────────────────────────────────────
   tool  = { TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME?, VOICE?, OPENING?, FINISH_LINE?, PHASES,
             MODEL?, Work, Runs?, judge?, solve?, nearMiss?, oracle?, format?, winMs?, fitHost?, answer?, pointKey? }
           pointKey: the tool types decimals; the pad has a point key on every question (off on a
           parts question), the keyboard's "." types it too, and typed reads "0.09". A decimal answer
           is a string in its written form ("0.30" is not "0.3"). A captured pad passes "point" to fn.
   phase ={ n, concept, conceptId, objectiveIds, says, ladder, closing, items, demo? }
           demo: after the teach lines the stage waits in "demo" for the child's one physical act;
           Work calls api.demoDone(lines) when it has played, then the first question is asked.
   item  = { say, ask, answer, miss, choices?, pad?: "enter", parts?, winMs? }
           pad "enter": the answer is made on the working area; the digit keys are quiet.
           parts [{ label, unit? }, …] with answer [a, b, …]: the slot splits into one box a part
           (quotient and remainder). Digits go to the box with the caret; Enter moves on to the next
           box, and on the last box (every box filled) it answers; a tap on a box moves the caret.
           typed reads "16|1"; judgeSlotParts(item, v) judges it.
           parts SLOT_FRACTION with answer [3, 4]: a fraction, stacked (numerator over a bar over
           denominator); typed "3|4". parts SLOT_MIXED with answer [1, 2, 3], [5, null, null] or
           [null, 7, 10]: a whole box beside the stacked fraction, any box may stay empty (null = must
           stay empty); Enter on an empty box answers once the typing is a whole answer.
   Work / Runs receive { phase, n, item, index, stage, wrong, typed, part, captured, api, MODEL } (part: the box with
           the caret; captured: the pad is lent to the working area now, false once the runtime took it back).
   api   = { submit, setTyped, say, sfx, share, onEnter, lock, capture, demoDone, C, W }
           onEnter(fn|null): Enter (and in a demo, the agent's check) goes to fn(value) instead of
           straight to submit. lock(true|false): quiets the pad while the working area is busy.
           capture(fn|null): lends the pad to the working area (a long-division frame's "left over"
           cell the child tapped): digits, "back", "enter" and "clear" (Escape) go to fn(key) and the
           slot waits, caret off. Take it only after the child taps a cell, never when a question
           opens; give it back with capture(null). A tap on an answer box, the next question, a phase
           change, the summary and free play's start all give it back too. It also works in free play.
   tool.answer(item, v): the agent's answer() for an item made on the working area; return
           true/false, or undefined to fall back to typing v.

   MODES, as in the NCERT Class 4 tools. `phase` mounts that phase. With `navigableDots: true`,
   or with no `phase` at all, it is USER mode: the phase dots are controls that jump to a phase.
   Otherwise it is AI mode: the dots only show progress, and the teacher agent drives the tool
   through window.toolApi (TOOL_API). The header controls, the pad and the working area behave
   the same in both modes.

   LANGUAGE. `props.lang`: 'en' | 'hi' | 'gu', set by the host exactly like operatorMode; a tool
   renders no switcher of its own and any other value (including none, the default for every tool
   and check up to now) is English. The runtime's own chrome (header labels, pad key names, the
   summary page, phase/question counters) comes from UI_STRINGS[lang]. A tool's own text/voice —
   item.say/ask/miss, phase.says/ladder/closing/learned, tool.OPENING/FINISH_LINE/FREE_LINE, a
   choice's label — may be a plain string (English, unaffected) or a Spoken value `{ en, hi, gu }`;
   lineFor(value, lang) reads the one in use. A Hindi or Gujarati Spoken string must already spell
   its numbers as words: speakable() only converts digits/symbols for English (see useVoice). Plan-
   level fields (tool.TOOL_NAME, phase.concept) are not Spoken and stay in the plan's own language. */

function ToolFrame({ props, tool }: any) {
  const P = props || {};
  const phases = tool.PHASES || [];
  const N = Math.max(phases.length, 1);
  const [mountPhase] = useState<number | null>(() => {
    const v = Number(P.phase);
    return P.phase === undefined || P.phase === null || P.phase === "" || !isFinite(v) ? null : Math.min(Math.max(Math.round(v), 1), N);
  });
  const navigable = mountPhase === null || (P.navigableDots ?? (P.additionalProps && P.additionalProps.navigableDots)) === true;
  const [idx, setIdx] = useState((mountPhase || 1) - 1);
  const phase = phases[idx] || { n: 1, concept: "", items: [] };
  const n = idx + 1;
  const isLast = n === phases.length;
  const C = useMemo(() => ({ ...DEFAULT_CHROME, ...(tool.CHROME || {}) }), []);
  const items = useMemo(() => bankFor(P, phase, tool.fitHost), [idx]);
  /* the agent counts questions across the whole tool: step = offset of the phase + question */
  const offsets = useMemo(() => { let a = 0; return phases.map((p: any) => { const o = a; a += Math.max((p.items || []).length, 1); return o; }); }, []);
  const steps = phases.length ? offsets[phases.length - 1] + Math.max((phases[phases.length - 1].items || []).length, 1) : 1;
  const enterRef = useRef<any>(null);
  const demoOpen = useRef(false);
  const skipTeach = useRef<number | null>(null);
  /* the stage advance a spoken line is currently walking toward (teach -> ask/demo, or a phase's closing
     line -> the next phase): "Say it again" replays the same lines, and while this is set, attaches the
     same fireOnce'd advance as the replay's own done, so it fires the moment the replay itself finishes,
     not only at the padded fallback timer (which a long teach can make tens of seconds late: found by the
     Place and Worth Chart play tester, who saw a rapid double press take 20s+ to recover and read it as a
     freeze). Null whenever no advance is pending (asking a question, a win, free play): "again" there
     stays a plain replay, as it always was. */
  const pendingAdvance = useRef<(() => void) | null>(null);
  const [locked, setLocked] = useState(false);
  const mutedRef = useRef(P.muted === true || P.soundDefault === false);
  const [soundOn, setSoundOn] = useState(!mutedRef.current);
  const sfx = useMemo(() => makeSfx(mutedRef), []);
  /* the three shipped languages: the host sets `lang` exactly like `operatorMode`, and a tool renders
     no switcher of its own. An unrecognised or missing value is English, so every check and every tool
     built before this existed (which never sets P.lang) behaves exactly as it did before. */
  const langRef = useRef("en");
  langRef.current = P.lang === "hi" || P.lang === "gu" ? P.lang : "en";
  const lang = langRef.current;
  const UI = UI_STRINGS[lang];
  /* a tool's own line in the language in use: its TR table (keyed by the English), else the English */
  const tx = (v: any) => lineFor(v, lang, tool.TR);
  const voice = useVoice(mutedRef, langRef, { rate: 0.92, pitch: 1.06, ...(tool.VOICE || {}) });
  const [mascotOk, setMascotOk] = useState(true);
  const mascotRef = useRef(true);
  const [ring, setRing] = useState<string | null>(null);
  const [done, setDone] = useState<number[]>([]);

  const [run, setRun] = useState(0);
  const [stage, setStage] = useState("teach");
  const [i, setI] = useState(0);
  const [typed, setTypedState] = useState("");
  const typedRef = useRef("");
  /* typed is mirrored in a ref, so an agent's answer() then check() in the same tick agree.
     after a miss the child's answer stays in the slot but is stale: the next digit starts a new
     answer (never 9 then 6 read as 96); back or any other write takes the old answer over again */
  const staleRef = useRef(false);
  /* a two-part answer: the box with the caret, and which boxes still hold a missed answer (stale) */
  const [part, setPartState] = useState(0);
  const partRef = useRef(0);
  /* the caret moves, and on a keyboard the focus goes with it: a child who tabs to the first box once and
     then types and presses Enter would otherwise leave focus pinned there, so every later Enter re-picked
     that box as well as moving on — the caret bounced 1, 0, 1, 0, digits landed in the wrong boxes and the
     answer never went. A deliberate Tab to another box still picks it, as before. */
  const setPart = (k: number) => {
    partRef.current = k; setPartState(k);
    try {
      const a: any = document.activeElement;
      if (a && a.getAttribute && /^part-\d+$/.test(a.getAttribute("data-control") || "")) {
        later(() => { const el: any = document.querySelector(`[data-control="part-${k + 1}"]`); if (el && el !== document.activeElement) el.focus(); }, 0);
      }
    } catch (e) {}
  };
  const staleParts = useRef<boolean[]>([]);
  /* the pad lent to the working area (api.capture): keys go to the tool's fn, the slot waits */
  const captureRef = useRef<any>(null);
  const [captured, setCaptured] = useState(false);
  const capture = (fn: any) => { captureRef.current = typeof fn === "function" ? fn : null; setCaptured(!!captureRef.current); };
  const setTyped = (v: any) => {
    const nv = typeof v === "function" ? v(typedRef.current) : String(v ?? "");
    typedRef.current = nv;
    staleRef.current = false;
    staleParts.current = [];
    if (nv === "") setPart(0); /* a cleared slot starts again at the first box */
    setTypedState(nv);
  };
  const [tries, setTries] = useState(0);
  const [wrong, setWrong] = useState<any>(null);
  const firstTry = useRef(0);
  const answered = useRef(0);
  const fired = useRef(false);
  const shared = useRef<any>({});
  /* per phase played in this mount: { answered, firstTry, total, last: { item, value, shared } } (the summary page) */
  const results = useRef<Record<number, any>>({});
  const summaryTok = useRef(0);
  const [summaryRow, setSummaryRow] = useState(-1);
  const timers = useRef<any[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };
  const clearLater = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const item = items[Math.min(i, items.length - 1)] || {};
  const say = (it: any) => tx(it.say) || tx(it.ask) || "";
  const live = useRef<any>({});

  /* every event leaves the frame too: a window CustomEvent, and a postMessage when framed */
  const emit = (name: string, detail: any) => {
    const d = { toolId: tool.TOOL_ID, mediaId: tool.MEDIA_ID, ...detail };
    try { window.dispatchEvent(new CustomEvent(name, { detail: d })); } catch (e) {}
    try { if (window.parent && window.parent !== window) window.parent.postMessage({ type: "event", name, detail: d }, "*"); } catch (e) {}
  };

  /* the mascot's picture is drawn straight from its inline WebP, as the NCERT tools do. Only a real
     failure to decode drops it to the drawn dot: the <image>'s onError, or a probe through
     window.Image. Never the bare name `Image`: the host declares a lucide icon called Image in the
     tool's scope, and `new Image()` threw there, so staging showed the dot. The flag drops once, so
     a failed decode never loops into a retry. */
  const mascotFail = () => { if (!mascotRef.current) return; mascotRef.current = false; setMascotOk(false); };
  useEffect(() => {
    try {
      const Img = typeof window !== "undefined" ? (window as any).Image : null;
      if (typeof Img !== "function") return;
      const im = new Img();
      im.onload = () => { if (!im.naturalWidth) mascotFail(); };
      im.onerror = mascotFail;
      im.src = MASCOT_IMAGE;
    } catch (e) { /* a probe that cannot run says nothing about the picture */ }
  }, []);

  /* the teach run: on mount, on restart and on every phase entry. Nothing is asked before it has
     been said. A demo phase waits for the child's one act before the first question. The agent's
     gotoStep into a later question goes straight to that question. */
  useEffect(() => {
    demoOpen.current = false;
    pendingAdvance.current = null;
    const jump = skipTeach.current;
    skipTeach.current = null;
    if (jump !== null) {
      setStage("ask");
      voice.speak(say(items[Math.min(jump, items.length - 1)] || {}));
      return () => { clearLater(); voice.hush(); };
    }
    setStage("teach");
    const lines = [...(idx === 0 ? tool.OPENING || [] : []), ...(phase.says || [])].map((l: any) => tx(l));
    /* the teach run ends on a question (or a demo): "Say it again" bumps the voice's own token and
       silently drops whichever `done` was in flight, so a child who presses it right after mount stuck
       the phase in "teach" (found by the Zoom Grid play tester). `pendingAdvance` fixes this properly:
       "Say it again" is wired to pass it straight back into the replay as its own done, so the replay's
       own natural end fires the advance at once. The walk still also goes, as a fallback of last resort,
       when the line's own longest time is up without ever being replayed (the same fallback phaseEnd's
       closing line uses) — a rapid double "Say it again" during teach was timed at 20s+ to recover through
       that fallback alone before this fix (found by the Place and Worth Chart play tester). */
    if (phase.demo) {
      const go = fireOnce(() => { demoOpen.current = true; setStage("demo"); pendingAdvance.current = null; });
      pendingAdvance.current = go;
      voice.speak(lines, go);
      later(go, lines.reduce((a, l) => a + readMs(speakable(l)), 0) + 6000);
    } else {
      const full = [...lines, say(items[0] || {})];
      const go = fireOnce(() => { setStage("ask"); pendingAdvance.current = null; });
      pendingAdvance.current = go;
      voice.speak(full, go);
      later(go, full.reduce((a, l) => a + readMs(speakable(l)), 0) + 6000);
    }
    return () => { clearLater(); voice.hush(); pendingAdvance.current = null; };
  }, [run]);

  const demoDone = (lines?: any) => {
    if (!demoOpen.current) return;
    demoOpen.current = false;
    setStage("teach");
    const full = [...(lines ? (Array.isArray(lines) ? lines : [lines]) : []).map((l: any) => tx(l)), say(items[0] || {})];
    const go = fireOnce(() => { setStage("ask"); pendingAdvance.current = null; });
    pendingAdvance.current = go;
    voice.speak(full, go);
    later(go, full.reduce((a, l) => a + readMs(speakable(l)), 0) + 6000);
  };

  const judge = (it: any, v: any) => {
    if (tool.judge) return !!tool.judge(it, v, { phase, n });
    if (typeof it.answer === "number") return leadNumber(v) === it.answer;
    return String(v).trim().toLowerCase() === String(it.answer ?? "").trim().toLowerCase();
  };

  /* `finished`, once, from the summary page (a restart, Play again or entering a phase re-arms it);
     its score covers every phase played in this mount. */
  const fire = (summary: boolean) => {
    if (fired.current) return;
    fired.current = true;
    const L = live.current;
    const played = summary ? Object.keys(results.current).map(Number).sort((a, b) => a - b) : [L.n];
    const get = (p: number, k: string) => ((results.current[p] || {}) as any)[k] || 0;
    const total = played.reduce((a, p) => a + (get(p, "total") || ((phases[p - 1] || {}).items || []).length), 0);
    const ok = played.reduce((a, p) => a + get(p, "firstTry"), 0), ans = played.reduce((a, p) => a + get(p, "answered"), 0);
    const ratio = total ? ok / total : 0;
    const detail: any = {
      toolId: tool.TOOL_ID, mediaId: tool.MEDIA_ID, doneId: tool.MEDIA_ID + ".DONE", phase: L.n,
      conceptId: L.phase.conceptId, objectiveIds: L.phase.objectiveIds || [],
      score: ans * POINTS, maxScoreThisPhase: (L.items.length || 0) * POINTS,
      correctFirstTry: ok, itemsAnswered: ans, stars: ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1,
    };
    if (summary && played.length > 1) { detail.phases = played; detail.maxScore = total * POINTS; }
    try { window.dispatchEvent(new CustomEvent("finished", { detail })); } catch (e) {}
    try { if (window.parent && window.parent !== window) window.parent.postMessage({ type: "event", name: "finished", detail }, "*"); } catch (e) {}
    try { if (typeof P.onComplete === "function") P.onComplete(tool.TOOL_ID, detail); } catch (e) {}
  };

  /* the summary page (NCERT Class 4): "Well done!", the whole-tool line, then each phase's "You
     learned" line with its row ringed; `finished` goes once, 5 s after the page opens (the lines may
     still be going on), and never if Free play, Play again or a phase change comes first */
  const showSummary = () => {
    const L = live.current;
    const tk = ++summaryTok.current;
    const send = () => { if (summaryTok.current === tk) fire(true); };
    clearLater();
    later(send, 5000);
    enterRef.current = null;
    capture(null);
    setStage("summary");
    setSummaryRow(-1);
    const go = (k: number) => {
      if (summaryTok.current !== tk) return;
      if (k >= phases.length) { setSummaryRow(-1); return; }
      setSummaryRow(k);
      voice.speak(tx(phases[k].learned) || tx(phases[k].closing) || "", () => go(k + 1));
    };
    voice.speak([tx(L.phase.closing), tx(tool.FINISH_LINE) || null].filter(Boolean), () => go(0));
  };

  /* the end of a phase (as the NCERT tools): every mount, user or AI mode, says the closing line and
     walks on to the next phase 1.4 s later, sending no `finished`; the last phase opens the summary
     page, which sends it */
  const phaseEnd = () => {
    sfx.win(); /* outside any guard: a second win replays the chime, never a second summary */
    const L = live.current;
    setDone((d) => (d.includes(L.n) ? d : [...d, L.n]));
    if (L.idx === phases.length - 1) { showSummary(); return; }
    setStage("idle");
    /* the walk goes when the closing line ends, or at the latest when that line's longest time is up:
       a line the tool speaks after it (a win animation's words) takes the voice and its end with it,
       and the phase would never move on */
    let gone = false;
    const walk = () => { if (gone) return; gone = true; pendingAdvance.current = null; later(() => enterPhase(L.idx + 1, 0), 1400); };
    const closing = [tx(L.phase.closing)].filter(Boolean);
    pendingAdvance.current = walk;
    voice.speak(closing, walk);
    later(walk, closing.reduce((a, l) => a + readMs(speakable(l)), 0) + 6000);
  };

  /* Free play (from the summary page): the tool's own no-target mode, every control unlocked */
  const freePlay = () => {
    summaryTok.current++;
    clearLater(); voice.hush();
    enterRef.current = null;
    capture(null);
    setSummaryRow(-1); setTyped(""); setWrong(null); setLocked(false);
    setStage("free");
    voice.speak(tx(tool.FREE_LINE) || UI.freePlayLine);
  };
  /* Play again: this mount's first phase, a clean slate, `finished` re-armed */
  const playAgain = () => {
    summaryTok.current++;
    results.current = {};
    setDone([]);
    enterPhase(mountPhase === null ? 0 : mountPhase - 1, 0);
  };

  const advance = () => {
    const L = live.current;
    const next = L.i + 1;
    if (next < L.items.length) {
      capture(null);
      setI(next); setTyped(""); setTries(0); setWrong(null); setStage("ask");
      voice.speak(say(L.items[next]));
    } else phaseEnd();
  };

  const submit = (v?: any) => {
    const L = live.current;
    if (L.stage !== "ask") return false;
    const value = v === undefined ? typedRef.current : v;
    if (value === "" || value === null || value === undefined) return false;
    const it = L.item;
    if (it.parts && slotPartsOf(value, it.parts.length).every((p) => p === "")) return false;
    if (v !== undefined && typeof v !== "object") setTyped(String(v));
    else if (it.parts && Array.isArray(v)) setTyped(slotPartsOf(v, it.parts.length).join("|"));
    const ok = judge(it, value);
    emit("answer_checked", { phase: L.n, item: L.i + 1, correct: ok, value, tries: L.tries + (ok ? 0 : 1), conceptId: L.phase.conceptId });
    if (ok) {
      sfx.correct(); /* the +5 lands where the correct sound plays, so they never disagree */
      if (L.tries === 0) firstTry.current += 1;
      answered.current += 1;
      const r = results.current[L.n] || { answered: 0, firstTry: 0, total: L.items.length };
      results.current[L.n] = { ...r, answered: r.answered + 1, firstTry: r.firstTry + (L.tries === 0 ? 1 : 0), total: L.items.length,
        last: { item: L.i, value, kind: it.kind, answer: it.answer, shared: { ...shared.current } } };
      L.stage = "win";
      setWrong(null);
      setStage("win");
      emit("question_done", { phase: L.n, item: L.i + 1, firstTry: L.tries === 0, conceptId: L.phase.conceptId });
      try {
        if (typeof P.onProgress === "function")
          P.onProgress({ activity: tool.TOOL_ID, done: answered.current, total: L.items.length, phase: L.n, conceptId: L.phase.conceptId, objectiveIds: L.phase.objectiveIds || [] });
      } catch (e) {}
      later(advance, it.winMs ?? tool.winMs ?? 1600);
      return true;
    }
    /* a miss: said three ways and none of them is the number; nothing marked, nothing reset */
    sfx.wrong();
    const t = L.tries + 1;
    L.tries = t;
    setTries(t);
    setWrong({ value, tries: t });
    staleRef.current = true;
    /* two boxes: both keep the child's numbers, the caret goes back to the first, and a digit typed
       into a box starts that box afresh */
    if (it.parts) { staleParts.current = it.parts.map(() => true); setPart(0); }
    const ladder = L.phase.ladder || [];
    const rung = t === 1 ? it.miss || ladder[0] : t === 2 ? ladder[0] || it.miss : ladder[1] || ladder[0];
    if (rung) voice.speak(tx(rung));
    return false;
  };

  const commit = (v?: any) => (enterRef.current ? enterRef.current(v) : submit(v));
  const press = (k: string) => {
    const L = live.current;
    if (k === "enter" && L.stage === "demo") { if (enterRef.current) enterRef.current(undefined); return; }
    if (captureRef.current && (L.stage === "ask" || L.stage === "free") && !L.locked) { captureRef.current(k); return; }
    if (L.stage !== "ask" || L.locked) return;
    if (k === "point" && (!tool.pointKey || L.item.parts)) return;
    if (L.item.parts && L.item.pad !== "enter" && !L.item.choices) { pressPart(k, L.item.parts.length); return; }
    /* the answer that just missed is never sent again unchanged: Enter waits for a fresh write.
       A choice counts: a choice key commits through onChoice and never through this path, so Enter has
       no legitimate work to do on a choice item, and without the guard a bare Enter after a miss re-sent
       the stale choice and took a try each press (ch 9, measured: tries 1 -> 4 over four presses).
       A working-area answer is not the typed value, so it still always goes: the tool guards its own
       Enter with api.onEnter, since only the tool knows whether the child has acted since the miss. */
    if (k === "enter") {
      if (staleRef.current && L.item.pad !== "enter") return;
      commit(L.item.pad === "enter" ? undefined : typedRef.current); return;
    }
    if (L.item.pad === "enter" || L.item.choices) return;
    if (k === "back") setTyped((s: string) => s.slice(0, -1));
    /* the point (tool.pointKey): typed as "."; a second point in one answer is refused. The zero in front
       is the child's to type (".3" is typed as it is and judged by the tool) */
    else if (k === "point") setTyped((s: string) => (staleRef.current ? "." : s.includes(".") || s.length >= 9 ? s : s + "."));
    else setTyped((s: string) => (staleRef.current ? k : s.length >= 9 ? s : s + k));
  };
  /* a two-part answer: digits go to the box with the caret. Enter on a filled box moves on to the next;
     on the last box it answers once every box is filled (else the caret goes to the empty one). Rub out
     on an empty box steps back to the box before it. */
  const pressPart = (k: string, np: number) => {
    const ps = slotPartsOf(typedRef.current, np), at = Math.min(partRef.current, np - 1);
    const parts = live.current.item.parts;
    /* after a miss every box is stale: the same answer is never sent again until one box is rewritten */
    const fresh = !staleParts.current.length || staleParts.current.some((s: boolean) => !s);
    if (k === "enter" && parts.some((p: any) => p.free)) {
      /* a mixed number, whose boxes may stay empty: Enter on a filled box moves on; on an empty box (or
         the last) it answers once what is typed is a whole answer, else the caret goes where a number is
         still missing (the other half of a fraction), or on to the next box */
      if (ps[at] !== "" && at < np - 1) { setPart(at + 1); return; }
      if (fresh && slotComplete(parts, ps)) { commit(ps.join("|")); return; }
      const half = parts.findIndex((p: any, j: number) => (p.at === "top" || p.at === "bottom") && ps[j] === ""
        && parts.some((q: any, i: number) => i !== j && (q.at === "top" || q.at === "bottom") && ps[i] !== ""));
      if (half >= 0) setPart(half); else if (at < np - 1) setPart(at + 1);
      return;
    }
    if (k === "enter") {
      if (ps[at] === "") return;
      if (at < np - 1) { setPart(at + 1); return; }
      const empty = ps.findIndex((p) => p === "");
      if (empty >= 0) { setPart(empty); return; }
      if (!fresh) return;
      commit(ps.join("|"));
      return;
    }
    const stale = staleParts.current.slice();
    if (k === "back") {
      if (ps[at] === "" && at > 0) { setPart(at - 1); return; }
      ps[at] = ps[at].slice(0, -1);
    } else ps[at] = stale[at] ? k : ps[at].length >= 7 ? ps[at] : ps[at] + k;
    stale[at] = false;
    setTyped(ps.join("|"));
    staleParts.current = stale;
  };
  const pickPart = (k: number) => {
    const L = live.current;
    if (L.stage !== "ask" || L.locked || !L.item.parts) return;
    if (captureRef.current) capture(null); /* a tap on an answer box takes the pad back to the slot */
    setPart(Math.min(Math.max(k, 0), L.item.parts.length - 1));
  };

  /* entering a phase (a dot, the agent, restart) re-arms the one-shot: re-doing a phase means the
     host is entitled to hear that it finished again */
  const enterPhase = (k: number, at = 0) => {
    const kk = Math.min(Math.max(Math.round(k), 0), N - 1);
    clearLater(); voice.hush();
    fired.current = false; firstTry.current = 0; answered.current = 0;
    summaryTok.current++; setSummaryRow(-1);
    delete results.current[kk + 1]; /* a phase entered again starts a fresh attempt */
    enterRef.current = null;
    capture(null);
    skipTeach.current = at > 0 ? at : null;
    /* the stage moves with the phase in the same render: a jump during a win must never show the
       new phase's first item with stage "win" (a tool drawing its win would draw that item's answer) */
    setIdx(kk); setI(at); setTyped(""); setTries(0); setWrong(null); setLocked(false); setRing(null);
    setStage(at > 0 ? "ask" : "teach");
    setRun((r) => r + 1);
  };
  const restart = () => (["summary", "free"].includes(live.current.stage) ? playAgain() : enterPhase(live.current.idx, 0));
  const enterItem = (at: number) => {
    const a = Math.min(Math.max(at, 0), live.current.items.length - 1);
    clearLater(); voice.hush();
    enterRef.current = null;
    capture(null);
    setI(a); setTyped(""); setTries(0); setWrong(null); setLocked(false); setStage("ask");
    voice.speak(say(live.current.items[a] || {}));
  };
  /* the agent's absolute step; in AI mode it stays inside the phase being shown (the host's, then each one the tool walks on to) */
  const gotoStep = (s: any) => {
    const L = live.current;
    let t = Math.min(Math.max(Math.round(Number(s) || 0), 0), steps - 1);
    if (!navigable && mountPhase !== null) {
      const lo = offsets[L.idx], hi = lo + Math.max((phases[L.idx].items || []).length, 1) - 1;
      t = Math.min(Math.max(t, lo), hi);
    }
    let k = 0;
    while (k + 1 < phases.length && offsets[k + 1] <= t) k++;
    const at = t - offsets[k];
    if (k !== L.idx || at === 0) enterPhase(k, at);
    else enterItem(at);
    return true;
  };
  const goPhase = (k: number) => { if (navigable && k !== live.current.idx) enterPhase(k, 0); };

  /* mute keeps the child's place; unmute speaks on from it (the voice hook does both) */
  const setMuted = (m: boolean) => {
    const was = mutedRef.current;
    mutedRef.current = !!m;
    setSoundOn(!mutedRef.current);
    if (mutedRef.current && !was) voice.pause();
    else if (!mutedRef.current && was) voice.resume();
  };
  const toggleSound = () => setMuted(!mutedRef.current);
  useEffect(() => { if (typeof P.muted === "boolean" && P.muted !== mutedRef.current) setMuted(P.muted); }, [P.muted]);

  const highlight = (id: any) => {
    const key = String(id);
    if (!RING_OF[key]) return false;
    setRing(key);
    later(() => setRing((r) => (r === key ? null : r)), 2400);
    return true;
  };

  /* the keyboard reaches the same handlers the pointer does */
  useEffect(() => {
    /* a physical digit, point or Backspace always reaches here (a focused pad key's own handler only
       claims Enter/Space, LAYOUT §7's "digits... work anywhere"), so it is the moment a child has moved
       from "acting on the Tab-focused control" to typing the answer directly: any focus a plain Tab left
       behind is stale from here on, or the very next Enter (meant to submit) would be caught by that
       stale control's own handler instead (found the same day as the usePress fix above, on the same
       playthrough: Tab once to a pad key, type ".3" on the physical keys with no further Tab, and even
       the FIRST Enter is swallowed mid-keystroke, before the usePress blur added above can run). */
    const h = (e: any) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^[0-9]$/.test(e.key)) { press(e.key); e.preventDefault(); pointerBlur(); }
      else if (tool.pointKey && (e.key === "." || e.code === "NumpadDecimal")) { press("point"); e.preventDefault(); pointerBlur(); }
      else if (e.key === "Enter") { press("enter"); e.preventDefault(); }
      else if (e.key === "Backspace") { press("back"); e.preventDefault(); pointerBlur(); }
      else if (e.key === "Escape") { if (captureRef.current) press("clear"); else if (live.current.stage === "ask") setTyped(""); e.preventDefault(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  live.current = { idx, n, phase, i, item, stage, typed, tries, submit, setTyped, items, locked };

  /* what the host and the teacher agent can read and drive (window.toolApi, and window[TOOL_ID]) */
  const apiRef = useRef<any>({});
  apiRef.current = {
    getState: () => ({
      toolId: tool.TOOL_ID, mediaId: tool.MEDIA_ID, mode: navigable ? "user" : "ai", mountPhase, lang,
      phase: n, phases: N, conceptId: phase.conceptId, objectiveIds: phase.objectiveIds || [],
      step: (offsets[idx] || 0) + i, steps, item: i + 1, items: items.length, stage,
      question: tx(item.ask) || "", questionText: say(item), choices: item.choices ? item.choices.map((c: any) => c.id) : null,
      typed: typedRef.current, keypadOpen: stage === "ask" && !locked, tries,
      parts: item.parts ? item.parts.map((p: any) => p.label) : null, part: partRef.current, padTo: captureRef.current ? "work" : "slot",
      answered: answered.current, firstTry: firstTry.current, score: answered.current * POINTS, maxScore: items.length * POINTS,
      answerShown: stage === "win" || stage === "idle" ? item.answer ?? null : null,
      summaryRow, played: Object.keys(results.current).map(Number), questionCount: `${Math.min(i + 1, items.length)} / ${items.length}`,
      muted: mutedRef.current, speaking: voice.speaking, voice: voice.state().voice, mascot: mascotRef.current ? "image" : "drawn", ...shared.current,
      /* the runtime owns `complete`: true once `finished` is sent. A tool's shared `complete` (the plan's
         field, often "stage is idle") would say it at every phase end, now that the tool walks on */
      complete: fired.current,
    }),
    gotoStep,
    say: (text: any) => { voice.speak(String(text ?? "")); return true; },
    answer: (v: any) => {
      const L = live.current;
      if (L.stage !== "ask" || L.locked) return false;
      if (tool.answer) { const r = tool.answer(L.item, v); if (r !== undefined) return !!r; }
      if (L.item.choices) {
        const c = L.item.choices.find((x: any) => x.id === String(v) || String(x.label).toLowerCase() === String(v).toLowerCase());
        if (!c) return false;
        setTyped(c.id);
        return true;
      }
      if (L.item.pad === "enter") return false;
      /* two boxes: [16, 1], "16|1" or "16 remainder 1" fills them in order; check() then answers */
      if (L.item.parts) {
        const ps = slotPartsOf(v, L.item.parts.length);
        if (L.item.parts.some((p: any) => p.free) ? !slotComplete(L.item.parts, ps) : ps.some((p) => p === "")) return false;
        setTyped(ps.map((p) => p.slice(0, 7)).join("|"));
        setPart(ps.length - 1);
        return true;
      }
      setTyped(String(v ?? "").replace(/[^0-9]/g, "").slice(0, 9));
      return true;
    },
    /* a tool that makes its answer on the working area may take check() first (e.g. drop a token) */
    check: () => {
      const L = live.current;
      if (L.stage !== "ask" && L.stage !== "demo") return false;   /* nothing open: no second answer_checked (a locked ask may still drop its token) */
      const r = tool.check ? tool.check(L.item) : undefined; if (r === undefined) press("enter"); return true;
    },
    reset: () => { restart(); return true; },
    next: () => {
      /* past a phase's last question there is nothing to open: once it is won (or in a one-phase AI mount)
         the phase ends by itself; reopening it would lose finished and repeat the events */
      const L = live.current, lastHere = L.i + 1 >= L.items.length;
      if (lastHere && (L.stage === "win" || L.stage === "idle" || (!navigable && mountPhase !== null))) return false;
      return gotoStep((offsets[L.idx] || 0) + L.i + 1);
    },
    prev: () => gotoStep((offsets[live.current.idx] || 0) + live.current.i - 1),
    highlight,
    setParam: (name: any, value: any) => {
      if (name === "phase") return gotoStep(offsets[Math.min(Math.max(Math.round(Number(value) || 1), 1), N) - 1] || 0);
      if (name === "muted") { setMuted(!!value); return true; }
      return false;
    },
    playDemo: () => { enterPhase(live.current.idx, 0); return true; },
  };
  useEffect(() => {
    const w: any = window, proxy: any = {};
    TOOL_API.forEach((m) => { proxy[m] = (...a: any[]) => apiRef.current[m](...a); });
    w.toolApi = proxy;
    if (tool.TOOL_ID) w[tool.TOOL_ID] = proxy;
    return () => {
      if (w.toolApi === proxy) delete w.toolApi;
      if (tool.TOOL_ID && w[tool.TOOL_ID] === proxy) delete w[tool.TOOL_ID];
    };
  }, []);

  /* dev:start (stripped at port) — the driver contract the checks and the shots play through */
  useEffect(() => {
    (window as any).__tool = {
      version: 2, toolId: tool.TOOL_ID, mediaId: tool.MEDIA_ID, phases: phases.length, mode: navigable ? "user" : "ai",
      dragging: () => DRAGS.live,
      controls: () => Array.from(document.querySelectorAll("[data-control]")),
      state: () => ({ phase: live.current.n, stage: live.current.stage, item: live.current.i, items: live.current.items.length,
        typed: typedRef.current, locked: live.current.locked, finished: fired.current, asked: live.current.item.answer ?? null,
        key: tool.agentKey ? tool.agentKey(live.current.item) : live.current.item.answer ?? null,
        mode: navigable ? "user" : "ai", mascot: mascotRef.current ? "image" : "drawn", ...shared.current }),
      solve: () => (tool.solve ? tool.solve(live.current.item, (window as any).__tool) : live.current.submit(live.current.item.answer)),
      nearMiss: () => {
        const it = live.current.item;
        const v = tool.nearMiss ? tool.nearMiss(it) : typeof it.answer === "number" ? it.answer + 1 : "~";
        const s = it.parts ? slotPartsOf(v, it.parts.length).join("|") : String(v);
        live.current.setTyped(s);
        return it.parts ? s : v;
      },
      submit: (v?: any) => live.current.submit(v),
      isDone: () => fired.current,
      oracleOk: () => phases.length > 0
        && phases.every((p: any) => (p.items || []).length > 0 && p.items.every((it: any) => it.answer !== undefined && it.answer !== null && it.answer !== ""))
        && (tool.oracle ? !!tool.oracle() : true),
    };
  }, []);
  /* dev:end */

  const api = {
    submit, setTyped, say: (lines: any, doneFn?: () => void) => voice.speak(lines, doneFn), sfx,
    share: (o: any) => { shared.current = o || {}; },
    onEnter: (fn: any) => { enterRef.current = fn || null; },
    /* always set: a Work callback may hold an older api whose `locked` is stale; React skips a no-op */
    lock: (b: boolean) => setLocked(!!b),
    capture, demoDone, C, W,
  };
  const workProps = { phase, n, item, index: i, stage, wrong, typed, part, captured, api, MODEL: tool.MODEL, lang, tx };
  const Work = tool.Work;
  const Runs = tool.Runs;
  const rz = ring ? RING_OF[ring] : null;

  return (
    <div className="c4-frame" style={{ position: "relative", margin: "0 auto", touchAction: "none", userSelect: "none", WebkitUserSelect: "none" } as any}>
      <style>{CSS}</style>
      <svg className="c4" viewBox="0 0 1600 900" width="100%" height="100%" aria-label={tx(tool.TOOL_NAME)}
        style={{ ["--c4-accent" as any]: C.accent, ["--c4-focus" as any]: shade(C.accent, 0.4) } as any}>
        <Defs C={C} />
        <rect x={0} y={0} width={1600} height={900} fill={C.paper} />
        <Header C={C} name={tx(tool.TOOL_NAME)} title={tx(phase.concept)} soundOn={soundOn}
          onAgain={() => voice.repeat(pendingAdvance.current || undefined)} onSound={toggleSound} onRestart={restart} UI={UI} />
        <rect x={Z.canvas.x} y={Z.canvas.y} width={Z.canvas.w} height={Z.canvas.h} rx={RAD.card}
          fill="url(#gCard)" stroke={C.rule} strokeWidth={2} filter="url(#fShadow)" />
        <path d={`M ${Z.canvas.x + 30} ${Z.canvas.y + 4} H ${Z.canvas.x + Z.canvas.w - 30}`} stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" />
        {Runs && (
          <g data-zone="runs">
            <rect x={Z.runs.x} y={Z.runs.y} width={Z.runs.w} height={Z.runs.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            <g transform={`translate(${Z.runs.x},${Z.runs.y})`}><Runs {...workProps} /></g>
          </g>
        )}
        {/* under the summary card nothing else is drawn (hidden, not unmounted, so Free play keeps its state) */}
        <g display={stage === "summary" ? "none" : undefined}>
        <g data-zone="work" transform={`translate(${W.x},${W.y})`}>{Work && <Work key={run} {...workProps} />}</g>
        <Slot C={C} ask={stage === "teach" ? "" : stage === "free" ? UI.freePlay : tx(item.ask)} typed={stage === "free" ? "" : typed} active={stage === "ask" && !captured} live={stage === "ask"} format={tool.format}
          parts={stage === "free" ? null : item.parts} part={part} onPart={pickPart} />
        {/* no host Next key: the tool walks on to the next phase by itself */}
        <Pad C={C} enabled={(stage === "ask" || (stage === "free" && captured)) && !locked} digitsOff={stage !== "free" && item.pad === "enter" && !captured} onKey={press}
          point={!!tool.pointKey} pointOff={stage !== "free" && !!item.parts && !captured}
          choices={stage === "free" ? null : item.choices} onChoice={(id: string) => { if (!locked) commit(id); }} UI={UI} lang={lang} TR={tool.TR} />
        </g>
        {stage === "summary" && (
          <Summary C={C} phases={phases} results={results.current} row={summaryRow} showScore={P.showScore !== false}
            freePlay={!!tool.freePlay} onFree={freePlay} onAgain={playAgain} Thumb={tool.Thumb} UI={UI} lang={lang} TR={tool.TR} />
        )}
        <Footer C={C} line={voice.line} speaking={voice.speaking} n={n} N={N} i={i} total={items.length}
          navigable={navigable} done={done} onGo={goPhase} mascotOk={mascotOk} onMascotFail={mascotFail} UI={UI} />
        {rz && <rect className="c4-ring" x={rz.x - 6} y={rz.y - 6} width={rz.w + 12} height={rz.h + 12} rx={24}
          fill="none" stroke={C.accent} strokeWidth={6} pointerEvents="none" />}
        {/* only when the browser will not speak before a tap (sound stays on; the lesson waits for it) */}
        {voice.needsTap && soundOn && (
          <g data-zone="cover">
            <rect x={0} y={0} width={1600} height={900} fill={C.paper} fillOpacity={0.86} />
            <Key id="tap-to-start" label={UI.tapToStart} x={560} y={372} w={480} h={130} C={C} primary onClick={() => voice.unlock()}>
              <g transform="translate(-150,0)"><IconSound c="#FFFFFF" on /></g>
              <text x={30} y={15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill="#FFFFFF">{UI.tapToStart}</text>
            </Key>
          </g>
        )}
      </svg>
    </div>
  );
}
