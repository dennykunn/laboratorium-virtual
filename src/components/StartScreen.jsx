/**
 * ============================================================================
 * START-SCREEN.JSX - HALAMAN AWAL/START
 * ============================================================================
 * 
 * Halaman ini muncul setelah loading screen. Menampilkan:
 * - Logo Universitas Muhammadiyah Riau
 * - Judul "Laboratorium Virtual"
 * - Subjudul "Gerak & Gaya"
 * - Tombol Play untuk masuk ke menu utama
 * - Tombol Info, Settings, dan Exit di header
 * 
 * ============================================================================
 */

// Import React hooks
import { useState } from 'react'

// Import Framer Motion untuk animasi
import { motion, AnimatePresence } from 'framer-motion'

// Import context dari App untuk akses fungsi global
import { useApp } from '../App'

// Import komponen modal (popup)
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'

// Import file CSS untuk styling
import './StartScreen.css'

/**
 * StartScreen Component
 * 
 * Komponen ini tidak menerima props karena semua data diambil dari Context.
 * State lokal hanya digunakan untuk mengontrol visibilitas modal.
 */
function StartScreen() {
  // ==========================================================================
  // CONTEXT - Mengambil fungsi dari App Context
  // ==========================================================================
  
  /**
   * navigateTo - Fungsi untuk pindah ke halaman lain
   * playSound - Fungsi untuk memainkan sound effect
   */
  const { navigateTo, playSound } = useApp()
  
  // ==========================================================================
  // STATE LOKAL - Untuk mengontrol tampilan modal
  // ==========================================================================
  
  /**
   * showProfile - Mengontrol tampilan modal profil pengembang
   * showSettings - Mengontrol tampilan modal pengaturan suara
   * showExit - Mengontrol tampilan modal konfirmasi keluar
   */
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)

  // ==========================================================================
  // EVENT HANDLERS - Fungsi yang dipanggil saat user melakukan aksi
  // ==========================================================================
  
  /**
   * handleButtonClick - Menangani klik tombol dengan sound effect
   * @param {function} action - Fungsi yang akan dijalankan setelah sound
   */
  const handleButtonClick = (action) => {
    playSound('click')  // Mainkan suara klik
    action()            // Jalankan aksi (misal: buka modal)
  }

  // ==========================================================================
  // JSX RETURN - Tampilan komponen
  // ==========================================================================
  
  return (
    /**
     * motion.div adalah div dengan kemampuan animasi dari Framer Motion
     * 
     * Props animasi:
     * - initial: kondisi awal saat komponen muncul
     * - animate: kondisi akhir (akan di-animasikan dari initial)
     * - exit: kondisi saat komponen hilang
     */
    <motion.div 
      className="screen start-screen"
      initial={{ opacity: 0 }}      // Mulai dari transparan
      animate={{ opacity: 1 }}       // Fade in ke terlihat
      exit={{ opacity: 0 }}          // Fade out saat keluar
    >
      {/* ================================================================== */}
      {/* BACKGROUND - Gambar latar belakang */}
      {/* ================================================================== */}
      <div className="start-background">
        <img 
          src="/assets/latar-slide/2.jpg" 
          alt="Background"
          className="start-bg-image"
        />
      </div>

      {/* ================================================================== */}
      {/* HEADER KIRI - Logo dan nama universitas */}
      {/* ================================================================== */}
      <div className="header-left">
        <img 
          src="/assets/latar-slide/1.jpg" 
          alt="Logo UMRI"
          className="university-logo"
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%',    // Membuat gambar bulat
            objectFit: 'cover',     // Memotong gambar agar pas
            objectPosition: 'center top'
          }}
        />
        <div className="university-text">
          UNIVERSITAS<br />MUHAMMADIYAH<br />RIAU
        </div>
      </div>

      {/* ================================================================== */}
      {/* HEADER KANAN - Tombol aksi (Info, Settings, Exit) */}
      {/* ================================================================== */}
      <div className="header-icons">
        {/* Tombol Informasi - Membuka modal profil pengembang */}
        <motion.img 
          src="/assets/elemen/Informasi.png" 
          alt="Info"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowProfile(true))}
          whileHover={{ scale: 1.1 }}   // Membesar saat hover
          whileTap={{ scale: 0.95 }}    // Mengecil saat ditekan
        />
        
        {/* Tombol Pengaturan - Membuka modal settings */}
        <motion.img 
          src="/assets/elemen/Pengaturan.png" 
          alt="Pengaturan"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowSettings(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
        
        {/* Tombol Keluar - Membuka modal konfirmasi exit */}
        <motion.img 
          src="/assets/elemen/Keluar Game.png" 
          alt="Keluar"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowExit(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* ================================================================== */}
      {/* KONTEN UTAMA - Judul dan tombol play */}
      {/* ================================================================== */}
      <div className="start-content">
        {/* Judul "Laboratorium Virtual" dengan animasi masuk */}
        <motion.div 
          className="title-container"
          initial={{ y: -50, opacity: 0 }}    // Mulai dari atas
          animate={{ y: 0, opacity: 1 }}      // Turun ke posisi normal
          transition={{ delay: 0.2, duration: 0.5 }}  // Delay dan durasi
        >
          <img 
            src="/assets/elemen/Laboratorium Virtual.png" 
            alt="Laboratorium Virtual"
            className="title-lab-virtual"
          />
        </motion.div>

        {/* Subjudul "Gerak & Gaya" */}
        <motion.div 
          className="subtitle-container"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <img 
            src="/assets/elemen/Gerak & Gaya.png" 
            alt="Gerak & Gaya"
            className="title-gerak-gaya-img"
          />
        </motion.div>

        {/* Keterangan "IPA SMP/MTs Kelas VII" */}
        <motion.div 
          className="ipa-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <img 
            src="/assets/elemen/IPA-SMPMTs kelas VII.png" 
            alt="IPA SMP/MTs Kelas VII"
            className="ipa-subtitle-img"
          />
        </motion.div>

        {/* Tombol PLAY - Tombol utama untuk masuk ke menu */}
        <motion.div
          className="play-button-container"
          initial={{ scale: 0, opacity: 0 }}   // Mulai dari kecil
          animate={{ scale: 1, opacity: 1 }}   // Membesar ke ukuran normal
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}  // Efek spring
        >
          <motion.img 
            src="/assets/elemen/Play.png" 
            alt="Play"
            className="play-button"
            onClick={() => handleButtonClick(() => navigateTo('menu'))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            // Animasi bouncing terus-menerus
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        </motion.div>
      </div>

      {/* ================================================================== */}
      {/* MODALS - Popup yang muncul saat tombol ditekan */}
      {/* ================================================================== */}
      
      {/* 
       * AnimatePresence memungkinkan animasi exit pada komponen yang dihapus
       * Modal hanya di-render jika state-nya true
       */}
      <AnimatePresence>
        {/* Modal Profil Pengembang */}
        {showProfile && (
          <ProfileModal onClose={() => { 
            playSound('click') 
            setShowProfile(false) 
          }} />
        )}
        
        {/* Modal Pengaturan Suara */}
        {showSettings && (
          <SettingsModal onClose={() => { 
            playSound('click') 
            setShowSettings(false) 
          }} />
        )}
        
        {/* Modal Konfirmasi Keluar */}
        {showExit && (
          <ExitModal onClose={() => { 
            playSound('click') 
            setShowExit(false) 
          }} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Export komponen agar bisa digunakan di file lain
export default StartScreen
