/* orchlib/digest: small, deterministic views of ONE tool, made in node so no agent has to read the whole tool.tsx
 * (80-110 KB) or the whole BUILD_CARD (190 KB) to do its job.
 *
 *   mathsDigest   what the maths reviewer judges: every phase's concept and lines, every question's ask / answer /
 *                 agent key / near miss and what the tool's OWN judge says to each, oracle(), the source of judge,
 *                 oracle, nearMiss, answerForms and agentKey, and the line ranges in tool.tsx of each top-level name
 *                 (so the reviewer reads by range, never the whole file).
 *   stringsDigest what the language agent works on: every line the tool prints (the class's own printedLines, the
 *                 rule tr-coverage applies) with its Hindi and Gujarati entry, the missing ones marked, and the TR
 *                 table's line range in tool.tsx.
 * Both come from the class's own lib (loadModel, printedLines, capsOf, sources), so they follow the pinned runtime.
 * Each digest records its hash; review-done stores it, and a later round re-reviews only a slot whose digest moved. */
import fs from "node:fs";
import path from "node:path";
import { classLib, sha } from "./config.mjs";

const cut = (s, n) => { s = String(s ?? ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; };
const J = (v, n = 160) => { try { return cut(typeof v === "string" ? v : JSON.stringify(v), n); } catch { return "?"; } };

/* the line ranges of the tool's top-level declarations: { NAME: [from, to] } (1-based, inclusive) */
export function topLevelRanges(src) {
  const lines = String(src).split("\n"), starts = [];
  lines.forEach((l, i) => { const m = /^(?:export\s+)?(?:const|let|function|async function)\s+([A-Za-z_$][\w$]*)/.exec(l); if (m) starts.push([m[1], i + 1]); });
  const out = {};
  starts.forEach(([n, a], k) => { out[n] = [a, (k + 1 < starts.length ? starts[k + 1][1] : lines.length + 1) - 1]; });
  return out;
}

async function load(classDir, slotDir) {
  const { loadModel } = await classLib(classDir, "lib/check/model.mjs");
  const M = await loadModel(slotDir);
  const tool = fs.readFileSync(path.join(slotDir, "tool.tsx"), "utf8");
  let caps = {}, runtime = "";
  try { ({ runtime } = (await classLib(classDir, "lib/build/preview.mjs")).sources(slotDir)); caps = (await classLib(classDir, "lib/core/caps.mjs")).capsOf(runtime); } catch { /* an older class */ }
  return { M, tool, runtime, caps };
}

const FN_NAMES = ["judge", "oracle", "nearMiss", "answerForms", "agentKey"];
function fnSource(M, n, maxLines) {
  if (typeof M[n] !== "function") return null;
  const l = String(M[n]).split("\n");
  return l.length > maxLines ? l.slice(0, maxLines).concat([`  … (${l.length - maxLines} more lines: read tool.tsx by its range)`]) : l;
}

export async function mathsDigest({ classDir, slotDir, maxFnLines = 40 }) {
  const { M, tool } = await load(classDir, slotDir);
  const out = [], P = M.PHASES || [];
  out.push(`# maths digest ${path.basename(slotDir)}  ${cut(M.TOOL_NAME, 70)}`);
  let oracle = "absent";
  try { oracle = typeof M.oracle === "function" ? (M.oracle() ? "agrees" : "DISAGREES") : "absent"; } catch (e) { oracle = "THROWS " + cut(e.message, 60); }
  out.push(`phases ${P.length} · questions ${P.reduce((a, p) => a + (p.items || []).length, 0)} · oracle(): ${oracle}`);
  if (M.MODEL !== undefined) out.push(`MODEL ${J(M.MODEL, 300)}`);
  if (M.OPENING) out.push(`OPENING ${J(M.OPENING, 200)}`);
  if (M.FINISH_LINE) out.push(`FINISH_LINE ${J(M.FINISH_LINE, 160)}`);
  for (const p of P) {
    out.push(`\n## phase ${p.n} ${p.conceptId || "(no conceptId)"} objectives ${J(p.objectiveIds || [], 60)}`);
    if (p.concept) out.push(`concept: ${J(p.concept, 200)}`);
    const steps = Array.isArray(p.steps) && p.steps.length ? p.steps : null;
    if (steps) steps.forEach((s, i) => out.push(`step ${i + 1}: say ${J(s && s.say, 140)}${s && s.hint ? ` | hint ${J(s.hint, 100)}` : ""}${s && s.on ? ` | on ${J(s.on, 40)}` : ""}`));
    else if (p.says) out.push(`says: ${J(p.says, 300)}`);
    if (p.demoLines) out.push(`demo: ${J(p.demoLines, 240)}`);
    if (p.ladder) out.push(`ladder: ${J(p.ladder, 240)}`);
    (p.items || []).forEach((it, k) => {
      let key = it.answer, nm, jk = "?", jn = "-";
      try { key = M.agentKey ? M.agentKey(it) : it.answer; } catch (e) { key = "THROWS " + e.message; }
      try { jk = M.judge ? (M.judge(it, key) ? "accepts" : "REJECTS") : "no judge"; } catch (e) { jk = "THROWS " + cut(e.message, 40); }
      try { if (M.nearMiss) { nm = M.nearMiss(it); jn = M.judge(it, nm) ? "ACCEPTS" : "rejects"; } } catch (e) { jn = "THROWS " + cut(e.message, 40); }
      out.push(`${p.n}.${k + 1} ask ${J(it.ask ?? it.say, 150)}`);
      out.push(`    answer ${J(it.answer, 80)} · key ${J(key, 60)} → judge ${jk}${M.nearMiss ? ` · nearMiss ${J(nm, 50)} → judge ${jn}` : ""}`);
      if (it.choices) out.push(`    choices ${J(it.choices.map((c) => (c && c.label) ?? c), 160)}`);
      if (it.parts) out.push(`    parts ${J(it.parts.map((x) => x && (x.label || x.at || x.unit)), 120)}`);
      if (it.miss) out.push(`    miss ${J(it.miss, 150)}`);
      if (it.ladder) out.push(`    ladder ${J(it.ladder, 200)}`);
    });
    if (p.closing) out.push(`closing: ${J(p.closing, 160)}`);
    if (p.learned) out.push(`learned: ${J(p.learned, 200)}`);
  }
  out.push("\n## the tool's maths functions (as bundled)");
  for (const n of FN_NAMES) { const s = fnSource(M, n, maxFnLines); if (s) out.push(`### ${n}`, ...s); }
  const R = topLevelRanges(tool);
  /* the hash covers the maths only: a TR edit moves the ranges below but not the maths, so it never re-opens maths review */
  const hash = sha(out.slice(1).join("\n"));
  out.push("\n## tool.tsx ranges (read by range: Read offset/limit)");
  out.push(Object.entries(R).filter(([n]) => /^(PHASES|MODEL|TR|OPENING|FINISH_LINE|judge|oracle|nearMiss|answerForms|agentKey|words|speakable|CONTENT|Work)$/.test(n)).map(([n, [a, b]]) => `${n} ${a}-${b}`).join(" · ") || "(no top-level names found)");
  return { text: out.join("\n"), hash };
}

export async function stringsDigest({ classDir, slotDir, langs = ["hi", "gu"] }) {
  const { M, tool, runtime, caps } = await load(classDir, slotDir);
  const { printedLines, trCoverage } = await classLib(classDir, "lib/check/silent.mjs");
  const toolBare = tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
  const keyOnly = /\bkeyOnly\s*:\s*true/.test(toolBare) && caps.keyOnly && caps.board && /\bboard\s*:\s*true/.test(toolBare);
  const lines = printedLines(M, tool, { simpleSummary: /\bsummaryLine\s*:/.test(runtime), closingShown: !!(keyOnly && caps.oneSentence) });
  const cov = trCoverage(lines, M.TR);
  const TR = M.TR || {};
  const out = [`# strings digest ${path.basename(slotDir)}  ${lines.length} printed lines · missing ${langs.map((l) => `${l} ${(cov.missing[l] || []).length}`).join(" · ")}${cov.asked ? "" : " (TR has no hi/gu table yet)"}`];
  const R = topLevelRanges(tool);
  if (R.TR) out.push(`TR in tool.tsx ${R.TR[0]}-${R.TR[1]} (edit ONLY this table; English stays as the maths reviewer passed it)`);
  lines.forEach((en, i) => {
    out.push(`${i + 1}. en ${en}`);
    for (const l of langs) { const v = TR[l] && TR[l][en]; out.push(`   ${l} ${v && String(v).trim() ? v : "MISSING"}`); }
  });
  const stale = [];
  for (const l of langs) for (const k of Object.keys(TR[l] || {})) if (!lines.includes(k)) stale.push(`${l}: ${cut(k, 60)}`);
  if (stale.length) out.push(`\nTR keys no printed line uses (${stale.length}; harmless, may be dropped): ${stale.slice(0, 8).join(" | ")}${stale.length > 8 ? " …" : ""}`);
  const body = out.join("\n");
  return { text: body, hash: sha(lines.join("\n") + "\n" + langs.map((l) => JSON.stringify(TR[l] || {})).join("\n")), missing: cov.missing, total: lines.length };
}
