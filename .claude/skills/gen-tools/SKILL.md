---
name: gen-tools
description: Make the 2D tools of an Udgam maths chapter of any class (or one slot) from the lpv2 plan by the runbook udgam_maths_claude.md - one builder agent per slot, check, maths / visual / play reviewers, upload audit, report; upload only on the user's word. Use whenever asked to make, start, continue, remake or review tools for an Udgam chapter or slot of any class (e.g. "make tools for class 4 udgam chapter 2", "make tools for class 3 udgam chapter 1", "make the tool for M1.S1.T2.C4"), or when /gen-tools is invoked. Arguments - <class> <publication|school> <chapter> [SLOT_ID] [lean] (lean = fewer reviewers, fewer tokens).
argument-hint: <class> <publication|school> <chapter> [SLOT_ID] [lean|sprint]
---

# Make Udgam maths tools (any class)

The same as `.claude/commands/gen-tools.md`; both are shortcuts into the runbook.

1. Read `udgam_maths_claude.md` (the runbook) and follow its flow, steps 0 to 8, for the class and chapter
   named in the request (the class number is `<N>`: 3, 4, 5, ...). Step 0 starts with the class folder: if
   `class<N>/` does not exist, run `node classctl.mjs new --class <N>` and tell the user the defaults it prints
   (children's age, plan ids, textbook folder, viewer port, agent prefix, skin libraries). With a SLOT_ID, make
   only that slot ("make ONE tool"). With `lean`, use the lean mode (step 5: the maths reviewer on every tool;
   visual and play only where a tool brings something new); without it, the full mode. With `sprint` (one SLOT_ID), use the
   runbook's "Sprint mode": ONE tool in about 40 minutes with EVERY review kept (maths, the Gemini pass when the owner keeps it,
   language, the full visual review in en/hi/gu, play, the final check); the time comes from the owner's decisions asked once before
   the builder, overlap and parallel agents (up to 3 Opus, 4 for a complex tool), run by the clock
   `node orch.mjs sprint start|status|lap|stop`. The agents are
   `<pfx>-tool-builder` and the rest, `<pfx>` being the class's `agentPrefix` (`udgam` for class 4,
   `udgam<N>` otherwise).
2. If class, publication or school, or chapter is missing, ask for it. "udgam" means publication
   indiannica. A concept id such as `M1.S1.T2.C4` names the slot `M1.S1.T2.C4.2D1`.
3. Everything in the runbook's lessons and the "standard look" bullets of the root `CLAUDE.md` applies without the user saying it: the image
   pass (step 5c) runs for EVERY tool and gives real objects instead of plain blocks; the runtime's header buttons, berry keys, Kiko's
   thinking pose and the Answer key's blink are never redone by a tool; a decimal is answered on the Decimal card where the picture has one.
4. Before launching agents, load the root `token-policy.json`: adaptive mode is mandatory unless full review is explicitly requested (cap
   concurrency and Opus agents, keep contexts below the policy limits, batch language/status/audit work, run visual/play review only for
   new or risky patterns). **Resuming a chapter** (`continue`, or after a session limit, reset or compaction): before continuing, read the
   root `token-policy.json` and apply it to the resumed chapter. Do not recreate the previous context and do not restart completed
   agents. Resume from the existing chapter state and checkpoint (`node orch.mjs resume --class <N> --ch <n>`,
   `node cli.mjs status --ch <n>`; the runbook's "Resume rule", step 0), and launch only what is unfinished.
5. Stop at the report (step 8). Upload (step 10) only when the user says so. A remake of an already built
   chapter (the runbook's REMAKE section) and a `classctl sync --apply` also wait for the user's word.
