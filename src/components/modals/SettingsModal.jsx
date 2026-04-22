import { motion } from 'framer-motion'
import { useApp } from '../../App'

function SettingsModal({ onClose }) {
  const { isMuted, setIsMuted, playSound } = useApp()
  const handleClose = () => { playSound('click'); onClose() }
  const handleVolumeChange = (muted) => { playSound('click'); setIsMuted(muted) }

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-1000 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="relative max-w-md max-h-[90vh]"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img src="/assets/elemen/X.png" alt="Close"
          className="btn-icon absolute -top-3 -right-3 z-10"
          onClick={handleClose}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
        <img src="/assets/elemen/Layar Pengaturan.png" alt="Close"
          className="w-full h-auto object-contain drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]"  />
          
          <div className="flex justify-center gap-6 absolute top-1/2 -translate-y-[45%] left-1/2 -translate-x-1/2 w-full">
            <motion.img src="/assets/elemen/Volume Hidup.png" alt="Volume On"
              className={`w-[100px] h-[100px] cursor-pointer transition-all rounded-xl p-2 ${!isMuted ? 'scale-110' : 'opacity-60'}`}
              onClick={() => handleVolumeChange(false)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />

            <motion.img src="/assets/elemen/Volume Mati.png" alt="Volume Off"
              className={`w-[100px] h-[100px] cursor-pointer transition-all rounded-xl p-2 ${isMuted ? 'scale-110' : 'opacity-60'}`}
              onClick={() => handleVolumeChange(true)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
          </div>
      </motion.div>
    </motion.div>
  )
}

export default SettingsModal
