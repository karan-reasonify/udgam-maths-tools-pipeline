/* check <MEDIA_ID>: what a Udgam maths tool must pass before it is final or published.
 *
 * WHICH ROWS RUN is decided by what the chapter's pinned runtime SOURCE contains (lib/core/caps.mjs), never by a
 * runtime number: a VOICED runtime (no `const SILENT_VOICE = true`) runs the voice rows and none of the silent ones,
 * a SILENT runtime the silent rows and none of the voice ones; a feature row (board, start page, guide steps, hint,
 * classroom, party ...) runs only for a runtime that has the feature.
 *
 *   source    host scope, the events, user + AI mode, focus ring, inline mascot, no stray export
 *   maths     the tool's own data, run in Node: number words, Indian commas, every answer against
 *             judge() and oracle(), near misses rejected, no answer printed in a question or hint,
 *             spoken (voiced) or bubble (silent) lines in words, a full hint ladder, and on a silent runtime:
 *             guide steps well formed, one page, every printed line in Hindi and Gujarati (once a TR
 *             table has begun); the plan's concept ids and answers
 *   render    every phase in headless Chrome (user and AI mode): nothing overlaps, nothing spills
 *             out of its zone or off the stage, type floor, finger boxes, one invite, the picture
 *             agrees with the number, a wrong answer is unmarked and nothing resets, finished once
 *             with honest scores, the agent finishes a phase through toolApi alone, keyboard path;
 *             voiced: mute honoured, the device's Indian English voice, mute keeps the place, sound
 *             starts on; silent: the lesson silent (no speech, no Tap to start), the sound button, the
 *             hint on the bubble, guide steps wait for the child's act, the arrow only in a classroom;
 *             console / network / storage clean, stillness, mascot decoded
 *   contrast  every text against the pixels actually behind it (a screenshot of each phase)
 *
 * One report: .build/check.json, a short table, and a summary in status.json. A FAIL blocks
 * port and publish; a WARN is for a person to judge; INFO is a fact worth knowing.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { sources, hostScope } from "../build/preview.mjs";
import { loadModel } from "./model.mjs";
import { actLimit, realInput, startPageInput, stepClickInput, partyInput, realWrongInput, hintFramesInput, partyDotInput, summaryInput, nextKeyInput, judgeNextKey, cardAnswerInput, judgeCardAnswer, judgeSummaryThumbs, navDotsInput, judgeNavDots, actionAnimInput, judgeActionAnim, fontKitInput, judgeFontKit, oneLineInput } from "./input.mjs";
import { padShapeProblems } from "./padshape.mjs";
import { judgeSilent, judgeNoArrow, judgeSoundButton, stepsShape, judgeGuideSteps, judgeHintOnMiss, judgeHintPinned, judgeHintFit, judgeHintAlone, judgeOneLine, DEV_RULE,
  judgeClassroom, judgePaging, judgeOnePage, judgeHintKey, judgePhaseParty, judgeNoFreeBetween,
  judgeClassroomPieces, judgeRealWrong, judgeLadderMonotonic, judgeHintLines, judgeChoiceLine, judgePartyExtras, judgeSummarySimple, devRuleKey,
  printedLines, trCoverage, trMessage, bubblePieces } from "./silent.mjs";
import { dumpDomAsync, screenshotAsync, pool } from "../core/chrome.mjs";
import { decodePng, contrast, parseRgb } from "../core/png.mjs";
import { idOf, writeStatus } from "../core/work.mjs";
import { pinState } from "../core/pin.mjs";
import { capsOf } from "../core/caps.mjs";
import { pencilRows } from "./pencil.mjs";
import { readPin } from "../core/pin.mjs";
import { judgePictureScale, PICTURE_SCALE_DETAIL } from "./picturescale.mjs";
import { layoutProblems, phoneProblems, inter, inside, fmt, PHONE, PHONE_TEXT_PX } from "./layoutfit.mjs";

/* the zones as containers, in stage units (a little wider than the boxes where text sits beside them) */
export const ZONES = {
  header: { x: 0, y: 0, w: 1600, h: 80 },
  runs: { x: 64, y: 108, w: 330, h: 76 },
  work: { x: 64, y: 202, w: 1086, h: 528 },
  slot: { x: 1170, y: 100, w: 390, h: 252 },   /* a 3-line question reaches y 114 */
  pad: { x: 1166, y: 364, w: 396, h: 376 },
  voice: { x: 28, y: 704, w: 204, h: 196 },
  bubble: { x: 232, y: 746, w: 680, h: 148 },
  bar: { x: 924, y: 752, w: 642, h: 148 },
  summary: { x: 40, y: 92, w: 1520, h: 654 },
  cover: { x: 0, y: 0, w: 1600, h: 900 },
};
/* the BOARD layout (runtime r27, LAYOUT.md §1b): the question bar on top, the working area as wide as the card, the
   slot and pad in a panel on the right (sampled open, after the panel has slid in) */
export const ZONES_BOARD = {
  ...ZONES,
  runs: { x: 64, y: 100, w: 330, h: 96 },
  ask: { x: 40, y: 98, w: 1520, h: 100 },
  work: { x: 64, y: 202, w: 1472, h: 528 },
  drawer: { x: 1158, y: 198, w: 390, h: 540 },
  slot: { x: 1164, y: 204, w: 380, h: 122 },
  pad: { x: 1164, y: 316, w: 380, h: 422 },
};

const WORDS = [[0, "zero"], [7, "seven"], [15, "fifteen"], [20, "twenty"], [21, "twenty-one"], [99, "ninety-nine"],
  [100, "one hundred"], [101, "one hundred one"], [110, "one hundred ten"], [999, "nine hundred ninety-nine"],
  [1000, "one thousand"], [1001, "one thousand one"], [9999, "nine thousand nine hundred ninety-nine"], [10000, "ten thousand"],
  [10512, "ten thousand five hundred twelve"], [11007, "eleven thousand seven"], [89890, "eighty-nine thousand eight hundred ninety"],
  [99999, "ninety-nine thousand nine hundred ninety-nine"], [100000, "one lakh"], [456923, "four lakh fifty-six thousand nine hundred twenty-three"],
  [738000, "seven lakh thirty-eight thousand"], [999999, "nine lakh ninety-nine thousand nine hundred ninety-nine"],
  [1000000, "ten lakh"], [10000000, "one crore"]];
const INDIAN = [[0, "0"], [999, "999"], [1000, "1,000"], [9999, "9,999"], [10000, "10,000"], [99999, "99,999"], [100000, "1,00,000"],
  [456923, "4,56,923"], [738000, "7,38,000"], [999999, "9,99,999"], [1000000, "10,00,000"], [12345678, "1,23,45,678"]];

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/* a number-form found only as itself ("10" is not inside "10,000"); a word-form only as whole words */
function mentions(text, form) {
  const f = String(form);
  if (!f) return false;
  /* a boundary only on a side that is a word character ("39%" has none after the sign); a digit-first form is never the tail of a decimal ("0.39%") */
  const head = /^\d/.test(f) ? "(?<![\\d,.])" : /^\w/.test(f) ? "\\b" : "", tail = /\w$/.test(f) ? "\\b" : "";
  const re = /^[\d,]+$/.test(f) ? new RegExp(`(^|[^\\d,])${esc(f)}(?![\\d,])`) : new RegExp(`${head}${esc(f)}${tail}`, "i");
  return re.test(String(text || ""));
}
const hueOf = ([r, g, b]) => {
  const R = r / 255, G = g / 255, B = b / 255, mx = Math.max(R, G, B), mn = Math.min(R, G, B), d = mx - mn, l = (mx + mn) / 2;
  if (!d) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = mx === R ? 60 * (((G - B) / d) % 6) : mx === G ? 60 * ((B - R) / d + 2) : 60 * ((R - G) / d + 4);
  return { h: (h + 360) % 360, s, l };
};
const isRed = (c) => { const x = hueOf(c); return (x.h >= 345 || x.h <= 15) && x.s > 0.5 && x.l > 0.25 && x.l < 0.75; };
const EMOJI = /\p{Extended_Pictographic}/u;
/* what must never reach the bubble (r30: the printed line; it was the voice): digits, the symbols a reader may skip or
   misread, unit abbreviations. The runtime prints speakable(line), so this is read after speakable() */
const unspoken = (t) => /[\d₹°×÷=+−]|\b(km|cm|mm|kg|mg|mL|ml|Rs)\b/.test(String(t));
const CROSS = /[✗✘×❌]|\b(wrong|incorrect)\b/i;
/* "×" beside a number is multiplication ("× 100", "7 × 1,00,000"), not a cross */
const marks = (text) => CROSS.test(String(text).replace(/[\d,]\s*×|×\s*[\d,]/g, ""));

