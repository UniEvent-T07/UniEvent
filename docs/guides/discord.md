# Hướng dẫn sử dụng Discord – Team T07 (UniEvent)

Discord là kênh liên lạc chính của nhóm: nhắn tin, họp và nhận thông báo tự động từ GitHub. Tài liệu này dành cho tất cả thành viên và TA.

- **Server:** UniEvent - T07
- **Link mời:** <https://discord.gg/zVMjhEGnzp>
- **Task board:** GitHub Project [Team Management](https://github.com/orgs/UniEvent-T07/projects/1) (xem [github-project.md](github-project.md))

---

## 1. Bắt đầu (làm một lần)

1. Mở link mời ở trên và đăng nhập bằng tài khoản Discord.
2. Đọc `#welcome-rules`.
3. Đặt **biệt danh trong server** là họ tên thật: nhấn chuột phải vào tên server → *Chỉnh sửa hồ sơ máy chủ* → *Biệt danh*. Nhờ vậy TA biết ai là ai.
4. Báo Team Lead (Học) để được gán vai trò.
5. **Bật thông báo** cho server: nhấn chuột phải vào tên server → *Cài đặt thông báo* → chọn **Chỉ @mentions**. Đây là mức nên dùng: bạn sẽ nhận được thông báo khi được tag hoặc có `@everyone`, mà không bị làm phiền bởi mọi tin nhắn.
6. Gửi Discord user ID cho Huy để bot GitHub tag đúng người khi giao task. Cách lấy ID:
   1. Vào *Cài đặt người dùng* → *Nâng cao* → bật **Chế độ nhà phát triển**.
   2. Nhấn chuột phải vào tên mình → *Sao chép ID người dùng*.
7. Cài app Discord trên điện thoại để không lỡ thông báo gấp.

---

## 2. Vai trò (roles)

| Vai trò | Thành viên | Ghi chú |
| --- | --- | --- |
| Team Lead | Lê Nguyễn Quốc Học (A) | Đăng thông báo chính thức, điều phối họp |
| Business Analyst | Thái Quang Huy (B) | Yêu cầu, AI usage log |
| Designer / Architect | Kiệt (C) | Kiến trúc, thiết kế |
| Tester / DevOps | Nguyễn Văn Minh (D) | Repository, CI/CD, kiểm thử |
| Developer | Cả 4 thành viên | Ai cũng code |
| TA | Trợ giảng | Xem được toàn bộ server, đặt câu hỏi ở `#hỏi-ta` |

Cột thành viên (A–D) khớp với bảng phân công ở Mục 1 của PA0.

---

## 3. Các kênh và cách dùng

### 📌 Thông tin

| Kênh | Dùng để | Ai được đăng |
| --- | --- | --- |
| `#welcome-rules` | Quy tắc của server | Chỉ Team Lead (chỉ đọc) |
| `#announcements` | Thông báo chính thức: deadline PA, thay đổi lịch họp | Chỉ Team Lead (chỉ đọc) |
| `#links-resources` | Link quan trọng (GitHub, task board, Moodle, Drive, tài liệu môn). Xem **tin nhắn đã ghim** | Mọi người |
| `#hỏi-ta` | Câu hỏi gửi TA. **Ghi rõ PA và mục liên quan** | Mọi người |

### 💬 Trò chuyện

| Kênh | Dùng để |
| --- | --- |
| `#chung` | Trao đổi chung. Việc gấp thì tag `@everyone` |
| `#off-topic` | Chuyện ngoài lề, giải trí |

### 📋 Quản lý dự án

| Kênh | Dùng để |
| --- | --- |
| `#task-updates` | **Bot tự đăng** mỗi khi có task mới hoặc task được giao (xem Mục 5). Thảo luận về task trong **thread** của tin nhắn đó |
| `#decisions` | Ghi lại quyết định của nhóm: **ai – quyết định gì – khi nào**. Quyết định quan trọng đưa vào weekly status report |
| `#meeting-notes` | Biên bản họp. Người ghi luân phiên mỗi tuần |
| `#weekly-status` | Weekly status report. **Hạn Chủ Nhật 22:00**, commit vào `/docs/management/weekly/` |
| `#deadlines` | Mốc nộp PA và internal deadline |

### 💻 Phát triển

| Kênh | Dùng để |
| --- | --- |
| `#github-activity` | **Bot GitHub** đăng commit, pull request, review của repo `UniEvent-T07/UniEvent` (chỉ đọc) |
| `#code-review` | Nhờ review PR: dán link PR + mô tả ngắn. Mỗi PR cần **ít nhất 1 approve** trước khi merge |
| `#frontend` | Next.js (React, TypeScript) + Tailwind CSS |
| `#backend` | NestJS + Prisma + PostgreSQL, payOS webhook, WebSocket |
| `#devops-ci` | GitHub Actions, Docker, deploy (Vercel, Render/Railway, Neon) |
| `#bugs-testing` | Báo bug và test (Jest, Playwright, k6). **Ghi rõ các bước tái hiện** |

### 📄 Tài liệu PA

| Kênh | Dùng để |
| --- | --- |
| `#pa-docs` | Thảo luận tài liệu PA0–PA5. Nộp Moodle (PDF + file gốc) và commit vào `/pa/PAx` |
| `#ai-usage-log` | Ghi lại việc dùng AI: **tool – mục đích – cách kiểm tra và chỉnh sửa**. Huy tổng hợp vào AI Usage Log của mỗi PA |
| `#tài-liệu-tham-khảo` | Tài liệu, bài viết, video tham khảo |

### 🔊 Voice

| Kênh | Dùng để |
| --- | --- |
| Chung | Nói chuyện tự do |
| Họp nhóm | Họp nội bộ thứ Ba và thứ Bảy |
| Họp TA | Họp với TA thứ Năm |
| Pair Programming | Code chung, chia sẻ màn hình |

---

## 4. Lịch họp (Sự kiện)

Lịch họp đã được tạo trong mục **Sự kiện** (góc trên bên trái, dưới tên server). Nhấn **Quan tâm** để Discord nhắc trước giờ họp.

| Buổi | Thời gian | Kênh |
| --- | --- | --- |
| Họp nhóm | Thứ Ba 21:00 (hằng tuần) | 🔊 Họp nhóm |
| Họp với TA | Thứ Năm 20:00 (hằng tuần) | 🔊 Họp TA |
| Họp nhóm | Thứ Bảy 21:00 (hằng tuần) | 🔊 Họp nhóm |

Sau mỗi buổi họp:

1. Người ghi biên bản tuần đó đăng biên bản vào `#meeting-notes` (mẫu ở Mục 7).
2. Quyết định mới được ghi vào `#decisions`.
3. Việc mới được tạo thành issue trên GitHub Project (bot sẽ tự đăng vào `#task-updates`).

---

## 5. Thông báo task tự động (`#task-updates`)

Khi một issue được **tạo** hoặc **giao người làm** trên repo `UniEvent-T07/UniEvent`, GitHub Actions sẽ đăng một tin nhắn vào `#task-updates`:

- Tag người làm: `@Tên có task mới!` hoặc `@Tên được giao task!`
- Embed gồm tiêu đề `#số issue + tên task` (bấm vào để mở issue), 🙋 Người làm, ✍️ Người tạo, 🏷️ Nhãn, 🎯 Milestone.
- Màu viền theo độ ưu tiên: đỏ = `priority: high`, vàng = `priority: medium`, xanh = `priority: low`.

Cách dùng:

- Muốn hỏi về task: nhấn chuột phải vào tin nhắn → **Tạo Chủ Đề** (thread). Mọi trao đổi về task đó để trong thread, không làm loãng kênh.
- **Không** cập nhật tiến độ trên Discord. Tiến độ cập nhật trên GitHub Project (kéo thẻ sang cột mới).
- Không nhận được tag? Kiểm tra lại Mục 1 bước 5–6, rồi báo Huy.

`#github-activity` thì do webhook GitHub đăng (push, PR, review), không tag ai.

---

## 6. Quy tắc giao tiếp

1. **Đúng kênh:** đăng vào kênh phù hợp với chủ đề. Không biết đăng đâu thì dùng `#chung`.
2. **Dùng thread** cho mọi thảo luận dài hơn vài tin nhắn.
3. **Thời gian phản hồi:** trả lời tin nhắn có tag mình theo thời hạn đã thống nhất trong Team Contract (PA0, Mục 3). Việc gấp: tag người liên quan hoặc `@everyone` trong `#chung`.
4. **Không xin việc qua DM.** Giao việc phải thành issue trên GitHub Project để có dấu vết.
5. **Báo trước khi vắng họp** trong `#chung`, kèm lý do và phần việc đã làm.
6. **Bị kẹt (blocked)?** Thêm nhãn `blocked` cho issue, kéo thẻ sang cột **Blocked** và báo trong thread của task.
7. **Không đăng bí mật:** không dán token, mật khẩu, webhook URL, file `.env` vào Discord.
8. **Lịch sự, tôn trọng.** Góp ý về công việc, không về con người.
9. **Câu hỏi cho TA:** gom lại, đăng ở `#hỏi-ta` với tiêu đề rõ ràng, ví dụ `[PA1 – 3.2] Hỏi về WBS`.

---

## 7. Mẫu tin nhắn

**Biên bản họp (`#meeting-notes`)**

```
📅 Họp nhóm – Thứ Ba 14/10/2026, 21:00–22:00
👥 Có mặt: Học, Huy, Kiệt, Minh   |   Vắng: –
✍️ Người ghi: Huy

1. Đã xong: …
2. Thảo luận: …
3. Quyết định: … (đã ghi vào #decisions)
4. Việc tiếp theo:
   - [ ] #26 … – Kiệt – hạn 16/10
   - [ ] #27 … – Minh – hạn 17/10
```

**Quyết định (`#decisions`)**

```
✅ Quyết định: Dùng NestJS cho backend
👤 Ai quyết: cả nhóm (họp 14/10)
📅 Khi nào: 14/10/2026
💡 Lý do: …
```

**Nhờ review (`#code-review`)**

```
🔍 Nhờ review: https://github.com/UniEvent-T07/UniEvent/pull/30
Nội dung: thêm trang đăng nhập (Closes #26)
Cần xem kỹ: phần validate form
Hạn review: 16/10
```

**Báo bug (`#bugs-testing`)**

```
🐞 Bug: Nút "Đăng ký sự kiện" không phản hồi
Môi trường: Chrome 130, branch main
Các bước: 1) … 2) … 3) …
Kết quả mong đợi: …   |   Thực tế: …
Ảnh/log: …
```

**Dùng AI (`#ai-usage-log`)**

```
🤖 Tool: ChatGPT
Mục đích: rà soát mục 2.5 của PA1
Cách kiểm tra/chỉnh sửa: so với guideline môn học, giữ 2/5 gợi ý, viết lại câu …
```

---

## 8. Mẹo hữu ích

- **Ghim tin nhắn** quan trọng: nhấn chuột phải → *Ghim tin nhắn*. Xem tin đã ghim bằng biểu tượng 📌 ở góc trên của kênh.
- **Tìm kiếm:** ô tìm kiếm góc trên bên phải, ví dụ `from:Huy in:#decisions`.
- **Tắt tiếng** kênh ít quan trọng (ví dụ `#off-topic`): nhấn chuột phải vào kênh → *Tắt âm kênh*.
- **Chia sẻ màn hình** trong kênh voice: nút *Màn hình* ở thanh dưới cùng.
- **Định dạng code:** bọc trong ba dấu backtick, ví dụ ` ```ts ... ``` `.

---

## 9. Câu hỏi thường gặp

**Tôi không thấy một số kênh?** Có thể bạn chưa được gán vai trò. Báo Học.

**Tôi không đăng được vào `#announcements`?** Kênh đó chỉ Team Lead đăng. `#welcome-rules`, `#task-updates` và `#github-activity` cũng là kênh chỉ đọc.

**Bot không đăng task mới?** Kiểm tra tab *Actions* của repo xem workflow *Issues → Discord task notifications* có chạy không, rồi báo Huy hoặc Minh. Chi tiết kỹ thuật ở `docs/devops/task-notifications.md`.

**TA có xem được mọi thứ không?** Có. TA là thành viên server với vai trò TA và xem được tất cả kênh, nên mọi trao đổi cần giữ lịch sự và đúng chủ đề.
