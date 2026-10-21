/* PENCIL ACTS (2026-10-22, the owner: pencil writing is standard for new chapters; docs/CHECKS.md `pencil-acts`, docs/PATTERNS.md 15).
 * A source row, in the quick check and the full check, read from tool.tsx alone. It needs no browser and imports nothing.
 *
 *   strict  (a chapter FETCHED on a runtime that has the write move: runtime.json `rules.pencilActs` = "strict", written by `fetch`):
 *           every api.act({ tool: "pencil", ... }) is either `moves: "write"` (digits, signs, capital letters: it needs `text` and `at`, takes no
 *           `ms`, and says no `marks`) or says `marks: true` (it marks, shades, colours or draws a line and writes nothing). Nothing else passes.
 *   not strict, runtime HAS the move (a chapter fetched earlier and re-pinned later): one INFO row that counts its pencil acts; none is required to change.
 *   any chapter: a tool that writes (moves: "write", <PencilText>, <PencilLine>) on a runtime WITHOUT the move FAILS (it would throw at run time).
 *   a runtime without the move and a tool that does not use it: no row at all (every finished chapter's checks read exactly as before).
 *
 * The parser reads each `api.act(` call's first argument with balanced delimiters (strings and templates skipped), so a nested { dab } / { line } token,
 * an arrow function in onPoint or a ternary never confuses it. A tool or move that is not a string literal cannot be proven: the act is reported
 * as unclassified (INFO), and in a strict chapter a pencil act whose move is computed must say `marks: true` or be a literal write. */

/* comments out, offsets and line numbers kept (the repo's convention for source rows: a `//` inside a string is the rare case it gets wrong) */
export const stripComments = (src) => String(src).replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, (m) => m.replace(/[^\n]/g, " "));

/* the index after a string or template literal that opens at i (src[i] is the quote) */
function skipString(src, i) {
  const q = src[i];
  for (let k = i + 1; k < src.length; k++) {
    const c = src[k];
    if (c === "\\") { k++; continue; }
    if (q === "`" && c === "$" && src[k + 1] === "{") { k = skipBalanced(src, k + 1) - 1; continue; }
    if (c === q) return k + 1;
  }
  return src.length;
}
/* the index after the delimiter group that opens at i ( ( [ { ), strings skipped */
function skipBalanced(src, i) {
  let depth = 0;
  for (let k = i; k < src.length; k++) {
    const c = src[k];
    if (c === '"' || c === "'" || c === "`") { k = skipString(src, k) - 1; continue; }
    if (c === "(" || c === "[" || c === "{") depth++;
    else if (c === ")" || c === "]" || c === "}") { depth--; if (!depth) return k + 1; }
  }
  return src.length;
}
/* the top-level pieces of an object literal's body, split at commas that are not nested */
function splitTop(body) {
  const out = [];
  let depth = 0, from = 0;
  for (let k = 0; k < body.length; k++) {
    const c = body[k];
    if (c === '"' || c === "'" || c === "`") { k = skipString(body, k) - 1; continue; }
    if (c === "(" || c === "[" || c === "{") depth++;
    else if (c === ")" || c === "]" || c === "}") depth--;
    else if (c === "," && !depth) { out.push(body.slice(from, k)); from = k + 1; }
  }
  out.push(body.slice(from));
  return out.map((s) => s.trim()).filter(Boolean);
}
const KEY = /^(?:([A-Za-z_$][\w$]*)|"([^"]*)"|'([^']*)')\s*:\s*([\s\S]*)$/;

