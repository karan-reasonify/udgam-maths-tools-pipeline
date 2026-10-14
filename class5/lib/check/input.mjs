/* Real input, through the DevTools protocol (the other render runs drive the tool through its dev
 * driver and never press anything for real):
 *   pointer-drag     a working-area piece dragged by a real mouse, then by a real finger, ends its
 *                    drag (a piece the tool unmounts mid-drag used to swallow the release, so the
 *                    drop never landed and the piece never came back)
 *   click-then-enter pad keys pressed with the mouse, then the physical Enter: the answer is sent,
 *                    the last key is not pressed again (a pressed key used to keep the focus)
 *   start-page       the start page by mouse and Enter (silent lesson, r30), and from r32 the reset key back to it
 */
import fs from "node:fs";
import { cdpSession, pool } from "../core/chrome.mjs";
import { decodePng } from "../core/png.mjs";

const VISIBLE = `(el) => { const r = el.getBoundingClientRect(); return r.width > 4 && r.height > 4 && !el.closest('[display="none"]'); }`;
/* r24: the ring (class c4-nextblink) round the Answer key of the question bar: does one exist, does it enclose the key, and is it animated */
const KEYRING = `(() => { const k = document.querySelector('[data-zone="ask"] [data-control="answer-open"]'), rs = Array.from(document.querySelectorAll('.c4-nextblink'));
  if (!k) return { key: false, rings: rs.length, around: 0, anim: null };
  const kb = k.getBoundingClientRect();
  const around = rs.filter((r) => { const b = r.getBoundingClientRect(); return b.left <= kb.left + 2 && b.right >= kb.right - 2 && b.top <= kb.top + 2 && b.bottom >= kb.bottom - 2; });
  return { key: true, disabled: k.getAttribute('aria-disabled') === 'true', rings: rs.length, around: around.length, anim: around.length ? getComputedStyle(around[0]).animationName : null }; })()`;
/* r24: the mascot's pose and the thought puff's box in stage units */
const POSE = `(() => { const m = document.querySelector('image[data-role="mascot"]'), p = document.querySelector('[data-role="think-puff"]'); let box = null;
  if (p) { const svg = document.querySelector('svg.c4'), inv = svg.getScreenCTM().inverse(), r = p.getBoundingClientRect(), a = svg.createSVGPoint(), b = svg.createSVGPoint();
    a.x = r.left; a.y = r.top; b.x = r.right; b.y = r.bottom; const A = a.matrixTransform(inv), B = b.matrixTransform(inv); box = { x: A.x, y: A.y, x2: B.x, y2: B.y }; }
  return { pose: m ? (m.getAttribute('data-pose') || '') : null, puff: !!p, box, stage: window.toolApi.getState().stage }; })()`;

/* the visible drag pieces of a phase (one of each control), trying its questions in turn; the first
   question waits out its teach lines, since some pieces live only in a demo */
const findPieces = async (s, tries) => {
  const list = `(() => { const v = ${VISIBLE}, seen = new Set();
    return Array.from(document.querySelectorAll("[data-drag]")).filter(v).map((e) => e.getAttribute("data-control") || "piece").filter((c) => !seen.has(c) && seen.add(c)); })()`;
  for (let k = 0; k < tries; k++) {
    if (await s.until(`${list}.length > 0`, k ? 3000 : 16000)) return s.ev(list);
    await s.ev("window.toolApi.gotoStep(window.toolApi.getState().step + 1)");
  }
  return [];
};
const pick = (c) => `(() => { document.querySelectorAll("[data-cdp-pick]").forEach((e) => e.removeAttribute("data-cdp-pick"));
  const v = ${VISIBLE}; const e = Array.from(document.querySelectorAll("[data-drag]")).filter(v).find((x) => (x.getAttribute("data-control") || "piece") === ${JSON.stringify(c)});
  if (e) e.setAttribute("data-cdp-pick", ""); return !!e; })()`;

/* every kind of piece dragged once by a real mouse, then one by a real finger; each drag must end */
async function dragRun(url, n) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { n, error: "the tool did not mount" };
    const out = { n, drags: [] };
    const pieces = (await findPieces(s, 3)).slice(0, 5);
    if (!pieces.length) return { ...out, none: true };
    for (const [c, how] of [...pieces.map((c) => [c, "mouse"]), [pieces[0], "touch"]]) {
      if (!(await s.ev(pick(c)))) continue;          /* gone after an earlier drop: fine */
      await s.drag("[data-cdp-pick]", 0, -200, how);
      await s.wait(450);
      const open = await s.ev("window.__tool.dragging()");
      out.drags.push({ how, piece: c, open });
      if (open) break;                                 /* a stuck drag blocks the rest */
      await s.wait(1500);
    }
    out.logs = s.logs.slice(0, 3);   /* a warning while dragging (e.g. touch-action) is a real-device problem */
    return out;
  }, { label: `drag ${n}`, timeout: 80000 });
}

async function enterRun(url) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    const steps = await s.ev("window.toolApi.getState().steps");
    /* r25, the REAL flow first (a child's): the guide steps by real Enter presses (each a keydown, an act), then question 1 must open
       with Kiko thinking and nothing touched. gotoStep (below) resets the "acted" mark, so the pose of the questions it opens proves
       nothing about question 1 after the steps: a tap during a step once marked question 1 as acted on and Kiko never thought there
       (found by the owner on ch 8, 2026-10-14; the r24 row passed all the same). */
    let flow = null;
    {
      let guard = 0;
      while (guard++ < 16) {
        const g = await s.ev("window.toolApi.getState().stage");
        if (g === "ask" || g === "win" || g === "free") break;
        await s.key("Enter", "Enter", 13, String.fromCharCode(13));
        await s.wait(1800);
      }
      await s.wait(700);
      if ((await s.ev("window.toolApi.getState().stage")) === "ask") flow = await s.ev(POSE);
    }
    const live = `(() => { const st = window.toolApi.getState(); const k = document.querySelector('[data-control="key-1"]'); return st.keypadOpen && st.cardReady !== false && !st.choices && !st.parts && k && k.getAttribute('aria-disabled') !== 'true'; })()`;
    /* later questions first (gotoStep goes straight to a question); the first one waits out its teach lines */
    for (const t of [...Array.from({ length: steps - 1 }, (_, k) => k + 1), 0]) {
      await s.ev(`window.toolApi.gotoStep(${t})`);
      if (!(await s.until(live, t ? 3000 : 25000))) continue;
      await s.wait(400);                                  /* settled: a phase jump reports "ask" for one render */
      if (!(await s.ev(live))) continue;
      const poseOpen = await s.ev(POSE);                  /* r24: a question waits and nothing was touched: Kiko thinks */
      await s.click('[data-control="key-1"]');
      await s.wait(120);
      const poseTap = await s.ev(POSE);                   /* ... and after the first tap he stands again */
      const before = await s.ev("window.toolApi.getState().typed");
      await s.key("Enter", "Enter", 13, String.fromCharCode(13));
      await s.wait(500);
      const st = await s.ev("(() => { const a = document.activeElement; return { typed: window.toolApi.getState().typed, tries: window.toolApi.getState().tries, stage: window.toolApi.getState().stage, focus: a && a.getAttribute ? a.getAttribute('data-control') : null }; })()");
      /* a miss is never sent again unchanged: Enter with nothing retyped must not cost a second try */
      let noResend = null;
      if (st.stage !== "win") {
        await s.key("Enter", "Enter", 13, String.fromCharCode(13)); await s.wait(400);
        noResend = await s.ev("window.toolApi.getState().tries");
      }
      /* then a finger: tap the 2 key, then the physical Enter (a finger's focus arrives after the tap) */
      let touch = null;
      if (st.stage !== "win" && (await s.until(live, 20000))) {
        await s.wait(400);
        const t0 = await s.ev("window.toolApi.getState().typed");
        const b2 = await s.centre('[data-control="key-2"]');
        await s.touch("touchStart", b2.x, b2.y); await s.wait(60); await s.touch("touchEnd", b2.x, b2.y); await s.wait(250);
        const t1 = await s.ev("window.toolApi.getState().typed");
        await s.key("Enter", "Enter", 13, String.fromCharCode(13)); await s.wait(500);
        touch = { t0, t1, t2: await s.ev("window.toolApi.getState().typed") };
      }
      return { step: t + 1, before, ...st, noResend, touch, pose: { open: poseOpen, tap: poseTap, flow }, logs: s.logs.slice(0, 3) };
    }
    return { none: true, flow };
  }, { label: "click-then-enter", timeout: 150000 });
}

/* a two-part answer (quotient and remainder), by a real mouse, finger and keyboard, on the first
   question that has one: digits go to the box with the caret, Enter moves on, Enter on the last box
   answers, a tap on a box moves the caret, a digit after a miss starts only its own box afresh, rub
   out on an empty box steps back, and Enter on a focused box is never a trap */
async function partsRun(url) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    const steps = await s.ev("window.toolApi.getState().steps");
    const live = `(() => { const st = window.toolApi.getState(); const k = document.querySelector('[data-control="key-1"]'); return st.keypadOpen && st.cardReady !== false && !!st.parts && k && k.getAttribute('aria-disabled') !== 'true'; })()`;
    const has = `(() => { const st = window.toolApi.getState(); return !!st.parts; })()`;
    const st = () => s.ev("(() => { const g = window.toolApi.getState(); return { typed: g.typed, part: g.part, tries: g.tries, stage: g.stage }; })()");
    const tap = async (sel) => { const b = await s.centre(sel); await s.touch("touchStart", b.x, b.y); await s.wait(60); await s.touch("touchEnd", b.x, b.y); await s.wait(250); };
    const enter = async () => { await s.key("Enter", "Enter", 13, String.fromCharCode(13)); await s.wait(350); };
    /* the kind of box set: two boxes side by side or stacked (quotient · remainder, a fraction), or a
       mixed number (whole · numerator · denominator, any may stay empty) */
    const kindOf = `(() => { const p = window.toolApi.getState().parts || []; return p.join() === "whole,numerator,denominator" ? "mixed" : p.length === 2 ? "two" : "other"; })()`;
    const out = {};
    for (let t = 0; t < steps && !(out.two && out.mixed); t++) {
      await s.ev(`window.toolApi.gotoStep(${t})`);
      await s.wait(300);
      if (!(await s.ev(has))) continue;
      const kind = await s.ev(kindOf);
      if (kind === "other" || out[kind]) continue;
      if (!(await s.until(live, 25000))) continue;
      await s.wait(400);
      if (!(await s.ev(live))) continue;
      if (kind === "mixed") { out.mixed = await mixedRun(s, t, st, tap, enter, live); continue; }
      const log = { step: t + 1 };
      await s.click('[data-control="key-1"]'); await s.wait(120);
      await s.click('[data-control="key-6"]'); await s.wait(200);
      log.typed = await st();                                   /* "16|", caret in box 1 */
      await enter(); log.moved = await st();                    /* caret in box 2, nothing answered */
      await tap('[data-control="key-2"]'); log.second = await st(); /* "16|2" */
      await enter(); log.answered = await st();                 /* answered: tries 1 (or a win) */
      if (log.answered.stage !== "win" && (await s.until(live, 20000))) {
        await s.wait(300);
        await enter(); log.noResend = await st();                 /* nothing retyped: the miss is never sent again */
        await s.click('[data-control="part-2"]'); await s.wait(200); log.clickBox = await st();
        await tap('[data-control="part-1"]'); log.tapBox = await st();
        await s.click('[data-control="key-3"]'); await s.wait(200); log.fresh = await st(); /* "3|2": only box 1 starts afresh */
        await enter(); log.moved2 = await st();
        await s.key("Backspace", "Backspace", 8); await s.wait(200); log.rub = await st();   /* "3|" */
        await s.key("Backspace", "Backspace", 8); await s.wait(200); log.back = await st();  /* caret back in box 1 */
        await s.ev(`document.querySelector('[data-control="part-2"]').focus()`);
        await enter(); log.focusPick = await st();              /* Enter on a focused box picks it */
        await s.key("4", "Digit4", 52, "4"); await s.wait(200);
        await enter(); log.focusEnter = await st();             /* Enter again on that box answers */
      }
      log.logs = s.logs.slice(0, 3);
      out.two = log;
    }
    return out.two || out.mixed ? out : { none: true };
  }, { label: "parts-input", timeout: 180000 });
}

/* a mixed number (SLOT_MIXED): Enter moves on from a filled box, a fraction missing its denominator never
   answers, a whole number alone answers with Enter on the empty numerator, a tap picks a box, a digit
   after a miss starts only its own box, rub out steps back, and Enter on a focused box is no trap */
async function mixedRun(s, t, st, tap, enter, live) {
  const log = { step: t + 1 };
  await s.click('[data-control="key-1"]'); await s.wait(120);
  await s.click('[data-control="key-6"]'); await s.wait(200);
  log.typed = await st();                                     /* "16||", caret in the whole box */
  await enter(); log.moved = await st();                      /* caret in the numerator */
  await tap('[data-control="key-2"]'); log.second = await st();   /* "16|2|" */
  await enter(); log.moved2 = await st();                     /* caret in the denominator */
  await enter(); log.halfStays = await st();                  /* 2 over nothing: no answer, caret stays */
  await s.click('[data-control="key-3"]'); await s.wait(200);
  await enter(); log.answered = await st();                   /* 16 2/3 answered */
  if (log.answered.stage !== "win" && (await s.until(live, 20000))) {
    await s.wait(300);
    await enter(); log.noResend = await st();                   /* nothing retyped: the miss is never sent again */
    await s.click('[data-control="part-2"]'); await s.wait(200); log.clickBox = await st();
    await tap('[data-control="part-1"]'); log.tapBox = await st();
    await s.click('[data-control="key-4"]'); await s.wait(200); log.fresh = await st();  /* "4|2|3" */
    await enter(); log.movedAfter = await st();
    await s.key("Backspace", "Backspace", 8); await s.wait(200); log.rub = await st();    /* "4||3" */
    await s.key("Backspace", "Backspace", 8); await s.wait(200); log.back = await st();   /* back in the whole box */
    await s.click('[data-control="part-3"]'); await s.wait(200);
    await s.key("Backspace", "Backspace", 8); await s.wait(200); log.rubBottom = await st(); /* "4||" */
    await s.ev(`document.querySelector('[data-control="part-2"]').focus()`);
    await enter(); log.focusPick = await st();                /* Enter on a focused box picks it */
    await enter(); log.wholeAnswers = await st();             /* 4 alone answers: Enter on the empty numerator */
  }
  log.logs = s.logs.slice(0, 3);
  return log;
}

/* the point key (tool.pointKey), by a real mouse, finger and keyboard, on the first single-box question:
   0, point, point (a second point is refused), a finger's 5, the keyboard's "." (refused too), rub out
   twice, the keyboard's "." and 7, Escape clears, then 0.7 answered with Enter; on a parts question
   (a fraction, two boxes) the key is off and "." types nothing */
