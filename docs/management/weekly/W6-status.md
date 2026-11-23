# Weekly Status Report – W06

## 1. Submission

- Reporting period: 09–15/11/2026 (GMT+7).
- Weekly report due: 15/11/2026 at 22:00 (GMT+7), per the team schedule.
- The 07/11 planning meeting preceded the reporting period. Repository metrics use the end of 15/11/2026 as the cutoff. [W06 meeting minutes](https://docs.google.com/document/d/1fr-NWlKBWowOlxoZH7I-3ysHmClBHSom/edit)

## 2. Report Information

| Item | Value |
| --- | --- |
| Team | T07 – UniEvent |
| Week | W06 (09–15/11/2026) |
| Date of meeting | 07/11/2026 (W06 planning meeting) |
| Current phase / PA | PA2 closeout and PA3 software design kickoff |
| Prepared by | Unspecified in the minutes |
| Overall status | Pending team confirmation |

### 2.1 Task Status

The meeting proposed nine hours per member for W06 and nine for W07. Dates are internal targets. The minutes leave actual W06 progress open for confirmation.

| WBS / task | Owner | Planned finish | Status | % done | Notes |
| --- | --- | --- | --- | --- | --- |
| §1 Contribution evidence register, §5.2 account, role and dashboard data, §6.1 screen list and flow | Học | 13/11 | Planned | — | Also draft screen and account/role class specifications. [#52](https://github.com/UniEvent-T07/UniEvent/issues/52) · [#53](https://github.com/UniEvent-T07/UniEvent/issues/53) · [#54](https://github.com/UniEvent-T07/UniEvent/issues/54) |
| §4.1 Domain model, §5.2 proposal and approval data, §8 PA2 changes and impact | Huy | 15/11 | Planned | — | Also draft the class diagram and event/approval class specifications. [#55](https://github.com/UniEvent-T07/UniEvent/issues/55) · [#56](https://github.com/UniEvent-T07/UniEvent/issues/56) · [#57](https://github.com/UniEvent-T07/UniEvent/issues/57) |
| §2.1 Design goals and constraints, §§3.1–3.4 architectural style and C4 diagrams | Kiệt | 15/11 | Planned | — | Prepare the Context, Container and draft Component diagrams. [#58](https://github.com/UniEvent-T07/UniEvent/issues/58) |
| §3.5 Deployment diagram, §5.2 reservation, payment, ticket and SePay data | Minh | 15/11 | Planned | — | Also draft the integrated ERD and reservation/payment class specifications. [#61](https://github.com/UniEvent-T07/UniEvent/issues/61) · [#62](https://github.com/UniEvent-T07/UniEvent/issues/62) · [#63](https://github.com/UniEvent-T07/UniEvent/issues/63) |

On GitHub, 12 PA3 work packages were opened on 11/11. The W04–W05 reports and the PA2 PDF, DOCX and AI log merged into `main` on 11/11 and 13/11, respectively. [PR #51](https://github.com/UniEvent-T07/UniEvent/pull/51) · [PR #64](https://github.com/UniEvent-T07/UniEvent/pull/64)

### 2.2 Plan for Next Week

| WBS / task | Owner | Planned finish |
| --- | --- | --- |
| Finish account/role class, sequence and state diagrams, six detailed screens and remaining screen designs, then complete the accessibility checklist and integrate PA3 | Học | 21/11 |
| Finish event/approval class and sequence diagrams, integrate the class model, trace all 47 functional requirements to the design, consolidate AI usage and review §§4–7 | Huy | 21/11 |
| Draft at least three ADRs including SePay, hand off ticket and attendance data, finish ticket/attendance class specs and the QR check-in sequence, and review architecture against class, data and UI designs | Kiệt | 21/11 |
| Finish reservation/payment class specs, integrated ERD, normalisation and indexes, SePay sequence, reservation/payment state diagram and data design review | Minh | 20/11 |

### 2.3 Issues and Risks

These follow-ups come from GitHub activity during W06.

| ID | Description | Impact | Action | Owner | Due |
| --- | --- | --- | --- | --- | --- |
| W06-R1 | The C4 package was still open at the W06 cutoff. | Dependent diagrams and ADRs may diverge. | Check the C4 diagrams against module interfaces in the PA3 architecture review. [#58](https://github.com/UniEvent-T07/UniEvent/issues/58) · [#59](https://github.com/UniEvent-T07/UniEvent/issues/59) | Kiệt | 21/11 |
| W06-R2 | PA2 stakeholder validation remained open at the W06 cutoff. | Unresolved requirements may carry into design. | Record affected-owner or stakeholder confirmation and route design changes through the PA3 change register. [#36](https://github.com/UniEvent-T07/UniEvent/issues/36) · [#57](https://github.com/UniEvent-T07/UniEvent/issues/57) | Huy | 21/11 PA3 QA target |

### 2.4 Meeting Minutes

All four members attended. The minutes record their assignments for the upcoming week. Prior completions and blockers were left blank.

| Member | Present | Next |
| --- | --- | --- |
| Lê Nguyễn Quốc Học | Yes | Set up the contribution register, hand off account and dashboard data, and draft the screen flow and screen/class specifications. |
| Thái Quang Huy | Yes | Draft domain and class models, hand off proposal and approval data, and record changes since PA2. |
| Trần Vũ Anh Kiệt | Yes | Set design goals, prepare the architecture diagrams, and share the Container diagram with Minh for deployment. |
| Nguyễn Văn Minh | Yes | Prepare the Deployment diagram and draft ERD, specify reservation and payment data, and draft their class specifications. |

### 2.5 Metrics

| Metric | This week | Total through 15/11 |
| --- | --- | --- |
| Tasks completed — GitHub issues closed | 3 | 20 |
| Commits — main, including merge commits | 4 | 53 |
| Pull requests merged / reviewed | 2 merged / 2 reviewed | 14 merged / 11 reviewed |
| Open defects (PA5) recorded on GitHub | 0 recorded | 0 recorded |

- Issues #46, #47 and #49 closed on 10/11. The cumulative total includes the 17 closures in the [W05 report](W5-status.md).
- The main snapshot is [`cc8a9e3`](https://github.com/UniEvent-T07/UniEvent/commit/cc8a9e3). Four reachable commits have W06 commit timestamps. Five earlier commits also became reachable after the W05 cutoff, so the cumulative count rose from 44 to 53.
- PRs #51 and #64 both merged and received a submitted review in W06. Reviewed PRs are counted once per reporting window, by review submission date. Defect counts refer to GitHub tracking.
