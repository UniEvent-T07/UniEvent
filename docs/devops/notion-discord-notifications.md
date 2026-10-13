# Notion → Discord task notifications

Mỗi khi có task mới trong Notion database **UniEvent Tasks**, GitHub Actions gửi một tin nhắn (embed) vào kênh Discord `#task-updates`.

## Cách hoạt động

- Workflow `.github/workflows/notion-discord.yml` được **cron-job.org** gọi mỗi 5 phút qua API *workflow dispatch* (xem mục bên dưới). Lịch `schedule` trong workflow vẫn giữ làm dự phòng. Có thể chạy tay ở tab **Actions → Run workflow**.
- Script `.github/scripts/notion-to-discord.mjs` lấy các task có ô **Discord Notified** chưa tick, gửi webhook, rồi tick ô đó để không gửi trùng.
- Task vừa tạo dưới 2 phút hoặc chưa có tên sẽ được đợi đến lần chạy sau.
- Muốn gửi lại một task: bỏ tick **Discord Notified**.

## Cài đặt (làm một lần)

1. **Notion integration**: vào <https://www.notion.so/profile/integrations> → *New integration* (Internal) → tên `UniEvent Discord Bot`, quyền *Read content* + *Update content*. Copy *Internal Integration Secret*.
2. Mở trang **UniEvent - T07** trong Notion → `•••` → *Connections* → thêm `UniEvent Discord Bot`.
3. **Discord webhook**: Server Settings → Integrations → Webhooks → webhook của kênh `#task-updates` → *Copy Webhook URL*.
4. **GitHub Secrets** (repo → Settings → Secrets and variables → Actions → *New repository secret*):

| Secret | Giá trị |
| --- | --- |
| `NOTION_TOKEN` | Internal Integration Secret ở bước 1 |
| `NOTION_DATABASE_ID` | `22c25058670e4c458e6daba053ba9fca` |
| `DISCORD_WEBHOOK_URL` | Webhook URL ở bước 3 |
| `DISCORD_MENTIONS` | (tuỳ chọn) `{"Học":"<id>","Huy":"<id>","Kiệt":"<id>","Minh":"<id>"}` — Discord user ID để tag Owner |

5. Vào tab **Actions** → *Notion → Discord task notifications* → **Run workflow** để thử.

## Lịch chạy qua cron-job.org

Lịch `schedule` của GitHub Actions không đảm bảo chạy đúng giờ (khi tải cao GitHub có thể trễ hoặc bỏ lượt). Ngày 13/10/2026 workflow không tự chạy lần nào trong nhiều giờ, nên nhóm dùng cron-job.org để gọi workflow mỗi 5 phút.

- **Tài khoản cron-job.org:** của Huy. Job: `UniEvent – Notion → Discord`, chạy *Every 5 minutes*, gửi email khi lỗi.
- **Request:** `POST https://api.github.com/repos/UniEvent-T07/UniEvent/actions/workflows/notion-discord.yml/dispatches`, body `{"ref":"main"}`.
- **Headers:** `Accept: application/vnd.github+json`, `X-GitHub-Api-Version: 2022-11-28`, `Content-Type: application/json`, `Authorization: Bearer <token>`.
- **Token:** fine-grained personal access token `cron-job UniEvent` của Huy, resource owner **UniEvent-T07**, chỉ repo **UniEvent**, quyền **Actions: Read and write**. **Hết hạn 31/01/2027**: trước ngày đó tạo token mới và cập nhật header `Authorization` trên cron-job.org.
- Kết quả đúng: cron-job.org báo **204 No Content** và tab Actions có thêm một lượt chạy.

| Lỗi | Nguyên nhân thường gặp |
| --- | --- |
| 401 | Token sai, hết hạn hoặc thiếu chữ `Bearer ` |
| 403 | Token thiếu quyền Actions: Read and write hoặc chưa được Organization duyệt |
| 404 | Sai URL, hoặc token không được chọn repo UniEvent |

> Không bao giờ commit token/webhook vào repo — chỉ để trong GitHub Secrets.

## Lưu ý

- Với repo public, GitHub tự tắt workflow theo lịch sau 60 ngày repo không có commit; bật lại ở tab Actions.
