/**
 * ============================================================================
 * PRAKTIKUM-MENU.JSX - HALAMAN MENU PRAKTIKUM
 * ============================================================================
 * 
 * Halaman ini menampilkan menu untuk memilih:
 * 1. Petunjuk Praktikum - Melihat petunjuk cara melakukan praktikum
 * 2. Praktikum - Langsung ke simulasi laboratorium virtual
 * 
 * Juga menampilkan pilihan topik:
 * - Gerak (belum tersedia)
 * - Gaya (tersedia)
 * 
 * ============================================================================
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'
import './PraktikumMenu.css'

function PraktikumMenu() {
  const { navigateTo, playSound } = useApp()
  
  // State untuk modal
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
      {/* Background */}
      <div className="praktikum-menu-background">
        <img src="/assets/latar-slide/2.jpg" alt="Background" className="praktikum-menu-bg-image" />
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

      {/* Judul */}
      <div className="praktikum-menu-title">
        <img src="/assets/elemen/Gerak & Gaya.png" alt="Gerak & Gaya" className="title-image" />
      </div>

      {/* Board Menu Praktikum */}
      <motion.div 
        className="praktikum-menu-board-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Tombol Close */}
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="praktikum-menu-close-btn btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />

        <div className="praktikum-menu-board">
          {/* Header Board */}
          <div className="praktikum-menu-board-header">
            <span className="praktikum-menu-header-text">Praktikum</span>
            <img src="/assets/elemen/Praktikum (Putih).png" alt="Praktikum Icon" className="praktikum-menu-header-icon" />
          </div>

          {/* Pilihan Menu */}
          <div className="praktikum-options">
            {/* Tombol Petunjuk Praktikum */}
            <motion.div 
              className="praktikum-option"
              onClick={() => handleButtonClick(() => navigateTo('petunjuk-praktikum'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/assets/elemen/Petunjuk Praktikum.png" alt="Petunjuk" className="option-icon" />
              <span className="option-label">Petunjuk Praktikum</span>
            </motion.div>

            {/* Tombol Praktikum (ke simulasi lab) */}
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

          {/* Pilihan Topik */}
          <div className="topic-buttons">
            {/* Gerak - Disabled */}
            <div className="topic-btn disabled">
              <img src="/assets/elemen/Gerak.png" alt="Gerak" />
              <span>Gerak (Segera)</span>
            </div>
            
            {/* Gaya - Active */}
            <div className="topic-btn active">
              <img src="/assets/elemen/Gaya.png" alt="Gaya" />
              <span>Gaya</span>
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

export default PraktikumMenu
