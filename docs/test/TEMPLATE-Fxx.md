# Fxx · <Feature name> — PA4 Test Cases

<!--
How to use: copy this file to docs/test/Fxx.md (e.g. F05.md), replace every <...>
and delete the F01 example rows once you have real cases (unless this is F01.md).
Write in English. Keep every section heading and column heading unchanged:
sections 1–5 map one-to-one to the course template PA4-TestPlan-TestCases.docx,
and the traceability matrix is generated from sections 4 and 5.
-->

| Item | Value |
| --- | --- |
| Feature | Fxx · <name as in [UNIEVENT-SPEC.md](../requirements/UNIEVENT-SPEC.md)> |
| Owner | Docs: <name> · Code/Test: <name> |
| Requirements covered | `FR-Fxx-01`–`FR-Fxx-NN` · UC-NN–NN |
| Related BR / NFR | <e.g. BR-12, NFR-08> |
| Integration points | Receives from <Fyy: entity, fields> · Provides to <Fzz: entity, fields>. See [contracts.md](../design/contracts.md) |
| Seed fixtures used | <fixture codes from contracts.md, e.g. `evt_published_paid`, `res_holding_fresh`> |

## 1. Test Design Techniques

> Goes to docx **Test Plan › Test Design Techniques**.

Map each requirement to the techniques used. Allowed values: `Use case`, `EP`, `BVA`, `Decision table`, `State transition`, `Concurrency`, `Statement/decision coverage` (unit tests only).

| Requirement | Techniques | Notes |
| --- | --- | --- |
| FR-F01-01 | EP, BVA | Display name length, email domain, password length |
| FR-Fxx-NN | <techniques> | <why> |

## 2. Equivalence Partitions and Boundary Values

> Goes to docx **Test Design › Equivalence Partitions and Boundary Values**.

List the key input fields of this feature. Each boundary value should appear in at least one test case.

| Input | Valid partitions | Invalid partitions | Boundary values |
| --- | --- | --- | --- |
| Display name length (FR-F01-01) | 1–150 characters | 0 characters (empty), > 150 characters | 0, 1, 150, 151 |
| <input (FR-Fxx-NN)> | <valid ranges or classes> | <invalid ranges or classes> | <values just inside and outside each edge> |

## 3. Decision Tables

> Goes to docx **Test Design › Decision Tables**.

Only for business rules that combine several conditions (e.g. permission × state × scope). Every rule column must map to at least one test case in the last row. Delete this section if the feature has no such rule, and write "No multi-condition rules" instead.

**DT-Fxx-01 · <rule name> (BR-NN)**

| | R1 | R2 | R3 | R4 |
| --- | --- | --- | --- | --- |
| **Condition:** <condition 1> | Y | Y | N | — |
| **Condition:** <condition 2> | Y | N | — | — |
| **Action:** <expected action 1> | X | | | |
| **Action:** <expected action 2> | | X | X | X |
| **Test case** | TC-Fxx-NN | TC-Fxx-NN | TC-Fxx-NN | TC-Fxx-NN |

## 4. List of Test Cases

> Goes to docx **Test Cases › List of Test Cases**.

One row per case. IDs are `TC-Fxx-NN`, numbered upward; never reuse a deleted number. **Title** follows *Action + Function + Condition* ("Verify …"). **Req. / use case** lists one or more `FR-Fxx-NN` and UC IDs separated by commas. **Technique** uses the values from section 1. **Priority** is `High`, `Medium` or `Low`. **Automated?** is `Yes` or `No` (planned for PA5). Mark cases that have a full specification in section 5 by linking the ID.

| ID | Title | Req. / use case | Technique | Priority | Automated? |
| --- | --- | --- | --- | --- | --- |
| [TC-F01-01](#tc-f01-01) | Verify registration accepts a display name of exactly 150 characters and rejects 151 | FR-F01-01, UC-01 | BVA | High | Yes |
| TC-Fxx-NN | Verify <function> <result> when <condition> | FR-Fxx-NN, UC-NN | EP | Medium | No |

## 5. Test Case Specifications

> Goes to docx **Test Cases › Test Case Specifications**. The team specifies 20 cases in total; write the number assigned to your feature in the [PA4/PA5 plan](../management/PA4-phan-cong.md). Actual results are recorded in PA5.

Expected results must be observable on screen, in the API response or in the database. Never write "the system works correctly".

### TC-F01-01

> Example. Check the FR and UC IDs of the registration flow against the spec when writing `F01.md`.

| Field | Value |
| --- | --- |
| Test case ID | TC-F01-01 |
| Title | Verify registration accepts a display name of exactly 150 characters and rejects 151 |
| Related requirement / use case | FR-F01-01 · UC-01 |
| Technique | BVA |
| Priority | High |
| Pre-conditions | Shared seed loaded. The three emails below do not exist. The tester is not signed in (Guest). |
| Test data | (a) display name of 149 × `a`, email `tc-f01-01-a@student.hcmus.edu.vn` · (b) display name of 150 characters with Vietnamese diacritics (`Nguyễn Văn …`), email `tc-f01-01-b@student.hcmus.edu.vn` · (c) display name of 151 × `a`, email `tc-f01-01-c@student.hcmus.edu.vn` · password: any valid 15-character value |
| Test steps | 1. Open the registration page. 2. Submit data set (a). 3. Submit data set (b). 4. Submit data set (c). 5. Call the registration API directly with data set (c), bypassing client-side validation. |
| Expected result | 1. The form shows labelled fields for display name, email and password. 2. A "verification email sent" message appears, and one new inactive `User` exists with a 149-character `display_name`. 3. Same as step 2, and `display_name` keeps all 150 characters with correct diacritics. 4. A text error appears at the display name field, and no `User` exists for email (c). 5. The API returns a validation error, and no `User` is created. |
| Post-conditions | Exactly two new inactive accounts exist, for (a) and (b). Reset the seed before re-running. |

### TC-Fxx-NN

| Field | Value |
| --- | --- |
| Test case ID | TC-Fxx-NN |
| Title | Verify <function> <result> when <condition> |
| Related requirement / use case | FR-Fxx-NN · UC-NN |
| Technique | |
| Priority | |
| Pre-conditions | <seed fixture codes and required state> |
| Test data | <valid · invalid · boundary values> |
| Test steps | 1. … 2. … |
| Expected result | 1. … 2. … (one numbered result per step) |
| Post-conditions | |

## 6. Open Integration Points

> Internal only. Not copied into the submission.

| Data needed | From | Owner | Status |
| --- | --- | --- | --- |
| <entity · fields> | Fyy | <name> | Pending / Agreed in contracts.md |
