/* MISS HIDES THE ANSWER, the pure half: node lib/check/misshides.test.mjs (no browser). The play itself is proved by a harness on a real tool. */
import assert from "node:assert/strict";
import { answerFormsOf, judgeMissHides, missHidesRows } from "./misshides.mjs";

/* forms */
assert.deepEqual(answerFormsOf(45000).forms, ["45000", "45,000"], "a number and its comma form");
assert.deepEqual(answerFormsOf("0.09").rows, ["0.09"], "a decimal as written");
assert.equal(answerFormsOf(7).rows.length, 0, "a single digit is its own text, no row");
assert.deepEqual(answerFormsOf([16, 1]).parts, ["16", "1"], "two parts");
assert.deepEqual(answerFormsOf([5, null, null]).forms, ["5"], "a mixed number with only its whole part is a number");
assert.equal(answerFormsOf("yes").judged, "tag", "a word answer: tags only");
assert.equal(answerFormsOf(12, { choice: true }).judged, "tag", "a choice: tags only");

const play = (rec, extra = {}) => ({ plays: [{ tag: "q1", show: "12", parts: [], misses: [{ how: "real keys" }], rec, ...extra }] });
const K = (n, t, desc) => ({ n, t, desc });
/* the question's own number at the open question is the baseline */
assert.equal(judgeMissHides(play({ ask: { keys: { "TXT|work|Build 12": K(1, 0, "Build 12") } }, miss1: { keys: { "TXT|work|Build 12": K(1, 40, "Build 12") } } })).length, 0, "a build target is not a reveal");
/* a new text naming the answer, at any moment of the miss */
assert.equal(judgeMissHides(play({ ask: { keys: {} }, miss1: { keys: { "TXT|work|= 12": K(1, 330, "= 12") } } })).length, 1, "a flash of the answer fails");
/* a tag on show */
assert.equal(judgeMissHides(play({ ask: { keys: {} }, "miss2+": { keys: { "TAG|<circle>": K(1, 900, "<circle>") } } })).length, 1, "a data-reveals tag fails");
/* a digit row is judged once the correction is over */
assert.equal(judgeMissHides(play({ ask: { keys: {} }, miss1: { keys: { "ROW|work|12": K(1, 120, "1 2") } } })).length, 0, "a count passing 1, 2 is not a reveal");
assert.equal(judgeMissHides(play({ ask: { keys: {} }, "miss1+": { keys: { "ROW|work|12": K(1, 1300, "1 2") } } })).length, 1, "a row left spelling the answer fails");
/* every part new */
assert.equal(judgeMissHides(play({ ask: { keys: {} }, miss1: { keys: { "PART|16|work|16": K(1, 80, "16"), "PART|1|work|1": K(1, 90, "1") } } }, { parts: ["16", "1"] })).length, 1, "both parts printed fails");
assert.equal(judgeMissHides(play({ ask: { keys: {} }, miss1: { keys: { "PART|16|work|16": K(1, 80, "16") } } }, { parts: ["16", "1"] })).length, 0, "one part is the working");
/* tries are unlimited: the tool never wins or moves on for the child */
assert.equal(judgeMissHides(play({ ask: { keys: {} }, miss1: { keys: {} } }, { moved: "after wrong answer 2 the question did not open again" })).length, 1, "a correction that answers for the child fails");
/* the rows */
assert.equal(missHidesRows({ strict: false })[0].level, "info", "a chapter without the key: INFO");
assert.equal(missHidesRows({ strict: true, rec: { error: "boom" } })[0].level, "fail", "a run that fails is a FAIL");
assert.equal(missHidesRows({ strict: true, rec: { plays: [], notes: ["question 1: not reached open"] } })[0].level, "warn", "nothing played: WARN");
assert.equal(missHidesRows({ strict: true, rec: play({ ask: { keys: {} }, miss1: { keys: {} } }) })[0].level, "pass", "nothing shown: PASS");
console.log("misshides.test.mjs ok");