async function pointRun(url) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    const steps = await s.ev("window.toolApi.getState().steps");
    const keyOn = `(() => { const k = document.querySelector('[data-control="key-point"]'); return !!k && k.getAttribute('aria-disabled') !== 'true'; })()`;
    const has = `!!document.querySelector('[data-control="key-point"]')`;
    const live = `(() => { const st = window.toolApi.getState(); return st.keypadOpen && st.cardReady !== false && !st.choices && !st.parts && ${keyOn}; })()`;
    const st = () => s.ev("(() => { const g = window.toolApi.getState(); const a = document.activeElement; return { typed: g.typed, tries: g.tries, stage: g.stage, focus: a && a.getAttribute ? a.getAttribute('data-control') : null }; })()");
    const tap = async (sel) => { const b = await s.centre(sel); await s.touch("touchStart", b.x, b.y); await s.wait(60); await s.touch("touchEnd", b.x, b.y); await s.wait(250); };
    const dot = async () => { await s.key(".", "Period", 190, "."); await s.wait(200); };
    const out = {};
    /* Scan first, drive second. One state read a step and no waiting: a tool whose questions are mostly
       word choices and fractions (ch 8's Place and Worth Chart) used to spend its whole session waiting
       at each question for a pad that question never shows, and timed out before it drove anything. */
    const shape = `(() => { const g = window.toolApi.getState(); return { p: !!g.parts, c: !!g.choices, h: ${has} }; })()`;
    const plain = [];
    let partsAt = -1, seen = false;
    for (let t = 0; t < steps; t++) {
      await s.ev(`window.toolApi.gotoStep(${t})`);
      await s.wait(250);
      const k = await s.ev(shape);
      if (k.h) seen = true;
      if (!k.p && !k.c) plain.push(t);
      else if (k.p && partsAt < 0) partsAt = t;
    }
    /* the point key is off on a question answered in boxes, and "." types nothing there */
    if (partsAt >= 0) {
      await s.ev(`window.toolApi.gotoStep(${partsAt})`);
      if (await s.until(`window.toolApi.getState().keypadOpen && ${has}`, 20000)) {
        await s.wait(400);
        const t0 = (await st()).typed;
        await dot();
        out.parts = { step: partsAt + 1, off: !(await s.ev(keyOn)), same: (await st()).typed === t0 };
      }
    }
    /* every plain-slot question in turn, not just the first: a question whose answer is made on the
       working area (pad: "enter") has the point key off, and that used to end the run before it
       reached the question that really types a decimal (ch 8's Place and Worth Chart, phase 4) */
    for (const [n, plainAt] of plain.slice(0, 9).entries()) {
      await s.ev(`window.toolApi.gotoStep(${plainAt})`);
      /* a generous window per candidate: this run shares the machine with a preview rebuild and other
         agents, and a question missed by a second used to fail a sound tool (ch 8's Say It Bar) */
      const ready = (await s.until(live, n ? 12000 : 20000)) && (await s.wait(400), await s.ev(live));
      if (!ready) continue;
      {
      const log = { step: plainAt + 1 };
      await s.key("Escape", "Escape", 27); await s.wait(150);
      await s.click('[data-control="key-0"]'); await s.wait(120);
      await s.click('[data-control="key-point"]'); await s.wait(200); log.mouse = await st();   /* "0." */
      await s.click('[data-control="key-point"]'); await s.wait(200); log.twice = await st();   /* still "0." */
      await tap('[data-control="key-5"]'); log.finger = await st();                          /* "0.5" */
      await dot(); log.keyTwice = await st();                                                /* still "0.5" */
      await s.key("Backspace", "Backspace", 8); await s.wait(150);
      await s.key("Backspace", "Backspace", 8); await s.wait(150); log.rub = await st();     /* "0" */
      await dot(); await s.key("7", "Digit7", 55, "7"); await s.wait(200); log.keys = await st(); /* "0.7" */
      await s.key("Escape", "Escape", 27); await s.wait(200); log.clear = await st();        /* "" */
      await s.click('[data-control="key-0"]'); await s.wait(120);
      await s.click('[data-control="key-point"]'); await s.wait(120);
      await s.click('[data-control="key-7"]'); await s.wait(200);
      await s.key("Enter", "Enter", 13, String.fromCharCode(13)); await s.wait(500); log.answered = await st();
      log.logs = s.logs.slice(0, 3);
      out.one = log;
      }
      break;
    }
    if (out.one) return out;
    /* a point key with no single-box question to try it on is not proved: a parts question alone is not enough */
    return seen ? { ...out, unreached: true } : { none: true };
  }, { label: "point-input", timeout: 240000 });
}

function judgePoint(p) {
  const b = [];
  if (p.one) {
    const q = `question ${p.one.step}`, o = p.one;
    const want = (row, name, fn, msg) => { if (!row) return; if (!fn(row)) b.push(`${q}: ${msg} (${name}: ${JSON.stringify(row)})`); };
    want(o.mouse, "mouse", (r) => r.typed === "0.", "a mouse press on 0 then the point key did not type \"0.\"");
    want(o.mouse, "focus", (r) => !(r.focus && /^key-/.test(r.focus)), "focus stayed on a key after a mouse press");
    want(o.twice, "twice", (r) => r.typed === "0.", "a second point was typed into one answer");
    want(o.finger, "finger", (r) => r.typed === "0.5", "a finger tap on 5 after the point did not type \"0.5\"");
    want(o.keyTwice, "keyTwice", (r) => r.typed === "0.5", "the keyboard's \".\" typed a second point");
    want(o.rub, "rub", (r) => r.typed === "0", "rub out did not take off the 5 and then the point");
    want(o.keys, "keys", (r) => r.typed === "0.7", "the keyboard's \".\" then 7 did not type \"0.7\"");
    want(o.clear, "clear", (r) => r.typed === "", "Escape did not clear the slot");
    want(o.answered, "answered", (r) => r.tries === 1 || r.stage === "win", "Enter did not answer the typed decimal");
    (o.logs || []).forEach((l) => b.push(`console on a key press: ${l.slice(0, 140)}`));
  }
  if (p.parts && !(p.parts.off && p.parts.same)) b.push(`question ${p.parts.step}: on a parts question the point key is ${p.parts.off ? "off" : "on"} and "." ${p.parts.same ? "typed nothing" : "changed the answer"}`);
  return b;
}

function judgeMixed(p) {
  const b = [], q = `question ${p.step} (mixed number)`;
  const want = (row, name, fn, msg) => { if (!row) return; if (!fn(row)) b.push(`${q}: ${msg} (${name}: ${JSON.stringify(row)})`); };
  want(p.typed, "typed", (r) => r.typed === "16||" && r.part === 0, "a mouse press on 1 then 6 did not fill the whole box");
  want(p.moved, "moved", (r) => r.part === 1 && r.tries === 0 && r.stage === "ask", "Enter on a filled whole box did not move to the numerator (or it answered)");
  want(p.second, "second", (r) => r.typed === "16|2|" && r.part === 1, "a finger tap on 2 did not go into the numerator");
  want(p.moved2, "moved2", (r) => r.part === 2 && r.tries === 0, "Enter on the numerator did not move to the denominator");
  want(p.halfStays, "halfStays", (r) => r.part === 2 && r.tries === 0 && r.stage === "ask", "Enter with no denominator answered or moved away");
  want(p.answered, "answered", (r) => r.tries === 1 || r.stage === "win", "Enter on the filled denominator did not answer");
  want(p.noResend, "noResend", (r) => r.tries === 1 && r.stage === "ask", "Enter after a miss sent the same answer again, with nothing retyped (it costs a try)");
  want(p.clickBox, "clickBox", (r) => r.part === 1, "a mouse press on the numerator did not move the caret there");
  want(p.tapBox, "tapBox", (r) => r.part === 0, "a finger tap on the whole box did not move the caret there");
  want(p.fresh, "fresh", (r) => r.typed === "4|2|3", "after a miss a digit did not start its own box afresh (and keep the others)");
  want(p.movedAfter, "movedAfter", (r) => r.part === 1 && r.tries === 1, "Enter on the whole box did not move on");
  want(p.rub, "rub", (r) => r.typed === "4||3", "rub out did not clear the numerator's old number");
  want(p.back, "back", (r) => r.part === 0, "rub out on an empty numerator did not step back to the whole box");
  want(p.rubBottom, "rubBottom", (r) => r.typed === "4||" && r.part === 2, "a press on the denominator and rub out did not clear it");
  want(p.focusPick, "focusPick", (r) => r.part === 1 && r.tries === 1, "Enter on a focused box did not pick it");
  want(p.wholeAnswers, "wholeAnswers", (r) => r.tries === 2 || r.stage === "win", "a whole number alone did not answer with Enter on the empty numerator (or a keyboard trap)");
  (p.logs || []).forEach((l) => b.push(`console on a box or key press: ${l.slice(0, 140)}`));
  return b;
}

function judgeParts(p) {
  const b = [], q = `question ${p.step}`;
  const want = (row, name, fn, msg) => { if (!row) return; if (!fn(row)) b.push(`${q}: ${msg} (${name}: ${JSON.stringify(row)})`); };
  want(p.typed, "typed", (r) => r.typed === "16|" && r.part === 0, "a mouse press on 1 then 6 did not fill the first box");
  want(p.moved, "moved", (r) => r.part === 1 && r.tries === 0 && r.stage === "ask", "Enter on a filled first box did not move to the second (or it answered)");
  want(p.second, "second", (r) => r.typed === "16|2" && r.part === 1, "a finger tap on 2 did not go into the second box");
  want(p.answered, "answered", (r) => r.tries === 1 || r.stage === "win", "Enter on the last box did not answer");
  want(p.noResend, "noResend", (r) => r.tries === 1 && r.stage === "ask", "Enter after a miss sent the same answer again, with nothing retyped (it costs a try)");
  want(p.clickBox, "clickBox", (r) => r.part === 1, "a mouse press on the second box did not move the caret there");
  want(p.tapBox, "tapBox", (r) => r.part === 0, "a finger tap on the first box did not move the caret there");
  want(p.fresh, "fresh", (r) => r.typed === "3|2", "after a miss a digit did not start its own box afresh (and keep the other)");
  want(p.moved2, "moved2", (r) => r.part === 1 && r.tries === 1, "Enter on the first box did not move on");
  want(p.rub, "rub", (r) => r.typed === "3|", "rub out did not clear the second box's old number");
  want(p.back, "back", (r) => r.part === 0, "rub out on an empty box did not step back to the first");
  want(p.focusPick, "focusPick", (r) => r.part === 1 && r.tries === 1, "Enter on a focused box did not pick it");
  want(p.focusEnter, "focusEnter", (r) => r.tries === 2 || r.stage === "win", "Enter on the focused box that has the caret did not answer (a keyboard trap)");
  (p.logs || []).forEach((l) => b.push(`console on a box or key press: ${l.slice(0, 140)}`));
  return b;
}

/* the BOARD layout's answer panel (runtime r27), by a real mouse, a real finger and the keyboard, on the first typed
   question, with motion ON (the other runs hold still): it opens shut with the picture at its widest, a tap on Answer
   opens it and the picture narrows to the classic width, a tap on Close shuts it, a finger does the same, a digit typed
   on the keyboard opens it and lands in the box, and a miss shuts it for the traceback and brings it back with the
   child's answer still in the box */
async function boardRun(url) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    const steps = await s.ev("window.toolApi.getState().steps");
    const KEY = `document.querySelector('[data-control="answer-open"]')`;
    const g = () => s.ev(`(() => { const a = window.toolApi.getState(), k = ${KEY};
      return { panel: a.answerPanel, w: a.workWidth, stage: a.stage, typed: a.typed, tries: a.tries, locked: !!window.__tool.state().locked,
        label: k ? k.getAttribute("aria-label") : null, parts: !!a.parts, hint: a.hint, hintKind: a.hintKind, ring: ${KEYRING},
        /* drawn, not merely mounted: a shut panel is display none (not drawn, not tabbable, not in any geometry) */
        key1: (() => { const e = document.querySelector('[data-control="key-1"]'); return !!e && !e.closest('[display="none"]'); })() }; })()`);
    const settle = async (want) => { await s.until(`window.toolApi.getState().answerPanel === ${JSON.stringify(want)}`, 4000); await s.wait(700); return g(); };
    const live = `(() => { const st = window.toolApi.getState(), k = ${KEY}; return st.board && st.keypadOpen && st.cardReady !== false && !st.choices && !!k && k.getAttribute("aria-disabled") !== "true"; })()`;
    /* r24: before any question (a warm-up or a guide step is waiting) nothing may ring the Answer key */
    const mount = await s.ev(`({ stage: window.toolApi.getState().stage, hint: window.toolApi.getState().hint, ring: ${KEYRING} })`);
    let found = false;
    for (const t of [...Array.from({ length: steps - 1 }, (_, k) => k + 1), 0]) {
      await s.ev(`window.toolApi.gotoStep(${t})`);
      if (!(await s.until(live, t ? 3000 : 25000))) continue;
      await s.wait(500);
      if (await s.ev(live)) { found = true; break; }
    }
    if (!found) return { none: true, mount };
    const out = { mount, start: await g() };
    await s.click('[data-control="answer-open"]'); out.opened = await settle("open");
    await s.click('[data-control="answer-open"]'); out.shut = await settle("closed");
    const b = await s.centre('[data-control="answer-open"]');
    await s.touch("touchStart", b.x, b.y); await s.wait(60); await s.touch("touchEnd", b.x, b.y); out.finger = await settle("open");
    await s.click('[data-control="answer-open"]'); await settle("closed");
    await s.key("5", "Digit5", 53, "5"); out.typedOpens = await settle("open");
    /* a miss: shut for the traceback (when the tool locks the pad for it), back with the answer kept */
    await s.ev("window.__tool.nearMiss(); window.__tool.submit()");
    const sawLock = await s.until("!!window.__tool.state().locked", 2500);
    if (sawLock) { await s.wait(500); out.during = await g(); }
    await s.until("!window.__tool.state().locked", 30000);
    out.after = await settle("open");
    out.sawLock = sawLock;
    out.logs = s.logs.slice(0, 3);
    return out;
  }, { label: "board-panel", timeout: 120000, reducedMotion: false });
}

