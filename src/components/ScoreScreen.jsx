/**
 * ============================================================================
 * SCORE-SCREEN.JSX - HALAMAN TAMPILAN SKOR
 * ============================================================================
 * 
 * Halaman ini menampilkan skor akhir setelah menyelesaikan quiz.
 * 
 * Fitur:
 * - Menampilkan pesan "Keren!" sebagai ucapan selamat
 * - Menampilkan skor quiz (0-100)
 * - Animasi confetti (kertas warna-warni jatuh)
 * - Tombol untuk mengulang praktikum atau kembali ke menu
 * 
 * ============================================================================
 */

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../App'
import './ScoreScreen.css'

function ScoreScreen() {
  // Ambil fungsi dan data dari Context
  const { navigateTo, quizScore, playSound } = useApp()

  /**
   * useEffect untuk memainkan suara sukses saat halaman muncul
   * Dijalankan sekali saat komponen pertama kali di-mount
   */
  useEffect(() => {
    playSound('success')
  }, [playSound])

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  return (
    <motion.div 
      className="screen score-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="score-background">
        <img src="/assets/latar-slide/5.jpg" alt="Lab Background" className="score-bg-image" />
      </div>

      {/* Tombol kembali ke menu */}
      <div className="score-header-left">
        <motion.img 
          src="/assets/elemen/Balik Menu Utama.png" 
          alt="Menu"
          className="btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Board Skor */}
      <motion.div 
        className="score-board-container"
        // Animasi bounce saat muncul
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <div className="score-board">
          {/* Judul "KEREN!!" dengan animasi */}
          <motion.h2 
            className="score-title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            KEREN!!
          </motion.h2>
          
          {/* Pesan selamat */}
          <motion.p 
            className="score-message"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            KAMU SUDAH PAHAM DENGAN MATERI GAYA
          </motion.p>
          
          {/* Subtitle */}
          <motion.p 
            className="score-subtitle"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            DENGAN SKOR QUIZ
          </motion.p>
          
          {/* Nilai Skor - Angka besar dengan animasi */}
          <motion.div 
            className="score-value"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 150 }}
          >
            {/* 
             * quizScore adalah nilai dari Context
             * Bisa 0, 20, 40, 60, 80, atau 100
             */}
            <span>{quizScore}</span>
          </motion.div>

          {/* Tombol Aksi */}
          <motion.div 
            className="score-buttons"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {/* Tombol Ulangi Praktikum */}
            <motion.button
              className="btn-retry"
              onClick={() => handleButtonClick(() => navigateTo('praktikum-lab'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ulangi Praktikum
            </motion.button>
            
            {/* Tombol ke Menu Utama */}
            <motion.button
              className="btn-menu"
              onClick={() => handleButtonClick(() => navigateTo('menu'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Menu Utama
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Efek Confetti - Kertas warna-warni jatuh */}
      <div className="confetti-container">
        {/**
         * Membuat 20 confetti dengan posisi dan warna acak
         * [...Array(20)] membuat array dengan 20 elemen
         * map() mengulang untuk setiap elemen
         */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti"
            style={{
              // Posisi horizontal acak (0-100% dari lebar layar)
              left: `${Math.random() * 100}%`,
              // Warna acak dari 5 pilihan
              backgroundColor: ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'][Math.floor(Math.random() * 5)]
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: '100vh',  // Jatuh sampai bawah layar
              opacity: [0, 1, 1, 0],  // Fade in lalu fade out
              rotate: Math.random() * 360  // Rotasi acak
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,  // Durasi 3-5 detik (acak)
              delay: Math.random() * 2,          // Delay 0-2 detik (acak)
              repeat: Infinity,                  // Ulangi terus
              repeatDelay: Math.random() * 3     // Delay sebelum repeat
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default ScoreScreen
