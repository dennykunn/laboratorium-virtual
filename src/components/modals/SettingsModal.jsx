import { motion } from 'framer-motion'
import { useApp } from '../../App'
import './Modal.css'

function SettingsModal({ onClose }) {
  const { isMuted, setIsMuted, playSound } = useApp()

  const handleClose = () => {
    playSound('click')
    onClose()
  }

  const handleVolumeChange = (muted) => {
    playSound('click')
    setIsMuted(muted)
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
        className="modal-content settings-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="modal-close btn-icon"
          onClick={handleClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        
        <div className="settings-board">
          <h2 className="settings-title">Pengaturan</h2>
          
          <div className="settings-content">
            <motion.img 
              src="/assets/elemen/Volume Hidup.png" 
              alt="Volume On"
              className={`volume-btn ${!isMuted ? 'active' : ''}`}
              onClick={() => handleVolumeChange(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.img 
              src="/assets/elemen/Volume Mati.png" 
              alt="Volume Off"
              className={`volume-btn ${isMuted ? 'active' : ''}`}
              onClick={() => handleVolumeChange(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SettingsModal