/* r24, ANSWER-BLINK (a board tool without cardAnswer; the board-panel run): the pink Answer key blinks only while it is the thing to press */
function judgeAnswerBlink(v) {
  const b = [];
  if (!v || v.none) return b;
  const m = v.mount;
  if (m && m.stage !== "ask" && m.ring && m.ring.around) b.push(`while a warm-up or a guide step waits (stage "${m.stage}") the Answer key is ringed: it blinks only at an open question`);
  const s = v.start || {};
  if (!s.ring || !s.ring.key) b.push("no Answer key (data-control answer-open) in the question bar at an open question");
  else {
    if (!s.ring.around) b.push("a keypad question opens with the Answer key not blinking (no ring c4-nextblink round it): it must blink while the keypad is shut");
    else if (!s.ring.anim || s.ring.anim === "none") b.push(`the ring round the Answer key does not blink (animation ${s.ring.anim})`);
    if (s.hintKind !== "type" || !/blinking Answer key/i.test(String(s.hint || ""))) b.push(`no built-in "Tap the blinking Answer key." line under the instruction at an open question (hint ${JSON.stringify(s.hint)}, kind ${s.hintKind})`);
  }
  if (v.opened && v.opened.ring && v.opened.ring.around) b.push("the Answer key still blinks with the keypad open: it stops once it is tapped");
  if (v.shut && v.shut.ring && !v.shut.ring.around) b.push("after Close the Answer key does not blink again though the question still waits");
  if (v.shut && (v.shut.hintKind !== "type" || !/blinking Answer key/i.test(String(v.shut.hint || "")))) b.push(`after Close the "Tap the blinking Answer key." line did not come back (hint ${JSON.stringify(v.shut.hint)})`);
  if (v.sawLock && v.during && v.during.ring && v.during.ring.around) b.push("the Answer key blinks while the pad is locked (a miss's traceback)");
  if (v.sawLock && v.during && v.during.hintKind === "type" && /blinking Answer key/i.test(String(v.during.hint || ""))) b.push("the \"Tap the blinking Answer key.\" line shows while the pad is locked");
  return b;
}

/* r24, MASCOT-THINK (the click-then-enter run, any tool): Kiko thinks while a question waits and stands again at the first tap; the puff is inside his box */
function judgeThink(p) {
  const b = [], o = p.open || {}, t = p.tap || {};
  if (o.pose !== "think") b.push(`at an open question nothing touched yet the mascot is not thinking (data-pose "${o.pose}", want "think")`);
  if (!o.puff) b.push("no thought puff (data-role think-puff) beside Kiko while the question waits");
  else if (o.box && (o.box.x < 27.5 || o.box.y < 737.5 || o.box.x2 > 232.5 || o.box.y2 > 898.5)) b.push(`the thought puff leaves the mascot's box (x 28 to 232, y 738 to 898): it is at x ${Math.round(o.box.x)} to ${Math.round(o.box.x2)}, y ${Math.round(o.box.y)} to ${Math.round(o.box.y2)}`);
  if (t.pose === "think") b.push("after the first tap the mascot is still thinking: the standing picture must be back");
  if (t.puff) b.push("the thought puff is still drawn after the first tap");
  /* r25: question 1 after the guide steps, reached by real key presses (the flow a child takes) */
  const f = p.flow;
  if (f && f.pose !== "think") b.push(`after the guide steps (real Enter presses) question 1 opened with nothing touched and the mascot is not thinking (data-pose "${f.pose}", want "think"): a tap or key during a guide step must not count as an act on the question`);
  else if (f && !f.puff) b.push("question 1 after the guide steps has no thought puff beside Kiko");
  return b;
}

function judgeBoard(v) {
  const b = [];
  const s = v.start, o = v.opened, h = v.shut, f = v.finger, t = v.typedOpens, a = v.after, d = v.during;
  if (s.panel !== "closed" || s.key1) b.push(`a question opens with the answer panel shut (panel ${s.panel}, keys drawn ${s.key1})`);
  if (s.w < 1468) b.push(`with the panel shut the working area is ${s.w} wide, want the whole card (1472)`);
  if (o.panel !== "open" || !o.key1) b.push(`a tap on Answer did not open the panel (panel ${o.panel}, keys drawn ${o.key1})`);
  else if (o.w > 1090) b.push(`with the panel open the working area is still ${o.w} wide, want 1086`);
  if (o.label !== "Close") b.push(`the Answer key reads "${o.label}" while the panel is open, want Close`);
  if (h.panel !== "closed" || h.key1 || h.w < 1468) b.push(`a tap on Close did not shut the panel and give the picture its width back (panel ${h.panel}, width ${h.w})`);
  if (f.panel !== "open") b.push("a finger tap on Answer did not open the panel");
  if (t.panel !== "open" || !/5/.test(String(t.typed))) b.push(`a digit typed on the keyboard did not open the panel with the digit in the box (panel ${t.panel}, typed "${t.typed}")`);
  if (v.sawLock && d && d.panel !== "closed") b.push("a miss's traceback ran with the answer panel still open: it must shut so the correction has the whole area");
  if (a.panel !== "open" || !String(a.typed) || a.stage !== "ask") b.push(`after the traceback the panel did not come back with the answer in the box (panel ${a.panel}, typed "${a.typed}", stage ${a.stage})`);
  (v.logs || []).forEach((l) => b.push(`console while the panel moved: ${l.slice(0, 140)}`));
  return b;
}

/* the START PAGE (runtime r28; a tool that gives StartArt / START_HOOK), by a real mouse and the keyboard, with the sound
   effects on (no ?muted=1). The lesson is silent (r30), so the proof is what the page shows: it opens on the start page
   with no line on the bubble (the tool's own header, bubble and working area are not drawn) and the lesson not begun
   (stage "teach"), still so after a 3 s wait; nothing of the tool shows behind it; its text fits (type floor, no
   overlap, inside the stage) in English, Hindi and Gujarati; the Start key is a labelled 72 x 72 button; a tap (or Enter)
   takes the page away and the tool's first line (its first guide step, else its first teach piece) is on the bubble
   within 2 s. speechSynthesis is never called.
   BACK TO THE START (r32, `backToStart` in the runtime; click path only): after one question is played, the header's
   reset key (`data-control="restart"`, labelled "Back to the start") brings the start page back with a clean slate (the
   mount's first phase, nothing played, finished re-armed, no header, working area or bubble, stage "teach"), and Start
   works again (the page goes, the first line is on the bubble). */
async function startRun(url, how, { backToStart = false } = {}) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool && window.__geometry)", 20000))) return { error: "the tool did not mount" };
    await s.wait(600);
    const BUBBLE = `(() => { const b = document.querySelector('[data-zone="bubble"]'); return b ? Array.from(b.querySelectorAll("text")).map((x) => x.textContent).join(" ").replace(/\\s+/g, " ").trim() : ""; })()`;
    const snap = () => s.ev(`(() => { const a = window.toolApi.getState(), p = window.__probe || {}, r = document.querySelector('[data-control="restart"]');
      return { startPage: a.startPage, zone: !!document.querySelector('[data-zone="start"]'), key: !!document.querySelector('[data-control="start"]'),
        header: !!document.querySelector('[data-zone="header"]'), work: !!document.querySelector('[data-zone="work"]'),
        bubbleZone: !!document.querySelector('[data-zone="bubble"]'), bubble: ${BUBBLE}, spoke: p.speak || 0, stage: a.stage,
        phase: a.phase, played: (a.played || []).length, complete: !!a.complete, restartLabel: r ? r.getAttribute("aria-label") : null }; })()`);
    const out = { how, before: await snap() };
    out.geometry = await s.ev("window.__geometry()");
    /* the Start key's face: the theme's Enter gradient (gTenter), never the chrome's grey accent (gAccent) */
    out.startKey = await s.ev(`(() => { const f = document.querySelector('[data-control="start"] .c4-face'); if (!f) return null;
      const m = /url\\(#([^)]+)\\)/.exec(f.getAttribute("fill") || ""), g = m ? document.getElementById(m[1]) : null;
      return { fill: f.getAttribute("fill"), grad: m ? m[1] : null, stops: g ? Array.from(g.querySelectorAll("stop")).map((x) => x.getAttribute("stop-color")) : [] }; })()`);
    if (how === "geometry") return out;
    await s.wait(3000);
    out.waited = await snap();
    const t0 = Date.now();
    if (how === "enter") await s.key("Enter", "Enter", 13, "\r");
    else await s.click('[data-control="start"]');
    await s.until("!document.querySelector('[data-zone=\"start\"]')", 4000);
    await s.until(`${BUBBLE}.length > 0`, 2500);
    out.lineMs = Date.now() - t0;
    out.after = await snap();
    if (backToStart && how === "click" && out.after && !out.after.zone) {
      /* play one question first, so "nothing played" means something; then the reset key, then Start again */
      if (await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 30000)) {
        if (await s.ev("window.toolApi.getState().stage === 'demo'")) { await s.ev("window.__tool.solve()"); await s.until("window.toolApi.getState().stage === 'ask'", 15000); }
        await s.ev("window.__tool.solve()");
        await s.until("(window.toolApi.getState().played || []).length > 0", 4000);
      }
      out.playedBefore = (await snap()).played;
      await s.click('[data-control="restart"]');
      await s.until("!!document.querySelector('[data-zone=\"start\"]')", 4000);
      await s.wait(600);
      out.back = await snap();
      await s.wait(2500);
      out.backWaited = await snap();
      await s.click('[data-control="start"]');
      await s.until("!document.querySelector('[data-zone=\"start\"]')", 4000);
      await s.until(`${BUBBLE}.length > 0`, 2500);
      out.again = await snap();
    }
    out.logs = s.logs.slice(0, 3);
    return out;
  }, { label: `start-page ${how}`, timeout: backToStart && how === "click" ? 110000 : 60000 });
}

/* `first`: the tool's first line as the bubble prints it (its first piece), computed by check.mjs from the tool's data;
   `backToStart`: the runtime has the reset key that goes back to the start page (r32): the click row must show it;
   `silent`: the runtime's lesson is silent (r30+): speech after Start is a fault. A voiced runtime that has a start
   page (r28, r29) speaks its first line once Start is pressed, so only speech BEFORE Start is judged there. */
export function judgeStart(rows, first = "", { backToStart = false, silent = true, defaultTheme = false } = {}) {
  const b = [];
  const hsl = (hex) => { const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "")); if (!m) return null; const n = parseInt(m[1], 16), R = (n >> 16) / 255, G = ((n >> 8) & 255) / 255, B = (n & 255) / 255,
    mx = Math.max(R, G, B), mn = Math.min(R, G, B), l = (mx + mn) / 2, d = mx - mn, s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1)); let h = 0;
    if (d) { h = mx === R ? ((G - B) / d) % 6 : mx === G ? (B - R) / d + 2 : (R - G) / d + 4; h = (h * 60 + 360) % 360; } return { h, s, l }; };
  const box = (t) => t.ink || t.box;
  const over = (A, B) => Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x) > 2 && Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y) > 2;
  const norm = (x) => String(x || "").replace(/\s+/g, " ").trim();
  for (const r of rows) {
    const g = r.geometry, tag = `${r.how}${r.lang ? " " + r.lang : ""}`;
    if (!r.before.zone || !r.before.key) b.push(`${tag}: the tool did not open on a start page with a Start key`);
    if (r.before.header || r.before.work || r.before.bubbleZone) b.push(`${tag}: the tool's own header, bubble or working area is drawn behind the start page`);
    if (r.before.bubble) b.push(`${tag}: a line is on the bubble before Start ("${r.before.bubble.slice(0, 40)}")`);
    if (r.before.stage !== "teach") b.push(`${tag}: stage "${r.before.stage}" before Start (the lesson has begun behind the page)`);
    if (r.before.spoke) b.push(`${tag}: speechSynthesis was called before Start (the lesson is silent)`);
    if (g) {
      const inZone = g.texts.filter((t) => t.zone === "start");
      inZone.filter((t) => t.size < 27.5).forEach((t) => b.push(`${tag}: "${t.text.slice(0, 20)}" at ${t.size}, below the 28 floor`));
      inZone.forEach((t) => { const x = box(t); if (x.x < 40 || x.x + x.w > 1560 || x.y < 40 || x.y + x.h > 860) b.push(`${tag}: "${t.text.slice(0, 20)}" leaves the start card`); });
      const whole = inZone.filter((t) => !t.part);
      for (let i = 0; i < whole.length; i++) for (let k = i + 1; k < whole.length; k++) if (over(box(whole[i]), box(whole[k]))) b.push(`${tag}: "${whole[i].text.slice(0, 16)}" overlaps "${whole[k].text.slice(0, 16)}"`);
      const key = g.controls.find((c) => c.id === "start");
      if (!key || key.box.w < 71 || key.box.h < 71 || key.role !== "button" || key.tab !== "0" || !key.label) b.push(`${tag}: the Start key is not a labelled, focusable 72 x 72 button`);
      g.images.filter((im) => im.role !== "mascot" && im.role !== "skin").forEach((im) => b.push(`${tag}: a picture on the start page that is neither the mascot nor a skin`));
    }
    /* a runtime with DEFAULT_THEME (class 4 r23, class 5 r55): every start page wears a theme's Enter colours, so no Start key is the
       chrome's grey; the faces are saturated (at least 0.35) and never red (the owner, 2026-10-13: "all start pages should look alike") */
    if (defaultTheme && r.how === "click") {
      const sk = r.startKey;
      if (!sk || sk.grad !== "gTenter") b.push(`${tag}: the Start key is painted ${sk ? JSON.stringify(sk.fill) : "nowhere"}, not with the theme's Enter colours (url(#gTenter)): it must wear the tool's theme or the runtime's DEFAULT_THEME, never the chrome's grey accent`);
      else (sk.stops || []).forEach((c) => {
        const x = hsl(c);
        if (!x || x.s < 0.35) b.push(`${tag}: the Start key's colour ${c} is grey or pale (saturation ${x ? x.s.toFixed(2) : "?"}, want at least 0.35)`);
        else if ((x.h >= 345 || x.h <= 15) && x.s > 0.5 && x.l >= 0.25 && x.l <= 0.75) b.push(`${tag}: the Start key's colour ${c} reads as red (no red on the page: a red key reads as an error)`);
      });
    }
    if (r.how !== "geometry") {
      const w = r.waited || {};
      if (!w.zone || w.header || w.bubble || w.stage !== "teach") b.push(`${tag}: after a 3 s wait the start page had gone or the lesson had begun behind it (stage "${w.stage}", line "${String(w.bubble || "").slice(0, 30)}")`);
      if (w.spoke) b.push(`${tag}: speechSynthesis was called while the start page waited`);
      if (!r.after || r.after.zone) b.push(`${tag}: ${r.how === "enter" ? "Enter" : "a tap"} on Start did not take the page away`);
      else if (!r.after.header) b.push(`${tag}: after Start the tool's header did not appear`);
      if (r.after && !r.after.zone) {
        const shown = norm(r.after.bubble), want = norm(first);
        if (!shown) b.push(`${tag}: after Start no line came onto the bubble within 2 s`);
        else if (r.lineMs > 2000 + 600) b.push(`${tag}: the first line took ${r.lineMs} ms to come onto the bubble (want within 2 s)`);
        else if (want && !(shown === want || (shown.length >= 24 && want.startsWith(shown + " ")))) b.push(`${tag}: after Start the bubble shows "${shown.slice(0, 40)}", want the first line "${want.slice(0, 40)}"`);
        if (silent && r.after.spoke) b.push(`${tag}: speechSynthesis was called after Start (the lesson is silent)`);
      }
    }
    if (backToStart && r.how === "click" && r.after && !r.after.zone) {
      const k = r.back, w = r.backWaited, g = r.again;
      if (!k) b.push(`${tag}: the reset key was never tried after Start`);
      else {
        if (!r.playedBefore) b.push(`${tag}: no question was played before the reset key, so a clean slate proves little`);
        if (k.startPage !== true || !k.zone) b.push(`${tag}: the reset key did not bring the start page back (startPage ${JSON.stringify(k.startPage)})`);
        else {
          if (k.header || k.work || k.bubbleZone) b.push(`${tag}: back on the start page, the tool's header, bubble or working area is still drawn`);
          if (k.bubble) b.push(`${tag}: back on the start page, a line is on the bubble ("${k.bubble.slice(0, 40)}")`);
          if (k.stage !== "teach") b.push(`${tag}: back on the start page the stage is "${k.stage}", want "teach" (the lesson waits for Start)`);
          if (k.phase !== 1 || k.played !== 0 || k.complete) b.push(`${tag}: back on the start page the slate is not clean (phase ${k.phase}, ${k.played} phase(s) played, complete ${k.complete})`);
          if (w && (!w.zone || w.stage !== "teach" || w.bubble)) b.push(`${tag}: back on the start page, the lesson began again by itself`);
          if (silent && (k.spoke || (w && w.spoke))) b.push(`${tag}: speechSynthesis was called on the start page`);
        }
        if (r.after.restartLabel !== "Back to the start") b.push(`${tag}: the reset key is labelled ${JSON.stringify(r.after.restartLabel)}, want "Back to the start"`);
        if (!g || g.zone) b.push(`${tag}: Start did not take the page away a second time`);
        else {
          const shown = norm(g.bubble), want = norm(first);
          if (!g.header) b.push(`${tag}: after Start again the tool's header did not appear`);
          if (!shown) b.push(`${tag}: after Start again no line came onto the bubble`);
          else if (want && !(shown === want || (shown.length >= 24 && want.startsWith(shown + " ")))) b.push(`${tag}: after Start again the bubble shows "${shown.slice(0, 40)}", want the first line "${want.slice(0, 40)}"`);
        }
      }
    }
    (r.logs || []).forEach((l) => b.push(`${tag}: console: ${l.slice(0, 120)}`));
  }
  return b;
}

