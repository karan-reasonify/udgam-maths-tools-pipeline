import type { Published } from "../types";
import { publishedTitle, publishedWhen } from "../lib/published";

const Check = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="5 12.5 10 17.5 19 7" />
  </svg>
);

/* the "Published <time>" pill of the preview bar; nothing for a tool that was never uploaded */
export function PublishedChip({ published, className }: { published: Published | null | undefined; className?: string }) {
  if (!published) return null;
  return (
    <span className={"pub-chip" + (published.changed ? " changed" : "") + (className ? " " + className : "")} title={publishedTitle(published)}>
      <Check /> Published {publishedWhen(published)}{published.changed ? " · edited since" : ""}
    </span>
  );
}

/* the side panel's line, in the shape of a timeline step: a green tick, "Published", the time under it */
export function PublishedLine({ published }: { published: Published | null | undefined }) {
  if (!published) {
    return (
      <div className="pub-line">
        <span className="pub-dot off" />
        <div><div className="pub-title">Not published yet</div></div>
      </div>
    );
  }
  return (
    <div className="pub-line" title={publishedTitle(published)}>
      <span className={"pub-dot" + (published.changed ? " changed" : "")}><Check /></span>
      <div>
        <div className="pub-title">Published</div>
        <div className="muted small">{publishedWhen(published)}</div>
        {published.changed && <div className="pub-warn small">edited since: publish again to update the live copy</div>}
      </div>
    </div>
  );
}
