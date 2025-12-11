/**
 * Background service worker
 */

// Initialize default settings on install
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Bubble Chat Enhancer: Extension installed');

  // Set default settings if not already set
  const settings = await chrome.storage.sync.get('bubble_settings');
  if (!settings.bubble_settings) {
    await chrome.storage.sync.set({
      bubble_settings: {
        enabled: true,
        position: 'bottom-right',
        size: 'medium',
        theme: 'light'
      }
    });
  }

  // Initialize pinned chats if not set
  const pinned = await chrome.storage.sync.get('pinned_chats');
  if (!pinned.pinned_chats) {
    await chrome.storage.sync.set({
      pinned_chats: []
    });
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get('bubble_settings').then((result) => {
      sendResponse(result.bubble_settings);
    });
    return true;
  }

  if (request.action === 'saveSettings') {
    chrome.storage.sync.set({ bubble_settings: request.settings }).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (request.action === 'getPinnedChats') {
    chrome.storage.sync.get('pinned_chats').then((result) => {
      sendResponse(result.pinned_chats || []);
    });
    return true;
  }

  if (request.action === 'savePinnedChats') {
    chrome.storage.sync.set({ pinned_chats: request.pinnedChats }).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Handle storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.bubble_settings) {
      console.log('Settings updated:', changes.bubble_settings.newValue);
      // Notify content scripts about settings change
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (
            tab.url &&
            (tab.url.includes('messenger.com') ||
              tab.url.includes('facebook.com/messages'))
          ) {
            chrome.tabs.sendMessage(tab.id, {
              action: 'settingsUpdated',
              settings: changes.bubble_settings.newValue
            });
          }
        });
      });
    }
  }
});