function readDrive(dom) {
  const m = /<pre id="__drive"[^>]*>([\s\S]*?)<\/pre>/.exec(dom || "");
  if (!m) return null;
  return JSON.parse(m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
}

export async function runChecks(dir, { render = true, log = console.log } = {}) {
  const R = [];
  const add = (group, id, level, msg) => R.push({ group, id, level, msg });
  const ok = (group, id, cond, good, bad, level = "fail") => add(group, id, cond ? "pass" : level, cond ? good : bad);
  const id = idOf(dir);

  /* ── source ───────────────────────────────────────────────────────────────────── */
  const { runtime, tool, combined } = sources(dir);
  /* what the pinned runtime can do, read off its source (lib/core/caps.mjs): every gate below is one of these */
  const caps = capsOf(runtime), silentRt = caps.silent;
  /* r44: the simple summary page (one bubble line, UI.summaryLine; no row read out or ringed; FINISH_LINE not shown) */
  const summaryRt = /\bsummaryLine\s*:/.test(runtime);
  /* class 4 r27, LAYOUT.md §1d: the two opt-in switches, each asked only of a runtime that has it (comments stripped first). keyOnly
     needs the board layout; every geometry-calibrated row below branches on them and judges a tool without them exactly as before */
  const toolBare = tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
  const wantsKeyOnly = /\bkeyOnly\s*:\s*true/.test(toolBare), wantsNavDots = /\bnavDots\s*:\s*true/.test(toolBare);
  const keyOnly = wantsKeyOnly && caps.keyOnly && caps.board && /\bboard\s*:\s*true/.test(toolBare), navDots = wantsNavDots && caps.navDots;
  /* ONE SENTENCE A SCREEN (2026-10-16, LAYOUT §1d): a keyOnly tool on a runtime with caps.oneSentence shows ONE sentence of Kiko's speech a
     screen (a hint replaces the question, no built-in type line, the closing at a phase's last win, digits as written, no puff or bulb). Every
     row below that judges the bubble branches on it; a keyOnly tool on r27 and every tool without keyOnly are judged exactly as before */
  const oneSentence = keyOnly && caps.oneSentence, asWritten = oneSentence && silentRt;
  const ONE_NOTE = oneSentence ? " [keyOnly, one sentence a screen: a hint is drawn ALONE, in place of the line, until the child's next act]" : "";
  const hs = hostScope(combined, tool);
  ok("source", "host-scope", !hs.length, "react (+ bundled @use-gesture) only; five host hooks; export default last", hs.join("; "));
  ok("source", "events", /dispatchEvent\(new CustomEvent\("finished"/.test(runtime) && /name: "finished"/.test(runtime) && /P\.onComplete/.test(runtime),
    "finished leaves three ways (CustomEvent, postMessage, onComplete)", "finished is not wired three ways");
  ok("source", "phase-prop", /P\.phase/.test(runtime), "reads props.phase", "never reads props.phase");
  ok("source", "modes", /navigableDots/.test(runtime) && /w\.toolApi = proxy/.test(runtime) && /TOOL_API\s*=\s*\[/.test(runtime),
    "user mode (navigableDots) and AI mode (window.toolApi) both wired", "the user / AI mode contract is missing");
  ok("source", "focus-ring", /:focus-visible/.test(runtime) && /:focus[^-][^{]*\{outline:none\}/.test(runtime), "focus ring only for the keyboard (:focus-visible)", "focus ring pair missing");
  ok("source", "mascot-inline", /const MASCOT_IMAGE: string = "data:image\/webp;base64,/.test(combined), "mascot travels inside the tool (inline WebP)", "mascot is not inline");
  /* the host declares its mock lucide icons with `var` in the tool's scope (lib/ship/hostTemplate.mjs);
     four of them hide browser globals, so `new Image()` built an icon on staging and the mascot fell
     back to its dot. Reach them through window (window.Image) or avoid them. */
  const bare = (runtime + "\n" + tool).replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "").replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g, '""');
  const shadowed = ["Image", "File", "Lock", "Infinity"].filter((g) => new RegExp(`(^|[^.\\w$])${g}\\b(?!\\s*:)`).test(bare));
  ok("source", "host-names", !shadowed.length, "no browser global the host hides behind an icon (Image, File, Lock, Infinity)", `uses ${shadowed.join(", ")}: on the host these are lucide icons; use window.${shadowed[0]}`);
  ok("source", "no-raster-in-tool", !/<image|<img|data:image/.test(tool), "tool.tsx draws everything (no raster of its own)", "tool.tsx carries a raster");
  /* object skins (docs/IMAGES.md): every literal <Skin name="..."> the tool draws has a picture in the slot's images.tsx
     (a name with no picture draws nothing, silently). Judged only once images.tsx exists, so a tool can be built first. */
  const noComments = tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
  const skinNames = [...new Set([...noComments.matchAll(/<Skin\b[^>]*?\bname=(?:"([^"]+)"|\{\s*"([^"]+)"\s*\})/g)].map((x) => x[1] || x[2]))];
  const imagesFile = path.join(dir, "images.tsx");
  const hasImages = fs.existsSync(imagesFile);
  if (skinNames.length && hasImages) {
    const keys = [...fs.readFileSync(imagesFile, "utf8").matchAll(/^\s*"([^"]+)"\s*:\s*"data:image/gm)].map((x) => x[1]);
    const missing = skinNames.filter((k) => !keys.includes(k));
    ok("source", "skin-keys", !missing.length, `every <Skin name> has a picture in images.tsx (${skinNames.join(", ")})`, `<Skin name> with no picture in images.tsx: ${missing.join(", ")} (it would draw nothing)`);
  }
  /* class 4 r27: keyOnly is a board tool's, and a keyOnly tool with a runs box is not designed yet (the runs box sat beside the bar) */
  if (wantsKeyOnly || wantsNavDots) {
    const kb = [];
    if (wantsKeyOnly && !caps.keyOnly) kb.push("the tool asks for keyOnly but the chapter's runtime has no key-only layout (class 4 r27 or later: pin the chapter)");
    if (wantsNavDots && !caps.navDots) kb.push("the tool asks for navDots but the chapter's runtime has no nav dots (class 4 r27 or later: pin the chapter)");
    if (wantsKeyOnly && caps.keyOnly && !/\bboard\s*:\s*true/.test(toolBare)) kb.push("keyOnly is for a board tool: set board: true too");
    if (keyOnly && /(^|\n)\s*(?:function|const|let)\s+Runs\b/.test(toolBare)) kb.push("a keyOnly tool with a runs box (Runs) is not supported yet: the runs box sat beside the question bar; drop Runs or keyOnly");
    ok("source", "key-only", !kb.length, `${[keyOnly && "keyOnly", navDots && "navDots"].filter(Boolean).join(" and ")} (class 4 r27, LAYOUT.md §1d): the runtime has ${keyOnly && navDots ? "both" : "it"}${keyOnly ? ", the tool is on the board layout, no runs box" : ""}`, kb.join("; "));
  }
  /* the chapter builds on its own frozen runtime, so no other chapter can restale this tool */
  const pin = pinState(dir);
  ok("source", "runtime-pin", pin.ok, pin.msg, pin.msg);
  /* 2026-10-22 (pencil-acts, docs/CHECKS.md): a row only for a runtime with the pencil write move or a tool that writes; none for a finished chapter. A bug here never stops a check. */
  try { for (const r of pencilRows(tool, { caps, strict: !!(readPin(path.dirname(dir)) && readPin(path.dirname(dir)).rules && readPin(path.dirname(dir)).rules.pencilActs === "strict") })) add("source", r.id, r.level, r.msg); } catch (e) { /* not a tool problem */ }

  /* ── maths ────────────────────────────────────────────────────────────────────── */
  let m = await loadModel(dir);
  /* r24: a question's own ladder (it.ladder) is read only by a runtime whose rungOf reads it; an older pin ignores the field, so the
     checks of such a chapter ignore it too and judge it exactly as before */
  if (!caps.itemLadder) for (const p of m.PHASES || []) for (const it of p.items || []) if (it && it.ladder !== undefined) { try { delete it.ladder; } catch (e) { /* frozen: left */ } }
  const badW = WORDS.filter(([n, w]) => m.words(n) !== w).map(([n, w]) => `${n} -> "${m.words(n)}" (want "${w}")`);
  ok("maths", "number-words", !badW.length, `number names, Indian system: ${WORDS.length} of ${WORDS.length} right`, badW.join("; "));
  const badI = INDIAN.filter(([n, s]) => m.indian(n) !== s).map(([n, s]) => `${n} -> ${m.indian(n)} (want ${s})`);
  ok("maths", "indian-commas", !badI.length, `Indian commas 3-2-2: ${INDIAN.length} of ${INDIAN.length} right`, badI.join("; "));
  const sp = ["Build 10,512 now", "9,99,999 and 1", "3/4 of 12", "2.5 metres", "Pay ₹12.50", "at 8:25", "5 km 250 m", "2 L 500 mL",
    "7 kg 300 g", "the 3rd day", "45°", "12 × 4 = 48", "56 ÷ 7", "9 − 4", "1 3/4"].map((s) => m.speakable(s)).filter((s) => unspoken(s));
  /* fractions as the book reads them (ch 7): a quarter, a mixed number with "and", ordinals past twelve */
  const FRAC = [["3/4 of 12", "three quarters of twelve"], ["1/4", "one quarter"], ["3 2/5", "three and two fifths"],
    ["14/21", "fourteen twenty-firsts"], ["8/1", "eight over one"], ["1/2", "one half"]];
  const frBad = FRAC.filter(([s, w]) => m.speakable(s) !== w).map(([s, w]) => `${s} -> "${m.speakable(s)}" (want "${w}")`);
  ok("maths", "speakable", !sp.length && !frBad.length, "speakable() turns numbers, comma forms, fractions (quarters, mixed numbers), decimals, rupees, clock times, units, ordinals, degrees and + − × ÷ = into words", [sp.length ? `not words yet: ${sp.join(" | ")}` : "", frBad.join("; ")].filter(Boolean).join("; "));
  let oracleOk = false;
  try { oracleOk = !m.oracle || !!m.oracle(); } catch (e) { oracleOk = false; }
  ok("maths", "oracle", oracleOk, "every answer re-derived by an independent route (oracle)", "oracle() disagrees with the answer table");
  const itemsBad = [], echo = [], digitLines = [], ladders = [], ids = [];
  const formsOf = (it) => (m.answerForms ? m.answerForms(it) : Array.isArray(it.answer) ? it.answer.filter((x) => x >= 10).flatMap((x) => [String(x), m.indian(x), m.words(x)]) : typeof it.answer === "number" ? [String(it.answer), m.indian(it.answer), m.words(it.answer)] : [String(it.answer)]);
  /* a phase's guide steps (runtime r30, `steps: [{ say, on }]`): their lines are bubble lines like any other */
  const stepSays = (p) => (Array.isArray(p.steps) ? p.steps.map((s) => s && s.say).filter((x) => typeof x === "string") : []);
  for (const p of m.PHASES) {
    if (!/^M\d+\.S\d+\.T\d+\.C\d+$/.test(p.conceptId || "") || !(p.objectiveIds || []).length) ids.push(`phase ${p.n}`);
    const lad = p.ladder || [], ladOf = (it) => (it.ladder && it.ladder.length ? it.ladder : lad);   /* r24: a question may carry its own ladder (rungs 2 and 3) */
    if (p.items.some((it) => !it.miss || ladOf(it).length < 2) || (!p.items.length && lad.length < 2)) ladders.push(`phase ${p.n}`);
    const spoken = [...(p.says || []), ...stepSays(p), ...(p.demoLines || []), ...lad, p.closing, ...p.items.flatMap((it) => [it.say, it.miss, ...(it.ladder || [])])].filter(Boolean);
    for (const s of spoken) if (unspoken(m.speakable(s))) digitLines.push(s.slice(0, 50));
    p.items.forEach((it, k) => {
      const tag = `${p.n}.${k + 1}`, key = m.agentKey ? m.agentKey(it) : it.answer;
      if (it.answer === undefined || it.answer === null || it.answer === "") itemsBad.push(`${tag} has no answer`);
      else {
        if (!m.judge(it, key)) itemsBad.push(`${tag}: judge rejects its own answer ${JSON.stringify(key)}`);
        if (m.nearMiss) { const nm = m.nearMiss(it); if (m.judge(it, nm)) itemsBad.push(`${tag}: judge accepts the near miss ${JSON.stringify(nm)}`); }
      }
      const texts = [it.ask, it.say, it.miss, ...lad, ...(it.ladder || []), ...(p.says || []), ...stepSays(p)];
      for (const f of formsOf(it)) if (texts.some((t) => mentions(t, f))) echo.push(`${tag} prints "${f}"`);
    });
  }
  for (const s of [...(m.OPENING || []), summaryRt ? null : m.FINISH_LINE].filter(Boolean)) if (unspoken(m.speakable(s))) digitLines.push(s.slice(0, 50));
  const nItems = m.PHASES.reduce((a, p) => a + p.items.length, 0);
  ok("maths", "answers", !itemsBad.length, `${nItems} answers: each accepted by judge(), its near miss rejected`, itemsBad.join("; "));
  ok("maths", "answer-not-echoed", !echo.length, "no question, hint or ladder line prints its own answer", echo.join("; "));
  /* a word-choice item offers its answer exactly once, and no two choices are the same */
  const choiceBad = [];
  m.PHASES.forEach((p) => p.items.forEach((it, k) => {
    if (!it.choices) return;
    const ids = it.choices.map((c) => String(c.id)), labels = it.choices.map((c) => String(c.label).toLowerCase());
    if (ids.filter((x) => x === String(it.answer)).length !== 1) choiceBad.push(`${p.n}.${k + 1}: the answer "${it.answer}" is offered ${ids.filter((x) => x === String(it.answer)).length} times`);
    if (new Set(ids).size !== ids.length || new Set(labels).size !== labels.length) choiceBad.push(`${p.n}.${k + 1}: two choices are the same`);
    if (ids.length < 2) choiceBad.push(`${p.n}.${k + 1}: fewer than two choices`);
  }));
  const nChoice = m.PHASES.reduce((a, p) => a + p.items.filter((it) => it.choices).length, 0);
  ok("maths", "choices", !choiceBad.length, nChoice ? `${nChoice} word-choice items: each offers its answer once, no duplicates` : "no word-choice items", choiceBad.join("; "));
  if (asWritten) add("maths", "voice-in-words", "info", "not asked: keyOnly (one sentence a screen) on a silent runtime prints a line AS WRITTEN, Latin digits and all (36.907, 1.45 kg), never as number words; the bubble rows below read it as written, and one-line-bubble proves it on the bubble");
  else ok("maths", "voice-in-words", !digitLines.length, silentRt ? "every bubble line is printed as words (no digit, symbol or unit abbreviation left after speakable)" : "every spoken line reaches the voice as words (no digit, symbol or unit abbreviation left)", digitLines.join(" | "));
  /* ONE SENTENCE A SCREEN: from here on every bubble row reads the bubble's text AS WRITTEN (m.speakable / m.speakableIn are the identity)
     and knows the switch (m.oneSentence). The `speakable` and `number-words` rows above judged the real functions. */
  if (oneSentence) m = { ...m, oneSentence: true, ...(asWritten ? { speakable: (s) => String(s ?? ""), speakableIn: (s) => String(s ?? "") } : {}) };
  /* NCERT V13 + V19 (silent runtime: kept for the printed bubble): no en or em dash, and each piece at most 20 words and 110 characters */
  const allSpoken = [...(m.OPENING || []), summaryRt ? null : m.FINISH_LINE, ...m.PHASES.flatMap((p) => [...(p.says || []), ...stepSays(p), ...(p.demoLines || []), ...(p.ladder || []), p.closing,
    ...p.items.flatMap((it) => [it.say, it.miss, ...(it.ladder || [])])])].filter(Boolean);
  const dashes = allSpoken.filter((x) => /[–—]/.test(x)).map((x) => x.slice(0, 40));
  const long = allSpoken.flatMap((x) => (m.pieces ? m.pieces(m.speakable(x)) : [x])).filter((x) => x.length > 110 || x.split(/\s+/).length > 20).map((x) => x.slice(0, 40));
  ok("maths", "voice-lines", !dashes.length && !long.length, `${allSpoken.length} ${silentRt ? "bubble" : "spoken"} lines: no dashes, every piece at most 20 words and 110 characters`,
    [...dashes.map((x) => `dash: "${x}"`), ...long.map((x) => `long: "${x}"`)].join("; "));
  /* the voice (voiced runtime) or the bubble (silent, r30: the lesson is printed, the rule stays) never repeats itself
     (user, 2026-09-22, "not repeat the speech"): a phase is one run (the opening on the first phase, the teach lines, every question's say, every miss, the
     ladder; a guide-steps phase shows its steps instead of the opening and teach), and so is a closing with the next
     phase's teach (or steps) and first question. No sentence comes twice in a run, word for word or as a near copy (a
     sentence of 5+ words inside another, or in order inside one at most 3 words longer: "Where did the rest go?"
     after "Where did the rest of it go?"). A played probe found questions of one phase sharing an instruction
     ("Round each addend to the nearest thousand." ending all three), which a teach-only run missed. */
  const sentences = (x) => String(m.speakable(x) || "").split(/(?<=[.?!])\s+/)
    .map((s) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim()).filter((s) => s.split(" ").length >= 3);
  const said = (lines) => lines.filter(Boolean).flatMap(sentences);
  const inOrder = (ws, wl) => { let i = 0; for (const w of wl) if (w === ws[i]) i++; return i === ws.length; };
  const alike = (a, b) => {
    if (a === b) return true;
    const [sh, lo] = a.length <= b.length ? [a, b] : [b, a], ws = sh.split(" "), wl = lo.split(" ");
    return ws.length >= 5 && (lo.includes(sh) || (wl.length - ws.length <= 3 && inOrder(ws, wl)));
  };
  const repeats = [];
  const runOnce = (label, lines) => {
    const ss = said(lines);
    for (let i = 0; i < ss.length; i++) for (let j = i + 1; j < ss.length; j++)
      if (alike(ss[i], ss[j])) repeats.push(`${label} says "${(ss[i].length < ss[j].length ? ss[i] : ss[j]).slice(0, 48)}" twice`);
  };
  /* what a phase opens with: its guide steps (r30; the opening and teach lines are then not shown), else the teach run */
  const opens = (ph, k) => (stepSays(ph).length ? stepSays(ph) : [...(k === 0 ? m.OPENING || [] : []), ...(ph.says || [])]);
  /* r34: a step's hint is a bubble line of its phase too: never a copy of its own instruction or of another hint */
  const stepHints = (ph) => (Array.isArray(ph.steps) ? ph.steps.map((s) => s && s.hint).filter((x) => typeof x === "string") : []);
  m.PHASES.forEach((p, k) => {
    const next = m.PHASES[k + 1], firstSay = (ph) => ph.items[0] && ph.items[0].say;
    /* ONE SENTENCE A SCREEN: the closing is the bubble's line right after the phase's last question (it replaces the win line), so it joins the run */
    runOnce(`phase ${p.n}`, [...opens(p, k), ...stepHints(p), ...p.items.flatMap((it) => [it.say, it.miss, ...(it.ladder || [])]), ...(p.ladder || []), ...(oneSentence ? [p.closing] : [])]);
    if (next) runOnce(`phase ${p.n} closing into phase ${next.n}`, [p.closing, ...opens(next, k + 1), firstSay(next)]);
  });
  if (silentRt) ok("maths", "bubble-no-repeat", !repeats.length, "the bubble never repeats itself: no sentence twice in a phase (teach or guide steps, questions, hints) or a closing into the next phase's opening, nor a near copy",
    [...new Set(repeats)].join("; "));
  else ok("maths", "voice-no-repeat", !repeats.length, "the voice never repeats itself: no sentence twice in a phase (teach, questions, hints) or a closing into the next teach, nor a near copy",
    [...new Set(repeats)].join("; "));
  /* guide steps (runtime r30): well formed. Played in the full check (the guide-steps row of the render group) */
  const stepPhases = m.PHASES.filter((p) => Array.isArray(p.steps) && p.steps.length);
  const shapeBad = stepPhases.length ? stepsShape(m.PHASES, m) : [];
  if (stepPhases.length && !render) ok("maths", "guide-steps", !shapeBad.length, `guide steps on phase ${stepPhases.map((p) => p.n).join(", ")}: every step a say, an on and a hint, the names and hints unique, each piece at most 20 words and 110 characters, no dash (played in the full check)`, shapeBad.join("; "));
  /* hint-fit (r34): every hint a question or a step can show fits the bubble under its pinned instruction (source; a full
     check adds what the runs drew, in the render group) */
  const hintRt = caps.hint;
  /* a hint in getState() that the bubble does not draw. ONE SENTENCE A SCREEN: the built-in "type" line is never drawn (it is state only), and the
     first sample after a miss can hold the OLD text with the new kind (the ref moves before React commits), so a sample counts only where the
     hint settled (the next sample, if any, still shows it). Every other tool: any such sample. */
  const undrawnHint = (s, next) => !!s && !!s.hint && !s.domHint && !(oneSentence && (s.hintKind === "type" || (next && next.hint !== s.hint)));
  /* r43: the Hindi and Gujarati pairs by their own layout rule (the runtime keeps their block 12 under the bubble's top) */
  /* class 4 r27: a keyOnly or navDots tool's bubble, as the runtime sizes it (footerBoxes) with its layouts (FIT_KEY: 48 / 44 / 40) */
  const FB = (keyOnly || navDots) && m.footerBoxes ? m.footerBoxes(keyOnly, navDots, m.PHASES.length) : null;
  const fitSpec = FB ? { opts: (keyOnly ? m.FIT_KEY : m.FIT_CLASSIC).hint, iw: FB.bubble.w - 44, hw: FB.bubble.w - 64, maxH: FB.bubble.h - 6, devEm: keyOnly ? m.FIT_KEY.devEm : null } : null;
  const fit = hintRt && oneSentence && FB && m.FIT_KEY && m.FIT_KEY.plain
    ? judgeHintAlone(m, m.TR, { plain: m.FIT_KEY.plain, inkEn: m.FIT_KEY.inkEn, inkDev: m.FIT_KEY.inkDev, devEm: m.FIT_KEY.devEm, devPit: m.FIT_KEY.devPit, bw: FB.bubble.w, bh: FB.bubble.h })
    : hintRt ? judgeHintFit(m, m.TR, { devRule: keyOnly && m.FIT_KEY && m.FIT_KEY.devPit ? devRuleKey(m.FIT_KEY) : /b\.y \+ topOf\b/.test(runtime) ? DEV_RULE : null, spec: fitSpec }) : null;
  const fitMsg = (extra = []) => {
    const f = [...fit.fail, ...extra];
    if (f.length) return ["fail", f.slice(0, 6).join("; ") + (f.length > 6 ? `; +${f.length - 6} more` : "")];
    if (fit.warn.length) return ["warn", fit.warn.slice(0, 6).join("; ") + (fit.warn.length > 6 ? `; +${fit.warn.length - 6} more` : "")];
    if (oneSentence) return ["pass", `${fit.n} hints (every rung a question can show, every step's hint) fit the bubble ALONE (keyOnly, one sentence a screen: a hint replaces the question, so no pair is laid out), in English${m.TR && (Object.keys(m.TR.hi || {}).length || Object.keys(m.TR.gu || {}).length) ? ", Hindi and Gujarati" : ""}; none over 80 characters`];
    return ["pass", `${fit.n} hints (every rung a question can show, every step's hint) fit the bubble under each piece of their instruction, banded, in English${m.TR && (Object.keys(m.TR.hi || {}).length || Object.keys(m.TR.gu || {}).length) ? ", Hindi and Gujarati" : ""}; none over 80 characters`];
  };
  if (fit && !render) { const [lv, msg] = fitMsg(); add("maths", "hint-fit", lv, msg); }
  /* one-page (r35): every instruction and every hint is ONE bubble piece (nothing pages by a timer); English fails, the
     Hindi and Gujarati of the same line warn. Win lines, closing lines, learned and FINISH_LINE are exempt */
  if (silentRt) {
    const one = judgeOnePage(m, m.TR);
    if (one.fail.length) add("maths", "one-page", "fail", one.fail.slice(0, 6).join("; ") + (one.fail.length > 6 ? `; +${one.fail.length - 6} more` : ""));
    else if (one.warn.length) add("maths", "one-page", "warn", one.warn.slice(0, 6).join("; ") + (one.warn.length > 6 ? `; +${one.warn.length - 6} more` : ""));
    else add("maths", "one-page", "pass", `${one.n} instructions and hints (steps' say and hint, questions' say, misses, ladder rungs) are each one bubble page, in English${m.TR && (Object.keys(m.TR.hi || {}).length || Object.keys(m.TR.gu || {}).length) ? ", Hindi and Gujarati" : ""}: nothing pages by a timer`);
    /* tr-coverage: once a tool has begun its TR table, every line it prints has a Hindi and a Gujarati entry (this replaces
       the list the `voice` command used to print; the lesson is silent, so nothing is baked) */
    const lines = printedLines(m, tool, { simpleSummary: summaryRt, closingShown: oneSentence }), tr = trCoverage(lines, m.TR);
    if (!tr.asked) add("maths", "tr-coverage", "info", `not asked: no Hindi or Gujarati entries in a TR table yet (English only, ${lines.length} printed lines)`);
    else ok("maths", "tr-coverage", !tr.missing.hi.length && !tr.missing.gu.length, `all ${lines.length} printed lines have a hi and a gu entry in TR`,
      [tr.missing.hi.length ? trMessage("hi", tr.missing.hi) : "", tr.missing.gu.length ? trMessage("gu", tr.missing.gu) : ""].filter(Boolean).join("; "));
  }
  ok("maths", "hint-ladder", !ladders.length, "every phase: a miss line per item + two ladder rungs (three tries)", `short ladder: ${ladders.join(", ")}`);
  ok("maths", "concept-ids", !ids.length, "concept and objective ids on every phase", `missing: ${ids.join(", ")}`);
  /* the summary page's rows: one "You learned" line per phase, short enough to sit beside its drawing */
  const learnBad = m.PHASES.filter((p) => !/^You learned/.test(p.learned || "") || String(p.learned).length > 72).map((p) => `phase ${p.n}: "${String(p.learned || "").slice(0, 40)}"`);
  ok("maths", "learned-lines", !learnBad.length, "every phase has a 'You learned' line for the summary page (at most 72 characters)", learnBad.join("; "));
  /* exactly three questions a phase, +5 each (user, 2026-09-22: "each phase has 3 questions only") */
  const counts = m.PHASES.map((p) => p.items.length);
  const scoreOk = counts.every((c) => c === 3);
  ok("maths", "score-honesty", scoreOk && m.POINTS === 5, `+${m.POINTS} a question, 3 a phase, so ${m.POINTS * 3} a phase and ${m.POINTS * nItems} in all`, `every phase has exactly three questions and +5 each (questions per phase: ${counts.join(", ")}; points ${m.POINTS})`);
  /* the plan: concept ids must match its phase_map; answers are reported, departures named */
  try {
    const slot = JSON.parse(fs.readFileSync(path.join(dir, "slot.json"), "utf8"));
    const tc = slot.tool_config || {}, map = tc.phase_map || [], q = tc.tool_questions || {};
    const mism = m.PHASES.filter((p, k) => map[k] && map[k].concept_id && map[k].concept_id !== p.conceptId).map((p) => `phase ${p.n}: ${p.conceptId} vs plan ${map[p.n - 1].concept_id}`);
    ok("maths", "plan-concepts", !mism.length && map.length === m.PHASES.length, `phase concept ids equal the plan's phase_map (${map.length} phases)`,
      mism.join("; ") || `plan has ${map.length} phases, tool ${m.PHASES.length}`);
    const cid = (ph) => (map[ph - 1] && map[ph - 1].concept_id) || (m.PHASES[ph - 1] || {}).conceptId;
    const plan = [...((q.learn && q.learn.items) || []).map((x) => ({ phase: +x.phase, qid: `${cid(+x.phase)}:${x.slot}`, ans: x.answer })),
      ...((q.practice && q.practice.items) || []).map((x) => ({ phase: +x.phase, qid: `${cid(+x.phase)}:${x.q_no}`, ans: x.final_answer ?? x.answer }))];
    const norm = (v) => { const n = m.leadNumber(v); return n !== null ? String(n) : String(v || "").trim().toLowerCase(); };
    /* a two-part answer (quotient and remainder) matches when the plan's answer names every part */
    const same = (x, it) => Array.isArray(it.answer) ? it.answer.filter((a) => a !== null && a !== "").every((a) => mentions(String(x.ans || "").replace(/,/g, ""), String(a)))
      : norm(x.ans) === norm(it.answer) || String(x.ans || "").toLowerCase().includes(String(it.answer).toLowerCase());
    const own = [];
    let fromPlan = 0;
    /* an item's plan answer: its own question (by qid, even when it moved to another phase), else any of its phase's */
    for (const p of m.PHASES) p.items.forEach((it, k) => {
      const byId = it.qid && plan.find((x) => x.qid === it.qid);
      if (byId ? same(byId, it) : plan.some((x) => x.phase === p.n && same(x, it))) fromPlan++;
      else own.push(`${p.n}.${k + 1} (${it.kind} ${JSON.stringify(it.answer)})`);
    });
    add("maths", "plan-answers", "info", `${fromPlan} of ${nItems} answers carry a plan answer${own.length ? "; authored here: " + own.join(", ") : ""}`);
    /* question ids: every item that carries one names a real plan question of its own phase, once */
    const valid = new Set(), qBad = [];
    m.PHASES.forEach((p) => {
      ((q.learn && q.learn.items) || []).filter((x) => +x.phase === p.n).forEach((x) => valid.add(`${p.conceptId}:${x.slot}`));
      ((q.practice && q.practice.items) || []).filter((x) => +x.phase === p.n).forEach((x) => valid.add(`${p.conceptId}:${x.q_no}`));
    });
    const used = m.PHASES.flatMap((p) => p.items.map((it) => it.qid).filter(Boolean));
    used.forEach((u) => { if (!valid.has(u)) qBad.push(`${u} is not a question of its phase in the plan`); });
    if (new Set(used).size !== used.length) qBad.push("a question id is used twice");
    ok("maths", "question-ids", !qBad.length, `${used.length} items carry the plan's question id; ${valid.size - used.length} plan questions unused (listed in the sidecar)`, qBad.join("; "));
  } catch (e) { add("maths", "plan-answers", "warn", `could not read slot.json: ${e.message}`); }

  if (!render) return finishReport(dir, id, R, log, { partial: true });

  /* ── render ───────────────────────────────────────────────────────────────────── */
  const html = path.join(dir, `${id}.preview.html`);
  if (!fs.existsSync(html)) throw new Error("no preview yet; run preview first");
  const base = pathToFileURL(html).href;
  const N = m.PHASES.length;
  /* a tool that opts in with `board: true` (runtime r27) is laid out on the board layout: its zones, its answer panel
     and its raster rule differ (comments are stripped first: the skeleton's note about the flag is not the flag) */
  const board = /\bboard\s*:\s*true/.test(tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "")) && caps.board;
  /* r26: a tool with `bigPad: true` has the wider panel: its drawer, slot and pad boxes (and the working area's edge) move left */
  const bigPad = board && !!caps.bigPad && /\bbigPad\s*:\s*true/.test(tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, ""));
  let ZS = board ? (bigPad ? { ...ZONES_BOARD, drawer: { x: 974, y: 198, w: 568, h: 540 }, slot: { x: 980, y: 204, w: 556, h: 122 }, pad: { x: 980, y: 316, w: 556, h: 422 } } : ZONES_BOARD) : ZONES;
  /* class 4 r27 (LAYOUT.md §1d): keyOnly moves the working area up (64, 108, 1472 x 520), the drawer to the working area's height (the
     key on its top row, the answer box under it, the keypad under that; on a card question the keypad takes the box's row), the
     summary into the shorter card (92 to 640) and the bubble down (y 656, 236 tall); navDots puts one dot per phase at the footer's
     right, centred on the bubble, which takes the width the bar freed. The boxes are the runtime's own (ZKEY, footerBoxes) */
  if (FB) {
    const grow = (b, l, t, r, d) => ({ x: b.x - l, y: b.y - t, w: b.w + l + r, h: b.h + t + d });
    const zk = keyOnly ? { ...m.ZKEY, ...(bigPad ? m.ZKEY_BIG : {}) } : null;
    ZS = { ...ZS,
      ...(zk ? { work: { ...zk.work }, drawer: grow(zk.drawer, 6, 4, 12, 8), slot: grow(zk.slot, 16, 14, 24, 16),
        pad: grow({ ...zk.pad, y: zk.slot.y, h: zk.pad.y + zk.pad.h - zk.slot.y }, 16, 8, 24, 16), summary: { ...zk.canvas } } : {}),
      bubble: grow(FB.bubble, 22, 2, 2, 2),
      ...(keyOnly && m.mascotBoxOf ? { voice: grow(m.mascotBoxOf(true), 4, 4, 4, 2) } : {}),
      ...(navDots ? { bar: grow(FB.dots, 6, 6, 6, 6) } : {}) };
  }
  const runs = [];
  for (let n = 1; n <= N; n++) {
    runs.push({ key: `ask${n}`, n, url: `${base}?phase=${n}&muted=1&probe=1&drive=ask`, budget: 40000 });
    runs.push({ key: `wrong${n}`, n, url: `${base}?phase=${n}&muted=1&probe=1&drive=wrong`, budget: 90000 });
    runs.push({ key: `idle${n}`, n, url: `${base}?phase=${n}&muted=1&probe=1&drive=idle`, budget: 180000 });
    runs.push({ key: `agent${n}`, n, url: `${base}?phase=${n}&mode=ai&muted=1&probe=1&drive=agent`, budget: 180000 });
  }
  /* a tool that draws skins: the same first question with every skin removed (props.skins false), to prove the plain
     shapes under the pictures are the whole drawing (the fallback when a picture is missing or fails to decode) */
  if (skinNames.length && hasImages) runs.push({ key: "skins0", n: 1, url: `${base}?phase=1&muted=1&probe=1&drive=ask&noskins=1`, budget: 40000 });
  runs.push({ key: "keys1", n: 1, url: `${base}?phase=1&muted=1&probe=1&drive=keys`, budget: 90000 });
  runs.push({ key: "free", n: N, url: `${base}?phase=${N}&muted=1&probe=1&drive=free`, budget: 260000 });
  runs.push({ key: "again", n: N, url: `${base}?phase=${N}&muted=1&probe=1&drive=again`, budget: 260000 });
  runs.push({ key: "lesson", n: 0, url: `${base}?phase=none&muted=1&probe=1&drive=idle`, budget: 700000 });
  if (!silentRt) {
    /* A VOICED runtime: the scripted speech engine (?fakevoice) proves mute and the blocked-speech cover */
    const vn = N >= 2 ? 2 : 1; /* a phase whose first line is not the demo */
    runs.push({ key: "mute", n: vn, url: `${base}?phase=${vn}&probe=1&fakevoice=1&drive=mute`, budget: 60000 });
    runs.push({ key: "blocked", n: vn, url: `${base}?phase=${vn}&probe=1&fakevoice=blocked&drive=blocked`, budget: 80000 });
  } else {
    /* THE SILENT LESSON (runtime r30): the mute and blocked-speech runs (a scripted speech engine) are retired with the voice.
       The sound button is proved on a short run that starts with the sound effects ON (no ?muted=1). */
    runs.push({ key: "sound", n: 1, url: `${base}?phase=1&probe=1&drive=sound`, budget: 90000 });
  }
  /* GUIDE STEPS (runtime r30): every phase that carries `steps` is opened and walked act by act */
  for (const p of stepPhases) runs.push({ key: `steps${p.n}`, n: p.n, url: `${base}?phase=${p.n}&muted=1&probe=1&drive=steps`, budget: 120000 });
  /* CLASSROOM mode (runtime r22+): a chapter whose pinned runtime has it proves it; one pinned earlier is not asked.
     Phase 1 walks on to phase 2 (or, in a one-phase tool, ends on the summary); the last phase ends on the summary page.
     From r30 the classroom no longer starts muted: these runs carry no ?muted=1, so the sound effects play in them. */
  const hasRoom = caps.classroom;
  if (hasRoom) {
    runs.push({ key: "classroom1", n: 1, classroom: true, url: `${base}?phase=1&classroom=1&probe=1&drive=classroom${summaryRt ? "&simple=1" : ""}`, budget: 300000 });
    if (N > 1) runs.push({ key: "classroomN", n: N, classroom: true, url: `${base}?phase=${N}&classroom=1&probe=1&drive=classroom${summaryRt ? "&simple=1" : ""}`, budget: 300000 });
  }
  /* THE HINT (r34): the first question of phase 1, a miss, 4 s, a second miss, a right answer, without and with a classroom;
     and a classroom's long-line paging (a scripted three-sentence line through toolApi.say) */
  /* THE PHASE PARTY (runtime r39; r38's free play between phases was dropped on the owner's word): the party is proved by
     one motion-on session through every phase (partyInput below); `partyRt` has the Party, so no-free-between-phases is
     asked too (from r38 on, so that a runtime bringing the free play between phases back fails it) */
  const partyRt = caps.party, freeGuardRt = caps.freeGuard;
  /* the header's Hint key (r35): on the first guide-steps phase (else phase 1) */
  const hintKeyRt = caps.hintKey, hkPhase = (stepPhases[0] || m.PHASES[0] || { n: 1 }).n;
  if (hintKeyRt) runs.push({ key: "hintkey", n: hkPhase, url: `${base}?phase=${hkPhase}&muted=1&probe=1&drive=hintkey`, budget: 120000 });
  /* THE r41 FIXES (the C4 tool's visual and play reviews), each asked when the pinned runtime's source has it: a nopark line
     read in a classroom (`pieces`), a real wrong act at a guide step (realWrongInput below), the hint ladder never weaker
     (`ladder`), the bubble's lines clear by their ink in every language (hintFramesInput below), the choose line on a
     choice question (`choiceline`), a phase dot ends the party (partyDotInput below) */
  const piecesRt = /!r\.nopark/.test(runtime), wrongRt = /const demoMiss\b/.test(runtime) && /const workTap\b/.test(runtime);
  const ladderRt = /const kRung\b/.test(runtime), linesRt = /\bconst pit = \(/.test(runtime) && /b\.y \+ topOf\b/.test(runtime), choiceRt = /\bpickIt:/.test(runtime);
  const floorRt = /data-role="work-floor"/.test(runtime);
  const dotRt = /p\.on \? \{ \.\.\.p, on: false \}/.test(runtime);
  const trLangs = ["hi", "gu"].filter((l) => m.TR && m.TR[l] && Object.keys(m.TR[l]).length);
  if (piecesRt && hasRoom) {
    runs.push({ key: "pieces1", n: 1, classroom: true, url: `${base}?phase=1&classroom=1&probe=1&drive=pieces${summaryRt ? "&simple=1" : ""}`, budget: 300000 });
    if (N > 1) runs.push({ key: "piecesN", n: N, classroom: true, url: `${base}?phase=${N}&classroom=1&probe=1&drive=pieces${summaryRt ? "&simple=1" : ""}`, budget: 300000 });
  }
  if (ladderRt && hintKeyRt) runs.push({ key: "ladder", n: 1, url: `${base}?phase=1&muted=1&probe=1&drive=ladder`, budget: 120000 });
  if (choiceRt && board) for (const l of ["en", ...trLangs]) runs.push({ key: `choice-${l}`, n: 1, url: `${base}?phase=1&muted=1&probe=1&drive=choiceline${l === "en" ? "" : "&lang=" + l}`, budget: 160000 });
  if (hintRt) {
    runs.push({ key: "hint1", n: 1, url: `${base}?phase=1&muted=1&probe=1&drive=hint`, budget: 120000 });
    if (hasRoom) {
      runs.push({ key: "hintRoom1", n: 1, classroom: true, url: `${base}?phase=1&classroom=1&probe=1&drive=hint`, budget: 160000 });
      runs.push({ key: "page", n: 1, classroom: true, url: `${base}?phase=1&classroom=1&probe=1&drive=page`, budget: 160000 });
    }
  }
  /* THE PHONE FRAME (the viewer's Mobile, 844 x 390): the same ask / wrong / idle runs of every phase in English, Hindi and Gujarati, in a window
     that size. The stage only scales there (390 / 900), but a line of text measures a little differently at a small pixel size, so the
     layout judges run on what a phone really draws; the keys carry a `phone-` prefix and the English loop below never reads them */
  for (const lang of ["en", ...trLangs]) for (let n = 1; n <= N; n++) for (const [dr, budget] of [["ask", 40000], ["wrong", 90000], ["idle", 180000]])
    runs.push({ key: `phone-${lang}-${dr}${n}`, n, phone: true, url: `${base}?phase=${n}&muted=1&probe=1&drive=${dr}${lang === "en" ? "" : "&lang=" + lang}`, budget, width: PHONE.w, height: PHONE.h });
  const tmp = path.join(dir, ".build");
  fs.mkdirSync(tmp, { recursive: true });
  const shots = [...Array.from({ length: N }, (_, k) => ({ n: k + 1, png: path.join(tmp, `contrast-${k + 1}.png`), drive: "ask", key: `ask${k + 1}` })),
    { n: N, png: path.join(tmp, "contrast-summary.png"), drive: "idle", key: `idle${N}`, budget: 200000 }];
  /* a board tool's question is measured twice, each against a screenshot of its own state: the panel shut (the page as it
     opens) and open (?answer=open, where the slot and the keypad's text is) */
  if (board) for (let k = 0; k < N; k++) shots.push({ n: k + 1, png: path.join(tmp, `contrast-open-${k + 1}.png`), drive: "ask", key: `ask${k + 1}`, open: true });
  log(`  rendering ${runs.length} runs + ${shots.length} screenshots in headless Chrome...`);
  const t0 = Date.now();
  const got = await pool([
    ...runs.map((r) => () => dumpDomAsync(r.url, { budget: r.budget, label: r.key, width: r.width, height: r.height }).then(readDrive)),
    ...shots.map((s) => () => screenshotAsync(`${base}?phase=${s.n}&muted=1&shot=1&drive=${s.drive}${s.open ? "&answer=open" : ""}`, s.png, { budget: s.budget || 40000, label: `shot ${s.key}` })),
  ], Number(process.env.C4_CHROME_POOL) || 4);
  log(`  rendered in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  const t1 = Date.now();
  const fail = (e) => ({ ok: false, detail: "", bad: [String(e && e.message)] });
  /* the point run opens Chrome only for a tool that asks for the key: in a 12-key tool there is nothing
     to press, and every wait for it would run to its timeout. Comments are stripped first: the skeleton's
     own note about pointKey sits in every scaffolded tool */
  const wantsPoint = /pointKey\s*:\s*true/.test(tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, ""));
  /* r24: the thinking pose (a runtime with MASCOT_THINK and its inline picture) and the Answer key's blink (a board tool without cardAnswer) */
  const thinkRt = caps.think && /const MASCOT_THINK: string = "data:image\/webp;base64,/.test(combined);
  const blinkRt = caps.answerBlink && board && !/\bcardAnswer\s*:\s*true/.test(tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, ""));
  /* class 4 r27 (keyOnly): Kiko is 1.45 times as big; the puff must stay in that box and clear of the bubble */
  const mascotKey = keyOnly && m.mascotBoxOf && FB ? { ...m.mascotBoxOf(true), bubbleX: FB.bubble.x } : null;
  /* a question typed on the keypad (not a choice, not answered on the working area): board-panel and pad-shape need one to judge */
  const typedAsk = m.PHASES.some((ph) => ph.items.some((it) => it && !it.choices && it.pad !== "enter"));
  const RI = await realInput({ base, N, poolSize: Math.min(Number(process.env.C4_CHROME_POOL) || 4, 3), point: wantsPoint, board, think: thinkRt, blink: blinkRt, mascotBox: mascotKey, oneSentence, typedAsk }).catch((e) => ({ drag: fail(e), key: fail(e), parts: fail(e), point: fail(e), panel: fail(e) }));
  log(`  real mouse, finger and key input in ${((Date.now() - t1) / 1000).toFixed(0)} s`);
  /* a tool with a start page (runtime r28: StartArt and/or START_HOOK in its source) is asked to prove it */
  const hasStart = /\b(StartArt|START_HOOK)\b/.test(tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "")) && caps.startPage;
  /* the line Start must bring onto the bubble (phase 1): its first guide step, else the first teach line (the opening,
     then the teach), else the first question; as printed, its first piece */
  const P1 = m.PHASES[0] || {}, it1 = (P1.items || [])[0] || {};
  const firstLine = stepSays(P1)[0] || [...(m.OPENING || []), ...(P1.says || [])].find(Boolean) || it1.say || it1.ask || "";
  /* the reset key goes back to the start page from r32 (`backToStart`): a runtime with it is asked to prove it */
  const SP = hasStart ? await startPageInput({ base, poolSize: Math.min(Number(process.env.C4_CHROME_POOL) || 4, 3), first: bubblePieces(firstLine, m)[0] || "",
    backToStart: caps.backToStart, silent: silentRt, defaultTheme: caps.defaultTheme }).catch((e) => ({ ok: false, bad: [String(e && e.message)], detail: "" })) : null;
  /* guide steps by a real mouse: one click on the first step's control of each steps phase moves it on (2026-10-08) */
  const SC = stepPhases.length ? await stepClickInput({ base, phases: stepPhases.map((p) => p.n), poolSize: Math.min(Number(process.env.C4_CHROME_POOL) || 4, 3) })
    .catch((e) => ({ rows: [], bad: [String(e && e.message)], notes: [] })) : null;
  /* the phase party (r39), with motion on, through every phase of one user-mode mount */
  const PR = partyRt ? await partyInput({ base }).catch((e) => ({ error: String(e && e.message) })) : null;
  /* r48: a tool that opts in with `nextKey: true` waits for its Next key between questions and phases (nothing moves by itself);
     the scripted runs above keep the timers (props.autoNext), so this one run proves the key, with real mouse and keys */
  const toolPlain = tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
  const wantsNextKey = /\bnextKey\s*:\s*true/.test(toolPlain), nextKeyRt = /const nextKeyOn\b/.test(runtime);
  const NK = wantsNextKey && nextKeyRt ? await nextKeyInput({ base, N }).catch((e) => [{ error: String(e && e.message) }]) : null;
  /* r49: a tool with `cardAnswer: true` is answered ON its cards (and Yes / No in the question bar); one real-input session proves it */
  const wantsCard = /\bcardAnswer\s*:\s*true/.test(toolPlain), cardRt = /const cardAnswerOn\b/.test(runtime);
  const CA = wantsCard && cardRt && board ? await cardAnswerInput({ base }).catch((e) => ({ error: String(e && e.message) })) : null;
  /* r41: a real wrong act at every guide step (an inert click on the working area, a digit key); the bubble's lines by their
     ink, every phase, in English and each language TR has begun; a phase dot pressed while the party is on */
  const cdpPool = Math.min(Number(process.env.C4_CHROME_POOL) || 4, 3);
  const RW = wrongRt && stepPhases.length ? await realWrongInput({ base, phases: stepPhases.map((p) => p.n), poolSize: cdpPool, floor: floorRt })
    .catch((e) => [{ n: stepPhases[0].n, how: "click", error: String(e && e.message) }]) : null;
  const HF = linesRt && hintRt ? await hintFramesInput({ base, N, outDir: tmp, langs: ["en", ...trLangs], poolSize: cdpPool })
    .catch((e) => [{ lang: "en", error: String(e && e.message) }]) : null;
  const PD = dotRt && partyRt && N > 1 ? await partyDotInput({ base }).catch((e) => ({ error: String(e && e.message) })) : null;
  /* class 4 r27: each nav dot reaches its phase, by a real click, in user and AI mode */
  const ND = navDots ? await navDotsInput({ base, N }).catch((e) => [{ mode: "user", error: String(e && e.message) }]) : null;
  /* 2026-10-16 (action-anim): a tool whose source calls api.act, on a runtime that has it: one act through its own control, motion on and reduced */
  const AA = caps.act && /\bapi\.act\s*\(/.test(toolPlain) ? await actionAnimInput({ base, N }).catch((e) => ({ error: String(e && e.message) })) : null;
  /* 2026-10-16 (font-kit): a tool built with the FONT KIT draws its text in the kit's own Poppins, on a Chrome with no Poppins of its own */
  const FK = caps.fontKit && /const FONT_KIT\b/.test(combined) ? await fontKitInput({ base }).catch((e) => ({ error: String(e && e.message) })) : null;
  /* r44: the simple summary page, in en, hi and gu, and in an English classroom */
  /* r24 (summary-thumbs): a runtime whose result.last carries the item object, and a tool that gives a Thumb: the summary session also
     answers every phase's last question right and reads each row's thumbnail */
  const thumbsAsked = summaryRt && caps.lastIt && /\bThumb\b/.test(toolPlain);
  const lastSteps = (() => { let a = 0; return m.PHASES.map((p) => { const c = Math.max((p.items || []).length, 1), t = a + c - 1; a += c; return t; }); })();
  /* ONE SENTENCE A SCREEN: the bubble holds one sentence, frame by frame, in a real DevTools session per phase (and phase 1 in hi and gu) */
  const OL = oneSentence ? await oneLineInput({ base, N, langs: trLangs, nextKey: wantsNextKey && nextKeyRt, poolSize: cdpPool }).catch((e) => [{ phase: 1, lang: "en", error: String(e && e.message) }]) : null;
  const SS = summaryRt ? await summaryInput({ base, N, outDir: tmp, poolSize: cdpPool, lastSteps: thumbsAsked ? lastSteps : null }).catch((e) => [{ lang: "en", error: String(e && e.message) }]) : null;
  const D = {};
  runs.forEach((r, k) => { D[r.key] = got[k].ok ? got[k].value : { error: String(got[k].error && got[k].error.message) }; });
  const failedRuns = runs.filter((r) => !D[r.key] || D[r.key].error);
  ok("render", "runs", !failedRuns.length, `${runs.length} scripted runs completed`, `no result from: ${failedRuns.map((r) => `${r.key} ${D[r.key] && D[r.key].error ? "(" + D[r.key].error + ")" : ""}`).join(", ")}`);

  const overlaps = [], spills = [], offStage = [], small = [], fingers = [], crowd = [], words = [], mode = [], picture = [], phaseBar = [], padBad = [];
  const boardFit = [], skinBad = [];
  const scaleFrames = [];   /* r26: the ask frames with the panel open, for picture-scale */
  const padSeen = { enter: 0, typed: 0 };
  let pulses = 0, rasters = [], emoji = [], still = [], focus = true, colours = 0, skinCount = 0;
  for (let n = 1; n <= N; n++) {
    /* a board tool's question is sampled twice: the answer panel shut (the picture at its widest) and open */
    const frames = [];
    for (const key of [`ask${n}`, `wrong${n}`, `idle${n}`, `agent${n}`]) {
      const d = D[key];
      if (d && d.geometryShut) frames.push({ key, d, g: d.geometryShut, shut: true });
      frames.push({ key, d, g: d && d.geometry, shut: false });
    }
    for (const { key, d, g, shut } of frames) {
      if (!g) continue;
      const tag = shut ? `${key} (panel shut)` : `${key}`;
      /* the layout judges (layoutfit.mjs, shared with approve): overlap, zone spill, off the stage, type floor, finger boxes, crowding */
      const L = layoutProblems(g, { ZS, tag });
      overlaps.push(...L.overlaps); spills.push(...L.spills); offStage.push(...L.offStage); small.push(...L.small); fingers.push(...L.fingers); crowd.push(...L.crowd);
      /* picture-scale (r26): the ASK frame with the answer panel open is the reading frame: a picture of one or two small things is scaled up */
      if (board && !shut && key.startsWith("ask") && g.controls.some((c) => c.zone === "pad")) scaleFrames.push({ tag: `phase ${n} ask`, g });
      /* class 4 r27 (keyOnly): no picture element under the key's corner (KEY_CORNER, the Answer / Next key's) or under any key drawn
         there just now (the choice keys are wider), in every frame, the panel shut or open */
      if (keyOnly && m.KEY_CORNER) {
        const kc = m.KEY_CORNER, areas = [{ what: "the key's corner", b: kc }, ...g.controls.filter((c) => c.zone === "ask").map((c) => ({ what: `the ${c.id} key`, b: { x: c.box.x - 6, y: c.box.y - 6, w: c.box.w + 12, h: c.box.h + 12 } }))];
        for (const a of areas) {
          for (const sh of g.shapes) if (sh.zone === "work" && inter(sh.box, a.b) > 4) { boardFit.push(`${tag}: ${sh.tag} ${fmt(sh.box)} runs under ${a.what} ${fmt(a.b)}`); break; }
          for (const t of g.texts) { const b = t.ink || t.box; if (t.zone === "work" && inter(b, a.b) > 4) { boardFit.push(`${tag}: "${t.text.slice(0, 16)}" ${fmt(b)} runs under ${a.what} ${fmt(a.b)}`); break; } }
        }
      }
      /* board layout, panel open: the picture must have rearranged into the room that is left, never run under the panel */
      if (board && !shut && g.controls.some((c) => c.zone === "pad")) {
        const edge = ZS.drawer.x - 4;
        for (const s of g.shapes) if (s.zone === "work" && s.box.x + s.box.w > edge) boardFit.push(`${tag}: ${s.tag} ends at ${Math.round(s.box.x + s.box.w)}, the panel starts at ${ZS.drawer.x}`);
        for (const t of g.texts) { const b = t.ink || t.box; if (t.zone === "work" && b.x + b.w > edge) boardFit.push(`${tag}: "${t.text.slice(0, 16)}" ends at ${Math.round(b.x + b.w)}, the panel starts at ${ZS.drawer.x}`); }
      }
      if (!shut && /^(ask|wrong)/.test(key) && d.api) {
        const ph = m.PHASES[d.api.phase - 1], r = padShapeProblems({ item: ph && ph.items[d.api.item - 1], padTo: d.api.padTo, controls: g.controls, tag });
        if (r.kind) padSeen[r.kind]++;
        padBad.push(...r.bad);
      }
      pulses = Math.max(pulses, g.pulses);
      /* a SKIN (the runtime's <Skin>: a generated picture of the object a tool shares out, docs/IMAGES.md) is allowed, but
         only on the working area and only a few; the mascot is the only other picture */
      rasters.push(...g.images.filter((im) => im.role !== "mascot" && im.role !== "skin" && im.role !== "act").map((im) => `${tag}: ${fmt(im.box)}`));   /* act: an ACTION KIT tool in flight (api.act) */
      const skins = g.images.filter((im) => im.role === "skin");
      skinCount = Math.max(skinCount, skins.length);
      skins.forEach((im) => { if (!inside(im.box, ZS.work)) skinBad.push(`${tag}: a skin ${fmt(im.box)} is outside the working area`); });
      emoji.push(...g.texts.filter((t) => EMOJI.test(t.text)).map((t) => `${tag}: ${t.text}`));
      still.push(...g.anims.filter((a) => a.infinite).map((a) => `${tag}: ${a.name || a.cls}`));
      focus = focus && g.focusRule;
      for (const t of g.texts.filter((x) => x.zone === "work" && !x.reading && !x.control && !x.part))
        if (t.text.split(/\s+/).length > 4) words.push(`${tag}: "${t.text.slice(0, 40)}"`);
      const content = new Set(g.colors.filter((c) => c.zone === "work").map((c) => parseRgb(c.c)).filter(Boolean)
        .map((c) => hueOf(c)).filter((h) => h.s > 0.45 && h.l > 0.2 && h.l < 0.8).map((h) => Math.round(h.h / 30)));
      colours = Math.max(colours, content.size);
      /* the picture is the number: the chart's digits and the running count equal the state */
      const v = d.state && d.state.value;
      if (typeof v === "number" && (key.startsWith("ask") || key.startsWith("idle"))) {
        const digits = g.texts.filter((t) => t.zone === "work" && !t.part && /^\d$/.test(t.text) && t.size >= 55).sort((a, b) => a.box.x - b.box.x).map((t) => t.text).join("");
        const run = g.texts.filter((t) => t.zone === "runs" && t.size >= 40 && !t.part).map((t) => t.text.replace(/,/g, ""))[0];
        if (digits && Number(digits) !== v) picture.push(`${tag}: chart reads ${digits}, state ${v}`);
        if (run !== undefined && Number(run) !== v) picture.push(`${tag}: running count ${run}, state ${v}`);
      }
      if (shut) continue;
      const dots = g.dots || [];
      /* class 4 r27 (navDots): the dots are controls in user AND AI mode */
      if (navDots) {
        if (dots.length !== N || dots.some((x, k) => x.role !== "button" || x.tab !== "0" || x.label !== `Step ${k + 1} of ${N}`)
          || dots.filter((x) => x.current === "step").length !== 1) mode.push(`${tag}: nav dots must be ${N} labelled buttons, one current, in either mode`);
      } else if (key.startsWith("agent")) {
        if (g.mode !== "ai" || dots.length !== N || dots.some((x) => x.role !== "img" || x.tab !== null)) mode.push(`${tag}: AI mode dots must be pictures only`);
      } else if (g.mode !== "user" || dots.length !== N || dots.some((x, k) => x.role !== "button" || x.tab !== "0" || x.label !== `Step ${k + 1} of ${N}`)
        || dots.filter((x) => x.current === "step").length !== 1) mode.push(`${tag}: user mode dots must be ${N} labelled buttons, one current`);
      /* the phase bar: earlier phases finished, the current one filled a part per question as each starts
         (ask and wrong are question 1; the last phase's idle and agent runs end on its last question; a
         phase before the last has walked on, so its idle and agent runs end on the next phase's question 1),
         later ones empty */
      const cur = (d.api && d.api.phase) || n, walked = cur !== n;
      const qs = Math.max(m.PHASES[cur - 1].items.length, 1), want = /^(ask|wrong)/.test(key) || walked ? 1 / qs : 1;
      dots.forEach((x, k) => {
        const st = k < cur - 1 ? "done" : k === cur - 1 ? "now" : "later";
        if (x.state !== st) phaseBar.push(`${tag}: phase ${k + 1} ${navDots ? "dot" : "segment"} shows "${x.state}", want "${st}"`);
        else if (!navDots && k === cur - 1 && (Math.abs(x.fill - want) > 0.01 || (want >= 0.2 && Math.abs(x.drawn - want) > 0.03)))
          phaseBar.push(`${tag}: current segment ${Math.round(x.drawn * 100)}% drawn (set ${Math.round(x.fill * 100)}%), want ${Math.round(want * 100)}%`);
      });
    }
  }
  /* the phone runs: the same judges on every frame read at 844 x 390 (the six lists below take them too), kept for the phone rows */
  const phoneFrames = [];
  for (const r of runs.filter((x) => x.phone)) {
    const d = D[r.key];
    for (const [g, shut] of [[d && d.geometryShut, true], [d && d.geometry, false]]) {
      if (!g) continue;
      const tag = `${r.key.slice(6)} [phone${shut ? ", panel shut" : ""}]`;
      const L = layoutProblems(g, { ZS, tag });
      overlaps.push(...L.overlaps); spills.push(...L.spills); offStage.push(...L.offStage); small.push(...L.small); fingers.push(...L.fingers); crowd.push(...L.crowd);
      phoneFrames.push({ tag, g });
    }
  }
  const cap = (a) => a.slice(0, 6).join("; ") + (a.length > 6 ? `; +${a.length - 6} more` : "");
  ok("render", "no-overlap", !overlaps.length, "no text overlaps another, in any phase or state (English on the stage; English, Hindi and Gujarati on a phone)", cap(overlaps));
  ok("render", "zones", !spills.length, `everything stays inside its zone (work, runs, slot, pad, bubble, bar, voice, header)${keyOnly ? "; keyOnly: the working area 64, 108, 1472 x 520, the drawer 108 to 628" : ""}${navDots ? "; navDots: the dots at the footer's right" : ""}`, cap(spills));
  ok("render", "on-stage", !offStage.length, "nothing leaves the 1600x900 stage", cap(offStage));
  ok("render", "type-floor", !small.length, "no rendered text below 28 stage units", cap(small));
  ok("render", "finger-boxes", !fingers.length, "every live control is a labelled, focusable button at least 72x72", cap(fingers));
  ok("render", "no-crowding", !crowd.length, "no two live finger boxes overlap", cap(crowd));
  /* the phone rows: what only a real 844 x 390 window can say (layoutfit.mjs phoneProblems) */
  if (phoneFrames.length) {
    const P = phoneProblems(phoneFrames), langs = ["en", ...trLangs].join(", ");
    ok("render", "phone-frame", !P.frame.length, `at ${PHONE.w}x${PHONE.h} (a phone) the window is that size, the page does not scroll and the stage's 16:9 frame lies wholly in it, drawn at ${P.scale}`, cap(P.frame));
    ok("render", "phone-type", !P.type.length, `the smallest text on the phone is ${P.minText ? P.minText.px.toFixed(1) : "?"} px (at least ${PHONE_TEXT_PX}), in ${langs}`, cap(P.type));
    if (P.minTap) add("render", "phone-tap", "info", `the smallest live control on the phone is ${Math.round(P.minTap.px)} px (${P.minTap.id}): the finger floor of 72 stage units, drawn at ${P.scale}`);
  }
  /* keyOnly + board (2026-10-17): a working-area question's Enter stands in the key's corner, not the pad zone, so a tool with no
     typed question at all (every item a choice or pad "enter") has nothing to sample here */
  if (!padSeen.enter && !padSeen.typed && (keyOnly && board ? typedAsk : m.PHASES.some((ph) => ph.items[0] && !ph.items[0].choices)))
    padBad.push("nothing was sampled: no ask or wrong run showed the pad zone's keys, so the check saw nothing (a check that samples nothing is not a pass)");
  ok("render", "pad-shape", !padBad.length, `a working-area question draws only Enter, a typed one all twelve keys (sampled ${padSeen.enter} working-area, ${padSeen.typed} typed)`, cap(padBad));
  ok("render", "one-invite", pulses <= 1, "at most one pulsing invite at a time", `${pulses} pulsing at once`);
  ok("render", "no-raster", !rasters.length, silentRt ? "no pictures except the mascot (and the object skins of docs/IMAGES.md)" : "no pictures except the mascot", cap(rasters));
  if (skinCount || skinBad.length) ok("render", "skins", !skinBad.length && skinCount <= 40, `${skinCount} skin(s) at most on a screen, all on the working area`, cap(skinBad.length ? skinBad : [`${skinCount} skins on one screen: one picture reused, clipped, is what keeps a tool small`]));
  if (D.skins0 && D.skins0.geometry && D.ask1 && D.ask1.geometry) {
    const plain = (d) => d.geometry.shapes.filter((s) => s.zone === "work" && s.tag !== "image").length;
    const a = plain(D.ask1), b = plain(D.skins0), left = D.skins0.geometry.images.filter((im) => im.role === "skin").length;
    ok("render", "skins-fallback", a === b && a > 0 && !left, `with every skin removed the same ${a} plain shapes still draw: the picture is a look, the plain drawing stands on its own`,
      `with skins the first question draws ${a} plain shapes, with none ${b} (skins still drawn: ${left}): what is under the pictures must be the whole drawing`);
  }
  if (board && caps.bigPad) { const ps = judgePictureScale(scaleFrames, { workW: bigPad ? 900 : 1086, workH: ZS.work.h, workY: ZS.work.y }); ok("render", "picture-scale", !ps.length, PICTURE_SCALE_DETAIL, cap(ps), "warn"); }
  if (board) ok("render", "board-fit", !boardFit.length, `board layout: with the answer panel open, nothing of the working area runs under it${keyOnly ? "; keyOnly: in every frame nothing of it runs under the key's corner (x 1254 to 1536, y 108 to 196: Work's box.key) or a key drawn there" : ""}`, cap(boardFit));
  ok("render", "no-emoji", !emoji.length, "no emoji", cap(emoji));
  ok("render", "stillness", !still.length, "still under reduced motion (no endless animation)", cap(still));
  ok("render", "focus-visible", focus, "keyboard focus ring present on the page", "no :focus-visible rule on the page");
  ok("render", "labels-short", !words.length, "working area has labels, not sentences (max 4 words)", cap(words), "warn");
  ok("render", "colour-budget", colours <= 5, `content hues on the working area: ${colours}`, `${colours} content hues on the working area at once`, "warn");
  ok("render", "picture-is-number", !picture.length, "the chart's digits and the running count always equal the tool's own value", cap(picture));
  ok("render", "phase-bar", !phaseBar.length, navDots ? "nav dots (r27): earlier phases done, the current one now, later ones later (no fill: a dot does not fill a part per question)" : "the current phase segment fills a part per question (question 1 of 3 a third, the last full); earlier phases finished, later empty", cap(phaseBar));
  ok("render", "modes", !mode.length, navDots ? "nav dots (r27): the dots are buttons \"Step k of N\", one current, in user AND AI mode" : "user mode: phase dots are buttons; AI mode: progress only", cap(mode));

  /* behaviour, per phase */
  const bad = { wrong: [], finished: [], agent: [], api: [], probe: [], mute: [], mascot: [], hint: [], fitDrawn: [] };
  const unshown = [], unjudged = [];
  for (let n = 1; n <= N; n++) {
    const P = m.PHASES[n - 1], w = D[`wrong${n}`], idle = D[`idle${n}`], ag = D[`agent${n}`];
    if (w && w.log && w.log[0]) {
      const L = w.log[0];
      /* a SILENT runtime: the hint is on the bubble at once (r30), under the pinned instruction and unchanged 4 s later
         (r34: hint-pinned). A voiced runtime speaks its rung instead: no such rows. */
      if (silentRt) {
        const itW = P.items[L.item ?? 0] || P.items[0];
        if (hintRt) bad.hint.push(...judgeHintPinned(L.pin, P, itW, m, `phase ${n}`));
        else bad.hint.push(...judgeHintOnMiss(L.pin ? { nearMiss: L.nearMiss, timeline: L.pin.timeline } : L, P, itW, m));
        if (hintRt && L.pin) for (const [k, s] of (L.pin.timeline || []).entries()) if (undrawnHint(s, L.pin.timeline[k + 1])) { bad.fitDrawn.push(`phase ${n}: a hint in getState() was not drawn (${String(s.hint).slice(0, 40)})`); break; }
      }
      if (!L.typedKept) bad.wrong.push(`${n}: the typed answer was cleared`);
      if (!L.sameItem) bad.wrong.push(`${n}: a miss moved to another question`);
      if (L.stage !== "ask") bad.wrong.push(`${n}: not answerable again after the traceback (${L.stage})`);
      const g = w.geometry;
      if (g) {
        const reds = g.colors.filter((c) => ["work", "slot", "pad"].includes(c.zone) && c.o > 0.2 && isRed(parseRgb(c.c) || [0, 0, 0]));
        if (reds.length) bad.wrong.push(`${n}: red on screen after a miss (${reds[0].c})`);
        // the header's concept name is the plan's own words (e.g. "When rounding a number would be wrong"), not a mark
        const concepts = new Set(m.PHASES.map((p) => String(p.concept || "").trim()));
        const x = g.texts.filter((t) => marks(t.text) && !(t.zone === "header" && concepts.has(t.text)));
        if (x.length) bad.wrong.push(`${n}: "${x[0].text}" after a miss`);
        /* the correction ends on the whole right answer (as a number, a comma form, or a row of digit cards) */
        const sk = String(L.key ?? "").replace(/,/g, "");
        const area = g.texts.filter((t) => ["work", "runs"].includes(t.zone) && !t.part);
        if (Array.isArray(L.key)) {
          /* a two-part answer: the correction shows every part (the quotient and the remainder) */
          /* a mixed number's empty part (null) has nothing to show */
          const lost = L.key.filter((x) => x !== null && x !== "").filter((x) => !area.some((t) => [String(x), m.indian(+x)].some((f) => mentions(t.text, f))));
          if (lost.length) unshown.push(`${n}: ${L.key.join(" and ")} (no ${lost.join(", ")})`);
        } else if (/^\d+$/.test(sk) || /^\d*\.\d+$/.test(sk)) {
          /* a decimal ("0.09") is shown in its written form, or as a row of digit cards and a point card */
          const dec = sk.includes(".");
          const forms = dec ? [sk] : [sk, m.indian(+sk)];
          const rows = {};
          area.filter((t) => (dec ? /^[\d.]$/ : /^\d$/).test(t.text)).forEach((t) => { const k = Math.round((t.box.y + t.box.h / 2) / 30); (rows[k] = rows[k] || []).push(t); });
          const rowNums = Object.values(rows).map((r) => r.sort((a, b) => a.box.x - b.box.x).map((t) => t.text).join(""));
          if (!area.some((t) => forms.some((f) => mentions(t.text, f))) && !rowNums.includes(sk)) unshown.push(`${n}: ${dec ? sk : m.indian(+sk)}`);
        } else unjudged.push(n);
      }
    } else bad.wrong.push(`${n}: no wrong-answer run`);
    /* a phase before the last walks on to the next one by itself, with no `finished`; the last phase
       sends it once, from the summary page */
    const walks = n < N;
    const want = { phase: n, conceptId: P.conceptId, score: P.items.length * 5, maxScoreThisPhase: P.items.length * 5, correctFirstTry: P.items.length, itemsAnswered: P.items.length, stars: 3, doneId: m.MEDIA_ID + ".DONE" };
    const ev = (idle && idle.events) || [];
    const walkedIdle = idle && idle.log && idle.log.find((x) => "walked" in x);
    if (walks) {
      if (ev.length) bad.finished.push(`${n}: finished fired before the last phase (${ev.length} times)`);
      if (idle && !(walkedIdle && walkedIdle.walked)) bad.finished.push(`${n}: did not walk on to phase ${n + 1} after its last question`);
    } else if (ev.length !== 1) bad.finished.push(`${n}: finished fired ${ev.length} times`);
    else for (const [k, v] of Object.entries(want)) if (ev[0][k] !== v) bad.finished.push(`${n}: ${k} = ${JSON.stringify(ev[0][k])}, want ${JSON.stringify(v)}`);
    const qd = ((idle && idle.all) || []).filter((e) => e.name === "question_done").length;
    if (idle && qd !== P.items.length) bad.finished.push(`${n}: question_done fired ${qd} times`);
    const aev = (ag && ag.events) || [];
    const walkedAg = ag && ag.log && ag.log.find((x) => "walked" in x);
    if (walks) {
      if (aev.length) bad.agent.push(`${n}: finished before the last phase`);
      if (ag && !(walkedAg && walkedAg.walked)) bad.agent.push(`${n}: the agent's phase did not walk on to phase ${n + 1}`);
    } else if (aev.length !== 1) bad.agent.push(`${n}: toolApi alone finished ${aev.length} times`);
    const ln = ag && ag.log && ag.log.find((x) => "lastNext" in x);
    if (ln && ln.lastNext !== false) bad.agent.push(`${n}: next() after the last right answer returned ${JSON.stringify(ln.lastNext)} (the tool moves on by itself)`);
    if (ag && ag.log && ag.log.some((x) => x.shownBefore !== null && x.shownBefore !== undefined)) bad.agent.push(`${n}: getState() showed an answer before it was given`);
    if (ag && ag.api && ag.api.mode !== "ai") bad.agent.push(`${n}: getState().mode = ${ag.api.mode}`);
    for (const d of [D[`ask${n}`], w, idle, ag]) {
      if (!d || !d.probe) continue;
      const p = d.probe, t = d.drive + n;
      if (p.errors.length) bad.probe.push(`${t}: ${p.errors[0]}`);
      if (p.console.length) bad.probe.push(`${t}: ${p.console[0]}`);
      if (p.network.length) bad.probe.push(`${t}: network ${p.network[0]}`);
      if (p.storage.length) bad.probe.push(`${t}: storage ${p.storage[0]}`);
      if (!silentRt && (p.speak || p.audio)) bad.mute.push(`${t}: muted, yet ${p.speak} speech + ${p.audio} audio calls`);
      if (d.state && d.state.mascot !== "image") bad.mascot.push(`${t}: mascot rung ${d.state.mascot}`);
    }
  }
  const ag1 = Array.from({ length: N }, (_, k) => D[`agent${k + 1}`]).find((d) => d && d.apiKeys) || D.agent1;
  const want = [...(m.TOOL_API || [])].sort().join(",");
  if (!ag1 || [...(ag1.apiKeys || [])].sort().join(",") !== want) bad.api.push(`toolApi verbs: ${ag1 ? (ag1.apiKeys || []).join(",") : "none"}`);
  if (ag1 && !ag1.apiAlias) bad.api.push(`window.${m.TOOL_ID} alias missing`);
  const need = ["toolId", "mediaId", "mode", "phase", "conceptId", "step", "item", "stage", "question", "typed", "score", "maxScore", "complete", "answerShown"];
  if (ag1 && ag1.api) { const miss = need.filter((k) => !(k in ag1.api)); if (miss.length) bad.api.push(`getState() lacks ${miss.join(", ")}`); }
  ok("render", "miss-shows-answer", !unshown.length, `after a miss the correction ends on the whole right answer${unjudged.length ? ` (phase ${unjudged.join(", ")}: not a number, judged at review)` : ""}`,
    `after the correction the right answer is not on the working area: ${unshown.join("; ")}`, "warn");
  ok("render", "wrong-is-unmarked", !bad.wrong.length, "a miss is never marked (no red, no cross), keeps the child's answer and the question, and re-opens", cap(bad.wrong));
  if (hintRt) {
    /* the whole sequence on phase 1's first question, without and with a classroom: a second miss, then a right answer */
    const P1h = m.PHASES[0];
    for (const key of ["hint1", "hintRoom1"]) {
      const d = D[key];
      if (!d) continue;
      const r = d.log && d.log[0];
      if (!r) { bad.hint.push(`${key}: no result${d.error ? " (" + d.error + ")" : ""}`); continue; }
      bad.hint.push(...judgeHintPinned(r, P1h, P1h.items[r.item ?? 0] || P1h.items[0], m, key === "hint1" ? "phase 1 (second miss, right answer)" : "phase 1, classroom"));
      if (d.probe && d.probe.errors.length) bad.hint.push(`${key}: ${d.probe.errors[0]}`);
    }
    ok("render", "hint-pinned", !bad.hint.length, oneSentence ? "keyOnly, one sentence a screen: after a miss the hint shows within 700 ms ALONE on the bubble, REPLACING the question (getState().instruction stays the question's line, getState().hint is the rung as printed, the bubble draws the hint role only, never the question beside it, the child's answer stays), it is the same 4 s later, a second miss brings the next rung, a right answer clears it; every phase, and phase 1 in a classroom too" : `after a miss the hint shows within 700 ms UNDER the pinned instruction (getState().instruction stays the question's line, getState().hint is the rung as printed, the bubble draws both roles with the same text, the child's answer stays), it is the same 4 s later, a second miss brings the next rung, a right answer clears it; every phase, and phase 1 in a classroom too`, cap(bad.hint));
  } else if (silentRt) ok("render", "hint-on-miss", !bad.hint.length, `after a miss the bubble shows the hint within 700 ms (the item's miss line, else the ladder's first rung), with the child's answer still in the slot, and the hint is never the question's own line (${N} phase${N === 1 ? "" : "s"})`, cap(bad.hint));
  if (fit) {
    /* hint-fit, source and render: what the runs drew (a hint in getState() must be drawn in the bubble) */
    for (const key of ["hint1", "hintRoom1", ...stepPhases.map((p) => `steps${p.n}`)]) {
      const r = D[key] && D[key].log && D[key].log[0];
      if (!r) continue;
      const tl = r.timeline || [], shots = [r.after4s, r.miss2, r.outOfOrder && typeof r.outOfOrder === "object" ? r.outOfOrder : null].filter(Boolean);
      if (tl.some((s, k) => undrawnHint(s, tl[k + 1])) || shots.some((s) => undrawnHint(s))) bad.fitDrawn.push(`${key}: a hint in getState() was not drawn in the bubble`);
    }
    const [lv, msg] = fitMsg(bad.fitDrawn);
    add("render", "hint-fit", lv, msg);
  }
  if (hintKeyRt) {
    const d = D.hintkey, r = d && d.log && d.log[0];
    const Pk = m.PHASES[hkPhase - 1] || m.PHASES[0];
    const hkBad = !r ? [`no hint-key run${d && d.error ? " (" + d.error + ")" : ""}`]
      : judgeHintKey(r, Pk, (Pk.items || [])[r.item ?? 0] || Pk.items[0], m, Array.isArray(Pk.steps) && Pk.steps.length ? Pk : null);
    if (d && d.probe && d.probe.errors.length) hkBad.push(d.probe.errors[0]);
    ok("render", "hint-key", !hkBad.length, `the header's Hint key (phase ${hkPhase}) reads "Hint" with a 72 x 72 finger box; ${Array.isArray(Pk.steps) && Pk.steps.length ? "at a guide step it shows the step's hint and moves nothing; " : ""}at an open question nothing shows until it is pressed, the first press shows the first rung and the second the stronger one (getState().hint follows), a right answer clears it; with nothing to hint a press changes no state`, cap(hkBad));
  }
  if (D.ladder) {
    const r = D.ladder.log && D.ladder.log[0], P1l = m.PHASES[((r && r.phase) || 1) - 1] || m.PHASES[0];
    const lb = !r ? [`no hint-ladder run${D.ladder.error ? " (" + D.ladder.error + ")" : ""}`] : judgeLadderMonotonic(r, P1l, (P1l.items || [])[r.item ?? 0] || P1l.items[0], m);
    ok("render", "hint-ladder-monotonic", !lb.length, `the hint never gets weaker: at an open question of phase ${(r && r.phase) || 1} the Hint key twice (the first rung, then the stronger one), then a wrong answer: the hint stays on the rung shown or a stronger one, never the miss line again`, cap(lb));
  }
  if (HF) {
    const hl = judgeHintLines(HF);
    const alone = HF.filter((f) => f.alone).map((f) => `${f.lang} phase ${f.phase} ${f.kind}`);
    ok("render", "hint-lines-clear", !hl.bad.length, `${oneSentence ? "keyOnly, one sentence a screen (the hint REPLACES the question, so each frame is one block of the hint's lines): " : ""}the bubble's lines with a hint, by their INK on a screenshot (${hl.n} frames: every phase's wrong answer and wrong step, in ${["en", ...trLangs].join(", ")}${alone.length ? `; ${alone.length} drew the hint alone, no layout fitting the pair (see hint-fit): ${alone.slice(0, 4).join(", ")}${alone.length > 4 ? " …" : ""}` : ""}): consecutive lines never touch (2 clear units at least), no line touches the bubble's outline (2 units), the block has 6 units of the bubble to spare`, cap(hl.bad));
  }
  const chRuns = Object.keys(D).filter((k) => /^choice-/.test(k));
  if (chRuns.length) {
    const recs = chRuns.map((k) => (D[k].log && D[k].log[0]) || { lang: k.slice(7), error: D[k].error || "no result" });
    const cl = judgeChoiceLine(recs, m.UI_STRINGS || {}, { oneSentence });
    if (!cl.bad.length && cl.notes.length && recs.every((r) => !r.found || !r.answerKey)) add("render", "choice-answer-line", "info", `not asked: ${cl.notes.join("; ")}`);
    else ok("render", "choice-answer-line", !cl.bad.length, oneSentence ? `keyOnly, one sentence a screen: on a choice question the Answer key brings UI.pickIt into getState().hint (never "type your answer"; in ${recs.map((r) => r.lang).join(", ")}) and the bubble keeps the question: the built-in line is not drawn, the blinking keys are the cue${cl.notes.length ? " (" + cl.notes.join("; ") + ")" : ""}` : `on a choice question the choose line (UI.pickIt, never "type your answer"; brought by the Answer key, or up at the open when the choices are keys in the question bar) in the neutral band, whose colours are not the hint's accent (in ${recs.map((r) => r.lang).join(", ")})${cl.notes.length ? " (" + cl.notes.join("; ") + ")" : ""}`, cap(cl.bad));
  }
  if (SS) {
    const sb = judgeSummarySimple(SS, m.UI_STRINGS || {}, m);
    const fin = SS.map((r) => ((r.samples || []).find((x) => x.fin > 0) || {}).t).filter((x) => typeof x === "number");
    ok("render", "summary-simple", !sb.length, `the summary page is simple (r44): after the last phase the bubble says exactly UI.summaryLine (${SS.map((r) => r.lang + (r.classroom ? " classroom" : "")).join(", ")}), in one or two lines that never touch, and does not change by itself; getState().summaryRow stays -1 for 8 s; no row is ringed; finished goes once, ${fin.length ? (Math.min(...fin) / 1000).toFixed(1) + " to " + (Math.max(...fin) / 1000).toFixed(1) + " s" : "about 5 s"} after the page opens; in a classroom a tap on the bubble changes nothing (Free play and Play again: their own rows)`, cap(sb));
  }
  if (SS && thumbsAsked) {
    const th = judgeSummaryThumbs(SS, N);
    const none = SS.every((r) => r.classroom || !Array.isArray(r.thumbs) || !r.thumbs.length);
    if (!th.bad.length && none) add("render", "summary-thumbs", "info", `not asked: the summary page drew no thumbnail${th.notes.length ? " (" + th.notes.join("; ") + ")" : ""}`);
    else ok("render", "summary-thumbs", !th.bad.length, `in English, Hindi and Gujarati every summary row's thumbnail (the Thumb of the tool, with result.last.it the item object) draws at least two things, never a blank box, and in Hindi and Gujarati carries no Latin letter (digits, units written in the language and symbols are fine); the session answers every phase's last question right, then reads the rows${th.notes.length ? " (" + th.notes.join("; ") + ")" : ""}`, cap(th.bad));
  }
  ok("render", "finished-once", !bad.finished.length, "phases before the last walk on to the next with no finished; the last sends finished exactly once, with honest score, stars and ids", cap(bad.finished));
  ok("render", "agent-drives", !bad.agent.length, "AI mode: the teacher agent plays every phase through window.toolApi alone (walks on, then finishes)", cap(bad.agent));
  ok("render", "tool-api", !bad.api.length, `window.toolApi has the ${m.TOOL_API ? m.TOOL_API.length : 0} NCERT verbs + window.${m.TOOL_ID}; getState() complete`, cap(bad.api));
  ok("render", "console-network-storage", !bad.probe.length, "no errors, no warnings, no network, no storage", cap(bad.probe));
  if (!silentRt) ok("render", "mute", !bad.mute.length, "muted means silent: no speech, no audio", cap(bad.mute));
  ok("render", "mascot-decoded", !bad.mascot.length, "the mascot's inline picture decodes (no fallback)", cap(bad.mascot));
  /* the summary page, Free play, Play again, and a whole lesson (NCERT Class 4 ending) */
  const sumBad = [], gS = D[`idle${N}`] && D[`idle${N}`].geometry;
  if (!gS || !gS.zones.some((z) => z.zone === "summary")) sumBad.push("the last phase did not end on the summary page");
  else {
    const learnedShown = gS.texts.filter((t) => t.zone === "summary" && /^You learned/.test(t.text)).length;
    if (learnedShown !== N) sumBad.push(`${learnedShown} "You learned" rows for ${N} phases`);
    const ids = gS.controls.map((c) => c.id);
    if (!ids.includes("play-again")) sumBad.push("no Play again");
    if (m.PHASES && sources(dir).tool.includes("freePlay: true") && !ids.includes("free-play")) sumBad.push("no Free play");
  }
  ok("render", "summary-page", !sumBad.length, `the last phase ends on the summary page: ${N} "You learned" rows, stars, Free play, Play again; finished is sent from it`, sumBad.join("; "));
  const fr = D.free && D.free.log && D.free.log[0];
  if (sources(dir).tool.includes("freePlay: true"))
    ok("render", "free-play", !!(fr && fr.pressed && fr.stageAfter === "free" && fr.eventsAfter === 0 && fr.liveControls > 0),
      `Free play opens the tool's own no-target mode (${fr ? fr.liveControls : 0} live controls), and finished is not sent when it is tapped first`, `free play run: ${JSON.stringify(fr)}`);
  const ag = D.again && D.again.log && D.again.log[0];
  ok("render", "play-again", !!(ag && ag.pressed && ["teach", "demo", "ask"].includes(ag.stageAfter) && ag.phaseAfter === N && ag.eventsAfter === 0),
    "Play again starts the mount's phase afresh, and finished is not sent when it is tapped first", `play again run: ${JSON.stringify(ag)}`);
  const ls = D.lesson, nAll = m.PHASES.reduce((a, p) => a + p.items.length, 0);
  const le = (ls && ls.events) || [];
  ok("render", "whole-lesson", le.length === 1 && JSON.stringify(le[0].phases) === JSON.stringify(m.PHASES.map((p) => p.n)) && le[0].maxScore === nAll * 5 && le[0].score === nAll * 5,
    `with no phase prop every phase runs in a row, then one summary and one finished (score ${nAll * 5} of ${nAll * 5})`, `whole lesson: ${le.length} finished ${JSON.stringify(le[0] || {})}`);
  const k1 = D.keys1;
  const kl = (k1 && k1.log) || [];
  ok("render", "keyboard", (kl.some((x) => x.advanced) || kl.some((x) => x.noDigitQuestion)) && kl.some((x) => x.dotJump), `keyboard path: ${kl.some((x) => x.noDigitQuestion) ? "no question is typed on the digit keys (working-area answers use Tab + Enter)" : "digits + Enter answer the first typed question"}, Enter drops the token, Enter on a phase dot jumps phase`,
    `keyboard run: ${JSON.stringify(kl)}`);
  const probeRuns = runs.filter((r) => D[r.key] && D[r.key].probe).map((r) => ({ key: r.key, classroom: !!r.classroom, probe: D[r.key].probe, api: D[r.key].api, muted: /[?&]muted=1/.test(r.url) }));
  /* the voiced rows' evidence: the scripted speech engine's mute run and blocked-speech run (voiced runtimes only) */
  const mv = D.mute && D.mute.log && D.mute.log[0];
  let syncBad = [];
  if (silentRt) {
    /* THE SILENT LESSON (runtime r30). The voice rows (voice-pick, voice-sync, sound-on-start, mute) left with the voice and
       its scripted speech engine; these prove the silence, the sound button, the guide steps and the arrow instead. */
    const sil = judgeSilent(probeRuns, { silentRuntime: silentRt });
    if (!sil.bad.length && !sil.hooked) add("render", "silent", "warn", `nothing was spoken in ${sil.seen} runs, but this browser had no speechSynthesis to watch, so the count proves little`);
    else ok("render", "silent", !sil.bad.length, `the lesson is silent: in all ${sil.seen} runs speechSynthesis.speak was never called (watched in ${sil.hooked}), no Tap to start cover ever appeared, getState().voice is "silent", and the mascot never had the talking class`, cap(sil.bad));
    const snd = D.sound && D.sound.log && D.sound.log[0];
    const sndBad = judgeSoundButton(snd, D.sound && D.sound.probe, probeRuns.filter((r) => r.muted));
    ok("render", "sound-button", !sndBad.length, `the sound button switches the sound effects only: the lesson starts with them on, setParam("muted") turns them off and on (getState().muted and the button's label follow) with no error, after a miss and a right answer; the ${probeRuns.filter((r) => r.muted).length} runs that start muted make no sound at all`, cap(sndBad));
  } else {
    /* A VOICED runtime: the voice, with a scripted engine: NCERT V18 + V21 */
    ok("render", "voice-pick", !!(mv && /\(en-IN\)$/.test(mv.voiceState || "")), `speaks with the device's Indian English voice (${mv ? mv.voiceState : "none"}), never another language`,
      `voice chosen: ${mv ? mv.voiceState : "none"}`);
    syncBad = !mv ? ["no mute run"] : [
      !mv.talkingWhileSpeaking && "the mascot did not move while speaking",
      !mv.sameLineAtMute && "muting moved the bubble on", !mv.stillSameLine && "muted, the line did not keep its time",
      mv.talkingWhileMuted && "the mascot kept moving while muted", mv.speaksWhileMuted && "something was spoken while muted",
      !mv.resumeIsRest && `unmuting did not speak the rest of the same line (spoke "${mv.resumed}")`,
      !mv.talkingAfterResume && "the mascot did not move after unmuting", (!mv.advancedAfter || mv.skipped) && "the lesson did not carry on after the line"].filter(Boolean);
    const bl = D.blocked && D.blocked.log && D.blocked.log[0];
    ok("render", "sound-on-start", !!(bl && bl.startMuted === false && bl.refused > 0 && bl.coverShown && bl.stillHeld && bl.fromStart && bl.coverGone && bl.carriedOn),
      "sound starts on; if the browser refuses speech until a tap, a Tap to start cover holds line one, and the tap speaks it from its start",
      `blocked-speech run: ${JSON.stringify(bl)}`);
  }
  /* guide steps: every phase with steps, opened and walked act by act (the shape rules from the maths group go in here too) */
  if (stepPhases.length) {
    const gsBad = [...shapeBad], notes = new Set();
    for (const p of stepPhases) {
      const d = D[`steps${p.n}`];
      const r = d && d.log && d.log[0];
      if (!r) { gsBad.push(`phase ${p.n}: no steps run${d && d.error ? " (" + d.error + ")" : ""}`); continue; }
      const g = judgeGuideSteps(r, p, m);
      gsBad.push(...g.bad);
      if (g.note) notes.add(g.note);
    }
    if (SC) { gsBad.push(...SC.bad); SC.notes.forEach((x) => notes.add("real click skipped: " + x)); }
    const clicked = SC ? SC.rows.filter((r) => r.found).length : 0;
    ok("render", "guide-steps", !gsBad.length, `guide steps on phase ${stepPhases.map((p) => p.n).join(", ")}: the phase opens on step 1's line with the question waiting, nothing moves on a timer (4 s), a wrong act moves nothing and shows the step's hint under the pinned instruction (the same 3 s later), each right act (one toolApi.check(), one click) clears it and moves the bubble exactly one step on, the last opens the question with its line; ${clicked} first step(s) moved on by ONE real mouse click on their control; every step a say, an on and a hint, unique hints, short lines${notes.size ? " (" + [...notes].join("; ") + ")" : ""}` + ONE_NOTE, cap(gsBad));
    if (RW) {
      const rw = judgeRealWrong(RW, m.PHASES, m);
      const tried = RW.reduce((a, r) => a + ((r.steps || []).length), 0);
      ok("render", "guide-steps-real-wrong", !rw.bad.length, `a REAL wrong act at every guide step of phase ${stepPhases.map((p) => p.n).join(", ")} (${tried} tries): a mouse click on an inert point of Work's drawing (no data-control under it)${floorRt ? ", a mouse click on the empty board around it (the work-floor rect)" : ""} and a digit key, each in its own session, show that step's hint within 300 ms, the instruction pinned and the step unchanged; then a real click on the step's control still moves it on${rw.notes.length ? " (" + rw.notes[0] + (rw.notes.length > 1 ? `; ${rw.notes.length - 1} more step(s) alike: ` + rw.notes.slice(1).map((x) => x.split(":")[0]).join(", ") : "") + ")" : ""}` + ONE_NOTE, cap(rw.bad));
    }
  }
  if (silentRt || hasRoom) {
    const arrow = judgeNoArrow(probeRuns);
    ok("render", "no-arrow-outside-classroom", !arrow.bad.length, `outside classroom mode there is no cue (.c4-cue) and no bubble control, at any moment of any of ${arrow.plain} runs${arrow.room ? `; in the ${arrow.room} classroom runs both appeared` : ""}`, cap(arrow.bad));
  }
  ok("render", "pointer-drag", RI.drag.ok, RI.drag.detail, cap(RI.drag.bad));
  ok("render", "click-then-enter", RI.key.ok, RI.key.detail, cap(RI.key.bad));
  ok("render", "parts-input", RI.parts.ok, RI.parts.detail, cap(RI.parts.bad));
  ok("render", "point-input", RI.point.ok, RI.point.detail, cap(RI.point.bad));
  if (!silentRt) ok("render", "voice-sync", !syncBad.length, `mute keeps the place, unmute speaks on from the word reached ("${mv ? mv.resumed : ""}"), mascot moves only while audio plays`, syncBad.join("; "));
  if (board) ok("render", "board-panel", RI.panel.ok, RI.panel.detail, cap(RI.panel.bad));
  if (RI.blink) ok("render", "answer-blink", RI.blink.ok, RI.blink.detail, cap(RI.blink.bad));
  if (RI.think) ok("render", "mascot-think", RI.think.ok, RI.think.detail, cap(RI.think.bad));
  if (OL) {
    /* one-line-bubble (2026-10-16; keyOnly on a runtime with caps.oneSentence): the bubble holds ONE sentence, frame by frame */
    const ol = judgeOneLine(OL, m);
    ok("render", "one-line-bubble", !ol.bad.length, `keyOnly, one sentence a screen, by a real DevTools session per phase (${[...new Set(OL.map((r) => r.lang || "en"))].join(", ")}; every phase's first question, English): the bubble holds the question ONLY (no built-in tap or choose line); after a wrong answer the hint ONLY (not both); after a real digit key the question again; after the header's Hint key a hint ONLY; at the phase's last right answer exactly the phase's closing line (never the tool's own win line); every line as written (Latin digits); no element data-role think-puff or hint-bulb at any moment${ol.notes.length ? " (" + ol.notes.join("; ") + ")" : ""}`, cap(ol.bad));
  }
  if (SP) ok("render", "start-page", SP.ok, SP.detail, cap(SP.bad));
  /* classroom (r34: action-driven): nothing waits for a "next" tap but the pieces of a long line (with the arrow); a right
     answer's next question, a miss's hint, a closing line's walk and the summary's rows come by themselves; a tap on the
     bubble when nothing is parked is the teacher's skip (within 700 ms); the ring; no score; the sound stays on; finished
     once. A runtime older than r34 held lines for the tap, which this drive no longer judges: re-pin. */
  if (hasRoom && !hintRt) add("render", "classroom", "warn", "this chapter's runtime is older than r34 (its classroom holds lines for a tap); the r34 classroom drive does not judge it: pin the chapter to r34 or later");
  if (hasRoom && hintRt) {
    const roomBad = [], toolNoC = tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
    const tfWin = (/<ToolFrame[\s\S]*?\bwinMs\s*:\s*(\d+)/.exec(toolNoC) || [])[1];
    for (const key of ["classroom1", "classroomN"]) {
      const d = D[key];
      if (!d) continue;
      const r = d.log && d.log[0];
      if (!r) { roomBad.push(`${key}: no result${d.error ? " (" + d.error + ")" : ""}`); continue; }
      const P = m.PHASES[(r.phase || 1) - 1] || m.PHASES[0];
      const winOf = (k) => { const it = (P.items || [])[k] || {}; return Number(it.winMs ?? tfWin ?? 1600); };
      const t = `${key} (phase ${r.phase})`;
      judgeClassroom(r, { winOf, silentRt, oneSentence, hasExplore: /exploreOf|keepFocus/.test(runtime), cueBig: /c4-cue-big/.test(runtime), simpleSummary: summaryRt,
        closingPieces: bubblePieces(P.closing || "", m).length }).forEach((x) => roomBad.push(`${t}: ${x}`));
      if (d.probe && d.probe.errors.length) roomBad.push(`${t}: ${d.probe.errors[0]}`);
      if (d.probe && d.probe.console.length) roomBad.push(`${t}: ${d.probe.console[0]}`);
    }
    const pg = D.page && D.page.log && D.page.log[0];
    if (D.page) {
      const pb = judgePaging(pg, m);
      pb.forEach((x) => roomBad.push(`paging: ${x}`));
      if (D.page.probe && D.page.probe.errors.length) roomBad.push(`paging: ${D.page.probe.errors[0]}`);
    }
    const sk = D.classroom1 && D.classroom1.log && D.classroom1.log[0];
    const skipNote = sk && sk.closingSkip ? "" : " (a closing-line skip needs a third phase after phase 1: not exercised)";
    ok("render", "classroom", !roomBad.length, `classroom mode (r34): the bubble is a control; nothing waits for a tap at a right answer (the next question comes within its celebration + 2 s), a miss (the hint within 700 ms, the instruction still drawn), a phase's closing line (the next phase starts by itself) or the summary (${summaryRt ? "one line, no row read out, a tap on the bubble changes nothing" : "its rows go on"}, finished once); a tap during the celebration${sk && sk.closingSkip ? " and during a closing line" : ""} skips ahead within 700 ms; the cue shows only while a piece of a long line is parked (paging proved with a scripted three-sentence line: the arrow on each piece but the last, each tap the next piece, the end never waits); the your-turn ring; no score; the sound stays on${skipNote}` + ONE_NOTE, cap(roomBad));
    if (D.pieces1 || D.piecesN) {
      const src = sources(dir).tool.replace(/\/\*[\s\S]*?\*\/|(^|[^:"'`\\])\/\/[^\n]*/g, "$1"), says = [];
      for (const mm of src.matchAll(/api\.say\(\s*(\[[^\]]*\]|"(?:[^"\\\n]|\\.)*")/g)) { try { says.push(...[].concat(JSON.parse(mm[1]))); } catch { /* not a literal */ } }
      const en = (v) => (typeof v === "string" ? v : v && v.en ? v.en : "");
      const lines = { win: says, closing: [...m.PHASES.map((p) => en(p.closing)), en(m.FINISH_LINE)].filter(Boolean), summary: m.PHASES.map((p) => en(p.learned)).filter(Boolean),
        ignore: m.PHASES.flatMap((p) => [...(Array.isArray(p.steps) ? p.steps.map((x) => x && x.say) : []), ...(p.says || []), ...(p.items || []).flatMap((it) => [it.say, it.ask])]).map(en).filter(Boolean) };
      const recs = ["pieces1", "piecesN"].filter((k) => D[k]).map((k) => (D[k].log && D[k].log[0]) || { phase: k === "pieces1" ? 1 : N, error: D[k].error || "no result" });
      const pc = judgeClassroomPieces(recs, lines, m);
      ok("render", "classroom-pieces", !pc.length, `in a classroom every piece of a line that never parks (a win line, a closing line, a summary row) stays on the bubble for its reading time, at least min(1.5 s, 0.6 x its reading time), the first piece of a closing line${summaryRt ? "" : " and of a summary row"} too, and is followed by the line's next piece${summaryRt ? " (the summary page reads no row: see summary-simple)" : ""} (phase ${recs.map((r) => r.phase).join(" and ")}, the bubble sampled every 40 ms)`, cap(pc));
    }
  }
  /* THE PHASE PARTY (runtime r39; at the right answer from r40), and the guard that free play is the summary page's only (asked from r38 on) */
  if (partyRt) {
    const reduced = runs.filter((r) => D[r.key] && D[r.key].probe).map((r) => ({ key: r.key, probe: D[r.key].probe }));
    const cheerPic = caps.cheer && /const MASCOT_CHEER: string = "data:image\/webp;base64,/.test(combined); const pb = judgePhaseParty(PR, reduced, N, cheerPic);
    /* r41: a phase dot pressed while the party is on ends it; the poppers stand clear of the bubble and the phase pills */
    const px = dotRt ? judgePartyExtras(PD, PR, FB ? { bubble: FB.bubble, pills: navDots ? { x: FB.dots.x + 10, y: FB.dots.y + 10, w: FB.dots.w - 20, h: FB.dots.h - 20 } : null } : null) : { bad: [], notes: [] };
    if (dotRt && N < 2) { px.bad = px.bad.filter((x) => !/party-dot run/.test(x)); px.notes.push("a one-phase tool has no phase dot to press"); }
    if (px.bad.length) pb.splice(Math.max(pb.length - 1, 0), 0, ...px.bad);
    if (px.bad.length && pb.length === px.bad.length) pb.push("builder: nothing to write; the party and its poppers are the runtime's (a FAIL is a runtime matter)");
    if (PR && PR.logs) PR.logs.forEach((l) => pb.splice(Math.max(pb.length - 1, 0), 0, `console during the party run: ${String(l).slice(0, 120)}`));
    const lives = ((PR && PR.phases) || []).map((p) => p.lifeMs).filter((x) => typeof x === "number");
    const soon = ((PR && PR.phases) || []).map((p) => p.seenMs).filter((x) => typeof x === "number");
    const waits = ((PR && PR.phases) || []).filter((p) => !p.last).map((p) => p.nextAfterPartyMs).filter((x) => typeof x === "number");
    ok("render", "phase-party", !pb.length, `motion on, one mount through all ${N} phases: at the right answer of every phase's last question (the last phase's included) the party is drawn within ${soon.length ? Math.max(...soon) + " ms" : "about 1 s"} (data-zone party, getState().party true), before the win animation ends, inside the stage with no pointer events, and gone ${lives.length ? (Math.max(...lives) / 1000).toFixed(1) + " s" : "about 2.3 s"} later at most; the next phase began ${waits.length ? (Math.min(...waits) / 1000).toFixed(1) + " s" : "about 2.3 s"} or more after its party appeared (the walk waits for it), never through a "free" stage; under reduced motion it is never drawn (${reduced.length} runs)${cheerPic ? "; the mascot shows its cheering pose (data-pose cheer) while it plays and stands again after it, and for about 0.9 s after an ordinary right answer" : ""}${dotRt ? "; a phase dot pressed while it is on ends it within 300 ms (getState().party false), and its poppers stand clear of the bubble and the phase pills" + (px.notes.length ? " (" + px.notes.join("; ") + ")" : "") : ""}`, cap(pb));
  }
  if (wantsCard) {
    if (!cardRt || !board) ok("render", "card-answer", false, "", "the tool asks for cardAnswer but the chapter's runtime has no card answer, or the tool is not on the board layout (runtime r49 or later with board: true)");
    else {
      const ca = judgeCardAnswer(CA);
      ok("render", "card-answer", !ca.length, `a tool with cardAnswer is answered on its cards, by a real click and the real keys: a question that asks a fraction or a decimal opens with the keypad shut, its card BLINKS (a ring, animated) and is a 72 x 72 tap target (data-control answer-open), no key stands in the question bar, and a built-in line under the instruction says where to tap; a click opens the keypad (no second answer box, a Close key at the top of the panel, the card's boxes part-1 / part-2 take the caret, the blink stops, the line changes), the typed digits show IN the card's boxes, and Enter answers; a choice question has its keys in the question bar (each blinks, 72 high, no Answer key, the keypad stays shut, a line says to choose) and one click on the right one answers; a question that keeps the Answer key has it blinking in the bar`, cap(ca));
    }
  }
  if (wantsNextKey) {
    if (!nextKeyRt) ok("render", "next-key", false, "", "the tool asks for nextKey but the chapter's runtime has no Next key (runtime r48 or later: pin this chapter to it; r45 to r47 were drafts)");
    else {
      const tfWinNK = (/<ToolFrame[\s\S]*?\bwinMs\s*:\s*(\d+)/.exec(toolPlain) || [])[1];
      const winOfNK = (n, k) => Number((((m.PHASES[n - 1] || {}).items || [])[k] || {}).winMs ?? tfWinNK ?? 1600);
      const nk = judgeNextKey(NK, { winOf: winOfNK });
      ok("render", "next-key", !nk.length, `a tool with nextKey waits for the child: after a right answer nothing moves on by itself (4.5 s watched); once the celebration is over (the win animation; for a phase's last question the party and the closing line) the Next key (data-control next-key, 72 high, inside the stage, never disabled) appears and BLINKS (a ring round it, animated, its stroke opacity swings over 1 s; still under reduced motion), saying "Next", "Next phase" (after a phase's last question) or "Summary" (the last phase's last question: it opens the summary page), getState().nextKey is its label; a real click, toolApi.next() and the Enter key each move to the next question, phase or summary within a second and the key is gone; finished goes only after the summary opens (phase 1 from its first question${N > 1 ? ", and the last phase's last question" : ""}); the scripted runs keep the timers (props.autoNext)`, cap(nk));
    }
  }
  if (FK) {
    const fk = judgeFontKit(FK);
    ok("render", "font-kit", !fk.length, `the FONT KIT (runtime/fontkit.tsx): after document.fonts.ready the 500, 600 and 700 weights of '${FK.family || "C4 Poppins"}' are loaded and ${FK.sel || "the bubble's text"} is drawn in a custom (web) font${FK.fonts ? " (" + FK.fonts.map((f) => f.familyName + (f.isCustomFont ? ", web font" : ", system")).join("; ") + ")" : ""}, never a system fallback`, cap(fk));
  }
  if (AA) {
    const aa = judgeActionAnim(AA, caps);
    const rec = (AA.motion && AA.motion.rec) || {};
    ok("render", "action-anim", !aa.length, `the act (api.act) through its own control (${(AA.tries || []).map((t) => (t.sel ? t.sel.replace(/^.*data-control=/, "").replace(/[\]"]/g, "") : "Enter")).join(", ")}), in one DevTools session: the tool is drawn ${rec.seen != null ? Math.round(rec.seen) + " ms" : "?"} after the press (300 at most), the pad locked, no pad or bar key live and getState().acting true while it plays, gone with the keys back ${rec.gone != null ? Math.round(rec.gone) + " ms" : "?"} after the press (${actLimit(caps)} ms at most); under reduced motion the same press draws nothing and ends at once`, cap(aa));
  }
  if (ND) {
    const nd = judgeNavDots(ND, N);
    ok("render", "nav-dots", !nd.length, `nav dots (class 4 r27): ${N} dots, buttons labelled "Step k of N"; in user and in AI mode a real click on the dot of phase 2${N > 2 ? " to " + N : ""}, then phase 1, starts THAT phase (question 1, nothing answered, its dot current), and the current dot after a right answer starts its phase again`, cap(nd));
  }
  if (freeGuardRt) {
    const nf = judgeNoFreeBetween(runs.filter((r) => D[r.key] && D[r.key].probe).map((r) => ({ key: r.key, probe: D[r.key].probe })), PR);
    ok("render", "no-free-between-phases", !nf.length, `free play opens only from the summary page: in every run the stage went "free" only after "summary", no Next phase key was ever drawn and getState().freeBetween was never true; the party run passed from phase to phase with no "free" stage`, cap(nf));
  }

  /* ── contrast ─────────────────────────────────────────────────────────────────── */
  const low = [];
  let measured = 0;
  shots.forEach((s, k) => {
    const res = got[runs.length + k];
    /* the geometry must be of the state the screenshot shows: a board tool's ask frame is sampled shut, then open */
    const d = D[s.key];
    const g = d && (s.drive === "ask" && !s.open && d.geometryShut ? d.geometryShut : d.geometry);
    if (!res || !res.ok || !g || !fs.existsSync(s.png)) return;
    const img = decodePng(fs.readFileSync(s.png));
    for (const t of g.texts) {
      if (t.disabled || t.stroked || t.whole) continue;
      const fg = parseRgb(t.fill);
      if (!fg) continue;
      const x0 = Math.max(0, Math.floor(t.box.x)), y0 = Math.max(0, Math.floor(t.box.y));
      const x1 = Math.min(img.w - 1, Math.ceil(t.box.x + t.box.w)), y1 = Math.min(img.h - 1, Math.ceil(t.box.y + t.box.h));
      const hist = new Map();
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const c = img.at(x, y);
        if (Math.hypot(c[0] - fg[0], c[1] - fg[1], c[2] - fg[2]) < 90) continue;
        const key = (c[0] >> 3) << 10 | (c[1] >> 3) << 5 | (c[2] >> 3);
        const e = hist.get(key) || { n: 0, r: 0, g: 0, b: 0 };
        e.n++; e.r += c[0]; e.g += c[1]; e.b += c[2];
        hist.set(key, e);
      }
      let top = null;
      for (const e of hist.values()) if (!top || e.n > top.n) top = e;
      if (!top) continue;
      const bg = [top.r / top.n, top.g / top.n, top.b / top.n];
      const ratio = contrast(fg, bg), large = t.size >= 40 || (t.size >= 28 && Number(t.weight) >= 700);
      measured++;
      if (ratio < (large ? 3 : 4.5)) low.push(`${s.drive === "idle" ? "summary" : "phase " + s.n}${s.open ? " (panel open)" : ""}: "${t.text.slice(0, 18)}" ${ratio.toFixed(2)}:1`);
    }
  });
  ok("contrast", "text-contrast", measured > 0 && !low.length, `${measured} texts measured against their real background: all at least 4.5:1 (3:1 large)`,
    measured ? cap(low) : "nothing measured");
  return finishReport(dir, id, R, log);
}

/* how much of the report `check` prints: "compact" (the default: the summary line, every non-pass row, the passes as one line) or "all" */
let reportRows = process.env.C4_CHECK_ROWS === "all" ? "all" : "compact";
export function setReportRows(mode) { reportRows = mode === "all" ? "all" : "compact"; }

function finishReport(dir, id, R, log, { partial = false } = {}) {
  const count = (lv) => R.filter((r) => r.level === lv).length;
  const summary = { pass: count("pass"), warn: count("warn"), fail: count("fail"), info: count("info"), at: new Date().toISOString() };
  fs.mkdirSync(path.join(dir, ".build"), { recursive: true });
  fs.writeFileSync(path.join(dir, ".build", "check.json"), JSON.stringify({ id, summary, results: R }, null, 1));
  /* a quick check (source + maths, --no-render) never certifies the tool: port and publish need the full one */
  writeStatus(dir, partial ? { quickCheck: { ...summary, checkedTool: hashOf(dir) } } : { checks: summary, checkedTool: hashOf(dir) });
  const mark = { pass: "PASS", warn: "WARN", fail: "FAIL", info: "INFO" };
  /* the printout: every row that is not a pass in full (WARN, FAIL and INFO, each with its builder hint), the passes as ONE line;
     --rows all (or C4_CHECK_ROWS=all) prints every row. status.json and .build/check.json above always hold every row. */
  const quiet = reportRows !== "all", passes = R.filter((r) => r.level === "pass");
  if (quiet && passes.length) {
    const ids = passes.map((r) => r.id).join(" ");
    log(`  ${passes.length} PASS ${ids.length <= 200 ? ids : "(rows hidden; --rows all lists each)"}`);
  }
  let group = "";
  for (const r of R) {
    if (quiet && r.level === "pass") continue;
    if (r.group !== group) { group = r.group; log(`  ${group}`); }
    log(`    ${mark[r.level]}  ${r.id.padEnd(24)} ${r.msg}`);
  }
  log(`  ${summary.pass} pass · ${summary.warn} warn · ${summary.fail} fail · ${summary.info} info${partial ? "  (quick check: source + maths only; it does not certify or port the tool)" : ""}`);
  return { summary, results: R, partial };
}

/* the checks certify one exact tool.tsx + runtime + mascot; port and publish compare against it */
export function hashOf(dir) {
  const { combined } = sources(dir);
  let h = 0x811c9dc5;
  for (let i = 0; i < combined.length; i++) { h ^= combined.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h.toString(16).padStart(8, "0") + ":" + combined.length;
}
