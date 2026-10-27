/* The Editor's server half: /api/feedback/* on the hub. Educator feedback -> a Claude Code fix -> check -> publish,
 * for the Udgam tools, the way Tool_Pipeline's preview Editor does it for the NCERT ones, but on THIS pipeline:
 *
 *   the queue      pending rows of `toolfeedback` for every chapter that has a class<N>/work/<chapter_id>/ folder
 *                  (viewer-hub/feedback.mjs, a child process that reads the DB through the class's own lib)
 *   the fix        "Apply feedback in the IDE" / "In a terminal" write work/<ch>/<id>/_feedback/REVISE_PROMPT.md (the
 *                  feedback, the screenshots, the udgam steps: edit tool.tsx -> check, which ports on a pass) and
 *                  snapshot the baseline the diff and Discard read; a human watches and steers Claude Code
 *   the publish    `node cli.mjs publish <chapter_id>/<id> --upload [--apply]`, per ticked tool, only from the
 *                  publish dialog's button; each tool that ships has its feedback marked resolved
 *
 * Every POST is same-origin only (hostOk in viewhub.mjs) and every chapter/slot name is checked against the disk.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PIPELINE = path.resolve(HERE, "..");
const FEEDBACK = path.join(HERE, "feedback.mjs");
const SAFE = /^[A-Za-z0-9_.-]{1,120}$/;
const CHAPTER_CLASS = /^[a-z0-9]+_[a-z]+_[a-z]+?(\d+)_ch\d+$/i;
const LIST_TTL_MS = 60_000;

const outDirOf = (c) => {
  try { return path.join(c.dir, JSON.parse(fs.readFileSync(path.join(c.dir, "pipeline.config.json"), "utf8").replace(/^﻿/, "")).outDir || "output-preview"); }
  catch { return path.join(c.dir, "output-preview"); }
};
const IST = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
/* the table keeps feedback times in UTC; the prompt (like the page) shows them in IST */
const istStamp = (iso) => {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const p = Object.fromEntries(IST.formatToParts(t).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute} IST`;
};
const read = (f) => { try { return fs.readFileSync(f, "utf8"); } catch { return null; } };
const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };

export function makeEditorApi({ discoverClasses, ensureRunning, send }) {
  /* ---- where a chapter lives ------------------------------------------------------------------- */

  /* every chapter with a work folder, mapped to the class folder that holds it: the class its id names first
     (class 5 chapter 9 was begun in class4/work/ and may sit in both), any class that has it otherwise */
  function chapters() {
    const out = new Map();
    const classes = discoverClasses();
    for (const c of classes) {
      const work = path.join(c.dir, "work");
      if (!fs.existsSync(work)) continue;
      for (const e of fs.readdirSync(work, { withFileTypes: true })) {
        if (!e.isDirectory() || !SAFE.test(e.name)) continue;
        const named = Number(CHAPTER_CLASS.exec(e.name)?.[1]);
        const prev = out.get(e.name);
        if (!prev || (named === c.class && prev.class !== named)) out.set(e.name, c);
      }
    }
    return out;
  }

  function slotOf(chapter, slot) {
    if (!SAFE.test(chapter || "") || (slot !== undefined && !SAFE.test(slot || ""))) return null;
    const c = chapters().get(chapter);
    if (!c) return null;
    const work = path.join(c.dir, "work", chapter, slot ?? "");
    if (slot !== undefined && !fs.existsSync(path.join(work, "slot.json"))) return null;
    const out = slot ? path.join(outDirOf(c), chapter, slot) : null;
    return { c, chapter, slot, work, fb: path.join(work, "_feedback"), out, outTsx: out && path.join(out, `${slot}.tsx`), outJson: out && path.join(out, `${slot}.json`) };
  }

  /* what the queue and the publish dialog say about one slot */
  function slotInfo(s) {
    const status = readJson(path.join(s.work, "status.json")) || {};
    const side = readJson(s.outJson);
    const before = read(path.join(s.fb, "tool.before.tsx"));
    const tool = read(path.join(s.work, "tool.tsx"));
    return {
      slot_id: s.slot, class: s.c.class, title: side?.title || readJson(path.join(s.work, "slot.json"))?.title || s.slot,
      in_plan: true, ported: fs.existsSync(s.outTsx), stage: status.stage || "", checks: status.checks || null,
      prepared: fs.existsSync(path.join(s.fb, "REVISE_PROMPT.md")),
      revised: before !== null && tool !== null && before !== tool,
      published_at: status.publishedAt || (status.stage === "published" ? status.updatedAt : null) || null,
    };
  }

  /* A re-keyed plan renumbers a chapter's media ids (C15 -> C14) but keeps each mount's 2d_tool_url, and teachers file feedback
     under the LIVE id. So feedback is joined to the tool on disk by the url's <stem>/<stem>.tsx (id-independent): the folder the
     live mount names is the folder our tool was published to. Where that cannot be told (a tool never published from here), the one
     tool on disk at the same M#.S#.T# place stands in. Either way the feedback shows up under the tool that can be fixed. */
  const stemOf = (url) => /\/([^/]+)\/\1\.tsx$/.exec(String(url || ""))?.[1] || "";
  const localSlots = (c, chapter) => {
    const dir = path.join(c.dir, "work", chapter);
    try { return fs.readdirSync(dir).filter((x) => SAFE.test(x) && fs.existsSync(path.join(dir, x, "slot.json"))); } catch { return []; }
  };
  function localFor(c, chapter, sid, live) {
    const have = localSlots(c, chapter);
    const stem = stemOf(live?.mounts.find((m) => m.id === sid)?.url);
    if (stem) {
      const hit = have.filter((x) => stemOf(readJson(path.join(c.dir, "work", chapter, x, "status.json"))?.published?.urls?.[".tsx"]) === stem);
      if (hit.length === 1) return { slot: hit[0], via: "its published url" };
    }
    const place = /^(M\d+\.S\d+\.T\d+)\./.exec(sid)?.[1];
    const hits = place ? have.filter((x) => x.startsWith(`${place}.`)) : [];
    return hits.length === 1 ? { slot: hits[0], via: "its place in the chapter" } : null;
  }

  const newestClassDir = () => discoverClasses().at(-1)?.dir;

  function runNode(argv, cwd, { onLine } = {}) {
    return new Promise((resolve) => {
      const child = spawn(process.execPath, argv, { cwd, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
      let out = "", err = "";
      const tap = (stream) => (buf) => {
        const s = String(buf);
        if (stream === "out") out += s; else err += s;
        if (onLine) for (const l of s.split(/\r?\n/)) if (l.trim()) onLine(l, stream);
      };
      child.stdout.on("data", tap("out"));
      child.stderr.on("data", tap("err"));
      child.on("error", (e) => resolve({ code: -1, out, err: err + e.message }));
      child.on("close", (code) => resolve({ code, out, err }));
    });
  }
  const feedback = async (args) => {
    const r = await runNode([FEEDBACK, ...args, "--class-dir", newestClassDir()], PIPELINE);
    if (r.code !== 0) throw new Error((r.err || r.out || `feedback.mjs exit ${r.code}`).trim().slice(-400));
    return r.out ? JSON.parse(r.out) : {};
  };

  /* ---- the queue ---------------------------------------------------------------------------------- */

  /* the DB rows are cached (one query a minute at most, however often the page asks); what the disk says about each
     slot (ported, revised, in the IDE) is read fresh on every request */
  let listCache = null, listInflight = null;
  async function rows(fresh) {
    if (!fresh && listCache && Date.now() - listCache.at < LIST_TTL_MS) return listCache.data;
    if (listInflight) return listInflight;
    listInflight = feedback(["list", "--chapters", [...chapters().keys()].join(",")])
      .then((data) => { listCache = { at: Date.now(), data }; return data; })
      .finally(() => { listInflight = null; });
    return listInflight;
  }
  async function list(fresh) {
    const raw = await rows(fresh);
    const chs = chapters();
    const out = { chapters: {} };
    for (const [chapter, slots] of Object.entries(raw.chapters || {})) {
      const c = chs.get(chapter);
      if (!c) continue;
      const live = raw.live?.[chapter] || null;
      const merged = {}; // the tool the feedback is about (on disk when it can be told) -> everything filed for it, under any id
      for (const [sid, g] of Object.entries(slots)) {
        const hit = slotOf(chapter, sid) ? null : localFor(c, chapter, sid, live);
        const to = hit?.slot || sid;
        const m = (merged[to] ??= { slot_id: to, rows: [], items: [], filed_as: {} });
        for (const r of g.rows) if (!m.rows.includes(r)) m.rows.push(r);
        m.items.push(...g.items.map((it) => ({ ...it, filed_as: sid })));
        if (to !== sid) m.filed_as[sid] = hit.via;
      }
      const bySlot = {};
      for (const [sid, m] of Object.entries(merged)) {
        m.items.sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
        const { filed_as, ...g } = m, s = slotOf(chapter, sid);
        bySlot[sid] = s
          ? { ...g, ...slotInfo(s), aliases: Object.keys(filed_as), alias_via: filed_as, in_live_plan: live ? live.mounts.some((x) => x.id === sid) : null, live_version: live?.version ?? null }
          : { ...g, slot_id: sid, class: c.class, title: sid, in_plan: false, aliases: [] };
      }
      out.chapters[chapter] = { class: c.class, slots: bySlot };
    }
    return out;
  }

  /* the live plan of one chapter (also one with no feedback: the Preview page's publish buttons ask), a minute at most between reads */
  const liveCache = new Map();
  async function liveOf(chapter) {
    const hit = liveCache.get(chapter);
    if (hit && Date.now() - hit.at < LIST_TTL_MS) return hit.live;
    const live = (await feedback(["live", "--chapters", chapter]).catch(() => ({})))[chapter] || null;
    liveCache.set(chapter, { at: Date.now(), live });
    return live;
  }

  /* a tool's own id plus every id its feedback was filed under (a re-keyed plan): what "Mark solved" and a publish resolve */
  async function feedbackIds(chapter, slot) {
    try { return [slot, ...((await list(false)).chapters?.[chapter]?.slots?.[slot]?.aliases || [])]; } catch { return [slot]; }
  }

  /* ---- runs (publish), streamed over SSE so a reload re-attaches ------------------------------------ */

  const runs = new Map();   // runId -> { events, done, subs }
  const active = new Map(); // chapter -> runId
  function startRun(chapter, work) {
    const running = active.get(chapter);
    if (running && !runs.get(running)?.done) throw Object.assign(new Error(`a run is already in flight on ${chapter}`), { status: 409 });
    const runId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const run = { events: [], done: false, subs: new Set() };
    runs.set(runId, run); active.set(chapter, runId);
    const emit = (ev) => { run.events.push(ev); for (const s of run.subs) s.write(`data: ${JSON.stringify(ev)}\n\n`); };
    const log = (text, stream = "out") => emit({ type: "log", stream, text });
    work(log).then((code) => emit({ type: "done", code }), (e) => { log(String(e.message || e), "err"); emit({ type: "done", code: 1 }); })
      .finally(() => {
        run.done = true; for (const s of run.subs) s.end(); run.subs.clear();
        if (active.get(chapter) === runId) active.delete(chapter);
        listCache = null;
        setTimeout(() => runs.delete(runId), 10 * 60_000);
      });
    return runId;
  }

  async function publishMany(chapter, slots, { upload, apply, resolve = true }, log) {
    const ok = [];
    for (const sid of slots) {
      const s = slotOf(chapter, sid);
      log(`\n== ${sid} ${upload ? "· UPLOAD" : "· dry run"}${apply ? " · --apply" : ""} ==`);
      const argv = ["cli.mjs", "publish", `${chapter}/${sid}`, ...(upload ? ["--upload"] : []), ...(apply ? ["--apply"] : [])];
      const r = await runNode(argv, s.c.dir, { onLine: log });
      // shipped = exit 0 AND the slot's own record of a real (not dry) publish that passed
      const rec = readJson(path.join(s.work, "status.json"))?.publish;
      if (r.code !== 0 || (upload && !(rec?.ok && rec.dry === false))) { log(`${sid}: publish did not go through (exit ${r.code})`, "err"); continue; }
      ok.push(sid);
      // shipped: its revision baseline is spent
      if (upload) for (const f of ["tool.before.tsx", "port.before.tsx"]) fs.rmSync(path.join(s.fb, f), { force: true });
    }
    if (upload && ok.length && resolve) { // the Editor's Approve & publish resolves what it fixed; the Preview page's buttons leave the feedback alone
      try {
        const d = await feedback(["shipped", "--chapter", chapter, "--slots", (await Promise.all(ok.map((sid) => feedbackIds(chapter, sid)))).flat().join(",")]);
        log(`feedback: ${d.resolved} row(s) resolved${d.pending.length ? `; ${d.pending.length} row(s) left pending because they also name a tool or media that did not ship (${d.pending.join(", ")})` : ""}`);
      } catch (e) { log(`could not mark the feedback resolved: ${e.message}`, "err"); }
    }
    log(`\npublish ${chapter}: ${ok.length}/${slots.length} ok`);
    return ok.length === slots.length ? 0 : 1;
  }

  /* ---- the fix: a prompt, the screenshots, a baseline, then hand it to a human-driven session ------ */

  async function prepare(s, items) {
    fs.mkdirSync(s.fb, { recursive: true });
    const shots = [];
    for (const [i, it] of items.entries()) {
      if (!it.image_url) continue;
      const dst = path.join(s.fb, `feedback-${i + 1}.png`);
      try { if (!fs.existsSync(dst)) await feedback(["shot", "--url", it.image_url, "--out", dst]); shots.push(dst); } catch { /* the words still go in */ }
    }
    // write-once: a second "Open in IDE" must keep the ORIGINAL, or the diff and Discard lose it
    const base = path.join(s.fb, "tool.before.tsx");
    const newBaseline = !fs.existsSync(base);
    if (newBaseline) {
      fs.copyFileSync(path.join(s.work, "tool.tsx"), base);
      if (fs.existsSync(s.outTsx)) fs.copyFileSync(s.outTsx, path.join(s.fb, "port.before.tsx"));
    }
    const rel = (p) => path.relative(PIPELINE, p).split(path.sep).join("/");
    const target = `${s.chapter}/${s.slot}`;
    const prompt = [
      `# Revise ${s.slot} (${s.chapter}) from educator feedback`,
      "",
      `Udgam maths pipeline, class folder \`${rel(s.c.dir)}/\`. Run every CLI command there (\`cd ${rel(s.c.dir)}\`).`,
      `Fix ONLY what the feedback below asks, in this one tool. Never touch another tool, chapter or class.`,
      "",
      "## Read first",
      `- \`${rel(path.join(s.c.dir, "docs", "PREFLIGHT.md"))}\`, then the slot's \`readlist.md\` (only the sections the fix needs)`,
      `- \`${rel(path.join(s.work, "brief.md"))}\` (headings), then \`${rel(path.join(s.work, "tool.tsx"))}\` by range`,
      "- each screenshot below: Read the PNG and look at what the educator circled or drew on",
      "",
      "## Feedback",
      ...items.map((it, i) => {
        const shot = shots.find((p) => p.endsWith(`feedback-${i + 1}.png`));
        return `${i + 1}. ${it.text || "(no text)"}  \n   _${it.teacher || "unknown"} · ${istStamp(it.created_at)}${it.filed_as && it.filed_as !== s.slot ? ` · filed under the live plan's id ${it.filed_as}: the same tool` : ""}_` + (shot ? `  \n   screenshot: \`${rel(shot)}\`` : it.image_url ? "  \n   screenshot: could not be downloaded" : "");
      }),
      "",
      "## Steps",
      `1. Edit \`tool.tsx\` (edit, never rewrite). A changed English line changes its \`TR\` key in the same edit.`,
      `2. \`node cli.mjs check ${target} --no-render\` until it is clean, then ONE full \`node cli.mjs check ${target}\` (it ports on a pass; the Editor's After render and diff update from that).`,
      "3. Report in at most 15 lines: what each feedback item needed and what you changed.",
      "",
      "## Never",
      "- publish or upload (the reviewer approves in the Editor), or run `--apply`",
      "- read `.env`, `config.json`, `voice.tsx`, `images.tsx`, `*.preview.html`, `.build/` or another chapter's `work/`",
      `- edit anything in \`_feedback/\` (\`tool.before.tsx\` is the baseline the diff and Discard read)`,
      "",
    ].join("\n");
    const promptFile = path.join(s.fb, "REVISE_PROMPT.md");
    fs.writeFileSync(promptFile, prompt);
    return { slot_dir: s.work, prompt_file: promptFile, cwd: PIPELINE, shots: shots.map(rel), new_baseline: newBaseline,
      bootstrap: `Read ${rel(promptFile)} and follow it exactly.` };
  }

  /* ---- routes ---------------------------------------------------------------------------------- */

  const json = (res, status, body) => send(res, status, body);
  const body = (req) => new Promise((resolve, reject) => {
    let b = ""; req.on("data", (c) => { b += c; if (b.length > 1e5) req.destroy(); });
    req.on("end", () => { try { resolve(JSON.parse(b || "{}")); } catch { reject(new Error("bad json")); } });
  });

  return async function handle(req, res, url) {
    const p = url.pathname.replace(/^\/api\/feedback/, "");
    const q = (k) => url.searchParams.get(k) || "";
    // these spend our GCS credentials or start a viewer: only this page (or a typed URL) may ask
    const site = req.headers["sec-fetch-site"];
    if ((p === "/shot" || p === "/render") && site && site !== "same-origin" && site !== "none") return json(res, 403, { error: "cross-origin request refused" });

    if (req.method === "GET" && p === "/list") {
      try { return json(res, 200, await list(q("fresh") === "1")); }
      catch (e) { return json(res, 200, { chapters: {}, offline: e.message }); }
    }

    if (req.method === "GET" && p === "/stream") {
      const run = runs.get(q("runId"));
      if (!run) return json(res, 404, { error: "unknown run" });
      res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache", connection: "keep-alive" });
      for (const ev of run.events) res.write(`data: ${JSON.stringify(ev)}\n\n`);
      if (run.done) return res.end();
      run.subs.add(res); req.on("close", () => run.subs.delete(res));
      return;
    }

    if (req.method === "GET" && p === "/shot") {
      const target = q("url");
      if (!/^(https?|gs):\/\/[^\s"'<>]{4,600}$/i.test(target) && !process.env.UDGAM_FEEDBACK_FIXTURE) return json(res, 400, { error: "bad url" });
      const tmp = path.join(os.tmpdir(), `udgam-shot-${process.pid}-${Math.random().toString(36).slice(2)}.png`);
      try {
        await feedback(["shot", "--url", target, "--out", tmp]);
        const buf = fs.readFileSync(tmp);
        const type = buf[0] === 0xff ? "image/jpeg" : buf.slice(8, 12).toString() === "WEBP" ? "image/webp" : "image/png";
        res.writeHead(200, { "content-type": type, "content-length": buf.length, "cache-control": "private, max-age=3600" });
        return res.end(buf);
      } catch (e) { return json(res, 502, { error: e.message }); }
      finally { fs.rmSync(tmp, { force: true }); }
    }

    /* the source behind the diff: work tool.tsx now and the baseline the fix started from */
    if (req.method === "GET" && p === "/tool") {
      const s = slotOf(q("chapter"), q("slot"));
      if (!s) return json(res, 404, { error: "no such slot on disk" });
      const mt = (f) => { try { return fs.statSync(f).mtimeMs; } catch { return 0; } };
      return json(res, 200, {
        tsx: read(path.join(s.work, "tool.tsx")), before: read(path.join(s.fb, "tool.before.tsx")),
        portBefore: fs.existsSync(path.join(s.fb, "port.before.tsx")), ...slotInfo(s),
        stamp: `${mt(path.join(s.work, "tool.tsx"))}:${mt(s.outTsx)}`, class: s.c.class, port: s.c.port,
      });
    }

    /* one tool as the host runs it, for the Before/After frames: the class viewer's own libraries and host
       template (src= /c/<n>/ on the hub, so nothing is copied), the ported .tsx (after) or the snapshot taken when the fix
       began (before) */
    if (req.method === "GET" && p === "/render") {
      const s = slotOf(q("chapter"), q("slot"));
      if (!s) return send(res, 404, "no such slot", "text/plain; charset=utf-8");
      const src = read(q("v") === "before" ? path.join(s.fb, "port.before.tsx") : s.outTsx);
      if (src === null) return send(res, 404, "not ported", "text/plain; charset=utf-8");
      try { await ensureRunning(s.c); } catch (e) { return send(res, 503, e.message, "text/plain; charset=utf-8"); }
      const o = `/c/${s.c.class}`; // proxied by the hub, so only its port has to be reachable
      const lang = ["en", "hi", "gu"].includes(q("lang")) ? q("lang") : "en";
      const noEnd = (x) => x.replace(/<\/script/gi, "<\\/script");
      const props = { navigableDots: false, muted: true, lang, classroom: false };
      const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid}
html,body{margin:0;padding:0;background:#f8fafc;height:100%}
svg{display:block;vertical-align:middle}
#root{display:flex;justify-content:center;align-items:flex-start;min-height:100vh;min-width:100%}
</style><script src="${o}/vendor/react.js"></script><script src="${o}/vendor/react-dom.js"></script><script src="${o}/vendor/babel.js"></script>
<script src="${o}/api/host-template"></script></head><body><div id="root"></div><script>
var RAW = ${noEnd(JSON.stringify(src))};
try { var s = document.createElement('script'); s.textContent = hostBody(hostTranspile(RAW, ${noEnd(JSON.stringify(s.slot))}), ${noEnd(JSON.stringify(props))}); document.body.appendChild(s); }
catch (e) { document.body.innerHTML = '<pre style="color:#cf222e;padding:12px;white-space:pre-wrap">compile error\\n' + String(e.message).replace(/</g, '&lt;') + '</pre>'; }
</script></body></html>`;
      return send(res, 200, html, "text/html; charset=utf-8");
    }

    /* the chapter's tools on disk, for the publish dialog */
    if (req.method === "GET" && p === "/local-tools") {
      const s = slotOf(q("chapter"));
      if (!s) return json(res, 404, { error: "no such chapter on disk" });
      const ids = fs.readdirSync(s.work).filter((x) => SAFE.test(x) && fs.existsSync(path.join(s.work, x, "slot.json"))).sort();
      /* publish uploads against the live plan: a tool whose id the plan no longer has cannot go until the chapter is re-keyed */
      const live = await liveOf(s.chapter);
      return json(res, 200, { chapter: s.chapter, class: s.c.class, live_version: live?.version ?? null,
        tools: ids.map((id) => ({ ...slotInfo(slotOf(s.chapter, id)), in_live_plan: live ? live.mounts.some((m) => m.id === id) : null })) });
    }

    if (req.method !== "POST") return json(res, 404, { error: "not found" });
    if (!String(req.headers["content-type"] || "").includes("application/json")) return json(res, 415, { error: "content-type must be application/json" });
    let b;
    try { b = await body(req); } catch (e) { return json(res, 400, { error: e.message }); }

    if (p === "/resolve") {
      if (!slotOf(b.chapter) || (b.slot != null && !SAFE.test(String(b.slot)))) return json(res, 400, { error: "bad chapter/slot" });
      try { const d = await feedback(["resolve", "--chapter", b.chapter, ...(b.slot ? ["--slot", (await feedbackIds(b.chapter, b.slot)).join(",")] : [])]); listCache = null; return json(res, 200, d); }
      catch (e) { return json(res, 500, { error: e.message }); }
    }

    if (p === "/publish-many") {
      const ok = slotOf(b.chapter) && Array.isArray(b.slots) && b.slots.length && b.slots.length <= 100 && b.slots.every((x) => slotOf(b.chapter, x));
      if (!ok) return json(res, 400, { error: "bad chapter/slots" });
      try { return json(res, 200, { runId: startRun(b.chapter, (log) => publishMany(b.chapter, b.slots, { upload: !!b.upload, apply: !!b.apply, resolve: b.resolveFeedback !== false }, log)) }); }
      catch (e) { return json(res, e.status || 500, { error: e.message }); }
    }

    const s = slotOf(b.chapter, b.slot);
    if (!s) return json(res, 400, { error: "bad chapter/slot" });

    if (p === "/discard") {
      const base = path.join(s.fb, "tool.before.tsx");
      if (!fs.existsSync(base)) return json(res, 409, { error: "no revision baseline to go back to" });
      fs.copyFileSync(base, path.join(s.work, "tool.tsx"));
      const portBase = path.join(s.fb, "port.before.tsx");
      if (fs.existsSync(portBase)) { fs.mkdirSync(s.out, { recursive: true }); fs.copyFileSync(portBase, s.outTsx); }
      for (const f of ["tool.before.tsx", "port.before.tsx", "REVISE_PROMPT.md"]) fs.rmSync(path.join(s.fb, f), { force: true });
      return json(res, 200, { discarded: true, note: "tool.tsx is back; run check to make the ported pair fresh again" });
    }

    if (p === "/ide") {
      try {
        const q2 = await list(false);
        const items = q2.chapters?.[s.chapter]?.slots?.[s.slot]?.items || [];
        const info = await prepare(s, items);
        const where = b.where === "terminal" ? "terminal" : "ide";
        try {
          if (where === "terminal") openTerminal(info.cwd, info.bootstrap, s.slot);
          else openInIde([path.join(s.work, "tool.tsx"), info.prompt_file]);
          return json(res, 200, { opened: true, where, ...info });
        } catch (e) { return json(res, 200, { opened: false, where, error: e.message, ...info }); }
      } catch (e) { return json(res, 500, { error: e.message }); }
    }

    return json(res, 404, { error: "not found" });
  };
}

/* ---- handing the session to a human ---------------------------------------------------------------- */

function ideSockets() {
  if (process.env.VSCODE_IPC_HOOK_CLI) return [process.env.VSCODE_IPC_HOOK_CLI];
  const dirs = [`/run/user/${typeof process.getuid === "function" ? process.getuid() : 0}`, os.tmpdir()];
  return dirs.flatMap((d) => { try { return fs.readdirSync(d).filter((f) => f.startsWith("vscode-ipc-") && f.endsWith(".sock")).map((f) => path.join(d, f)); } catch { return []; } })
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs).slice(0, 8);
}

/* the prompt file LAST: `code -r` focuses the last path, the one to @-mention in the Claude Code panel */
function openInIde(files) {
  const bin = process.env.UDGAM_CODE_BIN || "code";
  const socks = process.platform === "win32" ? [null] : ideSockets();
  for (const sock of socks) {
    const r = spawnSync(bin, ["-r", ...files], { env: sock ? { ...process.env, VSCODE_IPC_HOOK_CLI: sock } : process.env, timeout: 10000, stdio: "ignore", shell: process.platform === "win32" });
    if (!r.error && r.status === 0) return;
  }
  throw new Error("no IDE window found: open this folder in VS Code, or run the command shown");
}

function openTerminal(cwd, bootstrap, slot) {
  const bin = process.env.UDGAM_CLAUDE_BIN || "claude";
  if (process.platform === "win32") {
    const script = path.join(os.tmpdir(), `udgam-revise-${slot}.cmd`);
    fs.writeFileSync(script, ["@echo off", `title Revise ${slot}`, `cd /d "${cwd}"`, `"${bin}" "${bootstrap.replace(/"/g, '""')}"`, "pause"].join("\r\n"));
    const wt = spawn("wt.exe", ["-d", cwd, "cmd", "/k", script], { detached: true, stdio: "ignore" });
    wt.on("error", () => spawn("cmd.exe", ["/c", "start", "", "cmd", "/k", script], { detached: true, stdio: "ignore" }).unref());
    wt.unref();
    return;
  }
  const cmd = `cd ${JSON.stringify(cwd)} && ${bin} ${JSON.stringify(bootstrap)}`;
  if (process.platform === "darwin") {
    spawn("osascript", ["-e", `tell app "Terminal" to do script ${JSON.stringify(cmd)}`, "-e", 'tell app "Terminal" to activate'], { detached: true, stdio: "ignore" }).unref();
    return;
  }
  if (!process.env.DISPLAY && !process.env.WAYLAND_DISPLAY) throw new Error("this machine has no display: use the IDE button, or run the command shown");
  for (const [emu, flag] of [["x-terminal-emulator", "-e"], ["gnome-terminal", "--"], ["konsole", "-e"], ["xterm", "-e"]]) {
    if (spawnSync("which", [emu], { stdio: "ignore" }).status !== 0) continue;
    spawn(emu, [flag, "bash", "-lc", cmd + "; exec bash"], { detached: true, stdio: "ignore" }).unref();
    return;
  }
  throw new Error("no terminal emulator on this machine: run the command shown");
}
