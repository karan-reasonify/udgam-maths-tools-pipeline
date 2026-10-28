/* runtime.tsx + mascot.tsx + tool.tsx -> <ID>.preview.html, one offline file you open in a browser.
 *
 * The sources are concatenated into .build/tool.bundle.tsx first; port turns that same file into
 * the standalone <ID>.tsx, so the preview renders the code the host will. React comes from
 * the class folder's node_modules; nothing is fetched. Classic JSX (React.createElement), as the host's Babel.
 *
 * The page has no chrome of its own. Everything is the tool's: in the preview the tool runs in
 * USER mode (navigableDots), so its phase dots switch phases and its header controls the sound.
 * The drives that need a capability of the pinned runtime (a voiced runtime's speech engine, a silent one's guide
 * steps, hint, party ...) read it from window.__RT, which buildPreview writes from lib/core/caps.mjs: a runtime
 * without the capability takes exactly the path it always took.
 *   ?phase=n        mount phase n (default 1)        ?mode=ai   AI mode: dots are progress only
 *   ?muted=1        start with the sound effects off (test runs only: with drive/probe/shot; a plain preview always
 *                   starts with them on). The lesson itself is SILENT from runtime r30: lines are printed, never spoken.
 *   ?shot=1         for screenshots
 *   ?classroom=1    CLASSROOM mode (runtime r22+): a teacher paces, the bubble is tapped to go on (r30: sound stays on)
 *   ?drive=ask|wrong|solve|idle|agent|keys|mute|blocked|free|again|classroom|sound|steps|hint|hintkey|page   scripted runs, results in
 *                   (mute, blocked: a VOICED runtime only, with ?fakevoice)
 *                   <pre id="__drive"> (hint: a miss, 4 s, a second miss, a right answer; hintkey: the header's Hint key;
 *                   page: a classroom's long-line paging, a scripted three-sentence line through toolApi.say)
 *   ?nextkey=1      with probe/drive/shot: the tool's Next key waits for a tap (runtime r48+, a tool with nextKey: true);
 *                   without it a scripted run keeps the timers, so the checks and shots walk by themselves
 *   ?phase=none     a whole lesson: every phase in a row, then the summary page
 *   ?probe=1        record console, network, storage, speech and audio calls, and every moment a Tap to start cover,
 *                   a talking mascot, the classroom arrow, the bubble control, a phase party or a Next phase key
 *                   was on the page, and the stages the lesson went through; + a geometry snapshot
 *                   (the watchers only for a runtime whose rows read them, window.__RT.watch)
 *   ?fakevoice=1    a scripted speech engine (start, word boundaries, end, cancel) for the voice checks of a VOICED
 *                   runtime (=blocked: speech refused until a tap)
 */
import fs from "node:fs";
import path from "node:path";
import { CONFIG, fromRoot } from "../core/env.mjs";
import { resolveRuntime, KITS } from "../core/pin.mjs";
import { idOf } from "../core/work.mjs";
import { GEOMETRY_SRC } from "../check/geometry.mjs";
import { capsOf, rtFlags } from "../core/caps.mjs";

const HOOKS = new Set(["useState", "useEffect", "useRef", "useMemo", "useCallback"]);
export const BUNDLED = new Set(CONFIG.bundled || []);

/* host scope of the SOURCE (runtime + mascot + tool): react, plus the libraries port bundles */
export function hostScope(combined, toolSrc) {
  const warn = [];
  const imports = [...combined.matchAll(/^\s*import\s([^;]*?)from\s*["']([^"']+)["'];?/gm)].map((m) => ({ names: m[1], from: m[2] }));
  const froms = imports.map((i) => i.from);
  if (froms.filter((f) => f === "react").length !== 1) warn.push(`one import from "react" expected (have ${JSON.stringify(froms)})`);
  const stray = froms.filter((f) => f !== "react" && !BUNDLED.has(f));
  if (stray.length) warn.push(`imports the host cannot provide and port does not bundle: ${stray.join(", ")}`);
  if (/^\s*import\s/m.test(toolSrc)) warn.push("tool.tsx has an import; the runtime is already in scope");
  const own = new Set([...combined.matchAll(/(?:function|const|let)\s+(use[A-Z]\w*)/g)].map((m) => m[1]));
  for (const i of imports.filter((x) => BUNDLED.has(x.from)))
    for (const m of i.names.matchAll(/(?:\w+\s+as\s+)?(use[A-Z]\w*)/g)) own.add(m[1]);
  const bad = [...new Set([...combined.matchAll(/\b(use[A-Z]\w*)\s*\(/g)].map((m) => m[1]))].filter((h) => !HOOKS.has(h) && !own.has(h));
  if (bad.length) warn.push(`hooks the host does not inject: ${bad.join(", ")}`);
  const lastLine = combined.trim().split(/\r?\n/).pop().trim();
  if (!/^export default [A-Za-z_$][\w$]*;?$/.test(lastLine)) warn.push(`last line must be "export default <Identifier>;" (is: ${lastLine.slice(0, 60)})`);
  if (/export\s+default\s+function/.test(combined)) warn.push("export default function ... is refused by the host parser; declare, then export the identifier");
  if (/export\s+interface/.test(combined)) warn.push("export interface is refused by the host parser");
  const exports = combined.split(/\r?\n/).filter((l) => /^\s*export\s/.test(l) && !/^\s*export default [A-Za-z_$][\w$]*;?\s*$/.test(l));
  if (exports.length) warn.push(`stray export line(s) besides the default: ${exports.length}`);
  for (const b of ["localStorage", "sessionStorage", "indexedDB", "fetch(", "XMLHttpRequest", "WebSocket", "sendBeacon", "useLayoutEffect", "<image", "<img", "data:image"])
    if (toolSrc.includes(b)) warn.push(`tool.tsx uses ${b}`);
  const raw = [...toolSrc.matchAll(/fontSize=\{\s*(\d+)\s*\}|fontSize="(\d+)"/g)].map((m) => m[1] || m[2]);
  if (raw.length) warn.push(`raw fontSize literals (${[...new Set(raw)].join(", ")}); use T.display/xl/speech/prompt/label/micro`);
  return warn;
}

/* the sources in build order; the mascot (and the kits, when the runtime has them) sit between runtime and tool.
   The runtime is the chapter's own: its pin (work/<chapter_id>/runtime.json -> runtime/frozen/<v>/),
   else the head. That is why a runtime edit for one chapter cannot restale another chapter. */
export function sources(dir) {
  const toolFile = path.join(dir, "tool.tsx");
  if (!fs.existsSync(toolFile)) throw new Error(`no tool.tsx in ${dir}; run scaffold first`);
  const { runtimeFile, mascotFile, kitDir, version } = resolveRuntime(dir);
  if (!fs.existsSync(mascotFile)) throw new Error("no runtime/mascot.tsx; run: node cli.mjs mascot");
  const runtime = fs.readFileSync(runtimeFile, "utf8");
  const mascot = fs.readFileSync(mascotFile, "utf8");
  const tool = fs.readFileSync(toolFile, "utf8");
  /* voice.tsx: the slot's baked Hindi/Gujarati clips (`const TOOL_VOICE`), GENERATED by `node cli.mjs voice`
     and never edited or read by hand; it sits before the tool so the tool's `export default` stays last.
     A slot without one builds exactly as before. */
  const voiceFile = path.join(dir, "voice.tsx");
  const voice = fs.existsSync(voiceFile) ? fs.readFileSync(voiceFile, "utf8").trim() + "\n\n" : "";
  /* images.tsx: the slot's generated pictures (`const TOOL_IMAGES`), made by `node cli.mjs images` (docs/IMAGES.md),
     never edited or read by hand; the runtime's Skin draws them. A slot without one builds exactly as before. */
  const imagesFile = path.join(dir, "images.tsx");
  const images = fs.existsSync(imagesFile) ? fs.readFileSync(imagesFile, "utf8").trim() + "\n\n" : "";
  /* the KITS, GENERATED and frozen with the runtime like the mascot, never read by hand (2026-10-16): actionkit.tsx, the pictures
     api.act draws (`const ACTION_KIT`, docs/IMAGES.md §11, `node cli.mjs actionkit`), and fontkit.tsx, Poppins inside the tool
     (`const FONT_KIT`, docs/LAYOUT.md §9, `node cli.mjs fontkit`). A runtime without them builds exactly as before. */
  const kits = KITS.map((k) => path.join(kitDir, `${k}.tsx`)).filter((f) => fs.existsSync(f)).map((f) => fs.readFileSync(f, "utf8").trim() + "\n\n").join("");
  const combined = runtime.trimEnd() + "\n\n" + mascot.trim() + "\n\n" + kits + voice + images + tool.trim() + "\n";
  return { runtime, mascot, tool, combined, runtimeVersion: version };
}

/* in-page instruments, installed before React mounts (only with ?probe=1) */
const PROBE = `
(function () {
  var P = (window).__probe = { console: [], errors: [], network: [], storage: [], speak: 0, audio: 0, speechHooked: false, cover: 0, talk: 0, cue: 0, bubbleCtl: 0, party: 0, nextKey: 0, freeBetween: 0, stages: [] };
  ["error", "warn"].forEach(function (k) {
    var orig = console[k];
    console[k] = function () { try { P.console.push(k + ": " + Array.prototype.map.call(arguments, String).join(" ").slice(0, 300)); } catch (e) {} return orig.apply(console, arguments); };
  });
  window.addEventListener("error", function (e) { P.errors.push(String(e.message || e)); });
  window.addEventListener("unhandledrejection", function (e) { P.errors.push("rejection: " + String(e.reason)); });
  var f = window.fetch; window.fetch = function (u) { P.network.push("fetch " + String(u).slice(0, 80)); return f.apply(this, arguments); };
  var xo = XMLHttpRequest.prototype.open; XMLHttpRequest.prototype.open = function (m, u) { P.network.push("xhr " + String(u).slice(0, 80)); return xo.apply(this, arguments); };
  if (navigator.sendBeacon) { var sb = navigator.sendBeacon.bind(navigator); navigator.sendBeacon = function (u) { P.network.push("beacon " + u); return sb.apply(null, arguments); }; }
  var WS = window.WebSocket; window.WebSocket = function (u) { P.network.push("ws " + u); return new WS(u); };
  ["localStorage", "sessionStorage", "indexedDB"].forEach(function (k) {
    try { var d = Object.getOwnPropertyDescriptor(Window.prototype, k) || Object.getOwnPropertyDescriptor(window, k);
      if (d && d.get) Object.defineProperty(window, k, { configurable: true, get: function () { P.storage.push(k); return d.get.call(window); } }); } catch (e) {}
  });
  /* every speak() call is counted (a silent runtime must make none, a voiced one is judged muted); speechHooked says the count was really watched */
  if (window.speechSynthesis) { var sp = window.speechSynthesis.speak.bind(window.speechSynthesis); window.speechSynthesis.speak = function (u) { P.speak++; return sp(u); }; P.speechHooked = true; }
  ["AudioContext", "webkitAudioContext"].forEach(function (k) { var A = window[k]; if (A) window[k] = function () { P.audio++; return new A(); }; });
  /* the watchers below only for a runtime whose rows read them (window.__RT.watch: a silent runtime, or one with a classroom,
     a party or the free-play guard): a plain voiced runtime (r1-r21) keeps the probe it always had, so its timing is unchanged */
  if (!(window.__RT && window.__RT.watch)) return;
  /* "never" over the whole run, not only its last frame: each batch of DOM changes is looked at for a Tap to start cover,
     a talking mascot, the classroom arrow and the bubble control (counts of the batches that had one) */
  var watch = function () {
    if (document.querySelector('[data-control="tap-to-start"]')) P.cover++;
    if (document.querySelector(".c4-talk")) P.talk++;
    if (document.querySelector(".c4-cue")) P.cue++;
    if (document.querySelector('[data-control="bubble"]')) P.bubbleCtl++;
    if (document.querySelector('[data-zone="party"]')) P.party++;   /* the phase party (r39; at the right answer from r40): never under reduced motion */
    if (document.querySelector('[data-control="next-phase"]')) P.nextKey++;   /* r38's Next phase key: gone, must stay gone */
  };
  try { new MutationObserver(watch).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] }); } catch (e) {}
  /* the stages the lesson goes through ("stage@phase", each change once): free play opens only from the summary page (r39) */
  setInterval(function () {
    try {
      var a = window.toolApi && window.toolApi.getState(); if (!a) return;
      var s = a.stage + "@" + a.phase;
      if (P.stages[P.stages.length - 1] !== s && P.stages.length < 400) P.stages.push(s);
      if (a.freeBetween) P.freeBetween++;
    } catch (e) {}
  }, 100);
})();
`;

/* a speech engine that behaves like a real one, for testing mute / unmute sync (only with ?fakevoice=1; a VOICED runtime's
   drives mute and blocked):
   55 ms a character, a boundary per word, onend at the end, and cancel() reporting "interrupted" */
const FAKEVOICE = `
(function () {
  var log = window.__voiceLog = [], cur = null, timers = [];
  /* ?fakevoice=blocked: like Chrome after a reload, speech is refused ("not-allowed") until a tap in the page */
  var blocked = new URLSearchParams(location.search).get("fakevoice") === "blocked";
  var tap = function () { blocked = false; };
  window.addEventListener("pointerdown", tap, true); window.addEventListener("keydown", tap, true);
  var clear = function () { timers.forEach(clearTimeout); timers = []; };
  var voices = [
    { name: "Google US English", lang: "en-US", localService: false, voiceURI: "us" },
    { name: "Microsoft Hemant - Hindi (India)", lang: "hi-IN", localService: true, voiceURI: "hi" },
    { name: "Fake Heera - English (India)", lang: "en-IN", localService: true, voiceURI: "in" },
    { name: "Google UK English Male", lang: "en-GB", localService: false, voiceURI: "gb" }];
  var synth = { speaking: false, pending: false, paused: false,
    getVoices: function () { return voices; }, addEventListener: function () {}, removeEventListener: function () {},
    speak: function (u) {
      if (blocked) { log.push({ t: Date.now(), refused: u.text }); setTimeout(function () { u.onerror && u.onerror({ error: "not-allowed" }); }, 1); return; }
      clear(); cur = u; log.push({ t: Date.now(), speak: u.text, voice: u.voice && u.voice.name });
      timers.push(setTimeout(function () { if (cur !== u) return; synth.speaking = true; u.onstart && u.onstart({}); }, 20));
      var at = 0; u.text.split(/(\\s+)/).forEach(function (w) { var ci = at; if (/\\S/.test(w)) timers.push(setTimeout(function () { if (cur === u && u.onboundary) u.onboundary({ charIndex: ci, name: "word" }); }, 20 + ci * 55)); at += w.length; });
      timers.push(setTimeout(function () { if (cur !== u) return; synth.speaking = false; cur = null; log.push({ t: Date.now(), end: u.text }); u.onend && u.onend({}); }, 20 + u.text.length * 55));
    },
    cancel: function () { var u = cur; clear(); cur = null; synth.speaking = false; log.push({ t: Date.now(), cancel: true });
      if (u && u.onerror) setTimeout(function () { u.onerror({ error: "interrupted" }); }, 0); },
    pause: function () {}, resume: function () {} };
  Object.defineProperty(window, "speechSynthesis", { configurable: true, get: function () { return synth; } });
  window.SpeechSynthesisUtterance = function (text) { this.text = text; this.voice = null; this.lang = ""; this.rate = 1; this.pitch = 1; };
})();
`;

const ENTRY = `
import React from "react";
import { createRoot } from "react-dom/client";
import Tool from "./tool.bundle.tsx";
const q = new URLSearchParams(location.search);
/* the sound effects are always on in a preview someone opens (in a classroom too, r30); only the scripted test runs that
   ask for ?muted=1 start with them off. There is no voice to mute: the lesson is printed. */
const testRun = q.has("drive") || q.has("probe") || q.has("shot");
const props: any = { muted: testRun && q.get("muted") === "1", navigableDots: q.get("mode") !== "ai" };
if (q.get("phase") !== "none") props.phase = Number(q.get("phase") || 1);
if (q.get("lang")) props.lang = q.get("lang"); /* hi | gu: the host's language prop (unset = English) */
if (q.get("classroom") === "1") props.classroom = true; /* a teacher paces the lesson with the arrow and the bubble tap (runtime r22+; an older runtime ignores it) */
if (q.get("noskins") === "1") props.skins = false; /* draw no skin: the plain shapes alone (runtime r29+) */if (q.get("answer") === "open") props.answerOpen = true; /* a board tool keeps its answer panel open on every question (runtime r27+) */
/* the start page (runtime r28+): a page someone opens shows it; every scripted run and shot skips it; ?startpage=1 shows it on a run */
if (q.get("startpage") === "1") props.start = true; else if (testRun) props.start = false;
/* the Next key (runtime r48+, a tool with nextKey: true): a page someone opens waits for it; every scripted run and shot keeps the
   timers (the lesson walks by itself, as before); ?nextkey=1 puts the key on a run (the next-key check, the play tester, the shots) */
if (q.get("nextkey") === "1") props.autoNext = false; else if (testRun) props.autoNext = true;
if (q.get("next") === "1") props.onNext =() => { (window as any).__next = ((window as any).__next || 0) + 1; };
(window as any).__events = [];
(window as any).__all = [];
window.addEventListener("finished", (e: any) => (window as any).__events.push(e.detail));
["answer_checked", "question_done", "finished"].forEach((n) => window.addEventListener(n, (e: any) => (window as any).__all.push({ name: n, ...e.detail })));
createRoot(document.getElementById("root")!).render(React.createElement(Tool, props));

/* a snapshot of what is on the stage, in stage units, for the layout checks */
${GEOMETRY_SRC}

(window as any).__geometry = geometry;

/* scripted runs, driven through window.__tool (dev) or window.toolApi (the agent's own verbs) */
const drive = q.get("drive");
if (drive) {
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const until = async (ok: () => boolean, tries = 600) => { for (let k = 0; k < tries && !ok(); k++) await wait(50); };
  const key = (k: string, el?: any) => (el || window).dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true }));
  (async () => {
    await until(() => !!(window as any).__tool && !!(window as any).toolApi);
    const t = (window as any).__tool, A = (window as any).toolApi;
    const log: any[] = [];
    /* what the bubble shows right now: its printed line, the lines of its wrap joined (r30: the lesson is printed, never spoken) */
    const bubble = () => { const b = document.querySelector('[data-zone="bubble"]'); return b ? Array.from(b.querySelectorAll("text")).map((x: any) => x.textContent).join(" ") : ""; };
    /* a demo stage through the agent's own verb: check() performs one act (a guide step's, r30, or an old demo's). The next
       check waits until that act has landed: a cut may animate for most of a second before the tool reports it (api.did) */
    const agentDemo = async () => {
      if (typeof A.getState().guideSteps !== "number") { A.check(); await until(() => A.getState().stage === "ask"); return; }
      for (let k = 0; k < 15 && A.getState().stage === "demo"; k++) {
        const g0 = A.getState().guideStep;
        A.check();
        await until(() => A.getState().stage !== "demo" || A.getState().guideStep !== g0, 120);
      }
      await until(() => A.getState().stage === "ask");
    };
    /* r34: the bubble draws the pinned instruction (data-role "instruction") and, after a wrong act or answer, the hint
       under it (data-role "hint"): their text, the wrapped lines joined */
    const roleText = (role: string) => { const g = document.querySelector('[data-zone="bubble"] [data-role="' + role + '"]'); return g ? Array.from(g.querySelectorAll("text")).map((x: any) => x.textContent).join(" ") : ""; };
    const pinSnap = () => ({ hint: A.getState().hint, hintKind: A.getState().hintKind, instruction: A.getState().instruction, domInstr: roleText("instruction"), domHint: roleText("hint"), typed: t.state().typed });
    const held = () => !!A.getState().held;
    const cueOn = () => !!document.querySelector("svg .c4-cue");
    const bubbleKey = () => { const el: any = document.querySelector('[data-control="bubble"]'); if (el) { el.focus(); key("Enter", el); } return !!el; };
    /* a classroom run reaches the first question by tapping through the pieces a long teach run parks (and the guide
       steps, by acting); a normal run just waits for it */
    const toQuestion = async () => {
      for (let k = 0; k < 300 && t.state().stage !== "ask"; k++) {
        if (t.state().stage === "demo") { t.solve(); await until(() => t.state().stage !== "demo", 120); continue; }
        if (held()) { bubbleKey(); await wait(200); } else await wait(120);
      }
    };
    /* the capabilities of the pinned runtime (lib/core/caps.mjs, written by buildPreview): a drive that only a silent runtime
       has (the timeline sampling of a miss) checks RT.silent, so a voiced runtime takes exactly the path it always took */
    const RT: any = (window as any).__RT || {};
    if (drive === "blocked") {
      /* VOICED runtimes (r1-r29): the browser refuses speech until a tap: the lesson waits behind the cover; the tap speaks line one from its start */
      const L = () => ((window as any).__voiceLog || []);
      const bubble = () => { const b = document.querySelector('[data-zone="bubble"]'); return b ? Array.from(b.querySelectorAll("text")).map((x: any) => x.textContent).join(" ") : ""; };
      const cover = () => document.querySelector('[data-control="tap-to-start"]');
      const res: any = { startMuted: A.getState().muted };
      await until(() => L().some((e: any) => e.refused), 200);
      await wait(3000);
      res.refused = L().filter((e: any) => e.refused).length;
      res.coverShown = !!cover();
      res.heldLine = bubble();
      await wait(6000);
      res.stillHeld = bubble() === res.heldLine && !L().some((e: any) => e.speak);
      document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      await wait(120);
      const spoke = L().filter((e: any) => e.speak).map((e: any) => e.speak);
      res.firstSpoken = spoke[0];
      res.fromStart = !!spoke[0] && spoke[0] === (L().find((e: any) => e.refused) || {}).refused;
      res.coverGone = !cover();
      await until(() => bubble() !== res.heldLine, 400);
      res.carriedOn = bubble() !== res.heldLine;
      log.push(res);
    }
    if (drive === "mute") {
      /* VOICED runtimes: NCERT V21 with a scripted engine: mute 45% into a line, wait, unmute */
      const L = () => ((window as any).__voiceLog || []);
      const bubble = () => { const b = document.querySelector('[data-zone="bubble"]'); return b ? Array.from(b.querySelectorAll("text")).map((x: any) => x.textContent).join(" ") : ""; };
      const talking = () => !!document.querySelector('image[data-role="mascot"].c4-talk');
      await until(() => L().some((e: any) => e.speak));
      const first = L().find((e: any) => e.speak);
      await until(() => talking(), 40);
      const res: any = { first: first.speak, voiceUsed: first.voice, voiceState: A.getState().voice, talkingWhileSpeaking: talking() };
      await wait(Math.round(first.speak.length * 55 * 0.45));
      const before = bubble();
      A.setParam("muted", true);
      await wait(40);
      res.sameLineAtMute = bubble() === before;
      res.talkingWhileMuted = talking();
      await wait(400);
      res.stillSameLine = bubble() === before;
      res.speaksWhileMuted = L().filter((e: any) => e.speak).length > 1;
      A.setParam("muted", false);
      await wait(80);
      const speaks = L().filter((e: any) => e.speak).map((e: any) => e.speak);
      const rest = speaks[speaks.length - 1];
      res.resumed = rest;
      res.resumeIsRest = speaks.length === 2 && rest !== first.speak && first.speak.endsWith(rest) && rest.length < first.speak.length
        && /\\s/.test(first.speak[first.speak.length - rest.length - 1] || " ");
      await until(() => talking(), 40);
      res.talkingAfterResume = talking();
      await until(() => bubble() !== before, 400);
      res.advancedAfter = bubble() !== before;
      res.skipped = L().filter((e: any) => e.speak).length < 3;
      log.push(res);
    }
    if (drive === "classroom") {
      /* CLASSROOM mode (r34: action-driven). A teacher is in the room; nothing waits for a "next" tap but the pieces of a
         LONG line (each piece after the first waits, with the big arrow on; the end of a line never waits), and a tap on
         the bubble when nothing is parked is the teacher's SKIP. The bubble is tapped the way a finger or Enter does it
         (focus, Enter). A phase before the last walks on to the next by itself; the last goes on to the summary page,
         whose rows go on by themselves, and sends finished once. The sound effects stay on. */
      const dead: string[] = [], clash: string[] = [];
      /* the big arrow (right of the longest line) must never touch the bubble's text: sampled after every tap */
      const cueClear = () => {
        const a: any = document.querySelector("svg .c4-cue");
        if (!a) return;
        const ar = a.getBoundingClientRect();
        document.querySelectorAll('[data-zone="bubble"] text').forEach((x: any) => {
          const r = x.getBoundingClientRect();
          if (r.right > ar.left - 2 && r.bottom > ar.top && r.top < ar.bottom) clash.push(String(x.textContent).slice(0, 30));
        });
      };
      const snap = () => bubble() + "|" + t.state().stage + "|" + t.state().item + "|" + t.state().phase + "|" + A.getState().summaryRow;
      const mp = A.getState().phase, walks = A.getState().phases > mp;
      const res: any = { phase: mp, walks, startMuted: A.getState().muted, classroom: A.getState().classroom, bubbleControl: !!document.querySelector('[data-control="bubble"]') };
      /* a tap on a PARKED piece must show the next one (a dead tap with the arrow on is a fault) */
      const tap = async () => {
        const s0 = snap();
        bubbleKey();
        const f: any = document.activeElement;
        if (res.keepsFocus === undefined) res.keepsFocus = !!(f && f.getAttribute && f.getAttribute("data-control") === "bubble");
        await wait(170);
        cueClear();
        if (snap() === s0) dead.push(s0.slice(0, 50));
      };
      /* the cue and a parked piece must agree (sampled every 100 ms; two disagreeing samples in a row count, to step over
         one render tick) */
      let mism = 0, prevBad = false;
      const cueAt: string[] = [];
      const iv = setInterval(() => {
        const bad = cueOn() !== held();
        if (bad && prevBad) { mism++; if (cueAt.length < 3) cueAt.push(t.state().stage + ":" + (cueOn() ? "cue" : "no cue") + "/" + (held() ? "parked" : "nothing parked")); }
        prevBad = bad;
      }, 100);
      /* 1. the opening: a phase on guide steps waits on its first step for the child's act (7 s, no timer, no tap moves
         it); a teach run pages piece by piece with the taps */
      await until(() => held() || ["ask", "demo"].includes(t.state().stage), 200);
      res.steps = typeof A.getState().guideSteps === "number";
      let taps = 0, moved = 0;
      if (res.steps && t.state().stage === "demo") {
        res.stepHeld = A.getState().guideStep === 0 && !!roleText("instruction");
        await wait(7000);
        res.stepStays = t.state().stage === "demo" && A.getState().guideStep === 0;
        t.solve();
        await until(() => t.state().stage !== "demo", 300);
      }
      for (let k = 0; k < 400 && t.state().stage !== "ask"; k++) {
        if (t.state().stage === "demo") { t.solve(); await until(() => t.state().stage !== "demo", 120); continue; }
        if (held()) { const b0 = snap(); await tap(); taps++; if (snap() !== b0) moved++; } else await wait(100);
      }
      res.ring = !!document.querySelector(".c4-ring");
      res.tapsToQuestion = taps; res.everyTapMoved = moved === taps;
      res.askOpen = t.state().stage === "ask";
      /* 2. a miss: the hint shows by itself within 700 ms under the pinned instruction; nothing waits for a tap */
      t.nearMiss(); await wait(60);
      const tm = performance.now();
      let hintMs: any;
      t.submit();
      for (let k = 0; k < 40; k++) { if (A.getState().hint && roleText("hint")) { hintMs = Math.round(performance.now() - tm); break; } await wait(25); }
      res.miss = { hintMs, hint: A.getState().hint, domHint: roleText("hint"), domInstr: roleText("instruction"), held: held() };
      await until(() => !t.state().locked); await wait(300);
      /* 3. a right answer: the next question comes by itself after the celebration, no tap */
      const it0 = t.state().item, tw = performance.now();
      let heldDuring = false;
      t.solve();
      for (let k = 0; k < 400; k++) {
        if (held()) heldDuring = true;
        const s = t.state();
        if ((s.item !== it0 && s.stage === "ask") || s.phase !== mp || ["idle", "summary"].includes(s.stage)) break;
        await wait(50);
      }
      res.win = { item: it0, elapsed: t.state().item !== it0 ? Math.round(performance.now() - tw) : undefined, heldDuring };
      /* 4. the teacher's skip: a tap on the bubble during the celebration brings the next question at once */
      if (t.state().stage === "ask" && t.state().phase === mp && t.state().item + 1 < t.state().items) {
        const it1 = t.state().item;
        t.solve(); await wait(300);
        if (t.state().stage === "win") {
          const moved1 = () => t.state().item !== it1 || t.state().phase !== mp || ["idle", "summary"].includes(t.state().stage);
          const sk: any = { tried: true, cue: cueOn(), taps: 0, parkedAtTap: [] };
          /* up to four taps, 1 s apart: the first that brings the next question is the skip; the ones before it paged
             (a parked piece of the tool's own win line) or ended its last piece */
          for (let n = 0; n < 4 && !moved1(); n++) {
            sk.parkedAtTap.push(held());
            const ts = performance.now(); bubbleKey(); sk.taps++;
            for (let k = 0; k < 40 && !moved1(); k++) await wait(25);
            if (moved1()) sk.elapsed = Math.round(performance.now() - ts);
          }
          sk.lineFirst = sk.taps > 1 && sk.elapsed !== undefined;
          res.skip = sk;
        }
      }
      /* 5. the rest of the phase: answers only (a parked piece is tapped, as a teacher pages a long line) */
      for (let g = 0; g < 800; g++) {
        const s = t.state();
        if (s.phase !== mp || s.stage === "summary" || s.stage === "idle" || t.isDone()) break;
        if (s.stage === "demo") { t.solve(); await until(() => t.state().stage !== "demo", 120); continue; }
        if (s.stage === "ask") { t.solve(); await wait(300); continue; }
        if (held()) { await tap(); continue; }
        await wait(150);
      }
      if (walks) {
        /* the closing line walks on by itself (a parked piece of a long closing is tapped, as paging) */
        const tc = performance.now();
        let closingTaps = 0, hd = false;
        for (let k = 0; k < 600 && t.state().phase === mp; k++) { if (held()) { hd = true; await tap(); closingTaps++; } else await wait(50); }
        res.phaseWalk = { walked: t.state().phase === mp + 1, elapsed: Math.round(performance.now() - tc), finishedBefore: (window as any).__events.length > 0, heldDuring: hd, closingTaps };
        /* the teacher's skip during a closing line: the next phase's closing (when that phase is not the last) */
        if (t.state().phase === mp + 1 && A.getState().phases > mp + 1) {
          await toQuestion();
          for (let g = 0; g < 800 && t.state().phase === mp + 1 && t.state().stage !== "idle"; g++) {
            const s = t.state();
            if (s.stage === "demo") { t.solve(); await until(() => t.state().stage !== "demo", 120); continue; }
            if (s.stage === "ask") { t.solve(); await wait(300); continue; }
            if (held()) { await tap(); continue; }
            await wait(100);
          }
          if (t.state().stage === "idle" && t.state().phase === mp + 1) {
            await wait(200);
            const cs: any = { tried: true, taps: 0 };
            let ts = performance.now();
            /* a parked piece of a long closing is taken first (paging); the skip is the tap with nothing parked */
            for (let k = 0; k < 4 && t.state().phase === mp + 1; k++) {
              const wasHeld = held();
              ts = performance.now(); bubbleKey(); cs.taps++;
              for (let j = 0; j < 40 && t.state().phase === mp + 1; j++) await wait(25);
              if (!wasHeld) break;
            }
            for (let j = 0; j < 120 && t.state().phase === mp + 1; j++) await wait(25);
            if (t.state().phase === mp + 2) cs.elapsed = Math.round(performance.now() - ts);
            res.closingSkip = cs;
          }
        }
      } else {
        /* the summary: its rows go on by themselves (the opening lines of the page may page with a tap); finished once.
           r44 (?simple=1, the runtime has UI.summaryLine): the page says one line and steps no row; 1.5 s in, the bubble is
           tapped once (the teacher's skip): nothing on the page may change */
        const simpleSum = q.get("simple") === "1";
        await until(() => t.state().stage === "summary", 200);
        res.summary = { open: t.state().stage === "summary", rowsWanted: A.getState().phases, simple: simpleSum };
        const rows = new Set<number>();
        if (simpleSum) {
          await wait(1500);
          const b0 = roleText("instruction") || bubble();
          bubbleKey(); await wait(400);
          res.summary.tap = { before: b0, after: roleText("instruction") || bubble(), stage: t.state().stage, row: A.getState().summaryRow, events: (window as any).__events.length };
        }
        for (let k = 0; k < 800 && !((simpleSum || rows.size >= A.getState().phases) && t.isDone()); k++) {
          const r = A.getState().summaryRow;
          if (r >= 0) rows.add(r);
          if (held()) await tap(); else await wait(50);
        }
        await until(() => t.isDone(), 300);
        await wait(1500);
        res.summary.rowsSeen = rows.size;
        res.summary.finishedCount = (window as any).__events.length;
        res.summary.scoreShown = Array.from(document.querySelectorAll('[data-zone="summary"] text')).some((x: any) => /Right first time/.test(x.textContent));
        res.summary.workRing = Array.from(document.querySelectorAll(".c4-ring")).some((x: any) => !x.closest('[data-zone="summary"]'));
      }
      clearInterval(iv);
      res.cueMismatch = mism; res.cueAt = cueAt;
      res.deadTaps = dead.length; res.deadAt = dead.slice(0, 3);
      res.cueClash = clash.length; res.clashAt = clash.slice(0, 3);
      log.push(res);
    }
    if (drive === "page") {
      /* CLASSROOM paging (r34): a long line, three sentences through the agent's toolApi.say, pages piece by piece: the
         first piece shows with the arrow, each tap shows the next, the last piece has no arrow and its end never waits */
      const res: any = { text: "Look at the whole strip before you start. Count the parts one at a time. Then tap the part you want to shade." };
      await toQuestion();
      await wait(3500);
      const snapP = () => ({ bubble: roleText("instruction"), held: held(), cue: cueOn() });
      A.say(res.text); await wait(200);
      res.shown = [snapP()];
      for (let k = 0; k < 6 && held(); k++) { bubbleKey(); await wait(200); res.shown.push(snapP()); }
      await wait(4500);
      res.end = snapP();
      log.push(res);
    }
    if (drive === "hint") {
      /* THE HINT (r34), first question of the phase: a miss shows the rung under the pinned instruction at once; it is the
         same 4 s later; a second miss brings the next rung; a right answer clears it. Run with and without ?classroom=1. */
      await toQuestion();
      await wait(300);
      const res: any = {};
      const v = t.nearMiss(); await wait(60);
      res.nearMiss = v;
      res.item = t.state().item;
      res.before = { instruction: A.getState().instruction, domInstr: roleText("instruction") };
      const t0 = performance.now();
      let last = "";
      res.timeline = [];
      t.submit();
      for (let k = 0; k < 40; k++) {
        const s = pinSnap(), sk = JSON.stringify(s);
        if (sk !== last) { res.timeline.push({ t: Math.round(performance.now() - t0), ...s }); last = sk; }
        await wait(30);
      }
      await wait(2800);
      res.after4s = pinSnap();
      await until(() => !t.state().locked); await wait(300);
      t.nearMiss(); await wait(60); t.submit(); await wait(500);
      res.miss2 = pinSnap();
      await until(() => !t.state().locked); await wait(300);
      t.solve(); await wait(400);
      res.right = { ...pinSnap(), stage: t.state().stage };
      log.push(res);
    }
    if (drive === "sound") {
      /* the sound button switches the sound effects only (r30). The run starts with them on (nothing starts muted), plays a
         miss and a right answer, then turns them off and on again through the host's setParam("muted"). Headless Chrome
         may keep the Web Audio context suspended: only the state and the absence of errors are judged. */
      const label = () => { const s = document.querySelector('[data-control="sound"]'); return s ? s.getAttribute("aria-label") : null; };
      const res: any = { start: A.getState().muted, startLabel: label(), thrown: null };
      try {
        await until(() => ["ask", "demo"].includes(t.state().stage));
        if (t.state().stage === "demo") { t.solve(); await until(() => t.state().stage === "ask"); }
        t.nearMiss(); await wait(60); t.submit(); await wait(300);
        await until(() => !t.state().locked);
        res.on1 = { ret: A.setParam("muted", true) }; await wait(150);
        res.on1.muted = A.getState().muted; res.on1.label = label();
        t.solve(); await wait(400);
        res.off1 = { ret: A.setParam("muted", false) }; await wait(150);
        res.off1.muted = A.getState().muted; res.off1.label = label();
        await until(() => t.state().stage === "ask", 120);
        if (t.state().stage === "ask") { t.solve(); await wait(400); }
      } catch (e: any) { res.thrown = String((e && e.message) || e); }
      log.push(res);
    }
    if (drive === "steps") {
      /* GUIDE STEPS (runtime r30; r34 hints): a phase with steps opens on the first step's line in the demo stage and waits
         for the child's act; no timer moves it. A WRONG act (r34, the dev hook __tool.did with a name the step does not
         wait for) returns false, moves nothing and shows that step's hint under the pinned instruction, the same 3 s
         later. Each right act (the agent's check(), which performs the current step through the tool's onEnter, reported
         with api.did) clears the hint and moves the bubble to the next step's line; the last act opens the question with
         its line on the bubble (after the step's hold, none under reduced motion). Raw observations only: check.mjs judges
         them against the tool's own steps. The instruction is read from data-role "instruction" (the hint is drawn apart). */
      const g = () => A.getState();
      const instr = () => roleText("instruction") || bubble();
      const res: any = { phase: g().phase };
      await until(() => typeof g().guideSteps === "number" && t.state().stage === "demo" && !!instr(), 200);
      res.guideSteps = g().guideSteps;
      res.open = { stage: g().stage, step: g().guideStep, on: g().guideOn, bubble: instr() };
      await wait(4000);
      res.after4s = { stage: g().stage, step: g().guideStep, bubble: instr() };
      if (typeof t.did === "function") {
        const before = g().guideStep;
        const returned = t.did("__not_this_step__");
        await wait(300);
        res.outOfOrder = { before, after: g().guideStep, returned, hint: g().hint, instruction: g().instruction, domHint: roleText("hint"), domInstr: roleText("instruction") };
        await wait(3000);
        res.outOfOrder.after3s = { hint: g().hint, instruction: g().instruction };
      } else res.outOfOrder = "no-hook";
      res.acts = [];
      for (let k = 0; k < 15 && g().stage === "demo" && g().guideStep < g().guideSteps; k++) {
        const s0 = g().guideStep;
        A.check();
        await until(() => g().guideStep !== s0 || g().stage !== "demo", 120);
        /* the last act: the question opens after the step's hold */
        if (g().guideStep >= g().guideSteps) await until(() => g().stage !== "demo", 100);
        await wait(150);
        const a: any = { before: s0, after: g().guideStep, stage: g().stage, bubble: instr(), hint: g().hint, hintKind: g().hintKind };
        await wait(400);
        a.settled = g().guideStep;
        res.acts.push(a);
      }
      res.end = { stage: g().stage, bubble: instr(), item: g().item };
      log.push(res);
    }
    if (drive === "hintkey") {
      /* the header's HINT key (r35, data-control "again", lightbulb): at a guide step it shows that step's hint and moves
         nothing; at an open question the first press shows the first rung, the second the stronger one, and a right answer
         clears it; with nothing to hint (a celebration) a press changes no state. It is pressed the way a keyboard does it
         (focus, Enter), which the key keeps to itself (the window's Enter never sees it). */
      const g = () => A.getState();
      const hk = () => { const el: any = document.querySelector('[data-control="again"]'); if (el) { el.focus(); key("Enter", el); } return !!el; };
      const res: any = {};
      const el0: any = document.querySelector('[data-control="again"]');
      res.label = el0 ? el0.getAttribute("aria-label") : null;
      const gk = (window as any).__geometry && (window as any).__geometry();
      const ck = gk && gk.controls.find((c: any) => c.id === "again");
      res.box = ck ? ck.box : null;
      await until(() => ["ask", "demo"].includes(t.state().stage));
      if (typeof g().guideSteps === "number" && t.state().stage === "demo") {
        await wait(300);
        const before = { instruction: g().instruction, hint: g().hint };
        const k = g().guideStep;
        hk(); await wait(250);
        res.step = { k, before, after: { instruction: g().instruction, hint: g().hint, stage: g().stage, guideStep: g().guideStep } };
      }
      if (t.state().stage === "demo") { t.solve(); await until(() => t.state().stage === "ask"); }
      await wait(300);
      res.item = t.state().item;
      res.q = { before: { hint: g().hint, hintKind: g().hintKind } };
      hk(); await wait(250); res.q.press1 = { hint: g().hint, instruction: g().instruction };
      hk(); await wait(250); res.q.press2 = { hint: g().hint, instruction: g().instruction };
      t.solve(); await wait(300);
      res.q.right = { hint: g().hint, stage: g().stage };
      if (t.state().stage === "win") {
        const b = { stage: g().stage, item: g().item, phase: g().phase, hint: g().hint };
        hk(); await wait(200);
        res.none = { before: b, after: { stage: g().stage, item: g().item, phase: g().phase, hint: g().hint } };
      }
      log.push(res);
    }
    if (drive === "pieces") {
      /* CLASSROOM PIECES (r41): with ?classroom=1, the mounted phase is played (answers only; a tap only on a parked piece,
         as a teacher pages a long line) and [data-role=instruction] is sampled every 40 ms: each change is a segment
         { text, start, end } (virtual time). check.mjs judges that every piece of a nopark line (a win line, a closing line,
         a summary row) stayed on screen for its reading time. The last phase plays on through its summary's rows (r44,
         ?simple=1: the summary says one line and reads no row, so the run stops 4 s into the page). */
      const segs: any[] = [];
      let cur: any = null;
      const t0 = performance.now();
      const iv = setInterval(() => {
        const txt = roleText("instruction") || bubble(), now = Math.round(performance.now() - t0);
        if (!cur || cur.text !== txt) { if (cur) cur.end = now; cur = { text: txt, start: now, stage: t.state().stage }; if (segs.length < 400) segs.push(cur); }
      }, 40);
      const mp = A.getState().phase, last = A.getState().phase === A.getState().phases;
      const deadline = performance.now() + 240000;
      while (performance.now() < deadline) {
        const s = t.state();
        if (!last && s.phase !== mp) { await wait(600); break; }
        if (last && s.stage === "summary" && q.get("simple") === "1") { await wait(4000); break; }   /* r44: one line, no rows */
        if (last && s.stage === "summary") { await until(() => A.getState().summaryRow === A.getState().phases - 1, 900); await until(() => A.getState().summaryRow !== A.getState().phases - 1, 300); await wait(600); break; }
        if (s.stage === "demo") { t.solve(); await until(() => t.state().stage !== "demo", 120); continue; }
        if (s.stage === "ask") { const it = s.item; t.solve(); await until(() => t.state().item !== it || !["ask", "win"].includes(t.state().stage), 400); continue; }
        if (held()) { bubbleKey(); await wait(200); continue; }
        await wait(100);
      }
      clearInterval(iv);
      if (cur && cur.end === undefined) cur.end = null;
      log.push({ phase: mp, last, segs });
    }
    if (drive === "ladder") {
      /* THE HINT LADDER (r41): at an open question the header's Hint key is pressed twice (the first rung, then the stronger
         one), then a wrong answer: the hint must not drop back to a weaker rung (never the item's own miss line again) */
      await toQuestion();
      await wait(300);
      const hk = () => { const el: any = document.querySelector('[data-control="again"]'); if (el) { el.focus(); key("Enter", el); } return !!el; };
      const res: any = { phase: t.state().phase, item: t.state().item, key: hk() };
      await wait(250); res.press1 = A.getState().hint;
      hk(); await wait(250); res.press2 = A.getState().hint;
      t.nearMiss(); await wait(60); t.submit(); await wait(400);
      res.afterMiss = A.getState().hint; res.domHint = roleText("hint");
      log.push(res);
    }
    if (drive === "choiceline") {
      /* THE CHOOSE LINE (r41): on a choice question a tap on the Answer key brings the built-in line in a NEUTRAL band
         (getState().hint is UI.pickIt, never UI.typeIt), and a wrong choice then shows its hint in the accent band. The
         band's two rects are read (the band, and the 5-wide bar); a tight layout has the bar only. */
      const res: any = { lang: q.get("lang") || "en", board: !!t.board };
      const total = A.getState().steps;
      for (let st = 0; st < total && !res.found; st++) {
        A.gotoStep(st); await wait(250);
        await until(() => t.state().stage === "ask", 40);
        if (A.getState().stage === "ask" && A.getState().choices) res.found = true;
      }
      if (res.found) {
        await wait(300);
        res.phase = t.state().phase; res.item = t.state().item;
        const band = () => {
          const g = document.querySelector('[data-zone="bubble"] [data-role="hint"]'); if (!g) return null;
          const rs = Array.from(g.querySelectorAll("rect")) as any[];
          const bar = rs.find((r) => Number(r.getAttribute("width")) <= 6), bd = rs.find((r) => Number(r.getAttribute("width")) > 6);
          return { band: bd ? getComputedStyle(bd).fill : null, bar: bar ? getComputedStyle(bar).fill : null };
        };
        const ak: any = document.querySelector('[data-control="answer-open"]');
        /* a cardAnswer tool (r49) has no Answer key on a choice question: its keys stand in the question bar and the choose line is up at the open */
        res.answerKey = !!ak || !!document.querySelector('[data-zone="ask"] [data-control^="choice-"]');
        if (ak) { ak.focus(); key("Enter", ak); await wait(400); }
        res.line = A.getState().hint; res.lineDom = roleText("hint"); res.lineBand = band();
        t.nearMiss(); await wait(60); t.submit(); await wait(500);
        res.miss = A.getState().hint; res.missBand = band();
      }
      log.push(res);
    }
    const SELF = ["classroom", "sound", "steps", "page", "hint", "hintkey", "pieces", "ladder", "choiceline", "mute", "blocked"];
    if (!SELF.includes(drive)) await until(() => ["ask", "demo"].includes(t.state().stage));
    if (SELF.includes(drive)) { /* measured above */ }
    else if (drive === "agent") {

      /* the teacher agent: nothing but window.toolApi (answers from the dev key, as the agent has them from the plan).
         A phase before the last walks on to the next by itself: the run stops there (no finished yet). */
      const mp = A.getState().phase, walks = A.getState().phases > mp;
      for (let k = 0; k < 12 && !A.getState().complete; k++) {
        await until(() => ["ask", "demo", "summary"].includes(A.getState().stage) || A.getState().complete);
        if (A.getState().stage === "summary" || A.getState().complete) break;
        if (A.getState().stage === "demo") await agentDemo();
        const s0 = A.getState();
        const ans = t.state().key;
        log.push({ item: s0.item, answer: A.answer(ans), shownBefore: s0.answerShown });
        await wait(40); A.check(); await wait(200);
        if (A.getState().stage === "ask" && A.getState().item === s0.item && !A.getState().complete) { A.check(); }
        /* an agent that says next() after the last right answer must not reopen it (the phase ends by itself) */
        if (s0.item === s0.items) { await wait(150); log.push({ lastNext: A.next(), stageAfterNext: A.getState().stage }); }
        await until(() => A.getState().item !== s0.item || A.getState().phase !== mp || A.getState().complete);
        if (walks && A.getState().phase !== mp) { log.push({ walked: A.getState().phase === mp + 1, eventsAtWalk: (window as any).__events.length }); break; }
      }
      if (!walks) await until(() => A.getState().complete, 1200);
    } else if (t.state().stage === "demo") { t.solve(); await until(() => t.state().stage === "ask"); }
    if (drive === "keys") {
      /* the keyboard path: the first question typed on the digit keys, in any phase (a question answered
         on the working area is reached with Tab + Enter, which finger-boxes proves); type it and Enter */
      /* a two-part answer (quotient and remainder) is typed box by box: digits, Enter, digits, Enter */
      /* a mixed number's empty box (null) is typed as nothing: Enter alone moves on or answers */
      const seqOf = (k: any) => (Array.isArray(k) ? k.map((x: any) => (x === null ? "" : String(x))) : [String(k)]);
      /* a decimal ("0.09") is typed with the keyboard's "." when the pad has a point key (tool.pointKey) */
      const point = () => !!document.querySelector('[data-control="key-point"]');
      const typable = (k: any) => seqOf(k).every((x: string) => (!Array.isArray(k) && point() ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/).test(x)) && seqOf(k).some((x: string) => x !== "");
      let s0 = t.state(), ans = s0.key;
      const TA = (window as any).toolApi;
      for (let st = TA.getState().step + 1; !typable(ans) && st < TA.getState().steps; st++) {
        TA.gotoStep(st); await wait(200);
        /* a phase's teach can run past 10 s even muted: wait for its question as long as the other waits */
        await until(() => t.state().stage === "ask" || t.state().stage === "demo");
        if (t.state().stage === "demo") { t.solve(); await until(() => t.state().stage === "ask"); }
        s0 = t.state(); ans = s0.key;
      }
      if (!typable(ans)) log.push({ noDigitQuestion: true });
      else {
        await until(() => t.state().stage === "ask"); /* digits typed during a teach are ignored */
        const seq = seqOf(ans);
        for (let b = 0; b < seq.length; b++) {
          for (const ch of seq[b]) { key(ch); await wait(20); }
          if (b < seq.length - 1) { key("Enter"); await wait(120); }
        }
        log.push({ typed: t.state().typed, parts: seq.length > 1 });
        key("Enter"); await wait(250);
        const tok: any = document.querySelector('[data-control="loose"]');
        if (t.state().stage === "ask" && tok) { tok.focus(); key("Enter", tok); }
        await until(() => t.state().item !== s0.item || t.state().stage === "win" || t.state().finished, 200);
        log.push({ advanced: t.state().stage === "win" || t.state().item !== s0.item });
      }
      /* a phase dot, from the keyboard: focus it and press Enter */
      const p0 = t.state().phase, to = p0 === 2 ? 1 : 2;
      /* class 4 r27: a navDots tool's dot is data-control "phase-dot" with data-phase */
      const dot: any = document.querySelector('[data-control="phase-' + to + '"]') || document.querySelector('[data-control="phase-dot"][data-phase="' + to + '"]');
      if (dot) { dot.focus(); key("Enter", dot); await until(() => t.state().phase !== p0, 60); log.push({ dotJump: t.state().phase === to }); }
    }
    if (drive === "wrong") {
      const s0 = t.state();
      const v = t.nearMiss(); await wait(60);
      if (RT.silent) {
        /* A SILENT runtime: the bubble from the miss on, every 30 ms for 1.2 s, each change with its time: getState()'s instruction
           and hint, the bubble's two drawn roles and what the slot held (hint-pinned: the hint is under the pinned instruction at
           once, the child's answer still in the slot); then the same 4 s after the miss (the hint stays as it is) */
        const timeline: any[] = [], before = { instruction: A.getState().instruction, domInstr: roleText("instruction") }, t0 = performance.now();
        let last = "";
        t.submit();
        for (let k = 0; k < 40; k++) {
          const s = pinSnap(), sk = JSON.stringify(s);
          if (sk !== last) { timeline.push({ t: Math.round(performance.now() - t0), text: bubble(), ...s }); last = sk; }
          await wait(30);
        }
        await wait(2800);
        const after4s = pinSnap();
        await until(() => !t.state().locked); await wait(200);
        const s1 = t.state();
        log.push({ nearMiss: v, typedKept: String(s1.typed) === String(v) || String(s1.typed) === "", sameItem: s1.item === s0.item, stage: s1.stage, key: s0.key, item: s0.item,
          pin: { nearMiss: v, before, timeline, after4s } });
      } else {
        /* a VOICED runtime: its rung is spoken, there is no bubble timeline to sample; this is the run class 4 always made */
        t.submit(); await wait(300);
        await until(() => !t.state().locked); await wait(200);
        const s1 = t.state();
        log.push({ nearMiss: v, typedKept: String(s1.typed) === String(v) || String(s1.typed) === "", sameItem: s1.item === s0.item, stage: s1.stage, key: s0.key });
      }
    }
    if (drive === "solve") { t.solve(); await until(() => t.state().stage !== "ask"); }
    if (drive === "idle" || drive === "free" || drive === "again") {
      /* play every question of the mount. A phase mount before the last walks on to the next phase by
         itself: the idle run stops there (no finished yet). A whole lesson and the last phase go on to
         the summary page. */
      const mp = t.state().phase, walks = drive === "idle" && q.get("phase") !== "none" && A.getState().phases > mp;
      for (let k = 0; k < 60 && !t.isDone(); k++) {
        await until(() => ["ask", "summary", "demo"].includes(t.state().stage) || t.isDone() || (walks && t.state().phase !== mp));
        const st = t.state().stage;
        if (walks && t.state().phase !== mp) break;
        if (t.isDone() || st === "summary") break;
        if (st === "demo") { t.solve(); await until(() => t.state().stage !== "demo"); continue; }
        const before = t.state().item, ph = t.state().phase;
        t.solve();
        await until(() => t.isDone() || t.state().item !== before || t.state().phase !== ph || t.state().stage !== "ask");
      }
      if (drive === "idle" && walks) {
        /* settle on the next phase's first screen, then say whether it walked (and sent nothing) */
        await until(() => ["ask", "demo"].includes(t.state().stage), 400);
        log.push({ walked: t.state().phase === mp + 1, events: (window as any).__events.length });
      } else if (drive === "idle") { await until(() => t.isDone(), 1200); await wait(1500); }
      else {
        /* on the summary page, before finished goes: Free play or Play again */
        await until(() => t.state().stage === "summary", 600);
        await wait(1500);
        const btn: any = document.querySelector('[data-control="' + (drive === "free" ? "free-play" : "play-again") + '"]');
        const before = (window as any).__events.length;
        if (btn) { btn.focus(); key("Enter", btn); }
        await wait(800);
        const s1 = t.state();
        await wait(50000); /* longer than the summary's 45 s backstop: finished must still not come */
        log.push({ pressed: !!btn, stageAfter: s1.stage, phaseAfter: s1.phase, eventsBefore: before, eventsAfter: (window as any).__events.length,
          liveControls: Array.from(document.querySelectorAll('[data-zone="work"] [data-control]')).length });
      }
    }
    document.documentElement.setAttribute("data-drive-done", drive);
    const out: any = { drive, state: t.state(), api: A.getState(), apiKeys: Object.keys(A), apiAlias: !!(window as any)[t.toolId],
      oracleOk: t.oracleOk(), events: (window as any).__events, all: (window as any).__all, log, at: Math.round(performance.now()) };
    if (q.get("probe") === "1") {
      out.probe = (window as any).__probe;
      /* a board tool (runtime r27+): a question is first sampled with the answer panel shut (the picture at its widest,
         the Answer key in the bar), then with it open, so the keypad's shape is judged as it is on a child's screen */
      if (t.board && t.state().stage === "ask") { if (!t.state().panel) out.geometryShut = geometry(); t.openAnswer(); await wait(600); }
      out.geometry = geometry();
    }
    const pre = document.createElement("pre");
    pre.id = "__drive"; pre.hidden = true;
    pre.textContent = JSON.stringify(out);
    document.body.appendChild(pre);
  })();
}
`;

function page(title, js, rt) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${title}</title>
<style>
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid}
html,body{margin:0;height:100%}
body{display:flex;align-items:center;justify-content:center;background:#E8E2D6;font-family:Poppins,"Segoe UI",system-ui,sans-serif;overflow:hidden}
svg{display:block;vertical-align:middle}
#root{display:flex;align-items:center;justify-content:center;width:100%;height:100%}
</style>
<script>window.__RT = ${JSON.stringify(rt)};</script>
<script>if (new URLSearchParams(location.search).get("probe") === "1") {${PROBE}}
if (new URLSearchParams(location.search).has("fakevoice")) {${FAKEVOICE}}</script>
</head><body>
<div id="root"></div>
<script>${js}</script>
</body></html>`;
}

export async function buildPreview(dir) {
  const { build } = await import("esbuild");
  const id = idOf(dir);
  const { tool: toolSrc, combined, runtime } = sources(dir);
  const rt = rtFlags(capsOf(runtime));
  const warnings = hostScope(combined, toolSrc);

  const tmp = path.join(dir, ".build");
  fs.mkdirSync(tmp, { recursive: true });
  fs.writeFileSync(path.join(tmp, "tool.bundle.tsx"), combined);
  fs.writeFileSync(path.join(tmp, "entry.tsx"), ENTRY);
  let r;
  try {
    r = await build({
      entryPoints: [path.join(tmp, "entry.tsx")], bundle: true, write: false, format: "iife",
      platform: "browser", target: "es2020", jsx: "transform", jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment", nodePaths: [fromRoot("node_modules")], logLevel: "silent",
      define: { "process.env.NODE_ENV": '"development"' }, absWorkingDir: tmp,
    });
  } catch (e) {
    const lines = (e.errors || []).map((x) => `  ${x.location ? path.basename(x.location.file) + ":" + x.location.line + "  " : ""}${x.text}`);
    throw new Error("BUILD FAILED\n" + (lines.join("\n") || e.message));
  }
  const nameMatch = /const TOOL_NAME = "([^"]*)"/.exec(toolSrc);
  const html = page(`${nameMatch ? nameMatch[1] : id} · ${id} · preview`, r.outputFiles[0].text, rt);
  const out = path.join(dir, `${id}.preview.html`);
  fs.writeFileSync(out, html);
  return { out, bytes: Buffer.byteLength(html), toolBytes: Buffer.byteLength(toolSrc), combinedBytes: Buffer.byteLength(combined), warnings };
}
