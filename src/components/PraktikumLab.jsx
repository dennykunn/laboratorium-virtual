/**
 * ============================================================================
 * PRAKTIKUM-LAB.JSX - SIMULASI LABORATORIUM VIRTUAL
 * ============================================================================
 * 
 * Ini adalah komponen utama untuk simulasi praktikum magnet.
 * 
 * Cara Kerja Simulasi:
 * 1. User mengklik magnet untuk mengambilnya
 * 2. User mengklik benda untuk menguji apakah bisa ditarik magnet
 * 3. Aplikasi menunjukkan hasil (bisa/tidak bisa ditarik)
 * 4. Setelah semua benda diuji, muncul tombol untuk ke Quiz
 * 
 * Benda yang BISA ditarik magnet (magnetik):
 * - Paku (besi)
 * - Penggaris Besi
 * 
 * Benda yang TIDAK bisa ditarik (non-magnetik):
 * - Pensil (kayu)
 * - Penghapus (karet)
 * - Botol Plastik
 * - Kertas
 * 
 * ============================================================================
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import './PraktikumLab.css'

function PraktikumLab() {
  const { navigateTo, playSound } = useApp()
  
  // ==========================================================================
  // STATE
  // ==========================================================================
  
  // State untuk modal
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  /**
   * hasMagnet - Menandai apakah user sudah mengambil magnet
   * User harus mengambil magnet dulu sebelum menguji benda
   */
  const [hasMagnet, setHasMagnet] = useState(false)
  
  /**
   * selectedObject - Benda yang sedang diuji
   * Digunakan untuk menampilkan animasi pengujian
   */
  const [selectedObject, setSelectedObject] = useState(null)
  
  /**
   * testedObjects - Array ID benda yang sudah diuji
   * Untuk menandai benda yang sudah diuji (tampilan berbeda)
   */
  const [testedObjects, setTestedObjects] = useState([])
  
  /**
   * showResult - Menampilkan hasil pengujian
   * true = magnetik, false = non-magnetik, null = tidak tampil
   */
  const [showResult, setShowResult] = useState(null)
  
  /**
   * instruction - Teks instruksi untuk user
   */
  const [instruction, setInstruction] = useState('Klik magnet untuk mengambilnya')
  
  /**
   * showQuizButton - Menampilkan tombol ke quiz setelah semua diuji
   */
  const [showQuizButton, setShowQuizButton] = useState(false)

  /**
   * labObjects - Daftar benda-benda di lab
   * 
   * Properti:
   * - id: identifier unik
   * - name: nama benda
   * - image: path ke gambar
   * - magnetic: true jika bisa ditarik magnet
   */
  const labObjects = [
    { id: 'paku', name: 'Paku', image: '/assets/elemen/Paku.png', magnetic: true },
    { id: 'pensil', name: 'Pensil', image: '/assets/elemen/Pensil.png', magnetic: false },
    { id: 'penggaris', name: 'Penggaris Besi', image: '/assets/elemen/Penggaris Besi.png', magnetic: true },
    { id: 'penghapus', name: 'Penghapus', image: '/assets/elemen/Penghapus.png', magnetic: false },
    { id: 'botol', name: 'Botol Plastik', image: '/assets/elemen/Botol Plastik.png', magnetic: false },
    { id: 'kertas', name: 'Kertas', image: '/assets/elemen/Kertas.png', magnetic: false },
  ]

  /**
   * handleMagnetClick - Menangani klik pada magnet
   */
  const handleMagnetClick = () => {
    if (!hasMagnet) {
      playSound('click')
      setHasMagnet(true)  // User sekarang memegang magnet
      setInstruction('Pilih benda untuk didekatkan ke magnet')
    }
  }

  /**
   * handleObjectClick - Menangani klik pada benda
   * @param {object} obj - Objek benda yang diklik
   */
  const handleObjectClick = (obj) => {
    // Cek apakah user sudah mengambil magnet
    if (!hasMagnet) {
      playSound('error')
      setInstruction('Ambil magnet terlebih dahulu!')
      return
    }

    // Cek apakah benda sudah diuji sebelumnya
    if (testedObjects.includes(obj.id)) {
      setInstruction(`${obj.name} sudah diuji. Pilih benda lainnya.`)
      return
    }

    playSound('click')
    setSelectedObject(obj)        // Set benda yang sedang diuji
    setShowResult(obj.magnetic)   // Tampilkan hasil
    
    // Tampilkan pesan sesuai hasil
    if (obj.magnetic) {
      playSound('success')
      setInstruction(`${obj.name} dapat ditarik oleh magnet!`)
    } else {
      playSound('error')
      setInstruction(`${obj.name} tidak dapat ditarik oleh magnet`)
    }

    // Setelah 2.5 detik, lanjutkan
    setTimeout(() => {
      // Tambahkan ke daftar yang sudah diuji
      setTestedObjects(prev => [...prev, obj.id])
      setShowResult(null)
      setSelectedObject(null)
      
      // Cek apakah semua benda sudah diuji
      const newTestedCount = testedObjects.length + 1
      if (newTestedCount >= labObjects.length) {
        setInstruction('Selesai! Kamu sudah menguji semua benda. Lanjut ke Quiz!')
        setShowQuizButton(true)  // Tampilkan tombol quiz
        playSound('success')
      } else {
        setInstruction('Pilih benda lainnya untuk diuji')
      }
    }, 2500)
  }

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  return (
    <motion.div 
      className="screen lab-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Lab */}
      <div className="lab-background">
        <img src="/assets/latar-slide/5.jpg" alt="Lab Background" className="lab-bg-image" />
      </div>

      {/* Tombol kembali ke menu */}
      <div className="lab-header-left">
        <motion.img 
          src="/assets/elemen/Balik Menu Utama.png" 
          alt="Menu"
          className="btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('praktikum-menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Header Icons */}
      <div className="header-icons">
        <motion.img 
          src="/assets/elemen/Informasi.png" 
          alt="Info"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowProfile(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
        <motion.img 
          src="/assets/elemen/Pengaturan.png" 
          alt="Pengaturan"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowSettings(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Meja Lab dengan benda-benda */}
      <div className="lab-table">
        {/* Magnet - Bisa diklik untuk diambil */}
        <motion.div 
          className={`magnet-container ${hasMagnet ? 'active' : ''}`}
          onClick={handleMagnetClick}
          whileHover={{ scale: hasMagnet ? 1 : 1.1 }}  // Hanya hover jika belum diambil
          whileTap={{ scale: 0.95 }}
        >
          <img 
            // Gambar berubah setelah diambil (ada tangan)
            src={hasMagnet ? '/assets/elemen/Tangan Magnet.png' : '/assets/elemen/Magnet.png'} 
            alt="Magnet"
            className="magnet-image"
          />
        </motion.div>

        {/* Benda yang sedang diuji (muncul di tengah) */}
        {selectedObject && (
          <motion.div 
            className="testing-area"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <img 
              src={selectedObject.image} 
              alt={selectedObject.name}
              className="testing-object"
            />
          </motion.div>
        )}

        {/* Container benda-benda yang bisa diuji */}
        <div className="objects-container">
          {labObjects.map((obj) => (
            <motion.div
              key={obj.id}
              // Class 'tested' untuk benda yang sudah diuji
              className={`lab-object ${testedObjects.includes(obj.id) ? 'tested' : ''}`}
              onClick={() => handleObjectClick(obj)}
              whileHover={{ scale: testedObjects.includes(obj.id) ? 1 : 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={obj.image} alt={obj.name} />
              {/* Badge hasil untuk benda yang sudah diuji */}
              {testedObjects.includes(obj.id) && (
                <span className={`result-badge ${labObjects.find(o => o.id === obj.id)?.magnetic ? 'magnetic' : 'non-magnetic'}`}>
                  {labObjects.find(o => o.id === obj.id)?.magnetic ? '✓' : '✗'}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animasi Hasil Pengujian (Benar/Salah) */}
      <AnimatePresence>
        {showResult !== null && (
          <motion.div 
            className="result-overlay"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <img 
              src={showResult ? '/assets/elemen/Benar.png' : '/assets/elemen/Salah.png'} 
              alt={showResult ? 'Magnetic' : 'Not Magnetic'}
              className="result-icon"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kotak Instruksi di bawah */}
      <div className="instruction-box">
        <p>{instruction}</p>
      </div>

      {/* Indikator Progress */}
      <div className="progress-indicator">
        <span>Benda diuji: {testedObjects.length}/{labObjects.length}</span>
      </div>

      {/* Tombol ke Quiz (muncul setelah semua diuji) */}
      {showQuizButton && (
        <motion.button
          className="quiz-button"
          onClick={() => handleButtonClick(() => navigateTo('quiz'))}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Lanjut ke Quiz →
        </motion.button>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showProfile && <ProfileModal onClose={() => { playSound('click'); setShowProfile(false) }} />}
        {showSettings && <SettingsModal onClose={() => { playSound('click'); setShowSettings(false) }} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default PraktikumLab
