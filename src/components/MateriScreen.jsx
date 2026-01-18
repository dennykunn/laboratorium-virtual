import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import ExitModal from './modals/ExitModal'
import './MateriScreen.css'

function MateriScreen() {
  const { navigateTo, playSound } = useApp()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExit, setShowExit] = useState(false)
  const [showTopicSelection, setShowTopicSelection] = useState(true)

  const materiSlides = [
    {
      content: `Gaya adalah dorongan atau tarikan yang diberikan pada suatu benda. Ketika kamu mendorong meja, berarti kamu memberikan gaya dorong pada meja. Ketika kamu menarik tali, berarti kamu memberikan gaya tarik pada tali. Gaya menyebabkan perubahan gerak pada benda.`
    },
    {
      content: `Jika ada dua gaya yang bekerja pada sebuah benda ke arah yang sama, maka kedua gaya tersebut akan saling memperkuat. Besar gaya totalnya adalah jumlah dari kedua gaya tersebut. Jika dua orang mendorong meja ke arah yang sama, meja akan lebih mudah bergerak.`
    },
    {
      content: `Gaya-gaya yang dialami oleh meja yang bergerak ke arah berlawanan, kita sebut F₁ dan -F₂. Simbol minus pada F₂ menunjukkan bahwa arahnya berlawanan. Besar kumulatif dari kedua gaya itu adalah total dari kedua gaya tersebut. Ini disebut sebagai kombinasi gaya/hasil gaya. Arah hasil gaya dalam kasus gaya pada meja yang didorong adalah total dari kedua gaya yang berlawanan. Hasil kedua gaya tersebut adalah:\n\nR = F1 + (-F2)`
    }
  ]

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  const nextSlide = () => {
    if (currentSlide < materiSlides.length - 1) {
      playSound('click')
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      playSound('click')
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleTopicSelect = (topic) => {
    playSound('click')
    if (topic === 'gaya') {
      setShowTopicSelection(false)
    }
    // Gerak belum tersedia
  }

  if (showTopicSelection) {
    return (
      <motion.div 
        className="screen materi-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="materi-background">
          <img src="/assets/latar-slide/2.jpg" alt="Background" className="materi-bg-image" />
        </div>

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
          <motion.img 
            src="/assets/elemen/Keluar Game.png" 
            alt="Keluar"
            className="btn-icon"
            onClick={() => handleButtonClick(() => setShowExit(true))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>

        <div className="materi-title">
          <img src="/assets/elemen/Gerak & Gaya.png" alt="Gerak & Gaya" className="title-image" />
        </div>

        <motion.div 
          className="materi-board-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.img 
            src="/assets/elemen/X.png" 
            alt="Close"
            className="materi-close-btn btn-icon"
            onClick={() => handleButtonClick(() => navigateTo('menu'))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />

          <div className="materi-board">
            <div className="materi-board-header">
              <span className="materi-header-text">Materi</span>
              <img src="/assets/elemen/Materi.png" alt="Materi Icon" className="materi-header-icon" />
            </div>

            <div className="topic-selection">
              <motion.div 
                className="topic-item disabled"
                whileHover={{ scale: 1.02 }}
              >
                <img src="/assets/elemen/Gerak.png" alt="Gerak" className="topic-icon" />
                <span className="topic-label">Gerak</span>
                <span className="topic-status">(Segera Hadir)</span>
              </motion.div>

              <motion.div 
                className="topic-item"
                onClick={() => handleTopicSelect('gaya')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/assets/elemen/Gaya.png" alt="Gaya" className="topic-icon" />
                <span className="topic-label">Gaya</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showProfile && <ProfileModal onClose={() => { playSound('click'); setShowProfile(false) }} />}
          {showSettings && <SettingsModal onClose={() => { playSound('click'); setShowSettings(false) }} />}
          {showExit && <ExitModal onClose={() => { playSound('click'); setShowExit(false) }} />}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="screen materi-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="materi-background">
        <img src="/assets/latar-slide/2.jpg" alt="Background" className="materi-bg-image" />
      </div>

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
        <motion.img 
          src="/assets/elemen/Keluar Game.png" 
          alt="Keluar"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowExit(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div className="materi-title">
        <img src="/assets/elemen/Gerak & Gaya.png" alt="Gerak & Gaya" className="title-image" />
      </div>

      <motion.div 
        className="materi-board-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.img 
          src="/assets/elemen/X.png" 
          alt="Close"
          className="materi-close-btn btn-icon"
          onClick={() => handleButtonClick(() => setShowTopicSelection(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />

        {currentSlide > 0 && (
          <motion.img 
            src="/assets/elemen/Kembali.png" 
            alt="Previous"
            className="nav-arrow left"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        )}
        {currentSlide < materiSlides.length - 1 && (
          <motion.img 
            src="/assets/elemen/Lanjut.png" 
            alt="Next"
            className="nav-arrow right"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        )}

        <div className="materi-board">
          <div className="materi-board-header">
            <span className="materi-header-text">Materi</span>
            <img src="/assets/elemen/Materi.png" alt="Materi Icon" className="materi-header-icon" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              className="materi-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p className="materi-text">{materiSlides[currentSlide].content}</p>
            </motion.div>
          </AnimatePresence>

          <div className="slide-indicators">
            {materiSlides.map((_, index) => (
              <span 
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => { playSound('click'); setCurrentSlide(index) }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showProfile && <ProfileModal onClose={() => { playSound('click'); setShowProfile(false) }} />}
        {showSettings && <SettingsModal onClose={() => { playSound('click'); setShowSettings(false) }} />}
        {showExit && <ExitModal onClose={() => { playSound('click'); setShowExit(false) }} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default MateriScreen
