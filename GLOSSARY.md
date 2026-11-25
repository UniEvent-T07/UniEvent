# UniEvent

Bảng thuật ngữ chung cho docs, ca kiểm thử và code của UniEvent. Mỗi khái niệm có **một tên tiếng Anh** dùng trong code và tài liệu thiết kế, kèm *tên tiếng Việt* dùng trong docs. Tránh các tên ở mục _Avoid_.

## Vai trò

**Guest** (*khách*):
Người chưa đăng nhập. Chỉ xem catalogue và thông tin công khai của Event đã Published.
_Avoid_: visitor, anonymous user

**Attendee** (*người tham dự*):
Sinh viên có tài khoản đã xác minh email trường, đặt vé và tham dự sự kiện.
_Avoid_: customer, buyer, student user

**Organiser** (*người tổ chức*):
Tài khoản có quyền tổ chức sự kiện trong phạm vi một Club.
_Avoid_: club admin, host, organizer

**Approver** (*người duyệt*):
Tài khoản có quyền duyệt Event trong phạm vi một Approval Unit.
_Avoid_: reviewer, moderator

**Checker** (*người soát vé*):
Tài khoản được Organiser giao cho một Event cụ thể để quét vé.
_Avoid_: scanner, staff, gatekeeper

**Administrator** (*quản trị viên*):
Tài khoản quản lý Organisation, Role Assignment, khóa tài khoản và xử lý Payment Exception.
_Avoid_: superuser, root, Admin khi viết trong code

**Role Assignment** (*cấp quyền*):
Việc gắn một vai trò cho một tài khoản trong một phạm vi: Club, Approval Unit hoặc Event. Một tài khoản có thể có nhiều Role Assignment độc lập.
_Avoid_: permission, role (khi muốn nói cả phạm vi)

## Tổ chức

**Organisation** (*tổ chức*):
Một Club hoặc một Approval Unit. Mã, loại và Approval Route của nó giữ nguyên sau khi tạo.
_Avoid_: tenant, group

**Club** (*CLB*):
Organisation tạo và tổ chức Event.
_Avoid_: society, team

**Approval Unit** (*đơn vị duyệt*):
Organisation có quyền duyệt Event của các Club thuộc tuyến của nó.
_Avoid_: department, faculty

**Approval Route** (*tuyến duyệt*):
Quan hệ cố định cho biết Event của một Club được chuyển tới Approval Unit nào.
_Avoid_: workflow, chain

## Sự kiện và duyệt

**Event** (*sự kiện*):
Một sự kiện của Club, đi qua các trạng thái Draft, Submitted, Changes Requested, Approved, Rejected và Published. Khi còn trước Published, docs gọi Event là *đề xuất*, nhưng nó vẫn là cùng một Event.
_Avoid_: Proposal (như một thực thể riêng), activity

**Review Round** (*vòng duyệt*):
Một lần gửi hoặc gửi lại Event để duyệt. Mỗi vòng có tối đa một Review Decision.
_Avoid_: submission, iteration, version

**Review Decision** (*quyết định duyệt*):
Kết quả của một Review Round: Approved, Rejected hoặc Changes Requested. Hai kết quả sau phải có lý do.
_Avoid_: review, verdict, approval (khi muốn nói cả ba kết quả)

**Catalogue** (*danh sách sự kiện công khai*):
Tập các Event đã Published mà Guest xem được.
_Avoid_: feed, listing

## Vé và thanh toán

**Ticket Type** (*loại vé*):
Một hạng vé của Event, gồm tên, giá VND, số lượng, giới hạn mỗi tài khoản và Sales Window.
_Avoid_: ticket class, tier, category

**Sales Window** (*thời gian bán*):
Khoảng từ giờ mở bán đến giờ đóng bán của một Ticket Type.
_Avoid_: sale period, booking window

**Configuration Lock** (*khóa cấu hình vé*):
Từ giờ mở bán sớm nhất của Event, không ai được thêm hoặc sửa Ticket Type nữa.
_Avoid_: freeze, sales lock

**Reservation** (*đơn*):
Yêu cầu một vé của Attendee cho một Ticket Type, đi qua các trạng thái Holding, Confirmed, Issued hoặc Expired.
_Avoid_: Order, Booking, Hold (như một thực thể riêng)

**Holding** (*đang giữ suất*):
Trạng thái của Reservation trả phí trong 15 phút chờ thanh toán, đang giữ một Allocation.
_Avoid_: pending, hold

**Allocation** (*suất*):
Một đơn vị tồn vé mà Reservation đang giữ hoặc đã dùng. Allocation không thuộc đơn nào thì còn trống để bán.
_Avoid_: slot, seat, stock unit

**Payment Notification** (*thông báo thanh toán, IPN*):
Thông báo từ SePay mà server tự xác thực trước khi tin. Thông báo có thể đến lặp lại, sai hoặc trễ.
_Avoid_: webhook (trong docs nghiệp vụ), callback, redirect

**Payment Receipt** (*biên nhận thanh toán*):
Bản ghi của một khoản tiền SePay đã báo về cho một Reservation. Receipt hợp lệ đầu tiên là **Confirming Receipt** (*biên nhận xác nhận*).
_Avoid_: payment, transaction, giao dịch

**Payment Exception** (*ngoại lệ thanh toán*):
Tình huống tiền đã về nhưng không phát vé tự động được: thanh toán trễ, sai khớp, chuyển thừa hoặc phát vé lỗi. Administrator xử lý ngoại lệ này.
_Avoid_: error, failed payment, dispute

**External Refund** (*hoàn tiền ngoài hệ thống*):
Khoản hoàn đã thực hiện bên ngoài UniEvent. Administrator chỉ ghi nhận lại kèm chứng từ.
_Avoid_: refund (như thể hệ thống tự hoàn), chargeback

**Ticket** (*vé*):
Vé có QR ký số được phát cho đúng một Reservation đủ điều kiện. QR không chứa dữ liệu cá nhân.
_Avoid_: pass, QR (khi muốn nói cả vé), e-ticket

## Tham dự và báo cáo

**Attendance Record** (*bản ghi tham dự*):
Trạng thái tham dự của một Ticket: chưa check-in, đã check-in, đã check-out. Mỗi bước chỉ ghi một lần.
_Avoid_: check-in log, scan history

**Scan Result** (*kết quả quét*):
Phản hồi cho một lần quét: Valid (*hợp lệ*), Already Used (*đã dùng*) hoặc Invalid (*không hợp lệ*).
_Avoid_: scan status, OK/error

**Gross Confirmed Revenue** (*doanh thu gộp*):
Tổng tiền từ các Confirming Receipt của các Reservation. Không gồm khoản chuyển thừa, khoản sai khớp và vé miễn phí. External Refund không trừ vào con số này.
_Avoid_: revenue, sales, net revenue

**Check-in Rate** (*tỷ lệ check-in*):
Số Ticket đã từng check-in chia cho số Ticket đã phát.
_Avoid_: attendance rate, turnout

**Audit Entry** (*nhật ký thao tác*):
Bản ghi bất biến của một thao tác cần lưu vết theo BR-11. Ghi người thực hiện, thời điểm, thao tác, đích và kết quả.
_Avoid_: log, history, activity
