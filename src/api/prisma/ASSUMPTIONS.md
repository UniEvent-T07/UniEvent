# Giả định schema Setup v0

Những lựa chọn dưới đây hỗ trợ dữ liệu mẫu và các điểm nối đang xây dựng. Xem các câu hỏi nghiệp vụ ở [hợp đồng mục D](../../../docs/design/contracts.md#d-câu-hỏi-mở).

| BR / FR | Biểu diễn trong Setup v0 | Cần chốt |
| --- | --- | --- |
| BR-05–07, FR-F02-01–06, FR-F03-01–07 | Mỗi vòng có số thứ tự trong sự kiện và tối đa một quyết định. Suy ra trạng thái vòng từ việc đã có quyết định. | Huy và Kiệt chốt cách chọn vòng hiện tại và cách xử lý nội dung từng bị từ chối. |
| BR-12, FR-F02-01–06, FR-F04-01–03 | Suy ra Configuration Lock từ giờ mở bán sớm nhất của các loại vé thuộc cùng sự kiện. | Kiệt và Huy chốt trạng thái sự kiện được cấu hình vé và điều kiện công bố. |
| BR-14, BR-19–20, FR-F05-01–05, FR-F06-01–07 | Mỗi suất có thể gắn với tối đa một đơn cùng loại vé. Suất đã nhả có `reservationId` rỗng. Đơn mẫu hoàn toàn phần trước phát vé giữ trạng thái `CONFIRMED`. | Huy và Kiệt chốt điều kiện nhả suất và bằng chứng TX-A commit trước hạn theo BR-20. Kiệt và Minh thống nhất thứ tự khóa khi triển khai. |
| BR-17, BR-19–20, FR-F06-01–07 | Biên nhận có thể lưu bằng chứng khi chưa khớp đơn. Khóa ngoại ghép giữ biên nhận xác nhận trong đúng đơn và trigger giữ nguyên liên kết sau khi gắn. Các lần hoàn ghi theo mã giao dịch hoàn duy nhất. | Huy và Kiệt chốt thứ tự phân loại IPN, trường đối chiếu, cách ghi hoàn một phần và khi nào đóng ngoại lệ. |
| BR-21–22, FR-F07-01–04, FR-F08-01–03 | Sự kiện của vé suy ra từ đơn và loại vé. Trạng thái tham dự suy ra từ hai mốc check-in, check-out có thể rỗng. Seed tạo cả bản ghi chưa check-in. | Kiệt và Huy chốt thời điểm tạo Attendance Record, kết quả quét lặp và giá trị các cột trạng thái trong CSV. |
| BR-10–11, FR-F01-01–12 | Vai trò toàn hệ thống có thể dùng cặp phạm vi rỗng. Cấp quyền đang hiệu lực có `revokedAt` rỗng. | Huy và Kiệt chốt điều kiện gán người soát vé, dữ liệu chặn vô hiệu hóa tổ chức và các trường nhật ký. Học triển khai F01. |

`usr_organiser_club_b` hỗ trợ kiểm sai phạm vi CLB. `usr_attendee_check_in` và `usr_attendee_check_out` tách chủ hai vé mẫu đã check-in để kiểm tra CSV. Sự kiện trả phí mẫu có ba vé đã phát.
