# Weekly Status Report – W05

## 1. Submission

- Repository: `/docs/management/weekly/W5-status.md`.
- Reporting period: 02–08/11/2026 (GMT+7), following W04's reporting period of 26/10–01/11/2026.
- Meeting date: 01/11/2026, as supplied by the team lead; this meeting precedes the W05 reporting period.
- Meeting notes and progress percentages below are team-reported. Repository metrics in §2.5 are a retrospective snapshot through 08/11/2026, 23:59:59 (GMT+7), not measurements taken at the meeting.
- Weekly reports are committed to Git; the PA2 document has a separate submission.

## 2. Report Information

| Item | Value |
| --- | --- |
| Team | T07 – UniEvent |
| Week | W05 (02–08/11/2026) |
| Date of meeting | 01/11/2026 |
| Current phase / PA | PA2 – Software Requirements Specification |
| Prepared by | Lê Nguyễn Quốc Học |
| Overall status | Amber – Finalization in progress |

### 2.1 Task Status

| WBS / task | Owner | Planned finish | Status | % done | Notes |
| --- | --- | --- | --- | --- | --- |
| Complete Functional and Non-functional Requirements | Học | 07/11/2026 | In progress | 90% | Finalize FRs, NFRs and acceptance criteria |
| Complete Use Case Model and Business Rules | Huy | 07/11/2026 | In progress | 90% | Verify actors, UC relationships and business rules |
| Complete Use Case Specifications | Kiệt, Minh | 07/11/2026 | In progress | 90% | Complete main, alternative and exception flows |
| Complete Prototype / Mockups | Kiệt | 07/11/2026 | In progress | 90% | Align screens with main use cases |
| Complete Traceability and Requirements Review | Huy, Minh | 08/11/2026 | To do | 90% | Map FR–UC–Screen and resolve review findings |
| Finalize and submit PA2 | Học | 08/11/2026 | To do | 90% | Integrate, proofread and prepare final PDF/source |

Statuses and percentages are retained from the team lead's note. The last two tasks pair `To do` with `90%`; the team needs to reconcile these values. Closed draft-work issues do not establish completion of the finalization tasks above.

### 2.2 Plan for Next Week

| WBS / task | Owner | Planned finish |
| --- | --- | --- |
| Review and freeze PA2 baseline | All | 08/11/2026 |
| Prepare PA3 architecture and design plan | Kiệt | 14/11/2026 |
| Identify domain classes and data entities | Huy, Minh | 14/11/2026 |
| Update project board and PA3 task assignments | Học | 14/11/2026 |

The PA2 baseline freeze remains a W05 closing milestone on 08/11; the PA3 activities are planned for W06 (09–15/11/2026).

### 2.3 Issues and Risks

| ID | Description | Impact | Action | Owner | Due |
| --- | --- | --- | --- | --- | --- |
| R1 | Inconsistency between requirements and use cases | High | Cross-check FR, AC and UC specifications | All | 07/11/2026 |
| R2 | Incomplete use case flows or prototype coverage | High | Review all Must-have use cases and corresponding screens | Kiệt, Minh | 07/11/2026 |
| R3 | Incomplete traceability and review records | Medium | Complete matrix and document issue resolutions | Huy | 08/11/2026 |

Repository follow-up: [issue #36 — R1.2](https://github.com/UniEvent-T07/UniEvent/issues/36) remains open for affected-owner/stakeholder validation and any required TA confirmation. Document-owner scope acceptance does not establish external validation.

### 2.4 Meeting Minutes

| Member | Present | Done since last meeting | Next | Blockers |
| --- | --- | --- | --- | --- |
| Học | True | Requirements integration and coordination | Finalize and submit PA2 | Not recorded |
| Huy | True | Requirements and UC model | Traceability and review | Not recorded |
| Kiệt | True | UC specifications and prototype | Complete mockups and UC review | Not recorded |
| Minh | True | UC specifications and validation | Resolve review findings | Not recorded |

Attendance and work summaries are supplied by the team lead. `Not recorded` means the note contains no blocker information; it does not confirm that there were no blockers.

### 2.5 Metrics

| Metric | This week | Total |
| --- | --- | --- |
| Tasks completed — GitHub issues closed | 11 | 17 |
| Commits — main, including merge commits | 1 | 44 |
| Pull requests merged / reviewed | 1 merged / 0 reviewed | 12 merged / 9 reviewed |
| Open defects (PA5) recorded on GitHub at period end | 0 recorded | 0 recorded |

#### Counting method and evidence

- **Window:** 02/11/2026, 00:00:00 through 08/11/2026, 23:59:59 (GMT+7). Totals are cumulative through the same cutoff. Evidence was retrieved on 10/11/2026; activity after the cutoff is excluded.
- **Tasks:** one closed GitHub issue counts as one tracked task; this is separate from the six summary tasks in §2.1 and does not measure their completion percentage. The 11 issues closed during W05 are [#35](https://github.com/UniEvent-T07/UniEvent/issues/35), [#37](https://github.com/UniEvent-T07/UniEvent/issues/37), [#38](https://github.com/UniEvent-T07/UniEvent/issues/38), [#39](https://github.com/UniEvent-T07/UniEvent/issues/39), [#40](https://github.com/UniEvent-T07/UniEvent/issues/40), [#41](https://github.com/UniEvent-T07/UniEvent/issues/41), [#42](https://github.com/UniEvent-T07/UniEvent/issues/42), [#43](https://github.com/UniEvent-T07/UniEvent/issues/43), [#44](https://github.com/UniEvent-T07/UniEvent/issues/44), [#45](https://github.com/UniEvent-T07/UniEvent/issues/45) and [#48](https://github.com/UniEvent-T07/UniEvent/issues/48). The six earlier closures are #17, #19 and #29–#32, giving 17 cumulatively. Issues #46, #47 and #49 closed on 10/11 and are excluded. GitHub Project board fields could not be inspected because the connected token lacks `read:project` permission.
- **Commits:** counted on `main` at [`06ec3c7`](https://github.com/UniEvent-T07/UniEvent/commit/06ec3c7fff12872add36cbdf14dc8e5bf6c85ca1), using commit timestamps and counting merge commits. `git rev-list --count 06ec3c7` gives 44; only `06ec3c7` falls in W05. PA2 document commits `572d2c0` and `3a6bdf5` occurred on 03/11 on a separate branch and are not included in the main-only metric. The 10/11 merge into `PA2` and this retrospective report are also excluded.
- **PRs:** one merge in W05, [PR #50](https://github.com/UniEvent-T07/UniEvent/pull/50); cumulative merged PRs are #1–#5, #23, #25–#28, #33 and #50 (12). Reviewed means distinct PRs with a submitted GitHub review, counted by review submission date. The nine reviewed PRs through the cutoff are #3–#5, #23, #25–#28 and #50. PR #50's approval was submitted on 28/10, so it adds a W05 merge but no W05 review. Merged and reviewed counts overlap and must not be added together. PR #51 was created on 10/11 and is excluded.
- **Defects:** no GitHub issues are recorded as PA5 defects. `0 recorded` describes the tracker, not an executed-test result or proof that the application has no defects.
- **Reconciliation:** the supplied note lists tasks as 15/25, commits as 1/2 and PRs as 1/2. These figures are not substantiated by the repository counting methods above; the table uses the reproducible repository counts instead. Additional completed work outside GitHub needs team evidence before inclusion.
