/**
 * ============================================================================
 * PROFILE-MODAL.JSX - MODAL PROFIL PENGEMBANG
 * ============================================================================
 * 
 * Modal popup yang menampilkan informasi tentang pengembang aplikasi.
 * Muncul ketika user mengklik tombol Informasi (i).
 * 
 * Menampilkan:
 * - Nama pengembang
 * - Institusi pendidikan
 * - Kontak (Instagram, TikTok, WhatsApp)
 * 
 * ============================================================================
 */

import { motion } from 'framer-motion'
import { useApp } from '../../App'
import './Modal.css'

/**
 * ProfileModal Component
 * 
 * @param {function} onClose - Fungsi yang dipanggil saat modal ditutup
 */
function ProfileModal({ onClose }) {
  const { playSound } = useApp()

  /**
   * handleClose - Menangani penutupan modal
   */
  const handleClose = () => {
    playSound('click')
    onClose()
  }

  return (
    /**
     * Modal Overlay - Latar belakang gelap semi-transparan
     * Klik di luar modal akan menutup modal
     */
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}  // Klik overlay = tutup modal
    >
      {/**
       * Modal Content - Konten modal
       * stopPropagation mencegah event klik menyebar ke overlay
       */}
      <motion.div 
        className="modal-content profile-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}  // Cegah tutup saat klik konten
      >
        {/* Tombol Close (X) */}
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="modal-close btn-icon"
          onClick={handleClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        
        {/* Board Profil */}
        <div className="board-panel profile-board">
          <h2 className="profile-title">Profil Pengembang</h2>
          
          <div className="profile-content">
            {/* Salam Pembuka */}
            <p className="profile-greeting">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
            
            <div className="profile-info">
              {/* Foto Profil */}
              <div className="profile-photo">
                <div className="photo-frame">
                  <div className="photo-placeholder">
                    👩‍🎓
                  </div>
                </div>
              </div>
              
              {/* Teks Informasi */}
              <div className="profile-text">
                <p className="profile-name">Perkenalkan Nama Saya <strong>Putri Nur Bintang</strong></p>
                <p className="profile-desc">Saya Mahasiswi Pendidikan IPA FKIP</p>
                <p className="profile-desc">Universitas Muhammadiyah Riau</p>
                
                {/* Kontak */}
                <div className="profile-contacts">
                  <div className="contact-item">
                    <span className="contact-icon">📸</span>
                    <span>@putrinurbintang</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🎵</span>
                    <span>@putrinurbintang</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📱</span>
                    <span>0822-8445-3226</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProfileModal
