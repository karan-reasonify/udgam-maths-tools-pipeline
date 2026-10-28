/* port <MEDIA_ID>: the checked source -> the standalone pair the host serves.
 *
 *   output-preview/<chapter_id>/<MEDIA_ID>/<MEDIA_ID>.tsx   ONE file: the react import, @use-gesture inlined as a
 *                                                closure (the host strips imports), runtime + mascot +
 *                                                tool with types, comments and the dev driver removed,
 *                                                `export default <Component>;` last
 *   output-preview/<chapter_id>/<MEDIA_ID>/<MEDIA_ID>.json  the complete sidecar: ids, the plan's writeup and
 *                                                phase map verbatim, every question with its answer
 *                                                key, host contract, modes, toolApi, events, scoring
 *
 * Port refuses unless `check` passed on this exact source (status.json holds its hash). The .tsx is
 * then proved in the host emulator (hostsim) before publish will touch it. It never overwrites a HAND-EDITED pair (a small
 * change made in the pair itself, proved by `approve`: lib/check/approve.mjs) unless --force, which loses those edits.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { CONFIG, CLASS_DIR, fromRoot } from "../core/env.mjs";
import { capsOf } from "../core/caps.mjs";
import { sources } from "../build/preview.mjs";
import { loadModel } from "../check/model.mjs";
import { hashOf } from "../check/check.mjs";
import { idOf, chapterOf, readStatus, writeStatus } from "../core/work.mjs";
import { hostsim } from "./hostsim.mjs";

const REACT_LINE = 'import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";';
const HOOKS = new Set(["useState", "useEffect", "useRef", "useMemo", "useCallback"]);
const req = createRequire(import.meta.url);
const version = (m) => { try { return req(`${m}/package.json`).version; } catch { return "?"; } };
export const md5 = (buf) => crypto.createHash("md5").update(buf).digest("hex");

export const outDir = (dir) => fromRoot(path.join(CONFIG.outDir, chapterOf(dir), idOf(dir)));

/* A HAND-EDITED pair (runbook "Small changes to one tool"): its .tsx is not the one port wrote (status.ported.tsxMd5).
   It is APPROVED while status.handEdit names these exact bytes (both md5s), written by `approve`. Pure (publish.test.mjs). */
export function handEditOf(st, tsxMd5, jsonMd5) {
  const he = st.handEdit;
  const approved = !!he && he.tsxMd5 === tsxMd5 && he.jsonMd5 === jsonMd5;
  /* a .json-only edit counts too: port records the .json's md5 from now on (an older record has none, then only the .tsx and an
     approval tell), and an approved pair is hand-edited by definition */
  return { edited: approved || !!(st.ported && ((st.ported.tsxMd5 && tsxMd5 && st.ported.tsxMd5 !== tsxMd5) || (st.ported.jsonMd5 && jsonMd5 && st.ported.jsonMd5 !== jsonMd5))),
    approved, at: he ? he.at : null, notes: (he && he.notes) || [] };
}
export const handEditLine = (h) => `hand-edited pair (${h.approved ? "approved" : "not approved"}); \`port --force\` overwrites it and loses those edits: ${
  h.notes.map((n) => n.note).filter(Boolean).join("; ") || "(no note recorded)"}`;
/* the slot's pair as it is on disk now: null when there is none */
export function pairState(dir) {
  const f = path.join(outDir(dir), idOf(dir));
  if (!fs.existsSync(f + ".tsx") || !fs.existsSync(f + ".json")) return null;
  const tsxMd5 = md5(fs.readFileSync(f + ".tsx")), jsonMd5 = md5(fs.readFileSync(f + ".json"));
  return { ...handEditOf(readStatus(dir), tsxMd5, jsonMd5), tsxMd5, jsonMd5 };
}

