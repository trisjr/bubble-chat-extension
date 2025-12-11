/**
 * Popup settings script
 */

let currentSettings = {};
let pinnedChats = [];

// Load settings on popup open
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await loadPinnedChats();
  attachEventListeners();
});

/**
 * Load settings from storage
 */
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get('bubble_settings');
    currentSettings = result.bubble_settings || {
      enabled: true,
      position: 'bottom-right',
      size: 'medium',
      theme: 'light'
    };

    // Update UI with loaded settings
    document.getElementById('enabled').checked = currentSettings.enabled;

    const positionRadio = document.querySelector(
      `input[name="position"][value="${currentSettings.position}"]`
    );
    if (positionRadio) positionRadio.checked = true;

    const themeRadio = document.querySelector(
      `input[name="theme"][value="${currentSettings.theme}"]`
    );
    if (themeRadio) themeRadio.checked = true;
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

/**
 * Load pinned chats from storage
 */
async function loadPinnedChats() {
  try {
    const result = await chrome.storage.sync.get('pinned_chats');
    pinnedChats = result.pinned_chats || [];
    displayPinnedChats();
  } catch (error) {
    console.error('Error loading pinned chats:', error);
  }
}

/**
 * Display pinned chats in UI
 */
function displayPinnedChats() {
  const container = document.getElementById('pinnedChats');

  if (pinnedChats.length === 0) {
    container.innerHTML = '<div class="no-pinned">No pinned chats yet</div>';
    return;
  }

  container.innerHTML = pinnedChats
    .map(
      (chat, index) => `
    <div class="pinned-chat">
      <div class="pinned-chat-info">
        <img src="${chat.avatar || ''}" alt="Avatar" class="pinned-avatar" />
        <span class="pinned-name">${escapeHtml(chat.name)}</span>
      </div>
      <button class="unpin-btn" data-index="${index}">Unpin</button>
    </div>
  `
    )
    .join('');

  // Attach unpin listeners
  container.querySelectorAll('.unpin-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      unpinChat(index);
    });
  });
}

/**
 * Attach event listeners to settings controls
 */
function attachEventListeners() {
  // Enable toggle
  document.getElementById('enabled').addEventListener('change', (e) => {
    currentSettings.enabled = e.target.checked;
    saveSettings();
  });

  // Position radio buttons
  document.querySelectorAll('input[name="position"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      currentSettings.position = e.target.value;
      saveSettings();
    });
  });

  // Theme radio buttons
  document.querySelectorAll('input[name="theme"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      currentSettings.theme = e.target.value;
      saveSettings();
    });
  });
}

/**
 * Save settings to storage
 */
async function saveSettings() {
  try {
    await chrome.storage.sync.set({
      bubble_settings: currentSettings
    });
    showSaveStatus();
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

/**
 * Unpin a chat
 */
async function unpinChat(index) {
  try {
    pinnedChats.splice(index, 1);
    await chrome.storage.sync.set({
      pinned_chats: pinnedChats
    });
    displayPinnedChats();
    showSaveStatus();
  } catch (error) {
    console.error('Error unpinning chat:', error);
  }
}

/**
 * Show save status message
 */
function showSaveStatus() {
  const status = document.getElementById('saveStatus');
  status.classList.add('show');
  setTimeout(() => {
    status.classList.remove('show');
  }, 2000);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
