import { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import type { PipelineStatus, Sidecar, ToolSummary, ViewerMeta } from "./types";
import { ToolList } from "./components/ToolList";
import { CheckCounts } from "./components/CheckCounts";
import { ToolFrame } from "./components/ToolFrame";
import { SidebarJson } from "./components/SidebarJson";
import { SidebarPipeline } from "./components/SidebarPipeline";
import { SidebarLive } from "./components/SidebarLive";
import { useLiveTool } from "./lib/useLiveTool";

type Tab = "preview" | "tsx" | "json";
type SidebarTab = "checks" | "pipeline" | "live";

function usePanelOpen(storageKey: string): [boolean, () => void] {
  const [open, setOpen] = useState<boolean>(() => {
    try { return localStorage.getItem(storageKey) !== "0"; } catch { return true; }
  });
  const toggle = () => setOpen((was) => {
    try { localStorage.setItem(storageKey, was ? "0" : "1"); } catch { /* storage blocked: the toggle still works */ }
    return !was;
  });
  return [open, toggle];
}

/* the header button that shows or hides one side panel; the icon is a window with the panel's side shaded */
function PanelToggle({ side, open, onClick, className }: { side: "left" | "right"; open: boolean; onClick: () => void; className?: string }) {
  const label = `${open ? "Hide" : "Show"} ${side} panel`;
  const dividerX = side === "left" ? 9 : 15;
  return (
    <button type="button" className={"icon-btn" + (open ? " active" : "") + (className ? " " + className : "")} onClick={onClick} aria-pressed={open} aria-label={label} title={label}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1={dividerX} y1="4" x2={dividerX} y2="20" />
        {open && <rect x={side === "left" ? 3 : 15} y="4" width="6" height="16" fill="currentColor" stroke="none" opacity="0.25" />}
      </svg>
    </button>
  );
}

/* ?ch=<chapterId>&tool=<id> opens that tool (a link works on its own). ?embed=1 is the hub's iframe (viewhub.mjs at the
   pipeline root, viewer-hub/README.md): its Class/Chapter/Tool dropdowns replace this page's title, totals and left list,
   and the two pages talk by postMessage, which carries nothing but the type and the two ids. */
const QUERY = new URLSearchParams(location.search);
const ID_OK = /^[A-Za-z0-9_.-]+$/;
const EMBED = QUERY.get("embed") === "1" && window.parent !== window;
const FIRST: { chapterId: string; id: string } | null = ID_OK.test(QUERY.get("ch") ?? "") && ID_OK.test(QUERY.get("tool") ?? "")
  ? { chapterId: QUERY.get("ch")!, id: QUERY.get("tool")! } : null;
const PARENT_ORIGIN = (() => { try { return new URL(document.referrer).origin; } catch { return "*"; } })();
const toParent = (msg: object) => window.parent.postMessage(msg, PARENT_ORIGIN);

export function App() {
  const [tools, setTools] = useState<ToolSummary[]>([]);
  const [toolsError, setToolsError] = useState<string | null>(null);
  const [selected, setSelected] = useState<{ chapterId: string; id: string } | null>(null);
  const [tab, setTab] = useState<Tab>("preview");
  const [sideTab, setSideTab] = useState<SidebarTab>("checks");

  /* both side panels open and close at the user's choice; each choice is remembered in this browser */
  const [leftOpen, toggleLeft] = usePanelOpen("viewer.leftOpen");
  const [rightOpen, toggleRight] = usePanelOpen("viewer.rightOpen");

  const [vendor, setVendor] = useState<{ react: string; reactDom: string; babel: string } | null>(null);
  const [hostTemplate, setHostTemplate] = useState<string | null>(null);

  const [tsx, setTsx] = useState<{ text: string; md5: string; bytes: number } | null>(null);
  const [sidecar, setSidecar] = useState<Sidecar | null>(null);
  const [status, setStatus] = useState<PipelineStatus | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const refreshTools = () => api.tools().then(setTools).catch((e) => setToolsError(String(e.message)));
  useEffect(() => { refreshTools(); }, []);

  /* the class, publication and chapters this viewer is for (pipeline.config.json and the folders on disk) */
  const [meta, setMeta] = useState<ViewerMeta | null>(null);
  const refreshMeta = () => api.meta().then(setMeta).catch(() => { /* the header falls back to "Tool viewer" */ });
  useEffect(() => { refreshMeta(); }, []);
  const heading = meta ? `${meta.pubLabel} · Class ${meta.class} · ${meta.subjectLabel} · ${meta.mediumLabel}` : "Tool viewer";
  useEffect(() => { document.title = meta ? `${meta.pubLabel} Class ${meta.class} — tool viewer` : "Tool viewer"; }, [meta]);
  useEffect(() => {
    if (!tools.length) return;
    setSelected((prev) => prev ?? (FIRST && tools.some((t) => t.chapterId === FIRST.chapterId && t.id === FIRST.id) ? FIRST : { chapterId: tools[0].chapterId, id: tools[0].id }));
  }, [tools]);

  /* in the hub's iframe: say when ready, take its selection, report a pick made in here */
  useEffect(() => {
    if (!EMBED) return;
    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (e.source !== window.parent || (PARENT_ORIGIN !== "*" && e.origin !== PARENT_ORIGIN) || !d || d.type !== "udgam-viewer:select") return;
      if (typeof d.chapterId !== "string" || typeof d.id !== "string" || !ID_OK.test(d.chapterId) || !ID_OK.test(d.id)) return;
      setSelected((prev) => prev && prev.chapterId === d.chapterId && prev.id === d.id ? prev : { chapterId: d.chapterId, id: d.id });
    };
    window.addEventListener("message", onMessage);
    toParent({ type: "udgam-viewer:ready" });
    return () => window.removeEventListener("message", onMessage);
  }, []);
  useEffect(() => { if (EMBED && selected) toParent({ type: "udgam-viewer:selected", chapterId: selected.chapterId, id: selected.id }); }, [selected]);

  // the vendor libraries and the exact host transpile template are static per session
  useEffect(() => { api.vendor().then(setVendor).catch((e) => setLoadError(String(e.message))); }, []);
  useEffect(() => { api.hostTemplate().then(setHostTemplate).catch((e) => setLoadError(String(e.message))); }, []);

  useEffect(() => {
    if (!selected) return;
    setTsx(null); setSidecar(null); setStatus(null); setLoadError(null);
    const { chapterId, id } = selected;
    api.tsx(chapterId, id).then(setTsx).catch((e) => setLoadError(String(e.message)));
    api.sidecar(chapterId, id).then(setSidecar).catch((e) => setLoadError(String(e.message)));
    api.status(chapterId, id).then(setStatus).catch((e) => setLoadError(String(e.message)));
  }, [selected]);

  /* a re-run check changes this tool's status, its badge and the totals in the header and the rail */
  const refreshStatus = () => {
    if (selected) api.status(selected.chapterId, selected.id).then(setStatus);
    refreshTools();
    refreshMeta();
  };

  const live = useLiveTool({ tsx: tsx?.text ?? null, sidecar, vendor, hostTemplate });

  const selectedKey = selected ? `${selected.chapterId}/${selected.id}` : null;
  const currentSummary = useMemo(() => tools.find((t) => selected && t.chapterId === selected.chapterId && t.id === selected.id) ?? null, [tools, selected]);

  return (
    <div className={"app" + (EMBED ? " embed" : "")}>
      <header className="app-header">
        {!EMBED && <PanelToggle side="left" open={leftOpen} onClick={toggleLeft} />}
        {!EMBED && <span className="app-title">{heading}</span>}
        {!EMBED && meta && (
          <span className="muted small">
            {meta.totals.chapters} chapter{meta.totals.chapters === 1 ? "" : "s"} · {meta.totals.ported} of {meta.totals.slots} tools ported
          </span>
        )}
        {!EMBED && meta && <CheckCounts checks={meta.totals.checks} />}
        {currentSummary && <span className="muted small app-current">{currentSummary.title ?? currentSummary.id} · {selected?.id}</span>}
        <PanelToggle side="right" open={rightOpen} onClick={toggleRight} className={currentSummary ? "" : "app-current"} />
      </header>
      <div className={"app-body" + (leftOpen && !EMBED ? "" : " left-closed") + (rightOpen ? "" : " right-closed")}>
        <aside className="rail-left">
          {toolsError && <p className="error small">{toolsError}</p>}
          <ToolList tools={tools} chapters={meta?.chapters ?? []} classNo={meta?.class ?? null} selected={selectedKey} onSelect={(chapterId, id) => setSelected({ chapterId, id })} />
        </aside>

        <main className="main">
          {loadError && <p className="error small">{loadError}</p>}
          <div className="tabs">
            <button className={"tab" + (tab === "preview" ? " active" : "")} onClick={() => setTab("preview")}>Preview</button>
            <button className={"tab" + (tab === "tsx" ? " active" : "")} onClick={() => setTab("tsx")}>Source (.tsx)</button>
            <button className={"tab" + (tab === "json" ? " active" : "")} onClick={() => setTab("json")}>Sidecar (.json)</button>
          </div>
          {tab === "preview" && <ToolFrame live={live} />}
          {tab === "tsx" && (
            <div className="code-panel">
              {tsx ? <pre className="code-block">{tsx.text}</pre> : <p className="muted">loading…</p>}
            </div>
          )}
          {tab === "json" && (
            <div className="code-panel">
              {sidecar ? <pre className="code-block">{JSON.stringify(sidecar, null, 2)}</pre> : <p className="muted">loading…</p>}
            </div>
          )}
        </main>

        <aside className="rail-right">
          <div className="tabs">
            <button className={"tab" + (sideTab === "checks" ? " active" : "")} onClick={() => setSideTab("checks")}>Sidecar checks</button>
            <button className={"tab" + (sideTab === "pipeline" ? " active" : "")} onClick={() => setSideTab("pipeline")}>Pipeline</button>
            <button className={"tab" + (sideTab === "live" ? " active" : "")} onClick={() => setSideTab("live")}>Live</button>
          </div>
          <div className="sidebar-body">
            {selected && sideTab === "checks" && (
              <SidebarJson sidecar={sidecar} chapterId={selected.chapterId} id={selected.id} actualTsxBytes={tsx?.bytes ?? null} actualTsxMd5={tsx?.md5 ?? null} />
            )}
            {selected && sideTab === "pipeline" && (
              // keyed by tool: a fresh mount per tool cleanly drops any in-flight monitor/retry timer
              <SidebarPipeline key={selectedKey ?? undefined} chapterId={selected.chapterId} id={selected.id} status={status} onStatusChanged={refreshStatus} />
            )}
            {selected && sideTab === "live" && <SidebarLive sidecar={sidecar} live={live} />}
            {!selected && <p className="muted small">pick a tool on the left</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}
