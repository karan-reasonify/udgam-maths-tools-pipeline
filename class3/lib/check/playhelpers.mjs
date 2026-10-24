/* playhelpers: the moves a play tester kept rewriting, on top of playkit (never instead of it).
 *
 *   import { play } from "file:///<...>/<class folder>/lib/check/playkit.mjs";
 *   import * as h from "file:///<...>/<class folder>/lib/check/playhelpers.mjs";
 *   await play({ id, ch, phase: 1, nextKey: true }, async (t) => {
 *     await h.gotoQuestion(t, 1, 2);                         // straight to a question, state back
 *     await h.typeAnswer(t, "7");                            // real clicks on the keypad, then Enter
 *     const a = await h.sampleBubble(t, { every: 100, for: 3000 });   // what the bubble said, when
 *     console.log(await h.hintShown(t), await h.partyState(t), await h.snap(t));
 *   });
 *
 * Every helper takes the `t` that play() hands you and returns plain data. Real input goes through t.click / t.tap / t.key /
 * t.drag (CDP mouse, finger and keys); helpers that use the dev driver (`window.__tool`) say so, because the dev driver is
 * not real input (check's own rows already play those paths for real: docs/PLAYBOOK.md).
 *
 *   snap(t)                       a compact getState(): stage, phase, item, step, typed, tries, hint, instruction, guide*, party, nextKey ...
 *   gotoQuestion(t, phase, item)  toolApi.gotoStep to phase `phase`, question `item` (both 1-based); the snap, or null if it did not land
 *   clickControl(t, id, {how})    waits for data-control=id to exist and be live, then a REAL click ("mouse") or tap ("touch")
 *   typeAnswer(t, text, {how})    the keypad (how "pad", real clicks; opens the answer panel first when the board has one) or the keys
 *                                 ("keys", real key presses), then Enter (enter: false to leave it typed); "." is the point key, and
 *                                 "|" is one Enter between the boxes of a two-box answer ("0|1": box 1, Enter, box 2, then Enter answers)
 *   wrongAnswer(t)                types the tool's own near miss (dev driver) and presses Enter for real: the snap + `missed` (tries went up)
 *   solveQuestion(t)              the dev driver's solve(): a right answer (or every remaining guide step) WITHOUT real input
 *   pressNext(t, how)             the Next key: "click" (real), "enter" (real key) or "api" (toolApi.next())
 *   sampleBubble(t, {every, for}) the instruction and hint, as state and as drawn, every `every` ms for `for` ms (changes only)
 *   hintShown(t)                  { hint, drawnHint, instruction, drawnInstruction, same }: the state and what the bubble draws
 *   partyState(t)                 { party, zone, pointerEvents }: is the phase party on (state and DOM)
 *   tabOrder(t, n)                n real Tab presses: what each focuses (data-control, else the label)
 *   burstClicks(t, id, n, gap)    n real clicks `gap` ms apart (a raw burst, no waits, when playkit exposes t.raw)
 *   checkRows(slotDir)            node side: the rows of the last check run (.build/check.json) by level, with kind "full" or "quick" (a quick
 *                                 check, --no-render, has no render rows and overwrites the file), or null when it is gone
 *
 *   node lib/check/playhelpers.mjs rows <MEDIA_ID> --ch N      the rows of the last check, one compact line per level
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

/* the bubble's text for a role ("instruction" | "hint"), as drawn; the same selector check's realWrongRun uses (lib/check/input.mjs ROLE) */
const ROLE = (role) => `(() => { const g = document.querySelector('[data-zone="bubble"] [data-role="${role}"]'); return g ? Array.from(g.querySelectorAll("text")).map((x) => x.textContent).join(" ") : ""; })()`;

const KEEP = ["stage", "phase", "phases", "item", "items", "step", "typed", "tries", "keypadOpen", "padTo", "choices", "parts", "hint", "hintKind", "instruction",
  "guideOn", "guideStep", "guideSteps", "party", "nextKey", "held", "muted", "summaryRow", "cardReady", "panel"];

export async function snap(t) {
  const g = (await t.state()) || {};
  const o = {};
  for (const k of KEEP) if (g[k] !== undefined) o[k] = g[k];
  return o;
}

