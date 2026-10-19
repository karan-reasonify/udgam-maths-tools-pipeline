/* The silent lesson (runtime r30+): the judges of the rows that prove it.
 *
 * Kept pure on purpose: plain recorded data in, a list of problems out, no browser and no files, so a node test can
 * feed them a recorded run (a pass and a fail) without Chrome. check.mjs gathers the data (the probe that every
 * scripted run carries, the `sound`, `steps` and `wrong` drives of lib/build/preview.mjs) and prints the rows.
 *
 * What the bubble shows is never the raw line: the runtime turns it into words (speakable) and cuts it into pieces
 * (pieces), one piece on the bubble at a time. Every expected text here is computed the same way, with the tool's own
 * speakable() and pieces() (`m`, the model of lib/check/model.mjs).
 */

export const norm = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
/* a plain string is English; a Spoken value { en, hi, gu } is read in English */
const enOf = (v) => (typeof v === "string" ? v : v && typeof v === "object" ? String(v.en ?? "") : "");

/* one line as the bubble prints it, piece by piece (English) */
export function bubblePieces(line, m) {
  const s = m.speakable ? m.speakable(enOf(line)) : enOf(line);
  return (m.pieces ? m.pieces(s) : [s]).map(norm).filter(Boolean);
}
/* the bubble shows this piece: the same words, or (a piece wrapped past the bubble's three lines is cut) its start */
export function shows(shown, piece) {
  const a = norm(shown), b = norm(piece);
  return !!a && !!b && (a === b || (a.length >= 24 && b.startsWith(a + " ")));
}
const first = (line, m) => bubblePieces(line, m)[0] || "";
const cut = (s, n = 48) => JSON.stringify(norm(s).slice(0, n));

/* ── silent ───────────────────────────────────────────────────────────────────────────────────
   runs: [{ key, probe, api }] (every scripted run that carried ?probe=1). The probe counts speechSynthesis.speak calls
   and, through a MutationObserver over the whole page, every moment a Tap to start cover or a talking mascot existed. */
export function judgeSilent(runs, { silentRuntime = true } = {}) {
  if (!silentRuntime) return { bad: ["this chapter's runtime still speaks: a silent runtime is r30 or later (pin the chapter to r30 or later)"], seen: 0, hooked: 0 };
  const bad = [];
  let seen = 0, hooked = 0;
  for (const r of runs) {
    const p = r.probe;
    if (!p) continue;
    seen++;
    if (p.speechHooked) hooked++;
    if (p.speak) bad.push(`${r.key}: speechSynthesis.speak was called ${p.speak} time(s)`);
    if (p.cover) bad.push(`${r.key}: a Tap to start cover was on the page`);
    if (p.talk) bad.push(`${r.key}: the mascot had the talking class c4-talk`);
    if (r.api && r.api.voice !== "silent") bad.push(`${r.key}: getState().voice is ${JSON.stringify(r.api.voice)}, want "silent"`);
  }
  if (!seen) bad.push("no probe run reported, so nothing was watched");
  return { bad, seen, hooked };
}

/* ── no-arrow-outside-classroom ───────────────────────────────────────────────────────────────
   runs: [{ key, classroom, probe }]. Outside classroom mode nothing waits for a tap, so the arrow (.c4-cue) and the
   bubble control never exist; in a classroom run the bubble is a control (the teacher's skip). The arrow itself shows
   only while a piece of a LONG line is parked, and a tool whose every instruction is one page never parks one, so it
   is NOT required in a classroom run here: the `classroom` row proves it with a scripted long line (judgePaging). */
export function judgeNoArrow(runs) {
  const bad = [];
  let plain = 0, room = 0;
  for (const r of runs) {
    const p = r.probe;
    if (!p) continue;
    if (r.classroom) {
      room++;
      if (!p.bubbleCtl) bad.push(`${r.key}: classroom mode, yet the bubble was never a control`);
    } else {
      plain++;
      if (p.cue) bad.push(`${r.key}: the arrow (.c4-cue) appeared without ?classroom=1`);
      if (p.bubbleCtl) bad.push(`${r.key}: the bubble was a control without ?classroom=1`);
    }
  }
  if (!plain) bad.push("no run outside classroom mode reported");
  return { bad, plain, room };
}

/* ── sound-button ─────────────────────────────────────────────────────────────────────────────
   rec: the `sound` drive's log ({ start, on1: { ret, muted, label }, off1: {...}, thrown }), probe: its probe.
   mutedRuns: [{ key, probe }] of the runs that start muted (?muted=1): they must never build an AudioContext. */
export function judgeSoundButton(rec, probe, mutedRuns = []) {
  const bad = [];
  if (!rec) return ["no sound-button run"];
  if (rec.thrown) bad.push(`the run threw: ${rec.thrown}`);
  if (rec.start !== false) bad.push(`the lesson did not start with the sound on (muted ${JSON.stringify(rec.start)})`);
  const on = rec.on1 || {}, off = rec.off1 || {};
  if (on.ret !== true || on.muted !== true) bad.push(`setParam("muted", true) returned ${JSON.stringify(on.ret)} and getState().muted is ${JSON.stringify(on.muted)}`);
  if (off.ret !== true || off.muted !== false) bad.push(`setParam("muted", false) returned ${JSON.stringify(off.ret)} and getState().muted is ${JSON.stringify(off.muted)}`);
  /* the header's sound button names what a tap does: "Sound on" while it is off, "Sound off" while it is on */
  if (rec.startLabel && on.label !== undefined && (on.label === rec.startLabel || off.label !== rec.startLabel))
    bad.push(`the sound button's label did not follow (${JSON.stringify(rec.startLabel)} -> ${JSON.stringify(on.label)} -> ${JSON.stringify(off.label)})`);
  if (probe) {
    if (probe.errors && probe.errors.length) bad.push(`error: ${probe.errors[0]}`);
    if (probe.console && probe.console.length) bad.push(`console: ${probe.console[0]}`);
  }
  for (const r of mutedRuns) if (r.probe && r.probe.audio) bad.push(`${r.key}: muted from the start, yet ${r.probe.audio} AudioContext(s) were made`);
  return bad;
}

/* ── guide steps: their shape (source) ────────────────────────────────────────────────────────
   every step has a `say`, an `on` and (r34) a `hint` (strings); an `on` may repeat (each step is one click, in order);
   each piece of `say` is at most 110 characters and 20 words, with no en or em dash; the hints are unique in the phase,
   differ from their own step's say, and are at most 80 characters */
export function stepsShape(phases, m) {
  const bad = [];
  for (const p of phases || []) {
    if (!Array.isArray(p.steps) || !p.steps.length) continue;
    const ons = [], hints = [];
    p.steps.forEach((s, k) => {
      const tag = `phase ${p.n} step ${k + 1}`;
      if (!s || typeof s.say !== "string" || !s.say.trim()) bad.push(`${tag}: no say (a string)`);
      if (!s || typeof s.on !== "string" || !s.on.trim()) bad.push(`${tag}: no on (a string naming the act)`);
      else ons.push(s.on);
      if (s && typeof s.say === "string") {
        if (/[–—]/.test(s.say)) bad.push(`${tag}: a dash in ${cut(s.say, 40)}`);
        for (const piece of bubblePieces(s.say, m))
          if (piece.length > 110 || piece.split(/\s+/).length > 20) bad.push(`${tag}: a piece over 110 characters or 20 words: ${cut(piece, 40)}`);
      }
      if (!s || typeof s.hint !== "string" || !s.hint.trim()) bad.push(`${tag}: no hint (r34: every step has one, shown under the instruction after a wrong act)`);
      else {
        const h = norm(s.hint).toLowerCase();
        if (typeof s.say === "string" && h === norm(s.say).toLowerCase()) bad.push(`${tag}: the hint is the step's own say`);
        if (/[–—]/.test(s.hint)) bad.push(`${tag}: a dash in the hint ${cut(s.hint, 40)}`);
        if (norm(m.speakable ? m.speakable(s.hint) : s.hint).length > 80) bad.push(`${tag}: the hint is over 80 characters: ${cut(s.hint, 40)}`);
        hints.push(h);
      }
    });
    /* (2026-10-08: the same `on` may repeat, one click a step, steps in order: did(name) matches the CURRENT step) */
    const dupH = hints.filter((o, k) => hints.indexOf(o) !== k);
    if (dupH.length) bad.push(`phase ${p.n}: the same hint on two steps (${cut(dupH[0], 30)})`);
    if (!(p.items || []).length) bad.push(`phase ${p.n}: guide steps but no question to open`);
  }
  return bad;
}

/* ── the bubble's layout with a hint (a mirror of the runtime's Footer, r34; Hindi and Gujarati r43) ─────────────
   the instruction (one bubble piece) on top, the hint under it: the first of these that fits the 144-tall bubble is
   drawn, [instruction size, its lines, hint size, its lines, tight]; the last one is tight (no band). When none fits,
   the runtime draws the hint ALONE (r34: the question stays in the question bar). Widths: 612 for the instruction, 592
   for the hint, a character 0.54 of the size (about 35 a line at 32, 40 at 28). English: every layout whose lines fit
   also fits the height. Hindi and Gujarati (DEV_RULE, runtime r43): pitch 1.45 em, gap 4, band padding 4, 12 units over
   the first line and no tight layout; a layout counts only when its block fits 144 - 6, so in practice only a pair of
   one line and one line fits (112 at 32, 102 at 28; one line and two lines need 158 at 32 and 143 at 28). */
export const HINT_LAYOUTS = [[32, 1, 32, 2, 0], [32, 2, 32, 1, 0], [32, 1, 32, 1, 0], [28, 1, 28, 2, 0], [28, 2, 28, 1, 0], [28, 1, 28, 1, 0], [28, 2, 28, 2, 1]];
export const DEV_RULE = { pit: (s) => Math.round(s * 1.45), gap: 4, pad: 4, top: 12, noTight: true };
/* class 4 r27, a keyOnly bubble's Hindi and Gujarati (the runtime's FIT_KEY, calibrated in Poppins): pitch devPit em, the block's top devTop em + 4 */
export const devRuleKey = (F) => ({ pit: (s) => Math.round(s * F.devPit), gap: 4, pad: 4, top: (s) => Math.round(s * F.devTop) + 4, noTight: true });
/* the runtime's wrapText: greedy, at spaces, a word longer than the line stands alone */
export function wrapAt(s, max) {
  const out = [];
  let line = "";
  for (const w of String(s || "").split(/\s+/).filter(Boolean)) {
    if (!line) line = w;
    else if ((line + " " + w).length <= max) line += " " + w;
    else { out.push(line); line = w; }
  }
  if (line) out.push(line);
  return out;
}
const perLine = (size, w) => Math.max(8, Math.floor(w / (size * 0.54)));
/* null when no layout fits (the hint is drawn alone); else { size, lines, hintLines, tight }. rule: DEV_RULE for Hindi and
   Gujarati on a runtime that has it, else null (the line counts alone decide). spec (class 4 r27, a keyOnly or navDots tool: the
   runtime's own footerBoxes and FIT_KEY / FIT_CLASSIC, read through the model): { opts, iw, hw, maxH }, the layouts and the
   bubble's widths and height; English is then held to the runtime's height rule too (size + 6 a line, gap 6, band 8; tight:
   size + 1, gap 4, no band). Without a spec the classic bubble is judged exactly as before. */
