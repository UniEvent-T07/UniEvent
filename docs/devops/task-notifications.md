# Task board và thông báo task mới

Task board của nhóm là GitHub Project **Team Management** của Organization `UniEvent-T07`: <https://github.com/orgs/UniEvent-T07/projects/1>. Mỗi task là một **issue** trong repo `UniEvent-T07/UniEvent`.

> Trước ngày 14/10/2026 nhóm dùng Notion ("UniEvent Tasks"). Các task UE-2 … UE-14 đã được chuyển thành issue; phần thân mỗi issue ghi mã UE cũ.

## Cách dùng task board

1. Tạo issue: tab **Issues → New issue** (hoặc nút **+ Add item** trong Project).
   - **Assignees:** người làm chính.
   - **Labels:** một nhãn `priority: high|medium|low`, một nhãn PA (`pa0`, `pa1`, … hoặc `weekly`), một nhãn `type: …`; thêm `blocked` nếu đang chờ việc bên ngoài.
2. Issue mới **tự vào Project** (workflow *Auto-add to project*) với Status **Todo**.
3. Cập nhật **Status** trên board: Todo → In progress → In review → Done (hoặc Blocked). Ghi hạn ở **Target date**.
4. Liên kết PR với issue bằng `Closes #<số>` trong mô tả PR: khi PR được merge, issue tự đóng và chuyển sang **Done**.

## Thông báo vào Discord

| Kênh | Nội dung | Cách chạy |
| --- | --- | --- |
| `#task-updates` | Task mới (issue mới) và khi task được giao cho ai, có tag người làm | GitHub Actions `.github/workflows/issue-discord.yml` → `.github/scripts/issue-to-discord.mjs` |
| `#github-activity` | Mọi push, PR, review, issue | Webhook của repo (Settings → Webhooks, URL webhook Discord + `/github`) |

Workflow chạy ngay khi có sự kiện `issues` (`opened`, `assigned`), không cần lịch hẹn giờ. Khi tạo issue có sẵn người làm, chỉ gửi một tin (bỏ qua sự kiện `assigned` phát ra ngay sau đó).

### Secrets (repo → Settings → Secrets and variables → Actions)

| Secret | Giá trị |
| --- | --- |
| `DISCORD_WEBHOOK_URL` | Webhook của kênh `#task-updates` (Discord → Server Settings → Integrations → Webhooks) |
| `DISCORD_MENTIONS` | `{"Học":"<id>","Huy":"<id>","Kiệt":"<id>","Minh":"<id>"}` — Discord user ID để tag |

Tên thành viên được lấy từ `.github/team.json` (GitHub username → tên). Thêm thành viên mới thì sửa file này và secret `DISCORD_MENTIONS`.

> Không bao giờ commit token/webhook vào repo — chỉ để trong GitHub Secrets.

### Kiểm tra

Tạo một issue thử có người làm → trong vòng 1 phút, `#task-updates` có tin "có task mới!" kèm tag. Nếu không thấy: tab **Actions → Issues → Discord task notifications** xem log.
