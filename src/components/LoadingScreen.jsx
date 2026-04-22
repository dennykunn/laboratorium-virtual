import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../App'

function LoadingScreen() {
  const { navigateTo, playSound, playNarration } = useApp()
  const videoRef = useRef(null)

  useEffect(() => {
    playNarration('slide-start')
    const timeout = setTimeout(() => navigateTo('start'), 6000)
    return () => clearTimeout(timeout)
  }, [navigateTo, playNarration])

  return (
    <motion.div
      className="w-full h-full absolute inset-0 overflow-hidden flex flex-col items-center justify-center bg-[#1a1a2e]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="/assets/latar-slide/1.jpg" alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/assets/elemen/Laboratorium Virtual Inklusif.png"
            alt="Laboratorium Virtual"
            className="w-[min(450px,80vw)] h-auto drop-shadow-[4px_6px_12px_rgba(0,0,0,0.4)]"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img
            src="/assets/elemen/Gerak & Gaya.png"
            alt="Gerak & Gaya"
            className="w-[min(300px,60vw)] h-auto drop-shadow-[3px_5px_10px_rgba(0,0,0,0.3)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <img
            src="/assets/elemen/IPA-SMPMTs kelas VII.png"
            alt="IPA SMP/MTs Kelas VII"
            className="w-[min(250px,50vw)] h-auto drop-shadow-[2px_4px_8px_rgba(0,0,0,0.3)]"
          />
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="mt-5 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-[min(350px,70vw)] h-3.5 bg-white/20 rounded-xl overflow-hidden border-2 border-white/30">
            <motion.div
              className="h-full bg-linear-to-r from-primary-blue via-green-500 to-primary-orange rounded-xl"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5.5, ease: 'linear' }}
            />
          </div>
          <p className="mt-2.5 text-white font-fredoka text-lg drop-shadow-[1px_1px_4px_rgba(0,0,0,0.5)]">
            Memuat...
          </p>
        </motion.div>
      </div>

      {/* Skip Button */}
      <motion.button
        className="absolute bottom-8 right-8 z-20 px-6 py-2.5 bg-white/15 backdrop-blur-lg border-2 border-white/30 rounded-3xl text-white font-fredoka text-base cursor-pointer hover:bg-white/25 transition-colors"
        onClick={() => { playSound('ui-next'); navigateTo('start') }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Lewati →
      </motion.button>
    </motion.div>
  )
}

export default LoadingScreen
