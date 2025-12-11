/**
 * Bubble UI component
 */

export class BubbleUI {
  constructor() {
    this.container = null;
    this.bubble = null;
    this.popup = null;
    this.isExpanded = false;
    this.unreadCount = 0;
    this.settings = {
      position: 'bottom-right',
      size: 'medium',
      theme: 'light'
    };
  }

  /**
   * Initialize and render the bubble
   * @param {Object} settings - Settings object
   */
  init(settings = {}) {
    this.settings = { ...this.settings, ...settings };
    this.createBubble();
    this.attachEventListeners();
  }

  /**
   * Create bubble DOM structure
   */
  createBubble() {
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'bubble-chat-enhancer';
    this.container.className = `bubble-container ${this.settings.position} ${this.settings.theme}`;

    // Create bubble
    this.bubble = document.createElement('div');
    this.bubble.className = 'bubble';
    this.bubble.innerHTML = `
      <div class="bubble-avatar">
        <img src="" alt="Avatar" class="avatar-image">
      </div>
      <div class="bubble-content">
        <div class="bubble-name">Messenger</div>
        <div class="bubble-message">Click to open</div>
      </div>
      <div class="bubble-badge" style="display: none;">0</div>
    `;

    this.container.appendChild(this.bubble);
    document.body.appendChild(this.container);
  }

  /**
   * Create popup DOM structure
   */
  createPopup() {
    this.popup = document.createElement('div');
    this.popup.className = 'bubble-popup';
    this.popup.innerHTML = `
      <div class="popup-header">
        <div class="popup-title">
          <img src="" alt="Avatar" class="popup-avatar">
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

    this.container.appendChild(this.popup);
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    this.bubble.addEventListener('click', () => this.togglePopup());
  }

  /**
   * Toggle popup visibility
   */
  togglePopup() {
    if (!this.popup) {
      this.createPopup();
      this.attachPopupListeners();
    }

    this.isExpanded = !this.isExpanded;
    this.popup.style.display = this.isExpanded ? 'flex' : 'none';

    if (this.isExpanded) {
      this.resetBadge();
      this.onPopupOpen?.();
    }
  }

  /**
   * Attach popup event listeners
   */
  attachPopupListeners() {
    const closeBtn = this.popup.querySelector('.popup-close');
    const pinBtn = this.popup.querySelector('.popup-pin');
    const sendBtn = this.popup.querySelector('.send-button');
    const input = this.popup.querySelector('.message-input');

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePopup();
    });

    pinBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onPinClick?.();
    });

    sendBtn.addEventListener('click', () => {
      const message = input.value.trim();
      if (message) {
        this.onSendMessage?.(message);
        input.value = '';
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const message = input.value.trim();
        if (message) {
          this.onSendMessage?.(message);
          input.value = '';
        }
      }
    });

    // Make popup draggable
    this.makePopupDraggable();
  }

  /**
   * Make popup draggable
   */
  makePopupDraggable() {
    const header = this.popup.querySelector('.popup-header');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    header.style.cursor = 'move';

    header.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      isDragging = true;
      initialX = e.clientX - this.popup.offsetLeft;
      initialY = e.clientY - this.popup.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        this.popup.style.left = `${currentX}px`;
        this.popup.style.top = `${currentY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }

  /**
   * Update bubble with conversation data
   * @param {Object} data - Conversation data
   */
  updateBubble(data) {
    if (data.avatar) {
      const avatarImg = this.bubble.querySelector('.avatar-image');
      avatarImg.src = data.avatar;
    }

    if (data.name) {
      const nameEl = this.bubble.querySelector('.bubble-name');
      nameEl.textContent = data.name;
    }

    if (data.lastMessage) {
      const messageEl = this.bubble.querySelector('.bubble-message');
      messageEl.textContent = data.lastMessage;
    }

    if (this.popup) {
      const popupAvatar = this.popup.querySelector('.popup-avatar');
      const popupName = this.popup.querySelector('.popup-name');
      if (data.avatar) popupAvatar.src = data.avatar;
      if (data.name) popupName.textContent = data.name;
    }
  }

  /**
   * Update messages in popup
   * @param {Array} messages - Array of message objects
   */
  updateMessages(messages) {
    if (!this.popup) return;

    const messagesContainer = this.popup.querySelector('.popup-messages');
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
          <div class="message-text">${this.escapeHtml(msg.text)}</div>
        </div>
      `;
      messagesContainer.appendChild(messageEl);
    });

    // Auto scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /**
   * Increment unread badge
   */
  incrementBadge() {
    if (!this.isExpanded) {
      this.unreadCount++;
      this.updateBadge();
    }
  }

  /**
   * Update badge display
   */
  updateBadge() {
    const badge = this.bubble.querySelector('.bubble-badge');
    if (this.unreadCount > 0) {
      badge.textContent = this.unreadCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }

  /**
   * Reset unread badge
   */
  resetBadge() {
    this.unreadCount = 0;
    this.updateBadge();
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Update theme
   * @param {string} theme - Theme name ('light' or 'dark')
   */
  setTheme(theme) {
    this.settings.theme = theme;
    this.container.classList.remove('light', 'dark');
    this.container.classList.add(theme);
  }

  /**
   * Update position
   * @param {string} position - Position ('bottom-left' or 'bottom-right')
   */
  setPosition(position) {
    this.settings.position = position;
    this.container.classList.remove('bottom-left', 'bottom-right');
    this.container.classList.add(position);
  }

  /**
   * Destroy the bubble
   */
  destroy() {
    if (this.container) {
      this.container.remove();
    }
  }
}
