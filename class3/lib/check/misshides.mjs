/* MISS HIDES THE ANSWER (the owner, 2026-10-28; docs/LAYOUT.md §3, PATTERNS.md §7, PREFLIGHT 29, CHECKS.md `miss-hides-answer`).
 * After a WRONG answer the working area and the bubble never show or point at the right answer: the correction replays the working
 * and stops one step before the answer (the child finishes it); tries are unlimited; the answer shows only at the win. It supersedes
 * "the correction ends on the whole right answer" (`miss-shows-answer`) for a STRICT chapter only, gated like `pencil-acts`: `fetch`
 * writes `rules.missHidesAnswer: "strict"` into a NEW chapter's runtime.json (lib/core/pin.mjs fetchRules); a chapter without the key
 * (every chapter fetched before 2026-10-28, on any frozen runtime) gets ONE INFO row and no Chrome. No runtime change: the correction
 * is each tool's own Work (the runtime's miss shows only the hint rung, never `item.answer`; `answerShown` is set at win/idle only).
 *
 * The convention for tools: an element that shows or points at the answer (a ring on the right card, a lit final mark, a bracket with
 * the number, an "Answer" tag, the answer text) carries data-reveals="answer" and is drawn only at the win; a scale whose digits are
 * always printed (a ruler's 0 to 16, a chart's headings, counting labels) carries data-scale and is ignored.
 *
 * The play (missHidesInput): one DevTools session, motion ON, real keys and clicks the way miss-clears-slot plays them (the dev driver
 * only for a question the keys cannot answer: a working-area answer, the answer gate); the first playable question of each phase and
 * the first of each kind; three misses in a row on the first played question, two on the others. An in-page sampler (every 60 ms)
 * records, from the open question (the BASELINE) through each miss, its traceback, the unlock and 1.5 s after it: every visible
 * [data-reveals="answer"] anywhere, and every visible text of the working area, the runs box and the bubble that names the answer
 * (outside [data-scale], not the child's own value), plus a row of single digit cards that spells it (miss-shows-answer's grouping).
 * judgeMissHides FAILs a tag on show at any moment, and a text or row that names the answer more times after a miss than at the open
 * question (the question's own numbers, a build target, are in the baseline). A choice or word answer is judged by its tags only.
 * Pure functions (answerFormsOf, judgeMissHides, missHidesRows) are tested without Chrome. */
import { cdpSession, pool } from "../core/chrome.mjs";
import { readPin } from "../core/pin.mjs";

export const MH_HINT = "builder: the correction replays the working and stops ONE step before the answer (the child finishes it): no final number, no ring or highlight on the right choice, no lit final mark or bracket, no Answer tag; draw anything that shows the answer only at the win (stage \"win\") and tag it data-reveals=\"answer\"; tag a scale or counting labels that are always printed data-scale (PATTERNS.md §7, PREFLIGHT 29)";

/* the chapter is held to the rule: runtime.json rules.missHidesAnswer === "strict" (written by fetch, or by hand on the owner's word) */
export function missHidesStrict(chapterDir) {
  try { const p = readPin(chapterDir); return !!(p && p.rules && p.rules.missHidesAnswer === "strict"); } catch (e) { return false; }
}

const indian0 = (n) => {
  const s = String(Math.trunc(Math.abs(Number(n))));
  if (s.length <= 3) return s;
  let rest = s.slice(0, -3); const out = [];
  while (rest.length > 2) { out.unshift(rest.slice(-2)); rest = rest.slice(0, -2); }
  if (rest) out.unshift(rest);
  return `${out.join(",")},${s.slice(-3)}`;
};

/* the answer's written forms: `forms` for the working area and the runs box, `bubble` (plus the words of a number from 10) for the
   bubble, `rows` for a row of single digit cards, `parts` for a two- or three-part answer (all of them new after a miss = shown).
   A choice, a word or anything else that is not a number is judged by its data-reveals tags only (judged: "tag"). */
