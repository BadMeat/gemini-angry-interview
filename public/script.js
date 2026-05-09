const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const resetBtn = document.getElementById('reset-btn');
const startBtn = document.getElementById('start-btn');

// Conversation history sent to the API
let conversation = [];

// ── Helpers ────────────────────────────────────────────

function getTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function appendMessage(role, text) {
  const isUser = role === 'user';

  const row = document.createElement('div');
  row.classList.add('message-row', isUser ? 'user' : 'bot');

  const avatarEl = document.createElement('div');
  avatarEl.classList.add('avatar-small');
  avatarEl.textContent = isUser ? '🧑' : '😡';

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;

  const time = document.createElement('div');
  time.classList.add('message-time');
  time.textContent = getTime();

  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.flexDirection = 'column';
  wrapper.appendChild(bubble);
  wrapper.appendChild(time);

  if (isUser) {
    row.appendChild(wrapper);
    row.appendChild(avatarEl);
  } else {
    row.appendChild(avatarEl);
    row.appendChild(wrapper);
  }

  chatBox.appendChild(row);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function setLoading(loading) {
  typingIndicator.style.display = loading ? 'flex' : 'none';
  sendBtn.disabled = loading;
  input.disabled = loading;
}

function clearWelcome() {
  const welcome = chatBox.querySelector('.welcome-message');
  if (welcome) welcome.remove();
}

// ── Send message ────────────────────────────────────────

async function sendMessage(text) {
  clearWelcome();

  conversation.push({ role: 'user', text });
  appendMessage('user', text);
  setLoading(true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation }),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();
    const reply = data.result || 'Maaf, saya tidak mendapatkan respons.';

    conversation.push({ role: 'model', text: reply });
    appendMessage('bot', reply);
  } catch (err) {
    appendMessage('bot', 'Terjadi kesalahan koneksi. Pastikan server berjalan dan coba lagi.');
    // Remove failed user message from history so it can be retried
    conversation.pop();
  } finally {
    setLoading(false);
    autoResize();
  }
}

// ── Auto-resize textarea ────────────────────────────────

function autoResize() {
  input.style.height = 'auto';
  const next = Math.min(input.scrollHeight, 140);
  input.style.height = next + 'px';
  input.style.overflowY = input.scrollHeight > 140 ? 'auto' : 'hidden';
}

// ── Event listeners ─────────────────────────────────────

input.addEventListener('input', () => {
  autoResize();
  sendBtn.disabled = input.value.trim() === '';
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) form.requestSubmit();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  sendBtn.disabled = true;
  autoResize();
  sendMessage(text);
});

startBtn?.addEventListener('click', () => {
  sendMessage('Halo, saya siap untuk memulai sesi interview sebagai software developer.');
});

resetBtn?.addEventListener('click', () => {
  conversation = [];
  chatBox.innerHTML = `
    <div class="welcome-message">
      <div class="welcome-icon">🏢</div>
      <h2>Selamat Datang di Sesi Interview</h2>
      <p>Halo! Saya adalah HRD dari perusahaan kami. Saya akan memandu Anda melalui sesi interview hari ini. Silakan perkenalkan diri Anda terlebih dahulu.</p>
      <button id="start-btn" class="start-btn">Mulai Interview →</button>
    </div>
  `;
  document.getElementById('start-btn')?.addEventListener('click', () => {
    sendMessage('Halo, saya siap untuk memulai sesi interview.');
  });
  input.value = '';
  sendBtn.disabled = true;
});
