/* Shared shapes between the viewer's client and server. Loose on purpose: the sidecar is
 * produced by lib/ship/port.mjs and this viewer must tolerate whatever a given tool actually
 * wrote, so validation happens in code (lib/validateSidecar.ts), not in these types. */

export type ToolSummary = {
  chapterId: string;
  id: string;
  title: string | null;
  toolId: string | null;
  hasTsx: boolean;
  hasJson: boolean;
  tsxBytes: number | null;
  jsonBytes: number | null;
  /* a work/ source with no ported pair yet (hasTsx / hasJson stay false): only its HTML preview can be shown */
  inProgress: boolean;
  /* work/<chapter>/<id>/<id>.preview.html, built from tool.tsx by every preview / check; stale = tool.tsx was saved after it */
  hasPreview: boolean;
  previewAt: string | null;
  previewBytes: number | null;
  previewStale: boolean;
  status: PipelineStatus | null;
  checkState: CheckState;
  published: Published | null;
};

/* lib/ship/published.mjs: null = never uploaded. at is null for a tool uploaded before the time was recorded;
   changed = the pair is no longer what went up (null when that cannot be told) */
export type Published = { at: string | null; plan: string | null; legacy: boolean; changed: boolean | null };

/* how a slot's check stands NOW (viewer/meta.mjs, the reading `node cli.mjs status` gives): "stale" is a
   check whose tool, runtime or mascot has changed since it ran */
export type CheckState = "pass" | "warn" | "fail" | "stale" | "unchecked";
export type ChecksCount = Record<CheckState, number>;

export type ChapterMeta = {
  chapterId: string;
  number: number | null; // the id's _ch<N>; null when the id does not follow the pattern
  class: number | null;  // the class in the id; not the folder's class for a chapter fetched into the wrong folder
  title: string | null;  // line 1 of work/<chapter>/mounts.md
  slots: number;
  ported: number;
  checks: ChecksCount;
};

/* GET /api/meta: the class the viewer runs for (pipeline.config.json), its chapters and the totals */
export type ViewerMeta = {
  class: number;
  pub: string; pubLabel: string;
  medium: string; mediumLabel: string;
  subject: string; subjectLabel: string;
  chapters: ChapterMeta[];
  totals: { chapters: number; slots: number; ported: number; checks: ChecksCount };
};

export type CheckSummary = { pass: number; warn: number; fail: number; info: number; at: string };

export type PipelineStatus = {
  stage?: string;
  chapterId?: string;
  planId?: string;
  version?: number;
  checks?: CheckSummary;
  checkedTool?: string;
  ported?: { source?: string; at?: string; tsx?: string; tsxBytes?: number; tsxMd5?: string };
  hostsim?: { ok?: boolean; at?: string };
  publish?: { ok?: boolean; dry?: boolean; at?: string; plan?: string; urls?: Record<string, string>; problems?: string[] };
  published?: Published | null; // /api/tools/.../status answers the derived reading, not the raw record
  updatedAt?: string;
  [k: string]: unknown;
};

/* the sidecar JSON, as wide as port.mjs actually writes it (see the fields walked in review) */
export type Sidecar = {
  slotId: string;
  mediaId: string;
  toolId: string;
  title: string;
  component: string;
  url: string | null;
  conceptIds: string[];
  toolQuestions: {
    itemsPerPhase: number;
    authoredFallback: { phase: number; items: { id: string; answer: unknown; question_id?: string | null }[] }[];
  };
  scoring: { pointsPerCorrect: number; scorableItems: number; maxScore: number };
  windowMethods: string[];
  windowAliases: string[];
  events: string[];
  terminalEvent: { name: string; doneId: string; detail: string[] };
  phaseMap: { phases: { n: number; concept: string; conceptId: string; objectiveIds: string[]; items: string[] }[] };
  build?: { source?: string; tsxBytes?: number; tsxMd5?: string; checks?: CheckSummary };
  unusedQuestionIds?: string[];
  [k: string]: unknown;
};

export type Finding = { level: "pass" | "warn" | "fail" | "info"; id: string; msg: string };

export type HostsimPhaseResult = { n: number; ok: boolean; problems: string[]; transpileMs?: number; mode: "user" | "ai" };
export type HostsimResult = { ok: boolean; results: HostsimPhaseResult[] };

export type CheckResult = { group: string; id: string; level: "pass" | "warn" | "fail" | "info"; msg: string };
export type CheckRunResult = {
  id: string;
  summary: CheckSummary;
  results: CheckResult[];
  /* check auto-ports the instant it passes (lib/check/runAndShip.mjs) — null when fail > 0 or port itself failed */
  ported: { tsxFile: string; jsonFile: string; hostsimOk: boolean; hostsimResults: HostsimPhaseResult[] } | null;
  portError: string | null;
};
