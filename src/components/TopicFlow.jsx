import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'

// ─────────────────────────────────────────────
//  KONFIGURASI LAYOUT – Ubah di sini saja!
// ─────────────────────────────────────────────
const LAYOUT = {
  headerHeight: { mobile: '64px', desktop: '72px' },
  footerHeight: { mobile: '56px', desktop: '48px' },
  contentMaxWidth: '1000px',
  // slideAreaHeight = 100dvh - header - footer
  slideAreaHeight: 'calc(100dvh - 64px - 56px)',
}

// ─────────────────────────────────────────────
//  DATA SLIDES
// ─────────────────────────────────────────────
const GERAK_SLIDES = [
  { type: 'gerak-simak', label: 'Ayo Simak' },
  { type: 'gerak-bertanya', label: 'Ayo Bertanya' },
  { type: 'gerak-coba-tebak-image', label: 'Coba Tebak' },
  { type: 'gerak-coba-tebak-pertanyaan', label: 'Coba Tebak Pertanyaan', background: '/assets/latar-slide/4.png' },
  { type: 'gerak-materi', label: 'Materi Gerak' },
  { type: 'jarak-perpindahan', label: 'Jarak dan Perpindahan' },
  { type: 'kelajuan-kecepatan', label: 'Kelajuan dan Kecepatan' },
  { type: 'rumus-gerak', label: 'Rumus Gerak' },
  { type: 'tabel-pengamatan-gerak', label: 'Tabel Pengamatan' },
  { type: 'analisis-yuk-gerak', label: 'Analisis Yuk' },
  { type: 'mari-simpulkan-gerak', label: 'Mari Simpulkan' },
  { type: 'quiz', label: 'Quiz Time', background: '/assets/latar-slide/4.png' },
  { type: 'score', label: 'Skor', background: '/assets/latar-slide/4.png' },
]

const GAYA_SLIDES = [
  { type: 'gaya-simak', label: 'Ayo Simak' },
  { type: 'gaya-bertanya', label: 'Ayo Bertanya' },
  { type: 'gaya-coba-tebak', label: 'Coba Tebak' },
  { type: 'gaya-coba-tebak-pertanyaan', label: 'Coba Tebak Pertanyaan', background: '/assets/latar-slide/4.png' },
  { type: 'materi-gaya', label: 'Materi Gaya' },
  { type: 'newton', label: 'Newton' },
  { type: 'hukum-newton-i', label: 'Hukum Newton I' },
  { type: 'hukum-newton-ii', label: 'Hukum Newton II' },
  { type: 'hukum-newton-iii', label: 'Hukum Newton III' },
  { type: 'tabel-pengamatan-gaya', label: 'Tabel Pengamatan' },
  { type: 'analisis-yuk-gaya', label: 'Analisis Yuk' },
  { type: 'mari-simpulkan-gaya', label: 'Mari Simpulkan' },
  { type: 'quiz', label: 'Quiz Time', background: '/assets/latar-slide/4.png' },
  { type: 'score', label: 'Skor', background: '/assets/latar-slide/4.png' },
]

