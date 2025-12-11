# 🗂️ Task Breakdown – Bubble Chat Enhancer for Messenger (Chrome Extension)

⸻

## Epic 1 — Project Setup & Architecture

Feature 1.1 — Base Project Setup
• Task 1.1.1: Khởi tạo dự án (Vite + TypeScript + Manifest v3)
• Task 1.1.2: Tạo cấu trúc thư mục chuẩn

src/
content/
background/
ui/
styles/
shared/

    •	Task 1.1.3: Tạo và cấu hình manifest.json
    •	Task 1.1.4: Cấu hình Vite build cho Chrome Extension
    •	Task 1.1.5: Setup ESLint + Prettier

⸻

## Epic 2 — Content Script Integration

Feature 2.1 — Inject UI Bubble
• Task 2.1.1: Tạo file content script messenger.ts
• Task 2.1.2: Inject container UI vào Messenger DOM
• Task 2.1.3: Load CSS styles từ extension
• Task 2.1.4: Render Bubble component vào container

Feature 2.2 — Read Messenger Thread
• Task 2.2.1: Lấy Thread ID từ URL
• Task 2.2.2: Xác định các selector DOM chính (chat list, message rows)
• Task 2.2.3: Xây dựng helper parser DOM để extract message
• Task 2.2.4: Xử lý trường hợp Messenger thay đổi cấu trúc DOM

Feature 2.3 — MutationObserver
• Task 2.3.1: Setup MutationObserver trên root DOM
• Task 2.3.2: Phát hiện tin nhắn mới
• Task 2.3.3: Debounce cập nhật để tránh lag
• Task 2.3.4: Trigger update Bubble UI khi có thay đổi

⸻

## Epic 3 — UI Bubble Component

Feature 3.1 — Bubble UI
• Task 3.1.1: Thiết kế UI bubble (HTML + CSS)
• Task 3.1.2: Hiển thị avatar + tên người gửi
• Task 3.1.3: Hiển thị tin nhắn mới nhất
• Task 3.1.4: Animation mở/đóng bubble
• Task 3.1.5: Hỗ trợ drag bubble (optional)

Feature 3.2 — Badge Notification
• Task 3.2.1: Tạo badge số tin nhắn chưa đọc
• Task 3.2.2: Reset badge khi mở popup
• Task 3.2.3: Badge animation (pulse)

⸻

## Epic 4 — Mini Chat Popup

Feature 4.1 — Popup UI
• Task 4.1.1: Layout popup (header, content, input)
• Task 4.1.2: Hiển thị danh sách tin nhắn (10–20 dòng)
• Task 4.1.3: Scroll view + auto-scroll bottom
• Task 4.1.4: Dark/Light mode (optional)

Feature 4.2 — Send Message Integration
• Task 4.2.1: Đồng bộ input UI với input thật trên Messenger
• Task 4.2.2: Trigger event Enter để gửi tin
• Task 4.2.3: Validate trước khi gửi
• Task 4.2.4: Loading state khi gửi

Feature 4.3 — Popup Behavior
• Task 4.3.1: Mở/đóng popup bằng bubble
• Task 4.3.2: Cho phép di chuyển popup
• Task 4.3.3: Lưu vị trí popup (optional)

⸻

## Epic 5 — Pin Chat Feature

Feature 5.1 — Pin/Unpin Thread
• Task 5.1.1: Tạo menu pin trong bubble hoặc popup
• Task 5.1.2: Lưu pinned thread vào chrome.storage.sync
• Task 5.1.3: Hiển thị pinned trên bubble
• Task 5.1.4: Giới hạn tối đa 3 pinned chat

Feature 5.2 — Switch Between Pinned & Current Thread
• Task 5.2.1: Chế độ “Pinned Mode”
• Task 5.2.2: Toggle pinned/current display
• Task 5.2.3: UI indicator khi pin đang hoạt động

⸻

## Epic 6 — Extension Popup (Settings Panel)

Feature 6.1 — Settings Page
• Task 6.1.1: Tạo popup.html
• Task 6.1.2: Form settings (bubble size, position, theme)
• Task 6.1.3: Lưu settings vào chrome.storage.sync
• Task 6.1.4: Đồng bộ settings ra content script

⸻

## Epic 7 — Storage & Background Logic

Feature 7.1 — Background Script
• Task 7.1.1: Setup background service worker
• Task 7.1.2: Lắng nghe message từ content script
• Task 7.1.3: Đồng bộ pinned + settings

Feature 7.2 — Storage Utilities
• Task 7.2.1: Tạo wrapper utilities cho chrome.storage
• Task 7.2.2: Auto migrate settings version
• Task 7.2.3: Cache tạm ở runtime

⸻

## Epic 8 — Performance & Stability

Feature 8.1 — Optimization
• Task 8.1.1: Giảm số lần DOM query
• Task 8.1.2: Giảm số lần re-render UI
• Task 8.1.3: Debounce MutationObserver
• Task 8.1.4: Lazy load popup

Feature 8.2 — Robust Selector
• Task 8.2.1: Viết selector fallback (ARIA, role, text match)
• Task 8.2.2: Dò fallback khi DOM Messenger thay đổi
• Task 8.2.3: Test mỗi layout của Messenger (classic & new UI)

⸻

## Epic 9 — QA & Testing

Feature 9.1 — Manual Test Cases
• Task 9.1.1: Test inject UI
• Task 9.1.2: Test đọc tin nhắn
• Task 9.1.3: Test gửi tin nhắn
• Task 9.1.4: Test pinned chats
• Task 9.1.5: Test badge unread
• Task 9.1.6: Test Settings
• Task 9.1.7: Test tốc độ khi chat nhanh

Feature 9.2 — Cross-browser Testing
• Task 9.2.1: Chrome stable
• Task 9.2.2: Chrome beta
• Task 9.2.3: Arc Browser (Chromium)

⸻

## Epic 10 — Deployment

Feature 10.1 — Packaging
• Task 10.1.1: Build final extension package .zip
• Task 10.1.2: Validate manifest với Chrome developer tool

Feature 10.2 — Store Publishing

(Optional)
• Task 10.2.1: Tạo ảnh screenshot
• Task 10.2.2: Chuẩn bị mô tả extension
• Task 10.2.3: Publish lên Chrome Web Store

⸻