/* GUIDE STEPS by a REAL click (the owner, 2026-10-08: "one click of one control" completes a step): on each steps phase,
   the first step's control, found as [data-control="<the step's on>"] (a Cut, Lots or Trade key named after its act),
   is clicked once with a real mouse; the step must move on at once (guideStep + 1, or the question opens after the last
   step). A step whose act is a piece of the picture has no control of that name: it is skipped, with a note. */
async function stepClickRun(url, n) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { n, error: "the tool did not mount" };
    if (!(await s.until("window.toolApi.getState().stage === 'demo' && !!window.toolApi.getState().guideOn", 20000))) return { n, none: true };
    await s.wait(400);
    const st = () => s.ev("(() => { const g = window.toolApi.getState(); return { step: g.guideStep, steps: g.guideSteps, on: g.guideOn, stage: g.stage, hint: g.hint, hintKind: g.hintKind }; })()");
    const before = await st();
    const sel = `[data-control=${JSON.stringify(before.on)}]`;
    const found = await s.ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 4 && r.height > 4 && e.getAttribute("aria-disabled") !== "true"; })()`);
    if (!found) return { n, on: before.on, found: false };
    await s.click(sel);
    await s.until(`(() => { const g = window.toolApi.getState(); return g.guideStep !== ${before.step} || g.stage !== "demo"; })()`, 4000);
    await s.wait(300);
    const after = await st();
    return { n, on: before.on, found: true, before, after, logs: s.logs.slice(0, 3) };
  }, { label: `step click ${n}`, timeout: 60000 });
}

/* rows: [{ n, on, found, before, after } | { n, none } | { n, error }] -> { bad, notes } */
export function judgeStepClicks(rows) {
  const bad = [], notes = [];
  for (const r of rows) {
    if (r.error) { bad.push(`phase ${r.n}: ${r.error}`); continue; }
    if (r.none) { bad.push(`phase ${r.n}: the phase never waited on a guide step`); continue; }
    if (!r.found) { notes.push(`phase ${r.n}: no control named "${r.on}" to click (its act is on the picture)`); continue; }
    const b = r.before, a = r.after || {};
    const last = b.step + 1 >= b.steps;
    const movedOn = last ? a.stage !== "demo" || a.step === b.step + 1 : a.step === b.step + 1 && a.stage === "demo";
    if (!movedOn) bad.push(`phase ${r.n}: one real click on "${r.on}" did not move step ${b.step + 1} on (guideStep ${b.step} -> ${a.step}, stage ${a.stage}): a step completes on ONE click`);
    if (a.hint && a.hintKind !== "type") bad.push(`phase ${r.n}: after the right click a hint is up (${String(a.hint).slice(0, 40)})`);
    (r.logs || []).forEach((l) => bad.push(`phase ${r.n}: console on the click: ${l.slice(0, 120)}`));
  }
  return { bad, notes };
}

export async function stepClickInput({ base, phases, poolSize = 2 }) {
  const res = await pool(phases.map((n) => () => stepClickRun(`${base}?phase=${n}&muted=1&probe=1`, n)), poolSize);
  const rows = res.map((r, k) => (r.ok ? r.value : { n: phases[k], error: r.error && r.error.message }));
  return { rows, ...judgeStepClicks(rows) };
}

/* GUIDE STEPS, A REAL WRONG ACT (runtime r41: an act that does nothing in a guide step shows the step's hint; r42: the
   working area's floor, a transparent rect data-role="work-floor", makes the empty board around Work's drawing inert too).
   One phase that has steps, one session per kind of wrong act, so one hint never hides the next: how = "click", a real
   mouse click on an INERT point of Work's drawing (an element under data-zone work with no [data-control] ancestor or
   only a disabled one, not the floor, not inside a nested zone such as the running count); how = "floor", a real click on
   the EMPTY BOARD (a point whose element is the work-floor rect); how = "key", a real digit key. For every step: the
   wrong act, then 300 ms later the hint, the instruction and the step; then the awaited act (a real click on
   [data-control="<on>"] when there is one, else toolApi.check()) must still move the step on. */
const INERT = `(() => { const z = document.querySelector('[data-zone="work"]'); if (!z) return null; const r = z.getBoundingClientRect();
  const floor = (el) => !!el && el.getAttribute && el.getAttribute("data-role") === "work-floor";
  const ok = (el) => { if (!el || !z.contains(el) || floor(el) || el.closest("[data-zone]") !== z) return false; const c = el.closest("[data-control]"); return !c || c.getAttribute("aria-disabled") === "true"; };
  let grid = 0, board = 0;
  for (let gy = 0.08; gy < 0.96; gy += 0.07) for (let gx = 0.04; gx < 0.97; gx += 0.05) {
    const x = r.left + r.width * gx, y = r.top + r.height * gy, el = document.elementFromPoint(x, y);
    grid++; if (!el || !z.contains(el) || floor(el)) board++;
    if (ok(el)) return { x: Math.round(x), y: Math.round(y), tag: el.tagName };
  }
  /* none: every point of Work's drawing is a live control; "board" counts the grid points on the empty board */
  return { none: true, grid, board }; })()`;
/* the empty board: a grid point of the working area whose element is the floor rect; none: { floor } says whether the
   floor is drawn at all (a whole box drawn over leaves no empty board, which is no fault) */
const FLOOR = `(() => { const z = document.querySelector('[data-zone="work"]'); if (!z) return null; const r = z.getBoundingClientRect();
  const fl = z.querySelector('[data-role="work-floor"]');
  for (let gy = 0.06; gy < 0.97; gy += 0.06) for (let gx = 0.03; gx < 0.98; gx += 0.04) {
    const x = r.left + r.width * gx, y = r.top + r.height * gy, el = document.elementFromPoint(x, y);
    if (el && el === fl) return { x: Math.round(x), y: Math.round(y), tag: el.tagName };
  }
  return { none: true, floor: !!fl }; })()`;
const ROLE = (role) => `(() => { const g = document.querySelector('[data-zone="bubble"] [data-role="${role}"]'); return g ? Array.from(g.querySelectorAll("text")).map((x) => x.textContent).join(" ") : ""; })()`;
async function realWrongRun(url, n, how) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { n, how, error: "the tool did not mount" };
    if (!(await s.until("window.toolApi.getState().stage === 'demo' && !!window.toolApi.getState().guideOn", 25000))) return { n, how, none: true };
    const state = () => s.ev("(() => { const g = window.toolApi.getState(); return { stage: g.stage, step: g.guideStep, steps: g.guideSteps, on: g.guideOn, hint: g.hint, instruction: g.instruction }; })()");
    const steps = [];
    for (let k = 0; k < 12; k++) {
      const b = await state();
      if (b.stage !== "demo" || !b.on) break;
      await s.wait(500);   /* past the runtime's 400 ms window after the last reported act */
      const rec = { k: b.step, on: b.on, before: b };
      if (how === "click" || how === "floor") {
        rec.point = await s.ev(how === "floor" ? FLOOR : INERT);
        if (rec.point && !rec.point.none) {
          const { x, y } = rec.point;
          await s.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y, button: "none", buttons: 0 });
          await s.send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", buttons: 1, clickCount: 1 });
          await s.wait(40);
          await s.send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", buttons: 0, clickCount: 1 });
        }
      } else await s.key("7", "Digit7", 55, "7");
      await s.wait(300);
      rec.after = await state(); rec.domHint = await s.ev(ROLE("hint")); rec.domInstr = await s.ev(ROLE("instruction"));
      const sel = `[data-control=${JSON.stringify(b.on)}]`;
      const live = await s.ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 4 && r.height > 4 && e.getAttribute("aria-disabled") !== "true"; })()`);
      if (live) { await s.click(sel); rec.advancedBy = "click"; } else { await s.ev("window.toolApi.check()"); rec.advancedBy = "toolApi.check()"; }
      await s.until(`(() => { const g = window.toolApi.getState(); return g.guideStep !== ${b.step} || g.stage !== "demo"; })()`, 6000);
      rec.next = await state();
      steps.push(rec);
    }
    return { n, how, steps, logs: s.logs.slice(0, 3) };
  }, { label: `real wrong ${how} ${n}`, timeout: 150000 });
}

export async function realWrongInput({ base, phases, poolSize = 2, floor = false }) {
  const hows = floor ? ["click", "floor", "key"] : ["click", "key"];
  const plan = phases.flatMap((n) => hows.map((how) => ({ n, how })));
  const res = await pool(plan.map(({ n, how }) => () => realWrongRun(`${base}?phase=${n}&muted=1&probe=1`, n, how)), poolSize);
  return res.map((r, k) => (r.ok ? r.value : { ...plan[k], error: r.error && r.error.message }));
}

/* THE BUBBLE'S LINES WITH A HINT, by their INK (runtime r41: Hindi and Gujarati lines need a taller pitch): text boxes
   overlap even where the ink is clear (a font box is taller than the pitch), so each frame is a screenshot and the rows
   between two consecutive lines are read pixel by pixel. For a language: every phase, a wrong answer at its second
   question, and a wrong act (__tool.did) at its first guide step when it has one. Returns per frame the lines (baseline,
   size, x-extent in stage units), the hint band's colour, the screen transform and the PNG's path; measureHintFrame()
   then reads the pixels. */
async function hintFramesRun(url, lang, N, outDir) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { lang, error: "the tool did not mount" };
    await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 25000);
    const LINES = `(() => { const svg = document.querySelector("svg.c4"), m = svg.getScreenCTM(), inv = m.inverse();
      const st = (x, y) => { const p = svg.createSVGPoint(); p.x = x; p.y = y; return p.matrixTransform(inv); };
      const lines = ["instruction", "hint"].flatMap((role) => Array.from(document.querySelectorAll('[data-zone="bubble"] [data-role="' + role + '"] text')).map((t) => {
        const r = t.getBoundingClientRect(), a = st(r.left, r.top), b = st(r.right, r.bottom);
        return { role, text: t.textContent, y: +t.getAttribute("y"), size: +t.getAttribute("font-size"), x0: a.x, x1: b.x }; }));
      const g = document.querySelector('[data-zone="bubble"] [data-role="hint"]');
      const rs = g ? Array.from(g.querySelectorAll("rect")) : [];
      const bd = rs.find((r) => Number(r.getAttribute("width")) > 6), br = rs.find((r) => Number(r.getAttribute("width")) <= 6);
      return { lines, alone: !g && !!window.toolApi.getState().hint, band: bd ? getComputedStyle(bd).fill : null, bar: br ? getComputedStyle(br).fill : null, ctm: { a: m.a, d: m.d, e: m.e, f: m.f }, hint: window.toolApi.getState().hint }; })()`;
    const frames = [];
    /* the step index of each phase's first question, from getState() (a phase need not have three questions) */
    const starts = [];
    for (let k = 1, st = 0; k <= N; k++) { starts.push(st); await s.ev(`window.toolApi.gotoStep(${st})`); await s.wait(150); st += Number(await s.ev("window.toolApi.getState().items")) || 3; }
    for (let k = 1; k <= N; k++) {
      /* the phase's start (its first guide step, when it has steps), then its second question (straight to it) */
      await s.ev(`window.toolApi.gotoStep(${starts[k - 1]})`);
      if (!(await s.until(`window.toolApi.getState().phase === ${k} && ['ask', 'demo', 'teach'].includes(window.toolApi.getState().stage)`, 8000))) { frames.push({ phase: k, kind: "phase start", missed: true }); continue; }
      await s.wait(400);
      if (await s.ev("window.toolApi.getState().stage === 'demo' && !!window.toolApi.getState().guideOn")) {
        await s.ev("window.__tool.did('__not_this_step__')"); await s.wait(400);
        const f = await s.ev(LINES); f.png = `${outDir}/hintframe-${lang}-${k}-step.png`; await s.shot(f.png);
        frames.push({ phase: k, kind: "wrong step", ...f });
      }
      await s.ev(`window.toolApi.gotoStep(${starts[k - 1] + 1})`);
      if (!(await s.until(`window.toolApi.getState().phase === ${k} && window.toolApi.getState().stage === 'ask'`, 8000))) { frames.push({ phase: k, kind: "wrong answer", missed: true }); continue; }
      await s.wait(400);
      await s.ev("window.__tool.nearMiss(); window.__tool.submit()"); await s.wait(500);
      const f = await s.ev(LINES); f.png = `${outDir}/hintframe-${lang}-${k}-miss.png`; await s.shot(f.png);
      frames.push({ phase: k, kind: "wrong answer", ...f });
    }
    return { lang, frames };
  }, { label: `hint frames ${lang}`, timeout: 150000 });
}

