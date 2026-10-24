/* The design pass's printed-text guard, on inline samples (no browser, no Gemini, no chapter): node class4/lib/design/design.test.mjs
   Gemini once turned "bigger" into "meger" and "before" into "me fore" in the tool's own sentences; no syntax check sees that. */
import assert from "node:assert/strict";
import { lostPrintedStrings, restorePrintedStrings } from "./design.mjs";

const SRC = [
  'const TR = {',
  '  "Which jump is bigger, the one to 36 or the one to 49?": "कौन सी छलाँग बड़ी है?",',
  '  "Work the line out in full before you trust the jumps.": "छलाँगों पर भरोसा करने से पहले।",',
  '};',
  'const ladder = ["Work the line out in full before you trust the jumps."];',
  'const style = { boxShadow: "0 4px 8px rgba(0,0,0,0.2)", fill: "#FFFFFF" };',
].join("\n");

// 1) the real damage pattern: restored to the identical text, in every table the sentence sits in
const damaged = SRC.replace(/bigger/g, "meger").replace(/before/g, "me fore");
assert.equal(lostPrintedStrings(SRC, damaged).length, 2);
assert.equal(restorePrintedStrings(SRC, damaged), SRC);

// 2) undamaged text, and a styling-only change, are left alone and never reported
assert.equal(restorePrintedStrings(SRC, SRC), SRC);
assert.equal(lostPrintedStrings(SRC, SRC.replace("#FFFFFF", "#FFFDF8").replace("0 4px 8px", "0 2px 6px")).length, 0);

// 3) an intact copy must not hide a damaged one (the sentence sits twice: only one copy is broken)
const oneCopy = SRC.replace('const ladder = ["Work the line out in full before', 'const ladder = ["Work the line out in full me fore');
assert.equal(lostPrintedStrings(SRC, oneCopy).length, 1);
assert.equal(restorePrintedStrings(SRC, oneCopy), SRC);

// 4) a sentence truly rewritten is NOT guessed at: it stays reported, so the pass reverts
const rewritten = SRC.replaceAll("Work the line out in full before you trust the jumps.", "Finish the whole line first, only then believe the jumps.");
assert.ok(lostPrintedStrings(SRC, restorePrintedStrings(SRC, rewritten)).length > 0);

// 4b) code between two attribute strings is never a sentence (a changed font size once reverted a good pass), while a damaged
//     sentence in single quotes, a template or JSX text is now caught too
const ATTR = 'const a = <text textAnchor="end" x={sw - 40} y={T.xl - 12} fontWeight={700} fill="#2B2B2B">{tx(sp)}</text>;';
assert.equal(lostPrintedStrings(ATTR, ATTR.replace("T.xl - 12", "T.xl - 16")).length, 0);
const OTHER = "const b = 'Read down the answers first.';\nconst c = <g><text>Count the jumps again</text></g>;\nconst d = `Write the next total now`;";
assert.equal(lostPrintedStrings(OTHER, OTHER.replace("answers", "anwsers").replace("jumps again", "jumps agian").replace("next total", "nxt total")).length, 3);

// ---- the skin guard (skins.mjs): pictures arrive only through <Skin>, never dropped, never invented
import { skinProblems, skinNames, madeImages, unusedSkinKeys } from "./skins.mjs";
const TOOL = 'const TOOL_IMAGES: Record<string, string> = {};\nconst a = <g><circle r={20}/><Skin name="counter" x={1} y={2} w={40} h={40} fit="stretch" /></g>;';
const keys = ["counter", "jug"];

// 5) a faithful pass, or one that adds a made picture, is kept
assert.deepEqual(skinProblems(TOOL, TOOL, { keys, allowed: true }), []);
assert.deepEqual(skinProblems(TOOL, TOOL + '\nconst b = <Skin name="jug" x={0} y={0} w={9} h={9} />;', { keys, allowed: true }), []);
assert.deepEqual(skinNames(TOOL + '<Skin name={"jug"} />'), ["counter", "jug"]);

