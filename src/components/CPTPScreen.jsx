import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'

const slides = [
  { image: '/assets/elemen/CP.png' },
  { image: '/assets/elemen/TP.png' },
]

function CPTPScreen() {
  const { navigateTo, playSound } = useApp()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)

  const handleButtonClick = (action) => { playSound('click'); action() }

  return (
    <motion.div
      className="w-full h-full absolute inset-0 overflow-hidden flex flex-col items-center justify-center px-5 py-20"
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
          onClick={() => handleButtonClick(() => setShowProfile(true))}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
        <motion.img src="/assets/elemen/Pengaturan.png" alt="Pengaturan" className="btn-icon"
          onClick={() => handleButtonClick(() => setShowSettings(true))}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
        <motion.img src="/assets/elemen/Keluar Game.png" alt="Keluar" className="btn-icon"
          onClick={() => handleButtonClick(() => setShowExit(true))}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
      </div>

      <div className="relative z-10 shrink-0">
        <img src="/assets/elemen/Gerak & Gaya.png" alt="Gerak & Gaya"
          className="w-[min(350px,70vw)] h-auto drop-shadow-[4px_6px_12px_rgba(0,0,0,0.3)]" />
      </div>


      <motion.div className="relative z-10 lg:max-w-3xl max-w-lg max-h-fit flex flex-col items-center">
        <motion.img src="/assets/elemen/X.png" alt="Close"
          className="btn-icon absolute top-6 right-6 z-20 w-[55px] h-[55px]"
          onClick={() => handleButtonClick(() => navigateTo('menu'))}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />

        {currentSlide > 0 && (
          <motion.img src="/assets/elemen/Kembali.png" alt="Previous"
            className="nav-arrow-base left-0"
            onClick={() => { playSound('click'); setCurrentSlide(currentSlide - 1) }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
        )}
        {currentSlide < slides.length - 1 && (
          <motion.img src="/assets/elemen/Lanjut.png" alt="Next"
            className="nav-arrow-base right-0"
            onClick={() => { playSound('click'); setCurrentSlide(currentSlide + 1) }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
        )}

        <div className="w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} className="w-full flex justify-center"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <img src={slides[currentSlide].image} alt={`Panduan ${currentSlide + 1}`}
                className="w-full h-auto object-contain rounded-[15px]" />
            </motion.div>
          </AnimatePresence>
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

export default CPTPScreen
