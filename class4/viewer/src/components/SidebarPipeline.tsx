import { useEffect, useRef, useState } from "react";
import type { CheckRunResult, HostsimResult, PipelineStatus } from "../types";
import { api } from "../api";
import { FindingCounts, FindingList } from "./FindingList";

function timeAgo(iso?: string) {
  if (!iso) return "never";
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.round(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h} h ago`;
  return `${Math.round(h / 24)} d ago`;
}

const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 3000;

export function SidebarPipeline({
  chapterId, id, status, onStatusChanged,
}: { chapterId: string; id: string; status: PipelineStatus | null; onStatusChanged: () => void }) {
  const [hostsimRun, setHostsimRun] = useState<{ loading: boolean; result: HostsimResult | null; error: string | null }>({ loading: false, result: null, error: null });
  const [checkRun, setCheckRun] = useState<{ loading: boolean; result: CheckRunResult | null; error: string | null }>({ loading: false, result: null, error: null });
  const [monitor, setMonitor] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [monitorNote, setMonitorNote] = useState<string | null>(null);
  // `monitor` state drives the UI; `monitoring` is read inside runCheck for the go/no-go decision.
  // A state read right after setMonitor(true) in the same tick would see the pre-update value
  // (React batches the re-render), so the decision logic uses this ref instead, kept in lockstep.
  const monitoring = useRef(false);

  // a FAIL is almost always a real bug in tool.tsx, not flakiness — this catches rare Chrome /
  // render timing flakiness only. It stops and says so plainly after MAX_ATTEMPTS, never spins forever.
  const runCheck = async (attemptNo = 1) => {
    setCheckRun({ loading: true, result: null, error: null });
    try {
      const r = await api.runCheck(chapterId, id);
      setCheckRun({ loading: false, result: r, error: null });
      onStatusChanged();
      if (monitoring.current) {
        if (r.summary.fail === 0) { monitoring.current = false; setMonitor(false); setMonitorNote(`passed on attempt ${attemptNo}`); }
        else if (attemptNo >= MAX_ATTEMPTS) { monitoring.current = false; setMonitor(false); setMonitorNote(`still failing after ${MAX_ATTEMPTS} tries — this is a real bug in tool.tsx, not flakiness; it needs a fix, not another retry`); }
        else { setAttempt(attemptNo + 1); setMonitorNote(`attempt ${attemptNo} failed (${r.summary.fail} FAIL); retrying in ${RETRY_DELAY_MS / 1000}s…`); }
      }
      return r;
    } catch (e) {
      setCheckRun({ loading: false, result: null, error: String((e as Error).message) });
      monitoring.current = false; setMonitor(false);
      setMonitorNote(`stopped: ${String((e as Error).message)}`);
      return null;
    }
  };

  useEffect(() => {
    if (!monitoring.current || attempt <= 1) return;
    const t = window.setTimeout(() => { if (monitoring.current) runCheck(attempt); }, RETRY_DELAY_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  // a tool switch (this component is keyed by tool, see App.tsx) always unmounts the old instance,
  // so this only guards against a timer firing in the gap between that and the next mount
  useEffect(() => () => { monitoring.current = false; }, []);

  const startMonitor = () => { monitoring.current = true; setMonitor(true); setAttempt(1); setMonitorNote(null); runCheck(1); };
  const stopMonitor = () => { monitoring.current = false; setMonitor(false); setMonitorNote("stopped"); };

  const runHostsim = async () => {
    setHostsimRun({ loading: true, result: null, error: null });
    try { setHostsimRun({ loading: false, result: await api.runHostsim(chapterId, id), error: null }); }
    catch (e) { setHostsimRun({ loading: false, result: null, error: String((e as Error).message) }); }
  };

  const checks = status?.checks;
  const fresh = status?.checkedTool && status?.ported?.source && status.checkedTool === status.ported.source;

  return (
    <div>
      <dl className="kv">
        <dt>stage</dt><dd>{status?.stage ?? "?"}</dd>
        <dt>last check</dt>
        <dd>
          {checks
            ? <>
                <span className={checks.fail ? "count fail" : checks.warn ? "count warn" : "count pass"}>
                  {checks.pass} pass · {checks.warn} warn · {checks.fail} fail
                </span>
                {" "}({timeAgo(checks.at)})
              </>
            : "not checked"}
        </dd>
        <dt>ported source fresh</dt><dd>{status?.ported ? (fresh ? "yes, matches last check" : "no — source changed since") : "not ported"}</dd>
        <dt>hostsim (at port)</dt><dd>{status?.hostsim ? (status.hostsim.ok ? `ok (${timeAgo(status.hostsim.at)})` : `FAILED (${timeAgo(status.hostsim.at)})`) : "not run"}</dd>
        <dt>last publish run</dt>
        <dd>
          {status?.publish
            ? status.publish.dry === false
              ? (status.publish.ok ? `uploaded (${timeAgo(status.publish.at)})` : `upload failed: ${(status.publish.problems ?? []).join("; ") || "see log"}`)
              : (status.publish.ok ? `dry run: ready (${timeAgo(status.publish.at)})` : `dry run: blocked: ${(status.publish.problems ?? []).join("; ") || "see log"}`)
            : "not run"}
        </dd>
      </dl>

      <div className="btn-row">
        <button className="btn" onClick={runHostsim} disabled={hostsimRun.loading}>
          {hostsimRun.loading ? "running hostsim…" : "re-run hostsim"}
        </button>
        {monitor
          ? <button className="btn" onClick={stopMonitor}>stop monitor (attempt {attempt} of {MAX_ATTEMPTS})</button>
          : <button className="btn" onClick={() => runCheck(1)} disabled={checkRun.loading}>{checkRun.loading ? "running check (~90s)…" : "re-run check"}</button>}
        {!monitor && (
          <button className="btn" onClick={startMonitor} disabled={checkRun.loading} title={`re-run check up to ${MAX_ATTEMPTS} times until it passes, then stop and say so`}>
            monitor until pass
          </button>
        )}
      </div>
      {monitorNote && <p className="muted small">{monitorNote}</p>}

      {hostsimRun.error && <p className="error small">{hostsimRun.error}</p>}
      {hostsimRun.result && (
        <div className="sub-panel">
          <div className="sub-panel-title">hostsim: {hostsimRun.result.ok ? "all phases play" : "FAILED"}</div>
          <ul className="finding-list">
            {hostsimRun.result.results.map((r) => (
              <li key={r.n} className="finding-row" data-level={r.ok ? "pass" : "fail"}>
                <span className="finding-dot" style={{ background: r.ok ? "#1a7f37" : "#cf222e" }} />
                <span className="finding-id">phase {r.n} ({r.mode})</span>
                <span className="finding-msg">{r.ok ? "plays and finishes" : r.problems.join("; ")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {checkRun.error && <p className="error small">{checkRun.error}</p>}
      {checkRun.result && (
        <div className="sub-panel">
          <div className="sub-panel-title">check</div>
          <FindingCounts findings={checkRun.result.results.map((r) => ({ id: `${r.group}/${r.id}`, level: r.level, msg: r.msg }))} />
          <FindingList findings={checkRun.result.results.map((r) => ({ id: `${r.group}/${r.id}`, level: r.level, msg: r.msg }))} />
          {checkRun.result.summary.fail === 0 && (
            <div className="sub-panel">
              <div className="sub-panel-title">port (on this pass)</div>
              {checkRun.result.ported
                ? <ul className="finding-list">
                    {checkRun.result.ported.hostsimResults.map((r) => (
                      <li key={r.n} className="finding-row" data-level={r.ok ? "pass" : "fail"}>
                        <span className="finding-dot" style={{ background: r.ok ? "#1a7f37" : "#cf222e" }} />
                        <span className="finding-id">phase {r.n} ({r.mode})</span>
                        <span className="finding-msg">{r.ok ? "plays and finishes" : r.problems.join("; ")}</span>
                      </li>
                    ))}
                  </ul>
                : <p className="error small">{checkRun.result.portError ?? "did not port"}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
