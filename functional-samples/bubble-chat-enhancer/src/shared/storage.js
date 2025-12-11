/**
 * Storage utilities for managing extension settings and pinned chats
 */

const STORAGE_KEYS = {
  SETTINGS: 'bubble_settings',
  PINNED_CHATS: 'pinned_chats'
};

const DEFAULT_SETTINGS = {
  enabled: true,
  position: 'bottom-right',
  size: 'medium',
  theme: 'light'
};

/**
 * Get settings from storage
 * @returns {Promise<Object>} Settings object
 */
export async function getSettings() {
  try {
    const result = await chrome.storage.sync.get(STORAGE_KEYS.SETTINGS);
    return result[STORAGE_KEYS.SETTINGS] || DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error getting settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save settings to storage
 * @param {Object} settings - Settings to save
 * @returns {Promise<void>}
 */
export async function saveSettings(settings) {
  try {
    await chrome.storage.sync.set({
      [STORAGE_KEYS.SETTINGS]: { ...DEFAULT_SETTINGS, ...settings }
    });
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

/**
 * Get pinned chats from storage
 * @returns {Promise<Array>} Array of pinned chat objects
 */
export async function getPinnedChats() {
  try {
    const result = await chrome.storage.sync.get(STORAGE_KEYS.PINNED_CHATS);
    return result[STORAGE_KEYS.PINNED_CHATS] || [];
  } catch (error) {
    console.error('Error getting pinned chats:', error);
    return [];
  }
}

/**
 * Save pinned chats to storage
 * @param {Array} pinnedChats - Array of pinned chat objects
 * @returns {Promise<void>}
 */
export async function savePinnedChats(pinnedChats) {
  try {
    await chrome.storage.sync.set({
      [STORAGE_KEYS.PINNED_CHATS]: pinnedChats.slice(0, 3) // Max 3 pinned chats
    });
  } catch (error) {
    console.error('Error saving pinned chats:', error);
  }
}

/**
 * Pin a chat
 * @param {Object} chat - Chat object to pin
 * @returns {Promise<boolean>} Success status
 */
export async function pinChat(chat) {
  try {
    const pinned = await getPinnedChats();
    if (pinned.length >= 3) {
      console.warn('Maximum 3 chats can be pinned');
      return false;
    }
    if (pinned.some((c) => c.threadId === chat.threadId)) {
      return true; // Already pinned
    }
    pinned.push(chat);
    await savePinnedChats(pinned);
    return true;
  } catch (error) {
    console.error('Error pinning chat:', error);
    return false;
  }
}

/**
 * Unpin a chat
 * @param {string} threadId - Thread ID to unpin
 * @returns {Promise<void>}
 */
export async function unpinChat(threadId) {
  try {
    const pinned = await getPinnedChats();
    const filtered = pinned.filter((c) => c.threadId !== threadId);
    await savePinnedChats(filtered);
  } catch (error) {
    console.error('Error unpinning chat:', error);
  }
}
