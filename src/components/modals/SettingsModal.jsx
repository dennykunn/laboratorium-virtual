import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../App'

function SettingsModal({ onClose }) {
  const {
    isMuted, setIsMuted, playSound, playNarration,
    isBgMusicEnabled, setIsBgMusicEnabled,
    isOperatorEnabled, setIsOperatorEnabled,
  } = useApp()
  useEffect(() => { playNarration('slide-settings') }, [playNarration])
  const handleClose = () => { playSound('ui-close'); onClose() }
  const handleVolumeChange = (muted) => {
    playSound(muted ? 'ui-volume-off' : 'ui-volume-on')
    setIsMuted(muted)
  }
  const handleBgMusicToggle = (enabled) => {
    playSound(enabled ? 'ui-volume-on' : 'ui-volume-off')
    setIsBgMusicEnabled(enabled)
  }
  const handleOperatorToggle = (enabled) => {
    playSound(enabled ? 'ui-volume-on' : 'ui-volume-off')
    setIsOperatorEnabled(enabled)
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-1000 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="relative max-w-xl max-h-[90vh]"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img src="/assets/elemen/X.png" alt="Close"
          className="btn-icon absolute -top-3 -right-3 z-10"
          onClick={handleClose}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
        <img src="/assets/elemen/Layar Pengaturan.png" alt="Close"
          className="w-full h-auto object-contain drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]" />

        <div className="flex flex-col gap-3 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[92%]">
          <h1 className="text-center font-oswald text-2xl md:text-4xl drop-shadow-md">PENGATURAN SUARA</h1>

          <div className="text-center font-oswald text-sm md:text-base drop-shadow-md">Audio Latar Belakang</div>
          <div className="flex justify-center gap-6">
            <motion.img src="/assets/elemen/Volume Hidup.png" alt="Music On"
              className={`w-[60px] md:w-[72px] h-auto cursor-pointer transition-all rounded-xl p-2 ${isBgMusicEnabled ? 'scale-110' : 'opacity-60'}`}
              onClick={() => handleBgMusicToggle(true)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
            <motion.img src="/assets/elemen/Volume Mati.png" alt="Music Off"
              className={`w-[60px] md:w-[72px] h-auto cursor-pointer transition-all rounded-xl p-2 ${!isBgMusicEnabled ? 'scale-110' : 'opacity-60'}`}
              onClick={() => handleBgMusicToggle(false)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
          </div>


          <div className="text-center font-oswald text-sm md:text-base drop-shadow-md">Audio Operator</div>
          <div className="flex justify-center gap-6">
            <motion.img src="/assets/elemen/Volume Hidup.png" alt="Operator On"
              className={`w-[60px] md:w-[72px] h-auto cursor-pointer transition-all rounded-xl p-2 ${isOperatorEnabled ? 'scale-110' : 'opacity-60'}`}
              onClick={() => handleOperatorToggle(true)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
            <motion.img src="/assets/elemen/Volume Mati.png" alt="Operator Off"
              className={`w-[60px] md:w-[72px] h-auto cursor-pointer transition-all rounded-xl p-2 ${!isOperatorEnabled ? 'scale-110' : 'opacity-60'}`}
              onClick={() => handleOperatorToggle(false)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SettingsModal