// ─────────────────────────────────────────────
//  SOAL QUIZ  (jawaban sudah diverifikasi ✓)
// ─────────────────────────────────────────────
const GERAK_QUESTIONS = [
  {
    question: '1. Sebuah mobil menempuh jarak 100 meter dalam waktu 20 sekon. Kelajuan mobil tersebut adalah …',
    options: [
      { label: 'A', text: '2 m/s', correct: false },
      { label: 'B', text: '4 m/s', correct: false },
      { label: 'C', text: '5 m/s', correct: true }, // v = 100/20 = 5 m/s
      { label: 'D', text: '10 m/s', correct: false },
    ],
  },
  {
    question: '2. Perubahan posisi benda dari titik awal ke titik akhir disebut …',
    options: [
      { label: 'A', text: 'Massa', correct: false },
      { label: 'B', text: 'Gaya', correct: false },
      { label: 'C', text: 'Perpindahan', correct: true }, // besaran vektor posisi
      { label: 'D', text: 'Percepatan', correct: false },
    ],
  },
  {
    question: '3. Mobil A dan Mobil B menempuh lintasan 100 meter. Mobil A sampai dalam 10 sekon, Mobil B dalam 20 sekon. Mobil yang memiliki kelajuan lebih besar adalah …',
    options: [
      { label: 'A', text: 'Mobil A', correct: true }, // v_A=10 m/s > v_B=5 m/s
      { label: 'B', text: 'Mobil B', correct: false },
      { label: 'C', text: 'Keduanya sama', correct: false },
      { label: 'D', text: 'Tidak dapat ditentukan', correct: false },
    ],
  },
  {
    question: '4. Rumus yang tepat untuk menghitung kelajuan adalah …',
    options: [
      { label: 'A', text: 'gaya = massa × percepatan', correct: false },
      { label: 'B', text: 'kelajuan = jarak ÷ waktu', correct: true }, // v = s/t
      { label: 'C', text: 'waktu = jarak × kelajuan', correct: false },
      { label: 'D', text: 'massa = gaya ÷ percepatan', correct: false },
    ],
  },
  {
    question: '5. Benda dikatakan bergerak apabila …',
    options: [
      { label: 'A', text: 'Bentuknya berubah', correct: false },
      { label: 'B', text: 'Warnanya berubah', correct: false },
      { label: 'C', text: 'Posisinya berubah terhadap titik acuan', correct: true },
      { label: 'D', text: 'Ukurannya membesar', correct: false },
    ],
  },
]

const GAYA_QUESTIONS = [
  {
    question: '1. Jika gaya yang diberikan pada benda diperbesar, maka benda akan …',
    options: [
      { label: 'A', text: 'bergerak lebih lambat', correct: false },
      { label: 'B', text: 'tetap diam', correct: false },
      { label: 'C', text: 'bergerak lebih cepat', correct: true }, // F=ma → F↑ maka a↑
      { label: 'D', text: 'massanya bertambah', correct: false },
    ],
  },
  {
    question: '2. Sebuah benda bermassa besar lebih sulit dipercepat karena …',
    options: [
      { label: 'A', text: 'gayanya kecil', correct: false },
      { label: 'B', text: 'massanya besar', correct: true }, // a = F/m → m↑ maka a↓
      { label: 'C', text: 'waktunya lama', correct: false },
      { label: 'D', text: 'jaraknya jauh', correct: false },
    ],
  },
  {
    question: '3. Sebuah troli bermassa 2 kg didorong dengan gaya 10 N. Besar percepatan troli adalah …',
    options: [
      { label: 'A', text: '2 m/s²', correct: false },
      { label: 'B', text: '5 m/s²', correct: true }, // a = F/m = 10/2 = 5
      { label: 'C', text: '10 m/s²', correct: false },
      { label: 'D', text: '20 m/s²', correct: false },
    ],
  },
  {
    question: '4. Troli A bermassa kecil dan Troli B bermassa besar didorong dengan gaya yang sama. Troli yang memiliki percepatan lebih besar adalah …',
    options: [
      { label: 'A', text: 'Troli A', correct: true }, // a=F/m → m kecil → a besar
      { label: 'B', text: 'Troli B', correct: false },
      { label: 'C', text: 'Keduanya sama', correct: false },
      { label: 'D', text: 'Tidak bergerak', correct: false },
    ],
  },
  {
    question: '5. Saat siswa mendorong dinding, tangan terasa mendapat dorongan balik. Peristiwa ini membuktikan …',
    options: [
      { label: 'A', text: 'Hukum Newton I', correct: false },
      { label: 'B', text: 'Hukum Newton II', correct: false },
      { label: 'C', text: 'Hukum Newton III', correct: true }, // aksi = reaksi
      { label: 'D', text: 'Gaya gesek', correct: false },
    ],
  },
]

