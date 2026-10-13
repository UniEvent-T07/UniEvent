# UniEvent

UniEvent is a web platform that lets university student clubs get event approval, sell tickets with automatic VietQR payment confirmation and check attendees in by QR code, with optional attendance-based conduct score management.

Course project of **Team T07** – Introduction to Software Engineering, Software Engineering Department, Faculty of Information Technology, University of Science (VNU-HCM).

## Team

| Member | Main role | Backup role |
| --- | --- | --- |
| Lê Nguyễn Quốc Học | Team lead / Project manager; Developer | Business analyst |
| Thái Quang Huy | Business analyst; Developer | Tester |
| Trần Vũ Anh Kiệt | Designer / Architect; Developer | Team lead / Project manager |
| Nguyễn Văn Minh | Tester / DevOps; Developer | Designer / Architect |

## Main features

| ID | Feature | Priority |
| --- | --- | --- |
| F01 | Accounts and role-based access | Must |
| F02 | Event creation and submission | Must |
| F03 | Event approval workflow | Must |
| F04 | Ticket type configuration | Must |
| F05 | Ticket reservation and VietQR payment (payOS) | Must |
| F06 | Payment confirmation and ticket issuing | Must |
| F07 | QR check-in | Must |
| F08 | Real-time organiser dashboard | Must |
| F09 | Conduct score records | Should |
| F10 | Cancellation and refund policy | Should |

## Planned technology

> Not final – confirmed with reasons in PA1.

- **Front end:** Next.js (React, TypeScript), Tailwind CSS
- **Back end:** NestJS (TypeScript) on Node.js LTS, REST API and WebSocket gateway
- **Database:** PostgreSQL with Prisma ORM
- **External services:** payOS (VietQR payment links and webhooks), a transactional e-mail service
- **Testing and CI:** Jest, Supertest, Playwright, k6, GitHub Actions, ESLint, SonarQube Cloud
- **Hosting:** Docker images; Vercel (web), Render or Railway (API), Neon (PostgreSQL)

## Repository structure

| Folder | Content |
| --- | --- |
| `/src` | Source code |
| `/docs/management` | Project plan; weekly status reports in `/docs/management/weekly` |
| `/docs/requirements` | Vision, SRS, use cases, mockups |
| `/docs/design` | Architecture (C4), ADRs, UML models, UI design |
| `/docs/test` | Test plan, test cases, test reports |
| `/docs/ai-usage` | AI usage logs (`PAx.md`) |
| `/docs/devops` | Tooling and automation notes |
| `/pa/PA0` … `/pa/PA5` | One sub-folder per PA submission (PDF + source files) |

## Setup

The source code is added to `/src` during the implementation weeks (weeks 8–10). Setup instructions will be completed then. Planned prerequisites:

- Node.js LTS and npm
- PostgreSQL (or Docker to run it locally)
- A payOS sandbox account for payment testing

Secrets (`.env`, API keys, passwords) are **never** committed. Each module will provide a `.env.example` file.

## Ways of working

- `main` is protected: every change goes through a pull request with at least one review.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, `ci:`).
- Tasks are tracked on the Notion board **UniEvent Tasks**; new tasks are posted automatically to the Discord channel `#task-updates` (see [`docs/devops/notion-discord-notifications.md`](docs/devops/notion-discord-notifications.md)).
- Team communication: Discord server **UniEvent - T07**.
- Weekly status reports: every Sunday 22:00 (GMT+7) in `/docs/management/weekly/`.
# UniEvent
