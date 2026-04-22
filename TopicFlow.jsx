import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'

// ─────────────────────────────────────────────
//  KONFIGURASI LAYOUT – Ubah di sini saja!
// ─────────────────────────────────────────────
const LAYOUT = {
  // Tinggi header (area atas: wordmark + tombol ikon)
  headerHeight: {
    mobile: '64px',   // sm ke bawah
    desktop: '72px',  // md ke atas
  },
  // Tinggi footer (area bawah: tombol nav + progress bar)
  footerHeight: {
    mobile: '56px',
    desktop: '48px',
  },
  // Lebar maksimum area konten slide
  contentMaxWidth: '1000px',
  // Lebar maksimum papan putih (PapanPutih)
  boardMaxWidth: {
    default: '760px',
    narrow: '600px',
    wide: '980px',
  },
}

// ─────────────────────────────────────────────
//  DATA SLIDES & SOAL
// ─────────────────────────────────────────────
const GERAK_SLIDES = [
  { type: 'gerak-simak',               label: 'Ayo Simak' },
  { type: 'gerak-bertanya',            label: 'Ayo Bertanya' },
  { type: 'gerak-coba-tebak-image',    label: 'Coba Tebak' },
  { type: 'gerak-coba-tebak-pertanyaan', label: 'Coba Tebak Pertanyaan', background: '/assets/latar-slide/4.png' },
  { type: 'gerak-materi',              label: 'Materi Gerak', background: '/assets/latar-slide/2.jpg' },
  { type: 'praktikum',                 label: 'Praktikum Gerak' },
  { type: 'image', image: '/assets/elemen/Gerak/Tabel Pengamatan.png',  label: 'Tabel Pengamatan' },
  { type: 'image', image: '/assets/elemen/Gerak/Mari Simpulkan.png',    label: 'Mari Simpulkan' },
  { type: 'image', image: '/assets/elemen/Gerak/Mari Simpulkan 1.png',  label: 'Mari Simpulkan 1' },
  { type: 'image', image: '/assets/elemen/Gerak/Mari Simpulkan 2.png',  label: 'Mari Simpulkan 2' },
  { type: 'quiz',  label: 'Quiz Time' },
  { type: 'score', label: 'Skor' },
]

const GAYA_SLIDES = [
  { type: 'title', image: '/assets/elemen/Gaya/Ayo Simak.png',          label: 'Ayo Simak' },
  { type: 'video', video: '/assets/elemen/Gaya/Video orang dorong.mp4', label: 'Video Gaya' },
  { type: 'image', image: '/assets/elemen/Gaya/Ayo bertanya.png',        label: 'Ayo Bertanya' },
  { type: 'image', image: '/assets/elemen/Gaya/Ayo bertanya 1.png',      label: 'Ayo Bertanya 1' },
  { type: 'image', image: '/assets/elemen/Gaya/Ayo bertanya 2.png',      label: 'Ayo Bertanya 2' },
  { type: 'image', image: '/assets/elemen/Gaya/Analisis Yuk.png',        label: 'Analisis Yuk' },
  { type: 'image', image: '/assets/elemen/Gaya/Analisis Yuk 1.png',      label: 'Analisis Yuk 1' },
  { type: 'image', image: '/assets/elemen/Gaya/Analisis Yuk 2.png',      label: 'Analisis Yuk 2' },
  { type: 'image', image: '/assets/elemen/Gaya/Coba Tebak.png',          label: 'Coba Tebak' },
  { type: 'image', image: '/assets/elemen/Gaya/Coba Tebak 1.png',        label: 'Coba Tebak 1' },
  { type: 'praktikum', label: 'Praktikum Gaya' },
  { type: 'image', image: '/assets/elemen/Gaya/Tabel Pengamatan.png',    label: 'Tabel Pengamatan' },
  { type: 'image', image: '/assets/elemen/Gaya/Mari Simpulkan.png',      label: 'Mari Simpulkan' },
  { type: 'image', image: '/assets/elemen/Gaya/Mari Simpulkan 1.png',    label: 'Mari Simpulkan 1' },
  { type: 'image', image: '/assets/elemen/Gaya/Mari Simpulkan 2.png',    label: 'Mari Simpulkan 2' },
  { type: 'quiz',  label: 'Quiz Time' },
  { type: 'score', label: 'Skor' },
]

