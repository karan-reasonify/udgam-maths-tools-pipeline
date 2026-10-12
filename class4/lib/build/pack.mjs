/* THE REVIEW PACK: every frame a reviewer needs, at the full 1600x900, made once.
 *   node cli.mjs shots <slot> --ch N --pack [--changed] [--langs en,hi,gu]
 * Written to <slot>/pack/ as p<phase>-<state>-<lang>.png (the start page: start-<lang>.png) and pack/pack.json.
 * docs/REVIEW_PACK.md says what each frame is and how a reviewer reads the pack; this file only makes it.
 *
 * How: one Chrome session per language walks the WHOLE lesson (?phase=none) through the tool's own dev hooks
 * (window.toolApi, window.__tool), taking each frame as the child would meet it, then the party frames (motion ON, the
 * existing partyShots, whose clock a session cannot freeze) come from their own sessions. Sessions run through pool()
 * at C4_CHROME_POOL (default 2). Reduced motion, muted, the page of `check` (the slot's preview), never a different one.
 *
 * Which frames exist is read at run time from what the page reports (getState(): guideSteps, choices, answerOn, startPage,
 * answerPanel, nextKey ...), backed by the capability markers of the pinned runtime (lib/core/caps.mjs) and the tool's own
 * source, never from a version number. A tool without guide steps, a choice question, cardAnswer or a start page simply has no
 * such frame; a voiced runtime has the frames that exist for it.
 *
 * A tool that opts into the Next key (`nextKey: true`) is walked with ?nextkey=1, as a child meets it: the Next key waits on
 * the win and on the phase end, so those frames are the held ones (and stable); a scripted `shot=1` run would hide the key.
 *
 * pack.json: { slot, toolHash, runtimePin, builtAt, seconds, langs, nextKey, frames: [ { file, state, phase, lang, w, h, hash,
 *   changed, ... } ], errors }. Each run first moves the old pack.json to pack.prev.json (only after the new build worked), and
 * `changed` compares every frame's hash with it: a new frame always counts as changed. A frame with the same hash as an earlier
 * one of the pack carries `sameAs` (nothing new to look at). Party frames carry `volatile` (their confetti is in the air, so
 * their hash is never compared; they are always listed "look again if the phase end changed").
 * The hash is the sha1 of the PNG bytes (a frame is the same pixels, so the same bytes: checked by running the pack twice).
 * The harness only: nothing here changes what the runtime renders. */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";
import { cdpSession, pool } from "../core/chrome.mjs";
import { idOf } from "../core/work.mjs";
import { capsFor } from "../core/caps.mjs";
import { readPin } from "../core/pin.mjs";
import { hashOf } from "../check/check.mjs";
import { buildPreview } from "./preview.mjs";
import { partyShots, phaseCount } from "./shots.mjs";

const W = 1600, H = 900;
const LANGS = ["en", "hi", "gu"];
const sha1 = (buf) => crypto.createHash("sha1").update(buf).digest("hex").slice(0, 16);

export const packDirOf = (dir) => path.join(dir, "pack");
const jsonOf = (dir, name) => { try { return JSON.parse(fs.readFileSync(path.join(packDirOf(dir), name), "utf8")); } catch { return null; } };

