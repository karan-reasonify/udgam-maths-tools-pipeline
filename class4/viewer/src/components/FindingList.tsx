import type { Finding } from "../types";

const DOT: Record<Finding["level"], string> = { pass: "#1a7f37", warn: "#9a6700", fail: "#cf222e", info: "#57606a" };
const LABEL: Record<Finding["level"], string> = { pass: "PASS", warn: "WARN", fail: "FAIL", info: "INFO" };

export function FindingRow({ f }: { f: Finding }) {
  return (
    <li className="finding-row" data-level={f.level}>
      <span className="finding-dot" style={{ background: DOT[f.level] }} title={LABEL[f.level]} />
      <span className="finding-id">{f.id}</span>
      <span className="finding-msg">{f.msg}</span>
    </li>
  );
}

export function FindingList({ findings, emptyText = "nothing to show" }: { findings: Finding[]; emptyText?: string }) {
  if (!findings.length) return <p className="muted small">{emptyText}</p>;
  const order: Finding["level"][] = ["fail", "warn", "pass", "info"];
  const sorted = [...findings].sort((a, b) => order.indexOf(a.level) - order.indexOf(b.level));
  return <ul className="finding-list">{sorted.map((f, i) => <FindingRow key={f.id + i} f={f} />)}</ul>;
}

export function FindingCounts({ findings }: { findings: Finding[] }) {
  const n = (lv: Finding["level"]) => findings.filter((f) => f.level === lv).length;
  return (
    <div className="finding-counts">
      {n("fail") > 0 && <span className="count fail">{n("fail")} FAIL</span>}
      {n("warn") > 0 && <span className="count warn">{n("warn")} WARN</span>}
      <span className="count pass">{n("pass")} PASS</span>
      {n("info") > 0 && <span className="count info">{n("info")} INFO</span>}
    </div>
  );
}
