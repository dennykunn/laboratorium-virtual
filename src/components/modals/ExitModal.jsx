import { motion } from 'framer-motion'
import { useApp } from '../../App'
import './Modal.css'

function ExitModal({ onClose }) {
  const { playSound } = useApp()

  const handleClose = () => {
    playSound('click')
    onClose()
  }

  const handleExit = () => {
    playSound('click')
    // Karena ini web app, kita bisa redirect ke halaman lain atau close tab
    window.close()
    // Jika window.close() tidak bekerja (browser restrictions)
    // redirect ke halaman lain atau reload
    window.location.href = 'about:blank'
  }

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div 
        className="modal-content exit-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="exit-board">
          <h2 className="exit-title">Kamu ingin Keluar?</h2>
          
          <div className="exit-buttons">
            <motion.img 
              src="/assets/elemen/Yes.png" 
              alt="Yes"
              className="exit-btn"
              onClick={handleExit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.img 
              src="/assets/elemen/No.png" 
              alt="No"
              className="exit-btn"
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ExitModal
