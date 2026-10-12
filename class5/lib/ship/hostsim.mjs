/* hostsim <MEDIA_ID>: the standalone <ID>.tsx, alone, run the way the app runs it.
 *
 * A copy of Reasonify_Frontend_TSX/src/components/DynamicToolRenderer.tsx (the 2D path): the same
 * five regexes strip the imports, @babel/standalone transforms with the same two presets, the same
 * eight replacements clean the output, and the code runs inside the same function body (hooks and
 * Math hoisted, an ErrorBoundary, `var exports`, default props 850x550) on React 18 production UMD.
 * Then, per phase, the teacher agent plays it through window.toolApi with the sidecar's answer keys.
 * This is the proof that the published file works where it will live; the preview proves nothing
 * about the host (TOOL_BUILD_SPEC §16).
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { dumpDomAsync, pool } from "../core/chrome.mjs";
import { HOST, readVendor as read } from "./hostTemplate.mjs";

const HARNESS = String.raw`
window.__hostErrors = [];
window.addEventListener('error', function (e) { window.__hostErrors.push('error: ' + e.message); });
window.__hostNotes = [];
/* "[BABEL] Note: ... deoptimised the styling ... exceeds the max of 500KB" is the host's own transpiler
   remarking on a file over 500 KB (a tool that carried baked Hindi/Gujarati voice before r30), not the tool going wrong:
   it is kept as a note, never counted as a tool error */
