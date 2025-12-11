# Bubble Chat Enhancer for Messenger

A modern Chrome extension that adds a floating bubble chat overlay to Messenger Web, providing quick access to messages, pinned conversations, and instant replies.

## Features

- **🎈 Floating Bubble Chat**: Always-visible bubble showing your latest conversation
- **💬 Mini Chat Popup**: Quick view and reply to messages without leaving your current page
- **📌 Pin Conversations**: Pin up to 3 important conversations for instant access
- **🎨 Modern UI**: Clean, responsive design with light and dark themes
- **⚡ Real-time Updates**: Automatically detects new messages and updates the bubble
- **🔔 Unread Badge**: Visual notification for new messages
- **🎯 Draggable Popup**: Move the chat popup anywhere on your screen
- **⚙️ Customizable**: Choose bubble position, theme, and more

## Installation

### From Source

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the `bubble-chat-enhancer` directory
6. Navigate to [Messenger.com](https://messenger.com) and start chatting!

## Usage

### Basic Usage

1. Open [Messenger.com](https://messenger.com) in your browser
2. The bubble will automatically appear in the bottom-right corner (or your chosen position)
3. Click the bubble to open the mini chat popup
4. Type and send messages directly from the popup

### Pinning Conversations

1. Open a conversation on Messenger
2. Click the bubble to open the popup
3. Click the 📌 pin icon in the popup header
4. The conversation is now pinned (max 3 conversations)

### Settings

1. Click the extension icon in your Chrome toolbar
2. Adjust settings:
   - Enable/disable the extension
   - Change bubble position (bottom-left or bottom-right)
   - Switch between light and dark themes
   - View and manage pinned chats

## Architecture

The extension follows a clean, modular architecture:

```
bubble-chat-enhancer/
├── manifest.json           # Extension configuration
├── src/
│   ├── background/        # Background service worker
│   │   └── service-worker.js
│   ├── content/           # Content scripts (injected into Messenger)
│   │   └── messenger.js
│   ├── ui/                # User interface components
│   │   ├── bubble.js
│   │   ├── popup.html
│   │   └── popup.js
│   ├── shared/            # Shared utilities
│   │   ├── storage.js
│   │   └── dom-parser.js
│   └── styles/            # CSS stylesheets
│       └── bubble.css
└── images/                # Extension icons
```

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `storage`, `activeTab`
- **Host Permissions**: `messenger.com`, `facebook.com/messages`
- **Browser Support**: Chrome, Edge, and other Chromium-based browsers

### Key Components

#### Content Script (`messenger.js`)

- Injects the bubble UI into Messenger pages
- Uses MutationObserver to detect new messages
- Handles message sending via DOM manipulation

#### Background Service Worker

- Manages extension settings
- Synchronizes data across tabs
- Handles installation and updates

#### Storage

- Uses `chrome.storage.sync` for settings and pinned chats
- Automatic sync across devices
- Max 3 pinned conversations

#### UI Components

- **Bubble**: Floating overlay with avatar, name, and last message
- **Popup**: Mini chat interface with messages, input, and controls
- **Settings Panel**: Configuration interface in extension popup

## Privacy & Security

- **No Data Collection**: This extension does not collect or transmit any user data
- **Local Storage Only**: All data is stored locally in your browser using Chrome's sync storage
- **No External Servers**: No backend servers or external APIs
- **Open Source**: All code is visible and auditable

## Performance

- **Memory Usage**: < 50MB RAM
- **CPU Usage**: Minimal, with debounced DOM observation
- **No Lag**: Optimized MutationObserver to prevent Messenger slowdown

## Browser Compatibility

- ✅ Chrome 88+
- ✅ Microsoft Edge 88+
- ✅ Brave
- ✅ Opera
- ✅ Any Chromium-based browser with Manifest V3 support

## Known Limitations

- Only works on Messenger Web (`messenger.com` and `facebook.com/messages`)
- Depends on Messenger's DOM structure (may need updates if Facebook changes their HTML)
- Cannot access encrypted messages
- Requires active Messenger session

## Troubleshooting

### Bubble not appearing

1. Refresh the Messenger page
2. Check that the extension is enabled in settings
3. Make sure you're on `messenger.com` or `facebook.com/messages`

### Messages not sending

1. Ensure you're logged into Messenger
2. Check that the message input field is visible on the page
3. Try typing a message directly in Messenger to verify it works

### Settings not saving

1. Check Chrome's storage permissions
2. Ensure you're not in incognito mode (unless extension is enabled for incognito)

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

Apache 2.0 - See LICENSE file for details

## Changelog

### Version 1.0.0 (2025-12-11)

- Initial release
- Floating bubble chat overlay
- Mini chat popup with message history
- Pin up to 3 conversations
- Light and dark themes
- Customizable bubble position
- Real-time message detection
- Unread message badge

## Credits

Developed as part of the Chrome Extensions Samples project.

## Support

For issues or questions, please visit the [GitHub Issues](https://github.com/trisjr/bubble-chat-extension/issues) page.
