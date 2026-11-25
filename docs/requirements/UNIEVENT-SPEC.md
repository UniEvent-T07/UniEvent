# Đặc tả hệ thống UniEvent rút gọn

Tài liệu dành cho agent thực hiện từng đầu việc. Nội dung tóm tắt PA2 SRS, các điểm làm rõ trong PA3 và phần kiểm thử PA4. Dùng mã Fxx để tìm phần cần đọc. FR là yêu cầu chức năng, BR là luật nghiệp vụ, UC là luồng sử dụng và NFR là yêu cầu phi chức năng. Nếu một tình huống chưa đủ rõ để viết code hoặc kết quả mong đợi, đưa câu hỏi về cho Huy xác nhận bằng Markdown.

## Luồng chính và phạm vi

UniEvent giúp CLB tạo đề xuất, được duyệt, công bố sự kiện, bán vé hoặc phát vé miễn phí, ghi nhận tham dự bằng QR và xem thống kê. Phạm vi bắt buộc gồm **F01–F08, 47 FR**. F09 điểm rèn luyện và F10 chính sách hủy/hoàn vé nằm ngoài baseline này. F06 vẫn phải xử lý ngoại lệ khoản tiền đã nhận theo BR-19.

- **Attendee** là sinh viên đã xác minh email. **Guest** xem sự kiện công khai. **Organiser** có quyền theo CLB. **Approver** có quyền theo đơn vị duyệt. **Checker** được giao theo sự kiện. **Administrator** quản lý tổ chức, quyền và ngoại lệ thanh toán.
- **Thiết kế PA3** dùng Next.js, một backend NestJS chia module, PostgreSQL/Prisma, Socket.IO cho dashboard và dịch vụ email. Đọc ADR Markdown liên quan khi đầu việc cần chi tiết thiết kế. Các ADR trong repo ghi trạng thái **Proposed**. [Kiến trúc](../design/adr/001-modular-monolith.md) · [Dữ liệu và tồn vé](../design/adr/002-postgresql-transactional-inventory.md) · [Thanh toán](../design/adr/003-sepay-payment-fulfilment.md)
- **Điểm nối** dùng danh tính và quyền từ F01. F02 gửi để F03 duyệt, rồi dùng cấu hình F04 để công bố. F05 tạo đơn và giữ suất cho F06 phát vé. F07 quét vé do F06 phát. F08 dùng dữ liệu đã ghi nhận của F06/F07.

## F01

**Tài khoản và phân quyền** · `FR-F01-01–12`, UC-01–08.

- Đăng ký Attendee bằng tên hiển thị tối đa 150 ký tự, email có miền chính xác `student.hcmus.edu.vn` hoặc `hcmus.edu.vn` và mật khẩu 15–128 ký tự. Kích hoạt sau khi xác minh email. Link dùng một lần trong 15 phút, chờ 60 giây giữa hai lần gửi. Phiên hết hạn sau 30 phút không hoạt động hoặc 8 giờ kể từ lúc đăng nhập. Logout và khóa tài khoản làm phiên mất hiệu lực.
- Server kiểm tra tài khoản đang hoạt động, vai trò và đúng phạm vi ở mỗi yêu cầu được bảo vệ. Một tài khoản có thể có nhiều quyền độc lập. Admin cấp/thu hồi Organiser theo CLB và Approver theo đơn vị, khóa/mở khóa tài khoản thường. Organiser gán/gỡ checker đủ điều kiện cho sự kiện thuộc CLB của mình.
- Admin quản lý tổ chức. Mã, loại và tuyến duyệt của tổ chức giữ nguyên sau khi tạo. Việc vô hiệu hóa phải xét CLB phụ thuộc, đề xuất đang chờ, sự kiện đang hoặc sắp diễn ra, suất giữ và ngoại lệ chưa giải quyết theo BR-10. Chỉ Admin xem nhật ký theo trang. Khách chỉ xem catalogue và thông tin công khai của sự kiện Published.

## F02

**Tạo và gửi đề xuất** · `FR-F02-01–06`, UC-09/10/13, BR-05–07.

- Organiser tạo Draft đủ tiêu đề, mô tả, giờ bắt đầu/kết thúc, địa điểm, sức chứa nguyên dương và poster PNG/JPEG tối đa 5 MiB. Giờ kết thúc sau giờ bắt đầu. Khi gửi, giờ bắt đầu phải ở tương lai.
- Chỉ sửa nội dung ở Draft hoặc Changes Requested, trong phạm vi CLB của mình. Giữ tổ chức và tuyến duyệt ban đầu. Từ chối sửa nếu làm cấu hình vé hiện có vi phạm sức chứa hoặc giờ bán. Gửi và gửi lại tạo vòng mới, giữ lịch sử quyết định cũ.
- Đường đi gồm Draft → Submitted, Changes Requested → Submitted và Approved → Published. Chỉ công bố khi có loại vé cấu hình hợp lệ. Catalogue chỉ lộ dữ liệu công khai sau khi Published.

