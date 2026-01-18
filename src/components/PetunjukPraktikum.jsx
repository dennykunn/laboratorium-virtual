import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'
import './PetunjukPraktikum.css'

function PetunjukPraktikum() {
  const { navigateTo, playSound } = useApp()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)

  const petunjukSlides = [
    {
      title: 'PRAKTIKUM GAYA',
      content: (
        <div className="petunjuk-content-grid">
          <div className="alat-bahan">
            <h4>Alat dan Bahan</h4>
            <div className="bahan-list">
              <div className="bahan-column">
                <p>1. Magnet</p>
                <p>2. Pensil</p>
                <p>3. Paku</p>
                <p>4. Penggaris Besi</p>
              </div>
              <div className="bahan-column">
                <p>5. Botol Plastik</p>
                <p>6. Penghapus</p>
                <p>7. Kertas</p>
              </div>
            </div>
          </div>
          <div className="keterangan">
            <h4>Keterangan Alat dan Bahan</h4>
            <div className="keterangan-items">
              <div className="keterangan-item">
                <img src="/assets/elemen/Magnet.png" alt="Magnet" />
                <span>Alat Praktikum</span>
              </div>
              <div className="keterangan-item">
                <img src="/assets/elemen/Magnet.png" alt="Drop" style={{ opacity: 0.5 }} />
                <span>Drop point dari alat dan bahan</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'LANGKAH PRAKTIKUM',
      content: (
        <div className="langkah-content">
          <ol className="langkah-list">
            <li>Pertama, klik magnet yang ada di meja untuk mengambil magnet</li>
            <li>Kedua, dekatkan magnet ke setiap benda (paku, pensil, penggaris besi, penghapus, botol plastik, kertas)</li>
            <li>Perhatikan apa yang terjadi pada setiap benda</li>
            <li>Catat benda mana yang dapat ditarik magnet dan mana yang tidak</li>
            <li>Setelah selesai, klik tombol "Lanjut ke Quiz" untuk mengerjakan kuis</li>
          </ol>
        </div>
      )
    }
  ]

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  const nextSlide = () => {
    if (currentSlide < petunjukSlides.length - 1) {
      playSound('click')
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      playSound('click')
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <motion.div 
      className="screen petunjuk-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="petunjuk-background">
        <img src="/assets/latar-slide/2.jpg" alt="Background" className="petunjuk-bg-image" />
      </div>

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
        <motion.img 
          src="/assets/elemen/Keluar Game.png" 
          alt="Keluar"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowExit(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div className="petunjuk-title">
        <img src="/assets/elemen/Gerak & Gaya.png" alt="Gerak & Gaya" className="title-image" />
      </div>

      <motion.div 
        className="petunjuk-board-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="petunjuk-close-btn btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('praktikum-menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />

        {currentSlide > 0 && (
          <motion.img 
            src="/assets/elemen/Kembali.png" 
            alt="Previous"
            className="nav-arrow left"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        )}
        {currentSlide < petunjukSlides.length - 1 && (
          <motion.img 
            src="/assets/elemen/Lanjut.png" 
            alt="Next"
            className="nav-arrow right"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        )}

        <div className="petunjuk-board">
          <div className="petunjuk-board-header">
            <span className="petunjuk-header-text">Petunjuk Praktikum</span>
            <img src="/assets/elemen/Petunjuk Praktikum.png" alt="Petunjuk Icon" className="petunjuk-header-icon" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              className="petunjuk-main-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="petunjuk-subtitle">{petunjukSlides[currentSlide].title}</h3>
              {petunjukSlides[currentSlide].content}
            </motion.div>
          </AnimatePresence>

          <div className="slide-indicators">
            {petunjukSlides.map((_, index) => (
              <span 
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => { playSound('click'); setCurrentSlide(index) }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showProfile && <ProfileModal onClose={() => { playSound('click'); setShowProfile(false) }} />}
        {showSettings && <SettingsModal onClose={() => { playSound('click'); setShowSettings(false) }} />}
        {showExit && <ExitModal onClose={() => { playSound('click'); setShowExit(false) }} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default PetunjukPraktikum
