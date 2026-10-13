# Notion → Discord task notifications

Mỗi khi có task mới trong Notion database **UniEvent Tasks**, GitHub Actions gửi một tin nhắn (embed) vào kênh Discord `#task-updates`.

## Cách hoạt động

- Workflow `.github/workflows/notion-discord.yml` chạy mỗi 5 phút (và có thể chạy tay ở tab **Actions → Run workflow**).
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

> Không bao giờ commit token/webhook vào repo — chỉ để trong GitHub Secrets.

## Lưu ý

- GitHub có thể trễ vài phút với lịch `schedule` khi tải cao.
- Với repo public, GitHub tự tắt workflow theo lịch sau 60 ngày repo không có commit; bật lại ở tab Actions.
