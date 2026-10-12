/* Structural checks on a tool's sidecar JSON, done in the browser against the fetched file — no
 * Chrome, no CLI, instant. This does NOT repeat `node cli.mjs check` (docs/CHECKS.md); it only
 * proves the sidecar is internally consistent and matches the folder it sits in. Vocabulary
 * (pass/warn/fail/info) matches lib/check/check.mjs so the two read the same way. */
import type { Finding, Sidecar } from "../types";

/* the eleven NCERT verbs every tool's window.toolApi carries (docs/CHECKS.md "tool-api") */
const NCERT_VERBS = ["getState", "gotoStep", "say", "answer", "check", "reset", "next", "prev", "highlight", "setParam", "playDemo"];

const REQUIRED: [string, "string" | "array" | "object"][] = [
  ["slotId", "string"], ["mediaId", "string"], ["toolId", "string"], ["title", "string"], ["component", "string"],
  ["conceptIds", "array"], ["stage", "object"], ["toolQuestions", "object"], ["scoring", "object"],
  ["windowMethods", "array"], ["windowAliases", "array"], ["events", "array"], ["terminalEvent", "object"], ["phaseMap", "object"],
];

const typeOf = (v: unknown) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);

export function validateSidecar(
  sidecar: Sidecar,
  meta: { chapterId: string; id: string; actualTsxBytes: number | null; actualTsxMd5: string | null }
): Finding[] {
  const F: Finding[] = [];
  const add = (id: string, level: Finding["level"], msg: string) => F.push({ id, level, msg });
  const ok = (id: string, cond: boolean, good: string, bad: string, level: Finding["level"] = "fail") =>
    add(id, cond ? "pass" : level, cond ? good : bad);

  if (!sidecar || typeof sidecar !== "object") {
    add("parse", "fail", "the file is not a JSON object");
    return F;
  }

  // required fields + types
  const missing = REQUIRED.filter(([k]) => !(k in sidecar));
  const wrongType = REQUIRED.filter(([k, t]) => k in sidecar && typeOf((sidecar as any)[k]) !== t);
  ok("required-fields", !missing.length && !wrongType.length,
    `all ${REQUIRED.length} required fields present with the right type`,
    [missing.length ? `missing: ${missing.map((m) => m[0]).join(", ")}` : "", wrongType.length ? `wrong type: ${wrongType.map((m) => m[0]).join(", ")}` : ""].filter(Boolean).join("; "));

  // ids match the folder / file names
  ok("id-matches-folder", sidecar.mediaId === meta.id && sidecar.slotId === meta.id,
    `slotId and mediaId both equal ${meta.id}`, `slotId=${sidecar.slotId ?? "?"} mediaId=${sidecar.mediaId ?? "?"}, folder is ${meta.id}`);
  ok("component-name", sidecar.component === `${meta.id}.tsx`,
    `component is ${meta.id}.tsx`, `component is ${sidecar.component ?? "?"}, expected ${meta.id}.tsx`);
  if (sidecar.url) {
    ok("url-suffix", sidecar.url.endsWith(`/${meta.id}/${meta.id}.tsx`),
      "url ends in /<id>/<id>.tsx", `url does not end in /${meta.id}/${meta.id}.tsx: ${sidecar.url}`);
  } else {
    add("url-suffix", "warn", "no url on the sidecar yet (set at publish, from the plan's own mount)");
  }

  // phaseMap <-> conceptIds agree
  const phases = sidecar.phaseMap?.phases ?? [];
  if (Array.isArray(sidecar.conceptIds) && phases.length) {
    const phaseConcepts = phases.map((p) => p.conceptId);
    const same = phaseConcepts.length === sidecar.conceptIds.length && phaseConcepts.every((c, i) => c === sidecar.conceptIds[i]);
    ok("phasemap-concepts", same, "phaseMap's concept ids equal conceptIds, in order",
      `phaseMap: [${phaseConcepts.join(", ")}] vs conceptIds: [${sidecar.conceptIds.join(", ")}]`);
  } else {
    add("phasemap-concepts", "warn", "conceptIds or phaseMap.phases is empty; cannot compare");
  }

  // toolQuestions <-> phaseMap agree
  const fallback = sidecar.toolQuestions?.authoredFallback ?? [];
  if (fallback.length && phases.length) {
    const countOk = fallback.length === phases.length && fallback.every((p, i) => p.phase === phases[i].n);
    ok("phase-count", countOk, `${phases.length} phases, matching in phaseMap and toolQuestions`,
      `toolQuestions has ${fallback.length} phase(s), phaseMap has ${phases.length}`);
    const perPhase = sidecar.toolQuestions.itemsPerPhase;
    const itemsOk = fallback.every((p) => p.items.length === perPhase);
    ok("items-per-phase", itemsOk, `every phase carries ${perPhase} item(s), as itemsPerPhase says`,
      `item counts: ${fallback.map((p) => p.items.length).join(", ")}, itemsPerPhase is ${perPhase}`);
  } else {
    add("phase-count", "warn", "toolQuestions.authoredFallback or phaseMap.phases is empty; cannot compare");
  }

  // scoring: maxScore = pointsPerCorrect x scorableItems, scorableItems = total authored items
  const totalItems = fallback.reduce((a, p) => a + p.items.length, 0);
  if (sidecar.scoring && totalItems) {
    const { pointsPerCorrect, scorableItems, maxScore } = sidecar.scoring;
    ok("scoring-items", scorableItems === totalItems, `scorableItems (${scorableItems}) equals the authored items (${totalItems})`,
      `scorableItems is ${scorableItems}, but ${totalItems} items are authored`);
    ok("scoring-max", maxScore === pointsPerCorrect * scorableItems,
      `maxScore ${maxScore} = pointsPerCorrect ${pointsPerCorrect} x scorableItems ${scorableItems}`,
      `maxScore ${maxScore} != pointsPerCorrect ${pointsPerCorrect} x scorableItems ${scorableItems} (${pointsPerCorrect * scorableItems})`);
  } else {
    add("scoring-items", "warn", "scoring or authored items missing; cannot compare");
  }

  // the eleven NCERT verbs, exactly
  if (Array.isArray(sidecar.windowMethods)) {
    const have = [...sidecar.windowMethods].sort();
    const want = [...NCERT_VERBS].sort();
    const same = have.length === want.length && have.every((v, i) => v === want[i]);
    ok("toolapi-verbs", same, `all eleven NCERT verbs, none extra: ${NCERT_VERBS.join(", ")}`,
      `windowMethods: [${have.join(", ")}] vs the eleven: [${want.join(", ")}]`);
  }
  if (Array.isArray(sidecar.windowAliases)) {
    ok("toolapi-alias", sidecar.windowAliases.includes("toolApi") && (!sidecar.toolId || sidecar.windowAliases.includes(sidecar.toolId)),
      `window.toolApi and window.${sidecar.toolId} both aliased`, `windowAliases: [${sidecar.windowAliases.join(", ")}]`);
  }

  // terminalEvent
  if (sidecar.terminalEvent) {
    ok("done-id", sidecar.terminalEvent.doneId === `${meta.id}.DONE`,
      `doneId is ${meta.id}.DONE`, `doneId is ${sidecar.terminalEvent.doneId}, expected ${meta.id}.DONE`);
    const detail = sidecar.terminalEvent.detail ?? [];
    const wantDetail = ["toolId", "mediaId", "doneId", "phase", "conceptId", "score", "maxScoreThisPhase", "correctFirstTry", "itemsAnswered", "stars"];
    const missingDetail = wantDetail.filter((k) => !detail.includes(k));
    ok("finished-detail", !missingDetail.length, "finished's detail carries every field a host reads",
      `finished's detail is missing: ${missingDetail.join(", ")}`, "warn");
  }

  // the .tsx actually on disk matches what this sidecar says it built
  if (sidecar.build && meta.actualTsxBytes != null && meta.actualTsxMd5) {
    ok("build-md5", sidecar.build.tsxMd5 === meta.actualTsxMd5, "the .tsx on disk matches the sidecar's build.tsxMd5 (port built this exact pair)",
      `sidecar says ${sidecar.build.tsxMd5}, the file on disk hashes to ${meta.actualTsxMd5} (hand-edited since port, or ported at a different time)`);
    ok("build-bytes", sidecar.build.tsxBytes === meta.actualTsxBytes, `tsxBytes matches (${meta.actualTsxBytes})`,
      `sidecar says ${sidecar.build.tsxBytes} bytes, file is ${meta.actualTsxBytes} bytes`, "warn");
  }

  if (Array.isArray(sidecar.unusedQuestionIds) && sidecar.unusedQuestionIds.length) {
    add("unused-question-ids", "info", `${sidecar.unusedQuestionIds.length} plan question id(s) the tool never used: ${sidecar.unusedQuestionIds.join(", ")}`);
  }

  return F;
}
