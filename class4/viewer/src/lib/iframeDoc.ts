/* Builds the srcdoc for the live-preview iframe: the same three UMD libraries and the same
 * hostTranspile/hostBody code the pipeline's own host emulator runs (lib/ship/hostTemplate.mjs,
 * served at /api/host-template so this is never a second copy), plus a probe that watches
 * console, network, storage and the runtime's own events without changing how the tool runs.
 * No sandbox attribute: the iframe stays same-origin to this page, so the parent can read
 * window.toolApi and the probe's logs directly, and can add its own listeners for 'finished',
 * 'question_done' and 'answer_checked' — no postMessage protocol needed. */

/* lang: the three shipped languages (runtime.tsx r10+; a tool ported on an older frozen runtime
 * ignores this prop entirely and stays English, since it has no lang contract inlined) */
export type LiveProps = { phase: number | null; navigableDots: boolean; muted: boolean; lang: "en" | "hi" | "gu"; classroom: boolean };

const PROBE = String.raw`
window.__hostErrors = [];
window.__consoleLog = [];
window.__networkLog = [];
window.__storageLog = [];
window.__eventLog = [];
window.addEventListener('error', function (e) { window.__hostErrors.push({ at: Date.now(), msg: 'error: ' + e.message }); });
window.addEventListener('unhandledrejection', function (e) { window.__hostErrors.push({ at: Date.now(), msg: 'promise: ' + String(e.reason) }); });
(function () {
  var oe = console.error, ow = console.warn;
  console.error = function () { window.__consoleLog.push({ at: Date.now(), level: 'error', msg: Array.prototype.join.call(arguments, ' ').slice(0, 300) }); return oe.apply(console, arguments); };
  console.warn = function () { window.__consoleLog.push({ at: Date.now(), level: 'warn', msg: Array.prototype.join.call(arguments, ' ').slice(0, 300) }); return ow.apply(console, arguments); };
})();
(function () {
  var _fetch = window.fetch;
  if (_fetch) window.fetch = function () { window.__networkLog.push({ at: Date.now(), kind: 'fetch', arg: String(arguments[0]) }); return _fetch.apply(window, arguments); };
  var _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m, u) { window.__networkLog.push({ at: Date.now(), kind: 'xhr', arg: m + ' ' + u }); return _open.apply(this, arguments); };
  if (window.WebSocket) { var _WS = window.WebSocket; window.WebSocket = function (url) { window.__networkLog.push({ at: Date.now(), kind: 'websocket', arg: String(url) }); return new _WS(url); }; }
  if (navigator.sendBeacon) { var _sb = navigator.sendBeacon.bind(navigator); navigator.sendBeacon = function () { window.__networkLog.push({ at: Date.now(), kind: 'sendBeacon', arg: String(arguments[0]) }); return _sb.apply(navigator, arguments); }; }
})();
(function () {
  ['setItem', 'getItem', 'removeItem', 'clear'].forEach(function (fn) {
    try {
      var orig = window.localStorage[fn].bind(window.localStorage);
      window.localStorage[fn] = function () { window.__storageLog.push({ at: Date.now(), kind: 'localStorage.' + fn, arg: String(arguments[0] || '') }); return orig.apply(window.localStorage, arguments); };
    } catch (e) {}
  });
  try {
    var _idb = window.indexedDB && window.indexedDB.open;
    if (_idb) window.indexedDB.open = function () { window.__storageLog.push({ at: Date.now(), kind: 'indexedDB.open', arg: String(arguments[0] || '') }); return _idb.apply(window.indexedDB, arguments); };
  } catch (e) {}
})();
['finished', 'question_done', 'answer_checked'].forEach(function (name) {
  window.addEventListener(name, function (e) { window.__eventLog.push({ at: Date.now(), name: name, detail: e && e.detail }); });
});
`;

export function buildHostDoc(
  vendor: { react: string; reactDom: string; babel: string },
  hostTemplate: string,
  args: { tsx: string; toolId: string; mediaId: string; props: LiveProps }
): string {
  // scripts embed raw JS/library text directly: break any literal "</script" so the HTML
  // tokenizer never ends the tag early (a no-op backslash inside JS, invisible to Babel/JSON.parse)
  const noScriptEnd = (s: string) => s.replace(/<\/script/gi, "<\\/script");
  const props = { phase: args.props.phase ?? undefined, navigableDots: args.props.navigableDots, muted: args.props.muted, lang: args.props.lang, classroom: args.props.classroom };
  return `<!doctype html><html><head><meta charset="utf-8"><style>
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid}
html,body{margin:0;padding:0;background:#f8fafc;height:100%}
svg{display:block;vertical-align:middle}
#root{display:flex;justify-content:center;align-items:flex-start;min-height:100vh;min-width:100%}
</style>
<script>${noScriptEnd(vendor.react)}</script>
<script>${noScriptEnd(vendor.reactDom)}</script>
<script>${noScriptEnd(vendor.babel)}</script>
</head><body><div id="root"></div>
<script>
var RAW = ${noScriptEnd(JSON.stringify(args.tsx))};
var TOOL_NAME = ${noScriptEnd(JSON.stringify(args.mediaId))};
var TOOL_ID = ${noScriptEnd(JSON.stringify(args.toolId))};
var PROPS = ${noScriptEnd(JSON.stringify(props))};
${PROBE}
${hostTemplate}
try {
  var __transpiled = hostTranspile(RAW, TOOL_NAME);
  window.__scriptBreak = /<\\/script/i.test(__transpiled);
  var __s = document.createElement('script');
  __s.textContent = hostBody(__transpiled, PROPS);
  document.body.appendChild(__s);
} catch (e) {
  window.__hostErrors.push({ at: Date.now(), msg: 'transpile: ' + e.message });
  window.__mountFailed = true;
}
</script>
</body></html>`;
}