/* what the tool's own source says (the page cannot tell us before it is mounted with the right props) */
function toolFacts(dir) {
  const src = fs.readFileSync(path.join(dir, "tool.tsx"), "utf8");
  /* a TR table with at least one entry (the scaffold's `{ hi: {}, gu: {} }` is the language pass still to come) */
  const m = /\bconst\s+TR\b[^=\n]*=\s*\{/.exec(src);
  let hasTR = false;
  if (m) {
    const rest = src.slice(m.index + m[0].length, m.index + m[0].length + 6000);
    const end = rest.search(/\n\}\s*;|\}\s*;\s*\n/);
    hasTR = /["'`][^"'`\n]{2,}["'`]\s*:\s*["'`{\[]/.test(end < 0 ? rest : rest.slice(0, end));
  }
  return { nextKey: /\bnextKey\s*:\s*true\b/.test(src), hasTR };
}

/* ---- one language: the whole lesson, frame by frame ------------------------------------------------------------------- */
async function lessonJob({ previewHref, lang, nextKey, outDir, caps }) {
  const frames = [], errors = [];
  const q = [`phase=none`, "muted=1", "shot=1", "startpage=1", lang !== "en" ? `lang=${lang}` : "", nextKey ? "nextkey=1" : ""].filter(Boolean).join("&");
  const fail = (where, message) => errors.push({ lang, where, message: String(message) });
  try {
    await cdpSession(`${previewHref}?${q}`, async (s) => {
      if (!(await s.until("!!(window.toolApi && window.__tool)", 30000))) { fail("mount", "the tool did not mount"); return; }
      const ST = () => s.ev("window.toolApi.getState()");
      const until = (expr, ms = 20000) => s.until(expr, ms);
      /* the page is settled for a picture: the DOM quiet (nothing still arriving: a line paging, a skin decoding), fonts, skins,
         no focus ring left over, then a full repaint and two animation frames. A page that never goes quiet (a tool's own endless
         animation) is shot after 4 s, as it is. */
      const SIG = `(() => { const v = document.querySelector("svg"); return v ? v.innerHTML.length + ":" + (v.textContent || "").length : ""; })()`;
      const quiet = async () => {
        let last = null, since = Date.now();
        const t0 = since;
        while (Date.now() - t0 < 4000) {
          const sig = await s.ev(SIG);
          if (sig !== last) { last = sig; since = Date.now(); } else if (Date.now() - since >= 250) return true;
          await s.wait(60);
        }
        return false;
      };
      const settle = async (waitQuiet = true) => {
        if (waitQuiet) await quiet();
        await s.ev(`(async () => {
          try { await document.fonts.ready; } catch (e) {}
          try { await Promise.all(Array.from(document.querySelectorAll("svg image")).map((im) => { const h = im.getAttribute("href") || im.getAttribute("xlink:href"); if (!h) return null; const i = new window.Image(); i.src = h; return i.decode ? i.decode().catch(() => {}) : null; })); } catch (e) {}
          try { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); } catch (e) {}
          /* a full repaint: Chrome repaints only what changed, and a soft edge (a button's outline, a shadow) painted over the old
             pixels again comes out a shade different from one painted afresh, depending on how the changes were batched */
          const root = document.getElementById("root");
          if (root) { root.style.display = "none"; void root.offsetHeight; root.style.display = ""; void root.offsetHeight; }
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
          return true; })()`);
      };
      /* the frame as a file: shot until two in a row are the same bytes (a frame is the same pixels or it is not settled yet;
         a soft edge can still come out a shade apart on a busy machine). fast: a frame with a short window (a tool that walks
         on by itself): one shot, no waiting for quiet. Returns "ok", "unstable" (never two alike: the last one is kept) or "" */
      const grab = async (dest, fast) => {
        if (fast) { await settle(false); await s.shot(dest); return "ok"; }
        let prev = null;
        for (let i = 0; i < 6; i++) {
          await settle(i === 0);
          const tmp = dest + ".tmp";
          await s.shot(tmp);
          const buf = fs.readFileSync(tmp);
          fs.rmSync(tmp, { force: true });
          if (prev && prev.equals(buf)) { fs.writeFileSync(dest, buf); return "ok"; }
          prev = buf;
        }
        fs.writeFileSync(dest, prev);
        return "unstable";
      };
      /* one frame; `still` (an expression) must still hold after the shot, else the page moved on under it and it is retried once */
      const snap = async (state, phase, extra = {}, still = "true", fast = false) => {
        const file = state === "start" ? `start-${lang}.png` : `p${phase}-${state}-${lang}.png`;
        for (let attempt = 0; attempt < 2; attempt++) {
          const got = await grab(path.join(outDir, file), fast);
          if (await s.ev(still)) { frames.push({ file, state, phase, lang, w: W, h: H, ...extra, ...(got === "unstable" ? { unstable: true } : {}) }); return true; }
          if (attempt === 0) await s.wait(150);
        }
        try { fs.rmSync(path.join(outDir, file), { force: true }); } catch {}
        fail(`${state}${phase ? " phase " + phase : ""}`, "the page moved on while the frame was taken");
        return false;
      };
      const press = (control) => s.ev(`(() => { const el = document.querySelector('[data-control="${control}"]'); if (!el) return false; el.focus();
        el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true })); return true; })()`);
      const has = (control) => s.ev(`!!document.querySelector('[data-control="${control}"]')`);
      const atQ = (p, k) => `(() => { const a = window.toolApi.getState(); return a.phase === ${p} && a.item === ${k} && a.stage === "ask"; })()`;
      const miss = async () => { await s.ev("window.__tool.nearMiss()"); await s.wait(60); await s.ev("window.__tool.submit()"); };
      /* after a miss the tool locks while it traces the right answer, then opens again with the hint up: wait out that cycle (a
         tool that never locks passes straight through), then a beat for the panel to come back. hintNow: a hint asked for (the
         Hint key, the Answer key's line) comes at once. */
      const hintNow = (ms = 4000) => until(`(() => { const a = window.toolApi.getState(); return !!a.hint && !window.__tool.state().locked; })()`, ms);
      const afterMiss = async (ms = 30000) => {
        await until("window.__tool.state().locked === true", 1500);
        /* a runtime before r34 has no hint to wait for (its rung is spoken): the unlock is the settled frame */
        const ok = caps.hint ? await hintNow(ms) : await until("!window.__tool.state().locked", ms);
        if (ok) await s.wait(600);
        return ok;
      };
      const kinds = new Set();
      let hintDone = false;

      let st = await ST();
      const N = st.phases;
      /* the start page (runtime r28+): shown first, then Start is pressed the way a tap does it */
      if (st.startPage === true) { await snap("start", null, { note: "start page" }, "window.toolApi.getState().startPage === true"); await s.ev("window.__tool.startNow()"); }

      /* walk a phase to its first question without taking a frame (the second pass, to the summary again) */
      const quietPhase = async (p) => {
        if (!(await until(`(() => { const a = window.toolApi.getState(); return a.phase === ${p} && ["demo", "teach", "ask"].includes(a.stage); })()`, 30000))) return false;
        for (let k = 1; ; k++) {
          const a = await ST();
          if (a.stage === "demo") { await s.ev("window.__tool.solve()"); }
          if (!(await until(atQ(p, k), 60000))) return false;
          await s.ev("window.__tool.solve()");
          if (!(await until(`["win", "idle", "summary"].includes(window.toolApi.getState().stage)`, 20000))) return false;
          if (k >= a.items) break;
          if (nextKey) await until("!!window.toolApi.getState().nextKey", 8000);
          await s.ev("window.toolApi.next()");
        }
        if (nextKey) { await until(`window.toolApi.getState().stage === "summary" || !!window.toolApi.getState().nextKey`, 30000); await s.ev("window.toolApi.next()"); }
        return until(`window.toolApi.getState().stage === "summary"`, 30000);
      };

      for (let p = 1; p <= N; p++) {
        /* the phase opens: its first guide step (or, with no steps, the first screen) */
        if (!(await until(`(() => { const a = window.toolApi.getState(); return a.phase === ${p} && ["demo", "teach", "ask"].includes(a.stage); })()`, 40000))) { fail(`phase ${p}`, "did not open"); break; }
        st = await ST();
        if ("instruction" in st) await until("!!window.toolApi.getState().instruction", 15000);   /* the printed line: runtime r30+ */
        st = await ST();
        const hasSteps = typeof st.guideSteps === "number";
        if (st.stage !== "ask") await snap(hasSteps ? "step1" : "open", p, { note: hasSteps ? "first guide step" : "first screen of the phase" }, `window.toolApi.getState().phase === ${p}`);
        /* a wrong act on the step: its hint under the pinned instruction (runtime r34+) */
        if (caps.hint && hasSteps && st.stage === "demo" && (await s.ev('typeof window.__tool.did === "function"'))) {
          await s.ev('window.__tool.did("__pack_wrong__")');
          if (await until('!!window.toolApi.getState().hint', 4000)) { await s.wait(250); await snap("stepwrong", p, { note: "a wrong act on the step, its hint under the instruction" }, 'window.toolApi.getState().stage === "demo"'); }
          else fail(`stepwrong phase ${p}`, "no hint appeared after a wrong act");
        }
        if ((await ST()).stage === "demo") await s.ev("window.__tool.solve()");

        const items = st.items;
        for (let k = 1; k <= items; k++) {
          if (!(await until(atQ(p, k), 120000))) { fail(`phase ${p} question ${k}`, "did not open"); break; }
          await s.wait(150);
          st = await ST();
          const kind = st.answerOn || (st.choices ? "choices" : "key");
          const stillQ = atQ(p, k);
          if (k === 1) {
            await snap("ask-shut", p, { kind, item: 1, note: "first question, answer panel shut" }, stillQ);
            kinds.add(kind);
            if (st.board && (await s.ev("window.__tool.openAnswer()")) && (await until('window.toolApi.getState().answerPanel === "open"', 3000))) {
              await s.wait(300);
              await snap("ask-open", p, { kind, item: 1, note: "first question, answer panel open" }, stillQ);
            }
            await miss();
            if (await afterMiss()) { await snap("wrong", p, { kind, item: 1, note: "a wrong answer, its hint under the instruction" }, `window.toolApi.getState().phase === ${p} && window.toolApi.getState().item === 1`); }
            else fail(`wrong phase ${p}`, "no hint appeared after a wrong answer");
          } else {
            /* the first choice question and the first card answer of the tool, once, unless a first question showed that kind already */
            if (kind === "choices" && !kinds.has("choices")) {
              kinds.add("choices");
              await snap("choice", p, { kind, item: k, note: "a choice question" }, stillQ);
              if (caps.hint && !st.answerOn && (await has("answer-open")) && (await press("answer-open")) && (await hintNow(3000))) { await s.wait(250); await snap("choice-line", p, { kind, item: k, note: "the Choose-your-answer line, neutral band" }, stillQ); }
              await miss();
              if (await afterMiss()) { await snap("choice-wrong", p, { kind, item: k, note: "a wrong choice, its hint" }, stillQ); }
            } else if (kind === "card" && !kinds.has("card")) {
              kinds.add("card");
              await snap("card", p, { kind, item: k, note: "the card answer" }, stillQ);
              if ((await s.ev("window.__tool.openAnswer()")) && (await until('window.toolApi.getState().answerPanel === "open"', 3000))) { await s.wait(300); await snap("card-open", p, { kind, item: k, note: "the card answer, keypad open" }, stillQ); }
            }
          }
          /* the Hint key (runtime r35+): once, on the second question of the first phase that has one (the first, if a phase has one) */
          if (caps.hintKey && !hintDone && (k === 2 || (items === 1 && k === 1)) && (await has("again"))) {
            hintDone = true;
            await press("again");
            if (await hintNow(3000)) { await s.wait(250); await snap("hintkey", p, { kind, item: k, note: "the Hint key pressed" }, stillQ); }
          }
          /* the right answer: the win; the Next key (if the tool has one) is on show once the celebration is over */
          await s.ev("window.__tool.solve()");
          if (!(await until(`["win", "idle", "summary"].includes(window.toolApi.getState().stage)`, 25000))) { fail(`win phase ${p} question ${k}`, "no right answer registered"); break; }
          if (k < items) {
            if (nextKey) await until("!!window.toolApi.getState().nextKey", 10000);
            if (k === 1) { await snap("win", p, { kind, item: 1, note: "the right answer" }, `window.toolApi.getState().stage === "win"`, !nextKey); }
            await s.ev("window.toolApi.next()");
          }
        }

        /* the phase end: the closing line (and the Next phase / Next key) */
        const lastPhase = p === N;
        if (nextKey) {
          if (await until(`window.toolApi.getState().stage === "idle" && !!window.toolApi.getState().nextKey`, 40000)) await snap("end", p, { note: lastPhase ? "the last phase's end, the Summary key" : "the phase end, the Next phase key" }, `window.toolApi.getState().stage === "idle"`);
          else fail(`end phase ${p}`, "the phase end never showed its key");
          await s.ev("window.toolApi.next()");
        } else if (!lastPhase) {
          if (await until('window.toolApi.getState().stage === "idle"', 25000)) await snap("end", p, { note: "the phase end (the tool walks on by itself)" }, `window.toolApi.getState().stage === "idle" && window.toolApi.getState().phase === ${p}`, true);
          else fail(`end phase ${p}`, "the phase end was not seen");
        }
      }

      /* the summary page, Free play, Play again */
      if (await until('window.toolApi.getState().stage === "summary"', 40000)) {
        await s.wait(900);
        await snap("summary", N, { note: "the summary page, every phase played" }, 'window.toolApi.getState().stage === "summary"');
        if (await has("play-again")) {
          await press("play-again");
          if (await until(`(() => { const a = window.toolApi.getState(); return a.phase === 1 && ["demo", "teach", "ask"].includes(a.stage); })()`, 20000)) {
            if ("instruction" in (await ST())) await until("!!window.toolApi.getState().instruction", 8000);
            await s.wait(300);
            await snap("again", 1, { note: "right after Play again: a clean slate, phase 1" }, 'window.toolApi.getState().phase === 1');
          } else fail("again", "Play again did not restart the lesson");
          /* the summary again (only the last phase played now), for Free play */
          await s.ev(`window.toolApi.setParam("phase", ${N})`);
          if (!(await quietPhase(N))) fail("free", "the last phase did not reach the summary a second time");
        }
        if ((await has("free-play")) && (await press("free-play"))) {
          if (await until('window.toolApi.getState().stage === "free"', 8000)) { await s.wait(700); await snap("free", N, { note: "Free play" }, 'window.toolApi.getState().stage === "free"'); }
          else fail("free", "Free play did not open");
        }
      } else fail("summary", "the lesson never reached the summary page");
    }, { label: `pack ${lang}`, timeout: 900000, width: W, height: H });
  } catch (e) { fail("session", e && e.message ? e.message : e); }
  return { frames, errors };
}

/* ---- the party: motion ON, phase 1 and the last phase (the existing partyShots), one language ----------------------------- */
async function partyJob({ dir, lang, outDir, phases }) {
  const frames = [], errors = [];
  try {
    const got = await partyShots(dir, { phases, lang: lang === "en" ? "" : lang, outFile: (n) => path.join(outDir, `p${n}-party-${lang}.png`) });
    for (const r of got) {
      if (r.error || !fs.existsSync(r.png)) { errors.push({ lang, where: `party phase ${r.n}`, message: r.error || "no frame" }); continue; }
      frames.push({ file: path.basename(r.png), state: "party", phase: r.n, lang, w: W, h: H, volatile: true,
        note: r.seen ? "the party 0.9 s after the right answer of the phase's last question, motion on" : "no party appeared (motion on)" });
    }
  } catch (e) { errors.push({ lang, where: "party", message: e && e.message ? e.message : String(e) }); }
  return { frames, errors };
}

/* ---- the pack ------------------------------------------------------------------------------------------------------------ */
/* opts: langs (array), log, previewFile / outDir (test only: another page, another folder; the real pack is never touched) */
export async function buildPack(dir, { langs, log = console.log, previewFile, outDir } = {}) {
  const id = idOf(dir);
  const preview = previewFile || path.join(dir, `${id}.preview.html`);
  /* the frames must show tool.tsx as it is now: a page older than the source is rebuilt first (what check does before it looks) */
  if (!previewFile) {
    const tsx = path.join(dir, "tool.tsx");
    if (!fs.existsSync(tsx)) throw new Error("no tool.tsx yet");
    if (!fs.existsSync(preview) || fs.statSync(preview).mtimeMs < fs.statSync(tsx).mtimeMs) {
      const p = await buildPreview(dir);
      log(`  preview page rebuilt (tool.tsx is newer than it): ${(p.bytes / 1024).toFixed(0)} KB`);
    }
  } else if (!fs.existsSync(preview)) throw new Error(`no preview page at ${preview}`);
  const caps = capsFor(dir), facts = toolFacts(dir);
  const out = outDir || packDirOf(dir);
  fs.mkdirSync(out, { recursive: true });
  const readJson = (n) => { try { return JSON.parse(fs.readFileSync(path.join(out, n), "utf8")); } catch { return null; } };
  const old = readJson("pack.json");
  const want = (langs && langs.length ? langs : facts.hasTR ? LANGS : ["en"]).filter((l) => LANGS.includes(l));
  if (!want.length) throw new Error(`--langs must name en, hi or gu (got ${JSON.stringify(langs)})`);
  const notes = [];
  if (!(langs && langs.length) && !facts.hasTR) notes.push("no TR table with entries yet: English only (add --langs en,hi,gu to take hi and gu anyway)");
  /* C4_PACK_NEXTKEY=0: walk a Next-key tool on its timers (a test of the other path; the pack of record is the held-key one) */
  const nextKey = caps.nextKey && facts.nextKey && process.env.C4_PACK_NEXTKEY !== "0";
  const t0 = Date.now(), previewHref = pathToFileURL(preview).href;
  const phases = phaseCount(dir);
  const size = Math.max(1, Math.min(Number(process.env.C4_CHROME_POOL) || 2, 3));
  log(`  pack ${id}: ${want.join(", ")} · ${caps.silent ? "silent" : "voiced"} runtime${nextKey ? " · Next key" : ""} · ${size} Chrome at a time`);
  const jobs = [
    ...want.map((lang) => () => lessonJob({ previewHref, lang, nextKey, outDir: out, caps })),
    ...(caps.party ? want.map((lang) => () => partyJob({ dir, lang, outDir: out, phases })) : []),
  ];
  const got = await pool(jobs, size);
  const frames = [], errors = [];
  got.forEach((g) => { if (g.ok) { frames.push(...g.value.frames); errors.push(...g.value.errors); } else errors.push({ lang: "?", where: "job", message: String(g.error && g.error.message) }); });
  /* the order a reviewer reads: by language, the lesson then the party */
  const rank = (f) => want.indexOf(f.lang) * 10 + (f.state === "party" ? 1 : 0);
  frames.sort((x, y) => rank(x) - rank(y));   /* stable: each job's own order is kept */
  /* a language not run this time keeps its frames from the old pack (their files are still there) */
  const carried = (old ? old.frames : []).filter((f) => !want.includes(f.lang) && fs.existsSync(path.join(out, f.file))).map((f) => ({ ...f, changed: false, carried: true }));
  /* hash, compare with the pack before, find a frame identical to an earlier one */
  const prev = old ? new Map(old.frames.map((f) => [f.file, f])) : null;
  const seen = new Map();
  for (const f of frames) {
    f.hash = sha1(fs.readFileSync(path.join(out, f.file)));
    const was = prev && prev.get(f.file);
    f.changed = !was || (!f.volatile && was.hash !== f.hash) || !!f.unstable;   /* a frame that never settled is looked at again */
    if (!f.volatile) { if (seen.has(f.hash)) f.sameAs = seen.get(f.hash); else seen.set(f.hash, f.file); }
  }
  const removed = (old ? old.frames : []).filter((f) => want.includes(f.lang) && !frames.some((n) => n.file === f.file)).map((f) => f.file);
  const all = [...frames, ...carried];
  /* a run with a failure changes nothing of the record: the PNGs it could not make stay, pack.json stays the baseline, and this
     run's listing goes to pack.failed.json. Only a clean run makes the pack exactly its list (no PNG of an older layout lingers). */
  const failedRun = errors.length > 0 && !!old;
  if (!failedRun) {
    const keep = new Set([...all.map((f) => f.file), "pack.json", "pack.prev.json"]);
    for (const n of fs.readdirSync(out)) if (!keep.has(n) && /\.png$/i.test(n)) fs.rmSync(path.join(out, n), { force: true });
  }
  const seconds = Math.round((Date.now() - t0) / 1000);
  let pin = ""; try { const p = readPin(path.dirname(dir)); pin = p && p.version || ""; } catch { /* no pin */ }
  const pack = { slot: id, toolHash: hashOf(dir), runtimePin: pin, builtAt: new Date().toISOString(), seconds, langs: want, nextKey, frames: all, errors };
  /* the baseline moves only now, after a build that worked */
  if (failedRun) fs.writeFileSync(path.join(out, "pack.failed.json"), JSON.stringify(pack, null, 1));
  else {
    if (old) fs.writeFileSync(path.join(out, "pack.prev.json"), JSON.stringify(old, null, 1));
    fs.writeFileSync(path.join(out, "pack.json"), JSON.stringify(pack, null, 1));
    fs.rmSync(path.join(out, "pack.failed.json"), { force: true });
  }
  const changed = frames.filter((f) => f.changed).map((f) => ({ file: f.file, isNew: !prev || !prev.has(f.file), sameAs: f.sameAs }));
  return { out, pack, frames: all, changed, removed, first: !old, seconds, errors, notes, failedRun };
}
