# Hướng dẫn sử dụng GitHub Project – Team T07 (UniEvent)

Mọi công việc của nhóm được quản lý bằng **issue** trên GitHub Project **Team Management**. Tài liệu này hướng dẫn từ cách tạo task đến khi đóng task.

- **Project:** <https://github.com/orgs/UniEvent-T07/projects/1> (public, ai có link cũng xem được)
- **Repository:** <https://github.com/UniEvent-T07/UniEvent>
- **Discord:** xem [discord.md](discord.md)

---

## 1. Khái niệm cơ bản

| Thuật ngữ | Ý nghĩa |
| --- | --- |
| **Issue** | Một task. Mỗi issue có số (ví dụ `#26`), tiêu đề, mô tả, người làm, nhãn |
| **Project** | Bảng tổng hợp mọi issue của repo, xem dạng bảng (Table) hoặc dạng cột (Board) |
| **Status** | Trạng thái task trên project: Todo → In progress → In review → Done (hoặc Blocked) |
| **Assignee** | Người làm task. Mỗi task nên có **đúng 1 người chịu trách nhiệm chính** |
| **Label** | Nhãn phân loại: PA, loại việc, độ ưu tiên |
| **Pull request (PR)** | Yêu cầu gộp code/tài liệu vào `main`. PR liên kết với issue bằng `Closes #số` |

---

## 2. Chuẩn bị (làm một lần)