export async function gotoQuestion(t, phase, item) {
  const g = await t.state();
  const per = Number(g.items) || 3;                     /* exactly three questions a phase (score-honesty) */
  await t.goto((Number(phase) - 1) * per + (Number(item) - 1));
  const ok = await t.until(`(() => { const g = window.toolApi.getState(); return g.phase === ${Number(phase)} && g.item === ${Number(item)} && ["ask", "demo"].includes(g.stage); })()`, 8000);
  return ok ? snap(t) : null;
}

export async function clickControl(t, id, { how = "mouse", wait = 8000 } = {}) {
  const css = JSON.stringify(`[data-control=${JSON.stringify(String(id))}]`);
  const live = `(() => { const e = document.querySelector(${css}); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 4 && r.height > 4 && e.getAttribute("aria-disabled") !== "true"; })()`;
  if (!(await t.until(live, wait))) return false;
  return how === "touch" ? t.tap(id) : t.click(id);
}

export async function typeAnswer(t, text, { how = "pad", enter = true } = {}) {
  const s = String(text);
  if (how === "pad") {
    /* the board's keypad is a drawer: when no key is drawn and an answer-open control is (the Answer key, or a card), open it first */
    const seen = await t.controls();                      /* visible controls only: a shut drawer keeps its keys in the DOM at no size */
    if (!seen.some((c) => /^key-/.test(c.id)) && seen.some((c) => c.id === "answer-open")) { await clickControl(t, "answer-open"); await t.wait(500); }
    for (const c of s) {
      const id = c === "." ? "key-point" : c === "|" ? "key-enter" : "key-" + c;   /* "|" = Enter once: it moves the caret to the next box of a two-box answer */
      if (!(await clickControl(t, id, { wait: 3000 }))) {
        const sn = await snap(t);                         /* a card-answer question draws no keys until its act on the picture is done (cardReady false) */
        return { ok: false, missing: id, note: sn.cardReady === false ? "cardReady is false: the picture's act comes first (or solveQuestion)" : "the key is absent or aria-disabled now", snap: sn };
      }
    }
    if (enter) await clickControl(t, "key-enter", { wait: 3000 });
  } else {
    await t.type(s);
    if (enter) await t.key("Enter");
  }
  await t.wait(400);
  return { ok: true, snap: await snap(t) };
}

export async function wrongAnswer(t) {                  /* dev driver: nearMiss() fills the slot; the Enter is real */
  await t.eval("window.__tool.nearMiss()");
  await t.wait(150);
  const first = await snap(t), before = first.tries, presses = Array.isArray(first.parts) ? first.parts.length : 1;
  for (let k = 0; k < presses; k++) {                    /* a two-box answer: Enter moves from box to box, the last Enter answers */
    if (!(await clickControl(t, "key-enter", { wait: 2000 }))) await t.key("Enter");
    await t.wait(300);
    if ((await snap(t)).tries > before) break;
  }
  await t.wait(300);
  const sn = await snap(t);
  return { ...sn, missed: sn.tries > before };           /* false: nothing was sent (a card-answer question waits for its act; the pad may be quiet) */
}

export async function solveQuestion(t) {                /* dev driver, not real input */
  await t.eval("window.__tool.solve()");
  await t.wait(400);
  return snap(t);
}

export async function pressNext(t, how = "click") {
  if (how === "api") await t.eval("window.toolApi.next()");
  else if (how === "enter") await t.key("Enter");
  else await clickControl(t, "next-key", { wait: 8000 });
  await t.wait(500);
  return snap(t);
}

export async function sampleBubble(t, { every = 100, for: ms = 3000 } = {}) {
  const out = [];
  const t0 = Date.now();
  let last = "";
  while (Date.now() - t0 < ms) {
    const s = await t.eval(`(() => { const g = window.toolApi.getState(); return { stage: g.stage, instruction: g.instruction, hint: g.hint, drawnInstruction: ${ROLE("instruction")}, drawnHint: ${ROLE("hint")} }; })()`);
    const key = JSON.stringify(s);
    if (key !== last) { out.push({ ms: Date.now() - t0, ...s }); last = key; }
    await t.wait(every);
  }
  return out;
}