/* the ink of one frame: for each pair of consecutive lines (by baseline), the longest run of ink-free pixel rows between
   them (in stage units), over both lines' x-extent; and the block's ink top and bottom inside the bubble's outline. A
   pixel is ink when it is far (> 80) from the bubble's white, the hint band's colour and the band's bar (so the band's
   own edge is not ink). The outline is the run of rows at the bubble's top and bottom edges that are ink nearly all the
   way across (>= 97%: a line of text has gaps between its words); topGap and bottomGap are the clear rows between the
   outline and the text, block the text's ink height, all in stage units. */
export function measureHintFrame(fr, img, bubble = { x: 254, y: 748, w: 656, h: 144 }) {
  const parse = (c) => { const m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(String(c || "")); return m ? [+m[1], +m[2], +m[3]] : null; };
  const bgs = [[255, 255, 255], parse(fr.band), parse(fr.bar)].filter(Boolean);
  const ink = (c) => bgs.every((b) => Math.hypot(c[0] - b[0], c[1] - b[1], c[2] - b[2]) > 80);
  const X = (sx) => Math.round(fr.ctm.a * sx + fr.ctm.e), Y = (sy) => Math.round(fr.ctm.d * sy + fr.ctm.f);
  const rowHasInk = (py, px0, px1) => { for (let px = Math.max(0, px0); px <= Math.min(img.w - 1, px1); px++) if (ink(img.at(px, py))) return true; return false; };
  const lines = [...(fr.lines || [])].sort((a, b) => a.y - b.y);
  const pairs = [];
  for (let i = 0; i + 1 < lines.length; i++) {
    const a = lines[i], b = lines[i + 1];
    const px0 = X(Math.min(a.x0, b.x0)), px1 = X(Math.max(a.x1, b.x1));
    let run = 0, best = 0;
    for (let py = Y(a.y - 0.25 * a.size); py <= Y(b.y); py++) { if (rowHasInk(py, px0, px1)) run = 0; else { run++; best = Math.max(best, run); } }
    pairs.push({ a: a.text.slice(0, 24), b: b.text.slice(0, 24), clear: +(best / Math.abs(fr.ctm.d || 1)).toFixed(1) });
  }
  const d = Math.abs(fr.ctm.d || 1), u = (px) => +(px / d).toFixed(1);
  const tx0 = Math.max(X(bubble.x + 6), X(Math.min(...lines.map((l) => l.x0))) - 2), tx1 = Math.min(X(bubble.x + bubble.w - 6), X(Math.max(...lines.map((l) => l.x1))) + 2);
  /* the OUTLINE is found by its distance from white alone: with no THEME the hint bar is the accent and the outline is
     shade(accent, 0.1), a few units apart, so `ink` (which ignores the bar's colour) never saw the outline and the block
     measured the bubble's own border (142 units in every frame, 2026-10-13, ch 8 board tools with no skin and no theme) */
  const edge = (c) => Math.hypot(255 - c[0], 255 - c[1], 255 - c[2]) > 80;
  const frac = (py) => { let n = 0; for (let px = tx0; px <= tx1; px++) if (edge(img.at(px, py))) n++; return n / Math.max(1, tx1 - tx0 + 1); };
  const by0 = Y(bubble.y), by1 = Y(bubble.y + bubble.h);
  let oTop = by0 - 1, oBot = by1 + 1, on = false;
  for (let py = Math.max(0, by0 - 4); py <= by0 + 8; py++) if (frac(py) >= 0.97) { oTop = py; on = true; } else if (on) break;
  on = false;
  for (let py = Math.min(img.h - 1, by1 + 4); py >= by1 - 8; py--) if (frac(py) >= 0.97) { oBot = py; on = true; } else if (on) break;
  let top = null, bottom = null;
  if (lines.length) for (let py = oTop + 1; py < oBot; py++) if (rowHasInk(py, tx0, tx1)) { if (top === null) top = py; bottom = py; }
  const sy = (py) => (py === null ? null : +((py - fr.ctm.f) / (fr.ctm.d || 1)).toFixed(1));
  return { phase: fr.phase, kind: fr.kind, lang: fr.lang, alone: !!fr.alone, pairs, top: sy(top), bottom: sy(bottom), lines: lines.length,
    topGap: top === null ? null : u(top - oTop - 1), bottomGap: bottom === null ? null : u(oBot - bottom - 1), block: top === null ? null : u(bottom - top + 1) };
}

export async function hintFramesInput({ base, N, outDir, langs = ["en", "hi", "gu"], poolSize = 2 }) {
  const res = await pool(langs.map((l) => () => hintFramesRun(`${base}?phase=1&muted=1&probe=1${l === "en" ? "" : "&lang=" + l}`, l, N, outDir)), poolSize);
  const out = [];
  for (const [k, r] of res.entries()) {
    if (!r.ok || r.value.error) { out.push({ lang: langs[k], error: (r.ok ? r.value.error : r.error && r.error.message) || "no result" }); continue; }
    for (const f of r.value.frames) {
      if (f.missed) { out.push({ lang: langs[k], phase: f.phase, kind: f.kind, missed: true }); continue; }
      if (!f.lines || !f.lines.length || !fs.existsSync(f.png)) { out.push({ lang: langs[k], phase: f.phase, kind: f.kind, noHint: true }); continue; }
      out.push(measureHintFrame({ ...f, lang: langs[k] }, decodePng(fs.readFileSync(f.png))));
    }
  }
  return out;
}

/* the party ends at once when a phase dot is pressed while it is on show (r41: enterPhase ends the confetti) */
async function partyDotRun(url) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 25000);
    const g0 = await s.ev("(() => { const a = window.toolApi.getState(); return { step: a.step, item: a.item, items: a.items, phases: a.phases }; })()");
    await s.ev(`window.toolApi.gotoStep(${g0.step - (g0.item - 1) + (g0.items - 1)})`);
    await s.until("window.toolApi.getState().stage === 'ask'", 8000);
    await s.wait(300);
    await s.ev("window.__tool.solve()");
    const seen = await s.until(`!!document.querySelector('[data-zone="party"]')`, 5000);
    if (!seen) return { seen: false };
    const dot = '[data-control="phase-2"]';
    const has = await s.ev(`!!document.querySelector(${JSON.stringify(dot)})`);
    if (!has) return { seen: true, noDot: true };
    await s.click(dot);
    await s.wait(300);
    return { seen: true, after: await s.ev(`(() => ({ zone: !!document.querySelector('[data-zone="party"]'), party: !!window.toolApi.getState().party, phase: window.toolApi.getState().phase }))()`) };
  }, { label: "party dot", timeout: 60000, reducedMotion: false });
}
export async function partyDotInput({ base }) {
  const r = await pool([() => partyDotRun(`${base}?phase=1&muted=1&probe=1`)], 1);
  return r[0].ok ? r[0].value : { error: r[0].error && r[0].error.message };
}

/* THE PHASE PARTY (runtime r40: it starts AT the right answer of a phase's last question), with motion ON (the party is   skipped under reduced motion, which every other run forces). One user-mode mount from phase 1 walks through EVERY
   phase: each phase's third question is answered right (straight to it with gotoStep; the clock starts at the answer),
   then the page is sampled every 60 ms: how soon after the right answer the party (data-zone "party") appears and in
   which stage, when it goes, getState().party, its pointer-events, the union of its boxes in stage units, every stage
   the lesson passes through until the next phase's teach (never "free"), and how long after the party appeared the next
   phase began (the walk waits for the party). Nothing here waits for the phase end or the summary first. */
async function partyRun(url) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    const st = () => s.ev("(() => { const g = window.toolApi.getState(); return { stage: g.stage, phase: g.phase, phases: g.phases, item: g.item, items: g.items, step: g.step, party: g.party }; })()"); let quick = null;   /* r54: the small cheer after phase 1's first right answer */
    const PB = `(() => { const z = document.querySelector('[data-zone="party"]'); const g = window.toolApi.getState(); const m = document.querySelector('image[data-role="mascot"]'); const o = { stage: g.stage, phase: g.phase, party: !!g.party, pose: m ? (m.getAttribute("data-pose") || "") : null };
      if (!z) return o; const svg = document.querySelector("svg.c4"); const inv = svg.getScreenCTM().inverse(), r = z.getBoundingClientRect(), a = svg.createSVGPoint(), b = svg.createSVGPoint();
      a.x = r.left; a.y = r.top; b.x = r.right; b.y = r.bottom; const A = a.matrixTransform(inv), B = b.matrixTransform(inv);
      const pop = Array.from(z.children).filter((c) => c.firstElementChild && c.firstElementChild.tagName === "polygon").map((c) => { const q = c.getBoundingClientRect(), p = svg.createSVGPoint(), p2 = svg.createSVGPoint(); p.x = q.left; p.y = q.top; p2.x = q.right; p2.y = q.bottom; const P = p.matrixTransform(inv), P2 = p2.matrixTransform(inv); return { x: Math.round(P.x), y: Math.round(P.y), w: Math.round(P2.x - P.x), h: Math.round(P2.y - P.y) }; });
      return { ...o, zone: true, x: A.x, y: A.y, x2: B.x, y2: B.y, pe: z.getAttribute("pointer-events"), pop }; })()`;
    const phases = [];
    await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 25000);
    const N = (await st()).phases;
    for (let guard = 0; guard < N; guard++) {
      await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 25000);
      const g0 = await st(), p0 = g0.phase, last = p0 === N;
      /* r54: the SMALL cheer: phase 1's right answer before the last question puts the mascot in its cheering pose for about 0.9 s */
      if (p0 === 1 && g0.items > 1) {
        await s.ev(`window.toolApi.gotoStep(${g0.step - (g0.item - 1) + (g0.items - 2)})`);
        await s.until("window.toolApi.getState().stage === 'ask'", 8000);
        await s.wait(300);
        const q0 = Date.now();
        await s.ev("window.__tool.solve()");
        let qs = null, qb = null;
        while (Date.now() - q0 < 6000) {
          const pz = await s.ev(`(() => { const m = document.querySelector('image[data-role="mascot"]'); return m ? (m.getAttribute("data-pose") || "") : null; })()`);
          if (pz === "cheer" && qs === null) qs = Date.now() - q0;
          if (qs !== null && pz !== "cheer") { qb = Date.now() - q0; break; }
          await s.wait(50);
        }
        quick = { seenMs: qs, backMs: qb };
        await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 15000);
      }
      await s.ev(`window.toolApi.gotoStep(${g0.step - (g0.item - 1) + (g0.items - 1)})`);
      await s.until("window.toolApi.getState().stage === 'ask'", 8000);
      await s.wait(300);
      const t0 = Date.now(), stages = [];
      await s.ev("window.__tool.solve()");
      let seenAt = null, goneAt = null, nextAt = null, box = null, pe = null, stateParty = false, seenStage = null, poppers = null, cheerAt = null, poseEnd = null;
      while (Date.now() - t0 < 25000) {
        const b = await s.ev(PB);
        const tag = b.stage + "@" + b.phase;
        if (stages[stages.length - 1] !== tag) stages.push(tag);
        if (b.zone) {
          if (seenAt === null) { seenAt = Date.now(); pe = b.pe; seenStage = b.stage; poppers = b.pop || null; }
          stateParty = stateParty || b.party; if (b.pose === "cheer" && cheerAt === null) cheerAt = Date.now();
          box = box ? { x: Math.min(box.x, b.x), y: Math.min(box.y, b.y), x2: Math.max(box.x2, b.x2), y2: Math.max(box.y2, b.y2) } : { x: b.x, y: b.y, x2: b.x2, y2: b.y2 };
        } else if (seenAt !== null && goneAt === null) { goneAt = Date.now(); poseEnd = b.pose; }
        if (!last && b.phase !== p0 && nextAt === null) nextAt = Date.now();
        if ((last ? goneAt !== null : nextAt !== null && (goneAt !== null || b.zone !== true))) break;
        await s.wait(60);
      }
      phases.push({ phase: p0, last, seenMs: seenAt === null ? null : seenAt - t0, lifeMs: seenAt !== null && goneAt !== null ? goneAt - seenAt : null,
        nextAfterPartyMs: seenAt !== null && nextAt !== null ? nextAt - seenAt : null, stages, seenStage, stateParty, pointerEvents: pe, poppers, cheerMs: seenAt !== null && cheerAt !== null ? cheerAt - seenAt : null, poseEnd,
        box: box && { x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.x2 - box.x), h: Math.round(box.y2 - box.y) } });
      if (last) break;
      await s.until(`window.toolApi.getState().phase !== ${p0}`, 15000);
    }
    return { phases, quick, logs: s.logs.slice(0, 3) };
  }, { label: "party", timeout: 240000, reducedMotion: false });
}

export async function partyInput({ base }) {
  const r = await pool([() => partyRun(`${base}?phase=1&muted=1&probe=1`)], 1);
  return r[0].ok ? r[0].value : { error: r[0].error && r[0].error.message };
}

/* THE NEXT KEY (runtime r48, a tool with `nextKey: true`): nothing moves on by itself. ?nextkey=1 puts the key on a scripted
   run (every other run keeps the timers); motion ON, one user-mode mount. `last` false: phase 1 from its first question
   (question 1 sent on by a real mouse click on the key, question 2 by toolApi.next(), the phase's last by the Enter key);
   `last` true: the final phase, straight to its last question (a click on the key opens the summary). For each question: the
   right answer, then how soon the key (data-control next-key, getState().nextKey) shows, that NOTHING moves for 4.5 s after it,
   its box and label, and what pressing it does. */
