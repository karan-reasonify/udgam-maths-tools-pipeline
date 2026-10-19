import { play, h, ID, CH, SAMPLER, comp, guide, ctr, mk, dot, clickNth, clickAt } from "./lib.mjs";
const path = process.argv[2] || "next";           /* next | goto */
const WRONG = (ph) => ph === 1 ? async (t) => { await h.clickControl(t, "answer-open"); await t.wait(300); await h.clickControl(t, "choice-much"); }
                                : async (t) => { const near = { 2: "0", 3: "1.25", 4: "25" }[ph]; await h.typeAnswer(t, near); };
const out = [];
for (const ph of [1, 2, 3, 4]) {
  /* the clean board of question 3 on a fresh mount */
  const ref = await play({ id: ID, ch: CH, phase: ph, nextKey: true, motion: true }, async (t) => {
    await t.wait(800); await t.eval(SAMPLER); await guide(t, 4); await t.wait(2700);
    await h.gotoQuestion(t, ph, 3); await t.wait(1500);
    const s = await t.eval("window.__samp.slice(-1)")[0]; const g = await t.state();
    return { txt: (await t.eval("window.__samp.slice(-1)"))[0].s.txt, labels: g.labels, counted: g.counted, answerShown: g.answerShown };
  });
  const r = await play({ id: ID, ch: CH, phase: ph, nextKey: true, motion: true }, async (t) => {
    const log = [];
    await t.wait(800); await t.eval(SAMPLER); await guide(t, 4); await t.wait(2700);
    await h.gotoQuestion(t, ph, 2); await t.wait(600);
    await WRONG(ph)(t); await t.wait(700);
    const g0 = await t.state();
    await t.eval("window.__samp.splice(0)");
    if (path === "next") log.push("next() -> " + await t.eval("window.toolApi.next()")); else log.push("gotoStep -> " + JSON.stringify(await h.gotoQuestion(t, ph, 3)).slice(0, 40));
    /* getState on the first frames of Q3 */
    const gs = [];
    for (let k = 0; k < 8; k++) { const g = await t.state(); gs.push({ it: g.item, st: g.stage, tries: g.tries, typed: g.typed, answerShown: g.answerShown, counted: g.counted, labels: g.labels }); await t.wait(500); }
    const s = await t.eval("window.__samp.splice(0)");
    const q3 = s.filter(x => x.s.it === 3 && x.s.st === "ask");
    const leaks = q3.filter(x => x.s.txt !== ref.txt).filter((x, i, a) => i === 0 || x.s.txt !== a[i - 1].s.txt);
    log.push(`P${ph} ${path}: Q3 ask frames=${q3.length}; frames whose text differs from a fresh Q3 board (${ref.txt.slice(0, 40)}): ${leaks.length}`);
    leaks.slice(0, 7).forEach(x => log.push(`     ${x.t}ms tries=${x.s.tries} txt=${x.s.txt.slice(0, 110)}`));
    log.push(`   getState samples (every 500ms): ` + gs.map(x => `[${x.st} tries=${x.tries} shown=${x.answerShown} counted=${x.counted}]`).slice(0, 5).join(" "));
    log.push("   errors " + JSON.stringify(t.errors()));
    return log;
  });
  out.push(...r);
}
console.log(out.join("\n"));
