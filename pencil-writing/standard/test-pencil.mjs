/* Tests lib/check/pencil.mjs (the canonical copy is standard/pencil.mjs). node pencil-writing/standard/test-pencil.mjs */
import { pencilRows, pencilActs, actCalls } from "./pencil.mjs";
import { TOOLS, pairPath, read } from "../lib.mjs";

let fails = 0;
const ok = (name, cond, extra = "") => { console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`); if (!cond) fails++; };
const row = (src, o) => pencilRows(src, o)[0] || null;
const NEW = { caps: { pencilWrite: true }, strict: true }, OLDCH = { caps: { pencilWrite: true }, strict: false }, NOCAP = { caps: {}, strict: false };

const good = `
  const go = async () => {
    // a comment: api.act({ tool: "pencil", moves: "push" }) must not count
    await api.act({ tool: "pencil", moves: "write", text: [String(n), { line: [x1, y, x2, y], size: s }, { dab: [mx, my], size: s }, String(d)], at: [pn, null, null, pd], size: [s, s, s, s], align: "middle", onPoint: (j) => { put({ pc: j + 1, a: [1, 2, 3] }); } });
    await api.act({ tool: "pencil", moves: fast ? "draw" : "push", marks: true, at: pts, onPoint: (j) => put({ shade: (j + 1) / N }) });
    await api.act({ tool: "knife", moves: "slice", at: cuts });
    await api.act({ moves: "tap", at: [p] });
    const msg = \`a } template, with commas and "quotes" \${a.b({c: 1})} api.act(\`;
  };`;
ok("a good strict tool passes", row(good, NEW)?.level === "pass", row(good, NEW)?.msg.slice(0, 110));
ok("the comment's api.act is ignored and knife / hand acts are not pencil acts", pencilActs(good).acts.length === 2, `${pencilActs(good).acts.length} pencil acts, ${actCalls(good).length} api.act calls`);
ok("a ternary of two literals with marks: true is fine", pencilActs(good).acts[1].kind === "marks" && pencilActs(good).acts[1].moves.join() === "draw,push");

const bad = (s, o = NEW) => row(s, o);
ok("strict: a pencil push without marks FAILS and says what to do", bad(`api.act({ tool: "pencil", moves: "push", at: pts, onPoint: () => {} })`)?.level === "fail" && /marks: true/.test(bad(`api.act({ tool: "pencil", moves: "push", at: pts })`).msg));
ok("strict: moves computed (a variable) FAILS", bad(`api.act({ tool: "pencil", moves: kind, at: pts })`)?.level === "fail");
ok("strict: a write without text FAILS", bad(`api.act({ tool: "pencil", moves: "write", at: [p], size: 40 })`)?.level === "fail");
ok("strict: a write without at FAILS", bad(`api.act({ tool: "pencil", moves: "write", text: "5", size: 40 })`)?.level === "fail");
ok("strict: a write that also says marks FAILS", bad(`api.act({ tool: "pencil", moves: "write", marks: true, text: "5", at: [p], size: 40 })`)?.level === "fail");
ok("strict: a write with ms is a WARN", bad(`api.act({ tool: "pencil", moves: "write", text: "5", at: [p], size: 40, ms: 700 })`)?.level === "warn");
ok("strict: a write with no size is a WARN", bad(`api.act({ tool: "pencil", moves: "write", text: "5", at: [p] })`)?.level === "warn");
ok("strict: a shorthand tool is not a literal: unclassified, not a pass for a pencil", /cannot be classified/.test(bad(`const tool = "pencil"; api.act({ tool, moves: "push", at })`)?.msg || "") || bad(`const tool = "pencil"; api.act({ tool, moves: "push", at })`) === null);
ok("strict: spread props are unclassified (INFO text on a pass of the rest)", /cannot be classified/.test(bad(`api.act({ tool: "pencil", moves: "write", text: "1", at: [p], size: 9 }); api.act({ ...opts })`)?.msg || ""));
ok("a chapter fetched earlier (not strict) with the move: INFO only, never a fail", row(`api.act({ tool: "pencil", moves: "push", at: pts })`, OLDCH)?.level === "info");
ok("not strict and no pencil act: no row", row(`api.act({ tool: "knife", moves: "slice", at })`, OLDCH) === null);
ok("a runtime WITHOUT the move and a tool that does not write: no row at all", row(`api.act({ tool: "pencil", moves: "push", at: pts })`, NOCAP) === null);
ok("a runtime without the move and a tool that WRITES: FAIL", row(`api.act({ tool: "pencil", moves: "write", text: "5", at: [p], size: 40 })`, NOCAP)?.level === "fail");
ok("a runtime without the move and a tool that uses <PencilText>: FAIL", row(`return <PencilText text="5" x={1} y={2} size={40} />;`, NOCAP)?.level === "fail");
ok("a tool with no api.act at all: no row", row(`const x = 1;`, NEW) === null);

/* the seven real pairs: the parser finds exactly the pencil acts a plain text search finds in the tool region, whatever their shape */
let seenKinds = {};
for (const [ch, id] of TOOLS) {
  const text = read(pairPath(ch, id)), a = text.indexOf("const TOOL_NAME"), tool = a < 0 ? "" : text.slice(a);
  const naive = (tool.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "").match(/tool:\s*"pencil"/g) || []).length;
  const found = pencilActs(tool).acts;
  for (const x of found) seenKinds[x.kind] = (seenKinds[x.kind] || 0) + 1;
  ok(`ch${ch} ${id}: every tool: "pencil" call is found (${naive})`, found.length === naive, `parser ${found.length}: ${found.map((x) => x.kind).join(",")}`);
}
console.log("kinds across the seven pairs:", JSON.stringify(seenKinds));
console.log(fails ? `\n${fails} FAILED` : "\nall passed");
process.exit(fails ? 1 : 0);