/* every api.act( call of a tool source: its line, its top-level properties as text, whether it spreads something or is not an object literal */
export function actCalls(tool) {
  const src = stripComments(tool), calls = [], re = /\bapi\s*\.\s*act\s*\(/g;
  let m;
  while ((m = re.exec(src))) {
    const open = m.index + m[0].length - 1, line = src.slice(0, m.index).split("\n").length;
    let k = open + 1;
    while (/\s/.test(src[k] || "")) k++;
    const call = { line, props: {}, spread: false, literal: src[k] === "{" };
    if (call.literal) {
      const end = skipBalanced(src, k);
      for (const part of splitTop(src.slice(k + 1, end - 1))) {
        if (part.startsWith("...")) { call.spread = true; continue; }
        const kv = KEY.exec(part);
        if (kv) call.props[kv[1] || kv[2] || kv[3]] = kv[4].trim();
        else if (/^[A-Za-z_$][\w$]*$/.test(part)) call.props[part] = part;   /* shorthand: tool, at */
        else { const mm = /^([A-Za-z_$][\w$]*)\s*\(/.exec(part); if (mm) call.props[mm[1]] = "(method)"; }
      }
    }
    calls.push(call);
  }
  return calls;
}

/* "a" / 'a' / `a` (no ${}) -> a; anything else null */
const lit = (v) => { const m = /^(["'`])((?:\\.|(?!\1)[^\\$])*)\1$/.exec(String(v == null ? "" : v).trim()); return m ? m[2] : null; };
/* the moves an act can have: one literal, or `cond ? "a" : "b"`; null when it is computed */
function movesOf(v) {
  if (v == null) return [];
  const one = lit(v);
  if (one !== null) return [one];
  const t = /^[^"'`?:]+\?\s*((["'])[^"']*\2)\s*:\s*((["'])[^"']*\4)$/.exec(String(v).trim());
  return t ? [lit(t[1]), lit(t[3])] : null;
}

/* the facts about every pencil act of a tool: { line, kind: "write" | "marks" | "other" | "computed", moves, problems: [] } */
export function pencilActs(tool) {
  const acts = [], unclassified = [];
  for (const c of actCalls(tool)) {
    const t = c.props.tool === undefined ? null : lit(c.props.tool);
    if (!c.literal || c.spread || t === null) { if (!c.literal || c.spread || c.props.tool !== undefined) unclassified.push(c.line); continue; }
    if (t !== "pencil") continue;
    const mv = movesOf(c.props.moves !== undefined ? c.props.moves : c.props.move), marks = c.props.marks !== undefined && c.props.marks.trim() === "true";
    const a = { line: c.line, moves: mv, marks, kind: null, problems: [] };
    if (mv === null) a.kind = "computed";
    else if (mv.includes("write")) a.kind = "write";
    else a.kind = marks ? "marks" : "other";
    if (a.kind === "write") {
      if (mv.length > 1) a.problems.push("a write cannot share a ternary with another move");
      if (marks) a.problems.push("moves: \"write\" and marks: true contradict");
      if (c.props.text === undefined) a.problems.push("a write needs `text`");
      if (c.props.at === undefined) a.problems.push("a write needs `at` (the baseline points)");
      a.ms = c.props.ms !== undefined;
      a.noSize = c.props.size === undefined;
    }
    acts.push(a);
  }
  return { acts, unclassified };
}

/* the row (at most one): [{ id: "pencil-acts", level: "pass" | "info" | "warn" | "fail", msg }] */
export function pencilRows(tool, { caps = {}, strict = false } = {}) {
  const code = stripComments(tool);
  const writes = /\bmoves\s*:\s*["']write["']/.test(code) || /\bPencil(?:Text|Line)\b/.test(code);
  if (writes && !caps.pencilWrite)
    return [{ id: "pencil-acts", level: "fail", msg: "the tool writes with the pencil (moves: \"write\", <PencilText> or <PencilLine>) but its pinned runtime has no write move: freeze the head and pin this chapter (runtime freeze, runtime pin --ch N), or use only the old pencil moves" }];
  if (!caps.pencilWrite) return [];
  const { acts, unclassified } = pencilActs(tool);
  if (!acts.length && !unclassified.length) return [];
  const count = (k) => acts.filter((a) => a.kind === k).length;
  const tally = `${acts.length} pencil act(s): ${count("write")} write, ${count("marks")} marks, ${count("other") + count("computed")} other`;
  const note = unclassified.length ? `; ${unclassified.length} api.act with a computed tool or spread (line ${unclassified.slice(0, 3).join(", ")}) cannot be classified: write the tool as a string literal if it is the pencil` : "";
  if (!strict) return acts.length ? [{ id: "pencil-acts", level: "info", msg: `${tally}${note}. This chapter was fetched before the pencil write move, so none is required to change (PATTERNS 15)` }] : [];
  const bad = [], warn = [];
  for (const a of acts) {
    const where = `line ${a.line}`;
    for (const p of a.problems) bad.push(`${where}: ${p}`);
    if (a.kind === "other") bad.push(`${where}: a pencil act with moves ${JSON.stringify(a.moves)} writes nothing as strokes; if it writes digits, signs or capital letters use moves: "write" (PATTERNS 15, text/at/size/align); if it only marks, shades, colours or draws a line, say marks: true`);
    if (a.kind === "computed") bad.push(`${where}: a pencil act whose moves is not a string literal cannot be proven; write moves: "write" or say marks: true`);
    if (a.kind === "write" && a.ms) warn.push(`${where}: ms is ignored for a write (it has its own pace: about 0.8 s a number)`);
    if (a.kind === "write" && a.noSize) warn.push(`${where}: a write should say size (the fontSize the tool prints that text with)`);
  }
  if (bad.length) return [{ id: "pencil-acts", level: "fail", msg: bad.join("; ") }];
  if (warn.length) return [{ id: "pencil-acts", level: "warn", msg: warn.join("; ") }];
  return [{ id: "pencil-acts", level: "pass", msg: `${tally}: every pencil act writes (moves: "write") or says marks: true${note}` }];
}
