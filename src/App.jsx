/**
 * ============================================================================
 * APP.JSX - KOMPONEN UTAMA APLIKASI LABORATORIUM VIRTUAL
 * ============================================================================
 * 
 * File ini adalah "otak" dari aplikasi. Semua halaman dan fitur dikendalikan
 * dari sini. Fungsi utamanya:
 * 
 * 1. Mengatur perpindahan antar halaman (navigasi)
 * 2. Menyimpan data global seperti skor quiz, status mute
 * 3. Menyediakan fitur fullscreen
 * 4. Mengontrol background music dan sound effects
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT - Mengambil modul/komponen yang dibutuhkan
// ============================================================================

// React hooks - fungsi bawaan React untuk mengelola state dan efek
import { useState, useEffect, createContext, useContext } from 'react'

// Framer Motion - library untuk animasi yang halus
import { AnimatePresence, motion } from 'framer-motion'

// Import semua komponen halaman (screen)
import LoadingScreen from './components/LoadingScreen'      // Halaman loading
import StartScreen from './components/StartScreen'          // Halaman start
import MainMenu from './components/MainMenu'                // Menu utama
import PanduanScreen from './components/PanduanScreen'      // Halaman panduan
import CPTPScreen from './components/CPTPScreen'            // Halaman CP & TP
import MateriScreen from './components/MateriScreen'        // Halaman materi
import PraktikumMenu from './components/PraktikumMenu'      // Menu praktikum
import PetunjukPraktikum from './components/PetunjukPraktikum'  // Petunjuk praktikum
import PraktikumLab from './components/PraktikumLab'        // Simulasi lab
import QuizScreen from './components/QuizScreen'            // Halaman quiz
import ScoreScreen from './components/ScoreScreen'          // Halaman skor

// Import fungsi-fungsi audio
import { 
  initSounds,       // Inisialisasi sistem suara
  playBgMusic,      // Memainkan background music
  stopBgMusic,      // Menghentikan background music
  setMuted as setAudioMuted,  // Mengatur mute/unmute
  playSound         // Memainkan sound effect
} from './hooks/useAudio'

// Import file CSS untuk styling
import './App.css'

// ============================================================================
// CONTEXT - Untuk berbagi data ke semua komponen tanpa harus passing props
// ============================================================================

/**
 * AppContext adalah "gudang data global" yang bisa diakses oleh semua komponen.
 * Ini seperti variabel global yang bisa dibaca dan diubah dari mana saja.
 */
export const AppContext = createContext()

/**
 * useApp adalah custom hook untuk mengakses AppContext dengan mudah.
 * Komponen lain cukup memanggil useApp() untuk mengakses data global.
 */
export const useApp = () => useContext(AppContext)

// ============================================================================
// FUNGSI FULLSCREEN - Untuk mengatur mode layar penuh
// ============================================================================

/**
 * requestFullscreen() - Meminta browser untuk masuk mode fullscreen
 * Mendukung berbagai browser: Chrome, Firefox, Safari, Edge
 */
const requestFullscreen = () => {
  const elem = document.documentElement  // Ambil elemen HTML root
  if (elem.requestFullscreen) {
    elem.requestFullscreen()  // Standar
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen()  // Safari
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen()  // Internet Explorer/Edge lama
  }
}

/**
 * exitFullscreen() - Keluar dari mode fullscreen
 */
const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

/**
 * isFullscreen() - Mengecek apakah sedang dalam mode fullscreen
 * @returns {boolean} true jika fullscreen, false jika tidak
 */
const isFullscreen = () => {
  return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement)
}

// ============================================================================
// KOMPONEN UTAMA APP
// ============================================================================

