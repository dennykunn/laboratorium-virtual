/**
 * ============================================================================
 * SETTINGS-MODAL.JSX - MODAL PENGATURAN SUARA
 * ============================================================================
 * 
 * Modal popup untuk mengatur suara aplikasi (mute/unmute).
 * Muncul ketika user mengklik tombol Pengaturan (gear icon).
 * 
 * Fitur:
 * - Tombol Volume Hidup - Mengaktifkan suara
 * - Tombol Volume Mati - Mematikan suara
 * 
 * ============================================================================
 */

import { motion } from 'framer-motion'
import { useApp } from '../../App'
import './Modal.css'

function SettingsModal({ onClose }) {
  // Ambil state dan fungsi dari Context
  const { isMuted, setIsMuted, playSound } = useApp()

  const handleClose = () => {
    playSound('click')
    onClose()
  }

  /**
   * handleVolumeChange - Mengubah status mute
   * @param {boolean} muted - true untuk mute, false untuk unmute
   */
  const handleVolumeChange = (muted) => {
    playSound('click')
    setIsMuted(muted)  // Update state global
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
        {/* Tombol Close */}
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="modal-close btn-icon"
          onClick={handleClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        
        {/* Board Pengaturan */}
        <div className="settings-board">
          <h2 className="settings-title">Pengaturan</h2>
          
          <div className="settings-content">
            {/* 
             * Tombol Volume Hidup
             * Class 'active' ditambahkan jika suara sedang ON (!isMuted)
             */}
            <motion.img 
              src="/assets/elemen/Volume Hidup.png" 
              alt="Volume On"
              className={`volume-btn ${!isMuted ? 'active' : ''}`}
              onClick={() => handleVolumeChange(false)}  // false = unmute
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            
            {/* 
             * Tombol Volume Mati
             * Class 'active' ditambahkan jika suara sedang OFF (isMuted)
             */}
            <motion.img 
              src="/assets/elemen/Volume Mati.png" 
              alt="Volume Off"
              className={`volume-btn ${isMuted ? 'active' : ''}`}
              onClick={() => handleVolumeChange(true)}  // true = mute
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
