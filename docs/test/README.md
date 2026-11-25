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

Bảng **Requirements–Test Traceability** (`Req. ID | Test cases | Covered?`) được tạo ở PA4.3 từ cột `Req. / use case` của mục 4 trong cả 8 file. Vì vậy mỗi FR của tính năng phải xuất hiện trong cột này ở ít nhất một ca. Huy dựa vào cột này để rà độ phủ 47 FR.

Các phần còn lại của bản nộp do Học viết ở PA4.3: Member Contribution, các mục khác của Test Plan và AI Usage Log.

## Trước khi mở PR cho `Fxx.md`

- Mã ca `TC-Fxx-NN` không trùng. Mã `FR-Fxx-NN` có trong [UNIEVENT-SPEC.md](../requirements/UNIEVENT-SPEC.md).
- Mỗi FR của tính năng có ít nhất một ca ở mục 4. Mỗi cột trong bảng quyết định trỏ tới một ca.
- Mỗi ca có đặc tả ở mục 5 thì được liên kết từ mục 4.
- Nhờ **Huy** duyệt kết quả mong đợi và độ phủ, **Minh** duyệt kỹ thuật thiết kế test.
