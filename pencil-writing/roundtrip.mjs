/* Proof that the swap is safe BEFORE any new code: the r29 helper block, printed the way the port prints it, must equal the span every pair
   carries, and putting it back must leave each pair byte-identical. Writes nothing. */
import fs from "node:fs";
import path from "node:path";
import { CLASS4, TOOLS, pairPath, read, blockOf, printed, spanOf, md5 } from "./lib.mjs";
import { buildNewBlock } from "./build-helper.mjs";

const rt = (n) => path.join(CLASS4, "runtime", "frozen", n, "runtime.tsx");
const blocks = { r28: blockOf(read(rt("r28"))), r29: blockOf(read(rt("r29"))), head: blockOf(read(path.join(CLASS4, "runtime", "runtime.tsx"))) };
console.log("blocks", Object.entries(blocks).map(([k, v]) => `${k}:${md5(v).slice(0, 8)}`).join(" "), "(identical:", new Set(Object.values(blocks).map(md5)).size === 1, ")");

const old = await printed(blocks.r29);   /* the markers and every comment are comments: the printer drops them, as the port does */
console.log("printed old helper:", old.length, "chars,", old.split("\n").length, "lines, md5", md5(old).slice(0, 8));

const { newBlock } = buildNewBlock(), newPrinted = await printed(newBlock);
let bad = 0;
for (const [ch, id] of TOOLS) {
  const f = pairPath(ch, id), text = read(f), sp = spanOf(text);
  if (text.includes(newPrinted)) { console.log(`ch${ch} ${id}: already carries the new block (patched)`); continue; }
  if (!sp) { console.log(`ch${ch} ${id}: NO SPAN`); bad++; continue; }
  const slice = text.slice(sp.start, sp.end);
  const same = slice === old;
  const back = text.slice(0, sp.start) + old + text.slice(sp.end);
  console.log(`ch${ch} ${id}: span ${slice.length} chars lines ${slice.split("\n").length}; equals printed r29: ${same}; round trip byte-identical: ${back === text}`);
  if (!same) {
    bad++;
    const a = slice.split("\n"), b = old.split("\n");
    let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
    console.log("   first difference at line", i + 1, "\n   pair>", (a[i] || "").slice(0, 160), "\n   old >", (b[i] || "").slice(0, 160));
  }
}
console.log(bad ? `PROBLEM: ${bad} pair(s) do not match` : "every pair carries exactly the printed r29 helper or the new block (none in an unknown state)");
process.exit(bad ? 1 : 0);
