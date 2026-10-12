/* publish <MEDIA_ID>: the standalone pair to the bucket, the TOOL_PASS way (maths_lp/tools/TOOL_PASS.md).
 * A DRY RUN unless --upload is given; the database is written only with --apply.
 *
 *   1 plan     the chapter's LATEST version (highest version, TOOL_PASS rule; --version N pins it);
 *              the live (active) version is reported beside it
 *   2 mount    the mount with this media id in that plan, matched exactly (never by position); its
 *              own 2d_tool_url names the bucket folder, which is never composed by hand
 *   3 files    output-preview/<chapter>/<id>/<id>.tsx + .json from port; the sidecar names the same mediaId and
 *              component, port was built from the checked source, and that check passed
 *   4 host     the .tsx passes the host scope gate and the size limits (700 KB target, 1 MB hard),
 *              and the host emulator plays every phase through window.toolApi. A tool on a SILENT runtime
 *              (`const SILENT_VOICE = true`, r30+; no TOOL_VOICE) has no clip step, the report says "silent: no
 *              clips". A tool on a VOICED runtime with baked Hindi/Gujarati voice is published as its SHIP COPY
 *              (lib/ship/voiceship.mjs): the clips leave the file as <sha1>.ogg files in <chapter>/2dtool/_voice/,
 *              uploaded FIRST and verified through the public url; the size limits apply to the ship copy
 *   5 bucket   what is live now at the two object paths, and what an upload would change
 *   6 db       the lp2_media row of that plan for this media id: does its url name that object
 *   --upload   back up whatever is live, upload .tsx (text/plain) and .json (application/json)
 *              through the upload API (TOOL_PASS) or, failing that, straight to GCS with the key;
 *              verify each against the STORED object by md5, then through the public url
 *   --apply    write lp2_media.url where it differs (that column only, this media id only)
 */
import fs from "node:fs";
import path from "node:path";
import { CONFIG, env, fromRoot } from "../core/env.mjs";
import { withDb, plansFor, blobFor, mounts } from "../plan/lp.mjs";
import { loadServiceAccount, accessToken, fetchRetry } from "./gcs.mjs";
import { hashOf } from "../check/check.mjs";
import { capsFor } from "../core/caps.mjs";
import { outDir, shipScope, md5 } from "./port.mjs";
import { hostsim } from "./hostsim.mjs";
import { shipVoice, checkShip, voiceMap, CLIP_DIR, CLIP_TYPE, CLIP_CACHE } from "./voiceship.mjs";
import { idOf, chapterOf, readStatus, writeStatus } from "../core/work.mjs";

const PUBLIC_BASE = "https://media.singularity-learn.com";
const UPLOAD_API = "https://beta.singularity-learn.com/agentapi/api/topics/upload";
const MIME = { ".tsx": "text/plain", ".json": "application/json" };
const TARGET_KB = 700, MAX_KB = 1024;

const b64hex = (b64) => Buffer.from(String(b64 || ""), "base64").toString("hex");

