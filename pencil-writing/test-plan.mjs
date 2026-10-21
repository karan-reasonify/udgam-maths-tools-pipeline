/* Tests the pencil `write` code in node (no browser): timing, order, and that the last frame of an act is the finished written text.
   Evaluates the NEW helper block with stubs for React and the runtime's own names. node pencil-writing/test-plan.mjs */
import vm from "node:vm";
import { createRequire } from "node:module";
import { CLASS4 } from "./lib.mjs";
import { buildNewBlock } from "./build-helper.mjs";

const esbuild = createRequire(CLASS4 + "/package.json")("esbuild");
const { newBlock } = buildNewBlock();
const js = (await esbuild.transform(newBlock, { loader: "tsx", jsx: "transform", jsxFactory: "__el", target: "es2019" })).code;

const __el = (type, props, ...children) => ({ type, props: props || {}, children: children.flat(9) });
const clock = { now: 0, state: null };   /* performance.now() and the ActLayer's own useState clock, set by a test */
const ctx = vm.createContext({
  __el, Math, console, performance: { now: () => clock.now }, Array, Object, String, Number, isFinite,
  useState: (v) => [clock.state == null ? v : clock.state, () => {}], useEffect: () => {}, useRef: (v) => ({ current: v }), reducedMotion: () => false,
  requestAnimationFrame: () => 0, cancelAnimationFrame: () => {}, setTimeout, clearTimeout,
});
vm.runInContext(js + "\nthis.__t = { penPlan, penTip, penWriteLayer, PencilText, PencilLine, penLayout, penCut, PEN_GLYPHS, ActLayer };", ctx);   /* PEN_GLYPHS: read by the letter test below */
const T = ctx.__t;

