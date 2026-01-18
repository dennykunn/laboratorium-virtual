import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'
import './CPTPScreen.css'

function CPTPScreen() {
  const { navigateTo, playSound } = useApp()
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  return (
    <motion.div 
      className="screen cptp-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="cptp-background">
        <img 
          src="/assets/latar-slide/2.jpg" 
          alt="Background"
          className="cptp-bg-image"
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
      <div className="cptp-title">
        <img 
          src="/assets/elemen/Gerak & Gaya.png" 
          alt="Gerak & Gaya"
          className="title-image"
        />
      </div>

      {/* Content Board */}
      <motion.div 
        className="cptp-board-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Close button */}
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="cptp-close-btn btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />

        <div className="cptp-board">
          <div className="cptp-board-header">
            <span className="cptp-header-text">CP & TP</span>
            <img src="/assets/elemen/CP & TP.png" alt="CP & TP Icon" className="cptp-header-icon" />
          </div>

          <div className="cptp-content">
            <div className="cptp-section">
              <h3 className="cptp-section-title">A. Capaian Pembelajaran</h3>
              <p className="cptp-text">
                Peserta didik mampu melakukan pengukuran terhadap aspek fisis yang 
                mereka temui dan memanfaatkan ragam gerak dan gaya (force).
              </p>
            </div>

            <div className="cptp-section">
              <h3 className="cptp-section-title">B. Tujuan Pembelajaran</h3>
              <ul className="cptp-list">
                <li>Menjelaskan konsep gerak serta contohnya dalam kegiatan sehari-hari.</li>
                <li>Peserta didik mampu membedakan besaran kelajuan dan kecepatan dalam gerak benda.</li>
                <li>Peserta didik mampu menjelaskan pengaruh gaya normal terhadap gerak benda.</li>
              </ul>
            </div>
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

export default CPTPScreen