// ─────────────────────────────────────────────
//  KOMPONEN UTAMA
// ─────────────────────────────────────────────
function TopicFlow({ topic }) {
  const { navigateTo, playSound } = useApp()

  const slides = topic === 'gerak' ? GERAK_SLIDES : GAYA_SLIDES
  const questions = topic === 'gerak' ? GERAK_QUESTIONS : GAYA_QUESTIONS

  // ── State ──
  const [currentSlide, setCurrentSlide] = useState(0)
  const [quizQuestion, setQuizQuestion] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizResult, setQuizResult] = useState(null)  // 'correct' | 'wrong' | null
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const videoRef = useRef(null)
  const scoreAudioRef = useRef(null)

  // ── Derived ──
  const slide = slides[currentSlide]
  const backgroundImage = slide.background || '/assets/latar-slide/2.jpg'
  const showWordmark = backgroundImage === '/assets/latar-slide/2.jpg'

  // ── Navigasi ──
  const canGoPrev = () => slide.type !== 'quiz' && slide.type !== 'score' && currentSlide > 0
  const canGoNext = () => {
    if (slide.type === 'quiz' || slide.type === 'score') return false
    return currentSlide < slides.length - 1
  }

  const goNext = () => { if (canGoNext()) { playSound('click'); setCurrentSlide(i => i + 1) } }
  const goPrev = () => { if (canGoPrev()) { playSound('click'); setCurrentSlide(i => i - 1) } }
  const click = (fn) => { playSound('click'); fn() }


  // ── Quiz ──
  const handleQuizAnswer = (option) => {
    if (quizAnswered) return
    playSound('click')
    setQuizAnswered(true)
    if (option.correct) { setQuizScore(s => s + 20); setQuizResult('correct'); playSound('success') }
    else { setQuizResult('wrong'); playSound('error') }

    setTimeout(() => {
      setQuizResult(null)
      setQuizAnswered(false)
      if (option.correct) {
        if (quizQuestion < questions.length - 1) setQuizQuestion(q => q + 1)
        else setCurrentSlide(i => i + 1)
      }
    }, 1500)
  }

  // ── Score backsound ──
  useEffect(() => {
    if (slide.type !== 'score') return
    try {
      scoreAudioRef.current = new Audio('/assets/backsound/Tampilan Nilai.wav')
      scoreAudioRef.current.play().catch(() => { })
    } catch (_) { }
    return () => { scoreAudioRef.current?.pause(); scoreAudioRef.current = null }
  }, [slide.type])

  // ─────────────────────────────────────────
  //  SUB-KOMPONEN: PapanPutih
  //  Dikontrol oleh tinggi (height-driven).
  //  Dipakai di dalam CharacterAndBoard.
  // ─────────────────────────────────────────
  const PapanPutih = ({ children, inset = '7%' }) => (
    <div className="h-full flex items-center justify-center">
      <div className="relative h-full">
        <img src="/assets/elemen/Papan Putih.png" alt="Papan Putih" className="h-full w-auto object-contain" />
        <div className="absolute overflow-hidden rounded-lg" style={{ inset, contain: 'strict' }}>
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  )

  // ─────────────────────────────────────────
  //  SUB-KOMPONEN: PapanPutihFull
  //  Papan tanpa karakter, mengisi slideAreaHeight.
  //  Konten bisa di-scroll jika overflow.
  // ─────────────────────────────────────────
  const PapanPutihFull = ({ children, inset = '8%' }) => (
    <div className="w-full flex items-center justify-center" style={{ height: LAYOUT.slideAreaHeight }}>
      <div className="relative h-full w-fit mx-auto">
        <img src="/assets/elemen/Papan Putih.png" alt="Papan Putih" className="h-full w-auto object-contain" />
        <div className="absolute overflow-y-auto rounded-lg" style={{ inset }}>
          {children}
        </div>
      </div>
    </div>
  )

  // ─────────────────────────────────────────
  //  SUB-KOMPONEN: CharacterAndBoard
  //  Layout karakter kiri + papan kanan.
  // ─────────────────────────────────────────
  const CharacterAndBoard = ({ characterSrc, characterAlt, boardInset = '7%', children }) => (
    <div className="w-full flex justify-center" style={{ height: LAYOUT.slideAreaHeight }}>
      <div className="flex items-end h-full w-full max-w-6xl">

        {/* Karakter – 80% tinggi agar tidak terlalu dominan */}
        <div className="shrink-0 h-4/5 flex items-end">
          <img src={characterSrc} alt={characterAlt} className="h-full w-auto object-contain" />
        </div>

        {/* Papan – mengisi sisa lebar */}
        <div className="flex-1 h-full min-w-0">
          <PapanPutih inset={boardInset}>{children}</PapanPutih>
        </div>

      </div>
    </div>
  )

  // ─────────────────────────────────────────
  //  RENDER SLIDE
  // ─────────────────────────────────────────
  const renderSlide = () => {
    switch (slide.type) {

      // ════════════════ GERAK ════════════════

      case 'gerak-simak':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gaya/Ayo Simak.png" characterAlt="Ayo Simak" boardInset="6%">
            <div className="flex justify-center items-center h-full w-full">

              <video ref={videoRef} src="/assets/elemen/Gerak/Animasi mobil Bergerak.mp4"
                controls playsInline className="w-full lg:h-[60%] h-[90%] object-cover bg-black" />
            </div>
          </CharacterAndBoard>
        )

      case 'gerak-bertanya':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gerak/Ayo bertanya.png" characterAlt="Ayo Bertanya">
            <div className="w-full h-full flex flex-col justify-center overflow-y-auto">
              <img src="/assets/elemen/Gaya/Ayo bertanya 1.png" alt="Pertanyaan 1" className="w-full object-contain" />
              <img src="/assets/elemen/Gaya/Ayo bertanya 2.png" alt="Pertanyaan 2" className="w-full object-contain" />
            </div>
          </CharacterAndBoard>
        )

      case 'gerak-coba-tebak-image':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gerak/Coba Tebak.png" characterAlt="Coba Tebak" boardInset="8%">
            <img src="/assets/elemen/Gaya/Coba Tebak 1.png" alt="Coba Tebak" className="w-full h-full object-contain" />
          </CharacterAndBoard>
        )

      case 'gerak-coba-tebak-pertanyaan':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 p-2">
              <h3 className="text-center text-xl lg:text-3xl font-bold mb-3">COBA TEBAK</h3>
              <ol className="list-decimal list-inside space-y-3 text-base md:text-lg lg:text-2xl leading-snug">
                <li>Menurutmu, mengapa dua mobil yang menempuh lintasan sama bisa sampai pada waktu yang berbeda?</li>
                <li>Jika jarak diperbesar tetapi waktu tetap, bagaimana dugaanmu tentang kelajuan?</li>
                <li>Menurut pendapatmu, faktor apa yang memengaruhi kelajuan mobil?</li>
              </ol>
            </div>
          </PapanPutihFull>
        )

      case 'gerak-materi':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 text-base md:text-lg lg:text-2xl leading-relaxed space-y-3">
              <p><span className="font-bold">Gerak</span> adalah perubahan posisi suatu objek yang diamati dari suatu titik acuan. Posisi merupakan kedudukan suatu benda terhadap titik acuan. Sembarang titik yang dipakai sebagai patokan untuk menentukan posisi suatu benda disebut titik acuan.</p>
              <p>Makhluk hidup bergerak dengan kemauan dirinya sendiri untuk mencari makanan. Lemari bergerak karena didorong. Gerak semua benda tersebut memerlukan perpindahan dari satu posisi ke posisi lainnya, atau panjang lintasan yang dilalui gerak benda yang dikenal dengan jarak tempuh.</p>
            </div>
          </PapanPutihFull>
        )

      case 'jarak-perpindahan':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 text-base md:text-lg lg:text-2xl leading-relaxed space-y-3">
              <p><span className="font-bold">Jarak</span> adalah panjang lintasan yang ditempuh oleh suatu benda. Jarak merupakan besaran skalar (hanya memiliki nilai tanpa arah).</p>
              <p className="italic text-gray-500">Contoh: Putri berlari sejauh 10 m.</p>
              <p><span className="font-bold">Perpindahan</span> adalah perubahan kedudukan suatu benda pada selang waktu tertentu. Perpindahan merupakan besaran vektor (memiliki nilai dan arah).</p>
              <p className="italic text-gray-500">Contoh: Desri pergi ke sekolah sejauh 25 km dari rumah.</p>
            </div>
          </PapanPutihFull>
        )

      case 'kelajuan-kecepatan':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 text-base md:text-lg lg:text-2xl leading-relaxed space-y-3">
              <p><span className="font-bold">Kelajuan</span> adalah seberapa cepat jarak ditempuh dalam waktu tertentu tanpa memperhitungkan arah. Kelajuan termasuk besaran skalar.</p>
              <p><span className="font-bold">Kecepatan</span> adalah besarnya perpindahan per satuan waktu. Kecepatan adalah besaran vektor yang memiliki nilai, satuan, dan arah.</p>
            </div>
          </PapanPutihFull>
        )

      case 'rumus-gerak':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 text-base md:text-lg lg:text-2xl leading-relaxed space-y-3">
              <p>Dengan membandingkan jarak tempuh terhadap waktu, kamu akan mendapatkan nilai kelajuan sebuah benda. Kelajuan dapat ditulis dalam persamaan:</p>
              <div className="bg-gray-100 rounded-lg p-3 text-center text-2xl md:text-3xl font-bold tracking-wide">
                v = s / t
              </div>
              <ul className="space-y-1">
                <li><span className="font-bold">v</span> = Kelajuan (m/s)</li>
                <li><span className="font-bold">s</span> = Jarak tempuh (m)</li>
                <li><span className="font-bold">t</span> = Waktu (s)</li>
              </ul>
            </div>
          </PapanPutihFull>
        )

      case 'tabel-pengamatan-gerak':
        return (
          <PapanPutihFull>
            <img src="/assets/elemen/Gerak/Tabel Pengamatan.png" alt="Tabel Pengamatan" className="w-full h-full object-contain" />
          </PapanPutihFull>
        )

      case 'analisis-yuk-gerak':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gerak/Analisis Yuk.png" characterAlt="Analisis Yuk">
            <div className="w-full h-full flex flex-col justify-center overflow-y-auto">
              <img src="/assets/elemen/Gerak/Analisis Yuk 1.png" alt="Analisis Yuk 1" className="w-full object-contain" />
              <img src="/assets/elemen/Gerak/Analisis Yuk 2.png" alt="Analisis Yuk 2" className="w-full object-contain" />
            </div>
          </CharacterAndBoard>
        )

      case 'mari-simpulkan-gerak':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gerak/Mari Simpulkan.png" characterAlt="Mari Simpulkan">
            <div className="w-full h-full flex flex-col justify-center overflow-y-auto">
              <img src="/assets/elemen/Gerak/Mari Simpulkan 1.png" alt="Mari Simpulkan 1" className="w-[80%] object-contain" />
              <img src="/assets/elemen/Gerak/Mari Simpulkan 2.png" alt="Mari Simpulkan 2" className="w-full object-contain" />
            </div>
          </CharacterAndBoard>
        )

      // ════════════════ GAYA ════════════════

      case 'gaya-simak':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gaya/Ayo Simak.png" characterAlt="Ayo Simak" boardInset="6%">
            <div className="flex justify-center items-center h-full w-full">
              <video ref={videoRef} src="/assets/elemen/Gaya/Video orang dorong.mp4"
                controls playsInline className="w-full lg:h-[60%] h-[90%] object-contain bg-black" />
            </div>
          </CharacterAndBoard>
        )

      case 'gaya-bertanya':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gaya/Ayo bertanya.png" characterAlt="Ayo Bertanya">
            <div className="w-full h-full flex flex-col justify-center overflow-y-auto">
              <img src="/assets/elemen/Gaya/Ayo bertanya 1.png" alt="Pertanyaan 1" className="w-full object-contain" />
              <img src="/assets/elemen/Gaya/Ayo bertanya 2.png" alt="Pertanyaan 2" className="w-full object-contain" />
            </div>
          </CharacterAndBoard>
        )

      case 'gaya-coba-tebak':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gaya/Coba Tebak.png" characterAlt="Coba Tebak" boardInset="8%">
            <img src="/assets/elemen/Gaya/Coba Tebak 1.png" alt="Coba Tebak" className="w-full h-full object-contain" />
          </CharacterAndBoard>
        )

      case 'gaya-coba-tebak-pertanyaan':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 p-2">
              <h3 className="text-center text-xl lg:text-3xl font-bold mb-3">COBA TEBAK</h3>
              <ol className="list-decimal list-inside space-y-3 text-base md:text-lg lg:text-2xl leading-snug">
                <li>Menurut dugaanmu, apa yang terjadi jika gaya dorong diperbesar?</li>
                <li>Bagaimana dugaanmu jika massa benda diperbesar?</li>
                <li>Menurut pendapatmu, apa hubungan gaya dengan percepatan?</li>
              </ol>
            </div>
          </PapanPutihFull>
        )

      case 'materi-gaya':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 text-base md:text-lg lg:text-2xl leading-relaxed space-y-3">
              <p><span className="font-bold">Gaya</span> adalah sesuatu berupa dorongan atau tarikan yang dapat menyebabkan benda bergeak. Tidak hanya itu, gaya juga dapat menyebabkan perubahan arah, bentuk dan kecepatan sebuah benda. Gaya dapat mengubah arah gerak, maka gaya termasuk besaran vektor.</p>
              <p>Ada berbagai macam gaya yang dapat langsung kita rasakan dalam kehidupan sehari-hari. Dapakah kamu menyebutkan contoh-contoh gaya otot, gaya pegas, gaya magnet, gaya mesin, gaya listrik, gaya gravitasi dan gaya gesekan.</p>
            </div>
          </PapanPutihFull>
        )

      case 'newton':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 text-base md:text-lg lg:text-2xl leading-relaxed space-y-3">
              <p>Pada abad ke-17 atau sekitar tahun 1600-an, seorang pemikir sekaligus ilmuan bernama Isaac Newton merumuskan hukum-hukum gerak yang sangat luar biasa. Newton menemukan bahwa persoalan gerak yang terjadi di alam semesta dapat diterangkan dengan hanya tiga hukum yang sederhana.</p>
            </div>
          </PapanPutihFull>
        )

      case 'hukum-newton-i':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 text-base md:text-lg lg:text-2xl leading-relaxed space-y-3">
              <h3 className="font-bold text-lg md:text-xl">Hukum Newton I</h3>
              <p>
                Jika resultan atau jumlah gaya-gaya yang bekerja pada benda bernilai nol atau tidak ada gaya yang bekerja sama sekali pada benda, benda itu akan diam selamanya (tidak bergerak) atau akan bergerak lurus beraturan dengan kecepatan tetap. Fenomena tersebut dijabarkan dalam Hukum I Newton. Hukum tersebut berbicara tentang konsep kelembaman benda atau dikenal juga sebagai sifat kemalasan benda untuk mengubah posisinya.
              </p>
            </div>
          </PapanPutihFull>
        )

      case 'hukum-newton-ii':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 text-base md:text-lg lg:text-2xl leading-relaxed space-y-3">
              <h3 className="font-bold text-lg md:text-xl">Hukum Newton II</h3>
              <p>Hukum tersebut menyatakan bahwa benda dapat diubah keadaan geraknya jika pada benda diberi gaya. Gaya yang bekerja berkaitan langsung dengan perubahan keadaan gerak benda. Besaran penting dari Hukum II Newton adalah yang disebut sebagai percepatan. Percepatan sebuah benda sebanding dengan gaya yang diberikan pada benda tersebut dan berbanding terbalik dengan massa benda itu. Arah percepatan benda sama dengan arah gaya itu. Hukum II Newton yang dituangkan dalam rumus:
              </p>
              <p className="text-center text-2xl md:text-3xl font-bold tracking-wide italic">F = m × a</p>
              <p>F    = Gaya, dengan satuan Newton
                <br />m   = massa benda, satuan kilogram (kg)
                <br />a    = percepatan gerak benda, satuan m/s2</p>
            </div>
          </PapanPutihFull>
        )

      case 'hukum-newton-iii':
        return (
          <PapanPutihFull>
            <div className="font-oswald text-gray-800 text-base md:text-lg lg:text-2xl leading-relaxed space-y-3">
              <h3 className="font-bold text-lg md:text-xl">Hukum Newton III</h3>
              <p>
                Hukum yang mengatur konsep tersebut sering disebut dengan “Hukum Aksi-Reaksi”. Secara sederhana bunyi Hukum III Newton tersebut menyatakan, “Untuk setiap aksi gaya akan ada gaya reaksi yang sama besar tetapi berlawanan arah” Perlu ditekankan, bahwa “gaya aksi” dan “gaya reaksi” bekerja pada benda yang berbeda. Jika benda pertama melakukan gaya pada benda kedua (gaya aksi), maka benda kedua melakukan gaya yang sama besar pada benda pertama tetapi arahnya berlawanan (gaya reaksi).
              </p>
            </div>
          </PapanPutihFull>
        )

      case 'tabel-pengamatan-gaya':
        return (
          <PapanPutihFull>
            <img src="/assets/elemen/Gaya/Tabel Pengamatan.png" alt="Tabel Pengamatan" className="w-full h-full object-contain" />
          </PapanPutihFull>
        )

      case 'analisis-yuk-gaya':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gaya/Analisis Yuk.png" characterAlt="Analisis Yuk">
            <div className="w-full h-full flex flex-col justify-center overflow-y-auto">
              <img src="/assets/elemen/Gaya/Analisis Yuk 1.png" alt="Analisis Yuk 1" className="w-full object-contain" />
              <img src="/assets/elemen/Gaya/Analisis Yuk 2.png" alt="Analisis Yuk 2" className="w-full object-contain" />
            </div>
          </CharacterAndBoard>
        )

      case 'mari-simpulkan-gaya':
        return (
          <CharacterAndBoard characterSrc="/assets/elemen/Gaya/Mari Simpulkan.png" characterAlt="Mari Simpulkan">
            <div className="w-full h-full flex flex-col justify-center overflow-y-auto">
              <img src="/assets/elemen/Gaya/Mari Simpulkan 1.png" alt="Mari Simpulkan 1" className="w-[80%] object-contain" />
              <img src="/assets/elemen/Gaya/Mari Simpulkan 2.png" alt="Mari Simpulkan 2" className="w-full object-contain" />
            </div>
          </CharacterAndBoard>
        )

      // ════════════════ SHARED ════════════════

      case 'quiz': return renderQuiz()
      case 'score': return renderScore()
      default: return null
    }
  }

  // ─────────────────────────────────────────
  //  RENDER: Quiz
  // ─────────────────────────────────────────
  const renderQuiz = () => (
    <div className="w-full relative px-2 py-3 overflow-y-auto"
      style={{ height: LAYOUT.slideAreaHeight }}>

      <PapanPutihFull>
        <div className="flex flex-col justify-between h-full w-full gap-4">
          <div className='space-y-4'>
            <h3 className="font-bubblegum text-2xl md:text-3xl text-red-500 text-center mb-3 md:mb-4">
              Quiz Time!
            </h3>

            <AnimatePresence mode="wait">
              <motion.div key={quizQuestion}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>

                <p className="font-fredoka text-sm md:text-lg text-gray-800 mb-3 leading-relaxed">
                  {questions[quizQuestion].question}
                </p>

                <div className="grid grid-cols-2 gap-2 md:gap-2.5 mt-2">
                  {questions[quizQuestion].options.map((opt, i) => (
                    <motion.div key={i}
                      className={[
                        'flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 transition-colors w-full',
                        quizAnswered && opt.correct ? 'bg-green-100 border-green-500 cursor-default' :
                          quizAnswered ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-100' :
                            'bg-gray-50 border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-primary-blue',
                      ].join(' ')}
                      onClick={() => handleQuizAnswer(opt)}
                      whileHover={{ scale: quizAnswered ? 1 : 1.02 }}
                      whileTap={{ scale: quizAnswered ? 1 : 0.98 }}>
                      <img src={`/assets/elemen/${opt.label}.png`} alt={opt.label}
                        className="w-7 h-7 md:w-9 md:h-9 object-contain shrink-0" />
                      <span className="font-fredoka text-sm md:text-base text-gray-800">{opt.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-3 font-fredoka text-gray-400 text-xs md:text-sm">
            <span>Pertanyaan {quizQuestion + 1} dari {questions.length}</span>
            <span>Skor: {quizScore}</span>
          </div>

          <AnimatePresence>
            {quizResult && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-2xl z-50 gap-2"
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
                <img src={quizResult === 'correct' ? '/assets/elemen/Benar.png' : '/assets/elemen/Salah.png'}
                  alt={quizResult} className="w-16 md:w-20 h-auto object-contain" />
                <p className="font-bubblegum text-lg md:text-xl text-gray-800">
                  {quizResult === 'correct' ? 'Benar!' : 'Salah! Coba lagi'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PapanPutihFull>
    </div>
  )

  // ─────────────────────────────────────────
  //  RENDER: Score
  // ─────────────────────────────────────────
  const renderScore = () => (
    <div className="w-full relative overflow-hidden flex flex-col items-center justify-center gap-3"
      style={{ height: LAYOUT.slideAreaHeight }}>
      <PapanPutihFull>
        <div className="flex flex-col items-center justify-center h-full w-full gap-3">
          <motion.h2 className="font-bubblegum text-3xl md:text-4xl text-primary-orange drop-shadow-md"
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            KEREN!!
          </motion.h2>

          <motion.p className="font-fredoka text-base md:text-xl text-gray-500"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Kamu sudah menyelesaikan materi {topic === 'gerak' ? 'Gerak' : 'Gaya'}
          </motion.p>

          <motion.span className="font-bubblegum text-6xl md:text-7xl text-green-500 drop-shadow-md"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: 'spring' }}>
            {quizScore}
          </motion.span>

          <motion.button
            className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3
                   bg-linear-to-b from-primary-blue to-[#3572b0]
                   rounded-3xl text-white font-fredoka text-base md:text-lg
                   shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            onClick={() => click(() => navigateTo('ayo-belajar'))}
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img src="/assets/elemen/Balik Menu Utama.png" alt="" className="w-6 md:w-7 h-auto object-contain" />
            Kembali ke Ayo Belajar
          </motion.button>
        </div>
      </PapanPutihFull>
    </div>
  )

  // ─────────────────────────────────────────
  //  RENDER UTAMA
  // ─────────────────────────────────────────
  return (
    <motion.div className="w-full h-full fixed inset-0 flex flex-col overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      {/* Latar belakang */}
      <div className="absolute inset-0 -z-10">
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* ══ HEADER ══ */}
      <header className="relative shrink-0 flex items-center justify-between px-3 md:px-5 z-50"
        style={{ height: LAYOUT.headerHeight.mobile }}>

        <motion.img src="/assets/elemen/Balik Menu Utama.png" alt="Kembali"
          className="w-10 md:w-12 h-auto object-contain cursor-pointer"
          onClick={() => click(() => navigateTo('ayo-belajar'))}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />

        {showWordmark && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={topic === 'gerak' ? '/assets/elemen/Gerak/Gerak Kata.png' : '/assets/elemen/Gaya/Gaya Kata.png'}
              alt={topic} className="h-10 md:h-14 lg:h-20 w-auto object-contain"
              onError={e => { if (topic === 'gaya') e.currentTarget.src = '/assets/elemen/Gaya/Gaya.png' }}
            />
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-3">
          <motion.img src="/assets/elemen/Informasi.png" alt="Info"
            className="w-10 md:w-12 h-auto object-contain cursor-pointer"
            onClick={() => click(() => setShowProfile(true))}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
          <motion.img src="/assets/elemen/Pengaturan.png" alt="Pengaturan"
            className="w-10 md:w-12 h-auto object-contain cursor-pointer"
            onClick={() => click(() => setShowSettings(true))}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
        </div>
      </header>

      {/* ══ KONTEN ══ */}
      <main className="shrink-0 flex items-center justify-center px-3 md:px-5 overflow-hidden"
        style={{ height: LAYOUT.slideAreaHeight }}>
        <div className="w-full" style={{ maxWidth: LAYOUT.contentMaxWidth }}>
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} className="w-full flex items-center justify-center"
              initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}>
              {renderSlide()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ══ FOOTER ══ */}
      <footer className="relative shrink-0 flex items-center justify-between px-2 md:px-4 z-50"
        style={{ height: LAYOUT.footerHeight.mobile }}>

        <div className="w-16 md:w-20">
          {canGoPrev() && (
            <motion.img src="/assets/elemen/Kembali.png" alt="Previous"
              className="w-full h-auto object-contain cursor-pointer"
              onClick={goPrev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
          )}
        </div>

        <div className="flex-1 flex items-center gap-2 px-2 max-w-[360px]">
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-primary-blue to-green-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
          </div>
          <span className="text-white font-fredoka text-xs md:text-sm drop-shadow whitespace-nowrap">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        <div className="w-16 md:w-20 flex justify-end">
          {canGoNext() && (
            <motion.img src="/assets/elemen/Lanjut.png" alt="Next"
              className="w-full h-auto object-contain cursor-pointer"
              onClick={goNext} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
          )}
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showProfile && <ProfileModal onClose={() => click(() => setShowProfile(false))} />}
        {showSettings && <SettingsModal onClose={() => click(() => setShowSettings(false))} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default TopicFlow