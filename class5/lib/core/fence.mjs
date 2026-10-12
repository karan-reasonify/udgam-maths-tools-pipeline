/* The read fence: one session, one chapter.
 *
 * A chapter is built on its own pinned runtime (pin.mjs), so nothing in another chapter's work/
 * is needed any more: the patterns a builder used to copy from a finished tool live in
 * docs/PATTERNS.md. The fence makes that true rather than merely asked for.
 *
 * It arms itself: the first work/<chapter_id>/ path a session opens becomes that session's chapter;
 * a later read of another chapter's work/ is refused, with the redirect in the message. Everything
 * else (docs/, runtime/, lib/, output-preview/, the CLI) is untouched.
 *
 *   <config fenceFile, default .fence.json>   { off, sessions: { <session_id>: { chapter, at } } }
 *   node cli.mjs fence [--off | --on | --clear]
 *   C4_FENCE=off        one command, no fence (for a deliberate cross-chapter look)
 */
import fs from "node:fs";
import { CLASS_DIR, fenceFilePath } from "./env.mjs";

/* ONE state file for every class that the hook in .claude/hooks guards (it imports the first class's fence.mjs and so
   reads that class's file): a class folder points its config `fenceFile` at it ("../class<first>/.fence.json" for every class after the first), so `fence --off` from any of them writes the file the hook reads. Unset: this folder's own .fence.json. */
const FILE = () => fenceFilePath();
const DAY = 24 * 60 * 60 * 1000;
const CHAPTER = /work[\/]+([a-z0-9]+_[a-z]+_[a-z]+\d+_ch\d+)(?=[\/]|$)/gi;

export function readFence() {
  try { return JSON.parse(fs.readFileSync(FILE(), "utf8")); } catch { return { off: false, sessions: {} }; }
}

function writeFence(f) {
  const now = Date.now();
  for (const [k, v] of Object.entries(f.sessions || {})) if (now - Date.parse(v.at || 0) > DAY) delete f.sessions[k];
  fs.writeFileSync(FILE(), JSON.stringify(f, null, 2) + "\n");
  return f;
}

/* every chapter id a string of paths names */
export function chaptersIn(text) {
  const out = new Set();
  for (const m of String(text || "").matchAll(CHAPTER)) out.add(m[1].toLowerCase());
  return [...out];
}

/* the decision for one tool call. `text` is whatever the call names: a path, a glob, a command. */
export function fenceRead(sessionId, text) {
  const f = readFence();
  if (f.off || String(process.env.C4_FENCE || "").toLowerCase() === "off") return { allow: true };
  const want = chaptersIn(text);
  if (!want.length) return { allow: true };
  const sid = String(sessionId || "").trim();
  if (!sid) return { allow: true };
  const mine = f.sessions?.[sid]?.chapter;
  if (!mine) {
    f.sessions = { ...(f.sessions || {}), [sid]: { chapter: want[0], at: new Date().toISOString() } };
    writeFence(f);
    return { allow: true, armed: want[0] };
  }
  const other = want.filter((c) => c !== mine);
  if (!other.length) return { allow: true, chapter: mine };
  return { allow: false, chapter: mine, other,
    reason: `This session is working in ${mine}; ${other.join(", ")} belongs to another chapter and another session.\n` +
      `Each chapter builds on its own pinned runtime, so nothing in another chapter's work/ is needed:\n` +
      `  - a runtime pattern (two answer boxes, a stacked fraction, the point key, the lent pad, a drag): ${CLASS_DIR}/docs/PATTERNS.md\n` +
      `  - the runtime API and every decision: ${CLASS_DIR}/docs/BUILD_CARD.md\n` +
      `If the user really wants a cross-chapter look, run: node cli.mjs fence --off  (then --on again).` };
}

export function fenceSet({ off, clear } = {}) {
  const f = readFence();
  if (clear) f.sessions = {};
  if (off !== undefined) f.off = !!off;
  return writeFence(f);
}
