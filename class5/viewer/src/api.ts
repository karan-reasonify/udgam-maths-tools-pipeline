/* relative URLs: the viewer is also served by the hub under /c/<class>/ */
import type { CheckRunResult, HostsimResult, PipelineStatus, Sidecar, ToolSummary, ViewerMeta } from "./types";

async function json<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, init);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status} ${await r.text().catch(() => "")}`);
  return r.json() as Promise<T>;
}

export const api = {
  meta: () => json<ViewerMeta>("api/meta"),
  tools: () => json<ToolSummary[]>("api/tools"),
  tsx: async (chapterId: string, id: string) => {
    const r = await fetch(`api/tools/${chapterId}/${id}/tsx`);
    if (!r.ok) throw new Error(`tsx ${chapterId}/${id}: HTTP ${r.status}`);
    return { text: await r.text(), md5: r.headers.get("x-md5") ?? "", bytes: Number(r.headers.get("x-bytes") ?? 0) };
  },
  sidecar: (chapterId: string, id: string) => json<Sidecar>(`api/tools/${chapterId}/${id}/json`),
  status: (chapterId: string, id: string) => json<PipelineStatus>(`api/tools/${chapterId}/${id}/status`),
  /* the slot's HTML preview page (work/, view only); `v` is its build time, so a rebuilt page is fetched again */
  previewUrl: (chapterId: string, id: string, query: URLSearchParams) => `api/tools/${chapterId}/${id}/preview?${query}`,
  hostTemplate: async () => (await fetch("api/host-template")).text(),
  vendor: async () => {
    const [react, reactDom, babel] = await Promise.all([
      fetch("vendor/react.js").then((r) => r.text()),
      fetch("vendor/react-dom.js").then((r) => r.text()),
      fetch("vendor/babel.js").then((r) => r.text()),
    ]);
    return { react, reactDom, babel };
  },
  runHostsim: (chapterId: string, id: string) => json<HostsimResult>(`api/tools/${chapterId}/${id}/hostsim`, { method: "POST" }),
  runCheck: (chapterId: string, id: string) => json<CheckRunResult>(`api/tools/${chapterId}/${id}/check`, { method: "POST" }),
};
