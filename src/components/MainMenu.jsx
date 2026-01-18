import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'
import './MainMenu.css'

function MainMenu() {
  const { navigateTo, playSound } = useApp()
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)

  const menuItems = [
    { id: 'panduan', label: 'Panduan', icon: '/assets/elemen/Panduan.png', screen: 'panduan' },
    { id: 'cptp', label: 'CP & TP', icon: '/assets/elemen/CP & TP.png', screen: 'cptp' },
    { id: 'materi', label: 'Materi', icon: '/assets/elemen/Materi.png', screen: 'materi' },
    { id: 'praktikum', label: 'Praktikum', icon: '/assets/elemen/Praktikum (Putih).png', screen: 'praktikum-menu' },
  ]

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  return (
    <motion.div 
      className="screen main-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="menu-background">
        <img 
          src="/assets/latar-slide/2.jpg" 
          alt="Background"
          className="menu-bg-image"
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
      <div className="menu-title">
        <img 
          src="/assets/elemen/Gerak & Gaya.png" 
          alt="Gerak & Gaya"
          className="title-image"
        />
      </div>

      {/* Main Menu Board */}
      <motion.div 
        className="menu-board-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Close button */}
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="menu-close-btn btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('start'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />

        <div className="menu-board">
          {/* Decorative vines */}
          <div className="vine-decoration left"></div>
          <div className="vine-decoration right"></div>
          
          <div className="menu-board-header">
            <span className="menu-utama-text">Menu Utama</span>
          </div>

          <div className="menu-items">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="menu-item"
                onClick={() => handleButtonClick(() => navigateTo(item.screen))}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={item.icon} alt={item.label} className="menu-item-icon" />
                <span className="menu-item-label">{item.label}</span>
              </motion.div>
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

export default MainMenu
