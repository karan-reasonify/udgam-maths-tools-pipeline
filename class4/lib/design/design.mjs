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
import { buildDesignPrompt, buildRepairPrompt } from "./prompts.mjs";
import { checkTsxSyntax } from "./syntax.mjs";

// Gemini has been seen corrupting printed text ("before" -> "me fore", "bigger" -> "meger"). No syntax check sees that, so
// every printed sentence of the original (a quoted string of 3+ plain words: TR keys and values, asks, hints) must keep its
// number of occurrences. Counting, not "includes": a sentence sits in several tables and an intact copy would hide a broken one.
const WORD = /^[\p{L}\p{M}.,?!'\u2019:;()\-\u2013]+$/u;
const printedStrings = (src) => [...new Set([...src.matchAll(/"((?:[^"\\\n]|\\.)+)"/g)].map((m) => m[1]))]
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
} = {}) {
  const sid = idOf(slotDir);
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
  // `stage` alone: scaffold resets it on a remake, while sealed / published / handEdit outlive a remake in status.json.
  if (["ported", "published"].includes(st.stage) && !force) {
    throw new Error(`${sid} is at stage ${st.stage}; the design pass rewrites tool.tsx and is for a tool still being built (--force to run it anyway)`);
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
  const prompt = buildDesignPrompt({
    tsx: originalTsx,
    brief,
    slotId: sid,
    toolName,
    className: CLASS_LABEL,
    layoutRules,
  });

  if (log) log(`design [${sid}]: running Gemini visual elevation pass...`);
  const backupFile = path.join(slotDir, "tool.tsx.pre-design");
  fs.writeFileSync(backupFile, originalTsx, "utf8");

  let designResult;
  try {
    designResult = await callGeminiGenerate({
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

  // Validate syntax of generated TSX
  let syntaxCheck = checkTsxSyntax(designTsx, `${sid}.tsx`);
  let finalTsx = designTsx;
  let statusLabel = "ok";

  if (!syntaxCheck.ok) {
    if (log) log(`design [${sid}] WARN: syntax slip detected (${syntaxCheck.error.slice(0, 100)}) — attempting Gemini surgical repair...`);
    try {
      const repairPrompt = buildRepairPrompt({ tsx: designTsx, error: syntaxCheck.error });
      const repairResult = await callGeminiGenerate({
        prompt: repairPrompt,
        model: designResult.model,
        temperature: 0.0,
        log,
      });

      const repairedTsx = repairResult.code;
      const repairedCheck = checkTsxSyntax(repairedTsx, `${sid}.tsx`);
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

  // Write elevated TSX to disk
  fs.writeFileSync(toolFile, finalTsx, "utf8");
  const bytes = Buffer.byteLength(finalTsx, "utf8");

  // Record status
  const prevSt = readStatus(slotDir);
  writeStatus(slotDir, {
    toolBytes: bytes,
    designPass: {
      at: new Date().toISOString(),
      model: designResult.model,
      status: statusLabel,
      tokens: designResult.usage,
    },
  });

  // Automatically refresh preview
  try {
    await buildPreview(slotDir);
  } catch (prevErr) {
    if (log) log(`design [${sid}] note: preview refresh skipped (${prevErr.message})`);
  }

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
