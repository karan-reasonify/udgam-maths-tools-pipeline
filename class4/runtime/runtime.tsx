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

/* BOARD layout (r27, opt-in: `board: true` in the object a tool passes to ToolFrame; LAYOUT.md §1b). The question and
   an Answer key sit in a bar across the top, the working area takes the whole card, and the answer box and the keypad
   open in a panel on the right only while the child answers; the picture then rearranges into the room left. Z is
   rewritten IN PLACE, once per render, from the tool's flag, so every function that reads Z.slot or Z.pad (Slot,
   SlotSide, Pad...) draws in the panel without knowing, and `W` (an alias of Z.work) stays the working area's box.
   The classic layout is the default and is never touched. */
const ZCLASSIC: any = JSON.parse(JSON.stringify(Z));
const ZBOARD: any = {
  runs: { x: 64, y: 110, w: 330, h: 76 },
  work: { x: 64, y: 202, w: 1472, h: 528 },   /* the widest the area gets, with the panel shut */
  slot: { x: 1180, y: 218, w: 340, h: 92 },
  pad: { x: 1180, y: 324, w: 340, h: 390 },
  ask: { x: 64, y: 104, w: 1472, h: 88 },
  drawer: { x: 1164, y: 202, w: 372, h: 528 },
};
const BOARD_OPEN_W = 1086;   /* the working area's width with the panel open: the classic width */
/* r26, BIG PAD (opt-in: `bigPad: true` in the tool object, with `board: true`; the owner, 2026-10-14: "there is empty space left of the
   keypad, increase its size"): a tool whose picture is small leaves room beside the panel, so the panel and its keys are wider and the
   working area gives that room up while it is open. The keys derive their size from the pad box, so they grow with it. */
const ZBOARD_BIG: any = {
  slot: { x: 996, y: 218, w: 524, h: 92 },
  pad: { x: 996, y: 324, w: 524, h: 390 },
  drawer: { x: 980, y: 202, w: 556, h: 528 },
};
const BOARD_OPEN_W_BIG = 900;   /* 64 + 900 = 964, a 16-unit gap to the drawer at 980 */
let BOARD = false;
let BIGPAD = false;
function setLayout(board: boolean, big: boolean = false) {
  const src: any = board ? ZBOARD : ZCLASSIC;
  for (const k of Object.keys(src)) { if (!(Z as any)[k]) (Z as any)[k] = {}; Object.assign((Z as any)[k], src[k]); }
  if (board && big) for (const k of Object.keys(ZBOARD_BIG)) Object.assign((Z as any)[k], ZBOARD_BIG[k]);
  BOARD = board;
  BIGPAD = !!(board && big);
}
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
/* A decimal answer in two boxes with the point already drawn between them: [whole part] . [decimal part]
   (answer ["2", "9"], or "2.9"; typed "2|9"). Always drawn side by side (SlotSide). Unlike a fraction's boxes, the
   decimal part is judged digit for digit: "0.50" is not "0.5" and "2.05" is not "2.5" (`judgeSlotDecimal`). The pad's
   point key is off on such a question (it is a `parts` question); a physical "." moves the caret to the decimal box. */
const SLOT_DECIMAL = [{ label: "whole", at: "dwhole" }, { label: "decimal", at: "dpart" }];
/** A decimal answer's two boxes (whole part, decimal part) from "2.9", 2.9, "2|9" or [2, 9], digits only; the decimal
    part keeps its zeros ("0.09" is ["0", "09"]). */
function decimalPartsOf(v: any): string[] {
  const digits = (x: any) => String(x ?? "").replace(/[^0-9]/g, "");
  if (Array.isArray(v)) return [digits(v[0]), digits(v[1])];
  const s = String(v ?? "");
  const a = s.includes("|") ? s.split("|") : s.split(".");
  return [digits(a[0]), digits(a[1])];
}
/** Right only when the whole part and the decimal part both match, the decimal part digit for digit. `item.answer`
    is ["2", "9"], [2, "09"] or "2.9". */
function judgeSlotDecimal(item: any, v: any): boolean {
  const want = decimalPartsOf(item.answer), got = decimalPartsOf(v);
  return want[1] !== "" && got[0] !== "" && got[1] !== "" && Number(got[0]) === Number(want[0]) && got[1] === want[1];
}
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
    /* the lesson has no voice (r30): these four are what a tool uses to feel physical. All Web Audio, no files. */
    /* a knife chop: a short burst of noise through a falling filter, with a low thud under it */
    cut() {
      const c = ac(); if (!c) return;
      const t = c.currentTime + 0.005, n = Math.floor(c.sampleRate * 0.09);
      const buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      src.buffer = buf; f.type = "bandpass"; f.Q.value = 0.8;
      f.frequency.setValueAtTime(3200, t); f.frequency.exponentialRampToValueAtTime(700, t + 0.09);
      g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
      src.connect(f); f.connect(g); g.connect(c.destination); src.start(t);
      tone(c, 150, t, 0.08, "sine", 0.09, 70);
    },
    /* pieces coming to rest: two soft low clicks */
    settle() {
      const c = ac(); if (!c) return;
      const t = c.currentTime + 0.005;
      tone(c, 520, t, 0.07, "triangle", 0.07, 360);
      tone(c, 420, t + 0.07, 0.08, "triangle", 0.06, 300);
    },
    /* pieces closing into one: a rising sweep that lands on a click */
    trade() {
      const c = ac(); if (!c) return;
      const t = c.currentTime + 0.005;
      tone(c, 300, t, 0.28, "sine", 0.07, 900);
      tone(c, 1040, t + 0.27, 0.12, "triangle", 0.08);
    },
    /* a party popper: a sharp pop (a noise burst and a falling thump) just before the win chime */
    pop() {
      const c = ac(); if (!c) return;
      const t = c.currentTime + 0.005, n = Math.floor(c.sampleRate * 0.12);
      const buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
      const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      src.buffer = buf; f.type = "highpass"; f.frequency.value = 900;
      g.gain.setValueAtTime(0.2, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
      src.connect(f); f.connect(g); g.connect(c.destination); src.start(t);
      tone(c, 220, t, 0.1, "sine", 0.1, 90);
    },
    /* a celebration: a quick run up and a sparkle on top (the summary page; a phase end has win) */
    cheer() {
      const c = ac(); if (!c) return;
      const t = c.currentTime + 0.01;
      [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98].forEach((f, i) => tone(c, f, t + i * 0.08, 0.26, "triangle", 0.09));
      [2093, 2637, 3136].forEach((f, i) => tone(c, f, t + 0.5 + i * 0.07, 0.22, "sine", 0.04));
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

/* r30: THE LESSON HAS NO VOICE. Every line is printed on the bubble and paced by its reading time (the old "no voice"
   path below, now the only one): no device speech, no baked clips, no "Tap to start" cover. What is heard is sound
   effects (makeSfx: correct, wrong, win, tick, cut, settle, trade, cheer), and the sound button switches those. The
   speech code is kept only so the classic r13-r29 behaviour stays readable; nothing reaches it while this is true. */
const SILENT_VOICE = true;
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
  + "સાઠ એકસઠ બાસઠ ત્રેસઠ ચોસઠ પાંસઠ છાસઠ સડસઠ અડસઠ ઓગણસિત્તેર સિત્તેર એકોતેર બોતેર તોતેર ચુમ્મોતેર પંચોતેર છોતેર સિત્યોતેર અઠ્યોતેર ઓગણએંસી "
  + "એંસી એક્યાસી બ્યાસી ત્યાસી ચોર્યાસી પંચાસી છ્યાસી સિત્યાસી અઠ્યાસી નેવ્યાસી નેવું એકાણું બાણું ત્રાણું ચોરાણું પંચાણું છન્નું સત્તાણું અઠ્ઠાણું નવ્વાણું").split(" ");
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
   preview); `decodeAudioData` is not subject to CSP. */
const stopClip = () => { if (voiceSrc) { try { voiceSrc.onended = null; voiceSrc.stop(); } catch (e) {} voiceSrc = null; } };
/* where a published tool's clips live: `const TOOL_VOICE_BASE: string = "https://.../2dtool/_voice/"` (voice.tsx,
   rewritten by publish; "" while the clips are inline, as in preview and in every check) */
const voiceBase = (): string => (typeof TOOL_VOICE_BASE !== "undefined" ? (TOOL_VOICE_BASE as any) : "");
const voicePending: Record<string, Promise<any>> = {};        /* a clip being fetched and decoded, by piece text */
/* a clip not yet decoded, decoded once and cached by its exact piece text. Its TOOL_VOICE value is either an
   inline `data:` URI (local) or a small file name fetched from TOOL_VOICE_BASE (published: the only network
   call the runtime makes, port allows exactly this one) */
