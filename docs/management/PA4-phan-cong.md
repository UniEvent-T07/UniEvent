# Phân công PA4 và PA5 cho nhóm UniEvent

**Học phụ trách toàn bộ setup repo chung.** Các thành viên phụ trách phần việc theo tính năng đã giao. Mỗi tính năng có một issue cha trên board, với đầu việc **Docs** ở PA4 để chuẩn bị ca kiểm thử và đầu việc **Code/Test** ở PA5 để triển khai và chạy các ca đó.

**Hạn cứng:** PA4 nộp trước **T7 5/12/2026**, mọi việc PA5 xong trước **T4 9/12/2026**. Vì vậy Docs PA4 và Code PA5 chạy song song từ **T2 30/11**. Khi hai việc trùng hạn, ưu tiên Docs PA4. Mọi giờ trong tài liệu này theo GMT+7.

## Tra nhanh theo thành viên

| Thành viên | Tính năng phụ trách | Phần tổng hợp |
| --- | --- | --- |
| **Học** | F01 và F08 | Setup repo chung, theo dõi tiến độ và gộp hồ sơ nộp. |
| **Huy** | F02 và F03. Viết phần luật và ca kiểm thử ngoại lệ cho F06. | Rà kết quả mong đợi theo yêu cầu và độ phủ ma trận truy vết. |
| **Kiệt** | F04 và F05. Làm code scanner và trạng thái quét cho F07. | Rà thiết kế và dữ liệu trao đổi giữa các tính năng. |
| **Minh** | F06, có Huy hỗ trợ phần Docs. Làm Docs và test điện thoại cho F07. | Rà Test Plan, cách viết ca và bằng chứng kiểm thử. |

Người làm **Code/Test** xử lý những phần tính năng cần, gồm màn hình, API, thay đổi cơ sở dữ liệu, dữ liệu mẫu riêng và test. Học xử lý các thay đổi thuộc nền dùng chung. F06 và F07 giữ phần chia cụ thể bên dưới.

## Mốc phối hợp PA4 và PA5

Các mốc dưới đây dùng để đồng bộ giữa chừng. Khi đến mốc, mỗi người cập nhật issue của mình với bản docs hoặc PR, phần đã kiểm tra và việc đang chờ ai. Từ T2 30/11, **mọi F code song song**. Phần nào phụ thuộc F khác chưa xong thì dùng dữ liệu seed. Các mốc PA5 là **mốc tích hợp**: đến hạn thì các F liên quan phải nối được với nhau bằng dữ liệu thật trên staging.

```
              T4 25/11   T6 27/11   CN 29/11   T2 30/11   T5 3/12   T6 4/12   CN 6/12   T3 8/12
Học    Nền   [template, glossary, contracts][ Setup v0 ][F01 lõi][staging][ Setup v1 ][F08 ...]
Mọi    Docs  [ đọc yêu cầu, nháp tình huống ][ hoàn thiện ca PA4.2 ][ PA4.3 gộp ]
người  Code                                  [ code F của mình song song ──────────── ][ test ]
Mốc                                PA4.1 ┘         PA4.2 ┘  PA5.1 ┘   PA4.3 ┘   PA5.2 ┘   PA5.3 ┘
```

