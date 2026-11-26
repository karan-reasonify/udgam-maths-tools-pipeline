STATUS: ok
SLOTS: 9 audited; 9 READY (dry run ready); 0 blocked
FILES: all 9 tsx+json pairs present; tsx 546-589 KB (<700 KB); json 45-52 KB
CHECKS: 94-99 pass, 0 fail, 0 warn on all 9; status: check passed, none stale ("source changed" absent)
FAILURES: none
DECISIONS: plan indiannica_eng_maths5_ch10_v3 is live for all 9 mounts; no [skip], no plan changed, no orphan, no remap stop; hostsim ok (4 phases, finishes) for all 9; lp2_media 0 rows to update for all 9; voice "silent: no clips" on all 9; no image lines
RISKS:
- Re-keyed mounts (C9, C15, C19, C24, C25, C29, C30, C32): the mount folder differs from the slot id (C9->C13, C15->C18, C19->C23, C24->C28, C25->C33, C29->C38, C30->C43, C32->C48). Sidecar url and dry run name the same folder, so the audit rule "url ends in /<slot>/<slot>.tsx" fails by design. Lead should confirm the first upload of one re-keyed slot writes <mountId>/<mountId>.tsx (file name from the mount url) before uploading the rest.
- Every slot is "new" in the bucket (first upload of this chapter).
- runtime fetch(voiceBase()) appears once per tsx: the dormant shared clip loader; voice is silent, so no request is made.
- C25 and C29 are stage "ported", not "final": READY is technical only; they wait for the owner's review as stated.
ESCALATE: none; lp2_media rows: none to ask about
TABLE:
M1.S1.T2.C8 READY (final)
M1.S2.T3.C9 READY (final; re-keyed to C13 folder)
M1.S2.T4.C15 READY (final; re-keyed to C18 folder)
M2.S3.T5.C19 READY (ported; re-keyed to C23 folder)
M2.S4.T6.C24 READY (ported; re-keyed to C28 folder)
M2.S4.T7.C25 READY technically (ported; wait for owner review; re-keyed to C33)
M3.S5.T8.C29 READY technically (ported; wait for owner review; re-keyed to C38)
M3.S5.T9.C30 READY (final; re-keyed to C43 folder)
M3.S6.T10.C32 READY (final; re-keyed to C48 folder)