export function hintLayout(instruction, hint, rule = null, spec = null) {
  const opts = spec ? spec.opts : HINT_LAYOUTS, iw = spec ? spec.iw : 612, hw = spec ? spec.hw : 592, maxH = spec ? spec.maxH : 144 - 6;
  /* spec.em: the width of a character in em when it is not the classic 0.54 (a keyOnly bubble in Hindi or Gujarati: FIT_KEY.devEm) */
  const pl = (size, w) => (spec && spec.em ? Math.max(8, Math.floor(w / (size * spec.em))) : perLine(size, w));
  for (const [is, il, hs, hn, tight] of opts) {
    if (rule && rule.noTight && tight) continue;
    const a = wrapAt(instruction, pl(is, iw)).length, h = wrapAt(hint, pl(hs, hw)).length;
    if (a > il || h > hn) continue;
    if (rule && a * rule.pit(is) + rule.gap + h * rule.pit(hs) + rule.pad + (typeof rule.top === "function" ? rule.top(is) : rule.top) > maxH) continue;
    if (spec && !rule && a * (tight ? is + 1 : is + 6) + (tight ? 4 : 6) + h * (tight ? hs + 1 : hs + 6) + (tight ? 0 : 8) > maxH) continue;
    return { size: is, lines: a, hintLines: h, tight: !!tight };
  }
  return null;
}

/* ── hint-fit (source) ────────────────────────────────────────────────────────────────────────
   every hint a question or a step can show, under every piece of its instruction: English must fit a banded layout
   (fail when none fits, so the hint would not be drawn, or when a hint is over 80 characters; warn when only the tight
   layout fits); the Hindi and Gujarati of the same lines (TR) are judged too, warn only. A question's hints are its
   ladder's rungs (1st miss: miss, else ladder[0]; 2nd: ladder[0]; 3rd: ladder[1]). opts.devRule (DEV_RULE, runtime r43):
   the Hindi and Gujarati pairs are laid out by their own rule, so a pair the runtime draws as the hint alone is named. */
export function judgeHintFit(m, TR, opts = {}) {
  const fail = [], warn = [];
  let n = 0;
  const en = (s) => norm(m.speakable ? m.speakable(enOf(s)) : enOf(s));
  const langs = ["hi", "gu"].filter((l) => TR && TR[l] && Object.keys(TR[l]).length && m.speakableIn && m.lineFor);
  const pairs = [];
  for (const p of m.PHASES || []) {
    const phaseLad = p.ladder || [];
    (p.items || []).forEach((it, k) => {
      const lad = it.ladder && it.ladder.length ? it.ladder : phaseLad;   /* r24: a question may carry its own ladder */
      const rungs = [...new Set([enOf(it.miss) || enOf(lad[0]), enOf(lad[0]) || enOf(it.miss), enOf(lad[1]) || enOf(lad[0])].filter(Boolean))];
      for (const r of rungs) pairs.push({ tag: `phase ${p.n} question ${k + 1}`, instr: it.say || it.ask, hint: r });
    });
    (Array.isArray(p.steps) ? p.steps : []).forEach((s, k) => { if (s && s.hint) pairs.push({ tag: `phase ${p.n} step ${k + 1}`, instr: s.say, hint: s.hint }); });
  }
  for (const { tag, instr, hint } of pairs) {
    const h = en(hint);
    n++;
    if (h.length > 80) { fail.push(`${tag}: the hint is ${h.length} characters (at most 80): ${cut(h, 40)}`); continue; }
    for (const piece of bubblePieces(instr, m)) {
      const L = hintLayout(piece, h, null, opts.spec || null);
      if (!L) fail.push(`${tag}: no bubble layout fits ${cut(piece, 30)} with the hint ${cut(h, 30)} (the hint would not be drawn)`);
      else if (L.tight) warn.push(`${tag}: only the tight layout fits ${cut(piece, 30)} with ${cut(h, 30)} (4 lines, no band)`);
    }
    for (const l of langs) {
      const ti = typeof instr === "string" && TR[l][instr], th = typeof hint === "string" && TR[l][hint];
      if (!ti && !th) continue;
      const hh = norm(m.speakableIn(m.lineFor(hint, l, TR), l));
      const ps = (m.pieces ? m.pieces(m.speakableIn(m.lineFor(instr, l, TR), l)) : [m.lineFor(instr, l, TR)]).map(norm).filter(Boolean);
      for (const piece of ps) {
        const L = hintLayout(piece, hh, opts.devRule || null, opts.spec ? { ...opts.spec, em: opts.spec.devEm || null } : null);
        if (!L) warn.push(`${tag} (${l}): no banded layout fits ${cut(piece, 24)} with ${cut(hh, 24)} (the hint is drawn alone; shorten the ${l} line so each takes one bubble line)`);
        else if (L.tight) warn.push(`${tag} (${l}): only the tight layout fits`);
      }
    }
  }
  return { fail, warn, n };
}

/* ── hint-fit, ONE SENTENCE A SCREEN (source; keyOnly on a runtime with caps.oneSentence, LAYOUT §1d) ──────────────────────
   A hint REPLACES the question in the bubble, so there is no pair to lay out: each hint (every rung a question can show, every
   step's hint) is judged ALONE, the way the runtime's Footer lays out a plain line (FIT_KEY.plain: 56 / 50 / 46 / 46 over four /
   40 over five, the characters a line scaled to the bubble, the ink of the block 8 inside the bubble). English FAILS when no
   layout fits (the last one would be drawn whole and spill) or the hint is over 80 characters, and WARNS when only the smallest
   layout fits; Hindi and Gujarati (TR) warn only, laid out by their own rule (devEm, devPit, inkDev). spec = { plain, inkEn, inkDev,
   devEm, devPit, bw, bh } (the bubble's width and height from the runtime's footerBoxes). */
export function plainLayout(text, spec, dev) {
  const em = dev ? spec.devEm : 0.54;
  const opts = spec.plain.filter((o) => !o[3] || o[3] === (dev ? "dev" : "en"));
  const per = (c) => Math.floor((c * (spec.bw - 104) * (0.54 / em)) / 552);
  const lh = (s, k) => (dev ? Math.round(s * spec.devPit) : k > 0 ? s + 6 : s + 8);
  const [up, down] = dev ? spec.inkDev : spec.inkEn;
  let pk = opts.findIndex((o, k) => { const n = wrapAt(text, per(o[2])).length; return n <= o[1] && (n - 1) * lh(o[0], k) + (up + down) * o[0] <= spec.bh - 8; });
  const over = pk < 0;
  if (over) pk = opts.length - 1;
  return { size: opts[pk][0], lines: wrapAt(text, per(opts[pk][2])).length, over, smallest: pk === opts.length - 1 };
}
export function judgeHintAlone(m, TR, spec) {
  const fail = [], warn = [];
  let n = 0;
  const en = (s) => norm(m.speakable ? m.speakable(enOf(s)) : enOf(s));
  const langs = ["hi", "gu"].filter((l) => TR && TR[l] && Object.keys(TR[l]).length && m.speakableIn && m.lineFor);
  const hints = [];
  for (const p of m.PHASES || []) {
    const phaseLad = p.ladder || [];
    (p.items || []).forEach((it, k) => {
      const lad = it.ladder && it.ladder.length ? it.ladder : phaseLad;
      const rungs = [...new Set([enOf(it.miss) || enOf(lad[0]), enOf(lad[0]) || enOf(it.miss), enOf(lad[1]) || enOf(lad[0])].filter(Boolean))];
      for (const r of rungs) hints.push({ tag: `phase ${p.n} question ${k + 1}`, hint: r });
    });
    (Array.isArray(p.steps) ? p.steps : []).forEach((s, k) => { if (s && s.hint) hints.push({ tag: `phase ${p.n} step ${k + 1}`, hint: s.hint }); });
  }
  for (const { tag, hint } of hints) {
    const h = en(hint);
    n++;
    if (h.length > 80) { fail.push(`${tag}: the hint is ${h.length} characters (at most 80): ${cut(h, 40)}`); continue; }
    const L = plainLayout(h, spec, false);
    if (L.over) fail.push(`${tag}: the hint ${cut(h, 30)} fits no bubble layout alone (it would spill the bubble)`);
    else if (L.smallest) warn.push(`${tag}: only the smallest layout (${L.size} over ${L.lines} lines) fits the hint ${cut(h, 30)}`);
    for (const l of langs) {
      if (!(typeof hint === "string" && TR[l][hint])) continue;
      const hh = norm(m.speakableIn(m.lineFor(hint, l, TR), l)), D = plainLayout(hh, spec, true);
      if (D.over) warn.push(`${tag} (${l}): the hint ${cut(hh, 24)} fits no bubble layout alone (shorten the ${l} line)`);
    }
  }
  return { fail, warn, n };
}

/* ── one-page (source, r35) ───────────────────────────────────────────────────────────────────
   every instruction (a step's say, a question's say, else its ask, as the bubble prints it) and every hint (a step's
   hint, a question's miss, the phase's ladder rungs) is exactly ONE bubble piece, with the runtime's own speakable() and
   pieces() (the model's), so nothing ever pages by a timer: English fails, the Hindi and Gujarati of the same line (TR)
   warn. Win lines, closing lines, `learned` and FINISH_LINE are exempt (they may take two pages). */
