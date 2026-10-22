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

console.log("design.test: ok");
