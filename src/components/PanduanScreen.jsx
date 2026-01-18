import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'
import './PanduanScreen.css'

function PanduanScreen() {
  const { navigateTo, playSound } = useApp()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)

  const slides = [
    {
      title: 'Panduan',
      content: [
        { icon: '/assets/elemen/Play.png', text: 'Tombol untuk memulai Laboratorium Virtual ke Menu Utama' },
        { icon: '/assets/elemen/Informasi.png', text: 'Tombol Informasi Profil Pengembangan Media Laboratorium Virtual' },
        { icon: '/assets/elemen/Pengaturan.png', text: 'Tombol untuk mengatur suara pada Laboratorium Virtual' },
        { icon: '/assets/elemen/Keluar Game.png', text: 'Tombol untuk keluar dari Laboratorium Virtual klik Yes, jika masih ingin lanjut klik No' },
        { icon: '/assets/elemen/X.png', text: 'Tombol untuk keluar papan' },
      ]
    },
    {
      title: 'Panduan',
      content: [
        { icon: '/assets/elemen/Panduan.png', text: 'Tombol untuk melihat panduan penggunaan aplikasi' },
        { icon: '/assets/elemen/CP & TP.png', text: 'Tombol untuk melihat Capaian Pembelajaran dan Tujuan Pembelajaran' },
        { icon: '/assets/elemen/Materi.png', text: 'Tombol untuk melihat materi Gerak dan Gaya' },
        { icon: '/assets/elemen/Praktikum (Putih).png', text: 'Tombol untuk memulai praktikum virtual' },
      ]
    },
    {
      title: 'Panduan',
      content: [
        { icon: '/assets/elemen/Lanjut.png', text: 'Tombol untuk melanjutkan ke halaman berikutnya' },
        { icon: '/assets/elemen/Kembali.png', text: 'Tombol untuk kembali ke halaman sebelumnya' },
        { icon: '/assets/elemen/Balik Menu Utama.png', text: 'Tombol untuk kembali ke Menu Utama' },
      ]
    }
  ]

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
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
      className="screen panduan-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="panduan-background">
        <img 
          src="/assets/latar-slide/2.jpg" 
          alt="Background"
          className="panduan-bg-image"
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
        <motion.img 
          src="/assets/elemen/Keluar Game.png" 
          alt="Keluar"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowExit(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Title */}
      <div className="panduan-title">
        <img 
          src="/assets/elemen/Gerak & Gaya.png" 
          alt="Gerak & Gaya"
          className="title-image"
        />
      </div>

      {/* Content Board */}
      <motion.div 
        className="panduan-board-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Close button */}
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="panduan-close-btn btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />

        {/* Navigation Arrows */}
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
        {currentSlide < slides.length - 1 && (
          <motion.img 
            src="/assets/elemen/Lanjut.png" 
            alt="Next"
            className="nav-arrow right"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        )}

        <div className="panduan-board">
          <div className="panduan-board-header">
            <span className="panduan-header-text">{slides[currentSlide].title}</span>
            <img src="/assets/elemen/Panduan.png" alt="Panduan Icon" className="panduan-header-icon" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              className="panduan-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {slides[currentSlide].content.map((item, index) => (
                <motion.div 
                  key={index}
                  className="panduan-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img src={item.icon} alt="" className="panduan-item-icon" />
                  <span className="panduan-item-text">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <span 
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => { playSound('click'); setCurrentSlide(index) }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showProfile && <ProfileModal onClose={() => { playSound('click'); setShowProfile(false) }} />}
        {showSettings && <SettingsModal onClose={() => { playSound('click'); setShowSettings(false) }} />}
        {showExit && <ExitModal onClose={() => { playSound('click'); setShowExit(false) }} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default PanduanScreen
