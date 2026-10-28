---
description: Make the 2D tools of an Udgam maths chapter of any class (or one slot) by the runbook udgam_maths_claude.md - builder agents, check, reviewers (all three, or lean), audit, report; upload only on the user's word
argument-hint: <class> <publication|school> <chapter> [SLOT_ID] [lean|sprint]
---
Make Udgam maths tools. Arguments: $ARGUMENTS
(The same as `.claude/skills/gen-tools/SKILL.md`; both are shortcuts into the runbook.)

0. The standards in the root `CLAUDE.md` ("Pictures are real objects", "Standard look") and the runbook's lessons apply WITHOUT the user
   saying them: the image pass runs for every tool, the runtime's look is never redrawn by a tool.
1. Read `udgam_maths_claude.md` (the runbook) and follow its flow, steps 0 to 8, for the class and chapter
   named in the arguments (`<class>` is the class number `<N>`: 3, 4, 5, ...). Step 0 starts with the class
   folder: if `class<N>/` does not exist, run `node classctl.mjs new --class <N>` and tell the user the
   defaults it prints. With a SLOT_ID, make only that slot ("make ONE tool"). With `lean`, use the lean mode
   (step 5: the maths reviewer on every tool; visual and play only where a tool brings something new);
   without it, the full mode. With `sprint` (one SLOT_ID), use the runbook's "Sprint mode": ONE tool in about 40 minutes with
   EVERY review kept (maths, the Gemini pass when the owner keeps it, language, the full visual review in en/hi/gu, play, the final
   check), the time coming from the owner's decisions asked once before the builder, overlap and parallel agents (5 Opus agents at once, no cap on Sonnet agents), run by the clock `node orch.mjs sprint start|status|lap|stop`. The agents are `<pfx>-tool-builder` and the rest, `<pfx>` being the class's
   `agentPrefix` (`udgam` for class 4, `udgam<N>` otherwise).
   Before launching agents, load the root token-policy.json. Adaptive mode is mandatory unless full review is explicitly requested: cap Opus agents at 5 running at once (Sonnet agents are uncapped), keep contexts below policy limits, batch language/status/audit work, and run the full visual review on every tool (every frame, en/hi/gu) and the play review wherever a tool is new or risky: no visual or necessary check is ever dropped to save tokens or time (the owner, 2026-10-28).
   Resuming a chapter (`continue`, or after a session limit, reset or compaction): before continuing, read the root token-policy.json and apply it to the resumed chapter. Do not recreate the previous context and do not restart completed agents. Resume from the existing chapter state and checkpoint (`node orch.mjs resume --class <N> --ch <n>`, `node cli.mjs status --ch <n>`; the runbook's "Resume rule", step 0), and launch only what is unfinished.
2. If class, publication or school, or chapter is missing, ask for it. "udgam" means publication
   indiannica. A concept id such as `M1.S1.T2.C4` names the slot `M1.S1.T2.C4.2D1`.
3. Stop at the report (step 8). Upload (step 10) only when the user says so. A remake of an already built
   chapter (the runbook's REMAKE section) and a `classctl sync --apply` also wait for the user's word.



