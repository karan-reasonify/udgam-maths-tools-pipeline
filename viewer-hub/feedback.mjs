#!/usr/bin/env node
/* feedback.mjs: the Editor's one door to the educator feedback (the `toolfeedback` table) and its screenshots.
 *
 *   node viewer-hub/feedback.mjs list    --class-dir <dir> --chapters a,b,c          JSON {chapters:{...}, live:{...}} on stdout
 *   node viewer-hub/feedback.mjs live    --class-dir <dir> --chapters a,b,c          JSON {<chapter>: {plan_id, version, mounts}} (the live plan)
 *   node viewer-hub/feedback.mjs resolve --class-dir <dir> --chapter c [--slot s]   JSON {resolved, rows}
 *   node viewer-hub/feedback.mjs shipped --class-dir <dir> --chapter c --slots a,b  JSON {resolved, rows, pending}
 *   node viewer-hub/feedback.mjs shot    --class-dir <dir> --url <feedback_url> --out <file>
 *
 * viewhub.mjs runs it as a CHILD process so the hub itself never reads .env or config.json: the database and the
 * GCS key come through the class's own lib (lib/core/env.mjs, lib/plan/lp.mjs, lib/ship/gcs.mjs), the same way
 * `node cli.mjs` reads them. Only `resolve` writes, and only the `status` column of the rows it names.
 *
 * UDGAM_FEEDBACK_FIXTURE=<file.json> reads (and resolves into) that file instead of the database: a JSON array of
 * rows shaped like the table's ({id, chapter_id, status, teacher_name, created_at, feedback_json}). For testing the
 * page without production data; never point it at anything real.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (k) => { const i = args.indexOf(`--${k}`); return i < 0 ? undefined : args[i + 1]; };
const classDir = path.resolve(opt("class-dir") || ".");
const lib = (p) => import(pathToFileURL(path.join(classDir, "lib", p)).href);
const FIXTURE = process.env.UDGAM_FEEDBACK_FIXTURE;

/* pending = the CV's 'pending', in any case, or no status at all (nothing has ever answered it) */
const SELECT = `SELECT id, plan_id, chapter_id, status, teacher_name, created_at, feedback_json
                  FROM toolfeedback WHERE chapter_id = ANY($1) AND COALESCE(LOWER(status), 'pending') = 'pending' ORDER BY created_at ASC`;
const isPending = (r) => String(r.status ?? "pending").toLowerCase() === "pending";
/* the plan calls a 2D tool `2d_tool` or `tool_2d` (lib/plan/lp.mjs mounts() reads both); feedback must not depend on which */
const isTool2d = (it) => !it.media_type || it.media_type === "2d_tool" || it.media_type === "tool_2d";

async function rowsFor(chapters) {
  if (FIXTURE) {
    const all = JSON.parse(fs.readFileSync(FIXTURE, "utf8"));
    return all.filter((r) => chapters.includes(r.chapter_id) && isPending(r));
  }
  const { env } = await lib("core/env.mjs");
  const { withDb } = await lib("plan/lp.mjs");
  return withDb(env(), async (db) => (await db.query(SELECT, [chapters])).rows);
}

/* rows -> one entry per (chapter, slot): the same grouping the Content-Validator's feedback uses everywhere
   (one row can name several tools; only 2d_tool items are ours) */
function group(rows) {
  const out = {};
  for (const r of rows) {
    for (const it of r.feedback_json || []) {
      const sid = it.media_id;
      if (!sid || !isTool2d(it)) continue;
      const g = ((out[r.chapter_id] ??= {})[sid] ??= { slot_id: sid, rows: [], items: [] });
      if (!g.rows.includes(r.id)) g.rows.push(r.id);
      g.items.push({
        row_id: r.id, text: String(it.feedback_text || "").trim(), image_url: it.feedback_url || "",
        teacher: r.teacher_name || "", created_at: r.created_at ? new Date(r.created_at).toISOString() : "",
      });
    }
  }
  return out;
}

async function markResolved(ids) {
  if (!ids.length) return 0;
  if (FIXTURE) {
    const all = JSON.parse(fs.readFileSync(FIXTURE, "utf8"));
    for (const r of all) if (ids.includes(r.id) && isPending(r)) r.status = "resolved";
    fs.writeFileSync(FIXTURE, JSON.stringify(all, null, 1));
    return ids.length;
  }
  const { env } = await lib("core/env.mjs");
  const { withDb } = await lib("plan/lp.mjs");
  // the CV writes only 'pending'; 'resolved' is the convention every pipeline uses on publish (a free string, no enum)
  return withDb(env(), async (db) => (await db.query(
    "UPDATE toolfeedback SET status = 'resolved' WHERE id = ANY($1) AND COALESCE(LOWER(status), 'pending') = 'pending'", [ids])).rowCount);
}

/* "Mark solved": an explicit human override, so the whole rows of that tool (or chapter) go, as in Tool_Pipeline.
   `slot` may be several ids (a,b): the tool's own and the ids a re-keyed plan filed its feedback under */
