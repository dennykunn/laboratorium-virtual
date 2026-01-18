import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'
import './StartScreen.css'

function StartScreen() {
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
      className="screen start-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="start-background">
        <img 
          src="/assets/latar-slide/2.jpg" 
          alt="Background"
          className="start-bg-image"
        />
      </div>

      {/* Header Left - University Logo */}
      <div className="header-left">
        <img 
          src="/assets/latar-slide/1.jpg" 
          alt="Logo UMRI"
          className="university-logo"
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center top'
          }}
        />
        <div className="university-text">
          UNIVERSITAS<br />MUHAMMADIYAH<br />RIAU
        </div>
      </div>

      {/* Header Right - Action Icons */}
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

      {/* Main Content */}
      <div className="start-content">
        <motion.div 
          className="title-container"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img 
            src="/assets/elemen/Laboratorium Virtual.png" 
            alt="Laboratorium Virtual"
            className="title-lab-virtual"
          />
        </motion.div>

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

        <motion.div
          className="play-button-container"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        >
          <motion.img 
            src="/assets/elemen/Play.png" 
            alt="Play"
            className="play-button"
            onClick={() => handleButtonClick(() => navigateTo('menu'))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showProfile && <ProfileModal onClose={() => { playSound('click'); setShowProfile(false) }} />}
        {showSettings && <SettingsModal onClose={() => { playSound('click'); setShowSettings(false) }} />}
        {showExit && <ExitModal onClose={() => { playSound('click'); setShowExit(false) }} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default StartScreen