async function nextKeyRun(url, { last = false } = {}) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    const st = () => s.ev("(() => { const g = window.toolApi.getState(); return { stage: g.stage, phase: g.phase, phases: g.phases, item: g.item, items: g.items, step: g.step, nextKey: g.nextKey === undefined ? undefined : g.nextKey, finished: (window.__events || []).length }; })()");
    const KEY = `(() => { const e = document.querySelector('[data-control="next-key"]'); if (!e) return null; const svg = document.querySelector("svg.c4"); const inv = svg.getScreenCTM().inverse(), r = e.getBoundingClientRect(), a = svg.createSVGPoint(), b = svg.createSVGPoint();
      a.x = r.left; a.y = r.top; b.x = r.right; b.y = r.bottom; const A = a.matrixTransform(inv), B = b.matrixTransform(inv);
      return { x: Math.round(A.x), y: Math.round(A.y), w: Math.round(B.x - A.x), h: Math.round(B.y - A.y), disabled: e.getAttribute("aria-disabled") === "true", label: e.getAttribute("aria-label"), text: (e.textContent || "").trim() }; })()`;
    await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 25000);
    const g0 = await st();
    if (g0.nextKey === undefined) return { error: "getState() has no nextKey: the Next key is not on in this run (the runtime lacks it, or the tool did not opt in)" };
    if (last) await s.ev(`window.toolApi.gotoStep(${g0.step - (g0.item - 1) + (g0.items - 1)})`);
    const qs = [];
    for (let k = last ? g0.items - 1 : 0; k < g0.items; k++) {
      if (await s.ev("window.toolApi.getState().stage === 'demo'")) await s.ev("window.__tool.solve()");   /* a guide step in front of the question */
      if (!(await s.until("window.toolApi.getState().stage === 'ask'", 20000))) { qs.push({ k, error: "the question did not open" }); break; }
      await s.wait(300);
      const before = await st(), t0 = Date.now(), lastQ = k === g0.items - 1;
      await s.ev("window.__tool.solve()");
      let shownAt = null, early = null, key = null;
      while (Date.now() - t0 < 20000) {
        const a = await st();
        if (a.item !== before.item || a.phase !== before.phase) { early = { item: a.item, phase: a.phase, ms: Date.now() - t0 }; break; }
        if (a.nextKey) { shownAt = Date.now(); key = await s.ev(KEY); break; }
        await s.wait(60);
      }
      const q = { k, lastQ, shownMs: shownAt === null ? null : shownAt - t0, early, key };
      qs.push(q);
      if (shownAt === null || early) break;
      q.stageAtKey = (await st()).stage;
      /* it BLINKS: the ring round the key is animated (motion on) and its stroke opacity swings over 1 s */
      q.blink = await s.ev(`(async () => { const r = document.querySelector('.c4-nextblink'); if (!r) return { ring: false };
        const name = getComputedStyle(r).animationName, v = [];
        for (let i = 0; i < 10; i++) { v.push(Number(getComputedStyle(r).strokeOpacity)); await new Promise((x) => setTimeout(x, 100)); }
        return { ring: true, name, min: Math.min(...v), max: Math.max(...v) }; })()`);
      await s.wait(3500);
      const a = await st();
      q.stayed = a.item === before.item && a.phase === before.phase && !!a.nextKey;
      q.stageAfterWait = a.stage; q.finishedBefore = a.finished;
      const t1 = Date.now();
      if (!lastQ) {
        q.how = k === 0 ? "click" : "next()";
        if (k === 0) await s.click('[data-control="next-key"]'); else await s.ev("window.toolApi.next()");
        q.moved = await s.until(`(() => { const g = window.toolApi.getState(); return g.item === ${before.item + 1} && g.stage === 'ask'; })()`, 6000);
      } else if (last) {
        q.how = "click";
        await s.click('[data-control="next-key"]');
        q.moved = await s.until("window.toolApi.getState().stage === 'summary'", 6000);
      } else {
        q.how = "Enter";
        await s.key("Enter", "Enter", 13, "\r");
        q.moved = await s.until(`window.toolApi.getState().phase !== ${before.phase}`, 10000);
      }
      q.pressMs = Date.now() - t1;
      await s.wait(300);
      q.gone = !(await s.ev(KEY)) && !(await st()).nextKey;
    }
    return { phase: g0.phase, phases: g0.phases, last, qs, logs: s.logs.slice(0, 3) };
  }, { label: `next key${last ? " (last phase)" : ""}`, timeout: 170000, reducedMotion: false });
}

/* a classroom's teacher skips a celebration (a tap on the bubble): the next question opens at once and the Next key the skipped
   celebration would have raised later must never appear in it (it used to, over the Yes / No keys) */
async function nextKeyRoomRun(url) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    const g = () => s.ev("(() => { const a = window.toolApi.getState(); return { stage: a.stage, item: a.item, nextKey: a.nextKey === undefined ? undefined : a.nextKey }; })()");
    await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 25000);
    if ((await g()).nextKey === undefined) return { error: "getState() has no nextKey in the classroom run" };
    if (await s.ev("window.toolApi.getState().stage === 'demo'")) await s.ev("window.__tool.solve()");
    if (!(await s.until("window.toolApi.getState().stage === 'ask'", 25000))) return { error: "the question did not open" };
    await s.wait(500);
    const before = await g();
    await s.ev("window.__tool.solve()");
    await s.wait(600);
    await s.click('[data-control="bubble"]');
    const moved = await s.until(`window.toolApi.getState().item === ${before.item + 1} && window.toolApi.getState().stage === 'ask'`, 4000);
    const at = await g();
    await s.wait(3800);
    return { room: { moved, at, later: await g() } };
  }, { label: "next key, classroom skip", timeout: 90000, reducedMotion: false });
}

export async function nextKeyInput({ base, N }) {
  const jobs = [() => nextKeyRun(`${base}?phase=1&muted=1&probe=1&nextkey=1`), () => nextKeyRoomRun(`${base}?phase=1&muted=1&probe=1&nextkey=1&classroom=1`)];
  if (N > 1) jobs.push(() => nextKeyRun(`${base}?phase=${N}&muted=1&probe=1&nextkey=1`, { last: true }));
  const res = await pool(jobs, 2);
  return res.map((r) => (r.ok ? r.value : { error: r.error && r.error.message }));
}

/* rows = nextKeyInput(); winOf(phase, question index) = the question's win animation in ms. English labels. Returns problems. */
export function judgeNextKey(rows, { winOf = () => 1600 } = {}) {
  const bad = [];
  for (const r of rows || []) {
    if (!r || r.error) { bad.push(`next-key run: ${r && r.error}`); continue; }
    if (r.room) {
      const m = r.room;
      if (!m.moved) bad.push("classroom: a tap on the bubble during the celebration did not bring the next question");
      else if (m.later.nextKey || m.later.item !== m.at.item) bad.push(`classroom: 4 s after the teacher's skip a Next key (${JSON.stringify(m.later.nextKey)}) is up in the question the skip opened: the skipped celebration's timer must stand down`);
      continue;
    }
    for (const q of r.qs) {
      const tag = `phase ${r.phase}, question ${q.k + 1}${q.lastQ ? " (the phase's last)" : ""}`;
      if (q.error) { bad.push(`${tag}: ${q.error}`); continue; }
      if (q.early) { bad.push(`${tag}: the lesson moved on by itself ${q.early.ms} ms after the right answer (to item ${q.early.item} of phase ${q.early.phase}) with no Next key pressed`); continue; }
      if (q.shownMs === null) { bad.push(`${tag}: no Next key (data-control next-key, getState().nextKey) within 20 s of the right answer`); continue; }
      const want = q.lastQ ? 2200 : Math.max(winOf(r.phase, q.k) - 900, 800);   /* r52: 0.5 s sooner than the winMs timer, less the 400 ms of slack */
      if (q.shownMs < want) bad.push(`${tag}: the Next key was on the page ${q.shownMs} ms after the right answer (want it after the celebration, 0.5 s before the question's winMs: ${want} ms or more)`);
      const wantLabel = q.lastQ ? (r.phase < r.phases ? "Next phase" : "Summary") : "Next";
      const k = q.key;
      if (!k) bad.push(`${tag}: getState().nextKey was set but no data-control next-key is drawn`);
      else {
        if (k.text !== wantLabel) bad.push(`${tag}: the key says "${k.text}" (want "${wantLabel}")`);
        if (k.disabled) bad.push(`${tag}: the Next key is disabled`);
        if (k.x < 0 || k.y < 0 || k.x + k.w > 1600 || k.y + k.h > 900) bad.push(`${tag}: the Next key leaves the stage (${JSON.stringify(k)})`);
        if (k.w < 72 || k.h < 72) bad.push(`${tag}: the Next key is ${k.w} x ${k.h}, under the 72 finger size`);
      }
      const bl = q.blink;
      if (!bl || !bl.ring) bad.push(`${tag}: the Next key does not blink (no ring round it, class c4-nextblink)`);
      else if (!bl.name || bl.name === "none" || bl.max - bl.min < 0.5) bad.push(`${tag}: the ring round the Next key does not blink (animation ${bl.name}, its stroke opacity stayed between ${bl.min} and ${bl.max} over 1 s)`);
      if (q.lastQ ? q.stageAtKey !== "idle" : q.stageAtKey !== "win") bad.push(`${tag}: the stage was "${q.stageAtKey}" when the key appeared (want ${q.lastQ ? '"idle", the closing line' : '"win"'})`);
      if (!q.stayed) bad.push(`${tag}: 4.5 s after the Next key appeared the lesson had moved on by itself, or the key was gone`);
      if (q.lastQ && r.phase === r.phases && q.finishedBefore) bad.push(`${tag}: finished was sent before the key was pressed`);
      if (!q.moved) bad.push(`${tag}: pressing the Next key (${q.how}) did not ${q.lastQ ? (r.phase === r.phases ? "open the summary" : "open the next phase") : "open the next question"} within ${q.lastQ ? "10" : "6"} s`);
      else if (q.pressMs > 1500 && !q.lastQ) bad.push(`${tag}: the next question took ${q.pressMs} ms after the Next key (${q.how})`);
      if (q.moved && !q.gone) bad.push(`${tag}: the Next key (or getState().nextKey) was still there after it was pressed`);
    }
  }
  return bad;
}

/* THE CARD ANSWER (runtime r49, a tool with `cardAnswer: true`): a real mouse and the real keyboard, motion ON, one mount. The
   steps are walked (gotoStep) until one question of each kind has been met: answered ON a card (getState().answerOn "card"), a
   choice question whose keys stand in the question bar ("choices") and, where the tool has one, a question that keeps the
   blinking Answer key ("key"). Each is measured at its opening; the card and the choice question are then answered for real
   (a click on the card, the digits and Enter; a click on the right choice). */
const CA_BOX = (sel) => `(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const svg = document.querySelector("svg.c4"); const inv = svg.getScreenCTM().inverse(), r = e.getBoundingClientRect(), a = svg.createSVGPoint(), b = svg.createSVGPoint();
  a.x = r.left; a.y = r.top; b.x = r.right; b.y = r.bottom; const A = a.matrixTransform(inv), B = b.matrixTransform(inv);
  return { x: Math.round(A.x), y: Math.round(A.y), w: Math.round(B.x - A.x), h: Math.round(B.y - A.y), disabled: e.getAttribute("aria-disabled") === "true", label: e.getAttribute("aria-label") }; })()`;
const CA_BLINK = `(async () => { const rs = Array.from(document.querySelectorAll('.c4-nextblink')); if (!rs.length) return { rings: 0 };
  const v = []; for (let i = 0; i < 10; i++) { v.push(Math.max(...rs.map((r) => Number(getComputedStyle(r).strokeOpacity)))); await new Promise((x) => setTimeout(x, 100)); }
  return { rings: rs.length, name: getComputedStyle(rs[0]).animationName, min: Math.min(...v), max: Math.max(...v) }; })()`;
/* the texts of the working area whose centre lies inside a control's box (what a card box shows) */
const CA_TXT = (sel) => `(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const r = e.getBoundingClientRect();
  return Array.from(document.querySelectorAll('[data-zone="work"] text')).filter((t) => { const q = t.getBoundingClientRect(), cx = (q.left + q.right) / 2, cy = (q.top + q.bottom) / 2; return cx > r.left && cx < r.right && cy > r.top && cy < r.bottom; })
    .map((t) => String(t.textContent).trim()).filter(Boolean); })()`;

async function cardAnswerRun(url) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { error: "the tool did not mount" };
    const g = () => s.ev(`(() => { const a = window.toolApi.getState(); return { stage: a.stage, item: a.item, answerOn: a.answerOn, hint: a.hint, hintKind: a.hintKind, panel: a.answerPanel, typed: a.typed, cardReady: a.cardReady }; })()`);
    const first = await g();
    if (first.answerOn === undefined) return { error: "getState() has no answerOn: the card answer is not on in this run (the runtime lacks it, or the tool did not opt in)" };
    const goAsk = async (t) => {
      await s.ev(`window.toolApi.gotoStep(${t})`);
      for (let k = 0; k < 40; k++) {
        const a = await g();
        if (a.stage === "ask") break;
        /* the stage is read AGAIN inside the same evaluation: a steps phase's hold can end between the read above and this call, and a
           solve() that finds the stage "ask" answers the question (ch 8, 2026-10-14: the walk then read the next answer and threw) */
        if (a.stage === "demo") await s.ev("window.toolApi.getState().stage === 'demo' && window.__tool.solve()");
        await s.wait(250);
      }
      await s.wait(700);
      return g();
    };
    const steps = await s.ev("window.toolApi.getState().steps");
    const found = {};
    for (let t = 0; t < steps && Object.keys(found).length < 4; t++) {
      const a = await goAsk(t);
      if (a.stage !== "ask" || !a.answerOn) continue;
      /* a card question whose picture still wants an act (shade the parts, Lots of, Trade) is a kind of its own: "gated". A card
         that is not ready only because the picture is busy for a moment (a cut still settling) wakes within a few seconds */
      if (a.answerOn === "card" && a.cardReady === false && !(await s.until("window.toolApi.getState().cardReady !== false", 3500))) { if (found.gated === undefined) found.gated = t; }
      else if (found[a.answerOn] === undefined) found[a.answerOn] = t;
    }
    const out = { found };
    if (found.card !== undefined) {
      const c = {};
      await goAsk(found.card);
      c.open = await g();
      c.bar = await s.ev(`document.querySelectorAll('[data-zone="ask"] [data-control]').length`);
      c.hit = await s.ev(CA_BOX('[data-control="answer-open"]'));
      c.blink = await s.ev(CA_BLINK);
      const asked = await s.ev("window.__tool.state().asked");
      c.asked = asked;
      await s.click('[data-control="answer-open"]');
      await s.wait(900);
      c.tapped = await g();
      c.slot = await s.ev(`!!document.querySelector('[data-zone="slot"]')`);
      c.close = await s.ev(CA_BOX('[data-control="answer-open"]'));
      c.p1 = await s.ev(CA_BOX('[data-control="part-1"]'));
      c.p2 = await s.ev(CA_BOX('[data-control="part-2"]'));
      c.ringsOpen = await s.ev(`document.querySelectorAll('.c4-nextblink').length`);
      /* a miss, then a retype: the correction runs (the keypad shuts and comes back with the caret in the first box), and the
         digit typed next must show IN the card (a 7 is never the answer here, and never what the correction shows) */
      await s.ev("window.__tool.nearMiss(); window.__tool.submit()");
      c.sawLock = await s.until("!!window.__tool.state().locked", 3000);
      if (c.sawLock) await s.until("!window.__tool.state().locked", 40000);
      await s.wait(900);
      c.back = await g();
      await s.key("7", "Digit7", 55, "7");
      await s.wait(400);
      c.retype = await s.ev(CA_TXT('[data-control="part-1"]'));
      await s.key("Escape", "Escape", 27);
      await s.wait(300);
      const parts = Array.isArray(asked) ? asked.map(String) : [];
      c.typedBoxes = [];
      for (let j = 0; j < parts.length; j++) {
        for (const ch of parts[j]) await s.key(ch, "Digit" + ch, 48 + Number(ch), ch);
        await s.wait(250);
        c.typedBoxes.push(await s.ev(CA_TXT(`[data-control="part-${j + 1}"]`)));
        await s.key("Enter", "Enter", 13, "\r");
        await s.wait(250);
      }
      c.won = await s.until("window.toolApi.getState().stage === 'win'", 6000);
      out.card = c;
    }
    if (found.gated !== undefined) {
      const c = {};
      await goAsk(found.gated);
      c.open = await g();
      c.stillWaiting = c.open.cardReady === false;
      c.hit = await s.ev(CA_BOX('[data-control="answer-open"]'));
      c.rings = await s.ev(`document.querySelectorAll('.c4-nextblink').length`);
      await s.key("5", "Digit5", 53, "5");
      await s.wait(400);
      c.afterDigit = await g();
      out.gated = c;
    }
    if (found.choices !== undefined) {
      const c = {};
      await goAsk(found.choices);
      c.open = await g();
      c.keys = await s.ev(`Array.from(document.querySelectorAll('[data-zone="ask"] [data-control^="choice-"]')).map((e) => e.getAttribute("data-control"))`);
      c.boxes = [];
      for (const id of c.keys) c.boxes.push(await s.ev(CA_BOX(`[data-control="${id}"]`)));
      c.answerOpen = await s.ev(`!!document.querySelector('[data-control="answer-open"]')`);
      c.blink = await s.ev(CA_BLINK);
      const asked = await s.ev("window.__tool.state().asked");
      c.asked = asked;
      const wrongId = (c.keys || []).map((k) => k.replace(/^choice-/, "")).find((k) => k !== String(asked));
      if (wrongId) {
        await s.click(`[data-control="choice-${wrongId}"]`);
        await s.wait(500);
        if (await s.until("!!window.__tool.state().locked", 1500)) await s.until("!window.__tool.state().locked", 40000);
        await s.wait(900);
        c.afterWrong = { st: await g(), n: await s.ev(`Array.from(document.querySelectorAll('[data-control^="choice-"]')).filter((e) => !e.closest('[display="none"]')).length`), slot: await s.ev(`!!document.querySelector('[data-zone="drawer"]:not([display="none"]) [data-zone="slot"]')`) };
      }
      if (await s.ev(`!!document.querySelector('[data-control="choice-${asked}"]')`)) await s.click(`[data-control="choice-${asked}"]`);
      c.won = await s.until("window.toolApi.getState().stage === 'win'", 6000);
      out.choices = c;
    }
    if (found.key !== undefined) {
      const c = {};
      await goAsk(found.key);
      c.open = await g();
      c.key = await s.ev(CA_BOX('[data-zone="ask"] [data-control="answer-open"]'));
      c.blink = await s.ev(CA_BLINK);
      out.key = c;
    }
    out.logs = s.logs.slice(0, 3);
    return out;
  }, { label: "card-answer", timeout: 170000, reducedMotion: false });
}

