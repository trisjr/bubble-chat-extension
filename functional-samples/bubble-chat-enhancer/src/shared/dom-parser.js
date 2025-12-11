/**
 * DOM parser utilities for extracting Messenger data
 */

/**
 * Get current thread ID from URL
 * @returns {string|null} Thread ID or null
 */
export function getThreadIdFromUrl() {
  const urlMatch = window.location.pathname.match(/\/t\/(\d+)/);
  return urlMatch ? urlMatch[1] : null;
}

/**
 * Parse message element to extract data
 * @param {Element} messageElement - DOM element containing message
 * @returns {Object|null} Parsed message object
 */
export function parseMessage(messageElement) {
  try {
    // Try multiple selectors as Messenger DOM changes frequently
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

    // Determine if message is from current user (typically on right side)
    const isOutgoing = messageElement.closest('[aria-label*="You"]') !== null;

    return {
      text: messageText,
      isOutgoing,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error parsing message:', error);
    return null;
  }
}

/**
 * Get recent messages from DOM
 * @param {number} limit - Maximum number of messages to retrieve
 * @returns {Array} Array of message objects
 */
export function getRecentMessages(limit = 10) {
  try {
    // Multiple selectors for message containers
    const messageContainerSelectors = [
      '[role="row"]',
      '[data-scope="messages_table"]',
      '.x78zum5.xdt5ytf.x1iyjqo2'
    ];

    let messageElements = [];
    for (const selector of messageContainerSelectors) {
      messageElements = Array.from(document.querySelectorAll(selector));
      if (messageElements.length > 0) break;
    }

    const messages = messageElements
      .slice(-limit)
      .map(parseMessage)
      .filter(Boolean);

    return messages;
  } catch (error) {
    console.error('Error getting recent messages:', error);
    return [];
  }
}

/**
 * Get conversation name/title
 * @returns {string} Conversation name
 */
export function getConversationName() {
  try {
    // Try multiple selectors for conversation title
    const titleSelectors = [
      '[role="heading"] span',
      'h1 span',
      '[data-scope="messages_table"] span'
    ];

    for (const selector of titleSelectors) {
      const titleElement = document.querySelector(selector);
      if (titleElement && titleElement.textContent.trim()) {
        return titleElement.textContent.trim();
      }
    }

    return 'Messenger Conversation';
  } catch (error) {
    console.error('Error getting conversation name:', error);
    return 'Messenger Conversation';
  }
}

/**
 * Get conversation avatar URL
 * @returns {string|null} Avatar URL or null
 */
export function getConversationAvatar() {
  try {
    const avatarSelectors = [
      'img[data-visualcompletion="media-vc-image"]',
      'img'
    ];

    for (const selector of avatarSelectors) {
      const avatarElement = document.querySelector(selector);
      if (avatarElement && avatarElement.src) {
        return avatarElement.src;
      }
    }

    return null;
  } catch (error) {
    console.error('Error getting conversation avatar:', error);
    return null;
  }
}

/**
 * Find Messenger input field
 * @returns {HTMLElement|null} Input element or null
 */
export function findMessageInput() {
  try {
    const inputSelectors = [
      '[role="textbox"][contenteditable="true"]',
      '[contenteditable="true"][data-scope="messages_table"]',
      'div[contenteditable="true"]'
    ];

    for (const selector of inputSelectors) {
      const input = document.querySelector(selector);
      if (input) return input;
    }

    return null;
  } catch (error) {
    console.error('Error finding message input:', error);
    return null;
  }
}

/**
 * Send message by simulating user input
 * @param {string} text - Message text to send
 * @returns {boolean} Success status
 */
export function sendMessage(text) {
  try {
    const input = findMessageInput();
    if (!input) {
      console.error('Message input not found');
      return false;
    }

    // Set the text content
    input.textContent = text;
    input.innerHTML = text;

    // Trigger input events
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    // Find and click send button
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
          return true;
        }
      }

      // If no send button found, try pressing Enter
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true
      });
      input.dispatchEvent(enterEvent);
    }, 100);

    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
}
