# Weekly Status Report — W04

Introduction to Software Engineering · UniEvent — Team T07

Planning draft — PA2 / Phase 1 (26/10–01/11/2026)

This is a task-assignment and meeting-preparation draft. Update attendance, status, completion %, issues and metrics using actual evidence after the meetings. New PA2 WBS R1–R6 is proposed, not yet approved.

## 1. Submission

- Repository: /docs/management/weekly/W4-status.md
- Reporting period: Monday 26/10/2026 – Sunday 01/11/2026.
- Weekly report due: Sunday 01/11/2026, 22:00 (GMT+7), per PA1 team schedule.
- Meetings: 26/10 — Kickoff; 31/10 — Phase 1 Progress Review.
- Weekly status reports are committed to Git, not uploaded to Moodle. The PA2 document has a separate submission.

## 2. Report Information

| Item | Value |
| --- | --- |
| Team | T07 – UniEvent |
| Week | W04 (26/10–01/11/2026) |
| Date of meeting | 26/10/2026 (Kickoff); 31/10/2026 (Phase 1 Review) |
| Current phase / PA | PA2 – Software Requirements Specification (SRS) |
| Prepared by | Lê Nguyễn Quốc Học (Team Lead) |
| Overall status | TBD — Green / Amber / Red after actual review |

### Approved ownership to confirm at kickoff

| Member | Feature ownership (applies to §5.1, §5.4, §7) | Cross-cutting work package(s) |
| --- | --- | --- |
| Học | F01 Accounts, organisations & roles; F08 Organiser dashboard | R1.1, R3.1, R6.1, R6.3 |
| Huy | F02 Event creation/submission; F03 Event approval | R1.2, R3.2, R4.1, R5.1, R6.2 |
| Kiệt | F04 Ticket configuration; F07 QR check-in/check-out | R4.2 |
| Minh | F05 Ticket reservation; F06 Payment confirmation/QR ticket issuance | R5.2; payment technical spike remains a separate planned activity |

Each feature owner writes their feature's FRs + acceptance criteria + detailed use case specifications; the owner of a cross-cutting package integrates, but does not rewrite, those feature-specific deliverables.

## 3. Task Status

Phase 1 target by 31/10: A reviewable SRS draft: feature requirements and UC flows, initial stakeholder validation, NFR/BR drafts, a single UC register/diagram and first screen mockups. § numbers below refer to the PA2 template, not the PA1 document. These are new proposed WBS IDs, replacing the PA1 requirements task breakdown for execution tracking.

