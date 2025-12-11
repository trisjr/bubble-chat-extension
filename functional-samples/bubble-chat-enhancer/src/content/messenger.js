/**
 * Content script for Messenger integration
 */

// Import utilities (inline for content script)
// Note: In production, these would be bundled together

// Configuration constants
const DEBOUNCE_DELAY_MS = 500; // Delay for debouncing message updates
const MESSAGE_SEND_DELAY_MS = 100; // Delay before triggering send action

let bubbleUI = null;
let messageObserver = null;
let settings = {};

/**
 * Initialize the extension
 */
async function init() {
  console.log('Bubble Chat Enhancer: Initializing...');

  // Load settings
  settings = await loadSettings();

  if (!settings.enabled) {
    console.log('Bubble Chat Enhancer: Disabled in settings');
    return;
  }

  // Wait for page to be ready
  await waitForMessengerLoad();

  // Create bubble UI
  initializeBubbleUI();

  // Setup observers
  setupMessageObserver();

  // Update bubble with initial data
  updateBubbleData();

  console.log('Bubble Chat Enhancer: Initialized successfully');
}

/**
 * Load settings from storage
 */
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get('bubble_settings');
    return (
      result.bubble_settings || {
        enabled: true,
        position: 'bottom-right',
        size: 'medium',
        theme: 'light'
      }
    );
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      enabled: true,
      position: 'bottom-right',
      size: 'medium',
      theme: 'light'
    };
  }
}

/**
 * Wait for Messenger to load
 */
function waitForMessengerLoad() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      setTimeout(resolve, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(resolve, 1000);
      });
    }
  });
}

/**
 * Initialize bubble UI
 */
function initializeBubbleUI() {
  // Create bubble using inline implementation
  createBubble();
}

/**
 * Create bubble element (inline implementation)
 */
function createBubble() {
  // Create container
  const container = document.createElement('div');
  container.id = 'bubble-chat-enhancer';
  container.className = `bubble-container ${settings.position} ${settings.theme}`;

  // Create bubble
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = `
    <div class="bubble-avatar">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230084ff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="Avatar" class="avatar-image">
    </div>
    <div class="bubble-content">
      <div class="bubble-name">Messenger</div>
      <div class="bubble-message">Click to open chat</div>
    </div>
    <div class="bubble-badge" style="display: none;">0</div>
  `;

  container.appendChild(bubble);
  document.body.appendChild(container);

  // Attach click listener
  bubble.addEventListener('click', () => togglePopup(container));

  bubbleUI = {
    container,
    bubble,
    popup: null,
    isExpanded: false,
    unreadCount: 0
  };
}

/**
 * Toggle popup visibility
 */
function togglePopup(container) {
  if (!bubbleUI.popup) {
    createPopup(container);
  }

  bubbleUI.isExpanded = !bubbleUI.isExpanded;
  bubbleUI.popup.style.display = bubbleUI.isExpanded ? 'flex' : 'none';

  if (bubbleUI.isExpanded) {
    resetBadge();
    updateMessages();
  }
}

/**
 * Create popup element
 */
function createPopup(container) {
  const popup = document.createElement('div');
  popup.className = 'bubble-popup';
  popup.innerHTML = `
    <div class="popup-header">
      <div class="popup-title">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230084ff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="Avatar" class="popup-avatar">
        <span class="popup-name">Messenger</span>
      </div>
      <div class="popup-controls">
        <button class="popup-pin" title="Pin conversation">📌</button>
        <button class="popup-close" title="Close">✕</button>
      </div>
    </div>
    <div class="popup-messages">
      <div class="messages-loading">Loading messages...</div>
    </div>
    <div class="popup-input">
      <input type="text" placeholder="Type a message..." class="message-input">
      <button class="send-button">Send</button>
    </div>
  `;

  container.appendChild(popup);
  bubbleUI.popup = popup;

  // Attach popup listeners
  const closeBtn = popup.querySelector('.popup-close');
  const pinBtn = popup.querySelector('.popup-pin');
  const sendBtn = popup.querySelector('.send-button');
  const input = popup.querySelector('.message-input');

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup(container);
  });

  pinBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handlePinClick();
  });

  sendBtn.addEventListener('click', () => {
    const message = input.value.trim();
    if (message) {
      sendMessageToMessenger(message);
      input.value = '';
    }
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const message = input.value.trim();
      if (message) {
        sendMessageToMessenger(message);
        input.value = '';
      }
    }
  });

  // Make draggable
  makePopupDraggable(popup);
}

/**
 * Make popup draggable
 */
function makePopupDraggable(popup) {
  const header = popup.querySelector('.popup-header');
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;

  header.style.cursor = 'move';

  header.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    isDragging = true;
    initialX = e.clientX - popup.offsetLeft;
    initialY = e.clientY - popup.offsetTop;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      popup.style.left = `${currentX}px`;
      popup.style.top = `${currentY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

/**
 * Setup message observer
 */
function setupMessageObserver() {
  // Observe DOM for new messages
  messageObserver = new MutationObserver(() => {
    // Debounce updates
    debounce(() => {
      updateBubbleData();
      if (bubbleUI && !bubbleUI.isExpanded) {
        bubbleUI.unreadCount++;
        updateBadge();
      }
    }, DEBOUNCE_DELAY_MS)();
  });

  // Start observing
  const targetNode = document.body;
  messageObserver.observe(targetNode, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

/**
 * Update bubble with current conversation data
 */
function updateBubbleData() {
  if (!bubbleUI) return;

  const conversationName = getConversationName();
  const lastMessage = getLastMessage();
  const avatar = getConversationAvatar();

  // Update bubble
  const nameEl = bubbleUI.bubble.querySelector('.bubble-name');
  const messageEl = bubbleUI.bubble.querySelector('.bubble-message');
  const avatarImg = bubbleUI.bubble.querySelector('.avatar-image');

  if (conversationName) nameEl.textContent = conversationName;
  if (lastMessage) messageEl.textContent = lastMessage;
  if (avatar) avatarImg.src = avatar;

  // Update popup if open
  if (bubbleUI.popup) {
    const popupName = bubbleUI.popup.querySelector('.popup-name');
    const popupAvatar = bubbleUI.popup.querySelector('.popup-avatar');
    if (conversationName) popupName.textContent = conversationName;
    if (avatar) popupAvatar.src = avatar;
  }
}

/**
 * Update messages in popup
 */
function updateMessages() {
  if (!bubbleUI || !bubbleUI.popup) return;

  const messages = getRecentMessages(10);
  const messagesContainer = bubbleUI.popup.querySelector('.popup-messages');
  messagesContainer.innerHTML = '';

  if (messages.length === 0) {
    messagesContainer.innerHTML =
      '<div class="no-messages">No messages yet</div>';
    return;
  }

  messages.forEach((msg) => {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${msg.isOutgoing ? 'outgoing' : 'incoming'}`;
    messageEl.innerHTML = `
      <div class="message-bubble">
        <div class="message-text">${escapeHtml(msg.text)}</div>
      </div>
    `;
    messagesContainer.appendChild(messageEl);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Get conversation name
 */
function getConversationName() {
  const selectors = [
    'h1 span',
    '[role="heading"] span',
    '[data-scope="messages_table"] span'
  ];

  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el && el.textContent.trim()) {
      return el.textContent.trim();
    }
  }

  return 'Messenger Conversation';
}

/**
 * Get last message text
 */
function getLastMessage() {
  const messages = getRecentMessages(1);
  return messages.length > 0 ? messages[0].text : 'No messages';
}

/**
 * Get recent messages
 */
function getRecentMessages(limit = 10) {
  const selectors = [
    '[role="row"]',
    '[data-scope="messages_table"]',
    '.x78zum5.xdt5ytf.x1iyjqo2'
  ];

  let messageElements = [];
  for (const selector of selectors) {
    messageElements = Array.from(document.querySelectorAll(selector));
    if (messageElements.length > 0) break;
  }

  const messages = messageElements
    .slice(-limit)
    .map(parseMessage)
    .filter(Boolean);

  return messages;
}

/**
 * Parse message element
 */
