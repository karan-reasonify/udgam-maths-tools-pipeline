/* ANSWER GATE (2026-10-24, the owner: the answer is gated by the act; docs/PATTERNS.md "Answer gated by the act", PREFLIGHT 28).
 * A warn-only source row from tool.tsx alone (no browser, imports only pencil.mjs's comment stripper). It sees ONLY whether the tool calls
 * `api.lock(` anywhere besides the skeleton's own traceback lock; it cannot tell a real act from an invented one and it does not play the gate.
 * A tool with no act per question stays ungated on purpose: the builder says so in the report. `approve` and `check` never prove the gate:
 * the play tester and the visual reviewer judge it with real clicks. If the traceback block was edited it is not recognised, and a tool that
 * only locks there reads as gated (a missed warn, never a false one). */
import { stripComments } from "./pencil.mjs";

const SKELETON_TRACEBACK = /useEffect\(\(\) => \{\s*if \(!wrong[^\n]*\n\s*api\.lock\(true\);\s*tl\.run\(\[\[600, \(\) => \{\}\]\], \(\) => api\.lock\(false\)\);\s*\}, \[wrong\]\);/;

export function answerGateRows(tool) {
  const own = stripComments(tool).replace(SKELETON_TRACEBACK, "");
  const n = (own.match(/\bapi\.lock\(/g) || []).length;
  return n
    ? [{ id: "answer-gate", level: "pass", msg: `the tool calls api.lock (${n} sites): the answer is gated by the act (play it: the check does not)` }]
    : [{ id: "answer-gate", level: "warn", msg: "no api.lock outside the traceback: the Answer key is never gated by the act. Fine only when no question has a real act on the working area (say so in the report); else gate it (PATTERNS: Answer gated by the act)" }];
}
