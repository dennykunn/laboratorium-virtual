# 📚 DOKUMENTASI LENGKAP - LABORATORIUM VIRTUAL
## Media Pembelajaran Interaktif Gerak & Gaya untuk IPA SMP/MTs Kelas VII

---

## 📋 DAFTAR ISI
1. [Pendahuluan](#pendahuluan)
2. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
3. [Struktur Folder Project](#struktur-folder-project)
4. [Penjelasan Setiap File](#penjelasan-setiap-file)
5. [Alur Aplikasi](#alur-aplikasi)
6. [Cara Menjalankan Aplikasi](#cara-menjalankan-aplikasi)

---

## 🎯 PENDAHULUAN

Laboratorium Virtual adalah aplikasi media pembelajaran berbasis web yang dirancang untuk membantu siswa SMP/MTs Kelas VII dalam memahami konsep Gerak dan Gaya dalam mata pelajaran IPA. Aplikasi ini menyediakan:

- **Panduan** penggunaan aplikasi
- **Capaian & Tujuan Pembelajaran** (CP & TP)
- **Materi** pembelajaran tentang Gaya
- **Praktikum Virtual** untuk eksperimen magnet
- **Quiz** untuk menguji pemahaman siswa

---

## 💻 TEKNOLOGI YANG DIGUNAKAN

### 1. React.js
React adalah library JavaScript untuk membangun antarmuka pengguna (User Interface). React menggunakan konsep "komponen" dimana setiap bagian dari aplikasi dibuat sebagai komponen terpisah yang dapat digunakan kembali.

**Mengapa React?**
- Mudah untuk membuat aplikasi interaktif
- Performa cepat dengan Virtual DOM
- Banyak digunakan di industri

### 2. Vite
Vite adalah build tool modern yang membuat proses development React lebih cepat dibandingkan tools lainnya.

### 3. Framer Motion
Library untuk membuat animasi yang halus dan menarik pada elemen-elemen di halaman.

### 4. CSS (Cascading Style Sheets)
Digunakan untuk mengatur tampilan visual seperti warna, ukuran, posisi, dan layout.

### 5. Web Audio API
API bawaan browser untuk menghasilkan efek suara dan musik latar tanpa memerlukan file audio eksternal.

---

## 📁 STRUKTUR FOLDER PROJECT

```
laboratorium-virtual/
│
├── public/                     # File statis yang bisa diakses langsung
│   └── assets/                 # Semua gambar dan media
│       ├── elemen/             # Gambar tombol, ikon, dll
│       ├── latar-slide/        # Gambar background
│       └── sounds/             # File audio (jika ada)
│
├── src/                        # Source code aplikasi
│   ├── components/             # Komponen-komponen React
│   │   ├── modals/             # Komponen popup/modal
│   │   │   ├── ProfileModal.jsx
│   │   │   ├── SettingsModal.jsx
│   │   │   ├── ExitModal.jsx
│   │   │   └── Modal.css
│   │   │
│   │   ├── LoadingScreen.jsx   # Halaman loading awal
│   │   ├── StartScreen.jsx     # Halaman start/mulai
│   │   ├── MainMenu.jsx        # Halaman menu utama
│   │   ├── PanduanScreen.jsx   # Halaman panduan
│   │   ├── CPTPScreen.jsx      # Halaman CP & TP
│   │   ├── MateriScreen.jsx    # Halaman materi
│   │   ├── PraktikumMenu.jsx   # Menu praktikum
│   │   ├── PetunjukPraktikum.jsx # Petunjuk praktikum
│   │   ├── PraktikumLab.jsx    # Simulasi lab virtual
│   │   ├── QuizScreen.jsx      # Halaman quiz
│   │   ├── ScoreScreen.jsx     # Halaman skor
│   │   └── *.css               # File styling untuk masing-masing komponen
│   │
│   ├── hooks/                  # Custom hooks React
│   │   └── useAudio.js         # Hook untuk mengelola audio/suara
│   │
│   ├── App.jsx                 # Komponen utama aplikasi
│   ├── App.css                 # Styling untuk App
│   ├── index.css               # Styling global
│   └── main.jsx                # Entry point aplikasi
│
├── index.html                  # File HTML utama
├── package.json                # Konfigurasi npm dan dependencies
├── vite.config.js              # Konfigurasi Vite
└── DOKUMENTASI.md              # File dokumentasi ini
```

---

## 📝 PENJELASAN SETIAP FILE

### 1. `main.jsx` - Entry Point
File ini adalah titik masuk (entry point) aplikasi. React akan merender komponen `App` ke dalam elemen HTML dengan id `root`.

### 2. `App.jsx` - Komponen Utama
File terpenting yang mengatur:
- **State Management**: Menyimpan data seperti halaman aktif, status mute, skor quiz
- **Navigation**: Perpindahan antar halaman
- **Context Provider**: Menyediakan data global ke semua komponen
- **Fullscreen**: Fitur layar penuh

### 3. `useAudio.js` - Audio Manager
Mengelola semua suara dalam aplikasi:
- Sound effect untuk klik tombol
- Sound effect sukses/error
- Background music

### 4. Komponen Screen (Halaman)

| File | Fungsi |
|------|--------|
| `LoadingScreen.jsx` | Tampilan loading saat aplikasi dibuka |
| `StartScreen.jsx` | Halaman awal dengan tombol Play |
| `MainMenu.jsx` | Menu utama dengan 4 pilihan menu |
| `PanduanScreen.jsx` | Panduan penggunaan aplikasi (3 slide) |
| `CPTPScreen.jsx` | Capaian Pembelajaran & Tujuan Pembelajaran |
| `MateriScreen.jsx` | Materi pembelajaran tentang Gaya |
| `PraktikumMenu.jsx` | Menu pemilihan praktikum |
| `PetunjukPraktikum.jsx` | Petunjuk pelaksanaan praktikum |
| `PraktikumLab.jsx` | Simulasi laboratorium virtual |
| `QuizScreen.jsx` | Quiz 5 soal tentang magnet |
| `ScoreScreen.jsx` | Tampilan skor akhir |

### 5. Komponen Modal (Popup)

| File | Fungsi |
|------|--------|
| `ProfileModal.jsx` | Popup profil pengembang |
| `SettingsModal.jsx` | Popup pengaturan suara |
| `ExitModal.jsx` | Popup konfirmasi keluar |

---

## 🔄 ALUR APLIKASI

```
┌─────────────────┐
│  Loading Screen │ (Layar Loading)
└────────┬────────┘
         ▼
┌─────────────────┐
│  Start Screen   │ (Layar Mulai dengan tombol Play)
└────────┬────────┘
         ▼
┌─────────────────┐
│   Main Menu     │ (Menu Utama)
├─────────────────┤
│ • Panduan       │──► 3 Slide Panduan
│ • CP & TP       │──► Capaian & Tujuan Pembelajaran
│ • Materi        │──► Materi Gaya (3 Slide)
│ • Praktikum     │──► Menu Praktikum
└─────────────────┘
         ▼
┌─────────────────┐
│ Praktikum Menu  │
├─────────────────┤
│ • Petunjuk      │──► Petunjuk Praktikum
│ • Praktikum     │──► Simulasi Lab Virtual
└────────┬────────┘
         ▼
┌─────────────────┐
│   Lab Virtual   │ (Eksperimen Magnet)
└────────┬────────┘
         ▼
┌─────────────────┐
│     Quiz        │ (5 Soal)
└────────┬────────┘
         ▼
┌─────────────────┐
│   Score Screen  │ (Tampilan Skor)
└─────────────────┘
```

---

## 🚀 CARA MENJALANKAN APLIKASI

### Prasyarat
1. Node.js terinstall di komputer
2. NPM (Node Package Manager)

### Langkah-langkah

1. **Buka Terminal/Command Prompt**

2. **Masuk ke folder project**
   ```bash
   cd laboratorium-virtual
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

5. **Buka browser dan akses**
   ```
   http://localhost:5173
   ```

---

## 📖 GLOSARIUM ISTILAH PEMROGRAMAN

| Istilah | Penjelasan |
|---------|------------|
| **Component** | Blok kode yang dapat digunakan ulang untuk membangun UI |
| **State** | Data yang bisa berubah dan mempengaruhi tampilan |
| **Props** | Data yang dikirim dari komponen parent ke child |
| **Hook** | Fungsi khusus React untuk mengelola state dan lifecycle |
| **useState** | Hook untuk membuat dan mengelola state |
| **useEffect** | Hook untuk menjalankan kode saat komponen dimuat/berubah |
| **Context** | Cara berbagi data ke banyak komponen tanpa props |
| **JSX** | Sintaks yang mirip HTML untuk menulis komponen React |
| **CSS** | Bahasa untuk styling/mengatur tampilan |
| **Import/Export** | Cara berbagi kode antar file |
| **Event Handler** | Fungsi yang dijalankan saat ada aksi (klik, hover, dll) |
| **Conditional Rendering** | Menampilkan komponen berdasarkan kondisi tertentu |

---

## 👩‍💻 PENGEMBANG

Aplikasi Laboratorium Virtual ini dikembangkan untuk penelitian skripsi di bidang pendidikan IPA, Fakultas FKIP, Universitas Muhammadiyah Riau.

---

*Dokumentasi ini dibuat untuk memudahkan pemahaman kode bagi yang tidak memiliki background pemrograman.*
