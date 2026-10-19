/* orchlib/hooks: what each class's cli.mjs calls (through its small `orchHook`), so orchestration rules hold whoever runs
 * the command: a builder, a reviewer, the main session or the owner.
 *
 *   recordCheck    after every `check`: writes the full cache key into status.json (checkCache | quickCache) and counts
 *                  the run in the chapter's orch state. Never fails a check (an error here is printed and ignored).
 *   runtimeGate    before `runtime freeze` / `runtime pin`: the batched-runtime rule (runbook non-negotiable 3) as code.
 *   runtimeRecord  after a freeze or pin went through: logs it in the chapter's orch state.
 *   recordVoice    after `voice`: the key the bake was made for (re-bake only when it changes).
 */
import fs from "node:fs";
import path from "node:path";
import { loadPolicy, readJson, ROOT, sha } from "./config.mjs";
import { cacheKey } from "./keys.mjs";
import { updateState, readState, slotRec } from "./state.mjs";

const rootOf = (classDir) => (fs.existsSync(path.join(path.dirname(classDir), "orchestration.json")) ? path.dirname(classDir) : ROOT);
const policyFor = (classDir) => loadPolicy({ root: rootOf(classDir), classDir });
const statusFile = (dir) => path.join(dir, "status.json");
function patchStatus(dir, patch) {
  const f = statusFile(dir), cur = readJson(f, {});
  const next = { ...cur, ...patch, updatedAt: new Date().toISOString() };
  const tmp = f + ".orch.tmp";
  fs.writeFileSync(tmp, JSON.stringify(next, null, 2) + "\n");
  fs.renameSync(tmp, f);
}

export async function recordCheck({ classDir, dir, render, summary, toolHash }) {
  const pol = policyFor(classDir);
  const k = cacheKey({ classDir, slotDir: dir, pol, toolHash, render });
  const rec = { key: k.key, parts: k.parts, pass: summary.fail === 0 && (!render || summary.warn === 0), summary: { pass: summary.pass, warn: summary.warn, fail: summary.fail }, at: new Date().toISOString() };
  patchStatus(dir, render ? { checkCache: rec } : { quickCache: rec });
  const chapterDir = path.dirname(dir);
  updateState(chapterDir, (st) => {
    if (render) st.counters.fullChecks++; else st.counters.quickChecks++;
    const r = slotRec(st, path.basename(dir));
    if (render) r.fullChecks = (r.fullChecks || 0) + 1; else r.quickChecks = (r.quickChecks || 0) + 1;
    r.lastCheck = { render: !!render, pass: rec.pass, summary: rec.summary, at: rec.at };
  });
  return rec;
}

const chapterDirFor = (classDir, ch) => {
  const cfg = readJson(path.join(classDir, "pipeline.config.json"), {});
  const work = path.join(classDir, cfg.workDir || "work"), n = (cfg.defaults && cfg.defaults.class) || "";
  const want = `${(cfg.defaults && cfg.defaults.subject) || "maths"}${n}_ch${ch}`;
  const hit = fs.existsSync(work) ? fs.readdirSync(work).find((d) => d.endsWith(want)) : null;
  return hit ? path.join(work, hit) : null;
};
const versionsOf = (classDir) => Object.keys(readJson(path.join(classDir, "runtime", "frozen", "versions.json"), { versions: {} }).versions || {});

