import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Sidecar } from "../types";
import { buildHostDoc, type LiveProps } from "./iframeDoc";

export type LogEntry = { at: number; msg?: string; level?: string; kind?: string; arg?: string; name?: string; detail?: unknown };

export type LiveState = {
  ready: boolean;
  mountFailed: boolean;
  apiKeys: string[];
  alias: boolean;
  toolState: Record<string, unknown> | null;
  errors: LogEntry[];
  consoleLog: LogEntry[];
  networkLog: LogEntry[];
  storageLog: LogEntry[];
  eventLog: LogEntry[];
};

const EMPTY: LiveState = { ready: false, mountFailed: false, apiKeys: [], alias: false, toolState: null, errors: [], consoleLog: [], networkLog: [], storageLog: [], eventLog: [] };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* Runs the standalone .tsx the same way the app runs it (lib/ship/hostTemplate.mjs), same-origin
 * inside an iframe, and polls it for state, errors and the events docs/CHECKS.md names. */
export function useLiveTool(args: {
  tsx: string | null;
  sidecar: Sidecar | null;
  vendor: { react: string; reactDom: string; babel: string } | null;
  hostTemplate: string | null;
}) {
  const { tsx, sidecar, vendor, hostTemplate } = args;
  const [props, setProps] = useState<LiveProps>({ phase: 1, navigableDots: true, muted: false, lang: "en", classroom: false /* unticked by default (the owner, 2026-10-28): a child alone; tick it to see the schools' use (a teacher paces) */ });
  const [nonce, setNonce] = useState(0);
  const [live, setLive] = useState<LiveState>(EMPTY);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [autoPlayNote, setAutoPlayNote] = useState<string | null>(null);
  const iframeElRef = useRef<HTMLIFrameElement | null>(null);
  const stopRef = useRef(false);

  const phases = sidecar?.phaseMap?.phases ?? [];

  const srcDoc = useMemo(() => {
    if (!tsx || !sidecar || !vendor || !hostTemplate) return null;
    return `<!-- gen ${nonce} -->` + buildHostDoc(vendor, hostTemplate, { tsx, toolId: sidecar.toolId, mediaId: sidecar.mediaId, props });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tsx, sidecar, vendor, hostTemplate, props, nonce]);

  const remount = useCallback(() => { setLive(EMPTY); setAutoPlayNote(null); setNonce((n) => n + 1); }, []);

  // reset live diagnostics whenever the document being shown changes
  useEffect(() => { setLive(EMPTY); }, [srcDoc]);

  // poll the (same-origin) iframe for its toolApi and the probe's logs
  useEffect(() => {
    if (!srcDoc) return;
    let cancelled = false;
    const id = window.setInterval(() => {
      if (cancelled) return;
      const win = iframeElRef.current?.contentWindow as (Window & Record<string, any>) | null | undefined;
      if (!win) return;
      const normalize = (arr: unknown): LogEntry[] => (Array.isArray(arr) ? arr.map((e) => (typeof e === "string" ? { at: 0, msg: e } : e)) : []);
      const mountFailed = !!win.__mountFailed;
      const toolApi = win.toolApi as Record<string, (...a: unknown[]) => unknown> | undefined;
      setLive((prev) => ({
        ready: prev.ready || !!toolApi,
        mountFailed,
        apiKeys: toolApi ? Object.keys(toolApi) : prev.apiKeys,
        alias: toolApi ? !!win[sidecar!.toolId] : prev.alias,
        toolState: toolApi ? (toolApi.getState() as Record<string, unknown>) : prev.toolState,
        errors: normalize(win.__hostErrors),
        consoleLog: normalize(win.__consoleLog),
        networkLog: normalize(win.__networkLog),
        storageLog: normalize(win.__storageLog),
        eventLog: normalize(win.__eventLog),
      }));
    }, 300);
    return () => { cancelled = true; window.clearInterval(id); };
  }, [srcDoc, sidecar]);

  const autoPlay = useCallback(async () => {
    if (!sidecar) return;
    const win = iframeElRef.current?.contentWindow as (Window & { toolApi?: any }) | null | undefined;
    const A = win?.toolApi;
    if (!A) { setAutoPlayNote("toolApi is not ready yet"); return; }
    const items: unknown[] = props.phase == null
      ? sidecar.toolQuestions.authoredFallback.flatMap((p) => p.items.map((it) => it.answer))
      : (sidecar.toolQuestions.authoredFallback.find((p) => p.phase === props.phase)?.items ?? []).map((it) => it.answer);
    if (!items.length) { setAutoPlayNote("no authored items for this phase"); return; }
    setAutoPlaying(true); setAutoPlayNote(null); stopRef.current = false;
    const until = async (ok: () => boolean, n = 200) => { for (let k = 0; k < n && !ok() && !stopRef.current; k++) await wait(50); };
    try {
      for (let k = 0; k < items.length && !stopRef.current; k++) {
        await until(() => { const s = A.getState(); return s.stage === "ask" || s.stage === "demo" || s.stage === "summary" || s.complete; });
        let s = A.getState();
        if (stopRef.current || s.stage === "summary" || s.complete) break;
        if (s.stage === "demo") { A.check(); await until(() => A.getState().stage === "ask"); }
        const s0 = A.getState();
        A.answer(items[k]); await wait(60); A.check(); await wait(250);
        if (A.getState().stage === "ask" && A.getState().item === s0.item && !A.getState().complete) A.check();
        /* a tool with nextKey (runtime r48+) waits for its Next key after a right answer: auto-play presses it, as the host's next() does */
        await until(() => { const q = A.getState(); return q.item !== s0.item || q.complete || !!q.nextKey; });
        if (A.getState().nextKey) { A.next(); await until(() => { const q = A.getState(); return q.item !== s0.item || q.phase !== s0.phase || q.stage === "summary" || q.complete; }); }
      }
      await until(() => A.getState().complete, 400);
      setAutoPlayNote(A.getState().complete ? "finished" : "stopped before the tool reported complete (it may still be speaking)");
    } finally { setAutoPlaying(false); }
  }, [sidecar, props.phase]);

  const stopAutoPlay = useCallback(() => { stopRef.current = true; }, []);

  return { props, setProps, phases, srcDoc, iframeElRef, remount, live, autoPlay, autoPlaying, autoPlayNote, stopAutoPlay };
}
