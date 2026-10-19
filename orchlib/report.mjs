/* orchlib/report: agent reports. An agent writes its findings ONCE to work/<chapter>/orch/reports/<agent id>.md through
 * `node ../orch.mjs report ... <<'EOF'` (at most contextBudget.reportMaxLines lines, repetitive lines folded) and returns
 * only the envelope below to the main session, which therefore never holds a tool source, a log or a review pack.
 *
 *   STATUS: ok | fixes-needed | fail | blocked | partial
 *   SLOTS: <ids>
 *   FILES: <changed files, or none>
 *   CHECKS: <what ran, e.g. "check --no-render pass; check 212 pass 0 warn 0 fail">
 *   FAILURES: <failing ids or none>
 *   DECISIONS: <one line each, or none>
 *   RISKS: <or none>
 *   ESCALATE: no | <trigger>: <why>      (triggers: orchestration.json escalation.triggers)
 *   REPORT: work/<chapter>/orch/reports/<id>.md
 */
export const ENVELOPE = ["STATUS", "SLOTS", "FILES", "CHECKS", "FAILURES", "DECISIONS", "RISKS", "ESCALATE", "REPORT"];
export const STATUSES = ["ok", "fixes-needed", "fail", "blocked", "partial"];

/* fold runs of near-identical lines ("… N similar lines") and cap the total */
export function capReport(text, maxLines = 40) {
  const src = String(text || "").replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trimEnd().split("\n");
  const shape = (l) => l.replace(/\d+/g, "#").replace(/\s+/g, " ").trim().slice(0, 40);
  const out = [];
  for (let i = 0; i < src.length; ) {
    let j = i + 1;
    while (j < src.length && shape(src[j]) === shape(src[i]) && shape(src[i]).length > 6) j++;
    out.push(src[i]);
    if (j - i > 3) { out.push(src[i + 1]); out.push(`  … ${j - i - 2} similar lines folded`); } else for (let k = i + 1; k < j; k++) out.push(src[k]);
    i = j;
  }
  if (out.length <= maxLines) return { text: out.join("\n"), lines: out.length, truncated: out.length < src.length };
  const keep = out.slice(0, maxLines - 1);
  keep.push(`… truncated: ${out.length - maxLines + 1} more lines (reports are capped at ${maxLines})`);
  return { text: keep.join("\n"), lines: maxLines, truncated: true };
}

export function parseEnvelope(text) {
  const env = {};
  for (const l of String(text || "").split(/\r?\n/)) {
    const m = /^\s*(?:[-*]\s*)?\**([A-Z]+)\**\s*:\s*(.*)$/.exec(l);
    if (m && ENVELOPE.includes(m[1]) && !(m[1] in env)) env[m[1]] = m[2].trim();
  }
  const st = String(env.STATUS || "").toLowerCase().split(/[\s,;]/)[0];
  env.status = STATUSES.includes(st) ? st : null;
  const esc = String(env.ESCALATE || "no").trim();
  env.escalate = /^(no|none|-)?$/i.test(esc) ? null : { trigger: esc.split(/[:\s]/)[0].toLowerCase(), why: esc.replace(/^[^:]*:\s*/, "") };
  return env;
}
