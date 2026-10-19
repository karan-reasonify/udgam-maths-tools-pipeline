/* orchlib/textdiff: a small line diff (Myers, O(ND)) for checkpoints and re-reviews: what changed in tool.tsx since a
 * stage's snapshot, as a few hunks, so a fixer or a re-reviewer reads the diff and not the file. */
export function diffLines(a, b) {
  const A = String(a).replace(/\r\n/g, "\n").split("\n"), B = String(b).replace(/\r\n/g, "\n").split("\n");
  let s = 0; while (s < A.length && s < B.length && A[s] === B[s]) s++;
  let ea = A.length, eb = B.length; while (ea > s && eb > s && A[ea - 1] === B[eb - 1]) { ea--; eb--; }
  const a2 = A.slice(s, ea), b2 = B.slice(s, eb), N = a2.length, M = b2.length, MAX = N + M;
  const ops = [];
  if (N === 0 || M === 0 || MAX > 20000) {
    for (let i = 0; i < N; i++) ops.push(["-", s + i, a2[i]]);
    for (let j = 0; j < M; j++) ops.push(["+", s + j, b2[j]]);
  } else {
    const V = new Int32Array(2 * MAX + 2), trace = [];
    let done = false;
    for (let d = 0; d <= MAX && !done; d++) {
      trace.push(V.slice());
      for (let k = -d; k <= d; k += 2) {
        let x = k === -d || (k !== d && V[MAX + k - 1] < V[MAX + k + 1]) ? V[MAX + k + 1] : V[MAX + k - 1] + 1;
        let y = x - k;
        while (x < N && y < M && a2[x] === b2[y]) { x++; y++; }
        V[MAX + k] = x;
        if (x >= N && y >= M) { done = true; break; }
      }
    }
    let x = N, y = M;
    for (let d = trace.length - 1; d > 0; d--) {
      const Vd = trace[d], k = x - y;
      const pk = k === -d || (k !== d && Vd[MAX + k - 1] < Vd[MAX + k + 1]) ? k + 1 : k - 1;
      const px = Vd[MAX + pk], py = px - pk;
      while (x > px && y > py) { x--; y--; }
      if (x === px) ops.push(["+", s + py, b2[py]]); else ops.push(["-", s + px, a2[px]]);
      x = px; y = py;
    }
    ops.reverse();
  }
  return { ops, added: ops.filter((o) => o[0] === "+").length, removed: ops.filter((o) => o[0] === "-").length };
}

/* hunks as text, at most maxLines lines: "@@ new line N" then -/+ lines (each cut to width) */
export function renderDiff(d, { maxLines = 40, width = 140 } = {}) {
  const out = [];
  let last = -10;
  for (const [op, i, l] of d.ops) {
    if (op === "+" && i !== last + 1) out.push(`@@ line ${i + 1}`);
    if (op === "+") last = i;
    out.push(`${op} ${l.length > width ? l.slice(0, width - 1) + "…" : l}`);
    if (out.length >= maxLines) { out.push(`… ${d.ops.length - out.length} more changed lines`); break; }
  }
  return out;
}

/* the 1-based line ranges of the NEW file that changed (for "only these ranges need a look") */
export function changedRanges(d) {
  const rows = d.ops.filter((o) => o[0] === "+").map((o) => o[1] + 1).sort((a, b) => a - b);
  const out = [];
  for (const r of rows) { const L = out[out.length - 1]; if (L && r <= L[1] + 1) L[1] = r; else out.push([r, r]); }
  return out;
}
