import type { useLiveTool } from "../lib/useLiveTool";
import { DEVICES, DEVICE_ORDER, type Device } from "../lib/devices";

/* Teacher / Student: the Udgam tools have no operatorMode; their two modes are `navigableDots` (iframeDoc.ts, runtime P.navigableDots).
 * false = Teacher: AI mode, the dots only show progress and the teacher agent drives window.toolApi.
 * true = Student: user mode, the dots are controls and the child works alone. (A whole-lesson mount, phase "whole", is always Student.) */
const MODES = [
  { student: false, label: "Teacher", title: "navigableDots: false — AI mode: the dots show progress, the teacher agent drives the tool" },
  { student: true, label: "Student", title: "navigableDots: true — user mode: the dots are controls, the child works alone" },
];

/* the three shipped languages (runtime.tsx r10+, docs/PATTERNS.md §11): the host sets `lang` exactly like navigableDots/muted
 * here. A tool ported on an older frozen runtime has no lang contract inlined and ignores the prop, so it stays English. */
const LANGS: Array<{ key: "en" | "hi" | "gu"; label: string; title: string }> = [
  { key: "en", label: "EN", title: "lang: 'en' — English" },
  { key: "hi", label: "हिं", title: "lang: 'hi' — Hindi" },
  { key: "gu", label: "ગુ", title: "lang: 'gu' — Gujarati" },
];

/* the header's row of preview controls: mode, language, device frame */
export function DeviceBar({ live, device, setDevice }: { live: ReturnType<typeof useLiveTool>; device: Device; setDevice: (d: Device) => void }) {
  const { props, setProps } = live;
  return (
    <div className="devicebar">
      <div className="seg" role="radiogroup" aria-label="Tool mode">
        {MODES.map((m) => (
          <button key={m.label} type="button" className={"seg-btn" + (props.navigableDots === m.student ? " active" : "")} role="radio" aria-checked={props.navigableDots === m.student} title={m.title} onClick={() => setProps((p) => ({ ...p, navigableDots: m.student }))}>
            {m.label}
          </button>
        ))}
      </div>
      <span className="devicebar-sep" aria-hidden="true" />
      <div className="seg" role="radiogroup" aria-label="Tool language">
        {LANGS.map((l) => (
          <button key={l.key} type="button" className={"seg-btn" + (props.lang === l.key ? " active" : "")} role="radio" aria-checked={props.lang === l.key} title={l.title} onClick={() => setProps((p) => ({ ...p, lang: l.key }))}>
            {l.label}
          </button>
        ))}
      </div>
      <span className="devicebar-sep" aria-hidden="true" />
      <div className="seg" role="radiogroup" aria-label="Preview device">
        {DEVICE_ORDER.map((k) => (
          <button key={k} type="button" className={"seg-btn" + (device === k ? " active" : "")} role="radio" aria-checked={device === k} title={`${DEVICES[k].label} — ${DEVICES[k].w}×${DEVICES[k].h}`} onClick={() => setDevice(k)}>
            {DEVICES[k].label}
            <span className="seg-dim">{DEVICES[k].w}×{DEVICES[k].h}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