export function answerFormsOf(key, { indian = indian0, words = null, choice = false } = {}) {
  const none = { judged: "tag", forms: [], bubble: [], rows: [], parts: [], show: JSON.stringify(key) };
  if (choice) return none;
  let k = key;
  if (typeof k === "string" && k.includes("|")) k = k.split("|").map((x) => (x === "" ? null : x));
  if (Array.isArray(k)) {
    const ps = k.filter((x) => x !== null && x !== undefined && x !== "").map((x) => String(x).trim());
    if (ps.length === 1) return answerFormsOf(ps[0], { indian, words });
    if (!ps.length || !ps.every((x) => /^\d*\.?\d+$/.test(x))) return none;
    const joined = [];
    if (ps.length === 2) joined.push(`${ps[0]}/${ps[1]}`, `${ps[0]}.${ps[1]}`);
    if (ps.length === 3) joined.push(`${ps[0]} ${ps[1]}/${ps[2]}`);
    return { judged: "parts", forms: joined, bubble: joined, rows: [], parts: ps, show: ps.join(" and ") };
  }
  const s = String(k ?? "").trim().replace(/,/g, "");
  if (/^\d+$/.test(s)) {
    const n = Number(s), f = [...new Set([s, String(indian(n))])];
    let w = null; try { w = n >= 10 && words ? String(words(n)) : null; } catch (e) { w = null; }
    return { judged: "number", forms: f, bubble: w ? [...f, w] : f, rows: n >= 10 ? [s] : [], parts: [], show: String(indian(n)) };
  }
  if (/^\d*\.\d+$/.test(s)) { const d = s.startsWith(".") ? `0${s}` : s; return { judged: "decimal", forms: [d], bubble: [d], rows: [d], parts: [], show: d }; }
  return none;
}

/* ── the in-page sampler (serialised with toString; no closure over this module) ───────────────────────────────────────────── */
function mhPage() {
  const W = window;
  if (W.__mh) return;
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  /* check.mjs mentions(): a number never matches inside another number or a decimal */
  const mentions = (text, f) => {
    if (!f) return false;
    const head = /^\d/.test(f) ? "(?<![\\d,.])" : /^\w/.test(f) ? "\\b" : "", tail = /\w$/.test(f) ? "\\b" : "";
    const re = /^[\d,]+$/.test(f) ? new RegExp(`(^|[^\\d,])${esc(f)}(?![\\d,])`) : new RegExp(`${head}${esc(f)}${tail}`, "i");
    return re.test(String(text || ""));
  };
  let cfg = null, tag = "ask", t0 = performance.now(), timer = null, out = {}, memo = new Map();
  const alpha = (el) => {
    if (!el || el.nodeType !== 1) return 1;
    if (memo.has(el)) return memo.get(el);
    const cs = getComputedStyle(el);
    let v = cs.display === "none" || cs.visibility === "hidden" ? 0 : parseFloat(cs.opacity);
    if (!(v >= 0)) v = 1;
    if (v > 0) v *= alpha(el.parentElement || (el.parentNode && el.parentNode.nodeType === 1 ? el.parentNode : null));
    memo.set(el, v);
    return v;
  };
  const shown = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || r.right < 0 || r.bottom < 0 || r.left > innerWidth || r.top > innerHeight) return null;
    if (alpha(el) < 0.1) return null;
    if (el.tagName && el.tagName.toLowerCase() === "text") {
      const cs = getComputedStyle(el), noFill = cs.fill === "none" || parseFloat(cs.fillOpacity) < 0.1;
      if (noFill && (cs.stroke === "none" || parseFloat(cs.strokeOpacity) < 0.1)) return null;
    }
    return r;
  };
  const own = (e) => Array.from(e.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join("");
  const sample = () => {
    if (!cfg) return;
    memo = new Map();
    const t = Math.round(performance.now() - t0), counts = {};
    const bump = (k, desc) => { (counts[k] = counts[k] || { n: 0, desc }).n++; };
    const root = document.querySelector("svg"), rb = root ? root.getBoundingClientRect() : null;
    const k = rb && rb.width > 100 ? rb.width / 1600 : 1;
    for (const zone of ["work", "runs", "bubble"]) {
      const forms = zone === "bubble" ? cfg.bubble : cfg.forms;
      for (const z of document.querySelectorAll(`[data-zone="${zone}"]`)) {
        const els = [...z.querySelectorAll("text"), ...Array.from(z.querySelectorAll("*")).filter((e) => !(e instanceof SVGElement) && own(e).trim())];
        const singles = [];
        for (const el of els) {
          const txt = String(el instanceof SVGElement ? el.textContent : own(el)).replace(/\s+/g, " ").trim();
          if (!txt || cfg.wrong.includes(txt)) continue;
          const hit = forms.find((f) => mentions(txt, f));
          const parts = cfg.parts.filter((p) => mentions(txt, p));
          const single = cfg.rows.length && (cfg.judged === "decimal" ? /^[\d.]$/ : /^\d$/).test(txt);
          if (!hit && !parts.length && !single) continue;
          if (el.closest("[data-scale]")) continue;
          const r = shown(el);
          if (!r) continue;
          if (hit) bump(`TXT|${zone}|${txt}`, txt);
          for (const p of parts) bump(`PART|${p}|${zone}|${txt}`, txt);
          if (single) singles.push({ txt, x: r.left / k, y: (r.top + r.height / 2) / k });
        }
        const rows = {};
        singles.forEach((s) => { (rows[Math.round(s.y / 30)] = rows[Math.round(s.y / 30)] || []).push(s); });
        for (const row of Object.values(rows)) {
          const s = row.sort((a, b) => a.x - b.x).map((c) => c.txt).join("");
          if (cfg.rows.includes(s)) bump(`ROW|${zone}|${s}`, `${row.map((c) => c.txt).join(" ")} (one card a digit)`);
        }
      }
    }
    for (const el of document.querySelectorAll('[data-reveals="answer"]')) {
      if (!shown(el)) continue;
      const d = `<${el.tagName.toLowerCase()}${el.getAttribute("data-control") ? ` data-control="${el.getAttribute("data-control")}"` : ""}> "${String(el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 30)}"`;
      bump(`TAG|${d}`, d);
    }
    const o = (out[tag] = out[tag] || { samples: 0, keys: {} });
    o.samples++;
    for (const [key, v] of Object.entries(counts)) {
      const was = o.keys[key];
      if (!was) o.keys[key] = { n: v.n, t, desc: v.desc };
      else if (v.n > was.n) was.n = v.n;
    }
  };
  W.__mh = {
    start: (c) => { cfg = c; out = {}; tag = "ask"; t0 = performance.now(); clearInterval(timer); timer = setInterval(sample, 60); sample(); return true; },
    tag: (name) => { sample(); tag = name; t0 = performance.now(); sample(); return true; },
    /* the correction is over (the pad unlocked): the same miss, its steady state ("missK+"); t still counts from the miss */
    after: () => { sample(); tag = `${tag}+`; sample(); return true; },
    stop: () => { sample(); clearInterval(timer); timer = null; cfg = null; const r = out; out = {}; return r; },
  };
}