## F03

**Duyệt đề xuất** · `FR-F03-01–07`, UC-11/12, BR-01–06.

- Approver xem hàng đợi, chi tiết và lịch sử trong đơn vị mình. Duyệt chỉ khi trạng thái Submitted và đề xuất được chuyển đúng đơn vị. Approver đồng thời có quyền Organiser tại CLB gửi đề xuất bị từ chối quyết định.
- Kết quả của một vòng là Approved, Rejected hoặc Changes Requested. Hai kết quả sau cần lý do có nội dung. Rejected kết thúc đề xuất đó. Changes Requested cho phép F02 sửa và gửi vòng mới.
- Mỗi vòng chỉ có một quyết định được lưu, kể cả khi hai người quyết định cùng lúc. Giữ lịch sử các vòng và cho Approver tìm lịch sử theo tiêu đề sự kiện.

## F04

**Cấu hình loại vé** · `FR-F04-01–03`, UC-14, BR-12.

- Organiser cấu hình tên, giá VND nguyên không âm, số lượng và giới hạn mỗi tài khoản nguyên dương. Tổng số vé các loại không vượt sức chứa. `sales_start < sales_end ≤ event_start`. Khách xem loại vé, giá, thời gian bán và số vé còn của sự kiện Published.
- Khóa cả thêm và sửa từ thời điểm mở bán sớm nhất đang được cấu hình cho sự kiện. Trước mốc khóa, cấu hình mới cũng phải giữ giờ bán sớm nhất ở tương lai. Giá đã lưu trên đơn giữ nguyên.

## F05

**Giữ vé và mở thanh toán** · `FR-F05-01–05`, UC-15/16, BR-13–16/18/20.

- Attendee đã xác minh và chưa bị khóa đặt một vé mỗi đơn trong cửa sổ bán `[sales_start, sales_end)` của sự kiện Published. Kiểm tra sức chứa và giới hạn tài khoản trong cùng giao dịch. Tính cả hold chưa hết hạn, đơn đã xác nhận còn giữ suất và vé đã phát.
- Đơn trả phí giữ suất 15 phút theo giờ server. Hết hạn nhả suất chưa xác nhận đúng một lần. Đơn miễn phí ghi đơn, phân bổ và phát một vé trong cùng giao dịch. Nếu giao dịch thất bại, hoàn tác cả ba. Khi thử lại, dùng cùng mã yêu cầu để nhận đúng kết quả.
- Thanh toán qua **SePay Payment Gateway**, một kênh VietQR `BANK_TRANSFER` bằng VND. Tạo checkout ký phía server với mã hóa đơn và số tiền từ đơn đã lưu. Thử lại dùng cùng hóa đơn. Trang quay về hiển thị trạng thái từ server. Xác nhận thanh toán thuộc F06.

## F06

**Xác nhận thanh toán và phát hành vé** · `FR-F06-01–07`, UC-17–19, BR-17–20.

- Xác thực IPN (thông báo thanh toán từ SePay) bằng cơ chế đã cấu hình. Đối chiếu giao dịch duy nhất, hóa đơn, kênh, phương thức, VND và số tiền. Điều kiện trả phí thành công của BR-17 gồm `ORDER_PAID`, `CAPTURED`, `APPROVED`, `PAYMENT` và `BANK_TRANSFER`. IPN lặp lại và khoản chuyển thêm không được phát thêm vé.
- Theo **BR-20 hiện hành**, giao dịch xác nhận hợp lệ đầu tiên phải **commit trước** mốc hết hạn giữ vé và vẫn còn suất được giữ. Tại hoặc sau mốc đó, lưu ngoại lệ thanh toán trễ. PA3 đề xuất dùng lần kiểm tra cuối khi đang giữ lock, hiện còn chờ duyệt. Giữ kết quả mong đợi theo luật PA2 hiện hành.
- Một đơn đủ điều kiện phát đúng một vé QR ký số. Nếu phát vé trả phí lỗi, giữ receipt và suất để Admin thử lại. Sau khi vé được lưu, email lỗi vẫn giữ vé cho chủ đơn trong My Tickets. Thử gửi lại cùng vé.
- Admin xem ngoại lệ như thanh toán trễ, sai khớp, thừa hoặc đã xác nhận nhưng chưa phát vé. BR-19 cho phép lưu một khoản hoàn toàn phần đã thực hiện bên ngoài cho một receipt đủ điều kiện, kèm chứng từ, số tiền, thời điểm, mã chuyển khoản duy nhất, lý do và bằng chứng báo cho người trả. Chặn ghi lặp hoặc hoàn vượt số tiền. Ghi nhận khoản hoàn hợp lệ, audit và nhả suất còn giữ của đơn chưa phát vé trong cùng giao dịch. Hồ sơ hoàn một phần hoặc liên quan vé đã phát giữ lại để xem xét riêng.

## F07