export function judgeOnePage(m, TR) {
  const fail = [], warn = [];
  let n = 0;
  const langs = ["hi", "gu"].filter((l) => TR && TR[l] && Object.keys(TR[l]).length && m.speakableIn && m.lineFor && m.pieces);
  const count = (s) => (m.pieces ? m.pieces(m.speakable ? m.speakable(s) : s) : [s]).filter((x) => String(x).trim()).length;
  const lines = [];
  for (const p of m.PHASES || []) {
    (Array.isArray(p.steps) ? p.steps : []).forEach((s, k) => {
      if (s && s.say) lines.push({ tag: `phase ${p.n} step ${k + 1}`, what: "instruction", v: s.say });
      if (s && s.hint) lines.push({ tag: `phase ${p.n} step ${k + 1}`, what: "hint", v: s.hint });
    });
    (p.items || []).forEach((it, k) => {
      const q = it.say || it.ask;
      if (q) lines.push({ tag: `phase ${p.n} question ${k + 1}`, what: "instruction", v: q });
      if (it.miss) lines.push({ tag: `phase ${p.n} question ${k + 1}`, what: "hint (miss)", v: it.miss });
      (it.ladder || []).forEach((r, j) => { if (r) lines.push({ tag: `phase ${p.n} question ${k + 1} ladder ${j + 1}`, what: "hint", v: r }); });
    });
    (p.ladder || []).forEach((r, k) => { if (r) lines.push({ tag: `phase ${p.n} ladder ${k + 1}`, what: "hint", v: r }); });
  }
  for (const { tag, what, v } of lines) {
    n++;
    const e = enOf(v), c = count(e);
    if (c !== 1) fail.push(`${tag}: the ${what} is ${c} bubble pages: ${cut(m.speakable ? m.speakable(e) : e, 44)} (one sentence that fits three lines)`);
    for (const l of langs) {
      if (typeof v !== "string" || !TR[l][v]) continue;
      const t = m.lineFor(v, l, TR), cl = m.pieces(m.speakableIn(t, l)).filter((x) => String(x).trim()).length;
      if (cl !== 1) warn.push(`${tag} (${l}): the ${what} is ${cl} pages: ${cut(t, 30)}`);
    }
  }
  return { fail, warn, n };
}

/* ── hint-key (render, r35: the header's "Hint" key, data-control "again") ──────────────────────
   rec = { label, box: { w, h }, step?: { before: { instruction, hint }, after: { instruction, hint, stage, guideStep } },
           q: { before: { hint }, press1: { hint, instruction }, press2: { hint, instruction }, right: { hint } },
           none?: { before: { stage, item, phase, hint }, after: {...} } }
   At a guide step a press shows that step's hint (the instruction unchanged, nothing moves); at an open question the
   first press shows rung 0 (the miss, else ladder[0]) and the second the stronger rung (ladder[0], else the miss), a right
   answer clears it; with nothing to hint a press changes no state; the key reads "Hint" and its finger box is 72 x 72. */
export function judgeHintKey(rec, phase, item, m, stepPhase) {
  const bad = [];
  if (!rec) return ["no hint-key run"];
  const sp = (s) => norm(m.speakable ? m.speakable(enOf(s)) : enOf(s));
  if (rec.label !== "Hint") bad.push(`the key reads ${JSON.stringify(rec.label)}, want "Hint"`);
  if (!rec.box || rec.box.w < 71 || rec.box.h < 71) bad.push(`the key's finger box is ${rec.box ? Math.round(rec.box.w) + " x " + Math.round(rec.box.h) : "missing"}, want at least 72 x 72`);
  if (stepPhase && rec.step) {
    const st = (stepPhase.steps || [])[rec.step.k || 0] || {};
    const a = rec.step.after || {}, b = rec.step.before || {};
    if (norm(a.hint) !== sp(st.hint)) bad.push(`at step ${(rec.step.k || 0) + 1} the key showed ${cut(a.hint)}, want the step's hint ${cut(sp(st.hint))}`);
    if (norm(a.instruction) !== norm(b.instruction)) bad.push(`at a step the key changed the instruction (${cut(b.instruction)} -> ${cut(a.instruction)})`);
    if (a.stage !== "demo" || a.guideStep !== (rec.step.k || 0)) bad.push(`at a step the key moved the lesson (stage ${a.stage}, guideStep ${a.guideStep})`);
  } else if (stepPhase) bad.push("the phase has guide steps but the key was not tried on one");
  const lad = (item && item.ladder && item.ladder.length ? item.ladder : phase.ladder) || [], q = rec.q;
  if (!q) bad.push("the key was not tried at an open question");
  else {
    /* a built-in "type" line (r49: where to tap, or choose) is an instruction, not a hint */
    if (q.before && q.before.hint && q.before.hintKind !== "type") bad.push(`a hint was up before the key was pressed (${cut(q.before.hint)}): nothing shows unless asked`);
    const r0 = sp(enOf(item.miss) || enOf(lad[0])), r1 = sp(enOf(lad[0]) || enOf(item.miss));
    if (norm(q.press1 && q.press1.hint) !== r0) bad.push(`the first press showed ${cut(q.press1 && q.press1.hint)}, want rung 1 ${cut(r0)}`);
    if (norm(q.press2 && q.press2.hint) !== r1) bad.push(`the second press showed ${cut(q.press2 && q.press2.hint)}, want the stronger rung ${cut(r1)}`);
    const qp = bubblePieces(item.say || item.ask, m);
    for (const k of ["press1", "press2"]) if (q[k] && !qp.some((p) => shows(q[k].instruction, p))) bad.push(`after a press the instruction is ${cut(q[k].instruction)}, not the question's line`);
    if (q.right && q.right.hint) bad.push(`a right answer left the asked-for hint up (${cut(q.right.hint)})`);
  }
  const no = rec.none;
  if (no) {
    const b = no.before || {}, a = no.after || {};
    if (a.stage !== b.stage || a.item !== b.item || a.phase !== b.phase || (a.hint || null) !== (b.hint || null))
      bad.push(`with nothing to hint (${b.stage}) a press changed the state (${JSON.stringify(b)} -> ${JSON.stringify(a)})`);
  }
  return bad;
}

/* ── hint-pinned (the `wrong` drive of every phase, the `hint` drives) ───────────────────────────
   rec = { before: { instruction, domInstr }, timeline: [{ t, hint, instruction, domInstr, domHint, typed }],
           after4s: { hint, instruction, domInstr, domHint }, miss2?: {...}, right?: { hint, domHint, stage }, nearMiss }
   After a miss: within 700 ms getState().hint is the rung (as printed: speakable), the instruction is still one of the
   question's own pieces (pinned) and both are drawn (data-role instruction and hint, same text); 4 s later the SAME hint;
   a second miss brings the next rung with the instruction unchanged; a right answer clears it. */
export function judgeHintPinned(rec, phase, item, m, tag = `phase ${phase.n}`) {
  const bad = [];
  if (!rec || !rec.timeline) return [`${tag}: no hint run`];
  const lad = (item && item.ladder && item.ladder.length ? item.ladder : phase.ladder) || [];
  const sp = (s) => norm(m.speakable ? m.speakable(enOf(s)) : enOf(s));
  const want1 = sp(enOf(item.miss) || enOf(lad[0])), want2 = sp(enOf(lad[0]) || enOf(item.miss));
  if (!want1) return [`${tag}: the question has no miss line and the phase no ladder: nothing to show after a miss`];
  const qPieces = bubblePieces(item.say || item.ask, m);
  const isQ = (s) => qPieces.some((p) => shows(s, p));
  if (bubblePieces(want1, m)[0] === qPieces[0]) bad.push(`${tag}: the hint is the question's own line (${cut(want1)})`);
  const hit = rec.timeline.find((s) => norm(s.hint) === want1);
  if (!hit) { bad.push(`${tag}: after a miss getState().hint never became ${cut(want1)} (it read ${[...new Set(rec.timeline.map((s) => cut(s.hint, 24)))].join(" -> ")})`); return bad; }
  if (hit.t > 700) bad.push(`${tag}: the hint came ${hit.t} ms after the miss (want within 700 ms)`);
  if (!isQ(hit.instruction)) bad.push(`${tag}: with the hint up, the instruction is ${cut(hit.instruction)}, not the question's line (it must stay pinned)`);
  if (!hit.domHint) bad.push(`${tag}: the hint is in getState() but not drawn in the bubble (no layout fits it: see hint-fit)`);
  else if (norm(hit.domHint) !== want1) bad.push(`${tag}: the bubble's hint reads ${cut(hit.domHint)}, getState().hint ${cut(want1)}`);
  /* ONE SENTENCE A SCREEN (m.oneSentence, keyOnly): the hint REPLACES the question on the bubble: only the hint is drawn */
  if (m.oneSentence) { if (hit.domInstr) bad.push(`${tag}: with the hint up the bubble still draws the question ${cut(hit.domInstr)} (one sentence a screen: the hint replaces it)`); }
  else if (!hit.domInstr || !isQ(hit.domInstr)) bad.push(`${tag}: with the hint up, the bubble's instruction reads ${cut(hit.domInstr)}, not the question's line`);
  if (rec.nearMiss !== undefined && hit.typed !== undefined && String(hit.typed) !== String(rec.nearMiss)) bad.push(`${tag}: the child's answer ${cut(rec.nearMiss, 20)} was not in the slot while the hint showed (${cut(hit.typed, 20)})`);
  const a = rec.after4s;
  if (a) {
    if (norm(a.hint) !== want1) bad.push(`${tag}: 4 s after the miss the hint is ${cut(a.hint)}, want the same ${cut(want1)} (it stays until the child acts again)`);
    if (!isQ(a.instruction)) bad.push(`${tag}: 4 s after the miss the instruction is ${cut(a.instruction)}, not the question's line`);
    if (!a.domHint) bad.push(`${tag}: 4 s after the miss the hint is no longer drawn`);
    else if (m.oneSentence && a.domInstr) bad.push(`${tag}: 4 s after the miss the bubble draws the question ${cut(a.domInstr)} beside the hint`);
  }
  const b = rec.miss2;
  if (b) {
    if (norm(b.hint) !== want2) bad.push(`${tag}: a second miss shows ${cut(b.hint)}, want the next rung ${cut(want2)}`);
    if (!isQ(b.instruction)) bad.push(`${tag}: after a second miss the instruction is ${cut(b.instruction)}, not the question's line`);
  }
  const r = rec.right;
  if (r && (r.hint || r.domHint)) bad.push(`${tag}: a right answer left the hint up (${cut(r.hint || r.domHint)})`);
  return bad;
}

/* ── guide steps: played (the `steps` drive) ──────────────────────────────────────────────────
   rec = { open: { stage, step, bubble }, after4s: { stage, step, bubble }, acts: [{ before, after, settled, stage, bubble }],
           end: { stage, bubble }, outOfOrder: { before, after, bubbleBefore, bubbleAfter, returned } | "no-hook" }
   Returns { bad, note }: note says what could not be tried. */
