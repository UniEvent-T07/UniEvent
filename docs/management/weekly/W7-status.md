# Weekly Status Report – W07

## 1. Submission

- Reporting period: 16–22/11/2026 (GMT+7).
- Weekly report due: 22/11/2026 at 22:00 (GMT+7), per the team schedule.
- Repository metrics use the end of 22/11/2026 as the cutoff. The minutes are titled Week 7, but the report header repeats the W06 period and its 07/11/2026 meeting date. The W07 meeting date is pending confirmation. [W07 meeting minutes](https://docs.google.com/document/d/1bA69zCdmerSz8jIoFgBgkCzPjsxfO4-G/edit)

## 2. Report Information

| Item | Value |
| --- | --- |
| Team | T07 – UniEvent |
| Week | W07 (16–22/11/2026) |
| Date of meeting | Pending confirmation |
| Current phase / PA | PA3 software design closeout and PA4 preparation |
| Prepared by | Unspecified in the minutes |
| Overall status | Pending team confirmation. All four members reported completing their individual PA3 assignments. Integration follow-ups were planned for W08. |

### 2.1 Task Status

The completion figures apply to individual deliverables as recorded in the minutes. Planned dates and issue closures come from the PA3 GitHub work packages.

| WBS / task | Owner | GitHub target | Status reported | % done | Repository evidence |
| --- | --- | --- | --- | --- | --- |
| Account and role class specs, sequence/state diagrams, screen specs and accessibility checklist | Học | 18–21/11 | Completed | 100% | Issues closed on 20/11. The PA3 PDF and DOCX reached the submission branch on 21/11. [#52](https://github.com/UniEvent-T07/UniEvent/issues/52) · [#53](https://github.com/UniEvent-T07/UniEvent/issues/53) · [#54](https://github.com/UniEvent-T07/UniEvent/issues/54) · [PR #66](https://github.com/UniEvent-T07/UniEvent/pull/66) |
| Class diagram, event proposal and approval specs and sequence, requirements traceability and AI usage log | Huy | 19–21/11 | Completed | 100% | Issues closed on 20/11, along with the PA2 stakeholder-validation issue. [#36](https://github.com/UniEvent-T07/UniEvent/issues/36) · [#55](https://github.com/UniEvent-T07/UniEvent/issues/55) · [#56](https://github.com/UniEvent-T07/UniEvent/issues/56) · [#57](https://github.com/UniEvent-T07/UniEvent/issues/57) |
| Architecture decisions, ticket and attendance specs, QR check-in sequence and design patterns | Kiệt | 15–21/11 | Completed | 100% | Issues closed on 20/11. Three proposed ADRs merged on 21/11. [#58](https://github.com/UniEvent-T07/UniEvent/issues/58) · [#59](https://github.com/UniEvent-T07/UniEvent/issues/59) · [#60](https://github.com/UniEvent-T07/UniEvent/issues/60) · [PR #65](https://github.com/UniEvent-T07/UniEvent/pull/65) |
| Integrated ERD, reservation and payment specs, SePay sequence, state machine and data constraints | Minh | 19–20/11 | Completed | 100% | Issues closed on 20/11. [#61](https://github.com/UniEvent-T07/UniEvent/issues/61) · [#62](https://github.com/UniEvent-T07/UniEvent/issues/62) · [#63](https://github.com/UniEvent-T07/UniEvent/issues/63) |

The PA3 [PDF](../../../pa/PA3/T07-PA3.pdf) and [DOCX](../../../pa/PA3/T07-PA3.docx) merged into `main` on 23/11 at 00:34 (GMT+7), during W08. Moodle submission time is unverified. [PR #66](https://github.com/UniEvent-T07/UniEvent/pull/66)

### 2.2 Plan for Next Week

| WBS / task | Owner | Planned finish |
| --- | --- | --- |
| Finalize consistency across account, role and UI design | Học | 25/11 |
| Finalize class diagrams and requirements traceability | Huy | 25/11 |
| Verify architecture, ticket and attendance flows | Kiệt | 25/11 |
| Align the ERD with the reservation and payment design | Minh | 25/11 |
| Review the documentation and merge individual contributions | All | 29/11 |
| Review the integrated PA3 document | All | 29/11 |

The team reported that W08 had no meeting. The W08 makeup meeting is planned for Tuesday, 01/12/2026, and the W09 progress meeting is planned for Saturday, 05/12/2026.

### 2.3 Issues and Risks

| ID | Description | Impact | Action | Owner | Due |
| --- | --- | --- | --- | --- | --- |
| W07-R1 | K05 confirmation and the BR-20 cutoff proposal were pending in the published ADRs. | The payment expiry edge case affects expected test results for F05/F06. | Use the current BR-20 requirement for expected results and record any approved change in the register. [#59](https://github.com/UniEvent-T07/UniEvent/issues/59) · [ADR-003](../../design/adr/003-sepay-payment-fulfilment.md) | Kiệt, Huy, Minh | Before freezing PA4 payment test cases |

### 2.4 Meeting Minutes

All four members attended. They reviewed their completed deliverables, identified overlaps and consistency changes, and agreed to revise the related sections and prepare individual branches for integration in W08. The minutes list no individual blockers.

| Member | Present | Done since last meeting | Next |
| --- | --- | --- | --- |
| Lê Nguyễn Quốc Học | Yes | Account and role specifications, sequence/state diagrams, screen specifications and accessibility checklist | Align the account, role and UI designs. |
| Thái Quang Huy | Yes | Class diagram, event proposal and approval specifications and sequence, requirements traceability and AI usage log | Finalize class diagrams and traceability. |
| Trần Vũ Anh Kiệt | Yes | ADRs, ticket and attendance specifications, QR check-in sequence and design patterns | Verify architecture, ticket and attendance flows. |
| Nguyễn Văn Minh | Yes | Integrated ERD, reservation and payment specifications, SePay sequence, state machine and data constraints | Align the ERD with the reservation and payment design. |

### 2.5 Metrics

| Metric | This week | Total through 22/11 |
| --- | --- | --- |
| Tasks completed — GitHub issues closed | 13 | 33 |
| Commits — main, including merge commits | 2 | 55 |
| Pull requests merged / reviewed | 1 merged / 1 reviewed | 15 merged / 12 reviewed |
| Open defects (PA5) recorded on GitHub | 0 recorded | 0 recorded |

- Issue #36 and PA3 issues #52–#63 closed on 20/11. The cumulative total includes the 20 closures in the [W06 report](W6-status.md).
- The main snapshot is [`e7bd8d9`](https://github.com/UniEvent-T07/UniEvent/commit/e7bd8d9). Commit `b6ae2a5` and the PR #65 merge are the two main commits in the reporting window.
- PR #65 merged and received two approvals within W07. It counts once as a reviewed PR. PR #66's approval and merge occurred after midnight on 23/11 (GMT+7) and count toward W08. Defect counts refer to GitHub tracking.