| Mốc | Hạn | Việc thực hiện | Đầu ra để đồng bộ |
| --- | --- | --- | --- |
| **PA4.1 · Dựng nền và chốt cách test** | **CN 29/11, 22:00** | Học làm nền Docs trước T6 27/11, rồi Setup v0. Song song, mỗi người đọc yêu cầu tính năng, nháp tình huống kiểm thử vào `docs/test/Fxx.md` và đối chiếu dữ liệu cần nhận với `contracts.md`. | Setup v0 đã merge. Mỗi F có bản nháp ca kiểm thử. Điểm nối còn chờ chốt được ghi vào issue. |
| **PA4.2 · Hoàn thiện bộ ca** | **T4 2/12, 22:00** | Các thành viên hoàn thiện thiết kế kiểm thử, danh sách ca, đặc tả chi tiết và liên kết `FR → TC` của tính năng mình. | Có 20 ca chi tiết theo bảng phân công và đủ ca để phủ 47 FR Must-have. Huy rà độ phủ, Minh rà cách test. |
| **PA4.3 · Chốt hồ sơ và bàn giao nền** | **T6 4/12, 22:00** | Học gộp Test Plan, ma trận, đóng góp và log AI sang docx. Học làm Setup v1. | Nộp hồ sơ PA4. Bản `main` qua kiểm tra clone sạch. |
| **PA5.1 · Tích hợp luồng sự kiện** | **T5 3/12, 22:00** | Nối F01–F04 trên staging. | Một luồng chạy được từ tài khoản đến sự kiện Published có loại vé. |
| **PA5.2 · Tích hợp luồng vé và tham dự** | **CN 6/12, 22:00** | Nối F05–F08 trên staging, thay dữ liệu seed bằng dữ liệu thật từ F trước. | Chạy được luồng giữ vé, xác nhận bằng SePay sandbox, nhận vé, quét QR, xem dashboard và xuất CSV. |
| **PA5.3 · Chạy test và chốt bản nộp** | **T3 8/12, 22:00** | Mỗi người chạy ca của tính năng mình, ghi kết quả, báo lỗi và sửa lỗi theo issue. Chạy lại luồng liên tính năng, kiểm tra SePay trên kênh được ủy quyền và quét QR bằng điện thoại thật. | Có kết quả test thực tế, danh sách lỗi và bằng chứng kiểm tra. Học gộp hồ sơ PA5 trước hạn cứng T4 9/12. |

### Thứ tự việc của từng người

Mỗi người làm trước phần mà người khác đang chờ.

| Thành viên | Thứ tự |
| --- | --- |
| **Học** | Nền Docs (27/11) → Setup v0 (29/11) → F01 lõi (T3 1/12) → gán checker và staging (trước T5 3/12) → Setup v1 (4/12) → F08 → phần còn lại của F01 (trước PA5.1). |
| **Huy** | F02 → F03. Cả hai phục vụ PA5.1. |
| **Kiệt** | F04 trước, vì F02 cần nó để công bố và F05 cần nó để bán vé → F05 → scanner F07. |
| **Minh** | F06 với đơn mẫu từ seed → test F07 trên điện thoại khi có staging. |

### Setup repo chung do Học thực hiện

**Nền Docs, trước T6 27/11.** Đây là thứ cả nhóm cần để viết ca PA4.
- [ ] Template `docs/test/Fxx.md`. Mã ca dạng `TC-Fxx-NN`, cột FR ghi `FR-Fxx-NN`. Ma trận truy vết tạo từ các file này.
- [ ] [`GLOSSARY.md`](../../GLOSSARY.md). Code dùng tên tiếng Anh trong đó, docs dùng tên tiếng Việt.
- [ ] Bản nháp `docs/design/contracts.md`, gồm trạng thái và các trường mỗi F đọc hoặc ghi ở từng điểm nối F01→F02→F03→F04→F05→F06→F07→F08. Kiệt duyệt. Sau PA5.1, mọi thay đổi phải qua PR có người phụ trách cả hai đầu duyệt.

**Setup v0, trước CN 29/11.** Đây là thứ cả nhóm cần để bắt đầu code từ T2 30/11.
- [ ] Khung `src/web` (Next.js) và `src/api` (NestJS). Business logic chỉ nằm ở NestJS, theo [ADR-001](../design/adr/001-modular-monolith.md) và [ADR-004](../design/adr/004-same-site-hosting-and-session-cookies.md).
- [ ] PostgreSQL chạy local bằng Docker Compose. Có `.env.example`, Prisma dùng `DATABASE_URL` và `DIRECT_URL`.
- [ ] Schema khung cho các thực thể trong `contracts.md` (khóa, quan hệ, enum trạng thái), kèm model nền `User`, `Organisation`, `RoleAssignment`, `AuditLog`.
- [ ] Seed một bộ dữ liệu cho mỗi trạng thái ở điểm nối, dùng mã cố định như `evt_published_paid` hay `tkt_issued_unchecked`, cùng tài khoản mẫu cho mỗi vai trò.
- [ ] Guard phân quyền với chữ ký cố định (`@Roles`, `@Scope` hoặc tương đương) và dev login bằng user seed. F01 thật chỉ thay phần bên trong.
- [ ] Hàm ghi `AuditLog` trong cùng transaction theo BR-11.
- [ ] CI chạy lint, typecheck và test, kèm một test mẫu cho web và API. CI chạy thêm `node scripts/test-cases.mjs` để kiểm tra các file `docs/test/Fxx.md`.
- [ ] README đổi payOS thành SePay và cập nhật hosting theo ADR-004.

