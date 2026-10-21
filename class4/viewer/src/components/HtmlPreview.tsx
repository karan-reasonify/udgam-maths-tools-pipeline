import { useState } from "react";
import type { ToolSummary } from "../types";
import type { useLiveTool } from "../lib/useLiveTool";
import { DEVICES, type Device } from "../lib/devices";
import { useFitScale } from "../lib/useFitScale";
import { stamp } from "../lib/published";
import { api } from "../api";

/* The HTML preview tab, beside Preview: the slot's <id>.preview.html (work/, built from tool.tsx by every `preview` / `check`), shown before
   the tsx + json pair exists and afterwards as the build the pair came from. View only: the viewer never builds it, so it can never
   race a builder's check. The header's Teacher / Student, language and device switches apply here too (the page reads them from its URL). */
export function HtmlPreview({ tool, live, device, onReload }: { tool: ToolSummary; live: ReturnType<typeof useLiveTool>; device: Device; onReload: () => void }) {
  const { props, setProps } = live;
  const dev = DEVICES[device];
  const { stageRef, scale } = useFitScale(dev);
  const [nonce, setNonce] = useState(0);

  /* lib/build/preview.mjs reads ?mode=ai (Teacher; the default is Student), ?lang=hi|gu, ?classroom=1 */
  const query = new URLSearchParams();
  if (!props.navigableDots) query.set("mode", "ai");
  if (props.lang !== "en") query.set("lang", props.lang);
  if (props.classroom) query.set("classroom", "1");
  const link = api.previewUrl(tool.chapterId, tool.id, query);
  const src = api.previewUrl(tool.chapterId, tool.id, new URLSearchParams({ ...Object.fromEntries(query), v: tool.previewAt ?? "", n: String(nonce) }));

  const checks = tool.status?.checks;
  const reload = () => { setNonce((n) => n + 1); onReload(); };

  return (
    <div className="tool-frame">
      <div className="toolbar">
        <span className="toolbar-note" title={`work/${tool.chapterId}/${tool.id}/${tool.id}.preview.html: the page \`preview\` and \`check\` build from tool.tsx`}>
          <strong>{tool.inProgress ? "Still being built" : "Source build in work/"}</strong>
          {tool.inProgress ? ": Preview, Source and Sidecar fill in when check passes" : ": the Preview tab runs the ported pair"}
        </span>
        {tool.hasPreview && (
          <span className="toolbar-note">
            built {stamp(tool.previewAt)}
            {tool.previewStale && <span className="toolbar-warn"> · tool.tsx saved since: refreshes on the next preview or check</span>}
          </span>
        )}
        {checks && <span className="toolbar-note" title="the last `check` of the source">last check {checks.pass} pass · {checks.warn} warn · {checks.fail} fail</span>}
        <label className="toolbar-field checkbox" title="classroom: true — a teacher paces: tap the speech bubble to go on (the same switch as the Preview tab's)">
          <input type="checkbox" checked={props.classroom} onChange={(e) => setProps((p) => ({ ...p, classroom: e.target.checked }))} />
          classroom
        </label>
        <button className="btn" onClick={reload} title="fetch the page again (a builder may have rebuilt it)">reload</button>
        {tool.hasPreview && <a className="toolbar-link" href={link} target="_blank" rel="noreferrer">open in a tab</a>}
      </div>
      <div className="tool-frame-stage" ref={stageRef}>
        {tool.hasPreview ? (
          <>
            <div className="frame-shell" data-device={device} style={{ width: dev.w * scale, height: dev.h * scale }}>
              <iframe src={src} title="HTML preview" className="tool-iframe" style={{ width: dev.w, height: dev.h, transform: `scale(${scale})` }} />
            </div>
            <span className="frame-tag">{dev.label} · {dev.w}×{dev.h} · {Math.round(scale * 100)}%</span>
          </>
        ) : (
          <p className="muted empty-panel">
            {tool.inProgress
              ? <>No HTML preview yet. The builder's first <code>preview</code> or <code>check</code> makes it; press reload then.</>
              : <>No HTML preview page in work/ now (<code>clean</code> tidies it away). <code>node cli.mjs preview {tool.id}</code> or a <code>check</code> builds it again; press reload then.</>}
          </p>
        )}
      </div>
    </div>
  );
}
