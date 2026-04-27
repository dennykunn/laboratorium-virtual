import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import useHoverSound from '../hooks/useHoverSound'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'

function AyoBelajarScreen() {
  const { navigateTo, playSound, setCurrentTopic, playNarration } = useApp()
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)
  const playHover = useHoverSound(playSound)

  useEffect(() => { playNarration('ui-ayo-belajar') }, [playNarration])
  const handleButtonClick = (action, sound = 'click') => { playSound(sound); action() }

  const handleTopicSelect = (topic) => {
    playSound(topic === 'gerak' ? 'ui-gerak' : 'ui-gaya')
    setCurrentTopic(topic)
    navigateTo(`topic-${topic}`)
  }

  return (
    <motion.div
      className="w-full h-full absolute inset-0 overflow-hidden flex flex-col items-center justify-center px-3 md:px-5 pt-20 pb-12 md:py-20"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 z-0">
        <img src="/assets/latar-slide/2.jpg" alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-4 left-4 z-100">
        <img src="/assets/elemen/Logo Universitas Muhammadiyah Riau.png" alt="Logo UMRI"
          className="w-auto h-[60px] object-contain drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]" />
      </div>

      <div className="absolute top-4 right-4 flex gap-3 z-100">
        <motion.img src="/assets/elemen/Informasi.png" alt="Info" className="btn-icon"
          onMouseEnter={() => playHover('belajar-info', 'ui-info')}
          onClick={() => handleButtonClick(() => setShowProfile(true), 'ui-info')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
        <motion.img src="/assets/elemen/Pengaturan.png" alt="Pengaturan" className="btn-icon"
          onMouseEnter={() => playHover('belajar-settings', 'ui-settings')}
          onClick={() => handleButtonClick(() => setShowSettings(true), 'ui-settings')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
        <motion.img src="/assets/elemen/Keluar Game.png" alt="Keluar" className="btn-icon"
          onMouseEnter={() => playHover('belajar-exit', 'ui-exit')}
          onClick={() => handleButtonClick(() => setShowExit(true), 'ui-exit')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
      </div>

      <div className="relative z-10 mb-4 shrink-0">
        <img src="/assets/elemen/Gerak & Gaya.png" alt="Gerak & Gaya"
          className="w-[min(320px,75vw)] md:w-[min(350px,70vw)] h-auto drop-shadow-[4px_6px_12px_rgba(0,0,0,0.3)]" />
      </div>

      <motion.div className="relative z-10 w-full lg:max-w-[850px] max-w-lg flex justify-center"
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>


        <div className="relative z-10 w-full max-w-[92vw] md:max-w-3xl max-h-fit mx-auto flex flex-col justify-center items-center">
          <img src="/assets/elemen/Papan Ayo Belajar.png" alt="Ayo Belajar"
            className="w-full h-auto drop-shadow-[2px_4px_8px_rgba(0,0,0,0.3)]" />

          <motion.img src="/assets/elemen/X.png" alt="Close"
            className="btn-icon absolute top-2 right-2 md:top-6 md:right-6 z-20 w-[45px] h-[45px] md:w-[55px] md:h-[55px]"
            onMouseEnter={() => playHover('belajar-close', 'ui-close')}
            onClick={() => handleButtonClick(() => navigateTo('menu'), 'ui-close')}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
          {/* Topic Cards */}
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-5 md:gap-8 w-full justify-center px-2 md:px-0">
            <motion.div
              className="cursor-pointer"
              onMouseEnter={() => playHover('belajar-gerak', 'ui-gerak')}
              onClick={() => handleTopicSelect('gerak')}
              initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -8 }} whileTap={{ scale: 0.95 }}>
              <img src="/assets/elemen/Gerak/Gerak.png" alt="Gerak"
                className="w-[94px] h-[94px] md:w-[120px] md:h-[120px] object-contain drop-shadow-[3px_5px_8px_rgba(0,0,0,0.3)]" />
            </motion.div>

            <motion.div
              className="cursor-pointer"
              onMouseEnter={() => playHover('belajar-gaya', 'ui-gaya')}
              onClick={() => handleTopicSelect('gaya')}
              initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -8 }} whileTap={{ scale: 0.95 }}>
              <img src="/assets/elemen/Gaya/Gaya.png" alt="Gaya"
                className="w-[94px] h-[94px] md:w-[120px] md:h-[120px] object-contain drop-shadow-[3px_5px_8px_rgba(0,0,0,0.3)]" />
            </motion.div>
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

export default AyoBelajarScreen