| WBS / task | Owner | Planned finish | Status | % done | Notes — PA2 section and source reuse |
| --- | --- | --- | --- | --- | --- |
| R1.1 — Draft purpose, scope, glossary | Học | 29/10 | Planned | TBD | PA2 §2.1–§2.2. Reuse unchanged scope from PA1 §2.4 and environment §3.3; glossary is new. |
| R1.2 — Validate problem and stakeholders; draft overview | Huy | 30/10 | Planned | TBD | PA2 §3–§4. Reuse PA1 §2.1, §2.3 and PA0 background as hypotheses; new interview/validation findings and sources required. |
| R2.1 — FR + AC + UC Specs for F01, F08 | Học | 30/10 | Planned | TBD | PA2 §5.1, §5.4, §7. Reuse PA1 §2.3–§2.4 (roles, account/admin scope, dashboard). Numbered FRs, Given/When/Then ACs and flows are new. |
| R2.2 — FR + AC + UC Specs for F02, F03 | Huy | 30/10 | Planned | TBD | PA2 §5.1, §5.4, §7. Reuse PA1 §2.4; specify submit → review → approve/reject/request changes consistently. |
| R2.3 — FR + AC + UC Specs for F04, F07 | Kiệt | 30/10 | Planned | TBD | PA2 §5.1, §5.4, §7. Reuse PA1 §2.4, especially F07 check-in and out; F04 audience restrictions belong to F11, not Must-have. |
| R2.4 — FR + AC + UC Specs for F05, F06 | Minh | 30/10 | Planned | TBD | PA2 §5.1, §5.4, §7. Reuse PA1 §2.4: 15-min hold, one authorised payOS channel, verified callbacks, idempotent issue; specify failures. |
| R3.1 — Measurable NFRs, first draft | Học | 30/10 | Planned | TBD | PA2 §5.2. Convert PA1 §2.1 preliminary targets and §3.3 conditions into measurable, verifiable NFRs. |
| R3.2 — Master domain / business rules, first draft | Huy | 30/10 | Planned | TBD | PA2 §5.3. Derive rules from PA1 §2.4; each feature owner supplies candidate rules; Huy owns one canonical BR-ID table. |
| R4.1 — Actor list, UC register, Use Case Diagram | Huy | 29/10 | Planned | TBD | PA2 §6.1–§6.3. Reuse actor definitions from PA1 §2.3; new UC IDs/diagram; publish IDs for all R2 owners. |
| R4.2 — Screen inventory and initial mockups | Kiệt | 31/10 | Planned | TBD | PA2 §8. New deliverable. Each R2 owner supplies screens, validation/error states and navigation for their features by 29/10. |
| R5.1 — Draft FR ↔ UC ↔ Screen traceability | Huy | 31/10 | Planned | TBD | PA2 §9. New matrix. FR/UC IDs come from owners + R4.1; Screen IDs from Kiệt. PA3 design/PA4 test columns remain pending. |
| R5.2 — Set up requirements review checklist and issue log | Minh | 31/10 | Planned | TBD | PA2 §10. New review evidence; prepare checks and record actual 31/10 findings (not fabricated resolutions). |
| R6.1 — Team info and contribution evidence setup | Học | 31/10 | Planned | TBD | PA2 §1. Reuse team identity from PA0 §1 / PA1 §1; PA2 contribution % must be determined from actual work, not copied. |
| R6.2 — Begin PA2 AI Usage Log | Huy | 31/10 | Planned | TBD | PA2 §11. Reuse PA1 §7 format only; gather each member's actual PA2 AI use and verification. |
| R6.3 — Establish merged SRS draft and revision record | Học | 31/10 | Planned | TBD | PA2 full document (§1–§11). Integrate the current sections and identify omissions; final export/submission follows in W5. |

Workload / coordination rules: R2.1–R2.4 each have one feature owner. Huy owns the canonical UC/BR/traceability registers (R3.2/R4.1/R5.1), Kiệt the prototype (R4.2), Minh the requirements review record (R5.2), Học the integrated document (R6.3). Other members submit inputs and perform peer review; they do not create parallel master documents. The payment/concurrency technical spike planned in PA1 is a separate effort, not an added PA2 Section or a duplicate R2.4 task.

Peer review rotation: Học → reviews Huy; Huy → reviews Kiệt; Kiệt → reviews Minh; Minh → reviews Học. For cross-cutting packages, assign an independent reviewer in the task board as needed.

## 4. Plan for Next Week

| WBS / task | Owner | Planned finish |
| --- | --- | --- |
| R1.1–R1.2 — Finalize Introduction / Problem / Stakeholders (PA2 §2–§4; reuse unchanged PA1 background) | Học (§2); Huy (§3–§4) | 02/11 |
| R2.1–R2.4 — Resolve review comments and finish FR/AC/UC Specs (PA2 §5.1, §5.4, §7; reuse PA1 feature scope) | Học / Huy / Kiệt / Minh — assigned features | 02/11 |
| R3.1–R3.2 — Final NFR / Business Rules (PA2 §5.2–§5.3; refine PA1 assumptions) | Học (NFR); Huy (BR) | 02/11 |
| R4.1–R4.2 — Final UC model and interactive prototype (PA2 §6, §8) | Huy (UC model); Kiệt (prototype) | 02/11 |
| R5.1–R5.2 — Final traceability and requirements review (PA2 §9–§10) | Huy (matrix); Minh (review) | 02/11 |
| R6.1–R6.3 — Confirm contributions, AI Log, integration and freeze (PA2 §1, §11, full document) | Học (§1/integration); Huy (§11) | 03/11 |
| R6.3 — Prepare PDF + source, commit and submit (PA2 all sections) | Học | 04/11 (provisional) |

## 5. Issues and Risks

Potential risks; change status/actions based on actual evidence at 31/10.

