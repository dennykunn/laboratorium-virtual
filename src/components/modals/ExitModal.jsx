import { motion } from 'framer-motion'
import { useApp } from '../../App'

function ExitModal({ onClose }) {
  const { playSound } = useApp()
  const handleClose = () => { playSound('click'); onClose() }
  const handleExit = () => {
    playSound('click')
    window.close()
    window.location.href = 'about:blank'
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 z-1000 p-4 flex justify-center items-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="relative max-w-lg w-full shadow-[0_10px_35px_rgba(0,0,0,0.3)]"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >  
            <img src="/assets/elemen/Layar Kamu ingin Keluar.png" alt="Keluar"
              className="w-full absolute top-1/2 left-0 -translate-y-1/2 object-contain h-auto drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]" />
         

          <div className="flex justify-center gap-6 translate-y-5">
            <motion.img src="/assets/elemen/Yes.png" alt="Yes"
              className="md:w-[100px] w-[80px] h-auto cursor-pointer drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]"
              onClick={handleExit}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
            <motion.img src="/assets/elemen/No.png" alt="No"
              className="md:w-[100px] w-[80px] h-auto cursor-pointer drop-shadow-[2px_3px_5px_rgba(0,0,0,0.3)]"
              onClick={handleClose}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
          </div> 
      </motion.div>
    </motion.div>
  )
}

export default ExitModal