**Staging E1, trước T5 3/12.** Web chạy trên Vercel, API trên Render, DB trên Supabase. Staging tự deploy khi merge vào `main` và đi theo ADR-004. Biến môi trường SePay sandbox giữ trên host, không đưa vào repo.

**Setup v1, trước T6 4/12.**
- [ ] README hướng dẫn chạy local và chạy test đầy đủ. Kiểm tra trên bản clone sạch rằng web, API, DB và test đều chạy được.
- [ ] Branch protection cho `main`, template PR và issue.
- [ ] Ghi trong README và Test Plan cách đánh thức staging trước buổi test NFR (xem ADR-004).

### Schema và migration

- Học giữ model nền và `AuditLog`. Cần sửa model nền thì báo Học.
- Mỗi F thêm trường và ràng buộc của mình trong PR riêng. Tên migration theo dạng `<timestamp>_fxx_<mô_tả>`. Trước khi merge, rebase lên `main` rồi chạy lại `prisma migrate dev`.

### Review và merge

- Học merge mọi PR vào `main`.
- PR của Học cần một người duyệt: Kiệt cho setup và `contracts.md`, Minh cho CI và template test, Huy cho `GLOSSARY.md`.
- Review trong **24 giờ**. Ngày sát hạn mốc thì trong **12 giờ**.
- PR chạm điểm nối cần thêm người phụ trách F ở đầu bên kia duyệt.
- Đến mỗi hạn mốc, Học kiểm đầu ra trong weekly report. Đầu ra nào trễ thì ghi vào mục Issues & Risks kèm người xử lý và hạn mới. Phần phụ thuộc tiếp tục bằng dữ liệu seed.

### Rủi ro đã biết

| Rủi ro | Cách xử lý | Người theo dõi |
| --- | --- | --- |
| Setup v0 trễ sau CN 29/11 làm code của cả nhóm trễ theo. | Học ưu tiên v0 hơn Docs F01/F08. Ai cần bắt đầu sớm thì dựng tạm trên nhánh riêng theo `contracts.md`. | Học |
| Kiệt nhận ba F (F04, F05, scanner F07). | Nếu F07 chậm, Huy xong F03 thì nhận phần trạng thái quét. | Học |
| Gói miễn phí của Render ngủ, Supabase tạm dừng, làm trễ NFR-01 và IPN. | Đánh thức trước buổi test. Nâng Render lên gói trả phí trong ngày nghiệm thu nếu cần. | Học |
| Đăng nhập lỗi trên iPhone Safari do cookie bên thứ ba. | Gọi API qua rewrite `/api/*` cùng domain theo ADR-004. | Học, Minh test |

## Cách đọc và bắt đầu

