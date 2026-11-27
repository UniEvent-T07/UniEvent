# AI usage log – PA4

| Member | Tool | Task or purpose | Verification |
| --- | --- | --- | --- |
| Lê Nguyễn Quốc Học | Claude Code (Anthropic) | 25 November 2026, issue #69. Wrote the test-case template `docs/test/TEMPLATE-Fxx.md` and its usage note in `docs/test/README.md`. Reviewed and corrected the Codex draft of `docs/design/contracts.md`. | Checked column headings against issue #69, names against `GLOSSARY.md`, states against ADR-002/003, and every `FR-Fxx-NN` code in both files against the FR ranges in `UNIEVENT-SPEC.md`. Checked relative links resolve. Kiệt reviews `contracts.md`, Minh reviews the template. |
| Lê Nguyễn Quốc Học | Codex (OpenAI) | 25 November 2026, issue #69. Drafted `docs/design/contracts.md` (state machines, interface table, seed fixtures, open questions) from `GLOSSARY.md`, `UNIEVENT-SPEC.md` and ADR-001–004. | Claude Code reviewed the draft line by line and fixed names and states. Rules the sources do not state were moved to the open-questions section for Huy and Kiệt. |

## PA4.1 Setup v0 (issue #70)

| Member | Tool | Task or purpose | Verification |
| --- | --- | --- | --- |
| Lê Nguyễn Quốc Học | Claude Code (Anthropic) | Reviewed and corrected the feature contracts for issue #69. Those contracts supplied the states and fixture IDs used in Setup v0. | The issue #69 entry records the terminology and state checks against the glossary and ADR-002/003. |
| Lê Nguyễn Quốc Học | Codex (OpenAI) | Completed the shared scaffold, database setup, CI, and local instructions. Implemented and integrated the API session, role and scope guards, AuditLog writer, and Web pages. | On 27 November 2026, ran `npm run db:up`, Prisma validate, `npm run db:migrate`, two runs of `npm run db:seed`, `npm run lint`, `npm run typecheck`, `npm test` (3 tests), and `npm run test:cases` (0 errors, 16 warnings for feature drafts on separate branches). `npm run test:e2e -w @unievent/api` passed 10 tests on `unievent_api`. Chrome at 360 × 800 verified loading, a 503 error, visible keyboard focus, sign-in as `usr_organiser_club_a`, scope `org_club_a` for `ORGANISER`, and logout followed by 401 from `/api/auth/me`. |

Codex checked all 68 fixed fixture IDs against the seed source. After the initial migration and two seed runs on `unievent_schema`, a database query confirmed 3 issued paid Tickets, 2 ever checked in, and 250,000 VND in Gross Confirmed Revenue.

Node 22.23.5 completed `npm ci` on `chore/setup-v0` before the API and Web merges. The package manifests and lockfile kept the same contents across those merges. The repeat local install was interrupted. GitHub CI runs `npm ci` from the final checkout before the database and test steps.
