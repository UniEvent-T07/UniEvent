# Hướng dẫn agent UniEvent

UniEvent là dự án của nhóm T07. Đọc file này trước khi làm việc. Chỉ bắt đầu đầu việc được giao trong chat hoặc issue cụ thể.

## Xác định đầu việc

1. Xác định **PA và mốc đang làm**, **thành viên đang được hỗ trợ**, **mã F01–F08 hoặc việc dùng chung**, và **phần Docs, Code hay Test**. Dùng lời giao việc hoặc người được gán trên issue đã chỉ định. Tra kế hoạch để suy ra mốc và người phụ trách khi chỉ có một cách hiểu. Tên máy, nhánh Git và email cấu hình Git có thể thuộc người khác.
2. Đối chiếu bảng bên dưới. Phân công cho biết phạm vi của từng người. Issue và tiêu chí hoàn thành xác định phần cần làm trong phiên. Ví dụ, Minh phụ trách Docs và test thiết bị F07, còn Kiệt phụ trách code scanner F07.
3. Khi còn nhiều cách hiểu, hỏi một câu ngắn để chốt phần còn thiếu trước khi sửa. Khi phạm vi đã rõ, làm ngay. Nếu cần thay đổi phần của người khác, nêu điểm nối cần đổi và người phụ trách, rồi tiếp tục phần việc độc lập.

| Thành viên | Phần tính năng | Trách nhiệm phối hợp |
| --- | --- | --- |
| **Học** · `KoKoNutKing` | F01 và F08, cả Docs và Code/Test. | **Phụ trách toàn bộ setup repo chung**, điều phối board và gộp hồ sơ. |
| **Huy** · `ThaiQuangHuy2906` | F02 và F03, cả Docs và Code/Test. F06 viết phần luật và ca ngoại lệ trong hồ sơ kiểm thử. | Rà kết quả mong đợi theo nghiệp vụ và độ phủ ma trận truy vết. |
| **Kiệt** · `kite2207` | F04 và F05, cả Docs và Code/Test. F07 làm code scanner và trạng thái quét. | Rà thiết kế và dữ liệu trao đổi ở các điểm nối tính năng. |
| **Minh** · `AIVIETNAM-AIO-Heart208` | F06 làm code, ca thanh toán/phát vé và tổng hợp ca ngoại lệ của Huy. F07 làm Docs và test thiết bị. | Rà Test Plan, cách kiểm thử và bằng chứng của các ca. |

## Giai đoạn và mốc đồng bộ

Hạn theo GMT+7. PA4 nộp trước T7 5/12/2026, PA5 xong trước T4 9/12/2026. Docs PA4 và Code PA5 chạy song song từ T2 30/11. Khi trùng hạn, ưu tiên Docs PA4.

- **PA4.1 (CN 29/11):** Nếu nhận việc setup repo chung, agent hỗ trợ Học làm nền Docs và Setup v0 theo checklist trong kế hoạch. Các đầu việc theo tính năng bắt đầu bằng chốt yêu cầu, dữ liệu test và điểm nối.
- **PA4.2 (T4 2/12) – PA4.3 (T6 4/12):** Hoàn thiện danh sách và đặc tả ca kiểm thử theo tính năng. Đối chiếu ma trận truy vết và bàn giao bộ PA4 cùng Setup v1.
- **Code PA5 từ T2 30/11:** Mọi F code song song trên Setup v0. Phần phụ thuộc F khác chưa xong thì dùng bộ dữ liệu seed theo trạng thái. Mốc tích hợp: **PA5.1 (T5 3/12)** nối F01–F04, **PA5.2 (CN 6/12)** nối F05–F08 trên staging, **PA5.3 (T3 8/12)** chạy test, sửa lỗi và ghi kết quả.
- Trong mỗi tính năng, làm các lớp được giao như màn hình, API, dữ liệu và test. Thêm trường và migration `<timestamp>_fxx_<mô_tả>` của tính năng trong PR riêng. Model nền (`User`, `Organisation`, `RoleAssignment`, `AuditLog`), guard phân quyền, seed chung và staging thuộc Học. Đưa nhu cầu thay đổi phần đó về Học. Xem đầu ra và thứ tự việc ở từng mốc trong [Kế hoạch PA4 và PA5](docs/management/PA4-phan-cong.md).