1. Chấp nhận lời mời vào Organization **UniEvent-T07** (kiểm tra email hoặc <https://github.com/orgs/UniEvent-T07/invitation>).
2. Mở project và nhấn ☆ **Star** hoặc lưu bookmark.
3. Bật thông báo: vào repo → **Watch** → *Participating and @mentions* (hoặc *All Activity* nếu muốn theo dõi mọi thứ).
4. Gửi Discord user ID cho Huy để bot tag bạn khi được giao task (xem `discord.md`, Mục 1).

---

## 3. Các cột Status

| Status | Khi nào dùng | Ai chuyển |
| --- | --- | --- |
| **Todo** | Task mới tạo, chưa bắt đầu | Tự động khi tạo issue |
| **In progress** | Đang làm | Người làm kéo sang khi bắt đầu; hoặc tự động khi PR được liên kết |
| **In review** | Đã mở PR / đã xong bản nháp, chờ người khác review | Người làm |
| **Blocked** | Bị kẹt, cần người khác giúp hoặc chờ việc khác | Người làm (kèm nhãn `blocked` và ghi lý do) |
| **Done** | Hoàn thành | **Tự động** khi issue được đóng (PR có `Closes #số` được merge) |

**Tự động hoá đã bật sẵn** (Project → ⋯ → *Workflows*):

- Issue mới trong repo được **tự thêm** vào project.
- Issue/PR **đóng** → Status = **Done**.
- PR được liên kết với issue → Status = **In progress**.

---

## 4. Nhãn (labels)

| Nhóm | Nhãn | Ý nghĩa |
| --- | --- | --- |
| PA | `pa0`, `pa1`, … | Task thuộc bài nộp nào |
| | `weekly` | Weekly status report |
| Loại việc | `type: docs` | Viết tài liệu |
| | `type: code` | Lập trình |
| | `type: design` | Thiết kế (UI, kiến trúc, CSDL) |
| | `type: test` | Kiểm thử |
| | `type: devops` | CI/CD, deploy, công cụ |
| | `type: meeting` | Chuẩn bị / tổ chức họp |
| Ưu tiên | `priority: high` | Gấp, ảnh hưởng deadline |
| | `priority: medium` | Bình thường |
| | `priority: low` | Làm khi rảnh |
| Trạng thái | `blocked` | Đang bị kẹt (đi kèm Status = Blocked) |

Mỗi issue nên có **1 nhãn PA + 1 nhãn loại việc + 1 nhãn ưu tiên**. Nhãn ưu tiên cũng quyết định màu tin nhắn trên Discord.

---

## 5. Tạo task mới

### Cách 1 – Từ repository (khuyến nghị)

1. Vào repo → tab **Issues** → **New issue** → chọn mẫu **Task**.
2. Điền:
   - **Tiêu đề:** động từ + kết quả, ngắn gọn. Ví dụ `Viết mục 2.3 PA1 – Phân tích rủi ro`.
   - **Mô tả:** cần làm gì, link tài liệu liên quan.
   - **Tiêu chí hoàn thành:** checklist cụ thể, ví dụ `- [ ] Có bảng rủi ro ≥ 5 dòng`.
   - **Hạn:** ngày cụ thể (theo quy ước internal deadline ở Mục 8).
3. Ở cột bên phải:
   - **Assignees:** chọn người làm.
   - **Labels:** chọn nhãn theo Mục 4.
   - **Projects:** đã tự thêm vào *Team Management* (nếu chưa có thì chọn).
   - **Milestone:** chọn PA tương ứng nếu đã có.
4. Nhấn **Create**. Bot sẽ đăng vào `#task-updates` trên Discord và tag người làm.

### Cách 2 – Ngay trên project

1. Mở project → cuối cột/bảng nhấn **+ Add item**.
2. Gõ tiêu đề → Enter. Lúc này đây là **bản nháp (draft)**.
3. Mở thẻ → **Convert to issue** → chọn repo `UniEvent`. Chỉ khi đã là issue thì bot mới thông báo lên Discord.
4. Bổ sung người làm, nhãn và mô tả như Cách 1.

> Task lớn hơn ~2 ngày làm việc thì **chia nhỏ** thành nhiều issue, hoặc dùng *Sub-issues* trong issue cha.

---

## 6. Làm một task từ đầu đến cuối

1. **Nhận task:** bạn được tag trên Discord → mở issue, đọc tiêu chí hoàn thành. Có thắc mắc thì hỏi trong thread của tin nhắn trên `#task-updates` hoặc comment trên issue.
2. **Bắt đầu:** kéo thẻ sang **In progress**.
3. **Tạo branch** từ `main` (có thể bấm *Create a branch* ngay trong issue). Quy ước tên:
   - `feat/<mô-tả>` – tính năng
   - `fix/<mô-tả>` – sửa lỗi
   - `docs/<mô-tả>` – tài liệu
   - `chore/<mô-tả>` – công cụ, cấu hình
4. **Commit** theo Conventional Commits, ví dụ `docs(pa1): add risk table`, `feat(auth): add login page`.
5. **Mở pull request** vào `main`:
   - Mẫu PR có sẵn; điền `Closes #<số issue>` để liên kết.
   - Đánh dấu checklist trong mẫu PR.
   - Kéo thẻ sang **In review** và dán link PR vào `#code-review` trên Discord.
6. **Review:** cần **ít nhất 1 approve** từ thành viên khác; nhánh `main` được bảo vệ nên không merge được nếu thiếu approve. Người review comment góp ý, người làm sửa và push tiếp lên cùng branch.
7. **Merge:** sau khi được approve (và các kiểm tra tự động, nếu có, đều xanh), nhấn **Merge pull request**. Branch tự xoá; issue tự đóng; thẻ tự chuyển sang **Done**.
8. **Task không có PR** (ví dụ họp, liên hệ TA): tick hết checklist, comment kết quả (link biên bản, ảnh, …) rồi nhấn **Close issue**.

### Khi bị kẹt

1. Thêm nhãn `blocked`, kéo thẻ sang **Blocked**.
2. Comment trên issue: kẹt ở đâu, cần ai giúp, đang chờ việc gì (`Chờ #25`).
3. Tag người liên quan trên Discord. Hết kẹt thì gỡ nhãn và kéo về **In progress**.

---

## 7. Xem và lọc task

- **Board:** xem theo cột Status, kéo-thả để đổi trạng thái.
- **Table:** xem dạng bảng, sửa nhanh nhiều ô.
- **Lọc nhanh** bằng ô *Filter* phía trên, ví dụ:

| Muốn xem | Gõ vào Filter |
| --- | --- |
| Task của tôi | `assignee:@me` |
| Task chưa xong của tôi | `assignee:@me -status:Done` |
| Task PA1 | `label:pa1` |
| Task gấp | `label:"priority: high"` |
| Task đang kẹt | `status:Blocked` |
| Task chưa có người làm | `no:assignee` |

- **Lưu view:** sau khi lọc, nhấn mũi tên cạnh tên view → **Save changes** (hoặc *Save as new view*) để cả nhóm dùng chung.
- **Group by / Sort:** menu ⋯ của view → *Group by* `Assignees` hoặc `Labels` để xem khối lượng việc của từng người.

---

## 8. Quy ước của nhóm

1. **Mọi việc đều là issue.** Không giao việc chỉ bằng tin nhắn Discord.
2. **Mỗi issue có 1 người làm chính**, có nhãn và có hạn.
3. **Internal deadline cho mỗi PA:**
   - Xong phần của mình **trước hạn nộp 2 ngày**.
   - Review và merge **trước hạn nộp 1 ngày**.
4. **Cập nhật Status ngay** khi bắt đầu, khi mở PR, khi bị kẹt. Bảng phải phản ánh đúng thực tế trước mỗi buổi họp (thứ Ba và thứ Bảy).
5. **Weekly status report** (hạn Chủ Nhật 22:00): dùng mẫu `docs/management/weekly/_template.md`, ghi số issue (`#26`) ở cột *Task*. Bản thân việc viết report cũng là một issue có nhãn `weekly`.
6. **Dùng AI** cho task nào thì ghi vào `#ai-usage-log` và `docs/ai-usage/PAx.md`.
7. **Không** đưa token, mật khẩu, webhook URL vào issue, PR hay commit.

---

## 9. Thông báo trên Discord

| Sự kiện trên GitHub | Discord |
| --- | --- |
| Issue được tạo | `#task-updates`: tag người làm (nếu có) – "có task mới!" |
| Issue được giao (assign) | `#task-updates`: tag người được giao – "được giao task!" |
| Push, PR, review | `#github-activity` (webhook GitHub, không tag) |

Nếu issue vừa tạo đã có người làm, bot chỉ gửi **một** tin nhắn (không gửi trùng khi assign ngay lúc tạo). Chi tiết kỹ thuật: [`docs/devops/task-notifications.md`](../devops/task-notifications.md).

---

## 10. Câu hỏi thường gặp

**Tôi không kéo thẻ được?** Bạn cần đăng nhập và có quyền *Write* trên project. Báo Học (owner Organization) thêm quyền ở Project → ⋯ → *Settings* → *Manage access*. Người ngoài (kể cả TA) chỉ xem được.

**Issue đã đóng nhưng thẻ chưa sang Done?** Tải lại trang; nếu vẫn chưa thì đổi Status thủ công và báo Huy để kiểm tra *Workflows*.

**PR đã merge nhưng issue không tự đóng?** Mô tả PR thiếu `Closes #số` (phải đúng cú pháp, mỗi issue một dòng `Closes #…`). Đóng issue thủ công.

**Bot không tag tôi trên Discord?** Huy chưa có Discord ID của bạn, hoặc tên GitHub của bạn chưa có trong `.github/team.json`. Báo Huy.

**Tạo nhầm issue?** Nhấn **Close issue** → *Close as not planned*. Không cần xoá.