/* -> { ok: true, note?, token } | { refuse: "why" } */
export function runtimeGate({ classDir, op, named, version, ch, gate, proof, ungated }) {
  const pol = policyFor(classDir), G = pol.runtimeGates || {};
  const token = { versionsBefore: versionsOf(classDir) };
  if (!G.enforce) return { ok: true, token };
  if (op === "freeze" && named) return { ok: true, token, note: `restore of a named snapshot (${named}) is not gated` };
  const say = (m) => ({ refuse: m + "\n  the batched-runtime rule (udgam_maths_claude.md non-negotiable 3, orchestration.json runtimeGates): log a gap in work/<chapter_id>/NOTES.md and work round it; freeze once before the review packs (--gate prereview) and once after the play tests (--gate postplay); a third move needs --gate blocker --proof \"<real-input probe>\". A deliberate move outside a chapter build: --ungated \"why\" (logged)." });
  if (ungated !== undefined) {
    if (ungated === true || String(ungated).trim().length < 8) return say("--ungated needs a reason of at least 8 characters");
    return { ok: true, token, note: `ungated: ${ungated} (logged)` };
  }
  if (!ch || ch === true) return say(`runtime ${op} needs --ch N (the chapter whose build this move is for) and --gate ${(G.gates || []).join("|")}`);
  if (!gate || gate === true || !(G.gates || []).includes(String(gate))) return say(`runtime ${op} needs --gate ${(G.gates || []).join("|")} (got ${gate === undefined ? "none" : gate})`);
  const cdir = chapterDirFor(classDir, ch);
  if (!cdir) return say(`no work folder for chapter ${ch}`);
  const st = readState(cdir);
  const fz = st.freezes.filter((f) => f.build === st.build && f.made);
  const pins = st.pins.filter((p) => p.build === st.build);
  const g = String(gate);
  const freezes = op === "freeze" || (op === "pin" && !version);
  if (g === "blocker") {
    if (!proof || proof === true || String(proof).trim().length < (G.minProofChars || 12)) return say("--gate blocker needs --proof \"<the real-input probe that shows a blank, unplayable or wrongly-marked tool>\"");
    const used = (freezes ? fz : pins).filter((f) => f.gate === "blocker").length;
    if (used >= (G.maxBlocker ?? 1)) return say(`the blocker ${freezes ? "freeze" : "pin"} of this build was already used (${(freezes ? fz : pins).filter((f) => f.gate === "blocker").map((f) => f.version).join(", ")})`);
  } else {
    const used = (freezes ? fz : pins).filter((f) => f.gate === g);
    if (used.length) return say(`the ${g} ${freezes ? "freeze" : "pin"} of chapter ${ch} was already used this build (${used.map((f) => f.version + " at " + String(f.at).slice(0, 16)).join(", ")})`);
  }
  if (freezes && fz.length >= (G.maxFreezesPerBuild ?? 3)) return say(`chapter ${ch} already has ${fz.length} freezes this build (limit ${G.maxFreezesPerBuild ?? 3})`);
  return { ok: true, token };
}

export function runtimeRecord({ classDir, op, ch, gate, proof, ungated, version, token }) {
  const after = versionsOf(classDir);
  const made = !!(token && token.versionsBefore && after.length > token.versionsBefore.length);
  const row = { op, gate: ungated !== undefined ? "ungated" : String(gate || ""), version: version || null, made, proof: proof && proof !== true ? String(proof) : undefined, reason: ungated && ungated !== true ? String(ungated) : undefined, at: new Date().toISOString() };
  const cdir = ch && ch !== true ? chapterDirFor(classDir, ch) : null;
  if (cdir) return updateState(cdir, (st) => { row.build = st.build; if (op === "freeze" || made) st.freezes.push(row); if (op === "pin") st.pins.push(row); });
  /* an ungated move with no chapter: a class-level log beside the chapters (work/ is never synced or cleaned) */
  const f = path.join(classDir, readJson(path.join(classDir, "pipeline.config.json"), {}).workDir || "work", ".orch-runtime.json");
  const log = readJson(f, []); log.push(row); fs.writeFileSync(f, JSON.stringify(log.slice(-200), null, 1) + "\n");
  return null;
}

export function recordVoice({ classDir, dir, langs }) {
  const tool = fs.existsSync(path.join(dir, "tool.tsx")) ? fs.readFileSync(path.join(dir, "tool.tsx"), "utf8") : "";
  const pin = readJson(path.join(path.dirname(dir), "runtime.json"), {});
  patchStatus(dir, { voiceKey: { key: sha(tool + "|" + (pin.version || "") + "|" + [].concat(langs || []).join(",")), at: new Date().toISOString() } });
}
