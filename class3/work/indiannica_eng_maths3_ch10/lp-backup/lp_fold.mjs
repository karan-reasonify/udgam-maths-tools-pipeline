// Fold plan phase 4 into phase 3 for four mounts of class 3 chapter 10, IN PLACE, with NO version bump.
//   node lp_fold.mjs            dry run: prints the change, writes the backup file, writes nothing to the database
//   node lp_fold.mjs --apply    one transaction: blob + 4 media rows, the global content counter put back exactly, verified
//   node lp_fold.mjs --restore  one transaction: puts the backup back (same no-bump rule)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const CLASS3 = "C:/Users/Karan Shah/Desktop/reasonify/udgam-tool-pipeline/maths_pipeline/class3";
const { env, CONFIG } = await import(pathToFileURL(CLASS3 + "/lib/core/env.mjs").href);
const lp = await import(pathToFileURL(CLASS3 + "/lib/plan/lp.mjs").href);
const TB = CONFIG.lpTables;
const CH = "indiannica_eng_maths3_ch10";
const SLOTS = ["M1.S1.T2.C6.2D1", "M1.S1.T3.C11.2D1", "M1.S2.T4.C17.2D1", "M1.S2.T5.C22.2D1"];
const MODE = process.argv.includes("--apply") ? "apply" : process.argv.includes("--restore") ? "restore" : "dry";
const BACKUP = `${CLASS3}/work/${CH}/lp-backup/lp-before-fold.json`;
const num = (v) => Number(v);
const clone = (o) => JSON.parse(JSON.stringify(o));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const short = (v, n = 80) => { const s = typeof v === "string" ? v : JSON.stringify(v); return s.length > n ? s.slice(0, n - 3) + "..." : s; };

/* the transformation, on any object that has writeup and tool_config (a blob mount or a media_meta) */
function fold(m) {
  const tc = m.tool_config, wr = m.writeup;
  const pm = tc.phase_map;
  if (!Array.isArray(pm) || pm.length !== 4) throw new Error("phase_map is not the expected 4 phases");
  const i3 = pm.findIndex((x) => num(x.n) === 3), i4 = pm.findIndex((x) => num(x.n) === 4);
  if (i3 < 0 || i4 < 0) throw new Error("phase_map has no n=3 / n=4");
  const p3 = pm[i3], p4 = pm[i4];
  const ob3 = p3.objective_ids || [], ob4 = p4.objective_ids || [];
  p3.objective_ids = [...ob3, ...ob4.filter((x) => !ob3.includes(x))];
  const a = p3.plan_practice_items, b = p4.plan_practice_items;
  if (typeof a === "number" && typeof b === "number") p3.plan_practice_items = a + b;
  else if (typeof a === "string" && typeof b === "string" && /^\d+$/.test(a) && /^\d+$/.test(b)) p3.plan_practice_items = String(num(a) + num(b));
  else if (Array.isArray(a) && Array.isArray(b)) p3.plan_practice_items = [...a, ...b.filter((x) => !a.includes(x))];
  pm.splice(i4, 1);

  const wp = wr.phases;
  if (!Array.isArray(wp) || wp.length !== 4) throw new Error("writeup.phases is not the expected 4 phases");
  const w3 = wp.findIndex((x) => num(x.n) === 3), w4 = wp.findIndex((x) => num(x.n) === 4);
  if (w3 < 0 || w4 < 0) throw new Error("writeup.phases has no n=3 / n=4");
  const q3 = wp[w3], q4 = wp[w4];
  for (const k of Object.keys(q4)) {
    if (k === "n" || k === "concept") continue;
    if (typeof q3[k] === "string" && typeof q4[k] === "string" && q4[k].trim()) { const a3 = q3[k].trim(); q3[k] = a3 ? a3 + (/[.!?;:]$/.test(a3) ? " " : "; ") + q4[k].trim() : q4[k].trim(); }
    else if (Array.isArray(q3[k]) && Array.isArray(q4[k])) q3[k] = [...q3[k], ...q4[k]];
  }
  wp.splice(w4, 1);

  for (const grp of ["learn", "practice"]) {
    const items = tc.tool_questions && tc.tool_questions[grp] && tc.tool_questions[grp].items;
    for (const it of items || []) if (num(it.phase) === 4) it.phase = typeof it.phase === "number" ? 3 : "3";
  }
  if (typeof wr.practice === "string") wr.practice = wr.practice.replace(/\bfour phases\b/, "three phases");
}

function diffPaths(a, b, p, out) {
  if (same(a, b)) return;
  if (Array.isArray(a) && Array.isArray(b)) {
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) { if (i >= a.length || i >= b.length) out.push(p + "[" + i + "]"); else diffPaths(a[i], b[i], p + "[" + i + "]", out); }
  } else if (a && b && typeof a === "object" && typeof b === "object" && !Array.isArray(a) && !Array.isArray(b)) {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffPaths(a[k], b[k], p ? p + "." + k : k, out);
  } else out.push(p);
}
const region = (p) => /^writeup\.phases/.test(p) ? "writeup.phases" : /^tool_config\.phase_map/.test(p) ? "tool_config.phase_map" : /^tool_config\.tool_questions/.test(p) ? "tool_config.tool_questions" : p === "writeup.practice" ? "writeup.practice" : "OTHER";

