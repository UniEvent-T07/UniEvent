# Test

Test plan, test cases and test reports (PA4–PA5).

## Viết ca kiểm thử PA4

Template [TEMPLATE-Fxx.md](TEMPLATE-Fxx.md) theo đúng mẫu nộp `PA4-TestPlan-TestCases.docx` của môn. **Nội dung ca viết bằng tiếng Anh** để Học chép thẳng vào bản nộp, không phải dịch. Trao đổi trong issue và PR vẫn dùng tiếng Việt.

1. Chép template thành `Fxx.md` của tính năng mình, ví dụ `F05.md`.
2. Điền phần đầu, rồi lần lượt viết các mục 1–5. Giữ nguyên tiêu đề mục và tiêu đề cột.
3. Ở mục 5, viết đặc tả cho số ca chi tiết được giao trong [Kế hoạch PA4 và PA5](../management/PA4-phan-cong.md). Cả nhóm có 20 ca.
4. Dùng tên theo [GLOSSARY.md](../../GLOSSARY.md) và mã fixture seed trong [contracts.md](../design/contracts.md).
5. Xóa các dòng ví dụ F01 khỏi file của mình, trừ khi đó chính là `F01.md`.

## Mục nào trong file vào mục nào của bản nộp

| Mục trong `Fxx.md` | Mục trong bản nộp docx |
| --- | --- |
| 1. Test Design Techniques | Test Plan › Test Design Techniques |
| 2. Equivalence Partitions and Boundary Values | Test Design › Equivalence Partitions and Boundary Values |
| 3. Decision Tables | Test Design › Decision Tables |
| 4. List of Test Cases | Test Cases › List of Test Cases |
| 5. Test Case Specifications | Test Cases › Test Case Specifications |
| 6. Open Integration Points | Không đưa vào bản nộp |

Bảng **Requirements–Test Traceability** (`Req. ID | Test cases | Covered?`) được script tạo từ cột `Req. / use case` của mục 4 trong cả 8 file. Vì vậy mỗi FR của tính năng phải xuất hiện trong cột này ở ít nhất một ca.

## Script kiểm tra và ma trận truy vết

Cần Node.js 18 trở lên, không cần cài gói nào. Chạy ở thư mục gốc repo:

| Lệnh | Khi nào | Làm gì |
| --- | --- | --- |
| `node scripts/test-cases.mjs` | Trước mỗi PR có `Fxx.md` | Báo `error` cho lỗi phải sửa: mã ca trùng hoặc sai F, FR không có trong spec, Priority hay Automated? sai giá trị, ca được liên kết nhưng thiếu đặc tả, bảng quyết định trỏ tới ca không có, còn placeholder của template. Báo `warning` cho FR chưa phủ và số ca chi tiết còn thiếu. |
| `node scripts/test-cases.mjs --strict` | PA4.2 trở đi | Như trên, nhưng FR chưa phủ, file chưa tạo và số ca chi tiết dưới mức được giao cũng tính là `error`. |
| `node scripts/test-cases.mjs --strict --write` | PA4.3, Học chạy | Ghi `docs/test/TRACEABILITY.md` để chép vào bản nộp. Không sửa tay file này. |

Script trả mã thoát 1 khi còn `error`, nên có thể gắn vào CI ở Setup v0. Số ca chi tiết được giao cho từng F nằm trong `SPEC_QUOTA` ở đầu script, đồng bộ với kế hoạch.

Các phần còn lại của bản nộp do Học viết ở PA4.3: Member Contribution, các mục khác của Test Plan và AI Usage Log.

## Trước khi mở PR cho `Fxx.md`

- Chạy `node scripts/test-cases.mjs`, không còn dòng `error`. Dán dòng tổng kết cuối vào mô tả PR.
- Mỗi FR của tính năng có ít nhất một ca ở mục 4, hoặc đã ghi lý do còn thiếu trong PR.
- Kết quả mong đợi quan sát được trên màn hình, API hoặc DB. Script không kiểm tra được điểm này.
- Nhờ **Huy** duyệt kết quả mong đợi và độ phủ, **Minh** duyệt kỹ thuật thiết kế test.
