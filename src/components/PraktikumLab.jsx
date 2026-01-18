import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import './PraktikumLab.css'

function PraktikumLab() {
  const { navigateTo, playSound } = useApp()
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [hasMagnet, setHasMagnet] = useState(false)
  const [selectedObject, setSelectedObject] = useState(null)
  const [testedObjects, setTestedObjects] = useState([])
  const [showResult, setShowResult] = useState(null)
  const [instruction, setInstruction] = useState('Klik magnet untuk mengambilnya')
  const [showQuizButton, setShowQuizButton] = useState(false)

  const labObjects = [
    { id: 'paku', name: 'Paku', image: '/assets/elemen/Paku.png', magnetic: true },
    { id: 'pensil', name: 'Pensil', image: '/assets/elemen/Pensil.png', magnetic: false },
    { id: 'penggaris', name: 'Penggaris Besi', image: '/assets/elemen/Penggaris Besi.png', magnetic: true },
    { id: 'penghapus', name: 'Penghapus', image: '/assets/elemen/Penghapus.png', magnetic: false },
    { id: 'botol', name: 'Botol Plastik', image: '/assets/elemen/Botol Plastik.png', magnetic: false },
    { id: 'kertas', name: 'Kertas', image: '/assets/elemen/Kertas.png', magnetic: false },
  ]

  const handleMagnetClick = () => {
    if (!hasMagnet) {
      playSound('click')
      setHasMagnet(true)
      setInstruction('Pilih benda untuk didekatkan ke magnet')
    }
  }

  const handleObjectClick = (obj) => {
    if (!hasMagnet) {
      playSound('error')
      setInstruction('Ambil magnet terlebih dahulu!')
      return
    }

    if (testedObjects.includes(obj.id)) {
      setInstruction(`${obj.name} sudah diuji. Pilih benda lainnya.`)
      return
    }

    playSound('click')
    setSelectedObject(obj)
    setShowResult(obj.magnetic)
    
    if (obj.magnetic) {
      playSound('success')
      setInstruction(`${obj.name} dapat ditarik oleh magnet!`)
    } else {
      playSound('error')
      setInstruction(`${obj.name} tidak dapat ditarik oleh magnet`)
    }

    // Add to tested objects after a delay
    setTimeout(() => {
      setTestedObjects(prev => [...prev, obj.id])
      setShowResult(null)
      setSelectedObject(null)
      
      const newTestedCount = testedObjects.length + 1
      if (newTestedCount >= labObjects.length) {
        setInstruction('Selesai! Kamu sudah menguji semua benda. Lanjut ke Quiz!')
        setShowQuizButton(true)
        playSound('success')
      } else {
        setInstruction('Pilih benda lainnya untuk diuji')
      }
    }, 2500)
  }

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  return (
    <motion.div 
      className="screen lab-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="lab-background">
        <img src="/assets/latar-slide/5.jpg" alt="Lab Background" className="lab-bg-image" />
      </div>

      {/* Header Left - Menu */}
      <div className="lab-header-left">
        <motion.img 
          src="/assets/elemen/Balik Menu Utama.png" 
          alt="Menu"
          className="btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('praktikum-menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Header Right */}
      <div className="header-icons">
        <motion.img 
          src="/assets/elemen/Informasi.png" 
          alt="Info"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowProfile(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
        <motion.img 
          src="/assets/elemen/Pengaturan.png" 
          alt="Pengaturan"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowSettings(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Lab Table */}
      <div className="lab-table">
        {/* Magnet with hand */}
        <motion.div 
          className={`magnet-container ${hasMagnet ? 'active' : ''}`}
          onClick={handleMagnetClick}
          whileHover={{ scale: hasMagnet ? 1 : 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={hasMagnet ? '/assets/elemen/Tangan Magnet.png' : '/assets/elemen/Magnet.png'} 
            alt="Magnet"
            className="magnet-image"
          />
        </motion.div>

        {/* Selected object being tested */}
        {selectedObject && (
          <motion.div 
            className="testing-area"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <img 
              src={selectedObject.image} 
              alt={selectedObject.name}
              className="testing-object"
            />
          </motion.div>
        )}

        {/* Objects on table */}
        <div className="objects-container">
          {labObjects.map((obj) => (
            <motion.div
              key={obj.id}
              className={`lab-object ${testedObjects.includes(obj.id) ? 'tested' : ''}`}
              onClick={() => handleObjectClick(obj)}
              whileHover={{ scale: testedObjects.includes(obj.id) ? 1 : 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={obj.image} alt={obj.name} />
              {testedObjects.includes(obj.id) && (
                <span className={`result-badge ${labObjects.find(o => o.id === obj.id)?.magnetic ? 'magnetic' : 'non-magnetic'}`}>
                  {labObjects.find(o => o.id === obj.id)?.magnetic ? '✓' : '✗'}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Result Animation */}
      <AnimatePresence>
        {showResult !== null && (
          <motion.div 
            className="result-overlay"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <img 
              src={showResult ? '/assets/elemen/Benar.png' : '/assets/elemen/Salah.png'} 
              alt={showResult ? 'Magnetic' : 'Not Magnetic'}
              className="result-icon"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction Box */}
      <div className="instruction-box">
        <p>{instruction}</p>
      </div>

      {/* Progress indicator */}
      <div className="progress-indicator">
        <span>Benda diuji: {testedObjects.length}/{labObjects.length}</span>
      </div>

      {/* Quiz Button */}
      {showQuizButton && (
        <motion.button
          className="quiz-button"
          onClick={() => handleButtonClick(() => navigateTo('quiz'))}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Lanjut ke Quiz →
        </motion.button>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showProfile && <ProfileModal onClose={() => { playSound('click'); setShowProfile(false) }} />}
        {showSettings && <SettingsModal onClose={() => { playSound('click'); setShowSettings(false) }} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default PraktikumLab