function findMounts(raw) {
  const out = {};
  (function walk(o, p) {
    if (!o || typeof o !== "object") return;
    if (!Array.isArray(o) && typeof o.id === "string" && SLOTS.includes(o.id)) out[o.id] = { o, path: p.join(".") };
    for (const k of Object.keys(o)) walk(o[k], p.concat(k));
  })(raw, []);
  return out;
}
function summarise(label, m) {
  const pm = m.tool_config.phase_map.map((x) => `n${x.n}:${(x.concept_id || "").split(".").pop()}[${(x.objective_ids || []).join(",")}]x${x.plan_practice_items}`).join(" ");
  const cnt = (g) => { const c = {}; ((m.tool_config.tool_questions[g] || {}).items || []).forEach((i) => { c[i.phase] = (c[i.phase] || 0) + 1; }); return JSON.stringify(c); };
  return `${label}: phase_map ${pm} | writeup.phases ${m.writeup.phases.length} | learn ${cnt("learn")} practice ${cnt("practice")}`;
}

await lp.withDb(env(), async (db) => {
  const plans = await lp.plansFor(db, CH);
  const chosen = plans.find((p) => p.is_active) || plans[0];
  const blob = await lp.blobFor(db, chosen.plan_id);
  const raw = typeof blob.raw_json === "string" ? JSON.parse(blob.raw_json) : blob.raw_json;
  const med = (await db.query(`SELECT media_code, media_meta FROM ${TB.media} WHERE plan_id = $1 AND media_code = ANY($2) ORDER BY media_code`, [chosen.plan_id, SLOTS])).rows;
  const counter = (await db.query("SELECT * FROM lp_content_version WHERE id = 1")).rows[0];
  const cTrig = (await db.query(`SELECT tgname FROM pg_trigger WHERE tgrelid = 'lp_content_version'::regclass AND NOT tgisinternal`)).rows.map((r) => r.tgname);
  console.log(`plan ${chosen.plan_id} (is_active=${chosen.is_active}) blob version ${blob.version} | media rows ${med.length} | counter ${JSON.stringify({ id: counter.id, version: counter.version, bumped_at: counter.bumped_at })} | triggers on counter table: ${cTrig.join(",") || "none"}`);
  if (med.length !== 4) throw new Error("expected 4 media rows, found " + med.length);

  if (MODE === "restore") {
    const bk = JSON.parse(fs.readFileSync(BACKUP, "utf8"));
    await db.query("BEGIN");
    try {
      const c0 = (await db.query("SELECT version, bumped_at FROM lp_content_version WHERE id = 1 FOR UPDATE")).rows[0];
      const r1 = await db.query(`UPDATE ${TB.blobs} SET raw_json = $1::jsonb WHERE plan_id = $2 AND version = $3`, [JSON.stringify(bk.blob.raw_json), bk.blob.plan_id, bk.blob.version]);
      if (r1.rowCount !== 1) throw new Error("blob rows updated: " + r1.rowCount);
      for (const m of bk.media) { const r = await db.query(`UPDATE ${TB.media} SET media_meta = $1::jsonb WHERE plan_id = $2 AND media_code = $3`, [JSON.stringify(m.media_meta), bk.blob.plan_id, m.media_code]); if (r.rowCount !== 1) throw new Error("media rows updated for " + m.media_code + ": " + r.rowCount); }
      await db.query("UPDATE lp_content_version SET version = $1, bumped_at = $2 WHERE id = 1", [c0.version, c0.bumped_at]);
      const c1 = (await db.query("SELECT version, bumped_at FROM lp_content_version WHERE id = 1")).rows[0];
      if (c1.version !== c0.version || String(c1.bumped_at) !== String(c0.bumped_at)) throw new Error("counter not restored");
      await db.query("COMMIT");
      console.log("RESTORED from", BACKUP, "| counter unchanged:", c1.version);
    } catch (e) { await db.query("ROLLBACK"); throw e; }
    return;
  }

  // backup of exactly what will be touched (written in dry and apply modes; never overwritten if it already exists)
  fs.mkdirSync(path.dirname(BACKUP), { recursive: true });
  if (!fs.existsSync(BACKUP)) {
    fs.writeFileSync(BACKUP, JSON.stringify({ taken_at: new Date().toISOString(), plan_id: chosen.plan_id, note: "state BEFORE folding plan phase 4 into phase 3 for four mounts; restore with: node lp_fold.mjs --restore", blob: { plan_id: blob.plan_id, version: blob.version, raw_json: raw }, media: med.map((r) => ({ media_code: r.media_code, media_meta: r.media_meta })), counter: { version: counter.version, bumped_at: counter.bumped_at } }));
    console.log("backup written:", BACKUP, `(${(fs.statSync(BACKUP).size / 1024).toFixed(0)} KB)`);
  } else console.log("backup already exists (kept):", BACKUP);

  const newRaw = clone(raw), mounts = findMounts(newRaw), before = findMounts(raw);
  const newMedia = med.map((r) => ({ media_code: r.media_code, before: r.media_meta, after: clone(r.media_meta) }));
  let outside = 0;
  for (const id of SLOTS) {
    if (!mounts[id]) throw new Error(id + " not found in the blob");
    console.log("\n##", id, "(blob at " + mounts[id].path + ")");
    console.log("  BEFORE", summarise("blob ", before[id].o));
    fold(mounts[id].o);
    console.log("  AFTER ", summarise("blob ", mounts[id].o));
    const d = []; diffPaths(before[id].o, mounts[id].o, "", d);
    const by = {}; d.forEach((p) => { const r = region(p); by[r] = (by[r] || 0) + 1; if (r === "OTHER") { outside++; console.log("   UNEXPECTED CHANGE:", p); } });
    console.log("  changed paths by region:", JSON.stringify(by));
    const mm = newMedia.find((x) => x.media_code === id);
    fold(mm.after);
    console.log("  media_meta", summarise("row ", mm.after));
    const d2 = []; diffPaths(mm.before, mm.after, "", d2);
    const by2 = {}; d2.forEach((p) => { const r = region(p); by2[r] = (by2[r] || 0) + 1; if (r === "OTHER") { outside++; console.log("   UNEXPECTED CHANGE (media):", p); } });
    console.log("  media_meta changed paths by region:", JSON.stringify(by2));
    const w = mounts[id].o.writeup.phases.find((x) => num(x.n) === 3);
    console.log("  merged phase 3 writeup.goal:", short(w.goal, 230));
    console.log("  writeup.practice:", short(mounts[id].o.writeup.practice, 120));
    if (!same(mounts[id].o.writeup, mm.after.writeup) || !same(mounts[id].o.tool_config.phase_map, mm.after.tool_config.phase_map)) console.log("  NOTE: blob mount and media_meta differ in writeup or phase_map (they were already different before? check)");
  }
  const all = []; diffPaths(raw, newRaw, "", all);
  const outsideMounts = all.filter((p) => !SLOTS.some((id) => p.startsWith(mounts[id].path.split(".").reduce((s, k) => s + (/^\d+$/.test(k) ? "[" + k + "]" : (s ? "." : "") + k), "")))).length;
  console.log("\nWHOLE BLOB: changed paths", all.length, "| outside the four mounts:", outsideMounts, "| unexpected-region changes inside mounts:", outside);
  console.log("plan version fields kept: raw.version", newRaw.version, "(was", raw.version + ") | plan_meta kept:", same(raw.plan_meta, newRaw.plan_meta));

  if (MODE === "dry") { console.log("\nDRY RUN: nothing written to the database."); return; }
  if (outside || outsideMounts) throw new Error("refusing to apply: changes outside the expected regions");

  await db.query("BEGIN");
  try {
    const c0 = (await db.query("SELECT version, bumped_at FROM lp_content_version WHERE id = 1 FOR UPDATE")).rows[0];
    const r1 = await db.query(`UPDATE ${TB.blobs} SET raw_json = $1::jsonb WHERE plan_id = $2 AND version = $3`, [JSON.stringify(newRaw), blob.plan_id, blob.version]);
    if (r1.rowCount !== 1) throw new Error("blob rows updated: " + r1.rowCount);
    for (const m of newMedia) { const r = await db.query(`UPDATE ${TB.media} SET media_meta = $1::jsonb WHERE plan_id = $2 AND media_code = $3`, [JSON.stringify(m.after), chosen.plan_id, m.media_code]); if (r.rowCount !== 1) throw new Error("media rows updated for " + m.media_code + ": " + r.rowCount); }
    const bumped = (await db.query("SELECT version FROM lp_content_version WHERE id = 1")).rows[0].version;
    await db.query("UPDATE lp_content_version SET version = $1, bumped_at = $2 WHERE id = 1", [c0.version, c0.bumped_at]);
    const c1 = (await db.query("SELECT version, bumped_at FROM lp_content_version WHERE id = 1")).rows[0];
    if (c1.version !== c0.version || String(c1.bumped_at) !== String(c0.bumped_at)) throw new Error("counter not restored");
    const back = (await db.query(`SELECT raw_json FROM ${TB.blobs} WHERE plan_id = $1 AND version = $2`, [blob.plan_id, blob.version])).rows[0].raw_json;
    const bm = findMounts(back);
    for (const id of SLOTS) if (bm[id].o.tool_config.phase_map.length !== 3 || bm[id].o.writeup.phases.length !== 3) throw new Error("read-back check failed for " + id);
    await db.query("COMMIT");
    console.log(`\nAPPLIED in one transaction. Counter went ${c0.version} -> ${bumped} (the trigger) -> ${c1.version} (put back) before commit; final ${c1.version}, bumped_at unchanged. Read-back: 3 phases in all four mounts.`);
  } catch (e) { await db.query("ROLLBACK"); throw e; }
});
