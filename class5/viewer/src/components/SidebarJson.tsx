import { useMemo } from "react";
import type { Sidecar } from "../types";
import { validateSidecar } from "../lib/validateSidecar";
import { FindingCounts, FindingList } from "./FindingList";

export function SidebarJson({
  sidecar, chapterId, id, actualTsxBytes, actualTsxMd5,
}: { sidecar: Sidecar | null; chapterId: string; id: string; actualTsxBytes: number | null; actualTsxMd5: string | null }) {
  const findings = useMemo(
    () => (sidecar ? validateSidecar(sidecar, { chapterId, id, actualTsxBytes, actualTsxMd5 }) : []),
    [sidecar, chapterId, id, actualTsxBytes, actualTsxMd5]
  );
  if (!sidecar) return <p className="muted small">loading sidecar…</p>;
  return (
    <div>
      <FindingCounts findings={findings} />
      <FindingList findings={findings} />
    </div>
  );
}