export async function cardAnswerInput({ base }) {
  const r = await pool([() => cardAnswerRun(`${base}?phase=1&muted=1&probe=1`)], 1);
  return r[0].ok ? r[0].value : { error: r[0].error && r[0].error.message };
}

/* rec = cardAnswerInput(). Returns problems. */
export function judgeCardAnswer(rec) {
  const bad = [];
  if (!rec || rec.error) return [`card-answer run: ${rec && rec.error}`];
  const blinks = (b, tag) => {
    if (!b || !b.rings) bad.push(`${tag}: nothing blinks (no ring c4-nextblink)`);
    else if (!b.name || b.name === "none" || b.max - b.min < 0.5) bad.push(`${tag}: the ring does not blink (animation ${b.name}, stroke opacity between ${b.min} and ${b.max} over 1 s)`);
  };
  const inStage = (b) => b && b.x >= 0 && b.y >= 0 && b.x + b.w <= 1600 && b.y + b.h <= 900;
  const c = rec.card;
  if (!c) bad.push("no question answered on a card was found (getState().answerOn card), though the tool opts in");
  else {
    if (c.open.panel !== "closed") bad.push(`a card question opens with the keypad ${c.open.panel}, want shut`);
    if (!c.hit) bad.push("no tap target on the card while the keypad is shut (data-control answer-open)");
    else {
      if (c.hit.disabled) bad.push("the card's tap target is disabled");
      if (!inStage(c.hit) || c.hit.w < 72 || c.hit.h < 72) bad.push(`the card's tap target is ${JSON.stringify(c.hit)} (inside the stage, at least 72 x 72)`);
    }
    if (c.bar) bad.push(`${c.bar} control(s) in the question bar on a card question: the card is the answer, the Answer key must not be drawn`);
    blinks(c.blink, "the card");
    if (!c.open.hint || c.open.hintKind !== "type") bad.push(`no where-to-tap line under the instruction when the question opens (hint ${JSON.stringify(c.open.hint)}, kind ${c.open.hintKind}): it must be a built-in "type" line, never a hint`);
    if (c.tapped.panel !== "open") bad.push(`a click on the card did not open the keypad (${c.tapped.panel})`);
    else {
      if (c.slot) bad.push("the keypad opened with a second answer box (data-zone slot): the digits belong in the card's own boxes");
      if (!c.close || c.close.label !== "Close") bad.push(`with the keypad open there is no Close key at the top of the panel (answer-open reads ${JSON.stringify(c.close && c.close.label)})`);
      if (!c.p1 || !c.p2) bad.push("the card's answer boxes part-1 / part-2 are not on the page with the keypad open");
      else if (!inStage(c.p1) || !inStage(c.p2) || c.p1.h < 72 || c.p2.h < 72) bad.push(`the card's answer boxes are too small or leave the stage (${JSON.stringify([c.p1, c.p2])})`);
      if (c.ringsOpen) bad.push(`${c.ringsOpen} ring(s) still blink with the keypad open: the blink stops once the card is tapped`);
      if (!c.tapped.hint || c.tapped.hint === c.open.hint) bad.push(`the line did not change when the card was tapped (${JSON.stringify(c.tapped.hint)}): it must say how to answer`);
    }
    if (c.sawLock) {
      if (c.back.panel !== "open") bad.push(`after a miss the keypad did not come back with the answer to retype (${c.back.panel})`);
      if (!(c.retype || []).includes("7")) bad.push(`after a miss the digit the child retypes does not show in the card's first box (it shows ${JSON.stringify(c.retype || [])}): the card must be the answer box again as soon as something new is typed`);
    }
    const asked = (Array.isArray(c.asked) ? c.asked : []).map(String);
    asked.forEach((v, j) => {
      const shown = (c.typedBoxes[j] || []).join(" ");
      if (!shown.includes(v)) bad.push(`the digits "${v}" typed for box ${j + 1} do not show in the card's box (it shows ${JSON.stringify(c.typedBoxes[j] || [])})`);
    });
    if (!c.won) bad.push("the digits and Enter did not answer the question on the card");
  }
  const q = rec.gated;
  if (q && q.stillWaiting) {
    if (q.hit && q.hit.w > 4 && q.hit.h > 4) bad.push("a card question whose picture still wants an act (shade the parts, Lots of, Trade) has a tap target on the card: it must wait");   /* a zero-size hit is the closed drawer's Close key, not a target */
    if (q.rings) bad.push(`${q.rings} ring(s) blink while the card waits for the picture: nothing blinks until the act is done`);
    if (q.open.hint && q.open.hintKind === "type") bad.push(`the line "${q.open.hint}" shows while the card waits for the picture`);
    if (q.afterDigit.panel === "open" || String(q.afterDigit.typed || "") !== "") bad.push(`a digit typed on the keyboard while the card waits opened the keypad or was typed (panel ${q.afterDigit.panel}, typed "${q.afterDigit.typed}")`);
  }
  const h = rec.choices;
  if (h) {
    if (!h.keys || h.keys.length < 2) bad.push(`a choice question has ${h.keys ? h.keys.length : 0} key(s) in the question bar, want its choices`);
    (h.boxes || []).forEach((b, j) => { if (!b || b.disabled || !inStage(b) || b.h < 72) bad.push(`choice key ${j + 1} is missing, disabled, off the stage or under 72 high (${JSON.stringify(b)})`); });
    if (h.answerOpen) bad.push("a choice question still carries an Answer key (answer-open)");
    if (h.open.panel !== "closed") bad.push(`a choice question opens with the keypad ${h.open.panel}`);
    blinks(h.blink, "the choice keys");
    if (h.blink && h.keys && h.blink.rings < h.keys.length) bad.push(`only ${h.blink.rings} ring(s) for ${h.keys.length} choice keys: each key blinks`);
    if (!h.open.hint || h.open.hintKind !== "type") bad.push(`no line saying to choose when the question opens (hint ${JSON.stringify(h.open.hint)}, kind ${h.open.hintKind})`);
    if (h.afterWrong) {
      const w = h.afterWrong;
      if (w.st.panel !== "closed" || w.slot) bad.push(`a wrong choice opened the keypad panel (panel ${w.st.panel}${w.slot ? ", an answer box drawn" : ""}): a choice is answered by its keys in the question bar alone`);
      if (w.n !== (h.keys || []).length) bad.push(`after a wrong choice there are ${w.n} choice keys on the page, want ${(h.keys || []).length} (the keys stay in the question bar, no second pair)`);
    }
    if (!h.won) bad.push("one click on the right choice did not answer the question");
  }
  const k = rec.key;
  if (k) {
    if (!k.key) bad.push("a question that keeps the Answer key has none in the question bar");
    blinks(k.blink, "the Answer key");
    if (!k.open.hint || k.open.hintKind !== "type") bad.push(`no where-to-tap line on the Answer-key question (hint ${JSON.stringify(k.open.hint)})`);
  }
  (rec.logs || []).forEach((l) => bad.push(`console during the card-answer run: ${String(l).slice(0, 140)}`));
  return bad;
}

/* the start page of a tool that has one: English by tap and by Enter, Hindi and Gujarati for fit */
export async function startPageInput({ base, poolSize = 2, first = "", backToStart = false, silent = true, defaultTheme = false }) {
  const q = "?phase=1&probe=1&startpage=1";
  const jobs = [
    () => startRun(`${base}${q}`, "click", { backToStart }),
    () => startRun(`${base}${q}`, "enter"),
    () => startRun(`${base}${q}&lang=hi`, "geometry").then((r) => ({ ...r, lang: "hi" })),
    () => startRun(`${base}${q}&lang=gu`, "geometry").then((r) => ({ ...r, lang: "gu" })),
  ];
  const res = await pool(jobs, poolSize);
  const bad = res.filter((r) => !r.ok).map((r) => r.error.message);
  const rows = res.filter((r) => r.ok && !r.value.error).map((r) => r.value);
  res.filter((r) => r.ok && r.value.error).forEach((r) => bad.push(r.value.error));
  if (rows.length) bad.push(...judgeStart(rows, first, { backToStart, silent, defaultTheme }));
  return { ok: !bad.length, bad, detail: `the start page, by a real mouse and Enter${silent ? " (the lesson is silent)" : ""}: it opens first with no line on the bubble and nothing begun, still so after 3 s, nothing of the tool shows behind it, it fits in English, Hindi and Gujarati, and Start brings the tool's first line onto the bubble within 2 s; ${backToStart ? "after a played question the reset key (\"Back to the start\") brings the page back with a clean slate and Start works again" : "back to the start not asked (this runtime's reset key restarts the phase: before r32)"}` };
}

/* the runs for a tool; returns the rows the check table prints */
/* `point`: the tool's source asks for the point key (pointKey: true). Without it the run is skipped
   altogether — a 12-key pad has no key-point element, so every wait for one would run to its timeout
   (it timed out the whole session on ch 7's tools, which have fraction boxes on several questions) */