/* @use-gesture/react as one closure; its `react` is the host's global React */
async function gestureBlock() {
  const { build } = await import("esbuild");
  const shim = { name: "react-global", setup(b) {
    b.onResolve({ filter: /^react$/ }, () => ({ path: "react", namespace: "react-global" }));
    b.onLoad({ filter: /.*/, namespace: "react-global" }, () => ({ loader: "js", contents: "const R = React; export default R;" }));
  } };
  const r = await build({
    stdin: { contents: 'export { useDrag } from "@use-gesture/react";', resolveDir: fromRoot("."), loader: "js" },
    bundle: true, write: false, format: "iife", globalName: "__gesture", platform: "browser", target: "es2019",
    minify: true, legalComments: "none", define: { "process.env.NODE_ENV": '"production"' }, plugins: [shim], logLevel: "silent",
  });
  let js = r.outputFiles[0].text.trim().replace(/^var __gesture\s*=/, "const __gesture =");
  if (!js.startsWith("const __gesture =")) throw new Error("unexpected library bundle shape");
  if (/\brequire\(|process\.env|^\s*export\s/m.test(js)) throw new Error("the bundled library still has require(), process.env or an export");
  return js;
}

/* the host's own scope rules, applied to the SHIPPED file (TOOL_PASS host_hooks + the export surface) */
export function shipScope(tsx) {
  const probs = [];
  const lines = tsx.split(/\r?\n/);
  const imports = lines.filter((l) => /^\s*import\s/.test(l));
  if (imports.length !== 1 || imports[0].trim() !== REACT_LINE) probs.push(`imports: ${JSON.stringify(imports)}`);
  const own = new Set([...tsx.matchAll(/(?:function|const|let|var)\s+(use[A-Z]\w*)/g)].map((m) => m[1]));
  const bare = [...new Set([...tsx.matchAll(/(?<![.\w])(use[A-Z]\w*)\s*\(/g)].map((m) => m[1]))].filter((h) => !HOOKS.has(h) && !own.has(h));
  if (bare.length) probs.push(`hooks the host does not inject: ${bare.join(", ")}`);
  const last = lines.filter((l) => l.trim()).pop().trim();
  if (!/^export default [A-Za-z_$][\w$]*;$/.test(last)) probs.push(`last line is not "export default <Identifier>;": ${last.slice(0, 60)}`);
  if (lines.filter((l) => /^\s*export\s/.test(l)).length !== 1) probs.push("an export line besides the default");
  if (/export\s+default\s+function|export\s+interface/.test(tsx)) probs.push("export default function / export interface");
  if (/\brequire\s*\(/.test(tsx)) probs.push("require( appears (the host rewrites every require(...) to undefined)");
  if (/<\/script/i.test(tsx)) probs.push("</script appears (it would end the host's inline script)");
  if (/__tool\b|dev:start/.test(tsx)) probs.push("the dev driver is still in the file");
  /* the ONE network call a tool may make is the runtime's clip loader, `fetch(voiceBase() + uri)`: a published
     tool's voice clips are files beside it (lib/ship/voiceship.mjs), and that call reads them. Nothing else. A silent
     runtime still carries the loader's code, unreached, so the allowance stays. */
  if (/localStorage|sessionStorage|indexedDB|XMLHttpRequest|\bfetch\(|WebSocket|sendBeacon/.test(tsx.split("fetch(voiceBase() + uri)").join(""))) probs.push("storage or network API in the file");
  return probs;
}

export async function port(dir, { force = false, replaceHandEdit = force } = {}) {
  const st = readStatus(dir);
  const he = pairState(dir);
  if (he && he.edited && !replaceHandEdit) throw new Error(handEditLine(he));
  const hash = hashOf(dir);
  if (!force && (!st.checks || st.checks.fail !== 0 || st.checkedTool !== hash))
    throw new Error(st.checkedTool !== hash ? "the source changed since the last check; run: node cli.mjs check <id>" : "the last check failed; fix it and run check again");
  const { build, transform } = await import("esbuild");
  const { combined, runtimeVersion, runtime } = sources(dir);
  /* what the chapter's pinned runtime is (lib/core/caps.mjs): a VOICED runtime's sidecar and header say what they always
     said; a SILENT runtime's say that the lesson is printed. Never a runtime number. */
  const caps = capsOf(runtime), silent = caps.silent;
  const m = await loadModel(dir);
  const id = idOf(dir);

  /* 1. the body: no imports, no dev driver, no types, no comments; JSX kept for the host's Babel */
  let body = combined.replace(/\/\* dev:start[\s\S]*?\/\* dev:end \*\//g, "");
  body = body.split(/\r?\n/).filter((l) => !/^\s*import\s/.test(l)).join("\n");
  const t = await transform(body, { loader: "tsx", jsx: "preserve", target: "es2019", legalComments: "none", charset: "utf8", format: "esm" });
  body = t.code.trim();
  if (!/export default [A-Za-z_$][\w$]*;$/.test(body)) {
    const mm = /export\s*\{\s*([A-Za-z_$][\w$]*)\s+as\s+default\s*\};?\s*$/.exec(body);
    if (mm) body = body.replace(mm[0], `export default ${mm[1]};`);
  }

  /* 2. the shipped file */
  const lib = await gestureBlock();
  const header = `/* ${id} · ${m.TOOL_ID} · ${m.TOOL_NAME} — standalone build ${new Date().toISOString().slice(0, 10)}, source ${hash}.
   One file: the react import below is the only one (the host strips it and injects React and five hooks);
${silent
    ? `   @use-gesture/react ${version("@use-gesture/react")} (MIT) is inlined as __gesture; the mascot is an inline WebP; the lesson
   is silent (printed bubble lines and Web Audio sound effects, no speech); nothing is stored or fetched. */`
    : `   @use-gesture/react ${version("@use-gesture/react")} (MIT) is inlined as __gesture; the mascot and any baked
   voice are inline WebP / data URIs; nothing is stored, and the only fetch is a published tool's voice-clip file (TOOL_VOICE_BASE). */`}`;
  const tsx = [REACT_LINE, header, lib, "const useGestureDrag = __gesture.useDrag;", body].join("\n") + "\n";
  const probs = shipScope(tsx);
  await transform(tsx, { loader: "tsx", jsx: "preserve", logLevel: "silent" }).catch((e) => probs.push("does not parse: " + e.message.split("\n")[0]));
  const kbSize = Buffer.byteLength(tsx) / 1024;
  /* a tool on a silent runtime carries no clips, so the 1 MB limit holds. The 4 MB allowance is for a tool that
     declares TOOL_VOICE (a voiced runtime's baked Hindi/Gujarati): its LOCAL pair carries the clips inline, and
     publish uploads a ship copy with the clips as <sha1>.ogg files, which must fit the host's 1 MB hard limit */
  const maxKb = /const TOOL_VOICE\s*[:=]/.test(tsx) ? 4096 : 1024;
  if (kbSize > maxKb) probs.push(`${kbSize.toFixed(0)} KB is over the ${maxKb / 1024} MB hard limit`);
  if (probs.length) throw new Error("the shipped file breaks the host contract:\n  - " + probs.join("\n  - "));

  /* 3. the sidecar, in the shape the NCERT tools ship for phase mounts, with Udgam's facts */
  const slot = JSON.parse(fs.readFileSync(path.join(dir, "slot.json"), "utf8"));
  const boardTool = /\bboard\s*:\s*true/.test(fs.readFileSync(path.join(dir, "tool.tsx"), "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "")) && caps.board;
  const tc = slot.tool_config || {}, w = slot.writeup || {}, q = tc.tool_questions || {};
  const planQ = {};
  (tc.phase_map || []).forEach((pm) => {
    ((q.learn && q.learn.items) || []).filter((x) => +x.phase === +pm.n).forEach((x) => { planQ[`${pm.concept_id}:${x.slot}`] = { question: x.question, answer: x.answer }; });
    ((q.practice && q.practice.items) || []).filter((x) => +x.phase === +pm.n).forEach((x) => { planQ[`${pm.concept_id}:${x.q_no}`] = { question: x.question, answer: x.final_answer ?? x.answer }; });
  });
  const key = (it) => (m.agentKey ? m.agentKey(it) : it.answer);
  const nItems = m.PHASES.reduce((a, p) => a + p.items.length, 0);
  const used = new Set(m.PHASES.flatMap((p) => p.items.map((it) => it.qid).filter(Boolean)));
  const shared = (() => { const mm = /api\.share\(\{([\s\S]*?)\}\)/.exec(fs.readFileSync(path.join(dir, "tool.tsx"), "utf8")); return mm ? [...mm[1].matchAll(/([A-Za-z_]\w*)\s*:/g)].map((x) => x[1]) : []; })();
  // both files are named by the slot id: the plan's mount id, the JSON's slotId, the last part of its 2d_tool_url
  if (slot.id && slot.id !== id) throw new Error(`the folder ${id} is not the plan's slot id ${slot.id}`);
  if (slot["2d_tool_url"] && !slot["2d_tool_url"].endsWith(`/${id}/${id}.tsx`)) throw new Error(`the plan's 2d_tool_url does not end in /${id}/${id}.tsx: ${slot["2d_tool_url"]}`);
  const out = outDir(dir);
  fs.mkdirSync(out, { recursive: true });
  const tsxFile = path.join(out, `${id}.tsx`), jsonFile = path.join(out, `${id}.json`);
  fs.writeFileSync(tsxFile, tsx);
  const N = m.PHASES.length;
  /* class 4 r27 (LAYOUT.md §1d): keyOnly and navDots move the stage's boxes; the sidecar names them from the runtime's own (ZKEY, footerBoxes) */
  const toolBare = fs.readFileSync(path.join(dir, "tool.tsx"), "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
  const keyOnlyTool = boardTool && caps.keyOnly && /\bkeyOnly\s*:\s*true/.test(toolBare) && !!m.ZKEY, navDotsTool = caps.navDots && /\bnavDots\s*:\s*true/.test(toolBare);
  const fb = (keyOnlyTool || navDotsTool) && m.footerBoxes ? m.footerBoxes(keyOnlyTool, navDotsTool, N) : null;
  const box = (b) => [b.x, b.y, b.w, b.h];
  const r27 = !fb ? null : {
    ...(keyOnlyTool ? { canvas: box(m.ZKEY.canvas), phase: box(m.ZKEY.work), phaseWithPanel: [64, 108, /\bbigPad\s*:\s*true/.test(toolBare) ? 900 : 1086, 520],
      ask: box(m.KEY_CORNER), drawer: box(m.ZKEY.drawer), slot: box(m.ZKEY.slot), pad: box(m.ZKEY.pad),
      layout: "board, key only: no question bar, only its key at the right end of the top row (the question is on the bubble); the working area is the whole card (64, 108, 1472 x 520) until the child taps Answer, when the answer drawer (as tall as the working area, the key on its top row reading Close) slides in from the right" } : {}),
    bubble: box(fb.bubble), ...(navDotsTool ? { bar: box(fb.dots) } : {}),
    ...(navDotsTool ? { dots: `one small dot per phase at the footer's right (72-unit finger boxes, centred on the bubble), no text; in user AND AI mode each is a button (data-control phase-dot, data-phase k) that starts its phase` } : {}) };
  /* the languages the tool really ships (NCERT sidecars list theirs the same way): English, plus Hindi and
     Gujarati when its TR table (docs/PATTERNS.md §11) has entries for them */
  const langs = ["en"];
  const trBlock = (/\bconst TR\b[^\n]*=\s*\{[\s\S]*?\r?\n\};/.exec(fs.readFileSync(path.join(dir, "tool.tsx"), "utf8")) || [""])[0];
  /* a language counts when its table has a first key: `hi: {` then, past any whitespace or comments, a quote */
  const hasKeys = (l) => new RegExp("\\b" + l + "\\s*:\\s*\\{(?:\\s|/\\*[\\s\\S]*?\\*/|//[^\\n]*)*\"").test(trBlock);
  if (hasKeys("hi")) langs.push("hi");
  if (hasKeys("gu")) langs.push("gu");
  const sidecar = {
    slotId: id, mediaId: id, toolId: m.TOOL_ID, title: slot.title || m.TOOL_NAME, component: `${id}.tsx`,
    subtype: slot.subtype || "simulation", grade: CONFIG.defaults.class, chapter: st.chapterId || chapterOf(dir),
    publication: CONFIG.defaults.pub, planId: st.planId, planVersion: st.version, url: slot["2d_tool_url"] || null,
    description: slot.description, conceptIds: m.PHASES.map((p) => p.conceptId), languages: langs,
    modes: "none. One flow, one phase at a time. The host mounts a phase (phase prop). With navigableDots true, or no phase, the child may jump phases with the dots (user mode); otherwise the dots show progress and the teacher agent drives window.toolApi (AI mode). The last phase, and a whole lesson, end on the summary page, where Free play and Play again sit." + (navDotsTool ? " With navDots the dots are controls in AI mode too: a tap on a dot starts that phase." : ""),
    stage: {
      viewBox: "0 0 1600 900", margin: 40,
      sizing: "the frame is min(100vw, 177.78vh) wide and min(100vh, 56.25vw) tall (dvh where supported); the svg fills it. Nothing scrolls.",
      bands: {
        header: `0 to 80. One line: the tool name, a measured dot, the phase concept; ${silent ? "Hint" : "again"}, sound and restart as round controls far right.`,
        canvas: keyOnlyTool
          ? "92 to 640. One rounded card holding the key at its top right (Answer, Close, Enter, Next, or the Yes / No keys; no question bar), the working area (the whole card until Answer is tapped) and the answer drawer that slides in from the right; the summary page covers it at the end."
          : boardTool
          ? "92 to 746. One rounded card holding the question bar with its Answer key, the running count, the working area (the whole card until Answer is tapped) and the answer panel that slides in from the right; the summary page covers it at the end."
          : "92 to 746. One rounded card holding the running count, the working area, the question, the answer box and the keypad; the summary page covers it at the end.",
        footer: keyOnlyTool ? `652 to 900. The mascot at the far left on its ground line, the speech bubble beside it (y 656 to 892, the question and every line, printed)${navDotsTool ? ", one small dot per phase at the right" : ", the phase dots and the phase and question counts at the right"}.`
          : navDotsTool ? "758 to 900. The mascot at the far left on its ground line, the speech bubble beside it, one small dot per phase at the right."
          : "758 to 900. The mascot at the far left on its ground line, the speech bubble beside it, the phase dots and the phase and question counts at the right.",
      },
      zones: { header: [0, 0, 1600, 80], canvas: [40, 92, 1520, 654], ...(boardTool
        ? { runs: [64, 110, 330, 76], phase: [64, 202, 1472, 528], phaseWithPanel: [64, 202, 1086, 528], ask: [64, 104, 1472, 88], slot: [1180, 218, 340, 92], pad: [1180, 324, 340, 390], drawer: [1164, 202, 372, 528],
            layout: "board: the question and the Answer key in a bar on top; the working area is the whole card until the child taps Answer, when the answer box and keypad slide in from the right and the area narrows to 1086" }
        : { runs: [64, 108, 330, 76], phase: [64, 202, 1086, 528], ask: [1186, 108, 356, 134], slot: [1186, 250, 356, 92], pad: [1170, 368, 388, 363] }),
        voice: [28, 704, 204, 194], mascot: [28, 738, 204, 160], bubble: [254, 748, 656, 144], bar: [930, 782, 630, 58],
        controls: silent ? "circles r 28 at cx 1388, 1460, 1532, cy 40: Hint (data-control again), sound, restart; 72-unit finger boxes"
          : "circles r 28 at cx 1388, 1460, 1532, cy 40: again, sound, restart; 72-unit finger boxes",
        dots: `one pill per phase across bar, pitch ${Math.round(630 / N)}; in user mode each is a button with a 72-tall finger box`, ...(r27 || {}) },
      noSidebar: "There is no sidebar. The canvas takes every unit the chrome can spare.",
      noScoreBox: "There is no score box on the stage. The score leaves on finished and onComplete and is shown once, as stars on the summary page.",
    },
    writeup: w,
    writeupDetail: { phases: m.PHASES.map((p, k) => {
      const wp = (w.phases || [])[k] || {};
      return { n: p.n, screen: wp.screen || null, win: wp.win || null, traceback: p.traceback || null, ladder: [...p.items.map((it) => it.miss), ...(p.ladder || [])] };
    }) },
    model: { ...(m.MODEL || {}), items: m.PHASES.flatMap((p) => p.items.map(({ say, ask, miss, choices, ...rest }, k) => ({ phase: p.n, item: k + 1, ...rest }))) },
    onWrong: {
      /* MISS CLEARS THE SLOT (caps.missClears, 2026-10-28); an older runtime's sidecar keeps its words byte for byte */
      marks: caps.missClears ? "Nothing is marked, no colour means good or bad. The miss empties the answer slot at once (every digit, every box, a picked choice), so it is empty through the traceback; the pad re-opens empty after it."
        : "Nothing is marked, nothing resets, no colour means good or bad. The child's answer stays; the pad re-opens after the traceback.",
      tracebacks: m.PHASES.map((p) => `Phase ${p.n}: ${p.traceback || "the working area redraws the mathematics in steps."}`),
    },
    /* the key keeps its NCERT shape. A SILENT runtime (r30+): nothing is spoken (rate and pitch are kept for the shape
       only and nothing reads them); a VOICED runtime: the device's voice and the baked clips */
    voice: silent ? {
      silent: true,
      rate: (m.VOICE || {}).rate ?? 0.92, pitch: (m.VOICE || {}).pitch ?? 1.06,
      opening: (m.OPENING || [])[0] || null, onFreePlay: m.FREE_LINE || null, onMiss: "the item's own miss line, then the phase's two ladder rungs, shown at once UNDER the pinned instruction and kept until the child acts again", onFinish: m.FINISH_LINE || null,
      rules: "Silent: nothing is spoken (no device speech, no recorded clips, no Tap to start cover). The speech bubble is the guide: every instruction and hint is one printed page, numbers as words. The lesson is action-driven in every mode: a guide step's instruction stays until the child does the act it names; a wrong act shows that step's hint under the pinned instruction, a wrong answer the next rung of its ladder, and the hint stays unchanged until the child acts again; a right answer's next question, a phase's next phase and the summary's rows follow by themselves after a short celebration. The header's Hint key shows the step's hint or the next rung on demand. What is heard is sound effects (Web Audio), switched by the sound button, on in every mode. In classroom mode nothing waits for a tap except the pieces of a long line (the blinking arrow; a tap, Enter, Space, ArrowRight or PageDown on the bubble shows the next piece), and a tap on the bubble when nothing waits is the teacher's skip.",
    } : {
      rate: (m.VOICE || {}).rate ?? 0.92, pitch: (m.VOICE || {}).pitch ?? 1.06,
      opening: (m.OPENING || [])[0] || null, onFreePlay: null /* a voiced runtime's sidecar has always said null here (its model did not export FREE_LINE); kept so a re-port of a voiced chapter stays byte-identical */, onMiss: "the item's own miss line, then the phase's two ladder rungs", onFinish: m.FINISH_LINE || null,
      rules: "Spoken on opening, as each phase begins, on each question, on a miss and on the summary page. Every line is printed in the bubble, numbers as words, by the device's own voice (Indian English first). Muting keeps the child's place; unmuting speaks on from the word it reached. If the browser refuses speech until a tap, the first line waits behind a Tap to start cover.",
    },
    guide: { tour: [], playsOn: !silent ? "none: an Udgam tool opens straight on its phase; the phase's teach lines are spoken first, and a demo phase waits for the child's own act."
      : m.PHASES.some((p) => Array.isArray(p.steps) && p.steps.length)
      ? `guide steps on phase ${m.PHASES.filter((p) => Array.isArray(p.steps) && p.steps.length).map((p) => p.n).join(", ")}: the phase opens on its first instruction and waits for the child's act (getState guideStep, guideSteps, guideOn); the agent's check() performs the current step; the last act opens the first question. Other phases open on their printed teach lines, and a demo phase waits for the child's own act.`
      : "none: an Udgam tool opens straight on its phase; the phase's teach lines are printed on the bubble first, and a demo phase waits for the child's own act." },
    palette: {
      content: m.CONTENT, chrome: m.CHROME,
      rule: "A content colour fills countable things only and chrome never borrows one; coloured numerals and words take a deeper ink of their colour (4.5:1).",
    },
    toolQuestions: {
      source: "props.questions ?? props.additionalProps?.questions is read; the authored rows below keep their stage (fitHost returns null).",
      itemsPerPhase: 3,
      authoredFallback: m.PHASES.map((p) => ({ phase: p.n, items: p.items.map((it, k) => ({
        id: `p${p.n}_${k + 1}`, question_id: it.qid || null, worked: false, kind: it.kind || null,
        planQuestion: it.qid && planQ[it.qid] ? planQ[it.qid].question : null,
        question: { en: it.say }, ask: { en: it.ask }, answer: key(it),
        planAnswer: it.qid && planQ[it.qid] ? String(planQ[it.qid].answer) : null,
        ...(it.choices ? { choices: it.choices.map((c) => c.id) } : {}), madeOn: it.pad === "enter" ? "working area" : it.choices ? "choices" : "keypad",
      })) })),
    },
    unusedQuestionIds: Object.keys(planQ).filter((x) => !used.has(x)),
    scoring: {
      pointsPerCorrect: m.POINTS, scorableItems: nItems, maxScore: m.POINTS * nItems,
      wrong: "costs nothing, never marked, counted only for first try accuracy",
      stars: "one for finishing, two at sixty per cent right first time, three at ninety; hidden with the first-try line by showScore false",
      phaseMount: `a mount scores every phase it plays, from its phase to the last (+${m.POINTS} a question; phases of ${m.PHASES.map((p) => p.items.length).join(", ")} questions)`,
      finishCard: "stars and the Right first time line under the phase rows on the summary page",
    },
    hostContract: {
      props: ["phase", "navigableDots", "soundDefault", "muted", "audience", "showScore", "questions", "learnQuestions", "onProgress", "onComplete", "onPrevious", "onExit"],
      phase: `absent (not a finite number): the whole lesson, phases one to ${N} in a row, the summary page at the end, finished once. Present: rounded and clamped to one to ${N}; the tool starts at that phase and, as the NCERT tools do, walks on by itself after each phase's last question (its closing line, then 1.4 s), in user and AI mode alike, through phase ${N} to the summary page${silent ? " (a tool with nextKey, runtime r48+: in user mode it waits for the child's blinking Next key instead, after every question and every phase, and the last phase's key opens the summary; AI mode, and a host that mounts one phase without navigableDots, walk on by themselves)" : ""}; finished once, from the summary page.`,
      navigableDots: "true (or no phase): user mode, the phase dots are controls; otherwise AI mode, the dots show progress and the agent drives window.toolApi.",
      audience: "accepted and not acted on",
      onProgress: { activity: m.TOOL_ID, done: "questions right so far in this phase", total: "questions in this phase", phase: `1-${N}`, conceptId: "from phaseMap", objectiveIds: "from phaseMap" },
      onCompleteResult: { id: m.TOOL_ID, fields: ["score", "maxScoreThisPhase", "correctFirstTry", "itemsAnswered", "stars", "phase", "conceptId", "objectiveIds", "phases (summary of several phases)", "maxScore (the same)"] },
      emits: "every event is dispatched on window and, when framed, posted to window.parent as { type: 'event', name, detail }",
      noStorage: true, noNetwork: true,
    },
    phaseMap: { phases: m.PHASES.map((p) => ({ n: p.n, concept: p.concept, conceptId: p.conceptId, objectiveIds: p.objectiveIds || [],
      items: p.items.map((it, k) => it.qid || `${id}:p${p.n}_${k + 1}`) })) },
    shared_state: ["phase", "stage", "item", "typed", "complete", ...shared.filter((x) => x !== "complete")],
    getState: silent
      ? `toolId, mediaId, mode, mountPhase, phase, phases, conceptId, objectiveIds, step, steps, item, items, stage (teach, demo, ask, win, idle, summary, free), question, questionText, choices, typed, keypadOpen, tries, answered, firstTry, score, maxScore, answerShown (only after the answer), complete, questionCount, muted (the sound effects), speaking (always false: the lesson is silent), voice ("silent"), mascot, summaryRow, played, classroom, held (a classroom's parked piece of a long line), instruction (the pinned line), hint (the hint under it, or null), guideStep / guideSteps / guideOn (a guide-steps phase only)${shared.length ? ", " + shared.join(", ") : ""}`
      : `toolId, mediaId, mode, mountPhase, phase, phases, conceptId, objectiveIds, step, steps, item, items, stage (teach, demo, ask, win, idle, summary, free), question, questionText, choices, typed, keypadOpen, tries, answered, firstTry, score, maxScore, answerShown (only after the answer), complete, questionCount, muted, speaking, voice, mascot, summaryRow, played${shared.length ? ", " + shared.join(", ") : ""}`,
    valid_ids: { highlightTargets: ["header", "runs", "work", "slot", "pad", "voice", "bubble", "bar"], params: ["phase", "muted"] },
    windowMethods: m.TOOL_API, windowAliases: ["toolApi", m.TOOL_ID],
    events: ["answer_checked", "question_done", "finished"],
    terminalEvent: {
      name: "finished", doneId: `${id}.DONE`,
      fires: "once per mount, from the summary page after the last phase, 5 s after the page opens (its lines may still be going on); one-shot guarded and re-armed by restart or Play again; never sent at the end of an earlier phase (the tool walks on), and never if Free play or Play again is tapped first",
      detail: ["toolId", "mediaId", "doneId", "phase", "conceptId", "objectiveIds", "score", "maxScoreThisPhase", "correctFirstTry", "itemsAnswered", "stars", "phases", "maxScore"],
    },
    imagePrompts: {},
    soundPrompts: {},
    sounds: silent ? "Web Audio, no files, on in every mode (the sound button switches them): correct, wrong (soft), win at a phase end, cheer at the last, a tick when a piece snaps, and cut, settle and trade where the picture moves"
      : "Web Audio, no files: correct, wrong (soft), win, and a tick when a piece snaps",
    mascotPoses: {},
    mascot: { inline: true, type: "image/webp", width: m.MASCOT_SIZE && m.MASCOT_SIZE.w, height: m.MASCOT_SIZE && m.MASCOT_SIZE.h, source: path.basename(String(CONFIG.mascot || "kiko.svg")), fallback: "drawn speaking dot" },
    voiceLines: (w.voiceLines || []).map((l) => ({ en: l })),
    build: { source: hash, runtime: runtimeVersion ? `${CLASS_DIR}/runtime/frozen/${runtimeVersion}/runtime.tsx` : `${CLASS_DIR}/runtime/runtime.tsx`, runtimeVersion: runtimeVersion || null, library: `@use-gesture/react@${version("@use-gesture/react")}`, builtAt: new Date().toISOString(),
      checks: st.checks, tsxBytes: Buffer.byteLength(tsx), tsxMd5: md5(Buffer.from(tsx)) },
  };
  const jsonText = JSON.stringify(sidecar, null, 2) + "\n";
  fs.writeFileSync(jsonFile, jsonText);
  /* the pair approve proved is gone: its record moves aside (handEdit names bytes that no longer exist) */
  writeStatus(dir, { ported: { source: hash, at: sidecar.build.builtAt, tsx: tsxFile, tsxBytes: sidecar.build.tsxBytes, tsxMd5: sidecar.build.tsxMd5, jsonMd5: md5(Buffer.from(jsonText)) },
    ...(st.handEdit ? { handEdit: undefined, handEditReplaced: { ...st.handEdit, replacedAt: sidecar.build.builtAt } } : {}) });
  return { tsxFile, jsonFile, tsxBytes: Buffer.byteLength(tsx), jsonBytes: fs.statSync(jsonFile).size, libBytes: Buffer.byteLength(lib) };
}

/* port, then prove the pair in the host emulator (hostsim) and record it in status.json — what
 * `node cli.mjs port` does end to end. Never uploads or touches lpv2/GCS (that is publish, still
 * gated on the user's word); this only ever writes output-preview/ and this slot's status.json.
 * Used by `node cli.mjs port` itself and by check's auto-port-on-pass (lib/check/runAndShip.mjs). */
export async function portAndVerify(dir, { force = false, replaceHandEdit = force, log = () => {} } = {}) {
  const r = await port(dir, { force, replaceHandEdit });
  log(`port ${idOf(dir)}: ${r.tsxFile}`);
  const sidecar = JSON.parse(fs.readFileSync(r.jsonFile, "utf8"));
  const sim = await hostsim(r.tsxFile, sidecar);
  for (const x of sim.results)
    log(`  phase ${x.n} (${x.mode} mode): ${x.ok ? (x.n < sim.results.length ? `plays on through phase ${sim.results.length} and finishes` : "plays and finishes") : "FAILS: " + x.problems.join("; ")}${x.transpileMs !== undefined ? ` · host Babel ${x.transpileMs} ms` : ""}`);
  writeStatus(dir, { stage: sim.ok ? "ported" : "draft", hostsim: { ok: sim.ok, at: new Date().toISOString() } });
  return { ...r, hostsim: sim };
}
