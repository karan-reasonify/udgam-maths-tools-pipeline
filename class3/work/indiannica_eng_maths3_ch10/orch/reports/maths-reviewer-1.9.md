STATUS: fixes-needed (0 must-fix, 1 should-fix); final check of the re-look fixes on M1.S2.T6.C28.2D1 Calendar Explorer
SLOTS: M1.S2.T6.C28.2D1 (class 3 ch 10, maths, read-only)
CHECKS: quick check 32 pass 0 warn 0 fail 2 info. Recomputed with node (the chip rule as coded, Date.UTC).
CHECKS: (1) CLEAN. chip() `hide = !ghost && ((!won && asked) || j !== m)` and the colour band is drawn only when not hidden. Q2.1 Aug@Apr, Sep@May, Dec@Jun and Jul@May all print name only; Q2.2 Aug@Jun name only; Q2.3 Dec@Sep and Nov@Oct name only. A card on its own spot reads its true days (Aug 31, Nov 30). At the win the asked card moves to its own spot.
CHECKS: (2) CLEAN. ceFresh i === 1 places pl[3] and pl[6]: "Apr 30" on its own dip (April has 30). The trace walk [0,4] lights a ghost on May only and stops before June. "Count along from April: May, then June." names no number.
CHECKS: (3) CLEAN. "Say August, September, October along the second fist to find their own spots." names no number and matches the own-spot judge.
CHECKS: (5) CLEAN. arrowsOn = live && (P === 1 || (P === 3 && stage === "demo") || free), and still off in Q1.1. Phase 3 asks: no arrows. The tiles reach Feb 2026 to 2029 only, so Feb 2044/2046/2048 cannot be paged to. The warm-up, phase 1 and free play keep the arrows.
CHECKS: (6) CLEAN. headsOnly [it.head] holds through ask and trace: Q4.2 head 0 "Sun" (1 Nov 2026 is in column 0), Q4.3 head 1 "Mon" (1 Jun 2026 is in column 1). The answer columns (Fri 5, Wed 3) and the near-miss columns (Thu 4, Tue 2) stay blank until the win. The same holds in grid view and in hi/gu (र/सो, ર/સો). Week counter labels are "7 days"/"14 days"; win chips appear only at the win. No other state prints a weekday.
FAILURES:
- [should-fix] (4) phase 1 closing / learned: if the closing replaces Q1.3's win "Yes, 364 days and 1 more make 365 days, a whole year.", no phase 1 line ties 365 to a year in words.
  - The only 365 left is the board win chip "365 days" and the summary Thumb, neither of which names the year.
  - The closing says "A week has 7 days, and a year is a little more than 52 weeks."; the learned line says "...a year is about 52 weeks."
  - Fix: closing "A week has 7 days, and a year has 365 days, a little more than 52 weeks." and/or learned "You learned: 7 days make a week, and a year has 365 days." (57 characters).
  - New TR keys in hi and gu; quick-check bubble-no-repeat after the edit.
DECISIONS: the six fixes give nothing away and every number is exact; only the year wording above remains.
RISKS: none.
ESCALATE: none.