**Check-in và check-out bằng QR** · `FR-F07-01–04`, UC-20–22, BR-21.

- Checker mở scanner trên điện thoại cho đúng sự kiện được giao. Server kiểm tra quyền, chữ ký QR, sự kiện và trạng thái vé. Chuyển trạng thái theo **chưa check-in → đã check-in → đã check-out**. Mỗi bước chỉ ghi một lần, kể cả khi quét cùng lúc.
- Trả kết quả **hợp lệ**, **đã dùng** hoặc **không hợp lệ** cùng thao tác và giờ liên quan. Quét sai sự kiện hoặc check-out trước check-in là không hợp lệ. Thử vào lại sau check-out là đã dùng. Lỗi mạng cần kiểm tra lại trạng thái server.

## F08

**Dashboard và CSV** · `FR-F08-01–03`, UC-23/24, BR-22, OD-08/09.

- Organiser xem số vé đã phát, doanh thu gộp từ receipt xác nhận của đơn và tỷ lệ check-in. Doanh thu gồm khoản xác nhận đủ điều kiện dù chưa phát vé, bỏ khoản chuyển thừa, không khớp và vé miễn phí. Hoàn tiền ghi ngoài hệ thống không trừ doanh thu gộp. Tỷ lệ lấy số vé đã từng check-in chia số vé đã phát, làm tròn một chữ số thập phân, mặc định 0,0%.
- Cập nhật từ dữ liệu đã commit. Hiển thị khác nhau khi đang tải, chưa có dữ liệu, không lấy được dữ liệu và khi chỉ có bản xem gần nhất. Retry lấy bản mới theo quyền hiện tại.
- CSV mỗi vé đã phát một dòng, đúng phạm vi sự kiện, ghi audit trước khi cho tải. Cột theo thứ tự `ticket_id,event_title,ticket_type,attendee_name,attendee_email,payment_status,issued_at,check_in_at,check_out_at,attendance_state`. UTF-8 BOM, phân cách dấu phẩy, xử lý dấu nháy và chặn công thức trong ô văn bản. Giờ ISO-8601 ở +07:00, để trống giờ chưa có. Không xuất QR hay thông tin xác thực.

## Luật và kiểm thử dùng chung

- **BR-11** ghi nhật ký bất biến cho cấp/thu hồi quyền, gán/gỡ checker, khóa/mở khóa tài khoản, vô hiệu hóa tổ chức, tạo/gửi/gửi lại đề xuất, quyết định duyệt, giải quyết ngoại lệ thanh toán và xuất CSV. Ghi người thực hiện, thời điểm, thao tác, đích/phạm vi và kết quả. Lưu cùng giao dịch cho thao tác thay đổi dữ liệu.
- **NFR-02/06/09** kiểm tra quyền ở server, HTTPS/WSS, cookie phiên Secure/HttpOnly/SameSite, bảo vệ CSRF, băm mật khẩu và lưu digest của token xác minh dùng một lần. QR không chứa dữ liệu cá nhân. Log và CSV không chứa bí mật.
- **NFR-03/07** thử màn hình ở 360×800 và 1366×768, kiểm tra nhãn, focus bàn phím, lỗi bằng văn bản và độ tương phản chữ thường ít nhất 4,5:1. Chạy Chrome/Edge desktop, Android Chrome và iPhone Safari. Dùng điện thoại thật cho camera.
- **NFR-01/04/05/08** trên môi trường nghiệm thu PA5 E1, dùng 20 phiên đồng thời, 10 sự kiện, 500 vé giả lập toàn hệ thống và 200 vé trong sự kiện mục tiêu. F07 có ít nhất 95/100 yêu cầu quét đã giải mã mỗi trình duyệt điện thoại trên 4G trả kết quả trong 2 giây. F06 phát vé và khởi tạo gửi email trong 60 giây cho mỗi ca trong 20 ca thanh toán đủ điều kiện. F08 hiện từng cập nhật trong 5 giây cho 20 cập nhật trên kết nối đang hoạt động. Kiểm tra 20 yêu cầu tranh suất cuối và 20 IPN lặp để xác minh tồn vé và tính duy nhất.
- **NFR-10** trước nghiệm thu PA5, sao lưu có bảo vệ và phục hồi vào PostgreSQL riêng trong 60 phút. So số bản ghi tổ chức, quyền, đơn, receipt, vé, tham dự và nhật ký.
- **PA4** ghi kế hoạch, kỹ thuật thiết kế test, danh sách ca, đặc tả chi tiết và ma trận nối đủ 47 FR với ít nhất một ca mỗi FR. Nhóm đã phân 20 ca chi tiết theo tính năng. Test Plan có phạm vi, cấp/loại test, môi trường, dữ liệu, tiêu chí vào/ra, lịch, rủi ro và cách báo lỗi. Hồ sơ có đóng góp đủ 100%, bằng chứng và log AI. Ghi kết quả chạy thực tế ở PA5.