// 6) dropped skins, an invented key, a raster, a URL, a changed TOOL_IMAGES: each is refused
assert.equal(skinProblems(TOOL, TOOL.replace(/<Skin[^>]*\/>/, ""), { keys, allowed: true }).length, 1);
assert.equal(skinProblems(TOOL, TOOL + '<Skin name="unicorn" />', { keys, allowed: true }).length, 1);
assert.equal(skinProblems(TOOL, TOOL + '<image href="x.png" />', { keys, allowed: true }).length >= 2, true);
assert.equal(skinProblems(TOOL, TOOL + 'const u = "https://x.test/a.png";', { keys, allowed: true }).length, 1);
assert.equal(skinProblems(TOOL, TOOL.replace("= {};", "= { a: 1 };").replace("const TOOL_IMAGES", "const TOOL_IMAGES"), { keys, allowed: true }).length, 0); // body of the map is not compared, its declaration is
assert.equal(skinProblems(TOOL, TOOL + "\nconst TOOL_IMAGES = 1;", { keys, allowed: true }).length, 1);

// 7) a runtime with no Skin: the skins must neither grow nor shrink
assert.equal(skinProblems(TOOL, TOOL + '<Skin name="jug" />', { keys, allowed: false }).length, 1);
assert.deepEqual(skinProblems(TOOL, TOOL, { keys, allowed: false }), []);

// 8) made pictures only; and a picture nobody draws is listed
assert.deepEqual(madeImages({ images: [{ key: "a", made: { w: 1 } }, { key: "b" }, { made: {} }] }).map((i) => i.key), ["a"]);
assert.deepEqual(unusedSkinKeys(TOOL, keys), ["jug"]);

// 9) the skin follow-up prompt asks for the skins and nothing else
import { buildSkinPrompt } from "./prompts.mjs";
const sp = buildSkinPrompt({ tsx: "const x = 1;", images: [{ key: "counter", object: "wooden button", kind: "tile" }] });
assert.ok(sp.includes('"counter"') && sp.includes("Change NOTHING else") && sp.includes("LAYER ORDER"));

// 10) the mount-repair prompt carries the page's error and forbids any other change
import { buildMountRepairPrompt } from "./prompts.mjs";
const mp = buildMountRepairPrompt({ tsx: "const x = 1;", error: "ReferenceError: Cannot access 'a' before initialization" });
assert.ok(mp.includes("before initialization") && mp.includes("Fix ONLY this error"));

