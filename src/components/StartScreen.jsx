import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import useHoverSound from '../hooks/useHoverSound'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'

function StartScreen() {
  const { navigateTo, playSound, playNarration } = useApp()
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)
  const playHover = useHoverSound(playSound)

  useEffect(() => { playNarration('slide-start') }, [playNarration])
  const handleButtonClick = (action, sound = 'click') => { playSound(sound); action() }

  return (
    <motion.div
      className="w-full h-full absolute inset-0 overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="/assets/latar-slide/2.jpg" alt="Background" className="w-full h-full object-cover brightness-85" />
      </div>

      {/* Header Left - Logo */}
      <div className="absolute top-4 left-4 z-100">
        <img src="/assets/elemen/Logo Universitas Muhammadiyah Riau.png" alt="Logo UMRI"
          className="w-auto h-[60px] object-contain drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]" />
      </div>

      {/* Header Right - Icons */}
      <div className="absolute top-4 right-4 flex gap-3 z-100">
        <motion.img src="/assets/elemen/Informasi.png" alt="Info" className="btn-icon"
          onMouseEnter={() => playHover('start-info', 'ui-info')}
          onClick={() => handleButtonClick(() => setShowProfile(true), 'ui-info')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
        <motion.img src="/assets/elemen/Pengaturan.png" alt="Pengaturan" className="btn-icon"
          onMouseEnter={() => playHover('start-settings', 'ui-settings')}
          onClick={() => handleButtonClick(() => setShowSettings(true), 'ui-settings')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
        <motion.img src="/assets/elemen/Keluar Game.png" alt="Keluar" className="btn-icon"
          onMouseEnter={() => playHover('start-exit', 'ui-exit')}
          onClick={() => handleButtonClick(() => setShowExit(true), 'ui-exit')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-2.5">
        <motion.img src="/assets/elemen/Laboratorium Virtual Inklusif.png" alt="Laboratorium Virtual Inklusif"
          className="w-[min(500px,80vw)] h-auto drop-shadow-[4px_6px_12px_rgba(0,0,0,0.3)]"
          initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }} />

        <motion.img src="/assets/elemen/Gerak & Gaya.png" alt="Gerak & Gaya"
          className="w-[min(350px,65vw)] h-auto drop-shadow-[3px_5px_10px_rgba(0,0,0,0.3)]"
          initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }} />

        <motion.img src="/assets/elemen/IPA-SMPMTs kelas VII.png" alt="IPA SMP/MTs Kelas VII"
          className="w-[min(250px,50vw)] h-auto drop-shadow-[2px_4px_8px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }} />

        <motion.div className="mt-4"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}>
          <motion.img src="/assets/elemen/Play.png" alt="Play"
            className="w-[90px] h-[90px] cursor-pointer drop-shadow-[3px_5px_10px_rgba(0,0,0,0.35)]"
            onMouseEnter={() => playHover('start-play', 'ui-play')}
            onClick={() => handleButtonClick(() => navigateTo('menu'), 'ui-play')}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }} />
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
