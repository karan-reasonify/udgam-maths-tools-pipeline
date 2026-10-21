import { useMemo, useState } from "react";
import type { ChapterMeta, CheckState, ToolSummary } from "../types";
import { CheckCounts } from "./CheckCounts";
import { publishedTitle, publishedWhen } from "../lib/published";

const NO_CHECKS = { pass: 0, warn: 0, fail: 0, stale: 0, unchecked: 0 };

/* "Chapter 5 · Decimals"; the raw id when it does not follow the pattern; a chapter whose id names
   another class says so */
export function chapterLabel(c: ChapterMeta, classNo: number | null) {
  const other = classNo != null && c.class != null && c.class !== classNo ? `Class ${c.class} · ` : "";
  const name = c.number == null ? c.chapterId : `Chapter ${c.number}`;
  return `${other}${name}${c.title ? ` · ${c.title}` : ""}`;
}

function badgeTitle(state: CheckState, t: ToolSummary) {
  const checks = t.status?.checks;
  const he = t.status?.handEdit as { at?: string } | undefined;
  if (he && state === "pass") return `hand-edited pair, approved ${String(he.at ?? "").slice(0, 10)}: \`approve\` proved these exact files (the check counts below are of the source)`;
  if (state === "stale") return "checked, but the tool, runtime or mascot has changed since: re-run check (a hand-edited pair: run approve)";
  if (!checks || state === "unchecked") return "not checked";
  return `${checks.pass} pass · ${checks.warn} warn · ${checks.fail} fail`;
}

export function ToolList({
  tools, chapters, classNo, selected, onSelect,
}: {
  tools: ToolSummary[];
  chapters: ChapterMeta[]; // /api/meta: every chapter the pipeline knows, ported or not; [] until it loads
  classNo: number | null;
  selected: string | null;
  onSelect: (chapterId: string, id: string) => void;
}) {
  /* before /api/meta answers, the chapters the ported tools name */
  const groups = useMemo<ChapterMeta[]>(() => chapters.length ? chapters
    : [...new Set(tools.map((t) => t.chapterId))].sort().map((chapterId) => (
      { chapterId, number: null, class: null, title: null, slots: 0, ported: 0, checks: NO_CHECKS })), [chapters, tools]);
  const [chapterFilter, setChapterFilter] = useState<string>("all");

  const visible = chapterFilter === "all" ? groups : groups.filter((c) => c.chapterId === chapterFilter);

  return (
    <nav className="tool-list">
      {groups.length > 1 && (
        <label className="tool-list-filter">
          chapter
          <select value={chapterFilter} onChange={(e) => setChapterFilter(e.target.value)}>
            <option value="all">All Chapters ({groups.length})</option>
            {groups.map((c) => (
              <option key={c.chapterId} value={c.chapterId}>{chapterLabel(c, classNo)} ({c.ported}/{c.slots})</option>
            ))}
          </select>
        </label>
      )}
      {visible.map((c) => {
        const list = tools.filter((t) => t.chapterId === c.chapterId);
        return (
          <div key={c.chapterId} className="tool-list-chapter">
            <div className="tool-list-chapter-title" title={c.chapterId}>{chapterLabel(c, classNo)}</div>
            {c.slots > 0 && (
              <div className="tool-list-chapter-sub">
                <span>{c.ported} of {c.slots} ported</span>
                <CheckCounts checks={c.checks} />
              </div>
            )}
            {!list.length && <p className="muted small tool-list-empty">no tools ported yet</p>}
            {list.map((t) => {
              const key = `${t.chapterId}/${t.id}`;
              const badge = t.checkState && t.checkState !== "unchecked" ? t.checkState : null;
              return (
                <button
                  key={key}
                  className={"tool-list-item" + (selected === key ? " selected" : "")}
                  onClick={() => onSelect(t.chapterId, t.id)}
                  disabled={!t.hasTsx || !t.hasJson}
                >
                  <span className={"tool-badge" + (badge ? ` ${badge}` : "")} title={badgeTitle(t.checkState, t)} />
                  <span className="tool-list-item-text">
                    <span className="tool-list-item-title">{t.title ?? t.id}</span>
                    <span className="tool-list-item-id">{t.id}</span>
                    {t.published && (
                      <span className={"tool-list-item-pub" + (t.published.changed ? " changed" : "")} title={publishedTitle(t.published)}>
                        ✓ published {publishedWhen(t.published)}{t.published.changed ? " · edited since" : ""}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
