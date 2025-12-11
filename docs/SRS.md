# 📄 Software Requirements Specification (SRS)

Project: Bubble Chat Enhancer for Messenger (Chrome Extension)

Version: 1.0
Date: 2025-12-11

⸻

1. Introduction

1.1 Purpose

Tài liệu này mô tả đầy đủ yêu cầu chức năng (Functional Requirements) và phi chức năng (Non-functional Requirements) cho Chrome Extension “Bubble Chat Enhancer for Messenger”.
Extension cung cấp giao diện bong bóng chat (bubble) nổi, giúp người dùng xem nhanh tin nhắn, ghim cuộc trò chuyện và gửi phản hồi nhanh ngay trên Messenger Web.

1.2 Scope

Extension sẽ:
• Tạo bong bóng chat nổi trên Messenger Web.
• Hiển thị tin nhắn mới nhất từ cuộc trò chuyện đang mở hoặc được ghim.
• Cung cấp popup mini để xem và gửi tin nhắn.
• Hoạt động hoàn toàn trên client (không backend).
• Tích hợp với Messenger DOM bằng content script.

Extension không:
• Truy cập hoặc lưu trữ dữ liệu người dùng ngoài browser storage.
• Tương tác với API private của Facebook ngoài phạm vi DOM.

1.3 Definitions
• Bubble Chat: Bong bóng UI nổi, hiển thị thông tin chat.
• Thread: Cuộc trò chuyện trong Messenger. Viết tắt: Thread ID = ID cuộc trò chuyện.
• Popup Chat: Giao diện mở rộng khi click vào bubble.

⸻

2. Overall Description

2.1 Product Perspective

Extension hoạt động bằng cách:
• Inject content script vào các trang Messenger.
• Quan sát thay đổi DOM để phát hiện tin nhắn mới.
• Render UI bubble như một overlay trên trang web.
• Sử dụng chrome.storage.sync để lưu ghim hoặc thiết lập người dùng.

2.2 User Classes
• Standard User: bất kỳ ai dùng Messenger.
• Power User: sử dụng pinned chat và quick-reply.

2.3 Constraints
• Manifest v3
• Facebook DOM thay đổi thường xuyên → cần selector robust
• Không dùng inline script (CSP)
• Không dùng backend

2.4 Assumptions
• Người dùng đang mở Messenger Web (messenger.com hoặc facebook.com/messages).
• DOM Messenger luôn chứa danh sách chat dạng scroll.
• URL của thread có cấu trúc ổn định /t/<id>.

⸻

3. System Features (Functional Requirements)

3.1 Bubble Chat Overlay

Description

Luôn hiển thị bong bóng nhỏ ở góc màn hình khi người dùng vào Messenger.

Functional Requirements

FR-1: Extension phải tạo một container UI (overlay div) có vị trí cố định.
FR-2: Bubble phải hiển thị:
• Avatar cuộc trò chuyện hiện tại
• Tên người gửi
• Tin nhắn mới nhất
FR-3: Bubble có thể thu nhỏ/phóng to.

⸻

3.2 Auto Detection (Detect Conversation & Messages)

Description

Extension phải tự động nhận biết tin nhắn mới và thread đang mở.

Requirements

FR-4: Extension phải đọc Thread ID từ URL.
FR-5: Phải detect danh sách tin nhắn trong DOM bằng MutationObserver.
FR-6: Khi có tin nhắn mới, bubble phải cập nhật ngay lập tức.
FR-7: Hỗ trợ cuộn để lấy tối thiểu 10 tin nhắn gần nhất.

⸻

3.3 Mini Chat Popup

Description

Khi click bubble → mở popup hiển thị cuộc trò chuyện dạng thu gọn.

Requirements

FR-8: Popup hiển thị tối thiểu 10 tin nhắn gần nhất.
FR-9: Hiển thị timestamp, avatar, hướng nhắn (bên trái/phải).
FR-10: Popup phải có input để soạn tin nhắn.
FR-11: Extension phải có khả năng gửi tin bằng cách:
• Gõ vào input thật của Messenger
• Trigger event “send message” (Enter)
FR-12: Popup có thể kéo, đóng, thu nhỏ.

⸻

3.4 Pinned Chat (Ghim cuộc trò chuyện)

Description

Cho phép người dùng chọn một hoặc nhiều cuộc trò chuyện để hiển thị nhanh.

Requirements

FR-13: Người dùng có thể pin/unpin một thread.
FR-14: Danh sách pinned lưu trong chrome.storage.sync.
FR-15: Bubble có chế độ “Pinned Mode” → hiển thị thông tin từ pinned chat thay vì chat đang mở.
FR-16: Chỉ tối đa 3 pinned chat để tránh rối UI.

⸻

3.5 Notification Bubble (Badge)

Description

Hiển thị số tin nhắn chưa đọc dạng badge nhỏ trên bubble.

Requirements

FR-17: Badge hiển thị số lượng tin mới khi user không xem popup.
FR-18: Badge reset về 0 khi người dùng mở popup.

⸻

3.6 Settings Panel

Description

Người dùng tùy chỉnh hành vi extension.

Requirements

FR-19: Có trang settings trong extension popup.
FR-20: Settings bao gồm:
• Bật/tắt bubble
• Vị trí bubble (bottom-left / bottom-right)
• Kích thước bubble
• Dark mode
FR-21: Lưu toàn bộ settings trong chrome.storage.sync.

⸻

4. Non-functional Requirements (NFR)

4.1 Performance

NFR-1: UI render ≤ 16ms per frame.
NFR-2: MutationObserver không làm lag Messenger.
NFR-3: Không chiếm quá 50MB RAM.

4.2 Usability

NFR-4: Bubble không được che thanh nhập tin nhắn của Messenger.
NFR-5: Popup phải có UI responsive.

4.3 Reliability

NFR-6: Extension vẫn hoạt động khi Messenger update DOM (selector fallback).
NFR-7: Không crash khi người dùng chuyển giữa nhiều thread.

4.4 Maintainability

NFR-8: Code phải tách thành modules:
• content
• ui
• background
• shared utils

⸻

5. External Interface Requirements

5.1 User Interface
• Bubble nhỏ 50–70px
• Tooltip hiển thị preview
• Popup chat rộng khoảng 300–360px
• Animation mượt khi mở/đóng

5.2 Hardware Interface

Không yêu cầu đặc biệt.

5.3 Software Interface
• Chrome Extension API (Manifest V3)
• Messenger Web DOM

⸻

6. System Architecture

6.1 Components
• Content Script:
• Inject UI bubble
• Observe tin nhắn
• Render bubble
• UI Layer:
• React/Vanilla component
• Background Service:
• Quản lý settings
• Lưu pinned
• Storage:
• chrome.storage.sync

6.2 Flow

(1) User mở Messenger →
(2) Content script inject UI →
(3) MutationObserver đọc tin nhắn →
(4) Update bubble →
(5) User click bubble → mở popup →
(6) Popup gửi tin → simulate input → Messenger gửi tin.

⸻
