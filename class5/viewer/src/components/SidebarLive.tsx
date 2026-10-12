import { useState } from "react";
import type { Sidecar } from "../types";
import type { useLiveTool } from "../lib/useLiveTool";
import { FindingList } from "./FindingList";
import type { Finding } from "../types";

function LogSection({ title, entries, render, okText }: { title: string; entries: { at: number }[]; render: (e: any) => string; okText: string }) {
  const [open, setOpen] = useState(entries.length > 0);
  return (
    <details className="sub-panel" open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary className="sub-panel-title">{title} {entries.length ? `(${entries.length})` : ""}</summary>
      {entries.length
        ? <ul className="log-list">{entries.slice(-30).map((e, i) => <li key={i} className="log-row">{render(e)}</li>)}</ul>
        : <p className="muted small">{okText}</p>}
    </details>
  );
}

export function SidebarLive({ sidecar, live }: { sidecar: Sidecar | null; live: ReturnType<typeof useLiveTool> }) {
  const { live: L } = live;

  if (!L.ready && !L.mountFailed) {
    return <p className="muted small">waiting for the tool to mount…</p>;
  }

  const findings: Finding[] = [];
  if (L.mountFailed) findings.push({ id: "mount", level: "fail", msg: "the tool did not mount (see errors below)" });
  if (sidecar) {
    const want = [...sidecar.windowMethods].sort();
    const have = [...L.apiKeys].sort();
    const same = want.length === have.length && want.every((v, i) => v === have[i]);
    findings.push({ id: "toolapi-verbs", level: same ? "pass" : "fail", msg: same ? "window.toolApi has every sidecar verb, none extra" : `have: [${have.join(", ")}] want: [${want.join(", ")}]` });
    findings.push({ id: "toolapi-alias", level: L.alias ? "pass" : "fail", msg: L.alias ? `window.${sidecar.toolId} is set` : `window.${sidecar.toolId} is missing` });
  }
  const wantMode = live.props.navigableDots || live.props.phase == null ? "user" : "ai";
  if (L.toolState) {
    const gotMode = (L.toolState as any).mode;
    findings.push({ id: "mode", level: gotMode === wantMode ? "pass" : "warn", msg: `getState().mode is "${gotMode}", expected "${wantMode}"` });
    const mascot = (L.toolState as any).mascot;
    findings.push({ id: "mascot", level: mascot === "image" ? "pass" : "warn", msg: `mascot rung: "${mascot}"` });
  }
  findings.push({
    id: "console-network-storage",
    level: L.consoleLog.some((e) => e.level === "error") || L.networkLog.length || L.storageLog.length ? "warn" : "pass",
    msg: `console errors: ${L.consoleLog.filter((e) => e.level === "error").length} · network calls: ${L.networkLog.length} · storage calls: ${L.storageLog.length}`,
  });

  return (
    <div>
      <FindingList findings={findings} />

      <LogSection title="events" entries={L.eventLog} okText="no finished / question_done / answer_checked yet"
        render={(e) => `${e.name} — ${JSON.stringify(e.detail).slice(0, 140)}`} />
      <LogSection title="console" entries={L.consoleLog} okText="clean"
        render={(e) => `[${e.level}] ${e.msg}`} />
      <LogSection title="network attempts" entries={L.networkLog} okText="none (the host contract forbids it)"
        render={(e) => `${e.kind}: ${e.arg}`} />
      <LogSection title="storage attempts" entries={L.storageLog} okText="none (the host contract forbids it)"
        render={(e) => `${e.kind}: ${e.arg}`} />
      <LogSection title="errors" entries={L.errors} okText="none"
        render={(e) => e.msg ?? ""} />

      {L.toolState && (
        <details className="sub-panel">
          <summary className="sub-panel-title">getState()</summary>
          <pre className="code-block small">{JSON.stringify(L.toolState, null, 2)}</pre>
        </details>
      )}
    </div>
  );
}
