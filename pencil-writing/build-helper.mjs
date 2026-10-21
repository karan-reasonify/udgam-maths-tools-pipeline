/* Builds the new ACTION_KIT_HELPER block: the r29 block (byte-identical to r28's and the head's) plus the pencil `write` move.
   Every change to the old block is an exact-string edit that must match exactly once, so a block that is not the one we know fails loudly.
   Writes helper.new.tsx (the commented block, for the head runtime later) and exports buildNewBlock() for apply.mjs.
   node pencil-writing/build-helper.mjs */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HERE, CLASS4, START, END, read, blockOf, md5 } from "./lib.mjs";

const OLD_MD5 = "163163068d9c10c13f09c2712c3c6f15";   /* the known helper block of r28, r29 and the head (13199 characters) */

/* [what it does, old text, new text] */
const EDITS = [
  ["moves list names write",
    "   draw | rub | tap | push | carry | sweep. The tool comes in",
    "   draw | rub | tap | push | carry | sweep | write (the pencil WRITES a number, stroke by stroke: PENCIL WRITING at the end of this block). The tool comes in"],
  ["actPlan routes write to penPlan",
    "function actPlan(o) {\n  const move = String(o.moves || o.move || \"tap\")",
    "function actPlan(o) {\n  if (String(o.moves || o.move || \"\") === \"write\") return penPlan(o);\n  const move = String(o.moves || o.move || \"tap\")"],
  ["ActLayer draws a write with its own layer",
    "  const q = actPose(play, t), d = q.u >= 0 ?",
    /* t is this layer's own clock: when one act REPLACES another in the same tick React keeps the old act's t for one frame, so clamp it to the new act's age */
    "  if (play.move === \"write\") return penWriteLayer(play, Math.min(t, performance.now() - play.t0), w, h, C);\n  const q = actPose(play, t), d = q.u >= 0 ?"],
  ["reduced motion runs every character's onPoint",
    "if (p) p.at.forEach((_, i) => hit(i)); resolve(true); return; }",
    "if (p) (p.move === \"write\" ? p.hits : p.at).forEach((_, i) => hit(i)); resolve(true); return; }"],
  ["a write sounds at each stroke's start and holds no beat",
    "    if (fx && p.travel) c.timers.push(setTimeout(() => fx(), ACT_IN));\n" +
    "    p.hits.forEach((ms, i) => c.timers.push(setTimeout(() => { hit(i); if (pen) tick(); else if (fx && !p.travel) fx(); }, ms)));\n" +
    "    c.timers.push(setTimeout(() => end(true), p.total + (pen ? ACT_BEAT : 0)));",
    "    const writing = p.move === \"write\";   /* a written number: the scratch sounds at each stroke's start, and no beat is held after it */\n" +
    "    if (fx && p.travel) c.timers.push(setTimeout(() => fx(), ACT_IN));\n" +
    "    if (writing) p.ticks.forEach((ms) => c.timers.push(setTimeout(tick, ms)));\n" +
    "    p.hits.forEach((ms, i) => c.timers.push(setTimeout(() => { hit(i); if (writing) return; if (pen) tick(); else if (fx && !p.travel) fx(); }, ms)));\n" +
    "    c.timers.push(setTimeout(() => end(true), p.total + (pen && !writing ? ACT_BEAT : 0)));"],
];

export function buildNewBlock() {
  const old = blockOf(read(path.join(CLASS4, "runtime", "frozen", "r29", "runtime.tsx"))).replace(/\r\n/g, "\n");
  if (md5(old) !== OLD_MD5) throw new Error(`the r29 helper block is not the one this patch was written for (md5 ${md5(old)})`);
  let b = old;
  for (const [what, from, to] of EDITS) {
    const n = b.split(from).length - 1;
    if (n !== 1) throw new Error(`edit "${what}" matches ${n} times (must be exactly 1)`);
    b = b.replace(from, () => to);
  }
  const core = read(path.join(HERE, "pen-core.js")).replace(/\r\n/g, "\n").trimEnd();
  const render = read(path.join(HERE, "pen-render.tsx")).replace(/\r\n/g, "\n").trimEnd();
  const tail = "\n" + END;
  if (!b.endsWith(tail)) throw new Error("the block does not end with the end marker");
  b = b.slice(0, -tail.length) + "\n" + core + "\n" + render + tail;
  return { oldBlock: old, newBlock: b, edits: EDITS.map((e) => e[0]) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { oldBlock, newBlock, edits } = buildNewBlock();
  fs.writeFileSync(path.join(HERE, "helper.new.tsx"), newBlock + "\n");
  console.log(`old block ${oldBlock.length} chars, ${oldBlock.split("\n").length} lines (md5 ${md5(oldBlock).slice(0, 8)})`);
  console.log(`new block ${newBlock.length} chars, ${newBlock.split("\n").length} lines (md5 ${md5(newBlock).slice(0, 8)})`);
  console.log(`${edits.length} exact edits to the old block, then pen-core.js + pen-render.tsx appended:`);
  for (const e of edits) console.log("  - " + e);
  console.log("wrote pencil-writing/helper.new.tsx");
}