async function objectMeta(token, bucket, name) {
  const r = await fetchRetry(`https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodeURIComponent(name)}?fields=name,size,md5Hash,updated,cacheControl,contentType`,
    { headers: { authorization: `Bearer ${token}` } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GCS metadata ${name}: HTTP ${r.status}`);
  const j = await r.json();
  return { size: Number(j.size), md5: b64hex(j.md5Hash), updated: j.updated, cacheControl: j.cacheControl, contentType: j.contentType };
}

async function objectBytes(token, bucket, name) {
  const r = await fetchRetry(`https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodeURIComponent(name)}?alt=media`, { headers: { authorization: `Bearer ${token}` } });
  if (!r.ok) throw new Error(`GCS download ${name}: HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

/* TOOL_PASS method 1: raw multipart to the upload API (the base64 form-field method poisons the CDN) */
async function viaApi(api, bucket, folder, fname, data, mime) {
  try {
    const fd = new FormData();
    fd.append("files", new Blob([data], { type: mime }), fname);
    fd.append("folder_name", folder);
    fd.append("bucket_name", bucket);
    const r = await fetch(api, { method: "POST", body: fd });
    if (r.status !== 200) return null;
    const j = await r.json().catch(() => ({}));
    return (j.data && j.data[0] && j.data[0].publicUrl) || null;
  } catch { return null; }
}

/* TOOL_PASS method 2: straight to GCS with the service-account key (needs object write) */
async function viaGcs(token, bucket, name, data, mime, cacheControl) {
  const boundary = "c4" + Date.now().toString(16);
  const meta = JSON.stringify({ name, contentType: mime, cacheControl });
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\ncontent-type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${boundary}\r\ncontent-type: ${mime}\r\n\r\n`),
    data, Buffer.from(`\r\n--${boundary}--\r\n`)]);
  const r = await fetchRetry(`https://storage.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=multipart`, {
    method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": `multipart/related; boundary=${boundary}` }, body });
  if (!r.ok) throw new Error(`GCS upload ${name}: HTTP ${r.status} ${(await r.text()).slice(0, 160)}`);
}

/* the voice clips of a chapter: every object under <chapter>/2dtool/_voice/ -> its md5 (hex) */
async function listClips(token, bucket, prefix) {
  const have = new Map();
  let page = "";
  do {
    const r = await fetchRetry(`https://storage.googleapis.com/storage/v1/b/${bucket}/o?prefix=${encodeURIComponent(prefix)}&maxResults=1000&fields=items(name,md5Hash),nextPageToken${page ? "&pageToken=" + encodeURIComponent(page) : ""}`,
      { headers: { authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error(`GCS list ${prefix}: HTTP ${r.status}`);
    const j = await r.json();
    for (const it of j.items || []) have.set(it.name.slice(prefix.length), b64hex(it.md5Hash));
    page = j.nextPageToken || "";
  } while (page);
  return have;
}

async function retry(fn, n = 4) {
  let last;
  for (let i = 0; i < n; i++) { try { return await fn(); } catch (e) { last = e; if (/HTTP 40\d/.test(e.message)) break; await new Promise((r) => setTimeout(r, 1500 * (i + 1))); } }
  throw last;
}

/* upload the clip files (content-addressed, immutable), eight at a time; straight to GCS with the key, else
   through the upload API for the rest of the run */
async function putClips(sa, bucket, api, chapterFolder, todo, cacheControl) {
  let rw = null, viaApiOnly = false, next = 0;
  const failed = [];
  const one = async ([name, buf]) => {
    const obj = `${chapterFolder}/${CLIP_DIR}/${name}`;
    if (!viaApiOnly) {
      try { rw = rw || await accessToken(sa, "https://www.googleapis.com/auth/devstorage.read_write"); await retry(() => viaGcs(rw, bucket, obj, buf, CLIP_TYPE, cacheControl)); return; }
      catch (e) { if (/HTTP 40[13]/.test(e.message)) viaApiOnly = true; else { failed.push(`${name}: ${e.message.slice(0, 100)}`); return; } }
    }
    const got = await retry(() => viaApi(api, bucket, `${chapterFolder}/${CLIP_DIR}`, name, buf, CLIP_TYPE));
    if (!got) failed.push(`${name}: the upload API refused it`);
  };
  const worker = async () => { while (next < todo.length) await one(todo[next++]); };
  await Promise.all(Array.from({ length: 8 }, worker));
  return failed;
}

async function publicMd5(url) {
  try { const r = await fetch(url, { cache: "no-store" }); return r.ok ? md5(Buffer.from(await r.arrayBuffer())) : `HTTP ${r.status}`; } catch (e) { return String(e.message); }
}

export async function publish(dir, { upload = false, apply = false, offline = false, version = "latest", log = console.log } = {}) {
  const id = idOf(dir), E = env();
  const bucket = E.get("ORCH_GCS_BUCKET") || "learning_plan_assets";
  const cacheControl = E.get("ORCH_GCS_CACHE_CONTROL") || "public,max-age=60,must-revalidate";
  const api = E.get("ORCH_UPLOAD_API") || CONFIG.uploadApi || UPLOAD_API;
  const st = readStatus(dir);
  const chapterId = st.chapterId || chapterOf(dir);
  const problems = [], notes = [];
  const say = (k, v) => log(`  ${k.padEnd(11)}${v}`);
  log(`publish ${id} · ${chapterId} · ${upload ? "UPLOAD" : "dry run"}${apply ? " + apply" : ""}`);

  /* 1-2 plan and mount, 6 db: one connection. If lpv2 cannot be reached (this machine's IP not on the
     DB's allow-list), the plan copy fetched earlier stands in for 1-2, and 6 is reported as unchecked. */
  let dbInfo;
  try { dbInfo = await withDb(E, async (db) => {
    const plans = await plansFor(db, chapterId);
    if (!plans.length) throw new Error(`no plan for ${chapterId} in lpv2`);
    const phase2 = plans.filter((p) => Number(p.phase) === 2);
    const pool = phase2.length ? phase2 : plans;
    const chosen = /^\d+$/.test(String(version)) ? pool.find((p) => Number(p.version) === Number(version)) : pool[0];
    if (!chosen) throw new Error(`version ${version} not found (have ${pool.map((p) => "v" + p.version).join(", ")})`);
    const live = plans.find((p) => p.is_active);
    const blob = await blobFor(db, chosen.plan_id);
    const raw = typeof blob.raw_json === "string" ? JSON.parse(blob.raw_json) : blob.raw_json;
    const mount = mounts(raw).find((m) => m.slot.id === id);
    const rows = (await db.query(`SELECT media_code, url, updated_at FROM ${CONFIG.lpTables.media} WHERE plan_id = $1 AND media_type = 'tool_2d' AND media_code = $2`,
      [chosen.plan_id, id])).rows;
    return { chosen, live, mount, rows, db: true };
  }); } catch (e) {
    if (!/cannot reach lpv2/.test(e.message)) throw e;
    const planFile = path.join(path.dirname(dir), "plan.json");
    if (!fs.existsSync(planFile)) throw e;
    const raw = JSON.parse(fs.readFileSync(planFile, "utf8"));
    const mount = mounts(raw).find((m) => m.slot.id === id);
    dbInfo = { chosen: { plan_id: st.planId, version: st.version }, live: null, mount, rows: null, db: false };
    notes.push(`lpv2 unreachable (${e.message.split(":").slice(1).join(":").trim().slice(0, 90)}): plan and mount read from the copy fetched ${st.fetchedAt || "earlier"}; latest version and lp2_media NOT checked`);
  }
  const { chosen, live, mount, rows } = dbInfo;
  say("plan", `${chosen.plan_id} v${chosen.version}${chosen.is_active ? " (the live one)" : ""}${Number(chosen.phase) ? " · phase " + chosen.phase : ""}`);
  if (dbInfo.db && !live) notes.push("no active version: nothing is live for students yet");
  else if (live && live.plan_id !== chosen.plan_id) notes.push(`the live version is v${live.version} (${live.plan_id}); this publishes against v${chosen.version}, the latest`);
  if (!mount) throw new Error(`${id} is not a 2d_tool mount in ${chosen.plan_id}; nothing to publish to`);
  const url = mount.slot["2d_tool_url"] || "";
  const prefix = `${PUBLIC_BASE}/${bucket}/`;
  if (!url.startsWith(prefix) || !url.endsWith(`/${id}/${id}.tsx`)) throw new Error(`the mount's own 2d_tool_url is not <folder>/${id}/${id}.tsx under ${prefix}: ${url}`);
  const folder = url.slice(prefix.length).split("/").slice(0, -1).join("/");
  const chapterFolder = folder.split("/").slice(0, -1).join("/");   /* .../2dtool: the chapter's tools and their shared _voice/ */
  const voiceBase = `${prefix}${chapterFolder}/${CLIP_DIR}/`;
  const names = { ".tsx": `${folder}/${id}.tsx`, ".json": `${folder}/${id}.json` };
  const urls = { ".tsx": prefix + names[".tsx"], ".json": prefix + names[".json"] };
  say("mount", `${id} (${mount.slot.tool_id || mount.slot.title}) -> ${bucket}/${folder}/`);

  /* 3 files */
  const out = outDir(dir);
  const files = { ".tsx": path.join(out, `${id}.tsx`), ".json": path.join(out, `${id}.json`) };
  for (const f of Object.values(files)) if (!fs.existsSync(f)) throw new Error(`missing ${path.relative(fromRoot("."), f)}; run: node cli.mjs port ${id}`);
  const data = { ".tsx": fs.readFileSync(files[".tsx"]), ".json": fs.readFileSync(files[".json"]) };
  const side = JSON.parse(data[".json"].toString("utf8"));
  const hash = hashOf(dir);
  if (side.mediaId !== id || side.component !== `${id}.tsx`) problems.push(`the sidecar names ${side.mediaId} / ${side.component}`);
  if (!data[".tsx"].toString("utf8").includes(id)) problems.push("the .tsx does not carry its media id");
  if (!st.checks || st.checks.fail !== 0) problems.push("the last check did not pass");
  if (st.checkedTool !== hash) problems.push("the source changed since the last check");
  if (!side.build || side.build.source !== hash) problems.push("the standalone pair was not built from the current source; run port again");
  if (side.build && side.build.tsxMd5 !== md5(data[".tsx"])) problems.push("the .tsx changed after port (hand edits are not published)");
  /* a tool with baked Hindi/Gujarati voice is published as its SHIP COPY: the clips leave the file as <sha1>.ogg
     files under <chapter>/2dtool/_voice/ (lib/ship/voiceship.mjs); the local pair keeps them inline */
  const localTsx = data[".tsx"].toString("utf8");
  let ship = null, upTsx = data[".tsx"];
  if (voiceMap(localTsx)) {
    try {
      ship = shipVoice(localTsx, voiceBase);
      problems.push(...checkShip(localTsx, ship.tsx, ship.files, ship.index, voiceBase, MAX_KB).map((x) => "voice ship: " + x));
      upTsx = Buffer.from(ship.tsx, "utf8");
    } catch (e) { problems.push("voice ship: " + e.message); }
  }
  const up = { ".tsx": upTsx, ".json": data[".json"] };
  say("files", `${id}.tsx ${(upTsx.length / 1024).toFixed(1)} KB${ship ? ` (ship copy; ${(data[".tsx"].length / 1024).toFixed(0)} KB with the clips inline)` : ""} · ${id}.json ${(data[".json"].length / 1024).toFixed(1)} KB · checks ${st.checks ? `${st.checks.pass} pass / ${st.checks.fail} fail` : "none"}`);

  /* 4 host */
  const scope = shipScope(upTsx.toString("utf8"));
  problems.push(...scope.map((x) => "host scope: " + x));
  const kb = upTsx.length / 1024;
  if (kb > MAX_KB) problems.push(`${kb.toFixed(0)} KB is over the ${MAX_KB} KB hard limit`);
  else if (kb > TARGET_KB) notes.push(`${kb.toFixed(0)} KB is over the ${TARGET_KB} KB target`);
  log("  host       playing every phase in the host emulator...");
  const sim = await hostsim(files[".tsx"], side, { log });
  for (const r of sim.results) say("", `phase ${r.n} (${r.mode} mode): ${r.ok ? (r.n < sim.results.length ? `plays on through phase ${sim.results.length} and finishes` : "plays and finishes") : "FAILS: " + r.problems.join("; ")}${r.transpileMs !== undefined ? ` · host Babel ${r.transpileMs} ms` : ""}`);
  if (!sim.ok) problems.push("the host emulator did not play every phase");

  /* 5 bucket */
  const sa = loadServiceAccount(fromRoot(CONFIG.gcpKeyFile));
  const ro = await accessToken(sa);
  const remote = {};
  for (const ext of [".tsx", ".json"]) {
    remote[ext] = await objectMeta(ro, bucket, names[ext]);
    const r = remote[ext], local = md5(up[ext]);
    say(ext === ".tsx" ? "bucket" : "", `${id}${ext}: ${!r ? "not in the bucket yet (new)" : r.md5 === local ? "live copy is identical" : `live copy differs (${(r.size / 1024).toFixed(1)} KB, ${r.updated}) -> will be replaced`}`);
  }
  let clipsTodo = [];
  /* a tool on a silent runtime (r30+) declares no TOOL_VOICE: no clip step, and the report says so. A tool on a voiced
     runtime that has no baked voice prints nothing here, as it never did. */
  if (!ship && capsFor(dir).silent) say("voice", "silent: no clips");
  if (ship) {
    const have = await listClips(ro, bucket, `${chapterFolder}/${CLIP_DIR}/`);
    clipsTodo = [...ship.files].filter(([n, b]) => have.get(n) !== md5(b));
    const clipKb = Math.round([...ship.files.values()].reduce((a, b) => a + b.length, 0) / 1024);
    say("voice", `${ship.files.size} clip files (${clipKb} KB): ${clipsTodo.length} to upload, ${ship.files.size - clipsTodo.length} already in ${bucket}/${chapterFolder}/${CLIP_DIR}/ · base ${voiceBase}`);
  }

  /* 6 db */
  const row = rows ? rows[0] : null;
  const dbFix = !!row && row.url !== urls[".tsx"];
  if (!rows) say("lp2_media", "not checked (lpv2 unreachable from this machine)");
  else say("lp2_media", !row ? `NO ROW for ${id} in ${chosen.plan_id}` : dbFix ? `url differs: ${row.url} -> ${urls[".tsx"]}` : "url already names this object (0 rows to update)");
  if (rows && !row) problems.push(`lp2_media has no tool_2d row for ${id} in ${chosen.plan_id}`);
  if (upload && !rows && !offline) problems.push("lpv2 could not be read, so the latest version and the url row are unconfirmed; whitelist this IP, or pass --offline to upload anyway");
  if (apply && !rows) problems.push("--apply needs lpv2");
  for (const n of notes) say("note", n);
  if (problems.length) {
    for (const p of problems) say("REFUSED", p);
    writeStatus(dir, { publish: { at: new Date().toISOString(), ok: false, dry: !upload, problems } });
    return { ok: false, problems };
  }
  if (!upload) {
    say("ready", `every check passed. To upload to the ${chosen.is_active ? "live" : "latest"} version: node cli.mjs publish ${id} --upload${dbFix ? " --apply" : ""}`);
    writeStatus(dir, { publish: { at: new Date().toISOString(), ok: true, dry: true, plan: chosen.plan_id, urls } });
    return { ok: true, dry: true, urls };
  }

  /* --upload: back up, upload, verify */
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backup = path.join(out, "backup", stamp);
  for (const ext of [".tsx", ".json"]) if (remote[ext]) {
    fs.mkdirSync(backup, { recursive: true });
    fs.writeFileSync(path.join(backup, `${id}${ext}`), await objectBytes(ro, bucket, names[ext]));
  }
  if (fs.existsSync(backup)) say("backup", path.relative(fromRoot("."), backup));
  let rw = null;
  const results = {};
  /* the voice clips go up FIRST and are verified through the public url (bytes, and the CORS header a browser
     needs to read them from the app); if any fails, nothing of the live tool has been touched */
  let voiceRes = null;
  if (ship) {
    const failed = clipsTodo.length ? await putClips(sa, bucket, api, chapterFolder, clipsTodo, CLIP_CACHE) : [];
    const after = await listClips(ro, bucket, `${chapterFolder}/${CLIP_DIR}/`);
    const notStored = [...ship.files].filter(([n, b]) => after.get(n) !== md5(b)).map(([n]) => n);
    /* the origin the app runs from (the upload API's host): the CDN must answer the clips with the same
       Access-Control-Allow-Origin it gives the tool file, or a browser would refuse to read them */
    let origin = "";
    try { origin = new URL(api).origin; } catch { /* no origin to test with */ }
    const sample = [...clipsTodo, ...[...ship.files].filter(([n]) => !clipsTodo.some(([m]) => m === n)).slice(0, 3)];
    let pubBad = 0, cors = null, next = 0;
    const one = async ([n, b]) => {
      try {
        const r = await fetchRetry(voiceBase + n, { headers: origin ? { origin } : {}, cache: "no-store" });
        if (!r.ok || md5(Buffer.from(await r.arrayBuffer())) !== md5(b)) { pubBad++; return; }
        if (cors === null) cors = r.headers.get("access-control-allow-origin") || "";
      } catch { pubBad++; }
    };
    await Promise.all(Array.from({ length: 8 }, async () => { while (next < sample.length) await one(sample[next++]); }));
    voiceRes = { clips: ship.files.size, uploaded: clipsTodo.length - failed.length, failed: failed.length, notStored: notStored.length, publicBad: pubBad, cors };
    say("voice", `uploaded ${voiceRes.uploaded} of ${clipsTodo.length} new clips · stored md5 ${notStored.length ? notStored.length + " MISMATCH" : "ok"} · public md5 ${pubBad ? pubBad + " BAD" : "ok"} (${sample.length} fetched) · CORS allow-origin ${cors === null ? "unread" : cors || "(no header)"}`);
    if (failed.length) problems.push(`${failed.length} clip(s) failed to upload: ${failed.slice(0, 2).join("; ")}`);
    if (notStored.length) problems.push(`${notStored.length} clip(s) did not verify against the stored object`);
    if (pubBad) problems.push(`${pubBad} clip(s) are not served correctly at ${voiceBase}`);
    if (cors !== null && cors !== "*" && origin && cors !== origin) say("note", `the CDN answers CORS allow-origin "${cors}" for the app origin ${origin}: check that the app can read the clips`);
    if (problems.length) {
      writeStatus(dir, { stage: "ported", publish: { at: new Date().toISOString(), ok: false, dry: false, problems, voice: voiceRes } });
      for (const p of problems) say("REFUSED", p);
      return { ok: false, problems };
    }
  }
  for (const ext of [".tsx", ".json"]) {
    const want = md5(up[ext]);
    let method = "api:raw", got = await viaApi(api, bucket, `${folder}`, `${id}${ext}`, up[ext], MIME[ext]);
    let meta = got ? await objectMeta(ro, bucket, names[ext]) : null;
    if (!meta || meta.md5 !== want) {
      method = "gcs";
      rw = rw || await accessToken(sa, "https://www.googleapis.com/auth/devstorage.read_write");
      await viaGcs(rw, bucket, names[ext], up[ext], MIME[ext], cacheControl);
      meta = await objectMeta(ro, bucket, names[ext]);
    }
    const stored = !!meta && meta.md5 === want;
    const pub = await publicMd5(`${urls[ext]}?v=${want.slice(0, 12)}`);
    results[ext] = { method, stored, public: pub === want, cacheControl: meta && meta.cacheControl };
    say(ext === ".tsx" ? "uploaded" : "", `${id}${ext} via ${method}: stored ${stored ? "md5 ok" : "MISMATCH"} · public ${pub === want ? "md5 ok" : pub}`);
    if (!stored) problems.push(`${ext} did not verify against the stored object`);
  }
  const cdn = await publicMd5(urls[".tsx"]);
  if (cdn !== md5(up[".tsx"])) say("note", "the CDN still serves the previous .tsx (edge cache); a lesson opened now may get the old copy until it expires");
  let pushed = 0;
  if (!problems.length && apply && dbFix) {
    pushed = await withDb(E, async (db) => (await db.query(
      `UPDATE ${CONFIG.lpTables.media} SET url = $1, updated_at = now() WHERE plan_id = $2 AND media_code = $3 AND media_type = 'tool_2d' AND url IS DISTINCT FROM $1`,
      [urls[".tsx"], chosen.plan_id, id])).rowCount);
    say("lp2_media", `${pushed} row updated`);
  } else if (dbFix) say("lp2_media", "url differs; not written (add --apply)");
  writeStatus(dir, { stage: problems.length ? "ported" : "published", publish: { at: new Date().toISOString(), ok: !problems.length, dry: false, plan: chosen.plan_id, urls, results, voice: voiceRes, backup: fs.existsSync(backup) ? backup : null, rowsUpdated: pushed } });
  return { ok: !problems.length, problems, urls, results };
}
