/* Remap a chapter's local slots when the LIVE plan renumbers its ids (class 4 ch 8 v3, ch 6/7/10 v3, ch 10 v8 did this by hand).
 *
 * A new plan version can give a tool a new media id (M1.S2.T3.C10.2D1 -> M1.S2.T3.C9.2D1) and new concept ids, while keeping the tool
 * itself. `fetch` used to write a SECOND, empty slot folder under the new id and leave the built tool stranded under the old one.
 * Now `fetch` (and `node cli.mjs remap --ch N [--dry]`) matches each local slot to a live mount by tool_id, then title, then
 * description, renames it everywhere in one pass, and refreshes the plan id / version, so the tool is simply the same tool.
 *
 *   planRemap(local, live)   pure: which local id becomes which live id, the concept-id map, orphans, new mounts, problems
 *   rewriteText(...)         the substitution: media ids and concept ids in ONE regex pass (so C10->C9 and C9->C8 never chain),
 *                            never inside a url (a mount's 2d_tool_url keeps the object of its old id: that is where the app reads it)
 *   remapChapter(...)        the folders and files of one chapter (work/ and output-preview/), with a backup first
 *
 * It never touches a url, the runtime pin, status stages or the check records. The renamed pair no longer equals the bytes its
 * check ported, so it reads "hand-edited (NOT approved)": run `approve <slot> --ch N --note "..."` (a rename is a small change)
 * before `publish`. Tests: node class4/lib/plan/remap.test.mjs */
import fs from "node:fs";
import path from "node:path";

