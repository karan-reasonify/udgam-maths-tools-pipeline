/* The host's own transpile + mount code, exactly as Reasonify_Frontend_TSX/src/components/
 * DynamicToolRenderer.tsx runs a 2D tool: the five import-stripping regexes, @babel/standalone
 * with the same two presets, the same eight replacements, and the same function body (hooks and
 * Math hoisted, an ErrorBoundary, the mock lucide icons, `var exports`, default props 850x550).
 *
 * ONE SOURCE: hostsim.mjs (the headless host-emulator check) and the viewer (the interactive
 * live preview) both import HOST from here, so a live-rendered tool and a checked tool run
 * identical transpile + mount code. Never fork this string.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);
/* files inside a package, found from its package.json (UMD builds are not in the packages' export maps) */
export const readVendor = (m) => {
  const [pkg, ...rest] = m.startsWith("@") ? [m.split("/").slice(0, 2).join("/"), ...m.split("/").slice(2)] : m.split("/");
  return fs.readFileSync(path.join(path.dirname(req.resolve(pkg + "/package.json")), ...rest), "utf8");
};

/* the three UMD libraries the host loads before any tool: React, ReactDOM, Babel standalone */
export const vendorLibs = () => ({
  react: readVendor("react/umd/react.production.min.js"),
  reactDom: readVendor("react-dom/umd/react-dom.production.min.js"),
  babel: readVendor("@babel/standalone/babel.min.js"),
});

export const HOST = String.raw`
function hostTranspile(rawCode, toolName) {
  var componentCode = rawCode
    .replace(/import\s+React\s*,?\s*\{[^}]*\}\s*from\s*['"]react['"];?\n?/g, '')
    .replace(/import\s+React\s+from\s*['"]react['"];?\n?/g, '')
    .replace(/import\s*\{[^}]*\}\s*from\s*['"]react['"];?\n?/g, '')
    .replace(/import\s*\{[^}]*\}\s*from\s*['"]lucide-react['"];?\n?/g, '')
    .replace(/import\s+.*\s+from\s*['"][^'"]+['"];?\n?/g, '');
  var transpiled = Babel.transform(componentCode, {
    presets: [['react', { runtime: 'classic' }], ['typescript', { isTSX: true, allExtensions: true }]],
    filename: toolName + '.tsx',
  }).code;
  transpiled = transpiled
    .replace(/var\s+_react\s*=\s*.*?;/g, '')
    .replace(/var\s+React\s*=\s*.*?;/g, '')
    .replace(/_interopRequireDefault\([^)]+\)/g, 'undefined')
    .replace(/require\([^)]+\)/g, 'undefined')
    .replace(/export\s+default\s+(\w+)\s*;/g, 'exports.default = $1;')
    .replace(/export\s+default\s+function\s+(\w+)/g, 'function $1')
    .replace(/export\s+default\s+/g, 'exports.default = ')
    .replace(/^export\s+/gm, '');
  var m = componentCode.match(/(?:const|var|let|function)\s+([A-Z][a-zA-Z0-9]*)\s*[=(:]/);
  if (m && transpiled.indexOf('exports.default') < 0) transpiled += '\nexports.default = ' + m[1] + ';';
  return transpiled;
}
/* the host's mock lucide icons (generateMockIconsCode): 169 components declared with "var" in the
   tool's scope, before the tool, so a tool that says "new Image()" or "File" gets an icon, not the
   browser's (the mascot fell back to its drawn dot on staging this way). Names copied from the host
   on 2026-09-22; the drawings do not matter here. */
var HOST_ICON_NAMES = ["Play","Pause","ChevronLeft","ChevronRight","ChevronUp","ChevronDown","ChevronLeftIcon","ChevronRightIcon","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","RotateCcw","RotateCw","RefreshCw","Repeat","SkipBack","SkipForward","Settings","Check","X","Plus","Minus","Info","AlertCircle","AlertTriangle","HelpCircle","CheckCircle","XCircle","Beaker","FlaskConical","Droplets","Activity","Thermometer","ThermometerSun","Atom","Zap","Flame","Brain","Lightbulb","GraduationCap","BookOpen","Eye","EyeOff","Maximize","Minimize","ZoomIn","ZoomOut","Volume2","VolumeX","Volume1","Music","Grid","Grid2X2","Grid3X3","LayoutGrid","List","Sun","Moon","Cloud","CloudRain","Wind","Leaf","Flower","TreePine","Circle","Square","Triangle","Hexagon","Pentagon","Star","Heart","Download","Upload","Copy","Trash","Trash2","Edit","Pencil","Save","Search","Hand","Pointer","Hammer","Wrench","Timer","Clock","Hourglass","Target","Award","Medal","Trophy","Flag","Sparkles","Wand","Loader2","RefreshCcw","HandMetal","Footprints","PersonStanding","Home","Menu","MoreHorizontal","MoreVertical","Lock","Unlock","Layers","Send","MessageCircle","MessageSquare","Image","File","FileText","Move","Crosshair","Ruler","Compass","PenTool","Slash","Divide","Hash","Percent","Equal","Calculator","Maximize2","Minimize2","Undo","Redo","MousePointer","Type","Palette","StepBack","StepForward","Rewind","FastForward","PlayCircle","PauseCircle","StopCircle","Sliders","SlidersHorizontal","Filter","Shuffle","Anchor","Link","ExternalLink","Scale","Scissors","Pipette","Gauge","Power","ToggleLeft","ToggleRight","Waves","Magnet","Plug","Cylinder","Box","Cog","Infinity","Orbit","SunMedium","CloudSun","Snowflake","Gem","Microscope","TestTube","FlaskRound","Bolt","Radar"];
function hostIcons() {
  return 'function createIconComponent(svgPath) { return function Icon(props) { var size = props.size || 24; var className = props.className || ""; ' +
    'return React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: className, dangerouslySetInnerHTML: { __html: svgPath } }); }; }\n' +
    'var icons = { ' + HOST_ICON_NAMES.map(function (n) { return n + ": createIconComponent('')"; }).join(', ') + ' };\n' +
    'var { ' + HOST_ICON_NAMES.join(', ') + ' } = icons;\n';
}
function hostBody(transpiled, componentParams) {
  return "(function() {\n" +
    "const { useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext, createContext, forwardRef, memo, Fragment } = React;\n" +
    "const { PI, sin, cos, tan, atan2, sqrt, abs, min, max, floor, ceil, round, pow, random } = Math;\n" +
    "const cn = (...classes) => classes.filter(Boolean).join(' ');\nconst clsx = cn;\n" +
    "class ErrorBoundary extends React.Component {\n constructor(props) { super(props); this.state = { hasError: false, error: null }; }\n" +
    " static getDerivedStateFromError(error) { return { hasError: true, error }; }\n" +
    " componentDidCatch(error, info) { window.__hostErrors.push('boundary: ' + String(error && error.message || error)); }\n" +
    " render() { return this.state.hasError ? React.createElement('div', { id: 'boundary' }, String(this.state.error)) : this.props.children; }\n}\n" +
    hostIcons() +
    "try {\n var exports = {};\n" + transpiled + "\n var Component = exports.default;\n if (!Component) throw new Error('No default export found');\n" +
    " var componentParams = " + JSON.stringify(componentParams) + ";\n var props = Object.assign({}, { width: 850, height: 550 }, componentParams);\n" +
    " var root = ReactDOM.createRoot(document.getElementById('root'));\n" +
    " root.render(React.createElement(ErrorBoundary, null, React.createElement(Component, props)));\n" +
    "} catch (error) { window.__hostErrors.push('init: ' + String(error && error.message || error)); }\n})();";
}
`;
