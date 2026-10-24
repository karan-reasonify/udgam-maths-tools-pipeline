/* Visual design pass for Udgam maths tools.
 * Elevates SVG visuals, colors, layout and styling using Gemini (gemini-3.5-flash by default),
 * validates syntax with Babel standalone, and safely repairs or reverts on error.
 */
import fs from "node:fs";
import path from "node:path";
import { fromRoot, CLASS_LABEL, ROOT } from "../core/env.mjs";
import { readStatus, writeStatus } from "../core/work.mjs";
import { buildPreview } from "../build/preview.mjs";
import { callGeminiGenerate } from "./gemini.mjs";
import { buildDesignPrompt, buildRepairPrompt, buildSkinPrompt, buildMountRepairPrompt } from "./prompts.mjs";
import { checkTsxSyntax } from "./syntax.mjs";
import { capsFor } from "../core/caps.mjs";
import { skinProblems, madeImages, unusedSkinKeys } from "./skins.mjs";
import { mountProblems, colourFrames, lostColours } from "./mount.mjs";
import { scopeTool, spliceTool, parseError } from "./scope.mjs";
import { literalsOf } from "./scope.mjs";

// Gemini has been seen corrupting printed text ("before" -> "me fore", "bigger" -> "meger"). No syntax check sees that, so
// every printed sentence of the original (a string of 3+ plain words: TR keys and values, asks, hints) must keep its number of
// occurrences. Counting, not "includes": a sentence sits in several tables and an intact copy would hide a broken one. The strings are
// read off the AST (literalsOf), because pairing quotes by regex once read the CODE between two attributes as a sentence and reverted
// a good pass over a changed font size; a reply that does not parse falls back to the quote scan.
const WORD = /^[\p{L}\p{M}.,?!'\u2019:;()\-\u2013]+$/u;
const printedStrings = (src) => [...new Set(literalsOf(src) || [...src.matchAll(/"((?:[^"\\\n]|\\.)+)"/g)].map((m) => m[1]))]
  .filter((s) => s.split(/\s+/).filter((w) => WORD.test(w)).length >= 3);
const count = (src, s) => src.split(s).length - 1;
export const lostPrintedStrings = (before, after) => printedStrings(before).filter((s) => count(after, s) < count(before, s));

const lev = (a, b) => {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
};
// The corruption is local ("bigger" -> "meger"), so a string the pass introduced that sits within ~10 % edits of a lost original
// is that original, damaged: put the original back. lostPrintedStrings then confirms, and reverts if anything is still missing.
export function restorePrintedStrings(before, after) {
  const lost = lostPrintedStrings(before, after);
  if (!lost.length) return after;
  const orig = new Set(printedStrings(before));
  let out = after;
  for (const t of printedStrings(after)) {
    if (orig.has(t)) continue;
    const [d, s] = lost.map((l) => [lev(t, l), l]).sort((x, y) => x[0] - y[0])[0];
    if (d <= Math.max(3, s.length * 0.1)) out = out.split(t).join(s);
  }
  return out;
}

/* Words the pass ADDED (it turned "+3" into "Check: +3" and into " animate / +3"): a new literal holding a word and a space or a :!? that is
   not CSS (a unit or a function call). Not a revert: a design is kept and the builder is told the exact words, removed with one edit. */
const CSSY = /\d\s*(?:px|%|deg|ms)\b|\bpx\b|[a-z-]+\(/i;
export function addedPrintedText(before, after) {
  const had = new Set(literalsOf(before) || []);
  return [...new Set(literalsOf(after) || [])].filter((s) => !had.has(s) && /\p{L}{3,}/u.test(s) && /[\s:!?]/.test(s.trim()) && !CSSY.test(s));
}

function idOf(dir) {
  return path.basename(dir);
}

function loadLayoutSummary() {
  const layoutPath = fromRoot("docs/LAYOUT.md");
  if (!fs.existsSync(layoutPath)) return "";
  try {
    // The stage (1), the working area (3), type/colour/depth (9) and motion (10). LAYOUT.md is ~60 KB and section 3
    // starts ~28 KB in, so the cut is by heading, never by length. "## 1b." and "### ..." do not match.
    return fs.readFileSync(layoutPath, "utf8").split(/^(?=## )/m).filter((s) => /^## (1|3|9|10)\. /.test(s)).join("\n");
  } catch {
    return "";
  }
}

export async function runDesignPass(slotDir, {
  model = null,
  force = false,
  log = console.log,
  onCall = null,
} = {}) {
  const sid = idOf(slotDir);
  // every Gemini call of the pass (design, repair, skins, mount), with its tokens and wall time: the cost of a pass is all of them
  const calls = [];
  const gemini = async (kind, opts) => {
    const t0 = Date.now(), r = await callGeminiGenerate(opts);
    const c = { kind, ms: Date.now() - t0, ...r.usage };
    calls.push(c);
    if (onCall) onCall(c);
    return r;
  };
  const toolFile = path.join(slotDir, "tool.tsx");

  if (!fs.existsSync(toolFile)) {
    throw new Error(`no tool.tsx in ${slotDir}; scaffold or draft it first`);
  }

  const originalTsx = fs.readFileSync(toolFile, "utf8");
  if (!originalTsx.trim()) {
    throw new Error(`tool.tsx in ${slotDir} is empty`);
  }

  // A whole-file rewrite of a finished tool is lost work: the next passing `check` would port it over the pair.
  const st = readStatus(slotDir);
  // `stage` alone: scaffold resets it on a remake, while sealed / published / handEdit outlive a remake in status.json. A tool at
  // "ported" is the normal state of a tool at step 4b (its full check ports on a pass), so only a PUBLISHED tool is refused.
  if (st.stage === "published" && !force) {
    throw new Error(`${sid} is published; the design pass rewrites tool.tsx and is for a tool still being built (--force to run it anyway)`);
  }

  // Verify baseline syntax
  const baselineSyntax = checkTsxSyntax(originalTsx, `${sid}.tsx`);
  if (!baselineSyntax.ok && !force) {
    throw new Error(`tool.tsx has existing syntax error before design pass: ${baselineSyntax.error}`);
  }

  // Load brief and slot metadata
  let brief = "";
  const briefFile = path.join(slotDir, "brief.md");
  if (fs.existsSync(briefFile)) {
    try { brief = fs.readFileSync(briefFile, "utf8"); } catch {}
  }

  let toolName = sid;
  const slotJsonFile = path.join(slotDir, "slot.json");
  if (fs.existsSync(slotJsonFile)) {
    try {
      const s = JSON.parse(fs.readFileSync(slotJsonFile, "utf8"));
      toolName = s.title || s.tool_id || sid;
    } catch {}
  }

  const layoutRules = loadLayoutSummary();
  // The pictures the image pass (runbook 5c) made for this tool: only their KEYS and what they are go to Gemini, never images.tsx.
  let skinAllowed = false, images = [];
  try { skinAllowed = !!capsFor(slotDir).skin; } catch { /* no pin yet: no skins */ }
  try {
    if (fs.existsSync(path.join(slotDir, "images.tsx"))) images = madeImages(JSON.parse(fs.readFileSync(path.join(slotDir, "images.json"), "utf8")));
  } catch { /* an unreadable images.json is no pictures */ }
  const pictureKeys = images.map((i) => i.key);
  if (log && skinAllowed && !images.length) log(`design [${sid}] NOTE: no pictures yet (no images.tsx): run the image pass (runbook 5c) first, or the tool is designed without real-object pictures`);
  if (log && !skinAllowed) log(`design [${sid}] NOTE: this chapter's runtime has no Skin; the pass adds no pictures`);
  // what the pass may not change stays here (scope.mjs): Gemini gets the scoped file, every reply is spliced back before any guard
  const { scoped, frozen } = scopeTool(originalTsx);
  const prompt = buildDesignPrompt({
    tsx: scoped,
    brief,
    slotId: sid,
    toolName,
    className: CLASS_LABEL,
    layoutRules,
    images: skinAllowed ? images : [],
    skinAllowed,
  });

  // the colours the class sees first, shot before the pass so a meaning colour it takes away can be named after it (mount.mjs)
  let colourBefore = null;
  try { await buildPreview(slotDir); colourBefore = colourFrames(slotDir); }
  catch (e) { if (log) log(`design [${sid}] NOTE: the colour check is skipped (${String(e.message).slice(0, 80)})`); }

  if (log) log(`design [${sid}]: running Gemini visual elevation pass...`);
  const backupFile = path.join(slotDir, "tool.tsx.pre-design");
  fs.writeFileSync(backupFile, originalTsx, "utf8");

  let designResult;
  try {
    designResult = await gemini("design", {
      prompt,
      model,
      temperature: 0.4,
      log,
    });
  } catch (err) {
    if (log) log(`design [${sid}] FAIL: Gemini call failed: ${err.message}`);
    return { ok: false, status: `failed: ${err.message}`, sid };
  }

  const designTsx = designResult.code;
  if (!designTsx || designTsx.length < 200) {
    if (log) log(`design [${sid}] FAIL: Gemini returned suspiciously small or empty code`);
    return { ok: false, status: "failed: empty reply", sid };
  }

  // the cheapest guard first: a reply that lost, repeated or moved a held-back block is refused before any repair is paid for
  const held = spliceTool(designTsx, frozen).error;
  if (held) {
    if (log) log(`design [${sid}] WARN: ${held}: keeping the original tool.tsx`);
    return { ok: false, status: `reverted: ${held}`, sid };
  }
  // syntax on the SCOPED reply, so a repair is sent the error in the line numbers Gemini sees; the spliced file is checked again below
  const syntaxOf = (src) => { const e = parseError(src); return e ? { ok: false, error: e } : { ok: true, error: null }; };
  let syntaxCheck = syntaxOf(designTsx);
  let finalTsx = designTsx;
  let statusLabel = "ok";

  if (!syntaxCheck.ok) {
    if (log) log(`design [${sid}] WARN: syntax slip detected (${syntaxCheck.error.slice(0, 100)}) — attempting Gemini surgical repair...`);
    try {
      const repairPrompt = buildRepairPrompt({ tsx: designTsx, error: syntaxCheck.error });
      const repairResult = await gemini("repair", {
        prompt: repairPrompt,
        model: designResult.model,
        temperature: 0.0,
        log,
      });

      const repairedTsx = repairResult.code;
      const repairedCheck = spliceTool(repairedTsx, frozen).error ? { ok: false, error: "the repair lost a held-back block" } : syntaxOf(repairedTsx);
      if (repairedCheck.ok) {
        finalTsx = repairedTsx;
        statusLabel = "ok (repaired)";
        if (log) log(`design [${sid}]: repaired successfully — visual polish kept`);
      } else {
        throw new Error(`still broken after repair: ${repairedCheck.error}`);
      }
    } catch (repErr) {
      if (log) log(`design [${sid}] WARN: repair failed (${repErr.message.slice(0, 100)}) — safely reverting to original tool.tsx`);
      fs.writeFileSync(toolFile, originalTsx, "utf8");
      statusLabel = `reverted: ${repErr.message.slice(0, 80)}`;
      return { ok: false, status: statusLabel, sid };
    }
  }

  finalTsx = spliceTool(finalTsx, frozen).src;
  const whole = checkTsxSyntax(finalTsx, `${sid}.tsx`);
  if (!whole.ok) {
    if (log) log(`design [${sid}] WARN: the spliced tool does not parse (${whole.error.slice(0, 100)}): keeping the original tool.tsx`);
    return { ok: false, status: "reverted: spliced tool does not parse", sid };
  }

  const damaged = lostPrintedStrings(originalTsx, finalTsx).length;
  if (damaged) {
    finalTsx = restorePrintedStrings(originalTsx, finalTsx);
    if (log) log(`design [${sid}]: ${damaged} printed string(s) came back damaged; restored ${damaged - lostPrintedStrings(originalTsx, finalTsx).length}`);
  }
  const lost = lostPrintedStrings(originalTsx, finalTsx);
  if (lost.length) {
    if (log) log(`design [${sid}] WARN: ${lost.length} printed string(s) changed (e.g. "${lost[0].slice(0, 60)}"): keeping the original tool.tsx`);
    return { ok: false, status: `reverted: ${lost.length} printed strings changed`, sid };
  }

  const skinBad = skinProblems(originalTsx, finalTsx, { keys: pictureKeys, allowed: skinAllowed });
  if (skinBad.length) {
    if (log) log(`design [${sid}] WARN: ${skinBad[0]}: keeping the original tool.tsx`);
    return { ok: false, status: `reverted: ${skinBad[0].slice(0, 80)}`, sid };
  }
  let unused = skinAllowed ? unusedSkinKeys(finalTsx, pictureKeys) : [];
  if (unused.length) {
    // made pictures nobody draws: ONE narrow follow-up (add only those skins), accepted only through the same guards
    try {
      const sc = scopeTool(finalTsx);
      const r = await gemini("skins", { prompt: buildSkinPrompt({ tsx: sc.scoped, images: images.filter((i) => unused.includes(i.key)) }), model: designResult.model, temperature: 0.2, log });
      const sp = spliceTool(r.code, sc.frozen), cand = sp.error ? "" : restorePrintedStrings(originalTsx, sp.src);
      const why = sp.error ? sp.error : !checkTsxSyntax(cand, `${sid}.tsx`).ok ? "syntax" : lostPrintedStrings(originalTsx, cand).length ? "printed text"
        : skinProblems(finalTsx, cand, { keys: pictureKeys, allowed: true })[0] || "";
      if (!why) { finalTsx = cand; statusLabel += " + skins"; if (log) log(`design [${sid}]: follow-up drew the skins for ${unused.join(", ")}`); }
      else if (log) log(`design [${sid}] WARN: the skin follow-up was rejected (${why}); keeping the pass without it`);
    } catch (e) { if (log) log(`design [${sid}] WARN: the skin follow-up failed (${String(e.message).slice(0, 80)})`); }
    unused = unusedSkinKeys(finalTsx, pictureKeys);
  }
  if (log && unused.length) log(`design [${sid}] NOTE: made but drawn by no <Skin>: ${unused.join(", ")} (the builder draws them, or says why the element stays plain)`);


  // The preview is rebuilt FIRST and mounted once per phase: a tool that parses can still throw on mount (a moved declaration), and then it is blank.
  const tryMount = async (src) => {
    fs.writeFileSync(toolFile, src, "utf8");
    try { await buildPreview(slotDir); return (await mountProblems(slotDir))[0] || ""; }
    catch (prevErr) { return `the preview did not build (${String(prevErr.message).slice(0, 100)})`; }
  };
  let broken = await tryMount(finalTsx);
  if (broken) {
    if (log) log(`design [${sid}] WARN: the designed tool does not mount (${broken.split("\n")[0].slice(0, 110)}): trying one repair`);
    try {
      const sc = scopeTool(finalTsx);
      const rr = await gemini("mount", { prompt: buildMountRepairPrompt({ tsx: sc.scoped, error: broken }), model: designResult.model, temperature: 0, log });
      const sp = spliceTool(rr.code, sc.frozen), cand = sp.error ? "" : restorePrintedStrings(originalTsx, sp.src);
      const why = sp.error ? sp.error : !checkTsxSyntax(cand, `${sid}.tsx`).ok ? "syntax" : lostPrintedStrings(originalTsx, cand).length ? "printed text"
        : skinProblems(originalTsx, cand, { keys: pictureKeys, allowed: skinAllowed })[0] || "";
      if (!why && !(broken = await tryMount(cand))) { finalTsx = cand; statusLabel += " (mount-repaired)"; if (log) log(`design [${sid}]: repaired, the tool mounts`); }
      else if (why && log) log(`design [${sid}] WARN: the mount repair was rejected (${why})`);
    } catch (e) { if (log) log(`design [${sid}] WARN: the mount repair failed (${String(e.message).slice(0, 80)})`); }
  }
  const bytes = Buffer.byteLength(finalTsx, "utf8");
  if (broken) {
    fs.writeFileSync(toolFile, originalTsx, "utf8");
    try { await buildPreview(slotDir); } catch { /* the next check rebuilds it */ }
    if (log) log(`design [${sid}] WARN: the designed tool does not mount (${broken.split("\n")[0].slice(0, 110)}): keeping the original tool.tsx`);
    return { ok: false, status: `reverted: does not mount`, sid };
  }

  let colourLost = [];
  if (colourBefore) {
    try {
      colourLost = colourFrames(slotDir).flatMap((fr, k) => (colourBefore[k] && colourBefore[k].frame === fr.frame ? lostColours(colourBefore[k].bands, fr.bands).map((l) => `${fr.frame}: ${l}`) : []));
    } catch (e) { if (log) log(`design [${sid}] NOTE: the colour check is skipped (${String(e.message).slice(0, 80)})`); }
  }
  if (colourLost.length && log) log(`design [${sid}] NOTE: colour lost: ${colourLost.join("; ")} (a <Skin> over a piece whose colour is its own fill: draw that colour over the skin as a tint, about 0.7 opacity)`);
  const added = addedPrintedText(originalTsx, finalTsx);
  if (added.length && log) log(`design [${sid}] NOTE: words added: ${added.map((a) => JSON.stringify(a)).join(", ")} (no child may read new words: remove them)`);
  // Record status
  writeStatus(slotDir, {
    toolBytes: bytes,
    designPass: {
      at: new Date().toISOString(),
      model: designResult.model,
      status: statusLabel,
      tokens: designResult.usage,
      calls,
      added,
      colourLost,
    },
  });

  if (log) log(`design [${sid}]: ${statusLabel} (${(bytes / 1024).toFixed(1)} KB on ${designResult.model})`);
  return {
    ok: true,
    status: statusLabel,
    sid,
    bytes,
    model: designResult.model,
  };
}

export async function designChapter(chapterDir, {
  model = null,
  force = false,
  log = console.log,
} = {}) {
  const slots = fs.readdirSync(chapterDir).filter((x) => {
    return fs.existsSync(path.join(chapterDir, x, "slot.json")) &&
           fs.existsSync(path.join(chapterDir, x, "tool.tsx"));
  }).sort();

  if (!slots.length) {
    throw new Error(`no slots with tool.tsx found in ${chapterDir}`);
  }

  if (log) log(`design chapter ${path.basename(chapterDir)}: ${slots.length} slot(s)`);
  const results = [];
  for (const s of slots) {
    const slotDir = path.join(chapterDir, s);
    try {
      const res = await runDesignPass(slotDir, { model, force, log });
      results.push(res);
    } catch (e) {
      if (log) log(`design [${s}] FAILED: ${e.message}`);
      results.push({ ok: false, status: `failed: ${e.message}`, sid: s });
    }
  }

  const passed = results.filter((r) => r.ok).length;
  if (log) log(`design chapter complete: ${passed}/${slots.length} passed`);
  return results;
}