export async function realInput({ base, N, poolSize = 2, point: hasPoint = false, board = false, think = false, blink = false }) {
  const jobs = [];
  /* a board tool keeps its answer panel open for the key, box and point runs (the host's `answerOpen`, ?answer=open),
     since they press the keypad's keys; its own behaviour is judged by boardRun */
  const open = board ? "&answer=open" : "";
  for (let n = 1; n <= N; n++) jobs.push(() => dragRun(`${base}?phase=${n}&muted=1&probe=1`, n));
  jobs.push(() => enterRun(`${base}?phase=1&muted=1&probe=1${open}`));
  jobs.push(() => partsRun(`${base}?muted=1&probe=1${open}`));
  if (hasPoint) jobs.push(() => pointRun(`${base}?muted=1&probe=1${open}`));
  if (board) jobs.push(() => boardRun(`${base}?muted=1&probe=1`));
  const res = await pool(jobs, poolSize);
  const drags = res.slice(0, N), enter = res[N], pr = res[N + 1], po = res[N + 2];
  const bo = board ? res[N + 2 + (hasPoint ? 1 : 0)] : null;
  let point;
  if (!hasPoint) point = { ok: true, detail: "no point key in this tool (a 12-key pad)", bad: [] };
  else if (!po.ok) point = { ok: false, detail: "", bad: [po.error.message] };
  else if (po.value.error) point = { ok: false, detail: "", bad: [po.value.error] };
  /* the tool asks for the key, yet no question's pad ever showed one: pointKey never reached ToolFrame */
  else if (po.value.none) point = { ok: false, detail: "", bad: ["the tool sets pointKey: true, but no question's pad has a point key (is pointKey in the object passed to ToolFrame?)"] };
  else if (po.value.unreached) point = { ok: false, detail: "", bad: ["the pad has a point key, but no single-box question with the point key on was reached"] };
  else {
    const v = po.value, b = judgePoint(v);
    const which = [v.one ? `question ${v.one.step}` : "", v.parts ? `off on parts question ${v.parts.step}` : ""].filter(Boolean).join("; ");
    point = { ok: !b.length, detail: `the point key by real mouse, finger and keys: one point an answer, rub out, Escape, Enter answers; off on a fraction or two boxes (${which})`, bad: b };
  }
  let parts;
  if (!pr.ok) parts = { ok: false, detail: "", bad: [pr.error.message] };
  else if (pr.value.error) parts = { ok: false, detail: "", bad: [pr.value.error] };
  else if (pr.value.none) parts = { ok: true, detail: "no two-part answer (quotient and remainder boxes) in this tool", bad: [] };
  else {
    const v = pr.value, b = [...(v.two ? judgeParts(v.two) : []), ...(v.mixed ? judgeMixed(v.mixed) : [])];
    const which = [v.two ? `two boxes, question ${v.two.step}` : "", v.mixed ? `mixed number, question ${v.mixed.step}` : ""].filter(Boolean).join("; ");
    parts = { ok: !b.length, detail: `answer boxes by real mouse, finger and keys: Enter moves on, the last box answers, a miss is never sent again unchanged (a mixed number: a whole alone or a whole fraction, never half a fraction), a tap picks a box, a digit after a miss starts only its box, rub out steps back, no keyboard trap (${which})`, bad: b };
  }
  const bad = [], seen = [];
  drags.forEach((r, k) => {
    if (!r.ok) { bad.push(`phase ${k + 1}: ${r.error.message}`); return; }
    const v = r.value;
    if (v.error) { bad.push(`phase ${v.n}: ${v.error}`); return; }
    if (v.none) return;
    (v.logs || []).forEach((l) => bad.push(`phase ${v.n}: console while dragging: ${l.slice(0, 140)}`));
    v.drags.forEach((d) => { seen.push(`${v.n}:${d.how}`); if (d.open) bad.push(`phase ${v.n}: a ${d.how} drag of "${d.piece}" never ended (the release was lost)`); });
  });
  const drag = { ok: !bad.length, detail: seen.length ? `every drag piece, by a real mouse and a real finger, ends its drag on release (${seen.length} drags in ${new Set(seen.map((x) => x.split(":")[0])).size} phases)` : "no drag piece on any phase", bad };
  let key;
  if (!enter.ok) key = { ok: false, detail: "", bad: [enter.error.message] };
  else if (enter.value.error) key = { ok: false, detail: "", bad: [enter.value.error] };
  else if (enter.value.none) key = { ok: true, detail: "no question answered on the digit keys", bad: [] };
  else {
    const e = enter.value, b = [];
    if (e.before !== "1") b.push(`question ${e.step}: a mouse press on the 1 key typed "${e.before}"`);
    else if (e.typed === "11") b.push(`question ${e.step}: the physical Enter pressed the 1 key again (focus stayed on it)`);
    else if (e.focus && /^key-/.test(e.focus)) b.push(`question ${e.step}: focus stayed on "${e.focus}" after a mouse press`);
    if (e.noResend !== null && e.noResend !== undefined && e.noResend !== e.tries)
      b.push(`question ${e.step}: Enter after a miss sent the same answer again, with nothing retyped (tries ${e.tries} -> ${e.noResend}); it must wait for a fresh write`);
    if (e.touch) {
      /* after a missed Enter the slot's answer is stale: the next digit starts a new answer ("2"), unless
         the tool wrote the slot itself since (then it appends as usual) */
      const fresh = e.tries > 0 && e.touch.t1 === "2";
      if (e.touch.t1 !== e.touch.t0 + "2" && !fresh) b.push(`question ${e.step}: a finger tap on the 2 key made "${e.touch.t0}" into "${e.touch.t1}"`);
      else if (e.touch.t2 === e.touch.t1 + "2") b.push(`question ${e.step}: after a finger tap the physical Enter pressed the 2 key again`);
    }
    (e.logs || []).forEach((l) => b.push(`console on a key press: ${l.slice(0, 140)}`));
    key = { ok: !b.length, detail: `a mouse press or a finger tap on a key, then the physical Enter, goes to the answer, not the key, and a miss is never sent again unchanged (step ${e.step}${e.touch ? ", mouse and finger" : ", mouse"})`, bad: b };
  }
  let panel = { ok: true, detail: "classic layout: the answer box and keypad are always in place", bad: [] };
  if (board) {
    if (!bo.ok) panel = { ok: false, detail: "", bad: [bo.error.message] };
    else if (bo.value.error) panel = { ok: false, detail: "", bad: [bo.value.error] };
    else if (bo.value.none) panel = { ok: false, detail: "", bad: ["no typed question with an Answer key was reached, so the answer panel was never exercised"] };
    else {
      const b = judgeBoard(bo.value);
      panel = { ok: !b.length, detail: `board layout, by a real mouse, finger and keys: it opens shut, Answer opens it (the picture narrows to ${bo.value.opened.w}), Close shuts it, a typed digit opens it, a miss shuts it for the traceback${bo.value.sawLock ? "" : " (this tool does not lock the pad)"} and brings it back with the answer kept`, bad: b };
    }
  }
  /* r24: the thinking pose (any tool whose runtime has it) and the Answer key's blink (a board tool without cardAnswer) */
  let thinkRow = null, blinkRow = null;
  if (think) {
    const e = enter.ok ? enter.value : null;
    if (!e) thinkRow = { ok: false, detail: "", bad: [(enter.error && enter.error.message) || "no click-then-enter run"] };
    else if (e.error) thinkRow = { ok: false, detail: "", bad: [e.error] };
    else if (e.none || !e.pose) {
      const b = e.flow ? judgeThink({ open: { pose: "think", puff: true }, tap: {}, flow: e.flow }) : [];
      thinkRow = { ok: !b.length, detail: "no question answered on the digit keys, so only question 1 after the guide steps was judged for the thinking pose", bad: b };
    }
    else { const b = judgeThink(e.pose); thinkRow = { ok: !b.length, detail: "while a question waits and nothing has been touched the mascot is the thinking picture (data-pose think) with its thought puff, inside his 204 x 160 box; the first tap puts the standing picture back and the puff away", bad: b }; }
  }
  if (blink && board) {
    if (!bo || !bo.ok) blinkRow = { ok: false, detail: "", bad: [(bo && bo.error && bo.error.message) || "no board-panel run"] };
    else if (bo.value.error) blinkRow = { ok: false, detail: "", bad: [bo.value.error] };
    else if (bo.value.none) blinkRow = { ok: true, detail: "no typed question with an Answer key was reached, so the blink was not exercised", bad: [] };
    else { const b = judgeAnswerBlink(bo.value); blinkRow = { ok: !b.length, detail: "the pink Answer key blinks (a ring, animated) only while it is what the child must press: a keypad question that waits with the keypad shut, with the built-in \"Tap the blinking Answer key.\" line under the instruction; not before a question (a warm-up or a guide step), not with the keypad open, not while the pad is locked; the line comes back after Close", bad: b }; }
  }
  return { drag, key, parts, point, panel, think: thinkRow, blink: blinkRow };
}

/* THE SIMPLE SUMMARY PAGE (runtime r44, the owner: "make it simple"): after the last phase the bubble says ONE line,
   UI.summaryLine; no row is read out or ringed (getState().summaryRow stays -1), FINISH_LINE is not shown, and finished
   goes once about 5 s after the page opens. One DevTools session per language (en, hi, gu) and one English classroom
   session: the last phase is mounted, its last question answered (straight to it), and from the moment the page opens
   the state is sampled every 100 ms for 8 s (the bubble's line, summaryRow, a .c4-ring inside the summary, finished,
   the stage); a screenshot 1 s in gives the bubble's ink (measureHintFrame); in the classroom session the bubble is
   tapped with a real click 2 s in. */
const SUM_LINES = `(() => { const svg = document.querySelector("svg.c4"), m = svg.getScreenCTM(), inv = m.inverse();
  const st = (x, y) => { const p = svg.createSVGPoint(); p.x = x; p.y = y; return p.matrixTransform(inv); };
  const lines = Array.from(document.querySelectorAll('[data-zone="bubble"] [data-role="instruction"] text')).map((t) => {
    const r = t.getBoundingClientRect(), a = st(r.left, r.top), b = st(r.right, r.bottom);
    return { role: "instruction", text: t.textContent, y: +t.getAttribute("y"), size: +t.getAttribute("font-size"), x0: a.x, x1: b.x }; });
  return { lines, band: null, bar: null, ctm: { a: m.a, d: m.d, e: m.e, f: m.f } }; })()`;
const SUM_SNAP = `(() => { const A = window.toolApi.getState(), b = document.querySelector('[data-zone="bubble"]');
  return { stage: A.stage, row: A.summaryRow, fin: (window.__events || []).length, ring: !!document.querySelector('[data-zone="summary"] .c4-ring'),
    line: b ? Array.from(b.querySelectorAll('[data-role="instruction"] text')).map((x) => x.textContent).join(" ") : "" }; })()`;
/* r24: the summary page's thumbnails (the right-hand column of each row): how many elements each really draws and the words in it */
const THUMBS = `(() => { const out = []; document.querySelectorAll('[data-zone="summary"] [data-role="thumb"]').forEach((g) => {
  const row = g.closest('[data-row]'), els = Array.from(g.querySelectorAll('rect,circle,ellipse,path,line,polyline,polygon,text,image'));
  let drawn = 0, words = '';
  els.forEach((e) => {
    if (e.tagName === 'text') { const t = String(e.textContent || '').trim(); if (t) { drawn++; words += t + ' '; } return; }
    const b = e.getBoundingClientRect();
    if (b.width < 0.5 && b.height < 0.5) return;
    const cs = getComputedStyle(e), none = (v) => !v || v === 'none' || /transparent|rgba\\([^)]*,\\s*0\\)/.test(v);
    if (e.tagName === 'image' || !none(cs.fill) || (!none(cs.stroke) && parseFloat(cs.strokeWidth) > 0)) drawn++;
  });
  out.push({ row: row ? Number(row.getAttribute('data-row')) : -1, drawn, words: words.trim() });
}); return out; })()`;
async function summaryRun(url, lang, classroom, outDir, lastSteps) {
  return cdpSession(url, async (s) => {
    if (!(await s.until("!!(window.toolApi && window.__tool)", 20000))) return { lang, classroom, error: "the tool did not mount" };
    await s.until("['ask', 'demo'].includes(window.toolApi.getState().stage)", 25000);
    const g0 = await s.ev("(() => { const a = window.toolApi.getState(); return { step: a.step, item: a.item, items: a.items }; })()");
    await s.ev(`window.toolApi.gotoStep(${g0.step - (g0.item - 1) + (g0.items - 1)})`);
    await s.until("window.toolApi.getState().stage === 'ask'", 8000);
    await s.wait(300);
    await s.ev("window.__tool.solve()");
    if (!(await s.until("window.toolApi.getState().stage === 'summary'", 30000))) return { lang, classroom, opened: false };
    const t0 = Date.now(), samples = [];
    let frame = null, tap = null;
    while (Date.now() - t0 < 8000) {
      const x = await s.ev(SUM_SNAP);
      samples.push({ t: Date.now() - t0, ...x });
      if (!frame && Date.now() - t0 >= 1000) {
        frame = await s.ev(SUM_LINES); frame.png = `${outDir}/summary-${lang}${classroom ? "-room" : ""}.png`; await s.shot(frame.png);
      }
      if (classroom && !tap && Date.now() - t0 >= 2000) {
        const before = await s.ev(SUM_SNAP);
        const has = await s.ev(`!!document.querySelector('[data-control="bubble"]')`);
        if (has) await s.click('[data-control="bubble"]');
        await s.wait(400);
        tap = { control: has, before, after: await s.ev(SUM_SNAP) };
      }
      await s.wait(100);
    }
    /* r24 (summary-thumbs): this mount played the last phase only, so only its row has a thumbnail. After the sampling above the
       earlier phases' last questions are answered right too (gotoStep, then the dev key), the last phase's again, and the summary's
       thumbnails are read once it opens. Nothing above this block depends on it. */
    let thumbs = null;
    if (lastSteps && lastSteps.length && !classroom) {
      for (const t of lastSteps) {
        await s.ev(`window.toolApi.gotoStep(${t})`);
        let asked = false;
        for (let k = 0; k < 40 && !asked; k++) {
          const st = await s.ev("window.toolApi.getState().stage");
          if (st === "ask") asked = true;
          else { if (st === "demo") await s.ev("window.toolApi.getState().stage === 'demo' && window.__tool.solve()"); await s.wait(250); }
        }
        if (!asked) continue;
        await s.wait(250);
        await s.ev("window.toolApi.getState().stage === 'ask' && window.__tool.solve()");
        await s.wait(150);
      }
      if (await s.until("window.toolApi.getState().stage === 'summary'", 25000)) { await s.wait(600); thumbs = await s.ev(THUMBS); }
      else thumbs = { error: "the summary page did not open again after every phase's last question was answered" };
    }
    return { lang, classroom, opened: true, samples, frame, tap, thumbs, logs: s.logs.slice(0, 3) };
  }, { label: `summary ${lang}${classroom ? " classroom" : ""}`, timeout: lastSteps && !classroom ? 190000 : 90000 });
}
export async function summaryInput({ base, N, outDir, langs = ["en", "hi", "gu"], poolSize = 2, lastSteps = null }) {
  const plan = [...langs.map((l) => ({ lang: l, classroom: false })), { lang: "en", classroom: true }];
  const res = await pool(plan.map((p) => () => summaryRun(`${base}?phase=${N}&muted=1&probe=1${p.lang === "en" ? "" : "&lang=" + p.lang}${p.classroom ? "&classroom=1" : ""}`, p.lang, p.classroom, outDir, lastSteps)), poolSize);
  return res.map((r, k) => {
    if (!r.ok) return { ...plan[k], error: r.error && r.error.message };
    const v = r.value;
    if (v.frame && fs.existsSync(v.frame.png)) v.ink = measureHintFrame({ ...v.frame, phase: N, kind: "summary", lang: v.lang }, decodePng(fs.readFileSync(v.frame.png)));
    return v;
  });
}

/* r24, SUMMARY-THUMBS (runtime with `last.it`): every summary row's thumbnail draws at least two things (a blank cream box draws a frame and
   nothing) and, in Hindi and Gujarati, carries no Latin letter (digits, units written in the language and symbols are fine).
   rows = summaryInput(): the en, hi and gu sessions each carry `thumbs` (a list, or { error }). Returns { bad, notes }. */
export function judgeSummaryThumbs(rows = [], N = 1) {
  const bad = [], notes = [];
  let seen = 0;
  for (const r of rows) {
    if (r.classroom || !r.thumbs) continue;
    if (r.thumbs.error) { bad.push(`${r.lang}: ${r.thumbs.error}`); continue; }
    seen++;
    if (!r.thumbs.length) { notes.push(`${r.lang}: the summary page drew no thumbnail (the tool has none)`); continue; }
    if (r.thumbs.length < N) notes.push(`${r.lang}: ${r.thumbs.length} of ${N} phases had a thumbnail`);
    for (const t of r.thumbs) {
      const tag = `phase ${t.row + 1} thumbnail (${r.lang})`;
      if (t.drawn < 2) bad.push(`${tag}: ${t.drawn} drawn element${t.drawn === 1 ? "" : "s"}, a blank box (a Thumb reads result.last.it, the item object, or result.last.item, the question's index)`);
      const lat = r.lang !== "en" ? /[A-Za-z]+/.exec(t.words || "") : null;
      if (lat) bad.push(`${tag}: Latin letters "${lat[0]}" in "${String(t.words).slice(0, 40)}" (write it through tx(), a TR line)`);
    }
  }
  if (!seen && !bad.length) notes.push("no summary session read the thumbnails");
  return { bad, notes };
}