## Chỉ đọc phần cần cho task

1. Đọc issue được giao hoặc nội dung người dùng cung cấp. Xem trạng thái trên GitHub Project và tiêu chí hoàn thành trong issue.
2. Đọc mục **Fxx** liên quan trong [Đặc tả hệ thống rút gọn](docs/requirements/UNIEVENT-SPEC.md). Nếu chạm tới giao tiếp giữa hai tính năng, đọc thêm mục của tính năng bên kia.
3. Đọc mục Fxx trong [Kế hoạch PA4 và PA5](docs/management/PA4-phan-cong.md) để biết phần được giao. Đây là tài liệu cho người đọc, hãy bỏ qua các liên kết PDF. Với code, đọc README của phần liên quan và code hiện có.
4. Dùng tên gọi theo [GLOSSARY.md](GLOSSARY.md): tên tiếng Anh trong code, tên tiếng Việt trong docs. Khi chạm điểm nối giữa hai F, đọc `docs/design/contracts.md` và ADR liên quan trong `docs/design/adr/`.

**Agent không mở, chuyển đổi, tìm kiếm trong hay trích nội dung từ PDF.** Dùng Markdown, issue và code trong phạm vi task. Nếu thiếu luật nghiệp vụ, ghi mã FR/BR hoặc tình huống cụ thể rồi nhờ Huy bổ sung vào đặc tả Markdown. Ghi nhận đề xuất đang chờ duyệt theo đúng trạng thái.

## Thực hiện và bàn giao

- Xác minh đúng checkout, nhánh, HEAD và thay đổi đang có theo hướng dẫn Git của môi trường. Giữ phần việc đang dở của người khác. Tách PR theo đầu việc đã giao. Học merge mọi PR vào `main`. PR chạm điểm nối cần thêm người phụ trách F ở đầu bên kia duyệt.
- Ca kiểm thử PA4 viết vào `docs/test/Fxx.md` theo template, mã ca `TC-Fxx-NN`, ghi kèm mã `FR-Fxx-NN`.
- Làm phần có đầu ra kiểm tra được. Nếu phụ thuộc tính năng chưa có, ghi rõ dữ liệu cần nhận và người phụ trách. Có thể chuẩn bị phần độc lập bằng dữ liệu mẫu. Đánh dấu phần tích hợp còn chờ khi bàn giao.
- Đọc lệnh build/test đã có trong repo trước khi chạy. Với việc chỉ làm Docs, kiểm tra liên kết, mã yêu cầu, ví dụ và tính nhất quán của ca. Chỉ báo kiểm tra đạt khi đã chạy và có kết quả.
- Dùng dữ liệu giả lập cho kiểm thử. Giữ khóa, mật khẩu và thông tin người dùng thật ngoài repo.
- Bàn giao ngắn với **việc đã làm**, **file hoặc PR**, **kiểm tra đã chạy và kết quả**, **việc còn chờ và người xử lý**. Hoàn thành phần được giao trước khi nhận đầu việc tiếp theo.

## Ví dụ giao việc

- “Bạn hỗ trợ Học. Làm **PA4.1 Setup repo chung** theo issue được giao.”
- “Bạn hỗ trợ Huy. Làm **PA4.2 F02 Docs** cho ca gửi lại đề xuất, đối chiếu BR-05–07.”
- “Bạn hỗ trợ Kiệt. Làm **PA5.2 F07 Code** cho scanner và trạng thái quét. Bàn giao Minh ca test trên điện thoại.”
- “Bạn hỗ trợ Minh. Làm **issue #…** theo mô tả và tiêu chí hoàn thành trong issue.”
