/* THE QUESTION STAYS (2026-10-30, the owner; docs/CHECKS.md `question-stays`, docs/PREFLIGHT.md 30).
 * A source row from tool.tsx alone (no browser). Once the child has done the acts and the answer is next, the bubble keeps the QUESTION
 * (one statement at a time: the blinking Answer / Enter key is the prompt) until the answer is typed. A bubble line that is only the
 * where-to-tap cue ("Now tap the Answer key.", "Type your answer, then press Enter.", "Choose your answer.") REPLACES the question, so a child
 * who forgot it, or never read it, has nothing to answer from. Say the question again (api.say(item.say)) instead.
 *
 * Flagged: a string literal that STARTS with such a cue and sits where a value is used (after `(`, `?`, `:`, `=`, `=>` or `return`): an
 * api.say argument, a ternary branch, a `const line =`. A TR key or value (after `{` or `,`) is a translation, not a use, and is skipped.
 * "Type your answer first." (a nudge while the key is locked) and "Type how many, then press Enter." (what to type) are not cues and pass.
 * Strict chapter (runtime.json rules.questionStays === "strict", written by fetch from 2026-10-30): FAIL; any other chapter: WARN. */
import { stripComments } from "./pencil.mjs";

const CUE = /^\s*(?:now\s+)?(?:(?:tap|press)\s+(?:the\s+)?(?:blinking\s+)?(?:answer|enter)\s+key\b|(?:type|enter)\s+your\s+answer\s*(?:,|and\b|then\b|\.|$)|choose\s+your\s+answer\b)/i;

export function cueLines(tool) {
  const src = stripComments(tool), found = [];
  const re = /(["'])((?:\\.|(?!\1)[^\\\n])*)\1/g;
  let m;
  while ((m = re.exec(src))) {
    if (!CUE.test(m[2])) continue;
    const before = src.slice(0, m.index).replace(/\s+$/, "");
    if (/(?:[(?:=]|=>|\breturn)$/.test(before)) found.push({ text: m[2], line: src.slice(0, m.index).split("\n").length });
  }
  return found;
}

export function questionStaysRows(tool, { strict = false } = {}) {
  const bad = cueLines(tool);
  if (!bad.length) return [{ id: "question-stays", level: "pass", msg: "no bubble line is only a where-to-tap cue: the question stays until the answer is typed" }];
  const list = bad.slice(0, 4).map((b) => `line ${b.line} ${JSON.stringify(b.text)}`).join("; ");
  return [{ id: "question-stays", level: strict ? "fail" : "warn",
    msg: `a bubble line is only a cue and would replace the question once the acts are done: ${list}. Say the question (api.say(item.say)) instead of the cue; the blinking key is the prompt` }];
}
