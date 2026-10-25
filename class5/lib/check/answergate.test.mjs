/* node class5/lib/check/answergate.mjs tests: node class5/lib/check/answergate.test.mjs */
import assert from "node:assert/strict";
import { answerGateRows } from "./answergate.mjs";

const trace = `  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run([[600, () => {}]], () => api.lock(false));
  }, [wrong]);`;
const gate = `  useEffect(() => { if (needsAct && user && touched) api.lock(true); else api.lock(false); }, [needsAct, touched]);`;
const lvl = (s) => answerGateRows(s)[0].level;

assert.equal(lvl(`function Work(){\n${trace}\n}`), "warn", "only the skeleton traceback lock: ungated");
assert.equal(lvl(`function Work(){\n${trace}\n${gate}\n}`), "pass", "a gate beside the traceback");
assert.equal(lvl(`function Work(){\n// api.lock(true)\n/* api.lock(false) */\n${trace}\n}`), "warn", "comments do not count");
assert.equal(lvl(`function Work(){ api.lock(true); }`), "pass", "an edited traceback is not stripped: a missed warn, never a false one");
console.log("answergate.test.mjs ok");