1. Mở issue được giao trên [board Team Management](https://github.com/orgs/UniEvent-T07/projects/1), rồi tìm mục F tương ứng bên dưới.
2. Đọc [PA2 – Yêu cầu hệ thống](../../pa/PA2/T07-PA2.pdf). Tìm mã `FR-Fxx` của mình ở §5.1, đọc luật nghiệp vụ (BR) ở §5.3, tiêu chí nghiệm thu (AC) ở §5.4 và luồng sử dụng (UC) ở §7.
3. Mở [PA3 – Thiết kế](../../pa/PA3/T07-PA3.pdf). Dùng §7 để tìm thiết kế liên quan đến mã yêu cầu. Đọc §4–5 khi cần hiểu luồng và dữ liệu, §6 khi làm màn hình. Mở file mẫu `PA4-TestPlan-TestCases.docx` để điền đúng các bảng.
4. Dùng tên gọi theo [GLOSSARY.md](../../GLOSSARY.md). Khi làm điểm nối giữa hai F, đọc `docs/design/contracts.md`.
5. Với **Docs**, viết ca vào `docs/test/Fxx.md` theo template. Ghi mã yêu cầu, mã ca kiểm thử `TC-Fxx-NN`, dữ liệu, bước làm và kết quả mong đợi. Chọn dữ liệu hợp lệ, không hợp lệ và sát giới hạn nếu có. Với **Code/Test**, ghi cách chạy và gắn link PR vào issue. Khi vướng một luật, ghi mã BR/AC và nhờ Huy đối chiếu. [Hướng dẫn dùng board](../guides/github-project.md)

## F01 · Tài khoản và phân quyền

**Phụ trách cả Docs và Code/Test · Học**

### Docs

- Lập bảng ai được làm gì theo vai trò và phạm vi tổ chức, đơn vị hoặc sự kiện. Gắn ca cho đủ `FR-F01-01` đến `FR-F01-12`.
- Ưu tiên **3 ca chi tiết** về xác minh email trường, biên tên hiển thị 150 ký tự và quyền sau khi tài khoản bị khóa hoặc bị thu hồi vai trò.

### Codebase

- Làm đăng ký, xác minh email, đăng nhập, đăng xuất và kiểm tra phiên đăng nhập. Kiểm tra quyền ở server trước khi xử lý thao tác.
- Làm quản lý tổ chức, cấp/thu hồi vai trò, phân công checker, khóa tài khoản và xem nhật ký thao tác. Nối danh sách sự kiện công khai với F02. Test thao tác sai phạm vi và phiên đã hết hạn.

## F02 · Tạo và gửi đề xuất sự kiện

**Phụ trách cả Docs và Code/Test · Huy**

### Docs

- Dựa vào BR-05–07, liệt kê trạng thái được sửa, gửi, gửi lại và công bố.
- Viết **2 ca chi tiết** về kiểm tra dữ liệu bản nháp, gồm poster ở biên 5 MiB, và gửi lại sau yêu cầu chỉnh sửa mà vẫn giữ lịch sử cũ. Thêm ca công bố khi vé đã cấu hình hợp lệ.

### Codebase

- Làm form và API tạo/sửa bản nháp, gửi/gửi lại, xem trạng thái và lịch sử. Kiểm tra trường bắt buộc và quy tắc poster.
- Ghi số vòng và nhật ký khi gửi. Chỉ công bố sau khi F03 đã duyệt và F04 có cấu hình vé hợp lệ.

## F03 · Duyệt đề xuất sự kiện

**Phụ trách cả Docs và Code/Test · Huy**

### Docs

- Từ BR-02–06, lập bảng quyết định theo đơn vị của người duyệt, trạng thái đề xuất, vai trò tại CLB và lý do.
- Viết **2 ca chi tiết** về quyết định hợp lệ và từ chối quyết định sai phạm vi hoặc tự duyệt. Thêm ca hai người duyệt cùng một vòng để kiểm tra chỉ lưu một quyết định.

### Codebase

- Làm hàng đợi theo đơn vị, màn hình chi tiết, nút duyệt/từ chối/yêu cầu chỉnh sửa và tìm lịch sử theo tên sự kiện.
- Kiểm tra quyền và lý do ở server. Lưu một quyết định mỗi vòng cùng nhật ký thao tác.

## F04 · Cấu hình loại vé

**Phụ trách cả Docs và Code/Test · Kiệt**

### Docs

- Dùng BR-12 để viết **2 ca chi tiết** về tổng số vé bằng/vượt sức chứa và thêm/sửa vé ngay trước hoặc đúng thời điểm mở bán sớm nhất.

### Codebase

- Làm form và API thêm/sửa loại vé. Kiểm tra giá VND, số lượng, giới hạn mỗi tài khoản, thời gian bán và sức chứa.
- Khóa chỉnh sửa khi đến mốc mở bán sớm nhất. Hiển thị loại vé và số vé còn trên trang sự kiện công khai.

## F05 · Giữ vé và mở thanh toán

**Phụ trách cả Docs và Code/Test · Kiệt**

### Docs

- Viết **3 ca chi tiết** về tranh suất cuối hoặc chạm giới hạn tài khoản, biên 15 phút giữ vé và thử lại đơn miễn phí vẫn chỉ có một vé. Thêm ca người dùng quay về từ SePay khi hệ thống chưa xác nhận thanh toán.
- Theo BR-20 hiện hành, giao dịch xác nhận phải hoàn tất trước mốc hết hạn giữ vé. Hỏi Huy nếu có cập nhật yêu cầu đã được duyệt. [ADR về thanh toán](../design/adr/003-sepay-payment-fulfilment.md)

### Codebase

- Làm luồng đặt một vé mỗi đơn, giữ và nhả suất, mở thanh toán VietQR qua SePay bằng mã đơn và số tiền đã lưu. Hiển thị hạn giữ và trạng thái đơn.
- Phối hợp với Minh ở F06 để phát vé miễn phí cùng lúc với ghi nhận đơn và xử lý lúc hết hạn trùng với xác nhận thanh toán.

## F06 · Xác nhận thanh toán và phát hành vé

**Code/Test và tổng hợp · Minh. Docs · Minh viết phần thanh toán/phát vé, Huy viết phần ngoại lệ.**

### Docs

- Minh viết **3 ca chi tiết** về thông báo SePay gửi lặp, thông báo sai hoặc đến trễ, và thử lại khi phát vé lỗi. Lập bảng điều kiện theo BR-17 và BR-20.
- Huy viết **1 ca chi tiết** về Admin xử lý ngoại lệ có chứng từ và nhật ký theo BR-19. Minh rà cách kiểm thử và gộp bộ ca F06.

### Codebase

- Xác thực thông báo SePay, đối chiếu đơn và số tiền, lưu giao dịch và phát một vé QR đã ký mỗi đơn đủ điều kiện. Hiển thị vé của người dùng, gửi email và hỗ trợ gửi lại.
- Làm màn hình Admin xem và xử lý ngoại lệ, thử phát vé lại hoặc ghi nhận khoản hoàn đã thực hiện bên ngoài hệ thống. Dùng dữ liệu mô phỏng SePay để kiểm thử các ca lặp và đến trễ.

## F07 · Check-in và check-out bằng QR

**Docs và test điện thoại · Minh. Code scanner và trạng thái quét · Kiệt.**

### Docs

- Minh viết **2 ca chi tiết** về check-in rồi check-out đúng thứ tự, và từ chối quét lặp hoặc quét sai sự kiện theo BR-21. Chuẩn bị thêm ca quét đồng thời và kịch bản đo tốc độ trên điện thoại thật theo NFR-01.

### Codebase

- Kiệt làm màn hình quét trên điện thoại. Kiểm tra checker được phân công, chữ ký QR và vé thuộc đúng sự kiện. Mỗi vé được check-in và check-out một lần theo đúng thứ tự.
- Minh kiểm tra camera và luồng quét trên Android Chrome và iPhone Safari khi có build. Học nhận dữ liệu check-in cho F08.

## F08 · Dashboard và xuất CSV

**Phụ trách cả Docs và Code/Test · Học**

### Docs

- Viết **2 ca chi tiết** về cập nhật số vé, doanh thu và tỷ lệ check-in theo BR-22, và xuất CSV đủ dòng, đúng quyền, có nhật ký. Bổ sung ca mất kết nối rồi bấm thử lại.

### Codebase

- Làm dashboard cập nhật dữ liệu từ F06/F07. Hiển thị trạng thái đang tải, chưa có dữ liệu, mất kết nối và nút thử lại. Kiểm tra mốc cập nhật 5 giây theo NFR-05.
- Làm xuất CSV theo đúng sự kiện, kiểm tra quyền ở server và ghi nhật ký trước khi cho tải file.

## Tổng hợp hồ sơ

- **Mỗi thành viên** gửi ca, liên kết `FR → TC`, dữ liệu và bằng chứng theo tính năng của mình. Ghi phần dùng AI và cách đã kiểm chứng kết quả.
- **Học** gộp Test Plan, ma trận và bản nộp theo template. Test Plan có phạm vi, cách kiểm thử, môi trường, lịch, tiêu chí bắt đầu/kết thúc, rủi ro và cách báo lỗi. Minh rà cách test, Huy rà độ phủ **47 FR**. Học cập nhật mục lục và bảng đóng góp đủ **100%** kèm link bằng chứng.
