# Installation and Testing Guide

## Prerequisites

- Google Chrome or any Chromium-based browser (Edge, Brave, Opera, etc.)
- Access to Messenger.com

## Installation Steps

### 1. Load the Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** by toggling the switch in the top-right corner
3. Click **Load unpacked**
4. Navigate to and select the `bubble-chat-enhancer` directory
5. The extension should now appear in your extensions list

### 2. Verify Installation

After loading:

- You should see "Bubble Chat Enhancer for Messenger" in your extensions list
- The extension icon should appear in your Chrome toolbar
- Status should show as "Enabled"

### 3. Navigate to Messenger

1. Go to [https://www.messenger.com](https://www.messenger.com)
2. Log in with your Facebook account if not already logged in
3. Open any conversation

### 4. See the Bubble in Action

Once on Messenger:

- A floating bubble should appear in the bottom-right corner (or your configured position)
- The bubble will show the conversation avatar, name, and last message
- Click the bubble to open the mini chat popup

## Testing Checklist

### Basic Functionality

- [ ] Bubble appears on Messenger page load
- [ ] Bubble shows correct conversation info (avatar, name, last message)
- [ ] Clicking bubble opens popup
- [ ] Popup displays recent messages
- [ ] Can type and send messages via popup
- [ ] Popup can be dragged to different positions
- [ ] Close button closes popup
- [ ] Bubble updates when new messages arrive

### Settings Panel

- [ ] Click extension icon to open settings
- [ ] Toggle "Enable Extension" on/off works
- [ ] Can switch between "Bottom Left" and "Bottom Right" positions
- [ ] Light/Dark theme switching works
- [ ] Settings persist after page reload

### Pin Feature

- [ ] Can pin a conversation using the 📌 button in popup
- [ ] Pinned conversation appears in settings panel
- [ ] Can unpin conversations from settings
- [ ] Cannot pin more than 3 conversations
- [ ] Pinned conversations persist across browser sessions

### Badge/Notification

- [ ] Unread badge appears when new messages arrive (while popup closed)
- [ ] Badge count increments with each new message
- [ ] Badge resets to 0 when popup is opened
- [ ] Badge has pulse animation

### UI/UX

- [ ] Bubble has smooth hover animation
- [ ] Popup has fade-in animation when opening
- [ ] Messages scroll smoothly
- [ ] Input field works correctly
- [ ] Send button sends message
- [ ] Enter key sends message
- [ ] Dark mode applies correctly
- [ ] Light mode applies correctly
- [ ] Bubble doesn't overlap Messenger's input area

### Performance

- [ ] No noticeable lag when typing in Messenger
- [ ] Page loads at normal speed
- [ ] Bubble updates quickly when messages change
- [ ] No console errors in DevTools

### Cross-Tab Behavior

- [ ] Settings sync across multiple Messenger tabs
- [ ] Pinned chats available in all tabs
- [ ] Theme changes apply to all tabs

## Troubleshooting

### Bubble not appearing

1. Refresh the Messenger page (F5 or Ctrl+R)
2. Check that extension is enabled in chrome://extensions/
3. Check that you're on messenger.com or facebook.com/messages
4. Open browser console (F12) and check for errors

### Messages not sending

1. Verify you can send messages directly in Messenger
2. Check that you're logged into Messenger
3. Try clicking in Messenger's input field first to ensure it's active
4. Check browser console for JavaScript errors

### Settings not saving

1. Ensure you're not in incognito mode (unless extension is enabled for incognito)
2. Check Chrome's storage permissions
3. Try disabling and re-enabling the extension

### Bubble shows wrong information

1. Refresh the page
2. Navigate to a different conversation and back
3. Check that Messenger has fully loaded

### Performance issues

1. Disable other extensions temporarily to test
2. Check Chrome Task Manager (Shift+Esc) for memory usage
3. Try on a different conversation with fewer messages

## Development Testing

### Testing with Browser Console

Open DevTools (F12) and run these commands:

```javascript
// Check if extension loaded
console.log(document.getElementById('bubble-chat-enhancer'));

// Check storage
chrome.storage.sync.get(['bubble_settings', 'pinned_chats'], (data) => {
  console.log('Settings:', data.bubble_settings);
  console.log('Pinned:', data.pinned_chats);
});

// Clear storage (for testing)
chrome.storage.sync.clear(() => console.log('Storage cleared'));
```

### Manual DOM Inspection

1. Right-click the bubble → Inspect Element
2. Verify CSS classes are applied correctly
3. Check that styles from `bubble.css` are loaded
4. Verify z-index is high enough (999999)

### Network Tab Testing

1. Open Network tab in DevTools
2. Filter by "Fetch/XHR"
3. Verify no unexpected network requests
4. Extension should make NO external requests

## Known Limitations

1. **DOM Changes**: If Messenger updates their DOM structure, selectors may need updating
2. **Message Detection**: Complex message types (videos, reactions) may not display perfectly
3. **Multiple Accounts**: Extension uses single set of settings for all accounts
4. **Incognito Mode**: Must explicitly enable extension for incognito in chrome://extensions/

## Reporting Issues

If you encounter issues:

1. Note the steps to reproduce
2. Capture screenshots if possible
3. Check browser console for errors
4. Note your Chrome version (chrome://version/)
5. Note Messenger UI version (classic vs new)

## Success Criteria

Extension is working correctly if:

- ✅ Bubble appears on every Messenger page
- ✅ All features listed in README.md work
- ✅ No JavaScript errors in console
- ✅ No performance degradation
- ✅ Settings persist across sessions
- ✅ Works with both light and dark themes

## Next Steps

After successful testing:

1. Try different Messenger layouts (mobile view, different screen sizes)
2. Test with multiple conversations
3. Test with high-frequency messaging
4. Test theme switching during active chat
5. Test with pinned and unpinned conversations
