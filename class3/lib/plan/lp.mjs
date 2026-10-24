/* The learning plan, read from lpv2 (the lp2_* tables of Python-backend's learning_plan_v2).
 *
 *   chapter_id  = {pub}_{medium}_{subject}{class}_ch{n}   e.g. indiannica_eng_maths<N>_ch1
 *   plan choice = active, else the highest version; a newer version than the one chosen is
 *                 reported, never silently skipped. --version latest|N overrides.
 *   mounts      = every dict whose type is 2d_tool (blob) or tool_2d (lp2_media spelling);
 *                 the two spellings are both correct, and neither is "fixed" here.
 */
import fs from "node:fs";
import pg from "pg";
import { CONFIG, lpDest } from "../core/env.mjs";

const TB = CONFIG.lpTables;
export const MEDIA_RE = /^M\d+\.S\d+\.T\d+\.C\d+\.2D\d+$/;

export function resolvePub(p) {
  const k = String(p || CONFIG.defaults.pub).trim().toLowerCase();
  return CONFIG.pubAliases[k] || k;
}

export function chapterIdFor({ klass, pub, medium, subject, ch }) {
  const d = CONFIG.defaults;
  return `${resolvePub(pub)}_${medium || d.medium}_${subject || d.subject}${klass || d.class}_ch${ch}`;
}

export async function withDb(env, fn) {
  lpDest();
  const url = env.get("DATABASE_URL");
  if (!url) throw new Error("DATABASE_URL is not set in .env or Python-backend/.env");
  const client = new pg.Client({ connectionString: url, connectionTimeoutMillis: 15000, query_timeout: 180000 });
  try {
    await client.connect();
  } catch (e) {
    const hint = /pg_hba/i.test(e.message)
      ? " (this machine's IP is not whitelisted on the DB VM; that is a network ACL, not a wrong password; use --plan-file meanwhile)"
      : "";
    throw new Error(`cannot reach lpv2 database: ${e.message}${hint}`);
  }
  try { return await fn(client); } finally { await client.end().catch(() => {}); }
}

export async function listChapters(db, prefix) {
  const ch = (await db.query(
    `SELECT chapter_id, chapter_number, chapter_name FROM ${TB.chapters} WHERE chapter_id LIKE $1 ORDER BY chapter_number`,
    [prefix + "%"])).rows;
  if (!ch.length) return [];
  const plans = (await db.query(
    `SELECT chapter_id, plan_id, version, is_active, status FROM ${TB.plans} WHERE chapter_id = ANY($1) ORDER BY version DESC`,
    [ch.map((c) => c.chapter_id)])).rows;
  return ch.map((c) => ({ ...c, plans: plans.filter((p) => p.chapter_id === c.chapter_id) }));
}

export async function chapterRow(db, chapterId) {
  return (await db.query(`SELECT * FROM ${TB.chapters} WHERE chapter_id = $1`, [chapterId])).rows[0] || null;
}

export async function plansFor(db, chapterId) {
  return (await db.query(`SELECT * FROM ${TB.plans} WHERE chapter_id = $1 ORDER BY version DESC`, [chapterId])).rows;
}

export function choosePlan(plans, want = CONFIG.defaults.version) {
  if (!plans.length) return { error: "no plan for this chapter in lpv2" };
  const latest = plans[0];
  const pinned = /^\d+$/.test(String(want));
  let chosen;
  if (want === "latest") chosen = latest;
  else if (pinned) chosen = plans.find((p) => Number(p.version) === Number(want));
  else chosen = plans.find((p) => p.is_active) || latest;
  if (!chosen) return { error: `version ${want} not found (have ${plans.map((p) => "v" + p.version).join(", ")})` };
  const how = want === "latest" ? "latest" : pinned ? "pinned" : chosen.is_active ? "active" : "latest, none active";
  const warning = Number(latest.version) > Number(chosen.version)
    ? `a newer version v${latest.version} exists (${latest.status || (latest.is_active ? "active" : "not active")}); use --version latest to build against it`
    : null;
  return { chosen, latest, how, warning };
}

export async function blobFor(db, planId) {
  return (await db.query(
    `SELECT plan_id, version, raw_json FROM ${TB.blobs} WHERE plan_id = $1 ORDER BY version DESC LIMIT 1`,
    [planId])).rows[0] || null;
}

/* A plan JSON from disk (maths_lp build output), for when the DB is unreachable. */
export function planFromFile(file) {
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return {
    raw,
    chapterId: raw.chapter_id,
    planId: raw.plan_id || `${raw.chapter_id}_v${raw.version || 1}`,
    version: raw.version || 1,
    how: "file",
    chapterName: raw.chapter_name || raw.unit_title || "",
  };
}

/* Every 2d_tool mount, with the module / segment / topic it sits in. A mount copied into
   several places in the blob is reported once (the first copy). */
export function mounts(raw) {
  const out = [];
  const seen = new Set();
  const walk = (node, trail, key) => {
    if (Array.isArray(node)) {
      const as = key === "modules" ? "module" : key === "segments" ? "segment" : key === "topics" ? "topic" : null;
      for (const x of node) walk(x, as ? { ...trail, [as]: x } : trail, null);
      return;
    }
    if (!node || typeof node !== "object") return;
    if ((node.type === "2d_tool" || node.type === "tool_2d") && typeof node.id === "string") {
      if (!seen.has(node.id)) { seen.add(node.id); out.push({ slot: node, trail }); }
      return;
    }
    for (const [k, v] of Object.entries(node)) if (v && typeof v === "object") walk(v, trail, k);
  };
  walk(raw, {}, null);
  return out;
}
