/* argv -> { _: [positionals], key: value | true }.
 * Accepts --key value, --key=value and bare --flag. A flag named in `booleans` never
 * swallows the next word. An absent flag has NO value: the old pipeline once read
 * argv[indexOf(flag) + 1] for a missing flag, got argv[0], and ran the wrong tool.
 */
export function parseArgs(argv, booleans = []) {
  const bool = new Set(booleans);
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) { out._.push(a); continue; }
    const eq = a.indexOf("=");
    if (eq > 2) { out[a.slice(2, eq)] = a.slice(eq + 1); continue; }
    const key = a.slice(2);
    const next = argv[i + 1];
    if (!bool.has(key) && next !== undefined && !next.startsWith("--")) { out[key] = next; i++; }
    else out[key] = true;
  }
  return out;
}

/* "1,2,5-7" -> [1, 2, 5, 6, 7] */
export function chapterList(spec) {
  if (spec === undefined || spec === true) return [];
  const out = [];
  for (const part of String(spec).split(",").map((s) => s.trim()).filter(Boolean)) {
    const m = /^(\d+)\s*-\s*(\d+)$/.exec(part);
    if (m) for (let n = Number(m[1]); n <= Number(m[2]); n++) out.push(n);
    else if (/^\d+$/.test(part)) out.push(Number(part));
    else throw new Error(`bad chapter list "${spec}" (use 1,2 or 1-3)`);
  }
  return [...new Set(out)];
}
