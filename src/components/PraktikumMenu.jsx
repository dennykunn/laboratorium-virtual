import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'
import './PraktikumMenu.css'

function PraktikumMenu() {
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
      className="screen praktikum-menu-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="praktikum-menu-background">
        <img src="/assets/latar-slide/2.jpg" alt="Background" className="praktikum-menu-bg-image" />
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

      <div className="praktikum-menu-title">
        <img src="/assets/elemen/Gerak & Gaya.png" alt="Gerak & Gaya" className="title-image" />
      </div>

      <motion.div 
        className="praktikum-menu-board-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="praktikum-menu-close-btn btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />

        <div className="praktikum-menu-board">
          <div className="praktikum-menu-board-header">
            <span className="praktikum-menu-header-text">Praktikum</span>
            <img src="/assets/elemen/Praktikum (Putih).png" alt="Praktikum Icon" className="praktikum-menu-header-icon" />
          </div>

          <div className="praktikum-options">
            <motion.div 
              className="praktikum-option"
              onClick={() => handleButtonClick(() => navigateTo('petunjuk-praktikum'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/assets/elemen/Petunjuk Praktikum.png" alt="Petunjuk" className="option-icon" />
              <span className="option-label">Petunjuk Praktikum</span>
            </motion.div>

            <motion.div 
              className="praktikum-option"
              onClick={() => handleButtonClick(() => navigateTo('praktikum-lab'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/assets/elemen/Praktikum (Biru).png" alt="Praktikum" className="option-icon" />
              <span className="option-label">Praktikum</span>
            </motion.div>
          </div>

          <div className="topic-buttons">
            <div className="topic-btn disabled">
              <img src="/assets/elemen/Gerak.png" alt="Gerak" />
              <span>Gerak (Segera)</span>
            </div>
            <div className="topic-btn active">
              <img src="/assets/elemen/Gaya.png" alt="Gaya" />
              <span>Gaya</span>
            </div>
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

export default PraktikumMenu