// 11) the held-back blocks (scope.mjs): TR, PHASES, MODEL, the maths and the component never travel, and come back byte for byte
import { scopeTool, spliceTool, parseError } from "./scope.mjs";
const T2 = [
  'const TOOL_ID = "t";',
  'const CHROME = { ink: "#222" };',
  'const TR: any = { hi: { "Read down the answers.": "उत्तर पढ़ो।" } };',
  'const PHASES = [{ n: 1, items: [{ ask: "Read down the answers.", answer: 4 }] }];',
  'const MODEL = { pic: 1 };',
  'const judge = (item: any, v: any) => v === item.answer;',
  'function Work({ item }: any) { return <text fill={CHROME.ink}>{item.ask}</text>; }',
  'function Tool(props: any) { return <ToolFrame tool={{ TR, PHASES, MODEL, judge, Work }} />; }',
  'export default Tool;',
].join("\n");
const sc = scopeTool(T2);
assert.equal(sc.frozen.length, 6);                                          // TOOL_ID TR PHASES MODEL judge Tool; CHROME and Work travel
assert.ok(!sc.scoped.includes("उत्तर") && !sc.scoped.includes("v === item.answer") && sc.scoped.includes("function Work") && sc.scoped.includes("#222"));
assert.ok(/PHASES: .*1 phases of 1 items; .*item fields ask, answer/.test(sc.scoped) && /MODEL: .*fields pic/.test(sc.scoped));
assert.equal(parseError(sc.scoped), "");
assert.equal(spliceTool(sc.scoped, sc.frozen).src, T2);                     // untouched reply: the original, byte for byte
const restyled = sc.scoped.replace("#222", "#1B1B1B").replace("<text ", "<text fontWeight={700} ");
assert.equal(spliceTool(restyled, sc.frozen).src, T2.replace("#222", "#1B1B1B").replace("<text ", "<text fontWeight={700} "));
// a placeholder dropped, repeated or moved past another is refused, never spliced partly
const marks = sc.scoped.match(/\/\*@@KEEP \d+@@[^*]*\*\//g);
assert.match(spliceTool(sc.scoped.replace(marks[2], ""), sc.frozen).error, /missing 2/);
assert.match(spliceTool(sc.scoped + "\n" + marks[1], sc.frozen).error, /repeated/);
assert.match(spliceTool(sc.scoped.replace(marks[1], "@@A").replace(marks[2], marks[1]).replace("@@A", marks[2]), sc.frozen).error, /reordered/);
// a scoped reply that does not parse names its error; a tool with nothing to hold back is sent whole
assert.ok(parseError(sc.scoped.replace("function Work({ item }: any) {", "function Work({ item }: any) {{")) !== "");
assert.deepEqual(scopeTool("const a = 1;"), { scoped: "const a = 1;", frozen: [] });

// 12) words the pass ADDED are named (a NOTE, not a revert); a new gradient id, CSS or a template piece of CSS is not a word
import { addedPrintedText } from "./design.mjs";
const W0 = '<text>{"+" + j}</text>;';
assert.deepEqual(addedPrintedText(W0, '<text>{"Check: +" + j}</text>;'), ["Check: +"]);
assert.deepEqual(addedPrintedText(W0, '<text>{" animate / +" + j}</text>;'), [" animate / +"]);
assert.deepEqual(addedPrintedText(W0, '<g filter="url(#plShadow)"><linearGradient id="plShadow" /><text style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.06))", clipPath: `circle(${r}px at ${x}px)` }}>{"+" + j}</text></g>;'), []);

// 13) the design prompt: the invariant part first, byte-identical for every tool of a class; the tool's own text only after it
import { buildDesignPrompt } from "./prompts.mjs";
const pA = buildDesignPrompt({ tsx: "TSX_A", brief: "BRIEF_A", toolName: "TOOL_A", slotId: "SLOT_A", layoutRules: "LAYOUT", images: [{ key: "counter", object: "button", kind: "tile" }], skinAllowed: true });
const pB = buildDesignPrompt({ tsx: "TSX_B", brief: "BRIEF_B", toolName: "TOOL_B", slotId: "SLOT_B", layoutRules: "LAYOUT", images: [], skinAllowed: false });
const cut = pA.indexOf("===== THIS TOOL =====");
assert.ok(cut > 0 && pA.slice(0, cut) === pB.slice(0, cut) && pA.includes("@@KEEP") && pA.includes("LAYER ORDER"));
for (const per of ["TSX_A", "BRIEF_A", "TOOL_A", "SLOT_A", '"counter"']) assert.ok(pA.indexOf(per) > cut, per);
assert.ok(pB.slice(cut).includes("has no \`Skin\`".replace(/\\/g, "")));

// 14) a meaning colour the pass takes off the screen is named (mount.mjs); a colour that moves, or only lightens, is not
import { hueBands, lostColours } from "./mount.mjs";
const frame = (paint) => ({ w: 400, h: 200, at: (x, y) => paint(x, y) || [255, 253, 247] });           // paper, with what `paint` draws
const BLUE = [0, 99, 166], GREY = [128, 132, 120], LIGHT = [70, 140, 200];
const at = (x0, y0, c) => (x, y) => (x >= x0 && x < x0 + 80 && y >= y0 && y < y0 + 80 ? c : null);
const B0 = hueBands(frame(at(10, 10, BLUE)));
assert.equal(lostColours(B0, hueBands(frame(at(10, 10, GREY)))).length, 1);                            // blue counters turned grey
assert.match(lostColours(B0, hueBands(frame(at(10, 10, GREY))))[0], /^blue: \d+ px gone near/);
assert.deepEqual(lostColours(B0, hueBands(frame(at(300, 100, BLUE)))), []);                            // moved: not lost
assert.deepEqual(lostColours(B0, hueBands(frame(at(10, 10, LIGHT)))), []);                             // a lighter blue is still blue
assert.deepEqual(lostColours(hueBands(frame(at(10, 10, BLUE))), hueBands(frame(() => null)), { min: 99999 }), []); // too small to name
assert.deepEqual(lostColours(B0, B0), []);

console.log("design.test: ok");
