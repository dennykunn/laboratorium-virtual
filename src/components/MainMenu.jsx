import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'

function MainMenu() {
  const { navigateTo, playSound, playNarration } = useApp()
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)

  const menuItems = [
    { id: 'panduan', label: 'Panduan', icon: '/assets/elemen/Panduan.png', screen: 'panduan' },
    { id: 'cptp', label: 'CP & TP', icon: '/assets/elemen/CP & TP.png', screen: 'cptp' },
    { id: 'ayo-belajar', label: 'Ayo Belajar', icon: '/assets/elemen/Ayo Belajar.png', screen: 'ayo-belajar' },
  ]

  useEffect(() => { playNarration('slide-menu') }, [playNarration])
  const handleButtonClick = (action, sound = 'click') => { playSound(sound); action() }

  return (
    <motion.div
      className="w-full h-full absolute inset-0 overflow-hidden flex flex-col items-center justify-center px-5 py-20"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="/assets/latar-slide/2.jpg" alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-4 left-4 z-100">
        <img src="/assets/elemen/Logo Universitas Muhammadiyah Riau.png" alt="Logo UMRI"
          className="w-auto h-[60px] object-contain drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]" />
      </div>

      {/* Header Icons */}
      <div className="absolute top-4 right-4 flex gap-3 z-100">
        <motion.img src="/assets/elemen/Informasi.png" alt="Info" className="btn-icon"
          onClick={() => handleButtonClick(() => setShowProfile(true), 'ui-info')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
        <motion.img src="/assets/elemen/Pengaturan.png" alt="Pengaturan" className="btn-icon"
          onClick={() => handleButtonClick(() => setShowSettings(true), 'ui-settings')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
        <motion.img src="/assets/elemen/Keluar Game.png" alt="Keluar" className="btn-icon"
          onClick={() => handleButtonClick(() => setShowExit(true), 'ui-exit')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
      </div>

      {/* Title */}
      <div className="relative z-10 mb-8 shrink-0">
        <img src="/assets/elemen/Gerak & Gaya.png" alt="Gerak & Gaya"
          className="w-[min(400px,75vw)] h-auto drop-shadow-[4px_6px_12px_rgba(0,0,0,0.3)]" />
      </div>

      {/* Menu Board */}
      <motion.div className="relative z-10 lg:max-w-3xl max-w-lg max-h-fit"
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}> 
          {/* Header */}
          <img src="/assets/elemen/Papan Menu Utama.png" alt="Menu Utama"
            className="w-full h-auto drop-shadow-[2px_4px_8px_rgba(0,0,0,0.3)]" />

          {/* Menu Grid */}
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-5 z-10 w-full justify-center">
            {menuItems.map((item, index) => (
              
                <motion.img key={item.id}
                  onClick={() => handleButtonClick(
                    () => navigateTo(item.screen),
                    item.id === 'panduan' ? 'ui-panduan' : item.id === 'cptp' ? 'ui-cptp' : 'ui-ayo-belajar'
                  )}
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} src={item.icon} alt={item.label} className="lg:w-[150px] w-[100px] cursor-pointer h-auto object-contain" 
                /> 
            ))} 
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