export function judgeGuideSteps(rec, phase, m) {
  const bad = [], st = phase.steps || [], n = st.length, tag = `phase ${phase.n}`;
  if (!rec) return { bad: [`${tag}: no steps run`], note: "" };
  const want = (k) => first(st[k].say, m);
  const o = rec.open || {};
  if (o.stage !== "demo" || o.step !== 0) bad.push(`${tag}: the phase did not open on its first step (stage ${o.stage}, guideStep ${o.step})`);
  else if (!shows(o.bubble, want(0))) bad.push(`${tag}: the bubble opened on ${cut(o.bubble)}, want step 1: ${cut(want(0))}`);
  const a4 = rec.after4s || {};
  if (a4.stage !== "demo" || a4.step !== 0) bad.push(`${tag}: after 4 s with no act the lesson moved on (stage ${a4.stage}, guideStep ${a4.step}): a step waits for the child, never a timer`);
  else if (!bubblePieces(st[0].say, m).some((p) => shows(a4.bubble, p))) bad.push(`${tag}: after 4 s the bubble shows ${cut(a4.bubble)}, not step 1`);
  const acts = rec.acts || [];
  if (acts.length !== n) bad.push(`${tag}: ${acts.length} act(s) to open the question, want ${n} (one per step)`);
  acts.slice(0, n).forEach((a, k) => {
    const at = `${tag} act ${k + 1}`;
    if (a.before !== k || a.after !== k + 1 || (a.settled !== undefined && a.settled !== k + 1))
      bad.push(`${at}: guideStep ${a.before} -> ${a.after}${a.settled !== undefined ? ` (then ${a.settled})` : ""}, want ${k} -> ${k + 1}`);
    if (k + 1 < n) {
      if (a.stage !== "demo") bad.push(`${at}: the stage left demo (${a.stage}) before the last step`);
      else if (!shows(a.bubble, want(k + 1))) bad.push(`${at}: the bubble shows ${cut(a.bubble)}, want step ${k + 2}: ${cut(want(k + 1))}`);
    } else {
      const it = (phase.items || [])[0] || {};
      const q = first(it.say || it.ask, m);
      if (a.stage !== "ask") bad.push(`${at}: the last act did not open the question (stage ${a.stage})`);
      else if (!shows(a.bubble, q)) bad.push(`${at}: the question opened with ${cut(a.bubble)} on the bubble, want its line: ${cut(q)}`);
    }
  });
  let note = "";
  if (rec.outOfOrder === "no-hook" || rec.outOfOrder === undefined) note = "an act out of order was not tried (window.__tool has no did hook in this runtime)";
  else {
    /* r34: a wrong act (a name step 1 does not wait for, through the dev hook __tool.did) moves nothing, returns false,
       and shows step 1's hint under the pinned instruction; the hint is the same 3 s later; the right act clears it */
    const x = rec.outOfOrder, st0 = st[0] || {};
    if (x.returned !== false || x.after !== x.before)
      bad.push(`${tag}: a wrong act moved the lesson (guideStep ${x.before} -> ${x.after}, did() returned ${JSON.stringify(x.returned)})`);
    if (st0.hint !== undefined) {
      const wantH = norm(m.speakable ? m.speakable(enOf(st0.hint)) : enOf(st0.hint));
      const pinned = (s) => bubblePieces(st0.say, m).some((p) => shows(s, p));
      if (norm(x.hint) !== wantH) bad.push(`${tag}: after a wrong act getState().hint is ${cut(x.hint)}, want step 1's hint ${cut(wantH)}`);
      else if (!x.domHint || norm(x.domHint) !== wantH) bad.push(`${tag}: after a wrong act the hint is not drawn in the bubble (${cut(x.domHint)})`);
      if (!pinned(x.instruction)) bad.push(`${tag}: after a wrong act the instruction is ${cut(x.instruction)}, not step 1's (it must stay pinned)`);
      if (m.oneSentence && x.domInstr) bad.push(`${tag}: after a wrong act the bubble draws step 1's line ${cut(x.domInstr)} beside the hint (one sentence a screen: the hint replaces it)`);
      if (x.after3s && (norm(x.after3s.hint) !== wantH || !pinned(x.after3s.instruction))) bad.push(`${tag}: 3 s after a wrong act the hint or the instruction changed (${cut(x.after3s.hint)} / ${cut(x.after3s.instruction)})`);
      const a0 = acts[0];
      if (a0 && a0.hint && a0.hintKind !== "type") bad.push(`${tag}: the right act did not clear the hint (${cut(a0.hint)})`);
    }
  }
  return { bad, note };
}

/* ── classroom (r34: action-driven, the `classroom` drive) ────────────────────────────────────
   r = the drive's log. A classroom holds nothing for a tap but a long line's pieces: the bubble is a control; a right
   answer's next question comes by itself within its celebration (winMs) + 2 s; a miss shows its hint within 700 ms with
   the instruction still drawn and nothing waiting; the closing line walks on by itself; the summary's rows go on by
   themselves and finished goes once; a tap during a celebration or a closing line skips ahead within 700 ms; the cue
   shows only while a piece is parked; the your-turn ring; no score; sound not forced off.
   ctx = { winOf(item index) -> ms, silentRt, hasExplore (r23+ focus rule), cueBig } */
export function judgeClassroom(r, ctx = {}) {
  const bad = [];
  if (!r) return ["no classroom run"];
  const winOf = ctx.winOf || (() => 1600);
  const want = (ok, why) => { if (!ok) bad.push(why); };
  want(r.classroom === true, "classroom mode did not reach the tool");
  want(ctx.silentRt === false || r.startMuted === false, "started with the sound off (the sound effects are on in every mode)");
  want(r.bubbleControl, "the bubble is not a control");
  if (r.steps) want(r.stepHeld && r.stepStays, "the first guide step did not show, or moved on without the child's act");
  want(r.everyTapMoved, `a tap on a parked piece did not show the next piece (${r.tapsToQuestion} taps)`);
  want(r.askOpen, "the question did not open");
  want(r.ring, "no your-turn ring on the working area when the question opened");
  const ms = r.miss || {};
  want(ms.hint && ms.hintMs !== undefined && ms.hintMs <= 700, `after a miss the hint did not show within 700 ms (${ms.hintMs} ms, ${JSON.stringify(ms.hint)})`);
  if (ctx.oneSentence) want(ms.domHint && !ms.domInstr, "after a miss the bubble did not draw the hint alone (one sentence a screen: the hint replaces the question)");
  else want(ms.domHint && ms.domInstr, "after a miss the bubble did not draw both the pinned instruction and the hint");
  want(!ms.held, "after a miss something waited for a tap (the hint must show by itself)");
  /* (a long win line or closing line of the tool's own pages like any long line: its parked pieces are not holds; the
     elapsed times below prove that the next question and phase come by themselves) */
  const w = r.win || {};
  if (w.elapsed === undefined) bad.push("a right answer: the next question never came by itself");
  else want(w.elapsed <= winOf(w.item) + 2000, `a right answer: the next question came ${w.elapsed} ms later (want within its celebration ${winOf(w.item)} ms + 2 s, with no tap)`);
  const sk = r.skip;
  if (sk && sk.tried) {
    const why = (sk.parkedAtTap || []).some(Boolean) ? "the tool's own win line runs to more than one page, and a tap pages a parked piece (or ends the line) before it skips" : "the taps before it only ended the line on the bubble";
    if (sk.elapsed === undefined) bad.push(`${sk.taps || 1} tap(s) on the bubble during the celebration did not bring the next question (${why})`);
    else if ((sk.taps || 1) > 1) bad.push(`the teacher's skip during the celebration took ${sk.taps} taps (${why})`);
    else want(sk.elapsed <= 700, `a tap during the celebration brought the next question ${sk.elapsed} ms later (want within 700 ms)`);
  }
  if (r.walks) {
    const pw = r.phaseWalk || {};
    want(pw.walked, `the closing line did not walk on to the next phase by itself (${pw.elapsed} ms${pw.closingTaps ? `, ${pw.closingTaps} paging tap(s)` : ""})`);
    want(!pw.finishedBefore, "finished was sent before the last phase");
    want(!pw.heldDuring || (ctx.closingPieces || 1) > 1, "a one-piece closing line waited for a tap");
    const cs = r.closingSkip;
    if (cs && cs.tried) {
      if (cs.elapsed === undefined) bad.push(`${cs.taps || 1} tap(s) during a closing line did not bring the next phase`);
      else want(cs.elapsed <= 700, `a tap during a closing line brought the next phase ${cs.elapsed} ms after the skipping tap (want within 700 ms)${(cs.taps || 1) > 1 ? `; ${cs.taps - 1} paging tap(s) before it` : ""}`);
    }
  } else {
    const s = r.summary || {};
    want(s.open, "the last phase did not end on the summary page");
    /* r44 (ctx.simpleSummary): the page says one line and steps no row; a tap on the bubble there changes nothing */
    if (ctx.simpleSummary) {
      want(!(s.rowsSeen > 0), `a summary row was stepped (${s.rowsSeen} rows): the simple summary reads no row`);
      const tp = s.tap;
      if (tp) want(tp.stage === "summary" && tp.row === -1 && (!tp.before || tp.after === tp.before) && tp.events <= 1,
        `a tap on the bubble on the summary page changed it (stage ${tp.stage}, summaryRow ${tp.row}, line ${JSON.stringify(String(tp.after).slice(0, 40))}, ${tp.events} finished)`);
    } else want(s.rowsSeen >= s.rowsWanted, `the summary's rows did not go on by themselves (${s.rowsSeen} of ${s.rowsWanted} seen, no tap)`);
    want(s.finishedCount === 1, `finished was sent ${s.finishedCount} times (want once)`);
    want(!s.scoreShown, "the summary shows the score in a classroom");
    want(!s.workRing, "the your-turn ring stayed on into the summary");
  }
  want(!r.cueMismatch, `the cue and a parked piece disagreed ${r.cueMismatch} time(s): the cue shows only while a piece waits for a tap (${JSON.stringify(r.cueAt || [])})`);
  want(!r.deadTaps, `${r.deadTaps} tap(s) on the bubble changed nothing: ${JSON.stringify(r.deadAt || [])}`);
  if (ctx.hasExplore) want(r.keepsFocus !== false, "Enter on the bubble dropped the focus");
  if (ctx.cueBig) want(!r.cueClash, `the arrow in the bubble touches its text: ${JSON.stringify(r.clashAt || [])}`);
  return bad;
}

/* ── phase-party (r40): the celebration at the right answer of a phase's last question ─────────────────────
   rec = input.mjs partyRun (motion ON, one user-mode mount through every phase): { phases: [{ phase, last, seenMs (from
   the right answer), seenStage, lifeMs, nextAfterPartyMs, stages, stateParty, pointerEvents, box }], error };
   reducedRuns = [{ key, probe }] (every other run forces reduced motion: the party must never be drawn there); N = the
   tool's phase count. Every phase's party, the last phase's included, appears within about 1 s of the right answer of
   the phase's last question (whatever the tool's winMs: before the win animation ends, never at the phase end or the
   summary), with getState().party true, stays inside the stage with no pointer events and is gone 1.2 to 3 s after it
   appears (about 2.3 s); a non-last phase's next phase begins no earlier than 2.2 s after the party appeared (the walk
   waits for it), with no "free" stage on the way. Returns problems; the last one is what the builder can do. */
