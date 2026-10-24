import type { Published } from "../types";

/* an ISO time as the local "2026-10-21 13:32" (by hand: toLocaleString differs from one browser to the next); lib/ship/published.mjs `stamp` */
export function stamp(iso: string | null | undefined): string {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export const publishedWhen = (p: Published) => (p.at ? stamp(p.at) : "(time not recorded)");

export function publishedTitle(p: Published) {
  return [
    p.at ? `uploaded ${stamp(p.at)}` : "uploaded; the time was not recorded (a later dry run replaced it)",
    p.plan ? `plan ${p.plan}` : "",
    p.changed ? "the pair has been edited since: what is live is the older copy, publish again to update it" : "",
  ].filter(Boolean).join(" · ");
}
