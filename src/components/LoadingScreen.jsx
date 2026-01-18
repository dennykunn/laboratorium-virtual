/**
 * ============================================================================
 * LOADING-SCREEN.JSX - HALAMAN LOADING AWAL
 * ============================================================================
 * 
 * Halaman pertama yang muncul saat aplikasi dibuka.
 * 
 * Fitur:
 * - Menampilkan logo "Gerak & Gaya"
 * - Menampilkan loading bar animasi
 * - Otomatis pindah ke Start Screen setelah 4 detik
 * - Ada tombol "Lewati" untuk skip loading
 * 
 * ============================================================================
 */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../App'
import './LoadingScreen.css'

function LoadingScreen() {
  // Ambil fungsi navigasi dari Context
  const { navigateTo } = useApp()
  
  // useRef untuk menyimpan referensi ke video (jika digunakan)
  const videoRef = useRef(null)

  /**
   * useEffect untuk auto-navigate setelah loading selesai
   * 
   * setTimeout akan menjalankan navigateTo('start') setelah 4 detik
   * Cleanup function (return) membatalkan timeout jika komponen di-unmount
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigateTo('start')  // Pindah ke halaman start
    }, 4000)  // 4000 ms = 4 detik
    
    // Cleanup: batalkan timeout jika user keluar lebih awal
    return () => {
      clearTimeout(timeout)
    }
  }, [navigateTo])  // Dependency: navigateTo

  /**
   * handleSkip - Handler untuk tombol Lewati
   * Langsung pindah ke Start Screen tanpa menunggu
   */
  const handleSkip = () => {
    navigateTo('start')
  }

  return (
    <motion.div 
      className="screen loading-screen"
      initial={{ opacity: 0 }}      // Mulai transparan
      animate={{ opacity: 1 }}       // Fade in
      exit={{ opacity: 0 }}          // Fade out saat keluar
    >
      {/* Background Loading */}
      <div className="loading-background">
        <img 
          src="/assets/latar-slide/1.jpg" 
          alt="Background"
          className="loading-bg-image"
        />
      </div>
      
      {/* Konten Loading */}
      <div className="loading-content">
        {/* Logo "Gerak & Gaya" dengan animasi pulse */}
        <motion.div 
          className="loading-logo"
          initial={{ scale: 0.8, opacity: 0 }}  // Mulai kecil dan transparan
          animate={{ scale: 1, opacity: 1 }}    // Membesar dan muncul
          transition={{ duration: 0.5 }}
        >
          <img 
            src="/assets/elemen/Gerak & Gaya.png" 
            alt="Gerak & Gaya"
            className="logo-gerak-gaya"
          />
        </motion.div>
        
        {/* Subtitle "IPA SMP/MTs Kelas VII" */}
        <motion.div 
          className="loading-subtitle"
          initial={{ y: 20, opacity: 0 }}   // Mulai di bawah
          animate={{ y: 0, opacity: 1 }}    // Naik ke posisi normal
          transition={{ delay: 0.3, duration: 0.5 }}  // Delay 0.3 detik
        >
          <img 
            src="/assets/elemen/IPA-SMPMTs kelas VII.png" 
            alt="IPA SMP/MTs Kelas VII"
            className="subtitle-image"
          />
        </motion.div>
        
        {/* Loading Bar - Progress bar animasi */}
        <motion.div 
          className="loading-bar-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="loading-bar">
            {/* 
             * Bar yang bergerak dari 0% ke 100%
             * Durasi 3.5 detik (sedikit kurang dari 4 detik total)
             */}
            <motion.div 
              className="loading-bar-fill"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.5, ease: 'linear' }}
            />
          </div>
          <p className="loading-text">Memuat...</p>
        </motion.div>
      </div>

      {/* Tombol Lewati - Untuk skip loading */}
      <motion.button 
        className="skip-button" 
        onClick={handleSkip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}  // Muncul setelah 1 detik
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Lewati →
      </motion.button>
    </motion.div>
  )
}

export default LoadingScreen