const MH_SHAPE = `(() => { const a = window.toolApi.getState(), d = window.__tool.state(), z = document.querySelector('[data-control="key-0"]');
  return { phase: d.phase, parts: a.parts ? a.parts.join(",") : null, choices: !!a.choices, digits: !!z && z.getAttribute('aria-disabled') !== 'true', key: d.key }; })()`;
const MH_ST = `(() => { const a = window.toolApi.getState(), d = window.__tool.state();
  return { phase: d.phase, item: d.item, key: d.key, asked: d.asked, choices: !!a.choices, tries: a.tries, stage: a.stage, locked: !!d.locked, answerOn: a.answerOn || null }; })()`;
const emptySlot = (v) => /^\|*$/.test(String(v ?? ""));

async function missHidesRun(url, { indian, words, maxPlays = 6 } = {}) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    await s.ev(`(${mhPage.toString()})(), true`);
    const steps = await s.ev("window.toolApi.getState().steps");
    const goAsk = async (t) => {
      await s.ev(`window.toolApi.gotoStep(${t})`);
      for (let k = 0; k < 60; k++) {
        const g = await s.ev("window.toolApi.getState().stage");
        if (g === "ask") break;
        if (g === "demo") await s.ev("window.toolApi.getState().stage === 'demo' && window.__tool.solve()");
        await s.wait(250);
      }
      await s.wait(800);   /* past the runtime's 600 ms guard after a stage change (a choice key) */
      return s.ev("window.toolApi.getState().stage === 'ask' && !window.__tool.state().locked");
    };
    /* scan every question once: its phase and its kind */
    const all = [];
    for (let t = 0; t < steps; t++) {
      await s.ev(`window.toolApi.gotoStep(${t})`);
      await s.wait(200);
      const k = await s.ev(MH_SHAPE);
      if (!k) continue;
      /* the kind by the answer (the digit keys may not be live yet right after gotoStep); a working-area answer is found at the send */
      const kind = k.choices ? "choice" : k.parts ? `boxes ${k.parts}` : /^[\d.]+$/.test(String(k.key)) ? "a number" : "a word or the working area";
      all.push({ t, phase: k.phase, kind });
    }
    /* the first playable question of each phase, then of each kind not played yet (up to 3 / 2 candidates each) */
    const order = [];
    for (const ph of [...new Set(all.map((c) => c.phase))]) order.push({ done: () => donePh.has(ph), cands: all.filter((c) => c.phase === ph).slice(0, 3) });
    for (const kind of [...new Set(all.map((c) => c.kind))]) order.push({ done: () => doneKind.has(kind), cands: all.filter((c) => c.kind === kind).slice(0, 2) });
    const plays = [], notes = [], donePh = new Set(), doneKind = new Set();
    /* one wrong answer, the way a child sends it; the dev driver only where the keys cannot */
    /* mark(): the miss's samples start at the act that sends it (a lent pad's typed digits on the working area are not the correction's) */
    const sendWrong = async (w, st0, mark) => {
      if (w.kind === "choice") {
        const ids = await s.ev(`Array.from(document.querySelectorAll('[data-control^="choice-"]')).filter((e) => !e.closest('[display="none"]') && e.getAttribute('aria-disabled') !== 'true').map((e) => e.getAttribute('data-control').replace(/^choice-/, ''))`);
        const wrongId = (ids || []).find((x) => x !== String(st0.asked));
        if (!wrongId) return null;
        await mark();
        await s.click(`[data-control="choice-${wrongId}"]`);
        return { how: "a real click", sent: wrongId };
      }
      const v = await s.ev("window.__tool.nearMiss()");
      const boxes = String(v ?? "").split("|");
      if (boxes.every((b) => /^[\d.]*$/.test(b)) && !boxes.every((b) => b === "")) {
        await s.key("Escape", "Escape", 27); await s.wait(150);
        let landed = true;
        for (let j = 0; j < boxes.length; j++) {
          for (const ch of boxes[j]) { if (ch === ".") await s.key(".", "Period", 190, "."); else await s.key(ch, "Digit" + ch, 48 + Number(ch), ch); await s.wait(60); }
          if (j === 0 && boxes[0] !== "" && emptySlot(await s.ev("window.toolApi.getState().typed"))) { landed = false; break; }
          if (j === 0) await mark();
          await s.key("Enter", "Enter", 13, "\r"); await s.wait(200);
          if ((await s.ev("window.toolApi.getState().tries")) > st0.tries || (await s.ev("window.toolApi.getState().stage")) !== "ask") break;
        }
        if (landed) return { how: "real keys", sent: v };
      }
      /* a working-area answer or a gated pad: the dev driver sends the tool's own near miss */
      await mark();
      await s.ev("(() => { window.__tool.nearMiss(); window.__tool.submit(); return true; })()");
      await s.wait(120);
      if ((await s.ev("window.toolApi.getState().tries")) <= st0.tries && (await s.ev("window.toolApi.getState().stage")) === "ask") await s.ev(`window.__tool.submit(${JSON.stringify(v)})`);
      return { how: "the dev driver", sent: v };
    };
    for (const group of order) for (const w of group.cands) {
      if (plays.length >= maxPlays || group.done()) break;
      const tag = `question ${w.t + 1} (phase ${w.phase}, ${w.kind})`;
      if (!(await goAsk(w.t))) { notes.push(`${tag}: not reached open`); continue; }
      const st0 = await s.ev(MH_ST);
      const F = answerFormsOf(st0.key, { indian, words, choice: st0.choices });
      /* the child's own wrong value is never "the answer on show" (a lent pad types it on the working area) */
      /* (a part the near miss shares with the answer, the 16 of 16|2 for 16|1, is the answer's, never excused) */
      const wrongOf = (v) => [...new Set(String(v ?? "").split("|").filter(Boolean).flatMap((x) => (/^\d+$/.test(x) ? [x, String(indian(+x))] : [x])).concat(String(v ?? "")))]
        .filter((x) => ![...F.forms, ...F.parts, ...F.rows].includes(x));
      const near = w.kind === "choice" ? null : await s.ev("window.__tool.nearMiss()");
      await s.key("Escape", "Escape", 27); await s.wait(150);
      await s.ev(`window.__mh.start(${JSON.stringify({ forms: F.forms, bubble: F.bubble, rows: F.rows, parts: F.parts, judged: F.judged, wrong: w.kind === "choice" ? [] : wrongOf(near) })})`);
      await s.wait(500);   /* the baseline: the open question, before any answer */
      const p = { tag, kind: w.kind, judged: F.judged, show: F.show, parts: F.parts, misses: [] };
      const want = plays.length ? 2 : 3;
      for (let k = 1; k <= want; k++) {
        const before = await s.ev(MH_ST);
        if (before.stage !== "ask" || before.locked) break;
        await s.ev(`window.__mh.tag("typing")`);   /* not judged: the samples of miss k start at the act that sends it */
        const sent = await sendWrong(w, before, () => s.ev(`window.__mh.tag("miss${k}")`));
        if (!sent) { notes.push(`${tag}: no live wrong choice key to click`); break; }
        await s.until(`window.toolApi.getState().tries > ${before.tries} || window.toolApi.getState().stage !== 'ask'`, 1500);
        const at = await s.ev(MH_ST);
        if (at.stage === "win") {
          await s.ev(`window.__mh.tag("skip")`);
          /* the same near miss that missed at try 1 now wins: the tool answered for the child (tries are unlimited) */
          if (k === 1) notes.push(`${tag}: the wrong answer ${JSON.stringify(sent.sent)} was judged right: not a miss`);
          else p.moved = `the same wrong answer ${JSON.stringify(sent.sent)} sent again at try ${k} WON the question: the correction put the answer in for the child (tries are unlimited; the child finishes it)`;
          await s.until("window.toolApi.getState().stage !== 'win'", 8000); break;
        }
        if (at.tries <= before.tries) { await s.ev(`window.__mh.tag("skip")`); notes.push(`${tag}: the wrong answer ${JSON.stringify(sent.sent)} was not taken as a miss`); break; }
        const sawLock = await s.until("!!window.__tool.state().locked", 1500);
        if (sawLock) await s.until("!window.__tool.state().locked", 40000);
        await s.ev("window.__mh.after()");
        await s.wait(1500);   /* after the unlock: the hint up, the question open again */
        p.misses.push({ k, how: sent.how, sent: sent.sent, sawLock });
        /* tries are unlimited: after every miss the SAME question is open again, never won or moved on by the tool */
        const end = await s.ev(MH_ST);
        if (end.stage !== "ask" || end.phase !== st0.phase || end.item !== st0.item) { p.moved = `after wrong answer ${k} the question did not open again (stage ${end.stage}, phase ${end.phase}, question ${(end.item ?? 0) + 1}): tries are unlimited, the tool never wins or moves on for the child`; break; }
      }
      p.rec = await s.ev("window.__mh.stop()");
      await s.key("Escape", "Escape", 27); await s.wait(150);
      if (!p.misses.length) continue;
      plays.push(p); donePh.add(w.phase); doneKind.add(w.kind);
      break;   /* one played question of this phase / kind is enough */
    }
    return { plays, notes, logs: s.logs.slice(0, 3) };
  }, { label: "miss-hides-answer", timeout: 300000, reducedMotion: false });   /* motion on: the traceback really animates */
}

