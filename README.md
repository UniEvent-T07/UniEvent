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
| F05 | Ticket reservation and VietQR payment (SePay) | Must |
| F06 | Payment confirmation and ticket issuing | Must |
| F07 | QR check-in | Must |
| F08 | Real-time organiser dashboard | Must |
| F09 | Conduct score records | Should |
| F10 | Cancellation and refund policy | Should |

## Công nghệ và hosting

- Web dùng Next.js và Tailwind CSS. API dùng NestJS và xử lý luật nghiệp vụ.
- PostgreSQL chạy bằng Docker Compose cho dev và kiểm thử. Prisma dùng `DATABASE_URL` cho ứng dụng và `DIRECT_URL` cho migration. Staging dùng Supabase PostgreSQL.
- Staging đặt web trên Vercel và API trên Render. Vercel chuyển tiếp yêu cầu REST ở `/api/*` đến Render để trình duyệt gửi cookie phiên cùng site. Kết nối Socket.IO và IPN SePay đi thẳng tới Render. [ADR-004](docs/design/adr/004-same-site-hosting-and-session-cookies.md)

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

## Chạy local

Cần Git, Node.js 22.22.3 trở lên trong dòng 22.x, npm và Docker có Compose.

```bash
git clone https://github.com/UniEvent-T07/UniEvent.git
cd UniEvent
npm ci
```

Tạo tệp môi trường cho hai ứng dụng bằng PowerShell.

```powershell
Copy-Item src/api/.env.example src/api/.env
Copy-Item src/web/.env.example src/web/.env.local
```

Trên Bash, dùng `cp`.

```bash
cp src/api/.env.example src/api/.env
cp src/web/.env.example src/web/.env.local
```

```bash
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev
```

Mở trang đăng nhập dev, chọn `usr_organiser_club_a`, rồi kiểm tra thông tin phiên ở `/me`. Web dùng cổng `3000`. API dùng cổng `4000` và có `GET /api/health`. [Đăng nhập dev](http://localhost:3000/dev-login)

Đăng nhập dev chỉ bật khi `DEV_LOGIN_ENABLED=true` và `NODE_ENV` khác `production`. Giữ `SESSION_SECRET` riêng cho từng môi trường triển khai.

### Chạy kiểm tra

Chạy các lệnh sau khi đã khởi động, migrate và seed cơ sở dữ liệu. E2E của API dùng PostgreSQL và dữ liệu từ seed.

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e -w @unievent/api
npm run test:cases
```

### Docker Desktop trên Windows

Nếu Docker dùng WSL 2 và chiếm nhiều tài nguyên, có thể đặt giới hạn phù hợp với máy trong `%UserProfile%\.wslconfig`.

```ini
[wsl2]
memory=4GB
processors=2
```

Lưu công việc đang mở trong WSL rồi dùng `wsl --shutdown` từ PowerShell. Mở lại Docker Desktop để áp dụng.

## Ways of working

- Every change to `main` goes through a pull request with at least one review.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, `ci:`).
- Tasks are GitHub issues on the GitHub Project [**Team Management**](https://github.com/orgs/UniEvent-T07/projects/1); new and newly assigned tasks are posted automatically to the Discord channel `#task-updates` (see [`docs/devops/task-notifications.md`](docs/devops/task-notifications.md)).
- Team guides (Vietnamese): [Discord](docs/guides/discord.md) · [GitHub Project](docs/guides/github-project.md).
- Team communication: Discord server **UniEvent - T07**.
- Weekly status reports: every Sunday 22:00 (GMT+7) in `/docs/management/weekly/`.
