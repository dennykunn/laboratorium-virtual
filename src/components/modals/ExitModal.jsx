/**
 * ============================================================================
 * EXIT-MODAL.JSX - MODAL KONFIRMASI KELUAR
 * ============================================================================
 * 
 * Modal popup yang muncul saat user ingin keluar dari aplikasi.
 * Muncul ketika user mengklik tombol Keluar (door icon).
 * 
 * Fitur:
 * - Menampilkan pertanyaan "Kamu ingin Keluar?"
 * - Tombol "Yes" untuk konfirmasi keluar
 * - Tombol "No" untuk batal dan kembali
 * 
 * Catatan:
 * Karena ini aplikasi web, tombol Yes akan mencoba menutup tab/window.
 * Jika browser tidak mengizinkan, akan redirect ke halaman kosong.
 * 
 * ============================================================================
 */

import { motion } from 'framer-motion'
import { useApp } from '../../App'
import './Modal.css'

function ExitModal({ onClose }) {
  const { playSound } = useApp()

  const handleClose = () => {
    playSound('click')
    onClose()
  }

  /**
   * handleExit - Menangani konfirmasi keluar
   * 
   * Browser modern memiliki batasan untuk window.close():
   * - Hanya bisa menutup window yang dibuka oleh script
   * - Tidak bisa menutup tab yang dibuka manual oleh user
   * 
   * Sebagai fallback, redirect ke about:blank
   */
  const handleExit = () => {
    playSound('click')
    
    // Coba tutup window
    window.close()
    
    // Jika window.close() tidak bekerja, redirect ke halaman kosong
    // Ini memberikan efek "keluar" dari aplikasi
    window.location.href = 'about:blank'
  }

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}  // Klik overlay = batal (sama seperti No)
    >
      <motion.div 
        className="modal-content exit-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Board Konfirmasi */}
        <div className="exit-board">
          <h2 className="exit-title">Kamu ingin Keluar?</h2>
          
          {/* Tombol Yes dan No */}
          <div className="exit-buttons">
            {/* Tombol Yes - Konfirmasi keluar */}
            <motion.img 
              src="/assets/elemen/Yes.png" 
              alt="Yes"
              className="exit-btn"
              onClick={handleExit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            
            {/* Tombol No - Batal, tutup modal */}
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