const GERAK_QUESTIONS = [
  {
    question: 'Apa yang dimaksud dengan gerak?',
    options: [
      { label: 'A', text: 'Perubahan posisi suatu benda terhadap titik acuan', correct: true },
      { label: 'B', text: 'Benda yang diam di tempat', correct: false },
      { label: 'C', text: 'Gaya yang bekerja pada benda', correct: false },
      { label: 'D', text: 'Bentuk benda yang berubah', correct: false },
    ],
  },
  {
    question: 'Mobil menempuh jarak 100 meter dalam waktu 20 detik. Berapa kelajuannya?',
    options: [
      { label: 'A', text: '2 m/s',  correct: false },
      { label: 'B', text: '5 m/s',  correct: true },
      { label: 'C', text: '10 m/s', correct: false },
      { label: 'D', text: '20 m/s', correct: false },
    ],
  },
  {
    question: 'Apa perbedaan kelajuan dan kecepatan?',
    options: [
      { label: 'A', text: 'Kelajuan memiliki arah, kecepatan tidak',  correct: false },
      { label: 'B', text: 'Kecepatan memiliki arah, kelajuan tidak',  correct: true },
      { label: 'C', text: 'Keduanya sama saja',                        correct: false },
      { label: 'D', text: 'Kelajuan selalu lebih besar dari kecepatan', correct: false },
    ],
  },
  {
    question: 'Benda dikatakan bergerak lurus beraturan apabila...',
    options: [
      { label: 'A', text: 'Kecepatannya berubah-ubah', correct: false },
      { label: 'B', text: 'Benda bergerak melengkung', correct: false },
      { label: 'C', text: 'Benda menempuh jarak yang sama dalam selang waktu yang sama', correct: true },
      { label: 'D', text: 'Benda diam di tempat', correct: false },
    ],
  },
  {
    question: 'Satuan kecepatan dalam Sistem Internasional (SI) adalah...',
    options: [
      { label: 'A', text: 'km/jam', correct: false },
      { label: 'B', text: 'cm/s',   correct: false },
      { label: 'C', text: 'm/s',    correct: true },
      { label: 'D', text: 'km/s',   correct: false },
    ],
  },
]

const GAYA_QUESTIONS = [
  {
    question: 'Apa yang dimaksud dengan gaya?',
    options: [
      { label: 'A', text: 'Warna suatu benda',                                    correct: false },
      { label: 'B', text: 'Dorongan atau tarikan yang diberikan pada suatu benda', correct: true },
      { label: 'C', text: 'Bentuk suatu benda',                                   correct: false },
      { label: 'D', text: 'Ukuran suatu benda',                                   correct: false },
    ],
  },
  {
    question: 'Jika dua gaya bekerja pada benda ke arah yang sama, maka kedua gaya tersebut akan...',
    options: [
      { label: 'A', text: 'Saling meniadakan',   correct: false },
      { label: 'B', text: 'Saling memperkuat',   correct: true },
      { label: 'C', text: 'Tidak berpengaruh',   correct: false },
      { label: 'D', text: 'Membuat benda pecah', correct: false },
    ],
  },
  {
    question: 'Satuan gaya dalam Sistem Internasional (SI) adalah...',
    options: [
      { label: 'A', text: 'Kilogram (kg)', correct: false },
      { label: 'B', text: 'Newton (N)',    correct: true },
      { label: 'C', text: 'Meter (m)',     correct: false },
      { label: 'D', text: 'Joule (J)',     correct: false },
    ],
  },
  {
    question: 'Benda bermassa 50 kg didorong ke kanan dengan gaya 100 N dan ke kiri 40 N. Berapakah resultan gayanya?',
    options: [
      { label: 'A', text: '140 N ke kanan', correct: false },
      { label: 'B', text: '60 N ke kanan',  correct: true },
      { label: 'C', text: '60 N ke kiri',   correct: false },
      { label: 'D', text: '40 N ke kanan',  correct: false },
    ],
  },
  {
    question: 'Gaya normal adalah...',
    options: [
      { label: 'A', text: 'Gaya yang sejajar dengan permukaan',              correct: false },
      { label: 'B', text: 'Gaya gravitasi bumi',                             correct: false },
      { label: 'C', text: 'Gaya yang tegak lurus terhadap permukaan sentuh benda', correct: true },
      { label: 'D', text: 'Gaya gesek antara dua benda',                     correct: false },
    ],
  },
]