async function resolve(chapter, slot) {
  const groups = group(await rowsFor([chapter]))[chapter] || {};
  const want = slot ? String(slot).split(",").filter(Boolean) : null;
  const ids = want ? [...new Set(want.flatMap((s) => groups[s]?.rows ?? []))] : [...new Set(Object.values(groups).flatMap((g) => g.rows))];
  if (want && !ids.length) throw new Error(`no pending feedback for ${want.join(", ")} in ${chapter}`);
  return { resolved: await markResolved(ids), rows: ids };
}

/* The LIVE plan of each chapter (the active version, else the latest): its mount ids, tool ids and the url each mount names. A re-keyed plan
   renames a mount but keeps its url, and teachers file feedback under the live id, so the Editor joins feedback to the tool on disk by that
   url (id-independent) and sees when the chapter on disk is older than the live plan. Best effort: a chapter that cannot be read is left out. */
async function liveFor(chapters) {
  if (FIXTURE || !chapters.length) return {};
  try {
    const { env } = await lib("core/env.mjs");
    const { withDb, plansFor, blobFor, mounts } = await lib("plan/lp.mjs");
    return await withDb(env(), async (db) => {
      const out = {};
      for (const ch of chapters) {
        try {
          const plans = await plansFor(db, ch);
          const p = plans.find((x) => x.is_active) || plans[0];
          const blob = p && await blobFor(db, p.plan_id);
          if (!blob) continue;
          const raw = typeof blob.raw_json === "string" ? JSON.parse(blob.raw_json) : blob.raw_json;
          out[ch] = { plan_id: p.plan_id, version: Number(p.version), mounts: mounts(raw).map((m) => ({ id: m.slot.id, tool_id: m.slot.tool_id || "", url: m.slot["2d_tool_url"] || "" })) };
        } catch { /* this chapter only */ }
      }
      return out;
    });
  } catch { return {}; }
}

/* After a publish: a row is answered only when EVERY item on it is a 2d tool that just shipped. One row can name
   several tools, or a video or an image this pipeline never touches; resolving it early would bury those unread. */
async function shipped(chapter, slots) {
  const done = [], pending = [];
  for (const r of await rowsFor([chapter])) {
    const its = r.feedback_json || [];
    const touches = its.some((it) => slots.includes(it.media_id));
    if (!touches) continue;
    const all = its.every((it) => isTool2d(it) && slots.includes(it.media_id));
    (all ? done : pending).push(r.id);
  }
  return { resolved: await markResolved(done), rows: done, pending };
}

/* The screenshot, from OUR bucket only: a url arriving on a request must not become a way to read any GCS object
   with the pipeline's key. The DB stores the CDN url, the origin url or gs://; all three name one object. */
async function shot(url, out) {
  if (FIXTURE) { // a fixture's screenshots are local files beside it, and nothing else on disk is served
    const f = path.resolve(path.dirname(FIXTURE), url);
    if (!f.startsWith(path.dirname(path.resolve(FIXTURE)) + path.sep) || !fs.existsSync(f)) throw new Error("fixture screenshot not found beside the fixture");
    fs.copyFileSync(f, out); return;
  }
  const { env, CONFIG, fromRoot } = await lib("core/env.mjs");
  const E = env();
  const bucket = E.get("ORCH_GCS_BUCKET") || "learning_plan_assets";
  const u = String(url).split(/[?#]/)[0].trim();
  const obj = u.startsWith(`gs://${bucket}/`) ? u.slice(`gs://${bucket}/`.length)
    : u.includes(`/${bucket}/`) ? u.split(`/${bucket}/`)[1].replace(/^\/+/, "") : "";
  if (!obj) throw new Error(`not an object in ${bucket}: ${u.slice(0, 120)}`);
  const origin = (E.get("ORCH_ORIGIN_HOST") || "https://storage.googleapis.com").replace(/\/+$/, "");
  let r = await fetch(`${origin}/${bucket}/${obj.split("/").map(encodeURIComponent).join("/")}`).catch(() => null);
  if (!r?.ok) { // private object: read it with the key
    const { loadServiceAccount, accessToken } = await lib("ship/gcs.mjs");
    const token = await accessToken(loadServiceAccount(fromRoot(CONFIG.gcpKeyFile)));
    r = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodeURIComponent(obj)}?alt=media`,
      { headers: { authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error(`GCS ${obj}: HTTP ${r.status}`);
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, Buffer.from(await r.arrayBuffer()));
}

try {
  if (cmd === "list") {
    const chapters = String(opt("chapters") || "").split(",").filter(Boolean);
    const grouped = chapters.length ? group(await rowsFor(chapters)) : {};
    process.stdout.write(JSON.stringify({ chapters: grouped, live: await liveFor(Object.keys(grouped)) }));
  } else if (cmd === "live") {
    process.stdout.write(JSON.stringify(await liveFor(String(opt("chapters") || "").split(",").filter(Boolean))));
  } else if (cmd === "resolve") {
    process.stdout.write(JSON.stringify(await resolve(opt("chapter"), opt("slot"))));
  } else if (cmd === "shipped") {
    process.stdout.write(JSON.stringify(await shipped(opt("chapter"), String(opt("slots") || "").split(",").filter(Boolean))));
  } else if (cmd === "shot") {
    await shot(opt("url"), opt("out"));
  } else {
    throw new Error("usage: feedback.mjs list|resolve|shot --class-dir <dir> ...");
  }
} catch (e) {
  process.stderr.write(String(e.message || e));
  process.exit(1);
}