/* indian and words: the model's (m.indian, m.words), so the forms are the tool's own */
export async function missHidesInput({ base, board = false, indian = indian0, words = null }) {
  const r = await pool([() => missHidesRun(`${base}?muted=1&probe=1${board ? "&answer=open" : ""}`, { indian, words })], 1);
  return r[0].ok ? r[0].value : { error: r[0].error && r[0].error.message };
}

const zoneName = { work: "working area", runs: "runs box", bubble: "bubble" };
/* rec = missHidesInput(). Returns problems (each names the question, the miss, the moment and what was on show). */
export function judgeMissHides(rec) {
  if (!rec || rec.error) return [`miss-hides-answer run: ${rec && rec.error}`];
  const bad = [], seen = new Set();
  const push = (id, msg) => { if (!seen.has(id)) { seen.add(id); bad.push(msg); } };
  for (const p of rec.plays || []) {
    const T = p.rec || {}, base = (T.ask && T.ask.keys) || {};
    if (p.moved) push(`${p.tag}|moved`, `${p.tag}: ${p.moved}`);
    for (const [k, v] of Object.entries(base)) if (k.startsWith("TAG|")) push(`${p.tag}|${k}`, `${p.tag}: at the open question, before any answer, ${v.desc} (data-reveals="answer") is on show`);
    for (const [tag, o] of Object.entries(T)) {
      /* "missK": from the wrong answer to the unlock; "missK+": the steady state after the unlock (t still from the miss) */
      const mk = /^miss(\d+)(\+?)$/.exec(tag);
      if (!mk) continue;
      const when = (v) => `${v.t} ms after wrong answer ${mk[1]}${mk[2] ? " (the correction over)" : ""}`;
      const partsNew = new Set();
      for (const [k, v] of Object.entries(o.keys || {})) {
        if (k.startsWith("TAG|")) { push(`${p.tag}|${k}`, `${p.tag}: ${when(v)} ${v.desc} (data-reveals="answer") is on show: a miss never shows the answer`); continue; }
        if (v.n <= (base[k] ? base[k].n : 0)) continue;   /* on show at the open question already: the question's own number */
        const [kind, a] = k.split("|");
        if (kind === "PART") { partsNew.add(a); continue; }
        /* a row of single digit cards is judged where the correction stands (a count passing 1, 2 spells "12" for a moment) */
        if (kind === "ROW" && !mk[2]) continue;
        push(`${p.tag}|${k}`, `${p.tag}: ${when(v)} the answer ${p.show} is ${kind === "ROW" ? "spelled by a row of digit cards" : "printed"} in the ${zoneName[a] || a}: "${String(v.desc).slice(0, 60)}"`);
      }
      if ((p.parts || []).length >= 2 && p.parts.every((x) => partsNew.has(x))) push(`${p.tag}|parts`, `${p.tag}: after wrong answer ${mk[1]} every part of the answer (${p.parts.join(", ")}) is printed`);
    }
  }
  (rec.logs || []).forEach((l) => bad.push(`console during the miss-hides-answer run: ${String(l).slice(0, 140)}`));
  return bad;
}