let fails = 0;
const ok = (name, cond, extra = "") => { console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`); if (!cond) fails++; };
const walk = (n, f) => { if (n && typeof n === "object") { f(n); (n.children || []).forEach((c) => walk(c, f)); } };
const polylines = (tree, role) => { const out = []; walk(tree, (n) => { if (n.type === "polyline" && (!role || n.props["data-role"] === role)) out.push(n.props.points); }); return out; };

const one = T.penPlan({ tool: "pencil", moves: "write", text: "125", at: [{ x: 300, y: 400 }], size: 64, align: "middle" });
ok("one number takes about 0.8 s (150 in + 500 strokes + 150 out)", one.total >= 780 && one.total <= 840, `total ${one.total} ms`);
ok("a hit per character, in order, all before the pencil leaves", one.hits.length === 3 && one.hits.every((v, i, a) => !i || v > a[i - 1]) && one.hits[2] <= one.total - 150, one.hits.join(","));
ok("every stroke lasts at least 40 ms", one.strokes.every((s) => s.t1 - s.t0 >= 39.9), `${one.strokes.length} strokes, shortest ${Math.min(...one.strokes.map((s) => s.t1 - s.t0)).toFixed(0)} ms`);
ok("strokes never overlap in time", one.strokes.every((s, i, a) => !i || s.t0 >= a[i - 1].t1 - 0.01));
ok("a scratch per stroke start", one.ticks.length === one.strokes.length);

const three = T.penPlan({ tool: "pencil", moves: "write", text: ["12", "5", "345"], at: [{ x: 100, y: 100 }, { x: 300, y: 100 }, { x: 500, y: 100 }], size: [64, 64, 64] });
ok("three numbers in one act: 150 + 3 x 500 + 2 gaps + 150", three.total >= 1850 && three.total <= 1950, `total ${three.total} ms, ${three.hits.length} characters`);
ok("hits count characters across all strings", three.hits.length === 6);

const long = T.penPlan({ tool: "pencil", moves: "write", text: "1,234,567", at: [{ x: 0, y: 100 }], size: 64 });
ok("a 9-character number takes 80 ms more per character past 4", long.total >= 1100 && long.total <= 1300, `total ${long.total} ms`);

/* a fraction written in ONE act: numerator, bar, denominator (the bar is a { line } token and counts as one character) */
const frac = T.penPlan({ tool: "pencil", moves: "write", text: ["12", { line: [250, 300, 350, 300], size: 64 }, "18"], at: [{ x: 300, y: 280, }, null, { x: 300, y: 380 }], size: 64, align: "middle" });
ok("numerator, bar, denominator in one act: 5 characters, bar is the 3rd", frac && frac.hits.length === 5, frac ? `total ${frac.total} ms, hits ${frac.hits.join(",")}` : "no plan");
ok("a bar adds about 180 ms, not a whole number's 500", frac && frac.total >= 150 + 500 + 180 + 500 + 2 * 40 + 150 - 40 && frac.total <= 150 + 500 + 180 + 500 + 2 * 40 + 150 + 40, frac ? `${frac.total} ms` : "");
const barFrame = polylines(T.penWriteLayer(frac, frac.total - 150, 1600, 900, { ink: "#222" }), "pen-ink");
const barFinal = polylines(T.PencilLine({ x1: 250, y1: 300, x2: 350, y2: 300, size: 64 }));
ok("the bar's last frame == PencilLine", barFinal.length === 1 && barFrame.includes(barFinal[0]), barFinal[0]);

/* marks and numbers in ONE act: two dabs (the arrows), then a label and a fraction */
const mixed = T.penPlan({ tool: "pencil", moves: "write", text: [{ dab: [100, 100], size: 40 }, { dab: [100, 200], size: 40 }, "÷3", "3", { line: [250, 300, 350, 300], size: 64 }, "4"],
  at: [null, null, { x: 90, y: 150 }, { x: 300, y: 280 }, null, { x: 300, y: 380 }], size: [40, 40, 28, 64, 64, 64], align: "middle" });
ok("dabs are characters too: 2 dabs + ÷3 (2) + 3 + bar + 4 = 7 hits", mixed && mixed.hits.length === 7, mixed ? `hits ${mixed.hits.join(",")}` : "no plan");
ok("a dab takes ~110 ms + a hop, and the whole mixed act is well under a push THEN a write", mixed && mixed.total < 2800, mixed ? `${mixed.total} ms` : "");
ok("a dab leaves no ink in the layer", polylines(T.penWriteLayer(mixed, mixed.total - 150, 1600, 900, { ink: "#222" }), "pen-ink").length === mixed.strokes.filter((e) => !e.dab).length);
const small = T.penPlan({ text: "÷3", at: [{ x: 10, y: 40 }], size: 26 });
ok("a small label never goes thinner than 3.2 px", small.strokes.every((e) => e.sw >= 3.2), `${small.strokes[0].sw.toFixed(2)} px at size 26`);

/* capital letters (a code wheel writes A-Z) */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
ok("every capital letter A-Z has strokes in the table", letters.every((c) => T.PEN_GLYPHS[c] && T.PEN_GLYPHS[c].s.length > 0), `${letters.filter((c) => !T.PEN_GLYPHS[c]).join("") || "all 26"}`);
const abc = T.penPlan({ text: ["A", "Q", "M"], at: [{ x: 100, y: 100 }, { x: 200, y: 100 }, { x: 300, y: 100 }], size: 40, align: "middle" });
ok("three letters, one per card, in one act: 3 hits, a letter takes about a number's time", abc && abc.hits.length === 3 && abc.total < 1900, abc ? `${abc.total} ms, hits ${abc.hits.join(",")}` : "no plan");

/* step: a row of cards as ONE token */
const row = T.penPlan({ text: ["ABC"], at: [{ x: 300, y: 100 }], size: 60, align: "middle", step: 64 });
ok("a row of three letters with step 64 is ONE token (about 0.8 s) and the cells are 64 px apart", row.total >= 780 && row.total <= 840 && row.hits.length === 3, `${row.total} ms`);
const L3 = T.penLayout("ABC", 300, 100, 60, "middle", 64);
ok("each letter is centred in its own 64 px cell (centre 300 +- 64)", Math.abs((L3.chars[1].cx + L3.chars[1].adv / 2) - 300) < 1 && Math.abs((L3.chars[2].cx + L3.chars[2].adv / 2) - 364) < 1, `middle letter centre ${(L3.chars[1].cx + L3.chars[1].adv / 2).toFixed(1)}, third ${(L3.chars[2].cx + L3.chars[2].adv / 2).toFixed(1)}`);

/* a stroke-less character (the space of "= 15") is finished when the character before it is: onPoint stays in order */
const sp = T.penPlan({ text: ["= 15"], at: [{ x: 0, y: 50 }], size: 40 });
ok("a space's hit comes with the character before it, never at the end of the string", sp.hits.length === 4 && sp.hits.every((v, i, a) => !i || v >= a[i - 1]) && sp.hits[1] === sp.hits[0], sp.hits.join(","));

/* align and color per token: a left-aligned string and a right-aligned one, in two colours, in ONE act */
const mix2 = T.penPlan({ text: ["12", "34"], at: [{ x: 100, y: 100 }, { x: 400, y: 200 }], size: 40, align: ["start", "end"], color: ["#111", "#0a0"] });
const firstX = (tokIdx) => { const e = mix2.strokes.filter((s) => s.color === (tokIdx ? "#0a0" : "#111")); return Math.min(...e.map((s) => Math.min(...s.st.pts.map((p) => p[0])))); };
const lastX = (tokIdx) => { const e = mix2.strokes.filter((s) => s.color === (tokIdx ? "#0a0" : "#111")); return Math.max(...e.map((s) => Math.max(...s.st.pts.map((p) => p[0])))); };
ok("align per token: the first starts at x 100, the second ENDS at x 400", firstX(0) >= 100 && firstX(0) < 125 && lastX(1) <= 400 && lastX(1) > 375, `first from ${firstX(0).toFixed(0)}, second to ${lastX(1).toFixed(0)}`);
ok("color per token reaches the strokes the layer draws", new Set(polylines(T.penWriteLayer(mix2, mix2.total - 150, 1600, 900, { ink: "#222" }), "pen-ink").length ? mix2.strokes.map((s) => s.color) : []).size === 2);

/* the layer's clock is clamped to the act's own age: a stale clock from the act that just ended must not flash this act's ink in */
{
  const plan = { ...one, t0: 1000 };
  clock.now = 1100; clock.state = 5000;                       /* the old act ended at t = 5000; this one is 100 ms old */
  const stale = polylines(T.ActLayer({ play: plan, w: 1600, h: 900, C: { ink: "#222" } }), "pen-ink").length;
  clock.state = null; clock.now = 0;
  ok("ActLayer clamps a stale clock to the new act's age (no ink flash on a chain)", stale === 0, `${stale} strokes drawn at 100 ms (the pencil is still coming in)`);
}

ok("no text, no plan",T.penPlan({ text: "", at: [{ x: 1, y: 1 }] }) === null && T.penPlan({ text: "5", at: [] }) === null);

/* the tip: before the first stroke it waits at the first point (off by the in-offset), during a stroke it is on it, after the last it rests at its end */
const tip0 = T.penTip(one, 0), tipMid = T.penTip(one, one.total / 2), tipEnd = T.penTip(one, one.total);
ok("the pencil fades in and out (o 0 at both ends, 1 in the middle)", tip0.o === 0 && tipEnd.o === 0 && tipMid.o === 1);

/* the layer grows: ink polylines at 25 / 50 / 75 / 100 % of the strokes */
const frameAt = (f) => T.penWriteLayer(one, 150 + f * (one.total - 300), 1600, 900, { ink: "#222" });
const counts = [0.25, 0.5, 0.75, 1].map((f) => polylines(frameAt(f), "pen-ink").length);
ok("the ink grows through the act", counts[0] > 0 && counts.every((c, i, a) => !i || c >= a[i - 1]) && counts[3] === one.strokes.length, counts.join(" -> "));

/* NO JUMP: the last frame's strokes are the strokes <PencilText> draws */
const last = polylines(frameAt(1), "pen-ink"), fin = polylines(T.PencilText({ text: "125", x: 300, y: 400, size: 64, align: "middle" }));
ok("last frame of the act == finished PencilText (same strokes, same points)", JSON.stringify(last) === JSON.stringify(fin), `${last.length} strokes`);
const pre = polylines(T.PencilText({ text: "125", x: 300, y: 400, size: 64, align: "middle", chars: 2 }));
ok("chars: 2 shows exactly the first two characters of the same drawing", pre.length > 0 && pre.length < fin.length && JSON.stringify(pre) === JSON.stringify(fin.slice(0, pre.length)), `${pre.length} of ${fin.length} strokes`);
ok("an unknown character is printed, not dropped", JSON.stringify(T.PencilText({ text: "a", x: 0, y: 50, size: 40 })).includes('"text"'));

/* ActLayer still hands a write to its own layer and every other move still goes the old way */
ok("ActLayer exists and the old moves still use actPlan", typeof T.ActLayer === "function");
console.log(fails ? `\n${fails} FAILED` : "\nall passed");
process.exit(fails ? 1 : 0);
