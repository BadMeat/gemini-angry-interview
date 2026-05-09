# AI Angry Interview Simulator 😡

Chatbot berbasis **Google Gemini AI** yang mensimulasikan sesi wawancara kerja dengan persona HRD yang galak — cocok untuk latihan interview agar lebih siap mental dan teknis. Siapkan mental anda, bisa jadi akan dimaki maki oleh chat ini.

---

## Tampilan

![Preview](public/icons/main.png)

---

## Fitur

- Percakapan multi-turn yang mengingat konteks seluruh sesi
- Persona HRD galak berbahasa Indonesia via Gemini 2.5 Flash
- Tombol reset untuk memulai sesi baru
- Textarea auto-resize dengan shortcut `Enter` kirim, `Shift+Enter` baris baru
- Responsive — tampil optimal di desktop maupun mobile

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Backend | Node.js, Express v5 |
| AI | Google Gemini 2.5 Flash (`@google/genai`) |
| Frontend | Vanilla HTML, CSS, JavaScript |

---

## Cara Menjalankan

### 1. Clone & install

```bash
git clone https://github.com/username/repo-name.git
cd repo-name
npm install
```

### 2. Buat file `.env`

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

> Dapatkan API key di [Google AI Studio](https://aistudio.google.com/app/apikey)

### 3. Jalankan server

```bash
node index.js
```

Buka browser dan akses `http://localhost:3000`

---

## Struktur Proyek

```
├── lib/
│   └── gemini.js       # Inisialisasi Gemini AI client
├── routes/
│   └── chat.js         # POST /api/chat — endpoint utama
├── public/
│   ├── index.html      # UI chatbot
│   ├── style.css       # Styling responsive
│   ├── script.js       # Logic frontend & fetch ke API
│   └── icons/          # Favicon dan aset gambar
├── index.js            # Entry point Express
└── .env                # API key (tidak di-commit)
```

---

## API

### `POST /api/chat`

**Request body:**
```json
{
  "conversation": [
    { "role": "user", "text": "Halo, perkenalkan saya ..." },
    { "role": "model", "text": "Baik, langsung saja ..." }
  ]
}
```

**Response:**
```json
{
  "result": "Jawaban dari HRD..."
}
```

---

## Referensi

- [Unicode Full Emoji List](https://unicode.org/emoji/charts/full-emoji-list.html) — daftar lengkap emoji
- [Flaticon](https://www.flaticon.com/) — sumber icon untuk tab browser