var oe = console.error; console.error = function () { var m = Array.prototype.join.call(arguments, ' '); if (/^\[BABEL\] Note: The code generator has deoptimised the styling/.test(m)) window.__hostNotes.push(m.slice(0, 200)); else window.__hostErrors.push('console: ' + m.slice(0, 200)); return oe.apply(console, arguments); };
window.__finished = [];
window.addEventListener('finished', function (e) { window.__finished.push(e.detail); });
var out = { stage: 'transpile' };
function done() { var pre = document.createElement('pre'); pre.id = '__host'; pre.hidden = true; out.errors = window.__hostErrors; out.finished = window.__finished; pre.textContent = JSON.stringify(out); document.body.appendChild(pre); }
try {
  var t0 = Date.now();
  var transpiled = hostTranspile(RAW, TOOL_NAME);
  out.transpileMs = Date.now() - t0;
  out.scriptBreak = /<\/script/i.test(transpiled);
  var s = document.createElement('script');
  s.textContent = hostBody(transpiled, PROPS);
  document.body.appendChild(s);
  out.stage = 'mounted';
} catch (e) { out.stage = 'transpile failed'; window.__hostErrors.push('transpile: ' + e.message); }
var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
var until = async function (ok, n) { n = n || 600; for (var k = 0; k < n && !ok(); k++) await wait(50); };
(async function () {
  if (out.stage !== 'mounted') return done();
  await until(function () { return !!window.toolApi; });
  var A = window.toolApi;
  out.svg = !!document.querySelector('svg');
  out.boundary = !!document.getElementById('boundary');
  if (!A) { out.stage = 'no toolApi'; return done(); }
  out.apiKeys = Object.keys(A);
  out.alias = !!window[TOOL_ID];
  out.start = A.getState();
  /* a tool with a start page (runtime r28+) opens on it in user mode and shows nothing else until Start: the child's
     Enter (or a tap) begins the lesson, then the phase dots exist. AI mode never shows it (the agent drives toolApi). */
  out.startPageShown = !!out.start.startPage;
  if (out.startPageShown) { window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })); await wait(400); out.startPageGone = !A.getState().startPage; }
  out.dots = Array.prototype.map.call(document.querySelectorAll('[data-zone="bar"] [aria-label^="Step "]'), function (d) { return d.getAttribute('role'); });
  for (var k = 0; k < KEYS.length && !A.getState().complete; k++) {
    await until(function () { var s = A.getState(); return s.stage === 'ask' || s.stage === 'demo' || s.stage === 'summary' || s.complete; });
    if (A.getState().stage === 'summary' || A.getState().complete) break;
    /* a demo stage: each check() performs one act. A runtime without guide steps: one check() opens the question (as it
       always did). A phase with guide steps (runtime r30) needs one act per step, so the agent goes on (at most 15) until
       the question opens, each next act once the last one has landed */
    if (A.getState().stage === 'demo' && typeof A.getState().guideSteps !== 'number') { A.check(); await until(function () { return A.getState().stage === 'ask'; }); }
    for (var d = 0; d < 15 && A.getState().stage === 'demo'; d++) {
      var g0 = A.getState().guideStep;
      A.check();
      await until(function () { var s = A.getState(); return s.stage !== 'demo' || (typeof s.guideSteps === 'number' && s.guideStep !== g0); }, typeof g0 === 'number' ? 120 : 600);
      await wait(300);
    }
    await until(function () { return A.getState().stage === 'ask'; });
    var s0 = A.getState();
    A.answer(KEYS[k]); await wait(40); A.check(); await wait(200);
    if (A.getState().stage === 'ask' && A.getState().item === s0.item && !A.getState().complete) A.check();
    /* a tool with nextKey (runtime r48+) waits in a child's mount for its Next key after a right answer: the agent presses it
       the way the host's own Next does (toolApi.next()), whether it leads to the next question, the next phase or the summary */
    await until(function () { var q = A.getState(); return q.item !== s0.item || q.complete || !!q.nextKey; });
    if (A.getState().nextKey) {
      A.next();
      await until(function () { var q = A.getState(); return q.item !== s0.item || q.phase !== s0.phase || q.stage === 'summary' || q.complete; });
    }
  }
  await until(function () { return A.getState().complete; }, 1200); /* the last phase sends finished from its summary page */
  await wait(1500);
  out.end = A.getState();
  out.stage = 'played';
  done();
})();
`;

export async function hostsim(tsxFile, sidecar, { log = console.log, work } = {}) {
  const raw = fs.readFileSync(tsxFile, "utf8");
  const tmp = work || path.join(path.dirname(tsxFile), ".hostsim");
  fs.mkdirSync(tmp, { recursive: true });
  const libs = [read("react/umd/react.production.min.js"), read("react-dom/umd/react-dom.production.min.js"), read("@babel/standalone/babel.min.js")];
  /* per phase: its answer keys (toolQuestions.authoredFallback) and its concept (phaseMap) */
  const phases = sidecar.toolQuestions.authoredFallback.map((p) => ({ n: p.phase, items: p.items.map((it) => ({ answerKey: it.answer })),
    conceptId: (sidecar.phaseMap.phases.find((x) => x.n === p.phase) || {}).conceptId }));
  const jobs = phases.map((p) => {
    const page = path.join(tmp, `phase-${p.n}.html`);
    const props = { phase: p.n, navigableDots: p.n === 1 ? true : false, muted: true };
    /* the mount walks on from its phase to the last (as the NCERT tools), so the agent needs every answer from here on */
    const keys = phases.filter((x) => x.n >= p.n).flatMap((x) => x.items.map((it) => it.answerKey));
    fs.writeFileSync(page, `<!doctype html><html><head><meta charset="utf-8"><style>
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid}body{margin:0;padding:0;background:#f8fafc}
svg{display:block;vertical-align:middle}#root{display:flex;justify-content:center;align-items:flex-start;min-height:80vh;min-width:100%}
</style>${libs.map((l) => `<script>${l.replace(/<\/script/gi, "<\\/script")}</script>`).join("")}</head><body><div id="root"></div>
<script>var RAW = ${JSON.stringify(raw).replace(/<\/script/gi, "<\\/script")}; var TOOL_NAME = ${JSON.stringify(sidecar.mediaId)}; var TOOL_ID = ${JSON.stringify(sidecar.toolId)};
var PROPS = ${JSON.stringify(props)}; var KEYS = ${JSON.stringify(keys)};
${HOST}
${HARNESS}</script></body></html>`);
    return () => dumpDomAsync(pathToFileURL(page).href, { budget: 200000 * (phases.length - p.n + 1), label: `host phase ${p.n}` }).then((dom) => {
      const m = /<pre id="__host"[^>]*>([\s\S]*?)<\/pre>/.exec(dom || "");
      return { n: p.n, props, r: m ? JSON.parse(m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")) : null };
    });
  });
  const got = await pool(jobs, 4);
  const results = [];
  for (const g of got) {
    if (!g.ok) { results.push({ ok: false, problems: [String(g.error && g.error.message)] }); continue; }
    const { n, props, r } = g.value;
    const P = phases[n - 1], probs = [];
    if (!r) probs.push("the page wrote no result");
    else {
      if (r.stage !== "played") probs.push(`stopped at: ${r.stage}`);
      if (r.errors && r.errors.length) probs.push(...r.errors.slice(0, 3));
      if (r.scriptBreak) probs.push("the transpiled code contains </script");
      if (!r.svg || r.boundary) probs.push("nothing rendered, or the error boundary caught");
      if ((r.apiKeys || []).slice().sort().join() !== (sidecar.windowMethods || []).slice().sort().join()) probs.push(`toolApi verbs: ${(r.apiKeys || []).join(",")}`);
      if (!r.alias) probs.push(`window.${sidecar.toolId} missing`);
      if (r.start && r.start.mascot !== "image") probs.push(`mascot rung: ${r.start && r.start.mascot}`);
      if (r.startPageShown && !props.navigableDots) probs.push("AI mode showed the start page (it must go straight to the lesson)");
      if (r.startPageShown && !r.startPageGone) probs.push("Enter on the start page did not begin the lesson");
      const wantMode = props.navigableDots ? "user" : "ai";
      if (r.start && r.start.mode !== wantMode) probs.push(`mode ${r.start && r.start.mode}, want ${wantMode}`);
      if ((r.dots || []).length !== phases.length || (r.dots || []).some((x) => x !== (props.navigableDots ? "button" : "img"))) probs.push(`dots: ${JSON.stringify(r.dots)}`);
      const f = r.finished || [];
      if (f.length !== 1) probs.push(`finished fired ${f.length} times`);
      else {
        /* one finished, from the last phase's summary page, scoring every phase this mount played */
        const played = phases.filter((x) => x.n >= n), last = phases[phases.length - 1];
        const score = played.reduce((a, x) => a + x.items.length * 5, 0);
        if (f[0].phase !== last.n || f[0].score !== score || f[0].stars !== 3 || f[0].conceptId !== last.conceptId
          || (played.length > 1 && JSON.stringify(f[0].phases) !== JSON.stringify(played.map((x) => x.n)))) probs.push(`finished detail ${JSON.stringify(f[0])}`);
      }
    }
    results.push({ n, ok: !probs.length, problems: probs, transpileMs: r && r.transpileMs, mode: props.navigableDots ? "user" : "ai" });
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  return { ok: results.every((x) => x.ok), results };
}
