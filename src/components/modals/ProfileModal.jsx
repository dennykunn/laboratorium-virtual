import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../App'

function ProfileModal({ onClose }) {
  const { playSound, playNarration } = useApp()
  const [showReferensi, setShowReferensi] = useState(false)
  useEffect(() => { playNarration('slide-profile') }, [playNarration])
  const handleClose = () => { playSound('ui-close'); onClose() }

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 z-1000 w-full h-full flex justify-center items-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="relative max-w-2xl max-h-fit flex flex-col items-center justify-end"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img src="/assets/elemen/X.png" alt="Close"
          className="btn-icon absolute top-0 right-2 z-10"
          onClick={handleClose}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />

        <AnimatePresence mode="wait">
          {!showReferensi ? (
            <motion.div key="profil" className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <img src="/assets/elemen/Profil Pengembang.png" alt="Profil Pengembang"
                className="w-full h-auto object-contain drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]" />
              <motion.img src="/assets/elemen/Lanjut.png" alt="Lanjut"
                className="btn-icon absolute top-1/2 -translate-y-1/2 -right-6 z-10"
                onClick={() => { playSound('ui-next'); setShowReferensi(true) }}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
            </motion.div>
          ) : (
            <motion.div key="referensi" className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
              <img src="/assets/elemen/Referensi.png" alt="Referensi"
                className="w-full h-auto object-contain drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]" />
              <motion.img src="/assets/elemen/Kembali.png" alt="Kembali"
                className="btn-icon absolute top-1/2 -translate-y-1/2 -left-6 z-10"
                onClick={() => { playSound('ui-back'); setShowReferensi(false) }}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default ProfileModal
