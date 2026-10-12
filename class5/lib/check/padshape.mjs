/* The pad's shape, question by question (LAYOUT.md "Pad"): a question answered on the working area
 * (`pad: "enter"`) draws no digit or rub-out key at all, only Enter; a question typed on the pad draws
 * all twelve keys, quiet while locked but never missing. The point key belongs to `pointKey` tools and
 * is not judged here. Word choices replace the pad, and a pad lent to the working area (`padTo: "work"`)
 * legitimately shows its digits, so both are skipped. Pure, so it can be shown to fail on the pre-fix
 * pattern (quiet digit keys on a working-area question) without rendering anything. */
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "back"].map((k) => "key-" + k);

export function padShapeProblems({ item, padTo, controls, tag }) {
  if (!item || item.choices || padTo !== "slot") return { kind: null, bad: [] };
  const has = new Set(controls.filter((c) => c.zone === "pad").map((c) => c.id));
  if (!has.size) return { kind: null, bad: [] };
  if (item.pad === "enter") {
    const drawn = DIGITS.filter((id) => has.has(id)), bad = [];
    if (drawn.length) bad.push(`${tag}: a working-area question (pad: "enter") still draws ${drawn.join(", ")}`);
    if (!has.has("key-enter")) bad.push(`${tag}: a working-area question draws no Enter key`);
    return { kind: "enter", bad };
  }
  const missing = [...DIGITS, "key-enter"].filter((id) => !has.has(id));
  return { kind: "typed", bad: missing.length ? [`${tag}: a typed question is missing ${missing.join(", ")}`] : [] };
}