const voiceDecode = (text: string): Promise<any> => {
  if (voiceBuf[text]) return Promise.resolve(voiceBuf[text]);
  if (voicePending[text]) return voicePending[text];
  const uri = voiceMap()[text];
  if (!uri) return Promise.reject(new Error("no clip for this piece"));
  const ctx = ensureVoiceCtx();
  if (!ctx) return Promise.reject(new Error("no audio context"));
  let bytes: Promise<ArrayBuffer>;
  if (/^data:/.test(uri)) {
    const b = atob(uri.slice(uri.indexOf(",") + 1)), a = new Uint8Array(b.length);
    for (let i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
    bytes = Promise.resolve(a.buffer);
  } else {
    bytes = fetch(voiceBase() + uri).then((res: any) => { if (!res.ok) throw new Error("voice clip " + res.status); return res.arrayBuffer(); });
  }
  const p = bytes.then((ab: ArrayBuffer) => ctx.decodeAudioData(ab)).then((buf: any) => { voiceBuf[text] = buf; delete voicePending[text]; return buf; },
    (e: any) => { delete voicePending[text]; throw e; });
  voicePending[text] = p;
  return p;
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

function useVoice(mutedRef: any, langRef: any, cfg: { rate: number; pitch: number }, holdRef?: any) {
  const [line, setLine] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const token = useRef(0);             /* the run: a new run makes every older callback stale */
  const last = useRef<string[]>([]);
  /* CLASSROOM mode (holdRef.current true): a teacher paces the lesson. A piece of a line, once said (or, with
     the sound off, once shown), does not go on to the next piece by itself: the next step is PARKED and a tap
     on the bubble (release) takes it. Off, holdRef is false and nothing below changes. */
  const lastOpts = useRef<any>({});
  const parked = useRef<(() => void) | null>(null);
  const [held, setHeld] = useState(false);
  const holding = () => !!(holdRef && holdRef.current);
  const park = (fn: () => void) => { parked.current = fn; setHeld(true); };
  const unpark = () => { parked.current = null; setHeld(false); };
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
    /* a piece nobody speaks has nothing to wait for: in classroom mode it is done at once, and parks */
    /* (r34: in a classroom only the pieces BEFORE a line's last wait for the teacher's tap, so they are done at once and
       park; the last piece is read for its reading time, like any line, and a tap on the bubble skips it) */
    /* r41: a `nopark` line (a win, a closing line, a summary row, free play, Work's api.say) never parks, so its pieces are
       read for their reading time like any line: zeroing them showed the first piece for 30 ms in a classroom */
    const quiet = (ms: number) => later(() => { if (cur.current === r) r.done(); }, holding() && !r.last && !r.nopark ? 0 : ms);
    if (SILENT_VOICE) { setSpeaking(false); quiet(r.span); return; }   /* r30: printed and timed, never spoken */
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
    cur.current = null; flush(); stopEngine(); setSpeaking(false); unpark();
  }, []);

  /* `opts.open`: this line's end OPENS the next stage (a teach run ends on the question, and the question's
     slot must be open while the question is on the bubble): in classroom mode `done` goes when the last piece
     starts, not when a tap comes. Every other end (a closing line, a summary row) waits for the tap. */
  const speak = useCallback((lines: any, done?: () => void, opts?: { open?: boolean }) => {
    const run = ++token.current;
    cur.current = null; flush(); stopEngine(); setSpeaking(false); unpark();
    if (!SILENT_VOICE && hasBakedVoice(langRef.current)) warmVoice(langRef.current);
    /* numbers and operators into words in the language in use (speakable() for English, as before) */
    const list = (Array.isArray(lines) ? lines : [lines])
      .map((l: any) => speakableIn(l, langRef.current))
      .filter(Boolean).flatMap((l: string) => pieces(l));
    last.current = list;
    lastOpts.current = opts || {};
    const open = !!(opts && opts.open);
    let called = false;
    const fire = () => { if (called) return; called = true; if (done) done(); };
    /* classroom mode: the step after a piece waits for a tap. The line's own END waits only when a `done` follows it
       (a closing line's walk, a summary row's next row) and it does not open a stage: a win line, a hint or a
       question with nothing after it has nothing to wait for, and parking there was a dead tap with the arrow on */
    const gate = (k: number) => {
      if (run !== token.current) return;
      /* r34, classroom (the manual arrow): a LONG line pages piece by piece and each piece after the first waits for a tap;
         the END of a line never waits (a hint, a win, a closing line, a question, a summary row go on by themselves) */
      if (holding() && !(opts && opts.nopark) && k < list.length) { park(() => step(k)); return; }
      step(k);
    };
    const step = (i: number) => {
      if (run !== token.current) return;
      if (i >= list.length) { cur.current = null; setSpeaking(false); fire(); return; }
      const text = list[i];
      setLine(text);
      if (/\d/.test(text)) console.warn("[voice] a spoken line still contains a digit:", text);
      let spent = false;
      const r: any = { text, base: 0, t0: Date.now(), span: readMs(text), mark: 0, last: i === list.length - 1, nopark: !!(opts && opts.nopark),
        done: () => { if (spent || run !== token.current) return; spent = true; if (cur.current === r) cur.current = null; gate(i + 1); },
        /* a tap on the bubble while this piece is still going: cut it short and show the next at once */
        skip: () => { if (spent || run !== token.current) return; spent = true; r.uid = (r.uid || 0) + 1; if (cur.current === r) cur.current = null; flush(); stopEngine(); setSpeaking(false); step(i + 1); } };
      cur.current = r;
      utter(r, 0);
    };
    step(0);
  }, []);

  /* a tap on the bubble: take the parked step, else cut the piece in flight short. True when it did either. */
  const release = useCallback((onlyParked: boolean = false): boolean => {
    const f = parked.current;
    if (f) { parked.current = null; setHeld(false); f(); return true; }
    if (onlyParked) return false;
    const r = cur.current;
    if (r && r.skip && holding()) { r.skip(); return true; }
    return false;
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
    later(() => { if (cur.current === r) r.done(); }, holding() ? 0 : r.span);
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
    /* a baked voice plays through Web Audio, which a browser keeps suspended until a tap in this frame:
       every tap (re)starts the context inside the gesture itself */
    if (!SILENT_VOICE && hasBakedVoice(langRef.current)) ensureVoiceCtx();
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
  const repeat = useCallback((done?: () => void) => { if (last.current.length) speak(last.current, done, lastOpts.current); }, [speak]);
  const again = useCallback(() => repeat(), [repeat]);
  useEffect(() => () => hush(), [hush]);
  const state = () => ({ voice: SILENT_VOICE ? "silent" : hasBakedVoice(langRef.current) ? "baked clips" : (() => { const v = pickVoice(langRef.current); return v ? `${v.name} (${v.lang})` : null; })(), blocked: blocked.current, inFlight: cur.current ? cur.current.text : null });
  const reading = () => !!cur.current;   /* a line (or one of its pieces) is being read right now */
  return { line, speaking, needsTap, unlock, speak, hush, pause, resume, again, repeat, state, held, release, reading };
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
      {THEME && THEME.key && g("gTkey", THEME.key[0], THEME.key[1])}
      {THEME && THEME.enter && g("gTenter", THEME.enter[0], THEME.enter[1])}
      {THEME && THEME.soft && g("gTsoft", THEME.soft[0], THEME.soft[1])}
      {THEME && THEME.panel && g("gTpanel", THEME.panel[0], THEME.panel[1])}
      {shadow("fShadow", 6, 7, 0.16)}
      {shadow("fShadowSoft", 3, 3, 0.14)}
      {shadow("fLift", 14, 10, 0.24)}
      {shadow("fBtnDown", 1, 1.5, 0.18)}
      {/* the header's three buttons (head of 2026-10-13, the owner's picture): a cream disc on a tan bevelled rim, a bulb, a speaker, a refresh arrow */}
      {g("hcRim", "#E6D5B3", "#BFA37A")}
      {g("hcBulb", "#FFE56B", "#F2A100")}
      {g("hcBase", "#8A90B0", "#5A5F80")}
      <radialGradient id="hcFace" cx="38%" cy="30%" r="80%">
        <stop offset="0" stopColor="#FFFEF9" /><stop offset="0.55" stopColor="#F8EDD6" /><stop offset="1" stopColor="#EBD9B8" />
      </radialGradient>
      <linearGradient id="hcSpk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7CC4FF" /><stop offset="1" stopColor="#2E78D6" /></linearGradient>
      <linearGradient id="hcWave" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFD24D" /><stop offset="1" stopColor="#F08A00" /></linearGradient>
      <linearGradient id="hcGrn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8EE07C" /><stop offset="1" stopColor="#2F9A41" /></linearGradient>
    </defs>
  );
}

/* "One thing invites a finger": a single gentle ring. Put it on the one thing to touch. */
function Invite({ x, y, r = 56, C }: any) {
  /* the one invite takes the tool's THEME accent (r33) when it has one, so it is seen on the board's colours */
  return <circle className="c4-pulse" cx={x} cy={y} r={r} fill="none" stroke={(THEME && THEME.enter && THEME.enter[1]) || (C && C.accent) || DEFAULT_CHROME.accent} strokeWidth={5} pointerEvents="none" />;
}

/* r46: the Next key BLINKS (a hard on-off ring round it, in the tool's Enter colour), so a child sees the lesson is waiting for
   a tap; under reduced motion the ring stays on, still. It takes no pointer events. */
/* r49: the same blinking ring, for anything the child must tap (a card, the Yes / No keys, the Answer key): a tool draws
   <BlinkRing x y w h rx C /> round the card it wants answered while the keypad is shut. `m` is how far it stands off. */
function BlinkRing({ x, y, w, h, rx, C, sw = 4, m = 2 }: any) {
  return <rect className="c4-nextblink" x={x - m} y={y - m} width={w + 2 * m} height={h + 2 * m} rx={(rx ?? RAD.key) + m} fill="none" strokeWidth={sw}
    stroke={(THEME && THEME.enter && THEME.enter[1]) || (C && C.accent) || DEFAULT_CHROME.accent} pointerEvents="none" />;
}
function NextBlink({ x, y, w, h, C }: any) {
  /* hugs the key (2 units off its face and edge): the question bar leaves only 3 below the key's edge */
  return <BlinkRing x={x} y={y} w={w} h={h + EDGE} rx={RAD.key} C={C} />;
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

/** A number that eases to its target (0 or 1) in about 280 ms and holds there; under reduced motion it jumps.
    The board layout's answer panel slides on it, and the working area's width follows it frame by frame. */
function useSlide(target: number) {
  const [v, setV] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    if (cur.current === target) return;
    if (reducedMotion()) { cur.current = target; setV(target); return; }
    const from = cur.current, t0 = performance.now(), dur = 280;
    let raf = 0;
    const step = (now: number) => {
      const k = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
      cur.current = k >= 1 ? target : from + (target - from) * e;
      setV(cur.current);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

/** A SKIN: the picture of the object a tool is sharing out (a chocolate bar, a cake), from the slot's generated
    images.tsx (`TOOL_IMAGES`, made by `node cli.mjs images`; docs/IMAGES.md). Only ever the object's look: the tool
    draws the cuts, the counts, the shading and every label itself, over or from this picture, so the maths never
    depends on pixels. The picture is clipped to the shape the tool gives it (`clip`: the url of a clipPath the tool
    defines). No picture for the name, or one that fails to decode, draws nothing: the plain shape the tool draws
    under it is the fallback. Never write <image> in a tool: use this. */
function Skin({ name, x, y, w, h, clip, opacity = 1, fit = "slice" }: any) {
  const [bad, setBad] = useState(false);
  const src = typeof TOOL_IMAGES !== "undefined" ? (TOOL_IMAGES as any)[name] : "";
  if (!src || bad || !SKINS) return null;
  /* fit "slice" (the default): the picture fills the box and is cropped to it, right for a texture or a whole object
     clipped to a shape. fit "stretch": the picture is stretched to the box, never cropped, right for a tile that keeps
     its own bevel and rim (a chocolate square drawn at each piece's rectangle: 160 x 160 into 96 x 84 must not lose
     its top and bottom rim). */
  return <image data-role="skin" href={src} x={x} y={y} width={w} height={h} preserveAspectRatio={fit === "stretch" ? "none" : "xMidYMid slice"}
    clipPath={clip} opacity={opacity} pointerEvents="none" aria-hidden="true" onError={() => setBad(true)} />;
}
/* props.skins === false draws no skin at all, so a check can prove the plain shapes underneath stand on their own */
let SKINS = true;
/* THEME (r31, opt-in: `THEME` in the object a tool passes to ToolFrame; name your own const TB_THEME, never THEME): the
   colours of the keypad, the Answer and Start keys, the answer panel and the answer box's edge, so a tool's own look
   reaches the controls the child presses. { key, enter, soft: [top, bottom, edge, ink], panel: [top, bottom], slot: edge }.
   key = the digit keys; enter = Enter, Answer, Start; soft = rub out, Close, point. Without it the chrome's own colours. */
let THEME: any = null;
/* DEFAULT_THEME (head of 2026-10-13): the keys, Enter / Answer / Start, answer panel and answer-box edge of a tool with NO theme of
   its own (no skin, so no TOOL_THEME). It is the chocolate preset (lib/images/theme.mjs, the owner's pick), so every start page and
   every Enter key is the same berry family and never the chrome's grey accent; a tool with skins keeps the theme its image agent
   chose from the object. A tool never hard-codes a THEME (name your own const TB_THEME if you must override). */
const DEFAULT_THEME: any = { key: ["#A45E3C", "#7A3F22", "#4E2410", "#FFF3DC"], enter: ["#E0408F", "#BE1F78", "#8C0F55", "#FFFFFF"],
  soft: ["#FFE29A", "#F7C25A", "#C48E1F", "#5B3410"], panel: ["#FFF1D6", "#F3D9A8"], slot: "#7A3F22" };
const toneInk =(tone: string, d: string) => (THEME && tone && THEME[tone] ? THEME[tone][3] : d);
const slotEdge = (C: any) => (THEME && THEME.slot) || C.accent;

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
function usePress(onPress: () => void, enabled = true, keepFocus = false) {
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
    if (e.repeat) return;   /* r24: a held key repeats keydown (auto-repeat): the press counts once */
    setDown(true);
    setTimeout(() => setDown(false), 120);
    act.current();
    /* `keepFocus` (the classroom bubble): the teacher's Enter or Space goes on advancing while the bubble keeps
       the focus; the first physical digit the child types blurs it (the global handler), so Enter then answers */
    if (!keepFocus) pointerBlur();
  };
  return { down, bind, keys };
}

/** An invisible tap target on the working area (a column, a gap): finger, pen, mouse, Enter or Space. */
/* `enabled: false` keeps the box focusable but lets Enter and Space pass to the window, so a cell that
   holds the pad (api.capture) can answer with the next Enter instead of re-opening itself (PATTERNS §5). */
function Hit({ id, x, y, w, h, onPress, label, enabled = true, keep = false }: any) {
  const p = usePress(onPress, enabled, keep);
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
function Key({ id, x, y, w, h, C, primary, onClick, children, rx = RAD.key, disabled, label, tone }: any) {
  const p = usePress(onClick || (() => {}), !disabled);
  /* a tool's THEME (r31) colours the keys of the tone it names: key, enter or soft */
  const th = THEME && tone && THEME[tone] ? THEME[tone] : null;
  const base = th ? th[2] : primary ? shade(C.accent, 0.28) : shade(C.rule, 0.08);
  return (
    <g className={"c4-ctl" + (disabled ? " is-off" : "") + (p.down ? " is-down" : "")} data-control={id} role="button"
      aria-label={label || id} aria-disabled={disabled ? "true" : undefined} tabIndex={disabled ? -1 : 0}
      {...(disabled ? {} : p.bind())} onKeyDown={p.keys}>
      {!disabled && <rect x={x} y={y + EDGE} width={w} height={h} rx={rx} fill={base} />}
      <g className="c4-body" style={{ transform: `translateY(${!disabled && p.down ? EDGE : 0}px)` } as any}>
        <rect className="c4-face" x={x} y={y} width={w} height={h} rx={rx}
          fill={disabled ? tint(C.panel, 0.55) : th ? `url(#gT${tone})` : primary ? "url(#gAccent)" : "url(#gKey)"}
          stroke={disabled ? tint(C.rule, 0.35) : th ? th[2] : primary ? shade(C.accent, 0.18) : C.rule} strokeWidth={2} />
        {!disabled && <path d={`M ${x + rx} ${y + 3} H ${x + w - rx}`} stroke="#FFFFFF" strokeOpacity={th ? 0.42 : primary ? 0.4 : 0.95} strokeWidth={3} strokeLinecap="round" />}
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

/* the header's three controls (head of 2026-10-13, the owner's picture): a cream glossy disc on a tan bevelled rim, with its own
   coloured icon on it. Pure SVG. Same contract as RoundControl: the data-control id, the aria label, the 56-unit face, the 72-unit
   finger box and the press-down; RoundControl itself is unchanged (a tool may use it). The colours are fixed art, not the tool's. */
function HeaderControl({ id, cx, cy, onClick, children, label }: any) {
  const p = usePress(onClick || (() => {}));
  return (
    <g className={"c4-ctl" + (p.down ? " is-down" : "")} data-control={id} role="button" aria-label={label || id} tabIndex={0}
      {...p.bind()} onKeyDown={p.keys}>
      <circle cx={cx} cy={cy} r={HIT / 2} fill="transparent" />
      <g transform={`translate(${cx},${cy})`}>
        <circle cx={0} cy={4} r={28} fill="#C2A67C" />
        <g className="c4-body" style={{ transform: `translateY(${p.down ? 4 : 0}px)` } as any}>
          <circle className="c4-face" cx={0} cy={0} r={28} fill="url(#hcRim)" stroke="#B39A72" strokeWidth={1.2} />
          <circle cx={0} cy={0} r={24.2} fill="url(#hcFace)" stroke="#E9DBBE" strokeWidth={0.8} />
          <ellipse cx={-12.5} cy={-13.5} rx={6.6} ry={2.6} transform="rotate(-38 -12.5 -13.5)" fill="#FFFFFF" opacity={0.9} />
          <circle cx={-17.6} cy={-6.2} r={1.3} fill="#FFFFFF" opacity={0.8} />
          <path d="M -19 12 A 22 22 0 0 0 14 19" fill="none" stroke="#D9C49C" strokeWidth={1.6} strokeLinecap="round" opacity={0.7} />
          {children}
        </g>
      </g>
    </g>
  );
}
/* the hint key's bulb: a yellow glass with a brown outline, a screw base, five rays (icons are drawn in a 48-unit box on 0,0) */
function IconBulb() {
  const ray = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <g key={k} strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C98400" strokeWidth={3.8} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFCB2E" strokeWidth={2.2} />
    </g>
  );
  return (
    <g>
      {ray(0, -21, 0, -17, "t")}{ray(-14.5, -16.2, -11.8, -13.3, "tl")}{ray(14.5, -16.2, 11.8, -13.3, "tr")}{ray(-20.5, -4, -16.5, -4, "l")}{ray(20.5, -4, 16.5, -4, "r")}
      <path d="M -6.6 8 C -6.6 3 -10.6 0.5 -10.6 -5.5 A 10.6 10.6 0 0 1 10.6 -5.5 C 10.6 0.5 6.6 3 6.6 8 Z" fill="url(#hcBulb)" stroke="#6B3D1A" strokeWidth={1.7} strokeLinejoin="round" />
      <path d="M -3 7 C -3.4 3 -2 1 0 -1 C 2 1 3.4 3 3 7" fill="none" stroke="#D98A00" strokeWidth={1.1} strokeLinecap="round" opacity={0.75} />
      <ellipse cx={-4.6} cy={-8.2} rx={2.6} ry={4} transform="rotate(25 -4.6 -8.2)" fill="#FFFFFF" opacity={0.75} />
      <rect x={-6.4} y={7.6} width={12.8} height={3.8} rx={1.6} fill="url(#hcBase)" stroke="#2E3350" strokeWidth={1.5} />
      <rect x={-6} y={11.4} width={12} height={3.8} rx={1.6} fill="url(#hcBase)" stroke="#2E3350" strokeWidth={1.5} />
      <path d="M -3.2 15.2 h 6.4 a 1.2 1.2 0 0 1 -1.2 2.4 h -4 a 1.2 1.2 0 0 1 -1.2 -2.4 z" fill="#4C506E" stroke="#2E3350" strokeWidth={1.4} strokeLinejoin="round" />
    </g>
  );
}
/* the sound key's speaker: a blue cone with orange waves; muted, a grey cross where the waves were (never red: the header stays on screen after a miss) */
function IconSpeaker({ on }: any) {
  const wave = (d: string, w: number, k: string) => (
    <g key={k} fill="none" strokeLinecap="round">
      <path d={d} stroke="#C4700A" strokeWidth={w + 1.8} />
      <path d={d} stroke="url(#hcWave)" strokeWidth={w} />
    </g>
  );
  return (
    <g>
      <path d="M -19 -4.6 h 6.6 l 10.2 -9.6 v 28.4 l -10.2 -9.6 h -6.6 z" fill="url(#hcSpk)" stroke="#1D3F78" strokeWidth={1.9} strokeLinejoin="round" />
      <path d="M -17.4 -3 h 6 l 9 -8.4" fill="none" stroke="#FFFFFF" strokeWidth={1.3} strokeLinecap="round" opacity={0.6} />
      {on ? [wave("M 4.8 -6.2 a 9 9 0 0 1 0 12.4", 3.4, "w1"), wave("M 10.6 -11.6 a 16 16 0 0 1 0 23.2", 3.8, "w2")] : (
        <g fill="none" strokeLinecap="round">
          <path d="M 6 -6 L 17 6 M 17 -6 L 6 6" stroke="#6F695A" strokeWidth={5.6} />
          <path d="M 6 -6 L 17 6 M 17 -6 L 6 6" stroke="#B7B0A0" strokeWidth={3} />
        </g>
      )}
    </g>
  );
}
/* the restart key's refresh arrow (also "back to the start" on a later phase): a green ring open at the top right, its head pointing on */
function IconRefresh() {
  return (
    <g>
      <path d="M 10.42 4.86 A 11.5 11.5 0 1 1 3.93 -10.8" fill="none" stroke="#1E6A31" strokeWidth={8.4} strokeLinecap="round" />
      <path d="M 10.42 4.86 A 11.5 11.5 0 1 1 3.93 -10.8" fill="none" stroke="url(#hcGrn)" strokeWidth={5.4} strokeLinecap="round" />
      <path d="M -9.6 -4.6 A 11.5 11.5 0 0 1 -1 -11.2" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" opacity={0.55} />
      <path d="M 15.7 -6.5 L 5.4 -17.2 L 1 -5 Z" fill="url(#hcGrn)" stroke="#1E6A31" strokeWidth={2.4} strokeLinejoin="round" />
    </g>
  );
}

/* icons: 48-unit box centred on 0,0, bold round strokes */
const ICON = { fill: "none", strokeWidth: 4.5, strokeLinecap: "round", strokeLinejoin: "round" } as any;
/* a lightbulb for the header's Hint key (r35): the glass, its neck and the base, bold round strokes like the other icons */
function IconHint({ c }: any) {
  return (
    <g {...ICON} stroke={c}>
      <path d="M -6 12 h 12 M -4 19 h 8" />
      <path d="M -9 8 c 0 -5 -9 -8 -9 -17 a 13 13 0 0 1 26 0 c 0 9 -9 12 -9 17 z" />
    </g>
  );
}
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
.c4-hop{transform-box:fill-box;transform-origin:50% 100%;animation:c4hop .75s ease-out 1}
@keyframes c4hop{0%{transform:translateY(0)}35%{transform:translateY(-24px) rotate(-2deg)}70%{transform:translateY(0) scale(1.03,.97)}100%{transform:none}}
.c4-nod{transform-box:fill-box;transform-origin:50% 100%;animation:c4nod .6s ease-in-out 1}
@keyframes c4nod{0%,100%{transform:none}30%{transform:rotate(-4deg)}65%{transform:rotate(3deg)}}
.c4-cheer{transform-box:fill-box;transform-origin:50% 100%;animation:c4cheer 2.1s ease-in-out 1}
@keyframes c4cheer{0%{transform:none}8%{transform:scale(1.05,.93)}24%{transform:translateY(-26px) scale(.98,1.03) rotate(-3deg)}38%{transform:scale(1.05,.94)}54%{transform:translateY(-32px) scale(.98,1.03) rotate(3deg)}68%{transform:scale(1.05,.94)}84%{transform:translateY(-38px) scale(.98,1.03) rotate(-2deg)}96%{transform:scale(1.04,.95)}100%{transform:none}}
.c4-cheer1{transform-box:fill-box;transform-origin:50% 100%;animation:c4cheer1 .85s ease-out 1}
@keyframes c4cheer1{0%{transform:none}12%{transform:scale(1.05,.93)}40%{transform:translateY(-26px) scale(.98,1.03) rotate(-2deg)}70%{transform:scale(1.04,.95)}100%{transform:none}}
.c4-twinkle{transform-box:fill-box;transform-origin:center;animation:c4twinkle 1.1s ease-in-out 2 both}
@keyframes c4twinkle{0%{transform:scale(0) rotate(0);opacity:0}35%{transform:scale(1.15) rotate(45deg);opacity:1}70%{transform:scale(.8) rotate(90deg);opacity:1}100%{transform:scale(1.1) rotate(135deg);opacity:0}}
.c4-px{animation:c4px 1.9s cubic-bezier(.2,.7,.4,1) both}
.c4-py{animation:c4py 1.9s cubic-bezier(.3,0,.5,1) both}
.c4-pr{transform-box:fill-box;transform-origin:center;animation:c4pr 1.9s linear both,c4pf 1.9s ease-in both}
@keyframes c4px{0%{transform:translateX(0)}100%{transform:translateX(var(--dx))}}
@keyframes c4py{0%{transform:translateY(0)}42%{transform:translateY(var(--ay))}100%{transform:translateY(var(--by))}}
@keyframes c4pr{0%{transform:rotate(0)}100%{transform:rotate(var(--r))}}
@keyframes c4pf{0%,70%{opacity:1}100%{opacity:0}}
.c4-flash{transform-box:fill-box;transform-origin:50% 100%;animation:c4flash .4s ease-out both}
@keyframes c4flash{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.6);opacity:0}}
.c4-ring{animation:c4ring 1.2s ease-in-out infinite}
@keyframes c4ring{50%{stroke-opacity:.35}}
.c4-cue{animation:c4cue .8s ease-in-out infinite}
@keyframes c4cue{0%,100%{opacity:1}50%{opacity:.05}}
.c4-nextblink{animation:c4nextblink .9s ease-in-out infinite}
@keyframes c4nextblink{0%,100%{stroke-opacity:1}50%{stroke-opacity:.08}}
[data-control="next-key"] .c4-face{animation:c4nextface .9s ease-in-out infinite}
@keyframes c4nextface{0%,100%{filter:brightness(1)}50%{filter:brightness(1.3)}}
.c4-tdot{animation:c4tdot 2.1s ease-in-out infinite}
@keyframes c4tdot{0%,60%,100%{opacity:.22}15%,45%{opacity:1}}
.c4-bulb{transform-box:fill-box;transform-origin:50% 100%;animation:c4bulb 1s ease-out 1 both}
@keyframes c4bulb{0%{transform:scale(.2);opacity:0}18%{transform:scale(1.18);opacity:1}32%{transform:scale(1);opacity:1}82%{transform:scale(1);opacity:1}100%{transform:scale(.9);opacity:0}}
@media (prefers-reduced-motion:reduce){[data-control="next-key"] .c4-face{animation:none}.c4-pulse,.c4-caret,.c4-talk,.c4-hop,.c4-nod,.c4-cheer,.c4-cheer1,.c4-twinkle,.c4-ring,.c4-cue,.c4-nextblink,.c4-px,.c4-py,.c4-pr,.c4-flash,.c4-tdot,.c4-bulb{animation:none}.c4-ctl .c4-body{transition:none}.c4-fill{transition:none}}
`;

/* the runtime's OWN chrome text (never a tool's content) in the three shipped languages. A tool never
   sets these directly; only the host's `lang` prop does (like `operatorMode`). Hindi and Gujarati
   routinely run longer than the English they replace, so a layout must still fit the longest of the
   three (LAYOUT.md); this first pass is a working draft and wants a native-speaker review before a
   chapter ships in Hindi or Gujarati, the same way a maths reviewer reads English wording today. */
const UI_STRINGS: Record<string, any> = {
  en: {
    again: "Hint", soundOff: "Sound off", soundOn: "Sound on", restart: "Start this phase again",
    rubOut: "Rub out", enter: "Enter", point: "Point", freePlay: "Free play", playAgain: "Play again",
    wellDone: "Well done!", summaryLine: "Here is the summary of what you have learned.", tapToStart: "Tap to start", freePlayLine: "Free play.",
    rightFirstTime: (a: number, b: number) => `Right first time: ${a} / ${b}`,
    starsLabel: (a: number, b: number) => `Right first time: ${a} of ${b}`,
    phaseOf: (n: number, N: number) => `Phase ${n} of ${N}`,
    questionOf: (i: number, total: number) => `Question ${i} of ${total}`,
    stepOf: (k: number, N: number) => `Step ${k} of ${N}`,
    word: { now: "now", done: "done", "not yet": "not yet" },
    bubbleNext: "Next line",
    answer: "Answer", answerClose: "Close", start: "Start", toStart: "Back to the start", typeIt: "Type your answer, then press Enter.", pickIt: "Choose your answer.",
    next: "Next", nextPhase: "Next phase", summaryKey: "Summary",
    tapCard: (c: string) => `Tap the blinking ${c} card.`, tapAnswer: "Tap the blinking Answer key.",
  },
  hi: {
    again: "संकेत", soundOff: "ध्वनि बंद", soundOn: "ध्वनि चालू", restart: "यह चरण फिर से शुरू करें",
    rubOut: "मिटाएँ", enter: "दर्ज करें", point: "बिंदु", freePlay: "मुक्त खेल", playAgain: "फिर से खेलें",
    wellDone: "बहुत बढ़िया!", summaryLine: "यह रहा सारांश: तुमने क्या सीखा।", tapToStart: "शुरू करने के लिए स्पर्श करें", freePlayLine: "मुक्त खेल।",
    rightFirstTime: (a: number, b: number) => `पहली बार में सही: ${a} / ${b}`,
    starsLabel: (a: number, b: number) => `पहली बार में सही: ${b} में से ${a}`,
    phaseOf: (n: number, N: number) => `चरण ${n}, ${N} में से`,
    questionOf: (i: number, total: number) => `प्रश्न ${i}, ${total} में से`,
    stepOf: (k: number, N: number) => `चरण ${k}, ${N} में से`,
    word: { now: "अभी", done: "पूरा", "not yet": "अभी नहीं" },
    bubbleNext: "अगली पंक्ति",
    answer: "उत्तर", answerClose: "बंद करें", start: "शुरू करें", toStart: "शुरुआत पर लौटें", typeIt: "अपना उत्तर लिखो, फिर दर्ज करें दबाओ।", pickIt: "अपना उत्तर चुनो।",
    next: "आगे", nextPhase: "अगला चरण", summaryKey: "सारांश",
    tapCard: (c: string) => `चमकते ${c} कार्ड को छुओ।`, tapAnswer: "चमकती उत्तर कुंजी को छुओ।",
  },
  gu: {
    again: "સંકેત", soundOff: "અવાજ બંધ", soundOn: "અવાજ ચાલુ", restart: "આ તબક્કો ફરી શરૂ કરો",
    rubOut: "ભૂંસો", enter: "દાખલ કરો", point: "બિંદુ", freePlay: "મુક્ત રમત", playAgain: "ફરી રમો",
    wellDone: "ખૂબ સરસ!", summaryLine: "આ રહ્યો સારાંશ: તમે શું શીખ્યા.", tapToStart: "શરૂ કરવા સ્પર્શ કરો", freePlayLine: "મુક્ત રમત.",
    rightFirstTime: (a: number, b: number) => `પ્રથમ પ્રયાસમાં સાચા: ${a} / ${b}`,
    starsLabel: (a: number, b: number) => `પ્રથમ પ્રયાસમાં સાચા: ${b} માંથી ${a}`,
    phaseOf: (n: number, N: number) => `તબક્કો ${n}, ${N} માંથી`,
    questionOf: (i: number, total: number) => `પ્રશ્ન ${i}, ${total} માંથી`,
    stepOf: (k: number, N: number) => `તબક્કો ${k}, ${N} માંથી`,
    word: { now: "હમણાં", done: "પૂર્ણ", "not yet": "હજી નહીં" },
    bubbleNext: "આગલી લીટી",
    answer: "જવાબ", answerClose: "બંધ કરો", start: "શરૂ કરો", toStart: "શરૂઆત પર પાછા જાઓ", typeIt: "તમારો જવાબ લખો, પછી દાખલ કરો દબાવો.", pickIt: "તમારો જવાબ પસંદ કરો.",
    next: "આગળ", nextPhase: "આગલો તબક્કો", summaryKey: "સારાંશ",
    tapCard: (c: string) => `ઝબકતા ${c} કાર્ડને સ્પર્શ કરો.`, tapAnswer: "ઝબકતી જવાબ કીને સ્પર્શ કરો.",
  },
};

function Header({ C, name, title, soundOn, onAgain, onSound, onRestart, UI, toStart }: any) {
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
      <HeaderControl id="again" label={UI.again} cx={1388} cy={40} onClick={onAgain}><IconBulb /></HeaderControl>
      <HeaderControl id="sound" label={soundOn ? UI.soundOff : UI.soundOn} cx={1460} cy={40} onClick={onSound}><IconSpeaker on={soundOn} /></HeaderControl>
      <HeaderControl id="restart" label={toStart ? UI.toStart : UI.restart} cx={1532} cy={40} onClick={onRestart}><IconRefresh /></HeaderControl>
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
/* what a slot box shows: the tool's format(value, index, { lang, tx }) if it has one, then the tool's TR (a chosen
   word, a Yes/No, "ones" shows in the language in use; a number, or a word with no entry, stays as it is) */
function shownIn(format: any, v: any, j: any, lang: string, TR: any): string {
  const tx = (x: any) => lineFor(x, lang, TR);
  const out = String(format ? format(v, j, { lang, tx }) : v);
  return lang && lang !== "en" ? tx(out) : out;
}

function SlotStack({ C, parts, typed, active, live, format, part, onPart, lang, TR }: any) {
  const np = parts.length, vals = slotPartsOf(typed, np);
  const k = (at: string) => parts.findIndex((p: any) => p.at === at);
  const iw = k("whole"), it = k("top"), ib = k("bottom");
  const cw = 132, ch = 38, ww = 110, gap = 30;
  const left = iw >= 0 ? Z.slot.x + (Z.slot.w - (ww + gap + cw)) / 2 : 0;
  const fx = iw >= 0 ? left + ww + gap : Z.slot.x + (Z.slot.w - cw) / 2;
  const split = iw >= 0 ? left + ww + gap / 2 : Z.slot.x;
  const barY = Z.slot.y + 46;
  const shownOf = (j: number) => shownIn(format, vals[j], j, lang, TR);
  const cell = (j: number, x: number, y: number, w: number, h: number, size: number, hit: any) => {
    if (j < 0) return null;
    const on = active && j === part, shown = shownOf(j), nw = shown.length * size * 0.58;
    return (
      <g key={j}>
        {/* an empty cell has to read as "write here" on its own, without waiting for the caret: the
            fraction cells are less than half the whole cell's height, so they carry its edge, not a thinner one */}
        <rect x={x} y={y} width={w} height={h} rx={8} fill={mix(C.panel, "#FFFFFF", 0.3)}
          stroke={on ? slotEdge(C) : C.rule} strokeWidth={on ? 3 : 2.5} />
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
        stroke={active ? slotEdge(C) : C.rule} strokeWidth={active ? 4 : 2} filter="url(#fShadowSoft)" />
      <rect x={fx - 12} y={barY - 2} width={cw + 24} height={4} rx={2} fill={C.ink} />
      {cell(iw, left, Z.slot.y + 4, ww, Z.slot.h - 8, T.speech, { x: Z.slot.x, y: Z.slot.y, w: split - Z.slot.x, h: Z.slot.h })}
      {cell(it, fx, barY - 4 - ch, cw, ch, T.label, { x: split, y: barY - HIT, w: fw, h: HIT })}
      {cell(ib, fx, barY + 4, cw, ch, T.label, { x: split, y: barY, w: fw, h: HIT })}
    </g>
  );
}

/* The same boxes SIDE BY SIDE (r26): most digits are one or two, so the boxes sit in one row at full height with
   big digits instead of the stack's thin cells. A fraction is [numerator] / [denominator], a mixed number
   [whole] [numerator] / [denominator], a decimal [whole part] . [decimal part] with the point already drawn. A tool
   opts in with `sideBySide: true` (fractions and mixed numbers; the stack is the default), and a decimal answer
   (SLOT_DECIMAL) is always drawn this way. Same `part-N` controls (finger boxes that tile across the slot) and the
   same typing as the stack. The slash and the point are drawn, never text, so no language touches them. */
function SlotSide({ C, parts, typed, active, live, format, part, onPart, lang, TR }: any) {
  const np = parts.length, vals = slotPartsOf(typed, np);
  const sepOf = (j: number) => (parts[j].at === "top" ? "slash" : parts[j].at === "dwhole" ? "point" : null);
  const between = (j: number) => (sepOf(j) ? 40 : 12);
  let fixed = 0;
  for (let j = 0; j < np - 1; j++) fixed += between(j);
  const pad = 10, bw = (Z.slot.w - 2 * pad - fixed) / np, bh = Z.slot.h - 16, by = Z.slot.y + 8;
  const sizeOf = (shown: string) => [T.speech, T.label, T.micro].find((s) => shown.length * s * 0.58 <= bw - 24) || T.micro;
  const nodes: any[] = [];
  let x = Z.slot.x + pad;
  for (let j = 0; j < np; j++) {
    const shown = shownIn(format, vals[j], j, lang, TR), size = sizeOf(shown), nw = shown.length * size * 0.58;
    const on = active && j === part, mid = x + bw / 2;
    /* the finger boxes tile the whole slot, split halfway through each gap, the slot's full height (92, over 72) */
    const hx = j === 0 ? Z.slot.x : x - between(j - 1) / 2, hr = j === np - 1 ? Z.slot.x + Z.slot.w : x + bw + between(j) / 2;
    nodes.push(
      <g key={j}>
        <rect x={x} y={by} width={bw} height={bh} rx={10} fill={mix(C.panel, "#FFFFFF", 0.3)} stroke={on ? slotEdge(C) : C.rule} strokeWidth={on ? 3 : 2.5} />
        <text x={mid} y={by + bh / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={600} fill={C.ink}>{shown}</text>
        {on && <rect className="c4-caret" x={mid + nw / 2 + 4} y={by + (bh - size * 0.8) / 2} width={3} height={size * 0.8} rx={1.5} fill={C.accent} />}
        <SlotPartBox id={"part-" + (j + 1)} label={parts[j].label + " box"} x={hx} y={Z.slot.y} w={hr - hx} h={Z.slot.h}
          on={on} enabled={live ?? active} onPick={() => onPart && onPart(j)} />
      </g>
    );
    const sep = j < np - 1 ? sepOf(j) : null, sx = x + bw + between(j) / 2;
    if (sep === "slash") nodes.push(<path key={"s" + j} d={`M ${sx + 9} ${by + bh * 0.2} L ${sx - 9} ${by + bh * 0.8}`} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />);
    if (sep === "point") nodes.push(<circle key={"s" + j} cx={sx} cy={by + bh / 2 + T.speech * 0.36 - 7} r={6.5} fill={C.ink} />);
    x += bw + between(j);
  }
  return (
    <g>
      <rect x={Z.slot.x} y={Z.slot.y} width={Z.slot.w} height={Z.slot.h} rx={RAD.panel} fill="#FFFFFF"
        stroke={active ? slotEdge(C) : C.rule} strokeWidth={active ? 4 : 2} filter="url(#fShadowSoft)" />
      {nodes}
    </g>
  );
}

function Slot({ C, ask, typed, active, live, format, parts, part, onPart, lang, TR, side }: any) {
  const lines = wrapText(ask || "", 15).slice(0, 3);
  const askLines = lines.map((ln, k) => (
    <text key={k} x={Z.slot.x} y={236 - (lines.length - 1 - k) * 46} fontSize={T.prompt} fontWeight={500} fill={C.ink}>{ln}</text>
  ));
  if (parts && parts.length && parts.some((p: any) => p.at)) return (
    <g data-zone="slot">
      {askLines}
      {side || parts.some((p: any) => p.at === "dwhole")
        ? <SlotSide C={C} parts={parts} typed={typed} active={active} live={live} format={format} part={part} onPart={onPart} lang={lang} TR={TR} />
        : <SlotStack C={C} parts={parts} typed={typed} active={active} live={live} format={format} part={part} onPart={onPart} lang={lang} TR={TR} />}
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
          const shown = shownIn(format, vals[k], k, lang, TR);
          const unit = p.unit ? lineFor(String(p.unit), lang, TR) : "";
          const ugap = shown ? 24 : 0; /* room for the caret between the number and its unit */
          const uw = unit ? unit.length * T.micro * 0.55 + ugap : 0;
          const size = shown.length * T.prompt * 0.58 + uw <= bw - 28 ? T.prompt : T.label;
          const nw = shown.length * size * 0.58, left = cx - (nw + uw) / 2;
          return (
            <g key={k}>
              <rect x={x} y={Z.slot.y} width={bw} height={Z.slot.h} rx={RAD.panel} fill="#FFFFFF"
                stroke={on ? slotEdge(C) : C.rule} strokeWidth={on ? 4 : 2} filter="url(#fShadowSoft)" />
              <text x={x + 16} y={Z.slot.y + 31} fontSize={T.micro} fontWeight={500} fill={quiet}>{lineFor(p.label, lang, TR)}</text>
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
  const shown = shownIn(format, typed, undefined, lang, TR);
  const cx = Z.slot.x + Z.slot.w / 2;
  /* a long answer (a word, a number with commas) drops a size rather than spilling out of the slot */
  const size = shown.length * T.xl * 0.58 <= Z.slot.w - 40 ? T.xl : shown.length * T.speech * 0.58 <= Z.slot.w - 40 ? T.speech : T.prompt;
  const caretX = cx + (shown.length * size * 0.3) + 6;
  return (
    <g data-zone="slot">
      {askLines}
      <rect x={Z.slot.x} y={Z.slot.y} width={Z.slot.w} height={Z.slot.h} rx={RAD.panel} fill="#FFFFFF"
        stroke={active ? slotEdge(C) : C.rule} strokeWidth={active ? 4 : 2} filter="url(#fShadowSoft)" />
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
    /* a long word ("hundredth", "thousandth": 9 to 10 letters at the label size) does not fit a half-width key (164 on the board),
       so up to four keys stand in ONE full-width column, each still at least HIT tall; short words, or more keys, keep two columns */
    const longest = Math.max(...choices.map((c: any) => Math.max(...wrapText(lineFor(c.label, lang, TR), 10).slice(0, 2).map((s: string) => s.length))));
    const tooWide = longest * T.label * 0.6 + 24 > (Z.pad.w - gap) / 2;
    const cols = tooWide && choices.length <= 4 && (Z.pad.h - EDGE - gap * (choices.length - 1)) / choices.length >= HIT ? 1 : 2, rows = Math.ceil(choices.length / cols);
    /* the board layout's panel is tall (390): word keys are taller (up to 150) and the group sits in the middle of it, so a
       two-key question does not leave the lower half of the panel empty. The classic pad keeps its own sizes. */
    const cw = (Z.pad.w - gap) / cols, ch = Math.min(BOARD ? 150 : 110, (Z.pad.h - EDGE - gap * (rows - 1)) / rows);
    const top = BOARD ? Z.pad.y + Math.max(0, (Z.pad.h - EDGE - (rows * ch + (rows - 1) * gap)) / 2) : Z.pad.y;
    return (
      <g data-zone="pad" className={enabled ? "" : "c4-quiet"}>
        {choices.map((c: any, j: number) => {
          const x = Z.pad.x + (j % cols) * (cw + gap), y = top + Math.floor(j / cols) * (ch + gap);
          const lines = wrapText(lineFor(c.label, lang, TR), 10).slice(0, 2);
          return (
            <Key key={c.id} id={"choice-" + c.id} label={lineFor(c.label, lang, TR)} x={x} y={y} w={cw} h={ch} C={C} tone="key" disabled={!enabled} onClick={() => enabled && onChoice(c.id)}>
              {lines.map((ln: string, k: number) => (
                <text key={k} y={11 + (k - (lines.length - 1) / 2) * 32} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={enabled ? toneInk("key", C.ink) : quiet}>{ln}</text>
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
          const tone = k === "enter" ? "enter" : k === "back" || k === "point" ? "soft" : "key";
          const ink = off ? quiet : toneInk(tone, C.ink);
          return (
            <Key key={k} id={"key-" + k} label={NAMES[k] || k} x={x} y={y} w={w} h={h} C={C} tone={tone} primary={k === "enter" && !off} disabled={off}
              onClick={() => !off && onKey(k)}>
              {k === "back" ? <IconBack c={ink} /> : k === "enter" ? <IconEnter c={off ? quiet : toneInk("enter", "#FFFFFF")} />
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
        const tone = k === "enter" ? "enter" : k === "back" ? "soft" : "key";
        const ink = off ? quiet : toneInk(tone, C.ink);
        return (
          <Key key={k} id={"key-" + k} label={NAMES[k] || k} x={x} y={y} w={kw} h={kh} C={C} tone={tone} primary={k === "enter" && !off} disabled={off}
            onClick={() => !off && onKey(k)}>
            {k === "back" ? <IconBack c={ink} /> : k === "enter" ? <IconEnter c={off ? quiet : toneInk("enter", "#FFFFFF")} />
              : <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={ink}>{k}</text>}
          </Key>
        );
      })}
    </g>
  );
}

/* BOARD layout, the top bar: the question, and the key that opens the answer panel (mode "answer", it reads Close while
   the panel is open) or, for a question answered on the working area, commits it (mode "enter"); mode "off" while
   nothing is being asked (a teach line, a win): the key stays in place, flat and quiet. The runs box, when the tool
   has one, keeps its own place to the left of the bar. The question is one line at prompt size, else up to two lines
   at label size, else up to two at micro: the type floor holds, and Hindi and Gujarati fit the same box. */
function AskBar({ C, ask, hasRuns, mode, open, onKey, UI, nextLabel, choices, onChoice, lang, TR, quiet, blink, onTap }: any) {
  const x0 = hasRuns ? Z.runs.x + Z.runs.w + 16 : Z.ask.x;
  const bw = Z.ask.x + Z.ask.w - x0;
  /* r49 (cardAnswer): mode "choices" draws the question's choices (Yes / No) as keys at the right end, in the Answer key's
     place, each ringed and blinking until one is tapped; mode "card" (the answer is given on a card of the picture) and an
     idle bar of such a tool (`quiet`) draw no key at all */
  const nCh = mode === "choices" ? (choices || []).length : 0;
  /* a long word ("thousandth", 10 letters) needs a wider key: 150 for Yes / No, up to 236 so the word sits at the label size */
  const longest = nCh ? Math.max(...(choices || []).map((c: any) => lineFor(c.label, lang, TR).length)) : 0;
  const cw = Math.min(236, Math.max(150, Math.ceil(longest * T.label * 0.6 + 28))), cgap = 14;
  const kw = nCh ? nCh * cw + (nCh - 1) * cgap : 264, kh = 72, kx = x0 + bw - kw - 10, ky = Z.ask.y + (Z.ask.h - kh) / 2;
  const noKey = mode === "card" || (quiet && mode === "off");
  const room = (noKey ? x0 + bw - 10 : kx) - x0 - 40;
  const pick: any = [[T.prompt, 1], [T.label, 2], [T.micro, 2]].map(([s, l]: any) => ({ s, l, w: wrapText(ask, Math.floor(room / (s * 0.58))) }))
    .find((c: any) => c.w.length <= c.l) || { s: T.micro, w: wrapText(ask, Math.floor(room / (T.micro * 0.58))).slice(0, 2) };
  const lh = pick.s + 6, top = Z.ask.y + Z.ask.h / 2 - ((pick.w.length - 1) * lh) / 2 + pick.s * 0.36;
  const live = mode !== "off";
  /* mode "next" (r45, a tool with nextKey): the key stays where it was and becomes the Next key */
  const next = mode === "next";
  const label = next ? nextLabel : mode === "enter" ? UI.enter : open ? UI.answerClose : UI.answer;
  return (
    <g data-zone="ask" onClick={onTap}>
      <rect x={x0} y={Z.ask.y} width={bw} height={Z.ask.h} rx={RAD.panel + 4} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      {pick.w.map((ln: string, k: number) => (
        <text key={k} x={x0 + 28} y={top + k * lh} fontSize={pick.s} fontWeight={500} fill={C.ink}>{ln}</text>
      ))}
      {nCh > 0 && (choices || []).map((c: any, j: number) => {
        const x = kx + j * (cw + cgap), lab = lineFor(c.label, lang, TR), size = lab.length * T.prompt * 0.6 <= cw - 20 ? T.prompt : T.label;
        return (
          <g key={c.id}>
            <Key id={"choice-" + c.id} label={lab} x={x} y={ky} w={cw} h={kh} C={C} tone="key" onClick={() => onChoice && onChoice(c.id)}>
              <text y={size === T.prompt ? 14 : 11} textAnchor="middle" fontSize={size} fontWeight={600} fill={toneInk("key", C.ink)}>{lab}</text>
            </Key>
            <BlinkRing x={x} y={ky} w={cw} h={kh + EDGE} rx={RAD.key} C={C} />
          </g>
        );
      })}
      {!noKey && nCh === 0 && (
        <Key id={next ? "next-key" : mode === "enter" ? "answer-enter" : "answer-open"} label={label} x={kx} y={ky} w={kw} h={kh} C={C}
          tone={next || mode === "enter" || !open ? "enter" : "soft"} primary={live && (next || !open)} disabled={!live} onClick={onKey}>
          {/* a long Next label (Gujarati "Next phase", 11 letters) is set one size down, so it never touches the key's edge */}
          <text y={next && String(label).length > 10 ? 11 : 14} textAnchor="middle" fontSize={next && String(label).length > 10 ? T.label : T.prompt} fontWeight={600} fill={!live ? mix(C.ink, C.panel, 0.5) : open && !next && !(mode === "enter" && THEME && THEME.enter) ? toneInk("soft", C.ink) : toneInk("enter", "#FFFFFF")}>{label}</text>
        </Key>
      )}
      {next && <NextBlink x={kx} y={ky} w={kw} h={kh} C={C} />}
      {/* r24: the ring rides the key only while the child must press it: the Answer key with the keypad shut, or the Enter key once the answer is ready */}
      {blink && !next && (mode === "answer" ? !open : mode === "enter") && <NextBlink x={kx} y={ky} w={kw} h={kh} C={C} />}
    </g>
  );
}

/* The START PAGE (r28, opt-in: the tool gives `StartArt` and/or `START_HOOK`; LAYOUT.md §1c). The first thing a child
   sees in user mode, before any line is spoken: the tool's name, a picture the tool draws (the object the lesson is
   about, never an answer), one question to wonder at, a big Start key and the mascot. A tap or Enter on Start begins
   the lesson, and is the touch the browser needs before it will speak, so the first line plays at once. It is drawn
   over the whole stage and is the only thing drawn until Start. */
function StartPage({ C, name, hook, Art, UI, lang, tx, onStart, mascotOk, onMascotFail }: any) {
  const card = { x: 40, y: 40, w: 1520, h: 820 };
  const startRef = useRef<any>(null);
  const [startW, setStartW] = useState(String(UI.start).length * T.speech * 0.6);
  useEffect(() => {
    try { const w = startRef.current && startRef.current.getComputedTextLength(); if (w > 0) setStartW(w); } catch (e) {}
  }, [UI.start]);
  const titleSize = String(name).length * T.display * 0.6 <= 1300 ? T.display : T.xl;
  /* the hook: up to two lines at speech size, else up to three at label size; centred on y 636 */
  const text = String(hook || "");
  const pick: any = [[T.speech, 2], [T.label, 3]].map(([s, l]: any) => ({ s, l, w: wrapText(text, Math.floor(1180 / (s * 0.58))) }))
    .find((c: any) => c.w.length <= c.l) || { s: T.micro, w: wrapText(text, Math.floor(1180 / (T.micro * 0.58))).slice(0, 3) };
  /* Hindi and Gujarati lines carry ascenders and descenders that need more room between two lines */
  const lh = pick.s + (lang === "hi" || lang === "gu" ? 22 : 8), top = 636 - ((pick.w.length - 1) * lh) / 2 + pick.s * 0.36;
  return (
    <g data-zone="start">
      <rect x={0} y={0} width={1600} height={900} fill={C.paper} />
      <rect x={card.x} y={card.y} width={card.w} height={card.h} rx={RAD.card} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} filter="url(#fShadow)" />
      <path d={`M ${card.x + 30} ${card.y + 4} H ${card.x + card.w - 30}`} stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" />
      <text x={800} y={150} textAnchor="middle" fontSize={titleSize} fontWeight={700} fill={THEME && THEME.key ? THEME.key[1] : shade(C.accent, 0.3)}>{name}</text>
      <rect x={740} y={176} width={120} height={8} rx={4} fill={THEME && THEME.enter ? THEME.enter[1] : C.accent} />
      {Art && <g data-role="start-art" transform="translate(200,205)"><Art box={{ w: 1200, h: 340 }} C={C} lang={lang} tx={tx} /></g>}
      {pick.w.map((ln: string, k: number) => (
        <text key={k} x={800} y={top + k * lh} textAnchor="middle" fontSize={pick.s} fontWeight={600} fill={C.ink}>{ln}</text>
      ))}
      <line x1={80} y1={848} x2={340} y2={848} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      {mascotOk && (
        <image data-role="mascot" href={MASCOT_IMAGE} x={100} y={684} width={220} height={164} preserveAspectRatio="xMidYMax meet"
          aria-hidden="true" pointerEvents="none" onError={onMascotFail} />
      )}
      <Key id="start" label={UI.start} x={590} y={724} w={420} h={112} C={C} tone="enter" primary onClick={onStart}>
        {/* a play triangle and the word, centred together by the word's MEASURED width (a Hindi or Gujarati word is not
            as wide as the character count says) */}
        <g transform={`translate(${-(34 + 22 + startW) / 2},0)`}>
          <path d="M 0 -20 L 34 0 L 0 20 Z" fill={toneInk("enter", "#FFFFFF")} stroke={toneInk("enter", "#FFFFFF")} strokeWidth={6} strokeLinejoin="round" />
          <text ref={startRef} x={56} y={14} textAnchor="start" fontSize={T.speech} fontWeight={700} fill={toneInk("enter", "#FFFFFF")}>{UI.start}</text>
        </g>
      </Key>
    </g>
  );
}

/* r51 (nextKey): the Next key comes this much SOONER than the timer the lesson used to walk on by (the owner: "0.5 s less than the
   time between two questions"), for a question and for a phase's last question alike; it never waits for the win line to be read
   (a press cuts what is left of it) */
const NEXT_EARLY_MS = 500;
const PARTY_MS = 2300;   /* how long a party is on show */
/* r54: where the party's sparkles twinkle round the cheering mascot (only when the mascot has a cheering pose) */
const SPARKS = [{ x: 62, y: 752, s: 1, d: 0.05 }, { x: 96, y: 722, s: 1, d: 0.12 }, { x: 166, y: 716, s: 0.8, d: 0.27 }, { x: 226, y: 812, s: 0.8, d: 0.2 },
  { x: 40, y: 806, s: 0.8, d: 0.35 }, { x: 44, y: 866, s: 0.7, d: 0.42 }, { x: 222, y: 868, s: 0.7, d: 0.3 }];

/* THE PARTY (r38): a small celebration when a phase is complete. The mascot pops a party popper and confetti and streamers
   burst up across the card for about two seconds, in the tool's own palette (its THEME when it has one); the last phase
   bursts from both sides. One shot (the frame unmounts it), nothing under reduced motion, no text, never over the stage's
   edge (the landing points are clamped), no pointer events. Particles are placed from a seed per burst, so a burst is
   the same wherever it is drawn. */
function Party({ C, big, n }: any) {
  /* the tool's own bright colours (its Enter pink, its butter), never its browns or white: those vanish on the board; plus a
     mint and an orange so a piece is always seen against a dark piece or a light wood board */
  const pal = THEME && THEME.enter
    ? [THEME.enter[0], THEME.enter[1], THEME.soft ? THEME.soft[1] : "#F7C25A", "#F28C38", "#3FB6A8", THEME.enter[0]]
    : [C.accent, tint(C.accent, 0.35), "#E8B04B", "#6FB7B0", "#D96C8F", "#8E7CC3"];
  let seed = (n * 7919 + 13) % 2147483647;
  const rnd = () => { seed = (seed * 48271) % 2147483647; return seed / 2147483647; };
  /* the left popper stands over the mascot's hand, clear of the bubble's corner (x 254); the right one on the card's floor
     (y 736), above the phase bar, never over a phase pill */
  const origins = big
    ? [{ x: 186, y: 772, a0: -80, a1: -20 }, { x: 1500, y: 734, a0: -160, a1: -100 }]
    : [{ x: 186, y: 772, a0: -80, a1: -20 }];
  const per = big ? 44 : 56;
  const parts: any[] = [];
  origins.forEach((o) => {
    for (let k = 0; k < per; k++) {
      const a = ((o.a0 + rnd() * (o.a1 - o.a0)) * Math.PI) / 180, d = 260 + rnd() * 760;
      const dx = Math.max(60 - o.x, Math.min(1540 - o.x, Math.cos(a) * d));
      const ay = Math.max(112 - o.y, Math.sin(a) * d);                       /* the apex, up */
      const by = Math.min(840 - o.y, ay + 180 + rnd() * 260);                /* then it falls a little */
      parts.push({ o, dx, ay, by, dl: rnd() * 0.18, rot: (rnd() - 0.5) * 900, kind: Math.floor(rnd() * 4), col: pal[Math.floor(rnd() * pal.length)], s: 0.8 + rnd() * 0.6 });
    }
  });
  return (
    <g data-zone="party" aria-hidden="true" pointerEvents="none">
      {origins.map((o, oi) => {
        const mid = ((o.a0 + o.a1) / 2) + 90;   /* the cone points along the middle of the burst */
        return (
          <g key={"p" + oi} transform={`translate(${o.x},${o.y}) rotate(${mid})`}>
            <polygon points="-6,0 6,0 22,-58 -22,-58" fill={pal[0]} stroke={shade(pal[0], 0.25)} strokeWidth={3} strokeLinejoin="round" />
            <polygon points="-11,-22 11,-22 14,-34 -14,-34" fill={pal[2]} />
            <ellipse cx={0} cy={-58} rx={22} ry={6} fill={shade(pal[0], 0.45)} />
            <polygon className="c4-flash" points="0,-58 7,-72 0,-66 -7,-72" fill={pal[3]} />
          </g>
        );
      })}
      {(typeof MASCOT_CHEER === "string" && MASCOT_CHEER ? SPARKS : []).map((s, k) => (
        <g key={"s" + k} transform={`translate(${s.x},${s.y}) scale(${s.s * (big ? 1.25 : 1)})`}>
          <polygon className="c4-twinkle" style={{ animationDelay: s.d + "s" } as any} points="0,-16 4.5,-4.5 16,0 4.5,4.5 0,16 -4.5,4.5 -16,0 -4.5,-4.5"
            fill={pal[2 + (k % 2)]} stroke={shade(pal[2 + (k % 2)], 0.25)} strokeWidth={1.5} strokeLinejoin="round" />
        </g>
      ))}
      {parts.map((p, k) => (
        <g key={k} transform={`translate(${p.o.x},${p.o.y})`}>
          <g className="c4-px" style={{ ["--dx" as any]: p.dx + "px", animationDelay: p.dl + "s" } as any}>
            <g className="c4-py" style={{ ["--ay" as any]: p.ay + "px", ["--by" as any]: p.by + "px", animationDelay: p.dl + "s" } as any}>
              <g className="c4-pr" style={{ ["--r" as any]: p.rot + "deg", animationDelay: p.dl + "s" } as any}>
                {p.kind === 0 && <rect x={-8 * p.s} y={-4.5 * p.s} width={16 * p.s} height={9 * p.s} rx={2} fill={p.col} />}
                {p.kind === 1 && <circle r={6 * p.s} fill={p.col} />}
                {p.kind === 2 && <rect x={-2.5 * p.s} y={-13 * p.s} width={5 * p.s} height={26 * p.s} rx={2.5} fill={p.col} />}
                {p.kind === 3 && <rect x={-6 * p.s} y={-6 * p.s} width={12 * p.s} height={12 * p.s} rx={2} fill={p.col} transform="rotate(45)" />}
              </g>
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}

/* the mascot says every line the tool speaks: it bobs only while a line is being spoken and is
   still otherwise. If its picture ever fails to decode, the drawn speaking dot stands in. */
function Mascot({ C, speaking, react, ok, onFail, cheerOn, onCheerFail, thinkOn, onThinkFail, bulbN }: any) {
  const m = MASCOT_BOX;
  /* r30: no voice, so no talking bob; one hop when an answer is right or a phase ends, one nod after a miss (a new key
     restarts the one-shot animation) */
  const mood = react && react.kind ? "c4-" + react.kind : undefined;
  /* r54: while the party plays (or for 900 ms after any right answer) the mascot CHEERS: the cheering picture (arms up, happy eyes: MASCOT_CHEER) replaces the standing one
     and c4-cheer jumps it three times (c4-cheer1 once). The same <image data-role="mascot">, so every mascot check still sees one mascot. A cheering
     picture that fails to decode leaves the standing one (the drawn dot is for the standing picture only). After the party the
     class stays (the animation does not replay) and the standing picture is back. */
  const cheerSrc = typeof MASCOT_CHEER === "string" ? MASCOT_CHEER : "";
  const cheering = !!(cheerOn && cheerSrc && react && (react.kind === "cheer" || react.kind === "cheer1"));
  /* r24: while a question waits for the child (and until the first act) Kiko THINKS: a third picture (MASCOT_THINK: a hand at the chin, the eyes
     glancing up and aside), with a thought puff (plain vector beside the head, its three dots lighting one after another). The cheer wins over
     it. A thinking picture that fails to decode leaves the standing one. */
  const thinkSrc = typeof MASCOT_THINK === "string" ? MASCOT_THINK : "";
  const thinking = !cheering && !!(thinkOn && thinkSrc);
  return (
    <g data-zone="voice">
      <line x1={m.x + 8} y1={m.y + m.h - 2} x2={m.x + m.w - 8} y2={m.y + m.h - 2} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      {ok ? (
        <image key={"m" + ((react && react.n) || 0)} data-role="mascot" className={speaking ? "c4-talk" : mood} href={cheering ? cheerSrc : thinking ? thinkSrc : MASCOT_IMAGE} data-pose={cheering ? "cheer" : thinking ? "think" : undefined} x={m.x} y={m.y} width={m.w} height={m.h}
          preserveAspectRatio="xMidYMax meet" aria-hidden="true" pointerEvents="none" onError={cheering ? onCheerFail : thinking ? onThinkFail : onFail} />
      ) : (
        <g data-role="mascot-drawn">
          {speaking && <circle cx={m.x + m.w / 2} cy={820} r={40} fill="none" stroke={C.accent} strokeWidth={5} />}
          <circle cx={m.x + m.w / 2} cy={820} r={30} fill="url(#gAccent)" filter="url(#fShadowSoft)" />
        </g>
      )}
      {ok && thinking && <ThinkPuff />}
      {ok && bulbN > 0 && !cheering && <HintBulb key={"b" + bulbN} />}
    </g>
  );
}

/* r24: the thought puff beside Kiko's head while the pose is on: two small circles rising to a cloud with three dots. Plain vector in the
   mascot box's own coordinates (the box is 204 x 160 at MASCOT_BOX; the puff lies at x 150 to 197, y 5 to 52, so at stage x 178 to 225,
   y 743 to 790: inside the voice zone, clear of the picture, 29 short of the bubble at x 254, below the working-area floor). No pointer events. */
const THINK_BUMPS = [[154, 48, 2.6], [161, 41, 4], [166, 25, 9.5], [176.5, 17.5, 11.5], [187, 25, 8.5]];
const THINK_DOTS = [167, 175.5, 184];
function ThinkPuff() {
  const m = MASCOT_BOX;
  const body = (fill: string, stroke?: string) => (
    <g fill={fill} stroke={stroke} strokeWidth={stroke ? 2.2 : undefined} strokeLinejoin="round">
      {THINK_BUMPS.map((b, k) => <circle key={k} cx={b[0]} cy={b[1]} r={b[2]} />)}
      <rect x={156} y={23} width={39} height={12} rx={6} />
    </g>
  );
  return (
    <g data-role="think-puff" transform={`translate(${m.x},${m.y})`} aria-hidden="true" pointerEvents="none">
      {body("#C9BCA6", "#C9BCA6")}
      {body("#FFF4E0")}
      <g fill="#B3A284">
        {THINK_DOTS.map((cx, k) => <circle key={k} className="c4-tdot" style={{ animationDelay: k * 0.35 + "s" } as any} cx={cx} cy={26.5} r={2.3} />)}
      </g>
    </g>
  );
}

/* r24: a small yellow bulb pops where the puff stands (up and to the right of Kiko's head) for about a second when the Hint key is pressed:
   the header's own bulb picture, drawn small. Plain vector, no pointer events. */
function HintBulb() {
  const m = MASCOT_BOX;
  return (
    <g data-role="hint-bulb" transform={`translate(${m.x + 176},${m.y + 28})`} aria-hidden="true" pointerEvents="none">
      <g className="c4-bulb"><g transform="scale(0.8)"><IconBulb /></g></g>
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

function Footer({ C, line, hint, speaking, react, n, N, i, total, navigable, done, onGo, mascotOk, onMascotFail, UI, onBubble, cue, board, lang, hintType, cheerOn, onCheerFail, thinkOn, onThinkFail, bulbN }: any) {
  const b = Z.bubble;
  /* board layout: the line reads as the hint pill, the same box with an accent edge (nothing else moves: the arrow's
     offsets, the bar and the mascot are the classic ones) */
  const edge = board ? shade(C.accent, 0.1) : C.rule, edgeW = board ? 3 : 2;
  /* THE HINT (r34): after a wrong act or answer the instruction stays pinned on top and the hint sits under it in a tinted
     band, in the biggest of these layouts that fits the 144-tall bubble: [instruction size, its lines, hint size, its lines].
     The last one is tight (no band). Nothing is ever cut. When NONE fits, the hint is drawn ALONE (the hint is what the
     child needs, the question stays in the question bar) and `hint-fit` fails the tool, so it is fixed at the source. */
  const hintS = String(hint || "");
  /* r41: Hindi and Gujarati carry matras above the headline and tails below the line, so their lines need a taller pitch
     (1.45 em) and a little room above the first line (the ink rises about 5 units over its baseline), or two lines touch and
     the first one touches the bubble's outline; English keeps size + 6. A layout counts only when its whole block fits the
     bubble with 6 to spare. There is no tight (band-less) layout in hi/gu: a pair that does not fit is the tool's to shorten. */
  const dev = lang === "hi" || lang === "gu";
  const pit = (s: number, tight: any) => (tight ? s + 1 : dev ? Math.round(s * 1.45) : s + 6);
  const gapOf = (tight: any) => (tight || dev ? 4 : 6), padOf = (tight: any) => (tight ? 0 : dev ? 4 : 8), topOf = dev ? 12 : 0;   /* topOf: the first line's top (y0) sits at least this far under the bubble's top: the ink rises ~8 over it */
  let hl: any = null;
  if (hintS) {
    const cw = (s: number, w: number) => Math.max(8, Math.floor(w / (s * 0.54)));
    const opts: any[] = [[32, 1, 32, 2, 0], [32, 2, 32, 1, 0], [32, 1, 32, 1, 0], [28, 1, 28, 2, 0], [28, 2, 28, 1, 0], [28, 1, 28, 1, 0], [28, 2, 28, 2, 1]];
    for (const [is, il, hs, hn, tight] of opts) {
      if (dev && tight) continue;
      const a = wrapText(line, cw(is, 612)), h = wrapText(hintS, cw(hs, 592));
      if (a.length > il || h.length > hn) continue;
      const need = a.length * pit(is, tight) + gapOf(tight) + h.length * pit(hs, tight) + padOf(tight) + topOf;
      if (need <= b.h - 6) { hl = { is, a, hs, h, tight }; break; }
    }
  }
  /* two lines at speech size; a longer line drops to label size over three, never spills (the line shown is the hint
     alone when a hint is on show and no two-part layout fits) */
  const shown = hintS && !hl ? hintS : line;
  const big = wrapText(shown, 24);
  const size = big.length > 2 ? T.label : T.speech;
  const lines = big.length > 2 ? wrapText(shown, 32).slice(0, 3) : big;
  const lh = dev ? Math.round(size * 1.45) : big.length > 2 ? size + 6 : size + 8;
  const top = b.y + b.h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  /* the built-in "type / choose your answer" line (hintType) is a plain note, not a correction cue: a neutral band with a grey bar,
     never the accent colours a real hint wears */
  const hintInk = hintType ? C.ink : THEME && THEME.key ? THEME.key[2] : shade(C.accent, 0.3);
  const hintBand = hintType ? mix(C.panel, "#FFFFFF", 0.55) : THEME && THEME.soft ? mix(THEME.soft[0], "#FFFFFF", 0.6) : mix(C.accent, "#FFFFFF", 0.9);
  const hintBar = hintType ? C.dim : THEME && THEME.enter ? THEME.enter[1] : C.accent;
  const pitch = Z.bar.w / Math.max(N, 1);
  return (
    <g>
      <Mascot C={C} speaking={speaking} react={react} ok={mascotOk} onFail={onMascotFail} cheerOn={cheerOn} onCheerFail={onCheerFail} thinkOn={thinkOn} onThinkFail={onThinkFail} bulbN={bulbN} />
      <g data-zone="bubble">
        <path d={`M ${b.x} ${b.y + 30} L ${b.x - 18} ${b.y + 44} L ${b.x} ${b.y + 58} Z`} fill="#FFFFFF" stroke={edge} strokeWidth={edgeW} />
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={24} fill="#FFFFFF" stroke={edge} strokeWidth={edgeW} filter="url(#fShadowSoft)" />
        <rect x={b.x + 1} y={b.y + 32} width={4} height={24} fill="#FFFFFF" />
        {hl ? (() => {
          /* instruction on top (pinned), hint under it; positions from the chosen layout */
          const ilh = pit(hl.is, hl.tight), hlh = pit(hl.hs, hl.tight), gap = gapOf(hl.tight), pad = padOf(hl.tight);
          const H = hl.a.length * ilh + gap + hl.h.length * hlh + pad;
          const y0 = Math.max(b.y + (b.h - H) / 2, b.y + topOf);   /* centred, but never closer than topOf to the top (the ink of hi/gu rises over y0) */
          const hy0 = y0 + hl.a.length * ilh + gap;
          return (
            <>
              <g data-role="instruction">
                {hl.a.map((ln: string, k: number) => (
                  <text key={k} x={b.x + 30} y={y0 + k * ilh + hl.is * 0.8} fontSize={hl.is} fontWeight={500} fill={C.ink}>{ln}</text>
                ))}
              </g>
              <g data-role="hint">
                {!hl.tight && <rect x={b.x + 14} y={hy0 - 1} width={b.w - 28} height={hl.h.length * hlh + pad} rx={14} fill={hintBand} />}
                <rect x={b.x + 22} y={hy0 + (hl.tight ? 0 : 4)} width={5} height={hl.h.length * hlh - (hl.tight ? 0 : 2)} rx={2.5} fill={hintBar} />
                {hl.h.map((ln: string, k: number) => (
                  <text key={k} x={b.x + 40} y={hy0 + (hl.tight ? 0 : 4) + (dev ? 3 : 0) + k * hlh + hl.hs * 0.8} fontSize={hl.hs} fontWeight={600} fill={hintInk}>{ln}</text>
                ))}
              </g>
            </>
          );
        })() : (
          <g data-role="instruction">
            {lines.map((ln, k) => (
              <text key={k} x={b.x + 30} y={top + k * lh} fontSize={size} fontWeight={500} fill={C.ink}>{ln}</text>
            ))}
          </g>
        )}
        {/* CLASSROOM mode only (onBubble set): the bubble is the teacher's "next" (a tap, Enter or Space), and
            a small arrow in its corner says that something is waiting for it. Off, none of this is drawn. */}
        {/* the cue is meant to be seen from the last bench: a big near-black arrow (44 x 60, right of the longest
            line) that blinks hard. Only the arrow blinks; the bubble and its words stay steady. It stands still
            under reduced motion. */}
        {onBubble && cue && <polygon className="c4-cue c4-cue-big" points={`${b.x + b.w - 74},${b.y + b.h / 2 - 30} ${b.x + b.w - 30},${b.y + b.h / 2} ${b.x + b.w - 74},${b.y + b.h / 2 + 30}`} fill={C.ink} stroke="#FFFFFF" strokeWidth={4} strokeLinejoin="round" pointerEvents="none" />}
        {onBubble && <Hit id="bubble" x={b.x} y={b.y} w={b.w} h={b.h} onPress={onBubble} label={UI.bubbleNext} keep />}
      </g>
      {/* the phase dots: which phase is on the stage, and (user mode) a way to go to another */}
      <g data-zone="bar" data-mode={navigable ? "user" : "ai"}>
        {Array.from({ length: N }).map((_, k) => (
          <PhaseDot key={k} C={C} k={k} N={N} x={Z.bar.x + k * pitch + 6} w={pitch - 12} now={k === n - 1}
            done={k < n - 1 || (done.includes(k + 1) && k !== n - 1)} fill={Math.min(i + 1, total) / Math.max(total, 1)}
            navigable={navigable} onGo={onGo} UI={UI} />
        ))}
        <text x={Z.bar.x} y={Z.bar.y + 60} fontSize={T.micro} fontWeight={dev ? 500 : 600} fill={C.ink}>{UI.phaseOf(n, N)}</text>
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
            <text x={128} y={y + (lang === "hi" || lang === "gu" ? 80 : 74)} fontSize={T.micro} fontWeight={500} fill={learnedInk}>{lineFor(p.learned, lang, TR)}</text>
            {r && r.last && Thumb && (
              <g data-role="thumb" transform={`translate(1290,${y + 2})`}><Thumb n={k + 1} result={r} it={r.last.it} C={C} w={236} h={rowH - 10} lang={lang} tx={(v: any) => lineFor(v, lang, TR)} /></g>
            )}
          </g>
        );
      })}
      {showScore && played.length > 0 && (
        <g role="img" aria-label={UI.starsLabel ? UI.starsLabel(first, total) : `Right first time: ${first} of ${total}`}>
          {[0, 1, 2].map((k) => (
            <path key={k} d={starPath(704 + k * 62, 596, 24)} fill={k < stars ? CONTENT.ten : "#FFFFFF"}
              stroke={k < stars ? shade(CONTENT.ten, 0.3) : C.rule} strokeWidth={3} strokeLinejoin="round" />
          ))}
          <text x={876} y={606} fontSize={T.micro} fontWeight={600} fill={C.ink}>{UI.rightFirstTime(first, total)}</text>
        </g>
      )}
      {freePlay && (
        <Key id="free-play" label={UI.freePlay} x={490} y={628} w={300} h={96} C={C} tone="enter" primary onClick={onFree}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={toneInk("enter", "#FFFFFF")}>{UI.freePlay}</text>
        </Key>
      )}
      <Key id="play-again" label={UI.playAgain} x={freePlay ? 810 : 650} y={628} w={300} h={96} C={C} tone="soft" onClick={onAgain}>
        <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={toneInk("soft", C.ink)}>{UI.playAgain}</text>
      </Key>
    </g>
  );
}

/* the agent's highlight: a ring round one zone for a moment (toolApi.highlight). Read at the moment of the ring, since
   the board layout moves the zones: the working area is as wide as it is just then, and while the answer panel is
   shut the slot and pad are shown by the Answer key's bar. */
const RING_KEYS = ["header", "runs", "work", "slot", "pad", "voice", "bubble", "bar"];
function ringBox(key: string, workW?: number, panelOpen?: boolean): any {
  if (key === "work") return { x: W.x, y: W.y, w: workW || W.w, h: W.h };
  if (BOARD && (key === "slot" || key === "pad")) return panelOpen ? Z.drawer : Z.ask;
  if (key === "slot") return { x: Z.slot.x, y: 150, w: Z.slot.w, h: 192 };
  if (key === "voice") return MASCOT_BOX;
  if (key === "bar") return { x: Z.bar.x, y: Z.bar.y - 8, w: Z.bar.w, h: 76 };
  return (Z as any)[key];
}

/* ── ToolFrame: one phase at a time ──────────────────────────────────────────────────
   tool  = { TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME?, VOICE?, OPENING?, FINISH_LINE?, PHASES,
             MODEL?, Work, Runs?, judge?, solve?, nearMiss?, oracle?, format?, winMs?, fitHost?, answer?, pointKey?, sideBySide?, board?, nextKey?, cardAnswer?,
             StartArt?, START_HOOK? }
           StartArt / START_HOOK (r28): a START PAGE (LAYOUT.md §1c). The tool's name, StartArt (a component, drawn in a
           1200 x 340 box: props { box, C, lang, tx }; the object the lesson is about, never an answer), START_HOOK (one
           question to wonder at, a Spoken value with a TR entry), a big Start key and the mascot, drawn over the whole stage
           before anything is said. Shown in user mode (not AI mode) unless props.start is false; a tap or Enter on Start
           begins the lesson, and the teacher agent's first acting verb (gotoStep, answer, check, next, prev, reset,
           playDemo) begins it too. It is silent (the first line plays when Start is pressed).
           board (r27): the BOARD layout (LAYOUT.md §1b). The question and an Answer key sit in a bar across the top;
           the working area is the whole card (box.w 1472) until the child taps Answer, when the answer box and keypad
           slide in from the right and the area shrinks to 1086 (box.w follows the slide). Work lays itself out from
           props.box ({ w, h, open }), not from api.W. A tap on Answer, or any digit typed, opens the panel; a right
           answer, the next question, a phase change and a miss's traceback (while the pad is locked) close it, and
           after the traceback it returns with the answer still in the box. A question answered on the working area
           (pad: "enter") has no panel: the key in the bar reads Enter and commits it. The spoken line is drawn as the
           hint pill (same box). Skin (name from the slot's images.tsx) draws a generated picture as the object's look.
           pointKey: the tool types decimals; the pad has a point key on every question (off on a
           parts question), the keyboard's "." types it too, and typed reads "0.09". A decimal answer
           is a string in its written form ("0.30" is not "0.3"). A captured pad passes "point" to fn.
           sideBySide (r26): the answer boxes of a fraction (SLOT_FRACTION) and a mixed number (SLOT_MIXED) sit in
           a row, [3] / [10] and [1] [2] / [3], instead of stacked. An item with `parts: SLOT_DECIMAL` (answer
           ["2", "9"]) is a decimal in two boxes with the point drawn, [2] . [9], and is always side by side;
           judge it with judgeSlotDecimal(item, v) (digit for digit); the pad's point key is off on it, and a tool
           whose decimals are ALL two boxes does not declare pointKey.
   SILENT (r30). The lesson has no voice: every line is printed on the bubble and paced by its reading time
           (max(2.4 s, 68 ms a character)); there is no device speech, no baked clip and no "Tap to start" cover. What is
           heard is sound effects (api.sfx: correct, wrong, win, tick, cut, settle, trade, cheer), switched by the sound
           button, on in every mode. The mascot does not talk: it hops on a right answer and a phase end, nods after a miss.
           The header's "again" key shows the bubble's last lines again. Classroom mode (props.classroom) is unchanged: the
           arrow and the tap on the bubble are the teacher's manual control; sound is no longer started off by it.
   phase ={ n, concept, conceptId, objectiveIds, says, ladder, closing, items, demo?, steps? }
           steps (r30): [{ say, on, hint }]. (r34: `hint` is shown UNDER the pinned instruction when the child does some other
           act, i.e. Work reports api.did(name) with a name the step is not waiting for; it stays, unchanged, until the right
           act. Give every step a hint, at most about 40 characters when the instruction is two lines.) A phase with steps has no teach run (says and OPENING are not shown): the bubble shows
           steps[0].say, the stage is "demo" (the question and the Answer key wait, Work is live), and each step waits for
           the child's own act, which Work reports with api.did(on) the moment it is done (a tap on Cut, a shaded part, a
           trade). The line moves to the next step only then, never by a timer; the last act opens the question with its
           instruction on the bubble. An act out of order is ignored by did() (returns false), so the tool answers it as it
           always did. Work gets props.step (the index) and props.stepOn (the act the step waits for) to put its one invite
           on the right control, and must register api.onEnter(fn) so that Enter, the agent's check() and the dev solve()
           perform the current step's act (and report it with did). A miss still shows its hint on the bubble at once.
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
   level fields (tool.TOOL_NAME, phase.concept) are not Spoken and stay in the plan's own language.

   CLASSROOM (r22+). `props.classroom: true` (or `additionalProps.classroom`, like navigableDots), set by the host
   like `lang`; a tool does nothing for it. A teacher
   is in the room and paces the lesson, a child performs at the board: the sound effects are on as in any mode (r30:
   there is no voice to talk over the teacher), the bubble's lines stay on screen as captions. r34: the lesson is
   ACTION-DRIVEN in every mode and a classroom holds nothing for a "next" tap any more: an instruction waits for the
   child's own act, a hint shows at once under the pinned instruction, a right answer's next question follows its
   short celebration, a phase's closing line is followed by the next phase, the summary's rows go on by themselves.
   What the arrow (the cue on the bubble) and a tap on the bubble (Enter or Space on it, ArrowRight, PageDown, the
   toolApi's next()) are for now: paging a LONG line piece by piece (each next piece waits for a tap; the end of a
   line never does) and a teacher's skip (a tap during a celebration or a closing line brings what follows at
   once). The last piece of a teach run opens the question, with a ring on the working area ("your turn"). Stars and
   "Right first time" are not shown (the `finished` event still carries them). Off by default: with no `classroom`
   nothing here applies. */

function ToolFrame({ props, tool }: any) {
  const P = props || {};
  /* the layout is the tool's own choice (board: true), fixed for the life of the mount; every zone box below is
     read after this line */
  const board = !!tool.board;
  if (board || BOARD) setLayout(board, !!tool.bigPad);
  SKINS = P.skins !== false;
  /* the tool's own THEME, else the one the image agent chose from the slot's object (images.tsx: TOOL_THEME), else the standard
     DEFAULT_THEME, so no start page or Enter key is ever the chrome's grey */
  THEME = tool.THEME || (typeof TOOL_THEME !== "undefined" ? (TOOL_THEME as any) : null) || DEFAULT_THEME;
  const phases = tool.PHASES || [];
  const N = Math.max(phases.length, 1);
  const [mountPhase] = useState<number | null>(() => {
    const v = Number(P.phase);
    return P.phase === undefined || P.phase === null || P.phase === "" || !isFinite(v) ? null : Math.min(Math.max(Math.round(v), 1), N);
  });
  const navigable = mountPhase === null || (P.navigableDots ?? (P.additionalProps && P.additionalProps.navigableDots)) === true;
  /* START PAGE (r28): a tool that gives `StartArt` and/or `START_HOOK` opens on it in user mode; nothing is spoken and
     no lesson runs until Start (a tap, or Enter). The teacher agent's AI mode skips it (it drives through toolApi, whose
     first verb starts the lesson anyway), and `props.start: false` skips it for a host that does not want it. */
  const hasStart = !!(tool.StartArt || tool.START_HOOK);
  const showStart = hasStart && P.start !== false && (navigable || P.start === true);
  const [started, setStarted] = useState(!showStart);
  const startedRef = useRef(!showStart);
  /* r24: when the lesson last changed stage or phase (the start page's Start, a phase entered, the Next key): the Enter that performs a guide step
     is not taken within 400 ms of it, so the second of two quick Enters (a held key, a double press) never does the first step of what just opened */
  const changeAt = useRef(0);
  const startNow = () => { if (startedRef.current) return; startedRef.current = true; changeAt.current = Date.now(); setStarted(true); };
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
  /* r24: `locked` mirrored in a ref, written the moment a tool calls api.lock, so an effect of the same commit sees it */
  const lockedRef = useRef(false);
  const lockNow = (b: boolean) => { lockedRef.current = b; setLocked(b); };
  /* CLASSROOM mode (props.classroom): read on every render, so the host can switch it on or off mid-lesson */
  const classroom = (P.classroom ?? (P.additionalProps && P.additionalProps.classroom)) === true;
  const holdRef = useRef(false);
  holdRef.current = classroom;
  /* what a tap on the bubble does once no line is waiting: the next question after a right answer, or a
     missed answer's hint (classroom only; the timers of a normal run are never used for either) */
  const nextRef = useRef<(() => void) | null>(null);
  const [heldNext, setHeldNext] = useState<any>(false);   /* false, or true / "next" / "phase" while a Next key waits (r45) */
  /* r45, the NEXT KEY (opt-in, `tool.nextKey: true`): nothing moves on by itself. A right answer's celebration (the win
     animation, and for a phase's last question the party and the closing line) plays out, then a Next key appears where the
     Answer key was and WAITS for the child: it takes them to the next question ("Next"), the next phase ("Next phase") or,
     after the last phase, the summary ("Next"). Only a child's own mount has it (navigable): the teacher agent's AI mode
     and a host that drives the tool keep the timers, and so does `props.autoNext: true` (the check's scripted runs). */
  const nextKeyOn = !!tool.nextKey && navigable && (P.autoNext ?? (P.additionalProps && P.additionalProps.autoNext)) !== true;
  /* the phase whose end the class is exploring (classroom: free play between two phases), else null */
  const exploreOf = useRef<number | null>(null);
  const ringTimer = useRef<any>(null);
  /* classroom: which hint rung the next tap brings, for the question being asked ({ at: "phase.item", k }) */
  const hintsOf = useRef<any>({ at: "", k: 0 });
  /* r30: sound effects are on in every mode, a classroom included (there is no voice to talk over a teacher) */
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
  const voice = useVoice(mutedRef, langRef, { rate: 0.92, pitch: 1.06, ...(tool.VOICE || {}) }, holdRef);
  const [mascotOk, setMascotOk] = useState(true);
  const mascotRef = useRef(true);
  const [cheerOk, setCheerOk] = useState(true);   /* r54: false when the cheering picture does not decode: the standing one stays */
  const [thinkOk, setThinkOk] = useState(true);   /* r24: false when the thinking picture does not decode: the standing one stays */
  /* r54: a SMALL cheer on every right answer: the cheering picture for 900 ms and one jump (c4-cheer1); at a phase's last question the
     party's long cheer takes over. None under reduced motion. */
  const [quick, setQuick] = useState<any>({ n: 0, on: false });
  const quickNow = () => { if (reducedMotion()) return; setQuick((q: any) => ({ n: q.n + 1, on: true })); };
  useEffect(() => {
    if (!quick.on) return;
    const t = setTimeout(() => setQuick((q: any) => ({ ...q, on: false })), 900);
    return () => clearTimeout(t);
  }, [quick.n]);
  /* the mascot does not talk (r30): it cheers when an answer is right (r54: a small cheer, a long one with the party at a phase's end) and nods after a miss */
  const [react, setReact] = useState<any>({ kind: "", n: 0 });
  const mascotDo = (kind: string) => setReact((r: any) => ({ kind, n: r.n + 1 }));
  /* r24: the pose that waits. Kiko THINKS while a question is open and the child has not yet acted on it (no tap, no key, no Hint key, nothing
     typed); the first act puts the standing picture back, a miss (the retry) the thinking one again. `actedKey` is the question the child acted on. */
  const actedRef = useRef("");
  const [actedKey, setActedKey] = useState("");
  const markActed = () => {
    if (!startedRef.current) return;
    /* r25: only a tap or key while a QUESTION is open is an act on it. A guide step's tap (stage "demo") shares the question's key
       (idx.0.run), so before this every phase's question 1 opened already "acted on" and Kiko never thought there (found by the owner) */
    if (live.current && live.current.stage !== "ask") return;
    if (lockedRef.current && live.current && live.current.tries > 0) return;   /* a tap during a miss's traceback is not an act on the retry */
    const k = String((live.current && live.current.qKey) || "");
    if (actedRef.current !== k) { actedRef.current = k; setActedKey(k); }
  };
  const forgetActed = () => { if (actedRef.current) { actedRef.current = ""; setActedKey(""); } };
  /* the Hint key pops a small bulb above-right of Kiko's head for a second */
  const [bulb, setBulb] = useState<any>({ n: 0, on: false });
  const bulbNow = () => setBulb((b: any) => ({ n: b.n + 1, on: true }));
  useEffect(() => {
    if (!bulb.on) return;
    const t = setTimeout(() => setBulb((b: any) => ({ ...b, on: false })), 1000);
    return () => clearTimeout(t);
  }, [bulb.n]);
  /* the party (r38/r39): a small celebration when the 3 questions of a phase are done (a bigger one after the last phase); none
     under reduced motion. It plays for PARTY_MS and the walk to the next phase waits for it (phaseEnd), so it is seen whole.
     There is no free play between phases: free play is the summary page's, after the last. */
  const [party, setParty] = useState<any>({ n: 0, big: false, on: false });
  const partyAt = useRef(0);   /* when the last party began (0: none): the walk to the next phase waits for it */
  const partyNow = (big: boolean) => { if (reducedMotion()) return; partyAt.current = Date.now(); setParty((p: any) => ({ n: p.n + 1, big, on: true })); mascotDo("cheer"); };
  /* r24: a skip (a classroom teacher's tap), a phase dot or a restart ends the celebration AT ONCE: the confetti, the cheering picture and the
     jumps (c4-cheer / c4-cheer1 come from react.kind), and the walk stops waiting for the party */
  const endCelebration = () => {
    partyAt.current = 0;
    setParty((p: any) => (p.on ? { ...p, on: false } : p));
    setQuick((q: any) => (q.on ? { ...q, on: false } : q));
    setReact((r: any) => (r.kind === "cheer" || r.kind === "cheer1" ? { kind: "", n: r.n + 1 } : r));
  };
  useEffect(() => {
    if (!party.on) return;
    const t = setTimeout(() => setParty((p: any) => ({ ...p, on: false })), PARTY_MS);
    return () => clearTimeout(t);
  }, [party.n]);
  const [ring, setRing] = useState<string | null>(null);
  const [done, setDone] = useState<number[]>([]);

  const [run, setRun] = useState(0);
  const [stage, setStage] = useState("teach");
  /* the guide step the child is on (phase.steps), mirrored in a ref so two did() calls in one tick still agree */
  const [stepNo, setStepNo] = useState(0);
  const stepRef = useRef(0);
  /* THE HINT (r34): shown UNDER the instruction, which stays pinned on the bubble. A wrong act on a guide step shows
     that step's `hint`, a wrong answer shows the next rung of its ladder. It stays exactly as it is until the child acts
     again (a second miss brings the stronger rung; a right act, the next question or the next phase clears it). */
  const [hintText, setHintTextState] = useState("");
  /* what is on show and of which kind: "hint" (a real hint) or "type" (the built-in 'type your answer' line shown when
     the Answer key is tapped or a digit is typed, r36). The refs are for handlers that run between renders. */
  const hintOn = useRef("");
  const hintKind = useRef("hint");
  const setHintText = (s: string, kind: string = "hint") => {
    const t = s ? speakableIn(s, langRef.current) : "";
    hintOn.current = t; hintKind.current = kind;
    setHintTextState(t);
  };
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
  /* BOARD layout: does the child (or a digit typed, or an agent's answer) want the answer panel open? What shows is
     derived below: only while a question is open and the working area is not busy, so after a miss the panel goes
     away for the traceback and comes back by itself with the child's answer still in the box. */
  const [openWanted, setOpenWanted] = useState(false);
  const wantRef = useRef(false);
  const setPanel = (b: boolean) => { wantRef.current = b; setOpenWanted(b); };
  const setTyped = (v: any) => {
    const nv = typeof v === "function" ? v(typedRef.current) : String(v ?? "");
    typedRef.current = nv;
    /* r24: a question answered on the working area (pad "enter") has no keypad: the word a tool writes into the slot never opens the panel */
    if (board && nv !== "" && live.current.stage === "ask" && !wantRef.current && !(cardAnswerOn && live.current.item && live.current.item.choices)
      && !(live.current.item && live.current.item.pad === "enter" && !captureRef.current)) setPanel(true);
    if (nv !== "") markActed();
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
  const clearLater = () => { timers.current.forEach(clearTimeout); timers.current = []; nextRef.current = null; setHeldNext(false); };
  /* CLASSROOM helpers. paceNext: a step a timer takes in a normal run (the next question after a right answer)
     waits for the tap instead. fallback: the safety net of a spoken line (its longest time is up and the voice
     never reported its end) is not wanted when a teacher paces: the tap is the net. nudge: the tap on the
     bubble: the parked line first, else the held step, else the stage a replaced line left waiting. */
  const holdNext = (fn: () => void, kind?: string) => { nextRef.current = fn; setHeldNext(kind || true); };
  /* r45: the child presses the Next key (a tap, Enter, or the host's next()): what was held goes now. False when nothing waits. */
  const takeNext = (): boolean => {
    const f = nextRef.current;
    if (!f) return false;
    nextRef.current = null; setHeldNext(false); changeAt.current = Date.now(); f();
    return true;
  };
  /* r34: a right answer's next question comes after its short celebration, by itself, in every mode. In a classroom a tap
     on the bubble (the teacher's skip, nudge) brings it at once; no cue is drawn for it (nothing is waiting for a tap). */
  const paceNext = (fn: () => void, ms: number) => {
    let gone = false, over = 0;
    const go = () => { if (gone) return; gone = true; if (nextRef.current === go) nextRef.current = null; fn(); };
    if (holdRef.current) nextRef.current = go;
    /* r41: the win line is read to its END: when `ms` is up and a line is still being read (a win line of two pieces that
       takes longer than the tool's winMs), the step waits for it, 6 s more at most; a teacher's skip (nudge) still takes it at once */
    /* r45 (nextKey): when the celebration is over the NEXT question waits for the Next key. A phase's last question does not
       wait here: its celebration runs on into the closing line, and it is the walk to the next phase (phaseEnd) that waits. */
    const lastHere = live.current.i + 1 >= live.current.items.length;
    const due = () => {
      if (gone) return;   /* r51: a teacher's skip already took the step; no Next key may rise in the question it opened */
      if (!nextKeyOn && voice.reading() && over < 6000) { over += 150; later(due, 150); }
      else if (nextKeyOn && !lastHere) holdNext(go, "next");
      else go();
    };
    later(due, nextKeyOn ? Math.max(ms - NEXT_EARLY_MS, 400) : ms);
  };
  /* the safety net of a line whose end never comes; a classroom's long line pages by the teacher's taps, so its net is
     much longer */
  const fallback = (fn: () => void, ms: number) => later(fn, holdRef.current ? ms * 4 : ms);
  /* a tap on the bubble in a classroom (Enter, Space, ArrowRight, PageDown, toolApi.next()). In this order: (1) a parked
     piece of a LONG line: page it; (2) a celebration's next question: bring it at once; (3) a reading that has an end to go
     to (a teach run, a closing line's walk): skip to that end now; (4) otherwise cut the piece in flight short. */
  const nudge = (): boolean => {
    if (!holdRef.current) return false;
    if (voice.release(true)) return true;
    const f = nextRef.current;
    if (f) { endCelebration(); nextRef.current = null; setHeldNext(false); f(); return true; }
    const pa = pendingAdvance.current;
    if (pa) { endCelebration(); pa(true); return true; }
    const cut = voice.release();
    if (cut) endCelebration();
    return cut;
  };
  const item = items[Math.min(i, items.length - 1)] || {};
  /* r24: the question on show, as one key (the phase, the question, the run): what "acted on" and "ready" are remembered against */
  const qKey = idx + "." + i + "." + run;
  const say = (it: any) => tx(it.say) || tx(it.ask) || "";
  const live = useRef<any>({});
  /* r49, CARD ANSWER (opt-in: `tool.cardAnswer: true`, board layout only). The answer is given ON the card of the picture that
     holds the form the question asks for (a fraction on the Fraction card, a decimal on the Decimal card): the card blinks, a
     tap on it opens the keypad, the digits fill the card's own boxes (part-1, part-2: the tool draws them), Enter answers.
     A choice question (Yes / No) puts its keys in the question bar, in the Answer key's place, blinking; any other question
     (the whole-part / tenths split) keeps the blinking Answer key. A where-to-tap line shows under the instruction at the open
     (a built-in "type" line, never a hint). The tool says when its picture still wants an act first (api.cardReady(false)). */
  const cardAnswerOn = !!tool.cardAnswer && board;
  const cardKindOf = (it: any) => (!cardAnswerOn || !it || it.choices || !it.parts || !it.parts.some((p: any) => p.at) ? null
    : it.parts.some((p: any) => p.at === "dwhole") ? "decimal" : "fraction");
  const cardKind = cardKindOf(item);   /* by the item alone, so the drawer keeps its look while it slides away at the win */
  const answerOn = !cardAnswerOn || stage !== "ask" ? null : item.choices ? "choices" : cardKind ? "card" : item.pad === "enter" ? null : "key";
  const [cardReady, setCardReadyState] = useState(true);
  const cardReadyRef = useRef(true);
  const cardGateRef = useRef(false);   /* an act on the picture (Cut, Lots of, Trade) still waits: a digit typed meanwhile is ignored */
  const setCardReady = (b: any, gate?: any) => { cardGateRef.current = !!gate; const v = !!b; if (cardReadyRef.current !== v) { cardReadyRef.current = v; setCardReadyState(v); } };
  /* r24, THE ANSWER KEY (every board tool, not only cardAnswer ones): when the question's answer is typed on the keypad (or a choice made
     in it) the pink Answer key is what the child must press. While that is so (a question is open, nothing blocks it, the picture is ready) the
     key BLINKS and the built-in "Tap the blinking Answer key." line shows under the instruction. Never in a guide step or warm-up, with the
     keypad open, while the pad is locked, after the win, on a card question (the card blinks) or a choice question whose keys are in the bar. */
  const keyAskOn = cardAnswerOn ? answerOn === "key" : board && stage === "ask" && item.pad !== "enter";
  /* a tool whose answer is made on the working area (pad "enter"): the Enter key in the bar blinks once the tool says the answer is ready
     (api.answerReady(true)); steady before, and for a tool that never says so */
  const [readyKey, setReadyKey] = useState("");
  const answerReady = (b: any) => { const k = b ? String((live.current && live.current.qKey) || "") : ""; setReadyKey((o) => (o === k ? o : k)); };
  const tapLine = () => (answerOn === "card" ? (cardReadyRef.current ? UI.tapCard(tx(item.cardName || (cardKind === "decimal" ? "Decimal" : "Fraction"))) : "")
    : answerOn === "choices" ? UI.pickIt : keyAskOn && cardReadyRef.current ? UI.tapAnswer : "");
  const showTap = () => { const l = lockedRef.current ? "" : tapLine(); setHintText(l, l ? "type" : "hint"); };
  /* a tap on the card (or the Answer key) opens the keypad and says what to do with it; Close (or the key again) shuts it */
  const openedAt = useRef(0);   /* r24: when a tap last opened the keypad: a second press within 300 ms (a double tap) does not shut it again */
  const openAnswer = () => {
    const L = live.current;
    if (!board || L.stage !== "ask" || L.locked) return false;
    markActed();
    if (!wantRef.current) {
      setPanel(true);
      openedAt.current = Date.now();
      if (!hintOn.current || hintKind.current === "type") setHintText(L.item.choices ? UI.pickIt : UI.typeIt, "type");   /* r36 / r41 */
    }
    return true;
  };
  const closeAnswer = () => {
    if (wantRef.current && Date.now() - openedAt.current < 300) return;   /* the second tap of a double tap */
    setPanel(false);
    if (hintKind.current === "type") showTap();
  };

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
      if (typeof MASCOT_CHEER === "string" && MASCOT_CHEER) {
        const cm = new Img();
        cm.onload = () => { if (!cm.naturalWidth) setCheerOk(false); };
        cm.onerror = () => setCheerOk(false);
        cm.src = MASCOT_CHEER;
      }
      if (typeof MASCOT_THINK === "string" && MASCOT_THINK) {
        const tm = new Img();
        tm.onload = () => { if (!tm.naturalWidth) setThinkOk(false); };
        tm.onerror = () => setThinkOk(false);
        tm.src = MASCOT_THINK;
      }
    } catch (e) { /* a probe that cannot run says nothing about the picture */ }
  }, []);

  /* the teach run: on mount, on restart and on every phase entry. Nothing is asked before it has
     been said. A demo phase waits for the child's one act before the first question. The agent's
     gotoStep into a later question goes straight to that question. */
  useEffect(() => {
    if (!started) return;   /* the start page: nothing is said or timed until Start */
    demoOpen.current = false;
    pendingAdvance.current = null;
    const jump = skipTeach.current;
    skipTeach.current = null;
    if (jump !== null) {
      setStage("ask");
      voice.speak(say(items[Math.min(jump, items.length - 1)] || {}));
      return () => { clearLater(); voice.hush(); };
    }
    /* GUIDE STEPS (r30): a phase with `steps: [{ say, on }]` has no teach run. The bubble shows steps[0].say and the stage
       is "demo" (the question and the Answer key wait); each step waits for the child's own act, which Work reports with
       api.did(on). The line moves on only then, never by a timer. After the last step the question opens, with its
       instruction on the bubble. (phase.says and tool.OPENING are not shown: the steps replace them.) */
    if (phase.steps && phase.steps.length) {
      stepRef.current = 0; setStepNo(0);
      setStage("demo");
      voice.speak(tx(phase.steps[0].say));
      return () => { clearLater(); voice.hush(); pendingAdvance.current = null; };
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
      voice.speak(lines, go, { open: true });
      fallback(go, lines.reduce((a, l) => a + readMs(speakable(l)), 0) + 6000);
    } else {
      const full = [...lines, say(items[0] || {})];
      const go = fireOnce(() => { setStage("ask"); pendingAdvance.current = null; });
      pendingAdvance.current = go;
      voice.speak(full, go, { open: true });
      fallback(go, full.reduce((a, l) => a + readMs(speakable(l)), 0) + 6000);
    }
    return () => { clearLater(); voice.hush(); pendingAdvance.current = null; };
  }, [run, started]);

  const demoDone = (lines?: any) => {
    if (!demoOpen.current) return;
    demoOpen.current = false;
    setStage("teach");
    const full = [...(lines ? (Array.isArray(lines) ? lines : [lines]) : []).map((l: any) => tx(l)), say(items[0] || {})];
    const go = fireOnce(() => { setStage("ask"); pendingAdvance.current = null; });
    pendingAdvance.current = go;
    voice.speak(full, go, { open: true });
    fallback(go, full.reduce((a, l) => a + readMs(speakable(l)), 0) + 6000);
  };

  /* Work reports the act the child just did (api.did("cut")). It moves the bubble to the next step only when it is the
     act the current step waits for; the last act opens the question. Anything else is ignored (false), so an act out of
     order changes nothing here and the tool answers it as it always did. */
  const didAt = useRef(0);   /* when Work last reported an act (any act): workTap and a typed digit wait it out */
  const lastRight = useRef<any>({ name: "", at: 0 });   /* r24: the last act that moved a guide step on, and when (C10) */
  const did = (name: any) => {
    const L = live.current, st = L.phase && L.phase.steps;
    didAt.current = Date.now();
    if (!st || !st.length || L.stage !== "demo") return false;
    const k = stepRef.current;
    if (!st[k]) return false;
    if (String(st[k].on) !== String(name)) {
      /* r24: the act the child JUST did, repeated (a double tap on a guide control): the step counted it once; the second tap is
         not an error, so the next step's hint never flashes */
      if (lastRight.current.name === String(name) && Date.now() - lastRight.current.at < 500) return false;
      /* an act that is not the one this step waits for: the instruction stays, the step's hint shows under it and stays
         (the same hint, however many times) until the right act */
      if (st[k].hint) setHintText(tx(st[k].hint));
      return false;
    }
    lastRight.current = { name: String(name), at: Date.now() };
    stepRef.current = k + 1; setStepNo(k + 1);
    if (k + 1 < st.length) { voice.speak(tx(st[k + 1].say)); return true; }
    /* the last act: its result stays on the board for a moment (phase.stepHold ms, 1600 by default; none under reduced
       motion) so the child sees what the step showed (the parts shaded, ten tenths closing into a whole), then the
       question opens. The stage stays "demo" meanwhile, so the question and the Answer key wait, and nothing performs
       a step (stepOn is null). */
    const open = () => { setStage("ask"); voice.speak(say(L.items[0] || {})); };
    if (reducedMotion()) open(); else later(open, L.phase.stepHold ?? 1600);
    return true;
  };

  const didRef = useRef<any>(null);
  didRef.current = did;
  /* r41: an act that does nothing in a guide step (a tap on a drawn strip, a card, the empty board or a disabled key, a typed
     digit) is a wrong act too: the step's hint shows at once, as for any other wrong act, and stays until the right one. A
     live control reports its own act (did) at once, so nothing is shown within 400 ms of one. */
  const demoMiss = () => {
    const L = live.current, st = L.phase && L.phase.steps;
    if (L.stage !== "demo" || !st || !st[stepRef.current] || !st[stepRef.current].hint) return;
    if (Date.now() - didAt.current < 400) return;
    setHintText(tx(st[stepRef.current].hint));
  };
  const workTap = (e: any) => {
    const el: any = e && e.target;
    const ctl = el && el.closest ? el.closest("[data-control]") : null;
    if (ctl && ctl.getAttribute("aria-disabled") !== "true") return;   /* a live control: it reports its own act */
    demoMiss();
  };

  /* the hint ladder, the same for a miss and for a request: rung 0 the item's own miss line, then the phase's two rungs */
  /* r24: a question may carry its own ladder (`it.ladder`, rungs 2 and 3) in place of its phase's */
  const rungOf = (it: any, phaseLadder: any[], k: number) => {
    const ladder = it && Array.isArray(it.ladder) && it.ladder.length ? it.ladder : phaseLadder || [];
    return k <= 0 ? it.miss || ladder[0] : k === 1 ? ladder[0] || it.miss : ladder[1] || ladder[0];
  };
  const rungShown = useRef(-1);   /* the rung on show for this question (-1: none) */
  useEffect(() => { rungShown.current = -1; }, [i, idx, run]);
  /* The header's HINT key (r35, the owner: the lesson is manual, a stuck child or a teacher may ask): while a guide step
     waits it shows that step's hint; at an open question it shows the first rung, and each further press the stronger one;
     with nothing to hint (a win, a closing line, the summary, free play, no hint written) it shows the lines again. */
  const askHint = () => {
    const L = live.current;
    markActed(); bulbNow();   /* r24: the Hint key is an act (Kiko stops thinking) and pops the small bulb */
    if (L.stage === "demo" && L.phase.steps && L.phase.steps[stepRef.current]) {
      const st = L.phase.steps[stepRef.current];
      if (st.hint) { setHintText(tx(st.hint)); return; }
    } else if (L.stage === "ask" && !L.locked) {
      const ladder = L.phase.ladder || [], it = L.item;
      const hinted = !!hintOn.current && hintKind.current === "hint";   /* the built-in type-your-answer line is not a hint */
      const k = hinted ? Math.min(rungShown.current + 1, 2) : Math.max(rungShown.current, L.tries > 0 ? L.tries : 0);
      const rung = rungOf(it, ladder, k);
      if (rung) { rungShown.current = Math.min(k, 2); setHintText(tx(rung)); return; }
    }
    voice.repeat(pendingAdvance.current || undefined);
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

  /* the summary page (NCERT Class 4): "Well done!" and one row per phase with its "You learned" line, all on the page. r44
     (the owner: "make it simple"): the bubble says ONE plain line, UI.summaryLine ("Here is the summary of what you have
     learned."); no row is read out one by one and no row blinks (the rows' text is on the page to read), and the tool's
     FINISH_LINE is not shown. `finished` goes once, 5 s after the page opens, and never if Free play, Play again or a
     phase change comes first. */
  const showSummary = () => {
    const tk = ++summaryTok.current;
    const send = () => { if (summaryTok.current === tk) fire(true); };
    clearLater();
    later(send, 5000);
    enterRef.current = null;
    capture(null);
    setStage("summary");
    setSummaryRow(-1);
    pendingAdvance.current = null;
    voice.speak(UI.summaryLine, undefined, { nopark: true });
  };

  /* the end of a phase (as the NCERT tools): every mount, user or AI mode, says the closing line and
     walks on to the next phase 1.4 s later, sending no `finished`; the last phase opens the summary
     page, which sends it */
  const phaseEnd = () => {
    const L = live.current;
    /* the pop, the chime and the party went off at the right answer (submit, r40); here the phase is only closed */
    setDone((d) => (d.includes(L.n) ? d : [...d, L.n]));
    const lastPhase = L.idx === phases.length - 1;
    if (lastPhase && !nextKeyOn) { showSummary(); return; }
    setStage("idle");
    /* the walk goes when the closing line ends, or at the latest when that line's longest time is up:
       a line the tool speaks after it (a win animation's words) takes the voice and its end with it,
       and the phase would never move on */
    let gone = false;
    /* r34: the closing line is read for its reading time and the next phase's first instruction follows by itself, in every
       mode (a classroom included: nothing waits for a "next" tap). In a classroom a tap on the bubble (the teacher's skip)
       walks on at once. There is no free play between phases (the owner's word, r39): free play is the summary page's.
       r39/r40: the party is seen whole, so the walk waits until the party (it began at the right answer) has had its PARTY_MS
       (never less than 1.4 s). */
    const walk = (now?: any) => {
      if (gone) return;
      gone = true; pendingAdvance.current = null; nextRef.current = null;
      const go = () => { if (nextRef.current === go) nextRef.current = null; enterPhase(L.idx + 1, 0); };
      if (now === true) { go(); return; }   /* a teacher's skip: the next phase at once */
      if (holdRef.current) nextRef.current = go;   /* ... and during the wait too */
      later(go, Math.max(1400, PARTY_MS + 150 - (Date.now() - partyAt.current)));
    };
    const closing = [tx(L.phase.closing)].filter(Boolean);
    /* r45 (nextKey): nothing walks on by itself. The closing line is read on the bubble (a press of the key cuts what is left
       of it) and the Next key comes once the party is over, never later; the last phase's key opens the summary */
    if (nextKeyOn) {
      let skipped = false;
      const go = () => { if (skipped) return; skipped = true; if (nextRef.current === go) nextRef.current = null; pendingAdvance.current = null; if (lastPhase) showSummary(); else enterPhase(L.idx + 1, 0); };
      pendingAdvance.current = null;
      if (holdRef.current) nextRef.current = go;   /* a classroom: a teacher's tap during the wait goes on at once, and the timer below stands down */
      voice.speak(closing, undefined, { nopark: true });
      later(() => { if (!skipped) holdNext(go, lastPhase ? "summary" : "phase"); }, Math.max(0, PARTY_MS + 150 - (Date.now() - partyAt.current)));
      return;
    }
    pendingAdvance.current = walk;
    voice.speak(closing, walk, { nopark: true });
    fallback(walk, closing.reduce((a, l) => a + readMs(speakable(l)), 0) + 6000);
  };

  /* Free play (from the summary page): the tool's own no-target mode, every control unlocked */
  const freePlay = () => {
    summaryTok.current++;
    clearLater(); voice.hush();
    enterRef.current = null;
    capture(null);
    exploreOf.current = null;
    pendingAdvance.current = null;
    setSummaryRow(-1); setTyped(""); setWrong(null); lockNow(false);
    setStage("free");
    voice.speak(tx(tool.FREE_LINE) || UI.freePlayLine, undefined, { nopark: true });
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
      mascotDo("cheer1"); quickNow();
      /* r40: the PARTY goes off at the RIGHT ANSWER of a phase's last question (the 3 questions are done), not when the win
         animation is over (a tool's winMs can be 5 s): a pop, the chime a moment later (plain timers: clearLater must not swallow
         them), and the confetti. Bigger after the last phase, whose summary follows when the win is over. */
      if (L.i + 1 >= L.items.length) {
        const lastPhase = L.idx === phases.length - 1;
        setTimeout(() => sfx.pop(), 220);
        setTimeout(() => { if (lastPhase) sfx.cheer(); else sfx.win(); }, 420);
        partyNow(lastPhase);
      }
      if (L.tries === 0) firstTry.current += 1;
      answered.current += 1;
      const r = results.current[L.n] || { answered: 0, firstTry: 0, total: L.items.length };
      results.current[L.n] = { ...r, answered: r.answered + 1, firstTry: r.firstTry + (L.tries === 0 ? 1 : 0), total: L.items.length,
        last: { item: L.i, it: it, value, kind: it.kind, answer: it.answer, shared: { ...shared.current } } };
      L.stage = "win";
      setWrong(null);
      setStage("win");
      emit("question_done", { phase: L.n, item: L.i + 1, firstTry: L.tries === 0, conceptId: L.phase.conceptId });
      try {
        if (typeof P.onProgress === "function")
          P.onProgress({ activity: tool.TOOL_ID, done: answered.current, total: L.items.length, phase: L.n, conceptId: L.phase.conceptId, objectiveIds: L.phase.objectiveIds || [] });
      } catch (e) {}
      paceNext(advance, it.winMs ?? tool.winMs ?? 1600);
      return true;
    }
    /* a miss: said three ways and none of them is the number; nothing marked, nothing reset */
    sfx.wrong();
    mascotDo("nod");
    forgetActed(); setReadyKey("");
    const t = L.tries + 1;
    L.tries = t;
    setTries(t);
    setWrong({ value, tries: t });
    staleRef.current = true;
    /* two boxes: both keep the child's numbers, the caret goes back to the first, and a digit typed
       into a box starts that box afresh */
    if (it.parts) { staleParts.current = it.parts.map(() => true); setPart(0); }
    const ladder = L.phase.ladder || [];
    /* r34: the hint shows at once in every mode (a classroom included) UNDER the instruction, which stays pinned on the
       bubble; the same hint stays until the child acts again, a second miss in a row brings the stronger rung */
    /* r41: never weaker than what is already on show (the Hint key may have brought the stronger rungs first) */
    const kRung = Math.min(Math.max(t - 1, rungShown.current), 2);
    const rung = rungOf(it, ladder, kRung);
    if (rung) { rungShown.current = kRung; setHintText(tx(rung)); }
    return false;
  };

  const commit = (v?: any) => (enterRef.current ? enterRef.current(v) : submit(v));
  const press = (k: string) => {
    const L = live.current;
    /* r45: Enter presses the Next key once it is on show (never before: the Enter that sent the answer is long past) */
    if (k === "enter" && nextKeyOn && heldNext) { takeNext(); return; }
    if (k === "enter" && L.stage === "demo") {
      /* every guide step is done and the last result is on show: Enter has nothing left to perform */
      if (L.phase.steps && L.phase.steps.length && stepRef.current >= L.phase.steps.length) return;
      if (enterRef.current) enterRef.current(undefined);
      return;
    }
    if (L.stage === "demo") { demoMiss(); return; }   /* r41: a typed digit during a guide step is a wrong act */
    if (captureRef.current && (L.stage === "ask" || L.stage === "free") && !L.locked) { captureRef.current(k); return; }
    if (L.stage !== "ask" || L.locked) return;
    if (answerOn === "card" && cardGateRef.current && k !== "enter") return;   /* r51: the picture first (a digit would open the keypad past the gate) */
    if (k === "point" && (!tool.pointKey || L.item.parts)) return;
    /* board layout: a key typed on the keyboard opens the answer panel, so the child sees what is being typed */
    if (board && k !== "enter" && !wantRef.current && L.item.pad !== "enter" && !L.item.choices) {
      setPanel(true);
      if (!hintOn.current || hintKind.current === "type") setHintText(UI.typeIt, "type");   /* the first digit: tell the child what the keypad is for */
    }
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
    endCelebration();   /* r41: a restart, a dot or a skip ends the confetti too; r24: and the cheering picture and its jumps */
    changeAt.current = Date.now();
    exploreOf.current = null; hintsOf.current = { at: "", k: 0 };
    fired.current = false; firstTry.current = 0; answered.current = 0;
    summaryTok.current++; setSummaryRow(-1);
    delete results.current[kk + 1]; /* a phase entered again starts a fresh attempt */
    enterRef.current = null;
    capture(null);
    skipTeach.current = at > 0 ? at : null;
    /* the stage moves with the phase in the same render: a jump during a win must never show the
       new phase's first item with stage "win" (a tool drawing its win would draw that item's answer) */
    setIdx(kk); setI(at); setTyped(""); setTries(0); setWrong(null); lockNow(false); setRing(null);
    setStage(at > 0 ? "ask" : "teach");
    setRun((r) => r + 1);
  };
  /* restart in the middle of a classroom's exploring starts the phase just finished again; on the summary page or
     in the end-of-lesson free play it starts the mount over, as it always did */
  const restart = () => (exploreOf.current !== null ? enterPhase(exploreOf.current, 0)
    : ["summary", "free"].includes(live.current.stage) ? playAgain() : enterPhase(live.current.idx, 0));
  /* The header's reset key, for a tool that has a start page (r32): back to the start page with a clean slate (the first
     phase of this mount, nothing played, `finished` re-armed); the lesson waits for Start again, exactly as on opening.
     The teacher agent's toolApi.reset() keeps the old phase restart, so an agent is never left on a page it cannot press. */
  const backToStart = () => {
    summaryTok.current++;
    results.current = {};
    setDone([]);
    clearLater(); voice.hush();
    exploreOf.current = null; pendingAdvance.current = null; enterRef.current = null;
    capture(null);
    startedRef.current = false; setStarted(false);
    enterPhase(mountPhase === null ? 0 : mountPhase - 1, 0);
  };
  const enterItem = (at: number) => {
    const a = Math.min(Math.max(at, 0), live.current.items.length - 1);
    clearLater(); voice.hush();
    exploreOf.current = null; hintsOf.current = { at: "", k: 0 };
    pendingAdvance.current = null; /* a jump makes any advance a spoken line was walking toward stale */
    enterRef.current = null;
    capture(null);
    setI(a); setTyped(""); setTries(0); setWrong(null); lockNow(false); forgetActed(); setStage("ask");
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
    /* r30: the sound button switches the effects only; the printed lines keep their own pacing (nothing to pause) */
    void was;
  };
  const toggleSound = () => setMuted(!mutedRef.current);
  /* a CHANGE of the host's `muted` (not its value at mount, which already seeded mutedRef: a host that always
     sends muted:false, as the preview and the viewer do, must not undo a sound choice the child made) */
  const prevMuted = useRef(P.muted);
  useEffect(() => {
    if (P.muted === prevMuted.current) return;
    prevMuted.current = P.muted;
    if (typeof P.muted === "boolean" && P.muted !== mutedRef.current) setMuted(P.muted);
  }, [P.muted]);

  const highlight = (id: any) => {
    const key = String(id);
    if (!RING_KEYS.includes(key)) return false;
    setRing(key);
    /* its own timer, not `later`: clearLater() (a phase change, the summary, free play) must not leave a ring on for good */
    clearTimeout(ringTimer.current);
    ringTimer.current = setTimeout(() => setRing((r) => (r === key ? null : r)), 2400);
    return true;
  };
  useEffect(() => () => clearTimeout(ringTimer.current), []);

  /* CLASSROOM switched on or off while the tool is mounted (the host's prop, the viewer's tick box). On: nothing
     changes for the sound (r30: effects stay as they are). Off: whatever was waiting for a tap goes on, as it would
     have without a teacher. */
  const prevRoom = useRef(classroom);
  useEffect(() => {
    if (classroom === prevRoom.current) return;
    prevRoom.current = classroom;
    if (classroom) return;
    voice.release();
    const f = nextRef.current;
    if (f) { nextRef.current = null; setHeldNext(false); f(); }
  }, [classroom]);
  /* "your turn": each time a question opens in a classroom, a ring on the working area shows the class where
     the child at the board acts (the same ring as toolApi.highlight("work"), 2.4 s) */
  useEffect(() => {
    if (!classroom) return;
    if (stage === "ask") highlight("work");
    else setRing((r) => (r === "work" ? null : r)); /* the question is no longer open: the ring goes with it */
  }, [classroom, stage, i, idx, run]);

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
      /* r24: a held Enter or Space repeats keydown: the act is done once, by the first press */
      if (e.repeat && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); return; }
      if (startedRef.current && e.key !== "Tab" && e.key !== "Shift") markActed();
      /* the start page: Enter or Space starts the lesson; nothing else is live behind it */
      if (!startedRef.current) { if (e.key === "Enter" || e.key === " ") { startNow(); e.preventDefault(); } return; }
      if (/^[0-9]$/.test(e.key)) { press(e.key); e.preventDefault(); pointerBlur(); }
      else if ((e.key === "." || e.code === "NumpadDecimal") && live.current.stage === "ask" && !captureRef.current
        && (live.current.item.parts || [])[partRef.current] && live.current.item.parts[partRef.current].at === "dwhole") {
        /* a decimal in two boxes: the point is already drawn, so "." steps from the whole part to the decimal part */
        setPart(partRef.current + 1); e.preventDefault(); pointerBlur();
      }
      else if (tool.pointKey && (e.key === "." || e.code === "NumpadDecimal")) { press("point"); e.preventDefault(); pointerBlur(); }
      else if (e.key === "Enter") {
        /* r24: the physical Enter is not taken as a guide-step act within 400 ms of a stage or phase change (a double Enter; the agent's
           check() and the checks' solve() do not come this way) */
        if (live.current.stage === "demo" && Date.now() - changeAt.current < 400) { e.preventDefault(); return; }
        press("enter"); e.preventDefault();
      }
      else if (e.key === "Backspace") { press("back"); e.preventDefault(); pointerBlur(); }
      /* Escape clears the typed answer, but never while the pad is locked (a miss's traceback: the answer stays in the box) */
      else if (e.key === "Escape") { if (captureRef.current) press("clear"); else if (live.current.stage === "ask" && !live.current.locked) setTyped(""); e.preventDefault(); }
      /* classroom: the next-line keys of a presentation clicker or a keyboard, from anywhere on the page */
      else if (holdRef.current && (e.key === "ArrowRight" || e.key === "PageDown")) { nudge(); e.preventDefault(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  /* BOARD layout: the answer panel shows only while a question is open and the working area is not busy (a traceback
     locks the pad, so the panel leaves for it and returns with the answer still in the box). A pad lent to the working
     area (api.capture) opens it by itself and shuts it when it is given back. `slide` eases 0..1 and the working area's
     width follows it frame by frame, so the picture rearranges into the room that is left. */
  /* `props.answerOpen: true` (the host's, or a teacher's, choice) keeps the panel open on every question, as the classic
     layout always had its pad; the working area then stays at its open width. Off by default. */
  const alwaysOpen = (P.answerOpen ?? (P.additionalProps && P.additionalProps.answerOpen)) === true;
  const panelOpen = board && !(cardAnswerOn && item.choices) && !(item.pad === "enter" && !captured && !alwaysOpen) && (openWanted || captured || alwaysOpen) && !locked && (stage === "ask" || (stage === "free" && captured));
  const slide = useSlide(panelOpen ? 1 : 0);
  const workW = board ? Math.round(ZBOARD.work.w - (ZBOARD.work.w - (BIGPAD ? BOARD_OPEN_W_BIG : BOARD_OPEN_W)) * slide) : W.w;
  /* the hint goes with whatever it was about: a right act or a right answer (stepNo / stage change), the next question or
     phase (i, idx, run). A miss changes none of these, so its hint stays. */
  useEffect(() => { setHintText(""); }, [stage, i, idx, run, stepNo]);
  /* r49: where to tap, when the question opens (and when Work says the picture is ready for the card); a real hint stays */
  useEffect(() => {
    /* r24: while the pad is locked (the tool's own act or a traceback) no "tap here" line stands: a tool that locks in the very commit
       a question opens would otherwise show it for a moment (lockedRef is written the moment api.lock is called) */
    if (locked || lockedRef.current) { if (!wantRef.current && hintOn.current && hintKind.current === "type") setHintText(""); return; }
    if ((!answerOn && !keyAskOn) || wantRef.current || panelOpen) return;
    if (hintOn.current && hintKind.current === "hint") return;
    const l = tapLine();
    if (l) setHintText(l, "type");
    else if (hintOn.current && hintKind.current === "type") setHintText("");   /* the picture still wants an act: no "tap the card" */
  }, [answerOn, keyAskOn, i, idx, run, cardReady, locked, panelOpen]);
  /* a new question or phase starts with the panel shut; so does anything that is not a question */
  useEffect(() => { if (board && wantRef.current) setPanel(false); }, [i, idx, run]);
  useEffect(() => { if (board && wantRef.current && stage !== "ask" && !(stage === "free" && captured)) setPanel(false); }, [stage, captured]);

  live.current = { idx, n, phase, i, item, stage, typed, tries, submit, setTyped, items, locked, board, panelOpen, qKey };

  /* what the host and the teacher agent can read and drive (window.toolApi, and window[TOOL_ID]) */
  const apiRef = useRef<any>({});
  apiRef.current = {
    getState: () => ({
      toolId: tool.TOOL_ID, mediaId: tool.MEDIA_ID, mode: navigable ? "user" : "ai", mountPhase, lang,
      phase: n, phases: N, conceptId: phase.conceptId, objectiveIds: phase.objectiveIds || [],
      step: (offsets[idx] || 0) + i, steps, item: i + 1, items: items.length, stage,
      question: tx(item.ask) || "", questionText: say(item), choices: item.choices ? item.choices.map((c: any) => c.id) : null,
      typed: typedRef.current, keypadOpen: stage === "ask" && !locked, tries,
      ...(board ? { board: true, answerPanel: panelOpen ? "open" : "closed", workWidth: workW } : {}),
      ...(hasStart ? { startPage: !started } : {}),
      hintKind: hintText ? hintKind.current : null,   /* r24: for every tool (the built-in "tap the Answer key" line is a "type" line) */
      ...(cardAnswerOn ? { answerOn, cardReady } : {}),
      ...(nextKeyOn ? { nextKey: heldNext ? (heldNext === "phase" ? UI.nextPhase : heldNext === "summary" ? UI.summaryKey : UI.next) : null } : {}),
      party: party.on,
      ...(phase.steps && phase.steps.length ? { guideStep: stepNo, guideSteps: phase.steps.length, guideOn: stage === "demo" && phase.steps[stepNo] ? String(phase.steps[stepNo].on) : null } : {}),
      parts: item.parts ? item.parts.map((p: any) => p.label) : null, part: partRef.current, padTo: captureRef.current ? "work" : "slot",
      answered: answered.current, firstTry: firstTry.current, score: answered.current * POINTS, maxScore: items.length * POINTS,
      answerShown: stage === "win" || stage === "idle" ? item.answer ?? null : null,
      summaryRow, played: Object.keys(results.current).map(Number), questionCount: `${Math.min(i + 1, items.length)} / ${items.length}`,
      muted: mutedRef.current, speaking: voice.speaking, voice: voice.state().voice, mascot: mascotRef.current ? "image" : "drawn",
      classroom, held: classroom && voice.held, instruction: voice.line, hint: hintText || null, ...shared.current,
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
        /* a decimal's two boxes take "2.9" as well as [2, 9] or "2|9" (the point is drawn, not typed) */
        const ps = L.item.parts.some((p: any) => p.at === "dwhole") ? decimalPartsOf(v) : slotPartsOf(v, L.item.parts.length);
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
      /* a guide-steps phase waiting on the child: the agent's check() performs the current step (Enter does it through
         Work's onEnter), never the tool's own answer hook */
      const steps = L.stage === "demo" && L.phase.steps && L.phase.steps.length;
      const r = !steps && tool.check ? tool.check(L.item) : undefined; if (r === undefined) press("enter"); return true;
    },
    reset: () => { restart(); return true; },
    next: () => {
      /* r45: the Next key on show is what next() presses */
      if (nextKeyOn && heldNext && takeNext()) return true;
      /* classroom: whatever waits for the teacher's tap is what next() takes first (an agent in a classroom is
         the teacher's hand: without this a held closing line could never be walked past) */
      if (holdRef.current && nudge()) return true;
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
    /* the verbs that act on the lesson start it if the start page is still up (the teacher agent's first move) */
    const LIVE = ["gotoStep", "answer", "check", "next", "prev", "reset", "playDemo"];
    TOOL_API.forEach((m) => { proxy[m] = (...a: any[]) => { if (LIVE.includes(m)) startNow(); return apiRef.current[m](...a); }; });
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
      board: board,
      /* guide steps: report an act the way Work's api.did does (so a check can try an act out of order: false = ignored) */
      did: (name: any) => !!(didRef.current && didRef.current(name)),
      /* the start page: begin the lesson the way a tap on Start does (a no-op without one) */
      startNow: () => { startNow(); return true; },
      /* board layout: open the answer panel the way a tap on the Answer key does (a no-op elsewhere) */
      openAnswer: () => { if (board && live.current.stage === "ask" && !live.current.locked) setPanel(true); return !!board; },
      dragging: () => DRAGS.live,
      controls: () => Array.from(document.querySelectorAll("[data-control]")),
      state: () => ({ phase: live.current.n, stage: live.current.stage, item: live.current.i, items: live.current.items.length,
        typed: typedRef.current, locked: live.current.locked, panel: !!live.current.panelOpen, finished: fired.current, asked: live.current.item.answer ?? null,
        key: tool.agentKey ? tool.agentKey(live.current.item) : live.current.item.answer ?? null,
        mode: navigable ? "user" : "ai", mascot: mascotRef.current ? "image" : "drawn", ...shared.current }),
      solve: () => {
        const L = live.current;
        /* a guide-steps phase waiting on the child: do every remaining step the way Enter does (Work's onEnter performs
           the current step's act and reports it with api.did), one every 260 ms, until the question opens */
        if (L.stage === "demo" && L.phase.steps && L.phase.steps.length) {
          const go = (k: number) => {
            if (live.current.stage !== "demo" || k > 24) return;
            if (enterRef.current && stepRef.current < L.phase.steps.length) enterRef.current(undefined);   /* done: just wait for the hold */
            setTimeout(() => go(k + 1), 260);
          };
          go(0);
          return;
        }
        return tool.solve ? tool.solve(L.item, (window as any).__tool) : L.submit(L.item.answer);
      },
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
    /* a Work line goes through the tool's TR table like every other line the tool speaks */
    submit, setTyped, say: (lines: any, doneFn?: () => void) => voice.speak(Array.isArray(lines) ? lines.map((l: any) => tx(l)) : tx(lines), doneFn, { nopark: true }), sfx,
    share: (o: any) => { shared.current = o || {}; },
    onEnter: (fn: any) => { enterRef.current = fn || null; },
    /* always set: a Work callback may hold an older api whose `locked` is stale; React skips a no-op */
    lock: (b: boolean) => lockNow(!!b),
    capture, demoDone, did, C, W,
    /* r49 (cardAnswer): a tap on the card opens the keypad / a tap on a box of the card puts the caret in it; cardReady(false)
       while the picture still wants an act (a blinking card would send the child past it) */
    openAnswer, closeAnswer, pickPart, cardReady: setCardReady,
    /* r24: a question answered on the working area (pad "enter") says when its answer is ready to send: the Enter key in the bar then
       blinks (api.answerReady(true)); (false), a new question or a miss makes it steady again. A tool that never calls it keeps a steady key. */
    answerReady,
  };
  /* box: the room the working area has just now ({ w, h }: the whole card with the answer panel shut, the classic
     1086 wide with it open, in between while it slides). A board tool lays itself out from this, not from W. */
  /* step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase), so Work can put
     its one invite on the right control */
  const workProps = { phase, n, item, index: i, stage, wrong, typed, part, captured, api, MODEL: tool.MODEL, lang, tx,
    box: { w: workW, h: W.h, open: panelOpen, board },
    answerOn, cardKind,
    step: stepNo, stepOn: stage === "demo" && phase.steps && phase.steps[stepNo] ? String(phase.steps[stepNo].on) : null };
  const Work = tool.Work;
  const Runs = tool.Runs;
  const rz = ring ? ringBox(ring, workW, panelOpen) : null;

  return (
    <div className="c4-frame" style={{ position: "relative", margin: "0 auto", touchAction: "none", userSelect: "none", WebkitUserSelect: "none" } as any}
      onPointerDownCapture={markActed} onKeyDownCapture={(e: any) => { if (e.key !== "Tab" && e.key !== "Shift") markActed(); }}>
      <style>{CSS}</style>
      <svg className="c4" viewBox="0 0 1600 900" width="100%" height="100%" aria-label={tx(tool.TOOL_NAME)}
        style={{ ["--c4-accent" as any]: C.accent, ["--c4-focus" as any]: shade(C.accent, 0.4) } as any}>
        <Defs C={C} />
        <rect x={0} y={0} width={1600} height={900} fill={C.paper} />
        {!started ? (
          <StartPage C={C} name={tx(tool.TOOL_NAME)} hook={tx(tool.START_HOOK)} Art={tool.StartArt} UI={UI} lang={lang} tx={tx}
            onStart={startNow} mascotOk={mascotOk} onMascotFail={mascotFail} />
        ) : (<>
        <Header C={C} name={tx(tool.TOOL_NAME)} title={tx(phase.concept)} soundOn={soundOn}
          onAgain={askHint}
          onSound={toggleSound} onRestart={showStart ? backToStart : restart} toStart={showStart} UI={UI} />
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
        <g data-zone="work" transform={`translate(${W.x},${W.y})`} onClick={workTap}>
          {/* r41: a transparent floor under Work, so a tap on EMPTY board lands inside the zone and counts as a wrong act in a guide step */}
          <rect data-role="work-floor" x={0} y={0} width={workW} height={W.h} fill="transparent" aria-hidden="true" />
          {Work && <Work key={run} {...workProps} />}
        </g>
        {(() => {
          const askText = stage === "teach" ? "" : stage === "free" ? UI.freePlay : tx(item.ask);
          const nextLabel = heldNext === "phase" ? UI.nextPhase : heldNext === "summary" ? UI.summaryKey : UI.next;
          const slotEl = (
            <Slot C={C} ask={board ? "" : askText} typed={stage === "free" ? "" : typed} active={stage === "ask" && !captured} live={stage === "ask"} format={tool.format} lang={lang} TR={tool.TR}
              parts={stage === "free" ? null : item.parts} part={part} onPart={pickPart} side={!!tool.sideBySide} />
          );
          /* no host Next key: the tool walks on to the next phase by itself */
          const padEl = (
            <Pad C={C} enabled={(stage === "ask" || (stage === "free" && captured)) && !locked} digitsOff={stage !== "free" && item.pad === "enter" && !captured} onKey={press}
              point={!!tool.pointKey} pointOff={stage !== "free" && !!item.parts && !captured}
              choices={stage === "free" ? null : item.choices} onChoice={(id: string) => { if (!locked) commit(id); }} UI={UI} lang={lang} TR={tool.TR} />
          );
          /* r45 (nextKey, classic layout): while the Next key waits it takes the slot's place and the pad rests */
          if (!board) {
            if (nextKeyOn && heldNext) {
              return (
                <>
                  <Key id="next-key" label={nextLabel} x={Z.slot.x} y={Z.slot.y} w={Z.slot.w} h={Z.slot.h} C={C} tone="enter" primary onClick={takeNext}>
                    <text y={String(nextLabel).length > 10 ? 11 : 14} textAnchor="middle" fontSize={String(nextLabel).length > 10 ? T.label : T.prompt} fontWeight={600} fill={toneInk("enter", "#FFFFFF")}>{nextLabel}</text>
                  </Key>
                  <NextBlink x={Z.slot.x} y={Z.slot.y} w={Z.slot.w} h={Z.slot.h} C={C} />
                </>
              );
            }
            return <>{slotEl}{padEl}</>;
          }
          /* BOARD: the question and the Answer key in the bar on top; the slot and the pad in a panel that slides in
             from the right (not drawn at all while it is shut, so nothing in it can be tabbed to or tapped) */
          /* r49 (cardAnswer): Next, then the choice keys (Yes / No), then nothing (the card is the answer), then the Answer key */
          const askMode = nextKeyOn && heldNext ? "next" : stage !== "ask" || locked ? "off" : item.pad === "enter" && !captured ? "enter"
            : answerOn === "choices" ? "choices" : answerOn === "card" ? "card" : "answer";
          return (
            <>
              <AskBar C={C} ask={askText} hasRuns={!!Runs} mode={askMode} open={panelOpen} UI={UI} nextLabel={nextLabel}
                choices={item.choices} onChoice={(id: string) => { if (!locked) commit(id); }} lang={lang} TR={tool.TR} quiet={cardAnswerOn}
                onTap={workTap}
                blink={askMode === "answer" ? keyAskOn && !locked && !panelOpen && cardReady : askMode === "enter" ? readyKey === qKey && readyKey !== "" && !locked : false}
                onKey={() => {
                  if (askMode === "next") { takeNext(); return; }
                  if (askMode === "enter") { press("enter"); return; }
                  /* r36: tapping Answer opens the keypad and shows the built-in "type your answer" line under the pinned
                     instruction (unless a hint is on show); Close takes that line away again */
                  if (!wantRef.current) openAnswer(); else closeAnswer();
                }} />
              <g data-zone="drawer" display={slide < 0.002 ? "none" : undefined} transform={`translate(${((1 - slide) * (Z.drawer.w + 56)).toFixed(1)},0)`}>
                <rect x={Z.drawer.x} y={Z.drawer.y} width={Z.drawer.w} height={Z.drawer.h} rx={RAD.card - 4} fill={THEME && THEME.panel ? "url(#gTpanel)" : "url(#gPanel)"} stroke={THEME && THEME.panel ? (THEME.slot || C.rule) : C.rule} strokeWidth={2} filter="url(#fShadow)" />
                {cardKind ? (
                  <Key id="answer-open" label={UI.answerClose} x={Z.slot.x} y={Z.slot.y + 10} w={Z.slot.w} h={72} C={C} tone="soft"
                    disabled={stage !== "ask" || locked} onClick={closeAnswer}>
                    <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={toneInk("soft", C.ink)}>{UI.answerClose}</text>
                  </Key>
                ) : slotEl}
                {padEl}
              </g>
            </>
          );
        })()}
        </g>
        {stage === "summary" && (
          <Summary C={C} phases={phases} results={results.current} row={summaryRow} showScore={P.showScore !== false && !classroom}
            freePlay={!!tool.freePlay} onFree={freePlay} onAgain={playAgain} Thumb={tool.Thumb} UI={UI} lang={lang} TR={tool.TR} />
        )}
        <Footer C={C} line={voice.line} hint={hintText} speaking={voice.speaking} react={react} n={n} N={N} i={i} total={items.length}
          navigable={navigable} done={done} onGo={goPhase} mascotOk={mascotOk} onMascotFail={mascotFail} cheerOn={(party.on || quick.on) && cheerOk} onCheerFail={() => setCheerOk(false)} UI={UI}
          thinkOn={thinkOk && stage === "ask" && !(locked && tries > 0) && actedKey !== qKey && !(nextKeyOn && heldNext)} onThinkFail={() => setThinkOk(false)} bulbN={bulb.on ? bulb.n : 0}
          onBubble={classroom ? nudge : undefined} cue={voice.held} board={board} lang={lang} hintType={!!hintText && hintKind.current === "type"} />
        {party.on && <Party key={party.n} C={C} big={party.big} n={party.n} />}
        {rz && <rect className="c4-ring" x={rz.x - 6} y={rz.y - 6} width={rz.w + 12} height={rz.h + 12} rx={24}
          fill="none" stroke={C.accent} strokeWidth={6} pointerEvents="none" />}
        </>)}
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