| ID | Description | Impact | Action | Owner | Due |
| --- | --- | --- | --- | --- | --- |
| PA2-R01 | Unconfirmed shared UC IDs / conflicting FR/UC rules | High | Huy publishes UC register 29/10; feature owners cite same IDs | Huy | 29/10 |
| PA2-R02 | Payment exception and ticket state scenarios under-specified | High | Minh drafts expiry, callback retry, paid-but-unissued; Kiệt cross-checks F07 state handoff | Minh | 31/10 |
| PA2-R03 | Huy's shared BA packages create a bottleneck | High | Reuse PA1 §2.1/§2.3; all owners provide BR/UC/matrix inputs; rebalance at review if necessary | Học | 31/10 |
| PA2-R04 | Mockup/UC mismatch due to late screen requirements | Medium | Owners deliver screen lists to Kiệt by 29/10; keep Screen IDs stable | Kiệt | 31/10 |
| PA2-R05 | PA2 Moodle deadline not independently confirmed | High | Check exact Moodle date/time and adjust T−2/T−1 gates | Học | 27/10 |

## 6. Meeting Minutes

Meeting 1 — Kickoff (26/10)

Planned agenda: Confirm feature scope/owners; approve proposed WBS R1–R6 and update board (replacing PA1 allocation); agree FR/BR/UC/Screen ID naming and templates; set inter-feature boundaries; confirm reviewers and deadlines.

Decisions (record only after meeting): TBD — include approval of WBS change, issue/board links and any changes to feature scope.

Meeting 2 — Phase 1 Progress Review (31/10)

Planned agenda: Each owner presents FR/AC/UC draft; inspect payment and event-approval edge cases; review NFR/BR, UC diagram, screen inventory, traceability; assign review issues to close by 02/11.

| Member | Present | Done since last meeting | Next | Blockers |
| --- | --- | --- | --- | --- |
| Học | TBD | Confirm R1.1, R2.1, R3.1, R6.1, R6.3 draft outputs | Correct F01/F08; integrate final document | TBD |
| Huy | TBD | Confirm R1.2, R2.2, R3.2, R4.1, R5.1, R6.2 drafts | Finalize UC/BR/traceability and stakeholder findings | TBD |
| Kiệt | TBD | Confirm R2.3 and R4.2 drafts | Complete interactive prototype, correct F04/F07 flows | TBD |
| Minh | TBD | Confirm R2.4, R5.2 and separate spike findings (if available) | Close payment exceptions; conduct review | TBD |

**Phase 1 review exit criteria (31/10):**

- Draft FRs and Given/When/Then ACs exist for F01–F08 — PA2 §5.1, §5.4.
- Draft UC specs include trigger, pre/post-conditions and numbered main/alternative/exception flows — PA2 §7.
- One published actor list, UC register and use case diagram — PA2 §6.
- NFR/BR drafts have sources, with measurable NFRs — PA2 §5.2–§5.3.
- Prototype draft and screen list cover main UC flows — PA2 §8.
- Traceability draft and review issue log exist — PA2 §9–§10.
- Each blocking issue has an owner and due date before final review.

## 7. Metrics

| Metric | This week | Total |
| --- | --- | --- |
| Tasks completed | TBD | TBD |
| Commits | TBD | TBD |
| Pull requests merged / reviewed | TBD | TBD |
| Open defects (PA5) | N/A | N/A |

### WBS change note for W04 (confirm at kickoff)

The team proposes replacing the PA1 requirements work-package allocation (2.1–2.4) with PA2 execution packages R1–R6, to combine feature ownership (each member owns two Must-have features across FR, AC and UC Specifications) with role-based ownership of cross-cutting SRS deliverables. This changes task decomposition and ownership, not the approved Must-have scope F01–F08. The proposed WBS and effort estimates require team approval and updated GitHub issues; original PA1 estimates remain a historical baseline until re-estimation. Subsequent PA2 requirements changes must be recorded explicitly.

Source reuse rule: PA1 §2.4 is the feature/scope baseline (including changed F01/F07 and one-channel payOS scope). PA1 §2.1, §2.3 and §3.3 provide reusable background. PA0 is supporting history only where PA1 did not supersede it. Do not copy PA1 member contributions, prior AI logs or review records as if performed for PA2.