export const MEDIA_RE = /^M\d+\.S\d+\.T\d+\.C\d+\.2D\d+$/;
const MEDIA_G = /M\d+\.S\d+\.T\d+\.C\d+\.2D\d+/g;
/* a concept id is the media id's prefix; the lookaheads keep it from matching inside a media id or a longer number (C1 vs C10) */
const CONCEPT_G = /M\d+\.S\d+\.T\d+\.C\d+(?![0-9])(?!\.2D)/g;
const URL_G = /https?:\/\/[^\s"'`)\\]+/g;

/* the concept ids of a mount, in a fixed order: its own, then each phase's */
export const conceptsOf = (s) => {
  const out = [];
  if (s.concept_id) out.push(s.concept_id);
  for (const p of ((s.tool_config || {}).phase_map || [])) if (p.concept_id) out.push(p.concept_id);
  return out;
};

const norm = (x) => String(x || "").trim().replace(/\s+/g, " ").toLowerCase();

/* local, live: [{ id, tool_id, title, description, concepts: [...] }] -> the plan */
export function planRemap(local, live) {
  const out = { keep: [], rename: [], conceptMap: {}, orphans: [], fresh: [], problems: [] };
  const liveById = new Map(live.map((s) => [s.id, s]));
  const claimed = new Set();
  const pending = [];
  for (const l of local) {
    const same = liveById.get(l.id);
    if (same && (!l.tool_id || !same.tool_id || l.tool_id === same.tool_id)) { out.keep.push(l.id); claimed.add(l.id); } else pending.push(l);
  }
  for (const l of pending) {
    let c = live.filter((s) => !claimed.has(s.id) && !local.some((o) => o.id === s.id && o !== l && out.keep.includes(o.id)));
    for (const key of ["tool_id", "title", "description"]) {
      if (c.length <= 1) break;
      const narrowed = c.filter((s) => norm(s[key]) === norm(l[key]));
      if (narrowed.length) c = narrowed;
    }
    const byTool = c.filter((s) => l.tool_id && s.tool_id === l.tool_id);
    if (byTool.length) c = byTool; else if (l.tool_id) c = c.filter((s) => norm(s.title) === norm(l.title));
    if (c.length === 1) { out.rename.push({ from: l.id, to: c[0].id, tool: l.tool_id || l.title }); claimed.add(c[0].id); }
    else if (!c.length) out.orphans.push(l.id);
    else out.problems.push(`${l.id} (${l.tool_id || l.title}): ${c.length} live mounts fit (${c.map((s) => s.id).join(", ")}): name the right one`);
  }
  const tos = out.rename.map((r) => r.to);
  for (const t of new Set(tos)) if (tos.filter((x) => x === t).length > 1) out.problems.push(`two local slots map to ${t}`);
  out.fresh = live.filter((s) => !claimed.has(s.id)).map((s) => s.id);
  /* concept ids follow position: slot's own, then each phase's */
  for (const r of out.rename) {
    const l = local.find((x) => x.id === r.from), s = liveById.get(r.to);
    if (l.concepts.length !== s.concepts.length) { out.problems.push(`${r.from} -> ${r.to}: ${l.concepts.length} concept ids locally, ${s.concepts.length} live`); continue; }
    l.concepts.forEach((c, i) => {
      const n = s.concepts[i];
      if (c === n) return;
      if (out.conceptMap[c] && out.conceptMap[c] !== n) out.problems.push(`concept ${c} would become both ${out.conceptMap[c]} and ${n}`);
      else out.conceptMap[c] = n;
    });
  }
  return out;
}

/* media ids and concept ids in one pass, outside urls; plan id and version refreshed */
export function rewriteText(text, idMap, conceptMap, chapterId, planId, version) {
  const body = (seg) => seg
    .replace(MEDIA_G, (m) => idMap[m] ?? m)
    .replace(CONCEPT_G, (m) => conceptMap[m] ?? m)
    .replace(new RegExp(`${chapterId}_v\\d+`, "g"), planId)
    .replace(/("planVersion"\s*:\s*)\d+/g, `$1${version}`);
  let out = "", last = 0;
  for (const m of text.matchAll(URL_G)) { out += body(text.slice(last, m.index)) + m[0]; last = m.index + m[0].length; }
  return out + body(text.slice(last));
}

const FILES_WORK = ["tool.tsx", "tool.legacy.tsx", "status.json", "images.json", "readlist.md"];

/* local slots of a chapter: every work folder named by a media id that holds a slot.json */
export function localSlots(workChapterDir) {
  if (!fs.existsSync(workChapterDir)) return [];
  const out = [];
  for (const e of fs.readdirSync(workChapterDir, { withFileTypes: true })) {
    if (!e.isDirectory() || !MEDIA_RE.test(e.name)) continue;
    const f = path.join(workChapterDir, e.name, "slot.json");
    if (!fs.existsSync(f)) continue;
    try { const s = JSON.parse(fs.readFileSync(f, "utf8")); out.push({ id: e.name, tool_id: s.tool_id, title: s.title, description: s.description || s.desc, concepts: conceptsOf(s) }); } catch { /* an unreadable slot.json is left alone */ }
  }
  return out;
}

/* opts: { workChapterDir, outChapterDir, chapterId, planId, version, liveMounts: [slot objects], dry, backupDir } -> { lines, plan, changed } */
export function remapChapter(opts) {
  const { workChapterDir, outChapterDir, chapterId, planId, version, dry } = opts;
  const live = opts.liveMounts.map((s) => ({ id: s.id, tool_id: s.tool_id, title: s.title, description: s.description || s.desc, concepts: conceptsOf(s) }));
  const local = localSlots(workChapterDir);
  const plan = planRemap(local, live);
  const lines = [];
  if (!local.length) return { lines, plan, changed: false };
  const idMap = Object.fromEntries(plan.rename.map((r) => [r.from, r.to]));
  const stale = local.filter((l) => !plan.rename.some((r) => r.from === l.id));
  if (!plan.rename.length && !plan.problems.length && !plan.orphans.length && !plan.fresh.length) {
    return { lines, plan, changed: false };
  }
  lines.push(`remap ${chapterId} -> ${planId} v${version}${dry ? " (dry run)" : ""}`);
  for (const r of plan.rename) lines.push(`  ${r.from} -> ${r.to}  (${r.tool})`);
  for (const [c, n] of Object.entries(plan.conceptMap)) lines.push(`  concept ${c} -> ${n}`);
  if (plan.orphans.length) lines.push(`  local only (not in the live plan): ${plan.orphans.join(", ")}`);
  if (plan.fresh.length) lines.push(`  live only (no local tool yet): ${plan.fresh.join(", ")}`);
  for (const p of plan.problems) lines.push(`  PROBLEM ${p}`);
  if (plan.problems.length || dry) return { lines, plan, changed: false, problems: plan.problems };

  const touched = local.filter((l) => !plan.orphans.includes(l.id)).map((l) => l.id);
  /* 1. backup: every top-level file of each touched work slot and of its output pair */
  for (const id of touched) for (const [root, sub] of [[workChapterDir, "work"], [outChapterDir, "output-preview"]]) {
    const d = path.join(root, id);
    if (!fs.existsSync(d)) continue;
    const to = path.join(opts.backupDir, sub, id);
    fs.mkdirSync(to, { recursive: true });
    for (const e of fs.readdirSync(d, { withFileTypes: true })) if (e.isFile()) fs.copyFileSync(path.join(d, e.name), path.join(to, e.name));
  }
  lines.push(`  backup ${opts.backupDir}`);
  /* 2. folders, two-phase so a swap (A->B, B->A) cannot collide */
  for (const r of plan.rename) for (const root of [workChapterDir, outChapterDir]) {
    const from = path.join(root, r.from), to = path.join(root, r.to);
    if (!fs.existsSync(from)) continue;
    if (fs.existsSync(to) && !idMap[r.to]) throw new Error(`remap: ${to} already exists and is not being renamed; move it aside first`);
    fs.renameSync(from, from + ".remap-tmp");
  }
  for (const r of plan.rename) for (const root of [workChapterDir, outChapterDir]) {
    const tmp = path.join(root, r.from) + ".remap-tmp";
    if (fs.existsSync(tmp)) fs.renameSync(tmp, path.join(root, r.to));
  }
  /* 3. the pair's file names, then the text of every file that names an id */
  for (const r of plan.rename) for (const ext of [".tsx", ".json"]) {
    const f = path.join(outChapterDir, r.to, r.from + ext);
    if (fs.existsSync(f)) fs.renameSync(f, path.join(outChapterDir, r.to, r.to + ext));
  }
  const rewrite = (file) => {
    if (!fs.existsSync(file)) return;
    const s = fs.readFileSync(file, "utf8"), n = rewriteText(s, idMap, plan.conceptMap, chapterId, planId, version);
    if (n !== s) fs.writeFileSync(file, n);
  };
  for (const id of touched) {
    const now = idMap[id] || id;
    for (const f of FILES_WORK) rewrite(path.join(workChapterDir, now, f));
    for (const ext of [".tsx", ".json"]) rewrite(path.join(outChapterDir, now, now + ext));
  }
  lines.push(`  renamed ${plan.rename.length} slot(s); ${stale.length - plan.orphans.length} unchanged slot(s) got plan ${planId} v${version}`);
  if (plan.rename.length || touched.length) lines.push(`  next: run  node cli.mjs approve <slot> --ch <n> --note "plan re-key"  for each pair (a rename changes its bytes), then check/publish as usual.`);
  return { lines, plan, changed: true };
}
