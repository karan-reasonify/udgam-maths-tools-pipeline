/* node lib/check/questionstays.test.mjs */
import assert from "node:assert/strict";
import { cueLines, questionStaysRows } from "./questionstays.mjs";
const n = (s) => cueLines(s).length;
assert.equal(n(`api.say("Now tap the Answer key.");`), 1, "api.say cue");
assert.equal(n(`if (kind === "tag") api.say("Now tap mL or L.");`), 0, "a unit cue is not in the list");
assert.equal(n(`const line = opened ? item.choices ? "Choose your answer." : "Now type your answer and then press Enter." : "Now tap the Answer key.";`), 3, "ternary branches");
assert.equal(n(`api.say(item.choices ? "Choose your answer." : "Type your answer, then press Enter.");`), 2, "ternary in api.say");
assert.equal(n(`const TR = { hi: { "Now tap the Answer key.": "अब", "Choose your answer.": "x" } };`), 0, "TR keys are translations");
assert.equal(n(`api.say("Type your answer first."); api.say("Type how many for each, then press Enter.");`), 0, "a locked-key nudge and a what-to-type line pass");
assert.equal(n(`// api.say("Now tap the Answer key.")\n/* api.say("Tap the Answer key.") */`), 0, "comments do not count");
assert.equal(n(`api.say(item.say || item.ask);`), 0, "the question passes");
assert.equal(questionStaysRows(`api.say("Tap the Answer key.");`, { strict: true })[0].level, "fail");
assert.equal(questionStaysRows(`api.say("Tap the Answer key.");`)[0].level, "warn");
assert.equal(questionStaysRows(`api.say(item.say);`)[0].level, "pass");
console.log("questionstays.test.mjs ok");