const PARTY_SOON = 1200;   /* "within about 1 s": the 60 ms sampling and a DevTools round trip ride on top */
const PARTY_HINT = "builder: nothing to write; the party is the runtime's and starts at the right answer of the phase's last question (a FAIL is a runtime matter; THEME colours it)";
export function judgePhaseParty(rec, reducedRuns = [], N = 0, cheer = false) {
  const bad = [];
  if (!rec || rec.error) return [`the party run failed (${rec && rec.error})`, PARTY_HINT];
  const ps = rec.phases || [];
  if (N && ps.length !== N) bad.push(`the party run reached ${ps.length} of ${N} phases`);
  for (const p of ps) {
    const tag = `phase ${p.phase}${p.last ? " (the last)" : ""}`;
    if (p.seenMs === null || p.seenMs === undefined) { bad.push(`${tag}: no party appeared after the right answer of the phase's last question (motion on)`); continue; }
    if (p.seenMs > PARTY_SOON) bad.push(`${tag}: the party began ${p.seenMs} ms after the right answer of the phase's last question${p.seenStage ? " (in stage " + p.seenStage + ")" : ""} (want within about 1 s, before the win animation ends)`);
    if (!p.stateParty) bad.push(`${tag}: getState().party was not true while the party was drawn`);
    const b = p.box;
    if (!b || b.x < -1 || b.y < -1 || b.x + b.w > 1601 || b.y + b.h > 901) bad.push(`${tag}: the party left the 1600 x 900 stage (${JSON.stringify(b)})`);
    if (p.pointerEvents !== "none") bad.push(`${tag}: the party takes pointer events (pointer-events ${JSON.stringify(p.pointerEvents)})`);
    if (cheer) {   /* r54: the mascot has a cheering pose: it shows while the party is drawn and is gone with it */
      if (p.cheerMs === null || p.cheerMs === undefined) bad.push(`${tag}: the mascot never showed its cheering pose (data-pose "cheer") while the party was drawn`);
      else if (p.cheerMs > 500) bad.push(`${tag}: the mascot's cheering pose came ${p.cheerMs} ms after the party began (want with it)`);
      if (p.poseEnd === "cheer") bad.push(`${tag}: the mascot was still in its cheering pose when the party ended`);
    }
    if (p.lifeMs === null || p.lifeMs === undefined || p.lifeMs > 3000 || p.lifeMs < 1200) bad.push(`${tag}: the party was on for ${p.lifeMs} ms (want about 2.3 s, gone by 3 s)`);
    if (!p.last) {
      if (p.nextAfterPartyMs === null || p.nextAfterPartyMs === undefined) bad.push(`${tag}: the next phase never began`);
      else if (p.nextAfterPartyMs < 2200) bad.push(`${tag}: the next phase began ${p.nextAfterPartyMs} ms after the party appeared (the walk must wait for it, about 2.3 s)`);
      if ((p.stages || []).some((x) => /^free@/.test(x))) bad.push(`${tag}: the stage was "free" between the phase and the next one (${(p.stages || []).join(" > ")})`);
    }
  }
  if (cheer && rec.quick) {   /* r54: the small cheer after an ordinary right answer: the cheering pose for about 0.9 s, then standing */
    const q = rec.quick;
    if (q.seenMs === null || q.seenMs === undefined) bad.push("the mascot did not show its cheering pose (data-pose \"cheer\") within 6 s of an ordinary right answer");
    else if (q.backMs === null || q.backMs === undefined) bad.push("the mascot stayed in its cheering pose after an ordinary right answer (want about 0.9 s)");
    else if (q.backMs - q.seenMs < 500 || q.backMs - q.seenMs > 1800) bad.push(`the small cheer after an ordinary right answer lasted ${q.backMs - q.seenMs} ms (want about 0.9 s)`);
  }
  const drawn = reducedRuns.filter((r) => r.probe && r.probe.party);
  if (drawn.length) bad.push(`a party was drawn under reduced motion in ${drawn.map((r) => r.key).slice(0, 3).join(", ")}`);
  return bad.length ? [...bad, PARTY_HINT] : [];
}

/* ── no-free-between-phases (r39: the owner's word): free play is the summary page's only ──────────────
   runs = [{ key, probe }] (every probe run records the stages it went through, "stage@phase", and watches for a Next
   phase key and getState().freeBetween); party = the party run (its stages between phases). A "free" stage may only
   follow "summary" (the summary page's Free play); never a Next phase key, never freeBetween. */
const FREE_HINT = "builder: nothing to write; free play opens only from the summary page (the owner's word, r39); a FAIL is a runtime regression (r38's free play between phases came back)";
export function judgeNoFreeBetween(runs = [], party = null) {
  const bad = [];
  let watched = 0;
  for (const r of runs) {
    const p = r.probe;
    if (!p || !Array.isArray(p.stages)) continue;
    watched++;
    p.stages.forEach((s, k) => { if (/^free@/.test(s) && !/^summary@/.test(p.stages[k - 1] || "")) bad.push(`${r.key}: the stage went "free" after "${p.stages[k - 1] || "nothing"}", not from the summary page`); });
    if (p.nextKey) bad.push(`${r.key}: a Next phase key (data-control next-phase) was drawn`);
    if (p.freeBetween) bad.push(`${r.key}: getState().freeBetween was true`);
  }
  for (const ph of (party && party.phases) || []) if (!ph.last && (ph.stages || []).some((x) => /^free@/.test(x))) bad.push(`party run, phase ${ph.phase}: the stage went "free" before the next phase`);
  if (!watched) bad.push("no run recorded its stages, so nothing was watched");
  return bad.length ? [...[...new Set(bad)].slice(0, 8), FREE_HINT] : [];
}

/* ── classroom paging (the `page` drive): a long line (toolApi.say of three sentences) in a classroom ─────   rec = { text, shown: [{ bubble, held, cue }] (at once, then after each tap), end: { held, cue, bubble } (the last piece
   after its reading time + 1 s). The first piece shows with the cue; each tap shows the next piece; the last piece has no
   cue and its end never waits. */
export function judgePaging(rec, m) {
  const bad = [];
  if (!rec || !rec.shown || !rec.shown.length) return ["no paging run"];
  const exp = bubblePieces(rec.text, m);
  if (exp.length < 2) return [`the scripted long line is only ${exp.length} piece: nothing to page`];
  rec.shown.forEach((s, k) => {
    if (k >= exp.length) return;
    if (!shows(s.bubble, exp[k])) bad.push(`piece ${k + 1}: the bubble shows ${cut(s.bubble)}, want ${cut(exp[k])}`);
    const last = k === exp.length - 1;
    if (!last && !(s.held && s.cue)) bad.push(`piece ${k + 1} of ${exp.length}: it did not wait for the tap with the cue on (held ${s.held}, cue ${s.cue})`);
    if (last && (s.held || s.cue)) bad.push(`the last piece shows a cue or waits (held ${s.held}, cue ${s.cue})`);
  });
  if (rec.shown.length < exp.length) bad.push(`only ${rec.shown.length} of ${exp.length} pieces were reached by tapping`);
  if (!rec.end || rec.end.held || rec.end.cue) bad.push(`the end of the long line waited for a tap (held ${rec.end && rec.end.held}, cue ${rec.end && rec.end.cue})`);
  return bad;
}

/* ── hint-on-miss (r30; kept for an older runtime: r34's hint-pinned replaces it) ──────────────
   rec = { timeline: [{ t, text, typed }], nearMiss } (the bubble sampled from the miss on, t in ms); the hint is the
   item's miss, else the phase's first ladder rung; within 700 ms the bubble shows it, the child's answer still in the
   slot, and the hint is never the question's own line */
export function judgeHintOnMiss(rec, phase, item, m) {
  const bad = [], tag = `${phase.n}`;
  const hint = enOf(item.miss) || enOf(((item.ladder && item.ladder.length ? item.ladder : phase.ladder) || [])[0]);
  if (!hint) return [`${tag}: the first question has no miss line and the phase no ladder: nothing to show after a miss`];
  const want = first(hint, m), q = first(item.say || item.ask, m);
  if (want && want === q) bad.push(`${tag}: the hint is the question's own line (${cut(want)})`);
  const tl = (rec && rec.timeline) || [];
  const hit = tl.find((s) => shows(s.text, want));
  if (!hit) bad.push(`${tag}: the hint ${cut(want)} never showed on the bubble (it read ${tl.map((s) => cut(s.text, 30)).join(" -> ") || "nothing"})`);
  else {
    if (hit.t > 700) bad.push(`${tag}: the hint showed after ${hit.t} ms (want within 700 ms)`);
    const nm = rec.nearMiss;
    if (nm !== undefined && hit.typed !== undefined && String(hit.typed) !== String(nm)) bad.push(`${tag}: the child's answer ${cut(nm, 20)} was not in the slot while the hint showed (${cut(hit.typed, 20)})`);
  }
  return bad;
}

/* ── tr-coverage (source) ─────────────────────────────────────────────────────────────────────
   every English line the tool prints, from its data (guide steps' say and hint included) and its literal api.say /
   api.demoDone calls. A Spoken value
   { en, hi, gu } carries its own translation and is not listed. The lines a guide-steps phase never shows (its `says`,
   and OPENING when phase 1 opens on steps) are not printed, so not asked. A two-box slot prints its labels and units;
   the stacked and side-by-side boxes (SLOT_FRACTION, SLOT_MIXED, SLOT_DECIMAL: parts with `at`) print none. */