function parseMessage(messageElement) {
  try {
    const textSelectors = [
      '[dir="auto"]',
      '[data-scope="messages_table"]',
      '.x1lliihq',
      'span'
    ];

    let messageText = '';
    for (const selector of textSelectors) {
      const textElement = messageElement.querySelector(selector);
      if (textElement && textElement.textContent.trim()) {
        messageText = textElement.textContent.trim();
        break;
      }
    }

    if (!messageText) return null;

    const isOutgoing = messageElement.closest('[aria-label*="You"]') !== null;

    return {
      text: messageText,
      isOutgoing,
      timestamp: Date.now()
    };
  } catch {
    return null;
  }
}

/**
 * Get conversation avatar
 */
function getConversationAvatar() {
  const avatarSelectors = [
    'img[data-visualcompletion="media-vc-image"]',
    'img[alt][src]'
  ];

  for (const selector of avatarSelectors) {
    const avatar = document.querySelector(selector);
    if (avatar && avatar.src && !avatar.src.includes('emoji')) {
      return avatar.src;
    }
  }

  return null;
}

/**
 * Send message to Messenger
 */
function sendMessageToMessenger(text) {
  try {
    const inputSelectors = [
      '[role="textbox"][contenteditable="true"]',
      '[contenteditable="true"][data-scope="messages_table"]',
      'div[contenteditable="true"]'
    ];

    let input = null;
    for (const selector of inputSelectors) {
      input = document.querySelector(selector);
      if (input) break;
    }

    if (!input) {
      console.error('Message input not found');
      return;
    }

    input.textContent = text;
    input.innerHTML = text;

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    setTimeout(() => {
      const sendButtonSelectors = [
        '[aria-label*="Send"]',
        '[aria-label*="Press enter to send"]',
        'button[type="submit"]'
      ];

      for (const selector of sendButtonSelectors) {
        const sendButton = document.querySelector(selector);
        if (sendButton) {
          sendButton.click();
          break;
        }
      }

      // Fallback: press Enter
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        bubbles: true
      });
      input.dispatchEvent(enterEvent);
    }, MESSAGE_SEND_DELAY_MS);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

/**
 * Handle pin button click
 */
async function handlePinClick() {
  const threadId = getThreadIdFromUrl();
  if (!threadId) return;

  const pinnedChats = await getPinnedChats();
  const isPinned = pinnedChats.some((c) => c.threadId === threadId);

  if (isPinned) {
    await unpinChat(threadId);
    alert('Chat unpinned');
  } else {
    if (pinnedChats.length >= 3) {
      alert('Maximum 3 chats can be pinned');
      return;
    }
    await pinChat({
      threadId,
      name: getConversationName(),
      avatar: getConversationAvatar()
    });
    alert('Chat pinned');
  }
}

/**
 * Get thread ID from URL
 */
function getThreadIdFromUrl() {
  const match = window.location.pathname.match(/\/t\/(\d+)/);
  return match ? match[1] : null;
}

/**
 * Get pinned chats
 */
async function getPinnedChats() {
  try {
    const result = await chrome.storage.sync.get('pinned_chats');
    return result.pinned_chats || [];
  } catch {
    return [];
  }
}

/**
 * Pin chat
 */
async function pinChat(chat) {
  try {
    const pinned = await getPinnedChats();
    pinned.push(chat);
    await chrome.storage.sync.set({
      pinned_chats: pinned.slice(0, 3)
    });
  } catch (error) {
    console.error('Error pinning chat:', error);
  }
}

/**
 * Unpin chat
 */
async function unpinChat(threadId) {
  try {
    const pinned = await getPinnedChats();
    const filtered = pinned.filter((c) => c.threadId !== threadId);
    await chrome.storage.sync.set({ pinned_chats: filtered });
  } catch (error) {
    console.error('Error unpinning chat:', error);
  }
}

/**
 * Update badge
 */
function updateBadge() {
  if (!bubbleUI) return;
  const badge = bubbleUI.bubble.querySelector('.bubble-badge');
  if (bubbleUI.unreadCount > 0) {
    badge.textContent = bubbleUI.unreadCount;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

/**
 * Reset badge
 */
function resetBadge() {
  if (!bubbleUI) return;
  bubbleUI.unreadCount = 0;
  updateBadge();
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