export async function hintShown(t) {
  const r = await t.eval(`(() => { const g = window.toolApi.getState(); return { hint: g.hint === undefined ? null : g.hint, drawnHint: ${ROLE("hint")}, instruction: g.instruction || "", drawnInstruction: ${ROLE("instruction")} }; })()`);
  return { ...r, same: !!r.hint === !!r.drawnHint };    /* a hint in state but not drawn (or the reverse) is the thing to report */
}

export async function partyState(t) {
  return t.eval(`(() => { const z = document.querySelector('[data-zone="party"]'); return { party: !!window.toolApi.getState().party, zone: !!z, pointerEvents: z ? z.getAttribute("pointer-events") : null }; })()`);
}

export async function tabOrder(t, n = 12) {
  const seen = [];
  for (let k = 0; k < n; k++) {
    await t.key("Tab");
    await t.wait(60);
    seen.push(await t.eval(`(() => { const a = document.activeElement; return a && a !== document.body ? (a.getAttribute("data-control") || a.getAttribute("aria-label") || a.tagName) : null; })()`));
  }
  return seen;
}

export async function burstClicks(t, id, n = 3, gap = 30) {
  /* n = 2 is a TRUE double tap (t.doubleTap: playkit, two taps `gap` ms apart); more than two are real clicks about 160 ms apart:
     a fast child, not a double tap; see docs/PLAYBOOK.md */
  if (n === 2 && typeof t.doubleTap === "function") await t.doubleTap(id, gap);
  else for (let k = 0; k < n; k++) await t.click(id);
  await t.wait(400);
  return snap(t);
}

/* node side: the rows of the last check run. .build/check.json is written by EVERY check, a quick one (--no-render: source and maths
   rows only) included, and removed by `clean`; so `kind` says which it holds: "full" (it has render rows: the real-input rows are in
   it) or "quick" (it has none: do not read it as what check played). null when the file is gone. */
export function checkRows(slotDir) {
  const f = path.join(slotDir, ".build", "check.json");
  if (!fs.existsSync(f)) return null;
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  const by = { pass: [], warn: [], fail: [], info: [] };
  for (const r of j.results || []) (by[r.level] || (by[r.level] = [])).push(r.id);
  const kind = (j.results || []).some((r) => r.group === "render") ? "full" : "quick";
  let st = {};
  try { st = JSON.parse(fs.readFileSync(path.join(slotDir, "status.json"), "utf8")); } catch { /* no status yet */ }
  return { kind, summary: j.summary, lastFull: st.checks || null, ...by };
}

/* the command line: node lib/check/playhelpers.mjs rows <MEDIA_ID> --ch N */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argv = process.argv.slice(2);
  if (argv[0] !== "rows" || !argv[1]) { console.log("usage (in the class folder): node lib/check/playhelpers.mjs rows <MEDIA_ID> [--ch N]"); process.exit(0); }
  const { resolveTarget } = await import("../core/work.mjs");
  const chI = argv.indexOf("--ch");
  const dir = resolveTarget(argv[1], chI >= 0 ? { ch: argv[chI + 1] } : {});
  const r = checkRows(dir);
  if (!r) console.log("no .build/check.json (the slot was cleaned, or never checked): use the list in docs/PLAYBOOK.md");
  else if (r.kind === "quick") {
    const full = r.lastFull ? `the last full check is in status.json: ${r.lastFull.pass} pass, ${r.lastFull.warn} warn, ${r.lastFull.fail} fail (${r.lastFull.at})` : "there is no full check yet";
    console.log(`QUICK check only (${(r.summary || {}).at || "?"}: source and maths rows, no browser): it holds none of the real-input rows, so it does NOT say what check played. Use the list in docs/PLAYBOOK.md; ${full}.`);
  } else {
    const s = r.summary || {};
    console.log(`last FULL check ${s.at || "?"}: ${s.pass} pass, ${s.warn} warn, ${s.fail} fail, ${s.info} info. Fresh on this exact source? "node cli.mjs status --ch N" says so (a "source changed since" there means these rows describe an older tool).`);
    for (const lv of ["fail", "warn", "pass", "info"]) if (r[lv] && r[lv].length) console.log(`${lv}: ${r[lv].join(", ")}`);
  }
}