function App() {
  // ==========================================================================
  // STATE - Variabel yang nilainya bisa berubah dan mempengaruhi tampilan
  // ==========================================================================
  
  /**
   * currentScreen - Menyimpan nama halaman yang sedang aktif
   * Nilai awal: 'loading' (halaman loading)
   * Nilai yang mungkin: 'loading', 'start', 'menu', 'panduan', 'cptp', 
   *                     'materi', 'praktikum-menu', 'petunjuk-praktikum',
   *                     'praktikum-lab', 'quiz', 'score'
   */
  const [currentScreen, setCurrentScreen] = useState('loading')
  
  /**
   * isMuted - Status suara (mute/unmute)
   * true = suara dimatikan, false = suara hidup
   */
  const [isMuted, setIsMuted] = useState(false)
  
  /**
   * quizScore - Menyimpan skor quiz
   * Nilai: 0 sampai 100 (setiap soal benar = 20 poin)
   */
  const [quizScore, setQuizScore] = useState(0)
  
  /**
   * audioInitialized - Menandai apakah sistem audio sudah diinisialisasi
   * Audio hanya bisa dimulai setelah user berinteraksi (klik/tap)
   */
  const [audioInitialized, setAudioInitialized] = useState(false)
  
  /**
   * isFullscreenMode - Status mode fullscreen
   */
  const [isFullscreenMode, setIsFullscreenMode] = useState(false)

  // ==========================================================================
  // EFFECTS - Kode yang dijalankan saat kondisi tertentu terpenuhi
  // ==========================================================================

  /**
   * Effect 1: Mendengarkan perubahan status fullscreen
   * Dijalankan sekali saat komponen pertama kali dimuat
   */
  useEffect(() => {
    // Fungsi yang dipanggil saat status fullscreen berubah
    const handleFullscreenChange = () => {
      setIsFullscreenMode(isFullscreen())
    }

    // Daftarkan event listener untuk berbagai browser
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    // Cleanup: hapus event listener saat komponen di-unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])  // [] artinya hanya dijalankan sekali saat mount

  /**
   * Effect 2: Inisialisasi audio dan fullscreen saat user pertama kali klik
   * Browser modern memerlukan interaksi user sebelum memainkan audio
   */
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioInitialized) {
        // Inisialisasi sistem audio
        initSounds()
        setAudioInitialized(true)
        
        // Request fullscreen otomatis
        if (!isFullscreen()) {
          requestFullscreen()
        }
        
        // Hapus event listener karena sudah tidak diperlukan
        document.removeEventListener('click', handleFirstInteraction)
        document.removeEventListener('touchstart', handleFirstInteraction)
      }
    }

    // Daftarkan event listener untuk klik dan touch
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [audioInitialized])

  /**
   * Effect 3: Mengatur status mute pada sistem audio
   * Dijalankan setiap kali isMuted berubah
   */
  useEffect(() => {
    setAudioMuted(isMuted)
  }, [isMuted])

  /**
   * Effect 4: Memainkan background music saat keluar dari loading screen
   */
  useEffect(() => {
    // Mainkan musik jika bukan loading, audio sudah init, dan tidak mute
    if (currentScreen !== 'loading' && audioInitialized && !isMuted) {
      playBgMusic()
    }
    
    // Cleanup: hentikan musik saat kembali ke loading
    return () => {
      if (currentScreen === 'loading') {
        stopBgMusic()
      }
    }
  }, [currentScreen, audioInitialized, isMuted])

  // ==========================================================================
  // FUNGSI HANDLER - Fungsi yang dipanggil saat ada aksi dari user
  // ==========================================================================

  /**
   * navigateTo() - Pindah ke halaman lain
   * @param {string} screen - Nama halaman tujuan
   */
  const navigateTo = (screen) => {
    if (audioInitialized) {
      playSound('transition')  // Mainkan suara transisi
    }
    setCurrentScreen(screen)  // Ubah halaman aktif
  }

  /**
   * toggleMute() - Menghidupkan/mematikan suara
   */
  const toggleMute = () => {
    if (audioInitialized) {
      playSound('click')
    }
    const newMuted = !isMuted  // Toggle nilai mute
    setIsMuted(newMuted)
    
    // Jika unmute dan bukan di loading, mainkan musik
    if (!newMuted && currentScreen !== 'loading') {
      setTimeout(() => playBgMusic(), 100)
    }
  }

  /**
   * toggleFullscreen() - Masuk/keluar mode fullscreen
   */
  const toggleFullscreen = () => {
    if (audioInitialized) {
      playSound('click')
    }
    if (isFullscreen()) {
      exitFullscreen()
    } else {
      requestFullscreen()
    }
  }

  // ==========================================================================
  // CONTEXT VALUE - Data yang akan dibagikan ke semua komponen
  // ==========================================================================
  
  const contextValue = {
    currentScreen,        // Halaman aktif saat ini
    navigateTo,           // Fungsi untuk pindah halaman
    isMuted,              // Status mute
    setIsMuted,           // Fungsi untuk mengubah mute
    quizScore,            // Skor quiz
    setQuizScore,         // Fungsi untuk mengubah skor
    audioInitialized,     // Status audio sudah init atau belum
    isFullscreenMode,     // Status fullscreen
    toggleFullscreen,     // Fungsi toggle fullscreen
    playSound: (sound) => audioInitialized && playSound(sound)  // Fungsi play sound
  }

  // ==========================================================================
  // RENDER SCREEN - Menampilkan halaman berdasarkan currentScreen
  // ==========================================================================
  
  /**
   * renderScreen() - Menentukan komponen mana yang ditampilkan
   * Menggunakan switch-case untuk memilih komponen berdasarkan currentScreen
   */
  const renderScreen = () => {
    switch (currentScreen) {
      case 'loading':
        return <LoadingScreen key="loading" />
      case 'start':
        return <StartScreen key="start" />
      case 'menu':
        return <MainMenu key="menu" />
      case 'panduan':
        return <PanduanScreen key="panduan" />
      case 'cptp':
        return <CPTPScreen key="cptp" />
      case 'materi':
        return <MateriScreen key="materi" />
      case 'praktikum-menu':
        return <PraktikumMenu key="praktikum-menu" />
      case 'petunjuk-praktikum':
        return <PetunjukPraktikum key="petunjuk-praktikum" />
      case 'praktikum-lab':
        return <PraktikumLab key="praktikum-lab" />
      case 'quiz':
        return <QuizScreen key="quiz" />
      case 'score':
        return <ScoreScreen key="score" />
      default:
        return <LoadingScreen key="loading" />
    }
  }

  // ==========================================================================
  // JSX RETURN - Tampilan yang akan di-render
  // ==========================================================================
  
  return (
    // Provider membungkus semua komponen agar bisa akses contextValue
    <AppContext.Provider value={contextValue}>
      {/* Container utama aplikasi */}
      <div className="app-container">
        
        {/* AnimatePresence untuk animasi saat pergantian halaman */}
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>

        {/* Tombol kontrol di pojok kiri bawah (muncul setelah loading) */}
        {currentScreen !== 'loading' && (
          <div className="bottom-controls">
            {/* Tombol Mute/Unmute */}
            <motion.img 
              src={isMuted ? '/assets/elemen/Volume Mati.png' : '/assets/elemen/Volume Hidup.png'}
              alt="Toggle Sound"
              className="control-btn"
              onClick={toggleMute}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            />
            
            {/* Tombol Fullscreen */}
            <motion.div
              className="fullscreen-btn"
              onClick={toggleFullscreen}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title={isFullscreenMode ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreenMode ? '⊠' : '⛶'}
            </motion.div>
          </div>
        )}
      </div>
    </AppContext.Provider>
  )
}

// Export komponen agar bisa diimport di file lain
export default App