// ─────────────────────────────────────────────
//  HELPER: Benda praktikum gaya
// ─────────────────────────────────────────────
const MASS_OBJECTS = [
  { mass: 25,  image: '/assets/elemen/Gaya/benda 25kg.png' },
  { mass: 35,  image: '/assets/elemen/Gaya/benda 35kg.png' },
  { mass: 50,  image: '/assets/elemen/Gaya/benda 50kg.png' },
  { mass: 125, image: '/assets/elemen/Gaya/benda 125kg.png' },
]

// ─────────────────────────────────────────────
//  KOMPONEN UTAMA
// ─────────────────────────────────────────────
function TopicFlow({ topic }) {
  const { navigateTo, playSound } = useApp()

  const slides    = topic === 'gerak' ? GERAK_SLIDES    : GAYA_SLIDES
  const questions = topic === 'gerak' ? GERAK_QUESTIONS : GAYA_QUESTIONS

  // ── State ──
  const [currentSlide,   setCurrentSlide]   = useState(0)
  const [quizQuestion,   setQuizQuestion]   = useState(0)
  const [quizScore,      setQuizScore]      = useState(0)
  const [quizResult,     setQuizResult]     = useState(null)   // 'correct' | 'wrong' | null
  const [quizAnswered,   setQuizAnswered]   = useState(false)
  const [praktikumDone,  setPraktikumDone]  = useState(false)
  const [showProfile,    setShowProfile]    = useState(false)
  const [showSettings,   setShowSettings]   = useState(false)

  // Gerak praktikum
  const [carPosition,  setCarPosition]  = useState(0)
  const [carMoving,    setCarMoving]    = useState(false)
  const [measurements, setMeasurements] = useState([])
  const carInterval = useRef(null)
  const startTime   = useRef(null)

  // Gaya praktikum
  const [selectedMass,  setSelectedMass]  = useState(null)
  const [appliedForce,  setAppliedForce]  = useState(0)
  const [gayaResults,   setGayaResults]   = useState([])

  const videoRef     = useRef(null)
  const scoreAudioRef = useRef(null)

  // ── Derived ──
  const slide           = slides[currentSlide]
  const backgroundImage = slide.background || '/assets/latar-slide/2.jpg'
  const showWordmark    = backgroundImage === '/assets/latar-slide/2.jpg'

  // ── Navigasi ──
  const canGoPrev = () => slide.type !== 'quiz' && slide.type !== 'score' && currentSlide > 0
  const canGoNext = () => {
    if (slide.type === 'praktikum') return praktikumDone
    if (slide.type === 'quiz' || slide.type === 'score') return false
    return currentSlide < slides.length - 1
  }

  const goNext = () => { if (canGoNext()) { playSound('click'); setCurrentSlide(i => i + 1) } }
  const goPrev = () => { if (canGoPrev()) { playSound('click'); setCurrentSlide(i => i - 1) } }
  const click  = (fn) => { playSound('click'); fn() }

  // ── Gerak Praktikum ──
  useEffect(() => () => clearInterval(carInterval.current), [])

  const startCar = () => {
    if (carMoving || measurements.length >= 3) return
    playSound('click')
    setCarMoving(true)
    setCarPosition(0)
    startTime.current = Date.now()

    const speed = 2 + Math.random() * 3
    carInterval.current = setInterval(() => {
      setCarPosition(prev => {
        const next = prev + speed
        if (next >= 100) {
          clearInterval(carInterval.current)
          setCarMoving(false)
          const elapsed  = ((Date.now() - startTime.current) / 1000).toFixed(1)
          const distance = (100 * (speed / 5)).toFixed(0)
          setMeasurements(prev => {
            const updated = [...prev, {
              trial:    prev.length + 1,
              distance: `${distance} m`,
              time:     `${elapsed} s`,
              speed:    `${(distance / elapsed).toFixed(1)} m/s`,
            }]
            if (updated.length >= 3) { setPraktikumDone(true); playSound('success') }
            return updated
          })
          return 100
        }
        return next
      })
    }, 50)
  }

  // ── Gaya Praktikum ──
  const pushObject = () => {
    if (!selectedMass) return
    playSound('click')
    const force = selectedMass.mass * 9.8
    setAppliedForce(force)
    setTimeout(() => {
      setGayaResults(prev => {
        const updated = [...prev, { mass: selectedMass.mass, force: force.toFixed(1) }]
        if (updated.length >= 4) { setPraktikumDone(true); playSound('success') }
        return updated
      })
      setSelectedMass(null)
      setAppliedForce(0)
    }, 1500)
  }

  // ── Quiz ──
  const handleQuizAnswer = (option) => {
    if (quizAnswered) return
    playSound('click')
    setQuizAnswered(true)

    if (option.correct) {
      setQuizScore(s => s + 20)
      setQuizResult('correct')
      playSound('success')
    } else {
      setQuizResult('wrong')
      playSound('error')
    }

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
      scoreAudioRef.current.play().catch(() => {})
    } catch (_) {}
    return () => {
      scoreAudioRef.current?.pause()
      scoreAudioRef.current = null
    }
  }, [slide.type])

  // ─────────────────────────────────────────
  //  SUB-KOMPONEN: Papan Putih
  //  Gunakan prop `maxWidth` untuk kontrol lebar
  // ─────────────────────────────────────────
  const PapanPutih = ({ children, maxWidth = LAYOUT.boardMaxWidth.default, inset = '7%' }) => (
    <div className="w-full flex items-end justify-center">
      <div className="relative w-full" style={{ maxWidth }}>
        <img
          src="/assets/elemen/Papan Putih.png"
          alt="Papan Putih"
          className="w-full h-auto object-contain"
        />
        {/* Area konten di dalam papan – sesuaikan `inset` jika gambar papan berubah */}
        <div
          className="absolute overflow-hidden rounded-lg"
          style={{ inset }}
        >
          {children}
        </div>
      </div>
    </div>
  )

  // ─────────────────────────────────────────
  //  SUB-KOMPONEN: Karakter kiri + Papan kanan
  //  Layout 2-kolom untuk slide bertipe "simak/bertanya"
  // ─────────────────────────────────────────
  const CharacterAndBoard = ({ characterSrc, characterAlt, boardMaxWidth, boardInset, children }) => (
    <div className="w-full flex items-end gap-0">
      {/* Karakter – lebar relatif agar fleksibel di semua ukuran layar */}
      <div className="shrink-0 w-[28vw] max-w-[160px] md:max-w-[220px] lg:max-w-[320px]">
        <img
          src={characterSrc}
          alt={characterAlt}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Papan – mengisi sisa ruang */}
      <div className="flex-1 min-w-0">
        <PapanPutih maxWidth={boardMaxWidth} inset={boardInset}>
          {children}
        </PapanPutih>
      </div>
    </div>
  )

  // ─────────────────────────────────────────
  //  RENDER SLIDE
  // ─────────────────────────────────────────
  const renderSlide = () => {
    switch (slide.type) {

      // ── Gerak: Ayo Simak (video + karakter) ──
      case 'gerak-simak':
        return (
          <CharacterAndBoard
            characterSrc="/assets/elemen/Gaya/Ayo Simak.png"
            characterAlt="Ayo Simak"
            boardMaxWidth={LAYOUT.boardMaxWidth.default}
            boardInset="6%"
          >
            <video
              ref={videoRef}
              src="/assets/elemen/Gerak/Animasi mobil Bergerak.mp4"
              controls
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          </CharacterAndBoard>
        )

      // ── Gerak: Ayo Bertanya (dua gambar + karakter) ──
      case 'gerak-bertanya':
        return (
          <CharacterAndBoard
            characterSrc="/assets/elemen/Gerak/Ayo bertanya.png"
            characterAlt="Ayo Bertanya"
            boardMaxWidth={LAYOUT.boardMaxWidth.default}
            boardInset="7%"
          >
            <div className="w-full h-full flex flex-col overflow-y-auto">
              <img src="/assets/elemen/Gaya/Ayo bertanya 1.png" alt="Ayo bertanya 1" className="w-full object-contain" />
              <img src="/assets/elemen/Gaya/Ayo bertanya 2.png" alt="Ayo bertanya 2" className="w-full object-contain" />
            </div>
          </CharacterAndBoard>
        )

      // ── Gerak: Coba Tebak gambar + karakter ──
      case 'gerak-coba-tebak-image':
        return (
          <CharacterAndBoard
            characterSrc="/assets/elemen/Gerak/Coba Tebak.png"
            characterAlt="Coba Tebak"
            boardMaxWidth={LAYOUT.boardMaxWidth.default}
            boardInset="8%"
          >
            <img src="/assets/elemen/Gaya/Coba Tebak 1.png" alt="Coba Tebak 1" className="w-full h-full object-contain" />
          </CharacterAndBoard>
        )

      // ── Gerak: Coba Tebak pertanyaan (full-width papan) ──
      case 'gerak-coba-tebak-pertanyaan':
        return (
          <PapanPutih maxWidth={LAYOUT.boardMaxWidth.wide} inset="8%">
            <div className="w-full h-full overflow-y-auto p-2">
              <p className="font-oswald text-gray-800 text-sm md:text-lg leading-relaxed whitespace-pre-line">
                {`Coba Tebak\n1. Menurutmu, mengapa dua mobil yang menempuh lintasan sama bisa sampai pada waktu yang berbeda?\n2. Jika jarak diperbesar tetapi waktu tetap, bagaimana dugaanmu tentang kelajuan?\n3. Menurut pendapatmu, faktor apa yang memengaruhi kelajuan mobil?`}
              </p>
            </div>
          </PapanPutih>
        )

      // ── Gerak: Materi (full-width papan) ──
      case 'gerak-materi':
        return (
          <PapanPutih maxWidth={LAYOUT.boardMaxWidth.wide} inset="8%">
            <div className="w-full h-full overflow-y-auto p-2">
              <p className="font-oswald text-gray-800 text-sm md:text-lg leading-relaxed whitespace-pre-line">
                {`Gerak adalah perubahan posisi suatu objek yang diamati dari suatu titik acuan. Posisi merupakan kedudukan suatu benda terhadap titik acuan. Sembarang titik yang dipakai sebagai patokan untuk menetukan posisi suatu benda disebut dengan titik acuan.\n\nMakhluk hidup bergerak dengan kemauan dirinya sendiri untuk mencari makanan. Lemari bergerak karena didorong. Gerak semua benda tersebut memerlukan besar perpindahan yang diperlukan dari satu posisi ke posisi lainnya atau panjang lintasan yang dilalui gerak benda yang dikenal dengan jarak tempuh`}
              </p>
            </div>
          </PapanPutih>
        )

      // ── Gambar / Judul statis ──
      case 'title':
      case 'image':
        return (
          <div className="w-full flex justify-center">
            <img
              src={slide.image}
              alt={slide.label}
              className="w-full max-w-full max-h-full object-contain rounded-xl"
            />
          </div>
        )

      // ── Video ──
      case 'video':
        return (
          <div className="w-full flex justify-center">
            <video
              ref={videoRef}
              src={slide.video}
              controls
              playsInline
              className="w-full max-h-full rounded-xl bg-black"
            />
          </div>
        )

      case 'praktikum':
        return topic === 'gerak' ? renderGerakPraktikum() : renderGayaPraktikum()

      case 'quiz':
        return renderQuiz()

      case 'score':
        return renderScore()

      default:
        return null
    }
  }

  // ─────────────────────────────────────────
  //  RENDER: Praktikum Gerak
  // ─────────────────────────────────────────
  const renderGerakPraktikum = () => (
    <div className="w-full flex flex-col items-center gap-3 md:gap-4 py-2">
      <h3 className="font-bubblegum text-2xl md:text-3xl text-primary-teal">
        Praktikum Gerak
      </h3>
      <p className="font-fredoka text-sm md:text-base text-gray-500 text-center max-w-sm md:max-w-lg">
        Jalankan mobil dan amati jarak, waktu, serta kelajuannya. Lakukan 3 percobaan!
      </p>

      {/* Track mobil */}
      <div className="w-full max-w-[680px] px-3 pb-6">
        <div className="relative h-16 md:h-20 bg-gradient-to-b from-gray-500 to-gray-400 rounded-lg">
          {/* Penanda jarak */}
          {[0, 25, 50, 75, 100].map(pos => (
            <span
              key={pos}
              className="absolute -bottom-5 text-[0.65rem] text-gray-500 font-fredoka -translate-x-1/2"
              style={{ left: `${pos}%` }}
            >
              {pos}m
            </span>
          ))}
          {/* Mobil */}
          <motion.img
            src="/assets/elemen/Gerak/Mobil.png"
            alt="Mobil"
            className="absolute bottom-1 w-14 md:w-[70px] h-auto -translate-x-1/2 drop-shadow-md"
            animate={{ left: `${carPosition}%` }}
            transition={{ type: 'tween', duration: 0.05 }}
          />
        </div>
      </div>

      {/* Tombol jalankan */}
      <motion.button
        className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-b from-primary-blue to-[#3572b0]
                   rounded-3xl text-white font-fredoka text-base md:text-lg
                   shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                   disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={startCar}
        disabled={carMoving || measurements.length >= 3}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {carMoving
          ? 'Mobil Bergerak...'
          : measurements.length >= 3
            ? 'Selesai!'
            : `Jalankan Mobil (${measurements.length + 1}/3)`}
      </motion.button>

      {/* Tabel pengamatan */}
      {measurements.length > 0 && (
        <div className="w-full max-w-sm md:max-w-[500px] overflow-x-auto">
          <table className="w-full border-collapse font-fredoka text-xs md:text-sm">
            <thead>
              <tr className="bg-primary-teal text-white">
                {['Percobaan', 'Jarak', 'Waktu', 'Kelajuan'].map(h => (
                  <th key={h} className="p-1.5 md:p-2 text-center">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {measurements.map(m => (
                <tr key={m.trial} className="border-b border-gray-200 even:bg-black/[0.03]">
                  <td className="p-1.5 text-center text-gray-800">{m.trial}</td>
                  <td className="p-1.5 text-center text-gray-800">{m.distance}</td>
                  <td className="p-1.5 text-center text-gray-800">{m.time}</td>
                  <td className="p-1.5 text-center text-gray-800">{m.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tombol lanjut */}
      {praktikumDone && (
        <motion.button
          className="px-8 py-3 bg-gradient-to-b from-green-500 to-green-600
                     rounded-3xl text-white font-fredoka text-lg
                     shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          onClick={goNext}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Lanjut →
        </motion.button>
      )}
    </div>
  )

  // ─────────────────────────────────────────
  //  RENDER: Praktikum Gaya
  // ─────────────────────────────────────────
  const renderGayaPraktikum = () => (
    <div className="w-full flex flex-col items-center gap-3 md:gap-4 py-2">
      <h3 className="font-bubblegum text-2xl md:text-3xl text-primary-teal">
        Praktikum Gaya
      </h3>
      <p className="font-fredoka text-sm md:text-base text-gray-500 text-center max-w-sm md:max-w-lg">
        Pilih benda, lalu dorong untuk mengukur gaya yang diperlukan (W = m × g)
      </p>

      {/* Grid benda */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 w-full max-w-[580px]">
        {MASS_OBJECTS.map(obj => {
          const tested   = gayaResults.find(r => r.mass === obj.mass)
          const selected = selectedMass?.mass === obj.mass
          return (
            <motion.div
              key={obj.mass}
              className={[
                'bg-gradient-to-b from-[#f8f4e8] to-[#e8dcc8]',
                'border-2 rounded-2xl p-2 md:p-3',
                'flex flex-col items-center gap-1.5',
                'transition-colors',
                tested
                  ? 'border-green-500 opacity-70 cursor-default'
                  : selected
                    ? 'border-red-500 shadow-[0_0_15px_rgba(231,76,60,0.3)] cursor-pointer'
                    : 'border-gray-300 cursor-pointer',
              ].join(' ')}
              onClick={() => !tested && !appliedForce && setSelectedMass(obj)}
              whileHover={{ scale: tested ? 1 : 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={obj.image}
                alt={`${obj.mass} kg`}
                className="w-12 h-12 md:w-[70px] md:h-[70px] object-contain"
              />
              <span className="font-fredoka font-semibold text-xs md:text-sm text-gray-800">
                {obj.mass} kg
              </span>
              {tested && (
                <span className="font-fredoka text-[0.65rem] md:text-xs text-green-500 font-semibold">
                  F = {tested.force} N
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Tombol dorong */}
      {selectedMass && (
        <div className="flex flex-col items-center gap-2">
          <p className="font-fredoka text-sm md:text-base text-gray-500">
            Benda {selectedMass.mass} kg dipilih
          </p>
          <motion.button
            className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-b from-red-500 to-red-600
                       rounded-3xl text-white font-fredoka text-base md:text-lg
                       shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            onClick={pushObject}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {appliedForce ? `Gaya: ${appliedForce.toFixed(1)} N` : 'Dorong Benda →'}
          </motion.button>
        </div>
      )}

      {/* Tabel hasil */}
      {gayaResults.length > 0 && (
        <div className="w-full max-w-sm md:max-w-[500px] overflow-x-auto">
          <table className="w-full border-collapse font-fredoka text-xs md:text-sm">
            <thead>
              <tr className="bg-primary-teal text-white">
                {['Benda', 'Massa (kg)', 'Gaya (N)'].map(h => (
                  <th key={h} className="p-1.5 md:p-2 text-center">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gayaResults.map((r, i) => (
                <tr key={i} className="border-b border-gray-200 even:bg-black/[0.03]">
                  <td className="p-1.5 text-center text-gray-800">{i + 1}</td>
                  <td className="p-1.5 text-center text-gray-800">{r.mass}</td>
                  <td className="p-1.5 text-center text-gray-800">{r.force}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tombol lanjut */}
      {praktikumDone && (
        <motion.button
          className="px-8 py-3 bg-gradient-to-b from-green-500 to-green-600
                     rounded-3xl text-white font-fredoka text-lg
                     shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          onClick={goNext}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Lanjut →
        </motion.button>
      )}
    </div>
  )

  // ─────────────────────────────────────────
  //  RENDER: Quiz
  // ─────────────────────────────────────────
  const renderQuiz = () => (
    <div className="w-full relative px-1 py-2">
      <h3 className="font-bubblegum text-2xl md:text-3xl text-red-500 text-center mb-3 md:mb-4">
        Quiz Time!
      </h3>

      <AnimatePresence mode="wait">
        <motion.div
          key={quizQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <p className="font-fredoka text-sm md:text-lg text-gray-800 mb-3 md:mb-4 leading-relaxed">
            {quizQuestion + 1}. {questions[quizQuestion].question}
          </p>

          <div className="flex flex-col gap-2 md:gap-2.5">
            {questions[quizQuestion].options.map((opt, i) => (
              <motion.div
                key={i}
                className={[
                  'flex items-center gap-2 md:gap-3',
                  'px-3 md:px-4 py-2 md:py-3',
                  'rounded-xl border-2 transition-colors',
                  quizAnswered && opt.correct
                    ? 'bg-green-100 border-green-500 cursor-default'
                    : quizAnswered
                      ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-100'
                      : 'bg-gray-50 border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-primary-blue',
                ].join(' ')}
                onClick={() => handleQuizAnswer(opt)}
                whileHover={{ scale: quizAnswered ? 1 : 1.02 }}
                whileTap={{ scale: quizAnswered ? 1 : 0.98 }}
              >
                <img
                  src={`/assets/elemen/${opt.label}.png`}
                  alt={opt.label}
                  className="w-7 h-7 md:w-9 md:h-9 object-contain shrink-0"
                />
                <span className="font-fredoka text-sm md:text-base text-gray-800">
                  {opt.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Status skor */}
      <div className="flex justify-between mt-3 md:mt-4 font-fredoka text-gray-400 text-xs md:text-sm">
        <span>Pertanyaan {quizQuestion + 1} dari {questions.length}</span>
        <span>Skor: {quizScore}</span>
      </div>

      {/* Overlay hasil jawaban */}
      <AnimatePresence>
        {quizResult && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center
                       bg-white/90 rounded-2xl z-50 gap-2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <img
              src={quizResult === 'correct' ? '/assets/elemen/Benar.png' : '/assets/elemen/Salah.png'}
              alt={quizResult}
              className="w-16 md:w-20 h-auto object-contain"
            />
            <p className="font-bubblegum text-lg md:text-xl text-gray-800">
              {quizResult === 'correct' ? 'Benar!' : 'Salah! Coba lagi'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  // ─────────────────────────────────────────
  //  RENDER: Score
  // ─────────────────────────────────────────
  const renderScore = () => (
    <div className="w-full py-4 text-center relative overflow-hidden">
      <motion.h2
        className="font-bubblegum text-3xl md:text-4xl text-primary-orange drop-shadow-md"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        KEREN!!
      </motion.h2>

      <motion.p
        className="font-fredoka text-base md:text-xl text-gray-500 my-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Kamu sudah menyelesaikan materi {topic === 'gerak' ? 'Gerak' : 'Gaya'}
      </motion.p>

      <motion.div
        className="my-4 md:my-5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      >
        <span className="font-bubblegum text-6xl md:text-7xl text-green-500 drop-shadow-md">
          {quizScore}
        </span>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3
                     bg-gradient-to-b from-primary-blue to-[#3572b0]
                     rounded-3xl text-white font-fredoka text-base md:text-lg
                     shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          onClick={() => click(() => navigateTo('ayo-belajar'))}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/assets/elemen/Balik Menu Utama.png" alt="" className="w-6 md:w-[30px] h-auto object-contain" />
          Kembali ke Ayo Belajar
        </motion.button>
      </motion.div>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#f39c12','#e74c3c','#3498db','#2ecc71','#9b59b6'][i % 5],
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: '100vh', opacity: [0, 1, 1, 0], rotate: Math.random() * 360 }}
            transition={{
              duration:     3 + Math.random() * 2,
              delay:        Math.random() * 2,
              repeat:       Infinity,
              repeatDelay:  Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  )

  // ─────────────────────────────────────────
  //  TINGGI HEADER & FOOTER (inline vars)
  //  Menggunakan LAYOUT config di atas
  // ─────────────────────────────────────────
  const headerH = `clamp(64px, ${LAYOUT.headerHeight.mobile}, ${LAYOUT.headerHeight.desktop})`
  const footerH = `clamp(48px, ${LAYOUT.footerHeight.mobile}, ${LAYOUT.footerHeight.desktop})`

  // ─────────────────────────────────────────
  //  RENDER UTAMA
  // ─────────────────────────────────────────
  return (
    <motion.div
      className="w-full h-full fixed inset-0 flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ── Latar ── */}
      <div className="absolute inset-0 -z-10">
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* ══════════════════════════════════════
          HEADER  (fixed height, z-50)
          ══════════════════════════════════════ */}
      <header
        className="relative shrink-0 flex items-center justify-between px-3 md:px-5 z-50"
        style={{ height: headerH }}
      >
        {/* Tombol kembali ke menu */}
        <motion.img
          src="/assets/elemen/Balik Menu Utama.png"
          alt="Kembali"
          className="w-10 md:w-12 h-auto object-contain cursor-pointer"
          onClick={() => click(() => navigateTo('ayo-belajar'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />

        {/* Wordmark topik – hanya tampil di background default */}
        {showWordmark && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={topic === 'gerak'
                ? '/assets/elemen/Gerak/Gerak Kata.png'
                : '/assets/elemen/Gaya/Gaya Kata.png'}
              alt={topic === 'gerak' ? 'Gerak' : 'Gaya'}
              className="h-10 md:h-14 lg:h-20 w-auto object-contain"
              onError={e => {
                if (topic === 'gaya') e.currentTarget.src = '/assets/elemen/Gaya/Gaya.png'
              }}
            />
          </div>
        )}

        {/* Tombol profil & pengaturan */}
        <div className="flex items-center gap-2 md:gap-3">
          <motion.img
            src="/assets/elemen/Informasi.png"
            alt="Info"
            className="w-10 md:w-12 h-auto object-contain cursor-pointer"
            onClick={() => click(() => setShowProfile(true))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.img
            src="/assets/elemen/Pengaturan.png"
            alt="Pengaturan"
            className="w-10 md:w-12 h-auto object-contain cursor-pointer"
            onClick={() => click(() => setShowSettings(true))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>
      </header>

      {/* ══════════════════════════════════════
          KONTEN SLIDE  (flex-1, scrollable)
          ══════════════════════════════════════ */}
      <main className="flex-1 min-h-0 flex items-center justify-center px-3 md:px-5 overflow-y-auto">
        <div className="w-full" style={{ maxWidth: LAYOUT.contentMaxWidth }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="w-full"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
            >
              {renderSlide()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ══════════════════════════════════════
          FOOTER  (fixed height, z-50)
          Berisi: tombol prev/next + progress bar
          ══════════════════════════════════════ */}
      <footer
        className="relative shrink-0 flex items-center justify-between px-2 md:px-4 z-50"
        style={{ height: footerH }}
      >
        {/* Tombol kembali */}
        <div className="w-16 md:w-20">
          {canGoPrev() && (
            <motion.img
              src="/assets/elemen/Kembali.png"
              alt="Previous"
              className="w-full h-auto object-contain cursor-pointer"
              onClick={goPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          )}
        </div>

        {/* Progress bar (tengah) */}
        <div className="flex-1 flex items-center gap-2 px-2 max-w-[360px]">
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-blue to-green-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
          <span className="text-white font-fredoka text-xs md:text-sm drop-shadow whitespace-nowrap">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Tombol lanjut */}
        <div className="w-16 md:w-20 flex justify-end">
          {canGoNext() && (
            <motion.img
              src="/assets/elemen/Lanjut.png"
              alt="Next"
              className="w-full h-auto object-contain cursor-pointer"
              onClick={goNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          )}
        </div>
      </footer>

      {/* ── Modals ── */}
      <AnimatePresence>
        {showProfile  && <ProfileModal  onClose={() => click(() => setShowProfile(false))} />}
        {showSettings && <SettingsModal onClose={() => click(() => setShowSettings(false))} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default TopicFlow
