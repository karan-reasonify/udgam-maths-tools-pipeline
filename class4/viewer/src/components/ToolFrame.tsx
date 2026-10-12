import type { useLiveTool } from "../lib/useLiveTool";

/* the three shipped languages (runtime.tsx r10+, docs/PATTERNS.md §11): the host sets `lang` exactly
 * like navigableDots/muted here. A tool ported on an older frozen runtime has no lang contract
 * inlined and ignores the prop, so it stays English regardless of this control. */
const LANGS: Array<{ key: "en" | "hi" | "gu"; label: string; title: string }> = [
  { key: "en", label: "EN", title: "lang: 'en' — English" },
  { key: "hi", label: "हिं", title: "lang: 'hi' — Hindi" },
  { key: "gu", label: "ગુ", title: "lang: 'gu' — Gujarati" },
];

export function ToolFrame({ live }: { live: ReturnType<typeof useLiveTool> }) {
  const { props, setProps, phases, srcDoc, iframeElRef, remount, autoPlay, autoPlaying, autoPlayNote, stopAutoPlay } = live;

  return (
    <div className="tool-frame">
      <div className="toolbar">
        <label className="toolbar-field">
          phase
          <select
            value={props.phase == null ? "whole" : String(props.phase)}
            onChange={(e) => setProps((p) => ({ ...p, phase: e.target.value === "whole" ? null : Number(e.target.value) }))}
          >
            <option value="whole">whole lesson</option>
            {phases.map((p) => <option key={p.n} value={p.n}>phase {p.n} — {p.concept}</option>)}
          </select>
        </label>
        <label className="toolbar-field checkbox">
          <input type="checkbox" checked={props.navigableDots} onChange={(e) => setProps((p) => ({ ...p, navigableDots: e.target.checked }))} />
          user mode (navigableDots)
        </label>
        <label className="toolbar-field checkbox">
          <input type="checkbox" checked={props.muted} onChange={(e) => setProps((p) => ({ ...p, muted: e.target.checked }))} />
          muted
        </label>
        {/* classroom mode (runtime r22+): a teacher paces, tap the bubble to go on (r30: the lesson is silent and the
            sound effects stay on). A tool ported on an older frozen runtime ignores the prop, so the tick box does nothing there. */}
        <label className="toolbar-field checkbox" title="classroom: true — nothing waits but a long line's pieces (the blinking arrow: tap the speech bubble); a tap with nothing waiting skips ahead; no score; sound effects stay on">
          <input type="checkbox" checked={props.classroom} onChange={(e) => setProps((p) => ({ ...p, classroom: e.target.checked }))} />
          classroom
        </label>
        <div className="toolbar-field seg" role="radiogroup" aria-label="Tool language">
          {LANGS.map((l) => (
            <button
              key={l.key}
              type="button"
              className={"seg-btn" + (props.lang === l.key ? " active" : "")}
              role="radio"
              aria-checked={props.lang === l.key}
              title={l.title}
              onClick={() => setProps((p) => ({ ...p, lang: l.key }))}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button className="btn" onClick={remount}>remount</button>
        {autoPlaying
          ? <button className="btn" onClick={stopAutoPlay}>stop auto-play</button>
          : <button className="btn" onClick={autoPlay}>auto-play (sidecar's own answers)</button>}
        {autoPlayNote && <span className="muted small">{autoPlayNote}</span>}
      </div>
      <div className="tool-frame-stage">
        {srcDoc
          // changing the srcDoc attribute alone reloads the iframe; no React key trick needed
          ? <iframe ref={iframeElRef} srcDoc={srcDoc} title="live tool preview" className="tool-iframe" />
          : <p className="muted">loading the tool…</p>}
      </div>
    </div>
  );
}