const capList = (a, n = 4) => (a.length > n ? `${a.slice(0, n).join("; ")} (+${a.length - n} more)` : a.join("; "));

/* the row(s) for check.mjs: strict = missHidesStrict(chapterDir); rec = missHidesInput() (null when not strict: no Chrome opened) */
export function missHidesRows({ strict, rec = null }) {
  const id = "miss-hides-answer";
  if (!strict) return [{ id, level: "info", msg: "not asked: the chapter's runtime.json has no rules.missHidesAnswer (a chapter fetched before 2026-10-28 keeps the correction that ends on the right answer, judged by miss-shows-answer; fetch writes the key for a new chapter, or the owner sets it); no Chrome opened" }];
  const bad = judgeMissHides(rec);
  if (bad.length) return [{ id, level: "fail", msg: `${capList(bad)} | ${MH_HINT}` }];
  const plays = (rec.plays || []), notes = rec.notes || [];
  if (!plays.length) return [{ id, level: "warn", msg: `no question could be missed for the play${notes.length ? ` (${capList(notes, 3)})` : ""}: the visual reviewer judges the wrong frames by eye | ${MH_HINT}` }];
  const said = plays.map((p) => `${p.tag}: ${p.misses.length} misses by ${[...new Set(p.misses.map((x) => x.how))].join(" and ")}${p.judged === "tag" ? ", judged by its tags only" : ""}`);
  return [{ id, level: "pass", msg: `after a wrong answer nothing shows or points at the answer: no data-reveals="answer" on show and no new text or digit row naming it in the working area, the runs box or the bubble, sampled every 60 ms from the open question through each miss, its traceback, the unlock and 1.5 s after (${capList(said, 6)})${notes.length ? ` [not played: ${capList(notes, 3)}]` : ""}; the miss and ladder lines themselves: answer-not-echoed` }];
}
