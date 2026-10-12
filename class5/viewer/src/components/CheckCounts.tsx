import type { ChecksCount } from "../types";

const PILLS: { key: keyof ChecksCount; cls: string; title: string }[] = [
  { key: "pass", cls: "pass", title: "checked on the current source and runtime, no warning" },
  { key: "warn", cls: "warn", title: "checked on the current source and runtime, with warnings" },
  { key: "fail", cls: "fail", title: "checked on the current source and runtime, with failures" },
  { key: "stale", cls: "info", title: "checked, but the tool, runtime or mascot has changed since: re-run check" },
  { key: "unchecked", cls: "info", title: "no check yet" },
];

/* the pass / warn / fail / stale / unchecked pills of the header (whole class) and of each chapter in the rail */
export function CheckCounts({ checks }: { checks: ChecksCount }) {
  return (
    <span className="count-row">
      {PILLS.filter((p) => checks[p.key] > 0).map((p) => (
        <span key={p.key} className={`count ${p.cls}`} title={p.title}>{checks[p.key]} {p.key}</span>
      ))}
    </span>
  );
}