export function printedLines(M, toolSrc = "", opts = {}) {
  const out = [];
  const add = (v) => { for (const x of [].concat(v ?? [])) if (typeof x === "string" && x.trim()) out.push(x); };
  const P = M.PHASES || [];
  /* r44 (opts.simpleSummary): the summary page says UI.summaryLine, so FINISH_LINE and the last phase's closing line are
     never shown: not asked (a tool may keep or drop them; the learned lines still print in the rows) */
  const simple = !!opts.simpleSummary;
  /* opts.closingShown (ONE SENTENCE A SCREEN, keyOnly): the last phase's closing is the bubble's line at its last right answer, so it IS shown */
  add(M.TOOL_NAME); if (!simple) add(M.FINISH_LINE); add(M.FREE_LINE); add(M.START_HOOK);
  if (!(P[0] && Array.isArray(P[0].steps) && P[0].steps.length)) add(M.OPENING);
  for (const p of P) {
    const steps = Array.isArray(p.steps) && p.steps.length ? p.steps : null;
    add(p.concept);
    if (steps) add(steps.flatMap((s) => (s ? [s.say, s.hint] : []))); else add(p.says);
    add(p.demoLines); add(p.ladder); if (!(simple && !opts.closingShown && p === P[P.length - 1])) add(p.closing); add(p.learned);
    for (const it of p.items || []) {
      add(it.say); add(it.ask); add(it.miss); add(it.ladder);   /* r24: a question's own ladder */
      if (Array.isArray(it.choices)) add(it.choices.map((c) => c && c.label));
      if (Array.isArray(it.parts)) for (const pt of it.parts) if (pt && !pt.at) { add(pt.label); add(pt.unit); }
    }
  }
  const src = String(toolSrc).replace(/\/\*[\s\S]*?\*\/|(^|[^:"'`\\])\/\/[^\n]*/g, "$1");
  for (const mm of src.matchAll(/api\.(?:say|demoDone)\(\s*(\[[^\]]*\]|"(?:[^"\\\n]|\\.)*")/g)) {
    try { add(JSON.parse(mm[1])); } catch { /* not a literal */ }
  }
  return [...new Set(out)];
}

/* { asked, missing: { hi: [...], gu: [...] }, total }: asked only when TR has a Hindi or Gujarati entry */
export function trCoverage(lines, TR) {
  const has = (l) => !!(TR && TR[l] && typeof TR[l] === "object" && Object.keys(TR[l]).length);
  if (!has("hi") && !has("gu")) return { asked: false, missing: { hi: [], gu: [] }, total: lines.length };
  const miss = (l) => lines.filter((x) => !(TR[l] && Object.prototype.hasOwnProperty.call(TR[l], x) && String(TR[l][x] || "").trim()));
  return { asked: true, missing: { hi: miss("hi"), gu: miss("gu") }, total: lines.length };
}
/* the `voice` command's old message, kept: "N lines have no hi entry: ..." */
export const trMessage = (lang, list) => `${list.length} line${list.length === 1 ? "" : "s"} ha${list.length === 1 ? "s" : "ve"} no ${lang} entry: ${list.slice(0, 4).map((s) => cut(s, 40)).join(", ")}${list.length > 4 ? " …" : ""}`;

/* ══ runtime r41: the checks for the fixes the C4 tool's visual and play reviews found ══════════════════════════ */
const readMsOf = (m, s) => (m && typeof m.readMs === "function" ? m.readMs(s) : Math.max(2400, String(s).length * 68));

/* ── classroom-pieces (the `pieces` drive, r41): a nopark line is read, never zeroed ──────────────────────────────
   recs = [{ phase, last, segs: [{ text, start, end, stage }] }] (the bubble's instruction sampled every 40 ms in a
   classroom; end null when the run stopped on it); lines = { win: [...], closing: [...], summary: [...] } (English, as the
   tool writes them: its literal api.say lines, every phase's closing and FINISH_LINE, every phase's learned; `ignore`: the
   questions' and steps' lines, which a fast drive shows only for a moment). A nopark
   line never parks, so in a classroom each of its pieces stays on the bubble for its reading time: at least
   min(1.5 s, 0.6 x readMs(piece)) (readMs = max(2400, 68 a character)), the first piece of a closing line and of a summary
   row too, and a piece once shown is followed by the line's next piece. A piece of the `win` stage or of the summary that
   is none of these lines (a line the tool builds at run time) is held to the same time. Returns problems; the last one
   is what the builder can do. */
const PIECES_HINT = "builder: a win line must be read within its celebration: keep it to one bubble page (one short sentence), or give the question a longer winMs (the next question cuts the line); a closing line or a summary row cut short is a runtime matter";
export function judgeClassroomPieces(recs = [], lines = {}, m = {}) {
  const bad = [];
  if (!recs.length) return ["no classroom pieces run", PIECES_HINT];
  const known = [];
  for (const [kind, list] of Object.entries(lines)) if (kind !== "ignore") for (const l of list || []) { const ps = bubblePieces(l, m); if (ps.length) known.push({ kind, ps }); }
  const asked = (lines.ignore || []).flatMap((l) => bubblePieces(l, m));
  const label = { win: "a win line", closing: "a closing line", summary: "a summary row" };
  let measured = 0;
  for (const r of recs) {
    const tag = `phase ${r.phase}${r.last ? " (the last)" : ""}`;
    if (r.error) { bad.push(`${tag}: ${r.error}`); continue; }
    const segs = (r.segs || []).filter((s) => norm(s.text));
    segs.forEach((s, k) => {
      if (s.end === null || s.end === undefined) return;
      let hit = null;
      for (const L of known) { const i = L.ps.findIndex((p) => shows(s.text, p)); if (i >= 0) { hit = { L, i }; break; } }
      const loose = !hit && ["win", "summary"].includes(s.stage) && !asked.some((p) => shows(s.text, p));
      if (!hit && !loose) return;
      const piece = hit ? hit.L.ps[hit.i] : norm(s.text);
      const want = Math.min(1500, Math.round(0.6 * readMsOf(m, piece))), dur = s.end - s.start;
      measured++;
      const what = hit ? `${label[hit.L.kind] || "a nopark line"}${hit.L.ps.length > 1 ? `, piece ${hit.i + 1} of ${hit.L.ps.length}` : ""}` : `a ${s.stage} line`;
      if (dur < want) bad.push(`${tag}: ${cut(piece, 40)} (${what}) was on the bubble ${dur} ms, want at least ${want} ms`);
      if (hit && hit.i + 1 < hit.L.ps.length) {
        const nx = segs[k + 1];
        if (!nx || !shows(nx.text, hit.L.ps[hit.i + 1])) bad.push(`${tag}: after ${cut(piece, 30)} (${what}) the bubble showed ${nx ? cut(nx.text, 30) : "nothing more"}, not the line's next piece ${cut(hit.L.ps[hit.i + 1], 30)}`);
      }
    });
  }
  if (!measured && !bad.length) bad.push("no win line, closing line or summary row was seen on the bubble");
  return bad.length ? [...[...new Set(bad)].slice(0, 8), PIECES_HINT] : [];
}

/* ── guide-steps-real-wrong (input.mjs realWrongInput, r41) ────────────────────────────────────────────────────────
   runs = [{ n, how: "click" | "floor" | "key", steps: [{ k, on, before, point?, after, domHint, domInstr, advancedBy, next }],
   none?, error? }]; phases = the tool's PHASES. At every guide step a REAL wrong act (a click on an inert point of Work's
   drawing; r42: a click on the empty board, the work-floor rect; a digit key) shows that step's hint within 300 ms, the
   instruction pinned, the step unchanged; the awaited act still moves it on (step k+1, or the question after the last).
   A drawing that is all live controls is a note; a working area with no floor rect (a "floor" run) is a failure; a box
   drawn over entirely (no empty board) is a note. Returns { bad, notes }. */
const WRONG_HINT = "builder: give each guide step's control data-control (= the step's on) and leave the rest of the working area plain (no onClick that acts during a step, nothing drawn over the floor that swallows a tap); a FAIL with the hint missing on an inert tap, the empty board or a digit, with the controls named, is a runtime matter";
const HOW = { click: "an inert click on the drawing", floor: "a click on the empty board", key: "a digit key" };
export function judgeRealWrong(runs = [], phases = [], m = {}) {
  const bad = [], notes = [];
  const sp = (s) => norm(m.speakable ? m.speakable(enOf(s)) : enOf(s));
  for (const r of runs) {
    const P = phases.find((p) => p.n === r.n) || {}, st = Array.isArray(P.steps) ? P.steps : [];
    const tag = `phase ${r.n} (${HOW[r.how] || r.how})`;
    if (r.error) { bad.push(`${tag}: ${r.error}`); continue; }
    if (r.none) { bad.push(`${tag}: the phase did not open on a guide step`); continue; }
    const rows = r.steps || [];
    if (rows.length !== st.length) bad.push(`${tag}: ${rows.length} step(s) walked, the phase has ${st.length}`);
    for (const x of rows) {
      const s = st[x.k] || {}, at = `${tag} step ${x.k + 1}`, wantH = sp(s.hint);
      if (r.how === "click" && (!x.point || x.point.none)) notes.push(`phase ${r.n} step ${x.k + 1}: every point of Work's drawing is a live control (no inert tap on the drawing to try)`);
      else if (r.how === "floor" && (!x.point || x.point.none)) {
        if (x.point && x.point.floor === false) bad.push(`${at}: the working area has no floor (data-role work-floor): a tap on the empty board reaches nothing`);
        else notes.push(`phase ${r.n} step ${x.k + 1}: no empty board around Work's drawing (the whole box is drawn)`);
      }
      else {
        const a = x.after || {};
        const pinned = (t) => bubblePieces(s.say, m).some((p) => shows(t, p));
        if (norm(a.hint) !== wantH) bad.push(`${at}: 300 ms after the wrong act getState().hint is ${cut(a.hint)}, want the step's hint ${cut(wantH)}`);
        else if (norm(x.domHint) !== wantH) bad.push(`${at}: the hint is in getState() but the bubble draws ${cut(x.domHint)}`);
        if (!pinned(a.instruction) || (m.oneSentence ? !!x.domInstr : !pinned(x.domInstr))) bad.push(`${at}: after the wrong act the instruction is ${cut(a.instruction || x.domInstr)}, ${m.oneSentence ? "or the bubble still draws the step's line beside the hint (one sentence a screen: the hint replaces it)" : "not the step's (it must stay pinned)"}`);
        if (a.stage !== "demo" || a.step !== x.k) bad.push(`${at}: the wrong act moved the lesson (stage ${a.stage}, guideStep ${a.step})`);
      }
      const nx = x.next || {}, lastStep = x.k + 1 >= st.length;
      if (lastStep ? nx.stage !== "ask" : nx.step !== x.k + 1 || nx.stage !== "demo") bad.push(`${at}: after the wrong act the awaited act (${x.advancedBy}) did not move it on (stage ${nx.stage}, guideStep ${nx.step})`);
    }
  }
  if (!runs.length) bad.push("no real wrong-act run");
  return { bad: bad.length ? [...[...new Set(bad)].slice(0, 8), WRONG_HINT] : [], notes: [...new Set(notes)] };
}

/* ── hint-ladder-monotonic (the `ladder` drive, r41) ───────────────────────────────────────────────────────────────
   rec = { phase, item, key, press1, press2, afterMiss, domHint }: at an open question the Hint key twice, then a wrong
   answer. The rungs are [miss || ladder[0], ladder[0] || miss, ladder[1] || ladder[0]] (as printed); the hint after the
   miss is the rung on show or a stronger one, never a weaker one (never the miss again after the stronger rung). */
const LADDER_HINT = "builder: give the phase a ladder of two rungs that differ from each question's miss (the miss first, then ladder[0], then ladder[1]); a FAIL with distinct rungs is a runtime matter";
export function judgeLadderMonotonic(rec, phase = {}, item = {}, m = {}) {
  if (!rec) return ["no hint-ladder run", LADDER_HINT];
  const sp = (s) => norm(m.speakable ? m.speakable(enOf(s)) : enOf(s));
  const lad = (item && item.ladder && item.ladder.length ? item.ladder : phase.ladder) || [];
  const rungs = [enOf(item.miss) || enOf(lad[0]), enOf(lad[0]) || enOf(item.miss), enOf(lad[1]) || enOf(lad[0])].map(sp);
  const at = (h) => rungs.map((r, k) => (r && r === norm(h) ? k : -1)).filter((k) => k >= 0);
  const bad = [];
  if (!rec.key) bad.push("no Hint key (data-control again) at the open question");
  const b = at(rec.press2), a = at(rec.afterMiss);
  if (!b.length) bad.push(`after two presses of the Hint key the hint is ${cut(rec.press2)}, none of the rungs`);
  if (!a.length) bad.push(`after a wrong answer the hint is ${cut(rec.afterMiss)}, none of the rungs`);
  else if (b.length && Math.max(...a) < Math.min(...b)) bad.push(`after two presses showed rung ${Math.min(...b) + 1} ${cut(rec.press2, 30)}, a wrong answer dropped back to rung ${Math.max(...a) + 1} ${cut(rec.afterMiss, 30)} (the hint never gets weaker)`);
  if (a.length && norm(rec.domHint) !== norm(rec.afterMiss)) bad.push(`the bubble draws ${cut(rec.domHint)}, getState().hint ${cut(rec.afterMiss)}`);
  return bad.length ? [...bad, LADDER_HINT] : [];
}

/* ── hint-lines-clear (input.mjs hintFramesInput + measureHintFrame, r41) ──────────────────────────────────────────
   frames = [{ lang, phase, kind, pairs: [{ a, b, clear }], topGap, bottomGap, block, lines } | { missed } | { noHint } |
   { error }], measured by INK on a screenshot: consecutive lines of the instruction and the hint never touch (at least
   2 clear stage units between them), the text never touches the bubble's outline (2 units at the top and the bottom) and
   the block has 6 units to spare in all (topGap + bottomGap). Every language fails alike. */
const LINES_HINT = "builder: shorten that line's Hindi or Gujarati (TR) so the instruction and the hint take two lines; if they already do, nothing to write: the bubble's layout is the runtime's";
export function judgeHintLines(frames = []) {
  const bad = [];
  let n = 0;
  for (const f of frames) {
    const tag = `${f.lang || "?"} phase ${f.phase ?? "?"}${f.kind ? " (" + f.kind + ")" : ""}`;
    if (f.error) { bad.push(`${tag}: ${f.error}`); continue; }
    if (f.missed) { bad.push(`${tag}: the frame was not reached`); continue; }
    if (f.noHint) { bad.push(`${tag}: no hint was drawn in the bubble`); continue; }
    n++;
    for (const p of f.pairs || []) if (!(p.clear >= 2)) bad.push(`${tag}: ${cut(p.a, 24)} and ${cut(p.b, 24)} have ${p.clear} clear unit(s) between their ink (want 2)`);
    if (f.topGap === null || f.topGap === undefined) bad.push(`${tag}: no text found inside the bubble`);
    else {
      if (f.topGap < 2) bad.push(`${tag}: the first line's ink is ${f.topGap} unit(s) from the bubble's top outline (want 2)`);
      if (f.bottomGap < 2) bad.push(`${tag}: the last line's ink is ${f.bottomGap} unit(s) from the bubble's bottom outline (want 2)`);
      if (f.topGap + f.bottomGap < 6) bad.push(`${tag}: the text block (${f.block} units of ink) leaves ${+(f.topGap + f.bottomGap).toFixed(1)} units of the bubble (want 6 to spare)`);
    }
  }
  if (!frames.length) bad.push("no hint frame was measured");
  return { bad: bad.length ? [...[...new Set(bad)].slice(0, 8), LINES_HINT] : [], n };
}

/* ── choice-answer-line (the `choiceline` drive, r41) ──────────────────────────────────────────────────────────────
   recs = [{ lang, found, answerKey, line, lineDom, lineBand: { band, bar }, miss, missBand }]; UI = UI_STRINGS. On a choice
   question the Answer key brings the built-in line for choosing (UI.pickIt of the language), never "type your answer"
   (UI.typeIt), drawn in the neutral band: its band and bar colours are not the hint's accent ones (the wrong choice's).
   Returns { bad, notes }. */
const CHOICE_HINT = "builder: nothing to write; the line and its band are the runtime's (a choice question needs choices: [...] on the item)";
export function judgeChoiceLine(recs = [], UI = {}, { oneSentence = false } = {}) {
  const bad = [], notes = [];
  for (const r of recs) {
    const tag = r.lang || "en", U = UI[tag] || {};
    if (r.error) { bad.push(`${tag}: ${r.error}`); continue; }
    if (!r.found) { notes.push("no choice question in the tool"); continue; }
    if (!r.answerKey) { notes.push("no Answer key (not a board tool)"); continue; }
    if (U.typeIt && norm(r.line) === norm(U.typeIt)) bad.push(`${tag}: the Answer key on a choice question shows ${cut(r.line)} (UI.typeIt: the child picks, nothing is typed)`);
    else if (U.pickIt && norm(r.line) !== norm(U.pickIt)) bad.push(`${tag}: the Answer key on a choice question shows ${cut(r.line)}, want UI.pickIt ${cut(U.pickIt)}`);
    /* ONE SENTENCE A SCREEN (oneSentence, keyOnly): the built-in choose line is not drawn (the keys blink instead); the state still holds it */
    if (oneSentence) { if (norm(r.lineDom)) bad.push(`${tag}: the bubble draws the built-in line ${cut(r.lineDom)} (one sentence a screen: only the question)`); continue; }
    if (norm(r.lineDom) !== norm(r.line)) bad.push(`${tag}: the bubble draws ${cut(r.lineDom)}, getState().hint ${cut(r.line)}`);
    const lb = r.lineBand || {}, mb = r.missBand || {};
    if (!r.lineBand) bad.push(`${tag}: the line is not drawn in a band`);
    else if (!r.missBand) notes.push("the wrong choice's band was not drawn, so the colours were not compared");
    else {
      if (lb.band && lb.band === mb.band) bad.push(`${tag}: the choose line's band is the hint's accent colour ${lb.band} (want the neutral band)`);
      if (lb.bar && lb.bar === mb.bar) bad.push(`${tag}: the choose line's bar is the hint's accent colour ${lb.bar}`);
    }
  }
  if (!recs.length) bad.push("no choice-line run");
  return { bad: bad.length ? [...new Set(bad), CHOICE_HINT] : [], notes: [...new Set(notes)] };
}

/* ── phase-party, r41 additions: a phase dot ends the party; the poppers stand clear of the bubble and the pills ────
   dot = input.mjs partyDotInput: { seen, noDot?, after: { zone, party, phase } } (motion on: phase 1's last question
   right, then a real click on the phase-2 dot while the party is on; read 300 ms later); party = partyRun (its phases'
   `poppers`, the stage boxes of the popper cones at first sight). Returns { bad, notes }. */
export const BUBBLE_BOX = { x: 254, y: 748, w: 656, h: 144 }, PILLS_BOX = { x: 930, y: 782, w: 630, h: 18 };
const hits = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
/* boxes (class 4 r27, a keyOnly or navDots tool): { bubble, pills } where the runtime puts them (footerBoxes; pills = the drawn dots) */
export function judgePartyExtras(dot, party, boxes = null) {
  const BUBBLE = (boxes && boxes.bubble) || BUBBLE_BOX, PILLS = (boxes && boxes.pills) || PILLS_BOX;
  const bad = [], notes = [];
  if (!dot || dot.error) bad.push(`the party-dot run failed (${dot && dot.error})`);
  else if (!dot.seen) bad.push("the party-dot run saw no party after phase 1's last right answer");
  else if (dot.noDot) notes.push("no phase-2 dot to press (a one-phase tool)");
  else {
    const a = dot.after || {};
    if (a.zone) bad.push("300 ms after a phase dot was pressed the party was still drawn (data-zone party)");
    if (a.party) bad.push("300 ms after a phase dot was pressed getState().party was still true");
  }
  const ps = (party && party.phases) || [], pick = [ps[0], ps.length > 1 ? ps[ps.length - 1] : null].filter(Boolean);
  let seen = 0;
  for (const p of pick) for (const b of p.poppers || []) {
    seen++;
    if (hits(b, BUBBLE)) bad.push(`phase ${p.phase}: a popper (${b.x},${b.y} ${b.w}x${b.h}) is over the bubble`);
    if (hits(b, PILLS)) bad.push(`phase ${p.phase}: a popper (${b.x},${b.y} ${b.w}x${b.h}) is over the phase ${boxes && boxes.pills ? "dots" : "pills"}`);
  }
  if (!seen) notes.push("the poppers were not measured");
  return { bad, notes };
}

/* ── summary-simple (input.mjs summaryInput, runtime r44) ─────────────────────────────────────────────────────────────
   runs = [{ lang, classroom, opened, samples: [{ t, stage, row, fin, ring, line }], ink?, tap?: { control, before, after },
   logs, error? }]; UI = UI_STRINGS; m = the model (speakableIn). After the last phase the bubble shows exactly
   UI.summaryLine of the language (as printed), in one or two bubble lines that never touch and stand clear of the
   outline; getState().summaryRow stays -1 for 8 s; no .c4-ring inside the summary; the line does not change by itself;
   finished is sent once, about 5 s (4.5 to 6.5 s) after the page opens. In a classroom a tap on the bubble leaves the
   page as it was (the stage, the row, the line) and finished still goes once. */
const SUMMARY_HINT = "builder: nothing to write; the summary page and its line are the runtime's (the tool's learned lines show in the rows; FINISH_LINE is no longer shown and may be dropped)";
export function judgeSummarySimple(runs = [], UI = {}, m = {}) {
  const bad = [];
  for (const r of runs) {
    const tag = `${r.lang || "en"}${r.classroom ? " (classroom)" : ""}`;
    if (r.error) { bad.push(`${tag}: ${r.error}`); continue; }
    if (!r.opened) { bad.push(`${tag}: the summary page did not open after the last question`); continue; }
    const U = UI[r.lang || "en"] || {}, raw = U.summaryLine;
    if (!raw) { bad.push(`${tag}: UI_STRINGS has no summaryLine`); continue; }
    const want = norm(m.speakableIn ? m.speakableIn(raw, r.lang || "en") : raw);
    const ss = (r.samples || []).filter((x) => x.t >= 300);
    const lines = [...new Set(ss.map((x) => norm(x.line)).filter(Boolean))];
    if (!lines.length) bad.push(`${tag}: the bubble showed nothing on the summary page`);
    else if (lines.length > 1) bad.push(`${tag}: the bubble changed by itself on the summary page: ${lines.map((x) => cut(x, 30)).join(" -> ")}`);
    if (lines.length && lines[0] !== want) bad.push(`${tag}: the bubble says ${cut(lines[0])}, want UI.summaryLine ${cut(want)}`);
    const rows = ss.filter((x) => x.row !== -1);
    if (rows.length) bad.push(`${tag}: getState().summaryRow was ${rows[0].row} at ${rows[0].t} ms (it stays -1: no row is read out)`);
    const ring = ss.find((x) => x.ring);
    if (ring) bad.push(`${tag}: a row of the summary is ringed (.c4-ring) at ${ring.t} ms`);
    const left = ss.find((x) => x.stage !== "summary");
    if (left && !(r.classroom && r.tap)) bad.push(`${tag}: the page left the summary by itself (stage ${left.stage} at ${left.t} ms)`);
    const first = (r.samples || []).find((x) => x.fin > 0), lastS = (r.samples || [])[(r.samples || []).length - 1] || {};
    if (!first) bad.push(`${tag}: finished was not sent within 8 s of the page opening`);
    else if (first.t < 4500 || first.t > 6500) bad.push(`${tag}: finished was sent ${first.t} ms after the page opened (want about 5 s)`);
    if (lastS.fin > 1) bad.push(`${tag}: finished was sent ${lastS.fin} times`);
    const ink = r.ink;
    if (!ink) bad.push(`${tag}: the bubble's line was not measured`);
    else {
      if (!(ink.lines >= 1 && ink.lines <= 2)) bad.push(`${tag}: the line takes ${ink.lines} bubble lines (want one or two)`);
      for (const p of ink.pairs || []) if (!(p.clear >= 2)) bad.push(`${tag}: its two lines have ${p.clear} clear unit(s) between their ink (want 2)`);
      if (ink.topGap !== null && ink.topGap !== undefined && (ink.topGap < 2 || ink.bottomGap < 2)) bad.push(`${tag}: its ink is ${Math.min(ink.topGap, ink.bottomGap)} unit(s) from the bubble's outline (want 2)`);
    }
    if (r.classroom) {
      const tp = r.tap;
      if (!tp || !tp.control) bad.push(`${tag}: no bubble control to tap on the summary page`);
      else {
        const a = tp.after || {}, b = tp.before || {};
        if (a.stage !== "summary" || a.row !== -1 || norm(a.line) !== norm(b.line) || a.fin > 1) bad.push(`${tag}: a tap on the bubble changed the summary page (stage ${a.stage}, summaryRow ${a.row}, line ${cut(a.line, 30)}, ${a.fin} finished)`);
      }
    }
    for (const l of r.logs || []) bad.push(`${tag}: console: ${String(l).slice(0, 100)}`);
  }
  if (!runs.length) bad.push("no summary run");
  return bad.length ? [...[...new Set(bad)].slice(0, 8), SUMMARY_HINT] : [];
}

/* ── one-line-bubble: ONE SENTENCE A SCREEN (keyOnly on a runtime with caps.oneSentence; LAYOUT §1d) ───────────────────────
   One DevTools session per phase (English) and, on phase 1, one per language the tool has begun (hi, gu), with real input:
   the first question of the phase opens with the bubble holding the question ONLY; a wrong answer replaces it with the hint ONLY
   (not both); the child's next digit key brings the question back; the header's Hint key shows a hint ONLY; at the phase's LAST right
   answer the bubble holds only the phase's `closing` (never the tool's own win line); and no thought puff or Hint-key bulb
   (data-role think-puff, hint-bulb) is ever on the page. Everything is read as WRITTEN (a silent bubble prints Latin digits).
   rows = oneLineInput(): [{ phase, lang, open|afterWrong|afterKey|hintKey: { st, bubble, roles: { instruction, hint }, fx },
   last: { seen: [{ t, stage, phase, bubble, roles }], solved, keyed }, fx: { puff, bulb }, error, logs }]. m = the model. */
export function judgeOneLine(rows = [], m = {}) {
  const bad = [], notes = [];
  const pcs = (v, lang) => (lang && lang !== "en" && m.lineFor && m.TR
    ? (m.pieces ? m.pieces(m.speakableIn(m.lineFor(v, lang, m.TR), lang)) : [m.lineFor(v, lang, m.TR)]).map(norm).filter(Boolean)
    : bubblePieces(v, m));
  let n = 0;
  for (const r of rows) {
    const lang = r.lang || "en", tag = `phase ${r.phase}${lang !== "en" ? " (" + lang + ")" : ""}`;
    if (r.error) { bad.push(`${tag}: ${r.error}`); continue; }
    const P = (m.PHASES || []).find((p) => p.n === r.phase) || {}, items = P.items || [];
    const it = items[((r.open && r.open.st && r.open.st.item) || 1) - 1] || items[0] || {};
    const q = pcs(it.say || it.ask, lang), isQ = (s) => q.some((p) => shows(s, p));
    const lad = (it.ladder && it.ladder.length ? it.ladder : P.ladder) || [];
    const hintOf = (v) => (lang !== "en" ? norm(pcs(v, lang).join(" ")) : norm(m.speakable ? m.speakable(enOf(v)) : enOf(v)));
    const rungs = [enOf(it.miss) || enOf(lad[0]), enOf(lad[0]) || enOf(it.miss), enOf(lad[1]) || enOf(lad[0])].filter(Boolean).map(hintOf);
    const alone = (f, what, want) => {   /* the bubble holds ONE block: the hint role, or the instruction role, never both */
      const rl = f.roles || {};
      if (rl.instruction && rl.hint) bad.push(`${tag}: ${what} the bubble holds both the question ${cut(rl.instruction, 30)} and the hint ${cut(rl.hint, 30)} (one sentence a screen)`);
      else if (want === "hint" && rl.instruction) bad.push(`${tag}: ${what} the bubble draws ${cut(rl.instruction, 40)} as the question, want the hint alone`);
      else if (want === "question" && rl.hint) bad.push(`${tag}: ${what} the bubble draws the hint ${cut(rl.hint, 40)}, want the question alone`);
    };
    n++;
    const o = r.open;
    if (!o) { bad.push(`${tag}: no first-question frame`); continue; }
    if (!isQ(o.bubble)) bad.push(`${tag}: the first question opens with ${cut(o.bubble, 60)} on the bubble, want its line alone ${cut(q[0] || "", 40)} (no built-in "tap" or "choose" line: the key's blink is the cue)`);
    alone(o, "at the first question", "question");
    const w = r.afterWrong;
    if (!w) bad.push(`${tag}: no frame after a wrong answer`);
    else if (!rungs.some((h) => norm(w.bubble) === h)) bad.push(`${tag}: after a wrong answer the bubble holds ${cut(w.bubble, 60)}, want the hint alone ${cut(rungs[0] || "", 40)}`);
    else alone(w, "after a wrong answer", "hint");
    const k = r.afterKey;
    if (!k) bad.push(`${tag}: no frame after a digit key`);
    else if (!isQ(k.bubble) && !((it.pad === "enter" || it.choices) && w && norm(k.bubble) === norm(w.bubble))) bad.push(`${tag}: after a digit key the bubble holds ${cut(k.bubble, 60)}, want the question back ${cut(q[0] || "", 40)}`);
    else alone(k, "after a digit key", isQ(k.bubble) ? "question" : "hint");   /* r64: a digit does nothing on a pad:"enter" or choice question, so the hint may stay */
    const h = r.hintKey;
    if (!h) bad.push(`${tag}: no frame after the Hint key`);
    else if (!h.st || !h.st.hint) bad.push(`${tag}: the Hint key showed no hint (getState().hint ${JSON.stringify(h.st && h.st.hint)})`);
    else if (norm(h.bubble) !== norm(h.st.hint)) bad.push(`${tag}: after the Hint key the bubble holds ${cut(h.bubble, 60)}, getState().hint ${cut(h.st.hint, 60)}`);
    else alone(h, "after the Hint key", "hint");
    for (const [what, f] of [["at the first question", o], ["after a wrong answer", w], ["after a digit key", k], ["after the Hint key", h]]) {
      if (f && f.fx && f.fx.puff) bad.push(`${tag}: ${what} a thought puff (data-role think-puff) is on the page`);
      if (f && f.fx && f.fx.bulb) bad.push(`${tag}: ${what} a Hint-key bulb (data-role hint-bulb) is on the page`);
    }
    if (r.fx && r.fx.puff) bad.push(`${tag}: a thought puff (data-role think-puff) appeared during the session`);
    if (r.fx && r.fx.bulb) bad.push(`${tag}: a Hint-key bulb (data-role hint-bulb) appeared during the session`);
    const l = r.last;
    if (!P.closing) notes.push(`${tag}: no closing line, so the phase's last win was not judged`);
    else if (!l || !l.solved) bad.push(`${tag}: the phase's last question could not be answered right (stage never left "ask")`);
    else {
      const cp = pcs(P.closing, lang);
      const seen = (l.seen || []).filter((x) => x.t >= 300 && x.stage !== "ask" && x.phase === r.last.phase && x.bubble);
      const texts = [...new Set(seen.map((x) => norm(x.bubble)))];
      if (!texts.length) bad.push(`${tag}: nothing was on the bubble after the phase's last right answer`);
      const other = texts.filter((t) => !cp.some((p) => shows(t, p)));
      if (other.length) bad.push(`${tag}: at the phase's last win the bubble holds ${other.slice(0, 2).map((t) => cut(t, 50)).join(" and ")}, want only its closing ${cut(cp[0] || "", 40)} (the tool's own win line gives way to it)`);
      else if (!texts.some((t) => shows(t, cp[cp.length - 1]))) bad.push(`${tag}: the closing line ${cut(cp[cp.length - 1] || "", 40)} never reached the bubble at the phase's last win`);
      if (seen.some((x) => x.roles && x.roles.instruction && x.roles.hint)) bad.push(`${tag}: at the phase's last win the bubble held a question and a hint together`);
    }
  }
  if (!rows.length) bad.push("no one-line-bubble run");
  return { bad: [...new Set(bad)].slice(0, 8), notes: [...new Set(notes)], n };
}
