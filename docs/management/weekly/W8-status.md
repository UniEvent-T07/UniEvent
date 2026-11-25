# Weekly Status Report – W08

## 1. Submission

- Reporting period: 23–29/11/2026 (GMT+7).
- Weekly report due: 29/11/2026 at 22:00 (GMT+7), per the team schedule.
- Repository metrics were frozen on **25/11/2026 at 23:28 (GMT+7)**, before the planned cutoff of 29/11/2026 at 23:59. The `main` snapshot is [`6f68396`](https://github.com/UniEvent-T07/UniEvent/commit/6f68396). Activity after the freeze is not counted here.

## 2. Report Information

| Item | Value |
| --- | --- |
| Team | T07 – UniEvent |
| Week | W08 (23–29/11/2026) |
| Date of meeting | Tuesday, 24/11/2026 (makeup meeting) |
| Current phase / PA | PA4 test planning (PA4.1) and PA5 setup |
| Prepared by | Lê Nguyễn Quốc Học (team lead) |
| Overall status | Green, confirmed by the team lead. The PA4/PA5 plan and the Docs foundation merged on 25/11, two days before the 27/11 target. Setup v0 and the feature test-case drafts are due on 29/11 and had not started at the freeze. See W08-R1 and W08-R6. |

### 2.1 Task Status

Percentages count only the completion criteria in each issue that have a file or PR as evidence at the freeze.

**(a) Tasks planned in W07 for W08**

| WBS / task | Owner | Planned finish | Status | % done | Repository evidence |
| --- | --- | --- | --- | --- | --- |
| Finalize consistency across account, role and UI design | Học | 25/11 | No evidence | — | No W08 issue, PR or commit covers this follow-up. PA3 had already merged on 23/11. [PR #66](https://github.com/UniEvent-T07/UniEvent/pull/66) |
| Finalize class diagrams and requirements traceability | Huy | 25/11 | No evidence | — | No W08 issue, PR or commit covers this follow-up. |
| Verify architecture, ticket and attendance flows | Kiệt | 25/11 | No evidence | — | No W08 issue, PR or commit covers this follow-up. |
| Align the ERD with the reservation and payment design | Minh | 25/11 | No evidence | — | No W08 issue, PR or commit covers this follow-up. |
| Review the documentation and merge individual contributions | All | 29/11 | Merged | 100% (merge) | The PA3 [PDF](../../../pa/PA3/T07-PA3.pdf) and [DOCX](../../../pa/PA3/T07-PA3.docx) merged into `main` on 23/11 at 00:34. [PR #66](https://github.com/UniEvent-T07/UniEvent/pull/66) |
| Review the integrated PA3 document | All | 29/11 | Partial | 25% | Huy approved PR #66 on 23/11 at 00:33. No review by the other three members is recorded on GitHub. [PR #66](https://github.com/UniEvent-T07/UniEvent/pull/66) |

**(b) PA4.1 tasks**

| WBS / task | Owner | Planned finish | Status | % done | Repository evidence |
| --- | --- | --- | --- | --- | --- |
| PA4/PA5 roadmap, agent guide, glossary and ADR-004 | Học | 25/11 | Completed | 100% | Merged on 25/11 with Huy's approval. [Plan](../PA4-phan-cong.md), [AGENTS.md](../../../AGENTS.md), [GLOSSARY.md](../../../GLOSSARY.md) and [ADR-004](../../design/adr/004-same-site-hosting-and-session-cookies.md), which is still Proposed. [PR #68](https://github.com/UniEvent-T07/UniEvent/pull/68) |
| #69 Docs foundation: test-case template and `contracts.md` | Học | 27/11 | Closed on 25/11 | 60% (3/5) | Done: the [template](../../test/TEMPLATE-Fxx.md) and [test README](../../test/README.md), the [`contracts.md`](../../design/contracts.md) draft, and the `Payment Receipt` name in GLOSSARY and `contracts.md`. Open: PR #75 was approved by Huy only, not by Kiệt and Minh as the issue requires. The Discord notice has no repository evidence. [#69](https://github.com/UniEvent-T07/UniEvent/issues/69) · [PR #75](https://github.com/UniEvent-T07/UniEvent/pull/75) |
| Align the template with the course docx and add the test-case checker | Học | Not set | In review | — | PR open since 25/11, with no review yet. `scripts/test-cases.mjs` exists only on this PR's branch. [PR #76](https://github.com/UniEvent-T07/UniEvent/pull/76) |
| #70 Setup v0 for the shared repository | Học | 29/11 | Not started | 0% (0/9) | `src/` holds only [README.md](../../../src/README.md). No PR is linked. [#70](https://github.com/UniEvent-T07/UniEvent/issues/70) |
| #71 F01 and F08 test-case drafts | Học | 29/11 | Not started | 0% (0/4) | `docs/test/F01.md` and `F08.md` do not exist. [#71](https://github.com/UniEvent-T07/UniEvent/issues/71) |
| #72 F02, F03 and F06 exception test-case drafts | Huy | 29/11 | In progress | 20% (1/5) | Done: the GLOSSARY review, through Huy's approval of PR #68 on 25/11. `docs/test/F02.md` and `F03.md` do not exist. [#72](https://github.com/UniEvent-T07/UniEvent/issues/72) · [PR #68](https://github.com/UniEvent-T07/UniEvent/pull/68) |
| #73 F04 and F05 test-case drafts and seam design review | Kiệt | 29/11 | Not started | 0% (0/6) | No review of ADR-004 on PR #68, which was due 26/11. The `contracts.md` review is due 28/11. `docs/test/F04.md` and `F05.md` do not exist. [#73](https://github.com/UniEvent-T07/UniEvent/issues/73) |
| #74 F06 and F07 test-case drafts | Minh | 29/11 | Not started | 0% (0/5) | No review on PR #68, which was due 26/11. `docs/test/F06.md` and `F07.md` do not exist. [#74](https://github.com/UniEvent-T07/UniEvent/issues/74) |

On the PR #76 branch, `node scripts/test-cases.mjs` reported `0/47 FR covered · 0 cases · 0/20 specifications · 0 error(s), 16 warning(s)`. The warnings are the eight missing `docs/test/Fxx.md` files and their uncovered FRs.

### 2.2 Plan for Next Week

All rows are planned work from the [PA4/PA5 plan](../PA4-phan-cong.md). PA4 must be submitted before Saturday 05/12, and all PA5 work must be finished before Wednesday 09/12. Docs and code run in parallel from Monday 30/11, and Docs PA4 takes priority when deadlines clash.

| WBS / task | Owner | Planned finish |
| --- | --- | --- |
| F01 core: registration, email verification, login and session checks | Học | 01/12 |
| PA4.2: complete test design, case list, 20 detailed cases and `FR → TC` links covering all 47 Must-have FRs. Huy reviews coverage and Minh reviews test method. | All | 02/12 |
| Staging E1 (Vercel, Render, Supabase, per ADR-004) and checker assignment | Học | 03/12 |
| F02, then F03 code | Huy | 03/12 (PA5.1) |
| F04 code, which F02 publishing and F05 sales depend on | Kiệt | 03/12 (PA5.1) |
| PA5.1: integrate F01–F04 on staging, from account to a Published event with ticket types | Học, Huy, Kiệt | 03/12 |
| PA4.3: merge the Test Plan, matrix, contribution table and AI log into the docx, and submit PA4 | Học | 04/12 |
| Setup v1: README for local run and tests, clean-clone check, branch protection, PR and issue templates | Học | 04/12 |
| F05, then the F07 scanner and scan status | Kiệt | 06/12 (PA5.2) |
| F06 code with seed orders, then F07 phone testing once staging is up | Minh | 06/12 (PA5.2) |
| F08 code, then the rest of F01 | Học | 06/12 (PA5.2) |
| PA5.2: integrate F05–F08 on staging with real data from earlier features | All | 06/12 |

The makeup meeting for W08 took place on Tuesday, 24/11. The W09 progress meeting is planned for Saturday, 05/12/2026.

### 2.3 Issues and Risks

| ID | Description | Impact | Action | Owner | Due |
| --- | --- | --- | --- | --- | --- |
| W07-R1 | **Still open.** The BR-20 cutoff is unresolved. ADR-003 is Proposed, with K05 confirmation pending, and the PA3 proposal to use the last check under lock is not approved. The spec keeps the PA2 rule that the first valid confirmation must commit before the hold expires. | Expected results for F05/F06 payment expiry cases. | Write expected results against the PA2 rule. Record any approved change in the register. [ADR-003](../../design/adr/003-sepay-payment-fulfilment.md) · [`contracts.md` §D](../../design/contracts.md) · [#59](https://github.com/UniEvent-T07/UniEvent/issues/59) | Huy (rule), Kiệt (F05/F06 seam) | 02/12 (PA4.2) |
| W08-R1 | Setup v0 may slip past 29/11 and delay coding for the whole team. At the freeze, `src/` has no app skeleton and #70 has no PR. | Parallel coding from 30/11 and PA5.1 on 03/12. | Học puts v0 ahead of the F01/F08 Docs. Members who need to start early build on their own branch against `contracts.md`. [#70](https://github.com/UniEvent-T07/UniEvent/issues/70) | Học | 29/11 |
| W08-R2 | Kiệt owns three features: F04, F05 and the F07 scanner. | F07 scanning and PA5.2. | If F07 slips, Huy takes the scan status once F03 is done. [Plan](../PA4-phan-cong.md) | Học | 06/12 (PA5.2) |
| W08-R3 | The Render free tier sleeps and Supabase pauses. | NFR-01 measurements and SePay IPN delivery on staging. | Wake staging before test sessions. Upgrade Render to a paid plan on acceptance day if needed. [ADR-004](../../design/adr/004-same-site-hosting-and-session-cookies.md) | Học | 08/12 (PA5.3) |
| W08-R4 | Login fails on iPhone Safari because of third-party cookies. ADR-004 is still Proposed. | F07 scanning on iPhone Safari (NFR-01, NFR-03). | Call the API through the same-domain `/api/*` rewrite per ADR-004. Kiệt reviews ADR-004 in the Setup v0 PR. Minh tests on a real iPhone. [ADR-004](../../design/adr/004-same-site-hosting-and-session-cookies.md) | Học, Minh (test) | 03/12 (staging) |
| W08-R5 | Required PA4.1 reviews are missing. Kiệt and Minh have no review on PR #68 (due 26/11) or PR #75. PR #76, which adds the checker, has no reviewer yet. | The template and `contracts.md` may change after members start drafting. CI cannot run the checker until PR #76 merges. | Kiệt reviews `contracts.md` by 28/11 per #73. Minh reviews the test template in PR #76. [PR #68](https://github.com/UniEvent-T07/UniEvent/pull/68) · [PR #75](https://github.com/UniEvent-T07/UniEvent/pull/75) · [PR #76](https://github.com/UniEvent-T07/UniEvent/pull/76) | Kiệt, Minh | 28/11 |
| W08-R6 | No `docs/test/Fxx.md` draft exists at the freeze, and #71–#74 have no PR. The checker reports 0/47 FRs covered. | The PA4.1 deliverable on 29/11 and the start of PA4.2. | Each owner drafts on the template from `main` and runs `node scripts/test-cases.mjs` before opening a PR. [#71](https://github.com/UniEvent-T07/UniEvent/issues/71) · [#72](https://github.com/UniEvent-T07/UniEvent/issues/72) · [#73](https://github.com/UniEvent-T07/UniEvent/issues/73) · [#74](https://github.com/UniEvent-T07/UniEvent/issues/74) | Học, Huy, Kiệt, Minh | 29/11 |
| W08-R7 | `contracts.md` §D lists 13 open questions. One asks whether the proposed state names for Review Round, Ticket Type, Payment Exception and Attendance Record become enums, and it must be settled before the Setup v0 schema is written. | The Setup v0 schema, seed fixtures and the expected results in seam test cases. | Kiệt settles the state names and Học updates GLOSSARY before the schema. Huy and Kiệt settle the other questions and record the answers in the issues. [`contracts.md` §D](../../design/contracts.md) | Kiệt, Huy, Học | 29/11 (state names); 02/12 (others) |

### 2.4 Meeting Minutes

The W08 makeup meeting took place on Tuesday, 24/11/2026, and all four members attended. The minutes have not been published yet. From W08 onward the team will paste its minutes into the shared minutes document. The two columns below list repository activity in W08 up to the freeze and the next task in each member's PA4.1 issue. They are not quotes from the minutes. No blockers are recorded on GitHub.

| Member | Present | Done since last meeting | Next | Blockers |
| --- | --- | --- | --- | --- |
| Lê Nguyễn Quốc Học | Yes | Opened PRs #66, #67, #68 and #75 (all merged) and PR #76 (in review). Closed #69. | Setup v0 ([#70](https://github.com/UniEvent-T07/UniEvent/issues/70)), F01/F08 drafts ([#71](https://github.com/UniEvent-T07/UniEvent/issues/71)). | |
| Thái Quang Huy | Yes | Approved PRs #66, #67, #68 and #75, and merged PRs #66 and #75. | F02/F03 drafts and the BR-19 exception case ([#72](https://github.com/UniEvent-T07/UniEvent/issues/72)). | |
| Trần Vũ Anh Kiệt | Yes | No W08 issue, PR or review activity recorded at the freeze. | Review ADR-004 and `contracts.md`, then the F04/F05 drafts ([#73](https://github.com/UniEvent-T07/UniEvent/issues/73)). | |
| Nguyễn Văn Minh | Yes | No W08 issue, PR or review activity recorded at the freeze. | Review the test template, then the F06/F07 drafts and the NFR-01 scan script ([#74](https://github.com/UniEvent-T07/UniEvent/issues/74)). | |

### 2.5 Metrics

| Metric | This week | Total through 25/11 23:28 |
| --- | --- | --- |
| Tasks completed — GitHub issues closed | 1 | 34 |
| Commits — main, including merge commits | 7 | 63 |
| Pull requests merged / reviewed | 4 merged / 4 reviewed | 19 merged / 16 reviewed |
| Open defects (PA5) recorded on GitHub | 0 recorded | 0 recorded |

- Issue [#69](https://github.com/UniEvent-T07/UniEvent/issues/69) closed on 25/11. The total is the 33 closures in the [W07 report](W7-status.md) plus #69, which matches `gh issue list --state closed`.
- The main snapshot is [`6f68396`](https://github.com/UniEvent-T07/UniEvent/commit/6f68396). As in W07, commits are counted by date. Seven commits on `main` are dated in the window, from `7494271` (PR #66 merge, 23/11 00:34) to `6f68396` (PR #75 merge, 25/11 21:53). The total rose from 55 at [`e7bd8d9`](https://github.com/UniEvent-T07/UniEvent/commit/e7bd8d9) to 63 because the PR #66 merge also brought in `e541333`, dated 21/11.
- PRs [#66](https://github.com/UniEvent-T07/UniEvent/pull/66), [#67](https://github.com/UniEvent-T07/UniEvent/pull/67), [#68](https://github.com/UniEvent-T07/UniEvent/pull/68) and [#75](https://github.com/UniEvent-T07/UniEvent/pull/75) merged in W08, and each received one approval from Huy. PR #66's approval and merge happened after midnight on 23/11 (GMT+7), so it counts toward W08, as stated in W07. Open PR [#76](https://github.com/UniEvent-T07/UniEvent/pull/76) has no review and is not counted.
- No issue carries a defect label, and PA5 code has not started. Defect counts refer to GitHub tracking.
