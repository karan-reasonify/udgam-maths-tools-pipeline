import type { useLiveTool } from "../lib/useLiveTool";
import { DEVICES, type Device } from "../lib/devices";
import { useFitScale } from "../lib/useFitScale";

/* the language and Teacher/Student controls are in the header (DeviceBar.tsx), beside the device frames */
export function ToolFrame({ live, device }: { live: ReturnType<typeof useLiveTool>; device: Device }) {
  const { props, setProps, phases, srcDoc, iframeElRef, remount, autoPlay, autoPlaying, autoPlayNote, stopAutoPlay } = live;

  /* the tool is mounted at the device's TRUE size and the frame is scaled down to fit the stage (never up past 1:1), so a
     tool lays out (media queries, 100vh, the 390 px height of a phone) exactly as it will on that device */
  const dev = DEVICES[device];
  const { stageRef, scale } = useFitScale(dev);

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
          <input type="checkbox" checked={props.muted} onChange={(e) => setProps((p) => ({ ...p, muted: e.target.checked }))} />
          muted
        </label>
        {/* classroom mode (runtime r22+): a teacher paces, tap the bubble to go on (r30: the lesson is silent and the
            sound effects stay on). A tool ported on an older frozen runtime ignores the prop, so the tick box does nothing there. */}
        <label className="toolbar-field checkbox" title="classroom: true — nothing waits but a long line's pieces (the blinking arrow: tap the speech bubble); a tap with nothing waiting skips ahead; no score; sound effects stay on">
          <input type="checkbox" checked={props.classroom} onChange={(e) => setProps((p) => ({ ...p, classroom: e.target.checked }))} />
          classroom
        </label>
        <button className="btn" onClick={remount}>remount</button>
        {autoPlaying
          ? <button className="btn" onClick={stopAutoPlay}>stop auto-play</button>
          : <button className="btn" onClick={autoPlay}>auto-play (sidecar's own answers)</button>}
        {autoPlayNote && <span className="muted small">{autoPlayNote}</span>}
      </div>
      <div className="tool-frame-stage" ref={stageRef}>
        {srcDoc
          // changing the srcDoc attribute alone reloads the iframe; no React key trick needed
          ? (
            <div className="frame-shell" data-device={device} style={{ width: dev.w * scale, height: dev.h * scale }}>
              <iframe ref={iframeElRef} srcDoc={srcDoc} title="live tool preview" className="tool-iframe" style={{ width: dev.w, height: dev.h, transform: `scale(${scale})` }} />
            </div>
          )
          : <p className="muted">loading the tool…</p>}
        <span className="frame-tag">{dev.label} · {dev.w}×{dev.h} · {Math.round(scale * 100)}%</span>
      </div>
    </div>
  );
}
