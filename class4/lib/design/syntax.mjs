/* TSX syntax check using @babel/standalone (same compiler hostsim & preview use).
 * Catches syntax errors (unclosed tags, missing brackets, typos) introduced during visual rewrite.
 */
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);
let BabelInstance = null;

function getBabel() {
  if (BabelInstance) return BabelInstance;
  try {
    BabelInstance = req("@babel/standalone");
  } catch (e) {
    throw new Error(`Failed to load @babel/standalone: ${e.message}`);
  }
  return BabelInstance;
}

export function checkTsxSyntax(code, filename = "tool.tsx") {
  const Babel = getBabel();
  // Strip import statements as hostsim does for standalone tool.tsx
  const componentCode = code
    .replace(/import\s+React\s*,?\s*\{[^}]*\}\s*from\s*['"]react['"];?\n?/g, "")
    .replace(/import\s+React\s+from\s*['"]react['"];?\n?/g, "")
    .replace(/import\s*\{[^}]*\}\s*from\s*['"]react['"];?\n?/g, "")
    .replace(/import\s*\{[^}]*\}\s*from\s*['"]lucide-react['"];?\n?/g, "")
    .replace(/import\s+.*\s+from\s*['"][^'"]+['"];?\n?/g, "");

  try {
    Babel.transform(componentCode, {
      presets: [
        ["react", { runtime: "classic" }],
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
      filename,
    });
    return { ok: true, error: null };
  } catch (err) {
    return {
      ok: false,
      error: err.message || String(err),
      loc: err.loc || null,
    };
  }
}
