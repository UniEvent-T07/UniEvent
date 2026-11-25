# Fxx · <Tên tính năng> — Ca kiểm thử PA4

<!--
Cách dùng: chép file này thành docs/test/Fxx.md (ví dụ F05.md), thay mọi chỗ <...>
và xóa các dòng ví dụ F01 khi đã có ca thật. Giữ nguyên tiêu đề mục và tiêu đề cột
để script tạo ma trận FR → TC đọc được.
-->

| Mục | Nội dung |
| --- | --- |
| Tính năng | Fxx · <tên theo [UNIEVENT-SPEC.md](../requirements/UNIEVENT-SPEC.md)> |
| Người phụ trách | Docs: <tên> · Code/Test: <tên> |
| FR được phủ | `FR-Fxx-01`–`FR-Fxx-NN` |
| BR/NFR liên quan | <ví dụ BR-12, NFR-08> |
| Điểm nối | Nhận từ <Fyy: thực thể, trường> · Giao cho <Fzz: thực thể, trường>. Xem [contracts.md](../design/contracts.md) |
| Fixture seed dùng | <mã fixture trong contracts.md, ví dụ `evt_published_paid`, `res_holding_fresh`> |

## Danh sách ca

Mỗi ca một dòng. Mã ca `TC-Fxx-NN` đánh số tăng dần, không dùng lại số đã xóa. Cột **FR** ghi một hoặc nhiều mã `FR-Fxx-NN`, cách nhau bằng dấu phẩy. Cột **Kỹ thuật** chọn một hoặc nhiều giá trị trong: `EP`, `BVA`, `bảng quyết định`, `chuyển trạng thái`, `use case`, `đồng thời`. Cột **Ưu tiên** là `Cao`, `Trung bình` hoặc `Thấp`. Cột **Chi tiết** ghi `Có` và liên kết tới khối đặc tả nếu ca nằm trong số ca chi tiết được giao, ngược lại ghi `—`.

| Mã ca | FR | BR/AC | Kỹ thuật | Tình huống | Dữ liệu | Kết quả mong đợi | Ưu tiên | Chi tiết |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-F01-01 | FR-F01-01 | — | BVA | Đăng ký Attendee với tên hiển thị ở biên 150 ký tự | Tên 149, 150 và 151 ký tự; email `@student.hcmus.edu.vn` hợp lệ; mật khẩu 15 ký tự | 149 và 150 ký tự: tạo tài khoản chờ xác minh. 151 ký tự: từ chối, báo lỗi bằng văn bản ở trường tên, không tạo tài khoản | Cao | [Có](#tc-f01-01) |
| TC-Fxx-NN | FR-Fxx-NN | BR-NN | EP | <một câu> | <giá trị cụ thể> | <điều quan sát được> | Trung bình | — |

## Đặc tả ca chi tiết

Mỗi ca chi tiết một khối như dưới. Kết quả mong đợi ghi theo từng bước, là điều quan sát được trên màn hình, trong phản hồi API hoặc trong DB. Không ghi "hệ thống chạy đúng".

### TC-F01-01

> Ví dụ mẫu. Mã FR của luồng đăng ký cần đối chiếu lại với PA2 §5.1 khi viết `F01.md`.

- **Mục tiêu:** Xác minh giới hạn tối đa 150 ký tự của tên hiển thị khi đăng ký Attendee.
- **FR / BR / AC:** FR-F01-01 · — · <AC nếu có>
- **Kỹ thuật:** BVA
- **Tiền điều kiện:** Seed chung đã nạp. Ba email dùng cho ca chưa có trong seed. Chưa đăng nhập (Guest).
- **Dữ liệu:**

  | Loại | Tên hiển thị | Email | Mật khẩu |
  | --- | --- | --- | --- |
  | Hợp lệ, dưới biên | chuỗi 149 ký tự `a` | `tc-f01-01-a@student.hcmus.edu.vn` | 15 ký tự hợp lệ |
  | Hợp lệ, đúng biên | chuỗi 150 ký tự, có dấu tiếng Việt (`Nguyễn Văn ...`) | `tc-f01-01-b@student.hcmus.edu.vn` | 15 ký tự hợp lệ |
  | Không hợp lệ, trên biên | chuỗi 151 ký tự `a` | `tc-f01-01-c@student.hcmus.edu.vn` | 15 ký tự hợp lệ |

- **Các bước và kết quả mong đợi:**

  | Bước | Thao tác | Kết quả mong đợi |
  | --- | --- | --- |
  | 1 | Mở trang đăng ký. | Form có nhãn cho tên hiển thị, email, mật khẩu. |
  | 2 | Nhập bộ dữ liệu 149 ký tự, gửi form. | Báo đã gửi email xác minh. DB có một `User` mới, chưa kích hoạt, `display_name` dài 149 ký tự. |
  | 3 | Nhập bộ dữ liệu 150 ký tự, gửi form. | Như bước 2, `display_name` giữ đủ 150 ký tự và đúng dấu. |
  | 4 | Nhập bộ dữ liệu 151 ký tự, gửi form. | Báo lỗi bằng văn bản tại trường tên hiển thị. Không có `User` mới với email này. |
  | 5 | Gọi thẳng API đăng ký với tên 151 ký tự (bỏ qua kiểm tra phía client). | API trả lỗi kiểm tra dữ liệu, không tạo `User`. |

- **Hậu điều kiện:** Có đúng hai tài khoản mới chưa kích hoạt (149 và 150 ký tự). Xóa hoặc reset seed trước khi chạy lại.
- **Bằng chứng cần thu:** Ảnh chụp màn hình bước 3 và 4; phản hồi API bước 5; truy vấn DB đếm `User` theo ba email.

### TC-Fxx-NN

- **Mục tiêu:**
- **FR / BR / AC:**
- **Kỹ thuật:**
- **Tiền điều kiện:** <mã fixture seed và trạng thái cần có>
- **Dữ liệu:** <hợp lệ · không hợp lệ · sát biên>
- **Các bước và kết quả mong đợi:**

  | Bước | Thao tác | Kết quả mong đợi |
  | --- | --- | --- |
  | 1 | | |

- **Hậu điều kiện:**
- **Bằng chứng cần thu:** <ảnh chụp · log · bản ghi DB · Audit Entry>

## Liên kết FR → TC

Liệt kê đủ mọi FR của tính năng. Mỗi FR có ít nhất một ca.

| FR | Ca kiểm thử |
| --- | --- |
| FR-F01-01 | TC-F01-01 |
| FR-Fxx-NN | TC-Fxx-NN, TC-Fxx-MM |

## Điểm nối còn chờ chốt

| Dữ liệu cần nhận | Từ F | Người phụ trách | Trạng thái |
| --- | --- | --- | --- |
| <thực thể · trường> | Fyy | <tên> | Chờ chốt / Đã chốt trong contracts.md |
